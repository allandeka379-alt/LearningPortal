import { Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDateTime, formatMicrosUsd } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { ADMIN_HOME } from "@/components/admin/nav";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { hasPermission } from "@/server/auth/permissions";
import { AI_DRAFT_KINDS, AI_JOB_STATUS_META, AI_JOB_STATUSES, AI_KIND_META } from "@/server/cms/ai-drafts/schemas";
import { canGenerate, getEditorUsageToday, isAiConfigured, listGenerationJobs } from "@/server/cms/ai-drafts/service";
import { AiJobStatusBadge, AiNotConfigured, UsageTiles } from "./_components/AiJobBits";
import { AiNav } from "./usage/_components/AiNav";

export const metadata = { title: "AI content generation" };

/**
 * /admin/ai — §41 AI content generation for editors: today's usage against the caps, and every generation job with
 * its status, items created and metered cost, linking to the job's drafts. `ai.generate` + `content.draft`. Admins
 * also get the AI operations sub-navigation (usage & spend, settings), owned by the AI settings area.
 */
export default async function AiGenerationPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the AI admin pages are a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireAdminPage("ai.generate", { next: "/admin/ai" });
  if (!canGenerate(actor)) redirect(ADMIN_HOME);
  const params = await searchParams;
  const filters = {
    status: enumParam(params, "status", AI_JOB_STATUSES),
    kind: enumParam(params, "kind", AI_DRAFT_KINDS),
    mine: firstParam(params, "mine") === "1",
    cursor: firstParam(params, "cursor"),
  };
  const configured = isAiConfigured();
  const [page, usage] = await Promise.all([loadFirstPageOnStaleCursor(filters, (f) => listGenerationJobs(actor, f)), getEditorUsageToday(actor)]);
  const filtered = Boolean(filters.status || filters.kind || filters.mine);

  return (
    <Container size="wide">
      <PageHeader
        title="AI content generation"
        description="Draft lessons, questions, flashcards, hints, explanations and study plans with AI. Every item arrives as a draft marked AI-generated; another editor must check and approve it before anything is published."
        actions={
          configured ? (
            <ButtonLink href="/admin/ai/generate" iconStart={<Sparkles aria-hidden="true" className="size-4" />}>
              Generate drafts
            </ButtonLink>
          ) : undefined
        }
      />
      {hasPermission(actor, "ai.admin", "restricted") && <AiNav current="/admin/ai" />}
      <div className="space-y-6 pb-12">
        {!configured && <AiNotConfigured />}
        <UsageTiles usage={usage} />
        <div>
          <FilterBar
            action="/admin/ai"
            filters={[
              { kind: "select", name: "status", label: "Status", options: AI_JOB_STATUSES.map((value) => ({ value, label: AI_JOB_STATUS_META[value].label })), value: filters.status },
              { kind: "select", name: "kind", label: "Content", options: AI_DRAFT_KINDS.map((value) => ({ value, label: AI_KIND_META[value].label })), value: filters.kind },
              { kind: "select", name: "mine", label: "Requested by", options: [{ value: "1", label: "Me" }], value: filters.mine ? "1" : undefined, placeholder: "Anyone" },
            ]}
          />
          <DataTable
            caption="AI generation jobs, newest first"
            rows={page.items}
            rowKey={(row) => row.id}
            empty={
              <EmptyState
                icon={<Sparkles aria-hidden="true" />}
                title={filtered ? "No jobs match these filters" : "No AI drafts generated yet"}
                description={filtered ? undefined : configured ? "Choose a topic and what to draft. The results arrive as drafts for review." : undefined}
                action={!filtered && configured ? <ButtonLink href="/admin/ai/generate">Generate drafts</ButtonLink> : undefined}
              />
            }
            columns={[
              {
                key: "what",
                header: "Request",
                primary: true,
                cell: (row) => (
                  <span className="block min-w-0">
                    <Link href={`/admin/ai/jobs/${row.id}`} className="font-semibold text-text underline-offset-4 hover:underline">
                      {AI_KIND_META[row.kind].label}
                    </Link>
                    <span className="block text-xs text-muted">
                      {[row.subject, row.scope].filter(Boolean).join(" · ") || "—"}
                    </span>
                  </span>
                ),
              },
              { key: "status", header: "Status", cell: (row) => <AiJobStatusBadge status={row.status} /> },
              {
                key: "items",
                header: "Drafts",
                cell: (row) => (
                  <span className="tabular-nums">
                    {formatNumber(row.itemsCreated)}
                    {row.itemsRequested !== null && <span className="text-muted"> of {formatNumber(row.itemsRequested)}</span>}
                  </span>
                ),
              },
              {
                key: "cost",
                header: "Cost",
                hideOnMobile: true,
                cell: (row) =>
                  row.status === "COMPLETED" || row.status === "FAILED" ? (
                    <span className="tabular-nums">{formatMicrosUsd(row.costMicros)}</span>
                  ) : (
                    <span className="text-muted">est. {formatMicrosUsd(row.estimatedCostMicros)}</span>
                  ),
              },
              {
                key: "by",
                header: "Requested",
                hideOnMobile: true,
                cell: (row) => (
                  <span className="block text-sm">
                    {formatDateTime(row.createdAt)}
                    <span className="block text-xs text-muted">{row.requestedByMe ? "You" : (row.requestedBy ?? "Unknown")}</span>
                  </span>
                ),
              },
            ]}
          />
          <CursorPagination className="mt-4" path="/admin/ai" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Job pages" />
        </div>
      </div>
    </Container>
  );
}
