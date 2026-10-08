/**
 * Generic DEV smoke for one content family (after content:import + content:publish into the DEV database).
 *
 * For each syllabus file of the family a fresh full-access student is enrolled through the real enrolment service,
 * and then:
 *   1. sees the pinned syllabus topic tree (top-level topics exactly as in the syllabus file);
 *   2. opens EVERY published pipeline lesson tagged in the syllabus (rendered HTML, no KaTeX errors);
 *   3. practises the two topics with the most questions: the drawn questions are pipeline questions of that topic
 *      subtree, and each one answered with its file's modelResponse earns every auto-marked mark;
 *   4. starts EVERY topic test and mock of the syllabus (a fresh student per paper: the answer-rate throttle), checks the
 *      blueprint's question count, marks and timer, answers with the model responses, submits, and checks that the
 *      auto-marked questions score full marks.
 *
 * Run: npx tsx --conditions=react-server .scratch/tools/smoke-family.ts <family>
 */
import path from "node:path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env"), quiet: true });
process.env.LOG_LEVEL ??= "error";

const FAMILY = process.argv[2] ?? "";
if (!FAMILY) throw new Error("usage: smoke-family.ts <family>");
const FAMILIES = [FAMILY];
const isPipeline = (ref: string | null | undefined): boolean => FAMILIES.some((f) => (ref ?? "").startsWith(`content:${f}:`));
/** "content:<family>:<key>" -> "<family>:<key>" (the source map key). */
const sourceKey = (ref: string | null | undefined): string => (ref ?? "").slice("content:".length);

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
  const { buildSyllabusModel, planTags } = await import("@/server/content-pipeline/resolve");
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

  const tree = loadContentTree(process.cwd(), { families: FAMILIES });
  const source = new Map<string, SourceQuestion>(tree.questions.map((q) => [`${q.family}:${q.data.key}`, q.data as unknown as SourceQuestion]));
  const targets = tree.syllabi
    .filter((syl) => syl.data.family === FAMILY)
    .map((syl) => {
      const model = buildSyllabusModel(syl).model;
      const counts = new Map<string, number>();
      const tops = syl.data.topics.flatMap((t) => (t.kind === "SECTION" ? t.children : [t])).map((t) => t.key);
      for (const loaded of tree.questions) {
        const plan = planTags(loaded.data.concepts, loaded.data.applies, [model])[0];
        if (!plan) continue;
        const hit = new Set(plan.nodes.flatMap((n) => [...n.lineage, n.key]).filter((k) => tops.includes(k)));
        for (const k of hit) counts.set(k, (counts.get(k) ?? 0) + 1);
      }
      const practice = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => k);
      return { board: syl.data.board, qualification: syl.data.qualification, subject: syl.data.subject, practice };
    });
  for (const target of targets) {
  const syllabusRef = `${target.board}/${target.qualification}/${target.subject}`;
  const file = tree.syllabi.find((s) => s.data.board === target.board && s.data.qualification === target.qualification && s.data.subject === target.subject);
  if (!file) throw new Error(`no syllabus file for ${syllabusRef}`);
  const label = syllabusRef;
  const practice = target.practice;
  console.log(`\n================ ${label}`);
  const subject = await db.subject.findFirstOrThrow({
    where: { slug: target.subject, qualification: { slug: target.qualification, examBoard: { slug: target.board } } },
    select: { id: true, name: true, catalogueStatus: true },
  });
  check(`${label}: subject is available in the catalogue`, subject.catalogueStatus === "AVAILABLE", `catalogue status ${subject.catalogueStatus}`);

  // A fresh full-access student (PROMO grant of every learning feature), enrolled through the real service. Each paper
  // in step 4 gets its own student: one student answering 21 papers in a few seconds trips the answer-rate throttle.
  async function freshStudent(tag: string) {
    const email = `smoke.${FAMILY}.${tag}.${uniqueSuffix()}@example.test`;
    const { user } = await createStudent({ email, firstName: "Smoke", student: { isMinor: false } });
    await grantLearnerFeatures(user.id, { ...UNLIMITED_LEARNING_FEATURES });
    const learner = learnerActor(user.id);
    await enrolInSubjects(learner, { subjectIds: [subject.id] });
    return { user, email, actor: learner };
  }
  const { user, email, actor } = await freshStudent(target.board);
  const pin = await db.subjectEnrollment.findFirstOrThrow({
    where: { userId: user.id, subjectId: subject.id },
    select: { syllabus: { select: { id: true, versionLabel: true, status: true } } },
  });
  check(`${label}: enrolment pins ${file.data.versionLabel}`, pin.syllabus.versionLabel === file.data.versionLabel, `${pin.syllabus.versionLabel} (${pin.syllabus.status}), student ${email}`);
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

  // 2. Lessons: every published pipeline lesson tagged in this syllabus (own or borrowed) opens, unlocked, and renders.
  const lessons = await db.lesson.findMany({
    where: { OR: FAMILIES.map((f) => ({ externalRef: { startsWith: `content:${f}:` } })), status: "PUBLISHED", draftOfId: null, topics: { some: { topic: { syllabusId } } } },
    select: { id: true, externalRef: true, topics: { where: { topic: { syllabusId } }, select: { topicId: true }, take: 1 } },
  });
  let rendered = 0;
  let withMath = 0;
  const lessonProblems: string[] = [];
  const byFamily = new Map<string, number>();
  for (const lesson of lessons) {
    const fam = sourceKey(lesson.externalRef).split(":")[0] ?? "?";
    byFamily.set(fam, (byFamily.get(fam) ?? 0) + 1);
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
  const ownLessons = byFamily.get(FAMILY) ?? 0;
  const ownLessonFiles = tree.lessons.filter((l) => l.family === FAMILY).length;
  check(
    `${label}: lessons render for the student`,
    lessons.length > 0 && lessonProblems.length === 0,
    `${rendered}/${lessons.length} published lessons tagged in this syllabus render (${withMath} with KaTeX maths; by family ${[...byFamily].map(([f, n]) => `${f} ${n}`).join(", ")}; ${ownLessonFiles} own lesson files)${lessonProblems.length ? `; problems: ${lessonProblems.slice(0, 5).join("; ")}` : ""}`,
  );

  // 3. Practice on four topics.
  for (const nodeKey of practice) {
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
    const fromBank = slots.filter((s) => isPipeline(s.question.externalRef));
    const inTopic = slots.filter((s) => s.question.topics.some((t) => subtree.includes(t.topic.path)));
    check(
      `${label}: practice on ${nodeKey} draws the new questions`,
      slots.length === 10 && started.shortfall === 0 && fromBank.length === slots.length && inTopic.length === slots.length,
      `${slots.length} drawn (shortfall ${started.shortfall}), ${fromBank.length} pipeline questions, ${inTopic.length} in the topic subtree; topic page lists ${page.lessons.length} lesson(s)`,
    );
    let correct = 0;
    let partial = 0;
    const wrong: string[] = [];
    for (const slot of slots) {
      const key = sourceKey(slot.question.externalRef);
      const q = source.get(key);
      if (!q) {
        wrong.push(`${key}: not in the files`);
        continue;
      }
      const manual = manualMarks(q);
      if (manual === q.marks) {
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

  // 4. Every topic test and both mocks: start, check the drawn paper, answer with the model responses, submit.
  const catalogue = await getExamCatalogue(actor, { subjectId: subject.id });
  const listed = catalogue.groups.flatMap((g) => g.items);
  const assessmentsInFiles = tree.assessments.filter((a) => a.family === FAMILY).map((a) => a.data).filter((a) => a.syllabus === syllabusRef);
  const topicTestsInFiles = assessmentsInFiles.filter((a) => a.kind === "TOPIC_TEST");
  const listedTopicTests = topicTestsInFiles.filter((a) => listed.some((i) => i.title === a.title)).length;
  check(`${label}: every topic test is listed in the exam catalogue`, listedTopicTests === topicTestsInFiles.length, `${listedTopicTests}/${topicTestsInFiles.length} topic tests listed`);
  for (const spec of assessmentsInFiles) {
    const item = listed.find((i) => i.title === spec.title);
    if (!item) {
      check(`${label}: "${spec.title}" is listed`, false, "not in the student's exam catalogue");
      continue;
    }
    const { actor } = await freshStudent("paper");
    const ruleCount = spec.sections.reduce((t, s) => t + s.rules.reduce((u, r) => u + r.count, 0), 0);
    const expectedMarks = spec.sections.reduce((t, s) => t + (s.answerCount ? (s.marks ?? 0) : s.rules.reduce((u, r) => u + r.count * (r.marksPerQuestion ?? 0), 0)), 0);
    const started = await startExam(actor, { assessmentId: item.id });
    const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: started.attemptId }, select: { deadlineAt: true, startedAt: true } });
    const slots = await db.questionAttempt.findMany({
      where: { attemptId: started.attemptId },
      orderBy: { position: "asc" },
      select: { position: true, sectionNumber: true, marksAvailable: true, question: { select: { id: true, externalRef: true, type: true } } },
    });
    const papers = await db.assessmentAttemptSection.findMany({ where: { attemptId: started.attemptId }, select: { sectionNumber: true, answerCount: true, maxMarks: true } });
    const paperMarks = papers.reduce(
      (t, p) => t + (p.answerCount !== null ? (p.maxMarks ?? 0) : slots.filter((s) => s.sectionNumber === p.sectionNumber).reduce((u, s) => u + s.marksAvailable, 0)),
      0,
    );
    const minutes = attempt.deadlineAt ? Math.round((attempt.deadlineAt.getTime() - attempt.startedAt.getTime()) / 60000) : null;
    const families = new Map<string, number>();
    for (const s of slots) {
      const fam = sourceKey(s.question.externalRef).split(":")[0] ?? "?";
      families.set(fam, (families.get(fam) ?? 0) + 1);
    }
    check(
      `${label}: "${spec.title}" starts`,
      slots.length === ruleCount && slots.every((s) => isPipeline(s.question.externalRef)) && paperMarks === expectedMarks && minutes === spec.timeLimitMinutes,
      `${slots.length}/${ruleCount} questions drawn in ${papers.length} section(s) (${[...families].map(([f, n]) => `${f} ${n}`).join(", ")}), ${paperMarks}/${expectedMarks} marks, ${minutes} min timer, listed as ${item.kind}`,
    );
    let version = 0;
    const rejected: string[] = [];
    for (const slot of slots) {
      const key = sourceKey(slot.question.externalRef);
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
      select: { marksAwarded: true, marksAvailable: true, markingStatus: true, question: { select: { externalRef: true } } },
    });
    const short: string[] = [];
    let autoFull = 0;
    let selfMarked = 0;
    for (const row of marked) {
      const q = source.get(sourceKey(row.question.externalRef));
      if (!q) continue;
      const expected = q.marks - manualMarks(q);
      if (manualMarks(q) > 0) selfMarked += 1;
      if ((row.marksAwarded ?? 0) >= expected) autoFull += 1;
      else short.push(`${sourceKey(row.question.externalRef)}: ${row.marksAwarded}/${row.marksAvailable} (${row.markingStatus})`);
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
