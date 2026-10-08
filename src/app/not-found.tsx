import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Site-wide 404 for URLs outside every area layout. It renders inside the root layout only, so it brings its own
 * minimal chrome: a header with the home link and the `<main id="main-content">` landmark that the root layout's
 * "Skip to content" link targets (§43). Area-specific 404s (student area, public curriculum, admin) take precedence.
 */
export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="pt-[env(safe-area-inset-top)]">
        <Container size="reading" className="flex h-16 items-center">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-control">
            <Logo />
          </Link>
        </Container>
      </header>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1">
        <Container size="reading" className="py-16 sm:py-24">
          <p className="text-sm font-semibold text-primary">Page not found</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">We couldn&apos;t find that page</h1>
          <p className="mt-3 text-muted">The page may have moved, or the link may be mistyped.</p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <ButtonLink href="/">Go to the home page</ButtonLink>
            <ButtonLink href="/login" variant="outline">
              Sign in
            </ButtonLink>
          </div>
        </Container>
      </main>
    </div>
  );
}
