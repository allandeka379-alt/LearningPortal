import { describe, expect, it } from "vitest";
import { LruCache } from "./lru";

describe("LruCache", () => {
  it("returns cached values and undefined for misses", () => {
    const cache = new LruCache<string, number>({ maxEntries: 2 });
    cache.set("a", 1);
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.size).toBe(1);
  });

  it("evicts the least recently used entry when over maxEntries", () => {
    const cache = new LruCache<string, number>({ maxEntries: 2 });
    cache.set("a", 1);
    cache.set("b", 2);
    cache.get("a"); // "b" is now the least recently used
    cache.set("c", 3);
    expect(cache.has("a")).toBe(true);
    expect(cache.has("b")).toBe(false);
    expect(cache.has("c")).toBe(true);
  });

  it("replacing a key refreshes its recency and does not grow the cache", () => {
    const cache = new LruCache<string, number>({ maxEntries: 2 });
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("a", 10);
    cache.set("c", 3);
    expect(cache.get("a")).toBe(10);
    expect(cache.has("b")).toBe(false);
    expect(cache.size).toBe(2);
  });

  it("enforces the size budget and tracks totalSize", () => {
    const cache = new LruCache<string, string>({ maxEntries: 10, maxSize: 10, sizeOf: (v) => v.length });
    cache.set("a", "12345");
    cache.set("b", "1234");
    expect(cache.totalSize).toBe(9);
    cache.set("c", "123");
    expect(cache.has("a")).toBe(false);
    expect(cache.totalSize).toBe(7);
    cache.delete("b");
    expect(cache.totalSize).toBe(3);
  });

  it("does not cache a single value larger than the whole budget", () => {
    const cache = new LruCache<string, string>({ maxEntries: 10, maxSize: 4, sizeOf: (v) => v.length });
    cache.set("small", "1234");
    cache.set("huge", "123456");
    expect(cache.has("huge")).toBe(false);
    expect(cache.has("small")).toBe(true);
  });

  it("clear() empties the cache", () => {
    const cache = new LruCache<string, string>({ maxEntries: 3, maxSize: 100, sizeOf: (v) => v.length });
    cache.set("a", "x");
    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.totalSize).toBe(0);
  });

  it("rejects invalid options and sizes", () => {
    expect(() => new LruCache({ maxEntries: 0 })).toThrow(RangeError);
    expect(() => new LruCache({ maxEntries: 1, maxSize: 0 })).toThrow(RangeError);
    const cache = new LruCache<string, number>({ maxEntries: 1, sizeOf: () => Number.NaN });
    expect(() => cache.set("a", 1)).toThrow(RangeError);
  });
});
