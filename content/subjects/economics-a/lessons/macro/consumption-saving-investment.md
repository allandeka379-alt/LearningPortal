---
{
  "key": "macro.consumption-saving-investment",
  "title": "Consumption, saving and investment functions",
  "summary": "Use the consumption function C = a + bY, calculate average and marginal propensities to consume, save, import and tax, explain the determinants of consumption, saving and investment, and apply the accelerator.",
  "concepts": ["aecon.macro.consumption-saving-investment"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

Aggregate demand is made up of consumption (C), investment (I), government spending (G) and net exports (X − M). Consumption is by far the largest part in most economies, and investment is the most unstable. How much households spend out of an extra dollar, and why firms invest more in some years than others, helps explain how national income is determined (the next lessons: the multiplier and income gaps) and why economies move through cycles.

You should know the circular flow, the difference between injections and withdrawals, and how to read a table of data. The lesson uses a little algebra: a straight-line function with an intercept and a slope.

## Key definitions

:::definition{term="Consumption function"}
The relationship between households' planned consumption spending and its determinants, mainly disposable income. In the simplest form C = a + bY, where a is autonomous consumption, b is the marginal propensity to consume and Y is income.
:::

:::definition{term="Autonomous and induced consumption"}
**Autonomous consumption (a)** is spending that does not depend on current income (for example spending from past savings or credit when income is zero). **Induced consumption (bY)** is the part that varies with income.
:::

:::definition{term="Propensities"}
**Average propensity to consume (APC)** = C ÷ Y. **Marginal propensity to consume (MPC)** = ΔC ÷ ΔY. The marginal propensities to save (MPS), import (MPM) and tax (MPT) are ΔS ÷ ΔY, ΔM ÷ ΔY and ΔT ÷ ΔY. All are measured as fractions of the change in national income.
:::

:::keyfact{title="Key relationships"}
Y = C + S (in a closed economy without government, disposable income is consumed or saved).
APC + APS = 1 and MPC + MPS = 1 (without taxes or imports).
With a government and trade, measure every propensity as a fraction of the change in national income: MPC + MPS + MPT = 1 (MPC includes spending on imports), and the part of spending that leaks abroad is MPM, so spending on home-produced goods = MPC − MPM.
If C = a + bY, then S = Y − C = −a + (1 − b)Y, where b is the MPC and (1 − b) the MPS.
:::

## The consumption and saving functions

In a fictional economy, consumption is C = 40 + 0.8Y (US\$ billion). At zero income households still consume 40 (autonomous consumption), financed by dissaving. For each extra US\$1 of income they spend US\$0.80 and save US\$0.20.

| National income Y | Consumption C | Saving S | APC | APS | MPC |
| --- | ---: | ---: | ---: | ---: | ---: |
| 0 | 40 | −40 | – | – | – |
| 100 | 120 | −20 | 1.20 | −0.20 | 0.80 |
| 200 | 200 | 0 | 1.00 | 0.00 | 0.80 |
| 300 | 280 | 20 | 0.93 | 0.07 | 0.80 |
| 400 | 360 | 40 | 0.90 | 0.10 | 0.80 |
| 500 | 440 | 60 | 0.88 | 0.12 | 0.80 |

:::worked-solution{title="Reading the consumption and saving functions"}
1. **MPC** = ΔC ÷ ΔY = (200 − 120) ÷ (200 − 100) = **0.8**, the slope of the function, constant along a straight line.
2. **Saving function:** S = Y − C = Y − (40 + 0.8Y) = **−40 + 0.2Y**. MPS = 0.2, and MPC + MPS = 1.
3. **Break-even income** (C = Y, S = 0): 40 + 0.8Y = Y, so 40 = 0.2Y and Y = **200**.
4. **APC** falls as income rises (1.20 at Y = 100, 0.90 at Y = 400) because the autonomous part becomes less important relative to income, while MPC stays at 0.8.
5. Now add a government and trade. Suppose households spend 0.8 of each extra dollar of **disposable** income, the marginal tax rate is 20% and imports are 0.10 of each extra dollar of national income. Of an extra US\$1 of national income: tax = **0.20**; disposable income = 0.80; consumption = 0.8 × 0.80 = **0.64**; saving = 0.16; so MPC + MPS + MPT = 0.64 + 0.16 + 0.20 = 1. Imports are 0.10, so spending on home goods = 0.64 − 0.10 = **0.54**. The leakages are saving 0.16 + tax 0.20 + imports 0.10 = 0.46, and 0.54 + 0.46 = 1.
:::

![Consumption and saving functions for C = 40 + 0.8Y: the consumption line starts at 40 when income is zero and crosses the 45-degree line (C = Y) at the break-even income of 200, below which households dissave; the saving function S = -40 + 0.2Y starts at -40 and crosses zero at Y = 200, with slopes MPC 0.8 and MPS 0.2.](media:diagrams/consumption-saving-functions.png "Figure: the consumption function against the 45-degree line and the matching saving function, both break even at Y = 200")

A change in income causes a **movement along** the consumption function. A change in any other determinant shifts the whole function (a changes).

### Determinants of consumption and saving

- **Disposable income**: income after tax and transfers: the main determinant.
- **Wealth**: higher house or share prices make households feel richer and spend more.
- **Interest rates**: higher rates reward saving and raise the cost of credit-financed purchases, so consumption falls.
- **Availability of credit** and **consumer confidence** about jobs and future income.
- **Expectations of inflation** (buy now before prices rise) and **the distribution of income** (poorer households spend a higher share of their income, so a transfer to the poor raises total consumption).
- **Age structure and culture**; **taxes**, which change disposable income.

Saving is influenced by the same determinants in the opposite direction; households also save for retirement, emergencies and large purchases. In economies with weak banks and high inflation, savings may be held in assets such as livestock, property or foreign currency.

## Investment

:::definition{term="Investment"}
Spending by firms (and government) on capital goods such as machinery, buildings and infrastructure, and on increases in stocks. It is a flow that adds to the capital stock. It is not the purchase of shares or a bank deposit, which are financial transactions.
:::

**Autonomous investment** does not depend on current income or output (for example government infrastructure and investment based on long-term expectations). **Induced investment** depends on the level or change of national income or output.

**Determinants of investment:**

1. **The rate of interest** is the cost of borrowing and the opportunity cost of using retained profits: a lower rate raises investment.
2. **Expected profits and business confidence** (animal spirits): firms invest if they expect demand and profits to rise.
3. **Changes in output and demand** (the accelerator, below).
4. **Technology**: new technology creates opportunities for investment.
5. **Corporate taxes and subsidies**; government policy, regulation and stability.
6. **Availability of finance** (credit, retained profits, foreign investment).
7. **Risk and uncertainty**, including political stability and security of property.

### The accelerator

:::definition{term="Accelerator"}
The principle that net investment depends on the rate of change of national output: induced investment = capital–output ratio (v) × change in output (ΔY). The capital–output ratio is the amount of capital needed to produce one unit of output.
:::

| Year | Output | Change in output | Induced investment (v = 3) |
| --- | ---: | ---: | ---: |
| 1 | 100 | – | – |
| 2 | 110 | 10 | 30 |
| 3 | 114 | 4 | 12 |
| 4 | 114 | 0 | 0 |
| 5 | 120 | 6 | 18 |

:::worked-solution{title="The accelerator in action"}
1. Year 2: output rises by 10, so induced investment = 3 × 10 = **30**.
2. Year 3: output still rises, but only by 4, so investment = 3 × 4 = **12**, a fall of 18 although output is higher than ever.
3. Year 4: output is unchanged, so net induced investment is **zero**.
4. Year 5: output rises by 6, so investment recovers to **18**.
5. Investment therefore swings more than output, which helps to explain the trade cycle. Limitations: firms may have spare capacity, may be unable to finance or build capital at once, and expectations matter.
:::

![Accelerator with capital-output ratio 3: induced investment is 30 in year 2 when output rises by 10, falls to 12 in year 3 when output rises by only 4, is zero in year 4 when output is unchanged and recovers to 18 in year 5 when output rises by 6.](media:diagrams/accelerator-investment.png "Figure: investment responds to the change in output, so it falls even while output is still rising (year 3) and is zero when output is flat (year 4)")

## Other components of aggregate demand

**Government spending (G)** is set by policy decisions (budgets, programmes), and is largely autonomous: it is not directly determined by income, although tax revenue is. **Net exports (X − M)**: exports depend mainly on world income and the competitiveness of home goods, and are autonomous with respect to home income; imports depend on home income (the MPM), prices and the exchange rate. So AD = C + I + G + (X − M).

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the consumption and saving functions, the propensities and the determinants of investment. ZIMSEC (Form 6) states the average and marginal propensities explicitly; Cambridge (A Level) expects the autonomous and induced split and the accelerator. The multiplier uses these propensities in the next lesson.
:::

## Common mistakes

:::mistake{title="Confusing average and marginal propensities"}
APC is C ÷ Y (total) and MPC is ΔC ÷ ΔY (the extra). In a straight-line function the MPC is constant, while the APC changes.
:::

:::mistake{title="Treating the purchase of shares as investment"}
In economics investment means spending on capital goods. Buying shares or putting money in a bank is saving or a financial transaction.
:::

:::mistake{title="Thinking that investment depends on the level of output in the accelerator"}
Induced investment depends on the **change** in output, so it can fall even when output is rising.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 2 may give a consumption schedule to find MPC, MPS and APC, or a function C = a + bY. Cambridge Paper 3 asks for propensities, a shift or movement of the function, or the accelerator in short calculations; Paper 4 uses them within the multiplier and cycle questions.
:::

:::exam-tip{title="Command words"}
*Calculate*: write the formula first (ΔC ÷ ΔY) and show the numbers. *Distinguish* movement from shift. *Explain*: link the determinant to C or I through a chain of effects. *Evaluate*: consider the strength and reliability of each determinant, for example confidence against interest rates.
:::

## Summary

:::summary
- C = a + bY: a is autonomous consumption and b the MPC; S = −a + (1 − b)Y.
- APC = C ÷ Y, MPC = ΔC ÷ ΔY; MPC + MPS = 1, and with a government MPC + MPS + MPT = 1 (propensities as fractions of national income); imports are a leakage from spending.
- A change in income moves along the function; a change in wealth, interest rates, credit or confidence shifts it.
- Investment depends on interest rates, expected profits, output changes, technology, taxes and finance.
- The accelerator: induced investment = v × ΔY, so investment swings more than output.
:::
