import { redirect } from "next/navigation";
import { AdminSection } from "@/components/admin/DetailParts";
import { ExamSessionForm } from "@/components/admin/curriculum/ExamSessionForm";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { curriculumAccess, getCatalogueOptions } from "@/server/cms/curriculum";
import { createExamSessionAction } from "../actions";

export const metadata = { title: "New exam session" };

/** /admin/exam-sessions/new — editors create DRAFT sessions with provisional dates. */
export default async function NewExamSessionPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/exam-sessions/new" });
  if (!curriculumAccess(actor).canDraft) redirect("/admin/exam-sessions");
  const params = await searchParams;
  const options = await getCatalogueOptions(actor);
  return (
    <Container size="wide">
      <PageHeader
        title="New exam session"
        breadcrumbs={[{ label: "Exam sessions", href: "/admin/exam-sessions" }, { label: "New" }]}
        description="New sessions start as drafts with provisional dates. An admin publishes them and confirms the dates against the official timetable."
      />
      <AdminSection title="Session">
        <ExamSessionForm
          action={createExamSessionAction}
          values={{ qualificationId: firstParam(params, "qualificationId") }}
          qualifications={options.qualifications.map((q) => ({ value: q.id, label: `${q.boardShortName} ${q.name}` }))}
          cancelHref="/admin/exam-sessions"
          submitLabel="Create draft session"
        />
      </AdminSection>
    </Container>
  );
}
