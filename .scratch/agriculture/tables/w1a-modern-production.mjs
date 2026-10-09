import { grossMargin, dilution, money, pctChange, round } from "../lib.mjs";
// Worked example 1: conventional vs organic tomatoes on 0.1 ha (assumed)
const conv = grossMargin({ output: [["Tomatoes", 6000, 0.5]], variable: [["Seedlings", 150], ["Fertiliser", 220], ["Pesticides", 180], ["Labour", 400]] });
const org = grossMargin({ output: [["Tomatoes", 4800, 0.75]], variable: [["Seedlings", 150], ["Compost and manure", 160], ["Biological pest control", 90], ["Labour", 650], ["Certification", 100]] });
console.log("conv", conv.grossOutput, conv.variableCosts, conv.grossMargin);
console.log("org", org.grossOutput, org.variableCosts, org.grossMargin);
console.log("yield change", pctChange(6000, 4800));
// Worked example 2: hydroponic solution 4 mL/L in 250 L tank
console.log(dilution({ mlPerL: 4, tankL: 250 }));
