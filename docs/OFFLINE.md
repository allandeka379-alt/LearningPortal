# Offline and low-bandwidth support

Implements PRODUCT_SPEC §29 (fast loading, low bandwidth, offline caching where practical) and ARCHITECTURE §3.13.
Students on intermittent connections can keep reading lessons they have opened before. The app never pretends to be
online: anything that needs the server says so.

## Files

| File | Role |
|---|---|
| `public/sw.js` | The service worker (an ES module). Does the I/O: install, activate, fetch, messages. |
| `public/sw-routing.mjs` | Every routing decision and constant. Pure, no `self`/`caches`/`fetch`; unit-tested. |
| `src/lib/pwa/constants.ts` | Page-side copy of the cache names, header names and message types. A test asserts it matches `sw-routing.mjs`. |
| `src/lib/pwa/sw-lifecycle.ts` | Registration rules, update detection (`watchForWaitingWorker`), dev clean-up. |
| `src/lib/pwa/saved-lessons.ts` | Reads saved lessons from Cache Storage; `clearOfflineData()` for sign-out. |
| `src/components/pwa/ServiceWorkerRegistrar.tsx` | Registers the worker (production only) and shows the update prompt. |
| `src/components/pwa/ConnectivityBanner.tsx` | Polite offline / back-online banner. |
| `src/components/pwa/SavedLessonsList.tsx`, `TryAgainButton.tsx` | Client parts of the offline page. |
| `src/components/pwa/ClearOfflineDataOnSubmit.tsx` | Wrap a sign-out form to delete saved lessons when it is submitted. |
| `src/app/offline/page.tsx` | The offline page (precached; shown when a page cannot load). |

The registrar and banner are mounted once, in the root layout, inside `<ToastProvider>`.

## What works offline

| Works offline | Needs a connection |
|---|---|
| Lessons opened recently on this device (the last 30), including maths (KaTeX fonts are cached) | Practice, tests and mock exams (answer keys never ship to the device) |
| The offline page with the list of saved lessons | The AI tutor and question solver |
| Already-loaded app code, styles, fonts and icons | Search, lessons not opened before, leaderboards |
| | Signing in, payments, settings; parent, teacher, school and admin areas |

Images inside lessons are not cached yet (they go through `/_next/image` and `/api/media`), so a saved lesson shows
its text and maths offline but its figures only when online. Flashcard offline review and the answer outbox are
separate features (ARCHITECTURE §3.13, Phases 8 and 11).

## Caching strategy

Only **same-origin GET** requests are ever handled. Only **200** responses that were **not redirected**, carry **no
Set-Cookie**, no `Vary: *` and no `X-Offline-Cache: none` are ever stored.

| Request | Strategy | Cache (limit) |
|---|---|---|
| `/_next/static/**` (content-hashed JS/CSS) | Cache first | `dz-static-v1` (200) |
| Fonts under `/_next/static/**`, and `KaTeX_*.woff2/woff/ttf` anywhere | Cache first | `dz-fonts-v1` (40) |
| `/icons/**` | Cache first | `dz-static-v1` |
| `/manifest.webmanifest`, `/icon.svg`, `/apple-icon.png`, `/favicon.ico` | Stale while revalidate | `dz-shell-v1` |
| Navigation to a lesson, `/app/lessons/<id>` | Network first, 4 s timeout, saved copy, then `/offline` | `dz-lessons-v1` (30, least recently viewed evicted) |
| Navigation to `/offline` | Network first (keeps the precached copy fresh) | `dz-shell-v1` |
| Any other navigation | Network only, `/offline` when the network fails | not stored |
| Everything else | Not handled (browser default) | not stored |

Notes:

- **Hashed assets are cache-first**, not stale-while-revalidate as the first draft of ARCHITECTURE §3.13 said: their
  URLs change on every deploy, so a cached copy is never stale. Old deploys' files are evicted by the 200-entry bound.
- **The 4 s timeout only applies when a saved copy exists.** Without one, the request waits for the network as
  usual: a slow page is better than an offline page. When the timeout fires the saved copy is shown and the network
  response, if it arrives, replaces it in the background. A 5xx with a saved copy also shows the saved copy. A 404/410
  removes the saved copy (unpublished lesson).
- **Lesson cache keys drop the query string and fragment** (`/app/lessons/abc?tab=x` → `/app/lessons/abc`).
- **Next marks every dynamic page `Cache-Control: no-store`**, so for HTML that directive is not honoured (lessons
  would never be saved). Instead a page opts out with the response header `X-Offline-Cache: none`. For assets,
  `no-store` is honoured.
- **Navigation preload** is enabled, so the worker's start-up time on slow phones overlaps with the network request.

### Never cached (hard rules)

- `/api/**` — personalised JSON (and media), including `GET` navigations such as `/api/auth/google/start`.
- RSC requests (`RSC`, `Next-Router-Prefetch`, `Next-Router-State-Tree` headers or `?_rsc=`) — personalised flight
  data for soft navigations and prefetches.
- Server Actions and every other non-GET request (`POST`, `HEAD`, ...). `HEAD` matters: Next's offline detection
  probes the server with `HEAD` + `RSC` and must reach the network.
- `/app/exams/attempt/**` — live exam state.
- Auth routes (`/login`, `/register`, `/verify`, `/forgot-password`, `/reset-password`, `/logout`, `/auth`),
  `/onboarding`, `/admin/**`, `/parent/**`, `/teacher/**`, `/school/**`.
- Cross-origin requests, range requests, the image optimiser.

These are listed in `NEVER_CACHE_NAVIGATION_PREFIXES` and `classifyRequest()` in `public/sw-routing.mjs`, and each
has a unit test. Do not relax them without a security review.

## Lifecycle and updates

1. **Registration** (`ServiceWorkerRegistrar`): production builds only, `register("/sw.js", { type: "module", scope:
   "/", updateViaCache: "none" })`. In development it instead unregisters any leftover `/sw.js` worker, so
   `next dev` never serves cached chunks. Browsers without module service worker support reject the registration;
   the error is swallowed and the app works online as before.
2. **Install**: precaches `/offline` (required: if it fails, install fails and is retried on a later visit), then the
   hashed CSS/JS/fonts referenced by that page's HTML (normally answered by the HTTP cache, so no extra data), then
   the extras (icons, manifest) **unless Data Saver is on** (`navigator.connection.saveData`).
3. **Activate**: deletes `dz-*` caches from older versions (never other caches), trims bounded caches, enables
   navigation preload, claims open pages.
4. **Update**: browsers check `sw.js` and its import `sw-routing.mjs` on navigation; long-lived tabs also check when
   they become visible again (at most hourly). A new version **waits**. It never takes over by itself, because a
   student may be mid-exam. The page shows "A new version is available" with **Refresh** and **Later**. Refresh posts
   `SKIP_WAITING`; the page reloads once the new worker controls it (or after 5 s regardless). Other open tabs are
   never reloaded.

**Update prompt:** the prompt is rendered by the registrar, styled like a toast, because the Toast system has no
action slot yet. When `ToastOptions` gains `action?: { label; onClick }`, replace it with
`toast({ title: "A new version is available", description: "Refresh to start using it.", duration: null, action })`.

**Versioning:** bump `CACHE_VERSION` in `public/sw-routing.mjs` (and the names in `src/lib/pwa/constants.ts`; a test
fails until both match) only when the cache layout or the stored format changes. Ordinary deploys need no bump.

## Connectivity banner

"You are offline. Saved lessons are still available." while offline (with a link to `/offline`), then "You are back
online." for 4 s. Both are dismissible and use an always-mounted `role="status"` region that contains the message
only. Offline means the browser's `offline` state **or** Next's `useOffline()`, which also detects "Wi-Fi but no
internet" once `experimental.useOffline` is enabled in `next.config.ts` (without the flag it always returns false).

Links in offline UI are plain `<a>` elements, not `next/link`: a full navigation is answered by the service worker
from its saved copy, while a soft navigation would fetch an RSC payload from the network.

## Privacy and shared phones

- Saved lessons are the only personal data the worker stores. The offline page renders nothing personal on the server,
  so its precached copy is safe for whoever holds the phone.
- **Sign-out deletes saved lessons**: the worker does it when it sees `POST /api/auth/logout`; the `logoutAction`
  Server Action cannot be recognised by the worker, so its form must be wrapped in `<ClearOfflineDataOnSubmit>`
  (calls `clearOfflineData()`). The offline page also offers "Remove saved lessons from this device".
- **Saved lessons belong to one student.** The student area renders `<meta name="dz-viewer" content="<tag>">` (an
  HMAC of the user id, `offlineViewerTag()`, never the id) and `<OfflineViewerSync>` posts the tag to the worker
  (`SET_VIEWER`). Each saved lesson stores the tag of the student it was rendered for (`x-dz-viewer`), and a saved copy
  is only used for a slow or failed network when its tag equals the active viewer. A different tag (another student
  signed in), a sign-in / sign-up / verification / password-reset submission or Google sign-in, and a navigation that
  is redirected to `/login` (session expired or revoked elsewhere) delete every saved lesson. A redirect inside a
  navigation-preload response is opaque to the worker; the viewer check still applies there.
- A lesson saved while the student was entitled to it stays readable offline until it is evicted or removed; the
  worker cannot re-check entitlements offline. Content that must not be kept on devices should send
  `X-Offline-Cache: none`.
- Not built yet: the settings switch to turn the offline lesson cache off (ARCHITECTURE §3.13).

## Limits

| Limit | Value | Where |
|---|---|---|
| Saved lessons | 30 (least recently viewed evicted) | `CACHE_MAX_ENTRIES` |
| Static assets / fonts | 200 / 40 entries | `CACHE_MAX_ENTRIES` |
| Navigation timeout (only with a saved copy) | 4 s | `NAVIGATION_TIMEOUT_MS` |
| Assets precached from the offline page | 40 | `MAX_PRECACHE_ASSETS` |
| Update re-check for visible tabs | 1 hour | `UPDATE_CHECK_INTERVAL_MS` |

Browsers may evict Cache Storage under storage pressure; the app then behaves as if nothing was saved.

## Testing

### Automated

```
npx vitest run src/lib/pwa src/components/pwa
```

- `src/lib/pwa/sw-routing.test.ts`: every URL class → strategy, every never-cache rule, response cacheability,
  eviction, precache lists, title/metadata handling, and that the page-side constants match the worker's.
- `src/lib/pwa/sw.test.ts`: runs the real `public/sw.js` against an in-memory service worker scope (fake caches,
  fetch, clients) and drives install/activate/fetch/message events: precache and Data Saver, old-cache clean-up,
  lesson save/fallback/timeout/LRU, never-cache routes, logout clearing, SKIP_WAITING.
- `src/lib/pwa/{saved-lessons,sw-lifecycle}.test.ts`: page-side helpers.
- `src/components/pwa/*.test.tsx`: production-only registration, update prompt, connectivity banner, saved-lesson
  list. They import `@/lib/pwa/jsdom-for-tests` first instead of using the `jsdom` docblock, because the shared
  `tests/setup.ts` cannot load under Vitest's jsdom transform yet (see that file).

### Manually in Chrome DevTools

The worker only registers in a production build:

```
npm run build
npm run start            # http://localhost:3000 (localhost counts as a secure context)
```

1. Open the app, sign in, and open DevTools → **Application → Service workers**. `sw.js` should be *activated and
   running*. Leave "Update on reload" **off** (it skips the waiting step, so you would not see the update prompt).
2. **Application → Cache storage**: `dz-shell-v1` holds `/offline`; `dz-static-v1` and `dz-fonts-v1` fill as you
   browse. Open two or three lessons: they appear in `dz-lessons-v1`; select one to see the `x-dz-title` and
   `x-dz-cached-at` headers.
3. **Go offline**: Network panel → throttling dropdown → **Offline** (or tick *Offline* in Application → Service
   workers). Reload a saved lesson: it renders, maths included. Open a lesson you never opened, or
   `/app/exams/attempt/...`: the offline page appears, listing the saved lessons. The banner says "You are offline.
   Saved lessons are still available."
4. **Back online**: choose *No throttling*; the banner says "You are back online." and hides after a few seconds.
5. **Slow network**: add a custom throttling profile (e.g. 50 kbit/s, 2000 ms latency) and reload a saved lesson: the
   saved copy appears after about 4 s, and the fresh copy replaces it in Cache storage when it arrives.
6. **Update prompt**: change anything in `public/sw-routing.mjs` (a comment is enough), rebuild and restart, then
   reload the page. Application → Service workers shows the new worker *waiting to activate*, and the page shows
   "A new version is available". Refresh activates it and reloads once.
7. **Sign-out**: sign out; `dz-lessons-v1` disappears, the other caches stay.
8. **Clean slate**: Application → Storage → **Clear site data**.

Data Saver cannot be toggled in desktop DevTools; the Data Saver branch is covered by the unit tests.

### Troubleshooting

- *`next dev` serves old assets*: a production worker is still registered on `localhost:3000`. Loading any page in dev
  unregisters it (or use Application → Service workers → Unregister).
- *No worker in production*: check the console for a registration error; the page must be served over HTTPS (or from
  localhost) and the browser must support module service workers.
- *A page that should not be saved was saved*: it must be a `/app/lessons/<id>` navigation; send
  `X-Offline-Cache: none` from it, or tighten `isLessonPath()` and add a test.
