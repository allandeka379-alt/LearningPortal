import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";

// Invitation links carry a secret token: never indexed, never shared with other sites.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

/** Shell of the invitation pages (/invite, /invite/[token]): logo home link and one centred column. */
export default function InviteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="pt-[env(safe-area-inset-top)]">
        <Container size="reading" className="flex h-16 items-center">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-control">
            <Logo />
          </Link>
        </Container>
      </header>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex flex-1 justify-center px-4 pt-2 pb-12 sm:items-center sm:pt-0">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
