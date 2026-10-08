// W2b layout helpers (verification: errors, suspense, bank reconciliation, control accounts). Built on lib.mjs
// fmt/sum/check; every helper throws when figures do not add up. Imported by the w2b- slices and the w2b- lesson table
// scripts. Not a slice (lives in tables/).
import { fmt, sum, check, r2 } from "../lib.mjs";

const row = (cells) => `| ${cells.join(" | ")} |`;

/** Plain Markdown table. headers: strings (a header starting with "US" or ending in "US\\$" is right-aligned). */
export function table(headers, rows) {
  const al = headers.map((h) => (/US\\\$|^Debit|^Credit|^Amount/.test(h) ? "---:" : "---"));
  return [row(headers), row(al), ...rows.map((r) => row(r.map((c) => (typeof c === "number" ? fmt(c) : c ?? ""))))].join("\n");
}

/**
 * T account that may carry balances on BOTH sides (control accounts). dr / cr: [date, details, amount].
 * crBalance: the credit balance carried down (written on the debit side as "Balance c/d"); the debit balance c/d is
 * computed so that both sides total the same (throws if it would be negative). Brings both balances down.
 * Returns { md, drBalance, crBalance, total }.
 */
export function control(title, dr, cr, { crBalance: crGiven, drBalance: drGiven, cdDate = "", bdDate = "" } = {}) {
  const D = dr.map((x) => [...x]);
  const C = cr.map((x) => [...x]);
  let crBalance;
  let drBalance;
  if (drGiven !== undefined) {
    // purchases ledger style: the debit balance c/d is given (credit side); the credit balance c/d is computed.
    drBalance = drGiven;
    if (drBalance) C.push([cdDate, "Balance c/d", drBalance]);
    crBalance = r2(sum(C.map((x) => x[2])) - sum(D.map((x) => x[2])));
    if (crBalance < 0) throw new Error(`${title}: credit balance c/d would be negative (${crBalance})`);
    if (crBalance) D.push([cdDate, "Balance c/d", crBalance]);
  } else {
    crBalance = crGiven ?? 0;
    if (crBalance) D.push([cdDate, "Balance c/d", crBalance]);
    drBalance = r2(sum(D.map((x) => x[2])) - sum(C.map((x) => x[2])));
    if (drBalance < 0) throw new Error(`${title}: debit balance c/d would be negative (${drBalance})`);
    if (drBalance) C.push([cdDate, "Balance c/d", drBalance]);
  }
  const total = sum(D.map((x) => x[2]));
  check(`${title} totals`, total, sum(C.map((x) => x[2])));
  const n = Math.max(D.length, C.length);
  const lines = [`**${title}**`, "", row(["Date", "Details", "US\\$", "Date", "Details", "US\\$"]), row(["---", "---", "---:", "---", "---", "---:"])];
  for (let i = 0; i < n; i += 1) {
    const a = D[i] ?? ["", "", null];
    const b = C[i] ?? ["", "", null];
    lines.push(row([a[0], a[1], fmt(a[2]), b[0], b[1], fmt(b[2])]));
  }
  lines.push(row(["", "", `**${fmt(total)}**`, "", "", `**${fmt(total)}**`]));
  lines.push(row([drBalance ? bdDate : "", drBalance ? "Balance b/d" : "", drBalance ? fmt(drBalance) : "", crBalance ? bdDate : "", crBalance ? "Balance b/d" : "", crBalance ? fmt(crBalance) : ""]));
  return { md: lines.join("\n"), drBalance, crBalance, total };
}

/**
 * Suspense account that must clear to nil. dr / cr: [date, details, amount]. Throws unless both sides total the same.
 */
export function suspense(title, dr, cr) {
  const td = sum(dr.map((x) => x[2]));
  const tc = sum(cr.map((x) => x[2]));
  check(`${title} clears`, td, tc);
  const n = Math.max(dr.length, cr.length);
  const lines = [`**${title}**`, "", row(["Date", "Details", "US\\$", "Date", "Details", "US\\$"]), row(["---", "---", "---:", "---", "---", "---:"])];
  for (let i = 0; i < n; i += 1) {
    const a = dr[i] ?? ["", "", null];
    const b = cr[i] ?? ["", "", null];
    lines.push(row([a[0], a[1], fmt(a[2]), b[0], b[1], fmt(b[2])]));
  }
  lines.push(row(["", "", `**${fmt(td)}**`, "", "", `**${fmt(tc)}**`]));
  return lines.join("\n");
}

/**
 * Statement of corrected profit. adj: [[label, signed amount]] (+ increases profit). Returns { md, corrected }.
 */
export function correctedProfit(title, draft, adj, { draftLabel = "Profit for the year as originally calculated", finalLabel = "Corrected profit for the year" } = {}) {
  const corrected = r2(draft + sum(adj.map((a) => a[1])));
  const rows = [[draftLabel, draft]];
  const add = adj.filter((a) => a[1] > 0);
  const less = adj.filter((a) => a[1] < 0);
  if (add.length) {
    rows.push(["**Add:**", ""]);
    for (const [l, v] of add) rows.push([`${l}`, v]);
  }
  if (less.length) {
    rows.push(["**Less:**", ""]);
    for (const [l, v] of less) rows.push([`${l}`, v]);
  }
  rows.push([`**${finalLabel}**`, corrected < 0 ? `**(${fmt(-corrected)})**` : `**${fmt(corrected)}**`]);
  check(`${title}`, corrected, draft + sum(adj.map((a) => a[1])));
  const lines = [`**${title}**`, "", row(["", "US\\$"]), row(["---", "---:"])];
  for (const [l, v] of rows) lines.push(row([l, typeof v === "number" ? fmt(v) : v]));
  return { md: lines.join("\n"), corrected };
}

/**
 * Bank reconciliation statement starting from the updated cash book balance (signed, + = debit / money in the bank)
 * and arriving at the bank statement balance (signed, + = credit balance on the statement = money in the bank).
 * add: [[label, amount]] (unpresented cheques etc.), less: [[label, amount]] (uncredited deposits etc.).
 * Throws unless the result equals `statement`. Returns { md }.
 */
export function bankRec(title, { start, add = [], less = [], statement: stmt, startLabel = "Balance as per updated cash book", endLabel = "Balance as per bank statement" }) {
  const end = r2(start + sum(add.map((a) => a[1])) - sum(less.map((a) => a[1])));
  check(`${title}`, end, stmt);
  const show = (v) => (v < 0 ? `(${fmt(-v)}) overdrawn` : fmt(v));
  const lines = [`**${title}**`, "", row(["", "US\\$", "US\\$"]), row(["---", "---:", "---:"])];
  lines.push(row([start < 0 ? `${startLabel} (overdraft)` : startLabel, "", start < 0 ? `(${fmt(-start)})` : fmt(start)]));
  if (add.length > 1) {
    lines.push(row(["**Add:**", "", ""]));
    for (const [l, v] of add) lines.push(row([l, fmt(v), ""]));
    lines.push(row(["", "", fmt(sum(add.map((a) => a[1])))]));
  } else if (add.length) lines.push(row([`**Add:** ${add[0][0]}`, "", fmt(add[0][1])]));
  if (less.length) {
    if (less.length > 1) {
      lines.push(row(["**Less:**", "", ""]));
      for (const [l, v] of less) lines.push(row([l, fmt(v), ""]));
      lines.push(row(["", "", `(${fmt(sum(less.map((a) => a[1])))})`]));
    } else lines.push(row([`**Less:** ${less[0][0]}`, "", `(${fmt(less[0][1])})`]));
  }
  lines.push(row([end < 0 ? `**${endLabel} (overdraft)**` : `**${endLabel}**`, "", `**${show(end)}**`]));
  return { md: lines.join("\n"), end };
}

export { fmt, sum, check, r2 };
