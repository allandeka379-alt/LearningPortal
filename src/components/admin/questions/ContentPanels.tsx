import { CircleAlert, FilePenLine, Trash2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, ApprovalInfo, Timestamp } from "@/components/admin/DetailParts";
import type { AdminFormAction } from "@/components/admin/form-state";
import { AiDraftBadge, ContentStatusBadge, DemoBadge } from "@/components/admin/StatusBadge";
import { WorkflowActions, type WorkflowActionHandlers, type WorkflowStatus } from "@/components/admin/WorkflowActions";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";

/**
 * Server-compatible panels shared by the question, assessment and study-pack detail pages: the workflow card (status,
 * who/when, workflow buttons, edit-through-a-draft-copy), the "before review" checklist and the revision history.
 */

export interface WorkflowInfo {
  author: string | null;
  createdAt: Date;
  updatedAt: Date;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewNotes: string | null;
  approvedBy: string | null;
  approvedAt: Date | null;
  publishedAt: Date | null;
  archivedAt: Date | null;
}

export interface ContentWorkflowPanelProps {
  id: string;
  status: WorkflowStatus;
  revision: number;
  aiGenerated: boolean;
  isDemo: boolean;
  /** This row edits a published one (draft copy). */
  draftOf: { id: string; status: string; revision: number } | null;
  /** A draft copy of this live row is in progress. */
  pendingDraft: { id: string; status: string; revision: number; author: string | null } | null;
  workflow: WorkflowInfo;
  actions: WorkflowActionHandlers;
  isOwnWork: boolean;
  fourEyes: boolean;
  /** Blocking problems exist: the submit button explains why it will fail. */
  blocked: boolean;
  itemLabel: string;
  /** Base path of detail pages, e.g. "/admin/questions". */
  basePath: string;
  editAction?: AdminFormAction<unknown>;
  discardAction?: AdminFormAction<unknown>;
  deleteAction?: AdminFormAction<unknown>;
  /** Never published (deletable instead of archivable). */
  neverPublished: boolean;
  extra?: ReactNode;
}

export function ContentWorkflowPanel(props: ContentWorkflowPanelProps) {
  const { id, status, revision, aiGenerated, isDemo, draftOf, pendingDraft, workflow, basePath, itemLabel } = props;
  return (
    <AdminSection
      title="Workflow"
      description={draftOf ? `Edit of revision ${draftOf.revision} (becomes revision ${revision} when published).` : `Revision ${revision}.`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <ContentStatusBadge status={status} size="md" />
          {aiGenerated && <AiDraftBadge />}
          {isDemo && <DemoBadge />}
          {draftOf && <Badge size="sm" tone="info">Draft copy</Badge>}
        </div>
        {status === "DRAFT" && workflow.reviewNotes && (
          <Alert tone="warning" title="Reviewer notes">
            <p className="whitespace-pre-wrap">{workflow.reviewNotes}</p>
          </Alert>
        )}
        {pendingDraft && (
          <Alert tone="info" title={`Revision ${pendingDraft.revision} is being edited`}>
            <p>
              {pendingDraft.author ?? "An editor"} started an edit ({pendingDraft.status.toLowerCase().replace("_", " ")}). Students keep this version until it is published.{" "}
              <Link href={`${basePath}/${pendingDraft.id}`} className="font-semibold underline underline-offset-4">
                Open the edit
              </Link>
            </p>
          </Alert>
        )}
        {draftOf && (
          <p className="text-sm text-muted">
            Students see{" "}
            <Link href={`${basePath}/${draftOf.id}`} className="font-semibold text-text underline underline-offset-4">
              the live version
            </Link>{" "}
            until this edit is approved and published.
          </p>
        )}
        <WorkflowActions
          status={status}
          fields={{ id }}
          actions={props.actions}
          isOwnWork={props.isOwnWork}
          fourEyes={props.fourEyes}
          aiGenerated={aiGenerated}
          itemLabel={itemLabel}
          notice={
            status === "DRAFT" && props.blocked ? (
              <p className="mb-2 flex gap-2 text-sm text-warning-text">
                <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                Fix the problems listed under “Before review” first.
              </p>
            ) : undefined
          }
        />
        <div className="flex flex-wrap gap-2">
          {status === "PUBLISHED" && !pendingDraft && props.editAction && (
            <ConfirmAction
              action={props.editAction}
              fields={{ id }}
              triggerLabel="Edit"
              triggerIcon={<FilePenLine aria-hidden="true" />}
              title="Start an edit?"
              description={`Published content is never changed in place. A draft copy (revision ${revision + 1}) is created; students keep revision ${revision} until the copy is reviewed and published.`}
              confirmLabel="Create draft copy"
            />
          )}
          {draftOf && props.discardAction && (status === "DRAFT" || status === "IN_REVIEW" || status === "APPROVED") && (
            <ConfirmAction
              action={props.discardAction}
              fields={{ id }}
              triggerLabel="Discard edit"
              triggerIcon={<Trash2 aria-hidden="true" />}
              tone="danger"
              title="Discard this edit?"
              description="The draft copy and its changes are deleted. The published version is not affected."
              confirmLabel="Discard draft copy"
            />
          )}
          {!draftOf && status === "DRAFT" && props.neverPublished && props.deleteAction && (
            <ConfirmAction
              action={props.deleteAction}
              fields={{ id }}
              triggerLabel="Delete draft"
              triggerIcon={<Trash2 aria-hidden="true" />}
              tone="danger"
              title="Delete this draft?"
              description="It has never been published. This cannot be undone."
              confirmLabel="Delete draft"
            />
          )}
        </div>
        <ApprovalInfo
          steps={[
            { label: "Last edited", by: workflow.author, at: workflow.updatedAt },
            { label: "Reviewed", by: workflow.reviewedBy, at: workflow.reviewedAt },
            { label: "Approved", by: workflow.approvedBy, at: workflow.approvedAt },
          ]}
        />
        {(workflow.publishedAt || workflow.archivedAt) && (
          <ul className="space-y-1 text-sm text-muted">
            {workflow.publishedAt && (
              <li>
                <span className="font-medium text-text">Published</span> on <Timestamp value={workflow.publishedAt} />
              </li>
            )}
            {workflow.archivedAt && (
              <li>
                <span className="font-medium text-text">Archived</span> on <Timestamp value={workflow.archivedAt} />
              </li>
            )}
          </ul>
        )}
        {props.extra}
      </div>
    </AdminSection>
  );
}

/** Human labels for check paths ("answerSpec.accepted.0.value" → "Answer › accepted 1 › value"). */
export function fieldLabel(path: string): string {
  if (path === "_form") return "Question";
  return path
    .split(".")
    .map((segment) => (/^\d+$/.test(segment) ? String(Number(segment) + 1) : segment.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()))
    .join(" › ")
    .replace(/^answer spec/, "answer")
    .replace(/^payload/, "question setup");
}

/** "Before review": blocking problems and advisory warnings of the item. */
export function ChecksList({ errors, warnings, emptyText = "Nothing blocks review." }: { errors: Record<string, readonly string[]>; warnings: Record<string, readonly string[]>; emptyText?: string }) {
  const errorEntries = Object.entries(errors);
  const warningEntries = Object.entries(warnings);
  return (
    <AdminSection title="Before review" description="Checked on every save and again at review, approval and publication.">
      {errorEntries.length === 0 && warningEntries.length === 0 ? (
        <p className="text-sm text-success-text">{emptyText}</p>
      ) : (
        <div className="space-y-3">
          {errorEntries.length > 0 && (
            <ul className="space-y-1.5" aria-label="Problems to fix">
              {errorEntries.flatMap(([path, messages]) =>
                messages.map((message) => (
                  <li key={`${path}:${message}`} className="flex gap-2 text-sm text-danger-text">
                    <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <span>
                      <span className="font-medium">{fieldLabel(path)}:</span> {message}
                    </span>
                  </li>
                )),
              )}
            </ul>
          )}
          {warningEntries.length > 0 && (
            <ul className="space-y-1.5" aria-label="Warnings">
              {warningEntries.flatMap(([path, messages]) =>
                messages.map((message) => (
                  <li key={`${path}:${message}`} className="flex gap-2 text-sm text-warning-text">
                    <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <span>
                      <span className="font-medium">{fieldLabel(path)}:</span> {message}
                    </span>
                  </li>
                )),
              )}
            </ul>
          )}
        </div>
      )}
    </AdminSection>
  );
}

export function RevisionHistory({
  revisions,
}: {
  revisions: readonly { revision: number; createdAt: Date; changeNote: string | null; author: string | null; approvedBy: string | null; aiGenerated?: boolean }[];
}) {
  return (
    <AdminSection title="Revisions" description="Published revisions are immutable snapshots; attempts keep the revision they used.">
      {revisions.length === 0 ? (
        <p className="text-sm text-muted">Not published yet.</p>
      ) : (
        <ol className="space-y-2">
          {revisions.map((r) => (
            <li key={r.revision} className="text-sm">
              <span className="font-semibold text-text">Revision {r.revision}</span> · <Timestamp value={r.createdAt} className="text-muted" />
              {r.aiGenerated && <span className="ml-1 text-muted">· AI-assisted</span>}
              <span className="block text-muted">
                By {r.author ?? "unknown"}, approved by {r.approvedBy ?? "nobody recorded"}
                {r.changeNote ? ` · “${r.changeNote}”` : ""}
              </span>
            </li>
          ))}
        </ol>
      )}
    </AdminSection>
  );
}

/** A link styled as a button (server-compatible). */
export function LinkButton({ href, children, variant = "outline" }: { href: string; children: ReactNode; variant?: "outline" | "primary" | "ghost" | "secondary" }) {
  return (
    <Link href={href} className={buttonStyles({ variant, size: "sm" })}>
      {children}
    </Link>
  );
}
