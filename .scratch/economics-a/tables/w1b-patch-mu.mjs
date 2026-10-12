import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-marginal-utility.mjs";
const lines = fs.readFileSync(p, "utf8").split("\n");
const neu = String.raw`    const best = utility.bestBundle({ budget: 20, px: 4, py: 2, muX: [44, 36, 28, 20, 12], muY: [20, 16, 15, 11, 7, 3] });
    chk(best.x, 3, 0); chk(best.y, 4, 0); chk(best.totalUtility, 170, 0); chk(best.left, 0, 0);
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: best.y, unit: "units", hints: ["Buy the unit with the highest MU per dollar each time, until the budget runs out."],
      stem: "A consumer has US\\$20. Good X costs US\\$4 with marginal utilities 44, 36, 28, 20, 12 for units 1 to 5. Good Y costs US\\$2 with marginal utilities 20, 16, 15, 11, 7, 3 for units 1 to 6. How many units of Y are in the utility-maximising bundle?",
      wrong: [3, 5, 6],
      explanation: ` + "`MU per dollar: X = 11, 9, 7, 5, 3; Y = 10, 8, 7.5, 5.5, 3.5, 1.5. Buy in order X1 (11), Y1 (10), X2 (9), Y2 (8), Y3 (7.5), X3 (7), Y4 (5.5): total US\\\\$20. Bundle: ${best.x} X and ${best.y} Y.` });" + String.raw`
    b.num({ d: 4, skill: "ANALYSIS", kind: "plain", value: best.totalUtility, hints: ["Add the marginal utilities of the units bought."],
      stem: "Using the same data (US\\$20; X costs US\\$4 with MU 44, 36, 28, 20, 12; Y costs US\\$2 with MU 20, 16, 15, 11, 7, 3), calculate the total utility of the best bundle of 3 units of X and 4 units of Y.",
      wrong: [108, 62, 340],
      explanation: ` + "`TU = (44 + 36 + 28) + (20 + 16 + 15 + 11) = 108 + 62 = ${best.totalUtility}.` });";
lines.splice(72, 10, ...neu.split("\n"));
fs.writeFileSync(p, lines.join("\n"));
console.log("ok");
