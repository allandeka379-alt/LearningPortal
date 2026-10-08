import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

/** Admin route-level loading state (dense list / dashboard placeholder). */
export default function AdminLoading() {
  return (
    <Container size="wide" className="pt-8" aria-busy="true">
      <p className="sr-only" role="status">
        Loading…
      </p>
      <Skeleton className="h-8 w-56" />
      <Skeleton className="mt-3 h-4 w-80 max-w-full" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-24" />
        ))}
      </div>
      <Skeleton className="mt-6 h-72" />
    </Container>
  );
}
