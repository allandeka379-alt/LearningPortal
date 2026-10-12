// W2a: reconstructs the statements of a trader (sole trader or partnership) from incomplete records.
// All unknowns (credit sales, purchases, expenses, drawings, opening capital) are computed and cross-checked: the
// opening capital implied by the reconstructed trial balance must equal the opening statement of affairs.
import { check, sum, r2, fmt, table } from "../lib.mjs";
import { tAcct, affairs } from "./w2a-lib.mjs";
import { tradingModel } from "./w2a-models.mjs";

/**
 * s: {
 *   biz, yearEnd,
 *   openNca: [{ label, cost, accDep, rate, group?, added? }]  (added = bought during the year, paid from the bank),
 *   openInv, closeInv,
 *   recv: { open, close, cust, disc, ret, bad }, pay: { open, close, supp, disc, ret },
 *   cashSales (all banked), bank: { open, close },
 *   expenses: [{ label, paid, openAcc, closeAcc, openPre, closePre, group? }],
 *   income: [{ label, received, openAcc, closeAcc, openAdv, closeAdv }]  (received into the bank),
 *   allowOpen, allowPct, loan, partners (as tradingModel: all with currentOpen; drawings given) or drawings undefined (sole: balancing)
 * }
 */
export function incompleteModel(s) {
  const r = s.recv;
  const p = s.pay;
  const creditSales = r2(r.close + r.cust + r.disc + r.ret + r.bad - r.open);
  const purchases = r2(p.close + p.supp + p.disc + p.ret - p.open);
  const sales = r2(creditSales + s.cashSales);
  const expenses = (s.expenses ?? []).map((e) => ({ label: e.label, tb: r2(e.paid - (e.openAcc ?? 0) + (e.openPre ?? 0)), acc: e.closeAcc, pre: e.closePre, group: e.group }));
  if (r.disc) expenses.push({ label: "Discount allowed", tb: r.disc });
  if (r.bad) expenses.push({ label: "Irrecoverable debts written off", tb: r.bad });
  const income = (s.income ?? []).map((i) => ({ label: i.label, tb: r2(i.received - (i.openAcc ?? 0) + (i.openAdv ?? 0)), acc: i.closeAcc, adv: i.closeAdv }));
  if (p.disc) income.push({ label: "Discount received", tb: p.disc });
  const paidExpenses = sum((s.expenses ?? []).map((e) => e.paid));
  const added = sum((s.openNca ?? []).map((a) => a.added ?? 0));
  const bankReceipts = r2(s.bank.open + r.cust + s.cashSales + sum((s.income ?? []).map((i) => i.received)));
  const bankPaymentsKnown = r2(p.supp + paidExpenses + added + (s.loanRepaid ?? 0));
  let drawings = null;
  if (!s.partners) {
    drawings = r2(bankReceipts - bankPaymentsKnown - s.bank.close);
  } else {
    const dTot = sum(s.partners.map((x) => x.drawings));
    drawings = dTot;
    if (s.bank.close === undefined) s = { ...s, bank: { ...s.bank, close: r2(bankReceipts - bankPaymentsKnown - dTot) } };
    check(`${s.biz}: bank summary agrees with the closing balance`, r2(bankReceipts - bankPaymentsKnown - dTot), s.bank.close);
  }
  // ---- opening statement of affairs and the cross-check
  const openAssets = [
    { h: "Non-current assets", items: s.openNca.map((a) => [a.label, r2(a.cost - a.accDep)]) },
    { h: "Current assets", items: [["Inventory", s.openInv], ["Trade receivables (after the allowance)", r2(r.open - (s.allowOpen ?? 0))], ["Prepayments", sum((s.expenses ?? []).map((e) => e.openPre ?? 0)) + sum((s.income ?? []).map((i) => i.openAcc ?? 0))], ["Bank", s.bank.open]].filter((x) => x[1]) },
  ];
  const openLiab = [{ h: "Current liabilities", items: [["Trade payables", p.open], ["Accruals and income received in advance", sum((s.expenses ?? []).map((e) => e.openAcc ?? 0)) + sum((s.income ?? []).map((i) => i.openAdv ?? 0))], ["Loan", s.loan ?? 0]].filter((x) => x[1]) }];
  const soa = affairs({ biz: s.biz, when: `at the start of the year`, assets: openAssets, liabilities: openLiab });
  const nca = s.openNca.map((a) => ({ label: a.label, cost: r2(a.cost + (a.added ?? 0)), accDep: a.accDep, rate: a.rate, group: a.group }));
  const partners = s.partners ? s.partners.map((x, i, arr) => (i === arr.length - 1 ? { ...x, currentOpen: undefined } : { ...x })) : null;
  const lastCurrentFromSoa = s.partners ? r2(soa.capital - sum(s.partners.slice(0, -1).map((x) => x.capital + x.currentOpen)) - s.partners[s.partners.length - 1].capital) : null;
  const d = {
    biz: s.biz, yearEnd: s.yearEnd, grouped: s.grouped, splTitle: s.splTitle, nca,
    sales, returnsIn: r.ret, openInv: s.openInv, purchases, returnsOut: p.ret, closingInv: s.closeInv, carriageIn: s.carriageIn ?? 0,
    income, expenses, recv: r.close, writeOff: 0, allowPct: s.allowPct, allowOpen: s.allowOpen ?? 0, bank: s.bank.close, payables: p.close, loan: s.loan,
    drawings: s.partners ? undefined : drawings, partners,
  };
  const model = tradingModel(d);
  if (!s.partners) check(`${s.biz}: opening capital implied by the reconstruction equals the statement of affairs`, model.capOpen, soa.capital);
  else {
    check(`${s.biz}: last partner's opening current account implied by the reconstruction equals the statement of affairs`, model.partnerResults[model.partnerResults.length - 1].currentOpen, lastCurrentFromSoa);
  }
  // ---- workings
  const recvT = tAcct(
    "Total trade receivables account",
    [["1 Jan", "Balance b/d", r.open], ["31 Dec", "Credit sales (balancing figure)", creditSales]],
    [["31 Dec", "Bank", r.cust], ["31 Dec", "Discount allowed", r.disc], ["31 Dec", "Returns inwards", r.ret], ["31 Dec", "Irrecoverable debts", r.bad], ["31 Dec", "Balance c/d", r.close]].filter((x) => x[2]),
    { side: "dr", date: "1 Jan", details: "Balance b/d", amount: r.close },
  );
  const payT = tAcct(
    "Total trade payables account",
    [["31 Dec", "Bank", p.supp], ["31 Dec", "Discount received", p.disc], ["31 Dec", "Returns outwards", p.ret], ["31 Dec", "Balance c/d", p.close]].filter((x) => x[2]),
    [["1 Jan", "Balance b/d", p.open], ["31 Dec", "Credit purchases (balancing figure)", purchases]],
    { side: "cr", date: "1 Jan", details: "Balance b/d", amount: p.close },
  );
  const bankDr = [["1 Jan", "Balance b/d", s.bank.open], ["Various", "Customers", r.cust], ["Various", "Cash sales banked", s.cashSales], ...(s.income ?? []).map((i) => ["Various", i.label, i.received])];
  const bankCr = [["Various", "Suppliers", p.supp], ...(s.expenses ?? []).map((e) => ["Various", e.label, e.paid]), ...(added ? [["Various", "Purchase of non-current assets", added]] : []), ...(s.loanRepaid ? [["Various", "Loan repaid", s.loanRepaid]] : []),
    ...(s.partners ? s.partners.map((x) => ["Various", `Drawings: ${x.name}`, x.drawings]) : [["31 Dec", "Drawings (balancing figure)", drawings]]), ["31 Dec", "Balance c/d", s.bank.close]];
  const bankT = tAcct("Bank summary", bankDr, bankCr, { side: "dr", date: "1 Jan", details: "Balance b/d", amount: s.bank.close });
  const expRows = (s.expenses ?? []).map((e) => {
    const amt = r2(e.paid - (e.openAcc ?? 0) + (e.closeAcc ?? 0) + (e.openPre ?? 0) - (e.closePre ?? 0));
    return [e.label, e.paid, e.openAcc ? `(${fmt(e.openAcc)})` : "", e.closeAcc ?? "", e.openPre ?? "", e.closePre ? `(${fmt(e.closePre)})` : "", amt];
  });
  const expTable = table(["Expense", "Paid", "Opening accrual", "Closing accrual", "Opening prepayment", "Closing prepayment", "Expense for the year"], expRows, ["l", "r", "r", "r", "r", "r", "r"]);
  return { creditSales, purchases, sales, drawings, model, soa, lastCurrentFromSoa, bankClose: s.bank.close, recvT, payT, bankT, expTable, d };
}

/** Markdown stem tables describing the incomplete records of a spec (balances, receipts and payments, rules). */
export function incompleteStem(s, { bankClose = true } = {}) {
  const U = (n) => (n === undefined || n === null || n === 0 ? "" : n);
  const bal = [];
  for (const a of s.openNca) bal.push([`${a.label}: cost`, a.cost, ""], [`${a.label}: accumulated depreciation`, a.accDep, ""]);
  bal.push(["Inventory", s.openInv, s.closeInv], ["Trade receivables", s.recv.open, s.recv.close]);
  if (s.allowOpen) bal.push(["Allowance for irrecoverable debts", s.allowOpen, "to be calculated"]);
  bal.push(["Trade payables", s.pay.open, s.pay.close]);
  for (const e of s.expenses ?? []) {
    if (e.openAcc || e.closeAcc) bal.push([`${e.label} owing`, U(e.openAcc), U(e.closeAcc)]);
    if (e.openPre || e.closePre) bal.push([`${e.label} prepaid`, U(e.openPre), U(e.closePre)]);
  }
  for (const i of s.income ?? []) {
    if (i.openAcc || i.closeAcc) bal.push([`${i.label} accrued`, U(i.openAcc), U(i.closeAcc)]);
  }
  bal.push(["Bank", s.bank.open, bankClose && s.bank.close !== undefined ? s.bank.close : "to be calculated"]);
  if (s.loan) bal.push(["Loan", s.loan, s.loan]);
  const flows = [["Customers paid", s.recv.cust], ["Discount allowed", s.recv.disc], ["Returns inwards", s.recv.ret], ["Irrecoverable debts written off", s.recv.bad], ["Cash sales (all banked)", s.cashSales], ["Suppliers paid", s.pay.supp], ["Discount received", s.pay.disc], ["Returns outwards", s.pay.ret]].filter((x) => x[1]);
  for (const e of s.expenses ?? []) flows.push([`${e.label} paid`, e.paid]);
  for (const i of s.income ?? []) flows.push([`${i.label} received`, i.received]);
  for (const a of s.openNca) if (a.added) flows.push([`${a.label} bought and paid from the bank`, a.added]);
  if (s.partners) for (const p of s.partners) flows.push([`Drawings: ${p.name}`, p.drawings]);
  return `${table(["Balance", "1 January (US\\$)", "31 December (US\\$)"], bal, ["l", "r", "r"])}\n\n${table(["Transactions during the year", "US\\$"], flows, ["l", "r"])}`;
}
