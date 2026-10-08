import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { LocalDriver } from "@/server/lib/storage";
import { createCurriculumChain, uniqueSuffix } from "../../../../tests/factories/index";
import { auditTrail, contentChain, staffActor, studentActor, teacherActor } from "../review/testing";
import { approveQuestion, publishQuestion, submitQuestion } from "../questions/service";
import { cancelImport, commitImport, getImportDetail, handleImportJob, IMPORT_JOB_TYPE, importReportCsv, listImports, revalidateImport, uploadImport } from "./service";
import { csvTemplate } from "./templates";
import { buildXlsx } from "./testing";

/** Integration tests for bulk import (§25): upload → dry run → commit as DRAFT, the background job, idempotency, permissions. */

let root: string;
let storage: LocalDriver;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "dz-imports-"));
  storage = new LocalDriver(root);
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

const encode = (text: string) => new TextEncoder().encode(text);
type Chain = Awaited<ReturnType<typeof contentChain>>;

function importInput(chain: Chain, overrides: Record<string, unknown> = {}) {
  return {
    entityType: "QUESTION",
    subjectId: chain.subject.id,
    syllabusId: chain.syllabus.id,
    sourceId: chain.source.id,
    licenceCode: "PROPRIETARY",
    author: "Content team",
    defaultDifficulty: "2",
    defaultAccessTier: "FREE",
    rightsConfirmed: true,
    ...overrides,
  };
}

/** A questions CSV with unique external references (the shared test database keeps earlier runs' rows). */
function questionsCsv(chain: Chain, tag: string, extraRows: string[] = []): string {
  const topic = chain.topics[0]?.code ?? "1";
  return [
    "external_ref,type,stem,option_a,option_b,option_c,correct,answer,topics,explanation",
    `${tag}-1,MULTIPLE_CHOICE,What is $3 \\times 4$?,7,12,34,B,,${topic},$3 \\times 4 = 12$.`,
    `${tag}-2,TRUE_FALSE,Every square is a rectangle.,,,,,true,,`,
    `${tag}-3,SHORT_ANSWER,Name the chemical symbol for water.,,,,,H2O|H₂O,,`,
    ...extraRows,
  ].join("\n");
}

async function expectCode(promise: Promise<unknown>, code: string, field?: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error) && error.code).toBe(code);
    if (field && isAppError(error)) expect(Object.keys(error.fieldErrors ?? {})).toContain(field);
    return;
  }
  throw new Error(`expected ${code}`);
}

describe("bulk import", () => {
  it("validates a CSV of questions, reports bad rows, then imports the valid ones as DRAFT with the import's licensing", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const tag = `Q${uniqueSuffix()}`;
    const csv = questionsCsv(chain, tag, [`${tag}-4,NUMERICAL,What is $10 / 4$?,,,,,two,,`, `${tag}-5,MULTIPLE_CHOICE,No options,,,,Z,,,`]);
    const uploaded = await uploadImport(editor, { bytes: encode(csv), filename: "questions.csv" }, importInput(chain), {}, { storage });
    expect(uploaded).toMatchObject({ status: "VALIDATED", duplicates: [] });

    const detail = await getImportDetail(editor, uploaded.id);
    expect(detail).toMatchObject({ entityType: "QUESTION", format: "CSV", totalRows: 5, validRows: 3, failedRows: 2, fileName: "questions.csv", actions: ["commit", "validate", "cancel"] });
    expect(detail.issues.filter((i) => i.severity === "error").map((i) => i.row)).toEqual(expect.arrayContaining([5, 6]));
    expect(detail.options?.columnMap).toMatchObject({ stem: "stem", option_a: "option_a", correct: "correct" });
    expect(await db.question.count({ where: { importId: uploaded.id } })).toBe(0);

    // Rows with errors are only skipped when the editor says so.
    await expectCode(commitImport(editor, { id: uploaded.id }, {}, { storage }), "VALIDATION", "skipInvalid");
    const committed = await commitImport(editor, { id: uploaded.id, skipInvalid: true }, {}, { storage });
    expect(committed).toMatchObject({ status: "COMPLETED", importedRows: 3 });

    const rows = await db.question.findMany({ where: { importId: uploaded.id }, include: { options: true, topics: true }, orderBy: { externalRef: "asc" } });
    expect(rows.map((q) => [q.externalRef, q.type, q.status])).toEqual([
      [`${tag}-1`, "MULTIPLE_CHOICE", "DRAFT"],
      [`${tag}-2`, "TRUE_FALSE", "DRAFT"],
      [`${tag}-3`, "SHORT_ANSWER", "DRAFT"],
    ]);
    for (const q of rows) {
      expect(q).toMatchObject({ copyrightStatus: "UNVERIFIED", sourceId: chain.source.id, licenceCode: "PROPRIETARY", author: "Content team", createdById: editor.userId, aiGenerated: false, difficulty: 2, accessTier: "FREE" });
      expect(q.renderedHtml).not.toBeNull();
    }
    expect(rows[0]?.options.find((o) => o.isCorrect)?.key).toBe("B");
    expect(rows[0]?.topics).toEqual([expect.objectContaining({ topicId: chain.topics[0]?.id, isPrimary: true })]);
    expect(JSON.stringify(rows[0]?.renderedHtml)).toContain("katex");

    const done = await getImportDetail(editor, uploaded.id);
    expect(done).toMatchObject({ status: "COMPLETED", importedRows: 3, actions: [] });
    expect(done.created).toMatchObject({ total: 3, byStatus: { DRAFT: 3 } });
    expect(await auditTrail(uploaded.id)).toEqual(["import.upload", "import.commit", "import.complete"]);
    const report = await importReportCsv(editor, uploaded.id);
    expect(report.csv).toContain("row,field,severity,code,message");
  });

  it("warns about a re-uploaded file and never imports an external reference twice", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const tag = `D${uniqueSuffix()}`;
    const csv = questionsCsv(chain, tag);
    const first = await uploadImport(editor, { bytes: encode(csv), filename: "a.csv" }, importInput(chain), {}, { storage });
    await commitImport(editor, { id: first.id }, {}, { storage });

    const again = await uploadImport(editor, { bytes: encode(csv), filename: "a-again.csv" }, importInput(chain), {}, { storage });
    expect(again.duplicates.map((d) => d.id)).toEqual([first.id]);
    const detail = await getImportDetail(editor, again.id);
    expect(detail).toMatchObject({ validRows: 0, failedRows: 3, actions: ["validate", "cancel"] });
    expect(detail.issues.every((i) => i.code === "DUPLICATE" && i.message.startsWith("Already imported"))).toBe(true);
    expect(detail.duplicates[0]).toMatchObject({ id: first.id, status: "COMPLETED", importedRows: 3 });
    await expectCode(commitImport(editor, { id: again.id, skipInvalid: true }, {}, { storage }), "VALIDATION");

    // The same file with one new row: the old rows are reported, the new one imports after confirming the duplicate.
    const grown = csv.replace("Every square", "Every square (v2)") + `\n${tag}-9,TRUE_FALSE,A triangle has three sides.,,,,,true,,`;
    const third = await uploadImport(editor, { bytes: encode(grown), filename: "b.csv" }, importInput(chain), {}, { storage });
    expect(third.duplicates).toEqual([]);
    expect(await getImportDetail(editor, third.id)).toMatchObject({ validRows: 1, failedRows: 3 });
    await commitImport(editor, { id: third.id, skipInvalid: true }, {}, { storage });
    expect(await db.question.count({ where: { externalRef: { startsWith: `${tag}-` } } })).toBe(4);
  });

  it("runs large files through the background job with progress, resumable and cancellable", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const tag = `J${uniqueSuffix()}`;
    const deps = { storage, inlineRowLimit: 0 };
    const rows = Array.from({ length: 5 }, (_, i) => `${tag}-${i},Card ${i} ${tag},Back ${i},DEFINITION`);
    const csv = ["external_ref,front,back,card_type", ...rows].join("\n");
    const uploaded = await uploadImport(editor, { bytes: encode(csv), filename: "cards.csv" }, importInput(chain, { entityType: "FLASHCARD", syllabusId: "" }), {}, deps);
    expect(uploaded.status).toBe("VALIDATING");
    const validateJob = await db.job.findFirstOrThrow({ where: { type: IMPORT_JOB_TYPE, dedupeKey: `import:${uploaded.id}:validate`, status: "PENDING" } });
    expect(validateJob.queue).toBe("imports");
    expect((await getImportDetail(editor, uploaded.id)).progress).toMatchObject({ phase: "validate", total: 5 });

    await expect(handleImportJob(validateJob.payload, undefined, deps)).resolves.toMatchObject({ status: "VALIDATED", validRows: 5 });
    // A second run of the same job is a no-op (idempotent handler).
    await expect(handleImportJob(validateJob.payload, undefined, deps)).resolves.toEqual({ skipped: "VALIDATED" });

    await expect(commitImport(editor, { id: uploaded.id }, {}, deps)).resolves.toMatchObject({ status: "IMPORTING" });
    const commitJob = await db.job.findFirstOrThrow({ where: { type: IMPORT_JOB_TYPE, dedupeKey: `import:${uploaded.id}:commit`, status: "PENDING" } });
    await expect(handleImportJob(commitJob.payload, undefined, deps)).resolves.toMatchObject({ status: "COMPLETED", importedRows: 5 });
    const cards = await db.flashcard.findMany({ where: { importId: uploaded.id } });
    expect(cards).toHaveLength(5);
    expect(cards.every((c) => c.status === "DRAFT" && c.cardType === "DEFINITION" && c.renderedHtml !== null && c.ownerUserId === null)).toBe(true);
    expect((await getImportDetail(editor, uploaded.id)).progress).toBeNull();

    // Cancelling a queued import cancels its job; the handler then skips it.
    const other = await uploadImport(editor, { bytes: encode(csv.replaceAll(tag, `${tag}x`)), filename: "c.csv" }, importInput(chain, { entityType: "FLASHCARD" }), {}, deps);
    await expect(cancelImport(editor, { id: other.id })).resolves.toMatchObject({ status: "CANCELLED" });
    const cancelledJob = await db.job.findFirstOrThrow({ where: { dedupeKey: `import:${other.id}:validate` } });
    expect(cancelledJob.status).toBe("CANCELLED");
    await expect(handleImportJob(cancelledJob.payload, undefined, deps)).resolves.toEqual({ skipped: "CANCELLED" });
    await expectCode(cancelImport(editor, { id: other.id }), "CONFLICT");
  });

  it("reads Excel workbooks and lessons with front matter", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const tag = uniqueSuffix();
    const xlsx = buildXlsx([
      ["Front", "Back", "Card type", "Topic"],
      [`Osmosis ${tag}`, "Water moving through a partially permeable membrane", "definition", chain.topics[1]?.code ?? "2"],
      [`Year ${tag}`, 1980, "DATE", ""],
    ]);
    const cards = await uploadImport(editor, { bytes: xlsx, filename: "cards.xlsx" }, importInput(chain, { entityType: "FLASHCARD" }), {}, { storage });
    expect(await getImportDetail(editor, cards.id)).toMatchObject({ format: "XLSX", validRows: 2, failedRows: 0 });
    await commitImport(editor, { id: cards.id }, {}, { storage });
    const tagged = await db.flashcard.findFirstOrThrow({ where: { importId: cards.id, front: `Osmosis ${tag}` }, include: { topics: true } });
    expect(tagged.topics[0]).toMatchObject({ topicId: chain.topics[1]?.id, isPrimary: true });

    const lessons = JSON.stringify({
      lessons: [
        { externalRef: `L-${tag}`, title: `Speed ${tag}`, body: "## Speed\n\n:::formula{name=\"Speed\"}\n$$v = \\frac{d}{t}$$\n:::", topics: [chain.topics[0]?.code], objectives: [] },
        { markdown: `---\ntitle: Ecosystems ${tag}\nkind: REVISION_NOTES\n---\n## Ecosystems\n\nLiving and non-living parts.` },
      ],
    });
    const lessonImport = await uploadImport(editor, { bytes: encode(lessons), filename: "lessons.json" }, importInput(chain, { entityType: "LESSON" }), {}, { storage });
    await commitImport(editor, { id: lessonImport.id }, {}, { storage });
    const created = await db.lesson.findMany({ where: { importId: lessonImport.id }, include: { topics: true }, orderBy: { title: "desc" } });
    expect(created.map((l) => [l.title, l.kind, l.status])).toEqual([
      [`Speed ${tag}`, "LESSON", "DRAFT"],
      [`Ecosystems ${tag}`, "REVISION_NOTES", "DRAFT"],
    ]);
    expect(created[0]?.bodyHtml).toContain("katex");
    expect(created[0]?.topics[0]).toMatchObject({ topicId: chain.topics[0]?.id, isPrimary: true });
    expect(created.every((l) => l.slug.length > 0 && l.copyrightStatus === "UNVERIFIED")).toBe(true);
  });

  it("adds a topic outline to a DRAFT syllabus version only", async () => {
    const chain = await createCurriculumChain({ syllabusStatus: "DRAFT", lessonsPerTopic: 0, topicCount: 1, subtopicsPerTopic: 0 });
    const editor = await staffActor();
    const outline = JSON.stringify({
      topics: [
        { code: "N1", name: `Number ${uniqueSuffix()}`, children: [{ code: "N1.1", name: "Integers", objectives: ["Order integers", { code: "N1.1b", statement: "Use negative numbers" }] }] },
        { code: "N2", name: "Under topic 1", parent: chain.topics[0]?.code },
      ],
    });
    const input = { entityType: "TOPIC", subjectId: chain.subject.id, syllabusId: chain.syllabus.id, sourceId: chain.source.id, rightsConfirmed: true };
    const uploaded = await uploadImport(editor, { bytes: encode(outline), filename: "outline.json" }, input, {}, { storage });
    expect(await getImportDetail(editor, uploaded.id)).toMatchObject({ totalRows: 3, validRows: 3, failedRows: 0 });
    await expect(commitImport(editor, { id: uploaded.id }, {}, { storage })).resolves.toMatchObject({ status: "COMPLETED", importedRows: 3 });
    const topics = await db.topic.findMany({ where: { importId: uploaded.id }, include: { objectives: true }, orderBy: { path: "asc" } });
    const byCode = new Map(topics.map((t) => [t.code, t]));
    expect(byCode.get("N1")).toMatchObject({ kind: "TOPIC", depth: 0, parentId: null });
    expect(byCode.get("N1.1")).toMatchObject({ kind: "SUBTOPIC", depth: 1, parentId: byCode.get("N1")?.id });
    expect(byCode.get("N1.1")?.objectives.map((o) => [o.code, o.statement])).toEqual([
      [null, "Order integers"],
      ["N1.1b", "Use negative numbers"],
    ]);
    expect(byCode.get("N2")).toMatchObject({ kind: "SUBTOPIC", parentId: chain.topics[0]?.id, path: `${chain.topics[0]?.path}/${byCode.get("N2")?.id}` });
    expect((await db.syllabus.findUniqueOrThrow({ where: { id: chain.syllabus.id } })).sourceNotes).toContain("Outline imported (3 topics, 2 objectives)");

    const published = await contentChain();
    await expectCode(
      uploadImport(editor, { bytes: encode(outline), filename: "o.json" }, { ...input, subjectId: published.subject.id, syllabusId: published.syllabus.id }, {}, { storage }),
      "VALIDATION",
      "syllabusId",
    );
  });

  it("requires licensing at import level, keeps items UNVERIFIED and leaves approval to a different person", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const csv = questionsCsv(chain, `P${uniqueSuffix()}`);
    await expectCode(uploadImport(editor, { bytes: encode(csv) }, importInput(chain, { sourceId: "" }), {}, { storage }), "VALIDATION", "sourceId");
    await expectCode(uploadImport(editor, { bytes: encode(csv) }, importInput(chain, { rightsConfirmed: false }), {}, { storage }), "VALIDATION", "rightsConfirmed");
    await expectCode(uploadImport(editor, { bytes: encode("<svg></svg>") }, importInput(chain), {}, { storage }), "VALIDATION", "file");

    const uploaded = await uploadImport(editor, { bytes: encode(csv) }, importInput(chain), {}, { storage });
    await commitImport(editor, { id: uploaded.id }, {}, { storage });
    const question = await db.question.findFirstOrThrow({ where: { importId: uploaded.id, type: "MULTIPLE_CHOICE" } });
    // Imported content cannot reach students without a cleared copyright status and a human approval.
    await expectCode(submitQuestion(editor, { id: question.id }), "VALIDATION", "copyrightStatus");
    await db.question.update({ where: { id: question.id }, data: { copyrightStatus: "OWNED" } });
    await submitQuestion(editor, { id: question.id });
    await approveQuestion(reviewer, { id: question.id, notes: "" });
    await expect(publishQuestion(reviewer, { id: question.id })).resolves.toMatchObject({ id: question.id });
  });

  it("is staff-only and lists imports with filters", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const [student, teacher] = await Promise.all([studentActor(), teacherActor()]);
    const csv = encode(questionsCsv(chain, `R${uniqueSuffix()}`));
    await expectCode(uploadImport(student, { bytes: csv }, importInput(chain), {}, { storage }), "FORBIDDEN");
    await expectCode(uploadImport(teacher, { bytes: csv }, importInput(chain), {}, { storage }), "FORBIDDEN");
    await expectCode(listImports(teacher, {}), "FORBIDDEN");

    const mine = await uploadImport(editor, { bytes: csv, filename: "mine.csv" }, importInput(chain), {}, { storage });
    await expectCode(getImportDetail(student, mine.id), "FORBIDDEN");
    const listed = await listImports(editor, { mine: true });
    expect(listed.items.map((i) => i.id)).toEqual([mine.id]);
    expect(listed.items[0]).toMatchObject({ createdByMe: true, status: "VALIDATED", entityType: "QUESTION" });
    expect((await listImports(editor, { mine: true, status: "COMPLETED" })).items).toEqual([]);

    // Re-check keeps the import usable after curriculum changes.
    await expect(revalidateImport(editor, { id: mine.id }, {}, { storage })).resolves.toMatchObject({ status: "VALIDATED" });
    expect(await auditTrail(mine.id)).toEqual(["import.upload", "import.validate"]);
  });

  it("offers templates that import cleanly", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const csv = csvTemplate("FLASHCARD").replaceAll("EXAMPLE-F-", `EX-${uniqueSuffix()}-`);
    const uploaded = await uploadImport(editor, { bytes: encode(csv), filename: "template.csv" }, importInput(chain, { entityType: "FLASHCARD" }), {}, { storage });
    expect(await getImportDetail(editor, uploaded.id)).toMatchObject({ validRows: 3, failedRows: 0 });
  });
});
