// Tables for lessons/labour/occupation-choice.md (W2b).
import { table, sum, check, money } from "../lib.mjs";
// Worked example 1: two job offers to Nyasha (monthly, US$).
const A = { basic: 620, housing: 0, transport: 60, medical: 45 };
const B = { basic: 540, housing: 150, transport: 0, medical: 0 };
const tA = sum(Object.values(A)), tB = sum(Object.values(B));
check("A", tA, 725);
check("B", tB, 690);
console.log(table(["Item (per month)", "Job A: bank clerk, Harare (US\\$)", "Job B: teacher, rural school (US\\$)"], [
  ["Basic wage", A.basic, B.basic],
  ["Free housing (value)", A.housing, B.housing],
  ["Transport allowance", A.transport, B.transport],
  ["Medical aid paid by employer", A.medical, B.medical],
  ["**Total package**", `**${tA}**`, `**${tB}**`],
]));
console.log(money(tA - tB), money((tA - tB) * 12));
// Worked example 2: overtime and commission make up gross pay.
const hours = 45, rate = 4, otHours = 6, otRate = rate * 1.5;
const weekly = hours * rate + otHours * otRate;
check("weekly", weekly, 216);
console.log(weekly, otRate);
