// W2a: ZIMSEC Commerce Paper 2 exam-format items: 2 × 7-mark and 1 × 6-mark Section A structured questions and
// 2 × 20-mark Section B essays. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, money, fmt, r2, check, COM } from "../lib.mjs";

const L8 = [[3, 6, 8, "Well-developed explanation of several relevant points, applied with examples."], [2, 3, 5, "Some explanation of relevant points; limited examples."], [1, 1, 2, "Points listed with little or no explanation."]];
const L10 = [[3, 7, 10, "Detailed, accurate description or explanation of a full range of points, each developed with examples."], [2, 4, 6, "Several relevant points with some development."], [1, 1, 3, "A few points listed, little development."]];
const L12 = [[3, 9, 12, "Balanced discussion of both sides, well developed, with a justified conclusion."], [2, 5, 8, "Some discussion of both sides, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points on one side, little explanation, no conclusion."]];

concept("bus.organisation.sole-traders-partnerships", { file: "exam/w2a-commerce", keyPrefix: "exam.w2a-commerce", applies: COM }, (b) => {
  // 7 marks: partnership profit sharing.
  const capT = 14000, capN = 7000, profit = 25200;
  const shT = (profit * capT) / (capT + capN), shN = (profit * capN) / (capT + capN);
  check("shares", shT + shN, profit);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: true, paper: "Paper 2",
    concepts: ["bus.organisation.sole-traders-partnerships"],
    stem: `Tendai and Nyasha run a hardware business in Masvingo as partners. Tendai contributed ${money(capT)} of capital and Nyasha ${money(capN)}. Their partnership deed states that profits are shared in the ratio of capital. Profit for the year was ${money(profit)}.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: shT,
        stem: "Calculate Tendai's share of the profit.",
        wrong: [profit / 2, shN],
        explanation: `Ratio ${fmt(capT)} : ${fmt(capN)} = 2 : 1. Tendai = 2/3 × ${fmt(profit)} = ${money(shT)}.`,
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "How would the profit have been shared if there were no partnership deed?",
        options: [["Equally", "Correct: the rule when there is no agreement."], ["In the ratio of capital", "Only if agreed."], ["All to Tendai", "No such rule."], ["By hours worked", "Only if agreed."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** disadvantages to Nyasha of being a partner in this business.",
        points: ["Unlimited liability (1)", "Her personal assets at risk, even for Tendai's decisions (1)", "Smaller share of profit / disagreements / lack of continuity (1)", "She receives only a third of profit / decisions slowed / business may end if Tendai leaves (1)"],
      }),
    ],
    explanation: `Capital ratio 2 : 1, so Tendai receives ${money(shT)} and Nyasha ${money(shN)}. Without a deed profits are shared equally.`,
    hints: ["Simplify the capital ratio first.", "Think about liability and control."],
  });

  // 7 marks: company formation documents and limited liability.
  const shares = 3000, price = 1.8, inv = r2(shares * price);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: true, paper: "Paper 2",
    concepts: ["bus.organisation.formation-liability", "bus.organisation.limited-companies"],
    stem: `A group of promoters is forming Kariba Fisheries Limited, a public limited company. Farai plans to buy ${fmt(shares)} shares at ${money(price)} each when they are offered to the public.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Complete the sentences.",
        template: "The company's name, objects and limited liability are stated in the {{blank:a}} of association. Its rules on meetings, voting and directors are in the {{blank:b}} of association.",
        blanks: [
          { id: "a", accepted: ["memorandum"], choices: ["memorandum", "articles", "certificate", "prospectus"] },
          { id: "b", accepted: ["articles"], choices: ["memorandum", "articles", "certificate", "prospectus"] },
        ],
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which document must the company obtain before it can start trading as a public company?",
        options: [["Trading certificate", "Correct: issued after the minimum capital is raised."], ["Partnership deed", "Used by partnerships."], ["Fire insurance policy", "Not a formation document."], ["Invoice", "A trade document."]],
        answer: "A",
      }),
      P.num({
        label: "(c)", marks: 1, kind: "money", value: inv,
        stem: "If the company later fails owing large debts, what is the most Farai can lose?",
        wrong: [shares, price],
        explanation: `${fmt(shares)} × ${fmt(price)} = ${money(inv)}.`,
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain why limited liability encourages people like Farai to buy shares.",
        points: ["Loss limited to the amount invested (1)", "Personal possessions are safe (1)", "So the risk is acceptable and companies can raise large capital (1)"],
      }),
    ],
    explanation: `Memorandum (external) and articles (internal); a public company needs a trading certificate. Farai's maximum loss is his ${money(inv)} investment.`,
    hints: ["External matters: memorandum; internal rules: articles.", "Shares × price paid."],
  });

  // 6 marks: multinationals.
  const jobs = 450, foreign = 27;
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: 420, calculator: true, paper: "Paper 2",
    concepts: ["bus.organisation.multinationals"],
    stem: `A fictional foreign company with its headquarters in Asia is opening a cement factory near Kwekwe. It will employ ${jobs} people, of whom ${foreign} will be managers brought from its home country, and it plans to send most of its profits back home.`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "What type of business is this company?",
        options: [["A multinational company", "Correct: it produces in more than one country."], ["A public corporation", "It is not state-owned."], ["A partnership", "It is a large company."], ["A marketing board", "Marketing boards are public bodies."]],
        answer: "A",
      }),
      P.num({
        label: "(b)", marks: 1, kind: "plain", value: jobs - foreign,
        stem: "How many of the jobs will go to people who are not managers from the home country?",
        wrong: [jobs, jobs + foreign],
        explanation: `${jobs} − ${foreign} = ${jobs - foreign}.`,
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **one** advantage and **one** disadvantage of the factory to Zimbabwe.",
        points: ["Advantage, e.g. jobs / investment / tax / import substitution (1)", "Explained, e.g. local workers earn incomes; less cement imported (1)", "Disadvantage, e.g. repatriation of profits / senior posts to foreigners / pollution (1)", "Explained, e.g. income leaves the country / few skills transferred (1)"],
      }),
    ],
    explanation: "An MNC brings jobs and investment, but repatriated profits and foreign managers reduce the gain to the host country.",
    hints: ["It produces in more than one country.", "Subtract the foreign managers."],
  });

  // Essay 1 (20 marks): public enterprises and reforms.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.organisation.public-enterprises", "bus.organisation.public-sector-reforms"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe the features of a public corporation (parastatal).",
        points: [
          "Owned by the state on behalf of the public (1)",
          "Set up by an Act of Parliament (1)",
          ["Controlled by a board appointed by the minister; managers run it day to day", 2],
          "Separate legal personality (1)",
          "Financed by charges, government grants/subsidies and loans (1)",
          "Main aim is a service; may break even or make a surplus (1)",
          "Accountable to the minister and Parliament (1)",
        ],
        levels: L8,
        modelAnswer: "A public corporation is owned by the state on behalf of the people and has no private shareholders. It is created by an Act of Parliament, which sets out its functions and powers. The responsible minister sets general policy and appoints a board of directors, and managers appointed by the board run it day to day. It has a separate legal personality, so it can own property, sign contracts and sue or be sued. It is financed by charges to customers, government grants or subsidies and loans. Its main aim is to provide an essential service, such as electricity or rail transport, at a reasonable price, although it may aim to cover its costs or make a surplus. It presents reports and accounts to the minister and Parliament.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "\"Loss-making parastatals should be privatised.\" Discuss.",
        points: [
          "For: ends subsidies and raises revenue from the sale (1)",
          "For: profit motive and competition improve efficiency (1)",
          "For: private capital for new equipment (1)",
          "For: less political interference (1)",
          "Against: higher prices for essential services (1)",
          "Against: job losses as costs are cut (1)",
          "Against: unprofitable areas/services abandoned (1)",
          "Against: loss of control of strategic industries; profits repatriated if foreign-owned (1)",
          "Against: public monopoly becomes private monopoly; assets sold cheaply (1)",
          "Alternative: commercialisation first / regulation / partial sale (1)",
          ["Justified conclusion", 2],
        ],
        levels: L12,
        modelAnswer: "Supporters of privatisation argue that it ends the subsidies taxpayers pay to loss-making parastatals and raises money from the sale. Private owners, driven by profit and competition, cut waste and improve service, and they can raise capital to replace old equipment. Decisions would no longer be influenced by politicians. Against this, private owners may raise prices of essential services such as water and electricity, which poorer households need. They may cut jobs and close unprofitable routes or rural services. If the buyer is foreign, the country loses control of a strategic industry and profits may be sent abroad, and a public monopoly may simply become a private monopoly. Assets built with public money may also be sold cheaply. A middle way is to commercialise first, giving managers targets and cutting subsidies, and to privatise only with a regulator controlling prices and service. In conclusion, privatisation suits parastatals in competitive markets, but essential monopoly services should be reformed and regulated rather than simply sold.",
      }),
    ],
    explanation: "(a) Ownership, formation, control, legal identity, finance, aims and accountability. (b) Efficiency, revenue and investment against prices, jobs, services and control, with a justified conclusion.",
    hints: ["(a) Cover ownership, control, finance and aim.", "(b) Arguments for, arguments against, then judge."],
  });

  // Essay 2 (20 marks): SMEs and associations.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.organisation.smes", "bus.organisation.associations"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain the importance of small to medium enterprises (SMEs) to Zimbabwe's economy.",
        points: [
          ["Employment and self-employment for people without formal jobs", 2],
          "Incomes and poverty reduction (1)",
          "Goods and services close to people, in small quantities (1)",
          "Use of local raw materials and scrap; value addition (1)",
          "Develop entrepreneurs; some grow into large firms (1)",
          "Linkages with large firms as suppliers and distributors (1)",
          "Competition keeps prices low; innovation (1)",
          "Tax revenue when formalised / exports through cross-border trade (1)",
          "Rural and regional development (1)",
        ],
        levels: L10,
        modelAnswer: "SMEs are a major source of jobs: vendors, welders, tailors and cross-border traders create employment for themselves and others when formal jobs are scarce, and the incomes they earn support households and reduce poverty. They supply goods and services close to where people live, in the small quantities low-income customers can afford, including in rural areas that large firms do not serve. Many use local materials and scrap, adding value, for example welders making scotch carts from scrap metal. SMEs train entrepreneurs, and some grow into large businesses. They supply parts and services to large firms and distribute their products. By competing with large firms they keep prices down and introduce new products. Formal SMEs pay taxes, and some earn foreign currency through cross-border trade and exports of crafts.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Evaluate the role of traders' associations and business membership organisations such as the ZNCC, CZI and ZimTrade in helping SMEs.",
        points: [
          "Traders' associations represent SMEs to councils on fees and sites (1)",
          "Bulk buying lowers members' costs (1)",
          "Training and information on regulations and prices (1)",
          "ZNCC: represents business to government; networking and information (1)",
          "CZI: lobbies on industrial policy and imports affecting small manufacturers (1)",
          "ZimTrade: export market information and trade fairs for SMEs (1)",
          "Limitation: subscriptions unaffordable for the smallest traders (1)",
          "Limitation: limited influence / dominated by larger members (1)",
          ["Justified judgement", 2],
        ],
        levels: L10,
        modelAnswer: "Traders' associations give SMEs a united voice: vendors' and cross-border traders' associations negotiate with councils and officials over fees, trading sites and border procedures. They buy in bulk so members pay less, and they share information and train members. Business membership organisations help at national level: the ZNCC represents business views to government and offers networking, the CZI lobbies on industrial policy such as cheap imports that hurt small manufacturers, and ZimTrade gives SMEs information about export markets and helps them attend trade fairs. However, the smallest informal traders often cannot afford subscriptions, so the businesses most in need are left out, and these organisations may reflect the views of larger members and have limited influence over government. Overall they play a useful role for SMEs that join, but their reach is limited; their value would grow if membership were made affordable for micro enterprises.",
      }),
    ],
    explanation: "(a) Jobs, incomes, local supply, value addition, entrepreneurs, linkages, competition, tax. (b) Associations and BMOs help through representation, information, bulk buying and export promotion, limited by cost and influence.",
    hints: ["(a) Explain each contribution with an example.", "(b) Say what each organisation does for SMEs, then its limits."],
  });
});
