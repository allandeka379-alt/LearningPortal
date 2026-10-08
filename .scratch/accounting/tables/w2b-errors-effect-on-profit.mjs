import { sum, check, r2 } from "../lib.mjs";
import { correctedProfit, table } from "./w2b-lib.mjs";
// Example 1: Nyasha
const p1 = correctedProfit("Nyasha Mlilo: Statement of corrected profit for the year ended 31 December 2025", 14260, [
  ["Sales journal undercast", 400],
  ["Shelving wrongly debited to purchases", 850],
  ["Wages not posted", -300],
]);
check("p1", p1.corrected, 15210);
console.log("@@P1");
console.log(p1.md);
const gp = sum([400, -120, 850, -240]);
check("gp", gp, 890);
console.log("@@GP");
console.log(table(["Error", "Effect on gross profit US\\$", "Effect on profit for the year US\\$"], [
  ["1 Sales journal undercast", "+400", "+400"],
  ["2 Carriage inwards debited to carriage outwards", "(120)", "nil"],
  ["3 Shelving debited to purchases", "+850", "+850"],
  ["4 Wages not posted", "nil", "(300)"],
  ["5 Receipt credited to the wrong customer", "nil", "nil"],
  ["6 Rent received credited to sales", "(240)", "nil"],
  ["**Total**", `**+${gp}**`, `**+${r2(400 + 850 - 300)}**`],
]));
// Example 2: Rudo
const p2 = correctedProfit("Rudo Sithole: Statement of corrected profit for the year ended 31 December 2025", 9870, [
  ["Closing inventory undervalued", 380],
  ["Drawings wrongly debited to wages", 200],
  ["Purchase invoice omitted", -1240],
]);
check("p2", p2.corrected, 9210);
console.log("@@P2");
console.log(p2.md);
console.log("@@SOFP");
const rec = r2(4315 - 650), pay = r2(2760 + 1240), inv = r2(3145 + 380);
console.log(table(["Item", "Draft US\\$", "Adjustment US\\$", "Corrected US\\$"], [
  ["Inventory", 3145, "+380", inv],
  ["Trade receivables", 4315, "(650)", rec],
  ["Trade payables", 2760, "+1,240", pay],
  ["Drawings", 5400, "+200", 5600],
]));
