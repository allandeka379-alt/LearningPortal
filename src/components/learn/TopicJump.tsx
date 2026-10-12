"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { topicHref } from "@/components/lessons/labels";
import { Button } from "@/components/ui/Button";

export interface TopicJumpOption {
  id: string;
  /** "3.2 Simultaneous equations". */
  label: string;
  /** Section heading the topic sits under (an optgroup), or null. */
  section: string | null;
}

export interface TopicJumpProps {
  subjectId: string;
  topics: readonly TopicJumpOption[];
  className?: string;
}

/**
 * "Go to a topic" on the course page: students may study the syllabus in any order (owner request 2026-10-12), so any
 * topic is one choice away, whatever "Continue" suggests. A labelled native select (grouped by section) plus a button,
 * so it works with the keyboard and screen readers; the full outline below lists every topic as links as well.
 */
export function TopicJump({ subjectId, topics, className }: TopicJumpProps) {
  const router = useRouter();
  const id = useId();
  const [topicId, setTopicId] = useState("");
  if (topics.length < 2) return null;

  const groups: { section: string | null; topics: TopicJumpOption[] }[] = [];
  for (const topic of topics) {
    const last = groups.at(-1);
    if (last && last.section === topic.section) last.topics.push(topic);
    else groups.push({ section: topic.section, topics: [topic] });
  }

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        if (topicId) router.push(topicHref(subjectId, topicId));
      }}
    >
      <label htmlFor={id} className="text-sm font-semibold text-text">
        Go to any topic
      </label>
      <div className="mt-1.5 flex gap-2">
        <select
          id={id}
          value={topicId}
          onChange={(event) => setTopicId(event.target.value)}
          className="min-h-11 w-full min-w-0 flex-1 rounded-control border border-border-strong bg-surface px-3 text-base text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:text-sm"
        >
          <option value="">Choose a topic…</option>
          {groups.map((group, index) =>
            group.section ? (
              <optgroup key={`${group.section}-${index}`} label={group.section}>
                {group.topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              group.topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.label}
                </option>
              ))
            ),
          )}
        </select>
        <Button type="submit" variant="outline" disabled={!topicId} iconEnd={<ArrowRight aria-hidden="true" />}>
          Open
        </Button>
      </div>
    </form>
  );
}
