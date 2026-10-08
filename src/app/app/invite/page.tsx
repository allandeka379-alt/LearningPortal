import { Gift, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { InviteCodeForm } from "@/components/share/InviteCodeForm";
import { ShareLinkActions } from "@/components/share/ShareLinkActions";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatTile } from "@/components/ui/StatTile";
import { APP_NAME } from "@/lib/config";
import { formatCount } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getInviteView, type InviteView } from "@/server/referrals/service";
import { createInviteCodeAction } from "./actions";

export const metadata: Metadata = { title: "Invite friends" };

function qualifyText(rules: InviteView["rules"]): string {
  const days = formatCount(rules.activeDaysRequired, "different day");
  switch (rules.qualifyOn) {
    case "ACTIVITY":
      return `verifies their phone number, finishes setting up and studies on ${days}`;
    case "PAYMENT":
      return "buys Full access";
    case "ACTIVITY_OR_PAYMENT":
      return `verifies their phone number, finishes setting up and studies on ${days}, or buys Full access`;
  }
}

const STATUS_TONE = { PENDING: "neutral", QUALIFIED: "info", REWARDED: "success", REJECTED: "neutral" } as const;

/**
 * /app/invite (§46 referral codes and rewards): the student's code and link with WhatsApp sharing, how rewards work
 * (from the configured rules), and the status of each invite — never the invited students' names or activity.
 */
export default async function InvitePage() {
  const actor = await requireOnboardedStudent({ next: "/app/invite" });
  const view = await getInviteView(actor);
  const { rules } = view;

  return (
    <Container size="reading" className="space-y-6 pb-12">
      <PageHeader
        title="Invite friends"
        description={`Study with your friends on ${APP_NAME}. Share your link on WhatsApp or give them your code.`}
        className="pb-0"
      />

      <Card as="section" aria-labelledby="code-title">
        <CardHeader titleAs="h2" title={<span id="code-title">Your invite code</span>} />
        <CardBody className="space-y-5">
          {view.code === null ? (
            <>
              <p className="text-sm text-muted">Get your own code and link to send to friends. It stays the same, so you can share it again any time.</p>
              <InviteCodeForm action={createInviteCodeAction} />
            </>
          ) : (
            <>
              <p
                className="inline-block rounded-control border border-border-strong bg-subtle px-4 py-2 font-mono text-2xl font-bold tracking-widest text-text select-all"
                aria-label={`Invite code ${view.code.code.split("").join(" ")}`}
              >
                {view.code.displayCode}
              </p>
              {view.code.isActive && view.message && view.whatsappHref ? (
                <ShareLinkActions url={view.code.link} message={view.message} whatsappHref={view.whatsappHref} linkLabel="Your invite link" shareTitle={`Join me on ${APP_NAME}`} />
              ) : (
                <p className="text-sm text-muted">Your invite code is switched off. Contact support if you think this is a mistake.</p>
              )}
            </>
          )}
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="rewards-title">
        <CardHeader titleAs="h2" title={<span id="rewards-title">How rewards work</span>} />
        <CardBody className="space-y-3 text-sm text-text">
          {rules.enabled ? (
            <>
              <p className="flex items-start gap-2">
                <Gift aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <span>
                  When a friend joins with your link or code and {qualifyText(rules)}, you get {formatCount(rules.rewardDays, "day")} of{" "}
                  {rules.rewardPlanName ? `${rules.rewardPlanName} plan` : "extra"} access
                  {rules.refereeRewardDays ? `, and they get ${formatCount(rules.refereeRewardDays, "day")} too` : ""}.
                </span>
              </p>
              <p className="text-muted">Your friend needs a new account. Inviting yourself or reusing the same payment doesn&apos;t count.</p>
            </>
          ) : (
            <p className="text-muted">Invite rewards are paused at the moment. Friends can still join with your link.</p>
          )}
          <p className="flex items-start gap-2 text-muted">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>You only see whether an invite has qualified, never your friends&apos; names or what they study.</span>
          </p>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="invites-title">
        <CardHeader titleAs="h2" title={<span id="invites-title">Your invites</span>} />
        <CardBody className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <StatTile label="Joined" value={view.counts.joined} />
            <StatTile label="Waiting" value={view.counts.pending} />
            <StatTile label="Rewarded" value={view.counts.rewarded} />
          </div>
          {view.referrals.length === 0 ? (
            <EmptyState
              appearance="plain"
              titleAs="p"
              icon={<Users aria-hidden="true" />}
              title="No one has joined with your link yet"
              description="When a friend signs up with your link or code, it shows here."
            />
          ) : (
            <ul className="divide-y divide-border">
              {view.referrals.map((referral) => (
                <li key={referral.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <span className="text-text">A friend joined on {formatInstantDate(referral.joinedOn, actor.timeZone, "long")}</span>
                  <Badge tone={STATUS_TONE[referral.status]} size="sm">
                    {referral.statusLabel}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
