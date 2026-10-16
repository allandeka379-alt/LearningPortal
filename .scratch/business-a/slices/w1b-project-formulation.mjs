// W1b: project.formulation (ZIMSEC only)
import { concept, P, chk, money } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.project.formulation", { file: "project/formulation", keyPrefix: "project.formulation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A business **project** is best described as",
    ok: ["a one-off task with an objective, a budget and an end date", "Correct: it is temporary and aimed at a specific result."],
    bad: [["a business activity repeated every day without any set end date", "Routine work that has no end date is not a project."], ["a list of all the workers employed in a firm during the year", "That is a staff list, not a project."], ["a loan from a bank that is repaid in equal monthly parts", "A loan is a source of finance, not a project."]],
    explanation: "A project is a temporary undertaking with a clear objective, resources and a time limit.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which is the **correct order** of the stages of the project cycle?",
    ok: ["Identification, formulation, implementation, evaluation", "Correct: the cycle begins with an idea and ends with a review."],
    bad: [["Evaluation, identification, implementation, formulation", "Evaluation comes at the end, not the start."], ["Implementation, identification, evaluation, formulation", "Implementation cannot precede identification and formulation."], ["Formulation, evaluation, identification, implementation", "A project must be identified before it can be formulated."]],
    explanation: "The order is identification, formulation (proposal and plan), implementation and evaluation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of a **project proposal**?",
    ok: ["To persuade others to approve or to fund the project", "Correct: it presents the idea and its benefits for approval."],
    bad: [["To record the profit made after the whole project ends", "That belongs to the evaluation report."], ["To list the workers who will be dismissed at the end", "A proposal does not list dismissals."], ["To replace the need for any plan or any budget at all", "A plan and budget are still needed."]],
    explanation: "A proposal is written to gain approval and support for the project.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A group has found that three families in the area want to buy school jerseys but cannot find a nearby supplier. This is an example of which stage of the project cycle?",
    ok: ["Identification of the need", "Correct: spotting a need or opportunity starts the cycle."],
    bad: [["Evaluation of the results", "Evaluation takes place after the project is completed."], ["Implementation of the plan", "Implementation follows the plan and proposal."], ["Writing the project budget", "The budget is part of formulation."]],
    explanation: "Finding a need that could become a project is identification.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A student team has strong sewing skills but very little money. Which project idea fits their resources best?",
    ok: ["Mending clothes for local people using borrowed machines", "Correct: it uses their skills and needs little start-up money."],
    bad: [["Opening a large restaurant with a rented kitchen and staff", "A restaurant needs far more money and a different skill set."], ["Buying a minibus to run a long-distance transport route", "A minibus needs large capital."], ["Drilling a borehole to supply water to a whole village", "Drilling needs expensive equipment and expertise."]],
    hints: ["Match the idea to both the skills and the money available."],
    explanation: "Choose a project that matches skills and available funds.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why should a project plan include a **contingency**?",
    ok: ["To cover unexpected costs that arise during the project", "Correct: a contingency is a reserve for the unexpected."],
    bad: [["To increase the profit the group makes from the project", "A contingency is a reserve, not extra profit."], ["To make the project finish earlier than planned", "A contingency does not shorten the project."], ["To show the bank that no risk exists at all", "A contingency recognises that risk exists."]],
    hints: ["Think about what happens if prices rise or deliveries are late."],
    explanation: "A contingency allows for unexpected costs without stopping the project.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which question belongs to the **evaluation** stage of a project?",
    ok: ["Did the project meet its objective on time and budget?", "Correct: evaluation compares results with the objective, time and budget."],
    bad: [["Which project ideas should be listed at the very beginning?", "That belongs to identification."], ["How much material should be bought for the next week?", "That is part of implementation."], ["Who will be invited to approve the written proposal?", "That belongs to formulation."]],
    hints: ["Evaluation looks back at what has been done."],
    explanation: "Evaluation looks back at results, time and cost.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best-supported** judgement on whether a group should choose the project with the highest weighted score?",
    ok: ["Yes, if the scores and weights are realistic and have been checked", "Correct: the matrix helps, but its inputs are judgements."],
    bad: [["Yes, because a scoring matrix is always completely accurate in use", "A matrix depends on judgements, which may be wrong."], ["No, because a project should be chosen without any comparison at all", "A comparison improves the decision."], ["No, because the weights in a scoring matrix have no value at all", "Weights show what matters most and are useful if sensible."]],
    hints: ["Choose the answer that is conditional on the quality of the scores."],
    explanation: "A matrix supports a decision, but the result depends on the quality of the scores and weights.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Evaluation is the last stage of the project cycle.",
    answer: true,
    explanation: "True. After implementation the team compares results with the objective, time and budget and records lessons.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A project plan is written after the project has been completed.",
    answer: false,
    explanation: "False. The plan is written before implementation to set out activities, timetable and budget; the evaluation report is written after the project ends.",
    hints: ["Think about when the group needs to know what to do and when."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of the project cycle to its main activity.",
    pairs: [["Identification", "Spotting a need and listing project ideas"], ["Formulation", "Choosing an idea and writing the proposal, plan and budget"], ["Implementation", "Obtaining resources and carrying out the activities"], ["Evaluation", "Comparing results with the objective and recording lessons"]],
    explanation: "Each stage has a different purpose.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A project {{blank:a}} sets out the activities, timetable and budget, while a {{blank:b}} is a reserve for unexpected costs.",
    blanks: [
      { id: "a", accepted: ["plan"], choices: ["plan", "loss", "price"] },
      { id: "b", accepted: ["contingency"], choices: ["contingency", "profit", "dividend"] },
    ],
    explanation: "The plan sets out how the project will be carried out; a contingency covers unexpected cost.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** criterion that a group could use to choose between project ideas.",
    accepted: ["demand", "cost", "start-up cost", "skills", "resources", "risk", "timing", "profit", "availability of materials", "market"],
    explanation: "Demand, cost, skills, resources, timing and risk are the usual criteria.",
  });

  {
    const w = [50, 30, 20], s = [4, 3, 5];
    const score = s.reduce((a, v, i) => a + v * w[i], 0) / 100;
    chk(score, 3.9, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: "A group scores a fictional poultry project 4 for demand (weight 50%), 3 for cost (weight 30%) and 5 for skills (weight 20%). What is its weighted score out of 5? Give your answer to one decimal place.",
      kind: "plain", dp: 1, value: score, wrong: [(4 + 3 + 5) / 3, 4 * 50 + 3 * 30 + 5 * 20],
      hints: ["Multiply each score by its weight, add them, then divide by 100."],
      explanation: `(4 × 50 + 3 × 30 + 5 × 20) ÷ 100 = (200 + 90 + 100) ÷ 100 = 3.9. Adding the scores and dividing by 3 ignores the weights and gives 4.0.`,
    });
  }
  {
    const items = [420, 180, 90, 60];
    const sub = items.reduce((a, v) => a + v, 0);
    const total = (sub * 110) / 100;
    chk(sub, 750, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `The budget of a fictional mushroom project is ${money(420)} for materials, ${money(180)} for equipment, ${money(90)} for transport and ${money(60)} for advertising. The group adds a contingency of 10% of these costs. What is the total project budget?`,
      kind: "money", value: total, wrong: [sub, sub + 10, sub * 1.01],
      hints: ["Add the items, then find 10% of the subtotal."],
      explanation: `Subtotal = 420 + 180 + 90 + 60 = 750. Contingency = 10% of 750 = 75. Total = 750 + 75 = US\\$825. Leaving out the contingency gives US\\$750.`,
    });
  }
  {
    const income = 1560, spent = 1200;
    const profit = income - spent;
    const pct = (profit / spent) * 100;
    chk(pct, 30, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `A fictional school project earned ${money(income)} in sales and cost ${money(spent)} to run. Calculate the profit as a percentage of the amount spent. Give your answer to one decimal place.`,
      kind: "pct", value: pct, wrong: [(profit / income) * 100, (income / spent) * 100],
      hints: ["Profit is income minus the amount spent."],
      explanation: `Profit = 1,560 − 1,200 = US\\$360. Profit as a percentage of cost = 360 ÷ 1,200 × 100 = 30.0%. Dividing by sales gives 23.1%.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a group should evaluate its project when it has finished.",
    points: ["To find out whether the objective, time and budget were met", "To record lessons that will improve future projects"],
    modelAnswer: "The group needs to find out whether the project met its objective, time and budget. It also records lessons so that future projects are better planned.",
    explanation: "Two purposes of evaluation.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A group of Form 5 students in Gweru is choosing between a vegetable garden and a car-wash project. Explain **two** factors they should consider before choosing.",
    points: ["Demand: how many customers will buy vegetables or car washes", "Application: they could survey neighbours or passing cars", "Resources and skills: water, land, tools and knowledge of gardening", "Application: a garden needs water and several months to grow, while a car wash needs a supply of water and buckets"],
    modelAnswer: "They should consider demand, perhaps by asking neighbours whether they would buy vegetables or use a car wash. They should also consider resources: a garden needs land, water and months to grow, while a car wash needs a water supply and buckets and can start earning at once.",
    hints: ["Think about customers, resources and time."],
    explanation: "Two factors, each applied to the two ideas.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why poor record keeping during a project makes evaluation difficult.",
    points: ["Without records the group cannot tell actual sales and costs", "It cannot compare results with the budget", "It cannot tell which activities caused delays or waste", "So lessons for the future are unreliable"],
    modelAnswer: "Without records the group cannot tell what it really sold and spent, so it cannot compare results with the budget. It cannot find out which activities caused delay or waste, so the lessons for the next project are unreliable.",
    hints: ["Think about what an evaluation compares."],
    explanation: "A chain from missing records to unreliable lessons.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Evaluate whether a group should always choose the project with the highest expected profit.",
    points: ["Profit is a key reason for an enterprise project", "Higher profit projects may need more money and skills", "Higher profit may also carry more risk", "The group may have other aims, such as learning or service", "Judgement with a reason or condition"],
    modelAnswer: "Profit matters in an enterprise project, but a high-profit idea may need more money and skills than the group has and may carry more risk. The group may also value learning or service. It should choose the highest-profit project only if it can afford it, has the skills and can bear the risk; otherwise a safer project is better.",
    hints: ["Weigh profit against resources, risk and other aims."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: the Form 6 enterprise group at a school in Mutare plans a project to sell fruit juice at the school sports day. The budget is US\\$300 for fruit and sugar, US\\$150 for bottles, US\\$60 for posters and US\\$40 for transport. The group adds a contingency of 10% of the costs. It expects to sell 500 bottles at US\\$1.50 each.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total project budget including the contingency.", kind: "money", value: ((300 + 150 + 60 + 40) * 110) / 100, wrong: [300 + 150 + 60 + 40, 55], explanation: "Subtotal = 550. Contingency = 55. Total = US\\$605." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the expected profit if all 500 bottles are sold and the whole budget is spent.", kind: "money", value: 500 * 1.5 - 605, wrong: [500 * 1.5, 500 * 1.5 - 550], explanation: "Sales = 500 × 1.50 = US\\$750. Profit = 750 − 605 = US\\$145." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** risk to the project and how the group could reduce it.", points: ["Risk: bad weather or low attendance means fewer sales", "Reduce by pre-selling to teachers or ordering fewer bottles first", "Or keep some stock for later days to avoid waste"], modelAnswer: "Bad weather or low attendance would mean fewer sales. The group could pre-sell juice to teachers and order only part of the bottles at first, so that waste is limited.", explanation: "A risk and a way to reduce it." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** questions the group should ask when evaluating the project.", points: ["Was the profit target met?", "Was the project completed within the budget and on time?"], modelAnswer: "Was the profit target met, and was the project completed within the budget and on time?", explanation: "Two evaluation questions." }),
    ],
    hints: ["The contingency is 10% of the subtotal."],
    explanation: "The budget and the profit are calculated, a risk is explained and evaluation questions are given.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: the Business Enterprise Skills class at a school in Chinhoyi has US\\$800 to start a project. Three ideas are on the table: a school uniform repair service, a poultry project and a stationery shop. Demand is highest for stationery, but the shop needs US\\$1,100 to start. The poultry project would need a hired shed and has taken three months to produce income in other classes. The uniform repair service needs only US\\$250 and the class has three students with sewing skills, but the school is small and only about 150 pupils might use it.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the stationery shop is difficult for the class to start.", points: ["It needs US\\$1,100 to start", "The class has only US\\$800", "So it cannot afford it unless it finds extra funds"], modelAnswer: "The shop needs US\\$1,100 to start, but the class has only US\\$800, so it cannot afford it without extra funds.", explanation: "The cost compared with the funds." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse **one** limitation of the poultry project for this class.", points: ["It takes three months to produce income", "The class may not have enough time in the school year", "It also needs a hired shed, adding cost"], modelAnswer: "The poultry project takes three months to produce income, so the class might not have enough time to earn and evaluate within the school year. It also needs a hired shed, which adds cost.", hints: ["Look at time and cost."], explanation: "Time and cost limit the poultry idea." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate which project the class should choose.", points: ["Uniform repair: low cost, has skills, but limited demand", "Stationery: strong demand but cost exceeds funds", "Poultry: slow and needs extra cost", "Criteria: demand, cost, skills, time and risk", "The class could start repairs and add stationery later from profit", ["A reasoned recommendation", 2], ["A condition or time-frame", 1]], modelAnswer: "The uniform repair service costs only US\\$250 and uses skills the class already has, but demand is limited to about 150 pupils. The stationery shop has the strongest demand but costs more than the class can afford, and the poultry project is slow and needs a hired shed. The class should choose the uniform repair service because it fits their money and skills, and could add a small stationery stall from its profit later, provided that a survey confirms enough pupils will use the repair service.", hints: ["Compare the ideas against demand, cost, skills and time, then recommend with a condition."], explanation: "Ideas compared against the class's resources, with a conditional recommendation.", levels: [[1, 1, 3, "Describes the ideas with little comparison."], [2, 4, 6, "Compares the ideas using the case."], [3, 7, 8, "A justified recommendation with a condition."]] }),
    ],
    hints: ["Use the money, time and skills in the case."],
    explanation: "The constraints are explained and the choice of project is evaluated.",
  });

  b.card("DEFINITION", "Project", "A one-off, temporary undertaking with a clear objective, a start and end date, a budget and resources.");
  b.card("FACT", "Project cycle", "Identification, formulation (proposal and plan), implementation, evaluation.");
  b.card("DEFINITION", "Project proposal", "A written document presenting a project idea for approval or funding: objective, need, activities, resources, cost, benefits and risks.");
  b.card("DEFINITION", "Project plan", "A detailed statement of what will be done, by whom, when and at what cost, including the budget.");
  b.card("FACT", "Criteria for choosing a project", "Demand, start-up cost, skills, resources and timing, risk and fit with objectives.");
  b.card("CONCEPT", "Scoring matrix", "A table giving each project idea a score on weighted criteria; the weighted totals are compared. Scores and weights are judgements.");
  b.card("DEFINITION", "Contingency", "A reserve in the budget for unexpected costs, often a percentage of the planned cost.");
  b.card("CONCEPT", "Evaluating a project", "Compare results with the objective, time and budget; find causes of problems; record lessons for future projects.");
});
