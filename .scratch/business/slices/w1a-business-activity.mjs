// W1a: business activity, needs and wants, factors of production (COM, BES, CAM).
import { concept, P } from "../lib.mjs";

concept("bus.production.business-activity", { file: "production/business-activity", keyPrefix: "production.business-activity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **need** rather than a want?",
    options: [
      ["Clean drinking water", "Correct: water is essential for survival, so it is a need."],
      ["A flat-screen television", "Useful and enjoyable, but people can survive without it: a want."],
      ["A holiday at Victoria Falls", "A holiday is a want; it is not required for survival."],
      ["A second pair of trainers", "Extra clothing beyond what is essential is a want."],
    ],
    answer: "A",
    explanation: "Needs are goods and services required for survival: food, water, shelter and basic clothing. Everything beyond these is a want.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the reward for **enterprise** as a factor of production?",
    options: [
      ["Profit", "Correct: the entrepreneur bears the risk and receives the profit (or suffers the loss)."],
      ["Interest", "Interest is the reward for capital."],
      ["Rent", "Rent is the reward for land."],
      ["Wages", "Wages and salaries are the reward for labour."],
    ],
    answer: "A",
    explanation: "Land earns rent, labour earns wages and salaries, capital earns interest and enterprise earns profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A furniture workshop in Kwekwe buys a new electric saw. As a factor of production, the saw is:",
    options: [
      ["capital", "Correct: a man-made tool used to make other goods is capital."],
      ["land", "Land is natural resources such as timber in a forest, not a manufactured tool."],
      ["labour", "Labour is human effort; the carpenter using the saw is labour."],
      ["enterprise", "Enterprise is the organising and risk-taking done by the owner."],
    ],
    answer: "A",
    explanation: "Capital is man-made goods (tools, machines, buildings, vehicles) used to produce other goods and services.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Chipo has US\\$300. She can either buy a sewing machine for her dressmaking business or pay for a short bookkeeping course. She buys the sewing machine. What is her opportunity cost?",
    options: [
      ["The bookkeeping course she did not take", "Correct: the next best alternative given up is the course."],
      ["The US\\$300 she spent on the machine", "The money spent is the price, not the alternative given up."],
      ["The sewing machine she has bought", "The machine is what she chose, not what she gave up."],
      ["All the things US\\$300 could ever buy", "Opportunity cost is the single next best alternative, not every possible use."],
    ],
    answer: "A",
    explanation: "Opportunity cost is the next best alternative forgone when a choice is made. Chipo's only other option was the course.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **producer good**?",
    options: [
      ["An oven in a bakery", "Correct: the bakery uses the oven to make bread for sale."],
      ["A loaf bought by a family", "A loaf bought for the family's own use is a consumer good."],
      ["A radio in a family home", "A radio used at home is a consumer good."],
      ["A school uniform", "A uniform bought for a pupil is a consumer good."],
    ],
    answer: "A",
    explanation: "Producer (capital) goods are used by businesses to make other goods and services. Consumer goods are bought by households for their own use.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does scarcity exist?",
    options: [
      ["Wants are unlimited but resources are limited", "Correct: this is the basic economic problem."],
      ["Businesses charge prices that are too high", "High prices may limit what one person can buy, but scarcity exists whatever the price."],
      ["Governments do not print enough money", "Printing money does not create more land, labour or capital."],
      ["People do not work hard enough to produce", "Even with maximum effort, resources stay limited compared with wants."],
    ],
    answer: "A",
    explanation: "Scarcity exists because the resources available (land, labour, capital, enterprise) are limited while human wants are unlimited, so choices must be made.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A mining company in Zvishavane pays royalties to use a mineral deposit, pays its geologists monthly salaries, borrows money to buy drilling rigs and pays dividends to its owners. Which factor of production is rewarded by the monthly salaries?",
    options: [
      ["Labour", "Correct: geologists supply mental and physical effort and are paid salaries."],
      ["Land", "The mineral deposit is land; its reward is rent (here royalties), not salaries."],
      ["Capital", "The drilling rigs are capital, rewarded through the interest on the loan."],
      ["Enterprise", "The owners bear the risk and receive profit (dividends), not salaries."],
    ],
    answer: "A",
    explanation: "Each payment matches a factor: royalties for the mineral deposit (land), salaries for the geologists (labour), interest for borrowed capital and profit for the owners' enterprise.",
    hints: ["Ask who or what receives each payment.", "Salaries are paid to people for their work."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Money is one of the four factors of production.",
    answer: false,
    explanation: "False. Money is used to buy factors, but it is not a factor itself. The four factors are land, labour, capital (man-made goods such as machines) and enterprise.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The same sewing machine can be a consumer good in one household and a producer good in a tailoring business.",
    answer: true,
    explanation: "True. What matters is how the good is used: for personal use it is a consumer good; for making goods for sale it is a producer good.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each factor of production with its reward.",
    pairs: [["Land", "Rent"], ["Labour", "Wages and salaries"], ["Capital", "Interest"], ["Enterprise", "Profit"]],
    explanation: "Land → rent; labour → wages and salaries; capital → interest; enterprise → profit.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Thandeka runs a poultry project near Bulawayo. Match each resource with the factor of production it represents.",
    pairs: [["The plot on which the fowl runs stand", "Land"], ["The two workers who feed the birds", "Labour"], ["The incubator and the feeders", "Capital"], ["Thandeka's decision to start the project and accept the risk", "Enterprise"]],
    explanation: "Natural resources (the plot) are land; human effort is labour; man-made equipment is capital; organising and risk-taking is enterprise.",
  });
  b.fib({
    d: 2,
    stem: "Complete the description of the production function.",
    template: "A business takes {{blank:a}} such as materials and labour, carries out a {{blank:b}} on them, and produces {{blank:c}} that are sold to customers.",
    blanks: [
      { id: "a", accepted: ["inputs"], choices: ["inputs", "outputs", "profits", "process"] },
      { id: "b", accepted: ["process"], choices: ["process", "profit", "input", "want"] },
      { id: "c", accepted: ["outputs"], choices: ["outputs", "inputs", "needs", "factors"] },
    ],
    explanation: "Inputs → process → outputs: resources are transformed into goods and services.",
  });
  b.short({
    d: 2,
    stem: "Name the factor of production that organises land, labour and capital and bears the risk of the business.",
    accepted: ["enterprise", "entrepreneurship", "the entrepreneur", "entrepreneur", "enterpriser", "the enterpriser"],
    wrong: ["capital", "management"],
    explanation: "Enterprise (supplied by the entrepreneur or enterpriser) brings the other factors together and bears the risk; its reward is profit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the term **opportunity cost**, using an example of a decision made by a small business.",
    points: [
      "Defines opportunity cost as the next best alternative given up (forgone) (1)",
      "Gives a realistic business choice between two options (1)",
      "Identifies the option given up as the opportunity cost in the example (1)",
    ],
    modelAnswer: "Opportunity cost is the next best alternative given up when a choice is made. For example, a tuck shop owner who spends her savings on a fridge cannot use the same money to buy more stock; the extra stock is the opportunity cost.",
    explanation: "A full answer defines the term and applies it: two choices, one chosen, and the one given up named as the opportunity cost.",
    hints: ["Start with the definition.", "Then describe a choice between two things and say which was given up."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why enterprise is often described as the most important factor of production.",
    points: [
      "Enterprise organises / combines the other factors of production (1)",
      "Without it, land, labour and capital would not be used to produce anything (1)",
      "The entrepreneur makes key decisions on what, how and how much to produce (1)",
      "The entrepreneur bears the risk of loss, which other factors do not (1)",
    ],
    modelAnswer: "Land, labour and capital do not produce anything on their own: someone must decide what to produce, how to produce it and how much, and then bring the factors together. That is enterprise. The entrepreneur also takes the risk of losing the money invested if the business fails, which encourages new products and businesses to be started. Without enterprise the other factors would stay unused.",
    explanation: "Credit goes for the organising role, the decision-making role and the risk-bearing role, each explained.",
    hints: ["What happens to land, labour and capital if nobody organises them?", "Who carries the risk if the business fails?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Nyasha has a plot of land near Gweru and US\\$2,000 of savings. She is choosing between two projects:\n\n- **Project 1:** a broiler chicken project using a fowl run she would build on her land, with one hired worker.\n- **Project 2:** renting out the plot to a neighbour and putting her savings into a grinding mill that she would operate herself in a shopping centre.\n\nShe can afford only one project.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "In Project 1, which factor of production is the hired worker?",
        options: [["Labour", "Correct: human effort paid with wages."], ["Capital", "Capital is man-made equipment such as the fowl run."], ["Land", "Land is the plot and other natural resources."], ["Enterprise", "Enterprise is Nyasha's organising and risk-taking."]],
        answer: "A",
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "If Nyasha chooses Project 2, what reward will she receive for the use of her plot?",
        options: [["Rent", "Correct: the reward for land is rent."], ["Interest", "Interest is the reward for capital."], ["Wages", "Wages are paid for labour."], ["Profit", "Profit is the reward for enterprise, here from the mill."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Identify **two** items of capital that Nyasha would need in Project 2.",
        points: ["The grinding mill (1)", "A second relevant item, e.g. a building/shelter, scale, generator, tools (1)"],
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "If Nyasha chooses Project 1, state her opportunity cost and explain why.",
        points: ["Opportunity cost is Project 2 (the rent from the plot and the mill income) (1)", "Because it is the next best alternative she gives up (1)"],
      }),
      P.manual({
        label: "(e)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend which project Nyasha should choose. Justify your answer.",
        points: [
          "Analyses an advantage of Project 1 (e.g. uses her own land, steady demand for chicken) (1)",
          "Analyses a risk/disadvantage of Project 1 (e.g. disease, feed costs, wage bill) (1)",
          "Analyses an advantage of Project 2 (e.g. two incomes: rent and mill; maize milling is in demand) (1)",
          "Analyses a risk/disadvantage of Project 2 (e.g. breakdowns, power cuts, competition from other mills) (1)",
          "Makes a clear recommendation (1)",
          "Justifies it by weighing the points in the context of Nyasha's resources (1)",
        ],
        modelAnswer: "Project 2 gives Nyasha two incomes: rent from the plot with no work or risk, and profit from milling, which is needed in every community. However, mills break down and depend on electricity or fuel, and a shopping centre may already have mills. Project 1 uses her own land, so she pays no rent, and chicken sells well, but birds can die from disease and feed is expensive, and she must pay a worker. I recommend Project 2, because the rent provides a guaranteed income that reduces her overall risk while she builds the milling business, as long as she checks that the shopping centre is not already served by several mills.",
      }),
    ],
    explanation: "(a) labour; (b) rent; (c) the mill and any other man-made equipment; (d) the next best alternative, Project 2; (e) a justified recommendation weighing benefits and risks of both projects.",
    hints: ["Match each resource with land, labour, capital or enterprise.", "For (e), weigh at least one benefit and one risk of each project before deciding."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 660,
    stem: "Sipho runs a car-wash business in Bulawayo. He uses water from a borehole on his yard, two pressure washers and a vacuum cleaner, and he employs three young people. He decided to start the business after noticing that many taxis in the area were not cleaned regularly.",
    parts: [
      P.fib({
        label: "(a)", marks: 4,
        stem: "Identify the factor of production represented by each resource.",
        template: "Borehole water: {{blank:a}}. Pressure washers: {{blank:b}}. The three employees: {{blank:c}}. Sipho's idea and risk-taking: {{blank:d}}.",
        blanks: [
          { id: "a", accepted: ["Land"], choices: ["Land", "Labour", "Capital", "Enterprise"] },
          { id: "b", accepted: ["Capital"], choices: ["Land", "Labour", "Capital", "Enterprise"] },
          { id: "c", accepted: ["Labour"], choices: ["Land", "Labour", "Capital", "Enterprise"] },
          { id: "d", accepted: ["Enterprise"], choices: ["Land", "Labour", "Capital", "Enterprise"] },
        ],
        wrong: [["Capital", "Capital", "Labour", "Enterprise"]],
      }),
      P.tf({ label: "(b)", stem: "The car wash produces a service rather than a good.", answer: true }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how scarcity might affect Sipho's business.",
        points: ["Scarcity means resources are limited (1)", "Applies to the case, e.g. limited borehole water / money for more washers (1)", "Effect: Sipho must choose, e.g. how many cars to wash or whether to hire or buy equipment (1)"],
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Suggest **one** way Sipho could make better use of his labour.",
        points: ["Relevant suggestion, e.g. training, dividing tasks, shift times matched to busy periods (1)", "Explains the benefit to the business (1)"],
      }),
    ],
    explanation: "(a) water is land, washers are capital, employees are labour, Sipho's idea is enterprise. (b) Washing cars is a service. (c) Limited resources force choices. (d) Any realistic way of raising output per worker.",
    hints: ["Natural resources are land; man-made equipment is capital.", "Is anything physical sold to the customer?"],
  });
  b.card("DEFINITION", "Needs", "Goods and services essential for survival: food, water, shelter, basic clothing.");
  b.card("DEFINITION", "Wants", "Goods and services people would like but can live without. Wants are unlimited.");
  b.card("DEFINITION", "Scarcity", "Resources are limited while wants are unlimited, so choices must be made.");
  b.card("DEFINITION", "Opportunity cost", "The next best alternative given up when a choice is made.", "One alternative, not a list, and not the money spent.");
  b.card("CONCEPT", "Production function", "Inputs (factors and materials) → process → outputs (goods and services).");
  b.card("FACT", "The four factors of production and their rewards", "Land → rent; labour → wages and salaries; capital → interest; enterprise → profit.");
  b.card("CONCEPT", "Consumer goods versus producer goods", "Consumer goods are bought by households for their own use; producer (capital) goods are used by businesses to make other goods and services.");
  b.card("CONCEPT", "Why enterprise matters", "The entrepreneur organises land, labour and capital, decides what and how to produce, and bears the risk of loss.");
  b.card("FACT", "Capital in business studies", "Man-made goods used in production (machines, tools, buildings, vehicles), not money.");
});
