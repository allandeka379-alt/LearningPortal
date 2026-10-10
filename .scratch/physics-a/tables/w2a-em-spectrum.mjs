import { sciTex, sfStr, DATA } from "../lib.mjs";
const c = DATA.c;
console.log("3.0 cm microwave f", sciTex(c / 0.03));
console.log("94.5 MHz lambda", sfStr(c / 94.5e6, 3));
console.log("400 nm f", sciTex(c / 400e-9), "700 nm f", sciTex(c / 700e-9));
console.log("X-ray 0.10 nm f", sciTex(c / 0.1e-9));
console.log("Earth-Moon 3.84e8 m time", sfStr(3.84e8 / c, 3));
