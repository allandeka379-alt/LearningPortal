import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-marginal-utility.mjs";
let s = fs.readFileSync(p, "utf8");
const R = (a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  s = s.split(a).join(b);
};
R("const tu = [14, 26, 36, 44];", "const tu = [13, 25, 35, 43];");
R("is 14, 26, 36 and 44. Calculate", "is 13, 25, 35 and 43. Calculate");
R("wrong: [44, 11, 10],", "wrong: [43, 10.75, 10],");
R("MU = 44 − 36 = ${mu[3]}. Quoting the total utility (44) or the average (11) is a common slip.", "MU = 43 − 35 = ${mu[3]}. Quoting the total utility (43) or the average (10.75) is a common slip.");
// q11: separate data set
const i = s.indexOf("    b.num({ d: 4, skill: \"ANALYSIS\", kind: \"plain\", value: best.totalUtility");
const j = s.indexOf("\n  }", i);
const neu = String.raw`    const best2 = utility.bestBundle({ budget: 16, px: 4, py: 2, muX: [40, 32, 24, 12], muY: [18, 14, 13, 9, 5, 1] });
    chk(best2.x, 2, 0); chk(best2.y, 4, 0); chk(best2.totalUtility, 126, 0); chk(best2.left, 0, 0);
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: best2.totalUtility, hints: ["Rank every unit by MU per dollar, then buy until the budget is spent."],
      stem: "A consumer has US\\$16 to spend on good X (US\\$4 each) and good Y (US\\$2 each). The marginal utilities are: X, units 1 to 4: 40, 32, 24, 12; Y, units 1 to 6: 18, 14, 13, 9, 5, 1. Calculate the total utility of the utility-maximising bundle.",
      wrong: [72, 54, 144],
      explanation: ` + "`MU per dollar: X = 10, 8, 6, 3; Y = 9, 7, 6.5, 4.5, 2.5, 0.5. Buy X1 (10), Y1 (9), X2 (8), Y2 (7), Y3 (6.5): US\\\\$14; X3 costs US\\\\$4 and cannot be bought, so buy Y4 (4.5) with the last US\\\\$2. Bundle: ${best2.x} X and ${best2.y} Y. TU = (40 + 32) + (18 + 14 + 13 + 9) = 72 + 54 = ${best2.totalUtility}.` });";
s = s.slice(0, i) + neu + s.slice(j);
fs.writeFileSync(p, s);
console.log("ok");
