// W2b: env.eia-projects (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: woodlot budget 180+70+60+40 = 350, contingency 35, total 385, per seedling 0.64; survival 456/600 = 76%, shortfall 24;
// impact matrix net -43; waste project 300+170+120+60 = 650, total with 10% = 715.
import { concept, P, geographyLevels, chk, rnd, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const wood = [["Tree seedlings", 600, 0.3], ["Hoes and shovels (tools)", 10, 7], ["Fencing wire and poles", 1, 60], ["Training workshop", 1, 40]];
const woodCosts = wood.map(([, q, u]) => q * u);
const sub = chk(sum(woodCosts), 350);
const cont = chk(sub * 0.1, 35);
const totalW = chk(sub + cont, 385);
const perSeedling = rnd(totalW / 600, 2, 0.64, "perSeedling");
const WTAB = tbl(["Item", "Quantity", "Unit cost (US\\$)", "Cost (US\\$)"], wood.map(([n, q, u], i) => [n, q, u.toFixed(2), woodCosts[i]]));
const alive = chk(456 / 600 * 100, 76);
const shortfall = chk(0.8 * 600 - 456, 24);

const IMP = [["Water pollution", 5, 5, -1], ["Loss of habitat", 4, 4, -1], ["Dust", 4, 3, -1], ["Noise", 3, 2, -1], ["Employment", 4, 4, 1]];
const scores = IMP.map(([, m, i, s]) => m * i * s);
const net = chk(sum(scores), -43);
const harm = chk(-sum(scores.filter((x) => x < 0)), 59);
const MTAB = tbl(["Impact", "Magnitude (1-5)", "Importance (1-5)", "Type"], IMP.map(([n, m, i, s]) => [n, m, i, s < 0 ? "Harmful" : "Beneficial"]));

const waste = [["Waste bins", 20, 15], ["Wheelbarrows", 2, 85], ["Gloves and boots (sets)", 10, 12], ["Awareness workshop", 1, 60]];
const wCosts = waste.map(([, q, u]) => q * u);
const wSub = chk(sum(wCosts), 650);
const wTotal = chk(wSub * 1.1, 715, 1e-6);
const WASTE = tbl(["Item", "Quantity", "Unit cost (US\\$)"], waste.map(([n, q, u]) => [n, q, u]));

concept("ageo.env.eia-projects", { file: "env/eia-projects", keyPrefix: "env.eia-projects" }, (b) => {
  mc(b, 1, "RECALL", "What is the purpose of an **Environmental Impact Assessment**?", [
    ["To predict and evaluate the effects of a proposed development before it is approved", "Correct: it informs the decision and the mitigation."],
    ["To repair damage after a development has been finished", "That is restoration, not assessment."],
    ["To measure the profit that a development will make", "That is a financial appraisal, not an EIA."],
    ["To count the people who live near a development", "A census does this; an EIA is broader."],
  ], "An **EIA** predicts and evaluates likely effects before approval.");
  mc(b, 2, "UNDERSTANDING", "Which describes **scoping** in an EIA?", [
    ["Deciding which impacts to study and who is affected", "Correct: it sets terms of reference with community input."],
    ["Writing the final environmental report", "That is the EIA document stage."],
    ["Checking that measures work during operation", "That is monitoring."],
    ["Deciding on the price of the project", "Cost is not the purpose of scoping."],
  ], "**Scoping** focuses the EIA on the important impacts.");
  mc(b, 2, "UNDERSTANDING", "Why is public participation important in an EIA?", [
    ["Local people supply knowledge and are affected by the project", "Correct: it improves decisions and reduces conflict."],
    ["It removes the need for the assessment team to collect data", "Data collection is still necessary."],
    ["It guarantees that every project is approved", "Projects may still be refused or changed."],
    ["It replaces the role of the environmental authority", "The authority still decides."],
  ], "**Public participation** brings local knowledge and legitimacy.");
  mc(b, 2, "UNDERSTANDING", "Which is an example of **mitigation**?", [
    ["Moving a mine's waste dump away from a river", "Correct: it avoids the harm."],
    ["Stating the project's expected profits", "This is not an action to reduce harm."],
    ["Recording the number of people at a meeting", "This is a record, not mitigation."],
    ["Naming the contractor who will build the project", "This does not reduce impact."],
  ], "**Mitigation** avoids, reduces or compensates for harm.");
  mc(b, 3, "APPLICATION", "A school project aims to plant 500 trees. Which objective is the best, because it can be measured?", [
    ["Plant 500 trees by March and have 400 alive after one year", "Correct: it has a number, a date and a target."],
    ["Improve the school environment", "This cannot be measured."],
    ["Make the school greener in the future", "This has no number or date."],
    ["Try to plant as many trees as possible", "This has no target."],
  ], "A good objective is **measurable** and has a **deadline**.", { hints: ["Look for numbers and dates."] });
  mc(b, 3, "ANALYSIS", "A report finds that an EIA was approved with 15 conditions, but there is no one to check them. What is the main weakness?", [
    ["There is no effective monitoring or enforcement", "Correct: measures are only useful if they are checked."],
    ["The EIA was carried out too early in the project", "Early assessment is good practice."],
    ["Too many local people were consulted", "Broad consultation is a strength."],
    ["The EIA report was too detailed", "Detail is not the problem here."],
  ], "An EIA needs **monitoring and enforcement** to be effective.", { hints: ["Think about the last stage of an EIA."] });
  b.tf({ d: 1, skill: "RECALL", stem: "In Zimbabwe, the Environmental Management Agency (EMA) was set up under the Environmental Management Act.", answer: true,
    feedbackTrue: "Correct: the Act is Chapter 20:27.",
    feedbackFalse: "Not so: EMA operates under the Environmental Management Act.",
    explanation: "EMA operates under the **Environmental Management Act** (Chapter 20:27)." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A good environmental project report includes monitoring and evaluation against the original objectives.", answer: true,
    feedbackTrue: "Correct: results must be compared with the objectives.",
    feedbackFalse: "Not so: monitoring and evaluation are essential.",
    explanation: "Monitoring shows whether the objectives were met." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "An EIA begins with {{blank:a}}, then scoping. Action to reduce a harmful impact is {{blank:b}}. A small amount of money added to a budget for unexpected costs is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["screening"], choices: ["screening", "auditing", "reporting"] },
      { id: "b", accepted: ["mitigation"], choices: ["mitigation", "assessment", "baseline"] },
      { id: "c", accepted: ["contingency"], choices: ["contingency", "subsidy", "dividend"] },
    ], explanation: "Screening, mitigation and contingency." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each EIA stage to what it does.",
    pairs: [
      ["Screening", "Decides whether a full EIA is needed"],
      ["Scoping", "Chooses the impacts to study and who is affected"],
      ["Mitigation", "Proposes ways to avoid, reduce or compensate for harm"],
      ["Monitoring plan", "Sets out how measures will be checked over time"],
    ], explanation: "Each stage has a clear role." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$",
    stem: `A school group plans a woodlot (illustrative prices):\n\n${WTAB}\n\nCalculate the sub-total, in US\\$, before the contingency is added.`,
    hints: ["Quantity × unit cost gives each cost; then add the four costs."],
    value: sub, wrong: [600, 385],
    explanation: "180 + 70 + 60 + 40 = **US\\$350**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "A project sub-total is US\\$350. A contingency of 10% is added to cover unexpected costs. Calculate the total budget, in US\\$.",
    hints: ["Find 10% of 350, then add it."],
    value: totalW, wrong: [35, 315],
    explanation: "10% of 350 = 35. Total = 350 + 35 = **US\\$385**. The value 35 is only the contingency." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 0,
    stem: "After one year 456 of the 600 seedlings planted in a woodlot are alive. Calculate the survival rate, as a percentage.",
    hints: ["Divide the survivors by the number planted."],
    value: alive, wrong: [24, 132],
    explanation: "456 ÷ 600 × 100 = **76%**. Dividing 600 by 456 gives 131.6, the inverse." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true,
    stem: `An impact matrix multiplies magnitude by importance for each impact. Harmful impacts are negative and beneficial impacts are positive. The scores are: water pollution 5 × 5, habitat loss 4 × 4, dust 4 × 3 and noise 3 × 2 (all harmful), and employment 4 × 4 (beneficial). Calculate the net score for the project.`,
    hints: ["Multiply each pair, then add the harmful scores as negatives.", "Add the beneficial score at the end."],
    value: net, wrong: [59, -59],
    explanation: "1. Harmful scores: −25, −16, −12 and −6, which total −59.\n2. Beneficial: +16.\n3. Net = −59 + 16 = **−43**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the first stage of an Environmental Impact Assessment.",
    accepted: ["screening", "screening stage", "the screening stage"], wrong: ["monitoring"],
    explanation: "**Screening**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What is the term for action taken to avoid, reduce or compensate for a harmful impact?",
    accepted: ["mitigation", "mitigating", "mitigation measures"], wrong: ["adaptation"],
    explanation: "**Mitigation**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Outline the purpose of the monitoring plan in an EIA.",
    hints: ["Think about checking and responding."],
    points: [
      "It sets out how the effects of the project will be measured during construction and operation.",
      "It checks whether the mitigation measures are working and whether standards are being met.",
      "It states who is responsible and what action is taken if problems arise.",
    ],
    modelAnswer: "The monitoring plan sets out how effects will be measured during construction and operation, checks whether mitigation measures work and standards are met, and states who is responsible and what to do if problems arise.",
    explanation: "Measure, check and respond." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a community environmental project may fail even when its objectives are sound.",
    hints: ["Think about people, money, time and the natural environment."],
    points: [
      "Lack of community ownership or continued interest, so that work stops after the start.",
      "Insufficient funds for materials, tools and maintenance.",
      "Natural hazards such as drought, pests or animals that destroy planted trees.",
      "No monitoring or clear responsibility, so problems are not corrected.",
    ],
    modelAnswer: "A project may fail if the community does not feel ownership and interest fades, if there is not enough money for materials and upkeep, if drought, pests or animals destroy the plantings, or if no one is responsible for monitoring so problems are not corrected.",
    explanation: "People, money, nature and management." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `An EIA team scored five impacts on magnitude and importance (each out of 5):\n\n${MTAB}\n\nThe scores multiplied give: water pollution −25, loss of habitat −16, dust −12, noise −6 and employment +16. Explain which impact should be given the highest priority for mitigation and why.`,
    hints: ["Choose the largest negative score, then say what it affects."],
    points: [
      "Water pollution has the highest harmful score (−25), so it should be the first priority.",
      "It has maximum magnitude and importance (5 and 5), so the effects are large and affect many people.",
      "Polluted water harms drinking supplies, health, fish and downstream users.",
      "Mitigation such as settling ponds, lined dumps and monitoring should be put in place before building starts.",
    ],
    modelAnswer: "Water pollution should be the first priority because it has the largest harmful score (−25) with maximum magnitude and importance. Polluted water harms drinking supplies, health and fish for downstream users. Settling ponds, lined dumps and monitoring should be in place before building starts.",
    explanation: "Prioritise the largest negative score and justify with the effects." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A village development committee plans a waste-management project with 20 bins, 2 wheelbarrows, 10 sets of gloves and boots, and one awareness workshop (illustrative prices, invented for this exercise).\n\n${WASTE}`,
    hints: ["Cost of each item = quantity × unit cost.", "Add 10% of the sub-total for the contingency."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the sub-total of the four items, in US\\$.", value: wSub, unit: "US$", wrong: [225, 715],
        explanation: "20 × 15 = 300; 2 × 85 = 170; 10 × 12 = 120; workshop 60. Total = 650." }),
      P.num({ label: "(b)", marks: 2, stem: "A contingency of 10% of the sub-total is added. Calculate the total budget, in US\\$.", value: wTotal, unit: "US$", wrong: [65, 585],
        explanation: "10% of 650 = 65, so total = 650 + 65 = 715." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which is the best measurable objective for this project?", options: [
        ["Remove all dumped waste from the market area within four months and keep it clear", "Correct: it has a target, a place and a time limit."],
        ["Clean up the village", "This cannot be measured."],
        ["Educate people about waste", "This has no target or date."],
        ["Make the village a better place", "This is too vague to evaluate."],
      ], answer: "A", explanation: "Good objectives are specific, measurable and have a deadline." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest three indicators the committee could use to monitor and evaluate the project.",
        points: [
          "The mass or volume of waste collected each week, compared with the target.",
          "The number of households using the bins, checked by a survey.",
          "A before-and-after count of dumped waste items or photographs of the cleared area.",
        ],
        modelAnswer: "The mass of waste collected each week against the target, the number of households using the bins from a survey, and a before-and-after count of dumped waste in the market area.",
        explanation: "Indicators must be measurable and linked to objectives." }),
    ], explanation: "Budget a community project and set measurable objectives." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: "A company proposes to build a quarry near a village school and a stream (illustrative scenario). The Environmental Management Agency requires an Environmental Impact Assessment.",
    hints: ["Think about who is affected and what they know."],
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the stage that decides which impacts to study and who is affected.", accepted: ["scoping", "scoping stage"], explanation: "Scoping." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why public participation is important in this EIA.",
        points: [
          "Villagers know the area, such as where the stream floods or where the school children walk, so they give local knowledge.",
          "They are directly affected by dust, noise and water pollution, so their concerns must be considered.",
          "Involving them early reduces conflict and increases acceptance of the decision.",
        ],
        modelAnswer: "Villagers know the area and can say where the stream floods or where children walk. They are the people affected by dust, noise and water pollution, and involving them early reduces conflict and builds acceptance.",
        explanation: "Local knowledge, fairness and acceptance." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two mitigation measures for dust and noise from the quarry.",
        points: [
          "Spray water on roads and stockpiles, cover trucks and plant tree belts to reduce dust.",
          "Limit blasting and work to daytime hours away from school hours, and use noise barriers.",
        ],
        modelAnswer: "Spray water on roads and stockpiles, cover trucks and plant a tree belt to cut dust, and limit blasting to set daytime hours away from lessons, with noise barriers.",
        explanation: "Dust suppression and noise limits." }),
    ], explanation: "Apply EIA ideas to a proposed quarry." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the value of Environmental Impact Assessment in reducing the environmental effects of large development projects in Zimbabwe.",
    hints: ["Give strengths and weaknesses, and use an example type such as a mine or dam.", "Reach a judgement."],
    points: [
      "An EIA predicts problems before construction, when changes are cheapest, so harm can be avoided.",
      "It requires mitigation measures and a monitoring plan to be written into the approval.",
      "Public participation brings local knowledge and gives affected people a voice.",
      "The Environmental Management Act gives legal force, with penalties for failing to comply.",
      "Weaknesses: EIAs can be costly and slow, and may be carried out by consultants paid by the developer.",
      "Consultation may be poor, with limited notice or language barriers, so some voices are not heard.",
      "Monitoring and enforcement may be weak because the agency lacks staff and funding.",
      "Judgement: EIA is valuable, but its effect depends on honest assessment, genuine consultation and enforcement of conditions.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "An EIA predicts problems before construction, when changes are cheapest, and requires mitigation measures and a monitoring plan to be built into the approval. Public participation gives affected people a voice and brings local knowledge, and the Environmental Management Act gives legal force with penalties for non-compliance. However, EIAs can be costly and slow, and consultants may be paid by the developer. Consultation may be poor and the agency may lack staff and funds to monitor and enforce conditions. I conclude that EIA is valuable, but its effect depends on honest assessment, genuine consultation and enforcement of the conditions.",
    wordLimit: { max: 300 }, explanation: "Weigh strengths and weaknesses of EIA and judge." });

  b.card("DEFINITION", "Environmental Impact Assessment", "A process that predicts and evaluates the likely effects of a proposed development before approval, so harm can be avoided, reduced or compensated.");
  b.card("CONCEPT", "Stages of an EIA", "Screening, scoping, impact identification and assessment, mitigation, management and monitoring plan, EIA document, review and decision.");
  b.card("DEFINITION", "Mitigation", "Action to avoid, reduce or compensate for a harmful impact.");
  b.card("FACT", "Environmental Management Act", "Chapter 20:27; set up EMA, requires EIAs for listed projects and sets rules on waste, effluent and ecosystems.");
  b.card("CONCEPT", "Public participation", "Affected people give views and local knowledge; it improves decisions and reduces conflict.");
  b.card("CONCEPT", "Steps in planning a community project", "Problem, justification, objectives, work plan, budget, monitoring and evaluation, report.");
  b.card("FORMULA", "Budget calculation", "Cost = quantity × unit cost; total = sub-total + contingency (for example 10% of the sub-total).");
  b.card("CONCEPT", "SMART objective", "An objective that is specific, measurable and has a deadline, for example 'plant 600 trees and have 80% alive after one year'.");
  b.card("CONCEPT", "Impact matrix", "Scores each impact for magnitude and importance; the product gives a priority ranking (harmful negative, beneficial positive).");
});
