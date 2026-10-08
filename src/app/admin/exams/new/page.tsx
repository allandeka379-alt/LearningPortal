import { requireAdminPage } from "@/components/admin/guards";
import { AssessmentSettingsForm } from "@/components/admin/questions/assessments/AssessmentSettingsForm";
import { enumParam, uuidParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { AssessmentKind } from "@/generated/prisma/enums";
import { getAssessmentBuilderOptions } from "@/server/cms/assessments/service";
import { getCurriculumOptions, getSourceOptions, getSyllabusOptions } from "@/server/cms/questions/lookups";
import { createAssessmentAction } from "../actions";

export const metadata = { title: "New assessment" };

/** /admin/exams/new — pick the subject, then the settings; sections and questions follow on the next page. */
export default async function NewAssessmentPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.draft", { next: "/admin/exams/new" });
  const params = await searchParams;
  const subjectId = uuidParam(params, "subject");
  const curriculum = await getCurriculumOptions(actor, { selectedSubjectIds: [subjectId] });
  const subject = curriculum.subjects.find((s) => s.value === subjectId);
  const kind = enumParam(params, "kind", Object.values(AssessmentKind)) ?? "TOPIC_TEST";
  const breadcrumbs = [{ label: "Exams", href: "/admin/exams" }, { label: "New assessment" }];

  if (!subject) {
    return (
      <Container>
        <PageHeader title="New assessment" breadcrumbs={breadcrumbs} description="Assessments belong to one subject. Choose it first." />
        <Card>
          <CardBody>
            <form method="get" action="/admin/exams/new" className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <input type="hidden" name="kind" value={kind} />
              <Field label="Subject" className="sm:flex-1">
                <Select name="subject" required placeholder="Choose a subject" options={curriculum.subjects} defaultValue="" />
              </Field>
              <Button type="submit">Continue</Button>
            </form>
          </CardBody>
        </Card>
      </Container>
    );
  }

  const syllabi = await getSyllabusOptions([subject.value]);
  const [options, sources] = await Promise.all([
    getAssessmentBuilderOptions(actor, { qualificationId: subject.qualificationId, syllabusIds: syllabi.map((s) => s.value) }),
    getSourceOptions(),
  ]);
  const current = syllabi.find((s) => s.status === "CURRENT") ?? syllabi[0];

  return (
    <Container>
      <PageHeader title="New assessment" eyebrow={subject.label} breadcrumbs={breadcrumbs} description="Saved as a draft with one empty section. Add questions and rules next." />
      <Card>
        <CardBody>
          <AssessmentSettingsForm
            action={createAssessmentAction}
            submitLabel="Create draft"
            hiddenFields={{ subjectId: subject.value }}
            values={{
              kind,
              assembly: "FIXED",
              subjectId: subject.value,
              syllabusId: current?.value ?? null,
              title: "",
              feedbackTiming: kind === "QUIZ" || kind === "TOPIC_TEST" ? "IMMEDIATE" : "AFTER_SUBMIT",
              allowNavigation: true,
              accessTier: "PREMIUM",
              copyrightStatus: "OWNED",
            }}
            syllabi={syllabi}
            routes={options.routes}
            gradeSchemes={options.gradeSchemes}
            sources={sources}
            topics={[]}
          />
        </CardBody>
      </Card>
    </Container>
  );
}
