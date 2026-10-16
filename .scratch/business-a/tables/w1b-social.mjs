import { table, chk, pctChange } from "../lib.mjs";
const p1 = 120000, s1 = 15, p2 = 128000, s2 = 18;
const o1 = p1 * s1 / 100, o2 = p2 * s2 / 100;
console.log(table(["Town of Mutoko Hills (fictional)", "Now", "In ten years", "Change"], [["Total population", p1, p2, p2 - p1], ["Share aged 60 or over (%)", s1, s2, s2 - s1], ["People aged 60 or over", o1, o2, o2 - o1], ["Other residents", p1 - o1, p2 - o2, (p2 - o2) - (p1 - o1)]]));
console.log(pctChange(o1, o2), pctChange(p1 - o1, p2 - o2));
// pharmacy revenue per older person
const spend = 240;
console.log(o1 * spend, o2 * spend, o2 * spend - o1 * spend);
