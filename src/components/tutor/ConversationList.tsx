import { Archive, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonStyles } from "@/components/ui/button-styles";
import { formatInstantDate } from "@/components/student/format";

export interface ConversationListItem {
  id: string;
  title: string | null;
  status: "ACTIVE" | "LOCKED" | "ARCHIVED";
  subjectName: string | null;
  topicName: string | null;
  userMessageCount: number;
  lastMessageAt: Date | null;
  createdAt: Date;
}

export interface ConversationListProps {
  items: readonly ConversationListItem[];
  timeZone: string;
  /** Server Action archiving `conversationId` (form field). */
  archiveAction: (formData: FormData) => Promise<void>;
  newHref: string;
  /** Hide the empty state (e.g. on a later page). */
  emptyState?: boolean;
}

/** The student's tutor conversations (title, subject · topic, last activity) with an archive control. Server component. */
export function ConversationList({ items, timeZone, archiveAction, newHref, emptyState = true }: ConversationListProps) {
  if (items.length === 0) {
    return emptyState ? (
      <EmptyState
        icon={<MessagesSquare aria-hidden="true" />}
        title="No conversations yet"
        description="Start a conversation about a subject or topic you're studying. The tutor explains step by step."
        action={
          <Link href={newHref} className={buttonStyles({ variant: "primary" })}>
            New conversation
          </Link>
        }
      />
    ) : null;
  }
  return (
    <ul className="space-y-3" aria-label="Your conversations">
      {items.map((item) => {
        const context = [item.subjectName, item.topicName && item.topicName !== item.title ? item.topicName : null].filter(Boolean).join(" · ");
        const when = item.lastMessageAt ?? item.createdAt;
        return (
          <Card as="li" key={item.id} interactive className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <Link href={`/app/tutor/${item.id}`} className="block font-semibold text-text after:absolute after:inset-0 hover:text-primary">
                <span className="line-clamp-2 break-words">{item.title ?? "Untitled conversation"}</span>
              </Link>
              <p className="mt-1 text-sm text-muted">
                {context && <span>{context} · </span>}
                <span>{formatInstantDate(when, timeZone, "medium")}</span>
                {item.status === "LOCKED" && <span> · Closed</span>}
              </p>
            </div>
            <form action={archiveAction} className="relative z-10 shrink-0">
              <input type="hidden" name="conversationId" value={item.id} />
              <button type="submit" aria-label={`Archive "${item.title ?? "Untitled conversation"}"`} className={buttonStyles({ variant: "ghost", iconOnly: true })}>
                <Archive aria-hidden="true" />
              </button>
            </form>
          </Card>
        );
      })}
    </ul>
  );
}
