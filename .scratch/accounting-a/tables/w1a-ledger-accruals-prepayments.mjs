// Lesson generator: ledger.accruals-prepayments
import { tAccount, journal, statement, table, check, sum, r2, t, chk } from "../lib.mjs";
import { writeLesson, tAcct } from "./w1a-lib.mjs";

// Rent: monthly 380, opening prepaid 380, paid 4,940, closing prepaid 760
const rentExp = 12 * 380;
const rentPaid = 4940;
const rentOpen = 380;
const rentClose = 760;
check("rent", rentOpen + rentPaid - rentClose, rentExp);
const rent = tAcct(
  "Rent payable account",
  [["1 Jan", "Prepaid b/d", rentOpen], ["Various", "Bank", rentPaid]],
  [["31 Dec", "Statement of profit or loss", rentExp], ["31 Dec", "Prepaid c/d", rentClose]],
  { side: "dr", date: "1 Jan", details: "Prepaid b/d", amount: rentClose },
);
const rentJ = journal([{ date: "31 Dec", lines: [["Other receivables (rent prepaid)", rentClose, null], ["Rent payable", null, rentClose]], narrative: "Rent paid in advance at the year end" }]);

// Wages
const wPaid = 38400;
const wOpen = 1150;
const wClose = 1420;
const wExp = r2(wPaid - wOpen + wClose);
check("wages", wExp, 38670);
const wages = tAcct(
  "Wages account",
  [["Various", "Bank", wPaid], ["31 Dec", "Accrued c/d", wClose]],
  [["1 Jan", "Accrued b/d", wOpen], ["31 Dec", "Statement of profit or loss", wExp]],
  { side: "cr", date: "1 Jan", details: "Accrued b/d", amount: wClose },
);
check("wages T", wPaid + wClose, wOpen + wExp);
const wagesJ = journal([{ date: "31 Dec", lines: [["Wages", wClose, null], ["Other payables (wages accrued)", null, wClose]], narrative: "Wages earned by staff but unpaid at the year end" }]);

// Commission received (accrued income) and rent received (deferred income)
const cRec = 3180;
const cOpen = 240;
const cClose = 310;
const cInc = r2(cRec - cOpen + cClose);
check("comm", cInc, 3250);
const comm = tAcct(
  "Commission received account",
  [["1 Jan", "Accrued b/d", cOpen], ["31 Dec", "Statement of profit or loss", cInc]],
  [["Various", "Bank", cRec], ["31 Dec", "Accrued c/d", cClose]],
  { side: "dr", date: "1 Jan", details: "Accrued b/d", amount: cClose },
);
check("comm T", cOpen + cInc, cRec + cClose);
const rRec = 1800;
const rAdvOpen = 150;
const rAdvClose = 300;
const rInc = r2(rRec + rAdvOpen - rAdvClose);
check("rent rec", rInc, 1650);
const rentRec = tAcct(
  "Rent received account",
  [["31 Dec", "Statement of profit or loss", rInc], ["31 Dec", "Received in advance c/d", rAdvClose]],
  [["1 Jan", "Received in advance b/d", rAdvOpen], ["Various", "Bank", rRec]],
  { side: "cr", date: "1 Jan", details: "Received in advance b/d", amount: rAdvClose },
);
check("rent rec T", rInc + rAdvClose, rAdvOpen + rRec);

// Insurance
const insOpen = 480;
const insPaid = 2460;
const insClose = r2((insPaid * 3) / 12);
const insExp = r2(insOpen + insPaid - insClose);
check("ins", insExp, 2325);
check("insClose", insClose, 615);
const ins = tAcct(
  "Insurance account",
  [["1 Jan", "Prepaid b/d", insOpen], ["1 Apr", "Bank", insPaid]],
  [["31 Dec", "Statement of profit or loss", insExp], ["31 Dec", "Prepaid c/d", insClose]],
  { side: "dr", date: "1 Jan", details: "Prepaid b/d", amount: insClose },
);

// Loan interest accrued
const interestAnnual = r2(12000 * 0.1);
const intPaid = 600;
const intAccr = r2(interestAnnual - intPaid);
check("int", intAccr, 600);

// Statement extracts
const recv = sum([rentClose, insClose, cClose]);
const pay = sum([wClose, intAccr, rAdvClose]);
check("recv", recv, 1685);
check("pay", pay, 2320);
const ext = statement(
  "Statement of financial position (extract) at 31 December 2025",
  [
    ["**Current assets**"],
    ["Other receivables: rent prepaid", rentClose],
    ["Other receivables: insurance prepaid", insClose],
    ["Other receivables: commission receivable", cClose],
    ["Total other receivables", null, recv],
    [],
    ["**Current liabilities**"],
    ["Wages accrued", wClose],
    ["Loan interest accrued", intAccr],
    ["Rent received in advance", rAdvClose],
    ["Total other payables", null, pay],
  ].map((r) => (r.length ? r : null)),
  { checks: [["recv", recv, 1685], ["pay", pay, 2320]] },
);

const effect = table(
  ["Item at the year end", "Added to or deducted from the account", "Effect on profit", "Statement of financial position"],
  [
    ["Expense accrued", "Added to expense", "Reduces profit", "Current liability (other payables)"],
    ["Expense prepaid", "Deducted from expense", "Increases profit", "Current asset (other receivables)"],
    ["Income accrued", "Added to income", "Increases profit", "Current asset (other receivables)"],
    ["Income received in advance", "Deducted from income", "Reduces profit", "Current liability (other payables)"],
  ],
  ["l", "l", "l", "l"],
);

const terms = table(
  ["ZIMSEC (common usage)", "Cambridge 9706"],
  [
    ["Accruals; prepayments; accrued expenses", "Other payables (accruals); other receivables (prepayments)"],
    ["Income statement", "Statement of profit or loss"],
    ["Debtors and creditors", "Trade receivables and trade payables"],
  ],
  ["l", "l"],
);

const body = t`
## Introduction

Sipho runs Gweru Motor Spares. On 31 December 2025 his staff have worked the last week of the month but will be paid in January, his rent has been paid until February 2026 and a customer owes him commission for November and December. If he simply totalled cash paid and cash received during 2025, profit would be wrong. The **matching (accruals) concept** says that revenue and expenses belong to the period in which they are earned or used, not the period in which cash moves.

You already know how to adjust one expense for an accrual or a prepayment from O-Level. At A-Level you must handle expenses **and** income, opening balances as well as closing balances, and show the result in both the ledger and the statements. This lesson covers the ledger entries; presenting the adjustments inside complete statements is the topic of the lesson on adjustments.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards examine accruals and prepayments of expenses and of income. Cambridge uses "other payables" and "other receivables" in the statement of financial position.
:::

## Key definitions

:::definition{term="Accrued expense"}
An expense of the period that has been incurred but not yet paid at the year end. It is a current liability.
:::

:::definition{term="Prepaid expense"}
Payment made in the period for a benefit that belongs to a later period. It is a current asset.
:::

:::definition{term="Accrued income"}
Income earned in the period but not yet received at the year end. It is a current asset.
:::

:::definition{term="Income received in advance"}
Cash received in the period for income that belongs to a later period. It is a current liability.
:::

## The adjustment formulae

:::keyfact{title="Expense or income for the year"}
Expense for the year = cash paid + opening prepayment + closing accrual - opening accrual - closing prepayment.

Income for the year = cash received + opening income received in advance + closing accrued income - opening accrued income - closing income received in advance.
:::

${effect}

Every closing balance becomes the **opening balance** of the next year on the opposite side of the account. The opening balance is then cleared by the payments or receipts of the new year. That is why the same item never affects profit twice.

## Ledger layout

1. Enter the opening balance (b/d), the cash paid or received, and the closing balance (c/d).
2. The balancing figure is the amount for the year, which is transferred to the statement of profit or loss.
3. Bring down the closing balance on the opposite side.

The tidy test: both sides of the account must total the same.

:::worked-solution[Example 1: rent with an opening and a closing prepayment]
Gweru Motor Spares pays rent of US\$380 a month. At 1 January 2025 US\$380 was prepaid. During 2025 rent payments of US\$4,940 were made, including January and February 2026.

1. Closing prepayment: 2 months × 380 = 760.
2. Expense for 2025: 380 + 4,940 - 760 = 4,560 (12 months × 380).

${rent}

${rentJ}

The statement of profit or loss shows rent of 4,560. The prepayment of 760 is brought down on the debit side and appears in other receivables.
:::

:::worked-solution[Example 2: wages with an opening and a closing accrual]
At 1 January 2025 the business owed US\$1,150 for wages. Payments of US\$38,400 were made in 2025. Wages earned but unpaid at 31 December 2025 were US\$1,420.

1. Expense for 2025: 38,400 - 1,150 + 1,420 = 38,670.
2. The opening accrual is a credit balance brought down: it belongs to 2024 and is cleared by the first payment of 2025.

${wages}

${wagesJ}

The balance c/d of 1,420 is on the debit side and will be brought down on the credit side on 1 January 2026.
:::

:::worked-solution[Example 3: income, insurance and the statement of financial position]
The business earns commission and sublets a store room.

1. Commission received: 3,180 in 2025. It was owed 240 at 1 January; 310 is owed at 31 December. Commission for the year: 3,180 - 240 + 310 = 3,250.
2. Rent received: 1,800 in 2025, including 300 for 2026; 150 received in 2024 related to 2025. Rent for the year: 1,800 + 150 - 300 = 1,650.
3. Insurance: opening prepayment 480; premium of 2,460 paid on 1 April 2025 for twelve months. Closing prepayment: 2,460 × 3/12 = 615. Expense: 480 + 2,460 - 615 = 2,325.
4. Loan interest: 12,000 at 10% a year is 1,200; 600 was paid, so 600 is accrued.

${comm}

${rentRec}

${ins}

${ext}
:::

## Effect on profit and on the statements

- Each adjustment is used **twice**: once to correct the expense or income and once in the statement of financial position. A one-sided adjustment is the usual reason a statement of financial position does not balance.
- Accruals of expenses and income received in advance **reduce** profit; prepayments and accrued income **increase** it.
- Accruals and prepayments are estimates. A prepayment is prudent only if the benefit really will be used in the next period.

## Common mistakes

:::mistake{title="Using the opening balance with the wrong sign"}
An opening accrual was an expense of last year that is paid this year, so it is deducted from this year's payments. An opening prepayment is added. Draw the account and put the b/d on the correct side before calculating.
:::

:::mistake{title="Treating income like an expense"}
Accrued income is a current asset; income received in advance is a liability. The signs are the opposite of those for expenses.
:::

:::mistake{title="Adjusting the expense but not the statement of financial position"}
A prepayment must also appear under current assets, an accrual under current liabilities. Tick each note once in each statement.
:::

:::mistake{title="Using the whole premium"}
Prepaid insurance is only the part of the premium for the months after the year end, not the whole payment.
:::

## Exam tips

:::exam-tip
Ledger accounts with accruals and prepayments appear in ZIMSEC Paper 2 (ledger work) and Paper 3 inside full statements, and in Cambridge Papers 1 and 2 (multiple choice and the 15-mark questions). For *calculate the charge to the statement of profit or loss*, state the formula or show the account; a correct final figure with no working loses the method marks if the figure is wrong. For *explain* questions on matching, link the adjustment to the period in which the benefit arises.
:::

:::exam-tip
When asked to *state the effect on profit* of an omitted accrual, say that expenses are understated and profit is overstated by the amount, and that liabilities are understated too.
:::

## Summary

:::summary
- Revenue and expenses are matched to the period in which they arise, not when cash moves.
- Accrued expenses and income received in advance are current liabilities; prepaid expenses and accrued income are current assets.
- Expense for the year = cash paid + opening prepayment + closing accrual - opening accrual - closing prepayment.
- Income for the year = cash received + opening income received in advance + closing accrued income - opening accrued income - closing income received in advance.
- Closing balances are brought down as the next year's opening balances.
- Use every adjustment twice: in the profit figure and in the statement of financial position.
:::
`;

writeLesson(
  "ledger/accruals-prepayments.md",
  {
    key: "ledger.accruals-prepayments",
    title: "Accruals and prepayments of expenses and income in the ledger",
    summary: "Prepare ledger accounts for expenses and income with opening and closing accruals and prepayments, calculate the amount transferred to the statement of profit or loss and show the balances in the statement of financial position.",
    concepts: ["aacc.ledger.accruals-prepayments"],
    estimatedMinutes: 50,
    level: "core",
  },
  body,
);
