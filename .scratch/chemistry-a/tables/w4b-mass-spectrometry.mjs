import { arFromIsotopes, carbonsFromM1, sfStr, Mr } from "../lib.mjs";
console.log("B", sfStr(arFromIsotopes([[10, 19.9], [11, 80.1]]), 3));
console.log("n hexane", carbonsFromM1(1.65, 25.0), Mr("C6H14"));
console.log("C2H5Cl", 2*12+5+35, 2*12+5+37, "butanone", Mr("C4H8O"));
// two Cl ratio
const a=0.75,c=0.25; console.log("Cl2", a*a/(c*c), 2*a*c/(c*c), 1);
const br=0.5; console.log("Br2 1:2:1; ClBr", a*br, a*br+c*br, c*br);
