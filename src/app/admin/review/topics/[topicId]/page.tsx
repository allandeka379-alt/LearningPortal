import { ClipboardCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { AdminSection } from "@/components/admin/DetailParts";
import { ContentWorkflowBar } from "@/components/admin/editor/ContentWorkflowBar";
import { requireAdminPage } from "@/components/admin/guards";
import { ItemBadges, ItemBody } from "@/components/admin/review/TopicItems";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatNumber } from "@/lib/format";
import { CONTENT_TYPE_LABELS, reviewHref } from "@/server/cms/review/labels";
import { reviewCapabilities } from "@/server/cms/review/service";
import { getTopicReview, TOPIC_PAGE_LIMIT, type ReviewableEntity, type TopicReviewItem } from "@/server/cms/review/topics";
import { orNotFound } from "../../_lib/load";
import { approveAction, publishAction, requestChangesAction } from "../../actions";
import { publishTopicAction } from "../actions";

export const metadata = { title: "Review topic" };

const SECTIONS: readonly ReviewableEntity[] = ["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT"];

/**
 * /admin/review/topics/[topicId] — everything waiting for review in one topic subtree, rendered in full (§41, §42):
 * per-item approve / request changes / publish, and "Approve and publish all items on this page" (four-eyes, audited,
 * only the items listed here). Approving AI-written content is a statement that a person checked it.
 */
export default async function TopicReviewPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params;
  const actor = await requireAdminPage("content.review", { next: `/admin/review/topics/${topicId}` });
  const review = await orNotFound(getTopicReview(actor, topicId));
  const capabilities = reviewCapabilities(actor);
  const { topic, items } = review;
  const byType = new Map<ReviewableEntity, TopicReviewItem[]>(SECTIONS.map((type) => [type, items.filter((item) => item.entityType === type)]));
  const publishable = items.filter((item) => !(item.isOwnWork && review.fourEyes));
  const ownWork = items.length - publishable.length;

  return (
    <Container size="wide">
      <PageHeader
        title={`${topic.code ? `${topic.code} ` : ""}${topic.name}`}
        eyebrow={`${topic.syllabusTitle} · ${topic.versionLabel}`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Review queue", href: "/admin/review" },
          { label: "By topic", href: "/admin/review/topics" },
          { label: topic.syllabusTitle, href: `/admin/review/topics?syllabus=${topic.syllabusId}` },
          ...review.breadcrumbs.map((crumb) => ({ label: `${crumb.code ? `${crumb.code} ` : ""}${crumb.name}`, href: `/admin/review/topics/${crumb.id}` })),
          { label: topic.name },
        ]}
        description={`${formatNumber(items.length)} item${items.length === 1 ? "" : "s"} waiting for review or publication in this topic and its subtopics.`}
      />
      <div className="space-y-6 pb-12">
        {review.truncated && (
          <Alert tone="warning" title="Only the first items are shown">
            More than {formatNumber(TOPIC_PAGE_LIMIT)} items wait in this topic. Review a subtopic at a time to see them all.
          </Alert>
        )}
        {items.length === 0 ? (
          <EmptyState icon={<ClipboardCheck aria-hidden="true" />} title="Nothing in this topic is waiting for review" />
        ) : (
          <>
            <Alert tone="info" title="How to review">
              <ul className="list-disc space-y-0.5 pl-5">
                <li>Solve every question yourself before reading the answer; check each distractor is wrong and the marking accepts every correct form.</li>
                <li>Check facts, units, notation and spelling (British English), and that the item fits the topic and level.</li>
                <li>Check the wording is original: no text copied from textbooks, past papers or mark schemes.</li>
                <li>Send anything you are not sure about back with a note; it is fixed in the content files and imported again.</li>
              </ul>
            </Alert>

            {SECTIONS.map((type) => {
              const list = byType.get(type) ?? [];
              if (list.length === 0) return null;
              return (
                <AdminSection key={type} title={`${CONTENT_TYPE_LABELS[type].plural} (${formatNumber(list.length)})`}>
                  <ol className="space-y-6">
                    {list.map((item, index) => (
                      <li key={item.id} className="space-y-3 rounded-card border border-border p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="min-w-0 text-base font-semibold text-text">
                            {index + 1}. {item.title}
                          </h3>
                          <ItemBadges item={item} />
                        </div>
                        {item.externalRef && <p className="font-mono text-xs break-all text-muted">{item.externalRef}</p>}
                        <ItemBody item={item} />
                        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
                          <ContentWorkflowBar
                            entityType={item.entityType}
                            id={item.id}
                            status={item.status}
                            draftOfId={item.draftOfId}
                            aiGenerated={item.aiGenerated}
                            isOwnWork={item.isOwnWork}
                            fourEyes={review.fourEyes}
                            capabilities={{ ...capabilities, canArchive: false, canDraft: false }}
                            itemLabel={`this ${CONTENT_TYPE_LABELS[item.entityType].singular.toLowerCase()}`}
                            actions={{ approve: approveAction, requestChanges: requestChangesAction, publish: publishAction }}
                          />
                          <Link
                            href={reviewHref(item.entityType, item.id)}
                            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                          >
                            Changes and history <ExternalLink aria-hidden="true" className="size-4" />
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ol>
                </AdminSection>
              );
            })}

            {capabilities.canReview && capabilities.canPublish && (
              <AdminSection
                title="Approve and publish everything above"
                description="Only the items listed on this page are approved and published, in order (questions first, so tests can use them). Each approval records your note."
              >
                {publishable.length === 0 ? (
                  <p className="text-sm text-muted">Every item here is your own work: another editor must approve it.</p>
                ) : (
                  <ActionForm
                    action={publishTopicAction}
                    hiddenFields={{ topicId: topic.id, items: publishable.map((item) => `${item.entityType}:${item.id}`).join(",") }}
                    submitLabel={`Approve and publish ${formatNumber(publishable.length)} item${publishable.length === 1 ? "" : "s"}`}
                    pendingLabel="Publishing…"
                  >
                    {ownWork > 0 && (
                      <p className="text-sm text-muted">
                        {ownWork} item{ownWork === 1 ? " is" : "s are"} your own work and will be left for another reviewer.
                      </p>
                    )}
                    <AdminField
                      name="notes"
                      label="What did you check?"
                      type="textarea"
                      rows={3}
                      required
                      maxLength={2000}
                      hint="Recorded with every approval, e.g. “Solved every question; checked answers, units, notation and originality.”"
                    />
                    <AdminField
                      name="confirmed"
                      label="I have read every item on this page and I am satisfied it is accurate, original and suitable for students."
                      type="checkbox"
                    />
                  </ActionForm>
                )}
              </AdminSection>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
