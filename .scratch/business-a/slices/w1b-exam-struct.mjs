// W1b exam-format items: ZIMSEC Paper 1 section A structured questions (10 marks), EXAM.ZIM_STRUCT10
import { concept, P, EXAM, checkExam, ZIM, ZBS, table, money, chk } from "../lib.mjs";

const PAPER = "ZIMSEC Paper 1 section A";
const base = { examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs };

concept("abus.objectives.decisions-ethics", { file: "exam/w1b-struct", keyPrefix: "exam.w1b-struct" }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: SMART objective, quarterly target, constraint and ethics (both ZIMSEC syllabi)
  {
    const last = 144000, rise = 25;
    const target = (last * (100 + rise)) / 100;
    chk(target, 180000, 1e-9);
    const q4 = (target * 2) / 6;
    chk(q4, 60000, 1e-9);
    b.struct({
      ...base, d: 3, applies: ZIM, paper: PAPER,
      concepts: ["abus.objectives.decisions-ethics", "abus.objectives.aims-types"],
      stem: `Mbare Poultry is a fictional business in Harare that sold chickens worth ${money(last)} last year. The owner's objective is to raise sales by ${rise}% by 31 December. The target will be spread over the four quarters in the ratio 1 : 1 : 2 : 2, because demand is highest at the end of the year. A bank has refused to lend money for a second chicken run, and a rival firm has been accused of selling chickens after their sell-by date.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Targets",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: target, stem: "Calculate the sales target for this year.", wrong: [(last * rise) / 100, last + rise], explanation: "25% of 144,000 = 36,000. Target = 144,000 + 36,000 = US\\$180,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: q4, stem: "Calculate the sales target for the fourth quarter.", wrong: [target / 4, (target * 2) / 5], explanation: "The ratio 1 : 1 : 2 : 2 has 6 parts. One part = 180,000 ÷ 6 = 30,000. Quarter 4 = 2 × 30,000 = US\\$60,000." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 3, stem: "Identify **one** constraint on Mbare Poultry's objective and explain how it limits the firm.",
          points: ["Finance is the constraint: the bank has refused a loan", "Without the loan the second chicken run cannot be built", "So output cannot rise enough to reach the target"],
          modelAnswer: "Finance is a constraint because the bank has refused to lend money for the second chicken run. Without it output cannot rise by much, so the 25% target may not be achieved.",
          explanation: "A constraint, shown in the case, with its effect.",
        }),
        P.manual({
          label: "(c)", marks: 3, stem: "Explain **one** reason why Mbare Poultry should not copy the behaviour of the rival firm.",
          points: ["Selling out-of-date chickens is unethical because it can harm customers' health", "The firm could be prosecuted or lose customers' trust", "Loss of reputation would reduce sales and damage the growth objective"],
          modelAnswer: "Selling chickens after their sell-by date is unethical because it could harm customers' health. If it was discovered, the firm could be prosecuted and lose its customers' trust, which would reduce sales and damage its growth objective.",
          explanation: "An ethical reason developed with a consequence.",
        }),
      ]),
      hints: ["Target = last year's sales plus 25%.", "Add the ratio parts first: 1 + 1 + 2 + 2."],
      explanation: "Target US\\$180,000; fourth-quarter target US\\$60,000; finance is the constraint; selling out-of-date goods is unethical and risks reputation.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: interest rate and exchange rate (Business Studies only)
  {
    const loan = 60000, r1 = 10, r2_ = 12;
    const extra = (loan * (r2_ - r1)) / 100;
    chk(extra, 1200, 1e-9);
    const rand = 30000, e2 = 20;
    const cost2 = rand / e2;
    chk(cost2, 1500, 1e-9);
    b.struct({
      ...base, d: 3, applies: ZBS, paper: PAPER,
      concepts: ["abus.environment.government-economy"],
      stem: `Gokwe Furniture is a fictional manufacturer in Gweru. It has a variable-rate bank loan of ${money(loan)}. The central bank raises interest rates and the loan rate rises from ${r1}% to ${r2_}% a year. The firm also imports a sawing machine priced at R${rand.toLocaleString("en-GB")} (rand). The exchange rate was R15 for US\\$1 and is now R${e2} for US\\$1 (all rates are assumed for practice).`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Calculations",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: extra, stem: "Calculate the increase in the yearly interest on the loan.", wrong: [(loan * r2_) / 100, (loan * r1) / 100], explanation: "The rate rises by 2 percentage points. 2% of 60,000 = US\\$1,200." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: cost2, stem: "Calculate the cost of the sawing machine in US dollars at the new exchange rate.", wrong: [rand / 15, rand * e2], explanation: "30,000 ÷ 20 = US\\$1,500. At the old rate it cost 30,000 ÷ 15 = US\\$2,000." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 3, stem: "Explain **one** way in which the rise in interest rates could affect the furniture sales of Gokwe Furniture.",
          points: ["Customers who borrow to buy furniture face higher repayments", "So some will delay or cancel their purchases", "Demand for the firm's furniture falls"],
          modelAnswer: "Customers who borrow to buy furniture face higher repayments, so some will delay or cancel their purchases. This reduces demand for the firm's furniture.",
          explanation: "Higher interest rates reduce spending that depends on borrowing.",
        }),
        P.manual({
          label: "(c)", marks: 3, stem: "State **one** way in which the government could assist small manufacturers like Gokwe Furniture and explain how it would help.",
          points: ["A way: a grant or subsidy, tax relief, training or cheaper credit", "Explanation: it lowers the firm's costs or raises its income", "Result: the firm can lower prices, invest or employ more workers"],
          modelAnswer: "The government could give a grant or tax relief. This lowers the firm's costs, so it can lower prices, invest in better equipment or employ more workers.",
          explanation: "An assistance measure, its effect on the firm, and a result.",
        }),
      ]),
      hints: ["The interest rate rises by 2 percentage points.", "Divide the rand price by the number of rand per dollar."],
      explanation: "Extra interest US\\$1,200; the machine now costs US\\$1,500; higher rates reduce demand; government assistance lowers costs.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: cost-benefit analysis of a grain mill (both ZIMSEC syllabi)
  {
    const costs = [16000, 1500 * 5, 2500], bens = [7000 * 5, 1300 * 5];
    const tc = costs.reduce((a, v) => a + v, 0), tb = bens.reduce((a, v) => a + v, 0);
    chk(tc, 26000, 1e-9);
    chk(tb, 41500, 1e-9);
    b.struct({
      ...base, d: 3, applies: ZIM, paper: PAPER,
      concepts: ["abus.project.cost-benefit", "abus.project.formulation"],
      stem: "A village committee in Chipinge (a fictional community) is considering a grain mill. Over the next five years the costs would be: " + money(16000) + " for the mill and shed, " + money(1500) + " a year to run it, and " + money(2500) + " for the noise and dust that would affect nearby homes. The benefits would be " + money(7000) + " a year in milling fees and " + money(1300) + " a year for the value of time that villagers save by not travelling to a distant mill.",
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Over the five years:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: tc, stem: "Calculate the total costs.", wrong: [16000 + 1500 + 2500, 16000 + 7500], explanation: "Running costs = 1,500 × 5 = 7,500. Total costs = 16,000 + 7,500 + 2,500 = US\\$26,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: tb - tc, stem: "Calculate the net benefit (total benefits minus total costs).", wrong: [tb, tc - tb], explanation: "Benefits = (7,000 + 1,300) × 5 = 41,500. Net benefit = 41,500 − 26,000 = US\\$15,500." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 3, stem: "Explain why the noise and dust are a social cost rather than an economic cost.",
          points: ["They fall on the nearby households, not on the committee that owns the mill", "They have no market price, so they must be estimated", "An economic cost is a money cost to the organisation, such as the cost of the mill"],
          modelAnswer: "The noise and dust fall on nearby households, not on the committee that owns the mill. They have no market price, so their value must be estimated, unlike an economic cost such as the price of the mill.",
          explanation: "Who bears the cost and how it is valued.",
        }),
        P.manual({
          label: "(c)", marks: 3, stem: "Explain **one** limitation of cost-benefit analysis for the committee.",
          points: ["Social items such as time saved and noise are estimates", "A different estimate could change the net benefit", "So the decision may not be as certain as the totals suggest"],
          modelAnswer: "Items such as the value of time saved and of the noise are only estimates. A different estimate could change the net benefit, so the decision may be less certain than the totals suggest.",
          explanation: "A limitation developed with its effect on the decision.",
        }),
      ]),
      hints: ["Running costs are paid for five years.", "Benefits also last five years."],
      explanation: "Total costs US\\$26,000; net benefit US\\$15,500; the noise and dust are a social cost; valuations are a limitation.",
    });
  }
});
