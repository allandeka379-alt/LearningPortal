import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { BookOpen, Layers, Lock, Plus } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CardPreviewPanel } from "@/components/flashcards/CardPreviewPanel";
import { dueInText, newCardHref, reviewHref } from "@/components/flashcards/copy";
import { DeckList } from "@/components/flashcards/DeckList";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatTile } from "@/components/ui/StatTile";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { getCardPreview, getDeckOverview } from "@/server/flashcards/service";
import { parseDeckParams, type SearchParams } from "./_lib/params";

export const metadata: Metadata = { title: "Flashcards" };

/**
 * Flashcard decks (§18; ARCHITECTURE §3.3 `/app/flashcards`): today's numbers, then decks by subject and topic with
 * due / new counts and a "Review" link each, "Review all due", and the student's own cards. `?subjectId=&topicId=`
 * (the topic page's "Flashcards") highlights that topic's deck; `?cardId=` (search) opens one card.
 */
export default async function FlashcardsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const actor = await requireOnboardedStudent({ next: "/app/flashcards" });
  const params = parseDeckParams(await searchParams);
  const now = new Date();
  const [overview, preview] = await Promise.all([getDeckOverview(actor, now), params.cardId ? getCardPreview(actor, params.cardId) : Promise.resolve(null)]);

  if (!overview.hasSubjects) {
    return (
      <Container size="reading" className="pb-10">
        <PageHeader title="Flashcards" />
        <EmptyState
          icon={<BookOpen aria-hidden="true" />}
          title="Add a subject first"
          description="Your decks are built from the subjects you study."
          action={<ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>}
        />
      </Container>
    );
  }

  if (!overview.entitled) {
    return (
      <Container size="reading" className="pb-10">
        <PageHeader title="Flashcards" />
        <EmptyState
          icon={<Lock aria-hidden="true" />}
          title="Flashcards come with full access"
          description="Spaced-repetition flashcards bring back definitions, formulas and key facts just before you'd forget them."
          action={
            <>
              <UpgradeButton />
              <ButtonLink href="/app/practice" variant="outline">
                Practise now
              </ButtonLink>
            </>
          }
        />
      </Container>
    );
  }

  const { totals, newRemainingToday } = overview;
  const newToday = Math.min(totals.newAvailable, newRemainingToday);
  const focusSubject = params.subjectId ? overview.subjects.find((s) => s.subjectId === params.subjectId) : undefined;
  const focusTopic = params.topicId ? focusSubject?.topics.find((t) => t.topicId === params.topicId) : undefined;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        title="Flashcards"
        description={`Cards come back just before you're likely to forget them. Up to ${overview.newCardsPerDay} new cards a day.`}
        actions={
          <>
            {overview.reviewAllCount > 0 && <ButtonLink href={reviewHref()}>Review all ({overview.reviewAllCount})</ButtonLink>}
            <ButtonLink href={newCardHref(params.subjectId ? { subjectId: params.subjectId, topicId: params.topicId ?? null } : {})} variant="outline" iconStart={<Plus aria-hidden="true" />}>
              New card
            </ButtonLink>
            <ButtonLink href="/app/flashcards/mine" variant="ghost" iconStart={<Layers aria-hidden="true" />}>
              Your cards
            </ButtonLink>
          </>
        }
        className="pb-0"
      />

      {params.cardId && !preview && (
        <Alert tone="neutral" title="That card isn't available">
          It may have been removed, or it isn&rsquo;t part of your subjects or plan.
        </Alert>
      )}
      {preview && <CardPreviewPanel card={preview} now={now} />}

      {params.topicId && focusSubject && (
        <Alert
          tone="info"
          title={focusTopic ? `${focusTopic.name} flashcards` : `Flashcards for this topic in ${focusSubject.name}`}
          action={
            <ButtonLink href={reviewHref({ subjectId: focusSubject.subjectId, topicId: params.topicId })} size="sm">
              Review this topic
            </ButtonLink>
          }
        >
          {focusTopic
            ? `${focusTopic.counts.due} due, ${Math.min(focusTopic.counts.newAvailable, newRemainingToday)} new to learn today.`
            : "Review the cards of this topic, or add your own while you study it."}
        </Alert>
      )}

      <section aria-labelledby="flashcards-today" className="space-y-3">
        <h2 id="flashcards-today" className="sr-only">
          Today
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Due now" value={totals.due} hint={totals.due === 0 && overview.nextDueAt ? `Next ${dueInText(overview.nextDueAt, now)}` : undefined} />
          <StatTile label="New today" value={newToday} hint={`${overview.newStudiedToday} of ${overview.newCardsPerDay} started today`} />
          <StatTile label="Learning" value={totals.learning} />
          <StatTile label="Mature" value={totals.mature} hint="Remembered for 3+ weeks" />
        </div>
        {overview.reviewAllCount === 0 && (
          <p className="text-sm text-muted">
            You&rsquo;re all caught up{overview.nextDueAt ? `: your next card is due ${dueInText(overview.nextDueAt, now)}` : ""}.
            {newRemainingToday === 0 && totals.newAvailable > 0 ? " You've started today's new cards; more tomorrow." : ""}
          </p>
        )}
      </section>

      <DeckList subjects={overview.subjects} newRemainingToday={newRemainingToday} focusTopicId={params.topicId} upgradeHref={UPGRADE_PATH} />
    </Container>
  );
}
