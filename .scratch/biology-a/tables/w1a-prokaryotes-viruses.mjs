import { actualSize, convert, magnification } from "../lib.mjs";
console.log("bacterium 33 mm at x15000 µm", actualSize(33, "mm", 15000, "µm"));
console.log("HIV 120 nm drawn 48 mm mag", magnification(48, "mm", 120, "nm"));
console.log("ratio 2.2 µm / 120 nm", convert(2.2, "µm", "nm") / 120);
