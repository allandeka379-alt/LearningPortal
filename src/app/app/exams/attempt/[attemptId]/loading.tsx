import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

/** Exam room placeholder: the focused layout's header, one question and its answer rows. */
export default function ExamRoomLoading() {
  return (
    <div aria-busy="true" className="fixed inset-0 z-40 flex flex-col bg-bg">
      <p role="status" className="sr-only">
        Opening your exam…
      </p>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-page items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-9 w-24 rounded-full" />
          <Skeleton className="size-11 rounded-control" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-reading space-y-4 px-4 py-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <SkeletonText lines={3} />
        <div className="space-y-2 pt-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-14 rounded-card" />
          ))}
        </div>
      </div>
    </div>
  );
}
