/** Id of the main content landmark. Every shell/page renders `<main id={MAIN_CONTENT_ID} tabIndex={-1}>`. */
export const MAIN_CONTENT_ID = "main-content";

/** First focusable element on every page (rendered by the root layout): jumps past navigation (§43). */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only rounded-control bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
    >
      Skip to content
    </a>
  );
}
