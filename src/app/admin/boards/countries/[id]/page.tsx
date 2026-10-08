import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { CountryForm } from "@/components/admin/curriculum/CatalogueForms";
import { CatalogueStatusBadge } from "@/components/admin/curriculum/CurriculumBadges";
import { ReadOnlyNotice } from "@/components/admin/curriculum/CurriculumSubnav";
import { orNotFound, uuidParamOrNotFound } from "@/components/admin/curriculum/route-helpers";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { curriculumAccess, getCountry } from "@/server/cms/curriculum";
import { updateCountryAction } from "../../actions";

export const metadata = { title: "Country" };

/** /admin/boards/countries/[id] */
export default async function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const id = uuidParamOrNotFound((await params).id);
  const actor = await requireAdminPage("curriculum.manage", { minScope: "restricted", next: `/admin/boards/countries/${id}` });
  const country = await orNotFound(getCountry(actor, id));
  const { canAdmin } = curriculumAccess(actor);
  return (
    <Container size="wide">
      <PageHeader
        title={country.name}
        breadcrumbs={[{ label: "Countries", href: "/admin/boards/countries" }, { label: country.name }]}
        actions={
          <ButtonLink href={`/admin/qualifications/year-groups?countryId=${country.id}`} variant="outline">
            Year groups
          </ButtonLink>
        }
      />
      <div className="space-y-6">
        <AdminSection title="Summary">
          <KeyValueList
            columns={3}
            items={[
              { label: "Status", value: <CatalogueStatusBadge status={country.catalogueStatus} /> },
              { label: "ISO code", value: <span className="font-mono">{country.isoCode}</span> },
              { label: "Boards offered", value: country._count.examBoardLinks },
              { label: "Year groups", value: country._count.yearGroups },
              { label: "Last changed", value: <Timestamp value={country.updatedAt} /> },
            ]}
          />
        </AdminSection>
        <AdminSection title="Settings">
          {canAdmin ? (
            <CountryForm action={updateCountryAction} values={country} cancelHref="/admin/boards/countries" submitLabel="Save country" />
          ) : (
            <ReadOnlyNotice />
          )}
        </AdminSection>
      </div>
    </Container>
  );
}
