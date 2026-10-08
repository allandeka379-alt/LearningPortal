import "server-only";
import type { ExamSessionStatus, Prisma } from "@/generated/prisma/client";
import { dateColumnFromLocalDate, localDateFromDateColumn, type LocalDate } from "@/lib/dates";
import { AppError } from "@/server/lib/errors";
import { assertCurriculumAdmin, assertCurriculumDraft, assertCurriculumRead, curriculumAccess, type CurriculumActor } from "./access";
import { canMoveExamSession, EXAM_SESSION_TRANSITIONS } from "./core";
import { examSessionConfirmSchema, examSessionCreateSchema, examSessionListFilterSchema, examSessionStatusSchema, examSessionUpdateSchema } from "./schemas";
import {
  ADMIN_PAGE_SIZE,
  auditCurriculum,
  CURRICULUM_AUDIT,
  cursorArgs,
  diffFields,
  fieldError,
  inTransaction,
  mapDbError,
  parseInput,
  readClient,
  STAFF_NAME_SELECT,
  staffName,
  toPage,
  type Page,
  type ServiceContext,
} from "./shared";

/**
 * Exam sessions (§5 "target examination", §17 countdown; ARCHITECTURE §4.2): an examination series per qualification
 * (e.g. "November 2027", series code "2027-NOV").
 *
 * - Editors create and edit DRAFT sessions. Only ADMIN publishes, cancels or archives a session, edits a published
 *   one, or confirms its dates. Only PUBLISHED sessions feed onboarding and countdowns.
 * - Dates stay `isProvisional` until an admin confirms them against the board's official timetable (the link is
 *   recorded, with who/when). Changing the dates of a confirmed session makes it provisional again.
 * - A session's qualification is fixed (students' target sessions must stay within their qualification).
 */

const LIST_SELECT = {
  id: true,
  name: true,
  seriesCode: true,
  year: true,
  startsOn: true,
  endsOn: true,
  isProvisional: true,
  status: true,
  isDemo: true,
  updatedAt: true,
  qualification: { select: { id: true, shortName: true, examBoard: { select: { shortName: true } } } },
  _count: { select: { targetingStudents: true, targetingEnrollments: true } },
} as const satisfies Prisma.ExamSessionSelect;
type ListPayload = Prisma.ExamSessionGetPayload<{ select: typeof LIST_SELECT }>;
export type ExamSessionRow = Omit<ListPayload, "startsOn" | "endsOn"> & { startsOn: LocalDate; endsOn: LocalDate };

function withDates<T extends { startsOn: Date; endsOn: Date }>(row: T): Omit<T, "startsOn" | "endsOn"> & { startsOn: LocalDate; endsOn: LocalDate } {
  return { ...row, startsOn: localDateFromDateColumn(row.startsOn), endsOn: localDateFromDateColumn(row.endsOn) };
}

export async function listExamSessions(actor: CurriculumActor, filter: unknown = {}, context: ServiceContext = {}): Promise<Page<ExamSessionRow>> {
  assertCurriculumRead(actor);
  const f = parseInput(examSessionListFilterSchema, filter);
  const rows = await readClient(context).examSession.findMany({
    where: {
      ...(f.qualificationId ? { qualificationId: f.qualificationId } : {}),
      ...(f.status ? { status: f.status } : {}),
      ...(f.year ? { year: f.year } : {}),
      ...(f.q ? { OR: [{ name: { contains: f.q, mode: "insensitive" } }, { seriesCode: { contains: f.q, mode: "insensitive" } }] } : {}),
    },
    select: LIST_SELECT,
    orderBy: [{ startsOn: "desc" }, { seriesCode: "asc" }, { id: "asc" }],
    take: ADMIN_PAGE_SIZE + 1,
    ...cursorArgs(f.cursor),
  });
  const page = toPage(rows);
  return { ...page, items: page.items.map(withDates) };
}

const DETAIL_SELECT = {
  id: true,
  qualificationId: true,
  name: true,
  seriesCode: true,
  year: true,
  startsOn: true,
  endsOn: true,
  isProvisional: true,
  confirmedAt: true,
  sourceUrl: true,
  status: true,
  notes: true,
  isDemo: true,
  createdAt: true,
  updatedAt: true,
  confirmedBy: STAFF_NAME_SELECT,
  qualification: { select: { id: true, name: true, shortName: true, examBoard: { select: { shortName: true } } } },
  _count: { select: { targetingStudents: true, targetingEnrollments: true, timetableEntries: true } },
} as const satisfies Prisma.ExamSessionSelect;
type DetailPayload = Prisma.ExamSessionGetPayload<{ select: typeof DETAIL_SELECT }>;

export interface ExamSessionDetail extends Omit<DetailPayload, "startsOn" | "endsOn" | "confirmedBy"> {
  startsOn: LocalDate;
  endsOn: LocalDate;
  confirmedByName: string | null;
  /** Status moves the viewer may make. */
  allowedTransitions: ExamSessionStatus[];
  canEdit: boolean;
  canConfirm: boolean;
}

export async function getExamSession(actor: CurriculumActor, id: string, context: ServiceContext = {}): Promise<ExamSessionDetail> {
  assertCurriculumRead(actor);
  const row = await readClient(context).examSession.findUnique({ where: { id }, select: DETAIL_SELECT });
  if (!row) throw AppError.notFound("Exam session not found.");
  const access = curriculumAccess(actor);
  const { confirmedBy, ...rest } = row;
  return {
    ...withDates(rest),
    confirmedByName: staffName(confirmedBy),
    allowedTransitions: access.canAdmin ? [...EXAM_SESSION_TRANSITIONS[row.status]] : [],
    canEdit: row.status === "DRAFT" ? access.canDraft : row.status === "PUBLISHED" && access.canAdmin,
    canConfirm: access.canAdmin && row.isProvisional && row.status !== "ARCHIVED",
  };
}

const SESSION_UNIQUE = { seriesCode: "This qualification already has a session with this series code." };

export async function createExamSession(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumDraft(actor);
  const input = parseInput(examSessionCreateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const qualification = await tx.qualification.findUnique({ where: { id: input.qualificationId }, select: { id: true } });
      if (!qualification) throw fieldError("qualificationId", "Choose a qualification.");
      const row = await tx.examSession.create({
        data: {
          ...input,
          startsOn: dateColumnFromLocalDate(input.startsOn),
          endsOn: dateColumnFromLocalDate(input.endsOn),
          status: "DRAFT",
          isProvisional: true,
        },
        select: { id: true },
      });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.exam_session.create",
        entityType: "ExamSession",
        entityId: row.id,
        after: { qualificationId: input.qualificationId, seriesCode: input.seriesCode, startsOn: input.startsOn, endsOn: input.endsOn },
      });
      return row;
    });
  } catch (error) {
    mapDbError(error, SESSION_UNIQUE);
  }
}

export async function updateExamSession(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string; becameProvisional: boolean }> {
  assertCurriculumDraft(actor);
  const { id, ...input } = parseInput(examSessionUpdateSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.examSession.findUnique({ where: { id } });
      if (!before) throw AppError.notFound("Exam session not found.");
      if (before.status !== "DRAFT") assertCurriculumAdmin(actor, "Only an admin can edit a session that is no longer a draft.");
      if (before.status === "ARCHIVED") throw AppError.conflict("Archived sessions are kept as history and cannot be edited.");
      const startsOn = dateColumnFromLocalDate(input.startsOn);
      const endsOn = dateColumnFromLocalDate(input.endsOn);
      const datesChanged = startsOn.getTime() !== before.startsOn.getTime() || endsOn.getTime() !== before.endsOn.getTime();
      const becameProvisional = datesChanged && !before.isProvisional;
      const data = {
        ...input,
        startsOn,
        endsOn,
        ...(becameProvisional ? { isProvisional: true, confirmedAt: null, confirmedById: null } : {}),
      };
      await tx.examSession.update({ where: { id }, data });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.exam_session.update",
        entityType: "ExamSession",
        entityId: id,
        ...diffFields(before, data),
      });
      return { id, becameProvisional };
    });
  } catch (error) {
    mapDbError(error, SESSION_UNIQUE);
  }
}

/** Moves a session along DRAFT → PUBLISHED → CANCELLED/ARCHIVED (ADMIN). Unpublishing is refused while students target it. */
export async function setExamSessionStatus(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string; status: ExamSessionStatus; targeting: number }> {
  assertCurriculumAdmin(actor, "Only an admin can publish, cancel or archive an exam session.");
  const { id, status } = parseInput(examSessionStatusSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.examSession.findUnique({
        where: { id },
        select: { status: true, qualificationId: true, _count: { select: { targetingStudents: true, targetingEnrollments: true } } },
      });
      if (!before) throw AppError.notFound("Exam session not found.");
      if (!canMoveExamSession(before.status, status)) {
        throw AppError.conflict(`A ${before.status.toLowerCase()} session cannot be moved to ${status.toLowerCase()}.`);
      }
      const targeting = before._count.targetingStudents + before._count.targetingEnrollments;
      if (status === "DRAFT" && targeting > 0) {
        throw AppError.conflict(`Students already target this session (${targeting}). Cancel or archive it instead of unpublishing.`);
      }
      await tx.examSession.update({ where: { id }, data: { status } });
      await auditCurriculum(tx, actor, context, {
        action: status === "PUBLISHED" ? CURRICULUM_AUDIT.EXAM_SESSION_PUBLISH : status === "DRAFT" ? CURRICULUM_AUDIT.UPDATE : CURRICULUM_AUDIT.RETIRE,
        operation: `curriculum.exam_session.${status.toLowerCase()}`,
        entityType: "ExamSession",
        entityId: id,
        before: { status: before.status },
        after: { status },
        metadata: { targeting },
      });
      return { id, status, targeting };
    });
  } catch (error) {
    mapDbError(error);
  }
}

/** Confirms a session's dates against the official timetable (ADMIN): no longer provisional; who/when recorded. */
export async function confirmExamSessionDates(actor: CurriculumActor, raw: unknown, context: ServiceContext = {}): Promise<{ id: string }> {
  assertCurriculumAdmin(actor, "Only an admin can confirm exam dates.");
  const { id, sourceUrl } = parseInput(examSessionConfirmSchema, raw);
  try {
    return await inTransaction(context, async (tx) => {
      const before = await tx.examSession.findUnique({ where: { id }, select: { status: true, isProvisional: true, sourceUrl: true } });
      if (!before) throw AppError.notFound("Exam session not found.");
      if (before.status === "ARCHIVED") throw AppError.conflict("Archived sessions cannot be changed.");
      if (!before.isProvisional) throw AppError.conflict("These dates are already confirmed.");
      await tx.examSession.update({ where: { id }, data: { isProvisional: false, confirmedAt: new Date(), confirmedById: actor.userId, sourceUrl } });
      await auditCurriculum(tx, actor, context, {
        action: CURRICULUM_AUDIT.UPDATE,
        operation: "curriculum.exam_session.confirm_dates",
        entityType: "ExamSession",
        entityId: id,
        before: { isProvisional: true, sourceUrl: before.sourceUrl },
        after: { isProvisional: false, sourceUrl },
      });
      return { id };
    });
  } catch (error) {
    mapDbError(error);
  }
}
