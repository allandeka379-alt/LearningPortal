// Worked-example checks for lessons/coordinate/lines.md
import { chk, same } from "../lib.mjs";
export const shoelace = (pts) => Math.abs(pts.reduce((s, [x, y], i) => { const [u, v] = pts[(i + 1) % pts.length]; return s + x * v - u * y; }, 0)) / 2;
// Ex1
chk(Math.hypot(4 - -2, -3 - 5), 10); same([(4 + -2) / 2, (-3 + 5) / 2], [1, 1]); chk((-3 - 5) / (4 - -2), -4 / 3);
// Ex2: through (3, -1) gradient 2/5 -> 2x - 5y - 11 = 0
chk(2 * 3 - 5 * -1 - 11, 0); chk(11 / 2, 5.5); chk(-11 / 5, -2.2);
// Ex3: 3x + 2y = 17, y = 2x - 2 -> (3, 4)
chk(3 * 3 + 2 * 4, 17); chk(2 * 3 - 2, 4);
// Ex4: P(-1,-4), Q(2,2), R(5,8) collinear; k for (k, 14)
chk((2 - -4) / (2 - -1), 2); chk((8 - 2) / (5 - 2), 2); chk(2 * 6 - 2, 10);
// Ex5 triangle (1,2),(7,4),(3,9)
chk(shoelace([[1, 2], [7, 4], [3, 9]]), 19);
// Ex6 quad (0,0),(8,1),(9,7),(2,6)
chk(shoelace([[0, 0], [8, 1], [9, 7], [2, 6]]), 43.5);
console.log("ok");
