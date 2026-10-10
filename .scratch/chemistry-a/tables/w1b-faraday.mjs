import { charge, molesElectrons, massLiberated, gasLiberatedRTP, avogadroFromElectrolysis, sfStr, F } from "../lib.mjs";
{ const Q = charge(0.500, 30 * 60); console.log("Cu Q", Q, "mol e", molesElectrons(Q), "mass", massLiberated(Q, 63.5, 2)); }
{ const Q = charge(1.50, 20 * 60); console.log("O2 Q", Q, "mol e", molesElectrons(Q), "mol O2", molesElectrons(Q) / 4, "vol", gasLiberatedRTP(Q, 4)); }
{ const Q = charge(0.400, 40 * 60); const ne = molesElectrons(Q); const nM = 1.07 / 107.9; console.log("charge Q", Q, "ne", ne, "nM", nM, "z", ne / nM); }
{ const Q = charge(0.300, 45 * 60); const n = 0.267 / 63.5; console.log("Avog Q", Q, "nCu", n, "ne", 2 * n, "L", avogadroFromElectrolysis(Q, 0.267, 63.5, 2), "e per Cu? Q/e", Q / 1.6e-19); }
