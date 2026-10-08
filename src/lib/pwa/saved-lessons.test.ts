import { describe, expect, it, vi } from "vitest";
import { CACHE_NAMES, META_HEADERS, SW_MESSAGES } from "./constants";
import {
  cleanLessonTitle,
  clearOfflineData,
  formatSavedAt,
  isPersonalCacheName,
  listSavedLessons,
  reportOfflineViewer,
  sortSavedLessons,
  toSavedLesson,
  type SavedLesson,
} from "./saved-lessons";
import { FakeCacheStorage } from "./testing";

const ORIGIN = "https://dzidza.example";
const APP = "Dzidza";

function metaHeaders(title: string | null, cachedAt: string | null): Headers {
  const headers = new Headers({ "content-type": "text/html" });
  if (title !== null) headers.set(META_HEADERS.title, encodeURIComponent(title));
  if (cachedAt !== null) headers.set(META_HEADERS.cachedAt, cachedAt);
  return headers;
}

async function saveLesson(storage: FakeCacheStorage, path: string, title: string | null, cachedAt: string | null) {
  const cache = await storage.open(CACHE_NAMES.lessons);
  await cache.put(`${ORIGIN}${path}`, new Response("<html></html>", { headers: metaHeaders(title, cachedAt) }));
}

describe("cleanLessonTitle", () => {
  it("removes the app-name suffix added by the title template", () => {
    expect(cleanLessonTitle("Quadratic equations · Dzidza", APP)).toBe("Quadratic equations");
    expect(cleanLessonTitle("Circle theorems | Dzidza", APP)).toBe("Circle theorems");
    expect(cleanLessonTitle("Photosynthesis", APP)).toBe("Photosynthesis");
  });

  it("returns null for empty titles or the bare app name", () => {
    expect(cleanLessonTitle("Dzidza", APP)).toBeNull();
    expect(cleanLessonTitle("   ", APP)).toBeNull();
    expect(cleanLessonTitle(null, APP)).toBeNull();
  });
});

describe("toSavedLesson", () => {
  it("reads the title and save time from the stored headers", () => {
    const lesson = toSavedLesson(
      `${ORIGIN}/app/lessons/abc`,
      metaHeaders("Ohm’s law · Dzidza", "2026-10-05T08:30:00.000Z"),
      ORIGIN,
      APP,
    );
    expect(lesson).toEqual({ path: "/app/lessons/abc", title: "Ohm’s law", savedAt: new Date("2026-10-05T08:30:00.000Z") });
  });

  it("tolerates missing or malformed metadata", () => {
    const headers = new Headers({ [META_HEADERS.title]: "%E0%A4%A", [META_HEADERS.cachedAt]: "yesterday" });
    expect(toSavedLesson(`${ORIGIN}/app/lessons/abc`, headers, ORIGIN, APP)).toEqual({
      path: "/app/lessons/abc",
      title: null,
      savedAt: null,
    });
    expect(toSavedLesson(`${ORIGIN}/app/lessons/abc`, null, ORIGIN, APP)).toMatchObject({ title: null, savedAt: null });
  });

  it("rejects anything that is not a same-origin lesson page", () => {
    expect(toSavedLesson("https://evil.example/app/lessons/abc", null, ORIGIN, APP)).toBeNull();
    expect(toSavedLesson(`${ORIGIN}/app/exams/attempt/abc`, null, ORIGIN, APP)).toBeNull();
    expect(toSavedLesson(`${ORIGIN}/app/lessons/abc/print`, null, ORIGIN, APP)).toBeNull();
    expect(toSavedLesson("javascript:alert(1)", null, ORIGIN, APP)).toBeNull();
    expect(toSavedLesson("not a url", null, ORIGIN, APP)).toBeNull();
  });
});

describe("sortSavedLessons", () => {
  it("puts the most recently saved first and undated entries last", () => {
    const lessons: SavedLesson[] = [
      { path: "/app/lessons/a", title: "A", savedAt: new Date("2026-10-01T00:00:00Z") },
      { path: "/app/lessons/b", title: "B", savedAt: null },
      { path: "/app/lessons/c", title: "C", savedAt: new Date("2026-10-04T00:00:00Z") },
    ];
    expect(sortSavedLessons(lessons).map((lesson) => lesson.path)).toEqual(["/app/lessons/c", "/app/lessons/a", "/app/lessons/b"]);
  });
});

describe("listSavedLessons", () => {
  it("lists saved lessons newest first, skipping foreign entries", async () => {
    const storage = new FakeCacheStorage();
    await saveLesson(storage, "/app/lessons/old", "Old · Dzidza", "2026-09-01T00:00:00.000Z");
    await saveLesson(storage, "/app/lessons/new", "New · Dzidza", "2026-10-05T00:00:00.000Z");
    const cache = await storage.open(CACHE_NAMES.lessons);
    await cache.put(`${ORIGIN}/app/settings`, new Response("x"));

    const lessons = await listSavedLessons(storage, ORIGIN, APP);
    expect(lessons.map((lesson) => [lesson.path, lesson.title])).toEqual([
      ["/app/lessons/new", "New"],
      ["/app/lessons/old", "Old"],
    ]);
  });

  it("returns an empty list without creating the cache when nothing was saved", async () => {
    const storage = new FakeCacheStorage();
    expect(await listSavedLessons(storage, ORIGIN, APP)).toEqual([]);
    expect(await storage.keys()).toEqual([]);
  });
});

describe("clearOfflineData", () => {
  it("deletes personal caches of every version, keeps the shared asset caches and tells the worker", async () => {
    const storage = new FakeCacheStorage();
    await saveLesson(storage, "/app/lessons/a", "A", null);
    for (const name of ["dz-lessons-v0", CACHE_NAMES.static, CACHE_NAMES.shell, "another-app"]) await storage.open(name);
    const postMessage = vi.fn();

    await clearOfflineData(storage, { controller: { postMessage } });

    expect(await storage.keys()).toEqual([CACHE_NAMES.static, CACHE_NAMES.shell, "another-app"]);
    expect(postMessage).toHaveBeenCalledWith({ type: SW_MESSAGES.clearPersonalCaches });
  });

  it("never throws when storage or the worker is unavailable", async () => {
    await expect(clearOfflineData(null, null)).resolves.toBeUndefined();
    const broken = {
      keys: () => Promise.reject(new Error("SecurityError")),
      open: () => Promise.reject(new Error("SecurityError")),
      delete: () => Promise.reject(new Error("SecurityError")),
    };
    const throwingWorker = {
      controller: {
        postMessage: () => {
          throw new Error("gone");
        },
      },
    };
    await expect(clearOfflineData(broken, throwingWorker)).resolves.toBeUndefined();
  });

  it("identifies personal caches", () => {
    expect(isPersonalCacheName(CACHE_NAMES.lessons)).toBe(true);
    expect(isPersonalCacheName(CACHE_NAMES.fonts)).toBe(false);
  });
});

describe("reportOfflineViewer", () => {
  const viewer = "0123456789abcdef0123456789abcdef";

  it("tells the controlling worker which student is signed in", () => {
    const postMessage = vi.fn();
    reportOfflineViewer(viewer, { controller: { postMessage } });
    expect(postMessage).toHaveBeenCalledWith({ type: SW_MESSAGES.setViewer, viewer });
  });

  it("waits for the active worker when the page is not controlled yet, and never throws", async () => {
    const postMessage = vi.fn();
    reportOfflineViewer(viewer, { controller: null, ready: Promise.resolve({ active: { postMessage } }) });
    await vi.waitFor(() => expect(postMessage).toHaveBeenCalledWith({ type: SW_MESSAGES.setViewer, viewer }));
    expect(() => reportOfflineViewer(viewer, null)).not.toThrow();
    const throwing = { controller: { postMessage: () => { throw new Error("gone"); } } };
    expect(() => reportOfflineViewer(viewer, throwing)).not.toThrow();
  });
});

describe("formatSavedAt", () => {
  it("formats a medium date with a short time", () => {
    const text = formatSavedAt(new Date("2026-10-05T12:05:00Z"), "en-ZW");
    expect(text).toMatch(/2026/);
    expect(text).toMatch(/Oct/);
  });
});
