import { ecell, dpStr } from "../lib.mjs";
console.log("Zn/Cu", dpStr(ecell(0.34, -0.76), 2));
console.log("Fe3+/I-", dpStr(ecell(0.77, 0.54), 2), "Fe3+/Br-", dpStr(ecell(0.77, 1.07), 2));
console.log("Mg/Ag", dpStr(ecell(0.80, -2.38), 2));
