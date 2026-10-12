import { coModel } from "./w3a-models.mjs";
const base = {
  name: "Chirundu Hardware Ltd", sc: 60000, genRes: 20000, loan: 50000, loanLabel: "8% loan notes",
  ppe: [{ label: "Land", cost: 90000, accDep: 0, rate: 0 }, { label: "Delivery vehicles", cost: 45000, accDep: 18000, rate: 20, group: "dist" }, { label: "Equipment", cost: 36000, accDep: 10800, rate: 10 }],
  openInv: 18400, closeInv: 21900, sales: 458600, returnsIn: 6200, purchases: 268500, carriageIn: 3100, returnsOut: 4700,
  income: [{ label: "Rent received", tb: 7200, adv: 1800 }, { label: "Discount received", tb: 1450 }],
  expenses: [{ label: "Wages", tb: 61300, acc: 2400 }, { label: "Directors' remuneration", tb: 36000 }, { label: "Delivery expenses", tb: 11800, group: "dist" }, { label: "Insurance", tb: 5600, pre: 900 }, { label: "Electricity", tb: 7350, acc: 650 }, { label: "Loan note interest", tb: 2000, acc: 2000, group: "fin" }, { label: "General expenses", tb: 9850 }, { label: "Discount allowed", tb: 2230 }],
  recv: 42800, writeOff: 1300, allowPct: 5, allowOpen: 1900, retOpen: 30000, cash: 1200, payables: 27400, tax: 14500, intDiv: 10000, toGeneral: 5000,
};
const m = coModel(base);
console.log(m.retOpen, m.pbt, m.profit, m.retClose, m.equity);
console.log(m.bank, m.cos, m.gp, m.revenue, m.dist, m.admin, m.fin, m.assets);
