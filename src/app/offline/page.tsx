import { CloudOff } from "lucide-react";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { SavedLessonsList } from "@/components/pwa/SavedLessonsList";
import { TryAgainButton } from "@/components/pwa/TryAgainButton";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

/**
 * Offline page (§29, docs/OFFLINE.md). The service worker precaches it at install and shows it for any page that
 * cannot be loaded without a connection. Static: nothing personal is rendered on the server, so the cached copy is
 * safe to show to whoever holds the phone; the saved-lesson list is read from this device's Cache Storage on the
 * client.
 */
export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="pt-[env(safe-area-inset-top)]">
        <Container size="reading" className="flex h-16 items-center">
          <Logo />
        </Container>
      </header>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 pb-[calc(3rem+env(safe-area-inset-bottom))]">
        <Container size="reading" className="space-y-10 pt-6 sm:pt-10">
          <section aria-labelledby="offline-title" className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
              <CloudOff aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h1 id="offline-title" className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                You’re offline
              </h1>
              <p className="max-w-prose text-base text-muted">
                This page needs an internet connection. Lessons you opened recently are saved on this device, so you
                can keep reading them.
              </p>
            </div>
            <TryAgainButton />
          </section>

          <section aria-labelledby="saved-title" className="space-y-3">
            <h2 id="saved-title" className="text-lg font-semibold text-text">
              Works offline: your saved lessons
            </h2>
            <SavedLessonsList />
          </section>

          <section aria-labelledby="online-only-title" className="space-y-3">
            <h2 id="online-only-title" className="text-lg font-semibold text-text">
              Needs a connection
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted marker:text-border-strong">
              <li>Practice questions, tests and mock exams</li>
              <li>Search and lessons you have not opened yet</li>
              <li>Signing in, payments and account settings</li>
            </ul>
          </section>
        </Container>
      </main>
    </div>
  );
}
