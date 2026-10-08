import "server-only";
import { readFileSync } from "node:fs";
import { db } from "@/server/db";
import { createMediaAsset, sanitizeFilename } from "@/server/lib/uploads";
import { describeError } from "./issues";
import type { ContentTree } from "./load";
import { CONTENT_AUTHOR, OWN_LICENCE } from "./sources";

/**
 * Family images (content/subjects/<family>/media/, listed in media.json) → MediaAsset rows, so `media:<file>` in the
 * source becomes `asset:<id>` in the database. Uploaded once through the normal upload pipeline (type sniffing, size
 * limits, metadata stripping, re-encoding) as the system job "content-pipeline"; found again by their stable stored
 * file name `content-<family>-<file>`. To replace an image, add it under a new file name (bytes are re-encoded on
 * upload, so a changed file under the same name is not detected). Alt text and captions are kept in step with
 * media.json.
 */

export interface MediaOutcome {
  family: string;
  file: string;
  outcome: "uploaded" | "updated" | "unchanged" | "error";
  id?: string;
  message?: string;
}

export function storedMediaName(family: string, file: string): string {
  return sanitizeFilename(`content-${family}-${file.replace(/\//g, "-")}`) ?? `content-${family}`;
}

export async function syncMedia(tree: ContentTree, families: readonly string[], sourceId: string): Promise<{ ids: Map<string, Map<string, string>>; outcomes: MediaOutcome[] }> {
  const ids = new Map<string, Map<string, string>>();
  const outcomes: MediaOutcome[] = [];
  for (const family of families) {
    const files = tree.media.get(family);
    const map = new Map<string, string>();
    ids.set(family, map);
    if (!files || files.size === 0) continue;
    const names = [...files.keys()].map((file) => storedMediaName(family, file));
    const existing = await db.mediaAsset.findMany({
      where: { originalFilename: { in: names }, status: "READY", deletedAt: null, purpose: { in: ["DIAGRAM", "CONTENT_IMAGE"] } },
      select: { id: true, originalFilename: true, altText: true, caption: true, longDescription: true },
      orderBy: { createdAt: "asc" },
    });
    const byName = new Map<string, (typeof existing)[number]>();
    for (const row of existing) if (row.originalFilename && !byName.has(row.originalFilename)) byName.set(row.originalFilename, row);
    for (const [file, media] of files) {
      const name = storedMediaName(family, file);
      const entry = media.entry;
      const row = byName.get(name);
      try {
        if (row) {
          map.set(file, row.id);
          const want = { altText: entry.alt.trim(), caption: entry.caption?.trim() || null, longDescription: entry.longDescription?.trim() || null };
          if (row.altText !== want.altText || row.caption !== want.caption || row.longDescription !== want.longDescription) {
            await db.mediaAsset.update({ where: { id: row.id }, data: want });
            outcomes.push({ family, file, outcome: "updated", id: row.id });
          } else {
            outcomes.push({ family, file, outcome: "unchanged", id: row.id });
          }
          continue;
        }
        const asset = await createMediaAsset(
          { kind: "system", job: "content-pipeline" },
          { bytes: new Uint8Array(readFileSync(media.absPath)), filename: name },
          {
            purpose: entry.purpose,
            altText: entry.alt,
            caption: entry.caption ?? null,
            longDescription: entry.longDescription ?? null,
            visibility: "AUTHENTICATED",
            copyrightStatus: "OWNED",
            sourceId,
            licenceCode: OWN_LICENCE,
            author: CONTENT_AUTHOR,
          },
        );
        map.set(file, asset.id);
        outcomes.push({ family, file, outcome: "uploaded", id: asset.id });
      } catch (error) {
        outcomes.push({ family, file, outcome: "error", message: describeError(error) });
      }
    }
  }
  return { ids, outcomes };
}
