# Website redesign brief (owner request 2026-10-12)

Owner, verbatim intent: "design it in a way that it is not only an exams platform but a learning platform for form 3 to
form 6 students, and also being able to target students writing their exams ... enterprise grade production level ...
there is no free tier, the payment is a dollar via paynow ... move to production; we will finish writing content while
the system is live." Human content review is removed (content is published straight to production).

## Positioning

- BvunzoHub is a **complete learning platform for Form 3 to Form 6** (ZIMSEC O-Level and Cambridge IGCSE in Forms 3-4;
  ZIMSEC A-Level and Cambridge AS & A Level in Forms 5-6 / Lower and Upper Sixth). Learn every topic through the
  year, then revise and rehearse for the exam.
- Two journeys, one product:
  1. **Learning through the year** (Form 3, Form 5 / Lower Sixth, and anyone mid-course): structured courses per
     subject that follow the syllabus topic by topic: lesson -> quick check -> practice -> flashcards -> topic test.
  2. **Writing exams this year** (Form 4, Form 6 / Upper Sixth, private candidates): exam-countdown, revision plan
     built around the exam date, exam-style questions, timed mock papers with grade estimates, weak-topic repair.
- **One price:** US$1, paid once through Paynow (EcoCash, OneMoney, card). Lifetime access, every subject, every
  level, no subscription, nothing renews. There is NO free plan, free preview or free diagnostic. Never write
  "Start free", "free account", "free plan", "try free". Account creation is a step toward paying, not a tier.
  CTA wording: "Get full access for US$1", "Unlock everything — US$1", "Join BvunzoHub". Secondary: "See how it works",
  "Browse subjects".
- Public marketing tools that stay public (they are samples, not a tier): the daily question page, the exam
  countdown, and the SEO syllabus pages (structure + short excerpts only).

## Voice

Calm, confident, adult, Zimbabwean context; second person; short sentences; British spelling. No hype, no invented
numbers (only real counts from the DB, e.g. lessons/questions published), no fake testimonials, no "AI" claims (AI
is switched off). Brand name only via `APP_NAME` from `src/lib/config.ts`.

## Visual system

Existing tokens only (`src/app/globals.css`): Zambezi teal primary, Msasa amber accent (one accent per view),
Granite neutrals; semantic tokens (`bg-surface`, `text-muted`, `border-border`, `bg-primary text-on-primary` ...).
Plus Jakarta Sans. Primitives in `src/components/ui`. Calm, premium, not childish: no confetti, mascots, gratuitous
gradients/animations; respect prefers-reduced-motion; dark mode via tokens. Mobile-first at 360px; touch targets
>= 44px; no horizontal scroll; semantic HTML; visible focus; WCAG AA.

## Information architecture

Marketing nav: How it works · Subjects · For exam candidates · Schools · Pricing; actions: Sign in, "Get full access".
Student app tabs (mobile, max 5): Home · Learn · Practice · Exams · Plan. "Learn" (`/app/learn` or the reworked
`/app/subjects`) is the course library: each subject is a course with its syllabus topics in order, lesson progress
and a "Continue" button. The dashboard leads with "Continue learning" (next lesson), then the week's plan, then exam
countdown / readiness; analytics move lower. Show the student's form (YearGroup name) and qualification in the
dashboard greeting.

Terminology: "Form 3", "Form 4", "Form 5 (Lower Sixth)", "Form 6 (Upper Sixth)"; "course" = a subject's lessons in
syllabus order; "lesson", "topic", "practice", "topic test", "mock exam".
