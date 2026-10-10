// W4a lesson numbers: amaths.vectors.scalar-product
import { v3, deg, rad } from "../lib.mjs";
const a = [2, -1, 2], b = [1, 3, -1]; console.log("Ex1", v3.dot(a, b), v3.mag(a), v3.mag(b), v3.angle(a, b));
console.log("Ex2 p", 4 / 5, v3.dot([0.8, 2, -1], [3, 0.8, 4]));
const A = [2, 0, 1], B = [5, 4, 1], C = [3, 1, 6], AB = v3.sub(B, A), AC = v3.sub(C, A), th = v3.angle(AB, AC);
console.log("Ex3", AB, AC, v3.dot(AB, AC), v3.mag(AC), th, 0.5 * v3.mag(AB) * v3.mag(AC) * Math.sin(rad(th)), Math.cos(rad(th)));
const OF = [4, 3, 2], AG = [-4, 3, 2]; console.log("Ex4", v3.dot(OF, AG), v3.mag(OF), v3.angle(OF, AG), 180 - v3.angle(OF, AG));
