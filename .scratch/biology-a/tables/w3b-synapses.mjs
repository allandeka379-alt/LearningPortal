// Lesson numbers for coordination/synapses.
import { chk, sfStr } from "../lib.mjs";
const cond = (1.2 / 80) * 1000; chk(cond, 15);
const syn = 3 * 0.5; chk(syn, 1.5);
const tot = cond + syn; chk(tot, 16.5);
console.log("pct", sfStr((syn / tot) * 100, 2));
chk(-55 - -70, 15); console.log("impulses", 15 / 4, Math.ceil(15 / 4));
