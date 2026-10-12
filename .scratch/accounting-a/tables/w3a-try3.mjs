import { coModel } from "./w3a-models.mjs";
const d = {
  name: "Kwekwe Steel Fabricators Ltd", sc: 60000, prem: 30000, genRes: 25000, loan: 90000, loanLabel: "9% loan notes",
  ppe: [{ label: "Factory premises", cost: 210000, accDep: 42000, rate: 2, group: "admin" }, { label: "Machinery", cost: 124000, accDep: 49600, rate: 10 }, { label: "Delivery vehicles", cost: 56000, accDep: 28000, rate: 25, group: "dist" }],
  openInv: 38400, closeInv: 41250, sales: 724300, returnsIn: 9400, purchases: 372600, carriageIn: 5150, returnsOut: 6320,
  income: [{ label: "Discount received", tb: 3150 }],
  expenses: [{ label: "Wages", tb: 118400, acc: 4600 }, { label: "Directors' remuneration", tb: 54000 }, { label: "Delivery expenses", tb: 16900, group: "dist" }, { label: "Insurance", tb: 9300, pre: 1550 }, { label: "Electricity", tb: 15750, acc: 1380 }, { label: "Loan note interest", tb: 4050, acc: 4050, group: "fin" }, { label: "General expenses", tb: 21300 }],
  recv: 62400, writeOff: 2100, allowPct: 5, allowOpen: 2650, retOpen: 14000, cash: 2200, payables: 41700, tax: 13800, intDiv: 12000, finalDiv: 18000, toGeneral: 6000,
};
const m = coModel(d);
console.log(m.bank, m.pbt, m.profit, m.retClose, m.assets, m.equity, m.cl, m.ca, m.overdraft);
