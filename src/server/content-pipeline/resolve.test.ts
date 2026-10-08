import { describe, expect, it } from "vitest";
import { itemExternalRef, assessmentExternalRef, parseExternalRef, parseObjectiveRef, parseSelector, stableUuid } from "./keys";
import { splitFrontMatter, type LoadedRegistry, type LoadedSyllabus } from "./load";
import { leafParts, toEngineResponse } from "./question-model";
import { buildSyllabusModel, homeSubjectPath, lowestCommonAncestor, planTags, resolveObjectives, syllabiForFamily } from "./resolve";
import { questionSourceSchema, syllabusFileSchema, type SyllabusFile } from "./schemas";

function syllabus(board: string, qualification: string, topics: unknown[], extra: Record<string, unknown> = {}): LoadedSyllabus {
  const data: SyllabusFile = syllabusFileSchema.parse({
    board,
    qualification,
    subject: "maths",
    versionLabel: "2030",
    family: "fam",
    title: `${board} maths`,
    code: null,
    effectiveFrom: "2030-01-01",
    officialDocument: { title: "Doc", url: "https://example.org/doc.pdf", publisher: "Board" },
    topics,
    ...extra,
  });
  return { file: `content/syllabi/${board}/${qualification}/maths/2030.json`, ref: { board, qualification, subject: "maths", versionLabel: "2030" }, data };
}

const zimsec = buildSyllabusModel(
  syllabus("zimsec", "o-level", [
    {
      key: "algebra",
      name: "Algebra",
      children: [
        { key: "algebra.manipulation", name: "Manipulation", covers: ["f.expand"] },
        { key: "algebra.equations", name: "Equations", covers: ["f.linear", "f.quadratic"], objectives: [{ code: "7.2.1", text: "Solve equations." }] },
      ],
    },
    { key: "graphs", name: "Graphs", covers: ["f.graphs"] },
  ]),
).model;
const cambridge = buildSyllabusModel(
  syllabus("cambridge", "igcse", [
    { key: "number", name: "Number", children: [{ key: "number.algebra", name: "Algebra", covers: ["f.expand", "f.linear"] }] },
    { key: "advanced", name: "Advanced", children: [{ key: "advanced.quadratics", name: "Quadratics", covers: ["f.quadratic"] }] },
  ]),
).model;

describe("planTags", () => {
  it("tags an item to every covering node of every syllabus, primary first", () => {
    const plans = planTags(["f.quadratic", "f.linear"], undefined, [zimsec, cambridge]);
    expect(plans.map((p) => [p.syllabus.path, p.nodes.map((n) => n.key)])).toEqual([
      ["zimsec/o-level/maths/2030", ["algebra.equations"]],
      ["cambridge/igcse/maths/2030", ["advanced.quadratics", "number.algebra"]],
    ]);
  });

  it("honours applies selectors", () => {
    expect(planTags(["f.linear"], ["cambridge"], [zimsec, cambridge]).map((p) => p.syllabus.ref.board)).toEqual(["cambridge"]);
    expect(planTags(["f.linear"], ["zimsec/o-level/maths@2030"], [zimsec, cambridge]).map((p) => p.syllabus.ref.board)).toEqual(["zimsec"]);
    expect(planTags(["f.graphs"], ["cambridge"], [zimsec, cambridge])).toEqual([]);
  });

  it("picks the home subject in registry preference order", () => {
    const registry = { file: "r", data: { subjects: ["cambridge/igcse/maths", "zimsec/o-level/maths"] } } as unknown as LoadedRegistry;
    expect(homeSubjectPath(planTags(["f.linear"], undefined, [zimsec, cambridge]), registry)).toBe("cambridge/igcse/maths");
    expect(homeSubjectPath(planTags(["f.graphs"], undefined, [zimsec, cambridge]), registry)).toBe("zimsec/o-level/maths");
  });

  it("includes syllabi that borrow a family's concepts (conceptFamilies)", () => {
    const science = buildSyllabusModel(
      syllabus("zimsec", "o-level", [{ key: "maths-in-science", name: "Maths in science", covers: ["f.linear"] }], { family: "sci", conceptFamilies: ["fam"] }),
    ).model;
    expect(syllabiForFamily("fam", [zimsec, cambridge, science]).map((m) => m.family)).toEqual(["fam", "fam", "sci"]);
    expect(syllabiForFamily("sci", [zimsec, cambridge, science])).toEqual([science]);
    const plans = planTags(["f.linear"], undefined, syllabiForFamily("fam", [zimsec, science]));
    expect(plans.map((p) => [p.syllabus.family, p.nodes.map((n) => n.key)])).toEqual([
      ["fam", ["algebra.equations"]],
      ["sci", ["maths-in-science"]],
    ]);
  });

  it("resolves objectives only within tagged topics", () => {
    const plans = planTags(["f.expand"], undefined, [zimsec]);
    const result = resolveObjectives(["zimsec/o-level/maths:7.2.1"], plans);
    expect(result.objectives).toEqual([]);
    expect(result.problems[0]).toMatch(/do not tag/);
    const ok = resolveObjectives(["zimsec/o-level/maths:7.2.1"], planTags(["f.linear"], undefined, [zimsec]));
    expect(ok.objectives.map((o) => o.node.key)).toEqual(["algebra.equations"]);
  });
});

describe("buildSyllabusModel", () => {
  it("derives kinds, slugs, lineage and reports structural problems", () => {
    const built = buildSyllabusModel(
      syllabus("zimsec", "o-level", [
        { key: "a", name: "Same name", children: [{ key: "a.b", name: "Child", covers: ["f.x"], children: [{ key: "a.b.c", name: "Grandchild", covers: ["f.x"] }] }] },
        { key: "b", name: "Same name", kind: "SUBTOPIC" },
        { key: "a", name: "Duplicate" },
      ]),
    );
    const byKey = built.model.byKey;
    expect(byKey.get("a.b")?.kind).toBe("SUBTOPIC");
    expect(byKey.get("a.b.c")?.lineage).toEqual(["a", "a.b", "a.b.c"]);
    expect(built.model.nodes.map((n) => n.slug)).toEqual(["same-name", "child", "grandchild", "same-name-2", "duplicate"]);
    expect(built.issues.map((i) => i.code)).toEqual(expect.arrayContaining(["topic-kind", "duplicate-key", "redundant-cover"]));
  });

  it("finds the lowest common ancestor of covering nodes", () => {
    const nodes = ["algebra.manipulation", "algebra.equations"].map((key) => zimsec.byKey.get(key)!);
    expect(lowestCommonAncestor(zimsec, nodes)?.key).toBe("algebra");
    expect(lowestCommonAncestor(zimsec, [zimsec.byKey.get("graphs")!, ...nodes])).toBeNull();
  });
});

describe("keys and front matter", () => {
  it("round-trips external references and parses selectors and objective references", () => {
    expect(parseExternalRef(itemExternalRef("maths-o", "q.one"))).toEqual({ family: "maths-o", key: "q.one", syllabusPath: null });
    expect(parseExternalRef(assessmentExternalRef("maths-o", "t", { board: "b", qualification: "q", subject: "s", versionLabel: "v1" }))).toEqual({
      family: "maths-o",
      key: "t",
      syllabusPath: "b/q/s/v1",
    });
    expect(parseSelector("zimsec/o-level")).toEqual({ board: "zimsec", qualification: "o-level", subject: null, versionLabel: null });
    expect(parseSelector("zimsec@2030")).toBeNull();
    expect(parseObjectiveRef("zimsec/o-level/maths:E2.5")).toEqual({ subject: { board: "zimsec", qualification: "o-level", subject: "maths" }, code: "E2.5" });
    expect(stableUuid("x")).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(stableUuid("x")).toBe(stableUuid("x"));
  });

  it("splits JSON front matter from the Markdown body and reports the body line", () => {
    expect(splitFrontMatter('---\n{"a":1}\n---\n\n## Body\n')).toEqual({ json: '{"a":1}', body: "## Body\n", bodyLine: 5 });
    expect(splitFrontMatter("## No front matter")).toHaveProperty("problem");
    expect(splitFrontMatter('---\n{"a":1}\n')).toHaveProperty("problem");
  });
});

describe("structured responses", () => {
  it("maps label-keyed responses onto placeholder part ids", () => {
    const question = questionSourceSchema.parse({
      key: "s.q",
      type: "STRUCTURED",
      concepts: ["f.linear"],
      difficulty: 3,
      marks: 3,
      estimatedSeconds: 200,
      stem: "Context",
      explanation: "Because.",
      skill: "APPLICATION",
      parts: [
        { label: "(a)", type: "NUMERICAL", marks: 1, stem: "a", answerSpec: { value: 1 } },
        { label: "(b)", type: "STRUCTURED", marks: 2, stem: "b", parts: [{ label: "(i)", type: "NUMERICAL", marks: 2, stem: "b i", answerSpec: { value: 2 } }] },
      ],
    });
    expect(leafParts(question).map((p) => p.labelPath)).toEqual(["(a)", "(b)(i)"]);
    const converted = toEngineResponse(question, { type: "STRUCTURED", parts: { "(a)": { type: "NUMERICAL", value: "1" }, "(b)(i)": { type: "NUMERICAL", value: "2" } } });
    expect(converted.problem).toBeNull();
    expect((converted.response as { parts: unknown[] }).parts).toHaveLength(2);
    expect(toEngineResponse(question, { type: "STRUCTURED", parts: { "(c)": {} } }).problem).toMatch(/not a part to answer/);
  });
});
