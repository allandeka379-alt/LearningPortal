// Lesson generator: partnership.mid-year-changes
import { fmt, chk, check, r2, table, sum, appropriation, goodwill } from "../lib.mjs";
import { writeLesson, colLedger } from "./w2a-lib.mjs";

// Year ended 31 December 2026. Farai admitted on 1 October 2026 (9 months old terms, 3 months new terms).
const profitYear = 60000;
const p1 = r2((profitYear * 9) / 12);
const p2 = r2((profitYear * 3) / 12);
chk(p1, 45000);
chk(p2, 15000);
const A1 = appropriation({ profit: p1, partners: [
  { name: "Tendai", salary: r2((6000 * 9) / 12), capital: 48000 * 0.75, interestOnCapitalPct: 5, share: 3 },
  { name: "Rudo", capital: 32000 * 0.75, interestOnCapitalPct: 5, share: 2 },
] });
// interest on capital for 9 months: 5% of capital x 9/12 (modelled by scaling capital by 9/12)
chk(A1.lines[0].interestOnCapital, 1800);
chk(A1.lines[1].interestOnCapital, 1200);
chk(A1.residual, 37500);
const A2 = appropriation({ profit: p2, partners: [
  { name: "Tendai", salary: r2((8000 * 3) / 12), capital: 48000 * 0.25, interestOnCapitalPct: 5, share: 2 },
  { name: "Rudo", capital: 32000 * 0.25, interestOnCapitalPct: 5, share: 2 },
  { name: "Farai", capital: 24000 * 0.25, interestOnCapitalPct: 5, share: 1 },
] });
chk(A2.lines[0].interestOnCapital, 600);
chk(A2.lines[1].interestOnCapital, 400);
chk(A2.lines[2].interestOnCapital, 300);
chk(A2.residual, 11700);
const L1 = A1.lines;
const L2 = A2.lines;
const tot = [r2(L1[0].total + L2[0].total), r2(L1[1].total + L2[1].total), r2(L2[2].total)];
check("total", sum(tot), profitYear);
const T = (a) => (a === undefined || a === null ? "" : a);
const appro = table(
  ["Appropriation account, year ended 31 December 2026", "1 Jan to 30 Sep (9 months)", "1 Oct to 31 Dec (3 months)", "Year"],
  [
    ["**Profit for the year (accrues evenly)**", p1, p2, profitYear],
    ["Salary: Tendai (6,000 then 8,000 a year)", L1[0].salary, L2[0].salary, r2(L1[0].salary + L2[0].salary)],
    ["Interest on capital: Tendai", L1[0].interestOnCapital, L2[0].interestOnCapital, r2(L1[0].interestOnCapital + L2[0].interestOnCapital)],
    ["Interest on capital: Rudo", L1[1].interestOnCapital, L2[1].interestOnCapital, r2(L1[1].interestOnCapital + L2[1].interestOnCapital)],
    ["Interest on capital: Farai", "", L2[2].interestOnCapital, L2[2].interestOnCapital],
    ["**Residual profit**", A1.residual, A2.residual, r2(A1.residual + A2.residual)],
    ["Share: Tendai (3/5 then 2/5)", L1[0].residualShare, L2[0].residualShare, r2(L1[0].residualShare + L2[0].residualShare)],
    ["Share: Rudo (2/5 then 2/5)", L1[1].residualShare, L2[1].residualShare, r2(L1[1].residualShare + L2[1].residualShare)],
    ["Share: Farai (1/5)", "", L2[2].residualShare, L2[2].residualShare],
    ["**Total to Tendai**", L1[0].total, L2[0].total, tot[0]],
    ["**Total to Rudo**", L1[1].total, L2[1].total, tot[1]],
    ["**Total to Farai**", "", L2[2].total, tot[2]],
  ],
  ["l", "r", "r", "r"],
);

// ---- Example 2: goodwill at 1 October and current accounts for the year
const gw = 25000;
const gs = goodwill.gainSacrifice([3, 2, 0], [2, 2, 1]);
chk(gs[2], 0.2, 1e-9);
const cur = colLedger(
  "Partners' current accounts (capital accounts are fixed)",
  ["Tendai", "Rudo", "Farai"],
  [["Goodwill eliminated 1 Oct (2 : 2 : 1)", r2(gw * 0.4), r2(gw * 0.4), r2(gw * 0.2)], ["Drawings", 9000, 7200, 1500]],
  [["Balance b/d", 2300, 1140, null], ["Goodwill created 1 Oct (3 : 2)", r2(gw * 0.6), r2(gw * 0.4), null], ["Share of profit for the year", tot[0], tot[1], tot[2]]],
  { cdDate: "31 Dec", bdDate: "1 Jan" },
);
const fixed = [48000, 32000, 24000];
const funds = fixed.map((c, i) => r2(c + cur.closing[i]));
const sfp = table(
  ["Partners' funds at 31 December 2026", "Tendai", "Rudo", "Farai", "Total"],
  [
    ["Capital accounts (fixed)", 48000, 32000, 24000, 104000],
    ["Current accounts", cur.closing[0], cur.closing[1], cur.closing[2], sum(cur.closing)],
    ["**Total**", funds[0], funds[1], funds[2], sum(funds)],
  ],
  ["l", "r", "r", "r", "r"],
);

const body = `## Introduction

Tendai and Rudo's business in Mutare earns profit all year round, but a new partner, Farai, is admitted on 1 October. Until then the two founders share profits 3 : 2 and Tendai receives a salary of US\\$6,000 a year; from 1 October the profits are shared 2 : 2 : 1 and Tendai's salary rises. The year-end statements cover the whole year, so the profit must be divided into two periods and the appropriation account must apply the right terms to each.

This lesson shows how to time-apportion profit, salaries and interest, how to prepare the appropriation account for a year with a change, how to treat goodwill, revaluation and drawings at the date of the change, and how to complete the current accounts. It builds on the previous three partnership lessons.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Time apportionment of profit | Time apportionment of profit |
| Appropriation account for two periods | Appropriation account for two periods |
| Net book value | Carrying amount |

Both boards examine changes during the year (ZIMSEC in Form 5; Cambridge at A Level only). Read the dates carefully: the number of months in each period decides every figure.
:::

## Key definitions

:::definition{term="Time apportionment"}
Dividing a figure for the year between periods in proportion to the months (or days) in each. Profit is apportioned this way unless the question gives separate figures for each period.
:::

:::definition{term="Change date"}
The day on which a partner joins or leaves or the profit-sharing terms change. The terms before it apply to the earlier period and the terms after it to the later period.
:::

## Method

1. **Draw a time line.** For a change on 1 October in a year ending 31 December, the periods are nine and three months. For 1 March they are two and ten months.
2. **Apportion the profit** by months, unless the question says profit was earned unevenly or gives profit for each period.
3. **Apportion salaries and interest on capital** for each period, using the terms and the capital balances that applied in it. Interest on a new partner's capital is for the months after joining only.
4. **Prepare the appropriation account in two columns**, one for each period, with the residual shared in the ratio that applied in it.
5. **Total each partner's share** for the year for the current accounts.
6. **Deal with goodwill and revaluation at the change date**, as in the earlier lessons, through the current or capital accounts.
7. **Record drawings** for the whole year (or the amounts given for each period).

:::worked-solution[Example 1: the appropriation account for two periods]
Tendai and Rudo share profits 3 : 2. Tendai receives a salary of US\\$6,000 a year. Capitals are fixed at US\\$48,000 (Tendai) and US\\$32,000 (Rudo); interest on capital is 5% a year. On 1 October 2026 Farai is admitted with capital of US\\$24,000. From that date profits are shared Tendai 2, Rudo 2, Farai 1; Tendai's salary rises to US\\$8,000 a year and interest on capital remains 5%. Profit for the year ended 31 December 2026 is US\\$60,000, earned evenly through the year.

Periods: 9 months (1 January to 30 September) and 3 months (1 October to 31 December). Profit: 9/12 × 60,000 = ${fmt(p1)}; 3/12 × 60,000 = ${fmt(p2)}.

Period 1: salary 6,000 × 9/12 = 4,500; interest 5% × 48,000 × 9/12 = ${fmt(L1[0].interestOnCapital)} and 5% × 32,000 × 9/12 = ${fmt(L1[1].interestOnCapital)}.

Period 2: salary 8,000 × 3/12 = 2,000; interest 5% × 48,000 × 3/12 = ${fmt(L2[0].interestOnCapital)}, 5% × 32,000 × 3/12 = ${fmt(L2[1].interestOnCapital)} and 5% × 24,000 × 3/12 = ${fmt(L2[2].interestOnCapital)}.

${appro}

The three totals agree with the profit: ${fmt(tot[0])} + ${fmt(tot[1])} + ${fmt(tot[2])} = ${fmt(profitYear)}.
:::

## Goodwill, revaluation and drawings at the change date

Goodwill and revaluation are recorded on the date of the change, in the same way as for any admission or retirement. When capital accounts are fixed, the entries are made in the current accounts. The interest on drawings, if any, and drawings are charged for the whole year unless the question allocates them between the two periods.

:::worked-solution[Example 2: current accounts for the year]
Continuing Example 1, goodwill of US\\$${fmt(gw)} is created on 1 October (3 : 2) and eliminated (2 : 2 : 1) through the current accounts. Drawings for the year are Tendai US\\$9,000, Rudo US\\$7,200 and Farai US\\$1,500. Opening current account balances were Tendai US\\$2,300 credit and Rudo US\\$1,140 credit.

${cur.md}

Farai's current account has a debit balance of ${fmt(-cur.closing[2])} (he is overdrawn) after bearing 1/5 of the goodwill (${fmt(gw * 0.2)}). Tendai's net goodwill gain is ${fmt(r2(gw * 0.6 - gw * 0.4))}, which is his sacrifice of 1/5 × ${fmt(gw)}.

${sfp}
:::

## When the question gives separate profits

Sometimes the question states profit to the change date and profit after it, or says that sales were seasonal so that profit was not even. In that case use the figures given for each period. If only the total is given and the business is seasonal, state your assumption that profit accrued evenly. Always show the apportionment as a separate line of working.

## Common mistakes

:::mistake{title="Using the year's figures for the new partner"}
Interest on capital and the share of profit for a partner who joins on 1 October are for three months only, not twelve.
:::

:::mistake{title="Apportioning salaries by the wrong number of months"}
Count the months from the dates: 1 October to 31 December is three months. A salary of US\\$8,000 a year is 2,000 for the period.
:::

:::mistake{title="Using the old ratio for the whole residual"}
Share each period's residual in the ratio that applied during it. Do not combine the residuals before sharing.
:::

:::mistake{title="Forgetting drawings or goodwill in the current accounts"}
Drawings for the year and the goodwill entries at the change date both go through the current accounts.
:::

## Exam tips

:::exam-tip
Mid-year changes appear in ZIMSEC Paper 2 and Paper 3 and Cambridge Paper 3 (A Level). Draw a time line first and show the apportionment as a visible working line, because mark schemes award marks for the months and the apportioned amounts. For *prepare the appropriation account*, use two columns with the dates in the headings. For *calculate* a partner's total, add the two periods.
:::

:::exam-tip
State your assumption that profit accrued evenly when the question does not say otherwise. This earns a mark and protects your working.
:::

## Summary

:::summary
- Apportion profit, salaries and interest on capital by the months before and after the change.
- Prepare a two-column appropriation account, applying the terms and ratio of each period.
- A new partner's interest and profit share run only from the date of admission.
- Goodwill, revaluation and cash are recorded at the change date; with fixed capitals the entries go through the current accounts.
- Total each partner's share for the year and complete the current accounts with drawings.
- Always check that the partners' totals equal the profit for the year.
:::
`;

writeLesson(
  "partnership/mid-year-changes.md",
  {
    key: "partnership.mid-year-changes",
    title: "Partnership changes part-way through the accounting year",
    summary: "Time-apportion profit, salaries and interest on capital, prepare a two-period appropriation account and current accounts for a partnership that changes during the year, and show the partners' funds at the year end.",
    concepts: ["aacc.partnership.mid-year-changes"],
    estimatedMinutes: 55,
    level: "core",
  },
  body,
);
