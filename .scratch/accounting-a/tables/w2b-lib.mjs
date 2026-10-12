// Shared helpers for the W2b lessons and slices (not imported by the build unless a slice imports it).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { check, fmt, r2, sum, tAccount, statement } from "../lib.mjs";

export const U = "US\\$";
/** Multiple choice with the correct option written first: right = [content, rationale]; wrong = [[content, rationale], ...]. The build rebalances the key positions. */
export const mc = (b, o) => b.mcq({ ...o, options: [o.right, ...o.wrong], answer: "A" });

/** Writes a lesson file: front matter (JSON) + body. Reports the prose word count (tables, block markers excluded). */
export function writeLesson(rel, front, body) {
  const path = `content/subjects/accounting-a/lessons/${rel}.md`;
  mkdirSync(dirname(path), { recursive: true });
  const text = `---\n${JSON.stringify({ ...front, level: "core" }, null, 2)}\n---\n${body.trim()}\n`;
  writeFileSync(path, text);
  const prose = body.split("\n").filter((l) => !l.trim().startsWith("|") && !l.startsWith(":::")).join(" ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  const workedEx = (body.match(/:::worked-solution/g) ?? []).length;
  console.log(`${rel}: ${words} prose words, ${workedEx} worked solutions`);
  if (words < 900 || words > 1600) console.log(`  WARNING word count outside 900-1600`);
}

const row = (cells) => `| ${cells.join(" | ")} |`;

/**
 * Columnar two-sided account (partners' capital accounts ...). names: column names.
 * dr / cr: [[label, [amount per name or null]], ...]. Throws unless each name's debit and credit totals agree.
 */
export function colT(title, names, dr, cr) {
  const tot = (rows, i) => sum(rows.map((r) => r[1][i] ?? 0));
  names.forEach((n, i) => check(`${title}: ${n} totals`, tot(dr, i), tot(cr, i)));
  const n = Math.max(dr.length, cr.length);
  const head = ["Details", ...names.map((x) => `${x} ${U}`), "Details", ...names.map((x) => `${x} ${U}`)];
  const lines = [`**${title}**`, "", row(head), row(["---", ...names.map(() => "---:"), "---", ...names.map(() => "---:")])];
  const cells = (r) => (r ? [r[0], ...names.map((_, i) => fmt(r[1][i]))] : ["", ...names.map(() => "")]);
  for (let i = 0; i < n; i += 1) lines.push(row([...cells(dr[i]), ...cells(cr[i])]));
  lines.push(row(["", ...names.map((_, i) => `**${fmt(tot(dr, i))}**`), "", ...names.map((_, i) => `**${fmt(tot(cr, i))}**`)]));
  return lines.join("\n");
}

/**
 * Dissolution of a partnership (profit-sharing ratio for the result and for any deficiency not paid in).
 * partners [{ name, share, capital, loan? }]; assets [{ name, book, proceeds?, takenBy?, value? }] (non-cash assets: proceeds = cash
 * received, or takenBy a partner at value); liabilities [{ name, book, paid }]; bank0; expenses; payIn { name: cash }.
 * Returns the numbers and the Markdown of the realisation, capital and bank accounts; throws unless the bank account ends at nil.
 */
export function dissolve({ date = "31 Dec 2025", partners, assets, liabilities = [], bank0 = 0, expenses = 0, payIn = {}, realTitle = "Realisation account" }) {
  const N = partners.length;
  const shareTotal = sum(partners.map((p) => p.share));
  const assetsBook = sum(assets.map((a) => a.book));
  const paid = sum(liabilities.map((l) => l.paid));
  const liabBook = sum(liabilities.map((l) => l.book));
  const proceeds = sum(assets.map((a) => (a.takenBy ? 0 : a.proceeds ?? 0)));
  const taken = partners.map((p) => sum(assets.filter((a) => a.takenBy === p.name).map((a) => a.value)));
  const result = r2(liabBook + proceeds + sum(taken) - (assetsBook + paid + expenses)); // + profit, - loss
  const resShare = partners.map((p) => r2((result * p.share) / shareTotal));
  resShare[N - 1] = r2(resShare[N - 1] + (result - sum(resShare)));
  const payInArr = partners.map((p) => payIn[p.name] ?? 0);
  const pre = partners.map((p, i) => r2(p.capital + resShare[i] - taken[i] + payInArr[i]));
  const defic = pre.map((v) => (v < 0 ? -v : 0));
  const absorbed = partners.map(() => 0);
  partners.forEach((p, i) => {
    if (!defic[i]) return;
    const ot = sum(partners.map((q, j) => (j === i ? 0 : q.share)));
    partners.forEach((q, j) => {
      if (j !== i) absorbed[j] = r2(absorbed[j] + (defic[i] * q.share) / ot);
    });
  });
  const lastAbs = absorbed.map((x, j) => (x > 0 ? j : -1)).filter((j) => j >= 0).pop();
  if (lastAbs !== undefined) absorbed[lastAbs] = r2(absorbed[lastAbs] + (sum(defic) - sum(absorbed)));
  const final = partners.map((p, i) => r2(pre[i] + defic[i] - absorbed[i]));
  final.forEach((v, i) => { if (v < -0.005) throw new Error(`dissolve: ${partners[i].name} still in deficiency`); });
  const loans = partners.map((p) => p.loan ?? 0);
  // realisation account
  const realDr = [[date, "Assets transferred (book value)", assetsBook]];
  if (paid) realDr.push([date, "Bank: liabilities settled", paid]);
  if (expenses) realDr.push([date, "Bank: expenses of realisation", expenses]);
  if (result > 0) partners.forEach((p, i) => realDr.push([date, `Profit to ${p.name}'s capital`, resShare[i]]));
  const realCr = [[date, "Liabilities transferred (book value)", liabBook]];
  if (proceeds) realCr.push([date, "Bank: proceeds of assets sold", proceeds]);
  partners.forEach((p, i) => { if (taken[i]) realCr.push([date, `${p.name}'s capital: assets taken over`, taken[i]]); });
  if (result < 0) partners.forEach((p, i) => realCr.push([date, `Loss to ${p.name}'s capital`, -resShare[i]]));
  const realMd = tAccount(realTitle, realDr, realCr);
  // partners' capital accounts
  const names = partners.map((p) => p.name);
  const capDr = [];
  const capCr = [["Balance b/d", partners.map((p) => p.capital)]];
  if (taken.some((x) => x)) capDr.push(["Realisation: assets taken over", taken.map((x) => x || null)]);
  if (result < 0) capDr.push(["Realisation: loss", resShare.map((x) => -x)]);
  if (absorbed.some((x) => x)) capDr.push(["Share of the deficiency", absorbed.map((x) => x || null)]);
  capDr.push(["Bank: final payment", final.map((x) => x || null)]);
  if (result > 0) capCr.push(["Realisation: profit", resShare]);
  if (sum(payInArr)) capCr.push(["Bank: cash paid in", payInArr.map((x) => x || null)]);
  if (defic.some((x) => x)) capCr.push(["Deficiency borne by the others", defic.map((x) => x || null)]);
  const capMd = colT("Partners' capital accounts", names, capDr, capCr);
  // bank account
  const bankDr = [[date, "Balance b/d", bank0]];
  if (proceeds) bankDr.push([date, "Realisation: proceeds", proceeds]);
  if (sum(payInArr)) bankDr.push([date, "Partners: cash paid in", sum(payInArr)]);
  const bankCr = [];
  if (paid) bankCr.push([date, "Realisation: liabilities settled", paid]);
  if (expenses) bankCr.push([date, "Realisation: expenses", expenses]);
  partners.forEach((p, i) => { if (loans[i]) bankCr.push([date, `${p.name}'s loan repaid`, loans[i]]); });
  partners.forEach((p, i) => { if (final[i]) bankCr.push([date, `${p.name}'s capital: final payment`, final[i]]); });
  check("dissolve: bank ends at nil", sum(bankDr.map((x) => x[2])), sum(bankCr.map((x) => x[2])));
  const bankMd = tAccount("Bank account", bankDr, bankCr);
  return { result, resShare, taken, final, pre, defic, absorbed, assetsBook, liabBook, paid, proceeds, realMd, capMd, bankMd };
}

/**
 * Closing the books of a business taken over by a company (vendor's books).
 * partners [{ name, share, capital }] (one for a sole trader); assets / liabilities [{ name, book }] taken over (the bank stays);
 * bank0 kept by the vendor; consideration { cash, shares: { n, price }, notes }. Shares and loan notes go to the partners in the
 * profit-sharing ratio; cash is the balancing payment. Throws unless the bank account ends at nil.
 */
export function vendorBooks({ date = "31 Dec 2025", buyer, partners, assets, liabilities = [], bank0 = 0, consideration }) {
  const N = partners.length;
  const st = sum(partners.map((p) => p.share));
  const assetsBook = sum(assets.map((a) => a.book));
  const liabBook = sum(liabilities.map((l) => l.book));
  const netBook = r2(assetsBook - liabBook);
  const shareVal = r2((consideration.shares?.n ?? 0) * (consideration.shares?.price ?? 0));
  const cash = consideration.cash ?? 0;
  const notes = consideration.notes ?? 0;
  const consid = r2(cash + shareVal + notes);
  check("vendorBooks: capitals equal net assets plus bank", sum(partners.map((p) => p.capital)), netBook + bank0);
  const result = r2(consid - netBook);
  const resShare = partners.map((p) => r2((result * p.share) / st));
  resShare[N - 1] = r2(resShare[N - 1] + (result - sum(resShare)));
  const shAlloc = partners.map((p) => r2((shareVal * p.share) / st));
  const noteAlloc = partners.map((p) => r2((notes * p.share) / st));
  shAlloc[N - 1] = r2(shAlloc[N - 1] + (shareVal - sum(shAlloc)));
  noteAlloc[N - 1] = r2(noteAlloc[N - 1] + (notes - sum(noteAlloc)));
  const closing = partners.map((p, i) => r2(p.capital + resShare[i]));
  const cashPay = partners.map((_, i) => r2(closing[i] - shAlloc[i] - noteAlloc[i]));
  cashPay.forEach((v) => { if (v < -0.005) throw new Error("vendorBooks: negative cash payment"); });
  const realDr = [[date, "Assets transferred (book value)", assetsBook]];
  if (result > 0) partners.forEach((p, i) => realDr.push([date, `Profit to ${p.name}'s capital`, resShare[i]]));
  const realCr = [[date, "Liabilities transferred (book value)", liabBook], [date, `${buyer}: purchase consideration`, consid]];
  if (result < 0) partners.forEach((p, i) => realCr.push([date, `Loss to ${p.name}'s capital`, -resShare[i]]));
  const realMd = tAccount("Realisation account", realDr, realCr);
  const buyerDr = [[date, "Realisation: purchase consideration", consid]];
  const buyerCr = [];
  if (cash) buyerCr.push([date, "Bank", cash]);
  if (shareVal) buyerCr.push([date, `Investment in ${buyer} shares`, shareVal]);
  if (notes) buyerCr.push([date, `Loan notes in ${buyer}`, notes]);
  const buyerMd = tAccount(`${buyer} account`, buyerDr, buyerCr);
  const names = partners.map((p) => p.name);
  const capDr = [];
  if (shareVal) capDr.push([`Investment in ${buyer} shares`, shAlloc]);
  if (notes) capDr.push([`Loan notes in ${buyer}`, noteAlloc]);
  capDr.push(["Bank: cash payment", cashPay.map((x) => x || null)]);
  const capCr = [["Balance b/d", partners.map((p) => p.capital)]];
  if (result > 0) capCr.push(["Realisation: profit", resShare]);
  const capMd = colT("Capital accounts", names, capDr, capCr);
  const bankDr = [[date, "Balance b/d", bank0]];
  if (cash) bankDr.push([date, buyer, cash]);
  const bankCr = partners.map((p, i) => [date, `${p.name}: cash payment`, cashPay[i]]).filter((x) => x[2]);
  check("vendorBooks: bank ends at nil", sum(bankDr.map((x) => x[2])), sum(bankCr.map((x) => x[2])));
  const bankMd = tAccount("Bank account", bankDr, bankCr);
  return { netBook, consid, shareVal, result, resShare, shAlloc, noteAlloc, closing, cashPay, assetsBook, liabBook, realMd, buyerMd, capMd, bankMd };
}

/**
 * Manufacturing account (IAS 1 style heading is added by the caller through `title`).
 * d: { rmOpen, rmPurch, carriageIn = 0, rmReturns = 0, rmClose, labour, directExp: [[label, amount]], overheads: [[label, amount]], wipOpen = 0, wipClose = 0 }.
 * Returns { md, rmUsed, prime, foh, factoryCost, cop }.
 */
export function mfg(d, { title = "Manufacturing account for the year ended 31 December 2025" } = {}) {
  const carriage = d.carriageIn ?? 0;
  const ret = d.rmReturns ?? 0;
  const rmUsed = r2(d.rmOpen + d.rmPurch + carriage - ret - d.rmClose);
  const directExp = d.directExp ?? [];
  const labour = d.labour;
  const de = sum(directExp.map((x) => x[1]));
  const prime = r2(rmUsed + labour + de);
  const foh = sum(d.overheads.map((x) => x[1]));
  const factoryCost = r2(prime + foh);
  const wipO = d.wipOpen ?? 0;
  const wipC = d.wipClose ?? 0;
  const cop = r2(factoryCost + wipO - wipC);
  const rows = [["Opening inventory of raw materials", null, d.rmOpen], ["Purchases of raw materials", null, d.rmPurch]];
  if (carriage) rows.push(["Carriage inwards", null, carriage]);
  if (ret) rows.push(["Less returns outwards", null, -ret]);
  rows.push(["Less closing inventory of raw materials", null, -d.rmClose]);
  rows.push(["**Cost of raw materials consumed**", null, rmUsed]);
  rows.push(["Direct labour (manufacturing wages)", null, labour]);
  for (const [l, a] of directExp) rows.push([l, null, a]);
  rows.push(["**Prime cost**", null, prime]);
  rows.push(["Factory overheads", null, null]);
  for (const [l, a] of d.overheads) rows.push([l, a, null]);
  rows.push(["Total factory overheads", null, foh]);
  rows.push(["**Factory cost**", null, factoryCost]);
  if (wipO || wipC) {
    rows.push(["Add opening work in progress", null, wipO]);
    rows.push(["Less closing work in progress", null, -wipC]);
  }
  rows.push(["**Cost of production (transferred to the trading account)**", null, cop]);
  const md = statement(title, rows, { cols: [U, U], checks: [["cost of raw materials", rmUsed, d.rmOpen + d.rmPurch + carriage - ret - d.rmClose], ["prime cost", prime, rmUsed + labour + de], ["cost of production", cop, factoryCost + wipO - wipC]] });
  return { md, rmUsed, prime, foh, factoryCost, cop };
}

/**
 * Transfer of finished goods from the factory to the trading account at cost plus a mark-up (market value), with the
 * provision for unrealised profit in closing finished goods. Opening and closing finished goods are valued at the transfer price.
 * x: { name, cop, markupPct, sales, fgOpen, fgClose, expenses (other expenses below gross profit), returnsIn = 0 }.
 */
export function transfer(x) {
  const profit = r2((x.cop * x.markupPct) / 100);
  const transferValue = r2(x.cop + profit);
  const frac = x.markupPct / (100 + x.markupPct);
  const provOpen = r2(x.fgOpen * frac);
  const provClose = r2(x.fgClose * frac);
  const provChange = r2(provClose - provOpen); // + increase (expense), - decrease (income)
  const cos = r2(x.fgOpen + transferValue - x.fgClose);
  const gp = r2(x.sales - cos);
  const profitBeforeExp = r2(gp + profit - provChange);
  const net = r2(profitBeforeExp - x.expenses);
  const mfgMd = statement(`${x.name}: extract from the manufacturing account`, [
    ["Cost of production", null, x.cop], [`Manufacturing profit (${x.markupPct}% mark-up on cost of production)`, null, profit], ["**Value of goods transferred to the trading account**", null, transferValue],
  ], { cols: [U, U], checks: [["transfer", transferValue, x.cop + profit]] });
  const tradMd = statement(`${x.name}: trading account for the year ended 31 December 2025`, [
    ["Sales", null, x.sales], ["Opening inventory of finished goods (at transfer price)", x.fgOpen, null], ["Goods transferred from the factory (at transfer price)", transferValue, null],
    ["Less closing inventory of finished goods (at transfer price)", -x.fgClose, null], ["Cost of sales", null, -cos], ["**Gross profit**", null, gp],
  ], { cols: [U, U], checks: [["gp", gp, x.sales - cos]] });
  const provRows = [["Provision needed at the end of the year", provClose], ["Provision at the start of the year", provOpen], [provChange >= 0 ? "**Increase in provision (charged against profit)**" : "**Decrease in provision (added to profit)**", Math.abs(provChange)]];
  const provMd = statement(`${x.name}: provision for unrealised profit`, provRows, { cols: [U], checks: [["change", Math.abs(provChange), Math.abs(provClose - provOpen)]] });
  const plRows = [["Gross profit", gp], ["Add manufacturing profit", profit], [provChange >= 0 ? "Less increase in provision for unrealised profit" : "Add decrease in provision for unrealised profit", provChange >= 0 ? -provChange : -provChange], ["Total", profitBeforeExp], ["Less other expenses", -x.expenses], ["**Profit for the year**", net]];
  const plMd = statement(`${x.name}: extract from the statement of profit or loss`, plRows, { cols: [U], checks: [["net", net, gp + profit - provChange - x.expenses]] });
  return { profit, transferValue, provOpen, provClose, provChange, cos, gp, profitBeforeExp, net, mfgMd, tradMd, provMd, plMd };
}

/**
 * Subscriptions account of a club. o: { arrears, advance } at the start, c: { arrears, advance } at the end, received (cash), writeOff (irrecoverable).
 * Income for the year (balancing figure) = received + writeOff + closing arrears + opening advance - opening arrears - closing advance.
 */
export function subs({ date0 = "1 Jan 2025", date1 = "31 Dec 2025", o, c, received, writeOff = 0, title = "Subscriptions account" }) {
  const income = r2(received + writeOff + c.arrears + o.advance - o.arrears - c.advance);
  const dr = [[date0, "Balance b/d: arrears", o.arrears], [date1, "Income and expenditure account", income], [date1, "Balance c/d: received in advance", c.advance]].filter((x) => x[2]);
  const cr = [[date0, "Balance b/d: received in advance", o.advance], [date1, "Bank: subscriptions received", received], [date1, "Irrecoverable subscriptions written off", writeOff], [date1, "Balance c/d: arrears", c.arrears]].filter((x) => x[2]);
  const md = tAccount(title, dr, cr, { balance: false });
  check(`${title}: sides agree`, sum(dr.map((x) => x[2])), sum(cr.map((x) => x[2])));
  const total = sum(dr.map((x) => x[2]));
  const rows = [];
  const n = Math.max(dr.length, cr.length);
  const f = (v) => fmt(v);
  const lines = [`**${title}**`, "", "| Date | Details | " + U + " | Date | Details | " + U + " |", "| --- | --- | ---: | --- | --- | ---: |"];
  for (let i = 0; i < n; i += 1) {
    const a = dr[i] ?? ["", "", null];
    const b2 = cr[i] ?? ["", "", null];
    lines.push(`| ${a[0]} | ${a[1]} | ${f(a[2])} | ${b2[0]} | ${b2[1]} | ${f(b2[2])} |`);
  }
  lines.push(`| | | **${f(total)}** | | | **${f(total)}** |`);
  return { income, md: lines.join("\n"), total };
}
