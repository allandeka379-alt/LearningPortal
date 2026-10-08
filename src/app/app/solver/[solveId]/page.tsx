import { Archive } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SolutionDetail } from "@/components/solver/SolutionDetail";
import { buttonStyles } from "@/components/ui/button-styles";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { getSolve } from "@/server/solver";
import { archiveSolveAction, rateSolutionAction } from "../actions";

export const metadata: Metadata = { title: "Solved question" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * One solved question (§15), rendered on the server (KaTeX). "Teach me" solves reveal one step at a time and keep the
 * student's place in `?step=`. Someone else's solve is a plain 404 (row-level security: it does not exist for this
 * user).
 */
export default async function SolvePage({
  params,
  searchParams,
}: {
  params: Promise<{ solveId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { solveId } = await params;
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the whole area is a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireOnboardedStudent({ next: `/app/solver/${solveId}` });
  if (!UUID.test(solveId)) notFound();
  const { step } = await searchParams;
  const view = await getSolve(actor, solveId).catch((error: unknown) => {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  });
  const title = view.title ?? "Your question";

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        title={title}
        eyebrow={view.subject?.name}
        breadcrumbs={[{ label: "Question solver", href: "/app/solver" }, { label: title }]}
        actions={
          <form action={archiveSolveAction}>
            <input type="hidden" name="solveId" value={view.id} />
            <button type="submit" className={buttonStyles({ variant: "ghost" })}>
              <Archive aria-hidden="true" />
              Remove from history
            </button>
          </form>
        }
      />
      <SolutionDetail view={view} stepParam={step} rateAction={rateSolutionAction} />
    </Container>
  );
}
