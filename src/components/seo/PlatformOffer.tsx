import { BookOpen, CalendarCheck, Check, ClipboardList, Layers, Target, Timer } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import { formatCount } from "@/lib/format";
import type { SyllabusContentCounts } from "@/server/seo/counts";

export interface PlatformOfferProps {
  /** e.g. "Mathematics". */
  subjectName: string;
  /** Real counts for the subject's current syllabus version; null when there is no published version yet. */
  counts: SyllabusContentCounts | null;
  /** False for COMING_SOON subjects (listed honestly, not yet open for study). */
  isEnrollable: boolean;
  signUpHref: string;
  pricingHref: string;
  headingId: string;
}

interface OfferItem {
  key: string;
  icon: ReactNode;
  title: string;
  detail: string;
}

/**
 * "What you get" box of a subject page. Numbers are real database counts (rule 6) and appear only when non-zero; the
 * remaining lines describe platform features (UI copy), never outcomes or user numbers. Server component.
 */
export function PlatformOffer({ subjectName, counts, isEnrollable, signUpHref, pricingHref, headingId }: PlatformOfferProps) {
  const items: OfferItem[] = [];
  if (counts && counts.lessons > 0) {
    items.push({ key: "lessons", icon: <BookOpen aria-hidden="true" />, title: formatCount(counts.lessons, "lesson"), detail: "Clear explanations with worked examples" });
  }
  if (counts && counts.questions > 0) {
    items.push({
      key: "questions",
      icon: <Target aria-hidden="true" />,
      title: formatCount(counts.questions, "practice question"),
      detail: "Instant marking, explanations and hints",
    });
  }
  if (counts && counts.mockExams > 0) {
    items.push({ key: "mocks", icon: <Timer aria-hidden="true" />, title: formatCount(counts.mockExams, "mock exam"), detail: "Timed, in exam conditions" });
  }
  if (counts && counts.topicTests > 0) {
    items.push({ key: "tests", icon: <ClipboardList aria-hidden="true" />, title: formatCount(counts.topicTests, "topic test"), detail: "Check what you know, topic by topic" });
  }
  if (counts && counts.flashcards > 0) {
    items.push({ key: "flashcards", icon: <Layers aria-hidden="true" />, title: formatCount(counts.flashcards, "flashcard"), detail: "Spaced repetition for quick revision" });
  }
  const hasContent = items.length > 0;

  return (
    <section aria-labelledby={headingId} className="rounded-card border border-border bg-surface p-5 shadow-xs sm:p-6">
      <h2 id={headingId} className="text-lg font-semibold text-text">
        Study {subjectName} on {APP_NAME}
      </h2>
      {!isEnrollable ? (
        <p className="mt-1 text-sm text-muted">This course is coming soon. Join now and add it to your subjects as soon as it opens.</p>
      ) : !hasContent ? (
        <p className="mt-1 text-sm text-muted">Lessons and practice questions for this subject are being prepared.</p>
      ) : null}

      {hasContent && (
        <ul role="list" className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.key} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-4.5">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-text tabular-nums">{item.title}</p>
                <p className="text-sm text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ul role="list" className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-text">
        <li className="flex items-start gap-2">
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
          Progress tracked topic by topic
        </li>
        <li className="flex items-start gap-2">
          <CalendarCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />A study plan built around your exam date
        </li>
      </ul>

      <div className="mt-5 flex flex-col gap-2">
        <ButtonLink href={signUpHref} variant="primary" fullWidth>
          Join to start learning
        </ButtonLink>
        <ButtonLink href={pricingHref} variant="outline" fullWidth>
          See pricing
        </ButtonLink>
      </div>
    </section>
  );
}
