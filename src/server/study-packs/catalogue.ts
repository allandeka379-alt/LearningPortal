import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { includedLines, type EntitlementLine } from "@/components/billing/entitlement-summary";
import type { SanitizedHtml } from "@/lib/content/types";
import type { Actor } from "@/server/auth/actor";
import { assertOnboardedStudent } from "@/server/auth/guards";
import { normalizeEntitlementDocument } from "@/server/billing/entitlements";
import { STUDY_PACK_SLUG_PATTERN } from "@/server/cms/study-packs/schemas";
import { renderContent } from "@/server/content/render";
import { db } from "@/server/db";
import { memoizeAsync } from "@/server/lib/cache";
import {
  cheapestPerCurrency,
  describeScopes,
  packOwnership,
  packUnlockLines,
  purchasablePackPrices,
  qualificationLabel,
  scopesCoverSubjects,
  scopesMatchQualifications,
  type PackOwnership,
  type PackPriceOption,
  type PackScopeView,
} from "./core";

/**
 * Student-facing study packs (§24; ARCHITECTURE route map `/app/study-packs`): the catalogue of PUBLISHED packs for
 * the student's qualification(s) and one pack's landing page. A pack is dynamic platform content (lessons, questions,
 * flashcards, tests in its scope), never a download; buying goes through the existing checkout
 * (`/app/billing/checkout?pack=`), which re-checks everything server-side. Everything shown is data: titles,
 * descriptions, scopes and prices from the CMS (rule 5), what a pack unlocks from its entitlement document through the
 * one feature mapping (unbuilt features are never listed), content counts computed from PUBLISHED rows (rule 6).
 *
 * Reads only: no writes, no AI, no premium content (counts, never items).
 */

/** Packs listed at most (a qualification has a handful; the list is ordered featured → admin order → title). */
export const CATALOGUE_LIMIT = 50;

export const STUDY_PACKS_PATH = "/app/study-packs";

export function studyPackPath(slug: string): string {
  return `${STUDY_PACKS_PATH}/${encodeURIComponent(slug)}`;
}

export function packCheckoutPath(packId: string): string {
  return `/app/billing/checkout?pack=${encodeURIComponent(packId)}`;
}

const BOARD_SELECT = { select: { shortName: true, catalogueStatus: true } } as const;
const QUALIFICATION_SELECT = { select: { id: true, shortName: true, catalogueStatus: true, examBoard: BOARD_SELECT } } as const;
const SUBJECT_SELECT = { select: { id: true, name: true, catalogueStatus: true, qualification: QUALIFICATION_SELECT } } as const;

const PACK_SELECT = {
  id: true,
  slug: true,
  title: true,
  subtitle: true,
  isFeatured: true,
  isDemo: true,
  entitlements: true,
  scopes: {
    select: {
      qualificationId: true,
      subjectId: true,
      syllabusId: true,
      qualification: QUALIFICATION_SELECT,
      subject: SUBJECT_SELECT,
      syllabus: { select: { id: true, versionLabel: true, subject: SUBJECT_SELECT } },
    },
  },
  // PlanPrice(studyPackId, isActive, currency) index.
  planPrices: {
    where: { isActive: true },
    select: {
      id: true,
      currency: true,
      amountMinor: true,
      interval: true,
      intervalCount: true,
      periodDays: true,
      perSeat: true,
      label: true,
      countryId: true,
      isActive: true,
      validFrom: true,
      validTo: true,
      sortOrder: true,
    },
  },
} as const satisfies Prisma.StudyPackSelect;

type PackRow = Prisma.StudyPackGetPayload<{ select: typeof PACK_SELECT }>;

export interface StudyPackCard {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  isFeatured: boolean;
  /** Development seed data (never in production); shown with a "Demo data" badge. */
  isDemo: boolean;
  href: string;
  /** What the pack covers, named for students (hidden catalogue entries left out). */
  scopes: PackScopeView[];
  /** A scope rule covers a subject the student studies. */
  forYourSubjects: boolean;
  /** What buying it unlocks inside its scope (built, enforced features that honour a subject-scoped grant). */
  unlocks: EntitlementLine[];
  /** Every price the checkout would offer, admin order. */
  prices: PackPriceOption[];
  /** The cheapest price per currency ("from"). */
  fromPrices: PackPriceOption[];
  ownership: PackOwnership;
  /** Where "Buy" goes; null when the student already holds the pack or it has no price. */
  checkoutHref: string | null;
}

export interface StudyPackCatalogue {
  /** "ZIMSEC O-Level", ... the qualifications the catalogue was built for (empty: none chosen yet). */
  qualificationLabels: string[];
  packs: StudyPackCard[];
}

export interface StudyPackDetail extends StudyPackCard {
  descriptionHtml: SanitizedHtml | null;
  /** A scope rule touches one of the student's qualifications. */
  forYourQualification: boolean;
  /** PUBLISHED platform content in scope (counts only). */
  contents: { lessons: number; questions: number; flashcards: number; assessments: number };
}

interface StudentContext {
  countryId: string | null;
  qualificationIds: Set<string>;
  qualificationLabels: string[];
  subjects: { subjectId: string; qualificationId: string }[];
}

async function studentContext(userId: string): Promise<StudentContext> {
  const [student, enrolments] = await Promise.all([
    db.student.findUnique({
      where: { userId },
      select: { countryId: true, qualificationId: true, qualification: { select: { id: true, shortName: true, examBoard: { select: { shortName: true } } } } },
    }),
    // SubjectEnrollment(userId, ...) index; a student has a handful of subjects.
    db.subjectEnrollment.findMany({
      where: { userId, status: { in: ["ACTIVE", "PAUSED"] } },
      select: { subjectId: true, subject: { select: { qualification: { select: { id: true, shortName: true, examBoard: { select: { shortName: true } } } } } } },
    }),
  ]);
  const labels = new Map<string, string>();
  if (student?.qualification) labels.set(student.qualification.id, qualificationLabel(student.qualification));
  for (const enrolment of enrolments) labels.set(enrolment.subject.qualification.id, qualificationLabel(enrolment.subject.qualification));
  return {
    countryId: student?.countryId ?? null,
    qualificationIds: new Set(labels.keys()),
    qualificationLabels: [...labels.values()],
    subjects: enrolments.map((e) => ({ subjectId: e.subjectId, qualificationId: e.subject.qualification.id })),
  };
}

async function loadOwnership(userId: string, packIds: readonly string[], now: Date): Promise<Map<string, PackOwnership>> {
  if (packIds.length === 0) return new Map();
  // EntitlementGrant(userId, endsAt) index; a student holds a handful of packs.
  const grants = await db.entitlementGrant.findMany({
    where: { userId, studyPackId: { in: [...packIds] }, revokedAt: null },
    select: { studyPackId: true, startsAt: true, endsAt: true },
  });
  return new Map(packIds.map((id) => [id, packOwnership(grants.filter((grant) => grant.studyPackId === id), now)]));
}

function toCard(row: PackRow, context: StudentContext, ownership: PackOwnership, now: Date): StudyPackCard {
  const scopes = describeScopes(row.scopes);
  const prices = purchasablePackPrices(row.planPrices, { now, countryId: context.countryId });
  // A study pack always unlocks full lessons in its scope (§24), plus what its own entitlement document unlocks inside
  // that scope (account-wide features are left out: scoped grants do not apply to them, see `packUnlockLines`).
  const { entitlements } = normalizeEntitlementDocument(row.entitlements);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    isFeatured: row.isFeatured,
    isDemo: row.isDemo,
    href: studyPackPath(row.slug),
    scopes,
    forYourSubjects: scopesCoverSubjects(scopes, context.subjects),
    unlocks: packUnlockLines(includedLines({ ...entitlements, lessonAccess: "ALL" })),
    prices,
    fromPrices: cheapestPerCurrency(prices),
    ownership,
    checkoutHref: ownership.state === "active" || prices.length === 0 ? null : packCheckoutPath(row.id),
  };
}

/**
 * The catalogue for the signed-in student: PUBLISHED packs with a visible scope rule in one of their qualifications,
 * that can be bought now (a current price) or that they already hold. Featured first, then admin order.
 *
 * @throws AppError FORBIDDEN (not an onboarded student)
 */
export async function listStudyPacksForStudent(actor: Actor, options: { now?: Date } = {}): Promise<StudyPackCatalogue> {
  assertOnboardedStudent(actor);
  const now = options.now ?? new Date();
  const context = await studentContext(actor.userId);
  if (context.qualificationIds.size === 0) return { qualificationLabels: [], packs: [] };
  const ids = [...context.qualificationIds];
  // StudyPack(status, sortOrder) index; scope filters use the StudyPackScope qualification / subject / syllabus indexes.
  const rows = await db.studyPack.findMany({
    where: {
      status: "PUBLISHED",
      draftOfId: null,
      scopes: {
        some: {
          OR: [{ qualificationId: { in: ids } }, { subject: { qualificationId: { in: ids } } }, { syllabus: { subject: { qualificationId: { in: ids } } } }],
        },
      },
    },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { title: "asc" }, { id: "asc" }],
    take: CATALOGUE_LIMIT,
    select: PACK_SELECT,
  });
  const ownership = await loadOwnership(
    actor.userId,
    rows.map((row) => row.id),
    now,
  );
  const packs = rows
    .map((row) => toCard(row, context, ownership.get(row.id) ?? { state: "none" }, now))
    .filter((card) => scopesMatchQualifications(card.scopes, context.qualificationIds))
    .filter((card) => card.prices.length > 0 || card.ownership.state !== "none");
  return { qualificationLabels: context.qualificationLabels, packs };
}

// ---------------------------------------------------------------------------------------------------------------------
// One pack
// ---------------------------------------------------------------------------------------------------------------------

type ScopeIds = { qualificationId: string | null; subjectId: string | null; syllabusId: string | null };

/**
 * PUBLISHED platform content a scope includes (the same rule the CMS uses for its PDF licensing check): lessons,
 * root questions, flashcards and tests of the scoped subjects (directly or through a qualification) or tagged in the
 * scoped syllabus versions. Counts only; cached per pack for ten minutes.
 */
const countPackContents = memoizeAsync(
  async (_packId: string, scopes: readonly ScopeIds[]): Promise<StudyPackDetail["contents"]> => {
    const qualificationIds = [...new Set(scopes.map((s) => s.qualificationId).filter((id): id is string => id !== null))];
    const syllabusIds = [...new Set(scopes.map((s) => s.syllabusId).filter((id): id is string => id !== null))];
    const viaQualification = qualificationIds.length
      ? (await db.subject.findMany({ where: { qualificationId: { in: qualificationIds } }, select: { id: true } })).map((s) => s.id)
      : [];
    const subjectIds = [...new Set([...scopes.map((s) => s.subjectId).filter((id): id is string => id !== null), ...viaQualification])];
    const [lessons, questions, flashcards, assessments] = await Promise.all([
      db.lesson.count({
        where: {
          status: "PUBLISHED",
          draftOfId: null,
          OR: [{ subjectId: { in: subjectIds } }, { qualificationId: { in: qualificationIds } }, { topics: { some: { topic: { syllabusId: { in: syllabusIds } } } } }],
        },
      }),
      db.question.count({
        where: {
          status: "PUBLISHED",
          draftOfId: null,
          parentId: null,
          schoolId: null,
          ownerUserId: null,
          OR: [{ subjectId: { in: subjectIds } }, { topics: { some: { OR: [{ subjectId: { in: subjectIds } }, { syllabusId: { in: syllabusIds } }] } } }],
        },
      }),
      db.flashcard.count({
        where: {
          status: "PUBLISHED",
          draftOfId: null,
          ownerUserId: null,
          OR: [{ subjectId: { in: subjectIds } }, { topics: { some: { topic: { syllabusId: { in: syllabusIds } } } } }],
        },
      }),
      db.assessment.count({
        where: { status: "PUBLISHED", draftOfId: null, schoolId: null, ownerUserId: null, OR: [{ subjectId: { in: subjectIds } }, { syllabusId: { in: syllabusIds } }] },
      }),
    ]);
    return { lessons, questions, flashcards, assessments };
  },
  { ttlMs: 10 * 60_000, maxEntries: 500, key: (packId) => packId },
);

/**
 * One PUBLISHED pack by slug for the landing page (reachable from the catalogue, search and the billing page, so not
 * limited to the student's qualifications: `forYourQualification` says whether it matches). `null` when there is no
 * such live pack or none of its scope rules is visible.
 *
 * @throws AppError FORBIDDEN (not an onboarded student)
 */
export async function getStudyPackForStudent(actor: Actor, slug: string, options: { now?: Date } = {}): Promise<StudyPackDetail | null> {
  assertOnboardedStudent(actor);
  if (typeof slug !== "string" || slug.length > 120 || !STUDY_PACK_SLUG_PATTERN.test(slug)) return null;
  const now = options.now ?? new Date();
  // StudyPack_slug_live_key (unique slug among live rows).
  const [row, context] = await Promise.all([
    db.studyPack.findFirst({ where: { slug, draftOfId: null, status: "PUBLISHED" }, select: { ...PACK_SELECT, description: true } }),
    studentContext(actor.userId),
  ]);
  if (!row) return null;
  const ownership = (await loadOwnership(actor.userId, [row.id], now)).get(row.id) ?? { state: "none" as const };
  const card = toCard(row, context, ownership, now);
  if (card.scopes.length === 0) return null;
  const description = row.description?.trim();
  return {
    ...card,
    descriptionHtml: description ? renderContent(description, { idPrefix: "pack-", baseHeadingLevel: 3 }).html : null,
    forYourQualification: scopesMatchQualifications(card.scopes, context.qualificationIds),
    contents: await countPackContents(
      row.id,
      row.scopes.map((scope) => ({ qualificationId: scope.qualificationId, subjectId: scope.subjectId, syllabusId: scope.syllabusId })),
    ),
  };
}
