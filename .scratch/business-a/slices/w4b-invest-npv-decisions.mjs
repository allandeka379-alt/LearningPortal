// W4b: invest.npv-decisions
import { concept, P, table, r2, invest, chk, fmt } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

const pv = (rate, flows) => flows.map((f, i) => r2(f * invest.df(rate, i + 1, 3)));
const tot = (xs) => r2(xs.reduce((s, x) => s + x, 0));
const dfRow = (rate, n) => Array.from({ length: n }, (_, i) => invest.df(rate, i + 1, 3).toFixed(3));
const dfTable = (rates, n) => table(["Year", ...rates.map((r) => `${r}%`)], Array.from({ length: n }, (_, i) => [`Year ${i + 1}`, ...rates.map((r) => invest.df(r, i + 1, 3).toFixed(3))]), ["l", ...rates.map(() => "r")]);

concept("abus.invest.npv-decisions", { file: "invest/npv-decisions", keyPrefix: "invest.npv-decisions" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **net present value** (NPV)?",
    ok: ["Discounted future net cash flows less the initial outlay", "Correct: discounted inflows minus the cost of the project."],
    bad: [["The total of all the cash inflows from a project over its life", "That ignores both discounting and the outlay."], ["The time taken for cash inflows to repay the outlay", "That is the payback period."], ["The average annual profit as a percentage of the outlay", "That is the accounting rate of return."]],
    explanation: "NPV = sum of (net cash flow × discount factor) − initial outlay.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are future cash flows discounted when a project is appraised?",
    ok: ["Money received later is worth less than the same sum today", "Correct: it could earn interest, loses value to inflation and is uncertain."],
    bad: [["Money received later is worth more than money today", "Money today can be invested, so it is worth more."], ["Discounting makes every project look profitable", "Discounting often turns a project's apparent gain into a loss."], ["The tax authority requires every project to be discounted each year", "Discounting is a decision technique, not a tax rule."]],
    explanation: "Discounting allows for the time value of money: interest forgone, inflation and risk.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A project has a **negative NPV** at the business's discount rate. What does this suggest?",
    ok: ["It earns less than the discount rate, so it is normally rejected", "Correct: it does not cover the cost of the finance."],
    bad: [["The project earns more than the discount rate and so should be accepted", "That describes a positive NPV."], ["The project will make a loss in every year", "A negative NPV does not mean every year loses; the total discounted return is too small."], ["The discount factors have been calculated wrongly", "A negative NPV is a valid result."]],
    explanation: "A negative NPV means the discounted inflows do not recover the outlay, so the project earns less than the required return.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What happens to the NPV of a project if the discount rate used is increased?",
    ok: ["It falls, as later cash flows are discounted more heavily", "Correct: higher rates reduce present values."],
    bad: [["It rises, because the inflows become larger", "Higher rates reduce present values; they do not enlarge inflows."], ["It stays the same, because the cash flows themselves are unchanged", "The present values depend on the rate."], ["It rises, because the outlay is discounted as well", "The outlay occurs now and has a factor of 1.000."]],
    hints: ["Compare discount factors at two rates."],
    explanation: "A higher rate gives smaller discount factors, so every present value falls and the NPV falls.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following is a **qualitative** factor in an investment decision?",
    ok: ["Investor confidence in the country's economy", "Correct: it cannot be reduced to a figure in the calculation."],
    bad: [["The project's net present value", "NPV is a quantitative result."], ["The project's payback period in years", "Payback is a quantitative result."], ["The accounting rate of return of the project", "ARR is a quantitative result."]],
    hints: ["Qualitative factors are not part of the calculation."],
    explanation: "Qualitative factors such as investor confidence, political and legal conditions, risk and stakeholders cannot be put into the arithmetic but affect the decision.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional firm in Harare has two projects. Project A costs US\\$20,000 and has an NPV of US\\$6,000. Project B costs US\\$100,000 and has an NPV of US\\$9,000. What is the best comment?",
    ok: ["B has the higher NPV but A earns far more per dollar invested", "Correct: NPV shows size of gain, not return per dollar."],
    bad: [["B must be chosen because its NPV is larger than that of A", "A larger NPV may come from a much larger outlay."], ["A must be chosen because its NPV is smaller", "A smaller NPV is not better in itself."], ["The NPVs cannot be compared because the outlays differ", "They can be compared, with care about scale."]],
    hints: ["Compare each NPV with the money invested."],
    explanation: "B earns US\\$0.09 of NPV per dollar and A US\\$0.30. NPV measures the size of the gain, so a business with limited finance may prefer A.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In NPV calculations the initial outlay is multiplied by the year-1 discount factor.",
    answer: false,
    explanation: "False. The outlay is paid now, in year 0, so its factor is 1.000 and it is subtracted without discounting.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "A project with a positive NPV is certain to be profitable.",
    answer: false,
    hints: ["Where do the cash flows in an NPV calculation come from?"],
    explanation: "False. NPV depends on forecast cash flows and a chosen discount rate, both of which are estimates.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Discount factor", "The multiplier that gives the present value of a future cash flow"], ["Discount rate", "The annual percentage used to discount future cash flows"], ["Net present value", "Discounted inflows less the initial outlay"], ["Qualitative factor", "A non-numerical influence on the investment decision"]],
    explanation: "Each term has its own role in the NPV method.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A project is normally accepted if its NPV is {{blank:a}}, and the method allows for the {{blank:b}} value of money.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "negative", "zero"] },
      { id: "b", accepted: ["time"], choices: ["time", "face", "market"] },
    ],
    explanation: "A positive NPV means the project earns more than the discount rate; NPV allows for the time value of money.",
  });

  // ---- numerical items (factors: 8% and 12%)
  const f8 = dfRow(8, 5), f6 = dfRow(6, 5);
  const t12 = dfTable([12], 4), t14 = dfTable([14], 5), t7 = dfTable([7], 4);
  const pv1 = r2(24000 * invest.df(8, 3, 3));
  chk(pv1, 19056);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: pv1, calculator: true, wrong: [24000 * 0.926, 24000 * 0.857],
    stem: `A fictional company expects to receive US\\$24,000 in three years' time. The discount rate is 8%. The discount factor for year 3 is ${f8[2]}. Calculate the present value of the receipt.\n\n${dfTable([8], 3)}`,
    hints: ["Present value = cash flow × the year-3 factor."],
    explanation: `Present value = 24,000 × ${f8[2]} = US\\$${fmt(pv1)}. Using the year-1 factor (0.926) gives US\\$22,224, and the year-2 factor (0.857) gives US\\$20,568.`,
  });
  const fl2 = [12500, 15000, 16000], o2 = 35000;
  const npv2 = invest.npv(6, o2, fl2);
  const pv2 = pv(6, fl2);
  chk(npv2, tot(pv2) - o2, 0.005);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: npv2, calculator: true, wrong: [tot(pv2), fl2.reduce((s, x) => s + x, 0) - o2],
    stem: `A fictional bakery in Bulawayo can buy an oven for US\\$${fmt(o2)}. The net cash inflows are forecast as US\\$12,500, US\\$15,000 and US\\$16,000 in years 1, 2 and 3. The discount rate is 6% and the factors are in the table. Calculate the net present value.\n\n${dfTable([6], 3)}`,
    hints: ["Multiply each inflow by its factor, add, then subtract the outlay."],
    explanation: `Present values: ${fmt(fl2[0])} × ${f6[0]} = ${fmt(pv2[0])}; ${fmt(fl2[1])} × ${f6[1]} = ${fmt(pv2[1])}; ${fmt(fl2[2])} × ${f6[2]} = ${fmt(pv2[2])}. Total = ${fmt(tot(pv2))}. NPV = ${fmt(tot(pv2))} − ${fmt(o2)} = US\\$${fmt(r2(npv2))}. Forgetting to subtract the outlay gives US\\$${fmt(tot(pv2))}, and the undiscounted result is US\\$8,500.`,
    workedSolution: `1. Present values: ${fmt(pv2[0])}, ${fmt(pv2[1])} and ${fmt(pv2[2])}.\n2. Total present value = ${fmt(tot(pv2))}.\n3. NPV = ${fmt(tot(pv2))} − ${fmt(o2)} = ${fmt(r2(npv2))}.`,
  });
  const fl3 = [14000, 17000, 19000, 15000], o3 = 52000;
  const npv3 = invest.npv(12, o3, fl3);
  const pv3 = pv(12, fl3);
  chk(npv3, tot(pv3) - o3, 0.005);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: npv3, calculator: true, daily: true, wrong: [tot(pv3), fl3.reduce((s, x) => s + x, 0) - o3],
    stem: `A fictional mill in Mutare is offered a machine costing US\\$${fmt(o3)}. The net cash inflows are US\\$14,000, US\\$17,000, US\\$19,000 and US\\$15,000 in years 1 to 4. The discount rate is 12%. Calculate the NPV (a negative answer should be entered with a minus sign).\n\n${t12}`,
    hints: ["The total of the present values is smaller than the outlay."],
    explanation: `Present values: ${fmt(pv3[0])}, ${fmt(pv3[1])}, ${fmt(pv3[2])} and ${fmt(pv3[3])}; total ${fmt(tot(pv3))}. NPV = ${fmt(tot(pv3))} − ${fmt(o3)} = −US\\$${fmt(Math.abs(r2(npv3)))}. The negative NPV means that the machine earns less than 12% and should normally be rejected, even though the undiscounted inflows (US\\$65,000) exceed the outlay.`,
    workedSolution: `1. Present values: ${fmt(pv3[0])}, ${fmt(pv3[1])}, ${fmt(pv3[2])}, ${fmt(pv3[3])}.\n2. Total = ${fmt(tot(pv3))}.\n3. NPV = ${fmt(tot(pv3))} − ${fmt(o3)} = ${fmt(r2(npv3))}.`,
  });
  const fl4 = [22000, 29000, 34000, 38000, 20000], o4 = 80000;
  const npv4 = invest.npv(14, o4, fl4);
  const pv4 = pv(14, fl4);
  chk(npv4, tot(pv4) - o4, 0.005);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: npv4, calculator: true, wrong: [tot(pv4), r2(npv4 - 20000 * invest.df(14, 5, 3))],
    stem: `A fictional safari lodge near Victoria Falls plans an extension costing US\\$${fmt(o4)}. The net cash inflows are US\\$22,000, US\\$29,000, US\\$34,000, US\\$38,000 and US\\$20,000 in years 1 to 5. The discount rate is 14%. Calculate the NPV.\n\n${t14}`,
    hints: ["Five years of factors are needed; use the table."],
    explanation: `Present values: ${pv4.map(fmt).join(", ")}; total ${fmt(tot(pv4))}. NPV = ${fmt(tot(pv4))} − ${fmt(o4)} = US\\$${fmt(r2(npv4))}. The project earns more than 14% and is acceptable on this test. Leaving out year 5 gives US\\$${fmt(r2(npv4 - pv4[4]))}.`,
    workedSolution: `1. Present values: ${pv4.map(fmt).join(", ")}.\n2. Total = ${fmt(tot(pv4))}.\n3. NPV = ${fmt(tot(pv4))} − ${fmt(o4)} = ${fmt(r2(npv4))}.`,
  });
  const fl5 = [18000, 21000, 26000], o5 = 50000;
  const n8 = invest.npv(5, o5, fl5), n12 = invest.npv(9, o5, fl5);
  const diff = n8 - n12;
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "money", value: diff, calculator: true, wrong: [n8, n12],
    stem: `A project costs US\\$${fmt(o5)} and gives net cash inflows of US\\$18,000, US\\$21,000 and US\\$26,000 in years 1 to 3. Using the factors below, calculate by how many dollars the NPV at 5% exceeds the NPV at 9%.\n\n${dfTable([5, 9], 3)}`,
    hints: ["Find the NPV at each rate separately, then subtract."],
    explanation: `At 5%: ${pv(5, fl5).map(fmt).join(" + ")} = ${fmt(tot(pv(5, fl5)))}; NPV = ${fmt(r2(n8))}. At 9%: ${pv(9, fl5).map(fmt).join(" + ")} = ${fmt(tot(pv(9, fl5)))}; NPV = ${fmt(r2(n12))}. The difference = US\\$${fmt(r2(diff))}. A higher rate lowers the NPV.`,
    workedSolution: `1. NPV at 5% = ${fmt(tot(pv(5, fl5)))} − ${fmt(o5)} = ${fmt(r2(n8))}.\n2. NPV at 9% = ${fmt(tot(pv(9, fl5)))} − ${fmt(o5)} = ${fmt(r2(n12))}.\n3. Difference = ${fmt(r2(n8))} − ${fmt(r2(n12))} = ${fmt(r2(diff))}.`,
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one qualitative factor that a business should consider when making an investment decision.",
    accepted: ["risk", "investor confidence", "political stability", "legal factors", "environmental impact", "stakeholder reaction", "strategic fit", "economic conditions", "inflation", "government policy"],
    keywords: { any: ["risk", "confidence", "political", "legal", "environment", "stakeholder", "strategic", "economic", "inflation", "government", "social", "reputation"], minAny: 1 },
    explanation: "Accept risk, investor confidence, political, legal or economic conditions, environmental or social effects, stakeholders or strategic fit.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why money received in the future is worth less than the same sum received today.",
    points: ["Money received today can be invested or saved to earn interest", "Inflation reduces the purchasing power of a sum received later", "The future cash flow is uncertain and may not arrive"],
    modelAnswer: "A sum received today can be saved or invested to earn interest, so the same sum received later has lost that opportunity. Inflation also reduces what the sum can buy later, and a future cash flow is uncertain and may not arrive.",
    hints: ["Think of interest, inflation and risk."],
    explanation: "The time value of money.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional company has a project with a small negative NPV. Analyse one reason why it might still go ahead with it.",
    points: ["The NPV depends on forecasts and a discount rate, which may be too cautious", "A small error in the forecast could make the NPV positive", "The project may bring non-financial benefits, such as a stronger brand or entry to a new market", "These benefits may produce future profits not included in the forecast"],
    modelAnswer: "The NPV depends on forecasts and a chosen discount rate, so a small error could make it positive. The project may also bring non-financial benefits, such as a stronger brand or entry to a new market, which could produce profits that are not included in the forecast.",
    hints: ["What does the NPV calculation leave out?"],
    explanation: "Qualitative factors and forecast error.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional exporter in Harare invests in a plant whose cash flows come mainly in years 4 and 5. Analyse how a rise in the discount rate would affect the NPV.",
    points: ["A higher rate gives smaller discount factors", "Later cash flows are discounted more heavily than early ones", "So the present values of the year 4 and 5 flows fall most", "The NPV falls and may become negative, making the project less attractive"],
    modelAnswer: "A higher rate gives smaller discount factors, and the later the cash flow the larger the reduction. Because most of the plant's cash arrives in years 4 and 5, their present values fall by the most, so the NPV falls and could become negative.",
    hints: ["Which years' factors fall the most?"],
    explanation: "Late cash flows are most sensitive to the rate.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether NPV is the best method for a small business to use when it appraises an investment.",
    points: ["NPV uses all the cash flows over the project's life", "It allows for the time value of money", "It gives a decision rule in dollars", "It depends on the discount rate and on forecasts, which may be inaccurate", "It is more complex and ignores how quickly cash returns", "Judgement and reason, for example use NPV with payback and qualitative factors"],
    modelAnswer: "NPV uses all the cash flows and allows for the time value of money, and it gives a clear decision rule in dollars. But it depends on the discount rate and on forecasts, which may be inaccurate, it is more complex for a small business to use, and it ignores how quickly cash returns. A small business should use NPV together with payback and qualitative factors such as risk and its finance.",
    hints: ["Weigh strengths and weaknesses, then say what the business should do."],
    explanation: "Strengths and weaknesses weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const fS1 = [9000, 11000, 12000, 8000], oS1 = 28000;
  const nS1 = invest.npv(7, oS1, fS1);
  const pS1 = pv(7, fS1);
  chk(nS1, tot(pS1) - oS1, 0.005);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Chipo is considering a fictional bee-farming project in Chinhoyi. The hives and equipment cost US\\$${fmt(oS1)}. The net cash inflows are forecast as US\\$9,000, US\\$11,000, US\\$12,000 and US\\$8,000 in years 1 to 4. Her cost of finance is 7%.\n\n${t7}`,
    parts: [
      P.num({ label: "(a)", marks: 4, kind: "money", value: nS1, type: "CALCULATION", wrong: [tot(pS1), 40000 - oS1], stem: "Calculate the net present value.", explanation: `Present values: ${pS1.map(fmt).join(", ")}; total ${fmt(tot(pS1))}. NPV = ${fmt(tot(pS1))} − ${fmt(oS1)} = US\\$${fmt(r2(nS1))}.`, workedSolution: `1. Present values: ${pS1.map(fmt).join(", ")}.\n2. Total = ${fmt(tot(pS1))}.\n3. NPV = ${fmt(tot(pS1))} − ${fmt(oS1)} = ${fmt(r2(nS1))}.` }),
      P.mcq({ label: "(b)", marks: 2, stem: "What does the result show?", options: [["It earns more than 7%, so accept it on this test", "Correct: a positive NPV."], ["The project earns less than 7% and should be rejected on this test", "That would be a negative NPV."], ["The project is certain to make a profit", "The forecasts are estimates."], ["The project pays back within one year", "NPV does not measure payback."]], answer: "A", explanation: "A positive NPV means the discounted return is above the 7% required." }),
      P.manual({ label: "(c)", marks: 3, stem: "State and explain one qualitative factor that Chipo should consider before investing.", points: ["A qualitative factor, for example the reliability of the honey price or her experience of bee-keeping", "Why it matters: the cash flows are forecasts that may not occur", "The effect on the decision, for example she might delay or look for a larger safety margin"], modelAnswer: "A qualitative factor is her experience of bee-keeping. If she is inexperienced, hives may fail or produce less honey, so the forecast cash flows may not occur, and she might delay the investment until she has trained or look for a project with a larger margin.", explanation: "Any relevant qualitative factor, developed." }),
    ],
    hints: ["Use the year 1 to 4 factors at 7%."],
    explanation: `NPV is US\\$${fmt(r2(nS1))}, so the project is acceptable on this test.`,
  });
  const oR = 70000, fR = [25000, 28000, 31000, 24000], fSS = [16000, 26000, 36000, 46000];
  const nR = invest.npv(11, oR, fR), nSS = invest.npv(11, oR, fSS);
  const pR = pv(11, fR), pSS = pv(11, fSS);
  const pbS = invest.payback(oR, fSS);
  chk(nR, tot(pR) - oR, 0.005); chk(nSS, tot(pSS) - oR, 0.005);
  const tbl = table(["Net cash inflow (US\\$)", "Project R", "Project S"], [["Initial outlay", oR, oR], ["Year 1", fR[0], fSS[0]], ["Year 2", fR[1], fSS[1]], ["Year 3", fR[2], fSS[2]], ["Year 4", fR[3], fSS[3]]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Kuda Exports is a fictional company in Harare that sells dried fruit to a neighbouring country. It can finance only one of two projects. The company's cost of finance is 11%. The inflows of Project S depend on a new export market whose trade rules may change.\n\n${tbl}\n\nDiscount factors at 11%:\n\n${dfTable([11], 4)}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the net present value of:", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: nR, wrong: [tot(pR), fR.reduce((s, x) => s + x, 0) - oR], stem: "Project R;", explanation: `Present values: ${pR.map(fmt).join(", ")}; total ${fmt(tot(pR))}. NPV = ${fmt(tot(pR))} − ${fmt(oR)} = US\\$${fmt(r2(nR))}.` }),
        P.num({ label: "(ii)", marks: 3, kind: "money", value: nSS, wrong: [tot(pSS), fSS.reduce((s, x) => s + x, 0) - oR], stem: "Project S.", explanation: `Present values: ${pSS.map(fmt).join(", ")}; total ${fmt(tot(pSS))}. NPV = ${fmt(tot(pSS))} − ${fmt(oR)} = US\\$${fmt(r2(nSS))}.` }),
      ] }),
      P.num({ label: "(b)", marks: 2, kind: "years", value: pbS, wrong: [3, 2.5], stem: "Calculate the payback period of Project S, in years to two decimal places.", explanation: `Cumulative inflows: 16,000; 42,000; 78,000. After year 2, 28,000 is still to recover; year 3 brings 36,000, so the fraction = 28,000 ÷ 36,000 = 0.78. Payback = ${r2(pbS).toFixed(2)} years.` }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate which project Kuda Exports should choose.", points: [[`Project S has the higher NPV (US\\$${fmt(r2(nSS))} against US\\$${fmt(r2(nR))}) and both are positive`, 2], ["Project R returns cash sooner: its cash flows are larger early on, while S's largest flow is in year 4", 1], ["S's inflows depend on a new export market where the trade rules may change (political and legal risk), so its forecast may be unreliable", 1], ["NPV depends on the 11% rate and on forecasts; a higher rate would reduce S more because its cash comes late", 1], ["Judgement and reason, for example S if the company is confident in the market, otherwise R", 1]], levels: [[3, 5, 6, "Uses both NPVs and the risk in the stimulus, weighs timing and qualitative factors; a justified recommendation with a condition"], [2, 3, 4, "Compares NPVs with some use of the case; judgement weakly supported"], [1, 1, 2, "States results with little analysis"]], modelAnswer: `Project S has the higher NPV, US\\$${fmt(r2(nSS))} against US\\$${fmt(r2(nR))}, and both are positive, so both earn more than 11%. But S's largest cash flow comes in year 4 and depends on an export market where trade rules may change, so there is political and legal risk, and a higher discount rate would reduce S more than R because its cash comes later. R returns its cash sooner. Kuda Exports should choose S if it is confident that the market will stay open and can wait for the cash; otherwise R is the safer choice.`, hints: ["Compare the NPVs, then the timing and the risk described in the stimulus."], explanation: "S wins on NPV; R wins on timing and certainty; the decision depends on confidence in the export market." }),
    ],
    hints: ["Multiply each inflow by its factor, add and subtract the outlay.", "Payback uses undiscounted cash flows."],
    explanation: `NPV of R US\\$${fmt(r2(nR))}; S US\\$${fmt(r2(nSS))}; S payback ${r2(pbS).toFixed(2)} years. S is better on NPV, R is safer.`,
  });

  b.card("DEFINITION", "Net present value (NPV)", "The sum of the present values of a project's net cash flows less the initial outlay.");
  b.card("DEFINITION", "Discounting", "Converting a future sum to its value today because money received sooner is worth more.");
  b.card("FORMULA", "Present value", "Net cash flow × discount factor for that year; the outlay at the start has a factor of 1.000.");
  b.card("CONCEPT", "NPV decision rule", "Positive NPV: the project earns more than the discount rate, so accept. Negative NPV: reject. Between projects, higher NPV is better.");
  b.card("CONCEPT", "Why a higher discount rate lowers NPV", "Factors fall, and later cash flows are reduced most.");
  b.card("CONCEPT", "Advantages of NPV", "Uses all the cash flows; allows for the time value of money; gives a dollar decision rule.");
  b.card("CONCEPT", "Limitations of NPV", "Depends on the discount rate and on forecasts; more complex; ignores liquidity and the size of the project.");
  b.card("FACT", "Qualitative factors in investment decisions", "Risk, finance available, political, legal and economic conditions, investor confidence, stakeholders, strategic fit.");
  b.card("CONCEPT", "Choosing between appraisal methods", "Payback shows liquidity, ARR the average return, NPV the time-adjusted gain; use them together.");
});
