import { NextRequest } from "next/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "./proxy";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function request(path: string, init: { method?: string; cookie?: string; requestId?: string } = {}): NextRequest {
  const headers = new Headers();
  if (init.cookie !== undefined) headers.set("cookie", init.cookie);
  if (init.requestId !== undefined) headers.set("x-request-id", init.requestId);
  return new NextRequest(new URL(path, "http://localhost:3000"), { method: init.method ?? "GET", headers });
}

function redirectTarget(response: Response): URL | null {
  const location = response.headers.get("location");
  return location === null ? null : new URL(location);
}

describe("proxy: optimistic auth redirect", () => {
  it.each(["/app", "/app/subjects/mathematics", "/onboarding", "/parent/children", "/teacher", "/school/classes", "/admin/questions"])(
    "redirects %s to /login without a session cookie",
    (path) => {
      const response = proxy(request(path));
      expect(response.status).toBe(307);
      const target = redirectTarget(response);
      expect(target?.pathname).toBe("/login");
      expect(target?.searchParams.get("next")).toBe(path);
    },
  );

  it("preserves the query string in next", () => {
    const target = redirectTarget(proxy(request("/app/practice?topic=algebra&mode=timed")));
    expect(target?.searchParams.get("next")).toBe("/app/practice?topic=algebra&mode=timed");
    expect(target?.origin).toBe("http://localhost:3000");
  });

  it.each(["dz_session=abc", "__Host-dz_session=abc", "theme=dark; dz_session=abc"])(
    "lets requests with a session cookie through (%s)",
    (cookie) => {
      const response = proxy(request("/app", { cookie }));
      expect(response.headers.get("location")).toBeNull();
      expect(response.headers.get("x-middleware-next")).toBe("1");
    },
  );

  it("treats an empty session cookie as absent", () => {
    expect(proxy(request("/admin", { cookie: "dz_session=" })).status).toBe(307);
  });

  it.each(["/", "/schools", "/pricing", "/applications", "/apple-touch", "/login", "/zimsec/o-level/mathematics", "/api/v1/subjects"])(
    "does not protect %s",
    (path) => {
      expect(proxy(request(path)).headers.get("location")).toBeNull();
    },
  );

  it("does not redirect non-navigation requests (Server Actions answer with their own auth errors)", () => {
    expect(proxy(request("/app/practice", { method: "POST" })).headers.get("location")).toBeNull();
  });
});

describe("proxy: requested page path for layout guards", () => {
  it("forwards the page's path + query to the app as x-dz-request-path", () => {
    const response = proxy(request("/app/classes/invite/abc?x=1", { cookie: "dz_session=abc" }));
    expect(response.headers.get("x-middleware-request-x-dz-request-path")).toBe("/app/classes/invite/abc?x=1");
  });

  it("drops the framework's _rsc param (client navigations) from the forwarded path and from next", () => {
    const forwarded = proxy(request("/app/subjects?_rsc=1a2b3&tab=all", { cookie: "dz_session=abc" }));
    expect(forwarded.headers.get("x-middleware-request-x-dz-request-path")).toBe("/app/subjects?tab=all");
    const target = redirectTarget(proxy(request("/app/subjects?_rsc=1a2b3")));
    expect(target?.searchParams.get("next")).toBe("/app/subjects");
  });

  it("overwrites a value sent by the client", () => {
    const spoofed = new NextRequest(new URL("/teacher", "http://localhost:3000"), {
      headers: new Headers({ cookie: "dz_session=abc", "x-dz-request-path": "//evil.example" }),
    });
    expect(proxy(spoofed).headers.get("x-middleware-request-x-dz-request-path")).toBe("/teacher");
  });
});

describe("proxy: request ids", () => {
  it("keeps a well-formed incoming id and forwards it to the app and the client", () => {
    const response = proxy(request("/pricing", { requestId: "edge-req-12345678" }));
    expect(response.headers.get("x-request-id")).toBe("edge-req-12345678");
    expect(response.headers.get("x-middleware-request-x-request-id")).toBe("edge-req-12345678");
  });

  it("generates an id when missing or unsafe", () => {
    const generated = proxy(request("/pricing")).headers.get("x-request-id");
    expect(generated).toMatch(UUID);
    const replaced = proxy(request("/pricing", { requestId: "bad id" })).headers.get("x-request-id");
    expect(replaced).toMatch(UUID);
  });

  it("adds the id to auth redirects too", () => {
    expect(proxy(request("/app", { requestId: "edge-req-12345678" })).headers.get("x-request-id")).toBe(
      "edge-req-12345678",
    );
  });
});

describe("proxy: matcher", () => {
  const matches = (path: string) => unstable_doesMiddlewareMatch({ config, url: `http://localhost:3000${path}` });

  it.each([
    "/",
    "/app",
    "/app/subjects/mathematics",
    "/admin",
    "/login",
    "/api/v1/subjects",
    "/api/v1/uploads-status",
    "/api/webhooks-status",
    "/zimsec/o-level/mathematics",
  ])("runs on %s", (path) => {
    expect(matches(path)).toBe(true);
  });

  it.each([
    "/_next/static/chunks/main.js",
    "/_next/image?url=%2Ficons%2Ficon-192.png&w=64&q=75",
    "/_next/webpack-hmr",
    "/api/webhooks",
    "/api/webhooks/paynow",
    "/api/webhooks/whatsapp",
    "/api/v1/uploads",
    "/api/v1/uploads?purpose=import",
    "/icons/icon-192.png",
    "/favicon.ico",
    "/icon.svg",
    "/apple-icon.png",
    "/manifest.webmanifest",
    "/robots.txt",
    "/sitemap.xml",
    "/fonts/inter.woff2",
    "/katex/katex.min.css",
  ])("skips %s", (path) => {
    expect(matches(path)).toBe(false);
  });
});
