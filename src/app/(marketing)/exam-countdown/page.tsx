import { CalendarClock } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatShortDate } from "@/components/marketing/countdown";
import { ExamCountdown } from "@/components/marketing/ExamCountdown";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCountdownCatalogue } from "@/server/marketing/countdown";
import { marketingMetadata } from "@/server/marketing/metadata";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return marketingMetadata({
    title: "Exam countdown",
    description: "How many days until your ZIMSEC or Cambridge exams? Pick your board, qualification and exam session.",
    path: "/exam-countdown",
  });
}

/**
 * /exam-countdown (§17, §46): a free tool. Sessions come from the database (PUBLISHED, not yet ended); the day count is
 * computed in the visitor's browser from today's date, so the cached page is never a day out. Below the tool, every
 * upcoming session is listed as plain HTML (works without JavaScript).
 */
export default async function ExamCountdownPage() {
  const boards = await getCountdownCatalogue();
  const rows = boards.flatMap((board) => board.qualifications.flatMap((qualification) => qualification.sessions.map((session) => ({ qualification, session }))));

  return (
    <>
      <Container size="reading" className="pb-12 sm:pb-16">
        <PageHeader
          eyebrow="Exam tools"
          title="Exam countdown"
          description="Choose your examination board, qualification and session to see how many days you have left to prepare."
        />
        {rows.length === 0 ? (
          <EmptyState
            icon={<CalendarClock aria-hidden="true" />}
            title="No exam sessions published yet"
            description="Exam sessions appear here once their dates have been added. Check back soon."
          />
        ) : (
          <>
            <ExamCountdown boards={boards} />

            <section aria-labelledby="sessions-heading" className="mt-12">
              <h2 id="sessions-heading" className="text-xl font-bold tracking-tight text-text">
                Upcoming exam sessions
              </h2>
              <p className="mt-1 text-sm text-muted">Dates marked provisional are still to be confirmed against the official timetable.</p>
              <div className="relative mt-4 overflow-x-auto rounded-card border border-border bg-surface">
                <table className="w-full min-w-[20rem] text-left text-sm">
                  <caption className="sr-only">Upcoming exam sessions and their first exam day</caption>
                  <thead>
                    <tr className="border-b border-border text-muted">
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Session
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Starts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(({ qualification, session }) => (
                      <tr key={session.id} className="border-t border-border first:border-t-0">
                        <td className="px-4 py-3 text-text">
                          <span className="block text-xs text-muted">{qualification.label}</span>
                          {session.name}
                          {session.isDemo && (
                            <Badge tone="warning" size="sm" className="ml-2 align-middle">
                              Demo
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-text">
                          <time dateTime={session.startsOn}>{formatShortDate(session.startsOn)}</time>
                          {session.isProvisional && <span className="block text-xs text-warning-text">Provisional</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </Container>
      <FinalCta
        title="Turn the countdown into a plan"
        description="Join, choose your exam session and get a weekly study plan that fits the days you have left, with lessons, practice and timed mock papers."
      />
    </>
  );
}
