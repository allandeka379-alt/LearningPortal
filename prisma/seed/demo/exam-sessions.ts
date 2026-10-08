import type { PrismaClient } from "@/generated/prisma/client";
import { dateColumnFromLocalDate } from "@/lib/dates";
import { EXAM_SERIES, type CatalogueExamSeries } from "../data/catalogue";
import type { CatalogueIds } from "../catalogue";
import { firstDayOfMonth, lastDayOfMonth, type SeedLog, type SeedTally } from "../util";

/**
 * DEV ONLY: provisional exam sessions so onboarding (§5 target exam) and the countdown (§17) can be exercised. Every row
 * is `isProvisional` and `isDemo` (the database refuses demo rows in production, and a demo date must never drive a
 * real countdown). Dates come from each series' TYPICAL months in catalogue.ts, not from any official timetable.
 */

export interface PlannedSession {
  seriesCode: string;
  year: number;
  name: string;
  startsOn: string;
  endsOn: string;
}

/**
 * The next `count` sessions of a series that have not ended by `today` (pure), e.g. on 2026-10-05 a November series
 * yields November 2026 (in progress) and November 2027.
 */
export function plannedSessions(series: CatalogueExamSeries, today: string, count = 2): PlannedSession[] {
  const startYear = Number(today.slice(0, 4));
  const out: PlannedSession[] = [];
  for (let year = startYear; out.length < count && year <= startYear + count + 1; year += 1) {
    const endsOn = lastDayOfMonth(year, series.typicalEndMonth);
    if (endsOn < today) continue;
    out.push({
      seriesCode: `${year}-${series.seriesCode}`,
      year,
      name: `${series.label} ${year}`,
      startsOn: firstDayOfMonth(year, series.typicalStartMonth),
      endsOn,
    });
  }
  return out;
}

/** Creates the provisional demo sessions; returns their ids keyed `<board>/<qualification>/<seriesCode>`. */
export async function seedDemoExamSessions(db: PrismaClient, catalogue: CatalogueIds, today: string, tally: SeedTally, log: SeedLog): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  for (const series of EXAM_SERIES) {
    const qualificationKey = `${series.boardSlug}/${series.qualificationSlug}`;
    const qualificationId = catalogue.qualifications.get(qualificationKey);
    if (!qualificationId) continue;
    for (const session of plannedSessions(series, today)) {
      const existing = await db.examSession.findUnique({
        where: { qualificationId_seriesCode: { qualificationId, seriesCode: session.seriesCode } },
        select: { id: true },
      });
      const row =
        existing ??
        (await db.examSession.create({
          data: {
            qualificationId,
            name: session.name,
            seriesCode: session.seriesCode,
            year: session.year,
            startsOn: dateColumnFromLocalDate(session.startsOn),
            endsOn: dateColumnFromLocalDate(session.endsOn),
            isProvisional: true,
            status: "PUBLISHED",
            isDemo: true,
            notes: "Development demo session: provisional dates from the series' typical months, not an official timetable.",
          },
          select: { id: true },
        }));
      tally.add("ExamSession", !existing);
      ids.set(`${qualificationKey}/${session.seriesCode}`, row.id);
    }
  }
  log.info(`demo: ${ids.size} provisional exam sessions`);
  return ids;
}
