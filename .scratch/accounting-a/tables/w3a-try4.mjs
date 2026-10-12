import { cfModel, deptModel, coModel } from "./w3a-models.mjs";
const z1 = cfModel({
  name: "Marondera Grain Millers Ltd",
  open: { cost: 280000, accDep: 96000, inv: 36400, rec: 31500, bank: 11800, pay: 24200, taxPay: 8800, sc: 120000, prem: 18000, loan: 60000 },
  y: { pbt: 69500, intExp: 4950, dep: 21300, disp: { cost: 26000, accDep: 19500, proceeds: 8100 }, add: 63400, dInv: 4700, dRec: 2800, dPay: -1900, tax: 17200, taxPaid: 15600, divPaid: 10400, issue: { nominal: 30000, premium: 15000 }, loanChange: -15000 },
});
console.log("Z1", z1.bankClose, z1.cashGen, z1.netOp, z1.netInv, z1.netFin, z1.retOpen, z1.c.ret);
const z2 = deptModel({
  name: "Masvingo Trading Post", year: 2025,
  depts: [
    { name: "Groceries", sales: 142000, openInv: 11800, purchases: 96400, closeInv: 12900, direct: [{ label: "Departmental wages", amt: 11600 }] },
    { name: "Clothing", sales: 88000, openInv: 14300, purchases: 51200, closeInv: 15700, direct: [{ label: "Departmental wages", amt: 8400 }] },
    { name: "Electrical", sales: 54000, openInv: 9600, purchases: 36900, closeInv: 8800, direct: [{ label: "Departmental wages", amt: 6900 }] },
  ],
  common: [
    { label: "Rent", total: 14400, basis: "floor", basisText: "Floor area", shares: [120, 80, 40] },
    { label: "Lighting and heating", total: 3360, basis: "floor", basisText: "Floor area", shares: [120, 80, 40] },
    { label: "General wages", total: 18000, basis: "staff", basisText: "Staff", shares: [3, 2, 1] },
    { label: "Advertising", total: 5680, basis: "sales" },
    { label: "Depreciation", total: 6300, basis: "assets", basisText: "Asset values", shares: [30000, 20000, 10000] },
  ],
  income: [{ label: "Commission received", total: 2840, basis: "sales" }],
});
console.log("Z2", z2.net, z2.dep.map((x) => x.gp), z2.totals);
