import { hessFormation, hessCombustion, bondEnergyDH, sfStr, dpStr } from "../lib.mjs";
console.log("NaHCO3 decomposition", hessFormation([[1, -1131], [1, -394], [1, -286]], [[2, -951]]));
console.log("propane formation from combustion", hessCombustion([[3, -394], [4, -286]], [[1, -2219]]));
console.log("CaCO3 decomposition from two reactions", -16 - (-194));
console.log("hydrogenation BE", bondEnergyDH([[1, 610], [1, 436]], [[1, 350], [2, 410]]));
console.log("hydrogenation Hess", hessFormation([[1, -84.0]], [[1, 52.2]]));
console.log("HCl BE", bondEnergyDH([[1, 436], [1, 242]], [[2, 431]]), "Hess 2x", 2 * -92.3);
