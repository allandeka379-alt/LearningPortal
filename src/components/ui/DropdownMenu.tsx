"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { buttonStyles } from "./button-styles";

const ITEM_SELECTOR = '[role="menuitem"]:not(:disabled):not([aria-disabled="true"])';

export interface DropdownMenuProps {
  /** Content of the trigger button: text, an avatar, an icon. */
  trigger: ReactNode;
  /** Accessible name for the trigger when its content isn't descriptive text (e.g. "Account menu"). */
  triggerLabel?: string;
  /** Classes for the trigger. Defaults to a ghost button. */
  triggerClassName?: string;
  /** Edge of the trigger the menu aligns to. Use `end` for menus near the right edge (avatar menus). */
  align?: "start" | "end";
  /** `DropdownMenuItem`, `DropdownMenuFormItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`. */
  children: ReactNode;
  className?: string;
}

/**
 * Menu button (WAI-ARIA menu button pattern): Enter/Space/↓ open and focus the first item, ↑ the last; ↑/↓,
 * Home/End move; typing a letter jumps to the matching item; Escape closes and returns focus to the trigger;
 * Tab or clicking outside closes. Items are discovered from the DOM, so they can be rendered by Server Components.
 * The menu stays mounted (hidden) so form items keep working while it closes.
 */
export function DropdownMenu({ trigger, triggerLabel, triggerClassName, align = "start", children, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const focusOnOpen = useRef<"first" | "last">("first");
  const triggerId = useId();
  const menuId = useId();

  const items = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []);

  useEffect(() => {
    if (!open) return;
    const list = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []);
    (focusOnOpen.current === "last" ? list[list.length - 1] : list[0])?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openMenu = (focus: "first" | "last") => {
    focusOnOpen.current = focus;
    setOpen(true);
  };

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(event.key === "ArrowUp" ? "last" : "first");
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLElement);
    let next: HTMLElement | undefined;
    switch (event.key) {
      case "ArrowDown":
        next = list[(index + 1) % list.length];
        break;
      case "ArrowUp":
        next = list[(index - 1 + list.length) % list.length];
        break;
      case "Home":
        next = list[0];
        break;
      case "End":
        next = list[list.length - 1];
        break;
      case "Escape":
        event.preventDefault();
        close(true);
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        if (event.key.length === 1 && /\S/.test(event.key)) {
          const key = event.key.toLowerCase();
          const ordered = [...list.slice(index + 1), ...list.slice(0, index + 1)];
          next = ordered.find((item) => item.textContent?.trim().toLowerCase().startsWith(key));
        }
    }
    if (next) {
      event.preventDefault();
      next.focus();
    }
  };

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={triggerLabel}
        onClick={() => (open ? close(false) : openMenu("first"))}
        onKeyDown={onTriggerKeyDown}
        className={triggerClassName ?? buttonStyles({ variant: "ghost" })}
      >
        {trigger}
      </button>
      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest('[role="menuitem"]')) close(true);
        }}
        className={cn(
          "absolute z-40 mt-2 w-max max-w-[calc(100vw-2rem)] min-w-52 animate-fade-in rounded-card border border-border bg-surface-raised p-1 shadow-lg",
          align === "end" ? "right-0" : "left-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

const ITEM_CLASS =
  "flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors hover:bg-subtle focus:bg-subtle focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const TONE = { default: "text-text [&_svg]:text-muted", danger: "text-danger-text" } as const;

export interface DropdownMenuItemProps {
  children: ReactNode;
  /** Navigates (rendered as a link). */
  href?: string;
  /** Runs on activation (client components only). */
  onSelect?: () => void;
  icon?: ReactNode;
  tone?: keyof typeof TONE;
  disabled?: boolean;
}

export function DropdownMenuItem({ children, href, onSelect, icon, tone = "default", disabled }: DropdownMenuItemProps) {
  if (href && !disabled) {
    return (
      <Link role="menuitem" tabIndex={-1} href={href} className={cn(ITEM_CLASS, TONE[tone])}>
        {icon}
        {children}
      </Link>
    );
  }
  return (
    <button
      role="menuitem"
      tabIndex={-1}
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(ITEM_CLASS, TONE[tone])}
    >
      {icon}
      {children}
    </button>
  );
}

export interface DropdownMenuFormItemProps {
  children: ReactNode;
  /** A Server Action (e.g. sign out). Server Actions can be passed from Server Components. */
  action: (formData: FormData) => void | Promise<void>;
  /** Hidden fields submitted with the action. */
  fields?: Readonly<Record<string, string>>;
  icon?: ReactNode;
  tone?: keyof typeof TONE;
}

/** Menu item that submits a form to a Server Action — works without client-side callbacks. */
export function DropdownMenuFormItem({ children, action, fields, icon, tone = "default" }: DropdownMenuFormItemProps) {
  return (
    <form action={action} role="none">
      {fields && Object.entries(fields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      <button role="menuitem" tabIndex={-1} type="submit" className={cn(ITEM_CLASS, TONE[tone])}>
        {icon}
        {children}
      </button>
    </form>
  );
}

export function DropdownMenuSeparator() {
  return <div role="separator" className="-mx-1 my-1 h-px bg-border" />;
}

/** Non-interactive heading inside a menu (e.g. the signed-in user's name). */
export function DropdownMenuLabel({ children }: { children: ReactNode }) {
  return (
    <div role="presentation" className="px-3 pt-2 pb-1 text-xs font-semibold text-muted">
      {children}
    </div>
  );
}
