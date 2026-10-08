import { Receipt } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

/** Unknown payment, or one the student neither paid nor received (same answer, so other accounts are not revealed). */
export default function PaymentNotFound() {
  return (
    <Container size="reading" className="py-10 sm:py-14">
      <div className="flex flex-col items-center rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
          <Receipt aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold text-text">We couldn&rsquo;t find that payment</h1>
        <p className="mt-1.5 max-w-sm text-sm text-muted">
          It may belong to another account, or the link may be incomplete. Your payments are listed on Plan &amp; billing.
        </p>
        <div className="mt-5">
          <ButtonLink href="/app/billing">Plan &amp; billing</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
