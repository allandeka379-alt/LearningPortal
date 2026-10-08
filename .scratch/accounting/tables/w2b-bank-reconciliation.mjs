import { r2 } from "../lib.mjs";
import { bankRec } from "./w2b-lib.mjs";
// Example 1: Tatenda (in funds)
const st1 = r2(2777 + 412 + 1056 - 930);
console.log("@@DBG"); console.log(st1);
console.log("@@R1");
console.log(bankRec("Tatenda: Bank reconciliation statement at 31 December 2025", { start: 2777, add: [["Cheque 0418 to Sakubva Motors", 412], ["Cheque 0421 to Mutare Tyres", 1056]], less: [["Uncredited deposit", 930]], statement: 3315 }).md);
// Example 2: Chipo (overdraft) with a bank error
const st2 = r2(-359 + 285 - 1150 - 75);
console.log("@@DBGB"); console.log(st2);
console.log("@@R2");
console.log(bankRec("Chipo: Bank reconciliation statement at 31 December 2025", { start: -359, add: [["Unpresented cheque to Gweru Textiles", 285]], less: [["Uncredited deposit", 1150], ["Bank error: cheque of another customer charged to this account", 75]], statement: -1299 }).md);
console.log("@@R3");
console.log(bankRec("Chipo: Bank reconciliation statement at 31 December 2025 (starting from the bank statement)", { start: -1299, add: [["Uncredited deposit", 1150], ["Bank error: cheque of another customer charged to this account", 75]], less: [["Unpresented cheque to Gweru Textiles", 285]], statement: -359, startLabel: "Balance as per bank statement", endLabel: "Balance as per updated cash book" }).md);
