// biology-o: gas-exchange/breathing-system (thorax, alveolus) and excretion/kidneys-and-liver (urinary system, nephron)
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};
const pink = "#f6dcd8";

// ---------- 1. The breathing system (front view)
{
  let b = "";
  // ribs (behind the lungs): three arcs each side
  for (const [y0, y1] of [[96, 150], [124, 218], [160, 262]]) {
    b += D.path_(`M296,${y0 - 10} C160,${y0 - 30} 118,${y1} 150,${y1 + 82}`, { stroke: "#b9b2a6", width: 4 });
    b += D.path_(`M304,${y0 - 10} C440,${y0 - 30} 482,${y1} 450,${y1 + 82}`, { stroke: "#b9b2a6", width: 4 });
  }
  // lungs
  b += D.path_("M286,112 C236,100 176,134 170,226 C168,290 190,312 286,300 Z", { fill: pink, stroke: C.red, width: 2.2 });
  b += D.path_("M314,112 C364,100 424,134 430,226 C432,290 410,312 314,300 Z", { fill: pink, stroke: C.red, width: 2.2 });
  // trachea with cartilage rings
  b += D.rect(292, 30, 16, 92, { fill: "#fff", stroke: C.ink, width: 2, r: 3 });
  for (let y = 38; y < 120; y += 11) b += D.line(292, y, 308, y, { stroke: C.ink, width: 1.4 });
  // bronchi and bronchioles
  b += D.line(300, 122, 252, 160, { stroke: C.ink, width: 9 }) + D.line(300, 122, 348, 160, { stroke: C.ink, width: 9 });
  b += D.line(300, 122, 252, 160, { stroke: "#fff", width: 5 }) + D.line(300, 122, 348, 160, { stroke: "#fff", width: 5 });
  for (const s of [-1, 1]) {
    const x0 = s < 0 ? 252 : 348;
    for (const [dx, dy] of [[34, 56], [18, 96], [44, 108], [8, 124]]) {
      const ex = x0 + s * dx, ey = 160 + dy;
      b += D.line(x0, 160, ex, ey, { stroke: C.ink, width: 2.2 });
      b += D.circle(ex, ey + 5, 5, { fill: "#fff", stroke: C.ink, width: 1.5 });
    }
  }
  // diaphragm
  b += D.path_("M112,352 Q300,252 488,352", { stroke: C.amber, width: 7 });
  // labels
  b += call(236, 56, "Trachea (windpipe)", 292, 60, { anchor: "end" });
  b += call(206, 138, "Bronchus", 262, 148, { anchor: "end" });
  b += call(150, 218, "Bronchioles", 228, 246, { anchor: "end" });
  b += call(448, 90, "Lung", 408, 160);
  b += call(486, 220, "Ribs", 462, 250);
  b += call(120, 290, "Ribs, with", 148, 262, { anchor: "end" });
  b += D.text(116, 308, "intercostal", { anchor: "end", size: 14 }) + D.text(116, 326, "muscles between", { anchor: "end", size: 14 });
  b += call(300, 372, "Diaphragm", 300, 305, { anchor: "middle" });
  const alt = "Front view of the breathing system: air passes down the trachea, which is held open by rings of cartilage, into a bronchus for each lung, then along branching bronchioles to the alveoli; the ribs with the intercostal muscles surround the lungs and the dome-shaped diaphragm lies beneath them.";
  await add("breathing-system", D.svg(560, 380, b), alt, "Figure: the human breathing system in front view", "gas-exchange/breathing-system", "| Diaphragm | Dome-shaped sheet");
}

// ---------- 2. Alveolus and capillary
{
  let b = "";
  b += D.circle(180, 190, 115, { fill: "#f7fbfc", stroke: C.ink, width: 3 });
  b += D.text(150, 190, "Air in the", { anchor: "middle", size: 14 }) + D.text(150, 208, "alveolus", { anchor: "middle", size: 14 });
  // capillary: a tube hugging the right side of the alveolus
  b += D.rect(310, 60, 70, 260, { fill: "#fbe9e7", stroke: C.red, width: 3, r: 30 });
  for (const [x, y] of [[345, 100], [345, 190], [345, 270]]) b += ell(x, y, 17, 8, { fill: "#f4c7c3", stroke: C.red, width: 1.6, rotate: 90 });
  b += D.line(295, 100, 295, 280, { stroke: C.muted, width: 1.2 });
  b += D.arrow(345, 36, 345, 56, { width: 2, stroke: C.blue });
  b += D.arrow(345, 322, 345, 346, { width: 2, stroke: C.red });
  b += D.text(345, 28, "Blood from the pulmonary artery: low oxygen", { anchor: "middle", size: 13, fill: C.blue });
  b += D.text(345, 364, "Blood to the pulmonary vein: high oxygen", { anchor: "middle", size: 13, fill: C.red });
  // gas arrows
  b += D.arrow(255, 150, 322, 150, { width: 2.6, stroke: C.blue }) + D.tag(180, 142, "oxygen", { anchor: "start", size: 13, fill: C.blue }) ;
  b += D.arrow(322, 230, 255, 230, { width: 2.6, stroke: C.amber }) + D.tag(150, 256, "carbon dioxide", { anchor: "start", size: 13, fill: C.amber });
  // labels
  b += call(420, 120, "Capillary wall:", 380, 120);
  b += D.text(420, 138, "one cell thick", { size: 14 });
  b += call(420, 190, "Red blood cell", 358, 190);
  b += call(420, 262, "Alveolus wall:", 297, 262, { fromY: 258 });
  b += D.text(420, 280, "one cell thick, moist", { size: 14 });
  const alt = "An alveolus beside a capillary: oxygen diffuses from the air in the alveolus into the blood and carbon dioxide diffuses the other way, across two walls that are each one cell thick, so the diffusion distance is very short and a dense blood supply keeps the concentration gradients steep.";
  await add("alveolus-gas-exchange", D.svg(560, 380, b), alt, "Figure: gas exchange between an alveolus and a capillary by diffusion", "gas-exchange/breathing-system", "- **Good ventilation:**");
}

// ---------- 3. Urinary system
{
  let b = "";
  // aorta (red outline) and vena cava (blue outline), side by side
  b += D.rect(296, 40, 10, 250, { fill: "#fbe0dd", stroke: C.red, width: 1.6 }) + D.rect(278, 40, 10, 250, { fill: "#daf2f8", stroke: C.teal, width: 1.6 });
  // renal arteries (red) and renal veins (blue)
  b += D.line(296, 104, 236, 104, { stroke: C.red, width: 3 }) + D.line(306, 104, 346, 104, { stroke: C.red, width: 3 });
  b += D.line(278, 124, 236, 124, { stroke: C.teal, width: 3 }) + D.line(288, 124, 346, 124, { stroke: C.teal, width: 3 });
  // kidneys
  b += ell(214, 120, 30, 52, { fill: "#e9bdb2", stroke: C.red, width: 2.4 }) + ell(368, 120, 30, 52, { fill: "#e9bdb2", stroke: C.red, width: 2.4 });
  // ureters and bladder
  b += D.path_("M222,170 C234,210 266,236 288,260", { stroke: C.ink, width: 4 }) + D.path_("M360,170 C348,210 318,236 298,260", { stroke: C.ink, width: 4 });
  b += ell(293, 288, 36, 28, { fill: C.fillAmber, stroke: C.amber, width: 2.4 });
  b += D.line(293, 316, 293, 350, { stroke: C.ink, width: 5 });
  b += call(150, 120, "Kidney", 186, 120, { anchor: "end" });
  b += call(180, 214, "Ureter", 246, 218, { anchor: "end" });
  b += call(230, 296, "Bladder", 258, 290, { anchor: "end" });
  b += call(230, 346, "Urethra", 290, 340, { anchor: "end" });
  b += call(430, 52, "Aorta", 306, 52);
  b += call(430, 78, "Vena cava", 288, 76);
  b += call(430, 110, "Renal artery (blood in)", 346, 104, { fromY: 106 });
  b += call(430, 146, "Renal vein (blood out)", 346, 124, { fromY: 142 });
  const alt = "The urinary system: two kidneys, each receiving blood with urea through a renal artery and returning filtered blood by a renal vein, a ureter from each kidney carrying urine to the bladder, and the urethra carrying urine from the bladder out of the body.";
  await add("urinary-system", D.svg(620, 370, b), alt, "Figure: the urinary system with the blood vessels of the kidneys", "excretion/kidneys-and-liver", "- **Urethra**: carries urine");
}

// ---------- 4. A nephron: filtration, reabsorption, urine
{
  let b = "";
  // zones
  b += D.rect(20, 40, 420, 130, { fill: "#fbf3ee", stroke: "none" }) + D.rect(20, 170, 420, 170, { fill: "#f3ecf7", stroke: "none" });
  b += D.line(20, 170, 440, 170, { stroke: C.muted, width: 1.4, dash: true });
  b += D.text(28, 62, "CORTEX", { size: 13, weight: 700, fill: C.muted }) + D.text(28, 192, "MEDULLA", { size: 13, weight: 700, fill: C.muted });
  // tubule path (capsule -> proximal -> loop -> distal -> collecting duct)
  const tub = "M150,112 C170,100 168,134 192,128 C214,122 212,150 234,150 L234,300 Q252,326 270,300 L270,160 C290,150 292,118 316,126 C338,134 344,104 372,104 L380,104 L380,336";
  b += D.path_(tub, { stroke: C.ink, width: 11 }) + D.path_(tub, { stroke: C.fillAmber, width: 7 });
  // capillary network around the tubule (red)
  const cap = "M60,136 C60,196 160,196 208,176 C214,240 214,296 246,322 C300,300 296,230 290,178 C330,150 350,132 360,112";
  b += D.path_(cap, { stroke: C.red, width: 2.4, dash: true });
  // capsule + glomerulus
  b += D.circle(112, 104, 38, { fill: "#fff", stroke: C.ink, width: 3 });
  b += D.path_("M96,92 C108,76 128,86 116,98 C104,108 126,114 112,124 C100,130 92,118 100,108 C90,100 100,92 108,100", { stroke: C.red, width: 2.4 });
  b += D.arrow(26, 90, 76, 96, { stroke: C.red, width: 3 });
  b += D.line(76, 116, 26, 130, { stroke: C.red, width: 3 });
  // numbered steps on the drawing
  const num = (x, y, k) => D.circle(x, y, 12, { fill: C.blue, stroke: C.blue }) + D.text(x, y + 5, k, { anchor: "middle", size: 14, weight: 700, fill: "#fff" });
  b += num(112, 52, "1") + num(190, 100, "2") + num(396, 250, "3");
  // labels
  b += call(150, 56, "Capsule and glomerulus", 128, 82, { fromY: 52 });
  b += call(350, 58, "Distal tubule", 332, 126, { anchor: "start", fromY: 54 });
  b += call(450, 196, "Collecting duct", 382, 196);
  b += call(450, 290, "Tubule dips into the medulla", 272, 280, { fromY: 286 });
  b += call(450, 322, "Pelvis (urine collects)", 382, 332, { fromY: 318 });
  b += call(150, 262, "Capillary (dashed)", 116, 187, { anchor: "end" });
  b += D.text(26, 82, "blood in", { size: 12, fill: C.red });
  // legend
  const leg = ["1  Filtration: water, glucose, urea and ions leave the blood in the glomerulus and enter the capsule; blood cells and protein stay in the blood.", "2  Reabsorption: all the glucose, most of the water and some ions pass back into the capillaries around the tubule.", "3  Urine (urea, extra water and ions) runs down the collecting duct to the pelvis."];
  const wrap = (t, n) => { const w = t.split(" "), out = []; let cur = ""; for (const x of w) { if ((cur + " " + x).length > n) { out.push(cur); cur = x; } else cur = (cur ? cur + " " : "") + x; } out.push(cur); return out; };
  let y = 366;
  for (const t of leg) for (const l of wrap(t, 72)) { b += D.text(24, y, l, { size: 13 }); y += 17; }
  const alt = "A nephron: filtration at the glomerulus forces water, glucose, urea and ions out of the blood into the capsule while blood cells and protein stay in the blood; reabsorption along the tubule returns all the glucose, most of the water and some ions to the blood capillaries; urea, excess water and ions continue down the collecting duct to the pelvis as urine.";
  await add("nephron-structure", D.svg(640, y + 6, b), alt, "Figure: a nephron showing filtration, reabsorption and the formation of urine", "excretion/kidneys-and-liver", "3. **Urine.**");
}
