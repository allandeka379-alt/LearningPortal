// W4a lesson numbers: amaths.vectors.lines
import { v3 } from "../lib.mjs";
console.log("Ex1 dir", v3.sub([4, 0, 2], [1, -2, 3]), "t=2", v3.add([1, -2, 3], v3.scale(2, [3, 2, -1])));
// Ex2: l1 r = (1,2,0) + s(2,-1,1); l2 r = (4,1,5) + t(1,0,-2)?
const L = v3.lines([1, 2, 0], [2, -1, 1], [5, 0, 6], [1, 1, 2]); console.log("Ex2a", L);
const L2 = v3.lines([1, 2, 0], [2, -1, 1], [0, 1, 4], [1, 2, -1]); console.log("Ex2b", L2);
console.log("angle", v3.angle([2, -1, 1], [1, 1, 2]));
const F = v3.foot([5, 1, 4], [1, 2, 0], [2, -1, 1]); console.log("Ex4", F);
console.log("int", v3.lines([1, 2, 0], [2, -1, 1], [4, -1, 0], [1, 1, 2]));
console.log("skew", v3.lines([1, 2, 0], [2, -1, 1], [0, 1, 4], [1, 2, -1]), "angle", v3.angle([2, -1, 1], [1, 2, -1]));
console.log("foot", v3.foot([5, 3, -1], [1, 2, 0], [2, -1, 1]), 2 * Math.sqrt(3));
