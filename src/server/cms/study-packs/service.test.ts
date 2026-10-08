import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createContentSource, createCurriculumChain, createQuestion as createFixtureQuestion, uniqueSlug, type CurriculumChain } from "../../../../tests/factories/index";
import { auditTrail, staffActor, studentActor, withFourEyes } from "@/server/cms/questions/testing";
import {
  approveStudyPack,
  createStudyPack,
  createStudyPackPrice,
  deleteDraftStudyPack,
  editPublishedStudyPack,
  getStudyPackEditor,
  publishStudyPack,
  saveStudyPackScopes,
  submitStudyPack,
  updateStudyPack,
  updateStudyPackPrice,
} from "./service";

function chain(): Promise<CurriculumChain> {
  return createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
}

function bank(c: CurriculumChain) {
  return { subjectId: c.subject.id, syllabusId: c.syllabus.id, topicIds: c.topics.map((t) => t.id) };
}

async function packWithDetails(c: CurriculumChain) {
  const editor = await staffActor("CONTENT_EDITOR");
  const slug = uniqueSlug("pack");
  const { id } = await createStudyPack(editor, { slug, title: "Mathematics complete study pack", description: "Every topic, with practice and mocks." });
  await saveStudyPackScopes(editor, { id, scopes: [{ kind: "SUBJECT", targetId: c.subject.id }] });
  const view = await getStudyPackEditor(editor, id);
  await updateStudyPack(editor, { id, version: view.version, ...view.meta, entitlements: { lessonAccess: "ALL", mockExams: true, practiceQuestionsPerDay: null } });
  return { editor, id, slug };
}

describe("study packs: permissions and validation", () => {
  it("refuses non-staff and invalid input", async () => {
    const student = await studentActor();
    await expect(createStudyPack(student, { slug: uniqueSlug("p"), title: "Pack" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    const editor = await staffActor("CONTENT_EDITOR");
    await expect(createStudyPack(editor, { slug: "Not A Slug!", title: "Pack" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: expect.any(Array) } });
    const slug = uniqueSlug("p");
    await createStudyPack(editor, { slug, title: "Pack one" });
    await expect(createStudyPack(editor, { slug, title: "Pack two" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { slug: expect.any(Array) } });
  });

  it("validates entitlements with the plan schema", async () => {
    const editor = await staffActor("CONTENT_EDITOR");
    const { id } = await createStudyPack(editor, { slug: uniqueSlug("p"), title: "Pack" });
    const view = await getStudyPackEditor(editor, id);
    expect(view.entitlements.mockExams).toBe(false);
    await expect(updateStudyPack(editor, { id, ...view.meta, entitlements: { mockExam: true } })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(updateStudyPack(editor, { id, ...view.meta, entitlements: { aiMessagesPerDay: -5 } })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { "entitlements.aiMessagesPerDay": expect.any(Array) },
    });
  });
});

describe("study packs: scope, PDF export and workflow", () => {
  it("allows PDF export only while every included item's licence permits it", async () => {
    const c = await chain();
    const { editor, id } = await packWithDetails(c);
    const question = await createFixtureQuestion("TRUE_FALSE", { context: bank(c) });
    let view = await getStudyPackEditor(editor, id);
    expect(view.pdfCheck).toMatchObject({ allowed: true, total: 1, blocked: 0 });
    await updateStudyPack(editor, { id, version: view.version, ...view.meta, allowPdfExport: true, entitlements: view.entitlements });

    const restrictive = await createContentSource({ type: "LICENSED", permitsPdfExport: false });
    await db.question.update({ where: { id: question.id }, data: { sourceId: restrictive.id } });
    view = await getStudyPackEditor(editor, id);
    expect(view.pdfCheck).toMatchObject({ allowed: false, blocked: 1 });
    expect(view.pdfCheck.byType.find((t) => t.type === "QUESTION")?.examples[0]).toMatchObject({ id: question.id, reason: "source_forbids_pdf" });
    expect(view.checks.errors.allowPdfExport).toBeDefined();
    await expect(updateStudyPack(editor, { id, version: view.version, ...view.meta, allowPdfExport: true, entitlements: view.entitlements })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { allowPdfExport: expect.any(Array) },
    });
    // Re-saving the scope with blocked content switches PDF export off.
    const rescoped = await saveStudyPackScopes(editor, { id, version: view.version, scopes: [{ kind: "SYLLABUS", targetId: c.syllabus.id }] });
    expect(rescoped.pdfExportTurnedOff).toBe(true);
    expect((await db.studyPack.findUniqueOrThrow({ where: { id } })).allowPdfExport).toBe(false);
  });

  it("blocks review without scope or entitlements, then publishes with four-eyes and edits via a draft copy", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const reviewer = await staffActor("ADMIN");
    const empty = await createStudyPack(editor, { slug: uniqueSlug("p"), title: "Empty pack" });
    await expect(submitStudyPack(editor, { id: empty.id })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: expect.objectContaining({ scopes: expect.any(Array), entitlements: expect.any(Array) }),
    });

    const { id } = await packWithDetails(c);
    await submitStudyPack(editor, { id });
    await expect(withFourEyes((ctx) => approveStudyPack(editor, { id }, ctx))).resolves.toMatchObject({ status: "APPROVED" });
    // (The editor did not author this pack: packWithDetails used another editor.)
    await publishStudyPack(reviewer, { id });
    const pack = await db.studyPack.findUniqueOrThrow({ where: { id }, include: { scopes: true } });
    expect(pack).toMatchObject({ status: "PUBLISHED", revision: 1 });
    expect(pack.entitlements).toMatchObject({ mockExams: true, lessonAccess: "ALL" });
    expect(await db.contentRevision.count({ where: { entityType: "STUDY_PACK", entityId: id } })).toBe(1);

    await expect(saveStudyPackScopes(editor, { id, scopes: [] })).rejects.toMatchObject({ code: "CONFLICT" });
    const copy = await editPublishedStudyPack(editor, { id });
    const copyView = await getStudyPackEditor(editor, copy.id);
    expect(copyView.liveId).toBe(id);
    await updateStudyPack(editor, { id: copy.id, version: copyView.version, ...copyView.meta, entitlements: { ...copyView.entitlements, flashcards: true } });
    await submitStudyPack(editor, { id: copy.id });
    await approveStudyPack(reviewer, { id: copy.id });
    expect(await publishStudyPack(reviewer, { id: copy.id })).toMatchObject({ id, revision: 2, changed: true });
    expect((await db.studyPack.findUniqueOrThrow({ where: { id } })).entitlements).toMatchObject({ flashcards: true });
  });
});

describe("study packs: prices", () => {
  it("lets billing managers add one-off prices (new rows, audited) and change presentation only", async () => {
    const c = await chain();
    const { editor, id } = await packWithDetails(c);
    const admin = await staffActor("ADMIN");
    await expect(createStudyPackPrice(editor, { studyPackId: id, currency: "USD", amount: "12.50" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createStudyPackPrice(admin, { studyPackId: id, currency: "USD", amount: "12.505" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createStudyPackPrice(admin, { studyPackId: id, currency: "usd", amount: "1", validFrom: "2026-11-01", validTo: "2026-10-01" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { validTo: expect.any(Array) },
    });

    const price = await createStudyPackPrice(admin, { studyPackId: id, currency: "usd", amount: "12.5", accessDays: "365", label: "Launch price" });
    const row = await db.planPrice.findUniqueOrThrow({ where: { id: price.id } });
    expect(row).toMatchObject({ studyPackId: id, currency: "USD", amountMinor: 1250, interval: "ONE_OFF", periodDays: 365, perSeat: false, isActive: true, label: "Launch price" });
    expect(await auditTrail(price.id)).toEqual(["plan_price.create:plan_price.create"]);

    await updateStudyPackPrice(admin, { priceId: price.id, label: "Old price", sortOrder: 2, isActive: false });
    expect(await db.planPrice.findUniqueOrThrow({ where: { id: price.id } })).toMatchObject({ isActive: false, label: "Old price", amountMinor: 1250 });
    const view = await getStudyPackEditor(editor, id);
    expect(view.prices.map((p) => [p.id, p.amountMinor, p.isActive])).toEqual([[price.id, 1250, false]]);
    // A priced pack is never deleted (commercial history); an unpriced draft is.
    await expect(deleteDraftStudyPack(editor, { id })).rejects.toMatchObject({ code: "CONFLICT" });
    const unpriced = await createStudyPack(editor, { slug: uniqueSlug("p"), title: "Unpriced pack" });
    expect(await deleteDraftStudyPack(editor, { id: unpriced.id })).toEqual({ id: unpriced.id });
  });
});
