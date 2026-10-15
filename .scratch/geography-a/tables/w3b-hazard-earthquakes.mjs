import { magnitudeRatios, rnd, chk, sfStr } from "../lib.mjs";
export const VP = 6.0, VS = 3.5;
export const perSec = 1 / (1 / VS - 1 / VP); // km of distance per second of S-P lag
export const dist = (lag) => lag * perSec;
export const Mdiff = (a, b) => magnitudeRatios(a - b);
export const tsunamiSpeed = (depthM) => Math.sqrt(9.81 * depthM); // m/s
if (process.argv[1]?.endsWith("w3b-hazard-earthquakes.mjs")) {
  console.log("perSec", perSec, "dist(10)", dist(10), "dist(18)", dist(18), "dist(24)", dist(24));
  console.log("P to 252 km", 252 / VP, "S", 252 / VS);
  console.log("8 vs 6", Mdiff(8, 6), "7 vs 5", Mdiff(7, 5), "9.1 vs 7.0", Mdiff(9.1, 7.0), "6.8 vs 5.8", Mdiff(6.8, 5.8));
  const v = tsunamiSpeed(4000); console.log("v m/s", v, "km/h", v * 3.6, "3000 km hours", 3000000 / v / 3600);
  const v2 = tsunamiSpeed(10); console.log("10 m", v2, v2*3.6);
  const v3 = tsunamiSpeed(5000); console.log("5000 m", v3, v3*3.6, "hours for 1500 km", 1500000/v3/3600);
}
