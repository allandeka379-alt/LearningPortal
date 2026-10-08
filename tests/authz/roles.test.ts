import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { canViewClass as analyticsCanViewClass, getParentLinkPermissions, isSchoolAdmin } from "@/server/analytics/access";
import { loadActor, type Actor } from "@/server/auth/actor";
import { canViewClass, canViewStudent, isActiveSchoolAdmin } from "@/server/auth/rbac";
import { db } from "@/server/db";
import { canParentReadAiConversations, getChildAiConversation, listChildAiConversations } from "@/server/family/ai-conversations";
import { requestLinkByContact, revokeLink, setAiConversationAccess, updateLinkPermissions } from "@/server/family/links";
import { getParentChildDetail, getParentDashboard, listParentChildren, requireLinkedChild } from "@/server/family/queries";
import { withAiScope, withUserContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import { getSchoolClass, removeClassTeacher } from "@/server/schools/classes";
import { getSchoolDashboard } from "@/server/schools/dashboard";
import { listSchoolReports, openSchoolReport } from "@/server/schools/reports";
import { getSchoolStudent, listSchoolStudents } from "@/server/schools/students";
import { deactivateTeacher } from "@/server/schools/teachers";
import { getClassPerformance, getClassStudentPerformance, getClassTopicPerformance } from "@/server/teaching/analytics";
import { getClassRoster, listTeacherClasses } from "@/server/teaching/classes";
import { getAttemptForMarking, listMarkingQueue } from "@/server/teaching/marking";
import {
  createAttemptWithAnswers,
  createClass,
  createEnrollment,
  createLearner,
  createLearningSetup,
  createParent,
  createSchool,
  createSchoolMember,
  createTeacher,
  createUser,
  linkParent,
  UNLIMITED_LEARNING_FEATURES,
  type LearningSetup,
} from "../factories/index";

/**
 * Cross-cutting authorization matrix for the PARENT (§21), TEACHER (§22) and SCHOOL ADMIN (§23) areas
 * (ARCHITECTURE §5.2 / §5.3 / §4.9). One world, every role, allow AND deny:
 *
 * - parents: linked vs unlinked vs pending vs revoked vs another child's parent; per-link permission flags;
 * - teachers: teacher of the class vs teacher of another class vs removed from the class vs removed from the school vs
 *   another school's teacher vs a suspended school; subject scope; own practice never reachable;
 * - school admins: own vs other school, suspended school, removed admin, non-admin roles; audited record views;
 * - AI conversations: never in any role-area read model; no path for teachers / school admins; parents only with
 *   platform switch AND student consent AND row-level security (the DB policy does not check the switch).
 *
 * Runs as app_rw (NOBYPASSRLS) against the test database; every row is created here with unique values.
 */

const switchOn = async () => true;
const switchOff = async () => false;

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${(error as Error).message}`;
  }
}

async function actorOf(userId: string): Promise<Actor> {
  const actor = await loadActor(userId);
  if (!actor) throw new Error("actor not loadable");
  return actor;
}

const TODAY = localDateString(new Date(), "Africa/Harare");
const RANGE = { from: addDays(TODAY, -30), to: TODAY };

let maths: LearningSetup;
let science: LearningSetup;

type Name =
  | "adminA" | "removedAdmin" | "adminB" | "adminC"
  | "teacherA" | "teacherA2" | "coRemoved" | "leftSchool" | "tutor" | "teacherParent" | "teacherB" | "teacherC"
  | "S" | "studentB" | "studentC"
  | "parentLinked" | "parentUnlinked" | "parentRevoked" | "parentPending" | "parentOfOther" | "parentFlags" | "parentAi";

// People (user ids) and actors.
const id = {} as Record<Name, string>;
const actor = {} as Record<Name, Actor>;
// Rows.
let schoolA: string;
let schoolB: string;
let schoolC: string;
let classA: string; // school A, maths: teacherA (LEAD), coRemoved + leftSchool (ASSISTANT, removed later); student S
let classA2: string; // school A, maths: teacherA2 only (no S)
let classB: string; // school B: teacherB; studentB
let classC: string; // school C (SUSPENDED later): teacherC; studentC
let classT: string; // independent tutor, no subject, no work: tutor; student S
let linkFlags: string; // parentFlags <-> S
let linkAi: string; // parentAi <-> S
let reportB: string;

// AI conversation of S with recognisable content.
const SECRET_TITLE = `ai-secret-title-${randomUUID()}`;
const SECRET_TEXT = `ai-secret-message-${randomUUID()}`;
let conversationId: string;

beforeAll(async () => {
  maths = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
  science = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });

  // --- School A (ACTIVE) ---------------------------------------------------------------------------------------------
  schoolA = (await createSchool()).school.id;
  id.adminA = (await createUser({ firstName: "AdminA" })).user.id;
  await createSchoolMember({ schoolId: schoolA, userId: id.adminA, role: "SCHOOL_ADMIN" });
  id.removedAdmin = (await createUser({ firstName: "Former" })).user.id;
  await createSchoolMember({ schoolId: schoolA, userId: id.removedAdmin, role: "SCHOOL_ADMIN", status: "REMOVED" });
  for (const name of ["teacherA", "teacherA2", "coRemoved", "leftSchool", "tutor"] as const) {
    id[name] = (await createTeacher({ firstName: name })).user.id;
  }
  id.teacherParent = (await createTeacher({ firstName: "Dual", extraRoles: ["PARENT"] })).user.id;
  // Detailed parent reports follow the child's plan (§31 parentReports): S's plan includes them.
  const student = await createLearner({ firstName: "Sipho", features: { ...UNLIMITED_LEARNING_FEATURES, parentReports: true } });
  id.S = student.userId;
  classA = (
    await createClass({
      schoolId: schoolA,
      createdById: id.teacherA,
      teacherUserIds: [id.teacherA, id.coRemoved, id.leftSchool],
      studentUserIds: [id.S],
      subjectId: maths.subjectId,
      name: "Form 4 Maths",
    })
  ).class.id;
  classA2 = (await createClass({ schoolId: schoolA, createdById: id.teacherA2, subjectId: maths.subjectId, name: "Form 4 Maths B" })).class.id;
  // A TEACHER+PARENT who teaches S but is NOT linked to S as a parent.
  await createClass({ schoolId: schoolA, createdById: id.teacherParent, studentUserIds: [id.S], subjectId: maths.subjectId, name: "Form 4 Maths C" });
  classT = (await createClass({ schoolId: null, createdById: id.tutor, studentUserIds: [id.S], subjectId: null, name: "Saturday tutoring" })).class.id;

  // S studies maths (the class subject) and science (outside every class's scope).
  for (const setup of [maths, science]) {
    await createEnrollment(id.S, setup);
    await db.subjectProgress.create({ data: { userId: id.S, subjectId: setup.subjectId, averageScorePercent: setup === maths ? 70 : 15, progressPercent: 30 } });
    await db.topicMastery.create({
      data: {
        userId: id.S,
        topicId: setup.topicIds[0] as string,
        subjectId: setup.subjectId,
        syllabusId: setup.syllabusId,
        topicKind: "TOPIC",
        score: setup === maths ? 72 : 12,
        band: setup === maths ? "COMPETENT" : "WEAK",
        questionsAttempted: 10,
        questionsCorrect: setup === maths ? 7 : 1,
        lastPracticedAt: new Date(),
      },
    });
  }

  // --- School B (ACTIVE, another school) -----------------------------------------------------------------------------
  schoolB = (await createSchool()).school.id;
  id.adminB = (await createUser({ firstName: "AdminB" })).user.id;
  await createSchoolMember({ schoolId: schoolB, userId: id.adminB, role: "SCHOOL_ADMIN" });
  id.teacherB = (await createTeacher({ firstName: "TeacherB" })).user.id;
  id.studentB = (await createLearner({ firstName: "Busi" })).userId;
  classB = (await createClass({ schoolId: schoolB, createdById: id.teacherB, studentUserIds: [id.studentB], subjectId: maths.subjectId })).class.id;
  reportB = (
    await db.schoolReport.create({
      data: {
        schoolId: schoolB,
        kind: "class_results",
        periodStart: new Date(`${addDays(TODAY, -10)}T00:00:00Z`),
        periodEnd: new Date(`${addDays(TODAY, -1)}T00:00:00Z`),
        parameters: { format: "CSV" },
        requestedById: id.adminB,
      },
      select: { id: true },
    })
  ).id;

  // --- School C (SUSPENDED after its classes exist) -------------------------------------------------------------------
  schoolC = (await createSchool()).school.id;
  id.adminC = (await createUser({ firstName: "AdminC" })).user.id;
  await createSchoolMember({ schoolId: schoolC, userId: id.adminC, role: "SCHOOL_ADMIN" });
  id.teacherC = (await createTeacher({ firstName: "TeacherC" })).user.id;
  id.studentC = (await createLearner({ firstName: "Chido" })).userId;
  classC = (await createClass({ schoolId: schoolC, createdById: id.teacherC, studentUserIds: [id.studentC], subjectId: maths.subjectId })).class.id;
  await db.school.update({ where: { id: schoolC }, data: { status: "SUSPENDED" } });

  // --- Parents ---------------------------------------------------------------------------------------------------------
  for (const name of ["parentLinked", "parentUnlinked", "parentRevoked", "parentPending", "parentOfOther", "parentFlags", "parentAi"] as const) {
    id[name] = (await createParent({ firstName: name })).user.id;
  }
  await linkParent({ parentUserId: id.parentLinked, studentUserId: id.S });
  linkFlags = (await linkParent({ parentUserId: id.parentFlags, studentUserId: id.S })).link.id;
  linkAi = (await linkParent({ parentUserId: id.parentAi, studentUserId: id.S })).link.id;
  await linkParent({ parentUserId: id.parentOfOther, studentUserId: id.studentB });
  const revokedLink = (await linkParent({ parentUserId: id.parentRevoked, studentUserId: id.S })).link.id;

  for (const key of Object.keys(id) as Name[]) {
    if (key === "adminC") continue; // loadActor drops a suspended school's memberships; see the suspended-school tests.
    actor[key] = await actorOf(id[key]);
  }
  await revokeLink(actor.S, { linkId: revokedLink, reason: "No longer needed" });
  const studentEmail = (await db.user.findUniqueOrThrow({ where: { id: id.S }, select: { emailNormalized: true } })).emailNormalized;
  await requestLinkByContact(actor.parentPending, { identifier: studentEmail, relationship: "PARENT" });

  // --- AI conversation of S (owner context: row-level security applies) -------------------------------------------------
  const at = new Date();
  conversationId = await withUserContext(id.S, async (tx) => {
    const conversation = await tx.aiConversation.create({
      data: { userId: id.S, mode: "TUTOR", title: SECRET_TITLE, status: "ACTIVE", messageCount: 1, userMessageCount: 1, lastMessageAt: at },
      select: { id: true },
    });
    await tx.aiMessage.create({ data: { conversationId: conversation.id, role: "USER", content: SECRET_TEXT, createdAt: at } });
    return conversation.id;
  });
}, 120_000);

afterAll(async () => {
  if (conversationId) await withAiScope("system", null, (tx) => tx.aiConversation.deleteMany({ where: { id: conversationId } }));
});

/** Every serialized read model of the role areas must be free of the AI conversation's id, title and text. */
function expectNoAiData(value: unknown): void {
  const json = JSON.stringify(value);
  expect(json).not.toContain(SECRET_TITLE);
  expect(json).not.toContain(SECRET_TEXT);
  expect(json).not.toContain(conversationId);
}

// =====================================================================================================================
// Parents (§21)
// =====================================================================================================================

describe("parent area: only ACTIVE linked children", () => {
  it("a linked parent sees the child, with every section the link allows", async () => {
    const child = await requireLinkedChild(actor.parentLinked, id.S);
    expect(child.studentUserId).toBe(id.S);
    const detail = await getParentChildDetail(actor.parentLinked, id.S);
    expect(detail.overview.visibleSections).toEqual(
      expect.arrayContaining(["subjects", "examCountdown", "progress", "weakAreas", "studyTime", "activityCalendar", "testResults"]),
    );
    expect((await listParentChildren(actor.parentLinked)).map((c) => c.studentUserId)).toEqual([id.S]);
    expect(await canViewStudent(actor.parentLinked, id.S)).toMatchObject({ via: "parent" });
    expect(await getParentLinkPermissions(id.parentLinked, id.S)).toEqual({ canViewProgress: true, canViewStudyActivity: true, canViewTestResults: true });
  });

  it.each([
    ["an unlinked parent", "parentUnlinked"],
    ["a parent whose request is still PENDING", "parentPending"],
    ["a parent whose link was REVOKED", "parentRevoked"],
    ["another child's parent", "parentOfOther"],
    ["a TEACHER+PARENT who only teaches the child", "teacherParent"],
  ] as const)("%s gets NOT_FOUND and an empty dashboard", async (_label, who: Name) => {
    const parent = actor[who];
    expect(await codeOf(requireLinkedChild(parent, id.S))).toBe("NOT_FOUND");
    expect(await codeOf(getParentChildDetail(parent, id.S))).toBe("NOT_FOUND");
    expect((await getParentDashboard(parent)).map((d) => d.child.studentUserId)).not.toContain(id.S);
    expect(await getParentLinkPermissions(parent.userId, id.S)).toBeNull();
  });

  it("a linked parent cannot reach a child they are not linked to; non-parents are refused outright", async () => {
    expect(await codeOf(getParentChildDetail(actor.parentLinked, id.studentB))).toBe("NOT_FOUND");
    expect(await codeOf(getParentChildDetail(actor.parentLinked, "not-a-uuid"))).toBe("NOT_FOUND");
    expect(await codeOf(requireLinkedChild(actor.teacherA, id.S))).toBe("FORBIDDEN");
    expect(await codeOf(requireLinkedChild(actor.adminA, id.S))).toBe("FORBIDDEN");
  });

  it("switched-off permission flags remove those sections from the read model itself", async () => {
    await updateLinkPermissions(actor.S, { linkId: linkFlags, permissions: { progress: false, activity: false, results: false } });
    const none = await getParentChildDetail(actor.parentFlags, id.S);
    expect(none.overview.visibleSections).toEqual(["subjects", "examCountdown"]);
    for (const key of ["progress", "weakAreas", "studyTime", "activityCalendar", "testResults"]) expect(none.overview).not.toHaveProperty(key);
    expect(await canViewStudent(actor.parentFlags, id.S, { aspect: "progress" })).toBeNull();
    expect(await canViewStudent(actor.parentFlags, id.S, { aspect: "results" })).toBeNull();
    expect(await canViewStudent(actor.parentFlags, id.S, { aspect: "overview" })).toMatchObject({ via: "parent" });

    await updateLinkPermissions(actor.S, { linkId: linkFlags, permissions: { progress: true, activity: false, results: false } });
    const progressOnly = await getParentChildDetail(actor.parentFlags, id.S);
    expect(progressOnly.overview.visibleSections).toEqual(expect.arrayContaining(["progress", "weakAreas"]));
    expect(progressOnly.overview).not.toHaveProperty("studyTime");
    expect(progressOnly.overview).not.toHaveProperty("testResults");
    expect(await getParentLinkPermissions(id.parentFlags, id.S)).toEqual({ canViewProgress: true, canViewStudyActivity: false, canViewTestResults: false });
  });
});

// =====================================================================================================================
// Teachers (§22)
// =====================================================================================================================

describe("teacher area: only students of classes the teacher currently teaches", () => {
  it("the class's teacher sees the class and its ACTIVE student, scoped to the class subject, and the view is audited", async () => {
    const perf = await getClassPerformance(actor.teacherA, classA);
    expect(perf.analytics.subjects.map((s) => s.subjectId)).toEqual([maths.subjectId]);
    const view = await getClassStudentPerformance(actor.teacherA, classA, id.S);
    expect(view.detail.subjects.map((s) => s.subjectId)).toEqual([maths.subjectId]);
    expect(JSON.stringify(view)).not.toContain(science.subjectId);
    expect(await codeOf(getClassTopicPerformance(actor.teacherA, classA, science.topicIds[0] as string))).toBe("NOT_FOUND");
    const audits = await db.auditLog.findMany({ where: { action: "student.view", actorUserId: id.teacherA, targetUserId: id.S } });
    expect(audits).toHaveLength(1);
    expect(audits[0]).toMatchObject({ schoolId: schoolA, reason: expect.any(String) });
    expect(await canViewStudent(actor.teacherA, id.S)).toEqual({ via: "teacher", classIds: [classA], subjectIds: [maths.subjectId] });
    expect(await canViewClass(actor.teacherA, classA)).toBe(true);
    expect(await analyticsCanViewClass(id.teacherA, classA)).toBe(true);
  });

  it("a teacher of another class in the same school is refused", async () => {
    const t = actor.teacherA2;
    expect(await codeOf(getClassPerformance(t, classA))).toBe("FORBIDDEN");
    expect(await codeOf(getClassStudentPerformance(t, classA, id.S))).toBe("FORBIDDEN");
    expect(await codeOf(getClassRoster(t, classA))).toBe("FORBIDDEN");
    expect(await canViewStudent(t, id.S)).toBeNull();
    expect(await canViewClass(t, classA)).toBe(false);
    expect(await analyticsCanViewClass(t.userId, classA)).toBe(false);
    // Their own class is fine (positive control), and holds no S.
    expect((await getClassPerformance(t, classA2)).analytics.students).toEqual([]);
  });

  it("a teacher taken off the class, and a teacher removed from the school, lose access at once", async () => {
    expect(await canViewClass(actor.coRemoved, classA)).toBe(true);
    await removeClassTeacher(actor.adminA, { schoolId: schoolA, classId: classA, teacherUserId: id.coRemoved });
    expect(await codeOf(getClassStudentPerformance(actor.coRemoved, classA, id.S))).toBe("FORBIDDEN");
    expect(await canViewStudent(actor.coRemoved, id.S)).toBeNull();

    expect(await canViewClass(actor.leftSchool, classA)).toBe(true);
    const { classesEnded } = await deactivateTeacher(actor.adminA, { schoolId: schoolA, userId: id.leftSchool });
    expect(classesEnded).toBe(1); // ClassTeacher rows ended by the SchoolMember removal trigger
    expect(await codeOf(getClassPerformance(actor.leftSchool, classA))).toBe("FORBIDDEN");
    expect(await codeOf(getClassStudentPerformance(actor.leftSchool, classA, id.S))).toBe("FORBIDDEN");
    expect(await canViewStudent(actor.leftSchool, id.S)).toBeNull();
    expect((await listTeacherClasses(actor.leftSchool)).map((c) => c.id)).not.toContain(classA);
    // The remaining teacher is unaffected.
    expect((await getClassPerformance(actor.teacherA, classA)).class.id).toBe(classA);
  });

  it("another school's teacher is refused, and a teacher cannot read a non-member through their own class", async () => {
    expect(await codeOf(getClassPerformance(actor.teacherB, classA))).toBe("FORBIDDEN");
    expect(await codeOf(getClassStudentPerformance(actor.teacherB, classA, id.S))).toBe("FORBIDDEN");
    expect(await canViewStudent(actor.teacherB, id.S)).toBeNull();
    expect(await codeOf(getClassStudentPerformance(actor.teacherA, classA, id.studentB))).toBe("NOT_FOUND");
    expect(await codeOf(getClassStudentPerformance(actor.teacherA, classB, id.studentB))).toBe("FORBIDDEN");
  });

  it("a suspended school's classes are out of reach although its ClassTeacher rows remain", async () => {
    expect(await db.classTeacher.count({ where: { classId: classC, userId: id.teacherC, removedAt: null } })).toBe(1);
    expect(await codeOf(getClassPerformance(actor.teacherC, classC))).toBe("FORBIDDEN");
    expect(await codeOf(getClassStudentPerformance(actor.teacherC, classC, id.studentC))).toBe("FORBIDDEN");
    expect(await codeOf(getClassRoster(actor.teacherC, classC))).toBe("FORBIDDEN");
    expect((await listMarkingQueue(actor.teacherC)).items).toEqual([]);
  });

  it("a subject-less class with no work set shows no subject data (scope derived from assignments)", async () => {
    const view = await getClassStudentPerformance(actor.tutor, classT, id.S);
    expect(view.scope).toEqual({ subjectIds: [], derived: true });
    expect(view.detail.subjects).toEqual([]);
    expect(view.detail.recentScores).toEqual([]);
  });

  it("a student's own practice attempt is never reachable through marking", async () => {
    const question = maths.questions[0]!;
    const { attemptId } = await createAttemptWithAnswers({ userId: id.S, subjectId: maths.subjectId, questionId: question.id, topicId: question.topicId, answered: 1 });
    expect(await codeOf(getAttemptForMarking(actor.teacherA, attemptId))).toBe("NOT_FOUND");
    expect((await listMarkingQueue(actor.teacherA)).items.map((i) => i.attemptId)).not.toContain(attemptId);
  });
});

// =====================================================================================================================
// School admins (§23)
// =====================================================================================================================

describe("school admin area: own operating school only", () => {
  it("an ACTIVE admin reads their school, its students and classes; a student record view is audited", async () => {
    const dashboard = await getSchoolDashboard(actor.adminA, { schoolId: schoolA, ...RANGE });
    expectNoAiData(dashboard);
    const students = await listSchoolStudents(actor.adminA, { schoolId: schoolA });
    expect(students.items.map((s) => s.userId)).toContain(id.S);
    expect(students.items.map((s) => s.userId)).not.toContain(id.studentB);
    const record = await getSchoolStudent(actor.adminA, { schoolId: schoolA, userId: id.S });
    expect(record.userId).toBe(id.S);
    expect((await getSchoolClass(actor.adminA, { schoolId: schoolA, classId: classA })).id).toBe(classA);
    const audits = await db.auditLog.findMany({ where: { action: "student.view", actorUserId: id.adminA, targetUserId: id.S } });
    expect(audits).toHaveLength(1);
    expect(audits[0]).toMatchObject({ schoolId: schoolA, reason: expect.any(String) });
    expect(await canViewStudent(actor.adminA, id.S)).toEqual({ via: "school_admin", schoolIds: [schoolA] });
    expect(await isSchoolAdmin(id.adminA, schoolA)).toBe(true);
  });

  it("another school's data is refused (FORBIDDEN for the school, NOT_FOUND for its rows through the own school)", async () => {
    const a = actor.adminA;
    expect(await codeOf(getSchoolDashboard(a, { schoolId: schoolB, ...RANGE }))).toBe("FORBIDDEN");
    expect(await codeOf(listSchoolStudents(a, { schoolId: schoolB }))).toBe("FORBIDDEN");
    expect(await codeOf(getSchoolStudent(a, { schoolId: schoolB, userId: id.studentB }))).toBe("FORBIDDEN");
    expect(await codeOf(getSchoolStudent(a, { schoolId: schoolA, userId: id.studentB }))).toBe("NOT_FOUND");
    expect(await codeOf(getSchoolClass(a, { schoolId: schoolA, classId: classB }))).toBe("NOT_FOUND");
    expect(await codeOf(listSchoolReports(a, schoolB))).toBe("FORBIDDEN");
    expect(await codeOf(openSchoolReport(a, { reportId: reportB }))).toBe("NOT_FOUND");
    expect(await codeOf(openSchoolReport(a, { reportId: reportB, schoolId: schoolA }))).toBe("NOT_FOUND");
    expect(await canViewStudent(a, id.studentB)).toBeNull();
    expect(await isActiveSchoolAdmin(id.adminA, schoolB)).toBe(false);
    expect(await analyticsCanViewClass(id.adminA, classB)).toBe(false);
    // Positive control: school B's own admin.
    expect((await listSchoolReports(actor.adminB, schoolB)).map((r) => r.id)).toContain(reportB);
  });

  it("a suspended school's admin and a removed admin lose access; teachers and parents are not school admins", async () => {
    const suspended = { userId: id.adminC, roles: ["SCHOOL_ADMIN"] as Actor["roles"] }; // a stale / forged actor
    expect((await loadActor(id.adminC))?.roles ?? []).not.toContain("SCHOOL_ADMIN");
    expect(await codeOf(getSchoolDashboard(suspended, { schoolId: schoolC, ...RANGE }))).toBe("FORBIDDEN");
    expect(await codeOf(listSchoolStudents(suspended, { schoolId: schoolC }))).toBe("FORBIDDEN");
    expect(await codeOf(getSchoolStudent(suspended, { schoolId: schoolC, userId: id.studentC }))).toBe("FORBIDDEN");
    expect(await canViewStudent(suspended, id.studentC)).toBeNull();
    expect(await isSchoolAdmin(id.adminC, schoolC)).toBe(false);

    const removed = { userId: id.removedAdmin, roles: ["SCHOOL_ADMIN"] as Actor["roles"] };
    expect(await codeOf(getSchoolDashboard(removed, { schoolId: schoolA, ...RANGE }))).toBe("FORBIDDEN");
    expect(await codeOf(getSchoolStudent(removed, { schoolId: schoolA, userId: id.S }))).toBe("FORBIDDEN");

    expect(await codeOf(getSchoolDashboard(actor.teacherA, { schoolId: schoolA, ...RANGE }))).toBe("FORBIDDEN");
    expect(await codeOf(getSchoolStudent(actor.parentLinked, { schoolId: schoolA, userId: id.S }))).toBe("FORBIDDEN");
  });
});

// =====================================================================================================================
// AI conversations (§21, ARCHITECTURE §4.9 / §5.2 "never")
// =====================================================================================================================

describe("AI conversations are never reachable from the role areas", () => {
  it("no teacher, school admin or parent read model carries AI conversation data", async () => {
    expectNoAiData(await getClassPerformance(actor.teacherA, classA));
    expectNoAiData(await getClassStudentPerformance(actor.teacherA, classA, id.S));
    expectNoAiData(await getClassStudentPerformance(actor.tutor, classT, id.S));
    expectNoAiData(await getClassRoster(actor.teacherA, classA));
    expectNoAiData(await getSchoolStudent(actor.adminA, { schoolId: schoolA, userId: id.S }));
    expectNoAiData(await getParentChildDetail(actor.parentLinked, id.S));
    expectNoAiData(await getParentDashboard(actor.parentLinked));
  });

  it("teachers and school admins have no service path, and row-level security hides the rows from them", async () => {
    for (const who of ["teacherA", "adminA"] as const) {
      expect(await codeOf(listChildAiConversations(actor[who], id.S, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("FORBIDDEN");
      expect(await codeOf(getChildAiConversation(actor[who], id.S, conversationId, null, { isParentAiAccessEnabled: switchOn }))).toBe("FORBIDDEN");
      expect(await withUserContext(id[who], (tx) => tx.aiConversation.count({ where: { id: conversationId } }))).toBe(0);
      expect(await withAiScope("parent", id[who], (tx) => tx.aiConversation.count({ where: { id: conversationId } }))).toBe(0);
    }
    // A TEACHER+PARENT who teaches the child is not a linked parent.
    expect(await codeOf(listChildAiConversations(actor.teacherParent, id.S, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
    // No context at all: nothing.
    expect(await db.aiConversation.count({ where: { id: conversationId } })).toBe(0);
    expect(await db.aiMessage.count({ where: { conversationId } })).toBe(0);
  });

  it("a linked parent without the student's AI consent sees nothing, even with the platform switch on", async () => {
    expect(await canParentReadAiConversations(actor.parentLinked, id.S, { isParentAiAccessEnabled: switchOn })).toBe(false);
    expect(await codeOf(listChildAiConversations(actor.parentLinked, id.S, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
    expect(await withAiScope("parent", id.parentLinked, (tx) => tx.aiConversation.count({ where: { id: conversationId } }))).toBe(0);
  });

  it("with the student's consent, the SERVICE still refuses while the platform switch is OFF (the DB policy does not check it)", async () => {
    await setAiConversationAccess(actor.S, { linkId: linkAi, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn });
    // RLS alone would let this parent read the row: the platform switch is enforced only in the service.
    expect(await withAiScope("parent", id.parentAi, (tx) => tx.aiConversation.count({ where: { id: conversationId } }))).toBe(1);
    expect(await canParentReadAiConversations(actor.parentAi, id.S, { isParentAiAccessEnabled: switchOff })).toBe(false);
    expect(await codeOf(listChildAiConversations(actor.parentAi, id.S, {}, null, { isParentAiAccessEnabled: switchOff }))).toBe("NOT_FOUND");
    expect(await codeOf(getChildAiConversation(actor.parentAi, id.S, conversationId, null, { isParentAiAccessEnabled: switchOff }))).toBe("NOT_FOUND");

    // Switch ON + consent: readable (and audited); other parents and roles still not.
    const list = await listChildAiConversations(actor.parentAi, id.S, {}, null, { isParentAiAccessEnabled: switchOn });
    expect(list.items.map((i) => i.id)).toEqual([conversationId]);
    const audits = await db.auditLog.count({ where: { action: "student.view", actorUserId: id.parentAi, targetUserId: id.S } });
    expect(audits).toBe(1);
    expect(await codeOf(listChildAiConversations(actor.parentLinked, id.S, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
    expect(await codeOf(listChildAiConversations(actor.teacherA, id.S, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("FORBIDDEN");
    // The general parent read model still never includes it.
    expectNoAiData(await getParentChildDetail(actor.parentAi, id.S));

    // Revoking the link closes every gate at once.
    await revokeLink(actor.S, { linkId: linkAi });
    expect(await codeOf(listChildAiConversations(actor.parentAi, id.S, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
    expect(await withAiScope("parent", id.parentAi, (tx) => tx.aiConversation.count({ where: { id: conversationId } }))).toBe(0);
    expect(await codeOf(getParentChildDetail(actor.parentAi, id.S))).toBe("NOT_FOUND");
  });
});
