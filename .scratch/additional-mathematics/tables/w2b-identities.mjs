// Worked-example checks for lessons/trig/identities.md (each identity tested at sample angles)
import { chk, sec, cosec, cot } from "../lib.mjs";
const xs = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const same = (f, g, l) => xs.forEach((x) => chk(f(x), g(x), 1e-9, `${l} ${x}`));
const { sin, cos, tan } = Math;
same((x) => (1 - cos(x) ** 2) / (sin(x) * cos(x)), tan, "Ex1");
same((x) => sin(x) / (1 - cos(x)) - sin(x) / (1 + cos(x)), (x) => 2 * cot(x), "Ex2");
same((x) => sec(x) ** 2 + cosec(x) ** 2, (x) => sec(x) ** 2 * cosec(x) ** 2, "Ex3");
same((x) => (1 + sin(x)) / cos(x) + cos(x) / (1 + sin(x)), (x) => 2 * sec(x), "Ex4");
same((x) => tan(x) + cot(x), (x) => sec(x) * cosec(x), "Ex5");
console.log("ok");
