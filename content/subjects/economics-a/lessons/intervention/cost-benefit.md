---
{
  "key": "intervention.cost-benefit",
  "title": "Cost-benefit analysis: weighing the full costs and benefits of a project",
  "summary": "Identify private and social costs and benefits, value intangibles, discount future values to present values, apply the decision rule using net present value and the benefit-cost ratio, and evaluate the limitations of cost-benefit analysis.",
  "concepts": ["aecon.intervention.cost-benefit"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A district council is deciding whether to build a rural clinic, a small dam, or a road to a market town. Each costs a great deal now and brings benefits over many years: healthier families, irrigation, shorter journeys. A private firm would ask only whether the project makes a profit. The council must also count the benefits to people who do not pay, the harm to people who are affected, and the fact that US\$100 received in five years is worth less than US\$100 today. **Cost-benefit analysis (CBA)** is the method that does this.

You should already know about private, external and social costs and benefits, and about opportunity cost. The lesson on externalities shows how markets ignore external effects, which is a main reason why governments use CBA when they decide how to use public money.

## Key definitions

:::definition{term="Cost-benefit analysis (CBA)"}
A method of appraising a project or policy by listing all its costs and benefits to society, valuing them in money terms, adjusting for the time at which they occur, and comparing the totals to decide whether the project is worthwhile.
:::

:::definition{term="Social costs and benefits"}
The private costs and benefits to the people directly involved, plus the external costs and benefits to everyone else.
:::

:::definition{term="Discounting"}
Converting a future amount of money into its equivalent value today (its **present value**) by dividing by (1 + r)ⁿ, where r is the discount rate as a decimal and n is the number of years.
:::

:::definition{term="Net present value (NPV)"}
The present value of all the benefits minus the present value of all the costs of a project.
:::

:::keyfact{title="Formulae and decision rule"}
Present value = future value ÷ (1 + r)ⁿ.
NPV = PV of benefits − PV of costs. Benefit-cost ratio (BCR) = PV of benefits ÷ PV of costs.
Accept a project if NPV > 0 (BCR > 1). Where funds are limited, rank projects by NPV (or BCR).
:::

## The steps of a CBA

1. **Identify** the project and the alternatives, including doing nothing.
2. **List** all the costs and benefits to society: private (construction, running costs, fares saved) and external (noise, pollution, lost farmland, time saved by others).
3. **Value** them in money. Costs and benefits traded in markets use market prices (possibly adjusted for distortions). **Intangibles** have no market price, so economists estimate them, for example by the value of time saved (using wages), by what people say they would be willing to pay, or by the cost of the damage avoided. These estimates are uncertain.
4. **Discount** the future values to present values, using a discount rate that reflects the opportunity cost of funds and people's preference for benefits sooner.
5. **Compare** the totals and apply the decision rule.
6. **Test** the result: ask how sensitive it is to the discount rate and to the main estimates, and who gains and who loses.

## Why discount?

People prefer to have money now rather than later, and money available now can be invested to earn a return. If funds can earn 10% a year, US\$1,000 received in two years is worth only US\$1,000 ÷ 1.1² = US\$826.45 today. The higher the discount rate, the smaller the present value of future benefits, and the harder it is for projects with large early costs and late benefits (such as dams and forests) to pass the test.

## A worked example: a rural clinic

A council is considering a clinic (fictional; US\$ thousand). The cost of building it is US\$500 thousand now (year 0) and the running cost is US\$60 thousand in each of the next five years. The estimated benefits (savings in treatment, healthier workers and time saved) are US\$150, 180, 200, 200 and 200 thousand in years 1 to 5.

:::worked-solution{title="Without discounting"}
1. Total costs = 500 + 5 × 60 = **US\$800 thousand**.
2. Total benefits = 150 + 180 + 200 + 200 + 200 = **US\$930 thousand**.
3. Net benefit = 930 − 800 = US\$130 thousand, so the project seems worthwhile. But this adds money received in different years as if it were all worth the same, which is misleading.
:::

At a discount rate of 5% each amount is divided by 1.05ⁿ. (Cells are rounded to one decimal place; the totals below are calculated from unrounded values.)

| Year | Costs (US\$ thousand) | Benefits (US\$ thousand) | Discount factor at 5% | PV of costs | PV of benefits |
| --- | ---: | ---: | ---: | ---: | ---: |
| 0 | 500 | 0 | 1.000 | 500.0 | 0.0 |
| 1 | 60 | 150 | 0.952 | 57.1 | 142.9 |
| 2 | 60 | 180 | 0.907 | 54.4 | 163.3 |
| 3 | 60 | 200 | 0.864 | 51.8 | 172.8 |
| 4 | 60 | 200 | 0.823 | 49.4 | 164.5 |
| 5 | 60 | 200 | 0.784 | 47.0 | 156.7 |

:::worked-solution{title="Discounting at 5% and at 10%"}
1. At 5%: PV of costs = **US\$759.8 thousand**; PV of benefits = **US\$800.1 thousand**.
2. NPV = 800.1 − 759.8 = **+US\$40.4 thousand** (using unrounded values). BCR = 800.1 ÷ 759.8 = **1.05**. NPV is positive, so accept.
3. At 10%: PV of costs = US\$727.4 thousand and PV of benefits = US\$696.2 thousand. NPV = **−US\$31.3 thousand** and BCR = **0.96**. NPV is negative, so reject.
4. The same project passes at 5% and fails at 10%. The costs fall early and the benefits come later, so a higher discount rate hurts the project. The choice of discount rate is therefore a key judgement.
:::

:::worked-solution{title="Comparing two projects"}
Two alternative water projects (illustrative, US\$ thousand, discounted at 8%). Project P costs 200 now and 20 a year for three years, and brings benefits of 110 a year for three years. Project Q costs 100 now and 10 a year for three years, and brings benefits of 50, 60 and 60.
1. Project P: PV of costs = **251.5**; PV of benefits = **283.5**; NPV = **+31.9**; BCR = **1.13**.
2. Project Q: PV of costs = **125.8**; PV of benefits = **145.4**; NPV = **+19.6**; BCR = **1.16**.
3. Both pass (NPV > 0). If the projects are alternatives and the council can afford either, it chooses the one with the higher NPV, **P**, because it adds more to the welfare of society.
4. If funds are short, Q gives more benefit per dollar spent (a higher BCR), so ranking by BCR may favour it. NPV and BCR can rank projects differently.
:::

## Private and social views

A private firm building a toll road would count only the tolls it collects and its costs. A CBA of the same road counts the time saved by all road users, lower vehicle costs, fewer accidents, extra trade for local businesses, and also the noise and pollution endured by people who live nearby, and the farmland lost. Some of these are external benefits or costs; some are intangibles. A project that makes a loss to a firm may have a positive NPV for society, which is a reason why governments provide some goods.

:::example{title="Evaluation paragraph"}
Cost-benefit analysis makes decisions more transparent: it forces a council to list all the effects and to compare them in a common unit, which helps it use scarce funds where they do the most good. However, its accuracy depends on estimates. Putting a money value on health, time or damage to the environment is uncertain; the choice of discount rate can reverse the decision; benefits that arrive in the distant future are heavily discounted; and the gains and losses may fall on different groups, so that a positive NPV for the country as a whole may leave some people worse off. A CBA should therefore inform the decision, not make it: policy-makers should also consider fairness, risk and other objectives, and test how sensitive the result is to the key assumptions.
:::

## Limitations

- **Valuing intangibles** such as health, life, scenery and cultural sites is difficult and contested.
- **The discount rate** is a judgement, and small changes can reverse the result, especially for long projects.
- **Uncertainty**: future costs and benefits may be wrongly forecast; costs often overrun.
- **Distribution**: it adds up gains and losses without asking who receives them, unless weights are used.
- **Incomplete lists**: some effects may be missed or counted twice, and the analysis may be biased by those who commission it.
- **Cost**: a full CBA takes time and money.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the principle, the identification of private and social costs and benefits, the valuation of intangibles and the limitations. ZIMSEC (Form 6) also expects discounting and net present value with a worked example. Cambridge (A Level) names the use of costs and benefits in analysing decisions and does **not** require net present value, so the calculations here are a ZIMSEC detail that Cambridge students may use as support.
:::

## Common mistakes

:::mistake{title="Adding up costs and benefits across years without discounting"}
Money in the future is worth less than money today. Compare **present values**, not the raw totals.
:::

:::mistake{title="Discounting the wrong way"}
A future amount is **divided** by (1 + r)ⁿ. Multiplying it would give a future value, not a present value.
:::

:::mistake{title="Leaving out external costs and benefits"}
A CBA is a social appraisal. Counting only the money flows to the builder gives a private appraisal.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 2 may give a table of costs and benefits over several years to discount; Papers 1 and 3 ask for the meaning, steps and limitations. Cambridge Paper 3 tests the idea and the limitations in multiple choice; Paper 4 essays ask you to evaluate the usefulness of CBA for a decision such as a new airport or road.
:::

:::exam-tip{title="Command words"}
*Define*: say all costs and benefits to society. *Calculate*: divide each year's amount by (1 + r)ⁿ, add, and compare. *Explain*: give the steps and the reason for discounting. *Evaluate*: weigh the usefulness against the problems of valuation and the discount rate, and give a judgement.
:::

## Summary

:::summary
- CBA values all private and external costs and benefits of a project to society and compares them.
- Intangibles must be estimated, which is uncertain.
- Future amounts are discounted: PV = FV ÷ (1 + r)ⁿ; a higher discount rate lowers the value of later benefits.
- Accept a project if NPV > 0 (BCR > 1); rank projects by NPV when funds are limited.
- CBA helps to make decisions transparent but depends on estimates, the discount rate and judgements about who gains and loses.
:::
