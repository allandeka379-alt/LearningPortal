// W1a: the basic economic problem, scarcity, economic and free goods, the three questions.
import { concept, P } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];

concept("econ.basics.scarcity", { file: "basics/scarcity", keyPrefix: "basics.scarcity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **basic economic problem**?",
    options: [
      ["Finite resources cannot satisfy unlimited wants, so choices must be made", "Correct: both halves (limited resources, unlimited wants) and the need to choose."],
      ["Prices rise faster than incomes, so people cannot afford the goods they need", "This describes falling real incomes, a result of inflation, not the basic problem."],
      ["Some workers cannot find jobs, so resources are wasted in every economy", "Unemployment is one problem an economy may have; scarcity exists even at full employment."],
      ["Firms produce more goods than consumers want, so many goods are left unsold", "That is a surplus in one market; the basic problem is the opposite, wants exceed resources."],
    ],
    answer: "A",
    explanation: "The basic economic problem is scarcity: resources (land, labour, capital, enterprise) are finite while wants are unlimited, so every consumer, firm and government must choose.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **need** rather than only a want?",
    options: [
      ["Safe drinking water", "Correct: water is essential for survival."],
      ["A mobile phone", "Useful, but people can survive without one: a want."],
      ["A trip to Victoria Falls", "A holiday is a want, not essential for survival."],
      ["A television set", "A television is a want."],
    ],
    answer: "A",
    explanation: "Needs are goods and services essential for survival (food, water, shelter, basic clothing). Everything else people desire is a want.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is the best example of a **free good**?",
    options: [
      ["Sunlight on a farm in Mashonaland", "Correct: sunlight is not scarce, so using it has no opportunity cost."],
      ["Textbooks handed out free by a school", "Paper, printing and transport use scarce resources: an economic good provided at no charge."],
      ["Tap water supplied to homes in Bulawayo", "Pumping, pipes and treatment use scarce resources: an economic good."],
      ["Maize seed given to farmers by a donor", "Seed is produced with scarce land and labour: an economic good."],
    ],
    answer: "A",
    explanation: "A free good is not scarce: there is so much of it that one person's use leaves no less for others, so it has no opportunity cost. A good given away without charge still uses scarce resources, so it is an economic good.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a government that provides free primary education still face the basic economic problem?",
    options: [
      ["Teachers and classrooms are scarce resources that have other uses", "Correct: the service uses scarce resources, so there is an opportunity cost."],
      ["Parents must pay for the lessons through school fees every term", "The question says education is free to parents; the cost falls on the government."],
      ["Free education is a free good with no opportunity cost to anyone", "It is an economic good: resources used for it could fund clinics or roads."],
      ["Education is a need, so it is not affected by scarcity at all", "Needs are also produced with scarce resources."],
    ],
    answer: "A",
    explanation: "A zero price does not remove scarcity. Teachers, buildings and books paid for from limited tax revenue could have been used for something else, so the government must still choose.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A mining company in Hwange decides whether to extract coal with many workers using hand tools or with a few workers using large machines. Which basic economic question is it answering?",
    options: [
      ["How to produce", "Correct: the choice is between methods (labour-intensive or capital-intensive)."],
      ["What to produce", "The product (coal) is already decided."],
      ["For whom to produce", "That question is about who receives the output."],
      ["When to produce", "This is not one of the three basic economic questions."],
    ],
    answer: "A",
    explanation: "*How to produce* is about the combination of resources and methods used, for example labour-intensive or capital-intensive production.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A town council decides that new market stalls will go first to vendors with disabilities and then to the longest-serving vendors. Which basic economic question is it answering?",
    options: [
      ["For whom to produce", "Correct: the council is deciding who receives the stalls."],
      ["What to produce", "Building stalls was already decided; this is about who gets them."],
      ["How to produce", "No choice of production method is described."],
      ["Where to produce", "Location is not one of the three basic questions."],
    ],
    answer: "A",
    explanation: "*For whom to produce* is about how output is distributed among people: by ability to pay, by need, or by another rule.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a good harvest year a country produces more maize than in any year before, but households still want more maize than is available at a zero price. What does this show?",
    options: [
      ["Maize is still scarce, because wants exceed what is available", "Correct: scarcity compares wants with resources, not with past output."],
      ["Maize has become a free good because output is a record", "A free good has no opportunity cost; maize still uses land, labour and seed."],
      ["The basic economic problem has been solved for maize", "Wants are still greater than supply, so the problem remains."],
      ["Maize is no longer an economic good, as no choice is needed", "Land used for maize could grow other crops, so a choice was made."],
    ],
    answer: "A",
    explanation: "Scarcity is relative: a good is scarce whenever the resources available cannot satisfy all wants for it. A record harvest moves the limit but does not remove it.",
    hints: ["Scarcity is a comparison between two things.", "Would people want more maize if it cost nothing?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about scarcity is correct?",
    options: [
      ["Rich countries also face scarcity because their wants also grow", "Correct: higher income moves the limit but wants keep growing."],
      ["Scarcity affects only poor countries with low incomes per head", "All countries have finite resources and unlimited wants."],
      ["Scarcity disappears once every person's needs are satisfied", "Wants go beyond needs and are unlimited, so scarcity remains."],
      ["Scarcity applies to goods but never to time or labour", "Time and labour are limited too: a worker must choose how to use her hours."],
    ],
    answer: "A",
    explanation: "Scarcity is universal: every economy, rich or poor, has finite resources and unlimited wants. Even time is scarce.",
    hints: ["Do wants stop growing when incomes rise?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Resources such as land, labour and capital are finite, while human wants are unlimited.",
    answer: true,
    explanation: "True. This is the starting point of the basic economic problem.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A good that is sold at a price of zero must be a free good.",
    answer: false,
    explanation: "False. A free good is one with no opportunity cost because it is not scarce. Goods given away at no charge (free textbooks, a free vaccination campaign) still use scarce resources, so they are economic goods.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each decision to the basic economic question it answers.",
    pairs: [
      ["A farmer decides to grow soya beans instead of tobacco", "What to produce"],
      ["A bakery replaces hand mixing with an electric mixer", "How to produce"],
      ["Food aid is given first to households with young children", "For whom to produce"],
    ],
    explanation: "Choosing the product answers *what*; choosing the method answers *how*; choosing who receives the output answers *for whom*.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The basic economic problem exists because resources are {{blank:a}} while wants are {{blank:b}}, so people must make {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["finite"], choices: ["finite", "unlimited", "free"] },
      { id: "b", accepted: ["unlimited"], choices: ["limited", "unlimited", "fixed"] },
      { id: "c", accepted: ["choices"], choices: ["choices", "profits", "savings"] },
    ],
    explanation: "Finite resources and unlimited wants mean choices must be made: the basic economic problem.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Explain how a **worker** faces the basic economic problem. Give an example.",
    points: [
      "Identifies the worker's limited resource: time (hours in the day) or skills/income.",
      "Explains with an example that using it one way means not using it another, so the worker must choose (for example overtime versus evening classes).",
    ],
    explanation: "Workers face scarcity of time and skills: every hour spent one way cannot be spent another way, so they must choose.",
    modelAnswer: "A worker has only 24 hours a day, so time is scarce. If Tatenda works overtime on Saturdays he cannot use those hours to attend a computer course, so he must choose between extra income now and better skills later.",
    hints: ["Which resource does every worker have only a limited amount of?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between an economic good and a free good, using one example of each.",
    points: [
      "An economic good is produced with scarce resources and has an opportunity cost.",
      "A free good is not scarce: it has no opportunity cost because using it leaves no less for others.",
      "Gives a correct example of each (for example maize meal and air/sunlight).",
    ],
    explanation: "The difference is opportunity cost: economic goods use scarce resources that have other uses; free goods do not.",
    modelAnswer: "An economic good, such as maize meal, uses scarce land, labour and capital, so producing it means giving up something else. A free good, such as the air we breathe, is so plentiful that one person's use leaves no less for others, so it has no opportunity cost.",
    hints: ["Use the idea of opportunity cost in both definitions."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Rudo runs a small poultry business near Chinhoyi. She has US\\$600 of savings, a fowl run that holds 300 birds and two part-time helpers. Customers in town have asked her for broiler chickens, eggs and day-old chicks, and the local school wants her to supply eggs every week. She cannot meet all of these orders.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Identify two of Rudo's scarce resources by choosing from the lists.",
        template: "Capital: {{blank:a}}. Labour: {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["the fowl run"], choices: ["the fowl run", "the customers", "the school"] },
          { id: "b", accepted: ["the two helpers"], choices: ["the two helpers", "the eggs", "the orders"] },
        ],
        explanation: "The fowl run is a capital good (a man-made aid to production); the helpers are labour. Customers and orders are sources of wants, not resources.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why Rudo faces the basic economic problem.",
        points: [
          "Her resources (savings, space for 300 birds, two helpers) are limited.",
          "The orders (wants) are greater than she can supply, so she must choose which to meet.",
        ],
        modelAnswer: "Rudo's resources are finite: US\\$600, room for 300 birds and two helpers. Customers want broilers, eggs and chicks in total quantities greater than she can produce, so she must choose which orders to supply.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain one way in which Rudo must answer the question *for whom to produce*.",
        points: [
          "Identifies a group or rule for deciding who receives her output (the school, town customers, those who pay the most).",
          "Explains the reason or consequence (for example a regular school contract gives a steady income, so town customers may get fewer eggs).",
        ],
        modelAnswer: "Rudo must decide whether eggs go to the school or to town customers. If she supplies the school every week she has a reliable buyer, but fewer eggs are left for customers who might pay a higher price.",
      }),
    ],
    explanation: "Scarce resources (savings, the fowl run, labour) cannot meet all the orders, so Rudo must choose what to produce (broilers, eggs or chicks), how and for whom.",
    hints: ["Resources are what she uses to produce; wants are what customers ask for.", "For whom = who receives the output."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "A rural district council has a budget for one year. Residents have asked for a new clinic, the repair of a gravel road to the nearest town and a borehole for a village that walks 5 km for water. The council can afford only one of the three projects this year.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Explain why the council faces scarcity.",
        points: [
          "Its budget (finance) is limited.",
          "Residents' demands for projects are greater than the budget, so it must choose one.",
        ],
        modelAnswer: "The council's revenue is finite, but the residents want three projects that together cost more than the budget, so it must choose which to fund.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss which project the council should choose. Consider the benefits of more than one project and reach a justified conclusion.",
        points: [
          "Explains a benefit of the borehole (health, time saved collecting water, especially for women and children).",
          "Explains a benefit of the clinic (treatment close to home, fewer deaths, healthier workers).",
          "Explains a benefit of the road (lower transport costs, farmers reach markets, access to services).",
          "Recognises that choosing one project means giving up the others (opportunity cost).",
          "Considers numbers helped, cost or urgency when comparing projects.",
          "Reaches a justified conclusion (for example the borehole, because clean water is a basic need and cheapest per person helped).",
        ],
        levels: LV6,
        modelAnswer: "A borehole would supply safe water, a basic need, and save villagers walking 5 km, giving them time for farming and school. A clinic would bring treatment closer and cut deaths from illnesses that are treatable early. A repaired road would lower transport costs so farmers can sell crops in town. Whichever is chosen, the others are given up. The borehole helps fewer people than the road, but it meets a basic need and is likely to be the cheapest project, and clean water also reduces the illnesses a clinic would treat. I would choose the borehole this year and plan the clinic next.",
      }),
    ],
    explanation: "Limited funds and many wants force a choice. A strong answer weighs the benefits of each option, names what is given up and justifies one choice.",
    hints: ["Every project helps someone: compare how many and how urgently.", "End with a clear choice and a reason."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the three basic economic questions apply to a government deciding how to spend its health budget.",
    points: [
      "What: which services to provide (for example vaccinations, hospitals or rural clinics).",
      "How: which methods or resources (for example more nurses or more equipment; public or private providers).",
      "For whom: who receives care (everyone free, those who can pay, priority groups such as children).",
      "Links the questions to scarcity: the budget is limited, so every answer involves a choice.",
    ],
    explanation: "Scarce funds force the government to answer what, how and for whom for health care, just as for any other spending.",
    modelAnswer: "Because the health budget is limited, the government must decide what to provide, for example rural clinics or a new hospital; how to provide it, for example by training more nurses or buying more equipment; and for whom, for example free care for children and pregnant women first. Each decision uses scarce funds that could have been used elsewhere.",
    hints: ["Take each question in turn and give a health example.", "Why must the government answer them at all?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which situation would **not** remove the basic economic problem for a country?",
    options: [
      ["A large discovery of lithium that doubles the value of exports", "Correct: more resources move the limit, but wants are still unlimited, so scarcity remains."],
      ["Every resource becoming unlimited in supply for ever", "If resources were unlimited, all wants could be met: scarcity would end."],
      ["People's wants becoming fixed and smaller than output", "If wants were limited and fully met, there would be no scarcity."],
      ["Every good becoming a free good with no opportunity cost", "If every good were free, nothing would be scarce."],
    ],
    answer: "A",
    explanation: "Scarcity can only disappear if resources become unlimited or wants become limited and satisfied. A resource discovery increases what can be produced but does not end scarcity.",
    hints: ["Scarcity ends only if one of its two causes disappears.", "Does a discovery make resources unlimited?"],
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, examStyle: true,
    stem: "\"Free goods are becoming scarcer.\" Discuss this statement using examples such as clean air in cities and fresh water in rural areas.",
    points: [
      "Defines a free good: not scarce, no opportunity cost.",
      "Explains why clean air in a busy city may become scarce (pollution from vehicles and industry means resources must be used to keep it clean).",
      "Explains why fresh water may become scarce (drought, population growth, irrigation demand).",
      "Explains that once a good needs resources to provide or protect it, it becomes an economic good with an opportunity cost.",
      "Recognises the other side: sunlight and air in rural areas remain plentiful and free.",
      "Notes that some goods are free in one place or time but scarce in another.",
      "Uses at least one relevant Zimbabwean or everyday example correctly.",
      "Reaches a justified conclusion on how far the statement is true.",
    ],
    levels: [
      [3, 6, 8, "Two-sided analysis, developed, with a justified conclusion."],
      [2, 4, 5, "Some analysis of both sides or one side well developed, limited conclusion."],
      [1, 1, 3, "Simple points, little explanation."],
    ],
    wordLimit: { max: 400 },
    explanation: "Goods are free only while they are not scarce. Pollution, drought and population growth can give a free good an opportunity cost, turning it into an economic good; a good answer shows both sides and concludes.",
    modelAnswer: "A free good is one that is so plentiful that using it has no opportunity cost. Some goods that used to be free are becoming economic goods. In busy city centres, exhaust fumes and smoke reduce air quality, so councils must spend resources on monitoring and controls: clean air now has an opportunity cost. In some rural areas, drought and the growth of irrigated farming mean rivers dry up earlier in the year, so boreholes and pumps are needed to obtain water. On the other hand, sunlight and the air in most rural areas remain plentiful, and one person's use does not reduce anyone else's. Whether a good is free depends on the place and time. Overall the statement is partly true: pollution and population growth are turning some goods that were free into economic goods, but truly free goods still exist.",
    hints: ["Start from the definition of a free good.", "What makes a free good start to have an opportunity cost?", "Give the other side before concluding."],
  });

  b.card("DEFINITION", "What is **scarcity**?", "The situation in which finite resources are not enough to satisfy all of people's wants.");
  b.card("DEFINITION", "Define the **basic economic problem**.", "Finite (limited) resources cannot satisfy unlimited wants, so choices must be made.");
  b.card("DEFINITION", "What is the difference between a **need** and a **want**?", "A need is essential for survival (food, water, shelter); a want is anything people would like to have. Wants are unlimited.");
  b.card("DEFINITION", "What is an **economic good**?", "A good produced with scarce resources, so it has an opportunity cost (for example maize meal).");
  b.card("DEFINITION", "What is a **free good**?", "A good that is not scarce, so using it has no opportunity cost (for example air or sunlight).");
  b.card("CONCEPT", "Is a textbook given out free by the government a free good?", "No. It uses scarce paper, printing and transport, so it is an economic good provided at a zero price.");
  b.card("CONCEPT", "What are the three basic economic questions?", "What to produce, how to produce, and for whom to produce.");
  b.card("CONCEPT", "Which basic question is about labour-intensive versus capital-intensive methods?", "How to produce.");
  b.card("FACT", "Do rich countries face the basic economic problem?", "Yes: their resources are still finite and their wants keep growing.");
});
