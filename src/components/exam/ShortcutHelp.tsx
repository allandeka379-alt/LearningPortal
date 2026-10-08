import { ChevronDown, Keyboard } from "lucide-react";
import { Kbd } from "@/components/ui/Kbd";
import { EXAM_SHORTCUTS } from "./keyboard";

/**
 * Documents the exam keyboard shortcuts (§43 keyboard operation). Collapsed by default; works without JavaScript.
 * Shortcuts never fire while typing in an answer box.
 */
export function ShortcutHelp({ allowNavigation = true }: { allowNavigation?: boolean }) {
  const shortcuts = allowNavigation ? EXAM_SHORTCUTS : EXAM_SHORTCUTS.filter((s) => s.action === "next");
  return (
    <details className="group/keys rounded-card border border-border bg-surface">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-2 text-sm font-semibold text-text [&::-webkit-details-marker]:hidden">
        <Keyboard aria-hidden="true" className="size-4 text-muted" />
        Keyboard shortcuts
        <ChevronDown aria-hidden="true" className="ml-auto size-4 text-muted transition-transform motion-reduce:transition-none group-open/keys:rotate-180" />
      </summary>
      <div className="space-y-2 border-t border-border px-4 py-3 text-sm">
        <dl className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="contents">
              <dt>
                <Kbd>{shortcut.key}</Kbd>
              </dt>
              <dd className="text-text">{shortcut.description}</dd>
            </div>
          ))}
        </dl>
        <p className="text-muted">Shortcuts don&apos;t work while you are typing in an answer box. Press Tab to move between answer options.</p>
      </div>
    </details>
  );
}
