// Worked-example checks for lessons/coordinate/parallel-perpendicular.md
import { chk, same } from "../lib.mjs";
const grad = ([x1, y1], [x2, y2]) => (y2 - y1) / (x2 - x1);
const dist = ([x1, y1], [x2, y2]) => Math.hypot(x2 - x1, y2 - y1);
// Ex1: through (-1, 3), parallel to 2x + 5y = 7 -> 2x + 5y = 13; perpendicular -> 5x - 2y + 11 = 0
chk(2 * -1 + 5 * 3, 13); chk(5 * -1 - 2 * 3 + 11, 0); chk((-2 / 5) * (5 / 2), -1);
// Ex2: perp bisector of (1,-2), (7,6): 3x + 4y - 20 = 0
chk(grad([1, -2], [7, 6]), 4 / 3); chk(3 * 4 + 4 * 2 - 20, 0); chk(dist([1, -2], [0, 5]), dist([7, 6], [0, 5])); chk(3 * 0 + 4 * 5 - 20, 0);
// Ex3: foot from P(7, 4) to y = 2x - 5 -> (5, 5), distance sqrt5
chk(2 * 5 - 5, 5); chk(-0.5 * 5 + 7.5, 5); chk(-0.5 * 7 + 7.5, 4); chk(dist([7, 4], [5, 5]), Math.sqrt(5));
// Ex4: A(-3,1), B(1,3), C(3,-1): right angle at B
chk(grad([-3, 1], [1, 3]) * grad([1, 3], [3, -1]), -1);
// Ex5: rhombus A(2,1), C(6,9), B on x-axis -> B(14, 0), D(-6, 10), area 100
const M = [4, 5]; chk(grad([2, 1], [6, 9]), 2); chk(-0.5 * 14 + 7, 0); chk(-0.5 * 4 + 7, 5);
same([2 * M[0] - 14, 2 * M[1] - 0], [-6, 10]);
chk(dist([2, 1], [14, 0]), dist([14, 0], [6, 9])); chk(dist([6, 9], [-6, 10]), dist([2, 1], [14, 0]));
chk(0.5 * dist([2, 1], [6, 9]) * dist([14, 0], [-6, 10]), 100);
console.log("ok", dist([2, 1], [14, 0]) ** 2);
