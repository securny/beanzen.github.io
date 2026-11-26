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

function recipeProfile(row) {
  const v = row.values;
  need(v.recipeName, "requiredField", row, "recipeName");
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
  return compact({
    id: uuid(v.id, row), name: v.recipeName, method: v.method,
    dose: v.dose, finalWeight: v.finalWeight,
    brewTime: range(v.brewTime, v.timeMax, row, "timeMax"),
    brewTemperature: range(v.brewTemperature, v.temperatureMax, row, "temperatureMax"),
    notes: v.notes,
    brewer: nested({ type: v.brewerType, brand: v.brewerBrand, model: v.brewerModel }),
    grinder: nested({ brand: v.grinderBrand, model: v.grinderModel, grindSetting: v.grindSetting, info: v.grindInfo }),
    water: nested({ name: v.waterName, tds: v.waterTDS, notes: v.waterNotes }),
    author: nested({ name: v.authorName, url: secureURL(v.authorURL, row, "authorURL") }),
    steps
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
  const snippet = root.querySelector("textarea");
  const status = root.querySelector("[data-status]");
  const error = root.querySelector("[data-error]");
  const generate = form.querySelector('button[type="submit"]');
  let invalidField;
  const copyButton = root.querySelector("[data-copy]");
  const origins = [];
  const recipes = [];
  let fieldID = 0;

  function field(container, name, options = {}) {
    const { type = "text", choices, placeholder, required, min, max, pattern, length, value } = options;
    const wrapper = element("div", { class: "profileField" });
    const id = "profile-field-" + ++fieldID;
    const label = element("label", { for: id }, copy.fields[name]);
    const control = element(choices ? "select" : type === "textarea" ? "textarea" : "input", { id, name });
    if (choices) {
      control.append(element("option", { value: "" }, "—"));
      for (const [token, title] of Object.entries(choices)) control.append(element("option", { value: token }, title));
    } else if (type === "textarea") control.rows = 2;
    else control.type = type;
    if (required) control.required = true;
    if (type === "number") control.step = "any";
    if (min !== undefined) control.min = min;
    if (max !== undefined) control.max = max;
    if (pattern) control.pattern = pattern;
    if (length) control.maxLength = length;
    if (placeholder) control.placeholder = placeholder;
    if (value !== undefined) control.value = value;
    if (type === "textarea") wrapper.classList.add("profileFieldWide");
    wrapper.append(label, control);
    container.append(wrapper);
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

  function group(parent, list, title, remove, nextFocus, tag = "h3") {
    const region = element("section", { class: "profileGroup" });
    const header = element("div", { class: "profileGroupHeader" });
    const h = element(tag, { id: "profile-group-" + ++fieldID });
    region.setAttribute("aria-labelledby", h.id);
    const button = element("button", { type: "button", class: "profileTextButton profileRemove" }, remove);
    const group = { region, heading: h, removeButton: button };
    function update() {
      list.forEach((item, i) => {
        item.heading.textContent = title + " " + (i + 1);
        item.removeButton.setAttribute("aria-label", remove + " " + (i + 1));
      });
    }
    button.addEventListener("click", () => {
      list.splice(list.indexOf(group), 1);
      region.remove();
      update();
      nextFocus.focus();
      invalidate();
    });
    header.append(h, button);
    region.append(header);
    parent.append(region);
    list.push(group);
    update();
    return group;
  }

  function grid(parent) {
    const div = element("div", { class: "profileFields" });
    parent.append(div);
    return div;
  }

  const optionalText = { length: 200 };
  const positive = { type: "number", min: 0.000001 };
  const seconds = { ...positive, max: MAX_BREW_SECONDS };
  const weight = { ...positive, max: MAX_FLOAT };
  const temperature = { type: "number", min: 0, max: 100 };
  const notes = { type: "textarea", length: 4000 };
  const coffee = {
    ...fields(root.querySelector("[data-coffee]"), { name: { required: true, length: 200 }, roaster: { required: true, length: 200 } }),
    ...fields(root.querySelector("[data-coffee-extras]"), {
      url: { type: "url", length: 2000 }, photo: { type: "url", length: 2000 },
      code: optionalText, roast: optionalText, score: { type: "number", min: 0, max: 100 },
      description: { type: "textarea", length: 2000 }, id: { required: true, value: createID(), length: 36 }
    })
  };
  coffee.id.parentElement.after(element("p", { class: "profileHint profileFieldWide" }, copy.identityHint));

  const addOrigin = root.querySelector("[data-add-origin]");
  addOrigin.addEventListener("click", () => {
    const origin = group(root.querySelector("[data-origins]"), origins, copy.origin, copy.removeOrigin, addOrigin);
    origin.fields = fields(grid(origin.region), {
      country: { pattern: "[A-Za-z]{2}", length: 2, placeholder: "BR" }, region: optionalText, farm: optionalText,
      producer: optionalText, processing: optionalText, variety: optionalText, percentage: { ...weight, max: 100 }
    });
    origin.fields.country.focus();
    invalidate();
  });

  const addRecipe = root.querySelector("[data-add-recipe]");
  addRecipe.addEventListener("click", () => {
    const recipe = group(root.querySelector("[data-recipes]"), recipes, copy.recipe, copy.removeRecipe, addRecipe);
    recipe.fields = fields(grid(recipe.region), {
      recipeName: { required: true, length: 200 }, method: { choices: copy.methods },
      dose: { ...weight, max: 1000 }, finalWeight: { ...weight, required: true },
      brewTime: { ...seconds, required: true }, timeMax: seconds,
      brewTemperature: temperature, temperatureMax: temperature
    });
    const equipment = element("details", { class: "profileDetails" });
    equipment.append(element("summary", {}, copy.equipment));
    Object.assign(recipe.fields, fields(grid(equipment), {
      brewerType: optionalText, brewerBrand: optionalText, brewerModel: optionalText,
      grinderBrand: optionalText, grinderModel: optionalText, grindSetting: { length: 100 }, grindInfo: notes,
      waterName: optionalText, waterTDS: { type: "number", min: 0 }, waterNotes: notes,
      authorName: optionalText, authorURL: { type: "url", length: 2000 }, notes,
      id: { required: true, value: createID(), length: 36 }
    }));
    recipe.fields.id.parentElement.after(element("p", { class: "profileHint profileFieldWide" }, copy.identityHint));
    const stepList = element("div", { class: "profileSteps" });
    const addStep = element("button", { type: "button", class: "profileTextButton" }, copy.addStep);
    recipe.steps = [];
    function appendStep() {
      const previous = recipe.steps.at(-1)?.fields;
      const time = previous ? Math.round((Number(previous.time.value) + Number(previous.duration.value)) * 1e6) / 1e6 : 0;
      const step = group(stepList, recipe.steps, copy.step, copy.removeStep, addStep, "h4");
      step.fields = fields(grid(step.region), {
        time: { type: "number", min: 0, max: MAX_BREW_SECONDS, required: true, value: time }, duration: seconds,
        action: { choices: copy.actions, value: recipe.steps.length === 1 ? "pour" : "" },
        targetWeight: { ...weight, min: 0 }, comment: { type: "textarea", length: 500 }
      });
      const targets = element("details", { class: "profileDetails" });
      targets.append(element("summary", {}, copy.stepTargets));
      Object.assign(step.fields, fields(grid(targets), {
        targetTemperature: temperature, targetFlow: { type: "number", min: 0 },
        targetPressure: { type: "number", min: 0 }
      }));
      step.region.append(targets);
      // A recipe always has at least one step. Keep the only step in place.
      recipe.steps.forEach(item => { item.removeButton.hidden = recipe.steps.length === 1; });
      step.removeButton.addEventListener("click", () => {
        recipe.steps.forEach(item => { item.removeButton.hidden = recipe.steps.length === 1; });
      });
      return step;
    }
    recipe.region.append(equipment, stepList, addStep);
    appendStep();
    addStep.addEventListener("click", () => { appendStep().fields.time.focus(); invalidate(); });
    recipe.fields.recipeName.focus();
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

  // Open collapsed fields before native validation tries to focus them.
  form.addEventListener("invalid", event => {
    const details = event.target.closest("details");
    if (details) details.open = true;
  }, true);
  form.addEventListener("input", invalidate);
  form.addEventListener("submit", event => {
    event.preventDefault();
    invalidate();
    try {
      const profile = buildProfile(data(coffee), origins.map(row => data(row.fields)), recipes.map(row => ({
        ...data(row.fields), steps: row.steps.map(step => data(step.fields))
      })));
      snippet.value = htmlBlock(profile);
      status.textContent = copy.generated;
      copyButton.disabled = false;
      copyButton.focus();
    } catch (failure) {
      if (!(failure instanceof ProfileError)) throw failure;
      error.textContent = copy[failure.message];
      error.hidden = false;
      const field = failure.field;
      if (field) {
        field.parentElement.append(error);
        field.setAttribute("aria-invalid", "true");
        field.setAttribute("aria-describedby", error.id);
        invalidField = field;
        const details = field.closest("details");
        if (details) details.open = true;
        field.focus();
      } else {
        generate.after(error);
      }
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
