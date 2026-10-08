import "server-only";
import type { ContentBlockType } from "@/lib/content/blocks";
import type { ContentHeading, ContentWarning, ContentWarningCode, RenderMode } from "@/lib/content/types";

/** An image asset resolved by the DB layer. `src` must be an http(s) or same-origin relative URL. */
export interface ResolvedAsset {
  src: string;
  /** Intrinsic pixel size; emitted as attributes so the browser reserves space (no layout shift). */
  width?: number | null;
  height?: number | null;
  /** Default alt text stored on the asset; the alt written in the markdown takes precedence. */
  alt?: string | null;
}

export interface RenderSettings {
  mode: RenderMode;
  idPrefix: string;
  baseHeadingLevel: number;
  /** Assets referenced by the source, pre-resolved (null = not found). */
  assets: ReadonlyMap<string, ResolvedAsset | null>;
}

/**
 * Per-render state shared by the unified plugins. One processor is built once and reused, so per-render input
 * (settings) and output (warnings, headings, ...) travel on the VFile's `data` under {@link CONTEXT_KEY}.
 */
export class RenderContext {
  readonly warnings: ContentWarning[] = [];
  readonly blocks = new Set<ContentBlockType>();
  readonly headings: ContentHeading[] = [];
  hasMath = false;
  plainText = "";
  readonly #seenWarnings = new Set<string>();

  constructor(
    readonly source: string,
    readonly settings: RenderSettings,
  ) {}

  /** Records an authoring warning once per (code, line, message). */
  warn(code: ContentWarningCode, message: string, line?: number): void {
    const key = `${code}\u0000${line ?? ""}\u0000${message}`;
    if (this.#seenWarnings.has(key)) return;
    this.#seenWarnings.add(key);
    this.warnings.push(line === undefined ? { code, message } : { code, message, line });
  }
}

export const CONTEXT_KEY = "contentRenderContext";

/** Reads the render context from a VFile. Throws if a plugin is run outside `renderContent` (a programming error). */
export function getRenderContext(file: { readonly data: Record<string, unknown> }): RenderContext {
  const ctx = file.data[CONTEXT_KEY];
  if (!(ctx instanceof RenderContext)) {
    throw new Error("content pipeline plugin ran without a RenderContext; call renderContent() instead");
  }
  return ctx;
}
