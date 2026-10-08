/**
 * Shareable results (§46 "shareable results ... Share 'I scored 82% in O-Level Mathematics.' without exposing sensitive
 * information"; ARCHITECTURE §5.12 "first name (optional), subject, level and score only, behind a revocable token").
 * Pure core: no DB, no I/O.
 *
 * A share stores a SNAPSHOT of public-safe facts chosen at share time (ShareableResult.snapshot); the public page and
 * its Open Graph image read nothing else. Never a surname, school, contact detail, photo, attempt id or AI content.
 */
import { z } from "zod";
import type { ShareableResultKind } from "@/generated/prisma/client";

export const SHARE_KINDS = ["MOCK_SCORE", "TEST_SCORE", "STREAK", "MASTERY", "ACHIEVEMENT"] as const satisfies readonly ShareableResultKind[];

/** How the sharer's name appears: nothing (default), first name only, or the public username. Never a surname. */
export const SHARE_NAME_MODES = ["NONE", "FIRST_NAME", "USERNAME"] as const;
export type ShareNameMode = (typeof SHARE_NAME_MODES)[number];

/** Default lifetime of a share link; the database caps every share at one year (ShareableResult_values_chk). */
export const DEFAULT_SHARE_DAYS = 180;
export const MAX_SHARE_DAYS = 365;
/** Active (not revoked, not expired) shares one student may hold. */
export const MAX_ACTIVE_SHARES = 50;

/** Raw share tokens are 32 random bytes in base64url (43 characters, no padding). */
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

export function isShareTokenFormat(value: unknown): value is string {
  return typeof value === "string" && TOKEN_PATTERN.test(value);
}

const shortText = (max: number) => z.string().trim().min(1).max(max);

/** ShareableResult.snapshot (schema doc). Strict: unknown keys are refused, so nothing private can ride along. */
export const shareSnapshotSchema = z.strictObject({
  headline: shortText(160),
  displayName: shortText(60).optional(),
  value: z.number().min(0).max(100_000),
  unit: z.enum(["PERCENT", "DAYS", "TOPICS", "BADGE"]),
  boardName: shortText(60).optional(),
  qualificationName: shortText(80).optional(),
  subjectName: shortText(120).optional(),
  achievementName: shortText(100).optional(),
  achievedOn: z.iso.date(),
});
export type ShareSnapshot = z.infer<typeof shareSnapshotSchema>;

/** Facts for one share, collected by the service from the student's OWN rows. */
export type ShareFacts =
  | { kind: "MOCK_SCORE" | "TEST_SCORE"; percentage: number; subjectName: string; qualificationName: string | null; boardName: string | null }
  | { kind: "STREAK"; days: number }
  | { kind: "MASTERY"; topics: number; subjectName: string | null; qualificationName: string | null; boardName: string | null }
  | { kind: "ACHIEVEMENT"; achievementName: string };

function subjectLabel(qualificationName: string | null, subjectName: string): string {
  return qualificationName ? `${qualificationName} ${subjectName}` : subjectName;
}

function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

/** The one-line, first-person headline of a share (§46 wording). */
export function shareHeadline(facts: ShareFacts): string {
  switch (facts.kind) {
    case "MOCK_SCORE":
    case "TEST_SCORE":
      return `I scored ${Math.round(facts.percentage)}% in ${subjectLabel(facts.qualificationName, facts.subjectName)}`;
    case "STREAK":
      return `I've studied ${plural(facts.days, "day")} in a row`;
    case "MASTERY":
      return facts.subjectName
        ? `I've mastered ${plural(facts.topics, "topic")} in ${subjectLabel(facts.qualificationName, facts.subjectName)}`
        : `I've mastered ${plural(facts.topics, "topic")}`;
    case "ACHIEVEMENT":
      return `I earned the “${facts.achievementName}” badge`;
  }
}

/** Small label above the headline on the card. */
export function shareKindLabel(kind: ShareableResultKind): string {
  switch (kind) {
    case "MOCK_SCORE":
      return "Mock exam result";
    case "TEST_SCORE":
      return "Test result";
    case "STREAK":
      return "Study streak";
    case "MASTERY":
      return "Topic mastery";
    case "ACHIEVEMENT":
      return "Badge earned";
  }
}

/** Builds and validates the snapshot stored on the share (throws ZodError on anything unexpected). */
export function buildShareSnapshot(facts: ShareFacts, options: { displayName: string | null; achievedOn: string }): ShareSnapshot {
  const base = {
    headline: shareHeadline(facts),
    ...(options.displayName ? { displayName: options.displayName } : {}),
    achievedOn: options.achievedOn,
  };
  switch (facts.kind) {
    case "MOCK_SCORE":
    case "TEST_SCORE":
      return shareSnapshotSchema.parse({
        ...base,
        value: Math.round(facts.percentage),
        unit: "PERCENT",
        subjectName: facts.subjectName,
        ...(facts.qualificationName ? { qualificationName: facts.qualificationName } : {}),
        ...(facts.boardName ? { boardName: facts.boardName } : {}),
      });
    case "STREAK":
      return shareSnapshotSchema.parse({ ...base, value: facts.days, unit: "DAYS" });
    case "MASTERY":
      return shareSnapshotSchema.parse({
        ...base,
        value: facts.topics,
        unit: "TOPICS",
        ...(facts.subjectName ? { subjectName: facts.subjectName } : {}),
        ...(facts.qualificationName ? { qualificationName: facts.qualificationName } : {}),
        ...(facts.boardName ? { boardName: facts.boardName } : {}),
      });
    case "ACHIEVEMENT":
      return shareSnapshotSchema.parse({ ...base, value: 1, unit: "BADGE", achievementName: facts.achievementName });
  }
}

/**
 * The sharer's name for the card: first name only (first word, so a surname typed into the first-name field never
 * leaks) or the public username; null for NONE or when the profile has no such value.
 */
export function shareDisplayName(mode: ShareNameMode, profile: { firstName: string | null; username: string | null }): string | null {
  if (mode === "FIRST_NAME") {
    const first = profile.firstName?.trim().split(/\s+/u)[0];
    return first ? first.slice(0, 60) : null;
  }
  if (mode === "USERNAME") return profile.username?.trim() || null;
  return null;
}

/** Big value on the card: "82%", "14 days", "12 topics" or the badge name. */
export function shareValueLabel(snapshot: Pick<ShareSnapshot, "value" | "unit" | "achievementName">): string {
  switch (snapshot.unit) {
    case "PERCENT":
      return `${Math.round(snapshot.value)}%`;
    case "DAYS":
      return plural(Math.round(snapshot.value), "day");
    case "TOPICS":
      return plural(Math.round(snapshot.value), "topic");
    case "BADGE":
      return snapshot.achievementName ?? "Badge";
  }
}

/** The public URL of a share (`/s/<token>`). */
export function shareUrl(appUrl: string, token: string): string {
  return `${appUrl.replace(/\/+$/, "")}/s/${encodeURIComponent(token)}`;
}

/** Message students send (WhatsApp is how Zimbabwean students share). */
export function shareMessage(headline: string, appName: string): string {
  return `${headline} on ${appName}.`;
}

/**
 * WhatsApp click-to-chat link with a prefilled message (`https://wa.me/?text=`): opens WhatsApp (app or web) and lets
 * the student pick who to send it to. No phone number is involved.
 */
export function whatsappShareHref(text: string, url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`.trim())}`;
}

/** Status of a share for the "your shared links" list. */
export function shareStatus(share: { revokedAt: Date | null; expiresAt: Date }, now: Date): "ACTIVE" | "EXPIRED" | "REVOKED" {
  if (share.revokedAt) return "REVOKED";
  return share.expiresAt.getTime() > now.getTime() ? "ACTIVE" : "EXPIRED";
}
