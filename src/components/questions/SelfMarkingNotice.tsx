import { Alert } from "@/components/ui/Alert";

/**
 * Results-page prompt when written answers wait for marking and AI marking is not configured: the student can mark
 * them against the mark scheme in the answer review below (`<ReviewList selfAssess />`). Renders nothing for 0.
 */
export function SelfMarkingNotice({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null;
  return (
    <Alert
      tone="info"
      className={className}
      title={count === 1 ? "One written answer is waiting for your mark" : `${count} written answers are waiting for your mark`}
    >
      Automatic marking isn&apos;t available right now. Open {count === 1 ? "it" : "them"} under the answer review below, compare
      with the mark scheme and mark {count === 1 ? "it" : "each one"} yourself. Your score updates as you go; self-marked
      answers are labelled as such.
    </Alert>
  );
}
