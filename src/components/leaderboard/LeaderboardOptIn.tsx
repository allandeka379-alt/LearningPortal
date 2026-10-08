import { ShieldCheck } from "lucide-react";
import type { FormAction } from "@/components/student/action-state";
import { LeaderboardPrivacyForm, type LeaderboardMode } from "@/components/student/settings/LeaderboardPrivacyForm";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export interface LeaderboardOptInProps {
  optedIn: boolean;
  display: LeaderboardMode;
  previews: Readonly<Record<LeaderboardMode, string | null>>;
  action: FormAction;
  /** Full name unavailable until a parent or guardian consents (students under 18). */
  realNameNeedsConsent?: boolean;
}

/**
 * Leaderboard privacy (§20) where the boards are: leaderboards are opt-in, and the student sees exactly what others
 * would see before joining. Uses the same privacy form as Settings. Server component.
 */
export function LeaderboardOptIn({ optedIn, display, previews, action, realNameNeedsConsent = false }: LeaderboardOptInProps) {
  return (
    <Card as="section" aria-labelledby="leaderboard-privacy-title">
      <CardHeader
        titleAs="h2"
        title={<span id="leaderboard-privacy-title">{optedIn ? "Your leaderboard privacy" : "Join the leaderboards"}</span>}
        description={optedIn ? `You appear as “${previews[display] ?? "a student"}”.` : "Leaderboards are off until you turn them on."}
      />
      <CardBody className="space-y-5">
        <div className="flex items-start gap-3 rounded-control bg-subtle p-4 text-sm text-text">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <ul className="list-disc space-y-1 pl-4 text-muted">
            <li>Only students who turn leaderboards on appear on them.</li>
            <li>You choose your name: a code like “Student #4821”, your username, your first name and initial, or your full name.</li>
            <li>Your email, phone number and school are never shown. School and class boards are seen only by students there.</li>
            <li>Turn it off at any time: you are removed from every board straight away.</li>
          </ul>
        </div>
        <LeaderboardPrivacyForm optIn={optedIn} display={display} previews={previews} action={action} realNameNeedsConsent={realNameNeedsConsent} />
      </CardBody>
    </Card>
  );
}
