import "server-only";
import type { ContentEntityType } from "@/generated/prisma/client";
import { collectAssetIds } from "@/server/content/render";
import { loadContentAggregate, type ContentAggregates, type WorkflowEntityType } from "@/server/content/publish";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";

/**
 * `ContentMediaUsage` maintenance (schema: "the content service rewrites these rows on every save"). Postgres cannot
 * FK into markdown, so every save / draft copy / publish merge / discard rewrites the rows of the entity it touched.
 * The rows give referential integrity (an asset in use cannot be deleted), licensing audits ("where is this licensed
 * image used?") and the usage list of the media library.
 */

/** Markdown (or id-bearing) fields of a content row, by usage `field` name. */
export type UsageFields = Readonly<Record<string, string | null | undefined>>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** `{ field → asset ids }` referenced by the given fields (pure). Field names longer than 64 chars are cut. */
export function assetReferences(fields: UsageFields): { field: string; mediaAssetId: string }[] {
  const out: { field: string; mediaAssetId: string }[] = [];
  const seen = new Set<string>();
  for (const [rawField, source] of Object.entries(fields)) {
    if (!source) continue;
    const field = rawField.slice(0, 64);
    const ids = UUID.test(source.trim()) ? [source.trim()] : collectAssetIds(source);
    for (const id of ids) {
      const lower = id.toLowerCase();
      const key = `${field}\u0000${lower}`;
      if (!UUID.test(lower) || seen.has(key)) continue;
      seen.add(key);
      out.push({ field, mediaAssetId: lower });
    }
  }
  return out;
}

/**
 * Replaces the usage rows of one entity with the references found in `fields`. Ids that name no MediaAsset are
 * skipped (the editor preview already warns `image-unresolved`), so a typo can never fail the save on the FK.
 */
export async function syncMediaUsage(client: DbClient, entityType: ContentEntityType, entityId: string, fields: UsageFields): Promise<number> {
  const refs = assetReferences(fields);
  await client.contentMediaUsage.deleteMany({ where: { entityType, entityId } });
  if (refs.length === 0) return 0;
  const existing = await client.mediaAsset.findMany({
    where: { id: { in: [...new Set(refs.map((ref) => ref.mediaAssetId))] } },
    select: { id: true },
  });
  const known = new Set(existing.map((row) => row.id));
  const rows = refs.filter((ref) => known.has(ref.mediaAssetId)).map((ref) => ({ entityType, entityId, ...ref }));
  if (rows.length === 0) return 0;
  await client.contentMediaUsage.createMany({ data: rows, skipDuplicates: true });
  return rows.length;
}

/**
 * Rewrites the usage rows of a content row from its CURRENT aggregate ({@link usageFieldsFromAggregate}). Every save
 * path (editor draft saves, imports, draft copies, publish merges) uses this one mapping, so the media library's
 * "where it is used" list and the delete protection see the same field names whichever path wrote them.
 */
export async function syncMediaUsageFromAggregate(tx: Tx, entityType: WorkflowEntityType, id: string): Promise<number> {
  const aggregate = await loadContentAggregate(tx, entityType, id);
  if (!aggregate) {
    await clearMediaUsage(tx, entityType, id);
    return 0;
  }
  return syncMediaUsage(tx, entityType, id, usageFieldsFromAggregate(entityType, aggregate));
}

/** Removes every usage row of an entity (discarded draft copies, merged drafts). */
export async function clearMediaUsage(client: DbClient, entityType: ContentEntityType, entityId: string): Promise<void> {
  await client.contentMediaUsage.deleteMany({ where: { entityType, entityId } });
}

type Row = Record<string, unknown>;

function text(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

/** The usage fields of a loaded content aggregate (see `loadContentAggregate`). Pure. */
export function usageFieldsFromAggregate<T extends WorkflowEntityType>(entityType: T, aggregate: ContentAggregates[T]): UsageFields {
  switch (entityType) {
    case "LESSON": {
      const { lesson } = aggregate as ContentAggregates["LESSON"];
      return { body: text(lesson.body), summary: text(lesson.summary) };
    }
    case "FLASHCARD": {
      const { flashcard } = aggregate as ContentAggregates["FLASHCARD"];
      return { front: text(flashcard.front), back: text(flashcard.back), notes: text(flashcard.notes) };
    }
    case "QUESTION": {
      const { question } = aggregate as ContentAggregates["QUESTION"];
      const fields: Record<string, string | null> = {};
      const visit = (row: Row & { options: readonly Row[]; parts?: readonly Row[] }, prefix: string): void => {
        for (const key of ["stem", "explanation", "workedSolution", "conceptSummary"]) fields[`${prefix}${key}`] = text(row[key]);
        const hints = Array.isArray(row.hints) ? (row.hints as unknown[]).filter((h): h is string => typeof h === "string") : [];
        if (hints.length > 0) fields[`${prefix}hints`] = hints.join("\n");
        fields[`${prefix}payload`] = row.payload
          ? [JSON.stringify(row.payload), ...payloadAssetIds(row.payload).map((id) => `asset:${id}`)].join("\n")
          : null;
        const options = row.options.map((o) => [text(o.content), text(o.mediaAssetId) ? `asset:${String(o.mediaAssetId)}` : null].filter(Boolean).join("\n"));
        if (options.length > 0) fields[`${prefix}options`] = options.join("\n");
        // Nested: "parts.0.stem", "parts.0.parts.1.stem" (a sub-part must not overwrite its parent part's fields).
        (row.parts ?? []).forEach((part, index) => visit(part as Row & { options: readonly Row[]; parts?: readonly Row[] }, `${prefix}parts.${index}.`));
      };
      visit(question as unknown as Row & { options: readonly Row[]; parts?: readonly Row[] }, "");
      return fields;
    }
    case "ASSESSMENT": {
      const { assessment, sections } = aggregate as ContentAggregates["ASSESSMENT"];
      const fields: Record<string, string | null> = { description: text(assessment.description), instructions: text(assessment.instructions) };
      sections.forEach((section, index) => {
        fields[`sections.${index}.instructions`] = text(section.instructions);
      });
      return fields;
    }
    case "STUDY_PACK": {
      const { studyPack } = aggregate as ContentAggregates["STUDY_PACK"];
      return { coverImageId: text(studyPack.coverImageId), description: text(studyPack.description) };
    }
    default:
      return {};
  }
}

/** Payload JSON may name assets as `"mediaAssetId": "<uuid>"` (diagram labelling) as well as `asset:<id>`. */
export function payloadAssetIds(payload: unknown): string[] {
  if (typeof payload !== "object" || payload === null) return [];
  const id = (payload as Record<string, unknown>).mediaAssetId;
  return typeof id === "string" && UUID.test(id) ? [id.toLowerCase()] : [];
}
