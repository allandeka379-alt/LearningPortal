import "server-only";
import type { Actor } from "@/server/auth/actor";
import { hasPermission } from "@/server/auth/permissions";
import { assertEntitlement } from "@/server/billing/entitlements";
import { MAX_IMPORT_FILE_BYTES } from "@/server/cms/imports/constants";
import { uploadImport } from "@/server/cms/imports/service";
import { uploadMedia } from "@/server/cms/media/service";
import { infraActor } from "@/server/cms/users/access";
import { assertGuardianConsent } from "@/server/family/consent-gate";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { getAiLimits } from "@/server/lib/settings";
import type { StorageDriver } from "@/server/lib/storage";
import { assertSniffedType, createMediaAsset, UPLOAD_POLICIES, type MultipartUpload, type SniffedMimeType } from "@/server/lib/uploads";

/**
 * Streamed uploads (`POST /api/v1/uploads?purpose=…`, ARCHITECTURE §3.11): files larger than the Server Action body
 * limit (6 MB) go through a route handler that reads the body as a stream with a hard per-purpose byte cap. This module
 * decides, per purpose, who may upload (checked BEFORE the body is read), the cap, the accepted (sniffed) types and the
 * service that stores the file:
 *
 * | purpose  | who                                        | cap                                    | stored as                   |
 * |----------|--------------------------------------------|----------------------------------------|-----------------------------|
 * | `media`  | `content.draft` (platform scope)           | 10 MB (content images)                 | MediaAsset (media library)  |
 * | `import` | `imports.run` + `content.draft` (platform) | 20 MB (MAX_IMPORT_FILE_BYTES)          | ContentImport (dry run)     |
 * | `solver` | students with `ai_solver` + `ai_images`    | `ai.limits.maxImageBytes` (≤ 5 MB)     | MediaAsset (SOLVER_UPLOAD)  |
 */

export const UPLOAD_ROUTE_PURPOSES = ["media", "import", "solver"] as const;
export type UploadRoutePurpose = (typeof UPLOAD_ROUTE_PURPOSES)[number];

const MEDIA_TYPES: readonly SniffedMimeType[] = UPLOAD_POLICIES.CONTENT_IMAGE.allowed;
const IMPORT_TYPES: readonly SniffedMimeType[] = UPLOAD_POLICIES.IMPORT_FILE.allowed;
const SOLVER_TYPES: readonly SniffedMimeType[] = UPLOAD_POLICIES.SOLVER_UPLOAD.allowed;

/**
 * Refuses callers who may not upload for `purpose` (before any byte of the body is read).
 *
 * @throws AppError FORBIDDEN (also: a minor without the guardian consent AI processing needs) | ENTITLEMENT_REQUIRED
 */
export async function assertMayUpload(actor: Actor, purpose: UploadRoutePurpose): Promise<void> {
  switch (purpose) {
    case "media":
      if (!hasPermission(actor, "content.draft", "all")) throw AppError.forbidden("You can't add files to the media library.");
      return;
    case "import":
      if (!hasPermission(actor, "imports.run", "restricted") || !hasPermission(actor, "content.draft", "all")) {
        throw AppError.forbidden("You can't upload content imports.");
      }
      return;
    case "solver":
      if (!actor.roles.includes("STUDENT")) throw AppError.forbidden("Only students can upload question photos.");
      await assertEntitlement(actor, "ai_solver");
      await assertEntitlement(actor, "ai_images");
      // Solver photos exist only to be sent to the AI provider: refused where a minor's guardian consent does not allow it.
      await assertGuardianConsent(actor, "ai_processing");
      return;
  }
}

/** Hard byte cap of the FILE for `purpose` (the request may carry a little multipart overhead on top). */
export async function uploadCapFor(purpose: UploadRoutePurpose): Promise<number> {
  switch (purpose) {
    case "media":
      return UPLOAD_POLICIES.CONTENT_IMAGE.maxBytes;
    case "import":
      return Math.min(MAX_IMPORT_FILE_BYTES, UPLOAD_POLICIES.IMPORT_FILE.maxBytes);
    case "solver": {
      const { maxImageBytes } = await getAiLimits();
      // The SOLVER_UPLOAD policy stays the ceiling: createMediaAsset enforces it whatever the setting says.
      return Math.min(maxImageBytes, UPLOAD_POLICIES.SOLVER_UPLOAD.maxBytes);
    }
  }
}

/** Accepted magic-byte types for `purpose` (checked on the bytes, never the declared Content-Type). */
export function allowedTypesFor(purpose: UploadRoutePurpose): readonly SniffedMimeType[] {
  return purpose === "media" ? MEDIA_TYPES : purpose === "import" ? IMPORT_TYPES : SOLVER_TYPES;
}

export type UploadRouteResult =
  | { kind: "media"; id: string; duplicateOf: string | null; snippet: string; href: string }
  | { kind: "import"; id: string; status: string; duplicates: number; href: string }
  | { kind: "solver"; id: string; mimeType: string; byteSize: number };

function text(fields: ReadonlyMap<string, string>, name: string): string | null {
  const value = fields.get(name)?.trim();
  return value ? value : null;
}

/**
 * Stores a read and type-checked upload with the purpose's service (validation, licensing rules, re-encoding, rate
 * limit and audit all happen there). Returns the new MediaAsset / ContentImport id.
 *
 * @throws AppError FORBIDDEN | VALIDATION | RATE_LIMITED | CONFLICT
 */
export async function storeUpload(
  actor: Actor,
  purpose: UploadRoutePurpose,
  upload: MultipartUpload,
  request: AuditRequestInfo | null,
  deps: { storage?: StorageDriver } = {},
): Promise<UploadRouteResult> {
  assertSniffedType(upload.file.bytes, allowedTypesFor(purpose));
  const { fields, file } = upload;
  switch (purpose) {
    case "media": {
      const result = await uploadMedia(
        actor,
        file,
        {
          purpose: text(fields, "purpose") ?? undefined,
          altText: text(fields, "altText") ?? "",
          caption: text(fields, "caption"),
          longDescription: text(fields, "longDescription"),
          visibility: text(fields, "visibility") ?? undefined,
          copyrightStatus: text(fields, "copyrightStatus") ?? undefined,
          sourceId: text(fields, "sourceId"),
          licenceCode: text(fields, "licenceCode"),
          attribution: text(fields, "attribution"),
          author: text(fields, "author"),
          sourceUrl: text(fields, "sourceUrl"),
        },
        { request },
        deps,
      );
      return { kind: "media", id: result.id, duplicateOf: result.duplicateOf, snippet: result.snippet, href: `/admin/media/${result.id}` };
    }
    case "import": {
      const result = await uploadImport(
        actor,
        file,
        {
          entityType: text(fields, "entityType"),
          subjectId: text(fields, "subjectId"),
          syllabusId: text(fields, "syllabusId") ?? "",
          sourceId: text(fields, "sourceId"),
          licenceCode: text(fields, "licenceCode"),
          attribution: text(fields, "attribution"),
          author: text(fields, "author"),
          sourceUrl: text(fields, "sourceUrl"),
          defaultDifficulty: text(fields, "defaultDifficulty"),
          defaultAccessTier: text(fields, "defaultAccessTier"),
          rightsConfirmed: ["on", "true", "1"].includes(fields.get("rightsConfirmed") ?? ""),
        },
        { request },
        deps,
      );
      return { kind: "import", id: result.id, status: result.status, duplicates: result.duplicates.length, href: `/admin/imports/${result.id}` };
    }
    case "solver": {
      const asset = await createMediaAsset(infraActor(actor), file, { purpose: "SOLVER_UPLOAD", visibility: "OWNER_ONLY" }, deps);
      return { kind: "solver", id: asset.id, mimeType: asset.mimeType, byteSize: asset.byteSize };
    }
  }
}
