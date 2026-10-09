// Worked-example checks for lessons/functions/domain-range.md
import { chk, quad } from "../lib.mjs";

const f2 = (x) => 3 * x - 2;
chk(f2(-1), -5); chk(f2(4), 10);
const f3 = (x) => x * x - 6 * x + 10;
chk(quad.completeSquare(1, -6, 10).q, 1); chk(f3(0), 10); chk(f3(5), 5);
// Ex4: 2e^x + 1 > 1; ln(x - 2) all reals
chk(2 * Math.exp(0) + 1, 3);
// Ex6: (x - 2)^2 + 1 one-one for x >= 2
chk(quad.completeSquare(1, -4, 5).p, -2);
console.log("ok");
