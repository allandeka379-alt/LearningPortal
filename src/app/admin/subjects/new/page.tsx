import { redirect } from "next/navigation";
import { AdminSection } from "@/components/admin/DetailParts";
import { SubjectForm } from "@/components/admin/curriculum/CatalogueForms";
import { sourceOptions } from "@/components/admin/curriculum/labels";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { curriculumAccess, getCatalogueOptions } from "@/server/cms/curriculum";
import { createSubjectAction } from "../actions";

export const metadata = { title: "New subject" };

/** /admin/subjects/new — ADMIN+ (`?qualificationId=` preselects the qualification). */
export default async function NewSubjectPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/subjects/new" });
  if (!curriculumAccess(actor).canAdmin) redirect("/admin/subjects");
  const params = await searchParams;
  const options = await getCatalogueOptions(actor);
  return (
    <Container size="wide">
      <PageHeader
        title="New subject"
        breadcrumbs={[{ label: "Subjects", href: "/admin/subjects" }, { label: "New" }]}
        description="Copy the name and code exactly from the board's official subject list, and record that list as the source to verify it."
      />
      <AdminSection title="Subject details">
        <SubjectForm
          action={createSubjectAction}
          values={{ qualificationId: firstParam(params, "qualificationId"), catalogueStatus: "HIDDEN" }}
          qualifications={options.qualifications.map((q) => ({ value: q.id, label: `${q.boardShortName} ${q.name}` }))}
          categories={options.categories.map((c) => ({ value: c.id, label: c.name }))}
          sources={sourceOptions(options.sources)}
          live={false}
          publicPrefix="/<board>/<qualification>/"
          cancelHref="/admin/subjects"
          submitLabel="Create subject"
        />
      </AdminSection>
    </Container>
  );
}
