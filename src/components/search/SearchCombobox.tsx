"use client";

import { Lock, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { controlStyles } from "@/components/ui/control-styles";
import { ENTITY_TYPE_LABELS, SEARCH_QUERY_MAX_LENGTH, SUGGEST_MIN_LENGTH, type SuggestionView } from "./config";
import { resultHref, SEARCH_PATH } from "./links";

/** Default autocomplete endpoint (GET, `{ data: SuggestionView[] }`). */
export const SUGGEST_ENDPOINT = "/api/v1/search/suggest";
/** Wait this long after the last keystroke before asking the server (slow networks, rate limits). */
export const SUGGEST_DEBOUNCE_MS = 250;

export type FetchSuggestions = (query: string, signal: AbortSignal) => Promise<SuggestionView[]>;

/** Default fetcher: same-origin GET; any failure (offline, 429, 5xx) yields no suggestions. */
export const fetchSuggestionsFromApi: FetchSuggestions = async (query, signal) => {
  const response = await fetch(`${SUGGEST_ENDPOINT}?q=${encodeURIComponent(query)}`, {
    signal,
    credentials: "same-origin",
    headers: { accept: "application/json" },
  });
  if (!response.ok) return [];
  const body = (await response.json()) as { data?: unknown };
  return Array.isArray(body.data) ? (body.data as SuggestionView[]) : [];
};

export interface SearchComboboxProps {
  /** Initial text (the current query on the results page). */
  defaultValue?: string;
  /** Visible label text (also the accessible name). */
  label?: string;
  /** Hide the label visually (the header field); it stays the accessible name. */
  labelHidden?: boolean;
  placeholder?: string;
  /** Extra GET fields kept when the form is submitted, e.g. the current tab. */
  hiddenFields?: Readonly<Record<string, string>>;
  /** `header`: compact field in the top bar. `page`: the large field on /app/search. */
  variant?: "header" | "page";
  /** Inject the fetcher (tests). */
  fetchSuggestions?: FetchSuggestions;
  /** Inject navigation (tests); default `router.push`. */
  navigate?: (href: string) => void;
  debounceMs?: number;
  className?: string;
}

type Status = "idle" | "loading" | "ready";

/**
 * Global search field with autocomplete (§28; WAI-ARIA 1.2 combobox with a listbox popup).
 *
 * - A plain GET form to /app/search: works without JavaScript and when suggestions fail.
 * - Suggestions are fetched {@link SUGGEST_DEBOUNCE_MS} after typing stops, from 2 characters, with the previous
 *   request aborted and answers cached per text, so a slow connection is not flooded.
 * - Keyboard: ↓/↑ move through suggestions (focus stays in the field, `aria-activedescendant`), Enter opens the active
 *   suggestion or runs the full search, Escape closes the list (a second Escape clears the field), Tab leaves.
 * - The number of suggestions is announced politely; premium items are marked with a lock (titles only, never content).
 */
export function SearchCombobox({
  defaultValue = "",
  label = "Search",
  labelHidden = false,
  placeholder = "Search lessons, questions, topics…",
  hiddenFields,
  variant = "page",
  fetchSuggestions = fetchSuggestionsFromApi,
  navigate,
  debounceMs = SUGGEST_DEBOUNCE_MS,
  className,
}: SearchComboboxProps) {
  const router = useRouter();
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const [value, setValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<SuggestionView[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [status, setStatus] = useState<Status>("idle");

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controller = useRef<AbortController | null>(null);
  const cache = useRef(new Map<string, SuggestionView[]>());
  const latest = useRef("");

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      controller.current?.abort();
    },
    [],
  );

  const go = (href: string) => (navigate ?? ((target: string) => router.push(target)))(href);

  const show = (items: SuggestionView[]) => {
    setSuggestions(items);
    setActive(-1);
    setOpen(items.length > 0);
    setStatus("ready");
  };

  const request = (text: string) => {
    const key = text.toLowerCase();
    const cached = cache.current.get(key);
    if (cached) {
      show(cached);
      return;
    }
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    setStatus("loading");
    fetchSuggestions(text, abort.signal)
      .then((items) => {
        cache.current.set(key, items);
        if (latest.current === text) show(items);
      })
      .catch(() => {
        // Aborted or failed (offline, rate limited): the form still searches on Enter.
        if (latest.current === text && !abort.signal.aborted) show([]);
      });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setValue(next);
    const text = next.trim();
    latest.current = text;
    if (timer.current) clearTimeout(timer.current);
    if (text.length < SUGGEST_MIN_LENGTH) {
      controller.current?.abort();
      setSuggestions([]);
      setOpen(false);
      setActive(-1);
      setStatus("idle");
      return;
    }
    timer.current = setTimeout(() => request(text), debounceMs);
  };

  const close = () => {
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const count = suggestions.length;
    switch (event.key) {
      case "ArrowDown":
        if (count === 0) return;
        event.preventDefault();
        if (!open) {
          setOpen(true);
          setActive(0);
        } else {
          setActive((current) => (current + 1) % count);
        }
        return;
      case "ArrowUp":
        if (count === 0) return;
        event.preventDefault();
        if (!open) setOpen(true);
        setActive((current) => (current <= 0 ? count - 1 : current - 1));
        return;
      case "Enter": {
        const chosen = open && active >= 0 ? suggestions[active] : undefined;
        if (chosen) {
          event.preventDefault();
          close();
          go(resultHref(chosen));
        }
        return; // otherwise the form submits: full search
      }
      case "Escape":
        if (open) {
          event.preventDefault();
          close();
        } else if (value !== "") {
          event.preventDefault();
          setValue("");
          latest.current = "";
          setSuggestions([]);
          setStatus("idle");
        }
        return;
      case "Tab":
        close();
        return;
      default:
        return;
    }
  };

  /** Full search as a client navigation (the native GET submit still works before hydration). */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    close();
    const params = new URLSearchParams();
    const q = value.trim().slice(0, SEARCH_QUERY_MAX_LENGTH);
    if (q !== "") params.set("q", q);
    for (const [name, fieldValue] of Object.entries(hiddenFields ?? {})) if (fieldValue !== "") params.set(name, fieldValue);
    const query = params.toString();
    go(query === "" ? SEARCH_PATH : `${SEARCH_PATH}?${query}`);
  };

  const expanded = open && suggestions.length > 0;
  const announcement =
    status === "ready" && value.trim().length >= SUGGEST_MIN_LENGTH
      ? suggestions.length === 0
        ? "No suggestions. Press Enter to search."
        : `${suggestions.length} ${suggestions.length === 1 ? "suggestion" : "suggestions"}. Use the up and down arrows to review.`
      : "";
  const isHeader = variant === "header";

  return (
    <form role="search" action={SEARCH_PATH} method="get" className={cn("relative", className)} onSubmit={onSubmit}>
      <label htmlFor={inputId} className={cn("block text-sm font-medium text-text", labelHidden ? "sr-only" : "mb-1.5")}>
        {label}
      </label>
      {hiddenFields &&
        Object.entries(hiddenFields).map(([name, fieldValue]) => <input key={name} type="hidden" name={name} value={fieldValue} />)}
      <div className="relative">
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted [&_svg]:size-4.5">
          <Search />
        </span>
        <input
          id={inputId}
          type="search"
          name="q"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={expanded && active >= 0 ? optionId(active) : undefined}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
          maxLength={SEARCH_QUERY_MAX_LENGTH}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (suggestions.length > 0 && value.trim().length >= SUGGEST_MIN_LENGTH) setOpen(true);
          }}
          onBlur={close}
          className={cn(
            controlStyles,
            "w-full pl-10 [&::-webkit-search-cancel-button]:hidden",
            isHeader ? "min-h-11 py-2 pr-3" : "min-h-12 py-2.5 pr-28",
          )}
        />
        {!isHeader && (
          <button
            type="submit"
            className="absolute inset-y-1 right-1 inline-flex min-h-10 items-center rounded-control bg-primary px-4 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
          >
            Search
          </button>
        )}
      </div>

      <ul
        id={listboxId}
        role="listbox"
        aria-label="Suggestions"
        hidden={!expanded}
        className="absolute inset-x-0 top-full z-40 mt-1 max-h-[min(24rem,70dvh)] overflow-y-auto rounded-card border border-border bg-surface-raised py-1 shadow-md"
      >
        {suggestions.map((item, index) => (
          <li
            key={`${item.entityType}:${item.entityId}`}
            id={optionId(index)}
            role="option"
            aria-selected={index === active}
            // Keep focus in the field: the click below handles the choice.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              close();
              go(resultHref(item));
            }}
            onMouseMove={() => {
              if (active !== index) setActive(index);
            }}
            className="flex min-h-11 cursor-pointer items-start gap-3 px-3 py-2 text-sm aria-selected:bg-primary-soft"
          >
            <span className="mt-0.5 shrink-0 rounded-full bg-subtle px-2 py-px text-xs font-semibold text-muted">
              {ENTITY_TYPE_LABELS[item.entityType]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5 font-medium text-text">
                <span className="truncate">{item.title}</span>
                {item.accessTier === "PREMIUM" && (
                  <>
                    <Lock aria-hidden="true" className="size-3.5 shrink-0 text-muted" />
                    <span className="sr-only">(premium)</span>
                  </>
                )}
              </span>
              {item.subtitle && <span className="block truncate text-xs text-muted">{item.subtitle}</span>}
            </span>
          </li>
        ))}
      </ul>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </form>
  );
}
