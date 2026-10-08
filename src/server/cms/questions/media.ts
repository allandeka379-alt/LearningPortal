import "server-only";
import type { ContentEntityType } from "@/generated/prisma/client";
import { collectAssetIds } from "@/server/content/render";
import type { DbClient } from "@/server/db";

/**
 * `ContentMediaUsage` upkeep for questions, assessments and study packs (schema: "the content service rewrites these
 * rows on every save"). Postgres cannot FK into markdown or JSON, so every save, draft copy, publish merge and discard
 * rewrites the rows of the entity it touched: an asset in use can then not be deleted, and licensing audits can answer
 * "where is this image used?".
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface MediaReference {
  /** Field holding the reference ("stem", "parts.0.payload", "coverImageId"…), at most 64 characters. */
  field: string;
  mediaAssetId: string;
}

/** References in a markdown source (`![alt](asset:<id>)`). Pure. */
export function markdownReferences(field: string, source: string | null | undefined): MediaReference[] {
  if (!source) return [];
  return collectAssetIds(source)
    .filter((id) => UUID.test(id))
    .map((id) => ({ field: field.slice(0, 64), mediaAssetId: id.toLowerCase() }));
}

/** A reference held directly in an id column or JSON field. Pure. */
export function idReference(field: string, id: string | null | undefined): MediaReference[] {
  return id && UUID.test(id) ? [{ field: field.slice(0, 64), mediaAssetId: id.toLowerCase() }] : [];
}

/**
 * Replaces the usage rows of one entity with `refs`. Ids that name no MediaAsset are skipped (the editor already warns
 * about unresolved images), so a typo never fails a save on the foreign key.
 */
export async function replaceMediaUsage(client: DbClient, entityType: ContentEntityType, entityId: string, refs: readonly MediaReference[]): Promise<number> {
  await client.contentMediaUsage.deleteMany({ where: { entityType, entityId } });
  const unique = new Map<string, MediaReference>();
  for (const ref of refs) unique.set(`${ref.field}\u0000${ref.mediaAssetId}`, ref);
  if (unique.size === 0) return 0;
  const existing = await client.mediaAsset.findMany({
    where: { id: { in: [...new Set([...unique.values()].map((ref) => ref.mediaAssetId))] } },
    select: { id: true },
  });
  const known = new Set(existing.map((row) => row.id));
  const rows = [...unique.values()].filter((ref) => known.has(ref.mediaAssetId)).map((ref) => ({ entityType, entityId, ...ref }));
  if (rows.length === 0) return 0;
  await client.contentMediaUsage.createMany({ data: rows, skipDuplicates: true });
  return rows.length;
}

/** Removes every usage row of an entity (deleted drafts, discarded or merged draft copies). */
export async function clearMediaUsage(client: DbClient, entityType: ContentEntityType, entityId: string): Promise<void> {
  await client.contentMediaUsage.deleteMany({ where: { entityType, entityId } });
}
