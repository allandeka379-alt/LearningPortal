/**
 * TypeScript view of `public/sw-routing.mjs` (served raw from /public, so it is plain JavaScript outside the TS
 * program). Tests load the module dynamically and cast it to {@link SwRoutingModule}; keep this in step with the
 * JSDoc typedefs in that file.
 */

export interface HeadersLike {
  get(name: string): string | null;
}

export interface RequestLike {
  url: string;
  method: string;
  mode?: string;
  headers?: HeadersLike;
}

export type Strategy = "passthrough" | "network-only" | "network-first" | "cache-first" | "stale-while-revalidate";

export type RouteDecision =
  | { strategy: "passthrough"; reason: string }
  | { strategy: "network-only"; reason: string; offlineFallback: true }
  | {
      strategy: "network-first";
      reason: string;
      offlineFallback: true;
      cacheName: string;
      cacheKey: string;
      maxEntries: number | null;
      timeoutMs: number;
    }
  | {
      strategy: "cache-first" | "stale-while-revalidate";
      reason: string;
      cacheName: string;
      cacheKey: string;
      maxEntries: number | null;
    };

export interface ResponseLike {
  status: number;
  type: string;
  redirected: boolean;
  headers: HeadersLike;
}

export interface SwRoutingModule {
  CACHE_PREFIX: string;
  CACHE_VERSION: string;
  CACHE_NAMES: Readonly<{ shell: string; static: string; fonts: string; lessons: string }>;
  CACHE_MAX_ENTRIES: Readonly<Record<string, number | null>>;
  PERSONAL_CACHE_PREFIXES: readonly string[];
  OFFLINE_URL: string;
  NAVIGATION_TIMEOUT_MS: number;
  MAX_PRECACHE_ASSETS: number;
  PRECACHE_EXTRAS: readonly string[];
  META_HEADERS: Readonly<{ cachedAt: string; title: string; viewer: string }>;
  VIEWER_META_NAME: string;
  VIEWER_STATE_PATH: string;
  OPT_OUT_HEADER: string;
  MESSAGE_TYPES: Readonly<{ skipWaiting: string; clearPersonalCaches: string; setViewer: string }>;
  STRATEGIES: Readonly<Record<string, Strategy>>;
  NEVER_CACHE_NAVIGATION_PREFIXES: readonly string[];
  matchesPathPrefix(pathname: string, prefix: string): boolean;
  isLessonPath(pathname: string): boolean;
  isNeverCacheNavigation(pathname: string): boolean;
  lessonCacheKey(url: URL): string;
  isRscRequest(url: URL, headers: HeadersLike | undefined): boolean;
  classifyRequest(request: RequestLike, origin: string): RouteDecision;
  isLogoutRequest(request: RequestLike, origin: string): boolean;
  isSessionStartRequest(request: RequestLike, origin: string): boolean;
  landedOnSignIn(response: { redirected: boolean; url: string } | null | undefined): boolean;
  isViewerTag(value: unknown): value is string;
  extractViewer(html: string): string | null;
  readViewerMessage(data: unknown): string | null;
  savedCopyAllowed(savedViewer: string | null | undefined, activeViewer: string | null | undefined): boolean;
  isCacheableResponse(response: ResponseLike | null | undefined, options?: { html?: boolean }): boolean;
  selectEvictions<T>(keys: readonly T[], maxEntries: number | null): T[];
  cachesToDelete(cacheNames: readonly string[]): string[];
  isPersonalCacheName(cacheName: string): boolean;
  isSaveDataEnabled(nav: { connection?: { saveData?: boolean } } | undefined): boolean;
  precacheExtras(options: { saveData: boolean }): readonly string[];
  extractStaticAssetUrls(html: string, origin: string): string[];
  decodeHtmlEntities(text: string): string;
  extractTitle(html: string): string | null;
  storedHeaders(original: Iterable<[string, string]>, meta: { cachedAt: string; title: string | null; viewer?: string | null }): [string, string][];
  readMessageType(data: unknown): string | null;
}
