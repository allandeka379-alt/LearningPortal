import "server-only";
import type { GuardianConsentStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { getKnownSetting } from "@/server/lib/settings";

/**
 * What a minor's guardian consent (Student.isMinor / guardianConsentStatus, recorded by ./consent.ts) restricts
 * (ARCHITECTURE §5.12; privacy notice "Children"). The one place features ask before processing a minor's data in a way
 * that needs it, so the policy changes here, not per feature.
 *
 * `ai_processing`: the student's own text and photos sent to the AI provider (tutor, solver, solver photo uploads; a
 * cross-border transfer to the US provider).
 * - Adults (`isMinor = false`, status NOT_REQUIRED) and minors with GRANTED consent: allowed.
 * - WITHDRAWN and REFUSED: always refused. A parent who withdrew (or refused) consent must actually stop the processing
 *   (MIN-01); before this gate only WhatsApp honoured it.
 * - PENDING (no guardian has answered yet; every self-registered minor starts here): refused only while the
 *   `privacy.minorAiConsentRequired` setting is on. The age threshold and exact consent requirements are still to be
 *   confirmed against the Act (legal TBC), so the platform switch decides without a deploy; default off.
 * - Not a student (no Student row): not this gate's concern; the features check their own roles.
 * The same rule covers AI MARKING of a minor's free-text answers (`ai.mark` job): refused answers never reach the model
 * and are marked without AI (self-assessment where allowed, otherwise a teacher or reviewer), see
 * {@link aiProcessingRefusedFor} and src/server/attempts/ai-marking.ts.
 *
 * `public_sharing`: the minor's results or full name shown to people outside the platform or to every student (public
 * share links `/s/[token]`, the REAL_NAME leaderboard mode). Stricter than AI: a minor needs GRANTED consent (PENDING,
 * REFUSED and WITHDRAWN all refuse; legal TBC, so the conservative reading). Adults and non-students are not gated.
 * Where a softer fallback exists the feature uses it instead of refusing (leaderboards show "first name + initial").
 */

export type ConsentGatedFeature = "ai_processing" | "public_sharing";

export const MINOR_AI_CONSENT_SETTING = "privacy.minorAiConsentRequired";

export const GUARDIAN_CONSENT_REASON = "GUARDIAN_CONSENT_REQUIRED";

export interface MinorConsentFacts {
  isMinor: boolean;
  guardianConsentStatus: GuardianConsentStatus;
}

/** Pure decision: does this student's consent state refuse the gated processing? */
export function guardianConsentRefuses(student: MinorConsentFacts | null, policy: { pendingRefused: boolean }): boolean {
  if (student === null || !student.isMinor) return false;
  switch (student.guardianConsentStatus) {
    case "GRANTED":
    case "NOT_REQUIRED":
      return false;
    case "REFUSED":
    case "WITHDRAWN":
      return true;
    case "PENDING":
      return policy.pendingRefused;
  }
}

/**
 * Pure decision for `public_sharing`: may this student's results or full name be shown publicly? Adults and
 * non-students yes; minors only with GRANTED guardian consent.
 */
export function publicSharingAllowed(student: MinorConsentFacts | null): boolean {
  if (student === null || !student.isMinor) return true;
  return student.guardianConsentStatus === "GRANTED";
}

function refusal(status: GuardianConsentStatus, feature: ConsentGatedFeature): AppError {
  const message =
    feature === "public_sharing"
      ? status === "WITHDRAWN"
        ? "Your parent or guardian has withdrawn their consent, so sharing your results publicly is switched off for your account."
        : "Sharing your results publicly needs your parent or guardian's consent first. Ask them to link to your account and give consent from their parent account."
      : status === "WITHDRAWN"
        ? "Your parent or guardian has withdrawn their consent, so the AI tutor and solver are switched off for your account. They can give consent again from their parent account."
        : "The AI tutor and solver need your parent or guardian's consent first. Ask them to link to your account and give consent from their parent account.";
  return AppError.forbidden(message, { reason: GUARDIAN_CONSENT_REASON, consent: status, feature });
}

/** Consent facts of many students in one query (users without a Student row are absent from the map). */
export async function loadMinorConsentFacts(userIds: readonly string[]): Promise<Map<string, MinorConsentFacts>> {
  const unique = [...new Set(userIds)];
  if (unique.length === 0) return new Map();
  const rows = await db.student.findMany({
    where: { userId: { in: unique } },
    select: { userId: true, isMinor: true, guardianConsentStatus: true },
  });
  return new Map(rows.map((row) => [row.userId, { isMinor: row.isMinor, guardianConsentStatus: row.guardianConsentStatus }]));
}

/**
 * Batch form of the `ai_processing` gate for background work on many students' text (the `ai.mark` job): the users
 * among `userIds` whose guardian consent refuses AI processing. One query, plus the platform setting only when a
 * PENDING minor is among them.
 */
export async function aiProcessingRefusedFor(userIds: readonly string[]): Promise<Set<string>> {
  const facts = await loadMinorConsentFacts(userIds);
  const anyPending = [...facts.values()].some((student) => student.isMinor && student.guardianConsentStatus === "PENDING");
  const pendingRefused = anyPending ? await getKnownSetting(MINOR_AI_CONSENT_SETTING) : false;
  const refused = new Set<string>();
  for (const [userId, student] of facts) if (guardianConsentRefuses(student, { pendingRefused })) refused.add(userId);
  return refused;
}

/**
 * Refuses public sharing (share links) for a minor without GRANTED guardian consent (see module docs).
 *
 * @throws AppError FORBIDDEN (details.reason = GUARDIAN_CONSENT_REQUIRED, feature = public_sharing)
 */
export async function assertPublicSharingConsent(actor: { userId: string }): Promise<void> {
  const student = await db.student.findUnique({
    where: { userId: actor.userId },
    select: { isMinor: true, guardianConsentStatus: true },
  });
  if (publicSharingAllowed(student)) return;
  throw refusal(student!.guardianConsentStatus, "public_sharing");
}

/**
 * Refuses `feature` for a minor whose guardian consent does not allow it (see module docs). Call it next to the
 * feature's entitlement check, before any upload or model call.
 *
 * @throws AppError FORBIDDEN (details.reason = GUARDIAN_CONSENT_REQUIRED)
 */
export async function assertGuardianConsent(actor: { userId: string }, feature: ConsentGatedFeature): Promise<void> {
  const student = await db.student.findUnique({
    where: { userId: actor.userId },
    select: { isMinor: true, guardianConsentStatus: true },
  });
  if (student === null || !student.isMinor) return;
  const status = student.guardianConsentStatus;
  if (status === "GRANTED" || status === "NOT_REQUIRED") return;
  const pendingRefused = status === "PENDING" ? await getKnownSetting(MINOR_AI_CONSENT_SETTING) : false;
  if (guardianConsentRefuses(student, { pendingRefused })) throw refusal(status, feature);
}
