"use client";

import { createContext, use, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type TabsVariant = "underline" | "pills";

interface TabsContextValue {
  baseId: string;
  value: string;
  variant: TabsVariant;
  select: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string): TabsContextValue {
  const context = use(TabsContext);
  if (!context) throw new Error(`<${component}> must be used inside <Tabs>.`);
  return context;
}

const safe = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "_");
const tabId = (baseId: string, value: string) => `${baseId}-tab-${safe(value)}`;
const panelId = (baseId: string, value: string) => `${baseId}-panel-${safe(value)}`;

type TabsProps = {
  children: ReactNode;
  className?: string;
  /** `underline` for page sections; `pills` for compact segmented switches ("This week / This month"). */
  variant?: TabsVariant;
} & (
  | { value: string; onValueChange: (value: string) => void; defaultValue?: never }
  | { defaultValue: string; value?: undefined; onValueChange?: (value: string) => void }
);

/**
 * Accessible tabs (WAI-ARIA tabs pattern, automatic activation): roving tabindex, ←/→ to move, Home/End to jump.
 * Panels stay mounted (hidden) so server-rendered panel content is in the initial HTML.
 *
 * Use links (not tabs) when each view deserves its own URL.
 */
export function Tabs({ children, className, variant = "underline", ...state }: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(state.defaultValue ?? "");
  const value = state.value ?? internal;
  const select = (next: string) => {
    if (state.value === undefined) setInternal(next);
    state.onValueChange?.(next);
  };
  return (
    <TabsContext value={{ baseId, value, variant, select }}>
      <div className={className}>{children}</div>
    </TabsContext>
  );
}

export interface TabListProps {
  /** Accessible name for the tab list, e.g. "Subject views". */
  "aria-label": string;
  children: ReactNode;
  className?: string;
}

export function TabList({ children, className, ...props }: TabListProps) {
  const { variant } = useTabs("TabList");

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const index = tabs.indexOf(event.target as HTMLButtonElement);
    if (index === -1) return;
    const target =
      event.key === "ArrowRight"
        ? tabs[(index + 1) % tabs.length]
        : event.key === "ArrowLeft"
          ? tabs[(index - 1 + tabs.length) % tabs.length]
          : event.key === "Home"
            ? tabs[0]
            : event.key === "End"
              ? tabs[tabs.length - 1]
              : undefined;
    if (!target) return;
    event.preventDefault();
    target.focus();
    target.click();
  };

  return (
    <div
      role="tablist"
      aria-label={props["aria-label"]}
      onKeyDown={onKeyDown}
      className={cn(
        "no-scrollbar relative flex overflow-x-auto",
        variant === "underline" ? "gap-1 border-b border-border" : "gap-1 rounded-control bg-subtle p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Tab({ value, children, disabled, className }: TabProps) {
  const { baseId, value: current, variant, select } = useTabs("Tab");
  const selected = current === value;
  return (
    <button
      type="button"
      role="tab"
      id={tabId(baseId, value)}
      aria-selected={selected}
      aria-controls={panelId(baseId, value)}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => select(value)}
      className={cn(
        "relative inline-flex shrink-0 items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4",
        variant === "underline"
          ? "min-h-11 px-3 text-muted hover:text-text aria-selected:text-text after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full aria-selected:after:bg-primary"
          : "min-h-11 flex-1 justify-center rounded-md px-3 lg:pointer-fine:min-h-9 text-muted hover:text-text aria-selected:bg-surface aria-selected:text-text aria-selected:shadow-xs",
        className,
      )}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { baseId, value: current } = useTabs("TabPanel");
  return (
    <div
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={tabId(baseId, value)}
      hidden={current !== value}
      tabIndex={0}
      className={cn("pt-4 focus-visible:outline-offset-4", className)}
    >
      {children}
    </div>
  );
}
