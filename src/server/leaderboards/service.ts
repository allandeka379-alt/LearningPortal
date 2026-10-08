import "server-only";
import { Prisma, type LeaderboardDisplay, type LeaderboardMetric, type LeaderboardScope, type Role } from "@/generated/prisma/client";
import { localDateString, type LocalDate } from "@/lib/dates";
import { leaderboardDisplayName } from "@/server/accounts/student-settings";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { hasPermission } from "@/server/auth/permissions";
import { hasEntitlement } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { loadMinorConsentFacts, publicSharingAllowed } from "@/server/family/consent-gate";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import {
  DEFAULT_MIN_MOCKS,
  LEADERBOARD_METRICS,
  METRIC_SCOPES,
  boardDisplayName,
  currentPeriods,
  denseRanks,
  effectiveBoardDisplay,
  isLeaderboardMetric,
  isLeaderboardScope,
  monthRange,
  periodKeyFor,
  previousWeekKey,
  weekRange,
} from "./core";
import { pseudonymFor } from "./pseudonym";
import { PLATFORM_TIMEZONE, computeLeaderboards, currentWeekKey } from "./snapshot";

/**
 * Leaderboard read model (§20) for /app/leaderboard. Scores come from the snapshot rows only (./snapshot); ranks are
 * dense and computed here from the board index: top N by `value DESC`, and "my rank" = 1 + the number of distinct
 * higher scores (an index range count), so the student always sees their own position even outside the top N.
 *
 * Privacy (§20, ARCHITECTURE §5.12): names are resolved at READ time from each student's own display mode
 * (real name / first name / username / anonymous pseudonym) — never an email, phone or school name. Rows of students
 * who are not opted in are never shown (filtered here too, in case a snapshot raced an opt-out). A student may only
 * view boards of scopes they belong to (their country, schools, classes and enrolled subjects). A minor without GRANTED
 * guardian consent never appears under their full name: REAL_NAME is shown as first name + initial (MIN-01,
 * `effectiveBoardDisplay`), checked at read time so a withdrawal applies at once.
 */

export const LEADERBOARD_TOP_N = 20;

const DISPLAY_MODES = ["ANONYMOUS", "USERNAME", "FIRST_NAME", "REAL_NAME"] as const satisfies readonly LeaderboardDisplay[];

/** The reading user. Structurally satisfied by the auth `Actor`. */
export interface LeaderboardActor {
  userId: string;
  roles: readonly Role[];
  timeZone?: string;
}

export interface ScopeOption {
  scope: LeaderboardScope;
  scopeId: string | null;
  /** Shown to the student only (their own country / school / class / subject). */
  label: string;
}

export interface LeaderboardRow {
  rank: number;
  name: string;
  value: number;
  isMe: boolean;
}

export interface LeaderboardPeriod {
  kind: "WEEK" | "MONTH" | "LIVE";
  key: string;
  startsOn: LocalDate | null;
  endsOn: LocalDate | null;
}

export interface LeaderboardView {
  /** Plan includes leaderboards (`leaderboards` entitlement). */
  entitled: boolean;
  optedIn: boolean;
  display: LeaderboardDisplay;
  /** How the student appears on boards in their current mode. */
  myName: string;
  /** How the student would appear in each mode; null = the mode is unavailable (no first name / username, or consent). */
  previews: Record<LeaderboardDisplay, string | null>;
  /** The student is a minor without GRANTED guardian consent, so REAL_NAME is unavailable (MIN-01). */
  realNameNeedsConsent: boolean;
  metric: LeaderboardMetric;
  metrics: readonly LeaderboardMetric[];
  scope: ScopeOption;
  /** Scopes available for the selected metric. */
  scopes: ScopeOption[];
  period: LeaderboardPeriod;
  rows: LeaderboardRow[];
  /** The student's own standing; null when not on this board (not opted in, or no score yet). */
  me: { rank: number; value: number; inTop: boolean; lastWeekRank: number | null } | null;
  total: number;
  /** When a score on this board last changed. */
  updatedAt: Date | null;
  minMocks: number;
}

export interface LeaderboardQuery {
  metric?: unknown;
  scope?: unknown;
  scopeId?: unknown;
}

function assertStudent(actor: LeaderboardActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) throw AppError.forbidden("Leaderboards are for students.");
}

/** Stable "Student #1234" for a user (keyed digest, so the label cannot be reversed to an id). See ./pseudonym. */
export { pseudonymFor } from "./pseudonym";

function periodOf(metric: LeaderboardMetric, periodKey: string): LeaderboardPeriod {
  if (metric === "WEEKLY_XP" || metric === "WEEKLY_QUESTIONS") {
    const { start, end } = weekRange(periodKey);
    return { kind: "WEEK", key: periodKey, startsOn: start, endsOn: end };
  }
  if (metric === "MOCK_AVERAGE") {
    const { start } = monthRange(periodKey);
    return { kind: "MONTH", key: periodKey, startsOn: start, endsOn: null };
  }
  return { kind: "LIVE", key: periodKey, startsOn: null, endsOn: null };
}

/** The scopes the student belongs to, labelled for them (one query per membership kind). */
async function loadScopeOptions(userId: string, countryId: string | null): Promise<{ all: ScopeOption[]; classSubjects: Map<string, string | null> }> {
  const [country, schools, classes, enrolments] = await Promise.all([
    countryId ? db.country.findUnique({ where: { id: countryId }, select: { id: true, name: true } }) : Promise.resolve(null),
    db.schoolMember.findMany({
      where: { userId, role: "STUDENT", status: "ACTIVE", school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } },
      select: { school: { select: { id: true, name: true } } },
      orderBy: { createdAt: "asc" },
    }),
    db.classMember.findMany({
      where: { userId, status: "ACTIVE", class: { archivedAt: null } },
      select: { class: { select: { id: true, name: true, subjectId: true } } },
      orderBy: { joinedAt: "asc" },
    }),
    db.subjectEnrollment.findMany({
      where: { userId, status: "ACTIVE" },
      select: { subject: { select: { id: true, name: true, qualification: { select: { shortName: true } } } } },
      orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
    }),
  ]);
  const all: ScopeOption[] = [{ scope: "GLOBAL", scopeId: null, label: "Everyone" }];
  if (country) all.push({ scope: "COUNTRY", scopeId: country.id, label: country.name });
  for (const { school } of schools) all.push({ scope: "SCHOOL", scopeId: school.id, label: school.name });
  for (const { class: cls } of classes) all.push({ scope: "CLASS", scopeId: cls.id, label: cls.name });
  for (const { subject } of enrolments) all.push({ scope: "SUBJECT", scopeId: subject.id, label: `${subject.qualification.shortName} ${subject.name}` });
  return { all, classSubjects: new Map(classes.map(({ class: cls }) => [cls.id, cls.subjectId])) };
}

/** Scope options for a metric (subject mastery in classes only when the class teaches a subject). */
export function scopesForMetric(metric: LeaderboardMetric, all: readonly ScopeOption[], classSubjects: ReadonlyMap<string, string | null>): ScopeOption[] {
  return all.filter((option) => {
    if (!METRIC_SCOPES[metric].includes(option.scope)) return false;
    if (metric === "SUBJECT_MASTERY" && option.scope === "CLASS") return Boolean(option.scopeId && classSubjects.get(option.scopeId));
    return true;
  });
}

/**
 * Rows shown on a board: opted-in, ACTIVE accounts only. The hourly snapshot already removes everyone else; this also
 * hides a student who opted out, was suspended or asked for deletion since the last snapshot.
 */
function boardWhere(metric: LeaderboardMetric, periodKey: string, scope: ScopeOption): Prisma.LeaderboardEntryWhereInput {
  return {
    metric,
    periodKey,
    scopeType: scope.scope,
    scopeId: scope.scopeId,
    user: { status: "ACTIVE", profile: { is: { leaderboardOptIn: true } } },
  };
}

/** Dense rank of `value` on a board: 1 + distinct higher scores among opted-in, active students. */
async function rankOf(metric: LeaderboardMetric, periodKey: string, scope: ScopeOption, value: number): Promise<number> {
  const scopeCondition = scope.scopeId === null ? Prisma.sql`e."scopeId" IS NULL` : Prisma.sql`e."scopeId" = ${scope.scopeId}::uuid`;
  const rows = await db.$queryRaw<{ higher: number }[]>`
    SELECT count(DISTINCT e."value")::int AS "higher"
      FROM "LeaderboardEntry" e
      JOIN "Profile" p ON p."userId" = e."userId" AND p."leaderboardOptIn"
      JOIN "User" u ON u."id" = e."userId" AND u."status" = 'ACTIVE'
     WHERE e."metric" = ${metric}::"LeaderboardMetric" AND e."periodKey" = ${periodKey}
       AND e."scopeType" = ${scope.scope}::"LeaderboardScope" AND ${scopeCondition}
       AND e."value" > ${value}`;
  return 1 + (rows[0]?.higher ?? 0);
}

/**
 * The leaderboard page model: metric and scope tabs (only the student's own scopes), the top N with names in each
 * student's chosen mode, and the student's own rank even outside the top N.
 *
 * @throws AppError FORBIDDEN for non-students.
 */
export async function getLeaderboard(
  actor: LeaderboardActor,
  query: LeaderboardQuery = {},
  now: Date = new Date(),
  options: { topN?: number } = {},
): Promise<LeaderboardView> {
  const topN = Math.max(1, Math.min(100, options.topN ?? LEADERBOARD_TOP_N));
  assertStudent(actor);
  const userId = actor.userId;
  const [profile, student, entitled] = await Promise.all([
    db.profile.findUnique({
      where: { userId },
      select: { leaderboardOptIn: true, leaderboardDisplay: true, firstName: true, lastName: true, username: true, countryId: true },
    }),
    db.student.findUnique({ where: { userId }, select: { countryId: true, isMinor: true, guardianConsentStatus: true } }),
    hasEntitlement(actor, "leaderboards"),
  ]);
  // Boards are shared, so everyone looks at the same platform week / month (the snapshot's calendar).
  const today = localDateString(now, PLATFORM_TIMEZONE);
  const { all, classSubjects } = await loadScopeOptions(userId, student?.countryId ?? profile?.countryId ?? null);

  const metric: LeaderboardMetric = isLeaderboardMetric(query.metric) ? query.metric : "WEEKLY_XP";
  const scopes = scopesForMetric(metric, all, classSubjects);
  const requestedScope = isLeaderboardScope(query.scope) ? query.scope : null;
  const requestedId = typeof query.scopeId === "string" && query.scopeId !== "" ? query.scopeId : null;
  // Only the student's own scopes can be viewed; anything else falls back to the first available board.
  const scope =
    scopes.find((s) => s.scope === requestedScope && (requestedId === null ? true : s.scopeId === requestedId)) ??
    scopes[0] ?? { scope: "GLOBAL", scopeId: null, label: "Everyone" };

  const periodKey = periodKeyFor(metric, currentPeriods(today));
  const realNameAllowed = publicSharingAllowed(student);
  const display = effectiveBoardDisplay(profile?.leaderboardDisplay ?? "USERNAME", realNameAllowed);
  const names = { firstName: profile?.firstName ?? null, lastName: profile?.lastName ?? null, username: profile?.username ?? null };
  const pseudonym = pseudonymFor(userId);
  const myName = boardDisplayName({ ...names, display }, pseudonym);
  const previews = Object.fromEntries(
    DISPLAY_MODES.map((mode) => [
      mode,
      (mode === "ANONYMOUS" || leaderboardDisplayName(names, mode) !== null) && (mode !== "REAL_NAME" || realNameAllowed)
        ? boardDisplayName({ ...names, display: mode }, pseudonym)
        : null,
    ]),
  ) as Record<LeaderboardDisplay, string | null>;
  const base: LeaderboardView = {
    entitled,
    optedIn: profile?.leaderboardOptIn ?? false,
    display,
    myName,
    previews,
    realNameNeedsConsent: !realNameAllowed,
    metric,
    metrics: LEADERBOARD_METRICS,
    scope,
    scopes,
    period: periodOf(metric, periodKey),
    rows: [],
    me: null,
    total: 0,
    updatedAt: null,
    minMocks: DEFAULT_MIN_MOCKS,
  };
  if (!entitled || scopes.length === 0) return base;

  const where = boardWhere(metric, periodKey, scope);
  const [top, total, latest, mine] = await Promise.all([
    db.leaderboardEntry.findMany({
      where,
      orderBy: [{ value: "desc" }, { computedAt: "asc" }, { id: "asc" }],
      take: topN,
      select: { userId: true, value: true },
    }),
    db.leaderboardEntry.count({ where }),
    db.leaderboardEntry.aggregate({ where, _max: { computedAt: true } }),
    base.optedIn
      ? db.leaderboardEntry.findFirst({ where: { metric, periodKey, scopeType: scope.scope, scopeId: scope.scopeId, userId }, select: { value: true } })
      : Promise.resolve(null),
  ]);

  const ranks = denseRanks(top.map((row) => row.value));
  const topIds = top.map((row) => row.userId);
  const [profiles, consent] = await Promise.all([
    db.profile.findMany({
      where: { userId: { in: topIds } },
      select: { userId: true, firstName: true, lastName: true, username: true, leaderboardDisplay: true },
    }),
    loadMinorConsentFacts(topIds),
  ]);
  const byUser = new Map(profiles.map((p) => [p.userId, p]));
  const rows: LeaderboardRow[] = top.map((row, index) => {
    const p = byUser.get(row.userId);
    const shown = p ? effectiveBoardDisplay(p.leaderboardDisplay, publicSharingAllowed(consent.get(row.userId) ?? null)) : null;
    const name =
      p && shown
        ? boardDisplayName({ firstName: p.firstName, lastName: p.lastName, username: p.username, display: shown }, pseudonymFor(row.userId))
        : pseudonymFor(row.userId);
    return { rank: ranks[index] ?? index + 1, name, value: row.value, isMe: row.userId === userId };
  });

  let me: LeaderboardView["me"] = null;
  if (mine) {
    const inTop = rows.some((row) => row.isMe);
    const rank = inTop ? rows.find((row) => row.isMe)!.rank : await rankOf(metric, periodKey, scope, mine.value);
    let lastWeekRank: number | null = null;
    if (metric === "WEEKLY_XP" || metric === "WEEKLY_QUESTIONS") {
      const previous = await db.leaderboardEntry.findFirst({
        where: { metric, periodKey: previousWeekKey(periodKey), scopeType: scope.scope, scopeId: scope.scopeId, userId },
        select: { rank: true },
      });
      lastWeekRank = previous?.rank ?? null;
    }
    me = { rank, value: mine.value, inTop, lastWeekRank };
  }
  return { ...base, rows, me, total, updatedAt: latest._max.computedAt ?? null };
}

/**
 * Recomputes the current boards for one student right away (after opting in), so they see themselves without waiting
 * for the hourly snapshot. Best effort: failures are logged, never thrown.
 */
export async function refreshLeaderboardsFor(userId: string, now: Date = new Date()): Promise<void> {
  try {
    await computeLeaderboards(currentWeekKey(now), { now, userIds: [userId] });
  } catch (error) {
    logger.warn("leaderboards: on-demand refresh failed", { userId, err: error });
  }
}
