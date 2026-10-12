// Lesson: ledger.trial-balance
import { t, money, fmt, check, chk, r2, sum, tAccount, trialBalance, table, balanceOf } from "../lib.mjs";
import { writeLesson, U } from "./w1b-lib.mjs";

// Example 1: ledger accounts balanced off, then the trial balance (tuck shop in Masvingo)
const rentDr = [["1 Apr", "Bank", 1200], ["1 Oct", "Bank", 1200]];
const rentAcc = tAccount("Rent account", rentDr, [], { cdDate: "31 Dec", bdDate: "1 Jan", cd: "Balance c/d" });
const salesCr = [["31 Dec", "Total of sales journal for the year", 62400]];
const bankDr = [["1 Jan", "Balance b/d", 5380]];
const payCr = [["1 Jan", "Balance b/d", 4120]];
const payAcc = tAccount("Trade payables control account", [["31 Dec", "Payments to suppliers", 38200], ["31 Dec", "Returns outwards", 500]],
  [["1 Jan", "Balance b/d", 3920], ["31 Dec", "Credit purchases", 38900]], { cdDate: "31 Dec", bdDate: "1 Jan", cd: "Balance c/d" });
const payBal = balanceOf([["", "", 38200], ["", "", 500]], [["", "", 3920], ["", "", 38900]]);
check("payables balance", payBal.amount, 4120);

const dr1 = [
  ["Shop equipment", 6800], ["Motor van", 9500], ["Inventory at 1 January 2025", 2900], ["Purchases", 41300], ["Returns inwards", 700],
  ["Carriage inwards", 450], ["Wages", 7600], ["Rent", 2400], ["Electricity", 1350], ["Discount allowed", 280],
  ["Trade receivables", 3850], ["Bank", 5380], ["Cash", 420], ["Drawings", 4200],
];
const cr1other = [["Sales", 62400], ["Returns outwards", 500], ["Discount received", 360], ["Trade payables", 4120], ["Loan from Tendai Moyo", 8000]];
const drTotal1 = sum(dr1.map((x) => x[1]));
const capital1 = r2(drTotal1 - sum(cr1other.map((x) => x[1])));
const tb1 = trialBalance("Tatenda's tuck shop: trial balance at 31 December 2025", [
  ...dr1.map(([a, d]) => [a, d, null]), ...cr1other.map(([a, c]) => [a, null, c]), ["Capital", null, capital1],
]);

// Example 2: classification of unusual balances
const rows2 = [
  ["Bank overdraft", null, 2150], ["Provision for depreciation: vehicles", null, 6300], ["Allowance for irrecoverable debts", null, 410],
  ["Rent received", null, 1800], ["Interest on loan", 640, null], ["Premises", 40000, null], ["Motor vehicles at cost", 21000, null], ["Trade receivables", 7260, null],
  ["Inventory at 1 January 2025", 4800, null], ["Sales", null, 58300], ["Purchases", 33400, null], ["Wages and salaries", 9100, null],
  ["Trade payables", null, 5210], ["Drawings", 3900, null], ["Loan from DevBank", null, 10000],
];
const dr2 = sum(rows2.map((r) => r[1])), cr2other = sum(rows2.map((r) => r[2]));
const cap2 = r2(dr2 - cr2other);
const tb2 = trialBalance("Rudo's electrical shop: trial balance at 31 December 2025", [...rows2, ["Capital", null, cap2]]);

// Example 3: finding a difference
const trueTotal = 96240;
const drawn = trueTotal - 90;
const diff3 = trueTotal - drawn;

const body = t`
## Introduction

Tatenda runs a tuck shop in Masvingo. At the end of the year his bookkeeper has hundreds of entries in the ledger. Before anyone prepares a profit statement, the balance on every account is listed in two columns. If the debit column and the credit column agree, the double entry is arithmetically consistent; if they do not, something is wrong and must be found.

The trial balance is the bridge between the ledger and the final accounts, so it appears in almost every ZIMSEC Paper 2 and Paper 3 question and in Cambridge Papers 1 and 2. You should already know double entry and how to balance an account.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **debtors/receivables**, **creditors/payables**, **books of original entry**. Cambridge: **trade receivables**, **trade payables**, **books of prime entry**. Both boards use the same trial balance layout. Statements of profit or loss are prepared from the trial balance after adjustments.
:::

## Key definitions

:::definition{term="Trial balance"}
A list of all the ledger account balances at a given date, in a debit column and a credit column, prepared to check that total debits equal total credits.
:::

:::definition{term="Balance of an account"}
The difference between the totals of the debit and credit sides. A larger debit side gives a debit balance; a larger credit side gives a credit balance.
:::

:::definition{term="Casting"}
Adding up the entries in a column.
:::

## Which balances go where

A balance is listed on the side on which it falls in the ledger.

| Debit column | Credit column |
| --- | --- |
| Assets: premises, equipment, vehicles, inventory, trade receivables, bank and cash (when in hand) | Capital |
| Expenses: wages, rent, electricity, discount allowed, interest paid | Liabilities: trade payables, loans, bank overdraft |
| Purchases, returns inwards, carriage inwards | Sales, returns outwards |
| Drawings | Income: rent received, discount received, interest received |
| | Provisions and allowances: provision for depreciation, allowance for irrecoverable debts |

A quick rule: balances that increase with a debit entry are in the debit column. Provision accounts look like assets but are credit balances because they reduce assets. Drawings reduce capital but are a debit balance because they are recorded with a debit.

## Preparing a trial balance

1. List the accounts and their balances. Balance off each account first.
2. Place each balance in the correct column, using the table above.
3. Add up each column carefully, and compare the totals.
4. The closing balance of the cash book is a debit if cash and bank are in hand, and a credit if the bank is overdrawn.

:::worked-solution[Example 1: trial balance from ledger balances]
Tatenda's accounts are balanced at 31 December 2025. Rent was paid in two instalments of 1,200 (shown in the rent account below); the sales account has a credit total of 62,400; the trade payables control account is shown below.

${rentAcc}

${payAcc}

The remaining balances were taken from the ledger and listed. Capital is the balance on the owner's account.

${tb1.md}

The two columns agree at ${money(tb1.debit)}. This shows that debits equal credits in the ledger but does not prove that every entry is correct.
:::

:::worked-solution[Example 2: unusual balances in Rudo's trial balance]
Rudo's electrical shop in Harare has these balances at 31 December 2025. Provision accounts, allowances, a bank overdraft, income and a loan from a bank are all credit balances, while drawings and interest paid are debit balances.

${tb2.md}

Rudo's capital balance (${money(cap2)}) completes the credit column. If a business has an overdraft, the bank is shown as a credit balance, not a debit.
:::

## What a trial balance proves, and what it does not

**It shows** that, for the balances listed, total debits equal total credits. It provides the figures for the statement of profit or loss and the statement of financial position, and it gives a first check on the arithmetic of the books.

**It does not show** that every transaction has been recorded, that entries are in the right accounts, or that the amounts are right. These errors leave the totals equal:

- an entry left out completely (omission);
- an entry in the wrong account of the same class (commission);
- an entry that breaks an accounting rule, such as treating a capital item as an expense (principle);
- the wrong amount entered on both sides (original entry);
- the debit and credit sides swapped (reversal);
- two errors that cancel (compensating).

The errors are classified and corrected in the lesson on errors and the suspense account.

## Finding a difference

If the columns do not agree, look for the cause in order:

1. Re-add both columns.
2. Check that every ledger balance was copied to the right column. If the difference is **twice** a balance, that balance may be in the wrong column.
3. Check that no balance has been left out. If the difference equals a balance, check that one.
4. If the difference is divisible by 9, two digits may have been transposed (for example 4,580 written as 4,850, a difference of 270).
5. A difference of 10, 100 or 1,000 suggests an addition mistake.
6. If the difference cannot be found, the trial balance is completed by putting the difference in a suspense account and the search continues.

:::worked-solution[Example 3: locating a difference]
A trial balance prepared for a hardware shop in Bulawayo shows a debit total of US\$${fmt(drawn)} and a credit total of US\$${fmt(trueTotal)}.

1. Difference: ${fmt(trueTotal)} − ${fmt(drawn)} = ${fmt(diff3)}, with credits higher than debits.
2. ${fmt(diff3)} is divisible by 9 (90 ÷ 9 = 10), so a transposition is possible.
3. The bookkeeper checks the larger debit balances and finds that purchases of 18,430 were copied as 18,340. The correct debit figure is 90 higher, which removes the difference.
4. The columns now agree at US\$${fmt(trueTotal)}.
:::

## From trial balance to final accounts

The statement of profit or loss takes income and expenses (sales, purchases, returns, wages, rent and so on) and the statement of financial position takes assets, liabilities and capital. Adjustments such as depreciation, accruals and closing inventory are made first, so the trial balance figures are not always the final figures.

## Common mistakes

:::mistake{title="Putting a bank overdraft or a provision in the debit column"}
Both are credit balances. A provision reduces an asset, and an overdraft is a liability.
:::

:::mistake{title="Treating an agreeing trial balance as proof of accuracy"}
The totals can agree even when entries are omitted, in the wrong account or reversed. Always say what the trial balance does not detect.
:::

:::mistake{title="Listing the opening balance of capital but not drawings"}
Capital is a credit balance and drawings are a debit balance; both must be listed.
:::

:::mistake{title="Adding rather than comparing the columns"}
The two totals are compared, not added together. If they differ, find the difference and its probable cause.
:::

## Exam tips

:::exam-tip
In ZIMSEC Papers 2 and 3 and Cambridge Papers 1 and 2, the trial balance is the data for the whole question. Read the list once, mark each item D or C before you write the statements, and tick each item off as it is used.
:::

:::exam-tip
With **state** or **explain** questions on limitations, name the types of error that do not affect the totals and give one example. With **calculate** questions on a difference, state whether debits or credits are higher and show the working.
:::

## Summary

:::summary
- A trial balance lists every ledger balance in a debit column and a credit column; the totals should agree.
- Assets, expenses, purchases, returns inwards and drawings are debits; capital, liabilities, income, sales, returns outwards and provisions are credits.
- An agreeing trial balance shows arithmetic accuracy only; many errors leave it unaffected.
- A difference of twice a balance suggests the wrong column; a difference equal to a balance suggests an omission; a difference divisible by 9 suggests a transposition.
- The trial balance is the starting point for the statement of profit or loss and statement of financial position.
:::
`;

writeLesson("ledger/trial-balance", {
  key: "ledger.trial-balance",
  title: "The trial balance: preparation, purpose and limitations",
  summary: "List ledger balances in debit and credit columns, understand what an agreeing trial balance does and does not prove, and learn how to track down a difference.",
  concepts: ["aacc.ledger.trial-balance"],
  estimatedMinutes: 35,
}, body);
