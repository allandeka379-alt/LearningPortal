---
{
  "key": "verification.control-accounts",
  "title": "Control accounts and personal ledger reconciliation",
  "summary": "Prepare sales and purchases ledger control accounts from totals, reconcile them with the list of personal balances, and understand what they detect and what they do not.",
  "concepts": [
    "aacc.verification.control-accounts"
  ],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Nyasha's wholesale business in Harare has more than three hundred credit customers and a hundred suppliers. Posting every transaction to the personal accounts is a large task, and errors are easy to make. A **control account** collects the totals of the books of prime entry for the whole sales ledger or the whole purchases ledger. Its balance should equal the total of the individual balances; if they differ, an error has been made, and the accountant knows in which ledger to look.

Control accounts are tested in ZIMSEC Papers 1 to 3 (often as a reconciliation or a section of a Paper 3 problem) and in Cambridge Papers 1 and 2. You should already know the books of prime entry, discounts, returns and irrecoverable debts.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **debtors ledger control**, **creditors ledger control**, **total accounts**. Cambridge: **sales ledger control account**, **purchases ledger control account**, **trade receivables**, **trade payables**, **books of prime entry**. The method and the layouts are the same.
:::

## Key definitions

:::definition{term="Control account"}
A summary account in the general ledger that records the totals of the transactions in a subsidiary ledger (the sales ledger or the purchases ledger). Its balance should equal the total of the balances in that ledger.
:::

:::definition{term="Contra entry"}
A transaction set off between the sales ledger and the purchases ledger when a person is both a customer and a supplier. The amount is debited to the purchases ledger control account and credited to the sales ledger control account.
:::

:::definition{term="Personal ledger"}
The sales ledger, containing the account of each credit customer, or the purchases ledger, containing the account of each supplier.
:::

## What goes on each side

**Sales ledger control account (trade receivables)**

| Debit side (increases receivables) | Credit side (decreases receivables) |
| --- | --- |
| Opening balance | Receipts from customers (bank and cash) |
| Credit sales (from the sales journal) | Discount allowed |
| Dishonoured cheques | Returns inwards |
| Interest charged to customers | Irrecoverable debts written off |
| Carriage or other charges to customers | Contra entries with the purchases ledger |
| Closing balance of any credit balances | Closing balance |

**Purchases ledger control account (trade payables)** is the mirror image: credit side has the opening balance and credit purchases; debit side has payments to suppliers, discount received, returns outwards and contra entries.

Cash sales and cash purchases are **not** included, because they do not pass through the personal accounts.

:::worked-solution[Example 1: preparing the control accounts from the totals]
Nyasha's totals for 2025 are: trade receivables at 1 January 18,400; credit sales 96,500; receipts from customers 88,200; discount allowed 1,950; returns inwards 2,750; irrecoverable debts written off 600; a customer's cheque dishonoured 400; and a contra entry of 1,200. Trade payables at 1 January 12,300; credit purchases 61,800; payments to suppliers 55,400; discount received 1,320; returns outwards 1,780.

**Sales ledger control account for the year ended 31 December 2025**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 1 Jan | Balance b/d | 18,400 | 31 Dec | Bank and cash received | 88,200 |
| 31 Dec | Credit sales (sales journal) | 96,500 | 31 Dec | Discount allowed | 1,950 |
| 31 Dec | Bank: dishonoured cheque | 400 | 31 Dec | Returns inwards | 2,750 |
|  |  |  | 31 Dec | Irrecoverable debts written off | 600 |
|  |  |  | 31 Dec | Purchases ledger control (contra) | 1,200 |
|  |  |  | 31 Dec | Balance c/d | 20,600 |
|  |  | **115,300** |  |  | **115,300** |
| 1 Jan | Balance b/d | 20,600 |  |  |  |

**Purchases ledger control account for the year ended 31 December 2025**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Dec | Bank and cash paid | 55,400 | 1 Jan | Balance b/d | 12,300 |
| 31 Dec | Discount received | 1,320 | 31 Dec | Credit purchases (purchases journal) | 61,800 |
| 31 Dec | Returns outwards | 1,780 |  |  |  |
| 31 Dec | Sales ledger control (contra) | 1,200 |  |  |  |
| 31 Dec | Balance c/d | 14,400 |  |  |  |
|  |  | **74,100** |  |  | **74,100** |
|  |  |  | 1 Jan | Balance b/d | 14,400 |

Closing trade receivables are 20,600 and trade payables 14,400. These are the figures for the statement of financial position, after any corrections.
:::

![Sales ledger control account for 2025: opening receivables of US\$18,400 rise with credit sales of 96,500 and a returned cheque of 400, and fall with receipts of 88,200, discount allowed 1,950, returns 2,750, bad debts 600 and a contra of 1,200, leaving closing receivables of US\$20,600.](media:diagrams/sales-ledger-control-movement.png "Figure: how the sales ledger control account moves from 18,400 to 20,600")

## What a control account does and does not detect

**It helps to find** errors in the personal ledgers or in the totals of the books of prime entry: a posting to the wrong amount, an overcast of a journal, a balance omitted from the list, and some fraud.

**It does not find** errors that affect both the control account and the personal ledger in the same way (an invoice omitted from every record), posting to the wrong customer, or compensating errors.

Benefits: the ledger can be divided among several clerks; fraud is harder, since the control account is kept by a different person; the balance of trade receivables or payables is available quickly. Limitations: errors can be hidden, and it takes time to trace the cause when a difference arises.

## Reconciling the personal ledger with the control account

1. Add up the personal balances (the list of balances).
2. Compare with the balance on the control account.
3. For each error, decide whether it affects the **control account** (errors in the totals of the books of prime entry or in the control account entries) or the **list of balances** (errors in the personal accounts).
4. Correct each side separately, then check that the corrected totals agree.

| Error | Adjust the |
| --- | --- |
| A journal total overcast or undercast | Control account |
| A control account entry omitted | Control account |
| A personal account posted with the wrong amount | List of balances |
| A personal balance omitted or added wrongly in the list | List of balances |
| A transaction omitted from the journal and the personal account | Both |

:::worked-solution[Example 2: reconciling the control account and the list]
Nyasha's list of sales ledger balances at 31 December 2025 totals 19,380, while the control account shows 20,600. Two errors are found in the personal accounts and one in the books of prime entry:

- The sales journal was overcast by 1,000.
- A receipt of 750 from a customer was credited to the customer's account as 570.
- A customer's balance of 400 was omitted from the list.

**Corrected sales ledger control account balance**

|  | US\$ |
| --- | ---: |
| Balance per control account | 20,600 |
| Less sales journal overcast | (1,000) |
| Corrected balance | 19,600 |

**Reconciliation of the list of sales ledger balances**

|  | US\$ |
| --- | ---: |
| Total of the list of balances | 19,380 |
| Add balance of a customer omitted from the list | 400 |
| Less receipt of 750 credited to a customer as 570 | (180) |
| Corrected total of the list | 19,600 |

Both agree at 19,600. The statement of financial position shows trade receivables of 19,600, and sales in the statement of profit or loss are 1,000 lower than the draft.
:::

:::worked-solution[Example 3: effect of the corrections on the financial statements]
1. Sales were overstated by the overcast, so revenue and profit for the year fall by 1,000.
2. The receipt posted as 570 only changes the personal account, so there is no change to the control account or to profit.
3. The omitted customer's balance changes the list, not the ledger totals, so there is no effect on profit.
4. Trade receivables in the statement of financial position are 19,600, the corrected control balance.
:::

## Common mistakes

:::mistake{title="Including cash sales"}
Only credit sales appear in the sales ledger control account.
:::

:::mistake{title="Putting discounts allowed on the wrong side"}
Discount allowed reduces receivables, so it is credited in the sales ledger control account. Discount received is debited in the purchases ledger control account.
:::

:::mistake{title="Correcting the wrong record"}
An overcast of the sales journal changes the control account; a wrongly posted receipt changes the list. Decide which before adjusting.
:::

:::mistake{title="Omitting the contra entry from one control account"}
The same contra amount is credited to the sales ledger control account and debited to the purchases ledger control account.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Papers 1 and 2 ask you to **prepare** a control account from totals (sometimes with a missing figure to find), **reconcile** a list of balances and **explain** benefits or limitations. Show the opening balance, each total on its correct side, the closing balance and the agreed total.
:::

:::exam-tip
With **explain** or **evaluate**, name both a benefit (location of errors, deterrent to fraud) and a limitation (some errors undetected) and tie them to the size of the business in the stem.
:::

## Summary

:::summary
- A control account summarises the totals of a personal ledger; its balance should equal the list of balances.
- Sales ledger control: debit credit sales and dishonoured cheques; credit receipts, discount allowed, returns inwards, irrecoverable debts and contras.
- Purchases ledger control is the mirror image with credit purchases on the credit side.
- Errors in the journals or control entries change the control account; errors in personal accounts change the list.
- Control accounts locate errors and deter fraud, but some errors remain hidden.
:::
