import { AdminSection } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { FaqForm } from "../_components/FaqForm";
import { createFaqAction } from "../actions";

export const metadata = { title: "New FAQ entry" };

/** /admin/faq/new — write an FAQ entry (saved unpublished; publish it from its page after a read-through). */
export default async function NewFaqPage() {
  await requireAdminPage("content.publish", { next: "/admin/faq/new" });
  return (
    <Container size="wide">
      <PageHeader
        title="New FAQ entry"
        breadcrumbs={[{ label: "FAQ", href: "/admin/faq" }, { label: "New" }]}
        description="Entries are saved unpublished. Check the preview on the next page, then publish."
      />
      <AdminSection title="Entry">
        <FaqForm
          action={createFaqAction}
          submitLabel="Save entry"
          secondaryActions={
            <ButtonLink href="/admin/faq" variant="ghost">
              Cancel
            </ButtonLink>
          }
        />
      </AdminSection>
    </Container>
  );
}
