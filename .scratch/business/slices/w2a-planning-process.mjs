// W2a: the business planning process and implementing a plan on a project (BES only).
import { concept, P, sum } from "../lib.mjs";

concept("bus.enterprise.planning-process", { file: "enterprise/planning-process", keyPrefix: "enterprise.planning-process" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the **last** step of the business planning process?",
    options: [
      ["Review and control", "Correct: results are checked against targets and corrected."],
      ["Environmental analysis", "This comes first."],
      ["Objective setting", "This comes before options and implementation."],
      ["Options generation", "This comes before selection and implementation."],
    ],
    answer: "A",
    explanation: "Order: environmental analysis; destiny, cause and calling; objective setting; options generation, evaluation and selection; implementation, review and control.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In business planning, what does **destiny** refer to?",
    options: [
      ["Where the enterprise wants to be in the future", "Correct: its long-term vision."],
      ["The problem or need it exists to address", "That is the cause."],
      ["The founder's personal passion", "That is the calling."],
      ["The daily tasks of workers", "That is part of implementation."],
    ],
    answer: "A",
    explanation: "Destiny is the long-term vision; cause is the need served; calling is the founders' passion and commitment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which objective is **SMART**?",
    options: [
      ["Sell 400 trays of eggs a month by December", "Correct: specific, measurable and time-bound."],
      ["Become a successful business", "Not specific or measurable."],
      ["Sell as many eggs as possible to anyone who asks", "No target or time limit."],
      ["Make customers happy", "Not measurable or time-bound."],
    ],
    answer: "A",
    explanation: "SMART objectives are specific, measurable, achievable, realistic and time-bound.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happens during **environmental analysis**?",
    options: [
      ["Strengths, weaknesses, opportunities and threats are studied", "Correct: often as a SWOT analysis."],
      ["Workers are given their individual tasks and their deadlines", "That is implementation."],
      ["Actual sales are compared with targets", "That is review and control."],
      ["The best option is chosen", "That is selection."],
    ],
    answer: "A",
    explanation: "Environmental analysis looks at internal strengths and weaknesses and external opportunities and threats.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bakery's purpose is \"to supply fresh, affordable bread to township households\". Which part of its purpose is this?",
    options: [
      ["Its cause", "Correct: the need it exists to serve."],
      ["Its destiny", "Destiny is the long-term vision of where it will be."],
      ["Its calling", "Calling is the founders' personal passion."],
      ["Its control", "Control is a later step of planning."],
    ],
    answer: "A",
    explanation: "The cause is the need or problem the enterprise addresses, often written as a mission statement.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A project team finds that sales are 30% below target in week 2 and adds a second product. Which step of planning is this?",
    options: [
      ["Review and control", "Correct: comparing results with targets and correcting."],
      ["Environmental analysis", "That happens before objectives are set."],
      ["Options generation", "Options are generated before the plan is implemented."],
      ["Objective setting", "The objectives already exist; this is checking progress."],
    ],
    answer: "A",
    explanation: "Control compares actual with planned results and leads to corrective action.",
    hints: ["Is the team planning, or checking a plan already running?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why should planners generate several options before choosing one?",
    options: [
      ["To choose the best use of limited resources", "Correct: comparing options avoids rushing into a weak idea."],
      ["To spend more money on planning", "The aim is better decisions, not higher spending."],
      ["Because every option will be implemented", "Only the selected option is implemented."],
      ["To avoid setting any objectives", "Options are generated to meet objectives."],
    ],
    answer: "A",
    explanation: "Comparing several options against criteria (cost, demand, risk, skills) leads to a better choice than taking the first idea.",
    hints: ["What happens if you take the first idea without comparing?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Implementation comes before objective setting in the business planning process.",
    answer: false,
    explanation: "False. Objectives are set, and options chosen, before the plan is implemented.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An action plan lists tasks, the people responsible, deadlines and resources.",
    answer: true,
    explanation: "True. An action plan turns the chosen option into specific, assigned tasks.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a business's purpose with its meaning.",
    pairs: [
      ["Destiny", "Long-term vision of where the business will be"],
      ["Cause", "The need or problem the business addresses"],
      ["Calling", "The founders' passion and commitment"],
    ],
    explanation: "Destiny, cause and calling together define why the business exists.",
  });
  b.fib({
    d: 2,
    stem: "Put the steps of the business planning process in order.",
    template: "Environmental analysis → destiny, cause and calling → {{blank:a}} setting → options generation, evaluation and selection → {{blank:b}} → review and control.",
    blanks: [
      { id: "a", accepted: ["objective"], choices: ["objective", "price", "budget", "wage"] },
      { id: "b", accepted: ["implementation"], choices: ["implementation", "registration", "liquidation", "recruitment"] },
    ],
    explanation: "Objectives follow the purpose; implementation follows selection; review and control close the loop.",
  });
  b.short({
    d: 2,
    stem: "Give the name of the four-part analysis of strengths, weaknesses, opportunities and threats used in environmental analysis.",
    accepted: ["SWOT", "SWOT analysis", "a SWOT analysis"],
    wrong: ["PEST", "SMART"],
    explanation: "A **SWOT analysis** covers internal strengths and weaknesses and external opportunities and threats.",
  });
  {
    const weeks = [[150, 132], [150, 161], [150, 118], [150, 149]];
    const target = sum(weeks.map((w) => w[0])), actual = sum(weeks.map((w) => w[1])), diff = actual - target;
    b.num({
      d: 3, skill: "APPLICATION", kind: "plain", value: diff,
      stem: `A school enterprise set a target of 150 sales each week for four weeks. Actual sales were ${weeks.map((w) => w[1]).join(", ")}. Calculate the difference between total actual sales and the total target (give a shortfall as a negative number).`,
      wrong: [-diff, actual],
      explanation: `Total target = 4 × 150 = ${target}; total actual = ${weeks.map((w) => w[1]).join(" + ")} = ${actual}; difference = ${actual} − ${target} = ${diff}.`,
      hints: ["Add the four actual figures.", "Subtract the total target."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the importance of **two** steps in the business planning process.",
    points: [
      "Step 1 identified, e.g. objective setting (1)",
      "Importance explained, e.g. gives measurable targets to work towards and check (1)",
      "Step 2 identified, e.g. review and control / environmental analysis / options evaluation (1)",
      "Importance explained, e.g. detects problems early so action is taken / bases plan on facts (1)",
    ],
    modelAnswer: "Objective setting gives the enterprise clear, measurable targets, so everyone knows what to aim for and progress can be checked. Review and control compares results with those targets, so problems are spotted early and corrected.",
    explanation: "Name each step and say why it matters.",
    hints: ["What would go wrong if the step were skipped?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Rewrite this objective so that it is SMART, and explain **two** ways your version is better: \"We want our tuck shop to do well.\"",
    points: [
      "A SMART rewrite, e.g. \"Sell US\\$600 of snacks a month by the end of Term 2\" (1)",
      "Rewrite includes a measurable figure and a time limit (1)",
      "Explains: measurable, so progress can be checked (1)",
      "Explains: time-bound / specific, so the team knows what and when (1)",
    ],
    modelAnswer: "\"Sell US\\$600 of snacks a month by the end of Term 2.\" This is better because it is measurable, so the team can check sales each month, and it has a deadline, so they know when the target must be met.",
    explanation: "A SMART objective has a figure and a deadline that can be checked.",
    hints: ["Add a number and a date."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Members of a youth club in Masvingo want to raise money for sports kit. They have US\\$120, a borrowed gas stove and eight members with free Saturdays. They list three options: (1) sell roasted maize at the bus terminus; (2) run a car wash at the shopping centre; (3) make and sell sandals from old tyres.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Carry out a brief environmental analysis: identify **one** strength, **one** weakness and **one** opportunity for the club.",
        points: ["Strength: eight members free on Saturdays / stove (1)", "Weakness: only US\\$120 capital / little experience (1)", "Opportunity: busy bus terminus or shopping centre customers (1)"],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Write **one** SMART objective for the project.",
        points: ["Specific and measurable figure, e.g. raise US\\$400 (1)", "Time-bound, e.g. within six Saturdays (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate the three options and recommend which the club should select.",
        points: [
          "Option 1: low cost, uses the stove, steady demand at terminus; seasonal maize supply (1)",
          "Option 2: needs water, buckets and space; strong demand; needs permission (1)",
          "Option 3: needs skills and time to make; uncertain demand (1)",
          "Uses criteria: cost, demand, risk, skills (1)",
          "Compares options against the US\\$120 budget and members' time (1)",
          "Justified recommendation (1)",
        ],
        modelAnswer: "Roasted maize costs little, uses the borrowed stove and sells to commuters at the terminus, though maize is seasonal. A car wash has strong demand and needs few skills, but needs water and the shopping centre's permission. Tyre sandals need skills and time the members lack, and demand is uncertain. With US\\$120 and eight members free on Saturdays, the car wash offers the highest earnings for little cost if permission and water are arranged; otherwise roasted maize is the safe choice.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain how the club should carry out review and control once the project starts.",
        points: ["Record sales and costs each Saturday (1)", "Compare with the weekly target from the objective (1)", "Act on differences, e.g. change site, price or product (1)"],
      }),
    ],
    explanation: "Apply the planning steps: analysis, SMART objectives, evaluation of options against criteria, then review and control.",
    hints: ["Strengths and weaknesses are inside the club; opportunities are outside.", "Judge each option on cost, demand, risk and skills."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "Chipo runs a school project making peanut butter. Her plan set a target of 60 jars a week at US\\$1.50 each. The table shows the first three weeks.\n\n| Week | Target (jars) | Actual (jars) |\n| --- | ---: | ---: |\n| 1 | 60 | 48 |\n| 2 | 60 | 55 |\n| 3 | 60 | 36 |",
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "plain", value: 36 - 60,
        stem: "Calculate the difference between actual and target sales in week 3 (give a shortfall as a negative number).",
        wrong: [24, 36],
        explanation: "36 − 60 = −24 jars.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: (48 + 55 + 36) * 1.5,
        stem: "Calculate the total revenue for the three weeks.",
        wrong: [180 * 1.5, 48 + 55 + 36],
        explanation: "(48 + 55 + 36) × 1.50 = 139 × 1.50 = US\\$208.50.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Suggest **two** possible reasons for the fall in week 3 and an action for each.",
        points: ["Reason 1, e.g. groundnuts ran out / production problem (1)", "Action, e.g. buy groundnuts in advance / find a second supplier (1)", "Reason 2, e.g. customers bought enough / exams reduced sales time / competitor (1)", "Action, e.g. new flavour / sell to parents or local shops (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Explain why review and control are important to Chipo's project.",
        points: ["Shows she is below target every week (1)", "Problems found early before money is lost (1)", "Leads to corrective action (1)", "Information improves the next plan / objectives may need revising (1)"],
      }),
    ],
    explanation: "Week 3 was 24 jars short; revenue was US\\$208.50. Control compares results with targets and leads to action.",
    hints: ["Actual − target.", "Total jars × price."],
  });
  b.card("FACT", "Steps of the business planning process", "Environmental analysis; destiny, cause and calling; objective setting; options generation, evaluation and selection; implementation; review and control.");
  b.card("DEFINITION", "Destiny", "Where the enterprise wants to be in the long term: its vision.");
  b.card("DEFINITION", "Cause", "The need or problem the enterprise exists to address: its mission.");
  b.card("DEFINITION", "Calling", "The founders' personal passion and commitment that drive the enterprise.");
  b.card("CONCEPT", "SMART objectives", "Specific, measurable, achievable, realistic (relevant) and time-bound.");
  b.card("DEFINITION", "Environmental analysis", "Studying internal strengths and weaknesses and external opportunities and threats (SWOT).");
  b.card("DEFINITION", "Control", "Comparing actual results with planned results and acting to correct differences.");
  b.card("CONCEPT", "Action plan", "Tasks, who is responsible, deadlines and resources for implementing the chosen option.");
  b.card("CONCEPT", "Managing a project", "Plan, organise, lead, co-ordinate and control; evaluate at the end.");
});
