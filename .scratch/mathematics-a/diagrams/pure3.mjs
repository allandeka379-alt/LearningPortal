// Run from the repo root: node .scratch/mathematics-a/diagrams/pure3.mjs
import { D, C, fig, PI } from "./_h.mjs";
const P = { r: 44, b: 44 };

// coordinate/circles Example 3: circle centre (3, -1) radius 5, tangent 3x + 4y = 30 at P(6, 3)
{
  const ax = D.axes({ pad: P, x: [-4, 10], y: [-7, 8], xTicks: 2, yTicks: 2, w: 540, h: 532, xLabel: "x", yLabel: "y" });
  const sc = ax.X(1) - ax.X(0);
  const body = ax.frame + D.circle(ax.X(3), ax.Y(-1), 5 * sc, { stroke: C.blue, width: 2.6 }) +
    ax.line([[2, 6], [10, 0]], { stroke: C.amber, width: 2.4 }) + ax.line([[3, -1], [6, 3]], { stroke: C.muted, width: 2, dash: true }) +
    [[3, -1, "C(3, −1)"], [6, 3, "P(6, 3)"], [-1, 2], [7, 2], [6, -5]].map(([a, b]) => ax.point(a, b)).join("") +
    ax.tag(3, -1, "C(3, −1)", { dx: -90, dy: 6 }) + ax.tag(6, 3, "P(6, 3)", { dx: 8, dy: -10 }) +
    ax.tag(-1, 2, "A(−1, 2)", { dx: -100, dy: -4 }) + ax.tag(7, 2, "B(7, 2)", { dx: 8, dy: 22 }) + ax.tag(6, -5, "(6, −5)", { dx: 8, dy: 22 }) +
    ax.label(2.1, 6.9, "tangent 3x + 4y = 30", { fill: C.amber, weight: 700, size: 14 }) + ax.label(4.4, 0.6, "r = 5", { fill: C.muted, size: 13 });
  await fig("coordinate/circles", "circle-tangent-at-point", D.svg(540, 532, body),
    "Circle with centre C(3, -1) and radius 5 through A(-1, 2), B(7, 2) and (6, -5), with the tangent 3x + 4y = 30 touching it at P(6, 3): the radius CP has gradient 4/3 and the tangent, perpendicular to it, has gradient -3/4.",
    "Figure: the tangent at P(6, 3) is perpendicular to the radius CP", { block: "Example 3" });
}

// integ/definite-area Example 3: y = 8 - x^2 and y = 2x
{
  const f = (x) => 8 - x * x, g = (x) => 2 * x;
  const ax = D.axes({ pad: P, x: [-5, 4], y: [-9, 10], xTicks: 1, yTicks: 2, w: 540, h: 440, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(f, g, [-4, 2], { fill: C.fillBlue }) + ax.plot(f, { domain: [-4.4, 3.2] }) + ax.line([[-4.5, g(-4.5)], [4, g(4)]], { stroke: C.amber }) +
    ax.point(-4, -8) + ax.point(2, 4) + ax.tag(-4, -8, "(−4, −8)", { dx: 8, dy: 24 }) + ax.tag(2, 4, "(2, 4)", { dx: 10, dy: 24 }) +
    ax.tag(-1, 4, "area = 36", { dx: -34, fill: C.blue }) + ax.label(-4.9, 3.2, "y = 8 − x²", { fill: C.blue, weight: 700, dy: -24 }) + ax.label(2.3, 9.5, "y = 2x", { fill: C.amber, weight: 700, dx: -50 });
  await fig("integ/definite-area", "area-between-parabola-and-line", D.svg(540, 440, body),
    "Graphs of y = 8 - x^2 and the line y = 2x meeting at (-4, -8) and (2, 4): the parabola is above the line between them, and the shaded region has area 36 square units, found by integrating upper minus lower.",
    "Figure: the area between the curves from x = −4 to x = 2 is 36 square units", { block: "Example 3" });
}

// integ/volumes Example 1: y = x^2, 0..2 about the x-axis
{
  const ax = D.axes({ pad: P, x: [0, 2.6], y: [-5, 5], xTicks: 0.5, yTicks: 1, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const f = (x) => x * x;
  const body = ax.frame + ax.area(f, (x) => -f(x), [0, 2], { fill: C.fillBlue }) + ax.plot(f, { domain: [0, 2.1] }) + ax.plot((x) => -f(x), { domain: [0, 2], stroke: C.muted, dash: true, width: 2 }) +
    ax.line([[1.3, -f(1.3)], [1.3, f(1.3)]], { stroke: C.amber, width: 2.4 }) + ax.line([[2, -4], [2, 4]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.point(2, 4) + ax.tag(2, 4, "(2, 4)", { dx: 8, dy: -4 }) + ax.tag(1.3, 0, "radius y = x²", { dx: 8, dy: -34, fill: C.amber }) + ax.label(0.1, 4.5, "y = x²", { fill: C.blue, weight: 700 }) +
    ax.label(1.6, -4.4, "reflection: the solid's outline", { fill: C.muted, size: 13, dx: -150 });
  await fig("integ/volumes", "volume-of-revolution-x-squared", D.svg(540, 400, body),
    "Region under y = x^2 for 0 to 2, shown with its mirror image below the x-axis to represent the solid formed by rotating it about the x-axis: each thin slice at x is a disc of radius y = x^2, so the volume is the integral of pi y^2 dx, which is 32 pi over 5.",
    "Figure: rotating the region about the x-axis; each slice is a disc of radius x²", { block: "Example 1" });
}

// integ/volumes Example 3: y = 9 - x^2 and y = 5 about the x-axis (washer)
{
  const f = (x) => 9 - x * x;
  const ax = D.axes({ pad: P, x: [-3.4, 3.4], y: [-10, 10], xTicks: 1, yTicks: 2, w: 540, h: 440, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.area(f, () => 5, [-2, 2], { fill: C.fillBlue }) + ax.area((x) => -5, (x) => -f(x), [-2, 2], { fill: C.fillBlue }) +
    ax.plot(f, { domain: [-3, 3] }) + ax.plot((x) => -f(x), { domain: [-3, 3], stroke: C.muted, dash: true, width: 2 }) +
    ax.line([[-3.4, 5], [3.4, 5]], { stroke: C.amber, width: 2.4 }) + ax.line([[-3.4, -5], [3.4, -5]], { stroke: C.muted, width: 1.8, dash: true }) +
    ax.line([[1, 0], [1, f(1)]], { stroke: C.red, width: 2, dash: "4 3" }) + ax.line([[1, 0], [1, 5]], { stroke: C.amber, width: 3.2 }) +
    ax.point(-2, 5) + ax.point(2, 5) + ax.tag(2, 5, "(2, 5)", { dx: 10, dy: -8 }) + ax.tag(-2, 5, "(−2, 5)", { dx: -80, dy: -8 }) +
    ax.tag(1, 8, "outer radius 9 − x² = 8", { dx: 12, dy: -14, size: 13, fill: C.red }) + ax.tag(1, 2.5, "inner radius 5", { dx: 10, dy: 0, fill: C.amber, size: 13 }) + ax.label(-3.3, 9.3, "y = 9 − x²", { fill: C.blue, weight: 700 });
  await fig("integ/volumes", "volume-of-revolution-washer", D.svg(540, 440, body),
    "Region between y = 9 - x^2 and the line y = 5 for x from -2 to 2, with its reflection in the x-axis: rotating about the x-axis gives a solid with a hole, with outer radius 9 - x^2 and inner radius 5, so the volume is pi times the integral of (9 - x^2)^2 minus 25.",
    "Figure: outer radius 9 − x², inner radius 5; subtract the inner solid", { block: "Example 3" });
}

// numerical/trapezium-errors Example 1: sqrt(1 + x^3), 4 strips on [0, 2]
{
  const f = (x) => Math.sqrt(1 + x ** 3);
  const xs = [0, 0.5, 1, 1.5, 2];
  const ax = D.axes({ pad: P, x: [0, 2.4], y: [0, 3.6], xTicks: 0.5, yTicks: 0.5, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  let body = ax.frame + ax.line(xs.map((x) => [x, f(x)]).concat([[2, 0], [0, 0]]), { stroke: "none", width: 0 });
  const poly = xs.map((x) => [ax.X(x), ax.Y(f(x))]).concat([[ax.X(2), ax.Y(0)], [ax.X(0), ax.Y(0)]]);
  body += D.polyline(poly, { fill: C.fillBlue, stroke: "none", close: true });
  xs.forEach((x) => { body += ax.line([[x, 0], [x, f(x)]], { stroke: C.muted, width: 1.4 }); });
  body += ax.line(xs.map((x) => [x, f(x)]), { stroke: C.amber, width: 2 }) + ax.plot(f, { domain: [0, 2.2] }) + xs.map((x) => ax.point(x, f(x))).join("") +
    ax.tag(0.5, f(0.5), "1.0607", { dx: -30, dy: -12, size: 13 }) + ax.tag(1, f(1), "1.4142", { dx: -34, dy: -12, size: 13 }) + ax.tag(1.5, f(1.5), "2.0917", { dx: -44, dy: -12, size: 13 }) + ax.tag(2, 3, "3", { dx: 10, dy: 0, size: 13 }) +
    ax.tag(0, 1, "1", { dx: 10, dy: -8, size: 13 }) + ax.label(0.1, 3.4, "y = √(1 + x³)", { fill: C.blue, weight: 700 }) + ax.label(0.1, 3.0, "4 trapezia, h = 0.5", { size: 13, fill: C.muted });
  await fig("numerical/trapezium-errors", "trapezium-rule-four-strips", D.svg(540, 400, body),
    "Graph of y = sqrt(1 + x^3) from x = 0 to 2 divided into four strips of width 0.5: the ordinates are 1, 1.0607, 1.4142, 2.0917 and 3, and the tops of the trapezia are straight chords that lie slightly above the curve, so the trapezium rule estimate is 3.2833.",
    "Figure: four trapezia of width 0.5 under y = √(1 + x³)", { block: "Example 1" });
}

// numerical/trapezium-errors Example 2: ln x, concave: chords below the curve
{
  const xs = [1, 1.5, 2, 2.5, 3];
  const ax = D.axes({ pad: P, x: [0.5, 3.5], y: [0, 1.4], xTicks: 0.5, yTicks: 0.2, w: 540, h: 380, xLabel: "x", yLabel: "y" });
  const poly = xs.map((x) => [ax.X(x), ax.Y(Math.log(x))]).concat([[ax.X(3), ax.Y(0)], [ax.X(1), ax.Y(0)]]);
  let body = ax.frame + D.polyline(poly, { fill: C.fillAmber, stroke: "none", close: true });
  xs.forEach((x) => { body += ax.line([[x, 0], [x, Math.log(x)]], { stroke: C.muted, width: 1.4 }); });
  body += ax.plot(Math.log, { domain: [0.55, 3.4] }) + ax.line(xs.map((x) => [x, Math.log(x)]), { stroke: C.amber, width: 2 }) + xs.map((x) => ax.point(x, Math.log(x))).join("") +
    ax.tag(1.5, 0.36, "chords lie below the curve", { size: 14, fill: C.amber }) + ax.tag(1.5, 0.2, "under-estimate 1.2821 (true 1.2958)", { size: 14, fill: C.amber }) + ax.label(0.6, 1.3, "y = ln x", { fill: C.blue, weight: 700, dx: 70, dy: 70 });
  await fig("numerical/trapezium-errors", "trapezium-rule-concave-underestimate", D.svg(540, 380, body),
    "Graph of y = ln x from x = 1 to 3 with four trapezia: because the curve is concave (bends downwards) every chord lies below it, so the trapezium estimate 1.2821 is an under-estimate of the true area 1.2958.",
    "Figure: for the concave curve y = ln x the chords lie below the curve, so the rule under-estimates", { block: "Example 2" });
}

// numerical/newton-raphson Example 1: x^3 - 2x - 5, x1 = 2 -> 2.1 -> 2.0946
{
  const f = (x) => x ** 3 - 2 * x - 5, fp = (x) => 3 * x * x - 2;
  const x1 = 2, x2 = x1 - f(x1) / fp(x1), x3 = x2 - f(x2) / fp(x2);
  const ax = D.axes({ pad: P, x: [1.95, 2.2], y: [-1.5, 1.5], xTicks: [], yTicks: [-1, 1], w: 560, h: 420, xLabel: "x", yLabel: "y" });
  const tang = (x0) => [[x0 - 0.1, f(x0) - 0.1 * fp(x0)], [x0 + 0.2, f(x0) + 0.2 * fp(x0)]];
  const body = ax.frame + ax.plot(f, { domain: [1.95, 2.2] }) +
    ax.line([[x1 - 0.04, f(x1) - 0.04 * fp(x1)], [x2, 0]], { stroke: C.amber, width: 2.2 }) + ax.line([[x2 - 0.1, f(x2) - 0.1 * fp(x2)], [x2 + 0.1, f(x2) + 0.1 * fp(x2)]], { stroke: C.green, width: 2.2 }) +
    ax.line([[x2, 0], [x2, f(x2)]], { stroke: C.muted, width: 1.4, dash: true }) + ax.line([[x1, 0], [x1, f(x1)]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.point(x1, f(x1)) + ax.point(x2, f(x2)) + ax.point(x2, 0, { stroke: C.amber }) + ax.point(x3, 0, { stroke: C.green }) +
    ax.tag(x1, f(x1), "(2, −1)", { dx: 12, dy: 30 }) +
    ax.tag(x1, 0, "x₁ = 2", { dx: -40, dy: -14 }) + ax.tag(x3, 0, "x₃ = 2.0946", { dx: 12, dy: 38, fill: C.green, size: 13 }) + ax.tag(x2, 0, "x₂ = 2.1", { dx: -4, dy: -22, fill: C.amber, size: 13 }) +
    ax.label(1.97, 1.3, "y = x³ − 2x − 5", { fill: C.blue, weight: 700 });
  await fig("numerical/newton-raphson", "newton-raphson-tangent-steps", D.svg(560, 420, body),
    "Graph of y = x^3 - 2x - 5 near its root: the tangent at x1 = 2 (gradient 10) meets the x-axis at x2 = 2.1, and the tangent at x2 meets it at x3 = 2.0946, very close to the root 2.0946.",
    "Figure: each tangent meets the x-axis closer to the root: 2, 2.1, 2.0946", { block: "Example 1" });
}
