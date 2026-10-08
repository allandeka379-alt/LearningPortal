import { requireAdminPage } from "@/components/admin/guards";
import { QUESTION_TYPE_HINTS, QUESTION_TYPE_LABELS } from "@/components/admin/questions/labels";
import { newDocument } from "@/components/admin/questions/model";
import { QuestionEditor } from "@/components/admin/questions/QuestionEditor";
import { enumParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { QUESTION_TYPES } from "@/lib/questions/constants";
import { getCurriculumOptions, getMediaOptions, getSourceOptions, getSubjectContentOptions } from "@/server/cms/questions/lookups";
import { createQuestionAction, loadSubjectOptionsAction, previewMarkdownAction } from "../actions";

export const metadata = { title: "New question" };

/** /admin/questions/new — choose the home subject and the §9 type, then write the question. */
export default async function NewQuestionPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/questions/new" });
  const params = await searchParams;
  const type = enumParam(params, "type", QUESTION_TYPES);
  const subjectId = uuidParam(params, "subject");
  const curriculum = await getCurriculumOptions(actor, { selectedSubjectIds: [subjectId] });
  const subject = curriculum.subjects.find((s) => s.value === subjectId);
  const breadcrumbs = [{ label: "Questions", href: "/admin/questions" }, { label: "New question" }];

  if (!type || !subject) {
    return (
      <Container size="wide">
        <PageHeader title="New question" breadcrumbs={breadcrumbs} description="Choose the home subject and the question type. Write original questions only: never copy past papers or textbooks (§27)." />
        {curriculum.subjects.length === 0 ? (
          <p className="text-muted">Add a subject in the curriculum first.</p>
        ) : (
          <form method="get" action="/admin/questions/new" className="space-y-6">
            <Field label="Home subject" className="max-w-xl">
              <Select name="subject" required defaultValue={subjectId ?? ""} placeholder="Choose a subject" options={curriculum.subjects} />
            </Field>
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-text">Question type</legend>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {QUESTION_TYPES.map((value) => (
                  <Card key={value} as="div" className="has-checked:border-primary has-checked:bg-primary-soft">
                    <CardBody className="p-0 sm:p-0">
                      <label className="flex min-h-11 cursor-pointer gap-3 p-4">
                        <input type="radio" name="type" value={value} required defaultChecked={value === (type ?? "MULTIPLE_CHOICE")} className="mt-1 size-5 accent-primary" />
                        <span>
                          <span className="block font-semibold text-text">{QUESTION_TYPE_LABELS[value]}</span>
                          <span className="mt-0.5 block text-sm text-muted">{QUESTION_TYPE_HINTS[value]}</span>
                        </span>
                      </label>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </fieldset>
            <Button type="submit">Continue</Button>
          </form>
        )}
      </Container>
    );
  }

  const [content, sources, media] = await Promise.all([
    getSubjectContentOptions(actor, { subjectId: subject.value }),
    getSourceOptions(),
    getMediaOptions(["DIAGRAM", "CONTENT_IMAGE"]),
  ]);
  return (
    <Container size="wide">
      <PageHeader title={`New ${QUESTION_TYPE_LABELS[type].toLowerCase()} question`} eyebrow={subject.label} breadcrumbs={breadcrumbs} description="Saved as a draft. Nothing is visible to students until it is reviewed, approved and published." />
      <div className="pb-10">
        <QuestionEditor
          mode="create"
          initial={newDocument(type, subject.value)}
          subjects={curriculum.subjects}
          content={content}
          sources={sources}
          media={media}
          saveAction={createQuestionAction}
          previewAction={previewMarkdownAction}
          loadSubjectAction={loadSubjectOptionsAction}
        />
      </div>
    </Container>
  );
}
