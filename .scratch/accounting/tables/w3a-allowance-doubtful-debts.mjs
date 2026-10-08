import { tAccount, statement, check, r2 } from "../lib.mjs";
import { table, U } from "./w3a-lib.mjs";
const tr = [24000, 30000, 26000], pct = 5;
const al = tr.map((x) => r2(x * pct / 100));
const ch = [al[0], r2(al[1] - al[0]), r2(al[2] - al[1])];
check("ch", ch[2], -200);
console.log(table(["Year end", `Trade receivables ${U}`, `Allowance needed (5%) ${U}`, `Change charged (credited) to income statement ${U}`], [["31 Dec 2023", tr[0], al[0], "1,200 increase (created)"], ["31 Dec 2024", tr[1], al[1], "300 increase"], ["31 Dec 2025", tr[2], al[2], "(200) decrease"]]));
console.log();
console.log(tAccount("Allowance for irrecoverable debts account", [["31 Dec 2023", "Balance c/d", al[0]]], [["31 Dec 2023", "Income statement", al[0]]], { balance: false }));
console.log(tAccount("Allowance (2024)", [], [["1 Jan 2024", "Balance b/d", al[0]], ["31 Dec 2024", "Income statement", ch[1]]], { cdDate: "31 Dec 2024", bdDate: "1 Jan 2025" }));
console.log(tAccount("Allowance (2025)", [["31 Dec 2025", "Income statement", -ch[2]]], [["1 Jan 2025", "Balance b/d", al[1]]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
console.log(statement("at 31 December 2025", [["**Current assets**", null, null], ["Trade receivables", tr[2], null], ["Less: Allowance for irrecoverable debts", -al[2], r2(tr[2] - al[2])]], { checks: [["n", tr[2] - al[2], 24700]] }));
// Ex2
const tb = 18400, wo = 400, net = tb - wo, al2 = r2(net * 4 / 100), old = 650, inc = r2(al2 - old);
check("inc", inc, 70);
console.log(statement("at 31 December 2025", [["**Current assets**", null, null], ["Trade receivables (18,400 − 400)", net, null], ["Less: Allowance for irrecoverable debts", -al2, r2(net - al2)]], { checks: [["n2", net - al2, 17280]] }));
console.log(tAccount("Allowance for irrecoverable debts account", [], [["1 Jan 2025", "Balance b/d", old], ["31 Dec 2025", "Income statement", inc]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" }));
