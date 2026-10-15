// chemistry-a bonding: VSEPR shapes, hydrogen bonding. Run: node .scratch/chemistry-a/diagrams/bonding.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, atom, wedge, hash, pol, lone, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);
const R = 52; // bond length in px

// ---- VSEPR shapes (six panels), angles from the lesson table
{
  const w = 600, h = 430, pw = 200, ph = 215;
  const panel = (i, title, sub, build) => {
    const cx = (i % 3) * pw + pw / 2, cy = Math.floor(i / 3) * ph + 112;
    return D.text(cx, Math.floor(i / 3) * ph + 22, title, { anchor: "middle", size: 15, weight: 700 }) + build(cx, cy) + D.text(cx, cy + 80, sub, { anchor: "middle", size: 13, fill: C.muted });
  };
  const bond = (cx, cy, a, len, label, kind = "plain", double = false) => {
    const [x, y] = pol(cx, cy, len, a);
    const [sx, sy] = pol(cx, cy, 14, a), [ex, ey] = pol(cx, cy, len - 14, a);
    let s = "";
    if (kind === "wedge") s = wedge(sx, sy, ex, ey, 8);
    else if (kind === "hash") s = hash(sx, sy, ex, ey, 8);
    else if (double) { const nx = Math.sin((a * Math.PI) / 180) * 3, ny = Math.cos((a * Math.PI) / 180) * 3; s = D.line(sx + nx, sy + ny, ex + nx, ey + ny) + D.line(sx - nx, sy - ny, ex - nx, ey - ny); }
    else s = D.line(sx, sy, ex, ey);
    return s + atom(x, y, label);
  };
  const ang = (x, y, s, o = {}) => D.text(x, y, s, { size: 13, fill: C.amber, weight: 700, ...o });
  const body =
    panel(0, "CO₂: linear", "2 bonding regions", (cx, cy) => bond(cx, cy, 0, 62, "O", "plain", true) + bond(cx, cy, 180, 62, "O", "plain", true) + atom(cx, cy, "C") + ang(cx, cy - 26, "180°", { anchor: "middle" })) +
    panel(1, "BF₃: trigonal planar", "3 bonding pairs", (cx, cy) => bond(cx, cy, 90, R, "F") + bond(cx, cy, 210, R, "F") + bond(cx, cy, 330, R, "F") + atom(cx, cy, "B") + ang(cx, cy + 46, "120°", { anchor: "middle" })) +
    panel(2, "CH₄: tetrahedral", "4 bonding pairs", (cx, cy) => bond(cx, cy, 90, R, "H") + bond(cx, cy, 235, R, "H") + bond(cx, cy, 330, R, "H", "wedge") + bond(cx, cy, 165, R, "H", "hash") + atom(cx, cy, "C") + ang(cx + 24, cy - 24, "109.5°")) +
    panel(3, "NH₃: pyramidal", "3 bonding pairs + 1 lone pair", (cx, cy) => bond(cx, cy, 215, R, "H") + bond(cx, cy, 325, R, "H") + bond(cx, cy, 270, R, "H", "wedge") + lone(cx, cy, 30, 90) + atom(cx, cy, "N") + ang(cx + 24, cy + 4, "107°")) +
    panel(4, "H₂O: bent", "2 bonding pairs + 2 lone pairs", (cx, cy) => bond(cx, cy, 270 - 52.25, R, "H") + bond(cx, cy, 270 + 52.25, R, "H") + lone(cx, cy, 30, 125) + lone(cx, cy, 30, 55) + atom(cx, cy, "O") + ang(cx, cy + 60, "104.5°", { anchor: "middle" })) +
    panel(5, "SF₆: octahedral", "6 bonding pairs", (cx, cy) => bond(cx, cy, 90, R, "F") + bond(cx, cy, 270, R, "F") + bond(cx, cy, 0, R + 4, "F") + bond(cx, cy, 180, R + 4, "F") + bond(cx, cy, 325, R - 8, "F", "wedge") + bond(cx, cy, 145, R - 8, "F", "hash") + atom(cx, cy, "S") + ang(cx + 20, cy - 22, "90°"));
  const alt = "Six molecule shapes with bond angles: CO2 linear 180 degrees; BF3 trigonal planar 120 degrees; CH4 tetrahedral 109.5 degrees; NH3 pyramidal 107 degrees with one lone pair on top; H2O bent 104.5 degrees with two lone pairs; SF6 octahedral 90 degrees. Wedges come towards the viewer and hashed lines go away.";
  const cap = "Figure: shapes and bond angles from VSEPR; lone pairs are pairs of dots, which squeeze the bond angle";
  await D.figure(F, "vsepr-shapes-six", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("bonding/shapes-vsepr"), "Notice how methane, ammonia and water all have four pairs", D.md("vsepr-shapes-six", alt, cap));
}

// ---- hydride boiling points (values from the lesson table; Group 16 standard data)
{
  const g = [
    [14, C.muted, [[2, -162], [3, -112], [4, -88]], ["CH₄", "SiH₄", "GeH₄"]],
    [15, C.blue, [[2, -33], [3, -88], [4, -62]], ["NH₃", "PH₃", "AsH₃"]],
    [16, C.red, [[2, 100], [3, -60], [4, -41]], ["H₂O", "H₂S", "H₂Se"]],
    [17, C.amber, [[2, 20], [3, -85], [4, -67]], ["HF", "HCl", "HBr"]],
  ];
  const ax = D.axes({ x: [1.6, 4.5], y: [-180, 120], xTicks: [2, 3, 4], yTicks: 50, xLabel: "Period of the element bonded to H", yLabel: "Boiling point / °C", w: 600, h: 420, pad: { l: 64, r: 24, t: 34, b: 62 }, origin: false });
  let body = ax.frame;
  for (const [, col, pts, nm] of g) {
    body += ax.line(pts, { stroke: col, width: 2.6 }) + pts.map(([a, b]) => ax.point(a, b, { stroke: col, r: 5 })).join("");
    pts.forEach(([a, b], i) => { body += D.text(ax.X(a) + 9, ax.Y(b) + 4 + ({ HCl: -9, "PH₃": 10, "SiH₄": 16, "AsH₃": -6, HBr: 12, "H₂S": -8 }[nm[i]] ?? 0), nm[i], { size: 12, fill: col, weight: 700 }); });
  }
  body += ax.tag(4.5, 105, "Group 16 (H₂O, H₂S, H₂Se)", { size: 13, fill: C.red, anchor: "end" }) + ax.tag(4.5, 78, "Group 17 (HF, HCl, HBr)", { size: 13, fill: C.amber, anchor: "end" }) + ax.tag(4.5, 51, "Group 15 (NH₃, PH₃, AsH₃)", { size: 13, fill: C.blue, anchor: "end" }) + ax.tag(4.5, 24, "Group 14 (CH₄, SiH₄, GeH₄)", { size: 13, fill: C.muted, anchor: "end" });
  const alt = "Boiling points in degrees Celsius of the hydrides of Groups 14 to 17 for periods 2 to 4: Group 14 rises steadily CH4 −162, SiH4 −112, GeH4 −88; but in Groups 15, 16 and 17 the period-2 hydrides NH3 (−33), H2O (100) and HF (20) are far higher than the next member, because of hydrogen bonding.";
  const cap = "Figure: boiling points of hydrides; NH₃, H₂O and HF stand out because they form hydrogen bonds";
  await D.figure(F, "hydride-boiling-points", D.svg(600, 420, body), { alt, caption: cap });
  D.insertAfter(L("bonding/intermolecular-forces"), "In Group 14 the boiling point rises steadily", D.md("hydride-boiling-points", alt, cap));
}

// ---- hydrogen bonds between water molecules
{
  const w = 600, h = 400;
  const mol = (cx, cy, rot) => {
    const a1 = rot - 52.25, a2 = rot + 52.25;
    const [h1x, h1y] = pol(cx, cy, 46, a1), [h2x, h2y] = pol(cx, cy, 46, a2);
    return { o: [cx, cy], h1: [h1x, h1y], h2: [h2x, h2y], draw: D.line(cx, cy, h1x, h1y) + D.line(cx, cy, h2x, h2y) + atom(h1x, h1y, "H", { r: 11, size: 13 }) + atom(h2x, h2y, "H", { r: 11, size: 13 }) + atom(cx, cy, "O", { r: 14 }) };
  };
  const toward = (from, to, d) => { const dx = to[0] - from[0], dy = to[1] - from[1], l = Math.hypot(dx, dy); return [from[0] + (dx / l) * (l - d), from[1] + (dy / l) * (l - d)]; };
  const dash = (a, b, gapA = 13, gapB = 13) => { const p1 = toward(b, a, gapA), p2 = toward(a, b, gapB); return D.line(p1[0], p1[1], p2[0], p2[1], { stroke: C.red, width: 2.4, dash: "4 5" }); };
  const O = [300, 175];
  const C0 = mol(O[0], O[1], 270);
  const UL = mol(130, 70, -80.25), UR = mol(470, 70, 260.25), LL1 = mol(170, 300, 270), LR = mol(430, 300, 270);
  let body = C0.draw + UL.draw + UR.draw + LL1.draw + LR.draw;
  body += lone(O[0], O[1], 28, 125) + lone(O[0], O[1], 28, 55);
  body += dash(UL.h2, [O[0] - 18, O[1] - 24], 13, 4) + dash(UR.h1, [O[0] + 18, O[1] - 24], 13, 4);
  body += dash(C0.h1, LL1.o, 13, 15) + dash(C0.h2, LR.o, 13, 15);
  body += D.text(C0.h1[0] - 22, C0.h1[1] + 4, "δ+", { size: 13, fill: C.red, anchor: "end", weight: 700 }) + D.text(O[0] + 24, O[1] + 4, "δ−", { size: 13, fill: C.red, weight: 700 });
  body += D.text(300, 386, "dashed lines: hydrogen bonds (H on O, δ+, to a lone pair on another O, δ−)", { size: 13, anchor: "middle", fill: C.red });
  body += D.text(10, 22, "The central molecule forms four hydrogen bonds:", { size: 13, fill: C.muted }) + D.text(10, 40, "two through its H atoms, two through its lone pairs", { size: 13, fill: C.muted });
  const alt = "Hydrogen bonding in water: the central water molecule forms four hydrogen bonds, two from its partially positive hydrogen atoms to the oxygen of molecules below, and two from the hydrogen atoms of molecules above to the lone pairs on its own oxygen.";
  const cap = "Figure: hydrogen bonds (dashed) between water molecules; each molecule can form up to four";
  await D.figure(F, "hydrogen-bonds-water", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("bonding/intermolecular-forces"), "Each water molecule has two δ+ hydrogen atoms", D.md("hydrogen-bonds-water", alt, cap));
}
