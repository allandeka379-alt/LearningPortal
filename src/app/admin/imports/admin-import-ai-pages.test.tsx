import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/components/ui/Toast";
import { createAiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG } from "@/server/ai/config";
import { InMemoryUsageMeter } from "@/server/ai/meter";
import { FakeTransport } from "@/server/ai/testing/fake-transport";
import { runGenerationJob } from "@/server/cms/ai-drafts/jobs";
import { createGenerationJob } from "@/server/cms/ai-drafts/service";
import { uploadImport } from "@/server/cms/imports/service";
import { contentChain, staffActor } from "@/server/cms/review/testing";
import type { CmsActor } from "@/server/cms/users/access";
import { resetEnvCache } from "@/server/lib/env";
import { LocalDriver, setStorageDriver } from "@/server/lib/storage";
import { uniqueSuffix } from "../../../../tests/factories/index";

// The AI admin pages render only with AI switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Server-render smoke test of the import and AI-generation pages with real data (test database): each page module is
 * called the way Next.js calls it and rendered to HTML, so data wiring and rendering errors surface without a dev
 * server. Guards are mocked to the test's staff actor; services, database and templates are real. The two download
 * routes are called with a plain Request.
 */

const state = vi.hoisted(() => ({ actor: null as unknown }));

vi.mock("@/components/admin/guards", () => ({
  requireAdminPage: vi.fn(async () => state.actor),
  requireAdminAction: vi.fn(async () => state.actor),
  requireAdminStepUpAction: vi.fn(async () => state.actor),
}));
vi.mock("@/server/auth/guards", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/guards")>()),
  requireUserForApi: vi.fn(async () => ({ actor: state.actor, session: {}, via: "cookie" })),
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
let chain: Awaited<ReturnType<typeof contentChain>>;
let ids: { checked: string; done: string; job: string };

function html(element: ReactElement): string {
  return renderToStaticMarkup(<ToastProvider>{element}</ToastProvider>);
}

const params = <T,>(value: T) => Promise.resolve(value);
const encode = (text: string) => new TextEncoder().encode(text);

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(tmpdir(), "dz-import-pages-"));
  setStorageDriver(new LocalDriver(storageRoot));
  chain = await contentChain();
  editor = await staffActor();
  state.actor = { ...editor, displayName: "Editor", platformRoles: editor.roles, schoolRoles: [], studentOnboardingCompleted: null, timeZone: "Africa/Harare", sessionId: null, channel: "web" };
  const tag = uniqueSuffix();
  const base = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, sourceId: chain.source.id, rightsConfirmed: true };
  const checked = await uploadImport(
    editor,
    { bytes: encode(`front,back,colour\nOsmosis ${tag},Water movement,blue\n,Missing front,\n`), filename: "cards.csv" },
    { ...base, entityType: "FLASHCARD" },
  );
  const done = await uploadImport(editor, { bytes: encode(`type,stem,answer\nTRUE_FALSE,Zero is even ${tag}.,true\n`), filename: "questions.csv" }, { ...base, entityType: "QUESTION" });
  const { commitImport } = await import("@/server/cms/imports/service");
  await commitImport(editor, { id: done.id });

  const transport = new FakeTransport();
  const gateway = createAiGateway({ transport, config: DEFAULT_AI_CONFIG, meter: new InMemoryUsageMeter() });
  const job = await createGenerationJob(editor, { kind: "FLASHCARDS", subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicId: chain.topics[0]?.id, count: "2" }, {}, { isConfigured: () => true, gateway });
  transport.enqueue({
    text: JSON.stringify({
      flashcards: [
        { cardType: "DEFINITION", front: `Integer ${tag}`, back: "A whole number.", notes: null, topicRef: null },
        { cardType: "FACT", front: " ", back: "No front", notes: null, topicRef: null },
      ],
    }),
  });
  await runGenerationJob({ generationJobId: job.id }, undefined, { gateway });
  ids = { checked: checked.id, done: done.id, job: job.id };
});

afterAll(async () => {
  setStorageDriver(null);
  await rm(storageRoot, { recursive: true, force: true });
});

describe("import pages (server render)", () => {
  it("lists imports with templates and filters", async () => {
    const { default: List } = await import("./page");
    const page = html(await List({ searchParams: params({ mine: "1" }) }));
    expect(page).toContain("Templates");
    expect(page).toContain("/admin/imports/templates/question/template.csv");
    expect(page).toContain(`/admin/imports/${ids.checked}`);
    expect(page).toContain("cards.csv");
    expect(page).toContain("1 with errors");
  });

  it("walks the new-import wizard", async () => {
    const { default: New } = await import("./new/page");
    const step1 = html(await New({ searchParams: params({}) }));
    expect(step1).toContain("What are you importing?");
    const step2 = html(await New({ searchParams: params({ type: "QUESTION", subject: chain.subject.id }) }));
    expect(step2).toContain("Upload and check");
    expect(step2).toContain("Source and licence");
    expect(step2).toContain("This material is original or licensed for this use");
    const topics = html(await New({ searchParams: params({ type: "TOPIC", subject: chain.subject.id }) }));
    expect(topics).toContain("No draft syllabus version");
  });

  it("shows the dry-run report and the confirmed import step", async () => {
    const { default: Detail } = await import("./[id]/page");
    const page = html(await Detail({ params: params({ id: ids.checked }), searchParams: params({}) }));
    expect(page).toContain("Check report");
    expect(page).toContain("Row 3");
    expect(page).toContain("Import 1 row as drafts");
    expect(page).toContain("colour (ignored)");
    expect(page).toContain("Unverified until reviewed");
    const errors = html(await Detail({ params: params({ id: ids.checked }), searchParams: params({ show: "errors" }) }));
    expect(errors).not.toContain("is not part of the flashcard template");
    const done = html(await Detail({ params: params({ id: ids.done }), searchParams: params({}) }));
    expect(done).toContain("Drafts created");
    expect(done).toContain("/admin/questions/");
    await expect(Detail({ params: params({ id: "00000000-0000-7000-8000-000000000000" }), searchParams: params({}) })).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("serves templates and the report as downloads", async () => {
    const { GET: template } = await import("./templates/[entity]/[file]/route");
    const csv = await template(new Request("http://localhost/admin/imports/templates/flashcard/template.csv"), { params: params({ entity: "flashcard", file: "template.csv" }) });
    expect(csv.status).toBe(200);
    expect(csv.headers.get("content-disposition")).toContain("flashcards-import-template.csv");
    expect(await csv.text()).toContain("external_ref,front,back");
    const missing = await template(new Request("http://localhost/x"), { params: params({ entity: "flashcard", file: "secrets.txt" }) });
    expect(missing.status).toBe(404);

    const { GET: report } = await import("./[id]/report/route");
    const response = await report(new Request("http://localhost/x"), { params: params({ id: ids.checked }) });
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("row,field,severity,code,message");
  });
});

describe("AI generation pages (server render)", () => {
  it("lists jobs with today's real usage", async () => {
    const { default: List } = await import("../ai/page");
    const page = html(await List({ searchParams: params({ mine: "1" }) }));
    expect(page).toContain("AI content generation");
    expect(page).toContain(`/admin/ai/jobs/${ids.job}`);
    expect(page).toContain("Your generation runs today");
  });

  it("shows a job's drafts, rejections and metering", async () => {
    const { default: Job } = await import("../ai/jobs/[id]/page");
    const page = html(await Job({ params: params({ id: ids.job }) }));
    expect(page).toContain("Drafts created");
    expect(page).toContain("AI-generated");
    expect(page).toContain("Rejected items");
    expect(page).toContain("Item 2");
    expect(page).toContain("claude-opus-5-5");
    expect(page).toContain("/admin/review/flashcard/");
  });

  async function withApiKey<T>(key: string | undefined, fn: () => Promise<T>): Promise<T> {
    const previous = process.env.ANTHROPIC_API_KEY;
    if (key === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = key;
    resetEnvCache();
    try {
      return await fn();
    } finally {
      if (previous === undefined) delete process.env.ANTHROPIC_API_KEY;
      else process.env.ANTHROPIC_API_KEY = previous;
      resetEnvCache();
    }
  }

  it("explains that AI is not configured instead of offering a form", async () => {
    const { default: Generate } = await import("../ai/generate/page");
    const page = await withApiKey(undefined, async () => html(await Generate({ searchParams: params({ kind: "MCQ", subject: chain.subject.id }) })));
    expect(page).toContain("AI is not configured on this server");
    expect(page).not.toContain("Queue generation");
  });

  it("offers the generation wizard with scope, objectives and a cost estimate when configured", async () => {
    const { default: Generate } = await import("../ai/generate/page");
    const step1 = await withApiKey("test-key-not-used", async () => html(await Generate({ searchParams: params({}) })));
    expect(step1).toContain("What should AI draft?");
    const form = await withApiKey("test-key-not-used", async () =>
      html(await Generate({ searchParams: params({ kind: "QUESTIONS", subject: chain.subject.id, syllabus: chain.syllabus.id, topic: chain.subtopics[0]?.id }) })),
    );
    expect(form).toContain("Queue generation");
    expect(form).toContain("Estimated cost: about USD");
    expect(form).toContain("Question types");
    expect(form).toContain("Learning objectives (optional)");
    const hints = await withApiKey("test-key-not-used", async () => html(await Generate({ searchParams: params({ kind: "HINTS", subject: chain.subject.id, q: "Zero is even" }) })));
    expect(hints).toContain("Choose the question");
  });
});
