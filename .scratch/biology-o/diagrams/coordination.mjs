// biology-o: coordination (eye, reflex arc) and reproduction (menstrual-cycle hormone graph)
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};

// ---------- 1. The eye (horizontal section; light enters from the left)
{
  let b = "";
  const cx = 330, cy = 200, A = (148.5 * Math.PI) / 180;
  const arc = (R, o) => {
    const x1 = cx + R * Math.cos(-A), y1 = cy + R * Math.sin(-A), x2 = cx + R * Math.cos(A), y2 = cy + R * Math.sin(A);
    return D.path_(`M${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 1 1 ${x2.toFixed(1)},${y2.toFixed(1)}`, o);
  };
  const front = { x1: cx + 124 * Math.cos(-A), y1: cy + 124 * Math.sin(-A), y2: cy + 124 * Math.sin(A) };
  // eyeball layers: sclera, choroid, retina
  b += arc(124, { stroke: "#9c958b", width: 9 });
  b += arc(116, { stroke: "#4a4540", width: 5 });
  b += arc(110, { stroke: C.amber, width: 5 });
  // cornea (bulge at the front)
  b += D.path_(`M${front.x1.toFixed(1)},${front.y1.toFixed(1)} C150,${front.y1 + 30} 150,${front.y2 - 30} ${front.x1.toFixed(1)},${front.y2.toFixed(1)}`, { stroke: C.teal, width: 6 });
  // iris, pupil gap between y=170 and y=230
  b += D.line(238, 130, 238, 170, { stroke: "#7a4a1c", width: 9 }) + D.line(238, 230, 238, 270, { stroke: "#7a4a1c", width: 9 });
  // lens and its supports
  b += ell(262, 200, 17, 42, { fill: "#e9f6fa", stroke: C.blue, width: 2.4 });
  b += ell(268, 144, 14, 9, { fill: "#f4c7c3", stroke: C.red, width: 1.6 }) + ell(268, 256, 14, 9, { fill: "#f4c7c3", stroke: C.red, width: 1.6 });
  b += D.line(262, 160, 266, 152, { stroke: C.ink, width: 1.4 }) + D.line(262, 240, 266, 248, { stroke: C.ink, width: 1.4 });
  // fovea and blind spot with the optic nerve
  b += D.dot(cx + 110, cy, { r: 4, stroke: C.red, fill: C.red });
  b += D.line(cx + 108, cy + 40, cx + 170, cy + 58, { stroke: "#b9b2a6", width: 12 });
  b += D.dot(cx + 110, cy + 40, { r: 3.5, stroke: C.ink, fill: C.ink });
  // light rays focused on the fovea
  b += D.polyline([[40, 150], [160, 160], [238, 176], [cx + 110, cy]], { stroke: C.amber, width: 1.8 });
  b += D.polyline([[40, 250], [160, 240], [238, 224], [cx + 110, cy]], { stroke: C.amber, width: 1.8 });
  b += D.text(40, 140, "Light", { size: 13, fill: C.amber, weight: 700 });
  // labels
  b += call(130, 96, "Cornea", 200, 148, { anchor: "end" });
  b += call(150, 352, "Pupil", 238, 200, { anchor: "end", fromY: 348 });
  b += call(480, 98, "Choroid", 420, 122, { anchor: "start", fromY: 94 });
  b += call(30, 316, "Aqueous humour", 205, 215, { anchor: "start", fromY: 312 });
  b += call(210, 70, "Iris", 238, 140, { anchor: "start", fromY: 66 });
  b += call(300, 36, "Ciliary muscle", 270, 138, { anchor: "start", fromY: 32 });
  b += call(300, 360, "Suspensory ligaments", 264, 252, { anchor: "start", fromY: 356 });
  b += D.text(362, 262, "Vitreous humour", { anchor: "middle", size: 14, fill: C.muted });
  b += call(480, 66, "Sclera", 400, 100, { anchor: "start", fromY: 62 });
  b += call(480, 150, "Retina", 428, 150, { anchor: "start", fromY: 146 });
  b += call(520, 200, "Fovea", cx + 112, cy, { anchor: "start", fromY: 196 });
  b += call(520, 252, "Blind spot", cx + 112, cy + 40, { anchor: "start", fromY: 248 });
  b += call(520, 296, "Optic nerve", cx + 160, cy + 56, { anchor: "start", fromY: 292 });
  const alt = "Horizontal section of the eye: light enters through the cornea, aqueous humour, pupil in the iris and the lens (held by suspensory ligaments and ciliary muscle), crosses the vitreous humour and is focused on the retina at the fovea; the optic nerve leaves at the blind spot.";
  await add("eye-structure", D.svg(620, 380, b), alt, "Figure: the structure of the human eye in horizontal section", "coordination/eye", "| Aqueous and vitreous humour |");
}

// ---------- 2. Reflex arc (the lesson's thorn example)
{
  let b = "";
  // skin, thorn, receptor
  b += D.rect(20, 60, 130, 40, { fill: "#f6dcd8", stroke: C.red, width: 2, r: 6 });
  b += D.polyline([[60, 20], [80, 20], [70, 62]], { fill: C.muted, stroke: C.ink, width: 1.5, close: true });
  b += D.text(85, 84, "Skin", { anchor: "middle", size: 14 });
  b += D.dot(110, 80, { r: 5, fill: C.amber, stroke: C.amber });
  // spinal cord section
  b += D.circle(310, 215, 84, { fill: "#fbf7ef", stroke: C.ink, width: 3 });
  b += ell(282, 215, 30, 26, { fill: "#e5dcc9", stroke: C.muted, width: 1.4 }) + ell(338, 215, 30, 26, { fill: "#e5dcc9", stroke: C.muted, width: 1.4 });
  b += D.text(310, 316, "Spinal cord (cross-section)", { anchor: "middle", size: 13, fill: C.muted });
  // sensory neurone
  b += D.path_("M110,84 C170,110 230,150 278,190", { stroke: C.blue, width: 3.4, arrow: true });
  // relay neurone inside the cord
  b += D.path_("M280,196 C292,200 302,214 316,226 C326,232 334,232 340,226", { stroke: C.purple, width: 3.2 });
  // motor neurone and effector
  b += D.path_("M344,236 C400,262 460,286 520,290", { stroke: C.amber, width: 3.4, arrow: true });
  b += ell(572, 290, 44, 24, { fill: "#f4c7c3", stroke: C.red, width: 2.2 });
  // pathway to the brain
  b += D.path_("M312,198 C340,150 420,110 470,74", { stroke: C.muted, width: 2, dash: true, arrow: true });
  b += ell(520, 56, 46, 28, { fill: "#e9e3f3", stroke: C.purple, width: 2 });
  b += D.text(520, 61, "Brain", { anchor: "middle", size: 14 });
  // labels
  b += call(210, 40, "Receptor: pain receptors", 112, 78, { anchor: "start", fromY: 36 });
  b += D.text(210, 58, "start the impulses", { size: 13, fill: C.muted });
  b += call(150, 176, "Sensory neurone", 180, 124, { anchor: "end" });
  b += call(150, 250, "Relay neurone", 296, 206, { anchor: "end" });
  b += call(430, 340, "Motor neurone", 440, 276, { anchor: "middle", fromY: 326 });
  b += D.text(556, 336, "Muscle (effector)", { anchor: "middle", size: 14 });
  const alt = "Reflex arc for stepping on a thorn: pain receptors in the skin send impulses along a sensory neurone to a relay neurone in the spinal cord, which passes them to a motor neurone that carries them to a leg muscle, the effector, which contracts to lift the foot; other impulses reach the brain a moment later.";
  await add("reflex-arc", D.svg(620, 360, b), alt, "Figure: a reflex arc from receptor to effector, with a separate pathway to the brain", "coordination/nervous-system", "At the same time, other relay neurones");
}

// ---------- 3. Menstrual cycle hormone graph (28-day cycle, shapes as described in Example 1)
{
  const g = (d, p, w) => Math.exp(-(((d - p) / w) ** 2));
  const fsh = (d) => 0.8 + 5.2 * g(d, 4, 3.2) + 2.6 * g(d, 13.5, 1.6) - (d > 15 ? 0 : 0);
  const oes = (d) => 0.6 + 7.4 * g(d, 12, 3.2) + 3 * g(d, 21, 3.4);
  const lh = (d) => 0.9 + 8.6 * g(d, 13.5, 1.2);
  const prog = (d) => 0.4 + 7 * g(d, 21, 3.6);
  const W = 600, H = 470;
  const ax = D.axes({ x: [0, 28], y: [0, 11], xTicks: [0, 7, 14, 21, 28], yTicks: [], xLabel: "Day of the cycle", yLabel: "Hormone level (relative)", w: W, h: H - 90, pad: { l: 50, r: 30, t: 30, b: 60 } });
  let b = ax.frame;
  b += ax.line([[14, 0], [14, 11]], { stroke: C.muted, width: 1.4, dash: true });
  b += ax.tag(14.3, 11, "Ovulation (day 14)", { anchor: "start", size: 13 });
  b += ax.plot(fsh, { stroke: C.green, width: 3 }) + ax.plot(oes, { stroke: C.amber, width: 3 }) + ax.plot(lh, { stroke: C.red, width: 3 }) + ax.plot(prog, { stroke: C.purple, width: 3 });
  b += ax.tag(4, 7.5, "FSH", { anchor: "middle", size: 13, fill: C.green, dx: 0 });
  b += ax.tag(11.2, 9.4, "Oestrogen", { anchor: "end", size: 13, fill: C.amber });
  b += ax.tag(15.2, 9.6, "LH surge", { anchor: "start", size: 13, fill: C.red, dy: 18 });
  b += ax.tag(24.4, 8.0, "Progesterone", { anchor: "middle", size: 13, fill: C.purple });
  // uterus lining bands below the axis
  const y0 = H - 82;
  const bands = [[0, 5, "Menstruation", "#f4c7c3"], [5, 13.5, "Lining repaired and thickens", C.fillAmber], [13.5, 14.5, "", "#fff"], [14.5, 28, "Lining maintained (thick, many blood vessels)", C.fillGreen]];
  b += D.text(12, y0 - 6, "Uterus lining:", { size: 13, weight: 700 });
  for (const [a, c, t, col] of bands) {
    b += D.rect(ax.X(a), y0, ax.X(c) - ax.X(a), 40, { fill: col, stroke: C.axis, width: 1 });
  }
  b += D.text(ax.X(2.5), y0 + 17, "Period", { anchor: "middle", size: 12 }) + D.text(ax.X(2.5), y0 + 32, "days 1-5", { anchor: "middle", size: 12 });
  b += D.text(ax.X(9.2), y0 + 17, "Repaired and", { anchor: "middle", size: 12 }) + D.text(ax.X(9.2), y0 + 32, "thickens, days 6-13", { anchor: "middle", size: 12 });
  b += D.text(ax.X(21.2), y0 + 17, "Thick lining maintained", { anchor: "middle", size: 12 }) + D.text(ax.X(21.2), y0 + 32, "days 15-28", { anchor: "middle", size: 12 });
  const alt = "Hormone levels over a 28-day menstrual cycle: FSH is high in the first days, oestrogen rises to a peak around day 12, LH surges sharply around day 13 to 14 and ovulation follows, then progesterone rises to a peak around day 21 and falls towards day 28; the uterus lining is lost in days 1 to 5, repaired and thickened in days 6 to 13 and maintained in days 15 to 28.";
  await add("menstrual-cycle-hormones", D.svg(W, H, b), alt, "Figure: hormone levels and the uterus lining across a 28-day menstrual cycle", "reproduction/puberty-and-menstrual-cycle", "5. Progesterone falling towards day 28");
}
