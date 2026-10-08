import "server-only";
import { z } from "zod";
import type { Prisma, Role, ShareableResultKind } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { DEFAULT_TIMEZONE, isValidTimeZone, localDateString } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { db } from "@/server/db";
import { assertPublicSharingConsent, publicSharingAllowed } from "@/server/family/consent-gate";
import { displayedStreak } from "@/server/gamification/service";
import { randomToken, sha256Hex } from "@/server/lib/crypto";
import { getAppUrl } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, rateLimits, type RateLimitInput } from "@/server/lib/rate-limit";
import {
  DEFAULT_SHARE_DAYS,
  MAX_ACTIVE_SHARES,
  SHARE_NAME_MODES,
  buildShareSnapshot,
  isShareTokenFormat,
  shareDisplayName,
  shareMessage,
  shareSnapshotSchema,
  shareStatus,
  shareUrl,
  whatsappShareHref,
  type ShareFacts,
  type ShareSnapshot,
} from "./core";

/**
 * Shareable results (§46): a student shares "I scored 82% in O-Level Mathematics" behind a random, revocable link.
 *
 * - Facts are read from the student's OWN rows only (attempt, streak, mastery, badge) and frozen in a public-safe
 *   snapshot (./core). The public page `/s/[token]` and its Open Graph image read only the snapshot.
 * - The raw token is 32 random bytes (base64url), returned ONCE; the database keeps SHA-256(token). "Copy the link
 *   again" therefore rotates the token ({@link renewShareLink}); the old link stops working.
 * - Scores are shareable only once marking is final (no provisional numbers in public).
 * - Every share expires (default 180 days, database cap one year); revoked or expired shares 404.
 * - Rate limited (20 new links per hour) and capped at {@link MAX_ACTIVE_SHARES} live links per student.
 * - Minors (MIN-01, src/server/family/consent-gate.ts `public_sharing`): creating or renewing a link needs GRANTED
 *   guardian consent, and a live link of a minor whose consent is not (or no longer) GRANTED stops resolving at once
 *   (the public page 404s), so a withdrawal takes effect without waiting for the link to expire.
 */

/** The acting student. Structurally satisfied by the auth `Actor`. */
export interface ShareActor {
  userId: string;
  roles: readonly Role[];
  timeZone?: string;
}

/** Share links created per user: the shared `shareCreate` preset (`shareCreate:<userId>`, tunable via `rateLimits`). */
export function shareCreateRateLimit(userId: string): RateLimitInput {
  return rateLimits.shareCreate(userId);
}

const TEST_MODES = ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM", "DIAGNOSTIC"] as const;

const nameMode = z.enum(SHARE_NAME_MODES).default("NONE");
export const createShareSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("MOCK_SCORE"), attemptId: z.uuid(), nameMode }),
  z.strictObject({ kind: z.literal("TEST_SCORE"), attemptId: z.uuid(), nameMode }),
  z.strictObject({ kind: z.literal("STREAK"), nameMode }),
  z.strictObject({ kind: z.literal("MASTERY"), subjectId: z.uuid().optional(), nameMode }),
  z.strictObject({ kind: z.literal("ACHIEVEMENT"), achievementId: z.uuid(), nameMode }),
]);
export type CreateShareInput = z.input<typeof createShareSchema>;

export interface CreatedShare {
  shareId: string;
  kind: ShareableResultKind;
  /** Shown once: the raw token is never stored. */
  url: string;
  headline: string;
  /** Prefilled message (headline + app name). */
  message: string;
  whatsappHref: string;
  expiresAt: Date;
}

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

function assertStudent(actor: ShareActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) throw AppError.forbidden("Only students can share results.");
}

function newToken(): { token: string; tokenHash: string } {
  const token = randomToken(32);
  return { token, tokenHash: sha256Hex(token) };
}

function linkFor(token: string, headline: string): Pick<CreatedShare, "url" | "message" | "whatsappHref"> {
  const url = shareUrl(getAppUrl(), token);
  const message = shareMessage(headline, APP_NAME);
  return { url, message, whatsappHref: whatsappShareHref(message, url) };
}

/** Facts of the share, from the actor's own rows. Throws NOT_FOUND / VALIDATION with student-friendly messages. */
async function collectFacts(
  actor: ShareActor,
  input: z.output<typeof createShareSchema>,
  timeZone: string,
  now: Date,
): Promise<{ facts: ShareFacts; achievedOn: string; attemptId: string | null }> {
  switch (input.kind) {
    case "MOCK_SCORE":
    case "TEST_SCORE": {
      const attempt = await db.assessmentAttempt.findFirst({
        where: { id: input.attemptId, userId: actor.userId },
        select: {
          mode: true,
          status: true,
          percentage: true,
          pendingReviewCount: true,
          submittedAt: true,
          subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
        },
      });
      if (!attempt) throw AppError.notFound("We couldn't find that result.");
      const isMock = attempt.mode === "MOCK_EXAM";
      const isTest = (TEST_MODES as readonly string[]).includes(attempt.mode);
      if ((input.kind === "MOCK_SCORE" && !isMock) || (input.kind === "TEST_SCORE" && !isTest)) {
        throw AppError.validation({ kind: ["This result can't be shared as that kind of card."] }, "This result can't be shared that way.");
      }
      if (attempt.status !== "MARKED" || attempt.percentage === null || attempt.pendingReviewCount > 0) {
        throw new AppError("CONFLICT", "You can share this result once marking is finished.");
      }
      return {
        facts: {
          kind: input.kind,
          percentage: attempt.percentage,
          subjectName: attempt.subject.name,
          qualificationName: attempt.subject.qualification.shortName,
          boardName: attempt.subject.qualification.examBoard.shortName,
        },
        achievedOn: localDateString(attempt.submittedAt ?? now, timeZone),
        attemptId: input.attemptId,
      };
    }
    case "STREAK": {
      const stats = await db.learnerStats.findUnique({ where: { userId: actor.userId } });
      const days = displayedStreak(stats, localDateString(now, timeZone));
      if (days < 1) throw new AppError("CONFLICT", "Start a study streak first: meet your daily goal today.");
      return { facts: { kind: "STREAK", days }, achievedOn: localDateString(now, timeZone), attemptId: null };
    }
    case "MASTERY": {
      if (input.subjectId) {
        const enrolment = await db.subjectEnrollment.findUnique({
          where: { userId_subjectId: { userId: actor.userId, subjectId: input.subjectId } },
          select: { subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } } },
        });
        if (!enrolment) throw AppError.notFound("You're not studying that subject.");
        const topics = await db.topicMastery.count({ where: { userId: actor.userId, subjectId: input.subjectId, band: "MASTERED", isLeaf: true } });
        if (topics < 1) throw new AppError("CONFLICT", "Master a topic in this subject first, then share it.");
        return {
          facts: {
            kind: "MASTERY",
            topics,
            subjectName: enrolment.subject.name,
            qualificationName: enrolment.subject.qualification.shortName,
            boardName: enrolment.subject.qualification.examBoard.shortName,
          },
          achievedOn: localDateString(now, timeZone),
          attemptId: null,
        };
      }
      const topics = await db.topicMastery.count({ where: { userId: actor.userId, band: "MASTERED", isLeaf: true } });
      if (topics < 1) throw new AppError("CONFLICT", "Master a topic first, then share it.");
      return { facts: { kind: "MASTERY", topics, subjectName: null, qualificationName: null, boardName: null }, achievedOn: localDateString(now, timeZone), attemptId: null };
    }
    case "ACHIEVEMENT": {
      const earned = await db.userAchievement.findUnique({
        where: { userId_achievementId: { userId: actor.userId, achievementId: input.achievementId } },
        select: { unlockedAt: true, achievement: { select: { name: true } } },
      });
      if (!earned) throw AppError.notFound("You haven't earned that badge yet.");
      return { facts: { kind: "ACHIEVEMENT", achievementName: earned.achievement.name }, achievedOn: localDateString(earned.unlockedAt, timeZone), attemptId: null };
    }
  }
}

/**
 * Creates a share link for one of the student's results (§46). Returns the link ONCE (with a WhatsApp link).
 *
 * @throws AppError FORBIDDEN (not a student), VALIDATION, NOT_FOUND (not theirs), CONFLICT (not final / nothing to
 *         share / too many live links), RATE_LIMITED.
 */
export async function createShareableResult(actor: ShareActor, input: unknown, now: Date = new Date()): Promise<CreatedShare> {
  assertStudent(actor);
  const parsed = createShareSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "That can't be shared.");
  await assertPublicSharingConsent(actor);
  await assertRateLimit(shareCreateRateLimit(actor.userId), "You've created a lot of share links. Please try again later.");

  const profile = await db.profile.findUnique({ where: { userId: actor.userId }, select: { firstName: true, username: true, timezone: true } });
  const timeZone = safeZone(actor.timeZone ?? profile?.timezone);
  const displayName = shareDisplayName(parsed.data.nameMode, { firstName: profile?.firstName ?? null, username: profile?.username ?? null });
  if (parsed.data.nameMode !== "NONE" && displayName === null) {
    throw AppError.validation({ nameMode: ["That name isn't available on your profile. Share without a name instead."] });
  }
  const { facts, achievedOn, attemptId } = await collectFacts(actor, parsed.data, timeZone, now);
  const snapshot = buildShareSnapshot(facts, { displayName, achievedOn });

  const active = await db.shareableResult.count({ where: { userId: actor.userId, revokedAt: null, expiresAt: { gt: now } } });
  if (active >= MAX_ACTIVE_SHARES) {
    throw new AppError("CONFLICT", "You have too many live share links. Turn some off on your Achievements page first.");
  }
  const { token, tokenHash } = newToken();
  const expiresAt = new Date(now.getTime() + DEFAULT_SHARE_DAYS * 86_400_000);
  const share = await db.shareableResult.create({
    data: {
      userId: actor.userId,
      attemptId,
      kind: parsed.data.kind,
      tokenHash,
      snapshot: snapshot as Prisma.InputJsonObject,
      createdAt: now,
      expiresAt,
    },
    select: { id: true },
  });
  logger.info("sharing: share link created", { shareId: share.id, kind: parsed.data.kind });
  return { shareId: share.id, kind: parsed.data.kind, headline: snapshot.headline, expiresAt, ...linkFor(token, snapshot.headline) };
}

async function ownLiveShare(actor: ShareActor, shareId: string, now: Date) {
  if (!z.uuid().safeParse(shareId).success) throw AppError.notFound("We couldn't find that share link.");
  const share = await db.shareableResult.findFirst({
    where: { id: shareId, userId: actor.userId },
    select: { id: true, kind: true, snapshot: true, revokedAt: true, expiresAt: true },
  });
  if (!share) throw AppError.notFound("We couldn't find that share link.");
  if (shareStatus(share, now) !== "ACTIVE") throw new AppError("CONFLICT", "This share link is no longer active. Create a new one.");
  return share;
}

/**
 * Issues a new token for one of the student's live shares ("copy the link again") and returns the new link. The old
 * link stops working at once.
 */
export async function renewShareLink(actor: ShareActor, shareId: string, now: Date = new Date()): Promise<CreatedShare> {
  assertStudent(actor);
  await assertPublicSharingConsent(actor);
  await assertRateLimit(shareCreateRateLimit(actor.userId), "You've created a lot of share links. Please try again later.");
  const share = await ownLiveShare(actor, shareId, now);
  const snapshot = shareSnapshotSchema.safeParse(share.snapshot);
  if (!snapshot.success) throw new AppError("CONFLICT", "This share link can't be renewed. Create a new one.");
  const { token, tokenHash } = newToken();
  await db.shareableResult.update({ where: { id: share.id }, data: { tokenHash } });
  return { shareId: share.id, kind: share.kind, headline: snapshot.data.headline, expiresAt: share.expiresAt, ...linkFor(token, snapshot.data.headline) };
}

/** Turns a share link off (idempotent for an already revoked link of the student's own). */
export async function revokeShareableResult(actor: ShareActor, shareId: string, now: Date = new Date()): Promise<{ revoked: boolean }> {
  assertStudent(actor);
  if (!z.uuid().safeParse(shareId).success) throw AppError.notFound("We couldn't find that share link.");
  const { count } = await db.shareableResult.updateMany({ where: { id: shareId, userId: actor.userId, revokedAt: null }, data: { revokedAt: now } });
  if (count === 0) {
    const exists = await db.shareableResult.findFirst({ where: { id: shareId, userId: actor.userId }, select: { id: true } });
    if (!exists) throw AppError.notFound("We couldn't find that share link.");
    return { revoked: false };
  }
  return { revoked: true };
}

export interface MyShare {
  shareId: string;
  kind: ShareableResultKind;
  headline: string;
  createdAt: Date;
  expiresAt: Date;
  status: "ACTIVE" | "EXPIRED" | "REVOKED";
  viewCount: number;
}

/** The student's share links, newest first (manage / turn off). */
export async function listMyShares(actor: ShareActor, options: { limit?: number; now?: Date } = {}): Promise<MyShare[]> {
  assertStudent(actor);
  const now = options.now ?? new Date();
  const rows = await db.shareableResult.findMany({
    where: { userId: actor.userId },
    orderBy: [{ createdAt: "desc" }],
    take: Math.max(1, Math.min(100, options.limit ?? 20)),
    select: { id: true, kind: true, snapshot: true, createdAt: true, expiresAt: true, revokedAt: true, viewCount: true },
  });
  return rows.map((row) => {
    const snapshot = shareSnapshotSchema.safeParse(row.snapshot);
    return {
      shareId: row.id,
      kind: row.kind,
      headline: snapshot.success ? snapshot.data.headline : "Shared result",
      createdAt: row.createdAt,
      expiresAt: row.expiresAt,
      status: shareStatus(row, now),
      viewCount: row.viewCount,
    };
  });
}

/** What the public page may show: the snapshot and the card kind. No user id, attempt id or anything else. */
export interface PublicShare {
  kind: ShareableResultKind;
  snapshot: ShareSnapshot;
}

/**
 * Resolves a public share token (`/s/[token]`): null when the token is malformed, unknown, revoked or expired, or the
 * stored snapshot fails validation (never rendered half-trusted).
 */
export async function getPublicShare(token: string, now: Date = new Date()): Promise<PublicShare | null> {
  if (!isShareTokenFormat(token)) return null;
  const share = await db.shareableResult.findUnique({
    where: { tokenHash: sha256Hex(token) },
    select: {
      kind: true,
      snapshot: true,
      revokedAt: true,
      expiresAt: true,
      user: { select: { student: { select: { isMinor: true, guardianConsentStatus: true } } } },
    },
  });
  if (!share || shareStatus(share, now) !== "ACTIVE") return null;
  // A minor's link stops resolving as soon as guardian consent is not (or no longer) GRANTED (MIN-01).
  if (!publicSharingAllowed(share.user.student)) return null;
  const snapshot = shareSnapshotSchema.safeParse(share.snapshot);
  if (!snapshot.success) {
    logger.warn("sharing: stored snapshot failed validation; not shown");
    return null;
  }
  return { kind: share.kind, snapshot: snapshot.data };
}

/** Counts a view of a live share (best effort; never throws). */
export async function recordShareView(token: string, now: Date = new Date()): Promise<void> {
  if (!isShareTokenFormat(token)) return;
  try {
    await db.shareableResult.updateMany({
      where: { tokenHash: sha256Hex(token), revokedAt: null, expiresAt: { gt: now } },
      data: { viewCount: { increment: 1 }, lastViewedAt: now },
    });
  } catch (error) {
    logger.warn("sharing: view count failed", { err: error });
  }
}

/**
 * Deletes share rows that expired or were revoked more than `graceDays` ago (ARCHITECTURE §3.7 maintenance.purge:
 * "expired share cards"). Batched; returns rows deleted.
 */
export async function purgeExpiredShares(options: { now?: Date; graceDays?: number; batchSize?: number } = {}): Promise<number> {
  const now = options.now ?? new Date();
  const cutoff = new Date(now.getTime() - (options.graceDays ?? 30) * 86_400_000);
  const batchSize = Math.max(1, Math.min(10_000, options.batchSize ?? 1_000));
  let deleted = 0;
  for (;;) {
    const ids = await db.shareableResult.findMany({
      where: { OR: [{ expiresAt: { lt: cutoff } }, { revokedAt: { lt: cutoff } }] },
      select: { id: true },
      take: batchSize,
    });
    if (ids.length === 0) break;
    const { count } = await db.shareableResult.deleteMany({ where: { id: { in: ids.map((row) => row.id) } } });
    deleted += count;
    if (ids.length < batchSize) break;
  }
  return deleted;
}
