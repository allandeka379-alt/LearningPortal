// W2a: enterprise, enterprising and the entrepreneur (enterpriser) (COM, BES, CAM).
import { concept, P, money, fmt, BES, COM } from "../lib.mjs";

concept("bus.enterprise.entrepreneurship", { file: "enterprise/entrepreneurship", keyPrefix: "enterprise.entrepreneurship" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the reward for enterprise as a factor of production?",
    options: [
      ["Profit", "Correct: profit rewards the risk taken by the entrepreneur."],
      ["Wages", "Wages are the reward for labour."],
      ["Rent", "Rent is the reward for land."],
      ["Interest", "Interest is the reward for capital."],
    ],
    answer: "A",
    explanation: "Land earns rent, labour earns wages, capital earns interest and enterprise earns profit.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which best describes an entrepreneur?",
    options: [
      ["A person who takes risks to start and organise a business", "Correct: identifies opportunities and organises resources."],
      ["A person who works for a fixed wage in a factory", "That is an employee providing labour."],
      ["A person who lends money to businesses at interest", "That is a lender providing capital."],
      ["A person who owns land and rents it out", "That is a landlord providing land."],
    ],
    answer: "A",
    explanation: "An entrepreneur (enterpriser) identifies an opportunity, risks money and time, and organises land, labour and capital.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tatenda invents a cheaper way to dry mangoes using solar heat. Which quality of an entrepreneur does this show?",
    options: [
      ["Innovation", "Correct: a new, better way of doing something."],
      ["Leadership", "Leadership is about directing and motivating people."],
      ["Negotiation", "Negotiation is about bargaining with others."],
      ["Record keeping", "Record keeping is about accounts."],
    ],
    answer: "A",
    explanation: "Innovation and creativity mean finding new products or better methods.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **drawback** of being an entrepreneur?",
    options: [
      ["Income is irregular and not guaranteed", "Correct: there is no fixed wage, especially at first."],
      ["Being able to make your own decisions", "Independence is a benefit."],
      ["Keeping the profit you earn", "This is a benefit."],
      ["Satisfaction from building a business", "This is a benefit."],
    ],
    answer: "A",
    explanation: "Entrepreneurs face risk, irregular income, long hours and stress; benefits include independence, profit and satisfaction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does enterprise benefit the economy?",
    options: [
      ["New businesses create jobs and raise output", "Correct: enterprise drives employment and growth."],
      ["It reduces competition between businesses", "New businesses increase competition."],
      ["It raises unemployment in the economy", "Enterprise reduces unemployment."],
      ["It ends the need for government services", "Enterprise does not replace public services."],
    ],
    answer: "A",
    explanation: "Enterprise creates jobs, output, innovation, competition, tax revenue and exports.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After two failed attempts, Chipo opens a third shop and finally succeeds. Which quality is most clearly shown?",
    options: [
      ["Determination", "Correct: she persisted after setbacks."],
      ["Creativity", "Nothing new or original is described."],
      ["Negotiation", "No bargaining is described."],
      ["Communication", "Nothing is said about how she explains ideas."],
    ],
    answer: "A",
    explanation: "Determination (resilience) means continuing after failures, which most entrepreneurs face.",
    hints: ["What did Chipo do after failing?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is a willingness to take risks essential for an entrepreneur?",
    options: [
      ["Profit is never guaranteed when starting a business", "Correct: any new business may fail."],
      ["Risk-taking always leads to higher profits", "Risk can lead to losses as well as profit."],
      ["The law requires entrepreneurs to borrow money", "There is no such requirement."],
      ["Entrepreneurs never lose their own money", "They can lose their savings."],
    ],
    answer: "A",
    explanation: "Starting any business means investing money and time with no guarantee of success, so entrepreneurs must accept risk.",
    hints: ["Can any new business be sure of success?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Only business owners can be enterprising.",
    answer: false,
    explanation: "False. Employees, pupils and community members are enterprising when they show initiative and organise people to act.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Enterprise skills such as planning and problem-solving can be learned.",
    answer: true,
    explanation: "True. Skills can be learned and practised, for example through school enterprise projects.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each factor of production with its reward.",
    pairs: [["Land", "Rent"], ["Labour", "Wages"], ["Capital", "Interest"], ["Enterprise", "Profit"]],
    explanation: "Each factor of production earns a reward; profit is the reward for enterprise.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each action with the entrepreneurial quality it shows.",
    pairs: [
      ["Uses her savings to open a shop with no guarantee of success", "Risk-taking"],
      ["Persuades a supplier to give 60 days' credit", "Negotiation"],
      ["Motivates her staff to meet a busy weekend's orders", "Leadership"],
      ["Designs a new phone-charging kiosk powered by solar panels", "Innovation"],
    ],
    explanation: "Link each action to the quality it demonstrates.",
    hints: ["Ask what each action needs: courage, bargaining, motivating others or new ideas?"],
  });
  b.fib({
    d: 2, applies: BES,
    stem: "Complete the sentence using Business Enterprise and Skills terms.",
    template: "A person who starts and runs an enterprise is called an {{blank:a}}; someone who shows initiative and acts on opportunities is described as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["enterpriser", "entrepreneur"] },
      { id: "b", accepted: ["enterprising"] },
    ],
    wrong: [["employee", "employed"]],
    explanation: "BES uses enterpriser (entrepreneur) and enterprising.",
  });
  b.short({
    d: 2,
    stem: "Name the factor of production that organises land, labour and capital and bears the risk.",
    accepted: ["enterprise", "entrepreneurship", "the entrepreneur", "entrepreneur", "enterpriser"],
    wrong: ["capital", "labour"],
    explanation: "**Enterprise** (provided by the entrepreneur) combines the other factors and bears the risk.",
  });
  {
    const savings = 2400, loan = 1600, total = savings + loan, pct = (savings / total) * 100;
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: pct, calculator: true, daily: true,
      stem: `Sipho starts a car-wash business with ${money(savings)} of his own savings and a ${money(loan)} loan from his uncle. What percentage of the start-up capital is Sipho risking from his own savings (to one decimal place)?`,
      wrong: [(loan / total) * 100, (savings / loan) * 100],
      explanation: `Total = ${fmt(savings)} + ${fmt(loan)} = ${fmt(total)}; ${fmt(savings)} ÷ ${fmt(total)} × 100 = ${pct.toFixed(1)}%.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** qualities of a successful entrepreneur.",
    points: [
      "Quality 1 identified, e.g. risk-taking (1)",
      "Explained, e.g. needed because any new business may fail and savings may be lost (1)",
      "Quality 2 identified, e.g. innovation / determination / leadership / self-confidence (1)",
      "Explained, e.g. makes the business different from competitors / keeps going after setbacks (1)",
    ],
    modelAnswer: "A successful entrepreneur is willing to take risks, because starting any business means investing savings with no guarantee of success. She is also determined, which keeps her going when early problems arise, such as a supplier letting her down.",
    explanation: "Name each quality and explain why it helps the business succeed.",
    hints: ["Why would the quality matter to a new business?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Nyasha has a secure job as a bank clerk but wants to start her own catering business. Discuss whether she should become an entrepreneur.",
    points: [
      "Benefit: independence / own decisions (1)",
      "Benefit: profit could exceed her salary / satisfaction (1)",
      "Drawback: loses a secure, regular salary (1)",
      "Drawback: risk of losing savings / long hours / stress (1)",
      "Suggests a way to reduce risk, e.g. start part-time / keep job at first (1)",
      "Justified conclusion (1)",
    ],
    modelAnswer: "Running her own catering business would give Nyasha independence and the chance to earn more than her salary, as well as the satisfaction of building something of her own. However, she would give up a secure income, risk her savings and work long hours. She should start by catering for weekend events while keeping her job, and leave only when the business earns enough to replace her salary.",
    explanation: "Weigh benefits against drawbacks for Nyasha and reach a reasoned decision.",
    hints: ["What does she gain and what does she give up?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: "Farai, 22, noticed that people in his Chinhoyi suburb travelled to town to repair phones. He spent US\\$650 of savings on tools and spare parts and opened a stall. When a bigger shop opened nearby, he began offering home visits and repairs within one hour. In his first three months he earned US\\$1,320 in repair fees and spent US\\$840 on parts and stall rent.",
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: 1320 - 840,
        stem: "Calculate Farai's profit for the three months.",
        wrong: [1320, 1320 - 840 - 650],
        explanation: "1,320 − 840 = US\\$480.",
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Offering home visits and one-hour repairs shows which quality?",
        options: [["Innovation", "Correct: new ways to compete."], ["Risk aversion", "He took risks, he did not avoid them."], ["Dependence", "Not an entrepreneurial quality."], ["Caution", "He acted boldly."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** other entrepreneurial qualities Farai shows.",
        points: ["Quality 1, e.g. risk-taking (1)", "Evidence: invested US\\$650 of savings (1)", "Quality 2, e.g. spotting opportunities / initiative / determination (1)", "Evidence: noticed people travelling to town / responded to new competitor (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate the importance of enterprises like Farai's to the local community.",
        points: [
          "Saves residents time and transport costs (1)",
          "Creates self-employment / may employ others later (1)",
          "Competition improves service and prices (1)",
          "Limitation: small scale / informal, little tax / few jobs (1)",
          "Develops skills and role models for other young people (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Farai's stall saves residents the time and fare of travelling to town and gives him self-employment. Competition with the bigger shop has improved service for customers, with one-hour repairs. On its own it creates few jobs and may pay little tax, but it shows other young people that they can start businesses. Small enterprises like this are important because many together create jobs and services across the community.",
      }),
    ],
    explanation: "Profit = US\\$1,320 − US\\$840 = US\\$480. Farai shows risk-taking, spotting opportunities and innovation.",
    hints: ["Profit = income − costs for the period.", "Find evidence in the case for each quality."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, secs: 660, applies: COM,
    stem: "A Form 1 class visits Thandeka, who runs a successful bakery in Kwekwe. She tells them she started with one oven, worked 14-hour days, and now employs nine people.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **enterprise**.",
        points: ["Willingness to take risks (1)", "And organise land, labour and capital to start and run a business (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "State **three** qualities Thandeka is likely to have.",
        points: ["Hard work / determination (14-hour days) (1)", "Risk-taking (1)", "Leadership / planning / creativity (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** ways Thandeka's bakery benefits the economy.",
        points: ["Creates jobs: nine employees (1)", "Workers earn incomes and spend locally (1)", "Pays taxes / buys from suppliers / supplies bread locally (1)", "Funds public services / supports other businesses (1)"],
      }),
    ],
    explanation: "Enterprise combines factors of production and takes risks; enterprises create jobs, incomes and taxes.",
    hints: ["What does an entrepreneur combine?", "Look for evidence in the case."],
  });
  b.card("DEFINITION", "Enterprise", "The willingness and ability to take risks and organise land, labour and capital to run a business.");
  b.card("DEFINITION", "Entrepreneur (enterpriser)", "A person who identifies an opportunity, takes risks and organises resources to produce goods or services.");
  b.card("DEFINITION", "Enterprising", "Showing initiative: spotting opportunities and acting on them with energy and creativity.", null, { applies: BES });
  b.card("FACT", "Rewards of the factors of production", "Land: rent. Labour: wages. Capital: interest. Enterprise: profit.");
  b.card("CONCEPT", "Qualities of successful entrepreneurs", "Risk-taking, innovation, determination, self-confidence, leadership, communication, decision-making, planning.");
  b.card("CONCEPT", "Benefits of being an entrepreneur", "Independence, profit, personal satisfaction, flexibility, recognition.");
  b.card("CONCEPT", "Drawbacks of being an entrepreneur", "Risk of losing savings, irregular income, long hours and stress, no paid leave or pension.");
  b.card("CONCEPT", "Importance of enterprise to the economy", "Jobs, output, innovation, competition, tax revenue, exports, use of local resources.");
  b.card("CONCEPT", "Skill or quality?", "Skills (planning, record keeping) can be learned; qualities (determination, self-confidence) are personal characteristics.");
});
