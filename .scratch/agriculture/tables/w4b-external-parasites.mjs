// Lesson numbers for health/external-parasites.
import { dilution, pctChange } from "../lib.mjs";
console.log("dip 15000 L at 2 mL/L", dilution({ mlPerL: 2, tankL: 15000 }));
console.log("tick count change 120 -> 18", pctChange(120, 18));
