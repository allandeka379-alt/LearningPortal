import { mean, pct, round, table, fmtNum } from "../lib.mjs";
// Worked example 1: farm in eastern Mashonaland, six seasons
const seasons = [["2019/20", 812], ["2020/21", 905], ["2021/22", 768], ["2022/23", 870], ["2023/24", 694], ["2024/25", 931]];
console.log(table(["Season", "Rainfall (mm)"], seasons.map(([s, r]) => [s, fmtNum(r)])));
const m = mean(seasons.map((s) => s[1]));
console.log("sum", seasons.reduce((a, s) => a + s[1], 0), "mean", m, round(m, 0));
const above750 = seasons.filter((s) => s[1] >= 750).length;
console.log("seasons >=750", above750, pct(above750, seasons.length));
