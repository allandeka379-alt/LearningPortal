"use client";

import { useActionState, useId, useSyncExternalStore } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";

export interface NewConversationSubject {
  subjectId: string;
  name: string;
  qualification: string;
}

export interface NewConversationTopic {
  id: string;
  name: string;
  code: string | null;
  kind: "SECTION" | "TOPIC" | "SUBTOPIC";
}

export interface NewConversationFormProps {
  subjects: readonly NewConversationSubject[];
  /** Topics of the selected subject's pinned syllabus version (empty until a subject is chosen). */
  topics: readonly NewConversationTopic[];
  selectedSubjectId: string | null;
  selectedTopicId: string | null;
  /** Set when opened from "Ask the tutor about this" on a question. */
  questionId: string | null;
  /** GET target that reloads the page with `?subjectId=` (topic list for that subject). */
  pickerPath: string;
  action: FormAction;
}

const subscribeNever = (): (() => void) => () => undefined;

function topicLabel(topic: NewConversationTopic): string {
  const name = topic.code ? `${topic.code} ${topic.name}` : topic.name;
  return topic.kind === "SUBTOPIC" ? ` ${name}` : name;
}

/**
 * Subject → topic pickers for a new tutor conversation. The subject picker is a GET form (works without JS; with JS
 * it reloads on change), so only the pinned syllabus of the chosen subject is ever sent to the browser. The start
 * button posts to a Server Action, which validates the enrolment and topic again on the server.
 */
export function NewConversationForm({ subjects, topics, selectedSubjectId, selectedTopicId, questionId, pickerPath, action }: NewConversationFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  // false on the server and for no-JS visitors (who need the "Show topics" button), true once hydrated.
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const subjectFieldId = useId();

  const sections = topics.filter((topic) => topic.kind === "SECTION");
  const selectable = topics.filter((topic) => topic.kind !== "SECTION");

  return (
    <div className="space-y-6">
      {!questionId && (
        <form method="get" action={pickerPath} className="space-y-3" aria-label="Choose a subject">
          <Field label="Subject" id={subjectFieldId} hint="Only your own subjects are listed.">
            <Select
              name="subjectId"
              defaultValue={selectedSubjectId ?? ""}
              placeholder="Any subject (general question)"
              options={subjects.map((subject) => ({ value: subject.subjectId, label: `${subject.name} (${subject.qualification})` }))}
              onChange={(event) => event.currentTarget.form?.requestSubmit()}
            />
          </Field>
          {!hydrated && (
            <Button type="submit" variant="outline">
              Show topics
            </Button>
          )}
        </form>
      )}

      <form action={formAction} className="space-y-4" aria-label="Start a conversation">
        {selectedSubjectId && <input type="hidden" name="subjectId" value={selectedSubjectId} />}
        {questionId && <input type="hidden" name="questionId" value={questionId} />}
        {selectedSubjectId && !questionId && selectable.length > 0 && (
          <Field label="Topic" optional hint="Pick a topic so the tutor can pitch its explanations to your syllabus.">
            <Select name="topicId" defaultValue={selectedTopicId ?? ""} placeholder="The whole subject">
              {sections.length === 0
                ? selectable.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topicLabel(topic)}
                    </option>
                  ))
                : groupBySection(topics).map((group) =>
                    group.section ? (
                      <optgroup key={group.section.id} label={group.section.name}>
                        {group.items.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topicLabel(topic)}
                          </option>
                        ))}
                      </optgroup>
                    ) : (
                      group.items.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topicLabel(topic)}
                        </option>
                      ))
                    ),
                  )}
            </Select>
          </Field>
        )}
        {questionId && selectedTopicId && <input type="hidden" name="topicId" value={selectedTopicId} />}
        <Button type="submit" loading={pending} loadingText="Starting…">
          Start conversation
        </Button>
        <FormFeedback state={state} />
      </form>
    </div>
  );
}

/** Topics in tree order, grouped under their SECTION (topics before any section form an ungrouped first group). */
export function groupBySection(topics: readonly NewConversationTopic[]): { section: NewConversationTopic | null; items: NewConversationTopic[] }[] {
  const groups: { section: NewConversationTopic | null; items: NewConversationTopic[] }[] = [];
  for (const topic of topics) {
    if (topic.kind === "SECTION") {
      groups.push({ section: topic, items: [] });
      continue;
    }
    let current = groups.at(-1);
    if (!current) {
      current = { section: null, items: [] };
      groups.push(current);
    }
    current.items.push(topic);
  }
  return groups.filter((group) => group.items.length > 0);
}
