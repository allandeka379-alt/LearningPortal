"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { formText, runAdminAction } from "@/components/admin/server-action";
import { createClassAnnouncement, archiveClassAnnouncement } from "@/server/teaching/announcements";
import {
  archiveAssignment,
  assignTopicPractice,
  closeAssignment,
  createAssignment,
  excuseStudent,
  publishAssignment,
  setStudentFeedback,
  updateAssignmentSchedule,
} from "@/server/teaching/assignments";
import {
  addCoTeacher,
  approveJoinRequest,
  archiveClass,
  createClass,
  declineJoinRequest,
  disableJoinCode,
  removeCoTeacher,
  removeStudent,
  restoreClass,
  rotateJoinCode,
  updateClass,
} from "@/server/teaching/classes";
import { addStudentsToClass, revokeClassInvitation, type AddStudentOutcome } from "@/server/teaching/invitations";
import { auditRequest, formObject, requireTeacherForAction } from "../_lib/action";

/**
 * Class Server Actions (§22): thin wrappers that re-check the TEACHER role, pass the raw form to the teaching services
 * (validation, class-level authorization, audit) and return an `AdminActionState` for the shared form shells.
 */

type State<T = unknown> = AdminActionState<T>;

const classPath = (classId: string | undefined) => `/teacher/classes/${classId ?? ""}`;

// ---------------------------------------------------------------------------------------------------------------------
// Classes
// ---------------------------------------------------------------------------------------------------------------------

export async function createClassAction(_state: State, formData: FormData): Promise<State<{ id: string }>> {
  return runAdminAction("teacher.class.create", formData, async () => {
    const actor = await requireTeacherForAction();
    const created = await createClass(actor, formObject(formData), await auditRequest());
    return { data: { id: created.id }, message: "Class created.", redirectTo: `/teacher/classes/${created.id}/students`, revalidate: ["/teacher", "/teacher/classes"] };
  });
}

export async function updateClassAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.class.update", formData, async () => {
    const actor = await requireTeacherForAction();
    const { id } = await updateClass(actor, formObject(formData));
    return { data: null, message: "Class settings saved.", revalidate: [classPath(id), `${classPath(id)}/students`] };
  });
}

export async function rotateJoinCodeAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.class.rotate_code", formData, async () => {
    const actor = await requireTeacherForAction();
    const { joinCode } = await rotateJoinCode(actor, formObject(formData));
    return { data: { joinCode }, message: "New join code created. The old code no longer works.", revalidate: [`${classPath(formText(formData, "classId"))}/students`] };
  });
}

export async function disableJoinCodeAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.class.disable_code", formData, async () => {
    const actor = await requireTeacherForAction();
    await disableJoinCode(actor, formObject(formData));
    return { data: null, message: "Joining with a code is switched off.", revalidate: [`${classPath(formText(formData, "classId"))}/students`] };
  });
}

export async function archiveClassAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.class.archive", formData, async () => {
    const actor = await requireTeacherForAction();
    await archiveClass(actor, formObject(formData), await auditRequest());
    return { data: null, message: "Class archived.", redirectTo: "/teacher/classes", revalidate: ["/teacher", "/teacher/classes"] };
  });
}

export async function restoreClassAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.class.restore", formData, async () => {
    const actor = await requireTeacherForAction();
    await restoreClass(actor, formObject(formData), await auditRequest());
    return { data: null, message: "Class restored.", revalidate: ["/teacher", "/teacher/classes", classPath(formText(formData, "classId"))] };
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Roster
// ---------------------------------------------------------------------------------------------------------------------

export async function addStudentsAction(_state: State, formData: FormData): Promise<State<{ results: AddStudentOutcome[] }>> {
  return runAdminAction("teacher.class.add_students", formData, async () => {
    const actor = await requireTeacherForAction();
    const { results } = await addStudentsToClass(actor, formObject(formData), { request: await auditRequest() });
    const added = results.filter((r) => r.outcome === "added").length;
    const invited = results.filter((r) => r.outcome === "invited").length;
    return {
      data: { results },
      message: `${added} added, ${invited} invited.`,
      revalidate: [`${classPath(formText(formData, "classId"))}/students`],
    };
  });
}

function rosterStep(operation: string, message: string, run: typeof approveJoinRequest) {
  return async (formData: FormData): Promise<State> =>
    runAdminAction(operation, formData, async () => {
      const actor = await requireTeacherForAction();
      await run(actor, formObject(formData), await auditRequest());
      return { data: null, message, revalidate: [`${classPath(formText(formData, "classId"))}/students`, classPath(formText(formData, "classId"))] };
    });
}

const approve = rosterStep("teacher.class.approve", "Request approved.", approveJoinRequest);
const decline = rosterStep("teacher.class.decline", "Request declined.", declineJoinRequest);
const remove = rosterStep("teacher.class.remove_student", "Student removed from the class.", removeStudent);
const removeTeacher = rosterStep("teacher.class.remove_teacher", "Co-teacher removed.", removeCoTeacher);
const revokeInvite = rosterStep("teacher.class.revoke_invitation", "Invitation withdrawn.", revokeClassInvitation);

export async function approveRequestAction(_state: State, formData: FormData): Promise<State> {
  return approve(formData);
}

export async function declineRequestAction(_state: State, formData: FormData): Promise<State> {
  return decline(formData);
}

export async function removeStudentAction(_state: State, formData: FormData): Promise<State> {
  return remove(formData);
}

export async function removeCoTeacherAction(_state: State, formData: FormData): Promise<State> {
  return removeTeacher(formData);
}

export async function revokeInvitationAction(_state: State, formData: FormData): Promise<State> {
  return revokeInvite(formData);
}

export async function addCoTeacherAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.class.add_teacher", formData, async () => {
    const actor = await requireTeacherForAction();
    await addCoTeacher(actor, formObject(formData), await auditRequest());
    return { data: null, message: "Co-teacher added.", revalidate: [`${classPath(formText(formData, "classId"))}/students`] };
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Assignments
// ---------------------------------------------------------------------------------------------------------------------

export async function createAssignmentAction(_state: State, formData: FormData): Promise<State<{ id: string }>> {
  return runAdminAction("teacher.assignment.create", formData, async () => {
    const actor = await requireTeacherForAction();
    const classId = formText(formData, "classId");
    const created = await createAssignment(actor, formObject(formData, ["topicIds", "studentIds"]), { timeZone: actor.timeZone });
    return {
      data: { id: created.id },
      message: created.status === "DRAFT" ? "Saved as a draft." : "Work set.",
      redirectTo: `${classPath(classId)}/assignments/${created.id}`,
      revalidate: [`${classPath(classId)}/assignments`, "/teacher", "/teacher/assignments"],
    };
  });
}

function assignmentStep(operation: string, message: string, run: (actor: Awaited<ReturnType<typeof requireTeacherForAction>>, input: unknown) => Promise<unknown>) {
  return async (formData: FormData): Promise<State> =>
    runAdminAction(operation, formData, async () => {
      const actor = await requireTeacherForAction();
      await run(actor, formObject(formData));
      const classId = formText(formData, "classId");
      const assignmentId = formText(formData, "assignmentId");
      return { data: null, message, revalidate: [`${classPath(classId)}/assignments`, `${classPath(classId)}/assignments/${assignmentId ?? ""}`, "/teacher/assignments"] };
    });
}

const publishStep = assignmentStep("teacher.assignment.publish", "Published to the class.", (actor, input) => publishAssignment(actor, input));
const closeStep = assignmentStep("teacher.assignment.close", "Closed. Students who handed nothing in are marked as missed.", (actor, input) => closeAssignment(actor, input));
const excuseStep = assignmentStep("teacher.assignment.excuse", "Student excused.", (actor, input) => excuseStudent(actor, input));
const feedbackStep = assignmentStep("teacher.assignment.feedback", "Feedback saved.", (actor, input) => setStudentFeedback(actor, input));

export async function publishAssignmentAction(_state: State, formData: FormData): Promise<State> {
  return publishStep(formData);
}

export async function closeAssignmentAction(_state: State, formData: FormData): Promise<State> {
  return closeStep(formData);
}

export async function excuseStudentAction(_state: State, formData: FormData): Promise<State> {
  return excuseStep(formData);
}

export async function studentFeedbackAction(_state: State, formData: FormData): Promise<State> {
  return feedbackStep(formData);
}

export async function rescheduleAssignmentAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.assignment.reschedule", formData, async () => {
    const actor = await requireTeacherForAction();
    await updateAssignmentSchedule(actor, formObject(formData), { timeZone: actor.timeZone });
    const classId = formText(formData, "classId");
    return { data: null, message: "Dates updated.", revalidate: [`${classPath(classId)}/assignments/${formText(formData, "assignmentId") ?? ""}`] };
  });
}

export async function archiveAssignmentAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.assignment.archive", formData, async () => {
    const actor = await requireTeacherForAction();
    const { deleted } = await archiveAssignment(actor, formObject(formData));
    const classId = formText(formData, "classId");
    return { data: null, message: deleted ? "Draft deleted." : "Archived.", redirectTo: `${classPath(classId)}/assignments`, revalidate: [`${classPath(classId)}/assignments`] };
  });
}

export async function assignTopicPracticeAction(_state: State, formData: FormData): Promise<State<{ id: string }>> {
  return runAdminAction("teacher.assignment.topic_practice", formData, async () => {
    const actor = await requireTeacherForAction();
    const classId = formText(formData, "classId");
    const created = await assignTopicPractice(actor, formObject(formData));
    return {
      data: { id: created.id },
      message: `Practice set for ${created.students} ${created.students === 1 ? "student" : "students"}.`,
      redirectTo: `${classPath(classId)}/assignments/${created.id}`,
      revalidate: [`${classPath(classId)}/assignments`],
    };
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Announcements
// ---------------------------------------------------------------------------------------------------------------------

export async function createAnnouncementAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.announcement.create", formData, async () => {
    const actor = await requireTeacherForAction();
    const { publishedAt } = await createClassAnnouncement(actor, formObject(formData), { timeZone: actor.timeZone, request: await auditRequest() });
    const scheduled = publishedAt.getTime() > Date.now();
    return {
      data: null,
      message: scheduled ? "Announcement scheduled." : "Announcement sent to the class.",
      revalidate: [`${classPath(formText(formData, "classId"))}/announcements`, "/teacher/announcements"],
    };
  });
}

export async function archiveAnnouncementAction(_state: State, formData: FormData): Promise<State> {
  return runAdminAction("teacher.announcement.archive", formData, async () => {
    const actor = await requireTeacherForAction();
    await archiveClassAnnouncement(actor, formObject(formData), { request: await auditRequest() });
    return { data: null, message: "Announcement withdrawn.", revalidate: [`${classPath(formText(formData, "classId"))}/announcements`, "/teacher/announcements"] };
  });
}
