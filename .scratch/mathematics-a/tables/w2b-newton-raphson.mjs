// W2b lesson numbers: amaths.numerical.newton-raphson
import { newtonRaphson, root, chk } from "../lib.mjs";
const { exp, log } = Math;
const f = (x) => x ** 3 - 2 * x - 5, fp = (x) => 3 * x * x - 2;
console.log("ex2", newtonRaphson(f, fp, 2, { maxN: 5 }).map((x) => x.toFixed(6)), root(f, 2, 3), f(2.0945), f(2.0955));
console.log("ex3", newtonRaphson((x) => x * x - 10, (x) => 2 * x, 3, { maxN: 4 }).map((x) => x.toFixed(6)));
const g = (x) => exp(x) - 3 * x, gp = (x) => exp(x) - 3;
console.log("roots", root(g, 0, 1), root(g, 1, 2), "stat", log(3));
console.log("from 1", newtonRaphson(g, gp, 1, { maxN: 8 }).map((x) => x.toFixed(5)));
console.log("from 2", newtonRaphson(g, gp, 2, { maxN: 8 }).map((x) => x.toFixed(5)));
console.log("from 0", newtonRaphson(g, gp, 0, { maxN: 8 }).map((x) => x.toFixed(5)));
console.log("from 1.1", newtonRaphson(g, gp, 1.1, { maxN: 3 }).map((x) => x.toFixed(5)));
