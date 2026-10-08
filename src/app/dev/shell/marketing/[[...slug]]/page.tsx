import { notFound } from "next/navigation";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export default async function MarketingShellPreviewPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const page = slug?.join("/") ?? "home";

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full" opacity={0.07} />
        <Container className="relative py-16 sm:py-24">
          <p className="text-sm font-semibold text-primary">Preview · {page}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-text sm:text-5xl">Hero heading placeholder</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Marketing copy comes from the CMS. This preview only demonstrates the header, footer and motif.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/dev/shell/marketing/register" size="lg">
              Primary action
            </ButtonLink>
            <ButtonLink href="/dev/shell/marketing/subjects" size="lg" variant="outline">
              Secondary action
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* A dark theme island: the accent CTA is reserved for dark bands like this one. */}
      <section data-theme="dark" className="bg-bg text-text">
        <ChevronPattern variant="band" tone="accent" opacity={0.6} />
        <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dark band placeholder</h2>
            <p className="mt-2 text-muted">Rendered with data-theme=&quot;dark&quot; on the section.</p>
          </div>
          <ButtonLink href="/dev/shell/marketing/register" variant="accent" size="lg">
            Accent call to action
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
