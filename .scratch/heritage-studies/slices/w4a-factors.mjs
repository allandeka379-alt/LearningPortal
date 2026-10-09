// W4a: Factors of production and access to them (her.production.factors).
// Reviewer note: SMEDCO named as a state-backed lender to small enterprises; other funds described generally. No
// statistics. Inhibiting factors left to her.production.inhibiting-factors.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.production.factors", { file: "production/factors", keyPrefix: "production.factors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the reward for **labour** as a factor of production?",
    options: [
      ["wages", "Correct: workers earn wages or salaries."],
      ["rent", "Rent is the reward for land."],
      ["interest", "Interest is the reward for capital."],
      ["profit", "Profit is the reward for entrepreneurship."],
    ],
    answer: "A",
    explanation: "Land earns rent, labour earns wages, capital earns interest and entrepreneurship earns profit.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is an example of **land** as a factor of production?",
    options: [
      ["a coal deposit at Hwange", "Correct: minerals are natural resources."],
      ["a tractor on a farm", "A tractor is capital."],
      ["a miner's effort", "Human effort is labour."],
      ["a business owner's planning", "Organising and risk-taking is entrepreneurship."],
    ],
    answer: "A",
    explanation: "Land includes all natural resources: soil, minerals, water, forests and wildlife.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which factor of production brings the others together and takes the risk of running a business?",
    options: [
      ["entrepreneurship", "Correct: the entrepreneur organises production and bears the risk."],
      ["capital", "Capital is man-made resources such as machines."],
      ["labour", "Labour is human effort, not the organising and risk-taking role."],
      ["land", "Land is natural resources."],
    ],
    answer: "A",
    explanation: "Entrepreneurship combines land, labour and capital and takes the risk; its reward is profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A tailor in Kariba buys a sewing machine and some cloth. Which item is **fixed** capital?",
    options: [
      ["the sewing machine", "Correct: it is used again and again."],
      ["the cloth", "Cloth is used up in production: working capital."],
      ["the thread", "Thread is used up: working capital."],
      ["the tailor's skill", "Skill is part of labour (human capital)."],
    ],
    answer: "A",
    explanation: "Fixed capital (machines, buildings) is used repeatedly; working capital (materials, cash) is used up in one cycle.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha wants a bank loan to buy a grinding mill, but the bank asks for security she does not have. Which factor of production is she struggling to obtain?",
    options: [
      ["capital", "Correct: the mill and the money to buy it are capital."],
      ["land", "Land is natural resources, not machines or loans."],
      ["labour", "She is not short of workers."],
      ["entrepreneurship", "She has the idea and the will to take a risk."],
    ],
    answer: "A",
    hints: ["Machines, and the money to buy them, belong to which factor?"],
    explanation: "Lack of collateral is a common barrier to obtaining capital for small businesses.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are education and training described as investment in **human capital**?",
    options: [
      ["They improve the skills of workers, so labour produces more or better", "Correct: skilled labour is more productive."],
      ["Schools and colleges are buildings, so education counts as fixed capital like a factory", "Education is not a building; schools are, but the investment is in people."],
      ["They provide natural resources for production", "Natural resources are land."],
      ["They guarantee every learner a profit later in life", "Training raises productivity; it does not guarantee profit."],
    ],
    answer: "A",
    hints: ["What does training change about a worker?"],
    explanation: "Training raises the quality of labour, which raises output, much as a machine raises output.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which government measure is aimed **mainly** at improving access to **land**?",
    options: [
      ["redistributing farms to families through resettlement", "Correct: resettlement allocates land."],
      ["building vocational training centres", "These improve skills (labour)."],
      ["lending to small enterprises through SMEDCO", "This improves access to capital."],
      ["running enterprise clubs at schools", "These develop entrepreneurship."],
    ],
    answer: "A",
    hints: ["Match each measure with the factor it supplies."],
    explanation: "Resettlement provides land; training improves labour; loans provide capital; enterprise clubs build entrepreneurship.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why wider access to the factors of production can reduce poverty?",
    options: [
      ["More people can produce and earn income instead of depending on a few owners", "Correct: access spreads opportunities to earn."],
      ["It removes the need for anyone in the country to work for wages or salaries ever again", "Wage employment would still exist."],
      ["It makes all goods free for every household", "Goods still have prices."],
      ["It means the country no longer needs any capital", "Capital remains essential for production."],
    ],
    answer: "A",
    hints: ["Who can earn an income when access is wider?"],
    explanation: "When more people can obtain land, skills and capital, more of them produce and earn, so poverty and inequality fall.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Interest is the reward for capital.",
    answer: true,
    explanation: "True. Capital earns interest; land earns rent; labour earns wages; entrepreneurship earns profit.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Money saved in a savings club and used to buy equipment is an example of labour.",
    answer: false,
    explanation: "False. Money used to buy equipment and materials is capital; labour is human effort.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each factor of production with its reward.",
    pairs: [
      ["land", "rent"],
      ["labour", "wages"],
      ["capital", "interest"],
      ["entrepreneurship", "profit"],
    ],
    explanation: "Each factor's owner earns a reward for supplying it.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify the resources used by a baker.",
    template: "The flour mill's machines are {{blank:a}}. The baker's helper supplies {{blank:b}}. The water from the borehole is part of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["capital"], choices: ["capital", "land", "labour", "entrepreneurship"] },
      { id: "b", accepted: ["labour"], choices: ["labour", "capital", "land", "entrepreneurship"] },
      { id: "c", accepted: ["land"], choices: ["land", "labour", "capital", "entrepreneurship"] },
    ],
    explanation: "Machines are capital; human effort is labour; natural resources such as water are land.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the statements about access to factors of production.",
    template: "A family receives an A1 plot through resettlement: this improves access to {{blank:a}}. A youth completes a welding course at a vocational training centre: this improves the quality of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["land"], choices: ["land", "capital", "labour", "entrepreneurship"] },
      { id: "b", accepted: ["labour"], choices: ["labour", "land", "capital", "entrepreneurship"] },
    ],
    hints: ["Which factor is natural resources, and which is human effort and skill?"],
    explanation: "Resettlement gives land; training improves labour.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the reward for entrepreneurship?",
    accepted: ["profit", "profits"],
    wrong: ["interest"],
    explanation: "The entrepreneur earns profit, what remains after paying for the other factors.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State the **four** factors of production and give one example of each from Zimbabwe.",
    points: [
      "Land, with an example (e.g. farmland, minerals, Lake Kariba)",
      "Labour, with an example (e.g. farm workers, teachers, miners)",
      "Capital, with an example (e.g. tractors, sewing machines, buildings)",
      "Entrepreneurship, with an example (e.g. a person starting a poultry project)",
    ],
    modelAnswer: "Land, such as gold deposits; labour, such as miners; capital, such as a tractor; and entrepreneurship, such as a young person starting a poultry project.",
    explanation: "One mark for each factor with a correct example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways the government of Zimbabwe has tried to help people gain access to factors of production.",
    points: [
      "Identifies: land redistribution / resettlement",
      "Develops: allocated land to many families who had little or none, so they can farm",
      "Identifies: loans and funds for small enterprises (e.g. SMEDCO) / training centres / workspaces / input support",
      "Develops: small businesses obtain capital without the collateral banks demand / youths gain skills for jobs",
    ],
    modelAnswer: "Government redistributed land through resettlement, giving many families land they could farm. It has also provided loans to small businesses through bodies such as SMEDCO, so people without the collateral banks demand can buy equipment and stock.",
    hints: ["Choose two factors and say what government did for each."],
    explanation: "One mark for each effort and one for explaining how it helps.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A group of young women in Gwanda want to start a soap-making business but have no capital. Suggest **two** ways they could raise capital, and explain each.",
    points: [
      "Suggests forming a savings club (rounds / mukando) and pooling money",
      "Explains that each member contributes regularly, so they can buy materials without a loan",
      "Suggests applying to a microfinance institution or a fund for women or youth with a business plan",
      "Explains that such lenders give small loans with simpler requirements than banks",
    ],
    modelAnswer: "They could form a savings club and each contribute money every month, so that together they can buy the first materials without borrowing. They could also prepare a simple business plan and apply to a microfinance institution or a fund for women's and youth projects, which give small loans with simpler requirements than banks.",
    hints: ["Think about saving together and about lenders for small projects."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a story in a fictional school magazine, Marondera, 2026",
      "Farai started growing tomatoes on a quarter-hectare plot given to him by his uncle. He used his savings to buy seed, a knapsack sprayer and pipes for drip irrigation. He hired two neighbours at harvest time. Last season he sold his crop to a supermarket in town and plans to rent another plot next year.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which item in the source is **capital**?",
        options: [
          ["the knapsack sprayer", "Correct: a man-made tool used in production."],
          ["the quarter-hectare plot", "The plot is land."],
          ["the two neighbours' work", "Their work is labour."],
          ["Farai's decision to rent more land", "This is part of entrepreneurship."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify the reward Farai pays for **(i)** the neighbours' work and **(ii)** the plot he plans to rent.",
        points: ["(i) wages", "(ii) rent"],
        modelAnswer: "(i) Wages. (ii) Rent.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how Farai shows entrepreneurship.",
        points: [
          "He brings together land, labour and capital (plot, workers, sprayer and pipes)",
          "He takes a risk by using his own savings",
          "He finds a market (supermarket) and plans to expand",
        ],
        modelAnswer: "Farai brings together land, labour and capital: the plot, the neighbours and the sprayer and pipes. He takes a risk by spending his savings without knowing what he will earn, and he finds a buyer in town and plans to expand by renting another plot.",
      }),
    ],
    hints: ["Entrepreneurship means organising, risk-taking and finding markets."],
    explanation: "A source-based practice item applying the factors of production and their rewards.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about access to factors of production in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** difficulties young people face in obtaining factors of production.",
        points: [
          "Capital: banks ask for collateral / high interest",
          "so young people without property cannot borrow to start businesses",
          "Land: shortage of land near towns / land held by older family members",
          "so they cannot start farming or build workshops",
        ],
        modelAnswer: "Many young people cannot obtain capital because banks ask for collateral such as a title deed, which they do not have, so they cannot borrow to start a business. Land is also hard to obtain, especially near towns, and family land is often held by older relatives, so young people cannot start farming projects or build workshops.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Government efforts have greatly improved access to factors of production since 1980.\" How far do you agree?",
        points: [
          ["For: land redistribution to many families; expansion of education and vocational training", 2],
          ["For: funds and microfinance for small enterprises, women and youth; workspaces and input schemes", 2],
          ["Against: funds limited and not reaching everyone; collateral still demanded; land disputes and lack of title deeds; skilled people leaving the country", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Government efforts have improved access in important ways. Land redistribution, especially from 2000, gave many families land. Education and vocational training expanded greatly after independence, improving the quality of labour. Funds and microfinance for small enterprises, women and youth, and workspaces for small manufacturers, have helped some people obtain capital.\n\nHowever, the funds are small compared with the need, and many people cannot reach them. Banks still demand collateral, and many resettled farmers lack title deeds that could secure loans. Many trained people have left the country, so the benefit of training is partly lost.\n\nI partly agree. Access has widened a great deal since 1980, but capital in particular remains hard to obtain for young people and small businesses.",
      }),
    ],
    hints: ["In (b), look at each factor in turn."],
    explanation: "A practice evaluative item on access to factors of production.",
  });

  b.card("DEFINITION", "Factors of production", "The resources used to produce goods and services: land, labour, capital and entrepreneurship.");
  b.card("DEFINITION", "Capital", "Man-made resources used in production (tools, machines, buildings) and the money used to buy them.");
  b.card("DEFINITION", "Entrepreneurship", "The ability to combine the other factors, organise production and take the risk of running a business.");
  b.card("DEFINITION", "Human capital", "The skills and knowledge of workers, built through education and training.");
  b.card("FACT", "Give the reward for each factor of production.", "Land: rent. Labour: wages. Capital: interest. Entrepreneurship: profit.");
  b.card("CONCEPT", "Fixed or working capital: a sewing machine and the cloth?", "The sewing machine is fixed capital (used repeatedly); the cloth is working capital (used up).");
  b.card("CONCEPT", "Name three ways government has widened access to factors of production.", "Land redistribution; loans and funds for small enterprises (e.g. SMEDCO); vocational training and workspaces.");
  b.card("CONCEPT", "Why do many small businesses struggle to obtain capital?", "Banks ask for collateral and charge high interest; many small entrepreneurs have no title deeds or savings.");
  b.card("CONCEPT", "Why does wider access to factors of production matter?", "More people produce and earn, raising output and employment and reducing poverty and inequality.");
});
