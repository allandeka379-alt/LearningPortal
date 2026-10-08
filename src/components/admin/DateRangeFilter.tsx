import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { addDays, isLocalDate, localDateString, type LocalDate } from "@/lib/dates";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { buildHref } from "./search-params";

/**
 * Date-range control for analytics pages: presets first (last 7 / 30 / 90 / 365 days, ending yesterday — the last
 * fully rolled-up day), then a custom range. Lives in the URL (`from`, `to`), so it scopes every chart and number
 * below it and the view is linkable. Server component; plain links + a GET form.
 */

export interface DateRange {
  from: LocalDate;
  to: LocalDate;
}

export const RANGE_PRESETS = [
  { days: 7, label: "Last 7 days" },
  { days: 30, label: "Last 30 days" },
  { days: 90, label: "Last 90 days" },
  { days: 365, label: "Last 365 days" },
] as const;

/** Preset range of `days` days ending yesterday (platform time zone). */
export function presetRange(days: number, now: Date = new Date(), timeZone: string = DEFAULT_TIMEZONE): DateRange {
  const to = addDays(localDateString(now, timeZone), -1);
  return { from: addDays(to, -(days - 1)), to };
}

/**
 * Reads `from` / `to` from the URL, falling back to the last 30 days. Invalid, reversed or over-long (> 366 days)
 * ranges fall back too, so a hand-edited URL never errors.
 */
export function rangeFromParams(from: string | undefined, to: string | undefined, now: Date = new Date()): DateRange & { isDefault: boolean } {
  const fallback = presetRange(30, now);
  if (!from || !to || !isLocalDate(from) || !isLocalDate(to) || from > to) return { ...fallback, isDefault: true };
  const span = (Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000 + 1;
  if (span > 366) return { ...fallback, isDefault: true };
  return { from, to, isDefault: false };
}

export function DateRangeFilter({
  path,
  range,
  keep,
  now = new Date(),
  className,
}: {
  path: string;
  range: DateRange;
  /** Other params to keep when switching ranges. */
  keep?: Readonly<Record<string, string | undefined>>;
  now?: Date;
  className?: string;
}) {
  return (
    <div role="search" aria-label="Date range" className={cn("flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between", className)}>
      <nav aria-label="Range presets">
        <ul className="flex flex-wrap gap-1 rounded-control bg-subtle p-1">
          {RANGE_PRESETS.map((preset) => {
            const presetValue = presetRange(preset.days, now);
            const selected = presetValue.from === range.from && presetValue.to === range.to;
            return (
              <li key={preset.days}>
                <Link
                  href={buildHref(path, { ...keep, from: presetValue.from, to: presetValue.to })}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted hover:bg-surface hover:text-text lg:min-h-9",
                    selected && "bg-surface text-text shadow-xs",
                  )}
                >
                  {selected && <Check aria-hidden="true" className="size-4" strokeWidth={3} />}
                  {preset.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <form method="get" action={path} className="flex flex-wrap items-end gap-2">
        {keep && Object.entries(keep).map(([name, value]) => (value ? <input key={name} type="hidden" name={name} value={value} /> : null))}
        <Field label="From" className="w-40">
          <Input type="date" name="from" defaultValue={range.from} required />
        </Field>
        <Field label="To" className="w-40">
          <Input type="date" name="to" defaultValue={range.to} required />
        </Field>
        <Button type="submit" variant="outline">
          Apply range
        </Button>
      </form>
    </div>
  );
}
