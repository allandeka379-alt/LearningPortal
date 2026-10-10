import { Mr, moles, sfStr } from "../lib.mjs";
// Lesson: silver from Tollens' with 0.880 g ethanal
const n = moles(0.88, Mr("CH3CHO")); console.log("ethanal", Mr("CH3CHO"), n, "Ag", sfStr(2*n*107.9,3));
// Lesson: Mr from formula C5H10O
console.log(Mr("C5H10O"));
