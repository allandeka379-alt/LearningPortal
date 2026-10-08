import { CircleCheck, CircleX, ClipboardCheck, Hand, History, PenLine } from "lucide-react";
import Link from "next/link";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { formatDateTime } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { ContentStatusBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { FLAG_REASON_LABELS, FLAG_SOURCE_LABELS } from "@/server/cms/flags/schemas";
import { getFlagDetail } from "@/server/cms/flags/service";
import { CONTENT_TYPE_LABELS, revisionsHref } from "@/server/cms/review/labels";
import { orNotFound } from "../../review/_lib/load";
import { rejectFlagAction, resolveFlagAction, triageFlagAction } from "../actions";

export const metadata = { title: "Content flag" };

/**
 * /admin/flags/[id] — one quality flag (§42): what was reported (reporter shown by role only), the item with links to
 * edit or review it, other reports on the same item, and triage → resolve (with a note) or reject.
 */
export default async function FlagDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/flags/${id}` });
  const flag = await orNotFound(getFlagDetail(actor, id));
  const open = flag.status === "OPEN" || flag.status === "IN_PROGRESS";
  const typeLabel = CONTENT_TYPE_LABELS[flag.entityType].singular;
  const channel = typeof flag.context?.channel === "string" ? flag.context.channel : null;
  const partReported = typeof flag.context?.partId === "string";

  return (
    <Container size="wide">
      <PageHeader
        title={FLAG_REASON_LABELS[flag.reason]}
        eyebrow={`${typeLabel} flag`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Flags", href: "/admin/flags" },
          { label: FLAG_REASON_LABELS[flag.reason] },
        ]}
        actions={<StatusBadge kind="flag" status={flag.status} size="md" />}
      />
      <div className="grid gap-6 pb-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <AdminSection title="The report">
            <div className="space-y-4">
              {flag.details ? (
                <blockquote className="rounded-control border-l-4 border-border-strong bg-subtle p-3 text-sm whitespace-pre-wrap text-text">{flag.details}</blockquote>
              ) : (
                <p className="text-sm text-muted">No details were given.</p>
              )}
              <KeyValueList
                items={[
                  { label: "Reported by", value: FLAG_SOURCE_LABELS[flag.source] },
                  { label: "Reported", value: formatDateTime(flag.createdAt) },
                  { label: "Revision seen", value: flag.revision !== null ? `Revision ${flag.revision}` : null },
                  { label: "Reported from", value: channel ? channel.charAt(0).toUpperCase() + channel.slice(1) : null, hideWhenEmpty: true },
                  { label: "Scope", value: partReported ? "One part of the question" : null, hideWhenEmpty: true },
                  { label: "Assigned to", value: flag.assignedTo ? (flag.assignedToMe ? "You" : flag.assignedTo) : "Nobody yet" },
                ]}
              />
            </div>
          </AdminSection>

          <AdminSection title="Flagged item">
            <div className="space-y-3">
              <p className="flex flex-wrap items-center gap-2 text-sm">
                <Badge size="sm" tone="neutral">
                  {typeLabel}
                </Badge>
                <span className="font-semibold text-text">{flag.target.title}</span>
                {flag.target.status && <ContentStatusBadge status={flag.target.status} />}
                {flag.target.revision !== null && <span className="text-muted">now revision {flag.target.revision}</span>}
              </p>
              {flag.target.exists ? (
                <div className="flex flex-wrap gap-2">
                  {flag.target.editorHref && (
                    <ButtonLink href={flag.target.editorHref} variant="secondary" size="sm" iconStart={<PenLine aria-hidden="true" />}>
                      Open in editor
                    </ButtonLink>
                  )}
                  {flag.target.reviewHref && (
                    <ButtonLink href={flag.target.reviewHref} variant="outline" size="sm" iconStart={<ClipboardCheck aria-hidden="true" />}>
                      Review view
                    </ButtonLink>
                  )}
                  <ButtonLink href={revisionsHref(flag.entityType, flag.entityId)} variant="ghost" size="sm" iconStart={<History aria-hidden="true" />}>
                    Revisions
                  </ButtonLink>
                </div>
              ) : (
                <p className="text-sm text-muted">The item no longer exists.</p>
              )}
              {flag.target.status === "PUBLISHED" && open && (
                <p className="text-sm text-muted">To fix a published item, use “Edit published version” in its editor; resolve this flag once the fix is published.</p>
              )}
            </div>
          </AdminSection>

          {!open && (
            <AdminSection title="Resolution">
              <KeyValueList
                items={[
                  { label: "Outcome", value: <StatusBadge kind="flag" status={flag.status} /> },
                  { label: "By", value: flag.resolvedBy },
                  { label: "On", value: formatDateTime(flag.resolvedAt) },
                  { label: "Fixed in", value: flag.resolutionRevision ? `Revision ${flag.resolutionRevision}` : null, hideWhenEmpty: true },
                ]}
              />
              {flag.resolution && <p className="mt-3 text-sm whitespace-pre-wrap text-text">{flag.resolution}</p>}
            </AdminSection>
          )}
        </div>

        <div className="space-y-6">
          {open && (
            <AdminSection title="Triage">
              <div className="flex flex-wrap gap-2">
                {!(flag.status === "IN_PROGRESS" && flag.assignedToMe) && (
                  <ConfirmAction
                    action={triageFlagAction}
                    fields={{ flagId: flag.id }}
                    triggerLabel={flag.status === "IN_PROGRESS" ? "Take over" : "Pick up"}
                    triggerVariant="secondary"
                    triggerIcon={<Hand aria-hidden="true" />}
                    title={flag.status === "IN_PROGRESS" ? "Take over this flag?" : "Pick up this flag?"}
                    description="It is assigned to you and marked in progress, so others know someone is on it."
                    confirmLabel="Assign to me"
                    successMessage="Assigned to you."
                  />
                )}
                <ConfirmAction
                  action={resolveFlagAction}
                  fields={{ flagId: flag.id }}
                  triggerLabel="Resolve"
                  triggerVariant="primary"
                  triggerIcon={<CircleCheck aria-hidden="true" />}
                  title="Resolve this flag?"
                  description="Use this when the problem has been fixed (or the fix is on its way through review)."
                  confirmLabel="Resolve"
                  reason={{ name: "resolution", label: "What was done?", required: true, maxLength: 2000, placeholder: "Corrected the mark scheme for part (b); published as revision 3." }}
                  successMessage="Resolved."
                />
                <ConfirmAction
                  action={rejectFlagAction}
                  fields={{ flagId: flag.id }}
                  triggerLabel="Reject"
                  triggerIcon={<CircleX aria-hidden="true" />}
                  tone="danger"
                  title="Reject this report?"
                  description="Use this when the item is correct as it is."
                  confirmLabel="Reject report"
                  reason={{ name: "resolution", label: "Why is it not a problem?", required: true, maxLength: 2000 }}
                  successMessage="Report rejected."
                />
              </div>
            </AdminSection>
          )}
          <AdminSection title="Other reports on this item" flush={flag.related.length > 0}>
            {flag.related.length === 0 ? (
              <p className="text-sm text-muted">No other reports.</p>
            ) : (
              <ul className="divide-y divide-border">
                {flag.related.map((other) => (
                  <li key={other.id} className="flex flex-wrap items-center gap-2 px-4 py-3 text-sm sm:px-6">
                    <Link href={`/admin/flags/${other.id}`} className="font-medium text-text underline-offset-4 hover:underline">
                      {FLAG_REASON_LABELS[other.reason]}
                    </Link>
                    <span className="text-muted">{FLAG_SOURCE_LABELS[other.source]}</span>
                    <StatusBadge kind="flag" status={other.status} />
                    <span className="ml-auto text-xs text-muted">{formatDateTime(other.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </AdminSection>
          {open && flag.related.filter((r) => r.status === "OPEN" || r.status === "IN_PROGRESS").length > 0 && (
            <Alert tone="info">Other open reports on this item may be about the same problem; resolve each with a note once it is fixed.</Alert>
          )}
        </div>
      </div>
    </Container>
  );
}
