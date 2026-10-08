import "server-only";
import { Prisma, type SchoolMemberRole, type SchoolStatus } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import type { LocalDate } from "@/lib/dates";
import { getSchoolAnalytics, type SchoolAnalytics } from "@/server/analytics/school";
import { maskIdentifier, parseContactIdentifier } from "@/server/auth/identifiers";
import { LIVE_SUBSCRIPTION_STATUSES } from "@/server/billing/entitlements";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { randomToken, sha256Hex } from "@/server/lib/crypto";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { adminContactSendLimits, assertRateLimit } from "@/server/lib/rate-limit";
import { sendToContact } from "@/server/messaging";
import { createNotification } from "@/server/notifications";
import type { InvitationDelivery } from "@/server/schools/invitations";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { CMS_AUDIT, CMS_AUDIT_OPERATIONS } from "../users/audit-actions";
import { afterCursorWhere, decodeCursor, DEFAULT_PAGE_SIZE, pageOf } from "../users/cursor";
import {
  changeSchoolStatusSchema,
  createSchoolSchema,
  invitationActionSchema,
  inviteMemberSchema,
  listMembersSchema,
  listSchoolsSchema,
  removeMemberSchema,
  SCHOOL_STATUS_TRANSITIONS,
  updateSchoolSchema,
  type ListMembersInput,
  type ListSchoolsInput,
} from "./schemas";

/**
 * Admin school management (§23 admin side, §36 Schools; ARCHITECTURE §5.2 `school.manage`, §5.3). Every function
 * requires `school.manage` with scope "all" (ADMIN / SUPER_ADMIN): school admins manage their own school from
 * `/school`, never through these platform-wide services.
 *
 * - Create / edit / verify (status transitions in {@link SCHOOL_STATUS_TRANSITIONS}; verification stamps
 *   `verifiedAt` + `verifiedById`, which the database requires for ACTIVE).
 * - Members: invite a school admin or teacher by email / phone. An existing account is added at once (ACTIVE,
 *   ADDED_BY_STAFF) and notified in-app; teachers also get the TEACHER role and its extension row in the same
 *   transaction. Anyone else gets an Invitation (hashed token, 14 days) delivered to their own email / phone.
 *   Removing a membership ends the access it carried (database trigger cascades class roles).
 * - Seats and subscription summary, and the §23 analytics for a school (read-only, aggregate).
 *
 * Every mutation writes its AuditLog entry in the same transaction (`auditInTx`).
 */

export const INVITATION_TTL_DAYS = 14;
const DAY_MS = 86_400_000;

function isUniqueViolation(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function uniqueTarget(error: Prisma.PrismaClientKnownRequestError): string {
  const target = error.meta?.target;
  const text = Array.isArray(target) ? target.join(",") : String(target ?? "");
  // The pg driver adapter reports constraint names in `meta.driverAdapterError` on some versions.
  return `${text} ${JSON.stringify(error.meta ?? {})}`;
}

function parse<T>(result: { success: true; data: T } | { success: false; error: Parameters<typeof AppError.fromZod>[0] }): T {
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

function personName(profile: { displayName: string | null; firstName: string | null; lastName: string | null; username: string | null } | null): string {
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || profile.username || "Unnamed user";
}

const PROFILE_NAME = { select: { displayName: true, firstName: true, lastName: true, username: true } } as const;

/** Statuses `from` may move to (pure; for the UI and the service). */
export function allowedSchoolTransitions(from: SchoolStatus): readonly SchoolStatus[] {
  return SCHOOL_STATUS_TRANSITIONS[from];
}

/** URL slug from a school name ("St. Mary's High School" → "st-mary-s-high-school"). Pure. */
export function slugifySchoolName(name: string): string {
  const slug = name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100)
    .replace(/-+$/g, "");
  return slug || "school";
}

async function availableSlug(client: DbClient, base: string): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = attempt === 0 ? base : `${base}-${attempt + 1}`;
    const taken = await client.school.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!taken) return candidate;
  }
  return `${base}-${randomToken(4).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6) || "x"}`;
}

// ---------------------------------------------------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------------------------------------------------

export interface SchoolListItem {
  id: string;
  name: string;
  slug: string;
  status: SchoolStatus;
  type: string;
  country: string;
  region: string | null;
  district: string | null;
  town: string | null;
  verifiedAt: Date | null;
  isDemo: boolean;
  createdAt: Date;
  activeStudents: number;
  activeTeachers: number;
  activeAdmins: number;
}

/** §36 Schools: search by name / slug / official code, filter by status, country and region; newest first. */
export async function listSchools(actor: CmsActor, input: ListSchoolsInput = {}): Promise<{ items: SchoolListItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(listSchoolsSchema.safeParse(input));
  const limit = data.limit ?? DEFAULT_PAGE_SIZE;
  const where: Prisma.SchoolWhereInput[] = [];
  if (data.status) where.push({ status: data.status });
  if (data.countryId) where.push({ countryId: data.countryId });
  if (data.region) where.push({ region: { equals: data.region, mode: "insensitive" } });
  if (data.q) {
    const q = data.q;
    where.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { slug: q.toLowerCase() },
        { officialCode: q.toUpperCase() },
        { town: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (data.cursor) where.push(afterCursorWhere(decodeCursor(data.cursor)) as Prisma.SchoolWhereInput);
  const rows = await db.school.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      type: true,
      region: true,
      district: true,
      town: true,
      verifiedAt: true,
      isDemo: true,
      createdAt: true,
      country: { select: { name: true } },
    },
  });
  const page = pageOf(rows, limit);
  const ids = page.items.map((row) => row.id);
  // One grouped query for the page's member counts (no N+1); SchoolMember(schoolId, role, status) index.
  const counts =
    ids.length === 0
      ? []
      : await db.schoolMember.groupBy({ by: ["schoolId", "role"], where: { schoolId: { in: ids }, status: "ACTIVE" }, _count: { _all: true } });
  const countFor = (schoolId: string, role: SchoolMemberRole) => counts.find((row) => row.schoolId === schoolId && row.role === role)?._count._all ?? 0;
  return {
    nextCursor: page.nextCursor,
    items: page.items.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      status: row.status,
      type: row.type,
      country: row.country.name,
      region: row.region,
      district: row.district,
      town: row.town,
      verifiedAt: row.verifiedAt,
      isDemo: row.isDemo,
      createdAt: row.createdAt,
      activeStudents: countFor(row.id, "STUDENT"),
      activeTeachers: countFor(row.id, "TEACHER"),
      activeAdmins: countFor(row.id, "SCHOOL_ADMIN"),
    })),
  };
}

export type InvitationState = "PENDING" | "ACCEPTED" | "EXPIRED" | "REVOKED";

export function invitationState(invitation: { acceptedAt: Date | null; revokedAt: Date | null; expiresAt: Date }, now: Date): InvitationState {
  if (invitation.acceptedAt) return "ACCEPTED";
  if (invitation.revokedAt) return "REVOKED";
  if (invitation.expiresAt <= now) return "EXPIRED";
  return "PENDING";
}

export interface SchoolDetail {
  id: string;
  name: string;
  slug: string;
  status: SchoolStatus;
  type: string;
  countryId: string;
  country: string;
  region: string | null;
  district: string | null;
  town: string | null;
  officialCode: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  website: string | null;
  timezone: string;
  isDemo: boolean;
  createdAt: Date;
  createdBy: string | null;
  verifiedAt: Date | null;
  verifiedBy: string | null;
  allowedTransitions: readonly SchoolStatus[];
  members: Record<SchoolMemberRole, { active: number; invited: number; requested: number; removed: number }>;
  classes: number;
  subjects: number;
  invitations: { id: string; role: string | null; channel: string; targetMasked: string; state: InvitationState; sendCount: number; lastSentAt: Date | null; expiresAt: Date; createdAt: Date }[];
  subscriptions: {
    id: string;
    status: string;
    plan: string;
    seats: number | null;
    source: string;
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
    cancelAtPeriodEnd: boolean;
    createdAt: Date;
  }[];
  /** Seats of the live subscription: purchased vs allocated to students (active SCHOOL_SEAT grants). */
  seats: { subscriptionId: string; purchased: number | null; allocated: number } | null;
  /**
   * Plan / seat requests the school's admins sent from /school/billing (audit `school.plan_request`), newest first.
   * The free-text message is not stored in the audit log; it reached platform admins as a notification.
   */
  planRequests: { id: string; createdAt: Date; requestedBy: string | null; seats: number | null; plan: string | null; hasMessage: boolean }[];
}

/** Most recent plan requests shown on the admin school page. */
const PLAN_REQUESTS_SHOWN = 10;

function jsonNumber(value: unknown, key: string): number | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const field = (value as Record<string, unknown>)[key];
  return typeof field === "number" && Number.isFinite(field) ? field : null;
}

function jsonString(value: unknown, key: string): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const field = (value as Record<string, unknown>)[key];
  return typeof field === "string" ? field : null;
}

/** Full admin view of one school. */
export async function getSchool(actor: CmsActor, schoolId: string, options: { now?: Date } = {}): Promise<SchoolDetail> {
  assertCmsPermission(actor, "school.manage");
  const { schoolId: id } = parse(invitationActionSchema.pick({ schoolId: true }).safeParse({ schoolId }));
  const now = options.now ?? new Date();
  const school = await db.school.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      type: true,
      countryId: true,
      region: true,
      district: true,
      town: true,
      officialCode: true,
      contactEmail: true,
      contactPhone: true,
      website: true,
      timezone: true,
      isDemo: true,
      createdAt: true,
      verifiedAt: true,
      country: { select: { name: true } },
      createdBy: { select: { profile: PROFILE_NAME } },
      verifiedBy: { select: { profile: PROFILE_NAME } },
    },
  });
  if (!school) throw AppError.notFound("School not found.");

  const [memberCounts, classes, subjects, invitations, subscriptions, planRequestRows] = await Promise.all([
    db.schoolMember.groupBy({ by: ["role", "status"], where: { schoolId: id }, _count: { _all: true } }),
    db.class.count({ where: { schoolId: id, archivedAt: null } }),
    db.schoolSubject.count({ where: { schoolId: id, isActive: true } }),
    db.invitation.findMany({
      where: { schoolId: id, kind: "SCHOOL_MEMBER" },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, schoolRole: true, channel: true, target: true, acceptedAt: true, revokedAt: true, expiresAt: true, sendCount: true, lastSentAt: true, createdAt: true },
    }),
    db.subscription.findMany({
      where: { schoolId: id },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        status: true,
        seats: true,
        source: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        cancelAtPeriodEnd: true,
        createdAt: true,
        plan: { select: { name: true } },
      },
    }),
    // Entries written before the dedicated key existed carry it as metadata.operation on school.update.
    db.auditLog.findMany({
      where: {
        schoolId: id,
        OR: [
          { action: AUDIT_ACTIONS.SCHOOL_PLAN_REQUEST },
          { action: AUDIT_ACTIONS.SCHOOL_UPDATE, metadata: { path: ["operation"], equals: "school.plan_request" } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: PLAN_REQUESTS_SHOWN,
      select: { id: true, createdAt: true, after: true, metadata: true, actor: { select: { profile: PROFILE_NAME } } },
    }),
  ]);
  const requestedPlanIds = [...new Set(planRequestRows.map((row) => jsonString(row.after, "planId")).filter((planId): planId is string => planId !== null))];
  const requestedPlans = requestedPlanIds.length
    ? new Map((await db.plan.findMany({ where: { id: { in: requestedPlanIds } }, select: { id: true, name: true } })).map((plan) => [plan.id, plan.name]))
    : new Map<string, string>();

  const members = {
    SCHOOL_ADMIN: { active: 0, invited: 0, requested: 0, removed: 0 },
    TEACHER: { active: 0, invited: 0, requested: 0, removed: 0 },
    STUDENT: { active: 0, invited: 0, requested: 0, removed: 0 },
  } satisfies SchoolDetail["members"];
  for (const row of memberCounts) {
    const bucket = members[row.role];
    const key = row.status === "ACTIVE" ? "active" : row.status === "INVITED" ? "invited" : row.status === "REQUESTED" ? "requested" : "removed";
    bucket[key] += row._count._all;
  }

  const live = subscriptions.find((sub) => (LIVE_SUBSCRIPTION_STATUSES as readonly string[]).includes(sub.status));
  const seats = live
    ? {
        subscriptionId: live.id,
        purchased: live.seats,
        allocated: await db.entitlementGrant.count({
          where: { subscriptionId: live.id, source: "SCHOOL_SEAT", revokedAt: null, startsAt: { lte: now }, OR: [{ endsAt: null }, { endsAt: { gt: now } }] },
        }),
      }
    : null;

  return {
    id: school.id,
    name: school.name,
    slug: school.slug,
    status: school.status,
    type: school.type,
    countryId: school.countryId,
    country: school.country.name,
    region: school.region,
    district: school.district,
    town: school.town,
    officialCode: school.officialCode,
    contactEmail: school.contactEmail,
    contactPhone: school.contactPhone,
    website: school.website,
    timezone: school.timezone,
    isDemo: school.isDemo,
    createdAt: school.createdAt,
    createdBy: school.createdBy ? personName(school.createdBy.profile) : null,
    verifiedAt: school.verifiedAt,
    verifiedBy: school.verifiedBy ? personName(school.verifiedBy.profile) : null,
    allowedTransitions: allowedSchoolTransitions(school.status),
    members,
    classes,
    subjects,
    invitations: invitations.map((invitation) => ({
      id: invitation.id,
      role: invitation.schoolRole,
      channel: invitation.channel,
      targetMasked: invitation.target ? maskIdentifier(invitation.target) : "—",
      state: invitationState(invitation, now),
      sendCount: invitation.sendCount,
      lastSentAt: invitation.lastSentAt,
      expiresAt: invitation.expiresAt,
      createdAt: invitation.createdAt,
    })),
    subscriptions: subscriptions.map((sub) => ({
      id: sub.id,
      status: sub.status,
      plan: sub.plan.name,
      seats: sub.seats,
      source: sub.source,
      currentPeriodStart: sub.currentPeriodStart,
      currentPeriodEnd: sub.currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
      createdAt: sub.createdAt,
    })),
    seats,
    planRequests: planRequestRows.map((row) => {
      const planId = jsonString(row.after, "planId");
      const metadata = row.metadata && typeof row.metadata === "object" && !Array.isArray(row.metadata) ? (row.metadata as Record<string, unknown>) : {};
      return {
        id: row.id,
        createdAt: row.createdAt,
        requestedBy: row.actor ? personName(row.actor.profile) : null,
        seats: jsonNumber(row.after, "seats"),
        plan: planId ? (requestedPlans.get(planId) ?? null) : null,
        hasMessage: metadata.hasMessage === true,
      };
    }),
  };
}

export interface SchoolMemberItem {
  id: string;
  createdAt: Date;
  userId: string;
  name: string;
  email: string | null;
  phoneMasked: string | null;
  role: SchoolMemberRole;
  status: string;
  source: string;
  studentNumber: string | null;
  joinedAt: Date | null;
  removedAt: Date | null;
}

/** A school's members (§23 manage teachers / students), filterable by role, status and name; newest first. */
export async function listSchoolMembers(actor: CmsActor, input: ListMembersInput): Promise<{ items: SchoolMemberItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(listMembersSchema.safeParse(input));
  const limit = data.limit ?? DEFAULT_PAGE_SIZE;
  const where: Prisma.SchoolMemberWhereInput[] = [{ schoolId: data.schoolId }];
  if (data.role) where.push({ role: data.role });
  if (data.status) where.push({ status: data.status });
  if (data.q) {
    const q = data.q;
    where.push({
      OR: [
        { studentNumber: q },
        { user: { emailNormalized: { startsWith: q.toLowerCase() } } },
        { user: { profile: { is: { firstName: { contains: q, mode: "insensitive" } } } } },
        { user: { profile: { is: { lastName: { contains: q, mode: "insensitive" } } } } },
        { user: { profile: { is: { displayName: { contains: q, mode: "insensitive" } } } } },
      ],
    });
  }
  if (data.cursor) where.push(afterCursorWhere(decodeCursor(data.cursor)) as Prisma.SchoolMemberWhereInput);
  const rows = await db.schoolMember.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: {
      id: true,
      createdAt: true,
      userId: true,
      role: true,
      status: true,
      source: true,
      studentNumber: true,
      joinedAt: true,
      removedAt: true,
      user: { select: { emailNormalized: true, phoneE164: true, profile: PROFILE_NAME } },
    },
  });
  const page = pageOf(rows, limit);
  return {
    nextCursor: page.nextCursor,
    items: page.items.map((row) => ({
      id: row.id,
      createdAt: row.createdAt,
      userId: row.userId,
      name: personName(row.user.profile),
      email: row.user.emailNormalized,
      phoneMasked: row.user.phoneE164 ? maskIdentifier(row.user.phoneE164) : null,
      role: row.role,
      status: row.status,
      source: row.source,
      studentNumber: row.studentNumber,
      joinedAt: row.joinedAt,
      removedAt: row.removedAt,
    })),
  };
}

/** Countries for the school forms (small lookup table). */
export async function listCountryOptions(actor: CmsActor): Promise<{ id: string; name: string; timezone: string }[]> {
  assertCmsPermission(actor, "school.manage");
  return db.country.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }], select: { id: true, name: true, timezone: true } });
}

/** Repeat views of the same school's analytics by the same staff member within this window share one audit entry. */
export const SCHOOL_ANALYTICS_VIEW_AUDIT_WINDOW_MS = 15 * 60 * 1000;

/**
 * §23 analytics of one school for staff (aggregates; per-class outcomes, never AI data). The staff view is audited
 * (`school.analytics.view`) before anything is returned; repeat views within
 * {@link SCHOOL_ANALYTICS_VIEW_AUDIT_WINDOW_MS} (e.g. changing the date range) are not re-recorded.
 */
export async function getSchoolAnalyticsForAdmin(
  actor: CmsActor,
  schoolId: string,
  range: { from: LocalDate; to: LocalDate },
  request?: AuditRequestInfo,
  options: { now?: Date } = {},
): Promise<SchoolAnalytics> {
  assertCmsPermission(actor, "school.manage");
  assertCmsPermission(actor, "class.viewPerformance");
  const { schoolId: id } = parse(invitationActionSchema.pick({ schoolId: true }).safeParse({ schoolId }));
  const analytics = await getSchoolAnalytics({ schoolId: id }, range);
  const now = options.now ?? new Date();
  const recent = await db.auditLog.findFirst({
    where: {
      action: CMS_AUDIT.SCHOOL_ANALYTICS_VIEW,
      actorUserId: actor.userId,
      entityId: id,
      createdAt: { gte: new Date(now.getTime() - SCHOOL_ANALYTICS_VIEW_AUDIT_WINDOW_MS) },
    },
    select: { id: true },
  });
  if (!recent) {
    // Throws on failure: the view is not shown without its audit entry.
    await auditInTx(db, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.SCHOOL_ANALYTICS_VIEW,
      entityType: "School",
      entityId: id,
      schoolId: id,
      metadata: { operation: CMS_AUDIT_OPERATIONS.schoolAnalyticsView, from: range.from, to: range.to },
      request: request ?? null,
    });
  }
  return analytics;
}

// ---------------------------------------------------------------------------------------------------------------------
// School mutations
// ---------------------------------------------------------------------------------------------------------------------

function mapUniqueViolation(error: unknown): never {
  if (isUniqueViolation(error)) {
    const target = uniqueTarget(error);
    if (target.includes("slug")) throw AppError.validation({ slug: ["Another school already uses this slug."] });
    if (target.includes("officialCode")) throw AppError.validation({ officialCode: ["Another school in this country already has this official code."] });
    throw AppError.conflict("A school with these details already exists.");
  }
  throw error;
}

async function assertCountry(countryId: string): Promise<{ timezone: string }> {
  const country = await db.country.findUnique({ where: { id: countryId }, select: { timezone: true } });
  if (!country) throw AppError.validation({ countryId: ["Choose a country from the list."] });
  return country;
}

/** Creates a school (PENDING_VERIFICATION, or ACTIVE + verified when `verifyNow`). */
export async function createSchool(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ id: string; slug: string }> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(createSchoolSchema.safeParse(input));
  const country = await assertCountry(data.countryId);
  const now = new Date();
  try {
    return await db.$transaction(async (tx) => {
      const slug = data.slug ?? (await availableSlug(tx, slugifySchoolName(data.name)));
      const status: SchoolStatus = data.verifyNow ? "ACTIVE" : "PENDING_VERIFICATION";
      const school = await tx.school.create({
        data: {
          name: data.name,
          slug,
          countryId: data.countryId,
          type: data.type,
          region: data.region ?? null,
          district: data.district ?? null,
          town: data.town ?? null,
          officialCode: data.officialCode ?? null,
          contactEmail: data.contactEmail ?? null,
          contactPhone: data.contactPhone ?? null,
          website: data.website ?? null,
          timezone: data.timezone ?? country.timezone,
          status,
          verifiedAt: data.verifyNow ? now : null,
          verifiedById: data.verifyNow ? actor.userId : null,
          createdById: actor.userId,
        },
        select: { id: true, slug: true },
      });
      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: CMS_AUDIT.SCHOOL_CREATE,
        entityType: "School",
        entityId: school.id,
        schoolId: school.id,
        after: { name: data.name, slug, status, type: data.type, countryId: data.countryId },
        metadata: { operation: CMS_AUDIT_OPERATIONS.schoolCreate, verified: data.verifyNow },
        request: request ?? null,
      });
      return school;
    });
  } catch (error) {
    mapUniqueViolation(error);
  }
}

const EDITABLE_FIELDS = ["name", "slug", "countryId", "type", "region", "district", "town", "officialCode", "contactEmail", "contactPhone", "website", "timezone"] as const;

/** Edits a school's profile (not its status). The audit entry holds the before / after of changed fields only. */
export async function updateSchool(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ id: string; changed: string[] }> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(updateSchoolSchema.safeParse(input));
  const current = await db.school.findUnique({
    where: { id: data.schoolId },
    select: { id: true, name: true, slug: true, countryId: true, type: true, region: true, district: true, town: true, officialCode: true, contactEmail: true, contactPhone: true, website: true, timezone: true },
  });
  if (!current) throw AppError.notFound("School not found.");
  if (data.countryId !== current.countryId) await assertCountry(data.countryId);
  const next = {
    name: data.name,
    slug: data.slug ?? current.slug,
    countryId: data.countryId,
    type: data.type,
    region: data.region ?? null,
    district: data.district ?? null,
    town: data.town ?? null,
    officialCode: data.officialCode ?? null,
    contactEmail: data.contactEmail ?? null,
    contactPhone: data.contactPhone ?? null,
    website: data.website ?? null,
    timezone: data.timezone ?? current.timezone,
  };
  const changed = EDITABLE_FIELDS.filter((field) => next[field] !== current[field]);
  if (changed.length === 0) return { id: current.id, changed: [] };
  const before = Object.fromEntries(changed.map((field) => [field, current[field]]));
  const after = Object.fromEntries(changed.map((field) => [field, next[field]]));
  try {
    await db.$transaction(async (tx) => {
      await tx.school.update({ where: { id: current.id }, data: after, select: { id: true } });
      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: CMS_AUDIT.SCHOOL_UPDATE,
        entityType: "School",
        entityId: current.id,
        schoolId: current.id,
        before,
        after,
        metadata: { operation: CMS_AUDIT_OPERATIONS.schoolUpdate, fields: changed },
        request: request ?? null,
      });
    });
  } catch (error) {
    mapUniqueViolation(error);
  }
  return { id: current.id, changed };
}

/**
 * Moves a school through its lifecycle: verify (PENDING_VERIFICATION → ACTIVE), suspend / reactivate, close.
 * Suspending or closing needs a reason; a suspended or closed school's admins and teachers lose their school access on
 * their next request (sessions only count memberships of operating schools).
 */
export async function changeSchoolStatus(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<{ id: string; status: SchoolStatus }> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(changeSchoolStatusSchema.safeParse(input));
  const school = await db.school.findUnique({ where: { id: data.schoolId }, select: { id: true, status: true, verifiedAt: true } });
  if (!school) throw AppError.notFound("School not found.");
  if (!allowedSchoolTransitions(school.status).includes(data.to)) {
    throw AppError.conflict(`A ${school.status.toLowerCase().replace("_", " ")} school can't be moved to ${data.to.toLowerCase().replace("_", " ")}.`);
  }
  const now = new Date();
  const verifying = data.to === "ACTIVE" && school.verifiedAt === null;
  await db.$transaction(async (tx) => {
    const updated = await tx.school.updateMany({
      where: { id: school.id, status: school.status },
      data: { status: data.to, ...(verifying ? { verifiedAt: now, verifiedById: actor.userId } : {}) },
    });
    if (updated.count === 0) throw AppError.conflict();
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.SCHOOL_STATUS_CHANGE,
      entityType: "School",
      entityId: school.id,
      schoolId: school.id,
      before: { status: school.status },
      after: { status: data.to, ...(verifying ? { verifiedAt: now.toISOString() } : {}) },
      metadata: { operation: CMS_AUDIT_OPERATIONS.schoolStatusChange, verified: verifying },
      reason: data.reason ?? null,
      request: request ?? null,
    });
  });
  return { id: school.id, status: data.to };
}

// ---------------------------------------------------------------------------------------------------------------------
// Members and invitations
// ---------------------------------------------------------------------------------------------------------------------

const ROLE_LABEL: Record<"SCHOOL_ADMIN" | "TEACHER", string> = { SCHOOL_ADMIN: "school admin", TEACHER: "teacher" };

export type InviteOutcome =
  | { outcome: "added"; memberId: string; userId: string; teacherRoleGranted: boolean }
  | ({ outcome: "invited" | "reinvited"; invitationId: string } & InvitationDelivery);

function inviteLink(token: string): string {
  return new URL(`/invite/${token}`, getEnv().APP_URL).toString();
}

/**
 * Emails the invitation link (account email, always sent; a phone number gets an SMS only while `features.sms` is on)
 * and returns it for the admin to share. A SCHOOL_ADMIN invitation can only be accepted by an account that has
 * verified the invited email address, so sharing the link never lets anybody else in. Never throws: a failed send
 * leaves the invitation listed to send again.
 */
async function deliverInvitation(target: string, schoolName: string, role: "SCHOOL_ADMIN" | "TEACHER", token: string): Promise<InvitationDelivery> {
  const link = inviteLink(token);
  const outcome = await sendToContact(target, {
    subject: `You're invited to ${schoolName} on ${APP_NAME}`,
    text:
      `You've been invited to join ${schoolName} as a ${ROLE_LABEL[role]} on ${APP_NAME}. ` +
      `Accept the invitation here: ${link} . The link works for ${INVITATION_TTL_DAYS} days. ` +
      "If you weren't expecting this, you can ignore this message.",
    tag: "admin.school_invitation",
    sensitive: true,
  });
  return {
    sentTo: maskIdentifier(target),
    delivered: outcome.status === "sent",
    channel: outcome.channel,
    notSentReason: outcome.status === "sent" ? null : outcome.reason,
    inviteLink: link,
  };
}

/**
 * Invites a school admin or teacher by email / phone (§23). See the module docs for the existing-account vs
 * invitation paths. Rate limited per recipient for invitation sends.
 */
export async function inviteSchoolMember(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<InviteOutcome> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(inviteMemberSchema.safeParse(input));
  const contact = parseContactIdentifier(data.contact);
  if (contact === null) throw AppError.validation({ contact: ["Enter a valid email address (or mobile number)."] });
  // Accepting a school admin invitation needs the invited address VERIFIED by the account; phone numbers never are.
  if (data.role === "SCHOOL_ADMIN" && contact.kind !== "email") {
    throw AppError.validation({ contact: ["Invite a school admin by email address: only a confirmed email address can accept it."] });
  }
  const school = await db.school.findUnique({ where: { id: data.schoolId }, select: { id: true, name: true, status: true } });
  if (!school) throw AppError.notFound("School not found.");
  if (school.status === "CLOSED") throw AppError.conflict("This school is closed. Reopen it as a new school record instead.");

  const user = await db.user.findUnique({
    where: contact.kind === "email" ? { emailNormalized: contact.value } : { phoneE164: contact.value },
    select: { id: true, status: true, roles: true, teacher: { select: { userId: true } } },
  });
  const now = new Date();

  if (user) {
    if (user.status !== "ACTIVE") throw AppError.conflict("This account isn't active, so it can't be added to a school.");
    return db.$transaction(async (tx) => {
      const existing = await tx.schoolMember.findUnique({
        where: { schoolId_userId_role: { schoolId: school.id, userId: user.id, role: data.role } },
        select: { id: true, status: true },
      });
      if (existing?.status === "ACTIVE") throw AppError.conflict(`This person is already an active ${ROLE_LABEL[data.role]} of this school.`);
      const member = await tx.schoolMember.upsert({
        where: { schoolId_userId_role: { schoolId: school.id, userId: user.id, role: data.role } },
        create: {
          schoolId: school.id,
          userId: user.id,
          role: data.role,
          status: "ACTIVE",
          source: "ADDED_BY_STAFF",
          invitedById: actor.userId,
          invitedAt: now,
          joinedAt: now,
        },
        update: { status: "ACTIVE", source: "ADDED_BY_STAFF", invitedById: actor.userId, invitedAt: now, joinedAt: now, removedAt: null, removedById: null },
        select: { id: true },
      });

      // A school teacher uses the teacher area: the role (and its extension row) is held iff granted (schema rule).
      let teacherRoleGranted = false;
      if (data.role === "TEACHER" && !user.roles.includes("TEACHER")) {
        const roles = [...user.roles, "TEACHER" as const];
        await tx.user.update({ where: { id: user.id }, data: { roles }, select: { id: true } });
        if (!user.teacher) await tx.teacher.create({ data: { userId: user.id } });
        teacherRoleGranted = true;
        await auditInTx(tx, {
          ...auditActorFields(infraActor(actor)),
          action: CMS_AUDIT.ROLE_GRANT,
          entityType: "User",
          entityId: user.id,
          targetUserId: user.id,
          schoolId: school.id,
          before: { roles: user.roles },
          after: { roles },
          metadata: { role: "TEACHER", operation: CMS_AUDIT_OPERATIONS.memberAdd },
          request: request ?? null,
        });
      }

      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: CMS_AUDIT.SCHOOL_MEMBER_ADD,
        entityType: "SchoolMember",
        entityId: member.id,
        schoolId: school.id,
        targetUserId: user.id,
        before: existing ? { status: existing.status } : undefined,
        after: { role: data.role, status: "ACTIVE" },
        metadata: { operation: CMS_AUDIT_OPERATIONS.memberAdd, via: "existing_account", teacherRoleGranted },
        request: request ?? null,
      });

      await createNotification(
        user.id,
        {
          type: "account.school_membership",
          category: "ACCOUNT",
          title: `You were added to ${school.name}`.slice(0, 200),
          body: `You are now a ${ROLE_LABEL[data.role]} at ${school.name}.`.slice(0, 2000),
          data: { href: data.role === "SCHOOL_ADMIN" ? "/school" : "/teacher", entityType: "School", entityId: school.id },
          dedupeKey: `school_member:${member.id}:${now.getTime()}`,
        },
        { client: tx },
      );
      return { outcome: "added" as const, memberId: member.id, userId: user.id, teacherRoleGranted };
    });
  }

  for (const limit of adminContactSendLimits(contact.value)) await assertRateLimit(limit, "An invitation was sent to this address recently. Please try again later.");
  const token = randomToken(32);
  const tokenHash = sha256Hex(token);
  const channel = contact.kind === "email" ? ("EMAIL" as const) : ("SMS" as const);
  const expiresAt = new Date(now.getTime() + INVITATION_TTL_DAYS * DAY_MS);

  const result = await db.$transaction(async (tx) => {
    const pending = await tx.invitation.findFirst({
      where: {
        kind: "SCHOOL_MEMBER",
        schoolId: school.id,
        schoolRole: data.role,
        target: contact.value,
        acceptedAt: null,
        revokedAt: null,
        expiresAt: { gt: now },
      },
      select: { id: true, sendCount: true },
    });
    const invitation = pending
      ? await tx.invitation.update({
          where: { id: pending.id },
          data: { tokenHash, expiresAt, lastSentAt: now, sendCount: Math.min(32_767, pending.sendCount + 1), invitedById: actor.userId },
          select: { id: true },
        })
      : await tx.invitation.create({
          data: {
            kind: "SCHOOL_MEMBER",
            schoolId: school.id,
            schoolRole: data.role,
            channel,
            target: contact.value,
            tokenHash,
            invitedById: actor.userId,
            expiresAt,
            lastSentAt: now,
          },
          select: { id: true },
        });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: pending ? CMS_AUDIT.INVITATION_RESEND : CMS_AUDIT.INVITATION_CREATE,
      entityType: "Invitation",
      entityId: invitation.id,
      schoolId: school.id,
      after: { role: data.role, channel, expiresAt: expiresAt.toISOString() },
      metadata: { operation: pending ? CMS_AUDIT_OPERATIONS.invitationResend : CMS_AUDIT_OPERATIONS.invitationCreate },
      request: request ?? null,
    });
    return { invitationId: invitation.id, outcome: pending ? ("reinvited" as const) : ("invited" as const) };
  });
  // Delivered after commit; if the provider fails the invitation stays listed and can be re-sent.
  return { ...result, ...(await deliverInvitation(contact.value, school.name, data.role, token)) };
}

/** Re-sends a pending invitation with a fresh token (the old link stops working) and a new 14-day window. */
export async function resendInvitation(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<InvitationDelivery> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(invitationActionSchema.safeParse(input));
  const invitation = await db.invitation.findFirst({
    where: { id: data.invitationId, schoolId: data.schoolId, kind: "SCHOOL_MEMBER" },
    select: { id: true, target: true, channel: true, schoolRole: true, acceptedAt: true, revokedAt: true, sendCount: true, school: { select: { name: true, status: true } } },
  });
  if (!invitation || !invitation.school) throw AppError.notFound("Invitation not found.");
  if (invitation.acceptedAt || invitation.revokedAt || !invitation.target) throw AppError.conflict("This invitation was already accepted or revoked.");
  if (invitation.school.status === "CLOSED") throw AppError.conflict("This school is closed.");
  const role = invitation.schoolRole === "SCHOOL_ADMIN" ? "SCHOOL_ADMIN" : "TEACHER";
  for (const limit of adminContactSendLimits(invitation.target)) await assertRateLimit(limit, "An invitation was sent to this address recently. Please try again later.");
  const token = randomToken(32);
  const now = new Date();
  await db.$transaction(async (tx) => {
    await tx.invitation.update({
      where: { id: invitation.id },
      data: {
        tokenHash: sha256Hex(token),
        expiresAt: new Date(now.getTime() + INVITATION_TTL_DAYS * DAY_MS),
        lastSentAt: now,
        sendCount: Math.min(32_767, invitation.sendCount + 1),
      },
      select: { id: true },
    });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.INVITATION_RESEND,
      entityType: "Invitation",
      entityId: invitation.id,
      schoolId: data.schoolId,
      metadata: { operation: CMS_AUDIT_OPERATIONS.invitationResend },
      request: request ?? null,
    });
  });
  return deliverInvitation(invitation.target, invitation.school.name, role, token);
}

/** Revokes a pending invitation (its link stops working). */
export async function revokeInvitation(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<void> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(invitationActionSchema.safeParse(input));
  await db.$transaction(async (tx) => {
    const updated = await tx.invitation.updateMany({
      where: { id: data.invitationId, schoolId: data.schoolId, kind: "SCHOOL_MEMBER", acceptedAt: null, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    if (updated.count === 0) throw AppError.conflict("This invitation was already accepted or revoked, or doesn't exist.");
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.INVITATION_REVOKE,
      entityType: "Invitation",
      entityId: data.invitationId,
      schoolId: data.schoolId,
      metadata: { operation: CMS_AUDIT_OPERATIONS.invitationRevoke },
      request: request ?? null,
    });
  });
}

/**
 * Removes a membership (any role). The database trigger ends the access it carried in the same transaction: a
 * removed teacher stops teaching the school's classes; a removed student leaves them.
 */
export async function removeSchoolMember(actor: CmsActor, input: unknown, request?: AuditRequestInfo): Promise<void> {
  assertCmsPermission(actor, "school.manage");
  const data = parse(removeMemberSchema.safeParse(input));
  const member = await db.schoolMember.findFirst({
    where: { id: data.memberId, schoolId: data.schoolId },
    select: { id: true, userId: true, role: true, status: true },
  });
  if (!member) throw AppError.notFound("Member not found.");
  if (member.status === "REMOVED") throw AppError.conflict("This membership has already ended.");
  await db.$transaction(async (tx) => {
    const updated = await tx.schoolMember.updateMany({
      where: { id: member.id, status: member.status },
      data: { status: "REMOVED", removedAt: new Date(), removedById: actor.userId },
    });
    if (updated.count === 0) throw AppError.conflict();
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: CMS_AUDIT.SCHOOL_MEMBER_REMOVE,
      entityType: "SchoolMember",
      entityId: member.id,
      schoolId: data.schoolId,
      targetUserId: member.userId,
      before: { role: member.role, status: member.status },
      after: { status: "REMOVED" },
      metadata: { operation: CMS_AUDIT_OPERATIONS.memberRemove },
      reason: data.reason ?? null,
      request: request ?? null,
    });
  });
}
