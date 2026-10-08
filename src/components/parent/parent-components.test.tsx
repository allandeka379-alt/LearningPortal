/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { FamilyFormAction, FamilyFormState } from "@/components/family/action-state";
import type { ChildOverview } from "@/server/analytics/parent";
import type { CheckoutMethodOption, CheckoutPlanOption } from "@/server/family/billing";
import type { ParentChildDetail } from "@/server/family/queries";
import { ActivityCalendar, activityLevel } from "./ActivityCalendar";
import { CheckoutForm } from "./CheckoutForm";
import { isSafeNavigation, type CheckoutFormAction, type CheckoutFormState } from "./checkout-state";
import { ChildProgressCard, ChildResultsCard } from "./ChildSections";
import { ChildSummaryCard } from "./ChildSummaryCard";
import { DigestPreferenceForm } from "./DigestPreferenceForm";
import { describeBillingPeriod, formatMoney } from "./format";
import { GuardianConsentForm } from "./GuardianConsentForm";
import { PARENT_NAV } from "./nav";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
});

function recording<S>(responses: S[]) {
  const calls: FormData[] = [];
  const action = async (_state: S | null, formData: FormData): Promise<S | null> => {
    calls.push(formData);
    return responses.shift() ?? null;
  };
  return { action, calls };
}

const PLANS: CheckoutPlanOption[] = [
  {
    planId: "plan-1",
    name: "Premium",
    tagline: "Everything unlocked",
    highlights: ["Mock exams", "Unlimited practice"],
    prices: [
      { planPriceId: "price-usd", currency: "USD", amountMinor: 500, interval: "MONTH", intervalCount: 1, periodDays: null, label: null },
      { planPriceId: "price-zwg", currency: "ZWG", amountMinor: 13000, interval: "TERM", intervalCount: 1, periodDays: null, label: "Term 1" },
    ],
  },
];

const METHODS: CheckoutMethodOption[] = [
  { id: "paynow_ecocash", label: "EcoCash", description: "You approve the payment on your phone.", needsPhone: true, currencies: ["USD"] },
  { id: "stripe_card", label: "Card", description: "Visa or Mastercard.", needsPhone: false, currencies: ["USD", "ZWG"] },
];

describe("formatting", () => {
  it("formats minor units and billing periods", () => {
    expect(formatMoney(500, "USD")).toMatch(/5\.00/);
    expect(formatMoney(500, "XYZ")).toMatch(/5\.00/);
    expect(describeBillingPeriod({ interval: "MONTH", intervalCount: 1, periodDays: null })).toBe("per month");
    expect(describeBillingPeriod({ interval: "MONTH", intervalCount: 3, periodDays: null })).toBe("every 3 months");
    expect(describeBillingPeriod({ interval: "ONE_OFF", intervalCount: 1, periodDays: 90 })).toBe("for 90 days");
  });

  it("only navigates to http(s) or app-relative URLs", () => {
    expect(isSafeNavigation("https://www.paynow.co.zw/x")).toBe(true);
    expect(isSafeNavigation("/parent/billing/result?paymentId=1")).toBe(true);
    expect(isSafeNavigation("javascript:alert(1)")).toBe(false);
    expect(isSafeNavigation("//evil.example")).toBe(false);
    expect(isSafeNavigation("data:text/html,hi")).toBe(false);
  });

  it("parent nav has four destinations (sidebar = tab bar)", () => {
    expect(PARENT_NAV.map((item) => item.href)).toEqual(["/parent", "/parent/link", "/parent/billing", "/parent/settings"]);
  });
});

describe("CheckoutForm", () => {
  it("disables methods that can't take the price's currency and asks for a number for mobile money", async () => {
    const { action, calls } = recording<CheckoutFormState>([
      { ok: true, data: { kind: "mobile", instructions: "Dial *151# to approve.", paymentId: "pay-1", resultHref: "/parent/billing/result?paymentId=pay-1" } },
    ]);
    render(<CheckoutForm studentUserId="kid-1" childName="Tariro" plans={PLANS} methods={METHODS} action={action as CheckoutFormAction} idempotencyKey="0f8fad5b-d9cb-469f-a165-70867728950e" />);

    const pay = () => screen.getByRole("button", { name: /^Pay/ }) as HTMLButtonElement;
    expect(pay().disabled).toBe(true); // no method yet
    fireEvent.click(screen.getByRole("radio", { name: /ZWG|Term 1/ }));
    expect((screen.getByRole("radio", { name: /EcoCash/ }) as HTMLInputElement).disabled).toBe(true);
    expect(screen.getByText("Can't take ZWG payments.")).toBeTruthy();

    fireEvent.click(screen.getByRole("radio", { name: /per month/ }));
    fireEvent.click(screen.getByRole("radio", { name: /EcoCash/ }));
    const phone = screen.getByLabelText(/Mobile number to charge/);
    fireEvent.change(phone, { target: { value: "0771234567" } });
    expect(pay().disabled).toBe(false);
    expect(pay().textContent).toMatch(/5\.00/);
    await act(async () => {
      fireEvent.click(pay());
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("planPriceId")).toBe("price-usd");
    expect(calls[0]?.get("methodId")).toBe("paynow_ecocash");
    expect(calls[0]?.get("phone")).toBe("0771234567");
    expect(calls[0]?.get("studentUserId")).toBe("kid-1");
    expect(calls[0]?.get("idempotencyKey")).toBe("0f8fad5b-d9cb-469f-a165-70867728950e-0");
    expect(calls[0]?.has("amountMinor")).toBe(false); // the client never sends an amount

    expect(await screen.findByText("Approve the payment on your phone")).toBeTruthy();
    expect(screen.getByText("Dial *151# to approve.")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Check payment status" }).getAttribute("href")).toBe("/parent/billing/result?paymentId=pay-1");
  });

  it("opens a browser checkout with a GET navigation, never an unsafe URL", async () => {
    const navigate = vi.fn();
    const ok = recording<CheckoutFormState>([{ ok: true, data: { kind: "redirect", url: "https://www.paynow.co.zw/payment/abc", paymentId: "p" } }]);
    render(<CheckoutForm studentUserId="kid" childName="Tariro" plans={PLANS} methods={METHODS} action={ok.action as CheckoutFormAction} idempotencyKey="key-0000000000000000" navigate={navigate} />);
    fireEvent.click(screen.getByRole("radio", { name: /Card/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /^Pay/ }));
    });
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("https://www.paynow.co.zw/payment/abc"));
    cleanup();

    const unsafeNavigate = vi.fn();
    const bad = recording<CheckoutFormState>([{ ok: true, data: { kind: "redirect", url: "javascript:alert(1)", paymentId: "p" } }]);
    render(<CheckoutForm studentUserId="kid" childName="Tariro" plans={PLANS} methods={METHODS} action={bad.action as CheckoutFormAction} idempotencyKey="key-0000000000000000" navigate={unsafeNavigate} />);
    fireEvent.click(screen.getByRole("radio", { name: /Card/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /^Pay/ }));
    });
    await waitFor(() => expect(bad.calls).toHaveLength(1));
    expect(unsafeNavigate).not.toHaveBeenCalled();
  });

  it("shows field errors and uses a new idempotency key for the next attempt", async () => {
    const { action, calls } = recording<CheckoutFormState>([
      { ok: false, error: { code: "VALIDATION", message: "Check the form.", fieldErrors: { phone: ["Enter a valid Zimbabwe mobile number, e.g. 0771234567."] } } },
      { ok: false, error: { code: "BAD_REQUEST", message: "We couldn't start the payment." } },
    ]);
    render(<CheckoutForm studentUserId="kid" childName="Tariro" plans={PLANS} methods={METHODS} action={action as CheckoutFormAction} idempotencyKey="key-0000000000000000" />);
    fireEvent.click(screen.getByRole("radio", { name: /EcoCash/ }));
    fireEvent.change(screen.getByLabelText(/Mobile number to charge/), { target: { value: "12" } });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /^Pay/ }));
    });
    expect(await screen.findByText("Enter a valid Zimbabwe mobile number, e.g. 0771234567.")).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /^Pay/ }));
    });
    expect(await screen.findByText("We couldn't start the payment.")).toBeTruthy();
    expect(calls.map((call) => call.get("idempotencyKey"))).toEqual(["key-0000000000000000-0", "key-0000000000000000-1"]);
  });
});

function overview(patch: Partial<ChildOverview> = {}): ChildOverview {
  return {
    student: { userId: "kid-1", firstName: "Tariro", timezone: "Africa/Harare" },
    visibleSections: ["subjects", "examCountdown"],
    lockedSections: [],
    reportsIncluded: true,
    subjects: [{ subjectId: "s1", subjectName: "Mathematics", qualification: "O-Level", status: "ACTIVE", targetGrade: "A" }],
    examCountdown: {
      next: { examSessionId: "e1", name: "November 2027", startsOn: "2027-10-20", daysUntil: 380, isProvisional: false, subjects: ["Mathematics"] },
      sessions: [],
    },
    ...patch,
  };
}

function detail(patch: Partial<ChildOverview> = {}, canGrant = false): ParentChildDetail {
  return {
    child: {
      linkId: "l1",
      studentUserId: "kid-1",
      name: "Tariro",
      firstName: "Tariro",
      relationship: "PARENT",
      activatedAt: new Date("2026-09-01T10:00:00Z"),
      permissions: { progress: false, activity: false, results: false },
      aiConversationsShared: false,
      guardianConsent: { isMinor: true, status: canGrant ? "PENDING" : "GRANTED", canGrant, givenByYou: false },
    },
    overview: overview(patch),
  };
}

describe("ChildSummaryCard", () => {
  it("says 'Not shared' for sections the child keeps private (never a fake zero)", () => {
    render(<ChildSummaryCard detail={detail({}, true)} />);
    expect(screen.getByRole("heading", { name: "Tariro" })).toBeTruthy();
    expect(screen.getByText("380")).toBeTruthy();
    expect(screen.getAllByText("Not shared")).toHaveLength(2);
    expect(screen.getAllByText("Not shared.")).toHaveLength(2);
    expect(screen.getByText("Consent needed")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Details for Tariro/ }).getAttribute("href")).toBe("/parent/children/kid-1");
  });

  it("shows this week's study, the latest result and weak areas when shared", () => {
    render(
      <ChildSummaryCard
        detail={detail({
          studyTime: { last7Days: { minutes: 95, activeDays: 3 }, last30Days: { minutes: 300, activeDays: 9 }, bySubjectLast30Days: [], streak: null },
          testResults: {
            recent: [
              { attemptId: "a1", subjectId: "s1", subjectName: "Mathematics", mode: "MOCK_EXAM", title: "Paper 1", percentage: 64, gradeEstimate: "B", isProvisional: false, submittedAt: new Date() },
            ],
            bySubject: [],
          },
          weakAreas: [{ topicId: "t1", topicName: "Quadratics", subjectId: "s1", subjectName: "Mathematics", band: "WEAK", score: 22, lastPracticedAt: null }],
        })}
      />,
    );
    expect(screen.getByText("1 h 35 min")).toBeTruthy();
    expect(screen.getByText("Active on 3 days")).toBeTruthy();
    expect(screen.getAllByText("64%").length).toBeGreaterThan(0);
    expect(screen.getByText("Quadratics")).toBeTruthy();
    expect(screen.queryByText("Consent needed")).toBeNull();
  });

  it("says a detailed report is not in the child's plan (§31 parentReports) instead of 'Not shared'", () => {
    render(
      <ChildSummaryCard
        detail={detail({
          reportsIncluded: false,
          lockedSections: ["progress", "weakAreas", "activityCalendar", "testResults"],
          studyTime: { last7Days: { minutes: 40, activeDays: 2 }, last30Days: { minutes: 40, activeDays: 2 }, bySubjectLast30Days: [], streak: null },
        })}
      />,
    );
    expect(screen.getByText("40 min")).toBeTruthy();
    expect(screen.getByText("In detailed reports")).toBeTruthy();
    expect(screen.getAllByText("In detailed reports, not in Tariro’s current plan.")).toHaveLength(2);
    expect(screen.queryByText("Not shared")).toBeNull();
    expect(screen.queryByText("Not shared.")).toBeNull();
  });
});

describe("ChildSections detailed-report states", () => {
  it("locked sections explain the plan, unshared ones stay 'not shared'", () => {
    render(
      <>
        <ChildProgressCard progress={undefined} name="Tariro" locked />
        <ChildResultsCard testResults={undefined} name="Tariro" timeZone="Africa/Harare" />
      </>,
    );
    expect(screen.getByText("Part of detailed reports, which Tariro’s current plan doesn’t include.")).toBeTruthy();
    expect(screen.getByText(/Tariro hasn’t shared their test results with you/)).toBeTruthy();
  });
});

describe("ActivityCalendar", () => {
  it("aligns weeks to Monday, shades by minutes and writes every day out for screen readers", () => {
    const days = [
      { date: "2026-10-07", active: true, studyMinutes: 50, questionsAttempted: 4, streakFreezeUsed: false }, // Wednesday
      { date: "2026-10-08", active: false, studyMinutes: 0, questionsAttempted: 0, streakFreezeUsed: true },
      { date: "2026-10-09", active: true, studyMinutes: 10, questionsAttempted: 1, streakFreezeUsed: false },
    ];
    render(<ActivityCalendar days={days} today="2026-10-09" />);
    const list = screen.getByRole("list", { name: "Study activity, last 3 days" });
    const items = within(list).getAllByRole("listitem", { hidden: true });
    expect(items).toHaveLength(5); // two leading pads (Mon, Tue) + three days
    expect(screen.getByText("Active on 2 days of the last 3.")).toBeTruthy();
    expect(screen.getByText(/Today: 10 minutes, 1 question/)).toBeTruthy();
    expect(screen.getByText(/no study \(streak freeze used\)/)).toBeTruthy();
    expect(activityLevel({ active: true, studyMinutes: 50 })).toBe(3);
    expect(activityLevel({ active: true, studyMinutes: 20 })).toBe(2);
    expect(activityLevel({ active: true, studyMinutes: 0 })).toBe(1);
    expect(activityLevel({ active: false, studyMinutes: 0 })).toBe(0);
  });
});

describe("GuardianConsentForm and DigestPreferenceForm", () => {
  it("guardian consent needs the explicit confirmation", async () => {
    const { action, calls } = recording<FamilyFormState>([{ ok: true, data: { message: "Thank you. Your consent is recorded." } }]);
    render(<GuardianConsentForm studentUserId="kid-1" childName="Tariro" action={action as FamilyFormAction} />);
    const submit = screen.getByRole("button", { name: "Give consent" }) as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    fireEvent.click(screen.getByRole("checkbox", { name: /I am Tariro's parent or legal guardian/ }));
    await act(async () => {
      fireEvent.click(submit);
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("confirmed")).toBe("on");
    expect(calls[0]?.get("studentUserId")).toBe("kid-1");
    expect(await screen.findByText("Thank you. Your consent is recorded.")).toBeTruthy();
  });

  it("the summary preference submits the chosen frequency", async () => {
    const { action, calls } = recording<FamilyFormState>([{ ok: true, data: { message: "You'll get a summary every Sunday evening." } }]);
    render(<DigestPreferenceForm value="OFF" action={action as FamilyFormAction} />);
    expect((screen.getByRole("radio", { name: /Off/ }) as HTMLInputElement).checked).toBe(true);
    fireEvent.click(screen.getByRole("radio", { name: /Weekly/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("parentDigest")).toBe("WEEKLY");
    expect(await screen.findByText("You'll get a summary every Sunday evening.")).toBeTruthy();
  });
});
