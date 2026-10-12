// Category A question fixes (mathematics-o JSON is the source: edited in place).
import fs from "node:fs";
import { D, fig } from "./lib.mjs";
const C = D.C;
const Q = "content/subjects/mathematics-o/questions";

// Figure for graphs.functions.q17: y = x^3 - 6x + 2, -3 <= x <= 3
const f = (x) => x ** 3 - 6 * x + 2;
const ax = D.axes({ x: [-3, 3], y: [-12, 12], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 520, h: 440 });
const body = ax.frame + ax.plot(f, { domain: [-3, 3], steps: 300 });
const alt = "Graph of y = x³ − 6x + 2 for x from −3 to 3 on a grid: the curve rises from the bottom left to a maximum near x = −1.4, falls to a minimum near x = 1.4 and rises again, crossing the x-axis three times, with the largest crossing a little above x = 2.";
const cap = "Figure: the graph of y = x³ − 6x + 2 for −3 ≤ x ≤ 3";
await fig("cubic-x3-minus-6x-plus-2", body, 520, 440, alt, cap);
const md = D.md("cubic-x3-minus-6x-plus-2", alt, cap);

function edit(file, key, fn) {
  const p = `${Q}/${file}`;
  const raw = fs.readFileSync(p, "utf8");
  const arr = JSON.parse(raw);
  const q = arr.find((x) => x.key === key);
  if (!q) throw new Error(key);
  fn(q);
  fs.writeFileSync(p, JSON.stringify(arr, null, 2) + "\n");
}
const swap = (o, field, a, b) => { if (!o[field].includes(a)) { if (o[field].includes(b)) return; throw new Error(`missing: ${a}`); } o[field] = o[field].replace(a, b); };
const part = (q, label) => q.parts.find((x) => x.label === label);

edit("geometry/bearings.json", "geometry.bearings.q20", (q) => swap(part(q, "(c)"), "stem", "On the drawing, the line $AB$ is measured with a protractor. Where must the protractor's zero line be placed?", "To mark the bearing of $B$ from $A$ with a protractor, where must the protractor's zero line be placed?"));
edit("geometry/scale-drawings.json", "geometry.scale.q12", (q) => {
  swap(part(q, "(a)"), "stem", "apart on the map.", "apart on a map drawn to this scale.");
  swap(part(q, "(c)"), "stem", "A dam is shown on the map with an area of", "A dam has an area on such a map of");
});
edit("geometry/scale-drawings.json", "geometry.scale.q13", (q) => swap(part(q, "(c)"), "stem", "How wide should the door be on the drawing, in millimetres?", "How wide should the door be when it is drawn to this scale, in millimetres?"));
edit("statistics/histograms.json", "statistics.histograms.q12", (q) => swap(part(q, "(d)"), "stem", "Which class has the tallest bar in the histogram?", "Which class would have the tallest bar if these data were drawn as a histogram?"));
edit("graphs/graphs-of-functions.json", "graphs.functions.q17", (q) => { if (!q.stem.includes("media:")) q.stem = `${q.stem}\n\n${md}`; });
console.log("question edits done");
