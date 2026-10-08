import "server-only";
import { z } from "zod";
import type { ChannelIdentity } from "@/generated/prisma/client";
import { loadActor, type Actor } from "@/server/auth/actor";
import { maskIdentifier, normalizePhone } from "@/server/auth/identifiers";
import { assertOtpSendAllowed, issueOtp, verifyOtp } from "@/server/auth/otp";
import { evaluateSession } from "@/server/auth/session-policy";
import { createSession, revokeSession, type RequestMeta } from "@/server/auth/sessions";
import { db, type DbClient } from "@/server/db";
import { requireFeature } from "@/server/features";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { whatsappChannelAvailable } from "./config";
import { guardianConsentAllows, isOptedIn } from "./policy";
import { saveConversationState } from "./state";
import { WHATSAPP_TEMPLATES } from "./templates";

/**
 * WhatsApp identity linking (§30, ARCHITECTURE §8 step 5) and the actor behind an identity.
 *
 * Linking is started from the web app by a signed-in STUDENT (Settings → WhatsApp): they enter their WhatsApp number,
 * a 6-digit code (VerificationCode purpose CHANNEL_LINK, channel WHATSAPP, HMAC-stored, 10 min, 5 tries) is sent TO
 * that number through the approved authentication template, and typing it back proves they control the number. Then,
 * in one transaction: the identity is linked and verified (and opted in to reminders only when the student ticked the
 * box), any other number of the student is unlinked, a number previously linked to someone else moves to this
 * account (whoever holds the phone decides; no account enumeration), a WHATSAPP Session (auth method CHANNEL_LINK) is
 * created and the link is audited.
 *
 * The WHATSAPP session ties the channel to the normal session controls: "sign out everywhere", a password change and
 * suspension end it, and the next message is answered with "link it again". Each processed message keeps the session
 * alive (rotated at most weekly through the auth service), so an idle number lapses after the API-session idle limit.
 *
 * Minors (§5.12): a student marked under 18 can link only once a guardian consented (GuardianConsentStatus GRANTED);
 * if consent is withdrawn later the channel stops serving them until it is granted again.
 */

const CHANNEL = "WHATSAPP" as const;
/** Rotate the WHATSAPP session once it has not been refreshed for this long (sliding idle expiry). */
export const SESSION_REFRESH_MS = 7 * 24 * 3_600_000;
const SESSION_LABEL = "WhatsApp";

const phoneSchema = z.string().trim().min(1, { error: "Enter your WhatsApp number." }).max(32);
const codeSchema = z.string().trim().regex(/^\d{6}$/, { error: "Enter the 6-digit code." });

export const requestLinkCodeSchema = z.strictObject({ phone: phoneSchema });
export const confirmLinkSchema = z.strictObject({ phone: phoneSchema, code: codeSchema, reminders: z.boolean().default(false) });

export type WhatsAppUserActor = Pick<Actor, "userId" | "roles">;

function parse<S extends z.ZodType>(schema: S, value: unknown): z.output<S> {
  const result = schema.safeParse(value);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

function phoneOrThrow(raw: string): string {
  const phone = normalizePhone(raw);
  if (!phone) throw AppError.validation({ phone: ["Enter a valid WhatsApp number, for example 077 123 4567 or +263 77 123 4567."] });
  return phone;
}

/** Students only (guards.ts is not imported here: it pulls in `next/navigation`, which the worker cannot load). */
function assertStudent(actor: WhatsAppUserActor): void {
  if (!actor.roles.includes("STUDENT")) throw AppError.forbidden("WhatsApp study help is for student accounts.");
}

async function consentFor(userId: string, client: DbClient = db) {
  return client.student.findUnique({ where: { userId }, select: { isMinor: true, guardianConsentStatus: true } });
}

function consentError(): AppError {
  return new AppError(
    "FORBIDDEN",
    "WhatsApp study help needs a parent or guardian's consent first. Ask them to approve your account from their parent account.",
    { details: { reason: "guardian_consent_required" } },
  );
}

function unavailableError(): AppError {
  return new AppError("BAD_REQUEST", "WhatsApp isn't available yet. Please try again later.", { details: { reason: "whatsapp_not_configured" } });
}

// =====================================================================================================================
// Settings page
// =====================================================================================================================

export interface WhatsAppLinkStatus {
  /** Codes can be sent on this server (Cloud API configured, or the dev console driver). */
  available: boolean;
  /** A minor without guardian consent: linking is refused until consent is granted. */
  consentRequired: boolean;
  linked: { phoneMasked: string; linkedAt: Date | null; remindersOn: boolean } | null;
}

export async function getWhatsAppLinkStatus(actor: WhatsAppUserActor): Promise<WhatsAppLinkStatus> {
  assertStudent(actor);
  const [student, identity] = await Promise.all([
    consentFor(actor.userId),
    db.channelIdentity.findUnique({
      where: { userId_channel: { userId: actor.userId, channel: CHANNEL } },
      select: { externalId: true, verifiedAt: true, linkedAt: true, optedInAt: true, optedOutAt: true },
    }),
  ]);
  return {
    available: whatsappChannelAvailable(),
    consentRequired: !guardianConsentAllows(student),
    linked:
      identity && identity.verifiedAt
        ? { phoneMasked: maskIdentifier(identity.externalId), linkedAt: identity.linkedAt, remindersOn: isOptedIn(identity) }
        : null,
  };
}

/**
 * Sends a CHANNEL_LINK code to the WhatsApp number (authentication template). Limits: 60 s resend cooldown, 3 per 15
 * minutes and 10 per day per number, 20 per hour per IP (the shared OTP limits).
 *
 * @throws AppError NOT_FOUND (channel switched off, `features.whatsapp`) | VALIDATION (number) | FORBIDDEN (not a
 *   student, guardian consent) | RATE_LIMITED | BAD_REQUEST (WhatsApp not configured)
 */
export async function requestWhatsAppLinkCode(
  actor: WhatsAppUserActor,
  raw: z.input<typeof requestLinkCodeSchema>,
  meta: RequestMeta,
): Promise<{ phone: string; phoneMasked: string; expiresAt: Date }> {
  await requireFeature("whatsapp");
  assertStudent(actor);
  const input = parse(requestLinkCodeSchema, raw);
  const phone = phoneOrThrow(input.phone);
  if (!whatsappChannelAvailable()) throw unavailableError();
  if (!guardianConsentAllows(await consentFor(actor.userId))) throw consentError();
  await assertOtpSendAllowed("CHANNEL_LINK", phone, meta.ip);
  const { expiresAt } = await issueOtp({
    purpose: "CHANNEL_LINK",
    target: phone,
    channel: "WHATSAPP",
    userId: actor.userId,
    ip: meta.ip,
    context: { channel: CHANNEL, externalId: phone },
    checkLimits: false,
  });
  // Cost reporting: authentication templates are billed by Meta. The code itself is never stored (contentClass OTP).
  await db.channelMessage
    .create({
      data: {
        channel: CHANNEL,
        direction: "OUTBOUND",
        status: "SENT",
        contentClass: "OTP",
        messageType: "template",
        templateName: WHATSAPP_TEMPLATES.linkCode.name,
        pricingCategory: "authentication",
        sentAt: new Date(),
      },
      select: { id: true },
    })
    .catch((error: unknown) => logger.warn("whatsapp: could not record the link-code send", { err: error }));
  return { phone, phoneMasked: maskIdentifier(phone), expiresAt };
}

const linkCodeContextSchema = z.object({ channel: z.literal(CHANNEL), externalId: z.string() });

/**
 * Confirms a link code and links the number (module header).
 *
 * @throws AppError VALIDATION (wrong / expired code: one generic message) | FORBIDDEN | RATE_LIMITED
 */
export async function confirmWhatsAppLink(
  actor: WhatsAppUserActor,
  raw: z.input<typeof confirmLinkSchema>,
  meta: RequestMeta,
  options: { now?: Date } = {},
): Promise<{ phoneMasked: string; transferred: boolean }> {
  assertStudent(actor);
  const input = parse(confirmLinkSchema, raw);
  const phone = phoneOrThrow(input.phone);
  if (!guardianConsentAllows(await consentFor(actor.userId))) throw consentError();
  const invalid = () => AppError.validation({ code: ["That code is wrong or has expired. Ask for a new one."] }, "That code is wrong or has expired.");
  const verification = await verifyOtp({ purpose: "CHANNEL_LINK", target: phone, code: input.code });
  if (!verification.ok || verification.userId !== actor.userId) throw invalid();
  const context = linkCodeContextSchema.safeParse(verification.context);
  if (!context.success || context.data.externalId !== phone) throw invalid();
  const now = options.now ?? new Date();

  const transferred = await db.$transaction(async (tx) => {
    // The student's previous number (if another one) stops acting for them.
    await tx.channelIdentity.updateMany({
      where: { userId: actor.userId, channel: CHANNEL, NOT: { externalId: phone } },
      data: { userId: null, verifiedAt: null, linkedAt: null, optedInAt: null },
    });
    const existing = await tx.channelIdentity.findUnique({
      where: { channel_externalId: { channel: CHANNEL, externalId: phone } },
      select: { id: true, userId: true },
    });
    const previousOwner = existing?.userId && existing.userId !== actor.userId ? existing.userId : null;
    const linkFields = {
      userId: actor.userId,
      verifiedAt: now,
      linkedAt: now,
      optedInAt: input.reminders ? now : null,
      ...(input.reminders ? { optedOutAt: null } : {}),
    };
    const identity = existing
      ? await tx.channelIdentity.update({ where: { id: existing.id }, data: linkFields, select: { id: true } })
      : await tx.channelIdentity.create({ data: { channel: CHANNEL, externalId: phone, ...linkFields }, select: { id: true } });
    await saveConversationState(tx, identity.id, { kind: "idle" });

    const owners = [actor.userId, ...(previousOwner ? [previousOwner] : [])];
    const sessions = await tx.session.findMany({ where: { userId: { in: owners }, kind: "WHATSAPP", revokedAt: null }, select: { id: true } });
    for (const session of sessions) await revokeSession(session.id, "whatsapp_relinked", tx);
    await createSession(actor.userId, "WHATSAPP", meta, { authMethod: "CHANNEL_LINK", label: SESSION_LABEL, roles: actor.roles, client: tx, now });

    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      // TODO(shared): a dedicated `channel.link` audit action; contact verification is the closest existing key.
      action: AUDIT_ACTIONS.AUTH_CONTACT_VERIFY,
      entityType: "ChannelIdentity",
      entityId: identity.id,
      targetUserId: actor.userId,
      metadata: { channel: CHANNEL, operation: "whatsapp.link", transferred: previousOwner !== null, reminders: input.reminders },
      request: { requestId: meta.requestId ?? null, ip: meta.ip, userAgent: meta.userAgent },
    });
    return previousOwner !== null;
  });
  return { phoneMasked: maskIdentifier(phone), transferred };
}

/** Unlinks the student's number (Settings → WhatsApp). Idempotent: `false` when nothing was linked. */
export async function unlinkWhatsApp(actor: WhatsAppUserActor, meta: RequestMeta): Promise<boolean> {
  assertStudent(actor);
  return db.$transaction(async (tx) => {
    const identity = await tx.channelIdentity.findUnique({
      where: { userId_channel: { userId: actor.userId, channel: CHANNEL } },
      select: { id: true },
    });
    const sessions = await tx.session.findMany({ where: { userId: actor.userId, kind: "WHATSAPP", revokedAt: null }, select: { id: true } });
    for (const session of sessions) await revokeSession(session.id, "whatsapp_unlinked", tx);
    if (!identity) return false;
    await tx.channelIdentity.update({ where: { id: identity.id }, data: { userId: null, verifiedAt: null, linkedAt: null, optedInAt: null } });
    await saveConversationState(tx, identity.id, { kind: "idle" });
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      // TODO(shared): a dedicated `channel.unlink` audit action.
      action: AUDIT_ACTIONS.AUTH_SESSIONS_REVOKE,
      entityType: "ChannelIdentity",
      entityId: identity.id,
      targetUserId: actor.userId,
      metadata: { channel: CHANNEL, operation: "whatsapp.unlink", count: sessions.length },
      request: { requestId: meta.requestId ?? null, ip: meta.ip, userAgent: meta.userAgent },
    });
    return true;
  });
}

/** Turns proactive WhatsApp reminders on or off from Settings (STOP / START do the same from WhatsApp). */
export async function setWhatsAppReminders(actor: WhatsAppUserActor, on: boolean, now: Date = new Date()): Promise<{ remindersOn: boolean }> {
  assertStudent(actor);
  const updated = await db.channelIdentity.updateMany({
    where: { userId: actor.userId, channel: CHANNEL, verifiedAt: { not: null } },
    data: on ? { optedInAt: now } : { optedOutAt: now },
  });
  if (updated.count === 0) throw AppError.notFound("Link your WhatsApp number first.");
  return { remindersOn: on };
}

/** STOP / START from WhatsApp (any identity, linked or not). */
export async function setIdentityOptOut(client: DbClient, identityId: string, optedOut: boolean, now: Date): Promise<void> {
  await client.channelIdentity.update({ where: { id: identityId }, data: optedOut ? { optedOutAt: now } : { optedInAt: now } });
}

// =====================================================================================================================
// Identity -> actor (worker)
// =====================================================================================================================

export type IdentityFacts = Pick<ChannelIdentity, "id" | "userId" | "verifiedAt" | "externalId">;

export type ResolvedIdentity =
  | { status: "unlinked" }
  | { status: "lapsed" }
  | { status: "consent_required"; actor: Actor }
  | { status: "linked"; actor: Actor };

async function unlinkLapsed(identityId: string): Promise<void> {
  await db.$transaction(async (tx) => {
    await tx.channelIdentity.update({ where: { id: identityId }, data: { userId: null, verifiedAt: null, linkedAt: null, optedInAt: null } });
    await saveConversationState(tx, identityId, { kind: "idle" });
  });
}

/**
 * The actor an inbound message acts as. A linked identity whose WHATSAPP session was revoked (sign out everywhere,
 * password change, unlink) or expired, or whose user can no longer act, is unlinked here and reported as `lapsed`.
 */
export async function resolveIdentityActor(identity: IdentityFacts, now: Date = new Date()): Promise<ResolvedIdentity> {
  if (!identity.userId || !identity.verifiedAt) return { status: "unlinked" };
  const userId = identity.userId;
  const session = await db.session.findFirst({
    where: { userId, kind: "WHATSAPP", revokedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      kind: true,
      createdAt: true,
      lastSeenAt: true,
      expiresAt: true,
      absoluteExpiresAt: true,
      revokedAt: true,
      user: { select: { status: true, roles: true, passwordUpdatedAt: true } },
    },
  });
  const verdict = session ? evaluateSession(session, now) : null;
  if (!session || !verdict?.valid) {
    await unlinkLapsed(identity.id);
    return { status: "lapsed" };
  }
  let sessionId = session.id;
  if (now.getTime() - session.lastSeenAt.getTime() >= SESSION_REFRESH_MS) {
    // Sliding expiry through the auth service: a fresh session replaces the old one.
    sessionId = await db.$transaction(async (tx) => {
      await revokeSession(session.id, "rotated", tx);
      const created = await createSession(userId, "WHATSAPP", { ip: null, userAgent: null }, {
        authMethod: "CHANNEL_LINK",
        label: SESSION_LABEL,
        roles: session.user.roles,
        client: tx,
        now,
      });
      return created.session.id;
    });
  }
  const actor = await loadActor(userId, { sessionId, channel: "whatsapp" });
  if (!actor) {
    await unlinkLapsed(identity.id);
    return { status: "lapsed" };
  }
  if (!actor.roles.includes("STUDENT")) return { status: "consent_required", actor };
  const student = await consentFor(userId);
  return guardianConsentAllows(student) ? { status: "linked", actor } : { status: "consent_required", actor };
}
