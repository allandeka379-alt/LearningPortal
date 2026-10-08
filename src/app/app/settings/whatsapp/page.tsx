import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { APP_NAME } from "@/lib/config";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { getWhatsAppLinkStatus } from "@/server/whatsapp";
import { confirmWhatsAppLinkAction, requestWhatsAppCodeAction, unlinkWhatsAppAction, updateWhatsAppRemindersAction } from "./actions";
import { LinkWhatsAppForm, UnlinkWhatsAppForm, WhatsAppRemindersForm } from "./WhatsAppForms";

export const metadata: Metadata = { title: "WhatsApp" };

const COMMANDS: readonly { send: string; does: string }[] = [
  { send: "QUESTION", does: "Today's study question. Answer with the letter, or tap a button." },
  { send: "EXPLAIN photosynthesis", does: "A short explanation of any topic, at your level." },
  { send: "STREAK", does: "Your study streak and today's target." },
  { send: "STOP / START", does: "Stop or restart reminders. You can still message us after STOP." },
  { send: "HELP", does: "The menu." },
];

/**
 * Settings → WhatsApp (§30): link a WhatsApp number with a code sent on WhatsApp, reminders opt-in, unlink. Minors
 * need guardian consent first (§5.12). WhatsApp activity counts exactly like the web app (streak, mastery, XP).
 * 404 while the channel is switched off (`features.whatsapp`, docs/ARCHITECTURE.md §3.14).
 */
export default async function WhatsAppSettingsPage() {
  await notFoundUnlessFeature("whatsapp");
  const actor = await requireOnboardedStudent({ next: "/app/settings/whatsapp" });
  const status = await getWhatsAppLinkStatus(actor);
  const linked = status.linked;

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        breadcrumbs={[{ label: "Settings", href: "/app/settings" }, { label: "WhatsApp" }]}
        title="WhatsApp"
        description={`Get today's study question, short explanations and your streak on WhatsApp. Everything you do there counts in ${APP_NAME} too.`}
        className="pb-0"
      />

      {!status.available && (
        <Alert tone="info" title="Not available yet">
          WhatsApp isn&apos;t set up on {APP_NAME} yet. You can keep studying in the app in the meantime.
        </Alert>
      )}

      {linked ? (
        <Card as="section" aria-labelledby="whatsapp-linked">
          <CardHeader
            titleAs="h2"
            title={<span id="whatsapp-linked">Your linked number</span>}
            action={
              <Badge tone="success" appearance="soft">
                Linked
              </Badge>
            }
          />
          <CardBody className="space-y-5">
            <p className="flex items-center gap-2 text-base font-semibold text-text">
              <MessageCircle aria-hidden="true" className="size-5 text-primary" />
              <span>{linked.phoneMasked}</span>
            </p>
            {linked.linkedAt && <p className="text-sm text-muted">Linked on {formatInstantDate(linked.linkedAt, actor.timeZone)}.</p>}
            {status.consentRequired && (
              <Alert tone="warning" title="Paused until a parent or guardian gives consent">
                Your account needs a parent or guardian&apos;s consent before we can help you on WhatsApp.
              </Alert>
            )}
            <div className="space-y-2 border-t border-border pt-4">
              <h3 className="text-sm font-semibold text-text">Reminders</h3>
              <p className="text-sm text-muted">
                {linked.remindersOn
                  ? "We may send you daily question and streak reminders on WhatsApp."
                  : "We only reply when you message us. Turn reminders on to get a nudge for the daily question."}
              </p>
              <WhatsAppRemindersForm remindersOn={linked.remindersOn} action={updateWhatsAppRemindersAction} />
            </div>
            <div className="border-t border-border pt-4">
              <UnlinkWhatsAppForm action={unlinkWhatsAppAction} />
            </div>
          </CardBody>
        </Card>
      ) : status.available && status.consentRequired ? (
        <Alert
          tone="warning"
          title="A parent or guardian needs to give consent first"
          action={
            <ButtonLink href="/app/family" variant="secondary">
              Parents and guardians
            </ButtonLink>
          }
        >
          Because you&apos;re under 18, a parent or guardian must approve your account before you can use {APP_NAME} on WhatsApp.
        </Alert>
      ) : status.available ? (
        <Card as="section" aria-labelledby="whatsapp-link">
          <CardHeader
            titleAs="h2"
            title={<span id="whatsapp-link">Link your WhatsApp number</span>}
            description="We'll send a 6-digit code to the number on WhatsApp. Type it here to prove it's yours."
          />
          <CardBody>
            <LinkWhatsAppForm requestCode={requestWhatsAppCodeAction} confirmLink={confirmWhatsAppLinkAction} />
          </CardBody>
        </Card>
      ) : null}

      <Card as="section" aria-labelledby="whatsapp-commands">
        <CardHeader titleAs="h2" title={<span id="whatsapp-commands">What you can send</span>} />
        <CardBody>
          <dl className="divide-y divide-border">
            {COMMANDS.map((command) => (
              <div key={command.send} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
                <dt className="shrink-0 font-mono text-sm font-semibold text-text sm:w-48">{command.send}</dt>
                <dd className="text-sm text-muted">{command.does}</dd>
              </div>
            ))}
          </dl>
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="whatsapp-privacy" variant="flat">
        <CardHeader titleAs="h2" title={<span id="whatsapp-privacy">Privacy</span>} />
        <CardBody className="space-y-2 text-sm text-muted">
          <p>We use your number only to reply to you and, if you turn them on, to send reminders. We never show it to other users.</p>
          <p>Explanations you ask for are private, like your tutor chats in the app. Other messages are deleted after 90 days.</p>
          <p>WhatsApp is run by Meta, which handles the messages you send and receive there.</p>
        </CardBody>
      </Card>
    </Container>
  );
}
