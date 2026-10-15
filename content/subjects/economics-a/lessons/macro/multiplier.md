---
{
  "key": "macro.multiplier",
  "title": "The multiplier",
  "summary": "Explain the multiplier process, derive and use the multiplier formulae for closed and open economies with and without government, calculate the effect of a change in injections on national income, and evaluate the limitations and time lags.",
  "concepts": ["aecon.macro.multiplier"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

When a mining company builds a new road to a mine, it pays construction workers. They spend part of their wages in local shops, whose owners spend part of their new incomes, and so on. In the end the rise in national income is a multiple of the original spending. This is the **multiplier**. It explains why a modest rise in government spending or exports can lift national income by much more, and why a fall in investment can cause a deep recession. It is also why governments and firms care about how much of an income rise leaks out of the spending flow.

You should know the circular flow (injections and withdrawals), the consumption function and the propensities to consume, save, tax and import (previous lesson).

## Key definitions

:::definition{term="Multiplier"}
The ratio of the total change in equilibrium national income to the initial change in autonomous spending (an injection) that caused it: k = ΔY ÷ ΔInjection.
:::

:::definition{term="Marginal propensity to withdraw (MPW)"}
The fraction of an extra dollar of national income that leaks out of the circular flow, by being saved (MPS), taxed (MPT) or spent on imports (MPM): MPW = MPS + MPT + MPM.
:::

:::keyfact{title="Multiplier formulae"}
Closed economy, no government: k = 1 ÷ (1 − MPC) = 1 ÷ MPS.
General (open economy with government): **k = 1 ÷ (MPS + MPT + MPM)**, with all three propensities measured as fractions of national income.
Equivalent form: k = 1 ÷ (1 − MPC(1 − MRT) + MPM), where MPC is out of disposable income and MRT is the marginal rate of tax.
Change in national income = k × change in injection (investment, government spending or exports).
:::

## The multiplier process

Suppose investment rises by US\$100 million and the MPC is 0.8, with no tax or trade. The new spending becomes someone's income, 80% of which is spent again.

| Round | Extra income (US\$ million) | Of which spent (MPC = 0.8) | Cumulative rise in income |
| --- | ---: | ---: | ---: |
| 1 | 100.00 | 80.00 | 100.00 |
| 2 | 80.00 | 64.00 | 180.00 |
| 3 | 64.00 | 51.20 | 244.00 |
| 4 | 51.20 | 40.96 | 295.20 |
| 5 | 40.96 | 32.77 | 336.16 |
| 6 | 32.77 | 26.21 | 368.93 |

The rounds continue, each smaller than the last, and the cumulative total approaches US\$500 million.

:::worked-solution{title="Closed economy"}
1. MPS = 1 − 0.8 = 0.2. Multiplier k = 1 ÷ 0.2 = **5**.
2. Change in national income = 5 × US\$100 million = **US\$500 million**.
3. The sum of the geometric series 100 + 80 + 64 + … = 100 ÷ (1 − 0.8) = 500, confirming the formula.
:::

:::worked-solution{title="Open economy with government"}
An economy has MPC (out of disposable income) = 0.8, a marginal rate of tax of 25% and a marginal propensity to import of 0.1. Government spending rises by US\$100 million.
1. MPS as a fraction of national income = (1 − 0.8) × (1 − 0.25) = **0.15**. MPT = **0.25**. MPM = **0.10**.
2. MPW = 0.15 + 0.25 + 0.10 = **0.50**. Multiplier k = 1 ÷ 0.50 = **2**.
3. Check with the other form: 1 ÷ (1 − 0.8 × 0.75 + 0.1) = 1 ÷ (1 − 0.6 + 0.1) = 1 ÷ 0.5 = **2**.
4. Change in national income = 2 × 100 = **US\$200 million**.
5. Taxes and imports cut the multiplier from 5 to 2, because only 0.8 × 0.75 − 0.1 = **0.50** of each extra dollar of income is spent again on home goods.
:::

A **fall** in an injection has the opposite (downward) multiplier effect: a fall in investment of US\$100 million reduces national income by US\$200 million in the open economy above.

### Using the multiplier

:::worked-solution{title="How big an injection is needed?"}
National income is US\$900 million below the level needed for full employment, and the multiplier is 2.5. The required rise in government spending = 900 ÷ 2.5 = **US\$360 million** (the gap lessons use this).
:::

The multiplier also applies to the effect of a rise in exports, which is an injection, and to changes in autonomous consumption.

## Time lags and limitations

The multiplier is a **simple model**. In reality its size is reduced or delayed because:

1. **Time lags.** Each round takes time (weeks or months), so the full effect takes a year or more to appear.
2. **Spare capacity is needed.** If the economy is at or near full employment, extra demand raises prices rather than output, and the real multiplier is small.
3. **Crowding out.** If a rise in government spending is financed by borrowing, interest rates may rise and reduce private investment.
4. **Leakages are larger than assumed**, especially in a small open economy where much of the extra income is spent on imports; high taxes and a high savings rate also reduce it.
5. **Unstable propensities.** The MPC changes with expectations and confidence; households may save windfalls.
6. **Supply-side limits.** If the injection is spent on imports or goods that cannot be produced at home, local incomes rise little.
7. **Expectations.** If households expect taxes to rise later to repay the debt, they may save more.

On the other hand, the accelerator can make the total effect larger than the simple model suggests: a rise in income and output may induce extra investment.

:::example{title="Evaluation paragraph"}
Spending on public works in a small economy with a high import content, such as one that imports most of its machinery and fuel, will have a smaller multiplier than the same spending in a large, closed economy, because a large share of each round leaks abroad. If the economy has a lot of unused capacity and unemployment, the output effect is larger. Therefore the multiplier is a useful guide to the likely effect of policy, but the forecast should be treated as an estimate that depends on spare capacity, leakages, timing and expectations.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect k = 1 ÷ MPW with MPW = MPS + MPT + MPM, and the closed-economy form 1 ÷ (1 − MPC). ZIMSEC (Form 6) writes the formula in terms of MPS, MRT and MPM and gives numerical questions; Cambridge (A Level) expects the multiplier process, calculations with simple data and an evaluation of its size and limits. Inflationary and deflationary gaps are in the next lesson.
:::

## Common mistakes

:::mistake{title="Using the wrong propensity"}
The multiplier is 1 ÷ MPS (closed economy), not 1 ÷ MPC. If the MPC is 0.8, k = 5, not 1.25.
:::

:::mistake{title="Forgetting the leakages"}
In an open economy with government, MPT and MPM must be included. Using 1 ÷ MPS alone overstates the multiplier.
:::

:::mistake{title="Treating the multiplier as instant and unlimited"}
The full effect takes time, and with spare capacity exhausted the extra demand raises prices more than output.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 2 usually asks you to calculate the multiplier from MPC, MPS, MRT or MPM data, or to find a change in income; Paper 3 essays ask you to discuss its usefulness. Cambridge Paper 3 contains short calculations, and Paper 4 asks about the effect of a rise in government spending or investment, with an evaluation of its limits.
:::

:::exam-tip{title="Command words"}
*Calculate*: write the formula, add all the withdrawals, invert, and multiply by the change in injection. *Explain*: describe the rounds of spending and the leakages. *Evaluate*: weigh spare capacity, leakages, time lags, crowding out and expectations.
:::

## Summary

:::summary
- The multiplier is the ratio of the change in national income to the initial change in injections.
- k = 1 ÷ MPS in a closed economy without government; generally k = 1 ÷ (MPS + MPT + MPM).
- Change in income = k × change in injections; the effect works in reverse for a fall.
- Higher leakages (saving, tax, imports) reduce the multiplier.
- Time lags, limited spare capacity, crowding out and changing propensities limit the size and speed of the effect.
:::
