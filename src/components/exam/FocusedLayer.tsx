"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Full-screen layer for exam mode (§13 "realistic interface"): covers the student area's chrome (sidebar, top bar and
 * the bottom tab bar) so only the exam is on screen, and makes that chrome `inert` while it is shown, so keyboard and
 * screen-reader users cannot wander into navigation that is visually hidden. Only the siblings of the enclosing
 * `<main>` (the app shell's navigation) are made inert; app-wide live regions such as the offline banner keep working.
 * Dialogs and sheets opened from inside the layer use the browser's top layer and stay usable.
 */
export function FocusedLayer({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = ref.current?.closest("main");
    const shell = main?.parentElement;
    if (!main || !shell) return;
    const madeInert: HTMLElement[] = [];
    for (const sibling of Array.from(shell.children)) {
      if (sibling === main || !(sibling instanceof HTMLElement) || sibling.hasAttribute("inert")) continue;
      sibling.setAttribute("inert", "");
      madeInert.push(sibling);
    }
    return () => {
      for (const element of madeInert) element.removeAttribute("inert");
    };
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      data-exam-scroll=""
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-bg text-text"
    >
      {children}
    </div>
  );
}
