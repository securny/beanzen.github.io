import { formatTime, showRecipeCharts } from "./profile-charts.mjs";

const UUID_V7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HTML_LIMIT = 256 * 1024;
const MAX_BREW_SECONDS = 86400; // RecipeChartProjector accepts recipes up to 24 hours.
const MAX_FLOAT = 3.402823466e38;

export function createID() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  let time = Date.now();
  for (let i = 5; i >= 0; i--) {
    bytes[i] = time % 256;
    time = Math.floor(time / 256);
  }
  bytes[6] = (bytes[6] & 15) | 112;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, n => n.toString(16).padStart(2, "0")).join("");
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
}

class ProfileError extends Error {
  constructor(key, field) {
    super(key);
    this.field = field;
  }
}

function need(condition, key, row, name) {
  if (!condition) throw new ProfileError(key, row.fields[name]);
}

function compact(values) {
  return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined && value !== ""));
}

function nested(values) {
  const result = compact(values);
  return Object.keys(result).length ? result : undefined;
}

function secureURL(value, row, name) {
  if (!value) return undefined;
  const url = URL.canParse(value) ? new URL(value) : null;
  need(url?.protocol === "https:" && !url.username && !url.password, "https", row, name);
  return url.href;
}

function uuid(value, row) {
  need(UUID_V7.test(value), "invalidID", row, "id");
  return value.toLowerCase();
}

function range(lower, upper, row, field) {
  if (upper === undefined) return lower;
  need(lower !== undefined && upper >= lower, "maxValue", row, field);
  return upper === lower ? lower : [lower, upper];
}

function originProfile(row) {
  const { country, variety, ...origin } = row.values;
  const bean = compact({
    ...origin,
    country: country.toUpperCase(),
    variety: variety ? variety.split(",").map(value => value.trim()).filter(Boolean) : undefined
  });
  if (bean.variety?.length === 0) delete bean.variety;
  need(Object.keys(bean).length, "missingOrigin", row, "country");
  return bean;
}

function recipePlan(row) {
  const v = row.values;
  let previousEnd = 0;
  let previousWeight = 0;
  const steps = row.steps.map((step, index) => {
    const { time, duration, action, comment, targetWeight, targetTemperature, targetFlow, targetPressure } = step.values;
    const target = nested({ weight: targetWeight, temperature: targetTemperature, flow: targetFlow, pressure: targetPressure });
    need(action || target, "stepContent", step, "action");
    need(index !== 0 || time === 0, "firstStep", step, "time");
    const secondsTolerance = 1e-9;
    need(time + secondsTolerance >= previousEnd, "stepOrder", step, "time");
    const start = Math.max(time, previousEnd);
    // Match the app's strict interval ordering while allowing decimal rounding at a boundary.
    let length = duration;
    const end = start + (length ?? 0);
    need(end <= v.brewTime + secondsTolerance && start <= v.brewTime, "stepEnd", step, "time");
    if (length !== undefined && end > v.brewTime) length = v.brewTime - start;
    previousEnd = start + (length ?? 0);
    if (targetWeight !== undefined) {
      need(length > 0 && previousEnd > start, "weightDuration", step, "duration");
      need(targetWeight >= previousWeight, "descendingWeight", step, "targetWeight");
      need(Number.isFinite(Math.fround((targetWeight - previousWeight) / length)), "weightFlow", step, "targetWeight");
      previousWeight = targetWeight;
    }
    return compact({ time: start, duration: length > 0 ? length : undefined, action, target, comment });
  });
  need(previousWeight === v.finalWeight, "finalWeight", row, "finalWeight");
  return { finalWeight: v.finalWeight, brewTime: range(v.brewTime, v.timeMax, row, "timeMax"), steps };
}

function recipeProfile(row) {
  const v = row.values;
  need(v.recipeName, "requiredField", row, "recipeName");
  return compact({
    id: uuid(v.id, row), name: v.recipeName, method: v.method,
    dose: v.dose, ...recipePlan(row),
    brewTemperature: range(v.brewTemperature, v.temperatureMax, row, "temperatureMax"),
    notes: v.notes,
    brewer: nested({ type: v.brewerType, brand: v.brewerBrand, model: v.brewerModel }),
    grinder: nested({ brand: v.grinderBrand, model: v.grinderModel, grindSetting: v.grindSetting, info: v.grindInfo }),
    water: nested({ name: v.waterName, tds: v.waterTDS, notes: v.waterNotes }),
    author: nested({ name: v.authorName, url: secureURL(v.authorURL, row, "authorURL") })
  });
}

export function buildProfile(coffeeRow, origins, recipeRows) {
  const v = coffeeRow.values;
  need(v.name, "requiredField", coffeeRow, "name");
  need(v.roaster, "requiredField", coffeeRow, "roaster");
  need(!v.description || v.score !== undefined, "missingScore", coffeeRow, "score");
  const id = uuid(v.id, coffeeRow);
  const ids = new Set([id]);
  const recipes = recipeRows.map(row => {
    const recipe = recipeProfile(row);
    need(!ids.has(recipe.id), "duplicateID", row, "id");
    ids.add(recipe.id);
    return recipe;
  });
  const photo = secureURL(v.photo, coffeeRow, "photo");
  const coffee = compact({
    id, name: v.name, roaster: v.roaster, code: v.code,
    url: secureURL(v.url, coffeeRow, "url"), roast: v.roast,
    photos: photo ? [{ uri: photo }] : undefined,
    scores: v.score === undefined ? undefined : [compact({ system: "sca-q", score: v.score, description: v.description })],
    beans: origins.map(originProfile),
    recipeIds: recipes.length ? recipes.map(recipe => recipe.id) : undefined
  });
  return compact({ schemaVersion: "0.5", coffee: [coffee], recipes: recipes.length ? recipes : undefined });
}

export function htmlBlock(profile) {
  const json = JSON.stringify(profile, null, 2).replaceAll("<", "\\u003c");
  const html = '<script id="beanzen-brew-profile" type="application/json">\n' + json + "\n</script>";
  if (new TextEncoder().encode(html).length >= HTML_LIMIT) throw new ProfileError("sizeLimit");
  return html;
}

function element(tag, attrs = {}, label = "") {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  if (label) node.textContent = label;
  return node;
}

function mount(root, copy) {
  const form = root.querySelector("form");
  const snippet = root.querySelector("#profile-snippet");
  const status = root.querySelector("[data-status]");
  const error = root.querySelector("[data-error]");
  const generate = form.querySelector('button[type="submit"]');
  const copyButton = root.querySelector("[data-copy]");
  const glyphs = document.querySelector("#profile-glyphs").content;
  const numbers = new Intl.NumberFormat(document.documentElement.lang, { maximumFractionDigits: 3 });
  const plurals = new Intl.PluralRules(document.documentElement.lang);
  const origins = [];
  const recipes = [];
  let invalidField;
  let fieldID = 0;

  function glyph(name) {
    return glyphs.querySelector('[data-glyph="' + name + '"] > svg')?.cloneNode(true);
  }

  function setRequired(control, required) {
    control.required = Boolean(required);
    control.labels[0]?.querySelector(".profileRequired")?.toggleAttribute("hidden", !required);
  }

  function field(container, name, options = {}) {
    const { type = "text", choices, required, min, max, pattern, length, value, icon, title, noLabel } = options;
    const wrapper = element("div", { class: "profileField" });
    const id = "profile-field-" + ++fieldID;
    const label = element("label", { for: id });
    if (icon) label.append(glyph(icon));
    label.append(document.createTextNode(title ?? copy.fields[name]));
    if (name !== "id") label.append(element("span", { class: "profileRequired", "aria-hidden": "true", hidden: "" }, "*"));
    if (noLabel) label.classList.add("profileVisuallyHidden");
    const control = element(choices ? "select" : type === "textarea" ? "textarea" : "input", { id, name });
    const example = copy.examples[name];
    if (choices) {
      control.append(element("option", { value: "" }, example ? copy.selectExample + choices[example] : "—"));
      for (const [token, text] of Object.entries(choices)) control.append(element("option", { value: token }, text));
    } else {
      if (type === "textarea") control.rows = noLabel ? 4 : 2;
      else control.type = type;
      if (example) control.placeholder = example;
    }
    if (type === "number") control.step = "any";
    if (min !== undefined) control.min = min;
    if (max !== undefined) control.max = max;
    if (pattern) control.pattern = pattern;
    if (length) control.maxLength = length;
    if (value !== undefined) control.value = value;
    wrapper.append(label, control);
    container.append(wrapper);
    setRequired(control, required);
    return control;
  }

  function fields(container, config) {
    return Object.fromEntries(Object.entries(config).map(([name, options]) => [name, field(container, name, options)]));
  }

  function data(controls) {
    const values = Object.fromEntries(Object.entries(controls).map(([key, input]) =>
      [key, input.type === "number" ? (input.value === "" ? undefined : input.valueAsNumber) : input.value.trim()]
    ));
    return { fields: controls, values };
  }

  function disclosure(parent, title, className, open = false) {
    const region = element("details", { class: className });
    const summary = element("summary", {}, title);
    const body = element("div");
    region.open = open;
    region.append(summary, body);
    parent.append(region);
    return { region, summary, body };
  }

  function rows(parent) {
    const body = element("div", { class: "profileRows" });
    parent.append(body);
    return body;
  }

  function section(parent, title, open = false) {
    return rows(disclosure(parent, title, "profileSection", open).body);
  }

  function more(parent) {
    return rows(disclosure(parent, copy.more, "profileMore").body);
  }

  function withIndex(title, index) {
    return title + " " + (index + 1);
  }

  const optionalText = { length: 200 };
  const positive = { type: "number", min: 0.000001 };
  const seconds = { ...positive, max: MAX_BREW_SECONDS };
  const weight = { ...positive, max: MAX_FLOAT };
  const temperature = { type: "number", min: 0, max: 100 };
  const notes = { type: "textarea", length: 4000 };
  const link = { type: "url", length: 2000, icon: "website" };
  const identity = { required: true, length: 36 };
  const coffeeArea = root.querySelector("[data-coffee]");
  const scoresArea = root.querySelector("[data-scores]");
  const coffeeHeading = root.querySelector("[data-coffee-heading]");
  const coffeeSubtitle = root.querySelector("[data-coffee-subtitle]");
  const photo = field(root.querySelector("[data-coffee-photo]"), "photo", { ...link, icon: "photo" });

  const coffee = {
    ...fields(coffeeArea, {
      roaster: { required: true, length: 200, icon: "roaster" },
      name: { required: true, length: 200, icon: "tag", type: "textarea" },
      roast: { ...optionalText, icon: "temperature" }
    }),
    ...fields(more(coffeeArea), { code: { ...optionalText, icon: "tag" }, url: link, id: { ...identity, value: createID() } }),
    ...fields(scoresArea, {
      score: { type: "number", min: 0, max: 100, icon: "score" },
      description: { type: "textarea", length: 2000 }
    }),
    photo
  };

  function hintAfter(control, text) {
    control.parentElement.after(element("p", { class: "profileHint profileRowHint" }, text));
  }

  hintAfter(coffee.id, copy.identityHint);
  coffee.name.rows = 1;

  function refreshCoffee() {
    const { name, roast, roaster, description } = data(coffee).values;
    const roastLabel = roast && !roast.toLocaleLowerCase().endsWith(copy.roastSuffix) ? roast + " " + copy.roastSuffix : roast;
    const header = [roaster, roastLabel].filter(Boolean).join(" · ");
    coffeeHeading.textContent = header || name || copy.newCoffee;
    coffeeSubtitle.textContent = header ? name : "";
    coffeeSubtitle.hidden = !coffeeSubtitle.textContent;
    setRequired(coffee.score, description !== "");
  }

  function removeButton(target, text, action) {
    const button = element("button", { type: "button", class: "profileTextButton profileRemove" }, text);
    button.addEventListener("click", action);
    target.append(button);
    return button;
  }

  const addOrigin = root.querySelector("[data-add-origin]");
  function refreshOrigins() {
    origins.forEach((origin, i) => {
      origin.summary.textContent = origins.length === 1 ? copy.origin : withIndex(copy.origin, i);
    });
  }

  addOrigin.addEventListener("click", () => {
    const origin = disclosure(root.querySelector("[data-origins]"), copy.origin, "profileSection", true);
    const primary = rows(origin.body);
    origin.fields = {
      ...fields(primary, {
        country: { pattern: "[A-Za-z]{2}", length: 2, icon: "country" },
        processing: optionalText, variety: { ...optionalText, icon: "bean" }
      }),
      ...fields(more(primary), {
        region: optionalText, farm: optionalText, producer: optionalText, percentage: { ...positive, max: 100 }
      })
    };
    origins.push(origin);
    removeButton(primary, copy.removeOrigin, () => {
      origins.splice(origins.indexOf(origin), 1);
      origin.region.remove();
      refreshOrigins();
      addOrigin.focus();
      invalidate();
    });
    refreshOrigins();
    origin.fields.country.focus();
    invalidate();
  });

  function readRecipe(recipe) {
    return { ...data(recipe.fields), steps: recipe.steps.map(step => data(step.fields)) };
  }

  function rangeText(lower, upper, format) {
    if (lower === undefined) return "—";
    return upper !== undefined && lower < upper ? format(lower) + "–" + format(upper) : format(lower);
  }

  function refreshRecipe(recipe, index, chartsChanged = true) {
    const draft = readRecipe(recipe);
    const v = draft.values;
    recipe.heading.textContent = v.recipeName || withIndex(copy.recipe, index);
    const brewer = [v.brewerBrand, v.brewerModel].filter(Boolean).join(" ") || v.brewerType || copy.methods[v.method];
    const countLabel = copy.stepCounts[plurals.select(recipe.steps.length)] ?? copy.stepCounts.other;
    const commonTemperature = !draft.steps.some(step => step.values.targetTemperature !== undefined);
    const temperature = commonTemperature && v.brewTemperature !== undefined
      ? rangeText(v.brewTemperature, v.temperatureMax, numbers.format) + " °C" : "";
    recipe.subtitle.textContent = [brewer, recipe.steps.length + " " + countLabel, temperature].filter(Boolean).join(" · ");
    recipe.ratio.textContent = v.dose > 0 && v.finalWeight > 0 ? "1:" + numbers.format(Math.round(v.finalWeight / v.dose * 10) / 10) : "—";
    recipe.time.textContent = rangeText(v.brewTime, v.timeMax, formatTime);
    recipe.finishTime.textContent = recipe.time.textContent;
    let previous = 0;
    for (const [index, step] of draft.steps.entries()) {
      const { time, targetWeight, action, targetTemperature, targetFlow, targetPressure } = step.values;
      const entry = recipe.steps[index];
      entry.clock.textContent = formatTime(time);
      let caption = copy.actions[action] || "";
      if (targetWeight !== undefined) {
        const delta = targetWeight - previous;
        caption = [caption, (delta >= 0 ? "+" : "−") + numbers.format(Math.abs(delta)) + " " + copy.weightUnit, "→", numbers.format(targetWeight) + " " + copy.weightUnit].filter(Boolean).join(" ");
        previous = targetWeight;
      }
      entry.title.textContent = caption || withIndex(copy.step, index);
      setRequired(step.fields.duration, targetWeight !== undefined);
      entry.hint.hidden = Boolean(action || [targetWeight, targetTemperature, targetFlow, targetPressure].some(value => value !== undefined));
      entry.remove.hidden = recipe.steps.length === 1;
    }
    if (!chartsChanged) return;
    let plan;
    try {
      plan = recipePlan(draft);
    } catch (failure) {
      if (!(failure instanceof ProfileError)) throw failure;
    }
    showRecipeCharts(recipe.charts, plan, copy);
  }

  function metricOutput(parent, title) {
    const metric = element("div", { class: "profileMetric" });
    const output = element("span", { class: "profileMetricNumber" }, "—");
    metric.append(element("span", { class: "profileMetricLabel" }, title), output);
    parent.append(metric);
    return output;
  }

  function stepRow(parent, title, open) {
    const step = disclosure(parent, "", "profileStep", open);
    step.clock = element("span", { class: "profileStepClock" }, "—");
    step.title = element("span", {}, title);
    step.summary.append(step.clock, step.title);
    return step;
  }

  const addRecipe = root.querySelector("[data-add-recipe]");
  addRecipe.addEventListener("click", () => {
    const recipe = disclosure(root.querySelector("[data-recipes]"), "", "profileRecipe", true);
    recipe.heading = element("span", { class: "profileRecipeName" });
    recipe.subtitle = element("span", { class: "profileObjectSubtitle" });
    const header = element("span", { class: "profileRecipeHeader" });
    header.append(recipe.heading, recipe.subtitle);
    recipe.summary.append(glyph("book"), header);

    recipe.charts = element("div", { class: "profileCharts", hidden: "" });
    const metrics = element("div", { class: "profileMetrics" });
    const upper = element("div", { class: "profileMetricUpper" });
    const lower = element("div", { class: "profileMetricLower" });
    metrics.append(upper, lower);
    recipe.body.append(recipe.charts, metrics);
    recipe.fields = fields(upper, {
      dose: { ...weight, max: 1000, title: copy.metricDose },
      finalWeight: { ...weight, required: true, title: copy.metricWeight }
    });
    recipe.ratio = metricOutput(upper, copy.ratio);
    recipe.time = metricOutput(lower, copy.metricTime);
    recipe.fields.brewTemperature = field(lower, "brewTemperature", { ...temperature, title: copy.metricTemperature });
    const extra = disclosure(metrics, copy.extraMetrics, "profileMore");
    recipe.fields.temperatureMax = field(rows(extra.body), "temperatureMax", temperature);

    const steps = section(recipe.body, copy.steps, true);
    const stepList = element("div", { class: "profileSteps" });
    const addStep = element("button", { type: "button", class: "profileTextButton" }, copy.addStep);
    steps.append(stepList, addStep);
    recipe.steps = [];

    // Finish owns the total time, shares its summary with the metric strip and is not removable.
    const finish = stepRow(steps, copy.finish, true);
    recipe.finishTime = finish.clock;
    Object.assign(recipe.fields, fields(rows(finish.body), {
      brewTime: { ...seconds, required: true, icon: "time" }, timeMax: seconds
    }));

    recipe.fields.recipeName = field(rows(recipe.body), "recipeName", { required: true, length: 200, type: "textarea", icon: "tag" });
    recipe.fields.recipeName.rows = 1;
    Object.assign(recipe.fields, fields(section(recipe.body, copy.brewer), {
      brewerBrand: { ...optionalText, icon: "brewer" }, brewerModel: optionalText, brewerType: optionalText
    }));
    recipe.fields.method = field(rows(recipe.body), "method", { choices: copy.methods, icon: "brewer" });
    Object.assign(recipe.fields, fields(section(recipe.body, copy.grinder), {
      grinderBrand: { ...optionalText, icon: "grinder" }, grinderModel: optionalText, grindSetting: { length: 100 }, grindInfo: notes
    }));
    Object.assign(recipe.fields, fields(section(recipe.body, copy.water), {
      waterName: { ...optionalText, icon: "water" }, waterTDS: { type: "number", min: 0 }, waterNotes: notes
    }));
    recipe.fields.notes = field(section(recipe.body, copy.notes), "notes", { ...notes, noLabel: true });
    Object.assign(recipe.fields, fields(section(recipe.body, copy.author), {
      authorName: { ...optionalText, icon: "person" }, authorURL: link
    }));
    recipe.fields.id = field(more(recipe.body), "id", { ...identity, value: createID() });
    hintAfter(recipe.fields.id, copy.identityHint);
    removeButton(recipe.body, copy.removeRecipe, () => {
      recipes.splice(recipes.indexOf(recipe), 1);
      recipe.region.remove();
      recipes.forEach((item, index) => refreshRecipe(item, index, false));
      addRecipe.focus();
      invalidate();
    });

    function appendStep() {
      const previous = recipe.steps.at(-1)?.fields;
      const start = previous ? Math.round((Number(previous.time.value) + Number(previous.duration.value)) * 1e6) / 1e6 : 0;
      const step = stepRow(stepList, copy.step, true);
      const editable = rows(step.body);
      step.fields = fields(editable, {
        time: { type: "number", min: 0, max: MAX_BREW_SECONDS, required: true, value: start, icon: "time" },
        targetWeight: { ...weight, min: 0, icon: "weight" }, duration: { ...seconds, icon: "time" }
      });
      const advanced = more(editable);
      Object.assign(step.fields, fields(advanced, {
        action: { choices: copy.actions }, targetTemperature: { ...temperature, icon: "temperature" },
        targetFlow: { type: "number", min: 0 }, targetPressure: { type: "number", min: 0 },
        comment: { type: "textarea", length: 500 }
      }));
      step.hint = element("p", { class: "profileHint profileRowHint" }, copy.stepNeedsValue);
      editable.append(step.hint);
      step.remove = removeButton(editable, copy.removeStep, () => {
        recipe.steps.splice(recipe.steps.indexOf(step), 1);
        step.region.remove();
        refreshRecipe(recipe, recipes.indexOf(recipe));
        addStep.focus();
        invalidate();
      });
      recipe.steps.push(step);
      return step;
    }

    recipes.push(recipe);
    appendStep();
    refreshRecipe(recipe, recipes.length - 1);
    addStep.addEventListener("click", () => {
      const step = appendStep();
      refreshRecipe(recipe, recipes.indexOf(recipe));
      step.fields.time.focus();
      invalidate();
    });
    recipe.summary.focus();
    invalidate();
  });

  function invalidate() {
    snippet.value = "";
    copyButton.disabled = true;
    error.hidden = true;
    invalidField?.removeAttribute("aria-invalid");
    invalidField?.removeAttribute("aria-describedby");
    invalidField = undefined;
    status.textContent = "";
  }

  function reveal(control) {
    for (let parent = control.parentElement; parent && parent !== form; parent = parent.parentElement) {
      if (parent.tagName === "DETAILS") parent.open = true;
    }
  }

  form.addEventListener("invalid", event => reveal(event.target), true);
  form.addEventListener("input", event => {
    invalidate();
    const container = event.target.closest(".profileRecipe");
    if (!container) {
      refreshCoffee();
      return;
    }
    const index = recipes.findIndex(recipe => recipe.region === container);
    if (index === -1) return;
    const changesPlan = ["finalWeight", "brewTime", "timeMax", "time", "duration", "action", "targetWeight",
      "targetTemperature", "targetFlow", "targetPressure"].includes(event.target.name);
    refreshRecipe(recipes[index], index, changesPlan);
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    invalidate();
    try {
      const profile = buildProfile(data(coffee), origins.map(row => data(row.fields)), recipes.map(readRecipe));
      snippet.value = htmlBlock(profile);
      status.textContent = copy.generated;
      copyButton.disabled = false;
      copyButton.focus();
    } catch (failure) {
      if (!(failure instanceof ProfileError)) throw failure;
      error.textContent = copy[failure.message];
      const field = failure.field;
      if (field) {
        field.parentElement.append(error);
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", error.id);
        invalidField = field;
        reveal(field);
        field.focus();
      } else {
        generate.after(error);
      }
      error.hidden = false;
    }
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(snippet.value);
      status.textContent = copy.copied;
    } catch {
      snippet.focus();
      snippet.select();
      status.textContent = copy.selected;
    }
  });
  root.hidden = false;
}

if (typeof document !== "undefined") {
  const root = document.querySelector("[data-profile-builder]");
  const copy = JSON.parse(document.querySelector("#profile-builder-copy").textContent);
  mount(root, copy);
}
