import { Mr, sfStr } from "../lib.mjs";
const r = (s) => console.log(s, Mr(s));
["H2N(CH2)6NH2","HOOC(CH2)4COOH","ClOC(CH2)4COCl","C12H22N2O2","HOCH2CH2OH","HOOCC6H4COOH","C10H8O4","CH3CH(OH)COOH","C3H4O2","H2N(CH2)5COOH","C6H11NO","H2O","HCl"].forEach(r);
console.log("PET units in 3.84e4", 3.84e4/Mr("C10H8O4"));
console.log("nylon66 mass water per mol repeat", 2*Mr("H2O"));
