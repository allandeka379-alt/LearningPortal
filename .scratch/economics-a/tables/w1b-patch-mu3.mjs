import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-marginal-utility.mjs";
let s = fs.readFileSync(p, "utf8");
const R = (a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  s = s.split(a).join(b);
};
R("muX: [40, 32, 24, 12], muY: [18, 14, 13, 9, 5, 1] });", "muX: [40, 32, 24, 8], muY: [19, 17, 15, 10, 6, 1] });");
R("chk(best2.totalUtility, 126, 0);", "chk(best2.totalUtility, 133, 0);");
R("24, 12; Y, units 1 to 6: 18, 14, 13, 9, 5, 1.", "24, 8; Y, units 1 to 6: 19, 17, 15, 10, 6, 1.");
R("wrong: [72, 54, 144],", "wrong: [72, 61, 266],");
R("MU per dollar: X = 10, 8, 6, 3; Y = 9, 7, 6.5, 4.5, 2.5, 0.5. Buy X1 (10), Y1 (9), X2 (8), Y2 (7), Y3 (6.5): US\\\\$14; X3 costs US\\\\$4 and cannot be bought, so buy Y4 (4.5) with the last US\\\\$2. Bundle: ${best2.x} X and ${best2.y} Y. TU = (40 + 32) + (18 + 14 + 13 + 9) = 72 + 54 = ${best2.totalUtility}.", "MU per dollar: X = 10, 8, 6, 2; Y = 9.5, 8.5, 7.5, 5, 3, 0.5. Buy X1 (10), Y1 (9.5), Y2 (8.5), X2 (8), Y3 (7.5): US\\\\$14; X3 costs US\\\\$4 and cannot be bought, so buy Y4 (5) with the last US\\\\$2. Bundle: ${best2.x} X and ${best2.y} Y. TU = (40 + 32) + (19 + 17 + 15 + 10) = 72 + 61 = ${best2.totalUtility}.");
fs.writeFileSync(p, s);
console.log("ok");
