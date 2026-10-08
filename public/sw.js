// @ts-check
/**
 * Service worker: offline shell, saved lessons and immutable-asset caching (PRODUCT_SPEC §29, ARCHITECTURE §3.13).
 * Behaviour, limits and how to test it: docs/OFFLINE.md.
 *
 * A MODULE worker: registered by src/components/pwa/ServiceWorkerRegistrar.tsx with `{ type: "module" }`. Every
 * routing decision lives in ./sw-routing.mjs (pure, unit-tested); this file only performs the I/O.
 *
 * Lifecycle:
 * - install: precache the offline page plus the hashed assets it references (normally served from the HTTP cache, so
 *   no extra data), then the shell extras unless Data Saver is on. A new version then WAITS: it never takes over a
 *   page on its own (a student may be mid-exam); the page shows "A new version is available" and posts SKIP_WAITING
 *   when the user chooses Refresh.
 * - activate: delete our caches from older versions, enable navigation preload, claim open pages.
 * - fetch: see classifyRequest() in ./sw-routing.mjs.
 *
 * Saved lessons are personal (PRIV-01): each is stored with the viewer tag of the user it was rendered for and only
 * shown to that ACTIVE viewer; switching viewer, a sign-in / sign-up / OAuth request, logout, and a navigation that
 * lands on /login (the session ended) delete them all.
 */
import {
  CACHE_MAX_ENTRIES,
  CACHE_NAMES,
  MESSAGE_TYPES,
  OFFLINE_URL,
  STRATEGIES,
  cachesToDelete,
  classifyRequest,
  extractStaticAssetUrls,
  extractTitle,
  isCacheableResponse,
  extractViewer,
  isLogoutRequest,
  isPersonalCacheName,
  isSaveDataEnabled,
  isSessionStartRequest,
  isViewerTag,
  landedOnSignIn,
  META_HEADERS,
  precacheExtras,
  readMessageType,
  readViewerMessage,
  savedCopyAllowed,
  selectEvictions,
  storedHeaders,
  VIEWER_STATE_PATH,
} from "./sw-routing.mjs";

/**
 * @typedef {import("./sw-routing.mjs").RouteDecision} RouteDecision
 * @typedef {import("./sw-routing.mjs").NetworkFirstDecision} NetworkFirstDecision
 * @typedef {import("./sw-routing.mjs").CachedAssetDecision} CachedAssetDecision
 * @typedef {{ request: Request; preloadResponse?: Promise<Response | undefined>; respondWith(r: Promise<Response>): void;
 *   waitUntil(p: Promise<unknown>): void }} FetchEventLike
 */

/** @type {any} ServiceWorkerGlobalScope (typed loosely: this file is not part of the TypeScript program). */
const sw = self;
const origin = /** @type {string} */ (sw.location.origin);
const offlineKey = `${origin}${OFFLINE_URL}`;
const viewerStateKey = `${origin}${VIEWER_STATE_PATH}`;

/** Static/font caches are trimmed every Nth write (and on activate) rather than on every asset. */
const TRIM_EVERY_N_WRITES = 20;
/** @type {Map<string, number>} */
const writesSinceTrim = new Map();

const MINIMAL_OFFLINE_HTML =
  '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  "<title>Offline</title><main style=\"font-family:system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;line-height:1.5\">" +
  "<h1>You are offline</h1><p>Check your connection and try again.</p></main></html>";

// ---------------------------------------------------------------------------------------------------------------------
// Lifecycle

sw.addEventListener("install", (/** @type {any} */ event) => {
  event.waitUntil(precache());
});

sw.addEventListener("activate", (/** @type {any} */ event) => {
  event.waitUntil(activate());
});

sw.addEventListener("message", (/** @type {any} */ event) => {
  const type = readMessageType(event.data);
  if (type === MESSAGE_TYPES.skipWaiting) {
    event.waitUntil(sw.skipWaiting());
  } else if (type === MESSAGE_TYPES.clearPersonalCaches) {
    event.waitUntil(clearPersonalData());
  } else if (type === MESSAGE_TYPES.setViewer) {
    const viewer = readViewerMessage(event.data);
    if (viewer !== null) event.waitUntil(adoptViewer(viewer));
  }
});

/** Required: install fails (and is retried on a later visit) when the offline page cannot be fetched. */
async function precache() {
  const response = await sw.fetch(offlineKey, { cache: "reload", credentials: "same-origin" });
  if (!isCacheableResponse(response, { html: true })) {
    throw new Error(`Precaching ${OFFLINE_URL} failed with status ${response.status}`);
  }
  const html = await response.clone().text();
  const shell = await sw.caches.open(CACHE_NAMES.shell);
  await shell.put(offlineKey, response);

  // The offline page's own CSS/JS/fonts. Content-hashed and immutable, so a default-mode fetch is normally answered
  // by the HTTP cache (the page that registered the worker already downloaded them). Failures are tolerated.
  await Promise.all(extractStaticAssetUrls(html, origin).map((url) => cacheUrl(url)));

  const extras = precacheExtras({ saveData: isSaveDataEnabled(sw.navigator) });
  await Promise.all(extras.map((path) => cacheUrl(`${origin}${path}`)));
}

async function activate() {
  const names = /** @type {string[]} */ (await sw.caches.keys());
  await Promise.all(cachesToDelete(names).map((name) => sw.caches.delete(name)));
  await Promise.all([CACHE_NAMES.static, CACHE_NAMES.fonts].map((name) => trimCache(name)));
  if (sw.registration?.navigationPreload) {
    await sw.registration.navigationPreload.enable().catch(() => undefined);
  }
  await sw.clients.claim();
}

/** Deletes every personal cache (saved lessons), any version. */
async function clearPersonalCaches() {
  const names = /** @type {string[]} */ (await sw.caches.keys());
  await Promise.all(names.filter(isPersonalCacheName).map((name) => sw.caches.delete(name)));
}

// ---------------------------------------------------------------------------------------------------------------------
// Active viewer (whose saved lessons may be shown). Stored in the shell cache, not in memory: the browser stops idle
// workers (the next fetch starts a fresh one), and storage is the one copy every worker instance agrees on.

/** @returns {Promise<string | null>} */
async function getActiveViewer() {
  const stored = await matchEntry(CACHE_NAMES.shell, viewerStateKey);
  const text = stored ? (await stored.text()).trim() : null;
  return isViewerTag(text) ? text : null;
}

/** @param {string | null} viewer */
async function persistViewer(viewer) {
  if (viewer === null) {
    await deleteEntry(CACHE_NAMES.shell, viewerStateKey);
    return;
  }
  const shell = await sw.caches.open(CACHE_NAMES.shell);
  await shell.put(viewerStateKey, new Response(viewer, { headers: { "content-type": "text/plain" } }));
}

/**
 * Makes `viewer` the active viewer. A different user than before (account switch on a shared phone) first deletes
 * every saved page, so nothing of the previous user can be shown or listed.
 * @param {string} viewer
 */
async function adoptViewer(viewer) {
  if ((await getActiveViewer()) === viewer) return;
  await clearPersonalCaches();
  await persistViewer(viewer);
}

/** Logout, sign-in, session ended, "Remove saved lessons": delete saved pages and forget the viewer. */
async function clearPersonalData() {
  await clearPersonalCaches();
  await persistViewer(null);
}

// ---------------------------------------------------------------------------------------------------------------------
// Fetch routing

sw.addEventListener("fetch", (/** @type {FetchEventLike} */ event) => {
  const { request } = event;

  if (isLogoutRequest(request, origin)) {
    // Not answered (the browser sends it as normal); saved lessons are deleted alongside.
    event.waitUntil(clearPersonalData());
    return;
  }
  if (isSessionStartRequest(request, origin)) {
    // Someone is signing in (or up) on this device: the previous user's saved pages go before the new session exists.
    // The request itself is routed as usual (form posts pass through; OAuth navigations are network-only).
    event.waitUntil(clearPersonalData());
  }

  const decision = classifyRequest(request, origin);
  switch (decision.strategy) {
    case STRATEGIES.networkOnly:
      event.respondWith(networkOnly(event));
      return;
    case STRATEGIES.networkFirst:
      event.respondWith(networkFirst(event, /** @type {NetworkFirstDecision} */ (decision)));
      return;
    case STRATEGIES.cacheFirst:
      event.respondWith(cacheFirst(event, /** @type {CachedAssetDecision} */ (decision)));
      return;
    case STRATEGIES.staleWhileRevalidate:
      event.respondWith(staleWhileRevalidate(event, /** @type {CachedAssetDecision} */ (decision)));
      return;
    default:
      // passthrough: not answered, never cached.
      return;
  }
});

/**
 * The network response for a navigation, using the navigation preload response when the browser started one.
 * @param {FetchEventLike} event
 * @returns {Promise<Response>}
 */
async function fromNetwork(event) {
  const preloaded = await event.preloadResponse;
  if (preloaded) return preloaded;
  return sw.fetch(event.request);
}

/** @param {FetchEventLike} event */
async function networkOnly(event) {
  try {
    const response = await fromNetwork(event);
    // Redirected to sign in: the session that saved pages belonged to has ended.
    if (landedOnSignIn(response)) event.waitUntil(clearPersonalData());
    return response;
  } catch {
    return offlineFallback();
  }
}

/**
 * Network first; a saved copy is used when the network fails, returns a 5xx, or takes longer than the timeout. The
 * network response is stored even when it arrives after the saved copy was shown.
 * @param {FetchEventLike} event
 * @param {NetworkFirstDecision} decision
 */
async function networkFirst(event, decision) {
  const personal = isPersonalCacheName(decision.cacheName);
  const network = fromNetwork(event);
  // Registered before the response is handed to the page, so the clone is taken before the body is read.
  event.waitUntil(
    network
      .then((response) => {
        if (personal && landedOnSignIn(response)) return clearPersonalData();
        if (isCacheableResponse(response, { html: true })) return storePage(decision, response.clone());
        if (response.status === 404 || response.status === 410) return deleteEntry(decision.cacheName, decision.cacheKey);
        return undefined;
      })
      .catch(() => undefined),
  );

  let saved = await matchEntry(decision.cacheName, decision.cacheKey);
  // A saved lesson is shown only to the user it was saved for (shared phones).
  if (saved && personal && !savedCopyAllowed(saved.headers.get(META_HEADERS.viewer), await getActiveViewer())) saved = undefined;
  if (!saved) {
    try {
      return await network;
    } catch {
      return offlineFallback();
    }
  }

  const outcome = await settleWithin(network, decision.timeoutMs);
  if (outcome.kind === "response" && outcome.response.status < 500) return outcome.response;
  // Offline, too slow, or a server error: show the saved copy and mark it recently used.
  event.waitUntil(touchEntry(decision.cacheName, decision.cacheKey, saved.clone()));
  return saved;
}

/**
 * @param {FetchEventLike} event
 * @param {CachedAssetDecision} decision
 */
async function cacheFirst(event, decision) {
  const cached = await matchEntry(decision.cacheName, decision.cacheKey);
  if (cached) return cached;
  const response = await sw.fetch(event.request);
  if (isCacheableResponse(response)) {
    event.waitUntil(storeAsset(decision.cacheName, decision.cacheKey, response.clone()));
  }
  return response;
}

/**
 * @param {FetchEventLike} event
 * @param {CachedAssetDecision} decision
 */
async function staleWhileRevalidate(event, decision) {
  const cached = await matchEntry(decision.cacheName, decision.cacheKey);
  const refresh = sw
    .fetch(event.request)
    .then(async (/** @type {Response} */ response) => {
      if (isCacheableResponse(response)) await storeAsset(decision.cacheName, decision.cacheKey, response.clone());
      return response;
    })
    .catch(() => undefined);
  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }
  return (await refresh) ?? Response.error();
}

/** The precached offline page, or a minimal built-in one if it is missing. */
async function offlineFallback() {
  const cached = await matchEntry(CACHE_NAMES.shell, offlineKey);
  if (cached) return cached;
  return new Response(MINIMAL_OFFLINE_HTML, {
    status: 503,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Cache helpers

/**
 * @param {string} cacheName
 * @param {string} key
 * @returns {Promise<Response | undefined>}
 */
async function matchEntry(cacheName, key) {
  // `has` first: `open` would create an empty cache as a side effect.
  if (!(await sw.caches.has(cacheName))) return undefined;
  const cache = await sw.caches.open(cacheName);
  return cache.match(key, { ignoreVary: true });
}

/** @param {string} cacheName @param {string} key */
async function deleteEntry(cacheName, key) {
  if (!(await sw.caches.has(cacheName))) return;
  const cache = await sw.caches.open(cacheName);
  await cache.delete(key, { ignoreVary: true });
}

/**
 * Re-stores a served copy so it moves to the most-recently-used end (put re-appends the key).
 * @param {string} cacheName
 * @param {string} key
 * @param {Response} copy
 */
async function touchEntry(cacheName, key, copy) {
  const cache = await sw.caches.open(cacheName);
  await cache.put(key, copy);
}

/**
 * Stores an HTML page with its title and save time (read by the offline page's saved-lesson list), then trims.
 * @param {NetworkFirstDecision} decision
 * @param {Response} response
 */
async function storePage(decision, response) {
  const html = await response.text();
  /** @type {string | null} */
  let viewer = null;
  if (isPersonalCacheName(decision.cacheName)) {
    // Personal pages are stored only with the viewer they were rendered for; the fresh page is authoritative about
    // who is signed in now, so a different viewer than the active one switches (and clears) first.
    viewer = extractViewer(html);
    if (viewer === null) return;
    await adoptViewer(viewer);
  }
  const headers = storedHeaders(response.headers, { cachedAt: new Date().toISOString(), title: extractTitle(html), viewer });
  const cache = await sw.caches.open(decision.cacheName);
  await cache.put(decision.cacheKey, new Response(html, { status: 200, statusText: response.statusText, headers }));
  await trimCache(decision.cacheName);
}

/**
 * @param {string} cacheName
 * @param {string} key
 * @param {Response} response
 */
async function storeAsset(cacheName, key, response) {
  const cache = await sw.caches.open(cacheName);
  await cache.put(key, response);
  const writes = (writesSinceTrim.get(cacheName) ?? 0) + 1;
  if (writes >= TRIM_EVERY_N_WRITES) {
    writesSinceTrim.set(cacheName, 0);
    await trimCache(cacheName);
  } else {
    writesSinceTrim.set(cacheName, writes);
  }
}

/** Evicts the oldest entries beyond the cache's limit. @param {string} cacheName */
async function trimCache(cacheName) {
  const maxEntries = CACHE_MAX_ENTRIES[cacheName] ?? null;
  if (maxEntries === null || !(await sw.caches.has(cacheName))) return;
  const cache = await sw.caches.open(cacheName);
  const keys = await cache.keys();
  await Promise.all(selectEvictions(keys, maxEntries).map((key) => cache.delete(key)));
}

/**
 * Fetches a URL and stores it in the cache its route names (assets only). Errors are swallowed: used for
 * best-effort precaching.
 * @param {string} url
 */
async function cacheUrl(url) {
  try {
    const decision = classifyRequest({ url, method: "GET", mode: "no-cors" }, origin);
    if (decision.strategy !== STRATEGIES.cacheFirst && decision.strategy !== STRATEGIES.staleWhileRevalidate) return;
    const asset = /** @type {CachedAssetDecision} */ (decision);
    if (await matchEntry(asset.cacheName, asset.cacheKey)) return;
    const response = await sw.fetch(url, { credentials: "same-origin" });
    if (isCacheableResponse(response)) await storeAsset(asset.cacheName, asset.cacheKey, response);
  } catch {
    // Best effort: the asset is cached on first real use instead.
  }
}

/**
 * Resolves with the network outcome, or `timeout` after `ms`. Never rejects.
 * @param {Promise<Response>} promise
 * @param {number} ms
 * @returns {Promise<{ kind: "response"; response: Response } | { kind: "error" } | { kind: "timeout" }>}
 */
function settleWithin(promise, ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve({ kind: "timeout" }), ms);
    promise.then(
      (response) => {
        clearTimeout(timer);
        resolve({ kind: "response", response });
      },
      () => {
        clearTimeout(timer);
        resolve({ kind: "error" });
      },
    );
  });
}
