import { createHash } from "node:crypto";
import sharp from "sharp";
import type { PrismaClient } from "@/generated/prisma/client";
import { getStorage } from "@/server/lib/storage";
import type { DemoDiagram } from "../data/demo/types";
import { DEMO_AUTHOR } from "../data/demo/types";
import { stableUuidV4, type SeedTally } from "../util";

/**
 * DEV ONLY: renders a demo diagram (shapes-only SVG written for this project) to PNG with sharp, stores it through the
 * storage driver and records a READY, PUBLIC `MediaAsset` (alt text required for DIAGRAM, §43; OWNED copyright so it
 * may be public). The storage key is derived from the diagram key, so re-running reuses the same object and row.
 */
export async function ensureDemoDiagram(
  db: PrismaClient,
  diagram: DemoDiagram,
  context: { sourceId: string; uploadedById: string; namespace: string },
  tally: SeedTally,
): Promise<string> {
  const storageKey = `demo/2026/01/${stableUuidV4(`${context.namespace}:diagram:${diagram.key}`)}.png`;
  const png = await sharp(Buffer.from(diagram.svg)).png({ compressionLevel: 9 }).toBuffer();
  const bytes = new Uint8Array(png);
  const storage = getStorage();
  if (!(await storage.exists(storageKey))) await storage.put(storageKey, bytes, "image/png");

  const existing = await db.mediaAsset.findUnique({ where: { storageKey }, select: { id: true } });
  tally.add("MediaAsset", !existing);
  if (existing) return existing.id;
  const metadata = await sharp(png).metadata();
  const created = await db.mediaAsset.create({
    data: {
      storageKey,
      mimeType: "image/png",
      byteSize: bytes.byteLength,
      width: metadata.width ?? diagram.width,
      height: metadata.height ?? diagram.height,
      checksumSha256: createHash("sha256").update(bytes).digest("hex"),
      originalFilename: `${diagram.key}.png`,
      altText: diagram.altText,
      caption: diagram.caption,
      longDescription: diagram.longDescription,
      purpose: "DIAGRAM",
      visibility: "PUBLIC",
      status: "READY",
      uploadedById: context.uploadedById,
      sourceId: context.sourceId,
      author: DEMO_AUTHOR,
      copyrightStatus: "OWNED",
      isDemo: true,
    },
    select: { id: true },
  });
  return created.id;
}
