import { chk, table } from "../lib.mjs";
// Example 1: profit sharing 3:2 on 45,000
const profit = 45000;
const a = profit * 3 / 5, b = profit * 2 / 5; chk(a, 27000); chk(b, 18000); chk(a + b, profit);
// partner who works full time gets salary 6,000 first, remainder equally
const sal = 6000, rest = profit - sal; chk(rest / 2, 19500);
console.log(table(["Partner", "Salary (US\\$)", "Share of remainder (US\\$)", "Total (US\\$)"], [["Tendai", 0, rest / 2, rest / 2], ["Rudo", sal, rest / 2, sal + rest / 2], ["Total", sal, rest, profit]]));
// Example 2: unlimited liability
const assets = 38000, debts = 52000, personal = 30000;
console.log(debts - assets, personal - (debts - assets));
// limited liability comparison
