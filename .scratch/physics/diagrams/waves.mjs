// Run: node .scratch/physics/diagrams/waves.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", L = `content/subjects/${F}/lessons/waves`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${L}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const rad = (d) => (d * Math.PI) / 180;
let clipN = 0;
const clip = (x, y, w, h, body) => { const id = `wclip${(clipN += 1)}`; return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#${id})">${body}</g>`; };

// ---- transverse wave, wavelength 0.40 m
{
  const lam = 0.4, A = 1;
  const ax = D.axes({ x: [0, 1.0], y: [-1.6, 1.8], xTicks: [0, 0.2, 0.4, 0.6, 0.8, 1.0], yTicks: [], xLabel: "Distance along the wave (m)", yLabel: "Displacement", w: 600, h: 340, grid: false, origin: false });
  const f = (x) => A * Math.sin((2 * Math.PI * x) / lam);
  const b = ax.frame + D.line(ax.X(0), ax.Y(0), ax.X(1.0), ax.Y(0), { stroke: C.muted, width: 1.4, dash: true }) + T(ax.X(1.0), ax.Y(0) + 18, "rest position", { anchor: "end", fill: C.muted, size: 13 }) +
    ax.plot(f, { domain: [0, 1.0], steps: 300 }) +
    D.line(ax.X(0.1), ax.Y(1.5), ax.X(0.5), ax.Y(1.5), { stroke: C.amber, width: 2, arrow: true, arrowStart: true }) + T(ax.X(0.3), ax.Y(1.5) - 8, "wavelength λ = 0.40 m", { anchor: "middle", fill: C.amber, weight: 700 }) +
    D.line(ax.X(0.9) + 18, ax.Y(0), ax.X(0.9) + 18, ax.Y(1), { stroke: C.red, width: 2, arrow: true, arrowStart: true }) + T(ax.X(0.9) - 10, ax.Y(1) - 28, "amplitude", { anchor: "middle", fill: C.red, weight: 700 }) +
    T(ax.X(0.1), ax.Y(1) - 8, "crest", { anchor: "middle" }) + T(ax.X(0.3), ax.Y(-1) + 22, "trough", { anchor: "middle" });
  const alt = "Transverse wave drawn as displacement against distance: crests and troughs repeat every 0.40 m, so the wavelength is 0.40 m; the amplitude is the height of a crest above the rest line. With a frequency of 2.5 Hz the wave speed is 2.5 times 0.40, 1.0 m/s.";
  await put("wave-transverse-wavelength", 600, 340, b, alt, "Figure: wavelength is crest to crest; amplitude is rest position to crest", "wave-properties", "### Transverse waves");
}

// ---- longitudinal wave: compressions and rarefactions
{
  const x0 = 40, x1 = 580, lam = 120, n = 60;
  let b = "";
  for (let k = 0; k < n; k += 1) {
    const x = x0 + (k / (n - 1)) * (x1 - x0);
    // shift rest positions by a sinusoid so the coils bunch up at compressions
    const shift = (lam / (2 * Math.PI)) * 0.55 * Math.sin((2 * Math.PI * (x - x0)) / lam);
    const xp = x - shift;
    b += D.line(xp, 70, xp, 150, { stroke: C.blue, width: 2.2 });
  }
  // compression centres: where lines are closest, i.e. where shift gradient is most negative -> at x - x0 = lam/2 + m*lam? computed numerically below
  const comp = [], rare = [];
  for (let m = 0; m < 5; m += 1) { comp.push(x0 + lam * m); rare.push(x0 + lam * (m + 0.5)); }
  b = b.replace("", "");
  for (const x of comp.filter((v) => v < x1 - 20)) b += T(x, 50, "C", { anchor: "middle", weight: 700, fill: C.amber });
  for (const x of rare.filter((v) => v < x1 - 20)) b += T(x, 50, "R", { anchor: "middle", weight: 700, fill: C.muted });
  b += D.line(x0 + lam, 172, x0 + lam * 2, 172, { stroke: C.red, width: 2, arrow: true, arrowStart: true }) + T(x0 + lam * 1.5, 196, "wavelength λ", { anchor: "middle", fill: C.red, weight: 700 }) +
    D.arrow(60, 232, 220, 232, { stroke: C.ink, width: 2.4 }) + T(230, 237, "direction the wave travels", {}) +
    D.line(60, 260, 100, 260, { stroke: C.blue, width: 2.4, arrow: true, arrowStart: true }) + T(110, 265, "the coils vibrate back and forth along the same line", {}) + T(40, 25, "C = compression (coils squashed)   R = rarefaction (coils spread apart)", { size: 13, fill: C.muted });
  const alt = "Longitudinal wave on a spring: the coils are drawn as vertical lines that bunch up at compressions (C) and spread apart at rarefactions (R). The vibration is along the direction the wave travels, and the wavelength is the distance between two neighbouring compressions.";
  await put("wave-longitudinal-compressions", 620, 290, b, alt, "Figure: a longitudinal wave has compressions and rarefactions", "wave-properties", "### Longitudinal waves");
}

// ---- refraction of water waves: deep (6.0 cm) to shallow (4.0 cm), 6 px per cm
{
  const l1 = 36, l2 = 24, th1 = rad(40), th2 = Math.asin((Math.sin(th1) * l2) / l1);
  const s = l1 / Math.sin(th1), bx = 300, y0 = 40, Lw = 150, Py = 190;
  let w = "";
  for (let k = -2; k < 7; k += 1) {
    const yk = y0 + k * s;
    w += D.line(bx, yk, bx - Lw * Math.sin(th1), yk + Lw * Math.cos(th1), { stroke: C.blue, width: 2.4 }) + D.line(bx, yk, bx + Lw * Math.sin(th2), yk - Lw * Math.cos(th2), { stroke: C.teal, width: 2.4 });
  }
  const b = D.rect(300, 0, 290, 330, { fill: C.fillBlue, stroke: "none" }) + clip(10, 0, 580, 330, w) + D.line(300, 0, 300, 330, { stroke: C.axis, width: 1.6 }) +
    D.line(20, Py, 580, Py, { stroke: C.muted, width: 1.2, dash: true }) + T(580, Py - 6, "normal", { size: 13, fill: C.muted, anchor: "end" }) +
    D.arrow(300 - 110 * Math.cos(th1), Py - 110 * Math.sin(th1), 300, Py, { stroke: C.amber, width: 3 }) + D.arrow(300, Py, 300 + 100 * Math.cos(th2), Py + 100 * Math.sin(th2), { stroke: C.amber, width: 3 }) +
    T(20, 24, "deep water", { weight: 700, fill: C.blue }) + T(20, 44, "λ = 6.0 cm, v = 0.30 m/s", { size: 13 }) + T(580, 24, "shallow water", { weight: 700, fill: C.teal, anchor: "end" }) + T(580, 44, "λ = 4.0 cm, v = 0.20 m/s", { size: 13, anchor: "end" }) +
    T(300, 358, "f = 5.0 Hz on both sides: wavefronts closer together, ray bends towards the normal", { size: 13, anchor: "middle" });
  const alt = "Water waves crossing from deep to shallow water at an angle: the wavefronts are closer together in the shallow region (wavelength 4.0 cm against 6.0 cm) and the ray bends towards the normal, because the waves slow from 0.30 to 0.20 m/s while the frequency stays 5.0 Hz.";
  await put("wave-refraction-ripple-tank", 600, 370, b, alt, "Figure: waves slow down in shallow water, so the wavelength shortens and they bend", "wave-behaviour", "### Refraction from a change of depth");
}

// ---- diffraction: gap about one wavelength vs gap much wider
{
  const lam = 26;
  const panel = (gap, title, ox) => {
    const bx = ox + 100, cy = 150, top = cy - gap / 2, bot = cy + gap / 2;
    let s = D.line(bx, 20, bx, top, { stroke: C.ink, width: 6 }) + D.line(bx, bot, bx, 290, { stroke: C.ink, width: 6 });
    // incoming plane wavefronts
    for (let k = 1; k <= 3; k += 1) s += D.line(bx - k * lam, 30, bx - k * lam, 280, { stroke: C.blue, width: 2 });
    // outgoing wavefronts
    for (let k = 1; k <= 5; k += 1) {
      const r = k * lam;
      if (gap <= 2 * lam) s += D.path_(`M${bx + r * Math.sin(rad(-85))},${cy + r * Math.cos(rad(-85)) * 0} L0,0`.replace(/M.*/, `M${bx + r * Math.cos(rad(80))},${cy - r * Math.sin(rad(80))} A${r},${r} 0 0 1 ${bx + r * Math.cos(rad(80))},${cy + r * Math.sin(rad(80))}`), { stroke: C.blue, width: 2 });
      else {
        const xk = bx + r, e = 20 + k * 4;
        s += D.path_(`M${xk},${top + e * 0.0} L${xk},${bot} `.replace(/M.*/, `M${xk - 6},${top - e * 0.5} Q${xk},${top + 6} ${xk},${top + 24} L${xk},${bot - 24} Q${xk},${bot - 6} ${xk - 6},${bot + e * 0.5}`), { stroke: C.blue, width: 2 });
      }
    }
    return s + T(ox + 150, 312, title, { anchor: "middle", weight: 700 });
  };
  const b = panel(lam, "Gap about one wavelength: spreads a lot", 0) + D.group(panel(lam * 5, "Gap much wider: little spreading", 0), { translate: [310, 0] }) +
    D.arrow(16, 150, 52, 150, { stroke: C.amber, width: 2.6 }) + T(100, 14, "", {});
  const alt = "Two ripple-tank sketches of plane waves meeting a barrier with a gap. When the gap is about one wavelength wide the waves spread out into almost semicircular wavefronts; when the gap is much wider than the wavelength the waves go through nearly straight, with slight bending only at the edges. The wavelength is unchanged.";
  await put("wave-diffraction-gap-size", 620, 325, b, alt, "Figure: diffraction is greatest when the gap is about one wavelength", "wave-behaviour", "## How much do waves diffract?");
}
console.log("waves done");
