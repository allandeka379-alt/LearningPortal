// W3b: econ.macro.supply-side-policy (Cambridge only) — definition, measures, effects on the macroeconomic aims,
// limitations. Figures differ from the lesson's worked examples.
import { concept, P, table, productivity, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.macro.supply-side-policy", { file: "macro/supply-side-policy", keyPrefix: "macro.supply-side-policy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Supply-side policy aims mainly to",
    options: [
      ["increase the productive capacity of the economy.", "Correct: it improves the quantity, quality and efficiency of resources."],
      ["reduce aggregate demand to lower inflation quickly.", "That is contractionary fiscal or monetary policy."],
      ["increase the money supply to raise spending.", "That is expansionary monetary policy."],
      ["raise import tariffs to protect domestic firms.", "That is protectionism."],
    ],
    answer: "A",
    explanation: "Supply-side policy raises the economy's capacity to produce.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a supply-side policy measure?",
    options: [
      ["Expanding vocational training colleges", "Correct: better skills raise labour productivity."],
      ["Raising the central bank's interest rate", "This is monetary policy."],
      ["Raising VAT to reduce consumer spending", "This is contractionary fiscal policy aimed at demand."],
      ["Allowing the currency to depreciate", "This is exchange rate (monetary) policy."],
    ],
    answer: "A",
    explanation: "Education and training improve the quality of labour, a supply-side measure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How can government spending on new roads and reliable electricity act as a supply-side policy?",
    options: [
      ["It lowers firms' transport and energy costs, so they can produce more", "Correct: better infrastructure raises productive capacity."],
      ["It raises the price of electricity, so firms produce less", "The aim is lower, not higher, costs."],
      ["It reduces the money supply, so inflation falls", "Infrastructure spending does not reduce the money supply."],
      ["It increases imports of fuel, so the current account improves", "More imports would worsen the current account."],
    ],
    answer: "A",
    explanation: "Infrastructure reduces costs and interruptions, so firms can produce more and invest.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Many unemployed former miners lack the skills needed for jobs in a growing information technology sector. Which policy is most suitable?",
    options: [
      ["Retraining courses in computer skills for the former miners", "Correct: training tackles structural unemployment."],
      ["A cut in interest rates to raise consumer spending", "Extra demand does not give the miners new skills."],
      ["A rise in income tax to reduce inflation", "This does not address the skills mismatch."],
      ["Higher tariffs on imported computers", "This does not train the unemployed miners."],
    ],
    answer: "A",
    explanation: "Structural unemployment is caused by a skills mismatch; retraining is a supply-side remedy.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can supply-side policy help a government achieve economic growth **without** causing inflation?",
    options: [
      ["It raises productive capacity, so output can grow without demand exceeding supply", "Correct: more capacity eases the pressure on prices."],
      ["It reduces aggregate demand, so output falls", "Lower output is not growth."],
      ["It raises interest rates, so saving increases", "That is monetary policy."],
      ["It increases the money supply faster than the growth of output each year", "Money growing faster than output causes inflation."],
    ],
    answer: "A",
    hints: ["Demand-pull inflation happens when spending runs ahead of what can be produced."],
    explanation: "When capacity rises, more output can be supplied as demand grows, so prices need not rise.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Supporters of privatisation as a supply-side measure argue that it",
    options: [
      ["raises efficiency because private owners are driven by profit and competition", "Correct: the profit motive can cut waste."],
      ["always lowers prices, because private firms cannot be monopolies", "A privatised firm can be a private monopoly."],
      ["raises government spending on the industry every year", "Privatisation usually reduces state spending on the firm."],
      ["guarantees that no workers lose their jobs", "Efficiency gains often involve job cuts."],
    ],
    answer: "A",
    hints: ["What motivates private owners?"],
    explanation: "The case for privatisation is that the profit motive and competition improve efficiency; critics point to monopoly power and job losses.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "What is a major limitation of building new technical colleges as a policy to reduce unemployment?",
    options: [
      ["It takes several years before graduates enter the labour market", "Correct: education has a long time lag."],
      ["It reduces the skills of the labour force", "Training raises skills."],
      ["It has no cost to the government", "Building and running colleges is costly."],
      ["It raises interest rates immediately and makes borrowing dearer for firms", "Education spending does not set interest rates."],
    ],
    answer: "A",
    hints: ["How long does a course take?"],
    explanation: "Education and training raise capacity, but only after a time lag, and they cost money.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A fictional economy is in a deep recession because consumer and business confidence has collapsed. Factories are working at half capacity. Why might supply-side policy alone fail to reduce unemployment quickly?",
    options: [
      ["The problem is too little demand, and firms already have spare capacity", "Correct: extra capacity is not used without more spending."],
      ["Supply-side policy always raises unemployment", "In the long run it aims to reduce unemployment."],
      ["Supply-side policy can only be used when inflation is high", "It can be used at any time."],
      ["Spare capacity means firms have too few machines", "Spare capacity means existing machines are not being used."],
    ],
    answer: "A",
    hints: ["Is the economy short of capacity or short of buyers?"],
    explanation: "Cyclical unemployment comes from a lack of demand; raising capacity does not help until demand recovers, so demand-side policy is needed too.",
  });

  // Numericals.
  {
    const w = 32, o0 = 1088, o1 = 1224;
    const p0 = productivity.perWorker(o0, w), p1 = productivity.perWorker(o1, w), ch = pctChange(p0, p1);
    check("p0", p0, 34); check("ch", ch, 12.5);
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: p0, daily: true,
      stem: `A fictional furniture workshop employs ${w} workers who together make ${fmt(o0)} chairs a month. Calculate the output per worker, in chairs per month.`,
      wrong: [w / o0],
      explanation: `Output per worker = ${fmt(o0)} ÷ ${w} = **${p0} chairs** a month.`,
    });
  }
  {
    const w = 30, o0 = 1050, o1 = 1197;
    const p0 = productivity.perWorker(o0, w), p1 = productivity.perWorker(o1, w), ch = pctChange(p0, p1);
    check("p0b", p0, 35); check("chb", ch, 14);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: ch, calculator: true,
      stem: `A fictional bakery in Gweru employs ${w} workers who make ${fmt(o0)} loaves a day. After a government-funded training course, the same ${w} workers make ${fmt(o1)} loaves a day. Calculate the percentage increase in output per worker. Give your answer to one decimal place.`,
      wrong: [((p1 - p0) / p1) * 100, p1 - p0],
      hints: ["Find output per worker before and after.", "Use the 'before' figure as the base."],
      explanation: `1. Before: ${fmt(o0)} ÷ ${w} = ${p0}. After: ${fmt(o1)} ÷ ${w} = ${fmt(p1, 1)}.\n2. Increase = (${fmt(p1, 1)} − ${p0}) ÷ ${p0} × 100 = **${pct(ch, 1)}**.\n3. Using the new figure as the base gives ${pct(((p1 - p0) / p1) * 100, 1)}.`,
    });
  }
  {
    const profit = 360000, t0 = 28, t1 = 22;
    const a0 = profit * (1 - t0 / 100), a1 = profit * (1 - t1 / 100), ch = pctChange(a0, a1);
    check("a0", a0, 259200); check("a1", a1, 280800);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: ch, calculator: true,
      stem: `A fictional firm makes a profit of US\\$${fmt(profit)} a year before tax. The government cuts the corporate tax rate from ${t0}% to ${t1}%. Calculate the percentage increase in the firm's profit after tax. Give your answer to one decimal place.`,
      wrong: [t0 - t1, pctChange(t1, t0), ((a1 - a0) / profit) * 100],
      hints: ["Find profit after tax at each rate.", "Compare the two after-tax figures."],
      explanation: `1. After tax at ${t0}%: ${fmt(profit)} × ${(1 - t0 / 100).toFixed(2)} = US\\$${fmt(a0)}.\n2. After tax at ${t1}%: ${fmt(profit)} × ${(1 - t1 / 100).toFixed(2)} = US\\$${fmt(a1)}.\n3. Increase = (${fmt(a1)} − ${fmt(a0)}) ÷ ${fmt(a0)} × 100 = **${pct(ch, 1)}**.\n4. The ${t0 - t1} percentage-point cut in the rate is not the same as the percentage rise in after-tax profit.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Deregulation means removing or reducing government rules on firms in order to increase competition.",
    answer: true,
    explanation: "True. Deregulation reduces barriers and red tape, encouraging new firms and competition.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Supply-side policies usually reduce unemployment within a few weeks.",
    answer: false,
    explanation: "False. Most supply-side measures, such as education and infrastructure, take years to have their full effect.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each supply-side measure with its main effect.",
    pairs: [
      ["Apprenticeship schemes", "Better skills and higher labour productivity"],
      ["Lower income tax", "Stronger incentive to work"],
      ["Faster business registration", "More new firms and competition"],
      ["Investment allowances for new machinery", "More capital per worker"],
    ],
    explanation: "Each measure improves the quantity, quality or efficiency of the factors of production.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "If supply-side policy raises labour productivity, firms' costs per unit {{blank:a}}, so they can sell at {{blank:b}} prices. Exports become {{blank:c}} competitive and the current account is likely to {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["fall"], choices: ["rise", "fall"] },
      { id: "b", accepted: ["lower"], choices: ["higher", "lower"] },
      { id: "c", accepted: ["more"], choices: ["more", "less"] },
      { id: "d", accepted: ["improve"], choices: ["improve", "worsen"] },
    ],
    wrong: [["rise", "higher", "less", "worsen"]],
    hints: ["More output from the same workers spreads wage costs over more units."],
    explanation: "Higher productivity lowers unit costs and prices, making exports more competitive.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** supply-side measures a government could use to increase economic growth.",
    points: [
      "Identifies a measure, e.g. education and training.",
      "Explains: raises the quality of labour / productivity, so more output from the same workers.",
      "Identifies a second measure, e.g. infrastructure / lower corporate tax / deregulation / privatisation.",
      "Explains: e.g. better roads and power lower costs and raise capacity; lower tax encourages investment.",
    ],
    modelAnswer: "First, the government could spend more on education and training, so that workers become more skilled and productive, producing more output from the same number of workers. Second, it could invest in infrastructure such as roads and reliable electricity, which lowers firms' costs and stops production being interrupted, so firms can produce more and are encouraged to invest.",
    hints: ["Name a measure, then explain how it raises capacity."],
    explanation: "Identify (1) + explain (1) for each measure.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how lower income tax could act as a supply-side policy.",
    points: [
      "Workers keep more of each extra dollar earned (higher take-home pay).",
      "This increases the incentive to work longer hours, seek promotion or join the formal labour force.",
      "Entrepreneurs have more incentive to start businesses.",
      "The quantity of labour and enterprise rises, so productive capacity increases.",
    ],
    modelAnswer: "A cut in income tax means workers keep more of every extra dollar they earn. This raises the reward for working longer hours, accepting promotion or moving from informal to formal work, and for setting up a business. More labour and enterprise are supplied, so the economy's productive capacity increases and output can grow.",
    hints: ["Think about incentives, not just spending."],
    explanation: "Chain: higher reward for work → more labour and enterprise supplied → higher capacity.",
  });

  // Structured 1: a training scheme.
  {
    const firms = [["Firm A (trained workers)", 40, 1400, 1640], ["Firm B (no training)", 40, 1380, 1420]];
    const pA = firms[0].slice(2).map((o) => o / 40), pB = firms[1].slice(2).map((o) => o / 40);
    const chA = pctChange(pA[0], pA[1]), chB = pctChange(pB[0], pB[1]);
    check("pA", pA[0], 35); check("chA", chA, 1640 / 1400 * 100 - 100);
    const T = table(["Firm", "Workers", "Output in 2025 (units per week)", "Output in 2026 (units per week)"], firms);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `In a fictional country the government paid for a technical training course for workers in some engineering firms. The table compares two firms of the same size.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: pA[1], stem: "Calculate output per worker in Firm A in 2026, in units per week.", wrong: [pA[0]], explanation: `1,640 ÷ 40 = ${pA[1]}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: chA, stem: "Calculate the percentage change in output per worker in Firm A between 2025 and 2026. Give your answer to one decimal place.", wrong: [((pA[1] - pA[0]) / pA[1]) * 100], explanation: `${pA[0]} → ${pA[1]}: (${pA[1]} − ${pA[0]}) ÷ ${pA[0]} × 100 = ${pct(chA, 1)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: chB, stem: "Calculate the percentage change in output per worker in Firm B between 2025 and 2026. Give your answer to one decimal place.", wrong: [chA], explanation: `${fmt(pB[0], 1)} → ${fmt(pB[1], 1)}: change = ${pct(chB, 1)}.` }),
        P.manual({
          label: "(d)", marks: 3,
          stem: "Explain how the training could benefit the wider economy, not just Firm A.",
          points: ["Higher productivity lowers unit costs, so prices can fall: less inflationary pressure.", "More competitive firms sell more abroad: exports and the current account improve.", "Higher output and incomes raise growth; trained workers can move to other firms, reducing structural unemployment."],
          modelAnswer: "Higher productivity lowers the cost of each unit, so the firm can hold down or cut prices, which reduces inflationary pressure. Cheaper and better products help firms compete with imports and sell abroad, improving the current account. More output and higher incomes add to economic growth, and the trained workers' skills can be used in other firms, reducing structural unemployment.",
          explanation: "Prices, exports and growth/employment.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government should extend the training scheme to all engineering firms.",
          points: [
            `For: evidence of success: Firm A's productivity rose ${pct(chA, 1)} against ${pct(chB, 1)} in Firm B.`,
            "For: long-run growth, competitiveness and lower unemployment.",
            "Against: cost / opportunity cost; trained workers may leave for other firms or emigrate; results may differ in other firms (other causes of A's rise, e.g. new machines).",
            "Justified conclusion.",
          ],
          modelAnswer: `The evidence is encouraging: output per worker rose by ${pct(chA, 1)} in Firm A but only ${pct(chB, 1)} in Firm B, which suggests the training raised productivity, and extending it could raise growth and competitiveness across the industry. However, the scheme costs the government money that could be used elsewhere, the comparison is of only two firms, and Firm A's rise might partly reflect other changes such as new machines. Some trained workers may also leave for other countries. The government should extend the scheme, but gradually, checking the results in more firms, and perhaps asking firms to share the cost.`,
          explanation: "Use the data as evidence, weigh cost and uncertainty, conclude.",
        }),
      ],
      hints: ["Output per worker = output ÷ workers.", "Use 2025 as the base year."],
      explanation: `Output per worker: Firm A ${pA[0]} → ${pA[1]} (${pct(chA, 1)}); Firm B ${fmt(pB[0], 1)} → ${fmt(pB[1], 1)} (${pct(chB, 1)}).`,
    });
  }
  // Structured 2: deregulation and privatisation.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country's state-owned railway company makes large losses and its trains are often late. The government plans to sell the company to private investors and to allow other private firms to run freight trains on the network.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Allowing other private firms to run freight trains on the network is an example of",
        options: [
          ["deregulation.", "Correct: removing the legal barrier to competition."],
          ["nationalisation.", "Nationalisation moves firms into state ownership."],
          ["expansionary monetary policy.", "This concerns interest rates and money."],
          ["a progressive tax.", "This is unrelated to taxation."],
        ],
        answer: "A",
        explanation: "Removing restrictions on entry to a market is deregulation.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how these plans could increase the productive capacity of the economy.",
        points: ["Private owners seek profit, so they cut waste and invest in better trains and track.", "Competition from new freight operators pushes all firms to improve service and lower prices.", "Cheaper, more reliable freight lowers costs for mines, farms and factories, so they can produce and export more."],
        modelAnswer: "Private owners want to make a profit, so they have an incentive to cut waste and invest in better trains and track. Competition from new freight operators would push them to improve service and keep prices down. Cheaper and more reliable freight lowers transport costs for mines, farms and factories, which can then produce and export more, increasing productive capacity.",
        explanation: "Profit motive, competition, lower costs for other firms.",
      }),
      P.manual({
        label: "(c)", marks: 4, levels: LV(4),
        stem: "Discuss whether privatising the railway is likely to benefit the economy.",
        points: [
          "For: efficiency, investment, lower losses for the government (money for other uses), better service for firms.",
          "Against: private monopoly over the track may raise prices; unprofitable rural lines may close; job losses; safety risks.",
          "Depends on regulation of prices and safety and on genuine competition.",
          "Justified conclusion.",
        ],
        modelAnswer: "Privatisation could make the railway more efficient, because owners seeking profit would cut waste and invest, and the government would no longer have to cover large losses, freeing money for schools or clinics. Firms would benefit from more reliable freight. However, the new owner would control the track and could act as a monopoly, raising prices; unprofitable rural lines might close, and workers could lose their jobs. The benefits are likely if the government sets up a regulator to control prices and safety and makes sure other operators can compete; without that, a private monopoly may simply replace a public one.",
        explanation: "Efficiency and finances versus monopoly power and social costs; conclude.",
      }),
    ],
    hints: ["Who would own the track, and could they abuse that position?"],
    explanation: "Privatisation and deregulation aim to raise efficiency and capacity, but need regulation to prevent monopoly abuse.",
  });

  b.card("DEFINITION", "Define **supply-side policy**.", "Government measures to increase the economy's productive capacity by improving the quantity, quality and efficiency of the factors of production.");
  b.card("CONCEPT", "List five supply-side measures.", "Education and training; infrastructure; labour market reforms; lower direct taxes; deregulation; incentives to invest; privatisation.");
  b.card("DEFINITION", "Define **deregulation**.", "Removing or reducing government rules on firms to increase competition and lower costs.");
  b.card("DEFINITION", "Define **privatisation**.", "Transferring the ownership of firms from the public sector to the private sector.");
  b.card("FORMULA", "Labour productivity = ?", "Total output ÷ number of workers (per period).");
  b.card("CONCEPT", "How can supply-side policy reduce inflation?", "It raises capacity and lowers unit costs, so output can grow without demand exceeding supply.");
  b.card("CONCEPT", "Which type of unemployment does training tackle best?", "Structural unemployment, caused by a mismatch of skills.");
  b.card("CONCEPT", "Give three limitations of supply-side policy.", "Long time lags; high cost; uncertain responses to incentives; may increase inequality; privatisation can create private monopolies.");
});
