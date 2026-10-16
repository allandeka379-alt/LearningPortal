---
{
  "key": "invest.npv-decisions",
  "title": "Net present value and investment decisions",
  "summary": "Discounting, calculating NPV from a supplied discount factor table, interpreting the result, and weighing quantitative and qualitative factors when comparing investment appraisal methods.",
  "concepts": [
    "abus.invest.npv-decisions"
  ],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Nyasha Chirwa owns a fictional irrigation-equipment business in Masvingo. A bank will lend her money at 10% a year, and a supplier offers her a solar-powered pumping system for US\$46,000 that should bring in extra cash for four years. If the bank would pay her 10% for keeping the money, then US\$13,500 received in a year's time is **not worth as much** as US\$13,500 today: she could have put today's money in the bank and earned interest. Payback and ARR treat all dollars equally, wherever they fall in time. **Net present value (NPV)** corrects this by converting future cash flows to what they are worth today.

This lesson is tested in ZIMSEC Business Studies and Business Enterprise Skills (Form 6) and in Cambridge **A Level** Paper 3 and Paper 4. In every examination question the **discount factors are supplied** in a table; you are not asked to calculate them, to use IRR or to discount the payback period. You should already know payback and ARR.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Net present value; discounted cash flow; discount rate; qualitative factors including political, legal and economic factors and investor confidence | Net present value (NPV); discount factor; investment decisions: quantitative and qualitative factors |

Both boards use the same NPV method. ZIMSEC questions often ask explicitly for political, legal and economic factors and investor confidence as qualitative influences on an investment.
:::

## Key definitions

:::definition{term="Discounting"}
Converting a future sum of money to its equivalent value today, because money received sooner can be put to use and so is worth more than the same sum received later.
:::

:::definition{term="Discount factor"}
The number by which a future cash flow is multiplied to give its present value, for a given year and discount rate.
:::

:::definition{term="Net present value (NPV)"}
The sum of the present values of a project's future net cash flows less the initial outlay.
:::

:::definition{term="Discount rate"}
The annual percentage used to discount future cash flows, usually the cost of finance or the return that could be earned elsewhere.
:::

## Why discount?

Money received in the future is worth less than money received now because:

- **opportunity cost**: money today can be invested to earn interest;
- **inflation** reduces what a sum can buy later;
- **risk**: a future cash flow may not arrive.

The discount rate puts these effects into one percentage. A higher rate reduces present values more, and distant flows are reduced most.

## Calculating NPV

:::keyfact{title="NPV"}
- Present value of a cash flow = net cash flow × discount factor for that year.
- NPV = total of the present values of the inflows − the initial outlay (which occurs now, in year 0, and has a factor of 1.000).
- Use the factors in the table in the question; keep the working to two decimal places of a dollar.
:::

The factors below (to three decimal places) are the kind of table a question would supply.

| Year | 10% | 15% |
| --- | ---: | ---: |
| Year 1 | 0.909 | 0.870 |
| Year 2 | 0.826 | 0.756 |
| Year 3 | 0.751 | 0.658 |
| Year 4 | 0.683 | 0.572 |
| Year 5 | 0.621 | 0.497 |

## Using NPV to decide

- If **NPV is positive**, the project earns more than the discount rate: it adds value and should be accepted if it meets other criteria.
- If **NPV is negative**, the project earns less than the discount rate and should be rejected.
- When choosing between projects, a higher NPV is better, other things equal.

**Advantages of NPV:** it uses all the cash flows over the whole life; it allows for the **time value of money**; it gives a clear accept or reject rule in dollars. **Limitations:** it is more complex and harder to explain to non-specialists; the result depends heavily on the **discount rate chosen**, which is itself an estimate; forecasts of cash flow far in the future are unreliable; it does not show how quickly cash returns (liquidity) or how large a project is, so a big project can show a bigger NPV than a better small one.

## Quantitative and qualitative factors

Numbers do not make the decision on their own. A manager must also consider:

- **risk and uncertainty** in the forecasts, and the cost of being wrong;
- **finance available**: can the business raise the outlay, and can it survive a slow start (payback matters here)?;
- **political and legal factors**, such as a change in government policy, licensing or labour legislation (ZIMSEC emphasises these);
- **economic factors**, such as inflation, exchange rates, interest rates and demand, and **investor confidence**;
- **strategic fit**, **social and environmental effects**, and the reaction of **stakeholders** such as employees and the community.

### Comparing the methods

| Method | Strength | Weakness |
| --- | --- | --- |
| Payback | Simple; shows liquidity and suits risk | Ignores later cash and the value of time |
| ARR | Uses all flows; gives a percentage | Ignores timing; depends on basis |
| NPV | Uses all flows and the time value of money | Needs a discount rate; complex; ignores liquidity |

Most businesses use more than one method together.

:::worked-solution[Example 1: calculating NPV]
**Context.** Nyasha's pumping system costs US\$46,000. The expected net cash inflows are US\$13,500, US\$16,500, US\$18,000 and US\$17,000 in years 1 to 4. The discount rate is 10%.

| Year | Net cash flow (US\$) | Discount factor (10%) | Present value (US\$) |
| --- | ---: | ---: | ---: |
| Year 0 | (46,000) | 1.000 | (46,000) |
| Year 1 | 13,500 | 0.909 | 12,271.50 |
| Year 2 | 16,500 | 0.826 | 13,629 |
| Year 3 | 18,000 | 0.751 | 13,518 |
| Year 4 | 17,000 | 0.683 | 11,611 |
| **Net present value** |  |  | 5,029.50 |

1. Present value of year 1 = 13,500 × 0.909 = US\$12,271.50; year 2 = 16,500 × 0.826 = US\$13,629; year 3 = 18,000 × 0.751 = US\$13,518; year 4 = 17,000 × 0.683 = US\$11,611.
2. Total present value of the inflows = US\$51,029.50.
3. **NPV = 51,029.50 − 46,000 = US\$5,029.50.**
4. **Interpretation.** The NPV is positive, so the project earns more than 10% a year and adds about US\$5,030 of value in today's money.
5. **Judgement.** She should go ahead, subject to risk. The undiscounted total of the inflows is US\$65,000, which is much more than the NPV of US\$5,029.50, showing how discounting reduces later cash. If the true rate were higher the NPV would fall, so she should test her forecasts of water demand.
:::

:::worked-solution[Example 2: case analysis, two projects and the discount rate]
**Context.** A fictional transport company in Gweru must choose between two vehicle projects, each costing US\$60,000. Cost of finance is 10%. Discount factors are as in the table above.

| US\$ unless stated | Project P | Project Q |
| --- | ---: | ---: |
| Initial outlay | 60,000 | 60,000 |
| Year 1 | 30,000 | 10,000 |
| Year 2 | 25,000 | 20,000 |
| Year 3 | 20,000 | 30,000 |
| Year 4 | 15,000 | 45,000 |
| NPV at 10% | 13,185 | 18,875 |
| NPV at 15% | 6,740 | 9,300 |
| Payback (years) | 2.25 | 3.00 |

**Point.** Project Q has the higher NPV at 10%, but P returns the cash faster.

**Application.** At 10% the NPV of Q is US\$18,875 against US\$13,185 for P. P pays back in 2.25 years against 3.00 for Q.

**Analysis.** Q's cash flows come late, so they are discounted more heavily, and the gap between the projects narrows as the rate rises: at 15% the NPVs are US\$9,300 for Q and US\$6,740 for P. Both stay positive, so both earn more than 15%, although Q depends more on its large year-4 cash flow.

**Judgement.** On NPV alone Q is better, and it remains better at 15%. But if the company is short of cash, or doubts the year-4 demand because of political or economic uncertainty, P's early cash flow makes it the safer choice. The decision therefore depends on how confident the company is in the forecast and how urgently it needs cash.
:::

## Common mistakes

:::mistake{title="Forgetting to subtract the outlay"}
The total of the present values of the inflows is not the NPV. Subtract the initial outlay, which is already in today's money.
:::

:::mistake{title="Discounting with the wrong year's factor"}
The cash flow of year 1 uses the year-1 factor, and so on. The outlay at the start has a factor of 1.000.
:::

:::mistake{title="Treating a positive NPV as a guarantee"}
NPV depends on forecast cash flows and the chosen discount rate. A positive NPV from optimistic forecasts is not safe. Discuss risk and qualitative factors in any evaluation.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 ask you to *calculate* NPV from a table and to *discuss* the qualitative factors; Cambridge Papers 3 and 4 ask you to *calculate*, *analyse*, *evaluate* and *advise*. Lay out the working in a table (cash flow, factor, present value), show the subtraction of the outlay and say what the sign of the NPV means. For *evaluate*, combine the NPV with payback, the sensitivity to the discount rate and at least two qualitative factors, and end with a recommendation.
:::

## Summary

:::summary
- Discounting converts future cash flows to today's value because money now can earn a return, inflation erodes value and the future is uncertain.
- NPV = sum of (cash flow × discount factor) − initial outlay; the factors are supplied in the question.
- A positive NPV means the project earns more than the discount rate and should be accepted; between projects, a higher NPV is better.
- NPV uses all cash flows and the time value of money, but depends on the discount rate and forecasts and ignores liquidity.
- Decisions also depend on qualitative factors such as risk, finance, political, legal and economic conditions, investor confidence and stakeholders.
- A good answer compares payback, ARR and NPV and recommends with a condition.
:::
