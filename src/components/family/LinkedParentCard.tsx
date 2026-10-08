import { Bot, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import type { StudentFamilyLink } from "@/server/family/queries";
import type { FamilyFormAction } from "./action-state";
import { ConfirmActionButton } from "./ConfirmActionButton";
import { RELATIONSHIP_LABELS } from "./labels";
import { PermissionsForm } from "./PermissionsForm";

export interface LinkedParentCardProps {
  link: StudentFamilyLink;
  /** Pre-formatted "Linked on 5 Oct 2026" (student's time zone). */
  linkedLabel: string | null;
  sharedSinceLabel: string | null;
  updatePermissions: FamilyFormAction;
  stopAiSharing: FamilyFormAction;
  revoke: FamilyFormAction;
}

const SCHOOL_BASES = new Set(["SCHOOL_RECORD", "ADMIN_VERIFIED"]);

/**
 * One linked parent on /app/family: who they are, what they can see (switches), AI-conversation sharing (only
 * offered behind the platform switch, via a separate consent screen) and "Remove". Server component.
 */
export function LinkedParentCard({ link, linkedLabel, sharedSinceLabel, updatePermissions, stopAiSharing, revoke }: LinkedParentCardProps) {
  const headingId = `parent-${link.linkId}`;
  return (
    <article aria-labelledby={headingId} className="space-y-4 rounded-card border border-border bg-surface p-4 sm:p-5">
      <header className="flex items-start gap-3">
        <Avatar name={link.parentName} size="md" decorative />
        <div className="min-w-0 flex-1">
          <h3 id={headingId} className="font-semibold text-text">
            {link.parentName}
          </h3>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <Badge size="sm">{RELATIONSHIP_LABELS[link.relationship]}</Badge>
            {link.contactHint && <span>{link.contactHint}</span>}
            {linkedLabel && <span>{linkedLabel}</span>}
          </p>
          {link.consentBasis && SCHOOL_BASES.has(link.consentBasis) && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <ShieldCheck aria-hidden="true" className="size-3.5" />
              Linked from your school&rsquo;s records
            </p>
          )}
        </div>
      </header>

      <PermissionsForm linkId={link.linkId} parentName={link.parentName} permissions={link.permissions} action={updatePermissions} />

      {(link.aiConversations.shared || link.aiConversations.canOffer) && (
        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-sm">
            <Bot aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted" />
            {link.aiConversations.shared ? (
              <p className="text-text">
                Your AI tutor conversations are shared with {link.parentName}
                {sharedSinceLabel ? ` since ${sharedSinceLabel}` : ""}.
              </p>
            ) : (
              <p className="text-muted">Your AI tutor conversations are private. You can choose to share them.</p>
            )}
          </div>
          {link.aiConversations.shared ? (
            <ConfirmActionButton
              action={stopAiSharing}
              fields={{ linkId: link.linkId }}
              triggerLabel="Stop sharing"
              triggerSize="sm"
              title="Make your AI conversations private?"
              description={`${link.parentName} will no longer be able to read them, straight away.`}
              confirmLabel="Make private"
              pendingLabel="Saving…"
            />
          ) : (
            <ButtonLink href={`/app/family/${link.linkId}/ai-consent`} variant="ghost" size="sm">
              Share AI conversations…
            </ButtonLink>
          )}
        </div>
      )}

      <div className="border-t border-border pt-4">
        <ConfirmActionButton
          action={revoke}
          fields={{ linkId: link.linkId }}
          triggerLabel={`Remove ${link.parentName}`}
          triggerVariant="ghost"
          triggerSize="sm"
          tone="danger"
          title={`Remove ${link.parentName}?`}
          description="They will stop seeing your progress straight away. They are not sent a message."
          confirmLabel="Remove"
          pendingLabel="Removing…"
          reasonLabel="Reason (only kept in our records)"
        />
      </div>
    </article>
  );
}
