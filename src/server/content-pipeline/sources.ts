import "server-only";
import type { DbClient } from "@/server/db";
import { slugify, syllabusPath } from "./keys";
import type { SyllabusModel } from "./resolve";

/**
 * Provenance records (§27) the pipeline writes against: one ContentSource for the team's original (AI-assisted)
 * content, and one OFFICIAL_SYLLABUS source per syllabus document. Get-or-create by slug; descriptive fields are kept
 * in step with the files.
 */

export const ORIGINAL_SOURCE_SLUG = "content-pipeline-original";
export const ORIGINAL_SOURCE_NAME = "Original content (AI-assisted, editor review required)";
/** Author recorded on every imported item (provenance; the accountable account is `createdById`). */
export const CONTENT_AUTHOR = "Content team";
/** Licence of the team's own work (required on lessons before review). */
export const OWN_LICENCE = "PROPRIETARY";

export async function ensureOriginalSource(client: DbClient): Promise<string> {
  const data = {
    name: ORIGINAL_SOURCE_NAME,
    type: "ORIGINAL" as const,
    publisher: CONTENT_AUTHOR,
    licenceCode: OWN_LICENCE,
    requiresAttribution: false,
    permitsCommercialUse: true,
    permitsDerivatives: true,
    permitsPdfExport: true,
    notes:
      "Written for the platform by the content team with AI assistance from version-controlled files (content/, docs/CONTENT_PIPELINE.md). " +
      "Every item is imported as AI-generated and must be reviewed and approved by a person before students see it.",
    isActive: true,
  };
  const row = await client.contentSource.upsert({ where: { slug: ORIGINAL_SOURCE_SLUG }, create: { slug: ORIGINAL_SOURCE_SLUG, ...data }, update: {}, select: { id: true } });
  return row.id;
}

export function officialSourceSlug(model: SyllabusModel): string {
  return `official-syllabus-${slugify(syllabusPath(model.ref).replace(/\//g, "-"), 110)}`;
}

/** The OFFICIAL_SYLLABUS source citing a syllabus file's official document (kept in step with the file). */
export async function ensureOfficialSource(client: DbClient, model: SyllabusModel): Promise<string> {
  const slug = officialSourceSlug(model);
  const document = model.data.officialDocument;
  const data = {
    name: document.title.slice(0, 300),
    type: "OFFICIAL_SYLLABUS" as const,
    publisher: document.publisher,
    url: document.url,
    notes: [model.data.sourceNote, ...model.data.notes].join("\n"),
    isActive: true,
  };
  const existing = await client.contentSource.findUnique({ where: { slug }, select: { id: true, name: true, publisher: true, url: true, notes: true, type: true } });
  if (!existing) return (await client.contentSource.create({ data: { slug, ...data }, select: { id: true } })).id;
  if (existing.name !== data.name || existing.publisher !== data.publisher || existing.url !== data.url || existing.notes !== data.notes) {
    await client.contentSource.update({ where: { id: existing.id }, data: { name: data.name, publisher: data.publisher, url: data.url, notes: data.notes } });
  }
  return existing.id;
}
