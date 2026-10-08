import { tAccount, journal, check, r2 } from "../lib.mjs";
console.log(journal([
  { date: "14 Aug 2025", lines: [["Irrecoverable debts", 1340, null], ["Gift Store", null, 1340]], narrative: "Debt written off: the business has closed and cannot pay" },
  { date: "20 Nov 2025", lines: [["Irrecoverable debts", 615, null], ["Mapfumo Builders", null, 615]], narrative: "Debt written off: customer cannot be traced" },
]));
console.log();
console.log(tAccount("Gift Store account", [["1 Aug 2025", "Balance b/d", 1340]], [["14 Aug 2025", "Irrecoverable debts", 1340]]));
console.log();
console.log(tAccount("Irrecoverable debts account", [["14 Aug 2025", "Gift Store", 1340], ["20 Nov 2025", "Mapfumo Builders", 615]], [["31 Dec 2025", "Income statement", 1955]]));
// Ex2 partial + recovered
const owed = 2500, paid = r2(owed * 0.4), wo = r2(owed - paid); check("wo", wo, 1500);
console.log();
console.log(tAccount("Kudzai Traders account", [["1 Mar 2025", "Balance b/d", owed]], [["30 Apr 2025", "Bank", paid], ["30 Apr 2025", "Irrecoverable debts", wo]]));
console.log();
console.log(journal([
  { date: "12 Jul 2025", lines: [["Ruvimbo Stores", 860, null], ["Irrecoverable debts recovered", null, 860]], narrative: "Debt written off in 2024 reinstated" },
  { date: "12 Jul 2025", lines: [["Bank", 860, null], ["Ruvimbo Stores", null, 860]], narrative: "Cash received from Ruvimbo Stores" },
]));
console.log();
console.log(tAccount("Ruvimbo Stores account", [["12 Jul 2025", "Irrecoverable debts recovered", 860]], [["12 Jul 2025", "Bank", 860]]));
