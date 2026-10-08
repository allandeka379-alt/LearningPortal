import { Shuffle } from "lucide-react";
import { notFound } from "next/navigation";
import { RichContent } from "@/components/content/RichContent";
import { AdminSection } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { LinkButton } from "@/components/admin/questions/ContentPanels";
import { ASSESSMENT_KIND_LABELS } from "@/components/admin/questions/labels";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { ContentStatusBadge } from "@/components/admin/StatusBadge";
import { QuestionView } from "@/components/questions/QuestionView";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { isAppError } from "@/server/lib/errors";
import { getAssessmentPreview } from "@/server/cms/assessments/service";

export const metadata = { title: "Assessment preview" };

/**
 * /admin/exams/[id]/preview — the assessment as a student sees it in exam mode (§13), read-only. Blueprint rules draw
 * a seeded sample; "Draw another sample" shows a different draw.
 */
export default async function AssessmentPreviewPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PageSearchParams> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/exams/${id}/preview` });
  const query = await searchParams;
  const seed = firstParam(query, "sample")?.replace(/[^0-9]/g, "").slice(0, 6) || "1";
  let preview;
  try {
    preview = await getAssessmentPreview(actor, id, seed);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  const sampled = preview.assembly !== "FIXED";

  return (
    <Container>
      <PageHeader
        title={preview.title}
        eyebrow={`Student preview · ${ASSESSMENT_KIND_LABELS[preview.kind]}`}
        breadcrumbs={[
          { label: "Exams", href: "/admin/exams" },
          { label: preview.title, href: `/admin/exams/${id}` },
          { label: "Preview" },
        ]}
        actions={
          sampled ? (
            <LinkButton href={`/admin/exams/${id}/preview?sample=${Number(seed) + 1}`}>
              <Shuffle aria-hidden="true" className="size-4" /> Draw another sample
            </LinkButton>
          ) : undefined
        }
      />
      <div className="space-y-6 pb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <ContentStatusBadge status={preview.status} />
          <span>{preview.totals.exact ? `${preview.totals.total} marks` : `at least ${preview.totals.total} marks`}</span>
          <span>{preview.timeLimitMinutes ? `${preview.timeLimitMinutes} minutes` : "Untimed"}</span>
        </div>
        {sampled && (
          <Alert tone="info" title="Sample draw">
            Each attempt draws its own questions from the published bank by the blueprint rules. This is one possible paper (sample {seed}).
          </Alert>
        )}
        {preview.instructionsHtml && (
          <AdminSection title="Instructions">
            <RichContent html={preview.instructionsHtml} />
          </AdminSection>
        )}
        {preview.sections.map((section, s) => (
          <AdminSection
            key={s}
            title={section.title}
            description={[
              section.timeLimitMinutes ? `${section.timeLimitMinutes} minutes` : null,
              section.answerCount ? `Answer any ${section.answerCount}` : null,
              section.marks !== null ? `${section.marks} marks` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          >
            <div className="space-y-8">
              {section.instructionsHtml && <RichContent html={section.instructionsHtml} />}
              {section.shortfall > 0 && (
                <Alert tone="warning">
                  The rules could not draw {section.shortfall} {section.shortfall === 1 ? "question" : "questions"} for this sample: the published bank is too small.
                </Alert>
              )}
              {section.questions.length === 0 && <p className="text-sm text-muted">No questions in this section.</p>}
              {section.questions.map((item) =>
                item.question ? (
                  <QuestionView
                    key={`${item.number}-${item.question.id}`}
                    question={item.question}
                    mode="exam"
                    response={null}
                    disabled
                    heading={`Question ${item.label ?? item.number}${item.drawn ? " (drawn)" : ""}`}
                  />
                ) : (
                  <Alert key={item.number} tone="warning">
                    Question {item.number} cannot be shown: its definition is incomplete.
                  </Alert>
                ),
              )}
            </div>
          </AdminSection>
        ))}
      </div>
    </Container>
  );
}
