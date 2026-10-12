import type { Metadata } from "next";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { AdminSection, KeyValueList } from "@/components/admin/DetailParts";
import { formatDate } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { describeBillingPeriod, formatMoney } from "@/components/parent/format";
import { SUBSCRIPTION_STATUS_META } from "@/components/school/labels";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatNumber } from "@/lib/format";
import { getSchoolSubscription } from "@/server/schools/billing";
import { requireSchoolPage } from "../_lib/context";
import { requestPlanAction } from "./actions";

export const metadata: Metadata = { title: "Subscription" };

/**
 * /school/billing — the school subscription (§31 SCHOOL plan, §53): plan, status and seats in use. There is no online
 * checkout for schools yet (B2B invoicing is arranged by the platform team): schools without a plan send a request.
 */
export default async function SchoolBillingPage() {
  const { actor, school } = await requireSchoolPage("/school/billing");
  const summary = await getSchoolSubscription(actor, school.schoolId);
  const { live } = summary;

  return (
    <Container size="wide">
      <PageHeader title="Subscription" description="Your school plan and how many student seats are in use." />
      <div className="space-y-6 pb-8">
        {live ? (
          <AdminSection
            title={live.planName}
            action={<Badge tone={SUBSCRIPTION_STATUS_META[live.status]?.tone ?? "neutral"}>{SUBSCRIPTION_STATUS_META[live.status]?.label ?? live.status}</Badge>}
          >
            <div className="space-y-5">
              <ProgressBar
                label="Student seats in use"
                value={live.seats.allocated}
                max={Math.max(live.seats.purchased, 1)}
                valueText={`${formatNumber(live.seats.allocated)} of ${formatNumber(live.seats.purchased)} seats`}
              />
              <KeyValueList
                items={[
                  { label: "Seats purchased", value: formatNumber(live.seats.purchased) },
                  { label: "Seats free", value: formatNumber(live.seats.available) },
                  { label: "Students on your roster", value: formatNumber(summary.activeStudents) },
                  { label: "Students without a seat", value: formatNumber(live.seats.studentsWithoutSeat) },
                  { label: "Current period", value: `${formatDate(live.currentPeriodStart, school.timezone)} – ${formatDate(live.currentPeriodEnd, school.timezone)}` },
                  { label: "Trial ends", value: live.trialEndsAt ? formatDate(live.trialEndsAt, school.timezone) : null, hideWhenEmpty: true },
                ]}
              />
              {live.cancelAtPeriodEnd && <Alert tone="warning">This subscription ends at the end of the current period.</Alert>}
              {live.seats.studentsWithoutSeat > 0 && (
                <Alert tone="info">
                  Students take an open seat automatically the next time they use the platform. When all seats are taken, the rest need
                  their own Full access. To add seats, use the request form below.
                </Alert>
              )}
            </div>
          </AdminSection>
        ) : (
          <Alert tone="info" title="No school plan yet">
            Your students need their own Full access for now. A school plan gives every student on your roster full access (one seat per
            student) and gives your teachers the class tools.
          </Alert>
        )}

        {summary.plans.length > 0 && (
          <AdminSection title="School plans">
            <ul className="grid gap-4 md:grid-cols-2">
              {summary.plans.map((plan) => (
                <li key={plan.id} className="rounded-card border border-border p-4">
                  <p className="font-semibold text-text">{plan.name}</p>
                  {plan.tagline && <p className="text-sm text-muted">{plan.tagline}</p>}
                  {plan.prices.length > 0 && (
                    <ul className="mt-2 space-y-0.5 text-sm text-text">
                      {plan.prices.map((price) => (
                        <li key={price.id}>
                          {formatMoney(price.amountMinor, price.currency)}
                          {price.perSeat ? " per student" : ""} {describeBillingPeriod(price)}
                          {price.minSeats ? ` (from ${formatNumber(price.minSeats)} students)` : ""}
                          {price.label ? ` · ${price.label}` : ""}
                        </li>
                      ))}
                    </ul>
                  )}
                  {plan.highlights.length > 0 && (
                    <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-muted">
                      {plan.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </AdminSection>
        )}

        <AdminSection title={live ? "Change your plan or add seats" : "Request a school plan"}>
          <div className="space-y-4">
            <Alert tone="neutral">
              Online payment for schools isn&rsquo;t available yet. Send a request and the platform team will contact you with a quote and
              an invoice (school invoicing terms are still being finalised).
            </Alert>
            {!summary.billingAvailable && (
              <Alert tone="info">Your school is still awaiting verification. You can send a request now; the plan starts once your school is verified.</Alert>
            )}
            {summary.lastRequest && (
              <p className="text-sm text-muted">
                Last request sent {formatDate(summary.lastRequest.createdAt, school.timezone)}
                {summary.lastRequest.seats ? ` for ${formatNumber(summary.lastRequest.seats)} students` : ""}.
              </p>
            )}
            <ActionForm action={requestPlanAction} submitLabel="Send request" pendingLabel="Sending…" columns="two">
              <AdminField name="seats" label="Number of students" type="number" required min={1} max={100000} defaultValue={Math.max(summary.activeStudents, 1)} />
              {summary.plans.length > 0 && (
                <AdminField name="planId" label="Plan" type="select" optional placeholder="Not sure yet" options={summary.plans.map((plan) => ({ value: plan.id, label: plan.name }))} />
              )}
              <AdminField name="message" label="Message" type="textarea" optional rows={3} maxLength={1000} hint="For example who to contact and when your term starts." wide />
            </ActionForm>
          </div>
        </AdminSection>

        {summary.history.length > 0 && (
          <AdminSection title="Earlier subscriptions" flush>
            <DataTable
              caption="Earlier subscriptions"
              rows={summary.history}
              rowKey={(row) => row.id}
              columns={[
                { key: "plan", header: "Plan", primary: true, cell: (row) => row.planName },
                { key: "status", header: "Status", cell: (row) => SUBSCRIPTION_STATUS_META[row.status]?.label ?? row.status },
                { key: "seats", header: "Seats", align: "end", cell: (row) => (row.seats === null ? "—" : formatNumber(row.seats)) },
                { key: "ended", header: "Ended", cell: (row) => formatDate(row.endedAt ?? row.currentPeriodEnd, school.timezone) },
              ]}
            />
          </AdminSection>
        )}
      </div>
    </Container>
  );
}
