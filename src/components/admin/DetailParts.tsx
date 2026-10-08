import type { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EMPTY_VALUE } from "@/lib/format";
import { cn } from "@/lib/cn";
import { formatDateTime } from "./format";

/** Building blocks for admin detail pages (server-compatible). */

export interface KeyValueItem {
  label: string;
  value: ReactNode;
  /** Hide the row entirely when the value is empty (instead of showing an em dash). */
  hideWhenEmpty?: boolean;
}

function isEmptyValue(value: ReactNode): boolean {
  return value === null || value === undefined || value === "" || value === false;
}

/** Definition list of labelled facts, two columns from `sm`. Empty values show an em dash (never a made-up value). */
export function KeyValueList({ items, className, columns = 2 }: { items: readonly KeyValueItem[]; className?: string; columns?: 1 | 2 | 3 }) {
  const visible = items.filter((item) => !(item.hideWhenEmpty && isEmptyValue(item.value)));
  return (
    <dl
      className={cn(
        "grid gap-x-6 gap-y-3 text-sm",
        columns >= 2 && "sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {visible.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-muted">{item.label}</dt>
          <dd className="mt-0.5 break-words text-text">{isEmptyValue(item.value) ? EMPTY_VALUE : item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A titled card section of a detail page (`h2` by default). */
export function AdminSection({
  title,
  description,
  action,
  children,
  id,
  titleAs = "h2",
  className,
  flush = false,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  titleAs?: "h2" | "h3";
  className?: string;
  /** No body padding (for tables that draw their own frame). */
  flush?: boolean;
}) {
  return (
    <Card as="section" id={id} aria-label={title} className={cn("scroll-mt-20", className)}>
      <CardHeader title={title} titleAs={titleAs} description={description} action={action} />
      <CardBody className={flush ? "px-0 pb-0 sm:px-0" : undefined}>{children}</CardBody>
    </Card>
  );
}

/** "Approved by Tendai on 5 Oct 2026, 14:32" style attribution for workflow steps (§42 who/when). */
export function ApprovalInfo({
  steps,
  className,
}: {
  steps: readonly { label: string; by: string | null | undefined; at: Date | string | null | undefined }[];
  className?: string;
}) {
  const shown = steps.filter((step) => step.at !== null && step.at !== undefined);
  if (shown.length === 0) return null;
  return (
    <ul className={cn("space-y-1 text-sm text-muted", className)}>
      {shown.map((step) => (
        <li key={step.label}>
          <span className="font-medium text-text">{step.label}</span> by {step.by ?? "a deleted user"} on{" "}
          <time dateTime={new Date(step.at as Date | string).toISOString()}>{formatDateTime(step.at)}</time>
        </li>
      ))}
    </ul>
  );
}

/**
 * Read-only JSON (audit diffs, job payloads). Rendered as escaped text in a scrollable `<pre>` (never as HTML).
 * Values arrive already redacted by the audit layer.
 */
export function JsonPreview({ value, label, className }: { value: unknown; label: string; className?: string }) {
  if (value === null || value === undefined) return null;
  let text: string;
  try {
    text = JSON.stringify(value, null, 2);
  } catch {
    text = String(value);
  }
  return (
    <figure className={cn("min-w-0", className)}>
      <figcaption className="mb-1 text-xs font-semibold tracking-wide text-muted uppercase">{label}</figcaption>
      <pre tabIndex={0} className="max-h-72 overflow-auto rounded-control bg-subtle p-3 font-mono text-xs leading-relaxed text-text">
        {text}
      </pre>
    </figure>
  );
}

/** Small "time ago"-free timestamp with a machine-readable `dateTime`. */
export function Timestamp({ value, className }: { value: Date | string | null | undefined; className?: string }) {
  if (value === null || value === undefined) return <span className={className}>{EMPTY_VALUE}</span>;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return <span className={className}>{EMPTY_VALUE}</span>;
  return (
    <time dateTime={date.toISOString()} className={cn("whitespace-nowrap tabular-nums", className)}>
      {formatDateTime(date)}
    </time>
  );
}
