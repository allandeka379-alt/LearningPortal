// Worked-example checks for lessons/trig/six-ratios.md
import { chk, rad, sec, cosec, cot } from "../lib.mjs";
const S = (d) => Math.sin(rad(d)), C = (d) => Math.cos(rad(d)), T = (d) => Math.tan(rad(d));
// Ex1
chk(S(240), -Math.sqrt(3) / 2); chk(C(315), Math.SQRT1_2); chk(T(150), -1 / Math.sqrt(3));
// Ex2
chk(sec(rad(300)), 2); chk(cosec(7 * Math.PI / 6), -2); chk(cot(3 * Math.PI / 4), -1);
// Ex3 tan = -5/12, obtuse
const th = Math.PI - Math.atan(5 / 12);
chk(Math.tan(th), -5 / 12); chk(Math.sin(th), 5 / 13); chk(Math.cos(th), -12 / 13);
chk(sec(th), -13 / 12); chk(cosec(th), 13 / 5); chk(cot(th), -12 / 5);
// Ex4 cos x = -2/3, 180 < x < 270
const x = Math.PI + Math.acos(2 / 3);
chk(Math.cos(x), -2 / 3); chk(Math.sin(x), -Math.sqrt(5) / 3); chk(Math.tan(x), Math.sqrt(5) / 2); chk(cosec(x), -3 * Math.sqrt(5) / 5);
// related angle table
for (const [a, r] of [[160, 20], [250, 70], [325, 35]]) chk(Math.abs(S(a)), S(r));
console.log("ok");
