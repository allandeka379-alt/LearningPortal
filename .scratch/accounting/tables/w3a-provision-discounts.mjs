import { tAccount, statement, check, r2 } from "../lib.mjs";
// Ex1
const tr = 40000, pdd = r2(tr * 0.05), pda = r2((tr - pdd) * 0.02); check("pda", pda, 760);
console.log(statement("at 31 December 2024", [["**Current assets (extract)**", null, null], ["Trade receivables", tr, null], ["Less: Provision for doubtful debts", -pdd, null], ["Less: Provision for discounts allowable", -pda, r2(tr - pdd - pda)]], { checks: [["n", tr - pdd - pda, 37240]] }));
// Ex2
const tr2 = 46500, bd = 1500, net = tr2 - bd, pdd2 = r2(net * 0.05), pda2 = r2((net - pdd2) * 0.02);
check("pdd2", pdd2, 2250); check("pda2", pda2, 855);
console.log(tAccount("Provision for discounts allowable account", [], [["1 Jan 2025", "Balance b/d", pda], ["31 Dec 2025", "Income statement", r2(pda2 - pda)]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
console.log(statement("at 31 December 2025", [["**Current assets (extract)**", null, null], ["Trade receivables (46,500 − 1,500)", net, null], ["Less: Provision for doubtful debts", -pdd2, null], ["Less: Provision for discounts allowable", -pda2, r2(net - pdd2 - pda2)]], { checks: [["n2", net - pdd2 - pda2, 41895]] }));
