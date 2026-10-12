import { table, chk, r2, sum, invest } from "../lib.mjs";
import { F, usd, p1, p2, writeLesson, front } from "./w4b-lib.mjs";

const out = 80000, rate = 10;
const A = [50000, 40000, 20000], B = [20000, 30000, 40000, 50000, 40000];
const calc = (fl) => ({
  fl, total: sum(fl), pb: invest.payback(out, fl), arr: invest.arr(out, fl),
  pv: fl.map((f, i) => r2(f * invest.df(rate, i + 1, 3))), npv: invest.npv(rate, out, fl), irr: invest.irr(out, fl),
});
const a = calc(A), b = calc(B);
chk(a.pb, 1.75); chk(b.pb, 2.75); chk(a.arr, 25, 1e-9); chk(b.arr, 50, 1e-9);
chk(a.npv, 13510); chk(b.npv, 51990);
const pvA = sum(a.pv), pvB = sum(b.pv);
chk(pvA, 93510); chk(pvB, 131990);
const flexA = (a.npv / pvA) * 100, flexB = (b.npv / pvB) * 100;
const lowA = 0.8 * pvA - out, lowB = 0.8 * pvB - out;
chk(lowA, -5192, 0.01); chk(lowB, 25592, 0.01);
const t1 = table(["", "Machine A", "Machine B"], [
  ["Life (years)", "3", "5"],
  ["Net cash inflows (US\\$)", A.map(F).join("; "), B.map(F).join("; ")],
  ["Payback (years)", p2(a.pb), p2(b.pb)],
  ["ARR (%)", p1(a.arr), p1(b.arr)],
  ["Total present value at 10% (US\\$)", F(pvA), F(pvB)],
  ["**NPV at 10% (US\\$)**", `**${F(a.npv)}**`, `**${F(b.npv)}**`],
  ["IRR (%), exact", p1(a.irr), p1(b.irr)],
], ["l", "r", "r"]);
const t2 = table(["", "Machine A", "Machine B"], [
  ["NPV as forecast (US\\$)", F(a.npv), F(b.npv)],
  ["NPV if every inflow is 20% lower (US\\$)", `(${F(-lowA)})`, F(lowB)],
  ["Fall in inflows that makes NPV zero (%)", p1(flexA), p1(flexB)],
], ["l", "r", "r"]);
const tPf = table(["Year", "Net cash inflow US\\$", "Depreciation US\\$", "Accounting profit US\\$"], [
  ["1", F(30000), F(16000), F(14000)], ["2", F(30000), F(16000), F(14000)], ["3", F(30000), F(16000), F(14000)], ["4", F(30000), F(16000), F(14000)], ["5", F(30000), F(16000), F(14000)],
], ["l", "r", "r", "r"]);
chk(30000 - 80000 / 5, 14000);

const body = `
## Introduction

Zambezi Quarry can spend US\\$80,000 on one of two machines. Machine A returns its cost quickly but lasts only three years; Machine B takes longer to pay back but keeps earning for five. The previous two lessons gave four techniques: payback, ARR, NPV and IRR. Each looks at the same project differently, and they can disagree. A business owner must also remember that the figures are forecasts and that some factors cannot be turned into dollars. This lesson shows how to compare projects with several techniques, how to choose when they conflict, and how to write a reasoned recommendation. It is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4), and it is the usual final part of an investment appraisal question.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Mutually exclusive projects | Mutually exclusive projects: only one can be chosen |
| Risk and uncertainty; sensitivity | Risk and uncertainty in forecasts |
| Capital rationing | Limited capital: choose the best combination |
| Non-financial factors | Non-financial factors: employment, environment, strategy, reputation |
:::

## Key definitions

:::definition{term="Mutually exclusive projects"}
Projects of which only one can be chosen, for example two machines for the same job. The business must pick the best.
:::

:::definition{term="Risk and uncertainty"}
Risk is the possibility that results differ from the forecast when the probabilities can be estimated; uncertainty is the same when they cannot. Both increase for longer projects and distant years.
:::

:::definition{term="Sensitivity analysis"}
Recalculating the result (usually NPV) after changing one forecast, such as the inflows or the cost of capital, to see how much the decision depends on it.
:::

:::keyfact
Profit is not cash: payback, NPV and IRR use cash flows; ARR uses accounting profits (after depreciation). When techniques conflict, rank by NPV for a single financial decision (it measures the value added), but explain the other results and add risk and non-financial factors.
:::

## Comparing the techniques

| Technique | Uses | Shows | Weakness |
| --- | --- | --- | --- |
| Payback | Cash | Speed of recovery and liquidity | Ignores later flows and timing |
| ARR | Profit | Average annual return | Ignores timing, depends on depreciation |
| NPV | Cash, discounted | Value added in dollars | Needs a cost of capital; harder |
| IRR | Cash, discounted | Percentage return | Interpolated estimate; misleading for different sizes |

Profits differ from cash flows because of depreciation and timing. An investment of US\\$80,000 that brings US\\$30,000 in cash each year for five years has depreciation of US\\$16,000 a year, so the accounting profit is US\\$14,000.

${tPf}

The ARR (14,000 ÷ 40,000 = 35%) is based on profit; payback (80,000 ÷ 30,000 = 2.67 years) is based on cash. Neither is wrong; they answer different questions.

:::worked-solution[Example 1: choosing between Machine A and Machine B]
Each machine costs ${usd(out)} and the cost of capital is 10%. Machine A lasts three years; Machine B lasts five years. There is no residual value.

${t1}

Machine A pays back faster (${p2(a.pb)} against ${p2(b.pb)} years), so it is better if liquidity is the main concern. Machine B is better on ARR (${p1(b.arr)}% against ${p1(a.arr)}%), on NPV (${usd(b.npv)} against ${usd(a.npv)}) and on IRR (${p1(b.irr)}% against ${p1(a.irr)}%). NPV measures the dollar value added, so **Machine B** is preferred unless the owner cannot risk the longer wait for payback. The conflict arises because B earns for two more years, which payback ignores.
:::

## Risk, uncertainty and sensitivity

Forecasts of sales, costs and the life of an asset are never certain, and the further away the year, the less reliable they are. A longer project is usually riskier. Ways of dealing with risk: use a **shorter payback** target; add a **risk premium** to the discount rate; calculate the NPV under **optimistic, expected and pessimistic** forecasts; and use **sensitivity analysis** to find how far the inflows can fall before the NPV reaches zero. The fall that makes the NPV zero equals NPV ÷ total present value of inflows.

:::worked-solution[Example 2: how sensitive are the two machines?]
If every inflow is 20% lower than forecast:

${t2}

Machine A's NPV becomes negative, so its decision is more sensitive: a fall of only ${p1(flexA)}% in inflows would remove all its value. Machine B stays positive and could withstand a fall of ${p1(flexB)}%. B is therefore both better on the base forecast and more robust to errors.
:::

## Non-financial factors

Numbers do not capture everything. Consider **employment** (jobs created or lost), **the environment** (pollution, fuel use, waste), **business strategy** (does the project fit the long-term plan?), **reputation** and customer service, **reliability of the supplier**, **skills and training needed**, **flexibility** and **the effect on other products**. A project with a modest NPV may be preferred if it supports strategy; one with a high NPV may be rejected if it damages the environment or the firm's reputation. Limited funds (**capital rationing**) may also force the business to rank projects and choose the best set.

## Writing a recommendation

1. State the results of each technique, with the figures.
2. Explain any conflict and which technique is more reliable for this business (usually NPV).
3. Comment on risk: the length of the project, reliability of forecasts, sensitivity.
4. Add at least one non-financial factor.
5. Give a clear decision, supported by figures, with any conditions.

## Common mistakes

:::mistake{title="Choosing the project with the highest IRR without checking size"}
An IRR is a percentage. A small project can have a high IRR but add less value (NPV) than a larger project with a lower IRR. When the projects are mutually exclusive, rank by NPV.
:::

:::mistake{title="Treating depreciation as a cash flow"}
Payback, NPV and IRR use cash flows. ARR uses profit, so depreciation is deducted. Do not mix them.
:::

:::mistake{title="Listing figures without a decision"}
A recommendation must say which project to choose, why, and what the risks are. A table of results is not an answer.
:::

:::mistake{title="Ignoring the forecasts' reliability"}
Say that the inflows are estimates, especially in later years, and show the effect of a fall in them. Do not present the NPV as certain.
:::

## Exam tips

:::exam-tip
Project evaluation appears in ZIMSEC Papers 2 and 3 (Form 6) and in Cambridge Paper 4 (A Level only), usually as the last part of a 25-mark question. For *evaluate* or *recommend*, use the structure above: results, conflict, risk, non-financial factor and decision. Quote the figures from the earlier parts of the question and own figures from your answers.
:::

:::exam-tip
For *explain the difference between profit and cash flow*, mention depreciation and timing. For *discuss risk*, mention that the forecasts are uncertain, that long projects are riskier, and give one way to deal with it (sensitivity analysis, shorter payback, higher discount rate).
:::

## Summary

:::summary
- Payback, ARR, NPV and IRR measure different things and may disagree; explain the disagreement.
- For a single financial ranking of mutually exclusive projects, NPV measures the value added in dollars.
- ARR uses profits after depreciation; payback, NPV and IRR use cash flows.
- Forecasts are uncertain; sensitivity analysis shows how far the inflows can fall before the decision changes.
- Non-financial factors such as employment, environment, strategy and reputation can change the decision.
- A recommendation needs figures from each method, risk comments, a non-financial factor and a clear decision.
:::
`;
writeLesson("invest/evaluation.md", front("invest.evaluation", "Evaluating investment projects and making recommendations", "Compare projects using payback, ARR, NPV and IRR together, resolve conflicts, allow for risk and non-financial factors and write a reasoned recommendation.", "aacc.invest.evaluation", 50), body);
void p2;
