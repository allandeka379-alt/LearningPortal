import { hr, table, chk, r2 } from "../lib.mjs";
// Example 1
const open = 78, close = 82, leavers = 12;
const avg = hr.average(open, close);
const lt = hr.labourTurnover(leavers, avg);
const ret = hr.retention(leavers, avg);
console.log(avg, lt, ret);
chk(avg, 80); chk(lt, 15); chk(ret, 85);
// Example 2: workforce plan
const needed = 24, current = 20, expectedLeavers = r2(current * 0.15);
const supply = current - expectedLeavers;
console.log(expectedLeavers, supply, needed - supply);
console.log(table(["Item", "Number of staff"], [["Staff needed next year (forecast of output)", needed], ["Staff now", current], ["Expected leavers (15% labour turnover)", expectedLeavers], ["Expected supply at end of year", supply], ["Gap to be filled by recruitment", needed - supply]]));
