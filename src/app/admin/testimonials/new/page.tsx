import { AdminSection } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { TestimonialForm } from "../_components/TestimonialForm";
import { createTestimonialAction } from "../actions";

export const metadata = { title: "Record a testimonial" };

/** /admin/testimonials/new — record a real testimonial together with its consent (saved unpublished). */
export default async function NewTestimonialPage() {
  await requireAdminPage("content.publish", { next: "/admin/testimonials/new" });
  return (
    <Container size="wide">
      <PageHeader
        title="Record a testimonial"
        breadcrumbs={[{ label: "Testimonials", href: "/admin/testimonials" }, { label: "New" }]}
        description="Only record a testimonial you have written consent for. It is saved unpublished; you are recorded as the person who recorded the consent."
      />
      <AdminSection title="Testimonial and consent">
        <TestimonialForm
          action={createTestimonialAction}
          submitLabel="Save testimonial"
          secondaryActions={
            <ButtonLink href="/admin/testimonials" variant="ghost">
              Cancel
            </ButtonLink>
          }
        />
      </AdminSection>
    </Container>
  );
}
