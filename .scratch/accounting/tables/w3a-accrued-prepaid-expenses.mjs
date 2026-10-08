import { tAccount, journal, statement, check, r2 } from "../lib.mjs";
// Ex1 rent 450/month, paid 6,300
const paid = 6300, exp = 450 * 12, pre = r2(paid - exp); check("pre", pre, 900);
console.log(tAccount("Rent account", [["Various", "Bank", paid]], [["31 Dec 2025", "Income statement", exp]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026", cd: "Prepaid c/d", bd: "Prepaid b/d" }));
console.log();
console.log(journal([{ date: "31 Dec 2025", lines: [["Other receivables (rent prepaid)", pre, null], ["Rent", null, pre]], narrative: "Rent paid in advance at the year end" }]));
// Ex2 electricity
const o = 380, p = 3140, c = 415; const e = r2(p - o + c); check("e", e, 3175);
console.log();
console.log(tAccount("Electricity account", [["Various", "Bank", p], ["31 Dec 2025", "Accrued c/d", c]], [["1 Jan 2025", "Accrued b/d", o], ["31 Dec 2025", "Income statement", e]], { balance: "auto" }));
// Ex3 insurance
const op = 240, ip = 1560, cp = r2(ip * 3 / 12), ie = r2(op + ip - cp); check("ie", ie, 1410);
console.log();
console.log(tAccount("Insurance account", [["1 Jan 2025", "Prepaid b/d", op], ["1 Apr 2025", "Bank", ip]], [["31 Dec 2025", "Income statement", ie]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026", cd: "Prepaid c/d", bd: "Prepaid b/d" }));
console.log();
console.log(statement("at 31 December 2025", [["**Current assets**", null, null], ["Other receivables (prepayments: rent 900, insurance 390)", null, pre + cp], [null, null, null], ["**Current liabilities**", null, null], ["Other payables (accrued electricity)", null, c]], { checks: [["pp", pre + cp, 1290]] }));
