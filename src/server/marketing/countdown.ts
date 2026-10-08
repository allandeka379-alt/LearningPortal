import "server-only";
import type { CatalogueStatus } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { dateColumnFromLocalDate, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { LISTED_CATALOGUE_STATUSES } from "@/server/curriculum/core";
import { db, type DbClient } from "@/server/db";
import { isProd } from "@/server/lib/env";
import type { CatalogueScope } from "./catalogue";
import { qualificationLabel } from "./catalogue-core";

/**
 * Data for the free exam countdown tool (§17, §46): PUBLISHED examination sessions of listed qualifications that have not
 * ended yet. Dates are admin-entered and stay `isProvisional` until confirmed against the board's official timetable;
 * the UI labels them. Dev-seed demo sessions (`isDemo`) never appear in production and are flagged in development.
 */

const LISTED: { in: CatalogueStatus[] } = { in: [...LISTED_CATALOGUE_STATUSES] };
const MAX_SESSIONS = 300;

export interface CountdownSession {
  id: string;
  name: string;
  /** First exam day (`YYYY-MM-DD`): the countdown target. */
  startsOn: LocalDate;
  endsOn: LocalDate;
  isProvisional: boolean;
  isDemo: boolean;
  /** The board's published timetable, when an editor recorded it. */
  sourceUrl: string | null;
}

export interface CountdownQualification {
  id: string;
  /** "ZIMSEC O-Level". */
  label: string;
  sessions: CountdownSession[];
}

export interface CountdownBoard {
  slug: string;
  shortName: string;
  qualifications: CountdownQualification[];
}

/** The fields of one session row the grouping needs (pure input). */
export interface CountdownSessionRow {
  id: string;
  name: string;
  startsOn: LocalDate;
  endsOn: LocalDate;
  isProvisional: boolean;
  isDemo: boolean;
  sourceUrl: string | null;
  qualification: { id: string; shortName: string; sortOrder: number; board: { slug: string; shortName: string; sortOrder: number } };
}

/** Groups session rows into boards → qualifications → sessions (date order); boards and qualifications in admin order. */
export function groupCountdownSessions(rows: readonly CountdownSessionRow[]): CountdownBoard[] {
  const sorted = [...rows].sort(
    (a, b) =>
      a.qualification.board.sortOrder - b.qualification.board.sortOrder ||
      a.qualification.board.slug.localeCompare(b.qualification.board.slug, "en") ||
      a.qualification.sortOrder - b.qualification.sortOrder ||
      a.qualification.shortName.localeCompare(b.qualification.shortName, "en") ||
      a.startsOn.localeCompare(b.startsOn) ||
      a.name.localeCompare(b.name, "en"),
  );
  const boards = new Map<string, CountdownBoard>();
  const qualifications = new Map<string, CountdownQualification>();
  for (const row of sorted) {
    const boardKey = row.qualification.board.slug;
    let board = boards.get(boardKey);
    if (!board) {
      board = { slug: boardKey, shortName: row.qualification.board.shortName, qualifications: [] };
      boards.set(boardKey, board);
    }
    let qualification = qualifications.get(row.qualification.id);
    if (!qualification) {
      qualification = { id: row.qualification.id, label: qualificationLabel(row.qualification.board.shortName, row.qualification.shortName), sessions: [] };
      qualifications.set(row.qualification.id, qualification);
      board.qualifications.push(qualification);
    }
    qualification.sessions.push({
      id: row.id,
      name: row.name,
      startsOn: row.startsOn,
      endsOn: row.endsOn,
      isProvisional: row.isProvisional,
      isDemo: row.isDemo,
      sourceUrl: row.sourceUrl,
    });
  }
  return [...boards.values()];
}

/** Upcoming and in-progress sessions (ended before today excluded), grouped for the countdown picker. */
export async function getCountdownCatalogue(now: Date = new Date(), scope: CatalogueScope = {}, client: DbClient = db): Promise<CountdownBoard[]> {
  const today = localDateString(now, DEFAULT_TIMEZONE);
  const rows = await client.examSession.findMany({
    where: {
      status: "PUBLISHED",
      endsOn: { gte: dateColumnFromLocalDate(today) },
      ...(isProd() ? { isDemo: false } : {}),
      qualification: {
        catalogueStatus: LISTED,
        examBoard: { catalogueStatus: LISTED },
        ...(scope.examBoardIds ? { examBoardId: { in: [...scope.examBoardIds] } } : {}),
      },
    },
    select: {
      id: true,
      name: true,
      startsOn: true,
      endsOn: true,
      isProvisional: true,
      isDemo: true,
      sourceUrl: true,
      qualification: {
        select: { id: true, shortName: true, sortOrder: true, examBoard: { select: { slug: true, shortName: true, sortOrder: true } } },
      },
    },
    orderBy: [{ startsOn: "asc" }],
    take: MAX_SESSIONS,
  });
  return groupCountdownSessions(
    rows.map((row) => ({
      id: row.id,
      name: row.name,
      startsOn: localDateFromDateColumn(row.startsOn),
      endsOn: localDateFromDateColumn(row.endsOn),
      isProvisional: row.isProvisional,
      isDemo: row.isDemo,
      sourceUrl: safeHttpUrl(row.sourceUrl),
      qualification: {
        id: row.qualification.id,
        shortName: row.qualification.shortName,
        sortOrder: row.qualification.sortOrder,
        board: row.qualification.examBoard,
      },
    })),
  );
}

/** Only http(s) links are rendered as external links (an editor typo must never become a `javascript:` URL). */
export function safeHttpUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}
