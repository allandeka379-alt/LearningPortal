import { KeyRound } from "lucide-react";
import { formatMicrosUsd } from "@/components/admin/format";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { StatTile } from "@/components/ui/StatTile";
import { formatNumber } from "@/lib/format";
import { AI_JOB_STATUS_META, type AiJobStatus } from "@/server/cms/ai-drafts/schemas";
import type { EditorUsageToday } from "@/server/cms/ai-drafts/service";

/** Presentational pieces of the AI generation pages (server components). */

export function AiJobStatusBadge({ status }: { status: AiJobStatus }) {
  const meta = AI_JOB_STATUS_META[status];
  return (
    <Badge size="sm" tone={meta.tone} appearance={meta.outline ? "outline" : "soft"}>
      {meta.label}
    </Badge>
  );
}

/** Honest "AI is not configured" notice: no form, no sample output. */
export function AiNotConfigured() {
  return (
    <Alert tone="info" icon={<KeyRound aria-hidden="true" />} title="AI is not configured on this server">
      No AI provider key is set, so drafts cannot be generated. Ask an administrator to configure it. Existing jobs and the drafts they created are listed below.
    </Alert>
  );
}

/** The editor's real usage today against the caps (Africa/Harare day). */
export function UsageTiles({ usage }: { usage: EditorUsageToday }) {
  const { limits } = usage;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatTile label="Your generation runs today" value={formatNumber(usage.jobs)} hint={`Daily limit ${formatNumber(limits.editorDailyJobs)}`} />
      <StatTile
        label="Your AI spend today"
        value={formatMicrosUsd(usage.costMicros)}
        hint={limits.editorDailyCostMicros === null ? "No daily spend cap" : `Daily cap ${formatMicrosUsd(limits.editorDailyCostMicros)}`}
      />
    </div>
  );
}
