// physics-a AC lessons. Run: node .scratch/physics-a/diagrams/ac.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;

// ---- Rectification and smoothing: V0 = 17.0 V (12 V rms), 50 Hz, R = 500 ohm, C = 220 uF (RC = 0.11 s)
{
  const V0 = 17.0, f = 50, R = 500, Cap = 220e-6, RC = R * Cap;
  const T = 1 / f, tmax = 2 * T;
  const half = (t) => Math.max(0, V0 * Math.sin(2 * Math.PI * f * t));
  const full = (t) => Math.abs(V0 * Math.sin(2 * Math.PI * f * t));
  // smoothed: capacitor follows the rectified voltage when it is higher, else decays
  const N = 4000, dt = tmax / N; let vc = 0; const sm = [];
  for (let i = 0; i <= N; i += 1) { const t = i * dt; const vin = full(t); vc = Math.max(vin, vc * Math.exp(-dt / RC)); sm.push([t * 1000, vc]); }
  const ripple = V0 - Math.min(...sm.filter(([t]) => t > 12).map(([, v]) => v));
  const panel = (title, body, y) => D.group(body, { translate: [0, y] });
  const mk = (fn, label) => {
    const a = D.axes({ x: [0, 40], y: [0, 20], xTicks: 10, yTicks: [0, 17], xLabel: "t / ms", yLabel: label, w: 560, h: 190, pad: { l: 56, r: 24, t: 26, b: 44 } });
    return { a, body: a.frame };
  };
  const pts = (fn) => Array.from({ length: 401 }, (_, i) => [i / 10, fn(i / 10 / 1000)]);
  const p1 = mk(); p1.body += p1.a.line(pts(half), { stroke: C.blue });
  const p2 = mk(); p2.body += p2.a.line(pts(full), { stroke: C.blue });
  const p3 = mk(); p3.body += p3.a.line(pts(full), { stroke: C.grid, width: 1.6 }) + p3.a.line(sm, { stroke: C.amber, width: 2.8 }) + p3.a.tag(20, 9, `ripple about ${ripple.toFixed(1)} V (lesson estimate 1.5 V)`, { fill: C.amber, anchor: "middle" });
  const tt = (s) => D.text(60, 16, s, { size: 14, weight: 700 });
  const body = D.group(p1.body + tt("(a) half-wave: one diode"), { translate: [0, 0] }) + D.group(p2.body + tt("(b) full-wave: bridge of four diodes"), { translate: [0, 190] }) + D.group(p3.body + tt("(c) full-wave smoothed: 220 µF across 500 Ω"), { translate: [0, 380] });
  const alt = `Three output graphs for a 50 Hz supply with peak 17.0 V: (a) half-wave rectification gives one hump every 20 ms with gaps of zero; (b) full-wave gives a hump every 10 ms with no gaps; (c) a 220 µF smoothing capacitor across a 500 Ω load holds the output near 17 V with a ripple of about ${ripple.toFixed(1)} V.`;
  const cap = "Figure: half-wave, full-wave and smoothed full-wave output (peak 17.0 V, 50 Hz)";
  await D.figure(F, "rectification-smoothing-graphs", D.svg(560, 570, body), { alt, caption: cap });
  D.insertAfter(L("ac/rectification-smoothing"), "## Smoothing with a capacitor", D.md("rectification-smoothing-graphs", alt, cap));
}

// ---- Transformer: 1150 : 60 turns, 230 V -> 12 V, 24 W lamp
{
  const Np = 1150, Ns = 60, Vp = 230, Vs = 12, P = 24, Is = P / Vs, Ip = P / Vp;
  let b = "";
  // core
  b += D.rect(190, 70, 180, 190, { stroke: C.muted, width: 2, fill: C.fillGrey }) + D.rect(230, 110, 100, 110, { stroke: C.muted, width: 2, fill: "#fff" });
  const coil = (x, y0, y1, n) => { let s = ""; const step = (y1 - y0) / n; for (let i = 0; i < n; i += 1) s += D.path_(`M${x - 24},${y0 + i * step} Q${x},${y0 + i * step + step * 0.9} ${x + 24},${y0 + i * step + step * 0.05}`, { stroke: C.amber, width: 3 }); return s; };
  b += coil(210, 100, 230, 7) + coil(350, 100, 230, 4);
  // wires
  b += D.polyline([[186, 108], [100, 108], [100, 150]], { width: 2 }) + D.polyline([[186, 222], [100, 222], [100, 190]], { width: 2 });
  b += D.circle(100, 170, 20, { fill: "#fff" }) + D.path_("M88,170 q6,-12 12,0 t12,0", { stroke: C.ink, width: 2 });
  b += D.polyline([[374, 108], [450, 108], [450, 150]], { width: 2 }) + D.polyline([[374, 222], [450, 222], [450, 190]], { width: 2 });
  b += D.sym.lamp(450, 170, { vertical: true }).replace(/<line[^>]*y1="140"[^>]*\/>/, "");
  b += D.text(100, 40, "Primary", { anchor: "middle", weight: 700 }) + D.text(100, 60, `${Np} turns`, { anchor: "middle", size: 14 });
  b += D.text(450, 40, "Secondary", { anchor: "middle", weight: 700 }) + D.text(450, 60, `${Ns} turns`, { anchor: "middle", size: 14 });
  b += D.text(280, 190, "laminated\nsoft-iron core", { anchor: "middle", size: 13, fill: C.muted });
  b += D.arrow(255, 150, 305, 150, { stroke: C.blue, width: 2 }) + D.text(280, 142, "flux", { anchor: "middle", size: 13, fill: C.blue });
  b += D.text(70, 280, `Vp = ${Vp} V r.m.s.`, { size: 14 }) + D.text(70, 300, `Ip = ${Ip.toFixed(3)} A`, { size: 14 });
  b += D.text(400, 280, `Vs = ${Vs} V   (${P} W lamp)`, { size: 14 }) + D.text(400, 300, `Is = ${Is.toFixed(1)} A`, { size: 14 });
  b += D.text(280, 330, `Vs/Vp = Ns/Np = ${Ns}/${Np} = ${(Ns / Np).toFixed(3)} = Ip/Is`, { anchor: "middle", size: 14, weight: 600 });
  const alt = `Step-down transformer on a laminated soft-iron core: 1150 primary turns on 230 V and 60 secondary turns give 12 V to a 24 W lamp; the secondary current is 2.0 A and the primary current only 0.104 A, so Vs/Vp = Ns/Np = Ip/Is.`;
  const cap = "Figure: an ideal step-down transformer (1150 turns to 60 turns) lighting a 12 V, 24 W lamp";
  await D.figure(F, "transformer-step-down", D.svg(560, 350, b), { alt, caption: cap });
  D.insertAfter(L("ac/transformers-transmission"), "## How a transformer works", D.md("transformer-step-down", alt, cap));
}
