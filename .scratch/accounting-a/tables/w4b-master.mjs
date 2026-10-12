// Shared master-budget calculator for the W4b master-budget lesson (and reusable by slices).
import { chk, r2, statement } from "../lib.mjs";

/** Computes a quarter's master budget and checks that the closing statement of financial position balances. */
export function masterBudget(d) {
  const sales = r2(d.units * d.price);
  const production = d.units + d.closeFGUnits - d.openFGUnits;
  const varUnit = d.matUnit + d.labUnit + d.vohUnit;
  const prodCost = r2(production * varUnit);
  const openFG = r2(d.openFGUnits * varUnit), closeFG = r2(d.closeFGUnits * varUnit);
  const cos = r2(openFG + prodCost - closeFG);
  chk(cos, r2(d.units * varUnit));
  const gp = r2(sales - cos);
  const fixedCash = r2(d.fixedOverhead - d.depreciation);
  const pbit = r2(gp - d.fixedOverhead - d.admin);
  const profit = r2(pbit - d.interest);
  const materials = r2(production * d.matUnit), labour = r2(production * d.labUnit), voh = r2(production * d.vohUnit);
  const collections = r2(d.openRec + sales - d.closeRec);
  const toSuppliers = r2(materials + d.openPay - d.closePay);
  const payments = r2(toSuppliers + labour + voh + fixedCash + d.admin + d.interest + d.dividend + d.equipment);
  const closeBank = r2(d.openBank + collections - payments);
  const ncaCost = r2(d.ncaCost + d.equipment), ncaDep = r2(d.ncaDep + d.depreciation);
  const nca = r2(ncaCost - ncaDep);
  const re1 = r2(d.openRE + profit - d.dividend);
  const assets1 = r2(nca + closeFG + d.closeRec + closeBank);
  const eqLiab1 = r2(d.shareCapital + re1 + d.loan + d.closePay);
  chk(assets1, eqLiab1);
  const nca0 = r2(d.ncaCost - d.ncaDep);
  const assets0 = r2(nca0 + openFG + d.openRec + d.openBank);
  const eqLiab0 = r2(d.shareCapital + d.openRE + d.loan + d.openPay);
  chk(assets0, eqLiab0);
  return { ...d, sales, production, varUnit, prodCost, openFG, closeFG, cos, gp, fixedCash, pbit, profit, materials, labour, voh, collections, toSuppliers, payments, closeBank, ncaCost, ncaDep, nca, nca0, re1, assets0, assets1, eqLiab0, eqLiab1 };
}

export function masterStatements(m, name = "Zambezi Bakers Ltd", period = "31 March") {
  const pl = statement(`${name}: budgeted statement of profit or loss for the quarter ending ${period}`, [
    ["Revenue", null, m.sales],
    ["Cost of sales", null, -m.cos],
    ["**Gross profit**", null, m.gp],
    ["Fixed production overhead (including depreciation)", -m.fixedOverhead, null],
    ["Administration and selling expenses", -m.admin, null],
    ["**Profit from operations**", null, m.pbit],
    ["Finance costs", null, -m.interest],
    ["**Profit for the period**", null, m.profit],
  ], { checks: [["gross profit", m.sales - m.cos, m.gp], ["profit from operations", m.gp - m.fixedOverhead - m.admin, m.pbit], ["profit", m.pbit - m.interest, m.profit]] });
  const sofp = statement(`${name}: budgeted statement of financial position`, [
    ["**Non-current assets** (carrying amount)", m.nca0, m.nca],
    ["Inventory", m.openFG, m.closeFG],
    ["Trade receivables", m.openRec, m.closeRec],
    ["Cash and cash equivalents", m.openBank, m.closeBank],
    ["**Total assets**", m.assets0, m.assets1],
    ["Share capital", m.shareCapital, m.shareCapital],
    ["Retained earnings", m.openRE, m.re1],
    ["Non-current liabilities: loan", m.loan, m.loan],
    ["Trade payables", m.openPay, m.closePay],
    ["**Total equity and liabilities**", m.eqLiab0, m.eqLiab1],
  ], { cols: ["1 January US\\$", "31 March US\\$"], checks: [["assets", m.nca0 + m.openFG + m.openRec + m.openBank, m.assets0], ["assets", m.nca + m.closeFG + m.closeRec + m.closeBank, m.assets1], ["balance", m.assets1, m.eqLiab1]] });
  return { pl, sofp };
}
