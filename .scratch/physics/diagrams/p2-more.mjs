// Second diagram pass: Moon phases, beams, trusses, nuclear radiation, electric fields.
// Run from repo root: node .scratch/physics/diagrams/p2-more.mjs   (lessons are hand-written Markdown)
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", LR = `content/subjects/${F}/lessons`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const M = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, anchor: "middle", ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${LR}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const tri = (x, y, s = 20) => D.polyline([[x, y], [x - s, y + s * 1.3], [x + s, y + s * 1.3]], { fill: C.fillGrey, close: true });

// ---- phases of the Moon: Sunlight from the right, Moon orbits anticlockwise seen from above the North Pole
{
  const cx = 320, cy = 215, R = 120, r = 15;
  const phases = [["new moon", 0, "start"], ["waxing crescent", 45, "start"], ["first quarter", 90, "middle"], ["waxing gibbous", 135, "end"], ["full moon", 180, "end"], ["waning gibbous", 225, "end"], ["last quarter", 270, "middle"], ["waning crescent", 315, "start"]];
  let b = "";
  for (const y of [90, 140, 190, 240, 290, 340]) b += D.arrow(630, y, 590, y, { stroke: C.amber, width: 2.2 });
  b += T(540, 76, "sunlight", { fill: C.amber, weight: 700, anchor: "end" }) ;
  b += D.circle(cx, cy, R, { stroke: C.muted, dash: true, width: 1.4 });
  b += D.circle(cx, cy, 26, { fill: C.fillBlue, stroke: C.blue }) + M(cx, cy + 5, "Earth", { size: 13, weight: 700 });
  for (const [name, deg, anch] of phases) {
    const a = (deg * Math.PI) / 180, mx = cx + R * Math.cos(a), my = cy - R * Math.sin(a);
    b += D.circle(mx, my, r, { fill: "#6b6761", stroke: C.ink, width: 1.6 }) + D.path_(`M${mx},${my - r} A${r},${r} 0 0 1 ${mx},${my + r} Z`, { fill: C.fillAmber, stroke: C.ink, width: 1.4 });
    const lx = mx + (anch === "start" ? r + 8 : anch === "end" ? -r - 8 : 0), ly = my + (anch === "middle" ? (deg === 90 ? -r - 8 : r + 20) : 5);
    b += T(lx, ly, name, { anchor: anch, size: 14 });
  }
  b += M(cx, 420, "The lit half of the Moon always faces the Sun; we see more or less of it as the Moon orbits.", { size: 13, fill: C.muted });
  const alt = "Phases of the Moon: the Sun's light comes from the right and the half of the Moon facing the Sun is always lit. With the Moon between Earth and Sun (right) we see a new moon; a quarter of the way round, first quarter; opposite the Sun, full moon; then last quarter and back to new moon, about 29.5 days.";
  await put("moon-phases-orbit", 640, 440, b, alt, "Figure: the Moon's phases come from how much of its lit half we can see from Earth", "space/earth-moon", "## The phases of the Moon");
}

// ---- beam: tension on the bottom, compression on the top, and cross-sections
{
  const x0 = 60, x1 = 440, th = 18, sag = 22, y0 = 110;
  const yc = (x) => y0 + sag * Math.sin((Math.PI * (x - x0)) / (x1 - x0));
  const xs = []; for (let x = x0; x <= x1; x += 8) xs.push(x);
  const top = xs.map((x) => [x, yc(x) - th]), bot = xs.map((x) => [x, yc(x) + th]).reverse();
  let b = D.polyline([...top, ...bot], { fill: C.fillGrey, close: true, width: 2.4 });
  b += D.polyline(xs.map((x) => [x, yc(x)]), { stroke: C.muted, width: 1.4, dash: true });
  b += tri(x0 + 6, y0 + th + 2, 18) + tri(x1 - 6, y0 + th + 2, 18);
  b += D.arrow(250, 30, 250, yc(250) - th - 3, { stroke: C.red, width: 3 }) + T(262, 44, "load", { fill: C.red, weight: 700 });
  const yt = yc(250) - 9, yb = yc(250) + 9;
  b += D.arrow(176, yt, 226, yt, { stroke: C.blue, width: 2.6 }) + D.arrow(324, yt, 274, yt, { stroke: C.blue, width: 2.6 }) + D.arrow(226, yb, 176, yb, { stroke: C.amber, width: 2.6 }) + D.arrow(274, yb, 324, yb, { stroke: C.amber, width: 2.6 });
  b += T(458, 98, "top: compression", { weight: 700, fill: C.blue }) + T(458, 120, "bottom: tension", { weight: 700, fill: C.amber }) + T(344, yc(250) + 6, "", {});
  b += T(60, 190, "dashed line: neutral axis (no stretch or squash)", { size: 13, fill: C.muted });
  const sx = [70, 190, 310, 430, 540], sy = 250;
  b += M(sx[0], sy - 14, "flat plank", { size: 13 }) + D.rect(sx[0] - 36, sy, 72, 12, { fill: C.fillAmber, width: 2 }) + M(sx[0], sy + 40, "bends a lot", { size: 13, fill: C.muted });
  b += M(sx[1], sy - 14, "same plank on edge", { size: 13 }) + D.rect(sx[1] - 6, sy, 12, 72, { fill: C.fillAmber, width: 2 }) + M(sx[1], sy + 98, "bends much less", { size: 13, fill: C.muted });
  b += M(sx[2], sy - 14, "I-section", { size: 13 }) + D.polyline([[sx[2] - 30, sy], [sx[2] + 30, sy], [sx[2] + 30, sy + 10], [sx[2] + 4, sy + 10], [sx[2] + 4, sy + 62], [sx[2] + 30, sy + 62], [sx[2] + 30, sy + 72], [sx[2] - 30, sy + 72], [sx[2] - 30, sy + 62], [sx[2] - 4, sy + 62], [sx[2] - 4, sy + 10], [sx[2] - 30, sy + 10]], { fill: C.fillBlue, close: true, width: 2 }) + M(sx[2], sy + 98, "flanges + web", { size: 13, fill: C.muted });
  b += M(sx[3], sy - 14, "box section", { size: 13 }) + D.rect(sx[3] - 30, sy, 60, 72, { fill: C.fillBlue, width: 2 }) + D.rect(sx[3] - 22, sy + 8, 44, 56, { fill: "#fff", width: 2 }) + M(sx[3], sy + 98, "hollow", { size: 13, fill: C.muted });
  b += M(sx[4], sy - 14, "tube", { size: 13 }) + D.circle(sx[4], sy + 36, 34, { fill: C.fillBlue, width: 2 }) + D.circle(sx[4], sy + 36, 25, { fill: "#fff", width: 2 }) + M(sx[4], sy + 98, "hollow", { size: 13, fill: C.muted });
  const alt = "A beam loaded at the centre sags: the top layers are in compression and the bottom layers in tension, with a neutral axis between that is neither stretched nor squashed. Below are cross-sections: a plank on edge bends much less than flat, and I, box and tube sections put material where the stress is greatest.";
  await put("beam-stresses-sections", 600, 370, b, alt, "Figure: stresses inside a loaded beam, and common beam cross-sections", "structures/beams", "## What happens inside a loaded beam");
}

// ---- roof truss: struts in compression, tie beam in tension
{
  const ax = 70, bx = 470, by = 220, apx = 270, apy = 70;
  let b = tri(ax, by + 2, 16) + tri(bx, by + 2, 16);
  b += D.line(ax, by, apx, apy, { stroke: C.blue, width: 6 }) + D.line(bx, by, apx, apy, { stroke: C.blue, width: 6 }) + D.line(ax, by, bx, by, { stroke: C.amber, width: 6 });
  b += D.line(apx, apy, apx, by, { stroke: C.ink, width: 3 }) + D.line(apx, by, (ax + apx) / 2, (by + apy) / 2, { stroke: C.ink, width: 3 }) + D.line(apx, by, (bx + apx) / 2, (by + apy) / 2, { stroke: C.ink, width: 3 });
  for (const [x, y] of [[ax, by], [bx, by], [apx, apy], [apx, by], [(ax + apx) / 2, (by + apy) / 2], [(bx + apx) / 2, (by + apy) / 2]]) b += D.circle(x, y, 5, { fill: "#fff", width: 2 });
  b += D.arrow(apx, 20, apx, apy - 8, { stroke: C.red, width: 3 }) + T(apx + 10, 36, "weight of the roof", { fill: C.red, weight: 700 });
  b += T(16, 110, "rafters: struts", { weight: 700, fill: C.blue }) + T(16, 130, "(compression)", { fill: C.blue });
  b += M(apx, by + 44, "tie beam: in tension (pulled)", { weight: 700, fill: C.amber });
  b += M(apx, by + 68, "king post and braces split it into smaller triangles", { size: 13, fill: C.muted });
  b += T(apx - 50, by - 14, "", {});
  const alt = "Roof truss: the two sloping rafters are struts in compression, the horizontal tie beam is in tension and stops the rafters pushing the walls outwards, and the king post and braces divide the large triangle into smaller triangles; the roof load passes down to the supports at each end.";
  await put("roof-truss-struts-ties", 560, 320, b, alt, "Figure: a roof truss, rafters in compression and the tie beam in tension", "structures/trusses", "## The roof truss");
}

// ---- square frame folds, triangle is rigid
{
  let b = M(130, 28, "Square frame: not rigid", { weight: 700 });
  b += D.polyline([[60, 200], [60, 90], [180, 90], [180, 200]], { stroke: C.blue, width: 5 }) + D.line(60, 200, 180, 200, { stroke: C.blue, width: 5 });
  b += D.polyline([[90, 200], [60, 200]], { width: 0 });
  b += D.polyline([[60, 200], [100, 90], [220, 90], [180, 200]], { stroke: C.red, width: 3, dash: true, close: true });
  b += D.arrow(100, 76, 150, 76, { stroke: C.red, width: 2.4 }) + T(100, 60, "push", { fill: C.red, weight: 700, size: 13 }) + M(130, 232, "folds into a parallelogram", { size: 13, fill: C.red });
  b += M(400, 28, "Triangle: rigid", { weight: 700 });
  b += D.polyline([[330, 200], [470, 200], [400, 90]], { stroke: C.blue, width: 5, close: true }) + M(400, 232, "cannot change shape unless", { size: 13 }) + M(400, 250, "a side changes length", { size: 13 });
  b += M(130, 262, "adding a diagonal makes two triangles", { size: 13, fill: C.muted });
  const alt = "A square frame pinned at its corners folds into a parallelogram when pushed, but a triangle cannot change shape unless one of its sides changes length, which is why trusses are built from triangles.";
  await put("truss-triangle-rigid", 560, 285, b, alt, "Figure: a pinned square folds, a triangle stays rigid", "structures/trusses", "## Why triangles?");
}

// ---- penetration of alpha, beta, gamma
{
  const rows = [["alpha α", 70, 240], ["beta β", 150, 340], ["gamma γ", 230, 440]]; // stops at x
  const bars = [[240, 8, "paper"], [340, 18, "aluminium (few mm)"], [440, 40, "thick lead"]];
  let b = "";
  for (const [x, w, n] of bars) b += D.rect(x, 30, w, 250, { fill: C.fillGrey, width: 1.6 }) + M(x + w / 2, 304, n, { size: 13 });
  b += M(240 + 4, 20, "paper", { size: 0 }) ;
  for (const [n, y, stop] of rows) {
    b += D.rect(30, y - 18, 50, 36, { fill: C.fillAmber, r: 4 }) + M(55, y + 5, "source", { size: 13 });
    const end = n.startsWith("gamma") ? 440 + 40 + 6 : stop - 2;
    b += n.startsWith("gamma") ? D.line(84, y, end - 12, y, { stroke: C.green, width: 3 }) + D.polyline([[end - 14, y - 8], [end, y], [end - 14, y + 8]], { fill: C.green, stroke: C.green, close: true, width: 1 }) : D.arrow(84, y, end, y, { stroke: n.startsWith("alpha") ? C.red : C.blue, width: 3 });
    b += T(88, y - 24, n, { weight: 700 });
    if (n.startsWith("gamma")) b += D.line(486, y, 560, y, { stroke: C.green, width: 1.6, dash: true }) + T(494, y - 10, "reduced", { size: 13, fill: C.green });
    else b += T(stop + 24, y + 5, "stopped", { size: 13, fill: C.muted });
  }
  const alt = "Penetration of nuclear radiation: alpha particles are stopped by a sheet of paper, beta particles pass through paper but are stopped by a few millimetres of aluminium, and gamma rays pass through both and are only reduced by thick lead.";
  await put("radiation-penetration", 600, 325, b.replace(M(244, 20, "paper", { size: 0 }), ""), alt, "Figure: alpha, beta and gamma radiation differ in how far they penetrate", "nuclear/emissions", "The more strongly a radiation ionises");
}

// ---- deflection in an electric field (Cambridge Supplement)
{
  const x0 = 70, y0 = 160, px0 = 190, px1 = 360, xe = 480;
  const path = (c) => {
    let d = `M${x0},${y0} L${px0},${y0} `;
    for (let x = px0; x <= px1; x += 5) d += `L${x},${y0 + c * (x - px0) ** 2} `;
    const ye = y0 + c * (px1 - px0) ** 2, sl = 2 * c * (px1 - px0);
    return [d + `L${xe},${ye + sl * (xe - px1)}`, ye + sl * (xe - px1)];
  };
  let b = D.rect(px0, 58, px1 - px0, 10, { fill: C.fillAmber, width: 2 }) + D.rect(px0, 252, px1 - px0, 10, { fill: C.fillGrey, width: 2 }) + M((px0 + px1) / 2, 46, "+ plate", { weight: 700, fill: C.red }) + M((px0 + px1) / 2, 284, "− plate", { weight: 700 });
  const [da, ya] = path(0.0004), [db, yb] = path(-0.0016);
  b += D.path_(db, { stroke: C.blue, width: 3 }) + D.path_(da, { stroke: C.red, width: 3 }) + D.line(x0, y0, xe, y0, { stroke: C.green, width: 3 });
  b += D.rect(20, y0 - 14, 50, 28, { fill: C.fillAmber, r: 4 }) + M(45, y0 + 5, "source", { size: 13 });
  b += T(xe + 6, yb + 5, "β: bent towards +, strongly", { size: 13, fill: C.blue, weight: 700 }) + T(xe + 6, y0 + 5, "γ: straight on", { size: 13, fill: C.green, weight: 700 }) + T(xe + 6, ya + 5, "α: bent towards −, slightly", { size: 13, fill: C.red, weight: 700 });
  const alt = "Deflection in an electric field between a positive and a negative plate: alpha particles bend slightly towards the negative plate, beta particles bend strongly towards the positive plate because their mass is so small, and gamma rays go straight on.";
  await put("radiation-deflection-electric", 700, 300, b, alt, "Figure: alpha, beta and gamma radiation in an electric field", "nuclear/emissions", "## Deflection in electric and magnetic fields");
}

// ---- electric field lines: positive charge, negative charge, parallel plates
{
  const pt = (cx, cy, sign) => {
    let s = "";
    for (let k = 0; k < 8; k += 1) {
      const a = (k * Math.PI) / 4, c = Math.cos(a), sn = Math.sin(a);
      s += sign > 0 ? D.arrow(cx + 20 * c, cy + 20 * sn, cx + 66 * c, cy + 66 * sn, { stroke: C.blue, width: 2.2 }) : D.arrow(cx + 66 * c, cy + 66 * sn, cx + 22 * c, cy + 22 * sn, { stroke: C.blue, width: 2.2 });
    }
    return s + D.circle(cx, cy, 14, { fill: sign > 0 ? C.fillAmber : C.fillBlue, stroke: C.ink }) + M(cx, cy + 5, sign > 0 ? "+" : "−", { weight: 700, size: 16 });
  };
  let b = pt(90, 110, 1) + pt(290, 110, -1) + M(90, 212, "positive charge:", { size: 13 }) + M(90, 230, "lines point outwards", { size: 13 }) + M(290, 212, "negative charge:", { size: 13 }) + M(290, 230, "lines point inwards", { size: 13 });
  const px = 420, w = 160;
  b += D.rect(px, 40, w, 10, { fill: C.fillAmber, width: 2 }) + D.rect(px, 170, w, 10, { fill: C.fillGrey, width: 2 }) + T(px + w + 6, 50, "+", { weight: 700, size: 18 }) + T(px + w + 6, 182, "−", { weight: 700, size: 18 });
  for (let k = 0; k < 5; k += 1) b += D.arrow(px + 20 + k * 30, 56, px + 20 + k * 30, 164, { stroke: C.blue, width: 2.2 });
  b += D.path_(`M${px + 4},56 Q${px - 14},110 ${px + 4},164`, { stroke: C.blue, width: 1.8, arrow: true }) + D.path_(`M${px + w - 4},56 Q${px + w + 14},110 ${px + w - 4},164`, { stroke: C.blue, width: 1.8, arrow: true });
  b += M(px + w / 2, 212, "oppositely charged plates:", { size: 13 }) + M(px + w / 2, 230, "uniform field, + to −", { size: 13 });
  const alt = "Electric field lines: they point outwards from a positive point charge, inwards towards a negative point charge, and run in evenly spaced parallel lines from the positive plate to the negative plate between oppositely charged parallel plates, curving slightly at the edges.";
  await put("electric-field-lines", 620, 250, b, alt, "Figure: electric field lines for point charges and for parallel plates", "electricity/electrostatics", "## Electric fields (Cambridge Supplement)");
}
console.log("done p2-more");
