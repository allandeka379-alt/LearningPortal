// W2b: econ.labour.division-of-labour — specialisation and the division of labour: meaning, examples, pros and cons.
import { concept, P, table, pctChange, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.labour.division-of-labour", { file: "labour/division-of-labour", keyPrefix: "labour.division-of-labour" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **division of labour**?",
    options: [
      ["Breaking production into separate tasks, each done by different workers", "Correct: specialisation by workers within a process."],
      ["Sharing a firm's profit equally among its workers", "That is profit sharing."],
      ["Dividing the labour force into employed and unemployed people for statistics", "That describes the labour force, not the division of labour."],
      ["Replacing workers with machines on a production line", "That is mechanisation or automation."],
    ],
    answer: "A",
    explanation: "The division of labour splits a production process into tasks so that each worker concentrates on one of them.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of the division of labour **at school**?",
    options: [
      ["Different teachers teach different subjects", "Correct: each teacher specialises in one subject."],
      ["Every pupil studies the same set of subjects", "This is a common curriculum, not specialisation of work."],
      ["The school buys exercise books in bulk", "Bulk buying is an economy of scale."],
      ["Pupils sit their examinations in the school hall", "This is not a division of tasks."],
    ],
    answer: "A",
    explanation: "Subject teachers, the bursar and the groundsmen each concentrate on one kind of work.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the division of labour usually raise output per worker?",
    options: [
      ["Workers become quicker at one task through repetition", "Correct: repetition builds skill and speed."],
      ["Workers are paid more for each task they do", "Pay is not the reason output rises."],
      ["Workers learn every stage of making the product", "That is the opposite of the division of labour."],
      ["Workers take longer breaks between tasks", "Longer breaks would reduce output."],
    ],
    answer: "A",
    explanation: "Repetition builds skill and speed, no time is lost changing tasks, and specialised machines can be used for each simple task.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of the division of labour for workers?",
    options: [
      ["Doing one task all day can be boring and tiring", "Correct: monotony lowers morale."],
      ["Training for each task takes longer", "Training is usually shorter, since each worker learns one task."],
      ["Firms need fewer machines on the production line", "More specialised machines can be used, and this is not a cost to workers."],
      ["Products become more expensive for consumers", "Prices usually fall as costs fall."],
    ],
    answer: "A",
    explanation: "Repetition causes boredom, loss of craft skill and narrow skills that make changing jobs harder.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "On a fictional bottling line, the worker who fits caps is absent and the line stops. Which disadvantage of the division of labour does this show?",
    options: [
      ["Interdependence between the stages of production", "Correct: every stage relies on the others."],
      ["Loss of craftsmanship among workers", "Craft skill is not the issue here."],
      ["Standardisation of the product", "Standard products are not why the line stopped."],
      ["Lower occupational mobility of specialised workers", "This affects workers who lose jobs, not the stoppage."],
    ],
    answer: "A",
    hints: ["What happens to the other stages when one stops?"],
    explanation: "Because each worker does only one part, the absence of one worker can halt the whole process.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a tailor in a small village usually do every task herself?",
    options: [
      ["The market is too small to make dividing the work worthwhile", "Correct: the size of the market limits the division of labour."],
      ["Village tailors are not allowed to employ assistants", "There is no such rule."],
      ["Tailoring cannot be broken into separate tasks", "Cutting, sewing and finishing can be separated, as in factories."],
      ["Doing every task herself gives the lowest cost per garment", "Specialisation usually lowers cost when output is large."],
    ],
    answer: "A",
    hints: ["How many garments does she sell?"],
    explanation: "With few customers there is not enough work to keep several specialised workers busy, so the division of labour is limited by the size of the market.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A region's economy depends almost entirely on one mineral. What is the main risk of this specialisation?",
    options: [
      ["A fall in the world price of the mineral would sharply cut the region's income", "Correct: heavy specialisation increases vulnerability."],
      ["Workers in the region slowly become less skilled at mining and other work over time", "Specialisation tends to raise mining skills."],
      ["The region cannot trade with other regions", "Specialisation increases trade."],
      ["Output per worker in mining falls as the region specialises", "Specialisation tends to raise output per worker."],
    ],
    answer: "A",
    hints: ["What happens if demand for the single product falls?"],
    explanation: "A region or country that specialises heavily is exposed to falls in demand or price for its main product.",
  });
  // Output data (different from the lesson).
  const w = 6, before = 42, after = 63;
  const pcB = before / w, pcA = after / w, g = pctChange(before, after);
  check("pcB", pcB, 7);
  check("g", g, 50);
  const tO = table(["Method", "Workers", "Pairs of sandals per day"], [["Each worker makes whole pairs", w, before], ["Division of labour", w, after]]);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: pcA, dp: 1, daily: true,
    stem: `A fictional sandal workshop changes its method of production.\n\n${tO}\n\nCalculate output per worker per day after the division of labour (to one decimal place).`,
    wrong: [after - before],
    explanation: `${after} ÷ ${w} = **${fmt(pcA, 1)}** pairs per worker per day. ${after - before} is the rise in total output, not output per worker.`,
  });
  const b0 = 56, b1 = 77, gB = pctChange(b0, b1);
  check("gB", gB, 37.5);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: gB,
    stem: `A fictional basket-weaving co-operative in Binga divides its work into separate tasks. Its output rises from ${b0} to ${b1} baskets a day with the same workers. Calculate the percentage increase in output. Give your answer to one decimal place.`,
    wrong: [((b1 - b0) / b1) * 100, b1 - b0],
    hints: ["Change ÷ original output × 100."],
    explanation: `(${b1} − ${b0}) ÷ ${b0} × 100 = **${fmt(gB, 1)}%**. Dividing by the new output (${b1}) gives ${fmt(((b1 - b0) / b1) * 100, 1)}%, the wrong base; ${b1 - b0} is the change in baskets, not a percentage.`,
  });
  const nW = 5, wage = 9, o0 = 35, o1 = 56;
  const cB = (nW * wage) / o0, cA = (nW * wage) / o1;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: cB - cA, calculator: true,
    stem: `A fictional workshop employs ${nW} leather workers, each paid US\\$${wage} a day. When each worker made whole belts, the workshop made ${o0} belts a day; after introducing the division of labour it makes ${o1} belts a day. Calculate the fall in the wage cost per belt. Give your answer in dollars to the nearest cent.`,
    wrong: [cA, cB],
    hints: ["Daily wage bill = workers × daily wage.", "Wage cost per belt = wage bill ÷ belts produced, before and after."],
    explanation: `1. Daily wage bill: ${nW} × ${wage} = US\\$${nW * wage} under both methods.\n2. Before: ${nW * wage} ÷ ${o0} = US\\$${fmt(cB, 2)} a belt.\n3. After: ${nW * wage} ÷ ${o1} = US\\$${fmt(cA, 2)} a belt.\n4. Fall: ${fmt(cB, 4)} − ${fmt(cA, 4)} = **US\\$${fmt(cB - cA, 2)}** a belt (about 48 cents).\n5. Giving the new cost (US\\$${fmt(cA, 2)}) or the old cost (US\\$${fmt(cB, 2)}) answers a different question.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Specialisation can take place between countries as well as between workers.",
    answer: true,
    explanation: "True. Individuals, firms, regions and countries can all specialise.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The division of labour increases the occupational mobility of workers because they learn many skills.",
    answer: false,
    explanation: "False. Workers learn one narrow task, so their skills are less transferable and occupational mobility tends to fall.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of the division of labour with the group it mainly affects.",
    pairs: [
      ["Lower prices and more goods available", "Consumers"],
      ["Boredom from repeating one task", "Workers"],
      ["Lower cost per unit of output", "Firms"],
      ["Higher total output and living standards", "The economy as a whole"],
    ],
    explanation: "Consumers gain lower prices; workers may suffer monotony; firms gain lower unit costs; the economy gains higher output.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Under the division of labour each worker repeats one task, so training time is {{blank:a}}, output per worker {{blank:b}}, and it becomes worthwhile to use {{blank:c}} machinery.",
    blanks: [
      { id: "a", accepted: ["shorter"], choices: ["shorter", "longer"] },
      { id: "b", accepted: ["rises"], choices: ["rises", "falls"] },
      { id: "c", accepted: ["specialised"], choices: ["specialised", "less"] },
    ],
    wrong: [["longer", "falls", "less"]],
    explanation: "One task needs less training, repetition raises productivity, and simple repeated tasks can be mechanised.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of the division of labour for a firm.",
    points: [
      "Identifies higher output per worker / productivity.",
      "Explains: repetition makes workers faster and more skilled, so more is produced from the same labour.",
      "Identifies lower cost per unit / use of specialised machinery / less time wasted / shorter training.",
      "Explains the effect: costs are spread over more units, so the firm can cut prices or earn more profit.",
    ],
    modelAnswer: "First, output per worker rises, because each worker repeats one task and becomes quick and skilled at it, and no time is lost moving between tasks. Second, the cost per unit falls: the same wage bill is spread over more output and simple tasks can be done with specialised machines, so the firm can lower its prices or increase its profit.",
    hints: ["Link each advantage to output or costs."],
    explanation: "One mark for each advantage and one for explaining it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the division of labour can increase the risk of unemployment for a worker.",
    points: [
      "The worker learns only one narrow task.",
      "Simple repeated tasks are easy to replace with machines.",
      "If the task or the firm disappears, the narrow skill is of little use elsewhere.",
      "So occupational mobility is low and the worker may remain unemployed (structural unemployment).",
    ],
    modelAnswer: "Under the division of labour a worker repeats one narrow task. Such simple tasks are easy for firms to mechanise, so the job may be replaced by a machine. If that happens, or the firm closes, the worker's skill is of little use in other jobs, so occupational mobility is low and the worker may stay unemployed for a long time.",
    hints: ["Think about machines and about transferable skills."],
    explanation: "A chain from narrow skills to mechanisation and low occupational mobility.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "Nyasha owns a small bakery in Chinhoyi with four workers. Each worker mixes, bakes and packs his or her own batches of bread. Nyasha is considering giving each worker one task only: mixing, baking, packing or delivery.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "State the term for giving each worker one task only.",
        accepted: ["division of labour", "the division of labour", "specialisation", "specialization"],
        model: "division of labour",
        wrong: ["mechanisation"],
        explanation: "This is the division of labour (specialisation by workers).",
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** ways in which the change could benefit the bakery.", points: ["Workers become quicker / more skilled at one task.", "So output per worker rises and the cost per loaf falls.", "No time lost moving between tasks / a specialised mixer or oven can be kept in constant use.", "So more bread is produced each day with the same workers."], modelAnswer: "Each worker would become quicker and more skilled at one task, so output per worker would rise and the cost of each loaf would fall. No time would be lost moving between mixing, baking and packing, and the mixer and oven could be kept in constant use, so more bread would be produced each day with the same four workers." }),
      P.manual({
        label: "(c)", marks: 7, levels: LV(7),
        stem: "Discuss whether Nyasha should introduce the change.",
        points: [
          "For: higher output and lower cost per loaf, so more profit or lower prices.",
          "For: shorter training for new staff.",
          "Against: workers may become bored, lowering morale and quality.",
          "Against: interdependence — if the baker is absent, no bread is produced.",
          "Against: with only four workers and a small market, the gains may be small.",
          "Could train each worker in two tasks / rotate jobs to reduce the risks.",
          "Justified conclusion depending on demand for bread and the reliability of staff.",
        ],
        hints: ["Is demand large enough? What if one worker is absent?"],
        modelAnswer: "The change should raise output and lower the cost of each loaf, as workers become faster and the equipment is used continuously, so Nyasha could earn more profit or cut prices; new workers would also be quicker to train. However, repeating one task may bore workers and reduce the care they take, and if the only baker is sick no bread is made, because each stage depends on the others. In a small bakery the market may also be too small to use the extra output. Nyasha should introduce the change if she can sell more bread, but rotate tasks or train each worker in a second task so that the bakery does not stop when someone is absent.",
      }),
    ],
    explanation: "(a) Division of labour. (b) Skill/speed and less wasted time. (c) Higher output and lower costs against boredom, interdependence and a small market.",
    hints: ["Use the context of a small bakery."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: "In a fictional country, a car-assembly firm divides work into 40 separate tasks on a production line. Workers say the work is repetitive; managers point to high output and low costs.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define specialisation.", points: ["Concentrating on a limited range of goods, services or tasks.", "Instead of producing everything / doing every task oneself (by workers, firms, regions or countries)."], modelAnswer: "Specialisation means concentrating on producing a limited range of goods or services, or on one task, instead of trying to produce everything." }),
      P.manual({ label: "(b)", marks: 6, stem: "Analyse the effects of the division of labour on the workers in this firm.", points: ["Workers become skilled and quick at one task.", "So their output is high, which may support higher wages or bonuses.", "But repetition causes boredom / monotony.", "Leading to low morale, mistakes or absence.", "Narrow skills reduce occupational mobility.", "So if the line is automated or the firm closes, workers may struggle to find other work."], modelAnswer: "Each worker becomes quick and skilled at one task, so output per worker is high, which may support higher wages or bonuses. However, repeating one of 40 small tasks all day is monotonous, which can lower morale and lead to mistakes and absence. The skills learned are narrow, so occupational mobility is low: if the line is automated or the firm closes, the workers may find it hard to get other jobs." }),
    ],
    explanation: "(a) Concentrating on a limited range of products or tasks. (b) Skill and productivity against boredom and narrow skills.",
    hints: ["Give both good and bad effects on workers."],
  });

  b.card("DEFINITION", "Specialisation", "Concentrating on producing a limited range of goods, services or tasks instead of producing everything.");
  b.card("DEFINITION", "Division of labour", "Breaking a production process into separate tasks, each done by a different worker or group of workers.");
  b.card("CONCEPT", "Advantages of the division of labour", "Skill and speed through repetition, less time wasted, shorter training, use of specialised machinery, higher output, lower unit costs and prices.");
  b.card("CONCEPT", "Disadvantages of the division of labour", "Boredom, loss of craft skill, narrow skills (low occupational mobility), risk of replacement by machines, interdependence, standardised products.");
  b.card("FACT", "What limits the division of labour?", "The size of the market, the nature of the product and the capital available.");
  b.card("DEFINITION", "Interdependence", "Relying on others because each worker, firm or country produces only part of what is needed; one stoppage can halt the whole process.");
  b.card("CONCEPT", "Examples of division of labour", "Home: cooking, cleaning, fetching water shared out. School: subject teachers, bursar. Industry: assembly lines, bakeries, clothing workshops.");
  b.card("FACT", "Why does the division of labour lower cost per unit?", "Output per worker rises, so the same wage bill is spread over more units.");
});
