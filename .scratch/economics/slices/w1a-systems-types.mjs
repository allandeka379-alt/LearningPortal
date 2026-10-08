// W1a: economic systems (market, planned, mixed): features and how each answers the three questions. ZIMSEC only.
import { concept, P } from "../lib.mjs";

const SYS = ["market", "planned", "mixed"];
const LV4 = [
  [3, 4, 4, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 2, 3, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 1, "Simple points, little explanation."],
];

concept("econ.systems.types", { file: "systems/types", keyPrefix: "systems.types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a **planned (command) economy**, who mainly decides what to produce?",
    options: [
      ["The government, through a central planning authority", "Correct: the state sets output targets and allocates resources."],
      ["Consumers, through the prices they are willing to pay", "That is how a market economy decides."],
      ["Private firms, according to the profit they expect", "Private firms play little or no part in a planned economy."],
      ["Trade unions, through bargaining with employers", "Unions do not decide what an economy produces."],
    ],
    answer: "A",
    explanation: "In a planned economy the state owns most resources and a planning authority decides what, how and for whom to produce.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a feature of a **market (free enterprise) economy**?",
    options: [
      ["Most resources are privately owned", "Correct: private ownership is a defining feature."],
      ["Output targets are set by the state", "Targets are a feature of a planned economy."],
      ["Prices are fixed by a government board", "In a market economy prices are set by demand and supply."],
      ["Goods are allocated by rationing", "Rationing by the state is a feature of planning."],
    ],
    answer: "A",
    explanation: "A market economy has private ownership of resources, decisions made through the price mechanism and a limited role for government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **mixed economy**?",
    options: [
      ["One where private and public sectors both own resources and make decisions", "Correct: the market and the state both allocate resources."],
      ["One in which half of all firms are owned by the state", "Mixed does not mean exactly half; the balance varies."],
      ["One in which agriculture and industry are equally important", "That describes the structure of output, not the economic system."],
      ["One in which the country trades with both rich and poor nations", "Trade partners do not define the economic system."],
    ],
    answer: "A",
    explanation: "A mixed economy combines a private sector working through the price mechanism with a public sector in which the government provides and regulates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a market economy, how is the question **for whom to produce** answered?",
    options: [
      ["Goods go to those who are willing and able to pay for them", "Correct: income and prices decide who gets the goods."],
      ["Goods are shared out equally among all households", "Equal sharing would be a planning decision, not the market's."],
      ["Goods go to those the planning authority selects", "There is no planning authority in a market economy."],
      ["Goods are given first to those in greatest need", "Need does not decide allocation in a pure market economy."],
    ],
    answer: "A",
    explanation: "In a market economy output is distributed by the price mechanism: people with more income can buy more.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a market economy, what mainly motivates firms to produce a good?",
    options: [
      ["The profit they expect to make by selling it", "Correct: the profit motive guides production decisions."],
      ["The output target set by the government", "Targets belong to planned economies."],
      ["The need to give every household an equal share", "Equal shares are a planning goal, not a market motive."],
      ["Instructions from the central bank", "Central banks do not tell firms what to produce."],
    ],
    answer: "A",
    explanation: "Firms in a market economy produce what consumers will buy at a price that gives them a profit.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In Country P the state owns all mines and factories, a national five-year plan sets output for each, and shop prices are fixed by a government board. Which economic system does Country P have?",
    options: [
      ["A planned (command) economy", "Correct: state ownership, central targets and fixed prices."],
      ["A market (free enterprise) economy", "There is no private ownership or price mechanism here."],
      ["A mixed economy", "A mixed economy also has a large private sector, which Country P lacks."],
      ["A traditional economy", "Not one of the three systems in the syllabus; decisions here come from planners, not custom."],
    ],
    answer: "A",
    explanation: "State ownership of the means of production, central planning of output and fixed prices are the features of a planned economy.",
    hints: ["Who owns the resources? Who decides output?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In Country Q most shops, farms and factories are privately owned, but the state runs the railways and electricity supply and provides free primary education. Which economic system does Country Q have?",
    options: [
      ["A mixed economy", "Correct: both private firms and the state produce and allocate goods."],
      ["A planned economy", "Most production is private, so it is not planned."],
      ["A pure market economy", "The state provides several important services, so it is not purely market."],
      ["A command economy", "Command economy is another name for a planned economy."],
    ],
    answer: "A",
    explanation: "A private sector plus a public sector that runs some industries and provides services is the feature of a mixed economy.",
    hints: ["Are there both private and public producers?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which change would move an economy **towards** a market economy?",
    options: [
      ["Selling state-owned enterprises to private shareholders", "Correct: privatisation moves ownership from the state to the private sector."],
      ["Fixing the prices of basic foods such as bread by law", "Price controls replace market prices with government decisions."],
      ["Setting output targets for every factory", "Targets are a planning tool."],
      ["Taking privately owned mines into state ownership", "Nationalisation moves the economy towards planning."],
    ],
    answer: "A",
    explanation: "Privatisation reduces the public sector and lets the price mechanism allocate more resources. Price controls, targets and nationalisation all increase the state's role.",
    hints: ["Which option increases private ownership?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a planned economy, most resources are owned by the state.",
    answer: true,
    explanation: "True. State ownership of land and capital is a key feature of a planned (command) economy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A market economy has no government at all.",
    answer: false,
    explanation: "False. Even in a market economy the government defends the country, keeps law and order and enforces contracts and property rights. Its role is limited, not absent.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Almost every economy in the world today is a mixed economy.",
    answer: true,
    explanation: "True. Most economies combine private firms and markets with government provision and regulation; they differ in the balance between the two.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature to the economic system it describes best.",
    pairs: [
      ["Consumer sovereignty and the profit motive", "Market economy"],
      ["Central planning authority sets output targets", "Planned economy"],
      ["Private sector and public sector work side by side", "Mixed economy"],
    ],
    explanation: "Profit and consumer choice drive a market economy; targets set by planners drive a planned economy; a mixed economy has both sectors.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Choose the economic system in which each decision is typical.",
    template: "A ministry orders a state textile mill to produce 2 million metres of cloth: {{blank:a}}. A private bakery raises output because demand for bread has risen: {{blank:b}}. Private kombis carry passengers while the state runs the trains: {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["planned"], choices: SYS },
      { id: "b", accepted: ["market"], choices: SYS },
      { id: "c", accepted: ["mixed"], choices: SYS },
    ],
    wrong: [["planned", "mixed", "market"]],
    explanation: "Orders from a ministry show planning; responding to demand for profit shows the market; private and state transport side by side show a mixed economy.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a **planned economy** answers the questions of what, how and for whom to produce.",
    points: [
      "What: the planning authority decides which goods and how much of each (output targets).",
      "How: planners allocate resources and decide production methods for state enterprises.",
      "For whom: goods are distributed according to the plan, for example by rationing or equal shares, not by ability to pay.",
    ],
    explanation: "In a planned economy every one of the three questions is answered by the state, not by prices.",
    modelAnswer: "The central planning authority decides what to produce by setting output targets for each industry. It decides how to produce by allocating workers, machines and raw materials to state enterprises. It decides for whom by distributing goods according to the plan, for example by rationing, fixed low prices or equal shares.",
    hints: ["Take each question in turn.", "Who makes each decision?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** features of a mixed economy.",
    points: [
      "A private sector of firms owned by individuals that work for profit through the price mechanism.",
      "A public sector in which the government owns some enterprises and provides services such as education, health and roads (or regulates markets).",
    ],
    explanation: "A mixed economy has both a private sector and a public sector; the government also regulates and taxes.",
    modelAnswer: "It has a private sector in which firms produce for profit and prices allocate goods, and a public sector in which the government provides services such as schools and clinics and runs some enterprises.",
    hints: ["Think of the two sectors."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A fictional country, Country R, used to be a planned economy. Over ten years its government sold most state factories to private owners, allowed prices of most goods to be set by demand and supply, but kept state ownership of the electricity company and continued to provide free primary education.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Complete the sentences.",
        template: "Before the changes Country R had a {{blank:a}} economy. After the changes it has a {{blank:b}} economy.",
        blanks: [
          { id: "a", accepted: ["planned"], choices: SYS },
          { id: "b", accepted: ["mixed"], choices: SYS },
        ],
        explanation: "It moved from a planned economy to a mixed one: most production is now private, but the state still runs electricity and education.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how the question *what to produce* is now answered differently in Country R.",
        points: [
          "Before: planners decided output through targets.",
          "Now: most goods are produced by private firms in response to consumer demand and prices (profit motive).",
          "The state still decides what to provide in electricity and primary education.",
        ],
        modelAnswer: "Before, the planning authority set targets for every factory. Now private firms decide what to make by responding to consumer demand: if prices and profits rise for a good, more of it is produced. The state still decides how much electricity and primary education to provide.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest why the government kept the electricity company and primary education in the public sector.",
        points: [
          "Electricity is essential to all industries and households; the state may want to control supply or prices (strategic industry, natural monopoly).",
          "Private firms might charge high prices or neglect rural areas that are less profitable.",
          "Primary education benefits society as a whole; if it were sold at market prices poor families might not afford it.",
        ],
        modelAnswer: "Electricity is used by every firm and household, so the government may want to keep control over supply and prices; a private owner might charge high prices or not supply unprofitable rural areas. Primary education benefits the whole society, and if parents had to pay market prices many poor families would keep children out of school.",
      }),
    ],
    explanation: "Moving from planning to a mix lets prices decide most output, while the state keeps sectors where markets might fail to provide fairly or enough.",
    hints: ["Who decided before? Who decides now?", "What might happen if a private firm ran these services?"],
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "\"Every economy today is a mixed economy, so the differences between economic systems no longer matter.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the main differences between a market economy and a planned economy.",
        points: [
          "Ownership: private in a market economy; state in a planned economy.",
          "Decision-making: consumers and firms through prices versus central planners.",
          "Motive: profit and consumer satisfaction versus social targets set by the state.",
          "Allocation: by ability to pay versus by the plan (rationing, need, fixed prices).",
        ],
        modelAnswer: "In a market economy resources are privately owned, while in a planned economy the state owns them. Market decisions are made by consumers and firms through the price mechanism; planned decisions are made by a central authority. Market firms seek profit; planners aim to meet social targets. Goods go to those who can pay in a market economy, but are allocated according to the plan in a planned economy.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Discuss whether the differences between economic systems still matter.",
        points: [
          "Agrees in part: almost all economies are mixed, so pure systems hardly exist.",
          "But the balance differs a great deal between mixed economies (some close to market, some with large state sectors).",
          "The balance affects choice, efficiency, inequality and the provision of public services, so it still matters.",
          "Justified conclusion.",
        ],
        levels: LV4,
        modelAnswer: "It is true that pure market and pure planned economies hardly exist, since nearly every country mixes private firms with state provision. However, mixed economies differ greatly: some leave almost everything to markets, while others have large state sectors and many price controls. This balance affects how much choice consumers have, how efficiently resources are used and how equally income is shared. So the differences still matter, but as differences of degree within mixed economies rather than between pure systems.",
      }),
    ],
    explanation: "The systems differ in ownership, decision-making, motive and allocation. Most economies are mixed, but the balance between market and state still has important effects.",
    hints: ["Ownership, decisions, motive, allocation.", "How do mixed economies differ from each other?"],
  });

  b.card("DEFINITION", "What is an **economic system**?", "The way a country organises the ownership of resources and decisions about what, how and for whom to produce.");
  b.card("DEFINITION", "Define a **market (free enterprise) economy**.", "Resources are privately owned and decisions are made by consumers and firms through the price mechanism, with limited government.");
  b.card("DEFINITION", "Define a **planned (command) economy**.", "The state owns resources and a central planning authority decides what, how and for whom to produce.");
  b.card("DEFINITION", "Define a **mixed economy**.", "Both the private sector and the public sector own resources and allocate them; prices and the government both decide.");
  b.card("CONCEPT", "How does a market economy answer *for whom*?", "Goods go to those willing and able to pay: income decides.");
  b.card("CONCEPT", "How does a planned economy answer *what*?", "Planners set output targets for each industry.");
  b.card("CONCEPT", "What is **consumer sovereignty**?", "The idea that consumers' spending decides what firms produce in a market economy.");
  b.card("FACT", "What is the public sector?", "The part of the economy owned or run by the government (departments and state-owned enterprises or parastatals).");
});
