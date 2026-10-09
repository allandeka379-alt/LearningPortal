// Checks for lessons/mechanics/kinematics-graphs.md
import { chk, quad, same } from "../lib.mjs";
// Ex1: 1.2 km east in 15 min, 0.6 km west in 10 min
const dist = 1200 + 600, disp = 1200 - 600, T = 25 * 60;
chk(dist / T, 1.2); chk(disp / T, 0.4);
// Ex2: cyclist s-t: (0,0) → (20,100), rest to 30, back to 0 at 50
chk(100 / 20, 5); chk(-100 / 20, -5);
// Ex3: kombi 0 → 20 in 10 s, 60 s at 20, 20 → 0 in 8 s
chk(20 / 10, 2); chk(20 / 8, 2.5);
const area = 0.5 * (78 + 60) * 20;
chk(area, 1380); chk(0.5 * 10 * 20 + 60 * 20 + 0.5 * 8 * 20, 1380);
console.log("avg speed", area / 78);
// Ex4: train: 20 s accel, 120 s constant, 30 s decel, 2.9 km
chk(2900 / (0.5 * (170 + 120)), 20); chk(20 / 20, 1); chk(20 / 30, 2 / 3);
// Ex5: velocity 8 → −4 at −2 m/s² over 6 s (distance vs displacement)
chk(0.5 * 4 * 8 + 0.5 * 2 * 4, 20); chk(0.5 * 4 * 8 - 0.5 * 2 * 4, 12);
same(quad.roots(1, 0, -1), [-1, 1]);
console.log("kinematics-graphs lesson checks OK");
