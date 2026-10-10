// W2b lesson numbers: antibiotics (zone of inhibition).
import { chk, dpStr, sfStr, table } from "../lib.mjs";
const d = 18; // mm diameter of clear zone including 6 mm disc
const r = d / 2;
const area = Math.PI * r * r;
console.log("area", area, sfStr(area, 3));
const discs = [["Penicillin", 6], ["Tetracycline", 24], ["Streptomycin", 17]];
console.log(table(["Antibiotic disc", "Diameter of clear zone / mm"], discs.map(([a, x]) => [a, String(x)])));
