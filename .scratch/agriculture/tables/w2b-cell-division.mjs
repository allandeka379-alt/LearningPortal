// Lesson numbers for breeding/cell-division.
import { check } from "../lib.mjs";
// Worked example 1: cells after 4 rounds of mitosis from one cell.
console.log("cells after 4 mitoses", 2 ** 4);
// Worked example 2: cattle 2n = 60: gametes 30; zygote 60; 3 cells entering meiosis -> 12 gametes.
const diploid = 60, haploid = diploid / 2;
check(haploid === 30, "haploid");
console.log("haploid", haploid, "zygote", haploid * 2, "gametes from 3 cells", 3 * 4);
