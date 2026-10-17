// Motivation, leadership, management style, communication flows.
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, place } from "./lib.mjs";

// ---- 1. Maslow's hierarchy beside Herzberg's factors ----
{
  const W = 620, H = 380;
  const levels = ["Self-actualisation", "Esteem", "Social (belonging)", "Safety", "Physiological"]; // top to bottom
  const ex = ["challenging projects", "recognition, status", "teamwork, friends", "permanent contract", "wage, rest breaks"];
  const rowH = 62, y0 = 18, cx = 175;
  let b = "";
  levels.forEach((n, i) => {
    const w = 140 + i * 48;
    const y = y0 + i * rowH;
    const motiv = i < 2;
    b += D.rect(cx - w / 2, y, w, rowH - 6, { fill: motiv ? C.fillAmber : C.fillBlue, stroke: C.axis, width: 1.6, r: 4 });
    b += D.text(cx, y + 24, n, { anchor: "middle", size: 14, weight: 700 });
    b += D.text(cx, y + 42, ex[i], { anchor: "middle", size: 12, fill: C.muted });
  });
  b += D.text(cx, H - 8, "Maslow: lowest unmet need first (bottom to top)", { anchor: "middle", size: 12, fill: C.muted });
  // brackets
  const bx = 345;
  const top1 = y0, bot1 = y0 + 2 * rowH - 10, top2 = y0 + 2 * rowH, bot2 = y0 + 5 * rowH - 10;
  const bracket = (a, z, col) => D.polyline([[bx, a], [bx + 12, a], [bx + 12, z], [bx, z]], { stroke: col, width: 2.4 });
  b += bracket(top1, bot1, C.amber) + bracket(top2, bot2, C.blue);
  b += D.text(bx + 24, (top1 + bot1) / 2 - 24, "Motivators (Herzberg)", { size: 14, weight: 700, fill: C.amber });
  b += D.text(bx + 24, (top1 + bot1) / 2 - 6, "achievement, recognition,\ninteresting work, responsibility,\nadvancement, growth", { size: 13 });
  b += D.text(bx + 24, (top2 + bot2) / 2 - 36, "Hygiene factors (Herzberg)", { size: 14, weight: 700, fill: C.blue });
  b += D.text(bx + 24, (top2 + bot2) / 2 - 18, "pay, working conditions, policy,\nsupervision, job security,\nrelations with colleagues", { size: 13 });
  b += D.text(bx + 24, (top2 + bot2) / 2 + 42, "Social needs fit only partly.\nMissing: dissatisfaction.\nPresent: no extra effort.", { size: 13, fill: C.muted });
  b += D.text(bx + 24, (top1 + bot1) / 2 + 60, "Present: motivation.", { size: 13, fill: C.muted });
  const alt = "Maslow's five levels of need (physiological, safety, social at the bottom; esteem and self-actualisation above) set beside Herzberg's factors: the lower levels resemble hygiene factors such as pay, security and relations, which prevent dissatisfaction but do not motivate, while esteem and self-actualisation resemble motivators such as achievement, recognition and growth.";
  const cap = "Figure: Maslow's hierarchy compared with Herzberg's hygiene factors and motivators";
  await D.figure(FAM, "maslow-herzberg-comparison", D.svg(W, H, b), { alt, caption: cap });
  place(L("motivation/needs-maslow-herzberg"), "Maslow's lower levels (physiological, safety and, partly, social) resemble", D.md("maslow-herzberg-comparison", alt, cap));
}

// ---- 2. Blake and Mouton grid with the four managers ----
{
  const mgrs = [["Mr Banda", 9, 2, "end"], ["Ms Chikwanha", 2, 9, "start"], ["Mr Dube", 8, 8, "end"], ["Ms Esau", 1, 1, "start"]]; // name, production, people
  const W = 600, H = 480;
  const ax = D.axes({ x: [0, 10], y: [0, 10], w: W, h: H, xTicks: D.range(1, 9, 1), yTicks: D.range(1, 9, 1), xLabel: "Concern for production (task)", yLabel: "Concern for people", pad: { l: 60, r: 24, t: 34, b: 56 } });
  let b = ax.frame;
  const style = (x, y, s, anchor, dy = 0) => ax.label(x, y, s, { anchor, size: 13, fill: C.muted, italic: true, dy });
  b += style(0.2, 9.75, "Country club (1,9)", "start") + style(9.8, 9.75, "Team management (9,9)", "end");
  b += style(0.2, 0.35, "Impoverished (1,1)", "start") + style(9.8, 0.35, "Authority-compliance (9,1)", "end");
  b += ax.point(5, 5, { r: 6, fill: "#fff", stroke: C.muted }) + ax.label(5, 5, "Middle of the road (5,5)", { anchor: "middle", dy: -14, size: 13, fill: C.muted, italic: true });
  for (const [n, px, py, an] of mgrs) {
    b += ax.point(px, py, { r: 6.5, stroke: C.blue });
    b += ax.label(px, py, `${n} (${px},${py})`, { anchor: an, dx: an === "end" ? -12 : 12, dy: 5, size: 13, weight: 700, fill: C.blue });
  }
  const alt = "Blake and Mouton managerial grid with concern for production across and concern for people up: Mr Banda (9,2) is close to authority-compliance, Ms Chikwanha (2,9) close to country club, Mr Dube (8,8) close to team management, and Ms Esau (1,1) is impoverished; only Mr Dube combines high concern for both.";
  const cap = "Figure: the four printing managers placed on the Blake and Mouton grid";
  await D.figure(FAM, "blake-mouton-grid", D.svg(W, H, b), { alt, caption: cap });
  place(L("leadership/theories-eq"), "| Ms Esau | 1 | 1 |", D.md("blake-mouton-grid", alt, cap), { block: true });
}

// ---- 3. Style continuum ----
{
  const W = 620, H = 270;
  const st = [["Autocratic", "manager decides\nalone"], ["Paternalistic", "manager decides,\nwith care for staff"], ["Consultative", "manager asks,\nthen decides"], ["Participative", "group decides\ntogether"], ["Laissez-faire", "employees decide\nfor themselves"]];
  const bw = 112, gap = 12, x0 = 10;
  let b = "";
  b += D.arrow(x0 + 5 * bw + 4 * gap, 34, x0, 34, { stroke: C.amber, width: 2.4 });
  b += D.text(x0 + 4, 22, "Manager keeps control", { size: 13, weight: 700, fill: C.amber });
  b += D.arrow(x0, 232, x0 + 5 * bw + 4 * gap, 232, { stroke: C.blue, width: 2.4 });
  b += D.text(x0 + 5 * bw + 4 * gap, 256, "Employees gain freedom", { anchor: "end", size: 13, weight: 700, fill: C.blue });
  st.forEach(([n, d], i) => {
    const x = x0 + i * (bw + gap);
    b += D.node(x, 62, bw, 50, n, { fill: i < 2 ? C.fillAmber : i === 4 ? C.fillBlue : C.fillGreen, size: 13, weight: 700 });
    b += D.text(x + bw / 2, 136, d, { anchor: "middle", size: 13 });
  });
  b += D.text(x0 + 5 * bw + 4 * gap, 196, "Democratic = consultative and participative", { anchor: "end", size: 12, fill: C.muted });
  const alt = "Continuum of management styles from autocratic (manager decides alone) through paternalistic (manager decides with care for staff), consultative (manager asks then decides) and participative (group decides together) to laissez-faire (employees decide for themselves): manager control falls and employee freedom rises along the line.";
  const cap = "Figure: the styles of management as a continuum from manager control to employee freedom";
  await D.figure(FAM, "management-style-continuum", D.svg(W, H, b), { alt, caption: cap });
  place(L("management/styles-mcgregor"), "**Choosing a style.**", D.md("management-style-continuum", alt, cap));
}

// ---- 4. Communication flows ----
{
  const W = 600, H = 400;
  let b = "";
  const box = (x, y, w, s, f) => D.node(x, y, w, 44, s, { fill: f ?? C.fillBlue, size: 13 });
  b += box(220, 14, 160, "Managing director", C.fillAmber);
  b += box(50, 124, 170, "Production manager");
  b += box(380, 124, 170, "Sales manager");
  b += box(50, 234, 170, "Production staff", C.fillGrey);
  b += box(380, 234, 170, "Sales staff", C.fillGrey);
  // downward (blue) and upward (amber), parallel pairs
  b += D.arrow(255, 58, 175, 124, { stroke: C.blue, width: 2.2 }) + D.arrow(145, 124, 225, 58, { stroke: C.amber, width: 2.2 });
  b += D.arrow(345, 58, 425, 124, { stroke: C.blue, width: 2.2 }) + D.arrow(455, 124, 375, 58, { stroke: C.amber, width: 2.2 });
  b += D.arrow(100, 168, 100, 234, { stroke: C.blue, width: 2.2 }) + D.arrow(170, 234, 170, 168, { stroke: C.amber, width: 2.2 });
  b += D.arrow(430, 168, 430, 234, { stroke: C.blue, width: 2.2 }) + D.arrow(500, 234, 500, 168, { stroke: C.amber, width: 2.2 });
  b += D.line(222, 146, 378, 146, { stroke: C.ink, width: 2.2, arrow: true, arrowStart: true });
  b += D.text(300, 138, "Horizontal", { anchor: "middle", size: 13, weight: 700 });
  b += D.text(300, 170, "agree a delivery date", { anchor: "middle", size: 12, fill: C.muted });
  // legend
  const ly = 312;
  b += D.arrow(30, ly, 80, ly, { stroke: C.blue, width: 2.2 }) + D.text(92, ly + 5, "Downward: instructions, targets, feedback on performance", { size: 13 });
  b += D.arrow(80, ly + 28, 30, ly + 28, { stroke: C.amber, width: 2.2 }) + D.text(92, ly + 33, "Upward: reports, suggestions, complaints, results", { size: 13 });
  b += D.line(30, ly + 56, 80, ly + 56, { stroke: C.ink, width: 2.2, arrow: true, arrowStart: true }) + D.text(92, ly + 61, "Horizontal: between people or departments at the same level", { size: 13 });
  const alt = "Directions of communication in a hierarchy: downward arrows carry instructions, targets and feedback from the managing director through managers to staff; upward arrows carry reports, suggestions and results; a horizontal arrow links the production and sales managers at the same level, for example to agree a delivery date.";
  const cap = "Figure: downward, upward and horizontal communication in an organisation";
  await D.figure(FAM, "communication-flows", D.svg(W, H, b), { alt, caption: cap });
  place(L("communication/channels-barriers"), "Horizontal communication flows **between people at the same level**", D.md("communication-flows", alt, cap));
}
