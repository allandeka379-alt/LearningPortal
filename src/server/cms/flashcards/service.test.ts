import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { auditRowsFor, auditTrail, clearedProvenance, contentChain, staffActor, studentActor, teacherActor } from "../review/testing";
import { approveContent, publishContent, startEditingPublished, submitContent } from "../review/workflow";
import { bulkCreateFlashcards, createFlashcard, getFlashcardEditor, listFlashcards, saveFlashcard } from "./service";

/** Integration tests for platform flashcard authoring: single cards, workflow, bulk paste, list filters. */

type Chain = Awaited<ReturnType<typeof contentChain>>;

function cardInput(chain: Chain, overrides: Record<string, unknown> = {}) {
  const topic = chain.topics[0];
  return {
    subjectId: chain.subject.id,
    cardType: "FORMULA",
    front: "Area of a circle",
    back: "$A = \\pi r^2$",
    notes: "",
    topicIds: [topic?.id],
    primaryTopicId: topic?.id,
    ...clearedProvenance(chain),
    ...overrides,
  };
}

describe("flashcard authoring", () => {
  it("creates a rendered draft card, saves it, and takes it through review and a publish merge", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const { id } = await createFlashcard(editor, cardInput(chain));
    const created = await db.flashcard.findUniqueOrThrow({ where: { id }, include: { topics: true } });
    expect(created).toMatchObject({ status: "DRAFT", ownerUserId: null, createdById: editor.userId, cardType: "FORMULA" });
    expect(JSON.stringify(created.renderedHtml)).toContain("katex");
    expect(created.topics).toEqual([expect.objectContaining({ topicId: chain.topics[0]?.id, isPrimary: true })]);

    const saved = await saveFlashcard(editor, { id, expectedUpdatedAt: created.updatedAt.toISOString(), ...cardInput(chain, { back: "$A = \\pi r^{2}$", notes: "Radius squared." }) });
    expect(saved.changed).toEqual(expect.arrayContaining(["back", "notes"]));

    await submitContent(editor, { entityType: "FLASHCARD", id });
    await approveContent(reviewer, { entityType: "FLASHCARD", id, notes: "" });
    await publishContent(reviewer, { entityType: "FLASHCARD", id });
    expect((await db.flashcard.findUniqueOrThrow({ where: { id } })).status).toBe("PUBLISHED");
    expect(await db.job.count({ where: { type: "search.reindexEntity", dedupeKey: `search:FLASHCARD:${id}` } })).toBeGreaterThanOrEqual(1);

    const copy = await startEditingPublished(editor, { entityType: "FLASHCARD", id });
    await saveFlashcard(editor, { id: copy.id, ...cardInput(chain, { front: "Area of a circle of radius r" }) });
    await submitContent(editor, { entityType: "FLASHCARD", id: copy.id });
    await approveContent(reviewer, { entityType: "FLASHCARD", id: copy.id, notes: "" });
    await expect(publishContent(reviewer, { entityType: "FLASHCARD", id: copy.id })).resolves.toMatchObject({ id, revision: 2 });
    expect((await db.flashcard.findUniqueOrThrow({ where: { id } })).front).toBe("Area of a circle of radius r");
    expect(await auditTrail(id)).toEqual(expect.arrayContaining(["content.create", "content.update", "content.submit", "content.publish"]));

    const editorData = await getFlashcardEditor(editor, id);
    expect(editorData).toMatchObject({ status: "PUBLISHED", editable: false, revision: 2, publishedRevision: 2 });
  });

  it("validates card input and requires licensing and a primary topic before review", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    await expect(createFlashcard(editor, cardInput(chain, { front: " " }))).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createFlashcard(editor, cardInput(chain, { cardType: "RIDDLE" }))).rejects.toMatchObject({ code: "VALIDATION" });
    const { id } = await createFlashcard(editor, cardInput(chain, { copyrightStatus: "UNVERIFIED", topicIds: [], primaryTopicId: "" }));
    try {
      await submitContent(editor, { entityType: "FLASHCARD", id });
      throw new Error("expected VALIDATION");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("VALIDATION");
      if (isAppError(error)) expect(Object.keys(error.fieldErrors ?? {})).toEqual(expect.arrayContaining(["copyrightStatus", "topicIds"]));
    }
  });

  it("bulk-creates drafts from a pasted 2-column block after a preview", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const text = "Front\tBack\nOsmosis\tMovement of water across a partially permeable membrane\n\"Speed\"\t$v = \\frac{d}{t}$\tDistance over time\n";
    const shared = { subjectId: chain.subject.id, cardType: "DEFINITION", primaryTopicId: chain.topics[1]?.id, ...clearedProvenance(chain) };

    const preview = await bulkCreateFlashcards(editor, { ...shared, text, intent: "preview" });
    expect(preview).toMatchObject({ intent: "preview", total: 2, problems: [] });
    if (preview.intent !== "preview") throw new Error("expected a preview");
    expect(String(preview.cards[1]?.back)).toContain("katex");
    expect(await db.flashcard.count({ where: { subjectId: chain.subject.id } })).toBe(0);

    const created = await bulkCreateFlashcards(editor, { ...shared, text, intent: "create" });
    if (created.intent !== "create") throw new Error("expected a create result");
    expect(created.created).toBe(2);
    const cards = await db.flashcard.findMany({ where: { id: { in: created.ids } }, include: { topics: true } });
    cards.sort((x, y) => created.ids.indexOf(x.id) - created.ids.indexOf(y.id));
    expect(cards.map((c) => [c.front, c.notes, c.status, c.createdById])).toEqual([
      ["Osmosis", null, "DRAFT", editor.userId],
      ["Speed", "Distance over time", "DRAFT", editor.userId],
    ]);
    expect(cards.every((c) => c.topics[0]?.topicId === chain.topics[1]?.id && c.topics[0]?.isPrimary)).toBe(true);
    expect(cards.every((c) => c.renderedHtml !== null)).toBe(true);
    const audit = (await auditRowsFor(created.ids[0] ?? "")).map((row) => row.metadata as { operation?: string; count?: number });
    expect(audit).toEqual([expect.objectContaining({ operation: "content.bulk_create", count: 2 })]);

    // A bad row blocks the whole batch, with the row number.
    const bad = "Good\tCard\nOnly one column\n";
    const report = await bulkCreateFlashcards(editor, { ...shared, text: bad, intent: "preview" });
    expect(report).toMatchObject({ intent: "preview", total: 1, problems: [expect.objectContaining({ row: 2 })] });
    try {
      await bulkCreateFlashcards(editor, { ...shared, text: bad, intent: "create" });
      throw new Error("expected VALIDATION");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("VALIDATION");
      if (isAppError(error)) expect(error.fieldErrors?.text?.[0]).toContain("Row 2");
    }
  });

  it("lists live platform cards with filters and is staff-only", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const a = await createFlashcard(editor, cardInput(chain, { front: "Photosynthesis", cardType: "DEFINITION" }));
    const b = await createFlashcard(editor, cardInput(chain, { front: "Speed of light", cardType: "FACT" }));
    const all = await listFlashcards(editor, { subjectId: chain.subject.id });
    expect(all.items.map((c) => c.id).sort()).toEqual([a.id, b.id].sort());
    expect((await listFlashcards(editor, { subjectId: chain.subject.id, cardType: "FACT" })).items.map((c) => c.id)).toEqual([b.id]);
    expect((await listFlashcards(editor, { subjectId: chain.subject.id, q: "photo" })).items.map((c) => c.id)).toEqual([a.id]);
    const [teacher, student] = await Promise.all([teacherActor(), studentActor()]);
    await expect(listFlashcards(teacher, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createFlashcard(student, cardInput(chain))).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
