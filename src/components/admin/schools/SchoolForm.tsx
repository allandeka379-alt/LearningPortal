import { ActionForm, AdminField } from "../ActionForm";
import type { AdminFormAction } from "../form-state";
import { humanizeEnum } from "../format";

/** School types (mirror of the `SchoolType` enum) for the select. */
const SCHOOL_TYPES = ["GOVERNMENT", "COUNCIL", "MISSION", "TRUST", "PRIVATE", "COMMUNITY", "INTERNATIONAL", "OTHER"] as const;

export interface SchoolFormValues {
  name?: string;
  slug?: string;
  countryId?: string;
  type?: string;
  region?: string | null;
  district?: string | null;
  town?: string | null;
  officialCode?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  website?: string | null;
  timezone?: string | null;
}

/**
 * Create / edit form for a school (§23 admin side). Server component composing the client `ActionForm`; the service
 * validates every field again. `schoolId` switches it into edit mode.
 */
export function SchoolForm({
  action,
  countries,
  values = {},
  schoolId,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  countries: readonly { id: string; name: string }[];
  values?: SchoolFormValues;
  schoolId?: string;
  submitLabel: string;
}) {
  return (
    <ActionForm action={action} hiddenFields={schoolId ? { schoolId } : undefined} submitLabel={submitLabel} columns="two" successAs={schoolId ? "inline" : "toast"}>
      <AdminField name="name" label="School name" required maxLength={200} defaultValue={values.name} wide />
      <AdminField
        name="countryId"
        label="Country"
        type="select"
        required
        placeholder="Choose a country"
        options={countries.map((country) => ({ value: country.id, label: country.name }))}
        defaultValue={values.countryId ?? (countries.length === 1 ? countries[0]?.id : undefined)}
      />
      <AdminField
        name="type"
        label="Type"
        type="select"
        required
        placeholder="Choose a type"
        options={SCHOOL_TYPES.map((type) => ({ value: type, label: humanizeEnum(type) }))}
        defaultValue={values.type}
      />
      <AdminField name="region" label="Province / region" optional maxLength={100} defaultValue={values.region} />
      <AdminField name="district" label="District" optional maxLength={100} defaultValue={values.district} />
      <AdminField name="town" label="Town / city" optional maxLength={100} defaultValue={values.town} />
      <AdminField name="officialCode" label="Official code" optional maxLength={32} hint="Ministry, EMIS or exam-centre number." defaultValue={values.officialCode} mono />
      <AdminField name="contactEmail" label="School email" type="email" optional maxLength={254} defaultValue={values.contactEmail} autoComplete="off" />
      <AdminField name="contactPhone" label="School phone" type="tel" optional maxLength={32} defaultValue={values.contactPhone} autoComplete="off" />
      <AdminField name="website" label="Website" type="url" optional maxLength={255} placeholder="https://" defaultValue={values.website} />
      <AdminField
        name="slug"
        label="URL slug"
        optional
        maxLength={120}
        mono
        hint={schoolId ? "Changing it breaks old links to this school." : "Leave empty to create one from the name."}
        defaultValue={values.slug}
      />
      <AdminField name="timezone" label="Time zone" optional maxLength={64} hint="Leave empty to use the country's time zone." defaultValue={values.timezone} mono />
      {!schoolId && (
        <AdminField
          name="verifyNow"
          label="Verified school"
          type="checkbox"
          description="Tick only if you have checked the school's details against an official register. Otherwise it starts as pending verification."
          wide
        />
      )}
    </ActionForm>
  );
}
