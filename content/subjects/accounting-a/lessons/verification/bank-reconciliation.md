---
{
  "key": "verification.bank-reconciliation",
  "title": "Updated cash book and bank reconciliation statements",
  "summary": "Update the cash book for items on the bank statement, prepare a bank reconciliation statement from either balance, handle an overdraft and correct errors.",
  "concepts": [
    "aacc.verification.bank-reconciliation"
  ],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Farai receives the monthly bank statement for his hardware shop in Masvingo. His own cash book says that the business has US\$6,420 in the bank, but the statement shows US\$6,160. Neither is wrong: the bank has charged fees Farai had not recorded, some of his cheques have not yet reached the bank, and a deposit of his is still being cleared. A bank reconciliation explains the difference and shows the true bank balance that belongs in the statement of financial position.

Bank reconciliation is a regular question in ZIMSEC Papers 1 to 3 and Cambridge Papers 1 and 2. You should know how the cash book is kept and what a bank statement looks like.

:::keyfact{title="ZIMSEC and Cambridge terms"}
Both boards use **bank reconciliation statement**. ZIMSEC may say **bank account** or **cash book (bank column)**; Cambridge says **cash book**. **Updated cash book** (also called adjusted cash book) is the term for the cash book after the missing items are entered. Cambridge asks for the effect on the **statement of financial position**.
:::

## Key definitions

:::definition{term="Bank reconciliation statement"}
A statement that starts with the balance on the bank statement (or the updated cash book) and explains, item by item, the difference between it and the other balance.
:::

:::definition{term="Unpresented cheque"}
A cheque the business has written and recorded in the cash book that has not yet been paid by the bank.
:::

:::definition{term="Outstanding lodgement"}
A deposit recorded in the cash book that the bank has not yet shown on the statement.
:::

:::definition{term="Dishonoured cheque"}
A cheque received from a customer that the bank has refused to pay. The bank removes the money from the account.
:::

## Why the balances differ

**Timing differences** (the cash book is right; no entry needed):

- unpresented cheques;
- outstanding lodgements.

**Items on the bank statement not yet in the cash book** (the cash book must be updated):

- bank charges and interest charged;
- direct debits and standing orders paid;
- direct credits and standing orders received (for example rent or customer transfers);
- dishonoured cheques;
- interest received.

**Errors**, by either party: a wrong amount in the cash book (corrected in the cash book) or a bank error (corrected on the reconciliation statement and reported to the bank).

## The method

1. Compare the cash book and the bank statement item by item and tick matching items.
2. Update the cash book for the items on the statement that are not in it. Find the updated balance.
3. Prepare the reconciliation statement. Start with the statement balance, add outstanding lodgements and deduct unpresented cheques (if the balance is favourable) to arrive at the updated cash book balance.
4. If the account is **overdrawn**, think of the overdraft as a negative figure or label each line carefully: an unpresented cheque makes the cash book more overdrawn than the bank statement shows.

:::worked-solution[Example 1: favourable balance]
At 31 December 2025 Farai's cash book shows a balance of 6,420 in the bank. The bank statement shows 6,160. Comparing them shows:

- bank charges of 85 not in the cash book;
- a direct debit of 240 for insurance not in the cash book;
- a standing order of 300 received from a tenant, not in the cash book;
- a customer's cheque for 410 dishonoured;
- cheques written for 1,150 that have not been presented;
- a lodgement of 975 that the bank has not yet credited.

First update the cash book:

**Cash book (bank account) before and after updating**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 1 Dec | Balance b/d | 6,420 | 31 Dec | Bank charges | 85 |
| 31 Dec | Standing order: rent received | 300 | 31 Dec | Direct debit: insurance | 240 |
|  |  |  | 31 Dec | Dishonoured cheque: customer | 410 |
|  |  |  | 31 Dec | Balance c/d | 5,985 |
|  |  | **6,720** |  |  | **6,720** |
| 1 Jan | Balance b/d | 5,985 |  |  |  |

The updated balance is 5,985. Then prepare the reconciliation:

**Bank reconciliation statement at 31 December 2025**

|  | US\$ |
| --- | ---: |
| Balance per bank statement | 6,160 |
| Add outstanding lodgement | 975 |
| Less unpresented cheques | (1,150) |
| Balance per updated cash book | 5,985 |
:::

:::worked-solution[Example 2: overdraft with an error in the cash book]
Nyasha's cash book at 31 December 2025 shows an overdraft of 2,380. Her records show that a cheque for 650 was entered as 560 in the cash book, bank interest of 118 has not been recorded, cheques of 1,860 have not been presented and a lodgement of 740 has not yet been credited.

1. The cheque was recorded as 560 instead of 650, so the cash book is 90 too favourable. The overdraft increases by 90.
2. Interest charged increases the overdraft by 118.
3. Updated cash book overdraft: 2,380 + 90 + 118 = 2,588.

**Cash book (bank account), overdrawn, after updating**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Dec | Balance c/d (overdrawn) | 2,588 | 1 Dec | Balance b/d (overdrawn) | 2,380 |
|  |  |  | 15 Dec | Cheque to supplier: understated in the cash book | 90 |
|  |  |  | 31 Dec | Bank interest | 118 |
|  |  | **2,588** |  |  | **2,588** |
|  |  |  | 1 Jan | Balance b/d (overdrawn) | 2,588 |

**Bank reconciliation statement at 31 December 2025**

|  | US\$ |
| --- | ---: |
| Balance per bank statement (overdrawn) | (1,468) |
| Add outstanding lodgement | 740 |
| Less unpresented cheques | (1,860) |
| Balance per updated cash book (overdrawn) | (2,588) |

The bank statement shows a smaller overdraft (1,468) because Nyasha's cheques have not been presented, which would add 1,860 to the overdraft, while the lodgement of 740 would reduce it.
:::

## Effects on the financial statements

Each item that updates the cash book has an effect on the accounts. The bank balance in the statement of financial position is the **updated cash book balance**, not the bank statement figure.

:::worked-solution[Example 3: effect of updating the cash book in Example 1]
| Item from Example 1 | Statement of profit or loss | Statement of financial position |
| --- | --- | --- |
| Bank charges 85 | Expense (−85) | Bank −85 |
| Direct debit for insurance 240 | Expense (−240) | Bank −240 |
| Standing order: rent received 300 | Other income (+300) | Bank +300 |
| Dishonoured cheque 410 | No effect | Bank −410; trade receivables +410 |
| **Net effect** | **Profit −25** | **Bank −435; receivables +410** |

The updated bank balance is 5,985, not 6,420 and not 6,160. Trade receivables increase because the customer again owes 410.
:::

## Benefits and limitations

**Benefits:** errors in the cash book and the bank statement are found; unauthorised or fraudulent payments are discovered; the up-to-date bank balance is known; outstanding items are monitored.

**Limitations:** it does not prove that all transactions were recorded; a timing difference may hide a problem (such as a cheque that never arrives); the same error in both records is not found; a bank statement can contain the bank's own errors; it takes time and must be done regularly.

## Common mistakes

:::mistake{title="Adjusting the bank statement for items not yet in the cash book"}
Bank charges, interest and direct debits update the cash book. Unpresented cheques and outstanding lodgements are used in the reconciliation only.
:::

:::mistake{title="Wrong signs for an overdrawn account"}
When the account is overdrawn, an unpresented cheque adds to the overdraft in the cash book. Work with negative balances or label each line.
:::

:::mistake{title="Starting with the cash book before it is updated"}
The reconciliation ends with the updated balance. Update the cash book before finishing.
:::

:::mistake{title="Treating a dishonoured cheque as an expense"}
A dishonoured cheque is a debit to trade receivables, not an expense, unless it is later written off.
:::

## Exam tips

:::exam-tip
ZIMSEC and Cambridge Papers 1 to 3 ask you to **update** the cash book, **prepare** a reconciliation statement from either balance and **state** the amount to show in the statement of financial position. Show each item with its sign and check that the final line equals the updated balance.
:::

:::exam-tip
In **explain** or **evaluate** questions, give a benefit (finding errors and fraud) and a limitation (timing differences, errors in both records) and link them to the business in the stem.
:::

## Summary

:::summary
- The cash book and bank statement differ because of timing differences, items not yet recorded, and errors.
- Update the cash book for bank charges, interest, direct debits, standing orders, direct credits and dishonoured cheques.
- Unpresented cheques and outstanding lodgements appear only in the reconciliation statement.
- The reconciliation statement ends with the updated cash book balance, which is the figure for the statement of financial position.
- A bank overdraft needs careful signs.
- Reconciliations find errors and fraud, but not errors repeated in both records.
:::
