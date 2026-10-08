import { ClipboardX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

/** Unknown test, or one that is not published for the student's subjects and syllabus version. */
export default function ExamNotFound() {
  return (
    <Container size="reading" className="py-10 sm:py-14">
      <div className="flex flex-col items-center rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
          <ClipboardX aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-text">This test isn&rsquo;t available</h1>
        <p className="mt-1.5 max-w-sm text-sm text-muted">
          It may have been withdrawn, or it isn&rsquo;t part of the syllabus version you study. Your other tests are still here.
        </p>
        <div className="mt-5">
          <ButtonLink href="/app/exams">Tests and exams</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
