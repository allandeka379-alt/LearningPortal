import {
  BookOpen,
  ChartColumn,
  CircleCheck,
  ClipboardList,
  Clock,
  Flag,
  Layers,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  Target,
  Upload,
  Users,
} from "lucide-react";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { TUTOR_STEPS } from "../copy";
import { Illustration } from "../Illustration";
import { FeatureItem, Section } from "../Section";

/** AI Tutor (§45, §14, §15): what it does, the teach-first principle and an honest note on its limits. */
export function AiTutorSection() {
  return (
    <Section
      id="ai-tutor"
      eyebrow="AI tutor"
      title="A tutor that teaches, not one that does your homework"
      description="Ask about a topic or type in a question you are stuck on. The tutor knows your board, subject and the topics you find hard, and it works through the problem with you."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-text">How it helps</h3>
            <ol className="mt-4 space-y-3">
              {TUTOR_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-on-primary-soft tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <span className="text-base text-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <Alert tone="neutral" icon={<Lightbulb aria-hidden="true" />} title="Explained, not just given">
            You choose between &ldquo;Teach me&rdquo; and &ldquo;Show me the answer&rdquo;, and either way you see the
            working. AI can make mistakes, so check anything important against the worked solutions or with your
            teacher. Your name and contact details are never sent to the AI.
          </Alert>
        </div>
        <Illustration name="tutor" alt="A question followed by a step-by-step explanation, a hint and a prompt to try it yourself" sizes="(min-width: 1024px) 36vw, 100vw" />
      </div>
    </Section>
  );
}

/** Practice (§45, §9–§11): instant marking, explanations and adaptive selection. */
export function PracticeSection() {
  return (
    <Section
      id="practice"
      tone="surface"
      eyebrow="Practice"
      title="Practice that shows you why"
      description="Every answer is checked straight away, with the reasoning behind it, so each question teaches you something."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureItem icon={<CircleCheck />} title="Instant marking">
          Multiple choice, numerical and short answers are marked the moment you check them.
        </FeatureItem>
        <FeatureItem icon={<BookOpen />} title="Explanations and worked solutions">
          See the correct answer, why it is correct and the method, step by step.
        </FeatureItem>
        <FeatureItem icon={<Lightbulb />} title="Hints when you are stuck">
          Reveal one hint at a time before you look at the answer.
        </FeatureItem>
        <FeatureItem icon={<Target />} title="Focus on weak topics">
          Questions adapt to your results, so practice goes where it is needed most.
        </FeatureItem>
        <FeatureItem icon={<Layers />} title="Flashcards">
          Definitions, formulas and key facts, scheduled for review just before you forget them.
        </FeatureItem>
        <FeatureItem icon={<ChartColumn />} title="Progress by topic">
          See which topics are secure and which need more work, across every subject.
        </FeatureItem>
      </ul>
    </Section>
  );
}

/** Mock exams (§45, §12, §13): realistic timed papers with analysis afterwards. */
export function MockExamsSection() {
  return (
    <Section
      id="mock-exams"
      eyebrow="Mock exams"
      title="Rehearse the real thing"
      description="Timed papers in an exam-style interface, then a clear report on what to study next."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-14">
        <Illustration name="exam" alt="A timed exam paper with a question navigator and a flagged question" sizes="(min-width: 1024px) 36vw, 100vw" className="order-last lg:order-first" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <FeatureItem icon={<Clock />} title="Timed exam mode">
            A visible timer, numbered questions and the marks for each one, like the paper itself.
          </FeatureItem>
          <FeatureItem icon={<Flag />} title="Navigate and flag">
            Move between questions, flag the ones to come back to and review anything unanswered before you submit.
          </FeatureItem>
          <FeatureItem icon={<ListChecks />} title="Marking and a grade estimate">
            Automatic marking where possible, with your score, percentage and an estimated grade.
          </FeatureItem>
          <FeatureItem icon={<Target />} title="What to study next">
            Strong and weak areas, with the lessons and practice that close the gaps.
          </FeatureItem>
        </ul>
      </div>
    </Section>
  );
}

/** Schools (§45, §53): the B2B / B2B2C offer in a dark band, with "Talk to us". */
export function SchoolsBand() {
  return (
    <section id="schools" aria-labelledby="schools-heading" data-theme="dark" className="relative overflow-hidden bg-bg text-text">
      <ChevronPattern variant="band" tone="accent" opacity={0.6} />
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">For schools</p>
          <h2 id="schools-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Give every learner a study partner, and every teacher a clear view
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Schools can give their students access, set work for classes and see progress topic by topic.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            <FeatureItem icon={<Users />} title="Teacher dashboards">
              Class progress, weak topics and who needs help.
            </FeatureItem>
            <FeatureItem icon={<ClipboardList />} title="Assignments">
              Set practice and tests with due dates.
            </FeatureItem>
            <FeatureItem icon={<ChartColumn />} title="School analytics">
              Results by subject, class and topic.
            </FeatureItem>
            <FeatureItem icon={<Upload />} title="Roster import">
              Add students from a spreadsheet.
            </FeatureItem>
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/schools" variant="accent" size="lg">
              Talk to us
            </ButtonLink>
            <p className="flex items-center gap-2 text-sm text-muted">
              <ShieldCheck aria-hidden="true" className="size-4 shrink-0" />
              Each school sees only its own students.
            </p>
          </div>
        </div>
        <Illustration name="schools" alt="A class list with topic progress bars, an assignment checklist and a results chart" sizes="(min-width: 1024px) 34vw, 100vw" />
      </Container>
    </section>
  );
}
