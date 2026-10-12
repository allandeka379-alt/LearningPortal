import { UpgradeLink } from "@/components/billing/UpgradeOffer";
import { Layers, Lock, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";
import { deckCountsText, newCardHref, reviewHref, reviewableCount } from "./copy";
import type { DeckCounts } from "./types";

/** One topic deck row. */
export interface TopicDeckItem {
  topicId: string;
  name: string;
  code: string | null;
  counts: DeckCounts;
}

/** One subject deck. */
export interface SubjectDeckItem {
  subjectId: string;
  name: string;
  entitled: boolean;
  counts: DeckCounts;
  personalCards: number;
  topics: readonly TopicDeckItem[];
}

export interface DeckListProps {
  subjects: readonly SubjectDeckItem[];
  /** New cards still allowed today (shared by all decks). */
  newRemainingToday: number;
  /** Topic deck to highlight (the topic page's "Flashcards" link). */
  focusTopicId?: string;
  upgradeHref: string;
}

function ReviewLink({ counts, newRemainingToday, href, label }: { counts: DeckCounts; newRemainingToday: number; href: string; label: string }) {
  const count = reviewableCount(counts, newRemainingToday);
  if (count === 0) return null;
  return (
    <ButtonLink href={href} size="sm" variant="secondary" aria-label={label}>
      Review {count}
    </ButtonLink>
  );
}

/**
 * Decks by subject and topic (§18) with honest counts: due now, new cards still allowed today, total and mature
 * cards. Each deck with something to study links to its review session. Server-compatible.
 */
export function DeckList({ subjects, newRemainingToday, focusTopicId, upgradeHref }: DeckListProps) {
  return (
    <div className="space-y-4">
      {subjects.map((subject) => {
        const headingId = `deck-${subject.subjectId}`;
        const cardTotal = subject.counts.total + subject.counts.suspended;
        return (
          <Card as="section" key={subject.subjectId} aria-labelledby={headingId}>
            <CardHeader
              title={<span id={headingId}>{subject.name}</span>}
              titleAs="h2"
              description={
                subject.entitled
                  ? cardTotal > 0
                    ? `${deckCountsText(subject.counts, newRemainingToday)} · ${formatCount(subject.counts.total, "card")}${
                        subject.counts.mature > 0 ? ` · ${subject.counts.mature} mature` : ""
                      }`
                    : "No flashcards yet"
                  : "Needs full access"
              }
              action={
                subject.entitled ? (
                  <ReviewLink counts={subject.counts} newRemainingToday={newRemainingToday} href={reviewHref({ subjectId: subject.subjectId })} label={`Review ${subject.name}`} />
                ) : undefined
              }
            />
            <CardBody className="space-y-3">
              {!subject.entitled ? (
                <p className="flex items-start gap-2 text-sm text-muted">
                  <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <span>
                    Flashcards for {subject.name} come with full access.{" "}
                    <UpgradeLink fallbackHref={upgradeHref} className="font-semibold text-primary underline underline-offset-4" />
                  </span>
                </p>
              ) : cardTotal === 0 ? (
                <p className="text-sm text-muted">
                  There are no published flashcards for your syllabus yet. You can write your own while you study.
                </p>
              ) : subject.topics.length > 0 ? (
                <ul className="divide-y divide-border rounded-control border border-border" aria-label={`${subject.name} topics`}>
                  {subject.topics.map((topic) => {
                    const focused = topic.topicId === focusTopicId;
                    return (
                      <li
                        key={topic.topicId}
                        id={`topic-${topic.topicId}`}
                        className={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2.5", focused && "bg-primary-soft")}
                        aria-current={focused ? "true" : undefined}
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-text">
                            {topic.code ? <span className="text-muted">{topic.code} </span> : null}
                            {topic.name}
                          </p>
                          <p className="text-sm text-muted">
                            {deckCountsText(topic.counts, newRemainingToday)} · {formatCount(topic.counts.total, "card")}
                          </p>
                        </div>
                        <ReviewLink
                          counts={topic.counts}
                          newRemainingToday={newRemainingToday}
                          href={reviewHref({ subjectId: subject.subjectId, topicId: topic.topicId })}
                          label={`Review ${topic.name}`}
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              {subject.entitled && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  {subject.personalCards > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <Layers aria-hidden="true" className="size-4" />
                      {formatCount(subject.personalCards, "card")} of your own
                    </span>
                  )}
                  {subject.counts.suspended > 0 && (
                    <Badge size="sm" tone="neutral">
                      {subject.counts.suspended} hidden
                    </Badge>
                  )}
                  <Link
                    href={newCardHref({ subjectId: subject.subjectId })}
                    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    <Plus aria-hidden="true" className="size-4" />
                    Add a card
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
