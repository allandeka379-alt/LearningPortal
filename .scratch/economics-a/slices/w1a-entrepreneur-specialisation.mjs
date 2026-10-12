// W1a: the entrepreneur, specialisation and the division of labour (both boards; business set-up steps are ZIMSEC detail).
import { concept, P, chk, fmt, table, pctChange, ZIM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.basics.entrepreneur-specialisation", { file: "basics/entrepreneur-specialisation", keyPrefix: "basics.entrepreneur-specialisation" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Which of the following is a function of the entrepreneur?",
    explanation: "The entrepreneur organises the factors of production and bears the risk of loss." },
    ["Bearing the risk of producing without being sure of selling", "Correct: risk-taking is the central function."],
    [["Working for a fixed wage whatever the profit", "That describes a worker."],
     ["Lending money to firms and earning interest on the sums that are lent out", "That is the function of a lender or bank."],
     ["Setting the tax rates that firms must pay", "Tax rates are set by the government."]]);

  mc({ d: 1, skill: "RECALL", daily: false, stem: "What is the reward to the entrepreneur?",
    explanation: "The reward for enterprise is profit (or loss if the business fails)." },
    ["Profit", "Correct."], [["Wages", "The reward to labour."], ["Rent", "The reward to land."], ["Interest", "The reward to capital."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following is the **division of labour**?",
    explanation: "The division of labour splits a production process into separate tasks done by different workers." },
    ["Splitting the making of a good into stages, each done by a different worker", "Correct."],
    [["A country concentrating on producing a limited range of goods for export", "That is international specialisation."],
     ["A worker moving from one region to another to find a job", "That is geographical mobility."],
     ["A firm sharing its profits among its workers", "That is profit sharing."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which is an advantage of the division of labour for a firm?",
    explanation: "Repeating one task builds skill and saves time, raising output per worker." },
    ["Output per worker rises as workers become skilled at one task", "Correct."],
    [["Workers can easily move to other jobs if the firm closes", "Specialised workers find it harder to move."],
     ["Production continues even when one stage of the process stops", "Stages depend on each other: if one stops, the others are affected."],
     ["Workers are never bored because their work is varied", "Repeating one task often causes boredom."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which is a disadvantage of the division of labour?",
    explanation: "Because each stage depends on the others, a problem at one stage can halt the whole production line." },
    ["A breakdown at one stage can stop the whole production process", "Correct: interdependence."],
    [["The cost of producing each unit always rises", "Unit costs usually fall."],
     ["Each worker needs to learn every stage of the process", "Workers learn only their own stage."],
     ["Output per worker normally falls as tasks become simpler", "It normally rises."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which step comes before raising finance?"],
    stem: "Chipo notices that no shop near her school sells printed exercise books. She asks other pupils whether they would buy them, estimates her costs and writes down her plan. Which stage of starting a business does the writing down of her plan show?",
    explanation: "Writing the product, market, costs and finance required is preparing a business proposal (plan)." },
    ["Preparing a business proposal", "Correct: this sets out the product, market, costs and finance."],
    [["Registering the business", "Registration is a legal step done after planning."],
     ["Obtaining a trading licence", "Licensing is a legal requirement, not a plan."],
     ["Dividing the labour", "That is organising production, not starting."]],
  );

  mc({ d: 3, skill: "ANALYSIS", hints: ["Compare output per worker before and after."],
    stem: "A fictional bakery with 5 workers makes 100 loaves a day. After dividing the work into mixing, baking and packing it makes 175 loaves with the same 5 workers. What is the percentage increase in output per worker?",
    explanation: "Output per worker rises from 20 to 35 loaves: (35 − 20) ÷ 20 × 100 = 75%." },
    ["75%", "Correct: 20 to 35 loaves per worker."],
    [["35%", "35 is the new output per worker, not the percentage increase."],
     ["175%", "175 is the new total output."],
     ["43%", "This divides the increase by the new output per worker."]]);

  mc({ d: 3, skill: "EVALUATION", hints: ["What happens to the workers if the machine breaks down?"],
    stem: "A fictional canning factory has 12 workers, each doing one stage of the process. A machine at stage 4 breaks down for two days. What does this show about the division of labour?",
    explanation: "The stages are interdependent, so a failure at one stage stops the others." },
    ["Interdependence: a breakdown at one stage halts the whole line", "Correct."],
    [["Boredom: workers lose interest in repeated tasks", "Boredom is a different disadvantage."],
     ["Lower unit costs: output per worker rises", "A breakdown reduces output."],
     ["Better skills: workers become skilled at one task", "This is an advantage not shown by a breakdown."]]);

  {
    const w = 8, before = 3, after = 8, tot = w * after;
    chk(tot, 64);
    const gain = pctChange(before, after);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: gain, dp: 1, unit: "%",
      stem: "A fictional workshop's output per worker rises from 3 units a day to 8 units a day after it introduces the division of labour. Calculate the percentage increase in output per worker, to one decimal place.",
      wrong: [(8 - 3) / 8 * 100, 5],
      explanation: `(8 − 3) ÷ 3 × 100 = ${fmt(gain, 1)}%. Dividing by the new output (62.5%) uses the wrong base; 5 is the rise in units.` });
  }
  {
    const wage = 12, per = 6, cost = wage / per;
    chk(cost, 2);
    b.calc({ d: 3, skill: "APPLICATION", kind: "money", value: cost, dp: 2,
      stem: "A worker in a fictional factory is paid US\\$12 a day. After the division of labour, each worker makes 6 units a day instead of 2. Calculate the labour cost per unit after the change, in US\\$.",
      wrong: [12 / 2, 12 * 6], hints: ["Labour cost per unit = wage ÷ output per worker."],
      explanation: `1. Wage per day: US\\$12.\n2. Output per worker after the change: 6 units.\n3. Labour cost per unit = 12 ÷ 6 = **US\\$${fmt(cost, 2)}**.\n\nUS\\$6.00 was the cost per unit before the change (12 ÷ 2).` });
  }
  {
    const tot = 9 * 14;
    chk(tot / 9, 14);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: 126, unit: "units", daily: true,
      stem: "A fictional factory employs 9 workers. After the division of labour each worker produces 14 units a day. What is the total daily output?",
      wrong: [14, 23],
      explanation: "Total output = 9 × 14 = 126 units. Adding (23) instead of multiplying is a common error; 14 is the output of one worker." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Profit is the reward for enterprise, and it may be negative.", answer: true,
    explanation: "True. If costs exceed revenue the entrepreneur makes a loss." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A salaried manager who risks none of her own money is an entrepreneur.", answer: false,
    explanation: "False. The entrepreneur bears the risk of loss; a salaried manager is labour." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Entrepreneur", "Organises production and bears the risk"], ["Specialisation", "Concentrating on a limited range of goods or tasks"], ["Division of labour", "Splitting production into separate tasks for different workers"], ["Innovation", "Introducing a new product or method"]],
    explanation: "These four terms are basic to enterprise." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The division of labour raises output per worker because workers become {{blank:a}} at one task. However, it can cause {{blank:b}} because the work is repeated.",
    blanks: [{ id: "a", accepted: ["skilled"], choices: ["skilled", "bored", "unemployed"] }, { id: "b", accepted: ["boredom"], choices: ["boredom", "profit", "innovation"] }],
    wrong: [["bored", "profit"]],
    explanation: "Repetition builds skill but also causes boredom." });

  b.short({ d: 2, skill: "RECALL", stem: "State **one** characteristic of a successful entrepreneur.",
    accepted: [{ value: "willingness to take calculated risks" }, { value: "willingness to take risks" }, { value: "creativity" }, { value: "determination" }, { value: "good organising skills" }, { value: "risk-taking" }, { value: "innovative" }],
    keywords: { any: ["risk", "creative", "determined", "determination", "organis", "innovat", "communicat", "leader", "hard-working", "hard working"], minAny: 1 },
    model: "Willingness to take calculated risks", wrong: ["rich"],
    explanation: "Accept any sensible characteristic: risk-taking, creativity, determination, organising and communication skills, spotting opportunities." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, stem: "Explain **two** functions of an entrepreneur.",
    points: ["Function 1 identified (for example organising the factors of production).", "Function 2 identified (for example risk-taking or innovation).", "At least one function explained (for example the entrepreneur pays for inputs before knowing whether the product will sell)."],
    modelAnswer: "An entrepreneur organises land, labour and capital into production. She also bears the risk of loss, because she pays for inputs before knowing whether the output will sell, and her reward is profit.",
    explanation: "Two functions, one developed." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM, hints: ["Think about planning and legal steps."],
    stem: "A pupil in Gweru wants to start a small business that sells airtime and phone accessories. Explain **two** things she should do before she starts trading.",
    points: ["Prepare a business proposal / plan (product, market, costs, finance).", "Explained: it shows whether the idea is profitable and what finance is required.", "Register the business and obtain any licence or permit needed.", "Explained: trading without it may be illegal and can lead to fines or closure."],
    modelAnswer: "She should write a business proposal setting out her customers, costs, expected sales and the money needed, which shows whether the idea can make a profit and helps her to raise finance. She should also register the business and obtain any trading licence required, because trading without one may be illegal and could lead to fines or closure.",
    explanation: "Credit two steps, each explained." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Link repetition to skill and time."],
    stem: "Analyse how the division of labour can raise output per worker in a fictional shirt factory.",
    points: ["Each worker repeats one task (cutting, sewing or ironing).", "Repetition builds skill and speed.", "No time is lost moving between tasks and tools.", "Output per worker therefore rises, lowering the cost per shirt."],
    modelAnswer: "In the factory each worker repeats one task, such as cutting or sewing. Repetition builds skill and speed, and no time is lost moving between tasks or changing tools. As a result output per worker rises and the cost of each shirt falls.",
    explanation: "A chain from repetition to productivity to cost." });

  // Structured 1.
  {
    const tab = table(["System", "Workers", "Daily output (pairs of trousers)"], [["Each worker makes whole garments", 10, 40], ["Work divided into cutting, sewing and finishing", 10, 110]]);
    const before = 40 / 10, after = 110 / 10, gain = pctChange(before, after);
    chk(before, 4); chk(after, 11); chk(gain, 175);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Output per worker = output ÷ workers."],
      stem: `A fictional tailoring firm in Harare compares two ways of organising the same ten workers (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: after, unit: "units", stem: "Calculate the output per worker when the work is divided.", wrong: [110, 40], explanation: "110 ÷ 10 = 11 pairs per worker." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: gain, dp: 0, unit: "%", stem: "Calculate the percentage increase in output per worker.", wrong: [(110 - 40) / 110 * 100, 7], explanation: "From 4 to 11 pairs per worker: (11 − 4) ÷ 4 × 100 = 175%." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain **one** reason for the increase in output per worker.",
          points: ["Workers repeat one task and become more skilled.", "Time is saved because workers do not change tasks or tools, so more is produced."],
          modelAnswer: "Each worker repeats one task and becomes faster and more skilled, and no time is lost moving between tasks, so more garments are produced per worker." }),
        P.manual({ label: "(d)", marks: 4, stem: "Assess whether the firm should keep the division of labour.",
          points: ["Output and productivity rise considerably and unit costs fall.", "Disadvantages: boredom, interdependence, workers' skills become narrow.", "These can be reduced by rotating workers and training.", "A conclusion supported by the data (for example keep it, because output per worker rises by 175%)."],
          modelAnswer: "The division of labour raises output per worker by 175%, which should reduce the cost of each garment. The costs are boredom, the risk that one stage halts production and narrow skills, but these can be reduced by rotating workers between stages. Given the large gain, the firm should keep it." }),
      ],
      explanation: "4 and 11 pairs per worker; 175% increase; assess the gain against the costs." });
  }

  // Structured 2: entrepreneur.
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Revenue minus costs = profit."],
    stem: "Rudo starts a small business selling roasted maize at a bus terminus in a fictional town. In the first month she spends US\\$180 on maize, charcoal and a licence and earns US\\$260 from sales. She also lost 20 days of her previous wage income of US\\$5 a day.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 80, stem: "Calculate her profit for the month, ignoring the wage income given up, in US\\$.", wrong: [260, 180], explanation: "260 − 180 = US\\$80." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 100, stem: "Calculate the wage income she gave up, in US\\$.", wrong: [5, 20], explanation: "20 days × US\\$5 = US\\$100." }),
      P.manual({ label: "(c)", marks: 3, stem: "Using your answers, explain whether Rudo made an economic gain in her first month.",
        points: ["Profit of US\\$80 before the opportunity cost of her time.", "Opportunity cost of her time is the US\\$100 wages given up.", "80 − 100 = −US\\$20, so she is worse off than before, ignoring non-money benefits."],
        modelAnswer: "Her profit was US\\$80, but she gave up US\\$100 of wages, so after counting the opportunity cost of her time she is US\\$20 worse off. She may still judge the business worthwhile if profits are expected to grow." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain **one** risk that Rudo faces as an entrepreneur.",
        points: ["Risk identified (for example sales may fall in the rainy season or her stock may spoil).", "She pays costs in advance.", "She bears the loss herself, with no guaranteed wage."],
        modelAnswer: "Sales may fall, for example when buses are fewer in the rainy season. Because she pays for maize and charcoal before she sells, she bears any loss herself and has no guaranteed wage." }),
    ],
    explanation: "Profit US\\$80; wages given up US\\$100; the net result is US\\$20 worse off." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both firm and worker."],
    stem: "Evaluate whether the division of labour benefits workers as well as firms.",
    points: ["Firms gain from higher output per worker and lower unit costs.", "Workers can earn more if the firm's productivity gains are shared in higher wages.", "Workers gain skills at their task.", "Boredom, repetitive strain and low motivation may result.", "Narrow skills make it difficult to change jobs.", "Simple tasks are easily replaced by machines, so jobs may be lost.", "The outcome depends on how the gains are shared and on whether workers can rotate or retrain.", "A justified conclusion."],
    levels: LV8,
    modelAnswer: "Firms clearly gain, since output per worker rises and unit costs fall. Workers may benefit if the extra output allows higher wages and cheaper goods, and they develop speed and skill at their tasks. However, repeating one task may be boring and tiring, workers with narrow skills find it hard to change jobs, and simple tasks can easily be taken over by machines, putting jobs at risk. Whether workers gain therefore depends on whether wages rise with productivity and whether the firm trains and rotates its workers. Overall, workers are likely to benefit only when firms share gains and offer varied work.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh benefits of productivity for workers against boredom and job risk." });

  b.card("DEFINITION", "Define an **entrepreneur**.", "A person who organises the other factors of production, takes the risk of producing and often introduces new ideas.");
  b.card("CONCEPT", "What is the reward to enterprise?", "Profit, which may be negative (a loss) if the business fails.");
  b.card("DEFINITION", "Define **specialisation**.", "Concentrating on a limited range of goods or services, by individuals, firms, regions or countries, and trading for the rest.");
  b.card("DEFINITION", "Define the **division of labour**.", "Dividing a production process into separate tasks, each done by a different worker.");
  b.card("CONCEPT", "Give **three** advantages of the division of labour.", "Higher output per worker through skill; time saved; use of machines; lower unit costs.");
  b.card("CONCEPT", "Give **three** disadvantages of the division of labour.", "Boredom; interdependence of stages; narrow skills and low flexibility; possible job loss to machines.");
  b.card("FORMULA", "**Output per worker**", "Total output ÷ number of workers.");
  b.card("CONCEPT", "What steps lead from an idea to a business?", "Generate and test the idea, write a business proposal, raise finance, then register and obtain licences.", "ZIMSEC detail.", { applies: ZIM });
});
