import { chk, table, dpStr } from "../lib.mjs";
export const PO2 = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14];
export const NORMAL = [10, 30, 45, 60, 72, 80, 90, 95, 97, 98];
export const HIGHCO2 = [5, 18, 32, 45, 58, 68, 82, 91, 95, 97];
const cap = 20; // cm3 O2 per 100 cm3 blood when fully saturated (about)
if (import.meta.url.endsWith("w2a-gas-transport.mjs") && process.argv[1]?.includes("w2a-gas-transport")) {
  console.log(table(["Partial pressure of oxygen / kPa", ...PO2.map(String)], [["Saturation, low CO₂ / %", ...NORMAL.map(String)], ["Saturation, high CO₂ / %", ...HIGHCO2.map(String)]]));
  const u1 = ((97 - 60) / 100) * cap; console.log("unloaded normal", chk(u1, 7.4));
  const u2 = ((97 - 45) / 100) * cap; console.log("unloaded bohr", chk(u2, 10.4), "pct more", dpStr((u2 - u1) / u1 * 100, 1));
}
