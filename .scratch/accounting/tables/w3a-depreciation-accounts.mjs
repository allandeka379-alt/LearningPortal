import { tAccount, journal, statement, check, r2, sum } from "../lib.mjs";
import { U } from "./w3a-lib.mjs";
// Ex1: equipment 21,000 on 1 Jan 2023; 10% on cost SL
const c = 21000, d = r2(c * 0.1);
console.log(tAccount("Bakery equipment account", [["1 Jan 2023", "Bank", c]], [], { cdDate: "31 Dec 2023", bdDate: "1 Jan 2024" }));
console.log();
console.log(journal([{ date: "31 Dec 2023", lines: [["Income statement (depreciation)", d, null], ["Provision for depreciation: equipment", null, d]], narrative: "Depreciation of equipment for 2023, 10% on cost" }]));
console.log();
console.log(tAccount("Provision for depreciation: bakery equipment account",
  [],
  [["1 Jan 2025", "Balance b/d", 2 * d], ["31 Dec 2025", "Income statement", d]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
console.log();
const nbv = c - 3 * d;
console.log(statement("at 31 December 2025", [["**Non-current assets**", null, null, null], ["Bakery equipment", c, 3 * d, nbv]], { cols: ["Cost " + U, "Accumulated depreciation " + U, "Net book value " + U], checks: [["nbv", nbv, 14700]] }));
// Ex2: vehicles
const cost0 = 36000, prov0 = 13500, add = 12000;
const charge = r2(0.2 * (cost0 + add - prov0));
check("charge", charge, 6900);
console.log();
console.log(tAccount("Motor vehicles account", [["1 Jan 2025", "Balance b/d", cost0], ["1 Jul 2025", "Bank", add]], [], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
console.log();
console.log(tAccount("Provision for depreciation: motor vehicles account", [], [["1 Jan 2025", "Balance b/d", prov0], ["31 Dec 2025", "Income statement", charge]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
const vc = cost0 + add, vp = prov0 + charge;
console.log();
console.log(statement("at 31 December 2025", [["**Non-current assets**", null, null, null], ["Premises", 60000, null, 60000], ["Motor vehicles", vc, vp, r2(vc - vp)], [null, 60000 + vc, vp, r2(60000 + vc - vp)]], { cols: ["Cost " + U, "Accumulated depreciation " + U, "Net book value " + U], checks: [["vnbv", vc - vp, 27600], ["tot", 60000 + vc - vp, 87600]] }));
