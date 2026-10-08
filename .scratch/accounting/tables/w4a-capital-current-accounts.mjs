import { columnar, headed, appropriation, r2, sum } from "./w4a-lib.mjs";
const e1a = appropriation({ name: "T & N Transport", partners: ["Tatenda", "Nyasha"], profit: 31620, iod: [360, 240], ioc: [2400, 1500], salary: [0, 4800], ratio: [3, 2] });
const c1 = columnar("Current accounts", ["Tatenda", "Nyasha"],
  [["1 Jan 2025", "Balance b/d", [null, 420]], ["31 Dec 2025", "Drawings", [6000, 4000]], ["31 Dec 2025", "Interest on drawings", e1a.iod]],
  [["1 Jan 2025", "Balance b/d", [1850, null]], ["31 Dec 2025", "Interest on capital", e1a.ioc], ["31 Dec 2025", "Salary", [null, 4800]], ["31 Dec 2025", "Share of profit", e1a.shares]]);
console.log(c1.md); console.log(c1.closing);
const cap = columnar("Capital accounts", ["Tatenda", "Nyasha"], [], [["1 Jan 2025", "Balance b/d", [40000, 25000]]]);
console.log(cap.md);
const c2 = columnar("Current accounts", ["Thandeka", "Rudo"],
  [["31 Dec 2025", "Drawings", [4860, 7330]]],
  [["1 Jan 2025", "Balance b/d", [1500, 310]], ["31 Dec 2025", "Interest on capital", [1500, 1000]], ["31 Dec 2025", "Salary", [null, 2400]], ["31 Dec 2025", "Share of profit", [4200, 2800]]]);
console.log(c2.md); console.log(c2.closing);
const curTot = sum(c2.closing);
console.log(headed("Thandeka and Rudo", "Statement of financial position (extract)", "at 31 December 2025", [["**Capital accounts**", null, null, null], ["Thandeka", null, null, 30000], ["Rudo", null, null, 20000], ["", null, null, 50000], ["**Current accounts**", null, null, null], ["Thandeka", null, c2.closing[0], null], ["Rudo", null, c2.closing[1], null], ["", null, null, curTot], ["", null, null, r2(50000 + curTot)]], { cols: ["US\$", "US\$", "US\$"], checks: [["cur", curTot, c2.closing[0] + c2.closing[1]]] }));
