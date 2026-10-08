import { tAccount, statement, r2 } from "../lib.mjs";
import { dayBook, net } from "./w2a-lib.mjs";
const s = [["6 Jul", "Rudo Moyo", "CN 18", net(400, 25)], ["14 Jul", "Gwanda Clinic", "CN 19", 180], ["25 Jul", "Rudo Moyo", "CN 20", net(120, 25)]];
const sr = dayBook("Sales returns journal (July 2025)", s, { nameCol: "Customer", refCol: "Credit note", totalLabel: "Transferred to returns inwards account", totalDate: "31 Jul" });
console.log(sr.md + "\n");
console.log(tAccount("Rudo Moyo account", [["2 Jul", "Sales", 2400]], [["6 Jul", "Returns inwards", s[0][3]], ["25 Jul", "Returns inwards", s[2][3]]], { cdDate: "31 Jul", bdDate: "1 Aug" }) + "\n");
console.log(tAccount("Returns inwards account", [["31 Jul", "Total sales returns", sr.total]], [], { balance: false }) + "\n");
const p = [["8 Aug", "Harare Wholesalers", "C 12", 240], ["19 Aug", "Bulawayo Foods", "BF-C 4", 135], ["28 Aug", "Harare Wholesalers", "C 15", 95]];
const pr = dayBook("Purchases returns journal (August 2025)", p, { nameCol: "Supplier", refCol: "Credit note", totalLabel: "Transferred to returns outwards account", totalDate: "31 Aug" });
console.log(pr.md + "\n");
console.log(tAccount("Harare Wholesalers account", [["8 Aug", "Returns outwards", 240], ["28 Aug", "Returns outwards", 95]], [], { balance: false }) + "\n");
console.log(tAccount("Returns outwards account", [], [["31 Aug", "Total purchases returns", pr.total]], { balance: false }) + "\n");
const t = { sales: 48600, ri: 1250, purch: 31400, ro: 890, oi: 3200, ci: 3650 };
const ns = t.sales - t.ri, np = t.purch - t.ro, avail = t.oi + np, cos = avail - t.ci, gp = ns - cos;
console.log(statement("Farai's Store: income statement (extract) for the year ended 31 December 2025", [
 ["Revenue (sales)", t.sales, null], ["Less: returns inwards", -t.ri, null], [null, null, ns],
 ["Opening inventory", null, null], ["", t.oi, null],
 ["Purchases", t.purch, null], ["Less: returns outwards", -t.ro, null], ["Net purchases", np, null],
], { cols: ["US\$", "US\$", "US\$"] }));
console.log({ ns, np, avail, cos, gp });
