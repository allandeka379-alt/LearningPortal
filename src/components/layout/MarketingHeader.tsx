import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ActiveNavList } from "./ActiveNavList";
import { Container } from "./Container";
import { MobileNavSheet } from "./MobileNavSheet";
import type { NavLinkItem } from "./nav-types";

export interface MarketingHeaderProps {
  /** Primary site links (from the marketing nav config). */
  links: readonly NavLinkItem[];
  /** The one primary call to action, e.g. { href: "/register", label: "Start studying" }. */
  cta?: NavLinkItem;
  /** Secondary action, e.g. { href: "/login", label: "Log in" }. */
  secondaryCta?: NavLinkItem;
  homeHref?: string;
}

/**
 * Public site header: logo, inline links from `lg`, CTAs, and a menu sheet on smaller screens. Server component
 * (only active-link detection and the sheet are client-side).
 */
export function MarketingHeader({ links, cta, secondaryCta, homeHref = "/" }: MarketingHeaderProps) {
  const items = links.map((link) => ({ ...link, icon: null }));
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg pt-[env(safe-area-inset-top)]">
      <Container className="flex h-16 items-center gap-4">
        <Link href={homeHref} className="inline-flex min-h-11 shrink-0 items-center rounded-control">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
          <ActiveNavList items={items} variant="inline" />
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          {/* Responsive visibility lives on wrappers: cn() doesn't resolve display conflicts with the button's own classes. */}
          {secondaryCta && (
            <div className="hidden sm:block">
              <ButtonLink href={secondaryCta.href} variant="ghost">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          )}
          {cta && (
            <div className="hidden min-[400px]:block">
              <ButtonLink href={cta.href} variant="primary">
                {cta.label}
              </ButtonLink>
            </div>
          )}
          <div className="lg:hidden">
            <MobileNavSheet title="Menu" side="right">
              <nav aria-label="Main">
                <ActiveNavList items={items} variant="sidebar" />
              </nav>
              {(cta || secondaryCta) && (
                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
                  {cta && (
                    <ButtonLink href={cta.href} variant="primary" fullWidth>
                      {cta.label}
                    </ButtonLink>
                  )}
                  {secondaryCta && (
                    <ButtonLink href={secondaryCta.href} variant="outline" fullWidth>
                      {secondaryCta.label}
                    </ButtonLink>
                  )}
                </div>
              )}
            </MobileNavSheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
