import { redirect } from "next/navigation";
import { AdminSection } from "@/components/admin/DetailParts";
import { GradeSchemeForm } from "@/components/admin/curriculum/GradeSchemeForm";
import { sourceOptions } from "@/components/admin/curriculum/labels";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { curriculumAccess, getCatalogueOptions } from "@/server/cms/curriculum";
import { createGradeSchemeAction } from "../actions";

export const metadata = { title: "New grade scheme" };

/** /admin/grade-schemes/new — editors draft inactive schemes; admins may create live ones. */
export default async function NewGradeSchemePage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/grade-schemes/new" });
  const access = curriculumAccess(actor);
  if (!access.canDraft) redirect("/admin/grade-schemes");
  const params = await searchParams;
  const options = await getCatalogueOptions(actor);
  return (
    <Container size="wide">
      <PageHeader
        title="New grade scheme"
        breadcrumbs={[{ label: "Grade schemes", href: "/admin/grade-schemes" }, { label: "New" }]}
        description="Grades from these bands are always shown as estimates with the caveat below."
      />
      <AdminSection title="Scheme">
        <GradeSchemeForm
          action={createGradeSchemeAction}
          values={{ qualificationId: firstParam(params, "qualificationId") }}
          qualifications={options.qualifications.map((q) => ({ value: q.id, label: `${q.boardShortName} ${q.name}` }))}
          sources={sourceOptions(options.sources)}
          canEditLive={access.canAdmin}
          frozen={false}
          cancelHref="/admin/grade-schemes"
          submitLabel="Create scheme"
        />
      </AdminSection>
    </Container>
  );
}
