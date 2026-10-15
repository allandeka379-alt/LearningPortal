---
{
  "key": "macro.income-gaps",
  "title": "National income determination and inflationary and deflationary gaps",
  "summary": "Find equilibrium national income from aggregate demand and from injections and withdrawals, define the full employment level of income, calculate inflationary and deflationary gaps using the multiplier, and assess the policy implications.",
  "concepts": ["aecon.macro.income-gaps"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

Is the economy producing as much as it could, or is it stuck at a level where workers are idle? A Keynesian answer starts with spending. Firms produce what they expect to sell, so the level of output and income settles where total planned spending equals total output. If this level is below the one that gives work to everyone willing to work, the economy has a **deflationary gap**; if planned spending is too high for the economy's capacity, it has an **inflationary gap**. This lesson shows how to calculate equilibrium and the gaps with numbers, and what governments can do about them.

You should know aggregate demand (C + I + G + X − M), the consumption function, the propensities and the multiplier from the earlier lessons.

## Key definitions

:::definition{term="Equilibrium national income"}
The level of national income (output) at which planned aggregate demand equals national output, or equivalently, planned injections equal planned withdrawals. At this level there is no tendency for output to change.
:::

:::definition{term="Full employment level of income (Yf)"}
The level of national income at which all available resources, including labour, are employed at a normal level of intensity; there is no cyclical unemployment.
:::

:::definition{term="Deflationary (recessionary) gap"}
The amount by which aggregate demand at the full employment level of income falls short of that level: the increase in aggregate demand (injections) needed to reach full employment. Equilibrium income is below Yf.
:::

:::definition{term="Inflationary gap"}
The amount by which aggregate demand at the full employment level of income exceeds that level: the reduction in aggregate demand needed to avoid inflation. Equilibrium income would be above Yf, but real output cannot exceed capacity, so prices rise.
:::

:::keyfact{title="Rules"}
Equilibrium: AD = Y, or injections (I + G + X) = withdrawals (S + T + M).
Income gap = Yf − Ye (deflationary if positive, inflationary if negative).
**Gap in aggregate demand (the injection to change) = income gap ÷ multiplier.**
:::

## Finding equilibrium

Take a fictional economy (US\$ million) with consumption C = 100 + 0.8Yd, where Yd is disposable income; tax is 25% of national income (so Yd = 0.75Y); investment I = 150; government spending G = 200; exports X = 120; and imports M = 0.1Y.

| National income Y | Consumption C | Imports M | Aggregate demand (C + I + G + X − M) | Saving S | Tax T | Withdrawals S + T + M |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1,000 | 700 | 100 | 1,070 | 50 | 250 | 400 |
| 1,140 | 784 | 114 | 1,140 | 71 | 285 | 470 |
| 1,300 | 880 | 130 | 1,220 | 95 | 325 | 550 |

:::worked-solution{title="Equilibrium income"}
1. AD = C + I + G + X − M = (100 + 0.8 × 0.75Y) + 150 + 200 + 120 − 0.1Y = 570 + 0.6Y − 0.1Y = **570 + 0.5Y**.
2. Set AD = Y: 570 + 0.5Y = Y, so 570 = 0.5Y and **Ye = 1,140**.
3. Check with the multiplier: k = 1 ÷ (1 − 0.8 × 0.75 + 0.1) = 1 ÷ 0.5 = **2**; autonomous spending = 100 + 150 + 200 + 120 = 570; Ye = 2 × 570 = 1,140.
4. Check with injections and withdrawals at Y = 1,140: injections = 150 + 200 + 120 = **470**; withdrawals = S + T + M = 71 + 285 + 114 = **470**. They are equal.
5. At Y = 1,000, AD (1,070) is greater than output, so stocks run down and output rises; at Y = 1,300, AD (1,220) is less than output, so stocks build and output falls: Y = 1,140 is stable.
:::

Describe the diagram in words: planned spending (AD) is on the vertical axis and national income on the horizontal axis; the AD line has a positive slope of 0.5 (less than 1), starts at 570, and cuts the 45-degree line (where AD = Y) at Y = 1,140.

## The deflationary gap

Suppose the full employment level of income is Yf = **1,300**. Equilibrium income (1,140) is below it.

:::worked-solution{title="Deflationary gap"}
1. Income gap = 1,300 − 1,140 = **160**.
2. AD at full employment = 570 + 0.5 × 1,300 = **1,220**, which is **80** less than 1,300. The deflationary gap (the shortfall in AD) = **80**.
3. Check with the multiplier: injection needed = income gap ÷ k = 160 ÷ 2 = **80**.
4. To close the gap, the government could raise spending by US\$80 million (a tax cut would have to be larger than that, because households save part of it). Then Ye rises by 2 × 80 = 160, to 1,300.
5. Unemployment at 1,140 is cyclical and output is below potential (a negative output gap).
:::

## The inflationary gap

Suppose instead that the full employment level is Yf = **1,000** (a smaller economy).

:::worked-solution{title="Inflationary gap"}
1. Ye = 1,140 exceeds Yf by **140**, but real output cannot exceed capacity.
2. AD at full employment = 570 + 0.5 × 1,000 = **1,070**, which is **70** more than 1,000. The inflationary gap = **70**.
3. Check: income gap ÷ k = 140 ÷ 2 = **70**.
4. The excess demand of 70 cannot raise real output, so it raises the price level; if unchecked, wages and prices keep rising.
5. To remove it, aggregate demand has to fall by 70, for example a cut in government spending of 70 or an equivalent rise in taxes or interest rates.
:::

:::example{title="Why the gap is smaller than the income gap"}
The income gap (160 or 140) is large because the multiplier amplifies each dollar of spending. The change in injections needed is only the **gap in aggregate demand**, the income gap divided by the multiplier: 80 or 70. A common mistake is to say that the government must raise spending by the whole income gap.
:::

## Policy implications and limits

- **Deflationary gap:** expansionary fiscal policy (higher spending, lower taxes) or monetary policy (lower interest rates, a lower exchange rate to raise net exports).
- **Inflationary gap:** contractionary fiscal policy (lower spending, higher taxes) or higher interest rates.

**Limitations of the model:** it is not easy to estimate the full employment income, the multiplier and the propensities; policy takes time to work; the model ignores prices and the supply side (a deflationary gap may reflect low productive capacity, not just weak demand); borrowing to finance the spending may crowd out private investment; and expectations and confidence can alter spending in ways the model does not predict.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect equilibrium national income from AD and from injections and withdrawals, the full employment income, and the calculation and interpretation of inflationary and deflationary gaps with the multiplier. ZIMSEC Paper 2 often gives data to calculate the gap; Cambridge expects the diagram described in words and an evaluation of policy.
:::

## Common mistakes

:::mistake{title="Confusing the income gap with the spending gap"}
The change in injections needed equals the gap in aggregate demand = income gap ÷ multiplier. Using the whole income gap overstates the policy needed.
:::

:::mistake{title="Saying that an inflationary gap raises real output"}
Real output cannot exceed full capacity. The excess demand raises prices instead.
:::

:::mistake{title="Using the wrong sign for the type of gap"}
If Ye is below Yf the gap is deflationary (recessionary); if Ye is above Yf it is inflationary.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 2 and Paper 3 contain numerical questions on equilibrium income and gaps. Cambridge Paper 3 asks for the identification of a gap from a described diagram and for simple calculations, and Paper 4 asks about the use of fiscal and monetary policy to close a gap.
:::

:::exam-tip{title="Command words"}
*Calculate*: find Ye, then the gap, then divide by k if the question asks for the change in injections. *Explain*: describe what happens to stocks and output when AD differs from Y. *Evaluate*: consider whether the policy can close the gap given lags, uncertainty, crowding out and the supply side.
:::

## Summary

:::summary
- Equilibrium national income is where AD = Y, or where injections equal withdrawals.
- Full employment income is the level at which there is no cyclical unemployment.
- A deflationary gap exists when AD at Yf is too low; an inflationary gap when it is too high.
- Change in injections needed = income gap ÷ multiplier.
- Policy: expand demand for a deflationary gap and contract it for an inflationary gap, taking account of lags, uncertainty and the supply side.
:::
