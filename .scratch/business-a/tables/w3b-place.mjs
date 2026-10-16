import { table, chk, r2, costing } from "../lib.mjs";
const m = 2.0, w = costing.priceFromMarkUp(m, 20), r = costing.priceFromMarkUp(w, 30);
chk(w, 2.4); chk(r, 3.12);
console.log(table(["Stage", "Buys at (US\$)", "Mark-up", "Sells at (US\$)"], [["Manufacturer", "-", "-", m.toFixed(2)], ["Wholesaler", m.toFixed(2), "20%", w.toFixed(2)], ["Retailer", w.toFixed(2), "30%", r.toFixed(2)]], ["l","r","r","r"]));
// direct: sells at 2.60 incl delivery cost 0.35 per unit, 8000 units/month
const direct = 2.6, del = 0.35, q = 8000;
console.log("direct net per unit", direct - del, "vs wholesaler", m, "extra per unit", direct - del - m, "monthly extra", (direct - del - m) * q);
console.log("consumer saves", r - direct);
