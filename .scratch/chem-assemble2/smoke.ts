/**
 * DEV smoke for the chemistry-o content family (after content:import + content:publish into the DEV database).
 *
 * For each syllabus (ZIMSEC O-Level Chemistry 2015-2022, Cambridge IGCSE Chemistry 0620 2026-2028) a fresh full-access
 * student is created, enrolled through the real enrolment service, and then:
 *   1. sees the pinned syllabus topic tree (top-level topics exactly as in the syllabus file);
 *   2. opens EVERY published pipeline lesson tagged in that syllabus (rendered HTML, no KaTeX errors, unlocked);
 *   3. practises two topics: the drawn questions are pipeline questions of that topic, and each one answered with its
 *      file's modelResponse is marked correct (full marks; parts marked by hand are excluded from the expected marks);
 *   4. starts a topic test and every mock exam of the syllabus (no shortfall, the blueprint's question count, marks
 *      and timer); multiple-choice papers contain only multiple-choice questions and theory/practical papers none;
 *      every paper is then answered with the model responses and submitted, and the auto-marked questions must score
 *      full marks.
 *
 * Run: npx tsx --conditions=react-server .scratch/chem-assemble2/smoke.ts
 */
import path from "node:path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env"), quiet: true });
process.env.LOG_LEVEL ??= "error";

const FAMILY = "chemistry-o";
const REF = `content:${FAMILY}:`;

interface Check {
  name: string;
  ok: boolean;
  detail: string;
}
const checks: Check[] = [];
function check(name: string, ok: boolean, detail = ""): void {
  checks.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

type SourcePart = { label: string; type: string; marks: number; markingMode?: string; parts?: SourcePart[] };
type SourceQuestion = { key: string; type: string; marks: number; markingMode?: string; parts?: SourcePart[]; modelResponse?: unknown; concepts: string[]; answerSpec?: { modelAnswer?: string } };

/** A response for an entirely hand-marked essay or extended response (the file's model answer), or null. */
function openResponse(q: SourceQuestion): unknown {
  if (q.type !== "EXTENDED_RESPONSE" && q.type !== "ESSAY") return null;
  return { type: q.type, text: q.answerSpec?.modelAnswer ?? "See the mark scheme." };
}

/** Marks of the parts a student marks by hand (MANUAL), which an auto-marked model response cannot earn. */
function manualMarks(q: SourceQuestion): number {
  if (q.type === "ESSAY" || q.type === "EXTENDED_RESPONSE" || q.markingMode === "MANUAL") return q.marks;
  const walk = (parts: SourcePart[] | undefined): number =>
    (parts ?? []).reduce((sum, p) => sum + (p.type === "STRUCTURED" ? walk(p.parts) : p.markingMode === "MANUAL" ? p.marks : 0), 0);
  return walk(q.parts);
}

async function main(): Promise<void> {
  const { db } = await import("@/server/db");
  const { loadContentTree } = await import("@/server/content-pipeline/load");
  const { enrolInSubjects } = await import("@/server/enrollment");
  const { getSubjectTopicTree } = await import("@/server/progress/student-overview");
  const { getLessonForStudent, getTopicPageForStudent } = await import("@/server/lessons");
  const { startPracticeSession } = await import("@/server/practice/service");
  const { answerAndMark } = await import("@/server/attempts");
  const { getExamCatalogue, startExam, saveExamResponse, submitExam } = await import("@/server/exams/service");
  const { createStudent } = await import("../../tests/factories/identity");
  const { grantLearnerFeatures, UNLIMITED_LEARNING_FEATURES, learnerActor } = await import("../../tests/factories/learning");
  const { uniqueSuffix } = await import("../../tests/factories/util");

  /**
   * The engine's response for a file's modelResponse: files key STRUCTURED parts by label path ("(a)", "(b)(i)"); the
   * engine keys them by the part's Question id (`{ parts: [{ partId, response }] }`), like import-items' partIdsOf.
   */
  async function engineResponse(questionId: string, q: SourceQuestion): Promise<unknown> {
    if (q.type !== "STRUCTURED") return q.modelResponse;
    const row = await db.question.findUniqueOrThrow({
      where: { id: questionId },
      select: { parts: { select: { id: true, partLabel: true, parts: { select: { id: true, partLabel: true } } } } },
    });
    const ids = new Map<string, string>();
    for (const part of row.parts) {
      ids.set(part.partLabel ?? "", part.id);
      for (const sub of part.parts) ids.set(`${part.partLabel ?? ""}${sub.partLabel ?? ""}`, sub.id);
    }
    const authored = (q.modelResponse as { parts: Record<string, unknown> }).parts;
    return {
      type: "STRUCTURED",
      parts: Object.entries(authored).map(([label, response]) => {
        const partId = ids.get(label);
        if (!partId) throw new Error(`${q.key}: no database part for label ${label}`);
        return { partId, response };
      }),
    };
  }

  const tree = loadContentTree(process.cwd(), { families: [FAMILY] });
  const source = new Map<string, SourceQuestion>(tree.questions.filter((q) => q.family === FAMILY).map((q) => [q.data.key, q.data as unknown as SourceQuestion]));
  const assessmentsInFiles = tree.assessments.filter((a) => a.family === FAMILY).map((a) => a.data);
  const syllabusFiles = tree.syllabi.filter((s) => s.data.family === FAMILY);

  const targets = [
    {
      board: "zimsec",
      qualification: "o-level",
      version: "2015-2022",
      practice: ["mole-concept.mole", "metals-and-non-metals.extraction-of-metals"],
      topicTest: "zimsec.equilibria.topic-test",
      mcqPapers: ["mock.zimsec.paper-1"],
    },
    {
      board: "cambridge",
      qualification: "igcse",
      version: "2026-2028",
      practice: ["stoichiometry.mole", "organic.alkenes"],
      topicTest: "cambridge.stoichiometry.topic-test",
      mcqPapers: ["mock.cambridge.paper-2"],
    },
  ];

  for (const target of targets) {
    const label = `${target.board}/${target.qualification}/chemistry`;
    console.log(`\n================ ${label}`);
    const subject = await db.subject.findFirstOrThrow({
      where: { slug: "chemistry", qualification: { slug: target.qualification, examBoard: { slug: target.board } } },
      select: { id: true, name: true, catalogueStatus: true },
    });
    check(`${label}: subject is available in the catalogue`, subject.catalogueStatus === "AVAILABLE", `catalogue status ${subject.catalogueStatus}`);
    const file = syllabusFiles.find((s) => s.data.board === target.board && s.data.versionLabel === target.version);
    if (!file) throw new Error(`no syllabus file for ${label}`);

    // A fresh full-access student (PROMO grant of every learning feature), enrolled through the real service.
    const email = `smoke.${FAMILY}.${target.board}.${uniqueSuffix()}@example.test`;
    const { user } = await createStudent({ email, firstName: "Smoke", student: { isMinor: false } });
    await grantLearnerFeatures(user.id, { ...UNLIMITED_LEARNING_FEATURES });
    const actor = learnerActor(user.id);
    await enrolInSubjects(actor, { subjectIds: [subject.id] });
    const pin = await db.subjectEnrollment.findFirstOrThrow({
      where: { userId: user.id, subjectId: subject.id },
      select: { syllabus: { select: { id: true, versionLabel: true, status: true } } },
    });
    check(`${label}: enrolment pins ${target.version}`, pin.syllabus.versionLabel === target.version, `${pin.syllabus.versionLabel} (${pin.syllabus.status}), student ${email}`);
    const syllabusId = pin.syllabus.id;

    // 1. Topic tree.
    const topicTree = await getSubjectTopicTree(actor, subject.id);
    const flat: { id: string; name: string }[] = [];
    const walk = (nodes: { id: string; name: string; children: unknown[] }[]) => {
      for (const n of nodes) {
        flat.push({ id: n.id, name: n.name });
        walk(n.children as typeof nodes);
      }
    };
    walk(topicTree as unknown as { id: string; name: string; children: unknown[] }[]);
    const wantTop = file.data.topics.map((t) => t.name.trim());
    const gotTop = topicTree.map((t) => t.name.trim());
    let fileNodes = 0;
    const count = (nodes: typeof file.data.topics) => nodes.forEach((n) => ((fileNodes += 1), count(n.children)));
    count(file.data.topics);
    check(
      `${label}: topic tree has the ${wantTop.length} top-level topics of the syllabus`,
      JSON.stringify(gotTop) === JSON.stringify(wantTop) && flat.length === fileNodes,
      `${gotTop.length} top-level, ${flat.length} nodes in the database (${fileNodes} in the file)`,
    );
    const topicRows = await db.topic.findMany({ where: { syllabusId }, select: { id: true, contentKey: true, name: true, path: true } });
    const topicByKey = new Map(topicRows.map((t) => [t.contentKey ?? "", t]));

    // 2. Lessons: every published pipeline lesson tagged in this syllabus opens, unlocked, and renders.
    const lessons = await db.lesson.findMany({
      where: { externalRef: { startsWith: REF }, status: "PUBLISHED", draftOfId: null, topics: { some: { topic: { syllabusId } } } },
      select: { id: true, externalRef: true, topics: { where: { topic: { syllabusId } }, select: { topicId: true }, take: 1 } },
    });
    let rendered = 0;
    let withMath = 0;
    const lessonProblems: string[] = [];
    for (const lesson of lessons) {
      const topicId = lesson.topics[0]?.topicId ?? null;
      try {
        const view = await getLessonForStudent(actor, lesson.id, { topicId });
        const html = String(view.content?.html ?? "");
        if (view.locked || !view.content) lessonProblems.push(`${lesson.externalRef}: locked`);
        else if (html.length < 2000) lessonProblems.push(`${lesson.externalRef}: only ${html.length} characters of HTML`);
        else if (html.includes("katex-error")) lessonProblems.push(`${lesson.externalRef}: KaTeX error in the HTML`);
        else rendered += 1;
        if (view.content?.hasMath && html.includes("katex")) withMath += 1;
      } catch (error) {
        lessonProblems.push(`${lesson.externalRef}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    const lessonFiles = tree.lessons.filter((l) => l.family === FAMILY).length;
    check(
      `${label}: lessons render for the student`,
      lessons.length > 0 && lessonProblems.length === 0,
      `${rendered}/${lessons.length} published lessons tagged in this syllabus render (${withMath} with KaTeX maths; ${lessonFiles} lesson files in the family)${lessonProblems.length ? `; problems: ${lessonProblems.slice(0, 5).join("; ")}` : ""}`,
    );

    // 3. Practice on two topics.
    for (const nodeKey of target.practice) {
      const topic = topicByKey.get(nodeKey);
      if (!topic) {
        check(`${label}: practice ${nodeKey}`, false, "topic not in the database");
        continue;
      }
      const page = await getTopicPageForStudent(actor, subject.id, topic.id);
      const started = await startPracticeSession(actor, { subjectId: subject.id, topicIds: [topic.id], count: 10, difficulty: "ADAPTIVE" });
      const slots = await db.questionAttempt.findMany({
        where: { attemptId: started.attemptId },
        orderBy: { position: "asc" },
        select: { position: true, question: { select: { id: true, externalRef: true, topics: { where: { syllabusId }, select: { topic: { select: { path: true } } } } } } },
      });
      const subtree = topicRows.filter((t) => t.path === topic.path || t.path.startsWith(`${topic.path}/`)).map((t) => t.path);
      const fromBank = slots.filter((s) => s.question.externalRef?.startsWith(REF));
      const inTopic = slots.filter((s) => s.question.topics.some((t) => subtree.includes(t.topic.path)));
      check(
        `${label}: practice on ${nodeKey} draws the new questions`,
        slots.length === 10 && started.shortfall === 0 && fromBank.length === slots.length && inTopic.length === slots.length,
        `${slots.length} drawn (shortfall ${started.shortfall}), ${fromBank.length} pipeline questions, ${inTopic.length} in the topic subtree; topic page lists ${page.lessons.length} lesson(s)`,
      );
      let correct = 0;
      let partial = 0;
      const wrong: string[] = [];
      // The slots are answered one at a time, in order (practice presents them that way).
      for (const slot of slots) {
        const key = (slot.question.externalRef ?? "").slice(REF.length);
        const q = source.get(key);
        if (!q) {
          wrong.push(`${key}: not in the files`);
          continue;
        }
        const manual = manualMarks(q);
        if (manual === q.marks) {
          // Entirely hand-marked (an extended response): answer with the model answer; nothing to auto-mark.
          const open = openResponse(q);
          if (open) await answerAndMark(actor, started.attemptId, slot.position, open);
          partial += 1;
          continue;
        }
        if (!q.modelResponse) {
          wrong.push(`${key}: no model response in the file`);
          continue;
        }
        const feedback = await answerAndMark(actor, started.attemptId, slot.position, await engineResponse(slot.question.id, q));
        const expected = q.marks - manual;
        if (manual === 0) {
          if (feedback.isCorrect === true && feedback.marksAwarded === feedback.marksAvailable) correct += 1;
          else wrong.push(`${key}: ${feedback.marksAwarded}/${feedback.marksAvailable} (${feedback.status})`);
        } else if ((feedback.marksAwarded ?? 0) >= expected) {
          partial += 1;
        } else {
          wrong.push(`${key}: ${feedback.marksAwarded}/${feedback.marksAvailable}, expected ${expected} auto marks (${feedback.status})`);
        }
      }
      check(
        `${label}: practice on ${nodeKey} marks the model responses correct`,
        wrong.length === 0,
        `${correct} fully auto-marked correct, ${partial} with self-marked parts got every auto mark${wrong.length ? `; WRONG: ${wrong.join("; ")}` : ""}`,
      );
    }

    // 4. Topic test and mock exams: start, check the drawn paper, answer with the model responses, submit.
    const catalogue = await getExamCatalogue(actor, { subjectId: subject.id });
    const listed = catalogue.groups.flatMap((g) => g.items);
    const mocksInFiles = assessmentsInFiles.filter((a) => a.kind === "MOCK_EXAM" && a.syllabus?.startsWith(`${target.board}/`));
    const topicTestsInFiles = assessmentsInFiles.filter((a) => a.kind === "TOPIC_TEST" && a.syllabus?.startsWith(`${target.board}/`));
    const listedTopicTests = topicTestsInFiles.filter((a) => listed.some((i) => i.title === a.title)).length;
    check(`${label}: every topic test is listed in the exam catalogue`, listedTopicTests === topicTestsInFiles.length, `${listedTopicTests}/${topicTestsInFiles.length} topic tests listed`);
    const wanted = [target.topicTest, ...mocksInFiles.map((a) => a.key)];
    for (const key of wanted) {
      const spec = assessmentsInFiles.find((a) => a.key === key);
      if (!spec) throw new Error(`no assessment ${key} in the files`);
      const item = listed.find((i) => i.title === spec.title);
      if (!item) {
        check(`${label}: "${spec.title}" is listed`, false, "not in the student's exam catalogue");
        continue;
      }
      const ruleCount = spec.sections.reduce((t, s) => t + s.rules.reduce((u, r) => u + r.count, 0), 0);
      const expectedMarks = spec.sections.reduce((t, s) => t + (s.answerCount ? (s.marks ?? 0) : s.rules.reduce((u, r) => u + r.count * (r.marksPerQuestion ?? 0), 0)), 0);
      const started = await startExam(actor, { assessmentId: item.id });
      const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: started.attemptId }, select: { deadlineAt: true, startedAt: true } });
      const slots = await db.questionAttempt.findMany({
        where: { attemptId: started.attemptId },
        orderBy: { position: "asc" },
        select: { position: true, sectionNumber: true, marksAvailable: true, question: { select: { id: true, externalRef: true, type: true } } },
      });
      // Paper marks: "answer any N" sections count their stated marks, other sections the marks of their questions.
      const papers = await db.assessmentAttemptSection.findMany({ where: { attemptId: started.attemptId }, select: { sectionNumber: true, answerCount: true, maxMarks: true } });
      const paperMarks = papers.reduce(
        (t, p) => t + (p.answerCount !== null ? (p.maxMarks ?? 0) : slots.filter((s) => s.sectionNumber === p.sectionNumber).reduce((u, s) => u + s.marksAvailable, 0)),
        0,
      );
      const minutes = attempt.deadlineAt ? Math.round((attempt.deadlineAt.getTime() - attempt.startedAt.getTime()) / 60000) : null;
      check(
        `${label}: "${spec.title}" starts`,
        slots.length === ruleCount && slots.every((s) => s.question.externalRef?.startsWith(REF)) && paperMarks === expectedMarks && minutes === spec.timeLimitMinutes,
        `${slots.length}/${ruleCount} questions drawn in ${papers.length} section(s), ${paperMarks}/${expectedMarks} marks, ${minutes} min timer, listed as ${item.kind} (${item.questionCount} q, ${item.totalMarks} marks)`,
      );
      if (spec.kind === "MOCK_EXAM") {
        const objective = slots.filter((s) => ["MULTIPLE_CHOICE", "TRUE_FALSE", "MATCHING"].includes(s.question.type));
        if (target.mcqPapers.includes(key)) {
          check(`${label}: "${spec.title}" contains only multiple-choice questions`, objective.length === slots.length && slots.every((s) => s.question.type === "MULTIPLE_CHOICE"), `${slots.filter((s) => s.question.type === "MULTIPLE_CHOICE").length}/${slots.length} multiple choice`);
        } else {
          const types = [...new Set(slots.map((s) => s.question.type))].join(", ");
          check(`${label}: "${spec.title}" has no multiple-choice, true/false or matching items`, objective.length === 0, `${objective.length} found; types drawn: ${types}`);
        }
      }
      let version = 0;
      const rejected: string[] = [];
      for (const slot of slots) {
        const key = (slot.question.externalRef ?? "").slice(REF.length);
        const q = source.get(key);
        if (!q) continue;
        const response = q.modelResponse ? await engineResponse(slot.question.id, q) : openResponse(q);
        if (!response) continue;
        version += 1;
        try {
          await saveExamResponse(actor, { attemptId: started.attemptId, position: slot.position, response, responseVersion: version });
        } catch (error) {
          rejected.push(`${key} (${q.type}): ${error instanceof Error ? error.message : String(error)} :: ${String(JSON.stringify(response)).slice(0, 300)}`);
        }
      }
      if (rejected.length > 0) check(`${label}: "${spec.title}" accepts every model response`, false, rejected.join(" | "));
      await submitExam(actor, { attemptId: started.attemptId, reason: "STUDENT" });
      const marked = await db.questionAttempt.findMany({
        where: { attemptId: started.attemptId },
        select: { marksAwarded: true, marksAvailable: true, markingStatus: true, isCounted: true, question: { select: { externalRef: true } } },
      });
      const short: string[] = [];
      let autoFull = 0;
      let selfMarked = 0;
      for (const row of marked) {
        const q = source.get((row.question.externalRef ?? "").slice(REF.length));
        if (!q) continue;
        const expected = q.marks - manualMarks(q);
        if (manualMarks(q) > 0) selfMarked += 1;
        if ((row.marksAwarded ?? 0) >= expected) autoFull += 1;
        else short.push(`${q.key}: ${row.marksAwarded}/${row.marksAvailable} (${row.markingStatus})`);
      }
      const result = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: started.attemptId }, select: { status: true, marksAwarded: true, totalMarks: true, percentage: true } });
      check(
        `${label}: "${spec.title}" marks the model responses`,
        short.length === 0,
        `${autoFull}/${marked.length} questions earned every auto-marked mark (${selfMarked} contain self-marked parts); attempt ${result.status}, ${result.marksAwarded}/${result.totalMarks} (${result.percentage}%) before self-marking${short.length ? `; SHORT: ${short.join("; ")}` : ""}`,
      );
    }
  }

  const failed = checks.filter((c) => !c.ok);
  console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
  process.exitCode = failed.length > 0 ? 1 : 0;
  await db.$disconnect();
}

main().catch((error: unknown) => {
  console.error("SMOKE FAILED:", error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 2;
});
