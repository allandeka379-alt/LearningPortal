// W4b: invest.payback-arr
import { concept, P, table, r2, invest, chk } from "../lib.mjs";
import { mc } from "../tables/w4b-lib.mjs";

const yrs = (v) => r2(v);

concept("abus.invest.payback-arr", { file: "invest/payback-arr", keyPrefix: "invest.payback-arr" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does the **payback period** measure?",
    ok: ["The time taken to recover the initial outlay from net cash inflows", "Correct: it is a measure of how quickly the money comes back."],
    bad: [["The average percentage profit earned each year on the outlay", "That describes the accounting rate of return."], ["The total profit earned over the life of the project", "Payback ignores cash flows after the outlay is recovered."], ["The present value of the future cash flows of the project", "That is the idea behind net present value."]],
    explanation: "Payback is the length of time needed for net cash inflows to repay the initial investment.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do businesses carry out investment appraisal before buying expensive equipment?",
    ok: ["The sums are large and hard to reverse, so must be tested", "Correct: a mistake would be costly and difficult to undo."],
    bad: [["Appraisal removes all risk from the project", "Forecasts are estimates, so risk remains."], ["Appraisal is required to calculate the business's tax", "Tax is calculated from the accounts, not from appraisal."], ["Appraisal guarantees that the forecast cash flows will occur", "Appraisal uses forecasts and cannot make them come true."]],
    explanation: "Investments are large, long term and hard to reverse, so a business tests them with forecast figures before committing.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In this course, ARR is calculated using which formula?",
    ok: ["Average annual profit ÷ initial investment × 100", "Correct: the stated initial-basis formula."],
    bad: [["Total cash inflows ÷ initial investment × 100", "This uses total inflows, not average annual profit."], ["Initial investment ÷ average annual profit × 100", "This inverts the fraction."], ["Average annual profit ÷ annual revenue × 100", "This is a profit margin, not a rate of return on the investment."]],
    hints: ["The numerator is a profit, not a cash total."],
    explanation: "ARR = average annual profit ÷ initial investment × 100, where average annual profit = (total net cash inflows − outlay) ÷ years. Always use the formula given in the question.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which is a **disadvantage** of the payback method?",
    ok: ["It ignores cash flows after the payback date", "Correct: a project's later profits are not considered."],
    bad: [["It is too complicated for small businesses to use", "Payback is one of the simplest methods."], ["It takes no account of how soon the cash is received", "Payback does consider timing up to the payback date."], ["It gives its result as a percentage return", "That describes ARR; payback is given as a time."]],
    hints: ["What happens in the years after the money is recovered?"],
    explanation: "Payback stops once the outlay is recovered, so a project with large later inflows is not rewarded.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "A fictional trading company has limited cash and expects its market to change quickly. Which appraisal measure would it probably put the most weight on?",
    ok: ["Payback, as cash returns sooner and the risk is lower", "Correct: early recovery of cash suits a business short of finance."],
    bad: [["ARR, since it covers the whole life of the project", "ARR relies on distant forecasts that are least reliable in a fast-changing market."], ["The total profit, as timing is not important", "Timing is important when cash is short."], ["Neither, because the market is changing", "Payback is useful precisely when forecasts are uncertain."]],
    hints: ["Which method focuses on liquidity?"],
    explanation: "Payback emphasises early cash and limits exposure to distant forecasts, which suits a cash-short business in an uncertain market.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A project has an ARR of 18% when divided by the initial investment. What is the ARR when the formula in a question divides by the average investment (half the outlay)?",
    ok: ["36%", "Correct: dividing by half the outlay doubles the answer."],
    bad: [["9%", "This halves the result; dividing by a smaller amount increases it."], ["18%", "The basis changes the answer."], ["27%", "There is no basis for adding half of the percentage."]],
    hints: ["Dividing by half as much gives twice the percentage."],
    explanation: "Average investment = outlay ÷ 2, so ARR on that basis = 18% × 2 = 36%.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The payback method takes account of cash flows over the whole life of a project.",
    answer: false,
    explanation: "False. Payback considers only the cash flows up to the date at which the outlay is recovered; ARR uses all the flows.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "A project with the highest ARR always has the shortest payback period.",
    answer: false,
    hints: ["Think about a project with large cash flows late in its life."],
    explanation: "False. A project can earn large inflows late in its life, giving a high ARR but a long payback.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Payback period", "Time taken to recover the outlay"], ["Accounting rate of return", "Average annual profit as a percentage of the investment"], ["Net cash flow", "Cash inflows less cash outflows in a period"], ["Investment appraisal", "Evaluating a long-term project before committing money"]],
    explanation: "Each term is defined by what it measures.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Payback focuses on {{blank:a}}, while ARR ignores the {{blank:b}} of the cash flows.",
    blanks: [
      { id: "a", accepted: ["liquidity"], choices: ["liquidity", "profit margin", "market share"] },
      { id: "b", accepted: ["timing"], choices: ["timing", "size", "total"] },
    ],
    explanation: "Payback focuses on liquidity, the early return of cash; ARR treats a dollar in year 5 the same as a dollar in year 1, so it ignores timing.",
  });

  // ---- numerical items
  const pb1 = invest.payback(54000, [16000, 16000, 16000, 16000, 16000]);
  chk(pb1, 3.375, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "years", value: pb1, calculator: true, wrong: [yrs(16000 / 54000), 4],
    stem: "A fictional butchery in Gweru buys a cold room for US\\$54,000. It expects net cash inflows of US\\$16,000 a year, arising evenly. Calculate the payback period in years, to two decimal places.",
    hints: ["Outlay ÷ annual net cash inflow."],
    explanation: "Payback = 54,000 ÷ 16,000 = 3.375, which is 3.38 years. Inverting the fraction gives 0.30; rounding up to 4 years ignores the part year.",
  });
  const fl2 = [23000, 37000, 41000, 29000];
  const pb2 = invest.payback(90000, fl2);
  chk(pb2, 2.7317073, 1e-6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "years", value: pb2, calculator: true, daily: true, wrong: [3, 2.5],
    stem: "A project costs US\\$90,000. Its net cash inflows are US\\$23,000 in year 1, US\\$37,000 in year 2, US\\$41,000 in year 3 and US\\$29,000 in year 4, arising evenly in each year. Calculate the payback period in years, to two decimal places.",
    hints: ["Find the cumulative cash flow at the end of each year."],
    explanation: "After year 2 the cumulative inflow is 60,000, so 30,000 is still to be recovered. Year 3 brings 41,000, so the fraction is 30,000 ÷ 41,000 = 0.732. Payback = 2.73 years. Rounding up to 3 years ignores the part year.",
  });
  const pb3 = invest.payback(32000, [8000, 12000, 18000]) * 12;
  chk(pb3, 32, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "months", value: pb3, calculator: true, wrong: [36, 30],
    stem: "A fictional dairy buys equipment for US\\$32,000. Net cash inflows are US\\$8,000 in year 1, US\\$12,000 in year 2 and US\\$18,000 in year 3, arising evenly. Calculate the payback period in months.",
    hints: ["Find the years needed, then multiply the decimal by 12."],
    explanation: "After year 2 the cumulative inflow is 20,000, so 12,000 is still to be recovered. The fraction of year 3 = 12,000 ÷ 18,000 = 0.6667. Payback = 2.6667 years = 32 months. Treating year 3 as a full year gives 36 months.",
  });
  const fl4 = [23000, 26000, 31000, 33000, 27000];
  const arr1 = invest.arr(80000, fl4, { basis: "initial" });
  chk(arr1, 15, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: arr1, calculator: true, wrong: [r2((140000 / 80000) * 100), r2(((60000 / 80000) * 100))],
    stem: "A project costs US\\$80,000 and produces net cash inflows over five years of US\\$23,000, US\\$26,000, US\\$31,000, US\\$33,000 and US\\$27,000. Using ARR = average annual profit ÷ initial investment × 100, calculate the ARR to one decimal place.",
    hints: ["Total inflows − outlay = total profit; then divide by the number of years."],
    explanation: "Total inflows = 140,000. Total profit = 140,000 − 80,000 = 60,000. Average annual profit = 60,000 ÷ 5 = 12,000. ARR = 12,000 ÷ 80,000 × 100 = 15.0%. Using total inflows gives 175.0%, and using total profit gives 75.0%.",
  });
  const fl5 = [38000, 44000, 50000, 58000];
  const arr2 = invest.arr(120000, fl5, { basis: "average" });
  chk(arr2, 29.1667, 0.001);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: arr2, calculator: true, wrong: [r2(invest.arr(120000, fl5, { basis: "initial" })), r2((190000 / 60000) * 100)],
    stem: "A project costs US\\$120,000 and gives net cash inflows of US\\$38,000, US\\$44,000, US\\$50,000 and US\\$58,000 in years 1 to 4. The question defines ARR as average annual profit ÷ average investment × 100, where the average investment is half of the initial outlay. Calculate the ARR to one decimal place.",
    hints: ["Average investment = 120,000 ÷ 2."],
    explanation: "Total inflows = 190,000; total profit = 70,000; average annual profit = 17,500. Average investment = 60,000. ARR = 17,500 ÷ 60,000 × 100 = 29.2%. On the initial investment the answer would be 14.6%.",
    workedSolution: "1. Total inflows = 38,000 + 44,000 + 50,000 + 58,000 = 190,000.\n2. Total profit = 190,000 − 120,000 = 70,000; average annual profit = 70,000 ÷ 4 = 17,500.\n3. Average investment = 120,000 ÷ 2 = 60,000.\n4. ARR = 17,500 ÷ 60,000 × 100 = 29.2%.",
  });
  const needInflow = (0.2 * 50000 * 4 + 50000) / 4;
  chk(needInflow, 22500, 1e-9);
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "money", value: needInflow, calculator: true, wrong: [10000, 12500],
    stem: "A fictional company will invest US\\$50,000 in a four-year project only if the ARR (average annual profit ÷ initial investment × 100) is at least 20%. The net cash inflow will be the same each year. Calculate the smallest annual net cash inflow that meets the target.",
    hints: ["Work backwards: find the average annual profit needed, then add back the depreciation of the outlay."],
    explanation: "Average annual profit needed = 20% × 50,000 = 10,000. Total profit needed = 40,000 over four years. Total inflows needed = 40,000 + 50,000 = 90,000, so the annual inflow = 90,000 ÷ 4 = US\\$22,500. The average annual profit (10,000) is not the cash inflow: the outlay must also be recovered.",
    workedSolution: "1. Average annual profit = 20% × 50,000 = 10,000.\n2. Total profit = 10,000 × 4 = 40,000.\n3. Total inflows = 40,000 + 50,000 = 90,000.\n4. Annual inflow = 90,000 ÷ 4 = 22,500.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State one advantage of using the payback method to appraise an investment.",
    accepted: ["simple", "it is simple", "easy to calculate", "quick to calculate", "focuses on liquidity", "shows how quickly the money is recovered", "reduces risk", "suits risky projects", "easy to understand"],
    keywords: { any: ["simple", "easy", "quick", "liquidity", "risk", "cash back", "recovered"], minAny: 1 },
    explanation: "Accept simplicity, speed, focus on liquidity or suitability for risky projects.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain one limitation of the payback method.",
    points: ["It ignores cash flows after the payback date", "So a project with large later inflows may be rejected in favour of a weaker project that pays back sooner", "It also ignores the timing of cash within the payback period and gives no measure of overall profitability"],
    modelAnswer: "Payback ignores cash flows after the date at which the outlay is recovered, so a project with large inflows in later years may be rejected in favour of one that pays back sooner but earns little afterwards. It does not measure the overall profitability of the project.",
    hints: ["What does payback leave out?"],
    explanation: "A limitation, developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional bakery in Bulawayo is offered a machine with an ARR of 22%, above its target of 15%. Analyse why the owner might still reject it.",
    points: ["ARR is based on forecast cash flows, which may be too optimistic", "The cash flows may arrive late, so the payback is long and the money is tied up", "ARR ignores the timing of the cash flows", "The bakery may not be able to finance the outlay, or may prefer a project with lower risk"],
    modelAnswer: "ARR relies on forecasts that may be too optimistic. It also ignores the timing of the flows, so most of the cash may arrive late and the payback may be long, tying up the bakery's money. The bakery may also lack the finance for the outlay or prefer a lower-risk project.",
    hints: ["Think about what ARR ignores and about the business's own position."],
    explanation: "ARR is not the only factor in the decision.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether a small business should use payback or ARR when it chooses between two investments.",
    points: ["Payback is simple and focuses on liquidity", "It suits a business with limited cash or an uncertain market", "Payback ignores cash after the payback date, so it can reject a profitable project", "ARR uses all the cash flows over the project's life and gives a percentage return", "ARR ignores timing and depends on the basis used and on forecasts that become less reliable with time", "Judgement and reason, for example use both measures together, and put more weight on payback when cash is short"],
    modelAnswer: "Payback is simple and shows how quickly cash returns, which suits a small business with limited cash or an uncertain market, but it ignores cash after the payback date and so can reject a profitable project. ARR uses all the cash flows and gives a percentage that can be compared with a target, but it ignores timing and depends on forecasts that become less reliable further ahead. A small business should use both measures together, giving more weight to payback when cash is short.",
    hints: ["Give the strengths and weaknesses of each measure before deciding."],
    explanation: "Both methods weighed, with a conditional judgement.",
  });

  // ---- practice structured items
  const o = 36000, kiosk = [9000, 11000, 12000, 12000];
  const kPb = invest.payback(o, kiosk);
  const kArr = invest.arr(o, kiosk, { basis: "initial" });
  chk(kPb, 3.3333333, 1e-6); chk(kArr, 5.5555556, 1e-6);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "Rudo is considering a fictional mobile-phone repair kiosk in Harare. The kiosk and equipment cost US\\$36,000. The forecast net cash inflows are US\\$9,000 in year 1, US\\$11,000 in year 2, US\\$12,000 in year 3 and US\\$12,000 in year 4, arising evenly in each year. Her target is a payback of under three years and an ARR of at least 15% (average annual profit ÷ initial investment × 100).",
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "years", value: kPb, type: "CALCULATION", wrong: [4, 2.5], stem: "Calculate the payback period in years, to two decimal places.", explanation: "Cumulative inflows: 9,000; 20,000; 32,000 after year 3 and 44,000 after year 4. After year 3 the amount recovered is 32,000, so 4,000 is still to be recovered. The fraction of year 4 = 4,000 ÷ 12,000 = 0.33. Payback = 3.33 years.", workedSolution: "1. After year 2: 9,000 + 11,000 = 20,000; after year 3: 32,000.\n2. 36,000 − 32,000 = 4,000 still to recover.\n3. Fraction of year 4 = 4,000 ÷ 12,000 = 0.33; payback = 3.33 years." }),
      P.num({ label: "(b)", marks: 3, kind: "pct", value: kArr, type: "CALCULATION", wrong: [r2((44000 / 36000) * 100), r2((8000 / 36000) * 100)], stem: "Calculate the ARR, to one decimal place.", explanation: "Total inflows = 44,000. Total profit = 8,000. Average annual profit = 2,000. ARR = 2,000 ÷ 36,000 × 100 = 5.6%.", workedSolution: "1. Total inflows = 9,000 + 11,000 + 12,000 + 12,000 = 44,000.\n2. Total profit = 44,000 − 36,000 = 8,000; average annual profit = 8,000 ÷ 4 = 2,000.\n3. ARR = 2,000 ÷ 36,000 × 100 = 5.6%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Advise Rudo whether to invest, using both results.", points: ["Payback of 3.33 years is longer than her target of under three years", "ARR of 5.6% is far below the target of 15%", "So the kiosk fails both tests, and she should not invest unless the forecast inflows can be improved"], modelAnswer: "The payback of 3.33 years is longer than her target of under three years, and the ARR of 5.6% is well below her target of 15%. The kiosk fails both tests, so she should not invest unless she can raise the forecast inflows or cut the cost.", explanation: "Both results compared with the targets." }),
    ],
    hints: ["Work out the cumulative cash flow year by year.", "Total profit = total inflows − outlay."],
    explanation: "Payback 3.33 years; ARR 5.6%; both targets missed.",
  });
  const mushrooms = [14000, 16000, 20000, 20000, 20000], honey = [25000, 20000, 10000, 8000, 7000];
  const mPb = invest.payback(50000, mushrooms), hPb = invest.payback(50000, honey);
  const mArr = invest.arr(50000, mushrooms, { basis: "initial" }), hArr = invest.arr(50000, honey, { basis: "initial" });
  chk(mPb, 3, 1e-9); chk(hPb, 2.5, 1e-9); chk(mArr, 16, 1e-9); chk(hArr, 8, 1e-9);
  const tbl = table(["Net cash inflow (US\\$)", "Mushroom house", "Honey processing"], [["Initial outlay", 50000, 50000], ["Year 1", mushrooms[0], honey[0]], ["Year 2", mushrooms[1], honey[1]], ["Year 3", mushrooms[2], honey[2]], ["Year 4", mushrooms[3], honey[3]], ["Year 5", mushrooms[4], honey[4]]]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Tafara Agro is a fictional farming company near Mutare with US\\$50,000 to invest in one of two projects, a mushroom house or a honey-processing unit. The net cash inflows are forecast to arise evenly through each year.\n\n${tbl}\n\nARR = average annual profit ÷ initial investment × 100.`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the payback period, in years to two decimal places, of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "years", value: mPb, wrong: [2.5, 4], stem: "the mushroom house;", explanation: "Cumulative inflows: 14,000; 30,000; 50,000 at the end of year 3. Payback = 3.00 years." }),
        P.num({ label: "(ii)", marks: 2, kind: "years", value: hPb, wrong: [2, 3], stem: "the honey-processing unit.", explanation: "Cumulative inflows: 25,000; 45,000; so 5,000 is still to recover. Year 3 brings 10,000, so the fraction = 0.5. Payback = 2.50 years." }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the ARR, to one decimal place, of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: mArr, wrong: [r2((90000 / 50000) * 100), 32], stem: "the mushroom house;", explanation: "Total inflows = 90,000; total profit = 40,000; average annual profit = 8,000. ARR = 8,000 ÷ 50,000 × 100 = 16.0%." }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: hArr, wrong: [r2((70000 / 50000) * 100), 16], stem: "the honey-processing unit.", explanation: "Total inflows = 70,000; total profit = 20,000; average annual profit = 4,000. ARR = 4,000 ÷ 50,000 × 100 = 8.0%." }),
      ] }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate which project Tafara Agro should choose.", points: [["Honey processing pays back faster (2.50 years against 3.00 years), so cash is recovered sooner", 1], ["Mushrooms have double the ARR (16.0% against 8.0%) and total profit of US\\$40,000 against US\\$20,000", 2], ["The honey inflows fall each year (25,000 to 7,000), so the project is front loaded and may be an early boom; the mushroom flows rise and rely on later demand", 1], ["Limitations: both measures ignore the time value of money and the forecasts are estimates", 1], ["Judgement and reason, for example mushrooms unless cash is short", 1]], levels: [[3, 5, 6, "Uses both measures for both projects, links to the pattern of cash flows and the company's situation; a justified recommendation with a condition"], [2, 3, 4, "Compares some results with some analysis; judgement weakly supported"], [1, 1, 2, "States results with little analysis"]], modelAnswer: "Honey processing pays back faster, in 2.50 years against 3.00 years, so it returns cash sooner. But the mushroom house earns double the ARR, 16.0% against 8.0%, and a total profit of US\\$40,000 against US\\$20,000. The honey inflows fall each year from US\\$25,000 to US\\$7,000, while the mushroom inflows rise and depend on later demand, which is less certain. Both measures ignore the time value of money and rely on estimates. Tafara Agro should choose the mushroom house unless it is short of cash or doubts the later demand, in which case honey processing is safer.", hints: ["Compare payback and ARR, then think about the pattern of the cash flows."], explanation: "The two measures disagree; the choice depends on the company's need for cash and its confidence in later demand." }),
    ],
    hints: ["Cumulative inflows give the payback.", "Total profit = total inflows − outlay."],
    explanation: "Mushrooms: payback 3.00 years, ARR 16.0%; honey: payback 2.50 years, ARR 8.0%. Mushrooms win on return, honey on speed.",
  });

  b.card("DEFINITION", "Investment appraisal", "Evaluating the likely costs and benefits of a long-term project, using quantitative techniques, before committing money.");
  b.card("DEFINITION", "Payback period", "The time taken for net cash inflows to repay the initial outlay.");
  b.card("FORMULA", "Payback with equal inflows", "Initial outlay ÷ annual net cash inflow.");
  b.card("FORMULA", "Payback with unequal inflows", "Years completed + (amount still to recover ÷ cash flow of the payback year); the fraction × 12 gives months.");
  b.card("FORMULA", "Accounting rate of return (initial basis)", "(Total net cash inflows − outlay) ÷ years ÷ initial investment × 100.", "State the formula; the average-investment basis divides by half the outlay.");
  b.card("CONCEPT", "Advantages of payback", "Simple and quick; focuses on liquidity; suits risky projects and uncertain markets.");
  b.card("CONCEPT", "Disadvantages of payback", "Ignores cash after the payback date and ignores overall profitability.");
  b.card("CONCEPT", "Advantages and disadvantages of ARR", "Uses all the cash flows and gives a percentage for comparison; ignores timing and depends on the basis and on forecasts.");
  b.card("CONCEPT", "When payback and ARR disagree", "Payback favours quick return of cash; ARR favours the highest overall return; the decision depends on the business's need for cash, risk and finance.");
});
