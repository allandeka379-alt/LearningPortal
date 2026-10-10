import { cardiacOutput, chk, table } from "../lib.mjs";
const T = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
const LA = [1.0, 1.5, 0.6, 0.7, 0.9, 1.0, 0.9, 0.9, 1.0];
const LV = [0.8, 1.2, 15.0, 16.0, 8.0, 0.6, 0.6, 0.7, 0.8];
const AO = [11.0, 10.7, 14.5, 15.5, 13.2, 12.6, 12.0, 11.5, 11.0];
console.log(table(["Time / s", ...T.map((x) => x.toFixed(1))], [["Left atrium / kPa", ...LA.map((x) => x.toFixed(1))], ["Left ventricle / kPa", ...LV.map((x) => x.toFixed(1))], ["Aorta / kPa", ...AO.map((x) => x.toFixed(1))]]));
T.forEach((t, i) => console.log(t.toFixed(1), "AV", LA[i] > LV[i] ? "open" : "closed", "SL", LV[i] > AO[i] ? "open" : "closed"));
console.log("HR", chk(60 / 0.8, 75), "CO", chk(cardiacOutput(70, 72), 5040));
