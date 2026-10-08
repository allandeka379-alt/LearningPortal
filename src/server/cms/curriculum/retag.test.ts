import { beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { db } from "@/server/db";
import { createCurriculumChain, createQuestion, createStudent } from "../../../../tests/factories/index";
import type { CurriculumActor } from "./access";
import { applyRetag, previewRetag } from "./retag";
import { createSyllabusVersion } from "./syllabuses";
import { deleteTopic } from "./topics";
import { auditOperations, staffActor, studentActor } from "./testing";

let editor: CurriculumActor;
let student: CurriculumActor;

beforeAll(async () => {
  [editor, student] = await Promise.all([staffActor("CONTENT_EDITOR"), studentActor()]);
});

const ALL = { questions: "on", lessons: "on", flashcards: "on", objectives: "on" };

describe("carrying content tags into a new syllabus version", () => {
  it("adds lineage-mapped tags, keeps old tags and reports topics without an equivalent", async () => {
    // Current version: 2 topics (one published lesson each) × 2 subtopics (one objective each).
    const chain = await createCurriculumChain({ objectivesPerSubtopic: 1 });
    const context = { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.subtopics.map((topic) => topic.id) };
    const [sub1, sub2] = chain.subtopics;
    const q1 = await createQuestion("MULTIPLE_CHOICE", { context, topicId: sub1!.id });
    await createQuestion("TRUE_FALSE", { context, topicId: sub2!.id });
    await db.questionObjective.create({ data: { questionId: q1.id, objectiveId: chain.objectiveIds[0]! } });
    const platformCard = await db.flashcard.create({
      data: { subjectId: chain.subject.id, cardType: "DEFINITION", front: "Term", back: "Meaning", topics: { create: { topicId: chain.topics[0]!.id, isPrimary: true } } },
    });
    const { user: owner } = await createStudent({ student: { isMinor: false } });
    await db.flashcard.create({
      data: {
        subjectId: chain.subject.id,
        ownerUserId: owner.id,
        cardType: "FACT",
        front: "Personal",
        back: "Card",
        status: "PUBLISHED",
        publishedAt: new Date(),
        topics: { create: { topicId: chain.topics[0]!.id, isPrimary: true } },
      },
    });
    const oldQuestionTags = await db.questionTopic.count({ where: { syllabusId: chain.syllabus.id } });

    const { id } = await createSyllabusVersion(editor, {
      subjectId: chain.subject.id,
      versionLabel: `next-${randomUUID().slice(0, 6)}`,
      title: "Next",
      effectiveFrom: "2028-01-01",
      cloneFromId: chain.syllabus.id,
    });
    // The second subtopic is dropped from the new version: its tags cannot be carried over.
    const droppedCopy = await db.topic.findFirstOrThrow({ where: { syllabusId: id, originTopicId: sub2!.id } });
    await deleteTopic(editor, { id: droppedCopy.id });

    const preview = await previewRetag(editor, id);
    expect(preview.source).toMatchObject({ id: chain.syllabus.id });
    expect(preview.toAdd).toEqual({ questions: 1, lessons: 2, flashcards: 1, questionObjectives: 1, lessonObjectives: 0 });
    expect(preview.alreadyTagged).toEqual({ questions: 0, lessons: 0, flashcards: 0, questionObjectives: 0, lessonObjectives: 0 });
    expect(preview.unmapped).toEqual([{ id: sub2!.id, code: sub2!.code, name: sub2!.name, tags: 1 }]);
    expect(preview.mappedTopics).toBe(5);

    const added = await applyRetag(editor, { syllabusId: id, ...ALL });
    expect(added).toEqual({ questions: 1, lessons: 2, flashcards: 1, questionObjectives: 1, lessonObjectives: 0, sourceId: chain.syllabus.id });

    const sub1Copy = await db.topic.findFirstOrThrow({ where: { syllabusId: id, originTopicId: sub1!.id } });
    expect(await db.questionTopic.findMany({ where: { questionId: q1.id }, orderBy: { syllabusId: "asc" } })).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ syllabusId: chain.syllabus.id, topicId: sub1!.id, isPrimary: true }),
        expect.objectContaining({ syllabusId: id, topicId: sub1Copy.id, isPrimary: true, subjectId: chain.subject.id }),
      ]),
    );
    const cardTags = await db.flashcardTopic.findMany({ where: { flashcardId: platformCard.id } });
    expect(cardTags.map((tag) => tag.isPrimary).sort()).toEqual([false, true]);
    expect(await db.questionTopic.count({ where: { syllabusId: chain.syllabus.id } })).toBe(oldQuestionTags);
    expect(await auditOperations(id)).toContain("curriculum.syllabus.retag");

    // Idempotent.
    expect(await applyRetag(editor, { syllabusId: id, ...ALL })).toMatchObject({ questions: 0, lessons: 0, flashcards: 0, questionObjectives: 0 });
    expect((await previewRetag(editor, id)).alreadyTagged).toEqual({ questions: 1, lessons: 2, flashcards: 1, questionObjectives: 1, lessonObjectives: 0 });
  });

  it("copies only the chosen kinds of content", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 1 });
    const { id } = await createSyllabusVersion(editor, {
      subjectId: chain.subject.id,
      versionLabel: `only-${randomUUID().slice(0, 6)}`,
      title: "Next",
      effectiveFrom: "2028-01-01",
      cloneFromId: chain.syllabus.id,
    });
    expect(await applyRetag(editor, { syllabusId: id, questions: "on" })).toMatchObject({ lessons: 0 });
    expect((await previewRetag(editor, id)).toAdd.lessons).toBe(2);
    await expect(applyRetag(editor, { syllabusId: id })).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("explains when a version was not copied from another and forbids non-staff", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const preview = await previewRetag(editor, chain.syllabus.id);
    expect(preview.source).toBeNull();
    await expect(applyRetag(editor, { syllabusId: chain.syllabus.id, ...ALL })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(previewRetag(student, chain.syllabus.id)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(applyRetag(student, { syllabusId: chain.syllabus.id, ...ALL })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
