import { v3 } from "../lib.mjs";
const a = [2, -1, 3], b = [1, 4, -2]; const c = v3.cross(a, b);
console.log("Ex1", c, v3.dot(a, c), v3.dot(b, c), "|axb|", v3.mag(c), "sin check", v3.mag(a) * v3.mag(b) * Math.sin(v3.angle(a, b) * Math.PI / 180));
const A = [1, 0, 2], B = [3, 1, 1], C = [0, 2, 4]; const AB = v3.sub(B, A), AC = v3.sub(C, A), n = v3.cross(AB, AC);
console.log("Ex2", AB, AC, n, "area", v3.mag(n) / 2, "d", v3.dot(n, A), v3.dot(n, B), v3.dot(n, C));
const n3 = v3.cross([1, 0, 2], [0, 1, -1]); console.log("Ex3", n3, v3.dot(n3, [1, 2, 0]));
console.log("Ex4", v3.dot([1, 2, -2], [2, -1, 3]));
