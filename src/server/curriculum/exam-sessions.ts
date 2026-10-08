import "server-only";
import { dateColumnFromLocalDate, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { db, type DbClient } from "@/server/db";

/**
 * Examination sessions (§5 "Target examination", §17 exam countdown). Dates are entered by admins and stay
 * `isProvisional` until confirmed against the board's official timetable: the UI must label provisional dates.
 * `isDemo` sessions exist only in development seeds (the database refuses them in production) and must never drive a
 * real countdown.
 */

export interface ExamSessionSummary {
  id: string;
  qualificationId: string;
  name: string;
  seriesCode: string;
  year: number;
  /** First exam day (`YYYY-MM-DD`), the default countdown target. */
  startsOn: LocalDate;
  endsOn: LocalDate;
  isProvisional: boolean;
  isDemo: boolean;
  sourceUrl: string | null;
}

/**
 * PUBLISHED sessions of a qualification that have not ended before `from` (default: today in Africa/Harare), in date
 * order. A session in progress (started, not yet ended) is included.
 */
export async function getExamSessions(
  qualificationId: string,
  from: Date | LocalDate = new Date(),
  client: DbClient = db,
): Promise<ExamSessionSummary[]> {
  const fromDate = typeof from === "string" ? from : localDateString(from);
  const rows = await client.examSession.findMany({
    where: { qualificationId, status: "PUBLISHED", endsOn: { gte: dateColumnFromLocalDate(fromDate) } },
    select: {
      id: true,
      qualificationId: true,
      name: true,
      seriesCode: true,
      year: true,
      startsOn: true,
      endsOn: true,
      isProvisional: true,
      isDemo: true,
      sourceUrl: true,
    },
    orderBy: [{ startsOn: "asc" }, { seriesCode: "asc" }],
  });
  return rows.map((row) => ({
    ...row,
    startsOn: localDateFromDateColumn(row.startsOn),
    endsOn: localDateFromDateColumn(row.endsOn),
  }));
}
