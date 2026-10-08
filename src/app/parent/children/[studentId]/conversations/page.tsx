import { Bot, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { orNotFound } from "@/components/parent/not-found";
import { formatInstantDate } from "@/components/student/format";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCount } from "@/lib/format";
import { requireRole } from "@/server/auth/guards";
import { listChildAiConversations, requireLinkedChild } from "@/server/family";
import { getRequestContext } from "@/server/lib/request";

export const metadata: Metadata = { title: "Shared AI conversations" };

/**
 * A child's AI tutor conversations, ONLY when the platform switch is on and the child separately consented for this
 * parent (§21); otherwise this page does not exist (404). Every read is audited by the service.
 */
export default async function ChildConversationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ studentId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ studentId }, query] = await Promise.all([params, searchParams]);
  const actor = await requireRole("PARENT", { next: `/parent/children/${studentId}/conversations` });
  const child = await orNotFound(requireLinkedChild(actor, studentId));
  const cursor = typeof query.cursor === "string" ? query.cursor : null;
  const context = await getRequestContext();
  const page = await orNotFound(listChildAiConversations(actor, child.studentUserId, { cursor }, context));
  const name = child.firstName ?? child.name;

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Shared AI conversations"
        breadcrumbs={[
          { label: "Your children", href: "/parent" },
          { label: child.name, href: `/parent/children/${child.studentUserId}` },
          { label: "AI conversations" },
        ]}
        description={`${name} chose to share these with you and can stop at any time. Photos are never shown.`}
        className="pb-0"
      />
      {page.items.length === 0 ? (
        <EmptyState icon={<Bot aria-hidden="true" />} title="No conversations yet" description={`${name} hasn't used the AI tutor yet.`} />
      ) : (
        <ul className="divide-y divide-border rounded-card border border-border bg-surface">
          {page.items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/parent/children/${child.studentUserId}/conversations/${item.id}`}
                className="flex min-h-11 items-center gap-3 px-4 py-3 transition-colors hover:bg-subtle"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium break-words text-text">{item.title ?? (item.mode === "SOLVER" ? "Question solver" : "Tutor conversation")}</span>
                  <span className="block text-sm text-muted">
                    {item.subjectName ? `${item.subjectName} · ` : ""}
                    {formatCount(item.messageCount, "message")}
                    {item.lastMessageAt ? ` · ${formatInstantDate(item.lastMessageAt, actor.timeZone)}` : ""}
                  </span>
                </span>
                <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {page.nextCursor && (
        <ButtonLink href={`/parent/children/${child.studentUserId}/conversations?cursor=${encodeURIComponent(page.nextCursor)}`} variant="outline">
          Older conversations
        </ButtonLink>
      )}
    </Container>
  );
}
