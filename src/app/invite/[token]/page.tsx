import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ActionForm } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { formatDate } from "@/components/admin/format";
import { AuthCard } from "@/components/auth/AuthCard";
import { SCHOOL_ROLE_LABELS } from "@/components/school/labels";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import { getActor } from "@/server/auth/actor";
import { changePasswordPathWithNext, homePathFor } from "@/server/auth/redirects";
import { getInvitationPreview } from "@/server/schools/invitations";
import { acceptInvitationAction, declineInvitationAction } from "../actions";

export const metadata: Metadata = { title: "Invitation" };

const PLATFORM_ROLE_LABELS: Readonly<Record<string, string>> = {
  TEACHER: "teacher",
  CONTENT_EDITOR: "content editor",
  ADMIN: "administrator",
  SUPER_ADMIN: "super administrator",
};

const ENDED: Readonly<Record<string, { title: string; body: string }>> = {
  INVALID: { title: "This invitation link isn't valid", body: "Check that you opened the whole link from your message. If it still doesn't work, ask for a new invitation." },
  EXPIRED: { title: "This invitation has expired", body: "Invitation links work for 14 days. Ask the person who invited you to send a new one." },
  REVOKED: { title: "This invitation was withdrawn", body: "It can no longer be used. Ask the person who invited you if you think this is a mistake." },
  ACCEPTED: { title: "This invitation has already been used", body: "If you accepted it, you're all set: sign in to continue." },
};

/**
 * /invite/[token] — accepting an invitation sent by email / SMS (ARCHITECTURE §3.3). Public: signed-out visitors see
 * what they are invited to (school name, role, the masked address it was sent to) and are sent to sign in or create an
 * account, then come back here (`next` survives registration, verification and onboarding). Signed-in users accept or
 * decline; a user who must first replace a school-set password does that and comes back. Class invitations
 * (CLASS_MEMBER) continue on the student's class page, /app/classes/invite/[token].
 */
export default async function InvitationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const preview = await getInvitationPreview(token);
  if (preview.state === "PENDING" && preview.kind === "CLASS_MEMBER") redirect(`/app/classes/invite/${encodeURIComponent(token)}`);
  const actor = await getActor();
  if (actor?.passwordMustChange === true) redirect(changePasswordPathWithNext(`/invite/${token}`));

  if (preview.state !== "PENDING") {
    const copy = ENDED[preview.state] ?? ENDED.INVALID!;
    return (
      <AuthCard title={copy.title} description={copy.body}>
        <ButtonLink href={actor ? homePathFor(actor) : "/login"} fullWidth>
          {actor ? "Continue" : "Sign in"}
        </ButtonLink>
      </AuthCard>
    );
  }

  const roleLabel = preview.kind === "STAFF_ROLE" ? (PLATFORM_ROLE_LABELS[preview.platformRole ?? ""] ?? "staff member") : (SCHOOL_ROLE_LABELS[preview.schoolRole ?? ""] ?? "member").toLowerCase();
  const where = preview.kind === "STAFF_ROLE" ? `the ${APP_NAME} team` : (preview.schoolName ?? "a school");
  const next = `/invite/${token}`;
  const registerRole = preview.schoolRole === "STUDENT" ? "STUDENT" : "TEACHER";

  return (
    <AuthCard
      title={`Join ${where}`}
      description={`You've been invited to join ${where} as a ${roleLabel} on ${APP_NAME}.`}
      footer={<p>Not expecting this? You can ignore it: nothing happens unless you accept.</p>}
    >
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        {preview.sentTo && (
          <>
            <dt className="text-muted">Sent to</dt>
            <dd className="font-mono text-text">{preview.sentTo}</dd>
          </>
        )}
        <dt className="text-muted">Valid until</dt>
        <dd className="text-text">{formatDate(preview.expiresAt)}</dd>
      </dl>

      {!preview.schoolOperating ? (
        <Alert tone="warning">This school isn&rsquo;t accepting new members right now. Please contact the school.</Alert>
      ) : actor === null ? (
        <div className="space-y-3">
          {preview.requiresMatchingContact && (
            <Alert tone="info">Sign in with the account that uses {preview.sentTo ?? "the invited email or phone"}, or create one with it.</Alert>
          )}
          <ButtonLink href={`/login?next=${encodeURIComponent(next)}`} fullWidth>
            Sign in to accept
          </ButtonLink>
          <ButtonLink href={`/register?role=${registerRole}&next=${encodeURIComponent(next)}`} variant="outline" fullWidth>
            Create an account
          </ButtonLink>
          {preview.schoolRole === "STUDENT" && <p className="text-sm text-muted">Students: create a student account, then come back to this link.</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            Signed in as <span className="font-semibold text-text">{actor.displayName}</span>. If this isn&rsquo;t the right account, sign out
            first and open the link again.
          </p>
          {preview.requiresMatchingContact && <Alert tone="info">This invitation can only be accepted by the account that uses {preview.sentTo ?? "the invited address"} (verified).</Alert>}
          <ActionForm action={acceptInvitationAction} hiddenFields={{ token }} submitLabel="Accept invitation" pendingLabel="Accepting…">
            {null}
          </ActionForm>
          {preview.kind === "SCHOOL_MEMBER" && (
            <ConfirmAction
              action={declineInvitationAction}
              fields={{ token }}
              triggerLabel="Decline"
              triggerVariant="ghost"
              title="Decline this invitation?"
              description="The link stops working. The school can invite you again later."
              confirmLabel="Decline"
              tone="danger"
            />
          )}
        </div>
      )}
    </AuthCard>
  );
}
