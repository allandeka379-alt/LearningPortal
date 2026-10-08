import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readFile, rename, rm, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { AppError } from "./errors";
import { getEnv } from "./env";
import { S3Client, type S3ClientConfig } from "./s3";

/**
 * Object storage behind one small driver interface (ARCHITECTURE §3.11). Bytes live in storage; metadata, ownership
 * and visibility live in `MediaAsset` rows (`src/server/lib/uploads.ts`), so nothing else ever holds a raw key.
 *
 * - `local` ({@link LocalDriver}): files under `./storage` (gitignored). Development, or one host whose web and worker
 *   containers share a volume.
 * - `s3` ({@link S3Driver}): any S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2, MinIO) via the SigV4
 *   client in ./s3.ts. Required once web and worker run on more than one host.
 *
 * Keys are GENERATED ({@link generateStorageKey}) and validated against {@link STORAGE_KEY_PATTERN} before any file
 * system access: lower-case `prefix/yyyy/mm/<uuid>[-variant].ext` only, so `..`, absolute paths, backslashes and
 * user-chosen names can never reach the driver (path traversal safe by construction). Random v4 UUIDs make keys
 * unguessable.
 */

/** `prefix/yyyy/mm/<uuid v4>[-variant].ext`, e.g. `content/2026/10/3f2a…-9c1e.webp` or `…-w640.webp`. */
export const STORAGE_KEY_PATTERN =
  /^[a-z][a-z0-9-]{0,31}\/\d{4}\/\d{2}\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}(-[a-z0-9]{1,16})?\.[a-z0-9]{1,8}$/;

const PREFIX_PATTERN = /^[a-z][a-z0-9-]{0,31}$/;
const EXTENSION_PATTERN = /^[a-z0-9]{1,8}$/;

/** True when `key` is a well-formed generated storage key. */
export function isValidStorageKey(key: string): boolean {
  return STORAGE_KEY_PATTERN.test(key);
}

function assertKey(key: string): void {
  if (!isValidStorageKey(key)) throw new AppError("BAD_REQUEST", "Invalid storage key.", { details: { key } });
}

/**
 * Generates a fresh, unguessable storage key.
 *
 * @param prefix - area, e.g. "content", "avatar", "solver" (lower-case, `^[a-z][a-z0-9-]{0,31}$`).
 * @param extension - file extension without the dot, e.g. "webp".
 */
export function generateStorageKey(prefix: string, extension: string, now: Date = new Date()): string {
  if (!PREFIX_PATTERN.test(prefix)) throw new RangeError(`generateStorageKey: invalid prefix "${prefix}"`);
  const ext = extension.toLowerCase();
  if (!EXTENSION_PATTERN.test(ext)) throw new RangeError(`generateStorageKey: invalid extension "${extension}"`);
  const year = String(now.getUTCFullYear()).padStart(4, "0");
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${prefix}/${year}/${month}/${randomUUID()}.${ext}`;
}

/** Storage backend contract. Implementations must validate keys with {@link isValidStorageKey}. */
export interface StorageDriver {
  readonly name: "local" | "s3";
  /** Stores `bytes` under `key`, replacing any existing object. */
  put(key: string, bytes: Uint8Array, contentType: string): Promise<void>;
  /** The whole object, or `null` when it does not exist. */
  get(key: string): Promise<Uint8Array | null>;
  /** A web stream of the object (for responses), or `null` when it does not exist. */
  getStream(key: string): Promise<{ stream: ReadableStream<Uint8Array>; size: number } | null>;
  /** Removes the object; deleting a missing object is not an error. */
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
}

function isNotFound(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: unknown }).code === "ENOENT";
}

/**
 * Local file-system driver rooted at `root` (default `<cwd>/storage`). Writes are atomic (temp file + rename), so a
 * reader never sees a half-written file.
 */
export class LocalDriver implements StorageDriver {
  readonly name = "local" as const;
  readonly root: string;

  constructor(root: string = path.join(process.cwd(), "storage")) {
    this.root = path.resolve(root);
  }

  /** Absolute path for a validated key; refuses anything that would resolve outside the root. */
  resolvePath(key: string): string {
    assertKey(key);
    const resolved = path.resolve(this.root, ...key.split("/"));
    if (!resolved.startsWith(this.root + path.sep)) {
      throw new AppError("BAD_REQUEST", "Invalid storage key.", { details: { key } });
    }
    return resolved;
  }

  async put(key: string, bytes: Uint8Array, contentType: string): Promise<void> {
    void contentType; // the MediaAsset row holds the sniffed type; files carry no metadata
    const target = this.resolvePath(key);
    await mkdir(path.dirname(target), { recursive: true });
    const temp = `${target}.${randomBytes(6).toString("hex")}.tmp`;
    try {
      await writeFile(temp, bytes, { flag: "wx" });
      await rename(temp, target);
    } catch (error) {
      await rm(temp, { force: true });
      throw error;
    }
  }

  async get(key: string): Promise<Uint8Array | null> {
    try {
      return new Uint8Array(await readFile(this.resolvePath(key)));
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  }

  async getStream(key: string): Promise<{ stream: ReadableStream<Uint8Array>; size: number } | null> {
    const target = this.resolvePath(key);
    try {
      const info = await stat(target);
      if (!info.isFile()) return null;
      const stream = Readable.toWeb(createReadStream(target)) as ReadableStream<Uint8Array>;
      return { stream, size: info.size };
    } catch (error) {
      if (isNotFound(error)) return null;
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await unlink(this.resolvePath(key));
    } catch (error) {
      if (!isNotFound(error)) throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return (await stat(this.resolvePath(key))).isFile();
    } catch (error) {
      if (isNotFound(error)) return false;
      throw error;
    }
  }
}

/** S3 settings from the environment, or `null` when any required `S3_*` variable is missing. */
export function s3ConfigFromEnv(): S3ClientConfig | null {
  const env = getEnv();
  if (!env.S3_BUCKET || !env.S3_REGION || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) return null;
  return {
    bucket: env.S3_BUCKET,
    region: env.S3_REGION,
    ...(env.S3_ENDPOINT ? { endpoint: env.S3_ENDPOINT } : {}),
    forcePathStyle: env.S3_FORCE_PATH_STYLE,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      ...(env.S3_SESSION_TOKEN ? { sessionToken: env.S3_SESSION_TOKEN } : {}),
    },
  };
}

/**
 * S3-compatible driver (ARCHITECTURE §3.11), selected by `STORAGE_DRIVER=s3`. One PRIVATE bucket: objects are never
 * public; `/api/media` applies `MediaAsset` visibility and the CDN caches the PUBLIC responses. Object keys are the
 * same validated storage keys as on disk.
 *
 * Without an explicit config it reads the `S3_*` environment on first use and throws
 * `AppError("INTERNAL", "S3 storage not configured")` when it is incomplete (env validation already refuses to boot
 * in that case; this guards direct construction).
 */
export class S3Driver implements StorageDriver {
  readonly name = "s3" as const;
  readonly #config: S3ClientConfig | undefined;
  #client: S3Client | undefined;

  constructor(config?: S3ClientConfig) {
    this.#config = config;
  }

  #s3(): S3Client {
    if (this.#client) return this.#client;
    const config = this.#config ?? s3ConfigFromEnv();
    if (!config) throw new AppError("INTERNAL", "S3 storage not configured");
    this.#client = new S3Client(config);
    return this.#client;
  }

  async put(key: string, bytes: Uint8Array, contentType: string): Promise<void> {
    const s3 = this.#s3();
    assertKey(key);
    await s3.putObject(key, bytes, contentType);
  }

  async get(key: string): Promise<Uint8Array | null> {
    const s3 = this.#s3();
    assertKey(key);
    const object = await s3.getObject(key);
    return object ? new Uint8Array(await new Response(object.body).arrayBuffer()) : null;
  }

  async getStream(key: string): Promise<{ stream: ReadableStream<Uint8Array>; size: number } | null> {
    const s3 = this.#s3();
    assertKey(key);
    const object = await s3.getObject(key);
    return object ? { stream: object.body, size: object.size } : null;
  }

  async delete(key: string): Promise<void> {
    const s3 = this.#s3();
    assertKey(key);
    await s3.deleteObject(key);
  }

  async exists(key: string): Promise<boolean> {
    const s3 = this.#s3();
    assertKey(key);
    return s3.headObject(key);
  }
}

let driver: StorageDriver | undefined;

/** The process-wide storage driver selected by `STORAGE_DRIVER` (`local` | `s3`). */
export function getStorage(): StorageDriver {
  driver ??= getEnv().STORAGE_DRIVER === "s3" ? new S3Driver() : new LocalDriver();
  return driver;
}

/** Replaces the process-wide driver (tests use a temp-dir {@link LocalDriver}); `null` restores env selection. */
export function setStorageDriver(next: StorageDriver | null): void {
  driver = next ?? undefined;
}
