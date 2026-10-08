// W2a layout helpers (books of prime entry). Built on lib.mjs fmt/sum/check; every helper throws when figures do not
// add up. Imported by the w2a- slices and the w2a- lesson table scripts. Not a slice (lives in tables/).
import { fmt, sum, check, r2 } from "../lib.mjs";

const row = (cells) => `| ${cells.join(" | ")} |`;
const B = (n) => (n === null || n === undefined ? "" : `**${fmt(n)}**`);

/**
 * Cash book (two-column: Cash, Bank; three-column: Discount, Cash, Bank).
 * dr / cr rows: three-column [date, details, discount, cash, bank]; two-column [date, details, cash, bank].
 * Balances cash (must not be in credit) and bank (credit = overdraft) and brings both down.
 * Returns { md, cash, bank (signed, + = debit), discAllowed, discReceived, cashTotal, bankTotal }.
 */
export function cashBook(title, dr, cr, { discounts = true, cdDate = "", bdDate = "", balance = true } = {}) {
  const norm = (r) => (discounts ? [r[0], r[1], r[2] ?? null, r[3] ?? null, r[4] ?? null] : [r[0], r[1], null, r[2] ?? null, r[3] ?? null]);
  const D = dr.map(norm);
  const C = cr.map(norm);
  const tot = (rows, i) => sum(rows.map((x) => x[i]));
  const discAllowed = tot(D, 2);
  const discReceived = tot(C, 2);
  const cash = r2(tot(D, 3) - tot(C, 3));
  const bank = r2(tot(D, 4) - tot(C, 4));
  if (cash < 0) throw new Error(`${title}: cash column cannot have a credit balance (${cash})`);
  let cashTotal = Math.max(tot(D, 3), tot(C, 3));
  let bankTotal = Math.max(tot(D, 4), tot(C, 4));
  if (balance) {
    const crCd = [cdDate, "Balances c/d", null, cash > 0 ? cash : null, bank > 0 ? bank : null];
    if (cash > 0 || bank > 0) C.push(bank > 0 && cash > 0 ? crCd : [cdDate, "Balance c/d", null, crCd[3], crCd[4]]);
    if (bank < 0) D.push([cdDate, "Balance c/d", null, null, -bank]);
    check(`${title} cash totals`, tot(D, 3), tot(C, 3));
    check(`${title} bank totals`, tot(D, 4), tot(C, 4));
    cashTotal = tot(D, 3);
    bankTotal = tot(D, 4);
  }
  const cols = discounts ? ["Date", "Details", "Discount US\\$", "Cash US\\$", "Bank US\\$"] : ["Date", "Details", "Cash US\\$", "Bank US\\$"];
  const al = discounts ? ["---", "---", "---:", "---:", "---:"] : ["---", "---", "---:", "---:"];
  const cells = (r) => (discounts ? [r[0], r[1], fmt(r[2]), fmt(r[3]), fmt(r[4])] : [r[0], r[1], fmt(r[3]), fmt(r[4])]);
  const empty = discounts ? ["", "", "", "", ""] : ["", "", "", ""];
  const lines = [`**${title}**`, "", row([...cols, ...cols]), row([...al, ...al])];
  const n = Math.max(D.length, C.length);
  for (let i = 0; i < n; i += 1) lines.push(row([...(D[i] ? cells(D[i]) : empty), ...(C[i] ? cells(C[i]) : empty)]));
  if (balance) {
    const totRow = (disc) => (discounts ? ["", "", B(disc || null), B(cashTotal || null), B(bankTotal || null)] : ["", "", B(cashTotal || null), B(bankTotal || null)]);
    lines.push(row([...totRow(discAllowed), ...totRow(discReceived)]));
    const drBd = discounts ? [bdDate, cash > 0 && bank > 0 ? "Balances b/d" : "Balance b/d", "", fmt(cash || null), fmt(bank > 0 ? bank : null)] : [bdDate, cash > 0 && bank > 0 ? "Balances b/d" : "Balance b/d", fmt(cash || null), fmt(bank > 0 ? bank : null)];
    const crBd = bank < 0 ? (discounts ? [bdDate, "Balance b/d", "", "", fmt(-bank)] : [bdDate, "Balance b/d", "", fmt(-bank)]) : empty;
    lines.push(row([...(cash > 0 || bank > 0 ? drBd : empty), ...crBd]));
  } else if (discounts) {
    lines.push(row(["", "", B(discAllowed || null), "", "", "", "", B(discReceived || null), "", ""]));
  }
  return { md: lines.join("\n"), cash, bank, discAllowed, discReceived, cashTotal, bankTotal };
}

/**
 * Analysed petty cash book on the imprest system.
 * receipts: [[date, details, amount]] (opening float / balance b/d and any top-ups before the payments).
 * payments: [[date, details, voucher, column, amount]] (one analysis column each).
 * cols: analysis column names in order. imprest: the float to restore to. restoreDate / restoreDetails.
 * Returns { md, paid, colTotals, balance, restore }.
 */
export function pettyCash(title, { receipts, payments, cols, imprest, cdDate = "", bdDate = "", restoreDate, restoreDetails = "Bank" }) {
  const received = sum(receipts.map((x) => x[2]));
  const paid = sum(payments.map((x) => x[4]));
  const colTotals = cols.map((c) => sum(payments.filter((p) => p[3] === c).map((p) => p[4])));
  for (const p of payments) if (!cols.includes(p[3])) throw new Error(`${title}: unknown column ${p[3]}`);
  check(`${title}: analysis = total`, sum(colTotals), paid);
  const balance = r2(received - paid);
  if (balance < 0) throw new Error(`${title}: paid more than received`);
  const restore = r2(imprest - balance);
  check(`${title}: restore = paid when float started at imprest`, received === imprest ? restore : paid, paid);
  const head = ["Receipts US\\$", "Date", "Details", "Voucher", "Total US\\$", ...cols.map((c) => `${c} US\\$`)];
  const lines = [`**${title}**`, "", row(head), row(["---:", "---", "---", "---", "---:", ...cols.map(() => "---:")])];
  const blanks = cols.map(() => "");
  for (const [d, det, amt] of receipts) lines.push(row([fmt(amt), d, det, "", "", ...blanks]));
  for (const [d, det, v, c, amt] of payments) lines.push(row(["", d, det, v, fmt(amt), ...cols.map((x) => (x === c ? fmt(amt) : ""))]));
  lines.push(row(["", "", "", "", B(paid), ...colTotals.map((t) => B(t || null))]));
  lines.push(row(["", cdDate, "Balance c/d", "", fmt(balance), ...blanks]));
  lines.push(row([B(received), "", "", "", B(received), ...blanks]));
  lines.push(row([fmt(balance), bdDate, "Balance b/d", "", "", ...blanks]));
  if (restoreDate) lines.push(row([fmt(restore), restoreDate, restoreDetails, "", "", ...blanks]));
  return { md: lines.join("\n"), paid, colTotals, balance, restore, received };
}

/** Day book (sales, purchases or returns journal): rows [date, name, ref, amount]. Returns { md, total }. */
export function dayBook(title, rows, { nameCol = "Name", refCol = "Ref.", folio = false, totalLabel = "Total", totalDate = "" } = {}) {
  const total = sum(rows.map((x) => x[3]));
  const head = folio ? ["Date", nameCol, refCol, "Folio", "US\\$"] : ["Date", nameCol, refCol, "US\\$"];
  const lines = [`**${title}**`, "", row(head), row(head.map((h) => (h === "US\\$" ? "---:" : "---")))];
  for (const r of rows) lines.push(row(folio ? [r[0], r[1], r[2], r[4] ?? "", fmt(r[3])] : [r[0], r[1], r[2], fmt(r[3])]));
  lines.push(row(folio ? [totalDate, `**${totalLabel}**`, "", "", B(total)] : [totalDate, `**${totalLabel}**`, "", B(total)]));
  return { md: lines.join("\n"), total };
}

/** Net invoice value after trade discount (pct) to the cent. */
export const net = (list, pct) => r2(list * (1 - pct / 100));
/** Simple table: head [..], rows [[..]]; numbers formatted; align: array of "l"/"r". */
export function table(head, rows, align) {
  const al = align ?? head.map((_, i) => (rows.some((r) => typeof r[i] === "number") ? "r" : "l"));
  return [row(head), row(al.map((a) => (a === "r" ? "---:" : "---"))), ...rows.map((r) => row(r.map((c) => (typeof c === "number" ? fmt(c) : c ?? ""))))].join("\n");
}
