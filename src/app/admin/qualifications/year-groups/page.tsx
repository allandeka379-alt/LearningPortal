import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection } from "@/components/admin/DetailParts";
import { YearGroupForm } from "@/components/admin/curriculum/CatalogueForms";
import { ActiveBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav, ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { EditableList } from "@/components/admin/curriculum/EditableList";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, getCatalogueOptions, listYearGroups } from "@/server/cms/curriculum";
import { createYearGroupAction, updateYearGroupAction } from "../actions";

export const metadata = { title: "Year groups" };

/** /admin/qualifications/year-groups — "Year/form" choices per country in onboarding (§5). */
export default async function YearGroupsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/qualifications/year-groups" });
  const params = await searchParams;
  const countryId = firstParam(params, "countryId");
  const q = firstParam(params, "q");
  const [page, options] = await Promise.all([listYearGroups(actor, { countryId, q, cursor: firstParam(params, "cursor") }), getCatalogueOptions(actor)]);
  const { canAdmin } = curriculumAccess(actor);
  const levels = options.levels.map((level) => ({ value: level.id, label: level.name }));
  const countries = options.countries.map((country) => ({ value: country.id, label: country.name }));

  return (
    <Container size="wide">
      <PageHeader
        title="Year groups"
        breadcrumbs={[{ label: "Qualifications", href: "/admin/qualifications" }, { label: "Year groups" }]}
        description="School years offered in onboarding, per country (Form 1-4, Lower and Upper Sixth; other countries' grades)."
      />
      <CurriculumSubnav active="year-groups" />
      {!canAdmin && <ReadOnlyNotice />}
      <div className="space-y-6">
        <div>
          <FilterBar
            action="/admin/qualifications/year-groups"
            search={{ label: "Search year groups", value: q }}
            filters={[{ kind: "select", name: "countryId", label: "Country", options: countries, value: countryId }]}
          />
          <EditableList
            empty={<EmptyState title="No year groups match" titleAs="p" />}
            rows={page.items.map((year) => ({
              id: year.id,
              title: `${year.name} (${year.country.name})`,
              editLabel: `Edit ${year.name}`,
              meta: (
                <>
                  <span className="font-mono">{year.code}</span>
                  <span>Order {year.ordinal}</span>
                  {year.typicalLevel && <span>Typically {year.typicalLevel.name}</span>}
                  <span>{year._count.students} students</span>
                  <ActiveBadge active={year.isActive} />
                </>
              ),
              editor: canAdmin ? <YearGroupForm action={updateYearGroupAction} values={year} countries={null} levels={levels} submitLabel="Save year group" /> : undefined,
            }))}
          />
          <CursorPagination path="/admin/qualifications/year-groups" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
        </div>
        {canAdmin && (
          <AdminSection title="Add a year group">
            <YearGroupForm action={createYearGroupAction} values={{ countryId }} countries={countries} levels={levels} submitLabel="Add year group" />
          </AdminSection>
        )}
      </div>
    </Container>
  );
}
