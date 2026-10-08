import { tAccount, balanceOf, check } from "../lib.mjs";
import { table } from "./w2b-lib.mjs";
// Example 1: Tatenda's transport business
const dr1 = [["31 Dec", "Balance b/d", 2845], ["31 Dec", "Credit transfer: Mutare Lodge", 640], ["31 Dec", "Interest received", 17]];
const cr1 = [["31 Dec", "Bank charges", 38], ["31 Dec", "Insurance (standing order)", 150], ["31 Dec", "Electricity (direct debit)", 212], ["31 Dec", "Moyo (dishonoured cheque)", 325]];
const b1 = balanceOf(dr1, cr1);
check("b1", b1.amount, 2777);
console.log("@@CB1");
console.log(tAccount("Cash book (bank columns) of Tatenda", dr1, cr1, { cdDate: "31 Dec", bdDate: "1 Jan" }));
// Example 2: Chipo's overdraft and errors
const dr2 = [["31 Dec", "Error: receipts undercast", 100], ["31 Dec", "Credit transfer: Avondale Chess Club", 900]];
const cr2 = [["31 Dec", "Balance b/d", 1260], ["31 Dec", "Error: Kanda Wholesalers cheque (486 − 468)", 18], ["31 Dec", "Interest on overdraft", 54], ["31 Dec", "Bank charges", 27]];
const b2 = balanceOf(dr2, cr2);
check("b2", b2.amount, 359);
console.log("@@CB2");
console.log(tAccount("Cash book (bank columns) of Chipo", dr2, cr2, { cdDate: "31 Dec", bdDate: "1 Jan" }));
console.log("@@ITEMS");
console.log(table(["Item on the bank statement", "Effect on the business's bank balance", "Entry in the cash book"], [
  ["Bank charges", "Reduces it", "Credit (payments side)"],
  ["Interest charged on an overdraft or loan", "Reduces it", "Credit"],
  ["Standing order (fixed regular payment, e.g. rent)", "Reduces it", "Credit"],
  ["Direct debit (variable amount collected by a supplier)", "Reduces it", "Credit"],
  ["Dishonoured cheque from a customer", "Reduces it", "Credit, and debit the customer again"],
  ["Credit transfer received from a customer", "Increases it", "Debit (receipts side)"],
  ["Interest received or dividends paid in directly", "Increases it", "Debit"],
]));
