---
{
  "key": "adjustments.irrecoverable-debts",
  "title": "Irrecoverable debts and debts recovered",
  "summary": "Write off irrecoverable (bad) debts with journal and ledger entries, record a debt recovered after it was written off, and work out the effect on profit and on trade receivables.",
  "concepts": ["acc.adjustments.irrecoverable-debts"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Tendai sells building materials on credit to small contractors around Masvingo. Most pay within thirty days, but this year one customer's shop closed and its owner left the country, and another customer could not be traced at all. Tendai will never receive that money. Keeping those amounts in his trade receivables would make his business look richer than it is.

A debt that will not be paid is written off as an **irrecoverable debt** (ZIMSEC: **bad debt**). It is an expense of selling on credit. Both boards examine the journal entries, the customer's account, the irrecoverable debts account, and what happens when a debt already written off is unexpectedly paid. This lesson prepares the ground for the next one, on the allowance (provision) for doubtful debts.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC usually says **bad debts** and **bad debts recovered**; Cambridge 0452 says **irrecoverable debts** and **irrecoverable debts recovered**. Customers' accounts are in the **trade receivables ledger** (ZIMSEC) or **sales ledger** (Cambridge). The income statement is the **statement of profit or loss** in Cambridge papers.
:::

## Key definitions

:::definition{term="Irrecoverable (bad) debt"}
An amount owed by a credit customer that the business is certain it will not receive, for example because the customer is bankrupt, has died without assets, or cannot be traced.
:::

:::definition{term="Writing off a debt"}
Removing an irrecoverable debt from the customer's account and charging it as an expense.
:::

:::definition{term="Irrecoverable debt recovered"}
An amount received from a customer whose debt had been written off in an earlier period.
:::

## Why debts are written off

The **prudence** concept says assets must not be overstated and losses should be recognised as soon as they are known. A debt that cannot be collected is no longer an asset. Writing it off also applies **matching**: the loss is charged in the period in which it becomes known, as a cost of selling on credit.

## The double entry

| Event | Debit | Credit |
| --- | --- | --- |
| Debt written off | Irrecoverable debts | Customer (trade receivables) |
| Year end | Income statement | Irrecoverable debts |

The irrecoverable debts account collects all the debts written off during the year; its total is transferred to the income statement as an expense. The customer's account is closed, so trade receivables fall by the same amount.

:::worked-solution[Example 1: two debts written off]
On 14 August 2025 Tendai learned that Gift Store, which owed him US\$1,340, had closed and could not pay. On 20 November 2025 he wrote off US\$615 owed by Mapfumo Builders, who could not be traced.

**Journal**

| Date | Details | Debit US\$ | Credit US\$ |
| --- | --- | ---: | ---: |
| 14 Aug 2025 | Irrecoverable debts | 1,340 |  |
|  | Gift Store |  | 1,340 |
|  | *Debt written off: the business has closed and cannot pay* |  |  |
| 20 Nov 2025 | Irrecoverable debts | 615 |  |
|  | Mapfumo Builders |  | 615 |
|  | *Debt written off: customer cannot be traced* |  |  |

**Gift Store account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 1 Aug 2025 | Balance b/d | 1,340 | 14 Aug 2025 | Irrecoverable debts | 1,340 |
|  |  | **1,340** |  |  | **1,340** |

**Irrecoverable debts account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 14 Aug 2025 | Gift Store | 1,340 | 31 Dec 2025 | Income statement | 1,955 |
| 20 Nov 2025 | Mapfumo Builders | 615 |  |  |  |
|  |  | **1,955** |  |  | **1,955** |

Irrecoverable debts of 1,955 appear as an expense in the income statement, and trade receivables are 1,955 lower.
:::

## Part of a debt written off

Sometimes a customer in difficulty pays part of what is owed "in full and final settlement" (for example, a bankrupt customer pays a percentage). The cash received is credited to the customer as usual and the remainder is written off.

## Debts recovered

Occasionally a customer whose debt was written off in an earlier year pays after all. The recommended treatment has two steps:

1. **Reinstate the debt:** debit the customer, credit irrecoverable debts recovered. This restores the customer's record, which shows that the customer eventually paid; useful if they ask for credit again.
2. **Record the receipt:** debit bank (or cash), credit the customer.

At the year end the irrecoverable debts recovered account is closed to the income statement, where the amount is shown as **other income** (added to gross profit). Some businesses credit the recovery to the irrecoverable debts account instead, which reduces the expense; both give the same profit.

:::worked-solution[Example 2: part payment and a recovery]
Kudzai Traders owed Tendai US\$2,500. On 30 April 2025 Kudzai Traders was declared bankrupt and paid 40% of the debt in full and final settlement by bank transfer. On 12 July 2025 Ruvimbo Stores, whose debt of US\$860 had been written off in 2024, paid the full amount.

1. Kudzai Traders: received 40% × 2,500 = 1,000; written off 2,500 − 1,000 = 1,500.

**Kudzai Traders account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 1 Mar 2025 | Balance b/d | 2,500 | 30 Apr 2025 | Bank | 1,000 |
|  |  |  | 30 Apr 2025 | Irrecoverable debts | 1,500 |
|  |  | **2,500** |  |  | **2,500** |

2. Ruvimbo Stores: reinstate, then record the receipt.

**Journal**

| Date | Details | Debit US\$ | Credit US\$ |
| --- | --- | ---: | ---: |
| 12 Jul 2025 | Ruvimbo Stores | 860 |  |
|  | Irrecoverable debts recovered |  | 860 |
|  | *Debt written off in 2024 reinstated* |  |  |
| 12 Jul 2025 | Bank | 860 |  |
|  | Ruvimbo Stores |  | 860 |
|  | *Cash received from Ruvimbo Stores* |  |  |

**Ruvimbo Stores account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 12 Jul 2025 | Irrecoverable debts recovered | 860 | 12 Jul 2025 | Bank | 860 |
|  |  | **860** |  |  | **860** |

The income statement shows irrecoverable debts of 1,500 as an expense and irrecoverable debts recovered of 860 as other income.
:::

## Effect on the financial statements

- **Writing off a debt:** profit falls by the amount written off; trade receivables (current assets) fall by the same amount. Cash is not affected.
- **A debt recovered:** profit rises by the amount recovered; cash rises. Trade receivables are unchanged overall, because the customer is debited and credited with the same amount.
- If a debt is written off **after** the trial balance has been prepared, adjust twice: add it to irrecoverable debts in the income statement and deduct it from trade receivables in the statement of financial position.

## Common mistakes

:::mistake{title="Crediting sales or debiting the customer when writing off"}
The customer is **credited** (the debt is removed) and irrecoverable debts is **debited** (an expense). Sales are not changed.
:::

:::mistake{title="Recording a recovery straight to bank and income"}
Reinstate the customer first, then record the receipt, so the customer's history is complete.
:::

:::mistake{title="Forgetting the second adjustment"}
A debt written off at the year end reduces trade receivables as well as profit.
:::

:::mistake{title="Calling a doubtful debt irrecoverable"}
A debt that **might** not be paid is doubtful and is covered by the allowance (next lesson); only debts that **will** not be paid are written off.
:::

## Exam tips

:::exam-tip
Give a narrative for every journal entry, such as "Debt written off: customer bankrupt". Narratives carry marks in both boards' Paper 2.
:::

:::exam-tip
When a note says "a further debt of US\$X is to be written off", look for the trade receivables figure in the statement of financial position: it must be reduced by X before any allowance is calculated.
:::

## Summary

:::summary
- An irrecoverable (bad) debt is one the business will not receive; writing it off applies prudence and matching.
- Write off: debit irrecoverable debts, credit the customer; transfer the total to the income statement as an expense.
- For part payments, credit the customer with the cash and write off the remainder.
- Debt recovered: debit the customer, credit irrecoverable debts recovered; then debit bank, credit the customer.
- Recoveries are other income (or reduce the expense) in the income statement.
- Writing off reduces profit and trade receivables; it does not affect cash.
:::
