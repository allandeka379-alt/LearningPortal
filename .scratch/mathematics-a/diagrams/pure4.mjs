// Run from the repo root: node .scratch/mathematics-a/diagrams/pure4.mjs
import { D, C, fig, PI, eqH } from "./_h.mjs";
const P = { r: 44, b: 44 };

// numerical/locating-roots Example 2: staircase for x(n+1) = cbrt(3x + 5), x1 = 2
{
  const F = (x) => Math.cbrt(3 * x + 5);
  const lo = 1.9, hi = 2.4, w = 520, h = eqH([lo, hi], [lo, hi], w);
  const ax = D.axes({ pad: P, x: [lo, hi], y: [lo, hi], xTicks: 0.1, yTicks: 0.1, w, h, xLabel: "x", yLabel: "y" });
  const xs = [2]; for (let i = 0; i < 5; i += 1) xs.push(F(xs[xs.length - 1]));
  const path = [[xs[0], lo]]; xs.slice(0, -1).forEach((x, i) => { path.push([x, xs[i + 1]]); path.push([xs[i + 1], xs[i + 1]]); });
  const body = ax.frame + ax.line([[lo, lo], [hi, hi]], { stroke: C.muted, width: 1.8, dash: true }) + ax.plot(F, { domain: [lo, hi] }) + ax.line(path.map(([a, b]) => [a, b]), { stroke: C.amber, width: 1.8 }) +
    xs.slice(0, 3).map((x, i) => ax.point(x, i === 0 ? lo : x, { stroke: C.amber })).join("") +
    ax.tag(2, lo, "x₁ = 2", { dx: -10, dy: -10, size: 13 }) + ax.tag(xs[1], xs[1], "x₂ = 2.2240", { dx: -128, dy: 28, size: 13 }) + ax.tag(xs[2], xs[2], "x₃ = 2.2684", { dx: 14, dy: 30, size: 13 }) +
    ax.label(2.3, 2.17, "y = ∛(3x + 5)", { fill: C.blue, weight: 700, dy: 0, dx: 6 }) + ax.label(1.92, 1.99, "y = x", { fill: C.muted, weight: 700, dx: 6, dy: 0 });
  await fig("numerical/locating-roots", "iteration-staircase-converging", D.svg(w, h, body),
    "Graphs of y = x (dashed) and y = cube root of (3x + 5) with the iteration staircase starting at x1 = 2: the steps go up to the curve and across to the line, giving x2 = 2.2240, x3 = 2.2684 and so on, closing in on the intersection at x = 2.279, the root.",
    "Figure: the iteration x(n+1) = ∛(3xn + 5) climbs a staircase to the root 2.28", { block: "Example 2" });
}

// numerical/locating-roots Example 3: y = x^2 and y = 2 + e^-x meet at alpha = 1.492
{
  const ax = D.axes({ pad: P, x: [0, 2.6], y: [0, 7], xTicks: 0.5, yTicks: 1, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const al = 1.49164;
  const body = ax.frame + ax.plot((x) => x * x, { domain: [0, 2.6] }) + ax.plot((x) => 2 + Math.exp(-x), { stroke: C.amber, domain: [0, 2.6] }) + ax.point(al, al * al) + ax.guides(al, al * al) +
    ax.tag(al, al * al, "x = α ≈ 1.492", { dx: -170, dy: -30 }) + ax.tag(0, 3, "(0, 3)", { dx: 10, dy: -4, size: 13 }) +
    ax.label(2.1, 6.6, "y = x²", { fill: C.blue, weight: 700, dx: -10 }) + ax.label(1.7, 2.35, "y = 2 + e⁻ˣ", { fill: C.amber, weight: 700, dx: 20, dy: -6 });
  await fig("numerical/locating-roots", "intersection-parabola-and-exponential", D.svg(540, 400, body),
    "Graphs of y = x^2 and y = 2 + e^(-x) for x from 0 to 2.6: they cross once for x > 0 at x = alpha, about 1.492, between 1 and 2; the parabola is below the exponential curve before alpha and above it afterwards.",
    "Figure: y = x² and y = 2 + e⁻ˣ meet at x = α ≈ 1.492, between 1 and 2", { block: "Example 3" });
}

// de/separable Example 1: dy/dx = xy, family y = A e^(x^2/2), the particular one through (0, 2)
{
  const ax = D.axes({ pad: P, x: [-2, 2], y: [0, 10], xTicks: 1, yTicks: 2, w: 540, h: 400, xLabel: "x", yLabel: "y" });
  const fam = (A) => (x) => A * Math.exp(x * x / 2);
  const body = ax.frame + [0.5, 1, 3].map((A) => ax.plot(fam(A), { stroke: C.muted, width: 1.8 })).join("") + ax.plot(fam(2), { stroke: C.blue, width: 3 }) + ax.point(0, 2) +
    ax.tag(0, 2, "(0, 2)", { dx: 10, dy: 30, size: 13, fill: C.blue }) + [[0.5, "A = 0.5", C.muted], [1, "A = 1", C.muted], [2, "A = 2", C.blue], [3, "A = 3", C.muted]].map(([A, t, c]) => ax.label(1.0, A * Math.exp(0.5), t, { fill: c, size: 13, dx: -4, dy: -10, anchor: "end", weight: c === C.blue ? 700 : 400 })).join("") + ax.label(-0.95, 8.8, "y = 2e^(x²/2) passes through (0, 2)", { fill: C.blue, size: 13, weight: 700 });
  await fig("de/separable", "solution-curves-dy-dx-equals-xy", D.svg(540, 400, body),
    "Family of solution curves y = A e^(x^2/2) of dy/dx = xy for A = 0.5, 1, 2 and 3: each curve is symmetrical about the y-axis with a minimum at x = 0, and the initial condition y = 2 when x = 0 picks out the single curve y = 2 e^(x^2/2).",
    "Figure: the general solution is a family of curves; y = 2 at x = 0 selects A = 2", { block: "Example 1" });
}

// de/separable: dy/dx = -x/y gives circles x^2 + y^2 = 2c
{
  const x = [-3.6, 3.6], y = [-3.6, 3.6], w = 520, h = eqH(x, y, w);
  const ax = D.axes({ pad: P, x, y, xTicks: 1, yTicks: 1, w, h, xLabel: "x", yLabel: "y" });
  const sc = ax.X(1) - ax.X(0);
  let body = ax.frame + [1, 2, 3].map((r) => D.circle(ax.X(0), ax.Y(0), r * sc, { stroke: r === 2 ? C.blue : C.teal, width: r === 2 ? 3 : 2 })).join("");
  // small tangent segments with gradient -x/y at points on the circle of radius 2
  [30, 60, 120, 150, 210, 240, 300, 330].forEach((d) => {
    const a = (d * PI) / 180, px = 2 * Math.cos(a), py = 2 * Math.sin(a), m = -px / py, L = 0.28, dx = L / Math.sqrt(1 + m * m);
    body += ax.line([[px - dx, py - m * dx], [px + dx, py + m * dx]], { stroke: C.amber, width: 3 });
  });
  body += ax.tag(2.1, 2.1, "x² + y² = 4", { dx: 8, dy: -4, fill: C.blue, size: 13 }) + ax.label(0.08, 0.08, "O", { size: 14, fill: C.muted, weight: 700 });
  await fig("de/separable", "solution-curves-circles-minus-x-over-y", D.svg(w, h, body),
    "Concentric circles x^2 + y^2 = 2c centred at the origin, the family of solution curves of dy/dx = -x/y, shown for radii 1, 2 and 3; the short amber segments show the gradient -x/y at points on the circle of radius 2, each perpendicular to the radius.",
    "Figure: the solutions of dy/dx = −x/y are circles about the origin; the gradient is perpendicular to the radius", { heading: "Families of solution curves" });
}

// complex/cartesian Example 1: z = 2 - 3i, w = 1 + 4i, z + w = 3 + i (parallelogram)
{
  const x = [-1, 5], y = [-4, 5], w = 520, h = eqH(x, y, w);
  const ax = D.axes({ pad: P, x, y, xTicks: 1, yTicks: 1, w, h, xLabel: "Re", yLabel: "Im" });
  const body = ax.frame + ax.line([[2, -3], [3, 1]], { stroke: C.muted, width: 1.6, dash: true }) + ax.line([[1, 4], [3, 1]], { stroke: C.muted, width: 1.6, dash: true }) +
    ax.arrow(0, 0, 1.94, -2.9, { stroke: C.blue, width: 2.4 }) + ax.arrow(0, 0, 0.97, 3.9, { stroke: C.amber, width: 2.4 }) + ax.arrow(0, 0, 2.94, 0.9, { stroke: C.red, width: 2.4 }) +
    [[2, -3], [1, 4], [3, 1]].map(([a, b]) => ax.point(a, b)).join("") +
    ax.tag(2, -3, "z = 2 − 3i", { dx: 10, dy: 6, fill: C.blue }) + ax.tag(1, 4, "w = 1 + 4i", { dx: 10, dy: -2, fill: C.amber }) + ax.tag(3, 1, "z + w = 3 + i", { dx: 10, dy: -4, fill: C.red });
  await fig("complex/cartesian", "argand-sum-of-two-numbers", D.svg(w, h, body),
    "Argand diagram showing z = 2 - 3i, w = 1 + 4i and their sum z + w = 3 + i: the sum is the fourth vertex of the parallelogram formed by the arrows from the origin to z and to w, so real parts add (2 + 1 = 3) and imaginary parts add (-3 + 4 = 1).",
    "Figure: adding complex numbers is vector addition on the Argand diagram", { block: "Example 1" });
}

// complex/cartesian Example 3: roots 3 +- 2i are conjugates
{
  const x = [-1, 6], y = [-3.2, 3.2], w = 520, h = eqH(x, y, w);
  const ax = D.axes({ pad: P, x, y, xTicks: 1, yTicks: 1, w, h, xLabel: "Re", yLabel: "Im" });
  const body = ax.frame + ax.line([[3, -2], [3, 2]], { stroke: C.muted, width: 1.6, dash: true }) + ax.arrow(0, 0, 2.94, 1.96, { stroke: C.blue, width: 2.2 }) + ax.arrow(0, 0, 2.94, -1.96, { stroke: C.amber, width: 2.2 }) +
    ax.point(3, 2) + ax.point(3, -2) + ax.tag(3, 2, "3 + 2i", { dx: 10, dy: -4, fill: C.blue }) + ax.tag(3, -2, "3 − 2i", { dx: 10, dy: 22, fill: C.amber }) +
    ax.label(3.2, 0.4, "mirror images in the real axis", { size: 13, fill: C.muted });
  await fig("complex/cartesian", "argand-conjugate-roots", D.svg(w, h, body),
    "Argand diagram of the roots 3 + 2i and 3 - 2i of z^2 - 6z + 13 = 0: they are mirror images of each other in the real axis, so complex roots of a real quadratic form a conjugate pair with the same real part 3.",
    "Figure: the roots 3 ± 2i are reflections of each other in the real axis", { block: "Example 3" });
}

// complex/loci Example 2: |z - 2i| = |z + 4|  -> y = -2x - 3
{
  const x = [-6, 3], y = [-4, 5], w = 540, h = eqH(x, y, w);
  const ax = D.axes({ pad: P, x, y, xTicks: 1, yTicks: 1, w, h, xLabel: "Re", yLabel: "Im" });
  const body = ax.frame + ax.line([[0, 2], [-4, 0]], { stroke: C.muted, width: 2, dash: true }) + ax.line([[-3.2, 3.4], [0.2, -3.4]], { stroke: C.blue, width: 2.8 }) +
    ax.point(0, 2) + ax.point(-4, 0) + ax.point(-2, 1, { stroke: C.red }) +
    ax.tag(0, 2, "2i", { dx: 10, dy: -4 }) + ax.tag(-4, 0, "−4", { dx: -10, dy: -14, anchor: "end" }) + ax.tag(-2, 1, "midpoint (−2, 1)", { dx: 10, dy: 22, size: 13, fill: C.red }) +
    ax.tag(-3.1, 3.3, "y = −2x − 3", { dx: 14, dy: 0, fill: C.blue });
  await fig("complex/loci", "locus-perpendicular-bisector", D.svg(w, h, body),
    "Argand diagram with the points 2i and -4 joined by a dashed segment and the locus |z - 2i| = |z + 4|, the perpendicular bisector y = -2x - 3, passing through the midpoint (-2, 1): every point on this line is equally far from 2i and from -4.",
    "Figure: points equidistant from 2i and −4 lie on the perpendicular bisector y = −2x − 3", { block: "Example 2" });
}

// complex/loci Example 3: |z + 3 - 4i| <= 1
{
  const x = [-5, 2], y = [-1, 6], w = 540, h = eqH(x, y, w);
  const ax = D.axes({ pad: P, x, y, xTicks: 1, yTicks: 1, w, h, xLabel: "Re", yLabel: "Im" });
  const sc = ax.X(1) - ax.X(0);
  const th = Math.atan2(4, -3), d = Math.asin(1 / 5), tl = Math.sqrt(24);
  const T = (s) => [tl * Math.cos(th + s * d), tl * Math.sin(th + s * d)];
  const [tx1, ty1] = T(1), [tx2, ty2] = T(-1);
  const body = ax.frame + `<circle cx="${ax.X(-3)}" cy="${ax.Y(4)}" r="${sc}" fill="${C.fillBlue}" stroke="${C.blue}" stroke-width="2.6"/>` +
    ax.line([[0, 0], [tx1 * 1.12, ty1 * 1.12]], { stroke: C.amber, width: 2 }) + ax.line([[0, 0], [tx2 * 1.12, ty2 * 1.12]], { stroke: C.amber, width: 2 }) +
    ax.line([[0, 0], [-3, 4]], { stroke: C.muted, width: 1.8, dash: true }) + ax.point(-3, 4) + ax.point(0, 0) + ax.point(-2.4, 3.2, { stroke: C.red }) + ax.point(-3.6, 4.8, { stroke: C.red }) +
    ax.tag(-3, 4, "c", { dx: 8, dy: 22, size: 13 }) + ax.tag(-1.6, 5.7, "c = −3 + 4i, radius 1", { size: 13 }) + ax.line([[-2.4, 3.2], [-0.85, 2.4]], { stroke: C.red, width: 1.2 }) + ax.tag(-0.85, 2.3, "min |z| = 4", { size: 13, fill: C.red }) + ax.tag(-3.5, 5.5, "max |z| = 6", { anchor: "end", size: 13, fill: C.red }) +
    ax.tag(-4.9, 1.1, "greatest arg z = 2.42", { size: 13, fill: C.amber }) + ax.tag(-0.6, 3.7, "least arg z = 2.01", { size: 13, fill: C.amber }) + ax.tag(0, 0, "O", { dx: 8, dy: 22, size: 13 });
  await fig("complex/loci", "locus-disc-extreme-modulus-argument", D.svg(w, h, body),
    "Argand diagram of the disc |z + 3 - 4i| <= 1, centre -3 + 4i radius 1, with the line from the origin through the centre of length 5: the point of the disc nearest the origin has |z| = 4 and the farthest has |z| = 6, and the two tangents from the origin touch the circle where arg z is greatest (2.42 radians) and least (2.01 radians).",
    "Figure: the disc, the nearest and farthest points from O, and the two tangents from O", { block: "Example 3" });
}
