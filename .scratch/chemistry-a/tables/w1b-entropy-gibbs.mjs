import { entropyChange, gibbs, feasibilityT, sfStr, dpStr } from "../lib.mjs";
const dS1 = entropyChange([[1, 39.7], [1, 213.6]], [[1, 92.9]]);
console.log("CaCO3 dS", dS1, "G298", gibbs(178, 298, dS1), "T", feasibilityT(178, dS1), "G1200", gibbs(178, 1200, dS1));
const dS2 = entropyChange([[2, 192.3]], [[1, 191.6], [3, 130.6]]);
console.log("NH3 dS", dS2, "G298", gibbs(-92.2, 298, dS2), "T", feasibilityT(-92.2, dS2), "G700", gibbs(-92.2, 700, dS2));
