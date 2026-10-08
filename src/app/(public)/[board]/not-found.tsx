import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

/** 404 inside the public chrome: unknown board / qualification / subject / topic / guide, or a reserved slug. */
export default function PublicCurriculumNotFound() {
  return (
    <Container size="reading" className="py-16 sm:py-24">
      <p className="text-sm font-semibold text-primary">Page not found</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-muted">
        The subject or topic may have moved, or the link may be mistyped. Choose an examination board from the menu, or
        go back to the home page.
      </p>
      <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/register" variant="outline">
          Create a free account
        </ButtonLink>
      </div>
    </Container>
  );
}
