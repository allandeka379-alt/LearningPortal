import { Container } from "@/components/layout/Container";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

export interface PageSkeletonProps {
  /** Rough shape of the page being loaded. */
  variant?: "dashboard" | "list" | "detail" | "form";
  /** Announced to screen readers while loading. */
  label?: string;
}

function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-card border border-border bg-surface p-4 sm:p-5">
      <Skeleton className="mb-4 h-5 w-2/5" />
      <SkeletonText lines={lines} />
    </div>
  );
}

/**
 * Loading placeholder for student routes (`loading.tsx`): the page's rough shape in skeleton blocks, with a polite
 * status message for assistive technology. Server component; no animation beyond the token pulse (which
 * prefers-reduced-motion neutralises globally).
 */
export function PageSkeleton({ variant = "list", label = "Loading" }: PageSkeletonProps) {
  return (
    <Container aria-busy="true" className="pb-10">
      <p role="status" className="sr-only">
        {label}…
      </p>
      <div className="space-y-3 pt-6 pb-6 sm:pt-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-3/4 max-w-md" />
        <Skeleton className="h-4 w-1/2 max-w-sm" />
      </div>
      {variant === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <CardSkeleton lines={4} />
            <CardSkeleton lines={4} />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-24 rounded-card" />
            ))}
          </div>
          <CardSkeleton lines={5} />
        </div>
      )}
      {variant === "list" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <CardSkeleton key={i} lines={3} />
          ))}
        </div>
      )}
      {variant === "detail" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-24 rounded-card" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <CardSkeleton lines={8} />
            <CardSkeleton lines={4} />
          </div>
        </div>
      )}
      {variant === "form" && (
        <div className="max-w-2xl space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <CardSkeleton key={i} lines={2} />
          ))}
        </div>
      )}
    </Container>
  );
}
