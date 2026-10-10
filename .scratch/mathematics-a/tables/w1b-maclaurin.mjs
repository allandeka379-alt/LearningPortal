// Checks the worked examples of lessons/series/maclaurin-taylor.md.
import { chk, rnd, checkDeriv } from "../lib.mjs";

const { exp, sin, cos, log, sqrt, tan } = Math;
const XS = [0.01, 0.02, -0.03];
// Ex1 e^x and cos x (numerical check of truncated series for small x)
XS.forEach((x) => { chk(exp(x), 1 + x + x * x / 2 + x ** 3 / 6, 1e-7); chk(cos(x), 1 - x * x / 2 + x ** 4 / 24, 1e-10); });
// Ex2 ln(1 + 2x) = 2x − 2x² + 8x³/3
XS.forEach((x) => chk(log(1 + 2 * x), 2 * x - 2 * x * x + (8 * x ** 3) / 3, 1e-5));
// Ex3 e^x sin x = x + x² + x³/3
XS.forEach((x) => chk(exp(x) * sin(x), x + x * x + x ** 3 / 3, 1e-6));
// Ex4 e^0.1 ≈ 1.105167
rnd(1 + 0.1 + 0.005 + 0.001 / 6, 6, 1.105167); rnd(exp(0.1), 7, 1.1051709);
// Ex5 √x about 4: 2 + (x − 4)/4 − (x − 4)²/64; √4.1 ≈ 2.02484375
chk(2 + 0.1 / 4 - 0.01 / 64, 2.02484375); rnd(sqrt(4.1), 7, 2.0248457);
// Ex6 tan x: f''' = 2sec⁴x + 4sec²x tan²x, f'''(0) = 2 → x + x³/3
checkDeriv((x) => 2 * tan(x) / cos(x) ** 2, (x) => 2 / cos(x) ** 4 + 4 * tan(x) ** 2 / cos(x) ** 2, [0.1, 0.4, 0.9]);
XS.forEach((x) => chk(tan(x), x + x ** 3 / 3, 1e-7));
console.log("maclaurin lesson OK");
