---
{
  "key": "verification.errors-not-revealed",
  "title": "Errors that do not affect the trial balance",
  "summary": "Identify and explain the six types of error that leave the trial balance totals in agreement: omission, commission, principle, original entry, complete reversal and compensating errors.",
  "concepts": ["acc.verification.errors-not-revealed"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

Farai owns a hardware shop in Gweru. At the end of the year his trial balance agreed at the first attempt and he was pleased. A month later a builder phoned to complain that he had been sent a statement for cement he had never bought: the sale had been posted to the account of a different builder with a similar name. The trial balance had agreed all along, yet the books were wrong.

This happens because a trial balance only checks that the total of the debit entries equals the total of the credit entries. Any error that changes both totals by the same amount, or does not change them at all, slips through. There are **six** such errors, and both ZIMSEC and Cambridge expect you to name them, explain them and give an example of each. Later lessons show how to correct them with journal entries.

:::keyfact{title="ZIMSEC and Cambridge terms"}
Both boards list the same six errors. ZIMSEC often describes customers as **debtors** and suppliers as **creditors**; Cambridge uses **trade receivables** and **trade payables**, and calls the customers' ledger the **sales ledger**. The books of prime entry (Cambridge) are also called **subsidiary books** (ZIMSEC).
:::

## Key definitions

:::definition{term="Error of omission"}
A transaction is left out of the books completely: neither the debit nor the credit entry is made.
:::

:::definition{term="Error of commission"}
An entry is made in the correct class of account and on the correct side, but in the wrong person's (or wrong) account of the same type, for example a receipt from one customer credited to another customer.
:::

:::definition{term="Error of principle"}
An entry is made in the wrong **class** of account, for example a non-current asset debited to an expense account, or capital expenditure treated as revenue expenditure.
:::

:::definition{term="Error of original entry"}
The wrong amount is recorded in the book of prime entry (or on the source document), so both the debit and the credit are posted with the same wrong amount.
:::

:::definition{term="Complete reversal of entries"}
The correct accounts and the correct amount are used, but the account that should be debited is credited and the account that should be credited is debited.
:::

:::definition{term="Compensating error"}
Two or more unrelated errors of the same amount cancel each other out, for example one debit total overstated by US\$100 and a credit total also overstated by US\$100.
:::

## Why each error leaves the totals equal

| Error | What happens to the debit total | What happens to the credit total |
| --- | --- | --- |
| Omission | Nothing recorded | Nothing recorded |
| Commission | Correct amount, wrong account of the same type | Correct amount |
| Principle | Correct amount, wrong class of account | Correct amount |
| Original entry | Wrong amount | Same wrong amount |
| Complete reversal | Amount in the account that should be credited | Amount in the account that should be debited |
| Compensating | Overstated (or understated) | Overstated (or understated) by the same amount |

In every row the debit total and the credit total move together, so they still agree. The trial balance cannot see the problem.

### Telling commission and principle apart

Both errors put an amount in the wrong account. Ask: **is the wrong account the same kind of account as the right one?**

- Customer A instead of customer B (both trade receivables): **commission**.
- Rent instead of wages (both expenses): many textbooks also treat this as **commission**, because both are nominal accounts of the same class.
- Equipment (an asset) instead of repairs (an expense), or purchases instead of a motor vehicle: **principle**, because the class of account is wrong. These errors also make profit wrong.

### Telling original entry and complete reversal apart

- Original entry: the **amount** is wrong, the sides are right.
- Complete reversal: the **amount** is right, the **sides** are swapped.

:::worked-solution[Example 1: Classifying Farai's errors]
Farai's bookkeeper found these errors after the trial balance had agreed. Identify each type.

1. A credit sale of US\$720 to Moyo Builders was debited to the account of Moyo Brothers. Both are trade receivables, so this is an **error of commission**.
2. A new cash register costing US\$580 was debited to the purchases account. A non-current asset was treated as goods for resale, so this is an **error of principle**.
3. An invoice for US\$1,260 from a supplier was entered in the purchases journal as US\$1,620. Both purchases and the supplier were posted with 1,620: an **error of original entry**.
4. Wages of US\$450 paid in cash were never recorded: an **error of omission**.
5. Cash of US\$300 received from a customer, Sibanda, was debited to Sibanda's account and credited to the cash account: a **complete reversal of entries**.
6. The sales account was overcast by US\$200 and the electricity account was also overcast by US\$200: a **compensating error**.

Each error affected the debit and credit totals by equal amounts, so none of them stopped the trial balance from agreeing.
:::

:::worked-solution[Example 2: Why an error of original entry is invisible]
Rudo's clerk entered a credit sale to Kudzai Phiri of US\$1,850 as US\$1,580 in the sales journal. He then posted correctly from the journal: debit Kudzai Phiri 1,580 and credit sales 1,580.

**Kudzai Phiri account (as recorded)**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 9 Mar | Sales | 1,580 |  |  |  |

**Sales account (extract, as recorded)**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
|  |  |  | 9 Mar | Kudzai Phiri | 1,580 |

1. Compare the trial balance the clerk drew up with the one he should have drawn up.

**Trial balance if the invoice had been recorded correctly**

| Account | Debit US\$ | Credit US\$ |
| --- | ---: | ---: |
| Capital |  | 6,000 |
| Bank | 4,690 |  |
| Purchases | 3,200 |  |
| Sales |  | 3,780 |
| Kudzai Phiri (trade receivable) | 1,850 |  |
| Rent | 640 |  |
| Trade payables |  | 600 |
| **Total** | **10,380** | **10,380** |

**Trial balance as Rudo's clerk drew it up**

| Account | Debit US\$ | Credit US\$ |
| --- | ---: | ---: |
| Capital |  | 6,000 |
| Bank | 4,690 |  |
| Purchases | 3,200 |  |
| Sales |  | 3,510 |
| Kudzai Phiri (trade receivable) | 1,580 |  |
| Rent | 640 |  |
| Trade payables |  | 600 |
| **Total** | **10,110** | **10,110** |

2. Both trial balances agree. The recorded one is US\$270 smaller on each side ($1,850 - 1,580 = 270$): trade receivables and sales are both understated by the same amount, so the totals still match.
3. The error will probably be found only when Kudzai Phiri is sent a statement, or when the invoice copy is compared with the journal.
:::

## Errors that **do** affect the trial balance

To recognise the six types, it helps to know the errors that are revealed. A trial balance will not agree when:

- only one side of a transaction is posted (a single entry);
- different amounts are posted to the debit and credit sides (for example 450 debit and 540 credit);
- both entries are posted to the same side (two debits);
- an account is added up wrongly (a casting error) and nothing cancels it;
- a balance is left out of the trial balance or put in the wrong column.

These errors are corrected through a **suspense account**, covered in a later lesson.

## Common mistakes

:::mistake{title="Calling a transposition an error of commission"}
If the wrong amount (for example 1,620 instead of 1,260) is used for **both** entries, it is an error of original entry. If it is used for one entry only, the trial balance will not agree.
:::

:::mistake{title="Mixing up commission and principle"}
Commission is the right type of account but the wrong one; principle is the wrong type altogether (asset versus expense, capital versus revenue).
:::

:::mistake{title="Thinking compensating errors are one error"}
A compensating error is two or more separate errors that happen to cancel. Each still has to be corrected.
:::

## Exam tips

:::exam-tip
When asked to "explain" an error type, give the definition **and** a short example with amounts and account names, such as "a payment of US\$90 for repairs debited to the motor vehicle account (error of principle)".
:::

:::exam-tip
A mnemonic for the six errors is **"Old Cats Pounce On Cold Rats"**: Omission, Commission, Principle, Original entry, Compensating, Reversal.
:::

:::exam-tip
If a question says "the trial balance agreed", none of the errors listed can involve a single entry, two entries on one side or a casting error that is not cancelled. Use this to check your answer.
:::

## Summary

:::summary
- Six errors leave the trial balance in agreement: omission, commission, principle, original entry, complete reversal and compensating.
- They are not revealed because the debit and credit totals change by the same amount, or not at all.
- Commission: wrong account of the right type. Principle: wrong type of account. Original entry: wrong amount on both sides. Reversal: right amount, sides swapped.
- Single entries, unequal amounts, two entries on one side, uncancelled casting errors and misplaced balances **are** revealed.
:::
