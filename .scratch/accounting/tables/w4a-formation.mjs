import { journal } from "../lib.mjs";
import { appropriation, table, r2, sum, check, U } from "./w4a-lib.mjs";
// Example 1: formation journal
const rudo = { bank: 12000, van: 9500 }, farai = { bank: 8000, equip: 4500 };
const capR = r2(rudo.bank + rudo.van), capF = r2(farai.bank + farai.equip);
console.log(journal([{ date: "1 Jan 2025", lines: [["Bank", rudo.bank + farai.bank, null], ["Motor van", rudo.van, null], ["Equipment", farai.equip, null], ["Capital: Rudo", null, capR], ["Capital: Farai", null, capF]], narrative: "Capital introduced by the partners on forming the partnership" }]));
console.log(capR, capF, sum([capR, capF]));
// Example 2: with vs without agreement
const profit = 18400;
const a = appropriation({ name: "R & F Poultry", partners: ["Rudo", "Farai"], profit, ioc: [r2(capR * 0.05), r2(capF * 0.05)], salary: [0, 3000], ratio: [3, 2] });
console.log(a.md); console.log(a.residual, a.shares, a.credits);
const eq = r2(profit / 2);
console.log(table(["", `Rudo ${U}`, `Farai ${U}`, `Total ${U}`], [["Interest on capital (5%)", a.ioc[0], a.ioc[1], a.iocTot], ["Salary", null, 3000, 3000], ["Share of residual profit (3 : 2)", a.shares[0], a.shares[1], a.residual], ["**Total under the agreement**", a.credits[0], a.credits[1], sum(a.credits)], ["**Total with no agreement (equal shares)**", eq, eq, profit]]));
check("tot", sum(a.credits), profit);
