import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import {
  createClass,
  createCurriculumChain,
  createParent,
  createSchool,
  createSchoolMember,
  createStudent,
  createTeacher,
  createUser,
  linkParent,
  uniqueEmail,
  uniqueJoinCode,
  uniquePhone,
  uniqueSlug,
  uniqueSuffix,
  uniqueUsername,
} from "./index";

describe("unique value helpers", () => {
  it("produce values in the database formats", () => {
    expect(new Set(Array.from({ length: 2000 }, () => uniqueSuffix())).size).toBe(2000);
    expect(uniqueSlug("O-Level Maths!")).toMatch(/^o-level-maths-[0-9a-f]{12}$/);
    expect(uniqueSlug("!!!")).toMatch(/^test-[0-9a-f]{12}$/);
    expect(uniqueEmail()).toMatch(/^user\.[0-9a-f]{12}@example\.test$/);
    expect(uniqueUsername()).toMatch(/^[a-z0-9_]{3,30}$/);
    expect(uniqueJoinCode()).toMatch(/^[A-Z0-9]{6,10}$/);
    for (let i = 0; i < 100; i += 1) expect(uniquePhone()).toMatch(/^\+2637[1378]\d{7}$/);
  });
});

describe("identity factories", () => {
  it("creates users with profile and role extension rows", async () => {
    const admin = await createUser({ roles: ["SUPER_ADMIN"] });
    expect(admin.user.roles).toEqual(["SUPER_ADMIN"]);
    expect(admin.profile?.userId).toBe(admin.user.id);
    expect(admin.student).toBeNull();

    const student = await createStudent();
    expect(student.student.isMinor).toBe(true);
    expect(student.student.guardianConsentStatus).toBe("PENDING");

    const adult = await createStudent({ student: { isMinor: false }, email: null, phone: uniquePhone() });
    expect(adult.student.guardianConsentStatus).toBe("NOT_REQUIRED");
    expect(adult.user.emailNormalized).toBeNull();

    await expect(createUser({ roles: ["SCHOOL_ADMIN" as never] })).rejects.toThrow(/SCHOOL_ADMIN/);
  });

  it("creates schools, memberships, classes and parent links that satisfy the guards", async () => {
    const { school } = await createSchool();
    expect(school.status).toBe("ACTIVE");
    expect(school.verifiedAt).not.toBeNull();

    const teacher = await createTeacher();
    const s1 = await createStudent();
    const s2 = await createStudent();
    const fixture = await createClass({
      schoolId: school.id,
      createdById: teacher.user.id,
      studentUserIds: [s1.user.id, s2.user.id],
    });
    expect(fixture.teachers).toHaveLength(1);
    expect(fixture.teachers[0]?.role).toBe("LEAD");
    expect(fixture.members.map((m) => m.userId).sort()).toEqual([s1.user.id, s2.user.id].sort());
    expect(fixture.schoolMembers).toHaveLength(3);

    const { member } = await createSchoolMember({ schoolId: school.id, userId: teacher.user.id, role: "SCHOOL_ADMIN" });
    expect(member.status).toBe("ACTIVE");

    const tutorClass = await createClass({ schoolId: null });
    expect(tutorClass.class.schoolId).toBeNull();
    expect(tutorClass.teachers).toHaveLength(1);

    const parent = await createParent();
    const { link } = await linkParent({ parentUserId: parent.user.id, studentUserId: s1.user.id });
    expect(link.status).toBe("ACTIVE");
    expect(link.consentBasis).toBe("STUDENT_CODE");
  });
});

describe("createCurriculumChain", () => {
  it("builds a CURRENT syllabus with a topic tree and published lessons plus snapshots", async () => {
    const chain = await createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 2, objectivesPerSubtopic: 1 });
    expect(chain.syllabus.status).toBe("CURRENT");
    expect(chain.syllabus.publishedAt).not.toBeNull();
    expect(chain.topics).toHaveLength(2);
    expect(chain.subtopics).toHaveLength(4);
    expect(chain.objectiveIds).toHaveLength(4);
    expect(chain.subtopics.every((s) => s.depth === 1 && s.path.endsWith(s.id))).toBe(true);
    expect(chain.lessons).toHaveLength(2);
    expect(chain.lessons.every((l) => l.status === "PUBLISHED")).toBe(true);
    expect(chain.revisions).toHaveLength(2);

    const stored = await db.contentRevision.findMany({ where: { entityId: { in: chain.lessons.map((l) => l.id) } } });
    expect(stored).toHaveLength(2);

    // Published structure is frozen by the database: a new topic needs a new syllabus version.
    await expect(
      db.topic.create({
        data: {
          syllabusId: chain.syllabus.id,
          kind: "TOPIC",
          depth: 0,
          path: "00000000-0000-4000-8000-000000000000",
          id: "00000000-0000-4000-8000-000000000000",
          name: "Late topic",
          slug: uniqueSlug("late"),
        },
      }),
    ).rejects.toThrow();
  });

  it("supports draft-only chains", async () => {
    const chain = await createCurriculumChain({ syllabusStatus: "DRAFT", lessonStatus: "DRAFT", topicCount: 1 });
    expect(chain.syllabus.status).toBe("DRAFT");
    expect(chain.lessons[0]?.status).toBe("DRAFT");
    expect(chain.revisions).toHaveLength(0);
  });

  it("students can be placed on a chain's track", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, lessonsPerTopic: 0 });
    const { student } = await createStudent({
      student: {
        countryId: chain.country.id,
        examBoardId: chain.examBoard.id,
        qualificationId: chain.qualification.id,
        onboardingCompleted: true,
      },
    });
    expect(student.onboardingStep).toBe("COMPLETED");
  });
});
