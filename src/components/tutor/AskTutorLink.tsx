import { Sparkles } from "lucide-react";
import { ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

export interface AskTutorLinkProps {
  /**
   * Whether the AI tutor is switched on (`features.ai`, read on the server and passed down; owner decision 2026-10-07).
   * False renders nothing, so no page links to the tutor while its routes return 404.
   */
  enabled: boolean;
  subjectId?: string | null;
  topicId?: string | null;
  /** A question the student has answered (practice feedback, exam review). */
  questionId?: string | null;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** `/app/tutor/new` prefilled with the context (a GET page: the conversation is only created when the student confirms). */
export function askTutorHref(context: Pick<AskTutorLinkProps, "subjectId" | "topicId" | "questionId">): string {
  const params = new URLSearchParams();
  if (context.subjectId) params.set("subjectId", context.subjectId);
  if (context.topicId) params.set("topicId", context.topicId);
  if (context.questionId) params.set("questionId", context.questionId);
  const query = params.toString();
  return query ? `/app/tutor/new?${query}` : "/app/tutor/new";
}

/**
 * "Ask the tutor about this" entry point for lesson pages, practice feedback and exam review (§14). A plain link
 * (server-compatible, no client JS): state changes never happen on GET, so it opens the prefilled "new conversation"
 * page where the student starts the conversation.
 *
 * Never render it inside an exam that is still in progress (the tutor refuses to help there anyway). Renders nothing
 * while AI is switched off (`enabled` false).
 */
export function AskTutorLink({ enabled, label = "Ask the tutor about this", variant = "outline", size = "md", className, ...context }: AskTutorLinkProps) {
  if (!enabled) return null;
  return (
    <ButtonLink href={askTutorHref(context)} variant={variant} size={size} className={className} iconStart={<Sparkles aria-hidden="true" />}>
      {label}
    </ButtonLink>
  );
}
