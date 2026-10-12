// W2a helpers shared by the W2a slices and lesson generators (not part of the kit; imported by w2a- files only).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tAccount, table, check, sum, r2, fmt, appropriation } from "../lib.mjs";

export const ROOT = fileURLToPath(new URL("../../../content/subjects/accounting-a/", import.meta.url));
export const F = fmt;
export const US = "US\\$";

/** Shorthand MCQ: ok = [content, rationale]; bad = [[content, rationale] x3]. Key placed first (the build rebalances). Warns on a length cue. */
const cueWarnings = [];
export function mc(b, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("mc needs three distractors: " + rest.stem);
  const k = ok[0].length;
  const d = bad.map((x) => x[0].length);
  if (d.every((x) => k >= 1.3 * x && k >= x + 12)) cueWarnings.push(rest.stem.slice(0, 70));
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}
export const lengthWarnings = () => cueWarnings;

/** Writes a lesson file: front matter JSON + body. Reports words outside tables and block syntax. */
export function writeLesson(relPath, front, body) {
  const path = ROOT + "lessons/" + relPath;
  mkdirSync(dirname(path), { recursive: true });
  const text = "---\n" + JSON.stringify(front, null, 2) + "\n---\n" + body.trim() + "\n";
  writeFileSync(path, text);
  const words = body
    .split("\n")
    .filter((l) => !l.startsWith("|") && !l.startsWith(":::"))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  console.log(`${relPath}: ${words} words (excluding tables)`);
  if (words < 900 || words > 1600) console.log(`  !! word count outside 900-1,600`);
  return words;
}

/** T account with the closing balance entered explicitly on both sides, then the brought-down balance. bd: { side, date, details, amount }. */
export function tAcct(title, dr, cr, bd) {
  const md = tAccount(title, dr, cr, { balance: "auto" });
  if (!bd) return md;
  const cells = bd.side === "dr" ? [bd.date, bd.details, fmt(bd.amount), "", "", ""] : ["", "", "", bd.date, bd.details, fmt(bd.amount)];
  return md + "\n| " + cells.join(" | ") + " |";
}

const row = (cells) => `| ${cells.join(" | ")} |`;

/** Three-line bold heading. */
export const heading = (biz, name, when) => `**${biz}**  \n**${name}**  \n**${when}**`;

/** Table with no title; rows [label, ...vals]; null = blank row; strings pass through; numbers formatted. */
export function grid(rows, cols = ["US\\$", "US\\$"]) {
  const lines = [row(["", ...cols]), row(["---", ...cols.map(() => "---:")])];
  for (const r of rows) {
    if (!r) {
      lines.push(row(["", ...cols.map(() => "")]));
      continue;
    }
    const [label, ...vals] = r;
    lines.push(row([label, ...cols.map((_, i) => fmt(vals[i]))]));
  }
  return lines.join("\n");
}

/**
 * Statement of profit or loss of a sole trader / service business (columns: detail, total).
 * returns { md, revenue, cos, gp, income, expenses, profit }. expenses: [[label, amount]]; otherIncome: [[label, amount]].
 * trading false = service business (no cost of sales; revenue is the fees).
 */
export function spl({ biz, when, sales, salesLabel = "Revenue", returnsIn = 0, openInv = 0, purchases = 0, carriageIn = 0, returnsOut = 0, closingInv = 0, trading = true, otherIncome = [], expenses = [], expenseGroups = null, title = "Statement of profit or loss", partnerShare = null }) {
  const rows = [];
  const revenue = r2(sales - returnsIn);
  if (trading) {
    if (returnsIn) {
      rows.push(["Sales", null, sales], ["Less: returns inwards", null, -returnsIn], ["**Revenue**", null, revenue]);
    } else rows.push(["**Revenue**", null, revenue]);
  } else rows.push([`**${salesLabel}**`, null, revenue]);
  let cos = 0;
  let gp = revenue;
  if (trading) {
    cos = r2(openInv + purchases + carriageIn - returnsOut - closingInv);
    rows.push(["Opening inventory", openInv, null], ["Purchases", purchases, null]);
    if (carriageIn) rows.push(["Carriage inwards", carriageIn, null]);
    if (returnsOut) rows.push(["Less: returns outwards", -returnsOut, null]);
    rows.push(["Less: closing inventory", -closingInv, null], ["**Cost of sales**", null, -cos]);
    gp = r2(revenue - cos);
    rows.push(["**Gross profit**", null, gp]);
  }
  const income = sum(otherIncome.map((x) => x[1]));
  if (otherIncome.length) {
    rows.push(["Add: other income", null, null]);
    for (const [l, v] of otherIncome) rows.push([l, v, null]);
    rows.push(["**Total other income**", null, income]);
  }
  let exp;
  if (expenseGroups) {
    exp = 0;
    for (const g of expenseGroups) {
      const gt = sum(g.items.map((x) => x[1]));
      exp += gt;
      rows.push([`**${g.heading}**`, null, null]);
      for (const [l, v] of g.items) rows.push([l, v, null]);
      rows.push([`Total ${g.heading.toLowerCase()}`, null, -gt]);
    }
    exp = r2(exp);
  } else {
    exp = sum(expenses.map((x) => x[1]));
    rows.push(["Less: expenses", null, null]);
    for (const [l, v] of expenses) rows.push([l, v, null]);
    rows.push(["**Total expenses**", null, -exp]);
  }
  const profit = r2(gp + income - exp);
  rows.push([`**Profit for the year**`, null, profit]);
  return { md: heading(biz, title, when) + "\n\n" + grid(rows), revenue, cos, gp, income, expenses: exp, profit };
}

/**
 * Statement of financial position of a sole trader or partnership.
 * nca: [[label, cost, accumulatedDepreciation]] (carrying amount computed); ca / cl / ncl: [[label, amount]].
 * equityRows: raw rows [label, col2, col3] already built; equityTotal: the number the equity section must total.
 */
export function sfp({ biz, when, nca = [], ca = [], ncl = [], cl = [], equityRows, equityTotal, title = "Statement of financial position", equityHeading = "Capital", showEquityTotal = true }) {
  const rows = [["**Non-current assets**", null, null, null]];
  let cost = 0;
  let dep = 0;
  for (const [l, c, d] of nca) {
    rows.push([l, c, d ? -d : null, r2(c - (d || 0))]);
    cost += c;
    dep += d || 0;
  }
  const ncaTotal = r2(cost - dep);
  if (nca.length > 1) rows.push(["**Total non-current assets**", cost, -dep, ncaTotal]);
  const caTotal = sum(ca.map((x) => x[1]));
  if (ca.length) {
    rows.push(["**Current assets**", null, null, null]);
    for (const [l, v] of ca) rows.push([l, null, v, null]);
    rows.push(["**Total current assets**", null, null, caTotal]);
  }
  const assets = r2(ncaTotal + caTotal);
  rows.push(["**Total assets**", null, null, assets], null);
  rows.push([`**${equityHeading}**`, null, null, null]);
  for (const r of equityRows) rows.push([r[0], null, r[1], r[2]]);
  if (showEquityTotal) rows.push(["**Total equity**", null, null, equityTotal]);
  const nclTotal = sum(ncl.map((x) => x[1]));
  if (ncl.length) {
    rows.push(["**Non-current liabilities**", null, null, null]);
    for (const [l, v] of ncl) rows.push([l, null, v, null]);
    rows.push(["**Total non-current liabilities**", null, null, nclTotal]);
  }
  const clTotal = sum(cl.map((x) => x[1]));
  if (cl.length) {
    rows.push(["**Current liabilities**", null, null, null]);
    for (const [l, v] of cl) rows.push([l, null, v, null]);
    rows.push(["**Total current liabilities**", null, null, clTotal]);
  }
  const fundingTotal = r2(equityTotal + nclTotal + clTotal);
  rows.push(["**Total equity and liabilities**", null, null, fundingTotal]);
  check(`${biz}: statement of financial position balances`, assets, fundingTotal);
  return { md: heading(biz, title, when) + "\n\n" + grid(rows, ["Cost US\\$", "Depreciation US\\$", "US\\$"]), assets, funding: fundingTotal, ncaTotal, caTotal, clTotal, nclTotal };
}

/** Simple SFP grid with 3 columns used when there is no cost/depreciation split in equity rows: pass equityRows as [label, col2, col3]. */

/**
 * Extended trial balance. accounts: [{ name, kind: "PL" | "SFP", dr?, cr? }]; adjustments: [{ label, lines: [[name, dr, cr, kind?]] }] (kind needed for new accounts).
 * Returns { md, profit, plDr, plCr, sfpDr, sfpCr }.
 */
export function etb({ accounts, adjustments }) {
  const map = new Map();
  const order = [];
  const add = (name, kind, dr = 0, cr = 0) => {
    if (!map.has(name)) {
      map.set(name, { name, kind, tbDr: 0, tbCr: 0, adjDr: 0, adjCr: 0 });
      order.push(name);
    }
    return map.get(name);
  };
  for (const a of accounts) {
    const e = add(a.name, a.kind);
    e.tbDr += a.dr ?? 0;
    e.tbCr += a.cr ?? 0;
  }
  for (const adj of adjustments) {
    check(`etb adjustment ${adj.label}`, sum(adj.lines.map((l) => l[1])), sum(adj.lines.map((l) => l[2])));
    for (const [name, dr, cr, kind] of adj.lines) {
      const e = add(name, kind ?? map.get(name)?.kind);
      if (!e.kind) throw new Error("etb: kind needed for " + name);
      e.adjDr += dr ?? 0;
      e.adjCr += cr ?? 0;
    }
  }
  check("etb trial balance", sum(order.map((n) => map.get(n).tbDr)), sum(order.map((n) => map.get(n).tbCr)));
  check("etb adjustments", sum(order.map((n) => map.get(n).adjDr)), sum(order.map((n) => map.get(n).adjCr)));
  const out = [];
  let plDr = 0;
  let plCr = 0;
  let sfpDr = 0;
  let sfpCr = 0;
  for (const n of order) {
    const e = map.get(n);
    const net = r2(e.tbDr - e.tbCr + e.adjDr - e.adjCr);
    const dr = net > 0 ? net : null;
    const cr = net < 0 ? -net : null;
    if (e.kind === "PL") {
      plDr += dr ?? 0;
      plCr += cr ?? 0;
    } else {
      sfpDr += dr ?? 0;
      sfpCr += cr ?? 0;
    }
    out.push([e.name, e.tbDr || null, e.tbCr || null, e.adjDr || null, e.adjCr || null, e.kind === "PL" ? dr : null, e.kind === "PL" ? cr : null, e.kind === "SFP" ? dr : null, e.kind === "SFP" ? cr : null]);
  }
  const profit = r2(plCr - plDr);
  const lines = [row(["Account", "TB Dr", "TB Cr", "Adj Dr", "Adj Cr", "P/L Dr", "P/L Cr", "SFP Dr", "SFP Cr"]), row(["---", ...Array(8).fill("---:")])];
  for (const r of out) lines.push(row([r[0], ...r.slice(1).map((x) => fmt(x))]));
  const sum2 = (i) => fmt(sum(out.map((r) => r[i])));
  lines.push(row(["**Totals**", sum2(1), sum2(2), sum2(3), sum2(4), sum2(5), sum2(6), sum2(7), sum2(8)].map((x, i) => (i ? `**${x}**` : x))));
  // balancing figure
  const plDrTot = r2(plDr + (profit > 0 ? profit : 0));
  const plCrTot = r2(plCr + (profit < 0 ? -profit : 0));
  check("etb P/L columns", plDrTot, plCrTot);
  const sfpDrTot = r2(sfpDr + (profit < 0 ? -profit : 0));
  const sfpCrTot = r2(sfpCr + (profit > 0 ? profit : 0));
  check("etb SFP columns", sfpDrTot, sfpCrTot);
  lines.push(row([profit >= 0 ? "Profit for the year" : "Loss for the year", "", "", "", "", profit > 0 ? fmt(profit) : "", profit < 0 ? fmt(-profit) : "", profit < 0 ? fmt(-profit) : "", profit > 0 ? fmt(profit) : ""]));
  lines.push(row(["**Final totals**", "", "", "", "", `**${fmt(plDrTot)}**`, `**${fmt(plCrTot)}**`, `**${fmt(sfpDrTot)}**`, `**${fmt(sfpCrTot)}**`]));
  return { md: lines.join("\n"), profit };
}

/**
 * Columnar partners' account (capital or current). names: partner names; dr / cr: rows [details, ...amount per partner (null allowed)].
 * Balances are carried down per partner. Returns { md, closing } where closing[i] is the credit balance (positive) or debit (negative).
 */
export function colLedger(title, names, dr, cr, { cdDate = "31 Dec", bdDate = "1 Jan", totalLabel = "" } = {}) {
  const n = names.length;
  const D = dr.map((r) => [...r]);
  const C = cr.map((r) => [...r]);
  const closing = [];
  const cdD = ["Balance c/d", ...Array(n).fill(null)];
  const cdC = ["Balance c/d", ...Array(n).fill(null)];
  const bdD = ["Balance b/d", ...Array(n).fill(null)];
  const bdC = ["Balance b/d", ...Array(n).fill(null)];
  const totals = [];
  for (let i = 0; i < n; i += 1) {
    const td = sum(D.map((r) => r[i + 1]));
    const tc = sum(C.map((r) => r[i + 1]));
    const bal = r2(tc - td);
    closing.push(bal);
    if (bal > 0) {
      cdD[i + 1] = bal;
      bdC[i + 1] = bal;
    } else if (bal < 0) {
      cdC[i + 1] = -bal;
      bdD[i + 1] = -bal;
    }
    totals.push(Math.max(td, tc));
  }
  const hasCdD = cdD.slice(1).some((x) => x !== null);
  const hasCdC = cdC.slice(1).some((x) => x !== null);
  if (hasCdD) D.push([`${cdDate} ${cdD[0]}`, ...cdD.slice(1)]);
  if (hasCdC) C.push([`${cdDate} ${cdC[0]}`, ...cdC.slice(1)]);
  for (let i = 0; i < n; i += 1) check(`${title}: ${names[i]} sides`, sum(D.map((r) => r[i + 1])), sum(C.map((r) => r[i + 1])));
  const len = Math.max(D.length, C.length);
  const head = [...["Details", ...names.map((x) => x + " US\\$")], ...["Details", ...names.map((x) => x + " US\\$")]];
  const lines = [`**${title}**`, "", row(head), row(Array(head.length).fill(0).map((_, i) => (i % (n + 1) === 0 ? "---" : "---:")))];
  for (let i = 0; i < len; i += 1) {
    const a = D[i] ?? ["", ...Array(n).fill(null)];
    const c = C[i] ?? ["", ...Array(n).fill(null)];
    lines.push(row([a[0], ...a.slice(1).map((x) => fmt(x)), c[0], ...c.slice(1).map((x) => fmt(x))]));
  }
  const tot = totals.map((x) => `**${fmt(x)}**`);
  lines.push(row(["", ...tot, "", ...tot]));
  lines.push(row([`${bdDate} ${bdD[0]}`, ...bdD.slice(1).map((x) => fmt(x)), `${bdDate} ${bdC[0]}`, ...bdC.slice(1).map((x) => fmt(x))]));
  return { md: lines.join("\n"), closing };
}

/** Appropriation account in the standard two-column layout. partners as for appropriation(); returns { md, calc }. */
export function approTable({ biz, when, profit, partners, intro = "Profit for the year" }) {
  const calc = appropriation({ profit, partners });
  const rows = [[`**${intro}**`, null, profit]];
  const addSection = (heading_, key, sign, sourceFilter) => {
    const list = calc.lines.filter((l) => l[key]);
    if (!list.length) return;
    rows.push([heading_, null, null]);
    for (const l of list) rows.push([`${l.name}`, sign * l[key], null]);
  };
  const salaries = calc.lines.reduce((s, l) => s + l.salary, 0);
  const intCap = calc.lines.reduce((s, l) => s + l.interestOnCapital, 0);
  const intDraw = calc.lines.reduce((s, l) => s + l.interestOnDrawings, 0);
  if (intDraw) {
    rows.push(["Add: interest on drawings", null, null]);
    for (const l of calc.lines) if (l.interestOnDrawings) rows.push([l.name, l.interestOnDrawings, null]);
    rows.push(["", null, r2(intDraw)]);
  }
  const available = r2(profit + intDraw);
  if (salaries) {
    rows.push(["Less: partners' salaries", null, null]);
    for (const l of calc.lines) if (l.salary) rows.push([l.name, l.salary, null]);
    rows.push(["", null, -r2(salaries)]);
  }
  if (intCap) {
    rows.push(["Less: interest on capital", null, null]);
    for (const l of calc.lines) if (l.interestOnCapital) rows.push([l.name, l.interestOnCapital, null]);
    rows.push(["", null, -r2(intCap)]);
  }
  rows.push(["**Residual profit to be shared**", null, r2(calc.residual + 0)]);
  check(`${biz}: residual`, available - salaries - intCap, calc.residual);
  rows.push(["Share of residual profit", null, null]);
  for (const l of calc.lines) rows.push([l.name, l.residualShare, null]);
  rows.push(["", null, r2(calc.residual)]);
  return { md: heading(biz, "Appropriation account", when) + "\n\n" + grid(rows), calc, residual: calc.residual };
}

/**
 * Statement of affairs. assets / liabilities: [{ h: heading, items: [[label, amount]] }]. Capital = assets - liabilities.
 * Returns { md, assets, liabilities, capital }.
 */
export function affairs({ biz, when, assets, liabilities }) {
  const rows = [["**Assets**", null, null]];
  let aT = 0;
  for (const g of assets) {
    rows.push([`*${g.h}*`, null, null]);
    for (const [l, v] of g.items) rows.push([l, v, null]);
    const t = sum(g.items.map((x) => x[1]));
    aT += t;
    rows.push([`Total ${g.h.toLowerCase()}`, null, t]);
  }
  aT = r2(aT);
  rows.push(["**Total assets**", null, aT], ["**Liabilities**", null, null]);
  let lT = 0;
  for (const g of liabilities) {
    rows.push([`*${g.h}*`, null, null]);
    for (const [l, v] of g.items) rows.push([l, v, null]);
    const t = sum(g.items.map((x) => x[1]));
    lT += t;
    rows.push([`Total ${g.h.toLowerCase()}`, null, t]);
  }
  lT = r2(lT);
  rows.push(["**Total liabilities**", null, -lT]);
  const capital = r2(aT - lT);
  rows.push(["**Capital (net assets)**", null, capital]);
  return { md: heading(biz, "Statement of affairs", when) + "\n\n" + grid(rows), assets: aT, liabilities: lT, capital };
}

/** Profit from the change in capital (the accounting-equation method). */
export const profitFromCapital = ({ closing, opening, drawings, introduced = 0 }) => r2(closing - opening + drawings - introduced);
