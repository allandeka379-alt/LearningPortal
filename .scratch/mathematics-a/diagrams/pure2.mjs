// Run from the repo root: node .scratch/mathematics-a/diagrams/pure2.mjs
import { D, C, fig, PI } from "./_h.mjs";
const P = { r: 44, b: 44 };
const rad = (d) => (d * PI) / 180;

// functions/transformations Example 5: y = |x^2 - 4x| and the line y = 3
{
  const f = (x) => Math.abs(x * x - 4 * x);
  const s = Math.sqrt(7);
  const ax = D.axes({ pad: P, x: [-2, 6], y: [-1, 8], xTicks: 1, yTicks: 1, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot((x) => x * x - 4 * x, { domain: [0, 4], stroke: C.muted, width: 1.8, dash: true }) + ax.plot(f, { domain: [-1.7, 5.7] }) +
    ax.line([[-2, 3], [6, 3]], { stroke: C.amber, width: 2 }) +
    [2 - s, 1, 3, 2 + s].map((x) => ax.point(x, 3, { stroke: C.amber })).join("") + ax.point(2, 4) + ax.point(2, -4, { stroke: C.muted, fill: "#fff" }) +
    ax.tag(2, 4, "(2, 4)", { dx: -26, dy: -12 }) + ax.tag(2, -4, "(2, −4)", { dx: -26, dy: 30, fill: C.muted }) +
    ax.label(6, 3, "y = 3", { fill: C.amber, anchor: "end", weight: 700, dy: -8 }) + ax.label(-1.9, 7.2, "y = |x² − 4x|", { fill: C.blue, weight: 700 });
  await fig("functions/transformations", "modulus-quadratic-w-shape", D.svg(540, 400, body),
    "Graph of y = |x^2 - 4x|: the dashed part of y = x^2 - 4x below the x-axis (vertex (2, -4)) is reflected to give a maximum at (2, 4), so the graph is W-shaped touching the axis at (0, 0) and (4, 0); the line y = 3 meets it at four points, so |x^2 - 4x| = 3 has four solutions.",
    "Figure: reflecting the dashed part in the x-axis gives a W shape; y = 3 cuts it four times", { block: "Example 5" });
}

// functions/transformations Example 4: sin x -> 3 sin 2x + 1
{
  const ax = D.axes({ pad: P, x: [0, 360], y: [-3, 5], xTicks: 90, yTicks: 1, w: 580, h: 380, xLabel: "x (degrees)", yLabel: "y" });
  const body = ax.frame + ax.line([[0, 1], [360, 1]], { stroke: C.muted, width: 1.2, dash: true }) + ax.plot((x) => Math.sin(rad(x)), { stroke: C.muted, width: 2 }) +
    ax.plot((x) => 3 * Math.sin(rad(2 * x)) + 1, { stroke: C.blue }) + ax.point(45, 4) + ax.point(135, -2) +
    ax.tag(45, 4, "greatest 4", { dx: 12, dy: -4 }) + ax.tag(135, -2, "least −2", { dx: 12, dy: 8 }) +
    ax.label(360, 1, "y = 1", { fill: C.muted, anchor: "end", dy: -6, size: 13 }) + ax.label(195, -1.15, "y = sin x", { fill: C.muted, weight: 700 }) + ax.label(190, 4.4, "y = 3 sin 2x + 1", { fill: C.blue, weight: 700 });
  await fig("functions/transformations", "transform-sine-to-3sin2x-plus-1", D.svg(580, 380, body),
    "Graphs of y = sin x (grey) and y = 3 sin 2x + 1 (blue) for 0 to 360 degrees: the stretch of factor 1/2 in x halves the period to 180 degrees, the stretch of factor 3 in y gives amplitude 3, and the translation up 1 puts the centre line at y = 1, so the greatest value is 4 and the least is -2.",
    "Figure: sin x becomes 3 sin 2x + 1: period 180°, amplitude 3, centre line y = 1", { block: "Example 4" });
}

// functions/composite-inverse Example 4: f(x) = (x-2)^2 + 5, x >= 2, and its inverse
{
  const f = (x) => (x - 2) ** 2 + 5, g = (x) => 2 + Math.sqrt(x - 5);
  const ax = D.axes({ pad: P, x: [0, 10], y: [0, 10], xTicks: 1, yTicks: 1, w: 520, h: 520, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[0, 0], [10, 10]], { stroke: C.muted, width: 1.6, dash: true }) + ax.plot(f, { domain: [2, 4.3] }) + ax.plot(g, { domain: [5, 10], stroke: C.amber }) +
    ax.point(2, 5) + ax.point(5, 2, { stroke: C.amber }) +
    ax.tag(2, 5, "(2, 5)", { dx: 12, dy: 0 }) + ax.tag(5, 2, "(5, 2)", { dx: 10, dy: 24, fill: C.amber }) +
    ax.label(2.4, 9.6, "y = f(x)", { fill: C.blue, weight: 700 }) + ax.label(8, 5.2, "y = f⁻¹(x)", { fill: C.amber, weight: 700 }) + ax.label(6.6, 9.3, "y = x", { fill: C.muted, weight: 700 });
  await fig("functions/composite-inverse", "inverse-reflection-in-y-equals-x", D.svg(520, 520, body),
    "Graphs of f(x) = (x - 2)^2 + 5 for x >= 2, starting at (2, 5), and its inverse f^-1(x) = 2 + sqrt(x - 5) starting at (5, 2): the two curves are mirror images in the dashed line y = x.",
    "Figure: f starts at (2, 5), f⁻¹ at (5, 2); each is the reflection of the other in y = x", { heading: "The graphs of f and its inverse" });
}

// functions/exponential-log: e^x and ln x
{
  const ax = D.axes({ pad: P, x: [-3, 6], y: [-3, 6], xTicks: 1, yTicks: 1, w: 520, h: 520, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[-3, -3], [6, 6]], { stroke: C.muted, width: 1.6, dash: true }) + ax.plot(Math.exp, { domain: [-3, 1.9] }) + ax.plot(Math.log, { domain: [0.03, 6], stroke: C.amber }) +
    ax.point(0, 1) + ax.point(1, 0, { stroke: C.amber }) + ax.tag(0, 1, "(0, 1)", { dx: 8, dy: -12 }) + ax.tag(1, 0, "(1, 0)", { dx: 8, dy: 28, fill: C.amber }) +
    ax.label(0.25, 5.6, "y = eˣ", { fill: C.blue, weight: 700 }) + ax.label(4.2, 1.1, "y = ln x", { fill: C.amber, weight: 700 }) + ax.label(4.6, 5.4, "y = x", { fill: C.muted, weight: 700 }) +
    ax.label(-2.9, 0.5, "asymptote y = 0", { fill: C.blue, size: 13, dy: 0 }) + ax.label(0.3, -2.6, "asymptote x = 0", { fill: C.amber, size: 13 });
  await fig("functions/exponential-log", "exp-and-ln-graphs", D.svg(520, 520, body),
    "Graphs of y = e^x through (0, 1) with asymptote y = 0, and y = ln x through (1, 0) with asymptote x = 0: they are reflections of each other in the dashed line y = x.",
    "Figure: y = eˣ and y = ln x are reflections in y = x", { heading: "The graphs" });
}

// functions/exponential-log Example 4: tea cooling
{
  const th = (t) => 20 + 75 * Math.exp(-0.04 * t);
  const t50 = Math.log(0.4) / -0.04;
  const ax = D.axes({ pad: P, x: [0, 100], y: [0, 100], xTicks: 20, yTicks: 20, w: 560, h: 400, xLabel: "t (minutes)", yLabel: "θ (°C)" });
  const body = ax.frame + ax.line([[0, 20], [100, 20]], { stroke: C.muted, width: 1.4, dash: true }) + ax.plot(th) + ax.point(0, 95) + ax.point(t50, 50) + ax.guides(t50, 50) +
    ax.tag(0, 95, "(0, 95)", { dx: 10, dy: 6 }) + ax.tag(t50, 50, `(${t50.toFixed(1)}, 50)`, { dx: 12, dy: -10 }) + ax.label(2, 20, "θ = 20 °C (room temperature)", { dy: 22, dx: 12, fill: C.muted });
  await fig("functions/exponential-log", "cooling-tea-exponential-decay", D.svg(560, 400, body),
    "Graph of the temperature of a cup of tea, theta = 20 + 75e^(-0.04t): it starts at 95 degrees C, falls to 50 degrees C after 22.9 minutes and levels off towards the room temperature of 20 degrees C, which is the horizontal asymptote.",
    "Figure: θ = 20 + 75e^(−0.04t) falls from 95 °C towards the asymptote 20 °C", { block: "Example 4" });
}

// graphs/curve-sketching Example 1: y = (x+2)(x-1)(x-3)
{
  const f = (x) => (x + 2) * (x - 1) * (x - 3);
  const ax = D.axes({ pad: P, x: [-3, 4], y: [-12, 14], xTicks: 1, yTicks: 4, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.plot(f, { domain: [-2.7, 3.5] }) + [[-2, 0], [1, 0], [3, 0], [0, 6]].map(([a, b]) => ax.point(a, b)).join("") +
    ax.tag(0, 6, "(0, 6)", { dx: 10, dy: -4 }) + ax.tag(-2, 0, "(−2, 0)", { dx: -84, dy: -14 }) + ax.tag(1, 0, "(1, 0)", { dx: 10, dy: -16 }) + ax.tag(3, 0, "(3, 0)", { dx: 8, dy: -12 });
  await fig("graphs/curve-sketching", "cubic-three-roots-sketch", D.svg(540, 420, body),
    "Graph of y = (x + 2)(x - 1)(x - 3), a cubic with a positive x^3 coefficient: it crosses the x-axis at -2, 1 and 3 and the y-axis at (0, 6), rising from bottom left to a maximum, falling to a minimum between 1 and 3 and rising again; it is above the axis for -2 < x < 1 and for x > 3.",
    "Figure: the cubic crosses the x-axis at −2, 1 and 3 and the y-axis at (0, 6)", { block: "Example 1" });
}

// graphs/curve-sketching Example 3: y = (2x+1)/(x-1)
{
  const f = (x) => (2 * x + 1) / (x - 1);
  const ax = D.axes({ pad: P, x: [-5, 7], y: [-6, 10], xTicks: 1, yTicks: 2, w: 540, h: 420, xLabel: "x", yLabel: "y" });
  const body = ax.frame + ax.line([[1, -6], [1, 10]], { stroke: C.muted, width: 1.6, dash: true }) + ax.line([[-5, 2], [7, 2]], { stroke: C.muted, width: 1.6, dash: true }) +
    ax.plot(f, { domain: [-5, 0.97] }) + ax.plot(f, { domain: [1.03, 7] }) + ax.point(0, -1) + ax.point(-0.5, 0) +
    ax.tag(0, -1, "(0, −1)", { dx: 8, dy: 28 }) + ax.tag(-0.5, 0, "(−1/2, 0)", { dx: -110, dy: 40 }) +
    ax.label(1.1, 9.4, "x = 1", { fill: C.muted, weight: 700 }) + ax.label(-4.9, 2, "y = 2", { fill: C.muted, weight: 700, dy: -8 });
  await fig("graphs/curve-sketching", "rational-two-x-plus-one-over-x-minus-one", D.svg(540, 420, body),
    "Graph of y = (2x + 1)/(x - 1): a hyperbola with vertical asymptote x = 1 and horizontal asymptote y = 2; the left branch passes through (-1/2, 0) and (0, -1), and the right branch lies above y = 2.",
    "Figure: y = 2 + 3/(x − 1) has asymptotes x = 1 and y = 2", { block: "Example 3" });
}

// trig/harmonic-form Example 2: 3cos t + 2 sin t = 1
{
  const R = Math.sqrt(13), al = Math.atan2(2, 3) * 180 / PI, base = Math.acos(1 / R) * 180 / PI;
  const s1 = al + base, s2 = al - base + 360;
  const ax = D.axes({ pad: P, x: [0, 360], y: [-4, 4], xTicks: 90, yTicks: 1, w: 580, h: 380, xLabel: "θ (degrees)", yLabel: "y" });
  const body = ax.frame + ax.plot((t) => 3 * Math.cos(rad(t)) + 2 * Math.sin(rad(t))) + ax.line([[0, 1], [360, 1]], { stroke: C.amber, width: 2 }) +
    ax.point(s1, 1, { stroke: C.amber }) + ax.point(s2, 1, { stroke: C.amber }) + ax.point(al, R) +
    ax.tag(s1, 1, `${s1.toFixed(1)}°`, { dx: 8, dy: -14 }) + ax.tag(s2, 1, `${s2.toFixed(1)}°`, { dx: -80, dy: -14 }) + ax.tag(al, R, `max √13 at ${al.toFixed(1)}°`, { dx: 10, dy: -6 }) +
    ax.label(360, 1, "y = 1", { fill: C.amber, anchor: "end", weight: 700, dy: -8 }) + ax.label(8, -3.3, "y = √13 cos(θ − 33.69°)", { fill: C.blue, weight: 700, size: 14 });
  await fig("trig/harmonic-form", "harmonic-form-3cos-2sin-equals-1", D.svg(580, 380, body),
    "Graph of y = 3 cos t + 2 sin t = sqrt(13) cos(t - 33.69 degrees) for 0 to 360 degrees: a cosine wave of amplitude sqrt(13), about 3.61, with its maximum at 33.69 degrees; the line y = 1 meets it at 107.6 and 319.8 degrees, the two solutions of 3 cos t + 2 sin t = 1.",
    "Figure: the wave √13 cos(θ − 33.69°) meets y = 1 at 107.6° and 319.8°", { block: "Example 2" });
}
