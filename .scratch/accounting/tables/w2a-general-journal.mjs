import { journal, tAccount, check, sum } from "../lib.mjs";
const A = [["Premises", 45000], ["Motor van", 12000], ["Inventory", 6300], ["Trade receivable: R. Moyo", 1450], ["Bank", 3250]];
const L = [["Trade payable: Harare Supplies", 2100], ["Loan: Mutapa Finance", 10000]];
const cap = sum(A.map(a=>a[1])) - sum(L.map(l=>l[1]));
console.log("capital", cap);
console.log(journal([{ date: "1 Jan", lines: [...A.map(([a, v]) => [a, v, null]), ...L.map(([a, v]) => [a, null, v]), ["Capital", null, cap]], narrative: "Assets, liabilities and capital at the start of the year (opening entries)" }]));
console.log();
console.log(journal([
 { date: "4 Feb", lines: [["Fixtures and fittings", 2800, null], ["Gweru Shopfitters", null, 2800]], narrative: "Shelving bought on credit" },
 { date: "10 Feb", lines: [["Sipho Ncube", 3500, null], ["Motor vehicles", null, 3500]], narrative: "Old delivery van sold on credit at its book value" },
 { date: "18 Feb", lines: [["Irrecoverable debts", 340, null], ["Farai Dube", null, 340]], narrative: "Debt written off: customer declared bankrupt" },
 { date: "25 Feb", lines: [["Drawings", 180, null], ["Purchases", null, 180]], narrative: "Goods taken by the owner for private use" },
 { date: "28 Feb", lines: [["Office equipment", 900, null], ["Capital", null, 900]], narrative: "Owner's computer brought into the business as capital" },
]));
console.log();
console.log(tAccount("Farai Dube account", [["1 Feb", "Balance b/d", 340]], [["18 Feb", "Irrecoverable debts", 340]]));
console.log();
console.log(tAccount("Irrecoverable debts account", [["18 Feb", "Farai Dube", 340]], [], { balance: false }));
