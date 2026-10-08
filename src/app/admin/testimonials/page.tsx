import { MessageSquareQuote, Plus } from "lucide-react";
import Link from "next/link";
import { CursorPagination } from "@/components/admin/CursorPagination";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { loadFirstPageOnStaleCursor } from "@/components/admin/list-cursor";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { TESTIMONIAL_STATES } from "@/server/cms/testimonials/schemas";
import { listTestimonials } from "@/server/cms/testimonials/service";
import { TestimonialStateBadge } from "./_components/TestimonialStateBadge";

export const metadata = { title: "Testimonials" };

const STATE_LABELS = { published: "Published", unpublished: "Not published", withdrawn: "Consent withdrawn" } as const;

/**
 * /admin/testimonials — real, consented testimonials for the home page (§45, rule 6): consent state, minors and
 * publication at a glance, newest first. `content.publish`.
 */
export default async function AdminTestimonialsPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.publish", { next: "/admin/testimonials" });
  const params = await searchParams;
  const filters = { state: enumParam(params, "state", TESTIMONIAL_STATES), cursor: firstParam(params, "cursor") };
  const page = await loadFirstPageOnStaleCursor(filters, (f) => listTestimonials(actor, f));

  return (
    <Container size="wide">
      <PageHeader
        title="Testimonials"
        description="Only real people's words, with their recorded consent (and a guardian's for under-18s). Nothing shows on the home page until it is published; withdrawn consent erases the quote."
        actions={
          <ButtonLink href="/admin/testimonials/new" iconStart={<Plus aria-hidden="true" />}>
            Record a testimonial
          </ButtonLink>
        }
      />
      <FilterBar
        action="/admin/testimonials"
        filters={[{ kind: "select", name: "state", label: "State", options: TESTIMONIAL_STATES.map((value) => ({ value, label: STATE_LABELS[value] })), value: filters.state, placeholder: "All" }]}
      />
      <DataTable
        caption="Testimonials"
        rows={page.items}
        rowKey={(row) => row.id}
        empty={
          <EmptyState
            icon={<MessageSquareQuote aria-hidden="true" />}
            title={filters.state ? "No testimonials in this state" : "No testimonials yet"}
            description={filters.state ? undefined : "The home page hides its testimonials section until one is published."}
          />
        }
        columns={[
          {
            key: "name",
            header: "Testimonial",
            primary: true,
            cell: (row) => (
              <span className="block min-w-0 max-w-xl">
                <span className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/testimonials/${row.id}`} className="font-medium text-text underline-offset-4 hover:underline">
                    {row.displayName}
                  </Link>
                  {row.isDemo && <DemoBadge />}
                </span>
                {row.descriptor && <span className="block text-xs text-muted">{row.descriptor}</span>}
                {row.quoteExcerpt && <span className="mt-0.5 block text-sm text-muted">“{row.quoteExcerpt}”</span>}
              </span>
            ),
          },
          { key: "state", header: "State", cell: (row) => <TestimonialStateBadge item={row} /> },
          { key: "minor", header: "Under 18", hideOnMobile: true, cell: (row) => (row.authorIsMinor ? (row.hasGuardianConsent ? "Yes, guardian consented" : "Yes, no guardian consent") : "No") },
          { key: "order", header: "Order", align: "end", hideOnMobile: true, cell: (row) => String(row.sortOrder) },
          { key: "created", header: "Recorded", hideOnMobile: true, cell: (row) => formatDate(row.createdAt) },
        ]}
      />
      <CursorPagination className="mt-4" path="/admin/testimonials" params={params} nextCursor={page.nextCursor} shownCount={page.items.length} label="Testimonial pages" />
    </Container>
  );
}
