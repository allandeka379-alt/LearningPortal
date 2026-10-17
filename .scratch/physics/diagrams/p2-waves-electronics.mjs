// Second diagram pass: sound, echoes, EM spectrum, signals, logic gates, CRO, electron beam.
// Run from repo root: node .scratch/physics/diagrams/p2-waves-electronics.mjs   (lessons are hand-written Markdown)
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", LR = `content/subjects/${F}/lessons`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${LR}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const noise = (i) => Math.sin(i * 12.9898) * 0.5 + Math.sin(i * 78.233 + 1.7) * 0.5;
const bp = (d, c, wd) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${wd}" stroke-linecap="butt" stroke-linejoin="round"/>`;

// ---- sound needs a medium: bell jar
{
  let b = D.rect(70, 262, 300, 14, { fill: C.fillGrey, width: 2 });
  b += D.path_("M110,262 L110,120 Q110,40 220,40 Q330,40 330,120 L330,262", { width: 3 }) + D.path_("M110,262 L110,120 Q110,40 220,40 Q330,40 330,120 L330,262", { stroke: C.fillBlue, width: 8, dash: false });
  b += D.path_("M110,262 L110,120 Q110,40 220,40 Q330,40 330,120 L330,262", { width: 2.4 });
  b += D.line(220, 40, 220, 72, { width: 2 }) + D.path_("M196,120 Q196,80 220,80 Q244,80 244,120 Z", { fill: C.fillAmber, stroke: C.amber, width: 2.4 }) + D.line(244, 108, 266, 100, { width: 2.4 }) + D.circle(270, 99, 5, { fill: C.ink });
  b += M(220, 160, "electric bell", { size: 13 }) + M(220, 180, "ringing", { size: 13 });
  b += D.path_("M200,276 L200,300 L330,300", { width: 6, stroke: C.axis }) + D.rect(330, 276, 110, 56, { fill: C.fillGrey, r: 6 }) + M(385, 300, "vacuum", { size: 13 }) + M(385, 318, "pump", { size: 13 });
  b += T(60, 26, "glass bell jar", { size: 13 });
  b += T(400, 120, "As the pump removes the air:", { weight: 700 }) + T(400, 144, "the bell can still be seen", {}) + T(400, 164, "hammering, but the sound", {}) + T(400, 184, "fades away.", {}) + T(400, 214, "Sound cannot travel", { weight: 700 }) + T(400, 234, "through a vacuum.", { weight: 700 });
  const alt = "Bell jar experiment: an electric bell rings inside a glass jar joined to a vacuum pump; as the air is pumped out the bell is still seen striking but the sound fades away, showing that sound cannot travel through a vacuum.";
  await put("sound-bell-jar-vacuum", 600, 350, b, alt, "Figure: the bell jar experiment, sound needs a medium", "waves/sound", "Sound needs a **medium**");
}

// ---- CRO traces: pitch and loudness (same time-base and gain)
{
  const panel = (x0, label, waves, amp, note) => {
    const w = 170, h = 120, cy = 80;
    let s = D.rect(x0, 40, w, h, { fill: "#fff", width: 2 }) + D.line(x0, cy, x0 + w, cy, { stroke: C.grid, width: 1.4 });
    let d = "";
    for (let i = 0; i <= 160; i += 1) d += `${i ? "L" : "M"}${x0 + (i / 160) * w},${cy - amp * Math.sin((2 * Math.PI * waves * i) / 160)} `;
    s += D.path_(d, { stroke: C.blue, width: 2.6 }) + M(x0 + w / 2, 28, label, { weight: 700 }) + M(x0 + w / 2, 182, note, { size: 13 });
    return s;
  };
  const b = panel(10, "Note A", 2, 22, "2 waves, small") + panel(200, "Higher pitch", 4, 22, "more waves, same height") + panel(390, "Louder", 2, 44, "same waves, taller");
  const alt = "Three oscilloscope traces on the same settings: a reference note with 2 waves of small height; a higher-pitched note with 4 waves of the same height (higher frequency); a louder note with 2 waves of twice the height (larger amplitude).";
  await put("sound-cro-pitch-loudness", 580, 200, b, alt, "Figure: pitch changes the number of waves, loudness changes their height", "waves/sound", "On a cathode-ray oscilloscope (CRO) a microphone signal");
}

// ---- echo from a cliff: 340 m/s, 1.2 s
{
  const v = 340, t = 1.2, tot = v * t, d = tot / 2;
  let b = D.rect(470, 40, 40, 190, { fill: C.fillGrey, width: 2.4 });
  for (let y = 56; y < 230; y += 18) b += D.line(470, y, 510, y - 14, { stroke: C.muted, width: 1.2 });
  b += M(490, 255, "cliff", { weight: 700 }) + D.circle(60, 150, 9, { fill: C.fillAmber, stroke: C.amber }) + D.line(60, 159, 60, 192, { width: 3 }) + M(60, 214, "learner", { weight: 700 });
  b += D.arrow(80, 100, 460, 100, { stroke: C.blue, width: 3 }) + T(120, 90, `sound goes out: ${d} m`, { fill: C.blue, weight: 700 });
  b += D.arrow(460, 190, 80, 190, { stroke: C.red, width: 3 }) + T(130, 212, `echo comes back: ${d} m`, { fill: C.red, weight: 700 });
  b += D.line(60, 60, 470, 60, { stroke: C.muted, width: 1.4, arrow: true, arrowStart: true }) + M(265, 52, `distance to the cliff = ${d} m`, { weight: 700 });
  b += T(40, 285, `total path = ${v} × ${t} = ${tot} m in ${t} s; distance = ${tot} ÷ 2 = ${d} m`, { weight: 700 });
  const alt = "Echo from a cliff: the sound travels out and back, so in 1.2 s at 340 m/s it covers 408 m in total; the cliff is half of that, 204 m, away.";
  await put("echo-cliff-204m", 560, 305, b, alt, "Figure: an echo travels to the cliff and back, so the cliff is half the total distance away", "waves/echoes-ultrasound", "## Using echoes to measure distance");
}

// ---- sonar: 1500 m/s, 0.80 s -> 600 m
{
  const v = 1500, t = 0.8, depth = (v * t) / 2;
  let b = D.rect(20, 40, 520, 8, { fill: C.fillBlue, stroke: "none" }) + D.rect(20, 48, 520, 180, { fill: C.fillBlue, stroke: "none" });
  b += D.polyline([[20, 228], [140, 216], [260, 236], [380, 222], [540, 232], [540, 250], [20, 250]], { fill: C.fillGrey, close: true, width: 2.4 });
  b += D.polyline([[190, 40], [340, 40], [320, 62], [210, 62]], { fill: C.fillAmber, close: true, stroke: C.amber }) + M(265, 30, "ship", { weight: 700 });
  b += D.arrow(250, 66, 250, 224, { stroke: C.blue, width: 3 }) + D.arrow(290, 224, 290, 66, { stroke: C.red, width: 3 });
  b += T(150, 120, "pulse", { fill: C.blue, weight: 700, anchor: "end" }) + T(150, 140, "down", { fill: C.blue, weight: 700, anchor: "end" }) + T(310, 120, "echo up", { fill: C.red, weight: 700 });
  b += D.line(400, 48, 400, 224, { stroke: C.axis, width: 1.6, arrow: true, arrowStart: true }) + T(412, 140, `depth = ${depth} m`, { weight: 700 });
  b += T(20, 282, `depth = ${v} × ${t.toFixed(2)} ÷ 2 = ${depth} m`, { weight: 700 }) + T(20, 304, `echo returns ${t.toFixed(2)} s after the pulse; speed in water ${v} m/s`, { size: 13, fill: C.muted });
  const alt = "Sonar: a ship sends an ultrasound pulse down and the echo from the seabed returns 0.80 s later; at 1500 m/s the pulse travels 1200 m in total, so the depth is half of that, 600 m.";
  await put("sonar-depth-600m", 560, 318, b, alt, "Figure: sonar finds the depth from the echo time, 600 m", "waves/echoes-ultrasound", "### Sonar (echo sounding)");
}

// ---- electromagnetic spectrum in order
{
  const names = [["Radio\nwaves", "TV,\nradio"], ["Micro-\nwaves", "phones,\novens"], ["Infrared", "remotes,\nheat"], ["Visible\nlight", "sight"], ["Ultra-\nviolet", "sterilising"], ["X-rays", "bone\nimages"], ["Gamma\nrays", "sterilising,\ntherapy"]];
  const w = 76, gap = 6, x0 = 20;
  let b = "";
  names.forEach(([n, u], i) => {
    const x = x0 + i * (w + gap);
    b += D.rect(x, 50, w, 70, { fill: i % 2 ? C.fillBlue : C.fillAmber, r: 6, width: 1.6 }) + M(x + w / 2, 78, n, { weight: 700, size: 14 });
    b += M(x + w / 2, 150, u, { size: 13 });
  });
  b += T(x0, 28, "lowest frequency", { size: 13, fill: C.muted }) + T(x0 + 7 * (w + gap) - gap, 28, "highest frequency", { size: 13, fill: C.muted, anchor: "end" });
  b += D.arrow(x0, 200, x0 + 7 * (w + gap) - gap, 200, { stroke: C.blue, width: 2.6 }) + M(310, 222, "frequency increases", { fill: C.blue, weight: 700 });
  b += D.arrow(x0 + 7 * (w + gap) - gap, 250, x0, 250, { stroke: C.amber, width: 2.6 }) + M(310, 272, "wavelength increases", { fill: C.amber, weight: 700 });
  b += M(310, 308, "all travel at 3.0 × 10⁸ m/s in a vacuum", { size: 13, fill: C.muted });
  const alt = "The electromagnetic spectrum in order of increasing frequency: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays; wavelength decreases the same way, and all travel at 3.0 times 10 to the 8 metres per second in a vacuum.";
  await put("em-spectrum-order", 640, 325, b, alt, "Figure: the electromagnetic spectrum, from radio waves to gamma rays", "waves/em-spectrum", "## The spectrum in order");
}

// ---- analogue noise is amplified; a digital signal is regenerated
{
  const w = 180, h = 60;
  const pan = (x0, y0, fn, label, col = C.blue) => {
    let d = "";
    for (let i = 0; i <= 120; i += 1) d += `${i ? "L" : "M"}${x0 + (i / 120) * w},${y0 - fn(i / 120, i)} `;
    return D.rect(x0, y0 - h / 2 - 8, w, h + 16, { fill: "#fff", width: 1.4, stroke: C.grid }) + D.path_(d, { stroke: col, width: 2.2 }) + M(x0 + w / 2, y0 + h / 2 + 30, label, { size: 13 });
  };
  const ana = (u) => 22 * Math.sin(2 * Math.PI * 2 * u);
  const dig = (u) => (Math.floor(u * 6) % 2 === 0 || [1, 3].includes(Math.floor(u * 6)) ? 1 : 0);
  const bits = [1, 0, 1, 1, 0, 1];
  const digv = (u) => (bits[Math.min(5, Math.floor(u * 6))] ? 22 : -22);
  const nz = (a) => (i) => a * noise(i);
  let b = T(12, 20, "Analogue", { weight: 700 }) + T(12, 190, "Digital", { weight: 700 });
  b += pan(10, 74, ana, "sent");
  b += pan(205, 74, (u, i) => ana(u) * 0.6 + nz(7)(i), "weaker, with noise");
  b += pan(400, 74, (u, i) => ana(u) + nz(12)(i), "amplified: noise amplified too", C.red);
  b += pan(10, 244, digv, "sent: 1 0 1 1 0 1");
  b += pan(205, 244, (u, i) => digv(u) * 0.55 + nz(7)(i), "weaker, with noise");
  b += pan(400, 244, digv, "regenerated: clean copy", C.green);
  const alt = "Analogue signals: after travelling the signal is weaker and noisy, and amplifying it also amplifies the noise. Digital signals: the weak noisy pulses are recognised as 1s and 0s and the regenerator rebuilds a clean copy, so digital signals can travel further.";
  await put("signals-analogue-digital-noise", 590, 330, b, alt, "Figure: noise stays in an amplified analogue signal but is removed when a digital signal is regenerated", "waves/communication", "### The benefits of digital signals");
}

// ---- logic gate symbols
{
  const gw = 64, gh = 52;
  const inputs = (x, y, n, back = 0) => (n === 1 ? D.line(x - 26, y + gh / 2, x + back, y + gh / 2, { width: 2.4 }) : D.line(x - 26, y + 13, x + back, y + 13, { width: 2.4 }) + D.line(x - 26, y + gh - 13, x + back, y + gh - 13, { width: 2.4 }));
  const out = (x, y, bubble) => (bubble ? D.circle(x + gw + 5, y + gh / 2, 5, { fill: "#fff", width: 2.4 }) + D.line(x + gw + 10, y + gh / 2, x + gw + 34, y + gh / 2, { width: 2.4 }) : D.line(x + gw, y + gh / 2, x + gw + 34, y + gh / 2, { width: 2.4 }));
  const andS = (x, y) => D.path_(`M${x},${y} L${x + 30},${y} A${gh / 2},${gh / 2} 0 0 1 ${x + 30},${y + gh} L${x},${y + gh} Z`, { fill: C.fillBlue, width: 2.4 });
  const orS = (x, y) => D.path_(`M${x},${y} Q${x + 40},${y} ${x + gw},${y + gh / 2} Q${x + 40},${y + gh} ${x},${y + gh} Q${x + 16},${y + gh / 2} ${x},${y} Z`, { fill: C.fillBlue, width: 2.4 });
  const notS = (x, y) => D.polyline([[x, y], [x, y + gh], [x + gw - 8, y + gh / 2]], { fill: C.fillBlue, close: true, width: 2.4 });
  const cell = (x, y, name, shape, n, bubble, back = 0, bw = gw) => inputs(x, y, n, back) + shape(x, y) + (bubble && name === "NOT" ? D.circle(x + gw - 3, y + gh / 2, 5, { fill: "#fff", width: 2.4 }) + D.line(x + gw + 2, y + gh / 2, x + gw + 34, y + gh / 2, { width: 2.4 }) : name === "NOT" ? "" : out(x, y, bubble)) + M(x + 32, y + gh + 26, name, { weight: 700 });
  const andOut = (x, y, bubble) => bubble ? D.circle(x + 30 + gh / 2 + 5, y + gh / 2, 5, { fill: "#fff", width: 2.4 }) + D.line(x + 30 + gh / 2 + 10, y + gh / 2, x + gw + 34, y + gh / 2, { width: 2.4 }) : D.line(x + 30 + gh / 2, y + gh / 2, x + gw + 34, y + gh / 2, { width: 2.4 });
  const g = (x, y, name) => {
    const bubble = ["NAND", "NOR", "NOT"].includes(name);
    const shape = name === "NOT" ? notS : name.includes("AND") ? andS : orS;
    const n = name === "NOT" ? 1 : 2;
    let s = inputs(x, y, n, name.includes("OR") ? 6 : 0) + shape(x, y);
    if (name === "NOT") s += D.circle(x + gw - 3, y + gh / 2, 5, { fill: "#fff", width: 2.4 }) + D.line(x + gw + 2, y + gh / 2, x + gw + 34, y + gh / 2, { width: 2.4 });
    else if (name.includes("AND")) s += andOut(x, y, bubble);
    else s += out(x, y, bubble);
    return s + M(x + 40, y + gh + 26, name, { weight: 700 });
  };
  const b = g(50, 30, "NOT") + g(250, 30, "AND") + g(450, 30, "OR") + g(150, 150, "NAND") + g(350, 150, "NOR");
  const alt = "Symbols of the five logic gates: NOT is a triangle with a small circle; AND is a D shape; OR is a curved shield shape; NAND is an AND symbol with a small circle on its output; NOR is an OR symbol with a small circle on its output.";
  await put("logic-gate-symbols", 600, 250, b, alt, "Figure: the five logic gate symbols", "electronics/logic-gates", "The symbols below are the shapes used in most textbooks and exam papers.");
}

// ---- CRO trace: Y-gain 2 V/div, time-base 5 ms/div, peaks 3.0 div, one wave = 4.0 div
{
  const dv = 34, divs = 8, x0 = 30, y0 = 30, gain = 2, tb = 5, pk = 3.0, per = 4.0;
  const cy = y0 + (divs * dv) / 2;
  let b = D.rect(x0, y0, divs * dv, divs * dv, { fill: "#fff", width: 2.4 });
  for (let i = 1; i < divs; i += 1) b += D.line(x0 + i * dv, y0, x0 + i * dv, y0 + divs * dv, { stroke: C.grid, width: 1 }) + D.line(x0, y0 + i * dv, x0 + divs * dv, y0 + i * dv, { stroke: i === divs / 2 ? C.muted : C.grid, width: 1 });
  let d = "";
  for (let i = 0; i <= 400; i += 1) { const u = (i / 400) * divs; d += `${i ? "L" : "M"}${x0 + u * dv},${cy - pk * dv * Math.sin((2 * Math.PI * u) / per)} `; }
  b += D.path_(d, { stroke: C.blue, width: 2.8 });
  const pxk = x0 + (per / 4) * dv; // first peak at 1 div
  b += D.line(pxk + 8, cy, pxk + 8, cy - pk * dv, { stroke: C.red, width: 1.8, arrow: true, arrowStart: true }) + T(pxk + 14, cy - 72, `${pk.toFixed(1)} div`, { fill: C.red, weight: 700 });
  const yy = y0 + divs * dv + 22;
  b += D.line(pxk, yy - 12, pxk + per * dv, yy - 12, { stroke: C.amber, width: 1.8, arrow: true, arrowStart: true }) + M(pxk + (per * dv) / 2, yy + 8, `${per.toFixed(1)} div = one wave`, { fill: C.amber, weight: 700 });
  const tx = x0 + divs * dv + 30;
  b += T(tx, 60, `Y-gain ${gain} V/div`, { weight: 700 }) + T(tx, 82, `time-base ${tb} ms/div`, { weight: 700 });
  b += T(tx, 124, `peak p.d. = ${pk} × ${gain} = ${pk * gain} V`, {}) + T(tx, 150, `period = ${per} × ${tb} = ${per * tb} ms`, {}) + T(tx, 176, `frequency = 1 ÷ ${per * tb / 1000}`, {}) + T(tx, 200, `= ${1000 / (per * tb)} Hz`, { weight: 700, fill: C.blue });
  const alt = "Oscilloscope screen: with the Y-gain at 2 V per division and the time-base at 5 ms per division, the peaks are 3.0 divisions above the centre line, so the peak p.d. is 6.0 V; one wave spans 4.0 divisions, so the period is 20 ms and the frequency is 50 Hz.";
  await put("cro-trace-50hz", 600, 340, b, alt, "Figure: reading an oscilloscope trace, peak 6.0 V, frequency 50 Hz", "electronics/thermionic-emission", "## The cathode-ray oscilloscope (CRO)");
}

// ---- electron beam deflected towards the positive plate
{
  const y0 = 140, px0 = 190, px1 = 330, a = 0.0014, sx = 500;
  const yAt = (x) => y0 - a * (x - px0) ** 2;
  const slope = 2 * a * (px1 - px0);
  let d = `M40,${y0} L${px0},${y0} `;
  for (let x = px0; x <= px1; x += 5) d += `L${x},${yAt(x)} `;
  const ye = yAt(px1), ys = ye - slope * (sx - px1);
  let b = D.rect(px0, y0 - 62, px1 - px0, 10, { fill: C.fillAmber, width: 2 }) + D.rect(px0, y0 + 52, px1 - px0, 10, { fill: C.fillGrey, width: 2 }) + M((px0 + px1) / 2, y0 - 70, "+ plate", { weight: 700, fill: C.red }) + M((px0 + px1) / 2, y0 + 84, "− plate", { weight: 700 });
  for (const x of [px0 + 30, (px0 + px1) / 2, px1 - 30]) b += D.arrow(x, y0 - 44, x, y0 + 40, { stroke: C.muted, width: 1.6 });
  b += D.path_(d + `L${sx},${ys}`, { stroke: C.blue, width: 3 });
  b += D.rect(sx, 40, 10, 200, { fill: C.fillGreen, width: 2 }) + T(sx - 70, 258, "screen", { weight: 700 }) + D.circle(sx + 5, ys, 5, { fill: C.green, stroke: C.green });
  b += T(20, 170, "electron gun", { size: 13 }) + T(48, y0 - 12, "electron beam", { size: 13, fill: C.blue, weight: 700 }) + D.rect(10, y0 - 16, 24, 32, { fill: C.fillGrey, width: 1.6, r: 3 });
  b += T(20, y0 + 142, "field lines point from + to −; electrons are pushed the other way", { size: 13, fill: C.muted });
  const alt = "Electron beam between two horizontal plates, the top one positive: the negatively charged electrons curve upwards towards the positive plate along a parabola, then travel in a straight line to hit the screen higher up. The electric field points from the positive plate to the negative plate.";
  await put("electron-beam-deflection", 560, 300, b, alt, "Figure: an electron beam bends towards the positive plate", "electronics/thermionic-emission", "### By an electric field");
}
console.log("done p2-waves-electronics");
