// W3b helpers shared by the W3b slices and lesson generators (not part of the kit; imported by w3b- files only).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fmt, r2, check, statement, ratios, chk, tAccount } from "../lib.mjs";

export const ROOT = fileURLToPath(new URL("../../../content/subjects/accounting-a/", import.meta.url));
export const F = fmt;
export const U = "US\\$";
export const usd = (n) => `US\\$${fmt(n)}`;

/** Shorthand MCQ: ok = [content, rationale]; bad = [[content, rationale] x3]. The build rebalances positions. */
const warn = [];
export function mc(b, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("mc needs three distractors: " + rest.stem);
  const k = ok[0].length;
  const d = bad.map((x) => x[0].length);
  if (d.every((x) => k > x)) warn.push(rest.stem.slice(0, 60));
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}
export const uniqueLongest = () => warn;

const row = (cells) => `| ${cells.join(" | ")} |`;
export const heading = (biz, name, when) => `**${biz}**  \n**${name}**  \n**${when}**`;

/** Table without a title. rows [label, ...vals]; null = blank row; strings pass through; numbers formatted. */
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

export const front = (key, title, summary, concepts, minutes, extra = {}) => ({ key, title, summary, concepts, estimatedMinutes: minutes, ...extra, level: "core" });

/** Writes a lesson file (front matter JSON + body) and reports words outside tables. */
export function writeLesson(relPath, fm, body) {
  const path = ROOT + "lessons/" + relPath;
  mkdirSync(dirname(path), { recursive: true });
  const text = "---\n" + JSON.stringify(fm, null, 2) + "\n---\n" + body.trim() + "\n";
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

/**
 * One year of a company's figures. Input fields (US$): revenue, cos, otherIncome, distribution, admin, finance, tax,
 * nca (carrying amount), inventory, receivables, bank, payables, otherCL (tax and accruals), loan (non-current),
 * shareCapital, sharePremium, reserves (other reserves), retained (omit to balance the statement of financial position).
 * Optional investor data: shares, dividend (ordinary, for the year), price (market price per share).
 * Throws unless assets = equity + liabilities.
 */
export function coYear(d) {
  const o = { otherIncome: 0, distribution: 0, admin: 0, finance: 0, tax: 0, bank: 0, otherCL: 0, loan: 0, sharePremium: 0, reserves: 0, ...d };
  if (o.bank === "plug") {
    if (o.retained === undefined) throw new Error("bank plug needs retained");
    o.bank = r2(o.shareCapital + o.sharePremium + o.reserves + o.retained + o.loan + o.payables + o.otherCL - o.nca - o.inventory - o.receivables);
    if (o.bank < 0) throw new Error(`coYear ${o.name} ${o.year}: negative bank ${o.bank}`);
  }
  o.gp = r2(o.revenue - o.cos);
  o.pfo = r2(o.gp + o.otherIncome - o.distribution - o.admin);
  o.pbt = r2(o.pfo - o.finance);
  o.profit = r2(o.pbt - o.tax);
  o.ca = r2(o.inventory + o.receivables + o.bank);
  o.cl = r2(o.payables + o.otherCL);
  o.assets = r2(o.nca + o.ca);
  const needRetained = r2(o.assets - o.cl - o.loan - o.shareCapital - o.sharePremium - o.reserves);
  if (o.retained === undefined) o.retained = needRetained;
  if (o.retained < 0) throw new Error(`coYear ${o.name} ${o.year}: negative retained earnings ${o.retained}`);
  check(`${o.name} ${o.year}: assets = equity + liabilities`, o.retained, needRetained);
  o.equity = r2(o.shareCapital + o.sharePremium + o.reserves + o.retained);
  o.capitalEmployed = r2(o.equity + o.loan);
  o.opex = r2(o.distribution + o.admin);
  o.expenses = r2(o.cos + o.opex + o.finance);
  check(`${o.name} ${o.year}: capital employed`, o.capitalEmployed, o.nca + o.ca - o.cl);
  return o;
}

/** Statement of profit or loss rows for one or two years (a, b). */
export function splRows(a, b) {
  const cols = b ? [a, b] : [a];
  const v = (f) => cols.map(f);
  const rows = [
    ["Revenue", ...v((x) => x.revenue)],
    ["Cost of sales", ...v((x) => -x.cos)],
    ["**Gross profit**", ...v((x) => x.gp)],
  ];
  if (cols.some((x) => x.otherIncome)) rows.push(["Other income", ...v((x) => x.otherIncome)]);
  if (cols.some((x) => x.distribution)) rows.push(["Distribution costs", ...v((x) => -x.distribution)]);
  rows.push(["Administrative expenses", ...v((x) => -x.admin)]);
  rows.push(["**Profit from operations**", ...v((x) => x.pfo)]);
  rows.push(["Finance costs", ...v((x) => -x.finance)]);
  rows.push(["**Profit before tax**", ...v((x) => x.pbt)]);
  rows.push(["Income tax expense", ...v((x) => -x.tax)]);
  rows.push(["**Profit for the year**", ...v((x) => x.profit)]);
  return rows;
}
export function splMd(a, b, { title } = {}) {
  const cols = b ? [`${a.year} ${U}`, `${b.year} ${U}`] : [U];
  const checks = [a, b].filter(Boolean).flatMap((x) => [
    [`gp ${x.year}`, x.gp, x.revenue - x.cos],
    [`profit ${x.year}`, x.profit, x.pfo - x.finance - x.tax],
  ]);
  const t = statement(title ?? `Statement of profit or loss`, splRows(a, b), { cols, checks });
  return t;
}

export function sofpRows(a, b) {
  const cols = b ? [a, b] : [a];
  const v = (f) => cols.map(f);
  const rows = [
    ["**Non-current assets**", ...v(() => null)],
    ["Property, plant and equipment (carrying amount)", ...v((x) => x.nca)],
    ["**Current assets**", ...v(() => null)],
    ["Inventory", ...v((x) => x.inventory)],
    ["Trade receivables", ...v((x) => x.receivables)],
  ];
  if (cols.some((x) => x.bank)) rows.push(["Cash and cash equivalents", ...v((x) => x.bank)]);
  rows.push(["Total current assets", ...v((x) => x.ca)]);
  rows.push(["**Total assets**", ...v((x) => x.assets)]);
  rows.push(["**Equity**", ...v(() => null)]);
  rows.push(["Ordinary share capital", ...v((x) => x.shareCapital)]);
  if (cols.some((x) => x.sharePremium)) rows.push(["Share premium", ...v((x) => x.sharePremium)]);
  if (cols.some((x) => x.reserves)) rows.push(["Other reserves", ...v((x) => x.reserves)]);
  rows.push(["Retained earnings", ...v((x) => x.retained)]);
  rows.push(["Total equity", ...v((x) => x.equity)]);
  if (cols.some((x) => x.loan)) {
    rows.push(["**Non-current liabilities**", ...v(() => null)]);
    rows.push(["Loan notes", ...v((x) => x.loan)]);
  }
  rows.push(["**Current liabilities**", ...v(() => null)]);
  rows.push(["Trade payables", ...v((x) => x.payables)]);
  if (cols.some((x) => x.otherCL)) rows.push(["Tax and accruals", ...v((x) => x.otherCL)]);
  rows.push(["Total current liabilities", ...v((x) => x.cl)]);
  rows.push(["**Total equity and liabilities**", ...v((x) => r2(x.equity + x.loan + x.cl))]);
  return rows;
}
export function sofpMd(a, b, { title } = {}) {
  const cols = b ? [`${a.year} ${U}`, `${b.year} ${U}`] : [U];
  const checks = [a, b].filter(Boolean).flatMap((x) => [[`balance ${x.year}`, x.assets, x.equity + x.loan + x.cl]]);
  return statement(title ?? "Statement of financial position", sofpRows(a, b), { cols, checks });
}

// Standard ratio calculations from a coYear object (year-end balances unless avg is given).
export const R = {
  gpm: (x) => ratios.grossMargin(x.gp, x.revenue),
  markUp: (x) => ratios.markUp(x.gp, x.cos),
  pm: (x) => ratios.profitMargin(x.profit, x.revenue),
  roce: (x) => ratios.roce(x.pfo, x.capitalEmployed),
  e2r: (x) => ratios.expensesToRevenue(x.opex, x.revenue),
  current: (x) => ratios.current(x.ca, x.cl),
  acid: (x) => ratios.acidTest(x.ca, x.inventory, x.cl),
  invDays: (x) => (x.inventory / x.cos) * 365,
  invTimes: (x) => x.cos / x.inventory,
  recDays: (x, credit) => ratios.receivablesDays(x.receivables, credit ?? x.revenue),
  payDays: (x, purchases) => ratios.payablesDays(x.payables, purchases ?? x.cos),
  ncaTurn: (x) => ratios.nonCurrentAssetTurnover(x.revenue, x.nca),
  gearing: (x) => ratios.gearing(x.loan, x.shareCapital + x.sharePremium, x.reserves + x.retained),
  cover: (x) => ratios.interestCover(x.pfo, x.finance),
  roa: (x) => ratios.returnOnAssets(x.profit, x.assets),
  roe: (x) => ratios.returnOnEquity(x.profit, x.equity),
};
export { tAccount, chk, r2 };
