// W4a lesson generator: policy.fiscal-policy. Run: node .scratch/economics-a/tables/w4a-fiscal-policy.mjs
import { schedule, chk, table, fmt, money, roundTo, pctChange } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

// Budget of "Country X" (illustrative), US$ million
const revenue = 5200, current = 4600, interest = 600, capital = 1100;
const spending = current + capital; chk(spending, 5700);
const deficit = spending - revenue; chk(deficit, 500);
const gdp = 20000, debt0 = 9000, debt1 = debt0 + deficit;
chk(debt1, 9500); chk((debt0 / gdp) * 100, 45); chk((debt1 / gdp) * 100, 47.5);
chk((interest / revenue) * 100, (600 / 5200) * 100); chk(roundTo((interest / revenue) * 100, 1), 11.5);
const tb = table(["Item", "US\\$ million"], [
  ["Tax and other revenue", revenue],
  ["Current spending (wages, goods and services, transfers and interest of 600)", current],
  ["Capital spending (roads, dams, schools, clinics)", capital],
  ["**Total spending**", `**${fmt(spending)}**`],
  ["**Budget deficit** (spending − revenue)", `**${fmt(deficit)}**`],
]);

// AD/AS schedule
const P = [90, 100, 110, 120, 130];
const ad1 = [1150, 1100, 1050, 1000, 950];
const ad2 = ad1.map((x) => x + 100);
const as = [850, 950, 1050, 1100, 1125];
const s1 = schedule({ prices: P, qd: ad1, qs: as, priceHeader: "Price level (index)", qdHeader: "AD1: real GDP demanded (US\\$ million)", qsHeader: "SRAS: real GDP supplied (US\\$ million)", requireEquilibrium: true });
const s2 = schedule({ prices: P, qd: ad2, qs: as, priceHeader: "Price level (index)", qdHeader: "AD2: real GDP demanded (US\\$ million)", qsHeader: "SRAS: real GDP supplied (US\\$ million)", requireEquilibrium: true });
chk(s1.equilibrium.price, 110); chk(s1.equilibrium.quantity, 1050);
chk(s2.equilibrium.price, 120); chk(s2.equilibrium.quantity, 1100);
const dY = pctChange(1050, 1100), dP = pctChange(110, 120);
chk(roundTo(dY, 1), 4.8); chk(roundTo(dP, 1), 9.1);
const both = table(["Price level (index)", "AD1 (US\\$ million)", "AD2 (US\\$ million)", "SRAS (US\\$ million)"], P.map((p, i) => [p, ad1[i], ad2[i], as[i]]));

const body = String.raw`
## Introduction

Each year the Minister of Finance in Zimbabwe presents a national budget to Parliament. It sets out how much the government expects to collect in taxes, mainly through ZIMRA, and how it plans to spend that money on wages, health, education, roads and many other things. The budget is also a macroeconomic tool. By changing how much it spends and taxes, the government can try to raise output and jobs in a slump or to cool an overheated economy. This use of government spending and taxation to influence the economy is **fiscal policy**.

You should know the circular flow, aggregate demand and aggregate supply, the multiplier and the main types of tax (see the lesson on taxation).

## Key definitions

:::definition{term="Fiscal policy"}
The use of government spending, taxation and borrowing to influence the level of aggregate demand and, through it, output, employment and the price level.
:::

:::definition{term="Budget deficit, budget surplus and balanced budget"}
In a given year, a **budget deficit** occurs when government spending is greater than government revenue; a **budget surplus** when revenue is greater than spending; the budget is **balanced** when they are equal.
:::

:::definition{term="National debt"}
The total amount that a government owes to lenders at a point in time, built up from past borrowing to finance deficits. It is a **stock**, while the deficit is a **flow** over a year.
:::

:::definition{term="Expansionary and contractionary fiscal policy"}
**Expansionary** (reflationary) fiscal policy raises government spending, cuts taxes or both, to increase aggregate demand. **Contractionary** (deflationary) fiscal policy cuts spending, raises taxes or both, to reduce aggregate demand.
:::

## The government budget

${tb}

The deficit of US\$500 million is a flow for the year. If the national debt was US\$9,000 million at the start of the year, borrowing to finance the deficit raises it to **US\$9,500 million** (the debt stock rises by the amount of the deficit).

Government spending is divided into:

- **Current (recurrent) spending**: day-to-day costs such as wages of teachers and nurses, medicines, school books and interest on debt. It is used up in the year.
- **Capital spending**: investment in assets that last, such as roads, dams, hospitals and schools. It raises the economy's productive capacity.
- **Transfer payments** (part of current spending): payments such as pensions and grants that do not buy output; they move income from taxpayers to recipients and do not count in GDP.

## The national debt

Governments finance deficits by borrowing from domestic lenders (banks, pension funds, the public), from foreign lenders and international institutions, or from the central bank (which creates money, a link to the lessons on money). Debt is significant because:

1. **Interest must be paid.** In the example, interest takes US\$600 million of US\$5,200 million revenue (**11.5%**), leaving less for other spending. This is an *opportunity cost*.
2. **It may crowd out private borrowing**, raising interest rates, if the government borrows heavily at home.
3. **Foreign debt must be repaid in foreign currency**, which affects the balance of payments and the exchange rate.
4. **Future taxpayers bear the burden**, unless the borrowing financed investment that raises future output.

Sustainability is judged by the ratio of debt to GDP (here US\$9,500 million ÷ US\$20,000 million = **47.5%**) and by how fast the economy grows compared with the interest rate. Debt used for capital spending that raises growth is easier to carry than debt used for consumption.

## Effects on the economy

Expansionary fiscal policy raises aggregate demand directly (government spending, a component of AD) or indirectly (lower taxes raise disposable income and consumption). The effect on output depends on the multiplier and on how much spare capacity exists. Take a (fictional, illustrative) economy with this schedule, where the price level is an index and real GDP is in US\$ million.

${both}

Before the policy the economy is in equilibrium on AD1 and SRAS at a price level of **110** and real GDP of **US\$1,050 million**. The government raises spending, shifting AD to the right by US\$100 million at every price level (from AD1 to AD2). At a price level of 110 there is now excess demand of 1,150 − 1,050 = 100, so firms raise output and prices until the new equilibrium: price level **120** and real GDP **US\$1,100 million**.

:::worked-solution{title="Reading the effect"}
1. Change in real GDP = 1,100 − 1,050 = US\$50 million; as a percentage, 50 ÷ 1,050 × 100 = **4.8%**.
2. Change in the price level = (120 − 110) ÷ 110 × 100 = **9.1%**.
3. The AD shift of US\$100 million raised output by only US\$50 million because part of the extra demand was absorbed by higher prices.
4. If SRAS were flat (large spare capacity) the full shift would raise output; if SRAS were vertical (full employment) it would raise only prices.
:::

:::worked-solution{title="Fiscal policy and the multiplier"}
Government spending rises by US\$80 million and the multiplier is 2.5.
1. The maximum increase in aggregate demand = 2.5 × 80 = **US\$200 million**.
2. This is the potential effect with spare capacity. If crowding out reduces private investment by US\$30 million, the net effect on demand is reduced by 2.5 × 30 = US\$75 million, to **US\$125 million**.
:::

Contractionary policy works in reverse: AD shifts left, which lowers inflation and the deficit but reduces output and employment in the short run.

## Types of fiscal policy and when they are used

| Aim | Policy | Effect |
| --- | --- | --- |
| Reduce unemployment in a slump | Expansionary: raise spending or cut taxes | AD rises; output and employment rise |
| Reduce demand-pull inflation | Contractionary: cut spending or raise taxes | AD falls; price level rises more slowly or falls |
| Raise long-run growth | Spend on capital (infrastructure, education) | AD rises now and LRAS rises later |
| Reduce the deficit | Cut spending or raise taxes | Lower borrowing; AD falls |

## Evaluating fiscal policy

:::example{title="Evaluation paragraph"}
Expansionary fiscal policy can be effective when there is high unemployment and spare capacity, because extra government spending is multiplied through the economy. Its effect is reduced by time lags in deciding and spending, by crowding out of private investment if the government borrows heavily, by leakages into imports and by higher prices if capacity is limited. A government that already carries a large debt may also find it difficult to borrow more at a reasonable cost. Fiscal policy is therefore most useful where spare capacity is large and debt is manageable, and it works better if the extra spending is on capital goods that also raise supply.
:::

Other limits include political pressure (spending cuts are unpopular), the difficulty of estimating the multiplier, and the fact that tax revenue falls in a slump, so the deficit may widen even without new policy.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the meaning and types of fiscal policy, the budget deficit and surplus, the national debt and AD/AS analysis. ZIMSEC (Form 6) also expects capital and current spending and the budget as a factual illustration; Cambridge (AS) expects a diagram-based analysis and evaluation of the effectiveness of fiscal policy. Government failure and the Laffer curve are in later lessons.
:::

## Common mistakes

:::mistake{title="Confusing the deficit with the debt"}
The deficit is the shortfall in **one year** (a flow). The national debt is the **total** owed (a stock). A government can run a surplus and still have a large debt.
:::

:::mistake{title="Saying that a deficit is always bad"}
A deficit that finances capital spending in a slump may raise output and future capacity. The consequences depend on its size, its cause, how it is financed and the state of the economy.
:::

:::mistake{title="Forgetting the price level"}
When capacity is limited, expansionary policy raises prices as well as output. Show both effects in an AD/AS answer.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 2 uses budget data (deficit and surplus calculations, shares of spending) and Paper 3 asks for essays on fiscal policy and its limits. Cambridge Paper 1 tests definitions and AD/AS effects; Paper 2 data responses and essays ask you to assess fiscal policy.
:::

:::exam-tip{title="Command words"}
*Calculate*: spending minus revenue gives the deficit; debt ÷ GDP × 100 gives the ratio. *Explain*: shift AD, state the effect on output, prices and employment and use the multiplier. *Evaluate*: weigh the effect against spare capacity, time lags, crowding out, debt and the size of the multiplier, and reach a judgement.
:::

## Summary

:::summary
- Fiscal policy uses government spending, taxation and borrowing to influence aggregate demand.
- A budget deficit (spending greater than revenue) is a flow; the national debt is the accumulated stock of borrowing.
- Expansionary policy raises AD and contractionary policy lowers it; the effect on output and prices depends on spare capacity and the multiplier.
- Debt matters because of interest payments, crowding out, repayment of foreign debt and the burden on future taxpayers.
- Effectiveness is limited by time lags, crowding out, leakages, debt and uncertainty.
:::
`;

writeLesson("policy.fiscal-policy", {
  title: "Fiscal policy: the budget, national debt and expansionary and contractionary policy",
  summary: "Explain fiscal policy, interpret a government budget and calculate deficits and debt ratios, analyse expansionary and contractionary policy with AD/AS and the multiplier, and evaluate its effectiveness.",
  concepts: ["aecon.policy.fiscal-policy"],
  estimatedMinutes: 55,
}, body);
