import type { Metadata } from "next";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { requireRole } from "@/server/auth/guards";
import { getTestBuilderOptions } from "@/server/teaching/test-builder";
import { createTestAction } from "../actions";

export const metadata: Metadata = { title: "New test" };

/** Start a class test (§22): owner (school or own classes), subject and title; questions are added next. */
export default async function NewTestPage() {
  const actor = await requireRole("TEACHER", { next: "/teacher/assessments/new" });
  const options = await getTestBuilderOptions(actor);
  return (
    <Container size="reading" className="pb-10">
      <PageHeader breadcrumbs={[{ label: "Tests", href: "/teacher/assessments" }, { label: "New test" }]} title="New test" description="Name the test, then add questions from the bank or write your own." />
      <Card>
        <CardBody>
          <ActionForm action={createTestAction} submitLabel="Create draft" pendingLabel="Creating…">
            <AdminField name="title" label="Title" required maxLength={200} placeholder="e.g. Week 3 algebra quiz" />
            <AdminField
              name="owner"
              label="For"
              type="select"
              required
              defaultValue={options.owners[0]?.key}
              options={options.owners.map((o) => ({ value: o.key, label: o.label }))}
              hint="A school's tests are shared with its teachers and can be set to its classes."
            />
            <AdminField
              name="subjectId"
              label="Subject"
              type="select"
              required
              placeholder="Choose a subject"
              options={options.subjects.map((s) => ({ value: s.id, label: `${s.name} (${s.qualificationLabel})` }))}
            />
            <AdminField
              name="kind"
              label="Kind"
              type="select"
              defaultValue="QUIZ"
              options={[
                { value: "QUIZ", label: "Quiz" },
                { value: "TOPIC_TEST", label: "Topic test" },
                { value: "CHAPTER_TEST", label: "Chapter test" },
                { value: "SUBJECT_TEST", label: "Subject test" },
              ]}
            />
            <AdminField name="timeLimitMinutes" label="Time limit (minutes)" type="number" optional min={5} max={240} />
          </ActionForm>
        </CardBody>
      </Card>
    </Container>
  );
}
