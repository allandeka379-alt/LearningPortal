import { latticeEnergyFromCycle } from "../lib.mjs";
console.log("NaCl", latticeEnergyFromCycle(-411, [107, 494, 121, -349]));
console.log("MgO", latticeEnergyFromCycle(-602, [148, 736, 1450, 249, -141, 798]), "sum", 148+736+1450+249-141+798);
console.log("cumulative NaCl", 107, 107+494, 107+494+121, 107+494+121-349);
