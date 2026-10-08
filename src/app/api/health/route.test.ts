import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { proxy } from "@/proxy";
import { dynamic, GET, runtime } from "./route";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("GET /api/health (liveness)", () => {
  it("answers 200 without touching the database, never cached", async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const body = (await response.json()) as Record<string, unknown>;
    expect(body).toEqual({ status: "ok", uptimeSeconds: expect.any(Number), release: null });
    expect(dynamic).toBe("force-dynamic");
    expect(runtime).toBe("nodejs");
  });

  it("reports the release id baked into the image, and nothing that does not look like one", async () => {
    vi.stubEnv("APP_RELEASE", "3f2a9c1e0b7d");
    expect(((await GET().json()) as { release: unknown }).release).toBe("3f2a9c1e0b7d");
    vi.stubEnv("APP_RELEASE", "<script>alert(1)</script>");
    expect(((await GET().json()) as { release: unknown }).release).toBeNull();
  });

  it.each(["/api/health", "/api/ready"])("is never redirected to /login by the proxy (%s)", (path) => {
    const response = proxy(new NextRequest(new URL(path, "http://localhost:3000")));
    expect(response.headers.get("location")).toBeNull();
    expect(response.status).toBe(200);
  });
});
