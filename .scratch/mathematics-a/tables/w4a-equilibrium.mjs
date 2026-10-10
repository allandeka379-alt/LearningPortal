// W4a lesson numbers: amaths.forces.equilibrium
import { resultant, rad, deg, chk, sf } from "../lib.mjs";
const { sin, cos, tan, atan2, hypot } = Math;
// Ex1: forces 8 N at 0°, 6 N at 90°, 5 N at 210°
const R1 = resultant([[8, 0], [6, 90], [5, 210]]);
console.log("Ex1", R1, "5cos210", 5 * cos(rad(210)), "5sin210", 5 * sin(rad(210)));
// Ex2: weight 20 N, strings at 30° and 50° to horizontal (left string 30°, right 50°)
// horizontal: T1 cos30 = T2 cos50; vertical: T1 sin30 + T2 sin50 = 20
const a = rad(30), b = rad(50);
const T1 = 20 * cos(b) / (sin(a) * cos(b) + sin(b) * cos(a));
const T2 = T1 * cos(a) / cos(b);
console.log("Ex2", T1, T2, "sin80", sin(rad(80)));
chk(T1 * cos(a), T2 * cos(b)); chk(T1 * sin(a) + T2 * sin(b), 20);
// Ex3: smooth plane 25°, mass 4 kg (g = 10), horizontal force P
const W = 40, al = rad(25);
const P = W * tan(al), R = W / cos(al);
console.log("Ex3 P", P, "R", R);
chk(P * cos(al), W * sin(al)); chk(R, W * cos(al) + P * sin(al));
