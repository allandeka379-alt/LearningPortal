// W3a models: a limited company from a trial balance (coModel), the statement of changes in equity (soce), the schedule of
// non-current assets (ncaSchedule), a cash-flow data set (cfModel) and departmental accounts (deptModel).
// Every model builds its figures from one data set and THROWS when the statements do not agree.
import { trialBalance, check, sum, r2, fmt } from "../lib.mjs";
import { grid, heading } from "./w3a-lib.mjs";

const row = (cells) => `| ${cells.join(" | ")} |`;
const neg = (v) => (v ? -v : v);

// ---------------------------------------------------------------------------------------------------------------------
/**
 * d: { name, year (default 2025), sc (ordinary share capital), prem, revRes, genRes, loan, trading: true,
 *   ppe: [{ label, cost, accDep, rate (% of cost, 0 for land), group ("dist" | "admin" | "cos"), revalTo? (revalue to this amount; no depreciation) }],
 *   openInv, closeInv, sales, returnsIn, purchases, carriageIn, returnsOut,
 *   income: [{ label, tb, adv?, acc? }], expenses: [{ label, tb, acc?, pre?, group: "dist"|"admin"|"fin" }],
 *   recv, writeOff, allowPct, allowOpen, bank (negative = overdraft), cash, payables,
 *   tax (charge for the year), intDiv (interim dividend paid, in the TB), finalDiv (final dividend declared but unpaid at the year end),
 *   toGeneral (transfer to general reserve) }
 */
export function coModel(d0) {
  let d = d0;
  if (d0.retOpen !== undefined && !d0._probe) {
    const p0 = coModel({ ...d0, retOpen: undefined, bank: 0, _probe: true }).retOpen;
    d = { ...d0, bank: r2(d0.retOpen - p0) };
  }
  const year = d.year ?? 2025;
  const nca = d.ppe.map((p) => {
    const charge = p.rate ? r2((p.cost * p.rate) / 100) : 0;
    const reval = p.revalTo ? r2(p.revalTo - p.cost) : 0;
    const costClose = p.revalTo ?? p.cost;
    return { ...p, charge, reval, costClose, accClose: r2(p.accDep + charge), cv: r2(costClose - p.accDep - charge), group: p.group ?? "admin" };
  });
  const revenue = r2(d.sales - (d.returnsIn ?? 0));
  const cos = d.trading === false ? 0 : r2((d.openInv ?? 0) + d.purchases + (d.carriageIn ?? 0) - (d.returnsOut ?? 0) - (d.closeInv ?? 0));
  const gp = r2(revenue - cos);
  const income = (d.income ?? []).map((i) => ({ ...i, amt: r2(i.tb - (i.adv ?? 0) + (i.acc ?? 0)) }));
  const incomeTotal = sum(income.map((i) => i.amt));
  const exps = (d.expenses ?? []).map((e) => ({ ...e, amt: r2(e.tb + (e.acc ?? 0) - (e.pre ?? 0)) }));
  const irrNet = r2((d.recv ?? 0) - (d.writeOff ?? 0));
  const allowNew = r2((irrNet * (d.allowPct ?? 0)) / 100);
  const irrCharge = d.recv ? r2((d.writeOff ?? 0) + allowNew - (d.allowOpen ?? 0)) : 0;
  const groupTotal = (g) => {
    let s = sum(exps.filter((e) => (e.group ?? "admin") === g).map((e) => e.amt));
    s += sum(nca.filter((n) => n.group === g).map((n) => n.charge));
    if (g === "admin") s += irrCharge;
    return r2(s);
  };
  const dist = groupTotal("dist");
  const admin = groupTotal("admin");
  const fin = groupTotal("fin");
  const pbt = r2(gp + incomeTotal - dist - admin - fin);
  const tax = d.tax ?? 0;
  const profit = r2(pbt - tax);
  const revalGain = sum(nca.map((n) => n.reval));
  const tci = r2(profit + revalGain);
  const intDiv = d.intDiv ?? 0;
  const finalDiv = d.finalDiv ?? 0;
  const toGeneral = d.toGeneral ?? 0;
  // assets
  const ppeCv = sum(nca.map((n) => n.cv));
  const prepay = sum(exps.map((e) => e.pre ?? 0)) + sum(income.map((i) => i.acc ?? 0));
  const accrue = sum(exps.map((e) => e.acc ?? 0)) + sum(income.map((i) => i.adv ?? 0));
  const recvNet = r2(irrNet - allowNew);
  const cashEq = r2(Math.max(d.bank ?? 0, 0) + (d.cash ?? 0));
  const overdraft = (d.bank ?? 0) < 0 ? -d.bank : 0;
  const closeInv = d.closeInv ?? 0;
  const ca = r2(closeInv + recvNet + prepay + cashEq);
  const assets = r2(ppeCv + ca);
  // equity
  const revResClose = r2((d.revRes ?? 0) + revalGain);
  const genResClose = r2((d.genRes ?? 0) + toGeneral);
  // trial balance (retained earnings at the start is the balancing figure)
  const tbRows = [];
  for (const n of nca) tbRows.push([`${n.label} at cost`, n.cost, null]);
  if (d.openInv) tbRows.push(["Inventory at start of year", d.openInv, null]);
  if (d.trading !== false) {
    tbRows.push(["Purchases", d.purchases, null]);
    if (d.carriageIn) tbRows.push(["Carriage inwards", d.carriageIn, null]);
    if (d.returnsIn) tbRows.push(["Returns inwards", d.returnsIn, null]);
  }
  for (const e of exps) tbRows.push([e.label, e.tb, null]);
  if (intDiv) tbRows.push(["Interim dividend paid", intDiv, null]);
  if (d.recv) tbRows.push(["Trade receivables", d.recv, null]);
  if ((d.bank ?? 0) > 0) tbRows.push(["Bank", d.bank, null]);
  if (d.cash) tbRows.push(["Cash", d.cash, null]);
  tbRows.push(["Ordinary share capital", null, d.sc]);
  if (d.prem) tbRows.push(["Share premium", null, d.prem]);
  if (d.revRes) tbRows.push(["Revaluation reserve", null, d.revRes]);
  if (d.genRes) tbRows.push(["General reserve", null, d.genRes]);
  const plugIndex = tbRows.length;
  tbRows.push(["Retained earnings at start of year", null, 0]);
  if (d.loan) tbRows.push([d.loanLabel ?? "Loan notes", null, d.loan]);
  tbRows.push([d.salesLabel ?? "Sales", null, d.sales]);
  if (d.returnsOut) tbRows.push(["Returns outwards", null, d.returnsOut]);
  for (const i of income) tbRows.push([i.label, null, i.tb]);
  for (const n of nca) if (n.accDep) tbRows.push([`Accumulated depreciation: ${n.label.toLowerCase()}`, null, n.accDep]);
  if (d.allowOpen) tbRows.push(["Allowance for irrecoverable debts", null, d.allowOpen]);
  tbRows.push(["Trade payables", null, d.payables]);
  if (overdraft) tbRows.push(["Bank overdraft", null, overdraft]);
  const debits = sum(tbRows.map((r) => r[1]));
  const credits = sum(tbRows.map((r) => r[2]));
  const retOpen = r2(debits - credits);
  if (retOpen <= 0 && !d._probe) throw new Error(`coModel ${d.name}: retained earnings at start is not positive (${retOpen})`);
  tbRows[plugIndex][2] = retOpen;
  const tb = trialBalance(`Trial balance of ${d.name} at 31 December ${year}`, tbRows);
  const retClose = r2(retOpen + profit - intDiv - finalDiv - toGeneral);
  const equity = r2(d.sc + (d.prem ?? 0) + revResClose + genResClose + retClose);
  const taxPay = tax;
  const otherPay = r2(accrue);
  const cl = r2(d.payables + otherPay + finalDiv + taxPay + overdraft);
  const ncl = d.loan ?? 0;
  check(`${d.name}: assets = equity + liabilities`, assets, equity + ncl + cl);

  const heads = (statement, when) => heading(d.name, statement, when);
  // ---- statement of profit or loss (detail in the first column, totals in the second)
  const splRows = [];
  if (d.trading === false) splRows.push([`**${d.salesLabel ?? "Revenue"}**`, null, revenue]);
  else if (d.returnsIn) splRows.push(["Sales", null, d.sales], ["Less: returns inwards", null, -d.returnsIn], ["**Revenue**", null, revenue]);
  else splRows.push(["**Revenue**", null, revenue]);
  if (d.trading !== false) splRows.push(["Cost of sales", null, -cos], ["**Gross profit**", null, gp]);
  if (income.length) {
    splRows.push(["**Other income**"]);
    for (const i of income) splRows.push([i.label, i.amt]);
    splRows.push(["Total other income", null, incomeTotal]);
  }
  const block = (title, g, total) => {
    const items = [...exps.filter((e) => (e.group ?? "admin") === g).map((e) => [e.label, e.amt]), ...nca.filter((n) => n.group === g && n.charge).map((n) => [`Depreciation: ${n.label.toLowerCase()}`, n.charge])];
    if (g === "admin" && irrCharge) items.push(["Irrecoverable debts and change in allowance", irrCharge]);
    if (!items.length) return;
    splRows.push([`**${title}**`]);
    for (const it of items) splRows.push(it);
    splRows.push([`Total ${title.toLowerCase()}`, null, -total]);
  };
  block("Distribution costs", "dist", dist);
  block("Administrative expenses", "admin", admin);
  block("Finance costs", "fin", fin);
  splRows.push(["**Profit before tax**", null, pbt], ["Income tax expense", null, -tax], ["**Profit for the year**", null, profit]);
  if (revalGain) splRows.push(["Other comprehensive income: gain on revaluation of land", null, revalGain], ["**Total comprehensive income for the year**", null, tci]);
  const spl = heads("Statement of profit or loss" + (revalGain ? " and other comprehensive income" : ""), `for the year ended 31 December ${year}`) + "\n\n" + grid(splRows, ["US\\$", "US\\$"]);
  // ---- statement of financial position
  const sofpRows = [["**ASSETS**"], ["**Non-current assets**"], ["Property, plant and equipment", null, ppeCv], ["**Current assets**"]];
  if (closeInv) sofpRows.push(["Inventory", closeInv]);
  if (d.recv) sofpRows.push(["Trade receivables", recvNet]);
  if (prepay) sofpRows.push(["Other receivables (prepayments and accrued income)", prepay]);
  sofpRows.push(["Cash and cash equivalents", cashEq], ["Total current assets", null, ca], ["**Total assets**", null, assets], null, ["**EQUITY AND LIABILITIES**"], ["**Equity**"], ["Ordinary share capital", d.sc]);
  if (d.prem) sofpRows.push(["Share premium", d.prem]);
  if (revResClose) sofpRows.push(["Revaluation reserve", revResClose]);
  if (genResClose) sofpRows.push(["General reserve", genResClose]);
  sofpRows.push(["Retained earnings", retClose], ["Total equity", null, equity]);
  if (ncl) sofpRows.push(["**Non-current liabilities**"], [d.loanLabel ?? "Loan notes", null, ncl]);
  sofpRows.push(["**Current liabilities**"], ["Trade payables", d.payables]);
  if (otherPay) sofpRows.push(["Other payables (accruals and income received in advance)", otherPay]);
  if (finalDiv) sofpRows.push(["Dividends payable", finalDiv]);
  sofpRows.push(["Income tax payable", taxPay]);
  if (overdraft) sofpRows.push(["Bank overdraft", overdraft]);
  sofpRows.push(["Total current liabilities", null, cl], ["**Total equity and liabilities**", null, r2(equity + ncl + cl)]);
  const sofp = heads("Statement of financial position", `at 31 December ${year}`) + "\n\n" + grid(sofpRows);
  // ---- statement of changes in equity
  const ev = [];
  const cols = ["Share capital", "Share premium", "Revaluation reserve", "General reserve", "Retained earnings"];
  ev.push(["Profit for the year", 0, 0, 0, 0, profit]);
  if (revalGain) ev.push(["Gain on revaluation of land", 0, 0, revalGain, 0, 0]);
  if (intDiv) ev.push(["Interim dividend paid", 0, 0, 0, 0, -intDiv]);
  if (finalDiv) ev.push(["Final dividend declared", 0, 0, 0, 0, -finalDiv]);
  if (toGeneral) ev.push(["Transfer to general reserve", 0, 0, 0, toGeneral, -toGeneral]);
  const se = soce({ name: d.name, when: `for the year ended 31 December ${year}`, cols, opening: [d.sc, d.prem ?? 0, d.revRes ?? 0, d.genRes ?? 0, retOpen], events: ev, openLabel: `Balance at 1 January ${year}`, closeLabel: `Balance at 31 December ${year}` });
  check(`${d.name}: SOCE total = equity`, se.total, equity);
  // ---- notes for the question
  const notes = [];
  if (closeInv) notes.push(`Closing inventory was valued at US\\$${fmt(closeInv)}.`);
  for (const e of exps) {
    if (e.acc) notes.push(`${e.label}: US\\$${fmt(e.acc)} was owing at the year end.`);
    if (e.pre) notes.push(`${e.label}: US\\$${fmt(e.pre)} was paid in advance at the year end.`);
  }
  for (const i of income) {
    if (i.adv) notes.push(`${i.label}: US\\$${fmt(i.adv)} relates to next year.`);
    if (i.acc) notes.push(`${i.label}: US\\$${fmt(i.acc)} was earned but not yet received.`);
  }
  for (const n of nca) {
    if (n.rate) notes.push(`Depreciate ${n.label.toLowerCase()} at ${n.rate}% of cost.`);
    if (n.revalTo) notes.push(`Revalue ${n.label.toLowerCase()} to US\\$${fmt(n.revalTo)}.`);
  }
  if (d.writeOff) notes.push(`Write off an irrecoverable debt of US\\$${fmt(d.writeOff)}.`);
  if (d.allowPct) notes.push(`Maintain the allowance for irrecoverable debts at ${d.allowPct}% of trade receivables${d.writeOff ? " after the write-off" : ""}.`);
  if (tax) notes.push(`Provide for income tax of US\\$${fmt(tax)} for the year.`);
  if (finalDiv) notes.push(`A final dividend of US\\$${fmt(finalDiv)} was declared before the year end and is unpaid.`);
  if (toGeneral) notes.push(`Transfer US\\$${fmt(toGeneral)} to the general reserve.`);
  const notesMd = ["| Ref | Information at 31 December " + year + " |", "| --- | --- |", ...notes.map((n, i) => `| (${String.fromCharCode(97 + i)}) | ${n} |`)].join("\n");
  return {
    ...d, nca, revenue, cos, gp, income, incomeTotal, exps, irrNet, allowNew, irrCharge, dist, admin, fin, pbt, tax, profit, revalGain, tci, intDiv, finalDiv, toGeneral,
    ppeCv, prepay, accrue, recvNet, cashEq, overdraft, ca, assets, revResClose, genResClose, retOpen, retClose, equity, ncl, cl, otherPay,
    tb, spl, sofp, soce: se, notes, notesMd, retained: retClose,
  };
}

// ---------------------------------------------------------------------------------------------------------------------
/**
 * Statement of changes in equity. cols: column names (without Total); opening: balances; events: [label, ...deltas] (one per column).
 * Returns { md, closing: [..], total }. Throws if any event is not an array of the right length.
 */
export function soce({ name, when, cols, opening, events, openLabel = "Balance at 1 January", closeLabel = "Balance at 31 December", heading: showHeading = true }) {
  const running = [...opening];
  const lines = [];
  const header = ["", ...cols.map((c) => c + " US\\$"), "Total US\\$"];
  lines.push(row(header), row(["---", ...cols.map(() => "---:"), "---:"]));
  lines.push(row([`**${openLabel}**`, ...opening.map((v) => fmt(v)), fmt(sum(opening))]));
  for (const ev of events) {
    const [label, ...deltas] = ev;
    if (deltas.length !== cols.length) throw new Error(`soce event ${label}: ${deltas.length} amounts for ${cols.length} columns`);
    deltas.forEach((v, i) => {
      running[i] = r2(running[i] + v);
    });
    lines.push(row([label, ...deltas.map((v) => (v ? fmt(v) : "")), fmt(sum(deltas))]));
  }
  const total = sum(running);
  lines.push(row([`**${closeLabel}**`, ...running.map((v) => `**${fmt(v)}**`), `**${fmt(total)}**`]));
  const md = (showHeading && name ? heading(name, "Statement of changes in equity", when) + "\n\n" : "") + lines.join("\n");
  return { md, closing: running, total };
}

// ---------------------------------------------------------------------------------------------------------------------
/** Schedule of non-current assets. classes: [{ name, costOpen, add, disp, reval, depOpen, charge, depDisp }]. */
export function ncaSchedule(classes, { title = "Schedule of non-current assets", when = "year ended 31 December 2025" } = {}) {
  const cs = classes.map((c) => ({ add: 0, disp: 0, reval: 0, depOpen: 0, charge: 0, depDisp: 0, ...c }));
  for (const c of cs) {
    c.costClose = r2(c.costOpen + c.add - c.disp + c.reval);
    c.depClose = r2(c.depOpen + c.charge - c.depDisp);
    c.cv = r2(c.costClose - c.depClose);
    c.cvOpen = r2(c.costOpen - c.depOpen);
  }
  const tot = (k) => sum(cs.map((c) => c[k]));
  const t = { costOpen: tot("costOpen"), add: tot("add"), disp: tot("disp"), reval: tot("reval"), costClose: tot("costClose"), depOpen: tot("depOpen"), charge: tot("charge"), depDisp: tot("depDisp"), depClose: tot("depClose"), cv: tot("cv"), cvOpen: tot("cvOpen") };
  const cols = [...cs.map((c) => c.name), "Total"];
  const lineOf = (label, key, sign = 1) => row([label, ...cs.map((c) => (c[key] ? fmt(sign * c[key]) : "")), t[key] ? fmt(sign * t[key]) : ""]);
  const lines = [row(["", ...cols.map((c) => c + " US\\$")]), row(["---", ...cols.map(() => "---:")])];
  lines.push(row(["**Cost or valuation**", ...cols.map(() => "")]));
  lines.push(lineOf("At 1 January", "costOpen"));
  lines.push(lineOf("Additions", "add"));
  lines.push(lineOf("Disposals", "disp", -1));
  lines.push(lineOf("Revaluation", "reval"));
  lines.push(row(["**At 31 December**", ...cs.map((c) => `**${fmt(c.costClose)}**`), `**${fmt(t.costClose)}**`]));
  lines.push(row(["**Accumulated depreciation**", ...cols.map(() => "")]));
  lines.push(lineOf("At 1 January", "depOpen"));
  lines.push(lineOf("Charge for the year", "charge"));
  lines.push(lineOf("Disposals", "depDisp", -1));
  lines.push(row(["**At 31 December**", ...cs.map((c) => `**${fmt(c.depClose)}**`), `**${fmt(t.depClose)}**`]));
  lines.push(row(["**Carrying amount at 31 December**", ...cs.map((c) => `**${fmt(c.cv)}**`), `**${fmt(t.cv)}**`]));
  lines.push(row(["Carrying amount at 1 January", ...cs.map((c) => fmt(c.cvOpen)), fmt(t.cvOpen)]));
  return { md: `**${title}**\n**${when}**\n\n` + lines.join("\n"), classes: cs, t };
}

// ---------------------------------------------------------------------------------------------------------------------
/**
 * Cash-flow data set (company, IAS 7 indirect method). Opening balances balance by construction (retained earnings is the
 * balancing figure); the closing bank balance comes from the flows and is checked against the closing statement of financial position.
 * d: { name, year,
 *   open: { cost, accDep, inv, rec, bank, pay, taxPay, intPay (0), sc, prem, loan },
 *   y: { pbt, intExp, intInc (0), dep, disp: { cost, accDep, proceeds } | null, add (cash purchases of PPE), dInv, dRec, dPay (increases positive),
 *        tax (charge), taxPaid, intPaid, intRecd, divPaid, issue: { nominal, premium } | null, loanChange }
 * }
 */
export function cfModel(d) {
  const o = d.open;
  const y = { intInc: 0, intRecd: 0, disp: null, issue: null, loanChange: 0, intPaid: undefined, ...d.y };
  y.intPaid ??= y.intExp;
  y.intRecd ??= y.intInc;
  const dispCost = y.disp?.cost ?? 0;
  const dispAcc = y.disp?.accDep ?? 0;
  const dispProceeds = y.disp?.proceeds ?? 0;
  const dispCv = r2(dispCost - dispAcc);
  const dispProfit = r2(dispProceeds - dispCv); // + profit, - loss
  const profitAfterTax = r2(y.pbt - y.tax);
  const retOpen = r2((o.cost - o.accDep) + o.inv + o.rec + o.bank - o.pay - o.taxPay - (o.intPay ?? 0) - o.sc - (o.prem ?? 0) - (o.loan ?? 0));
  if (retOpen <= 0) throw new Error(`cfModel ${d.name}: opening retained earnings not positive (${retOpen})`);
  // working capital: dInv etc. are increases in the balance
  const wc = r2(-y.dInv - y.dRec + y.dPay);
  const adj = [];
  adj.push(["Depreciation", y.dep]);
  if (y.disp) adj.push([dispProfit >= 0 ? "Profit on disposal of non-current assets" : "Loss on disposal of non-current assets", -dispProfit]);
  if (y.intExp) adj.push(["Finance costs", y.intExp]);
  if (y.intInc) adj.push(["Interest income", -y.intInc]);
  const beforeWc = r2(y.pbt + sum(adj.map((a) => a[1])));
  const cashGen = r2(beforeWc + wc);
  const netOp = r2(cashGen - y.intPaid - y.taxPaid);
  const investing = [];
  if (y.add) investing.push(["Purchase of property, plant and equipment", -y.add]);
  if (y.disp) investing.push(["Proceeds from sale of property, plant and equipment", dispProceeds]);
  if (y.intRecd) investing.push(["Interest received", y.intRecd]);
  const netInv = sum(investing.map((i) => i[1]));
  const financing = [];
  if (y.issue) financing.push(["Proceeds from issue of shares", r2(y.issue.nominal + y.issue.premium)]);
  if (y.loanChange > 0) financing.push(["Proceeds from loan notes", y.loanChange]);
  if (y.loanChange < 0) financing.push(["Repayment of loan notes", y.loanChange]);
  if (y.divPaid) financing.push(["Dividends paid", -y.divPaid]);
  const netFin = sum(financing.map((i) => i[1]));
  const net = r2(netOp + netInv + netFin);
  const bankClose = r2(o.bank + net);
  // closing balances
  const c = {
    cost: r2(o.cost + y.add - dispCost),
    accDep: r2(o.accDep + y.dep - dispAcc),
    inv: r2(o.inv + y.dInv),
    rec: r2(o.rec + y.dRec),
    bank: bankClose,
    pay: r2(o.pay + y.dPay),
    taxPay: r2(o.taxPay + y.tax - y.taxPaid),
    intPay: r2((o.intPay ?? 0) + y.intExp - y.intPaid),
    sc: r2(o.sc + (y.issue?.nominal ?? 0)),
    prem: r2((o.prem ?? 0) + (y.issue?.premium ?? 0)),
    loan: r2((o.loan ?? 0) + y.loanChange),
    ret: r2(retOpen + profitAfterTax - y.divPaid),
  };
  c.ppe = r2(c.cost - c.accDep);
  const sofpSide = (b, ret) => {
    const ppe = r2(b.cost - b.accDep);
    const assets = r2(ppe + b.inv + b.rec + Math.max(b.bank, 0));
    const equity = r2(b.sc + (b.prem ?? 0) + ret);
    const liab = r2((b.loan ?? 0) + b.pay + b.taxPay + (b.intPay ?? 0) + Math.max(-b.bank, 0));
    return { ppe, assets, equity, liab };
  };
  const so = sofpSide(o, retOpen);
  check(`${d.name}: opening SOFP balances`, so.assets, so.equity + so.liab);
  const sc = sofpSide(c, c.ret);
  check(`${d.name}: closing SOFP balances`, sc.assets, sc.equity + sc.liab);
  const op = { ...o, ret: retOpen, ppe: so.ppe };
  const sofpMd = (b, ret, when) => {
    const rows = [["**Non-current assets**"], ["Property, plant and equipment", null, r2(b.cost - b.accDep)], ["**Current assets**"], ["Inventory", b.inv], ["Trade receivables", b.rec]];
    if (b.bank >= 0) rows.push(["Cash and cash equivalents", b.bank]);
    const ca = r2(b.inv + b.rec + Math.max(b.bank, 0));
    rows.push(["Total current assets", null, ca], ["**Total assets**", null, r2(r2(b.cost - b.accDep) + ca)], null, ["**Equity**"], ["Ordinary share capital", b.sc]);
    if (b.prem) rows.push(["Share premium", b.prem]);
    rows.push(["Retained earnings", ret], ["Total equity", null, r2(b.sc + (b.prem ?? 0) + ret)]);
    if (b.loan) rows.push(["**Non-current liabilities**"], ["Loan notes", null, b.loan]);
    rows.push(["**Current liabilities**"], ["Trade payables", b.pay]);
    if (b.intPay) rows.push(["Interest payable", b.intPay]);
    rows.push(["Income tax payable", b.taxPay]);
    if (b.bank < 0) rows.push(["Bank overdraft", -b.bank]);
    const cl = r2(b.pay + b.taxPay + (b.intPay ?? 0) + Math.max(-b.bank, 0));
    rows.push(["Total current liabilities", null, cl], ["**Total equity and liabilities**", null, r2(b.sc + (b.prem ?? 0) + ret + (b.loan ?? 0) + cl)]);
    return heading(d.name, "Statement of financial position", when) + "\n\n" + grid(rows);
  };
  const cfRows = [["**Cash flows from operating activities**"], ["Profit before tax", null, y.pbt]];
  for (const [l, v] of adj) cfRows.push([l, null, v]);
  cfRows.push(["Operating profit before working capital changes", null, beforeWc]);
  if (y.dInv) cfRows.push([y.dInv > 0 ? "Increase in inventory" : "Decrease in inventory", null, -y.dInv]);
  if (y.dRec) cfRows.push([y.dRec > 0 ? "Increase in trade receivables" : "Decrease in trade receivables", null, -y.dRec]);
  if (y.dPay) cfRows.push([y.dPay > 0 ? "Increase in trade payables" : "Decrease in trade payables", null, y.dPay]);
  cfRows.push(["**Cash generated from operations**", null, cashGen]);
  if (y.intPaid) cfRows.push(["Interest paid", null, -y.intPaid]);
  if (y.taxPaid) cfRows.push(["Income tax paid", null, -y.taxPaid]);
  cfRows.push(["**Net cash from operating activities**", null, netOp], ["**Cash flows from investing activities**"]);
  for (const [l, v] of investing) cfRows.push([l, null, v]);
  cfRows.push(["**Net cash used in investing activities**", null, netInv], ["**Cash flows from financing activities**"]);
  for (const [l, v] of financing) cfRows.push([l, null, v]);
  cfRows.push(["**Net cash from (used in) financing activities**", null, netFin], null, ["**Net increase (decrease) in cash and cash equivalents**", null, net], [`Cash and cash equivalents at 1 January ${d.year ?? 2025}`, null, o.bank], [`**Cash and cash equivalents at 31 December ${d.year ?? 2025}**`, null, bankClose]);
  const cf = heading(d.name, "Statement of cash flows", `for the year ended 31 December ${d.year ?? 2025}`) + "\n\n" + grid(cfRows);
  const when = (yr) => `at 31 December ${yr}`;
  return {
    d, o: op, c, y, retOpen, profitAfterTax, dispCv, dispProfit, beforeWc, wc, cashGen, netOp, netInv, netFin, net, bankClose, adj, investing, financing,
    sofpOpen: sofpMd(o, retOpen, when((d.year ?? 2025) - 1)), sofpClose: sofpMd(c, c.ret, when(d.year ?? 2025)), cf, equityOpen: so.equity, equityClose: sc.equity, assetsOpen: so.assets, assetsClose: sc.assets,
    cfRows,
  };
}

// ---------------------------------------------------------------------------------------------------------------------
/**
 * Departmental accounts. d: { name, year, depts: [{ name, sales, returnsIn?, openInv, purchases, closeInv, direct: [{label, amt}] }],
 *   common: [{ label, total, basis: "sales"|"cos"|"equal"|<text>, shares? }], income: [{ label, total, basis, shares? }] }
 * Shares are apportioned to the cent; the model throws when the parts do not add up to the total.
 */
export function deptModel(d) {
  const n = d.depts.length;
  const dep = d.depts.map((x) => {
    const revenue = r2(x.sales - (x.returnsIn ?? 0));
    const cos = r2(x.openInv + x.purchases - x.closeInv);
    return { ...x, revenue, cos, gp: r2(revenue - cos) };
  });
  const sharesFor = (item) => {
    if (item.basis === "sales") return dep.map((x) => x.revenue);
    if (item.basis === "cos") return dep.map((x) => x.cos);
    if (item.basis === "equal") return dep.map(() => 1);
    return item.shares;
  };
  const apportion = (item) => {
    const s = sharesFor(item);
    if (s.length !== n) throw new Error(`dept ${item.label}: shares`);
    const tot = s.reduce((a, b) => a + b, 0);
    const parts = s.map((v) => r2((item.total * v) / tot));
    check(`apportion ${item.label}`, sum(parts), item.total);
    return { ...item, shares: s, parts };
  };
  const common = (d.common ?? []).map(apportion);
  const income = (d.income ?? []).map(apportion);
  const directLabels = [...new Set(dep.flatMap((x) => (x.direct ?? []).map((e) => e.label)))];
  const exps = [];
  for (const l of directLabels) exps.push({ label: l, parts: dep.map((x) => (x.direct ?? []).find((e) => e.label === l)?.amt ?? 0) });
  for (const c of common) exps.push({ label: c.label, parts: c.parts });
  const expTotals = dep.map((_, i) => sum(exps.map((e) => e.parts[i])));
  const incTotals = dep.map((_, i) => sum(income.map((e) => e.parts[i])));
  const net = dep.map((x, i) => r2(x.gp + incTotals[i] - expTotals[i]));
  const totals = {
    revenue: sum(dep.map((x) => x.revenue)), cos: sum(dep.map((x) => x.cos)), gp: sum(dep.map((x) => x.gp)), exps: sum(expTotals), income: sum(incTotals), net: sum(net),
  };
  check("dept: total net profit", totals.gp + totals.income - totals.exps, totals.net);
  const cols = [...dep.map((x) => x.name + " US\\$"), "Total US\\$"];
  const pct = (a, b) => (b ? `${(Math.round((a / b) * 1000) / 10).toFixed(1)}%` : "");
  const L = [];
  const add = (label, parts, total = sum(parts), bold = false) => {
    const f = (v) => (v === 0 || v === null || v === undefined ? "" : fmt(v));
    L.push(row([bold ? `**${label}**` : label, ...parts.map((v) => (bold && v !== "" ? `**${f(v)}**` : f(v))), bold ? `**${f(total)}**` : f(total)]));
  };
  L.push(row(["", ...cols]), row(["---", ...cols.map(() => "---:")]));
  if (dep.some((x) => x.returnsIn)) {
    add("Sales", dep.map((x) => x.sales));
    add("Less: returns inwards", dep.map((x) => -(x.returnsIn ?? 0)));
  }
  add("Revenue", dep.map((x) => x.revenue), totals.revenue, true);
  add("Opening inventory", dep.map((x) => x.openInv));
  add("Purchases", dep.map((x) => x.purchases));
  add("Less: closing inventory", dep.map((x) => -x.closeInv));
  add("Cost of sales", dep.map((x) => -x.cos), -totals.cos, true);
  add("Gross profit", dep.map((x) => x.gp), totals.gp, true);
  for (const i of income) add(i.label, i.parts);
  for (const e of exps) add(e.label, e.parts.map((v) => -v));
  add("Net profit (loss)", net, totals.net, true);
  L.push(row(["Gross profit as % of revenue", ...dep.map((x) => pct(x.gp, x.revenue)), pct(totals.gp, totals.revenue)]));
  L.push(row(["Net profit as % of revenue", ...dep.map((x, i) => pct(net[i], x.revenue)), pct(totals.net, totals.revenue)]));
  const pl = heading(d.name, "Departmental statement of profit or loss", `for the year ended 31 December ${d.year ?? 2025}`) + "\n\n" + L.join("\n");
  const A = [row(["Item", "Total US\\$", "Basis", ...dep.map((x) => x.name + " US\\$")]), row(["---", "---:", "---", ...dep.map(() => "---:")])];
  for (const c of [...common, ...income]) {
    const basisText = typeof c.basis === "string" && ["sales", "cos", "equal"].includes(c.basis) ? { sales: "Sales", cos: "Cost of sales", equal: "Equal shares" }[c.basis] : c.basisText ?? c.basis;
    A.push(row([c.label, fmt(c.total), basisText, ...c.parts.map((v) => fmt(v))]));
  }
  return { dep, common, income, exps, expTotals, incTotals, net, totals, pl, apportionMd: A.join("\n"), pct };
}
