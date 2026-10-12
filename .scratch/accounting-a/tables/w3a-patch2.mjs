import fs from "node:fs";
const BS = String.fromCharCode(92);
const U = "US" + BS + BS + "$";
const p = ".scratch/accounting-a/slices/w3a-company-changes-in-equity.mjs";
let s = fs.readFileSync(p, "utf8");
const rep = [
  [`only moves ${U}30,000 from reserves`, `only moves ${U}31,000 from reserves`],
  [`["The revaluation reserve must be used", `, `["The revaluation reserve must always be used first", `],
  [`ok: ["A bonus issue paid from the share premium"`, `ok: ["A bonus issue from the share premium"`],
  [`["An increase in the general reserve", `, `["An increase in the general reserve account", `],
  [`["A deduction from retained earnings", "It would be deducted only if declared before the year end."]`, `["A deduction from retained earnings for the year", "It would be deducted only if declared before the year end."]`],
  [`["A deduction from share capital", `, `["A deduction from the share capital account", `],
];
for (const [a, b] of rep) {
  if (!s.includes(a)) console.log("MISSING:", a.slice(0, 60));
  s = s.split(a).join(b);
}
fs.writeFileSync(p, s);
