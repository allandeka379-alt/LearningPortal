// Tables for lessons/documents/source-documents.md (W1b). Run: node .scratch/accounting/tables/w1b-source-documents.mjs
import { statement, runningBalance, check, sum, r2, fmt } from "../lib.mjs";

// Example 1: invoice with trade discount
const lines = [["20 cartons of cooking oil at US\\$18", 20 * 18], ["15 bags of sugar (10 kg) at US\\$12", 15 * 12]];
const gross = sum(lines.map((l) => l[1]));
const td = r2(gross * 0.1);
const net = r2(gross - td);
check("net", net, 486);
console.log(
  statement(
    "Masvingo Wholesale Supplies — Invoice No. 2147 to Nyasha's Tuck Shop, 3 March 2025",
    [...lines.map(([l, a]) => [l, a]), ["Gross value of goods", gross], ["Less trade discount 10%", -td], ["**Amount due**", net]],
    { cols: ["US\\$"], checks: [["gross", gross, 540], ["td", td, 54]] },
  ),
);
console.log();

// Example 2: statement of account (running balance)
const s = runningBalance(
  "Masvingo Wholesale Supplies — Statement of account: Nyasha's Tuck Shop, April 2025",
  [
    ["1 Apr", "Balance brought forward", 486, null],
    ["4 Apr", "Invoice 2190", 720, null],
    ["9 Apr", "Credit note 77 (damaged goods)", null, 60],
    ["18 Apr", "Cheque received — thank you", null, 486],
    ["28 Apr", "Invoice 2236", 315, null],
  ],
);
check("closing", s.closing, 486 + 720 - 60 - 486 + 315);
console.log(s.md);
console.log("closing", s.closing, fmt(s.closing));
