import { afterEach, describe, expect, it, vi } from "vitest";
import nextConfig from "../next.config";

async function headersFor(nodeEnv: string): Promise<Map<string, string>> {
  vi.stubEnv("NODE_ENV", nodeEnv);
  const rules = (await nextConfig.headers?.()) ?? [];
  expect(rules).toHaveLength(1);
  expect(rules[0]?.source).toBe("/:path*");
  return new Map((rules[0]?.headers ?? []).map(({ key, value }) => [key, value]));
}

function directives(csp: string | undefined): Map<string, string> {
  return new Map(
    (csp ?? "").split(";").map((part) => {
      const [name = "", ...values] = part.trim().split(/\s+/);
      return [name, values.join(" ")] as const;
    }),
  );
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("next.config.ts", () => {
  it("sets the static options", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
    // The container image runs the standalone server (ARCHITECTURE §10).
    expect(nextConfig.output).toBe("standalone");
    // ...without dev uploads or source files traced into it.
    expect(nextConfig.outputFileTracingExcludes).toEqual({ "*": ["storage/**/*", "src/**/*"] });
    expect(nextConfig.reactStrictMode).toBe(true);
    expect(nextConfig.typedRoutes).toBe(false);
    expect(nextConfig.serverExternalPackages).toEqual(["@node-rs/argon2"]);
    expect(nextConfig.images?.formats).toEqual(["image/avif", "image/webp"]);
    expect(nextConfig.images?.remotePatterns).toEqual([]);
    expect(nextConfig.images?.localPatterns).toContainEqual({ pathname: "/api/media/**", search: "" });
    expect(nextConfig.experimental?.serverActions?.bodySizeLimit).toBe("6mb");
  });

  it("builds into NEXT_DIST_DIR when set (parallel dev servers), .next otherwise", async () => {
    expect([".next", process.env.NEXT_DIST_DIR]).toContain(nextConfig.distDir);
    vi.stubEnv("NEXT_DIST_DIR", ".next-verifier");
    vi.resetModules();
    const fresh = (await import("../next.config")).default;
    expect(fresh.distDir).toBe(".next-verifier");
  });

  it("sends the baseline security headers everywhere", async () => {
    const headers = await headersFor("production");
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headers.get("X-Frame-Options")).toBe("DENY");
    expect(headers.get("Permissions-Policy")).toBe("camera=(self), microphone=(), geolocation=()");
    expect(headers.get("Cross-Origin-Opener-Policy")).toBe("same-origin");
  });

  it("uses a strict nonce-free CSP in production with HSTS", async () => {
    const headers = await headersFor("production");
    expect(headers.get("Strict-Transport-Security")).toBe("max-age=63072000; includeSubDomains");
    const csp = directives(headers.get("Content-Security-Policy"));
    expect(Object.fromEntries(csp)).toEqual({
      "default-src": "'self'",
      "script-src": "'self' 'unsafe-inline'",
      "style-src": "'self' 'unsafe-inline'",
      "img-src": "'self' data: blob:",
      "font-src": "'self' data:",
      "connect-src": "'self'",
      "frame-ancestors": "'none'",
      "base-uri": "'self'",
      "form-action": "'self'",
      "object-src": "'none'",
      "upgrade-insecure-requests": "",
    });
  });

  it("allows unsafe-eval only in development and never sends HSTS outside production", async () => {
    const dev = await headersFor("development");
    expect(directives(dev.get("Content-Security-Policy")).get("script-src")).toBe("'self' 'unsafe-inline' 'unsafe-eval'");
    expect(dev.has("Strict-Transport-Security")).toBe(false);
    expect(directives(dev.get("Content-Security-Policy")).has("upgrade-insecure-requests")).toBe(false);

    const test = await headersFor("test");
    expect(directives(test.get("Content-Security-Policy")).get("script-src")).toBe("'self' 'unsafe-inline'");
    expect(test.has("Strict-Transport-Security")).toBe(false);
  });
});
