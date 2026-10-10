// W4a lesson numbers: amaths.vectors.basics
import { v3, vec, deg } from "../lib.mjs";
const A = [2, -1, 3], B = [5, 3, -9], AB = v3.sub(B, A); console.log("Ex1", AB, v3.mag(AB));
const A2 = [1, 2, 4], B2 = [4, 6, 5]; console.log("Ex2 C", v3.sub(B2, A2), "mid OB", v3.scale(0.5, B2), "mid AC", v3.scale(0.5, v3.add(A2, v3.sub(B2, A2))));
const p = [3, 4], q = [5, -12], r = vec.sub(vec.scale(2, p), q); console.log("Ex3", r, vec.mag(r), vec.scale(2, q), deg(Math.atan2(-12, 5)));
console.log("Ex4", -6 * 2 / 3);
