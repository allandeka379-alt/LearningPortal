/**
 * Shared look for text-like form controls (Input, Textarea, Select).
 * - `text-base` (16px) prevents iOS Safari from zooming the page on focus.
 * - `border-border-strong` meets the 3:1 non-text contrast requirement for control boundaries (WCAG 1.4.11).
 * - Invalid state is driven by `aria-invalid`, which `Field` sets, so styling and semantics can't drift apart.
 */
export const controlStyles =
  "block w-full rounded-control border border-border-strong bg-surface text-base text-text shadow-xs " +
  "transition-colors duration-150 focus-visible:border-primary focus-visible:outline-offset-1 " +
  "disabled:cursor-not-allowed disabled:bg-subtle disabled:text-muted " +
  "aria-invalid:border-danger aria-invalid:focus-visible:outline-danger";
