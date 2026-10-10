import { mean, sfStr, dpStr, table, chk, pctError } from "../lib.mjs";
const temps = [20, 30, 40, 50, 60];
const times = [[312, 298, 305], [164, 171, 158], [92, 88, 96], [118, 240, 124], [410, 395, 402]];
const rows = temps.map((T, i) => {
  const r = times[i];
  const m = i === 3 ? mean([r[0], r[2]]) : mean(r);
  return [T, ...r, i === 3 ? `${dpStr(m, 0)}*` : dpStr(m, 0), sfStr(1000 / m, 3)];
});
console.log(table(["Temperature / °C", "Time 1 / s", "Time 2 / s", "Time 3 / s", "Mean time / s", "Rate / 1000 s⁻¹ ... "], rows));
console.log(times.map((r, i) => (i === 3 ? mean([r[0], r[2]]) : mean(r))));
console.log("pct error 1 cm3 in 10 cm3 syringe reading 0.5 uncertainty", pctError(0.5, 10));
