import { chk, rnd, table, dpStr } from "../lib.mjs";
const ang = [3, 7, 12, 20, 24, 24, 24, 15, 8, 4];
const L = 10;
const rad = (d) => (d * Math.PI) / 180;
let V = 0, H = 0;
const rows = ang.map((a, i) => { const v = L * Math.sin(rad(a)); const h = L * Math.cos(rad(a)); V += v; H += h; return [i + 1, a, dpStr(v, 2), dpStr(h, 2)]; });
console.log(table(["Section", "Angle (°)", "Vertical = 10 sin θ (m)", "Horizontal = 10 cos θ (m)"], rows));
console.log("V", V, "H", H, "mean angle", (Math.atan(V / H) * 180) / Math.PI);
// steepest section
console.log("retreat", (1.2 * 20e6) / 1e6, "km");
