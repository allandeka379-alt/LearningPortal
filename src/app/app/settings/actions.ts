"use server";

import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction, studentRequestMeta } from "@/components/student/server-action";
import { profileFontScaleFromCookie, profileThemeFromCookie } from "@/components/student/settings/preferences-map";
import { updateDisplayName, updateDisplayPreferences, updateLeaderboardPrivacy, updateStudyPreferences } from "@/server/accounts/student-settings";
import { logoutEverywhere } from "@/server/auth/flows";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { formatCount } from "@/lib/format";

/**
 * Settings actions (§20 privacy, §43 preferences, §6 daily goal, §39 sessions). Thin: guard, read the form, call the
 * accounts / auth services (which validate with Zod), refresh the student area where the change is visible.
 */

/** Display name used in greetings and menus. */
export async function updateDisplayNameAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("settings.displayName", async () => {
    const actor = await requireOnboardedStudentForAction();
    await updateDisplayName(actor, { displayName: formString(formData, "displayName") });
    return { message: "Name saved.", revalidateLayout: true };
  });
}

/**
 * Saves a theme or text-size choice to the profile. The switchers already applied it on this device (cookie); this
 * makes it follow the account. Values arrive in cookie form ("dark", "lg") and are mapped to the Profile enums.
 */
export async function saveDisplayPreferenceAction(input: { theme?: string; fontScale?: string }): Promise<FormActionState> {
  return runStudentAction("settings.display", async () => {
    const actor = await requireOnboardedStudentForAction();
    const theme = input.theme === undefined ? undefined : (profileThemeFromCookie(input.theme) ?? input.theme);
    const fontScale = input.fontScale === undefined ? undefined : (profileFontScaleFromCookie(input.fontScale) ?? input.fontScale);
    await updateDisplayPreferences(actor, { ...(theme === undefined ? {} : { theme }), ...(fontScale === undefined ? {} : { fontScale }) });
    return { message: "Saved to your account." };
  });
}

/** Time zone and daily study goal ("" = the platform default). */
export async function updateStudyPreferencesAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("settings.study", async () => {
    const actor = await requireOnboardedStudentForAction();
    const goal = formString(formData, "dailyGoalMinutes")?.trim() ?? "";
    await updateStudyPreferences(actor, {
      timezone: formString(formData, "timezone"),
      dailyGoalMinutes: goal === "" ? null : Number(goal),
    });
    return { message: "Study preferences saved.", revalidateLayout: true };
  });
}

/** Leaderboard opt-in (Switch submits `optIn` only when on) and name display mode (§20). */
export async function updateLeaderboardPrivacyAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("settings.leaderboard", async () => {
    const actor = await requireOnboardedStudentForAction();
    const result = await updateLeaderboardPrivacy(actor, { optIn: formData.has("optIn"), display: formString(formData, "display") });
    return {
      message: result.optIn ? "You're on the leaderboards. Your privacy choice is saved." : "You're not on any leaderboard.",
      revalidateLayout: true,
    };
  });
}

/** Signs out every other device and browser, keeping this session (§39). The auth service audits it. */
export async function signOutOtherDevicesAction(): Promise<FormActionState> {
  return runStudentAction("settings.signOutOthers", async () => {
    const actor = await requireOnboardedStudentForAction();
    const count = await logoutEverywhere(actor, await studentRequestMeta(), { keepCurrent: true });
    return {
      message: count === 0 ? "You weren't signed in anywhere else." : `Signed out of ${formatCount(count, "other device")}.`,
      revalidateLayout: true,
    };
  });
}
