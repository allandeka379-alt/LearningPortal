import { field, fmtNum } from "../lib.mjs";
// Worked example: farm 800 m x 500 m
const farm = field(800, 500);
console.log("farm", farm);
const arable = field(500, 300); // arable block
console.log("arable", arable, "four equal fields", arable.ha / 4);
console.log("rest", farm.ha - arable.ha);
// paddocks: grazing 24 ha in 4 paddocks, rotational
console.log("paddock", 24 / 4);
