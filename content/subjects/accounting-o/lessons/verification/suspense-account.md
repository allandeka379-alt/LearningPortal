---
{
  "key": "verification.suspense-account",
  "title": "The suspense account",
  "summary": "Open a suspense account for a trial balance difference, decide which errors pass through it, write the correcting journal entries and prepare the suspense account until it clears.",
  "concepts": ["acc.verification.suspense-account"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Tendai runs a building-materials shop in Harare. At the end of the year his trial balance does not agree: the credit column is US\$885 larger than the debit column. His accountant needs to prepare draft financial statements quickly for the bank, but the errors may take days to find. The solution is to put the difference into a temporary account called the **suspense account**, so that the trial balance agrees for now. As each error is found, it is corrected by a journal entry, and one side of that entry goes to the suspense account. When every error affecting the trial balance has been corrected, the suspense account has no balance left.

Suspense account questions appear on almost every Paper 2. You will be asked to open the suspense account, write journal entries to correct errors, prepare the suspense account and, often, to recalculate profit. This lesson covers the first three tasks; the effect on profit is the next lesson.

:::keyfact{title="ZIMSEC and Cambridge terms"}
Both boards use **suspense account**. ZIMSEC questions often label the opening entry "difference in books" or "difference on trial balance"; Cambridge uses "trial balance difference" or simply "difference". Customers are **debtors** or **trade receivables**; suppliers are **creditors** or **trade payables**.
:::

## Key definitions

:::definition{term="Suspense account"}
A temporary account opened with the difference between the trial balance totals, so that the trial balance agrees until the errors are found and corrected.
:::

:::definition{term="Casting error"}
An error in adding up a book of prime entry or an account. **Overcast** means added up too high; **undercast** means added up too low.
:::

## Opening the suspense account

Put the difference on the side that makes the trial balance agree:

- If the **credit** total is larger, the suspense account has a **debit** balance (the debit column was short).
- If the **debit** total is larger, the suspense account has a **credit** balance.

## Which errors go through the suspense account?

Only errors that made the trial balance disagree. These are errors where the debit and credit entries were unequal:

| Error | Example | Uses suspense? |
| --- | --- | --- |
| One side of the entry not posted | Wages paid entered in the cash book but not in the wages account | Yes |
| Different amounts on each side | Rent of 450 paid, posted to rent as 540 | Yes |
| Both entries on the same side | Interest received debited to bank and debited to interest received | Yes |
| Casting error | Sales journal overcast by 300 | Yes |
| Balance omitted from the trial balance | Carriage outwards balance left out | Yes |
| The six errors not revealed | Omission, commission, principle, original entry, reversal, compensating | **No** |

## Writing the corrections

Use the same method as before: what was done, what should have been done, the correction. The difference now is that one side of the correction is the account that was wrong and the other side is **suspense**, because the error had only one wrong side.

- **One side missing**: post the missing side to the account; the other side goes to suspense.
- **Wrong amount on one side**: adjust that account by the difference; the other side to suspense.
- **Both entries on one side**: post **twice** the amount to the account on the correct side; the other side to suspense.
- **Casting error**: an overcast sales journal means sales is too high, so debit sales and credit suspense; an undercast sales journal means credit sales and debit suspense.

:::worked-solution[Example 1: Tendai's suspense account]
Tendai's trial balance at 31 December 2025 showed credits US\$885 more than debits, so a suspense account was opened with a **debit** of 885. These errors were then found.

1. Rent of US\$450 paid by bank was posted to the rent account as US\$540. Bank is correct. Rent is 90 too high: credit rent 90, debit suspense 90.
2. The discount allowed column of the cash book (US\$65) was not posted to the discount allowed account. The customers were credited correctly. Debit discount allowed 65, credit suspense 65.
3. The sales journal was overcast by US\$300. Sales is 300 too high: debit sales 300, credit suspense 300.
4. A payment of US\$610 to Gumbo Hardware was recorded in the cash book but not in Gumbo Hardware's account. Debit Gumbo Hardware 610, credit suspense 610.

**Journal**

| Date | Details | Debit US\$ | Credit US\$ |
| --- | --- | ---: | ---: |
| 31 Dec | Suspense | 90 |  |
|  | Rent |  | 90 |
|  | *Rent of US\$450 posted to the rent account as US\$540* |  |  |
| 31 Dec | Discount allowed | 65 |  |
|  | Suspense |  | 65 |
|  | *Discount allowed total not posted to the discount allowed account* |  |  |
| 31 Dec | Sales | 300 |  |
|  | Suspense |  | 300 |
|  | *Sales journal overcast* |  |  |
| 31 Dec | Gumbo Hardware | 610 |  |
|  | Suspense |  | 610 |
|  | *Payment to Gumbo Hardware not posted to its account* |  |  |

Post the suspense lines to the suspense account:

**Suspense account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Dec | Difference on trial balance | 885 | 31 Dec | Discount allowed | 65 |
| 31 Dec | Rent | 90 | 31 Dec | Sales | 300 |
|  |  |  | 31 Dec | Gumbo Hardware | 610 |
|  |  | **975** |  |  | **975** |

The debit side totals $885 + 90 = 975$ and the credit side $65 + 300 + 610 = 975$, so the account clears. All the errors have been found.
:::

:::worked-solution[Example 2: Rudo's suspense account with a credit balance]
Rudo's trial balance at 31 December 2025 showed debits US\$555 more than credits. The suspense account was opened with a **credit** of 555. The errors were:

1. Goods of US\$240 returned to Kariba Fabrics were correctly credited to returns outwards but were also **credited** to Kariba Fabrics. Two credits: Kariba Fabrics needs a debit of $2 \times 240 = 480$; credit suspense 480.
2. The sales journal was undercast by US\$1,000. Credit sales 1,000; debit suspense 1,000.
3. Interest received of US\$380 was debited in the bank account and also **debited** to the interest received account. Credit interest received $2 \times 380 = 760$; debit suspense 760.
4. Wages of US\$725 paid were entered in the cash book only. Debit wages 725; credit suspense 725.
5. A credit sale of US\$430 to Moyo was debited to Mlambo's account. This is an error of commission, so suspense is **not** used: debit Moyo 430, credit Mlambo 430.

**Journal**

| Date | Details | Debit US\$ | Credit US\$ |
| --- | --- | ---: | ---: |
| 31 Dec | Kariba Fabrics | 480 |  |
|  | Suspense |  | 480 |
|  | *Returns outwards of US\$240 credited instead of debited to Kariba Fabrics* |  |  |
| 31 Dec | Suspense | 1,000 |  |
|  | Sales |  | 1,000 |
|  | *Sales journal undercast* |  |  |
| 31 Dec | Suspense | 760 |  |
|  | Interest received |  | 760 |
|  | *Interest received of US\$380 debited instead of credited to interest received* |  |  |
| 31 Dec | Wages | 725 |  |
|  | Suspense |  | 725 |
|  | *Wages paid not posted to the wages account* |  |  |
| 31 Dec | Moyo | 430 |  |
|  | Mlambo |  | 430 |
|  | *Credit sale to Moyo debited to Mlambo (no suspense entry)* |  |  |

**Suspense account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Dec | Sales | 1,000 | 31 Dec | Difference on trial balance | 555 |
| 31 Dec | Interest received | 760 | 31 Dec | Kariba Fabrics | 480 |
|  |  |  | 31 Dec | Wages | 725 |
|  |  | **1,760** |  |  | **1,760** |

Debit side $1,000 + 760 = 1,760$; credit side $555 + 480 + 725 = 1,760$. The account clears.
:::

## Checking your work

A suspense account question has a built-in check: when all the errors are corrected, the account must balance with no closing balance. If it does not:

- re-read each error and ask whether the trial balance was affected;
- check that you used **twice** the amount for both-entries-on-one-side errors;
- check that you did not put an error of commission, principle or omission through suspense.

Some examination questions give the errors and ask you to **calculate** the original difference. Work backwards: the opening entry is whatever amount makes the suspense account balance.

## Common mistakes

:::mistake{title="Opening suspense on the wrong side"}
The suspense balance goes on the side of the trial balance that was **short**. If credits exceed debits, suspense is a debit.
:::

:::mistake{title="Sending every error to suspense"}
Errors that did not affect the trial balance (the six types) never pass through suspense. Including them stops the account from clearing.
:::

:::mistake{title="Getting the casting direction backwards"}
Sales overcast means sales must be **reduced**, so sales is debited. Purchases overcast means purchases is credited.
:::

## Exam tips

:::exam-tip
Label the opening entry clearly ("Difference on trial balance") and name the account affected in each later entry, exactly as in the journal. Examiners award marks for the details as well as the amounts.
:::

:::exam-tip
Draw up the journal first, then post only the suspense lines. Every suspense entry must appear in the journal; every journal line that says "Suspense" must appear in the account.
:::

:::exam-tip
In Cambridge questions, write "No entry in the suspense account" or "Does not affect suspense" when a listed error is one of the six types; it often earns a mark.
:::

## Summary

:::summary
- A suspense account holds a trial balance difference temporarily; it is a debit if credits were larger, a credit if debits were larger.
- Only errors that made the totals disagree are corrected through suspense: single entries, unequal amounts, two entries on one side, casting errors and balances missing from the trial balance.
- One side of each correction is the wrong account, the other side is suspense.
- When every error is corrected, the suspense account clears to nil.
:::
