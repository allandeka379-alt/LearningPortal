import { CACHE_NAMES, META_HEADERS, PERSONAL_CACHE_PREFIXES, SW_MESSAGES } from "./constants";

/**
 * Lessons saved on this device by the service worker, read straight from Cache Storage on the client (the offline
 * page lists them; nothing is fabricated or fetched). Each saved response carries `x-dz-title` and `x-dz-cached-at`
 * headers written by `public/sw.js`, so listing never reads the HTML bodies.
 */

export interface SavedLesson {
  /** Same-origin path to open, e.g. `/app/lessons/abc`. */
  path: string;
  /** Page title without the ` · <app name>` suffix, or null when the page had none. */
  title: string | null;
  /** When the copy was saved, or null when unknown. */
  savedAt: Date | null;
}

/** Minimal Cache Storage surface used here (the real `CacheStorage` satisfies it; tests pass fakes). */
export interface CacheStorageLike {
  keys(): Promise<string[]>;
  open(cacheName: string): Promise<{
    keys(): Promise<readonly { url: string }[]>;
    match(
      request: string,
      options?: { ignoreVary?: boolean },
    ): Promise<{ headers: { get(name: string): string | null } } | undefined>;
  }>;
  delete(cacheName: string): Promise<boolean>;
}

const LESSON_PATH = /^\/app\/lessons\/[^/]+$/;

/** Cache Storage when this context has it (absent on insecure http origins and very old browsers). */
export function getCacheStorage(): CacheStorageLike | null {
  return typeof globalThis.caches === "undefined" ? null : globalThis.caches;
}

/** True for a personal cache (saved lessons) of any version. */
export function isPersonalCacheName(cacheName: string): boolean {
  return PERSONAL_CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix));
}

/**
 * Removes the ` · <app name>` suffix the root layout's title template adds (and the same with other common
 * separators), so lists show "Quadratic equations", not "Quadratic equations · BvunzoHub".
 */
export function cleanLessonTitle(title: string | null, appName: string): string | null {
  if (title === null) return null;
  let cleaned = title.trim();
  for (const separator of [" · ", " | ", " - ", " — "]) {
    const suffix = `${separator}${appName}`;
    if (cleaned.endsWith(suffix)) {
      cleaned = cleaned.slice(0, -suffix.length).trim();
      break;
    }
  }
  return cleaned === "" || cleaned === appName ? null : cleaned;
}

function decodeTitleHeader(value: string | null): string | null {
  if (value === null || value === "") return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

function parseDate(value: string | null): Date | null {
  if (value === null) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Builds a list entry from a cached request URL and its response headers. Returns null for anything that is not a
 * same-origin lesson page, so a tampered or foreign cache entry can never become a link.
 */
export function toSavedLesson(
  requestUrl: string,
  headers: { get(name: string): string | null } | null,
  origin: string,
  appName: string,
): SavedLesson | null {
  let url: URL;
  try {
    url = new URL(requestUrl);
  } catch {
    return null;
  }
  if (url.origin !== origin || !LESSON_PATH.test(url.pathname)) return null;
  return {
    path: url.pathname,
    title: cleanLessonTitle(decodeTitleHeader(headers?.get(META_HEADERS.title) ?? null), appName),
    savedAt: parseDate(headers?.get(META_HEADERS.cachedAt) ?? null),
  };
}

/** Most recently saved first; entries without a date last (stable otherwise). */
export function sortSavedLessons(lessons: readonly SavedLesson[]): SavedLesson[] {
  return [...lessons].sort((a, b) => (b.savedAt?.getTime() ?? -Infinity) - (a.savedAt?.getTime() ?? -Infinity));
}

/**
 * Lists the lessons saved in the current lesson cache. Does not create the cache when it does not exist yet
 * (`caches.open` would).
 */
export async function listSavedLessons(storage: CacheStorageLike, origin: string, appName: string): Promise<SavedLesson[]> {
  const names = await storage.keys();
  if (!names.includes(CACHE_NAMES.lessons)) return [];
  const cache = await storage.open(CACHE_NAMES.lessons);
  const requests = await cache.keys();
  const entries = await Promise.all(
    requests.map(async (request) => {
      const response = await cache.match(request.url, { ignoreVary: true });
      return toSavedLesson(request.url, response?.headers ?? null, origin, appName);
    }),
  );
  return sortSavedLessons(entries.filter((entry): entry is SavedLesson => entry !== null));
}

interface ServiceWorkerContainerLike {
  controller: { postMessage(message: unknown): void } | null;
}

/**
 * The page's service worker container, when this context has one. A function rather than an inline parameter default:
 * Turbopack's parser rejects the `in` operator inside a parameter initializer ("Expected ',', got 'in'").
 */
function getServiceWorkerContainer(): ServiceWorkerContainerLike | null {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return null;
  return navigator.serviceWorker;
}

/**
 * Deletes this user's saved pages from the device: call on sign-out (shared phones, ARCHITECTURE §3.13) and from
 * "Remove saved lessons". Deletes the caches directly and also tells the active worker, so a lesson being saved at
 * that moment is not left behind. Never throws.
 */
export async function clearOfflineData(
  storage: CacheStorageLike | null = getCacheStorage(),
  container: ServiceWorkerContainerLike | null = getServiceWorkerContainer(),
): Promise<void> {
  try {
    container?.controller?.postMessage({ type: SW_MESSAGES.clearPersonalCaches });
  } catch {
    // The worker may be gone; the direct deletion below still runs.
  }
  if (storage === null) return;
  try {
    const names = await storage.keys();
    await Promise.all(names.filter(isPersonalCacheName).map((name) => storage.delete(name)));
  } catch {
    // Storage can be unavailable (private mode, quota errors); nothing else to do.
  }
}

interface ViewerContainerLike extends ServiceWorkerContainerLike {
  ready?: Promise<{ active: { postMessage(message: unknown): void } | null }>;
}

function getViewerContainer(): ViewerContainerLike | null {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return null;
  return navigator.serviceWorker;
}

/**
 * Tells the worker which student is signed in (the opaque viewer tag the student area renders): it shows saved lessons
 * only to the student who saved them, and deletes them when another student signs in on the same phone (PRIV-01).
 * Before this page is controlled (first visit), the message goes to the active worker once it is ready. Never throws.
 */
export function reportOfflineViewer(viewer: string, container: ViewerContainerLike | null = getViewerContainer()): void {
  const message = { type: SW_MESSAGES.setViewer, viewer };
  try {
    if (container?.controller) {
      container.controller.postMessage(message);
      return;
    }
    container?.ready?.then((registration) => registration.active?.postMessage(message)).catch(() => undefined);
  } catch {
    // The worker may be gone or unsupported; saved lessons then simply are not shown on a slow network.
  }
}

/** "5 Oct 2026, 14:05" in the device's time zone. */
export function formatSavedAt(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
}
