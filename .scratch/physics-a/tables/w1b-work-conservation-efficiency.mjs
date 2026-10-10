import { DATA, sfStr, rad } from "../lib.mjs";
const g = DATA.g;
console.log("WE1", 120 * 25 * Math.cos(rad(35)), "horiz comp", 120 * Math.cos(rad(35)));
const u = 50 * g * 3.2; console.log("WE2 useful", u, "eff", 100 * u / 2400, "wasted", 2400 - u);
const W = 180 * 5, gpe = 40 * g * 1.2; console.log("WE3 W", W, "gpe", gpe, "fric work", W - gpe, "f", (W - gpe) / 5, "eff", 100 * gpe / W);
// area under graph: force rises linearly 0->60 N over 0.30 m then constant 60 N to 0.50 m
console.log("area", 0.5 * 60 * 0.3 + 60 * 0.2);
