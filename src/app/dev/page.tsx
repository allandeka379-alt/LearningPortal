import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { Card } from "@/components/ui/Card";

const PAGES = [
  { href: "/dev/ui", title: "Design system", description: "Tokens, typography and every UI primitive in all variants." },
  { href: "/dev/shell/app", title: "App shell", description: "Student area: sidebar on desktop, bottom tab bar on mobile." },
  { href: "/dev/shell/admin", title: "Admin shell", description: "Dense grouped sidebar; collapses into a sheet on mobile." },
  { href: "/dev/shell/marketing", title: "Marketing shell", description: "Public header with mobile menu, and footer." },
  { href: "/dev/outbox", title: "Dev outbox", description: "Emails (sign-up and sign-in codes, resets, invitations) captured by the console driver." },
] as const;

export default function DevIndexPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1}>
      <Container size="reading" className="py-10">
        <Logo />
        <PageHeader title="Developer previews" description="Development builds only. These routes 404 in production." />
        <ul className="grid grid-cols-1 gap-3">
          {PAGES.map((page) => (
            <li key={page.href}>
              <Card interactive className="p-4">
                <Link href={page.href} className="flex items-center justify-between gap-4 after:absolute after:inset-0">
                  <span>
                    <span className="block font-semibold text-text">{page.title}</span>
                    <span className="block text-sm text-muted">{page.description}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-muted" />
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
