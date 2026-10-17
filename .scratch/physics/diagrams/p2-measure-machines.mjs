// Second diagram pass: measuring instruments, density by displacement, machines.
// Run from repo root: node .scratch/physics/diagrams/p2-measure-machines.mjs   (lessons are hand-written Markdown)
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", LR = `content/subjects/${F}/lessons`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${LR}/${lesson}.md`, anchor, D.md(name, alt, cap));
};

// ---- Vernier callipers: main scale 41 mm + 6th vernier mark aligned = 41.6 mm = 4.16 cm (10 vernier divisions span 9 mm)
{
  const main = 41, vern = 6, mm = 44, ox = 40, X = (v) => ox + (v - 40) * mm;
  const reading = main + vern * 0.1; // 41.6 mm
  let b = T(ox, 30, "Main scale (cm)", { weight: 700 }) + D.rect(X(40) - 30, 60, 10 * mm + 90, 40, { fill: C.fillGrey, width: 1.6 });
  for (let m = 40; m <= 50; m += 1) {
    b += D.line(X(m), 100, X(m), m % 5 === 0 ? 78 : 88, { width: m % 5 === 0 ? 2 : 1.4 });
    if (m % 5 === 0) b += M(X(m), 72, (m / 10).toFixed(1), { size: 13 });
  }
  const v0 = X(reading);
  b += D.rect(v0 - 8, 100, 9 * mm + 24, 44, { fill: C.fillBlue, width: 1.6 });
  for (let i = 0; i <= 10; i += 1) {
    const x = v0 + i * 0.9 * mm;
    b += D.line(x, 100, x, i % 5 === 0 ? 124 : 114, { stroke: i === vern ? C.red : C.ink, width: i === vern ? 2.6 : 1.4 });
    b += M(x, 138, String(i), { size: 13, fill: i === vern ? C.red : C.ink, weight: i === vern ? 700 : 400 });
  }
  b += D.line(X(47), 64, X(47), 128, { stroke: C.red, width: 1.4, dash: true });
  b += T(ox, 172, "Vernier scale: the zero mark is just past 4.1 cm (41 mm)", {}) + D.arrow(v0, 168 - 20, v0, 146, { stroke: C.blue, width: 1.8 });
  b += T(ox, 196, "The 6th Vernier mark lines up with a main-scale mark (red)", { fill: C.red });
  b += T(ox, 228, "length = 4.1 cm + 6 × 0.01 cm = 4.16 cm", { weight: 700, size: 15 });
  const alt = "Vernier callipers: the Vernier zero is just past 4.1 cm on the main scale and the 6th Vernier mark lines up with a main-scale mark, so the length is 4.1 plus 0.06, which is 4.16 cm.";
  await put("vernier-reading-416", 600, 245, b, alt, "Figure: reading Vernier callipers, 4.16 cm", "measurement/length-volume-time", "A **Vernier calliper** has a main scale");
}

// ---- Micrometer: sleeve 3.5 mm + thimble 42 x 0.01 = 3.92 mm
{
  const sleeve = 3.5, thimble = 42, mm = 64, ox = 40, X = (v) => ox + v * mm, dy = 110;
  const total = sleeve + thimble * 0.01; // 3.92
  let b = D.rect(ox - 10, dy - 52, X(total) - ox + 10, 92, { fill: C.fillGrey, width: 1.6 }) + D.line(ox - 10, dy, X(total) + 120, dy, { width: 2 });
  for (let m = 0; m <= 3; m += 1) {
    b += D.line(X(m), dy, X(m), dy - 24, { width: 1.8 }) + M(X(m), dy - 30, String(m), { size: 13 });
  }
  for (let m = 0; m <= 3; m += 1) b += D.line(X(m + 0.5), dy, X(m + 0.5), dy + 18, { width: 1.8 });
  b += M(X(3.5), dy + 38, "3.5", { size: 13, weight: 700, fill: C.red });
  // thimble: left edge at X(total); divisions run up and down about the datum line
  const tx = X(total);
  b += D.rect(tx, dy - 56, 150, 112, { fill: C.fillBlue, width: 1.6 });
  for (let d = 38; d <= 46; d += 1) {
    const y = dy + (42 - d) * 11; // higher numbers are drawn above the datum line... lower numbers below
    const yy = dy - (d - 42) * 11;
    b += D.line(tx, yy, tx + (d % 2 === 0 ? 18 : 12), yy, { stroke: d === thimble ? C.red : C.ink, width: d === thimble ? 2.6 : 1.4 });
    if (d % 2 === 0) b += T(tx + 24, yy + 5, String(d), { size: 13, fill: d === thimble ? C.red : C.ink, weight: d === thimble ? 700 : 400 });
  }
  b += T(ox, 32, "Sleeve scale (mm)", { weight: 700 }) + T(tx + 4, 32, "Thimble", { weight: 700 });
  b += T(ox, 200, "Sleeve reading: 3.5 mm.  Thimble reading: 42 on the datum line = 0.42 mm", {});
  b += T(ox, 230, "diameter = 3.5 + 0.42 = 3.92 mm", { weight: 700, size: 15 });
  const alt = "Micrometer screw gauge: the sleeve shows 3.5 mm and the 42nd thimble division is on the datum line, each division being 0.01 mm, so the diameter is 3.5 plus 0.42, which is 3.92 mm.";
  await put("micrometer-reading-392", 600, 250, b, alt, "Figure: reading a micrometer screw gauge, 3.92 mm", "measurement/length-volume-time", "A **micrometer screw gauge** has a sleeve scale");
}

// ---- density of a stone by displacement: 50 cm3 -> 110 cm3, mass 156 g
{
  const m = 156, v1 = 50, v2 = 110, k = 2, base = 290, cw = 76;
  const cyl = (x, level, withStone) => {
    let s = D.rect(x, base - 130 * k, cw, 130 * k, { fill: "#fff", width: 2.4 }) + D.rect(x + 1, base - level * k, cw - 2, level * k - 1, { fill: C.fillBlue, stroke: "none" });
    for (let v = 0; v <= 120; v += 10) {
      s += D.line(x + cw, base - v * k, x + cw - (v % 50 === 0 ? 18 : 10), base - v * k, { width: 1.2 });
      if (v % 20 === 0 || v === 50 || v === 110) { /* labelled below */ }
    }
    for (const v of [0, 20, 40, 60, 80, 100, 120]) s += T(x + cw + 6, base - v * k + 5, String(v), { size: 13, fill: C.muted });
    if (withStone) {
      s += D.polyline([[x + 22, base - 2], [x + 30, base - 26], [x + 52, base - 30], [x + 62, base - 8], [x + 50, base - 1]], { fill: C.fillGrey, close: true, width: 2 }) + D.line(x + 38, base - 28, x + 38, base - 130 * k - 14, { stroke: C.muted, width: 1.4 });
    }
    return s;
  };
  const x1 = 90, x2 = 330;
  let b = cyl(x1, v1, false) + cyl(x2, v2, true);
  b += D.line(x1 - 6, base - v1 * k, x1 + cw, base - v1 * k, { stroke: C.red, width: 1.6, dash: true }) + T(x1 - 10, base - v1 * k + 5, "50 cm³", { fill: C.red, weight: 700, anchor: "end" });
  b += D.line(x2 - 6, base - v2 * k, x2 + cw, base - v2 * k, { stroke: C.red, width: 1.6, dash: true }) + T(x2 - 10, base - v2 * k + 5, "110 cm³", { fill: C.red, weight: 700, anchor: "end" });
  b += M(x1 + cw / 2, base + 24, "water only", {}) + M(x2 + cw / 2, base + 24, "stone lowered in", {});
  b += T(450, 120, "mass of stone = 156 g", { weight: 700 }) + T(450, 150, "volume = 110 − 50 = 60 cm³", { weight: 700 }) + T(450, 180, "density = 156 ÷ 60", { weight: 700 }) + T(450, 204, "= 2.6 g/cm³", { weight: 700, fill: C.blue });
  const alt = "Density by displacement: water in a measuring cylinder reads 50 cm³; with the 156 g stone lowered in on a thread it reads 110 cm³. The volume of the stone is 110 minus 50, which is 60 cm³, so its density is 156 divided by 60, which is 2.6 g/cm³.";
  await put("density-displacement-stone", 660, 330, b, alt, "Figure: finding the volume of an irregular stone by displacement", "measurement/density", "### An irregular solid that sinks");
}

// ---- pulley system, 4 supporting strands; load 1000 N, effort 320 N
{
  const R = 25, ux1 = 255, ux2 = 355, lx1 = 205, lx2 = 305, uy = 92, ly = 232, ex = 380;
  const load = 1000, effort = 320, strands = 4, ma = load / effort, eff = Math.round((ma / strands) * 100);
  let b = D.line(150, 22, 400, 22, { width: 3 });
  for (let x = 156; x < 400; x += 14) b += D.line(x, 22, x - 8, 12, { width: 1.2, stroke: C.muted });
  b += D.line(ux1, 22, ux1, 44, { width: 2 }) + D.line(ux2, 22, ux2, 44, { width: 2 }) + D.rect(170, 44, 200, 8, { fill: C.fillGrey });
  b += D.line(ux1, 52, ux1, uy, { width: 2 }) + D.line(ux2, 52, ux2, uy, { width: 2 });
  b += D.circle(ux1, uy, R, { fill: "#fff" }) + D.circle(ux2, uy, R, { fill: "#fff" }) + D.circle(lx1, ly, R, { fill: "#fff" }) + D.circle(lx2, ly, R, { fill: "#fff" });
  for (const [x, y] of [[ux1, uy], [ux2, uy], [lx1, ly], [lx2, ly]]) b += D.dot(x, y, { r: 3 });
  // lower block frame and load
  b += D.line(lx1, ly, lx1, 268, { width: 2 }) + D.line(lx2, ly, lx2, 268, { width: 2 }) + D.rect(lx1 - 14, 268, lx2 - lx1 + 28, 8, { fill: C.fillGrey }) + D.line(255, 276, 255, 300, { width: 2 });
  b += D.rect(215, 300, 80, 36, { fill: C.fillAmber, r: 4 }) + M(255, 324, "load", { weight: 700 });
  b += D.arrow(255, 342, 255, 380, { stroke: C.red, width: 3 }) + T(268, 370, `${load} N`, { fill: C.red, weight: 700 });
  // rope: fixed at the upper block, down strand 1, under L1, up strand 2, over U1, down strand 3, under L2, up strand 4, over U2, effort strand
  const rope = `M${lx1 - R},52 L${lx1 - R},${ly} A${R},${R} 0 0 0 ${lx1 + R},${ly} L${lx1 + R},${uy} A${R},${R} 0 0 1 ${ux1 + R},${uy} L${ux1 + R},${ly} A${R},${R} 0 0 0 ${lx2 + R},${ly} L${lx2 + R},${uy} A${R},${R} 0 0 1 ${ux2 + R},${uy} L${ex},330`;
  b += D.path_(rope, { stroke: C.blue, width: 3 });
  [[lx1 - R, "1"], [lx1 + R, "2"], [ux1 + R, "3"], [lx2 + R, "4"]].forEach(([x, n]) => { b += T(x - 14, 172, n, { weight: 700, fill: C.blue }); });
  b += D.arrow(ex, 330, ex, 368, { stroke: C.red, width: 3 }) + T(ex + 18, 366, `effort ${effort} N`, { fill: C.red, weight: 700 });
  b += T(420, 92, `${strands} strands (1 to 4)`, { weight: 700 }) + T(420, 112, "support the lower block", {}) + T(420, 142, `VR = ${strands}`, { weight: 700 }) + T(420, 170, `MA = ${load} ÷ ${effort} = ${ma}`, { weight: 700 }) + T(420, 198, `efficiency = ${ma} ÷ ${strands}`, { weight: 700 }) + T(420, 218, `= ${eff}%`, { weight: 700, fill: C.blue });
  const alt = "Pulley system with four rope strands supporting the lower block, so the velocity ratio is 4: an effort of 320 N lifts a load of 1000 N, the mechanical advantage is 1000 divided by 320 which is 3.125, and the efficiency is 3.125 divided by 4, about 78 percent.";
  await put("pulley-four-strands", 600, 395, b, alt, "Figure: a four-strand pulley system, VR = 4, MA = 3.125, efficiency 78%", "machines/simple-machines", "In a single-string pulley system");
}

// ---- inclined plane: 600 N drum, plank 3.0 m long, 1.2 m high, effort 300 N
{
  const Ls = 3.0, h = 1.2, k = 100, Wd = 600, Fe = 300;
  const base = Math.sqrt(Ls * Ls - h * h);
  const ax = 50, ay = 200, bx = ax + base * k, cy = ay - h * k;
  const th = Math.asin(h / Ls), deg = (th * 180) / Math.PI;
  let b = D.polyline([[ax, ay], [bx, ay], [bx, cy]], { fill: C.fillGrey, close: true, width: 2.4 }) + D.rect(bx, cy - 4, 90, 8, { fill: C.fillAmber, width: 1.6 }) + D.rect(bx, cy + 4, 90, ay - cy - 4, { fill: C.fillGrey, width: 1.6 }) + M(bx + 45, cy + 50, "truck", { size: 13 });
  // drum at 45% of the way up the plank
  const s = 0.42, px = ax + s * (bx - ax), py = ay - s * (ay - cy);
  const nx = -Math.sin(th), ny = -Math.cos(th); // unit normal pointing away from the slope (up and left)
  const cxd = px + nx * 22, cyd = py + ny * 22;
  b += `<g transform="rotate(${-deg.toFixed(2)} ${cxd.toFixed(1)} ${cyd.toFixed(1)})">${D.rect(cxd - 30, cyd - 22, 60, 44, { fill: C.fillAmber, r: 4 })}</g>` + T(cxd - 6, cyd + 5, "drum", { weight: 700, size: 13, anchor: "end" });
  b += D.arrow(cxd, cyd, cxd, cyd + 50, { stroke: C.red, width: 3 }) + T(cxd + 8, cyd + 58, `weight ${Wd} N`, { fill: C.red, weight: 700 });
  const ux = Math.cos(th), uy2 = -Math.sin(th);
  b += D.arrow(cxd, cyd, cxd + ux * 90, cyd + uy2 * 90, { stroke: C.blue, width: 3 }) + T(cxd + ux * 96 - 10, cyd + uy2 * 96 - 8, `effort ${Fe} N`, { fill: C.blue, weight: 700 });
  b += D.line(bx + 112, ay, bx + 112, cy, { stroke: C.muted, width: 1.4, arrow: true, arrowStart: true }) + T(bx + 120, (ay + cy) / 2 + 5, `${h.toFixed(1)} m`, {});
  b += T(ax + 0.72 * (bx - ax) - 14, ay - 0.72 * (ay - cy) + 34, `${Ls.toFixed(1)} m`, { rotate: -deg, anchor: "middle" });
  b += T(ax, ay + 34, `VR = ${Ls.toFixed(1)} ÷ ${h.toFixed(1)} = ${(Ls / h).toFixed(1)}`, { weight: 700 }) + T(ax + 150, ay + 34, `MA = ${Wd} ÷ ${Fe} = ${(Wd / Fe).toFixed(1)}`, { weight: 700 }) + T(ax + 330, ay + 34, `efficiency = ${((Wd / Fe) / (Ls / h) * 100).toFixed(0)}%`, { weight: 700 });
  const alt = "Inclined plane: a 600 N drum is pushed up a 3.0 m plank to a truck bed 1.2 m high by a 300 N effort along the slope. VR is 3.0 divided by 1.2, which is 2.5; MA is 600 divided by 300, which is 2.0; the efficiency is 80 percent.";
  await put("inclined-plane-drum", 600, 250, b, alt, "Figure: loading a drum up a plank, VR = 2.5, MA = 2.0, efficiency 80%", "machines/simple-machines", "Pushing a load up a slope is easier");
}
console.log("done p2-measure-machines");
