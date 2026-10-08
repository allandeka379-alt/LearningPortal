// W4b: econ.firms.multinationals — features of MNCs and their advantages and disadvantages to host and home countries.
// Figures differ from the lesson's worked example.
import { concept, P, ZIM, CAM, table, fmt, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.firms.multinationals", { file: "firms/multinationals", keyPrefix: "firms.multinationals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **multinational company (MNC)**?",
    options: [
      ["A firm that produces goods or services in more than one country", "Correct."],
      ["A firm that sells its goods to customers in many countries", "Exporting alone does not make a firm an MNC; it must produce abroad."],
      ["A firm owned by several governments together", "Ownership by governments is not the defining feature."],
      ["A firm that employs workers of many nationalities in one country", "An MNC must operate in more than one country."],
    ],
    answer: "A",
    explanation: "An MNC has its headquarters in one country and owns or controls production in other countries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of an MNC to a **host** country?",
    options: [
      ["It brings investment, jobs and new technology", "Correct."],
      ["It sends its profits to shareholders in its home country", "This is a disadvantage to the host."],
      ["It may force small local firms out of business", "This is a disadvantage to the host."],
      ["It may move to another country if costs rise", "This is a risk for the host."],
    ],
    answer: "A",
    explanation: "Host countries gain foreign direct investment, employment, skills and technology, as well as exports and taxes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might an MNC set up a factory in a country rather than export to it?",
    options: [
      ["To avoid tariffs and transport costs by producing inside the market", "Correct."],
      ["To pay its workers higher wages than in its home country", "MNCs usually seek lower, not higher, costs."],
      ["To reduce the size of its operations", "Setting up abroad expands its operations."],
      ["To stop selling its products in that country", "It sets up to sell more there."],
    ],
    answer: "A",
    explanation: "Producing locally avoids tariffs and transport costs and puts the firm close to its customers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does a foreign-owned mine sending its profits abroad affect the host country's current account?",
    options: [
      ["It is a debit in primary income", "Correct: investment income paid to foreign owners."],
      ["It is a credit in trade in goods", "Profit payments are not exports of goods."],
      ["It is a credit in secondary income", "It is an outflow of investment income, not a transfer received."],
      ["It has no effect on the current account", "Profits paid abroad are recorded in primary income."],
    ],
    answer: "A",
    hints: ["Profits are a reward to a factor of production."],
    explanation: "Profits sent abroad are primary income debits (ZIMSEC: part of net income from abroad), which reduce the current account balance.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A large food MNC opens a factory in a fictional host country. Which effect is most likely to harm the host?",
    options: [
      ["Small local food processors lose sales and close", "Correct: competition from a large, efficient firm."],
      ["Local farmers gain a large, regular buyer for their crops", "This is a benefit."],
      ["Workers learn food-safety and management skills", "This is a benefit."],
      ["The government collects company tax from the factory", "This is a benefit."],
    ],
    answer: "A",
    hints: ["Which option is a cost rather than a benefit?"],
    explanation: "MNCs bring jobs, skills and tax, but their size and brands can drive small local firms out of business.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which is a **disadvantage** of MNCs for their **home** country?",
    options: [
      ["Manufacturing jobs may be lost when production moves abroad", "Correct."],
      ["Profits from subsidiaries abroad flow back to the home country", "This is an advantage for the home country."],
      ["Head-office jobs in research and management stay at home", "This is an advantage."],
      ["The MNC gains access to cheaper raw materials", "This is an advantage for the firm and its home country."],
    ],
    answer: "A",
    hints: ["Which option is a cost to the country where the headquarters is?"],
    explanation: "When MNCs move production to lower-cost countries, the home country can lose manufacturing jobs and investment.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which government policy would most increase the benefit a host country receives from an MNC, without driving it away?",
    options: [
      ["Requiring it to train local workers and buy more inputs from local suppliers", "Correct: raises local spillovers while keeping the investment."],
      ["Taking ownership of all the MNC's assets without compensation", "This would drive away future investors."],
      ["Banning the MNC from selling its output abroad", "This would cut exports and probably cause it to leave."],
      ["Exempting the MNC from all taxes and environmental rules forever", "This gives away revenue and allows damage."],
    ],
    answer: "A",
    hints: ["Which option keeps the investment but spreads more of its benefits locally?"],
    explanation: "Local-content and training requirements raise the share of an MNC's spending that stays in the host country, while extreme measures would deter investment.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "What name does the ZIMSEC syllabus use for MNCs?",
    options: [
      ["Multinational corporations", "Correct: ZIMSEC uses 'corporations'; Cambridge uses 'companies'."],
      ["Public corporations", "These are state-owned firms (parastatals)."],
      ["Sole traders", "A sole trader is a one-owner business."],
      ["Co-operatives", "A co-operative is owned by its members."],
    ],
    answer: "A",
    explanation: "Multinational corporations (ZIMSEC) and multinational companies (Cambridge) mean the same thing: MNCs.",
  });

  // Numericals.
  {
    const rev = 800, wages = 120, local = 150, imp = 200, taxes = 110;
    const profit = rev - (wages + local + imp + taxes);
    check("profit", profit, 220);
    const rev2 = 640, wages2 = 96, local2 = 128, taxes2 = 80, reinv = 48, stays = wages2 + local2 + taxes2 + reinv, sh = (stays / rev2) * 100;
    check("stays", stays, 352); check("sh", sh, 55);
    const T = table(["Item", "US\\$ million"], [["Sales revenue", rev], ["Wages paid to local workers", wages], ["Purchases from local suppliers", local], ["Imported equipment and inputs", imp], ["Taxes paid to the host government", taxes]]);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: profit, daily: true,
      stem: `The table shows one year's figures for a fictional MNC's platinum mine.\n\n${T}\n\nCalculate the mine's profit, in US\\$ million.`,
      wrong: [rev - (wages + local + imp), rev - imp],
      explanation: `Profit = ${rev} − (${wages} + ${local} + ${imp} + ${taxes}) = **US\\$${profit} million**.`,
    });
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: sh, calculator: true,
      stem: `A different fictional MNC's mine has revenue of US\\$${rev2} million. It pays local wages of US\\$${wages2} million, buys US\\$${local2} million from local suppliers, pays US\\$${taxes2} million in taxes to the host government and reinvests US\\$${reinv} million of its profit in the host country. Calculate the percentage of its revenue that stays in the host country. Give your answer to one decimal place.`,
      wrong: [((wages2 + local2 + taxes2) / rev2) * 100, (reinv / rev2) * 100],
      hints: ["Add the items that are paid or kept in the host country.", "Divide by revenue."],
      explanation: `1. Stays in the host = ${wages2} + ${local2} + ${taxes2} + ${reinv} = ${stays}.\n2. Share = ${stays} ÷ ${rev2} × 100 = **${pct(sh, 1)}**.\n3. Leaving out reinvested profit gives ${pct(((wages2 + local2 + taxes2) / rev2) * 100, 1)}.`,
    });
  }
  {
    const jobs0 = 2400, local = 2040, sh = (local / jobs0) * 100;
    check("sh", sh, 85);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: sh,
      stem: `A fictional MNC employs ${fmt(jobs0)} people at its factory in a host country, of whom ${fmt(local)} are local citizens. Calculate the percentage of its workforce that is local. Give your answer to one decimal place.`,
      wrong: [((jobs0 - local) / jobs0) * 100],
      explanation: `${fmt(local)} ÷ ${fmt(jobs0)} × 100 = **${pct(sh, 1)}**.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The home country of an MNC is the country where its headquarters is located.",
    answer: true,
    explanation: "True. Host countries are those where it has branches, factories or mines.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All the revenue earned by an MNC in a host country stays in that country.",
    answer: false,
    explanation: "False. Imported inputs and profits sent to shareholders abroad leave the host country.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each effect of an MNC as an advantage or a disadvantage for the host country.",
    pairs: ["Training local workers in new skills", "Sending profits to shareholders abroad", "Paying taxes and royalties", "Polluting rivers near a mine", "Earning foreign currency through exports"],
    right: ["Advantage", "Disadvantage"],
    rightIndex: [0, 1, 0, 1, 0],
    explanation: "Skills, taxes and export earnings benefit the host; profit outflows and pollution are costs.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "When an MNC builds a factory in a host country, this is an inflow of foreign {{blank:a}} investment. Profits later sent home reduce the host country's {{blank:b}} income balance.",
    blanks: [
      { id: "a", accepted: ["direct"], choices: ["direct", "indirect"] },
      { id: "b", accepted: ["primary"], choices: ["primary", "secondary"] },
    ],
    wrong: [["indirect", "secondary"]],
    hints: ["Profits are a reward for capital."],
    explanation: "Building productive assets abroad is foreign direct investment; profit outflows are primary income debits.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** features of multinational companies.",
    points: [
      "Operate (produce) in more than one country, with headquarters in the home country.",
      "Very large, with economies of scale.",
      "Global brands, heavy advertising and research / advanced technology.",
      "Can move production and funds between countries / global supply chains.",
    ],
    modelAnswer: "MNCs produce in more than one country, with headquarters in their home country and branches abroad. They are very large and benefit from economies of scale. They usually have well-known global brands and use advanced technology developed through research. They can move production and money between countries, locating each stage of production where costs are lowest.",
    hints: ["Think about size, location, brands and mobility."],
    explanation: "One mark per feature.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** disadvantages of MNCs for a host country such as Zimbabwe.",
    points: [
      "Profits are repatriated to shareholders abroad…",
      "…so much of the income leaves the country and the current account worsens.",
      "Other disadvantage: competition closes local firms / environmental damage / resource depletion / tax avoidance / footloose…",
      "…developed, e.g. mining pollutes rivers and farmland.",
    ],
    modelAnswer: "First, MNCs send much of their profit to shareholders in their home countries, so a large part of the income from the host's resources leaves the country, and the primary income deficit on the current account grows. Second, mining and manufacturing MNCs can damage the environment, for example by polluting rivers and farmland, and they may use up non-renewable minerals that will not be available to future generations.",
    hints: ["Think about profits, local firms and the environment."],
    explanation: "Two marks per disadvantage.",
  });

  // Structured 1 (8 marks).
  {
    const rev = 300, local = 75, wages = 45, taxes = 36, profit = 90, reinv = 15;
    const stays = local + wages + taxes + reinv, sh = (stays / rev) * 100;
    check("stays", stays, 171); check("sh", sh, 57);
    const abroad = profit - reinv;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `A fictional MNC runs a lithium mine in a southern African country. In 2026 its revenue was US\\$${rev} million. It paid US\\$${wages} million in local wages, bought US\\$${local} million of goods and services from local suppliers, paid US\\$${taxes} million in taxes and royalties, and made a profit of US\\$${profit} million, of which it reinvested US\\$${reinv} million locally and sent the rest to its shareholders abroad.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: abroad, stem: "Calculate the profit sent abroad, in US\\$ million.", wrong: [profit], explanation: `${profit} − ${reinv} = US\\$${abroad} million.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: sh, stem: "Calculate the percentage of revenue that stayed in the host country (local wages, local purchases, taxes and reinvested profit). Give your answer to one decimal place.", wrong: [((local + wages + taxes) / rev) * 100], explanation: `(${wages} + ${local} + ${taxes} + ${reinv}) ÷ ${rev} × 100 = ${stays} ÷ ${rev} × 100 = ${pct(sh, 1)}.` }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain one way the host government could increase the share of revenue that stays in the country.",
          points: ["Local-content rules / encourage processing lithium locally / higher royalties / training locals for management…", "…so more of the mine's spending goes to local firms, workers or the government."],
          modelAnswer: "The government could require the mine to buy more of its supplies and services from local firms, or to process some lithium in the country, so that more of its spending goes to local businesses and workers.",
          explanation: "Policy + how it keeps more revenue in the country.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether the host country benefits from the mine.",
          points: [
            `Benefits: ${pct(sh, 0)} of revenue stays (wages, suppliers, US$36m taxes); jobs, skills, exports and foreign currency.`.replace("US$", "US\\$"),
            `Costs: US$${abroad}m of profit leaves; lithium is non-renewable; possible environmental damage; dependence on one MNC.`.replace("US$", "US\\$"),
            "Justified conclusion.",
          ],
          modelAnswer: `The host benefits because ${pct(sh, 0)} of the mine's revenue stays in the country as wages, purchases from local firms, taxes and reinvestment; the mine also creates jobs, skills, exports and foreign currency. However, US\\$${abroad} million of profit leaves the country, the lithium cannot be replaced, and mining may damage the environment. On balance the host gains, especially if it uses the tax revenue well and encourages local processing, but it must regulate the mine's environmental impact.`,
          explanation: "Retained income and jobs versus outflows and depletion; conclude.",
        }),
      ],
      hints: ["Profit sent abroad = profit − reinvested profit.", "Add the items that stay in the host country."],
      explanation: `Profit sent abroad US\\$${abroad} million; ${pct(sh, 1)} of revenue stays in the host country.`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "A fictional car-parts MNC with headquarters in Country H is closing one of its factories in Country H and opening a larger factory in Country J, a lower-income country where wages are lower and the government offers a five-year tax holiday.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "In this example, which is the host country?",
        options: [["Country J", "Correct: the new factory is located there."], ["Country H", "Country H is the home country, where the headquarters is."], ["Both countries equally", "Only J hosts the new factory."], ["Neither country", "J is the host."]],
        answer: "A",
        explanation: "The host country is where the MNC sets up production; the home country is where it has its headquarters.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain **two** reasons why the MNC has chosen to move production to Country J.",
        points: ["Lower wages reduce production costs.", "The tax holiday raises its profits.", "Explanation that lower costs make it more competitive / increase profit."],
        modelAnswer: "Wages are lower in Country J, so the MNC's labour costs per car part fall, and the five-year tax holiday means it keeps more of its profit. Lower costs make its products more competitive and raise its profits.",
        explanation: "Two reasons and the link to costs/profits.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain one disadvantage of the move for Country H.",
        points: ["Workers at the closed factory lose their jobs (structural unemployment)…", "…and the government loses tax revenue / local suppliers lose sales."],
        modelAnswer: "Workers at the factory in Country H lose their jobs, and their skills may not suit other industries, so there is structural unemployment; local suppliers lose orders and the government loses tax revenue.",
        explanation: "Identify + develop.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether Country J will benefit from the arrival of the MNC.",
        points: [
          "Benefits: investment (FDI) and jobs; training and technology transfer; exports and foreign currency.",
          "Benefits: local suppliers and related businesses grow.",
          "Costs: tax holiday means little tax revenue for five years; profits sent abroad.",
          "Costs: low wages and possibly poor conditions; competition for local firms; footloose — it may leave when the tax holiday ends or wages rise (as it left Country H).",
          "Evaluation: depends on local content, skills transfer and whether it stays.",
          "Justified conclusion.",
        ],
        modelAnswer: "Country J gains foreign direct investment and jobs, and its workers learn new skills and technology; the factory's exports bring in foreign currency, and local suppliers and service firms can grow around it. However, the five-year tax holiday means the government collects little tax at first, and most profits will be sent to Country H. Wages are low, and the MNC has just shown that it moves when costs change: it may leave Country J when the tax holiday ends or wages rise. Overall, Country J is likely to benefit, because the jobs, skills and exports are valuable, but the gains will be greater and longer-lasting if the government requires training and local purchasing, so that skills and suppliers remain even if the MNC moves on.",
        explanation: "Investment, jobs and skills versus lost tax, profit outflows and footloose risk; conclude.",
      }),
    ],
    hints: ["The home country has the headquarters.", "Consider what happens when the tax holiday ends."],
    explanation: "Country J (host) gains investment, jobs and skills but little tax at first; Country H (home) loses jobs.",
  });

  b.card("DEFINITION", "Define a **multinational company (MNC)**.", "A firm with headquarters in one country that produces goods or services in more than one country.");
  b.card("DEFINITION", "Host country versus home country?", "Host: where the MNC sets up production. Home: where its headquarters is.");
  b.card("DEFINITION", "What is **foreign direct investment (FDI)**?", "Investment by a firm in productive assets (factories, mines, farms) in another country.");
  b.card("CONCEPT", "List four features of MNCs.", "Operate in several countries; very large with economies of scale; global brands and technology; can move production and funds between countries.");
  b.card("CONCEPT", "Give four advantages of MNCs for host countries.", "Investment, jobs, skills and technology transfer, exports and foreign currency, taxes, choice for consumers.");
  b.card("CONCEPT", "Give four disadvantages of MNCs for host countries.", "Profits repatriated; local firms closed; environmental damage; resource depletion; tax avoidance; political influence; footloose.");
  b.card("CONCEPT", "Advantages and disadvantages of MNCs for home countries?", "Gain: profits returned, head-office jobs, access to resources and markets. Lose: manufacturing jobs, investment and tax at home.", undefined, { applies: CAM });
  b.card("FACT", "Which part of an MNC's revenue stays in a host country?", "Local wages, local purchases, taxes and royalties, and reinvested profits.");
  b.card("FACT", "What does ZIMSEC call MNCs?", "Multinational corporations (Cambridge: multinational companies).", undefined, { applies: ZIM });
});
