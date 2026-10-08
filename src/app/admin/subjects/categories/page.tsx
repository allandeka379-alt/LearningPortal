import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection } from "@/components/admin/DetailParts";
import { CategoryForm } from "@/components/admin/curriculum/CatalogueForms";
import { ActiveBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav, ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { EditableList } from "@/components/admin/curriculum/EditableList";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, listCategories } from "@/server/cms/curriculum";
import { createCategoryAction, updateCategoryAction } from "../actions";

export const metadata = { title: "Subject categories" };

/** /admin/subjects/categories — §4 groups (Mathematics, Sciences, Commercials, …), shared by every board. */
export default async function CategoriesPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/subjects/categories" });
  const params = await searchParams;
  const q = firstParam(params, "q");
  const page = await listCategories(actor, { q, cursor: firstParam(params, "cursor") });
  const { canAdmin } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Subject categories"
        breadcrumbs={[{ label: "Subjects", href: "/admin/subjects" }, { label: "Categories" }]}
        description="Categories group subjects in onboarding and on public pages, across boards."
      />
      <CurriculumSubnav active="categories" />
      {!canAdmin && <ReadOnlyNotice />}
      <div className="space-y-6">
        <div>
          <FilterBar action="/admin/subjects/categories" search={{ label: "Search categories", value: q }} />
          <EditableList
            empty={<EmptyState title="No categories match" titleAs="p" />}
            rows={page.items.map((category) => ({
              id: category.id,
              title: category.name,
              editLabel: `Edit ${category.name}`,
              meta: (
                <>
                  <span className="font-mono">{category.slug}</span>
                  <span>{category._count.subjects} subjects</span>
                  <ActiveBadge active={category.isActive} />
                </>
              ),
              editor: canAdmin ? <CategoryForm action={updateCategoryAction} values={category} submitLabel="Save category" /> : undefined,
            }))}
          />
          <CursorPagination path="/admin/subjects/categories" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
        </div>
        {canAdmin && (
          <AdminSection title="Add a category">
            <CategoryForm action={createCategoryAction} submitLabel="Add category" />
          </AdminSection>
        )}
      </div>
    </Container>
  );
}
