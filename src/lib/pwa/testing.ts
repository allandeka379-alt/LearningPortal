/**
 * TEST-ONLY helpers for the offline/PWA tests: loaders for the raw service worker modules in /public and in-memory
 * Cache Storage fakes with the same ordering semantics as the real API (`put` re-appends a key). Not imported by
 * application code.
 */
import type { SwRoutingModule } from "./sw-routing.types";

/** Absolute file URL of a file in /public (resolved from this file, independent of the working directory). */
export function publicFileUrl(fileName: string): string {
  return new URL(`../../../public/${fileName}`, import.meta.url).href;
}

/** Loads `public/sw-routing.mjs`. */
export async function loadSwRouting(): Promise<SwRoutingModule> {
  return (await import(/* @vite-ignore */ publicFileUrl("sw-routing.mjs"))) as SwRoutingModule;
}

type CacheKey = string | { url: string };

function keyOf(request: CacheKey): string {
  return typeof request === "string" ? request : request.url;
}

/** In-memory `Cache`: keyed by URL, insertion-ordered, `put` moves a key to the end. */
export class FakeCache {
  readonly entries = new Map<string, Response>();

  async match(request: CacheKey): Promise<Response | undefined> {
    return this.entries.get(keyOf(request))?.clone();
  }

  async put(request: CacheKey, response: Response): Promise<void> {
    const key = keyOf(request);
    // Like the real API: the body is fully read before the entry is committed.
    const body = await response.arrayBuffer();
    this.entries.delete(key);
    this.entries.set(key, new Response(body, { status: response.status, headers: response.headers }));
  }

  async delete(request: CacheKey): Promise<boolean> {
    return this.entries.delete(keyOf(request));
  }

  async keys(): Promise<{ url: string }[]> {
    return [...this.entries.keys()].map((url) => ({ url }));
  }

  urls(): string[] {
    return [...this.entries.keys()];
  }
}

/** In-memory `CacheStorage`. */
export class FakeCacheStorage {
  readonly caches = new Map<string, FakeCache>();

  async open(name: string): Promise<FakeCache> {
    let cache = this.caches.get(name);
    if (!cache) {
      cache = new FakeCache();
      this.caches.set(name, cache);
    }
    return cache;
  }

  async has(name: string): Promise<boolean> {
    return this.caches.has(name);
  }

  async delete(name: string): Promise<boolean> {
    return this.caches.delete(name);
  }

  async keys(): Promise<string[]> {
    return [...this.caches.keys()];
  }

  /** Synchronous peek for assertions. */
  peek(name: string): FakeCache | undefined {
    return this.caches.get(name);
  }
}

/** An HTML response as the network would return it. */
export function htmlResponse(html: string, init: { status?: number; headers?: Record<string, string> } = {}): Response {
  return new Response(html, {
    status: init.status ?? 200,
    headers: { "content-type": "text/html; charset=utf-8", ...init.headers },
  });
}
