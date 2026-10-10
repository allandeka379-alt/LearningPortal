import { graticuleUnit, chk, sfStr, magnification, actualSize } from "../lib.mjs";
const u = graticuleUnit({ stageDivisions: 12, eyepieceDivisions: 40 }); console.log("epu", chk(u, 3));
console.log("guard cell 14 epu", chk(14 * u, 42));
console.log("drawn 63 mm mag", chk(magnification(63, "mm", 42, "µm"), 1500));
const area = Math.PI * 0.2 ** 2; console.log("area", area, "density", 23 / area, sfStr(23 / area, 3));
console.log("scale bar: 20 mm bar = 50 µm; cell 34 mm ->", chk(actualSize(34, "mm", magnification(20, "mm", 50, "µm")), 85));
