/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CACHE_NAMES, META_HEADERS } from "@/lib/pwa/constants";
import { FakeCacheStorage } from "@/lib/pwa/testing";
import { SavedLessonsList } from "./SavedLessonsList";

function useCacheStorage(storage: FakeCacheStorage | undefined): void {
  Object.defineProperty(globalThis, "caches", { configurable: true, writable: true, value: storage });
}

async function saveLesson(storage: FakeCacheStorage, path: string, title: string, cachedAt: string): Promise<void> {
  const cache = await storage.open(CACHE_NAMES.lessons);
  await cache.put(
    `${window.location.origin}${path}`,
    new Response("<html></html>", {
      headers: { [META_HEADERS.title]: encodeURIComponent(`${title} · Dzidza`), [META_HEADERS.cachedAt]: cachedAt },
    }),
  );
}

async function renderList(): Promise<void> {
  render(<SavedLessonsList />);
  await act(async () => {});
}

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(globalThis, "caches");
});

describe("SavedLessonsList", () => {
  it("lists lessons saved on this device, newest first, as plain links", async () => {
    const storage = new FakeCacheStorage();
    await saveLesson(storage, "/app/lessons/a", "Quadratic equations", "2026-10-01T08:00:00.000Z");
    await saveLesson(storage, "/app/lessons/b", "Photosynthesis", "2026-10-04T08:00:00.000Z");
    useCacheStorage(storage);

    await renderList();

    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/app/lessons/b", "/app/lessons/a"]);
    expect(links[0]?.textContent).toContain("Photosynthesis");
    expect(links[1]?.textContent).toContain("Quadratic equations");
    expect(links[0]?.textContent).not.toContain("Dzidza");
    expect(screen.getAllByText(/^Saved /)).toHaveLength(2);
  });

  it("shows an honest empty state when nothing has been saved", async () => {
    useCacheStorage(new FakeCacheStorage());
    await renderList();
    expect(screen.getByText("No saved lessons yet")).toBeTruthy();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("explains when the browser cannot keep lessons offline", async () => {
    useCacheStorage(undefined);
    await renderList();
    expect(screen.getByText(/can’t keep lessons for offline reading/)).toBeTruthy();
  });

  it("removes saved lessons from the device", async () => {
    const storage = new FakeCacheStorage();
    await saveLesson(storage, "/app/lessons/a", "Quadratic equations", "2026-10-01T08:00:00.000Z");
    await storage.open(CACHE_NAMES.static);
    useCacheStorage(storage);
    await renderList();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Remove saved lessons from this device" }));
    });

    expect(screen.getByText("No saved lessons yet")).toBeTruthy();
    expect(await storage.keys()).toEqual([CACHE_NAMES.static]);
  });
});
