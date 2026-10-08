import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ExamRoom } from "@/components/exam/ExamRoom";
import { FocusedLayer } from "@/components/exam/FocusedLayer";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { getDiagnosticRoom, type DiagnosticRoomLoad } from "@/server/onboarding/diagnostic";
import { diagnosticReportHref } from "@/server/onboarding/report";
import { isUuid } from "../_lib/params";
import {
  finishDiagnosticSectionAction,
  saveDiagnosticResponseAction,
  startDiagnosticSectionAction,
  submitDiagnosticAction,
  syncDiagnosticClockAction,
} from "../actions";

export const metadata: Metadata = { title: "Diagnostic" };

async function loadRoom(attemptId: string): Promise<DiagnosticRoomLoad> {
  const actor = await requireOnboardedStudent({ next: `/app/diagnostic/${attemptId}` });
  try {
    return await getDiagnosticRoom(actor, attemptId);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

/**
 * Taking the diagnostic (§52 step 5): the exam room in a focused full-screen layer (one question at a time, autosave
 * with an offline copy, question grid, review, confirmed submit) with NO feedback until submission (mode DIAGNOSTIC is
 * always "on submit"). Questions are presented on the server (sanitised HTML, never answer keys). Submitting opens
 * the diagnostic report; a closed diagnostic redirects there.
 */
export default async function DiagnosticRoomPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  if (!isUuid(attemptId)) notFound();
  const loaded = await loadRoom(attemptId);
  if (loaded.kind === "REDIRECT") redirect(loaded.href);

  return (
    <FocusedLayer label={`Diagnostic: ${loaded.room.title}`}>
      <ExamRoom
        data={loaded.room}
        actions={{
          save: saveDiagnosticResponseAction,
          syncClock: syncDiagnosticClockAction,
          startSection: startDiagnosticSectionAction,
          finishSection: finishDiagnosticSectionAction,
          submit: submitDiagnosticAction,
        }}
        exitHref="/app/diagnostic"
        resultsHref={diagnosticReportHref(attemptId)}
        noun="diagnostic"
      />
    </FocusedLayer>
  );
}
