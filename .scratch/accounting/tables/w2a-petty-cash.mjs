import { tAccount } from "../lib.mjs";
import { pettyCash } from "./w2a-lib.mjs";
const pc = pettyCash("Petty cash book (August 2025)", {
  receipts: [["1 Aug", "Bank", 250]],
  payments: [["2 Aug", "Postage stamps", "1", "Postage", 18], ["4 Aug", "Cleaning materials", "2", "Cleaning", 26.5], ["7 Aug", "Bus fares", "3", "Travel", 14], ["11 Aug", "Envelopes and pens", "4", "Stationery", 22], ["15 Aug", "T. Ndlovu", "5", "Ledger", 45], ["19 Aug", "Cleaner's wages", "6", "Cleaning", 30], ["23 Aug", "Courier", "7", "Postage", 16.5], ["27 Aug", "Taxi fare", "8", "Travel", 21]],
  cols: ["Postage", "Cleaning", "Travel", "Stationery", "Ledger"], imprest: 250, cdDate: "31 Aug", bdDate: "1 Sep", restoreDate: "1 Sep", restoreDetails: "Bank" });
console.log(pc.md, "\n", pc.paid, pc.colTotals, pc.balance, pc.restore, "\n");
console.log(tAccount("Postage account", [["31 Aug", "Petty cash", pc.colTotals[0]]], [], { balance: false }) + "\n");
console.log(tAccount("Cleaning account", [["31 Aug", "Petty cash", pc.colTotals[1]]], [], { balance: false }) + "\n");
console.log(tAccount("T. Ndlovu account", [["15 Aug", "Petty cash", 45]], [["1 Aug", "Balance b/d", 45]]) + "\n");
