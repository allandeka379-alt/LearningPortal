import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { Lock, CirclePlay } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import type { ExamAccess } from "@/server/exams/service";

/**
 * Why a test cannot be started right now, with the way forward (§31 upgrade prompts, CLAUDE.md rule 9): the plan does
 * not include it, the allowance is used up, no attempts are left, the subject is not added, or an attempt is already
 * open. Friendly and specific; never a dead end. Renders nothing when the test is available. Server component.
 */
export function ExamAccessNotice({ access }: { access: ExamAccess }) {
  switch (access.status) {
    case "AVAILABLE":
      return null;
    case "IN_PROGRESS":
      return (
        <Alert
          tone="info"
          icon={<CirclePlay aria-hidden="true" />}
          title="You've already started this test"
          action={<ButtonLink href={`/app/exams/attempt/${access.attemptId}`}>Continue the test</ButtonLink>}
        >
          Your answers are saved. The timer, if there is one, kept running while you were away.
        </Alert>
      );
    case "UPGRADE":
    case "LIMIT_REACHED":
      return (
        <Alert
          tone="accent"
          icon={<Lock aria-hidden="true" />}
          title={access.status === "UPGRADE" ? "Not included in your plan" : "You've used this period's allowance"}
          action={
            <UpgradeButton fallbackHref={access.upgradeHref} variant="outline" />
          }
        >
          {access.message}
        </Alert>
      );
    case "NO_ATTEMPTS_LEFT":
      return (
        <Alert tone="neutral" title="No attempts left">
          {access.message} Your earlier results are below.
        </Alert>
      );
    case "NOT_ENROLLED":
      return (
        <Alert
          tone="info"
          title="Add this subject first"
          action={
            <ButtonLink href="/app/subjects/manage" variant="outline">
              Manage subjects
            </ButtonLink>
          }
        >
          {access.message}
        </Alert>
      );
  }
}
