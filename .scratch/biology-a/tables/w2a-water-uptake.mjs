import { chk, table, dpStr } from "../lib.mjs";
// WE1: water potential = solute potential + pressure potential (kPa)
const cells = [["Soil water", -30, 0], ["Root hair cell", -620, 280], ["Cortex cell", -700, 300], ["Xylem sap", -150, -400]];
console.log(table(["Location", "Solute potential / kPa", "Pressure potential / kPa", "Water potential / kPa"], cells.map(([n, s, p]) => [n, s, p, s + p])));
// WE2: root pressure exudate
const vol = [0, 0.12, 0.25, 0.36, 0.48]; const hrs = [0, 2, 4, 6, 8];
console.log(table(["Time after cutting / h", ...hrs.map(String)], [["Volume of sap collected / cm³", ...vol.map((v) => v.toFixed(2))]]));
console.log("rate", chk(0.48 / 8, 0.06));
