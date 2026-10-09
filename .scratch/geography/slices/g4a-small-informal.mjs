// Slice G4a: SMEs, the informal sector and occupational safety and health (ZIMSEC 7.10.5). ZIMSEC-only concept.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.industry.small-informal", { file: "industry/small-informal", keyPrefix: "industry.small-informal" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a typical characteristic of an **informal** industry?",
    options: [
      ["It is not officially registered and pays little or no tax", "Correct: informal businesses operate outside official registration and regulation."],
      ["It employs thousands of workers in one large factory", "Informal businesses are small, usually with a few workers."],
      ["It uses expensive, modern, imported machinery", "Informal industries use simple, often home-made or second-hand tools."],
      ["It gives every worker a pension and medical aid", "Informal workers usually have no social security."],
    ],
    answer: "A",
    explanation: "Informal industries are small, unregistered, labour-intensive and low in capital.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which item of personal protective equipment protects a welder's eyes?",
    options: [
      ["A welding mask or goggles", "Correct: they shield the eyes from sparks and the bright arc."],
      ["Ear protectors", "Ear protectors reduce noise, not eye damage."],
      ["Safety boots", "Boots protect the feet from falling objects."],
      ["A reflective vest and hard hat", "A reflective vest makes a worker visible to traffic."],
    ],
    answer: "A",
    explanation: "Each item of PPE matches a hazard; welding masks protect the eyes and face.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the informal sector in Zimbabwe grow rapidly from the 1990s onwards?",
    options: [
      ["Many formal-sector workers lost their jobs and turned to self-employment", "Correct: retrenchments and factory closures pushed people into informal work."],
      ["Formal factories were opening much faster than skilled workers could be found", "Formal employment shrank rather than grew in this period."],
      ["The informal sector required large bank loans to start", "Informal businesses need little capital, which is why they are easy to start."],
      ["Laws required all new businesses to be informal", "No law required this; informal means outside official regulation."],
    ],
    answer: "A",
    explanation: "ESAP retrenchments in the 1990s and later economic decline cut formal jobs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do many informal traders set up near bus termini such as Mbare Musika?",
    options: [
      ["Large numbers of potential customers pass by every day", "Correct: informal traders depend on passing trade."],
      ["Land there is reserved for large factories", "Bus termini are busy public spaces, not industrial land."],
      ["Raw materials for small industries are mined beside bus termini", "There are no mines at bus termini."],
      ["Councils pay traders to work there", "Councils charge fees or move traders; they do not pay them."],
    ],
    answer: "A",
    explanation: "Location near markets and transport nodes gives access to many customers.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organisation runs workers' compensation and promotes occupational safety and health in Zimbabwe?",
    options: [
      ["The National Social Security Authority (NSSA)", "Correct: NSSA runs the workers' compensation scheme and promotes OSH."],
      ["The Zimbabwe Tourism Authority (ZTA)", "ZTA promotes and regulates tourism."],
      ["The Grain Marketing Board (GMB)", "The GMB buys and stores grain."],
      ["The Zimbabwe Parks and Wildlife Management Authority", "ZimParks manages national parks and wildlife."],
    ],
    answer: "A",
    explanation: "NSSA is responsible for social security and workers' compensation for registered employers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about what a bank asks for before lending.", "What do informal businesses usually lack?"],
    stem: "Why do informal businesses find it hard to borrow money from banks?",
    options: [
      ["They lack collateral, records and registration that banks require", "Correct: without these, banks see the loans as too risky."],
      ["Banks are not allowed by law to lend money to any small or new business", "Banks may lend to small businesses that meet their conditions."],
      ["Informal businesses never need any money to grow", "They often need capital for tools and premises."],
      ["Interest rates for small businesses are always zero", "Small borrowers usually face higher, not zero, rates."],
    ],
    answer: "A",
    explanation: "Lack of collateral and records makes informal firms high-risk borrowers; microfinance tries to fill the gap.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Match the hazard to the measure.", "Which hazard comes from a moving blade?"],
    stem: "A carpenter in Glen View uses an electric circular saw. Which safety measure most directly reduces the risk of cuts?",
    options: [
      ["Fitting a guard over the blade and training in its use", "Correct: guarding moving parts prevents contact with the blade."],
      ["Wearing ear protectors while working", "Ear protectors reduce noise damage, not cuts."],
      ["Keeping a fire extinguisher and a first-aid kit in the workshop", "These deal with fire and with injuries after they happen, not with preventing cuts from the blade."],
      ["Opening the windows to improve ventilation", "Ventilation reduces dust and fumes, not cuts."],
    ],
    answer: "A",
    explanation: "Each hazard needs a matching control: guards for moving blades.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Which measure tackles the main barrier to growth?"],
    stem: "Which measure would do most to help small metalworkers in a high-density suburb expand their businesses?",
    options: [
      ["Serviced work sites with power plus access to small loans", "Correct: secure premises and capital are their main barriers."],
      ["Regular raids to remove workshops from the suburb", "Raids destroy stock and income rather than helping growth."],
      ["A ban on the use of scrap metal as a raw material", "Scrap is their main, cheap raw material."],
      ["Higher import duties on the scrap metal they buy locally", "Locally bought scrap is not imported; this would not help."],
    ],
    answer: "A",
    explanation: "Credit and secure, serviced premises are the most common needs of SMEs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Informal industries are usually labour-intensive.",
    answer: true,
    explanation: "True. They use many hands and simple tools rather than expensive machinery.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Personal protective equipment is the only measure needed to make a workshop safe.",
    answer: false,
    explanation: "False. PPE is the last line of defence; guarding machines, ventilation, training, first aid and inspections are also needed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each workplace hazard with a suitable safety measure.",
    pairs: [
      ["Loud noise from machines", "Ear protectors"],
      ["Dust from sanding or grinding", "Dust masks and ventilation"],
      ["Falling objects on a building site", "Hard hats and safety boots"],
      ["Fire from flammable materials", "Fire extinguishers and clear exits"],
    ],
    explanation: "Each control matches a particular hazard.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Small workshops in Mbare that make buckets and scotch carts mainly use {{blank:a}} metal as their raw material. Many people moved into the informal sector after retrenchments under {{blank:b}} in the 1990s.",
    blanks: [
      { id: "a", accepted: ["scrap"], choices: ["scrap", "imported", "smelted", "precious"] },
      { id: "b", accepted: ["ESAP"], choices: ["ESAP", "CAMPFIRE", "SADC", "COMESA"] },
    ],
    explanation: "Scrap metal is recycled by informal metalworkers; ESAP (Economic Structural Adjustment Programme) led to job cuts.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A survey by a Form 4 class (fictional data) found 150 workers at a home-industry site. 102 of them had no protective clothing. What percentage had no protective clothing?",
    value: 68,
    wrong: [32, 147],
    explanation: "102 ÷ 150 × 100 = 68%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Find the monthly profit first.", "Then multiply by 12."],
    stem: "A fictional tailor earns US\\$540 a month from sales. Her monthly costs are US\\$180 for cloth, US\\$45 for thread and buttons and US\\$75 for the stall fee. Calculate her profit for a year in US\\$ (fictional data).",
    value: 2880,
    wrong: [6480, 240],
    workedSolution: "1. Monthly costs = 180 + 45 + 75 = US\\$300.\n2. Monthly profit = 540 − 300 = US\\$240.\n3. Yearly profit = 240 × 12 = US\\$2,880.",
    explanation: "Profit per month is US\\$240, so for a year 240 × 12 = US\\$2,880.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the abbreviation for clothing and equipment worn to protect workers from hazards.",
    accepted: ["PPE", "P.P.E.", "personal protective equipment"],
    wrong: ["OSH"],
    explanation: "PPE stands for personal protective equipment.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** characteristics of informal industries in Zimbabwe.",
    points: [
      "Small scale: few workers, often family members or apprentices.",
      "Low capital and simple, often home-made or second-hand tools.",
      "Labour-intensive, with skills learned on the job; often use recycled raw materials.",
      "Unregistered / pay little tax / irregular income / no social security or safety equipment.",
    ],
    modelAnswer: "Informal industries are small, often a single owner with a few helpers. They need little capital and use simple tools. Work is done by hand, using recycled materials such as scrap metal. Most are unregistered, so workers have irregular incomes and no pensions or protective equipment.",
    explanation: "Describe features, not causes.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about benefits to workers, customers and the environment."],
    stem: "Explain the role of the informal sector in Zimbabwe's economy.",
    points: [
      "Provides employment and income to people without formal jobs.",
      "Supplies cheap goods and services to low-income households (furniture, repairs, clothing).",
      "Trains people through apprenticeship / develops entrepreneurial skills.",
      "Recycles waste materials / replaces some imports / supplies and buys from formal firms.",
    ],
    modelAnswer: "The informal sector gives millions of people work and an income. It supplies cheap furniture, clothes and repairs that poor households can afford. Young people learn trades as apprentices. It also recycles scrap metal and tyres and makes goods that would otherwise be imported.",
    explanation: "Each role should be a developed point.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the results of a survey of 80 informal businesses in a fictional high-density suburb (fictional data).\n\n| Main problem reported | Number of businesses |\n|---|---|\n| Lack of capital or credit | 28 |\n| No secure workspace | 20 |\n| Power cuts | 14 |\n| Competition from imports | 10 |\n| Council raids | 8 |",
    hints: ["Percentage = number ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage of businesses whose main problem was lack of capital or credit.", value: 35, wrong: [28, 65], explanation: "28 ÷ 80 × 100 = 35%." }),
      P.num({ label: "(b)", stem: "How many more businesses reported \"No secure workspace\" than \"Council raids\"?", value: 12, wrong: [28, 2.5], explanation: "20 − 8 = 12." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest how the government or council could reduce the most common problem.",
        points: ["Microfinance / small loans / revolving funds through bodies such as SMEDCO.", "Simple registration or group lending so that businesses can borrow without collateral."],
        modelAnswer: "The government could provide small loans through SMEDCO or microfinance schemes, and let traders borrow as groups so that collateral is not needed.",
        explanation: "The most common problem is lack of capital.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why council raids are a problem for informal businesses.",
        points: ["Goods, tools and stalls may be confiscated or destroyed.", "Owners lose income and customers, and are discouraged from investing in their business."],
        modelAnswer: "Raids can destroy or confiscate goods and tools, so owners lose stock and income, and they are afraid to invest in better equipment.",
        explanation: "Explain the effect on the business.",
      }),
    ],
    explanation: "This item practises interpreting survey data on informal businesses.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 420,
    stem: "A fictional welding workshop has six workers. None wears protective clothing. The workshop is a small, enclosed shed, the grinder has no guard, electric cables lie on the wet floor, and there is no first-aid kit.",
    hints: ["Identify each hazard, then a measure for it."],
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Identify **three** hazards to the workers' health and safety.",
        points: ["Burns / eye damage from welding sparks and the arc (no PPE).", "Breathing in welding fumes in an enclosed shed.", "Electric shock from cables on a wet floor / injury from the unguarded grinder."],
        modelAnswer: "Sparks can burn skin and damage eyes; fumes build up in the closed shed; and cables on a wet floor could cause electric shocks.",
        explanation: "Hazards come from the work itself and from the workplace.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Suggest **three** measures to make the workshop safer.",
        points: ["Provide PPE: welding masks, gloves, overalls and boots.", "Improve ventilation / extract fumes; fit a guard to the grinder.", "Raise and insulate cables, keep the floor dry; provide a first-aid kit and training."],
        modelAnswer: "Give each worker a welding mask, gloves and overalls; open up the shed for ventilation and fit a guard on the grinder; and lift the cables off the wet floor and keep a first-aid kit.",
        explanation: "Match each measure to a hazard.",
      }),
    ],
    explanation: "This item practises applying occupational safety and health measures.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    hints: ["Give the benefits and the problems.", "Decide whether the benefits outweigh the problems."],
    stem: "\"The informal sector does more good than harm to Zimbabwe.\" Discuss.",
    points: [
      "Good: employment and income for millions who lack formal jobs.",
      "Good: cheap goods and services; skills training; recycling (e.g. Siyaso and Magaba metalwork, Glen View furniture).",
      "Harm: little tax revenue for government; unregulated competition with formal firms.",
      "Harm: unsafe working conditions, no social security, irregular incomes.",
      "Harm: congestion, litter and pollution in towns; poor product quality.",
      "Judgement with reason, e.g. benefits outweigh harm if the sector is supported and gradually formalised.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "The informal sector does a great deal of good. It gives work and an income to millions of people who lost formal jobs or never found one, and it supplies cheap furniture, clothing and repairs. Clusters such as Siyaso and Magaba in Mbare train young people and recycle scrap metal into useful goods. However, it also causes harm. Most businesses pay little tax, so the government loses revenue, and formal firms complain of unfair competition. Workers have no protective equipment or social security, incomes are irregular, and crowded markets cause congestion and litter. On balance the informal sector does more good than harm, because in a country with few formal jobs it keeps households alive; the harm can be reduced by providing serviced sites, simple registration and safety training.",
    explanation: "Discuss both sides with Zimbabwean examples and reach a judgement.",
  });

  b.card("DEFINITION", "Informal sector", "Economic activities that are not officially registered or regulated, usually untaxed, with no formal contracts or social security.");
  b.card("DEFINITION", "Small to medium enterprise (SME)", "A business with few workers and limited capital and turnover; it may be formal or informal.");
  b.card("DEFINITION", "Occupational safety and health", "Measures that protect workers from injury and disease caused by their work.");
  b.card("VOCABULARY", "PPE", "Personal protective equipment: masks, goggles, gloves, overalls, boots, ear protectors, hard hats.");
  b.card("FACT", "Informal metalwork clusters in Harare", "Siyaso and Magaba in Mbare: small workshops making scotch carts, stoves, buckets and spare parts from scrap metal.");
  b.card("CONCEPT", "Causes of informal sector growth", "Formal job losses (ESAP in the 1990s, factory closures), urban population growth, low entry costs, demand for cheap goods.");
  b.card("CONCEPT", "Role of the informal sector", "Jobs and income, cheap goods and services, apprenticeship training, recycling, import substitution, links with formal firms.");
  b.card("CONCEPT", "Problems of informal businesses", "No credit or collateral, insecure premises, power cuts, competition from imports, council raids, unsafe conditions.");
  b.card("FACT", "NSSA", "The National Social Security Authority runs workers' compensation and promotes occupational safety and health in Zimbabwe.");
});
