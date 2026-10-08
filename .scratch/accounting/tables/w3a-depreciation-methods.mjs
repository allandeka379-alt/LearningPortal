import { schedule, slRows, rbRows, table, U, check, sum, r2 } from "./w3a-lib.mjs";
// Ex1 straight line: cutting machine 18,000 residual 2,000, 4 years
const sl = slRows(18000, 2000, 4, 2022);
console.log(schedule(18000, sl).md);
// Ex2 reducing balance 25% on 24,000, 3 years
const rb = rbRows(24000, 25, 3, 2023);
console.log("\n" + schedule(24000, rb).md);
// Ex2b straight line on same van: 24,000 residual 6,000 over 4? comparison: SL charge for comparison 24000 residual 3000 / 4 = 5250
const sl2 = slRows(24000, 3000, 3, 2023); console.log(sl2);
// Ex3 revaluation: loose tools
const open = 2400, bought = 900, close = 2650;
const dep = r2(open + bought - close);
console.log(table(["Loose tools", U], [["Valuation at 1 January 2025", open], ["Add: Tools bought during the year", bought], ["", r2(open + bought)], ["Less: Valuation at 31 December 2025", -close], ["**Depreciation for the year**", `**${dep}**`]]));
check("dep", dep, 650);
