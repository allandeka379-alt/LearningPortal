import { trialBalance } from "../lib.mjs";
import { manufacturing, incomeStatement, financialPosition, table, U, r2, sum, check, fmt, TERMS } from "./w3b-lib.mjs";

// Example 1: Tendai's Kitchen Units (full set)
export function ex1() {
  const rows = [
    ["Revenue", null, 248000], ["Inventory of raw materials at 1 January 2025", 8400, null], ["Work in progress at 1 January 2025", 6200, null], ["Inventory of finished goods at 1 January 2025", 14500, null],
    ["Purchases of raw materials", 71300, null], ["Carriage inwards on raw materials", 1450, null], ["Direct wages", 52600, null], ["Indirect factory wages", 11800, null], ["Royalties", 2300, null],
    ["Rent and rates", 18000, null], ["Insurance", 4800, null], ["Factory power", 7650, null], ["Office salaries", 21400, null], ["Selling expenses", 6950, null],
    ["Factory machinery", 60000, null], ["Provision for depreciation: factory machinery", null, 18000], ["Office equipment", 12000, null], ["Provision for depreciation: office equipment", null, 4800],
    ["Trade receivables", 24600, null], ["Trade payables", null, 13900], ["Bank", 9350, null], ["Drawings", 26000, null],
  ];
  const dr = sum(rows.map((r) => r[1])), cr = sum(rows.map((r) => r[2]));
  const capital = r2(dr - cr);
  rows.push(["Capital", null, capital]);
  const tb = trialBalance("Tendai Mapfumo: Trial balance at 31 December 2025", rows);
  const rent = [r2(18000 * 0.75), r2(18000 * 0.25)];
  const insAdj = r2(4800 - 400);
  const ins = [r2(insAdj * 0.75), r2(insAdj * 0.25)];
  const power = r2(7650 + 550);
  const depM = r2(60000 * 0.15), depO = r2((12000 - 4800) * 0.2);
  const m = manufacturing({ name: "Tendai Mapfumo", rawOpen: 8400, rawPurch: 71300, rawCarriage: 1450, rawClose: 9150, directLabour: 52600, directExp: [["Royalties", 2300]],
    overheads: [["Indirect factory wages", 11800], ["Rent and rates (3/4)", rent[0]], ["Insurance (3/4)", ins[0]], ["Factory power", power], ["Depreciation: factory machinery", depM]], wipOpen: 6200, wipClose: 5480 });
  const is = incomeStatement({ name: "Tendai Mapfumo", terms: TERMS.BOTH, revenue: 248000, openInv: 14500, openInvLabel: "Opening inventory of finished goods", cos: [["Add: Production cost of goods completed", m.production]], closeInv: 16900, closeInvLabel: "Less: Closing inventory of finished goods",
    expenses: [["Office salaries", 21400], ["Rent and rates (1/4)", rent[1]], ["Insurance (1/4)", ins[1]], ["Selling expenses", 6950], ["Depreciation: office equipment", depO]] });
  const sofp = financialPosition({ name: "Tendai Mapfumo", terms: TERMS.BOTH, nca: [["Factory machinery", 60000, r2(18000 + depM)], ["Office equipment", 12000, r2(4800 + depO)]],
    ca: [["Inventory: raw materials", 9150], ["Inventory: work in progress", 5480], ["Inventory: finished goods", 16900], ["Trade receivables", 24600], ["Other receivables (prepaid insurance)", 400], ["Bank", 9350]],
    cl: [["Trade payables", 13900], ["Other payables (accrued factory power)", 550]], openCap: capital, profit: is.np, drawings: 26000 });
  return { tb, m, is, sofp, capital, rent, ins, power, depM, depO };
}
// Example 2: Sipho's Soap Works (manufacturing account + income statement + current assets)
export function ex2() {
  const elec = [r2((7200 * 5) / 6), r2(7200 / 6)];
  const m = manufacturing({ name: "Sipho's Soap Works", rawOpen: 2150, rawPurch: 18640, rawClose: 2480, directLabour: 12300, overheads: [["Factory electricity (5/6)", elec[0]], ["Depreciation: factory equipment", 2700], ["Factory maintenance", 1360]], wipOpen: 1940, wipClose: 2210 });
  const is = incomeStatement({ name: "Sipho's Soap Works", terms: TERMS.BOTH, revenue: 79500, openInv: 5600, openInvLabel: "Opening inventory of finished goods", cos: [["Add: Production cost of goods completed", m.production], ["Add: Purchases of finished goods", 3200]], closeInv: 6350, closeInvLabel: "Less: Closing inventory of finished goods",
    expenses: [["Office wages", 9800], ["Electricity (1/6)", elec[1]], ["Selling expenses", 2450]] });
  return { m, is, elec, invTotal: r2(2480 + 2210 + 6350) };
}
if (process.argv[1]?.endsWith("w3b-accounts.mjs")) {
  const a = ex1();
  console.log(a.tb.md + "\n\n" + a.m.md + "\n\n" + a.is.md + "\n\n" + a.sofp.md);
  console.log({ capital: a.capital, rent: a.rent, ins: a.ins, power: a.power, depM: a.depM, depO: a.depO, consumed: a.m.consumed, prime: a.m.prime, oh: a.m.totOH, fc: a.m.factoryCost, prod: a.m.production, cos: a.is.cos, gp: a.is.gp, exp: a.is.totExp, np: a.is.np, ca: a.sofp.totCA, wc: a.sofp.wc, na: a.sofp.netAssets });
  const c = ex2();
  console.log(c.m.md + "\n\n" + c.is.md);
  console.log({ elec: c.elec, consumed: c.m.consumed, prime: c.m.prime, oh: c.m.totOH, fc: c.m.factoryCost, prod: c.m.production, avail: c.is.available, cos: c.is.cos, gp: c.is.gp, exp: c.is.totExp, np: c.is.np, inv: c.invTotal });
}
