// W4b: invest.evaluation
import { concept, P, table, chk, r2, sum, invest } from "../lib.mjs";
import { mc, F, usd } from "../tables/w4b-lib.mjs";

concept("aacc.invest.evaluation", { file: "invest/evaluation", keyPrefix: "invest.evaluation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What are mutually exclusive projects?",
    ok: ["Projects of which only one can be chosen", "Correct: choosing one rules out the other."],
    bad: [["Projects that must all be undertaken together", "That describes linked projects."], ["Projects that have no cost", "Mutually exclusive projects can have any cost."], ["Projects with identical cash flows", "They may differ in cash flows; exclusivity is about the choice."]],
    explanation: "Mutually exclusive projects are alternatives: the business can undertake only one.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which investment appraisal technique uses accounting profit rather than cash flows?",
    ok: ["Accounting rate of return", "Correct: ARR is based on average profit."],
    bad: [["Payback period", "Payback uses cash flows."], ["Net present value", "NPV discounts cash flows."], ["Internal rate of return on capital", "IRR is also based on cash flows."]],
    explanation: "ARR uses profits after depreciation; the other three use cash flows.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a non-financial factor that might influence an investment decision?",
    ok: ["The number of jobs created in the community", "Correct: employment is a non-financial factor."],
    bad: [["The net present value of the project at its cost of capital", "NPV is a financial measure."], ["The payback period in years", "Payback is a financial measure."], ["The accounting rate of return", "ARR is a financial measure."]],
    explanation: "Employment, environment, reputation and strategy are examples of non-financial factors.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Two mutually exclusive projects have different sizes. Project P has the higher IRR but a lower NPV than Project Q. Which is generally preferred on financial grounds?",
    ok: ["Project Q, because it adds the greater value in dollars", "Correct: NPV measures the value added."],
    bad: [["Project P, because a higher percentage is always better", "A high percentage on a small project may add less value."], ["Neither, because the methods disagree", "A choice can be made by ranking on NPV."], ["Project P, because it must be cheaper", "Cost is not the issue; value added is."]],
    hints: ["Which measure is in dollars?"],
    explanation: "For mutually exclusive projects the NPV shows the extra wealth created, so the higher NPV is normally chosen.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What does sensitivity analysis show?",
    ok: ["How much the result changes if a forecast changes", "Correct: it tests the effect of an assumption."],
    bad: [["The exact future cash flows of a project over its whole life", "The future is not known exactly."], ["The cost of capital of the business", "The cost of capital is determined separately."], ["The tax payable on the project", "Tax is not what the analysis shows."]],
    hints: ["It is about 'what if'."],
    explanation: "Sensitivity analysis changes one variable and recalculates the NPV to show how robust the decision is.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Why are projects with longer lives generally considered more risky?",
    ok: ["Forecasts of distant cash flows are less reliable", "Correct: uncertainty increases with time."],
    bad: [["Longer projects always cost more to start", "Cost at the start does not depend on life."], ["Discount factors are larger for later years than for earlier ones", "Discount factors are smaller for later years."], ["Depreciation is higher for longer projects", "Depreciation per year is usually lower for longer lives."]],
    hints: ["Think about forecasting accuracy."],
    explanation: "It is harder to forecast inflows many years ahead, so the risk is greater.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A business must choose between a project with a positive NPV that harms a local river and one with a smaller NPV that does not. Which is the BEST approach?",
    ok: ["Weigh the extra NPV against the environmental and reputation costs", "Correct: financial and non-financial factors should both be considered."],
    bad: [["Always choose the higher NPV, because only money matters", "Non-financial factors may change the decision."], ["Always choose the project with the lower NPV, because it is much safer", "Safety is not guaranteed by a lower NPV."], ["Reject both without looking at the figures", "The figures are needed for the decision."]],
    hints: ["Both financial and non-financial factors matter."],
    explanation: "Good decisions balance the financial result with environmental, social and strategic effects.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Depreciation is deducted from cash flows when calculating the NPV of a project.", answer: false, explanation: "False. Depreciation is not a cash flow, so it is not deducted in NPV, payback or IRR." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A project can have a positive NPV and a long payback period at the same time.", answer: true, hints: ["The methods measure different things."], explanation: "True. NPV considers the whole life of the project while payback only looks at the recovery time." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each factor to the investment appraisal point it illustrates.",
    pairs: ["The inflows may fall short of the forecast", "Only one of two machines can be bought", "The project creates jobs in the community", "Depreciation reduces profit but not cash"],
    right: ["Risk and uncertainty", "Mutually exclusive projects", "Non-financial factor", "Difference between profit and cash flow"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each statement illustrates a different aspect of project evaluation.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "When payback and NPV give different rankings, the business should usually prefer the project with the higher {{blank:a}} because it measures the {{blank:b}} added.",
    blanks: [{ id: "a", accepted: ["NPV"], choices: ["NPV", "payback", "ARR"] }, { id: "b", accepted: ["value"], choices: ["value", "speed", "risk"] }],
    explanation: "NPV measures the value added in dollars.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the technique that recalculates the NPV after changing a forecast to see how much the decision depends on it.", accepted: ["sensitivity analysis", "sensitivity"], explanation: "It is sensitivity analysis." });

  {
    const npv = 9600, pv = 64000;
    const v = (npv / pv) * 100;
    chk(v, 15, 1e-9);
    b.num({ d: 4, skill: "ANALYSIS", kind: "pct", value: v, calculator: true, wrong: [(npv / (pv - npv)) * 100, (pv / npv)],
      stem: `A project has a net present value of ${usd(npv)}. The total present value of its inflows is ${usd(pv)}. By what percentage could all the inflows fall before the NPV reaches zero? Give your answer to one decimal place.`,
      hints: ["NPV ÷ total present value of inflows."],
      explanation: `${F(npv)} ÷ ${F(pv)} × 100 = ${v.toFixed(1)}%. Dividing by the outlay (${F(pv - npv)}) would give ${((npv / (pv - npv)) * 100).toFixed(1)}%, which is the wrong base.` });
  }
  {
    const outlay = 90000, cash = 24000, yrs = 5;
    const dep = outlay / yrs, prof = cash - dep;
    chk(prof, 6000);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: prof, calculator: true, wrong: [cash, cash + dep],
      stem: `A project costs ${usd(outlay)}, brings net cash inflows of ${usd(cash)} a year for ${yrs} years and has no residual value. Depreciation is straight line. Calculate the annual accounting profit.`,
      hints: ["Depreciation is not a cash flow, but it is a deduction from profit."],
      explanation: `Depreciation = ${F(outlay)} ÷ ${yrs} = ${F(dep)} a year. Profit = ${F(cash)} - ${F(dep)} = ${usd(prof)}. The cash inflow (${usd(cash)}) is not the profit.` });
  }
  {
    const outlay = 100000, pv = 120000, fall = 0.15;
    const v = pv * (1 - fall) - outlay;
    chk(v, 2000, 1e-6);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: v, calculator: true, wrong: [pv - outlay, pv * fall],
      stem: `A project costing ${usd(outlay)} has inflows with a total present value of ${usd(pv)}. Calculate the net present value if every inflow turns out to be 15% lower than forecast.`,
      hints: ["Reduce the present value of the inflows by 15% first."],
      explanation: `Lower PV = ${F(pv)} × 85% = ${F(pv * (1 - fall))}. NPV = ${F(pv * (1 - fall))} - ${F(outlay)} = ${usd(v)}. The original NPV was ${usd(pv - outlay)}.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a project's accounting profit differs from its net cash flow.",
    points: ["Accounting profit is after depreciation, which is not a cash flow", "Timing differences: sales and costs may not be paid or received in the same year", "Capital spending is not an expense in profit but is a cash outflow when paid"],
    modelAnswer: "Profit is after deducting depreciation, which is not a cash flow. Timing of receipts and payments also differs, and capital spending is a cash outflow but not an expense in the period.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain two ways in which a business can allow for risk in its investment appraisal.",
    points: ["Use sensitivity analysis to see how far the inflows can fall before the NPV is zero", "Developed: a project that is very sensitive to small falls is risky", "Use a higher discount rate or a shorter payback requirement for risky projects", "Developed: a higher rate reduces the present value of distant, uncertain flows"],
    modelAnswer: "The business can test the NPV with lower inflows to see how sensitive the result is. It can also use a higher discount rate or a shorter payback target for risky projects, which reduces the value placed on distant, uncertain flows.",
    hints: ["One method about testing, one about adjusting the criteria."],
    explanation: "One mark for each method and one for developing each.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A manager says 'We should choose the project with the shortest payback period.' Evaluate this advice.",
    points: ["A short payback returns cash quickly and reduces risk", "It is useful when the business is short of cash", "But payback ignores cash flows after the payback point and the time value of money, so a better project may be rejected", "Judgement: use payback as a screening or liquidity test, but base the choice on NPV with risk and non-financial factors"],
    modelAnswer: "Shorter payback means quicker recovery of cash and lower risk, which matters when cash is short. However, it ignores later cash flows and the time value of money, so the choice should be based on NPV, using payback only as a liquidity test.",
    hints: ["Strengths, weaknesses and a judgement."],
    explanation: "One mark for each point.",
  });

  // Struct 1 (14 marks)
  {
    const out = 70000, X = [38000, 34000, 22000], Y = [18000, 26000, 34000, 40000], rate = 16;
    const pbX = invest.payback(out, X), arrY = invest.arr(out, Y), npvX = invest.npv(rate, out, X), npvY = invest.npv(rate, out, Y);
    chk(pbX, 1 + 32000 / 34000, 1e-9);
    chk(npvX, 2120); chk(npvY, 8708);
    const dft = table(["Year", "Discount factor at 16%"], [1, 2, 3, 4].map((y) => [`${y}`, invest.df(rate, y, 3).toFixed(3)]), ["l", "r"]);
    b.struct({
      d: 5, skill: "EVALUATION", calculator: true,
      stem: `Sipho Transport in Bulawayo is choosing between Truck X and Truck Y. Each costs ${usd(out)} and has no residual value. The net cash inflows are: Truck X ${X.map(usd).join(", ")} in years 1 to 3; Truck Y ${Y.map(usd).join(", ")} in years 1 to 4. Inflows arise evenly during each year. The cost of capital is ${rate}%.\n\n${dft}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "years", value: pbX, wrong: [2, 1 + 32000 / 38000], stem: "Calculate the payback period of Truck X, in years to two decimal places.", explanation: `After 1 year ${F(X[0])} is recovered; ${F(out - X[0])} remains. ${F(out - X[0])} ÷ ${F(X[1])} = ${((out - X[0]) / X[1]).toFixed(2)}. Payback = ${pbX.toFixed(2)} years.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: arrY, wrong: [(12000 / out) * 100, (48000 / out) * 100], stem: "Calculate the ARR of Truck Y, to one decimal place.", explanation: `Total profit = ${F(sum(Y))} - ${F(out)} = ${F(sum(Y) - out)}; average = ${F((sum(Y) - out) / 4)}; average investment = ${F(out / 2)}. ARR = ${arrY.toFixed(1)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: npvX, wrong: [sum(X) - out, sum(X.map((f, i) => f * invest.df(rate, i + 1, 3)))], stem: "Calculate the NPV of Truck X.", explanation: `${F(X[0])} × 0.862 + ${F(X[1])} × 0.743 + ${F(X[2])} × 0.641 = ${F(sum(X.map((f, i) => f * invest.df(rate, i + 1, 3))))}; less ${F(out)} = ${usd(npvX)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: npvY, wrong: [sum(Y) - out, npvX], stem: "Calculate the NPV of Truck Y.", explanation: `${F(Y[0])} × 0.862 + ${F(Y[1])} × 0.743 + ${F(Y[2])} × 0.641 + ${F(Y[3])} × 0.552 = ${F(sum(Y.map((f, i) => f * invest.df(rate, i + 1, 3))))}; less ${F(out)} = ${usd(npvY)}.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "Which measure shows the value added by each truck in dollars?", options: [["Net present value", "Correct."], ["Payback period", "Payback measures time."], ["Accounting rate of return", "ARR is a percentage of profits."], ["Depreciation", "Depreciation is a cost allocation."]], answer: "A", explanation: "NPV is the value added in today's dollars." }),
        P.manual({ label: "(f)", marks: 5, stem: "Evaluate the two trucks and recommend which to buy.", points: ["Truck X pays back faster (1.94 years against 2.76 years), which reduces risk and helps liquidity", "Truck Y has the higher ARR (34.3% against 22.9%) and the higher NPV (US\\$8,708 against US\\$2,120)", "Truck X's NPV is small, so a small fall in its inflows would make the NPV negative; Truck Y has more margin for error", "Y relies on year 4 inflows, which are less certain than earlier ones", "Recommend Truck Y, on the higher NPV, unless cash is very short or the year 4 forecasts are doubtful; mention a non-financial factor such as reliability or maintenance"], modelAnswer: "Truck X pays back faster, but Truck Y has the higher ARR and a much higher NPV (US\\$8,708 against US\\$2,120), and its NPV can better withstand falls in inflows. Y's year 4 flows are less certain, so reliability and maintenance should be checked, but Truck Y should be bought.", hints: ["Compare each technique, then give a decision."], explanation: "One mark for each point." }),
      ],
      hints: ["Use the factors supplied for NPV.", "Payback: cumulative inflows."],
      explanation: "This item compares two projects with several techniques and asks for a recommendation.",
    });
  }

  // Struct 2 (10 marks)
  {
    const outlay = 45000, pv = 51300, fall = 0.15;
    const npv = pv - outlay, safety = (npv / pv) * 100, low = pv * (1 - fall) - outlay;
    chk(npv, 6300); chk(safety, 12.28, 0.01); chk(low, -1395, 1e-6);
    b.struct({
      d: 5, skill: "EVALUATION", calculator: true,
      stem: `Rudo Dairy in Masvingo is considering a cooling plant costing ${usd(outlay)}. At the cost of capital of 20% the present value of the inflows is ${usd(pv)}. The owner is worried that the milk price may fall.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: npv, wrong: [pv, outlay], stem: "Calculate the net present value.", explanation: `${F(pv)} - ${F(outlay)} = ${usd(npv)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: safety, wrong: [(npv / outlay) * 100, 15], stem: "Calculate the percentage fall in all inflows that would make the NPV zero, to one decimal place.", explanation: `${F(npv)} ÷ ${F(pv)} × 100 = ${safety.toFixed(1)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(low), wrong: [r2(pv * fall), npv], stem: "If every inflow is 15% lower than forecast, by how much is the NPV below zero? (Amount only.)", explanation: `Lower PV = ${F(pv)} × 85% = ${F(pv * (1 - fall))}; NPV = ${F(pv * (1 - fall))} - ${F(outlay)} = -${F(Math.abs(low))}.` }),
        P.manual({ label: "(d)", marks: 4, stem: "Advise the owner whether to go ahead, referring to the sensitivity results and one non-financial factor.", points: ["The NPV is positive, so the plant is expected to earn more than 20%", "But the NPV becomes negative if inflows fall by more than 12.3%, so the margin for error is small", "A fall of 15% would give a negative NPV of US\\$1,395", "Non-financial factor (reduced spoilage and better milk quality, or dependence on electricity supply) and a clear decision"], modelAnswer: "The NPV of US\\$6,300 suggests acceptance, but inflows need fall by only 12.3% to remove it, and a 15% fall gives a negative NPV. The owner should go ahead only if the milk price is reasonably secure, and should consider the benefit of less spoilage and the risk of power cuts.", hints: ["Use the results from (b) and (c)."], explanation: "One mark for each point." }),
      ],
      hints: ["NPV = present value of inflows - outlay.", "Fall that removes the NPV = NPV ÷ present value of inflows."],
      explanation: "This item tests sensitivity analysis and a reasoned recommendation.",
    });
  }

  b.card("DEFINITION", "Mutually exclusive projects", "Projects of which only one can be chosen.");
  b.card("CONCEPT", "Profit v cash flow", "Profit is after depreciation and uses accrual timing; payback, NPV and IRR use cash flows; ARR uses profit.");
  b.card("CONCEPT", "When techniques conflict", "For mutually exclusive projects rank on NPV (value added), and explain the others, risk and non-financial factors.");
  b.card("DEFINITION", "Sensitivity analysis", "Recalculating the NPV after changing a forecast to see how much the decision depends on it.");
  b.card("FORMULA", "Fall in inflows that makes NPV zero", "NPV ÷ total present value of the inflows × 100.");
  b.card("CONCEPT", "Risk and project life", "Longer projects are riskier because later forecasts are less reliable.");
  b.card("CONCEPT", "Non-financial factors", "Employment, environment, business strategy, reputation, supplier reliability, skills and flexibility.");
  b.card("CONCEPT", "Structure of a recommendation", "Results of each technique, conflicts, risk, a non-financial factor and a clear decision with figures.");
  b.card("CONCEPT", "Limits of IRR for ranking", "A higher IRR on a small project may add less value than a lower IRR on a larger one.");
});
void table;
