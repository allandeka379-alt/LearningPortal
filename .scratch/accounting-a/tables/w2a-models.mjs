// W2a: a checked model of a trading (or service) business's year-end statements, for a sole trader or a partnership.
// Everything is computed from the input; trial balance, statements and appropriation throw if they do not balance.
import { trialBalance, check, sum, r2, fmt, table, appropriation } from "../lib.mjs";
import { spl, sfp, approTable, colLedger } from "./w2a-lib.mjs";

/**
 * d: {
 *   biz, yearEnd ("31 December 2025"), service (bool: no inventory / cost of sales),
 *   nca: [{ label, cost, accDep, rate }]  (rate = % of cost, straight line, full year),
 *   sales, returnsIn, openInv, purchases, carriageIn, returnsOut, closingInv, ownUse (sole trader only),
 *   income: [{ label, tb, acc?, adv? }], expenses: [{ label, tb, acc?, pre?, group? }],
 *   recv, writeOff, allowPct, allowOpen, bank, cash, payables, loan, overdraft,
 *   drawings (sole) , capitalOpen (sole: if undefined it is the TB balancing figure),
 *   partners: [{ name, capital, currentOpen (undefined on the LAST partner = balancing), drawings, salary, intCapPct, intDrawingsPct, share }]
 * }
 */
export function tradingModel(d) {
  const ye = d.yearEnd ?? "31 December 2025";
  const when = `for the year ended ${ye}`;
  const at = `at ${ye}`;
  const trading = !d.service;
  const ownUse = d.ownUse ?? 0;
  const nca = d.nca.map((a) => ({ ...a, charge: r2((a.cost * a.rate) / 100) }));
  const depTotal = sum(nca.map((a) => a.charge));
  const writeOff = d.writeOff ?? 0;
  const recvAfter = r2(d.recv - writeOff);
  const allowNew = r2((recvAfter * (d.allowPct ?? 0)) / 100);
  const allowInc = r2(allowNew - (d.allowOpen ?? 0));
  const irrExp = r2(writeOff + allowInc);
  const exps = (d.expenses ?? []).map((e) => ({ ...e, amt: r2(e.tb + (e.acc ?? 0) - (e.pre ?? 0)) }));
  const incs = (d.income ?? []).map((i) => ({ ...i, amt: r2(i.tb + (i.acc ?? 0) - (i.adv ?? 0)) }));
  const purchasesNet = r2((d.purchases ?? 0) - ownUse);

  // ---- statement of profit or loss
  const adminItems = [];
  const distItems = [];
  const finItems = [];
  const flat = [];
  for (const e of exps) {
    flat.push([e.label, e.amt]);
    (e.group === "dist" ? distItems : e.group === "fin" ? finItems : adminItems).push([e.label, e.amt]);
  }
  for (const a of nca) {
    if (a.charge) {
      flat.push([`Depreciation: ${a.label.toLowerCase()}`, a.charge]);
      (a.group === "dist" ? distItems : adminItems).push([`Depreciation: ${a.label.toLowerCase()}`, a.charge]);
    }
  }
  if (irrExp || d.allowPct !== undefined) {
    const irrLabel = writeOff ? "Irrecoverable debts and change in allowance" : "Change in allowance for irrecoverable debts";
    flat.push([irrLabel, irrExp]);
    adminItems.push([irrLabel, irrExp]);
  }
  const groups = d.grouped ? [{ heading: "Distribution costs", items: distItems }, { heading: "Administrative expenses", items: adminItems }, { heading: "Finance costs", items: finItems }].filter((g) => g.items.length) : null;
  const P = spl({
    biz: d.biz,
    when,
    sales: d.sales,
    returnsIn: d.returnsIn ?? 0,
    openInv: d.openInv ?? 0,
    purchases: purchasesNet,
    carriageIn: d.carriageIn ?? 0,
    returnsOut: d.returnsOut ?? 0,
    closingInv: d.closingInv ?? 0,
    trading,
    salesLabel: d.salesLabel ?? "Revenue",
    otherIncome: incs.map((i) => [i.label, i.amt]),
    expenses: groups ? [] : flat,
    expenseGroups: groups,
    title: d.splTitle ?? "Statement of profit or loss",
  });
  const profit = P.profit;

  // ---- trial balance (balancing figure: sole trader's capital or the last partner's current account)
  const debitRows = [];
  const creditRows = [];
  for (const a of nca) debitRows.push([`${a.label} at cost`, a.cost]);
  if (trading) debitRows.push(["Inventory at start of year", d.openInv ?? 0], ["Purchases", d.purchases ?? 0]);
  if (d.carriageIn) debitRows.push(["Carriage inwards", d.carriageIn]);
  if (d.returnsIn) debitRows.push(["Returns inwards", d.returnsIn]);
  for (const e of exps) debitRows.push([e.label, e.tb]);
  debitRows.push(["Trade receivables", d.recv]);
  if (d.bank) debitRows.push(["Bank", d.bank]);
  if (d.cash) debitRows.push(["Cash", d.cash]);
  if (d.partners) for (const p of d.partners) debitRows.push([`Drawings: ${p.name}`, p.drawings]);
  else debitRows.push(["Drawings", d.drawings ?? 0]);
  creditRows.push([d.service ? "Fees (revenue)" : "Sales", d.sales]);
  if (d.returnsOut) creditRows.push(["Returns outwards", d.returnsOut]);
  for (const i of incs) creditRows.push([i.label, i.tb]);
  for (const a of nca) if (a.accDep) creditRows.push([`Accumulated depreciation: ${a.label.toLowerCase()}`, a.accDep]);
  if (d.allowOpen) creditRows.push(["Allowance for irrecoverable debts", d.allowOpen]);
  creditRows.push(["Trade payables", d.payables]);
  if (d.loan) creditRows.push(["Loan", d.loan]);
  if (d.overdraft) creditRows.push(["Bank overdraft", d.overdraft]);
  let capOpen = d.capitalOpen;
  const partners = d.partners ? d.partners.map((p) => ({ ...p })) : null;
  if (partners) {
    for (const p of partners) creditRows.push([`Capital: ${p.name}`, p.capital]);
    const known = partners.slice(0, -1);
    for (const p of known) creditRows.push([`Current account: ${p.name}`, p.currentOpen]);
    const last = partners[partners.length - 1];
    const dTot = sum(debitRows.map((x) => x[1]));
    const cTot = sum(creditRows.map((x) => x[1]));
    last.currentOpen = r2(dTot - cTot);
    creditRows.push([`Current account: ${last.name}`, last.currentOpen]);
  } else {
    const dTot = sum(debitRows.map((x) => x[1]));
    const cTot = sum(creditRows.map((x) => x[1]));
    if (capOpen === undefined) capOpen = r2(dTot - cTot);
    creditRows.push(["Capital at start of year", capOpen]);
  }
  const tb = trialBalance(`Trial balance ${at}`, [...debitRows.map(([a, v]) => [a, v, null]), ...creditRows.map(([a, v]) => [a, null, v])]);

  // ---- statement of financial position
  const prepaid = sum(exps.map((e) => e.pre ?? 0));
  const accruedIncome = sum(incs.map((i) => i.acc ?? 0));
  const accrued = sum(exps.map((e) => e.acc ?? 0));
  const advance = sum(incs.map((i) => i.adv ?? 0));
  const netRecv = r2(recvAfter - allowNew);
  const ca = [];
  if (trading) ca.push(["Inventory", d.closingInv ?? 0]);
  ca.push([allowNew ? `Trade receivables (less allowance of ${fmt(allowNew)})` : "Trade receivables", netRecv]);
  if (prepaid || accruedIncome) ca.push(["Other receivables (prepayments and accrued income)", r2(prepaid + accruedIncome)]);
  if (d.bank) ca.push(["Bank", d.bank]);
  if (d.cash) ca.push(["Cash", d.cash]);
  const cl = [["Trade payables", d.payables]];
  if (accrued || advance) cl.push(["Other payables (accruals and income received in advance)", r2(accrued + advance)]);
  if (d.overdraft) cl.push(["Bank overdraft", d.overdraft]);
  const ncl = d.loan ? [["Loan", d.loan]] : [];
  let equityRows;
  let equityTotal;
  let appro = null;
  let capClose = null;
  let partnerResults = null;
  if (partners) {
    appro = approTable({
      biz: d.biz,
      when,
      profit,
      partners: partners.map((p) => ({ name: p.name, salary: p.salary, capital: p.capital, interestOnCapitalPct: p.intCapPct, drawings: p.drawings, interestOnDrawingsPct: p.intDrawingsPct, share: p.share })),
    });
    partnerResults = partners.map((p, i) => {
      const line = appro.calc.lines[i];
      const currentClose = r2(p.currentOpen + line.total - p.drawings);
      return { ...p, appropriated: r2(line.total), currentClose };
    });
    equityRows = [];
    for (const p of partnerResults) equityRows.push([`Capital account: ${p.name}`, p.capital, null]);
    for (const p of partnerResults) equityRows.push([`Current account: ${p.name}`, p.currentClose, null]);
    equityTotal = sum(partnerResults.map((p) => p.capital + p.currentClose));
  } else {
    const draw = r2((d.drawings ?? 0) + ownUse);
    capClose = r2(capOpen + profit - draw);
    equityRows = [["Capital at start of year", capOpen, null], ["Add: profit for the year", profit, null], ["Less: drawings", -draw, null], ["**Closing capital**", null, capClose]];
    equityTotal = capClose;
  }
  const S = sfp({
    biz: d.biz,
    when: at,
    nca: nca.map((a) => [a.label, a.cost, r2((a.accDep ?? 0) + a.charge)]),
    ca,
    ncl,
    cl,
    equityRows,
    equityTotal,
    equityHeading: partners ? "Partners' funds" : "Capital",
    showEquityTotal: !!partners,
  });
  return {
    tb, spl: P, sfp: S, appro, partnerResults, capOpen, capClose, profit, gp: P.gp, cos: P.cos, revenue: P.revenue,
    ncaTotal: S.ncaTotal, caTotal: S.caTotal, clTotal: S.clTotal, assets: S.assets, depTotal, irrExp, allowNew, allowInc, netRecv, recvAfter,
    exps, incs, nca, accrued, prepaid, advance, accruedIncome, expensesTotal: P.expenses,
  };
}

/** Adjustment notes as a table from the data (so the notes always agree with the model). */
export function adjustmentNotes(d, extra = []) {
  const rows = [];
  let n = 1;
  const add = (t) => rows.push([String(n++), t]);
  if (d.closingInv !== undefined && !d.service) add(`Closing inventory was valued at US\\$${fmt(d.closingInv)}.`);
  for (const e of d.expenses ?? []) {
    if (e.acc) add(`${e.label} owing at the year end: US\\$${fmt(e.acc)}.`);
    if (e.pre) add(`${e.label} prepaid at the year end: US\\$${fmt(e.pre)}.`);
  }
  for (const i of d.income ?? []) {
    if (i.acc) add(`Accrued income on ${i.label.toLowerCase()}: US\\$${fmt(i.acc)}.`);
    if (i.adv) add(`Income received in advance included in ${i.label.toLowerCase()}: US\\$${fmt(i.adv)}.`);
  }
  for (const a of d.nca) if (a.rate) add(`Depreciate ${a.label.toLowerCase()} at ${a.rate}% of cost.`);
  if (d.writeOff) add(`Write off an irrecoverable debt of US\\$${fmt(d.writeOff)}.`);
  if (d.allowPct !== undefined) add(`The allowance for irrecoverable debts is to be ${d.allowPct}% of the remaining trade receivables.`);
  if (d.ownUse) add(`The owner took goods costing US\\$${fmt(d.ownUse)} for personal use; no entry has been made.`);
  for (const x of extra) add(x);
  return table(["No.", "Adjustment"], rows, ["l", "l"]);
}
