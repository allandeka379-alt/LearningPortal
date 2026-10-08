import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { ButtonLink } from "@/components/ui/Button";
import type { SelectOption } from "@/components/ui/Select";
import { CATALOGUE_STATUS_OPTIONS } from "./labels";

/**
 * Create/edit forms of the catalogue (countries, boards, levels, qualifications, year groups, categories, subjects).
 * Declarative `ActionForm` + `AdminField`s: field errors from the service's Zod validation appear next to their
 * fields. Server components (the form shell itself is a client leaf).
 */

/** Current values of the record being edited (any row shape; only string / number / boolean fields are read). */
type Values = object;

function text(values: Values | undefined, key: string): string | undefined {
  const value = values === undefined ? undefined : (values as Record<string, unknown>)[key];
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

function flag(values: Values | undefined, key: string, fallback: boolean): boolean {
  const value = values === undefined ? undefined : (values as Record<string, unknown>)[key];
  return typeof value === "boolean" ? value : fallback;
}

/** Slug input plus, when the slug is already live in public URLs, the explicit rename confirmation. */
function SlugFields({ values, publicPrefix, live, hint }: { values?: Values; publicPrefix: string; live: boolean; hint?: string }) {
  return (
    <>
      <AdminField
        name="slug"
        label="URL slug"
        mono
        optional
        defaultValue={text(values, "slug")}
        hint={hint ?? `Lower-case words and hyphens; appears in public URLs as ${publicPrefix}<slug>. Leave blank to derive it from the name.`}
      />
      {live && (
        <AdminField
          name="confirmSlugChange"
          label="Rename the live URL"
          type="checkbox"
          description="This item is listed publicly. Renaming its slug breaks existing links and search rankings (there are no automatic redirects yet)."
        />
      )}
    </>
  );
}

function CancelLink({ href }: { href: string }) {
  return (
    <ButtonLink href={href} variant="ghost">
      Cancel
    </ButtonLink>
  );
}

const SEO_HINT = "Shown in search results. Leave blank to use the name.";

// ---------------------------------------------------------------------------------------------------------------------

export function CountryForm({ action, values, cancelHref, submitLabel }: { action: AdminFormAction<unknown>; values?: Values; cancelHref: string; submitLabel: string }) {
  const id = text(values, "id");
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" hiddenFields={id ? { id } : undefined} secondaryActions={<CancelLink href={cancelHref} />}>
      <AdminField name="name" label="Name" required defaultValue={text(values, "name")} />
      <AdminField name="isoCode" label="ISO 3166 code" required mono maxLength={2} defaultValue={text(values, "isoCode")} hint="Two letters, e.g. ZW. Cannot be changed later." disabled={Boolean(id)} />
      {id && <input type="hidden" name="isoCode" value={text(values, "isoCode") ?? ""} />}
      <AdminField name="defaultCurrency" label="Default currency" required mono maxLength={3} defaultValue={text(values, "defaultCurrency")} hint="ISO 4217, e.g. USD." />
      <AdminField name="timezone" label="Time zone" required defaultValue={text(values, "timezone") ?? "Africa/Harare"} hint="IANA zone used for day boundaries (streaks, daily question)." />
      <AdminField name="defaultLocale" label="Default locale" required mono defaultValue={text(values, "defaultLocale") ?? "en"} hint="BCP-47, e.g. en-ZW." />
      <AdminField name="dialCode" label="Dialling code" optional mono defaultValue={text(values, "dialCode")} hint="e.g. +263" />
      <AdminField name="catalogueStatus" label="Catalogue status" type="select" options={CATALOGUE_STATUS_OPTIONS} defaultValue={text(values, "catalogueStatus") ?? "HIDDEN"} />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={text(values, "sortOrder") ?? "0"} />
      <AdminField name="slug" label="Slug" mono optional defaultValue={text(values, "slug")} hint="Leave blank to derive it from the name." />
    </ActionForm>
  );
}

export function BoardForm({
  action,
  values,
  countries,
  live,
  cancelHref,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  values?: Values;
  countries: readonly SelectOption[];
  live: boolean;
  cancelHref: string;
  submitLabel: string;
}) {
  const id = text(values, "id");
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" hiddenFields={id ? { id } : undefined} secondaryActions={<CancelLink href={cancelHref} />}>
      <AdminField name="shortName" label="Display name" required defaultValue={text(values, "shortName")} hint="Short name students see, e.g. ZIMSEC." />
      <AdminField name="name" label="Full name" required defaultValue={text(values, "name")} />
      <AdminField name="code" label="Code" required mono maxLength={32} defaultValue={text(values, "code")} hint="Stable internal code, e.g. ZIMSEC or CAIE." />
      <SlugFields values={values} publicPrefix="/" live={live} />
      <AdminField name="catalogueStatus" label="Catalogue status" type="select" options={CATALOGUE_STATUS_OPTIONS} defaultValue={text(values, "catalogueStatus") ?? "HIDDEN"} />
      <AdminField name="homeCountryId" label="Home country" type="select" options={countries} placeholder="Not set (international board)" defaultValue={text(values, "homeCountryId")} hint="Where the board is based. Where it is offered is set separately." />
      <AdminField name="websiteUrl" label="Official website" type="url" optional defaultValue={text(values, "websiteUrl")} />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={text(values, "sortOrder") ?? "0"} />
      <AdminField name="description" label="Description" type="textarea" optional rows={3} wide defaultValue={text(values, "description")} />
      <AdminField
        name="publicSummary"
        label="Public summary (Markdown)"
        type="textarea"
        optional
        rows={5}
        wide
        mono
        defaultValue={text(values, "publicSummary")}
        hint="Original text for the board's public page. Never copy the board's own website text."
      />
      <AdminField name="metaTitle" label="SEO title" optional maxLength={70} defaultValue={text(values, "metaTitle")} hint={SEO_HINT} />
      <AdminField name="metaDescription" label="SEO description" optional maxLength={170} defaultValue={text(values, "metaDescription")} />
    </ActionForm>
  );
}

export function LevelForm({ action, values, submitLabel }: { action: AdminFormAction<unknown>; values?: Values; submitLabel: string }) {
  const id = text(values, "id");
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" hiddenFields={id ? { id } : undefined} successAs="toast">
      <AdminField name="name" label="Name" required defaultValue={text(values, "name")} hint="Cross-board level, e.g. O-Level." />
      <AdminField name="shortName" label="Short name" optional defaultValue={text(values, "shortName")} />
      <AdminField name="slug" label="Slug" mono optional defaultValue={text(values, "slug")} hint="Leave blank to derive it from the name." />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={text(values, "sortOrder") ?? "0"} />
      <AdminField name="description" label="Description" type="textarea" optional rows={2} wide defaultValue={text(values, "description")} />
      <AdminField name="isActive" label="Active" type="checkbox" defaultChecked={flag(values, "isActive", true)} description="Inactive levels are not offered in onboarding." />
    </ActionForm>
  );
}

export function QualificationForm({
  action,
  values,
  boards,
  levels,
  live,
  boardSlug,
  cancelHref,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  values?: Values;
  boards: readonly SelectOption[] | null;
  levels: readonly SelectOption[];
  live: boolean;
  boardSlug?: string;
  cancelHref: string;
  submitLabel: string;
}) {
  const id = text(values, "id");
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" hiddenFields={id ? { id } : undefined} secondaryActions={<CancelLink href={cancelHref} />}>
      {boards ? (
        <AdminField name="examBoardId" label="Exam board" type="select" required options={boards} placeholder="Choose a board" defaultValue={text(values, "examBoardId")} hint="Fixed after creation." />
      ) : null}
      <AdminField name="levelId" label="Level" type="select" required options={levels} placeholder="Choose a level" defaultValue={text(values, "levelId")} hint="Groups qualifications across boards in onboarding." />
      <AdminField name="name" label="Name" required defaultValue={text(values, "name")} hint="e.g. Cambridge IGCSE" />
      <AdminField name="shortName" label="Short name" required defaultValue={text(values, "shortName")} hint="e.g. IGCSE" />
      <AdminField name="code" label="Code" optional mono defaultValue={text(values, "code")} />
      <SlugFields values={values} publicPrefix={`/${boardSlug ?? "<board>"}/`} live={live} />
      <AdminField name="catalogueStatus" label="Catalogue status" type="select" options={CATALOGUE_STATUS_OPTIONS} defaultValue={text(values, "catalogueStatus") ?? "HIDDEN"} />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={text(values, "sortOrder") ?? "0"} />
      <AdminField name="description" label="Description" type="textarea" optional rows={3} wide defaultValue={text(values, "description")} />
      <AdminField name="publicSummary" label="Public summary (Markdown)" type="textarea" optional rows={5} wide mono defaultValue={text(values, "publicSummary")} hint="Original text for the public qualification page." />
      <AdminField name="metaTitle" label="SEO title" optional maxLength={70} defaultValue={text(values, "metaTitle")} hint={SEO_HINT} />
      <AdminField name="metaDescription" label="SEO description" optional maxLength={170} defaultValue={text(values, "metaDescription")} />
    </ActionForm>
  );
}

export function YearGroupForm({
  action,
  values,
  countries,
  levels,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  values?: Values;
  countries: readonly SelectOption[] | null;
  levels: readonly SelectOption[];
  submitLabel: string;
}) {
  const id = text(values, "id");
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" hiddenFields={id ? { id } : undefined} successAs="toast">
      {countries && <AdminField name="countryId" label="Country" type="select" required options={countries} placeholder="Choose a country" defaultValue={text(values, "countryId")} />}
      <AdminField name="name" label="Name" required defaultValue={text(values, "name")} hint="e.g. Form 4, Lower Sixth" />
      <AdminField name="code" label="Code" required mono maxLength={16} defaultValue={text(values, "code")} hint="Unique per country, e.g. F4" />
      <AdminField name="ordinal" label="Order (1 = youngest)" type="number" min={1} required defaultValue={text(values, "ordinal") ?? "1"} />
      <AdminField name="typicalLevelId" label="Typical level" type="select" options={levels} placeholder="None" defaultValue={text(values, "typicalLevelId")} hint="Pre-selected in onboarding." />
      <AdminField name="isActive" label="Active" type="checkbox" defaultChecked={flag(values, "isActive", true)} />
    </ActionForm>
  );
}

export function CategoryForm({ action, values, submitLabel }: { action: AdminFormAction<unknown>; values?: Values; submitLabel: string }) {
  const id = text(values, "id");
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" hiddenFields={id ? { id } : undefined} successAs="toast">
      <AdminField name="name" label="Name" required defaultValue={text(values, "name")} hint="e.g. Sciences" />
      <AdminField name="slug" label="Slug" mono optional defaultValue={text(values, "slug")} hint="Leave blank to derive it from the name." />
      <AdminField name="iconKey" label="Icon key" mono optional defaultValue={text(values, "iconKey")} hint="An icon from the app's icon set." />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={text(values, "sortOrder") ?? "0"} />
      <AdminField name="description" label="Description" type="textarea" optional rows={2} wide defaultValue={text(values, "description")} />
      <AdminField name="isActive" label="Active" type="checkbox" defaultChecked={flag(values, "isActive", true)} />
    </ActionForm>
  );
}

export function SubjectForm({
  action,
  values,
  qualifications,
  categories,
  sources,
  live,
  publicPrefix,
  cancelHref,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  values?: Values;
  qualifications: readonly SelectOption[] | null;
  categories: readonly SelectOption[];
  sources: readonly SelectOption[];
  live: boolean;
  publicPrefix: string;
  cancelHref: string;
  submitLabel: string;
}) {
  const id = text(values, "id");
  return (
    <ActionForm action={action} submitLabel={submitLabel} columns="two" hiddenFields={id ? { id } : undefined} secondaryActions={<CancelLink href={cancelHref} />}>
      {qualifications && (
        <AdminField name="qualificationId" label="Qualification" type="select" required options={qualifications} placeholder="Choose a qualification" defaultValue={text(values, "qualificationId")} hint="Fixed after creation." />
      )}
      <AdminField name="categoryId" label="Category" type="select" required options={categories} placeholder="Choose a category" defaultValue={text(values, "categoryId")} />
      <AdminField name="name" label="Name" required defaultValue={text(values, "name")} hint="Exactly as on the board's official subject list." />
      <AdminField name="officialCode" label="Official subject code" optional mono maxLength={16} defaultValue={text(values, "officialCode")} hint="From the board's official list, e.g. 0580. Leave blank until confirmed." />
      <AdminField name="shortName" label="Short name" optional defaultValue={text(values, "shortName")} />
      <AdminField name="languageCode" label="Language of instruction" required mono defaultValue={text(values, "languageCode") ?? "en"} hint="e.g. en, sn (Shona), nd (Ndebele), fr." />
      <SlugFields values={values} publicPrefix={publicPrefix} live={live} />
      <AdminField
        name="sourceId"
        label="Verified against (official list)"
        type="select"
        options={sources}
        placeholder="Not verified yet"
        defaultValue={text(values, "sourceId")}
        hint="Record the board's official subject list you checked the name and code against. Required before the subject is listed."
        wide
      />
      <AdminField name="catalogueStatus" label="Catalogue status" type="select" options={CATALOGUE_STATUS_OPTIONS} defaultValue={text(values, "catalogueStatus") ?? "HIDDEN"} />
      <AdminField name="sortOrder" label="Order" type="number" min={0} defaultValue={text(values, "sortOrder") ?? "0"} />
      <AdminField name="isPublic" label="Public subject page" type="checkbox" defaultChecked={flag(values, "isPublic", true)} description="Render an SEO page for this subject once it is listed." />
      <AdminField name="iconKey" label="Icon key" mono optional defaultValue={text(values, "iconKey")} />
      <AdminField name="description" label="Description" type="textarea" optional rows={3} wide defaultValue={text(values, "description")} />
      <AdminField name="publicSummary" label="Public summary (Markdown)" type="textarea" optional rows={5} wide mono defaultValue={text(values, "publicSummary")} hint="Original text only; never premium lesson content." />
      <AdminField name="metaTitle" label="SEO title" optional maxLength={70} defaultValue={text(values, "metaTitle")} hint={SEO_HINT} />
      <AdminField name="metaDescription" label="SEO description" optional maxLength={170} defaultValue={text(values, "metaDescription")} />
    </ActionForm>
  );
}
