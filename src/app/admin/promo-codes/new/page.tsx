import { requireAdminPage } from "@/components/admin/guards";
import { AdminSection } from "@/components/admin/DetailParts";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { listPlanOptions } from "@/server/cms/commerce/plans";
import { PRICE_CURRENCIES } from "@/server/cms/commerce/schemas";
import { CommerceNav } from "../../plans/_shared/CommerceNav";
import { PromoCodeForm } from "../_components/PromoCodeForm";
import { createPromoCodeAction } from "../actions";

export const metadata = { title: "New promo code" };

/** /admin/promo-codes/new — create a discount or free-days code. */
export default async function NewPromoCodePage() {
  const actor = await requireAdminPage("billing.manage", { next: "/admin/promo-codes/new" });
  const plans = await listPlanOptions(actor);
  return (
    <Container size="wide">
      <PageHeader title="New promo code" breadcrumbs={[{ label: "Promo codes", href: "/admin/promo-codes" }, { label: "New" }]} />
      <CommerceNav current="/admin/promo-codes" />
      <div className="max-w-3xl">
        <AdminSection title="Promo code">
          <PromoCodeForm
            action={createPromoCodeAction}
            submitLabel="Create promo code"
            plans={plans.map((plan) => ({ id: plan.id, label: `${plan.name} (${plan.code})${plan.isActive ? "" : " · retired"}`, audience: plan.audience }))}
            currencies={PRICE_CURRENCIES}
          />
        </AdminSection>
      </div>
    </Container>
  );
}
