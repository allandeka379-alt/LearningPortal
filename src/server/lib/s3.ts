import "server-only";
import { createHash, createHmac } from "node:crypto";

/**
 * Minimal S3-compatible object client: AWS Signature Version 4 over `fetch`, no SDK (ARCHITECTURE §3.11; used by the
 * `s3` storage driver in ./storage.ts). Works with AWS S3, Cloudflare R2, Backblaze B2 and MinIO.
 *
 * Only what the storage driver needs: PUT, GET, HEAD and DELETE of single objects. Payloads are signed in full
 * (`x-amz-content-sha256` = SHA-256 of the body; uploads are capped at 20 MB upstream), so S3 rejects any body that was
 * altered in transit. Secrets never appear in errors or logs: failures carry the HTTP status and S3's error code only.
 *
 * Signing follows https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html and is unit-tested
 * against AWS's published examples (s3.test.ts).
 */

export interface S3Credentials {
  accessKeyId: string;
  secretAccessKey: string;
  /** Temporary credentials (STS) only. */
  sessionToken?: string;
}

export interface S3ClientConfig {
  bucket: string;
  /** e.g. `af-south-1`; `auto` for Cloudflare R2. */
  region: string;
  /** Custom endpoint origin for non-AWS providers, e.g. `https://<account>.r2.cloudflarestorage.com`. */
  endpoint?: string;
  /** Path-style URLs (`<endpoint>/<bucket>/<key>`), needed by MinIO and some S3-compatible providers. */
  forcePathStyle?: boolean;
  credentials: S3Credentials;
  /** Per-attempt timeout. Default 30 s. */
  timeoutMs?: number;
  /** Extra attempts for network errors, 5xx and 429 (all operations here are idempotent). Default 2. */
  retries?: number;
  /** Injectable for tests. */
  fetch?: typeof fetch;
  now?: () => Date;
}

export const EMPTY_PAYLOAD_SHA256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

const ALGORITHM = "AWS4-HMAC-SHA256";
const BUCKET_PATTERN = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
const REGION_PATTERN = /^[a-z0-9-]{2,32}$/;

export function sha256Hex(data: string | Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

function hmac(key: string | Uint8Array, data: string): Buffer {
  return createHmac("sha256", key).update(data, "utf8").digest();
}

/** `kSigning` = HMAC chain over date, region, service and "aws4_request". */
export function deriveSigningKey(secretAccessKey: string, date: string, region: string, service: string): Buffer {
  const kDate = hmac(`AWS4${secretAccessKey}`, date);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

/** RFC 3986 encoding as SigV4 requires: everything except `A-Z a-z 0-9 - _ . ~` (and `/` when `keepSlash`). */
export function uriEncode(value: string, keepSlash = false): string {
  let out = "";
  for (const byte of Buffer.from(value, "utf8")) {
    const char = String.fromCharCode(byte);
    if (/[A-Za-z0-9\-_.~]/.test(char) || (keepSlash && char === "/")) out += char;
    else out += `%${byte.toString(16).toUpperCase().padStart(2, "0")}`;
  }
  return out;
}

/** `20130524T000000Z` */
export function amzDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export interface SignableRequest {
  method: string;
  url: URL;
  /** Headers to sign (and send). `host`, `x-amz-date`, `x-amz-content-sha256` and the token are added. */
  headers?: Record<string, string>;
  /** Hex SHA-256 of the body, or `UNSIGNED-PAYLOAD`. */
  payloadHash: string;
}

export interface SigningContext {
  credentials: S3Credentials;
  region: string;
  service?: string;
  now: Date;
}

function canonicalQuery(url: URL): string {
  const pairs: [string, string][] = [];
  for (const [key, value] of url.searchParams) pairs.push([uriEncode(key), uriEncode(value)]);
  pairs.sort(([ak, av], [bk, bv]) => (ak < bk ? -1 : ak > bk ? 1 : av < bv ? -1 : av > bv ? 1 : 0));
  return pairs.map(([key, value]) => `${key}=${value}`).join("&");
}

/** The canonical request, string to sign and resulting headers. Exposed for tests. */
export function signRequest(
  request: SignableRequest,
  context: SigningContext,
): { headers: Record<string, string>; canonicalRequest: string; stringToSign: string; signature: string } {
  const service = context.service ?? "s3";
  const timestamp = amzDate(context.now);
  const date = timestamp.slice(0, 8);
  const headers: Record<string, string> = {};
  for (const [name, value] of Object.entries(request.headers ?? {})) headers[name.toLowerCase()] = value;
  headers.host = request.url.host;
  headers["x-amz-date"] = timestamp;
  headers["x-amz-content-sha256"] = request.payloadHash;
  if (context.credentials.sessionToken) headers["x-amz-security-token"] = context.credentials.sessionToken;

  const names = Object.keys(headers).sort();
  const canonicalHeaders = names.map((name) => `${name}:${headers[name]!.trim().replace(/\s+/g, " ")}\n`).join("");
  const signedHeaders = names.join(";");
  const canonicalRequest = [
    request.method.toUpperCase(),
    // S3 signs the path as sent (each segment encoded once; callers build URLs with encoded keys).
    request.url.pathname || "/",
    canonicalQuery(request.url),
    canonicalHeaders,
    signedHeaders,
    request.payloadHash,
  ].join("\n");
  const scope = `${date}/${context.region}/${service}/aws4_request`;
  const stringToSign = [ALGORITHM, timestamp, scope, sha256Hex(canonicalRequest)].join("\n");
  const signature = createHmac("sha256", deriveSigningKey(context.credentials.secretAccessKey, date, context.region, service))
    .update(stringToSign, "utf8")
    .digest("hex");

  headers.authorization =
    `${ALGORITHM} Credential=${context.credentials.accessKeyId}/${scope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;
  delete headers.host; // fetch derives Host from the URL; the value signed above is exactly that
  return { headers, canonicalRequest, stringToSign, signature };
}

/** Thrown for unexpected S3 responses. Never contains credentials or signatures. */
export class S3RequestError extends Error {
  readonly status: number;
  readonly s3Code: string | null;

  constructor(operation: string, status: number, s3Code: string | null) {
    super(`S3 ${operation} failed with HTTP ${status}${s3Code ? ` (${s3Code})` : ""}`);
    this.name = "S3RequestError";
    this.status = status;
    this.s3Code = s3Code;
  }
}

function validateConfig(config: S3ClientConfig): void {
  if (!BUCKET_PATTERN.test(config.bucket)) throw new RangeError("S3 bucket name is invalid");
  if (!REGION_PATTERN.test(config.region)) throw new RangeError("S3 region is invalid");
  if (config.endpoint !== undefined) {
    const endpoint = new URL(config.endpoint);
    if (endpoint.protocol !== "https:" && endpoint.protocol !== "http:") throw new RangeError("S3 endpoint must be http(s)");
  }
  if (!config.credentials.accessKeyId || !config.credentials.secretAccessKey) throw new RangeError("S3 credentials are missing");
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export class S3Client {
  readonly #config: S3ClientConfig;
  readonly #fetch: typeof fetch;

  constructor(config: S3ClientConfig) {
    validateConfig(config);
    this.#config = config;
    this.#fetch = config.fetch ?? fetch;
  }

  /** URL of an object. Keys are encoded per segment, so `/` keeps its meaning. */
  objectUrl(key: string): URL {
    const { bucket, region, endpoint, forcePathStyle } = this.#config;
    const path = uriEncode(key, true);
    if (endpoint !== undefined) {
      const base = new URL(endpoint);
      const prefix = base.pathname.replace(/\/+$/, "");
      return forcePathStyle
        ? new URL(`${base.protocol}//${base.host}${prefix}/${bucket}/${path}`)
        : new URL(`${base.protocol}//${bucket}.${base.host}${prefix}/${path}`);
    }
    return forcePathStyle
      ? new URL(`https://s3.${region}.amazonaws.com/${bucket}/${path}`)
      : new URL(`https://${bucket}.s3.${region}.amazonaws.com/${path}`);
  }

  async #send(operation: string, method: string, key: string, init: { body?: Uint8Array; headers?: Record<string, string> } = {}): Promise<Response> {
    const url = this.objectUrl(key);
    const retries = this.#config.retries ?? 2;
    const payloadHash = init.body ? sha256Hex(init.body) : EMPTY_PAYLOAD_SHA256;
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      if (attempt > 0) await sleep(200 * 4 ** (attempt - 1));
      // Re-signed per attempt: the timestamp must be within 15 minutes of S3's clock.
      const { headers } = signRequest(
        { method, url, headers: init.headers ?? {}, payloadHash },
        { credentials: this.#config.credentials, region: this.#config.region, now: (this.#config.now ?? (() => new Date()))() },
      );
      // The timeout covers sending the request and receiving the response HEADERS only. A GET body is streamed to a
      // student by /api/media and may legitimately take minutes on a slow connection; a stalled body is still cut off
      // by undici's idle body timeout.
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(new Error("S3 request timed out")), this.#config.timeoutMs ?? 30_000);
      try {
        const response = await this.#fetch(url, {
          method,
          headers,
          // Upload buffers are always backed by a plain ArrayBuffer (never shared memory).
          ...(init.body ? { body: init.body as Uint8Array<ArrayBuffer> } : {}),
          signal: controller.signal,
        }).finally(() => clearTimeout(timer));
        if ((response.status >= 500 || response.status === 429) && attempt < retries) {
          await response.body?.cancel();
          lastError = new S3RequestError(operation, response.status, null);
          continue;
        }
        return response;
      } catch (error) {
        lastError = error;
        if (attempt === retries) break;
      }
    }
    throw lastError instanceof S3RequestError ? lastError : new S3RequestError(operation, 0, "NetworkError");
  }

  async #fail(operation: string, response: Response): Promise<never> {
    let code: string | null = null;
    try {
      const text = (await response.text()).slice(0, 2_000);
      code = /<Code>([A-Za-z0-9.]{1,64})<\/Code>/.exec(text)?.[1] ?? null;
    } catch {
      // body unreadable: status is enough
    }
    throw new S3RequestError(operation, response.status, code);
  }

  async putObject(key: string, body: Uint8Array, contentType: string): Promise<void> {
    const response = await this.#send("PutObject", "PUT", key, { body, headers: { "content-type": contentType } });
    if (!response.ok) await this.#fail("PutObject", response);
    await response.body?.cancel();
  }

  /** The object's body stream and size, or `null` when it does not exist. */
  async getObject(key: string): Promise<{ body: ReadableStream<Uint8Array>; size: number } | null> {
    const response = await this.#send("GetObject", "GET", key);
    if (response.status === 404) {
      await response.body?.cancel();
      return null;
    }
    if (!response.ok || !response.body) await this.#fail("GetObject", response);
    const size = Number(response.headers.get("content-length"));
    return { body: response.body!, size: Number.isFinite(size) && size >= 0 ? size : 0 };
  }

  async headObject(key: string): Promise<boolean> {
    const response = await this.#send("HeadObject", "HEAD", key);
    await response.body?.cancel();
    if (response.status === 404) return false;
    if (!response.ok) throw new S3RequestError("HeadObject", response.status, null);
    return true;
  }

  async deleteObject(key: string): Promise<void> {
    const response = await this.#send("DeleteObject", "DELETE", key);
    // S3 answers 204 whether or not the key existed; some compatible providers answer 404.
    if (!response.ok && response.status !== 404) await this.#fail("DeleteObject", response);
    await response.body?.cancel();
  }
}
