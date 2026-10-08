import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { Issue } from "./issues";
import { editJson, fixtureFiles, removeTree, tempRoot, writeTree, type FileMap } from "./testing";
import { validateContent, type ValidationResult } from "./validate";

const FAMILY = "testmaths-o";
const Q_FILE = `content/subjects/${FAMILY}/questions/algebra/equations.json`;
const L_FILE = `content/subjects/${FAMILY}/lessons/algebra/linear-equations.md`;
const F_FILE = `content/subjects/${FAMILY}/flashcards/algebra/equations.json`;
const A_FILE = `content/subjects/${FAMILY}/assessments/algebra/linear-test.json`;
const S_FILE = "content/syllabi/boarda/o-level/maths/2030-2032.json";

type Json = Record<string, unknown>;

const roots: string[] = [];
afterEach(() => {
  while (roots.length > 0) removeTree(roots.pop() as string);
});

function run(files: FileMap, targets?: string[]): ValidationResult {
  const root = tempRoot("validate");
  roots.push(root);
  writeTree(root, files);
  return validateContent({ repoRoot: root, cacheDir: null, ...(targets ? { targets } : {}) });
}

function errors(result: ValidationResult): Issue[] {
  return result.issues.filter((i) => i.severity === "error");
}

function codes(result: ValidationResult): string[] {
  return errors(result).map((i) => i.code);
}

function editQuestion(files: FileMap, key: string, edit: (q: Json) => void): void {
  editJson<Json[]>(files, Q_FILE, (list) => {
    const q = list.find((item) => item.key === key);
    if (!q) throw new Error(`no question ${key}`);
    edit(q);
  });
}

describe("validateContent — valid content", () => {
  it("accepts the fixture tree with no errors and summarises it", () => {
    const result = run(fixtureFiles());
    expect(errors(result)).toEqual([]);
    const family = result.families.find((f) => f.family === FAMILY);
    expect(family).toMatchObject({ lessons: 1, questions: 4, flashcards: 2, assessments: 1, concepts: 3, conceptsWithContent: 2, conceptsInSyllabi: 3 });
    expect(family?.questionsByType).toEqual({ MULTIPLE_CHOICE: 1, NUMERICAL: 1, TRUE_FALSE: 1, STRUCTURED: 1 });
    expect(result.syllabi.map((s) => s.path)).toEqual(["boarda/o-level/maths/2030-2032", "boardb/igcse/maths/2030-2032"]);
    expect(result.checkedItems).toBe(7);
  });

  // The real tree has thousands of items: the expensive per-item checks use the validator's on-disk cache (keyed by the
  // checks' fingerprint and each item's content, so a cached result is never stale); a cold run takes minutes.
  it("accepts the real content tree of the repository", () => {
    const result = validateContent({ repoRoot: path.resolve(__dirname, "../../..") });
    expect(errors(result)).toEqual([]);
    expect(result.families.find((f) => f.family === "mathematics-o")?.questions).toBeGreaterThanOrEqual(20);
  }, 600_000);

  it("caches the expensive checks per item", () => {
    const root = tempRoot("validate-cache");
    roots.push(root);
    writeTree(root, fixtureFiles());
    const cacheDir = path.join(root, ".cache");
    const first = validateContent({ repoRoot: root, cacheDir });
    const second = validateContent({ repoRoot: root, cacheDir });
    expect(first.cachedItems).toBe(0);
    expect(second.cachedItems).toBe(second.checkedItems);
    expect(second.issues).toEqual(first.issues);
  });
});

describe("validateContent — references and keys", () => {
  it("reports unknown concepts, duplicate keys and items no syllabus covers", () => {
    const files = fixtureFiles();
    editJson<Json[]>(files, Q_FILE, (list) => {
      list.push({ ...(list[0] as Json) });
      (list[1] as Json).concepts = ["tm.algebra.nope"];
    });
    editJson<Json>(files, `content/concepts/${FAMILY}.json`, (registry) => {
      (registry.concepts as Json[]).push({ key: "tm.algebra.orphan", name: "Orphan" });
    });
    editJson<Json[]>(files, F_FILE, (cards) => {
      (cards[0] as Json).concepts = ["tm.algebra.orphan"];
    });
    const result = run(files);
    expect(codes(result)).toEqual(expect.arrayContaining(["duplicate-key", "concept-unknown", "untagged"]));
    expect(result.issues.find((i) => i.code === "concept-uncovered")?.key).toBe("tm.algebra.orphan");
  });

  it("checks objective references against the tagged topics", () => {
    const files = fixtureFiles();
    editQuestion(files, "quadratic.q01", (q) => {
      q.objectives = ["boarda/o-level/maths:1.1.1", "boarda/o-level/maths:9.9.9"];
    });
    const messages = errors(run(files))
      .filter((i) => i.code === "objective")
      .map((i) => i.message);
    expect(messages.some((m) => m.includes("1.1.1") && m.includes("do not tag"))).toBe(true);
    expect(messages.some((m) => m.includes("9.9.9") && m.includes("does not exist"))).toBe(true);
  });

  it("checks syllabus files: path, keys, papers and concepts", () => {
    const files = fixtureFiles();
    editJson<Json>(files, S_FILE, (s) => {
      const topics = s.topics as Json[];
      topics.push({ key: "algebra", name: "Duplicate key" }, { key: "papers", name: "Papers", components: ["9"], covers: ["tm.algebra.missing"] });
    });
    files["content/syllabi/boarda/o-level/maths/wrong-name.json"] = files[S_FILE] as string;
    const result = run(files);
    expect(codes(result)).toEqual(expect.arrayContaining(["duplicate-key", "component-unknown", "concept-unknown", "layout"]));
  });

  it("reports JSON syntax errors, missing front matter and unknown fields", () => {
    const files = fixtureFiles();
    files[`content/subjects/${FAMILY}/questions/broken.json`] = "[{ \"key\": ";
    files[`content/subjects/${FAMILY}/lessons/no-front-matter.md`] = "## Just a body\n";
    editQuestion(files, "linear.q02", (q) => {
      q.answr = 5;
    });
    const result = run(files);
    expect(codes(result)).toEqual(expect.arrayContaining(["json", "front-matter", "schema"]));
  });
});

describe("validateContent — questions", () => {
  it("marks the modelResponse with the real engine (full marks) and every wrongResponse (less)", () => {
    const files = fixtureFiles();
    editQuestion(files, "linear.q02", (q) => {
      q.modelResponse = { type: "NUMERICAL", value: "6" };
      q.wrongResponses = [{ type: "NUMERICAL", value: "5" }];
    });
    editQuestion(files, "quadratic.q01", (q) => {
      (q.modelResponse as { parts: Json }).parts["(b)"] = { type: "NUMERICAL", value: "-3" };
    });
    const result = run(files);
    const issues = errors(result).filter((i) => i.code.startsWith("model-response") || i.code.startsWith("wrong-response"));
    expect(issues.map((i) => `${i.key}:${i.code}`)).toEqual(
      expect.arrayContaining(["linear.q02:model-response-score", "linear.q02:wrong-response-score", "quadratic.q01:model-response-score"]),
    );
    expect(issues.find((i) => i.key === "quadratic.q01")?.field).toBe("modelResponse.parts.(b)");
  });

  it("requires a modelResponse for automatically marked questions", () => {
    const files = fixtureFiles();
    editQuestion(files, "linear.q03", (q) => {
      delete q.modelResponse;
    });
    expect(codes(run(files))).toContain("model-response-missing");
  });

  it("enforces MCQ rules: one correct option, three distractors, keys in order", () => {
    const files = fixtureFiles();
    editQuestion(files, "linear.q01", (q) => {
      const options = q.options as Json[];
      (options[1] as Json).correct = true;
      options.pop();
      (options[2] as Json).key = "E";
    });
    expect(codes(run(files))).toEqual(expect.arrayContaining(["mcq-correct", "mcq-distractors", "mcq-keys"]));
  });

  it("refuses AI marking, and essays that are not marked against a full mark scheme", () => {
    const files = fixtureFiles();
    editJson<Json[]>(files, Q_FILE, (list) => {
      list.push({
        key: "linear.essay",
        type: "ESSAY",
        concepts: ["tm.algebra.linear-equations"],
        difficulty: 4,
        marks: 6,
        estimatedSeconds: 600,
        markingMode: "AI_ASSISTED",
        stem: "Discuss methods for solving linear equations.",
        answerSpec: { markScheme: { points: [{ id: "P1", description: "Balancing", marks: 2 }] } },
        explanation: "Several methods exist.",
        skill: "EVALUATION",
      });
    });
    expect(codes(run(files))).toEqual(expect.arrayContaining(["marking-mode", "mark-scheme"]));
  });

  it("checks that structured parts add up to the question's marks", () => {
    const files = fixtureFiles();
    editQuestion(files, "quadratic.q01", (q) => {
      q.marks = 5;
    });
    expect(codes(run(files))).toContain("structured-marks");
  });

  it("checks daily-question eligibility", () => {
    const files = fixtureFiles();
    editQuestion(files, "quadratic.q01", (q) => {
      q.dailyEligible = true;
      q.difficulty = 5;
    });
    const daily = errors(run(files)).find((i) => i.code === "daily");
    expect(daily?.message).toMatch(/type must be one of/);
    expect(daily?.message).toMatch(/difficulty must be 2-3/);
  });

  it("validates payloads and answer specs with the platform contracts", () => {
    const files = fixtureFiles();
    editJson<Json[]>(files, Q_FILE, (list) => {
      list.push({
        key: "linear.blanks",
        type: "FILL_IN_THE_BLANK",
        concepts: ["tm.algebra.linear-equations"],
        difficulty: 2,
        marks: 1,
        estimatedSeconds: 40,
        stem: "Complete the sentence.",
        payload: { template: "The solution of $x + 1 = {{blank:a}}$ is 2.", blanks: [{ id: "a", input: "number" }] },
        answerSpec: { blanks: [{ id: "b", accepted: ["3"] }] },
        explanation: "x = 2.",
        modelResponse: { type: "FILL_IN_THE_BLANK", blanks: [{ blankId: "a", text: "3" }] },
        skill: "APPLICATION",
      });
    });
    const result = run(files);
    const blankIssues = errors(result).filter((i) => i.key === "linear.blanks");
    expect(blankIssues.map((i) => i.code)).toEqual(expect.arrayContaining(["definition", "blank-in-math"]));
  });
});

describe("validateContent — rendering", () => {
  it("rejects lessons with raw HTML, unknown blocks, KaTeX errors and images without alt text", () => {
    const files = fixtureFiles();
    files[L_FILE] = (files[L_FILE] as string).replace(
      "## Key definitions",
      '<div class="x">raw</div>\n\n:::warning\nNot a block.\n:::\n\nBroken maths: $\\frac{1}{$\n\n![](media:missing.png)\n\n## Key definitions',
    );
    const result = run(files);
    const lessonCodes = errors(result)
      .filter((i) => i.file === L_FILE)
      .map((i) => i.code);
    expect(lessonCodes).toEqual(expect.arrayContaining(["render:raw-html", "render:unknown-directive", "render:math-error", "media-unknown"]));
    expect(errors(result).find((i) => i.code === "render:raw-html")?.line).toBeGreaterThan(10);
  });

  it("rejects money written with a bare dollar sign in question text", () => {
    const files = fixtureFiles();
    editQuestion(files, "linear.q02", (q) => {
      q.explanation = "A pen costs $5 and a book costs $12.";
    });
    expect(codes(run(files))).toContain("render:math-currency");
  });

  it("rejects LaTeX whose single backslash became a JSON escape (\\t, \\f, \\b, \\r, \\n + command)", () => {
    const files = fixtureFiles();
    editQuestion(files, "linear.q02", (q) => {
      // What a writer gets from the JSON source "$8 \times 4$" / "$\frac{1}{2}$" / "$x \neq 0$" (one backslash each).
      q.explanation = "The bed is 8 m by 4 m and $8 \times 4 = 32$.";
      q.hints = ["Half is $\frac{1}{2}$.", "Remember $x \neq 0$."];
    });
    editJson<Json[]>(files, F_FILE, (cards) => {
      (cards[0] as Json).back = "Correct: $2\\times 3 = 6$ and $x \\neq 0$.\n\nnew paragraph";
    });
    const result = run(files);
    const escapes = errors(result).filter((i) => i.code === "json-escape");
    expect(escapes.map((i) => [i.key, i.field])).toEqual([
      ["linear.q02", "[1].explanation"],
      ["linear.q02", "[1].hints.0"],
      ["linear.q02", "[1].hints.1"],
    ]);
    expect(escapes[0]?.message).toMatch(/tab.*\\\\times/);
    expect(escapes[2]?.message).toMatch(/probably \\neq/);
  });

  it("rejects flashcards whose sides are the same", () => {
    const files = fixtureFiles();
    editJson<Json[]>(files, F_FILE, (cards) => {
      (cards[0] as Json).back = (cards[0] as Json).front;
    });
    expect(codes(run(files))).toContain("flashcard-same");
  });
});

describe("validateContent — assessments", () => {
  it("checks that every blueprint can be filled from the bank, for each target syllabus", () => {
    const files = fixtureFiles();
    editJson<Json[]>(files, A_FILE, (list) => {
      const rules = ((list[0] as Json).sections as Json[])[0]?.rules as Json[];
      (rules[0] as Json).count = 5;
    });
    const blueprint = errors(run(files)).filter((i) => i.code === "blueprint");
    expect(blueprint).toHaveLength(2);
    expect(blueprint[0]?.message).toMatch(/Not enough questions/);
  });

  it("requires a single syllabus for papers and rejects unknown fixed items", () => {
    const files = fixtureFiles();
    editJson<Json[]>(files, A_FILE, (list) => {
      list.push({
        key: "linear.quiz",
        kind: "QUIZ",
        title: "Quiz",
        sections: [{ title: "A", component: "1", items: [{ question: "linear.q01" }, { question: "linear.nope" }] }],
      });
    });
    const result = run(files);
    const quiz = errors(result).filter((i) => i.key === "linear.quiz");
    expect(quiz.map((i) => i.message).join(" ")).toMatch(/need one target syllabus/);
    expect(quiz.map((i) => i.message).join(" ")).toMatch(/"linear\.nope" does not exist/);
  });
});

describe("validateContent — selection", () => {
  it("reports only the selected path's problems", () => {
    const files = fixtureFiles();
    editQuestion(files, "linear.q02", (q) => {
      q.modelResponse = { type: "NUMERICAL", value: "6" };
    });
    files[L_FILE] = (files[L_FILE] as string).replace("## Key definitions", "<div>raw</div>\n\n## Key definitions");
    const onlyQuestions = run(files, [`content/subjects/${FAMILY}/questions`]);
    expect(errors(onlyQuestions).every((i) => i.file === Q_FILE)).toBe(true);
    expect(codes(onlyQuestions)).toContain("model-response-score");
    const byFamily = run(files, [FAMILY]);
    expect(new Set(errors(byFamily).map((i) => i.file))).toEqual(new Set([Q_FILE, L_FILE]));
  });

  it("reports an unknown family", () => {
    expect(codes(run(fixtureFiles(), ["no-such-family"]))).toContain("family-unknown");
  });
});

describe("validateContent — syllabi that borrow another family's concepts", () => {
  const SCIENCE = "testscience-o";
  const SCIENCE_SYLLABUS = "content/syllabi/boarda/o-level/science/2030-2032.json";

  function scienceFiles(conceptFamilies?: string[]): FileMap {
    const files = fixtureFiles();
    files[`content/concepts/${SCIENCE}.json`] = JSON.stringify({
      family: SCIENCE,
      name: "Test science",
      level: "O",
      prefix: "ts",
      subjects: ["boarda/o-level/science"],
      concepts: [{ key: "ts.lab.safety", name: "Laboratory safety" }],
    });
    files[SCIENCE_SYLLABUS] = JSON.stringify({
      board: "boarda",
      qualification: "o-level",
      subject: "science",
      versionLabel: "2030-2032",
      family: SCIENCE,
      ...(conceptFamilies ? { conceptFamilies } : {}),
      title: "Test science syllabus",
      code: null,
      effectiveFrom: "2030-01-01",
      effectiveTo: "2032-12-31",
      officialDocument: { title: "Test science syllabus", url: "https://example.org/science.pdf", publisher: "Test board" },
      topics: [
        { key: "maths-in-science", code: "1", name: "Maths in science", covers: ["tm.algebra.linear-equations"] },
        { key: "lab", code: "2", name: "Laboratory work", covers: ["ts.lab.safety"] },
      ],
    });
    files[`content/subjects/${SCIENCE}/assessments/maths-in-science.json`] = JSON.stringify([
      {
        key: "science.maths-test",
        kind: "TOPIC_TEST",
        title: "Maths in science: topic test",
        timeLimitMinutes: 5,
        syllabus: "boarda/o-level/science",
        sections: [{ title: "Questions", rules: [{ topics: ["maths-in-science"], count: 1, marksPerQuestion: 1 }] }],
      },
    ]);
    return files;
  }

  it("tags the other family's items and draws blueprints from them", () => {
    const result = run(scienceFiles([FAMILY]));
    expect(errors(result)).toEqual([]);
    const science = result.syllabi.find((s) => s.path === "boarda/o-level/science/2030-2032");
    expect(science).toMatchObject({ family: SCIENCE, concepts: 2, conceptsWithContent: 1 });
  });

  it("rejects concepts of a family the syllabus does not borrow from", () => {
    const result = run(scienceFiles());
    expect(errors(result).filter((i) => i.file === SCIENCE_SYLLABUS).map((i) => i.code)).toContain("concept-unknown");
    expect(errors(result).some((i) => i.key === "science.maths-test" && i.code === "blueprint")).toBe(true);
  });

  it("reports a borrowed family without a concept registry", () => {
    const result = run(scienceFiles([FAMILY, "no-such-o"]));
    expect(errors(result).filter((i) => i.file === SCIENCE_SYLLABUS).map((i) => i.code)).toContain("family-unknown");
  });
});
