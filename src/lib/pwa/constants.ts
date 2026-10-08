/**
 * Page-side constants for the service worker (docs/OFFLINE.md). These MIRROR `public/sw-routing.mjs`, which is served
 * raw from /public and cannot import from `src/`; `src/lib/pwa/sw-routing.test.ts` asserts the two copies match, so a
 * change on either side fails the tests until the other side follows.
 */

/** The worker script, registered as an ES module (`{ type: "module" }`). */
export const SW_URL = "/sw.js";

/** The worker controls the whole origin. */
export const SW_SCOPE = "/";

/** The precached page shown when a navigation fails offline. */
export const OFFLINE_URL = "/offline";

/** Every cache the worker owns starts with this prefix. */
export const CACHE_PREFIX = "dz-";

export const CACHE_NAMES = {
  shell: "dz-shell-v1",
  static: "dz-static-v1",
  fonts: "dz-fonts-v1",
  lessons: "dz-lessons-v1",
} as const;

/** Prefixes of caches holding a user's own pages (any version). Cleared on logout. */
export const PERSONAL_CACHE_PREFIXES = ["dz-lessons-"] as const;

/** How many lesson pages are kept for offline reading (least recently viewed are evicted first). */
export const MAX_SAVED_LESSONS = 30;

/** Metadata headers the worker adds to each saved lesson response. */
export const META_HEADERS = {
  cachedAt: "x-dz-cached-at",
  /** `encodeURIComponent` of the page title. */
  title: "x-dz-title",
  /** Viewer tag of the user the page was saved for (only that user is shown it). */
  viewer: "x-dz-viewer",
} as const;

/** Page → worker message types. */
export const SW_MESSAGES = {
  skipWaiting: "SKIP_WAITING",
  clearPersonalCaches: "CLEAR_PERSONAL_CACHES",
  /** `{ type, viewer }`: the signed-in student's viewer tag (a different one deletes saved lessons). */
  setViewer: "SET_VIEWER",
} as const;
