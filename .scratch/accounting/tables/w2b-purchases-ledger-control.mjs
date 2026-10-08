import { check } from "../lib.mjs";
import { control, table } from "./w2b-lib.mjs";
// Example 1: Thandeka
const c1 = control("Purchases ledger control account", [["31 Dec", "Bank", 20155], ["31 Dec", "Discount received", 497], ["31 Dec", "Returns outwards", 865]], [["1 Dec", "Balance b/d", 5380], ["31 Dec", "Purchases", 22640]], { drBalance: 0, cdDate: "31 Dec", bdDate: "1 Jan" });
check("c1", c1.crBalance, 6503);
console.log("@@C1");
console.log(c1.md);
// Example 2: Tendai
const c2 = control("Purchases ledger control account", [["1 Dec", "Balance b/d", 120], ["31 Dec", "Bank", 28760], ["31 Dec", "Discount received", 612], ["31 Dec", "Returns outwards", 1048], ["31 Dec", "Sales ledger control (contra)", 530]], [["1 Dec", "Balance b/d", 7940], ["31 Dec", "Purchases", 31285], ["31 Dec", "Bank (refund from supplier)", 120]], { drBalance: 85, cdDate: "31 Dec", bdDate: "1 Jan" });
console.log("@@DBG");
console.log(c2.crBalance);
console.log("@@C2");
console.log(c2.md);
console.log("@@SRC");
console.log(table(["Item", "Source (book of prime entry)", "Side of the control account"], [
  ["Credit purchases", "Purchases journal (total)", "Credit"],
  ["Returns outwards", "Returns outwards journal (total)", "Debit"],
  ["Payments to suppliers", "Cash book (credit side)", "Debit"],
  ["Discount received", "Cash book (discount column)", "Debit"],
  ["Refunds received from suppliers", "Cash book (debit side)", "Credit"],
  ["Contras (set-offs) with the sales ledger", "General journal", "Debit"],
]));
