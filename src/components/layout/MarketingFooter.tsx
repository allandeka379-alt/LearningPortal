import Link from "next/link";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Logo } from "@/components/brand/Logo";
import { APP_NAME } from "@/lib/config";
import { Container } from "./Container";
import type { NavLinkItem } from "./nav-types";

export interface FooterColumn {
  title: string;
  links: readonly NavLinkItem[];
}

export interface MarketingFooterProps {
  columns: readonly FooterColumn[];
  /** Legal links in the bottom row (/legal/terms, /legal/privacy, …). */
  legalLinks?: readonly NavLinkItem[];
  /** Short line under the logo, from content config. No unverifiable claims. */
  tagline?: string;
  /** Copyright year; pass it from the page if it must be stable for caching. Defaults to the current year. */
  year?: number;
}

/** Public site footer with link columns, the chevron motif and legal links. Server component. */
export function MarketingFooter({ columns, legalLinks = [], tagline, year = new Date().getFullYear() }: MarketingFooterProps) {
  return (
    <footer className="mt-16 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]">
      <ChevronPattern variant="band" tone="primary" opacity={0.18} />
      <Container className="py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs space-y-3">
            <Logo />
            {tagline && <p className="text-sm text-muted">{tagline}</p>}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-semibold text-text">{column.title}</h2>
                <ul className="mt-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 min-w-11 items-center text-sm text-muted underline-offset-4 hover:text-text hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {APP_NAME}
          </p>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 min-w-11 items-center underline-offset-4 hover:text-text hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
