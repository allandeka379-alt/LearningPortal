// W2b lesson numbers: rapid diagnostic test evaluation (hypothetical).
import { chk, dpStr } from "../lib.mjs";
const infected = 250, posInInfected = 237; // microscopy-confirmed malaria
const notInf = 400, negInNot = 388;
console.log("sensitivity", posInInfected / infected * 100, "specificity", negInNot / notInf * 100);
