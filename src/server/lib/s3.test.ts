import { createServer, type IncomingMessage, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { EnvValidationError, parseEnv } from "./env";
import { isAppError } from "./errors";
import {
  amzDate,
  deriveSigningKey,
  EMPTY_PAYLOAD_SHA256,
  S3Client,
  S3RequestError,
  sha256Hex,
  signRequest,
  uriEncode,
  type S3ClientConfig,
} from "./s3";
import { generateStorageKey, S3Driver } from "./storage";

/**
 * Signature Version 4 vectors published by AWS in "Examples: Signature Calculations in AWS Signature Version 4"
 * (Amazon S3 API reference, sig-v4-header-based-auth). Credentials and values are AWS's documented examples.
 */
const AWS_EXAMPLE = {
  credentials: { accessKeyId: "AKIAIOSFODNN7EXAMPLE", secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" },
  region: "us-east-1",
  now: new Date("2013-05-24T00:00:00Z"),
};

describe("SigV4 primitives", () => {
  it("derives the documented signing key (AWS General Reference example)", () => {
    const key = deriveSigningKey("wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY", "20120215", "us-east-1", "iam");
    expect(key.toString("hex")).toBe("f4780e2d9f65fa895f9c67b32ce1baf0b0d8a43505a000a1a9e090d414db404d");
  });

  it("formats timestamps and encodes like RFC 3986", () => {
    expect(amzDate(new Date("2013-05-24T00:00:00.123Z"))).toBe("20130524T000000Z");
    expect(uriEncode("test$file.text")).toBe("test%24file.text");
    expect(uriEncode("a b/c~d")).toBe("a%20b%2Fc~d");
    expect(uriEncode("a b/c~d", true)).toBe("a%20b/c~d");
    expect(uriEncode("é")).toBe("%C3%A9");
    expect(sha256Hex("")).toBe(EMPTY_PAYLOAD_SHA256);
  });
});

describe("signRequest (AWS S3 published examples)", () => {
  it("GET Object with a Range header", () => {
    const signed = signRequest(
      {
        method: "GET",
        url: new URL("https://examplebucket.s3.amazonaws.com/test.txt"),
        headers: { Range: "bytes=0-9" },
        payloadHash: EMPTY_PAYLOAD_SHA256,
      },
      AWS_EXAMPLE,
    );
    expect(signed.canonicalRequest).toBe(
      [
        "GET",
        "/test.txt",
        "",
        "host:examplebucket.s3.amazonaws.com",
        "range:bytes=0-9",
        `x-amz-content-sha256:${EMPTY_PAYLOAD_SHA256}`,
        "x-amz-date:20130524T000000Z",
        "",
        "host;range;x-amz-content-sha256;x-amz-date",
        EMPTY_PAYLOAD_SHA256,
      ].join("\n"),
    );
    expect(signed.stringToSign).toBe(
      "AWS4-HMAC-SHA256\n20130524T000000Z\n20130524/us-east-1/s3/aws4_request\n" +
        "7344ae5b7ee6c3e7e6b0fe0640412a37625d1fbfff95c48bbb2dc43964946972",
    );
    expect(signed.signature).toBe("f0e8bdb87c964420e857bd35b5d6ed310bd44f0170aba48dd91039c6036bdb41");
    expect(signed.headers.authorization).toBe(
      "AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, " +
        "SignedHeaders=host;range;x-amz-content-sha256;x-amz-date, " +
        "Signature=f0e8bdb87c964420e857bd35b5d6ed310bd44f0170aba48dd91039c6036bdb41",
    );
    // fetch sets Host from the URL; everything else that was signed is sent.
    expect(signed.headers).not.toHaveProperty("host");
    expect(signed.headers["x-amz-date"]).toBe("20130524T000000Z");
  });

  it("PUT Object with a signed payload", () => {
    const body = "Welcome to Amazon S3.";
    expect(sha256Hex(body)).toBe("44ce7dd67c959e0d3524ffac1771dfbba87d2b6b4b4e99e42034a8b803f8b072");
    const signed = signRequest(
      {
        method: "PUT",
        url: new URL(`https://examplebucket.s3.amazonaws.com/${uriEncode("test$file.text", true)}`),
        headers: { Date: "Fri, 24 May 2013 00:00:00 GMT", "x-amz-storage-class": "REDUCED_REDUNDANCY" },
        payloadHash: sha256Hex(body),
      },
      AWS_EXAMPLE,
    );
    expect(signed.canonicalRequest.split("\n").slice(0, 2)).toEqual(["PUT", "/test%24file.text"]);
    expect(sha256Hex(signed.canonicalRequest)).toBe("9e0e90d9c76de8fa5b200d8c849cd5b8dc7a3be3951ddb7f6a76b4158342019d");
    expect(signed.signature).toBe("98ad721746da40c64f1a55b78f14c238d841ea1380cd77a1b5971af0ece108bd");
  });

  it("GET Bucket lifecycle (sub-resource query)", () => {
    const signed = signRequest(
      { method: "GET", url: new URL("https://examplebucket.s3.amazonaws.com/?lifecycle"), payloadHash: EMPTY_PAYLOAD_SHA256 },
      AWS_EXAMPLE,
    );
    expect(signed.canonicalRequest.split("\n").slice(0, 3)).toEqual(["GET", "/", "lifecycle="]);
    expect(signed.signature).toBe("fea454ca298b7da1c68078a5d1bdbfbbe0d65c699e0f91ac7a200a0136783543");
  });

  it("GET Bucket (list objects) with sorted query parameters", () => {
    const signed = signRequest(
      { method: "GET", url: new URL("https://examplebucket.s3.amazonaws.com/?prefix=J&max-keys=2"), payloadHash: EMPTY_PAYLOAD_SHA256 },
      AWS_EXAMPLE,
    );
    expect(signed.canonicalRequest.split("\n")[2]).toBe("max-keys=2&prefix=J");
    expect(signed.signature).toBe("34b48302e7b5fa45bde8084f4b7868a86f0a534bc59db6670ed5711ef69dc6f7");
  });

  it("signs the session token of temporary credentials", () => {
    const signed = signRequest(
      { method: "HEAD", url: new URL("https://b.s3.af-south-1.amazonaws.com/k"), payloadHash: EMPTY_PAYLOAD_SHA256 },
      { ...AWS_EXAMPLE, credentials: { ...AWS_EXAMPLE.credentials, sessionToken: "token-123" } },
    );
    expect(signed.headers["x-amz-security-token"]).toBe("token-123");
    expect(signed.headers.authorization).toContain("SignedHeaders=host;x-amz-content-sha256;x-amz-date;x-amz-security-token,");
  });
});

describe("S3 environment (src/server/lib/env.ts)", () => {
  const base = {
    NODE_ENV: "development",
    APP_URL: "http://localhost:3000",
    DATABASE_URL: "postgresql://app_rw@localhost:5433/zimstudy",
    SESSION_SECRET: "a-development-secret-of-enough-length",
  };

  function issueKeys(source: Record<string, string>): string[] {
    try {
      parseEnv(source);
      return [];
    } catch (error) {
      if (!(error instanceof EnvValidationError)) throw error;
      return error.issues.map((issue) => issue.key);
    }
  }

  it("requires bucket, region and both keys when STORAGE_DRIVER=s3", () => {
    expect(issueKeys({ ...base, STORAGE_DRIVER: "s3" }).sort()).toEqual(["S3_ACCESS_KEY_ID", "S3_BUCKET", "S3_REGION", "S3_SECRET_ACCESS_KEY"]);
    const env = parseEnv({
      ...base,
      STORAGE_DRIVER: "s3",
      S3_BUCKET: "dz-media",
      S3_REGION: "af-south-1",
      S3_ACCESS_KEY_ID: "AKIDTEST",
      S3_SECRET_ACCESS_KEY: "secret",
    });
    expect(env).toMatchObject({ STORAGE_DRIVER: "s3", S3_BUCKET: "dz-media", S3_FORCE_PATH_STYLE: false });
  });

  it("validates bucket names and refuses a plain-http endpoint in production", () => {
    expect(issueKeys({ ...base, S3_BUCKET: "Not_A_Bucket" })).toEqual(["S3_BUCKET"]);
    const production = {
      ...base,
      NODE_ENV: "production",
      APP_URL: "https://learn.example.com",
      SESSION_SECRET: "4f9c2b7e8d1a6f3c0b5e9a2d7c4f1b8e6a3d0c9f",
      EMAIL_PROVIDER: "resend",
      RESEND_API_KEY: "re_test_key_not_real",
      EMAIL_FROM: "no-reply@mail.learn.dzidza.test",
      SMS_PROVIDER: "africastalking",
      AFRICASTALKING_USERNAME: "dzidza",
      AFRICASTALKING_API_KEY: "not-a-real-key",
      TRUSTED_PROXY_HOPS: "1",
    };
    expect(issueKeys({ ...production, S3_ENDPOINT: "http://minio:9000" })).toEqual(["S3_ENDPOINT"]);
    expect(issueKeys({ ...production, S3_ENDPOINT: "https://acc.r2.cloudflarestorage.com" })).toEqual([]);
  });
});

describe("S3Client URLs", () => {
  const base = { bucket: "dz-media", region: "af-south-1", credentials: AWS_EXAMPLE.credentials };

  it("uses virtual-hosted AWS URLs by default and path style or custom endpoints on request", () => {
    expect(new S3Client(base).objectUrl("content/2026/10/a.webp").href).toBe("https://dz-media.s3.af-south-1.amazonaws.com/content/2026/10/a.webp");
    expect(new S3Client({ ...base, forcePathStyle: true }).objectUrl("a/b.png").href).toBe("https://s3.af-south-1.amazonaws.com/dz-media/a/b.png");
    expect(new S3Client({ ...base, region: "auto", endpoint: "https://acc123.r2.cloudflarestorage.com", forcePathStyle: true }).objectUrl("a/b.png").href).toBe(
      "https://acc123.r2.cloudflarestorage.com/dz-media/a/b.png",
    );
    expect(new S3Client({ ...base, endpoint: "https://s3.example.net/" }).objectUrl("a/b.png").href).toBe("https://dz-media.s3.example.net/a/b.png");
  });

  it("refuses invalid configuration without echoing secrets", () => {
    expect(() => new S3Client({ ...base, bucket: "Bad_Bucket" })).toThrow("S3 bucket name is invalid");
    expect(() => new S3Client({ ...base, endpoint: "ftp://x" })).toThrow("S3 endpoint must be http(s)");
    expect(() => new S3Client({ ...base, credentials: { accessKeyId: "", secretAccessKey: "s3cr3t" } })).toThrow(/^S3 credentials are missing$/);
  });
});

/**
 * A tiny in-memory S3 endpoint (path style) that checks what a real one would: a SigV4 Authorization header for the
 * expected access key and scope, a timestamp, and a body matching `x-amz-content-sha256`. The signature itself is
 * verified by the AWS vectors above.
 */
interface Recorded {
  method: string;
  path: string;
  headers: IncomingMessage["headers"];
}

describe("S3Driver against a fake S3 endpoint", () => {
  let server: Server;
  let endpoint: string;
  const objects = new Map<string, { body: Buffer; type: string }>();
  const requests: Recorded[] = [];
  let failNext: number[] = [];

  beforeAll(async () => {
    server = createServer((req, res) => {
      const chunks: Buffer[] = [];
      req.on("data", (chunk: Buffer) => chunks.push(chunk));
      req.on("end", () => {
        const body = Buffer.concat(chunks);
        const path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
        requests.push({ method: req.method ?? "", path, headers: req.headers });
        if (path.endsWith("-hang.png")) return; // never answers: the client's header timeout must fire
        if (path.endsWith("-slow.png") && req.method === "GET") {
          // Headers now, body later: a slow download must not be cut off by the request timeout.
          res.writeHead(200, { "content-type": "image/png", "content-length": "3" });
          res.flushHeaders();
          setTimeout(() => res.end(Buffer.from([1, 2, 3])), 300);
          return;
        }
        const status = failNext.shift();
        if (status !== undefined) {
          res.writeHead(status, { "content-type": "application/xml" }).end(`<Error><Code>SlowDown</Code><Message>x</Message></Error>`);
          return;
        }
        const auth = req.headers.authorization ?? "";
        const sha = req.headers["x-amz-content-sha256"];
        if (!/^AWS4-HMAC-SHA256 Credential=AKIDTEST\/\d{8}\/af-south-1\/s3\/aws4_request, SignedHeaders=[a-z0-9;-]+, Signature=[0-9a-f]{64}$/.test(auth) ||
          !req.headers["x-amz-date"] || sha !== sha256Hex(body)) {
          res.writeHead(403, { "content-type": "application/xml" }).end("<Error><Code>SignatureDoesNotMatch</Code></Error>");
          return;
        }
        if (!path.startsWith("/dz-test/")) {
          res.writeHead(404).end("<Error><Code>NoSuchBucket</Code></Error>");
          return;
        }
        const key = path.slice("/dz-test/".length);
        const stored = objects.get(key);
        switch (req.method) {
          case "PUT":
            objects.set(key, { body, type: req.headers["content-type"] ?? "" });
            res.writeHead(200).end();
            return;
          case "GET":
          case "HEAD":
            if (!stored) {
              res.writeHead(404, { "content-type": "application/xml" }).end(req.method === "GET" ? "<Error><Code>NoSuchKey</Code></Error>" : undefined);
              return;
            }
            res.writeHead(200, { "content-type": stored.type, "content-length": String(stored.body.length) });
            res.end(req.method === "GET" ? stored.body : undefined);
            return;
          case "DELETE":
            objects.delete(key);
            res.writeHead(204).end();
            return;
          default:
            res.writeHead(405).end();
        }
      });
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    endpoint = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  function config(overrides: Partial<S3ClientConfig> = {}): S3ClientConfig {
    return {
      bucket: "dz-test",
      region: "af-south-1",
      endpoint,
      forcePathStyle: true,
      credentials: { accessKeyId: "AKIDTEST", secretAccessKey: "test-secret-key" },
      timeoutMs: 5_000,
      ...overrides,
    };
  }

  it("stores, reads, streams, checks and deletes objects", async () => {
    const driver = new S3Driver(config());
    const key = generateStorageKey("content", "png");
    const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 1, 2, 3]);

    expect(await driver.exists(key)).toBe(false);
    expect(await driver.get(key)).toBeNull();
    expect(await driver.getStream(key)).toBeNull();

    await driver.put(key, bytes, "image/png");
    expect(objects.get(key)?.type).toBe("image/png");
    expect(await driver.exists(key)).toBe(true);
    expect(await driver.get(key)).toEqual(bytes);
    const streamed = await driver.getStream(key);
    expect(streamed?.size).toBe(bytes.length);
    expect(new Uint8Array(await new Response(streamed!.stream).arrayBuffer())).toEqual(bytes);

    await driver.delete(key);
    await driver.delete(key); // deleting a missing object is not an error
    expect(await driver.exists(key)).toBe(false);

    const put = requests.find((request) => request.method === "PUT" && request.path.endsWith(key));
    expect(put?.headers["x-amz-content-sha256"]).toBe(sha256Hex(bytes));
  });

  it("validates keys before any request", async () => {
    const before = requests.length;
    const error = await new S3Driver(config()).get("../../etc/passwd").catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("BAD_REQUEST");
    expect(requests.length).toBe(before);
  });

  it("retries throttling and server errors, then reports S3's error code without secrets", async () => {
    const driver = new S3Driver(config({ retries: 2 }));
    const key = generateStorageKey("content", "webp");
    failNext = [503, 500];
    await driver.put(key, new Uint8Array([1]), "image/webp");
    expect(objects.has(key)).toBe(true);

    failNext = [503, 503, 503];
    const error = await driver.get(key).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(S3RequestError);
    expect((error as S3RequestError).status).toBe(503);

    const forbidden = await new S3Driver(config({ credentials: { accessKeyId: "WRONGKEY", secretAccessKey: "test-secret-key" } }))
      .put(generateStorageKey("content", "png"), new Uint8Array([1]), "image/png")
      .catch((e: unknown) => e);
    expect(forbidden).toBeInstanceOf(S3RequestError);
    expect((forbidden as Error).message).toBe("S3 PutObject failed with HTTP 403 (SignatureDoesNotMatch)");
    expect((forbidden as Error).message).not.toContain("test-secret-key");
  });

  it("times out waiting for response headers, but never cuts off a slow body", async () => {
    const driver = new S3Driver(config({ retries: 0, timeoutMs: 100 }));
    const base = generateStorageKey("content", "png");
    const hang = await driver.exists(base.replace(/.png$/, "-hang.png")).catch((e: unknown) => e);
    expect(hang).toBeInstanceOf(S3RequestError);
    expect((hang as S3RequestError).s3Code).toBe("NetworkError");

    const slow = await driver.getStream(base.replace(/.png$/, "-slow.png"));
    expect(slow?.size).toBe(3);
    expect(new Uint8Array(await new Response(slow!.stream).arrayBuffer())).toEqual(new Uint8Array([1, 2, 3]));
  });

  it("reports a network failure as an S3RequestError", async () => {
    const driver = new S3Driver(config({ endpoint: "http://127.0.0.1:9", retries: 0, timeoutMs: 1_000 }));
    const error = await driver.exists(generateStorageKey("content", "png")).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(S3RequestError);
    expect((error as S3RequestError).s3Code).toBe("NetworkError");
  });
});
