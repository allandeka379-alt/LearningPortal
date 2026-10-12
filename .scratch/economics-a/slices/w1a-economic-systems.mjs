// W1a: market, planned and mixed economies (both boards; the Zimbabwean system is ZIMSEC detail).
import { concept, P, chk, fmt, table, pctChange, ZIM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.basics.economic-systems", { file: "basics/economic-systems", keyPrefix: "basics.economic-systems" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "In a market economy, decisions about what to produce are made mainly by",
    explanation: "In a market economy consumers and producers respond to prices and profit; the government plays a limited role." },
    ["consumers and firms responding to prices", "Correct: the price mechanism allocates resources."],
    [["a central planning authority setting targets", "That describes a planned economy."],
     ["the government through the national budget alone", "Government budgets matter in a mixed economy, not in a pure market."],
     ["traditional customs passed on from earlier generations", "That describes a traditional economy."]]);

  mc({ d: 1, skill: "RECALL", stem: "Which is a feature of a planned (command) economy?",
    explanation: "Planned economies rely on state ownership of most resources and central decision-making." },
    ["Most resources are owned by the state", "Correct."],
    [["Prices are determined only by supply and demand", "This is a market feature."],
     ["Firms compete to maximise profit", "Profit competition is a market feature."],
     ["Consumers decide what is produced by their spending", "In a planned economy planners decide."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which statement describes a **mixed economy**?",
    explanation: "A mixed economy combines private enterprise with government provision and regulation." },
    ["Private firms and the government both play important roles in allocating resources", "Correct."],
    [["All resources are privately owned and prices are set freely by buyers and sellers", "That describes a pure market economy."],
     ["The government owns all resources and plans all production", "That describes a pure planned economy."],
     ["Resources are allocated by traditions with no prices", "That describes a traditional economy."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which is a strength of a market economy?",
    explanation: "Competition and the profit motive give firms incentives to cut costs and innovate." },
    ["Competition gives firms an incentive to be efficient and to innovate", "Correct."],
    [["Public goods are always provided in sufficient quantities", "Markets tend to under-provide public goods."],
     ["Income is distributed equally between households", "Market outcomes are often unequal."],
     ["External costs such as pollution are automatically included in prices", "Markets usually ignore external costs."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which is a weakness of a planned economy?",
    explanation: "Planners lack the information that prices provide and the incentive to improve efficiency, which can cause shortages and surpluses." },
    ["Planners may not have the information to match output to what consumers want", "Correct."],
    [["Consumers have a very wide choice of goods because many firms compete for their custom", "Choice is usually limited in planned economies."],
     ["Prices rise quickly when demand increases", "Planned prices are normally fixed by the state."],
     ["Firms compete fiercely for customers", "Competition is limited in planned economies."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Who owns the resources and who decides?"],
    stem: "In a fictional country the government owns the power company and the railways and runs state schools, but private firms produce most food, clothing and housing and prices of these are set freely. This economy is best described as",
    explanation: "State ownership of some industries and services alongside a large private sector is a mixed economy." },
    ["a mixed economy", "Correct."],
    [["a pure market economy", "The state owns and provides significant parts of the economy."],
     ["a planned economy", "Most output is produced by private firms at free prices."],
     ["a traditional economy", "Production is not governed by custom."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Which items are likely to be unprofitable for private firms?"],
    stem: "Why might a pure market economy fail to provide street lighting?",
    explanation: "Street lighting is a public good: non-excludable, so firms cannot charge users and it is unprofitable to provide." },
    ["Firms cannot easily charge people who use the lighting, so it is unprofitable", "Correct: non-excludability leads to free riding."],
    [["The lighting is too expensive for any government to provide", "Governments can provide it from tax revenue."],
     ["Consumers do not want lighting on their streets", "People value lighting; the issue is paying for it."],
     ["Planned economies forbid private lighting companies from operating", "The question concerns a market economy."]]);

  mc({ d: 3, skill: "EVALUATION", hints: ["Think of the information problem."],
    stem: "Which problem does a planned economy face that a market economy handles through prices?",
    explanation: "Prices carry information about scarcity and preferences automatically; planners must gather this information from many sources, so shortages and surpluses occur." },
    ["Collecting and processing information on millions of consumer wants and resource scarcities", "Correct."],
    [["Protecting property rights, enforcing contracts and providing a stable legal framework", "A market economy needs this too."],
     ["Producing public goods that the market does not supply", "A planned economy can provide public goods."],
     ["Persuading people to start new firms", "Entrepreneurs are less important in planned economies."]]);

  {
    const g = 45, y = 90, share = (g / y) * 100;
    chk(share, 50);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: share, dp: 0, unit: "%",
      stem: "In a fictional country public spending is US\\$45 billion and total output is US\\$90 billion. Calculate public spending as a percentage of total output.",
      wrong: [45 + 90, (90 / 45) * 100],
      explanation: `45 ÷ 90 × 100 = ${share}%. Dividing total output by spending gives 200%, which inverts the ratio.` });
  }
  {
    const before = 40, after = 25;
    const change = after - before;
    chk(change, -15);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: change, unit: "percentage points", hints: ["Subtract the old share from the new share."],
      stem: "A fictional country privatises several state firms. The state-owned share of total output falls from 40% to 25%. By how many percentage points does the state's share change? Include the minus sign for a fall.",
      wrong: [15, pctChange(40, 25)],
      explanation: `25 − 40 = ${change} percentage points. As a percentage change the fall would be −37.5%, but the question asks for the difference in shares.` });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Most economies in the world today are mixed economies.", answer: true,
    explanation: "True. Almost all combine private enterprise with government provision and regulation, differing in degree." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A market economy needs no government at all.", answer: false,
    explanation: "False. Even in a market economy the government protects property rights, enforces contracts and issues money." });
  b.tf({ d: 2, skill: "UNDERSTANDING", applies: ZIM, stem: "Examination answers describing the Zimbabwean economy should give a balanced, factual description rather than a political opinion.", answer: true,
    explanation: "True. Economics distinguishes positive description from value judgements." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each system to its description.",
    pairs: [["Market economy", "Prices and private ownership allocate resources"], ["Planned economy", "A central authority decides what, how and for whom"], ["Mixed economy", "Both private firms and the state play important roles"], ["Privatisation", "Selling state-owned firms to private owners"]],
    explanation: "The three systems and the term for moving towards the market." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "In a market economy the {{blank:a}} mechanism allocates resources. In a planned economy a central {{blank:b}} makes the decisions.",
    blanks: [{ id: "a", accepted: ["price"], choices: ["price", "plan", "tax"] }, { id: "b", accepted: ["authority"], choices: ["authority", "consumer", "firm"] }],
    wrong: [["plan", "firm"]],
    explanation: "Prices guide a market economy; planners decide in a planned one." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the sale of state-owned firms to private owners?",
    accepted: ["privatisation", "privatization"], wrong: ["nationalisation"],
    explanation: "Privatisation. The reverse, taking firms into state ownership, is nationalisation." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, stem: "Explain how a market economy decides what to produce.",
    points: ["Consumers spend money on the goods they want, creating demand.", "Firms produce goods that give the highest profit.", "Prices rise for goods in high demand, drawing more resources to them."],
    modelAnswer: "Consumers show what they want by spending, which raises the demand and price of popular goods. Firms are attracted by higher profits and produce more of them, so resources move to the goods consumers value most.",
    explanation: "Link demand, profit and the price signal." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["One strength and one weakness, each developed."],
    stem: "Analyse **one** strength and **one** weakness of a planned economy.",
    points: ["Strength identified (for example the state can direct resources to priorities).", "Strength developed (for example health and education can be provided to all).", "Weakness identified (for example planners lack information).", "Weakness developed (for example shortages and surpluses arise, and little incentive to innovate)."],
    modelAnswer: "A strength is that the state can direct resources to national priorities such as health and education, so basic services can be provided to everyone. A weakness is that planners lack the information that prices give, so shortages of some goods and surpluses of others occur, and managers have little incentive to cut costs or innovate.",
    explanation: "One strength and one weakness, each explained." });

  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, applies: ZIM, hints: ["Describe, do not judge."],
    stem: "Describe the main features that make the Zimbabwean economy a mixed economy.",
    points: ["A large private sector (farming, mining, trade, manufacturing and the informal sector).", "State-owned enterprises in some sectors (for example electricity and rail).", "Government provision of services such as education and health.", "Government regulation of some prices, trade or foreign exchange."],
    modelAnswer: "The economy has a large private sector, including farmers, miners, manufacturers, traders and the informal sector. It also has state-owned enterprises in sectors such as electricity and rail, and the government provides education and health services. The state regulates aspects of trade, prices and foreign exchange.",
    explanation: "A factual description of the private and public roles." });

  // Structured 1: spectrum data.
  {
    const rows = [["Alba", 15, 75], ["Brevia", 40, 45], ["Corona", 80, 12]];
    const tab = table(["Country", "Public spending as % of output", "State-owned share of firms (%)"], rows);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["The higher the state share, the closer to planning."],
      stem: `The table shows the role of the state in three fictional countries (illustrative data).\n\n${tab}`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Which country is closest to a planned economy?", accepted: ["Corona"], explanation: "Corona has the highest public spending and state-owned share." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 80 - 15, unit: "percentage points", stem: "By how many percentage points does public spending as a share of output in Corona exceed that in Alba?", wrong: [80 / 15, 95], explanation: "80 − 15 = 65 percentage points." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why Alba's economy might be efficient but unequal.",
          points: ["Competition and the profit motive give firms incentives to cut costs.", "Those with low incomes have little spending power, so their wants are not met.", "Little government spending means little redistribution through taxes and benefits."],
          modelAnswer: "In Alba, with a small state sector, competition gives firms incentives to reduce costs and innovate. But people with low incomes have little spending power and the government spends little on redistribution, so inequality can be high." }),
        P.manual({ label: "(d)", marks: 4, stem: "Assess whether Brevia's mixed economy is likely to perform better than Corona's.",
          points: ["Brevia has competition and prices to guide resources.", "Brevia still provides public services through government spending.", "Corona's planning may cause shortages, inefficiency and limited choice.", "A conclusion: depends on how well the state performs, but Brevia's balance is usually seen as more flexible."],
          modelAnswer: "Brevia combines market incentives, which encourage efficiency and innovation, with considerable public provision that supports health and education. Corona's heavy state role may protect basic needs but risks shortages and inefficiency because planners lack information. On balance Brevia is likely to perform better, but this depends on how well each government manages its role." }),
      ],
      explanation: "Corona is closest to planning; a 65 point gap; compare the balance of efficiency and equity." });
  }

  // Structured 2: privatisation of a utility.
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Percentage change = change ÷ original × 100."],
    stem: "A fictional government owns the national water company, which loses US\\$12 million a year and supplies 60% of households. A private firm offers to buy it. The private firm would aim to make a profit and expects to raise water prices by 25%. The current price is US\\$2.40 per cubic metre.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 3, dp: 2, stem: "Calculate the new price per cubic metre after a 25% rise, in US\\$.", wrong: [0.6, 2.65], explanation: "2.40 × 1.25 = US\\$3.00." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain **one** possible benefit of privatising the water company.",
        points: ["The private owner has a profit motive and so an incentive to cut costs.", "It would end losses of US\\$12 million that taxpayers must cover.", "The extra revenue could finance investment that extends supply."],
        modelAnswer: "A private firm has an incentive to cut costs and raise efficiency, which would end the annual loss of US\\$12 million paid for by taxpayers. Higher revenue could also pay for investment in new pipes and supply." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** possible cost of privatising the water company.",
        points: ["Higher prices of 25% reduce affordability.", "Poor households may be unable to pay for a necessity.", "The firm may not serve unprofitable rural areas."],
        modelAnswer: "A 25% price rise could make water unaffordable for poor households, a necessity, and a profit-seeking firm may not extend supply to unprofitable rural areas." }),
      P.manual({ label: "(d)", marks: 4, stem: "Assess whether the government should accept the offer.",
        points: ["Costs of the loss and benefits of efficiency.", "Equity and access issues for poor households.", "Role of regulation (price caps, service obligations) can reduce the costs.", "A conclusion supported by the information."],
        modelAnswer: "Privatisation would stop the loss and could bring investment, but it would raise prices by 25% and may leave poorer and rural households with less access. The government could accept the offer if it regulates prices and requires service to all areas; otherwise the costs to households may outweigh the savings to taxpayers." }),
    ],
    explanation: "New price US\\$3.00; weigh efficiency and fiscal savings against affordability and access." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare strengths and weaknesses.", "End with a judgement."],
    stem: "Evaluate whether a mixed economy is better than a market economy at answering the basic economic questions.",
    points: ["A market economy uses prices and competition to allocate efficiently.", "But markets under-provide public goods and may leave large inequality.", "A mixed economy lets the state provide public and merit goods.", "Government can regulate monopolies and externalities.", "Government intervention may be costly, inefficient or distort prices (government failure).", "Taxes and redistribution can reduce incentives.", "The quality of government institutions matters.", "A justified conclusion."],
    levels: LV8,
    modelAnswer: "A market economy answers what, how and for whom through prices, and competition gives firms strong incentives to be efficient. However, markets under-provide public goods such as street lighting, ignore external costs such as pollution, and leave those without income unable to express demand. A mixed economy allows the government to provide public and merit goods, regulate monopolies and redistribute income, which addresses these failures. Yet intervention can be costly and badly designed: price controls can create shortages, state firms can be inefficient and high taxes can reduce incentives. A mixed economy is therefore better only if government intervention is well targeted and competently run. On balance, most economies choose mixed systems because the failures of pure markets are too serious to ignore.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh market failures against government failures." });

  b.card("DEFINITION", "Define a **market economy**.", "An economy in which resources are privately owned and the price mechanism, with little government involvement, decides what, how and for whom to produce.");
  b.card("DEFINITION", "Define a **planned (command) economy**.", "An economy in which the state owns most resources and a central authority decides what, how and for whom to produce.");
  b.card("DEFINITION", "Define a **mixed economy**.", "An economy in which both private firms and the government play important roles in allocating resources.");
  b.card("CONCEPT", "Give **two** strengths of a market economy.", "Competition and profit motive encourage efficiency and innovation; prices allocate resources and give consumers choice.");
  b.card("CONCEPT", "Give **two** weaknesses of a market economy.", "Public and merit goods are under-provided; inequality and external costs may be ignored.");
  b.card("CONCEPT", "Give **two** weaknesses of a planned economy.", "Planners lack information, so shortages and surpluses arise; little incentive to be efficient or innovate; limited choice.");
  b.card("DEFINITION", "Define **privatisation**.", "The sale of state-owned firms or assets to private owners.");
  b.card("CONCEPT", "How is the Zimbabwean economy usually described?", "As a mixed economy, with a private sector (including the informal sector) and a state sector.", "ZIMSEC detail.", { applies: ZIM });
});
