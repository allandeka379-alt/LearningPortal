import { AdminField } from "../ActionForm";
import { COPYRIGHT_OPTIONS } from "./options";
import type { Choice } from "./types";

/**
 * Licensing fields of a content item (§27: source, author, copyright status, licence, publication date, plus
 * attribution and source link). Rendered inside an `ActionForm`; the service validates them (and requires them before
 * review). `required` marks the fields needed before review.
 */

export interface ProvenanceValues {
  sourceId: string | null;
  author: string | null;
  copyrightStatus: string;
  licenceCode: string | null;
  attribution: string | null;
  sourceUrl: string | null;
  publicationDate: string | null;
}

export function ProvenanceFields({
  values,
  sources,
  requiredForReview = ["sourceId", "author", "copyrightStatus", "licenceCode", "publicationDate"],
}: {
  values: ProvenanceValues;
  sources: readonly Choice[];
  requiredForReview?: readonly string[];
}) {
  const needed = (field: string) => (requiredForReview.includes(field) ? "Required before review." : undefined);
  return (
    <>
      <AdminField
        name="copyrightStatus"
        label="Copyright status"
        type="select"
        options={COPYRIGHT_OPTIONS}
        defaultValue={values.copyrightStatus}
        hint="Never paste past papers, textbooks or other sites. Content stays unpublishable until this is cleared."
      />
      <AdminField name="sourceId" label="Content source" type="select" options={sources} placeholder="Choose a source" defaultValue={values.sourceId} hint={needed("sourceId")} />
      <AdminField name="author" label="Author" defaultValue={values.author} maxLength={200} hint={needed("author")} />
      <AdminField
        name="licenceCode"
        label="Licence"
        defaultValue={values.licenceCode}
        maxLength={64}
        mono
        placeholder="PROPRIETARY or CC-BY-4.0"
        hint={needed("licenceCode") ?? 'e.g. "PROPRIETARY" for original work, "CC-BY-4.0" for open content.'}
      />
      <AdminField name="publicationDate" label="Publication date" type="date" defaultValue={values.publicationDate} hint={needed("publicationDate")} />
      <AdminField name="sourceUrl" label="Source link" type="url" defaultValue={values.sourceUrl} optional maxLength={2000} />
      <AdminField name="attribution" label="Attribution text" type="textarea" rows={2} defaultValue={values.attribution} optional maxLength={1000} wide />
    </>
  );
}
