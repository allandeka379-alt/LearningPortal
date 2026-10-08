// First-load JavaScript budgets per route (§29, §38; docs/ARCHITECTURE.md §9.9), measured from a production build.
//
//   npm run build                                  (or: NEXT_DIST_DIR=.next-<label> npm run build)
//   node scripts/bundle-budgets.mjs [--dist .next-<label>] [--json out.json] [--markdown out.md] [--all]
//
// Next 16 no longer prints "First Load JS" in the `next build` output; it writes
// `<distDir>/diagnostics/route-bundle-stats.json` instead (per App Router page: the union of the JS chunks of every
// segment plus the shared runtime, UNCOMPRESSED). This script gzips each chunk (level 9, like the old Next output and
// what a CDN serves), sums per route, classifies the route and compares it with its budget. Exit code 1 when a route is
// over budget (CI gate), 2 when the stats file is missing.
//
// Budgets (compressed, kB = 1000 bytes, matching the old Next output):
//   public   marketing + SEO curriculum + auth + share/daily pages   110 kB
//   student  /app, /onboarding, /parent, /teacher, /school           170 kB
//   exam     the exam room (mock exams and the diagnostic)           200 kB   (ARCHITECTURE §9.9 "Exam mode")
//   admin    /admin CMS                                              250 kB
// /dev/* (404 in production) and route handlers are not budgeted.
//
// Reference point (Next 16.3 + React 19.3, Turbopack, measured 2026-10-06): the framework runtime alone is ~134 kB gzip
// (react-dom ~72, Next app-router runtime ~45, Turbopack runtime ~4, misc ~13) and the root layout adds ~10 kB, so no
// App Router page can be below ~144 kB: the 110 kB public budget is not reachable on this stack (see the report).
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync, brotliCompressSync, constants as zlibConstants } from "node:zlib";

export const BUDGETS_KB = { public: 110, student: 170, exam: 200, admin: 250 };

/** Routes that render the exam room (timer, navigator, offline answer store). */
const EXAM_ROUTES = new Set(["/app/exams/attempt/[attemptId]", "/app/diagnostic/[attemptId]"]);

/** Route class of an App Router path (route groups already stripped by Next). Pure. */
export function routeClass(route) {
  if (route === "/dev" || route.startsWith("/dev/")) return "dev";
  if (route === "/admin" || route.startsWith("/admin/")) return "admin";
  if (EXAM_ROUTES.has(route)) return "exam";
  for (const prefix of ["/app", "/onboarding", "/parent", "/teacher", "/school", "/billing"]) {
    if (route === prefix || route.startsWith(`${prefix}/`)) return "student";
  }
  return "public";
}

function parseArgs(argv) {
  const args = { dist: process.env.NEXT_DIST_DIR || ".next", json: null, markdown: null, all: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dist") args.dist = argv[++i];
    else if (arg === "--json") args.json = argv[++i];
    else if (arg === "--markdown") args.markdown = argv[++i];
    else if (arg === "--all") args.all = true;
  }
  return args;
}

const kb = (bytes) => Math.round(bytes / 100) / 10;

export function measure(distDir, root = process.cwd()) {
  const statsFile = path.join(root, distDir, "diagnostics", "route-bundle-stats.json");
  if (!existsSync(statsFile)) return null;
  const rows = JSON.parse(readFileSync(statsFile, "utf8"));
  const cache = new Map();
  const compressed = (chunk) => {
    let hit = cache.get(chunk);
    if (!hit) {
      const file = path.join(root, chunk);
      const source = existsSync(file) ? readFileSync(file) : Buffer.alloc(0);
      hit = {
        raw: source.length,
        gzip: gzipSync(source, { level: 9 }).length,
        brotli: brotliCompressSync(source, { params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 11 } }).length,
      };
      cache.set(chunk, hit);
    }
    return hit;
  };
  return rows
    .map((row) => {
      const sizes = row.firstLoadChunkPaths.map(compressed);
      const sum = (key) => sizes.reduce((total, size) => total + size[key], 0);
      const cls = routeClass(row.route);
      const gzip = sum("gzip");
      const budget = BUDGETS_KB[cls] ?? null;
      return {
        route: row.route,
        class: cls,
        chunks: row.firstLoadChunkPaths.length,
        rawKb: kb(sum("raw")),
        gzipKb: kb(gzip),
        brotliKb: kb(sum("brotli")),
        budgetKb: budget,
        over: budget !== null && kb(gzip) > budget,
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const results = measure(args.dist);
  if (!results) {
    console.error(`No ${args.dist}/diagnostics/route-bundle-stats.json: run a production build first (npm run build).`);
    process.exit(2);
  }
  if (args.json) writeFileSync(args.json, JSON.stringify(results, null, 2));
  const lines = ["| Route | Class | First-load JS gzip (kB) | brotli (kB) | raw (kB) | Budget (kB) |", "|---|---|---:|---:|---:|---:|"];
  for (const row of results) {
    if (!args.all && row.class === "dev") continue;
    lines.push(`| ${row.route} | ${row.class} | ${row.gzipKb}${row.over ? " **OVER**" : ""} | ${row.brotliKb} | ${row.rawKb} | ${row.budgetKb ?? "-"} |`);
  }
  if (args.markdown) writeFileSync(args.markdown, `${lines.join("\n")}\n`);
  else console.log(lines.join("\n"));
  const over = results.filter((row) => row.over);
  const byClass = {};
  for (const row of results) {
    const entry = (byClass[row.class] ??= { routes: 0, maxKb: 0, maxRoute: "" });
    entry.routes += 1;
    if (row.gzipKb > entry.maxKb) Object.assign(entry, { maxKb: row.gzipKb, maxRoute: row.route });
  }
  for (const [cls, entry] of Object.entries(byClass)) {
    console.log(`${cls.padEnd(8)} ${String(entry.routes).padStart(4)} routes, max ${entry.maxKb} kB (${entry.maxRoute}), budget ${BUDGETS_KB[cls] ?? "-"} kB`);
  }
  if (over.length > 0) {
    console.error(`${over.length} route(s) over budget: ${over.map((row) => `${row.route} (${row.gzipKb} kB > ${row.budgetKb} kB)`).join(", ")}`);
    process.exit(1);
  }
  console.log("All routes within their first-load JS budgets.");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
