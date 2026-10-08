// W2b: econ.production.productivity — production vs productivity, TP/AP/MP (ZIMSEC), influences, investment.
import { concept, P, table, productivity, pctChange, check, fmt, ZIM, CAM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.production.productivity", { file: "production/productivity", keyPrefix: "production.productivity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **labour productivity**?",
    options: [
      ["Output per worker in a period of time", "Correct: output divided by labour input."],
      ["The total output of a firm in a year", "That is production."],
      ["The number of workers a firm employs", "That is the size of the workforce."],
      ["The wage paid to each worker per hour", "That is the wage rate."],
    ],
    answer: "A",
    explanation: "Labour productivity is output per worker (or per worker-hour); production is total output.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm's output rises by 10% after it employs 20% more workers. What has happened?",
    options: [
      ["Production has risen but labour productivity has fallen", "Correct: output grew more slowly than the workforce."],
      ["Production and labour productivity have both risen", "Output per worker has fallen."],
      ["Production has fallen but labour productivity has risen", "Output has risen."],
      ["Production and labour productivity have both fallen", "Output has risen."],
    ],
    answer: "A",
    explanation: "Output is up 10% but workers are up 20%, so output per worker has fallen.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is most likely to **raise** labour productivity in a clothing factory?",
    options: [
      ["Replacing old sewing machines with faster electric ones", "Correct: better capital raises output per worker."],
      ["Employing more workers on the existing machines", "Raises production, but output per worker may fall."],
      ["Cutting the training given to new workers", "Less training tends to lower productivity."],
      ["Reducing the number of breaks without changing anything else", "Tired workers may produce less per hour."],
    ],
    answer: "A",
    explanation: "Investment in better capital lets each worker produce more.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "How is **marginal product** calculated?",
    options: [
      ["Change in total product when one more worker is employed", "Correct: the extra output of the extra worker."],
      ["Total product divided by the number of workers", "That is average product."],
      ["Total product multiplied by the number of workers", "This has no meaning."],
      ["Total product minus total cost", "That relates to profit, not product."],
    ],
    answer: "A",
    explanation: "MP = TP with n workers − TP with n − 1 workers. AP = TP ÷ workers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "With a fixed area of land, a farmer finds that the 5th worker adds fewer crates than the 4th. What does this show?",
    options: [
      ["Diminishing returns to labour have set in", "Correct: MP is falling."],
      ["Total product has started to fall", "TP still rises while MP is positive."],
      ["Average product must now be negative", "AP cannot be negative when TP is positive."],
      ["The farmer should employ more workers to raise MP", "More workers on fixed land will reduce MP further."],
    ],
    answer: "A",
    hints: ["What happens to each extra worker's output when land is fixed?"],
    explanation: "When MP falls as workers are added to a fixed factor, diminishing returns have set in; TP still rises while MP is positive.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can higher labour productivity allow a firm to pay higher wages without raising its prices?",
    options: [
      ["Labour cost per unit can stay the same if output per worker rises as fast as wages", "Correct: unit labour cost = wage ÷ output per worker."],
      ["Higher productivity always reduces the number of workers to zero", "Productivity gains do not eliminate all workers."],
      ["Higher wages automatically raise productivity by the same amount", "Wages and productivity are not automatically linked."],
      ["Productivity has no effect on a firm's costs", "Productivity directly affects unit costs."],
    ],
    answer: "A",
    hints: ["Labour cost per unit = wage per worker ÷ output per worker."],
    explanation: "If wages rise by 10% and output per worker rises by 10%, labour cost per unit is unchanged.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION", applies: CAM,
    stem: "A government wants to raise productivity across the economy in the long run. Which policy is most likely to do this?",
    options: [
      ["Spending more on education and vocational training", "Correct: raises the quality of labour (human capital)."],
      ["Raising the tax on new machinery", "This discourages investment."],
      ["Cutting spending on roads and electricity", "Poor infrastructure lowers productivity."],
      ["Encouraging firms to hire more unskilled workers", "This may raise production, not productivity."],
    ],
    answer: "A",
    hints: ["Which policy improves the quality of a factor of production?"],
    explanation: "Education and training raise workers' skills and so output per worker; better infrastructure and incentives to invest also help.",
  });
  // Two firms (different from the lesson).
  const F = { out: 2880, w: 12 }, G = { out: 3500, w: 20 };
  const pF = F.out / F.w, pG = G.out / G.w;
  check("pF", pF, 240);
  check("pG", pG, 175);
  const tF = table(["Bakery", "Loaves per day", "Workers"], [["Bakery F", F.out, F.w], ["Bakery G", G.out, G.w]]);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: pF, daily: true,
    stem: `The table shows two fictional bakeries in Gweru.\n\n${tF}\n\nCalculate the labour productivity of Bakery F in loaves per worker per day.`,
    wrong: [F.out * F.w],
    explanation: `${F.out} ÷ ${F.w} = **${pF}** loaves per worker per day. Multiplying instead of dividing gives a meaningless figure.`,
  });
  const Rb = { out: 3150, w: 14 }, Sb = { out: 4140, w: 23 };
  const pR = Rb.out / Rb.w, pS = Sb.out / Sb.w;
  check("pR", pR, 225);
  check("pS", pS, 180);
  const tRS = table(["Dairy", "Litres of yoghurt per day", "Workers"], [["Dairy R", Rb.out, Rb.w], ["Dairy S", Sb.out, Sb.w]]);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: pR - pS,
    stem: `The table shows two fictional dairies.\n\n${tRS}\n\nDairy S produces more yoghurt. By how many litres per worker per day does Dairy R's labour productivity exceed Dairy S's?`,
    wrong: [Sb.out - Rb.out],
    hints: ["Find output per worker for each dairy first."],
    explanation: `1. Dairy R: ${fmt(Rb.out)} ÷ ${Rb.w} = ${pR} litres per worker.\n2. Dairy S: ${fmt(Sb.out)} ÷ ${Sb.w} = ${pS} litres per worker.\n3. Difference: ${pR} − ${pS} = **${pR - pS}** litres per worker per day.\n4. S has higher production (${fmt(Sb.out)} litres) but lower productivity. ${Sb.out - Rb.out} is the difference in total output, not in productivity.`,
  });
  // TP table (ZIMSEC).
  const workers = [1, 2, 3, 4, 5, 6], tp = [15, 40, 72, 100, 114, 118];
  const T0 = productivity.table({ workers, tp });
  const tTP0 = table(["Workers", "Total product (bags per week)"], workers.map((w, i) => [w, tp[i]]));
  const mp4 = T0.rows[3].mp;
  check("mp4", mp4, 28);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: mp4, daily: true, applies: ZIM,
    stem: `A fictional groundnut farm has a fixed area of land.\n\n${tTP0}\n\nCalculate the marginal product of the 4th worker.`,
    wrong: [tp[3] / 4, tp[3]],
    explanation: `MP = TP(4) − TP(3) = ${tp[3]} − ${tp[2]} = **${mp4}** bags. ${tp[3]} ÷ 4 = ${tp[3] / 4} is the average product, a different measure.`,
  });
  const tpA = { four: 76, five: 93 };
  const ap5 = tpA.five / 5;
  check("ap5", ap5, 18.6);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: ap5, dp: 1, applies: ZIM,
    stem: `A fictional sawmill produces ${tpA.four} planks a day with 4 workers and ${tpA.five} planks a day with 5 workers. Calculate the average product when 5 workers are employed, to one decimal place.`,
    wrong: [tpA.five - tpA.four],
    explanation: `AP = TP ÷ workers = ${tpA.five} ÷ 5 = **${fmt(ap5, 1)}** planks per worker. ${tpA.five - tpA.four} is the marginal product of the 5th worker (${tpA.five} − ${tpA.four}).`,
  });
  const T = productivity.table({ workers, tp: [12, 30, 51, 68, 80, 86] });
  const tTP = table(["Workers", "Total product (sacks per week)"], workers.map((w, i) => [w, T.rows[i].tp]));
  const peak = T.rows.reduce((best, r) => (r.mp !== null && (best === null || r.mp > best.mp) ? r : best), null);
  check("peak", peak.w, 3);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: peak.w + 1, applies: ZIM,
    stem: `A fictional potato farm has a fixed area of land.\n\n${tTP}\n\nThe marginal product of each worker is the extra output that worker adds. Diminishing returns set in with the first worker whose marginal product is lower than that of the worker before. Which worker is this? Give the worker's number.`,
    wrong: [peak.w, 6],
    hints: ["Work out MP for every worker.", "Find where MP is highest; the next worker is the first with a lower MP."],
    explanation: `1. MP: 1st ${T.rows[0].mp}, 2nd ${T.rows[1].mp}, 3rd ${T.rows[2].mp}, 4th ${T.rows[3].mp}, 5th ${T.rows[4].mp}, 6th ${T.rows[5].mp}.\n2. MP is highest for the 3rd worker (${peak.mp}).\n3. The **4th** worker adds only ${T.rows[3].mp}, less than the 3rd, so diminishing returns set in with the 4th worker.\n4. Answering 3 picks the worker with the highest MP, not the first with a lower one.`,
  });
  const inv = pctChange(160, 200);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: inv, applies: CAM,
    stem: "After a fictional printing firm invests in a new press, output per worker rises from 160 to 200 pages an hour. Calculate the percentage increase in labour productivity, to one decimal place.",
    wrong: [((200 - 160) / 200) * 100, 40],
    hints: ["Change ÷ original × 100."],
    explanation: `(200 − 160) ÷ 160 × 100 = **${fmt(inv, 1)}%**. Dividing by 200 gives ${fmt(((200 - 160) / 200) * 100, 1)}%, the wrong base; 40 is the change in pages, not a percentage.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A firm can increase production without increasing productivity.",
    answer: true,
    explanation: "True. Employing more workers can raise total output even if output per worker stays the same or falls.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "When marginal product is below average product, average product rises.",
    answer: false,
    explanation: "False. When the extra worker adds less than the average, the average falls.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with the influence on productivity it represents.",
    pairs: [
      ["A firm buys computerised cutting machines", "Investment in capital"],
      ["Workers attend a six-week skills course", "Training (human capital)"],
      ["Workers receive a bonus for every extra unit", "Motivation and incentives"],
      ["The national grid becomes more reliable", "Infrastructure"],
    ],
    explanation: "Capital, skills, incentives and infrastructure all affect output per worker.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which investment can raise labour productivity.",
    points: [
      "Investment provides more or better machinery / equipment.",
      "So each worker can produce more in the same time.",
      "Investment in new technology / methods / or in training (human capital).",
      "Reduces waste, errors or breakdowns, raising output per worker.",
    ],
    modelAnswer: "First, investment gives workers more and better machines, so each worker produces more in the same time, for example a faster mill grinds more maize per hour. Second, investment in new technology and in training means fewer mistakes and breakdowns, so less time and material is wasted and output per worker rises.",
    hints: ["Think about what workers work with."],
    explanation: "One mark for each way and one for explaining its effect on output per worker.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, applies: ZIM,
    stem: `A fictional tomato farm near Kariba has a fixed area of land and a fixed amount of equipment. The table shows weekly output as workers are added.\n\n${table(["Workers", "Total product (crates per week)"], [[1, 30], [2, 70], [3, 120], [4, 160], [5, 185], [6, 195]])}`,
    parts: (() => {
      const w = [1, 2, 3, 4, 5, 6], t = [30, 70, 120, 160, 185, 195];
      const R = productivity.table({ workers: w, tp: t }).rows;
      check("ap4", R[3].ap, 40);
      check("mp5", R[4].mp, 25);
      return [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: R[3].ap, stem: "Calculate the average product of 4 workers.", wrong: [R[3].mp], explanation: `160 ÷ 4 = ${R[3].ap} crates per worker.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: R[4].mp, stem: "Calculate the marginal product of the 5th worker.", wrong: [R[4].ap], explanation: `185 − 160 = ${R[4].mp} crates.` }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: 3, stem: "Which worker has the highest marginal product? Give the worker's number.", wrong: [4], explanation: `MP: 30, 40, 50, 40, 25, 10. The 3rd worker adds the most (${R[2].mp} crates).` }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why marginal product eventually falls as more workers are employed on the farm.", points: ["Land and equipment are fixed.", "Each extra worker has less land/equipment to work with.", "Workers get in each other's way / have to wait for tools.", "So each extra worker adds less output: diminishing returns."], modelAnswer: "The land and equipment are fixed, so as more workers are added each has less land and fewer tools to work with. Workers begin to get in each other's way and wait for equipment, so each extra worker adds less to output than the one before. This is diminishing returns." }),
        P.manual({ label: "(e)", marks: 4, stem: "Describe how average product changes as workers are added, and explain its link with marginal product.", points: ["AP rises from 30 to a maximum of 40 (with 3 and with 4 workers).", "Then falls (37 with 5 workers, 32.5 with 6).", "AP rises while MP is above AP.", "AP falls when MP is below AP / MP = AP at the maximum of AP."], modelAnswer: "AP rises from 30 with one worker to a maximum of 40 with three workers, stays at 40 with four, then falls to 37 with five and 32.5 with six. While each extra worker adds more than the current average (MP above AP), AP rises; when the extra worker adds less than the average (MP below AP), AP falls. MP equals AP (40) at the fourth worker, where AP is at its maximum." }),
      ];
    })(),
    explanation: "(a) 40. (b) 25. (c) The 3rd worker. (d) Diminishing returns with fixed factors. (e) AP rises while MP > AP and falls when MP < AP.",
    hints: ["AP = TP ÷ workers; MP = change in TP."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional furniture firm in Bulawayo is deciding whether to buy computer-controlled cutting machines. The machines would raise output per worker but cost a large amount.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Distinguish between production and productivity.", points: ["Production is total output in a period.", "Productivity is output per unit of input, for example per worker."], modelAnswer: "Production is the total output the firm makes in a period; productivity is output per unit of input, such as chairs per worker per week." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the firm should buy the machines.",
        points: [
          "For: higher output per worker lowers the cost per unit.",
          "For: lower prices / better quality makes the firm more competitive, including against imports.",
          "Against: large cost / borrowing and interest; opportunity cost of the funds.",
          "Against: workers need retraining; some jobs may be lost; power cuts may stop machines.",
          "Depends on demand: higher productivity only pays if the extra output can be sold.",
          "Justified conclusion.",
        ],
        hints: ["Will the firm be able to sell the extra output?"],
        modelAnswer: "Buying the machines would raise output per worker, cutting the cost of each item, so the firm could lower prices, improve quality and compete better with imported furniture. However, the machines are expensive and may require a loan with interest, the money could be used elsewhere, workers need retraining, some jobs may be lost, and unreliable power could stop production. The investment is worthwhile only if the firm can sell the extra output; if demand is growing, it should buy the machines, perhaps in stages to spread the cost.",
      }),
    ],
    explanation: "(a) Total output versus output per input. (b) Lower unit costs and competitiveness against cost, retraining and demand.",
    hints: ["Weigh costs against benefits."],
  });

  b.card("DEFINITION", "Production", "The total output of goods and services in a period.");
  b.card("DEFINITION", "Productivity", "Output per unit of input in a period; labour productivity = output per worker or per worker-hour.");
  b.card("FORMULA", "Labour productivity", "Total output ÷ number of workers (or worker-hours).");
  b.card("FORMULA", "Average product (AP)", "Total product ÷ number of workers.", null, { applies: ZIM });
  b.card("FORMULA", "Marginal product (MP)", "TP with n workers − TP with (n − 1) workers.", null, { applies: ZIM });
  b.card("CONCEPT", "Diminishing returns", "When more workers are added to a fixed factor, each extra worker eventually adds less output than the one before.", null, { applies: ZIM });
  b.card("CONCEPT", "Influences on productivity", "Capital, skills and training, motivation, technology, management, health, quality of land and infrastructure.");
  b.card("FACT", "How does investment affect productivity?", "It gives workers more and better capital, so output per worker rises; it also raises productive capacity.");
  b.card("CONCEPT", "Why does productivity matter?", "Lower unit costs and higher profits for firms, scope for higher wages, competitive exports, and higher living standards.");
});
