// W3a: ZIMSEC Business Enterprise and Skills exam-format items: 2 × 20-mark Paper 2 Section B essays and
// 1 × 17-mark Paper 1 structured question. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, money, fmt, r2, check, BES } from "../lib.mjs";

const L8 = [[3, 6, 8, "Well-developed explanation of several relevant points, applied with examples."], [2, 3, 5, "Some explanation of relevant points; limited examples."], [1, 1, 2, "Points listed with little or no explanation."]];
const L10 = [[3, 7, 10, "Detailed, accurate explanation of a full range of points, each developed with examples."], [2, 4, 6, "Several relevant points with some development."], [1, 1, 3, "A few points listed, little development."]];
const L12 = [[3, 9, 12, "Balanced evaluation of each option, well developed and applied, with a justified conclusion."], [2, 5, 8, "Some evaluation, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points, little explanation, no conclusion."]];

concept("bus.people.motivation-theories", { file: "exam/w3a-bes", keyPrefix: "exam.w3a-bes", applies: BES }, (b) => {
  // Essay 1 (20 marks): motivation theories and money as a motivator.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.people.motivation-theories", "bus.people.motivation-methods"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain Maslow's hierarchy of needs and how an enterprise can satisfy each level of need.",
        points: [
          "Needs arranged in five levels; lower needs met before higher ones motivate (1)",
          ["Physiological: food, shelter; met by a wage enough to live on, breaks", 2],
          ["Safety: security; met by contracts, safe conditions, pensions", 2],
          ["Social: belonging; met by teamwork, staff events", 2],
          ["Esteem: recognition, status; met by praise, titles, promotion", 2],
          "Self-actualisation: reaching potential; met by challenging work, training (1)",
        ],
        levels: L10,
        modelAnswer: "Maslow arranged human needs in five levels, usually drawn as a pyramid, and argued that people are motivated by the lowest unmet need; once it is satisfied, the next level motivates. Physiological needs for food, water and shelter are met when the enterprise pays a wage high enough to live on and allows rest breaks. Safety needs for security are met by contracts of employment, safe working conditions, protective clothing and pension schemes. Social needs for friendship and belonging are met through team working, a shared canteen and staff events. Esteem needs for status and recognition are met through praise, job titles, employee-of-the-month awards and promotion. Finally, self-actualisation, the need to reach one's full potential, is met by giving challenging work, responsibility and training. An enterprise should find out which level its workers have reached and provide what they need next.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "\"Money is the best way to motivate workers in an enterprise.\" Discuss.",
        points: [
          "For: Taylor: workers motivated by money; piece rate raises output (1)",
          "For: low-paid workers need money to meet physiological and safety needs (1)",
          "For: bonuses and commission reward effort directly (1)",
          "Against: Herzberg: pay is a hygiene factor; prevents dissatisfaction but does not motivate (1)",
          "Against: once basic needs are met, recognition, responsibility and promotion motivate (1)",
          "Against: money is costly for a small enterprise; effect of a rise wears off (1)",
          "Against: piece rate may lower quality (1)",
          "McGregor: Theory Y workers seek responsibility, not just pay (1)",
          ["Justified conclusion", 2],
        ],
        levels: L10,
        modelAnswer: "Taylor argued that workers are motivated mainly by money, and piece rates, bonuses and commission do raise output when effort can be measured. For low-paid workers, money is essential to meet physiological and safety needs, so it is a strong motivator. However, Herzberg found that pay is a hygiene factor: fair pay prevents dissatisfaction, but further rises do not make people work harder for long. Once basic needs are met, Maslow's esteem and self-actualisation needs and Herzberg's motivators, such as recognition, responsibility and promotion, become more important, and McGregor's Theory Y suggests many workers seek responsibility. Money is also expensive for a small enterprise, and piece rates may lower quality. In conclusion, money is the best motivator only for workers whose basic needs are not met; for most workers a fair wage combined with non-financial methods works better.",
      }),
    ],
    explanation: "(a) Five levels with a way to meet each. (b) Taylor and basic needs support money; Herzberg, Maslow's higher needs and McGregor's Theory Y suggest non-financial methods; justified conclusion.",
    hints: ["(a) Work up from the bottom of the pyramid.", "(b) Use at least two theories."],
  });

  // Essay 2 (20 marks): leadership qualities and styles.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.people.leadership"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe **four** qualities of a good leader in an enterprise.",
        points: [
          ["Vision and decisiveness: clear direction, decisions not delayed", 2],
          ["Good communication: instructions and objectives understood", 2],
          ["Honesty and integrity / fairness: trusted and respected", 2],
          ["Ability to motivate / knowledge of the work / confidence / willingness to take risks", 2],
        ],
        levels: L8,
        modelAnswer: "A good leader has a clear vision of where the enterprise is going and makes decisions without delay, so workers know what to aim for. The leader communicates clearly, explaining objectives and listening to workers, so instructions are understood and mistakes are fewer. The leader is honest and fair, keeping promises and treating everyone equally, so workers trust and respect him or her. Finally, a good leader motivates others, using praise and example so that workers give extra effort; knowledge of the work also earns respect and helps solve problems.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "Evaluate the autocratic, democratic and laissez-faire leadership styles for the owner of a growing enterprise with both experienced and newly recruited workers.",
        points: [
          "Autocratic: quick decisions, clear instructions; suits new workers and emergencies (1)",
          "Autocratic: demotivates experienced workers; ideas lost; high labour turnover (1)",
          "Democratic: workers consulted; motivation and better ideas (1)",
          "Democratic: helps experienced workers accept growth and change (1)",
          "Democratic: slower decisions; not suitable in a crisis (1)",
          "Laissez-faire: suits skilled, self-motivated workers; creativity (1)",
          "Laissez-faire: new workers lack direction; poor coordination in a growing enterprise (1)",
          "Style may vary with the group and the situation (1)",
          "Links to McGregor Theory X / Y (1)",
          "Applied to a growing enterprise (more staff, more change) (1)",
          ["Justified conclusion", 2],
        ],
        levels: L12,
        modelAnswer: "An autocratic owner makes decisions alone and gives clear orders. This is quick and suits newly recruited workers who need direction, and emergencies, but experienced workers may feel ignored, so their ideas are lost and they may leave, which is damaging when the enterprise needs skilled staff to grow. A democratic owner consults workers, which raises motivation, produces better ideas and helps experienced workers accept the changes that growth brings, although decisions take longer and the style is unsuitable in a crisis. A laissez-faire owner leaves workers to decide; this can encourage creativity among skilled, self-motivated workers, but new workers lack guidance and coordination suffers as the enterprise gets bigger. In McGregor's terms, an autocratic owner treats workers as Theory X and a democratic owner as Theory Y. No single style is best: the owner should lead mainly democratically, involving experienced workers in planning the growth, while giving new recruits clearer, more autocratic direction until they are trained, and using laissez-faire only with trusted specialists.",
      }),
    ],
    explanation: "(a) Four qualities, each described. (b) Each style weighed for the two groups of workers and for growth; justified recommendation of a flexible style.",
    hints: ["(a) Say why each quality matters.", "(b) Consider experienced and new workers separately."],
  });

  // BES Paper 1: 17-mark structured question.
  const workers = 6, perUnit = 1.6, outA = 85, timeRate = 2.4, hours = 50;
  const pieceA = r2(outA * perUnit), timePay = r2(hours * timeRate);
  check("piece", pieceA, 136);
  check("time", timePay, 120);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 1080, calculator: true, paper: "Paper 1",
    concepts: ["bus.people.management-functions", "bus.people.motivation-methods", "bus.people.leadership"],
    stem: `Rudo runs Mukando Metalworks, an enterprise in Gweru that makes scotch carts and wheelbarrows. She employs ${workers} welders. She sets monthly targets, buys steel, allocates work and checks every finished item herself. She makes every decision alone and rarely asks the welders for their views. The welders are paid a time rate of ${money(timeRate)} an hour for a ${hours}-hour week. Rudo is thinking of paying ${money(perUnit)} for each wheelbarrow that passes inspection instead. Last week Tafara, her fastest welder, made ${outA} wheelbarrows that passed inspection.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Complete the sentences about Rudo's work as a manager.",
        template: "Setting monthly targets is {{blank:a}}. Checking every finished item is {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["planning"], choices: ["planning", "organising", "leading", "controlling"] },
          { id: "b", accepted: ["controlling"], choices: ["planning", "organising", "leading", "controlling"] },
        ],
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: timePay, type: "CALCULATION",
        stem: "Calculate a welder's weekly pay under the present time rate.",
        wrong: [r2(timeRate * 40)],
        explanation: `${hours} × ${money(timeRate)} = ${money(timePay)}.`,
        workedSolution: `1. Pay = hours × rate.\n2. ${hours} × ${fmt(timeRate)} = ${money(timePay)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: pieceA, type: "CALCULATION",
        stem: "Calculate how much Tafara would have earned last week under the proposed piece rate.",
        wrong: [r2(outA / perUnit)],
        explanation: `${outA} × ${money(perUnit)} = ${money(pieceA)}.`,
        workedSolution: `1. Pay = units passed × rate per unit.\n2. ${outA} × ${fmt(perUnit)} = ${money(pieceA)}.`,
      }),
      P.mcq({
        label: "(d)", marks: 1,
        stem: "Which leadership style does Rudo use?",
        options: [["Autocratic", "Correct: she decides alone without consulting."], ["Democratic", "She does not consult the welders."], ["Laissez-faire", "She keeps control of every decision."], ["Consultative", "She does not consult the welders."]],
        answer: "A",
      }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Explain **two** non-financial methods Rudo could use to motivate the welders.",
        points: [
          "Job enrichment / delegate quality checks to an experienced welder (1)",
          "Gives responsibility, a Herzberg motivator; frees Rudo's time (1)",
          "Praise / recognition / welder of the month / consultation / training (1)",
          "Meets esteem needs; welders feel valued (1)",
        ],
        modelAnswer: "Rudo could make an experienced welder responsible for checking finished items, giving him responsibility, which motivates according to Herzberg and frees her time. She could also praise good work and ask the welders for ideas, so they feel valued and their esteem needs are met.",
      }),
      P.manual({
        label: "(f)", marks: 6,
        stem: "Recommend whether Rudo should change from the time rate to the piece rate. Justify your answer.",
        points: [
          `Fast welders gain (Tafara ${money(pieceA)} vs ${money(timePay)}), so incentive to produce more (1)`,
          "Paying only for items that pass inspection protects quality / fixes labour cost per item (1)",
          "Slower welders may earn less than now and become demotivated or leave (1)",
          "Pay falls if steel runs out / machines break; welders may rush (1)",
          "Alternative: basic pay plus a bonus per item above a target (1)",
          "Justified recommendation (1)",
        ],
        modelAnswer: `Under the piece rate Tafara would have earned ${money(pieceA)} instead of ${money(timePay)}, so fast welders have a strong reason to produce more, and paying only for wheelbarrows that pass inspection protects quality. However, slower welders could earn less than now and may leave, and all welders would lose pay if steel deliveries were late. Rudo should keep a basic weekly wage and add a bonus for each wheelbarrow above a weekly target, so output rises without making pay insecure.`,
      }),
    ],
    explanation: `(a) Planning; controlling. (b) ${money(timePay)}. (c) ${money(pieceA)}. (d) Autocratic. (e) Responsibility, recognition, consultation. (f) Piece rate rewards fast workers but risks insecurity; a bonus scheme may be better.`,
    hints: ["(b) Hours × hourly rate.", "(c) Wheelbarrows passed × rate per wheelbarrow.", "(f) Compare the effect on fast and slow welders."],
  });
});
