import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { newRequestId, solverAvailabilityOf, SOLVER_DISCLAIMER } from "@/components/solver/labels";
import { SolveHistory } from "@/components/solver/SolveHistory";
import { SolverForm } from "@/components/solver/SolverForm";
import { SolverAvailabilityNotice, SolverQuotaIndicator } from "@/components/solver/SolverNotices";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { getSolverStatus, listSolverSubjects, listSolves } from "@/server/solver";
import { archiveSolveAction, solveQuestionAction } from "./actions";

export const metadata: Metadata = { title: "Question solver" };

const HISTORY_PAGE_SIZE = 10;

/**
 * AI question solver (§15): type or photograph a question, choose "Teach me" (default) or "Give me the answer", and
 * get a step-by-step solution. Shows today's allowance, calm states when the solver is unavailable (not configured,
 * paused, not in the plan, exam in progress) and the student's private history (cursor-paginated, `?cursor=`).
 * `?subjectId=` preselects the subject (entry links from subject pages).
 */
export default async function SolverPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the whole area is a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireOnboardedStudent({ next: "/app/solver" });
  const { cursor, subjectId } = await searchParams;
  const pageCursor = typeof cursor === "string" ? cursor : null;
  const [status, subjects, history] = await Promise.all([
    getSolverStatus(actor),
    listSolverSubjects(actor),
    listSolves(actor, { cursor: pageCursor, limit: HISTORY_PAGE_SIZE }).catch((error: unknown) => {
      // A tampered or stale cursor shows the first page instead of an error.
      if (isAppError(error) && error.code === "VALIDATION") return listSolves(actor, { limit: HISTORY_PAGE_SIZE });
      throw error;
    }),
  ]);
  const availability = solverAvailabilityOf(status);
  const firstPage = pageCursor === null;
  const preselected = typeof subjectId === "string" && subjects.some((subject) => subject.subjectId === subjectId) ? subjectId : null;

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        title="Question solver"
        description="Stuck on a question? Type it or take a photo. “Teach me” takes you through it one step at a time; “Give me the answer” shows the full worked solution."
      />
      <div className="space-y-8">
        {firstPage && (
          <div className="space-y-4">
            <SolverAvailabilityNotice availability={availability} upgradeHref={status.upgradeHref} />
            {availability === "ready" && (
              <Card className="space-y-4 p-4 sm:p-6">
                <SolverQuotaIndicator quota={status.quota} upgradeHref={status.upgradeHref} />
                <SolverForm
                  action={solveQuestionAction}
                  subjects={subjects}
                  defaultSubjectId={preselected}
                  maxInputChars={status.maxInputChars}
                  maxImageBytes={status.maxImageBytes}
                  imageUploads={status.imageUploads}
                  requestId={newRequestId()}
                  upgradeHref={status.upgradeHref}
                  blocked={status.quota?.remaining === 0}
                />
              </Card>
            )}
            <p className="text-xs text-muted">{SOLVER_DISCLAIMER} Your questions are private to you.</p>
          </div>
        )}

        <section aria-labelledby="solver-history-title" className="space-y-4">
          <h2 id="solver-history-title" className="text-lg font-semibold text-text">
            {firstPage ? "Your past questions" : "Older questions"}
          </h2>
          <SolveHistory items={history.items} timeZone={actor.timeZone} archiveAction={archiveSolveAction} emptyState={firstPage} />
          <div className="flex flex-wrap justify-center gap-2">
            {!firstPage && (
              <ButtonLink href="/app/solver" variant="ghost">
                Back to the solver
              </ButtonLink>
            )}
            {history.nextCursor && (
              <ButtonLink href={`/app/solver?cursor=${encodeURIComponent(history.nextCursor)}`} variant="outline">
                Older questions
              </ButtonLink>
            )}
          </div>
        </section>
      </div>
    </Container>
  );
}
