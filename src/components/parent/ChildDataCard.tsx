import { Download, FileJson, Trash2, Undo2 } from "lucide-react";
import { ConfirmActionButton } from "@/components/family/ConfirmActionButton";
import type { FamilyFormAction } from "@/components/family/action-state";
import { formatInstantDate } from "@/components/student/format";
import { buttonStyles } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { ChildPrivacyOverview } from "@/server/accounts/guardian-privacy";

export interface ChildDataCardProps {
  studentUserId: string;
  /** The child's first name (or name) as shown on the page. */
  name: string;
  overview: ChildPrivacyOverview;
  graceDays: number;
  /** Time zone for dates (the parent's). */
  timeZone: string;
  requestExport: FamilyFormAction;
  requestDeletion: FamilyFormAction;
  cancelDeletion: FamilyFormAction;
}

/**
 * "Data and privacy" on a minor's page for their guardian (PRIV-02): ask for a copy of the child's data (never their
 * AI tutor conversations) and download it, or ask for the child's account to be deleted after the grace period. The
 * child is told about every request and can cancel a deletion. Server component; the buttons are confirm dialogs.
 */
export function ChildDataCard({ studentUserId, name, overview, graceDays, timeZone, requestExport, requestDeletion, cancelDeletion }: ChildDataCardProps) {
  const fields = { studentUserId };
  const latest = overview.export;
  const deletion = overview.deletion;

  return (
    <Card as="section" aria-labelledby="child-data">
      <CardHeader
        titleAs="h2"
        title={<span id="child-data">Data and privacy</span>}
        description={`As ${name}'s parent or guardian you can ask for a copy of ${name}'s data, or for ${name}'s account to be deleted. ${name} is told about every request.`}
      />
      <CardBody className="space-y-6">
        {!overview.canAct ? (
          <p className="text-sm text-muted">{overview.blockedReason}</p>
        ) : (
          <>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text">A copy of {name}&rsquo;s data</h3>
              <p className="text-sm text-muted">
                {latest?.downloadable && latest.availableUntil
                  ? `The copy you asked for is ready to download until ${formatInstantDate(latest.availableUntil, timeZone, "long")}.`
                  : latest && (latest.status === "REQUESTED" || latest.status === "PROCESSING")
                    ? "We're preparing the copy. We'll let you know when it's ready."
                    : latest?.status === "FAILED"
                      ? "We couldn't prepare the copy last time. Please try again."
                      : `Profile, subjects, results, progress, study plans and flashcards as a file. ${name}'s AI tutor conversations are private and are not included.`}
              </p>
              {latest?.downloadable ? (
                <a href={`/parent/children/${studentUserId}/data/${latest.id}`} className={buttonStyles({ variant: "outline" })} download>
                  <Download aria-hidden="true" className="size-4" />
                  Download the copy
                </a>
              ) : latest && (latest.status === "REQUESTED" || latest.status === "PROCESSING") ? null : (
                <ConfirmActionButton
                  action={requestExport}
                  fields={fields}
                  triggerLabel={`Ask for a copy of ${name}'s data`}
                  triggerIcon={<FileJson aria-hidden="true" />}
                  title={`Ask for a copy of ${name}'s data?`}
                  description={`We'll prepare a file of ${name}'s account data for you to download, and tell ${name} that you asked for it.`}
                  confirmLabel="Ask for a copy"
                  pendingLabel="Asking…"
                />
              )}
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <h3 className="text-sm font-semibold text-text">Delete {name}&rsquo;s account</h3>
              {deletion ? (
                <>
                  <p className="text-sm text-muted">
                    {`${name}'s account will be deleted on ${formatInstantDate(deletion.scheduledFor, timeZone, "long")}${deletion.requestedByYou ? " because you asked for it" : ` because ${name} asked for it`}. Until then it can be cancelled.`}
                  </p>
                  {deletion.requestedByYou && deletion.status === "REQUESTED" && (
                    <ConfirmActionButton
                      action={cancelDeletion}
                      fields={fields}
                      triggerLabel="Cancel the deletion"
                      triggerIcon={<Undo2 aria-hidden="true" />}
                      title="Cancel the deletion?"
                      description={`${name}'s account will be kept, and ${name} will be told.`}
                      confirmLabel="Keep the account"
                      pendingLabel="Saving…"
                    />
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-muted">
                    {`After ${graceDays} days ${name}'s name, contact details, AI conversations and uploads are deleted, and the account can no longer be used. Learning history is kept only in anonymised form. ${name} is told straight away and can cancel the deletion during those ${graceDays} days.`}
                  </p>
                  <ConfirmActionButton
                    action={requestDeletion}
                    fields={{ ...fields, confirmed: "on" }}
                    triggerLabel={`Delete ${name}'s account`}
                    triggerVariant="ghost"
                    triggerIcon={<Trash2 aria-hidden="true" />}
                    tone="danger"
                    title={`Delete ${name}'s account?`}
                    description={`The account will be deleted in ${graceDays} days. This cannot be undone once it has happened.`}
                    confirmLabel="Delete the account"
                    pendingLabel="Scheduling…"
                  />
                </>
              )}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
