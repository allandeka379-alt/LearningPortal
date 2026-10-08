// Tables for lessons/labour/wage-differentials.md (W2b).
import { table, pctChange, roundTo, check } from "../lib.mjs";
const occ = [
  ["General farm hand", "Primary", "Unskilled", 150],
  ["Machine operator, food factory", "Secondary", "Semi-skilled", 320],
  ["Electrician", "Secondary", "Skilled", 640],
  ["Bank teller", "Tertiary", "Semi-skilled", 450],
  ["Medical doctor (public hospital)", "Tertiary", "Skilled", 1200],
];
console.log(table(["Occupation", "Sector", "Skill level", "Average monthly earnings (US\\$)"], occ));
const times = 1200 / 150;
check("times", times, 8);
console.log("doctor/farm", times, "electrician vs operator %", roundTo(pctChange(320, 640), 1));
// Worked example 2: gender pay gap in a fictional firm.
const men = 540, women = 450;
const gap = ((men - women) / men) * 100;
console.log("gap % of men's", roundTo(gap, 1));
