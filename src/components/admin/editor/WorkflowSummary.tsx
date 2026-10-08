import { Flag, History, MessageSquareWarning } from "lucide-react";
import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { ApprovalInfo, Timestamp } from "../DetailParts";
import { AiDraftBadge, ContentStatusBadge } from "../StatusBadge";

/**
 * Workflow state of a content item for its editor / review page (§42 who and when): status and AI badges, revision
 * (and "edit of the published version"), reviewer notes after "request changes", the approval trail and links to
 * open flags and the revision history. Server component.
 */
export function WorkflowSummary({
  status,
  revision,
  draftOfId,
  aiGenerated,
  reviewNotes,
  people,
  openFlags,
  flagsHref,
  historyHref,
  liveHref,
  pendingDraft,
}: {
  status: string;
  revision: number;
  draftOfId: string | null;
  aiGenerated: boolean;
  reviewNotes: string | null;
  people: {
    createdBy: string | null;
    createdAt: Date | null;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    approvedBy: string | null;
    approvedAt: Date | null;
    publishedAt: Date | null;
    archivedAt?: Date | null;
  };
  openFlags: number;
  flagsHref: string;
  historyHref: string;
  /** For a draft copy: the live item's page. */
  liveHref?: string | null;
  /** For a live item being edited: its pending draft copy. */
  pendingDraft?: { href: string; status: string } | null;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <ContentStatusBadge status={status} size="md" />
        {aiGenerated && <AiDraftBadge size="md" />}
        <span className="text-muted">{draftOfId ? `Draft of revision ${revision}` : `Revision ${revision}`}</span>
        {draftOfId && liveHref && (
          <Link href={liveHref} className="font-medium text-primary underline underline-offset-2">
            View published version
          </Link>
        )}
        <Link href={historyHref} className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-2">
          <History aria-hidden="true" className="size-4" />
          Revision history
        </Link>
        {openFlags > 0 && (
          <Link href={flagsHref} className="inline-flex items-center gap-1 font-medium text-warning-text underline underline-offset-2">
            <Flag aria-hidden="true" className="size-4" />
            {openFlags} open flag{openFlags === 1 ? "" : "s"}
          </Link>
        )}
      </div>
      {pendingDraft && (
        <Alert tone="info" title="An edit of this published item is in progress">
          <Link href={pendingDraft.href} className="font-medium underline underline-offset-2">
            Open the draft copy
          </Link>{" "}
          ({pendingDraft.status.toLowerCase().replace(/_/g, " ")}). Students keep seeing this version until it is published.
        </Alert>
      )}
      {reviewNotes && status === "DRAFT" && (
        <Alert tone="warning" title="Reviewer asked for changes" icon={<MessageSquareWarning aria-hidden="true" />}>
          <p className="whitespace-pre-wrap">{reviewNotes}</p>
        </Alert>
      )}
      {reviewNotes && status !== "DRAFT" && (
        <p className="text-sm text-muted">
          <span className="font-medium text-text">Review notes:</span> <span className="whitespace-pre-wrap">{reviewNotes}</span>
        </p>
      )}
      <ApprovalInfo
        steps={[
          { label: "Created", by: people.createdBy, at: people.createdAt },
          { label: "Last reviewed", by: people.reviewedBy, at: people.reviewedAt },
          { label: "Approved", by: people.approvedBy, at: people.approvedAt },
        ].filter((step) => step.by !== null)}
      />
      {/* Publication / archive times have no "by" column; the audit log names who did it. */}
      {(people.publishedAt || people.archivedAt) && (
        <ul className="space-y-1 text-sm text-muted">
          {people.publishedAt && (
            <li>
              <span className="font-medium text-text">Published</span> on <Timestamp value={people.publishedAt} />
            </li>
          )}
          {people.archivedAt && (
            <li>
              <span className="font-medium text-text">Archived</span> on <Timestamp value={people.archivedAt} />
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
