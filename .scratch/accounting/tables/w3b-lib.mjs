// W3b helpers (sole trader statements, departmental accounts, manufacturing accounts). Built on lib.mjs
// statement/check; every builder throws when a subtotal, total or the statement of financial position does not agree.
// Imported by the w3b- slices and the w3b- lesson table scripts. Not a slice (lives in tables/).
import { statement, fmt, sum, check, r2, trialBalance } from "../lib.mjs";

export const U = String.raw`US\$`;
const row = (cells) => `| ${cells.join(" | ")} |`;
export { fmt, sum, check, r2 };

/** Plain Markdown table; numeric columns right-aligned. */
export function table(head, rows, align) {
  const al = align ?? head.map((_, i) => (rows.some((r) => typeof r[i] === "number") ? "r" : "l"));
  return [row(head), row(al.map((a) => (a === "r" ? "---:" : "---"))), ...rows.map((r) => row(r.map((c) => (typeof c === "number" ? fmt(c) : c ?? ""))))].join("\n");
}

/** Three-line bold heading (name; statement; date line) + statement table. */
function headed(name, stmtName, dateLine, rows, opts) {
  const md = statement(dateLine, rows, opts);
  return `**${name}**\n\n**${stmtName}**\n\n${md}`;
}

export const TERMS = {
  ZIM: { is: "Income statement", np: "Net profit", nl: "Net loss", bd: "Bad debts", allow: "Provision for doubtful debts", incAllow: "Increase in provision for doubtful debts", decAllow: "Decrease in provision for doubtful debts", accrued: "Accrued expenses", prepaid: "Prepaid expenses", recv: "Trade receivables (debtors)", pay: "Trade payables (creditors)", accruedInc: "Accrued income", advanceInc: "Income received in advance" },
  CAM: { is: "Statement of profit or loss", np: "Profit for the year", nl: "Loss for the year", bd: "Irrecoverable debts", allow: "Allowance for irrecoverable debts", incAllow: "Increase in allowance for irrecoverable debts", decAllow: "Decrease in allowance for irrecoverable debts", accrued: "Other payables (accrued expenses)", prepaid: "Other receivables (prepaid expenses)", recv: "Trade receivables", pay: "Trade payables", accruedInc: "Other receivables (income due)", advanceInc: "Other payables (income in advance)" },
  BOTH: { is: "Income statement (statement of profit or loss)", np: "Profit for the year (net profit)", nl: "Loss for the year (net loss)", bd: "Irrecoverable (bad) debts", allow: "Allowance for irrecoverable debts", incAllow: "Increase in allowance for irrecoverable debts", decAllow: "Decrease in allowance for irrecoverable debts", accrued: "Other payables (accrued expenses)", prepaid: "Other receivables (prepaid expenses)", recv: "Trade receivables", pay: "Trade payables", accruedInc: "Other receivables (income due)", advanceInc: "Other payables (income in advance)" },
};

/**
 * Income statement of a trading (or service) sole trader.
 * d: { name, terms (TERMS.x), date ("31 December 2025"), revenue, salesReturns, openInv, cos: [[label, signed amt]]
 *      (e.g. ["Purchases", 30000], ["Add: Carriage inwards", 400], ["Less: Purchases returns", -500]), closeInv,
 *      otherIncome: [[label, amt]], expenses: [[label, amt]], service (no trading section; revenue = fees),
 *      revenueLabel, openInvLabel, closeInvLabel }
 * Returns { md, netRev, available, cos, gp, totOther, totExp, np }.
 */
export function incomeStatement(d) {
  const T = d.terms ?? TERMS.BOTH;
  const rows = [];
  const checks = [];
  const revLabel = d.revenueLabel ?? "Revenue";
  const sr = d.salesReturns ?? 0;
  const netRev = r2(d.revenue - sr);
  let gp;
  let cos = 0;
  let available = 0;
  if (d.service) {
    rows.push([revLabel, null, d.revenue]);
    gp = d.revenue;
  } else {
    if (sr) {
      rows.push([revLabel, d.revenue, null]);
      rows.push(["Less: Sales returns", -sr, netRev]);
    } else rows.push([revLabel, null, d.revenue]);
    rows.push(["Less: Cost of sales", null, null]);
    rows.push([d.openInvLabel ?? "Opening inventory", d.openInv, null]);
    for (const [l, a] of d.cos) rows.push([l, a, null]);
    available = r2(d.openInv + sum(d.cos.map((x) => x[1])));
    rows.push(["", available, null]);
    cos = r2(available - d.closeInv);
    rows.push([d.closeInvLabel ?? "Less: Closing inventory", -d.closeInv, -cos]);
    gp = r2(netRev - cos);
    rows.push([gp >= 0 ? "**Gross profit**" : "**Gross loss**", null, gp]);
    checks.push(["cos", cos, available - d.closeInv], ["gp", gp, netRev - cos]);
  }
  const oi = d.otherIncome ?? [];
  const totOther = sum(oi.map((x) => x[1]));
  let running = gp;
  if (oi.length) {
    rows.push(["Add: Other income", null, null]);
    if (oi.length === 1) rows.push([oi[0][0], null, oi[0][1]]);
    else oi.forEach(([l, a], i) => rows.push([l, a, i === oi.length - 1 ? totOther : null]));
    running = r2(gp + totOther);
    rows.push(["", null, running]);
  }
  rows.push(["Less: Expenses", null, null]);
  const totExp = sum(d.expenses.map((x) => x[1]));
  d.expenses.forEach(([l, a], i) => rows.push([l, a, i === d.expenses.length - 1 ? -totExp : null]));
  const np = r2(running - totExp);
  rows.push([np >= 0 ? `**${T.np}**` : `**${T.nl}**`, null, np]);
  checks.push(["np", np, gp + totOther - totExp]);
  const md = headed(d.name, T.is, `for the year ended ${d.date ?? "31 December 2025"}`, rows, { checks });
  return { md, netRev, available, cos, gp, totOther, totExp, np };
}

/**
 * Statement of financial position of a sole trader.
 * d: { name, terms, date, nca: [[label, cost, accDep|null]], ca: [[label, amt] | [label, gross, allowance]],
 *      cl: [[label, amt]], ncl: [[label, amt]], openCap, capIn (capital introduced), profit (signed), drawings,
 *      ncaHead ("Non-current assets") }
 * Throws unless net assets = closing capital. Returns { md, totNbv, totCA, totCL, wc, netAssets, closing }.
 */
export function financialPosition(d) {
  const T = d.terms ?? TERMS.BOTH;
  const rows = [];
  const checks = [];
  rows.push(["**Non-current assets**", "Cost", "Accumulated depreciation", "Net book value"]);
  const nbvs = d.nca.map(([l, c, a]) => r2(c - (a ?? 0)));
  d.nca.forEach(([l, c, a], i) => rows.push([l, c, a ?? null, nbvs[i]]));
  const totCost = sum(d.nca.map((x) => x[1]));
  const totAcc = sum(d.nca.map((x) => x[2] ?? 0));
  const totNbv = sum(nbvs);
  if (d.nca.length > 1) rows.push(["", totCost, totAcc, totNbv]);
  checks.push(["nbv", totNbv, totCost - totAcc]);
  rows.push(["**Current assets**", null, null, null]);
  let totCA = 0;
  for (const it of d.ca) {
    if (it.length === 3) {
      const [l, g, al] = it;
      const net = r2(g - al);
      rows.push([l, g, null, null]);
      rows.push([`Less: ${T.allow}`, -al, net, null]);
      totCA = r2(totCA + net);
    } else {
      rows.push([it[0], null, it[1], null]);
      totCA = r2(totCA + it[1]);
    }
  }
  rows.push(["", null, totCA, null]);
  rows.push(["**Current liabilities**", null, null, null]);
  const totCL = sum(d.cl.map((x) => x[1]));
  d.cl.forEach(([l, a], i) => rows.push([l, null, a, null]));
  rows.push(["", null, -totCL, null]);
  const wc = r2(totCA - totCL);
  rows.push([wc >= 0 ? "Net current assets (working capital)" : "Net current liabilities", null, null, wc]);
  let netAssets = r2(totNbv + wc);
  const ncl = d.ncl ?? [];
  if (ncl.length) {
    rows.push(["", null, null, netAssets]);
    rows.push(["**Non-current liabilities**", null, null, null]);
    for (const [l, a] of ncl) rows.push([l, null, null, -a]);
    netAssets = r2(netAssets - sum(ncl.map((x) => x[1])));
  }
  rows.push(["**Net assets**", null, null, netAssets]);
  rows.push(null);
  rows.push(["**Capital**", null, null, null]);
  rows.push(["Opening capital", null, null, d.openCap]);
  let cap = d.openCap;
  if (d.capIn) {
    rows.push(["Add: Capital introduced", null, null, d.capIn]);
    cap = r2(cap + d.capIn);
  }
  rows.push([d.profit >= 0 ? `Add: ${T.np}` : `Less: ${T.nl}`, null, null, d.profit]);
  cap = r2(cap + d.profit);
  rows.push(["", null, null, cap]);
  rows.push(["Less: Drawings", null, null, -d.drawings]);
  const closing = r2(cap - d.drawings);
  rows.push(["**Closing capital**", null, null, closing]);
  checks.push(["wc", wc, totCA - totCL], ["balance", netAssets, closing]);
  const md = headed(d.name, "Statement of financial position", `at ${d.date ?? "31 December 2025"}`, rows, { cols: [U, U, U], checks });
  return { md, totCost, totAcc, totNbv, totCA, totCL, wc, netAssets, closing };
}

/**
 * Full sole trader from a trial balance with year-end adjustments.
 * tb rows: [account, dr, cr, cls] where cls is one of:
 *  revenue, salesReturns, purchases, purchReturns, carriageIn, openInv, expense, income, nca (cost; key = account),
 *  accdep:<nca account>, receivables, allowance, badDebts (expense), current (other current asset, e.g. bank/cash),
 *  payables, cl (other current liability e.g. overdraft), loan (non-current liability), capital, drawings.
 * adj: { closeInv, dep: { [ncaAccount]: amount }, accrued: [[expense, amt]], prepaid: [[expense, amt]],
 *        incomeDue: [[income, amt]], incomeAdvance: [[income, amt]], writeOff: amt, allowance: new amount,
 *        goodsDrawn: amt (at cost), drawingsExp: [[expense, amt]] (private part of an expense) }
 * Returns { tb (md), is, sofp, figures }.
 */
export function soleTrader({ name, revenueLabel, terms = TERMS.BOTH, date = "31 December 2025", tbTitle, rows, adj = {}, depLabel = (a) => `Depreciation: ${a.toLowerCase()}`, tbOpts = {} }) {
  const tb = trialBalance(tbTitle ?? `${name}: Trial balance at ${date}`, rows.map(([a, dr, cr]) => [a, dr, cr]), tbOpts);
  const get = (cls) => rows.filter((r) => r[3] === cls);
  const bal = (r) => r2((r[1] ?? 0) - (r[2] ?? 0));
  const one = (cls) => sum(get(cls).map((r) => Math.abs(bal(r))));
  const revenue = one("revenue");
  const salesReturns = one("salesReturns");
  const purchases = one("purchases");
  const purchReturns = one("purchReturns");
  const carriageIn = one("carriageIn");
  const openInv = one("openInv");
  const goodsDrawn = adj.goodsDrawn ?? 0;
  const cosItems = [["Purchases", purchases]];
  if (carriageIn) cosItems.push(["Add: Carriage inwards", carriageIn]);
  if (purchReturns) cosItems.push(["Less: Purchases returns", -purchReturns]);
  if (goodsDrawn) cosItems.push(["Less: Goods taken for own use", -goodsDrawn]);
  // expenses
  const accrued = new Map(adj.accrued ?? []);
  const prepaid = new Map(adj.prepaid ?? []);
  const privatePart = new Map(adj.drawingsExp ?? []);
  const expenses = [];
  for (const r of get("expense")) {
    const a = r2(bal(r) + (accrued.get(r[0]) ?? 0) - (prepaid.get(r[0]) ?? 0) - (privatePart.get(r[0]) ?? 0));
    expenses.push([r[0], a]);
  }
  for (const k of [...accrued.keys(), ...prepaid.keys(), ...privatePart.keys()]) if (!get("expense").some((r) => r[0] === k)) throw new Error(`adjustment for unknown expense ${k}`);
  // irrecoverable debts and allowance
  const recvGross0 = one("receivables");
  const writeOff = adj.writeOff ?? 0;
  const recvGross = r2(recvGross0 - writeOff);
  const bdTb = one("badDebts");
  if (bdTb || writeOff) expenses.push([terms.bd, r2(bdTb + writeOff)]);
  const oldAllow = one("allowance");
  const newAllow = adj.allowance ?? oldAllow;
  const allowChange = r2(newAllow - oldAllow);
  const otherIncome = [];
  for (const r of get("income")) {
    const due = new Map(adj.incomeDue ?? []).get(r[0]) ?? 0;
    const adv = new Map(adj.incomeAdvance ?? []).get(r[0]) ?? 0;
    otherIncome.push([r[0], r2(-bal(r) + due - adv)]);
  }
  if (allowChange > 0) expenses.push([terms.incAllow, allowChange]);
  if (allowChange < 0) otherIncome.push([terms.decAllow, -allowChange]);
  // depreciation
  const dep = adj.dep ?? {};
  for (const [a, v] of Object.entries(dep)) {
    if (!get("nca").some((r) => r[0] === a)) throw new Error(`depreciation for unknown asset ${a}`);
    if (v) expenses.push([depLabel(a), v]);
  }
  const service = !purchases && !openInv;
  const is = incomeStatement({ name, terms, date, revenue, salesReturns, openInv, cos: cosItems, closeInv: adj.closeInv ?? 0, otherIncome, expenses, service, revenueLabel });
  // SOFP
  const nca = get("nca").map((r) => {
    const accRow = rows.find((x) => x[3] === `accdep:${r[0]}`);
    const acc = r2((accRow ? Math.abs(bal(accRow)) : 0) + (dep[r[0]] ?? 0));
    return [r[0], bal(r), acc || null];
  });
  const ca = [];
  if (adj.closeInv) ca.push(["Inventory", adj.closeInv]);
  if (recvGross) ca.push(newAllow ? [terms.recv, recvGross, newAllow] : [terms.recv, recvGross]);
  const prepTot = sum([...(adj.prepaid ?? []).map((x) => x[1])]);
  if (prepTot) ca.push([terms.prepaid, prepTot]);
  const dueTot = sum((adj.incomeDue ?? []).map((x) => x[1]));
  if (dueTot) ca.push([terms.accruedInc, dueTot]);
  const cl = [];
  for (const r of get("current")) {
    const b = bal(r);
    if (b >= 0) ca.push([r[0], b]);
    else cl.push([r[0], -b]);
  }
  const payables = one("payables");
  cl.unshift([terms.pay, payables]);
  const accTot = sum((adj.accrued ?? []).map((x) => x[1]));
  if (accTot) cl.push([terms.accrued, accTot]);
  const advTot = sum((adj.incomeAdvance ?? []).map((x) => x[1]));
  if (advTot) cl.push([terms.advanceInc, advTot]);
  for (const r of get("cl")) cl.push([r[0], Math.abs(bal(r))]);
  const ncl = get("loan").map((r) => [r[0], Math.abs(bal(r))]);
  const drawings = r2(one("drawings") + goodsDrawn + sum((adj.drawingsExp ?? []).map((x) => x[1])));
  if (process.env.W3B_DEBUG) console.log(JSON.stringify({ np: is.np, nca, ca, cl, ncl, cap: one("capital"), drawings }));
  const sofp = financialPosition({ name, terms, date, nca, ca, cl, ncl, openCap: one("capital"), profit: is.np, drawings });
  return { tb, is, sofp, figures: { revenue, salesReturns, purchases, purchReturns, carriageIn, openInv, expenses, otherIncome, recvGross, newAllow, allowChange, drawings, nca, ca, cl, ncl } };
}

/**
 * Manufacturing account. d: { name, date, rawOpen, rawPurch, rawCarriage, rawReturns, rawClose, directLabour,
 * directExp: [[label, amt]], overheads: [[label, amt]], wipOpen, wipClose }.
 * Returns { md, consumed, prime, totOH, factoryCost, production }.
 */
export function manufacturing(d) {
  const rows = [];
  const checks = [];
  rows.push(["Opening inventory of raw materials", d.rawOpen, null]);
  rows.push(["Add: Purchases of raw materials", d.rawPurch, null]);
  if (d.rawCarriage) rows.push(["Add: Carriage inwards on raw materials", d.rawCarriage, null]);
  if (d.rawReturns) rows.push(["Less: Returns of raw materials", -d.rawReturns, null]);
  const avail = r2(d.rawOpen + d.rawPurch + (d.rawCarriage ?? 0) - (d.rawReturns ?? 0));
  rows.push(["", avail, null]);
  const consumed = r2(avail - d.rawClose);
  rows.push(["Less: Closing inventory of raw materials", -d.rawClose, null]);
  rows.push(["Cost of raw materials consumed", null, consumed]);
  rows.push(["Direct labour (factory wages)", null, d.directLabour]);
  for (const [l, a] of d.directExp ?? []) rows.push([l, null, a]);
  const prime = r2(consumed + d.directLabour + sum((d.directExp ?? []).map((x) => x[1])));
  rows.push(["**Prime cost**", null, prime]);
  rows.push(["Add: Factory overheads", null, null]);
  const totOH = sum(d.overheads.map((x) => x[1]));
  d.overheads.forEach(([l, a], i) => rows.push([l, a, i === d.overheads.length - 1 ? totOH : null]));
  const factoryCost = r2(prime + totOH);
  rows.push(["Total factory cost", null, factoryCost]);
  rows.push(["Add: Opening work in progress", null, d.wipOpen]);
  const sub = r2(factoryCost + d.wipOpen);
  rows.push(["", null, sub]);
  rows.push(["Less: Closing work in progress", null, -d.wipClose]);
  const production = r2(sub - d.wipClose);
  rows.push(["**Production cost of goods completed**", null, production]);
  checks.push(["consumed", consumed, avail - d.rawClose], ["production", production, prime + totOH + d.wipOpen - d.wipClose]);
  const md = headed(d.name, "Manufacturing account", `for the year ended ${d.date ?? "31 December 2025"}`, rows, { checks });
  return { md, avail, consumed, prime, totOH, factoryCost, production };
}

/** Apportion a total over weights; amounts must come out to whole dollars (throws otherwise). */
export function apportion(total, weights) {
  const w = sum(weights);
  const parts = weights.map((x) => r2((total * x) / w));
  check(`apportion ${total}`, sum(parts), total);
  for (const p of parts) if (!Number.isInteger(p)) throw new Error(`apportion ${total} by ${weights}: ${p} is not whole`);
  return parts;
}

/**
 * Departmental (columnar) income statement. d: { name, date, depts: ["Hardware", "Paint"], revenue: [..],
 * openInv: [..], purchases: [..], closeInv: [..], expenses: [[label, [amounts per dept]]] }.
 * Returns { md, gp: [..], np: [..], cos: [..], totals }.
 */
export function departmental(d) {
  const n = d.depts.length;
  const tot = (xs) => sum(xs);
  const withT = (xs) => [...xs, tot(xs)];
  const rows = [];
  const checks = [];
  rows.push(["Revenue", ...withT(d.revenue)]);
  rows.push(["Less: Cost of sales", ...Array(n + 1).fill(null)]);
  rows.push(["Opening inventory", ...withT(d.openInv)]);
  rows.push(["Add: Purchases", ...withT(d.purchases)]);
  const avail = d.depts.map((_, i) => r2(d.openInv[i] + d.purchases[i]));
  rows.push(["", ...withT(avail)]);
  rows.push(["Less: Closing inventory", ...withT(d.closeInv).map((x) => -x)]);
  const cos = d.depts.map((_, i) => r2(avail[i] - d.closeInv[i]));
  rows.push(["Cost of sales", ...withT(cos).map((x) => -x)]);
  const gp = d.depts.map((_, i) => r2(d.revenue[i] - cos[i]));
  rows.push(["**Gross profit**", ...withT(gp)]);
  rows.push(["Less: Expenses", ...Array(n + 1).fill(null)]);
  for (const [l, xs] of d.expenses) rows.push([l, ...withT(xs)]);
  const te = d.depts.map((_, i) => sum(d.expenses.map((e) => e[1][i])));
  rows.push(["Total expenses", ...withT(te).map((x) => -x)]);
  const np = d.depts.map((_, i) => r2(gp[i] - te[i]));
  rows.push([np.some((x) => x < 0) ? "**Net profit / (loss)**" : "**Net profit**", ...withT(np)]);
  checks.push(["np total", tot(np), tot(d.revenue) - tot(cos) - tot(te)]);
  const md = headed(d.name, d.title ?? "Departmental income statement", `for the year ended ${d.date ?? "31 December 2025"}`, rows, { cols: [...d.depts.map((x) => `${x} ${U}`), `Total ${U}`], checks });
  return { md, avail, cos, gp, te, np, totals: { revenue: tot(d.revenue), cos: tot(cos), gp: tot(gp), te: tot(te), np: tot(np) } };
}
