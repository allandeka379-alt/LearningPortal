import { receivablesAccount, payablesAccount, expenseAccount, tAccount, r2, sum, check } from "./w4b-lib.mjs";
const ra = receivablesAccount({ opening: 3640, receipts: 41870, discounts: 520, returns: 690, irrecoverable: 310, closing: 4280 });
console.log(ra.md, "\ncredit sales", ra.creditSales, "\n");
const pa = payablesAccount({ opening: 2950, payments: 30460, discounts: 380, returns: 540, closing: 3420 });
console.log(pa.md, "\ncredit purchases", pa.creditPurchases, "\n");
// Ex2: bank summary to find drawings
const dr = [["1 Jan", "Balance b/d", 1860], ["31 Dec", "Receipts from trade receivables", 38450], ["31 Dec", "Cash sales banked", 9720]];
const crKnown = [["31 Dec", "Payments to trade payables", 29880], ["31 Dec", "Rent", 3300], ["31 Dec", "Wages", 6240], ["31 Dec", "Electricity", 1170]];
const closing = 2410;
const drawings = r2(sum(dr.map(x=>x[2])) - sum(crKnown.map(x=>x[2])) - closing);
const cr = [...crKnown, ["31 Dec", "Drawings (missing figure)", drawings]];
console.log(tAccount("Bank account (summary)", dr, cr, { cdDate: "31 Dec", bdDate: "1 Jan" }), "\ndrawings", drawings, "\n");
const rent = expenseAccount({ title: "Rent account", openPrepaid: 250, paid: 3300, closePrepaid: 300 });
console.log(rent.md, "\nrent charge", rent.charge);
const elec = expenseAccount({ title: "Electricity account", openAccrued: 140, paid: 1170, closeAccrued: 95 });
console.log(elec.md, "\nelec charge", elec.charge);
