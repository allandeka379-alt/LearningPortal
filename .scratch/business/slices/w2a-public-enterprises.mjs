// W2a: public corporations, local authorities, government departments and marketing boards (COM, BES).
import { concept, P, COM } from "../lib.mjs";

concept("bus.organisation.public-enterprises", { file: "organisation/public-enterprises", keyPrefix: "organisation.public-enterprises" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who appoints the board of a public corporation (parastatal)?",
    options: [
      ["The responsible government minister", "Correct: the minister appoints the board."],
      ["The shareholders at an AGM", "Public corporations have no private shareholders."],
      ["The workers by secret ballot", "Workers do not appoint the board."],
      ["The Registrar of Companies", "The Registrar registers companies; it does not appoint parastatal boards."],
    ],
    answer: "A",
    explanation: "A parastatal is set up by an Act of Parliament; the responsible minister appoints its board, which runs it with managers.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is a public corporation usually formed?",
    options: [
      ["By an Act of Parliament", "Correct: the Act sets out its functions and powers."],
      ["By a partnership deed", "Used by partnerships."],
      ["By a prospectus to the public", "Used by public limited companies to sell shares."],
      ["By a franchise agreement", "Used by franchises."],
    ],
    answer: "A",
    explanation: "Public corporations are created by an Act of Parliament (statute).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a main source of income for a local authority?",
    options: [
      ["Rates paid on property", "Correct: rates are charged on properties in the council area."],
      ["Dividends from shareholders", "Local authorities have no shareholders paying them dividends."],
      ["Royalties from franchisees", "Local authorities do not sell franchises."],
      ["Sales of shares on a stock exchange", "Local authorities do not issue shares."],
    ],
    answer: "A",
    explanation: "Local authorities are financed by rates, charges (water bills, market fees, licences), government grants and loans.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of a marketing board?",
    options: [
      ["Buying, grading and storing farm produce", "Correct: it buys and markets particular crops."],
      ["Collecting rates on property in towns", "That is done by local authorities."],
      ["Issuing shares to the public", "Marketing boards do not issue shares."],
      ["Registering new companies", "That is done by the Registrar of Companies."],
    ],
    answer: "A",
    explanation: "Marketing boards buy, grade, store, transport and sell farm products and may keep strategic reserves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a government department differ from a public corporation?",
    options: [
      ["It has no separate legal identity", "Correct: it is part of a ministry and financed by the budget."],
      ["It is owned by private shareholders", "Neither is privately owned."],
      ["It must make a profit every year", "Departments are financed by the national budget."],
      ["It is controlled by elected councillors", "That describes a local authority."],
    ],
    answer: "A",
    explanation: "A government department is run directly by a ministry, has no board or separate legal identity, and is financed from the national budget.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do governments often provide water supply through a public enterprise rather than several private firms?",
    options: [
      ["Duplicate pipe networks would be very wasteful", "Correct: water supply is a natural monopoly."],
      ["Private firms are not allowed to make profits", "Private firms are allowed to make profits."],
      ["Water has no value to consumers", "Water is essential, which is why the state provides it."],
      ["Public enterprises never have any costs", "Public enterprises have costs like any business."],
    ],
    answer: "A",
    explanation: "Laying several sets of pipes would waste resources, so one supplier (a natural monopoly) is efficient; state ownership prevents a private monopoly overcharging for an essential service.",
    hints: ["Think about what would happen with three sets of pipes in each street."],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is a **demerit** of public corporations?",
    options: [
      ["Losses may have to be covered by taxpayers", "Correct: subsidies come from public funds."],
      ["They provide services to remote areas", "That is a merit."],
      ["Prices of essential services are kept affordable", "That is a merit."],
      ["Profits benefit the public rather than a few owners", "That is a merit."],
    ],
    answer: "A",
    explanation: "Inefficiency, political interference and losses financed by taxpayers are demerits of parastatals.",
    hints: ["Which option is a cost to the public?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A local authority is controlled by elected councillors.",
    answer: true,
    explanation: "True. City, town and rural district councils are run by elected councillors, with officials who manage daily work.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Public corporations are not allowed to make a profit.",
    answer: false,
    explanation: "False. Their main aim is a service, but they may break even or make a surplus, which is used for the service or paid to the state.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each public enterprise with its description.",
    pairs: [
      ["Government department", "Run directly by a ministry and financed by the national budget"],
      ["Public corporation", "Set up by an Act of Parliament with a board appointed by a minister"],
      ["Local authority", "Elected council providing services such as refuse collection"],
      ["Marketing board", "Buys and markets particular crops from farmers"],
    ],
    explanation: "The four kinds of public enterprise differ in control, finance and the area they serve.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A parastatal is owned by the {{blank:a}}. Its general policy is set by a {{blank:b}}, and it is run by a board and managers.",
    blanks: [
      { id: "a", accepted: ["state", "government", "the state", "the government"] },
      { id: "b", accepted: ["minister", "government minister", "the minister"] },
    ],
    wrong: [["shareholders", "director"]],
    explanation: "State ownership; ministerial policy; board and managers for daily decisions.",
  });
  b.short({
    d: 2,
    stem: "State the term for money paid by the government to a public corporation to cover its losses or keep prices low.",
    accepted: ["subsidy", "subsidies", "government subsidy", "a subsidy", "grant", "government grant"],
    wrong: ["dividend", "royalty"],
    explanation: "A **subsidy** (or grant) from public funds covers losses or keeps prices affordable.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why governments form public corporations.",
    points: [
      "Reason 1, e.g. provide essential services to all (1)",
      "Developed, e.g. including remote, unprofitable areas private firms would ignore (1)",
      "Reason 2, e.g. huge capital needed / natural monopoly / strategic industry / protect consumers (1)",
      "Developed, e.g. private firms cannot raise it / avoid wasteful duplication / prevent high prices (1)",
    ],
    modelAnswer: "Governments form public corporations to make sure essential services such as electricity reach everyone, including rural areas private firms would not serve because they are unprofitable. They also form them for projects such as power stations that need more capital than private firms can raise.",
    explanation: "State each reason and explain why private firms would not provide the same result.",
    hints: ["Think about remote areas and very large projects."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4, applies: COM,
    stem: "Explain **two** merits of marketing boards to small-scale farmers.",
    points: [
      "Merit 1, e.g. guaranteed market (1)",
      "Developed, e.g. farmers know their crop will be bought / can plan production (1)",
      "Merit 2, e.g. stable or announced prices / storage and grading / inputs (1)",
      "Developed, e.g. protected from price falls at harvest / crop kept in good condition (1)",
    ],
    modelAnswer: "A marketing board guarantees farmers a buyer, so they can plan what to grow without fearing they will be unable to sell. It announces prices in advance, protecting farmers from the sharp price falls that happen when everyone sells at harvest time.",
    explanation: "Link each merit to the farmer's situation.",
    hints: ["What problems do farmers face when selling at harvest time?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "A fictional parastatal, the National Water Supply Corporation (NWSC), supplies water to towns. Customers complain of frequent cuts and slow repairs. The government pays the NWSC a subsidy each year, and the minister has refused to allow higher charges.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Who owns the NWSC?",
        options: [["The state", "Correct: it is a parastatal."], ["Its customers", "Customers pay for water but do not own it."], ["Private shareholders", "Parastatals have no private shareholders."], ["Its managers", "Managers run it but do not own it."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** features of a public corporation shown in the case.",
        points: ["Owned by the state / minister's control (charges) (1)", "Financed partly by government subsidy / provides an essential service (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** possible reasons for the NWSC's poor service.",
        points: ["Reason 1, e.g. lack of competition / no profit motive (1)", "Developed: little pressure to repair quickly (1)", "Reason 2, e.g. political interference keeps charges low (1)", "Developed: not enough money to maintain pipes (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether the minister should allow the NWSC to raise its charges.",
        points: [
          "For: more revenue to repair and maintain the network (1)",
          "For: lower subsidy, saving taxpayers' money (1)",
          "Against: poorer households may not afford water, a basic need (1)",
          "Against: higher charges do not guarantee efficiency without better management (1)",
          "Possible middle way, e.g. low charge for basic use / link increases to service targets (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Higher charges would give the NWSC money to fix pipes and would reduce the subsidy paid by taxpayers. But water is a basic need, and poorer households might be unable to pay, and higher income alone will not fix poor management. The minister should allow a moderate increase for larger users while keeping a low charge for basic household use, and link the increase to repair targets.",
      }),
    ],
    explanation: "Parastatals are state-owned and minister-controlled; low charges and weak incentives can lead to poor service.",
    hints: ["Who sets the charges?", "Weigh service quality against affordability."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    stem: "Mutare City Council provides water, refuse collection, markets and street lighting. It also issues licences to shops and vendors.",
    parts: [
      P.tf({
        label: "(a)", marks: 1,
        stem: "The council is part of the private sector.",
        answer: false,
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "State **three** sources of finance for the council.",
        points: ["Rates on property (1)", "Charges and fees, e.g. water bills, market fees, licences (1)", "Government grants / loans (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how the council's services help businesses in the city.",
        points: ["Markets give traders a place to sell (1)", "Refuse collection and water keep premises clean and usable (1)", "Street lighting improves security and allows longer trading hours (1)", "Licences regulate trade / protect licensed traders and customers (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Suggest **two** ways the council could improve its services.",
        points: ["Way 1, e.g. contract out refuse collection (1)", "Justified: private contractor may be more efficient (1)", "Way 2, e.g. use rates income for maintenance / online payments / consult residents (1)", "Justified: fewer breakdowns / easier collection of revenue (1)"],
      }),
    ],
    explanation: "A city council is a local authority in the public sector, financed by rates, charges and grants.",
    hints: ["Who elects a council?", "Think about how each service helps a trader."],
  });
  b.card("DEFINITION", "Public corporation (parastatal)", "A state-owned business set up by an Act of Parliament, with a board appointed by a minister and a separate legal identity.");
  b.card("DEFINITION", "Local authority", "An elected council providing local services, financed by rates, charges and grants.");
  b.card("DEFINITION", "Marketing board", "A public body that buys, grades, stores and sells particular farm products.");
  b.card("DEFINITION", "Government department", "A unit run directly by a ministry, financed by the national budget, with no separate legal identity.");
  b.card("FACT", "Why public enterprises are formed", "Essential services, natural monopolies, strategic industries, huge capital, consumer protection, social aims.");
  b.card("CONCEPT", "Merits of parastatals", "Services for all areas, affordable prices, large capital for national projects, jobs, profits for the public.");
  b.card("CONCEPT", "Demerits of parastatals", "Inefficiency, political interference, losses borne by taxpayers, red tape, poor responses to customers.");
  b.card("CONCEPT", "Who controls a parastatal?", "The minister sets policy and appoints the board; the board and managers run it day to day.");
  b.card("FACT", "Local authority income", "Rates, charges (water, market fees, licences), government grants and loans.");
});
