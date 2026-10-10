import { capillaryVolume, chk, sfStr, dpStr, pctChange, mean, table } from "../lib.mjs";
const v = capillaryVolume(0.5, 42); console.log("WE1 volume mm3", v, sfStr(v, 3), "rate/min", v / 5, sfStr(v / 5, 3));
// WE2 conditions: distances moved in 5 min, 3 repeats
const still = [21, 23, 22], wind = [47, 44, 50];
console.log("means", mean(still), mean(wind), "pct", pctChange(mean(still), mean(wind)), dpStr(pctChange(mean(still), mean(wind)), 0));
const r = 0.5;
console.log("rates mm3/min", sfStr(capillaryVolume(r, mean(still)) / 5, 3), sfStr(capillaryVolume(r, mean(wind)) / 5, 3));
