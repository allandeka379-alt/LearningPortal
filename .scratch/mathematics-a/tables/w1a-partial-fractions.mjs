import { chk } from "../lib.mjs";
const same = (f, g, label) => { for (const x of [0.37, 2.9, -4.3, 5.6, 7.1]) chk(f(x), g(x), 1e-9, label); console.log("ok", label); };
same((x) => (5 * x + 1) / ((x - 1) * (x + 2)), (x) => 2 / (x - 1) + 3 / (x + 2), "ex1");
same((x) => (5 * x * x + 2 * x + 1) / ((x - 1) * (x + 1) ** 2), (x) => 2 / (x - 1) + 3 / (x + 1) - 2 / (x + 1) ** 2, "ex2");
same((x) => (5 * x * x - x + 4) / ((x - 1) * (x * x + 1)), (x) => 4 / (x - 1) + x / (x * x + 1), "ex3");
same((x) => (2 * x * x - 3 * x + 5) / ((x - 1) * (x - 3)), (x) => 2 - 2 / (x - 1) + 7 / (x - 3), "ex4");
