// Tables for lessons/trade/comparative-advantage.md (W4b).
import { comparativeAdvantage, table, fmt, check } from "../lib.mjs";
// WE1 absolute advantage: Country P tobacco/wheat, Country Q.
const P1 = { x: 40, y: 20 }, Q1 = { x: 10, y: 30 };
const ca1 = comparativeAdvantage({ A: P1, B: Q1 });
console.log(table(["Country", "Tobacco (tonnes)", "Wheat (tonnes)"], [["Country P", P1.x, P1.y], ["Country Q", Q1.x, Q1.y]]));
console.log(ca1);
const before = { x: P1.x / 2 + Q1.x / 2, y: P1.y / 2 + Q1.y / 2 }, after = { x: P1.x, y: Q1.y };
console.log(table(["", "Tobacco (tonnes)", "Wheat (tonnes)"], [["Country P (half and half)", P1.x / 2, P1.y / 2], ["Country Q (half and half)", Q1.x / 2, Q1.y / 2], ["**Total before**", before.x, before.y], ["**Total after specialising**", after.x, after.y]]));
check("b", before.x, 25); check("b", before.y, 25);
// WE2 comparative: A maize/cloth.
const A = { x: 60, y: 30 }, B = { x: 20, y: 20 };
const ca = comparativeAdvantage({ A, B });
console.log(table(["Country", "Maize (tonnes)", "Cloth (thousand metres)"], [["Country A", A.x, A.y], ["Country B", B.x, B.y]]));
console.log(JSON.stringify(ca));
console.log(table(["Country", "Opportunity cost of 1 tonne of maize", "Opportunity cost of 1 thousand metres of cloth"], [["Country A", `${fmt(ca.oc.A.x, 2)} thousand metres of cloth`, `${fmt(ca.oc.A.y, 2)} tonnes of maize`], ["Country B", `${fmt(ca.oc.B.x, 2)} thousand metres of cloth`, `${fmt(ca.oc.B.y, 2)} tonnes of maize`]]));
const bef = { x: A.x / 2 + B.x / 2, y: A.y / 2 + B.y / 2 };
const shareCloth = (bef.y - B.y) / A.y; // A makes the rest of the cloth
const aft = { x: A.x * (1 - shareCloth), y: B.y + A.y * shareCloth };
console.log(bef, shareCloth, aft);
check("aft y", aft.y, bef.y); check("aft x", aft.x, 50);
console.log(table(["", "Maize (tonnes)", "Cloth (thousand metres)"], [["Country A (half and half)", A.x / 2, A.y / 2], ["Country B (half and half)", B.x / 2, B.y / 2], ["**Total before specialising**", bef.x, bef.y], ["Country A (one-sixth of resources on cloth)", aft.x, A.y * shareCloth], ["Country B (all resources on cloth)", 0, B.y], ["**Total after specialising**", aft.x, aft.y]]));
