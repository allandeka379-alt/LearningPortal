---
{
  "key": "systems.data-transfer",
  "title": "Transferring manual accounts to a computerised system",
  "summary": "The stages of changing from manual accounts to a computerised system, the methods of changeover, and the checks that keep the transferred data accurate.",
  "concepts": [
    "aacc.systems.data-transfer"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Tatenda's wholesale business in Bulawayo has kept its accounts in ledgers for twenty years. The owner has decided to move to a computerised system from the start of the next financial year. Moving the accounts across is more than typing in the figures: old errors and duplicates must be removed, the opening balances must agree, and the business must keep working while staff learn the new system.

This lesson is for Cambridge A Level candidates (Paper 3). Cambridge AS Level covers the use of computerised systems; this lesson looks at the change-over. No software is named.

:::keyfact{title="ZIMSEC and Cambridge terms"}
**Cambridge A Level only.** ZIMSEC does not examine this topic. Cambridge uses **trade receivables**, **trade payables**, **control totals** and **parallel running**. The questions apply to any business and any software.
:::

## Key definitions

:::definition{term="Data cleansing"}
Correcting or removing errors, duplicates and out-of-date records in the old data before it is transferred.
:::

:::definition{term="Control total"}
A total calculated from the data (for example the total of customer balances or the number of records) that is compared before and after the transfer to check that nothing has been lost or changed.
:::

:::definition{term="Parallel running"}
Running the old and the new systems together for a period and comparing their outputs.
:::

:::definition{term="Direct changeover"}
Stopping the old system and starting the new one on a set date.
:::

:::definition{term="Phased changeover"}
Introducing the new system one part at a time, such as the sales ledger first and then the purchases ledger.
:::

## The stages of a change-over

1. **Planning:** decide the start date (usually the beginning of a period), the data to be transferred, the roles of staff, the budget and the training.
2. **Cleansing the data:** remove duplicates and dormant accounts, correct known errors, and agree the ledgers to control accounts.
3. **Opening balances:** transfer closing balances of the old system as the opening balances of the new system; check the trial balance.
4. **Testing:** try the new system with sample data; compare results with the manual calculation.
5. **Changeover:** direct, parallel or phased.
6. **Sign-off:** the owner or manager approves the new system once the checks are satisfactory.
7. **Review:** deal with problems after the change.

## Methods of changeover

| Method | How it works | Advantages | Risks and costs |
| --- | --- | --- | --- |
| Direct | The old system stops; the new one starts at once | Cheap and quick | If the new system fails there is nothing to fall back on |
| Parallel | Both systems run together for a period | Errors in the new system are found by comparison; safe | Double the work and cost; staff may be overloaded |
| Phased | One part at a time | Problems are limited to one part; staff learn gradually | Takes longer; the two systems must exchange data in the meantime |

## Keeping the data accurate

- **Control totals:** the number of records and the total of the balances are compared before and after transfer.
- **Trial balance agreement:** the opening trial balance in the new system must balance.
- **Reconciliations:** the list of customer and supplier balances is agreed to the control accounts; the bank is reconciled.
- **Validation checks:** the software rejects data that is the wrong type, out of range or missing.
- **Verification checks:** a second person compares the imported data with the old records.
- **Testing and sign-off:** results are tested with known data; an authorised person signs that the data has been checked.

:::worked-solution[Example 1: cleansing the customer list and agreeing the control total]
Tatenda's old receivables list has nine records.

| Account | Old balance US\$ | Action |
| --- | ---: | --- |
| Mr Tapfuma | 2,450 | Keep |
| Mrs Chiweshe | 1,780 | Keep |
| Zambezi Traders | 5,920 | Keep |
| Gweru Stores | 3,140 | Keep |
| Mr Ncube | 0 | Delete: closed account with nil balance |
| Mrs Moyo | 1,250 | Keep |
| Mrs Moyo (second entry) | 1,250 | Delete: duplicate |
| Hwange Supplies | 4,380 | Keep |
| Mr Sibanda | 260 | Correct to 620: digits transposed in the old ledger |

1. The nil balance of Mr Ncube and the duplicate entry for Mrs Moyo are removed. Mr Sibanda's balance is corrected from the invoices.
2. The total changes as follows:

**Control total after cleansing**

|  | US\$ |
| --- | ---: |
| Total of old receivables list (9 records) | 20,430 |
| Less duplicate entry for Mrs Moyo | (1,250) |
| Add correction to Mr Sibanda (620 − 260) | 360 |
| Cleansed total (7 records) | 19,540 |

3. After the transfer the new system must show 7 records and a total of 19,540, which must also equal the balance on the sales ledger control account. If either figure differs, records have been lost or changed.
:::

:::worked-solution[Example 2: the opening trial balance]
After the import Tatenda's new system shows the following.

|  | Old system US\$ | New system after import US\$ |
| --- | ---: | ---: |
| Total debit balances | 142,300 | 142,300 |
| Total credit balances | 142,300 | 141,850 |
| Difference | 0 | 450 |
| Trade payables list total | 31,640 | 31,190 |

1. The old trial balance agreed. The imported credit column is 450 lower than the debit column.
2. The trade payables list is also 450 lower than before (31,190 against 31,640), so a supplier's balance of 450 was not transferred.
3. The balance is traced to the supplier "Zimplast", whose account was missed because it was filed under another name. After it is entered, both columns total 142,300 and the supplier list totals 31,640.
:::

:::worked-solution[Example 3: parallel running]
During the first month the business runs both systems.

| Output for the month | Manual system US\$ | Computerised system US\$ | Difference US\$ |
| --- | ---: | ---: | ---: |
| Credit sales | 48,250 | 48,520 | 270 |
| Credit purchases | 31,900 | 31,900 | 0 |
| Closing trade receivables | 20,150 | 20,420 | 270 |
| Closing trade payables | 14,200 | 14,200 | 0 |

1. The computerised system shows 270 more in sales and in trade receivables.
2. The difference is exactly twice 135. A credit note for 135 was entered as an invoice: instead of reducing sales and receivables by 135 it increased them by 135, a swing of 270.
3. The error is in the data entry, not in the old system. It is corrected, the clerks are retrained on credit notes, and parallel running continues for another month. The business will not move to the new system alone until the outputs agree.
:::

## Risks and costs

- **Loss or corruption of data** during the transfer.
- **Disruption:** staff time spent on cleansing, training and checking.
- **Cost:** hardware, software, consultancy, overtime, training and the running of two systems in parallel.
- **Errors carried across:** any uncorrected old error is built into the new system.
- **Resistance:** staff may fear change or lack skills.

## Common mistakes

:::mistake{title="Transferring the data without cleansing it"}
Old errors, duplicates and dormant accounts would be carried into the new system and make its reports unreliable.
:::

:::mistake{title="Treating an agreeing trial balance as the only check"}
It shows debits equal credits, but a record can be omitted from both sides. Compare control totals and agree the lists to the control accounts.
:::

:::mistake{title="Choosing a method without referring to the business"}
Direct changeover is risky for a business that cannot stop trading; parallel running is expensive for a business with few staff. Link the method to the stem.
:::

:::mistake{title="Forgetting sign-off and testing"}
The system should be tested and approved by an authorised person before the old records are put away.
:::

## Exam tips

:::exam-tip
Cambridge Paper 3 can ask you to **describe** the stages of a changeover, **explain** how data integrity is ensured, and **evaluate** a method of changeover for a business. Name the check, state what it finds and link it to an example from the stem.
:::

:::exam-tip
For **evaluate** answers, compare at least two methods against the business's size, its tolerance of risk and its cost, and then recommend one.
:::

## Summary

:::summary
- A changeover needs planning, data cleansing, opening balances, testing, the changeover itself and sign-off.
- Direct, parallel and phased changeover differ in cost, risk and speed.
- Integrity checks include control totals, trial balance agreement, reconciliations, validation, verification, testing and sign-off.
- Data must be cleansed first: duplicates, dormant accounts and known errors would otherwise be carried across.
- Parallel running finds errors by comparing outputs, but it costs time and money.
:::
