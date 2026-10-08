import { z } from "zod";
import { MARKING_MODES, QUESTION_LIMITS, QUESTION_TYPES, type MarkingMode, type QuestionType } from "@/lib/questions";
import { questionOptionInputSchema } from "@/server/cms/questions/schemas";
import { ACADEMIC_YEAR_PATTERN, MAX_PRACTICE_QUESTIONS, PRACTICE_DIFFICULTIES } from "./core";

export { TEACHER_QUESTION_TYPES } from "./core";

/**
 * Input contracts of the teacher area (§22) and the student-side class features. Isomorphic (no server-only imports):
 * forms share the TYPES, the services always validate. Form posts send strings, so optional fields accept "" as
 * "not given" and numbers / flags arrive as text.
 */

const blankToNull = (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null));
const blankToUndefined = (value: unknown) => (typeof value === "string" && value.trim() === "" ? undefined : (value ?? undefined));

export const uuidSchema = z.uuid("Choose a valid item.");
const optionalUuid = z.preprocess(blankToNull, uuidSchema.nullable());

/** Checkbox / switch values from forms ("on", "true", "1") or booleans. */
export const flag = z.preprocess((value) => value === true || value === "true" || value === "on" || value === "1", z.boolean());

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : (value ?? null)),
    z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`).nullable(),
  );

const optionalInt = (min: number, max: number, message: string) =>
  z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? null : typeof value === "string" ? Number(value) : value),
    z.int(message).min(min, message).max(max, message).nullable(),
  );

/** `YYYY-MM-DDTHH:mm` from a `datetime-local` input (wall clock in the teacher's time zone), or null. */
const localDateTime = z.preprocess(
  blankToNull,
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/, "Enter a date and time.")
    .nullable(),
);

// =====================================================================================================================
// Classes
// =====================================================================================================================

export const createClassSchema = z.object({
  name: z.string().trim().min(1, "Give the class a name.").max(120, "Use at most 120 characters."),
  description: optionalText(1_000),
  /** The school the class belongs to; empty for an independent tutor's class. */
  schoolId: optionalUuid,
  subjectId: optionalUuid,
  qualificationId: optionalUuid,
  academicYear: z.string().trim().regex(ACADEMIC_YEAR_PATTERN, "Use a year such as 2026 or 2026/27."),
  joinRequiresApproval: flag.default(false),
});
export type CreateClassInput = z.input<typeof createClassSchema>;

export const updateClassSchema = z.object({
  classId: uuidSchema,
  name: z.string().trim().min(1, "Give the class a name.").max(120, "Use at most 120 characters."),
  description: optionalText(1_000),
  joinRequiresApproval: flag.default(false),
});
export type UpdateClassInput = z.input<typeof updateClassSchema>;

export const classRefSchema = z.object({ classId: uuidSchema });
export const memberRefSchema = z.object({ classId: uuidSchema, userId: uuidSchema });

/** Up to 50 emails, phone numbers or school usernames, one per line (or separated by commas / semicolons). */
export const addStudentsSchema = z.object({
  classId: uuidSchema,
  identifiers: z
    .string()
    .max(10_000)
    .transform((value) =>
      [
        ...new Set(
          value
            .split(/[\n,;]+/)
            .map((part) => part.trim())
            .filter((part) => part !== ""),
        ),
      ],
    )
    .pipe(z.array(z.string().max(254)).min(1, "Enter at least one email, phone number or username.").max(50, "Add at most 50 students at a time.")),
});
export type AddStudentsInput = z.input<typeof addStudentsSchema>;

export const coTeacherSchema = z.object({
  classId: uuidSchema,
  identifier: z.string().trim().min(3, "Enter the teacher's email, phone number or username.").max(254),
});

export const invitationRefSchema = z.object({ classId: uuidSchema, invitationId: uuidSchema });

/** What a student types to join a class. */
export const joinCodeInputSchema = z.object({ code: z.string().max(40) });

/** An invitation link token (32 random bytes, base64url). */
export const invitationTokenSchema = z.string().regex(/^[A-Za-z0-9_-]{32,64}$/, "This invitation link is not valid.");

// =====================================================================================================================
// Assignments
// =====================================================================================================================

export const ASSIGNMENT_TYPES = ["LESSON", "ASSESSMENT", "PRACTICE"] as const;
export const SCORE_POLICIES = ["FIRST", "BEST", "LATEST"] as const;
export const AI_HELP_LEVELS = ["NONE", "HINTS_ONLY", "FULL"] as const;
export const PUBLISH_MODES = ["draft", "now", "schedule"] as const;

export const createAssignmentSchema = z
  .object({
    classId: uuidSchema,
    type: z.enum(ASSIGNMENT_TYPES, { message: "Choose what to assign." }),
    title: z.string().trim().min(1, "Give the work a title.").max(200, "Use at most 200 characters."),
    instructions: optionalText(10_000),
    /** Required for a subject-less class; must match the class subject otherwise. */
    subjectId: optionalUuid,
    lessonId: optionalUuid,
    assessmentId: optionalUuid,
    topicIds: z.preprocess(
      (value) => (typeof value === "string" ? (value === "" ? [] : [value]) : (value ?? [])),
      z.array(uuidSchema).max(10, "Choose at most 10 topics."),
    ),
    questionCount: optionalInt(1, MAX_PRACTICE_QUESTIONS, `Choose 1 to ${MAX_PRACTICE_QUESTIONS} questions.`),
    difficulty: z.preprocess(blankToUndefined, z.enum(PRACTICE_DIFFICULTIES).default("ADAPTIVE")),
    timeLimitMinutes: optionalInt(5, 240, "Use a time limit from 5 to 240 minutes."),
    dueAt: localDateTime,
    closesAt: localDateTime,
    /** A checkbox: absent means "no" (an unticked box is not submitted). */
    allowLateSubmission: flag.default(false),
    maxAttempts: optionalInt(1, 20, "Allow 1 to 20 attempts, or leave it empty for no limit."),
    scorePolicy: z.preprocess(blankToUndefined, z.enum(SCORE_POLICIES).default("BEST")),
    aiHelp: z.preprocess(blankToUndefined, z.enum(AI_HELP_LEVELS).default("HINTS_ONLY")),
    publish: z.preprocess(blankToUndefined, z.enum(PUBLISH_MODES).default("now")),
    publishAt: localDateTime,
    /** PRACTICE only: assign to these ACTIVE members instead of the whole class. */
    studentIds: z.preprocess(
      (value) => (typeof value === "string" ? (value === "" ? [] : [value]) : (value ?? [])),
      z.array(uuidSchema).max(500),
    ),
  })
  .superRefine((value, ctx) => {
    if (value.type === "LESSON" && !value.lessonId) ctx.addIssue({ code: "custom", path: ["lessonId"], message: "Choose a lesson." });
    if (value.type === "ASSESSMENT" && !value.assessmentId) ctx.addIssue({ code: "custom", path: ["assessmentId"], message: "Choose a test." });
    if (value.type === "PRACTICE") {
      if (value.topicIds.length === 0) ctx.addIssue({ code: "custom", path: ["topicIds"], message: "Choose at least one topic." });
      if (value.questionCount === null) ctx.addIssue({ code: "custom", path: ["questionCount"], message: "Choose how many questions." });
    } else if (value.studentIds.length > 0) {
      ctx.addIssue({ code: "custom", path: ["studentIds"], message: "Only practice can be set for chosen students." });
    }
    if (value.publish === "schedule" && !value.publishAt) ctx.addIssue({ code: "custom", path: ["publishAt"], message: "Choose when to publish." });
  });
export type CreateAssignmentInput = z.input<typeof createAssignmentSchema>;
export type CreateAssignmentData = z.output<typeof createAssignmentSchema>;

export const assignmentRefSchema = z.object({ assignmentId: uuidSchema });

export const studentProgressRefSchema = z.object({ assignmentId: uuidSchema, userId: uuidSchema });

export const assignmentFeedbackSchema = z.object({
  assignmentId: uuidSchema,
  userId: uuidSchema,
  feedback: z.string().trim().max(2_000, "Use at most 2,000 characters."),
});

/** One-click "assign practice on this topic" (§22 weak topics). */
export const assignTopicPracticeSchema = z.object({
  classId: uuidSchema,
  topicId: uuidSchema,
  /** Whole class, or only the students weak on the topic. */
  audience: z.preprocess(blankToUndefined, z.enum(["CLASS", "WEAK_STUDENTS"]).default("CLASS")),
  questionCount: z.preprocess((value) => (value === "" || value === undefined ? 10 : Number(value)), z.int().min(1).max(MAX_PRACTICE_QUESTIONS)),
  dueInDays: z.preprocess((value) => (value === "" || value === undefined ? 7 : Number(value)), z.int().min(1).max(60)),
});

// =====================================================================================================================
// Teacher tests (§22 "create tests")
// =====================================================================================================================

/** Who owns a teacher-made question or test: a school (its teachers share it) or the teacher as an independent tutor. */
export const contentOwnerSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("school"), schoolId: uuidSchema }),
  z.object({ kind: z.literal("tutor") }),
]);
export type ContentOwnerInput = z.input<typeof contentOwnerSchema>;

const markdown = (max: number) => z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`);
const jsonDocument = z.unknown().superRefine((value, ctx) => {
  if (value === null || value === undefined) return;
  if (typeof value !== "object" || Array.isArray(value)) ctx.addIssue({ code: "custom", message: "Must be an object." });
  else if (JSON.stringify(value).length > 100_000) ctx.addIssue({ code: "custom", message: "This question is too large." });
});
const marksSchema = z.int("Marks must be a whole number.").min(1, "At least 1 mark.").max(100, "At most 100 marks.");
const typeSchema = z.enum(QUESTION_TYPES as [QuestionType, ...QuestionType[]], { message: "Choose a question type." });
const markingSchema = z.enum(MARKING_MODES as [MarkingMode, ...MarkingMode[]], { message: "Choose how it is marked." });

const definition = {
  type: typeSchema,
  markingMode: markingSchema,
  stem: markdown(10_000),
  payload: jsonDocument,
  answerSpec: jsonDocument,
  marks: marksSchema,
  options: z.array(questionOptionInputSchema).max(QUESTION_LIMITS.maxOptions).default([]),
};

const subPartSchema = z.object({
  partLabel: z.string().trim().min(1, "Give the part a label such as (a).").max(16),
  ...definition,
  explanation: optionalText(10_000),
  workedSolution: optionalText(10_000),
  hints: z.array(markdown(2_000)).max(5).default([]),
});
const partSchema = subPartSchema.extend({ parts: z.array(subPartSchema).max(QUESTION_LIMITS.maxParts).default([]) });

export const teacherQuestionSchema = z
  .object({
    owner: contentOwnerSchema,
    subjectId: uuidSchema,
    /** Primary topic in the subject's syllabus (mastery and reporting count the answers there). */
    topicId: uuidSchema,
    ...definition,
    parts: z.array(partSchema).max(QUESTION_LIMITS.maxParts).default([]),
    explanation: optionalText(10_000),
    workedSolution: optionalText(10_000),
    hints: z.array(markdown(2_000)).max(5, "At most 5 hints.").default([]),
    difficulty: z.int("Choose a difficulty.").min(1, "Choose a difficulty from 1 to 5.").max(5, "Choose a difficulty from 1 to 5."),
    /** The teacher confirms they wrote it (or may use it): recorded as the owner's original work. */
    rightsConfirmed: z.literal(true, { message: "Confirm that you wrote this question or have the right to use it." }),
  })
  .superRefine((value, ctx) => {
    const banned = (type: QuestionType, path: (string | number)[]) => {
      if (type === "DIAGRAM_LABELLING") ctx.addIssue({ code: "custom", path, message: "Diagram labelling is not available in class tests yet." });
    };
    banned(value.type, ["type"]);
    value.parts.forEach((part, i) => {
      banned(part.type, ["parts", i, "type"]);
      part.parts.forEach((sub, j) => banned(sub.type, ["parts", i, "parts", j, "type"]));
    });
  });
export type TeacherQuestionInput = z.input<typeof teacherQuestionSchema>;
export type TeacherQuestionData = z.output<typeof teacherQuestionSchema>;

export const TEACHER_TEST_KINDS = ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST"] as const;
export const TEACHER_FEEDBACK_TIMINGS = ["IMMEDIATE", "AFTER_SUBMIT", "AFTER_CLOSE"] as const;

export const teacherTestSchema = z.object({
  owner: contentOwnerSchema,
  subjectId: uuidSchema,
  title: z.string().trim().min(1, "Give the test a title.").max(200, "Use at most 200 characters."),
  description: optionalText(2_000),
  instructions: optionalText(5_000),
  kind: z.enum(TEACHER_TEST_KINDS).default("QUIZ"),
  timeLimitMinutes: optionalInt(5, 240, "Use a time limit from 5 to 240 minutes, or none."),
  feedbackTiming: z.enum(TEACHER_FEEDBACK_TIMINGS).default("AFTER_SUBMIT"),
  /** Questions in order; `marks` overrides the question's marks (teacher weighting). */
  items: z
    .array(z.object({ questionId: uuidSchema, marks: z.int().min(1).max(100).nullable().default(null) }))
    .max(100, "Use at most 100 questions.")
    .default([]),
});
export type TeacherTestInput = z.input<typeof teacherTestSchema>;

export const updateTeacherTestSchema = teacherTestSchema.omit({ owner: true, subjectId: true }).extend({ assessmentId: uuidSchema });
export type UpdateTeacherTestInput = z.input<typeof updateTeacherTestSchema>;

export const questionSearchSchema = z.object({
  subjectId: uuidSchema,
  owner: contentOwnerSchema,
  topicId: optionalUuid.optional(),
  type: z.preprocess(blankToNull, typeSchema.nullable()).optional(),
  difficulty: optionalInt(1, 5, "Choose a difficulty from 1 to 5.").optional(),
  q: z.preprocess(blankToNull, z.string().trim().max(100).nullable()).optional(),
  /** "bank" = published platform questions, "own" = the owner's own questions. */
  source: z.enum(["bank", "own"]).default("bank"),
  excludeIds: z.array(uuidSchema).max(100).default([]),
  limit: z.int().min(1).max(50).default(20),
});
export type QuestionSearchInput = z.input<typeof questionSearchSchema>;

// =====================================================================================================================
// Marking (§22 marking queue)
// =====================================================================================================================

export const markAnswerSchema = z.object({
  attemptId: uuidSchema,
  position: z.coerce.number().int().min(1).max(32_767),
  marksAwarded: z.coerce.number().int("Award whole marks.").min(0, "Marks cannot be negative.").max(1_000),
  comment: optionalText(2_000),
  /** Shown to the student when an existing mark is changed. */
  reason: optionalText(500),
});
export type MarkAnswerInput = z.input<typeof markAnswerSchema>;

// =====================================================================================================================
// Announcements
// =====================================================================================================================

export const classAnnouncementSchema = z
  .object({
    classId: uuidSchema,
    title: z.string().trim().min(1, "Give the announcement a title.").max(200, "Use at most 200 characters."),
    body: z.string().trim().min(1, "Write the announcement.").max(5_000, "Use at most 5,000 characters."),
    pinned: flag.default(false),
    publish: z.preprocess(blankToUndefined, z.enum(["now", "schedule"]).default("now")),
    publishAt: localDateTime,
    expiresAt: localDateTime,
  })
  .superRefine((value, ctx) => {
    if (value.publish === "schedule" && !value.publishAt) ctx.addIssue({ code: "custom", path: ["publishAt"], message: "Choose when to publish." });
  });
export type ClassAnnouncementInput = z.input<typeof classAnnouncementSchema>;

export const announcementRefSchema = z.object({ announcementId: uuidSchema });
