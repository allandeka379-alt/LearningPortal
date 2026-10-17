// biology-o: skin section, blood-glucose negative feedback, malaria life cycle, coronary artery
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};

// ---------- 1. Section through the skin
{
  let b = "";
  const x0 = 170, x1 = 470;
  b += D.rect(x0, 70, x1 - x0, 160, { fill: "#f7e3dc", stroke: "none" });          // dermis
  b += D.rect(x0, 230, x1 - x0, 90, { fill: "#f8eab0", stroke: "none" });          // fatty tissue
  b += D.rect(x0, 40, x1 - x0, 30, { fill: "#f1b9b0", stroke: "none" });           // epidermis
  b += D.rect(x0, 40, x1 - x0, 280, { fill: "none", stroke: C.ink, width: 2 });
  b += D.line(x0, 70, x1, 70, { stroke: C.muted, width: 1.2, dash: true }) + D.line(x0, 230, x1, 230, { stroke: C.muted, width: 1.2, dash: true });
  // hair: shaft, follicle and bulb
  b += D.line(240, 12, 240, 120, { stroke: C.ink, width: 4 });
  b += D.path_("M232,70 C228,110 226,140 240,150 C254,140 252,110 248,70", { fill: "#e5dcc9", stroke: C.ink, width: 1.8 });
  // hair erector muscle
  b += D.line(250, 120, 300, 76, { stroke: C.red, width: 6 });
  // sweat gland (coil) and duct to a pore
  b += D.path_("M360,176 C346,184 346,196 360,198 C374,200 374,214 358,214 C344,214 344,226 360,226", { stroke: C.green, width: 3 });
  b += D.path_("M360,176 C360,120 366,90 360,40", { stroke: C.green, width: 2.4 });
  b += D.circle(360, 40, 3.5, { fill: "#fff", stroke: C.ink, width: 1.6 });
  // temperature receptor and sensory neurone
  b += D.circle(310, 100, 6, { fill: C.amber, stroke: C.amber });
  b += D.path_("M310,106 C300,160 300,250 296,320", { stroke: C.purple, width: 2.4 });
  // blood vessels: arteriole (red), capillary loop near the surface, venule (blue)
  b += D.path_("M420,320 L420,118 C420,92 450,92 450,118 L450,320", { stroke: C.red, width: 3 });
  b += D.path_("M450,200 L450,320", { stroke: C.blue, width: 3 });
  b += D.path_("M420,320 L420,200", { stroke: C.red, width: 3 });
  // labels left
  b += call(150, 40, "Hair", 240, 30, { anchor: "end", fromY: 36 });
  b += call(150, 112, "Hair erector", 258, 114, { anchor: "end" }) + D.text(150, 130, "muscle", { anchor: "end", size: 14 });
  b += call(150, 160, "Receptor (detects", 305, 102, { anchor: "end", fromY: 156 }) + D.text(150, 178, "temperature)", { anchor: "end", size: 14 });
  b += call(150, 290, "Sensory neurone", 297, 280, { anchor: "end" }) + D.text(150, 308, "(to brain)", { anchor: "end", size: 14 });
  // labels right
  b += call(488, 36, "Sweat duct", 362, 70, { fromY: 32 }) + D.text(488, 54, "and pore", { size: 14 });
  b += call(488, 100, "Epidermis", 400, 56, { fromY: 96 });
  b += call(488, 160, "Dermis", 470, 150, { fromY: 156 });
  b += call(488, 200, "Sweat gland", 372, 198, { fromY: 196 });
  b += call(488, 250, "Blood vessels", 450, 250, { fromY: 246 }) + D.text(488, 268, "(arteriole, capillaries,", { size: 14 }) + D.text(488, 284, "venule)", { size: 14 });
  b += call(488, 312, "Fatty tissue", 380, 290, { fromY: 308 });
  const alt = "Section through the skin from the surface inwards: epidermis, dermis containing a hair in its follicle with a hair erector muscle, a coiled sweat gland with a duct to a pore, temperature receptors with sensory neurones, and blood vessels with capillaries near the surface, and a layer of fatty tissue beneath.";
  await add("skin-section", D.svg(640, 340, b), alt, "Figure: a section through the skin with the parts that control body temperature", "homeostasis/temperature-control", "- **Fatty tissue**: a layer beneath the dermis");
}

// ---------- 2. Blood glucose negative feedback
{
  let b = "";
  const n = (x, y, w, h, t, f) => D.node(x, y, w, h, t, { fill: f, size: 13 });
  const col = [14, 224, 434], w = 190, h = 70;
  b += n(col[0], 14, w, h, "Blood glucose rises\nabove the set point", C.fillAmber);
  b += n(col[1], 14, w, h, "Pancreas secretes\nmore insulin", C.fillBlue);
  b += n(col[2], 14, w, h, "Liver turns glucose into\nglycogen; cells take up\nmore glucose", C.fillGreen);
  b += D.arrow(col[0] + w, 49, col[1], 49, { width: 2 }) + D.arrow(col[1] + w, 49, col[2], 49, { width: 2 });
  b += n(col[2], 146, w, 56, "Blood glucose is back\nat the set point", C.fillGrey);
  b += D.arrow(col[2] + w / 2, 84, col[2] + w / 2, 144, { width: 2, stroke: C.blue });
  b += n(col[0], 278, w, h, "Blood glucose falls\nbelow the set point", C.fillAmber);
  b += n(col[1], 278, w, h, "Pancreas secretes\nglucagon", C.fillBlue);
  b += n(col[2], 278, w, h, "Liver breaks glycogen\ndown to glucose and\nreleases it into the blood", C.fillGreen);
  b += D.arrow(col[0] + w, 313, col[1], 313, { width: 2 }) + D.arrow(col[1] + w, 313, col[2], 313, { width: 2 });
  b += D.arrow(col[2] + w / 2, 278, col[2] + w / 2, 204, { width: 2, stroke: C.blue });
  b += D.text(14, 170, "Negative feedback:", { size: 15, weight: 700 }) + D.text(14, 192, "the response works against", { size: 14 }) + D.text(14, 210, "the change and returns the", { size: 14 }) + D.text(14, 228, "level to the set point.", { size: 14 });
  const alt = "Negative feedback controlling blood glucose: if glucose rises above the set point the pancreas secretes more insulin, the liver turns glucose into glycogen and cells take up glucose so the level falls back; if it falls below the set point the pancreas secretes glucagon and the liver breaks glycogen down to glucose so the level rises back to the set point.";
  await add("blood-glucose-feedback", D.svg(640, 370, b), alt, "Figure: negative feedback keeps the blood glucose concentration near its set point", "homeostasis/blood-glucose", "If the concentration falls below the set point");
}

// ---------- 3. Malaria life cycle
{
  let b = "";
  const n = (x, y, w, h, t, f) => D.node(x, y, w, h, t, { fill: f, size: 13 });
  const w = 138, h = 74, xs = [10, 168, 326, 484];
  b += n(xs[0], 30, w, h, "1  Infected female\nAnopheles bites;\nparasites injected", C.fillAmber);
  b += n(xs[1], 30, w, h, "2  Parasites travel\nto the liver and\nmultiply", C.fillBlue);
  b += n(xs[2], 30, w, h, "3  They invade red\nblood cells, multiply;\ncells burst: fever", C.fillBlue);
  b += n(xs[3], 30, w, h, "4  Some become\nsexual forms that\nstay in the blood", C.fillBlue);
  for (let i = 0; i < 3; i += 1) b += D.arrow(xs[i] + w, 67, xs[i + 1], 67, { width: 2 });
  b += D.arrow(xs[3] + w / 2, 104, xs[3] + w / 2, 194, { width: 2 });
  b += n(xs[3], 196, w, h, "5  Another female\nmosquito bites and\nsucks up the forms", C.fillAmber);
  b += n(xs[2], 196, w, h, "6  Parasites reproduce\ninside the mosquito", C.fillAmber);
  b += n(xs[1], 196, w, h, "7  They move to the\nmosquito's salivary\nglands", C.fillAmber);
  b += D.arrow(xs[3], 233, xs[2] + w, 233, { width: 2 }) + D.arrow(xs[2], 233, xs[1] + w, 233, { width: 2 });
  b += D.path_(`M${xs[1]},233 L${xs[0] + w / 2},233 L${xs[0] + w / 2},106`, { stroke: C.ink, width: 2, arrow: true });
  b += D.text(xs[0], 160, "then bites the next person", { size: 13, fill: C.muted }).replace(`x="${xs[0]}"`, `x="${xs[0] + 76}"`);
  b += D.text(14, 18, "In the person", { size: 13, weight: 700, fill: C.blue }) + D.text(xs[1], 296, "In the mosquito", { size: 13, weight: 700, fill: C.amber }).replace(`x="${xs[1]}"`, `x="${xs[1]}"`);
  const alt = "Life cycle of the malaria parasite Plasmodium: an infected female Anopheles mosquito injects parasites that multiply in the liver, then in red blood cells which burst causing fever; sexual forms stay in the blood, another mosquito sucks them up, they reproduce in the mosquito and move to its salivary glands, ready to infect the next person.";
  await add("malaria-life-cycle", D.svg(640, 320, b), alt, "Figure: the life cycle of the malaria parasite in a person and in the Anopheles mosquito", "disease/malaria", "## The life cycle in outline");
}
