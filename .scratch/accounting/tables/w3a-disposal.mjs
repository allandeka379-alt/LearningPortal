import { tAccount, journal, check, r2, sum } from "../lib.mjs";
// Ex1 van
const cost = 25000, acc = 3 * 5000, proceeds = 9500;
const loss = r2(cost - acc - proceeds); check("loss", loss, 500);
console.log(journal([
  { date: "30 Jun 2025", lines: [["Disposal of motor van", cost, null], ["Motor van", null, cost]], narrative: "Transfer of the cost of the van sold" },
  { date: "30 Jun 2025", lines: [["Provision for depreciation: motor van", acc, null], ["Disposal of motor van", null, acc]], narrative: "Transfer of the depreciation on the van sold" },
  { date: "30 Jun 2025", lines: [["Bank", proceeds, null], ["Disposal of motor van", null, proceeds]], narrative: "Proceeds from the sale of the van" },
  { date: "31 Dec 2025", lines: [["Income statement", loss, null], ["Disposal of motor van", null, loss]], narrative: "Loss on disposal of the van" },
]));
console.log();
console.log(tAccount("Disposal of motor van account", [["30 Jun 2025", "Motor van", cost]], [["30 Jun 2025", "Provision for depreciation", acc], ["30 Jun 2025", "Bank", proceeds], ["31 Dec 2025", "Income statement (loss)", loss]], { balance: "auto" }));
// Ex2 part exchange
const mc = 16000, rate = 10;
const d23 = r2(mc * rate / 100 * 9 / 12), d24 = r2(mc * rate / 100), d25 = r2(mc * rate / 100 * 9 / 12);
const provB = d23 + d24; check("provB", provB, 2800);
const accM = r2(provB + d25); check("accM", accM, 4000);
const allow = 13100, newCost = 20000, paid = newCost - allow;
const profit = r2(allow - (mc - accM)); check("profit", profit, 1100);
console.log();
console.log(tAccount("Machinery account", [["1 Jan 2025", "Balance b/d", mc], ["30 Sep 2025", "Disposal (part-exchange allowance)", allow], ["30 Sep 2025", "Bank", paid]], [["30 Sep 2025", "Disposal of machinery", mc]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
console.log();
console.log(tAccount("Provision for depreciation: machinery account", [["30 Sep 2025", "Disposal of machinery", accM]], [["1 Jan 2025", "Balance b/d", provB], ["30 Sep 2025", "Income statement", d25], ["31 Dec 2025", "Income statement", r2(newCost * rate / 100 * 3 / 12)]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
console.log();
console.log(tAccount("Disposal of machinery account", [["30 Sep 2025", "Machinery", mc], ["31 Dec 2025", "Income statement (profit)", profit]], [["30 Sep 2025", "Provision for depreciation", accM], ["30 Sep 2025", "Machinery (part-exchange)", allow]]));
console.log(d23, d24, d25, paid);
