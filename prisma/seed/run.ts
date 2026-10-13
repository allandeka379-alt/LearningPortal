import type { PrismaClient } from "@/generated/prisma/client";
import type { ReindexAllReport } from "@/server/search/indexer";
import { seedCatalogue } from "./catalogue";
import { seedDemo } from "./demo";
import { seedPlatform } from "./platform";
import { seedTeamAccessAccounts } from "./team-access";
import { consoleLog, SeedTally, type SeedLog } from "./util";

/**
 * Seed orchestration (§2, §4, §31, §47, §50). ALWAYS (every environment): catalogue, plans without prices,
 * achievements, settings, the "Original content" source. DEMO (development only, `--demo` or SEED_DEMO=1): see
 * ./demo, then a full search reindex so /app/search finds the demo content. Every step is idempotent (create-if-missing by natural key), so the seed can run any number of times.
 */

export interface SeedOptions {
  demo: boolean;
  log?: SeedLog;
  now?: Date;
  /** Dev-only demo password override (SEED_DEMO_PASSWORD). */
  password?: string;
  /** NODE_ENV of the process (default process.env.NODE_ENV). */
  nodeEnv?: string;
  /**
   * Rebuilds the search index after the demo data (default: `reindexAll` from src/server/search/indexer). The seed
   * writes rows directly, not through the publish flows that enqueue `search.reindexEntity` jobs, so without this
   * /app/search would find nothing until the weekly `search.reindexAll` run. Injected by tests.
   */
  reindexSearch?: (db: PrismaClient) => Promise<ReindexAllReport>;
}

export interface SeedResult {
  tally: SeedTally;
  counts: Record<string, number>;
}

/** Refuses demo data unless this is clearly a development database (two independent checks). */
export async function assertDemoAllowed(db: PrismaClient, nodeEnv: string | undefined): Promise<void> {
  if (nodeEnv === "production") throw new Error("Refusing to seed demo data: NODE_ENV is production.");
  const rows = await db.$queryRaw<{ env: string | null }[]>`SELECT current_setting('app.environment', true) AS "env"`;
  if (rows[0]?.env === "production") {
    throw new Error("Refusing to seed demo data: the database is configured with app.environment = 'production'.");
  }
}

/** Row counts of the seeded tables (for the run summary). */
export async function seedCounts(db: PrismaClient): Promise<Record<string, number>> {
  const entries: [string, Promise<number>][] = [
    ["Country", db.country.count()],
    ["ExamBoard", db.examBoard.count()],
    ["ExamBoardCountry", db.examBoardCountry.count()],
    ["QualificationLevel", db.qualificationLevel.count()],
    ["Qualification", db.qualification.count()],
    ["YearGroup", db.yearGroup.count()],
    ["SubjectCategory", db.subjectCategory.count()],
    ["Subject", db.subject.count()],
    ["GradeScheme", db.gradeScheme.count()],
    ["GradeBand", db.gradeBand.count()],
    ["Plan", db.plan.count()],
    ["PlanPrice", db.planPrice.count()],
    ["Achievement", db.achievement.count()],
    ["Setting", db.setting.count()],
    ["ContentSource", db.contentSource.count()],
    ["ExamSession", db.examSession.count()],
    ["User", db.user.count()],
    ["MarketingEvent", db.marketingEvent.count()],
    ["School", db.school.count()],
    ["Class", db.class.count()],
    ["ParentStudentLink", db.parentStudentLink.count()],
    ["SubjectEnrollment", db.subjectEnrollment.count()],
    ["Syllabus", db.syllabus.count()],
    ["SyllabusComponent", db.syllabusComponent.count()],
    ["Topic", db.topic.count()],
    ["LearningObjective", db.learningObjective.count()],
    ["MediaAsset", db.mediaAsset.count()],
    ["Question (roots)", db.question.count({ where: { parentId: null } })],
    ["Question (parts)", db.question.count({ where: { parentId: { not: null } } })],
    ["QuestionOption", db.questionOption.count()],
    ["Lesson", db.lesson.count()],
    ["Flashcard", db.flashcard.count()],
    ["Assessment", db.assessment.count()],
    ["AssessmentItem", db.assessmentItem.count()],
    ["DailyQuestion", db.dailyQuestion.count()],
    ["ContentRevision", db.contentRevision.count()],
    ["FaqItem", db.faqItem.count()],
  ];
  const values = await Promise.all(entries.map(([, count]) => count));
  return Object.fromEntries(entries.map(([label], index) => [label, values[index] ?? 0]));
}

/** Full search rebuild (loaded lazily: the ALWAYS seed never needs the search module). */
async function reindexSearchIndex(db: PrismaClient): Promise<ReindexAllReport> {
  const { reindexAll } = await import("@/server/search/indexer");
  return reindexAll({ client: db });
}

/** One log line for a search rebuild, e.g. "search index rebuilt in 1.2 s: 140 documents written, 0 removed". */
export function describeReindex(report: ReindexAllReport): string {
  const totals = Object.values(report.types).reduce(
    (sum, type) => ({ written: sum.written + (type?.written ?? 0), removed: sum.removed + (type?.removed ?? 0) }),
    { written: 0, removed: 0 },
  );
  const seconds = (report.durationMs / 1000).toFixed(1);
  return `search index ${report.aborted ? "rebuild ABORTED" : "rebuilt"} in ${seconds} s: ${totals.written} documents written, ${totals.removed} removed`;
}

export async function runSeed(db: PrismaClient, options: SeedOptions): Promise<SeedResult> {
  const log = options.log ?? consoleLog;
  const tally = new SeedTally();
  const now = options.now ?? new Date();
  if (options.demo) await assertDemoAllowed(db, options.nodeEnv ?? process.env.NODE_ENV);

  const catalogue = await seedCatalogue(db, tally, log);
  const platform = await seedPlatform(db, tally, log);
  await seedTeamAccessAccounts(db, catalogue, now, tally, log);
  if (options.demo) {
    await seedDemo(db, { catalogue, platform, now, ...(options.password ? { password: options.password } : {}) }, tally, log);
    const report = await (options.reindexSearch ?? reindexSearchIndex)(db);
    if (report.aborted) log.warn(describeReindex(report));
    else log.info(describeReindex(report));
  } else {
    log.info("demo data skipped (run with --demo or SEED_DEMO=1 in development)");
  }
  const counts = await seedCounts(db);
  log.info(`created this run: ${tally.summary()}`);
  return { tally, counts };
}
