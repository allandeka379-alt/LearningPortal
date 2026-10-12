import { table, chk, r2, sum, invest } from "../lib.mjs";
import { F, usd, p1, p2, writeLesson, front } from "./w4b-lib.mjs";

const rates = [10, 12, 15, 20];
const dfTab = table(["Year", ...rates.map((r) => `${r}%`)], [1, 2, 3, 4, 5].map((y) => [`${y}`, ...rates.map((r) => invest.df(r, y, 3).toFixed(3))]), ["l", "r", "r", "r", "r"]);

// Example 1
const out1 = 50000, f1 = [16000, 20000, 22000, 14000], rate1 = 12;
const dfs1 = f1.map((_, i) => invest.df(rate1, i + 1, 3));
const pv1 = f1.map((f, i) => r2(f * dfs1[i]));
const totalPV1 = sum(pv1);
const npv1 = invest.npv(rate1, out1, f1);
chk(totalPV1, 54796); chk(npv1, 4796);
const t1 = table(["Year", "Net cash flow US\\$", `Discount factor at ${rate1}%`, "Present value US\\$"], [
  ["0", `(${F(out1)})`, "1.000", `(${F(out1)})`],
  ...f1.map((f, i) => [`${i + 1}`, F(f), dfs1[i].toFixed(3), F(pv1[i])]),
  ["**Net present value**", "", "", `**${F(npv1)}**`],
], ["l", "r", "r", "r"]);

// Example 2: IRR
const out2 = 60000, f2 = [25000, 28000, 30000];
const npvL = invest.npv(10, out2, f2), npvH = invest.npv(20, out2, f2);
chk(npvL, 8383); chk(npvH, -2373);
const irr = invest.irrInterpolated(10, 20, npvL, npvH);
chk(irr, 10 + (8383 / (8383 + 2373)) * 10, 1e-9);
const row2 = (rate) => f2.map((f, i) => r2(f * invest.df(rate, i + 1, 3)));
const t2 = table(["Year", "Net cash flow US\\$", "Factor at 10%", "PV at 10% US\\$", "Factor at 20%", "PV at 20% US\\$"], [
  ["0", `(${F(out2)})`, "1.000", `(${F(out2)})`, "1.000", `(${F(out2)})`],
  ...f2.map((f, i) => [`${i + 1}`, F(f), invest.df(10, i + 1, 3).toFixed(3), F(row2(10)[i]), invest.df(20, i + 1, 3).toFixed(3), F(row2(20)[i])]),
  ["**NPV**", "", "", `**${F(npvL)}**`, "", `**(${F(-npvH)})**`],
], ["l", "r", "r", "r", "r", "r"]);
const npvAt = (r) => invest.npv(r, out2, f2);

const body = `
## Introduction

A bakery in Mutare can spend US\\$50,000 today on a new oven, or keep the money in the bank and earn interest. The oven will bring in cash over the next four years, but a dollar received in four years' time is worth less than a dollar today, because the dollar today could be invested, and because the future is uncertain. Payback and ARR ignore this **time value of money**. The **net present value (NPV)** and the **internal rate of return (IRR)** methods deal with it by *discounting* future cash flows to their value today. The lesson is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4). Discount factors are always printed in the question; you do not need to derive them. Discounted payback is not examined.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Net present value (NPV); present value | Net present value (NPV); present value |
| Internal rate of return (IRR) | Internal rate of return (IRR) |
| Discount factor; discounting; cost of capital | Discount factor; discount rate; cost of capital |
| Cash flows occur at the end of each year | Cash flows occur at the end of each year unless the question states otherwise |
:::

## Key definitions

:::definition{term="Time value of money"}
The idea that money received today is worth more than the same amount received later, because it can be invested to earn a return and because the future is uncertain.
:::

:::definition{term="Discount factor"}
The number by which a future cash flow is multiplied to give its present value: 1 ÷ (1 + r)ⁿ for a rate r and n years. Factors are supplied in a table in the question.
:::

:::definition{term="Net present value (NPV)"}
The total present value of a project's future cash inflows less the initial outlay (and any outflows). A project with a positive NPV adds value and is accepted; a negative NPV means reject.
:::

:::definition{term="Internal rate of return (IRR)"}
The discount rate at which the NPV of a project is zero. A project is acceptable if its IRR is greater than the cost of capital (the required return).
:::

:::keyfact
Present value = cash flow × discount factor. NPV = sum of present values of inflows - initial outlay (outlay is at time 0, factor 1.000). IRR by interpolation = lower rate + [NPV at lower rate ÷ (NPV at lower rate - NPV at higher rate)] × (higher rate - lower rate), where one NPV is positive and the other negative.
:::

## Discounting

A cash flow of US\\$16,000 received at the end of year 1, discounted at 12%, is worth 16,000 × 0.893 = US\\$14,288 today. The factors for later years are smaller. Use the table supplied in the question and do not round the present values beyond the nearest dollar unless the question says so. Treat the initial outlay as occurring now (year 0), so its factor is 1.000. Use **cash flows**, not profits, and exclude depreciation. The following factors are an example of a table that may be supplied.

${dfTab}

## Net present value

1. List the net cash flow of each year (outlay at year 0 as a negative).
2. Multiply each by its discount factor.
3. Add the present values; the total is the NPV.
4. Accept if NPV > 0 (the project earns more than the cost of capital); reject if NPV < 0.

:::worked-solution[Example 1: the NPV of an oven at 12%]
A Mutare bakery's cost of capital is 12%. The oven costs ${usd(out1)} and gives net cash inflows of ${f1.map((x) => usd(x)).join(", ")} in years 1 to 4.

${t1}

NPV = ${usd(totalPV1)} - ${usd(out1)} = **${usd(npv1)}**. The NPV is positive, so the oven earns more than 12% and should be accepted on this method. The interpretation matters: the project adds US\\$4,796 of value (in today's money) over and above a 12% return.
:::

## Internal rate of return

The IRR is the rate where NPV = 0. Examination questions ask you to calculate NPVs at two rates (one giving a positive NPV and one a negative NPV) and then to **interpolate**. This assumes the NPV changes in a straight line between the two rates, so the answer is an estimate. If the rate chosen is too far from the answer, the estimate is less accurate. Compare the IRR with the cost of capital: accept if the IRR exceeds it.

:::worked-solution[Example 2: the IRR of a delivery van]
A Chinhoyi transport firm can buy a van for ${usd(out2)}. Net cash inflows are ${f2.map((x) => usd(x)).join(", ")} in years 1 to 3. Factors at 10% and 20% are supplied in the table above.

${t2}

At 10% the NPV is ${usd(npvL)} (positive); at 20% it is ${usd(-npvH)} negative. The IRR lies between 10% and 20%:

IRR = 10 + [${F(npvL)} ÷ (${F(npvL)} + ${F(-npvH)})] × (20 - 10) = 10 + 0.78 × 10 = **${p1(irr)}%**.

If the firm's cost of capital is 15%, the IRR of ${p1(irr)}% is higher and the project is acceptable; if its cost of capital is 18% the project is rejected.
:::

## Cost of capital and the decision rules

The **cost of capital** is the return the business must earn to satisfy its investors and lenders. It is the discount rate in NPV and the cut-off in IRR. NPV > 0 and IRR > cost of capital always give the same decision for a single project. They can disagree when ranking mutually exclusive projects of different size (see the lesson on evaluation).

## Advantages and disadvantages

| Method | Advantages | Disadvantages |
| --- | --- | --- |
| NPV | Takes account of the time value of money and the whole life; uses cash flows; the result is in dollars, showing the value added | Harder to understand; depends on the cost of capital chosen; forecasts are uncertain |
| IRR | Gives a percentage that is easy to compare with the cost of capital; no discount rate is needed to compute it | Interpolation is only an estimate; harder to compute; can be misleading when ranking projects of different size |
| Both | More theoretically sound than payback and ARR | Need reliable forecasts; ignore non-financial factors |

## Common mistakes

:::mistake{title="Discounting the initial outlay"}
The outlay is paid now, at time 0, so its discount factor is 1.000. Do not discount it by the year-1 factor.
:::

:::mistake{title="Using profits instead of cash flows"}
Discount net cash flows. Depreciation is not a cash flow and must not be deducted. Do not add it back either unless profits are given.
:::

:::mistake{title="Wrong sign in the IRR interpolation"}
The two NPVs must have opposite signs. In the formula use the positive NPV divided by the **difference** between the two NPVs (their absolute values added).
:::

:::mistake{title="Saying the IRR is exact"}
Interpolation assumes a straight line between two points, so the answer is an approximation. State this when asked to comment.
:::

## Exam tips

:::exam-tip
NPV and IRR appear in ZIMSEC Papers 2 and 3 (Form 6) and in Cambridge Paper 4 (A Level only). The discount factors are given. For *calculate NPV*, use a table with the year, cash flow, factor and present value, include the outlay at year 0, and state whether to accept. For *calculate IRR*, show both NPVs and the interpolation formula with numbers.
:::

:::exam-tip
For *comment* or *evaluate*, compare the NPV with zero or the IRR with the cost of capital, say what that means, add one advantage and one weakness of the method (uncertain forecasts, choice of discount rate) and a non-financial factor. A positive NPV means the project earns more than the required return, not that it is risk-free.
:::

## Summary

:::summary
- Money received later is worth less than money received now, so future cash flows are discounted with the factors supplied.
- NPV = present value of inflows - initial outlay; accept if positive.
- IRR is the discount rate at which NPV is zero; estimate it by interpolating between a positive and a negative NPV; accept if IRR exceeds the cost of capital.
- Use cash flows (not profits) and treat the outlay as occurring at time 0.
- NPV and IRR account for the time value of money, but depend on uncertain forecasts and an estimated cost of capital.
:::
`;
writeLesson("invest/npv-irr.md", front("invest.npv-irr", "Net present value and internal rate of return", "Discount cash flows with supplied factors to find the net present value, estimate the internal rate of return by interpolation, and decide whether to accept a project against the cost of capital.", "aacc.invest.npv-irr", 55), body);
void npvAt; void p2;
