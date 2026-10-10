import { table, pctChange, dpStr } from "../lib.mjs";
const sites = ["200 m upstream", "At the panning site", "500 m downstream", "2 km downstream", "5 km downstream"];
const turb = [12, 310, 185, 96, 40];
const may = [9, 0, 1, 3, 6];
console.log(table(["Sampling point", "Turbidity / NTU", "Number of mayfly nymph taxa"], sites.map((s, i) => [s, turb[i], may[i]])));
const a0 = 1240, a1 = 868;
console.log("forest loss", dpStr(pctChange(a0, a1), 1), a0 - a1);
