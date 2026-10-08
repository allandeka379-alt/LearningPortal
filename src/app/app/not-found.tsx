import { SearchX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

/** 404 inside the student area: keeps the shell, explains, and offers the way back. */
export default function StudentAreaNotFound() {
  return (
    <Container size="reading" className="py-10 sm:py-14">
      <div className="flex flex-col items-center rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
          <SearchX aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-text">We couldn&rsquo;t find that page</h1>
        <p className="mt-1.5 max-w-sm text-sm text-muted">It may have moved, or the link may be out of date.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/app">Go to your dashboard</ButtonLink>
          <ButtonLink href="/app/subjects" variant="outline">
            Your subjects
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
