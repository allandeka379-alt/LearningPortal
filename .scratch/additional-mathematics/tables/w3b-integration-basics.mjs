// Checks for the worked examples of lessons/calculus/integration-basics.md
import { chk, checkAntideriv, checkDeriv } from "../lib.mjs";
// Ex1: ∫(6x² − 4x + 5) dx = 2x³ − 2x² + 5x + c
checkAntideriv((x) => 2 * x ** 3 - 2 * x ** 2 + 5 * x, (x) => 6 * x * x - 4 * x + 5, -1, 3, "ex1");
// Ex2: ∫(3√x + 2/x³) dx = 2x^{3/2} − x^{−2} + c
checkAntideriv((x) => 2 * x ** 1.5 - x ** -2, (x) => 3 * Math.sqrt(x) + 2 / x ** 3, 0.5, 4, "ex2");
// Ex3: ∫ (x² − 5)(x + 2)... ∫ (4x³ − 9)/x² dx? (x^4 ... ) -> use: ∫ (2x − 1)² dx = 4x³/3 − 2x² + x + c
checkAntideriv((x) => (4 * x ** 3) / 3 - 2 * x * x + x, (x) => (2 * x - 1) ** 2, -2, 3, "ex3");
// Ex4: dy/dx = 3x² − 4/x², through (2, 9): y = x³ + 4/x − 1
const y4 = (x) => x ** 3 + 4 / x - 1;
checkDeriv(y4, (x) => 3 * x * x - 4 / (x * x), [1, 2, 3.5]);
chk(y4(2), 9);
chk(y4(1), 4);
// Ex5: d/dx (x² + 5)^{3/2} = 3x√(x² + 5); hence ∫ x√(x² + 5) dx = (1/3)(x² + 5)^{3/2} + c
checkDeriv((x) => (x * x + 5) ** 1.5, (x) => 3 * x * Math.sqrt(x * x + 5), [-1, 0.5, 2]);
checkAntideriv((x) => (x * x + 5) ** 1.5 / 3, (x) => x * Math.sqrt(x * x + 5), 0, 2, "ex5");
chk((4 + 5) ** 1.5 / 3 - 5 ** 1.5 / 3, 9 - (5 * Math.sqrt(5)) / 3);
console.log("integration-basics lesson checks OK; y(1) =", y4(1));
