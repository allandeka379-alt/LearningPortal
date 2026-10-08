// W2a: econ.unemployment.job-creation (ZIMSEC only) — trends in Zimbabwe, informal sector, enterprise, indigenisation,
// planning a small income-generating project. Figures differ from the lesson's worked examples; prices are invented.
import { concept, P, table, money, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.unemployment.job-creation", { file: "unemployment/job-creation", keyPrefix: "unemployment.job-creation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which activity is part of the **informal sector**?",
    options: [
      ["An unregistered vendor selling vegetables at a bus terminus", "Correct: small-scale, unregistered and unregulated."],
      ["A teacher employed by the government at a rural school", "Government employment is formal."],
      ["A clerk working at a registered commercial bank in Harare", "Banks are registered and regulated: formal sector."],
      ["An engineer employed by a large registered mining company", "Large registered firms are in the formal sector."],
    ],
    answer: "A",
    explanation: "The informal sector consists of small activities that are not registered or fully regulated.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main aim of **indigenisation** policy?",
    options: [
      ["To increase the share of businesses owned by local citizens", "Correct: wider local ownership and control."],
      ["To increase imports of consumer goods", "Indigenisation is about ownership, not imports."],
      ["To replace the national currency with foreign currency", "That is a monetary change, not indigenisation."],
      ["To reduce the number of small businesses", "It aims to empower local business owners, not to reduce them."],
    ],
    answer: "A",
    explanation: "Indigenisation aims to increase ownership and control of businesses and resources by indigenous citizens.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **problem** of the informal sector for the government?",
    options: [
      ["Little tax is collected from informal businesses", "Correct: unregistered activity pays little tax."],
      ["It creates no jobs at all", "It creates many jobs, though often poorly paid."],
      ["It always charges higher prices than formal shops", "Informal traders often sell more cheaply."],
      ["It needs large amounts of capital to start", "It is easy to enter with little capital."],
    ],
    answer: "A",
    explanation: "Because informal firms are unregistered, they pay little income tax, which limits government revenue.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a successful new carpentry business in Gweru reduce unemployment **indirectly**?",
    options: [
      ["It buys timber and transport from local firms, which hire more", "Correct: linkages create jobs in supplying firms."],
      ["Its owner, who was unemployed, now works in the business", "This is a direct effect, not an indirect one."],
      ["It pays wages each month to the workers it has hired", "Employing workers is a direct effect."],
      ["It registers with the council and pays a yearly licence fee", "Registration does not by itself create jobs."],
    ],
    answer: "A",
    explanation: "Enterprise creates jobs directly (self-employment, hiring) and indirectly through purchases from suppliers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reason best explains why the official unemployment rate in a country with a large informal sector may understate joblessness?",
    options: [
      ["People with a few hours of informal work are counted as employed", "Correct: underemployment is hidden in the employed figure."],
      ["Informal workers are always counted as unemployed in the survey", "They are counted as employed if they did paid work."],
      ["Labour force surveys never visit households in rural areas", "Surveys sample rural as well as urban households."],
      ["Emigrants working abroad are counted as unemployed at home", "Emigrants are no longer in the country's labour force."],
    ],
    answer: "A",
    hints: ["How is someone with a little informal work classified?"],
    explanation: "Many informal workers are underemployed but counted as employed, so measured unemployment looks lower than true joblessness.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many skilled Zimbabweans have emigrated to work abroad. Which is a **benefit** of this for the economy?",
    options: [
      ["Remittances sent home support families' spending", "Correct: money sent home raises incomes and demand."],
      ["The country gains the skills of the emigrants", "The country loses their skills: a brain drain."],
      ["Firms find it easier to recruit skilled workers", "Emigration makes skilled workers scarcer."],
      ["Tax revenue from their incomes rises", "Their incomes are earned and taxed abroad."],
    ],
    answer: "A",
    hints: ["What do emigrants often send back to their families?"],
    explanation: "Remittances support household spending, although the country loses skills.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which form of indigenisation policy is **most** likely to create new jobs?",
    options: [
      ["Training and loans that help local people start and expand new businesses", "Correct: new firms add jobs."],
      ["Transferring shares in an existing firm to local owners, with no new investment", "A change of owner does not by itself add jobs."],
      ["Frequent changes to ownership rules for foreign investors", "Uncertainty discourages investment and job creation."],
      ["Limiting the number of trading licences for local vendors", "This restricts enterprise rather than encouraging it."],
    ],
    answer: "A",
    hints: ["Does a change of owner create jobs?"],
    explanation: "Policies that build new local businesses add jobs; transferring ownership of existing firms mainly changes who owns them.",
  });

  // Project numericals (invented prices).
  const trays = 60, costTray = 2.5, price = 4, fixed = 45;
  const cost = trays * costTray + fixed, rev = trays * price, profit = rev - cost;
  check("profit", profit, 45);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: profit, daily: true,
    stem: `Tendai grows tomato seedlings. In one month he sells ${trays} trays at US\\$${price} each. Each tray costs him US\\$${costTray.toFixed(2)} in seed, soil and water, and he pays US\\$${fixed} for a shade net and tools. What is his profit for the month?`,
    wrong: [rev - trays * costTray, rev],
    explanation: `Revenue = ${trays} × ${price} = ${money(rev)}. Costs = ${trays} × ${costTray.toFixed(2)} + ${fixed} = ${money(cost)}. Profit = ${fmt(rev)} − ${fmt(cost)} = **${money(profit)}**. Forgetting the shade net gives ${money(rev - trays * costTray)}.`,
  });
  const fc = 180, vc = 1.2, p = 3;
  const be = fc / (p - vc);
  check("be", be, 100);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "plain", value: be,
    stem: `A youth group plans to bake and sell loaves of bread. Equipment costs US\\$${fc}. Each loaf costs US\\$${vc.toFixed(2)} in ingredients and fuel and sells for US\\$${p}. How many loaves must the group sell to cover all its costs (break even)?`,
    wrong: [fc / p, fc / vc],
    hints: ["Each loaf contributes the selling price minus its own cost towards the equipment."],
    explanation: `1. Each loaf contributes ${p} − ${vc.toFixed(2)} = US\\$${(p - vc).toFixed(2)} towards the equipment.\n2. Loaves needed = ${fc} ÷ ${(p - vc).toFixed(2)} = **${be}**.\n3. Dividing by the price alone (${fc} ÷ ${p} = ${fc / p}) ignores the cost of each loaf.`,
  });
  const members = 6, startCapital = 1500;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: startCapital / members,
    stem: `Six members of a group project need US\\$${fmt(startCapital)} of start-up capital and agree to share it equally. How much must each member contribute?`,
    wrong: [startCapital * members],
    explanation: `${fmt(startCapital)} ÷ ${members} = **${money(startCapital / members)}** each.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The informal sector is easy to enter because little capital and few qualifications are needed.",
    answer: true,
    explanation: "True. Low entry barriers are why many unemployed people turn to informal work.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Transferring the ownership of an existing firm to local citizens always increases the number of jobs.",
    answer: false,
    explanation: "False. A change of owner does not by itself create jobs; jobs grow only if the firm expands or new firms start.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a project plan with the question it answers.",
    pairs: [
      ["Market research", "Who will buy the product and how many?"],
      ["Sources of capital", "Where will the money to start come from?"],
      ["Costing", "How much will materials, equipment and transport cost?"],
      ["Risk assessment", "What could go wrong and how can it be reduced?"],
    ],
    explanation: "A complete plan covers demand, finance, costs and risks (as well as price, revenue and profit).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "During the economic crisis of the 2000s, formal employment in Zimbabwe {{blank:a}}, and the share of people working in the {{blank:b}} sector grew.",
    blanks: [
      { id: "a", accepted: ["fell"], choices: ["fell", "rose"] },
      { id: "b", accepted: ["informal"], choices: ["informal", "formal"] },
    ],
    wrong: [["rose", "formal"]],
    explanation: "Factory closures cut formal jobs, and many people moved into informal work.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which the government could support enterprise to reduce unemployment.",
    points: [
      "Identifies access to credit (microfinance, youth or women's funds, low-interest loans).",
      "Explains that lack of capital stops people starting businesses / allows firms to expand and hire.",
      "Identifies training in business skills or provision of workspace / simpler registration.",
      "Explains how this raises the survival and growth of small firms, so more jobs.",
    ],
    modelAnswer: "First, the government could provide cheap loans through microfinance or youth funds, because lack of capital is the main barrier to starting a business, and with credit firms can buy equipment and hire workers. Second, it could offer business training and market stalls or workshops, so that new firms are better managed, survive longer and grow, creating more jobs.",
    hints: ["What stops unemployed people starting businesses?"],
    explanation: "Identify (1) + explain (1) for each way.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** limits of relying on the informal sector to reduce unemployment.",
    points: [
      "Identifies low and irregular incomes / underemployment.",
      "Explains that people are counted as working but remain poor; living standards stay low.",
      "Identifies no social protection / little tax revenue / small, unproductive firms.",
      "Explains the effect (no pensions or sick pay; government cannot fund services; firms cannot get loans to grow).",
    ],
    modelAnswer: "First, informal work often gives low and irregular incomes, so many people are underemployed: they are counted as working but remain poor. Second, informal businesses pay little tax and have no pensions or sick pay, so workers are unprotected and the government has less revenue for services; they also struggle to get loans, so they stay small and create few extra jobs.",
    hints: ["Think about the quality of the jobs and the effects on government."],
    explanation: "Identify (1) + explain (1) for each limit.",
  });

  // Structured 1: plan a project (stimulus with invented costs).
  const items = [["Fertiliser and seed", 140], ["Hire of a water pump", 90], ["Fencing", 70], ["Transport to market", 40]];
  const total = items.reduce((s, x) => s + x[1], 0);
  const bags = 120, bagPrice = 3.5, rev2 = bags * bagPrice, prof2 = rev2 - total;
  check("total", total, 340); check("rev2", rev2, 420); check("prof2", prof2, 80);
  const T = table(["Item", "Cost (US\\$)"], [...items, ["Total", total]]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 12,
    stem: `Rudo and three friends in Chinhoyi plan a garden project to grow and sell leafy vegetables during the dry season, using water from a nearby borehole. Their estimated costs for one season are shown below (invented prices). They expect to sell ${bags} bags of vegetables at US\\$${bagPrice.toFixed(2)} per bag.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: rev2, stem: "Calculate the expected revenue for the season.", wrong: [bags * bagPrice * 4], explanation: `${bags} × ${bagPrice.toFixed(2)} = ${money(rev2)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: prof2, stem: "Calculate the expected profit for the season.", wrong: [rev2 - (total - items[3][1])], explanation: `${fmt(rev2)} − ${total} = ${money(prof2)}.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: prof2 / 4, stem: "If the profit is shared equally among the four friends, how much does each receive?", wrong: [prof2], explanation: `${prof2} ÷ 4 = ${money(prof2 / 4)}.` }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Identify **two** risks the project faces and suggest how each could be reduced.",
        points: ["Identifies one risk (e.g. borehole or pump failure, pests, theft, fall in price, too many sellers).", "Suggests a realistic way to reduce it.", "Identifies a second risk.", "Suggests a realistic way to reduce it."],
        modelAnswer: "The borehole may dry up or the pump may break down, so the group could store water in drums and keep money aside for repairs. Pests could damage the crop, so they could rotate crops and use approved sprays. (Other risks: theft, reduced by fencing and guarding; low prices if many people sell the same vegetables, reduced by finding regular buyers such as schools or restaurants.)",
        explanation: "One mark for each risk and one for each suitable way to reduce it.",
      }),
      P.manual({
        label: "(e)", marks: 4, levels: LV(4),
        stem: "Discuss whether projects like this are an effective way to reduce youth unemployment.",
        points: [
          "For: creates self-employment for four people, with low start-up costs.",
          "For: builds skills and business experience; can grow and employ others; uses local resources.",
          "Against: small profit (each earns only a little per season); seasonal; risky; many may sell the same product.",
          "Justified conclusion (e.g. useful if supported with credit, training and markets, but not a full answer).",
        ],
        modelAnswer: `The project gives four young people work with modest start-up costs, builds farming and business skills, and could grow into a larger business that hires others. However, the expected profit of ${money(prof2)} shared four ways is only ${money(prof2 / 4)} each for a season, so it is underemployment rather than a full living, and it is exposed to water shortages, pests and low prices if many people grow the same crop. Such projects help, especially with support such as credit, training and access to buyers, but they cannot replace the creation of more productive formal jobs.`,
        explanation: "Weigh the jobs and skills created against low income and risk; conclude.",
      }),
    ],
    hints: ["Revenue = bags × price per bag.", "Profit = revenue − total cost."],
    explanation: `Revenue ${money(rev2)}, cost ${money(total)}, profit ${money(prof2)} (${money(prof2 / 4)} each).`,
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional town, a large clothing factory has closed and many former workers now sell second-hand clothes and food at the town market. The council plans to remove vendors from the streets to reduce congestion.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Explain **one** benefit of the informal sector to the former factory workers.",
        points: ["Identifies a benefit (income / easy entry / self-employment).", "Explains (e.g. they can earn a living with little capital instead of being unemployed)."],
        modelAnswer: "It gives them an income: with little capital and no qualifications they can start selling at once, instead of having no income at all.",
        explanation: "Identify (1) + explain (1).",
      }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the council should remove the vendors from the streets.",
        points: [
          "For removal: congestion, hygiene and safety problems; unfair competition with shops that pay rent and taxes.",
          "For removal: if vendors are moved to proper market stalls, the town is safer and the council can collect fees.",
          "Against: vendors lose their only income, so unemployment and poverty rise; they may have nowhere else to sell.",
          "Against: customers lose cheap and convenient goods; spending in the town falls (multiplier).",
          "Considers alternatives: designated trading sites, licences, support to formalise.",
          "Justified conclusion (e.g. relocate to organised sites rather than simply remove).",
        ],
        modelAnswer: "Removing vendors would reduce congestion and improve hygiene and safety, and shops that pay rent and taxes complain of unfair competition. However, many vendors are former factory workers with no other income; removing them would raise unemployment and poverty, and residents would lose cheap, convenient goods, so spending in the town could fall further. A better approach is to move vendors to organised, affordable trading sites with water and toilets, charge small licence fees and offer help to formalise. Simply removing them would worsen the town's unemployment problem.",
        explanation: "Weigh order and fairness against incomes and jobs; consider alternatives; conclude.",
      }),
    ],
    hints: ["Who gains and who loses if the vendors are removed?"],
    explanation: "The informal sector absorbs people who lose formal jobs; policy should balance order with incomes.",
  });

  b.card("DEFINITION", "Define the **informal sector**.", "Small-scale activities not registered or fully regulated, such as vending and backyard workshops, usually without contracts or social protection.");
  b.card("CONCEPT", "Describe two trends in employment in Zimbabwe since the 2000s.", "Formal jobs fell as firms closed; the informal sector grew; youth unemployment and underemployment are high; many workers emigrated.");
  b.card("CONCEPT", "Give two benefits of the informal sector.", "Jobs and incomes for people without formal work; easy to enter; cheap goods; builds business skills.");
  b.card("CONCEPT", "Give two problems of the informal sector.", "Low, irregular incomes; no pensions or sick pay; little tax paid; hard to get loans; poor conditions.");
  b.card("CONCEPT", "How does enterprise reduce unemployment?", "Self-employment, hiring workers, and linkages that create jobs at suppliers.");
  b.card("DEFINITION", "What is **indigenisation**?", "A policy of increasing the share of businesses and resources owned and controlled by local citizens.");
  b.card("CONCEPT", "When is indigenisation most likely to create jobs?", "When it helps local people start and expand new businesses, not only when ownership of existing firms is transferred.");
  b.card("CONCEPT", "List the parts of a small project plan.", "Idea and market; resources and capital; costs; price and revenue; profit and break-even; marketing; risks; records.");
  b.card("FORMULA", "Break-even quantity for a small project = ?", "Equipment (fixed) cost ÷ (price per unit − cost per unit).");
});
