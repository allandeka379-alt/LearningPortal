import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { randomUUID } from "node:crypto";
import { CircleCheck, Lock, SearchX } from "lucide-react";
import type { Metadata } from "next";
import { reportProblemAction } from "@/app/app/_actions/report-problem";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { dueInText, newCardHref } from "@/components/flashcards/copy";
import { ReviewSession } from "@/components/flashcards/ReviewSession";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCount } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { getDueQueue, type DueQueueView } from "@/server/flashcards/service";
import { isAppError } from "@/server/lib/errors";
import { parseDeckParams, type SearchParams } from "../_lib/params";
import { reviewCardAction, suspendCardAction } from "../actions";

export const metadata: Metadata = { title: "Review flashcards" };

const BREADCRUMBS = [{ label: "Flashcards", href: "/app/flashcards" }, { label: "Review" }];

/**
 * A review session (§18; ARCHITECTURE §3.3 `/app/flashcards/review`): the due queue for every subject, one subject
 * (`?subjectId=`) or one topic subtree (`?topicId=`, as linked from the dashboard and the study plan), due cards first
 * and then today's new cards. Card faces are rendered on the server; the session itself runs in the browser.
 */
export default async function FlashcardReviewPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const actor = await requireOnboardedStudent({ next: "/app/flashcards/review" });
  const params = parseDeckParams(await searchParams);
  const now = new Date();

  let queue: DueQueueView;
  try {
    queue = await getDueQueue(actor, { ...(params.subjectId ? { subjectId: params.subjectId } : {}), ...(params.topicId ? { topicId: params.topicId } : {}) }, now);
  } catch (error) {
    if (!isAppError(error) || error.code !== "NOT_FOUND") throw error;
    return (
      <Container size="reading" className="pb-10">
        <PageHeader title="Review" breadcrumbs={BREADCRUMBS} />
        <EmptyState
          icon={<SearchX aria-hidden="true" />}
          title="This deck isn't available"
          description={error.message}
          action={<ButtonLink href="/app/flashcards">Back to flashcards</ButtonLink>}
        />
      </Container>
    );
  }

  const scopeLabel = queue.scope.topicName ?? queue.scope.subjectName ?? "All subjects";

  if (!queue.entitled) {
    return (
      <Container size="reading" className="pb-10">
        <PageHeader title="Review" eyebrow={scopeLabel} breadcrumbs={BREADCRUMBS} />
        <EmptyState
          icon={<Lock aria-hidden="true" />}
          title="Flashcards come with full access"
          description="Spaced-repetition flashcards bring back definitions, formulas and key facts just before you'd forget them."
          action={<UpgradeButton />}
        />
      </Container>
    );
  }

  if (queue.cards.length === 0) {
    const reason =
      queue.newAvailable > 0 && queue.newRemainingToday === 0
        ? "You've started today's new cards. More tomorrow."
        : queue.newAvailable === 0 && queue.dueTotal === 0 && !queue.nextDueAt
          ? "There are no cards here yet. Write your own while you study."
          : null;
    return (
      <Container size="reading" className="pb-10">
        <PageHeader title="Review" eyebrow={scopeLabel} breadcrumbs={BREADCRUMBS} />
        <EmptyState
          icon={<CircleCheck aria-hidden="true" />}
          title="You're all caught up"
          description={[queue.nextDueAt ? `Your next card is due ${dueInText(queue.nextDueAt, now)}.` : null, reason].filter(Boolean).join(" ")}
          action={
            <>
              <ButtonLink href="/app/flashcards">Back to flashcards</ButtonLink>
              <ButtonLink href={newCardHref({ subjectId: queue.scope.subjectId, topicId: queue.scope.topicId })} variant="outline">
                Add your own card
              </ButtonLink>
            </>
          }
        />
      </Container>
    );
  }

  const fresh = queue.cards.filter((c) => c.isNew).length;
  const due = queue.cards.length - fresh;
  return (
    <Container size="reading" className="space-y-4 pb-10">
      <PageHeader
        title="Review"
        eyebrow={scopeLabel}
        breadcrumbs={BREADCRUMBS}
        description={[due > 0 ? `${due} due` : null, fresh > 0 ? `${formatCount(fresh, "new card")}` : null].filter(Boolean).join(" · ")}
        className="pb-0"
      />
      <ReviewSession
        key={randomUUID()}
        cards={queue.cards}
        reviewAction={reviewCardAction}
        suspendAction={suspendCardAction}
        reportAction={reportProblemAction}
        backHref="/app/flashcards"
        upgradeHref={UPGRADE_PATH}
      />
    </Container>
  );
}
