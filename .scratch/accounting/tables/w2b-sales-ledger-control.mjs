import { check } from "../lib.mjs";
import { control, table } from "./w2b-lib.mjs";
// Example 1: Nyasha
const c1 = control("Sales ledger control account", [["1 Dec", "Balance b/d", 6240], ["31 Dec", "Sales", 18750], ["31 Dec", "Bank (dishonoured cheque)", 345]], [["31 Dec", "Bank", 16385], ["31 Dec", "Discount allowed", 412], ["31 Dec", "Returns inwards", 638], ["31 Dec", "Irrecoverable debts", 290]], { cdDate: "31 Dec", bdDate: "1 Jan" });
check("c1", c1.drBalance, 7610);
console.log("@@C1");
console.log(c1.md);
// Example 2: Farai, both balances
const c2 = control("Sales ledger control account", [["1 Dec", "Balance b/d", 8915], ["31 Dec", "Sales", 24360], ["31 Dec", "Bank (dishonoured cheques)", 620], ["31 Dec", "Interest on overdue accounts", 48], ["31 Dec", "Bank (refund to customer)", 95]], [["1 Dec", "Balance b/d", 186], ["31 Dec", "Bank", 21470], ["31 Dec", "Discount allowed", 538], ["31 Dec", "Returns inwards", 714], ["31 Dec", "Irrecoverable debts", 455], ["31 Dec", "Purchases ledger control (contra)", 370]], { crBalance: 212, cdDate: "31 Dec", bdDate: "1 Jan" });
console.log("@@DBG");
console.log(c2.drBalance);
console.log("@@C2");
console.log(c2.md);
console.log("@@SRC");
console.log(table(["Item", "Source (book of prime entry)", "Side of the control account"], [
  ["Credit sales", "Sales journal (total)", "Debit"],
  ["Returns inwards", "Returns inwards journal (total)", "Credit"],
  ["Receipts from credit customers", "Cash book (bank or cash column)", "Credit"],
  ["Discount allowed", "Cash book (discount column)", "Credit"],
  ["Dishonoured cheques", "Cash book (credit side)", "Debit"],
  ["Refunds paid to customers", "Cash book (credit side)", "Debit"],
  ["Irrecoverable debts written off", "General journal", "Credit"],
  ["Interest charged on overdue accounts", "General journal", "Debit"],
  ["Contras (set-offs) with the purchases ledger", "General journal", "Credit"],
]));
