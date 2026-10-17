// physics-a waves, oscillations, thermal (new figures). Run: node .scratch/physics-a/diagrams/waves2.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const rad = (d) => (d * Math.PI) / 180;
const f = (v, d = 0) => v.toFixed(d).replace("-", "−");

// ---- Longitudinal wave snapshot: A = 5.0 um, lambda = 0.60 m
{
  const A = 5.0, lam = 0.6;
  const a = D.axes({ x: [0, 0.6], y: [-6.5, 6.5], xTicks: 0.075, yTicks: [-5, 0, 5], xLabel: "x / m", yLabel: "s / µm", w: 560, h: 440, pad: { l: 60, r: 28, t: 145, b: 56 }, xFormat: (v) => v.toFixed(3) });
  const s = (x) => A * Math.sin((2 * Math.PI * x) / lam);
  let b = a.frame + a.plot(s, { domain: [0, 0.6] });
  for (let x = 0; x <= 0.6001; x += 0.075) b += a.point(x, s(x), { stroke: C.amber, r: 4 });
  // particle strip: equilibrium spacing 0.0125 m, displacements exaggerated 3 px per um
  b += D.text(60, 20, "Particles in the medium (displacements greatly exaggerated)", { size: 14, weight: 700 });
  for (let i = 0; i <= 48; i += 1) {
    const x = i * 0.0125, px = a.X(x) + s(x) * 3;
    b += D.line(px, 36, px, 84, { stroke: C.blue, width: 2 });
  }
  b += D.text(a.X(0.3), 104, "compression", { anchor: "middle", size: 14, fill: C.red, weight: 600 }) + D.line(a.X(0.3), 88, a.X(0.3), 96, { stroke: C.red }) +
    D.text(a.X(0.6) - 10, 104, "rarefaction", { anchor: "end", size: 14, fill: C.green, weight: 600 }) + D.text(a.X(0) + 6, 104, "rarefaction", { size: 14, fill: C.green, weight: 600 });
  const alt = "Snapshot of a sound wave (amplitude 5.0 µm, wavelength 0.60 m): the displacement-distance graph is a sine curve, and the particles crowd into a compression at x = 0.300 m, where displacement changes from positive (right) to negative (left), and spread into rarefactions at 0 and 0.600 m.";
  const cap = "Figure: a longitudinal wave, particle positions above the matching displacement graph (points from the lesson table)";
  await D.figure(F, "longitudinal-wave-snapshot", D.svg(560, 440, b), { alt, caption: cap });
  D.insertAfter(L("waves/transverse-longitudinal"), "The graph of $s$ against $x$ is a sine curve", D.md("longitudinal-wave-snapshot", alt, cap));
}

// ---- Malus's law: I/I0 = cos^2(theta)
{
  const a = D.axes({ x: [0, 180], y: [0, 1.1], xTicks: 30, yTicks: 0.25, xLabel: "θ / °", yLabel: "I / I₀", w: 560, h: 330, yFormat: (v) => v.toFixed(2) });
  let b = a.frame + a.plot((t) => Math.cos(rad(t)) ** 2, { domain: [0, 180] });
  for (const t of [0, 15, 30, 45, 60, 75, 90]) b += a.point(t, Math.cos(rad(t)) ** 2, { stroke: C.amber, r: 4.5 });
  b += a.guides(45, 0.5) + a.tag(50, 0.62, "0.500 at 45°", { size: 14, anchor: "start", dx: 10, fill: C.amber }) + a.tag(92, 0.1, "zero at 90° (crossed)", { size: 14, anchor: "start", dx: 10, dy: -30 });
  const alt = "Malus's law: transmitted intensity I/I₀ = cos²θ falls from 1.000 at 0° through 0.750 at 30°, 0.500 at 45° and 0.250 at 60° to zero at 90°, then rises again to 1 at 180° as the filter is turned.";
  const cap = "Figure: transmitted intensity through a polarising filter against angle (points from the lesson table)";
  await D.figure(F, "malus-law-graph", D.svg(560, 330, b), { alt, caption: cap });
  D.insertAfter(L("waves/polarisation-malus"), "A graph of $I/I_0$ against $\\theta$ falls", D.md("malus-law-graph", alt, cap));
}

// ---- Doppler: wavefronts from a moving source (drawn with v_s = 0.4 v)
{
  const vs = 0.4, T = 1;
  const cx0 = 230, cy = 170, unit = 40; // px per (v*T)
  let b = D.text(10, 22, "Source moving right: wavefronts bunch up ahead and spread out behind", { size: 14, weight: 700 });
  for (let k = 0; k < 4; k += 1) {
    const emitted = k, r = (3 - k) * unit, x = cx0 + emitted * vs * unit;
    b += D.circle(x, cy, r, { stroke: C.blue, width: 1.8 }) + D.dot(x, cy, { r: 3, stroke: C.muted });
  }
  const sx = cx0 + 3 * vs * unit;
  b += D.circle(sx, cy, 8, { fill: C.amber, stroke: C.amber }) + D.arrow(sx + 12, cy, sx + 60, cy, { stroke: C.amber, width: 3 }) + D.text(sx + 28, cy - 10, "vₛ", { size: 15, fill: C.amber, weight: 700 });
  b += D.text(362, 150, "ahead (shorter λ):", { size: 14, fill: C.blue, weight: 600 }) + D.text(362, 170, "λ' = (v − vₛ)/fₛ", { size: 14, fill: C.blue, weight: 600 }) + D.text(10, 316, "behind (longer λ): λ' = (v + vₛ)/fₛ", { size: 14, fill: C.blue, weight: 600 });
  b += D.text(10, 340, "Drawn with vₛ = 0.4 v for clarity. Lesson example: 900 Hz siren at 25 m/s, v = 340 m/s:", { size: 13, fill: C.muted });
  b += D.text(10, 358, "observer ahead hears 971 Hz (0.350 m), behind hears 838 Hz (0.406 m).", { size: 13, fill: C.muted });
  const alt = "Wavefronts from a source moving to the right: each is a circle centred where it was emitted, so they are bunched together ahead of the source (shorter wavelength, higher pitch) and spread out behind it; for the lesson's 900 Hz siren at 25 m/s the observer ahead hears 971 Hz and the one behind 838 Hz.";
  const cap = "Figure: the Doppler effect for a moving source (speed exaggerated in the drawing)";
  await D.figure(F, "doppler-wavefronts", D.svg(560, 375, b), { alt, caption: cap });
  D.insertAfter(L("waves/doppler"), "## Explaining the effect with wavefronts", D.md("doppler-wavefronts", alt, cap));
}

// ---- Damping: light damping decay (20% per cycle from 10.0 cm); resonance curves
{
  const A0 = 10, r = 0.8;
  const env = (t) => A0 * r ** t;
  const a = D.axes({ x: [0, 5.5], y: [-12, 12], xTicks: 1, yTicks: 5, yLabel: "x / cm", w: 560, h: 350 });
  let b = a.frame + a.plot(env, { stroke: C.muted, dash: true, width: 1.6, domain: [0, 5.5] }) + a.plot((t) => -env(t), { stroke: C.muted, dash: true, width: 1.6, domain: [0, 5.5] }) + a.plot((t) => env(t) * Math.cos(2 * Math.PI * t), { domain: [0, 5.5], steps: 600 });
  for (let n = 0; n <= 5; n += 1) b += a.point(n, env(n), { stroke: C.amber, r: 4 }) + a.label(n, env(n) + 1.8, f(env(n), 1), { anchor: "middle", size: 13, fill: C.amber, dx: 16 });
  b += a.tag(5.45, -9.5, "amplitude × 0.80 each cycle; energy × 0.64", { size: 14, anchor: "end" }) + D.text(532, 342, "number of oscillations", { size: 14, weight: 600, anchor: "end" });
  const alt = "Light damping: a pendulum starting at 10.0 cm oscillates with the amplitude multiplied by 0.80 every cycle (10.0, 8.0, 6.4, 5.1, 4.1, 3.3 cm), a smooth exponential envelope, while the period stays almost constant; each cycle loses 36% of the energy.";
  const cap = "Figure: lightly damped oscillation with an exponential decay in amplitude";
  await D.figure(F, "light-damping-decay", D.svg(560, 350, b), { alt, caption: cap });
  D.insertAfter(L("oscillations/damping-resonance"), "## Forced oscillations and resonance", D.md("light-damping-decay", alt, cap));

  const fr = [0.5, 1, 1.5, 1.8, 2, 2.2, 2.5, 3, 4];
  const light = [1.07, 1.33, 2.26, 4.92, 12.57, 4.4, 1.75, 0.8, 0.33], heavy = [1.06, 1.27, 1.77, 2.13, 2.09, 1.77, 1.22, 0.69, 0.32];
  const a2 = D.axes({ x: [0, 4.2], y: [0, 14], xTicks: 0.5, yTicks: 2, xLabel: "driving frequency / Hz", yLabel: "amplitude ratio", w: 560, h: 340 });
  let b2 = a2.frame + a2.line(fr.map((x, i) => [x, light[i]]), { stroke: C.red }) + a2.line(fr.map((x, i) => [x, heavy[i]]), { stroke: C.blue });
  fr.forEach((x, i) => { b2 += a2.point(x, light[i], { stroke: C.red, r: 3.5 }) + a2.point(x, heavy[i], { stroke: C.blue, r: 3.5 }); });
  b2 += a2.tag(2.15, 12.8, "light damping: peak 12.57 at 2.0 Hz", { size: 14, anchor: "start", fill: C.red }) + a2.tag(4.15, 7.2, "heavier damping: lower, broader peak", { size: 14, anchor: "end", fill: C.blue }) + a2.tag(4.15, 6.0, "(about 2.1 near 1.8 to 2.0 Hz)", { size: 14, anchor: "end", fill: C.blue }) + a2.guides(2, 0.001, { stroke: C.muted });
  const alt2 = "Resonance curves for a system with natural frequency 2.0 Hz: with light damping the amplitude ratio peaks at 12.57 at 2.0 Hz; with heavier damping the peak is much lower (about 2.1) and broader and sits slightly below 2.0 Hz; far from resonance both curves agree, falling towards zero above 3 Hz.";
  const cap2 = "Figure: more damping lowers and broadens the resonance peak (points from the lesson table)";
  await D.figure(F, "resonance-curves-damping", D.svg(560, 340, b2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("oscillations/damping-resonance"), "Plotted against driving frequency, both curves start near 1", D.md("resonance-curves-damping", alt2, cap2));
}

// ---- Heating curve: 0.10 kg of ice at -20 C heated at 500 W
{
  const m = 0.1, P = 500, ci = 2100, cw = 4200, Lf = 3.34e5, Lv = 2.26e6;
  const t1 = (m * ci * 20) / P, t2 = (m * Lf) / P, t3 = (m * cw * 100) / P, t4 = (m * Lv) / P;
  const T = [0, t1, t1 + t2, t1 + t2 + t3, t1 + t2 + t3 + t4];
  const a = D.axes({ x: [0, 640], y: [-30, 120], xTicks: 100, yTicks: [-20, 0, 20, 40, 60, 80, 100], xLabel: "time / s", yLabel: "θ / °C", w: 560, h: 360 });
  const b = a.frame + a.line([[T[0], -20], [T[1], 0], [T[2], 0], [T[3], 100], [T[4], 100]], { stroke: C.blue }) +
    a.tag(250, 62, `ice warming: ${f(t1, 1)} s`, { size: 14, anchor: "start" }) + a.tag(250, 46, `melting at 0 °C: ${f(t2)} s`, { size: 14, anchor: "start" }) +
    a.tag(250, 30, `water warming: ${f(t3)} s`, { size: 14, anchor: "start" }) + a.tag(250, 14, `boiling at 100 °C: ${f(t4)} s`, { size: 14, anchor: "start" });
  const alt = `Heating curve for 0.10 kg of ice at −20 °C on a 500 W heater: ice warms for ${f(t1, 1)} s, melts at 0 °C for ${f(t2)} s, water warms to 100 °C over ${f(t3)} s and boils at 100 °C for ${f(t4)} s; the flat sections are the energy mL and the boiling section is longest because Lv is about seven times Lf.`;
  const cap = "Figure: heating curve of 0.10 kg of ice at 500 W (c ice 2100, c water 4200 J/kg/K, Lf 3.34 × 10⁵, Lv 2.26 × 10⁶ J/kg)";
  await D.figure(F, "heating-curve-ice-to-steam", D.svg(560, 360, b), { alt, caption: cap });
  D.insertAfter(L("thermal/specific-heat-latent-heat"), "With constant power $P$, the gradient of each sloping section", D.md("heating-curve-ice-to-steam", alt, cap));
}
