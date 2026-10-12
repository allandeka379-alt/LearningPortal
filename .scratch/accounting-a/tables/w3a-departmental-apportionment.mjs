// Lesson generator: departmental.apportionment
import { fmt, chk, r2, sum, table } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";
import { deptModel } from "./w3a-models.mjs";

export const d1 = {
  name: "Rudo's Emporium", year: 2025,
  depts: [
    { name: "Clothing", sales: 90000, openInv: 9500, purchases: 52400, closeInv: 11200, direct: [{ label: "Departmental wages", amt: 8400 }] },
    { name: "Footwear", sales: 45000, openInv: 6200, purchases: 27300, closeInv: 5900, direct: [{ label: "Departmental wages", amt: 5100 }] },
    { name: "Household", sales: 65000, openInv: 12800, purchases: 38600, closeInv: 13400, direct: [{ label: "Departmental wages", amt: 9300 }] },
  ],
  common: [
    { label: "Rent", total: 21000, basis: "floor", basisText: "Floor area (240 : 120 : 340 m²)", shares: [240, 120, 340] },
    { label: "Lighting and heating", total: 5600, basis: "floor", basisText: "Floor area", shares: [240, 120, 340] },
    { label: "Insurance of assets", total: 3900, basis: "assets", basisText: "Asset values (12,000 : 18,000 : 9,000)", shares: [12000, 18000, 9000] },
    { label: "General staff wages", total: 16500, basis: "staff", basisText: "Number of staff (3 : 2 : 5)", shares: [3, 2, 5] },
    { label: "Advertising", total: 6000, basis: "sales" },
    { label: "Bank charges", total: 1050, basis: "equal" },
  ],
  income: [{ label: "Commission received", total: 2400, basis: "sales" }],
};
export const m1 = deptModel(d1);
chk(m1.common[0].parts[0], 7200); chk(m1.common[0].parts[2], 10200); chk(m1.common[2].parts[1], 1800); chk(m1.common[3].parts[2], 8250); chk(m1.common[4].parts[0], 2700);
const commonTotals = d1.depts.map((_, i) => sum(m1.common.map((c) => c.parts[i])));
chk(sum(commonTotals), sum(d1.common.map((c) => c.total)));
const sumTable = table(["", "Clothing US\\$", "Footwear US\\$", "Household US\\$", "Total US\\$"], [
  ["Common expenses apportioned", ...commonTotals, sum(commonTotals)],
  ["Departmental wages (direct)", 8400, 5100, 9300, 22800],
  ["Commission received (income)", ...m1.income[0].parts, 2400],
]);
// Example 2: effect of the basis for rent
const rentFloor = m1.common[0].parts;
const rentSales = d1.depts.map((x) => r2((21000 * x.sales) / 200000));
chk(sum(rentSales), 21000);
const diff = rentFloor.map((v, i) => r2(rentSales[i] - v));
chk(diff[2], -3375);
const baseNet = m1.net;
const altNet = baseNet.map((v, i) => r2(v - diff[i]));
chk(sum(altNet), sum(baseNet));
const cmp = table(["Rent charged to each department", "Clothing US\\$", "Footwear US\\$", "Household US\\$", "Total US\\$"], [
  ["On floor area", ...rentFloor, 21000],
  ["On sales", ...rentSales, 21000],
  ["Difference (sales basis minus floor area)", ...diff, 0],
  ["Net profit (loss) using floor area for rent", ...baseNet, sum(baseNet)],
  ["Net profit (loss) using sales for rent", ...altNet, sum(altNet)],
]);

const body = `## Introduction

Rudo's Emporium in Masvingo has three departments under one roof: clothing, footwear and household goods. Rudo pays one rent bill, one electricity bill and one advertising bill, but she wants to know which department earns its keep. To find out, she must share the costs that serve everyone among the departments. This is **apportionment**.

You already know how to prepare a profit and loss account for the whole business. This lesson explains how to divide the common expenses and any ancillary income fairly. The next lesson uses the figures to prepare departmental statements. Departmental accounts are examined by ZIMSEC in Form 5. Cambridge does not examine them, so Cambridge candidates may leave this topic.

:::keyfact{title="Who needs this lesson"}
| Board | Status |
| --- | --- |
| ZIMSEC | Form 5: bases of apportionment, departmental accounts |
| Cambridge 9706 | Not examined |

ZIMSEC terms: departmental accounts, allocation (direct charge) and apportionment (sharing of common costs).
:::

## Key definitions

:::definition{term="Departmental accounts"}
Accounts that show the gross profit and net profit of each department of a business separately, so that management can judge the performance of each department.
:::

:::definition{term="Allocation (direct charge)"}
Charging an expense wholly to the department that incurred it, for example the wages of the staff who work only in clothing.
:::

:::definition{term="Apportionment"}
Sharing a common expense among departments on a basis that reflects the benefit each department receives.
:::

:::definition{term="Ancillary income"}
Income that arises from the business as a whole and is not earned by one department alone, such as commission received or rent received. It is shared among the departments like a common expense.
:::

## Choosing a basis

A good basis follows the way the cost is caused or the benefit is received. If no clear link exists, a simple basis such as sales is used.

:::keyfact{title="Common bases of apportionment"}
- **Floor area:** rent, rates, cleaning, lighting and heating.
- **Number of employees:** general staff wages, canteen, staff welfare.
- **Value of assets:** depreciation and insurance of assets.
- **Sales (or purchases or cost of sales):** advertising, delivery, commission received.
- **Equal shares:** costs that do not vary with size, such as bank charges.
- **Usage:** metered services such as electricity, where meter readings are available.
:::

Calculate each department's share as: total expense × department's share of the basis ÷ total of the basis. Keep a separate column for each department and check that the shares add up to the total expense. A department's own expenses, such as the wages of its own staff, are allocated directly and are not shared.

:::worked-solution[Example 1: apportioning expenses and income]
Rudo's Emporium has the common expenses and ancillary income below for the year ended 31 December 2025. Sales were US\\$${fmt(90000)} (clothing), US\\$${fmt(45000)} (footwear) and US\\$${fmt(65000)} (household), a total of US\\$${fmt(200000)}. Departmental wages are allocated directly. Apportion the common items.

${m1.apportionMd}

1. Rent: US\\$${fmt(21000)} ÷ 700 m² = US\\$30 per m²; clothing 240 × 30 = ${fmt(7200)}, footwear 120 × 30 = ${fmt(3600)}, household 340 × 30 = ${fmt(10200)}.
2. Insurance: US\\$${fmt(3900)} on asset values of US\\$${fmt(39000)} is 10%; clothing ${fmt(1200)}, footwear ${fmt(1800)}, household ${fmt(900)}.
3. Advertising and commission use the sales ratio 90 : 45 : 65, so each US\\$1 of sales carries 3% of the advertising (${fmt(6000)} ÷ ${fmt(200000)}) and 1.2% of the commission.
4. Bank charges are shared equally: ${fmt(1050)} ÷ 3 = ${fmt(350)} each.

${sumTable}

The total charged to the departments equals the common expenses of ${fmt(sum(commonTotals))} (check) and the commission of ${fmt(2400)}.
:::

## Why the basis matters

Any basis is a judgement. Changing it shifts profit between departments but leaves the total profit unchanged. A department that looks unprofitable on one basis may look healthy on another. The fair basis is the one that reflects the use of the resource, which is why rent follows floor area, not sales.

:::worked-solution[Example 2: the effect of a different basis]
The manager suggests apportioning rent on sales instead of floor area. Show the effect on each department's net profit. (The net profits shown come from the full departmental statement of profit or loss of this business, which you learn to prepare in the next lesson.)

${cmp}

1. Rent on sales: clothing ${fmt(21000)} × 90 ÷ 200 = ${fmt(rentSales[0])}; footwear ${fmt(rentSales[1])}; household ${fmt(rentSales[2])}.
2. Household uses 340 of 700 m² (about 49%) but has only 32.5% of sales. The sales basis would give it ${fmt(-diff[2])} less rent and make it look better than it is.
3. Total net profit is ${fmt(sum(baseNet))} on either basis. Only the split changes.
4. Conclusion: floor area is fairer for rent because the rent buys space.
:::

## Common mistakes

:::mistake{title="Apportioning direct expenses"}
Expenses that clearly belong to one department are allocated to it directly. Do not share the wages of one department's staff among all.
:::

:::mistake{title="Using one basis for every expense"}
Choose the basis that matches each expense. Sales is acceptable for advertising, but not for rent or insurance of assets.
:::

:::mistake{title="Forgetting the ancillary income"}
Commission received or rent received is shared out too. Leaving it out understates the total profit.
:::

:::mistake{title="Shares that do not add up"}
Always check that the departmental shares total the expense. A small rounding difference is adjusted in the largest share.
:::

:::mistake{title="Saying that the basis changes the total profit"}
The total profit is unchanged. The basis only changes how it is split between departments.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Paper 2 (and Paper 3 problem solving) only. For *apportion*, show the ratio, the calculation for each department and a check that the shares add up. For *state a suitable basis*, name the basis and link it to the expense (for example, "rent: floor area, because the rent pays for space"). For *comment on the fairness*, compare two bases and the effect on departmental profit.
:::

:::exam-tip
Set out the apportionment as a table with one column per department and a total column. It makes carrying the figures into the departmental statement of profit or loss quick and easy to check.
:::

## Summary

:::summary
- Departmental accounts show the gross and net profit of each department; they are a ZIMSEC topic only.
- Direct expenses are allocated to the department; common expenses and ancillary income are apportioned on a suitable basis.
- Typical bases: floor area (rent, lighting), employees (general wages), asset values (insurance, depreciation), sales (advertising, commission), equal shares (bank charges).
- Share = total × department's part of the basis ÷ total of the basis; check that the shares add up.
- The choice of basis changes departmental profit but not the total profit.
:::
`;
writeLesson("departmental/apportionment.md", front("departmental.apportionment", "Apportioning expenses and income to departments", "Allocate departmental expenses and apportion common expenses and ancillary income on suitable bases such as floor area, staff, asset values and sales (ZIMSEC).", ["aacc.departmental.apportionment"], 50), body.split("US$").join("US\\$"));
