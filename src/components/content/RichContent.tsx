// KaTeX's stylesheet (and fonts) load only on routes that render content, not on every page.
import "katex/dist/katex.min.css";
import "./content.css";
import { cn } from "@/lib/cn";
import type { SanitizedHtml } from "@/lib/content/types";

export interface RichContentProps {
  /** Output of `renderContent` / `renderInline` (or `trustPersistedHtml` for HTML the pipeline produced earlier). */
  html: SanitizedHtml;
  /** Extra classes for layout (margins, width). Typography comes from `content.css`. */
  className?: string;
  /** Render as `<span>` for `renderInline` output (MCQ options, labels, short answers) instead of `<div>`. */
  inline?: boolean;
  /** BCP 47 language of the content when it differs from the page, e.g. `"sn"` (Shona) or `"nd"` (Ndebele). */
  lang?: string;
  id?: string;
}

/**
 * Displays rendered educational content (lessons, question stems, explanations, flashcards).
 *
 * SECURITY: this is the ONLY sanctioned use of `dangerouslySetInnerHTML` in the codebase. It is safe because `html`
 * is typed `SanitizedHtml`, which only the content pipeline in `src/server/content/render.ts` produces (markdown →
 * raw HTML dropped → allow-list sanitiser → trusted KaTeX). Never cast another string to `SanitizedHtml` to get it
 * displayed here; render it through the pipeline instead.
 *
 * A Server Component by default (no client JS); it has no hooks, so it may also be rendered inside Client
 * Components that receive pre-rendered HTML from the server.
 */
export function RichContent({ html, className, inline = false, lang, id }: RichContentProps) {
  const Tag = inline ? "span" : "div";
  return (
    <Tag
      id={id}
      lang={lang}
      className={cn("rich-content", inline && "rich-content--inline", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
