---
{
  "key": "strategy.decision-trees",
  "title": "Decision trees and expected value",
  "summary": "Drawing and reading a decision tree, calculating expected values and net expected values, choosing the best option, multi-stage trees, and the limits of the technique: estimated probabilities, attitude to risk and non-financial factors.",
  "concepts": ["abus.strategy.decision-trees"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Tendai runs a poultry project outside Gweru. Demand for eggs is rising, and she must decide whether to build a new laying house, upgrade the old one or leave things as they are. Nobody can promise her that demand will stay strong. A **decision tree** lets her set out each option, the outcomes that could follow, how likely each is and what each option costs, so that she can compare the options with numbers instead of a hunch.

Decision trees are tested in ZIMSEC Business Studies and Business Enterprise Skills (as a tool for decision making) and in Cambridge A Level Papers 3 and 4, where the calculation is usually worth 2 to 4 marks and the evaluation of the technique another 4 to 8. You should already be able to work with percentages and probabilities written as decimals (0.6 means a 60% chance).

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Decision tree; probability; expected value or expected monetary value | Decision tree; probability; expected value; net expected value |

Both boards examine the same technique. Cambridge examines it at A Level only (Papers 3 and 4); ZIMSEC examines it in both Forms 5 and 6 of Business Studies and in Form 6 of Business Enterprise Skills. Cost-benefit analysis is a separate technique with its own lesson.
:::

## Key definitions

:::definition{term="Decision tree"}
A diagram that sets out the choices open to a decision maker, the possible outcomes of each choice, the probability of each outcome and the money value of each outcome, so that the options can be compared.
:::

:::definition{term="Expected value"}
The average result of an option if the decision were repeated many times: each possible outcome is multiplied by its probability and the results are added together.
:::

:::definition{term="Net expected value"}
The expected value of an option less the cost of choosing it. The option with the highest net expected value is the one the tree recommends.
:::

:::keyfact{title="Rules for every tree"}
The probabilities leaving any one chance node must add up to 1. Expected value = sum of (probability x outcome). Net expected value = expected value − cost of the option. State in the question whether the outcomes already have the cost taken off; in this lesson and the practice items the outcomes are the money brought in **before** the option's cost is deducted, unless a question says otherwise.
:::

## Reading a tree

A tree is read from left to right and calculated from right to left.

- A **decision node** (drawn as a square) is a point where the business chooses. Each branch leaving it is an option, and the cost of the option is written on the branch.
- A **chance node** (drawn as a circle) is a point where events outside the business's control decide the result. Each branch carries a probability.
- At the end of each branch is an **outcome**, usually a money value such as revenue or profit.

Because diagrams cannot always be drawn, this course also shows trees as nested lists. To calculate, start at the outcomes on the right, work out the expected value at each chance node, subtract the cost of each option at the decision node, and choose the highest figure.

## Calculating expected value

For one option with outcomes of US\$70,000 (probability 0.6) and US\$35,000 (probability 0.4):

expected value = (0.6 x 70,000) + (0.4 x 35,000) = 42,000 + 14,000 = US\$56,000.

This is a long-run average. No single result will equal it: the business will actually receive either US\$70,000 or US\$35,000.

:::worked-solution[Example 1: choosing between three options]
Tendai, a fictional poultry farmer, estimates a 0.6 chance of strong demand and a 0.4 chance of weak demand. Her options are shown with the money each would bring in over five years, before its cost.

- Option A, build a new laying house (cost US\$30,000): strong demand US\$70,000, weak demand US\$35,000.
- Option B, upgrade the old house (cost US\$10,000): strong demand US\$40,000, weak demand US\$22,000.
- Option C, do nothing (cost US\$0): US\$0 extra.

| Option | Expected value (US\$) | Cost (US\$) | Net expected value (US\$) |
| --- | ---: | ---: | ---: |
| A: build | 56,000 | 30,000 | 26,000 |
| B: upgrade | 32,800 | 10,000 | 22,800 |
| C: do nothing | 0 | 0 | 0 |

1. Option A: (0.6 x 70,000) + (0.4 x 35,000) = 42,000 + 14,000 = 56,000; less cost 30,000 gives 26,000.
2. Option B: (0.6 x 40,000) + (0.4 x 22,000) = 24,000 + 8,800 = 32,800; less cost 10,000 gives 22,800.
3. Option A has the highest net expected value, so on the numbers alone Tendai builds.
4. Check the worst case: if demand is weak, A leaves 35,000 − 30,000 = 5,000, while B leaves 22,000 − 10,000 = 12,000. A cautious owner could choose B, because its downside is smaller and the net expected values differ by only US\$3,200.
:::

![Decision tree for Tendai: build (cost US\$30,000) gives US\$70,000 with probability 0.6 or US\$35,000 with 0.4, expected value US\$56,000 and net US\$26,000; upgrade (cost US\$10,000) gives US\$40,000 or US\$22,000, expected value US\$32,800 and net US\$22,800; doing nothing gives US\$0. Building has the highest net expected value.](media:diagrams/decision-tree-poultry.png "Figure: Tendai's decision tree with probabilities, expected values and net expected values")

## Multi-stage trees

Some decisions are made in stages: a business tests first and decides later. The later decision depends on the earlier result, so the tree has a second decision node. Always solve the **last** stage first, replace it with its net value, and then work back to the start.

:::worked-solution[Example 2: a pilot before a roll-out]
A fictional mushroom grower in Mutare can pay US\$5,000 for a pilot sale at three markets. The pilot succeeds with probability 0.6 and fails with probability 0.4.

- If the pilot succeeds she chooses between a roll-out costing US\$20,000 (outcome US\$60,000 with probability 0.7, US\$25,000 with probability 0.3) and staying small (cost US\$0, outcome US\$12,000).
- If the pilot fails she stays small and receives US\$5,000.
- If she does not run the pilot she does nothing: US\$0.

| Step | Working | Result (US\$) |
| --- | --- | ---: |
| Roll-out chance node | (0.7 x 60,000) + (0.3 x 25,000) | 49,500 |
| Roll-out, net of cost | 49,500 − 20,000 | 29,500 |
| Stay small | 12,000 − 0 | 12,000 |
| Choice after success | roll out (29,500 > 12,000) | 29,500 |
| Pilot chance node | (0.6 x 29,500) + (0.4 x 5,000) | 19,700 |
| Pilot, net of cost | 19,700 − 5,000 | 14,700 |
| Do nothing | | 0 |

1. Solve the right-hand decision first: after a successful pilot, rolling out is worth 29,500 and staying small 12,000, so she rolls out.
2. Use 29,500 as the outcome of the success branch of the pilot chance node.
3. Expected value of the pilot = 17,700 + 2,000 = 19,700; net of the US\$5,000 cost it is 14,700.
4. The pilot beats doing nothing, so the tree recommends it. The decision still rests on the 0.6 and the 0.7, which are estimates.
:::

![Two-stage decision tree for the mushroom grower: after a successful pilot (probability 0.6) rolling out has expected value US\$49,500 and net US\$29,500, better than staying small at US\$12,000; a failed pilot (0.4) gives US\$5,000; the pilot has expected value US\$19,700 and net US\$14,700, which beats doing nothing (US\$0).](media:diagrams/decision-tree-pilot.png "Figure: the pilot-then-roll-out tree, solved from the right-hand decision first")

## The strengths and limits of decision trees

| Advantage | Limitation |
| --- | --- |
| Forces managers to list options, outcomes and costs | Probabilities are estimates; a small change can reverse the answer |
| Puts a number on risk so that options can be compared | Expected value is an average, not what will happen once |
| Shows the order of decisions in multi-stage problems | Ignores the owner's attitude to risk: a cautious owner may avoid the option with the worst downside |
| Easy to update when better information arrives | Ignores non-financial factors such as workers' morale, the environment or the firm's reputation |

A good evaluation tests the result: How reliable are the probabilities? How different are the net expected values? Can the business survive the worst outcome? Would it be sensible to buy more information, for example by market research, before deciding?

:::worked-solution[Example 3: case analysis of a tree result]
**Context.** In Example 1 the tree recommends building, with net expected values of US\$26,000 against US\$22,800 for upgrading. Tendai has borrowed to build before, and a poor season left her short of cash.

**Point.** The tree supports building, but not by much.

**Application.** The difference between the options is US\$3,200 on estimates of 0.6 and 0.4. If strong demand has only a 0.5 chance, the figures change: A would be (0.5 x 70,000) + (0.5 x 35,000) − 30,000 = 22,500 and B (0.5 x 40,000) + (0.5 x 22,000) − 10,000 = 21,000, so the gap narrows to US\$1,500.

**Analysis.** A small gap on uncertain probabilities means the ranking is fragile. Building also puts US\$30,000 at risk and leaves only US\$5,000 in the weak-demand case, which matters to an owner who already has cash flow problems.

**Judgement.** Tendai should treat the tree as support, not proof. Upgrading is a reasonable choice if she cannot afford a poor season, while building is better only if she can finance it without risking the rest of the business. Market research on egg demand before committing would raise the confidence in the probabilities.
:::

## Common mistakes

:::mistake{title="Forgetting to deduct the cost of the option"}
The expected value of the outcomes is not the answer by itself. The cost of the option must be subtracted before the options are compared.
:::

:::mistake{title="Probabilities that do not add up"}
All branches leaving one chance node must sum to 1. A tree with 0.6 and 0.3 on two branches has an error.
:::

:::mistake{title="Solving a multi-stage tree from the left"}
Start at the final decision on the right, use its net value, and work back to the first decision.
:::

:::mistake{title="Treating the expected value as a prediction"}
A result of US\$56,000 is a long-run average. The actual result is one of the outcomes on the branches, and a one-off decision may not repeat.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Business Studies Paper 1 (calculation of expected values in a structured question) and Paper 2 (data response and essays on decision-making tools); Business Enterprise Skills Papers 1 and 2; Cambridge Papers 3 and 4 (calculate, analyse and evaluate the use of decision trees in a case). Cambridge does not test decision trees at AS Level.
:::

:::exam-tip{title="Command words"}
*Calculate*: show each expected value and the cost deducted, then name the best option. *State/outline* (ZIMSEC): name the parts of a tree or one limitation. *Explain/analyse*: link a limitation to the case, for example uncertain probabilities for a new product. *Evaluate/discuss/justify*: give a decision, compare the net expected values, test the risk and the reliability of the probabilities, and say what else should be considered.
:::

## Summary

:::summary
- A decision tree sets out options, chance events, probabilities and money outcomes; decision nodes are squares and chance nodes are circles.
- Expected value = the sum of probability x outcome; the probabilities at each chance node total 1.
- Net expected value = expected value − cost of the option; choose the highest, working from right to left in multi-stage trees.
- Always state whether outcomes are before or after the cost of the option.
- Limits: estimated probabilities, an average is not a forecast, attitude to risk, and non-financial factors.
- A strong evaluation checks the worst case, the size of the gap between options and the quality of the information.
:::
