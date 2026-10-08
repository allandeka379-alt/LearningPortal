import { Bell, BookOpen, ChevronRight, KeyRound, LogOut, Mail, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DisplayPreferencesForm } from "@/components/student/settings/DisplayPreferencesForm";
import { LeaderboardPrivacyForm } from "@/components/student/settings/LeaderboardPrivacyForm";
import { ProfileForm } from "@/components/student/settings/ProfileForm";
import { SignOutOtherDevicesForm } from "@/components/student/settings/SignOutOtherDevicesForm";
import { StudyPreferencesForm } from "@/components/student/settings/StudyPreferencesForm";
import { YourDataForms, type YourDataFormsProps } from "@/components/student/settings/YourDataForms";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import {
  DAILY_GOAL_MAX_MINUTES,
  DAILY_GOAL_MIN_MINUTES,
  DISPLAY_NAME_MAX_LENGTH,
  getStudentSettings,
  timeZoneOptions,
} from "@/server/accounts/student-settings";
import { DELETION_GRACE_DAYS, getPrivacyOverview, type PrivacyOverview } from "@/server/accounts/privacy";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { listActiveSessions } from "@/server/auth/sessions";
import {
  saveDisplayPreferenceAction,
  signOutOtherDevicesAction,
  updateDisplayNameAction,
  updateLeaderboardPrivacyAction,
  updateStudyPreferencesAction,
} from "./actions";
import { cancelAccountDeletionAction, requestAccountDeletionAction, requestDataExportAction } from "./data-actions";

export const metadata: Metadata = { title: "Settings" };

/**
 * Student settings: profile name, display and accessibility preferences (§43), time zone and daily goal (§6),
 * leaderboard privacy (§20, opt-in, default off), parents and guardians (§21, /app/family), notifications, subjects and
 * targets, and device sessions (§39).
 */
export default async function SettingsPage() {
  const actor = await requireOnboardedStudent({ next: "/app/settings" });
  const [settings, sessions, privacy] = await Promise.all([getStudentSettings(actor), listActiveSessions(actor.userId), getPrivacyOverview(actor)]);
  const otherSessions = sessions.filter((session) => session.id !== actor.sessionId).length;
  const { profile, study, leaderboard } = settings;

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader title="Settings" description="Your profile, preferences and privacy." className="pb-0" />

      <Card as="section" aria-labelledby="settings-profile">
        <CardHeader titleAs="h2" title={<span id="settings-profile">Profile</span>} />
        <CardBody>
          <ProfileForm
            displayName={profile.displayName ?? profile.firstName ?? ""}
            username={profile.username}
            maxLength={DISPLAY_NAME_MAX_LENGTH}
            action={updateDisplayNameAction}
          />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-display">
        <CardHeader
          titleAs="h2"
          title={<span id="settings-display">Display and accessibility</span>}
          description="Changes apply straight away on this device and are saved to your account."
        />
        <CardBody>
          <DisplayPreferencesForm save={saveDisplayPreferenceAction} />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-study">
        <CardHeader titleAs="h2" title={<span id="settings-study">Study preferences</span>} />
        <CardBody>
          <StudyPreferencesForm
            timezone={profile.timezone}
            timeZones={timeZoneOptions(profile.timezone)}
            dailyGoalMinutes={study.dailyGoalMinutes}
            defaultDailyGoalMinutes={study.defaultDailyGoalMinutes}
            minMinutes={DAILY_GOAL_MIN_MINUTES}
            maxMinutes={DAILY_GOAL_MAX_MINUTES}
            hasActivePlan={study.hasActivePlan}
            action={updateStudyPreferencesAction}
          />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-leaderboards">
        <CardHeader
          titleAs="h2"
          title={<span id="settings-leaderboards">Leaderboards and privacy</span>}
          description="Leaderboards are optional. Nobody sees your scores on a leaderboard unless you turn this on."
        />
        <CardBody>
          <LeaderboardPrivacyForm
            optIn={leaderboard.optIn}
            display={leaderboard.display}
            previews={leaderboard.previews}
            realNameNeedsConsent={leaderboard.realNameNeedsConsent}
            action={updateLeaderboardPrivacyAction}
          />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-family">
        <CardHeader titleAs="h2" title={<span id="settings-family">Parents and notifications</span>} />
        <CardBody className="space-y-1">
          <Link
            href="/app/family"
            className="-mx-2 flex min-h-11 items-center gap-3 rounded-control px-2 py-2 text-sm transition-colors hover:bg-subtle"
          >
            <Users aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-text">Parents and guardians</span>
              <span className="block text-muted">Who can follow your progress, and what they can see. Link requests and codes.</span>
            </span>
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
          </Link>
          <Link
            href="/app/notifications/settings"
            className="-mx-2 flex min-h-11 items-center gap-3 rounded-control px-2 py-2 text-sm transition-colors hover:bg-subtle"
          >
            <Bell aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-text">Notifications</span>
              <span className="block text-muted">Reminders, quiet hours and how we contact you.</span>
            </span>
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
          </Link>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-subjects">
        <CardHeader titleAs="h2" title={<span id="settings-subjects">Subjects and targets</span>} />
        <CardBody>
          <Link
            href="/app/subjects/manage"
            className="-mx-2 flex min-h-11 items-center gap-3 rounded-control px-2 py-2 text-sm transition-colors hover:bg-subtle"
          >
            <BookOpen aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-text">Manage subjects</span>
              <span className="block text-muted">Add or remove subjects, and set your target examination and grade.</span>
            </span>
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
          </Link>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-data">
        <CardHeader titleAs="h2" title={<span id="settings-data">Your data</span>} description="Download a copy of your data, or delete your account." />
        <CardBody>
          <YourDataForms
            exportState={exportStateOf(privacy, profile.timezone)}
            deletionScheduledFor={privacy.deletion ? formatDay(privacy.deletion.scheduledFor, profile.timezone) : null}
            deletionRequestedByGuardian={privacy.deletion?.requestedByGuardian ?? false}
            graceDays={DELETION_GRACE_DAYS}
            requestExport={requestDataExportAction}
            requestDeletion={requestAccountDeletionAction}
            cancelDeletion={cancelAccountDeletionAction}
          />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-sign-in">
        <CardHeader
          titleAs="h2"
          title={<span id="settings-sign-in">Email and password</span>}
          description="You sign in with your email address. Sign-in codes and password resets go to it."
        />
        <CardBody className="flex flex-wrap gap-2">
          <ButtonLink href="/change-email" variant="outline" iconStart={<Mail aria-hidden="true" />}>
            Change email address
          </ButtonLink>
          <ButtonLink href="/change-password" variant="outline" iconStart={<KeyRound aria-hidden="true" />}>
            Change password
          </ButtonLink>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="settings-security">
        <CardHeader titleAs="h2" title={<span id="settings-security">Signed-in devices</span>} />
        <CardBody className="space-y-5">
          <SignOutOtherDevicesForm otherSessions={otherSessions} action={signOutOtherDevicesAction} />
          <div className="border-t border-border pt-4">
            <LogoutButton variant="ghost" iconStart={<LogOut aria-hidden="true" />}>
              Sign out on this device
            </LogoutButton>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}

function formatDay(date: Date, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
  }
}

function exportStateOf(privacy: PrivacyOverview, timeZone: string): YourDataFormsProps["exportState"] {
  const latest = privacy.export;
  if (!latest) return { status: "none", downloadHref: null, availableUntil: null };
  if (latest.downloadable) {
    return { status: "ready", downloadHref: `/app/settings/data/${latest.id}`, availableUntil: latest.availableUntil ? formatDay(latest.availableUntil, timeZone) : null };
  }
  if (latest.status === "REQUESTED" || latest.status === "PROCESSING") return { status: "preparing", downloadHref: null, availableUntil: null };
  if (latest.status === "FAILED") return { status: "failed", downloadHref: null, availableUntil: null };
  return { status: latest.status === "COMPLETED" ? "expired" : "none", downloadHref: null, availableUntil: null };
}
