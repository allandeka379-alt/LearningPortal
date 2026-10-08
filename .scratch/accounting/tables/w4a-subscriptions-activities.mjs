import { subscriptions, activity, tClosed, r2 } from "./w4a-lib.mjs";
const s = subscriptions({ openArrears: 420, openAdvance: 180, received: 9360, closeArrears: 510, closeAdvance: 240 });
console.log(s.md); console.log(s.ie);
// bar payables account to find purchases
const paid = 12420, openP = 860, closeP = 1140;
const purch = r2(paid + closeP - openP);
console.log(tClosed("Bar payables account (total trade payables)", [["31 Dec 2025", "Bank", paid], ["31 Dec 2025", "Balance c/d", closeP]], [["1 Jan 2025", "Balance b/d", openP], ["31 Dec 2025", "Bar purchases (balancing figure)", purch]], [], [["1 Jan 2026", "Balance b/d", closeP]]));
const a = activity({ name: "Masvingo Golf Club", title: "Refreshment bar trading account", sales: 19650, openInv: 1320, purchases: purch, closeInv: 1580, expenses: [["Bar steward's wages", 2600]] });
console.log(a.md); console.log(purch, a);
