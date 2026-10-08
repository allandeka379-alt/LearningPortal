import { beforeAll, describe, expect, it } from "vitest";
import { addDays, localDateString, type LocalDate } from "@/lib/dates";
import {
  addDailyActivity,
  addSubjectProgress,
  addTopicMastery,
  createAttempt,
  createCurriculum,
  enrol,
  harareTime,
  type CurriculumFixture,
} from "@/server/analytics/testing/fixtures";
import { invalidateEntitlements } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import {
  createClass,
  createParent,
  createSchool,
  createSchoolMember,
  createStudent,
  createTeacher,
  createUser,
  grantLearnerFeatures,
  linkParent,
  uniqueEmail,
} from "../../../tests/factories/index";
import { createStudentLinkCode, requestLinkByContact, revokeLink } from "./links";
import {
  childHasParentReports,
  getParentChildDetail,
  getParentDashboard,
  getStudentFamilyView,
  getStudentLinkForConsent,
  listParentChildren,
  requireLinkedChild,
} from "./queries";
import { actorOf, errorCodeOf, switchOff, switchOn } from "./testing";

/**
 * Read models of /app/family and /parent (§21): scoping (only the student's own links, only the parent's ACTIVE
 * children) and permission-driven sections. Negative cases: unlinked parent, revoked / pending link, another parent,
 * a teacher-parent looking at a class student, a school admin.
 */

const NOW = new Date();
const TODAY: LocalDate = localDateString(NOW, "Africa/Harare");

let maths: CurriculumFixture;
beforeAll(async () => {
  maths = await createCurriculum({ topicCount: 2, examStartsOn: addDays(TODAY, 120) });
});

/** A child with data; `reports` (default true) gives the child's plan detailed parent reports (§31 parentReports). */
async function childWithData(firstName = "Tariro", options: { reports?: boolean } = {}) {
  const student = (await createStudent({ firstName, lastName: "Moyo" })).user;
  if (options.reports ?? true) await grantLearnerFeatures(student.id, { parentReports: true });
  await enrol(student.id, maths, { targetGrade: "A" });
  await addSubjectProgress(student.id, maths.subjectId, { progressPercent: 40, topicsTotal: 2, questionsAttempted: 10, questionsCorrect: 6 });
  await addTopicMastery(student.id, maths, 0, { score: 25, attempted: 4, correct: 1 });
  await addDailyActivity(student.id, addDays(TODAY, -1), { studySeconds: 1800, questionsAttempted: 6 });
  await createAttempt({
    userId: student.id,
    curriculum: maths,
    mode: "MOCK_EXAM",
    startedAt: harareTime(addDays(TODAY, -2), 9),
    submittedAt: harareTime(addDays(TODAY, -2), 11),
    percentage: 64,
    gradeIsPass: true,
    gradeEstimate: "B",
  });
  return student;
}

describe("getStudentFamilyView (/app/family)", () => {
  it("shows the student's pending requests, active parents, outstanding code and consent state only", async () => {
    const student = (await createStudent()).user;
    const studentActor = await actorOf(student.id);
    const email = uniqueEmail("kid");
    await db.user.update({ where: { id: student.id }, data: { emailNormalized: email } });

    const requester = (await createParent({ firstName: "Rumbi", lastName: "Ncube", email: uniqueEmail("rumbi") })).user;
    await requestLinkByContact(await actorOf(requester.id), { identifier: email, relationship: "GUARDIAN" });
    const linked = (await createParent({ firstName: "Grace" })).user;
    const { link } = await linkParent({ parentUserId: linked.id, studentUserId: student.id });
    const revoked = (await createParent({ firstName: "Old" })).user;
    const { link: oldLink } = await linkParent({ parentUserId: revoked.id, studentUserId: student.id });
    await revokeLink(studentActor, { linkId: oldLink.id });
    const code = await createStudentLinkCode(studentActor);
    // Another student's link never appears.
    const otherStudent = (await createStudent()).user;
    await linkParent({ parentUserId: linked.id, studentUserId: otherStudent.id });

    const view = await getStudentFamilyView(studentActor, { isParentAiAccessEnabled: switchOn });
    expect(view.pendingRequests).toHaveLength(1);
    expect(view.pendingRequests[0]).toMatchObject({ parentName: "Rumbi", relationship: "GUARDIAN" });
    expect(view.pendingRequests[0]?.contactHint).toMatch(/^ru\*\*\*@example\.test$/);
    expect(view.links.map((l) => l.linkId)).toEqual([link.id]);
    expect(view.links[0]).toMatchObject({
      parentName: "Grace",
      permissions: { progress: true, activity: true, results: true },
      aiConversations: { shared: false, sharedSince: null, canOffer: true },
    });
    expect(view.outstandingCode).toEqual({ linkId: code.linkId, expiresAt: code.expiresAt });
    expect(view.aiSharingAvailable).toBe(true);
    expect(view.guardianConsent).toMatchObject({ isMinor: true, status: "PENDING", grantedByName: null });

    const switchedOff = await getStudentFamilyView(studentActor, { isParentAiAccessEnabled: switchOff });
    expect(switchedOff.links[0]?.aiConversations.canOffer).toBe(false);
    expect(await errorCodeOf(getStudentFamilyView(await actorOf(linked.id)))).toBe("FORBIDDEN");
  });

  it("the consent screen loads only the student's own ACTIVE, self-consented link", async () => {
    const student = (await createStudent()).user;
    const parent = (await createParent()).user;
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const { link: schoolLink } = await linkParent({ parentUserId: (await createParent()).user.id, studentUserId: student.id, consentBasis: "SCHOOL_RECORD" });
    const actor = await actorOf(student.id);
    expect(await getStudentLinkForConsent(actor, link.id, { isParentAiAccessEnabled: switchOn })).toMatchObject({ linkId: link.id, canOffer: true });
    expect(await getStudentLinkForConsent(actor, schoolLink.id, { isParentAiAccessEnabled: switchOn })).toMatchObject({ canOffer: false });
    expect(await getStudentLinkForConsent(actor, link.id, { isParentAiAccessEnabled: switchOff })).toMatchObject({ canOffer: false });
    const other = await actorOf((await createStudent()).user.id);
    expect(await getStudentLinkForConsent(other, link.id, { isParentAiAccessEnabled: switchOn })).toBeNull();
    expect(await getStudentLinkForConsent(actor, "nope", { isParentAiAccessEnabled: switchOn })).toBeNull();
  });
});

describe("parent views (/parent)", () => {
  it("lists only ACTIVE children of this parent, with guardian-consent state", async () => {
    const parent = (await createParent()).user;
    const parentActor = await actorOf(parent.id);
    const child = await childWithData("Chipo");
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: child.id });
    const revokedChild = (await createStudent()).user;
    const { link: revokedLink } = await linkParent({ parentUserId: parent.id, studentUserId: revokedChild.id });
    await revokeLink(parentActor, { linkId: revokedLink.id });
    const otherParentsChild = (await createStudent()).user;
    await linkParent({ parentUserId: (await createParent()).user.id, studentUserId: otherParentsChild.id });

    const children = await listParentChildren(parentActor);
    expect(children.map((c) => c.studentUserId)).toEqual([child.id]);
    expect(children[0]).toMatchObject({
      linkId: link.id,
      name: "Chipo",
      relationship: "PARENT",
      guardianConsent: { isMinor: true, status: "PENDING", canGrant: true, givenByYou: false },
    });
    expect(await errorCodeOf(listParentChildren(await actorOf(child.id)))).toBe("FORBIDDEN");
  });

  it("the child detail contains only the sections the student shares", async () => {
    const parent = (await createParent()).user;
    const child = await childWithData();
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: child.id });
    const parentActor = await actorOf(parent.id);

    const full = await getParentChildDetail(parentActor, child.id, { now: NOW });
    expect(full.overview.visibleSections).toEqual(["subjects", "examCountdown", "progress", "weakAreas", "studyTime", "activityCalendar", "testResults"]);
    expect(full.overview).toMatchObject({ reportsIncluded: true, lockedSections: [] });
    expect(full.overview.subjects.map((s) => s.subjectId)).toEqual([maths.subjectId]);
    expect(full.overview.weakAreas?.[0]?.topicId).toBe(maths.topicIds[0]);
    expect(full.overview.studyTime?.last7Days.minutes).toBe(30);
    expect(full.overview.testResults?.recent[0]?.percentage).toBe(64);
    expect(full.overview.examCountdown.next?.daysUntil).toBe(120);

    await db.parentStudentLink.update({ where: { id: link.id }, data: { canViewProgress: false, canViewTestResults: false } });
    const limited = await getParentChildDetail(parentActor, child.id, { now: NOW });
    expect(limited.overview.visibleSections).toEqual(["subjects", "examCountdown", "studyTime", "activityCalendar"]);
    expect(limited.overview.progress).toBeUndefined();
    expect(limited.overview.weakAreas).toBeUndefined();
    expect(limited.overview.testResults).toBeUndefined();
    expect(limited.child.permissions).toEqual({ progress: false, activity: true, results: false });
  });

  it("detailed reports follow the CHILD's parentReports entitlement: a basic overview without it, full after an upgrade", async () => {
    const child = await childWithData("Rudo", { reports: false });
    // The shared default (FREE) plan may hold any values (tests/README.md); the basic case needs it without reports.
    if (await childHasParentReports(child.id)) return;
    const parent = (await createParent()).user;
    await linkParent({ parentUserId: parent.id, studentUserId: child.id });
    const parentActor = await actorOf(parent.id);

    const basic = await getParentChildDetail(parentActor, child.id, { now: NOW });
    expect(basic.overview.reportsIncluded).toBe(false);
    expect(basic.overview.visibleSections).toEqual(["subjects", "examCountdown", "studyTime"]);
    expect(basic.overview.lockedSections).toEqual(["progress", "weakAreas", "activityCalendar", "testResults"]);
    // Not computed at all (not merely hidden in the UI).
    expect(basic.overview.progress).toBeUndefined();
    expect(basic.overview.weakAreas).toBeUndefined();
    expect(basic.overview.testResults).toBeUndefined();
    expect(basic.overview.activityCalendar).toBeUndefined();
    // The basic overview still answers the §21 essentials.
    expect(basic.overview.subjects.map((s) => s.subjectId)).toEqual([maths.subjectId]);
    expect(basic.overview.examCountdown.next?.daysUntil).toBe(120);
    expect(basic.overview.studyTime?.last7Days.minutes).toBe(30);
    const [dashboardEntry] = await getParentDashboard(parentActor, { now: NOW });
    expect(dashboardEntry?.overview).toMatchObject({ reportsIncluded: false });
    expect(dashboardEntry?.overview.testResults).toBeUndefined();

    // A section the student does not share stays "not shared", never "locked".
    const { link } = await linkParent({ parentUserId: (await createParent()).user.id, studentUserId: child.id });
    await db.parentStudentLink.update({ where: { id: link.id }, data: { canViewTestResults: false } });
    const narrower = await getParentChildDetail(await actorOf(link.parentUserId as string), child.id, { now: NOW });
    expect(narrower.overview.lockedSections).toEqual(["progress", "weakAreas", "activityCalendar"]);

    // The child's plan gains parent reports (e.g. a parent subscribes for them): the full report appears.
    await grantLearnerFeatures(child.id, { parentReports: true });
    invalidateEntitlements(child.id);
    const upgraded = await getParentChildDetail(parentActor, child.id, { now: NOW });
    expect(upgraded.overview.reportsIncluded).toBe(true);
    expect(upgraded.overview.lockedSections).toEqual([]);
    expect(upgraded.overview.testResults?.recent[0]?.percentage).toBe(64);
  });

  it("the dashboard carries a compact overview per child", async () => {
    const parent = (await createParent()).user;
    const first = await childWithData("Anesu");
    const second = await childWithData("Batsi");
    await linkParent({ parentUserId: parent.id, studentUserId: first.id });
    await linkParent({ parentUserId: parent.id, studentUserId: second.id });
    const dashboard = await getParentDashboard(await actorOf(parent.id), { now: NOW });
    expect(dashboard.map((entry) => entry.child.name)).toEqual(["Anesu", "Batsi"]);
    expect(dashboard[0]?.overview.testResults?.recent.length).toBeLessThanOrEqual(3);
  });

  it("refuses every other relationship to the student (NOT_FOUND, never a hint)", async () => {
    const child = (await createStudent()).user;
    const parent = (await createParent()).user;
    const parentActor = await actorOf(parent.id);

    // Unlinked parent.
    expect(await errorCodeOf(requireLinkedChild(parentActor, child.id))).toBe("NOT_FOUND");
    // Pending request only.
    const email = uniqueEmail("kid");
    await db.user.update({ where: { id: child.id }, data: { emailNormalized: email } });
    await requestLinkByContact(parentActor, { identifier: email });
    expect(await errorCodeOf(getParentChildDetail(parentActor, child.id))).toBe("NOT_FOUND");
    // Malformed id; the parent's own id.
    expect(await errorCodeOf(requireLinkedChild(parentActor, "../etc"))).toBe("NOT_FOUND");
    expect(await errorCodeOf(requireLinkedChild(parentActor, parent.id))).toBe("NOT_FOUND");

    // A teacher who is also a parent sees a class student in /teacher, never through /parent.
    const teacherParent = (await createTeacher({ extraRoles: ["PARENT"] })).user;
    await createClass({ createdById: teacherParent.id, studentUserIds: [child.id] });
    expect(await errorCodeOf(requireLinkedChild(await actorOf(teacherParent.id), child.id))).toBe("NOT_FOUND");

    // A school admin of the child's school (no PARENT role at all).
    const { school } = await createSchool();
    const admin = (await createUser({ roles: [] })).user;
    await createSchoolMember({ schoolId: school.id, userId: admin.id, role: "SCHOOL_ADMIN" });
    await createSchoolMember({ schoolId: school.id, userId: child.id, role: "STUDENT" });
    expect(await errorCodeOf(requireLinkedChild(await actorOf(admin.id), child.id))).toBe("FORBIDDEN");
  });

  it("a revoked link stops access immediately", async () => {
    const child = (await createStudent()).user;
    const parent = (await createParent()).user;
    const { link } = await linkParent({ parentUserId: parent.id, studentUserId: child.id });
    const parentActor = await actorOf(parent.id);
    expect((await requireLinkedChild(parentActor, child.id)).linkId).toBe(link.id);
    await revokeLink(await actorOf(child.id), { linkId: link.id });
    expect(await errorCodeOf(requireLinkedChild(parentActor, child.id))).toBe("NOT_FOUND");
  });
});
