import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Loading placeholder of an onboarding screen: progress bar, question and four choice cards, with a polite status
 * for assistive technology. Server component; the pulse is neutralised by prefers-reduced-motion globally.
 */
export function OnboardingSkeleton({ label = "Loading the next question" }: { label?: string }) {
  return (
    <Container size="reading" aria-busy="true">
      <p role="status" className="sr-only">
        {label}…
      </p>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-16 rounded-card" />
          ))}
        </div>
        <div className="flex justify-end border-t border-border pt-5">
          <Skeleton className="h-12 w-full rounded-control sm:w-36" />
        </div>
      </div>
    </Container>
  );
}
