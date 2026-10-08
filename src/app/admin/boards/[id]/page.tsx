import Link from "next/link";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { BoardCountriesForm } from "@/components/admin/curriculum/BoardCountriesForm";
import { BoardForm } from "@/components/admin/curriculum/CatalogueForms";
import { CatalogueStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { isListedCatalogueStatus } from "@/server/curriculum/core";
import { curriculumAccess, getBoard, getCatalogueOptions } from "@/server/cms/curriculum";
import { setBoardCountriesAction, updateBoardAction } from "../actions";

export const metadata = { title: "Exam board" };

/** /admin/boards/[id] — board details, country availability and its qualifications. */
export default async function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/boards/${id}` });
  const [board, options] = await Promise.all([orNotFound(getBoard(actor, id)), getCatalogueOptions(actor)]);
  const { canAdmin } = curriculumAccess(actor);
  const live = isListedCatalogueStatus(board.catalogueStatus);

  return (
    <Container size="wide">
      <PageHeader
        title={board.shortName}
        eyebrow={board.name}
        breadcrumbs={[{ label: "Exam boards", href: "/admin/boards" }, { label: board.shortName }]}
        actions={
          <ButtonLink href={`/admin/qualifications?boardId=${board.id}`} variant="outline">
            Qualifications
          </ButtonLink>
        }
      />
      <div className="space-y-6">
        <AdminSection title="Summary">
          <KeyValueList
            columns={3}
            items={[
              { label: "Status", value: <CatalogueStatusBadge status={board.catalogueStatus} /> },
              { label: "Public URL", value: <span className="font-mono">{board.publicPath}</span> },
              { label: "Code", value: <span className="font-mono">{board.code}</span> },
              { label: "Created", value: <Timestamp value={board.createdAt} /> },
              { label: "Last changed", value: <Timestamp value={board.updatedAt} /> },
            ]}
          />
        </AdminSection>

        <AdminSection title="Details" description={live ? "This board is listed: its slug is part of live URLs." : "Hidden boards can be renamed freely."}>
          {canAdmin ? (
            <BoardForm
              action={updateBoardAction}
              values={board}
              countries={options.countries.map((country) => ({ value: country.id, label: country.name }))}
              live={live}
              cancelHref="/admin/boards"
              submitLabel="Save board"
            />
          ) : (
            <ReadOnlyNotice />
          )}
        </AdminSection>

        <AdminSection title="Country availability" description="Onboarding shows a board only in the countries it is offered in.">
          <BoardCountriesForm action={setBoardCountriesAction} boardId={board.id} countries={options.countries} links={board.countryLinks} disabled={!canAdmin} />
        </AdminSection>

        <AdminSection title="Qualifications" description="Qualifications offered by this board (second URL segment).">
          {board.qualifications.length === 0 ? (
            <p className="text-sm text-muted">No qualifications yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {board.qualifications.map((qualification) => (
                <li key={qualification.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                  <Link href={`/admin/qualifications/${qualification.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
                    {qualification.name}
                  </Link>
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <span className="font-mono">
                      /{board.slug}/{qualification.slug}
                    </span>
                    <CatalogueStatusBadge status={qualification.catalogueStatus} />
                  </span>
                </li>
              ))}
            </ul>
          )}
          {canAdmin && (
            <ButtonLink href={`/admin/qualifications/new?boardId=${board.id}`} variant="outline" size="sm" className="mt-3">
              Add a qualification
            </ButtonLink>
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
