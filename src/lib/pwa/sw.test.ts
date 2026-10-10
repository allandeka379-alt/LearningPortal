import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { CACHE_NAMES, META_HEADERS, SW_MESSAGES } from "./constants";
import { FakeCacheStorage, htmlResponse, publicFileUrl } from "./testing";

/**
 * Behavioural tests of public/sw.js: the real worker module runs against an in-memory ServiceWorkerGlobalScope
 * (fake caches, fetch, clients, registration) and is driven by dispatching install/activate/fetch/message events.
 */

const ORIGIN = "https://dzidza.example";
const OFFLINE_HTML = `<!DOCTYPE html><html><head><title>Offline · BvunzoHub</title>
  <link rel="stylesheet" href="/_next/static/css/app-1.css"/>
  <script src="/_next/static/chunks/main-1.js" async=""></script></head><body>offline</body></html>`;

type Listener = (event: unknown) => void;
type Handler = () => Response | Promise<Response>;

class FakeScope {
  readonly listeners = new Map<string, Listener[]>();
  readonly location = { origin: ORIGIN };
  caches = new FakeCacheStorage();
  navigator: { connection?: { saveData?: boolean } } = {};
  readonly registration = { navigationPreload: { enable: vi.fn(async () => undefined) } };
  readonly clients = { claim: vi.fn(async () => undefined) };
  readonly skipWaiting = vi.fn(async () => undefined);
  readonly routes = new Map<string, Handler>();
  readonly fetch = vi.fn(async (input: string | { url: string }) => {
    const url = typeof input === "string" ? input : input.url;
    const handler = this.routes.get(url);
    if (!handler) throw new TypeError("Failed to fetch");
    return handler();
  });

  addEventListener(type: string, listener: Listener): void {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }

  dispatch(type: string, event: unknown): void {
    for (const listener of this.listeners.get(type) ?? []) listener(event);
  }

  reset(): void {
    this.caches = new FakeCacheStorage();
    this.navigator = {};
    this.routes.clear();
    this.fetch.mockClear();
    this.skipWaiting.mockClear();
    this.clients.claim.mockClear();
    this.registration.navigationPreload.enable.mockClear();
  }
}

const scope = new FakeScope();

interface Dispatched {
  responded: boolean;
  response: () => Promise<Response>;
  /** Waits for every waitUntil() promise, including ones added later. */
  done: () => Promise<void>;
}

function dispatch(type: string, extra: Record<string, unknown>): Dispatched {
  const pending: Promise<unknown>[] = [];
  let responded: Promise<Response> | null = null;
  const event = {
    ...extra,
    waitUntil: (promise: Promise<unknown>) => {
      pending.push(promise);
    },
    respondWith: (promise: Promise<Response>) => {
      responded = Promise.resolve(promise);
      pending.push(responded);
    },
  };
  scope.dispatch(type, event);
  return {
    get responded() {
      return responded !== null;
    },
    response: async () => {
      if (responded === null) throw new Error("respondWith was not called");
      return responded;
    },
    done: async () => {
      let seen = -1;
      while (seen !== pending.length) {
        seen = pending.length;
        await Promise.allSettled(pending);
      }
    },
  };
}

function request(path: string, init: { method?: string; mode?: string; headers?: Record<string, string> } = {}) {
  return { url: `${ORIGIN}${path}`, method: init.method ?? "GET", mode: init.mode ?? "no-cors", headers: new Headers(init.headers) };
}

function fetchEvent(path: string, init: { method?: string; mode?: string; headers?: Record<string, string>; preload?: Response } = {}) {
  return dispatch("fetch", { request: request(path, init), preloadResponse: Promise.resolve(init.preload) });
}

function navigate(path: string, preload?: Response) {
  return fetchEvent(path, { mode: "navigate", preload });
}

/** Viewer tags (opaque per-student hashes) of two students sharing a phone. */
const VIEWER_A = "0123456789abcdef0123456789abcdef";
const VIEWER_B = "fedcba9876543210fedcba9876543210";
const VIEWER_STATE_KEY = `${ORIGIN}/__dz/active-viewer`;

/** A student-area lesson page rendered for `viewer` (`null`: no viewer tag, e.g. signed out). */
function lessonHtml(title: string, body = "lesson body", viewer: string | null = VIEWER_A): string {
  const meta = viewer === null ? "" : `<meta name="dz-viewer" content="${viewer}"/>`;
  return `<!DOCTYPE html><html><head>${meta}<title>${title} · BvunzoHub</title></head><body>${body}</body></html>`;
}

function route(path: string, handler: Handler): void {
  scope.routes.set(`${ORIGIN}${path}`, handler);
}

async function seedOfflinePage(): Promise<void> {
  const shell = await scope.caches.open(CACHE_NAMES.shell);
  await shell.put(`${ORIGIN}/offline`, htmlResponse(OFFLINE_HTML));
}

async function seedLesson(path: string, html: string, viewer: string | null = VIEWER_A): Promise<void> {
  const lessons = await scope.caches.open(CACHE_NAMES.lessons);
  const headers: Record<string, string> = { [META_HEADERS.cachedAt]: "2026-10-01T08:00:00.000Z" };
  if (viewer !== null) headers[META_HEADERS.viewer] = viewer;
  await lessons.put(`${ORIGIN}${path}`, htmlResponse(html, { headers }));
}

/** The student the worker currently shows saved lessons to (as the student area last reported). */
async function setActiveViewer(viewer: string): Promise<void> {
  const shell = await scope.caches.open(CACHE_NAMES.shell);
  await shell.put(VIEWER_STATE_KEY, new Response(viewer));
}

async function activeViewer(): Promise<string | null> {
  const stored = await scope.caches.peek(CACHE_NAMES.shell)?.match(VIEWER_STATE_KEY);
  return stored ? stored.text() : null;
}

beforeAll(async () => {
  Object.defineProperty(globalThis, "self", { value: scope, configurable: true, writable: true });
  await import(/* @vite-ignore */ publicFileUrl("sw.js"));
});

afterAll(() => {
  Reflect.deleteProperty(globalThis, "self");
});

beforeEach(() => {
  scope.reset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("install", () => {
  it("precaches the offline page, the assets it references and the shell extras", async () => {
    route("/offline", () => htmlResponse(OFFLINE_HTML));
    route("/_next/static/css/app-1.css", () => new Response("css"));
    route("/_next/static/chunks/main-1.js", () => new Response("js"));
    route("/icons/icon-192.png", () => new Response("png"));
    route("/icons/icon.svg", () => new Response("svg"));
    route("/manifest.webmanifest", () => new Response("{}"));

    const event = dispatch("install", {});
    await event.done();

    expect(scope.caches.peek(CACHE_NAMES.shell)?.urls()).toEqual(
      expect.arrayContaining([`${ORIGIN}/offline`, `${ORIGIN}/manifest.webmanifest`]),
    );
    expect(scope.caches.peek(CACHE_NAMES.static)?.urls()).toEqual(
      expect.arrayContaining([
        `${ORIGIN}/_next/static/css/app-1.css`,
        `${ORIGIN}/_next/static/chunks/main-1.js`,
        `${ORIGIN}/icons/icon-192.png`,
      ]),
    );
    expect(scope.fetch).toHaveBeenCalledWith(`${ORIGIN}/offline`, expect.objectContaining({ cache: "reload" }));
  });

  it("skips the extras when Data Saver is on", async () => {
    scope.navigator = { connection: { saveData: true } };
    route("/offline", () => htmlResponse(OFFLINE_HTML));
    route("/_next/static/css/app-1.css", () => new Response("css"));
    route("/_next/static/chunks/main-1.js", () => new Response("js"));

    await dispatch("install", {}).done();

    expect(scope.caches.peek(CACHE_NAMES.shell)?.urls()).toEqual([`${ORIGIN}/offline`]);
    const fetched = scope.fetch.mock.calls.map(([input]) => (typeof input === "string" ? input : input.url));
    expect(fetched.some((url) => url.includes("/icons/") || url.includes("manifest"))).toBe(false);
  });

  it("tolerates a failing optional asset but fails the install when the offline page is missing", async () => {
    route("/offline", () => htmlResponse(OFFLINE_HTML));
    await dispatch("install", {}).done();
    expect(scope.caches.peek(CACHE_NAMES.shell)?.urls()).toContain(`${ORIGIN}/offline`);

    scope.reset();
    route("/offline", () => htmlResponse("down", { status: 503 }));
    const pending: Promise<unknown>[] = [];
    scope.dispatch("install", { waitUntil: (p: Promise<unknown>) => pending.push(p) });
    await expect(pending[0]).rejects.toThrow(/offline/);
  });
});

describe("activate", () => {
  it("deletes our old caches only, enables navigation preload and claims pages", async () => {
    for (const name of ["dz-static-v0", "dz-lessons-v0", "another-app-cache", CACHE_NAMES.static]) await scope.caches.open(name);

    await dispatch("activate", {}).done();

    expect(await scope.caches.keys()).toEqual(["another-app-cache", CACHE_NAMES.static]);
    expect(scope.registration.navigationPreload.enable).toHaveBeenCalled();
    expect(scope.clients.claim).toHaveBeenCalled();
  });

  it("trims the static cache to its limit", async () => {
    const statics = await scope.caches.open(CACHE_NAMES.static);
    for (let i = 0; i < 205; i++) await statics.put(`${ORIGIN}/_next/static/chunks/c${i}.js`, new Response("x"));

    await dispatch("activate", {}).done();

    const urls = statics.urls();
    expect(urls).toHaveLength(200);
    expect(urls[0]).toBe(`${ORIGIN}/_next/static/chunks/c5.js`);
  });
});

describe("lesson pages", () => {
  it("returns the network response and saves a copy with its title and save time", async () => {
    route("/app/lessons/l1", () => htmlResponse(lessonHtml("Quadratic equations")));

    const event = navigate("/app/lessons/l1");
    const response = await event.response();
    expect(await response.text()).toContain("lesson body");
    await event.done();

    const saved = await scope.caches.peek(CACHE_NAMES.lessons)?.match(`${ORIGIN}/app/lessons/l1`);
    expect(saved).toBeDefined();
    expect(await saved?.text()).toBe(lessonHtml("Quadratic equations"));
    expect(decodeURIComponent(saved?.headers.get(META_HEADERS.title) ?? "")).toBe("Quadratic equations · BvunzoHub");
    expect(Number.isNaN(Date.parse(saved?.headers.get(META_HEADERS.cachedAt) ?? ""))).toBe(false);
  });

  it("uses the navigation preload response instead of a second fetch", async () => {
    const event = navigate("/app/lessons/l1", htmlResponse(lessonHtml("Preloaded")));
    expect(await (await event.response()).text()).toContain("Preloaded");
    await event.done();
    expect(scope.fetch).not.toHaveBeenCalled();
    expect(scope.caches.peek(CACHE_NAMES.lessons)?.urls()).toEqual([`${ORIGIN}/app/lessons/l1`]);
  });

  it("serves the saved copy when offline", async () => {
    await seedLesson("/app/lessons/l1", lessonHtml("Saved"));
    await setActiveViewer(VIEWER_A);

    const event = navigate("/app/lessons/l1?tab=examples");
    expect(await (await event.response()).text()).toBe(lessonHtml("Saved"));
    await event.done();
  });

  it("shows the offline page for a lesson that was never saved", async () => {
    await seedOfflinePage();
    const event = navigate("/app/lessons/never-opened");
    expect(await (await event.response()).text()).toBe(OFFLINE_HTML);
  });

  it("falls back to a minimal built-in page when even the offline page is missing", async () => {
    const response = await navigate("/app/lessons/never-opened").response();
    expect(response.status).toBe(503);
    expect(await response.text()).toContain("You are offline");
  });

  it("serves the saved copy after the timeout on a slow network, and stores the late response", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await seedLesson("/app/lessons/slow", lessonHtml("Old copy"));
    await setActiveViewer(VIEWER_A);
    let arrive: (response: Response) => void = () => {};
    route("/app/lessons/slow", () => new Promise<Response>((resolve) => (arrive = resolve)));

    const event = navigate("/app/lessons/slow");
    let settled = false;
    void event.response().then(() => (settled = true));
    await vi.advanceTimersByTimeAsync(3999);
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(settled).toBe(true);
    expect(await (await event.response()).text()).toBe(lessonHtml("Old copy"));

    arrive(htmlResponse(lessonHtml("New copy")));
    await event.done();
    const saved = await scope.caches.peek(CACHE_NAMES.lessons)?.match(`${ORIGIN}/app/lessons/slow`);
    expect(await saved?.text()).toBe(lessonHtml("New copy"));
  });

  it("waits for the network (no timeout) when there is no saved copy", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    let arrive: (response: Response) => void = () => {};
    route("/app/lessons/slow", () => new Promise<Response>((resolve) => (arrive = resolve)));

    const event = navigate("/app/lessons/slow");
    await vi.advanceTimersByTimeAsync(10_000);
    arrive(htmlResponse(lessonHtml("Eventually")));
    expect(await (await event.response()).text()).toBe(lessonHtml("Eventually"));
  });

  it("prefers the saved copy over a server error, but returns the error when nothing is saved", async () => {
    route("/app/lessons/l1", () => htmlResponse("boom", { status: 502 }));
    expect((await navigate("/app/lessons/l1").response()).status).toBe(502);

    await seedLesson("/app/lessons/l1", lessonHtml("Saved"));
    await setActiveViewer(VIEWER_A);
    expect(await (await navigate("/app/lessons/l1").response()).text()).toBe(lessonHtml("Saved"));
  });

  it("forgets a saved lesson that no longer exists (404)", async () => {
    await seedLesson("/app/lessons/gone", lessonHtml("Gone"));
    route("/app/lessons/gone", () => htmlResponse("not found", { status: 404 }));

    const event = navigate("/app/lessons/gone");
    expect((await event.response()).status).toBe(404);
    await event.done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)?.urls()).toEqual([]);
  });

  it("does not save redirected responses (e.g. expired session → /login) or opted-out pages", async () => {
    route("/app/lessons/redirected", () => {
      const response = htmlResponse("<title>Sign in</title>");
      Object.defineProperty(response, "redirected", { value: true });
      return response;
    });
    route("/app/lessons/opt-out", () => htmlResponse(lessonHtml("Private"), { headers: { "x-offline-cache": "none" } }));

    await navigate("/app/lessons/redirected").done();
    await navigate("/app/lessons/opt-out").done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)?.urls() ?? []).toEqual([]);
  });

  it("keeps at most 30 lessons, evicting the least recently viewed", async () => {
    for (let i = 0; i < 31; i++) {
      route(`/app/lessons/l${i}`, () => htmlResponse(lessonHtml(`Lesson ${i}`)));
      await navigate(`/app/lessons/l${i}`).done();
    }
    const urls = scope.caches.peek(CACHE_NAMES.lessons)?.urls() ?? [];
    expect(urls).toHaveLength(30);
    expect(urls).not.toContain(`${ORIGIN}/app/lessons/l0`);
    expect(urls.at(-1)).toBe(`${ORIGIN}/app/lessons/l30`);
  });

  it("marks a lesson read offline as recently used", async () => {
    await seedLesson("/app/lessons/a", lessonHtml("A"));
    await seedLesson("/app/lessons/b", lessonHtml("B"));
    await setActiveViewer(VIEWER_A);

    await navigate("/app/lessons/a").done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)?.urls()).toEqual([`${ORIGIN}/app/lessons/b`, `${ORIGIN}/app/lessons/a`]);
  });
});

describe("never-cache navigations", () => {
  it("never stores live exam pages and shows the offline page when the network fails", async () => {
    route("/app/exams/attempt/x", () => htmlResponse("<title>Exam</title>"));
    const online = navigate("/app/exams/attempt/x");
    expect(await (await online.response()).text()).toBe("<title>Exam</title>");
    await online.done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)).toBeUndefined();

    await seedOfflinePage();
    scope.routes.clear();
    expect(await (await navigate("/app/exams/attempt/x").response()).text()).toBe(OFFLINE_HTML);
  });

  it("does not store ordinary pages such as the dashboard", async () => {
    route("/app", () => htmlResponse("<title>Dashboard</title>"));
    await navigate("/app").done();
    expect(await scope.caches.keys()).toEqual([]);
  });

  it("does not answer API, RSC, Server Action or other non-GET requests", () => {
    expect(fetchEvent("/api/v1/me").responded).toBe(false);
    expect(fetchEvent("/app/lessons/l1", { headers: { rsc: "1" } }).responded).toBe(false);
    expect(fetchEvent("/app/lessons/l1", { method: "POST", mode: "navigate", headers: { "next-action": "abc" } }).responded).toBe(
      false,
    );
    expect(fetchEvent("/app/lessons/l1", { method: "HEAD", headers: { rsc: "1" } }).responded).toBe(false);
    expect(scope.fetch).not.toHaveBeenCalled();
  });
});

describe("assets", () => {
  it("serves hashed assets cache-first", async () => {
    route("/_next/static/chunks/a.js", () => new Response("chunk", { headers: { "cache-control": "public, max-age=31536000, immutable" } }));

    const first = fetchEvent("/_next/static/chunks/a.js");
    expect(await (await first.response()).text()).toBe("chunk");
    await first.done();

    scope.routes.clear();
    const second = fetchEvent("/_next/static/chunks/a.js");
    expect(await (await second.response()).text()).toBe("chunk");
    expect(scope.fetch).toHaveBeenCalledTimes(1);
  });

  it("does not store assets marked no-store or error responses", async () => {
    route("/_next/static/chunks/b.js", () => new Response("b", { headers: { "cache-control": "no-store" } }));
    route("/_next/static/chunks/c.js", () => new Response("missing", { status: 404 }));
    await fetchEvent("/_next/static/chunks/b.js").done();
    await fetchEvent("/_next/static/chunks/c.js").done();
    expect(scope.caches.peek(CACHE_NAMES.static)?.urls() ?? []).toEqual([]);
  });

  it("serves the manifest stale-while-revalidate", async () => {
    const shell = await scope.caches.open(CACHE_NAMES.shell);
    await shell.put(`${ORIGIN}/manifest.webmanifest`, new Response("old"));
    route("/manifest.webmanifest", () => new Response("new"));

    const event = fetchEvent("/manifest.webmanifest");
    expect(await (await event.response()).text()).toBe("old");
    await event.done();
    expect(await (await shell.match(`${ORIGIN}/manifest.webmanifest`))?.text()).toBe("new");
  });
});

describe("personal data and messages", () => {
  it("deletes saved lessons when the logout endpoint is called, without answering the request", async () => {
    await seedLesson("/app/lessons/a", lessonHtml("A"));
    await scope.caches.open(CACHE_NAMES.static);

    const event = fetchEvent("/api/auth/logout", { method: "POST" });
    expect(event.responded).toBe(false);
    await event.done();
    expect(await scope.caches.keys()).toEqual([CACHE_NAMES.static]);
  });

  it("clears personal caches and skips waiting on request from the page", async () => {
    await seedLesson("/app/lessons/a", lessonHtml("A"));
    await scope.caches.open("dz-lessons-v0");
    await scope.caches.open(CACHE_NAMES.fonts);

    await dispatch("message", { data: { type: SW_MESSAGES.clearPersonalCaches } }).done();
    expect(await scope.caches.keys()).toEqual([CACHE_NAMES.fonts]);

    await dispatch("message", { data: { type: SW_MESSAGES.skipWaiting } }).done();
    expect(scope.skipWaiting).toHaveBeenCalledTimes(1);
  });

  // PRIV-01 regression: lesson pages were cached under their URL only and served to whoever used the browser next.
  // Student A's saved page (A's name, streak, countdown, progress, premium content) went to student B after A's session
  // ended without an explicit sign-out (expiry, revocation, admin sign-out), on any slow (> 4 s) or failing network.
  it("never shows a saved lesson to a different student than the one it was saved for", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await seedOfflinePage();
    await seedLesson("/app/lessons/shared", lessonHtml("Student A lesson", "Tendai · streak 12"), VIEWER_A);
    // Student B is now the signed-in student on this phone (no message has deleted A's page yet).
    await setActiveViewer(VIEWER_B);
    route("/app/lessons/shared", () => new Promise<Response>(() => undefined)); // slower than the timeout

    const slow = navigate("/app/lessons/shared");
    let settled = false;
    void slow.response().then(() => (settled = true));
    await vi.advanceTimersByTimeAsync(10_000);
    expect(settled).toBe(false); // waits for the network instead of showing A's copy

    scope.routes.clear(); // offline: the offline page, not A's lesson
    expect(await (await navigate("/app/lessons/shared").response()).text()).toBe(OFFLINE_HTML);
    // A copy saved before pages carried a viewer is never shown either.
    await seedLesson("/app/lessons/legacy", lessonHtml("Legacy", "x", null), null);
    expect(await (await navigate("/app/lessons/legacy").response()).text()).toBe(OFFLINE_HTML);
  });

  it("deletes the previous student's saved lessons when another student is reported or rendered", async () => {
    await seedLesson("/app/lessons/a1", lessonHtml("A1"), VIEWER_A);
    await setActiveViewer(VIEWER_A);
    // Same student again: nothing changes.
    await dispatch("message", { data: { type: SW_MESSAGES.setViewer, viewer: VIEWER_A } }).done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)?.urls()).toEqual([`${ORIGIN}/app/lessons/a1`]);

    // The student area reports student B (signed in after A's session ended).
    await dispatch("message", { data: { type: SW_MESSAGES.setViewer, viewer: VIEWER_B } }).done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)).toBeUndefined();
    expect(await activeViewer()).toBe(VIEWER_B);

    // A fresh page rendered for another student switches too, before anything is shown from the cache.
    await seedLesson("/app/lessons/b1", lessonHtml("B1"), VIEWER_B);
    route("/app/lessons/c1", () => htmlResponse(lessonHtml("C1", "lesson body", VIEWER_A)));
    await navigate("/app/lessons/c1").done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)?.urls()).toEqual([`${ORIGIN}/app/lessons/c1`]);
    expect(await activeViewer()).toBe(VIEWER_A);
    const saved = await scope.caches.peek(CACHE_NAMES.lessons)?.match(`${ORIGIN}/app/lessons/c1`);
    expect(saved?.headers.get(META_HEADERS.viewer)).toBe(VIEWER_A);

    // Malformed tags are ignored; pages without a tag (signed out) are not saved.
    await dispatch("message", { data: { type: SW_MESSAGES.setViewer, viewer: "user-123" } }).done();
    expect(await activeViewer()).toBe(VIEWER_A);
    route("/app/lessons/untagged", () => htmlResponse(lessonHtml("Untagged", "x", null)));
    await navigate("/app/lessons/untagged").done();
    expect(scope.caches.peek(CACHE_NAMES.lessons)?.urls()).toEqual([`${ORIGIN}/app/lessons/c1`]);
  });

  it("deletes saved lessons when someone signs in, signs up or uses Google sign-in on the device", async () => {
    const cases: [string, { method?: string; mode?: string; headers?: Record<string, string> }][] = [
      ["/login", { method: "POST", headers: { "next-action": "abc" } }],
      ["/register", { method: "POST", headers: { "next-action": "abc" } }],
      ["/verify", { method: "POST", headers: { "next-action": "abc" } }],
      ["/api/auth/google/start", { mode: "navigate" }],
    ];
    for (const [path, init] of cases) {
      await seedLesson("/app/lessons/a", lessonHtml("A"));
      await setActiveViewer(VIEWER_A);
      route(path, () => htmlResponse("<title>ok</title>"));
      await fetchEvent(path, init).done();
      expect(scope.caches.peek(CACHE_NAMES.lessons), path).toBeUndefined();
      expect(await activeViewer(), path).toBeNull();
    }
  });

  it("deletes saved lessons when a navigation is redirected to sign in (the session ended)", async () => {
    for (const path of ["/app", "/app/lessons/a"]) {
      await seedLesson("/app/lessons/a", lessonHtml("A"));
      await setActiveViewer(VIEWER_A);
      route(path, () => {
        const response = htmlResponse("<title>Sign in</title>");
        Object.defineProperty(response, "redirected", { value: true });
        Object.defineProperty(response, "url", { value: `${ORIGIN}/login?next=${encodeURIComponent(path)}` });
        return response;
      });
      await navigate(path).done();
      expect(scope.caches.peek(CACHE_NAMES.lessons), path).toBeUndefined();
      expect(await activeViewer(), path).toBeNull();
    }
  });

  it("ignores malformed messages", async () => {
    await dispatch("message", { data: "SKIP_WAITING" }).done();
    await dispatch("message", { data: null }).done();
    expect(scope.skipWaiting).not.toHaveBeenCalled();
  });
});
