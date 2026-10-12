// W3a: standards.ias-8-10
import { concept, P, table, sum, r2, fmt, money, chk, depreciation } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const EV = (right) => [["Adjusting event", right === 0 ? "Correct: it gives evidence of a condition at the year end." : "The condition did not exist at the year end."], ["Non-adjusting event", right === 1 ? "Correct: the condition arose after the year end." : "The condition existed at the year end."], ["Change in accounting estimate", "This is not an event after the reporting period."], ["Prior-period error", "Nothing was wrongly stated in an earlier period."]];

concept("aacc.standards.ias-8-10", { file: "standards/ias-8-10", keyPrefix: "standards.ias-8-10" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is a change in an accounting estimate applied?",
    ok: ["Prospectively: to the current and future periods", "Correct: earlier years are not restated."],
    bad: [["Retrospectively: by restating earlier years", "That is the treatment of policy changes and material errors."], ["Only in the next financial year", "The current year is also affected."], ["By adjusting opening retained earnings", "No restatement of opening balances is needed."]],
    explanation: "An estimate is revised because of new information, so only the current and later periods are affected.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which event after the reporting date is an adjusting event?",
    ok: ["A customer who owed money at the year end is declared bankrupt", "Correct: it shows the debt was doubtful at the year end."],
    bad: [["A fire destroys the company's warehouse", "The fire happened after the year end."], ["The directors announce a plan to buy a competitor", "The plan relates to conditions after the year end."], ["The share price falls sharply", "A fall in market price after the year end is non-adjusting."]],
    explanation: "An event is adjusting if it provides evidence of conditions that existed at the reporting date.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A company's factory is flooded three weeks after the year end. How is the event reported in the statements for the year just ended?",
    ok: ["It is disclosed in the notes if it is material", "Correct: non-adjusting events are disclosed."],
    bad: [["The inventory is written down in the year just ended", "The condition did not exist at the year end."], ["It is ignored because it happened after the year end", "Material non-adjusting events must be disclosed."], ["A provision is made at the year end", "No obligation existed at the year end."]],
    explanation: "A flood after the year end is a non-adjusting event: the figures are not changed but a material event is disclosed.",
  });
  const cost = 72000, life = 8, el = 3, nl = 13;
  const old = depreciation.straightLine(cost, 0, life), cv = cost - old * el, nw = r2(cv / (nl - el));
  chk(nw, 4500);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A machine cost ${money(cost)} and has been depreciated on the straight-line basis over ${life} years with no residual value. After ${el} years the total life is revised to ${nl} years. What is the annual depreciation charge from now on?`,
    ok: [money(nw), "Correct: carrying amount 45,000 ÷ remaining 10 years."],
    bad: [[money(r2(cost / nl)), "Depreciation for the whole cost over the new life ignores the three years already charged."], [money(old), "The original charge continues, so the change has been ignored."], [money(r2(cv / (nl - el + el))), "The remaining life is the new total life less the years elapsed."]],
    hints: ["Depreciate the carrying amount over the remaining life."],
    explanation: "Carrying amount = 72,000 - 3 × 9,000 = 45,000; remaining life = 13 - 3 = 10 years; charge = 4,500.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A material error is found in last year's statements. How is it corrected?",
    ok: ["By restating last year's figures and opening retained earnings", "Correct: the correction is retrospective."],
    bad: [["By adding the whole correction to this year's reported profit", "That would misstate this year's profit."], ["By ignoring it altogether, as it relates to a past period", "Material errors must be corrected."], ["By changing the depreciation rate used in the current year", "A depreciation rate is not the way to correct an error."]],
    hints: ["Should this year's profit carry last year's mistake?"],
    explanation: "IAS 8 requires a material prior-period error to be corrected retrospectively by restating the comparatives and opening balances.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Directors declare a final dividend of US\\$15,000 six weeks after the year end. How is it treated in the statements for the year just ended?",
    ok: ["It is disclosed in the notes and is not a liability", "Correct: there was no obligation at the year end."],
    bad: [["It is a current liability at the year end", "A liability exists only if declared by the year end."], ["It is deducted from profit for the year", "Dividends are never deducted in the statement of profit or loss."], ["It is added to share capital", "A dividend has nothing to do with share capital."]],
    hints: ["Was the dividend declared by the year end?"],
    explanation: "A dividend declared after the reporting period is a non-adjusting event.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which of these is a change in accounting POLICY, not in an estimate?",
    ok: ["Changing the cost formula for inventory from FIFO to weighted average", "Correct: the basis of measurement has been changed."],
    bad: [["Changing the rate of the allowance for irrecoverable debts from 3% to 4%", "This is a revised estimate."], ["Extending the expected life of a machine from eight to ten years", "A change in useful life is an estimate."], ["Raising the estimated warranty cost per unit sold", "A revised cost estimate is not a policy change."]],
    hints: ["Is it a change in the basis, or a better judgement of an uncertain amount?"],
    explanation: "A change in the method used to measure items is a change of policy and is applied retrospectively.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Last year's closing inventory was understated by US\\$4,800. The error is discovered this year. What is the effect on last year's profit and on opening retained earnings this year as originally reported?",
    ok: ["Both were understated by US\\$4,800", "Correct: understated closing inventory lowers profit."],
    bad: [["Both were overstated by US\\$4,800", "An understatement of closing inventory understates profit."], ["Last year's profit was overstated; opening retained earnings were correct", "The effects are in the same direction."], ["Last year's profit was understated; opening retained earnings were overstated", "Retained earnings follow profit."]],
    hints: ["Closing inventory is deducted from cost of sales."],
    explanation: "Closing inventory too low means cost of sales too high, so profit and retained earnings were both understated by 4,800.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A change in the estimated useful life of a machine is applied by restating the statements of earlier years.", answer: false, explanation: "False. A change in an estimate is applied prospectively; earlier years were the best estimate at the time." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The settlement after the year end of a court case that was in progress at the year end is normally an adjusting event.", answer: true, hints: ["Did the claim exist at the year end?"], explanation: "True. The claim existed at the year end, so the settlement gives evidence of the amount owed then." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each matter to its classification under IAS 8 or IAS 10.",
    pairs: ["Revising the life of a delivery van", "Discovering that last year's depreciation was never charged", "A customer's insolvency shortly after the year end on an old debt", "A fire in the warehouse after the year end"],
    right: ["Change in accounting estimate", "Prior-period error", "Adjusting event", "Non-adjusting event"],
    rightIndex: [0, 1, 2, 3],
    explanation: "A revised life is an estimate; an omitted charge is an error; an insolvency on an old debt is evidence of a year-end condition; a later fire is non-adjusting.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A change in accounting policy is applied {{blank:a}}. A non-adjusting event after the year end is {{blank:b}} in the notes if material.",
    blanks: [
      { id: "a", accepted: ["retrospectively"], choices: ["retrospectively", "prospectively"] },
      { id: "b", accepted: ["disclosed"], choices: ["disclosed", "adjusted"] },
    ],
    explanation: "Policy changes restate earlier periods; non-adjusting events change nothing but are disclosed.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the standard that deals with events after the reporting period.",
    accepted: ["ias 10", "ias10", "ias 10 events after the reporting period", "international accounting standard 10"],
    explanation: "IAS 10 covers adjusting and non-adjusting events after the reporting period.",
  });

  // numerical
  const c1 = 54000, l1 = 6, e1 = 2, n1 = 10;
  const chg = r2((c1 - (c1 / l1) * e1) / (n1 - e1));
  chk(chg, 4500);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: chg, calculator: true, wrong: [r2(c1 / l1), r2(c1 / n1)],
    stem: `Delivery vehicles cost ${money(c1)} and were depreciated straight-line over ${l1} years with no residual value. After ${e1} years the total expected life is revised to ${n1} years. Calculate the annual depreciation charge for the remaining years.`,
    hints: ["Find the carrying amount, then divide by the remaining life."],
    explanation: "Carrying amount = 54,000 - 2 × 9,000 = 36,000; remaining life 8 years; 36,000 ÷ 8 = 4,500. Using the original charge gives 9,000.",
  });
  const pr = 47300, w1 = 5150, w2 = 2640;
  const ap = r2(pr - w1 - w2);
  chk(ap, 39510);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: ap, calculator: true, wrong: [r2(pr + w1 + w2), r2(pr - w1)],
    stem: `Profit for the year before considering events after the year end was ${money(pr)}. After the year end, a customer's insolvency showed that a debt of ${money(w1)} that existed at the year end was irrecoverable, and the sale of inventory showed that it had to be written down by ${money(w2)}. A fire after the year end caused damage of ${money(18000)}. Calculate the adjusted profit for the year.`,
    hints: ["Which of the events are adjusting?"],
    explanation: "Adjusting events: 5,150 and 2,640. Profit = 47,300 - 5,150 - 2,640 = 39,510. The fire is non-adjusting.",
  });
  const ro = 68450, er = 3270;
  const rr = r2(ro - er);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: rr, daily: true, calculator: true, wrong: [r2(ro + er), ro],
    stem: `Retained earnings at the start of the year were reported as ${money(ro)}. It is now found that last year's closing inventory was overstated by ${money(er)}. Calculate the restated opening retained earnings.`,
    explanation: "Overstated inventory means last year's profit was overstated, so retained earnings fall: 68,450 - 3,270 = 65,180.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a change in an accounting estimate is not applied retrospectively.",
    points: ["The earlier figures were based on the best information available at the time", "The new estimate arises from new information, so it affects the current and future periods only"],
    modelAnswer: "The earlier estimate was the best available at the time and was not an error. The new estimate reflects new information, so it affects only the current and later periods.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between an adjusting event and a non-adjusting event, with one example of each.",
    points: ["An adjusting event provides evidence of a condition that existed at the reporting date, for example a customer's insolvency on an old debt", "A non-adjusting event concerns a condition that arose after the reporting date, for example a fire in the warehouse", "Adjusting events change the figures; non-adjusting events are disclosed in the notes if material"],
    modelAnswer: "An adjusting event gives evidence of a condition at the year end, such as an old debtor's insolvency, so the figures are changed. A non-adjusting event, such as a later fire, arose afterwards and is only disclosed.",
    hints: ["Did the condition exist at the year end?"],
    explanation: "One mark each for the definitions with examples and the treatment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State the conditions under which a company may change an accounting policy and explain how the change is applied.",
    points: ["A change is made if a standard requires it", "Or if the change gives more reliable and relevant information", "It is applied retrospectively: the comparatives and opening retained earnings are restated as if the new policy had always been used"],
    modelAnswer: "A policy may change only if a standard requires it or if it gives more reliable and relevant information. The change is applied retrospectively, with the comparatives and opening retained earnings restated.",
    hints: ["Think about why a company may not change policies at will."],
    explanation: "One mark each for the two permitted reasons and the retrospective application.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The directors of a company with a poor year decide to extend the expected life of its machines from eight to twelve years, which will increase profit. Evaluate their proposal.",
    points: ["The change is allowed only if it reflects a better estimate based on new information, not to improve profit", "If the machines really last longer, the new depreciation charge is more faithful and is applied from now on only", "If the aim is to improve profit, the statements would not be fair and users could be misled", "Judgement: accept the change only with evidence, such as maintenance records or technical advice, and disclose the change and its effect"],
    modelAnswer: "An estimate may be revised only when new information shows a better estimate, not to raise profit. If the machines last longer, the change is acceptable from now on. Without evidence it would mislead users, so the directors need technical evidence and must disclose the effect.",
    hints: ["What is the directors' motive, and what evidence is there?"],
    explanation: "One mark each for the test, the effect, the risk of misleading users and a judgement with the need for evidence.",
  });

  // Structured 1 (10 marks)
  const prA = 52800, a1 = 6400, a2 = 3050, fireLoss = 21500;
  const adjA = r2(prA - a1 - a2);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The financial statements of Gokwe Cotton Traders Ltd for the year ended 31 December 2025 were authorised for issue on 28 February 2026. Profit for the year before the events below was US\\$${fmt(prA)}.\n\n1. On 12 January 2026 a customer was declared insolvent. The customer owed US\\$${fmt(a1)} at 31 December 2025 for goods sold in November 2025.\n2. On 20 January 2026 the company sold inventory held at the year end, for which cost was US\\$${fmt(a2 + 8100)}, for net proceeds of US\\$8,100.\n3. On 9 February 2026 a flood damaged inventory with a cost of US\\$${fmt(fireLoss)}. It was in good condition at the year end.\n4. On 15 February 2026 the directors recommended a final dividend of US\\$12,500.`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Classify event 1.", options: EV(0), answer: "A", explanation: "The debt existed at the year end; the insolvency is evidence that it was irrecoverable then." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Classify event 2.", options: EV(0), answer: "A", explanation: "The sale gives evidence of the net realisable value of inventory held at the year end." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Classify event 3.", options: EV(1), answer: "B", explanation: "The inventory was in good condition at the year end; the flood is a condition that arose afterwards." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Classify event 4.", options: EV(1), answer: "B", explanation: "A dividend recommended after the year end is not a liability at the year end." }),
      P.num({ label: "(e)", marks: 3, kind: "money", value: adjA, wrong: [r2(prA - a1 - a2 - fireLoss), r2(prA - a1)], stem: "Calculate the adjusted profit for the year.", explanation: `${fmt(prA)} - ${fmt(a1)} - write-down ${fmt(a2)} = ${fmt(adjA)}. Events 3 and 4 do not change the figures.` }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain what the company must do about events 3 and 4 in its financial statements.", points: ["Event 3 is a non-adjusting event, so the figures are not changed", "Its nature and an estimate of its financial effect (US\\$21,500, less any insurance) are disclosed in a note", "Event 4: the dividend is disclosed in the notes and not shown as a liability at the year end"], modelAnswer: "Neither event changes the figures. The flood and its estimated effect are described in a note. The proposed dividend is also disclosed and is not shown as a liability.", explanation: "One mark for each point." }),
    ],
    hints: ["Adjusting events relate to conditions at the year end.", "Event 2 is an IAS 2 matter."],
    explanation: "This item tests the classification of events after the reporting period and the adjusted profit.",
  });

  // Structured 2 (14 marks)
  const retRep = 92400, depErr = 3600, polChg = 1800;
  const retRest = r2(retRep - depErr - polChg);
  chk(retRest, 87000);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Rusape Furniture Ltd reported retained earnings of US\\$${fmt(retRep)} at 1 January 2025. During 2025 the following came to light.\n\n1. Depreciation of US\\$${fmt(depErr)} on equipment for 2024 had not been charged.\n2. The directors changed the inventory policy from FIFO to weighted average cost in 2025. Opening inventory at 1 January 2025 would have been US\\$${fmt(polChg)} lower under the new method.\n3. Vehicles which cost US\\$${fmt(c1)} were depreciated straight-line over ${l1} years. After ${e1} years the total life was reassessed at ${n1} years because of better maintenance.`,
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Classify each of the three matters as a change in policy, a change in estimate or a prior-period error.", points: ["Matter 1 is a prior-period error", "Matter 2 is a change in accounting policy", "Matter 3 is a change in accounting estimate"], modelAnswer: "Matter 1 is a prior-period error. Matter 2 is a change in policy. Matter 3 is a change in estimate.", explanation: "One mark for each correct classification." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: retRest, wrong: [r2(retRep - depErr), r2(retRep + depErr + polChg)], stem: "Calculate the restated retained earnings at 1 January 2025.", explanation: `${fmt(retRep)} - error ${fmt(depErr)} - policy change ${fmt(polChg)} = ${fmt(retRest)}. Matters 1 and 2 are retrospective; matter 3 is not.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: chg, wrong: [r2(c1 / l1), r2(c1 / n1)], stem: "Calculate the annual depreciation charge on the vehicles for 2025 under the new estimate.", explanation: "Carrying amount 54,000 - 2 × 9,000 = 36,000; 36,000 ÷ 8 remaining years = 4,500." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: r2(c1 / l1 - chg), wrong: [chg, c1 / l1], stem: "Calculate the increase in profit for 2025 caused by the change in estimate.", explanation: "Old charge 9,000 - new charge 4,500 = 4,500." }),
      P.manual({ label: "(e)", marks: 3, stem: "Evaluate whether the directors should be allowed to treat all three matters by adjusting only the 2025 profit.", points: ["No: errors and policy changes are retrospective, so the comparatives and opening retained earnings must be restated", "Adjusting only 2025 profit would overstate or understate this year's profit and make the years incomparable", "Only the estimate is prospective and affects 2025 and later years; the note must disclose each change and its effect"], modelAnswer: "No. The error and the policy change must be restated retrospectively, so opening retained earnings are changed. Passing them through 2025 profit would distort this year and make comparison impossible. Only the estimate is prospective.", explanation: "One mark each for retrospective treatment, the distortion and the prospective estimate." }),
    ],
    hints: ["Which matters are retrospective?", "Depreciate the carrying amount over the remaining life."],
    explanation: "This item applies IAS 8 to an error, a policy change and a change in estimate.",
  });
  void sum; void table;

  b.card("DEFINITION", "What is a **change in accounting estimate**?", "A revision of a judgement about an uncertain amount (such as asset life); applied prospectively to the current and future periods.");
  b.card("DEFINITION", "What is a **prior-period error**?", "An omission or misstatement in earlier statements found later; a material error is corrected retrospectively by restating comparatives and opening retained earnings.");
  b.card("FACT", "Change in accounting policy", "Allowed only if required by a standard or if it gives more reliable information; applied retrospectively.");
  b.card("DEFINITION", "What is an **adjusting event**?", "An event after the reporting period that gives evidence of conditions that existed at the reporting date; the figures are adjusted.");
  b.card("DEFINITION", "What is a **non-adjusting event**?", "An event after the reporting period about conditions that arose afterwards; the figures are not changed but material events are disclosed.");
  b.card("FACT", "Examples of adjusting events", "Insolvency of a customer owing at the year end, sale of inventory showing NRV, settlement of a court case existing at the year end.");
  b.card("FACT", "Examples of non-adjusting events", "A fire or flood after the year end, a share issue, a dividend declared after the year end, a fall in market value after the year end.");
  b.card("FORMULA", "Revised depreciation after a change of life", "(Cost - accumulated depreciation) ÷ remaining life, where remaining life = new total life - years already elapsed.");
  b.card("FACT", "Dividend declared after the year end", "Not a liability at the year end; disclosed in the notes and recognised in the next year.");
});
