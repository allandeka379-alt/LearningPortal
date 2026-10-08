import { tAccount, check, r2 } from "../lib.mjs";
import { cashBook } from "./w2a-lib.mjs";
const d = (amt, pct) => r2(amt * pct / 100);
check("rb", d(1200,5), 60); check("gm", d(2000,2.5), 50); check("fn", 800-760, 40); check("bo", 1500-1425, 75); check("ht", 2400-2340, 60);
const e = cashBook("Cash book (July 2025)",
 [["1 Jul", "Balances b/d", null, 420, 3150], ["4 Jul", "Rudo Banda", 60, null, 1140], ["10 Jul", "Sales", null, 970, null], ["13 Jul", "Farai Ncube", 40, 760, null], ["16 Jul", "Cash (C)", null, null, 1300], ["29 Jul", "Hwange Traders", 60, null, 2340]],
 [["7 Jul", "Gweru Millers", 50, null, 1950], ["16 Jul", "Bank (C)", null, 1300, null], ["21 Jul", "Bulawayo Oils", 75, null, 1425], ["25 Jul", "Wages", null, 560, null]],
 { cdDate: "31 Jul", bdDate: "1 Aug" });
console.log(e.md, "\n", e.cash, e.bank, e.discAllowed, e.discReceived, "\n");
console.log(tAccount("Rudo Banda account", [["1 Jul", "Balance b/d", 1200]], [["4 Jul", "Bank", 1140], ["4 Jul", "Discount allowed", 60]]) + "\n");
console.log(tAccount("Discount allowed account", [["31 Jul", "Total for July (cash book)", e.discAllowed]], [], { balance: false }) + "\n");
console.log(tAccount("Discount received account", [], [["31 Jul", "Total for July (cash book)", e.discReceived]], { balance: false }));
