import { randomBytes, randomInt } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { ContentAggregates } from "@/server/content/publish";
import { LocalDriver } from "@/server/lib/storage";
import { createCurriculumChain, uniqueSlug, type CurriculumChain } from "../../../../tests/factories/index";
import { createAssessment, getAssessmentEditor, saveAssessmentStructure } from "../assessments/service";
import { createQuestion, getQuestionEditor, updateQuestion } from "../questions/service";
import { staffActor, structuredDocument } from "../questions/testing";
import { createStudyPack } from "../study-packs/service";
import { assetSnippet } from "./schemas";
import { deleteMedia, getMediaDetail, uploadMedia } from "./service";
import { usageFieldsFromAggregate } from "./usage";

/**
 * Media usage of question, assessment and study-pack DRAFT saves goes through the media library's one mapping
 * (`usageFieldsFromAggregate`), so "where it is used" and the delete protection cover them like lessons and cards.
 */

let root: string;
let storage: LocalDriver;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "dz-usage-"));
  storage = new LocalDriver(root);
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

/** A small PNG with unique bytes (the shared test database keeps earlier runs' files). */
async function png(): Promise<Uint8Array> {
  const colour = `#${randomBytes(3).toString("hex")}`;
  return new Uint8Array(await sharp({ create: { width: 16 + randomInt(0, 64), height: 16 + randomInt(0, 64), channels: 3, background: colour } }).png().toBuffer());
}

function chain(): Promise<CurriculumChain> {
  return createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0, objectivesPerSubtopic: 1 });
}

describe("usageFieldsFromAggregate (pure)", () => {
  it("keeps sub-part fields apart from their parent part's and covers assessment section instructions", () => {
    const node = (stem: string, parts: unknown[] = []) => ({ stem, explanation: null, workedSolution: null, conceptSummary: null, hints: [], payload: null, options: [], parts });
    const question = node("root", [node("part a", [node("sub-part i")]), node("part b")]);
    const fields = usageFieldsFromAggregate("QUESTION", { question, topics: [], objectives: [] } as unknown as ContentAggregates["QUESTION"]);
    expect(fields).toMatchObject({ stem: "root", "parts.0.stem": "part a", "parts.0.parts.0.stem": "sub-part i", "parts.1.stem": "part b" });

    const assessment = { assessment: { description: "d", instructions: "i" }, sections: [{ instructions: "s0" }, { instructions: null }], topics: [] };
    expect(usageFieldsFromAggregate("ASSESSMENT", assessment as unknown as ContentAggregates["ASSESSMENT"])).toEqual({
      description: "d",
      instructions: "i",
      "sections.0.instructions": "s0",
      "sections.1.instructions": null,
    });
  });
});

describe("media usage of question, assessment and study-pack draft saves", () => {
  it("records every reference on save, lists it under 'where used' and blocks deletion until it is removed", async () => {
    const c = await chain();
    const editor = await staffActor("CONTENT_EDITOR");
    const upload = async (altText: string) => (await uploadMedia(editor, { bytes: await png() }, { altText }, {}, { storage })).id;
    const [stemImage, partImage, instructionsImage, sectionImage, cover] = await Promise.all([
      upload("Rectangle with labelled sides"),
      upload("Area grid"),
      upload("Exam rubric"),
      upload("Section diagram"),
      upload("Study pack cover"),
    ]);

    // Question: root stem and part (b) stem reference images.
    const base = structuredDocument(c);
    const parts = base.parts ?? [];
    const document = {
      ...base,
      stem: `${base.stem}\n\n${assetSnippet(stemImage, "Rectangle with labelled sides")}`,
      parts: parts.map((part, index) => (index === 1 ? { ...part, stem: `${part.stem}\n\n${assetSnippet(partImage, "Area grid")}` } : part)),
    };
    const question = await createQuestion(editor, document);
    const usagesOf = async (assetId: string) => (await getMediaDetail(editor, assetId)).usages.map((u) => ({ entityType: u.entityType, entityId: u.entityId, field: u.field }));
    expect(await usagesOf(stemImage)).toEqual([{ entityType: "QUESTION", entityId: question.id, field: "stem" }]);
    expect(await usagesOf(partImage)).toEqual([{ entityType: "QUESTION", entityId: question.id, field: "parts.1.stem" }]);
    await expect(deleteMedia(editor, { id: stemImage })).rejects.toMatchObject({ code: "CONFLICT" });

    // Removing the reference on the next draft save releases the image.
    const view = await getQuestionEditor(editor, question.id);
    await updateQuestion(editor, { id: question.id, version: view.version, question: { ...document, stem: base.stem } });
    expect(await usagesOf(stemImage)).toEqual([]);
    await expect(deleteMedia(editor, { id: stemImage })).resolves.toEqual({ id: stemImage });

    // Assessment: top-level and section instructions.
    const { id: assessmentId } = await createAssessment(editor, {
      kind: "TOPIC_TEST",
      assembly: "FIXED",
      subjectId: c.subject.id,
      syllabusId: c.syllabus.id,
      routeId: null,
      title: "Areas check",
      instructions: `Read the rubric.\n\n${assetSnippet(instructionsImage, "Exam rubric")}`,
      timeLimitMinutes: 20,
      maxAttempts: null,
      gradeSchemeId: null,
      feedbackTiming: "AFTER_SUBMIT",
      shuffleQuestions: false,
      shuffleOptions: false,
      allowNavigation: true,
      accessTier: "FREE",
      topicIds: [],
      copyrightStatus: "OWNED",
      sourceId: c.source.id,
      author: "Editorial team",
    });
    const assessmentView = await getAssessmentEditor(editor, assessmentId);
    await saveAssessmentStructure(editor, {
      id: assessmentId,
      version: assessmentView.version,
      sections: [{ title: "Section A", instructions: `Use the diagram.\n\n${assetSnippet(sectionImage, "Section diagram")}`, items: [] }],
    });
    expect(await usagesOf(instructionsImage)).toEqual([{ entityType: "ASSESSMENT", entityId: assessmentId, field: "instructions" }]);
    expect(await usagesOf(sectionImage)).toEqual([{ entityType: "ASSESSMENT", entityId: assessmentId, field: "sections.0.instructions" }]);

    // Study pack: the cover image id.
    const { id: packId } = await createStudyPack(editor, { slug: uniqueSlug("pack"), title: "Areas study pack", coverImageId: cover });
    expect(await usagesOf(cover)).toEqual([{ entityType: "STUDY_PACK", entityId: packId, field: "coverImageId" }]);
    await expect(deleteMedia(editor, { id: cover })).rejects.toMatchObject({ code: "CONFLICT" });
  });
});
