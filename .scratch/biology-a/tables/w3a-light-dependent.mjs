// W3a lesson numbers for photosynthesis/light-dependent.md
import { chk, table } from "../lib.mjs";
// Worked 1: electrons, water and oxygen for reducing NADP
const nadp = 6, ePerNadp = 2, ePerWater = 2, waterPerO2 = 2;
const e = nadp * ePerNadp, water = e / ePerWater, o2 = water / waterPerO2;
console.log({ e, water, o2 });
chk(o2, 3);
// Example: Hill reaction tubes (time for DCPIP to decolourise)
console.log(table(["Tube", "Contents", "Conditions", "Time for blue colour to disappear / min"], [
  ["A", "Chloroplast suspension + DCPIP", "Light", "6"],
  ["B", "Chloroplast suspension + DCPIP", "Dark (foil)", "No change after 30"],
  ["C", "Boiled chloroplast suspension + DCPIP", "Light", "No change after 30"],
  ["D", "Buffer + DCPIP (no chloroplasts)", "Light", "No change after 30"],
]));
