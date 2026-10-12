// Straight-line graph lessons. Run from repo root: node .scratch/mathematics-o/diagrams/lines.mjs
import { D, fig, put } from "./lib.mjs";
const C = D.C;

// 1. y = 2x - 3 for -2 <= x <= 3 (straight-line-graphs Example 1)
{
  const f = (x) => 2 * x - 3;
  const ax = D.axes({ x: [-3, 4], y: [-8, 4], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 560, h: 420 });
  let b = ax.frame + ax.line([[-2, f(-2)], [3, f(3)]]);
  for (const x of [-2, -1, 0, 1, 2, 3]) b += ax.point(x, f(x), { stroke: C.amber });
  b += ax.tag(-2, f(-2), "(−2, −7)", { dx: 10, dy: 6 }) + ax.tag(3, f(3), "(3, 3)", { dx: 10, dy: -6 }) + ax.tag(0, -3, "(0, −3)", { dx: 10, dy: 22 });
  b += ax.label(1.7, 3.2, "y = 2x − 3", { weight: 700, fill: C.blue, dx: 6 });
  const alt = "Graph of y = 2x − 3 for x from −2 to 3: the six table points (−2, −7), (−1, −5), (0, −3), (1, −1), (2, 1) and (3, 3) lie on one straight line that rises 2 units for every 1 unit across.";
  await fig("linear-y-2x-minus-3", b, 560, 420, alt, "Figure: the six points of the table lie on one ruled line");
  put("coordinate-geometry/straight-line-graphs", "Notice the pattern in the table", "linear-y-2x-minus-3", alt, "Figure: the six points of the table lie on one ruled line");
}

// 2. 2x + 3y = 12 with intercepts (0,4), (6,0) and check point (3,2)
{
  const f = (x) => (12 - 2 * x) / 3;
  const ax = D.axes({ x: [-1, 8], y: [-1, 6], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 560, h: 420 });
  let b = ax.frame + ax.line([[-1, f(-1)], [7, f(7)]]);
  for (const [x, y] of [[0, 4], [6, 0], [3, 2]]) b += ax.point(x, y, { stroke: C.amber, r: 5 });
  b += ax.tag(0, 4, "(0, 4)", { dx: 10, dy: -4 }) + ax.tag(6, 0, "(6, 0)", { dx: -4, dy: -14 }) + ax.tag(3, 2, "(3, 2) check", { dx: 10, dy: -8 });
  b += ax.label(5.6, 1.95, "2x + 3y = 12", { weight: 700, fill: C.blue, dx: 8 });
  const alt = "Graph of 2x + 3y = 12: the line crosses the y-axis at (0, 4) and the x-axis at (6, 0), and the check point (3, 2) also lies on it.";
  await fig("linear-2x-3y-12-intercepts", b, 560, 420, alt, "Figure: the intercepts and a check point fix the line 2x + 3y = 12");
  put("coordinate-geometry/straight-line-graphs", "This is sometimes called the **cover-up method**", "linear-2x-3y-12-intercepts", alt, "Figure: the intercepts and a check point fix the line 2x + 3y = 12");
}

// 3. Gradient triangle on y = 3x + 1 through (0,1) and (2,7)
{
  const ax = D.axes({ x: [-1, 4], y: [-1, 9], xTicks: 1, yTicks: 1, xLabel: "x", yLabel: "y", w: 520, h: 440 });
  let b = ax.frame + ax.line([[-0.3, -2 + 1.1 * 0 + (3 * -0.3 + 1)], [2.6, 3 * 2.6 + 1]].map(([x, y]) => [x, y]));
  b += ax.line([[0, 1], [2, 1], [2, 7]], { stroke: C.amber, width: 2.4, dash: true });
  b += ax.point(0, 1, { stroke: C.blue, r: 5 }) + ax.point(2, 7, { stroke: C.blue, r: 5 });
  b += ax.tag(0, 1, "(0, 1)", { dx: -10, dy: -8, anchor: "end" }) + ax.tag(2, 7, "(2, 7)", { dx: -70, dy: -6 });
  b += ax.label(1, 1, "run = 2", { anchor: "middle", dy: 22, fill: C.amber, weight: 700 }) + ax.label(2, 4, "rise = 6", { dx: 10, dy: 5, fill: C.amber, weight: 700 });
  b += ax.tag(3.95, 2.2, "gradient = 6 ÷ 2 = 3", { anchor: "end", fill: C.blue });
  const alt = "A line through (0, 1) and (2, 7) with a right-angled triangle drawn under it: the run is 2 units across and the rise is 6 units up, so the gradient is 6 divided by 2, which is 3.";
  await fig("gradient-triangle-rise-run", b, 520, 440, alt, "Figure: gradient is rise over run, here 6 ÷ 2 = 3");
  put("coordinate-geometry/gradient", "Finding the gradient from a grid", "gradient-triangle-rise-run", alt, "Figure: gradient is rise over run, here 6 ÷ 2 = 3");
}

// 4. Four kinds of gradient: panels
{
  const W = 560, H = 330, pw = 120, ph = 120;
  const panels = [
    { x: 14, name: "Positive", note: "rises", draw: (x, y) => D.line(x + 10, y + ph - 12, x + pw - 10, y + 14, { stroke: C.blue, width: 3 }) },
    { x: 154, name: "Negative", note: "falls", draw: (x, y) => D.line(x + 10, y + 14, x + pw - 10, y + ph - 12, { stroke: C.blue, width: 3 }) },
    { x: 294, name: "Zero", note: "horizontal", draw: (x, y) => D.line(x + 8, y + ph / 2, x + pw - 8, y + ph / 2, { stroke: C.blue, width: 3 }) },
    { x: 434, name: "Undefined", note: "vertical", draw: (x, y) => D.line(x + pw / 2, y + 8, x + pw / 2, y + ph - 8, { stroke: C.blue, width: 3 }) },
  ];
  let b = "";
  for (const p of panels) {
    const y = 40;
    b += D.rect(p.x, y, pw, ph, { fill: "#fff", stroke: C.grid, width: 1.5 });
    b += D.line(p.x + 8, y + ph - 8, p.x + pw - 8, y + ph - 8, { stroke: C.muted, width: 1 }) + D.line(p.x + 8, y + 8, p.x + 8, y + ph - 8, { stroke: C.muted, width: 1 });
    b += p.draw(p.x, y);
    b += D.text(p.x + pw / 2, 28, p.name, { anchor: "middle", weight: 700, size: 15 });
    b += D.text(p.x + pw / 2, y + ph + 24, p.note, { anchor: "middle", size: 14, fill: C.muted });
  }
  b += D.text(74, 232, "m > 0", { anchor: "middle", size: 16, weight: 700, fill: C.blue }) + D.text(214, 232, "m < 0", { anchor: "middle", size: 16, weight: 700, fill: C.blue }) + D.text(354, 232, "m = 0", { anchor: "middle", size: 16, weight: 700, fill: C.blue }) + D.text(494, 232, "no gradient", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  b += D.text(280, 285, "Read each line from left to right: up is positive, down is negative.", { anchor: "middle", size: 14, fill: C.muted });
  const alt = "Four sketches of lines: a line rising left to right has a positive gradient, one falling has a negative gradient, a horizontal line has gradient zero, and a vertical line has an undefined gradient.";
  await fig("gradient-four-kinds", b, W, H, alt, "Figure: the four kinds of gradient");
  put("coordinate-geometry/gradient", "The bigger the size of the gradient", "gradient-four-kinds", alt, "Figure: the four kinds of gradient");
}

// 5. Equation from a graph: y = 2x - 2 through (0,-2) and (4,6)
{
  const f = (x) => 2 * x - 2;
  const ax = D.axes({ x: [-1, 6], y: [-4, 8], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 540, h: 440 });
  let b = ax.frame + ax.line([[-0.5, f(-0.5)], [5, f(5)]]);
  b += ax.line([[0, -2], [4, -2], [4, 6]], { stroke: C.amber, width: 2.2, dash: true });
  b += ax.point(0, -2, { stroke: C.blue, r: 5 }) + ax.point(4, 6, { stroke: C.blue, r: 5 });
  b += ax.tag(0, -2, "c = −2", { dx: 10, dy: 24 }) + ax.tag(4, 6, "(4, 6)", { dx: -72, dy: -4 });
  b += ax.label(2, -2, "run = 4", { anchor: "middle", dy: 20, fill: C.amber, weight: 700 }) + ax.label(4, 2, "rise = 8", { dx: 10, fill: C.amber, weight: 700 });
  b += ax.tag(0.5, 7.0, "m = 8 ÷ 4 = 2, so y = 2x − 2", { fill: C.blue });
  const alt = "A line crossing the y-axis at (0, −2) and passing through (4, 6): c is −2, the run is 4 and the rise is 8, so the gradient m is 2 and the equation is y = 2x − 2.";
  await fig("equation-from-graph-y-2x-minus-2", b, 540, 440, alt, "Figure: read c at the y-axis, then find m from rise over run");
  put("coordinate-geometry/equation-of-a-line", "### From a graph", "equation-from-graph-y-2x-minus-2", alt, "Figure: read c at the y-axis, then find m from rise over run");
}
console.log("lines done");
