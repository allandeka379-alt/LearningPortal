import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
import type { Role } from "@/generated/prisma/client";
import { ToastProvider } from "@/components/ui/Toast";
import { db } from "@/server/db";
import { createCurriculumChain, createUser, type CurriculumChain } from "../../../../tests/factories/index";

/**
 * Smoke tests of every curriculum admin page: each Server Component loads its real data (test database) and renders
 * to HTML for an admin and for a content editor. The session guard, `next/link` and `notFound()` are mocked.
 */

type TestActor = { kind: "user"; userId: string; roles: Role[]; displayName: string };
let currentActor: TestActor | null = null;

class NotFoundSignal extends Error {}

vi.mock("@/components/admin/guards", () => ({
  requireAdminPage: async () => {
    if (!currentActor) throw new Error("no actor");
    return currentActor;
  },
  requireAdminAction: async () => currentActor,
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
  usePathname: () => "/admin",
  notFound: () => {
    throw new NotFoundSignal("not found");
  },
  redirect: (to: string) => {
    throw new Error(`redirect ${to}`);
  },
}));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

type PageProps = { params: Promise<Record<string, string>>; searchParams: Promise<Record<string, string>> };
type PageComponent = (props: PageProps) => Promise<ReactElement> | ReactElement;
type PageModule = { default: unknown };

async function render(module: Promise<PageModule>, props: { params?: Record<string, string>; searchParams?: Record<string, string> } = {}): Promise<string> {
  const page = (await module).default as PageComponent;
  const element = await page({ params: Promise.resolve(props.params ?? {}), searchParams: Promise.resolve(props.searchParams ?? {}) });
  return renderToStaticMarkup(<ToastProvider>{element}</ToastProvider>);
}

let admin: TestActor;
let editor: TestActor;
let chain: CurriculumChain;
let draftId: string;
let sessionId: string;
let schemeId: string;
let countryId: string;

beforeAll(async () => {
  const [a, e] = await Promise.all([createUser({ roles: ["ADMIN"] }), createUser({ roles: ["CONTENT_EDITOR"] })]);
  admin = { kind: "user", userId: a.user.id, roles: ["ADMIN"], displayName: "Admin" };
  editor = { kind: "user", userId: e.user.id, roles: ["CONTENT_EDITOR"], displayName: "Editor" };
  chain = await createCurriculumChain({ objectivesPerSubtopic: 1 });
  countryId = chain.country.id;
  const { createSyllabusVersion, addComponent, addRoute, createExamSession, createGradeScheme } = await import("@/server/cms/curriculum");
  draftId = (
    await createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: `smoke-${randomUUID().slice(0, 6)}`, title: "Smoke", effectiveFrom: "2029-01-01", cloneFromId: chain.syllabus.id })
  ).id;
  const paper = await addComponent(editor, { syllabusId: draftId, code: "1", name: "Paper 1", kind: "WRITTEN", durationMinutes: "90" });
  await addRoute(editor, { syllabusId: draftId, code: "CORE", name: "Core", isDefault: "on", components: [{ componentId: paper.id, included: "on", isCompulsory: "on" }] });
  sessionId = (await createExamSession(editor, { qualificationId: chain.qualification.id, name: "November 2029", seriesCode: `S-${randomUUID().slice(0, 6)}`, year: "2029", startsOn: "2029-10-20", endsOn: "2029-11-30" })).id;
  schemeId = (
    await createGradeScheme(admin, {
      qualificationId: chain.qualification.id,
      name: `Smoke ${randomUUID().slice(0, 6)}`,
      disclaimer: "Estimate only.",
      isEstimate: "on",
      isActive: "on",
      bands: [
        { label: "A", minPercent: "70", isPass: "on" },
        { label: "U", minPercent: "0", isPass: "" },
      ],
    })
  ).id;
});

describe.each([
  ["admin", () => admin],
  ["content editor", () => editor],
])("curriculum admin pages as %s", (_label, actorOf) => {
  it("render the catalogue pages", async () => {
    currentActor = actorOf();
    expect(await render(import("../boards/page"))).toContain("Exam boards");
    expect(await render(import("../boards/[id]/page"), { params: { id: chain.examBoard.id } })).toContain("Country availability");
    expect(await render(import("../boards/countries/page"))).toContain("Countries");
    expect(await render(import("../boards/countries/[id]/page"), { params: { id: countryId } })).toContain("Settings");
    expect(await render(import("../qualifications/page"), { searchParams: { boardId: chain.examBoard.id } })).toContain(chain.qualification.name);
    expect(await render(import("../qualifications/[id]/page"), { params: { id: chain.qualification.id } })).toContain("Students on this track");
    expect(await render(import("../qualifications/levels/page"), { searchParams: { q: chain.level.name } })).toContain("Qualification levels");
    expect(await render(import("../qualifications/year-groups/page"), { searchParams: { countryId } })).toContain("Year groups");
    expect(await render(import("../subjects/page"), { searchParams: { qualificationId: chain.qualification.id } })).toContain(chain.subject.name);
    const subject = await render(import("../subjects/[id]/page"), { params: { id: chain.subject.id } });
    expect(subject).toContain("Syllabus versions");
    expect(subject).toContain("Verified");
    expect(await render(import("../subjects/categories/page"))).toContain("Subject categories");
  });

  it("render the syllabus, topic, session and grade scheme pages", async () => {
    currentActor = actorOf();
    expect(await render(import("./page"), { searchParams: { subjectId: chain.subject.id } })).toContain(chain.subject.name);
    const draft = await render(import("./[id]/page"), { params: { id: draftId } });
    expect(draft).toContain("Publish checklist");
    expect(draft).toContain("Paper 1");
    expect(draft).toContain("Carry content over");
    const published = await render(import("./[id]/page"), { params: { id: chain.syllabus.id } });
    expect(published).toContain("Published: the structure is frozen.");
    const tree = await render(import("./[id]/topics/page"), { params: { id: draftId } });
    expect(tree).toContain('role="tree"');
    expect(tree).toContain("Subtopic 1.1");
    expect(await render(import("./[id]/topics/page"), { params: { id: chain.syllabus.id } })).toContain("This version is published");
    expect(await render(import("./[id]/retag/page"), { params: { id: draftId } })).toContain("Tags to add now");
    expect(await render(import("./new/page"), { searchParams: { subjectId: chain.subject.id } })).toContain("Create draft version");
    expect(await render(import("./new/page"))).toContain("Find a subject");
    expect(await render(import("../topics/page"), { searchParams: { q: "Subtopic 1.1", syllabusId: chain.syllabus.id } })).toContain("Subtopic 1.1");
    expect(await render(import("../exam-sessions/page"), { searchParams: { qualificationId: chain.qualification.id } })).toContain("November 2029");
    expect(await render(import("../exam-sessions/[id]/page"), { params: { id: sessionId } })).toContain("Provisional dates");
    expect(await render(import("../exam-sessions/new/page"))).toContain("Create draft session");
    expect(await render(import("../grade-schemes/page"), { searchParams: { qualificationId: chain.qualification.id } })).toContain("Grade schemes");
    expect(await render(import("../grade-schemes/[id]/page"), { params: { id: schemeId } })).toContain("Estimate only.");
    expect(await render(import("../grade-schemes/new/page"))).toContain("Grade bands (best grade first)");
  });
});

describe("admin-only pages", () => {
  it("show forms to admins and read-only notices to editors", async () => {
    currentActor = admin;
    expect(await render(import("../boards/new/page"))).toContain("Create board");
    expect(await render(import("../subjects/[id]/page"), { params: { id: chain.subject.id } })).toContain("Save subject");
    currentActor = editor;
    await expect(render(import("../boards/new/page"))).rejects.toThrow(/redirect \/admin\/boards/);
    expect(await render(import("../subjects/[id]/page"), { params: { id: chain.subject.id } })).toContain("Changes to boards, qualifications and subjects are made by an admin");
  });

  it("returns the 404 page for unknown or malformed ids", async () => {
    currentActor = admin;
    await expect(render(import("./[id]/page"), { params: { id: "not-a-uuid" } })).rejects.toBeInstanceOf(NotFoundSignal);
    await expect(render(import("./[id]/page"), { params: { id: randomUUID() } })).rejects.toBeInstanceOf(NotFoundSignal);
    expect(await db.syllabus.count({ where: { id: draftId } })).toBe(1);
  });
});
