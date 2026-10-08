import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Sub-navigation between the commerce pages (§36 Subscriptions / Payments; ARCHITECTURE §3.3 "plans, prices,
 * subscriptions, promo codes, grants"). Plain links so each view keeps its own URL. Server component.
 */

const LINKS = [
  { href: "/admin/plans", label: "Plans & prices" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/promo-codes", label: "Promo codes" },
] as const;

export type CommerceSection = (typeof LINKS)[number]["href"];

export function CommerceNav({ current, className }: { current: CommerceSection; className?: string }) {
  return (
    <nav aria-label="Commerce sections" className={cn("mb-6", className)}>
      <ul className="flex flex-wrap gap-1 rounded-control bg-subtle p-1">
        {LINKS.map((link) => {
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
