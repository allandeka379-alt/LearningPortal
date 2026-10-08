import { Container } from "@/components/layout/Container";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Reading-layout placeholder while a lesson loads: title block, meta line and paragraphs. */
export default function LessonLoading() {
  return (
    <Container aria-busy="true" className="pb-12">
      <p role="status" className="sr-only">
        Loading lesson…
      </p>
      <div className="mx-auto max-w-reading lg:mx-0">
        <div className="space-y-3 pt-6 pb-4 sm:pt-8">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <Skeleton className="h-4 w-40" />
        <div className="mt-8 space-y-8">
          <SkeletonText lines={5} />
          <Skeleton className="h-28 w-full rounded-card" />
          <SkeletonText lines={6} />
        </div>
      </div>
    </Container>
  );
}
