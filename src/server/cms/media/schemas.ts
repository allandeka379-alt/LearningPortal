import { z } from "zod";

/**
 * Validation for the media library (§27 licensing, §43 alt text). Isomorphic: the upload form shows the same rules.
 * The database CHECKs (alt text for content images, no PUBLIC file with unverified copyright, licence evidence) are
 * mirrored here so editors get field errors instead of constraint failures.
 */

export const LIBRARY_PURPOSES = ["CONTENT_IMAGE", "DIAGRAM"] as const;
export type LibraryPurpose = (typeof LIBRARY_PURPOSES)[number];

export const LIBRARY_VISIBILITIES = ["AUTHENTICATED", "PUBLIC"] as const;
export const MEDIA_COPYRIGHT_STATUSES = ["OWNED", "LICENSED", "PUBLIC_DOMAIN", "OPEN_LICENSE", "UNVERIFIED"] as const;

const optional = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : value ?? null),
    z.string().max(max, `Use at most ${max} characters.`).nullable(),
  );

const optionalUuid = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value ?? null),
  z.uuid("Choose a valid source.").nullable(),
);

const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : value ?? null),
  z.url({ protocol: /^https?$/, message: "Use a full http(s) link." }).max(2_000).nullable(),
);

/** Metadata shared by upload and edit. */
export const mediaMetadataSchema = z
  .object({
    altText: z.preprocess(
      (value) => (typeof value === "string" ? value.trim() : value),
      z
        .string({ message: "Describe the image for screen-reader users." })
        .min(3, "Describe the image for screen-reader users.")
        .max(1_000, "Keep the description under 1,000 characters."),
    ),
    caption: optional(1_000),
    longDescription: optional(10_000),
    visibility: z.enum(LIBRARY_VISIBILITIES).default("AUTHENTICATED"),
    copyrightStatus: z.enum(MEDIA_COPYRIGHT_STATUSES).default("UNVERIFIED"),
    sourceId: optionalUuid,
    licenceCode: optional(64),
    attribution: optional(1_000),
    author: optional(200),
    sourceUrl: optionalUrl,
  })
  .superRefine((value, ctx) => {
    if (value.visibility === "PUBLIC" && value.copyrightStatus === "UNVERIFIED") {
      ctx.addIssue({ code: "custom", path: ["copyrightStatus"], message: "Clear the copyright status before making this file public." });
    }
    if (value.copyrightStatus === "LICENSED" && !value.sourceId) {
      ctx.addIssue({ code: "custom", path: ["sourceId"], message: "Licensed files must name their content source." });
    }
    if (value.copyrightStatus === "OPEN_LICENSE" && !value.sourceId && !value.licenceCode) {
      ctx.addIssue({ code: "custom", path: ["licenceCode"], message: "Open-licensed files need a source or a licence code." });
    }
  });

export const uploadMediaSchema = z.object({ purpose: z.enum(LIBRARY_PURPOSES).default("CONTENT_IMAGE") }).and(mediaMetadataSchema);

export const mediaIdSchema = z.object({ id: z.uuid("Choose a valid file.") });

export const updateMediaSchema = mediaIdSchema.and(mediaMetadataSchema);

export const mediaFilterSchema = z.object({
  q: z.string().trim().max(200).optional(),
  purpose: z.enum(LIBRARY_PURPOSES).optional(),
  usage: z.enum(["used", "unused"]).optional(),
  cursor: z.string().max(500).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(24),
});

/** Markdown snippet that embeds an asset in lesson / flashcard / question text (docs/CONTENT_AUTHORING.md §5). */
export function assetSnippet(id: string, altText: string | null | undefined, caption?: string | null): string {
  const alt = (altText ?? "").replace(/[[\]\n\r]+/g, " ").trim();
  const title = caption ? ` "${caption.replace(/["\n\r]+/g, " ").trim()}"` : "";
  return `![${alt}](asset:${id}${title})`;
}
