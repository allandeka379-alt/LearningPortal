// W4b: invest.npv-irr
import { concept, P, table, chk, r2, sum, invest } from "../lib.mjs";
import { mc, F, usd } from "../tables/w4b-lib.mjs";

const dfTable = (rate, years) => table(["Year", `Discount factor at ${rate}%`], Array.from({ length: years }, (_, i) => [`${i + 1}`, invest.df(rate, i + 1, 3).toFixed(3)]), ["l", "r"]);
const dfTable2 = (r1, r2_, years) => table(["Year", `Factor at ${r1}%`, `Factor at ${r2_}%`], Array.from({ length: years }, (_, i) => [`${i + 1}`, invest.df(r1, i + 1, 3).toFixed(3), invest.df(r2_, i + 1, 3).toFixed(3)]), ["l", "r", "r"]);

concept("aacc.invest.npv-irr", { file: "invest/npv-irr", keyPrefix: "invest.npv-irr" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does a positive net present value show?",
    ok: ["The project earns more than the required rate of return", "Correct: it adds value after allowing for the cost of capital."],
    bad: [["The project pays back within one year", "NPV says nothing about the payback period."], ["The project makes an accounting profit in every single year", "NPV uses discounted cash flows, not accounting profits."], ["The project has no risk", "A positive NPV does not remove risk."]],
    explanation: "A positive NPV means the discounted inflows exceed the outlay, so the return is above the discount rate.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are cash flows received in later years given smaller discount factors?",
    ok: ["Money received later is worth less than the same sum received now", "Correct: this is the time value of money."],
    bad: [["Later cash flows are always smaller in amount than the earlier ones", "The factors apply to any amount; they reflect time, not size."], ["Discount factors are chosen at random", "They are calculated from the discount rate."], ["Later years have lower inflation", "Discounting does not depend on inflation in this way."]],
    explanation: "A dollar today can be invested to earn a return, so it is worth more than a dollar in the future.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the internal rate of return (IRR)?",
    ok: ["The discount rate at which the net present value is zero", "Correct: the break-even discount rate."],
    bad: [["The rate of interest on the bank loan used to buy the asset", "That is the cost of borrowing, not the IRR."], ["The accounting profit divided by the investment", "That is the ARR."], ["The discount rate that gives the largest NPV", "NPV falls as the rate rises; the IRR is where it reaches zero."]],
    explanation: "IRR is the rate at which discounted inflows exactly equal the outlay.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A project's IRR is 17% and the company's cost of capital is 14%. What should the company do on this method?",
    ok: ["Accept, because the IRR exceeds the cost of capital", "Correct: the project earns more than the required return."],
    bad: [["Reject, because the IRR is higher than the cost of capital", "A higher IRR is favourable."], ["Reject, because the NPV at 14% must be negative", "With IRR above 14% the NPV at 14% is positive."], ["It cannot decide without the payback period", "The IRR rule gives a decision on its own."]],
    hints: ["Compare the IRR with the required return."],
    explanation: "A project is acceptable on the IRR method when the IRR is greater than the cost of capital.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "At what discount factor is the initial outlay of a project, paid immediately, usually included in an NPV calculation?",
    ok: ["1.000, because it occurs at time 0", "Correct: no discounting is needed for cash flows now."],
    bad: [["The year 1 factor, because the first year starts now", "The outlay occurs at the start, before year 1 ends."], ["The factor for the last year", "The outlay is not delayed."], ["0.000, because the outlay is a cost", "A zero factor would remove the outlay."]],
    hints: ["Discounting is for future cash flows."],
    explanation: "The outlay is paid at time 0 and therefore is not discounted.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A manager interpolates an IRR from NPVs at 8% and 40%. Why might the answer be inaccurate?",
    ok: ["The NPV does not change in a straight line, so a wide gap gives a poor estimate", "Correct: interpolation assumes linearity."],
    bad: [["The interpolation formula only works when both of the NPVs used are negative numbers", "It needs one positive and one negative NPV."], ["The discount factors have too many decimal places", "Rounding factors to three places has little effect."], ["The NPV at 8% must always equal the NPV at 40%", "They are different values."]],
    hints: ["Think of the shape of the NPV curve."],
    explanation: "The NPV curve is convex, so straight-line interpolation over a wide range is only an estimate; the rates should be close.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the best reason why NPV is regarded as better than the payback period?",
    ok: ["NPV considers all the cash flows and the time value of money", "Correct: payback does neither."],
    bad: [["NPV is always easier to calculate than the payback period for any project", "It is usually harder."], ["NPV does not need forecasts", "Both methods need forecasts."], ["NPV gives the same answer as ARR", "NPV and ARR use different data and can disagree."]],
    hints: ["Think about what payback ignores."],
    explanation: "NPV uses all cash flows over the life and discounts them, whereas payback ignores later flows and timing.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A project with a negative NPV at the cost of capital should normally be rejected.", answer: true, explanation: "True. It earns less than the required return." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Depreciation should be deducted from the annual cash inflows before they are discounted.", answer: false, hints: ["Is depreciation a cash flow?"], explanation: "False. Depreciation is not a cash flow, so it is not deducted from cash flows in an NPV." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: ["Discount factor", "Net present value", "Internal rate of return on capital", "Cost of capital"],
    right: ["The multiplier that turns a future cash flow into its present value", "The total present value of inflows less the outlay", "The rate at which the NPV is zero", "The minimum return the investors require"],
    rightIndex: [0, 1, 2, 3],
    explanation: "These are the core terms of discounted cash flow appraisal.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A project is acceptable if its NPV is {{blank:a}} than zero or if its IRR is {{blank:b}} than the cost of capital.",
    blanks: [{ id: "a", accepted: ["greater"], choices: ["greater", "less"] }, { id: "b", accepted: ["greater"], choices: ["greater", "less"] }],
    explanation: "Positive NPV and IRR above the cost of capital both indicate acceptance.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the term for the idea that money received today is worth more than the same amount received in the future.", accepted: ["time value of money", "the time value of money"], explanation: "It is the time value of money." });

  {
    const out = 36200, fl = [12400, 15100, 17900], r = 8;
    const v = invest.npv(r, out, fl);
    chk(v, 2435.7, 0.01);
    b.calc({ d: 3, skill: "APPLICATION", kind: "money", value: v, dp: 0, tol: 0.5, calculator: true, wrong: [sum(fl) - out, 38636],
      stem: `A Gweru business is considering a project costing ${usd(out)} with net cash inflows of ${fl.map(usd).join(", ")} at the end of years 1 to 3. Its cost of capital is ${r}%. Discount factors:\n\n${dfTable(r, 3)}\n\nCalculate the net present value, to the nearest dollar.`,
      hints: ["Multiply each inflow by its factor, add, then deduct the outlay."],
      explanation: `PVs: ${F(fl[0])} × 0.926 = ${F(fl[0] * 0.926)}; ${F(fl[1])} × 0.857 = ${F(fl[1] * 0.857)}; ${F(fl[2])} × 0.794 = ${F(fl[2] * 0.794)}. Total ${F(sum(fl.map((f, i) => f * invest.df(r, i + 1, 3))))}. NPV = total - ${F(out)} = ${usd(Math.round(v))}. Adding the undiscounted inflows gives ${usd(sum(fl) - out)}.` });
  }
  {
    const cf = 18500, r = 9, yr = 3;
    const v = r2(cf * invest.df(r, yr, 3));
    chk(v, 14282);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v, dp: 2, calculator: true, wrong: [cf, r2(cf * invest.df(r, 1, 3))],
      stem: `A project will bring a net cash inflow of ${usd(cf)} at the end of year ${yr}. The discount factor at ${r}% for year ${yr} is 0.772. Calculate the present value of this inflow.`,
      hints: ["Cash flow × discount factor."],
      explanation: `${F(cf)} × 0.772 = ${usd(v)}. The undiscounted amount (${usd(cf)}) overstates the value today.` });
  }
  {
    const out = 40000, fl = [14000, 16500, 17500], r = 18;
    const v = invest.npv(r, out, fl);
    chk(v, -5637.5, 0.01);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(v), dp: 0, tol: 0.5, calculator: true, wrong: [sum(fl) - out, 34363],
      stem: `A Bulawayo clinic is thinking of buying equipment costing ${usd(out)}. Net cash inflows are ${fl.map(usd).join(", ")} at the end of years 1 to 3 and its cost of capital is ${r}%. Discount factors:\n\n${dfTable(r, 3)}\n\nBy how much is the net present value below zero? (Give the amount only, to the nearest dollar.)`,
      hints: ["Total present value less the outlay will be negative."],
      explanation: `PVs: ${F(fl[0] * 0.847)}, ${F(fl[1] * 0.718)} and ${F(fl[2] * 0.609)}, a total of ${F(sum(fl.map((f, i) => f * invest.df(r, i + 1, 3))))}. NPV = ${F(sum(fl.map((f, i) => f * invest.df(r, i + 1, 3))))} - ${F(out)} = -${F(Math.abs(v))}, so about ${usd(Math.round(Math.abs(v)))} below zero. The equipment should be rejected.` });
  }
  {
    const lo = 9, hi = 17, nl = 5200, nh = -3800;
    const v = invest.irrInterpolated(lo, hi, nl, nh);
    chk(v, 9 + (5200 / 9000) * 8, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", kind: "pct", value: v, calculator: true, wrong: [(lo + hi) / 2, lo + (3800 / 9000) * 8],
      stem: `A project has a net present value of +${usd(nl)} at a discount rate of ${lo}% and -${usd(-nh)} at ${hi}%. Use interpolation to estimate the internal rate of return, to one decimal place.`,
      hints: ["Lower rate + NPV at the lower rate ÷ (difference between the NPVs) × the gap between the rates."],
      explanation: `IRR = ${lo} + [${F(nl)} ÷ (${F(nl)} + ${F(-nh)})] × (${hi} - ${lo}) = ${lo} + 0.578 × 8 = ${v.toFixed(1)}%. Taking the midpoint (${(lo + hi) / 2}%) ignores the sizes of the NPVs.` });
  }
  {
    const r = 11, fl = 23000, yr = 2;
    const pv = fl * invest.df(r, yr, 3);
    chk(pv, 18676, 1e-6);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: pv, dp: 0, tol: 0.5, calculator: true, wrong: [fl, fl * invest.df(r, 1, 3)],
      stem: `A project will give ${usd(fl)} at the end of year ${yr}. At a discount rate of ${r}% the factor for year ${yr} is 0.812. Calculate the present value, to the nearest dollar.`,
      explanation: `${F(fl)} × 0.812 = ${usd(pv)}.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why future cash flows are discounted when a project is appraised.",
    points: ["Money received now can be invested to earn a return", "A dollar in the future is worth less than a dollar today", "Discounting converts all cash flows to present values so that they can be compared fairly with the outlay"],
    modelAnswer: "Cash today can be invested to earn a return, so cash received later is worth less. Discounting puts all cash flows on a present-value basis so they can be compared with the outlay.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "State two advantages and two disadvantages of the net present value method.",
    points: ["Advantage: takes account of the time value of money", "Advantage: uses cash flows over the whole life of the project, and gives the value added in dollars", "Disadvantage: relies on forecasts of cash flows and the cost of capital, which are uncertain", "Disadvantage: harder to understand and explain than payback"],
    modelAnswer: "NPV allows for the time value of money and uses all cash flows, giving the value added in dollars. However, it depends on uncertain forecasts and the choice of the discount rate, and it is harder to understand than payback.",
    hints: ["Two good points and two weaknesses."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A project has an NPV of US\\$2,000 at the cost of capital but the managers are worried about the forecasts. Evaluate whether the project should be accepted.",
    points: ["A positive NPV means the project is expected to add value above the required return", "The NPV is small compared with the outlay, so a small fall in inflows could make it negative", "The forecasts may be optimistic; sensitivity analysis can test the effect of lower inflows or a higher discount rate", "Judgement: accept only if the risk is low or non-financial benefits support it; otherwise reject or seek better evidence"],
    modelAnswer: "A positive NPV suggests the project adds value, but it is small and based on uncertain forecasts, so lower inflows could make it negative. The managers should test the sensitivity of the NPV and accept only if the risk is acceptable or other benefits support the decision.",
    hints: ["Think about the margin of safety in the NPV."],
    explanation: "One mark for each point.",
  });

  // Struct 1 (12 marks)
  {
    const out = 45000, fl = [19000, 22000, 24000], lo = 14, hi = 22;
    const pvL = fl.map((f, i) => r2(f * invest.df(lo, i + 1, 3))), pvH = fl.map((f, i) => r2(f * invest.df(hi, i + 1, 3)));
    const npvL = invest.npv(lo, out, fl), npvH = invest.npv(hi, out, fl);
    chk(npvL, 4781); chk(npvH, -1412);
    const irr = invest.irrInterpolated(lo, hi, npvL, npvH);
    b.struct({
      d: 5, skill: "EVALUATION", calculator: true,
      stem: `Tafara Maposa runs a minibus business in Harare and is considering a second minibus costing ${usd(out)}. The expected net cash inflows are ${fl.map(usd).join(", ")} at the end of years 1 to 3. The business's cost of capital is 16%. Discount factors:\n\n${dfTable2(lo, hi, 3)}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: sum(pvL), dp: 0, tol: 0.5, wrong: [sum(fl), sum(pvH)], stem: "Calculate the total present value of the inflows at 14%, to the nearest dollar.", explanation: `${F(fl[0])} × 0.877 + ${F(fl[1])} × 0.769 + ${F(fl[2])} × 0.675 = ${F(pvL[0])} + ${F(pvL[1])} + ${F(pvL[2])} = ${usd(sum(pvL))}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: npvL, dp: 0, tol: 0.5, wrong: [sum(pvL), sum(fl) - out], stem: "Calculate the net present value at 14%, to the nearest dollar.", explanation: `${F(sum(pvL))} - ${F(out)} = ${usd(npvL)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(npvH), dp: 0, tol: 0.5, wrong: [sum(pvH), npvL], stem: "Calculate the amount by which the net present value at 22% is below zero, to the nearest dollar (amount only).", explanation: `${F(fl[0])} × 0.820 + ${F(fl[1])} × 0.672 + ${F(fl[2])} × 0.551 = ${F(sum(pvH))}; less ${F(out)} = -${F(Math.abs(npvH))}.` }),
        P.num({ label: "(d)", marks: 3, kind: "pct", value: irr, wrong: [(lo + hi) / 2, lo + (1412 / 6193) * 8], stem: "Estimate the internal rate of return by interpolation, to one decimal place.", explanation: `IRR = 14 + [${F(npvL)} ÷ (${F(npvL)} + ${F(Math.abs(npvH))})] × (22 - 14) = 14 + 0.772 × 8 = ${irr.toFixed(1)}%.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Advise whether the minibus should be bought, giving two reasons.", points: ["The IRR of 20.2% is above the cost of capital of 16%", "The NPV at 14% is positive, and at 16% it should also be positive because 16% is below the IRR", "Estimates and forecasts are uncertain (fuel prices, demand), so a margin of safety is needed; the IRR is an interpolated estimate"], modelAnswer: "The IRR of about 20.2% is above the 16% cost of capital, so the NPV at 16% is positive and the project should be accepted. The forecasts are uncertain and the IRR is an estimate, so the owner should check demand and fuel costs first.", explanation: "One mark for each point." }),
      ],
      hints: ["Multiply each inflow by its factor.", "Interpolate between a positive and a negative NPV."],
      explanation: "This item calculates NPVs at two rates, estimates the IRR and gives advice.",
    });
  }

  // Struct 2 (10 marks)
  {
    const out = 80000, fl = [24000, 30000, 32000, 26000], r = 6;
    const pv = fl.map((f, i) => r2(f * invest.df(r, i + 1, 3)));
    const npv = invest.npv(r, out, fl);
    chk(pv[2], 26880); chk(sum(pv), 96804); chk(npv, 16804);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Nyasha Cold Storage in Chinhoyi can buy a cold room for ${usd(out)}. Net cash inflows are ${fl.map(usd).join(", ")} at the end of years 1 to 4. The cost of capital is ${r}%. Discount factors:\n\n${dfTable(r, 4)}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pv[2], wrong: [fl[2], pv[1]], stem: "Calculate the present value of the year 3 inflow.", explanation: `${F(fl[2])} × 0.840 = ${usd(pv[2])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: sum(pv), wrong: [sum(fl), sum(pv) - pv[0]], stem: "Calculate the total present value of the inflows.", explanation: `${F(pv[0])} + ${F(pv[1])} + ${F(pv[2])} + ${F(pv[3])} = ${usd(sum(pv))}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: npv, wrong: [sum(fl) - out, sum(pv)], stem: "Calculate the net present value.", explanation: `${F(sum(pv))} - ${F(out)} = ${usd(npv)}.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "On the NPV rule the cold room should be:", options: [["accepted, because the NPV is positive", "Correct."], ["rejected, because the NPV is positive", "A positive NPV means accept."], ["accepted, because inflows exceed the outlay in total", "Undiscounted totals are not the NPV rule."], ["rejected, because the payback is more than one year", "Payback is not the NPV rule."]], answer: "A", explanation: "A positive NPV means the project earns more than the 6% required return." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain two limitations of this appraisal.", points: ["The inflows are forecasts and may not occur, so the NPV is uncertain", "The cost of capital of 6% is an estimate; a higher rate would reduce the NPV", "It ignores non-financial factors such as reliability, the need for skilled staff and the effect on customers"], modelAnswer: "The inflows are forecasts and may not be achieved, and the cost of capital is an estimate; a higher rate would reduce the NPV. The analysis also ignores non-financial factors such as reliability.", explanation: "One mark for each limitation (up to 3 points)." }),
      ],
      hints: ["Use the factor for each year.", "NPV = total present value - outlay."],
      explanation: "This item calculates an NPV and evaluates its limitations.",
    });
  }

  b.card("DEFINITION", "Time value of money", "Money received now is worth more than the same amount received later, because it can earn a return.");
  b.card("FORMULA", "Present value", "Cash flow × discount factor, where the discount factor is 1 ÷ (1 + r)ⁿ and is supplied in a table.");
  b.card("FORMULA", "Net present value (NPV)", "Sum of the present values of the inflows - initial outlay (at time 0, factor 1.000).");
  b.card("CONCEPT", "NPV decision rule", "Accept if NPV > 0 at the cost of capital; reject if NPV < 0.");
  b.card("DEFINITION", "Internal rate of return (IRR)", "The discount rate at which the NPV is zero. Accept if the IRR exceeds the cost of capital.");
  b.card("FORMULA", "IRR by interpolation", "Lower rate + [NPV at lower rate ÷ (NPV at lower - NPV at higher)] × (higher rate - lower rate).");
  b.card("CONCEPT", "Cost of capital", "The minimum return required by investors and lenders; the discount rate in NPV and the cut-off for IRR.");
  b.card("CONCEPT", "Cash flows in NPV", "Use net cash flows; depreciation is not a cash flow; the outlay occurs at time 0.");
  b.card("CONCEPT", "Limits of NPV and IRR", "Depend on forecasts and the cost of capital; IRR by interpolation is only an estimate.");
});
void P;
