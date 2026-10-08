// W4a helpers: partnerships, limited companies, clubs and societies. Built on lib.mjs check/statement/fmt; every
// builder throws when a total, balance or statement does not agree. Imported by the w4a- slices and the w4a- lesson
// table scripts. Not a slice (lives in tables/).
import { statement, fmt, sum, check, r2 } from "../lib.mjs";

export const U = String.raw`US\$`;
export { fmt, sum, check, r2 };
const row = (cells) => `| ${cells.join(" | ")} |`;

/** Plain Markdown table; numeric columns right-aligned. */
export function table(head, rows, align) {
  const al = align ?? head.map((_, i) => (rows.some((r) => typeof r[i] === "number") ? "r" : "l"));
  return [row(head), row(al.map((a) => (a === "r" ? "---:" : "---"))), ...rows.map((r) => row(r.map((c) => (typeof c === "number" ? fmt(c) : c ?? ""))))].join("\n");
}

/** Three-line bold heading (name; statement; date line) + statement table. */
export function headed(name, stmtName, dateLine, rows, opts) {
  return `**${name}**\n\n**${stmtName}**\n\n${statement(dateLine, rows, opts)}`;
}

/** Shares a residual amount in a ratio; throws unless the shares are exact to the cent and add up. */
export function share(amount, ratio) {
  const tot = ratio.reduce((s, x) => s + x, 0);
  const parts = ratio.map((x) => r2((amount * x) / tot));
  check("shares add up", sum(parts), amount);
  parts.forEach((p, i) => check(`share ${i} exact`, p * tot, amount * ratio[i]));
  return parts;
}

/**
 * Partnership appropriation account (vertical). d: { name, partners: [..], profit, iod?: [..], ioc?: [..],
 * salary?: [..], ratio: [..], profitLabel?, heading? (true → three-line heading) }.
 * Returns { md, residual, shares, iodTot, iocTot, salTot, credits: per partner (ioc + salary + share), debits (iod) }.
 */
export function appropriation(d) {
  const n = d.partners.length;
  const z = Array(n).fill(0);
  const iod = d.iod ?? z;
  const ioc = d.ioc ?? z;
  const sal = d.salary ?? z;
  const iodTot = sum(iod);
  const iocTot = sum(ioc);
  const salTot = sum(sal);
  const residual = r2(d.profit + iodTot - iocTot - salTot);
  const shares = share(residual, d.ratio);
  const rows = [];
  const checks = [["residual", residual, d.profit + iodTot - iocTot - salTot]];
  rows.push([d.profitLabel ?? "Profit for the year", null, d.profit]);
  const block = (title, vals, sign) => {
    const live = d.partners.map((p, i) => [p, vals[i]]).filter((x) => x[1]);
    if (!live.length) return;
    rows.push([title, null, null]);
    const tot = sum(live.map((x) => x[1]));
    live.forEach(([p, v], i) => rows.push([`${p}`, v, i === live.length - 1 ? sign * tot : null]));
  };
  if (iodTot) {
    block("Add: Interest on drawings", iod, 1);
    rows.push(["", null, r2(d.profit + iodTot)]);
  }
  block("Less: Interest on capital", ioc, -1);
  block("Less: Partners' salaries", sal, -1);
  rows.push([residual >= 0 ? "**Residual profit**" : "**Residual loss**", null, residual]);
  rows.push([`Share of ${residual >= 0 ? "profit" : "loss"} (${d.ratio.join(" : ")})`, null, null]);
  d.partners.forEach((p, i) => rows.push([p, shares[i], i === n - 1 ? residual : null]));
  checks.push(["shares", sum(shares), residual]);
  const title = d.title ?? "for the year ended 31 December 2025";
  const md = d.heading === false ? statement(d.stmtName ?? "Appropriation account", rows, { checks }) : headed(d.name, d.stmtName ?? "Appropriation account", title, rows, { checks });
  const credits = d.partners.map((_, i) => r2(ioc[i] + sal[i] + shares[i]));
  return { md, residual, shares, iodTot, iocTot, salTot, credits, debits: iod, iod, ioc, sal };
}

/**
 * Columnar (side-by-side) partners' account. dr / cr rows: [date, details, [amtA, amtB, ...]] (null = blank).
 * Balances c/d are added per partner on the correct side; totals per partner agree; b/d rows follow.
 * Returns { md, closing: signed per partner (+ = credit balance) }.
 */
export function columnar(title, partners, dr, cr, { cdDate = "31 Dec 2025", bdDate = "1 Jan 2026" } = {}) {
  const n = partners.length;
  const tot = (rows, i) => sum(rows.map((r) => r[2][i] ?? 0));
  const closing = partners.map((_, i) => r2(tot(cr, i) - tot(dr, i)));
  const D = dr.map((r) => [r[0], r[1], [...r[2]]]);
  const C = cr.map((r) => [r[0], r[1], [...r[2]]]);
  if (closing.some((c) => c > 0)) D.push([cdDate, "Balance c/d", closing.map((c) => (c > 0 ? c : null))]);
  if (closing.some((c) => c < 0)) C.push([cdDate, "Balance c/d", closing.map((c) => (c < 0 ? -c : null))]);
  const totals = partners.map((_, i) => {
    const a = tot(D, i);
    check(`${title} ${partners[i]} totals`, a, tot(C, i));
    return a;
  });
  const lines = [`**${title}**`, "", row(["Date", "Details", ...partners.map((p) => `${p} ${U}`), "Date", "Details", ...partners.map((p) => `${p} ${U}`)]), row(["---", "---", ...partners.map(() => "---:"), "---", "---", ...partners.map(() => "---:")])];
  const blank = ["", "", Array(n).fill(null)];
  const m = Math.max(D.length, C.length);
  for (let i = 0; i < m; i += 1) {
    const a = D[i] ?? blank;
    const b = C[i] ?? blank;
    lines.push(row([a[0], a[1], ...a[2].map(fmt), b[0], b[1], ...b[2].map(fmt)]));
  }
  lines.push(row(["", "", ...totals.map((t) => `**${fmt(t)}**`), "", "", ...totals.map((t) => `**${fmt(t)}**`)]));
  const bdDr = closing.map((c) => (c < 0 ? -c : null));
  const bdCr = closing.map((c) => (c > 0 ? c : null));
  const hasDr = bdDr.some((x) => x);
  const hasCr = bdCr.some((x) => x);
  if (hasDr || hasCr) lines.push(row([hasDr ? bdDate : "", hasDr ? "Balance b/d" : "", ...bdDr.map(fmt), hasCr ? bdDate : "", hasCr ? "Balance b/d" : "", ...bdCr.map(fmt)]));
  return { md: lines.join("\n"), closing };
}

/**
 * T account whose c/d lines are given explicitly (e.g. a subscriptions account with arrears AND advance at the end).
 * dr / cr: [date, details, amount]; bdDr / bdCr: rows printed under the totals. Throws unless the sides agree.
 */
export function tClosed(title, dr, cr, bdDr = [], bdCr = []) {
  const td = sum(dr.map((x) => x[2]));
  const tc = sum(cr.map((x) => x[2]));
  check(`${title} totals`, td, tc);
  const lines = [`**${title}**`, "", row(["Date", "Details", U, "Date", "Details", U]), row(["---", "---", "---:", "---", "---", "---:"])];
  const m = Math.max(dr.length, cr.length);
  for (let i = 0; i < m; i += 1) {
    const a = dr[i] ?? ["", "", null];
    const b = cr[i] ?? ["", "", null];
    lines.push(row([a[0], a[1], fmt(a[2]), b[0], b[1], fmt(b[2])]));
  }
  lines.push(row(["", "", `**${fmt(td)}**`, "", "", `**${fmt(tc)}**`]));
  const k = Math.max(bdDr.length, bdCr.length);
  for (let i = 0; i < k; i += 1) {
    const a = bdDr[i] ?? ["", "", null];
    const b = bdCr[i] ?? ["", "", null];
    lines.push(row([a[0], a[1], fmt(a[2]), b[0], b[1], fmt(b[2])]));
  }
  return lines.join("\n");
}

/**
 * Subscriptions account. s: { openArrears, openAdvance, received, closeArrears, closeAdvance, writtenOff?, year? }.
 * The income and expenditure figure is the balancing amount. Returns { md, ie }.
 */
export function subscriptions(s, { ieLabel = "Income and expenditure", title = "Subscriptions account" } = {}) {
  const y = s.year ?? 2025;
  const oA = s.openArrears ?? 0;
  const oV = s.openAdvance ?? 0;
  const cA = s.closeArrears ?? 0;
  const cV = s.closeAdvance ?? 0;
  const wo = s.writtenOff ?? 0;
  const ie = r2(oV + s.received + cA + wo - oA - cV);
  const dr = [];
  const cr = [];
  if (oA) dr.push([`1 Jan ${y}`, "Balance b/d (in arrears)", oA]);
  dr.push([`31 Dec ${y}`, ieLabel, ie]);
  if (cV) dr.push([`31 Dec ${y}`, "Balance c/d (in advance)", cV]);
  if (oV) cr.push([`1 Jan ${y}`, "Balance b/d (in advance)", oV]);
  cr.push([`31 Dec ${y}`, "Bank", s.received]);
  if (wo) cr.push([`31 Dec ${y}`, "Subscriptions written off", wo]);
  if (cA) cr.push([`31 Dec ${y}`, "Balance c/d (in arrears)", cA]);
  const md = tClosed(title, dr, cr, cA ? [[`1 Jan ${y + 1}`, "Balance b/d (in arrears)", cA]] : [], cV ? [[`1 Jan ${y + 1}`, "Balance b/d (in advance)", cV]] : []);
  return { md, ie };
}

/**
 * Trading account of a revenue-generating activity (refreshment bar, tuck shop, project). d: { name, title, sales,
 * openInv, purchases, closeInv, expenses: [[label, amt]] }. Returns { md, cos, gp, profit }.
 */
export function activity(d) {
  const avail = r2(d.openInv + d.purchases);
  const cos = r2(avail - d.closeInv);
  const gp = r2(d.sales - cos);
  const exp = d.expenses ?? [];
  const totExp = sum(exp.map((x) => x[1]));
  const profit = r2(gp - totExp);
  const rows = [["Sales", null, d.sales], ["Less: Cost of sales", null, null], ["Opening inventory", d.openInv, null], ["Purchases", d.purchases, null], ["", avail, null], ["Less: Closing inventory", -d.closeInv, -cos], ["**Gross profit**", null, gp]];
  if (exp.length) {
    rows.push(["Less: Expenses", null, null]);
    exp.forEach(([l, a], i) => rows.push([l, a, i === exp.length - 1 ? -totExp : null]));
    rows.push([profit >= 0 ? "**Profit transferred to income and expenditure**" : "**Loss transferred to income and expenditure**", null, profit]);
  }
  const md = headed(d.name, d.title, "for the year ended 31 December 2025", rows, { checks: [["cos", cos, avail - d.closeInv], ["gp", gp, d.sales - cos], ["profit", profit, gp - totExp]] });
  return { md, cos, gp, profit, avail };
}

/**
 * Income and expenditure account (vertical). d: { name, income: [[label, amt]], expenditure: [[label, amt]] }.
 * Returns { md, totInc, totExp, surplus } (negative surplus = deficit).
 */
export function incomeExpenditure(d) {
  const totInc = sum(d.income.map((x) => x[1]));
  const totExp = sum(d.expenditure.map((x) => x[1]));
  const surplus = r2(totInc - totExp);
  const rows = [["**Income**", null, null]];
  d.income.forEach(([l, a], i) => rows.push([l, a, i === d.income.length - 1 ? totInc : null]));
  rows.push(["**Less: Expenditure**", null, null]);
  d.expenditure.forEach(([l, a], i) => rows.push([l, a, i === d.expenditure.length - 1 ? -totExp : null]));
  rows.push([surplus >= 0 ? "**Surplus for the year**" : "**Deficit for the year**", null, surplus]);
  const md = headed(d.name, "Income and expenditure account", "for the year ended 31 December 2025", rows, { checks: [["surplus", surplus, totInc - totExp]] });
  return { md, totInc, totExp, surplus };
}

/**
 * Statement of financial position of a club. d: { name, nca: [[label, cost, acc|null]], ca: [[label, amt]],
 * cl: [[label, amt]], ncl?: [[label, amt]], openFund, surplus (negative = deficit), date? }.
 * Throws unless net assets = closing accumulated fund. Returns { md, totNbv, totCA, totCL, wc, netAssets, closing }.
 */
export function clubPosition(d) {
  const rows = [["**Non-current assets**", "Cost", "Accumulated depreciation", "Net book value"]];
  const nbv = d.nca.map(([, c, a]) => r2(c - (a ?? 0)));
  d.nca.forEach(([l, c, a], i) => rows.push([l, c, a, nbv[i]]));
  const totCost = sum(d.nca.map((x) => x[1]));
  const totAcc = sum(d.nca.map((x) => x[2] ?? 0));
  const totNbv = sum(nbv);
  if (d.nca.length > 1) rows.push(["", totCost, totAcc, totNbv]);
  const totCA = sum(d.ca.map((x) => x[1]));
  const totCL = sum(d.cl.map((x) => x[1]));
  const wc = r2(totCA - totCL);
  rows.push(["**Current assets**", null, null, null]);
  d.ca.forEach(([l, a], i) => rows.push([l, null, a, i === d.ca.length - 1 ? null : null]));
  rows.push(["", null, totCA, null]);
  rows.push(["**Less: Current liabilities**", null, null, null]);
  d.cl.forEach(([l, a], i) => rows.push([l, null, a, null]));
  rows.push(["", null, -totCL, null]);
  rows.push(["Net current assets (working capital)", null, null, wc]);
  let net = r2(totNbv + wc);
  rows.push(["", null, null, net]);
  const ncl = d.ncl ?? [];
  if (ncl.length) {
    rows.push(["**Less: Non-current liabilities**", null, null, null]);
    const t = sum(ncl.map((x) => x[1]));
    ncl.forEach(([l, a], i) => rows.push([l, null, null, i === ncl.length - 1 ? -t : null]));
    net = r2(net - t);
    rows.push(["**Net assets**", null, null, net]);
  }
  const closing = r2(d.openFund + d.surplus);
  rows.push(["**Accumulated fund**", null, null, null]);
  rows.push(["Balance at 1 January 2025", null, null, d.openFund]);
  rows.push([d.surplus >= 0 ? "Add: Surplus for the year" : "Less: Deficit for the year", null, null, d.surplus]);
  rows.push(["**Balance at 31 December 2025**", null, null, closing]);
  const md = headed(d.name, "Statement of financial position", d.date ?? "at 31 December 2025", rows, {
    cols: [U, U, U],
    checks: [["wc", wc, totCA - totCL], ["net = fund", net, closing]],
  });
  return { md, totNbv, totCost, totAcc, totCA, totCL, wc, netAssets: net, closing };
}

/** Statement of affairs for an opening accumulated fund (or capital). assets / liabilities: [[label, amt]]. */
export function fundAtDate(name, dateLine, assets, liabilities, { fundLabel = "Accumulated fund" } = {}) {
  const ta = sum(assets.map((x) => x[1]));
  const tl = sum(liabilities.map((x) => x[1]));
  const fund = r2(ta - tl);
  const rows = [["**Assets**", null, null]];
  assets.forEach(([l, a], i) => rows.push([l, a, i === assets.length - 1 ? ta : null]));
  rows.push(["**Less: Liabilities**", null, null]);
  liabilities.forEach(([l, a], i) => rows.push([l, a, i === liabilities.length - 1 ? -tl : null]));
  rows.push([`**${fundLabel}**`, null, fund]);
  const md = headed(name, "Statement of affairs", dateLine, rows, { checks: [["fund", fund, ta - tl]] });
  return { md, fund, ta, tl };
}

/**
 * Statement of changes in equity. cols: column names (e.g. ["Ordinary share capital", "General reserve",
 * "Retained earnings"]); open: opening balances; moves: [[label, [signed per column]]]. Adds a Total column and checks
 * every row and the closing balances. Returns { md, closing, totalOpen, totalClose }.
 */
export function soce(name, cols, open, moves, { year = 2025 } = {}) {
  const closing = cols.map((_, i) => r2(open[i] + sum(moves.map((m) => m[1][i] ?? 0))));
  const rowsT = [];
  const totalOpen = sum(open);
  rowsT.push([`Balance at 1 January ${year}`, ...open, totalOpen]);
  for (const [l, v] of moves) {
    const vv = cols.map((_, i) => v[i] ?? null);
    rowsT.push([l, ...vv, sum(vv)]);
  }
  const totalClose = sum(closing);
  rowsT.push([`**Balance at 31 December ${year}**`, ...closing, totalClose]);
  const checks = [["total close", totalClose, totalOpen + sum(moves.map((m) => sum(m[1].map((x) => x ?? 0))))]];
  const md = headed(name, "Statement of changes in equity", `for the year ended 31 December ${year}`, rowsT, { cols: [...cols.map((c) => `${c} ${U}`), `Total ${U}`], checks });
  return { md, closing, totalOpen, totalClose };
}

/**
 * Company income statement (statement of profit or loss). d: { name, revenue, cos, expenses: [[label, amt]],
 * finance: [[label, amt]], otherIncome?: [[label, amt]], terms: "ZIM" | "CAM" | "BOTH" }.
 * Returns { md, gp, totExp, pfo (profit from operations), fin, profit }.
 */
export function companyIncome(d) {
  const gp = r2(d.revenue - d.cos);
  const oi = d.otherIncome ?? [];
  const totOi = sum(oi.map((x) => x[1]));
  const totExp = sum(d.expenses.map((x) => x[1]));
  const pfo = r2(gp + totOi - totExp);
  const fin = sum((d.finance ?? []).map((x) => x[1]));
  const profit = r2(pfo - fin);
  const T = { ZIM: ["Income statement", "Net profit for the year"], CAM: ["Statement of profit or loss", "Profit for the year"], BOTH: ["Income statement (statement of profit or loss)", "Profit for the year"] }[d.terms ?? "BOTH"];
  const rows = [["Revenue", null, d.revenue], ["Less: Cost of sales", null, -d.cos], ["**Gross profit**", null, gp]];
  if (oi.length) {
    oi.forEach(([l, a]) => rows.push([`Add: ${l}`, null, a]));
    rows.push(["", null, r2(gp + totOi)]);
  }
  rows.push(["Less: Expenses", null, null]);
  d.expenses.forEach(([l, a], i) => rows.push([l, a, i === d.expenses.length - 1 ? -totExp : null]));
  rows.push(["**Profit from operations**", null, pfo]);
  (d.finance ?? []).forEach(([l, a]) => rows.push([`Less: ${l}`, null, -a]));
  rows.push([`**${T[1]}**`, null, profit]);
  const md = headed(d.name, T[0], "for the year ended 31 December 2025", rows, { checks: [["gp", gp, d.revenue - d.cos], ["pfo", pfo, gp + totOi - totExp], ["profit", profit, pfo - fin]] });
  return { md, gp, totExp, pfo, fin, profit };
}

/**
 * Company statement of financial position (assets = equity + liabilities). d: { name, nca: [[label, cost, acc|null]],
 * ca: [[label, amt]], equity: [[label, amt]], ncl: [[label, amt]], cl: [[label, amt]] }. Throws unless it balances.
 */
export function companyPosition(d) {
  const nbv = d.nca.map(([, c, a]) => r2(c - (a ?? 0)));
  const totNbv = sum(nbv);
  const totCA = sum(d.ca.map((x) => x[1]));
  const totAssets = r2(totNbv + totCA);
  const totEq = sum(d.equity.map((x) => x[1]));
  const totNcl = sum(d.ncl.map((x) => x[1]));
  const totCl = sum(d.cl.map((x) => x[1]));
  const totEL = r2(totEq + totNcl + totCl);
  const rows = [["**Assets**", null, null, null], ["**Non-current assets**", "Cost", "Accumulated depreciation", "Net book value"]];
  d.nca.forEach(([l, c, a], i) => rows.push([l, c, a, nbv[i]]));
  rows.push(["", sum(d.nca.map((x) => x[1])), sum(d.nca.map((x) => x[2] ?? 0)), totNbv]);
  rows.push(["**Current assets**", null, null, null]);
  d.ca.forEach(([l, a], i) => rows.push([l, null, a, i === d.ca.length - 1 ? totCA : null]));
  rows.push(["**Total assets**", null, null, totAssets]);
  rows.push(["**Equity and liabilities**", null, null, null]);
  rows.push(["**Equity**", null, null, null]);
  d.equity.forEach(([l, a], i) => rows.push([l, null, a, i === d.equity.length - 1 ? totEq : null]));
  rows.push(["**Non-current liabilities**", null, null, null]);
  d.ncl.forEach(([l, a], i) => rows.push([l, null, a, i === d.ncl.length - 1 ? totNcl : null]));
  rows.push(["**Current liabilities**", null, null, null]);
  d.cl.forEach(([l, a], i) => rows.push([l, null, a, i === d.cl.length - 1 ? totCl : null]));
  rows.push(["**Total equity and liabilities**", null, null, totEL]);
  const md = headed(d.name, "Statement of financial position", "at 31 December 2025", rows, { cols: [U, U, U], checks: [["balances", totAssets, totEL]] });
  return { md, totNbv, totCA, totAssets, totEq, totNcl, totCl, totEL };
}
