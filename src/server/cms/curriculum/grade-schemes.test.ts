import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createContentSource, createCurriculumChain, createStudent, uniqueCode } from "../../../../tests/factories/index";
import type { CurriculumActor } from "./access";
import { createGradeScheme, getGradeSchemeDetail, listGradeSchemes, updateGradeScheme } from "./grade-schemes";
import { auditOperations, staffActor, studentActor } from "./testing";

let admin: CurriculumActor;
let editor: CurriculumActor;
let student: CurriculumActor;

beforeAll(async () => {
  [admin, editor, student] = await Promise.all([staffActor("ADMIN"), staffActor("CONTENT_EDITOR"), studentActor()]);
});

const BANDS = [
  { label: "A", minPercent: "75", isPass: "on" },
  { label: "B", minPercent: "60", isPass: "on" },
  { label: "C", minPercent: "50", isPass: "on" },
  { label: "U", minPercent: "0", isPass: "" },
];

function schemeInput(qualificationId: string, overrides: Record<string, unknown> = {}) {
  return {
    qualificationId,
    name: `Estimate ${uniqueCode("G")}`,
    disclaimer: "Estimated from practice results; not an official grade.",
    isEstimate: "on",
    isActive: "",
    isDefault: "",
    bands: BANDS,
    ...overrides,
  };
}

/** A finished practice attempt whose grade estimate used `gradeSchemeId` (freezes the scheme's bands). */
async function useScheme(subjectId: string, gradeSchemeId: string): Promise<void> {
  const { user } = await createStudent({ student: { isMinor: false } });
  const now = new Date();
  await db.assessmentAttempt.create({
    data: {
      userId: user.id,
      subjectId,
      mode: "PRACTICE",
      startedAt: now,
      lastSavedAt: now,
      questionCount: 0,
      config: { feedback: "IMMEDIATE", origin: "BUILDER" },
      status: "MARKED",
      submitReason: "STUDENT",
      submittedAt: now,
      markedAt: now,
      totalMarks: 10,
      marksAwarded: 8,
      answeredCount: 0,
      correctCount: 0,
      percentage: 80,
      gradeSchemeId,
      gradeEstimate: "A",
      gradeIsPass: true,
    },
  });
}

describe("grade schemes", () => {
  it("lets editors draft inactive schemes; making a scheme live needs an admin", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    await expect(createGradeScheme(student, schemeInput(chain.qualification.id))).rejects.toMatchObject({ code: "FORBIDDEN" });
    const draft = await createGradeScheme(editor, schemeInput(chain.qualification.id));
    expect(draft.version).toBe(1);
    await expect(createGradeScheme(editor, schemeInput(chain.qualification.id, { isActive: "on" }))).rejects.toMatchObject({ code: "FORBIDDEN" });
    const detail = await getGradeSchemeDetail(editor, draft.id);
    expect(detail).toMatchObject({ isActive: false, isDefault: false, isEstimate: true, used: false, canEdit: true, canEditLive: false });
    expect(detail.bands.map((band) => [band.label, band.minPercent, band.isPass, band.sortOrder])).toEqual([
      ["A", 75, true, 0],
      ["B", 60, true, 1],
      ["C", 50, true, 2],
      ["U", 0, false, 3],
    ]);
    expect(await auditOperations(draft.id)).toEqual(["curriculum.grade_scheme.create"]);
  });

  it("validates bands, the estimate caveat and the default/active flags", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    await expect(
      createGradeScheme(admin, schemeInput(chain.qualification.id, { bands: [{ label: "A", minPercent: "40", isPass: "on" }, { label: "B", minPercent: "50", isPass: "" }] })),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { "bands.1.minPercent": expect.any(Array) } });
    await expect(createGradeScheme(admin, schemeInput(chain.qualification.id, { disclaimer: "" }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { disclaimer: expect.any(Array) } });
    await expect(createGradeScheme(admin, schemeInput(chain.qualification.id, { isEstimate: "" }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { sourceId: expect.any(Array) } });
    await expect(createGradeScheme(admin, schemeInput(chain.qualification.id, { isDefault: "on" }))).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { isActive: expect.any(Array) } });
    const source = await createContentSource({ type: "OFFICIAL_SYLLABUS" });
    await expect(createGradeScheme(admin, schemeInput(chain.qualification.id, { isEstimate: "", sourceId: source.id, isActive: "on" }))).resolves.toMatchObject({ version: 1 });
  });

  it("keeps one default per qualification", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const first = await createGradeScheme(admin, schemeInput(chain.qualification.id, { isActive: "on", isDefault: "on" }));
    const second = await createGradeScheme(admin, schemeInput(chain.qualification.id, { isActive: "on", isDefault: "on" }));
    const page = await listGradeSchemes(editor, { qualificationId: chain.qualification.id });
    expect(page.items.filter((row) => row.isDefault).map((row) => row.id)).toEqual([second.id]);
    expect(page.items.map((row) => row.id).sort()).toEqual([first.id, second.id].sort());
    await expect(listGradeSchemes(student, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("edits the bands of an unused scheme in place", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const input = schemeInput(chain.qualification.id);
    const { id } = await createGradeScheme(editor, input);
    const result = await updateGradeScheme(editor, { ...input, id, bands: [{ label: "P", minPercent: "50", isPass: "on" }, { label: "F", minPercent: "0", isPass: "" }] });
    expect(result).toEqual({ id, version: 1, versioned: false, previousId: null, assessmentsOnPrevious: 0 });
    expect((await getGradeSchemeDetail(editor, id)).bands.map((band) => band.label)).toEqual(["P", "F"]);
  });

  it("creates a new version instead of touching bands that graded attempts", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const input = schemeInput(chain.qualification.id, { isActive: "on", isDefault: "on" });
    const { id } = await createGradeScheme(admin, input);
    await db.syllabus.update({ where: { id: chain.syllabus.id }, data: { gradeSchemeId: id } });
    await useScheme(chain.subject.id, id);
    expect((await getGradeSchemeDetail(admin, id)).used).toBe(true);
    await expect(updateGradeScheme(editor, { ...input, id })).rejects.toMatchObject({ code: "FORBIDDEN" });

    // Metadata-only edits stay in place.
    await expect(updateGradeScheme(admin, { ...input, id, description: "Same bands" })).resolves.toMatchObject({ id, versioned: false });

    const newBands = [{ label: "A", minPercent: "70", isPass: "on" }, ...BANDS.slice(1)];
    const result = await updateGradeScheme(admin, { ...input, id, bands: newBands });
    expect(result).toMatchObject({ versioned: true, version: 2, previousId: id, assessmentsOnPrevious: 0 });
    const [previous, next] = await Promise.all([getGradeSchemeDetail(admin, id), getGradeSchemeDetail(admin, result.id)]);
    expect(previous).toMatchObject({ isActive: false, isDefault: false, used: true });
    expect(previous.bands[0]).toMatchObject({ label: "A", minPercent: 75 });
    expect(next).toMatchObject({ isActive: true, isDefault: true, version: 2, used: false, name: input.name });
    expect(next.bands[0]).toMatchObject({ label: "A", minPercent: 70 });
    expect(next.versions.map((version) => version.id)).toEqual([id]);
    expect((await db.syllabus.findUniqueOrThrow({ where: { id: chain.syllabus.id } })).gradeSchemeId).toBe(result.id);
    expect(await auditOperations(result.id)).toEqual(["curriculum.grade_scheme.new_version"]);

    // The database itself refuses to touch the frozen bands.
    await expect(db.gradeBand.updateMany({ where: { gradeSchemeId: id }, data: { minPercent: 1 } })).rejects.toThrow();
  });
});
