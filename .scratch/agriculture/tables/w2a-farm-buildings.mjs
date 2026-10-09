// Lesson numbers for structures/farm-buildings.
import { round, money } from "../lib.mjs";
const wall = 8 * 2.4, door = 2 * 0.9, net = wall - door; const blocks = net * 12.5; console.log(wall, door, round(net, 2), blocks, Math.ceil(blocks - 1e-9), money(Math.ceil(blocks) * 0.8));
console.log("thatch/yr", 300 / 5, "iron/yr", 900 / 25);
console.log("broilers", 10 * 6 * 10);
