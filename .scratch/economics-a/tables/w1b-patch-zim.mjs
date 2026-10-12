import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-zimsec.mjs";
const lines = fs.readFileSync(p, "utf8").split("\n");
const start = 18; // line 19
const end = 48; // through line 48 (exclusive index 48)
let block = lines.slice(start, end).join("\n");
const D = String.raw`US\\$`;
const pairs = [
  ["p1: 2.0, p2: 2.5, q1: 800, q2: 680", "p1: 2.4, p2: 3.0, q1: 900, q2: 810"],
  ["chk(ped, -0.6, 1e-9);", "chk(ped, -0.4, 1e-9);"],
  ["prices: [2.0, 2.5, 3.0], qd: [800, 680, 560], qs: [560, 680, 800]", "prices: [2.4, 3.0, 3.6], qd: [900, 810, 720], qs: [630, 810, 990]"],
  ["chk(s.equilibrium.price, 2.5, 1e-9);", "chk(s.equilibrium.price, 3.0, 1e-9);"],
  ["const shortage = 800 - 560;", "const shortage = 900 - 630;"],
  ["p1: 2.0, p2: 2.5, q1: 560, q2: 680", "p1: 2.4, p2: 3.0, q1: 630, q2: 810"],
  [`"2.00", "2.50"], ["Quantity bought (thousand litres per month)", "800", "680"]`, `"2.40", "3.00"], ["Quantity bought (thousand litres per month)", "900", "810"]`],
  ["wrong: [0.6, -1.67, -0.15],", "wrong: [0.4, -2.5, -0.1],"],
  ["% change in price = (2.50 − 2.00) ÷ 2.00 × 100 = +25%. % change in quantity = (680 − 800) ÷ 800 × 100 = −15%. PED = −15 ÷ 25 = −0.60.", "% change in price = (3.00 − 2.40) ÷ 2.40 × 100 = +25%. % change in quantity = (810 − 900) ÷ 900 × 100 = −10%. PED = −10 ÷ 25 = −0.40."],
  ["wrong: [560, 800, 120],", "wrong: [630, 900, 180],"],
  ["quantity demanded is 800 and quantity supplied is 560, so the shortage is 800 − 560 = 240 thousand litres.", "quantity demanded is 900 and quantity supplied is 630, so the shortage is 900 − 630 = 270 thousand litres."],
  ["wrong: [1.17, 0.21, 0.5],", "wrong: [0.88, 0.29, 1.5],"],
  ["% change in quantity supplied = (680 − 560) ÷ 560 × 100 = +21.4%. PES = 21.43 ÷ 25 = 0.86.", "% change in quantity supplied = (810 − 630) ÷ 630 × 100 = +28.6%. PES = 28.57 ÷ 25 = 1.14."],
  ["Quantity supplied falls to 560 as the price is held below equilibrium", "Quantity supplied falls to 630 as the price is held below equilibrium"],
  ["Shortage of 240: consumers", "Shortage of 270: consumers"],
  ["(from 1,700 to 1,120 thousand US\\\\$)", "(from 2,430 to 1,512 thousand US\\\\$)"],
  ["producers supply only 560 thousand litres, below the 680 thousand at equilibrium, while consumers want 800.", "producers supply only 630 thousand litres, below the 810 thousand at equilibrium, while consumers want 900."],
  ["The resulting shortage of 240 thousand litres", "The resulting shortage of 270 thousand litres"],
  ["from US\\\\$1.70 million to US\\\\$1.12 million a month", "from US\\\\$2.43 million to US\\\\$1.51 million a month"],
  ["Against: creates a shortage (240 thousand litres).", "Against: creates a shortage (270 thousand litres)."],
  ["the quantity supplied (560) would be well below the quantity demanded (800), so a shortage of 240 thousand litres", "the quantity supplied (630) would be well below the quantity demanded (900), so a shortage of 270 thousand litres"],
  ["demand is inelastic (PED of −0.6)", "demand is inelastic (PED of −0.4)"],
  ["Year 1 a litre of cooking oil cost US\\\\$2.00 in the shops of Gweru and Bulawayo and households bought 800 thousand litres a month.", "Year 1 a litre of cooking oil cost US\\\\$2.40 in the shops of Gweru and Bulawayo and households bought 900 thousand litres a month."],
  ["By Year 2 the price had risen to US\\\\$2.50 a litre and households were buying 680 thousand litres a month.", "By Year 2 the price had risen to US\\\\$3.00 a litre and households were buying 810 thousand litres a month."],
  ["PED −0.60; shortage 240 thousand litres at US$2.00; PES 0.86;", "PED −0.40; shortage 270 thousand litres at US\\\\$2.40; PES 1.14;"],
];
for (const [a, b] of pairs) {
  if (!block.includes(a)) throw new Error("not found: " + a.slice(0, 80));
  block = block.split(a).join(b);
}
// remaining prices in text
block = block.split(D + "2.00").join(D + "2.40").split(D + "2.50").join(D + "3.00");
lines.splice(start, end - start, ...block.split("\n"));
fs.writeFileSync(p, lines.join("\n"));
console.log("patched");
