// Lesson generator: departmental.statements
import { fmt, chk, check, r2, sum, table } from "../lib.mjs";
import { writeLesson, front, grid, heading } from "./w3a-lib.mjs";
import { deptModel } from "./w3a-models.mjs";

export const d1 = {
  name: "Chipo's Mart", year: 2025,
  depts: [
    { name: "Groceries", sales: 168000, openInv: 12400, purchases: 112900, closeInv: 13800, direct: [{ label: "Departmental wages", amt: 14200 }] },
    { name: "Hardware", sales: 96000, openInv: 21500, purchases: 54300, closeInv: 23100, direct: [{ label: "Departmental wages", amt: 9800 }] },
    { name: "Stationery", sales: 41000, openInv: 6100, purchases: 27600, closeInv: 5900, direct: [{ label: "Departmental wages", amt: 6300 }] },
  ],
  common: [
    { label: "Rent", total: 18000, basis: "floor", basisText: "Floor area (150 : 90 : 60 m²)", shares: [150, 90, 60] },
    { label: "Lighting and heating", total: 4500, basis: "floor", basisText: "Floor area", shares: [150, 90, 60] },
    { label: "General wages", total: 21000, basis: "staff", basisText: "Staff (4 : 2 : 1)", shares: [4, 2, 1] },
    { label: "Advertising", total: 6100, basis: "sales" },
    { label: "Depreciation", total: 8400, basis: "assets", basisText: "Asset values (30,000 : 25,000 : 5,000)", shares: [30000, 25000, 5000] },
  ],
  income: [{ label: "Commission received", total: 3050, basis: "sales" }],
};
export const m = deptModel(d1);
chk(m.dep[0].gp, 56500); chk(m.dep[1].gp, 43300); chk(m.dep[2].gp, 13200);
chk(m.net[0], 13170); chk(m.net[1], 16290); chk(m.net[2], -1710);
const totalNet = sum(m.net); chk(totalNet, 27750);
const pctG = d1.depts.map((x, i) => `${(Math.round((m.dep[i].gp / m.dep[i].revenue) * 1000) / 10).toFixed(1)}%`);

// statement of financial position of the whole business
const ppe = 98000, rec = 14200, bank = 9800, pay = 13600, drawings = 18000;
const inv = r2(sum(d1.depts.map((x) => x.closeInv)));
const assets = r2(ppe + inv + rec + bank);
const netAssets = r2(assets - pay);
const capOpen = r2(netAssets - totalNet + drawings);
const capClose = r2(capOpen + totalNet - drawings);
check("sofp", capClose, netAssets);
chk(capOpen, 141450);
const sofp = heading("Chipo's Mart", "Statement of financial position", "at 31 December 2025") + "\n\n" + grid([
  ["**Non-current assets**"], ["Premises and equipment at carrying amount", null, ppe],
  ["**Current assets**"], ["Inventory (all departments)", inv], ["Trade receivables", rec], ["Bank", bank], ["Total current assets", null, r2(inv + rec + bank)],
  ["**Total assets**", null, assets],
  null,
  ["**Capital**"], ["Capital at start of year", capOpen], ["Add: net profit for the year", totalNet], ["Less: drawings", -drawings], ["Closing capital", null, capClose],
  ["**Current liabilities**"], ["Trade payables", null, pay],
  ["**Total capital and liabilities**", null, r2(capClose + pay)],
]);

// closure
const contribution = r2(m.dep[2].gp + m.income[0].parts[2] - 6300); chk(contribution, 7310);
const profitAfter = r2(totalNet - contribution); chk(profitAfter, 20440);
const closeTable = table(["Effect of closing stationery", "US\\$"], [["Gross profit lost", m.dep[2].gp], ["Commission received lost", m.income[0].parts[2]], ["Departmental wages saved", -6300], ["**Fall in total net profit**", contribution], ["Total net profit now", totalNet], ["**Total net profit after closure**", profitAfter]]);
const rentStat = m.common[0].parts[2];

const body = `## Introduction

Chipo's Mart in Mutare sells groceries, hardware and stationery under one roof. The overall profit looks healthy, but Chipo wants to know which department makes it. A **departmental statement of profit or loss** has a column for each department and a total column, so that gross profit and net profit can be compared. The statement of financial position is prepared for the business as a whole.

This lesson builds on the apportionment of common expenses. You need the bases (floor area, staff, sales, assets) and the idea that a department's own costs are allocated to it. Departmental accounts are a **ZIMSEC Form 5** topic only. Cambridge does not examine them.

:::keyfact{title="Who needs this lesson"}
| Board | Status |
| --- | --- |
| ZIMSEC | Form 5: departmental trading and profit and loss columns, evaluation of departments |
| Cambridge 9706 | Not examined |

ZIMSEC terms: departmental trading and profit and loss account; net profit (profit for the year); stock (inventory); debtors (trade receivables).
:::

## Key definitions

:::definition{term="Departmental statement of profit or loss"}
A statement with separate columns for each department and a total column, showing revenue, cost of sales, gross profit, other income, apportioned and allocated expenses and net profit for each.
:::

:::definition{term="Gross profit margin of a department"}
Gross profit divided by the revenue of that department, multiplied by 100. It shows how much each dollar of sales earns before expenses.
:::

:::definition{term="Contribution of a department"}
The gross profit and other income that the department earns, less the expenses that would disappear if it closed. It is the amount by which the department increases the total profit.
:::

## Preparing the statement

Use one column for each department and one for the total. In each column:

1. Show sales, less returns, as revenue. Calculate cost of sales (opening inventory + purchases - closing inventory) and gross profit.
2. Add the department's share of ancillary income.
3. Deduct the departmental (allocated) expenses and then the apportioned common expenses.
4. Calculate the net profit or loss.

Check that the total column equals the sum of the departmental columns for every row, and that the total net profit agrees with the figure for the whole business. Percentages help comparison: the gross profit margin, and the net profit as a percentage of revenue. There is one statement of financial position for the whole business, because the assets and liabilities are not split between departments, except in the apportionment of depreciation and insurance.

:::worked-solution[Example 1: departmental statement of profit or loss]
Chipo's Mart has three departments. Sales, inventories and purchases are shown in the statement below. The common expenses are: rent US\\$${fmt(18000)} and lighting US\\$${fmt(4500)} (floor areas ${150}, ${90} and ${60} m²); general wages US\\$${fmt(21000)} (staff 4 : 2 : 1); advertising US\\$${fmt(6100)} (sales); depreciation US\\$${fmt(8400)} (asset values US\\$${fmt(30000)}, US\\$${fmt(25000)} and US\\$${fmt(5000)}). Commission received of US\\$${fmt(3050)} is shared on sales. The wages of each department's own staff are US\\$${fmt(14200)}, US\\$${fmt(9800)} and US\\$${fmt(6300)}. Prepare the departmental statement and the statement of financial position, given: premises and equipment US\\$${fmt(ppe)}, trade receivables US\\$${fmt(rec)}, bank US\\$${fmt(bank)}, trade payables US\\$${fmt(pay)} and drawings US\\$${fmt(drawings)}.

Apportionment of common items.

${m.apportionMd}

${m.pl}

${sofp}

Check: total net profit ${fmt(totalNet)} is the sum of ${fmt(m.net[0])}, ${fmt(m.net[1])} and (${fmt(-m.net[2])}). Total assets ${fmt(assets)} equal closing capital ${fmt(capClose)} plus payables ${fmt(pay)}.
:::

## Evaluating departments

Stationery makes a net loss of ${fmt(-m.net[2])}, but that does not mean that closing it would improve the business. Gross profit margins are Groceries ${pctG[0]}, Hardware ${pctG[1]} and Stationery ${pctG[2]}. Stationery has a positive gross profit. The loss arises after common expenses have been charged to it. Most of those common expenses, such as rent and advertising, would continue if the department closed. The relevant question is what the department contributes.

:::worked-solution[Example 2: should the stationery department be closed?]
The manager proposes to close stationery because it shows a net loss. Only the department's own wages (US\\$${fmt(6300)}) would be saved. The common expenses would continue. Calculate the effect on net profit.

${closeTable}

1. Stationery earns gross profit of ${fmt(m.dep[2].gp)} and a share of commission of ${fmt(m.income[0].parts[2])}.
2. Closing it saves only its own wages of ${fmt(6300)}. Contribution = ${fmt(m.dep[2].gp)} + ${fmt(m.income[0].parts[2])} - ${fmt(6300)} = ${fmt(contribution)}.
3. Total net profit would fall from ${fmt(totalNet)} to ${fmt(profitAfter)}. The common expenses charged to stationery (${fmt(r2(m.expTotals[2] - 6300))}) would have to be carried by the other departments.
4. Conclusion: do not close it on these figures. Consider raising its margin, cutting its floor area (the rent charge is ${fmt(rentStat)}) or whether customers buy other goods because it exists.
:::

## Common mistakes

:::mistake{title="Closing a department because it shows a net loss"}
The loss includes apportioned costs that would continue. Compare the department's contribution, not its net result.
:::

:::mistake{title="Apportioning the departmental wages again"}
Wages of a department's own staff are allocated directly. Only general wages are apportioned.
:::

:::mistake{title="A total column that does not equal the sum of departments"}
Every row of the total column must equal the sum of the three departments. Check each subtotal.
:::

:::mistake{title="Preparing separate statements of financial position for each department"}
There is one statement of financial position for the business. Only the profit is split.
:::

:::mistake{title="Using closing inventory in the wrong department"}
Each department has its own opening inventory, purchases and closing inventory. Check that figures are in the right column.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Paper 2 and Paper 3 (problem solving) only. For *prepare*, give a three-line heading, set out the columns, show the apportionment workings and check the totals. For *calculate the percentage*, state gross profit ÷ revenue × 100 for each department. For *comment* or *advise*, compare the departments' margins, say which common costs would continue and give a judgement with figures.
:::

:::exam-tip
When asked whether to close a department, calculate the effect on total profit. Name the costs that would be saved and the ones that would continue.
:::

## Summary

:::summary
- A departmental statement of profit or loss has a column for each department and a total column, from revenue to net profit.
- Own costs are allocated; common costs and ancillary income are apportioned; the total column is the sum of the departments.
- Gross profit margin and net profit percentage compare departments.
- There is one statement of financial position for the whole business.
- Before closing a loss-making department, compare its contribution: common costs that continue make the loss look worse than the real effect.
:::
`;
writeLesson("departmental/statements.md", front("departmental.statements", "Departmental statements of profit or loss and financial position", "Prepare a departmental statement of profit or loss with a total column and one statement of financial position, calculate department margins and evaluate whether to close a department (ZIMSEC).", ["aacc.departmental.statements"], 55), body.split("US$").join("US\\$"));
