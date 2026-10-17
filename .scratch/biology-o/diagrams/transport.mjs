// biology-o: animal-transport (heart, double circulation, heart-rate graph, blood vessels)
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};
const DEO = { fill: "#daf2f8", stroke: C.teal }, OXY = { fill: "#fbe0dd", stroke: C.red };

// ---------- 1. The heart (front view: the heart's right side is on the reader's left)
{
  let b = "";
  // vessels first (behind the chambers)
  const tube = (d, col, w = 18) => D.path_(d, { stroke: C.ink, width: w + 3 }) + D.path_(d, { stroke: col.fill, width: w });
  b += tube("M205,50 L205,132", DEO.fill ? { fill: DEO.fill } : DEO);                      // vena cava
  b += tube("M263,200 L263,96 C263,80 250,74 236,74", { fill: DEO.fill });                  // pulmonary artery
  b += tube("M287,200 L287,100 C287,52 400,50 398,110 L398,128", { fill: OXY.fill });     // aorta arch
  b += tube("M470,146 L380,146", { fill: OXY.fill }, 14) + tube("M470,180 L380,180", { fill: OXY.fill }, 14);  // pulmonary veins
  // chambers
  b += D.rect(185, 130, 65, 66, { ...DEO, width: 2.4, r: 12 });          // right atrium
  b += D.rect(300, 130, 85, 66, { ...OXY, width: 2.4, r: 12 });          // left atrium
  b += D.rect(185, 196, 90, 112, { ...DEO, width: 3, r: 14 });           // right ventricle (thin wall)
  b += D.rect(275, 196, 118, 130, { ...OXY, stroke: C.red, width: 3, r: 16 }); // left ventricle
  b += D.rect(283, 204, 102, 114, { fill: "#fdf3f2", stroke: C.red, width: 1.2, r: 10 }); // left ventricle cavity inside thick wall
  b += D.rect(193, 204, 76, 98, { fill: "#f1fafc", stroke: C.teal, width: 1.2, r: 8 });
  b += D.line(275, 196, 275, 308, { stroke: C.ink, width: 4 });           // septum
  // valves (AV valves)
  b += D.line(205, 196, 226, 210, { stroke: C.ink, width: 3 }) + D.line(238, 196, 226, 210, { stroke: C.ink, width: 3 });
  b += D.line(320, 196, 336, 212, { stroke: C.ink, width: 3 }) + D.line(352, 196, 336, 212, { stroke: C.ink, width: 3 });
  // coronary artery over the surface
  b += D.path_("M398,128 C420,150 420,230 390,270 C376,290 360,300 352,304", { stroke: C.red, width: 2, dash: true });
  // labels left
  b += call(150, 88, "Vena cava", 200, 88, { anchor: "end" });
  b += call(150, 166, "Right atrium", 190, 160, { anchor: "end" });
  b += call(150, 222, "Tricuspid valve", 215, 203, { anchor: "end" });
  b += call(150, 276, "Right ventricle\n(thin wall)", 190, 270, { anchor: "end" });
  b += call(210, 40, "Pulmonary artery (to lungs)", 250, 76, { anchor: "start", fromY: 36 });
  // labels right
  b += call(420, 70, "Aorta (to body)", 370, 62);
  b += call(490, 128, "Pulmonary veins", 430, 146, { fromY: 124 });
  b += D.text(490, 146, "(from lungs)", { size: 13, fill: C.muted });
  b += call(420, 214, "Left atrium", 383, 190, { fromY: 210 });
  b += call(420, 252, "Left ventricle", 388, 262);
  b += D.text(420, 270, "(thickest wall)", { size: 13, fill: C.muted });
  b += call(420, 312, "Bicuspid valve", 340, 206, { fromY: 308 });
  b += call(150, 336, "Septum", 275, 300, { anchor: "end", fromY: 332 });
  b += call(420, 346, "Coronary artery", 410, 220, { fromY: 342 });
  b += D.tag(300, 372, "Blue tint: deoxygenated blood. Red tint: oxygenated blood.", { anchor: "middle", size: 13 });
  const alt = "Front view of the heart: deoxygenated blood enters the right atrium from the vena cava and leaves the right ventricle by the pulmonary artery; oxygenated blood enters the left atrium from the pulmonary veins and leaves the left ventricle, which has the thickest wall, by the aorta; a septum separates the two sides.";
  await add("heart-structure", D.svg(600, 392, b), alt, "Figure: the structure of the heart seen from the front, with the vessels and valves labelled", "animal-transport/heart-and-circulation", "**The path of blood:**");
}

// ---------- 2. Double circulation (block diagram)
{
  let b = "";
  const n = (x, y, w, h, t, f) => D.node(x, y, w, h, t, { fill: f, size: 14 });
  b += n(180, 20, 200, 46, "Lungs", D.C.fillGreen);
  b += n(180, 300, 200, 46, "Body (organs and tissues)", D.C.fillAmber);
  b += n(40, 150, 140, 90, "Right side\nof the heart\n(right atrium and\nventricle)", D.C.fillBlue);
  b += n(380, 150, 140, 90, "Left side\nof the heart\n(left atrium and\nventricle)", "#fbe0dd");
  // pulmonary circuit (top): right heart -> lungs -> left heart
  b += D.arrow(110, 148, 180, 50, { stroke: C.blue, width: 2.4 });
  b += D.arrow(380, 44, 450, 148, { stroke: C.red, width: 2.4 });
  b += D.text(14, 80, "Pulmonary artery:", { size: 12, fill: C.blue }) + D.text(14, 96, "deoxygenated", { size: 12, fill: C.blue });
  b += D.text(540 - 8, 98, "Pulmonary veins:", { anchor: "end", size: 12, fill: C.red }) + D.text(532, 114, "oxygenated", { anchor: "end", size: 12, fill: C.red });
  // systemic circuit (bottom): left heart -> body -> right heart
  b += D.arrow(450, 242, 380, 322, { stroke: C.red, width: 2.4 });
  b += D.arrow(180, 322, 110, 242, { stroke: C.blue, width: 2.4 });
  b += D.text(532, 290, "Aorta:", { anchor: "end", size: 12, fill: C.red }) + D.text(532, 306, "oxygenated", { anchor: "end", size: 12, fill: C.red });
  b += D.text(52, 290, "Vena cava:", { size: 12, fill: C.blue }) + D.text(52, 306, "deoxygenated", { size: 12, fill: C.blue });
  b += D.text(280, 100, "PULMONARY CIRCULATION", { anchor: "middle", size: 13, weight: 700 });
  b += D.text(280, 264, "SYSTEMIC CIRCULATION", { anchor: "middle", size: 13, weight: 700 });
  b += D.text(280, 176, "Blood passes through the", { anchor: "middle", size: 13, fill: C.muted }) + D.text(280, 193, "heart twice in each", { anchor: "middle", size: 13, fill: C.muted }) + D.text(280, 210, "complete circuit", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Double circulation: the right side of the heart pumps deoxygenated blood to the lungs in the pulmonary artery and oxygenated blood returns to the left side in the pulmonary veins; the left side pumps oxygenated blood to the body in the aorta and deoxygenated blood returns to the right side in the vena cava, so blood passes through the heart twice per circuit.";
  await add("double-circulation", D.svg(560, 360, b), alt, "Figure: double circulation, the pulmonary circuit through the lungs and the systemic circuit through the body", "animal-transport/heart-and-circulation", "- **systemic circulation:** left side of the heart");
}

// ---------- 3. Heart rate after exercise (Example 2 data)
{
  const t = [0, 1, 2, 3, 4], hr = [126, 108, 90, 78, 72], rest = 72;
  const ax = D.axes({ x: [0, 5], y: [60, 140], xTicks: 1, yTicks: 20, xLabel: "Time after exercise (minutes)", yLabel: "Pulse rate (beats per minute)", w: 560, h: 380, pad: { l: 64, r: 30, t: 34, b: 62 } });
  let b = ax.frame;
  b += ax.line([[0, rest], [5, rest]], { stroke: C.muted, width: 1.6, dash: true });
  b += ax.line(t.map((x, i) => [x, hr[i]]), { stroke: C.blue, width: 3 });
  t.forEach((x, i) => { b += ax.point(x, hr[i], { stroke: C.blue }) + ax.label(x, hr[i], String(hr[i]), { dx: 10, dy: -8, size: 13 }); });
  b += ax.tag(4.95, rest, "Resting rate 72", { anchor: "end", dy: 28, size: 13 });
  b += ax.tag(2.5, 128, "Recovery time: 4 minutes", { anchor: "start", size: 13 });
  const alt = "Graph of Tatenda's pulse after two minutes of skipping: 126 beats per minute straight after exercise, then 108, 90, 78 and 72 over four minutes, back to the resting rate of 72, so the increase was 54 beats per minute (75%) and the recovery time 4 minutes.";
  await add("heart-rate-recovery-graph", D.svg(560, 380, b), alt, "Figure: pulse rate after exercise falls back to the resting rate of 72 beats per minute in 4 minutes", "animal-transport/heart-and-circulation", "3. The rate was back to 72 after 4 minutes");
}

// ---------- 4. Blood vessels in cross-section
{
  let b = "";
  const cols = [110, 280, 450];
  // artery: thick wall, narrow lumen
  b += D.circle(cols[0], 130, 62, { fill: "#f4c7c3", stroke: C.red, width: 2.4 }) + D.circle(cols[0], 130, 22, { fill: "#fff", stroke: C.ink, width: 2 });
  b += D.circle(cols[0], 130, 52, { fill: "none", stroke: C.red, width: 1, dash: true });
  // vein: thin wall, wide lumen
  b += D.circle(cols[1], 130, 62, { fill: "#d8d2e8", stroke: C.purple, width: 2.4 }) + D.circle(cols[1], 130, 54, { fill: "#fff", stroke: C.ink, width: 2 });
  // capillary: one cell thick
  b += D.circle(cols[2], 130, 24, { fill: "#fff", stroke: C.ink, width: 2 }) + D.circle(cols[2], 130, 18, { fill: "#fff", stroke: C.amber, width: 2.4 });
  b += ell(cols[2], 130, 12, 6, { fill: "#f4c7c3", stroke: C.red, width: 1.4 });
  const names = ["Artery", "Vein", "Capillary"];
  const notes = [["thick muscular and", "elastic wall; narrow", "lumen; high pressure"], ["thin wall; wide lumen;", "valves stop backflow;", "low pressure"], ["wall one cell thick;", "lumen fits one red", "blood cell"]];
  cols.forEach((x, i) => {
    b += D.text(x, 36, names[i], { anchor: "middle", size: 16, weight: 700 });
    b += notes[i].map((l, k) => D.text(x, 226 + k * 18, l, { anchor: "middle", size: 13 })).join("");
  });
  b += D.text(280, 296, "Lumen: the space where the blood flows (white in each drawing)", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Cross-sections of the three blood vessels: an artery with a thick muscular and elastic wall and a narrow lumen for high-pressure blood, a vein with a thin wall, a wide lumen and valves, and a capillary whose wall is one cell thick with a lumen only wide enough for one red blood cell.";
  await add("blood-vessels-sections", D.svg(560, 316, b), alt, "Figure: cross-sections of an artery, a vein and a capillary", "animal-transport/blood-vessels", "| Valves | None | Yes");
}
