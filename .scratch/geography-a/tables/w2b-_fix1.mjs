import fs from "node:fs";
const rep = (f, pairs) => { let s = fs.readFileSync(f, "utf8"); for (const [a, b] of pairs) { if (!s.includes(a)) console.log("MISSING:", a.slice(0, 60)); s = s.replace(a, b); } fs.writeFileSync(f, s); };
rep("content/subjects/geography-a/lessons/energy/zimbabwe-clean-green.md", [
  ["system losses mean only 70% of the panel", "system losses mean only 75% of the panel"],
  ["$255 \div (5 \times 0.7) = 72.9$ W.", "$255 \div (5 \times 0.75) = 68$ W."],
  ["$80 \times 5 \times 0.7 = 280$ Wh a day", "$80 \times 5 \times 0.75 = 300$ Wh a day"],
]);
rep(".scratch/geography-a/slices/w2b-energy-zimbabwe-clean-green.mjs", [
  ['const panelW = rnd(hhWh / (5 * 0.7), 1, 72.9, "panelW");', 'const panelW = chk(hhWh / (5 * 0.75), 68);'],
  ["const output80 = chk(80 * 5 * 0.7, 280);", "const output80 = chk(80 * 5 * 0.75, 300);"],
  ['const clPanel = rnd(clWh / (5 * 0.7), 1, 217.1, "clPanel");', 'const clPanel = rnd(clWh / (5 * 0.75), 1, 202.7, "clPanel");'],
  ["5 peak sun hours a day and 70% of the panel's rating is usable. Calculate the minimum panel size needed, in watts, to 1 decimal place.", "5 peak sun hours a day and 75% of the panel's rating is usable. Calculate the minimum panel size needed, in watts."],
  ["calculator: true, dp: 1,\n    stem: \"A household uses 255 Wh", "calculator: true,\n    stem: \"A household uses 255 Wh"],
  ["255 ÷ (5 × 0.7) = 255 ÷ 3.5 = **72.9 W**. Ignoring the 70% usable fraction gives 51 W, which is too small.", "255 ÷ (5 × 0.75) = 255 ÷ 3.75 = **68 W**. Ignoring the 75% usable fraction gives 51 W, which is too small."],
  ["wrong: [51, 102]", "wrong: [51, 85]"],
  ["and 70% of the panel's rating is usable.`", "and 75% of the panel's rating is usable.`"],
  ["760 ÷ (5 × 0.7) = 760 ÷ 3.5 = 217.1 W.", "760 ÷ (5 × 0.75) = 760 ÷ 3.75 = 202.7 W."],
  ["wrong: [152, 380]", "wrong: [152, 217.1]"],
  ["panel 255/(5 x 0.7) = 72.9 W; 80 W gives 280 Wh;", "panel 255/(5 x 0.75) = 68 W; 80 W gives 300 Wh;"],
  ["panel 217.1 W;", "panel 202.7 W;"],
]);
