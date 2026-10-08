// Tables for lessons/fundamentals/accounting-cycle.md (W1a).
import { tAccount, trialBalance, statement, balanceOf } from "../lib.mjs";
const bankDr = [["1 Mar", "Capital", 5000], ["8 Mar", "Sales", 2650]];
const bankCr = [["15 Mar", "Rent", 400], ["20 Mar", "Moyo Wholesalers", 1000]];
console.log(tAccount("Bank account", bankDr, bankCr, { cdDate: "31 Mar", bdDate: "1 Apr" }));
console.log();
console.log(tAccount("Moyo Wholesalers account", [["20 Mar", "Bank", 1000]], [["3 Mar", "Purchases", 1800]], { cdDate: "31 Mar", bdDate: "1 Apr" }));
const bank = balanceOf(bankDr, bankCr).amount;
console.log();
const tb = trialBalance("Tatenda Traders: trial balance at 31 March 2026", [["Bank", bank, null], ["Purchases", 1800, null], ["Rent", 400, null], ["Capital", null, 5000], ["Sales", null, 2650], ["Moyo Wholesalers", null, 800]]);
console.log(tb.md);
console.log();
const gp = 2650 - 1800, np = gp - 400;
console.log(statement("Tatenda Traders: income statement for the month ended 31 March 2026", [["Sales", null, 2650], ["Less cost of sales (purchases)", null, -1800], ["**Gross profit**", null, gp], ["Less rent", null, -400], ["**Profit for the month**", null, np]], { checks: [["gp", gp, 850], ["np", np, 450]] }));
