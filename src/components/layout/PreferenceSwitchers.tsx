"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useId, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  FONT_SCALES,
  FONT_SCALE_COOKIE,
  FONT_SCALE_LABELS,
  THEME_COLORS,
  THEME_COOKIE,
  THEME_LABELS,
  THEME_PREFERENCES,
  parseFontScale,
  parseThemePreference,
  serializePreferenceCookie,
  type FontScale,
  type ThemePreference,
} from "./preferences";

type PreferenceAttribute = "data-theme" | "data-font-scale";

function subscribeTo(attribute: PreferenceAttribute) {
  return (onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: [attribute] });
    return () => observer.disconnect();
  };
}
const subscribeTheme = subscribeTo("data-theme");
const subscribeFontScale = subscribeTo("data-font-scale");
const readTheme = () => parseThemePreference(document.documentElement.getAttribute("data-theme"));
const readFontScale = () => parseFontScale(document.documentElement.getAttribute("data-font-scale"));
// During SSR/hydration nothing is selected; the real value appears right after hydration (no mismatch warning).
const serverSnapshot = () => null;

function persist(cookieName: string, value: string) {
  document.cookie = serializePreferenceCookie(cookieName, value, window.location.protocol === "https:");
}

/**
 * Keeps the browser UI colour in sync without adding/removing <meta> nodes (they are owned by Next's metadata):
 * an explicit theme sets every theme-color meta; "system" restores media-matched values.
 */
function syncThemeColor(theme: ThemePreference) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    const media = meta.getAttribute("media") ?? "";
    const dark =
      theme === "dark" || (theme === "system" && (media ? media.includes("dark") : prefersDark));
    meta.content = dark ? THEME_COLORS.dark : THEME_COLORS.light;
  }
}

/** Applies a theme immediately (attribute on <html>) and remembers it in the `dz_theme` cookie. */
export function applyTheme(theme: ThemePreference) {
  document.documentElement.setAttribute("data-theme", theme);
  persist(THEME_COOKIE, theme);
  syncThemeColor(theme);
}

/** Applies a font scale immediately and remembers it in the `dz_font_scale` cookie. */
export function applyFontScale(scale: FontScale) {
  document.documentElement.setAttribute("data-font-scale", scale);
  persist(FONT_SCALE_COOKIE, scale);
}

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

function Segmented<T extends string>({
  legend,
  options,
  value,
  onChange,
  className,
}: {
  legend: string;
  options: readonly SegmentedOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  className?: string;
}) {
  const name = useId();
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-1.5 text-sm font-medium text-text">{legend}</legend>
      <div className="inline-flex max-w-full flex-wrap gap-1 rounded-control bg-subtle p-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="inline-flex min-h-11 cursor-pointer lg:min-h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted transition-colors hover:text-text has-checked:bg-surface has-checked:text-text has-checked:shadow-xs has-focus-visible:outline-2 has-focus-visible:outline-offset-1 has-focus-visible:outline-focus [&_svg]:size-4"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.icon}
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const THEME_ICONS: Record<ThemePreference, ReactNode> = {
  system: <Monitor aria-hidden="true" />,
  light: <Sun aria-hidden="true" />,
  dark: <Moon aria-hidden="true" />,
};

export interface PreferenceSwitcherProps {
  className?: string;
  /** Called after the preference is applied (e.g. to also save it to the user's profile). */
  onChange?: (value: string) => void;
}

/** System / Light / Dark switch. Applies instantly, persists in a cookie the root layout reads on the server. */
export function ThemeSwitcher({ className, onChange }: PreferenceSwitcherProps) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverSnapshot);
  return (
    <Segmented
      legend="Theme"
      className={className}
      value={theme}
      options={THEME_PREFERENCES.map((value) => ({ value, label: THEME_LABELS[value], icon: THEME_ICONS[value] }))}
      onChange={(value) => {
        applyTheme(value);
        onChange?.(value);
      }}
    />
  );
}

/** Text size switch (§43): scales the root font size; every size in the UI is in rem. */
export function FontScaleSwitcher({ className, onChange }: PreferenceSwitcherProps) {
  const scale = useSyncExternalStore(subscribeFontScale, readFontScale, serverSnapshot);
  return (
    <Segmented
      legend="Text size"
      className={className}
      value={scale}
      options={FONT_SCALES.map((value) => ({ value, label: FONT_SCALE_LABELS[value] }))}
      onChange={(value) => {
        applyFontScale(value);
        onChange?.(value);
      }}
    />
  );
}
