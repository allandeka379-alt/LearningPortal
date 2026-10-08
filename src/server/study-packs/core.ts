import type { BillingInterval, CatalogueStatus } from "@/generated/prisma/client";

/**
 * Pure rules of the student-facing study-pack catalogue (§24): which packs a student is shown, how a pack's scope is
 * named, which of its prices can be bought and whether the student already holds it. No I/O (CLAUDE.md rule 2); the
 * service is ./catalogue.ts.
 *
 * - A pack is for a student when one of its scope rules touches one of the student's qualifications (their onboarding
 *   qualification or the qualification of a subject they study): a qualification rule directly, a subject or syllabus
 *   rule through its subject's qualification.
 * - Scope rules whose subject / qualification / board is HIDDEN are not shown (and a pack whose every rule is hidden
 *   is not listed), as in the search index.
 * - Purchasable prices are exactly what the checkout offers (`getCheckoutChoices`): active, inside their validity
 *   window, global or for the student's country, non-zero and not per seat; one-off without an end date allowed.
 */

export interface ScopeBoardRef {
  shortName: string;
  catalogueStatus: CatalogueStatus;
}

export interface ScopeQualificationRef {
  id: string;
  shortName: string;
  catalogueStatus: CatalogueStatus;
  examBoard: ScopeBoardRef;
}

export interface ScopeSubjectRef {
  id: string;
  name: string;
  catalogueStatus: CatalogueStatus;
  qualification: ScopeQualificationRef;
}

/** One StudyPackScope row with its target loaded (exactly one of the three is set). */
export interface PackScopeRow {
  qualification: ScopeQualificationRef | null;
  subject: ScopeSubjectRef | null;
  syllabus: { id: string; versionLabel: string; subject: ScopeSubjectRef } | null;
}

export interface PackScopeView {
  kind: "QUALIFICATION" | "SUBJECT" | "SYLLABUS";
  label: string;
  qualificationId: string;
  subjectId: string | null;
}

const shown = (status: CatalogueStatus): boolean => status !== "HIDDEN";

/** "ZIMSEC O-Level", or the short name alone when it already names the board ("Cambridge IGCSE"). */
export function qualificationLabel(qualification: { shortName: string; examBoard: { shortName: string } }): string {
  const board = qualification.examBoard.shortName.trim();
  const short = qualification.shortName.trim();
  return short.toLowerCase().includes(board.toLowerCase()) ? short : `${board} ${short}`;
}

function subjectVisible(subject: ScopeSubjectRef): boolean {
  return shown(subject.catalogueStatus) && shown(subject.qualification.catalogueStatus) && shown(subject.qualification.examBoard.catalogueStatus);
}

/** The visible scope rules of a pack, named for students (pure). Hidden targets are dropped. */
export function describeScopes(rows: readonly PackScopeRow[]): PackScopeView[] {
  const out: PackScopeView[] = [];
  for (const row of rows) {
    if (row.syllabus) {
      const subject = row.syllabus.subject;
      if (!subjectVisible(subject)) continue;
      out.push({
        kind: "SYLLABUS",
        label: `${qualificationLabel(subject.qualification)} ${subject.name} (${row.syllabus.versionLabel} syllabus)`,
        qualificationId: subject.qualification.id,
        subjectId: subject.id,
      });
    } else if (row.subject) {
      if (!subjectVisible(row.subject)) continue;
      out.push({ kind: "SUBJECT", label: `${qualificationLabel(row.subject.qualification)} ${row.subject.name}`, qualificationId: row.subject.qualification.id, subjectId: row.subject.id });
    } else if (row.qualification) {
      if (!shown(row.qualification.catalogueStatus) || !shown(row.qualification.examBoard.catalogueStatus)) continue;
      out.push({ kind: "QUALIFICATION", label: `Every ${qualificationLabel(row.qualification)} subject`, qualificationId: row.qualification.id, subjectId: null });
    }
  }
  return out;
}

/** True when a visible scope rule touches one of `qualificationIds` (pure). */
export function scopesMatchQualifications(scopes: readonly PackScopeView[], qualificationIds: ReadonlySet<string>): boolean {
  return scopes.some((scope) => qualificationIds.has(scope.qualificationId));
}

/** True when a visible scope rule covers one of the student's subjects (a qualification rule covers all of them). */
export function scopesCoverSubjects(scopes: readonly PackScopeView[], subjects: readonly { subjectId: string; qualificationId: string }[]): boolean {
  return scopes.some((scope) =>
    subjects.some((subject) => (scope.subjectId === null ? scope.qualificationId === subject.qualificationId : scope.subjectId === subject.subjectId)),
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// What a pack unlocks
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Keys of the entitlement summary lines (`summariseEntitlements`) a pack REALLY unlocks. A pack's grant is scoped to
 * its subjects (§24, ARCHITECTURE §7.6), and only checks made inside a subject honour scoped grants: lessons,
 * practice, the daily question, topic tests, mock exams, the diagnostic and flashcards. Account-wide checks (AI tutor
 * and solver, exam countdown, leaderboards, study-plan creation, detailed analytics, parent reports) ignore scoped
 * grants, so a pack page never promises them even when the pack's document sets them.
 */
export const PACK_SCOPED_LINE_KEYS: ReadonlySet<string> = new Set(["lessons", "practice", "daily", "topicTests", "mocks", "diagnostic", "flashcards"]);

/** The included lines a pack can honour inside its scope (pure). */
export function packUnlockLines<T extends { key: string; included: boolean }>(lines: readonly T[]): T[] {
  return lines.filter((line) => line.included && PACK_SCOPED_LINE_KEYS.has(line.key));
}

// ---------------------------------------------------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------------------------------------------------

export interface PackPriceRow {
  id: string;
  currency: string;
  amountMinor: number;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  perSeat: boolean;
  label: string | null;
  countryId: string | null;
  isActive: boolean;
  validFrom: Date;
  validTo: Date | null;
  sortOrder: number;
}

export interface PackPriceOption {
  planPriceId: string;
  currency: string;
  amountMinor: number;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  label: string | null;
}

/** The prices the checkout would offer this student for the pack (module doc), in admin order then amount (pure). */
export function purchasablePackPrices(rows: readonly PackPriceRow[], options: { now: Date; countryId: string | null }): PackPriceOption[] {
  const now = options.now.getTime();
  return rows
    .filter(
      (row) =>
        row.isActive &&
        row.validFrom.getTime() <= now &&
        (row.validTo === null || now < row.validTo.getTime()) &&
        (row.countryId === null || row.countryId === options.countryId) &&
        row.amountMinor > 0 &&
        !row.perSeat,
    )
    .sort((a, b) => a.sortOrder - b.sortOrder || a.amountMinor - b.amountMinor || (a.id < b.id ? -1 : 1))
    .map((row) => ({
      planPriceId: row.id,
      currency: row.currency,
      amountMinor: row.amountMinor,
      interval: row.interval,
      intervalCount: row.intervalCount,
      periodDays: row.periodDays,
      label: row.label,
    }));
}

/** The cheapest option per currency, currencies in first-seen order (the catalogue's "from" prices; pure). */
export function cheapestPerCurrency(options: readonly PackPriceOption[]): PackPriceOption[] {
  const best = new Map<string, PackPriceOption>();
  for (const option of options) {
    const current = best.get(option.currency);
    if (!current || option.amountMinor < current.amountMinor) best.set(option.currency, option);
  }
  return [...best.values()];
}

// ---------------------------------------------------------------------------------------------------------------------
// Ownership
// ---------------------------------------------------------------------------------------------------------------------

export type PackOwnership = { state: "none" } | { state: "active"; endsAt: Date | null } | { state: "upcoming"; startsAt: Date; endsAt: Date | null };

/** The student's holding of one pack from their (non-revoked) grants of it; the most generous wins (pure). */
export function packOwnership(grants: readonly { startsAt: Date; endsAt: Date | null }[], now: Date): PackOwnership {
  const t = now.getTime();
  const live = grants.filter((grant) => grant.endsAt === null || grant.endsAt.getTime() > t);
  const active = live.filter((grant) => grant.startsAt.getTime() <= t);
  if (active.length > 0) {
    if (active.some((grant) => grant.endsAt === null)) return { state: "active", endsAt: null };
    const latest = Math.max(...active.map((grant) => (grant.endsAt as Date).getTime()));
    return { state: "active", endsAt: new Date(latest) };
  }
  const next = [...live].sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())[0];
  return next ? { state: "upcoming", startsAt: next.startsAt, endsAt: next.endsAt } : { state: "none" };
}
