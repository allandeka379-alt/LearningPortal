import { coModel, cfModel, deptModel } from "./w3a-models.mjs";
const f1 = {
  name: "Chivi Beverages Ltd", sc: 91500, prem: 14350, genRes: 21600, loan: 70400, loanLabel: "9% loan notes",
  ppe: [{ label: "Land", cost: 96500, accDep: 0, rate: 0 }, { label: "Plant", cost: 163700, accDep: 49110, rate: 10 }, { label: "Vehicles", cost: 58900, accDep: 23560, rate: 20, group: "dist" }],
  openInv: 33870, closeInv: 36120, sales: 652580, returnsIn: 7640, purchases: 372910, carriageIn: 4260, returnsOut: 5280,
  income: [{ label: "Rent received", tb: 6300, adv: 1500 }],
  expenses: [{ label: "Wages", tb: 82640, acc: 3150 }, { label: "Directors' fees", tb: 47600 }, { label: "Delivery expenses", tb: 15830, group: "dist" }, { label: "Insurance", tb: 8940, pre: 1310 }, { label: "Electricity", tb: 11570, acc: 960 }, { label: "Loan note interest", tb: 3168, acc: 3168, group: "fin" }, { label: "General expenses", tb: 12860 }],
  recv: 54380, writeOff: 1880, allowPct: 4, allowOpen: 2240, retOpen: 41500, cash: 1820, payables: 38260, tax: 14800, intDiv: 9000, finalDiv: 12500, toGeneral: 6000,
};
const m1 = coModel(f1);
console.log("F1", m1.bank, m1.pbt, m1.profit, m1.retClose, m1.equity, m1.ca, m1.cl, m1.ppeCv, m1.fin);
const f2 = cfModel({
  name: "Kwekwe Brick and Tile Ltd",
  open: { cost: 295400, accDep: 101800, inv: 44950, rec: 38640, bank: -9300, pay: 31750, taxPay: 10480, sc: 100000, prem: 18000, loan: 80000 },
  y: { pbt: 78300, intExp: 7200, dep: 26400, disp: { cost: 31000, accDep: 22650, proceeds: 6100 }, add: 74500, dInv: 6150, dRec: 4320, dPay: 3890, tax: 20150, taxPaid: 18900, divPaid: 12300, issue: { nominal: 25000, premium: 10000 }, loanChange: 15000 },
});
console.log("F2", f2.bankClose, f2.cashGen, f2.netOp, f2.netInv, f2.netFin, f2.retOpen, f2.c.ret);
const f4 = deptModel({
  name: "Harare Household Supplies", year: 2025,
  depts: [
    { name: "Furniture", sales: 124600, openInv: 18350, purchases: 72480, closeInv: 19720, direct: [{ label: "Departmental wages", amt: 12430 }] },
    { name: "Kitchenware", sales: 71900, openInv: 9640, purchases: 43150, closeInv: 10280, direct: [{ label: "Departmental wages", amt: 7860 }] },
    { name: "Gifts", sales: 33500, openInv: 5180, purchases: 20370, closeInv: 4950, direct: [{ label: "Departmental wages", amt: 5640 }] },
  ],
  common: [
    { label: "Rent", total: 16800, basis: "floor", basisText: "x", shares: [140, 80, 60] },
    { label: "Lighting and heating", total: 4200, basis: "floor", basisText: "x", shares: [140, 80, 60] },
    { label: "General wages", total: 17500, basis: "staff", basisText: "x", shares: [5, 3, 2] },
    { label: "Advertising", total: 6900, basis: "sales" },
    { label: "Depreciation", total: 6400, basis: "assets", basisText: "x", shares: [24000, 12000, 4000] },
  ],
  income: [{ label: "Commission received", total: 2300, basis: "sales" }],
});
console.log("F4", f4.net, f4.dep.map((x) => x.gp), f4.totals.net);
