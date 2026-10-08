import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import type { CmsActor } from "@/server/cms/users/access";
import { createFlashcard } from "@/server/cms/flashcards/service";
import { createContentFlag } from "@/server/cms/flags/service";
import { uploadMedia } from "@/server/cms/media/service";
import { contentChain, readyLesson, staffActor, studentActor } from "@/server/cms/review/testing";
import { approveContent, publishContent, startEditingPublished, submitContent } from "@/server/cms/review/workflow";
import { LocalDriver } from "@/server/lib/storage";

/**
 * Server-render smoke test of every page in this area with real data (test database): each page module is called the
 * way Next.js calls it and its element tree is rendered to HTML, so data wiring, props and rendering errors surface
 * without a dev server. Guards are mocked to the test's staff actor; everything else is real.
 */

const state = vi.hoisted(() => ({ actor: null as unknown }));

vi.mock("@/components/admin/guards", () => ({
  requireAdminPage: vi.fn(async () => state.actor),
  requireAdminAction: vi.fn(async () => state.actor),
  requireAdminStepUpAction: vi.fn(async () => state.actor),
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  redirect: (to: string) => {
    throw new Error(`NEXT_REDIRECT ${to}`);
  },
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/admin",
}));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/admin/step-up-actions", () => ({ confirmPasswordAction: vi.fn() }));

let storageRoot: string;
let editor: CmsActor;
let ids: { draft: string; live: string; copy: string; card: string; media: string; flag: string };

function html(element: ReactElement): string {
  return renderToStaticMarkup(<ToastProvider>{element}</ToastProvider>);
}

const params = <T,>(value: T) => Promise.resolve(value);

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(tmpdir(), "dz-pages-"));
  const chain = await contentChain();
  const [author, reviewer, student] = await Promise.all([staffActor(), staffActor("ADMIN"), studentActor()]);
  editor = author;
  state.actor = { ...author, displayName: "Editor", platformRoles: author.roles, schoolRoles: [], studentOnboardingCompleted: null, timeZone: "Africa/Harare", sessionId: null, channel: "web" };

  const draft = await readyLesson(author, chain);
  const live = await readyLesson(author, chain);
  await submitContent(author, { entityType: "LESSON", id: live.id });
  await approveContent(reviewer, { entityType: "LESSON", id: live.id, notes: "" });
  await publishContent(reviewer, { entityType: "LESSON", id: live.id, changeNote: "First" });
  const copy = await startEditingPublished(author, { entityType: "LESSON", id: live.id });
  await submitContent(author, { entityType: "LESSON", id: copy.id });

  const card = await createFlashcard(author, {
    subjectId: chain.subject.id,
    cardType: "FORMULA",
    front: "Area of a circle",
    back: "$A = \\pi r^2$",
    topicIds: [chain.topics[0]?.id],
    primaryTopicId: chain.topics[0]?.id,
  });
  const bytes = new Uint8Array(await sharp({ create: { width: 30, height: 20, channels: 3, background: "#123456" } }).png().toBuffer());
  const media = await uploadMedia(author, { bytes }, { altText: "A test diagram" }, {}, { storage: new LocalDriver(storageRoot) });
  const flag = await createContentFlag(student, { entityType: "LESSON", entityId: live.id, reason: "TYPO_OR_FORMATTING", details: "Spelling in step 2." });
  ids = { draft: draft.id, live: live.id, copy: copy.id, card: card.id, media: media.id, flag: flag.id };
});

afterAll(async () => {
  await rm(storageRoot, { recursive: true, force: true });
});

describe("admin content pages (server render)", () => {
  it("lessons: list, new, draft editor, published read-only view and draft copy", async () => {
    const { default: List } = await import("../lessons/page");
    const list = html(await List({ searchParams: params({ authorId: editor.userId }) }));
    expect(list).toContain("Lessons");
    expect(list).toContain(`/admin/lessons/${ids.draft}`);

    const { default: New } = await import("../lessons/new/page");
    expect(html(await New())).toContain("Create draft");

    const { default: Editor } = await import("../lessons/[id]/page");
    const draft = html(await Editor({ params: params({ id: ids.draft }) }));
    expect(draft).toContain("Save draft");
    expect(draft).toContain("Submit for review");
    expect(draft).toContain("Lesson body");
    const live = html(await Editor({ params: params({ id: ids.live }) }));
    expect(live).toContain("Published lessons are not edited in place");
    expect(live).toContain("Open the draft copy");
    expect(live).toContain("1 open flag");
    const copy = html(await Editor({ params: params({ id: ids.copy }) }));
    expect(copy).toContain("Draft of a published lesson");
    await expect(Editor({ params: params({ id: "not-a-uuid" }) })).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("flashcards: list, new, bulk and editor", async () => {
    const { default: List } = await import("../flashcards/page");
    expect(html(await List({ searchParams: params({ authorId: editor.userId }) }))).toContain(`/admin/flashcards/${ids.card}`);
    const { default: New } = await import("../flashcards/new/page");
    expect(html(await New({ searchParams: params({}) }))).toContain("Front (prompt)");
    const { default: Bulk } = await import("../flashcards/bulk/page");
    expect(html(await Bulk())).toContain("Check paste");
    const { default: Editor } = await import("../flashcards/[id]/page");
    expect(html(await Editor({ params: params({ id: ids.card }) }))).toContain("Save draft");
  });

  it("media: library and file detail", async () => {
    const { default: List } = await import("../media/page");
    const list = html(await List({ searchParams: params({ q: "A test diagram" }) }));
    expect(list).toContain(`asset:${ids.media}`);
    const { default: Detail } = await import("../media/[id]/page");
    const detail = html(await Detail({ params: params({ id: ids.media }) }));
    expect(detail).toContain("Description (alt text)");
    expect(detail).toContain("Not used yet.");
  });

  it("review: queue, item with diff, revision history and one revision", async () => {
    const { default: Queue } = await import("./page");
    const queue = html(await Queue({ searchParams: params({ authored: "mine", type: "LESSON" }) }));
    expect(queue).toContain("Waiting for review");
    expect(queue).toContain(`/admin/review/lesson/${ids.copy}`);

    const { default: Item } = await import("./[type]/[id]/page");
    const item = html(await Item({ params: params({ type: "lesson", id: ids.copy }) }));
    expect(item).toContain("Changes since published revision 1");
    expect(item).toContain("Approve");
    expect(item).toContain("No content changes compared with the published revision.");
    await expect(Item({ params: params({ type: "syllabus", id: ids.copy }) })).rejects.toThrow("NEXT_NOT_FOUND");

    const { default: History } = await import("./[type]/[id]/revisions/page");
    expect(html(await History({ params: params({ type: "lesson", id: ids.live }) }))).toContain("Revision 1");
    const { default: Revision } = await import("./[type]/[id]/revisions/[revision]/page");
    expect(html(await Revision({ params: params({ type: "lesson", id: ids.live, revision: "1" }) }))).toContain("First published revision.");
  });

  it("flags: queue and detail (reporter by role only)", async () => {
    const { default: List } = await import("../flags/page");
    const list = html(await List({ searchParams: params({ entityType: "LESSON", entityId: ids.live }) }));
    expect(list).toContain("Typo or formatting");
    expect(list).toContain("Student");
    const { default: Detail } = await import("../flags/[id]/page");
    const detail = html(await Detail({ params: params({ id: ids.flag }) }));
    expect(detail).toContain("Spelling in step 2.");
    expect(detail).toContain("Pick up");
  });
});
