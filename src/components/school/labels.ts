import type { BadgeTone } from "@/components/ui/Badge";

/** Display vocabulary of the school area (UI copy only; no content). Isomorphic. */

export const SCHOOL_ROLE_LABELS: Readonly<Record<string, string>> = {
  SCHOOL_ADMIN: "School admin",
  TEACHER: "Teacher",
  STUDENT: "Student",
};

export const INVITATION_STATE_META: Readonly<Record<string, { label: string; tone: BadgeTone }>> = {
  PENDING: { label: "Waiting", tone: "info" },
  ACCEPTED: { label: "Accepted", tone: "success" },
  EXPIRED: { label: "Expired", tone: "neutral" },
  REVOKED: { label: "Withdrawn", tone: "neutral" },
};

export const REPORT_STATUS_META: Readonly<Record<string, { label: string; tone: BadgeTone }>> = {
  QUEUED: { label: "Queued", tone: "info" },
  GENERATING: { label: "Preparing", tone: "info" },
  READY: { label: "Ready", tone: "success" },
  FAILED: { label: "Failed", tone: "danger" },
  EXPIRED: { label: "Expired", tone: "neutral" },
};

export const ROSTER_OUTCOME_META: Readonly<Record<string, { label: string; tone: BadgeTone }>> = {
  create: { label: "New account", tone: "success" },
  invite: { label: "Invitation", tone: "info" },
  existing: { label: "Already on roster", tone: "neutral" },
  skip: { label: "Skipped", tone: "warning" },
  error: { label: "Needs fixing", tone: "danger" },
};

export const SUBSCRIPTION_STATUS_META: Readonly<Record<string, { label: string; tone: BadgeTone }>> = {
  PENDING: { label: "Pending", tone: "info" },
  TRIALING: { label: "Trial", tone: "info" },
  ACTIVE: { label: "Active", tone: "success" },
  PAST_DUE: { label: "Renewal due", tone: "warning" },
  CANCELLED: { label: "Cancelled", tone: "neutral" },
  EXPIRED: { label: "Expired", tone: "neutral" },
};

export const CONSENT_LABELS: Readonly<Record<string, string>> = {
  NOT_REQUIRED: "Not required (adult)",
  PENDING: "Waiting for a parent or guardian",
  GRANTED: "Given",
  REFUSED: "Refused",
  WITHDRAWN: "Withdrawn",
};

export const CONSENT_METHOD_LABELS: Readonly<Record<string, string>> = {
  PARENT_ACCOUNT: "by a linked parent",
  GUARDIAN_OTP: "by the guardian's phone or email",
  SCHOOL: "collected by the school",
  OFFLINE_FORM: "on a signed form",
};
