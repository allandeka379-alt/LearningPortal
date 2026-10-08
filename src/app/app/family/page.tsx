import { CircleCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import { EnterCodeForm } from "@/components/family/EnterCodeForm";
import { GUARDIAN_CONSENT_COPY, RELATIONSHIP_LABELS } from "@/components/family/labels";
import { LinkCodeCard } from "@/components/family/LinkCodeCard";
import { LinkedParentCard } from "@/components/family/LinkedParentCard";
import { PendingRequestCard } from "@/components/family/PendingRequestCard";
import { PermissionFields } from "@/components/family/PermissionFields";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getStudentFamilyView } from "@/server/family";
import {
  createLinkCodeAction,
  enterParentCodeAction,
  respondToRequestAction,
  revokeLinkAction,
  stopAiSharingAction,
  updatePermissionsAction,
} from "./actions";

export const metadata: Metadata = { title: "Family" };

/**
 * /app/family (§21, student side): parents' pending requests, linked parents with what each can see (the student
 * decides), AI-conversation sharing (separate consent, platform switch), a link code for a parent, entering a
 * parent's code, and guardian-consent status for minors.
 */
export default async function FamilyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const actor = await requireOnboardedStudent({ next: "/app/family" });
  const [view, params] = await Promise.all([getStudentFamilyView(actor), searchParams]);
  const zone = actor.timeZone;
  const consent = view.guardianConsent;

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Family"
        description="Choose who can follow your progress and what they can see. You can change this or remove someone at any time."
        className="pb-0"
      />

      {params.shared === "ai" && (
        <Alert tone="success" icon={<CircleCheck aria-hidden="true" />} role="status">
          Your AI tutor conversations are now shared. You can stop sharing at any time below.
        </Alert>
      )}

      {consent?.isMinor && consent.status !== "GRANTED" && (
        <Alert tone="info" title="Parent or guardian consent">
          {GUARDIAN_CONSENT_COPY[consent.status]} Link a parent or guardian below; they can give consent from their own
          account.
        </Alert>
      )}

      {view.pendingRequests.length > 0 && (
        <section aria-labelledby="family-requests" className="space-y-3">
          <h2 id="family-requests" className="text-lg font-semibold text-text">
            Requests to follow you
          </h2>
          {view.pendingRequests.map((request) => (
            <PendingRequestCard
              key={request.linkId}
              linkId={request.linkId}
              parentName={request.parentName}
              relationshipLabel={RELATIONSHIP_LABELS[request.relationship]}
              contactHint={request.contactHint}
              requestedLabel={`Asked on ${formatInstantDate(request.requestedAt, zone)}`}
              action={respondToRequestAction}
            />
          ))}
        </section>
      )}

      <section aria-labelledby="family-linked" className="space-y-3">
        <h2 id="family-linked" className="text-lg font-semibold text-text">
          Linked parents and guardians
        </h2>
        {view.links.length === 0 ? (
          <EmptyState
            titleAs="h3"
            icon={<Users aria-hidden="true" />}
            title="No one is linked yet"
            description="A linked parent or guardian sees your subjects and exam countdown, plus only what you choose to share."
          />
        ) : (
          view.links.map((link) => (
            <LinkedParentCard
              key={link.linkId}
              link={link}
              linkedLabel={link.activatedAt ? `Linked on ${formatInstantDate(link.activatedAt, zone)}` : null}
              sharedSinceLabel={link.aiConversations.sharedSince ? formatInstantDate(link.aiConversations.sharedSince, zone) : null}
              updatePermissions={updatePermissionsAction}
              stopAiSharing={stopAiSharingAction}
              revoke={revokeLinkAction}
            />
          ))
        )}
        {consent?.isMinor && consent.status === "GRANTED" && (
          <p className="text-sm text-muted">
            Parent or guardian consent: given{consent.grantedByName ? ` by ${consent.grantedByName}` : ""}
            {consent.grantedAt ? ` on ${formatInstantDate(consent.grantedAt, zone)}` : ""}.
          </p>
        )}
      </section>

      <Card as="section" aria-labelledby="family-code">
        <CardHeader titleAs="h2" title={<span id="family-code">Link a parent with a code</span>} />
        <CardBody>
          <LinkCodeCard
            action={createLinkCodeAction}
            cancelAction={revokeLinkAction}
            outstanding={view.outstandingCode ? { linkId: view.outstandingCode.linkId, expiresAt: view.outstandingCode.expiresAt.toISOString() } : null}
            audience="student"
            timeZone={zone}
          />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="family-enter-code">
        <CardHeader
          titleAs="h2"
          title={<span id="family-enter-code">Got a code from your parent?</span>}
          description="If your parent created a code in their account, enter it here to link."
        />
        <CardBody>
          <EnterCodeForm action={enterParentCodeAction} label="Code from your parent" submitLabel="Link to my parent">
            <PermissionFields legend="What they can see" />
          </EnterCodeForm>
        </CardBody>
      </Card>
    </Container>
  );
}
