// Tables for lessons/ledger/posting-balancing.md (W1b).
import { tAccount, runningBalance, check, balanceOf } from "../lib.mjs";

// Example 1: Chipo's Poultry Project, bank account, May 2025
const dr = [["1 May", "Balance b/d", 2350], ["4 May", "Sales", 1180], ["19 May", "Farai Ncube", 640], ["30 May", "Sales", 935]];
const cr = [["9 May", "Purchases", 860], ["14 May", "Wages", 420], ["23 May", "Motor repairs", 275], ["28 May", "Drawings", 300]];
console.log(tAccount("Bank account", dr, cr, { cdDate: "31 May", bdDate: "1 Jun" }));
const bal = balanceOf(dr, cr);
console.log(bal);
console.log();
// Same in running balance
const rb1 = runningBalance("Bank account", [...dr.slice(1).map((x) => [x[0], x[1], x[2], null]), ...cr.map((x) => [x[0], x[1], null, x[2]])].sort((a, b) => parseInt(a[0]) - parseInt(b[0])), { opening: 2350 });
console.log(rb1.md);
check("rb = T", rb1.closing, bal.amount);
console.log();

// Example 2: Gweru Feeds (supplier) running balance
const rb2 = runningBalance("Gweru Feeds account", [
  ["1 May", "Balance", null, 1420],
  ["6 May", "Purchases", null, 980],
  ["10 May", "Returns outwards", 120, null],
  ["20 May", "Bank", 1300, null],
  ["27 May", "Purchases", null, 640],
]);
console.log(rb2.md, rb2.closing);
const t2 = tAccount("Gweru Feeds account", [["10 May", "Returns outwards", 120], ["20 May", "Bank", 1300]], [["1 May", "Balance b/d", 1420], ["6 May", "Purchases", 980], ["27 May", "Purchases", 640]], { cdDate: "31 May", bdDate: "1 Jun" });
console.log(t2);
