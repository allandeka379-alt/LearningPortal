import { ImageIcon } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { orNotFound } from "@/components/parent/not-found";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { cn } from "@/lib/cn";
import { requireRole } from "@/server/auth/guards";
import { getChildAiConversation, requireLinkedChild } from "@/server/family";
import { getRequestContext } from "@/server/lib/request";

export const metadata: Metadata = { title: "Shared AI conversation" };

/**
 * One shared AI conversation, read-only, as plain text (no HTML rendering of model output here). Same three gates as
 * the list (platform switch, the child's separate consent, row-level security); every read is audited.
 */
export default async function ChildConversationPage({ params }: { params: Promise<{ studentId: string; conversationId: string }> }) {
  const { studentId, conversationId } = await params;
  const actor = await requireRole("PARENT", { next: `/parent/children/${studentId}/conversations/${conversationId}` });
  const child = await orNotFound(requireLinkedChild(actor, studentId));
  const conversation = await orNotFound(getChildAiConversation(actor, child.studentUserId, conversationId, await getRequestContext()));
  const name = child.firstName ?? child.name;

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title={conversation.title ?? (conversation.mode === "SOLVER" ? "Question solver" : "Tutor conversation")}
        eyebrow={conversation.subjectName ?? undefined}
        breadcrumbs={[
          { label: "Your children", href: "/parent" },
          { label: child.name, href: `/parent/children/${child.studentUserId}` },
          { label: "AI conversations", href: `/parent/children/${child.studentUserId}/conversations` },
          { label: "Conversation" },
        ]}
        className="pb-0"
      />
      {conversation.truncated && <Alert tone="neutral">Only the most recent messages are shown.</Alert>}
      <ol className="space-y-3">
        {conversation.messages.map((message) => {
          const fromChild = message.role === "USER";
          return (
            <li key={message.id} className={cn("flex", fromChild ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-card border px-4 py-3 text-sm",
                  fromChild ? "border-primary/30 bg-primary-soft text-on-primary-soft" : "border-border bg-surface text-text",
                )}
              >
                <p className="mb-1 text-xs font-semibold text-muted">
                  {fromChild ? name : "AI tutor"} · <time dateTime={message.createdAt.toISOString()}>{formatInstantDate(message.createdAt, actor.timeZone, "short")}</time>
                </p>
                {message.content === null ? (
                  <p className="text-muted italic">This message was removed after 12 months.</p>
                ) : (
                  <p className="break-words whitespace-pre-wrap">{message.content}</p>
                )}
                {message.hasPhoto && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                    <ImageIcon aria-hidden="true" className="size-3.5" />A photo was attached (not shown).
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
