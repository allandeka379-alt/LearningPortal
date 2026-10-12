"use client";

import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { cn } from "@/lib/cn";
import type { ActionResult } from "@/server/lib/errors";
import type { PracticeTopicOption, StartedPractice, StartPracticeInput } from "@/server/practice";
import type { DifficultyValue, PracticeOrigin } from "../_lib/params";

const DIFFICULTIES: readonly { value: DifficultyValue; label: string; description: string }[] = [
  { value: "ADAPTIVE", label: "Adaptive (recommended)", description: "Questions match your mastery: easier where you are weak, harder as you improve." },
  { value: "EASY", label: "Easy", description: "Build confidence with the basics." },
  { value: "MEDIUM", label: "Medium", description: "Typical exam questions." },
  { value: "HARD", label: "Hard", description: "Challenging, exam-level questions." },
];

const INDENT = ["pl-0", "pl-6", "pl-12", "pl-16", "pl-20"] as const;

export interface PracticeBuilderProps {
  subject: { id: string; name: string };
  topics: PracticeTopicOption[];
  defaults: { topicIds: string[]; count: number; difficulty: DifficultyValue; mode: "PRACTICE" | "RETEST"; origin: PracticeOrigin };
  sizes: number[];
  /** Today's allowance is used up: starting would fail, so the button is disabled with an explanation above. */
  blocked: boolean;
  upgradeHref: string;
  startAction: (input: StartPracticeInput) => Promise<ActionResult<StartedPractice>>;
}

/** Idempotency key for "start session" (randomUUID needs a secure context; fall back to getRandomValues). */
function newIdempotencyKey(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
}

interface TopicGroup {
  root: PracticeTopicOption;
  descendants: PracticeTopicOption[];
}

function groupTopics(topics: readonly PracticeTopicOption[]): TopicGroup[] {
  const groups: TopicGroup[] = [];
  for (const topic of topics) {
    const current = groups.at(-1);
    if (topic.depth === 0 || !current) groups.push({ root: topic, descendants: [] });
    else current.descendants.push(topic);
  }
  return groups;
}

/**
 * The practice builder form (§10): topics from the pinned syllabus, number of questions and difficulty (adaptive by
 * default, §11). Starting goes through a Server Action; the session opens on success. A per-submit idempotency key
 * makes a double tap (or a retry after a dropped response) resume the same session instead of starting two.
 */
export function PracticeBuilder({ subject, topics, defaults, sizes, blocked, upgradeHref, startAction }: PracticeBuilderProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(() => new Set(defaults.topicIds.filter((id) => topics.some((t) => t.id === id))));
  const [count, setCount] = useState(String(defaults.count));
  const [difficulty, setDifficulty] = useState<DifficultyValue>(defaults.difficulty);
  const [error, setError] = useState<Extract<ActionResult<never>, { ok: false }>["error"] | null>(null);
  const [pending, startTransition] = useTransition();
  const keyRef = useRef<string | null>(null);
  const groups = groupTopics(topics);
  const isRetest = defaults.mode === "RETEST";

  const toggle = (id: string, checked: boolean) => {
    const next = new Set(selected);
    if (checked) next.add(id);
    else next.delete(id);
    setSelected(next);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending || blocked) return;
    setError(null);
    keyRef.current ??= newIdempotencyKey();
    const idempotencyKey = keyRef.current;
    const requested = Number(count);
    startTransition(async () => {
      const result = await startAction({
        subjectId: subject.id,
        topicIds: [...selected],
        count: requested,
        difficulty,
        mode: defaults.mode,
        origin: defaults.origin,
        idempotencyKey,
      });
      if (!result.ok) {
        keyRef.current = null;
        setError(result.error);
        return;
      }
      const query = result.data.shortfall > 0 && !result.data.resumed ? `?requested=${requested}` : "";
      router.push(`/app/practice/${result.data.attemptId}${query}`);
    });
  };

  return (
    <form onSubmit={submit} className="space-y-8" noValidate>
      <fieldset className="min-w-0 space-y-3">
        <legend className="text-base font-semibold text-text">Topics</legend>
        <p className="text-sm text-muted">
          {isRetest
            ? "Leave all unticked to re-test every topic that is due. "
            : `Leave all unticked to practise all of ${subject.name}. `}
          Ticking a topic includes its subtopics.
        </p>
        {topics.length === 0 ? (
          <p className="text-sm text-muted">This syllabus has no topics published yet.</p>
        ) : (
          <ul className="divide-y divide-border rounded-card border border-border bg-surface">
            {groups.map(({ root, descendants }) => {
              const openByDefault = descendants.some((t) => selected.has(t.id));
              return (
                <li key={root.id} className="px-3 sm:px-4">
                  <Checkbox
                    label={root.code ? `${root.code} ${root.name}` : root.name}
                    checked={selected.has(root.id)}
                    onChange={(event) => toggle(root.id, event.target.checked)}
                    disabled={pending}
                  />
                  {descendants.length > 0 && (
                    <details open={openByDefault || undefined} className="pb-2">
                      <summary className="flex min-h-11 cursor-pointer items-center pl-8 text-sm font-medium text-primary">
                        {descendants.length} {descendants.length === 1 ? "subtopic" : "subtopics"}
                      </summary>
                      <ul>
                        {descendants.map((topic) => (
                          <li key={topic.id} className={cn(INDENT[Math.min(topic.depth, INDENT.length - 1)])}>
                            <Checkbox
                              label={topic.code ? `${topic.code} ${topic.name}` : topic.name}
                              checked={selected.has(topic.id)}
                              onChange={(event) => toggle(topic.id, event.target.checked)}
                              disabled={pending}
                            />
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {selected.size > 0 && (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-text">
              {selected.size} {selected.size === 1 ? "topic" : "topics"} selected
            </span>
            <Button variant="ghost" size="sm" className="min-h-11" onClick={() => setSelected(new Set())} disabled={pending}>
              Clear selection
            </Button>
          </div>
        )}
      </fieldset>

      <RadioGroup
        legend="Number of questions"
        name="count"
        appearance="card"
        orientation="horizontal"
        value={count}
        onValueChange={setCount}
        options={sizes.map((size) => ({ value: String(size), label: String(size), disabled: pending }))}
        className="[&_legend]:text-base [&_legend]:font-semibold"
      />

      <RadioGroup
        legend="Difficulty"
        name="difficulty"
        appearance="card"
        value={difficulty}
        onValueChange={(value) => setDifficulty(value as DifficultyValue)}
        options={DIFFICULTIES.map((option) => ({ ...option, disabled: pending }))}
        className="[&_legend]:text-base [&_legend]:font-semibold"
      />

      {error && (
        <Alert
          role="alert"
          tone={error.code === "QUOTA_EXCEEDED" || error.code === "ENTITLEMENT_REQUIRED" ? "accent" : "danger"}
          title={
            error.code === "QUOTA_EXCEEDED"
              ? "You've reached today's practice limit"
              : error.code === "ENTITLEMENT_REQUIRED"
                ? "Needs full access"
                : error.code === "NOT_FOUND"
                  ? "No questions match yet"
                  : "The session couldn't start"
          }
          action={
            error.code === "QUOTA_EXCEEDED" || error.code === "ENTITLEMENT_REQUIRED" ? (
              <UpgradeButton fallbackHref={upgradeHref} variant="accent" />
            ) : undefined
          }
        >
          {error.code === "NOT_FOUND"
            ? `${error.message} Try other topics or another difficulty.`
            : (error.fieldErrors && Object.values(error.fieldErrors).flat()[0]) || error.message}
        </Alert>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        className="sm:w-auto"
        loading={pending}
        loadingText="Preparing your questions…"
        disabled={blocked}
        iconEnd={<ArrowRight aria-hidden="true" />}
      >
        {isRetest ? "Start re-test" : "Start practising"}
      </Button>
    </form>
  );
}
