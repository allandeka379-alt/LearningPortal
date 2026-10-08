/**
 * Fixtures for the teaching integration tests (test-only module; never imported by app code). Built on the shared
 * factories in tests/factories: every call creates its own uniquely named rows, so test files can run in parallel
 * against the shared test database (tests/README.md).
 */
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import {
  createLearner,
  createLearningSetup,
  createSchool,
  createSchoolMember,
  createTeacher,
  uniqueJoinCode,
  type LearningSetup,
  type LearningSetupOptions,
} from "../../../tests/factories/index";
import type { TeachingActor } from "./access";

export function teacherActor(userId: string, roles: Role[] = ["TEACHER"]): TeachingActor {
  return { userId, roles };
}

/** A teacher (TEACHER role + Teacher row), optionally with an ACTIVE teaching membership of `schoolId`. */
export async function makeTeacher(options: { schoolId?: string; firstName?: string } = {}): Promise<TeachingActor> {
  const { user } = await createTeacher({ firstName: options.firstName ?? "Tess" });
  if (options.schoolId) await createSchoolMember({ schoolId: options.schoolId, userId: user.id, role: "TEACHER" });
  return teacherActor(user.id);
}

/** An adult student with unlimited learning features, optionally an ACTIVE student of `schoolId`. */
export async function makeStudent(options: { schoolId?: string; firstName?: string } = {}) {
  const learner = await createLearner(options.firstName ? { firstName: options.firstName } : {});
  if (options.schoolId) await createSchoolMember({ schoolId: options.schoolId, userId: learner.userId, role: "STUDENT" });
  return learner;
}

export interface TeachingWorld {
  setup: LearningSetup;
  schoolId: string;
  teacher: TeachingActor;
}

/** A curriculum with published questions, an ACTIVE school and a teacher who teaches there. */
export async function teachingWorld(options: LearningSetupOptions = {}): Promise<TeachingWorld> {
  const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 1, questionsPerLeaf: 2, ...options });
  const { school } = await createSchool();
  const teacher = await makeTeacher({ schoolId: school.id });
  return { setup, schoolId: school.id, teacher };
}

/** Creates a class directly (LEAD = teacher) with ACTIVE members; school memberships must already exist. */
export async function makeClass(options: { teacher: TeachingActor; schoolId: string | null; subjectId: string | null; members?: string[]; joinRequiresApproval?: boolean; name?: string }) {
  const code = uniqueJoinCode();
  const cls = await db.class.create({
    data: {
      schoolId: options.schoolId,
      subjectId: options.subjectId,
      name: options.name ?? "Form 4 Blue",
      academicYear: "2026",
      createdById: options.teacher.userId,
      joinCode: code,
      joinRequiresApproval: options.joinRequiresApproval ?? false,
    },
    select: { id: true, joinCode: true },
  });
  await db.classTeacher.create({ data: { classId: cls.id, userId: options.teacher.userId, role: "LEAD" } });
  for (const userId of options.members ?? []) await db.classMember.create({ data: { classId: cls.id, userId, status: "ACTIVE", source: "ADDED_BY_STAFF" } });
  return { id: cls.id, joinCode: cls.joinCode as string };
}

/** `YYYY-MM-DDTHH:mm` in Africa/Harare (UTC+2, no DST) for an instant, as a `datetime-local` input sends it. */
export function harareLocal(instant: Date): string {
  return new Date(instant.getTime() + 2 * 3_600_000).toISOString().slice(0, 16);
}

/** Asserts a rejected promise carries an AppError with `code`. */
export async function expectCode(promise: Promise<unknown>, code: string): Promise<void> {
  let caught: unknown = null;
  try {
    await promise;
  } catch (error) {
    caught = error;
  }
  if (caught === null) throw new Error(`expected AppError ${code}, but the call succeeded`);
  const actual = (caught as { code?: unknown }).code;
  if (actual !== code) throw new Error(`expected AppError ${code}, got ${String(actual)}: ${(caught as Error).message}`);
}
