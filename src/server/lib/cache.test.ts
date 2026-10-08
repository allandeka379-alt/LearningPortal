import { describe, expect, it, vi } from "vitest";
import { createCache, memoizeAsync, TtlCache } from "./cache";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  return { promise, resolve };
}

function clock(start = 1_000) {
  let now = start;
  return { now: () => now, advance: (ms: number) => (now += ms) };
}

describe("TtlCache", () => {
  it("expires entries after their TTL", () => {
    const c = clock();
    const cache = createCache<string, number>({ maxEntries: 10, ttlMs: 100, now: c.now });
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);
    c.advance(99);
    expect(cache.has("a")).toBe(true);
    c.advance(1);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.size).toBe(0);
  });

  it("honours a per-entry TTL", () => {
    const c = clock();
    const cache = createCache<string, number>({ maxEntries: 10, ttlMs: 100, now: c.now });
    cache.set("short", 1, 10);
    c.advance(11);
    expect(cache.get("short")).toBeUndefined();
  });

  it("evicts the least recently used entry beyond maxEntries, preferring expired ones", () => {
    const c = clock();
    const cache = new TtlCache<string, number>({ maxEntries: 2, ttlMs: 1_000, now: c.now });
    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a"); // a is now most recent
    cache.set("c", 3);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("a")).toBe(1);
    expect(cache.get("c")).toBe(3);

    cache.set("x", 9, 1);
    c.advance(5);
    cache.set("y", 10); // "x" is expired and goes first
    expect(cache.get("c")).toBe(3);
  });

  it("validates options", () => {
    expect(() => createCache({ maxEntries: 0, ttlMs: 1 })).toThrow(RangeError);
    expect(() => createCache({ maxEntries: 1, ttlMs: 0 })).toThrow(RangeError);
  });

  it("getOrLoad shares one in-flight load and does not cache failures", async () => {
    const cache = createCache<string, number>({ maxEntries: 10, ttlMs: 1_000 });
    const gate = deferred<number>();
    const load = vi.fn(() => gate.promise);
    const p1 = cache.getOrLoad("k", load);
    const p2 = cache.getOrLoad("k", load);
    gate.resolve(42);
    await expect(Promise.all([p1, p2])).resolves.toEqual([42, 42]);
    expect(load).toHaveBeenCalledTimes(1);
    await expect(cache.getOrLoad("k", load)).resolves.toBe(42);
    expect(load).toHaveBeenCalledTimes(1);

    const failing = vi.fn().mockRejectedValueOnce(new Error("boom")).mockResolvedValueOnce(7);
    await expect(cache.getOrLoad("f", failing)).rejects.toThrow("boom");
    await expect(cache.getOrLoad("f", failing)).resolves.toBe(7);
  });

  it("discards a load that was invalidated while in flight", async () => {
    const cache = createCache<string, number>({ maxEntries: 10, ttlMs: 1_000 });
    const gate = deferred<number>();
    const pending = cache.getOrLoad("k", () => gate.promise);
    cache.delete("k");
    gate.resolve(1);
    await pending;
    expect(cache.get("k")).toBeUndefined();
  });
});

describe("memoizeAsync", () => {
  it("caches per argument list and supports invalidation", async () => {
    const c = clock();
    const fn = vi.fn(async (a: number, b: number) => a + b);
    const memo = memoizeAsync(fn, { ttlMs: 100, now: c.now });
    expect(await memo(1, 2)).toBe(3);
    expect(await memo(1, 2)).toBe(3);
    expect(await memo(2, 2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(2);
    memo.invalidate(1, 2);
    await memo(1, 2);
    expect(fn).toHaveBeenCalledTimes(3);
    c.advance(100);
    await memo(2, 2);
    expect(fn).toHaveBeenCalledTimes(4);
    memo.clear();
    await memo(2, 2);
    expect(fn).toHaveBeenCalledTimes(5);
  });

  it("uses a custom key function", async () => {
    const fn = vi.fn(async (input: { id: string; noise: number }) => input.id);
    const memo = memoizeAsync(fn, { key: (input) => input.id });
    await memo({ id: "a", noise: 1 });
    await memo({ id: "a", noise: 2 });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
