import { beforeAll, describe, expect, it } from "vitest";
import { CACHE_NAMES, CACHE_PREFIX, MAX_SAVED_LESSONS, META_HEADERS, OFFLINE_URL, PERSONAL_CACHE_PREFIXES, SW_MESSAGES } from "./constants";
import type { RequestLike, SwRoutingModule } from "./sw-routing.types";
import { loadSwRouting } from "./testing";

const ORIGIN = "https://dzidza.example";

let sw: SwRoutingModule;
beforeAll(async () => {
  sw = await loadSwRouting();
});

function get(path: string, init: { mode?: string; headers?: Record<string, string>; origin?: string } = {}): RequestLike {
  return {
    url: `${init.origin ?? ORIGIN}${path}`,
    method: "GET",
    mode: init.mode ?? "no-cors",
    headers: new Headers(init.headers),
  };
}

function navigate(path: string): RequestLike {
  return get(path, { mode: "navigate" });
}

function strategyOf(request: RequestLike): string {
  return sw.classifyRequest(request, ORIGIN).strategy;
}

function response(init: {
  status?: number;
  type?: string;
  redirected?: boolean;
  headers?: Record<string, string>;
}): { status: number; type: string; redirected: boolean; headers: Headers } {
  return {
    status: init.status ?? 200,
    type: init.type ?? "basic",
    redirected: init.redirected ?? false,
    headers: new Headers(init.headers),
  };
}

describe("page-side constants mirror public/sw-routing.mjs", () => {
  it("uses the same cache names, headers, messages and limits", () => {
    expect(sw.CACHE_PREFIX).toBe(CACHE_PREFIX);
    expect({ ...sw.CACHE_NAMES }).toEqual(CACHE_NAMES);
    expect([...sw.PERSONAL_CACHE_PREFIXES]).toEqual([...PERSONAL_CACHE_PREFIXES]);
    expect({ ...sw.META_HEADERS }).toEqual(META_HEADERS);
    expect({ ...sw.MESSAGE_TYPES }).toEqual(SW_MESSAGES);
    expect(sw.OFFLINE_URL).toBe(OFFLINE_URL);
    expect(sw.CACHE_MAX_ENTRIES[sw.CACHE_NAMES.lessons]).toBe(MAX_SAVED_LESSONS);
  });

  it("versions every cache name with the prefix and current version", () => {
    for (const name of Object.values(sw.CACHE_NAMES)) {
      expect(name.startsWith(sw.CACHE_PREFIX)).toBe(true);
      expect(name.endsWith(`-${sw.CACHE_VERSION}`)).toBe(true);
    }
  });
});

describe("classifyRequest: static assets", () => {
  it("serves hashed /_next/static assets cache-first from the static cache", () => {
    for (const path of ["/_next/static/chunks/app/page-3f9a1c.js", "/_next/static/css/5b2e.css", "/_next/static/BUILD_ID/_buildManifest.js"]) {
      const decision = sw.classifyRequest(get(path), ORIGIN);
      expect(decision).toMatchObject({ strategy: "cache-first", cacheName: sw.CACHE_NAMES.static, cacheKey: `${ORIGIN}${path}` });
    }
  });

  it("puts fonts (next/font and KaTeX) in the font cache, cache-first", () => {
    for (const path of [
      "/_next/static/media/KaTeX_Main-Regular.c2342cd8.woff2",
      "/_next/static/media/a34f9d1faa5f3315-s.p.woff2",
      "/katex/fonts/KaTeX_Math-Italic.woff2",
      "/fonts/KaTeX_AMS-Regular.ttf",
    ]) {
      expect(sw.classifyRequest(get(path), ORIGIN)).toMatchObject({ strategy: "cache-first", cacheName: sw.CACHE_NAMES.fonts });
    }
  });

  it("does not treat arbitrary font files outside /_next/static as KaTeX fonts", () => {
    expect(strategyOf(get("/fonts/SomethingElse.woff2"))).toBe("passthrough");
  });

  it("serves /icons/** cache-first and the manifest / app icons stale-while-revalidate", () => {
    expect(sw.classifyRequest(get("/icons/icon-192.png"), ORIGIN)).toMatchObject({
      strategy: "cache-first",
      cacheName: sw.CACHE_NAMES.static,
    });
    for (const path of ["/manifest.webmanifest", "/icon.svg", "/apple-icon.png", "/favicon.ico"]) {
      expect(sw.classifyRequest(get(path), ORIGIN)).toMatchObject({
        strategy: "stale-while-revalidate",
        cacheName: sw.CACHE_NAMES.shell,
      });
    }
  });

  it("keeps the query string in asset cache keys (deployment ids)", () => {
    const decision = sw.classifyRequest(get("/_next/static/chunks/main.js?dpl=dpl_abc"), ORIGIN);
    expect(decision).toMatchObject({ cacheKey: `${ORIGIN}/_next/static/chunks/main.js?dpl=dpl_abc` });
  });

  it("bounds the static, font and lesson caches", () => {
    expect(sw.CACHE_MAX_ENTRIES[sw.CACHE_NAMES.static]).toBeGreaterThan(0);
    expect(sw.CACHE_MAX_ENTRIES[sw.CACHE_NAMES.fonts]).toBeGreaterThan(0);
    expect(sw.CACHE_MAX_ENTRIES[sw.CACHE_NAMES.lessons]).toBe(30);
  });
});

describe("classifyRequest: navigations", () => {
  it("serves lesson pages network-first and stores them in the bounded lesson cache", () => {
    const decision = sw.classifyRequest(navigate("/app/lessons/0199a1b2-c3d4"), ORIGIN);
    expect(decision).toEqual({
      strategy: "network-first",
      reason: expect.any(String),
      offlineFallback: true,
      cacheName: sw.CACHE_NAMES.lessons,
      cacheKey: `${ORIGIN}/app/lessons/0199a1b2-c3d4`,
      maxEntries: 30,
      timeoutMs: sw.NAVIGATION_TIMEOUT_MS,
    });
    expect(sw.NAVIGATION_TIMEOUT_MS).toBeLessThanOrEqual(5000);
  });

  it("drops query strings and fragments from the lesson cache key", () => {
    const decision = sw.classifyRequest(navigate("/app/lessons/abc?tab=examples#worked"), ORIGIN);
    expect(decision).toMatchObject({ cacheKey: `${ORIGIN}/app/lessons/abc` });
  });

  it("only treats the lesson page itself as a lesson (not the index or sub-routes)", () => {
    expect(strategyOf(navigate("/app/lessons"))).toBe("network-only");
    expect(strategyOf(navigate("/app/lessons/abc/print"))).toBe("network-only");
    expect(strategyOf(navigate("/app/lessons/abc/"))).toBe("network-only");
  });

  it("keeps the offline page fresh with network-first into the shell cache", () => {
    expect(sw.classifyRequest(navigate("/offline"), ORIGIN)).toMatchObject({
      strategy: "network-first",
      cacheName: sw.CACHE_NAMES.shell,
      cacheKey: `${ORIGIN}/offline`,
    });
  });

  it("serves other pages from the network only, with the offline page as fallback", () => {
    for (const path of ["/", "/pricing", "/zimsec/o-level/mathematics", "/app", "/app/practice", "/app/subjects/maths"]) {
      expect(sw.classifyRequest(navigate(path), ORIGIN)).toMatchObject({ strategy: "network-only", offlineFallback: true });
    }
  });

  it("never stores live exam state, auth, admin, role areas or API navigations", () => {
    for (const path of [
      "/app/exams/attempt/0199",
      "/app/exams/attempt/0199/results",
      "/admin",
      "/admin/content/lessons",
      "/login",
      "/login?next=/app",
      "/register",
      "/verify",
      "/forgot-password",
      "/reset-password",
      "/onboarding",
      "/parent/children",
      "/teacher/classes",
      "/school/reports",
      "/api/auth/google/start",
    ]) {
      const decision = sw.classifyRequest(navigate(path), ORIGIN);
      expect(decision.strategy, path).toBe("network-only");
      expect("cacheName" in decision, path).toBe(false);
    }
  });

  it("matches never-cache prefixes on whole path segments", () => {
    expect(sw.isNeverCacheNavigation("/school")).toBe(true);
    expect(sw.isNeverCacheNavigation("/schools")).toBe(false);
    expect(sw.isNeverCacheNavigation("/administrator")).toBe(false);
    expect(sw.isNeverCacheNavigation("/app/exams")).toBe(false);
    expect(sw.isNeverCacheNavigation("/app/exams/attempt/x")).toBe(true);
  });
});

describe("classifyRequest: never-cache rules", () => {
  it("passes through every non-GET request (Server Actions, form posts) and HEAD", () => {
    for (const method of ["POST", "PUT", "PATCH", "DELETE", "HEAD"]) {
      const decision = sw.classifyRequest({ ...navigate("/app/lessons/abc"), method }, ORIGIN);
      expect(decision.strategy, method).toBe("passthrough");
    }
    expect(strategyOf({ ...get("/app/lessons/abc", { headers: { "next-action": "7f3a" } }), method: "POST" })).toBe(
      "passthrough",
    );
  });

  it("passes through cross-origin requests", () => {
    expect(strategyOf(get("/_next/static/chunks/main.js", { origin: "https://cdn.example" }))).toBe("passthrough");
    expect(strategyOf({ ...navigate("/app/lessons/abc"), url: "https://evil.example/app/lessons/abc" })).toBe("passthrough");
  });

  it("passes through /api/** (personalised JSON) including media", () => {
    for (const path of ["/api/v1/me", "/api/v1/flashcards/due", "/api/media/lessons/figure.png", "/api"]) {
      expect(strategyOf(get(path)), path).toBe("passthrough");
    }
  });

  it("passes through RSC payloads, prefetches and Server Action GETs", () => {
    expect(strategyOf(get("/app/lessons/abc", { headers: { rsc: "1" } }))).toBe("passthrough");
    expect(strategyOf(get("/app/lessons/abc?_rsc=1x2y"))).toBe("passthrough");
    expect(strategyOf(get("/app", { headers: { "next-router-prefetch": "1" } }))).toBe("passthrough");
    expect(strategyOf(get("/app", { headers: { "next-router-state-tree": "%5B%5D" } }))).toBe("passthrough");
    expect(strategyOf(get("/app", { headers: { "next-action": "abc" } }))).toBe("passthrough");
  });

  it("passes through range requests, the image optimiser and anything else", () => {
    expect(strategyOf(get("/icons/icon-192.png", { headers: { range: "bytes=0-10" } }))).toBe("passthrough");
    expect(strategyOf(get("/_next/image?url=%2Ficons%2Ficon-512.png&w=64&q=75"))).toBe("passthrough");
    expect(strategyOf(get("/robots.txt"))).toBe("passthrough");
    expect(strategyOf(get("/sw.js"))).toBe("passthrough");
  });

  it("passes through an unparseable URL", () => {
    expect(strategyOf({ url: "not a url", method: "GET" })).toBe("passthrough");
  });
});

describe("isLogoutRequest", () => {
  it("recognises a same-origin POST to the logout endpoint only", () => {
    expect(sw.isLogoutRequest({ url: `${ORIGIN}/api/auth/logout`, method: "POST" }, ORIGIN)).toBe(true);
    expect(sw.isLogoutRequest({ url: `${ORIGIN}/api/auth/logout`, method: "GET" }, ORIGIN)).toBe(false);
    expect(sw.isLogoutRequest({ url: "https://evil.example/api/auth/logout", method: "POST" }, ORIGIN)).toBe(false);
    expect(sw.isLogoutRequest({ url: `${ORIGIN}/api/auth/logout/extra`, method: "POST" }, ORIGIN)).toBe(false);
  });
});

describe("isCacheableResponse", () => {
  it("accepts a same-origin 200", () => {
    expect(sw.isCacheableResponse(response({}))).toBe(true);
    expect(sw.isCacheableResponse(response({ type: "default" }))).toBe(true);
  });

  it("rejects non-200, opaque/CORS, redirected and missing responses", () => {
    expect(sw.isCacheableResponse(response({ status: 206 }))).toBe(false);
    expect(sw.isCacheableResponse(response({ status: 304 }))).toBe(false);
    expect(sw.isCacheableResponse(response({ status: 404 }))).toBe(false);
    expect(sw.isCacheableResponse(response({ status: 500 }))).toBe(false);
    expect(sw.isCacheableResponse(response({ status: 0, type: "opaque" }))).toBe(false);
    expect(sw.isCacheableResponse(response({ status: 0, type: "opaqueredirect" }))).toBe(false);
    expect(sw.isCacheableResponse(response({ type: "cors" }))).toBe(false);
    expect(sw.isCacheableResponse(response({ redirected: true }))).toBe(false);
    expect(sw.isCacheableResponse(null)).toBe(false);
  });

  it("rejects responses that set cookies, opt out, or vary on everything", () => {
    expect(sw.isCacheableResponse(response({ headers: { "set-cookie": "__Host-dz_session=abc" } }))).toBe(false);
    expect(sw.isCacheableResponse(response({ headers: { "x-offline-cache": "none" } }))).toBe(false);
    expect(sw.isCacheableResponse(response({ headers: { vary: "*" } }))).toBe(false);
  });

  it("honours no-store for assets", () => {
    expect(sw.isCacheableResponse(response({ headers: { "cache-control": "no-store" } }))).toBe(false);
    expect(sw.isCacheableResponse(response({ headers: { "cache-control": "private, no-store, max-age=0" } }))).toBe(false);
    expect(sw.isCacheableResponse(response({ headers: { "cache-control": "public, max-age=31536000, immutable" } }))).toBe(
      true,
    );
  });

  it("requires text/html for pages and ignores Next's blanket no-store on dynamic pages", () => {
    const nextDynamicPage = {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding",
    };
    expect(sw.isCacheableResponse(response({ headers: nextDynamicPage }), { html: true })).toBe(true);
    expect(sw.isCacheableResponse(response({ headers: { "content-type": "application/json" } }), { html: true })).toBe(false);
    expect(sw.isCacheableResponse(response({ headers: { "content-type": "text/x-component" } }), { html: true })).toBe(false);
    expect(
      sw.isCacheableResponse(response({ headers: { ...nextDynamicPage, "x-offline-cache": "none" } }), { html: true }),
    ).toBe(false);
    expect(sw.isCacheableResponse(response({ headers: nextDynamicPage, redirected: true }), { html: true })).toBe(false);
  });
});

describe("cache housekeeping", () => {
  it("evicts the oldest entries beyond the limit", () => {
    const keys = Array.from({ length: 33 }, (_, i) => `k${i}`);
    expect(sw.selectEvictions(keys, 30)).toEqual(["k0", "k1", "k2"]);
    expect(sw.selectEvictions(keys.slice(0, 30), 30)).toEqual([]);
    expect(sw.selectEvictions(keys, null)).toEqual([]);
  });

  it("deletes only our caches from older versions on activate", () => {
    const current = Object.values(sw.CACHE_NAMES);
    expect(sw.cachesToDelete([...current, "dz-static-v0", "dz-lessons-v0", "workbox-precache", "other-app"])).toEqual([
      "dz-static-v0",
      "dz-lessons-v0",
    ]);
  });

  it("identifies personal caches of any version", () => {
    expect(sw.isPersonalCacheName(sw.CACHE_NAMES.lessons)).toBe(true);
    expect(sw.isPersonalCacheName("dz-lessons-v0")).toBe(true);
    expect(sw.isPersonalCacheName(sw.CACHE_NAMES.static)).toBe(false);
    expect(sw.isPersonalCacheName(sw.CACHE_NAMES.shell)).toBe(false);
  });
});

describe("precache and Data Saver", () => {
  it("skips the extras when Data Saver is on", () => {
    expect(sw.isSaveDataEnabled({ connection: { saveData: true } })).toBe(true);
    expect(sw.isSaveDataEnabled({ connection: { saveData: false } })).toBe(false);
    expect(sw.isSaveDataEnabled({})).toBe(false);
    expect(sw.isSaveDataEnabled(undefined)).toBe(false);
    expect(sw.precacheExtras({ saveData: true })).toEqual([]);
    expect(sw.precacheExtras({ saveData: false }).length).toBeGreaterThan(0);
  });

  it("never lists a page or API route as a precache extra", () => {
    for (const path of sw.PRECACHE_EXTRAS) {
      expect(["cache-first", "stale-while-revalidate"]).toContain(strategyOf(get(path)));
    }
  });

  it("extracts hashed asset URLs from HTML, including the inline RSC chunk lists", () => {
    const html = `<!DOCTYPE html><html><head>
      <link rel="stylesheet" href="/_next/static/css/app-5b2e.css" data-precedence="next"/>
      <link rel="preload" href="/_next/static/media/a34f-s.p.woff2" as="font" crossorigin="" type="font/woff2"/>
      <script src="/_next/static/chunks/webpack-1a2b.js" async=""></script>
      <script src="/_next/static/chunks/webpack-1a2b.js" async=""></script>
      <link rel="icon" href="/icon.svg"/>
      </head><body><script>self.__next_f.push([1,"3:I[\\"/_next/static/chunks/app/offline/page-9f8e.js\\",[]]"])</script>
      <img src="/_next/image?url=%2Fx.png&amp;w=64"/></body></html>`;
    expect(sw.extractStaticAssetUrls(html, ORIGIN)).toEqual([
      `${ORIGIN}/_next/static/css/app-5b2e.css`,
      `${ORIGIN}/_next/static/media/a34f-s.p.woff2`,
      `${ORIGIN}/_next/static/chunks/webpack-1a2b.js`,
      `${ORIGIN}/_next/static/chunks/app/offline/page-9f8e.js`,
    ]);
  });

  it("keeps Turbopack chunk names with brackets and deployment ids intact", () => {
    const html =
      '<link rel="stylesheet" href="/_next/static/chunks/%5Broot-of-the-server%5D__1ja13_k._.css"/>' +
      '<link rel="stylesheet" href="/_next/static/chunks/[next]_internal_font_google_1igg3k2._.single.css"/>' +
      '<script src="/_next/static/chunks/0d_ks0ow7ur6m.js?dpl=dpl_abc123" async=""></script>';
    expect(sw.extractStaticAssetUrls(html, ORIGIN)).toEqual([
      `${ORIGIN}/_next/static/chunks/%5Broot-of-the-server%5D__1ja13_k._.css`,
      `${ORIGIN}/_next/static/chunks/[next]_internal_font_google_1igg3k2._.single.css`,
      `${ORIGIN}/_next/static/chunks/0d_ks0ow7ur6m.js?dpl=dpl_abc123`,
    ]);
  });

  it("caps the number of extracted assets", () => {
    const html = Array.from({ length: 100 }, (_, i) => `<script src="/_next/static/chunks/c${i}.js"></script>`).join("");
    expect(sw.extractStaticAssetUrls(html, ORIGIN)).toHaveLength(sw.MAX_PRECACHE_ASSETS);
  });
});

describe("saved page metadata", () => {
  it("extracts and decodes the document title", () => {
    expect(sw.extractTitle("<html><head><title>Quadratic equations &amp; graphs · BvunzoHub</title></head></html>")).toBe(
      "Quadratic equations & graphs · BvunzoHub",
    );
    expect(sw.extractTitle('<title data-x="1">\n  Circle   theorems &#8211; &#x3C0;r&#178; \n</title>')).toBe(
      "Circle theorems – πr²",
    );
    expect(sw.extractTitle("<html><head></head></html>")).toBeNull();
    expect(sw.extractTitle("<title>   </title>")).toBeNull();
    expect(sw.extractTitle(`<title>${"x".repeat(500)}</title>`)).toHaveLength(200);
  });

  it("leaves unknown or invalid entities untouched", () => {
    expect(sw.decodeHtmlEntities("a &bogus; b &#99999999; c")).toBe("a &bogus; b &#99999999; c");
  });

  it("builds stored headers without cookies or transport encodings, with encoded metadata", () => {
    const headers = new Map(
      Object.entries({
        "content-type": "text/html; charset=utf-8",
        "content-encoding": "br",
        "content-length": "1234",
        "set-cookie": "a=b",
        "x-dz-title": "spoofed",
      }),
    );
    const stored = new Map(sw.storedHeaders(headers.entries(), { cachedAt: "2026-10-05T10:00:00.000Z", title: "Ndebele · Ọ̀rọ̀" }));
    expect(stored.get("content-type")).toBe("text/html; charset=utf-8");
    expect(stored.has("content-encoding")).toBe(false);
    expect(stored.has("content-length")).toBe(false);
    expect(stored.has("set-cookie")).toBe(false);
    expect(stored.get("x-dz-cached-at")).toBe("2026-10-05T10:00:00.000Z");
    expect(decodeURIComponent(stored.get("x-dz-title") ?? "")).toBe("Ndebele · Ọ̀rọ̀");
    // Header values must be ByteStrings.
    expect(() => new Headers([...stored.entries()])).not.toThrow();
  });

  it("omits the title header when there is no title", () => {
    const stored = new Map(sw.storedHeaders([], { cachedAt: "2026-10-05T10:00:00.000Z", title: null }));
    expect(stored.has("x-dz-title")).toBe(false);
  });
});

describe("readMessageType", () => {
  it("reads a string type and rejects anything else", () => {
    expect(sw.readMessageType({ type: "SKIP_WAITING" })).toBe("SKIP_WAITING");
    expect(sw.readMessageType({ type: 1 })).toBeNull();
    expect(sw.readMessageType("SKIP_WAITING")).toBeNull();
    expect(sw.readMessageType(null)).toBeNull();
  });
});

// PRIV-01: saved lessons are bound to the student they were rendered for (shared phones).
describe("viewer binding of saved lessons", () => {
  const A = "0123456789abcdef0123456789abcdef";
  const B = "fedcba9876543210fedcba9876543210";

  it("reads the viewer tag from the page, whatever the attribute order, and rejects malformed tags", () => {
    expect(sw.extractViewer(`<head><meta name="dz-viewer" content="${A}"/><title>x</title></head>`)).toBe(A);
    expect(sw.extractViewer(`<meta content='${B}' name='dz-viewer'>`)).toBe(B);
    expect(sw.extractViewer(`<meta name="description" content="${A}"><p>no tag</p>`)).toBeNull();
    expect(sw.extractViewer(`<meta name="dz-viewer" content="not-hex">`)).toBeNull();
    expect(sw.extractViewer(`<meta name="dz-viewer" content="${A}"><meta name="dz-viewer" content="${B}">`)).toBe(A);
  });

  it("shows a saved copy only to the viewer it was saved for", () => {
    expect(sw.savedCopyAllowed(A, A)).toBe(true);
    expect(sw.savedCopyAllowed(A, B)).toBe(false);
    expect(sw.savedCopyAllowed(A, null)).toBe(false);
    expect(sw.savedCopyAllowed(null, A)).toBe(false); // saved before tags existed
    expect(sw.savedCopyAllowed("x", "x")).toBe(false);
  });

  it("reads SET_VIEWER messages and refuses malformed ones", () => {
    expect(sw.readViewerMessage({ type: SW_MESSAGES.setViewer, viewer: A })).toBe(A);
    expect(sw.readViewerMessage({ type: SW_MESSAGES.setViewer, viewer: "u-1" })).toBeNull();
    expect(sw.readViewerMessage({ type: SW_MESSAGES.clearPersonalCaches, viewer: A })).toBeNull();
    expect(sw.readViewerMessage(null)).toBeNull();
  });

  it("recognises requests that can start a session (sign-in, sign-up, verification, reset, OAuth)", () => {
    const post = (path: string, origin = ORIGIN): RequestLike => ({ url: `${origin}${path}`, method: "POST", headers: new Headers({ "next-action": "a1" }) });
    for (const path of ["/login", "/login?next=%2Fapp", "/register", "/verify", "/reset-password"]) {
      expect(sw.isSessionStartRequest(post(path), ORIGIN), path).toBe(true);
    }
    expect(sw.isSessionStartRequest(navigate("/api/auth/google/start"), ORIGIN)).toBe(true);
    expect(sw.isSessionStartRequest(navigate("/api/auth/google/callback?code=x"), ORIGIN)).toBe(true);
    // Viewing the forms, other posts and other origins are not.
    expect(sw.isSessionStartRequest(navigate("/login"), ORIGIN)).toBe(false);
    expect(sw.isSessionStartRequest(post("/app/practice"), ORIGIN)).toBe(false);
    expect(sw.isSessionStartRequest(post("/loginx"), ORIGIN)).toBe(false);
    expect(sw.isSessionStartRequest(post("/login", "https://evil.example"), ORIGIN)).toBe(false);
  });

  it("recognises a navigation that was redirected to the sign-in page", () => {
    expect(sw.landedOnSignIn({ redirected: true, url: `${ORIGIN}/login?next=%2Fapp%2Flessons%2Fl1` })).toBe(true);
    expect(sw.landedOnSignIn({ redirected: false, url: `${ORIGIN}/login` })).toBe(false);
    expect(sw.landedOnSignIn({ redirected: true, url: `${ORIGIN}/onboarding` })).toBe(false);
    expect(sw.landedOnSignIn({ redirected: true, url: "" })).toBe(false);
    expect(sw.landedOnSignIn(null)).toBe(false);
  });

  it("stores the viewer tag with the page and never keeps one sent by the server", () => {
    const original = new Headers({ "content-type": "text/html", "x-dz-viewer": B });
    const stored = new Map(sw.storedHeaders(original.entries(), { cachedAt: "2026-10-05T10:00:00.000Z", title: null, viewer: A }));
    expect(stored.get(META_HEADERS.viewer)).toBe(A);
    const unbound = new Map(sw.storedHeaders(original.entries(), { cachedAt: "2026-10-05T10:00:00.000Z", title: null }));
    expect(unbound.has(META_HEADERS.viewer)).toBe(false);
  });
});
