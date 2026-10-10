// W3a lesson numbers for photosynthesis/calvin-c4.md
import { chk, table } from "../lib.mjs";
const turns = 6;
const gp = turns * 2, tp = gp, regen = (turns * 5) / 3, out = tp - regen;
console.log({ gp, tp, regen, out, atp: turns * 3, nadph: turns * 2, carbonsCheck: regen * 3 });
chk(out, 2); chk(regen * 3, 30);
const time = [0, 30, 60, 90, 120, 150, 180];
const gpv = [1.0, 1.0, 1.0, 1.8, 2.3, 2.4, 2.4];
const rubp = [1.0, 1.0, 1.0, 0.4, 0.2, 0.1, 0.1];
console.log(table(["Time / s", ...time.map(String)], [["GP / arbitrary units", ...gpv.map((x) => x.toFixed(1))], ["RuBP / arbitrary units", ...rubp.map((x) => x.toFixed(1))]]));
