// Tables for lessons/labour/wage-determination.md (W2b).
import { schedule, check, money } from "../lib.mjs";
const w = [10, 12, 14, 16, 18];
const ld = w.map((x) => 900 - 30 * x), ls = w.map((x) => -150 + 45 * x);
const A = schedule({ prices: w, qd: ld, qs: ls, priceHeader: "Daily wage (US\\$)", qdHeader: "Bricklayers demanded", qsHeader: "Bricklayers supplied", requireEquilibrium: true });
console.log(A.md, A.equilibrium, A.excess);
const ld2 = ld.map((x) => x + 150);
const B = schedule({ prices: w, qd: ld, qs: ls, priceHeader: "Daily wage (US\\$)", qdHeader: "Demanded before the boom", qsHeader: "Supplied", requireEquilibrium: true, extra: [{ header: "Demanded after the boom", values: ld2 }] });
console.log(B.md);
const B2 = schedule({ prices: w, qd: ld2, qs: ls, requireEquilibrium: true });
console.log(B2.equilibrium, B2.excess);
check("bill1", 14 * 480, 6720);
check("bill2", 16 * 570, 9120);
console.log(money(14 * 480), money(16 * 570));
