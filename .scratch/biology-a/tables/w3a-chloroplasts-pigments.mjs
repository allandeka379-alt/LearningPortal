// W3a lesson numbers for photosynthesis/chloroplasts-pigments.md
import { table, rf, dpStr, chk } from "../lib.mjs";
const front = 80;
const spots = [["Spot 1 (orange-yellow)", 76], ["Spot 2 (yellow)", 59], ["Spot 3 (blue-green)", 51], ["Spot 4 (yellow-green)", 36]];
console.log(table(["Spot", "Distance moved / mm", "Rf"], spots.map(([n, d]) => [n, d, dpStr(rf(d, front), 2)])));
// action spectrum vs absorption (illustrative, relative)
const wl = [400, 450, 500, 550, 600, 650, 700];
const abs = [70, 95, 40, 12, 20, 80, 10];
const act = [65, 90, 50, 25, 35, 85, 12];
console.log(table(["Wavelength / nm", ...wl.map(String)], [["Absorption by leaf pigments / %", ...abs.map(String)], ["Rate of photosynthesis / % of maximum", ...act.map(String)]]));
