import { coModel } from "./w3a-models.mjs";
export const c1 = {
  name: "Gokwe Dairy Products Ltd", sc: 80000, prem: 12000, genRes: 15000, loan: 55000, loanLabel: "8% loan notes",
  ppe: [{ label: "Land", cost: 85000, accDep: 0, rate: 0 }, { label: "Equipment", cost: 54000, accDep: 21600, rate: 10 }, { label: "Vehicles", cost: 46000, accDep: 18400, rate: 25, group: "dist" }],
  openInv: 21300, closeInv: 24750, sales: 487200, returnsIn: 5900, purchases: 296400, carriageIn: 3950, returnsOut: 4150,
  income: [{ label: "Discount received", tb: 2310 }],
  expenses: [{ label: "Wages", tb: 64800, acc: 2900 }, { label: "Directors' remuneration", tb: 38400 }, { label: "Delivery expenses", tb: 12350, group: "dist" }, { label: "Insurance", tb: 6780, pre: 940 }, { label: "Lighting and heating", tb: 7640, acc: 530 }, { label: "Loan note interest", tb: 2200, acc: 2200, group: "fin" }, { label: "General expenses", tb: 10120 }],
  recv: 38900, writeOff: 1300, allowPct: 4, allowOpen: 1650, retOpen: 27000, cash: 1430, payables: 29500, tax: 13600, intDiv: 6400, finalDiv: 9600, toGeneral: 5000,
};
export const c2 = {
  name: "Plumtree Cold Chain Ltd", trading: false, salesLabel: "Revenue", sc: 100000, prem: 20000, revRes: 18000, loan: 68000, loanLabel: "10% loan notes",
  ppe: [{ label: "Land", cost: 120000, accDep: 0, rate: 0, revalTo: 150000 }, { label: "Cold rooms", cost: 210000, accDep: 63000, rate: 10 }, { label: "Trucks", cost: 96000, accDep: 38400, rate: 20, group: "dist" }],
  sales: 392500,
  income: [{ label: "Interest received", tb: 1250, acc: 190 }],
  expenses: [{ label: "Drivers' wages", tb: 92500, acc: 3800 }, { label: "Directors' remuneration", tb: 42000 }, { label: "Fuel", tb: 71300, group: "dist" }, { label: "Repairs", tb: 18240 }, { label: "Insurance", tb: 9480, pre: 1260 }, { label: "Electricity", tb: 24610, acc: 1950 }, { label: "Loan note interest", tb: 3400, acc: 3400, group: "fin" }, { label: "Office expenses", tb: 8930 }],
  recv: 27400, allowPct: 5, allowOpen: 1100, retOpen: 33000, cash: 880, payables: 19800, tax: 11900, intDiv: 8000,
};
for (const c of [c1, c2]) {
  const m = coModel(c);
  console.log(c.name, "bank", m.bank, "pbt", m.pbt, "profit", m.profit, "retClose", m.retClose, "equity", m.equity, "ca", m.ca, "cl", m.cl, "assets", m.assets);
}
