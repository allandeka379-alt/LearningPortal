import "server-only";

export interface LruCacheOptions<V> {
  /** Maximum number of entries; the least recently used entry is evicted beyond this. */
  maxEntries: number;
  /**
   * Optional total "size" budget (in whatever unit `sizeOf` returns, e.g. string length). Entries are evicted
   * least-recently-used first until the total fits. A single value larger than the whole budget is not cached.
   */
  maxSize?: number;
  /** Size of one value; required for `maxSize` to have any effect. Must return a finite number ≥ 0. */
  sizeOf?: (value: V) => number;
}

interface Entry<V> {
  value: V;
  size: number;
}

/**
 * Tiny in-process LRU cache.
 *
 * Relies on `Map` preserving insertion order: a hit re-inserts the key so the first key is always the least
 * recently used one, making `get`/`set` O(1) without a linked list. Per-process only — every server instance has
 * its own copy, which is fine for derived data such as rendered HTML (cheap to recompute, never authoritative).
 */
export class LruCache<K, V> {
  readonly #entries = new Map<K, Entry<V>>();
  readonly #maxEntries: number;
  readonly #maxSize: number;
  readonly #sizeOf: ((value: V) => number) | undefined;
  #totalSize = 0;

  constructor(options: LruCacheOptions<V>) {
    if (!Number.isInteger(options.maxEntries) || options.maxEntries < 1) {
      throw new RangeError("LruCache: maxEntries must be a positive integer");
    }
    if (options.maxSize !== undefined && !(options.maxSize > 0)) {
      throw new RangeError("LruCache: maxSize must be a positive number");
    }
    this.#maxEntries = options.maxEntries;
    this.#maxSize = options.maxSize ?? Number.POSITIVE_INFINITY;
    this.#sizeOf = options.sizeOf;
  }

  /** Number of cached entries. */
  get size(): number {
    return this.#entries.size;
  }

  /** Sum of `sizeOf` over all entries (0 when no `sizeOf` was given). */
  get totalSize(): number {
    return this.#totalSize;
  }

  /** Returns the value and marks it most recently used. */
  get(key: K): V | undefined {
    const entry = this.#entries.get(key);
    if (!entry) return undefined;
    this.#entries.delete(key);
    this.#entries.set(key, entry);
    return entry.value;
  }

  /** Membership test that does not affect recency. */
  has(key: K): boolean {
    return this.#entries.has(key);
  }

  /** Inserts or replaces a value (as most recently used), then evicts until both budgets are met. */
  set(key: K, value: V): void {
    const size = this.#measure(value);
    this.delete(key);
    if (size > this.#maxSize) return;

    this.#entries.set(key, { value, size });
    this.#totalSize += size;
    this.#evict();
  }

  delete(key: K): boolean {
    const entry = this.#entries.get(key);
    if (!entry) return false;
    this.#entries.delete(key);
    this.#totalSize -= entry.size;
    return true;
  }

  clear(): void {
    this.#entries.clear();
    this.#totalSize = 0;
  }

  #measure(value: V): number {
    if (!this.#sizeOf) return 0;
    const size = this.#sizeOf(value);
    if (!Number.isFinite(size) || size < 0) {
      throw new RangeError("LruCache: sizeOf must return a finite number >= 0");
    }
    return size;
  }

  #evict(): void {
    while (this.#entries.size > this.#maxEntries || this.#totalSize > this.#maxSize) {
      const oldest = this.#entries.keys().next();
      if (oldest.done) return;
      this.delete(oldest.value);
    }
  }
}
