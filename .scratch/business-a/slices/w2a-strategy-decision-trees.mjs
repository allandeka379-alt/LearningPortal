// W2a: strategy.decision-trees (owns the decision-tree conventions: outcomes are before the option's cost unless stated;
// net expected value = expected value - cost of the option; probabilities at a chance node sum to 1).
import { concept, P, EXAM, checkExam, evaluateTree, expectedValue, money, chk, r2, rd } from "../lib.mjs";
const E = (x) => r2(expectedValue(x));
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.strategy.decision-trees", { file: "strategy/decision-trees", keyPrefix: "strategy.decision-trees" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a decision tree, which symbol is conventionally used for a **decision node**?",
    ok: ["A square", "Correct: a square marks a point where the business chooses between options."],
    bad: [["A circle", "A circle marks a chance node, where outside events decide the result."], ["A triangle", "A triangle is not used for either kind of node."], ["An arrow", "Arrows are the branches, not the nodes."]],
    explanation: "Squares are decision nodes (the business chooses); circles are chance nodes (events outside its control).",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The probabilities on the branches leaving one chance node must add up to",
    ok: ["1", "Correct: one of the outcomes must happen, so the probabilities total 1."],
    bad: [["0", "Probabilities cannot total zero."], ["100", "100 would be a percentage total, not a probability total."], ["The number of branches", "The total does not depend on how many branches there are."]],
    explanation: "Exactly one of the outcomes at a chance node occurs, so the probabilities sum to 1 (100%).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the **expected value** of an option calculated?",
    ok: ["Multiply outcomes by probabilities and add", "Correct: this weights each outcome by how likely it is."],
    bad: [["Add all the outcomes and divide by the number of outcomes", "That is the simple average and ignores the probabilities."], ["Subtract the lowest outcome from the highest", "That is the range of outcomes, not their expected value."], ["Take the outcome with the highest probability", "That is the most likely outcome, not the expected value."]],
    explanation: "Expected value = sum of (probability x outcome).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the **net expected value** of an option show?",
    ok: ["Expected value after deducting the option's cost", "Correct: it compares what the option is likely to earn with what it costs."],
    bad: [["Expected value before any cost is deducted from it", "That is the expected value, not the net figure."], ["The worst outcome that the option could produce", "The worst case is not an average."], ["The probability that the option will be a success", "A probability is a number between 0 and 1, not a money value."]],
    explanation: "Net expected value = expected value less the cost of the option; the highest net figure is the recommended option.",
  });
  const ev1 = E([[0.25, 44000], [0.75, 14000]]);
  chk(ev1, 21500);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional hardware shop in Masvingo estimates that a new range of paint will bring in US\\$44,000 with probability 0.25 and US\\$14,000 with probability 0.75. What is the expected value of the range, before any cost is deducted?",
    ok: [money(ev1), "Correct: (0.25 x 44,000) + (0.75 x 14,000) = 11,000 + 10,500."],
    bad: [[money(29000), "That is the simple average of 44,000 and 14,000 and ignores the probabilities."], [money(36500), "The probabilities have been swapped between the outcomes."], [money(58000), "That adds the outcomes without weighting them."]],
    hints: ["Multiply each outcome by its own probability first."],
    explanation: "Expected value = 11,000 + 10,500 = US\\$21,500. Averaging the outcomes (29,000) or adding them (58,000) ignores the probabilities.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In a decision tree with two decision stages, which part should be calculated **first**?",
    ok: ["The last decision, on the right", "Correct: later decisions are solved first and their values carried back to earlier nodes."],
    bad: [["The first decision on the left of the tree", "The earlier decision depends on the value of the later one."], ["The branch with the highest probability", "Probability does not decide the order of the working."], ["The branch with the lowest cost", "Cost is deducted when the options are compared, not used to order the working."]],
    hints: ["The tree is read left to right but calculated right to left."],
    explanation: "Work backwards from the right: solve the last decision, use its net value as an outcome, then solve the earlier node.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional furniture maker in Bulawayo finds that two options have net expected values of US\\$24,600 and US\\$23,900. Which is the most important limitation to bring into the choice?",
    ok: ["Probabilities are estimates, so rankings could change", "Correct: with such a small gap the recommendation is not reliable."],
    bad: [["Decision trees cannot be used when money is involved", "Money values are exactly what decision trees compare."], ["Net expected values cannot be compared across options", "Comparing them is the purpose of the tree."], ["Probabilities at a chance node need not add up to 1", "They must always add up to 1."]],
    hints: ["How big is the difference compared with the uncertainty in the estimates?"],
    explanation: "A gap of US\\$700 between options built on estimated probabilities is too small to be reliable; other factors should decide.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "The option with the highest net expected value could lose a small hotel in Victoria Falls US\\$60,000 if it fails, which is more than its cash reserves. Which is the best reason for the owner to choose a different option?",
    ok: ["Its worst outcome could threaten the business", "Correct: expected value is an average and does not show whether the business can survive a bad result."],
    bad: [["A decision tree is never reliable", "It is a useful guide even though it has limits."], ["The highest expected value is always the least profitable", "The highest expected value is the most profitable on average."], ["Probabilities cannot be applied to hotels", "Probabilities may be estimated for any business decision."]],
    hints: ["Think about the difference between an average result and a single result."],
    explanation: "Attitude to risk matters: an owner who cannot survive the worst outcome may rationally accept a lower expected value.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A decision tree guarantees that the option with the highest net expected value will be the most profitable one.",
    answer: false,
    explanation: "False. Expected value is a long-run average based on estimated probabilities. A single decision can turn out better or worse.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Decision node", "A point where the business chooses between options"], ["Chance node", "A point where outside events decide which outcome occurs"], ["Expected value", "The sum of each outcome multiplied by its probability"], ["Net expected value", "Expected value less the cost of the option"]],
    explanation: "Decision nodes are choices; chance nodes are events outside the business's control; net expected value allows for cost.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The expected value of an option is the sum of each outcome multiplied by its {{blank:a}}. To find the net expected value the {{blank:b}} of the option is then deducted.",
    blanks: [
      { id: "a", accepted: ["probability"], choices: ["probability", "cost", "revenue"] },
      { id: "b", accepted: ["cost"], choices: ["cost", "probability", "profit"] },
    ],
    explanation: "Outcome x probability gives expected value; subtracting the option's cost gives the net expected value.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** limitation of using decision trees.",
    accepted: ["probabilities are estimates", "probabilities are only estimates", "estimated probabilities", "based on estimates", "ignores attitude to risk", "ignores non-financial factors", "ignores non financial factors", "expected value is an average", "does not guarantee the outcome", "may be inaccurate", "ignores risk", "probabilities may be wrong", "ignores qualitative factors"],
    explanation: "Accept estimated or inaccurate probabilities, the use of an average, no allowance for attitude to risk, or the omission of non-financial factors.",
  });

  const evA = E([[0.15, 56000], [0.85, 16000]]);
  chk(evA, 22000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: evA, calculator: true, daily: true, wrong: [36000, 72000],
    stem: "A fictional poultry project in Chinhoyi expects an extension to bring in US\\$56,000 with probability 0.15 and US\\$16,000 with probability 0.85. Calculate the expected value of the extension, before its cost is deducted.",
    hints: ["Weight each outcome by its probability, then add."],
    explanation: "(0.15 x 56,000) + (0.85 x 16,000) = 8,400 + 13,600 = US\\$22,000. The simple average (36,000) and the sum of the outcomes (72,000) ignore the probabilities.",
  });
  const evBus = E([[0.52, 48000], [0.48, 18000]]);
  const netBus = r2(evBus - 14000);
  chk(evBus, 33600);
  chk(netBus, 19600);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: netBus, calculator: true, wrong: [evBus, r2((48000 + 18000) / 2 - 14000)],
    stem: "A fictional transport operator in Gweru can buy a second-hand minibus for US\\$14,000. It estimates a 0.52 chance of strong demand, when the minibus will bring in US\\$48,000, and a 0.48 chance of weak demand, when it will bring in US\\$18,000. Calculate the net expected value of buying the minibus.",
    hints: ["Find the expected value first, then deduct the cost."],
    explanation: "Expected value = (0.52 x 48,000) + (0.48 x 18,000) = 24,960 + 8,640 = 33,600. Net expected value = 33,600 − 14,000 = US\\$19,600. Stopping at 33,600 forgets the cost; using the simple average gives 19,000.",
  });
  const probMissing = r2(1 - 0.42 - 0.33);
  chk(probMissing, 0.25);
  const ev3 = E([[0.42, 80000], [0.33, 40000], [probMissing, -16000]]);
  chk(ev3, 42800);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: ev3, calculator: true, wrong: [46800, 104000],
    stem: "A fictional tourism lodge in Victoria Falls has three possible results from a new advertising campaign: a profit of US\\$80,000 with probability 0.42, a profit of US\\$40,000 with probability 0.33 and a loss of US\\$16,000 with the remaining probability. Calculate the expected value of the campaign.",
    hints: ["Work out the missing probability first.", "A loss is entered as a negative outcome."],
    explanation: "Missing probability = 1 − 0.42 − 0.33 = 0.25. Expected value = (0.42 x 80,000) + (0.33 x 40,000) + (0.25 x −16,000) = 33,600 + 13,200 − 4,000 = US\\$42,800. Leaving out the loss branch gives 46,800.",
    workedSolution: "1. Probabilities sum to 1, so the loss has probability 1 − 0.42 − 0.33 = 0.25.\n2. 0.42 x 80,000 = 33,600; 0.33 x 40,000 = 13,200; 0.25 x (−16,000) = −4,000.\n3. Expected value = 33,600 + 13,200 − 4,000 = US\\$42,800.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the probabilities used in a decision tree are a weakness of the technique.",
    points: ["Probabilities are usually estimated by managers rather than measured", "A small change in a probability can change which option has the highest net expected value", "If the estimates are wrong the recommendation may mislead the business"],
    modelAnswer: "The probabilities are normally estimated by managers, not measured, so they may be wrong. Even a small change in one probability can alter which option has the highest net expected value, so the recommendation may mislead the business.",
    hints: ["Where do the probabilities come from?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how the owner's attitude to risk might affect a decision based on a decision tree.",
    points: ["The tree ranks options by expected value, which is an average", "A cautious owner may avoid the option with the worst possible outcome", "The cautious owner may accept a lower expected value for a smaller possible loss", "A risk-taking owner may choose the option with the highest possible gain even if it is not the highest expected value"],
    modelAnswer: "The tree ranks options by expected value, which is only an average. A cautious owner may avoid the option with the worst possible outcome and accept a lower expected value to limit the loss. A risk-taking owner may choose the option with the highest possible gain even if its expected value is lower.",
    hints: ["Compare the best and worst outcomes with the expected value."],
    explanation: "Attitude to risk is not captured in expected values.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bakery in Mutare is using a decision tree to choose between a new oven and a second delivery van. Explain **two** benefits to the owner of using the tree.",
    points: ["It makes the owner list each option, outcome and cost before deciding", "Application: oven and van costs can be set against the money each is likely to bring in", "It puts a number on risk so that the two options can be compared", "Application: the owner can see which option has the higher net expected value and by how much"],
    modelAnswer: "The tree makes the owner list each option with its costs and the money it might bring in, so the oven and the van are compared on the same basis. It also gives a number to the risk, so the owner can see which option has the higher net expected value and by how much.",
    hints: ["Link each benefit to the oven or the van."],
    explanation: "Two benefits, each developed in context.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional school production unit near Harare has a decision tree that recommends starting a bakery line. Assess how far the school should rely on the tree.",
    points: ["The tree compares options and costs with numbers", "The probabilities are estimates and the recommendation may change if they change", "Expected value ignores the worst outcome, which a school with little cash may not be able to survive", "Non-financial factors, such as pupils' learning or the school's reputation, are not in the tree", "Counter-argument: the tree is still better than a guess, because it forces the school to set out its assumptions", "Judgement with a reason, for example use the tree as one input and test it with different probabilities"],
    modelAnswer: "The tree is useful because it compares the options and their costs with numbers. But its probabilities are estimates, so the result may change if they are slightly wrong. Expected value also hides the worst outcome, which a school with little cash may not survive, and it ignores non-financial factors such as pupils' learning. Even so, it is better than a guess because it forces the school to state its assumptions. The school should use it as one input, test it with different probabilities and decide only after looking at the worst case.",
    hints: ["Give a reason for and against, then decide how much weight the tree deserves."],
    explanation: "One point per mark; a judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const pO = E([[0.45, 36000], [0.55, 15000]]);
  const nO = r2(pO - 9500);
  const pV = E([[0.45, 27000], [0.55, 13000]]);
  const nV = r2(pV - 6500);
  chk(pO, 24450); chk(nO, 14950); chk(pV, 19300); chk(nV, 12800);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional business: Rudo's Bakery in Gweru can buy a new oven (cost US\\$9,500) or add a delivery van (cost US\\$6,500). Rudo estimates a 0.45 chance of strong demand and a 0.55 chance of weak demand. The oven would bring in US\\$36,000 if demand is strong and US\\$15,000 if it is weak. The van would bring in US\\$27,000 if demand is strong and US\\$13,000 if it is weak. Outcomes are before the cost of the option.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: pO, wrong: [25500], stem: "Calculate the expected value of the oven.", explanation: "(0.45 x 36,000) + (0.55 x 15,000) = 16,200 + 8,250 = US\\$24,450." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: nV, wrong: [pV], stem: "Calculate the net expected value of the van.", explanation: "Expected value = (0.45 x 27,000) + (0.55 x 13,000) = 12,150 + 7,150 = 19,300. Net = 19,300 − 6,500 = US\\$12,800." }),
      P.manual({ label: "(c)", marks: 5, stem: "Recommend which option Rudo should choose, justifying your answer.", points: ["Net expected value of the oven is 24,450 − 9,500 = US\\$14,950, against US\\$12,800 for the van", "The difference of US\\$2,150 rests on estimated probabilities", "The van costs US\\$3,000 less, so less cash is at risk", "The worst case is slightly better with the van: 13,000 − 6,500 = US\\$6,500 against 15,000 − 9,500 = US\\$5,500 for the oven", "Judgement with a reason: the oven on the numbers, or the van if cash is tight or Rudo is cautious"], modelAnswer: "The oven has a net expected value of 24,450 − 9,500 = US\\$14,950 and the van US\\$12,800, a difference of US\\$2,150 that depends on estimated probabilities. The van costs US\\$3,000 less and its worst case (13,000 − 6,500 = US\\$6,500) is a little better than the oven's (15,000 − 9,500 = US\\$5,500). Rudo should buy the oven if she can afford the larger outlay, because it has the higher expected value and the worst case is still a gain. If cash is tight, the van is the safer choice.", explanation: "The oven has the higher net expected value; the van costs less and has a slightly better worst case." }),
    ],
    hints: ["Net expected value = expected value − cost.", "If the numbers are close, compare the worst outcomes."],
    explanation: "Oven: net US\\$14,950. Van: net US\\$12,800. The oven leads on expected value; the van is cheaper and slightly safer.",
  });

  // Practice structured 2 (14 marks): two-stage survey tree
  const build = evaluateTree({ kind: "decision", options: [{ name: "Build", cost: 40000, node: { kind: "chance", branches: [{ p: 0.8, node: { kind: "leaf", value: 120000 } }, { p: 0.2, node: { kind: "leaf", value: 50000 } }] } }, { name: "Do not build", cost: 0, node: { kind: "leaf", value: 0 } }] });
  const buildNet = r2(build.ev);
  chk(buildNet, 66000);
  const surveyEv = r2(0.65 * buildNet + 0.35 * 0);
  const surveyNet = r2(surveyEv - 6000);
  chk(surveyEv, 42900);
  chk(surveyNet, 36900);
  const noSurvey = r2(E([[0.5, 120000], [0.5, 50000]]) - 40000);
  chk(noSurvey, 45000);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A fictional business: Farai plans to build a guest house in Victoria Falls costing US\\$40,000. He can pay US\\$6,000 for a survey first. The survey will be favourable with probability 0.65 and unfavourable with probability 0.35. After a favourable survey, demand is strong with probability 0.8 (returns US\\$120,000) and weak with probability 0.2 (returns US\\$50,000). After an unfavourable survey he will not build and the value is US\\$0. Without a survey he believes strong and weak demand are equally likely (probability 0.5 each) with the same returns. Returns are before the cost of building.",
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: buildNet, type: "CALCULATION", wrong: [106000], stem: "Calculate the net expected value of building after a favourable survey.", explanation: "Expected value = (0.8 x 120,000) + (0.2 x 50,000) = 96,000 + 10,000 = 106,000. Net of the US\\$40,000 cost = US\\$66,000.", workedSolution: "1. (0.8 x 120,000) + (0.2 x 50,000) = 96,000 + 10,000 = 106,000.\n2. Less cost of building 40,000 = US\\$66,000." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: surveyNet, type: "CALCULATION", wrong: [surveyEv, 66000], stem: "Calculate the net expected value of paying for the survey, given that Farai will build only after a favourable survey.", explanation: "(0.65 x 66,000) + (0.35 x 0) = 42,900. Less the survey cost of 6,000 = US\\$36,900.", workedSolution: "1. After a favourable survey the value is 66,000; after an unfavourable one it is 0.\n2. (0.65 x 66,000) + (0.35 x 0) = 42,900.\n3. Less the survey cost 6,000 = US\\$36,900." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: noSurvey, wrong: [85000], stem: "Calculate the net expected value of building without a survey.", explanation: "(0.5 x 120,000) + (0.5 x 50,000) = 85,000; less 40,000 = US\\$45,000." }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate whether Farai should pay for the survey.", points: ["Without the survey the net expected value is US\\$45,000; with it, US\\$36,900", "The survey lowers the expected value by US\\$8,100 because it costs US\\$6,000 and an unfavourable survey (probability 0.35) stops a build that would still have paid", "Benefit of the survey: it avoids building when demand is likely to be poor", "Without the survey the worst outcome (50,000 − 40,000 = US\\$10,000) is still a gain, so the extra protection is of little value", "The probabilities are estimates, so the gap should be tested", "Judgement: build without the survey on the figures, unless Farai doubts his 0.5 estimate"], modelAnswer: "On the numbers the survey is not worth buying. Building without it has a net expected value of US\\$45,000 against US\\$36,900 with the survey, because the US\\$6,000 fee is paid whatever the result and, more than a third of the time, an unfavourable survey stops a build that would still have paid. The survey would protect against building into poor demand, but even the worst case without it (50,000 − 40,000 = US\\$10,000) is a gain. The probabilities are estimates, so Farai should test them. He should build without the survey unless he doubts his 0.5 estimate of strong demand.", hints: ["Compare 45,000 with 36,900, then think about the worst case."], explanation: "Weighs the net expected values, the downside and the reliability of the estimates." }),
    ],
    hints: ["Solve the final decision first and carry its value back.", "The survey fee is deducted once, from the survey branch."],
    explanation: "After a favourable survey: 66,000. Survey route: 36,900. No survey: 45,000, so the survey is not worth its cost.",
  });

  // Practice structured 3 (15 marks)
  const optX = E([[0.5, 95000], [0.5, 18000]]);
  const netX = r2(optX - 38000);
  const optY = E([[0.5, 59000], [0.5, 32000]]);
  const netY = r2(optY - 20500);
  chk(optX, 56500); chk(netX, 18500); chk(optY, 45500); chk(netY, 25000);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: "A fictional business: Sipho Mining Supplies in Bulawayo must choose between X, a new warehouse (cost US\\$38,000), and Y, a leased depot (cost US\\$20,500). Sipho estimates a 0.5 chance that mining contracts grow and a 0.5 chance that they do not. If contracts grow, X brings in US\\$95,000 and Y US\\$59,000; if not, X brings in US\\$18,000 and Y US\\$32,000. Returns are before the cost of the option. Sipho has US\\$27,000 in cash.",
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: netX, type: "CALCULATION", wrong: [optX], stem: "Calculate the net expected value of X.", explanation: "Expected value = 47,500 + 9,000 = 56,500; less cost 38,000 = US\\$18,500.", workedSolution: "1. (0.5 x 95,000) + (0.5 x 18,000) = 47,500 + 9,000 = 56,500.\n2. Less cost 38,000 = US\\$18,500." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: netY, type: "CALCULATION", wrong: [optY], stem: "Calculate the net expected value of Y.", explanation: "Expected value = 29,500 + 16,000 = 45,500; less cost 20,500 = US\\$25,000.", workedSolution: "1. (0.5 x 59,000) + (0.5 x 32,000) = 29,500 + 16,000 = 45,500.\n2. Less cost 20,500 = US\\$25,000." }),
      P.manual({ label: "(c)", marks: 9, stem: "Evaluate which option Sipho should choose.", points: [["Y has the higher net expected value (US\\$25,000 against US\\$18,500)", 1], ["X has the larger possible gain: 95,000 − 38,000 = US\\$57,000 against US\\$38,500 for Y", 1], ["X's worst case is a loss of US\\$20,000 (18,000 − 38,000), while Y's worst case is a gain of US\\$11,500 (32,000 − 20,500)", 2], ["Application: Sipho has only US\\$27,000 in cash, so X cannot be paid for from his own funds and would need borrowing", 2], ["The gap between the net expected values is US\\$6,500 and the 0.5 probability is an estimate", 1], ["Non-financial factors, such as space to hold stock for new customers or the risk of a long lease, are not in the tree", 1], ["Judgement with a reason: choose Y because it has the higher expected value, the smaller downside and is affordable", 1]], levels: [[3, 7, 9, "Both options calculated; worst cases and the cash limit applied to Sipho; the reliability of the estimate tested; a justified judgement"], [2, 4, 6, "Compares net expected values and some risk with some application; judgement weakly supported"], [1, 1, 3, "Lists figures or features of the options with little comparison"]], modelAnswer: "Y has the higher net expected value (US\\$25,000 against US\\$18,500), and it is also safer. X could bring a gain of US\\$57,000 if contracts grow, but if they do not Sipho would lose US\\$20,000 (18,000 − 38,000), while Y still gains US\\$11,500 (32,000 − 20,500) in the same case. Sipho has only US\\$27,000 in cash, so X would need borrowing and would put the business at greater risk. The gap of US\\$6,500 rests on an estimated probability of 0.5, and the tree ignores things such as the flexibility of leasing. On balance Sipho should choose Y: it has the higher expected value, a smaller downside and he can afford it. X would be worth choosing only if he were confident that contracts will grow.", hints: ["Compare the best and worst outcomes of each option, and relate the cost to the cash he holds."], explanation: "Weighs expected values, downside and affordability to a judgement." }),
    ],
    hints: ["Expected value first, then deduct the cost.", "Then look at best and worst cases."],
    explanation: "Net expected values: X US\\$18,500, Y US\\$25,000. Y is better on the numbers and the downside.",
  });

  b.card("DEFINITION", "Decision tree", "A diagram of the options open to a decision maker, the possible outcomes of each, their probabilities and money values, used to compare the options.");
  b.card("DEFINITION", "Expected value", "The sum of each possible outcome multiplied by its probability; the average result if the decision were repeated many times.");
  b.card("FORMULA", "Net expected value", "Net expected value = expected value − cost of the option. Choose the highest.");
  b.card("FACT", "Decision node and chance node", "Square = a decision the business makes. Circle = an event outside its control, with probabilities on the branches.");
  b.card("FACT", "Probabilities at a chance node", "The probabilities on the branches leaving one chance node always add up to 1.");
  b.card("CONCEPT", "Solving a multi-stage tree", "Start at the last decision on the right, use its net value as an outcome, and work back to the first decision on the left.");
  b.card("FACT", "Advantages of decision trees", "They make managers list options and costs, put a number on risk, and show the order of decisions.");
  b.card("FACT", "Limitations of decision trees", "Probabilities are estimates; expected value is an average; attitude to risk and non-financial factors are ignored.");
  b.card("CONCEPT", "Evaluating a tree result", "Check the gap between options, the worst case, the reliability of the probabilities and whether more information is worth buying.");
});
