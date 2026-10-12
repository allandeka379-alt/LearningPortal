// W4b: invest.payback-arr (free preview lesson)
import { concept, P, chk, r2, sum, invest } from "../lib.mjs";
import { mc, F, usd, p1, p2 } from "../tables/w4b-lib.mjs";

concept("aacc.invest.payback-arr", { file: "invest/payback-arr", keyPrefix: "invest.payback-arr" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does the payback period measure?",
    ok: ["The time taken to recover the initial outlay from net cash inflows", "Correct: it is a measure of how quickly cash is recovered."],
    bad: [["The total profit over the life of the project", "That is not payback."], ["The percentage return on the average investment over the project's life", "That is the accounting rate of return."], ["The present value of the future cash flows", "That is the net present value method."]],
    explanation: "Payback is the time to recover the outlay from the project's net cash inflows.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which formula gives the accounting rate of return as used in the Cambridge syllabus?",
    ok: ["Average annual profit ÷ average investment × 100", "Correct: with average investment = initial cost ÷ 2."],
    bad: [["Total cash inflows over the life ÷ the initial outlay × 100", "This is not the ARR formula."], ["Initial outlay ÷ annual cash inflow", "This is the payback period for even flows."], ["Net present value ÷ initial outlay", "This is a profitability index, not the ARR."]],
    explanation: "ARR = average annual profit ÷ average investment × 100.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a payback calculation, depreciation of the asset is:",
    ok: ["not included, because it is not a cash flow", "Correct: payback is based on cash."],
    bad: [["deducted from each year's inflow, because it is an expense", "Depreciation is not a cash outflow."], ["added to each year's inflow", "It is not a cash inflow."], ["used as the initial outlay", "The outlay is the cost of the asset."]],
    explanation: "Payback uses net cash inflows; depreciation is an accounting entry with no cash movement.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A machine costs US\\$30,000 and brings in US\\$7,500 a year. What is its payback period?",
    ok: ["4 years", "Correct: 30,000 ÷ 7,500."],
    bad: [["2.5 years", "The inflow has been divided by the outlay in the wrong order and scaled."], ["0.25 years", "The inflow divided by the outlay is a fraction of the outlay, not years."], ["5 years", "This divides by US\\$6,000, not US\\$7,500."]],
    hints: ["Outlay ÷ annual inflow."],
    explanation: "30,000 ÷ 7,500 = 4 years.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which is a disadvantage of the payback method?",
    ok: ["It ignores cash flows after the payback period", "Correct: later flows are not considered."],
    bad: [["It cannot be calculated at all if the inflows are uneven", "It can, using cumulative cash flows."], ["It requires a discount rate to be chosen", "Payback does not use discounting."], ["It uses accounting profit rather than cash", "Payback uses cash flows."]],
    hints: ["Think about what happens after the outlay is recovered."],
    explanation: "Payback ignores later cash flows and the time value of money.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the ARR calculated on the average investment rather than on the initial outlay?",
    ok: ["The asset's carrying amount falls to nil, so on average half the cost is invested", "Correct: with no residual value the average is half the cost."],
    bad: [["Because the outlay is always paid in two equal parts", "The outlay is normally paid at the start."], ["Because the average investment is always larger than the initial outlay on the asset", "It is smaller (half of the outlay)."], ["Because tax is paid on half of the investment", "Tax is not part of the ARR."]],
    hints: ["Think of depreciation to nil."],
    explanation: "With depreciation to nil, the investment falls steadily to zero; its average is half the initial cost.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A business has very little cash and faces an uncertain market. Which appraisal method will it find most useful as the main guide?",
    ok: ["Payback, because it favours projects that return cash quickly", "Correct: quick recovery reduces risk."],
    bad: [["ARR, because it ignores cash", "ARR uses profits and says nothing about when cash is recovered."], ["No appraisal, because the market is uncertain", "A cautious method is still useful."], ["A method that favours long projects with large late profits and low risk", "Late profits are riskier when cash is short."]],
    hints: ["Which method focuses on time to recover cash?"],
    explanation: "Payback highlights how soon the cash returns, which matters when cash is scarce and risk is high.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A shorter payback period is normally preferred to a longer one.", answer: true, explanation: "True. A short payback recovers the outlay sooner and reduces risk." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The accounting rate of return takes account of the time value of money.", answer: false, hints: ["Does it discount the profits?"], explanation: "False. ARR uses average profits and does not discount them." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: ["Payback period", "Accounting rate of return", "Net cash inflow", "Average investment"],
    right: ["Time to recover the initial outlay", "Average annual profit as a percentage of average investment", "Cash received less cash paid in a year from the project", "Initial outlay ÷ 2 when there is no residual value"],
    rightIndex: [0, 1, 2, 3],
    explanation: "These are the key terms of simple investment appraisal.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Payback uses {{blank:a}} flows, while the accounting rate of return uses {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["cash"], choices: ["cash", "profit", "tax"] }, { id: "b", accepted: ["profits"], choices: ["profits", "cash flows", "dividends"] }],
    explanation: "Payback is a cash method; ARR is a profit method.",
  });

  {
    const out = 21000, f = 6000;
    const v = invest.payback(out, [f, f, f, f, f]);
    chk(v, 3.5);
    b.num({ d: 2, skill: "APPLICATION", kind: "years", value: v, calculator: true, wrong: [f / out, out / f + 1],
      stem: `A Harare bakery buys an oven for ${usd(out)}. It is expected to bring in net cash inflows of ${usd(f)} a year. Calculate the payback period in years, to two decimal places.`,
      explanation: `${F(out)} ÷ ${F(f)} = ${v.toFixed(2)} years. Dividing the other way gives ${(f / out).toFixed(2)}.` });
  }
  {
    const out = 58000, fl = [17400, 21600, 26000, 19500];
    const v = invest.payback(out, fl);
    chk(v, 2 + 19000 / 26000);
    b.calc({ d: 3, skill: "APPLICATION", kind: "years", value: v, calculator: true, wrong: [3, 2 + 19000 / 21600],
      stem: `A project costs ${usd(out)} and its net cash inflows are ${fl.map(usd).join(", ")} in years 1 to 4. Inflows arise evenly during each year. Calculate the payback period in years, to two decimal places.`,
      hints: ["Find the year in which the outlay is recovered."],
      explanation: `After 2 years, ${F(fl[0] + fl[1])} has been recovered; ${F(out - fl[0] - fl[1])} remains. The inflow of year 3 is ${F(fl[2])}, so the fraction is ${F(out - fl[0] - fl[1])} ÷ ${F(fl[2])} = ${(19000 / 26000).toFixed(2)}. Payback = ${v.toFixed(2)} years. Using year 2's inflow would give ${(2 + 19000 / 21600).toFixed(2)}.` });
  }
  {
    const out = 22000, fl = [5500, 7500, 12000];
    const v = invest.payback(out, fl);
    const mths = (v - 2) * 12;
    chk(mths, 9, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", kind: "months", value: mths, calculator: true, wrong: [(v - 2) * 100, 12 - mths],
      stem: `A Chinhoyi garage buys equipment for ${usd(out)}. Net cash inflows are ${fl.map(usd).join(", ")} in years 1 to 3 and arise evenly during each year. The payback period is 2 years and some months. How many months, after the 2 full years, are needed (to the nearest month)?`,
      hints: ["Fraction of the third year × 12."],
      explanation: `After 2 years ${F(fl[0] + fl[1])} is recovered, leaving ${F(out - fl[0] - fl[1])}. ${F(out - fl[0] - fl[1])} ÷ ${F(fl[2])} = 0.75 of a year × 12 = ${mths} months. Payback is 2 years 9 months.` });
  }
  {
    const out = 46000, fl = [13500, 17500, 21500, 19500];
    const v = invest.arr(out, fl);
    chk(v, (26000 / 4 / 23000) * 100, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", kind: "pct", value: v, calculator: true, wrong: [(26000 / 4 / out) * 100, (sum(fl) / out) * 100],
      stem: `A project costs ${usd(out)}. Its net cash inflows over four years are ${fl.map(usd).join(", ")}. There is no residual value. Calculate the accounting rate of return, to one decimal place.`,
      hints: ["Average profit ÷ average investment."],
      explanation: `Total profit = ${F(sum(fl))} - ${F(out)} = ${F(sum(fl) - out)}. Average profit = ${F((sum(fl) - out) / 4)}. Average investment = ${F(out / 2)}. ARR = ${F((sum(fl) - out) / 4)} ÷ ${F(out / 2)} × 100 = ${v.toFixed(1)}%. Using the full outlay as the investment gives ${((sum(fl) - out) / 4 / out * 100).toFixed(1)}%.` });
  }
  {
    const arr = 24, avgInv = 22000;
    const profit = r2((arr / 100) * avgInv);
    chk(profit, 5280);
    b.num({ d: 3, skill: "ANALYSIS", kind: "money", value: profit, calculator: true, wrong: [arr * avgInv / 1000 / 24, avgInv / arr],
      stem: `A project has an average investment of ${usd(avgInv)} and an accounting rate of return of ${arr}%. Calculate the average annual profit.`,
      hints: ["Rearrange ARR = average profit ÷ average investment × 100."],
      explanation: `Average profit = ${arr}% × ${F(avgInv)} = ${usd(profit)}.` });
  }
  {
    const out = 42000, f = 10500, n = 6;
    const v = invest.arr(out, Array(n).fill(f));
    chk(v, (3500 / 21000) * 100);
    b.calc({ d: 4, skill: "APPLICATION", kind: "pct", value: v, calculator: true, wrong: [(f / out) * 100, (3500 / 42000) * 100],
      stem: `A school buys a minibus for ${usd(out)} that will bring in net cash inflows of ${usd(f)} a year for ${n} years, after which it has no value. Calculate the accounting rate of return, to one decimal place.`,
      hints: ["Total profit = total inflows - outlay."],
      explanation: `Total inflows = ${F(f * n)}; total profit = ${F(f * n - out)}; average profit = ${F((f * n - out) / n)}; average investment = ${F(out / 2)}. ARR = ${F((f * n - out) / n)} ÷ ${F(out / 2)} × 100 = ${v.toFixed(1)}%. Dividing the annual inflow by the outlay (${((f / out) * 100).toFixed(1)}%) ignores depreciation.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three advantages of the payback method.",
    points: ["It is simple to calculate and understand", "It focuses on how quickly cash is recovered, which reduces risk", "It is useful when the business is short of cash or the future is uncertain"],
    modelAnswer: "Payback is easy to calculate, shows how quickly cash comes back, and so is useful when cash is short or the future uncertain.",
    explanation: "One mark for each advantage.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain two limitations of the accounting rate of return.",
    points: ["It uses accounting profits, not cash flows", "Developed: depreciation methods and accounting policies can change the result", "It ignores the timing of the profits and the time value of money", "Developed: a project with profits late in its life can look as good as one with early profits"],
    modelAnswer: "ARR uses profits that depend on the depreciation method, not cash flows, and it ignores when the profits arise, so late profits are treated the same as early ones.",
    hints: ["Profits v cash, and timing."],
    explanation: "One mark for each limitation and one for developing each.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Two projects have the same ARR but different payback periods. Evaluate which one the business should choose.",
    points: ["The project with the shorter payback returns cash earlier and reduces risk", "It allows the cash to be reinvested sooner", "The longer project may bring larger later flows that payback ignores", "Judgement: choose the shorter payback unless there are strong reasons, such as other methods or non-financial factors, to prefer the other"],
    modelAnswer: "The project with the shorter payback returns cash sooner, reducing risk and allowing reinvestment. The other may have larger later flows, which payback ignores, so other methods and non-financial factors should be considered before deciding.",
    hints: ["What does each method fail to show?"],
    explanation: "One mark for each point.",
  });

  // Struct 1 (12 marks)
  {
    const out = 38000;
    const X = [10800, 13700, 19400, 9600], Y = [18600, 13900, 11300];
    const pX = invest.payback(out, X), pY = invest.payback(out, Y);
    const aX = invest.arr(out, X), aY = invest.arr(out, Y);
    chk(pX, 2 + 13500 / 19400); chk(pY, 2 + 5500 / 11300); chk(aX, (15500 / 4 / 19000) * 100); chk(aY, (5800 / 3 / 19000) * 100);
    const remX = out - X[0] - X[1], remY = out - Y[0] - Y[1];
    b.struct({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: `Rudo Bakery in Gweru can buy Oven X or Oven Y. Each costs ${usd(out)} and has no residual value. The net cash inflows are: Oven X ${X.map(usd).join(", ")} over four years; Oven Y ${Y.map(usd).join(", ")} over three years. Inflows arise evenly during each year. The owner will accept a project only if the payback is three years or less and the ARR is at least 15%.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "years", value: pX, wrong: [3, 2 + remX / X[1]], stem: "Calculate the payback period of Oven X, in years to two decimal places.", explanation: `After 2 years ${F(X[0] + X[1])} is recovered; ${F(remX)} remains. ${F(remX)} ÷ ${F(X[2])} = ${(remX / X[2]).toFixed(2)}. Payback = ${pX.toFixed(2)} years.` }),
        P.num({ label: "(b)", marks: 2, kind: "years", value: pY, wrong: [3, 2 + remY / Y[1]], stem: "Calculate the payback period of Oven Y, in years to two decimal places.", explanation: `After 2 years ${F(Y[0] + Y[1])} is recovered; ${F(remY)} remains. ${F(remY)} ÷ ${F(Y[2])} = ${(remY / Y[2]).toFixed(2)}. Payback = ${pY.toFixed(2)} years.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: aX, wrong: [(15500 / 4 / out) * 100, (15500 / out) * 100], stem: "Calculate the ARR of Oven X, to one decimal place.", explanation: `Total profit = ${F(sum(X))} - ${F(out)} = ${F(sum(X) - out)}; average = ${F((sum(X) - out) / 4)}; average investment = ${F(out / 2)}. ARR = ${aX.toFixed(1)}%.` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: aY, wrong: [(5800 / out) * 100, (5800 / 19000) * 100], stem: "Calculate the ARR of Oven Y, to one decimal place.", explanation: `Total profit = ${F(sum(Y))} - ${F(out)} = ${F(sum(Y) - out)}; average over 3 years = ${F((sum(Y) - out) / 3)}; average investment ${F(out / 2)}. ARR = ${aY.toFixed(1)}%.` }),
        P.manual({ label: "(e)", marks: 4, stem: "Evaluate the two ovens and recommend one.", points: ["Both pay back within three years (X 2.70, Y 2.49)", "Oven Y fails the ARR target (10.2% against 15%) while Oven X passes it (20.4%)", "Y returns cash sooner, but its life is shorter and its total profit is lower (US\\$5,800 against US\\$15,500)", "Recommend Oven X, as it meets both criteria and earns more overall; mention a risk or non-financial factor such as reliability or cash availability"], modelAnswer: "Both ovens pay back within three years, but only Oven X meets the ARR target (20.4% against 10.2%). Oven Y returns cash sooner, but its total profit is lower. Oven X should be chosen, subject to reliability and cash availability.", hints: ["Compare each result with both targets."], explanation: "One mark for each point." }),
      ],
      hints: ["Use cumulative inflows for payback.", "ARR: average profit ÷ (outlay ÷ 2)."],
      explanation: "This item calculates payback and ARR for two projects and evaluates them against targets.",
    });
  }

  // Struct 2 (8 marks)
  {
    const out = 18000, f = 4500, n = 6;
    const pb = invest.payback(out, Array(n).fill(f));
    const profit = f * n - out;
    const ar = invest.arr(out, Array(n).fill(f));
    chk(pb, 4); chk(profit, 9000); chk(ar, (1500 / 9000) * 100);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Chipo Boreholes in Masvingo is thinking of buying a drilling rig for ${usd(out)}. It will earn net cash inflows of ${usd(f)} a year for ${n} years and then be worthless. The owner requires a payback of 3.5 years or less and an ARR of at least 15%.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "years", value: pb, wrong: [f / out, n], stem: "Calculate the payback period in years.", explanation: `${F(out)} ÷ ${F(f)} = ${pb.toFixed(2)} years.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: profit, wrong: [f * n, out], stem: "Calculate the total profit over the life of the rig.", explanation: `${F(f * n)} - ${F(out)} = ${usd(profit)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: ar, wrong: [(f / out) * 100, (1500 / out) * 100], stem: "Calculate the ARR, to one decimal place.", explanation: `Average profit = ${F(profit / n)}; average investment = ${F(out / 2)}. ARR = ${ar.toFixed(1)}%.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Advise the owner whether to buy the rig.", points: ["ARR of 16.7% meets the 15% target but the payback of 4 years is longer than 3.5 years", "The two criteria conflict, so the decision depends on how important quick recovery of cash is; consider risk and other methods"], modelAnswer: "The ARR meets the target but the payback of 4 years does not. The owner should decide how important a quick return is, and consider risk and other methods before buying.", explanation: "One mark for each point." }),
      ],
      hints: ["Even inflows: divide the outlay by the annual inflow."],
      explanation: "This item applies payback and ARR to a single project and highlights a conflict.",
    });
  }

  b.card("DEFINITION", "Payback period", "The time taken for a project's net cash inflows to recover the initial outlay.");
  b.card("FORMULA", "Payback with even inflows", "Initial outlay ÷ annual net cash inflow.");
  b.card("FORMULA", "Payback with uneven inflows", "Full years before recovery + (unrecovered outlay at start of the year ÷ inflow of that year). Multiply the fraction by 12 for months.");
  b.card("FORMULA", "Accounting rate of return (ARR)", "Average annual profit ÷ average investment × 100.");
  b.card("FORMULA", "Average annual profit and average investment", "Average profit = (total inflows - outlay) ÷ years. Average investment = initial outlay ÷ 2 (no residual value).");
  b.card("CONCEPT", "Payback decision rule", "Accept if payback is within the maximum period; the shorter payback is preferred.");
  b.card("CONCEPT", "ARR decision rule", "Accept if ARR is at least the target rate; the higher ARR is preferred.");
  b.card("CONCEPT", "Weaknesses of payback", "Ignores cash flows after payback and the time value of money; the maximum period is arbitrary.");
  b.card("CONCEPT", "Weaknesses of ARR", "Uses profits not cash, ignores timing and the time value of money, and depends on depreciation policy.");
});
void p1; void p2;
