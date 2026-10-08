import { BookX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

/** Unknown subject id, or a subject the student is not enrolled in. */
export default function SubjectNotFound() {
  return (
    <Container size="reading" className="py-10 sm:py-14">
      <div className="flex flex-col items-center rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
          <BookX aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-text">This subject isn&rsquo;t on your list</h1>
        <p className="mt-1.5 max-w-sm text-sm text-muted">You can add it from Manage subjects if it is available for your qualification.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/app/subjects">Your subjects</ButtonLink>
          <ButtonLink href="/app/subjects/manage" variant="outline">
            Manage subjects
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
