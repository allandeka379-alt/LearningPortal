/**
 * Tiny in-process TTL + LRU cache (ARCHITECTURE §3.8 "In-process LRU") for read-heavy lookups: settings, catalogue
 * lists, plan feature config, grade schemes.
 *
 * PER-INSTANCE ONLY: every web node and worker holds its own copy, so a write on one instance is visible elsewhere only
 * after the TTL. Keep TTLs short (seconds to a minute), call `delete()` on the writing instance, and never cache
 * anything that must be strongly consistent (balances, quotas, permissions after revocation). A shared cache (Redis) is
 * the planned upgrade when web nodes scale out (§2.2).
 *
 * Deliberately free of `server-only` and I/O so it can be unit-tested and used by the worker.
 */

export interface TtlCacheOptions {
  /** Maximum number of entries; the least recently used entry is evicted beyond this. */
  maxEntries: number;
  /** Default time-to-live per entry in milliseconds. */
  ttlMs: number;
  /** Clock in epoch milliseconds (injectable for tests). */
  now?: () => number;
}

interface Entry<V> {
  value: V;
  expiresAt: number;
}

/**
 * TTL + LRU map. `Map` preserves insertion order, so re-inserting on access keeps the least recently used key first
 * and makes `get`/`set` O(1). Expired entries are dropped lazily on access and during eviction.
 */
export class TtlCache<K, V> {
  readonly #entries = new Map<K, Entry<V>>();
  readonly #inflight = new Map<K, Promise<V>>();
  readonly #maxEntries: number;
  readonly #ttlMs: number;
  readonly #now: () => number;

  constructor(options: TtlCacheOptions) {
    if (!Number.isInteger(options.maxEntries) || options.maxEntries < 1) {
      throw new RangeError("TtlCache: maxEntries must be a positive integer");
    }
    if (!Number.isFinite(options.ttlMs) || options.ttlMs <= 0) {
      throw new RangeError("TtlCache: ttlMs must be a positive number");
    }
    this.#maxEntries = options.maxEntries;
    this.#ttlMs = options.ttlMs;
    this.#now = options.now ?? Date.now;
  }

  /** Number of stored entries (including expired ones not yet swept). */
  get size(): number {
    return this.#entries.size;
  }

  /** Returns a fresh value and marks it most recently used; `undefined` when missing or expired. */
  get(key: K): V | undefined {
    const entry = this.#entries.get(key);
    if (!entry) return undefined;
    this.#entries.delete(key);
    if (entry.expiresAt <= this.#now()) return undefined;
    this.#entries.set(key, entry);
    return entry.value;
  }

  /** True when a fresh value is stored (does not change recency). */
  has(key: K): boolean {
    const entry = this.#entries.get(key);
    return entry !== undefined && entry.expiresAt > this.#now();
  }

  /** Stores a value as most recently used, with the default TTL unless `ttlMs` is given. */
  set(key: K, value: V, ttlMs: number = this.#ttlMs): void {
    this.#entries.delete(key);
    this.#entries.set(key, { value, expiresAt: this.#now() + ttlMs });
    this.#evict();
  }

  /** Removes a key (and forgets any in-flight load for it, so the next read reloads). */
  delete(key: K): boolean {
    this.#inflight.delete(key);
    return this.#entries.delete(key);
  }

  clear(): void {
    this.#entries.clear();
    this.#inflight.clear();
  }

  /**
   * Returns the cached value for `key`, or runs `load()` once and caches its result. Concurrent callers for the same
   * missing key share one in-flight load (no thundering herd). Rejections are NOT cached: the next call retries.
   */
  async getOrLoad(key: K, load: () => Promise<V>, ttlMs?: number): Promise<V> {
    const entry = this.#entries.get(key);
    if (entry && entry.expiresAt > this.#now()) {
      this.#entries.delete(key);
      this.#entries.set(key, entry);
      return entry.value;
    }
    const pending = this.#inflight.get(key);
    if (pending) return pending;

    // `.then(load)` defers the call, so `promise` is always assigned before the callbacks below compare against it.
    const promise: Promise<V> = Promise.resolve()
      .then(load)
      .then(
        (value) => {
          // Only store if this load is still the current one (delete()/clear() during the load discards it).
          if (this.#inflight.get(key) === promise) {
            this.#inflight.delete(key);
            this.set(key, value, ttlMs);
          }
          return value;
        },
        (error: unknown) => {
          if (this.#inflight.get(key) === promise) this.#inflight.delete(key);
          throw error;
        },
      );
    this.#inflight.set(key, promise);
    return promise;
  }

  #evict(): void {
    if (this.#entries.size <= this.#maxEntries) return;
    const now = this.#now();
    for (const [key, entry] of this.#entries) {
      if (this.#entries.size <= this.#maxEntries) return;
      if (entry.expiresAt <= now) this.#entries.delete(key);
    }
    while (this.#entries.size > this.#maxEntries) {
      const oldest = this.#entries.keys().next();
      if (oldest.done) return;
      this.#entries.delete(oldest.value);
    }
  }
}

/** Creates a {@link TtlCache}. */
export function createCache<K, V>(options: TtlCacheOptions): TtlCache<K, V> {
  return new TtlCache<K, V>(options);
}

export interface MemoizeOptions<Args extends unknown[]> extends Partial<TtlCacheOptions> {
  /** Cache key for a call; defaults to `JSON.stringify(args)`. */
  key?: (...args: Args) => string;
}

/** An async function wrapped by {@link memoizeAsync}, with cache controls. */
export type MemoizedAsync<Args extends unknown[], R> = ((...args: Args) => Promise<R>) & {
  /** Drops the cached result for these arguments. */
  invalidate: (...args: Args) => void;
  /** Drops every cached result. */
  clear: () => void;
};

/**
 * Memoizes an async loader with a per-instance TTL + LRU cache (defaults: 60 s, 500 entries).
 *
 * @example
 * const listBoards = memoizeAsync(() => db.examBoard.findMany({ select: { id: true, slug: true } }), { ttlMs: 60_000 });
 */
export function memoizeAsync<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  options: MemoizeOptions<Args> = {},
): MemoizedAsync<Args, R> {
  const cache = new TtlCache<string, R>({
    maxEntries: options.maxEntries ?? 500,
    ttlMs: options.ttlMs ?? 60_000,
    ...(options.now ? { now: options.now } : {}),
  });
  const keyOf = options.key ?? ((...args: Args) => JSON.stringify(args));
  const memoized = ((...args: Args) => cache.getOrLoad(keyOf(...args), () => fn(...args))) as MemoizedAsync<Args, R>;
  memoized.invalidate = (...args: Args) => {
    cache.delete(keyOf(...args));
  };
  memoized.clear = () => cache.clear();
  return memoized;
}
