const namespace = "http://www.w3.org/2000/svg";

function svg(tag, attributes = {}, label) {
  const node = document.createElementNS(namespace, tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  if (label !== undefined) node.textContent = label;
  return node;
}

export function formatTime(value) {
  if (!Number.isFinite(value)) return "—";
  const tenths = Math.round(value * 10);
  const minutes = Math.floor(tenths / 600);
  const seconds = String(Math.floor(tenths / 10) % 60).padStart(2, "0");
  return minutes + ":" + seconds + (tenths % 10 ? "." + tenths % 10 : "");
}

function plan(recipe) {
  const finish = Array.isArray(recipe.brewTime) ? recipe.brewTime[1] : recipe.brewTime;
  const weight = [[0, 0]];
  const flow = [[0, 0]];
  let total = 0;
  // The builder validates ordered, timed target weights before drawing a preview.
  for (const step of recipe.steps) {
    const next = step.target?.weight;
    if (next === undefined) continue;
    const end = step.time + step.duration;
    const rate = (next - total) / step.duration;
    weight.push([step.time, total], [end, next]);
    flow.push([step.time, 0], [step.time, rate], [end, rate], [end, 0]);
    total = next;
  }
  weight.push([finish, total]);
  flow.push([finish, 0]);
  return { weight, flow, finish, boundaries: [...new Set(recipe.steps.map(step => step.time))] };
}

function graph(points, finish, boundaries, { title, unit, height, intervals }) {
  const width = 440;
  const left = 3;
  const right = 363;
  const top = 12;
  const bottom = height - 24;
  const peak = points.reduce((largest, point) => Math.max(largest, point[1]), 0);
  const rawStep = peak / intervals;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const tick = [1, 2, 2.5, 5, 10].find(n => n * magnitude >= rawStep) * magnitude;
  const maximum = tick * intervals;
  const x = time => left + time / finish * (right - left);
  const y = value => bottom - value / maximum * (bottom - top);
  const chart = svg("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": title });
  for (let i = 0; i <= intervals; i++) {
    const value = i * tick;
    chart.append(svg("line", { x1: left, x2: right, y1: y(value), y2: y(value), class: "profileChartGrid" }));
    if (i) chart.append(svg("text", { x: right + 8, y: y(value) + 4 }, Number(value.toPrecision(3)) + " " + unit));
  }
  for (const time of [...boundaries, finish]) {
    chart.append(svg("line", { x1: x(time), x2: x(time), y1: top, y2: bottom, class: "profileChartGrid" }));
  }
  chart.append(svg("polyline", { points: points.map(([t, v]) => x(t) + "," + y(v)).join(" "), class: "profileChartTarget" }));
  const ticks = finish < 3 ? [0, finish] : [0, finish / 3, finish * 2 / 3, finish];
  for (const time of ticks) {
    const align = time === 0 ? "start" : time === finish ? "end" : "middle";
    chart.append(svg("text", { x: x(time), y: height - 6, "text-anchor": align }, formatTime(time)));
  }
  return chart;
}

export function showRecipeCharts(container, recipe, copy) {
  container.hidden = !recipe;
  if (!recipe) {
    container.replaceChildren();
    return;
  }
  const { weight, flow, finish, boundaries } = plan(recipe);
  container.replaceChildren(
    graph(weight, finish, boundaries, { title: copy.weightChart, unit: copy.weightUnit, height: 190, intervals: 4 }),
    graph(flow, finish, boundaries, { title: copy.flowChart, unit: copy.flowUnit, height: 104, intervals: 3 })
  );
}
