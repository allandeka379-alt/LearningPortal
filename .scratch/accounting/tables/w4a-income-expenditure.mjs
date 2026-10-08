import { subscriptions, activity, incomeExpenditure, clubPosition, fundAtDate, table, r2, sum, check, U } from "./w4a-lib.mjs";
// Chinhoyi Sports Club
const open = { clubCost: 60000, clubAcc: 12000, eqCost: 9000, eqAcc: 3600, barInv: 1450, arrears: 300, bank: 2880, advance: 210, elecOwing: 260, barPay: 940 };
const f = fundAtDate("Chinhoyi Sports Club", "at 1 January 2025", [["Clubhouse (cost less depreciation)", 48000], ["Equipment (cost less depreciation)", 5400], ["Bar inventory", 1450], ["Subscriptions in arrears", 300], ["Bank", 2880]], [["Subscriptions in advance", 210], ["Electricity owing", 260], ["Bar payables", 940]]);
console.log(f.md, f.fund);
const rec = { subs: 11240, bar: 16820, don: 2000, comp: 3150 }, pay = { barP: 9870, wages: 7200, elec: 1980, rep: 1140, equip: 2600, prizes: 1720 };
const bank = r2(open.bank + sum(Object.values(rec)) - sum(Object.values(pay)));
const s = subscriptions({ openArrears: 300, openAdvance: 210, received: 11240, closeArrears: 450, closeAdvance: 330 });
const purch = r2(pay.barP - 940 + 1120);
const a = activity({ name: "Chinhoyi Sports Club", title: "Bar trading account", sales: 16820, openInv: 1450, purchases: purch, closeInv: 1690 });
const elec = r2(1980 - 260 + 310);
const depC = r2(60000 * 0.02), depE = r2((9000 + 2600) * 0.2);
const comp = r2(3150 - 1720);
const ie = incomeExpenditure({ name: "Chinhoyi Sports Club", income: [["Subscriptions", s.ie], ["Profit on bar", a.profit], ["Donations", 2000], ["Profit on competitions (3,150 − 1,720)", comp]], expenditure: [["Groundsman's wages", 7200], ["Electricity (1,980 − 260 + 310)", elec], ["Repairs", 1140], ["Depreciation: clubhouse", depC], ["Depreciation: equipment", depE]] });
console.log(table(["Working", U], [["Subscriptions: 11,240 − 300 + 210 + 450 − 330", s.ie], ["Bar purchases: 9,870 − 940 + 1,120", purch], ["Bar cost of sales: 1,450 + 10,050 − 1,690", a.cos], ["Bar profit: 16,820 − 9,810", a.profit], ["Electricity: 1,980 − 260 + 310", elec], ["Depreciation of clubhouse: 2% × 60,000", depC], ["Depreciation of equipment: 20% × (9,000 + 2,600)", depE]]));
console.log(ie.md, ie.surplus);
const p = clubPosition({ name: "Chinhoyi Sports Club", nca: [["Clubhouse", 60000, r2(12000 + depC)], ["Equipment", 11600, r2(3600 + depE)]], ca: [["Bar inventory", 1690], ["Subscriptions in arrears", 450], ["Bank", bank]], cl: [["Subscriptions in advance", 330], ["Electricity owing", 310], ["Bar payables", 1120]], openFund: f.fund, surplus: ie.surplus });
console.log(p.md, bank, p.closing);
