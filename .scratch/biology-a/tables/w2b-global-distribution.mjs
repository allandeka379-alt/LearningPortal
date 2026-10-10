// W2b lesson numbers: epidemiology (hypothetical town).
import { chk, dpStr, sfStr, table } from "../lib.mjs";
const pop = 48000, newCases = 156, existing = 1032, deaths = 18;
const inc = (newCases / pop) * 100000;
const prev = ((newCases + existing) / pop) * 100000;
const mort = (deaths / pop) * 100000;
console.log("incidence per 100000", inc, "prev", prev, "mort", mort);
// Example table: sickle-cell trait frequency vs malaria (illustrative regions)
console.log(table(["Region (illustrative)", "Malaria historically", "Adults with sickle cell trait / %"], [["A", "High transmission all year", "20"], ["B", "Seasonal transmission", "9"], ["C", "Little or none", "1"]]));
