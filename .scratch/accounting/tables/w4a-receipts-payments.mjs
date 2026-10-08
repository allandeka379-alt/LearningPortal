import { tAccount } from "../lib.mjs";
import { fundAtDate, r2, sum } from "./w4a-lib.mjs";
const rec = [["1 Jan 2025", "Balance b/d", 1240], ["", "Subscriptions", 6850], ["", "Donations", 1500], ["", "Gate takings", 2310], ["", "Fundraising dinner: ticket sales", 3200]];
const pay = [["", "Ground rent", 2400], ["", "Football kit", 3150], ["", "Coach's honorarium", 1800], ["", "Travel to matches", 2670], ["", "Fundraising dinner: costs", 1380], ["", "New goal posts", 1950]];
console.log(tAccount("Receipts and payments account for the year ended 31 December 2025", rec, pay, { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
console.log(r2(sum(rec.map(x=>x[2])) - sum(pay.map(x=>x[2]))));
const f = fundAtDate("Mutare Youth Football Club", "at 1 January 2025", [["Equipment", 4800], ["Subscriptions in arrears", 300], ["Bank", 1240]], [["Subscriptions in advance", 150], ["Ground rent owing", 400]]);
console.log(f.md, f.fund);
