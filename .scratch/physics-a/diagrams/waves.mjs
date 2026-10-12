// Diagrams for physics-a waves and superposition lessons. Run: node .scratch/physics-a/diagrams/waves.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const f1 = (v, d = 1) => v.toFixed(d).replace("-", "−");

// ---- Progressive wave: y-x snapshot (A = 3.0 cm, lambda = 0.80 m) and y-t at one point (symbolic)
{
  const A = 3.0, lam = 0.8;
  const y = (x) => A * Math.sin((2 * Math.PI * x) / lam);
  const a1 = D.axes({ x: [0, 1.0], y: [-4, 4], xTicks: 0.2, yTicks: 2, xLabel: "x / m", yLabel: "y / cm", w: 600, h: 300, pad: { l: 60, r: 24, t: 30, b: 50 } });
  const body1 = a1.frame + a1.plot(y, { domain: [0, 0.8] }) +
    a1.line([[0.2, 0], [0.2, A]], { stroke: C.amber, width: 1.8, dash: true }) + a1.label(0.2, A + 0.4, "amplitude 3.0 cm", { anchor: "middle", size: 14, fill: C.amber }) +
    a1.arrow(0, -3.6, 0.8, -3.6, { stroke: C.blue, width: 2 }) + a1.arrow(0.8, -3.6, 0, -3.6, { stroke: C.blue, width: 2 }) + a1.label(0.4, -3.2, "wavelength 0.80 m", { anchor: "middle", size: 14, fill: C.blue });
  const alt1 = "Snapshot of a wave on a rope (displacement against distance): one full sine curve of amplitude 3.0 cm repeating every 0.80 m, so the wavelength is read from the horizontal axis as the distance between adjacent crests.";
  const cap1 = "Figure: displacement-distance graph; the horizontal gap between crests is the wavelength";
  await D.figure(F, "wave-displacement-distance-graph", D.svg(600, 300, body1), { alt: alt1, caption: cap1 });
  D.insertAfter(L("waves/progressive-waves"), "Plotted, the points form one full sine curve", D.md("wave-displacement-distance-graph", alt1, cap1));
  const a2 = D.axes({ x: [0, 2.2], y: [-4, 5], xTicks: [], yTicks: [], tickLabels: false, xLabel: "t", yLabel: "y at one point", w: 600, h: 260, pad: { l: 60, r: 24, t: 50, b: 50 } });
  const body2 = a2.frame + a2.plot((t) => A * Math.sin(2 * Math.PI * t), { domain: [0, 2] }) +
    a2.arrow(0.25, 3.5, 1.25, 3.5, { stroke: C.blue, width: 2 }) + a2.arrow(1.25, 3.5, 0.25, 3.5, { stroke: C.blue, width: 2 }) + a2.label(0.75, 3.9, "period T (frequency f = 1/T)", { anchor: "middle", size: 14, fill: C.blue });
  const alt2 = "Displacement-time graph for one point on the wave: the same sine shape, but now the horizontal gap between crests is the period T, the time for one oscillation, and the frequency is 1/T.";
  const cap2 = "Figure: displacement-time graph; the horizontal gap between crests is the period";
  await D.figure(F, "wave-displacement-time-graph", D.svg(600, 260, body2), { alt: alt2, caption: cap2 });
  D.insertAfter(L("waves/progressive-waves"), "wave-displacement-distance-graph", D.md("wave-displacement-time-graph", alt2, cap2));
}

// ---- Stationary waves on a string: harmonics, L = 0.80 m, v = 120 m/s
{
  const Lm = 0.8, v = 120, f1h = v / (2 * Lm);
  const x0 = 70, x1 = 520, amp = 28;
  let body = "";
  [1, 2, 3].forEach((n, i) => {
    const cy = 60 + i * 100;
    body += D.line(x0, cy, x1, cy, { stroke: C.grid, width: 1 });
    for (const sgn of [1, -1]) {
      let d = "";
      for (let k = 0; k <= 160; k += 1) { const u = k / 160; d += `${k ? "L" : "M"}${x0 + u * (x1 - x0)},${cy - sgn * amp * Math.sin(n * Math.PI * u)} `; }
      body += D.path_(d.trim(), { stroke: C.blue, width: 2.4 });
    }
    for (let m = 0; m <= n; m += 1) body += D.dot(x0 + (m / n) * (x1 - x0), cy, { r: 4.5, fill: C.red, stroke: C.red });
    body += D.text(x1 + 18, cy - 4, `n = ${n}`, { size: 14, weight: 700 }) + D.text(x1 + 18, cy + 15, `f = ${n * f1h} Hz`, { size: 14 }) + D.text(x1 + 18, cy + 34, `λ = ${f1(2 * Lm / n, 2)} m`, { size: 13, fill: C.muted });
  });
  body += D.rect(x0 - 8, 20, 8, 270, { fill: C.axis, stroke: C.axis, width: 1 }) + D.rect(x1, 20, 8, 270, { fill: C.axis, stroke: C.axis, width: 1 }) +
    D.line(x0, 306, x1, 306, { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true }) + D.text((x0 + x1) / 2, 326, "L = 0.80 m", { anchor: "middle", size: 14 }) +
    D.text(x0, 14, "red dots: nodes", { size: 13, fill: C.red });
  const alt = "A string 0.80 m long fixed at both ends, with waves travelling at 120 m/s: the first three stationary-wave patterns have 1, 2 and 3 loops, with nodes at the ends and between loops, wavelengths 1.60 m, 0.80 m and 0.53 m, and frequencies 75 Hz, 150 Hz and 225 Hz.";
  const cap = "Figure: the first three harmonics of a string fixed at both ends";
  await D.figure(F, "string-harmonics", D.svg(620, 340, body), { alt, caption: cap });
  D.insertAfter(L("superposition/stationary-waves"), "**A string fixed at both ends**", D.md("string-harmonics", alt, cap));
}

// ---- Pipes: closed at one end vs open at both ends, L = 0.33 m, v = 340 m/s (fundamental and next resonance)
{
  const Lm = 0.33, v = 340;
  const fc = v / (4 * Lm), fo = v / (2 * Lm);
  const x0 = 70, x1 = 430, h = 40;
  let body = "";
  const tube = (cy, closed) => D.line(x0, cy - h, x1, cy - h, { width: 3 }) + D.line(x0, cy + h, x1, cy + h, { width: 3 }) + (closed ? D.line(x1, cy - h, x1, cy + h, { width: 6 }) : "");
  const env = (cy, fn) => { let d1 = "", d2 = ""; for (let k = 0; k <= 120; k += 1) { const u = k / 120; const e = fn(u) * (h - 8); d1 += `${k ? "L" : "M"}${x0 + u * (x1 - x0)},${cy - e} `; d2 += `${k ? "L" : "M"}${x0 + u * (x1 - x0)},${cy + e} `; } return D.path_(d1.trim(), { stroke: C.blue, width: 2.4 }) + D.path_(d2.trim(), { stroke: C.blue, width: 2.4 }); };
  const rows = [
    { cy: 70, closed: true, fn: (u) => Math.cos((Math.PI / 2) * u), t1: "Closed pipe, fundamental", t2: `L = λ/4, f = ${Math.round(fc)} Hz` },
    { cy: 190, closed: true, fn: (u) => Math.abs(Math.cos((3 * Math.PI / 2) * u)), t1: "Closed pipe, third harmonic", t2: `L = 3λ/4, f = ${Math.round(3 * fc)} Hz` },
    { cy: 310, closed: false, fn: (u) => Math.abs(Math.cos(Math.PI * u)), t1: "Open pipe, fundamental", t2: `L = λ/2, f = ${Math.round(fo)} Hz` },
  ];
  // closed end at the right: node there. envelope should be 0 at x1 (closed) and max at x0 (open): cos from left
  rows.forEach((r) => {
    body += tube(r.cy, r.closed) + env(r.cy, r.fn);
    body += D.text(x1 + 22, r.cy - 6, r.t1, { size: 14, weight: 700 }) + D.text(x1 + 22, r.cy + 14, r.t2, { size: 14 });
  });
  body += D.text(x0 - 6, 20, "open end (antinode)", { size: 13, fill: C.muted, anchor: "start" });
  const alt = "Stationary waves in a 0.33 m pipe with sound at 340 m/s: a pipe closed at one end has a node at the closed end and an antinode at the open end, giving 258 Hz (a quarter wavelength) then 773 Hz (three quarters of a wavelength); a pipe open at both ends has antinodes at both ends, giving 515 Hz for a half wavelength.";
  const cap = "Figure: the displacement pattern in closed and open pipes (L = 0.33 m)";
  await D.figure(F, "pipe-standing-waves", D.svg(700, 370, body), { alt, caption: cap });
  D.insertAfter(L("superposition/stationary-waves"), "**A pipe open at both ends**", D.md("pipe-standing-waves", alt, cap));
}

// ---- Diffraction at a gap: wide gap (10 lambda) vs gap = lambda
{
  const lam = 14;
  const panel = (gapLam, ox, title) => {
    const gap = gapLam * lam, cy = 160, bx = ox + 70;
    let s = D.line(bx, 10, bx, cy - gap / 2, { width: 5 }) + D.line(bx, cy + gap / 2, bx, 312, { width: 5 });
    // incident plane fronts
    for (let k = 1; k <= 4; k += 1) s += D.line(bx - k * lam, 30, bx - k * lam, 290, { stroke: C.teal, width: 1.8 });
    for (let k = 1; k <= 5; k += 1) {
      const r = k * lam;
      if (gapLam > 3) {
        s += D.line(bx + r, cy - gap / 2, bx + r, cy + gap / 2, { stroke: C.blue, width: 1.8 });
        s += D.path_(`M${bx + r},${cy - gap / 2} A${r},${r} 0 0 0 ${bx},${cy - gap / 2 - r}`, { stroke: C.blue, width: 1.8 });
        s += D.path_(`M${bx + r},${cy + gap / 2} A${r},${r} 0 0 1 ${bx},${cy + gap / 2 + r}`, { stroke: C.blue, width: 1.8 });
      } else s += D.path_(`M${bx},${cy - r} A${r},${r} 0 0 1 ${bx},${cy + r}`, { stroke: C.blue, width: 1.8 });
    }
    s += D.text(ox + 140, 336, title, { size: 14, weight: 700, anchor: "middle" });
    return s;
  };
  const body = panel(10, 0, "gap = 10λ: little spreading") + panel(1, 300, "gap = λ: strong spreading") + D.text(300, 358, "the wavelength is the same before and after the gap", { size: 13, fill: C.muted, anchor: "middle" });
  const alt = "Ripple-tank wavefronts meeting a barrier: through a gap of 10 wavelengths the waves continue almost straight with only slight bending at the edges and a clear shadow; through a gap of one wavelength they spread out as nearly semicircular wavefronts; the wavelength is the same before and after the gap.";
  const cap = "Figure: diffraction is strongest when the gap is about one wavelength";
  await D.figure(F, "ripple-tank-diffraction-gaps", D.svg(600, 370, body), { alt, caption: cap });
  D.insertAfter(L("superposition/diffraction"), "In every case the **spacing", D.md("ripple-tank-diffraction-gaps", alt, cap));
}

// ---- Young's double slit: a = 0.50 mm, D = 1.80 m, 10 fringes = 21.6 mm -> x = 2.16 mm
{
  const a = 0.5e-3, Dd = 1.8, lam = 600e-9, x = (lam * Dd) / a;
  const ax = D.axes({ x: [-7, 7], y: [0, 1.15], xTicks: 2.16, yTicks: [], tickLabels: false, grid: true, xLabel: "position on screen", yLabel: "intensity", w: 600, h: 300, pad: { l: 50, r: 24, t: 30, b: 70 } });
  const I = (p) => Math.cos((Math.PI * p) / 2.16) ** 2;
  let body = ax.frame + ax.plot(I, { domain: [-6.5, 6.5], steps: 600 });
  body += ax.arrow(0, -0.12, 2.16, -0.12, { width: 1.5 }) + ax.arrow(2.16, -0.12, 0, -0.12, { width: 1.5 }) + ax.label(1.08, -0.2, "x = 2.16 mm", { anchor: "middle", size: 14, fill: C.blue });
  // schematic of slits on the left? place a second SVG group above via text only
  const alt = `Fringe pattern from Young's double slit (slit separation 0.50 mm, screen 1.80 m away, laser light of wavelength 600 nm): equally spaced bright fringes with centres ${(x * 1000).toFixed(2)} mm apart, found from x = λD/a, with dark fringes midway between them.`;
  const cap = "Figure: the double-slit intensity pattern has equally spaced bright fringes of separation x = λD/a";
  await D.figure(F, "double-slit-fringe-pattern", D.svg(600, 300, body), { alt, caption: cap });
  D.insertAfter(L("superposition/two-source-interference"), "Because $x$ is only a few millimetres", D.md("double-slit-fringe-pattern", alt, cap));
}
console.log("waves ok");
