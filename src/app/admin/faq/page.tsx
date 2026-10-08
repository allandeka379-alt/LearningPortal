import { CircleHelp, Plus } from "lucide-react";
import Link from "next/link";
import { AdminSection } from "@/components/admin/DetailParts";
import { FilterBar } from "@/components/admin/FilterBar";
import { formatDate } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { enumParam, firstParam, type PageSearchParams } from "@/components/admin/search-params";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { FAQ_STATES } from "@/server/cms/faq/schemas";
import { listFaqItems } from "@/server/cms/faq/service";
import { faqCategoryLabel } from "@/server/marketing/faq";
import { MoveButtons } from "./_components/MoveButtons";
import { moveFaqAction } from "./actions";

export const metadata = { title: "FAQ" };

/**
 * /admin/faq — FAQ entries for /faq, the home page, /pricing and /schools (§45), grouped by language and category in
 * public order, with publish state and reordering. `content.publish`.
 */
export default async function AdminFaqPage({ searchParams }: { searchParams: Promise<PageSearchParams> }) {
  const actor = await requireAdminPage("content.publish", { next: "/admin/faq" });
  const params = await searchParams;
  const filters = { category: firstParam(params, "category"), locale: firstParam(params, "locale"), state: enumParam(params, "state", FAQ_STATES) };
  const list = await listFaqItems(actor, filters);
  const filtered = Boolean(filters.category || filters.locale || filters.state);
  // Reordering needs the whole group in view; a state filter hides part of it.
  const canReorder = !filters.state;

  return (
    <Container size="wide">
      <PageHeader
        title="FAQ"
        description="Questions and answers on the public site. Only published entries are shown there; the order below is the public order."
        actions={
          <ButtonLink href="/admin/faq/new" iconStart={<Plus aria-hidden="true" />}>
            New FAQ entry
          </ButtonLink>
        }
      />
      <FilterBar
        action="/admin/faq"
        filters={[
          { kind: "select", name: "category", label: "Category", options: list.categories.map((value) => ({ value, label: faqCategoryLabel(value) })), value: filters.category, placeholder: "All" },
          { kind: "select", name: "locale", label: "Language", options: list.locales.map((value) => ({ value, label: value })), value: filters.locale, placeholder: "All" },
          {
            kind: "select",
            name: "state",
            label: "State",
            options: [
              { value: "published", label: "Published" },
              { value: "unpublished", label: "Not published" },
            ],
            value: filters.state,
            placeholder: "All",
          },
        ]}
      />
      {list.truncated && (
        <Alert tone="info" className="mb-4">
          Only the first 500 entries are listed. Filter by category or language to see the rest.
        </Alert>
      )}
      {list.groups.length === 0 ? (
        <EmptyState
          icon={<CircleHelp aria-hidden="true" />}
          title={filtered ? "No FAQ entries match these filters" : "No FAQ entries yet"}
          description={filtered ? undefined : "The public FAQ sections stay hidden until an entry is published."}
          action={filtered ? undefined : <ButtonLink href="/admin/faq/new">Write the first entry</ButtonLink>}
        />
      ) : (
        <div className="space-y-6">
          {list.groups.map((group) => (
            <AdminSection key={`${group.locale}:${group.category}`} title={faqCategoryLabel(group.category)} description={`Category "${group.category}" · language ${group.locale}`} flush>
              <DataTable
                caption={`FAQ entries in ${faqCategoryLabel(group.category)} (${group.locale})`}
                captionHidden
                rows={group.items}
                rowKey={(row) => row.id}
                className="rounded-none border-x-0 border-b-0"
                columns={[
                  {
                    key: "question",
                    header: "Question",
                    primary: true,
                    cell: (row) => (
                      <span className="flex min-w-0 flex-wrap items-center gap-2">
                        <Link href={`/admin/faq/${row.id}`} className="font-medium text-text underline-offset-4 hover:underline">
                          {row.question}
                        </Link>
                        {row.isDemo && <DemoBadge />}
                      </span>
                    ),
                  },
                  {
                    key: "state",
                    header: "State",
                    cell: (row) =>
                      row.isPublished ? (
                        <Badge size="sm" tone="success">
                          Published
                        </Badge>
                      ) : (
                        <Badge size="sm" tone="neutral" appearance="outline">
                          Not published
                        </Badge>
                      ),
                  },
                  { key: "updated", header: "Updated", hideOnMobile: true, cell: (row) => formatDate(row.updatedAt) },
                  {
                    key: "order",
                    header: <span className="sr-only">Order</span>,
                    align: "end",
                    cell: (row) => {
                      if (!canReorder) return null;
                      const index = group.items.indexOf(row);
                      return <MoveButtons action={moveFaqAction} faqItemId={row.id} label={row.question} isFirst={index === 0} isLast={index === group.items.length - 1} />;
                    },
                  },
                ]}
              />
            </AdminSection>
          ))}
        </div>
      )}
    </Container>
  );
}
