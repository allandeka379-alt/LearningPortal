// Lesson numbers for plants/roots-stems-leaves (stomata worked example).
import { mean, check } from "../lib.mjs";
const counts = [32, 28, 35, 30, 30];
const total = counts.reduce((a, b) => a + b, 0);
check(total === 155 && mean(counts) === 31, "stomata");
console.log("total", total, "mean", mean(counts));
