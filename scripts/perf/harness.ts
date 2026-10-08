/**
 * Performance harness (§38, docs/ARCHITECTURE.md §9): calls the hot read/write services against the synthetic perf
 * database (scripts/perf/seed-perf.sql) with realistic actors, while auto_explain logs every statement's plan with
 * EXPLAIN (ANALYZE, BUFFERS) detail. Afterwards the new part of the server log is parsed into a per-scenario report:
 * statement, duration, rows, scan nodes, and flags (sequential scan of a large table, sort spilled to disk, > 50 ms).
 *
 * Usage (PowerShell or bash, from the repo root; see scripts/perf/README.md):
 *   npx tsx --conditions=react-server scripts/perf/harness.ts --label before [--runs 3] [--only practice,search]
 *
 * Environment:
 *   PERF_DATABASE_URL  app-role URL of the perf database   (default postgresql://app_rw@localhost:5433/zimstudy_perf)
 *   PERF_OWNER_URL     owner URL of the perf database      (default postgresql://postgres@localhost:5433/zimstudy_perf)
 *   PERF_PG_LOG        server log file auto_explain writes to (default .data/pg.log, the local cluster's log)
 *   PERF_OUT_DIR       report directory                    (default <os tmp>/dzidza-perf)
 *
 * The harness refuses any database whose name does not end in "_perf". It mutates that database (starts and answers
 * practice sessions, claims jobs, writes rollups), so re-seed before comparing absolute row counts.
 */
import { mkdirSync, openSync, readSync, closeSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { config } from "dotenv";
import pg from "pg";

config({ path: path.join(process.cwd(), ".env"), quiet: true });

const APP_URL = process.env.PERF_DATABASE_URL ?? "postgresql://app_rw@localhost:5433/zimstudy_perf";
const OWNER_URL = process.env.PERF_OWNER_URL ?? "postgresql://postgres@localhost:5433/zimstudy_perf";
const PG_LOG = process.env.PERF_PG_LOG ?? path.join(process.cwd(), ".data", "pg.log");
const OUT_DIR = process.env.PERF_OUT_DIR ?? path.join(os.tmpdir(), "dzidza-perf");

for (const url of [APP_URL, OWNER_URL]) {
  const name = new URL(url).pathname.replace(/^\//, "");
  if (!/_perf$/.test(name)) throw new Error(`Refusing to run against database "${name}": the perf harness only uses *_perf databases.`);
}
// Services read DATABASE_URL when @/server/db is first imported (dynamic imports below).
process.env.DATABASE_URL = APP_URL;
process.env.DATABASE_POOL_MAX = process.env.DATABASE_POOL_MAX ?? "4";

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}
const LABEL = (arg("label") ?? "run").replace(/[^a-z0-9_-]/gi, "");
const RUNS = Math.max(1, Math.min(10, Number(arg("runs") ?? 3)));
const ONLY = arg("only")?.split(",").filter(Boolean) ?? null;
const SLOW_MS = 50;

interface Scenario {
  name: string;
  /** Unmeasured preparation, run before the scenario's begin marker. */
  setup?: () => Promise<void>;
  run: (iteration: number) => Promise<unknown>;
}

// ---------------------------------------------------------------------------------------------------------------------
// auto_explain log parsing
// ---------------------------------------------------------------------------------------------------------------------

interface PlanNode {
  "Node Type": string;
  "Relation Name"?: string;
  "Index Name"?: string;
  "Actual Rows"?: number;
  "Actual Loops"?: number;
  "Actual Total Time"?: number;
  "Rows Removed by Filter"?: number;
  "Sort Space Type"?: string;
  "Sort Method"?: string;
  "Shared Hit Blocks"?: number;
  "Shared Read Blocks"?: number;
  "Temp Read Blocks"?: number;
  "Temp Written Blocks"?: number;
  Plans?: PlanNode[];
}
interface LoggedPlan {
  durationMs: number;
  query: string;
  params: string | null;
  plan: PlanNode;
}
export interface StatementReport {
  scenario: string;
  run: number;
  durationMs: number;
  rows: number;
  query: string;
  params: string | null;
  scans: string[];
  flags: string[];
  sharedHit: number;
  sharedRead: number;
  tempBlocks: number;
  planText: string;
}

const LINE_PREFIX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} \S+ \[\d+\] /;

function readAppended(file: string, from: number): string {
  const size = statSync(file).size;
  if (size <= from) return "";
  const fd = openSync(file, "r");
  try {
    const buffer = Buffer.alloc(size - from);
    readSync(fd, buffer, 0, buffer.length, from);
    return buffer.toString("utf8");
  } finally {
    closeSync(fd);
  }
}

function parsePlans(text: string): LoggedPlan[] {
  const entries: string[] = [];
  let current: string[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (LINE_PREFIX.test(line)) {
      if (current.length) entries.push(current.join("\n"));
      current = [line];
    } else if (current.length) {
      current.push(line);
    }
  }
  if (current.length) entries.push(current.join("\n"));
  const plans: LoggedPlan[] = [];
  for (const entry of entries) {
    const match = /LOG:\s+duration: ([\d.]+) ms\s+plan:\s*([\s\S]*)$/.exec(entry);
    if (!match?.[1] || !match[2]) continue;
    try {
      const json = JSON.parse(match[2].trim()) as { "Query Text": string; "Query Parameters"?: string; Plan: PlanNode };
      plans.push({ durationMs: Number(match[1]), query: json["Query Text"], params: json["Query Parameters"] ?? null, plan: json.Plan });
    } catch {
      // Not a JSON plan (another log line that happens to mention "duration").
    }
  }
  return plans;
}

function walk(node: PlanNode, visit: (n: PlanNode, depth: number) => void, depth = 0): void {
  visit(node, depth);
  for (const child of node.Plans ?? []) walk(child, visit, depth + 1);
}

function planText(node: PlanNode): string {
  const lines: string[] = [];
  walk(node, (n, depth) => {
    const target = [n["Relation Name"] ? `on ${n["Relation Name"]}` : "", n["Index Name"] ? `using ${n["Index Name"]}` : ""].filter(Boolean).join(" ");
    const sort = n["Sort Method"] ? ` sort=${n["Sort Method"]}/${n["Sort Space Type"] ?? ""}` : "";
    const removed = n["Rows Removed by Filter"] ? ` removed=${n["Rows Removed by Filter"]}` : "";
    lines.push(
      `${"  ".repeat(depth)}-> ${n["Node Type"]} ${target} (rows=${n["Actual Rows"] ?? "?"} loops=${n["Actual Loops"] ?? "?"} time=${(n["Actual Total Time"] ?? 0).toFixed(3)}ms hit=${n["Shared Hit Blocks"] ?? 0} read=${n["Shared Read Blocks"] ?? 0})${sort}${removed}`.replace(/\s+\(/, " ("),
    );
  });
  return lines.join("\n");
}

function analyse(scenario: string, run: number, plan: LoggedPlan, largeTables: Map<string, number>): StatementReport {
  const scans: string[] = [];
  const flags: string[] = [];
  let temp = 0;
  walk(plan.plan, (n) => {
    const relation = n["Relation Name"];
    if (relation && /Scan/.test(n["Node Type"])) {
      scans.push(`${n["Node Type"]}:${relation}${n["Index Name"] ? `(${n["Index Name"]})` : ""}`);
      const estimate = largeTables.get(relation);
      if (n["Node Type"] === "Seq Scan" && estimate !== undefined) flags.push(`SEQ_SCAN_LARGE:${relation}(~${estimate} rows)`);
    }
    if (n["Sort Space Type"] === "Disk") flags.push("SORT_SPILL");
    temp += (n["Temp Read Blocks"] ?? 0) + (n["Temp Written Blocks"] ?? 0);
  });
  if (plan.durationMs > SLOW_MS) flags.push(`SLOW>${SLOW_MS}ms`);
  if (temp > 0 && !flags.includes("SORT_SPILL")) flags.push("TEMP_IO");
  return {
    scenario,
    run,
    durationMs: plan.durationMs,
    rows: plan.plan["Actual Rows"] ?? 0,
    query: plan.query.replace(/\s+/g, " ").trim(),
    params: plan.params,
    scans,
    flags,
    sharedHit: plan.plan["Shared Hit Blocks"] ?? 0,
    sharedRead: plan.plan["Shared Read Blocks"] ?? 0,
    tempBlocks: temp,
    planText: planText(plan.plan),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------------------------------------------

async function main(): Promise<void> {
  mkdirSync(OUT_DIR, { recursive: true });
  const owner = new pg.Client({ connectionString: OWNER_URL, options: "-c TimeZone=UTC" });
  await owner.connect();
  // Markers are logged by auto_explain like any statement; the names below are constants of this script.
  const mark = async (text: string) => {
    await owner.query(`SELECT 'perf:mark:${text.replace(/[^a-zA-Z0-9:._-]/g, "")}' AS marker`);
  };

  // Production-like analytics: perf rows carry isDemo = true (seed contract), but analytics exclude demo users and
  // schools, which in production is an empty set. Clear the flags for the run, restore them at the end.
  await owner.query(`UPDATE "User" SET "isDemo" = false WHERE "isDemo"`);
  await owner.query(`UPDATE "School" SET "isDemo" = false WHERE "isDemo"`);

  const largeTables = new Map<string, number>();
  for (const row of (
    await owner.query<{ relname: string; n: string }>(
      `SELECT c.relname, c.reltuples::bigint AS n FROM pg_class c JOIN pg_namespace ns ON ns.oid = c.relnamespace
        WHERE ns.nspname = 'public' AND c.relkind = 'r' AND c.reltuples >= 10000`,
    )
  ).rows) {
    largeTables.set(row.relname, Number(row.n));
  }

  const q1 = async <T extends pg.QueryResultRow>(sql: string, params: unknown[] = []): Promise<T> => {
    const row = (await owner.query<T>(sql, params)).rows[0];
    if (!row) throw new Error(`perf harness: no row for ${sql.slice(0, 80)}`);
    return row;
  };

  // --- actors -----------------------------------------------------------------------------------------------------
  const heavy = await q1<{ userId: string }>(`
    SELECT a."userId" FROM "AssessmentAttempt" a JOIN "Student" s ON s."userId" = a."userId" JOIN "Profile" p ON p."userId" = a."userId"
     WHERE s."schoolId" IS NOT NULL AND p."leaderboardOptIn"
       AND EXISTS (SELECT 1 FROM "ClassMember" cm WHERE cm."userId" = a."userId")
     GROUP BY a."userId" ORDER BY count(*) DESC LIMIT 1`);
  const typical = await q1<{ userId: string }>(`
    SELECT x."userId" FROM (SELECT a."userId", count(*) AS n FROM "AssessmentAttempt" a GROUP BY 1) x
     ORDER BY abs(x.n - 7), x."userId" LIMIT 1`);
  const heavySubject = await q1<{ subjectId: string; syllabusId: string }>(
    `SELECT a."subjectId", e."syllabusId" FROM "AssessmentAttempt" a JOIN "SubjectEnrollment" e ON e."userId" = a."userId" AND e."subjectId" = a."subjectId"
      WHERE a."userId" = $1 GROUP BY 1, 2 ORDER BY count(*) DESC LIMIT 1`,
    [heavy.userId],
  );
  const heavyTopic = await q1<{ topicId: string }>(
    `SELECT "topicId" FROM "TopicMastery" WHERE "userId" = $1 AND "subjectId" = $2 AND "topicKind" = 'TOPIC' ORDER BY "questionsAttempted" DESC LIMIT 1`,
    [heavy.userId, heavySubject.subjectId],
  );
  const exam = await q1<{ userId: string; id: string }>(
    `SELECT "userId", id FROM "AssessmentAttempt" WHERE mode = 'MOCK_EXAM' AND status = 'IN_PROGRESS' ORDER BY "startedAt" DESC LIMIT 1`,
  );
  const cls = await q1<{ classId: string; teacherId: string; schoolId: string }>(`
    SELECT c.id AS "classId", ct."userId" AS "teacherId", c."schoolId" FROM "Class" c
      JOIN "ClassTeacher" ct ON ct."classId" = c.id AND ct.role = 'LEAD' AND ct."removedAt" IS NULL
     ORDER BY (SELECT count(*) FROM "ClassMember" m WHERE m."classId" = c.id) DESC LIMIT 1`);
  const schoolAdmin = await q1<{ userId: string }>(
    `SELECT "userId" FROM "SchoolMember" WHERE "schoolId" = $1 AND role = 'SCHOOL_ADMIN' AND status = 'ACTIVE' LIMIT 1`,
    [cls.schoolId],
  );
  const parent = await q1<{ parentId: string; childId: string }>(`
    SELECT l."parentUserId" AS "parentId", min(l."studentUserId"::text) AS "childId" FROM "ParentStudentLink" l
     WHERE l.status = 'ACTIVE' GROUP BY 1 HAVING count(*) = 2 ORDER BY 1 LIMIT 1`);
  const admin = await q1<{ id: string }>(`SELECT id FROM "User" WHERE "emailNormalized" = 'perf.superadmin@example.test'`);

  // --- services (imported after DATABASE_URL is set) -----------------------------------------------------------------
  const { loadActor } = await import("@/server/auth/actor");
  const { getStudentDashboard, getSubjectDashboard, getTopicProgress, refreshSubjectProgress } = await import("@/server/progress/service");
  const practice = await import("@/server/practice/service");
  const { answerAndMark } = await import("@/server/attempts/answer");
  const exams = await import("@/server/exams/service");
  const { getLeaderboard } = await import("@/server/leaderboards/service");
  const { computeLeaderboards } = await import("@/server/leaderboards/snapshot");
  const { getClassPerformance } = await import("@/server/teaching/analytics");
  const { getSchoolDashboard } = await import("@/server/schools/dashboard");
  const { getParentDashboard, getParentChildDetail } = await import("@/server/family");
  const { listUsers } = await import("@/server/cms/users/service");
  const { listQuestions } = await import("@/server/cms/questions/service");
  const { listPayments } = await import("@/server/cms/commerce/payments");
  const { search } = await import("@/server/search/query");
  const { computeDailyMetrics } = await import("@/server/analytics/rollups");
  const { claimJobs } = await import("@/server/lib/jobs");
  const { db } = await import("@/server/db");
  const { localDateString, isoWeekKey, addDays } = await import("@/lib/dates");

  const actorOf = async (userId: string) => {
    const actor = await loadActor(userId, { channel: "web" });
    if (!actor) throw new Error(`perf harness: cannot load actor ${userId}`);
    return actor;
  };
  const heavyActor = await actorOf(heavy.userId);
  const typicalActor = await actorOf(typical.userId);
  const examActor = await actorOf(exam.userId);
  const teacherActor = await actorOf(cls.teacherId);
  const schoolActor = await actorOf(schoolAdmin.userId);
  const parentActor = await actorOf(parent.parentId);
  const adminActor = await actorOf(admin.id);

  const now = new Date();
  const today = localDateString(now, "Africa/Harare");
  const viewer = { signedIn: true, canViewPremium: () => true, boostSubjectIds: [heavySubject.subjectId] };
  let practiceAttemptId: string | null = null;
  let pendingAnswer: { attemptId: string; position: number; response: unknown } | null = null;

  const scenarios: Scenario[] = [
    { name: "student.dashboard.heavy", run: () => getStudentDashboard(heavyActor) },
    { name: "student.dashboard.typical", run: () => getStudentDashboard(typicalActor) },
    { name: "subject.dashboard", run: () => getSubjectDashboard(heavyActor, heavySubject.subjectId) },
    { name: "topic.progress", run: () => getTopicProgress(heavyActor, heavyTopic.topicId) },
    { name: "practice.builder", run: () => practice.getPracticeBuilder(heavyActor, { subjectId: heavySubject.subjectId }) },
    {
      name: "practice.start",
      run: async () => {
        const started = await practice.startPracticeSession(heavyActor, { subjectId: heavySubject.subjectId, count: 10, difficulty: "ADAPTIVE" });
        practiceAttemptId = started.attemptId;
        return started;
      },
    },
    {
      name: "practice.state",
      run: async () => (practiceAttemptId ? practice.getSessionState(heavyActor, practiceAttemptId, { withLastAnswered: true }) : null),
    },
    {
      name: "practice.answer",
      // Measures answerAndMark alone (the per-answer write path); finding the next slot is unmeasured setup.
      setup: async () => {
        pendingAnswer = null;
        if (!practiceAttemptId) return;
        const slot = (await practice.getSessionState(heavyActor, practiceAttemptId)).current;
        if (!slot?.question) return;
        const response =
          slot.question.type === "TRUE_FALSE" ? { type: "TRUE_FALSE", value: true } : { type: "MULTIPLE_CHOICE", optionKeys: ["A"] };
        pendingAnswer = { attemptId: practiceAttemptId, position: slot.position, response };
      },
      run: async () => {
        if (!pendingAnswer) return null;
        const { attemptId, position, response } = pendingAnswer;
        return answerAndMark(heavyActor, attemptId, position, response, { timeSpentSeconds: 40 });
      },
    },
    {
      name: "practice.end",
      // Each run closes a fresh session with two answers (closing writes XP, stats, study session, rollup jobs).
      setup: async () => {
        const started = await practice.startPracticeSession(heavyActor, { subjectId: heavySubject.subjectId, count: 5, difficulty: "ADAPTIVE" });
        practiceAttemptId = started.attemptId;
        for (let i = 0; i < 2; i++) {
          const slot = (await practice.getSessionState(heavyActor, started.attemptId)).current;
          if (!slot?.question) break;
          const response =
            slot.question.type === "TRUE_FALSE" ? { type: "TRUE_FALSE", value: true } : { type: "MULTIPLE_CHOICE", optionKeys: ["A"] };
          await answerAndMark(heavyActor, started.attemptId, slot.position, response, { timeSpentSeconds: 30 });
        }
      },
      run: async () => {
        if (!practiceAttemptId) return null;
        const id = practiceAttemptId;
        practiceAttemptId = null;
        return practice.endPracticeSession(heavyActor, id);
      },
    },
    { name: "exam.room", run: () => exams.getExamRoom(examActor, exam.id) },
    { name: "exam.catalogue", run: () => exams.getExamCatalogue(heavyActor) },
    {
      name: "attempts.history",
      run: async () => {
        const first = await exams.listExamHistory(heavyActor, { limit: 20 });
        return first.nextCursor ? exams.listExamHistory(heavyActor, { limit: 20, cursor: first.nextCursor }) : first;
      },
    },
    { name: "leaderboard.global", run: () => getLeaderboard(heavyActor, { metric: "WEEKLY_XP", scope: "GLOBAL" }) },
    { name: "leaderboard.school", run: () => getLeaderboard(heavyActor, { metric: "WEEKLY_QUESTIONS", scope: "SCHOOL" }) },
    { name: "leaderboard.subject", run: () => getLeaderboard(heavyActor, { metric: "SUBJECT_MASTERY", scope: "SUBJECT", scopeId: heavySubject.subjectId }) },
    { name: "teacher.class", run: () => getClassPerformance(teacherActor, cls.classId) },
    {
      name: "school.dashboard",
      run: () => getSchoolDashboard(schoolActor, { schoolId: cls.schoolId, from: addDays(today, -29), to: today }),
    },
    { name: "parent.dashboard", run: () => getParentDashboard(parentActor) },
    { name: "parent.child", run: () => getParentChildDetail(parentActor, parent.childId) },
    {
      name: "admin.users",
      run: async () => {
        const page = await listUsers(adminActor, {});
        await listUsers(adminActor, { q: "moyo" });
        await listUsers(adminActor, { role: "TEACHER" });
        return page.nextCursor ? listUsers(adminActor, { cursor: page.nextCursor }) : page;
      },
    },
    {
      name: "admin.questions",
      run: async () => {
        await listQuestions(adminActor, {});
        await listQuestions(adminActor, { status: "PUBLISHED", subjectId: heavySubject.subjectId });
        return listQuestions(adminActor, { q: "electricity" });
      },
    },
    {
      name: "admin.payments",
      run: async () => {
        const page = await listPayments(adminActor, {});
        await listPayments(adminActor, { status: "FAILED" });
        await listPayments(adminActor, { provider: "paynow", from: addDays(today, -30), to: today });
        await listPayments(adminActor, { q: "perf.s12" });
        return page.nextCursor ? listPayments(adminActor, { cursor: page.nextCursor }) : page;
      },
    },
    {
      name: "search",
      run: async () => {
        await search({ q: "algebra" }, viewer);
        await search({ q: "rates of reaction practice" }, viewer);
        return search({ q: "electricity" }, viewer);
      },
    },
    { name: "analytics.daily", run: () => computeDailyMetrics(addDays(today, -1), { now }) },
    { name: "jobs.claim", run: () => claimJobs(`perf-harness-${LABEL}`, "rollups", 10) },
    { name: "progress.rollup", run: () => refreshSubjectProgress(db, heavy.userId, heavySubject.subjectId) },
    { name: "leaderboard.snapshot", run: () => computeLeaderboards(isoWeekKey(today), { now }) },
  ];

  const selected = ONLY ? scenarios.filter((s) => ONLY.some((o) => s.name.startsWith(o))) : scenarios;
  const logStart = statSync(PG_LOG).size;
  const wall: { scenario: string; run: number; ms: number; error?: string }[] = [];
  for (const scenario of selected) {
    for (let run = 1; run <= RUNS; run++) {
      if (scenario.setup) await scenario.setup();
      await mark(`begin:${scenario.name}:${run}`);
      const started = performance.now();
      try {
        await scenario.run(run);
        wall.push({ scenario: scenario.name, run, ms: performance.now() - started });
      } catch (error) {
        wall.push({ scenario: scenario.name, run, ms: performance.now() - started, error: error instanceof Error ? error.message : String(error) });
      }
      await mark(`end:${scenario.name}:${run}`);
    }
  }

  await owner.query(`UPDATE "User" SET "isDemo" = true WHERE NOT "isDemo"`);
  await owner.query(`UPDATE "School" SET "isDemo" = true WHERE NOT "isDemo"`);
  await owner.end();
  await db.$disconnect();

  // --- report -------------------------------------------------------------------------------------------------------
  const plans = parsePlans(readAppended(PG_LOG, logStart));
  const statements: StatementReport[] = [];
  let scenario: string | null = null;
  let run = 0;
  for (const plan of plans) {
    const marker = /perf:mark:(begin|end):([^:']+):(\d+)/.exec(plan.query);
    if (marker) {
      scenario = marker[1] === "begin" ? (marker[2] ?? null) : null;
      run = Number(marker[3]);
      continue;
    }
    if (/perf:mark:/.test(plan.query) || scenario === null) continue;
    statements.push(analyse(scenario, run, plan, largeTables));
  }
  writeFileSync(path.join(OUT_DIR, `${LABEL}.json`), JSON.stringify({ label: LABEL, runs: RUNS, wall, statements }, null, 2));

  console.log(`\n[perf] ${LABEL}: ${statements.length} statements captured; report ${path.join(OUT_DIR, `${LABEL}.json`)}\n`);
  for (const s of selected) {
    const lastRun = Math.max(...wall.filter((w) => w.scenario === s.name).map((w) => w.run));
    const w = wall.find((x) => x.scenario === s.name && x.run === lastRun);
    const stmts = statements.filter((x) => x.scenario === s.name && x.run === lastRun);
    const dbMs = stmts.reduce((sum, x) => sum + x.durationMs, 0);
    const worst = [...stmts].sort((a, b) => b.durationMs - a.durationMs)[0];
    const flagged = stmts.filter((x) => x.flags.length > 0);
    console.log(
      `${s.name.padEnd(28)} wall ${w ? w.ms.toFixed(1).padStart(8) : "     n/a"} ms  db ${dbMs.toFixed(1).padStart(8)} ms  stmts ${String(stmts.length).padStart(3)}  worst ${worst ? worst.durationMs.toFixed(2) : "-"} ms${w?.error ? `  ERROR ${w.error}` : ""}`,
    );
    for (const f of flagged) console.log(`    ! ${f.flags.join(",")} ${f.durationMs.toFixed(2)} ms rows=${f.rows} :: ${f.query.slice(0, 160)}`);
  }
}

main().catch((error: unknown) => {
  console.error("[perf] FAILED:", error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 1;
});
