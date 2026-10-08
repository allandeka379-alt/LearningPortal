import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/components/admin/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { getClassInvitation, type StudentInvitation } from "@/server/teaching/invitations";
import { acceptInvitationAction, declineInvitationAction } from "../../actions";
import { StudentActionButton } from "../../_components/StudentActionButton";

export const metadata: Metadata = { title: "Class invitation", referrer: "no-referrer" };

/**
 * A class invitation link (`/app/classes/invite/[token]`, sent by email / SMS): shows the class and lets the signed-in
 * student accept or decline. Expired, used or withdrawn links show an honest message instead.
 */
export default async function ClassInvitationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const actor = await requireOnboardedStudent({ next: `/app/classes/invite/${token}` });
  let invitation: StudentInvitation | null = null;
  try {
    invitation = await getClassInvitation(actor, token);
  } catch (error) {
    if (!isAppError(error) || error.code !== "NOT_FOUND") throw error;
  }

  return (
    <Container size="reading" className="pb-10">
      <PageHeader breadcrumbs={[{ label: "Classes", href: "/app/classes" }, { label: "Invitation" }]} title="Class invitation" />
      {invitation === null ? (
        <EmptyState
          title="This invitation can't be used"
          description="It may have expired, been used already or been withdrawn. Ask your teacher for a new one, or join with the class code."
          action={<ButtonLink href="/app/classes">Go to Classes</ButtonLink>}
        />
      ) : (
        <Card>
          <CardBody className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-text">{invitation.className}</p>
              <p className="text-sm text-muted">
                {[invitation.subjectName, invitation.schoolName ?? "Independent tutor", invitation.invitedBy ? `invited by ${invitation.invitedBy}` : null].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-1 text-sm text-muted">Valid until {formatDate(invitation.expiresAt, actor.timeZone)}.</p>
            </div>
            <p className="text-sm text-text">
              If you join, the class&apos;s teachers will see your progress and results in the class&apos;s subject. They never see your AI tutor
              conversations or payments. You can leave the class at any time.
            </p>
            <div className="flex flex-wrap gap-2">
              <StudentActionButton action={acceptInvitationAction} fields={{ token }} pendingLabel="Joining…">
                Join the class
              </StudentActionButton>
              <StudentActionButton action={declineInvitationAction} fields={{ token }} variant="outline">
                Decline
              </StudentActionButton>
            </div>
          </CardBody>
        </Card>
      )}
    </Container>
  );
}
