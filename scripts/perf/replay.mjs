// Replays every statement captured by scripts/perf/harness.ts (last run of each scenario) serially with
// EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) inside a rolled-back transaction, N times each, and records the median
// execution time and the plan shape. Replaying the SAME statements with the SAME parameters before and after a schema
// change isolates the effect of the change from application-level concurrency (Promise.all) and machine noise.
//
// Usage: node scripts/perf/replay.mjs <harness-report.json> <out.json> [--repeat 5] [--setup SQL] [--baseline SQL] [--only scenarioPrefix,...]
// Env:   PERF_OWNER_URL (default postgresql://postgres@localhost:5433/zimstudy_perf; the database name must end in _perf)
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "package.json"));
const pg = require("pg");

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
};
const [input, output] = args;
if (!input || !output) {
  console.error("usage: node scripts/perf/replay.mjs <harness-report.json> <out.json> [--repeat 5] [--setup SQL]");
  process.exit(2);
}
const repeat = Math.max(1, Number(option("repeat") ?? 5));
const setup = option("setup") ?? "";
const url = process.env.PERF_OWNER_URL ?? "postgresql://postgres@localhost:5433/zimstudy_perf";
if (!/_perf$/.test(new URL(url).pathname.slice(1))) throw new Error("replay only runs against *_perf databases");

const report = JSON.parse(readFileSync(input, "utf8"));
const lastRun = new Map();
for (const s of report.statements) lastRun.set(s.scenario, Math.max(lastRun.get(s.scenario) ?? 0, s.run));
const seen = new Set();
const only = option("only")?.split(",") ?? null;
const statements = report.statements.filter((s) => {
  if (s.run !== lastRun.get(s.scenario)) return false;
  if (only && !only.some((prefix) => s.scenario.startsWith(prefix))) return false;
  if (/^\s*(SELECT set_config|BEGIN|COMMIT|ROLLBACK)/i.test(s.query)) return false;
  const key = `${s.scenario}\u0000${s.query}\u0000${s.params ?? ""}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

function parseParams(text) {
  const values = [];
  if (!text) return values;
  const re = /\$(\d+) = (NULL|'((?:[^']|'')*)')/g;
  let match;
  while ((match = re.exec(text))) values[Number(match[1]) - 1] = match[2] === "NULL" ? null : match[3].replace(/''/g, "'");
  return values;
}

function summarize(node, acc = { scans: [], flags: new Set() }) {
  const relation = node["Relation Name"];
  if (relation && /Scan/.test(node["Node Type"])) acc.scans.push(`${node["Node Type"]}:${relation}${node["Index Name"] ? `(${node["Index Name"]})` : ""}`);
  if (node["Sort Space Type"] === "Disk") acc.flags.add("SORT_SPILL");
  if ((node["Temp Written Blocks"] ?? 0) > 0) acc.flags.add("TEMP_IO");
  for (const child of node.Plans ?? []) summarize(child, acc);
  return acc;
}

const client = new pg.Client({ connectionString: url, options: "-c TimeZone=UTC" });
await client.connect();
await client.query("SET auto_explain.log_min_duration = -1").catch(() => {});
// Same production-like flags as the harness: analytics exclude demo users / schools (an empty set in production).
await client.query(`UPDATE "User" SET "isDemo" = false WHERE "isDemo"`);
await client.query(`UPDATE "School" SET "isDemo" = false WHERE "isDemo"`);
const large = new Map(
  (await client.query(`SELECT c.relname, c.reltuples::bigint AS n FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                        WHERE n.nspname = 'public' AND c.relkind = 'r' AND c.reltuples >= 10000`)).rows.map((r) => [r.relname, Number(r.n)]),
);
async function measureOnce(s, params, setupSql) {
  try {
    await client.query("BEGIN");
    if (setupSql) await client.query(setupSql);
    if (s.scenario === "search") await client.query("SELECT set_config('pg_trgm.word_similarity_threshold', '0.5', true)");
    const res = await client.query(`EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${s.query}`, params);
    const doc = res.rows[0]["QUERY PLAN"][0];
    return { time: doc["Execution Time"], plan: doc.Plan, error: null };
  } catch (e) {
    return { time: null, plan: null, error: e.message };
  } finally {
    await client.query("ROLLBACK").catch(() => {});
  }
}

function describe(times, plan, error) {
  times.sort((a, b) => a - b);
  const median = times.length ? times[Math.floor(times.length / 2)] : null;
  const summary = plan ? summarize(plan) : { scans: [], flags: new Set() };
  for (const scan of summary.scans) {
    const [type, rest] = scan.split(":");
    const relation = rest.replace(/\(.*$/, "");
    if (type === "Seq Scan" && large.has(relation)) summary.flags.add(`SEQ_SCAN_LARGE:${relation}`);
  }
  if (median !== null && median > 50) summary.flags.add("SLOW>50ms");
  return {
    medianMs: median,
    rows: plan ? plan["Actual Rows"] : null,
    sharedHit: plan ? plan["Shared Hit Blocks"] : null,
    sharedRead: plan ? plan["Shared Read Blocks"] : null,
    scans: summary.scans,
    flags: [...summary.flags],
    error,
  };
}

// --baseline "SQL": A/B mode. Each repetition runs the statement under the baseline setup (e.g. DROP INDEX ... to
// emulate the old schema inside the rolled-back transaction) and then under --setup, alternating, so machine noise
// hits both variants alike.
const baseline = option("baseline");
const results = [];
for (const s of statements) {
  const params = parseParams(s.params);
  const variants = baseline !== undefined ? [["baseline", baseline], ["candidate", setup]] : [["candidate", setup]];
  const acc = Object.fromEntries(variants.map(([name]) => [name, { times: [], plan: null, error: null }]));
  for (let i = 0; i < repeat; i++) {
    for (const [name, sql] of variants) {
      const a = acc[name];
      if (a.error) continue;
      const r = await measureOnce(s, params, sql);
      if (r.error) a.error = r.error;
      else {
        a.times.push(r.time);
        a.plan = r.plan;
      }
    }
    if (Object.values(acc).every((a) => a.error)) break;
  }
  const entry = { scenario: s.scenario, query: s.query, params: s.params, capturedMs: s.durationMs };
  for (const [name] of variants) entry[name] = describe(acc[name].times, acc[name].plan, acc[name].error);
  Object.assign(entry, entry.candidate);
  results.push(entry);
  process.stdout.write(".");
}
await client.query(`UPDATE "User" SET "isDemo" = true WHERE NOT "isDemo"`);
await client.query(`UPDATE "School" SET "isDemo" = true WHERE NOT "isDemo"`);
await client.end();
writeFileSync(output, JSON.stringify({ input, setup, baseline: baseline ?? null, repeat, results }, null, 2));
console.log(`\n[replay] ${results.length} statements -> ${output}`);
const slow = results.filter((r) => r.flags.length > 0 || r.error).sort((a, b) => (b.medianMs ?? 0) - (a.medianMs ?? 0));
for (const r of slow) {
  const before = r.baseline ? `${(r.baseline.medianMs ?? -1).toFixed(2).padStart(9)} ms -> ` : "";
  console.log(`${before}${(r.medianMs ?? -1).toFixed(2).padStart(9)} ms rows=${String(r.rows).padStart(6)} ${r.scenario.padEnd(24)} ${r.flags.join(",")} ${r.error ?? ""}`);
  console.log(`      ${r.query.replace(/\s+/g, " ").slice(0, 200)}`);
}
