import { bondEnergyDH, ecell } from "../lib.mjs";
console.log("H2+Cl2", bondEnergyDH([[1, 436], [1, 242]], [[2, 431]]));
console.log("Ecell Cl2/Br-", ecell(1.36, 1.07));
console.log("H2+F2", bondEnergyDH([[1, 436], [1, 158]], [[2, 562]]));
