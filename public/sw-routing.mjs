// @ts-check
/**
 * Service worker routing policy (PRODUCT_SPEC §29, ARCHITECTURE §3.13, docs/OFFLINE.md).
 *
 * Pure decisions and constants only: nothing here touches `self`, `caches` or `fetch`, so Vitest imports this module
 * directly (src/lib/pwa/sw-routing.test.ts). `public/sw.js` (registered with `{ type: "module" }`) imports it and
 * performs the I/O.
 *
 * Served as-is from /public: plain modern JavaScript, no imports, no build step. The cache names, header names and
 * message types are mirrored in `src/lib/pwa/constants.ts` for the page side; a test asserts both copies match.
 *
 * Safety rules (never relaxed without a security review):
 * - Only same-origin GET requests are ever answered from or written to a cache, and only 200 responses that were not
 *   redirected and carry no Set-Cookie header.
 * - Never cached: /api/** (personalised JSON), RSC payloads (`RSC` header / `_rsc` param, personalised per user),
 *   Server Action POSTs, live exam state (/app/exams/attempt/**), auth routes, /admin/** and the parent / teacher /
 *   school / onboarding areas. HEAD requests always reach the network (Next's offline detection relies on that).
 * - The only HTML stored at runtime is a lesson page (/app/lessons/<id>) and the offline page.
 * - Saved lessons belong to ONE signed-in user (shared phones, PRIV-01). Each saved page carries the viewer tag of the
 *   user it was rendered for (`<meta name="dz-viewer">`, an opaque keyed hash of the user id); a saved copy is only
 *   used for a slow / failed network when its tag equals the ACTIVE viewer (the user the student area last reported).
 *   A different viewer (account switch), a sign-in attempt and a navigation that lands on /login (session ended)
 *   delete every saved page.
 */

/** Every cache this worker owns starts with this prefix; anything else in Cache Storage is left alone. */
export const CACHE_PREFIX = "dz-";

/**
 * Bump when the cache layout or stored format changes: `activate` deletes every `dz-*` cache not listed in
 * {@link CACHE_NAMES}. Hashed `/_next/static` assets do not need a bump per deploy (their URLs change).
 */
export const CACHE_VERSION = "v1";

export const CACHE_NAMES = Object.freeze({
  /** The offline page and app-shell extras (icons, manifest). */
  shell: `${CACHE_PREFIX}shell-${CACHE_VERSION}`,
  /** Content-hashed, immutable `/_next/static/**` assets and `/icons/**`. */
  static: `${CACHE_PREFIX}static-${CACHE_VERSION}`,
  /** Web fonts, including KaTeX's maths fonts. */
  fonts: `${CACHE_PREFIX}fonts-${CACHE_VERSION}`,
  /** Recently viewed lesson pages (personal: cleared on logout). */
  lessons: `${CACHE_PREFIX}lessons-${CACHE_VERSION}`,
});

/** Maximum entries per cache (oldest evicted first). `null` = unbounded (fixed, small contents). */
export const CACHE_MAX_ENTRIES = Object.freeze({
  [CACHE_NAMES.shell]: null,
  [CACHE_NAMES.static]: 200,
  [CACHE_NAMES.fonts]: 40,
  [CACHE_NAMES.lessons]: 30,
});

/** Caches holding a user's own pages. Deleted on logout (shared phones are common, ARCHITECTURE §3.13). */
export const PERSONAL_CACHE_PREFIXES = Object.freeze([`${CACHE_PREFIX}lessons-`]);

export const OFFLINE_URL = "/offline";

/**
 * How long a navigation waits for the network before a saved copy is shown instead. Only applies when a saved copy
 * exists; without one the request waits for the network as normal (a slow page beats an offline page).
 */
export const NAVIGATION_TIMEOUT_MS = 4000;

/** Upper bound on assets pulled from the offline page's HTML at install. */
export const MAX_PRECACHE_ASSETS = 40;

/** Nice-to-have shell files. Skipped when the user has Data Saver on. */
export const PRECACHE_EXTRAS = Object.freeze(["/icons/icon-192.png", "/icons/icon.svg", "/manifest.webmanifest"]);

/** Metadata the worker adds to stored lesson responses, read back by the offline page's saved-lesson list. */
export const META_HEADERS = Object.freeze({
  cachedAt: "x-dz-cached-at",
  /** `encodeURIComponent` of the page `<title>` (header values must be ByteStrings). */
  title: "x-dz-title",
  /** Viewer tag of the user the page was rendered for (see {@link VIEWER_META_NAME}). */
  viewer: "x-dz-viewer",
});

/**
 * `<meta name="dz-viewer" content="<tag>">`: rendered by the student area for the signed-in user. The tag is an opaque
 * keyed hash (hex), never the user id, so the worker can tell users apart without learning who they are.
 */
export const VIEWER_META_NAME = "dz-viewer";

/** Shell-cache key holding the active viewer tag (so it survives the worker being stopped and restarted). */
export const VIEWER_STATE_PATH = "/__dz/active-viewer";

const VIEWER_TAG = /^[a-f0-9]{16,64}$/;

/** A response carrying `X-Offline-Cache: none` is never stored, whatever its URL. */
export const OPT_OUT_HEADER = "x-offline-cache";

export const MESSAGE_TYPES = Object.freeze({
  /** Page → waiting worker: the user chose "Refresh" on the update prompt. */
  skipWaiting: "SKIP_WAITING",
  /** Page → worker: delete personal caches (logout, "Remove saved lessons"). */
  clearPersonalCaches: "CLEAR_PERSONAL_CACHES",
  /** Page → worker: the signed-in student area's viewer tag (`{ type, viewer }`); a change deletes saved pages. */
  setViewer: "SET_VIEWER",
});

export const STRATEGIES = Object.freeze({
  /** Not handled by the worker at all: the browser talks to the network directly. Nothing is cached. */
  passthrough: "passthrough",
  /** Navigation that always uses the network; shows the offline page when the network fails. Never cached. */
  networkOnly: "network-only",
  /** Navigation that prefers the network, stores the response, and falls back to the stored copy. */
  networkFirst: "network-first",
  /** Immutable asset: served from cache when present, otherwise fetched and stored. */
  cacheFirst: "cache-first",
  /** Small mutable asset (manifest, favicons): served from cache, refreshed in the background. */
  staleWhileRevalidate: "stale-while-revalidate",
});

/**
 * Navigations that must never be stored or answered from a cache, matched on whole path segments.
 * Anything not listed and not a lesson is also not stored; this list documents the hard "never" cases so a later
 * broadening of what is stored cannot include them by accident.
 */
export const NEVER_CACHE_NAVIGATION_PREFIXES = Object.freeze([
  "/api",
  "/app/exams/attempt",
  "/admin",
  "/login",
  "/register",
  "/verify",
  "/forgot-password",
  "/reset-password",
  "/logout",
  "/auth",
  "/onboarding",
  "/parent",
  "/teacher",
  "/school",
]);

/** Shell files outside /_next/static that change rarely but are not content-hashed. */
const SHELL_FILE_PATHS = new Set(["/manifest.webmanifest", "/icon.svg", "/apple-icon.png", "/favicon.ico"]);

const LOGOUT_PATH = "/api/auth/logout";
/** Pages whose form posts / Server Actions can start a session (sign-in, sign-up, code verification, password reset). */
const SESSION_START_PAGES = Object.freeze(["/login", "/register", "/verify", "/reset-password"]);
/** OAuth sign-in (start and provider callback), any method. */
const OAUTH_PREFIX = "/api/auth/google";
const SIGN_IN_PATH = "/login";
const LESSON_PATH = /^\/app\/lessons\/[^/]+$/;
const FONT_FILE = /\.(?:woff2?|ttf|otf)$/i;
const KATEX_FONT_FILE = /\/KaTeX_[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*\.(?:woff2?|ttf)$/;
// Turbopack chunk names can contain brackets ("[root-of-the-server]__…css"), raw or percent-encoded.
const STATIC_ASSET_REFERENCE = /\/_next\/static\/[\w\-./~%@[\]]+\.(?:js|css|woff2|woff)\b(?:\?dpl=[\w-]+)?/g;

/**
 * @typedef {{ get(name: string): string | null }} HeadersLike
 * @typedef {{ url: string; method: string; mode?: string; headers?: HeadersLike }} RequestLike
 * @typedef {{ strategy: "passthrough"; reason: string }} PassthroughDecision
 * @typedef {{ strategy: "network-only"; reason: string; offlineFallback: true }} NetworkOnlyDecision
 * @typedef {{ strategy: "network-first"; reason: string; offlineFallback: true; cacheName: string; cacheKey: string;
 *   maxEntries: number | null; timeoutMs: number }} NetworkFirstDecision
 * @typedef {{ strategy: "cache-first" | "stale-while-revalidate"; reason: string; cacheName: string; cacheKey: string;
 *   maxEntries: number | null }} CachedAssetDecision
 * @typedef {PassthroughDecision | NetworkOnlyDecision | NetworkFirstDecision | CachedAssetDecision} RouteDecision
 */

/**
 * True when `pathname` equals `prefix` or lies below it (`/school` does not match `/schools`).
 * @param {string} pathname
 * @param {string} prefix
 */
export function matchesPathPrefix(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** @param {string} pathname */
export function isLessonPath(pathname) {
  return LESSON_PATH.test(pathname);
}

/** @param {string} pathname */
export function isNeverCacheNavigation(pathname) {
  return NEVER_CACHE_NAVIGATION_PREFIXES.some((prefix) => matchesPathPrefix(pathname, prefix));
}

/**
 * Cache key for a lesson page: origin + path. Query strings and fragments are dropped so `?tab=examples` and the bare
 * URL share one saved copy (and one LRU slot).
 * @param {URL} url
 */
export function lessonCacheKey(url) {
  return `${url.origin}${url.pathname}`;
}

/**
 * Next.js App Router data requests (soft navigations, prefetches, the offline connectivity check): personalised
 * flight data that must never be cached or served stale.
 * @param {URL} url
 * @param {HeadersLike | undefined} headers
 */
export function isRscRequest(url, headers) {
  if (url.searchParams.has("_rsc")) return true;
  if (!headers) return false;
  return (
    headers.get("rsc") !== null || headers.get("next-router-prefetch") !== null || headers.get("next-router-state-tree") !== null
  );
}

/** @param {string} reason @returns {PassthroughDecision} */
function passthrough(reason) {
  return { strategy: STRATEGIES.passthrough, reason };
}

/** @param {string} reason @returns {NetworkOnlyDecision} */
function networkOnly(reason) {
  return { strategy: STRATEGIES.networkOnly, reason, offlineFallback: true };
}

/**
 * @param {"cache-first" | "stale-while-revalidate"} strategy
 * @param {string} cacheName
 * @param {URL} url
 * @param {string} reason
 * @returns {CachedAssetDecision}
 */
function cachedAsset(strategy, cacheName, url, reason) {
  return { strategy, reason, cacheName, cacheKey: url.href, maxEntries: CACHE_MAX_ENTRIES[cacheName] ?? null };
}

/**
 * @param {URL} url
 * @returns {RouteDecision}
 */
function classifyNavigation(url) {
  const path = url.pathname;
  if (isNeverCacheNavigation(path)) return networkOnly("never-cache navigation");
  if (isLessonPath(path)) {
    return {
      strategy: STRATEGIES.networkFirst,
      reason: "lesson page (saved for offline reading)",
      offlineFallback: true,
      cacheName: CACHE_NAMES.lessons,
      cacheKey: lessonCacheKey(url),
      maxEntries: CACHE_MAX_ENTRIES[CACHE_NAMES.lessons] ?? null,
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    };
  }
  if (path === OFFLINE_URL) {
    return {
      strategy: STRATEGIES.networkFirst,
      reason: "offline page (kept fresh)",
      offlineFallback: true,
      cacheName: CACHE_NAMES.shell,
      cacheKey: `${url.origin}${OFFLINE_URL}`,
      maxEntries: null,
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    };
  }
  return networkOnly("page (not stored)");
}

/**
 * Decides how the worker handles a request. `origin` is the worker's own origin (`self.location.origin`).
 * @param {RequestLike} request
 * @param {string} origin
 * @returns {RouteDecision}
 */
export function classifyRequest(request, origin) {
  if (request.method.toUpperCase() !== "GET") return passthrough("non-GET (form posts, Server Actions)");

  /** @type {URL} */
  let url;
  try {
    url = new URL(request.url);
  } catch {
    return passthrough("unparseable URL");
  }
  if (url.origin !== origin) return passthrough("cross-origin");

  const headers = request.headers;
  if (headers?.get("next-action")) return passthrough("Server Action");

  // Every GET navigation is answered by the worker (so navigation preload is always consumed and an offline
  // fallback can be shown); only lessons and the offline page are ever stored.
  if (request.mode === "navigate") return classifyNavigation(url);

  const path = url.pathname;
  if (matchesPathPrefix(path, "/api")) return passthrough("API (personalised JSON)");
  if (isRscRequest(url, headers)) return passthrough("RSC payload (personalised)");
  if (headers?.get("range")) return passthrough("range request");

  if (path.startsWith("/_next/static/")) {
    if (FONT_FILE.test(path)) return cachedAsset(STRATEGIES.cacheFirst, CACHE_NAMES.fonts, url, "hashed font");
    return cachedAsset(STRATEGIES.cacheFirst, CACHE_NAMES.static, url, "hashed static asset");
  }
  if (KATEX_FONT_FILE.test(path)) return cachedAsset(STRATEGIES.cacheFirst, CACHE_NAMES.fonts, url, "KaTeX font");
  if (path.startsWith("/icons/")) return cachedAsset(STRATEGIES.cacheFirst, CACHE_NAMES.static, url, "icon");
  if (SHELL_FILE_PATHS.has(path)) {
    return cachedAsset(STRATEGIES.staleWhileRevalidate, CACHE_NAMES.shell, url, "manifest / app icon");
  }
  return passthrough("not cacheable by policy");
}

/**
 * The sign-out endpoint: when the worker sees it, it deletes personal caches. (The `logoutAction` Server Action cannot
 * be recognised from the worker; the page calls `clearOfflineData()` for that path.)
 * @param {RequestLike} request
 * @param {string} origin
 */
export function isLogoutRequest(request, origin) {
  if (request.method.toUpperCase() !== "POST") return false;
  try {
    const url = new URL(request.url);
    return url.origin === origin && url.pathname === LOGOUT_PATH;
  } catch {
    return false;
  }
}

/**
 * A request that may start a session for someone (a sign-in, sign-up, code verification or password-reset submission,
 * or an OAuth sign-in): personal caches are deleted when the worker sees one, before the new session exists, so the
 * next user of a shared phone never gets the previous user's saved pages (PRIV-01). Not answered by the worker.
 * @param {RequestLike} request
 * @param {string} origin
 */
export function isSessionStartRequest(request, origin) {
  /** @type {URL} */
  let url;
  try {
    url = new URL(request.url);
  } catch {
    return false;
  }
  if (url.origin !== origin) return false;
  if (matchesPathPrefix(url.pathname, OAUTH_PREFIX)) return true;
  if (request.method.toUpperCase() === "GET" || request.method.toUpperCase() === "HEAD") return false;
  return SESSION_START_PAGES.some((prefix) => matchesPathPrefix(url.pathname, prefix));
}

/**
 * A navigation response that was redirected to the sign-in page: the session that saved pages belonged to has ended
 * (expired, revoked, signed out elsewhere), so the worker deletes them.
 * @param {{ redirected: boolean; url: string } | null | undefined} response
 */
export function landedOnSignIn(response) {
  if (!response || !response.redirected || !response.url) return false;
  try {
    return matchesPathPrefix(new URL(response.url).pathname, SIGN_IN_PATH);
  } catch {
    return false;
  }
}

/** @param {unknown} value @returns {value is string} */
export function isViewerTag(value) {
  return typeof value === "string" && VIEWER_TAG.test(value);
}

/**
 * The viewer tag of the `<meta name="dz-viewer">` in a page, or null (signed-out page, malformed tag).
 * @param {string} html
 */
export function extractViewer(html) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\bname\s*=\s*["']dz-viewer["']/i.test(tag)) continue;
    const content = /\bcontent\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1] ?? null;
    return isViewerTag(content) ? content : null;
  }
  return null;
}

/**
 * The viewer tag of a `SET_VIEWER` message, or null for any other / malformed message.
 * @param {unknown} data
 */
export function readViewerMessage(data) {
  if (readMessageType(data) !== MESSAGE_TYPES.setViewer) return null;
  const viewer = /** @type {{ viewer?: unknown }} */ (data).viewer;
  return isViewerTag(viewer) ? viewer : null;
}

/**
 * Whether a saved personal page may be shown: it was saved for the active viewer. A copy without a tag (saved before
 * tags existed) or with no active viewer known is never shown.
 * @param {string | null | undefined} savedViewer
 * @param {string | null | undefined} activeViewer
 */
export function savedCopyAllowed(savedViewer, activeViewer) {
  return isViewerTag(savedViewer) && savedViewer === activeViewer;
}

/**
 * Whether a response may be written to a cache.
 * - 200 only, same-origin (`basic`; `default` is a response constructed in the worker), not redirected (a lesson that
 *   redirected to /login must not be stored as the lesson), no Set-Cookie (defence in depth: browsers hide it from
 *   scripts anyway), no `Vary: *` (Cache API rejects it), no `X-Offline-Cache: none` opt-out.
 * - HTML (`html: true`) must be `text/html`. Next.js marks every dynamic page `Cache-Control: no-store`, so for HTML
 *   that directive is NOT honoured (lessons would never be saved); the explicit opt-out header is the switch instead.
 *   For assets, `no-store` is honoured.
 * @param {{ status: number; type: string; redirected: boolean; headers: HeadersLike } | null | undefined} response
 * @param {{ html?: boolean }} [options]
 */
export function isCacheableResponse(response, { html = false } = {}) {
  if (!response || response.status !== 200) return false;
  if (response.type !== "basic" && response.type !== "default") return false;
  if (response.redirected) return false;
  const headers = response.headers;
  if (headers.get("set-cookie") !== null) return false;
  if ((headers.get(OPT_OUT_HEADER) ?? "").toLowerCase().includes("none")) return false;
  if ((headers.get("vary") ?? "").includes("*")) return false;
  if (html) return (headers.get("content-type") ?? "").toLowerCase().startsWith("text/html");
  return !/(?:^|,)\s*no-store\s*(?:,|$)/i.test(headers.get("cache-control") ?? "");
}

/**
 * Keys to delete so at most `maxEntries` remain. Cache Storage keeps insertion order and `put` re-appends a key, so
 * the first keys are the least recently stored (or touched).
 * @template T
 * @param {readonly T[]} keys
 * @param {number | null} maxEntries
 * @returns {T[]}
 */
export function selectEvictions(keys, maxEntries) {
  if (maxEntries === null || maxEntries < 0 || keys.length <= maxEntries) return [];
  return keys.slice(0, keys.length - maxEntries);
}

/**
 * Caches to delete on activate: ours (`dz-` prefix) from older versions. Other origins' or libraries' caches are
 * never touched.
 * @param {readonly string[]} cacheNames
 */
export function cachesToDelete(cacheNames) {
  /** @type {readonly string[]} */
  const current = Object.values(CACHE_NAMES);
  return cacheNames.filter((name) => name.startsWith(CACHE_PREFIX) && !current.includes(name));
}

/** @param {string} cacheName */
export function isPersonalCacheName(cacheName) {
  return PERSONAL_CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix));
}

/**
 * Data Saver (`Save-Data`) is on. Read from `navigator.connection` (Chromium; absent elsewhere → false).
 * @param {{ connection?: { saveData?: boolean } } | undefined} nav
 */
export function isSaveDataEnabled(nav) {
  return nav?.connection?.saveData === true;
}

/**
 * Shell extras to precache. None with Data Saver on: the offline page itself is the only required download.
 * @param {{ saveData: boolean }} options
 * @returns {readonly string[]}
 */
export function precacheExtras({ saveData }) {
  return saveData ? [] : PRECACHE_EXTRAS;
}

/**
 * Hashed `/_next/static` URLs (scripts, stylesheets, fonts) referenced by an HTML document, including the chunk lists
 * inside the inline RSC payload, as absolute URLs. Used at install to make the offline page render and hydrate
 * without a network. Deduplicated and capped at {@link MAX_PRECACHE_ASSETS}.
 * @param {string} html
 * @param {string} origin
 * @returns {string[]}
 */
export function extractStaticAssetUrls(html, origin) {
  /** @type {Set<string>} */
  const urls = new Set();
  for (const match of html.matchAll(STATIC_ASSET_REFERENCE)) {
    urls.add(`${origin}${match[0]}`);
    if (urls.size >= MAX_PRECACHE_ASSETS) break;
  }
  return [...urls];
}

const NAMED_ENTITIES = /** @type {Record<string, string>} */ ({
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
});

/**
 * Decodes the HTML entities React and Next emit in a `<title>` (named basics plus numeric references).
 * @param {string} text
 */
export function decodeHtmlEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, body) => {
    /** @type {string} */
    const name = body.toLowerCase();
    if (name.startsWith("#x")) return safeFromCodePoint(Number.parseInt(name.slice(2), 16), entity);
    if (name.startsWith("#")) return safeFromCodePoint(Number.parseInt(name.slice(1), 10), entity);
    return NAMED_ENTITIES[name] ?? entity;
  });
}

/** @param {number} codePoint @param {string} fallback */
function safeFromCodePoint(codePoint, fallback) {
  if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return fallback;
  return String.fromCodePoint(codePoint);
}

/**
 * The document `<title>` text (decoded, whitespace collapsed, at most 200 characters), or null.
 * @param {string} html
 */
export function extractTitle(html) {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (!match || match[1] === undefined) return null;
  const title = decodeHtmlEntities(match[1]).replace(/\s+/g, " ").trim();
  return title === "" ? null : title.slice(0, 200);
}

/**
 * Headers for a stored copy of a page: transport headers that no longer describe the stored body are dropped,
 * Set-Cookie is never kept, and the saved-lesson metadata (time, title, viewer tag) is added. Metadata headers sent by
 * the server are never kept, so only the worker decides whose page it is.
 * @param {Iterable<[string, string]>} original
 * @param {{ cachedAt: string; title: string | null; viewer?: string | null }} meta
 * @returns {[string, string][]}
 */
export function storedHeaders(original, meta) {
  const dropped = new Set(["set-cookie", "content-encoding", "content-length", "transfer-encoding", "connection"]);
  /** @type {string[]} */
  const metaNames = Object.values(META_HEADERS);
  /** @type {[string, string][]} */
  const result = [];
  for (const [name, value] of original) {
    const lower = name.toLowerCase();
    if (dropped.has(lower) || metaNames.includes(lower)) continue;
    result.push([lower, value]);
  }
  result.push([META_HEADERS.cachedAt, meta.cachedAt]);
  if (meta.title !== null) result.push([META_HEADERS.title, encodeURIComponent(meta.title)]);
  if (isViewerTag(meta.viewer)) result.push([META_HEADERS.viewer, meta.viewer]);
  return result;
}

/**
 * The `type` of a page → worker message, or null for anything malformed.
 * @param {unknown} data
 * @returns {string | null}
 */
export function readMessageType(data) {
  if (typeof data !== "object" || data === null) return null;
  const type = /** @type {{ type?: unknown }} */ (data).type;
  return typeof type === "string" ? type : null;
}
