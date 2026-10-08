import "server-only";
import type {
  GuardianConsentMethod,
  GuardianConsentStatus,
  GuardianRelationship,
  ParentLinkConsentBasis,
} from "@/generated/prisma/client";
import { getChildOverview, type ChildOverview } from "@/server/analytics/parent";
import { maskIdentifier } from "@/server/auth/identifiers";
import { canViewStudent } from "@/server/auth/rbac";
import { hasEntitlement } from "@/server/billing/entitlements";
import { getParentAiAccessEnabled } from "@/server/cms/settings/catalogue";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { assertParent, assertStudent, personName, type FamilyActor } from "./common";
import {
  CONSENT_GIVING_RELATIONSHIPS,
  linkIdSchema,
  MAX_CHILDREN_PER_PARENT,
  STUDENT_CONSENT_BASES,
  studentIdSchema,
  type LinkPermissions,
} from "./schemas";

/**
 * Read models of the family screens: the student's /app/family page and the parent's /parent area (§21).
 *
 * Scoping is in the queries themselves (ARCHITECTURE §5.3): a student only ever reads links where they are the
 * student; a parent only ACTIVE links where they are the parent. The child overview goes through the shared RBAC
 * resource check (`canViewStudent`) and then the analytics read model with THAT link's flags, so sections the student
 * did not share are absent from the result (not merely hidden in the UI). AI conversations are never part of these
 * read models (see ./ai-conversations.ts for the separately consented path).
 */

/** Injectable platform switch (tests). */
export interface PlatformSwitchOptions {
  isParentAiAccessEnabled?: () => Promise<boolean>;
  now?: Date;
}

// =====================================================================================================================
// Student: /app/family
// =====================================================================================================================

export interface StudentFamilyRequest {
  linkId: string;
  parentName: string;
  /** Masked contact of the requesting account ("mu***@example.com"), to help the student recognise them. */
  contactHint: string | null;
  relationship: GuardianRelationship;
  requestedAt: Date;
  expiresAt: Date | null;
}

export interface StudentFamilyLink {
  linkId: string;
  parentName: string;
  contactHint: string | null;
  relationship: GuardianRelationship;
  consentBasis: ParentLinkConsentBasis | null;
  activatedAt: Date | null;
  permissions: LinkPermissions;
  aiConversations: {
    shared: boolean;
    sharedSince: Date | null;
    /** The student may switch sharing ON for this link right now (platform switch on + own-consent basis). */
    canOffer: boolean;
  };
}

export interface StudentFamilyView {
  pendingRequests: StudentFamilyRequest[];
  links: StudentFamilyLink[];
  /** The student's own unused code, if any (the code itself cannot be shown again: only its hash is stored). */
  outstandingCode: { linkId: string; expiresAt: Date } | null;
  /** Platform switch `privacy.parentAiAccess.enabled`. */
  aiSharingAvailable: boolean;
  guardianConsent: {
    isMinor: boolean;
    status: GuardianConsentStatus;
    method: GuardianConsentMethod | null;
    grantedAt: Date | null;
    grantedByName: string | null;
  } | null;
}

const PERSON_SELECT = {
  emailNormalized: true,
  phoneE164: true,
  profile: { select: { displayName: true, firstName: true, lastName: true } },
} as const;

function contactHint(person: { emailNormalized: string | null; phoneE164: string | null } | null): string | null {
  const contact = person?.emailNormalized ?? person?.phoneE164 ?? null;
  return contact ? maskIdentifier(contact) : null;
}

/** Everything /app/family shows for the signed-in student. */
export async function getStudentFamilyView(actor: FamilyActor, options: PlatformSwitchOptions = {}): Promise<StudentFamilyView> {
  assertStudent(actor);
  const now = options.now ?? new Date();
  const [rows, student, aiSharingAvailable] = await Promise.all([
    // ParentStudentLink(studentUserId, status) index; a student has a handful of open episodes at most.
    db.parentStudentLink.findMany({
      where: { studentUserId: actor.userId, status: { in: ["PENDING", "ACTIVE"] } },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      take: 50,
      select: {
        id: true,
        status: true,
        parentUserId: true,
        relationship: true,
        initiatedBy: true,
        consentBasis: true,
        inviteCodeHash: true,
        inviteExpiresAt: true,
        activatedAt: true,
        createdAt: true,
        canViewProgress: true,
        canViewStudyActivity: true,
        canViewTestResults: true,
        canViewAiConversations: true,
        aiConversationsConsentAt: true,
        parent: { select: PERSON_SELECT },
      },
    }),
    db.student.findUnique({
      where: { userId: actor.userId },
      select: {
        isMinor: true,
        guardianConsentStatus: true,
        guardianConsentMethod: true,
        guardianConsentAt: true,
        guardianConsentBy: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
      },
    }),
    (options.isParentAiAccessEnabled ?? getParentAiAccessEnabled)(),
  ]);

  const live = (expiresAt: Date | null) => expiresAt === null || expiresAt.getTime() > now.getTime();
  const pendingRequests: StudentFamilyRequest[] = [];
  const links: StudentFamilyLink[] = [];
  let outstandingCode: StudentFamilyView["outstandingCode"] = null;
  for (const row of rows) {
    if (row.status === "PENDING") {
      if (row.parentUserId === null) {
        if (row.inviteCodeHash !== null && live(row.inviteExpiresAt) && row.inviteExpiresAt) {
          outstandingCode = { linkId: row.id, expiresAt: row.inviteExpiresAt };
        }
      } else if (row.initiatedBy === "PARENT" && row.inviteCodeHash === null && live(row.inviteExpiresAt)) {
        pendingRequests.push({
          linkId: row.id,
          parentName: personName(row.parent?.profile, "A parent or guardian"),
          contactHint: contactHint(row.parent),
          relationship: row.relationship,
          requestedAt: row.createdAt,
          expiresAt: row.inviteExpiresAt,
        });
      }
      continue;
    }
    const ownConsent = row.consentBasis !== null && STUDENT_CONSENT_BASES.includes(row.consentBasis);
    links.push({
      linkId: row.id,
      parentName: personName(row.parent?.profile, "A parent or guardian"),
      contactHint: contactHint(row.parent),
      relationship: row.relationship,
      consentBasis: row.consentBasis,
      activatedAt: row.activatedAt,
      permissions: { progress: row.canViewProgress, activity: row.canViewStudyActivity, results: row.canViewTestResults },
      aiConversations: {
        shared: row.canViewAiConversations,
        sharedSince: row.canViewAiConversations ? row.aiConversationsConsentAt : null,
        canOffer: aiSharingAvailable && ownConsent && !row.canViewAiConversations,
      },
    });
  }

  return {
    pendingRequests,
    links,
    outstandingCode,
    aiSharingAvailable,
    guardianConsent: student
      ? {
          isMinor: student.isMinor,
          status: student.guardianConsentStatus,
          method: student.guardianConsentMethod,
          grantedAt: student.guardianConsentStatus === "GRANTED" ? student.guardianConsentAt : null,
          grantedByName:
            student.guardianConsentStatus === "GRANTED" && student.guardianConsentBy
              ? personName(student.guardianConsentBy.profile, "A parent or guardian")
              : null,
        }
      : null,
  };
}

/** One ACTIVE link of the student, for the AI-consent confirmation screen. `null` when not theirs / not active. */
export async function getStudentLinkForConsent(
  actor: FamilyActor,
  linkId: string,
  options: PlatformSwitchOptions = {},
): Promise<{
  linkId: string;
  parentName: string;
  relationship: GuardianRelationship;
  aiShared: boolean;
  /** Platform switch on AND the link rests on the student's own consent. */
  canOffer: boolean;
  aiSharingAvailable: boolean;
} | null> {
  assertStudent(actor);
  if (!linkIdSchema.safeParse(linkId).success) return null;
  const [link, aiSharingAvailable] = await Promise.all([
    db.parentStudentLink.findFirst({
      where: { id: linkId, studentUserId: actor.userId, status: "ACTIVE" },
      select: {
        id: true,
        relationship: true,
        consentBasis: true,
        canViewAiConversations: true,
        parent: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
      },
    }),
    (options.isParentAiAccessEnabled ?? getParentAiAccessEnabled)(),
  ]);
  if (!link) return null;
  const ownConsent = link.consentBasis !== null && STUDENT_CONSENT_BASES.includes(link.consentBasis);
  return {
    linkId: link.id,
    parentName: personName(link.parent?.profile, "your parent or guardian"),
    relationship: link.relationship,
    aiShared: link.canViewAiConversations,
    canOffer: aiSharingAvailable && ownConsent,
    aiSharingAvailable,
  };
}

// =====================================================================================================================
// Parent: /parent
// =====================================================================================================================

export interface ParentChild {
  linkId: string;
  studentUserId: string;
  name: string;
  firstName: string | null;
  relationship: GuardianRelationship;
  activatedAt: Date | null;
  permissions: LinkPermissions;
  /** The student shared AI conversations with this parent (only readable while the platform switch is on). */
  aiConversationsShared: boolean;
  guardianConsent: {
    isMinor: boolean;
    status: GuardianConsentStatus;
    /** This parent may record consent now (minor, not granted, and the relationship can give consent). */
    canGrant: boolean;
    /** This parent gave the current consent (and so may withdraw it). */
    givenByYou: boolean;
  };
}

/** The parent's ACTIVE links (children), oldest first. */
export async function listParentChildren(actor: FamilyActor): Promise<ParentChild[]> {
  assertParent(actor);
  // ParentStudentLink(parentUserId, status) index.
  const rows = await db.parentStudentLink.findMany({
    where: { parentUserId: actor.userId, status: "ACTIVE", studentUserId: { not: null } },
    orderBy: [{ activatedAt: "asc" }, { id: "asc" }],
    take: MAX_CHILDREN_PER_PARENT,
    select: {
      id: true,
      studentUserId: true,
      relationship: true,
      activatedAt: true,
      canViewProgress: true,
      canViewStudyActivity: true,
      canViewTestResults: true,
      canViewAiConversations: true,
      student: {
        select: {
          profile: { select: { displayName: true, firstName: true, lastName: true } },
          student: {
            select: { isMinor: true, guardianConsentStatus: true, guardianConsentMethod: true, guardianConsentByUserId: true },
          },
        },
      },
    },
  });
  return rows
    .filter((row) => row.studentUserId !== null && row.student?.student)
    .map((row) => toParentChild(actor.userId, row));
}

type ChildRow = {
  id: string;
  studentUserId: string | null;
  relationship: GuardianRelationship;
  activatedAt: Date | null;
  canViewProgress: boolean;
  canViewStudyActivity: boolean;
  canViewTestResults: boolean;
  canViewAiConversations: boolean;
  student: {
    profile: { displayName: string | null; firstName: string | null; lastName: string | null } | null;
    student: {
      isMinor: boolean;
      guardianConsentStatus: GuardianConsentStatus;
      guardianConsentMethod: GuardianConsentMethod | null;
      guardianConsentByUserId: string | null;
    } | null;
  } | null;
};

function toParentChild(parentUserId: string, row: ChildRow): ParentChild {
  const consent = row.student?.student;
  const isMinor = consent?.isMinor ?? false;
  const status = consent?.guardianConsentStatus ?? "NOT_REQUIRED";
  return {
    linkId: row.id,
    studentUserId: row.studentUserId as string,
    name: personName(row.student?.profile, "Your child"),
    firstName: row.student?.profile?.firstName ?? null,
    relationship: row.relationship,
    activatedAt: row.activatedAt,
    permissions: { progress: row.canViewProgress, activity: row.canViewStudyActivity, results: row.canViewTestResults },
    aiConversationsShared: row.canViewAiConversations,
    guardianConsent: {
      isMinor,
      status,
      canGrant: isMinor && status !== "GRANTED" && status !== "NOT_REQUIRED" && CONSENT_GIVING_RELATIONSHIPS.includes(row.relationship),
      givenByYou:
        status === "GRANTED" && consent?.guardianConsentMethod === "PARENT_ACCOUNT" && consent.guardianConsentByUserId === parentUserId,
    },
  };
}

/**
 * Resolves the parent's ACTIVE link to `studentUserId` through the shared RBAC check (ARCHITECTURE §5.3). Anything
 * else (no link, revoked, pending, another parent's child, the parent's own id, a class student of a teacher-parent)
 * is NOT_FOUND, so the URL never confirms that a student exists.
 */
export async function requireLinkedChild(actor: FamilyActor, studentUserId: unknown): Promise<ParentChild> {
  assertParent(actor);
  const parsed = studentIdSchema.safeParse(studentUserId);
  if (!parsed.success) throw AppError.notFound("We couldn't find that child.");
  const access = await canViewStudent(actor, parsed.data, { aspect: "overview" });
  if (access === null || access.via !== "parent") throw AppError.notFound("We couldn't find that child.");
  const row = await db.parentStudentLink.findFirst({
    where: { id: access.linkId, parentUserId: actor.userId, studentUserId: parsed.data, status: "ACTIVE" },
    select: {
      id: true,
      studentUserId: true,
      relationship: true,
      activatedAt: true,
      canViewProgress: true,
      canViewStudyActivity: true,
      canViewTestResults: true,
      canViewAiConversations: true,
      student: {
        select: {
          profile: { select: { displayName: true, firstName: true, lastName: true } },
          student: {
            select: { isMinor: true, guardianConsentStatus: true, guardianConsentMethod: true, guardianConsentByUserId: true },
          },
        },
      },
    },
  });
  if (!row || !row.student?.student) throw AppError.notFound("We couldn't find that child.");
  return toParentChild(actor.userId, row);
}

export interface ParentChildDetail {
  child: ParentChild;
  overview: ChildOverview;
}

/**
 * Detailed parent reports (§21, §31 `parentReports`) follow the CHILD's plan, whoever pays for it (their own
 * subscription, one a parent pays for, a school seat or a grant), never the parent's: a parent holds no student plan.
 * Without it the parent sees the basic overview (subjects, exam countdown, study-time totals) and no weekly summary.
 */
export function childHasParentReports(studentUserId: string): Promise<boolean> {
  return hasEntitlement({ userId: studentUserId }, "parent_reports");
}

/**
 * §21 child view for a linked parent: the analytics read model with THIS link's flags (unshared sections absent) and
 * the detailed-report sections only when the child's plan includes parent reports ({@link childHasParentReports}).
 * Never includes AI conversations.
 */
export async function getParentChildDetail(
  actor: FamilyActor,
  studentUserId: unknown,
  options: { recentResultsLimit?: number; weakAreasLimit?: number; now?: Date } = {},
): Promise<ParentChildDetail> {
  const child = await requireLinkedChild(actor, studentUserId);
  const overview = await getChildOverview(child.studentUserId, {
    permissions: {
      canViewProgress: child.permissions.progress,
      canViewStudyActivity: child.permissions.activity,
      canViewTestResults: child.permissions.results,
    },
    includeReports: await childHasParentReports(child.studentUserId),
    ...(options.now ? { now: options.now } : {}),
    ...(options.recentResultsLimit ? { recentResultsLimit: options.recentResultsLimit } : {}),
    ...(options.weakAreasLimit ? { weakAreasLimit: options.weakAreasLimit } : {}),
  });
  return { child, overview };
}

/**
 * The /parent dashboard: every linked child with a compact overview (3 recent results, 3 weak areas; detailed-report
 * sections only for children whose plan includes parent reports).
 */
export async function getParentDashboard(actor: FamilyActor, options: { now?: Date } = {}): Promise<ParentChildDetail[]> {
  const children = await listParentChildren(actor);
  // Bounded by MAX_CHILDREN_PER_PARENT; each overview is a fixed handful of indexed per-student queries.
  return Promise.all(
    children.map(async (child) => ({
      child,
      overview: await getChildOverview(child.studentUserId, {
        permissions: {
          canViewProgress: child.permissions.progress,
          canViewStudyActivity: child.permissions.activity,
          canViewTestResults: child.permissions.results,
        },
        includeReports: await childHasParentReports(child.studentUserId),
        recentResultsLimit: 3,
        weakAreasLimit: 3,
        ...(options.now ? { now: options.now } : {}),
      }),
    })),
  );
}

/** The parent's own unused code (flow b), if any. */
export async function getParentOutstandingCode(actor: FamilyActor, options: { now?: Date } = {}): Promise<{ linkId: string; expiresAt: Date } | null> {
  assertParent(actor);
  const now = options.now ?? new Date();
  const row = await db.parentStudentLink.findFirst({
    where: {
      parentUserId: actor.userId,
      studentUserId: null,
      status: "PENDING",
      inviteCodeHash: { not: null },
      inviteExpiresAt: { gt: now },
    },
    orderBy: { createdAt: "desc" },
    select: { id: true, inviteExpiresAt: true },
  });
  return row && row.inviteExpiresAt ? { linkId: row.id, expiresAt: row.inviteExpiresAt } : null;
}
