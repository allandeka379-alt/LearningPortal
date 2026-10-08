import { BadgeCheck, CircleDashed, Clock } from "lucide-react";
import { DemoBadge, StatusBadge } from "@/components/admin/StatusBadge";
import { Badge, type BadgeAppearance, type BadgeTone } from "@/components/ui/Badge";
import { CATALOGUE_STATUS_LABEL, TOPIC_KIND_LABEL } from "./labels";

/** Status badges of the curriculum admin. Text carries the meaning; tone only reinforces it. Server-compatible. */

const CATALOGUE_TONE: Readonly<Record<string, { tone: BadgeTone; appearance?: BadgeAppearance }>> = {
  HIDDEN: { tone: "neutral", appearance: "outline" },
  COMING_SOON: { tone: "info" },
  AVAILABLE: { tone: "success" },
  RETIRED: { tone: "neutral" },
};

/** Catalogue visibility of a country, board, qualification or subject. */
export function CatalogueStatusBadge({ status }: { status: string }) {
  const meta = CATALOGUE_TONE[status] ?? { tone: "neutral" as const };
  return (
    <Badge tone={meta.tone} appearance={meta.appearance ?? "soft"} size="sm">
      {CATALOGUE_STATUS_LABEL[status] ?? status}
    </Badge>
  );
}

/** Syllabus version lifecycle (DRAFT → UPCOMING/CURRENT → SUPERSEDED → ARCHIVED). */
export function SyllabusStatusBadge({ status }: { status: string }) {
  return <StatusBadge kind="syllabus" status={status} />;
}

/** Whether a subject was checked against the board's official subject list (a source is recorded). */
export function VerifiedBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <Badge tone="success" size="sm" icon={<BadgeCheck aria-hidden="true" />}>
      Verified
    </Badge>
  ) : (
    <Badge tone="warning" appearance="outline" size="sm" icon={<CircleDashed aria-hidden="true" />}>
      Unverified
    </Badge>
  );
}

const SESSION_META: Readonly<Record<string, { label: string; tone: BadgeTone; appearance?: BadgeAppearance }>> = {
  DRAFT: { label: "Draft", tone: "neutral" },
  PUBLISHED: { label: "Published", tone: "success" },
  CANCELLED: { label: "Cancelled", tone: "danger" },
  ARCHIVED: { label: "Archived", tone: "neutral", appearance: "outline" },
};

export function ExamSessionStatusBadge({ status }: { status: string }) {
  const meta = SESSION_META[status] ?? { label: status, tone: "neutral" as const };
  return (
    <Badge tone={meta.tone} appearance={meta.appearance ?? "soft"} size="sm">
      {meta.label}
    </Badge>
  );
}

/** Dates not yet confirmed against the official timetable. */
export function ProvisionalBadge({ provisional }: { provisional: boolean }) {
  return provisional ? (
    <Badge tone="warning" size="sm" icon={<Clock aria-hidden="true" />}>
      Provisional dates
    </Badge>
  ) : (
    <Badge tone="success" appearance="outline" size="sm" icon={<BadgeCheck aria-hidden="true" />}>
      Dates confirmed
    </Badge>
  );
}

export function TopicKindBadge({ kind }: { kind: string }) {
  return (
    <Badge tone={kind === "SECTION" ? "primary" : kind === "TOPIC" ? "info" : "neutral"} appearance="outline" size="sm">
      {TOPIC_KIND_LABEL[kind] ?? kind}
    </Badge>
  );
}

export function ActiveBadge({ active, activeLabel = "Active", inactiveLabel = "Inactive" }: { active: boolean; activeLabel?: string; inactiveLabel?: string }) {
  return active ? (
    <Badge tone="success" size="sm">
      {activeLabel}
    </Badge>
  ) : (
    <Badge tone="neutral" appearance="outline" size="sm">
      {inactiveLabel}
    </Badge>
  );
}

export { DemoBadge };
