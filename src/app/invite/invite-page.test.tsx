import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import type { Actor } from "@/server/auth/actor";
import { latestDevMessage } from "@/server/messaging";
import { inviteSchoolMember } from "@/server/schools/invitations";
import { actorOf, schoolWithAdmin } from "@/server/schools/testing";
import { addStudentsToClass } from "@/server/teaching/invitations";
import { makeClass, makeTeacher } from "@/server/teaching/testing";
import { createStudent, uniqueEmail } from "../../../tests/factories/index";

// Every optional channel is OFF here, as by default (owner decision 2026-10-07): invitations, reset instructions and
// reminders are account email and go out anyway; nothing is ever texted while SMS is off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * /invite/[token] routing (§22, §23): class invitations (CLASS_MEMBER) continue on the student's class page; school
 * invitations keep the link as `next` through sign-in / registration; a user with a school-set password changes it
 * first. `getActor`, `redirect()` and `next/link` are mocked; invitations are created by the real services.
 */

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

let signedIn: Actor | null = null;

vi.mock("@/server/auth/actor", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/actor")>()),
  getActor: async () => signedIn,
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
  usePathname: () => "/invite",
  redirect: (to: string) => {
    throw new RedirectSignal(to);
  },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

async function render(token: string): Promise<string> {
  const page = (await import("./[token]/page")).default as (props: { params: Promise<{ token: string }> }) => Promise<ReactElement>;
  const element = await page({ params: Promise.resolve({ token }) });
  return renderToStaticMarkup(<ToastProvider>{element}</ToastProvider>);
}

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

function tokenFrom(email: string, pattern: RegExp): string {
  const token = latestDevMessage(email)?.text.match(pattern)?.[1];
  if (!token) throw new Error(`no invitation link sent to ${email}`);
  return token;
}

describe("/invite/[token]", () => {
  it("sends class invitations on to the student's class page, signed in or not", async () => {
    const { school } = await schoolWithAdmin();
    const teacher = await makeTeacher({ schoolId: school.id });
    const cls = await makeClass({ teacher, schoolId: school.id, subjectId: null, name: "Form 3 Gold" });
    const email = uniqueEmail("class-invitee");
    const { results } = await addStudentsToClass(teacher, { classId: cls.id, identifiers: email });
    expect(results[0]).toMatchObject({ outcome: "invited" });
    const token = tokenFrom(email, /\/app\/classes\/invite\/([A-Za-z0-9_-]+)/);

    signedIn = null;
    expect(await redirectOf(render(token))).toBe(`/app/classes/invite/${token}`);
    signedIn = await actorOf((await createStudent()).user.id);
    expect(await redirectOf(render(token))).toBe(`/app/classes/invite/${token}`);
  });

  it("keeps the link as next for students who must sign in or register, and after a forced password change", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const email = uniqueEmail("school-invitee");
    await inviteSchoolMember(adminActor!, { schoolId: school.id, contact: email, role: "STUDENT" });
    const token = tokenFrom(email, /\/invite\/([A-Za-z0-9_-]+)/);
    const next = encodeURIComponent(`/invite/${token}`);

    signedIn = null;
    const html = await render(token);
    expect(html).toContain(`/login?next=${next}`);
    expect(html).toContain(`/register?role=STUDENT&amp;next=${next}`);

    const student = await actorOf((await createStudent()).user.id);
    signedIn = { ...student, passwordMustChange: true };
    expect(await redirectOf(render(token))).toBe(`/change-password?next=${next}`);
    signedIn = student;
    expect(await render(token)).toContain("Accept invitation");
  });
});
