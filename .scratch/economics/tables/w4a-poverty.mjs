// Figures for lessons/development/poverty.md (W4a).
import { table, check } from "../lib.mjs";
// WE1: relative poverty line in a fictional town.
const median = 420, line = 0.6 * median;
const bands = [["Under US\\$150", 34], ["US\\$150 to US\\$251", 58], ["US\\$252 to US\\$419", 95], ["US\\$420 and over", 213]];
const total = bands.reduce((s, b) => s + b[1], 0), poor = bands[0][1] + bands[1][1];
console.log(table(["Monthly household income", "Number of households"], [...bands, ["**Total**", `**${total}**`]]));
console.log({ line, total, poor, share: (poor / total) * 100 });
check("line", line, 252);
// WE2: absolute poverty: cost of basic needs.
const food = 31, nonFood = 17, size = 6, income = 250;
const need = (food + nonFood) * size;
console.log({ perPerson: food + nonFood, need, gap: need - income });
check("need", need, 288);
