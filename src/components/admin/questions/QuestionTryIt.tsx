"use client";

import { FlaskConical, RotateCcw } from "lucide-react";
import { useState, useTransition } from "react";
import { FeedbackPanel } from "@/components/questions/FeedbackPanel";
import { QuestionView } from "@/components/questions/QuestionView";
import type { PresentedQuestion, QuestionResponse } from "@/components/questions/types";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/server/lib/errors";
import type { TryQuestionResult } from "@/server/cms/questions/preview";
import { MARKING_OUTCOME_LABELS } from "./labels";

/**
 * "Try it" (§42 quality control): the question exactly as students see it, answered here and marked by the real
 * marking engine on the server. Shows the student feedback and, for editors, the engine's detail (flags, per-item
 * marks), so a wrong answer key is caught before review. Uses the SAVED question.
 */

export interface QuestionTryItProps {
  questionId: string;
  question: PresentedQuestion | null;
  problem: string | null;
  tryAction: (input: { questionId: string; response: unknown }) => Promise<ActionResult<TryQuestionResult>>;
}

function humanize(flag: string): string {
  const words = flag.replace(/_/g, " ").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function QuestionTryIt({ questionId, question, problem, tryAction }: QuestionTryItProps) {
  const [response, setResponse] = useState<QuestionResponse | null>(null);
  const [result, setResult] = useState<TryQuestionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const [pending, start] = useTransition();

  if (!question) {
    return (
      <Alert tone="warning" title="Preview unavailable">
        {problem ?? "Save the question to preview it."}
      </Alert>
    );
  }

  const mark = () => {
    setError(null);
    start(async () => {
      const outcome = await tryAction({ questionId, response });
      if (outcome.ok) setResult(outcome.data);
      else setError(outcome.error.message);
    });
  };

  const reset = () => {
    setResponse(null);
    setResult(null);
    setError(null);
    setRound((r) => r + 1);
  };

  return (
    <div className="space-y-4">
      <QuestionView key={round} question={question} mode="practice" response={response} onChange={setResponse} feedback={result?.feedback ?? null} heading="Student view" headingLevel={3} />
      <div className="flex flex-wrap gap-2">
        <Button type="button" iconStart={<FlaskConical aria-hidden="true" />} onClick={mark} loading={pending} loadingText="Marking…">
          {response === null ? "Mark a blank answer" : "Mark this answer"}
        </Button>
        <Button type="button" variant="ghost" iconStart={<RotateCcw aria-hidden="true" />} onClick={reset}>
          Start again
        </Button>
      </div>
      {error && (
        <Alert tone="danger" role="alert">
          {error}
        </Alert>
      )}
      {result && (
        <div className="space-y-4">
          <FeedbackPanel feedback={result.feedback} headingLevel={3} />
          <section aria-label="Marking engine detail" className="space-y-2 rounded-card border border-border p-3">
            <h3 className="text-sm font-semibold text-text">Marking engine detail</h3>
            <p className="text-sm text-text">
              {MARKING_OUTCOME_LABELS[result.detail.outcome] ?? result.detail.outcome}: {result.detail.marksAwarded} of {result.detail.maxMarks} marks
              {result.detail.pendingMarks > 0 ? `, ${result.detail.pendingMarks} still to be decided by AI or a person` : ""}.
            </p>
            {result.detail.correctAnswer && <p className="text-sm text-muted">Correct answer as shown to students: {result.detail.correctAnswer}</p>}
            {result.detail.flags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {result.detail.flags.map((flag) => (
                  <Badge key={flag} size="sm" tone="neutral">
                    {humanize(flag)}
                  </Badge>
                ))}
              </div>
            )}
            {result.detail.parts.length > 0 && (
              <ul className="text-sm text-text">
                {result.detail.parts.map((part) => (
                  <li key={part.label}>
                    {part.label}: {part.awarded}/{part.max} ({MARKING_OUTCOME_LABELS[part.outcome] ?? part.outcome})
                  </li>
                ))}
              </ul>
            )}
            {result.detail.rows.length > 0 && (
              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Per-item marks</caption>
                  <thead className="text-muted">
                    <tr>
                      <th scope="col" className="py-1 pr-3 font-medium">Item</th>
                      <th scope="col" className="py-1 pr-3 font-medium">Expected</th>
                      <th scope="col" className="py-1 pr-3 font-medium">Given</th>
                      <th scope="col" className="py-1 font-medium">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.detail.rows.map((row, index) => (
                      <tr key={`${row.id}-${index}`} className="border-t border-border">
                        <td className="py-1 pr-3 font-mono text-xs">{row.id}</td>
                        <td className="py-1 pr-3">{row.expected ?? "—"}</td>
                        <td className="py-1 pr-3">{row.given ?? "—"}</td>
                        <td className="py-1">
                          {row.awarded === null ? "pending" : row.awarded}
                          {row.maxMarks !== null ? ` / ${row.maxMarks}` : ""}
                          {row.correct === true ? " (right)" : row.correct === false ? " (wrong)" : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
