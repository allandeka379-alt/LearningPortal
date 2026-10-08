import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Sub-navigation of the AI operations pages (§36 AI; ARCHITECTURE §3.3 `/admin/ai`: usage, spend, routing, quotas,
 * kill switch). "Content generation" is the /admin/ai area itself. Plain links. Server component.
 */

const LINKS = [
  { href: "/admin/ai/usage", label: "Usage & spend" },
  { href: "/admin/ai/settings", label: "Settings" },
  { href: "/admin/ai", label: "Content generation" },
] as const;

export function AiNav({ current, showGeneration = true, className }: { current: (typeof LINKS)[number]["href"]; showGeneration?: boolean; className?: string }) {
  const links = showGeneration ? LINKS : LINKS.filter((link) => link.href !== "/admin/ai");
  return (
    <nav aria-label="AI sections" className={cn("mb-6", className)}>
      <ul className="flex flex-wrap gap-1 rounded-control bg-subtle p-1">
        {links.map((link) => {
          const active = link.href === current;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:bg-surface hover:text-text lg:min-h-9",
                  active && "bg-surface text-text shadow-xs",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
