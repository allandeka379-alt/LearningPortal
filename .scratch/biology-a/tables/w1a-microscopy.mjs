import { actualSize, magnification, graticuleUnit, convert, sfStr } from "../lib.mjs";
console.log("WE1 mito actual µm", actualSize(36, "mm", 24000, "µm"));
console.log("WE2 scale bar mag", magnification(18, "mm", 5, "µm"), "chloroplast", actualSize(27, "mm", magnification(18, "mm", 5, "µm"), "µm"));
const u = graticuleUnit({ stageDivisions: 25, umPerStageDivision: 10, eyepieceDivisions: 100 });
console.log("WE3 epu", u, "cell 34 epu", 34 * u, "x100 epu", graticuleUnit({ stageDivisions: 100, umPerStageDivision: 10, eyepieceDivisions: 100 }));
console.log("WE4 drawing mag: 54 mm drawing of 85 µm cell", magnification(54, "mm", 85, "µm"));
console.log("conv", convert(0.2, "µm", "nm"), convert(2.5, "mm", "µm"));
