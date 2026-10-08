---
{
  "key": "ledger.closing-entries",
  "title": "Closing entries: transferring balances at the year end",
  "summary": "How income and expense balances are transferred to the income statement (statement of profit or loss) at the year end by ledger transfers and journal entries, how profit and drawings are transferred to capital, and which balances are carried down to the statement of financial position.",
  "concepts": ["acc.ledger.closing-entries"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Tendai has run a hardware shop in Gweru for a year. His ledger now holds dozens of accounts: sales, purchases, wages, rent, electricity, the shop fittings, the bank, his capital and his drawings. On 31 December he wants two answers: **did the business make a profit**, and **what is it worth now**?

The income statement answers the first question and the statement of financial position the second. But the ledger must agree with the statements. Income and expense accounts measure one year only, so at the year end their balances are **transferred** (closed off) to the income statement, and they start the new year at zero. Assets, liabilities and capital continue into the next year, so their balances are **carried down**. The entries that do this are the **closing entries**.

Examiners ask you to show an expense or income account closed off to the income statement, to write the journal entries for the transfers, or to prepare the capital account with profit and drawings. It is a short topic, but it links the ledger to the financial statements, so it appears often.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **income statement** (trading and profit and loss account), **net profit**. Cambridge 0452: **statement of profit or loss**, **profit for the year**. In the ledger the transfer is written "Income statement" (or "Statement of profit or loss"); older books write "Trading account" and "Profit and loss account".
:::

## Key definitions

:::definition{term="Closing entries"}
The year-end double entries that transfer the balances on income and expense accounts (and on drawings) to the income statement and the capital account, leaving those accounts with no balance.
:::

:::definition{term="Nominal accounts"}
Income and expense accounts. They record one financial year and are closed off to the income statement at the year end.
:::

:::definition{term="Real and personal accounts"}
Asset, liability and capital accounts. They are not closed: their balances are carried down to the next year and appear in the statement of financial position.
:::

## Which accounts are closed?

| Type of account | Year-end treatment | Where the figure appears |
| --- | --- | --- |
| Sales, returns inwards, purchases, returns outwards, carriage inwards | Transferred to the income statement (trading section) | Calculating gross profit |
| Expenses (wages, rent, electricity, carriage outwards, discount allowed) | Transferred to the income statement | Deducted from gross profit |
| Other income (rent received, commission received, discount received) | Transferred to the income statement | Added to gross profit |
| Drawings | Transferred to the capital account | Deducted from capital |
| Assets, liabilities, capital | Balanced and carried down | Statement of financial position |

The rule for the transfer is simple: **put the entry on the side that clears the balance**.

- An **expense** has a debit balance, so the account is **credited** "Income statement" and the income statement is debited.
- An **income** account has a credit balance, so it is **debited** "Income statement" and the income statement is credited.

Inventory is handled with two entries: the **opening** inventory is transferred to the income statement (credit inventory, debit income statement), and the **closing** inventory is brought into the books (debit inventory, credit income statement). The closing inventory then stays in the inventory account as an asset.

:::worked-solution[Example 1: closing Tendai's income and expense accounts]
Tendai's Hardware, year ended 31 December 2025: sales US\$48,600; purchases US\$31,250; opening inventory US\$4,200; closing inventory US\$5,150; wages US\$6,800; rent US\$3,600; electricity US\$1,150.

**Step 1: close an expense account.** Wages were paid quarterly by bank.

**Wages account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Mar | Bank | 1,700 | 31 Dec | Income statement | 6,800 |
| 30 Jun | Bank | 1,700 |  |  |  |
| 30 Sep | Bank | 1,700 |  |  |  |
| 31 Dec | Bank | 1,700 |  |  |  |
|  |  | **6,800** |  |  | **6,800** |

There is no balance to bring down: the account starts 2026 empty.

**Step 2: the journal entries for the transfers.**

**Journal**

| Date | Details | Debit US\$ | Credit US\$ |
| --- | --- | ---: | ---: |
| 31 Dec | Sales | 48,600 |  |
|  | Income statement |  | 48,600 |
|  | *Sales for the year transferred to the income statement* |  |  |
| 31 Dec | Income statement | 31,250 |  |
|  | Purchases |  | 31,250 |
|  | *Purchases for the year transferred to the income statement* |  |  |
| 31 Dec | Income statement | 11,550 |  |
|  | Wages |  | 6,800 |
|  | Rent |  | 3,600 |
|  | Electricity |  | 1,150 |
|  | *Expenses for the year transferred to the income statement* |  |  |
| 31 Dec | Income statement | 4,200 |  |
|  | Inventory |  | 4,200 |
|  | *Opening inventory transferred to the income statement* |  |  |
| 31 Dec | Inventory | 5,150 |  |
|  | Income statement |  | 5,150 |
|  | *Closing inventory brought into the books* |  |  |

**Step 3: the resulting statement.**

**Tendai's Hardware**<br>**Income statement for the year ended 31 December 2025**

|  | US\$ | US\$ |
| --- | ---: | ---: |
| Revenue |  | 48,600 |
| Less cost of sales |  |  |
| Opening inventory | 4,200 |  |
| Add purchases | 31,250 |  |
|  | 35,450 |  |
| Less closing inventory | (5,150) |  |
|  |  | (30,300) |
| **Gross profit** |  | 18,300 |
| Less expenses |  |  |
| Wages | 6,800 |  |
| Rent | 3,600 |  |
| Electricity | 1,150 |  |
|  |  | (11,550) |
| **Profit for the year** |  | 6,750 |

1. Cost of sales: $4,200 + 31,250 - 5,150 = 30,300$.
2. Gross profit: $48,600 - 30,300 = 18,300$.
3. Expenses: $6,800 + 3,600 + 1,150 = 11,550$.
4. Profit for the year (net profit): $18,300 - 11,550 = 6,750$.
:::

## Profit and drawings to capital

The profit belongs to the owner, so the final closing entries move it to the capital account:

- **Profit**: debit income statement, credit capital (a loss is the reverse: debit capital).
- **Drawings**: debit capital, credit drawings. The drawings account is then closed.

The capital account is then balanced and its balance carried down: it is the closing capital shown in the statement of financial position.

:::worked-solution[Example 2: Tendai's capital account]
Tendai's capital on 1 January 2025 was US\$22,000. Profit for the year was US\$6,750 (Example 1) and his drawings were US\$7,200.

**Journal**

| Date | Details | Debit US\$ | Credit US\$ |
| --- | --- | ---: | ---: |
| 31 Dec | Income statement | 6,750 |  |
|  | Capital |  | 6,750 |
|  | *Profit for the year transferred to capital* |  |  |
| 31 Dec | Capital | 7,200 |  |
|  | Drawings |  | 7,200 |
|  | *Drawings for the year transferred to capital* |  |  |

**Capital account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 31 Dec | Drawings | 7,200 | 1 Jan | Balance b/d | 22,000 |
| 31 Dec | Balance c/d | 21,550 | 31 Dec | Income statement (profit) | 6,750 |
|  |  | **28,750** |  |  | **28,750** |
|  |  |  | 1 Jan 2026 | Balance b/d | 21,550 |

1. Credit side: $22,000 + 6,750 = 28,750$.
2. Balance c/d: $28,750 - 7,200 = 21,550$.
3. Tendai drew out more than the profit, so his capital **fell** by US\$450 ($7,200 - 6,750$). The closing capital of US\$21,550 appears in the statement of financial position as capital US\$22,000, plus profit US\$6,750, less drawings US\$7,200.
:::

## Balances carried down

After the closing entries, the only accounts with balances are assets, liabilities and capital. These are the balances listed in the statement of financial position: non-current assets, inventory (closing), trade receivables, bank and cash, trade payables, loans and capital. They are carried down as balances b/d on 1 January and the new year begins.

Accounting software makes the closing entries automatically at the year end ("year-end close"), but the logic is the same: nominal accounts are cleared to profit, and profit is added to capital (or to retained profits in a company).

## Common mistakes

:::mistake{title="Bringing down a balance on an expense account"}
After an expense is transferred to the income statement there is no balance b/d (unless there is an accrual or prepayment, studied later). Both sides are simply totalled.
:::

:::mistake{title="Transferring drawings to the income statement"}
Drawings are not an expense of the business. They are transferred to the **capital** account, never to the income statement.
:::

:::mistake{title="Reversing the transfer"}
To close an expense (debit balance) you **credit** the expense account. Debiting it again doubles the balance instead of clearing it.
:::

## Exam tips

:::exam-tip
In the details column of the expense or income account write "Income statement" (ZIMSEC) or "Statement of profit or loss" (Cambridge), dated the last day of the financial year.
:::

:::exam-tip
Every journal entry needs a narrative. "Transfer of wages to the income statement" is enough to earn the mark.
:::

## Summary

:::summary
- At the year end, income and expense accounts are closed by transferring their balances to the income statement (statement of profit or loss).
- To close an expense, credit the expense account and debit the income statement; to close income, debit the income account and credit the income statement.
- Opening inventory is transferred to the income statement; closing inventory is debited to the inventory account.
- Profit is credited to capital; drawings are debited to capital and the drawings account is closed.
- Asset, liability and capital balances are carried down and appear in the statement of financial position.
:::
