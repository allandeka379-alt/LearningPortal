import { convert, magnification, actualSize } from "../lib.mjs";
console.log("fov 1.8 mm / 12 cells", convert(1.8, "mm", "µm") / 12);
console.log("drawing 60 mm of 150 µm", magnification(60, "mm", 150, "µm"));
console.log("cheek 4 cells across 0.25 mm fov?", convert(0.25,"mm","µm")/4);
