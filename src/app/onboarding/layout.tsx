import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { requireOnboardingStudent } from "./_lib/guard";

// Private, per-student pages: never indexed. Pages set their own title (the root template adds the brand).
export const metadata: Metadata = {
  title: "Set up your account",
  robots: { index: false, follow: false },
};

/**
 * Shell of the onboarding wizard (§5, ARCHITECTURE §3.3): logo, "Sign out" and one centred reading column, designed at
 * 360px first. No app navigation until the student is set up. Each page also runs the guard (layouts and pages render
 * concurrently). Dynamic, never cached (ARCHITECTURE §3.4 "Auth, onboarding").
 */
export default async function OnboardingLayout({ children }: { children: ReactNode }) {
  await requireOnboardingStudent();
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="border-b border-border bg-surface pt-[env(safe-area-inset-top)]">
        <Container size="reading" className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-control">
            <Logo />
          </Link>
          <LogoutButton variant="ghost" />
        </Container>
      </header>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 pt-6 pb-12 sm:pt-10">
        {children}
      </main>
    </div>
  );
}
