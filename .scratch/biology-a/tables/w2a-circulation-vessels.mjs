import { actualSize, chk } from "../lib.mjs";
// WE1: artery TS at x40
console.log("lumen µm", chk(actualSize(22, "mm", 40), 550), "wall µm", chk(actualSize(6, "mm", 40), 150), "ratio", 550 / 150);
// WE2: vein lumen at x40
console.log("vein lumen µm", chk(actualSize(38, "mm", 40), 950), "vein wall", chk(actualSize(2, "mm", 40), 50));
