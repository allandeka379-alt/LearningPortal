import { sfStr, dpStr, table } from "../lib.mjs";
console.log("bright", 6 * 12 / 13.5, "dark", 6 * 12 / 92);
console.log("LED R", (13 - 2.1) / 0.020);
console.log("strain dR", 120 * 2 * 1.0e-3, "R'", 120 * (1 + 1e-3) ** 2);
// calibration: thermistor R25=2.2k B=3500 in divider with 2.2k fixed (top), supply 5.0 V, output across fixed resistor (bottom?) 
const R = (c) => 2.2 * Math.exp(3500 * (1 / (c + 273.15) - 1 / 298.15));
console.log(table(["θ", "R", "V"], [0, 20, 40, 60, 80, 100].map((c) => [c, sfStr(R(c), 3), dpStr(5.0 * 2.2 / (2.2 + R(c)), 2)])));
