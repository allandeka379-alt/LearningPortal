import "server-only";
import { createHash } from "node:crypto";
import sharp from "sharp";
import type {
  CopyrightStatus,
  MediaAsset,
  MediaPurpose,
  MediaVisibility,
  Role,
} from "@/generated/prisma/client";
import { db } from "@/server/db";
import type { InfraActor } from "./audit";
import { AppError } from "./errors";
import { logger } from "./logger";
import { assertRateLimit, rateLimits } from "./rate-limit";
import { generateStorageKey, getStorage, isValidStorageKey, type StorageDriver } from "./storage";

/**
 * Secure uploads (§39 "secure file uploads"; ARCHITECTURE §3.11, §5.9).
 *
 * - The type is decided by MAGIC-BYTE SNIFFING ({@link sniffMimeType}); the client's file name and `Content-Type` are
 *   never trusted.
 * - Size caps per purpose; images are decoded with sharp (dimension read, decompression-bomb pixel limit), then
 *   RE-ENCODED: auto-oriented, EXIF/GPS and every other metadata block stripped (most students are minors), and
 *   downscaled to the purpose's long-edge limit.
 * - SHA-256 checksum of the stored bytes; random, generated storage keys; one `MediaAsset` row per file with the
 *   sniffed type, size, owner, purpose and visibility (database CHECKs enforce purpose/visibility and copyright rules).
 * - Uploads are rate limited per user (`uploads` preset).
 */

const MB = 1024 * 1024;
/** Decompression-bomb guard for sharp: refuse images above 100 megapixels before decoding. */
const MAX_INPUT_PIXELS = 100_000_000;
/** Absolute dimension guard for any accepted image (long edge, px). */
const MAX_IMAGE_EDGE = 12_000;

/** Types {@link sniffMimeType} can recognise, with the extension used for storage keys. */
export const SNIFFABLE_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/heic": "heic",
  "application/pdf": "pdf",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/json": "json",
  "text/csv": "csv",
} as const;

export type SniffedMimeType = keyof typeof SNIFFABLE_TYPES;

const IMAGE_TYPES = new Set<SniffedMimeType>(["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif", "image/heic"]);

function ascii(bytes: Uint8Array, start: number, length: number): string {
  if (bytes.length < start + length) return "";
  return String.fromCharCode(...bytes.subarray(start, start + length));
}

function startsWith(bytes: Uint8Array, signature: readonly number[], offset = 0): boolean {
  if (bytes.length < offset + signature.length) return false;
  return signature.every((value, index) => bytes[offset + index] === value);
}

/** ISO-BMFF (`ftyp`) brands: major brand + compatible brands of the first box. */
function isoBrands(bytes: Uint8Array): Set<string> | null {
  if (ascii(bytes, 4, 4) !== "ftyp") return null;
  const boxSize = ((bytes[0] ?? 0) << 24) | ((bytes[1] ?? 0) << 16) | ((bytes[2] ?? 0) << 8) | (bytes[3] ?? 0);
  const end = Math.min(Math.max(boxSize, 16), bytes.length, 256);
  const brands = new Set<string>([ascii(bytes, 8, 4)]);
  for (let offset = 16; offset + 4 <= end; offset += 4) brands.add(ascii(bytes, offset, 4));
  return brands;
}

const UTF8 = new TextDecoder("utf-8", { fatal: true });

/** Decodes strictly as UTF-8 text with no binary control characters; `null` when the bytes are not plain text. */
function asPlainText(bytes: Uint8Array): string | null {
  for (const byte of bytes) {
    if (byte < 0x09 || (byte > 0x0d && byte < 0x20 && byte !== 0x1b) || byte === 0x7f) return null;
  }
  try {
    return UTF8.decode(bytes);
  } catch {
    return null;
  }
}

/**
 * Identifies a file from its leading bytes (and, for ZIP/text formats, its content). Returns `null` for anything
 * unrecognised. Never looks at names or declared types.
 */
export function sniffMimeType(bytes: Uint8Array): SniffedMimeType | null {
  if (bytes.length === 0) return null;
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "image/jpeg";
  if (ascii(bytes, 0, 6) === "GIF87a" || ascii(bytes, 0, 6) === "GIF89a") return "image/gif";
  if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") return "image/webp";
  const brands = isoBrands(bytes);
  if (brands) {
    if (brands.has("avif") || brands.has("avis")) return "image/avif";
    if (["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1"].some((brand) => brands.has(brand))) return "image/heic";
    return null;
  }
  if (ascii(bytes, 0, 5) === "%PDF-") return "application/pdf";
  if (ascii(bytes, 0, 3) === "ID3" || (bytes[0] === 0xff && [0xfb, 0xfa, 0xf3, 0xf2].includes(bytes[1] ?? 0))) {
    return "audio/mpeg";
  }
  if (ascii(bytes, 0, 4) === "OggS") return "audio/ogg";
  if (startsWith(bytes, [0x50, 0x4b, 0x03, 0x04])) {
    return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).includes("xl/workbook.xml")
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : null;
  }
  const text = asPlainText(bytes);
  if (text === null) return null;
  const trimmed = text.replace(/^﻿/, "").trimStart();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return "application/json";
    } catch {
      // not JSON; may still be CSV-like text
    }
  }
  // Markup (SVG, HTML, XML) is never accepted as "text": it could be rendered as a document by a careless consumer.
  if (trimmed.length === 0 || trimmed.startsWith("<")) return null;
  return "text/csv";
}

export interface ValidateUploadOptions {
  /** Accepted sniffed types. */
  allowed: readonly SniffedMimeType[];
  /** Maximum size in bytes. */
  maxBytes: number;
}

/** Result of {@link validateUpload}. */
export interface ValidatedUpload {
  mimeType: SniffedMimeType;
  extension: string;
  byteSize: number;
  width: number | null;
  height: number | null;
  /** Lower-case hex SHA-256 of the bytes. */
  checksumSha256: string;
}

function rejected(message: string): AppError {
  return AppError.validation({ file: [message] }, message);
}

function sha256Hex(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function formatMb(bytes: number): string {
  const mb = bytes / MB;
  return Number.isInteger(mb) ? `${mb} MB` : `${mb.toFixed(1)} MB`;
}

/**
 * Validates raw upload bytes: non-empty, within `maxBytes`, sniffed type in `allowed`; images must decode (sharp
 * metadata) within the pixel and edge limits.
 *
 * @throws AppError VALIDATION with `fieldErrors.file` (safe to show the user).
 */
export async function validateUpload(bytes: Uint8Array, options: ValidateUploadOptions): Promise<ValidatedUpload> {
  if (bytes.byteLength === 0) throw rejected("The file is empty.");
  if (bytes.byteLength > options.maxBytes) throw rejected(`The file is too large (maximum ${formatMb(options.maxBytes)}).`);
  const mimeType = sniffMimeType(bytes);
  if (mimeType === null || !options.allowed.includes(mimeType)) throw rejected("This type of file is not allowed here.");

  let width: number | null = null;
  let height: number | null = null;
  if (IMAGE_TYPES.has(mimeType)) {
    try {
      const metadata = await sharp(bytes, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
      width = metadata.autoOrient?.width ?? metadata.width ?? null;
      height = metadata.autoOrient?.height ?? metadata.height ?? null;
    } catch {
      throw rejected("The image could not be read. Please upload a PNG, JPEG or WebP image.");
    }
    if (!width || !height) throw rejected("The image could not be read. Please upload a PNG, JPEG or WebP image.");
    if (width > MAX_IMAGE_EDGE || height > MAX_IMAGE_EDGE || width * height > MAX_INPUT_PIXELS) {
      throw rejected("The image dimensions are too large.");
    }
  }
  return {
    mimeType,
    extension: SNIFFABLE_TYPES[mimeType],
    byteSize: bytes.byteLength,
    width,
    height,
    checksumSha256: sha256Hex(bytes),
  };
}

/**
 * Magic-byte type check on its own (no decode): the sniffed type of `bytes` must be in `allowed`. Lets a route refuse a
 * wrong file type before any database or storage work; {@link validateUpload} repeats it with the full checks.
 *
 * @throws AppError VALIDATION with `fieldErrors.file`.
 */
export function assertSniffedType(bytes: Uint8Array, allowed: readonly SniffedMimeType[]): SniffedMimeType {
  if (bytes.byteLength === 0) throw rejected("The file is empty.");
  const mimeType = sniffMimeType(bytes);
  if (mimeType === null || !allowed.includes(mimeType)) throw rejected("This type of file is not allowed here.");
  return mimeType;
}

// ---------------------------------------------------------------------------------------------------------------------
// Streamed multipart uploads (route handlers; Server Actions keep their 6 MB body limit)
// ---------------------------------------------------------------------------------------------------------------------

/** Room for multipart boundaries, part headers and the text fields sent with the file. */
export const MULTIPART_OVERHEAD_BYTES = 256 * 1024;
/** Longest accepted text field of an upload form (long image descriptions are 10,000 characters). */
const MAX_UPLOAD_FIELD_CHARS = 20_000;

export interface MultipartUpload {
  file: UploadFile & { bytes: Uint8Array };
  /** The text fields sent with the file (repeated names keep the last value). */
  fields: ReadonlyMap<string, string>;
}

function fileTooLarge(maxFileBytes: number): AppError {
  return rejected(`The file is too large (maximum ${formatMb(maxFileBytes)}).`);
}

/**
 * Reads a `multipart/form-data` upload (one `file` part plus text fields) with a HARD byte cap enforced while the body
 * streams in: a declared `Content-Length` over the cap is refused before reading, and a body that grows past
 * `maxFileBytes` + {@link MULTIPART_OVERHEAD_BYTES} is cut off mid-stream (the client's upload is cancelled), so an
 * oversized or lying upload never sits in memory. The file itself must then be at most `maxFileBytes`. The type is
 * NOT trusted from the part headers: check the bytes with {@link assertSniffedType} / {@link validateUpload}.
 *
 * @throws AppError BAD_REQUEST (not multipart, unreadable) | VALIDATION (`fieldErrors.file`: missing, empty, too large)
 */
export async function readMultipartUpload(request: Request, options: { maxFileBytes: number }): Promise<MultipartUpload> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^multipart\/form-data\s*;\s*boundary=/i.test(contentType.trim())) {
    throw new AppError("BAD_REQUEST", "Send the file as multipart/form-data.");
  }
  const limit = options.maxFileBytes + MULTIPART_OVERHEAD_BYTES;
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > limit) throw fileTooLarge(options.maxFileBytes);
  if (request.body === null) throw rejected("Choose a file to upload.");

  let received = 0;
  const capped = request.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        received += chunk.byteLength;
        // Erroring the stream also cancels the request body: the rest of the upload is never read.
        if (received > limit) controller.error(new RangeError("upload too large"));
        else controller.enqueue(chunk);
      },
    }),
  );
  let form: FormData;
  try {
    form = await new Response(capped, { headers: { "content-type": contentType } }).formData();
  } catch {
    if (received > limit) throw fileTooLarge(options.maxFileBytes);
    throw new AppError("BAD_REQUEST", "The upload could not be read. Try again.");
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) throw rejected("Choose a file to upload.");
  if (file.size > options.maxFileBytes) throw fileTooLarge(options.maxFileBytes);
  const fields = new Map<string, string>();
  for (const [name, value] of form.entries()) {
    if (name === "file" || typeof value !== "string") continue;
    fields.set(name, value.slice(0, MAX_UPLOAD_FIELD_CHARS));
  }
  return { file: { bytes: new Uint8Array(await file.arrayBuffer()), filename: file.name || null }, fields };
}

/**
 * Re-encodes a raster image: applies EXIF orientation, strips ALL metadata (EXIF, GPS, XMP, ICC comments), and
 * downscales to `maxEdge` (never enlarges). The output format matches the input; GIFs become PNG (first frame).
 */
export async function sanitizeImage(
  bytes: Uint8Array,
  mimeType: SniffedMimeType,
  maxEdge: number,
): Promise<{ bytes: Uint8Array; mimeType: SniffedMimeType; width: number; height: number }> {
  let pipeline = sharp(bytes, { limitInputPixels: MAX_INPUT_PIXELS })
    .autoOrient()
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true });
  let outType: SniffedMimeType = mimeType;
  switch (mimeType) {
    case "image/jpeg":
      pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
      break;
    case "image/webp":
      pipeline = pipeline.webp({ quality: 85 });
      break;
    case "image/avif":
      pipeline = pipeline.avif({ quality: 60 });
      break;
    case "image/png":
    case "image/gif":
      pipeline = pipeline.png({ compressionLevel: 9 });
      outType = "image/png";
      break;
    default:
      throw new Error(`sanitizeImage: unsupported type ${mimeType}`);
  }
  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });
  return { bytes: new Uint8Array(data), mimeType: outType, width: info.width, height: info.height };
}

// ---------------------------------------------------------------------------------------------------------------------
// Upload policies per purpose and MediaAsset creation
// ---------------------------------------------------------------------------------------------------------------------

/** Platform roles allowed to upload a purpose; `"any"` = any signed-in user. System actors may upload every purpose. */
type UploaderRoles = readonly Role[] | "any";

export interface UploadPolicy {
  allowed: readonly SniffedMimeType[];
  maxBytes: number;
  /** Long-edge limit for re-encoded images (px). */
  maxEdge: number;
  defaultVisibility: MediaVisibility;
  visibilities: readonly MediaVisibility[];
  /** Storage key prefix. */
  prefix: string;
  roles: UploaderRoles;
}

const WEB_IMAGES: readonly SniffedMimeType[] = ["image/png", "image/jpeg", "image/webp"];
const CONTENT_ROLES: readonly Role[] = ["CONTENT_EDITOR", "ADMIN", "SUPER_ADMIN"];

/** Per-purpose upload rules (ARCHITECTURE §3.11). Visibility rules mirror the MediaAsset CHECKs. */
export const UPLOAD_POLICIES: Readonly<Record<MediaPurpose, UploadPolicy>> = {
  CONTENT_IMAGE: {
    allowed: [...WEB_IMAGES, "image/avif"],
    maxBytes: 10 * MB,
    maxEdge: 4000,
    defaultVisibility: "AUTHENTICATED",
    visibilities: ["PUBLIC", "AUTHENTICATED"],
    prefix: "content",
    roles: CONTENT_ROLES,
  },
  DIAGRAM: {
    allowed: [...WEB_IMAGES, "image/avif"],
    maxBytes: 10 * MB,
    maxEdge: 4000,
    defaultVisibility: "AUTHENTICATED",
    visibilities: ["PUBLIC", "AUTHENTICATED"],
    prefix: "content",
    roles: CONTENT_ROLES,
  },
  CONTENT_AUDIO: {
    allowed: ["audio/mpeg", "audio/ogg"],
    maxBytes: 20 * MB,
    maxEdge: 0,
    defaultVisibility: "AUTHENTICATED",
    visibilities: ["PUBLIC", "AUTHENTICATED"],
    prefix: "audio",
    roles: CONTENT_ROLES,
  },
  MARKETING_IMAGE: {
    allowed: [...WEB_IMAGES, "image/avif"],
    maxBytes: 10 * MB,
    maxEdge: 4000,
    defaultVisibility: "PUBLIC",
    visibilities: ["PUBLIC"],
    prefix: "marketing",
    roles: CONTENT_ROLES,
  },
  SCHOOL_LOGO: {
    allowed: WEB_IMAGES,
    maxBytes: 1 * MB,
    maxEdge: 1024,
    defaultVisibility: "PUBLIC",
    visibilities: ["PUBLIC"],
    prefix: "logo",
    roles: ["SCHOOL_ADMIN", "ADMIN", "SUPER_ADMIN"],
  },
  AVATAR: {
    allowed: WEB_IMAGES,
    maxBytes: 5 * MB,
    maxEdge: 512,
    defaultVisibility: "AUTHENTICATED",
    visibilities: ["AUTHENTICATED"],
    prefix: "avatar",
    roles: "any",
  },
  SOLVER_UPLOAD: {
    allowed: WEB_IMAGES,
    maxBytes: 5 * MB,
    maxEdge: 1280,
    defaultVisibility: "OWNER_ONLY",
    visibilities: ["OWNER_ONLY"],
    prefix: "solver",
    roles: "any",
  },
  IMPORT_FILE: {
    allowed: ["text/csv", "application/json", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    maxBytes: 20 * MB,
    maxEdge: 0,
    defaultVisibility: "PRIVATE",
    visibilities: ["PRIVATE"],
    prefix: "import",
    roles: [...CONTENT_ROLES, "SCHOOL_ADMIN"],
  },
  ANSWER_ATTACHMENT: {
    allowed: [...WEB_IMAGES, "application/pdf"],
    maxBytes: 5 * MB,
    maxEdge: 2000,
    defaultVisibility: "PRIVATE",
    visibilities: ["PRIVATE"],
    prefix: "attachment",
    roles: "any",
  },
  REPORT_EXPORT: {
    allowed: ["application/pdf", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    maxBytes: 20 * MB,
    maxEdge: 0,
    defaultVisibility: "PRIVATE",
    visibilities: ["PRIVATE"],
    prefix: "report",
    roles: ["SCHOOL_ADMIN", "ADMIN", "SUPER_ADMIN"],
  },
};

export interface UploadFile {
  bytes: Uint8Array;
  /** Client file name, kept (sanitised) for admin display only. */
  filename?: string | null;
}

export interface CreateMediaAssetOptions {
  purpose: MediaPurpose;
  /** Required (non-blank) for CONTENT_IMAGE and DIAGRAM (§43). */
  altText?: string | null;
  caption?: string | null;
  longDescription?: string | null;
  /** Defaults to the purpose's default visibility. */
  visibility?: MediaVisibility;
  // provenance (§27)
  copyrightStatus?: CopyrightStatus;
  sourceId?: string | null;
  licenceCode?: string | null;
  attribution?: string | null;
  author?: string | null;
  sourceUrl?: string | null;
}

/** Sanitised original file name for display: base name only, safe characters, at most 200 characters. */
export function sanitizeFilename(name: string | null | undefined): string | null {
  if (!name) return null;
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N} ._()-]+/gu, "_")
    .replace(/\s+/g, " ")
    .replace(/^[.\s]+/, "")
    .trim()
    .slice(0, 200);
  return cleaned.length > 0 ? cleaned : null;
}

function optionalText(value: string | null | undefined, max: number): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function assertMayUpload(actor: InfraActor, purpose: MediaPurpose, policy: UploadPolicy): void {
  if (actor.kind === "system") return;
  if (policy.roles === "any") return;
  if (!policy.roles.some((role) => actor.roles.includes(role))) {
    throw AppError.forbidden("You can't upload this kind of file.", { purpose });
  }
}

/**
 * Validates, sanitises and stores an uploaded file, then records it as a READY `MediaAsset`.
 *
 * Authorisation is role-based per purpose ({@link UPLOAD_POLICIES}); resource checks (e.g. "this SCHOOL_ADMIN manages
 * that school") belong to the calling service. If the database insert fails, the stored object is removed.
 *
 * @throws AppError FORBIDDEN | VALIDATION | RATE_LIMITED
 */
export async function createMediaAsset(
  actor: InfraActor,
  file: UploadFile,
  options: CreateMediaAssetOptions,
  deps: { storage?: StorageDriver } = {},
): Promise<MediaAsset> {
  const policy = UPLOAD_POLICIES[options.purpose];
  assertMayUpload(actor, options.purpose, policy);
  if (actor.kind === "user") await assertRateLimit(rateLimits.uploads(actor.userId), "Too many uploads. Please try again later.");

  const visibility = options.visibility ?? policy.defaultVisibility;
  if (!policy.visibilities.includes(visibility)) {
    throw AppError.validation({ visibility: [`This file can't be ${visibility.toLowerCase().replace("_", " ")}.`] });
  }
  const altText = optionalText(options.altText, 1_000);
  if ((options.purpose === "CONTENT_IMAGE" || options.purpose === "DIAGRAM") && altText === null) {
    throw AppError.validation({ altText: ["Describe the image for screen-reader users."] });
  }
  const copyrightStatus = options.copyrightStatus ?? (options.purpose === "SCHOOL_LOGO" ? "OWNED" : "UNVERIFIED");
  if (visibility === "PUBLIC" && copyrightStatus === "UNVERIFIED" && options.purpose !== "SCHOOL_LOGO") {
    throw AppError.validation({ copyrightStatus: ["Clear the copyright status before making this file public."] });
  }
  if (copyrightStatus === "LICENSED" && !options.sourceId) {
    throw AppError.validation({ sourceId: ["Licensed files must name their content source."] });
  }
  if (copyrightStatus === "OPEN_LICENSE" && !options.sourceId && !options.licenceCode) {
    throw AppError.validation({ licenceCode: ["Open-licensed files need a source or a licence code."] });
  }

  const validated = await validateUpload(file.bytes, { allowed: policy.allowed, maxBytes: policy.maxBytes });
  let bytes = file.bytes;
  let mimeType = validated.mimeType;
  let width = validated.width;
  let height = validated.height;
  if (IMAGE_TYPES.has(mimeType)) {
    const clean = await sanitizeImage(bytes, mimeType, policy.maxEdge);
    bytes = clean.bytes;
    mimeType = clean.mimeType;
    width = clean.width;
    height = clean.height;
  }

  const storage = deps.storage ?? getStorage();
  const storageKey = generateStorageKey(policy.prefix, SNIFFABLE_TYPES[mimeType]);
  await storage.put(storageKey, bytes, mimeType);
  try {
    return await db.mediaAsset.create({
      data: {
        storageKey,
        mimeType,
        byteSize: bytes.byteLength,
        width,
        height,
        checksumSha256: sha256Hex(bytes),
        originalFilename: sanitizeFilename(file.filename),
        altText,
        caption: optionalText(options.caption, 1_000),
        longDescription: optionalText(options.longDescription, 10_000),
        purpose: options.purpose,
        visibility,
        status: "READY",
        uploadedById: actor.kind === "user" ? actor.userId : null,
        sourceId: options.sourceId ?? null,
        author: optionalText(options.author, 200),
        copyrightStatus,
        licenceCode: optionalText(options.licenceCode, 64),
        attribution: optionalText(options.attribution, 1_000),
        sourceUrl: optionalText(options.sourceUrl, 2_000),
      },
    });
  } catch (error) {
    await storage.delete(storageKey).catch((cleanupError: unknown) => {
      logger.error("orphaned upload could not be removed", { storageKey, err: cleanupError });
    });
    throw error;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Serving
// ---------------------------------------------------------------------------------------------------------------------

/** Metadata the media route needs to serve a file. */
export type ServableMedia = Pick<MediaAsset, "id" | "storageKey" | "mimeType" | "byteSize" | "checksumSha256">;

/**
 * Looks up a READY, PUBLIC media asset by storage key. Returns `null` for malformed keys, unknown keys and every
 * non-public asset alike, so callers cannot probe for the existence of private files.
 */
export async function findPublicMedia(key: string): Promise<ServableMedia | null> {
  if (!isValidStorageKey(key)) return null;
  return db.mediaAsset.findFirst({
    where: { storageKey: key, status: "READY", visibility: "PUBLIC", deletedAt: null },
    select: { id: true, storageKey: true, mimeType: true, byteSize: true, checksumSha256: true },
  });
}

/** A media asset this route may serve, with the visibility that decides its caching. */
export type AccessibleMedia = ServableMedia & { visibility: MediaVisibility };

/** The signed-in reader of a media URL (resolved lazily, only for non-public assets). */
export interface MediaViewer {
  userId: string;
}

/**
 * Looks up a READY media asset by storage key and returns it only when the viewer may read it directly:
 * - PUBLIC: anyone;
 * - AUTHENTICATED: any signed-in viewer (premium content images, avatars);
 * - PRIVATE / OWNER_ONLY: the uploader only. Other authorised readers (class teacher for an answer attachment, school
 *   admins for a report export, break-glass) must go through the owning service, never this generic lookup.
 *
 * `resolveViewer` is called only for non-public assets, so public media never costs a session lookup. Every refusal is
 * the same `null` as an unknown key, so callers cannot probe for private files.
 */
export async function findServableMedia(
  key: string,
  resolveViewer: () => Promise<MediaViewer | null>,
): Promise<AccessibleMedia | null> {
  if (!isValidStorageKey(key)) return null;
  const asset = await db.mediaAsset.findFirst({
    where: { storageKey: key, status: "READY", deletedAt: null },
    select: { id: true, storageKey: true, mimeType: true, byteSize: true, checksumSha256: true, visibility: true, uploadedById: true },
  });
  if (!asset) return null;
  const { uploadedById, ...servable } = asset;
  if (asset.visibility === "PUBLIC") return servable;
  const viewer = await resolveViewer();
  if (!viewer) return null;
  if (asset.visibility === "AUTHENTICATED") return servable;
  return uploadedById !== null && uploadedById === viewer.userId ? servable : null;
}

/** Opens the stored bytes of an asset found by {@link findServableMedia} / {@link findPublicMedia}; `null` (logged) when the object is missing. */
export async function openMediaStream(
  asset: ServableMedia,
  storage: StorageDriver = getStorage(),
): Promise<{ stream: ReadableStream<Uint8Array>; size: number } | null> {
  const opened = await storage.getStream(asset.storageKey);
  if (!opened) logger.error("media object missing from storage", { mediaAssetId: asset.id });
  return opened;
}
