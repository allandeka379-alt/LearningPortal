// Lesson numbers for dynamics.drag-terminal-velocity (W1a): skydiver with drag kv^2 (k = 0.25 kg/m, m = 80 kg).
import { DATA, table, dpStr } from "../lib.mjs";
const g = DATA.g;
const m = 80;
const k = 0.25;
let v = 0;
const dt = 0.001;
const rows = [];
for (let i = 0; i <= 20000; i++) {
  if (i % 2000 === 0) rows.push([String(i * dt), dpStr(v, 1), dpStr(g - (k * v * v) / m, 2)]);
  v += (g - (k * v * v) / m) * dt;
}
console.log(table(["t / s", "v / m s^-1", "a / m s^-2"], rows));
console.log("terminal", Math.sqrt((m * g) / k), "a at 30", g - (k * 900) / m, "car vmax", Math.sqrt(2400 / 0.8), "power", 2400 * Math.sqrt(3000));
