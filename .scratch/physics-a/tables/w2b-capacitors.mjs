import { DATA, sciPlain, seriesC } from "../lib.mjs";
const C = 0.15 / DATA.k_e; console.log("WE1 C", sciPlain(C), "Q", sciPlain(C * 50e3), "Q from 3sf C", sciPlain(Number(C.toPrecision(3)) * 50e3));
const Cs = seriesC(4e-6, 12e-6); console.log("WE2 C", Cs, "Q", Cs * 9, "V4", Cs * 9 / 4e-6, "V12", Cs * 9 / 12e-6);
console.log("WE3 V", 10e-6 * 12 / 15e-6);
