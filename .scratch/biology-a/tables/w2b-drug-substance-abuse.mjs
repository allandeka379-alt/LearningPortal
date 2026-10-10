// W2b lesson numbers: drug and substance abuse.
import { chk, dpStr, sfStr, table } from "../lib.mjs";
// Worked: ethanol in drinks
const vol = 750, abv = 5; // a 750 cm3 bottle of 5% beer
const eth = vol * abv / 100;
const mass = eth * 0.79;
console.log("ethanol cm3", eth, "mass g", mass, sfStr(mass, 3), "standard drinks (10 g)", mass / 10);
// Example: reaction time (hypothetical)
const units = [0, 2, 4, 6];
const rt = [0.24, 0.27, 0.33, 0.41];
console.log(table(["Ethanol drunk / standard drinks", ...units.map(String)], [["Mean reaction time / s", ...rt.map((x) => x.toFixed(2))]]));
console.log("pct increase 0->6", (rt[3] - rt[0]) / rt[0] * 100);
