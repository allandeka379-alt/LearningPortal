import { linFit, sciTex, sfStr } from "../lib.mjs";
const c = 3e8; const v = c * (669.4 - 656.3) / 656.3; console.log("v", v, "d", v / 2.3e-18, "age s", 1 / 2.3e-18, "yr", 1 / 2.3e-18 / 3.16e7);
const ds = [1.0, 2.0, 3.0, 4.0, 5.0].map((x) => x * 1e24); const vs = [2.4, 4.4, 7.1, 9.0, 11.6].map((x) => x * 1e6);
const f = linFit(ds, vs); console.log("H", f.m, f.c);
