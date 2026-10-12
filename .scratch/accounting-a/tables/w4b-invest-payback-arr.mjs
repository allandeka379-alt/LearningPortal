import { table, chk, r2, sum, invest } from "../lib.mjs";
import { F, usd, p1, p2, writeLesson, front } from "./w4b-lib.mjs";

// Example 1: Mutare Dairy cooler
const out1 = 40000, flows1 = [12000, 15000, 18000, 14000, 10000];
let cum = 0;
const cumRows = flows1.map((f, i) => { cum += f; return [`Year ${i + 1}`, f, out1 - cum]; });
const pb1 = invest.payback(out1, flows1);
chk(pb1, 2 + 13000 / 18000);
const months = (pb1 - 2) * 12;
const total1 = sum(flows1);
const avgProfit1 = (total1 - out1) / flows1.length;
const avgInv1 = out1 / 2;
const arr1 = invest.arr(out1, flows1);
chk(total1, 69000); chk(avgProfit1, 5800); chk(arr1, 29, 1e-9);
const t1 = table(["Year", "Net cash inflow US\\$", "Unrecovered outlay at end of year US\\$"], [["Year 0", `(${F(out1)})`, F(out1)], ...cumRows.map((r) => [r[0], F(r[1]), r[2] < 0 ? `(${F(-r[2])}) surplus` : F(r[2])])], ["l", "r", "r"]);
const t1b = table(["Accounting rate of return", "US\\$"], [
  ["Total net cash inflows (5 years)", total1], ["Less: initial investment (depreciated to nil over 5 years)", -out1], ["Total profit over 5 years", total1 - out1],
  ["Average annual profit (÷ 5)", avgProfit1], ["Average investment (40,000 ÷ 2)", avgInv1], ["**ARR (average profit ÷ average investment × 100)**", `**${p1(arr1)}%**`],
]);

// even flows
const out2 = 24000, f2 = 8000;
chk(invest.payback(out2, [f2, f2, f2, f2, f2]), 3);

// Example 2: A and B
const outAB = 30000;
const A = [10000, 12000, 14000], B = [9000, 9000, 9000, 9000];
const pbA = invest.payback(outAB, A), pbB = invest.payback(outAB, B);
chk(pbA, 2 + 8000 / 14000); chk(pbB, 3 + 3000 / 9000);
const arrA = invest.arr(outAB, A), arrB = invest.arr(outAB, B);
chk(arrA, (2000 / 15000) * 100); chk(arrB, 10, 1e-9);
const tAB = table(["", "Project A", "Project B"], [
  ["Initial outlay (US\\$)", F(outAB), F(outAB)],
  ["Net cash inflows (US\\$)", A.map(F).join("; "), B.map(F).join("; ")],
  ["Life (years)", "3", "4"],
  ["Total inflows (US\\$)", F(sum(A)), F(sum(B))],
  ["Average annual profit (US\\$)", F((sum(A) - outAB) / 3), F((sum(B) - outAB) / 4)],
  ["Average investment (US\\$)", F(outAB / 2), F(outAB / 2)],
  ["**Payback (years)**", `**${p2(pbA)}**`, `**${p2(pbB)}**`],
  ["**ARR**", `**${p1(arrA)}%**`, `**${p1(arrB)}%**`],
], ["l", "r", "r"]);
const mths = (y) => Math.round((y - Math.floor(y)) * 12);

const body = `
## Introduction

Mutare Dairy is considering a new milk cooler costing US\\$40,000 which should cut wastage and allow the business to supply more shops. Before the owner spends the money she wants to know how long it will take to get the money back and what profit the cooler will earn each year compared with the money tied up. **Investment appraisal** helps a business choose between projects that need a large outlay now and give benefits over several years. This lesson introduces the two simplest methods: **payback** and **accounting rate of return (ARR)**. It is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4), and the two methods are used again in the lessons on NPV and the evaluation of projects.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Payback period | Payback period |
| Accounting rate of return (ARR), return on investment | Accounting rate of return = average annual profit ÷ average investment × 100 |
| Net cash inflow | Net cash inflow; net cash flow |
| Initial outlay | Initial investment; capital expenditure |

Cambridge sets no residual values. Average investment is the initial cost divided by 2. Discounted payback is not examined by either board.
:::

## Key definitions

:::definition{term="Net cash inflow"}
The cash received from a project in a year less the cash paid out for it in that year, excluding the initial outlay and excluding depreciation, which is not a cash flow.
:::

:::definition{term="Payback period"}
The time a project takes to recover its initial outlay from its net cash inflows. A shorter payback is preferred, and a project is accepted if it pays back within the maximum period set by the business.
:::

:::definition{term="Accounting rate of return (ARR)"}
The average annual profit from a project as a percentage of the average investment. Average annual profit = (total net cash inflows - initial outlay) ÷ number of years, because the outlay is written off as depreciation over the life of the project. A project is accepted if its ARR is above the target rate.
:::

:::keyfact
Payback (even inflows) = initial outlay ÷ annual inflow. Payback (uneven inflows) = full years + unrecovered outlay at the start of the year ÷ inflow of that year. ARR = average annual profit ÷ average investment × 100, with average investment = initial outlay ÷ 2.
:::

## Payback

When the inflows are the same each year, divide the outlay by the annual inflow: a US\\$24,000 machine returning US\\$8,000 a year has a payback of 24,000 ÷ 8,000 = 3 years. When the inflows are uneven, build a table of **cumulative** or unrecovered outlay and find the year in which the outlay is recovered. Assume that inflows arise evenly during each year. Express the answer in years and months, or in years to two decimal places, as the question asks (multiply the fraction of a year by 12 for months).

:::worked-solution[Example 1: the Mutare Dairy cooler]
The cooler costs ${usd(out1)}. The expected net cash inflows are ${flows1.map((x) => usd(x)).join(", ")} in years 1 to 5.

${t1}

The outlay is recovered during year 3. At the start of year 3, ${usd(13000)} is still unrecovered, and year 3 brings ${usd(18000)}, so the fraction of year 3 needed is 13,000 ÷ 18,000 = 0.72. Payback = 2 + 0.72 = **${p2(pb1)} years**, or about **2 years ${Math.round(months)} months**.

For the ARR, depreciation is ${usd(out1)} ÷ 5 = ${usd(out1 / 5)} a year, so the average profit is found from the total net inflow over the life of the project.

${t1b}

If the dairy requires a payback of three years or less and an ARR of at least 25%, the cooler is acceptable on both measures: payback ${p2(pb1)} years is within three, and ARR ${p1(arr1)}% is above 25%.
:::

## Accounting rate of return

ARR uses **profits**, not cash flows, so the depreciation of the project is deducted. With no residual value, the total profit over the life is total inflows less the outlay. The average investment is half the outlay, because on average the asset's carrying amount is half its cost. The ARR is therefore higher than the "simple" return on the full outlay. The result is compared with the target ARR: a project is accepted if its ARR is at least the target, and when choosing between projects the one with the highest ARR is preferred.

## Comparing projects

:::worked-solution[Example 2: two projects costing the same]
Chinhoyi Transport can buy either Project A or Project B, each costing ${usd(outAB)}. The minimum acceptable payback is three years and the target ARR is 12%.

${tAB}

Project A pays back in ${p2(pbA)} years (about 2 years ${mths(pbA)} months) and earns an ARR of ${p1(arrA)}%. Project B pays back in ${p2(pbB)} years (3 years ${mths(pbB)} months), which is longer than three years, and earns an ARR of ${p1(arrB)}%, below the target. Project A satisfies both targets and Project B fails both, so A is preferred. Project B lasts a year longer, but payback gives no credit for inflows after the payback point, and its ARR is still lower.
:::

## Advantages and disadvantages

| Method | Advantages | Disadvantages |
| --- | --- | --- |
| Payback | Simple to calculate and understand; favours quick return, so useful when cash is short or the future is risky; focuses on cash | Ignores cash flows after payback and the time value of money; no clear rule for the maximum period; ignores profitability |
| ARR | Simple; uses accounting profits familiar to managers; takes the whole life of the project into account; gives a percentage to compare with a target | Uses profits, not cash flows; ignores the time value of money and the timing of profits; the average investment convention affects the result; percentages may favour small projects |

## Common mistakes

:::mistake{title="Including depreciation in the cash inflows"}
Net cash inflows exclude depreciation because it is not a cash flow. Use the inflows as given for payback, and use total inflows less the outlay for the total profit in ARR.
:::

:::mistake{title="Forgetting to halve the investment"}
For ARR the denominator is the average investment, initial outlay ÷ 2. Using the full outlay gives half the correct percentage.
:::

:::mistake{title="Wrong fraction of the payback year"}
The fraction is the unrecovered outlay at the start of the year ÷ the inflow of that year, not ÷ the outlay or ÷ total inflows. Multiply by 12 to turn the fraction into months.
:::

:::mistake{title="Accepting a project only on payback"}
Payback ignores what happens after the payback year and the time value of money. A balanced evaluation refers to ARR, the later methods and non-financial factors.
:::

## Exam tips

:::exam-tip
Payback and ARR appear in ZIMSEC Papers 1 to 3 (Form 6) and in Cambridge Paper 4 (A Level only), often in a two-project comparison. For *calculate*, show the cumulative table for payback and the three lines (total profit, average profit, average investment) for ARR, and give the answer in the units the question asks for (years and months, or a percentage to one decimal place).
:::

:::exam-tip
For *evaluate*, *recommend* or *justify*, compare each result with the target, name one weakness of each method (payback ignores later cash flows and the time value of money; ARR uses profits and ignores timing), add a non-financial factor such as risk or employment, and end with a clear decision supported by figures.
:::

## Summary

:::summary
- Payback is the time to recover the initial outlay from net cash inflows; with uneven inflows, find the year of recovery and use unrecovered outlay ÷ inflow for the fraction.
- ARR = average annual profit ÷ average investment × 100, where average profit = (total inflows - outlay) ÷ years and average investment = outlay ÷ 2.
- Accept if payback is within the maximum period, or if ARR is above the target.
- Payback is simple and focuses on cash and risk but ignores later flows and timing; ARR uses the whole life but uses profits and ignores timing.
- Depreciation is not a cash flow, so it is not included in net cash inflows.
:::
`;
writeLesson("invest/payback-arr.md", front("invest.payback-arr", "Payback period and accounting rate of return", "Calculate the payback period for even and uneven cash inflows and the accounting rate of return, apply accept or reject criteria and evaluate the two methods.", "aacc.invest.payback-arr", 50, true), body);
void r2;
