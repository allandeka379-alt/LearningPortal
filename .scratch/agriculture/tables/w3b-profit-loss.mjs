// Lesson numbers for business/profit-loss.
import { profitLoss, money } from "../lib.mjs";
const a = profitLoss({ income: [["94 broilers at 6.50", 94 * 6.5]], expenses: [["100 chicks at 0.90", 90], ["8 bags feed at 28", 8 * 28], ["Vaccines", 8], ["Electricity for brooding", 25], ["Transport", 15], ["Litter", 6]] });
console.log(a, 94 * 6.5);
const b = profitLoss({ income: [["Sales", 140], ["Closing valuation", 95]], expenses: [["Opening valuation", 60], ["Feed", 70], ["Vet", 10]] });
console.log(b);
