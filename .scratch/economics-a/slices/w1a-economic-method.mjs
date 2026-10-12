// W1a: economics as a social science (Cambridge AS): models, positive/normative, ceteris paribus, time periods.
import { concept, P, chk, fmt, pctChange, signedPct } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.tools.economic-method", { file: "tools/economic-method", keyPrefix: "tools.economic-method" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 2, skill: "RECALL", daily: true, stem: "Which of the following is a **positive** statement?",
    explanation: "A positive statement can be tested against evidence. The others contain value judgements (should, unfair, best)." },
    ["Unemployment in Country X rose last year", "Correct: this can be checked against statistics."],
    [["The government should reduce unemployment", "'Should' is a value judgement: normative."],
     ["Unemployment is the worst problem the economy faces", "'Worst' is a matter of opinion: normative."],
     ["It is unfair that so many young people are unemployed", "'Unfair' is a value judgement: normative."]]);

  mc({ d: 1, skill: "RECALL", stem: "What does *ceteris paribus* mean?",
    explanation: "Ceteris paribus means other things being equal: all other influences are held constant to isolate one relationship." },
    ["All other influences are assumed to stay the same", "Correct: it isolates the effect of one change."],
    [["All markets are assumed to be perfectly competitive", "That is a different assumption (perfect competition)."],
     ["The government is assumed to stay out of the economy", "Ceteris paribus says nothing about government."],
     ["The long run is assumed to follow the short run", "It concerns other variables, not time periods."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Why is economics described as a social science?",
    explanation: "It studies human behaviour and builds and tests theories with evidence, but it cannot control conditions as a laboratory can." },
    ["It studies human choices and tests theories against evidence", "Correct: it uses the scientific approach on social behaviour."],
    [["It deals only with society's values rather than evidence", "Economics uses evidence for positive statements."],
     ["Its theories can be tested in a laboratory with exact results", "Human behaviour cannot be controlled like that."],
     ["It studies only the behaviour of governments", "It also studies households and firms."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A positive statement differs from a normative statement because a positive statement",
    explanation: "A positive statement can be shown to be true or false by evidence; a normative statement cannot, since it expresses a value judgement." },
    ["can be tested by looking at the evidence", "Correct: evidence can show whether it is true or false."],
    [["is always true when it is made by an economist", "Positive statements may be false."],
     ["is based on opinions about what ought to happen", "That describes a normative statement."],
     ["cannot be disputed by other economists", "Economists dispute positive claims whenever the evidence is unclear."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In the short run, a firm",
    explanation: "The short run is the period in which at least one factor of production is fixed, so output can change only by varying the other factors." },
    ["has at least one factor of production that is fixed", "Correct: that is the definition of the short run."],
    [["can vary the quantities of all its factors of production", "That describes the long run."],
     ["can change both its factors and its technology", "That describes the very long run."],
     ["must produce for exactly one year", "The short run is not a fixed number of months."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which period allows all factors to change but not technology?"],
    stem: "A clothing factory in Bulawayo can build a larger building and buy more machines, but its production methods remain the same. Which period is this?",
    explanation: "All factors can be varied (long run) but technology is unchanged, so this is the long run; the very long run also allows technology to change." },
    ["The long run", "Correct: all factors variable, technology constant."],
    [["The short run", "In the short run at least one factor, such as the building, is fixed."],
     ["The very long run", "That requires technology to change as well."],
     ["The market period", "No such period is defined here; the factors are variable."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Separate the testable claim from the judgement."],
    stem: "\"Taxing sugary drinks will reduce consumption, so the government should introduce the tax.\" Which description of this statement is correct?",
    explanation: "The first part (the tax will reduce consumption) is positive and testable; the second (should introduce) is normative." },
    ["A positive claim about the effect and a normative recommendation", "Correct: the statement joins a testable prediction with a value judgement."],
    [["A wholly positive statement because it mentions a prediction", "The word 'should' is a value judgement."],
     ["A wholly normative statement because it ends in a recommendation", "The first part can be tested."],
     ["A statement that cannot be either positive or normative", "It contains elements of both."]]);

  mc({ d: 3, skill: "EVALUATION", hints: ["Think about assumptions and realism."],
    stem: "A model assumes that consumers have perfect information and always act rationally. What is the main limitation of the model?",
    explanation: "Real consumers often lack information or make mistakes, so the model's predictions may not fit every situation." },
    ["Its assumptions may not hold in the real world, so predictions may be inaccurate", "Correct: models simplify reality."],
    [["It cannot be used to make any prediction at all about the behaviour of consumers", "Models can still predict well when assumptions roughly hold."],
     ["It uses mathematics, which is not allowed in a social science", "Maths is widely used in economics."],
     ["It contains only normative statements about consumers", "Its assumptions are positive claims about behaviour."]]);

  {
    const f = pctChange(2.0, 2.4), j = pctChange(8000, 7200);
    chk(f, 20); chk(j, -10);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: j, dp: 0, unit: "%",
      stem: "A fictional bus company raises its fare from US\\$2.00 to US\\$2.40. Weekly journeys fall from 8,000 to 7,200. Calculate the percentage change in the number of journeys, including the minus sign for a fall.",
      wrong: [10, (800 / 7200) * -100],
      explanation: `Change = (7,200 − 8,000) ÷ 8,000 × 100 = ${signedPct(j)}. Using 7,200 as the base gives −11.1%; using the new value as the base is a common error, and leaving out the sign loses the direction.` });
  }
  {
    const f = pctChange(1.5, 1.8);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: f, dp: 0, unit: "%", daily: true,
      stem: "A fictional shared-taxi service raises its fare from US\\$1.50 to US\\$1.80. Calculate the percentage increase in the fare.",
      wrong: [(0.3 / 1.8) * 100, 0.2],
      explanation: `(1.80 − 1.50) ÷ 1.50 × 100 = ${fmt(f)}%. The base is the original fare; dividing by 1.80 gives 16.7%.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A positive statement must be true.", answer: false,
    explanation: "False. A positive statement can be tested, and the test may show it to be false." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Disagreement between economists about whether a policy is desirable can arise from different value judgements even when they agree on the facts.", answer: true,
    explanation: "True. One economist may weight equality more heavily and another growth, so they judge the same facts differently." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The short run is any period shorter than one year.", answer: false,
    explanation: "False. The short run is the period in which at least one factor is fixed, which varies by industry." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its description.",
    pairs: [
      ["Ceteris paribus", "Other things being equal"],
      ["Normative statement", "A value judgement about what ought to be"],
      ["Short run", "A period in which at least one factor is fixed"],
      ["Very long run", "A period in which all factors and technology can change"],
    ],
    explanation: "These are the four basic terms of economic method and time periods." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Choose the correct terms.",
    template: "A {{blank:a}} statement can be tested against evidence. A {{blank:b}} statement involves a value judgement.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "normative"] },
      { id: "b", accepted: ["normative"], choices: ["positive", "normative"] },
    ],
    wrong: [["normative", "positive"]],
    explanation: "Positive statements are testable; normative statements express opinions about what ought to be." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the Latin phrase meaning 'other things being equal'.",
    accepted: ["ceteris paribus"], wrong: ["laissez-faire"],
    explanation: "Ceteris paribus: all other influences are assumed constant." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between a positive statement and a normative statement.",
    points: ["A positive statement can be tested against evidence (true or false).", "A normative statement contains a value judgement about what ought to be and cannot be settled by evidence alone."],
    modelAnswer: "A positive statement describes what is or will be and can be checked against evidence, for example 'unemployment rose last year'. A normative statement expresses a value judgement, such as 'unemployment should be reduced', which depends on opinion.",
    explanation: "Define both and note testability as the difference." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Define it, then show why it helps."],
    stem: "Explain why economists use the assumption of *ceteris paribus*.",
    points: ["Meaning: other influences are held constant.", "In reality many variables change together, so the effect of one cause cannot otherwise be separated.", "Example: the effect of a price rise on demand is studied while income and tastes are assumed unchanged."],
    modelAnswer: "Ceteris paribus means other things are held equal. Because many variables change together in the real world, economists need it to isolate the effect of a single change. For example, to see how a price rise affects quantity demanded, income and tastes are assumed to stay the same.",
    explanation: "Meaning, reason and example." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Give two different reasons, each explained."],
    stem: "Analyse **two** reasons why economists may disagree about whether a government should raise the national minimum wage.",
    points: ["Reason 1 identified: different value judgements (for example fairness against jobs).", "Reason 1 explained: one may stress higher incomes for low-paid workers, another the risk to employment.", "Reason 2 identified: different models or evidence about how employers respond.", "Reason 2 explained: studies may show different effects on employment, so predictions differ."],
    modelAnswer: "First, economists hold different value judgements: one may value higher pay for the low-paid more than the risk of fewer jobs, while another values employment more. Second, they use different models and evidence about how employers respond, so one predicts large job losses while another predicts little, and they reach different recommendations.",
    explanation: "Credit one value-based and one evidence-based reason, each developed." });

  // Structured 1: classification and testing.
  {
    const q1 = pctChange(40, 34), p1 = pctChange(2.5, 3.0);
    chk(q1, -15); chk(p1, 20);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Percentage change = change ÷ original × 100."],
      stem: "A fictional government proposes a tax on plastic bags. A report says: \"Last year the price of a plastic bag rose from US\\$2.50 to US\\$3.00 per pack and weekly sales in Zandia fell from 40 thousand packs to 34 thousand packs. The tax is a good idea and the price should rise further.\"",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: q1, dp: 0, unit: "%", stem: "Calculate the percentage change in weekly sales, including the sign.",
          wrong: [15, (6 / 34) * -100], explanation: "(34 − 40) ÷ 40 × 100 = −15%." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which part of the report is normative?",
          options: [["\"The tax is a good idea and the price should rise further\"", "Correct: 'good' and 'should' are value judgements."], ["\"The price rose from US\\$2.50 to US\\$3.00\"", "This is a testable fact."], ["\"Sales fell from 40 thousand to 34 thousand packs\"", "This is a testable fact."], ["\"Last year\"", "A time reference is not a statement."]],
          answer: "A", explanation: "Value judgements cannot be tested." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the figures do not prove that the higher price caused the fall in sales.",
          points: ["Other factors may have changed at the same time (incomes, weather, shop closures, substitutes).", "Ceteris paribus was not true, so the effect of price cannot be isolated.", "The data is consistent with the claim but does not prove cause."],
          modelAnswer: "Other influences such as incomes, substitutes or the weather may have changed during the year, so the fall in sales may not be due to price alone. The figures are consistent with the law of demand, but because other things were not equal they do not prove that the price rise caused the fall." }),
        P.manual({ label: "(d)", marks: 2, stem: "State **two** pieces of evidence needed to support the claim that the price should rise further.",
          points: ["Evidence of the effect on sales or on use of plastic bags (positive evidence).", "A value judgement or objective that makes lower use desirable (for example environmental benefits outweigh the cost to households)."],
          modelAnswer: "Evidence is needed on how much further sales would fall and whether the benefits of lower use, such as less litter, outweigh the costs to low-income households; the final decision also needs a value judgement about those costs and benefits." }),
      ],
      explanation: "Sales −15%; the last sentence is normative; ceteris paribus matters for causation." });
  }

  // Structured 2: time periods.
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Decide which factor is fixed."],
    stem: "A fictional furniture firm in Mutare has one factory with ten machines. It can hire more workers and buy more timber at once. Building a second factory takes three years. Last month a new type of automatic saw was invented but the firm has not bought it.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which period applies when the firm can change only its workers and timber?",
        options: [["The short run", "Correct: the factory and machines are fixed."], ["The long run", "In the long run all factors can change."], ["The very long run", "Technology also changes."], ["The medium run", "No such period is used here."]],
        answer: "A", explanation: "The factory is fixed, so this is the short run." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why building a second factory is a long-run decision.",
        points: ["It changes the quantity of a fixed factor (capital/land).", "In the long run all factors of production can be varied."],
        modelAnswer: "Building a factory changes the amount of capital, which is fixed in the short run. The long run is the period in which all factors can be varied." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how the invention of the automatic saw is linked to the very long run.",
        points: ["In the very long run technology can change.", "The new saw is new technology that could raise output per worker.", "The firm can adopt it only when it can change its production methods."],
        modelAnswer: "The very long run is the period in which technology can change as well as all factors. The automatic saw is new technology that could raise output per worker, so adopting it is a very long-run change in production methods." }),
    ],
    explanation: "Short run: some factor fixed; long run: all factors variable; very long run: technology changes." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Say what a model explains, what it assumes and how realistic the assumptions are."],
    stem: "Assess the usefulness of economic models, such as the demand and supply model, for explaining changes in the price of maize in Zimbabwe.",
    points: ["Model explains the direction of price changes after changes in supply or demand (e.g. poor harvest raises price).", "Simplifies by removing detail, making predictions possible.", "Uses ceteris paribus to isolate one change at a time.", "Applies to the maize market when there are many buyers and sellers and similar goods.", "Assumptions such as perfect information or no government intervention may not hold.", "Real prices are affected by several changes at once.", "Data may be poor, so testing is difficult.", "A justified judgement about usefulness."],
    levels: LV8,
    modelAnswer: "The demand and supply model is useful because it predicts the direction in which the price of maize will move: a poor harvest shifts supply to the left and raises price, while a rise in incomes shifts demand to the right. By holding other things equal it isolates each cause. However, the maize market has features that the simplest model assumes away: some buyers and sellers are large, information is imperfect, and government may control prices or stocks. Several changes also occur together, so the model's prediction for one change may be hidden in the data. Overall the model is a helpful first step for explaining the direction of price changes, but it must be supplemented with knowledge of the actual market before predicting the size of any change.",
    wordLimit: { min: 100, max: 300 },
    explanation: "A balanced assessment of simplification, ceteris paribus and realistic assumptions, with a judgement." });

  b.card("DEFINITION", "Define a **positive statement**.", "A statement about what is, was or will be, which can be tested against evidence and shown to be true or false.");
  b.card("DEFINITION", "Define a **normative statement**.", "A statement involving a value judgement about what ought to be; it cannot be settled by evidence alone.");
  b.card("DEFINITION", "What does **ceteris paribus** mean?", "Other things being equal: all other influences are held constant to isolate one relationship.");
  b.card("CONCEPT", "What is an **economic model**?", "A simplified representation of reality built on assumptions and used to explain and predict.");
  b.card("CONCEPT", "Give **two** reasons why economists disagree.", "Different value judgements; different models, assumptions or data; different time horizons.");
  b.card("DEFINITION", "Define the **short run** in economics.", "The period in which at least one factor of production is fixed.");
  b.card("DEFINITION", "Define the **long run** in economics.", "The period in which all factors of production can be varied but technology is unchanged.");
  b.card("DEFINITION", "Define the **very long run**.", "The period in which all factors can be varied and technology can change.");
  b.card("FACT", "Does a positive statement have to be true?", "No. It only has to be testable; evidence may show it is false.");
});
