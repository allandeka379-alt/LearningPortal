import { Archive } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChatMessage, type ChatItem } from "@/components/tutor/ChatMessage";
import { startersFor } from "@/components/tutor/labels";
import { TutorChat } from "@/components/tutor/TutorChat";
import { buttonStyles } from "@/components/ui/button-styles";
import type { SanitizedHtml } from "@/lib/content/types";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { getConversation, getTutorStatus, type TutorMessageView } from "@/server/tutor";
import { archiveConversationAction, rateTutorMessageAction } from "../actions";
import { availabilityOf } from "../_lib/availability";

export const metadata: Metadata = { title: "Tutor conversation" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * One tutor conversation (§14, §15): the private transcript with answers rendered on the server (KaTeX), then the
 * streaming chat. Someone else's conversation is a plain 404 (row-level security: it does not exist for this user).
 */
export default async function TutorConversationPage({
  params,
  searchParams,
}: {
  params: Promise<{ conversationId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { conversationId } = await params;
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the whole area is a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireOnboardedStudent({ next: `/app/tutor/${conversationId}` });
  if (!UUID.test(conversationId)) notFound();
  const { before } = await searchParams;
  const [conversation, status] = await Promise.all([
    getConversation(actor, conversationId, { before: typeof before === "string" ? before : null }).catch((error: unknown) => {
      if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
      throw error;
    }),
    getTutorStatus(actor),
  ]);
  const title = conversation.title ?? "Conversation";
  const context = [conversation.subject?.name, conversation.topic && conversation.topic.name !== title ? conversation.topic.name : null]
    .filter(Boolean)
    .join(" · ");
  const firstMessage = conversation.messages[0];
  const earlierPage = typeof before === "string";

  return (
    <Container size="reading" className="pb-4">
      <PageHeader
        title={title}
        eyebrow={context || undefined}
        breadcrumbs={[{ label: "AI tutor", href: "/app/tutor" }, { label: title }]}
        actions={
          conversation.status !== "ARCHIVED" ? (
            <form action={archiveConversationAction}>
              <input type="hidden" name="conversationId" value={conversation.id} />
              <button type="submit" className={buttonStyles({ variant: "ghost" })}>
                <Archive aria-hidden="true" />
                Archive
              </button>
            </form>
          ) : undefined
        }
        className="pb-4"
      />
      {conversation.hasEarlier && firstMessage && (
        <p className="mb-4 text-center text-sm">
          <Link href={`/app/tutor/${conversation.id}?before=${encodeURIComponent(firstMessage.createdAt)}`} className="text-primary underline">
            Show earlier messages
          </Link>
        </p>
      )}
      {earlierPage ? (
        <>
          <ol aria-label="Earlier messages" className="flex flex-col gap-4">
            {conversation.messages.map((message) => (
              <li key={message.id}>
                <ChatMessage item={toChatItem(message)} />
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-sm">
            <Link href={`/app/tutor/${conversation.id}`} className="text-primary underline">
              Back to the latest messages
            </Link>
          </p>
        </>
      ) : (
        <TutorChat
          key={conversation.id}
          conversationId={conversation.id}
          initialMessages={conversation.messages}
          quota={status.quota}
          availability={availabilityOf(status)}
          locked={conversation.status !== "ACTIVE"}
          turnsRemaining={conversation.turnsRemaining}
          maxInputChars={status.maxInputChars}
          starters={startersFor({ hasQuestion: conversation.questionId !== null, hasTopic: conversation.topic !== null, hasSubject: conversation.subject !== null })}
          upgradeHref={status.upgradeHref}
          newConversationHref={conversation.topic ? `/app/tutor/new?topicId=${conversation.topic.id}` : "/app/tutor/new"}
          rateAction={rateTutorMessageAction}
        />
      )}
    </Container>
  );
}

/** A stored message as a read-only bubble (earlier pages of a long conversation). */
function toChatItem(message: TutorMessageView): ChatItem {
  return {
    key: message.id,
    id: message.id,
    role: message.role,
    text: message.content,
    // Rendered by the server's content pipeline (renderAnswer) in getConversation.
    html: message.html ? (message.html as SanitizedHtml) : null,
    status: message.status,
    turnMode: null,
    hintLevel: message.hintLevel,
    rating: message.rating,
    helplines: null,
  };
}
