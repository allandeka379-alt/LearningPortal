import { sfStr, sciTex, DATA } from "../lib.mjs";
console.log("sound 500Hz", 340 / 500, "ratio to 0.90 m door", sfStr(0.9 / (340 / 500), 3));
console.log("light 500nm door ratio", sciTex(0.9 / 500e-9));
console.log("radio 198 kHz", sfStr(DATA.c / 198e3, 3), "FM 98 MHz", sfStr(DATA.c / 98e6, 3), "mobile 1.8 GHz", sfStr(DATA.c / 1.8e9, 3));
console.log("ripple v", 8.0 * 1.5, "cm/s");
