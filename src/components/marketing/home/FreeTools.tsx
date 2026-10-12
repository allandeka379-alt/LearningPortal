import { CalendarCheck, CalendarClock } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

const TOOLS: readonly { href: string; title: string; body: string; icon: ReactNode }[] = [
  {
    href: "/daily",
    title: "Today's question",
    body: "Answer one question from today's set and see how it is marked, with the explanation. No account needed.",
    icon: <CalendarCheck aria-hidden="true" />,
  },
  {
    href: "/exam-countdown",
    title: "Exam countdown",
    body: "Pick your board and exam session and see exactly how many days you have left.",
    icon: <CalendarClock aria-hidden="true" />,
  },
];

/**
 * Public samples (§46): the daily question and the exam countdown. They are a taste of the platform, not a free tier
 * (owner decision 2026-10-12: everything inside the app needs Full access).
 */
export function FreeTools() {
  return (
    <section aria-labelledby="try-heading" className="border-b border-border bg-surface py-10 sm:py-12">
      <Container className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
        <div>
          <h2 id="try-heading" className="text-sm font-semibold tracking-wide text-primary uppercase">
            Try it now
          </h2>
          <p className="mt-2 text-lg font-semibold text-text">See how questions are marked before you join.</p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {TOOLS.map((tool) => (
            <li
              key={tool.href}
              className="relative flex gap-4 rounded-card border border-border bg-bg p-4 transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-md has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus sm:p-5"
            >
              <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-on-accent-soft [&_svg]:size-5">
                {tool.icon}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-text">
                  <Link href={tool.href} className="outline-none after:absolute after:inset-0 after:rounded-card">
                    {tool.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{tool.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
