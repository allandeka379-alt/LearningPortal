/**
 * Client-safe contracts of exam mode (§12 mock exams, §13 examination mode). Type-only module: imported by the exam
 * room's client island, the Server Actions in `src/app/app/exams/actions.ts` and the exams service
 * (`src/server/exams/service.ts`), which builds every value here on the server.
 *
 * Nothing here carries answer data: questions are `PresentedQuestion` projections (no answer keys) and responses are
 * the student's OWN saved answers. Marks and reveals only exist on the results page, after submission.
 *
 * Times are epoch milliseconds from the SERVER clock (`serverNowMs` lets the client correct for its own clock offset).
 */
import type { PresentedQuestion, QuestionResponse } from "@/components/questions/types";

/** Timing of one paper / section of an attempt (per-paper timed mocks, §12). */
export interface ExamSectionClock {
  sectionNumber: number;
  /** Per-paper limit after any extra-time accommodation; null = the section shares the attempt's timer. */
  timeLimitSeconds: number | null;
  /** Set when the paper's clock was started (timed papers start when the student presses "Start"). */
  startedAtMs: number | null;
  deadlineMs: number | null;
  /** The student finished the paper early, or the attempt was closed. */
  finishedAtMs: number | null;
}

/** Server-authoritative clock of an attempt (§13 "time remaining"). */
export interface ExamClock {
  attemptId: string;
  /** False once the attempt was submitted or closed by the server (the client then opens the results). */
  open: boolean;
  /** The server's clock when this snapshot was taken. */
  serverNowMs: number;
  /** Overall deadline; null when the attempt has no overall time limit (untimed, or timed per paper). */
  deadlineMs: number | null;
  sections: ExamSectionClock[];
}

/** A paper / section of the exam with its questions. */
export interface ExamSection extends ExamSectionClock {
  title: string;
  /** "Answer any N" (null = answer all). */
  answerCount: number | null;
  /** Marks available in the section. */
  marks: number;
  /** Question positions in this section, in order. */
  positions: number[];
}

/** One question slot of the exam room. */
export interface ExamQuestion {
  /** 1-based question number (§13 numbering). */
  position: number;
  sectionNumber: number | null;
  /** Mark allocation (§13). */
  marks: number;
  flagged: boolean;
  /** The student's last saved answer (null = not answered). */
  response: QuestionResponse | null;
  /** Server save counter of this slot; the client sends higher versions so stale offline replays are ignored. */
  responseVersion: number;
  /** Null when the question can no longer be shown (withdrawn after the attempt started). */
  question: PresentedQuestion | null;
}

/** Everything the exam room needs (server-rendered once; the client island keeps it in sync). */
export interface ExamRoomData {
  attemptId: string;
  /** The assessment title, or the mode label for generated papers ("Timed exam"). */
  title: string;
  /** "Mock exam", "Topic test", ... */
  kindLabel: string;
  subject: { id: string; name: string };
  /** False for linear papers (adaptive diagnostics): no jumping, no flags, no going back. */
  allowNavigation: boolean;
  clock: ExamClock;
  /** Papers / sections (empty for generated papers without sections). */
  sections: ExamSection[];
  questions: ExamQuestion[];
  /** Where to resume (last position viewed, else question 1). */
  startPosition: number;
  totalMarks: number;
  /** Extra-time accommodation applied at start (percent), if any. */
  extraTimePercent: number | null;
}

/** Autosave of one answer and/or its flag (§12 "save progress", §13 "flag question"). */
export interface SaveExamInput {
  attemptId: string;
  position: number;
  /** `undefined` leaves the saved answer unchanged (flag-only save); `null` clears it. */
  response?: QuestionResponse | null;
  flagged?: boolean;
  /** Client save counter (greater than the stored one); older replays are ignored by the server. */
  responseVersion?: number;
  /** When the student made the change (server-clock estimate), so offline saves can sync late within the grace window. */
  clientSavedAtMs?: number;
  /** Active seconds on the question so far (the server keeps the maximum). */
  timeSpentSeconds?: number;
}

export interface SaveExamResult {
  position: number;
  saved: boolean;
  /** The server already had a newer save (offline replay); nothing changed. */
  stale: boolean;
  /** Accepted after the deadline because it was made before it (offline outbox). */
  lateSync: boolean;
  flagged: boolean;
  answered: boolean;
  responseVersion: number;
  serverNowMs: number;
  deadlineMs: number | null;
}

/** Start or finish one timed paper. */
export interface ExamSectionInput {
  attemptId: string;
  sectionNumber: number;
}

/** `STUDENT`: the student pressed Submit. `TIME_UP`: the client's countdown reached zero. */
export type ExamSubmitReason = "STUDENT" | "TIME_UP";

export interface SubmitExamInput {
  attemptId: string;
  reason: ExamSubmitReason;
}

/**
 * `submitted: false` only for `TIME_UP` when the server clock says time is not up yet (the client's countdown ran
 * ahead): the client re-syncs to the returned clock and keeps going.
 */
export type SubmitExamResult = { submitted: true; resultsHref: string } | { submitted: false; clock: ExamClock };
