// W2b: essay writing and evaluation (skills; both boards, Forms 5-6 and AS/A Level).
import { concept, P, chk } from "../lib.mjs";
import { mc, LV8, LV12 } from "../tables/w2b-kit.mjs";

concept("aecon.skills.essay-evaluation", { file: "skills/essay-evaluation", keyPrefix: "skills.essay-evaluation" }, (b) => {
  mc(b, [1, "RECALL"], "Which command word asks you to make a judgement and justify it?",
    ["Evaluate", "Correct: evaluation means weighing and judging."],
    [["Define", "Define asks only for a precise meaning."],
     ["State", "State asks for a short fact or name."],
     ["Identify", "Identify asks you to pick out or name something."]],
    "Evaluate requires a justified judgement.");

  mc(b, [2, "UNDERSTANDING"], "A question asks you to 'analyse' the effect of a higher interest rate on consumption. The best answer",
    ["develops a chain of cause and effect from the interest rate to consumption", "Correct: analysis is a developed chain of reasoning."],
    [["gives a one-line definition of the interest rate and nothing more", "That is only knowledge."],
     ["lists several possible effects without explaining how any of them actually occur", "A list is not analysis."],
     ["gives a conclusion without any reasoning", "Analysis requires the reasoning."]],
    "Analyse = develop a chain of cause and effect.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an example of evaluation?",
    ["The effect of the tax will be small in the short run because demand is inelastic", "Correct: it weighs the size and time period of the effect."],
    [["A tax is a compulsory payment made to the government", "That is a definition."],
     ["A higher tax raises the price of the good and so reduces the quantity bought each month", "That is a simple point of analysis."],
     ["The government collects taxes every year to pay for public services and goods", "That is a statement of fact."]],
    "Evaluation weighs the size, likelihood or time period of an effect.");

  mc(b, [2, "UNDERSTANDING"], "Which is the best conclusion to an essay that asks 'Discuss whether a minimum wage helps low-paid workers'?",
    ["A judgement that says when it helps or harms and gives a reason", "Correct: a justified judgement that answers the question."],
    [["A repeat of the introduction in slightly different words", "A conclusion should add a judgement."],
     ["A new point of analysis that was not made earlier in the essay body", "New analysis does not belong in the conclusion."],
     ["A statement that it is a difficult issue", "That does not answer the question."]],
    "A conclusion gives a supported judgement.");

  mc(b, [3, "ANALYSIS"], "A student writes: 'A higher tax on cigarettes will reduce smoking because demand is inelastic.' What is wrong with the reasoning?",
    ["If demand is inelastic, the fall in smoking will be small", "Correct: inelastic demand means a small fall in quantity."],
    [["Nothing: inelastic demand means a large fall in smoking", "Inelastic demand means a small fall."],
     ["Taxes cannot change the price of a good", "Taxes raise price."],
     ["Cigarettes are not affected by changes in price", "That overstates the point."]],
    "Inelastic demand means the quantity falls by a smaller percentage than the price rises.", { hints: ["What does inelastic mean for the size of the change in quantity?"] });

  mc(b, [3, "ANALYSIS"], "Which of the following would be the strongest evaluative comment on a policy to raise exports by cutting the exchange rate?",
    ["The effect depends on how elastic the demand for exports is and on how quickly it responds", "Correct: it uses elasticity and the time period to weigh the effect."],
    [["Exports are goods and services sold to other countries", "That is a definition."],
     ["The exchange rate is the price of one currency in terms of another currency on the market each day", "That is a definition."],
     ["Many countries have an exchange rate", "That is a statement of fact."]],
    "Elasticity and time period are standard evaluation points.", { hints: ["Which answer weighs the size or timing of the effect?"] });

  mc(b, [3, "ANALYSIS"], "At Level 1 in a levels-based mark scheme an essay typically",
    ["has simple, undeveloped points with little application", "Correct: Level 1 is the lowest level."],
    [["has developed two-sided analysis with a justified judgement", "That describes the top level."],
     ["has some analysis and some evaluation", "That is more like Level 2."],
     ["has no content at all", "Level 1 has some correct points."]],
    "Level 1 answers contain simple points with little development.", { hints: ["Which description sounds like the lowest level?"] });

  mc(b, [4, "EVALUATION"], "Two students answer 'Evaluate the effects of a tariff'. Student A describes the tariff model accurately but never reaches a judgement. Student B explains fewer points but weighs them and reaches a justified conclusion. Which is likely to receive the higher mark?",
    ["Student B, because evaluation and a judgement are rewarded", "Correct: levels reward development and judgement as well as knowledge."],
    [["Student A, because accuracy of the description is all that matters here", "Evaluation is required by the command word."],
     ["Both, because they used the same model", "Marks depend on the quality of analysis and evaluation."],
     ["Neither, because tariffs are not examinable", "Tariffs are examinable."]],
    "An evaluate question rewards a justified judgement; a description alone stays in a low level.", { hints: ["What does the command word reward?"] });

  {
    const zim = { minutes: 180, marks: 100 }, cam = { minutes: 120, marks: 60 };
    const zPer = zim.minutes / zim.marks; chk(zPer, 1.8, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: zPer, dp: 1, hints: ["Minutes divided by marks."],
      stem: "A paper lasts 180 minutes and carries 100 marks. How many minutes are there for each mark? Give your answer to one decimal place.",
      wrong: [0.6, 2, 1.5],
      explanation: "180 ÷ 100 = 1.8 minutes a mark." });
    chk(25 * zPer, 45, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: 25 * zPer, hints: ["First find the minutes per mark."],
      stem: "On the same paper (180 minutes for 100 marks), how many minutes should a student spend on an essay worth 25 marks? Give your answer in minutes.",
      wrong: [25, 36, 60],
      explanation: "Minutes per mark = 180 ÷ 100 = 1.8. For 25 marks: 25 × 1.8 = 45 minutes (including a few minutes of planning)." });
    chk(12 * (cam.minutes / cam.marks), 24, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: 12 * (cam.minutes / cam.marks), hints: ["120 minutes for 60 marks."],
      stem: "A paper lasts 120 minutes and carries 60 marks. How many minutes should a student spend on a part worth 12 marks? Give your answer in minutes.",
      wrong: [12, 20, 30],
      explanation: "Minutes per mark = 120 ÷ 60 = 2. For 12 marks: 12 × 2 = 24 minutes." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "An essay that only describes an economic model and gives no judgement can reach the top level in an evaluate question.", answer: false,
    explanation: "False. The top level requires developed analysis, evaluation and a justified judgement." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Considering whether an effect is short run or long run is a way of evaluating an argument.", answer: true,
    explanation: "True. The time period is a standard evaluation point." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each command word with what it asks you to do.",
    pairs: [["Define", "Give the precise meaning"], ["Explain", "Give a reason linked to a mechanism"], ["Analyse", "Develop a chain of cause and effect"], ["Evaluate", "Make and justify a judgement"]],
    explanation: "The command word shows the skill being tested." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A developed chain of reasoning links each step with the word {{blank:a}}. An evaluation answer should end with a {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["because"], choices: ["because", "and", "also"] }, { id: "b", accepted: ["conclusion"], choices: ["conclusion", "definition", "diagram"] }],
    explanation: "Chains use 'because'; evaluation ends with a justified conclusion." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of marking in which an extended answer is placed in a level and then given a mark within that level.",
    accepted: ["levels-based marking", "levels marking", "level of response", "levels of response", "levels-based"], wrong: ["point marking"],
    explanation: "Levels-based marking rewards the quality of the whole answer." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, stem: "State three ways of evaluating an economic argument.",
    points: ["Consider the short run and the long run.", "Consider the size of the effect or the elasticity.", "Consider the assumptions, the context or who gains and loses."],
    modelAnswer: "(1) Whether the effect is short run or long run. (2) How large the effect is, for example because of the elasticity of demand. (3) The assumptions made, the context, or who gains and who loses.",
    explanation: "Any three valid evaluation approaches." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Mention command words and marks."],
    stem: "Explain why it is important to read the command word before answering an examination question.",
    points: ["The command word shows the skill being tested (for example define, explain, analyse or evaluate).", "It shows how much detail is needed (for example a definition or a developed chain).", "It shows whether a judgement is needed.", "Answering with the wrong skill loses marks and wastes time."],
    modelAnswer: "The command word shows the skill being tested, such as explain, analyse or evaluate, and how much detail is needed. An evaluate question needs a judgement, while a define question does not. Answering with the wrong skill wastes time and loses marks.",
    explanation: "Skill, detail, judgement and wasted time." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Build links with 'because'."],
    stem: "Analyse how a rise in the rate of interest may reduce spending by firms and households.",
    points: ["A higher interest rate raises the cost of borrowing.", "Firms find fewer investment projects profitable, so investment falls.", "Households reduce borrowing for large purchases.", "Saving becomes more attractive, so consumption falls.", "Aggregate demand falls."],
    modelAnswer: "A higher interest rate raises the cost of borrowing, so fewer investment projects are profitable and firms invest less. Households borrow less for large purchases and saving becomes more attractive, so consumption falls. Both reduce aggregate demand.",
    explanation: "A developed chain from the interest rate to aggregate demand." });

  {
    b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Look for missing steps and for any evaluation.", "Rewrite using 'because'."],
      stem: "**A student's paragraph**\n\nQuestion: 'Assess the effects of a tax on cigarettes.'\n\nThe student writes: 'A tax on cigarettes will make the price higher. People will smoke less. The government will get more money. This is good.'",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Identify **two** weaknesses in the paragraph.",
          points: ["The points are not developed: there is no explanation of why people will smoke less (no mechanism, no elasticity).", "There is no evaluation or balanced judgement: the final sentence is an unsupported assertion."],
          modelAnswer: "The points are listed but not explained, so there is no chain of reasoning (why does demand fall, and by how much?). And there is no evaluation: 'This is good' is an unsupported opinion with no weighing of costs and benefits." }),
        P.manual({ label: "(b)", marks: 3, stem: "Rewrite the first two sentences as a developed chain of reasoning.",
          points: ["The tax raises the cost of supply, so the price rises.", "The quantity demanded falls (a movement along the demand curve).", "The size of the fall depends on the price elasticity of demand."],
          modelAnswer: "The tax raises the cost of supplying cigarettes, so the price rises. Because the law of demand applies, the quantity demanded falls along the demand curve. The size of the fall depends on the price elasticity of demand: because cigarettes are addictive, demand is inelastic and the fall is small." }),
        P.manual({ label: "(c)", marks: 3, stem: "Add an evaluation point and a conclusion.",
          points: ["An evaluation point, for example inelastic demand means a small fall in smoking but more revenue; or the tax is regressive.", "Reasoned weighing of the benefits and costs.", "A justified conclusion."],
          modelAnswer: "Because demand is inelastic, the fall in smoking will be small in the short run, so the main effect may be to raise revenue; the tax is also regressive, since poorer smokers pay a larger share of their income. Overall the tax raises revenue reliably but is a weak way of cutting smoking unless it is combined with other measures." }),
      ],
      explanation: "The paragraph lists points without developing them or evaluating; a better answer builds a chain and ends with a justified judgement." });
  }
  {
    const minPer = 120 / 60;
    chk(minPer, 2, 1e-9); chk(8 * minPer, 16, 1e-9);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Marks and minutes give the time per mark.", "A plan lists points, evaluation and a conclusion."],
      stem: "**Planning an essay**\n\nA Cambridge-style paper lasts 120 minutes and carries 60 marks. An essay question has two parts: (a) worth 8 marks and (b) worth 12 marks. Question: '(a) Explain how a rise in the exchange rate affects the price of a country's exports. (b) Assess whether a country should try to keep its exchange rate low.'",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: minPer, dp: 0, stem: "How many minutes are available for each mark on this paper?", wrong: [1, 3, 0.5], explanation: "120 ÷ 60 = 2 minutes a mark." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 8 * minPer, stem: "How many minutes should be spent on part (a) of the essay?", wrong: [8, 12, 24], explanation: "8 × 2 = 16 minutes." }),
        P.manual({ label: "(c)", marks: 4, stem: "Write a plan for part (b): give two points of analysis, one point of evaluation and the conclusion you would reach.",
          points: ["Analysis 1: a low exchange rate makes exports cheaper abroad and may raise export demand.", "Analysis 2: it raises the price of imports, which may cause inflation and raise costs for firms.", "Evaluation: the effect depends on the elasticity of demand for exports and imports and on the time period (short run or long run).", "Conclusion: a justified judgement (for example, a moderate approach is likely to help only if demand is elastic)."],
          modelAnswer: "Analysis 1: a lower exchange rate makes exports cheaper for foreign buyers, which may raise the quantity of exports. Analysis 2: it raises the price of imports and so may cause cost-push inflation. Evaluation: the gain depends on the elasticity of demand for exports and on how quickly firms can raise output. Conclusion: keeping the rate low can help exporters in the short run, but it is unlikely to be the best strategy for long-term growth if it raises import costs." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain how you would show the examiner that your answer to part (b) is evaluative and not only descriptive.",
          points: ["Give both sides of the argument.", "Weigh them using time period, size or elasticity.", "Support the weighing with a reason or evidence from the context.", "Reach a conclusion that answers the question."],
          modelAnswer: "I would give both the benefits and the costs of a low exchange rate, and weigh them using the time period and the elasticity of demand. I would support each judgement with a reason, and finish with a conclusion that answers whether the country should try to keep the rate low." }),
      ],
      explanation: "Two minutes a mark: 16 minutes for part (a); a plan with two points of analysis, evaluation and a conclusion." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Say what each level requires.", "Give a judgement."],
    stem: "Assess why evaluation is important in an economics essay, and how a student can show it.",
    points: ["Economic effects often depend on conditions, so a one-sided answer is incomplete.", "Evaluation shows judgement, which the higher levels reward.", "Ways to evaluate: time period (short run and long run).", "Ways to evaluate: size of effects and elasticity.", "Ways to evaluate: assumptions and context.", "Ways to evaluate: who gains and loses and the priorities of the decision-maker.", "Evaluation must be supported by reasons, not by 'it depends' alone.", "A justified conclusion that answers the question."],
    levels: LV8,
    modelAnswer: "Evaluation is important because the effects of economic policies depend on conditions, and a one-sided answer is therefore incomplete. Higher levels of the mark scheme reward judgement, not only knowledge. A student can show evaluation by considering the short run and the long run, the size of the effect and the elasticities involved, the assumptions of the model and the context, and who gains and who loses. These points must be supported by reasons, since saying only that it depends adds nothing. Overall, evaluation is essential for the top marks, and the best answers end with a conclusion that is justified by the earlier weighing.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Link evaluation to the way marks are awarded and give supported ways to show it." });

  b.card("DEFINITION", "What does the command word **analyse** ask for?", "A developed chain of cause and effect, with each link explained.");
  b.card("DEFINITION", "What does the command word **evaluate** ask for?", "A judgement about importance, size or likelihood, justified by weighing arguments.");
  b.card("CONCEPT", "List **five** ways to evaluate an economic argument.", "Short run v long run; size and elasticity; assumptions; context and evidence; who gains and loses; priorities and value judgements.");
  b.card("CONCEPT", "What is a chain of reasoning?", "A sequence of linked steps showing how one change leads to another, each step justified with 'because'.");
  b.card("CONCEPT", "What should a conclusion do?", "Give a direct judgement that answers the question and says why, without repeating the introduction.");
  b.card("FORMULA", "How can you work out the time to spend on a question?", "Minutes available ÷ total marks = minutes per mark; multiply by the marks for the question.");
  b.card("FACT", "How long is each essay on ZIMSEC Paper 3?", "180 minutes for 100 marks gives 1.8 minutes a mark, about 45 minutes for each 25-mark essay.", "Check against the current paper", { applies: ["zimsec"] });
  b.card("CONCEPT", "What does Level 3 of a levels-based scheme usually need?", "Developed, two-sided analysis applied to the question, with a justified judgement.");
  b.card("CONCEPT", "Why is 'it depends' not enough?", "Evaluation must say what it depends on and how, with reasons.");
});
