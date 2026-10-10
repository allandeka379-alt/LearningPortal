import { DATA, sciTex, sfStr } from "../lib.mjs";
const E = DATA.me * DATA.c ** 2; console.log("E J", E, "MeV", E / DATA.e / 1e6, "lambda", DATA.h * DATA.c / E, "p", E / DATA.c);
console.log("dx", DATA.c * 0.4e-9 / 2);
console.log("decay", 400 * Math.exp(-0.693 / 110 * 120));
