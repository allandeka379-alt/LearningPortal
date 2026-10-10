// W3a lesson numbers for homeostasis/principles.md
import { table, chk, pctChange, dpStr } from "../lib.mjs";
const t = [0, 30, 60, 90, 120, 150];
const g = [5.0, 7.5, 6.6, 5.6, 5.0, 4.9];
console.log(table(["Time after meal / min", ...t.map(String)], [["Blood glucose / mmol dm⁻³", ...g.map((x) => x.toFixed(1))]]));
const pc = pctChange(g[0], g[1]);
console.log("pc", pc); chk(pc, 50);
const fall = (g[1] - g[4]) / (t[4] - t[1]);
console.log("rate of fall", dpStr(fall, 3));
// core vs skin temp in hot afternoon
const time = ["06:00", "09:00", "12:00", "15:00", "18:00"];
const air = [22, 30, 36, 38, 31];
const skin = [32.0, 33.5, 35.0, 35.5, 34.0];
const core = [36.8, 37.0, 37.1, 37.2, 37.0];
console.log(table(["Time", ...time], [["Air temperature / °C", ...air.map(String)], ["Skin temperature / °C", ...skin.map((x) => x.toFixed(1))], ["Core temperature / °C", ...core.map((x) => x.toFixed(1))]]));
