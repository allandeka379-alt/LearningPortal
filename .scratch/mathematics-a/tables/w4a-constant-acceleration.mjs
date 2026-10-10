// W4a lesson numbers: amaths.kinematics.constant-acceleration
import { suvat, quad } from "../lib.mjs";
console.log("Ex1", suvat({ u: 8, v: 26, s: 300 }));
console.log("Ex2 max h", 14 ** 2 / 20, suvat({ u: 14, v: 0, a: -10 }));
console.log("Ex2 ground", quad.roots(5, -14, -2.5), "speed", Math.sqrt(14 ** 2 + 2 * 10 * 2.5));
console.log("Ex3", suvat({ u: 0, a: 2, t: 15 }), 15 * 15);
