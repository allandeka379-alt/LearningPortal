import { Layers, Pencil, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DeleteCardButton, RestoreCardButton } from "@/components/flashcards/CardRowActions";
import { dueInText } from "@/components/flashcards/copy";
import { CARD_TYPE_LABELS } from "@/components/flashcards/types";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { listPersonalCards, listSuspendedCards } from "@/server/flashcards/service";
import { uuidParam, type SearchParams } from "../_lib/params";
import { deletePersonalCardAction, restoreCardAction } from "../actions";

export const metadata: Metadata = { title: "Your flashcards" };

const PAGE_SIZE = 20;

function pageHref(cursor: string | null, hiddenCursor: string | null): string {
  const query = new URLSearchParams();
  if (cursor) query.set("cursor", cursor);
  if (hiddenCursor) query.set("hidden", hiddenCursor);
  const qs = query.toString();
  return qs ? `/app/flashcards/mine?${qs}` : "/app/flashcards/mine";
}

/**
 * The student's own flashcards (§18; private to them) with edit and delete, and the cards they hid from their reviews
 * (suspended platform or own cards) with "Restore". Both lists page with cursors.
 */
export default async function YourFlashcardsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const actor = await requireOnboardedStudent({ next: "/app/flashcards/mine" });
  const params = await searchParams;
  const cursor = uuidParam(params, "cursor") ?? null;
  const hiddenCursor = uuidParam(params, "hidden") ?? null;
  const now = new Date();
  const [own, hidden] = await Promise.all([
    listPersonalCards(actor, { limit: PAGE_SIZE, ...(cursor ? { cursor } : {}) }),
    listSuspendedCards(actor, { limit: PAGE_SIZE, ...(hiddenCursor ? { cursor: hiddenCursor } : {}) }),
  ]);

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        title="Your cards"
        breadcrumbs={[{ label: "Flashcards", href: "/app/flashcards" }, { label: "Your cards" }]}
        description="Cards you wrote yourself are private to you."
        actions={
          <ButtonLink href="/app/flashcards/new" iconStart={<Plus aria-hidden="true" />}>
            New card
          </ButtonLink>
        }
        className="pb-0"
      />

      <section aria-labelledby="own-cards" className="space-y-3">
        <h2 id="own-cards" className="text-lg font-semibold text-text">
          Cards you wrote
        </h2>
        {own.items.length === 0 ? (
          <EmptyState
            icon={<Layers aria-hidden="true" />}
            title={cursor ? "No more cards" : "You haven't written any cards yet"}
            description="Turn a definition, formula or date you keep forgetting into a card of your own."
            titleAs="p"
            action={<ButtonLink href="/app/flashcards/new">Write a card</ButtonLink>}
          />
        ) : (
          <ul className="space-y-3">
            {own.items.map((item) => (
              <li key={item.id}>
                <Card>
                  <CardHeader
                    title={[item.subjectName, item.topicName].filter(Boolean).join(" · ")}
                    titleAs="h3"
                    description={
                      item.suspended
                        ? "Hidden from your reviews"
                        : item.dueAt
                          ? new Date(item.dueAt).getTime() <= now.getTime()
                            ? "Due for review now"
                            : `Next review ${dueInText(item.dueAt, now)}`
                          : "Not studied yet"
                    }
                    action={<Badge size="sm">{CARD_TYPE_LABELS[item.cardType]}</Badge>}
                  />
                  <CardBody className="space-y-3">
                    <RichContent html={item.frontHtml} />
                    <details>
                      <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-primary">Show answer</summary>
                      <div className="mt-2 border-t border-dashed border-border pt-3">
                        <RichContent html={item.backHtml} />
                      </div>
                    </details>
                    <div className="flex flex-wrap items-center gap-2">
                      <ButtonLink href={`/app/flashcards/${item.id}/edit`} variant="outline" size="sm" iconStart={<Pencil aria-hidden="true" />}>
                        Edit
                      </ButtonLink>
                      <DeleteCardButton cardId={item.id} label="this card" action={deletePersonalCardAction} />
                    </div>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        )}
        {(cursor || own.nextCursor) && (
          <nav aria-label="Your cards pages" className="flex flex-wrap gap-3 text-sm">
            {cursor && (
              <Link href={pageHref(null, hiddenCursor)} className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline">
                Newest cards
              </Link>
            )}
            {own.nextCursor && (
              <Link href={pageHref(own.nextCursor, hiddenCursor)} className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline">
                Older cards
              </Link>
            )}
          </nav>
        )}
      </section>

      <section aria-labelledby="hidden-cards" className="space-y-3">
        <h2 id="hidden-cards" className="text-lg font-semibold text-text">
          Hidden from your reviews
        </h2>
        {hidden.items.length === 0 ? (
          <p className="text-sm text-muted">No hidden cards. Use &ldquo;Hide this card&rdquo; during a review to stop seeing a card you already know.</p>
        ) : (
          <ul className="divide-y divide-border rounded-card border border-border bg-surface">
            {hidden.items.map((item) => (
              <li key={item.flashcardId} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <p className="text-sm text-muted">
                    {item.subjectName} · {CARD_TYPE_LABELS[item.cardType]}
                    {item.isPersonal ? " · your card" : ""}
                  </p>
                  <RichContent html={item.frontHtml} />
                </div>
                <RestoreCardButton cardId={item.flashcardId} label="this card" action={restoreCardAction} />
              </li>
            ))}
          </ul>
        )}
        {(hiddenCursor || hidden.nextCursor) && (
          <nav aria-label="Hidden cards pages" className="flex flex-wrap gap-3 text-sm">
            {hiddenCursor && (
              <Link href={pageHref(cursor, null)} className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline">
                First hidden cards
              </Link>
            )}
            {hidden.nextCursor && (
              <Link href={pageHref(cursor, hidden.nextCursor)} className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline">
                More hidden cards
              </Link>
            )}
          </nav>
        )}
      </section>
    </Container>
  );
}
