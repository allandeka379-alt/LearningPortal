import { idealGasMoles, mrFromGas, cm3ToM3, kPaToPa, cToK, R, sfStr } from "../lib.mjs";
console.log("ex1", idealGasMoles(kPaToPa(101), cm3ToM3(500), cToK(25)));
console.log("ex2", mrFromGas(0.250, kPaToPa(101), cm3ToM3(98.0), cToK(100)));
const n=1.50; const V = n*R*cToK(27)/kPaToPa(200); console.log("ex3 V m3", V, V*1e3, "dm3");
