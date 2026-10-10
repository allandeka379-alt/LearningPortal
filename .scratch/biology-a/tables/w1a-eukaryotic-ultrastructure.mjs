import { actualSize, convert } from "../lib.mjs";
console.log("golgi 20mm x40000 nm", actualSize(20, "mm", 40000, "nm"));
console.log("lysosome 14mm x40000 nm", actualSize(14, "mm", 40000, "nm"));
console.log("ribosome 1.1 mm x 40000 nm", actualSize(1.1, "mm", 40000, "nm"));
