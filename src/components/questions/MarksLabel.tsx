import { cn } from "@/lib/cn";
import { marksText } from "./response-model";

export interface MarksLabelProps {
  marks: number;
  /** Marks awarded, shown as "2/3 marks" once an answer is marked. */
  awarded?: number | null;
  className?: string;
}

/**
 * Mark allocation in the exam-paper style "[3 marks]" (§13). The brackets are visual only; screen readers hear
 * "3 marks" (or "2 of 3 marks").
 */
export function MarksLabel({ marks, awarded, className }: MarksLabelProps) {
  const hasAwarded = typeof awarded === "number";
  const spoken = hasAwarded ? `${awarded} of ${marksText(marks)}` : marksText(marks);
  return (
    <span className={cn("shrink-0 text-sm font-medium whitespace-nowrap text-muted tabular-nums", className)}>
      <span aria-hidden="true">{hasAwarded ? `[${awarded}/${marksText(marks)}]` : `[${marksText(marks)}]`}</span>
      <span className="sr-only">{spoken}</span>
    </span>
  );
}
