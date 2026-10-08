import { Bot, CircleCheck, CreditCard, FileChartColumn, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ConfirmActionButton } from "@/components/family/ConfirmActionButton";
import { GUARDIAN_CONSENT_COPY, RELATIONSHIP_LABELS } from "@/components/family/labels";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  ChildCountdownCard,
  ChildProgressCard,
  ChildResultsCard,
  ChildStudyTimeCard,
  ChildSubjectsCard,
  ChildWeakAreasCard,
} from "@/components/parent/ChildSections";
import { ChildDataCard } from "@/components/parent/ChildDataCard";
import { GuardianConsentForm } from "@/components/parent/GuardianConsentForm";
import { orNotFound } from "@/components/parent/not-found";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { localDateString } from "@/lib/dates";
import { getChildPrivacyOverview } from "@/server/accounts/guardian-privacy";
import { DELETION_GRACE_DAYS } from "@/server/accounts/privacy";
import { requireRole } from "@/server/auth/guards";
import { canParentReadAiConversations, childrenWithLifetimeAccess, getParentChildDetail } from "@/server/family";
import {
  cancelChildDeletionAction,
  grantConsentAction,
  requestChildDeletionAction,
  requestChildExportAction,
  stopFollowingAction,
  withdrawConsentAction,
} from "./actions";

export const metadata: Metadata = { title: "Child" };

/**
 * One linked child (§21; ARCHITECTURE route map): subjects, exam countdown, progress, weak areas, study time with the
 * activity calendar, and test results, each only as far as the child shares it. Progress, weak areas, results and the
 * activity calendar are detailed reports: shown only when the CHILD's plan includes parent reports (§31), otherwise
 * the page says so and offers to pay for the child's full access (one payment). Plus guardian consent for minors, a minor's data rights
 * (a copy of their data, account deletion; PRIV-02), and stopping the link. AI conversations appear only behind the
 * separate consent path.
 */
export default async function ChildPage({
  params,
  searchParams,
}: {
  params: Promise<{ studentId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ studentId }, query] = await Promise.all([params, searchParams]);
  const actor = await requireRole("PARENT", { next: `/parent/children/${studentId}` });
  const { child, overview } = await orNotFound(getParentChildDetail(actor, studentId));
  const [aiReadable, privacy, owned] = await Promise.all([
    child.aiConversationsShared ? canParentReadAiConversations(actor, child.studentUserId) : Promise.resolve(false),
    child.guardianConsent.isMinor ? getChildPrivacyOverview(actor, child.studentUserId) : Promise.resolve(null),
    childrenWithLifetimeAccess(actor, [child.studentUserId]),
  ]);
  // A child who already owns full access for good has nothing left to buy: no pay button.
  const hasFullAccess = owned.has(child.studentUserId);
  const name = child.firstName ?? child.name;
  const today = localDateString(new Date(), overview.student.timezone);
  const consent = child.guardianConsent;
  const locked = new Set(overview.lockedSections);
  const subscribeHref = `/parent/children/${child.studentUserId}/subscribe`;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        title={child.name}
        eyebrow={`You are their ${RELATIONSHIP_LABELS[child.relationship].toLowerCase()}`}
        breadcrumbs={[{ label: "Your children", href: "/parent" }, { label: child.name }]}
        actions={
          hasFullAccess ? undefined : (
            <ButtonLink href={subscribeHref} iconStart={<CreditCard aria-hidden="true" />}>
              Pay for {name}
            </ButtonLink>
          )
        }
        className="pb-0"
      />

      {query.linked === "1" && (
        <Alert tone="success" icon={<CircleCheck aria-hidden="true" />} role="status">
          You&rsquo;re linked to {name}. {name} can change what you see at any time.
        </Alert>
      )}

      {consent.isMinor && consent.status !== "GRANTED" && (
        <Card as="section" aria-labelledby="child-consent">
          <CardHeader
            titleAs="h2"
            title={<span id="child-consent">Parent or guardian consent</span>}
            description={`${name} is under 18. ${GUARDIAN_CONSENT_COPY[consent.status]}`}
          />
          <CardBody>
            {consent.canGrant ? (
              <GuardianConsentForm studentUserId={child.studentUserId} childName={name} action={grantConsentAction} />
            ) : (
              <p className="text-sm text-muted">Only a parent or legal guardian can give consent for a child.</p>
            )}
          </CardBody>
        </Card>
      )}

      {locked.size > 0 && (
        <Card as="section" aria-labelledby="child-reports" variant="sunken">
          <CardHeader
            titleAs="h2"
            title={
              <span id="child-reports" className="flex items-center gap-2">
                <FileChartColumn aria-hidden="true" className="size-5 text-primary" />
                Detailed reports
              </span>
            }
            description={`${name}'s current plan doesn't include detailed progress reports for parents. You can see ${name}'s subjects, exam dates and study time; progress, topics to work on, test results and the day-by-day activity appear here once ${name} has full access.`}
          />
          <CardBody>
            <ButtonLink href={subscribeHref} variant="outline">
              Unlock full access for {name}
            </ButtonLink>
          </CardBody>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <ChildCountdownCard countdown={overview.examCountdown} name={name} />
        <ChildSubjectsCard subjects={overview.subjects} name={name} />
      </div>
      <ChildStudyTimeCard
        studyTime={overview.studyTime}
        activityCalendar={overview.activityCalendar}
        name={name}
        today={today}
        calendarLocked={locked.has("activityCalendar")}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChildProgressCard progress={overview.progress} name={name} locked={locked.has("progress")} />
        <ChildWeakAreasCard weakAreas={overview.weakAreas} name={name} locked={locked.has("weakAreas")} />
      </div>
      <ChildResultsCard testResults={overview.testResults} name={name} timeZone={actor.timeZone} locked={locked.has("testResults")} />

      {aiReadable && (
        <Card as="section" aria-labelledby="child-ai">
          <CardHeader
            titleAs="h2"
            title={
              <span id="child-ai" className="flex items-center gap-2">
                <Bot aria-hidden="true" className="size-5 text-primary" />
                AI tutor conversations
              </span>
            }
            description={`${name} chose to share these with you. They can stop sharing at any time.`}
          />
          <CardBody>
            <ButtonLink href={`/parent/children/${child.studentUserId}/conversations`} variant="outline">
              Read shared conversations
            </ButtonLink>
          </CardBody>
        </Card>
      )}

      {privacy && (
        <ChildDataCard
          studentUserId={child.studentUserId}
          name={name}
          overview={privacy}
          graceDays={DELETION_GRACE_DAYS}
          timeZone={actor.timeZone}
          requestExport={requestChildExportAction}
          requestDeletion={requestChildDeletionAction}
          cancelDeletion={cancelChildDeletionAction}
        />
      )}

      <Card as="section" aria-labelledby="child-link" variant="flat">
        <CardHeader titleAs="h2" title={<span id="child-link">Your link</span>} />
        <CardBody className="space-y-4">
          {consent.isMinor && consent.status === "GRANTED" && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm text-text">
                <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
                Parent or guardian consent: given{consent.givenByYou ? " by you" : ""}.
              </p>
              {consent.givenByYou && (
                <ConfirmActionButton
                  action={withdrawConsentAction}
                  fields={{ studentUserId: child.studentUserId }}
                  triggerLabel="Withdraw consent"
                  triggerVariant="ghost"
                  triggerSize="sm"
                  tone="danger"
                  title="Withdraw your consent?"
                  description={`We'll record that you no longer consent to ${name}'s account using their data.`}
                  confirmLabel="Withdraw consent"
                  pendingLabel="Saving…"
                />
              )}
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Stop following {name}. To link again later, you&rsquo;ll need {name}&rsquo;s agreement again.</p>
            <ConfirmActionButton
              action={stopFollowingAction}
              fields={{ linkId: child.linkId }}
              triggerLabel="Stop following"
              triggerVariant="ghost"
              triggerSize="sm"
              tone="danger"
              title={`Stop following ${name}?`}
              description="You will no longer see their progress. Payments you already made are not affected."
              confirmLabel="Stop following"
              pendingLabel="Saving…"
            />
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
