import { z } from "zod";
import { isLocalDate } from "@/lib/dates";
import { MAX_ROSTER_ROWS, ROSTER_CHUNK_SIZE, SCHOOL_INVITABLE_ROLES, SCHOOL_REPORT_KINDS } from "./core";

/** Input schemas of the school administration services (§23). Isomorphic: no server imports. */

export const uuidSchema = z.uuid({ error: "Choose a valid item." });

/** A form checkbox / boolean: "on", "true", "1" or `true`. */
export const flag = z.preprocess((value) => value === true || value === "true" || value === "on" || value === "1", z.boolean());

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Use at most ${max} characters.` })
    .optional()
    .transform((value) => (value === undefined || value === "" ? undefined : value));

const optionalUuid = z.preprocess((value) => (value === "" || value === null ? undefined : value), uuidSchema.optional());

export const ACADEMIC_YEAR_PATTERN = /^\d{4}(\/\d{2})?$/;
const academicYear = z.string().trim().regex(ACADEMIC_YEAR_PATTERN, { error: "Use a year such as 2026 or 2026/27." });

const localDate = z.string().refine(isLocalDate, { error: "Enter a date." });

export const schoolRefSchema = z.object({ schoolId: uuidSchema });

// ---------------------------------------------------------------------------------------------------------------------
// People
// ---------------------------------------------------------------------------------------------------------------------

export const inviteMemberSchema = z.object({
  schoolId: uuidSchema,
  contact: z
    .string({ error: "Enter an email address or phone number." })
    .trim()
    .min(3, { error: "Enter an email address or phone number." })
    .max(254, { error: "Use at most 254 characters." }),
  role: z.enum(SCHOOL_INVITABLE_ROLES, { error: "Choose Teacher or Student." }),
});
export type InviteMemberInput = z.input<typeof inviteMemberSchema>;

export const invitationActionSchema = z.object({ schoolId: uuidSchema, invitationId: uuidSchema });

export const MEMBER_LIST_STATUSES = ["ACTIVE", "REQUESTED", "REMOVED"] as const;

export const listMembersSchema = z.object({
  schoolId: uuidSchema,
  q: optionalText(100),
  status: z.enum(MEMBER_LIST_STATUSES).default("ACTIVE"),
  classId: optionalUuid,
  cursor: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type ListMembersInput = z.input<typeof listMembersSchema>;

export const memberActionSchema = z.object({ schoolId: uuidSchema, userId: uuidSchema, reason: optionalText(500) });

export const studentRefSchema = z.object({ schoolId: uuidSchema, userId: uuidSchema });

export const bulkStudentsSchema = z.object({
  schoolId: uuidSchema,
  userIds: z.array(uuidSchema).min(1, { error: "Choose at least one student." }).max(ROSTER_CHUNK_SIZE, { error: `Choose at most ${ROSTER_CHUNK_SIZE} students at a time.` }),
});

export const studentNumberSchema = z.object({
  schoolId: uuidSchema,
  userId: uuidSchema,
  studentNumber: z
    .string()
    .trim()
    .max(32, { error: "Use at most 32 characters." })
    .regex(/^([A-Za-z0-9][A-Za-z0-9/._-]{0,31})?$/, { error: "Use letters, digits, / . _ - only." })
    .transform((value) => (value === "" ? null : value)),
});

// ---------------------------------------------------------------------------------------------------------------------
// Classes and subjects
// ---------------------------------------------------------------------------------------------------------------------

const className = z.string({ error: "Give the class a name." }).trim().min(1, { error: "Give the class a name." }).max(120, { error: "Use at most 120 characters." });

export const createClassSchema = z.object({
  schoolId: uuidSchema,
  name: className,
  subjectId: optionalUuid,
  yearGroupId: optionalUuid,
  academicYear,
  teacherUserId: optionalUuid,
});
export type CreateSchoolClassInput = z.input<typeof createClassSchema>;

export const updateClassSchema = z.object({
  schoolId: uuidSchema,
  classId: uuidSchema,
  name: className,
  subjectId: optionalUuid,
  yearGroupId: optionalUuid,
});

export const classRefSchema = z.object({ schoolId: uuidSchema, classId: uuidSchema });

export const classTeacherSchema = z.object({
  schoolId: uuidSchema,
  classId: uuidSchema,
  teacherUserId: uuidSchema,
  role: z.enum(["LEAD", "ASSISTANT"]).default("LEAD"),
});

export const classTeacherRefSchema = z.object({ schoolId: uuidSchema, classId: uuidSchema, teacherUserId: uuidSchema });

export const classStudentsSchema = z.object({
  schoolId: uuidSchema,
  classId: uuidSchema,
  userIds: z.array(uuidSchema).min(1, { error: "Choose at least one student." }).max(200, { error: "Choose at most 200 students at a time." }),
});

export const classStudentSchema = z.object({ schoolId: uuidSchema, classId: uuidSchema, userId: uuidSchema });

export const setSubjectsSchema = z.object({
  schoolId: uuidSchema,
  subjectIds: z.array(uuidSchema).max(200, { error: "Choose at most 200 subjects." }),
});

export const changeSubjectsSchema = z.object({
  schoolId: uuidSchema,
  subjectIds: z.array(uuidSchema).min(1, { error: "Choose at least one subject." }).max(100, { error: "Choose at most 100 subjects at a time." }),
});

export const catalogueQuerySchema = z.object({
  schoolId: uuidSchema,
  q: optionalText(100),
  qualificationId: optionalUuid,
  limit: z.coerce.number().int().min(1).max(200).default(60),
});
export type CatalogueQueryInput = z.input<typeof catalogueQuerySchema>;

export const enrolSubjectSchema = z
  .object({
    schoolId: uuidSchema,
    subjectId: uuidSchema,
    classId: optionalUuid,
    userIds: z.array(uuidSchema).max(500).optional(),
  })
  .refine((value) => value.classId !== undefined || (value.userIds?.length ?? 0) > 0, {
    message: "Choose a class or at least one student.",
    path: ["classId"],
  });

// ---------------------------------------------------------------------------------------------------------------------
// Roster import
// ---------------------------------------------------------------------------------------------------------------------

/** A validated roster row coming back from the client for commit (re-validated server-side in full). */
export const rosterRowSchema = z.object({
  row: z.number().int().min(2).max(MAX_ROSTER_ROWS + 50),
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  form: z.string().max(40).nullable(),
  className: z.string().max(120).nullable(),
  email: z.string().max(254).nullable(),
  phone: z.string().max(32).nullable(),
  parentPhone: z.string().max(32).nullable(),
  studentNumber: z.string().max(32).nullable(),
  subjects: z.array(z.string().max(120)).max(20),
});

export const rosterCommitSchema = z.object({
  schoolId: uuidSchema,
  importId: uuidSchema,
  chunkIndex: z.number().int().min(0).max(Math.ceil(MAX_ROSTER_ROWS / ROSTER_CHUNK_SIZE)),
  rows: z.array(rosterRowSchema).min(1).max(ROSTER_CHUNK_SIZE),
  /** The school collected guardian consent for these students under its own process (GuardianConsentMethod SCHOOL). */
  guardianConsentCollected: flag.default(false),
  createMissingClasses: flag.default(true),
  academicYear,
});
export type RosterCommitInput = z.input<typeof rosterCommitSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Reports and billing
// ---------------------------------------------------------------------------------------------------------------------

export const reportRequestSchema = z
  .object({
    schoolId: uuidSchema,
    kind: z.enum(SCHOOL_REPORT_KINDS, { error: "Choose a report." }),
    periodStart: localDate,
    periodEnd: localDate,
    classIds: z.array(uuidSchema).max(100).optional(),
  })
  .refine((value) => value.periodEnd >= value.periodStart, { message: "The end date must be on or after the start date.", path: ["periodEnd"] });
export type ReportRequestInput = z.input<typeof reportRequestSchema>;

/** A report by id; `schoolId`, when given, must be the report's school. */
export const reportRefSchema = z.object({ schoolId: uuidSchema.optional(), reportId: uuidSchema });

export const planRequestSchema = z.object({
  schoolId: uuidSchema,
  planId: optionalUuid,
  seats: z.coerce.number({ error: "Enter the number of students." }).int({ error: "Enter a whole number." }).min(1, { error: "Enter at least 1." }).max(100_000, { error: "That is more than we can quote online." }),
  message: optionalText(1_000),
});
export type PlanRequestInput = z.input<typeof planRequestSchema>;
