// W3a lesson figures (printed and pasted into the lessons; re-run to re-derive).
import { f, fmt, money, table, check, round } from "../lib.mjs";

// motivation-methods
const hrs = 42, rate = 2.5, ot = 6, otRate = rate * 1.5;
const basicPay = hrs * rate, otPay = ot * otRate, gross = basicPay + otPay;
check("time rate", gross, 127.5);
console.log("TIME RATE", basicPay, otRate, otPay, gross);
const shirts = 180, perShirt = 0.6, piece = shirts * perShirt;
console.log("PIECE", piece);
const basic = 300, commPct = 4, sales = 12500, comm = (sales * commPct) / 100, totalPay = basic + comm;
console.log("COMMISSION", comm, totalPay);
console.log(table(["Method", "Calculation", "Pay US\$"], [["Time rate (basic)", `${hrs} hours × ${fmt(rate)}`, basicPay], ["Overtime at time and a half", `${ot} hours × ${fmt(otRate)}`, otPay], ["Gross pay", "", gross]]));

// market-changes
const chipo = 45000, mkt = 300000;
console.log("SHARE1", f.marketShare(chipo, mkt));
const y1 = 30000, m1 = 250000, y2 = 36000, m2 = 400000;
console.log("SHARE y1", f.marketShare(y1, m1), "y2", f.marketShare(y2, m2), "sales growth %", ((y2 - y1) / y1) * 100, "market growth", ((m2 - m1) / m1) * 100);
console.log(table(["", "Year 1", "Year 2"], [["Business sales US\$", y1, y2], ["Total market sales US\$", m1, m2], ["Market share %", f.marketShare(y1, m1), f.marketShare(y2, m2)]]));

// demand-supply (lesson): tomatoes, crates per day
const pr = [4, 5, 6, 7, 8], qd = [120, 100, 80, 60, 40], qs = [40, 60, 80, 100, 120];
const eq = pr.findIndex((_, i) => qd[i] === qs[i]);
console.log("EQ", pr[eq], qd[eq], "surplus@8", qs[4] - qd[4], "shortage@4", qd[0] - qs[0]);
console.log(table(["Price per crate US\$", "Quantity demanded (crates)", "Quantity supplied (crates)"], pr.map((p, i) => [p, qd[i], qs[i]])));
const qd2 = qd.map((q) => q + 40);
const eq2 = pr.findIndex((_, i) => qd2[i] === qs[i]);
console.log("EQ2", pr[eq2], qs[eq2]);
console.log(table(["Price per crate US\$", "New quantity demanded (crates)", "Quantity supplied (crates)"], pr.map((p, i) => [p, qd2[i], qs[i]])));
