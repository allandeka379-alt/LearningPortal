// Lesson numbers for business/budgets.
import { grossMargin, partialBudget, money } from "../lib.mjs";
const g = grossMargin({ output: [["Maize grain (t)", 9, 290]], variable: [["Seed", 110], ["Basal fertiliser", 330], ["Top dressing", 250], ["Chemicals", 90], ["Hired labour", 160], ["Transport", 70], ["Bags", 40]], areaHa: 2 });
console.log(g.grossOutput, g.variableCosts, g.grossMargin, g.perHa);
const pb = partialBudget({ extraIncome: [["Soya beans 2.2 t x 480", 2.2 * 480]], costsSaved: [["Maize variable costs 1 ha", 525]], extraCosts: [["Soya variable costs", 410]], incomeLost: [["Maize 1 ha 4.5 t x 290", 4.5 * 290]] });
console.log(pb, 2.2 * 480, 4.5 * 290);
console.log("whole farm", 1560 + 640 + 900, 1560 + 640 + 900 - 1450);
