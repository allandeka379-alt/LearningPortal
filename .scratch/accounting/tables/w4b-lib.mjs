// W4b helpers: statements of affairs, incomplete-records accounts and ratio sets. Re-uses the W3b statement builders
// (read-only import). Every builder checks its own arithmetic.
import { statement, check, r2, sum, fmt, tAccount, ratios, money } from "../lib.mjs";
import { incomeStatement, financialPosition, TERMS, table, U } from "./w3b-lib.mjs";

export { incomeStatement, financialPosition, TERMS, table, U, fmt, r2, sum, check, ratios, money, tAccount };

const headed = (name, stmtName, dateLine, rows, opts) => `**${name}**\n\n**${stmtName}**\n\n${statement(dateLine, rows, opts)}`;

/**
 * Statement of affairs (assets − liabilities = capital) at one date.
 * d: { name, date ("1 January 2025"), nca: [[label, value]], ca: [[label, value]], cl: [[label, value]], ncl: [[label, value]] }
 * Returns { md, totNca, totCA, totCL, wc, capital }.
 */
export function statementOfAffairs(d) {
  const rows = [];
  const nca = d.nca ?? [];
  const totNca = sum(nca.map((x) => x[1]));
  if (nca.length) {
    rows.push(["**Non-current assets**", null, null]);
    nca.forEach(([l, a], i) => rows.push([l, a, i === nca.length - 1 ? totNca : null]));
  }
  rows.push(["**Current assets**", null, null]);
  const totCA = sum(d.ca.map((x) => x[1]));
  d.ca.forEach(([l, a]) => rows.push([l, a, null]));
  rows.push(["", totCA, null]);
  rows.push(["**Less: Current liabilities**", null, null]);
  const totCL = sum((d.cl ?? []).map((x) => x[1]));
  (d.cl ?? []).forEach(([l, a]) => rows.push([l, a, null]));
  rows.push(["", -totCL, null]);
  const wc = r2(totCA - totCL);
  rows.push([wc >= 0 ? "Net current assets" : "Net current liabilities", null, wc]);
  let capital = r2(totNca + wc);
  const ncl = d.ncl ?? [];
  if (ncl.length) {
    rows.push(["", null, capital]);
    for (const [l, a] of ncl) rows.push([`Less: ${l}`, null, -a]);
    capital = r2(capital - sum(ncl.map((x) => x[1])));
  }
  rows.push([`**Capital at ${d.date}**`, null, capital]);
  const assets = r2(totNca + totCA);
  const liabs = r2(totCL + sum(ncl.map((x) => x[1])));
  const md = headed(d.name, "Statement of affairs", `at ${d.date}`, rows, { checks: [["capital", capital, assets - liabs], ["wc", wc, totCA - totCL]] });
  return { md, totNca, totCA, totCL, wc, assets, liabs, capital };
}

/** Profit from changes in capital: closing − opening + drawings − capital introduced (negative = loss). */
export function profitFromCapital({ opening, closing, drawings = 0, introduced = 0 }) {
  return r2(closing - opening + drawings - introduced);
}

/** Statement of the profit calculation as a two-column table. Returns { md, profit }. */
export function capitalCalc({ name, date = "31 December 2025", opening, closing, drawings = 0, introduced = 0, openDate = "1 January 2025" }) {
  const profit = profitFromCapital({ opening, closing, drawings, introduced });
  const rows = [[`Capital at ${date} (closing)`, null, closing]];
  if (drawings) rows.push(["Add: Drawings", null, drawings]);
  const afterDr = r2(closing + drawings);
  if (drawings) rows.push(["", null, afterDr]);
  if (introduced) rows.push(["Less: Capital introduced", null, -introduced]);
  const afterIn = r2(afterDr - introduced);
  if (introduced) rows.push(["", null, afterIn]);
  rows.push([`Less: Capital at ${openDate} (opening)`, null, -opening]);
  rows.push([profit >= 0 ? "**Profit for the year (net profit)**" : "**Loss for the year (net loss)**", null, profit]);
  const md = headed(name, "Calculation of profit for the year", `for the year ended ${date}`, rows, { checks: [["profit", profit, afterIn - opening]] });
  return { md, profit };
}

/**
 * Total trade receivables (debtors) account to find credit sales: dr: opening + credit sales (missing); cr: receipts,
 * discount allowed, returns, irrecoverable debts, closing. Returns { md, creditSales }.
 */
export function receivablesAccount({ title = "Total trade receivables account", opening, receipts, discounts = 0, returns = 0, irrecoverable = 0, contra = 0, closing, openDate = "1 Jan", closeDate = "31 Dec", bdDate = "1 Jan" }) {
  const creditSales = r2(receipts + discounts + returns + irrecoverable + contra + closing - opening);
  const cr = [[closeDate, "Bank (receipts)", receipts]];
  if (discounts) cr.push([closeDate, "Discount allowed", discounts]);
  if (returns) cr.push([closeDate, "Sales returns", returns]);
  if (irrecoverable) cr.push([closeDate, "Irrecoverable debts", irrecoverable]);
  if (contra) cr.push([closeDate, "Contra: trade payables", contra]);
  const md = tAccount(title, [[openDate, "Balance b/d", opening], [closeDate, "Credit sales (missing figure)", creditSales]], cr, { cdDate: closeDate, bdDate, cd: "Balance c/d" });
  check("receivables closing", r2(opening + creditSales - (receipts + discounts + returns + irrecoverable + contra)), closing);
  return { md, creditSales };
}

/** Total trade payables (creditors) account to find credit purchases. Returns { md, creditPurchases }. */
export function payablesAccount({ title = "Total trade payables account", opening, payments, discounts = 0, returns = 0, contra = 0, closing, openDate = "1 Jan", closeDate = "31 Dec", bdDate = "1 Jan" }) {
  const creditPurchases = r2(payments + discounts + returns + contra + closing - opening);
  const dr = [[closeDate, "Bank (payments)", payments]];
  if (discounts) dr.push([closeDate, "Discount received", discounts]);
  if (returns) dr.push([closeDate, "Purchases returns", returns]);
  if (contra) dr.push([closeDate, "Contra: trade receivables", contra]);
  const md = tAccount(title, dr, [[openDate, "Balance b/d", opening], [closeDate, "Credit purchases (missing figure)", creditPurchases]], { cdDate: closeDate, bdDate });
  check("payables closing", r2(opening + creditPurchases - (payments + discounts + returns + contra)), closing);
  return { md, creditPurchases };
}

/**
 * Expense account with accruals/prepayments at both ends to find the charge to the income statement.
 * openAccrued / openPrepaid, paid, closeAccrued / closePrepaid. Returns { md, charge }.
 */
export function expenseAccount({ title, openAccrued = 0, openPrepaid = 0, paid, closeAccrued = 0, closePrepaid = 0, expenseLabel = "Income statement" }) {
  const charge = r2(paid + openPrepaid - openAccrued + closeAccrued - closePrepaid);
  const dr = [];
  if (openPrepaid) dr.push(["1 Jan", "Balance b/d (prepaid)", openPrepaid]);
  dr.push(["31 Dec", "Bank", paid]);
  if (closeAccrued) dr.push(["31 Dec", "Balance c/d (accrued)", closeAccrued]);
  const cr = [];
  if (openAccrued) cr.push(["1 Jan", "Balance b/d (accrued)", openAccrued]);
  cr.push(["31 Dec", expenseLabel, charge]);
  if (closePrepaid) cr.push(["31 Dec", "Balance c/d (prepaid)", closePrepaid]);
  check(`${title} sides`, sum(dr.map((x) => x[2])), sum(cr.map((x) => x[2])));
  const md = tAccount(title, dr, cr, { balance: false });
  const tot = sum(dr.map((x) => x[2]));
  let out = `${md}\n|  |  | **${fmt(tot)}** |  |  | **${fmt(tot)}** |`;
  if (closePrepaid) out += `\n| 1 Jan | Balance b/d (prepaid) | ${fmt(closePrepaid)} |  |  |  |`;
  if (closeAccrued) out += `\n|  |  |  | 1 Jan | Balance b/d (accrued) | ${fmt(closeAccrued)} |`;
  return { md: out, charge };
}

/** Full ratio set from figures. f: { revenue, cos, gp?, profit, openInv, closeInv, ca, inv, cl, recv, creditSales, pay, creditPurchases, pbi, capEmp } */
export function ratioSet(f) {
  const gp = f.gp ?? r2(f.revenue - f.cos);
  const o = { gp };
  o.gpm = ratios.grossMargin(gp, f.revenue);
  o.mu = ratios.markUp(gp, f.cos);
  if (f.profit !== undefined) o.pm = ratios.profitMargin(f.profit, f.revenue);
  if (f.pbi !== undefined && f.capEmp) o.roce = ratios.roce(f.pbi, f.capEmp);
  if (f.ca !== undefined) {
    o.cr = ratios.current(f.ca, f.cl);
    o.at = ratios.acidTest(f.ca, f.inv, f.cl);
  }
  if (f.openInv !== undefined) {
    o.it = ratios.inventoryTurnover(f.cos, f.openInv, f.closeInv);
    o.id = ratios.inventoryDays(f.cos, f.openInv, f.closeInv);
  }
  if (f.recv !== undefined) o.rd = ratios.receivablesDays(f.recv, f.creditSales ?? f.revenue);
  if (f.pay !== undefined) o.pd = ratios.payablesDays(f.pay, f.creditPurchases);
  return o;
}

/** Round for display. */
export const d1 = (v) => (Math.round((v + Number.EPSILON) * 10) / 10).toFixed(1);
export const d2 = (v) => (Math.round((v + Number.EPSILON) * 100) / 100).toFixed(2);
export const d0 = (v) => String(Math.round(v));
