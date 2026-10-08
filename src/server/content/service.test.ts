import { createHash, randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createCurriculumChain, createLessonForTopic } from "../../../tests/factories/index";
import { contentHash, PIPELINE_VERSION } from "./render";
import {
  getRenderedLesson,
  getRenderedLessonById,
  headingsFromRenderedHtml,
  isLessonRenderFresh,
  LESSON_RENDER_OPTIONS,
  loadAssetResolver,
  mediaSrc,
  renderFlashcardHtml,
  renderQuestionHtml,
} from "./service";

const BODY = [
  "## Factorising quadratics",
  "",
  "Solve $x^2 - 5x + 6 = 0$.",
  "",
  ":::exam-tip",
  "Show the factorised form.",
  ":::",
  "",
  "### Checking & answers",
  "",
  "Substitute back.",
].join("\n");

async function lessonWithBody(body: string) {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
  const topic = chain.topics[0];
  if (!topic) throw new Error("no topic");
  return (await createLessonForTopic({ subjectId: chain.subject.id, topicId: topic.id, body })).lesson;
}

describe("getRenderedLesson (write-time cache)", () => {
  it("renders, persists the cache on a published lesson and then serves it without rendering", async () => {
    const lesson = await lessonWithBody(BODY);
    expect(lesson.status).toBe("PUBLISHED");

    const first = await getRenderedLesson(lesson);
    expect(first.fromCache).toBe(false);
    expect(first.hasMath).toBe(true);
    expect(first.html).toContain('class="katex');
    expect(first.headings.map((h) => [h.text, h.depth])).toEqual([
      ["Factorising quadratics", 2],
      ["Checking & answers", 3],
    ]);

    const stored = await db.lesson.findUniqueOrThrow({ where: { id: lesson.id }, select: { id: true, body: true, bodyHtml: true, renderVersion: true, contentHash: true } });
    expect(stored).toMatchObject({ bodyHtml: first.html, renderVersion: PIPELINE_VERSION, contentHash: contentHash(BODY, LESSON_RENDER_OPTIONS) });
    expect(isLessonRenderFresh(stored)).toBe(true);

    const second = await getRenderedLesson(stored);
    expect(second.fromCache).toBe(true);
    expect(second.html).toBe(first.html);
    expect(second.headings).toEqual(first.headings);
    expect(second.hasMath).toBe(true);

    expect((await getRenderedLessonById(lesson.id))?.fromCache).toBe(true);
    expect(await getRenderedLessonById(randomUUID())).toBeNull();
  });

  it("re-renders when the stored hash or pipeline version is stale", async () => {
    const lesson = await lessonWithBody("Plain text, no maths.");
    await db.lesson.update({ where: { id: lesson.id }, data: { bodyHtml: "<p>old</p>", renderVersion: PIPELINE_VERSION - 1, contentHash: "0".repeat(64) } });
    const row = await db.lesson.findUniqueOrThrow({ where: { id: lesson.id }, select: { id: true, body: true, bodyHtml: true, renderVersion: true, contentHash: true } });
    expect(isLessonRenderFresh(row)).toBe(false);
    const rendered = await getRenderedLesson(row);
    expect(rendered).toMatchObject({ fromCache: false, hasMath: false });
    expect(rendered.html).toContain("Plain text, no maths.");
    expect((await db.lesson.findUniqueOrThrow({ where: { id: lesson.id } })).bodyHtml).toBe(rendered.html);
  });

  it("does not overwrite the cache when the body changed meanwhile", async () => {
    const lesson = await lessonWithBody("Original body.");
    const stale = { ...lesson, body: "A body that is no longer stored." };
    await getRenderedLesson(stale);
    expect((await db.lesson.findUniqueOrThrow({ where: { id: lesson.id } })).bodyHtml).toBeNull();
  });
});

describe("asset resolution", () => {
  it("resolves READY content media to /api/media URLs and ignores private or unknown assets", async () => {
    const checksum = createHash("sha256").update(randomUUID()).digest("hex");
    const asset = await db.mediaAsset.create({
      data: {
        storageKey: `content/2026/10/${randomUUID()}.png`,
        mimeType: "image/png",
        byteSize: 10,
        width: 640,
        height: 480,
        checksumSha256: checksum,
        altText: "A labelled test diagram",
        purpose: "DIAGRAM",
        visibility: "PUBLIC",
        status: "READY",
        copyrightStatus: "OWNED",
      },
    });
    const privateFile = await db.mediaAsset.create({
      data: { storageKey: `imports/2026/10/${randomUUID()}.csv`, mimeType: "text/csv", byteSize: 10, checksumSha256: checksum, purpose: "IMPORT_FILE", visibility: "PRIVATE", status: "READY" },
    });
    const missing = randomUUID();
    const resolve = await loadAssetResolver([`![Diagram](asset:${asset.id}) ![x](asset:${privateFile.id}) ![y](asset:${missing})`]);
    expect(resolve(asset.id)).toEqual({ src: mediaSrc(asset.storageKey), width: 640, height: 480, alt: "A labelled test diagram" });
    expect(resolve(privateFile.id)).toBeNull();
    expect(resolve(missing)).toBeNull();
  });
});

describe("question and flashcard render documents", () => {
  it("renders every markdown field into the renderedHtml shape read by toStudentView", () => {
    const doc = renderQuestionHtml({
      id: randomUUID(),
      type: "MATCHING",
      stem: "Match $x^2$ to its derivative.",
      explanation: "Use the power rule.",
      hints: ["Bring the power down."],
      payload: { left: [{ id: "l1", content: "$x^2$" }], right: [{ id: "r1", content: "$2x$" }] },
      options: [],
    });
    expect(doc.stem).toContain("katex");
    expect(doc.explanation).toContain("power rule");
    expect(doc.hints).toHaveLength(1);
    expect(Object.keys(doc.payload ?? {}).sort()).toEqual(["left:l1", "right:r1"]);
    expect(doc.options).toBeUndefined();

    const mcq = renderQuestionHtml({ id: randomUUID(), type: "MULTIPLE_CHOICE", stem: "Pick one.", options: [{ key: "A", content: "$\\frac{1}{2}$" }] });
    expect(mcq.options?.A).toContain("katex");
    expect(mcq.options?.A).not.toContain("<p>");

    const card = renderFlashcardHtml({ id: randomUUID(), front: "Area of a circle", back: "$A = \\pi r^2$" });
    expect(card.back).toContain("katex");
    expect(card).not.toHaveProperty("notes");
  });

  it("extracts headings from stored pipeline HTML, deferring to a re-render for maths in headings", () => {
    expect(headingsFromRenderedHtml('<h2 id="c-a">A &amp; B</h2><p>x</p><h3 id="c-b">Sub <em>part</em></h3>')).toEqual([
      { id: "c-a", text: "A & B", depth: 2 },
      { id: "c-b", text: "Sub part", depth: 3 },
    ]);
    expect(headingsFromRenderedHtml('<h2 id="c-m">Solve <span class="katex">…</span></h2>')).toBeNull();
  });
});
