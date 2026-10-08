import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import { loadActor, type Actor } from "@/server/auth/actor";
import { createCurriculumChain, createStudent } from "../../../../tests/factories/index";

/**
 * Smoke test of /app/settings: renders with real data and links to the family page (§21 parents and guardians) and the
 * notification settings. The guard, `next/link` and navigation hooks are mocked.
 */

let signedIn: Actor | null = null;

vi.mock("@/server/auth/guards", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/guards")>()),
  requireOnboardedStudent: async () => {
    if (!signedIn) throw new Error("not signed in");
    return signedIn;
  },
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/app/settings",
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));
vi.mock("@/app/(auth)/actions", () => ({ logoutAction: vi.fn() }));

describe("/app/settings", () => {
  it("links to parents and guardians and to notification settings", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, objectivesPerSubtopic: 0, lessonsPerTopic: 0 });
    const { user } = await createStudent({
      student: { onboardingCompleted: true, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id },
    });
    signedIn = await loadActor(user.id);
    const page = (await import("./page")).default as () => Promise<ReactElement>;
    const html = renderToStaticMarkup(<ToastProvider>{await page()}</ToastProvider>);
    expect(html).toContain('href="/app/family"');
    expect(html).toContain("Parents and guardians");
    expect(html).toContain('href="/app/notifications/settings"');
    // PRIV-02: the privacy rights the notice promises are reachable (a copy of your data, account deletion).
    expect(html).toContain("Your data");
    expect(html).toContain("Prepare a copy of my data");
    expect(html).toContain("Delete my account");
  });
});
