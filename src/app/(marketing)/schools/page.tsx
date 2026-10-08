import { ChartColumn, ClipboardList, FileSpreadsheet, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import type { Metadata } from "next";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { FaqList } from "@/components/marketing/FaqList";
import { Illustration } from "@/components/marketing/Illustration";
import { ComparisonTable } from "@/components/marketing/pricing/ComparisonTable";
import { CurrencyPanels } from "@/components/marketing/pricing/CurrencyPanels";
import { DemoPricesNote } from "@/components/marketing/pricing/DemoPricesNote";
import { PlanCard } from "@/components/marketing/pricing/PlanCard";
import { SchoolEnquiryForm } from "@/components/marketing/SchoolEnquiryForm";
import { FeatureItem, Section } from "@/components/marketing/Section";
import { ButtonLink } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import { getFeatures } from "@/server/features";
import { getMarketingCatalogue } from "@/server/marketing/catalogue";
import { listPublishedFaqs } from "@/server/marketing/faq";
import { marketingMetadata } from "@/server/marketing/metadata";
import { buildComparison } from "@/server/marketing/plan-features";
import { getPricingData, type PricingPlan } from "@/server/marketing/pricing";
import { submitSchoolEnquiryAction } from "./actions";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return marketingMetadata({
    title: "For schools",
    description: "Give your students structured ZIMSEC and Cambridge revision, with teacher dashboards, assignments, school analytics and roster import.",
    path: "/schools",
  });
}

const STEPS: readonly { title: string; body: string }[] = [
  { title: "Talk to us", body: "Tell us about your school, your classes and the subjects you teach." },
  { title: "Set up your school", body: "We create your school account; you import your students from a spreadsheet." },
  { title: "Teachers create classes", body: "Teachers group students into classes and set assignments and tests." },
  { title: "Students study, teachers see progress", body: "Every answer feeds the class dashboard, topic by topic." },
];

function SchoolPlans({ plans, currency }: { plans: readonly PricingPlan[]; currency: string | null }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {plans.map((plan) => (
        <li key={plan.id}>
          <PlanCard
            plan={plan}
            currency={currency}
            showDescription
            actions={
              <ButtonLink href="#contact" variant="primary" fullWidth>
                Talk to us about {plan.name}
              </ButtonLink>
            }
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * /schools (§53 B2B and B2B2C): what schools get (teacher dashboards, assignments, analytics, roster import), how
 * onboarding works, school plans from the database and a "Talk to us" enquiry form. Static; the form posts to a
 * Server Action.
 */
export default async function SchoolsPage() {
  const [catalogue, pricing, faqs, features] = await Promise.all([
    getMarketingCatalogue(),
    getPricingData(),
    listPublishedFaqs({ categories: ["schools"], limit: 12 }),
    getFeatures(),
  ]);
  const schoolPlans = pricing.schoolPlans;
  const comparison = buildComparison(schoolPlans, { groups: ["For schools"] });
  const schoolCurrencies = pricing.currencies.filter((currency) => schoolPlans.some((plan) => (plan.prices[currency]?.length ?? 0) > 0));

  return (
    <>
      <section aria-labelledby="schools-hero-heading" className="relative overflow-hidden border-b border-border">
        <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full" opacity={0.05} />
        <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <div>
            <p className="text-sm font-semibold text-primary">For schools</p>
            <h1 id="schools-hero-heading" className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
              Bring {APP_NAME} to your school
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Your students get structured revision, practice and mock exams for their own syllabus. Your teachers get a
              clear view of every class, topic by topic.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <ButtonLink href="#contact" size="lg">
                Talk to us
              </ButtonLink>
              <ButtonLink href="#school-plans" size="lg" variant="outline">
                School plans
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <Illustration name="schools" alt="A class list with topic progress bars, an assignment checklist and a results chart" sizes="(min-width: 1024px) 38vw, 100vw" priority />
          </div>
        </Container>
      </section>

      <Section id="for-teachers" title="Everything a school needs to support revision" description="Students study on their own phones or computers; teachers and school leaders see the results.">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem icon={<LayoutDashboard />} title="Teacher dashboards">
            Class progress, the topics a class finds hardest and the students who need help.
          </FeatureItem>
          <FeatureItem icon={<ClipboardList />} title="Assignments and tests">
            Set lessons, practice and tests with due dates{features.ai ? ", and choose how much AI help is allowed" : ""}.
          </FeatureItem>
          <FeatureItem icon={<ChartColumn />} title="School analytics">
            Results by subject, class and topic, with reports for school leaders.
          </FeatureItem>
          <FeatureItem icon={<FileSpreadsheet />} title="Roster import">
            Add students and classes from a spreadsheet instead of one by one.
          </FeatureItem>
          <FeatureItem icon={<Users />} title="Access through the school">
            The school provides access, so every student in a class can study, whatever their family can afford.
          </FeatureItem>
          <FeatureItem icon={<ShieldCheck />} title="Privacy built in">
            {features.ai
              ? "Teachers see only their own classes, and students’ AI tutor conversations are never shown to teachers."
              : "Teachers see only their own classes and the work set in them."}
          </FeatureItem>
        </ul>
      </Section>

      <Section id="how-schools-start" tone="surface" title="How it works for schools">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-card border border-border bg-bg p-5">
              <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-on-primary tabular-nums">
                {index + 1}
              </span>
              <h3 className="mt-3 font-semibold text-text">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="school-plans"
        title="School plans"
        description={
          schoolPlans.length > 0
            ? "Current school plans and prices. We will confirm the right plan for your school when we talk."
            : "School plans are arranged directly with each school. Tell us about yours and we will send you the options."
        }
      >
        {pricing.hasDemoPrices && schoolPlans.length > 0 && <DemoPricesNote className="mb-6" />}
        {schoolPlans.length > 0 &&
          (schoolCurrencies.length > 0 ? (
            <CurrencyPanels idPrefix="schools" currencies={schoolCurrencies} renderPanel={(currency) => <SchoolPlans plans={schoolPlans} currency={currency} />} />
          ) : (
            <SchoolPlans plans={schoolPlans} currency={null} />
          ))}
        {comparison.length > 0 && schoolPlans.length > 1 && (
          <ComparisonTable className="mt-8" plans={schoolPlans} groups={comparison} caption="School features in each school plan" />
        )}
      </Section>

      <section id="contact" aria-labelledby="contact-heading" className="border-t border-border bg-surface py-14 sm:py-20">
        <Container size="reading">
          <h2 id="contact-heading" className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Talk to us
          </h2>
          <p className="mt-2 text-muted">Tell us a little about your school and we will get back to you.</p>
          <div className="mt-8">
            <SchoolEnquiryForm action={submitSchoolEnquiryAction} boards={catalogue.boards.map((board) => board.shortName)} privacyHref="/legal/privacy" />
          </div>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="schools-faq-heading" className="py-12 sm:py-16">
          <Container size="reading">
            <h2 id="schools-faq-heading" className="text-2xl font-bold tracking-tight text-text">
              Questions from schools
            </h2>
            <FaqList items={faqs} className="mt-6" />
          </Container>
        </section>
      )}
    </>
  );
}
