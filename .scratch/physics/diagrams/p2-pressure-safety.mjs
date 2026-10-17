// Second diagram pass: barometer, manometer, hydraulic jack, three-pin plug.
// Run from repo root: node .scratch/physics/diagrams/p2-pressure-safety.mjs   (lessons are hand-written Markdown)
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", LR = `content/subjects/${F}/lessons`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${LR}/${lesson}.md`, anchor, D.md(name, alt, cap));
};

// ---- mercury barometer: 760 mm column at sea level (0.25 px per mm); p = rho g h
{
  const k = 0.25, h = 760, rho = 13600, g = 9.8;
  const pa = Math.round((rho * g * (h / 1000)) / 1000) * 1000; // 101 000 Pa
  const tx = 150, tw = 34, top = 40, vac = 34, hg = top + vac, lvl = hg + h * k; // 74 .. 264
  let b = D.rect(70, lvl - 6, 200, 60, { fill: "#fff", width: 2.4 }) + D.rect(71, lvl, 198, 53, { fill: C.fillGrey, stroke: "none" });
  b += D.rect(tx, hg, tw, lvl - hg + 36, { fill: C.fillGrey, stroke: "none" });
  b += D.line(tx, top, tx, lvl + 36, { width: 2.4 }) + D.line(tx + tw, top, tx + tw, lvl + 36, { width: 2.4 }) + D.line(tx, top, tx + tw, top, { width: 2.4 });
  b += D.line(70, lvl, 270, lvl, { stroke: C.axis, width: 1.4, dash: true });
  b += T(tx - 8, top + 24, "vacuum", { size: 13, anchor: "end" }) + T(tx - 8, lvl - 120, "mercury", { size: 13, anchor: "end" });
  b += D.line(tx + tw + 24, hg, tx + tw + 24, lvl, { stroke: C.blue, width: 2, arrow: true, arrowStart: true }) + T(tx + tw + 34, (hg + lvl) / 2 + 5, `${h} mm`, { weight: 700, fill: C.blue });
  b += D.line(tx + tw + 10, hg, tx + tw + 30, hg, { stroke: C.blue, width: 1.2 }) + D.line(tx + tw + 10, lvl, tx + tw + 30, lvl, { stroke: C.blue, width: 1.2 });
  b += D.arrow(100, lvl - 52, 100, lvl - 8, { stroke: C.red, width: 3 }) + D.arrow(240, lvl - 52, 240, lvl - 8, { stroke: C.red, width: 3 }) + M(170, lvl + 78, "the atmosphere pushes on the mercury in the dish", { size: 13 });
  b += T(330, 120, "At sea level:", { weight: 700 }) + T(330, 148, "p = ρ g h", { weight: 700 }) + T(330, 172, `= ${rho.toLocaleString("en-GB")} × ${g} × ${h / 1000}`, {}) + T(330, 196, `≈ ${pa.toLocaleString("en-GB")} Pa`, { weight: 700, fill: C.blue }) + T(330, 224, "(about 1.0 × 10⁵ Pa)", { size: 13, fill: C.muted });
  const alt = "Mercury barometer: the atmosphere pushing on the mercury in the dish holds up a column 760 mm high above a vacuum, so the atmospheric pressure is 13 600 times 9.8 times 0.76, about 101 000 Pa.";
  await put("barometer-mercury-760", 560, 360, b, alt, "Figure: a mercury barometer, column 760 mm high at sea level", "forces/atmospheric-pressure", "A long glass tube is filled with mercury");
}

// ---- manometer: water level on the open side is 12 cm higher than on the gas side (4 px per cm)
{
  const k = 4, hcm = 12, rho = 1000, g = 9.8;
  const p = rho * g * (hcm / 100);
  const xl = 130, xr = 230, w = 30, ybot = 270, ytop = 40;
  const lg = 160, lo = lg - hcm * k; // gas-side level (lower), open-side level (higher)
  let b = "";
  const cl = xl + 15, cr = xr + 15, pth = (y1, y2) => `M${cl},${y1} L${cl},${ybot - 45} Q${cl},${ybot - 15} ${cl + 30},${ybot - 15} L${cr - 30},${ybot - 15} Q${cr},${ybot - 15} ${cr},${ybot - 45} L${cr},${y2}`;
  const bp = (d, c, wd) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${wd}" stroke-linecap="butt" stroke-linejoin="round"/>`;
  b += bp(pth(ytop, ytop), C.ink, 34) + bp(pth(ytop, ytop), "#fff", 28) + bp(pth(lg, lo), C.fillBlue, 28);
  b += D.line(xl, lg, xl + w, lg, { stroke: C.blue, width: 2 }) + D.line(xr, lo, xr + w, lo, { stroke: C.blue, width: 2 });
  b += D.line(xl + w + 2, lg, xr + w + 40, lg, { stroke: C.muted, width: 1.4, dash: true });
  b += D.line(xr + w + 30, lo, xr + w + 30, lg, { stroke: C.red, width: 2, arrow: true, arrowStart: true }) + T(xr + w + 40, (lo + lg) / 2 + 5, `h = ${hcm} cm`, { weight: 700, fill: C.red });
  b += D.rect(xl - 60, ytop - 34, w + 80, 34, { fill: C.fillAmber, r: 4 }) + M(xl + w / 2 - 10, ytop - 12, "gas supply", { size: 13 });
  b += M(xr + w / 2, ytop - 8, "open to air", { size: 13 }) + M(xl + w + 50, lg + 40, "water", { size: 13 });
  b += T(400, 120, "excess pressure", { weight: 700 }) + T(400, 142, "= ρ g h", { weight: 700 }) + T(400, 166, `= ${rho} × ${g} × 0.12`, {}) + T(400, 190, `= ${Math.round(p)} Pa`, { weight: 700, fill: C.blue }) + T(400, 214, "above atmospheric", { size: 13, fill: C.muted });
  const alt = "Water manometer: the gas pushes the water down on its side so the water on the open side stands 12 cm higher; the gas pressure is above atmospheric pressure by 1000 times 9.8 times 0.12, which is 1176 Pa.";
  await put("manometer-12cm", 560, 310, b, alt, "Figure: a water manometer, level difference 12 cm, excess pressure 1176 Pa", "forces/atmospheric-pressure", "One side of a U-tube containing water");
}

// ---- hydraulic jack: 50 N on 4.0 cm2 -> 12.5 N/cm2 -> 2500 N on 200 cm2 (not to scale)
{
  const F1 = 50, A1 = 4.0, A2 = 200, p = F1 / A1, F2 = p * A2;
  let b = D.rect(60, 190, 400, 50, { fill: C.fillBlue, width: 2.4 }) + D.rect(100, 140, 40, 50, { fill: C.fillBlue, stroke: "none" }) + D.rect(340, 100, 100, 90, { fill: C.fillBlue, stroke: "none" });
  b += D.path_("M100,190 L100,100 M140,190 L140,100", { width: 2.4 }) + D.path_("M340,190 L340,60 M440,190 L440,60", { width: 2.4 });
  b += D.rect(96, 100, 48, 10, { fill: C.fillGrey }) + D.rect(336, 60, 108, 14, { fill: C.fillGrey }) ;
  b += D.arrow(120, 40, 120, 95, { stroke: C.red, width: 3 }) + T(60, 28, `effort ${F1} N`, { weight: 700, fill: C.red });
  b += D.arrow(390, 56, 390, 6, { stroke: C.red, width: 3 }) + T(412, 24, `lifts ${F2} N`, { weight: 700, fill: C.red });
  b += T(92, 175, `A = ${A1.toFixed(1)} cm²`, { size: 13, anchor: "end" }) + M(390, 135, `A = ${A2} cm²`, { size: 14 });
  b += M(260, 222, "liquid: pressure is the same everywhere", { size: 13 });
  b += T(60, 272, `pressure = ${F1} ÷ ${A1.toFixed(1)} = ${p} N/cm²`, { weight: 700 }) + T(60, 296, `force on large piston = ${p} × ${A2} = ${F2} N`, { weight: 700, fill: C.blue }) + T(300, 272, "(not to scale)", { size: 13, fill: C.muted });
  const alt = "Hydraulic jack: 50 N on a small piston of area 4.0 cm squared gives a pressure of 12.5 N per cm squared in the liquid; the same pressure on a large piston of area 200 cm squared gives a force of 2500 N.";
  await put("hydraulic-jack-2500n", 560, 315, b, alt, "Figure: a hydraulic jack, 50 N effort lifts 2500 N", "forces/atmospheric-pressure", "Pressure applied to an enclosed liquid");
}

// ---- three-pin plug, back removed: earth at the top, brown live (with fuse) on the right, blue neutral on the left
{
  const bx = 170, by = 30, bw = 200, bh = 300;
  let b = D.rect(bx, by, bw, bh, { fill: C.fillGrey, r: 22, width: 3 });
  const cx = bx + bw / 2;
  // terminals
  const E = [cx, by + 60], N = [bx + 55, by + 190], L = [bx + bw - 55, by + 190];
  const term = (p, s) => D.rect(p[0] - 18, p[1] - 14, 36, 28, { fill: "#fff", r: 4 }) + D.dot(p[0], p[1], { r: 5 });
  b += term(E) + term(N) + term(L);
  // fuse beside the live terminal
  b += D.rect(L[0] - 22, L[1] - 62, 44, 48, { fill: C.fillAmber, r: 6, stroke: C.amber, width: 2.4 }) + M(L[0], L[1] - 33, "fuse", { size: 13, weight: 700 });
  // cable grip and cable
  const gy = by + bh - 40;
  b += D.rect(cx - 50, gy, 100, 22, { fill: "#fff", r: 4, width: 2.4 }) + D.line(cx, gy + 22, cx, by + bh + 40, { width: 10, stroke: C.axis });
  // cores
  b += D.path_(`M${cx},${gy} L${cx},${E[1] + 14}`, { stroke: C.green, width: 5 }) + D.path_(`M${cx},${gy} L${cx},${E[1] + 14}`, { stroke: "#e4c500", width: 2, dash: "7 7" });
  b += D.path_(`M${cx - 6},${gy} L${cx - 6},${N[1] + 40} L${N[0]},${N[1] + 40} L${N[0]},${N[1] + 14}`, { stroke: C.blue, width: 5 });
  b += D.path_(`M${cx + 6},${gy} L${cx + 6},${L[1] + 40} L${L[0]},${L[1] + 40} L${L[0]},${L[1] + 14}`, { stroke: "#7a4a1a", width: 5 });
  const lx = bx + bw + 20;
  b += T(lx, E[1] + 5, "earth: green and yellow,", {}) + T(lx, E[1] + 24, "to the top terminal", {}) + D.line(lx - 6, E[1], E[0] + 20, E[1], { stroke: C.muted, width: 1.2 });
  b += T(lx, L[1] - 66, "live: brown, right-hand", {}) + T(lx, L[1] - 47, "terminal, through the fuse", {}) + D.line(lx - 6, L[1] - 40, L[0] + 24, L[1] - 40, { stroke: C.muted, width: 1.2 });
  b += T(bx - 12, N[1] - 36, "neutral: blue,", { anchor: "end" }) + T(bx - 12, N[1] - 17, "left-hand terminal", { anchor: "end" }) + D.line(bx - 8, N[1] - 22, N[0] - 20, N[1] - 8, { stroke: C.muted, width: 1.2 });
  b += T(lx, gy + 38, "cable grip clamps the sheath", {}) + D.line(lx - 6, gy + 34, cx + 50, gy + 12, { stroke: C.muted, width: 1.2 });
  const alt = "Back of a wired three-pin plug: the green and yellow earth wire goes to the top terminal, the brown live wire goes to the right-hand terminal through the fuse, the blue neutral wire goes to the left-hand terminal, and the cable grip clamps the outer sheath.";
  await put("three-pin-plug-wiring", 640, 400, b, alt, "Figure: wiring a three-pin plug, earth at the top, fuse in the live line", "electricity/mains-safety", "With the back of the plug removed");
}
console.log("done p2-pressure-safety");
