// Lesson generator: company.changes-in-equity
import { fmt, chk, check, r2, sum, table, company } from "../lib.mjs";
import { writeLesson, front, grid } from "./w3a-lib.mjs";
import { soce } from "./w3a-models.mjs";

const cols = ["Share capital", "Share premium", "Revaluation reserve", "General reserve", "Retained earnings"];
// Example 1
const o1 = [120000, 18000, 25000, 30000, 64200];
const profit1 = 58400, reval1 = 14000, int1 = 9600, fin1 = 14400, trf1 = 10000;
const s1 = soce({
  name: "Gokwe Cotton Ltd", when: "for the year ended 31 December 2025", cols, opening: o1, openLabel: "Balance at 1 January 2025", closeLabel: "Balance at 31 December 2025",
  events: [
    ["Profit for the year", 0, 0, 0, 0, profit1],
    ["Gain on revaluation of land", 0, 0, reval1, 0, 0],
    ["Interim dividend paid", 0, 0, 0, 0, -int1],
    ["Final dividend declared", 0, 0, 0, 0, -fin1],
    ["Transfer to general reserve", 0, 0, 0, trf1, -trf1],
  ],
});
const ret1 = r2(64200 + profit1 - int1 - fin1 - trf1); chk(ret1, 88600); chk(s1.closing[4], ret1);
chk(s1.closing[2], 39000); chk(s1.closing[3], 40000); chk(s1.total, 120000 + 18000 + 39000 + 40000 + ret1);
const eq1 = s1.total;
const eqExtract1 = grid([["Ordinary share capital", 120000], ["Share premium", 18000], ["Revaluation reserve", s1.closing[2]], ["General reserve", s1.closing[3]], ["Retained earnings", s1.closing[4]], ["**Total equity**", null, eq1]]);

// Example 2: issue at a premium and a bonus issue
const o2 = [200000, 10000, 0, 40000, 85000];
const iss = company.shareIssue({ shares: 50000, par: 1, issuePrice: 1.5 });
chk(iss.capital, 50000); chk(iss.premium, 25000); chk(iss.cash, 75000);
const profit2 = 72000, div2 = 20000;
const bonusNominal = r2((250000 * 1) / 5); chk(bonusNominal, 50000);
const premAvail = r2(10000 + iss.premium); chk(premAvail, 35000);
const fromRet = r2(bonusNominal - premAvail); chk(fromRet, 15000);
const s2 = soce({
  name: "Shurugwi Quarry Ltd", when: "for the year ended 31 December 2025", cols, opening: o2, openLabel: "Balance at 1 January 2025", closeLabel: "Balance at 31 December 2025",
  events: [
    ["Profit for the year", 0, 0, 0, 0, profit2],
    ["Dividend paid", 0, 0, 0, 0, -div2],
    ["Issue of 50,000 shares at US\\$1.50", iss.capital, iss.premium, 0, 0, 0],
    ["Bonus issue of 1 share for every 5 held", bonusNominal, -premAvail, 0, 0, -fromRet],
  ],
});
chk(s2.closing[0], 300000); chk(s2.closing[1], 0); chk(s2.closing[4], r2(85000 + 72000 - 20000 - 15000));
const tot2 = s2.total; chk(tot2, 300000 + 0 + 0 + 40000 + 122000);

const body = `## Introduction

Gokwe Cotton Ltd earned a good profit, paid two dividends, revalued its land and moved some profit to a reserve. A shareholder who reads only the statement of profit or loss sees none of this. The **statement of changes in equity** gathers every movement in the owners' interest in one place, so that the opening equity can be traced to the closing equity in the statement of financial position.

You should know the five components of equity: share capital, share premium, the revaluation reserve, the general reserve and retained earnings. Here you learn how each changes and how to lay out the columns. Companies issue shares in the next topic. This lesson uses only one issue and one bonus issue as examples.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Statement of changes in equity; reserves note | Statement of changes in equity |
| Retained profits; profit and loss account balance | Retained earnings |
| Revaluation surplus; capital reserve | Revaluation reserve |
| Proposed dividend (shown when the question gives it) | Final dividend declared (a liability only if declared before the year end) |
:::

## Key definitions

:::definition{term="Equity"}
The residual interest of the owners in the company: share capital plus all reserves. Equals total assets minus total liabilities.
:::

:::definition{term="Statement of changes in equity"}
A columnar statement showing, for each component of equity, the opening balance, each movement in the year and the closing balance.
:::

:::definition{term="Reserve"}
A part of equity that is not share capital. Capital reserves (share premium and revaluation reserve) cannot be paid out as dividends. Revenue reserves (general reserve, retained earnings) can.
:::

:::definition{term="Bonus issue"}
An issue of new shares to existing shareholders, free of charge, paid up out of reserves. It changes the form of equity but brings in no cash.
:::

## Layout and the usual events

Draw one column for each component and a total column. Start with the opening balances. Add one row for each event, entering the amount in the column it changes and showing a minus sign for deductions. At the end add each column down to get the closing balance.

| Event | Column affected |
| --- | --- |
| Profit for the year | Retained earnings (+) |
| Revaluation gain | Revaluation reserve (+) |
| Dividends paid or declared | Retained earnings (-) |
| Transfer to general reserve | General reserve (+), retained earnings (-) |
| Issue of shares for cash | Share capital (nominal value), share premium (the excess) |
| Bonus issue | Share capital (+), share premium or retained earnings (-) |

A transfer between reserves leaves total equity unchanged; its total is nil. A bonus issue also leaves the total unchanged. A share issue for cash increases it by the cash received. The closing column totals must equal the equity in the statement of financial position, which is the check you should always make.

:::worked-solution[Example 1: profit, revaluation, dividends and a transfer]
Gokwe Cotton Ltd has 120,000 ordinary shares of US\\$1 each. Its equity at 1 January 2025 was: share premium US\\$${fmt(18000)}, revaluation reserve US\\$${fmt(25000)}, general reserve US\\$${fmt(30000)} and retained earnings US\\$${fmt(64200)}. In 2025 profit for the year was US\\$${fmt(profit1)}, land was revalued upwards by US\\$${fmt(reval1)}, an interim dividend of US\\$${fmt(int1)} was paid, a final dividend of US\\$${fmt(fin1)} was declared before the year end and US\\$${fmt(trf1)} was transferred to the general reserve. Prepare the statement of changes in equity.

1. Revaluation reserve: ${fmt(25000)} + ${fmt(reval1)} = ${fmt(s1.closing[2])}.
2. General reserve: ${fmt(30000)} + ${fmt(trf1)} = ${fmt(s1.closing[3])}.
3. Retained earnings: ${fmt(64200)} + ${fmt(profit1)} - ${fmt(int1)} - ${fmt(fin1)} - ${fmt(trf1)} = ${fmt(ret1)}.

${s1.md}

Check: the equity section of the statement of financial position agrees.

${eqExtract1}
:::

## Issues of shares and bonus issues

When shares are issued for cash at more than their nominal value, share capital increases by the nominal value and share premium by the excess. A bonus issue pays up new shares from reserves. The reserves that may be used are share premium, the general reserve and retained earnings (do not use the revaluation reserve for a bonus issue in questions of this course). The share premium is normally used first.

:::worked-solution[Example 2: a share issue and a bonus issue]
Shurugwi Quarry Ltd began 2025 with 200,000 ordinary shares of US\\$1. Its equity was: share premium US\\$${fmt(10000)}, general reserve US\\$${fmt(40000)} and retained earnings US\\$${fmt(85000)}. During the year it issued 50,000 shares at US\\$1.50 for cash. It then made a bonus issue of 1 share for every 5 held, using the share premium first and retained earnings for the rest. Profit for the year was US\\$${fmt(profit2)} and a dividend of US\\$${fmt(div2)} was paid. Prepare the statement of changes in equity.

1. Issue: share capital 50,000 × US\\$1 = ${fmt(iss.capital)}; share premium 50,000 × US\\$0.50 = ${fmt(iss.premium)}; cash received ${fmt(iss.cash)}.
2. Shares in issue before the bonus: 250,000. Bonus shares: 250,000 ÷ 5 = 50,000 shares, nominal value ${fmt(bonusNominal)}.
3. Share premium available: ${fmt(10000)} + ${fmt(iss.premium)} = ${fmt(premAvail)}. The balance of ${fmt(bonusNominal)} - ${fmt(premAvail)} = ${fmt(fromRet)} comes from retained earnings.
4. Retained earnings: ${fmt(85000)} + ${fmt(profit2)} - ${fmt(div2)} - ${fmt(fromRet)} = ${fmt(s2.closing[4])}.

${s2.md}

Total equity rises from ${fmt(sum(o2))} to ${fmt(tot2)}. The increase of ${fmt(r2(tot2 - sum(o2)))} is profit ${fmt(profit2)} less the dividend ${fmt(div2)} plus the cash raised ${fmt(iss.cash)}. The bonus issue added nothing to the total.
:::

## Reading the statement

The statement shows how the owners' wealth has changed and why. If retained earnings grow while dividends are modest, the company is financing itself from its own profit. A large revaluation reserve warns that part of equity rests on a valuation, not on trading. A fall in total equity, after a loss or a heavy dividend, deserves an explanation. The statement also explains differences that puzzle students: for example, why total comprehensive income is not the same as the change in retained earnings.

## Common mistakes

:::mistake{title="Deducting dividends from profit for the year"}
Profit for the year is a measure for the statement of profit or loss. Dividends reduce retained earnings in this statement.
:::

:::mistake{title="Putting a revaluation gain into retained earnings"}
The gain is credited to the revaluation reserve. It is unrealised and cannot be paid out as dividends.
:::

:::mistake{title="Forgetting that a transfer has two sides"}
A transfer to the general reserve increases one column and decreases retained earnings by the same amount, so the total column does not change.
:::

:::mistake{title="Adding a bonus issue to total equity"}
A bonus issue brings in no cash. Share capital rises and reserves fall by the same amount.
:::

:::mistake{title="Using a negative closing balance without checking"}
Retained earnings must be positive for dividends to be paid from it. Recheck the signs if a column goes negative.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Papers 2 and 3 and in Cambridge Papers 1, 2 and 3. For *prepare*, draw the columns first, label every row and total each column. For *reconcile* or *calculate closing equity*, start from the opening total and add profit, gains and issues and deduct dividends. For *explain*, say what each reserve is for and whether it can be distributed.
:::

:::exam-tip
Always compare the closing total with the equity in the statement of financial position. If they differ, the usual cause is a dividend entered with the wrong sign or a missed transfer.
:::

## Summary

:::summary
- The statement of changes in equity has one column for each component of equity and a total column.
- Profit adds to retained earnings; dividends deduct from retained earnings; a revaluation gain adds to the revaluation reserve.
- A transfer between reserves and a bonus issue leave total equity unchanged; a cash share issue increases it.
- An issue above par credits share capital with the nominal value and share premium with the excess.
- The closing totals must equal the equity shown in the statement of financial position.
:::
`;
writeLesson("company/changes-in-equity.md", front("company.changes-in-equity", "Statement of changes in equity", "Prepare the columnar statement of changes in equity from opening balances, profit, dividends, revaluation, transfers, share issues and bonus issues, and reconcile it to the statement of financial position.", ["aacc.company.changes-in-equity"], 55), body);
