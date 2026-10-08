import { Search } from "lucide-react";
import Link from "next/link";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/cn";

/**
 * One row of filters above an admin list (search, selects, dates). A plain GET form: the filters become
 * `searchParams`, so results are linkable and work without JavaScript; applying filters drops the cursor (back to
 * the first page). Server component.
 */

export type FilterControl =
  | { kind: "select"; name: string; label: string; options: readonly SelectOption[]; value?: string; placeholder?: string }
  | { kind: "date"; name: string; label: string; value?: string }
  | { kind: "text"; name: string; label: string; value?: string; placeholder?: string };

export interface FilterBarProps {
  /** List path the form submits to. */
  action: string;
  search?: { name?: string; label: string; placeholder?: string; value?: string };
  filters?: readonly FilterControl[];
  /** Params to keep (e.g. a tab) as hidden fields. */
  keep?: Readonly<Record<string, string | undefined>>;
  /** Accessible name of the filter region. */
  label?: string;
  className?: string;
}

export function FilterBar({ action, search, filters = [], keep, label = "Filters", className }: FilterBarProps) {
  const active = Boolean(search?.value) || filters.some((filter) => Boolean(filter.value));
  return (
    <div role="search" aria-label={label} className={cn("mb-4", className)}>
      <form method="get" action={action} className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
        {keep &&
          Object.entries(keep).map(([name, value]) => (value ? <input key={name} type="hidden" name={name} value={value} /> : null))}
        {search && (
          <Field label={search.label} className="md:min-w-64 md:flex-1">
            <Input
              type="search"
              name={search.name ?? "q"}
              defaultValue={search.value}
              placeholder={search.placeholder}
              startIcon={<Search />}
              maxLength={200}
              autoComplete="off"
            />
          </Field>
        )}
        {filters.map((filter) => (
          <Field key={filter.name} label={filter.label} className="md:w-48">
            {filter.kind === "select" ? (
              <Select name={filter.name} defaultValue={filter.value ?? ""} options={filter.options} placeholder={filter.placeholder ?? "All"} />
            ) : filter.kind === "date" ? (
              <Input type="date" name={filter.name} defaultValue={filter.value} />
            ) : (
              <Input type="text" name={filter.name} defaultValue={filter.value} placeholder={filter.placeholder} maxLength={200} />
            )}
          </Field>
        ))}
        <div className="flex gap-2">
          <Button type="submit" variant="secondary">
            Apply
          </Button>
          {active && (
            <Link href={action} className={buttonStyles({ variant: "ghost" })}>
              Clear
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
