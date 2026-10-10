import { titre, meanTitre, molesFromSolution, concFrom, Mr, sfStr, dpStr, table } from "../lib.mjs";
// Ex1
const r = [[0.00,22.85],[22.85,45.20],[0.50,22.95],[1.20,23.65]];
const ts = r.map(([a,b])=>titre(a,b)); const mt = meanTitre(ts); console.log(ts.map(x=>x.toFixed(2)), mt);
const nAcid = molesFromSolution(mt.mean, 0.100); const nBase = 2*nAcid; console.log(nAcid, nBase, concFrom(nBase,25.0));
// Ex2 vinegar
const nN = molesFromSolution(21.85,0.100); const cd = concFrom(nN,25.0); console.log(nN, cd, cd*10, cd*10*Mr("CH3COOH"));
// Ex3 back titration
const tot = molesFromSolution(50.0,0.500), ex = molesFromSolution(25.30,0.400), re = tot-ex; console.log(tot, ex, re, re/2, re/2*Mr("CaCO3"));
