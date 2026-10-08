import { tAccount } from "../lib.mjs";
import { cashBook } from "./w2a-lib.mjs";
const e1 = cashBook("Cash book (March 2025)",
 [["1 Mar", "Balances b/d", 320, 2450], ["3 Mar", "Sales", 640, null], ["8 Mar", "Tendai Moyo", null, 1150], ["12 Mar", "Cash (C)", null, 400], ["15 Mar", "Sales (card)", null, 1260], ["24 Mar", "Bank (C)", 250, null]],
 [["5 Mar", "Rent", null, 900], ["10 Mar", "Wages", 380, null], ["12 Mar", "Bank (C)", 400, null], ["19 Mar", "Mutare Meats", null, 1740], ["24 Mar", "Cash (C)", null, 250], ["28 Mar", "Drawings", 150, null]],
 { discounts: false, cdDate: "31 Mar", bdDate: "1 Apr" });
console.log(e1.md, "\n", e1.cash, e1.bank, "\n");
const e2 = cashBook("Cash book (June 2025)",
 [["1 Jun", "Balance b/d", 150, null], ["4 Jun", "Fares", 1820, null], ["6 Jun", "Cash (C)", null, 1500], ["18 Jun", "Bulawayo School", null, 700]],
 [["1 Jun", "Balance b/d", null, 600], ["6 Jun", "Bank (C)", 1500, null], ["9 Jun", "Fuel", null, 1240], ["14 Jun", "Wages", null, 950], ["22 Jun", "Repairs", 260, null], ["27 Jun", "Insurance", null, 480]],
 { discounts: false, cdDate: "30 Jun", bdDate: "1 Jul" });
console.log(e2.md, "\n", e2.cash, e2.bank);
console.log(tAccount("Wages account", [["14 Jun", "Bank", 950]], [], { balance: false }));
