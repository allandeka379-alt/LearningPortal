// Shared helpers for the w4c- slices and tables scripts (no concept modules here; importing it registers nothing).
// Database tables are loaded into an in-memory SQLite database (node:sqlite), so every SQL output printed in a stem,
// explanation or lesson is the result of actually running the query shown.
import { DatabaseSync } from "node:sqlite";

export const fence = (s) => "```\n" + s + "\n```";
export const C = (k) => `comp.${k}`;
export const sum = (a) => a.reduce((s, x) => s + x, 0);
export const mdTable = (head, rows) =>
  [`| ${head.join(" | ")} |`, `|${head.map(() => ":-:").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

const fmtCell = (v, opts) => {
  if (v === null || v === undefined) return "";
  if (opts?.bool) return v ? "TRUE" : "FALSE";
  if (opts?.dp !== undefined && typeof v === "number") return v.toFixed(opts.dp);
  return String(v);
};

/**
 * A table in its own in-memory database. columns: [[name, sqlType, {bool?}], ...] (sqlType TEXT, INTEGER or REAL);
 * rows: arrays in column order (Booleans as true/false). Returns { name, md, run(sql), md(sql), value(sql), count }.
 */
export function table(name, columns, rows, extra = []) {
  const db = new DatabaseSync(":memory:");
  // Display options per column name: { bool } shows TRUE/FALSE, { dp } fixes the decimal places.
  const colOpts = new Map(columns.filter((c) => c[2]).map((c) => [c[0], c[2]]));
  const create = (tn, cols, rs) => {
    db.exec(`CREATE TABLE ${tn} (${cols.map(([n, ty]) => `${n} ${ty}`).join(", ")})`);
    const ins = db.prepare(`INSERT INTO ${tn} VALUES (${cols.map(() => "?").join(", ")})`);
    for (const r of rs) {
      if (r.length !== cols.length) throw new Error(`${tn}: row ${JSON.stringify(r)} has ${r.length} values`);
      ins.run(...r.map((v) => (typeof v === "boolean" ? (v ? 1 : 0) : v)));
    }
  };
  create(name, columns, rows);
  for (const t of extra) {
    create(t.name, t.columns, t.rows);
    for (const c of t.columns) if (c[2]) colOpts.set(c[0], c[2]);
  }
  const run = (sql) => db.prepare(sql).all().map((r) => ({ ...r }));
  const resultMd = (sql) => {
    const rs = run(sql);
    const stmt = db.prepare(sql);
    const head = stmt.columns().map((c) => c.name);
    if (!rs.length) return { md: "(no records)", rows: rs, head };
    return { md: mdTable(head, rs.map((r) => head.map((h) => fmtCell(r[h], colOpts.get(h))))), rows: rs, head };
  };
  const tableMd = (tn, cols, rs) => mdTable(cols.map((c) => c[0]), rs.map((r) => r.map((v, i) => fmtCell(v, cols[i][2]))));
  return {
    name,
    md: tableMd(name, columns, rows),
    mdOf: (tn) => {
      const t = extra.find((x) => x.name === tn);
      return tableMd(tn, t.columns, t.rows);
    },
    run,
    result: resultMd,
    /** Single value (first column of the first row). */
    value: (sql) => {
      const r = run(sql)[0];
      return r ? Object.values(r)[0] : null;
    },
    count: rows.length,
    rows,
    columns,
  };
}

/** Text answer for a result with one column: values joined by ", " in result order. */
export const colList = (rows, col) => rows.map((r) => String(r[col])).join(", ");
