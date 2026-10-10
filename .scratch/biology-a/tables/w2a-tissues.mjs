import { actualSize, graticuleUnit, chk, magnification } from "../lib.mjs";
// Worked example 1: vessel element diameter from a photomicrograph
console.log("WE1 vessel diameter µm", chk(actualSize(24, "mm", 600), 40));
// Worked example 2: graticule calibration and a sieve tube element
const u = graticuleUnit({ stageDivisions: 30, eyepieceDivisions: 24 });
console.log("WE2 epu", chk(u, 12.5), "sieve tube 9 epu ->", chk(9 * u, 112.5));
console.log("WE2 drawing 45 mm magnification", magnification(45, "mm", 112.5, "µm"));
