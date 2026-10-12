import { coModel, cfModel, deptModel } from "./w3a-models.mjs";
const m = coModel({
  name: "Mazowe Fresh Produce Ltd", sc: 100000, prem: 20000, revRes: 0, genRes: 15000, loan: 40000, loanLabel: "10% loan notes",
  ppe: [{ label: "Land", cost: 80000, accDep: 0, rate: 0, group: "admin", revalTo: 95000 }, { label: "Delivery vehicles", cost: 60000, accDep: 24000, rate: 20, group: "dist" }, { label: "Equipment", cost: 30000, accDep: 9000, rate: 10, group: "admin" }],
  openInv: 14200, closeInv: 16800, sales: 412000, returnsIn: 4000, purchases: 262500, carriageIn: 2300, returnsOut: 3100,
  income: [{ label: "Rent received", tb: 6000, adv: 1500 }],
  expenses: [{ label: "Wages", tb: 48500, acc: 2200 }, { label: "Delivery expenses", tb: 9600, group: "dist" }, { label: "Insurance", tb: 4200, pre: 700 }, { label: "Loan note interest", tb: 2000, acc: 2000, group: "fin" }, { label: "General expenses", tb: 8800 }, { label: "Directors' remuneration", tb: 30000 }],
  recv: 31500, writeOff: 900, allowPct: 4, allowOpen: 700, bank: 72400, cash: 600, payables: 21300, tax: 9400, intDiv: 8000, finalDiv: 6000, toGeneral: 5000,
});
console.log(m.tb.md); console.log(m.notesMd); console.log(m.spl); console.log(m.soce.md); console.log(m.sofp);
const cf = cfModel({ name: "Test Ltd", open: { cost: 100000, accDep: 30000, inv: 12000, rec: 15000, bank: 5000, pay: 9000, taxPay: 4000, sc: 50000, prem: 10000, loan: 20000 }, y: { pbt: 30000, intExp: 2000, dep: 8000, disp: { cost: 10000, accDep: 6000, proceeds: 3000 }, add: 25000, dInv: 3000, dRec: 2000, dPay: 1500, tax: 8000, taxPaid: 7000, divPaid: 6000, issue: { nominal: 10000, premium: 5000 }, loanChange: -5000 } });
console.log(cf.sofpOpen); console.log(cf.cf); console.log(cf.sofpClose);
const dm = deptModel({ name: "Chipo Stores", depts: [{ name: "Clothing", sales: 90000, openInv: 8000, purchases: 52000, closeInv: 9000, direct: [{ label: "Wages", amt: 8000 }] }, { name: "Furniture", sales: 60000, openInv: 6000, purchases: 36000, closeInv: 7000, direct: [{ label: "Wages", amt: 6000 }] }], common: [{ label: "Rent", total: 12000, basis: "floor area", shares: [200, 100] }, { label: "Advertising", total: 3000, basis: "sales" }], income: [{ label: "Commission", total: 1500, basis: "equal" }] });
console.log(dm.pl); console.log(dm.apportionMd);
