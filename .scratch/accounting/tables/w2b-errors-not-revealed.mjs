import { trialBalance, tAccount } from "../lib.mjs";
// Example 2: error of original entry and complete reversal at Rudo's Masvingo shop, small ledger.
const correct = [["Capital", null, 6000], ["Bank", 4690, null], ["Purchases", 3200, null], ["Sales", null, 3780], ["Kudzai Phiri (trade receivable)", 1850, null], ["Rent", 640, null], ["Trade payables", null, 600]];
const recorded = [["Capital", null, 6000], ["Bank", 4690, null], ["Purchases", 3200, null], ["Sales", null, 3510], ["Kudzai Phiri (trade receivable)", 1580, null], ["Rent", 640, null], ["Trade payables", null, 600]];
console.log("@@TBC");
console.log(trialBalance("Trial balance if the invoice had been recorded correctly", correct).md);
console.log("@@TBR");
console.log(trialBalance("Trial balance as Rudo's clerk drew it up", recorded).md);
console.log("@@KP");
console.log(tAccount("Kudzai Phiri account (as recorded)", [["9 Mar", "Sales", 1580]], [], { balance: false }));
console.log("@@SA");
console.log(tAccount("Sales account (extract, as recorded)", [], [["9 Mar", "Kudzai Phiri", 1580]], { balance: false }));
