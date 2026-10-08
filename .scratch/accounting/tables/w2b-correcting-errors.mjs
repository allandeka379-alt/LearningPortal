import { journal, tAccount, r2, money } from "../lib.mjs";
console.log("@@J1");
console.log(journal([
  { date: "31 Dec", lines: [["N. Dube", 940, null], ["Sales", null, 940]], narrative: "Credit sale to N. Dube omitted from the books" },
  { date: "31 Dec", lines: [["R. Zulu", 315, null], ["R. Zhou", null, 315]], narrative: "Receipt from R. Zhou wrongly credited to R. Zulu" },
  { date: "31 Dec", lines: [["Office equipment", 1180, null], ["Office expenses", null, 1180]], narrative: "Computer wrongly debited to office expenses" },
], { title: "Journal (corrections)" }));
const diff = r2(2730 - 2370);
console.log("@@J2");
console.log(journal([
  { date: "31 Dec", lines: [["Lowveld Traders", diff, null], ["Purchases", null, diff]], narrative: `Invoice of ${money(2370)} entered as ${money(2730)} in the purchases journal` },
  { date: "31 Dec", lines: [["Cash", 1120, null], ["Sales", null, 1120]], narrative: `Cash sales of ${money(560)} debited to sales and credited to cash; reversal corrected` },
  { date: "31 Dec", lines: [["Sales", 150, null], ["Wages", null, 150]], narrative: `Sales and wages both overcast by ${money(150)}` },
], { title: "Journal (corrections)" }));
console.log("@@CASH");
console.log(tAccount("Cash account (extract)", [["31 Dec", "Sales (correction)", 1120]], [["12 Nov", "Sales", 560]], { cdDate: "", bdDate: "" , balance: false}));
