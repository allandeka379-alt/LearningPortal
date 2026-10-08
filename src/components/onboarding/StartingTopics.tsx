import { BookOpen, PencilLine } from "lucide-react";
import { practiceHref } from "@/components/dashboard/links";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { StartingTopicView } from "@/server/onboarding/diagnostic";
import { startingReasonText } from "./copy";

/** Questions in the "Practise" session offered for a starting topic. */
export const STARTING_PRACTICE_QUESTIONS = 10;

/**
 * §52 "recommended starting topics": at most three, gaps first, each with the reason in plain words and working links
 * (the topic's first lesson when there is one, and a practice session on the topic at adaptive difficulty). Server
 * component.
 */
export function StartingTopics({ subjectId, topics }: { subjectId: string; topics: readonly StartingTopicView[] }) {
  return (
    <Card as="section" aria-labelledby="starting-topics-heading">
      <CardHeader
        titleAs="h2"
        title={<span id="starting-topics-heading">Where to start</span>}
        description="Recommended starting topics, based on your answers."
      />
      <CardBody>
        {topics.length === 0 ? (
          <p className="text-sm text-muted">There are no topics to recommend yet.</p>
        ) : (
          <ol className="space-y-4">
            {topics.map((topic, index) => (
              <li key={topic.topicId} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-on-primary-soft"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="text-base font-semibold break-words text-text">{topic.name}</h3>
                  <p className="text-sm text-muted">{startingReasonText(topic.reason, topic.percent)}</p>
                  <div className="flex flex-wrap gap-2">
                    {topic.lesson && (
                      <ButtonLink
                        href={`/app/lessons/${topic.lesson.lessonId}`}
                        variant="secondary"
                        iconStart={<BookOpen aria-hidden="true" />}
                        className="max-w-full"
                        aria-label={`Lesson: ${topic.lesson.title}`}
                      >
                        {topic.lesson.title}
                      </ButtonLink>
                    )}
                    <ButtonLink
                      href={practiceHref({ subjectId, topicId: topic.topicId, count: STARTING_PRACTICE_QUESTIONS, origin: "RECOMMENDATION" })}
                      variant="outline"
                      iconStart={<PencilLine aria-hidden="true" />}
                      className="max-w-full"
                      aria-label={`Practise ${STARTING_PRACTICE_QUESTIONS} questions on ${topic.name}`}
                    >
                      Practise {STARTING_PRACTICE_QUESTIONS} questions
                    </ButtonLink>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardBody>
    </Card>
  );
}
