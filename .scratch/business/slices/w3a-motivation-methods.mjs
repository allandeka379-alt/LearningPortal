// W3a: financial and non-financial methods of motivation.
import { concept, P, money, fmt, r2, check } from "../lib.mjs";

concept("bus.people.motivation-methods", { file: "people/motivation-methods", keyPrefix: "people.motivation-methods" }, (b) => {
  // Calculations (different figures from the lesson's worked examples).
  const tHours = 45, tRate = 3.2, tPay = r2(tHours * tRate);
  const oBasicH = 40, oRate = 2.8, oHours = 5, oPay = r2(oBasicH * oRate + oHours * oRate * 2);
  check("overtime pay", oPay, 140);
  const bags = 240, perBag = 0.35, bagPay = r2(bags * perBag);
  const basic = 250, commPct = 5, sales = 18400, comm = r2((sales * commPct) / 100), commPay = r2(basic + comm);
  check("commission pay", commPay, 1170);

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which method pays workers for each unit they produce?",
    options: [
      ["Piece rate", "Correct: pay depends on the number of units produced."],
      ["Time rate", "Time rate pays for hours worked."],
      ["Salary", "A salary is a fixed annual amount."],
      ["Profit sharing", "Profit sharing pays part of the business's profit."],
    ],
    answer: "A",
    explanation: "**Piece rate** links pay directly to output.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a non-financial method of motivation?",
    options: [
      ["Job rotation", "Correct: moving between tasks involves no extra pay."],
      ["Commission", "Commission is a payment linked to sales."],
      ["Bonus", "A bonus is an extra payment."],
      ["Profit sharing", "Profit sharing is a financial reward."],
    ],
    answer: "A",
    explanation: "Non-financial methods include job rotation, job enrichment, training, promotion and praise.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which payment method is most suitable for security guards at a shopping centre?",
    options: [
      ["Time rate", "Correct: guards' output cannot be counted, so pay by hours."],
      ["Piece rate", "There are no units of output to count."],
      ["Commission", "Guards do not make sales."],
      ["Payment per customer served", "Guards do not serve customers in countable units."],
    ],
    answer: "A",
    explanation: "Where output cannot be measured, **time rate** (or salary) is used.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main disadvantage of piece rate to a business?",
    options: [
      ["Workers may rush and quality may fall", "Correct: speed is rewarded, not quality."],
      ["Workers have no reason to produce more", "Piece rate rewards higher output."],
      ["The cost of each unit is unknown", "The labour cost per unit is fixed by the rate."],
      ["It cannot be used where output is counted", "Piece rate needs output that can be counted."],
    ],
    answer: "A",
    explanation: "Piece rate encourages quantity, so quality checks are needed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of a fringe benefit?",
    options: [
      ["A contribution to the employee's medical aid", "Correct: a non-wage benefit."],
      ["Overtime pay at time and a half for extra hours", "Overtime pay is part of wages."],
      ["Commission on sales", "Commission is a wage payment."],
      ["A monthly salary", "Salary is the main pay, not a fringe benefit."],
    ],
    answer: "A",
    explanation: "Fringe benefits are extras such as medical aid, a car, housing, meals or staff discounts.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A bakery gives each baker responsibility for a whole batch of bread, from mixing to quality checks. Which method is this?",
    options: [
      ["Job enrichment", "Correct: more responsibility and a complete unit of work."],
      ["Job rotation", "Rotation moves workers between tasks, not adding responsibility."],
      ["Piece rate", "Nothing is said about pay per unit."],
      ["Profit sharing", "No share of profit is mentioned."],
    ],
    answer: "A",
    hints: ["Has the baker been given more responsibility?"],
    explanation: "**Job enrichment** gives workers more responsibility and a whole task, a Herzberg motivator.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a business introduce profit sharing for all its employees?",
    options: [
      ["Employees gain when the business does well, so they care about costs", "Correct: it links workers' rewards to the business's success."],
      ["It pays workers more for each extra unit they produce", "That is piece rate."],
      ["It guarantees each worker a higher, fixed monthly income", "Profit shares vary and are usually annual."],
      ["It rewards sales staff for each sale", "That is commission."],
    ],
    answer: "A",
    hints: ["What do all employees share in?"],
    explanation: "Profit sharing gives employees a stake in the business's success, encouraging cooperation and care with costs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Commission is usually paid as a percentage of the value of sales.",
    answer: true,
    explanation: "True. Commission rewards sales staff in proportion to what they sell.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Job rotation gives workers more responsibility.",
    answer: false,
    explanation: "False. Job rotation moves workers between tasks at the same level; job enrichment adds responsibility.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", kind: "money", value: tPay, calculator: true,
    stem: `A cleaner at a hospital in Masvingo is paid ${money(tRate)} an hour and works ${tHours} hours in a week. Calculate the cleaner's pay for the week.`,
    wrong: [r2(40 * tRate)],
    explanation: `Pay = hours × rate = ${tHours} × ${money(tRate)} = ${money(tPay)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: oPay, calculator: true,
    stem: `A driver is paid ${money(oRate)} an hour for a ${oBasicH}-hour week. Overtime is paid at double time. One week he works ${oHours} hours of overtime. Calculate his gross pay for the week.`,
    wrong: [r2((oBasicH + oHours) * oRate), r2(oBasicH * oRate + oHours * oRate * 1.5)],
    hints: ["Double time means 2 × the normal hourly rate."],
    explanation: `Basic = ${oBasicH} × ${money(oRate)} = ${money(oBasicH * oRate)}. Overtime rate = ${money(oRate * 2)}; overtime pay = ${oHours} × ${money(oRate * 2)} = ${money(oHours * oRate * 2)}. Gross pay = ${money(oPay)}.`,
    workedSolution: `1. Basic pay = ${oBasicH} × ${fmt(oRate)} = ${money(oBasicH * oRate)}.\n2. Overtime rate = ${fmt(oRate)} × 2 = ${money(oRate * 2)}.\n3. Overtime pay = ${oHours} × ${fmt(oRate * 2)} = ${money(oHours * oRate * 2)}.\n4. Gross pay = ${money(oPay)}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: bagPay, calculator: true, daily: true,
    stem: `A worker at a maize-meal mill is paid ${money(perBag)} for each bag packed. On Monday she packs ${bags} bags. How much does she earn on Monday?`,
    wrong: [r2(bags / perBag)],
    explanation: `Pay = ${bags} × ${money(perBag)} = ${money(bagPay)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: commPay, calculator: true,
    stem: `A salesman for a fictional furniture company in Bulawayo earns a basic ${money(basic)} a month plus ${commPct}% commission on his sales. In June his sales were ${money(sales)}. Calculate his total pay for June.`,
    wrong: [comm, r2(basic + sales * 0.005)],
    hints: ["Work out the commission first, then add the basic pay."],
    explanation: `Commission = ${commPct}% × ${money(sales)} = ${money(comm)}. Total pay = ${money(basic)} + ${money(comm)} = ${money(commPay)}.`,
    workedSolution: `1. Commission = ${commPct} ÷ 100 × ${fmt(sales)} = ${money(comm)}.\n2. Total pay = ${fmt(basic)} + ${fmt(comm)} = ${money(commPay)}.`,
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each worker with the most suitable financial reward.",
    pairs: [
      ["A tea picker on an estate", "Piece rate per kilogram picked"],
      ["A car salesperson", "Basic pay plus commission"],
      ["A school bursar", "Monthly salary"],
      ["A night-shift security guard", "Hourly time rate"],
    ],
    explanation: "Countable output suits piece rate; sales suit commission; professional office work suits salary; unmeasurable output suits time rate.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Moving workers between similar tasks in turn is job {{blank:a}}; giving them more responsibility is job {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["rotation"], choices: ["rotation", "enrichment", "enlargement"] },
      { id: "b", accepted: ["enrichment"], choices: ["enrichment", "rotation", "enlargement"] },
    ],
    explanation: "Rotation adds variety; enrichment adds responsibility and challenge.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** non-financial methods a small business with little cash could use to motivate its workers.",
    points: [
      "Method 1, e.g. praise / recognition / employee of the month.",
      "Explained: meets esteem needs / Herzberg motivator at little cost.",
      "Method 2, e.g. job rotation / job enrichment / on-the-job training.",
      "Explained: reduces boredom / gives responsibility / develops skills.",
    ],
    hints: ["Choose methods that cost little money."],
    modelAnswer: "The owner could praise good work and choose an employee of the month, which meets workers' esteem needs at almost no cost. She could also rotate workers between tasks, which reduces boredom and teaches them new skills.",
    explanation: "Praise, recognition, rotation, enrichment and training are low-cost motivators.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: "Nyasha runs a workshop in Chinhoyi making wooden chairs. Her six carpenters are paid US\\$2.50 an hour for a 40-hour week. Nyasha is thinking of changing to a piece rate of US\\$4.50 for each chair that passes inspection. Last week the most skilled carpenter made 26 chairs that passed inspection; a newer carpenter made 18.",
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: r2(40 * 2.5),
        stem: "Calculate a carpenter's pay for the week under the present time rate.",
        wrong: [r2(2.5 * 26)],
        explanation: "40 × US\\$2.50 = US\\$100.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: r2(26 * 4.5), type: "CALCULATION",
        stem: "Calculate the skilled carpenter's pay for last week's output under the proposed piece rate.",
        wrong: [r2(18 * 4.5)],
        explanation: "26 × US\\$4.50 = US\\$117.",
        workedSolution: "1. Pay = chairs passed × rate.\n2. 26 × US\\$4.50 = US\\$117.",
      }),
      P.num({
        label: "(c)", marks: 1, kind: "money", value: r2(40 * 2.5 - 18 * 4.5),
        stem: "By how much would the newer carpenter's pay fall under the piece rate, compared with the time rate?",
        wrong: [r2(18 * 4.5)],
        explanation: "Time rate US\\$100; piece rate 18 × US\\$4.50 = US\\$81; fall = US\\$19.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend whether Nyasha should change to the piece rate. Justify your answer.",
        points: [
          "For: skilled carpenter earns more (US\\$117), so incentive to raise output.",
          "For: paying only for chairs that pass inspection protects quality / fixed labour cost per chair.",
          "Against: newer carpenter's pay falls (to US\\$81); may leave / demotivated.",
          "Against: pay falls if timber runs out or machines break; stress; less security.",
          "Alternative: basic wage plus a bonus per chair above a target / training for new carpenters.",
          "Justified recommendation.",
        ],
        modelAnswer: "Piece rate would reward the skilled carpenter, who would earn US\\$117 instead of US\\$100, encouraging higher output, and paying only for chairs that pass inspection protects quality. However, the newer carpenter's pay would fall to US\\$81, which may make him leave, and all carpenters would lose pay if timber deliveries were late. Nyasha should keep a basic weekly wage and add a bonus for each approved chair above a target, while training newer carpenters, so output rises without making pay insecure.",
      }),
    ],
    hints: ["(b) Chairs passed × piece rate.", "(c) Compare the two pays for the newer carpenter."],
    explanation: "Piece rate rewards skilled workers but cuts pay for slower ones; a basic wage with a bonus can combine security and incentive.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Sipho manages a branch of a fictional insurance company in Mutare. His 12 clerks are well paid with medical aid and a pension, but they process the same claim forms every day. Two experienced clerks have left this year to join a rival, saying there was \"no future\" at the branch. Head office has offered Sipho either a 10% pay rise for all clerks or funds for a training programme.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** fringe benefits the clerks already receive.",
        points: ["Medical aid.", "Pension."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** non-financial methods Sipho could use, apart from training, to motivate the clerks.",
        points: [
          "Job rotation between claims, customer service and records.",
          "Reduces boredom of processing the same forms.",
          "Promotion path / team leader posts / job enrichment (handle a claim from start to finish).",
          "Gives a future and responsibility, so experienced clerks stay.",
        ],
        modelAnswer: "Sipho could rotate clerks between claims processing, customer enquiries and records, so the work is less repetitive. He could also create senior clerk posts with responsibility for checking claims, giving clerks a clear route to promotion.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Sipho should choose the pay rise or the training programme.",
        points: [
          "Clerks are already well paid with benefits: pay is a hygiene factor (Herzberg).",
          "Pay rise may not stop leavers who want a future; costly every year.",
          "Training develops skills and leads to promotion / self-actualisation.",
          "Addresses the 'no future' reason for leaving.",
          "Risk: trained staff may be poached by rivals; tie training to promotion within the branch.",
          "Justified choice.",
        ],
        modelAnswer: "The clerks are already well paid and have medical aid and a pension, so in Herzberg's terms their hygiene factors are met; a 10% rise would be expensive every year and may not stop clerks leaving, because they leave for lack of a future, not pay. Training develops their skills and prepares them for promotion, meeting esteem and self-actualisation needs. The risk is that trained clerks are more attractive to rivals, so Sipho should link training to new senior posts in the branch. He should choose the training programme.",
      }),
    ],
    hints: ["(c) Why did the clerks say they left?", "(c) Use Herzberg or Maslow."],
    explanation: "When pay is already good, non-financial methods such as training and promotion address the real cause of leaving.",
  });
  b.card("DEFINITION", "What is **piece rate**?", "Pay for each unit produced or task completed.");
  b.card("DEFINITION", "What is **commission**?", "Payment, usually a percentage of sales value, paid to sales staff.");
  b.card("DEFINITION", "What are **fringe benefits**?", "Non-wage rewards such as medical aid, a car, housing, meals, school fees or staff discounts.");
  b.card("FORMULA", "How to calculate pay with overtime?", "Basic hours × rate + overtime hours × (rate × 1.5 for time and a half, or × 2 for double time).");
  b.card("FORMULA", "Basic pay plus commission?", "Total pay = basic pay + (commission % ÷ 100 × value of sales).");
  b.card("CONCEPT", "Job rotation or job enrichment?", "Rotation: moving between tasks at the same level (variety). Enrichment: more responsibility and challenge.");
  b.card("CONCEPT", "When is time rate better than piece rate?", "When output cannot be counted or quality matters more than speed.");
  b.card("FACT", "Five non-financial methods?", "Job enrichment, job rotation, training, promotion, praise and recognition (also team working, job enlargement).");
});
