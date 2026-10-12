// Lesson generator: partnership.accounts
import { fmt, chk, r2, table, check } from "../lib.mjs";
import { writeLesson, approTable, colLedger } from "./w2a-lib.mjs";

const biz = "Tendai and Rudo, partnership";
const when = "for the year ended 31 December 2025";
// ---- Example 1: appropriation and fixed capitals with current accounts
const profit = 38420;
const partners = [
  { name: "Tendai", salary: 6000, capital: 40000, interestOnCapitalPct: 6, drawings: 9000, interestOnDrawingsPct: 5, share: 3 },
  { name: "Rudo", salary: 0, capital: 25000, interestOnCapitalPct: 6, drawings: 7500, interestOnDrawingsPct: 5, share: 2 },
];
const A = approTable({ biz, when, profit, partners });
const L = A.calc.lines;
chk(A.residual, 29345);
chk(L[0].residualShare, 17607);
chk(L[1].residualShare, 11738);
const curOpen = [2150, -840];
const cur = colLedger(
  "Partners' current accounts",
  ["Tendai", "Rudo"],
  [["Balance b/d", null, 840], ["Interest on drawings", L[0].interestOnDrawings, L[1].interestOnDrawings], ["Drawings", 9000, 7500]],
  [["Balance b/d", 2150, null], ["Salary", 6000, null], ["Interest on capital", L[0].interestOnCapital, L[1].interestOnCapital], ["Share of residual profit", L[0].residualShare, L[1].residualShare]],
  { cdDate: "31 Dec", bdDate: "1 Jan" },
);
const closing = [r2(2150 + L[0].total - 9000), r2(-840 + L[1].total - 7500)];
chk(cur.closing[0], closing[0]);
chk(cur.closing[1], closing[1]);
const capLedger = table(
  ["Partners' funds at 31 December 2025", "Tendai", "Rudo", "Total"],
  [
    ["Capital accounts (fixed)", 40000, 25000, 65000],
    ["Current accounts", closing[0], closing[1], r2(closing[0] + closing[1])],
    ["**Total**", r2(40000 + closing[0]), r2(25000 + closing[1]), r2(65000 + closing[0] + closing[1])],
  ],
  ["l", "r", "r", "r"],
);

// ---- Example 2: fluctuating capital accounts
const profit2 = 41635;
const p2 = [
  { name: "Tendai", salary: 6000, capital: 40000, interestOnCapitalPct: 6, drawings: 9000, interestOnDrawingsPct: 0, share: 3 },
  { name: "Rudo", salary: 0, capital: 25000, interestOnCapitalPct: 6, drawings: 7500, interestOnDrawingsPct: 0, share: 2 },
];
const A2 = approTable({ biz, when, profit: profit2, partners: p2 });
const L2 = A2.calc.lines;
const cap2 = colLedger(
  "Partners' capital accounts (fluctuating)",
  ["Tendai", "Rudo"],
  [["Drawings", 9000, 7500]],
  [["Balance b/d", 40000, 25000], ["Salary", 6000, null], ["Interest on capital", L2[0].interestOnCapital, L2[1].interestOnCapital], ["Share of residual profit", L2[0].residualShare, L2[1].residualShare]],
);

// ---- Example 3: a loss after appropriations
const profit3 = 6700;
const A3 = approTable({ biz, when, profit: profit3, partners: [
  { name: "Tendai", salary: 6000, capital: 40000, interestOnCapitalPct: 6, share: 3 },
  { name: "Rudo", salary: 0, capital: 25000, interestOnCapitalPct: 6, share: 2 },
] });
chk(A3.residual, -3200);

const body = `## Introduction

Tendai and Rudo run a printing shop in Mutare as partners. They agreed that Tendai, who works full time, receives a salary, that each earns interest on the capital he or she has invested, and that the rest of the profit is shared 3 : 2. At the end of each year they need two things: an appropriation account to show how the profit is divided, and a set of partners' accounts to show how much each partner is owed or has overdrawn. The statement of financial position of the partnership then shows each partner's capital and current account separately.

This lesson covers the accounts of a continuing partnership: the appropriation account, fixed capital accounts with current accounts, fluctuating capital accounts and the statement of financial position. The written agreement and the law are in the next lesson (a Cambridge topic); changes in the partnership are in the lessons after that.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Profit and loss appropriation account | Appropriation account |
| Net profit | Profit for the year |
| Partners' current accounts; fixed capital | Partners' current accounts; capital accounts (fixed or fluctuating) |
| Income statement (trading and profit and loss account) | Statement of profit or loss |

Both boards examine salaries, interest on capital and on drawings, fixed and fluctuating capital accounts and the partnership statement of financial position. Interest on a partner's loan is an expense of the business in both.
:::

## Key definitions

:::definition{term="Appropriation account"}
The account that shows how the profit for the year of a partnership is divided between the partners: salaries, interest on capital, less interest charged on drawings, then the residual profit shared in the profit-sharing ratio.
:::

:::definition{term="Fixed capital"}
A capital account that stays at the amount invested, changing only by agreement. All profit shares, salaries, interest and drawings are recorded in each partner's separate current account.
:::

:::definition{term="Fluctuating capital"}
A capital account that is also used for profit shares, drawings and interest, so its balance changes every year. No current account is kept.
:::

:::definition{term="Residual profit"}
Profit remaining after salaries and interest have been appropriated. It is shared in the agreed ratio, and it is negative (a loss) if the appropriations exceed the profit.
:::

## The appropriation account

Work in this order. Start with the profit for the year from the statement of profit or loss. Add interest charged to partners on their drawings, because this is an additional profit for the partners as a group (it is a charge to each partner who has drawn early). Deduct partners' salaries and interest on capital. The balance is the residual profit, which you share in the ratio. Each partner's total appropriation is the sum of his or her salary, interest and share, less interest on drawings.

:::keyfact{title="Appropriation account in order"}
Profit for the year + interest on drawings - partners' salaries - interest on capital = residual profit shared in the ratio.
:::

Interest on capital is a percentage of the capital balance and interest on drawings a percentage of drawings, unless the question gives dates (then it is time apportioned). Both are agreements between the partners: neither is a cost of the business, so neither appears in the statement of profit or loss.

:::worked-solution[Example 1: appropriation and current accounts]
Tendai and Rudo share profits 3 : 2. Capital accounts are fixed at US\\$40,000 (Tendai) and US\\$25,000 (Rudo). Tendai is paid a salary of US\\$6,000. Interest on capital is 6% a year and interest on drawings is 5% of the drawings. Drawings for 2025 were US\\$9,000 (Tendai) and US\\$7,500 (Rudo). Profit for the year is US\\$38,420. Current accounts at 1 January 2025 were Tendai US\\$2,150 credit and Rudo US\\$840 debit (overdrawn).

${A.md}

${cur.md}

Residual profit is ${fmt(A.residual)}, shared ${fmt(L[0].residualShare)} to Tendai and ${fmt(L[1].residualShare)} to Rudo. The statement of financial position shows:

${capLedger}
:::

## Fixed and fluctuating capital accounts

With **fixed capital**, the capital account is untouched, and the current account shows the partner's profit share, drawings and any balance owed. A debit balance on a current account means the partner has taken out more than he or she has earned, so it is shown as a deduction within the partners' funds. With **fluctuating capital**, all the entries go through the capital account itself. The profit appropriation is exactly the same either way; only the account in which it is recorded differs.

:::worked-solution[Example 2: fluctuating capital]
Use the same partners and terms, but there is no interest on drawings, the profit is US\\$41,635 and the capital accounts fluctuate.

${A2.md}

${cap2.md}

The closing capital of Tendai is ${fmt(cap2.closing[0])} and of Rudo is ${fmt(cap2.closing[1])}. The closing balances are shown in the statement of financial position as capital.
:::

## When the profit is too small

The agreement still applies when profit is small. Salaries and interest are appropriated in full and a shortfall appears as a negative residual which is shared in the ratio, so each partner bears part of the deficit. Interest on capital and salaries are not a cost of the business, so they cannot turn the *business* profit into a loss; they only reallocate it between partners.

:::worked-solution[Example 3: residual loss]
Profit for the year is US\\$6,700. The same salary and interest on capital apply (no interest on drawings).

${A3.md}

The residual is a loss of ${fmt(-A3.residual)} shared 3 : 2, so Tendai bears ${fmt(-A3.calc.lines[0].residualShare)} and Rudo ${fmt(-A3.calc.lines[1].residualShare)}. Tendai still receives a total of ${fmt(A3.calc.lines[0].total)} and Rudo ${fmt(A3.calc.lines[1].total)}; together they add to the profit of ${fmt(profit3)}.
:::

## Common mistakes

:::mistake{title="Putting salaries and interest in the statement of profit or loss"}
Partners' salaries and interest on capital are appropriations of profit. Only interest on a partner's loan is an expense of the business.
:::

:::mistake{title="Forgetting interest on drawings is added to the profit available"}
Interest charged on drawings is a gain to the partners as a group. Add it to profit before salaries and interest on capital, and debit each partner's current account with his or her own interest.
:::

:::mistake{title="Sharing the whole profit in the ratio"}
Only the residual is shared in the ratio. Each partner's total is salary + interest on capital + share of residual - interest on drawings.
:::

:::mistake{title="Posting drawings to the capital account of a fixed capital partnership"}
Under fixed capital the drawings, salaries, interest and shares of profit all go through the current account.
:::

## Exam tips

:::exam-tip
Partnership accounts appear in ZIMSEC Paper 2 and Paper 3 and in Cambridge Papers 1 and 2 (the 15 and 30 mark questions). For *prepare an appropriation account*, show the heading, each partner's name against each item, and the residual before it is shared. For *prepare current accounts*, use the columnar format with one column per partner and bring down the balances. For *calculate*, show the interest working (for example 6% × 40,000 = 2,400).
:::

:::exam-tip
In a *comment* or *evaluate* question, point to a debit balance on a partner's current account as an overdrawn partner, and to a salary as compensation for time worked. Partnership law and the agreement are Cambridge topics.
:::

## Summary

:::summary
- The appropriation account divides profit between partners: salaries, interest on capital and drawings, then the residual in the profit-sharing ratio.
- Interest on drawings is added to profit and charged to each partner's current account; interest on capital is deducted from profit.
- With fixed capital, all appropriations and drawings go through current accounts; with fluctuating capital they go through the capital accounts.
- A debit balance on a current account means the partner has overdrawn and is shown as a deduction in the partners' funds.
- Interest on partners' loans is an expense of the business, not an appropriation.
- A residual loss is shared in the ratio; salaries and interest still apply in full.
:::
`;

writeLesson(
  "partnership/accounts.md",
  {
    key: "partnership.accounts",
    title: "Partnership accounts: appropriation, capital and current accounts",
    summary: "Prepare the appropriation account, fixed and fluctuating capital accounts, current accounts and the partners' funds in the statement of financial position of a continuing partnership.",
    concepts: ["aacc.partnership.accounts"],
    estimatedMinutes: 60,
    level: "core",
  },
  body,
);
