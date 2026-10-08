import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ConversationList } from "@/components/tutor/ConversationList";
import { AI_DISCLAIMER } from "@/components/tutor/labels";
import { QuotaIndicator, TutorAvailabilityNotice } from "@/components/tutor/TutorNotices";
import { ButtonLink } from "@/components/ui/Button";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { getTutorStatus, listConversations } from "@/server/tutor";
import { archiveConversationAction } from "./actions";
import { availabilityOf } from "./_lib/availability";

export const metadata: Metadata = { title: "AI tutor" };

/**
 * AI tutor home (§14): today's allowance, a calm notice when the tutor is unavailable, and the student's private
 * conversations (newest first, cursor-paginated).
 */
export default async function TutorHomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the whole area is a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireOnboardedStudent({ next: "/app/tutor" });
  const { cursor } = await searchParams;
  const pageCursor = typeof cursor === "string" ? cursor : null;
  const [status, page] = await Promise.all([
    getTutorStatus(actor),
    listConversations(actor, { cursor: pageCursor, limit: 20 }).catch((error: unknown) => {
      // A tampered or stale cursor shows the first page instead of an error.
      if (isAppError(error) && error.code === "VALIDATION") return listConversations(actor, { limit: 20 });
      throw error;
    }),
  ]);
  const availability = availabilityOf(status);

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        title="AI tutor"
        description="Ask about anything you're studying. The tutor explains step by step and gives hints before answers."
        actions={
          availability === "ready" ? (
            <ButtonLink href="/app/tutor/new" iconStart={<Plus aria-hidden="true" />}>
              New conversation
            </ButtonLink>
          ) : undefined
        }
      />
      <div className="space-y-4">
        <TutorAvailabilityNotice availability={availability} upgradeHref={status.upgradeHref} />
        {availability === "ready" && <QuotaIndicator quota={status.quota} upgradeHref={status.upgradeHref} />}
        <p className="text-xs text-muted">{AI_DISCLAIMER} Your conversations are private to you.</p>
        <ConversationList
          items={page.items}
          timeZone={actor.timeZone}
          archiveAction={archiveConversationAction}
          newHref="/app/tutor/new"
          emptyState={pageCursor === null}
        />
        {page.nextCursor && (
          <div className="flex justify-center">
            <ButtonLink href={`/app/tutor?cursor=${encodeURIComponent(page.nextCursor)}`} variant="outline">
              Older conversations
            </ButtonLink>
          </div>
        )}
      </div>
    </Container>
  );
}
