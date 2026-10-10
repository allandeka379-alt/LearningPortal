// W2a lesson numbers: integ.volumes
import { chk, integrate } from "../lib.mjs";
const { PI } = Math;
chk(PI * integrate((x) => x ** 4, 0, 2), (32 * PI) / 5, 1e-9, "ex1");
chk(PI * integrate((y) => y, 1, 4), (15 * PI) / 2, 1e-9, "ex2");
chk(PI * integrate((x) => (9 - x * x) ** 2 - 25, -2, 2), (704 * PI) / 5, 1e-7, "ex3");
chk(PI * integrate((x) => (2 * x + 1) ** -2, 0, 1), PI / 3, 1e-9, "ex4");
console.log("ex1", (32 * PI) / 5, "ex2", (15 * PI) / 2, "ex3", (704 * PI) / 5, "ex4", PI / 3);
