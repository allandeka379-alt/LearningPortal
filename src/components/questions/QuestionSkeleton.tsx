import { Container } from "@/components/layout/Container";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/**
 * Loading placeholder shaped like one question (heading, stem, four answer rows, button) for question routes'
 * `loading.tsx`. Announces a polite status; the pulse is neutralised under prefers-reduced-motion (globals.css).
 */
export function QuestionSkeleton({ label = "Loading question" }: { label?: string }) {
  return (
    <Container size="reading" aria-busy="true" className="pb-12">
      <p role="status" className="sr-only">
        {label}…
      </p>
      <div className="space-y-3 pt-6 pb-4 sm:pt-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-2/3" />
      </div>
      <Skeleton className="mb-8 h-2 w-full rounded-full" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <SkeletonText lines={3} />
        <div className="space-y-2 pt-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-14 rounded-card" />
          ))}
        </div>
        <div className="flex justify-end pt-2">
          <Skeleton className="h-12 w-40 rounded-control" />
        </div>
      </div>
    </Container>
  );
}
