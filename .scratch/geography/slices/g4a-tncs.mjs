// Slice G4a: transnational corporations (ZIMSEC 7.10.4; Cambridge 9.2.4-9.2.6).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.industry.tncs", { file: "industry/tncs", keyPrefix: "industry.tncs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **transnational corporation**?",
    options: [
      ["A company that operates in more than one country", "Correct: TNCs have operations in several countries."],
      ["A company owned and run by the government", "That is a state-owned enterprise or parastatal."],
      ["A company that only sells goods online", "Selling online does not make a firm transnational."],
      ["A group of countries that trade without tariffs", "That is a trading bloc."],
    ],
    answer: "A",
    explanation: "A TNC (multinational) operates in more than one country.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where is the **headquarters** of most large TNCs located?",
    options: [
      ["In a major city of a high-income country", "Correct: most TNCs began in HICs and keep their headquarters there."],
      ["Next to their largest factory in a low-income country", "Production may be in LICs, but decision-making usually stays in the home country."],
      ["In a different country every year", "Headquarters are permanent and rarely move."],
      ["In rural areas near raw materials", "Headquarters need financial, legal and communication services found in big cities."],
    ],
    answer: "A",
    explanation: "Headquarters and research tend to stay in HICs; production spreads to MICs and LICs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do many clothing TNCs make their goods in Asian MICs and LICs?",
    options: [
      ["Labour costs are low and clothing production needs many workers", "Correct: labour-intensive industry is drawn to low-wage locations."],
      ["Clothing is too heavy and bulky to transport long distances from Asia", "Clothing is light and travels cheaply in containers."],
      ["Customers in Asia buy all the clothes made there", "Much of the clothing is exported to HICs."],
      ["Raw cotton can only be grown in Asia", "Cotton is grown on several continents, including Africa."],
    ],
    answer: "A",
    explanation: "Low wages and large workforces attract labour-intensive production.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does **subcontracting** mean for a TNC such as Nike?",
    options: [
      ["Paying independent factories to make its products instead of owning them", "Correct: Nike owns very few of the factories that make its goods."],
      ["Buying every company in the supply chain", "That would be ownership, the opposite of subcontracting."],
      ["Selling the rights to the company's brand name and logo to another firm", "Selling a brand is not subcontracting."],
      ["Making all its products at its headquarters", "Nike's headquarters handles design and marketing, not mass production."],
    ],
    answer: "A",
    explanation: "Subcontracting gives flexibility: orders can be moved between factories and countries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of a TNC for its host country?",
    options: [
      ["Much of the profit is sent back to the TNC's home country", "Correct: this profit leakage reduces the benefit to the host."],
      ["It creates jobs for local people", "Jobs are an advantage."],
      ["It pays taxes to the host government", "Tax revenue is an advantage."],
      ["It trains local workers in new skills and modern technology", "Skills transfer is an advantage."],
    ],
    answer: "A",
    explanation: "Profit leakage, low wages, pollution and sudden closure are common disadvantages.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    hints: ["Mining companies cannot choose where minerals occur."],
    stem: "Why have platinum mining TNCs invested on Zimbabwe's Great Dyke rather than elsewhere in the country?",
    options: [
      ["The platinum deposits are located along the Great Dyke", "Correct: mining TNCs are tied to the location of the ore."],
      ["The Great Dyke has the country's largest consumer market", "The largest markets are in the main cities, and platinum is exported."],
      ["Wages are lower on the Great Dyke than anywhere else in Africa", "Low wages do not explain why mines are only on the Dyke."],
      ["The Great Dyke has the country's busiest airport", "Airports are not the reason; the ore is."],
    ],
    answer: "A",
    explanation: "Resource-seeking TNCs locate where the raw materials are.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which country gains if goods are made inside the bloc?"],
    stem: "A car TNC builds an assembly plant inside a trading bloc rather than exporting cars into it. What is the most likely reason?",
    options: [
      ["To avoid the tariffs charged on cars imported into the bloc", "Correct: producing inside the bloc avoids import taxes."],
      ["Because cars cannot be carried on container ships", "Cars are routinely shipped by sea."],
      ["To be as far as possible from its customers", "Being inside the bloc places it closer to customers."],
      ["Because labour is always cheaper inside trading blocs than outside them", "Many trading blocs are high-wage areas."],
    ],
    answer: "A",
    explanation: "Avoiding trade barriers and being close to a market are common reasons for TNC investment.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    hints: ["Which option weighs both sides?"],
    stem: "Which statement gives the most balanced evaluation of a TNC's factory in an LIC?",
    options: [
      ["It provides jobs and exports, but low wages and profit leakage limit the gains", "Correct: it weighs advantages against disadvantages."],
      ["It brings only benefits, because any factory job is better than no job at all", "This ignores poor conditions, leakage and environmental costs."],
      ["It brings only harm, because TNCs exploit all workers", "This ignores jobs, skills and investment."],
      ["It has no effect on the host country at all", "TNC factories clearly affect employment, trade and the environment."],
    ],
    answer: "A",
    explanation: "Evaluation requires weighing both sides before reaching a judgement.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Nike's headquarters is in Beaverton, Oregon, in the USA.",
    answer: true,
    explanation: "True. Design, research, marketing and finance are controlled from Beaverton.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Research and development work for most TNCs is usually carried out in their low-wage production countries.",
    answer: false,
    explanation: "False. Research and development usually stays in HICs near universities and highly skilled workers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a TNC with where it is usually located.",
    pairs: [
      ["Headquarters", "A major city in the home country"],
      ["Research and development", "Near universities in HICs"],
      ["Assembly of products", "Low-wage MICs and LICs"],
      ["Mining operations", "Where the mineral deposits are"],
    ],
    explanation: "Decision-making and research stay in HICs; production goes to low-cost or resource locations.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A country in which a TNC sets up a factory is called the {{blank:a}} country. When a TNC's profits are sent back to its home country, this is called profit {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["host"], choices: ["host", "home", "donor", "source"] },
      { id: "b", accepted: ["leakage"], choices: ["leakage", "multiplier", "investment", "subsidy"] },
    ],
    explanation: "Host countries receive TNC investment; leakage reduces the benefit they keep.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A pair of fictional trainers sells for US\\$120. The factory worker's labour cost is US\\$3 of this (fictional data). What percentage of the price is the labour cost?",
    value: 2.5,
    tol: 0.05,
    wrong: [40, 25],
    explanation: "3 ÷ 120 × 100 = 2.5%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Find the difference in wage per worker per year.", "Multiply by the number of workers."],
    stem: "A fictional TNC employs 2,000 workers. A worker costs US\\$3,600 a year in Country A and US\\$28,800 a year in Country B. How much would the TNC save each year, in US\\$ million, by producing in Country A? (Fictional data.)",
    value: 50.4,
    tol: 0.05,
    wrong: [25.2, 7.2],
    workedSolution: "1. Difference per worker = 28,800 − 3,600 = US\\$25,200.\n2. × 2,000 workers = US\\$50,400,000.\n3. = US\\$50.4 million.",
    explanation: "25,200 × 2,000 = 50,400,000, which is US\\$50.4 million.",
  });
  b.short({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Name the platinum mining company, majority-owned by Impala Platinum, that mines at Ngezi.",
    accepted: ["Zimplats", "Zimbabwe Platinum Mines", "Zimplats Holdings", "Zim plats"],
    wrong: ["Unki"],
    explanation: "Zimplats mines at Ngezi near Chegutu and processes ore at Selous.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages that a TNC can bring to a host country.",
    points: [
      "Jobs for local people.",
      "Development: wages are spent locally / multiplier effect on local suppliers and shops.",
      "Investment in infrastructure / skills training / tax and export earnings.",
      "Development: roads, power and clinics benefit communities / new skills and technology spread to local firms / foreign currency for imports.",
    ],
    modelAnswer: "A TNC creates jobs, and workers spend their wages in local shops, so other businesses grow. It may also build roads, power lines and clinics near its operations, which local communities can use.",
    explanation: "Each advantage needs a statement and a development.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: CAM,
    hints: ["Think about the different layers of the company."],
    stem: "Describe the global organisation of a named TNC.",
    points: [
      "Names a TNC and its headquarters in its home country (e.g. Nike, Beaverton, USA).",
      "Research, design and marketing in HICs.",
      "Production in MICs/LICs, owned or subcontracted (e.g. Vietnam, China, Indonesia), with sales worldwide.",
    ],
    modelAnswer: "Nike's headquarters is in Beaverton, Oregon, USA, where design, research and marketing are controlled. Its shoes and clothing are made by subcontracted factories, mainly in Vietnam, China and Indonesia, and are sold worldwide.",
    explanation: "Describe headquarters, research, production and sales.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows information about a fictional TNC's operations (fictional data).\n\n| Country | Type of operation | Workers | Average monthly wage (US\\$) |\n|---|---|---|---|\n| Country H (HIC) | Headquarters and research | 1,500 | 6,200 |\n| Country M (MIC) | Component factory | 4,000 | 620 |\n| Country L (LIC) | Assembly plant | 6,000 | 155 |",
    hints: ["Divide one wage by the other for 'how many times'."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total number of workers employed by the TNC.", value: 11500, wrong: [10000, 7500], explanation: "1,500 + 4,000 + 6,000 = 11,500." }),
      P.num({ label: "(b)", stem: "How many times greater is the average monthly wage in Country H than in Country L?", value: 40, wrong: [10, 4], explanation: "6,200 ÷ 155 = 40." }),
      P.mcq({
        label: "(c)", stem: "Which pattern does Table 1 show?",
        options: [
          ["The most skilled, best-paid work is in the HIC; low-paid assembly is in the LIC", "Correct: this is the typical TNC hierarchy."],
          ["Most workers are employed at the headquarters", "Only 1,500 of 11,500 work at the headquarters."],
          ["Wages are similar in all three countries, whatever the type of work and level of skill", "Wages differ enormously, from 155 to 6,200."],
          ["The LIC has the fewest workers", "The LIC has the most workers (6,000)."],
        ],
        answer: "A", explanation: "Decision-making and research are in the HIC; labour-intensive assembly is in the LIC.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why the TNC located its assembly plant in Country L.",
        points: ["Low wages reduce the cost of labour-intensive assembly.", "A large available workforce / government incentives such as tax holidays or cheap land.", "Access to a port or market / weaker regulations / avoiding tariffs."],
        modelAnswer: "Wages in Country L are very low, which cuts the cost of assembly that needs many workers. The government may offer tax holidays and cheap land in an economic zone, and a nearby port lets the TNC export finished goods.",
        explanation: "Use the data and general reasons for TNC location.",
      }),
    ],
    explanation: "This item practises interpreting data on a TNC's global organisation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480, applies: ZIM,
    stem: "A fictional foreign-owned mining company opens a platinum mine in a rural district of Zimbabwe. It employs 1,200 people, builds a tarred road and a clinic, and exports concentrate for refining abroad. Local farmers complain that the mine uses water from the river they irrigate from.",
    hints: ["Separate benefits from problems."],
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe **three** benefits of the mine for the district.",
        points: ["1,200 jobs and wages for local people.", "The tarred road improves access to markets and services.", "The clinic improves health care / local businesses supply the mine."],
        modelAnswer: "The mine gives 1,200 people jobs, the new tarred road makes it easier to reach markets, and the clinic provides health care for the community.",
        explanation: "Use the resource.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain **three** disadvantages of the mine for Zimbabwe.",
        points: ["Exporting concentrate means value is added and refining jobs are created abroad.", "Profits are sent to the foreign owners (leakage).", "Competition for river water harms farmers / land disturbance and pollution."],
        modelAnswer: "Because the concentrate is refined abroad, Zimbabwe loses the extra value and jobs. Profits go to foreign shareholders. The mine's use of river water reduces what farmers can use for irrigation.",
        explanation: "Explain each disadvantage, not just name it.",
      }),
    ],
    explanation: "This item practises evaluating a mining TNC's impacts.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Name a TNC and the country where it operates.", "Weigh advantages against disadvantages before judging."],
    stem: "With reference to a named TNC, evaluate the impacts of TNCs on host countries.",
    points: [
      "Names a TNC and host country (e.g. Nike in Vietnam/Indonesia, or a platinum TNC in Zimbabwe).",
      "Advantage: jobs and wages, often higher than local alternatives.",
      "Advantage: export earnings, taxes, investment in infrastructure.",
      "Advantage: skills and technology transfer; multiplier effect on local suppliers.",
      "Disadvantage: low pay, long hours or poor conditions; managerial jobs held by foreigners.",
      "Disadvantage: profit leakage; footloose operations may relocate; environmental damage.",
      "Judgement: whether benefits outweigh costs depends on regulation and how much value stays in the host country.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Nike, with its headquarters in Beaverton, USA, subcontracts the production of shoes and clothing to factories in Asian countries such as Vietnam and Indonesia. In these host countries Nike's suppliers employ very large numbers of people, often at wages higher than in farming, and the exports earn foreign currency. Workers gain factory skills, and local firms supply materials and transport. However, there are disadvantages. In the 1990s campaigners showed low pay, long hours and poor safety in some supplier factories. Most of the profit goes to the headquarters and shareholders, and because Nike does not own the factories it can move orders to cheaper countries, so jobs are insecure. Factories can also pollute. Overall, TNCs bring real benefits to host countries, but the gains depend on how well governments regulate wages, safety and the environment and on how much value is kept locally.",
    explanation: "Evaluate both sides with a named TNC and reach a judgement.",
  });

  b.card("DEFINITION", "Transnational corporation (TNC)", "A company that operates in more than one country; also called a multinational.");
  b.card("DEFINITION", "Host country", "A country in which a TNC sets up a factory, mine, office or shop.");
  b.card("DEFINITION", "Foreign direct investment (FDI)", "Investment by a company from one country in factories, mines or businesses in another.");
  b.card("VOCABULARY", "Profit leakage", "Profits from a TNC's operations being sent back to its home country instead of staying in the host country.");
  b.card("CONCEPT", "Global organisation of a TNC", "Headquarters and research in HICs; regional offices; production (owned or subcontracted) in MICs and LICs; sales worldwide.");
  b.card("CONCEPT", "Why TNCs locate in LICs and MICs", "Cheap labour, raw materials, growing markets, avoiding tariffs, government incentives, weaker regulations.");
  b.card("FACT", "Nike", "Headquarters in Beaverton, Oregon, USA; production subcontracted to factories mainly in Vietnam, China and Indonesia.", undefined, { applies: CAM });
  b.card("FACT", "Platinum TNCs in Zimbabwe", "Zimplats (majority-owned by Impala Platinum) mines at Ngezi and processes ore at Selous; Unki mine near Shurugwi.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Advantages and disadvantages of TNCs", "Jobs, investment, skills, taxes, exports versus low pay, profit leakage, sudden closure, pollution and political influence.");
});
