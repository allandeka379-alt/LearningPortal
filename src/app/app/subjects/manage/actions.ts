"use server";

import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { enrolInSubjects, unenrol, updateEnrollment } from "@/server/enrollment";
import { AppError } from "@/server/lib/errors";

/**
 * Subject enrolment actions (§5 subjects, §26 pinned versions). Thin: guard, read the form, call the enrollment
 * service (which validates and pins the syllabus version), refresh the student area.
 */

function subjectIdOf(formData: FormData): string {
  const subjectId = formString(formData, "subjectId");
  if (!subjectId) throw AppError.validation({ subjectId: ["Choose a subject."] });
  return subjectId;
}

/** Adds (or re-activates) one subject. */
export async function addSubjectAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("subjects.add", async () => {
    const actor = await requireOnboardedStudentForAction();
    const [enrolment] = await enrolInSubjects(actor, { subjectIds: [subjectIdOf(formData)] });
    return { message: enrolment ? `${enrolment.subject.name} added to your subjects.` : "Subject added.", revalidateLayout: true };
  });
}

/** Removes one subject (soft: history and progress are kept). */
export async function removeSubjectAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("subjects.remove", async () => {
    const actor = await requireOnboardedStudentForAction();
    const enrolment = await unenrol(actor, subjectIdOf(formData));
    return { message: `${enrolment.subject.name} removed from your subjects.`, revalidateLayout: true };
  });
}

/** Per-subject targets: examination session and target grade ("" = not set; a missing field is left unchanged). */
export async function updateTargetsAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("subjects.targets", async () => {
    const actor = await requireOnboardedStudentForAction();
    const session = formString(formData, "targetExamSessionId");
    const grade = formString(formData, "targetGrade");
    await updateEnrollment(actor, subjectIdOf(formData), {
      ...(session === undefined ? {} : { targetExamSessionId: session.trim() === "" ? null : session.trim() }),
      ...(grade === undefined ? {} : { targetGrade: grade.trim() === "" ? null : grade.trim() }),
    });
    return { message: "Targets saved.", revalidateLayout: true };
  });
}
