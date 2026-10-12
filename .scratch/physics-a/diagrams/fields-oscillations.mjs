// Diagrams for physics-a fields, oscillations, nuclear, quantum, gases, a.c. and practical-skills lessons.
// Run: node .scratch/physics-a/diagrams/fields-oscillations.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const f = (v, d = 2) => v.toFixed(d).replace("-", "−");
const samples = (fn, a, b, n = 200) => Array.from({ length: n + 1 }, (_, i) => { const x = a + ((b - a) * i) / n; return [x, fn(x)]; });
async function fig(name, svgText, alt, cap, lesson, after) {
  await D.figure(F, name, svgText, { alt, caption: cap });
  D.insertAfter(L(lesson), after, D.md(name, alt, cap));
}

// ---- Electric potential of +12 nC against r (lesson table), tangent at 0.20 m
{
  const k = 1 / (4 * Math.PI * 8.85e-12), Q = 12e-9;
  const V = (r) => (k * Q) / r;
  const ax = D.axes({ x: [0, 0.7], y: [0, 1200], xTicks: 0.1, yTicks: 200, xLabel: "r / m", yLabel: "V / V", w: 600, h: 400 });
  const r0 = 0.2, V0 = V(r0), grad = -V0 / r0; // dV/dr = -V/r
  const body = ax.frame + ax.plot(V, { domain: [0.09, 0.7] }) +
    [0.1, 0.15, 0.2, 0.3, 0.4, 0.6].map((r) => ax.point(r, V(r), { r: 4.5, stroke: C.amber })).join("") +
    ax.line([[0.07, V0 - grad * (r0 - 0.07) * -1 * -1], [0.4, V0 + grad * (0.4 - r0)]].map(([x, y], i) => (i === 0 ? [0.1, V0 + grad * (0.1 - r0)] : [x, y])), { stroke: C.red, width: 2 }) +
    ax.tag(0.24, 900, `tangent at 0.20 m: gradient ≈ −${Math.round(-grad)} V m⁻¹`, { fill: C.red }) +
    ax.tag(0.24, 800, `so E = −gradient ≈ ${Math.round(-grad)} V m⁻¹`, { fill: C.red }) +
    ax.tag(0.3, 640, "V falls as 1/r: doubling r halves V", { fill: C.blue, dy: 0 });
  const alt = `Graph of electric potential against distance from a +12 nC point charge: a 1/r curve from 1080 V at 0.10 m to 180 V at 0.60 m; the tangent at 0.20 m has gradient about ${Math.round(grad)} V/m, so the field strength there is about ${Math.round(-grad)} V/m (N/C).`;
  await fig("point-charge-potential-graph", D.svg(600, 400, body), alt, "Figure: the field strength is minus the gradient of the tangent to the V-r curve", "efields/electric-potential", "The graph of $V$ against $r$ is a $1/r$ curve");
}

// ---- Gravitational potential of the Earth
{
  const GM = 3.986e14; const R = 6.37e6;
  const phi = (r) => (-GM / r) / 1e7; // in 1e7 J/kg, r in m
  const ax = D.axes({ x: [0, 45], y: [-7, 0.5], xTicks: 5, yTicks: 1, xLabel: "", yLabel: "φ / 10⁷ J kg⁻¹", w: 600, h: 400 });
  const pts = [[6.37, -6.25], [12.7, -3.13], [19.1, -2.08], [25.5, -1.56], [42.0, -0.947]];
  const body = ax.frame + ax.line(samples((x) => phi(x * 1e6), 6.37, 45, 120), { stroke: C.blue, width: 2.6 }) +
    pts.map(([x, y]) => ax.point(x, y, { r: 4.5, stroke: C.amber })).join("") +
    ax.tag(8, -6.25, "Earth's surface: −6.25 × 10⁷ J kg⁻¹", { dx: 4, dy: -12, fill: C.red }) +
    ax.tag(4, -1.1, "φ → 0 at infinity", { fill: C.blue }) + ax.label(45, -6.7, "r / 10⁶ m", { anchor: "end", weight: 600, size: 14 }) +
    ax.tag(26, -3.4, "φ = −GM/r (a −1/r curve)", { fill: C.blue });
  const alt = "Gravitational potential of the Earth against distance from its centre: a −1/r curve starting at −6.25 × 10⁷ J/kg at the surface (6.37 × 10⁶ m), −3.13 × 10⁷ at twice that distance, and rising ever more gently towards zero at infinity.";
  await fig("earth-gravitational-potential-graph", D.svg(600, 400, body), alt, "Figure: potential is negative everywhere and rises towards zero with distance", "gravitation/potential", "A graph of $\\phi$ against $r$ is a curve");
}

// ---- Uniform field between plates with the path of a charge
{
  const body =
    D.rect(80, 40, 400, 10, { fill: C.axis, stroke: C.axis }) + D.rect(80, 240, 400, 10, { fill: C.axis, stroke: C.axis }) +
    [120, 180, 240, 300, 360, 420].map((x) => D.arrow(x, 52, x, 236, { stroke: C.blue, width: 2 })).join("") +
    D.text(100, 32, "+ plate (higher potential V)", { size: 14, fill: C.red }) + D.text(100, 272, "− plate (0 V)", { size: 14 }) +
    D.line(520, 50, 520, 240, { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true }) + D.text(534, 150, "d", { size: 16, weight: 700 }) +
    D.text(300, 306, "uniform field: lines parallel and equally spaced, E = V/d", { size: 15, anchor: "middle", weight: 700 }) +
    D.text(300, 326, "field lines point from the + plate to the − plate", { size: 14, anchor: "middle", fill: C.muted });
  const alt = "Uniform electric field between two parallel plates a distance d apart: equally spaced parallel field lines run from the positive plate to the negative plate, and the field strength is E = V/d.";
  await fig("parallel-plates-uniform-field", D.svg(580, 340, body), alt, "Figure: the field between parallel plates is uniform, E = V/d", "efields/uniform-fields", "## Field lines");
}

// ---- SHM: x, v, a against t/T for the spring (m = 0.50 kg, k = 20 N/m, x0 = 8.0 cm)
{
  const m = 0.5, k = 20, x0 = 0.08, w = Math.sqrt(k / m), T = (2 * Math.PI) / w;
  const panels = [
    { y: "x / cm", fn: (u) => x0 * 100 * Math.sin(2 * Math.PI * u), r: 8, step: 4, col: C.blue, note: `amplitude ${(x0 * 100).toFixed(1)} cm` },
    { y: "v / m s⁻¹", fn: (u) => w * x0 * Math.cos(2 * Math.PI * u), r: 0.6, step: 0.3, col: C.amber, note: `max ${f(w * x0)} m s⁻¹; leads x by T/4` },
    { y: "a / m s⁻²", fn: (u) => -w * w * x0 * Math.sin(2 * Math.PI * u), r: 4, step: 2, col: C.red, note: `max ${f(w * w * x0)} m s⁻²; antiphase to x` },
  ];
  let body = "";
  panels.forEach((p, i) => {
    const ax = D.axes({ x: [0, 1.1], y: [-p.r * 1.25, p.r * 1.25], xTicks: [0.25, 0.5, 0.75, 1], yTicks: [-p.r, 0, p.r], xLabel: i === 2 ? "t / T" : "", yLabel: p.y, w: 600, h: i === 2 ? 220 : 190, pad: { l: 64, r: 20, t: 26, b: i === 2 ? 56 : 26 }, xFormat: (v) => String(v) });
    body += D.group(ax.frame + ax.line(samples(p.fn, 0, 1, 200), { stroke: p.col, width: 2.6 }) + ax.label(0.55, p.r * 1.1, p.note, { size: 13, fill: p.col }), { translate: [0, i * 190] });
  });
  const alt = `Graphs of s.h.m. for a 0.50 kg mass on a 20 N/m spring (amplitude 8.0 cm, period ${f(T, 3)} s) against time in periods: displacement is a sine curve, velocity a cosine curve a quarter cycle ahead (maximum ${f(w * x0)} m/s), and acceleration an inverted sine curve in antiphase with displacement (maximum ${f(w * w * x0)} m/s²).`;
  await fig("shm-x-v-a-graphs", D.svg(600, 600, body), alt, "Figure: displacement, velocity and acceleration in s.h.m. over one period", "oscillations/shm", "Against time, $x$ is a sine curve");

  const ax = D.axes({ x: [-10, 10], y: [-4, 4], xTicks: 2, yTicks: 1, xLabel: "x / cm", yLabel: "a / m s⁻²", w: 600, h: 360 });
  const b2 = ax.frame + ax.line([[-8, w * w * x0], [8, -w * w * x0]], { stroke: C.blue, width: 2.8 }) +
    ax.point(-8, w * w * x0, { stroke: C.blue }) + ax.point(8, -w * w * x0, { stroke: C.blue }) +
    ax.tag(-9.8, -2.9, `gradient = −ω² = −${(w * w).toFixed(0)} s⁻²`, { fill: C.blue }) +
    ax.tag(0.8, 3.5, "line through the origin", { fill: C.muted });
  const alt2 = "Acceleration against displacement for the spring oscillator: a straight line through the origin from +3.2 m/s² at x = −8.0 cm to −3.2 m/s² at x = +8.0 cm, with gradient −ω² = −40 per s², which is the defining test for simple harmonic motion.";
  await fig("shm-acceleration-displacement-graph", D.svg(600, 360, b2), alt2, "Figure: a = −ω²x is a straight line of negative gradient through the origin", "oscillations/shm", "- $a$ against $x$ is a **straight line through the origin");
}

// ---- SHM energy against displacement (m = 0.40 kg, w = 5.0, x0 = 0.10 m)
{
  const m = 0.4, w = 5, x0 = 0.1, E = 0.5 * m * w * w * x0 * x0;
  const ep = (x) => 0.5 * m * w * w * x * x, ek = (x) => E - ep(x);
  const ax = D.axes({ x: [-0.12, 0.12], y: [0, 0.06], xTicks: 0.04, yTicks: 0.01, xLabel: "x / m", yLabel: "energy / J", w: 600, h: 400, xFormat: (v) => v.toFixed(2).replace("-", "−") });
  const xe = x0 / Math.SQRT2;
  const body = ax.frame + ax.line([[-x0, E], [x0, E]], { stroke: C.muted, width: 1.8, dash: true }) +
    ax.line(samples(ep, -x0, x0), { stroke: C.amber, width: 2.6 }) + ax.line(samples(ek, -x0, x0), { stroke: C.blue, width: 2.6 }) +
    ax.point(0.06, ep(0.06), { stroke: C.amber }) + ax.point(0.06, ek(0.06), { stroke: C.blue }) +
    ax.tag(-0.118, E + 0.0045, `total energy E = ${f(E, 3)} J`, { fill: C.muted }) +
    ax.tag(0.064, ep(0.06) - 0.003, `potential ${f(ep(0.06), 3)} J`, { fill: C.amber }) +
    ax.tag(0.063, ek(0.06) + 0.003, `kinetic ${f(ek(0.06), 3)} J`, { fill: C.blue }) +
    ax.line([[xe, 0], [xe, E / 2]], { stroke: C.muted, width: 1.2, dash: true }) + ax.tag(-0.118, 0.045, "equal at x = ±0.071 m", { fill: C.muted });
  const alt = `Energy against displacement for a 0.40 kg s.h.m. oscillator (ω = 5.0 rad/s, amplitude 0.10 m): the total energy ${f(E, 3)} J is constant; potential energy is an upward parabola from zero at x = 0, kinetic energy an inverted parabola reaching ${f(E, 3)} J at x = 0, and they are equal (${f(E / 2, 3)} J) at x = ±0.071 m.`;
  await fig("shm-energy-displacement-graph", D.svg(600, 400, body), alt, "Figure: kinetic and potential energy trade places while the total stays constant", "oscillations/shm-energy", "At half the amplitude, only a quarter");
}

// ---- Flux linkage and induced e.m.f. against time (lesson table)
{
  const pts = [[0, 0], [0.2, 2.0], [0.4, 2.0], [0.6, 0]];
  const ax = D.axes({ x: [0, 0.7], y: [0, 2.5], xTicks: 0.1, yTicks: 0.5, xLabel: "t / s", yLabel: "NΦ / 10⁻² Wb", w: 600, h: 320, xFormat: (v) => v.toFixed(1) });
  const b1 = ax.frame + ax.line(pts) + [[0, 0], [0.1, 1], [0.2, 2], [0.3, 2], [0.4, 2], [0.5, 1], [0.6, 0]].map(([x, y]) => ax.point(x, y, { r: 4.5, stroke: C.amber })).join("") +
    ax.tag(0.045, 1.15, "gradient 0.10 V", { fill: C.blue, dx: -4, dy: -8 }) + ax.tag(0.21, 2.35, "gradient 0: flux, but no e.m.f.", { fill: C.muted }) + ax.tag(0.45, 1.0, "gradient −0.10 V", { fill: C.blue });
  const alt = "Flux linkage against time for a 500-turn coil: NΦ rises steadily from 0 to 2.0 × 10⁻² Wb in 0.2 s, stays constant until 0.4 s, then falls to zero by 0.6 s; the gradient (the e.m.f.) is 0.10 V, then zero, then −0.10 V.";
  await fig("flux-linkage-time-graph", D.svg(600, 320, b1), alt, "Figure: the induced e.m.f. is the gradient of the flux-linkage graph", "induction/flux-faraday", "The e.m.f. is the **gradient** of the $N\\Phi$-$t$ graph");
  const a2 = D.axes({ x: [0, 0.7], y: [-0.2, 0.2], xTicks: 0.1, yTicks: 0.1, xLabel: "t / s", yLabel: "E / V", w: 600, h: 280, xFormat: (v) => v.toFixed(1), yFormat: (v) => f(v, 1) });
  const b2 = a2.frame + a2.line([[0, 0.1], [0.2, 0.1]], { stroke: C.blue, width: 3 }) + a2.line([[0.2, 0], [0.4, 0]], { stroke: C.blue, width: 3 }) + a2.line([[0.4, -0.1], [0.6, -0.1]], { stroke: C.blue, width: 3 }) +
    a2.tag(0.02, 0.17, "+0.10 V (flux rising)", { fill: C.blue }) + a2.tag(0.41, -0.14, "−0.10 V (flux falling)", { fill: C.blue });
  const alt2 = "Induced e.m.f. against time for the same coil: +0.10 V from 0 to 0.2 s while the flux linkage rises, zero from 0.2 to 0.4 s while it is constant, and −0.10 V from 0.4 to 0.6 s while it falls.";
  await fig("induced-emf-time-graph", D.svg(600, 280, b2), alt2, "Figure: e.m.f. against time for the flux-linkage graph above", "induction/flux-faraday", "flux-linkage-time-graph");
}

// ---- Radioactive decay: corrected count rate, R = 40 exp(-0.01225 t)
{
  const lam = 0.01225, R0 = 40, th = Math.LN2 / lam;
  const data = [[0, 40.0], [20, 31.6], [40, 24.1], [60, 19.2], [80, 14.7], [100, 11.7], [120, 9.2]];
  const ax = D.axes({ x: [0, 140], y: [0, 44], xTicks: 20, yTicks: 10, xLabel: "t / s", yLabel: "R / s⁻¹", w: 600, h: 380 });
  const body = ax.frame + ax.plot((t) => R0 * Math.exp(-lam * t), { domain: [0, 140] }) + data.map(([x, y]) => ax.point(x, y, { r: 4.5, stroke: C.amber })).join("") +
    ax.guides(th, R0 / 2) + ax.point(th, R0 / 2, { stroke: C.red }) + ax.tag(138, 27, `half-life ≈ ${th.toFixed(1)} s: R falls from 40 to 20 s⁻¹`, { anchor: "end", fill: C.red }) +
    ax.tag(138, 36, "equal times: same fraction left", { anchor: "end", fill: C.blue });
  const alt = `Corrected count rate against time for the short-lived gas source: an exponential fall from 40.0 per second, with equal fractions lost in equal times; the rate halves to 20 per second after about ${th.toFixed(1)} s, the half-life.`;
  await fig("decay-count-rate-graph", D.svg(600, 380, body), alt, "Figure: radioactive decay is exponential; the half-life is read from the curve", "nuclear/decay-law", "A graph of $R$ against $t$ is a curve that falls");
  const a2 = D.axes({ x: [0, 140], y: [0, 4], xTicks: 20, yTicks: 0.5, xLabel: "t / s", yLabel: "ln (R / s⁻¹)", w: 600, h: 340 });
  const ln = [[0, 3.69], [20, 3.45], [40, 3.18], [60, 2.95], [80, 2.69], [100, 2.46], [120, 2.22]];
  const b2 = a2.frame + a2.line([[0, 3.69], [120, 2.22]], { stroke: C.blue, width: 2.6 }) + ln.map(([x, y]) => a2.point(x, y, { r: 4.5, stroke: C.amber })).join("") +
    a2.tag(18, 1.4, "gradient = (2.22 − 3.69) / 120 = −0.01225 s⁻¹ = −λ", { fill: C.blue }) + a2.tag(75, 3.8, "intercept ln R₀ = 3.69", { fill: C.red });
  const alt2 = "Graph of ln R against t for the decay data: a straight line from 3.69 at t = 0 to 2.22 at 120 s, with gradient −0.01225 per second, so the decay constant is 0.0123 per second and the half-life 56.6 s.";
  await fig("decay-ln-graph", D.svg(600, 340, b2), alt2, "Figure: ln R against t is a straight line of gradient −λ", "nuclear/decay-law", "decay-count-rate-graph");
}

// ---- Binding energy per nucleon (table values)
{
  const pts = [[2, 1.11, "²H"], [4, 7.07, "⁴He"], [7, 5.61, "⁷Li"], [12, 7.68, "¹²C"], [16, 7.98, "¹⁶O"], [56, 8.79, "⁵⁶Fe"], [141, 8.33, "¹⁴¹Ba"], [235, 7.59, "²³⁵U"], [238, 7.57, ""]];
  const ax = D.axes({ x: [0, 250], y: [0, 10], xTicks: 50, yTicks: 2, xLabel: "nucleon number A", yLabel: "binding energy per nucleon / MeV", w: 600, h: 400, pad: { l: 64, r: 28, t: 36, b: 56 } });
  const body = ax.frame + ax.line(pts.map(([a, b]) => [a, b]), { stroke: C.blue, width: 2.2 }) + pts.map(([a, b]) => ax.point(a, b, { r: 4.5, stroke: C.amber })).join("") +
    ax.label(56, 9.25, "⁵⁶Fe: 8.79 MeV (peak, most stable)", { anchor: "middle", size: 13, fill: C.red }) + ax.label(10, 6.4, "⁴He 7.07", { size: 13 }) +
    ax.label(2, 1.11 + 0.9, "²H 1.11", { size: 13 }) + ax.label(235, 8.15, "²³⁵U 7.59", { size: 13, anchor: "end" }) + ax.label(141, 8.9, "¹⁴¹Ba 8.33", { size: 13, anchor: "middle" }) +
    ax.tag(100, 3.4, "fusion: light nuclei move up", { fill: C.blue }) + ax.tag(100, 2.4, "fission: heavy nuclei move up", { fill: C.blue });
  const alt = "Binding energy per nucleon against nucleon number, from the nuclide values in the lesson: 1.11 MeV for deuterium, a local peak of 7.07 MeV for helium-4, rising to a broad maximum of 8.79 MeV at iron-56, then falling slowly to about 7.6 MeV for uranium; fusion of light nuclei and fission of heavy nuclei both move towards the peak and release energy.";
  await fig("binding-energy-per-nucleon-curve", D.svg(600, 400, body), alt, "Figure: iron-56 is near the peak of the binding-energy curve (lines join the tabulated nuclides)", "nuclear/mass-defect-binding", "Nuclei near the peak are the most tightly bound");
}

// ---- Photoelectric: Ek max against f (work function 2.28 eV)
{
  const h = 4.136e-15, phi = 2.28, f0 = phi / h / 1e14;
  const ax = D.axes({ x: [0, 10], y: [-3, 2], xTicks: 1, yTicks: 1, xLabel: "f / 10¹⁴ Hz", yLabel: "Eₖ max / eV", w: 600, h: 400, pad: { l: 64, r: 28, t: 30, b: 70 }, yFormat: (v) => String(v).replace("-", "−") });
  const pts = [[6, 0.21], [7, 0.62], [8, 1.04], [9, 1.45]];
  const body = ax.frame + ax.line([[0, -phi], [10, h * 1e15 / 1e0 * 0 + (h * 10e14 - phi)]], { stroke: C.blue, width: 2.4 }) + pts.map(([x, y]) => ax.point(x, y, { r: 4.5, stroke: C.amber })).join("") +
    ax.point(f0, 0, { r: 5, stroke: C.red }) + ax.tag(5.7, -0.8, `f₀ = ${f0.toFixed(2)} × 10¹⁴ Hz`, { fill: C.red }) +
    ax.point(0, -phi, { r: 5, stroke: C.red }) + ax.tag(0, -phi, "intercept −Φ = −2.28 eV", { dx: 12, dy: 4, fill: C.red }) +
    ax.tag(1.2, 1.7, "gradient = h/e = 4.1 × 10⁻¹⁵ V s", { fill: C.blue });
  const alt = `Maximum kinetic energy of photoelectrons against frequency for a metal of work function 2.28 eV: a straight line with gradient h/e (about 4.1 × 10⁻¹⁵ V s), crossing the frequency axis at the threshold frequency ${f0.toFixed(2)} × 10¹⁴ Hz and the energy axis at −2.28 eV; no electrons are emitted below the threshold.`;
  await fig("photoelectric-ek-frequency-graph", D.svg(600, 400, body), alt, "Figure: Einstein's equation as a straight line: gradient h/e, intercepts f₀ and −Φ", "quantum/photoelectric", "- **intercept on the energy axis");
}

// ---- Boyle's law p against 1/V (lesson data) and Charles's law
{
  const V = [30, 25, 20, 15, 12, 10], p = [1.0, 1.21, 1.49, 2.02, 2.49, 3.01];
  const ax = D.axes({ x: [0, 0.12], y: [0, 3.5], xTicks: 0.02, yTicks: 0.5, xLabel: "1/V / cm⁻³", yLabel: "p / 10⁵ Pa", w: 600, h: 380, xFormat: (v) => v.toFixed(2) });
  const body = ax.frame + ax.line([[0, 0], [0.115, 0.115 * 30]], { stroke: C.blue, width: 2.4 }) + V.map((v, i) => ax.point(1 / v, p[i], { r: 4.5, stroke: C.amber })).join("") +
    ax.tag(0.004, 3.2, "gradient = pV ≈ 30 × 10⁵ Pa cm³ (3.0 J)", { fill: C.blue }) + ax.tag(0.004, 2.6, "straight line through the origin", { fill: C.muted });
  const alt = "Boyle's law data: pressure against 1/volume for trapped air at constant temperature gives a straight line through the origin; the six readings from 1.00 × 10⁵ Pa at 30.0 cm³ to 3.01 × 10⁵ Pa at 10.0 cm³ lie on it, and the gradient pV is about 30 × 10⁵ Pa cm³, or 3.0 J.";
  await fig("boyle-p-against-inverse-v", D.svg(600, 380, body), alt, "Figure: p against 1/V is a straight line through the origin, so pV is constant", "gases/equation-of-state", "The product $pV$ is constant within about 1%");

  const a2 = D.axes({ x: [-300, 100], y: [0, 1.5], xTicks: 100, yTicks: [], tickLabels: true, xLabel: "θ / °C", yLabel: "V (qualitative)", w: 600, h: 320, pad: { l: 40, r: 28, t: 30, b: 60 } });
  const b2 = a2.frame + a2.line([[0, 1], [100, 373 / 273]], { stroke: C.blue, width: 2.6 }) + a2.line([[-273, 0], [0, 1]], { stroke: C.muted, width: 2.2, dash: true }) +
    a2.point(-273, 0, { stroke: C.red, r: 5 }) + a2.tag(-270, 0, "−273 °C: V would be zero", { dx: 0, dy: -16, fill: C.red }) + a2.tag(-290, 1.4, "dashed: extrapolated beyond the data", { fill: C.muted });
  const alt2 = "Charles's law: volume of a fixed mass of gas at constant pressure against Celsius temperature is a straight line; extrapolated backwards (dashed) it meets the temperature axis at about −273 °C, the estimate of absolute zero, where the volume would be zero.";
  await fig("charles-law-absolute-zero", D.svg(600, 320, b2), alt2, "Figure: extrapolating V against θ to zero volume gives about −273 °C", "gases/equation-of-state", "Plotting $V$ against $\\theta$ in degrees Celsius");
}

// ---- Mains waveform
{
  const V0 = 325, Vr = 230;
  const ax = D.axes({ x: [0, 75], y: [-400, 400], xTicks: 10, yTicks: 200, xLabel: "t / ms", yLabel: "V / V", w: 600, h: 380 });
  const body = ax.frame + ax.line(samples((t) => V0 * Math.sin((2 * Math.PI * t) / 20), 0, 40, 240), { stroke: C.blue, width: 2.6 }) +
    ax.line([[0, Vr], [40, Vr]], { stroke: C.red, width: 1.8, dash: true }) + ax.tag(44, 370, `peak V₀ = 325 V`, { fill: C.blue }) + ax.tag(44, 290, "r.m.s. = 230 V (V₀/√2)", { fill: C.red }) +
    ax.line([[5, -400 + 60], [25, -400 + 60]], { stroke: C.ink, width: 1.4, arrow: true, arrowStart: true }) + ax.label(15, -400 + 30, "period T = 20 ms (50 Hz)", { anchor: "middle", size: 13 });
  const alt = "Mains voltage against time: a sine wave of peak 325 V and period 20 ms (50 Hz) that swings between +325 V and −325 V; the dashed line at 230 V is the r.m.s. value, the steady d.c. voltage that would give the same heating power.";
  await fig("mains-voltage-waveform", D.svg(600, 380, body), alt, "Figure: 230 V r.m.s. mains has a peak of 325 V and a period of 20 ms", "ac/characteristics-rms", "For the Zimbabwean mains");
}

// ---- Magnetic field near a long wire: B against 1/r
{
  const ax = D.axes({ x: [0, 1.2], y: [0, 280], xTicks: 0.2, yTicks: 40, xLabel: "1/r / cm⁻¹", yLabel: "B / µT", w: 600, h: 380, xFormat: (v) => v.toFixed(1) });
  const body = ax.frame + ax.line([[0, 0], [1.1, 264]], { stroke: C.blue, width: 2.4 }) + [[1, 240], [0.5, 120], [0.25, 60], [0.125, 30]].map(([x, y]) => ax.point(x, y, { r: 5, stroke: C.amber })).join("") +
    ax.tag(0.12, 262, "12 A wire: B ∝ 1/r, straight line through the origin", { fill: C.blue }) + ax.tag(0.12, 232, "gradient = 240 µT cm", { fill: C.blue });
  const alt = "Magnetic flux density near a long wire carrying 12 A against 1/r: the points (r = 1, 2, 4 and 8 cm, B = 240, 120, 60 and 30 microtesla) lie on a straight line through the origin of gradient 240 µT cm, showing B is inversely proportional to the distance.";
  await fig("wire-field-against-inverse-distance", D.svg(600, 380, body), alt, "Figure: B against 1/r is a straight line through the origin", "magnetism/field-patterns", "Each doubling of distance halves $B$");
}

// ---- Magnetic field circles round a wire (current out of the page)
{
  const cx = 170, cy = 170;
  let body = "";
  [30, 60, 100, 150].forEach((r) => { body += D.circle(cx, cy, r, { stroke: C.blue, width: 2 }); });
  [30, 60, 100, 150].forEach((r) => { // arrowheads (anticlockwise for current out of page): at top, pointing left
    body += D.arrow(cx + 4, cy - r, cx - 4, cy - r, { stroke: C.blue, width: 2 });
  });
  body += D.circle(cx, cy, 11, { fill: "#fff", stroke: C.ink, width: 2.5 }) + D.dot(cx, cy, { r: 3.5 });
  body += D.text(330, 110, "Current out of the page (dot):", { size: 15, weight: 700 }) + D.text(330, 134, "field lines are concentric circles,", { size: 14 }) + D.text(330, 154, "anticlockwise (right-hand grip rule),", { size: 14 }) + D.text(330, 174, "further apart with distance: the", { size: 14 }) + D.text(330, 194, "field weakens as 1/r.", { size: 14 });
  const alt = "Magnetic field of a long straight wire carrying current out of the page: concentric circles around the wire, drawn anticlockwise, with spacing that grows with distance because the field weakens.";
  await fig("straight-wire-field-lines", D.svg(600, 340, body), alt, "Figure: field lines of a long straight wire (current out of the page)", "magnetism/field-patterns", "A useful notation on flat drawings");
}

// ---- Calibration curve for a thermistor (instruments lesson)
{
  const R = (T) => 10 * Math.exp(3500 * (1 / (T + 273.15) - 1 / 298.15)); // kΩ, NTC, illustrative
  const ax = D.axes({ x: [0, 100], y: [0, 40], xTicks: 20, yTicks: 10, xLabel: "temperature θ / °C (read on a standard thermometer)", yLabel: "resistance R / kΩ", w: 600, h: 380 });
  const pts = [0, 20, 40, 60, 80, 100];
  const body = ax.frame + ax.plot(R, { domain: [0, 100] }) + pts.map((t) => ax.point(t, R(t), { r: 4.5, stroke: C.amber })).join("") +
    ax.line([[0, R(55)], [55, R(55)]], { stroke: C.red, width: 1.6, dash: true, arrow: true }) + ax.line([[55, R(55)], [55, 0]], { stroke: C.red, width: 1.6, dash: true, arrow: true }) +
    ax.tag(56, R(55) + 6, "later R reading gives θ from curve", { fill: C.red }) + ax.tag(40, 33, "calibration points at known temperatures", { fill: C.blue });
  const alt = "Calibration curve for an NTC thermistor (illustrative values): resistance plotted against temperature measured with a standard thermometer falls in a curve from about 29 kΩ at 0 °C to under 1 kΩ at 100 °C; a later resistance reading is converted to a temperature by reading across to the curve and down to the axis.";
  await fig("thermistor-calibration-curve", D.svg(600, 380, body), alt, "Figure: a calibration curve converts a sensor reading into a value of the quantity", "measurement/instruments", "## Calibration curves");
}

// ---- Tables and graphs: false origin (lesson example, R against theta)
{
  const th = [20, 30, 40, 50, 60, 70, 80], Rr = [12.95, 13.47, 13.9, 14.42, 14.86, 15.41, 15.83];
  const m = (15.61 - 13.2) / 50, c = 13.2 - m * 25;
  const ax = D.axes({ x: [20, 85], y: [12.5, 16.5], xTicks: 10, yTicks: 0.5, xLabel: "θ / °C", yLabel: "R / Ω", w: 600, h: 400, origin: false, xFormat: (v) => String(v), yFormat: (v) => v.toFixed(1) });
  const body = ax.frame + ax.line([[20, c + m * 20], [82, c + m * 82]], { stroke: C.blue, width: 2.2 }) + th.map((x, i) => ax.point(x, Rr[i], { r: 4.5, stroke: C.amber })).join("") +
    ax.line([[25, 13.2], [75, 13.2]], { stroke: C.muted, width: 1.4, dash: true }) + ax.line([[75, 13.2], [75, 15.61]], { stroke: C.muted, width: 1.4, dash: true }) +
    ax.point(25, 13.2, { stroke: C.red, r: 5 }) + ax.point(75, 15.61, { stroke: C.red, r: 5 }) +
    ax.tag(26, 13.0, "(25.0 °C, 13.20 Ω)", { fill: C.red, dx: 0, dy: 26 }) + ax.tag(76, 15.4, "(75.0 °C, 15.61 Ω)", { fill: C.red, dx: -120, dy: -24 }) +
    ax.tag(45, 13.05, "ΔR = 2.41 Ω over Δθ = 50.0 °C", { fill: C.blue }) +
    ax.tag(21, 16.3, "false origin: θ axis starts at 20 °C", { fill: C.muted });
  const alt = "Graph of resistance against temperature with a false origin (the temperature axis starts at 20 °C): seven points lie on a straight line; the large gradient triangle between (25.0 °C, 13.20 Ω) and (75.0 °C, 15.61 Ω) gives a gradient of 0.0482 Ω per °C, and the intercept 12.0 Ω must be calculated, not read from the graph.";
  await fig("false-origin-gradient-graph", D.svg(600, 400, body), alt, "Figure: choose points far apart on the line for the gradient; with a false origin calculate the intercept", "skills/tables-graphs", "When the $x$-axis starts at a value other than zero");
}
console.log("fields-oscillations ok");
