// W1a: positive and normative statements (ZIMSEC only: tagged automatically by the concept).
import { concept, P } from "../lib.mjs";

const PN = ["positive", "normative"];
const LV4 = [
  [3, 4, 4, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 2, 3, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 1, "Simple points, little explanation."],
];

concept("econ.basics.positive-normative", { file: "basics/positive-normative", keyPrefix: "basics.positive-normative" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **positive** statement in economics?",
    options: [
      ["A statement that can be tested against evidence", "Correct: it can be shown to be true or false."],
      ["A statement that supports a government policy", "Supporting a policy is a value judgement, which is normative."],
      ["A statement that is known to be true", "A positive statement may be false; it only has to be testable."],
      ["A statement that describes good news", "Positive here means testable, not optimistic."],
    ],
    answer: "A",
    explanation: "A positive statement describes what is, was or will be and can be checked against evidence. It may turn out to be false.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A normative statement is one that",
    options: [
      ["contains a value judgement about what ought to be", "Correct: it rests on opinion, so evidence cannot settle it."],
      ["can be proved true or false with figures and other evidence", "That describes a positive statement."],
      ["predicts what will happen in the future", "Predictions can be checked later, so they are positive."],
      ["is made by a government or central bank", "Who makes a statement does not decide its type."],
    ],
    answer: "A",
    explanation: "Normative statements express opinions or value judgements (should, fair, too high) that cannot be tested by evidence alone.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which statement is **normative**?",
    options: [
      ["The government should cut the tax on bread", "Correct: should expresses a view about what ought to be done."],
      ["The price of bread rose last month", "This can be checked with price data: positive."],
      ["A tax on bread raises its price to consumers", "This is a cause-and-effect claim that can be tested: positive."],
      ["Bread sales in Gweru fell after the tax", "Sales figures can confirm or reject this: positive."],
    ],
    answer: "A",
    explanation: "Only the first statement contains a value judgement. The others make claims that evidence could check.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which statement is **positive**?",
    options: [
      ["Exports of tobacco were higher this year than last year", "Correct: export records can check it."],
      ["Farmers deserve higher prices for their tobacco", "Deserve is a value judgement: normative."],
      ["Tobacco farming is better for the country than mining", "Better is a judgement: normative."],
      ["The government ought to support small tobacco farmers", "Ought to is a value judgement: normative."],
    ],
    answer: "A",
    explanation: "A comparison of export figures can be tested against records, so it is positive.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement is **positive** even though it contains the word *should*?",
    options: [
      ["A survey found that most traders think rents should fall", "Correct: it reports what a survey found, which can be checked."],
      ["Market rents should fall to help small traders", "This is the speaker's own view: normative."],
      ["Councils should not charge traders any rent", "This is a value judgement about policy: normative."],
      ["Traders should be given more help than shoppers in the town", "This weighs groups by values: normative."],
    ],
    answer: "A",
    explanation: "Reporting what people believe is positive, because the survey result can be checked. The *should* belongs to the people surveyed, not to the speaker.",
    hints: ["Could anyone check whether the survey found this?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement is **normative** even though it does not contain *should* or *ought*?",
    options: [
      ["School fees in private schools are far too high", "Correct: too high is a judgement, not a testable fact."],
      ["School fees in private schools rose this year", "A rise can be checked: positive."],
      ["Higher fees will reduce the number of pupils enrolled", "A testable prediction: positive."],
      ["Private schools charge more than government schools", "Fees can be compared: positive."],
    ],
    answer: "A",
    explanation: "Words such as *too high*, *fair* or *better* express value judgements, so the statement is normative without *should*.",
    hints: ["Look for a word that expresses an opinion."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the statement \"Harare has more registered companies than Bulawayo\" positive?",
    options: [
      ["It can be checked against company registration records", "Correct: it is testable."],
      ["It is certainly true, so it must be a positive statement", "Truth is not the test: a positive statement can be false."],
      ["It describes something good about Harare", "Positive does not mean favourable."],
      ["It gives the speaker's view about business", "A view would make it normative."],
    ],
    answer: "A",
    explanation: "A statement is positive if evidence could prove it true or false. Registration records could settle this one.",
    hints: ["Apply the test: could evidence settle it?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two economists agree on all the evidence about the effects of a sugar tax but disagree about whether it should be introduced. What explains their disagreement?",
    options: [
      ["They make different value judgements about the effects", "Correct: with the same facts, disagreement must come from normative views."],
      ["One of them has made a mistake about the evidence", "The question says they agree on all the evidence."],
      ["Positive statements cannot be tested by evidence", "Positive statements can be tested; that is what makes them positive."],
      ["The effects of the tax cannot be predicted at all", "They agree on the effects, so the effects were predicted."],
    ],
    answer: "A",
    explanation: "When people agree on the positive facts, disagreement about policy comes from normative judgements, for example how much weight to give to health versus the cost to poor households.",
    hints: ["What is left to disagree about once the facts are agreed?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A positive statement must be true.",
    answer: false,
    explanation: "False. A positive statement only has to be testable. \"Mutare is the largest city in Zimbabwe\" is positive but false.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "\"Unemployment will fall next year if the new factory opens\" is a positive statement.",
    answer: true,
    explanation: "True. It is a prediction that can be checked against unemployment figures next year.",
  });
  b.tf({
    d: 2, skill: "APPLICATION",
    stem: "\"Vendors in the city centre are treated unfairly by the council\" is a positive statement.",
    answer: false,
    explanation: "False. *Unfairly* is a value judgement, so the statement is normative.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Classify each statement.",
    template: "\"Maize prices rose by a third in the dry season.\" {{blank:a}}\n\n\"Maize prices are too high for poor families.\" {{blank:b}}\n\n\"The government must keep maize prices low.\" {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["positive"], choices: PN },
      { id: "b", accepted: ["normative"], choices: PN },
      { id: "c", accepted: ["normative"], choices: PN },
    ],
    wrong: [["positive", "positive", "normative"]],
    explanation: "A price rise can be measured (positive). *Too high* and *must* express value judgements (normative).",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each statement to the reason for its classification.",
    pairs: [
      ["Fuel prices rose last week", "Positive: past event that can be checked"],
      ["Fuel prices will rise if the tax is raised", "Positive: prediction that can be tested"],
      ["Fuel taxes ought to be lower", "Normative: says what ought to be"],
      ["High fuel taxes are unfair to kombi operators", "Normative: contains a judgement of fairness"],
    ],
    explanation: "Past events and testable predictions are positive; statements about what ought to be or what is fair are normative.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why \"Spending on education is more important than spending on roads\" is a normative statement.",
    points: [
      "Identifies the value judgement: \"more important\" is an opinion.",
      "Explains that it cannot be proved true or false by evidence; people with different values will disagree.",
    ],
    explanation: "Comparing importance requires a value judgement, which evidence alone cannot settle.",
    modelAnswer: "\"More important\" is a value judgement. Evidence can show the effects of each kind of spending, but whether education matters more than roads depends on people's values, so it cannot be proved true or false.",
    hints: ["Which words express an opinion?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Write one positive statement and one normative statement about the price of mealie-meal. Explain why each is positive or normative.",
    points: [
      "Writes a correct positive statement (for example \"The price of mealie-meal rose in March\").",
      "Explains that it can be tested with evidence (price records).",
      "Writes a correct normative statement (for example \"The price of mealie-meal should be controlled\").",
      "Explains that it contains a value judgement that evidence cannot settle.",
    ],
    explanation: "Each statement earns one mark and each correct reason one more: testable for positive, value judgement for normative.",
    modelAnswer: "Positive: \"The price of a 10 kg bag of mealie-meal rose in March.\" This can be checked against shop prices. Normative: \"The government should control the price of mealie-meal.\" This is a value judgement about what ought to be done, so evidence alone cannot prove it.",
    hints: ["Start each with a clear sentence, then give the test."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: "Read the extract from a newspaper letter.\n\n> (1) Last year the council raised market stall fees in Masvingo. (2) Since then, several vendors have moved to selling on the pavements. (3) This is a disgrace. (4) The council should return fees to their old level, because vendors deserve support.",
    parts: [
      P.fib({
        label: "(a)", marks: 4,
        stem: "Classify each numbered sentence.",
        template: "Sentence 1: {{blank:a}}. Sentence 2: {{blank:b}}. Sentence 3: {{blank:c}}. Sentence 4: {{blank:d}}.",
        blanks: [
          { id: "a", accepted: ["positive"], choices: PN },
          { id: "b", accepted: ["positive"], choices: PN },
          { id: "c", accepted: ["normative"], choices: PN },
          { id: "d", accepted: ["normative"], choices: PN },
        ],
        wrong: [["positive", "normative", "normative", "normative"]],
        explanation: "Sentences 1 and 2 describe events that can be checked. Sentence 3 (\"a disgrace\") and sentence 4 (\"should\", \"deserve\") are value judgements.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain how the council could check whether sentence 2 is true.",
        points: [
          "Identifies a source of evidence (a count of pavement vendors, stall occupancy records, licences issued).",
          "Explains comparing before and after the fee rise.",
        ],
        modelAnswer: "The council could count the vendors selling on pavements and the number of stalls let in the market before and after the fee rise. If pavement vendors rose while stall rentals fell, sentence 2 is supported.",
      }),
    ],
    explanation: "Testable sentences are positive; opinions (a disgrace, should, deserve) are normative. Evidence can check positive statements only.",
    hints: ["For each sentence ask whether evidence could prove it true or false."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "A government is debating whether to remove the tax on imported medicines. One minister says: \"Removing the tax will lower medicine prices by about a tenth.\" Another says: \"Losing the revenue is worse than higher medicine prices.\"",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which describes the two ministers' statements?",
        options: [
          ["The first is positive and the second is normative", "Correct: the first is a testable prediction; the second weighs outcomes by values."],
          ["The first is normative and the second is positive", "The first can be tested; the second contains the judgement \"worse\"."],
          ["Both statements are positive", "\"Worse\" is a value judgement."],
          ["Both statements are normative", "The first is a prediction that can be checked."],
        ],
        answer: "A",
        explanation: "A prediction about prices is positive; a judgement that one outcome is worse is normative.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how evidence could help settle the first minister's claim, but not the second minister's.",
        points: [
          "Prices of medicines could be compared before and after the tax is removed (or in similar countries).",
          "So the first claim is testable.",
          "The second depends on how much weight is given to revenue versus health: evidence cannot decide that.",
        ],
        modelAnswer: "After the tax is removed, medicine prices can be measured and compared with prices before, so the first claim can be checked. The second minister's claim depends on whether revenue for other services matters more than cheaper medicines, a value judgement that evidence cannot settle.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Discuss whether economists can tell the government what to decide.",
        points: [
          "Economists can predict and measure effects (positive analysis), such as price changes and revenue lost.",
          "This helps the government see the trade-offs and opportunity cost.",
          "But the final choice involves value judgements about whose interests matter more, which economists cannot settle with evidence.",
          "Justified conclusion: economists inform the decision; elected leaders make the normative choice.",
        ],
        levels: LV4,
        modelAnswer: "Economists can estimate how much medicine prices would fall and how much revenue would be lost, which shows the government the trade-off. However, deciding whether cheaper medicine is worth the lost revenue depends on values, such as how much weight to give to the health of poor households. Economists can inform the decision, but the choice itself is normative and belongs to the government and voters.",
      }),
    ],
    explanation: "Positive analysis measures effects; normative judgement decides which effects matter more. Economists provide the first, decision-makers the second.",
    hints: ["Which statement could be checked after the policy?", "Facts versus values."],
  });

  b.card("DEFINITION", "What is a **positive statement**?", "A statement about what is, was or will be that can be tested with evidence (it may be false).");
  b.card("DEFINITION", "What is a **normative statement**?", "A statement of opinion about what ought to be; it contains a value judgement.");
  b.card("DEFINITION", "What is a **value judgement**?", "A view of whether something is good or bad, fair or unfair, based on a person's values.");
  b.card("CONCEPT", "What is the quick test for a positive statement?", "Ask: could evidence prove it true or false? If yes, it is positive.");
  b.card("CONCEPT", "Is a false statement always normative?", "No. A false statement can still be positive if it can be checked.");
  b.card("CONCEPT", "Is a prediction positive or normative?", "Positive: it can be checked when the time comes.");
  b.card("FACT", "Name four words that often signal a normative statement.", "Should, ought, fair/unfair, too high/too low (also better, worse, deserve).");
  b.card("CONCEPT", "Why can economists agree on facts but disagree on policy?", "Policy choices depend on normative value judgements, not just positive evidence.");
});
