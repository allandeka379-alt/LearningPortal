import { soleTrader, TERMS, r2, sum } from "./w3b-lib.mjs";
export function withCapital(rows, label = "Capital") {
  const d = sum(rows.map((r) => r[1] ?? 0));
  const c = sum(rows.map((r) => r[2] ?? 0));
  return [...rows, [label, null, r2(d - c), "capital"]];
}
const ex1Rows = withCapital([
  ["Revenue", null, 96500, "revenue"], ["Sales returns", 1240, null, "salesReturns"], ["Purchases", 61380, null, "purchases"],
  ["Purchases returns", null, 980, "purchReturns"], ["Carriage inwards", 720, null, "carriageIn"], ["Inventory at 1 January 2025", 9460, null, "openInv"],
  ["Wages", 12600, null, "expense"], ["Rent", 5400, null, "expense"], ["Insurance", 1860, null, "expense"], ["Electricity", 1530, null, "expense"],
  ["General expenses", 1215, null, "expense"], ["Discount received", null, 465, "income"],
  ["Equipment", 18000, null, "nca"], ["Provision for depreciation: equipment", null, 7200, "accdep:Equipment"],
  ["Motor van", 24000, null, "nca"], ["Provision for depreciation: motor van", null, 9600, "accdep:Motor van"],
  ["Trade receivables", 8600, null, "receivables"], ["Allowance for irrecoverable debts", null, 320, "allowance"],
  ["Bank", 3945, null, "current"], ["Cash", 285, null, "current"], ["Trade payables", null, 6870, "payables"], ["Drawings", 10400, null, "drawings"],
]);
export const ex1 = soleTrader({
  name: "Rudo Chikore", terms: TERMS.BOTH, rows: ex1Rows,
  adj: { closeInv: 10250, dep: { Equipment: 1800, "Motor van": 3600 }, accrued: [["Wages", 450]], prepaid: [["Insurance", 310]], writeOff: 600, allowance: 400, goodsDrawn: 350 },
});
const ex2Rows = withCapital([
  ["Fees received", null, 58400, "revenue"], ["Rent received", null, 3600, "income"], ["Wages", 21300, null, "expense"], ["Fuel", 9850, null, "expense"],
  ["Insurance", 2400, null, "expense"], ["Loan interest", 900, null, "expense"], ["General expenses", 1630, null, "expense"],
  ["Motorcycles", 45000, null, "nca"], ["Provision for depreciation: motorcycles", null, 18000, "accdep:Motorcycles"],
  ["Office equipment", 8000, null, "nca"], ["Provision for depreciation: office equipment", null, 3200, "accdep:Office equipment"],
  ["Trade receivables", 6200, null, "receivables"], ["Bank", 2310, null, "current"], ["Cash", 340, null, "current"],
  ["Trade payables", null, 1260, "payables"], ["Loan (repayable 2029)", null, 10000, "loan"], ["Drawings", 8200, null, "drawings"],
]);
export const ex2 = soleTrader({
  name: "Nyasha's Courier Service", terms: TERMS.BOTH, revenueLabel: "Fees received", rows: ex2Rows,
  adj: { dep: { Motorcycles: 5400, "Office equipment": 1600 }, accrued: [["Loan interest", 300]], prepaid: [["Insurance", 600]], incomeAdvance: [["Rent received", 300]] },
});
if (process.argv[1]?.endsWith("w3b-adjusted-statements.mjs")) {
  for (const e of [ex1, ex2]) {
    console.log(e.tb.md, "\n");
    console.log(e.is.md, "\n");
    console.log(e.sofp.md, "\n");
    console.log(JSON.stringify({ is: { ...e.is, md: 0 }, sofp: { ...e.sofp, md: 0 }, f: e.figures }), "\n");
  }
}
