import { CalendarCheck, CalendarClock, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { DIAGNOSTIC_SIGN_UP_HREF } from "../site-nav";

const TOOLS: readonly { href: string; title: string; body: string; icon: ReactNode }[] = [
  {
    href: "/daily",
    title: "Today's question",
    body: "Answer today's question and see the marking straight away. No account needed.",
    icon: <CalendarCheck aria-hidden="true" />,
  },
  {
    href: "/exam-countdown",
    title: "Exam countdown",
    body: "Pick your board and exam session and see how many days you have left.",
    icon: <CalendarClock aria-hidden="true" />,
  },
  {
    href: DIAGNOSTIC_SIGN_UP_HREF,
    title: "Free diagnostic test",
    body: "Find your strong and weak topics, topic by topic, before you decide what to study next.",
    icon: <ClipboardCheck aria-hidden="true" />,
  },
];

/** Free acquisition tools (§46): daily question, exam countdown, free diagnostic. */
export function FreeTools() {
  return (
    <section aria-labelledby="free-tools-heading" className="border-b border-border bg-surface py-10 sm:py-12">
      <Container>
        <h2 id="free-tools-heading" className="text-sm font-semibold tracking-wide text-primary uppercase">
          Free tools
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
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
