import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { requireAdminPage } from "@/components/admin/guards";
import { LESSON_KIND_OPTIONS } from "@/components/admin/editor/options";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { subjectOptions } from "@/server/cms/review/taxonomy";
import { createLessonAction } from "../actions";

export const metadata = { title: "New lesson" };

/** /admin/lessons/new — start a DRAFT lesson; the editor opens next. */
export default async function NewLessonPage() {
  const actor = await requireAdminPage("content.draft", { next: "/admin/lessons/new" });
  const subjects = await subjectOptions(actor);
  return (
    <Container size="reading">
      <PageHeader
        title="New lesson"
        description="Start with a title and the home subject. You write the content, tag topics and add licensing in the editor."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Lessons", href: "/admin/lessons" },
          { label: "New lesson" },
        ]}
      />
      <Card>
        <CardBody>
          <ActionForm action={createLessonAction} submitLabel="Create draft" pendingLabel="Creating…" secondaryActions={<ButtonLink href="/admin/lessons" variant="ghost">Cancel</ButtonLink>}>
            <AdminField name="title" label="Title" required maxLength={200} />
            <AdminField name="kind" label="Kind" type="select" options={LESSON_KIND_OPTIONS} defaultValue="LESSON" />
            <AdminField
              name="subjectId"
              label="Home subject"
              type="select"
              options={subjects}
              placeholder="General (articles and study guides only)"
              hint="Where the lesson is authored. Tag topics of other boards or syllabus versions in the editor to reuse it."
            />
          </ActionForm>
        </CardBody>
      </Card>
    </Container>
  );
}
