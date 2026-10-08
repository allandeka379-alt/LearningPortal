import { SearchX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

/** Admin 404: the record does not exist (or the link is stale). */
export default function AdminNotFound() {
  return (
    <Container size="wide" className="pt-10">
      <div className="flex flex-col items-center rounded-card border border-dashed border-border bg-surface px-6 py-12 text-center">
        <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
          <SearchX aria-hidden="true" />
        </span>
        <h1 className="text-xl font-semibold text-text">We couldn&apos;t find that</h1>
        <p className="mt-1.5 max-w-sm text-sm text-muted">The record may have been removed, or the link is out of date.</p>
        <ButtonLink href="/admin" className="mt-5">
          Back to the dashboard
        </ButtonLink>
      </div>
    </Container>
  );
}
