import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ExamRoom } from "@/components/exam/ExamRoom";
import { FocusedLayer } from "@/components/exam/FocusedLayer";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getExamRoom, type ExamRoomLoad } from "@/server/exams/service";
import { isAppError } from "@/server/lib/errors";
import { isUuid } from "../../_lib/params";
import { finishExamSectionAction, saveExamResponseAction, startExamSectionAction, submitExamAction, syncExamClockAction } from "../../actions";

export const metadata: Metadata = { title: "Exam" };

async function loadRoom(attemptId: string): Promise<ExamRoomLoad> {
  const actor = await requireOnboardedStudent({ next: `/app/exams/attempt/${attemptId}` });
  try {
    return await getExamRoom(actor, attemptId);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

/**
 * The exam room (§13): a server-rendered shell (questions presented and sanitised on the server, remaining time
 * computed from the server deadline) with one client island for the timer, navigation and autosave (ARCHITECTURE §3.4
 * "Exam mode"). Focused layout: the student area's navigation is covered and made inert while the exam is open.
 * Attempts that belong elsewhere (practice-style, closed) are redirected.
 */
export default async function ExamRoomPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  if (!isUuid(attemptId)) notFound();
  const loaded = await loadRoom(attemptId);
  if (loaded.kind === "REDIRECT") redirect(loaded.href);

  return (
    <FocusedLayer label={`Exam: ${loaded.room.title}`}>
      <ExamRoom
        data={loaded.room}
        actions={{
          save: saveExamResponseAction,
          syncClock: syncExamClockAction,
          startSection: startExamSectionAction,
          finishSection: finishExamSectionAction,
          submit: submitExamAction,
        }}
        exitHref="/app/exams"
      />
    </FocusedLayer>
  );
}
