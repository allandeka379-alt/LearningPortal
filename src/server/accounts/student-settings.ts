import "server-only";
import { z } from "zod";
import type { FontScale, LeaderboardDisplay, Role, ThemePreference } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE, isValidTimeZone } from "@/lib/dates";
import { hasPermission } from "@/server/auth/permissions";
import { db } from "@/server/db";
import { publicSharingAllowed } from "@/server/family/consent-gate";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { getStudyDefaults } from "@/server/lib/settings";
import { pseudonymFor } from "@/server/leaderboards/pseudonym";

/**
 * Student account settings (ARCHITECTURE §3.2 `accounts`): display name, display & accessibility preferences (§43),
 * time zone and daily goal (§6 daily target, §19), and leaderboard privacy (§20). Every function acts on the
 * actor's OWN rows only; inputs are validated with Zod and failures are `AppError`s with field errors.
 *
 * Leaderboards are OPT-IN (Profile.leaderboardOptIn defaults to false) and opting out deletes the student's
 * LeaderboardEntry rows in the same transaction (schema doc: "opting out deletes the user's rows immediately").
 * The full-name mode (REAL_NAME) needs GRANTED guardian consent for a minor (MIN-01, `publicSharingAllowed`): it is
 * refused on save, previewed as unavailable, and the boards fall back to first name + initial at read time.
 */

/** The acting user. Structurally satisfied by the auth `Actor`. */
export interface SettingsActor {
  userId: string;
  roles: readonly Role[];
}

function assertStudent(actor: SettingsActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) {
    throw AppError.forbidden("These settings are for student accounts.");
  }
}

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error);
  return result.data;
}

// =====================================================================================================================
// Schemas and pure helpers
// =====================================================================================================================

export const LEADERBOARD_DISPLAY_MODES = ["REAL_NAME", "FIRST_NAME", "USERNAME", "ANONYMOUS"] as const satisfies readonly LeaderboardDisplay[];
export const THEME_VALUES = ["SYSTEM", "LIGHT", "DARK"] as const satisfies readonly ThemePreference[];
export const FONT_SCALE_VALUES = ["SMALL", "DEFAULT", "LARGE", "EXTRA_LARGE"] as const satisfies readonly FontScale[];

/** Daily goal bounds offered in the UI (the database allows 1–1440). */
export const DAILY_GOAL_MIN_MINUTES = 5;
export const DAILY_GOAL_MAX_MINUTES = 600;
export const DISPLAY_NAME_MAX_LENGTH = 60;

// Control characters and line breaks never belong in a name.
const CONTROL_CHARS = /[\p{Cc}\p{Zl}\p{Zp}]/u;

export const displayNameSchema = z.strictObject({
  displayName: z
    .string({ error: "Enter the name you'd like us to use." })
    .trim()
    .min(1, "Enter the name you'd like us to use.")
    .max(DISPLAY_NAME_MAX_LENGTH, `Use at most ${DISPLAY_NAME_MAX_LENGTH} characters.`)
    .refine((value) => !CONTROL_CHARS.test(value), "Use letters, numbers and ordinary punctuation only."),
});

export const displayPreferencesSchema = z
  .strictObject({ theme: z.enum(THEME_VALUES).optional(), fontScale: z.enum(FONT_SCALE_VALUES).optional() })
  .refine((value) => value.theme !== undefined || value.fontScale !== undefined, { message: "Nothing to update." });

export const studyPreferencesSchema = z.strictObject({
  timezone: z.string({ error: "Choose a time zone." }).trim().refine(isValidTimeZone, "Choose a valid time zone."),
  /** `null` = use the platform default. */
  dailyGoalMinutes: z
    .int({ error: "Enter a whole number of minutes." })
    .min(DAILY_GOAL_MIN_MINUTES, `Set at least ${DAILY_GOAL_MIN_MINUTES} minutes.`)
    .max(DAILY_GOAL_MAX_MINUTES, `Set at most ${DAILY_GOAL_MAX_MINUTES} minutes.`)
    .nullable(),
});

export const leaderboardPrivacySchema = z.strictObject({
  optIn: z.boolean(),
  display: z.enum(LEADERBOARD_DISPLAY_MODES, { error: "Choose how your name appears." }),
});

export type DisplayPreferencesInput = z.input<typeof displayPreferencesSchema>;
export type StudyPreferencesInput = z.input<typeof studyPreferencesSchema>;
export type LeaderboardPrivacyInput = z.input<typeof leaderboardPrivacySchema>;

/** Label shown for anonymous leaderboard rows. */
export const ANONYMOUS_LEADERBOARD_NAME = "Anonymous student";

export interface LeaderboardNameSource {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
}

/**
 * How the student's name appears on leaderboards in each display mode (§20), or `null` when the mode cannot be used
 * (no first name / no username). Pure: the leaderboard read path resolves names with the same rules.
 * REAL_NAME = first + last name; FIRST_NAME = first name + last initial; USERNAME = public handle.
 */
export function leaderboardDisplayName(source: LeaderboardNameSource, mode: LeaderboardDisplay): string | null {
  const first = source.firstName?.trim() || null;
  const last = source.lastName?.trim() || null;
  switch (mode) {
    case "REAL_NAME":
      return first ? (last ? `${first} ${last}` : first) : null;
    case "FIRST_NAME":
      return first ? (last ? `${first} ${Array.from(last)[0]?.toLocaleUpperCase("en") ?? ""}.` : first) : null;
    case "USERNAME":
      return source.username?.trim() || null;
    case "ANONYMOUS":
      return ANONYMOUS_LEADERBOARD_NAME;
  }
}

/**
 * Time zones offered in settings: every African IANA zone (the platform's markets, §53) plus the student's current
 * zone and UTC, sorted, de-duplicated. Pure apart from the runtime's zone list.
 */
export function timeZoneOptions(current: string | null | undefined): string[] {
  let zones: string[] = [];
  try {
    zones = Intl.supportedValuesOf("timeZone").filter((zone) => zone.startsWith("Africa/"));
  } catch {
    zones = [];
  }
  const set = new Set([DEFAULT_TIMEZONE, ...zones, "UTC"]);
  if (current && isValidTimeZone(current)) set.add(current);
  return [...set].sort((a, b) => a.localeCompare(b, "en"));
}

// =====================================================================================================================
// Reads
// =====================================================================================================================

export interface StudentSettings {
  profile: {
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    username: string | null;
    timezone: string;
    theme: ThemePreference;
    fontScale: FontScale;
  };
  study: {
    /** The student's own goal; null = platform default. */
    dailyGoalMinutes: number | null;
    defaultDailyGoalMinutes: number;
    /** An ACTIVE study plan sets its own daily target, which takes priority (§16). */
    hasActivePlan: boolean;
  };
  leaderboard: {
    optIn: boolean;
    display: LeaderboardDisplay;
    /** Preview per mode; null = the mode is unavailable for this profile. */
    previews: Record<LeaderboardDisplay, string | null>;
    /** A minor without GRANTED guardian consent: the full-name mode is unavailable (MIN-01). */
    realNameNeedsConsent: boolean;
  };
}

/** Everything the settings page shows. Three queries (+ the cached study defaults). */
export async function getStudentSettings(actor: SettingsActor): Promise<StudentSettings> {
  assertStudent(actor);
  const [profile, stats, plan, defaults, student] = await Promise.all([
    db.profile.findUnique({
      where: { userId: actor.userId },
      select: {
        firstName: true,
        lastName: true,
        displayName: true,
        username: true,
        timezone: true,
        theme: true,
        fontScale: true,
        leaderboardOptIn: true,
        leaderboardDisplay: true,
      },
    }),
    db.learnerStats.findUnique({ where: { userId: actor.userId }, select: { dailyGoalMinutes: true } }),
    db.studyPlan.findFirst({ where: { userId: actor.userId, status: "ACTIVE" }, select: { id: true } }),
    getStudyDefaults(),
    db.student.findUnique({ where: { userId: actor.userId }, select: { isMinor: true, guardianConsentStatus: true } }),
  ]);
  const realNameAllowed = publicSharingAllowed(student);
  const storedDisplay = profile?.leaderboardDisplay ?? "USERNAME";
  const names: LeaderboardNameSource = {
    firstName: profile?.firstName ?? null,
    lastName: profile?.lastName ?? null,
    username: profile?.username ?? null,
  };
  return {
    profile: {
      firstName: names.firstName,
      lastName: names.lastName,
      displayName: profile?.displayName ?? null,
      username: names.username,
      timezone: profile?.timezone && isValidTimeZone(profile.timezone) ? profile.timezone : DEFAULT_TIMEZONE,
      theme: profile?.theme ?? "SYSTEM",
      fontScale: profile?.fontScale ?? "DEFAULT",
    },
    study: {
      dailyGoalMinutes: stats?.dailyGoalMinutes ?? null,
      defaultDailyGoalMinutes: defaults.dailyGoalMinutes,
      hasActivePlan: plan !== null,
    },
    leaderboard: {
      optIn: profile?.leaderboardOptIn ?? false,
      // What the boards actually show (REAL_NAME falls back to FIRST_NAME without consent).
      display: storedDisplay === "REAL_NAME" && !realNameAllowed ? "FIRST_NAME" : storedDisplay,
      // ANONYMOUS previews the exact pseudonym the boards show ("Student #4821"), not a generic label.
      previews: Object.fromEntries(
        LEADERBOARD_DISPLAY_MODES.map((mode) => [
          mode,
          mode === "ANONYMOUS" ? pseudonymFor(actor.userId) : mode === "REAL_NAME" && !realNameAllowed ? null : leaderboardDisplayName(names, mode),
        ]),
      ) as Record<LeaderboardDisplay, string | null>,
      realNameNeedsConsent: !realNameAllowed,
    },
  };
}

export interface StudentTrack {
  qualificationId: string | null;
  qualificationName: string | null;
  examBoardName: string | null;
  yearGroupName: string | null;
}

/** The student's primary track from onboarding (§5): board, qualification ("level") and form. */
export async function getStudentTrack(actor: SettingsActor): Promise<StudentTrack> {
  assertStudent(actor);
  const student = await db.student.findUnique({
    where: { userId: actor.userId },
    select: {
      qualificationId: true,
      qualification: { select: { name: true } },
      examBoard: { select: { name: true } },
      yearGroup: { select: { name: true } },
    },
  });
  return {
    qualificationId: student?.qualificationId ?? null,
    qualificationName: student?.qualification?.name ?? null,
    examBoardName: student?.examBoard?.name ?? null,
    yearGroupName: student?.yearGroup?.name ?? null,
  };
}

// =====================================================================================================================
// Writes
// =====================================================================================================================

/** Sets the name used in greetings and menus. Returns the saved name. */
export async function updateDisplayName(actor: SettingsActor, input: unknown): Promise<{ displayName: string }> {
  assertStudent(actor);
  const { displayName } = parse(displayNameSchema, input);
  await db.profile.upsert({
    where: { userId: actor.userId },
    create: { userId: actor.userId, displayName },
    update: { displayName },
  });
  return { displayName };
}

/** Saves theme / text size to the profile (the cookies drive rendering; the profile follows the student). */
export async function updateDisplayPreferences(actor: SettingsActor, input: unknown): Promise<{ theme?: ThemePreference; fontScale?: FontScale }> {
  assertStudent(actor);
  const parsed = parse(displayPreferencesSchema, input);
  const data = { ...(parsed.theme ? { theme: parsed.theme } : {}), ...(parsed.fontScale ? { fontScale: parsed.fontScale } : {}) };
  await db.profile.upsert({ where: { userId: actor.userId }, create: { userId: actor.userId, ...data }, update: data });
  return data;
}

/**
 * Time zone (day boundaries for streaks and daily goals, ARCHITECTURE §3.12) and the daily study goal (§6 "daily
 * target" when no study plan sets one). `dailyGoalMinutes: null` returns to the platform default.
 */
export async function updateStudyPreferences(
  actor: SettingsActor,
  input: unknown,
): Promise<{ timezone: string; dailyGoalMinutes: number | null }> {
  assertStudent(actor);
  const parsed = parse(studyPreferencesSchema, input);
  await db.$transaction([
    db.profile.upsert({ where: { userId: actor.userId }, create: { userId: actor.userId, timezone: parsed.timezone }, update: { timezone: parsed.timezone } }),
    db.learnerStats.upsert({
      where: { userId: actor.userId },
      create: { userId: actor.userId, dailyGoalMinutes: parsed.dailyGoalMinutes },
      update: { dailyGoalMinutes: parsed.dailyGoalMinutes },
    }),
  ]);
  return parsed;
}

/**
 * Leaderboard visibility and name mode (§20). Opting out removes every LeaderboardEntry of the student at once.
 * A mode that cannot be shown for this profile (no first name / no username) is refused with a field error. The
 * change is audit-logged in the same transaction (`privacy.leaderboard.update`: before / after flags only, no names).
 */
export async function updateLeaderboardPrivacy(
  actor: SettingsActor,
  input: unknown,
): Promise<{ optIn: boolean; display: LeaderboardDisplay; removedEntries: number }> {
  assertStudent(actor);
  const parsed = parse(leaderboardPrivacySchema, input);
  const profile = await db.profile.findUnique({
    where: { userId: actor.userId },
    select: { firstName: true, lastName: true, username: true, leaderboardOptIn: true, leaderboardDisplay: true },
  });
  if (!profile) throw AppError.notFound("Your profile could not be found.");
  if (parsed.display === "REAL_NAME") {
    const student = await db.student.findUnique({ where: { userId: actor.userId }, select: { isMinor: true, guardianConsentStatus: true } });
    if (!publicSharingAllowed(student)) {
      throw AppError.validation({
        display: ["Showing your full name needs your parent or guardian's consent. Choose another option, such as your first name and initial."],
      });
    }
  }
  if (leaderboardDisplayName(profile, parsed.display) === null) {
    throw AppError.validation({
      display: [
        parsed.display === "USERNAME"
          ? "You don't have a public username yet. Choose another option."
          : "Add your first name to your account to use this option.",
      ],
    });
  }
  const removedEntries = await db.$transaction(async (tx) => {
    await tx.profile.update({
      where: { userId: actor.userId },
      data: { leaderboardOptIn: parsed.optIn, leaderboardDisplay: parsed.display },
    });
    const removed = parsed.optIn ? 0 : (await tx.leaderboardEntry.deleteMany({ where: { userId: actor.userId } })).count;
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.PRIVACY_LEADERBOARD_UPDATE,
      entityType: "Profile",
      entityId: actor.userId,
      targetUserId: actor.userId,
      before: { optIn: profile.leaderboardOptIn, display: profile.leaderboardDisplay },
      after: { optIn: parsed.optIn, display: parsed.display },
      metadata: { removedEntries: removed },
    });
    return removed;
  });
  return { ...parsed, removedEntries };
}
