// W2a exam-format items: ZIM_STRUCT10 x3 (ZIMSEC Business Studies Paper 1 section A / Business Enterprise Skills Paper 1 section A)
import { concept, P, EXAM, checkExam, ZIM, hr, chk, r2, expectedValue } from "../lib.mjs";

const C = (k) => `abus.${k}`;

concept(C("hrm.purpose-planning"), { file: "exam/w2a-struct", keyPrefix: "exam.w2a-struct" }, (b) => {
  // 1. HRM: labour turnover, recruitment terms, effects of high turnover
  const open = 64, close = 76, left = 14;
  const avg = hr.average(open, close);
  const lt = hr.labourTurnover(left, avg);
  chk(avg, 70); chk(lt, 20);
  b.struct({
    d: 3, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM, calculator: true,
    paper: "ZIMSEC Business Studies Paper 1",
    concepts: [C("hrm.purpose-planning"), C("hrm.recruitment-selection")],
    stem: "Zuva Furniture is a fictional furniture maker in Chinhoyi. On 1 January it employed 64 people and on 31 December it employed 76. During the year 14 employees left, most of them to join a rival firm. To fill the vacancies the owner placed advertisements in a newspaper and interviewed candidates, after writing a job description and a person specification for each post.",
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 3, kind: "pct", value: lt, wrong: [r2((14 / 76) * 100), r2((14 / 64) * 100)], stem: "Calculate the labour turnover of Zuva Furniture for the year, to one decimal place. (Labour turnover = employees leaving ÷ average number of employees × 100.)", explanation: "Average employees = (64 + 76) ÷ 2 = 70. Labour turnover = 14 ÷ 70 × 100 = 20.0%." }),
      P.fib({ label: "(b)", marks: 3, stem: "Complete the sentences by choosing the correct word for each gap.", template: "{{blank:a}} attracts people to apply for a vacancy, while {{blank:b}} chooses the best candidate. The {{blank:c}} specification describes the qualifications and qualities wanted in the post holder.", blanks: [{ id: "a", accepted: ["Recruitment"], choices: ["Recruitment", "Selection", "Induction"] }, { id: "b", accepted: ["selection"], choices: ["recruitment", "selection", "dismissal"] }, { id: "c", accepted: ["person"], choices: ["person", "job", "contract"] }], explanation: "Recruitment attracts applicants; selection chooses between them; the person specification describes the person wanted." }),
      P.manual({ label: "(c)", marks: 4, stem: "Outline two reasons why a high labour turnover may be a problem for Zuva Furniture.", points: ["Recruitment and selection costs rise because leavers must be replaced", "Application: the 14 leavers must be advertised for, interviewed and trained", "Experience and skill are lost and new staff are less productive at first", "Application: furniture quality and delivery may suffer while new workers learn"], modelAnswer: "Every leaver has to be replaced, which costs money in advertising and interviewing, and the 14 leavers also have to be trained. Experienced workers take their skill with them, and new workers are less productive at first, so the quality or delivery of furniture may suffer.", explanation: "Two reasons, each developed." }),
    ]),
    hints: ["Use the average of the opening and closing numbers.", "Recruitment comes before selection."],
    explanation: "Labour turnover 20.0%; terms recruitment, selection, person; high turnover raises costs and lowers skill.",
  });

  // 2. Motivation: financial methods
  const piece = r2(0.95 * 285);
  const ot = r2(5.6 * 40 + 5.6 * 1.5 * 8);
  chk(piece, 270.75); chk(ot, 291.2);
  b.struct({
    d: 3, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM, calculator: true,
    paper: "ZIMSEC BES Paper 1",
    concepts: [C("motivation.financial")],
    stem: "Tafara Garments is a fictional clothing workshop in Bulawayo. Cutters are paid US\\$0.95 for each garment piece cut. Machinists are paid a time rate of US\\$5.60 an hour for a 40-hour week; hours beyond 40 are paid at one and a half times the normal rate. Last week a cutter cut 285 pieces and a machinist worked 48 hours. The owner is worried that the cutters may be hurrying and spoiling cloth.",
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.group({ label: "(a)", stem: "Calculate last week's pay of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: piece, wrong: [285, 0.95], stem: "the cutter;", explanation: "285 × US\\$0.95 = US\\$270.75." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: ot, wrong: [r2(5.6 * 48), r2(5.6 * 1.5 * 48)], stem: "the machinist.", explanation: "Normal pay = 40 × 5.60 = 224.00. Overtime = 8 × (5.60 × 1.5) = 8 × 8.40 = 67.20. Total = US\\$291.20." }),
      ] }),
      P.match({ label: "(b)", marks: 2, stem: "Match each method of payment to its description.", pairs: [["Piece rate", "Pay for each unit produced"], ["Time rate", "Pay for each hour worked"]], explanation: "Cutters are paid a piece rate; machinists a time rate." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain one advantage and one disadvantage to Tafara Garments of paying the cutters a piece rate.", points: ["Advantage: it rewards effort, so cutters have a reason to cut more pieces", "Development: little supervision of effort is needed, so supervisory costs may be low", "Disadvantage: quality may fall as workers hurry", "Development: cloth may be spoiled, raising costs and wasting materials"], modelAnswer: "A piece rate rewards effort, so cutters have a reason to cut more pieces, and less supervision of effort is needed. However, workers who hurry may spoil cloth, so quality falls and materials are wasted, which raises costs.", explanation: "One advantage and one disadvantage, each developed." }),
    ]),
    hints: ["Overtime is paid only for the hours beyond 40.", "Piece rate rewards speed but may harm quality."],
    explanation: "Cutter US\\$270.75; machinist US\\$291.20; piece rate advantages and disadvantages.",
  });

  // 3. Decision tree
  const pX = r2(expectedValue([[0.62, 54000], [0.38, 25000]]) - 28000);
  const pY = r2(expectedValue([[0.62, 39000], [0.38, 27000]]) - 11000);
  chk(pX, 14980); chk(pY, 23440);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM, calculator: true,
    paper: "ZIMSEC Business Studies Paper 1",
    concepts: [C("strategy.decision-trees")],
    stem: "Kudzai runs a fictional cattle-fattening business near Gweru. She can build a new feeding pen (cost US\\$28,000) or hire an existing pen (cost US\\$11,000). She estimates a 0.62 chance of good prices and a 0.38 chance of poor prices. The new pen would bring in US\\$54,000 if prices are good and US\\$25,000 if they are poor. The hired pen would bring in US\\$39,000 if prices are good and US\\$27,000 if they are poor. The amounts are before the cost of the option.",
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 3, kind: "money", value: pX, type: "CALCULATION", wrong: [r2(expectedValue([[0.62, 54000], [0.38, 25000]])), 42980 - 11000], stem: "Calculate the net expected value of building the new pen.", explanation: "Expected value = (0.62 × 54,000) + (0.38 × 25,000) = 33,480 + 9,500 = 42,980. Net = 42,980 − 28,000 = US\\$14,980.", workedSolution: "1. (0.62 × 54,000) + (0.38 × 25,000) = 33,480 + 9,500 = 42,980.\n2. Less cost 28,000 = US\\$14,980." }),
      P.group({ label: "(b)", stem: "For the hired pen:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: pY, wrong: [r2(expectedValue([[0.62, 39000], [0.38, 27000]])), 15000], stem: "calculate the net expected value;", explanation: "Expected value = (0.62 × 39,000) + (0.38 × 27,000) = 24,180 + 10,260 = 34,440. Net = 34,440 − 11,000 = US\\$23,440." }),
        P.mcq({ label: "(ii)", marks: 1, stem: "which option has the higher net expected value?", options: [["The hired pen", "Correct: US\\$23,440 is more than US\\$14,980."], ["The new pen", "Its net expected value is lower, US\\$14,980."], ["Neither, they are equal", "The two net values differ."], ["Cannot be decided from the data", "The values can be compared."]], answer: "A", explanation: "23,440 > 14,980." }),
      ] }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain two limitations of using a decision tree to make this decision.", points: ["The probabilities are only estimates, so the result could be wrong", "Application: a small change in the 0.62 chance of good prices could change which pen is better", "The tree ignores the owner's attitude to risk and non-financial factors", "Application: Kudzai may prefer the pen with the smaller cost or the better worst-case result"], modelAnswer: "The probabilities are only estimates, so a small change in the 0.62 chance of good prices could change which pen has the higher net expected value. A decision tree also ignores Kudzai's attitude to risk and non-financial factors, for example she might prefer the cheaper pen because its worst-case result is better.", explanation: "Two limitations, each applied." }),
    ]),
    hints: ["Net expected value = expected value − cost of the option.", "Compare the two net values."],
    explanation: "New pen US\\$14,980; hired pen US\\$23,440; the hired pen is better on the numbers, but probabilities are estimates.",
  });
});
