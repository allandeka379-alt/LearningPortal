import { CursorPagination } from "@/components/admin/CursorPagination";
import { AdminSection } from "@/components/admin/DetailParts";
import { LevelForm } from "@/components/admin/curriculum/CatalogueForms";
import { ActiveBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { CurriculumSubnav, ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { EditableList } from "@/components/admin/curriculum/EditableList";
import { FilterBar } from "@/components/admin/FilterBar";
import { requireAdminPage } from "@/components/admin/guards";
import { firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { curriculumAccess, listLevels } from "@/server/cms/curriculum";
import { createLevelAction, updateLevelAction } from "../actions";

export const metadata = { title: "Qualification levels" };

/** /admin/qualifications/levels — cross-board levels (O-Level groups ZIMSEC O-Level and Cambridge IGCSE, §5). */
export default async function LevelsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: "/admin/qualifications/levels" });
  const params = await searchParams;
  const q = firstParam(params, "q");
  const page = await listLevels(actor, { q, cursor: firstParam(params, "cursor") });
  const { canAdmin } = curriculumAccess(actor);

  return (
    <Container size="wide">
      <PageHeader
        title="Qualification levels"
        breadcrumbs={[{ label: "Qualifications", href: "/admin/qualifications" }, { label: "Levels" }]}
        description="Levels group qualifications across boards in onboarding. A new country's levels (e.g. Grade 12) are added here."
      />
      <CurriculumSubnav active="levels" />
      {!canAdmin && <ReadOnlyNotice />}
      <div className="space-y-6">
        <div>
          <FilterBar action="/admin/qualifications/levels" search={{ label: "Search levels", value: q }} />
          <EditableList
            empty={<EmptyState title="No levels match" titleAs="p" />}
            rows={page.items.map((level) => ({
              id: level.id,
              title: level.name,
              editLabel: `Edit ${level.name}`,
              meta: (
                <>
                  <span className="font-mono">{level.slug}</span>
                  <span>{level._count.qualifications} qualifications</span>
                  <span>{level._count.yearGroups} year groups</span>
                  <ActiveBadge active={level.isActive} />
                </>
              ),
              editor: canAdmin ? <LevelForm action={updateLevelAction} values={level} submitLabel="Save level" /> : undefined,
            }))}
          />
          <CursorPagination path="/admin/qualifications/levels" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} className="mt-4" />
        </div>
        {canAdmin && (
          <AdminSection title="Add a level">
            <LevelForm action={createLevelAction} submitLabel="Add level" />
          </AdminSection>
        )}
      </div>
    </Container>
  );
}
