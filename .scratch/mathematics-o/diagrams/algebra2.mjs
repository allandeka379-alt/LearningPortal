import { D, fig, place, C, T, ln, dt, poly, numberLine } from "./lib2.mjs";

// ---- Inequalities: number lines (open/closed circles)
{
  const w = 560, h = 330;
  let b = "";
  const rows = [
    { y: 70, label: "x > 3", from: 3, fromOpen: true, to: null },
    { y: 140, label: "x ≤ −2", from: null, to: -2, toOpen: false },
    { y: 210, label: "−2 ≤ x < 5", from: -2, fromOpen: false, to: 5, toOpen: true },
    { y: 280, label: "−3 < x ≤ 4 (integers marked)", from: -3, fromOpen: true, to: 4, toOpen: false, ints: true },
  ];
  const a = -5, z = 8, x0 = 40, x1 = 520;
  for (const r of rows) {
    const { svg: nl, X } = numberLine(r.y, a, z, x0, x1);
    b += D.text(x0 - 10, r.y - 28, r.label, { size: 16, weight: 700, fill: C.blue }) + nl;
    const xs = r.from === null ? x0 - 2 : X(r.from), xe = r.to === null ? x1 + 6 : X(r.to);
    b += D.line(xs, r.y, xe, r.y, { stroke: C.amber, width: 5 });
    if (r.to === null) b += D.polyline([[x1 + 20, r.y], [x1 + 6, r.y - 8], [x1 + 6, r.y + 8]], { close: true, fill: C.amber, stroke: C.amber, width: 1 });
    if (r.from === null) b += D.polyline([[x0 - 16, r.y], [x0 - 2, r.y - 8], [x0 - 2, r.y + 8]], { close: true, fill: C.amber, stroke: C.amber, width: 1 });
    if (r.from !== null) b += D.circle(X(r.from), r.y, 7, { fill: r.fromOpen ? "#fff" : C.amber, stroke: C.amber, width: 3 });
    if (r.to !== null) b += D.circle(X(r.to), r.y, 7, { fill: r.toOpen ? "#fff" : C.amber, stroke: C.amber, width: 3 });
    if (r.ints) for (let v = -2; v <= 4; v += 1) b += D.dot(X(v), r.y - 16, { r: 3.5, stroke: C.green });
  }
  const alt = "Four number lines: x > 3 has an open circle at 3 and an arrow right; x ≤ −2 has a closed circle at −2 and an arrow left; −2 ≤ x < 5 is closed at −2 and open at 5; −3 < x ≤ 4 is open at −3 and closed at 4, with the integers −2 to 4 marked.";
  await fig("inequalities-number-lines", b, w, h, alt, "Figure: open circles exclude the end value, closed circles include it");
  place("algebra/inequalities", "## Showing inequalities on a number line", "inequalities-number-lines", alt, "Figure: open circles exclude the end value, closed circles include it");
}

// ---- Linear programming: Mr Moyo's feasible region
{
  const ax = D.axes({ x: [0, 12], y: [0, 12], xTicks: 2, yTicks: 2, xLabel: "x (maize, ha)", yLabel: "y (soya, ha)", w: 560, h: 440, pad: { l: 60, r: 24, t: 28, b: 56 } });
  const V = [[0, 2], [7, 2], [6, 4], [0, 10]];
  let b = ax.frame;
  b += D.polyline(V.map(([x, y]) => [ax.X(x), ax.Y(y)]), { close: true, fill: C.fillGreen, stroke: "none" });
  b += ax.line([[0, 10], [10, 0]], { stroke: C.blue, width: 2.4 }) + ax.line([[0, 16], [8, 0]], { stroke: C.amber, width: 2.4 }) + ax.line([[0, 2], [12, 2]], { stroke: C.purple, width: 2.4 });
  b += ax.line([[0, 5], [3, 0]], { stroke: C.muted, width: 2, dash: "7 5" });
  b += D.polyline(V.map(([x, y]) => [ax.X(x), ax.Y(y)]), { close: true, stroke: C.green, width: 2.4 });
  b += ax.tag(4.3, 9.4, "2x + y = 16", { fill: C.amber }) + ax.tag(10.3, 1.2, "y = 2", { fill: C.purple }) + ax.tag(8.6, 3.5, "x + y = 10", { fill: C.blue });
  for (const [x, y] of V) b += ax.point(x, y, { stroke: C.ink });
  b += ax.tag(0.3, 1.3, "(0, 2): P = 600", { size: 13 }) + ax.tag(6.8, 1.2, "(7, 2): P = 4100", { anchor: "end", size: 13 }) + ax.tag(6.3, 5.0, "(6, 4): P = 4200") + ax.tag(0.3, 10.9, "(0, 10): P = 3000");
  b += ax.tag(2.8, 3.2, "feasible region", { fill: C.green });
  b += ax.tag(1.0, 4.5, "search line", { fill: C.muted });
  const alt = "Linear programming for Mr Moyo: the shaded feasible region is the quadrilateral with vertices (0, 2), (7, 2), (6, 4) and (0, 10), bounded by y = 2, 2x + y = 16, x + y = 10 and the y-axis, with a dashed search line 500x + 300y = 1500; profit is 600, 4100, 4200 and 3000, so the maximum US$4200 is at (6, 4).";
  await fig("linear-programming-moyo-region", b, 560, 440, alt, "Figure: the feasible region and the profit at each vertex");
  place("algebra/linear-programming", "### The search line method", "linear-programming-moyo-region", alt, "Figure: the feasible region and the profit at each vertex");
}
