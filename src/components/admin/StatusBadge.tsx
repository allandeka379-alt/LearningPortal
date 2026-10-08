import { Sparkles } from "lucide-react";
import { Badge, type BadgeAppearance, type BadgeTone } from "@/components/ui/Badge";
import { humanizeEnum } from "./format";

/**
 * Status badges for the admin console. The TEXT always carries the meaning (never colour alone); the tone only
 * reinforces it. Feedback tones are used because these ARE states (§37 rule: success/danger reserved for feedback and
 * status). Server-compatible.
 */

interface StatusMeta {
  label: string;
  tone: BadgeTone;
  appearance?: BadgeAppearance;
}

/** Content workflow (§42): DRAFT → IN_REVIEW → APPROVED → PUBLISHED → ARCHIVED. */
export const CONTENT_STATUS_META: Readonly<Record<string, StatusMeta>> = {
  DRAFT: { label: "Draft", tone: "neutral" },
  IN_REVIEW: { label: "In review", tone: "info" },
  APPROVED: { label: "Approved", tone: "primary" },
  PUBLISHED: { label: "Published", tone: "success" },
  ARCHIVED: { label: "Archived", tone: "neutral", appearance: "outline" },
};

const STATUS_META: Readonly<Record<string, Readonly<Record<string, StatusMeta>>>> = {
  content: CONTENT_STATUS_META,
  user: {
    ACTIVE: { label: "Active", tone: "success" },
    SUSPENDED: { label: "Suspended", tone: "danger" },
    PENDING_DELETION: { label: "Deletion pending", tone: "warning" },
    DELETED: { label: "Deleted", tone: "neutral", appearance: "outline" },
  },
  school: {
    PENDING_VERIFICATION: { label: "Pending verification", tone: "warning" },
    ACTIVE: { label: "Active", tone: "success" },
    SUSPENDED: { label: "Suspended", tone: "danger" },
    CLOSED: { label: "Closed", tone: "neutral", appearance: "outline" },
  },
  member: {
    INVITED: { label: "Invited", tone: "info" },
    REQUESTED: { label: "Requested", tone: "warning" },
    ACTIVE: { label: "Active", tone: "success" },
    REMOVED: { label: "Removed", tone: "neutral", appearance: "outline" },
  },
  invitation: {
    PENDING: { label: "Pending", tone: "info" },
    ACCEPTED: { label: "Accepted", tone: "success" },
    EXPIRED: { label: "Expired", tone: "neutral", appearance: "outline" },
    REVOKED: { label: "Revoked", tone: "neutral", appearance: "outline" },
  },
  announcement: {
    DRAFT: { label: "Draft", tone: "neutral" },
    SCHEDULED: { label: "Scheduled", tone: "info" },
    LIVE: { label: "Live", tone: "success" },
    EXPIRED: { label: "Expired", tone: "neutral", appearance: "outline" },
    ARCHIVED: { label: "Archived", tone: "neutral", appearance: "outline" },
  },
  subscription: {
    PENDING: { label: "Pending", tone: "warning" },
    TRIALING: { label: "Trial", tone: "info" },
    ACTIVE: { label: "Active", tone: "success" },
    PAST_DUE: { label: "Past due", tone: "warning" },
    CANCELLED: { label: "Cancelled", tone: "neutral", appearance: "outline" },
    EXPIRED: { label: "Expired", tone: "neutral", appearance: "outline" },
  },
  payment: {
    PENDING: { label: "Pending", tone: "warning" },
    SUCCESSFUL: { label: "Successful", tone: "success" },
    FAILED: { label: "Failed", tone: "danger" },
    REFUNDED: { label: "Refunded", tone: "neutral" },
    CANCELLED: { label: "Cancelled", tone: "neutral", appearance: "outline" },
  },
  syllabus: {
    DRAFT: { label: "Draft", tone: "neutral" },
    UPCOMING: { label: "Upcoming", tone: "info" },
    CURRENT: { label: "Current", tone: "success" },
    SUPERSEDED: { label: "Superseded", tone: "neutral" },
    ARCHIVED: { label: "Archived", tone: "neutral", appearance: "outline" },
  },
  flag: {
    OPEN: { label: "Open", tone: "warning" },
    IN_PROGRESS: { label: "In progress", tone: "info" },
    RESOLVED: { label: "Resolved", tone: "success" },
    REJECTED: { label: "Rejected", tone: "neutral", appearance: "outline" },
  },
  job: {
    PENDING: { label: "Pending", tone: "neutral" },
    RUNNING: { label: "Running", tone: "info" },
    SUCCEEDED: { label: "Succeeded", tone: "success" },
    FAILED: { label: "Failed", tone: "danger" },
    DEAD: { label: "Dead letter", tone: "danger" },
    CANCELLED: { label: "Cancelled", tone: "neutral", appearance: "outline" },
  },
  session: {
    ACTIVE: { label: "Active", tone: "success" },
    REVOKED: { label: "Signed out", tone: "neutral", appearance: "outline" },
    EXPIRED: { label: "Expired", tone: "neutral", appearance: "outline" },
  },
};

export type StatusKind = keyof typeof STATUS_META | "content";

export interface StatusBadgeProps {
  /** Which vocabulary the status belongs to (content workflow, user, school, member, announcement, …). */
  kind: StatusKind;
  status: string;
  size?: "sm" | "md";
  className?: string;
}

/** A status label for any known admin status vocabulary; unknown values fall back to a neutral humanised label. */
export function StatusBadge({ kind, status, size = "sm", className }: StatusBadgeProps) {
  const meta = STATUS_META[kind]?.[status] ?? { label: humanizeEnum(status), tone: "neutral" as const };
  return (
    <Badge tone={meta.tone} appearance={meta.appearance ?? "soft"} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}

/** Content workflow status (§42). */
export function ContentStatusBadge({ status, size = "sm", className }: { status: string; size?: "sm" | "md"; className?: string }) {
  return <StatusBadge kind="content" status={status} size={size} className={className} />;
}

/** Marks AI-generated content (§41): always visible next to the status so reviewers know a human must check it. */
export function AiDraftBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <Badge tone="accent" size={size} icon={<Sparkles aria-hidden="true" />}>
      AI-generated
    </Badge>
  );
}

/** Marks development-only demo rows (§50) so nobody mistakes them for real data. */
export function DemoBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <Badge tone="warning" appearance="outline" size={size}>
      Demo data
    </Badge>
  );
}
