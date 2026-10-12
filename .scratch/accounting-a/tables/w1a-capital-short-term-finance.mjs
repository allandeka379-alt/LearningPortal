// Lesson generator: capital.short-term-finance (Cambridge only, free preview)
import { table, check, sum, r2, fmt, t } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// Example 1: buy a machine, cash price 24,000
const cash = 24000;
const loanRate = 10;
const years = 3;
const principalPerYear = r2(cash / years);
let bal = cash;
let loanInterest = 0;
const loanRows = [];
for (let y = 1; y <= years; y += 1) {
  const i = r2((bal * loanRate) / 100);
  loanRows.push([`Year ${y}`, bal, i, principalPerYear, r2(i + principalPerYear)]);
  loanInterest += i;
  bal = r2(bal - principalPerYear);
}
loanInterest = r2(loanInterest);
check("loan interest", loanInterest, 4800);
const loanTotal = r2(cash + loanInterest);
check("loan total", loanTotal, 28800);
const loanTbl = table(["Year", "Balance at start US\\$", "Interest at 10% US\\$", "Capital repaid US\\$", "Total paid US\\$"], loanRows, ["l", "r", "r", "r", "r"]);

const deposit = 4000;
const monthly = 1050;
const months = 24;
const hpTotal = r2(deposit + monthly * months);
check("hpTotal", hpTotal, 29200);
const hpCost = r2(hpTotal - cash);
check("hpCost", hpCost, 5200);
const leaseMonthly = 800;
const leaseMonths = 36;
const leaseTotal = r2(leaseMonthly * leaseMonths);
check("leaseTotal", leaseTotal, 28800);

const compare = table(
  ["", "Bank loan", "Instalments", "Leasing"],
  [
    ["Paid in total US$", loanTotal, hpTotal, leaseTotal],
    ["Cost above the cash price US$", loanInterest, hpCost, r2(leaseTotal - cash)],
    ["Who owns the machine at the end?", "The business", "The business (after the last instalment)", "The lessor"],
    ["Security", "Machine or other assets, or none (unsecured)", "The machine until paid", "Lessor owns the machine"],
    ["Repairs", "The business", "The business", "Often the lessor, by agreement"],
  ],
  ["l", "r", "r", "r"],
).replace(/Paid in total US\$/, "Paid in total US\\$").replace(/Cost above the cash price US\$/, "Cost above the cash price US\\$");

// Example 2: overdraft against loan for a temporary need
const need = 6000;
const odRate = 14;
const odMonths = 3;
const odInterest = r2(((need * odRate) / 100) * (odMonths / 12));
check("odInterest", odInterest, 210);
const loan12 = r2((need * 12) / 100);
check("loan12", loan12, 720);
const ex2 = table(
  ["", "Overdraft", "Term loan"],
  [
    ["Amount needed for 3 months US$", need, need],
    ["Interest rate", "14% a year on the overdrawn balance", "12% a year on the full loan, for the whole year"],
    ["Interest cost US$", odInterest, loan12],
    ["Repayment", "On demand; can be repaid at once", "Fixed term; cannot normally be repaid early without penalty"],
    ["Security", "Usually unsecured; the bank can withdraw it", "May be secured on assets"],
  ],
  ["l", "r", "r"],
).replace("Amount needed for 3 months US$", "Amount needed for 3 months US\\$").replace("Interest cost US$", "Interest cost US\\$");

// Example 3: trade credit
const invoice = 12500;
const discPct = 2;
const disc = r2((invoice * discPct) / 100);
const payNow = r2(invoice - disc);
check("payNow", payNow, 12250);
const ex3 = table(
  ["Option", "Pay on day 10 US$", "Pay on day 30 US$"],
  [["Invoice of US$12,500, 2% discount for payment within 10 days", payNow, invoice]],
  ["l", "r", "r"],
).replace(/US\$12,500/, "US\\$12,500").replace("Pay on day 10 US$", "Pay on day 10 US\\$").replace("Pay on day 30 US$", "Pay on day 30 US\\$");

const needs = table(
  ["Need", "Suitable source", "Reason"],
  [
    ["Extra stock before a busy December", "Trade credit or overdraft", "Short term, repaid from sales; flexible"],
    ["Buying a delivery lorry to use for six years", "Term loan, instalments or leasing", "Long-term need matched with a source repaid over time; ownership may matter"],
    ["A sole trader with no assets to offer as security", "Unsecured loan, overdraft or trade credit", "The bank may not lend large sums without security"],
    ["A new venture with uncertain income", "Leasing or renting", "Avoids a large outlay, with fixed payments and no risk of owning an unused asset"],
  ],
  ["l", "l", "l"],
);

const terms = table(
  ["Cambridge 9706", "ZIMSEC note"],
  [["Sources of finance: loans, overdrafts, instalments, renting and leasing, trade credit", "ZIMSEC covers long-term shares and loan notes (see sources of capital); this topic is Cambridge only"]],
  ["l", "l"],
);

const body = t`
## Introduction

Sipho runs a printing business in Bulawayo and needs a new press that costs US\$24,000. His bank balance is only US\$5,000. Should he borrow, buy on instalments, lease the press or wait until he can pay cash? He also has a temporary shortage of cash each December. Different needs call for different sources of finance. A wrong choice can drain cash with interest or leave the business unable to repay when the bank demands.

This is a Cambridge AS topic. It deals with finance for **sole traders, partnerships and companies** over the short and medium term. Long-term share and loan note finance is in the next lesson.

:::keyfact{title="Cambridge coverage"}
${terms}

Questions ask you to describe each source, compare cost, security, repayment and risk, and recommend a source for a stated need.
:::

## Key definitions

:::definition{term="Bank overdraft"}
Permission to withdraw more than the account holds, up to a limit. Interest is charged on the overdrawn balance only, and the bank can usually demand repayment at short notice.
:::

:::definition{term="Secured and unsecured loan"}
A secured loan gives the lender a claim on a named asset if the borrower cannot pay; an unsecured loan does not, so it usually costs more or is limited in size.
:::

:::definition{term="Payment by instalments"}
Buying an asset and paying the price in parts over a period; the business normally owns the asset once the last payment is made.
:::

:::definition{term="Renting and leasing"}
Paying regular charges for the use of an asset that remains the property of the owner (the lessor).
:::

:::definition{term="Trade credit"}
Time allowed by a supplier to pay for goods or services received, often with a discount for earlier payment.
:::

## The sources

| Source | Cost | Security | Repayment | Risk |
| --- | --- | --- | --- | --- |
| Overdraft | Interest only on the amount overdrawn | Often unsecured | Repayable on demand | Withdrawn at short notice |
| Bank loan | Interest on the amount borrowed | Secured or unsecured | Fixed instalments over a term | Must be paid even when cash is short |
| Instalments | Higher total price than cash | The asset until paid | Fixed payments | Loses the asset if a payment is missed |
| Renting and leasing | Regular charges; no ownership | Lessor owns the asset | Payments throughout the term | Costs more over a long period; no ownership at the end |
| Trade credit | Free if paid on time; discount lost if paid late | None | Within the credit period | Supplier may stop supply if payments are late |

:::worked-solution[Example 1: three ways to acquire a press]
Sipho can (a) borrow US\$24,000 for three years at 10% a year on the reducing balance, repaying US\$8,000 of capital each year; (b) pay a deposit of US\$4,000 and 24 monthly instalments of US\$1,050; or (c) lease the press for US\$800 a month for 36 months.

**(a) Bank loan**

${loanTbl}

Total interest 2,400 + 1,600 + 800 = 4,800; total paid 24,000 + 4,800 = 28,800.

**(b) Instalments:** 4,000 + 24 × 1,050 = 29,200 paid, so the extra cost above the cash price is 29,200 - 24,000 = 5,200.

**(c) Lease:** 36 × 800 = 28,800 paid, and Sipho does not own the press.

${compare}

1. The loan is cheapest in cash, and he owns the press from the start.
2. Leasing costs the same in total as the loan, but ownership never passes, so after three years he has paid 28,800 and has nothing to sell.
3. The decision also depends on security, risk and cash flow, not only the total cost.
:::

:::worked-solution[Example 2: overdraft or loan for a temporary need]
In December Sipho needs US\$6,000 for three months. He can use an overdraft at 14% a year, or take a one-year term loan at 12%.

${ex2}

1. Overdraft interest: 6,000 × 14% × 3/12 = 210.
2. Loan interest: 6,000 × 12% = 720 for the year (the loan cannot normally be repaid after three months without a penalty).
3. The overdraft is cheaper for a short need even though the rate is higher. Its risk is that the bank can withdraw it.
:::

:::worked-solution[Example 3: trade credit and matching the source to the need]
A supplier invoices Sipho for US\$12,500 and offers 30 days' credit, or a 2% discount for payment within 10 days.

${ex3}

1. Discount: 12,500 × 2% = 250, so the early payment is 12,250.
2. Paying on day 30 costs 250 more but keeps 12,250 in the bank for 20 days. Sipho decides by comparing this with his overdraft cost.

Matching sources to needs:

${needs}
:::

## Matching the source to the need

- **Working capital** needs (inventory, receivables) are met by short-term finance: trade credit and overdrafts.
- **Non-current asset** needs are met by medium or long-term finance: loans, instalments or leasing.
- A **new or small business** with no assets to offer as security may find it harder to get secured loans, and may prefer leasing or trade credit.
- A **company** can also raise finance by issuing shares, which a sole trader cannot.
- Do not finance a long-term asset with an overdraft that may be withdrawn at short notice.

## Common mistakes

:::mistake{title="Choosing the cheapest source without checking the purpose"}
An overdraft is cheap for a short need but risky for a six-year asset. Always match the term of the finance to the life of the need.
:::

:::mistake{title="Forgetting ownership"}
Leasing and renting do not give ownership. Instalments and loans do. Mention it when you compare.
:::

:::mistake{title="Saying leasing has no cost"}
Lease payments continue throughout the lease and can cost as much as buying with a loan.
:::

:::mistake{title="Ignoring risk and security"}
Cost is only one factor. Repayment terms, security and the lender's right to demand repayment also matter.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 tests the features of each source in short questions; Paper 2 asks for a recommendation. For *recommend* or *advise*, state the source, give two reasons linked to the need (term, cost, security) and one drawback. For *compare*, use cost, security, repayment and risk as headings for your points.
:::

:::exam-tip
When asked for the **cost** of finance, calculate the interest or extra amount paid. A comparison supported by figures earns more than a description.
:::

## Summary

:::summary
- Short-term needs suit trade credit and overdrafts; long-term assets suit loans, instalments or leasing.
- An overdraft charges interest only on the amount used but can be withdrawn on demand.
- A secured loan gives the lender a claim on an asset; an unsecured loan is riskier for the lender and usually costs more.
- Instalments lead to ownership; renting and leasing do not.
- Trade credit is free if paid within the period, and a discount may be offered for early payment.
- A good recommendation compares cost, security, repayment and risk for the stated need.
:::
`;

writeLesson(
  "capital/short-term-finance.md",
  {
    key: "capital.short-term-finance",
    title: "Sources of finance for sole traders, partnerships and companies",
    summary: "Compare secured and unsecured loans, overdrafts, instalments, renting and leasing and trade credit by cost, security, repayment and risk, and match a source to a described need.",
    concepts: ["aacc.capital.short-term-finance"],
    estimatedMinutes: 45,
    freePreview: true,
    level: "core",
  },
  body,
);
