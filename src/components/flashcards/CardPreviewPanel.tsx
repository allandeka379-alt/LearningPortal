import { RichContent } from "@/components/content/RichContent";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/button-styles";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { SanitizedHtml } from "@/lib/content/types";
import { dueInText } from "./copy";

export interface CardPreviewPanelProps {
  card: {
    subjectName: string;
    topicName: string | null;
    cardTypeLabel: string;
    frontHtml: SanitizedHtml;
    backHtml: SanitizedHtml;
    notesHtml: SanitizedHtml | null;
    languageCode: string;
    isPersonal: boolean;
    studied: boolean;
    suspended: boolean;
    dueAt: string | null;
  };
  /** Server time for the "next review in …" wording. */
  now: Date;
}

/**
 * One card opened from a link (search results): its front, the answer behind a native disclosure (no JS) and where it
 * stands in the student's schedule. Server Component.
 */
export function CardPreviewPanel({ card, now }: CardPreviewPanelProps) {
  const status = card.suspended
    ? "Hidden from your reviews. Restore it from Your cards."
    : card.studied && card.dueAt
      ? new Date(card.dueAt).getTime() <= now.getTime()
        ? "Due for review now."
        : `Next review ${dueInText(card.dueAt, now)}.`
      : "Not studied yet: it comes up as a new card in your reviews.";
  return (
    <Card as="section" aria-labelledby="card-preview-title">
      <CardHeader
        title={<span id="card-preview-title">Flashcard</span>}
        titleAs="h2"
        description={[card.subjectName, card.topicName].filter(Boolean).join(" · ")}
        action={
          <span className="flex flex-wrap gap-1.5">
            <Badge size="sm">{card.cardTypeLabel}</Badge>
            {card.isPersonal && (
              <Badge size="sm" tone="primary">
                Your card
              </Badge>
            )}
          </span>
        }
      />
      <CardBody className="space-y-4">
        <RichContent html={card.frontHtml} lang={card.languageCode} className="text-lg" />
        <details className="group">
          <summary className={buttonStyles({ variant: "outline", size: "md", className: "cursor-pointer list-none [&::-webkit-details-marker]:hidden" })}>
            <span className="group-open:hidden">Show answer</span>
            <span className="hidden group-open:inline">Hide answer</span>
          </summary>
          <div className="mt-4 space-y-3 border-t border-dashed border-border pt-4">
            <RichContent html={card.backHtml} lang={card.languageCode} />
            {card.notesHtml && (
              <div className="rounded-control bg-subtle p-3 text-sm">
                <RichContent html={card.notesHtml} lang={card.languageCode} />
              </div>
            )}
          </div>
        </details>
        <p className="text-sm text-muted">{status}</p>
      </CardBody>
    </Card>
  );
}
