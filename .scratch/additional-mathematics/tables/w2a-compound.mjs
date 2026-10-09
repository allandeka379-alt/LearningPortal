// Worked-example checks for lessons/circular/compound-shapes.md
import { chk, sfStr } from "../lib.mjs";
const seg = (r, th) => 0.5 * r * r * (th - Math.sin(th));
const chord = (r, th) => 2 * r * Math.sin(th / 2);
// Ex1 r = 10, θ = 1.4
console.log("ex1 chord", chord(10, 1.4), sfStr(chord(10, 1.4)), "seg", seg(10, 1.4), sfStr(seg(10, 1.4)), "perim", 14 + chord(10, 1.4), sfStr(14 + chord(10, 1.4)), "sin1.4", Math.sin(1.4));
chk(Math.hypot(10 - 10 * Math.cos(1.4), 10 * Math.sin(1.4)), chord(10, 1.4));
// Ex2 r = 6, θ = π/3: 6π − 9√3, chord 6
chk(seg(6, Math.PI / 3), 6 * Math.PI - 9 * Math.sqrt(3)); chk(chord(6, Math.PI / 3), 6);
console.log("ex2", seg(6, Math.PI / 3));
// Ex3 lens: two circles r = 5, centres 8 apart
const half = Math.acos(4 / 5), th = 2 * half;
const lens = 2 * seg(5, th);
console.log("ex3 half", half, "theta", th, sfStr(th, 4), "sin", Math.sin(th), "lens", lens, sfStr(lens));
chk(Math.sin(th), 0.96);
// Ex4 tangents: r = 3, OP = 6 -> angle AOP = π/3, PA = 3√3
chk(Math.acos(3 / 6), Math.PI / 3); chk(Math.sqrt(36 - 9), 3 * Math.sqrt(3));
const shaded = 2 * 0.5 * 3 * 3 * Math.sqrt(3) - 0.5 * 9 * (2 * Math.PI / 3);
chk(shaded, 9 * Math.sqrt(3) - 3 * Math.PI); console.log("ex4 area", shaded, "perim", 6 * Math.sqrt(3) + 2 * Math.PI);
chk(3 * 2 * Math.PI / 3, 2 * Math.PI);
// Ex5 OA = OB = 7, AB = 10 by cosine rule
const t5 = Math.acos((49 + 49 - 100) / 98);
console.log("ex5 theta", t5, sfStr(t5, 4), "sector", 0.5 * 49 * t5, "triangle", 0.5 * 49 * Math.sin(t5), "segment", seg(7, t5), sfStr(seg(7, t5)));
