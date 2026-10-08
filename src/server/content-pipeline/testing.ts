import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * Test fixtures for the content pipeline: a small, VALID content tree (one family, one or more syllabus files, a
 * lesson, questions of several types, flashcards and a topic test) written to a temporary directory. Tests mutate the
 * returned file map to produce invalid variants. Not imported by application code.
 */

export type FileMap = Record<string, string>;

export interface FixtureSubject {
  board: string;
  qualification: string;
  subject: string;
  versionLabel?: string;
}

export interface FixtureOptions {
  family?: string;
  prefix?: string;
  subjects?: FixtureSubject[];
}

export function tempRoot(label = "content"): string {
  return mkdtempSync(path.join(tmpdir(), `dz-${label}-`));
}

export function writeTree(root: string, files: FileMap): void {
  for (const [file, content] of Object.entries(files)) {
    const full = path.join(root, ...file.split("/"));
    mkdirSync(path.dirname(full), { recursive: true });
    writeFileSync(full, content);
  }
}

export function removeTree(root: string): void {
  rmSync(root, { recursive: true, force: true });
}

export const json = (value: unknown): string => `${JSON.stringify(value, null, 2)}\n`;

const LESSON_BODY = `## Introduction

Rudo sells tomatoes at Mbare market. She wants to know how many crates she must sell to cover her costs, so she writes
an equation. This lesson shows how equations like hers are formed and solved, step by step.

## Key definitions

:::definition{term="Equation"}
A statement that two expressions are equal, such as $2x + 3 = 11$.
:::

## Solving one-step and two-step equations

To solve an equation, do the same operation to both sides until the unknown is on its own.

:::worked-solution[Solve $2x + 3 = 11$]
1. Subtract 3 from both sides: $2x = 8$.
2. Divide both sides by 2: $x = 4$.
3. Check: $2 \\times 4 + 3 = 11$.
:::

:::worked-solution[Solve $5x - 7 = 18$]
1. Add 7 to both sides: $5x = 25$.
2. Divide both sides by 5: $x = 5$.
:::

## Common mistakes

:::mistake{title="Doing different things to each side"}
Subtracting 3 from the left-hand side only changes the equation. Whatever you do to one side, do to the other.
:::

## Exam tips

:::exam-tip
Write one step per line and check your answer by substituting it back into the original equation.
:::

## Summary

:::summary
- An equation states that two expressions are equal.
- Do the same operation to both sides.
- Check the answer by substitution.
:::
`;

/** A valid content tree (paths relative to the repository root). */
export function fixtureFiles(options: FixtureOptions = {}): FileMap {
  const family = options.family ?? "testmaths-o";
  const prefix = options.prefix ?? "tm";
  const subjects = options.subjects ?? [
    { board: "boarda", qualification: "o-level", subject: "maths" },
    { board: "boardb", qualification: "igcse", subject: "maths" },
  ];
  const c = (name: string) => `${prefix}.algebra.${name}`;
  const files: FileMap = {};
  files[`content/concepts/${family}.json`] = json({
    family,
    name: "Test mathematics",
    level: "O",
    prefix,
    subjects: subjects.map((s) => `${s.board}/${s.qualification}/${s.subject}`),
    concepts: [
      { key: c("linear-equations"), name: "Linear equations" },
      { key: c("quadratic-equations"), name: "Quadratic equations" },
      { key: c("unused"), name: "A concept without content" },
    ],
  });
  subjects.forEach((s, index) => {
    const version = s.versionLabel ?? "2030-2032";
    const subjectPath = `${s.board}/${s.qualification}/${s.subject}`;
    files[`content/syllabi/${subjectPath}/${version}.json`] = json({
      board: s.board,
      qualification: s.qualification,
      subject: s.subject,
      versionLabel: version,
      family,
      title: `Test syllabus ${index + 1}`,
      code: null,
      effectiveFrom: "2030-01-01",
      effectiveTo: "2032-12-31",
      officialDocument: { title: `Test syllabus document ${index + 1}`, url: "https://example.org/syllabus.pdf", publisher: "Test board" },
      notes: ["Fixture."],
      components: [{ code: "1", name: "Paper 1" }],
      topics: [
        {
          key: "algebra",
          code: "1",
          name: "Algebra",
          children: [
            {
              key: "algebra.linear",
              code: "1.1",
              name: "Linear equations",
              covers: [c("linear-equations")],
              objectives: [{ code: "1.1.1", text: "Solve linear equations in one unknown." }],
            },
            { key: "algebra.quadratic", code: "1.2", name: "Quadratic equations", covers: [c("quadratic-equations"), c("unused")] },
          ],
        },
        { key: "geometry", code: "2", name: "Geometry" },
      ],
    });
  });
  const first = subjects[0] as FixtureSubject;
  files[`content/subjects/${family}/lessons/algebra/linear-equations.md`] = `---\n${json({
    key: "linear.solving",
    title: "Solving linear equations",
    summary: "Solve one-step and two-step linear equations and check the answer.",
    concepts: [c("linear-equations")],
    objectives: [`${first.board}/${first.qualification}/${first.subject}:1.1.1`],
    estimatedMinutes: 6,
    freePreview: true,
  }).trim()}\n---\n${LESSON_BODY}`;
  files[`content/subjects/${family}/questions/algebra/equations.json`] = json([
    {
      key: "linear.q01",
      type: "MULTIPLE_CHOICE",
      concepts: [c("linear-equations")],
      difficulty: 2,
      marks: 1,
      estimatedSeconds: 45,
      stem: "Solve $2x + 3 = 11$.",
      options: [
        { key: "A", content: "$x = 4$", correct: true, rationale: "$2x = 8$." },
        { key: "B", content: "$x = 7$", rationale: "Added 3 instead of subtracting." },
        { key: "C", content: "$x = 5.5$", rationale: "Divided 11 by 2 first." },
        { key: "D", content: "$x = 16$", rationale: "Multiplied instead of dividing." },
      ],
      explanation: "Subtract 3, then divide by 2: $x = 4$.",
      hints: ["Undo the $+3$ first."],
      modelResponse: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] },
      wrongResponses: [{ type: "MULTIPLE_CHOICE", optionKeys: ["B"] }],
      skill: "APPLICATION",
      dailyEligible: true,
    },
    {
      key: "linear.q02",
      type: "NUMERICAL",
      concepts: [c("linear-equations")],
      difficulty: 2,
      marks: 1,
      estimatedSeconds: 60,
      stem: "Solve $5x - 7 = 18$.",
      payload: { answerPrefix: "x =" },
      answerSpec: { value: 5 },
      explanation: "Add 7, then divide by 5.",
      workedSolution: "1. $5x = 25$.\n2. $x = 5$.",
      modelResponse: { type: "NUMERICAL", value: "5" },
      wrongResponses: [{ type: "NUMERICAL", value: "2.2" }],
      skill: "APPLICATION",
    },
    {
      key: "linear.q03",
      type: "TRUE_FALSE",
      concepts: [c("linear-equations")],
      difficulty: 1,
      marks: 1,
      estimatedSeconds: 30,
      stem: "True or false: $x = 3$ is the solution of $x + 4 = 7$.",
      answerSpec: { correct: true },
      explanation: "$3 + 4 = 7$.",
      modelResponse: { type: "TRUE_FALSE", value: true },
      skill: "RECALL",
    },
    {
      key: "quadratic.q01",
      type: "STRUCTURED",
      concepts: [c("quadratic-equations")],
      difficulty: 3,
      marks: 3,
      estimatedSeconds: 240,
      stem: "This question is about $x^2 - x - 12 = 0$.",
      parts: [
        {
          label: "(a)",
          type: "SHORT_ANSWER",
          marks: 2,
          stem: "Factorise $x^2 - x - 12$.",
          answerSpec: { accepted: [{ value: "(x-4)(x+3)" }, { value: "(x+3)(x-4)" }], normalise: ["remove_whitespace"] },
        },
        { label: "(b)", type: "NUMERICAL", marks: 1, stem: "Write down the positive solution.", answerSpec: { value: 4 } },
      ],
      explanation: "$(x - 4)(x + 3) = 0$, so $x = 4$ or $x = -3$.",
      hints: ["The numbers multiply to $-12$ and add to $-1$."],
      modelResponse: { type: "STRUCTURED", parts: { "(a)": { type: "SHORT_ANSWER", text: "(x - 4)(x + 3)" }, "(b)": { type: "NUMERICAL", value: "4" } } },
      wrongResponses: [{ type: "STRUCTURED", parts: { "(a)": { type: "SHORT_ANSWER", text: "(x+4)(x-3)" }, "(b)": { type: "NUMERICAL", value: "3" } } }],
      skill: "APPLICATION",
      examStyle: true,
    },
  ]);
  files[`content/subjects/${family}/flashcards/algebra/equations.json`] = json([
    { key: "linear.card.equation", cardType: "DEFINITION", front: "What is an **equation**?", back: "A statement that two expressions are equal.", concepts: [c("linear-equations")] },
    { key: "quadratic.card.form", cardType: "FORMULA", front: "General form of a quadratic equation", back: "$ax^2 + bx + c = 0$ with $a \\neq 0$", concepts: [c("quadratic-equations")] },
  ]);
  files[`content/subjects/${family}/assessments/algebra/linear-test.json`] = json([
    {
      key: "linear.topic-test",
      kind: "TOPIC_TEST",
      title: "Linear equations: topic test",
      timeLimitMinutes: 4,
      scope: { concepts: [c("linear-equations")] },
      sections: [{ title: "Questions", rules: [{ concepts: [c("linear-equations")], count: 2, difficulty: [1, 3], marksPerQuestion: 1 }] }],
    },
  ]);
  return files;
}

/** Parses a JSON fixture file, applies `edit`, and writes it back into the map. */
export function editJson<T>(files: FileMap, file: string, edit: (value: T) => T | void): void {
  const value = JSON.parse(files[file] as string) as T;
  const result = edit(value);
  files[file] = json(result === undefined ? value : result);
}

/** A 1×1 transparent PNG (valid image bytes for media fixtures). */
export const TINY_PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");
