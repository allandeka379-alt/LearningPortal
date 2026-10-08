// Tables for lessons/firms/economies-of-scale.md (W3a).
import { table, check, pctChange, fmt } from "../lib.mjs";
// WE1: long-run average cost of a fictional milling firm at five plant sizes.
const scale = ["Plant 1", "Plant 2", "Plant 3", "Plant 4", "Plant 5"];
const out = [1000, 3000, 6000, 10000, 12000], tc = [20000, 45000, 66000, 100000, 132000];
const lrac = out.map((q, i) => tc[i] / q);
console.log(table(["Plant size", "Output (tonnes per year)", "Total cost (US\\$)", "Average cost (US\\$ per tonne)"], scale.map((s, i) => [s, out[i], tc[i], lrac[i]])));
check("min", Math.min(...lrac), 10);
// WE2: purchasing economies: price per bag of packaging falls with order size.
const small = { bags: 2000, price: 0.4 }, big = { bags: 10000, price: 0.32 };
console.log(small.bags * small.price, big.bags * big.price, fmt(pctChange(small.price, big.price), 1));
