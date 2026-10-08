import type { PrismaClient } from "@/generated/prisma/client";
import { localDateString } from "@/lib/dates";
import type { CatalogueIds } from "../catalogue";
import { CHEMISTRY_DEMO } from "../data/demo/chemistry";
import { DEMO_FAQ } from "../data/demo/faq";
import { MATHS_DEMO } from "../data/demo/maths";
import type { PlatformIds } from "../platform";
import type { SeedLog, SeedTally } from "../util";
import { seedDemoSubject, type DemoActors } from "./content";
import { seedDemoExamSessions } from "./exam-sessions";
import { ensureDemoEnrollment, seedDemoClass, seedDemoPeople } from "./people";
import { seedDemoPrices } from "./prices";
import { seedDemoRosterAndWork } from "./roster";

/**
 * DEV-ONLY demo data (§50, CLAUDE.md rule 6): provisional exam sessions, sample prices, demo accounts for every role, a
 * demo school + class + parent link, a provisioned roster with class work (./roster), and demo content for ZIMSEC O-Level Mathematics and Cambridge IGCSE Chemistry
 * under the "Demo content — development only" source. Everything is `isDemo` (the database refuses demo rows when
 * `app.environment = 'production'`).
 */

export const DEMO_SOURCE = {
  slug: "demo-content-development-only",
  name: "Demo content — development only",
  type: "ORIGINAL",
  licenceCode: "PROPRIETARY",
  permitsCommercialUse: false,
  permitsDerivatives: true,
  permitsPdfExport: false,
  notes: "Demo lessons, questions and flashcards written for local development and testing. Never used in production.",
  isDemo: true,
} as const;

/** Days of daily questions scheduled from today (§46). */
export const DEMO_DAILY_DAYS = 14;

export async function seedDemo(
  db: PrismaClient,
  input: { catalogue: CatalogueIds; platform: PlatformIds; now: Date; password?: string },
  tally: SeedTally,
  log: SeedLog,
): Promise<void> {
  const today = localDateString(input.now, "Africa/Harare");
  const sessions = await seedDemoExamSessions(db, input.catalogue, today, tally, log);
  await seedDemoPrices(db, input.platform, tally, log);

  const track = (board: string, qualification: string, series: string) => {
    const countryId = input.catalogue.countries.get("ZW");
    const examBoardId = input.catalogue.boards.get(board);
    const qualificationId = input.catalogue.qualifications.get(`${board}/${qualification}`);
    const yearGroupId = input.catalogue.yearGroups.get("ZW/F4");
    if (!countryId || !examBoardId || !qualificationId || !yearGroupId) throw new Error(`demo: catalogue incomplete for ${board}/${qualification}`);
    const session = [...sessions.entries()].find(([key]) => key.startsWith(`${board}/${qualification}/`) && key.endsWith(`-${series}`));
    return { countryId, examBoardId, qualificationId, yearGroupId, targetExamSessionId: session?.[1] ?? null };
  };
  const tracks = { student: track("zimsec", "o-level", "NOV"), student2: track("cambridge", "igcse", "ON") };
  const people = await seedDemoPeople(db, { catalogue: input.catalogue, tracks, ...(input.password ? { password: input.password } : {}) }, tally, log);

  const existingSource = await db.contentSource.findUnique({ where: { slug: DEMO_SOURCE.slug }, select: { id: true } });
  const demoSource = existingSource ?? (await db.contentSource.create({ data: { ...DEMO_SOURCE }, select: { id: true } }));
  tally.add("ContentSource", !existingSource);

  const actors: DemoActors = {
    editor: { kind: "user", userId: people.editor, roles: ["CONTENT_EDITOR"] },
    approver: { kind: "user", userId: people.admin, roles: ["ADMIN"] },
  };
  const maths = await seedDemoSubject(db, { data: MATHS_DEMO, catalogue: input.catalogue, demoSourceId: demoSource.id, actors, today, dailyDays: DEMO_DAILY_DAYS }, tally, log);
  const chemistry = await seedDemoSubject(db, { data: CHEMISTRY_DEMO, catalogue: input.catalogue, demoSourceId: demoSource.id, actors, today, dailyDays: DEMO_DAILY_DAYS }, tally, log);

  await ensureDemoEnrollment(db, { userId: people.student, subjectId: maths.subjectId, syllabusId: maths.syllabusId, targetExamSessionId: tracks.student.targetExamSessionId, targetGrade: "B" }, tally);
  await ensureDemoEnrollment(
    db,
    { userId: people.student2, subjectId: chemistry.subjectId, syllabusId: chemistry.syllabusId, targetExamSessionId: tracks.student2.targetExamSessionId, targetGrade: "A" },
    tally,
  );
  await seedDemoClass(db, { people, subjectId: maths.subjectId, qualificationId: maths.qualificationId, yearGroupId: tracks.student.yearGroupId }, tally);
  await seedDemoRosterAndWork(
    db,
    { people, countryId: tracks.student.countryId, yearGroupId: tracks.student.yearGroupId, subjectId: maths.subjectId, syllabusId: maths.syllabusId, now: input.now },
    tally,
    log,
  );

  for (const item of DEMO_FAQ) {
    const existing = await db.faqItem.findFirst({ where: { question: item.question, isDemo: true }, select: { id: true } });
    if (!existing) {
      await db.faqItem.create({ data: { ...item, locale: "en", isPublished: true, publishedAt: input.now, isDemo: true } });
    }
    tally.add("FaqItem", !existing);
  }
  log.info("demo: content, enrolments, class and FAQ ready");
}
