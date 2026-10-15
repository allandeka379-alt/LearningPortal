// W4b: industry.smes-hightech (ZIMSEC only). All data are illustrative.
// Computed: break-even 600 / (5 - 3) = 300 chairs; 400 chairs -> profit 200; survival 130/200 = 65%; weighted scores 35 / 27 / 15;
// SME jobs 1 200 x 3 = 3 600 vs 400 (9 times).
import { concept, P, geographyLevels, chk } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const contrib = chk(5 - 3, 2);
const be = chk(600 / contrib, 300, 1e-9);
const profit400 = chk(400 * contrib - 600, 200, 1e-9);
const surv = chk((130 / 200) * 100, 65, 1e-9);
const failN = chk(200 - 130, 70);
const W = [3, 2, 2, 1];
const SC = { A: [5, 5, 4, 2], B: [3, 2, 5, 4], C: [2, 1, 1, 5] };
const score = (s) => s.reduce((t, v, i) => t + v * W[i], 0);
const sA = chk(score(SC.A), 35);
const sB = chk(score(SC.B), 27);
const sC = chk(score(SC.C), 15);
const jobs = chk(1200 * 3, 3600);
const times = chk(jobs / 400, 9);
const ST = tbl(["Factor (weight)", "Site A", "Site B", "Site C"], [["Skilled labour (3)", ...SC.A.slice(0, 1), 3, 2], ["University links (2)", 5, 2, 1], ["Airport and communications (2)", 4, 5, 1], ["Low land cost (1)", 2, 4, 5]]);
const FT = tbl(["Month", "Sales (US\\$)", "Costs (US\\$)"], [["January", 900, 850], ["February", 1000, 880], ["March", 1100, 900], ["April", 800, 870]]);
const prof = [900 - 850, 1000 - 880, 1100 - 900, 800 - 870];
const profTot = chk(prof.reduce((a, c) => a + c, 0), 300);

concept("ageo.industry.smes-hightech", { file: "industry/smes-hightech", keyPrefix: "industry.smes-hightech" }, (b) => {
  mc(b, 1, "RECALL", "Which is a typical characteristic of a small and medium enterprise?", [
    ["It is owner-managed with few employees and limited capital", "Correct: SMEs are small and usually run by the owner."],
    ["It employs thousands of workers in many countries", "That describes a transnational corporation."],
    ["It is always owned by the government", "SMEs are mostly privately owned."],
    ["It spends most of its income on research and development in laboratories", "That describes hi-tech firms."],
  ], "SMEs are **small, owner-managed** and have limited capital.");
  mc(b, 2, "UNDERSTANDING", "Why do many SMEs in Zimbabwe find it hard to obtain bank loans?", [
    ["They lack collateral and formal records", "Correct: banks want security and proof of income."],
    ["Banks lend only to businesses with fewer than two workers", "There is no such rule."],
    ["SMEs never need money to buy materials", "They do need money for materials and tools."],
    ["Interest rates are set to zero for small firms", "Small firms usually pay high interest."],
  ], "Lack of **collateral and records** limits borrowing.");
  mc(b, 2, "UNDERSTANDING", "Why are hi-tech industries described as footloose?", [
    ["Light, valuable products make transport costs small", "Correct: they can choose locations freely."],
    ["They must be built next to coal mines and large power stations", "Raw materials do not tie them down."],
    ["They can only operate in the largest port city of each country", "They are not tied to ports."],
    ["They move every month to avoid paying tax", "Footloose does not mean constant movement."],
  ], "Hi-tech goods have **low transport costs**, so location is flexible.");
  mc(b, 3, "APPLICATION", "Which feature of a location would a computer assembly firm value most?", [
    ["A supply of skilled technicians and links to a university", "Correct: skills and research links matter most."],
    ["A deposit of iron ore beneath the site", "Raw materials matter little."],
    ["Large areas of cheap farmland for grazing", "Land is a minor cost."],
    ["A position far from airports and telecommunications networks", "Good communications are needed."],
  ], "Hi-tech firms value **skills and research links**.", { hints: ["Think about what is hard to move: people or the light product?"] });
  mc(b, 3, "ANALYSIS", "Which support measure most directly addresses a lack of working capital in small businesses?", [
    ["Low-interest microfinance loans", "Correct: it provides the money they lack."],
    ["Banning all imported goods", "This does not provide capital."],
    ["Building a new international airport", "This does not give capital to SMEs."],
    ["Lengthening school holidays", "This is unrelated."],
  ], "Microfinance supplies **working capital**.", { hints: ["Match the constraint to the measure."] });
  mc(b, 4, "EVALUATION", "A town has 1 200 SMEs averaging 3 workers each, and one factory with 400 workers. Which conclusion is best supported?", [
    ["SMEs provide far more jobs, but pay and security may be lower", "Correct: 3 600 jobs against 400, with a caution about quality."],
    ["The factory provides more jobs than all SMEs together", "3 600 is greater than 400."],
    ["SMEs cannot provide any income to households", "They do provide income."],
    ["Jobs in SMEs are always better paid and more secure than in factories", "The data do not show this."],
  ], "SMEs give **nine times** as many jobs; quality of jobs needs separate evidence.", { hints: ["Multiply firms by workers first."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Many SMEs in Zimbabwe operate in the informal sector.", answer: true,
    feedbackTrue: "Correct: many are not fully registered or taxed.",
    feedbackFalse: "Not so: a large share of SMEs are informal.",
    explanation: "A large share of SMEs are informal." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Hi-tech industries locate close to their raw materials because their products are heavy.", answer: false,
    feedbackFalse: "Correct: their products are light and valuable, so skills and links matter more.",
    feedbackTrue: "Not so: hi-tech products are light.",
    explanation: "Hi-tech goods are light and valuable; location follows skills and links." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A cluster of hi-tech firms near a university is called a {{blank:a}} park. The state body that supports small business in Zimbabwe is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["science"], choices: ["science", "game", "industrial"] },
      { id: "b", accepted: ["SMEDCO"], choices: ["SMEDCO", "MMCZ", "EMA"] },
    ], explanation: "**Science** (technology) parks; **SMEDCO** supports SMEs." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each constraint on SMEs to a support measure.",
    pairs: [
      ["Lack of capital", "Microfinance loans"],
      ["Weak management skills", "Training and business advice"],
      ["No workspace", "Serviced industrial sites"],
      ["Complex rules", "Simplified registration and tax"],
    ], explanation: "Each measure addresses a specific constraint." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "units",
    stem: "A carpenter's fixed costs are US\\$600 a month. Each chair sells for US\\$5 and costs US\\$3 in materials. How many chairs must be sold each month to break even?",
    hints: ["Contribution per chair = price − materials cost.", "Break-even = fixed cost ÷ contribution."],
    value: be, wrong: [120, 200, 600],
    explanation: "Contribution = 5 − 3 = 2. Break-even = 600 ÷ 2 = **300 chairs**. The value 120 divides by the price instead of the contribution." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "Using the same figures, calculate the monthly profit if 400 chairs are sold, in US\\$.",
    hints: ["Profit = number sold × contribution − fixed cost."],
    value: profit400, wrong: [800, 1000],
    explanation: "400 × 2 = 800; 800 − 600 = **US\\$200**. The value 800 forgets the fixed cost." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A programme helps 200 new businesses and 130 are still trading after three years. Calculate the survival rate, as a percentage.",
    hints: ["Survivors ÷ starters × 100."],
    value: surv, wrong: [35, 70],
    explanation: "130 ÷ 200 × 100 = **65%**. The value 35 is the failure rate." });
  b.short({ d: 1, skill: "RECALL", stem: "Give the term for an industry whose location is not tied to raw materials because its products are light and valuable.",
    accepted: ["footloose", "footloose industry", "a footloose industry"], wrong: ["heavy industry"],
    explanation: "A **footloose** industry." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name one place that is a famous cluster of hi-tech firms.",
    accepted: ["Silicon Valley", "Bangalore", "Shenzhen", "Bengaluru", "Hsinchu", "Cambridge science park", "Cambridge Science Park"], wrong: ["Hwange"],
    explanation: "For example **Silicon Valley**, **Bangalore** or **Shenzhen**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe four characteristics of small and medium enterprises in Zimbabwe.",
    hints: ["Think about size, capital, management and market."],
    points: [
      "They have few employees, often family members.",
      "They start with small capital from savings or family.",
      "The owner manages the business and makes most decisions.",
      "Many serve a local market, use simple technology and operate informally.",
    ],
    modelAnswer: "They have few employees, often family members, and start with small capital from savings. The owner manages the business, and many serve a local market with simple technology and operate informally.",
    explanation: "Size, capital, management and market." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how SMEs contribute to economic development in Zimbabwe.",
    hints: ["Think of jobs, income and linkages."],
    points: [
      "They provide jobs and incomes, especially for young people and women.",
      "They use local materials and skills and make goods low-income households can afford.",
      "They supply parts and services to large firms and train people in business skills.",
    ],
    modelAnswer: "They provide jobs and incomes, especially for young people and women. They use local materials and skills to make goods that low-income households can afford, and they supply large firms and train people in business skills.",
    explanation: "Jobs, local resources and linkages." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four reasons why computer and phone manufacture is concentrated in a few places in the world.",
    hints: ["Think of skills, research, clusters and capital."],
    points: [
      "Skilled engineers and technicians are concentrated near universities.",
      "Research and design need links between firms and universities.",
      "Clustering gives access to suppliers of components and specialist services.",
      "Large capital, good airports and communications and government incentives are needed.",
    ],
    modelAnswer: "Skilled engineers and technicians are concentrated near universities, and research needs links between firms and universities. Clusters give access to suppliers of components and services, and the industry needs large capital, good airports and communications and government incentives.",
    explanation: "Skills, research, clusters and capital." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A phone repair shop recorded these figures for four months (data invented for this exercise).\n\n${FT}`,
    hints: ["Profit = sales − costs for each month.", "Add the monthly profits (a loss is negative)."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total profit over the four months, in US\\$.", value: profTot, unit: "US$", wrong: [370, 3800],
        explanation: "Monthly profits: 50, 120, 200 and −70. Total = 300." }),
      P.mcq({ label: "(b)", marks: 1, stem: "In which month did the shop make a loss?", options: [
        ["April", "Correct: costs (870) exceeded sales (800)."],
        ["January", "January made a profit of 50."],
        ["February", "February made a profit of 120."],
        ["March", "March made a profit of 200."],
      ], answer: "A", explanation: "Only April shows a loss." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the shop's profit may vary from month to month.",
        points: [
          "Customer demand changes with household incomes and seasons.",
          "Power cuts or lack of spare parts can reduce repairs.",
          "Costs such as rent and imported parts change with prices.",
        ],
        modelAnswer: "Customer demand changes with household incomes and seasons. Power cuts or lack of spare parts reduce repairs, and costs such as rent and imported parts change with prices.",
        explanation: "Demand, supply problems and costs." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two forms of support that would help the owner.",
        points: [
          "A small loan or microfinance to buy stock and tools.",
          "Training in bookkeeping and marketing, or shared workspace with reliable power.",
        ],
        modelAnswer: "A small microfinance loan to buy stock and tools, and training in bookkeeping and marketing or shared workspace with reliable power.",
        explanation: "Finance, skills and premises." }),
    ], explanation: "Calculate profit and explain variation and support." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: `A firm scores three possible sites for a computer assembly plant from 1 (poor) to 5 (excellent). The weights are in brackets (illustrative data).\n\n${ST}`,
    hints: ["Weighted score = sum of (score × weight).", "Compare the totals."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the weighted score of site A.", value: sA, wrong: [16, 21],
        explanation: "3×5 + 2×5 + 2×4 + 1×2 = 15 + 10 + 8 + 2 = 35." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the weighted score of site B.", value: sB, wrong: [14, 35],
        explanation: "3×3 + 2×2 + 2×5 + 1×4 = 9 + 4 + 10 + 4 = 27." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why site C scores lowest although land there is cheapest.",
        points: [
          "Site C has few skilled workers and no university links, which hi-tech firms value most.",
          "It has poor airport and communications links.",
          "Cheap land (weight 1) saves little compared with the costs of poor skills and links.",
        ],
        modelAnswer: "Site C has few skilled workers and no university links, which hi-tech firms value most, and it has poor airport and communications links. Cheap land has a low weight and saves little compared with those disadvantages.",
        explanation: "Skills and links outweigh land cost." }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Assess how far hi-tech industries could contribute to development in Zimbabwe.",
        points: [
          "They create well-paid jobs for skilled workers.",
          "They raise skills and spread technology to other sectors.",
          "They could earn export income from software and assembled goods.",
          "They need capital, reliable power and imported components, and few jobs are open to unskilled workers.",
          "Judgement: valuable but limited unless skills, power and finance are developed.",
        ],
        wordLimit: { max: 180 },
        modelAnswer: "Hi-tech industries create well-paid jobs for skilled workers, raise skills and spread technology to other sectors, and could earn export income from software and assembled goods. However, they need capital, reliable power and imported components, and few jobs are open to unskilled workers. I conclude that they are valuable but limited unless skills, power and finance are developed.",
        explanation: "Weigh benefits against limits and judge." }),
    ], explanation: "Calculate weighted site scores and assess hi-tech industry." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the contribution of small and medium enterprises to economic growth and development in Zimbabwe.",
    hints: ["Give benefits and constraints.", "Reach a judgement."],
    points: [
      "SMEs provide jobs for many people, including young people and women.",
      "They give income to households where formal jobs are scarce.",
      "They use local materials and skills and supply affordable goods.",
      "They link to large firms as suppliers and spread production to towns and rural areas.",
      "Many are informal and pay little tax, so their contribution to public revenue is small.",
      "Productivity and pay are low because of weak finance, power, skills and premises.",
      "Support such as microfinance, training and simpler rules can raise growth.",
      "Judgement: SMEs are essential for jobs and income, but their contribution to growth is limited unless constraints are reduced.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "SMEs provide jobs for many people, including young people and women, and give income to households where formal jobs are scarce. They use local materials and skills, supply affordable goods, supply large firms, and spread production to towns and rural areas. However, many are informal and pay little tax, and productivity and pay are low because of weak finance, power, skills and premises. Microfinance, training and simpler rules can raise growth. I conclude that SMEs are essential for jobs and income, but their contribution to growth is limited unless constraints are reduced.",
    wordLimit: { max: 300 }, explanation: "Weigh jobs and income against low productivity and constraints." });

  b.card("DEFINITION", "Small and medium enterprise (SME)", "A business small in employees, turnover and assets, usually owner-managed; limits vary by law and sector.");
  b.card("CONCEPT", "Contribution of SMEs", "Jobs, incomes, use of local materials, affordable goods, linkages with large firms and business skills.");
  b.card("CONCEPT", "Constraints on SMEs", "Lack of finance and collateral, premises, power, skills, regulations, competition and market access.");
  b.card("CONCEPT", "Support for SMEs", "Microfinance and SMEDCO loans, training, serviced sites, simplified rules and procurement links.");
  b.card("FORMULA", "Break-even output", "Break-even = fixed costs ÷ (price − variable cost per unit).");
  b.card("DEFINITION", "Hi-tech industry", "Industry making advanced products such as computers and phones, with heavy research spending and many skilled workers.");
  b.card("CONCEPT", "Why hi-tech industries are footloose", "Light, valuable products have low transport costs, so skills, university links, communications and incentives decide location.");
  b.card("FACT", "Hi-tech clusters", "Silicon Valley (USA), Bangalore (India) and Shenzhen (China) are famous clusters.");
  b.card("CONCEPT", "Importance of hi-tech industries", "Skilled jobs, exports, technology spread and support for other sectors, but high capital cost and e-waste.");
});
