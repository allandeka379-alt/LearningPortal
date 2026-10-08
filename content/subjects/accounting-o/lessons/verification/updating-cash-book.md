---
{
  "key": "verification.updating-cash-book",
  "title": "Bank statements and updating the cash book",
  "summary": "Read a bank statement from the bank's point of view, identify items the cash book has not yet recorded (bank charges, interest, credit transfers, standing orders, direct debits, dishonoured cheques) and errors in the cash book, and prepare the updated bank columns of the cash book.",
  "concepts": ["acc.verification.updating-cash-book"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Tatenda runs a minibus and parcel-delivery business in Mutare. He records every payment and receipt in the bank columns of his cash book. At the end of each month his bank sends him a **bank statement**: the bank's own record of his account. The two records rarely show the same balance. Some differences are simply timing: a cheque Tatenda wrote on 30 December may not reach the bank until January. Others are items the bank knew about first: bank charges, a customer who paid straight into his account, or the monthly insurance standing order.

Before Tatenda can trust his cash book balance, he must **update the cash book** for everything the bank has recorded that he has not, and correct any errors he made. Only then can he prepare a bank reconciliation statement (the next lesson) to explain the timing differences that remain. Both ZIMSEC and Cambridge set Paper 2 questions in which candidates update the cash book and then reconcile it.

:::keyfact{title="ZIMSEC and Cambridge terms"}
Both boards use **bank statement**, **cash book** and **bank reconciliation statement**. Cambridge refers to the **updated cash book**; ZIMSEC questions may say the **adjusted cash book** or "write up the cash book to date". Some ZIMSEC questions still refer to cheques as the main payment method; Cambridge also mentions **digital transfers** and online banking.
:::

## Key definitions

:::definition{term="Bank statement"}
A copy of the business's account in the bank's records, showing deposits, withdrawals, charges and the running balance, sent to the customer regularly.
:::

:::definition{term="Standing order"}
An instruction by the business to its bank to pay a **fixed** amount to a named person at regular intervals, for example monthly rent.
:::

:::definition{term="Direct debit"}
An authority given by the business allowing a supplier to collect amounts, which may **vary**, directly from the business's bank account, for example an electricity or insurance bill.
:::

:::definition{term="Credit transfer"}
An amount paid directly into the business's bank account by a customer or other person, without the business handling a cheque or cash.
:::

:::definition{term="Dishonoured cheque"}
A cheque received from a customer and paid into the bank which the customer's bank refuses to pay, usually because the customer has insufficient funds.
:::

## The bank statement is written from the bank's point of view

To the bank, the money in Tatenda's account is a **liability**: the bank owes it to him. So on the bank statement:

- money paid in (deposits) is a **credit**, and money paid out is a **debit**;
- a balance "in funds" is a **credit balance**, and an overdraft is a **debit balance**.

In Tatenda's cash book it is the other way round: money in the bank is an **asset**, so receipts are debits and an amount in the bank is a debit balance. A credit balance in the cash book is an overdraft.

## Items found only on the bank statement

When you compare the statement with the cash book, tick the items that appear in both. The unticked items on the **bank statement** are usually ones the business has not yet recorded:

| Item on the bank statement | Effect on the business's bank balance | Entry in the cash book |
| --- | --- | --- |
| Bank charges | Reduces it | Credit (payments side) |
| Interest charged on an overdraft or loan | Reduces it | Credit |
| Standing order (fixed regular payment, e.g. rent) | Reduces it | Credit |
| Direct debit (variable amount collected by a supplier) | Reduces it | Credit |
| Dishonoured cheque from a customer | Reduces it | Credit, and debit the customer again |
| Credit transfer received from a customer | Increases it | Debit (receipts side) |
| Interest received or dividends paid in directly | Increases it | Debit |

A dishonoured cheque needs two entries: credit the bank column (the money has gone) and debit the customer's account (the customer owes the amount again).

## Errors in the cash book

The comparison may also show mistakes in the cash book itself:

- a payment recorded at the wrong amount (for example 468 instead of 486): enter the **difference** on the side that corrects it;
- a receipt recorded as a payment, or the other way round: enter **twice** the amount;
- an addition (casting) error in either column: enter the amount of the error.

Errors made by the **bank** are not entered in the cash book. They are dealt with in the bank reconciliation statement, and the bank is asked to correct them.

:::worked-solution[Example 1: Updating Tatenda's cash book]
Tatenda's cash book showed a debit balance (money in the bank) of US\$2,845 on 31 December 2025. His bank statement for December showed these items not yet in the cash book:

- bank charges US\$38;
- a standing order for insurance US\$150;
- a direct debit for electricity US\$212;
- a cheque for US\$325 received from Moyo returned unpaid (dishonoured);
- a credit transfer of US\$640 from Mutare Lodge, a customer;
- interest received US\$17.

1. Receipts not yet recorded go on the debit side: credit transfer 640 and interest 17.
2. Payments not yet recorded go on the credit side: 38, 150, 212 and the dishonoured cheque 325.
3. Balance: $2,845 + 640 + 17 - 38 - 150 - 212 - 325 = 2,777$.

**Cash book (bank columns) of Tatenda**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Dec | Balance b/d | 2,845 | 31 Dec | Bank charges | 38 |
| 31 Dec | Credit transfer: Mutare Lodge | 640 | 31 Dec | Insurance (standing order) | 150 |
| 31 Dec | Interest received | 17 | 31 Dec | Electricity (direct debit) | 212 |
|  |  |  | 31 Dec | Moyo (dishonoured cheque) | 325 |
|  |  |  | 31 Dec | Balance c/d | 2,777 |
|  |  | **3,502** |  |  | **3,502** |
| 1 Jan | Balance b/d | 2,777 |  |  |  |

The ledger entries for the other side follow from the cash book: debit bank charges, insurance and electricity; debit Moyo's account with 325; credit Mutare Lodge with 640; credit interest received with 17.
:::

:::worked-solution[Example 2: An overdraft and errors in the cash book]
Chipo's cash book showed a bank **overdraft** of US\$1,260 on 31 December 2025 (a credit balance). On checking the bank statement she found:

- a cheque for US\$486 paid to Kanda Wholesalers had been entered in the cash book as US\$468;
- the receipts side of the cash book had been undercast by US\$100;
- interest on the overdraft US\$54 and bank charges US\$27 appeared only on the bank statement;
- a credit transfer of US\$900 from the Avondale Chess Club appeared only on the bank statement.

1. The opening overdraft is brought down on the **credit** side.
2. The cheque was understated by $486 - 468 = 18$, so credit 18 more.
3. The undercast receipts need a debit of 100.
4. Interest and charges are credits; the credit transfer is a debit.
5. Balance: $-1,260 - 18 + 100 - 54 - 27 + 900 = -359$, still an overdraft.

**Cash book (bank columns) of Chipo**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Dec | Error: receipts undercast | 100 | 31 Dec | Balance b/d | 1,260 |
| 31 Dec | Credit transfer: Avondale Chess Club | 900 | 31 Dec | Error: Kanda Wholesalers cheque (486 − 468) | 18 |
| 31 Dec | Balance c/d | 359 | 31 Dec | Interest on overdraft | 54 |
|  |  |  | 31 Dec | Bank charges | 27 |
|  |  | **1,359** |  |  | **1,359** |
|  |  |  | 1 Jan | Balance b/d | 359 |

The updated balance is a credit of 359: Chipo is overdrawn by US\$359. This is the figure that appears as a current liability in her statement of financial position.
:::

## Why update the cash book?

- The cash book balance must be correct before it goes into the trial balance and the statement of financial position.
- Expenses such as bank charges and interest must be recorded for the profit to be right.
- Dishonoured cheques show which customers still owe money, so credit control can act quickly.
- Errors found now can be put right before they affect later months.

## Common mistakes

:::mistake{title="Copying the bank statement's sides"}
A deposit is a **credit** on the bank statement but a **debit** in the cash book. Always think about the business's point of view.
:::

:::mistake{title="Entering unpresented cheques in the updated cash book"}
Cheques already recorded in the cash book but not yet on the statement are timing differences. They belong in the bank reconciliation statement, not in the updated cash book.
:::

:::mistake{title="Correcting bank errors in the cash book"}
If the bank charged someone else's payment to the account, the cash book is right and the bank is wrong. Show it in the reconciliation; never enter it in the cash book.
:::

## Exam tips

:::exam-tip
Start the updated cash book with the balance given in the question, on the correct side (debit if in funds, credit if overdrawn), then add only the items the business did not know about and its own errors.
:::

:::exam-tip
Write clear details ("Bank charges", "Moyo: dishonoured cheque", "Credit transfer: Mutare Lodge"). Examiners give a mark for each correctly described and placed item.
:::

## Summary

:::summary
- A bank statement is the bank's record: deposits are credits and money in the account is a credit balance.
- Update the cash book for bank charges, interest, standing orders, direct debits, dishonoured cheques, credit transfers and errors in the cash book.
- Payments the business did not know about go on the credit side; receipts go on the debit side.
- A dishonoured cheque is credited in the cash book and debited back to the customer.
- Bank errors and timing differences are not entered in the cash book; they go in the bank reconciliation statement.
:::
