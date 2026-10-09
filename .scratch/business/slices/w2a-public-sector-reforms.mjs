// W2a: commercialisation, privatisation and nationalisation (COM only).
import { concept, P, money, fmt } from "../lib.mjs";

concept("bus.organisation.public-sector-reforms", { file: "organisation/public-sector-reforms", keyPrefix: "organisation.public-sector-reforms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **privatisation**?",
    options: [
      ["Transferring a public enterprise to private ownership", "Correct: ownership moves from the state to the private sector."],
      ["Transferring a private business to the state", "That is nationalisation."],
      ["Running a state enterprise on business lines", "That is commercialisation."],
      ["Registering an informal business", "That is formalisation."],
    ],
    answer: "A",
    explanation: "Privatisation transfers ownership of a public enterprise (or some of its activities) from the state to private owners.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **nationalisation**?",
    options: [
      ["The state taking over ownership of a private business", "Correct: ownership moves from private owners to the state."],
      ["Selling state-owned shares to the public", "That is a method of privatisation."],
      ["Reducing government subsidies to a parastatal", "That is part of commercialisation."],
      ["A business expanding into many countries", "That describes becoming a multinational."],
    ],
    answer: "A",
    explanation: "Nationalisation transfers ownership of a private business to the state, usually with compensation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A parastatal is told to cover its costs from its own charges, but it remains state-owned. What is this reform called?",
    options: [
      ["Commercialisation", "Correct: business methods without a change of owner."],
      ["Privatisation", "Privatisation changes ownership to the private sector."],
      ["Nationalisation", "Nationalisation brings private businesses into state ownership."],
      ["Deregulation", "Deregulation opens a market to private competitors."],
    ],
    answer: "A",
    explanation: "Commercialisation runs a public enterprise on business lines (covering costs, fewer subsidies) while the state keeps ownership.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a method of privatisation?",
    options: [
      ["Selling the enterprise's shares on the stock exchange", "Correct: ownership passes to private shareholders."],
      ["Paying compensation to private owners of a business", "That happens in nationalisation."],
      ["Increasing the enterprise's subsidy", "That keeps the enterprise in public hands."],
      ["Appointing a new minister", "That does not change ownership."],
    ],
    answer: "A",
    explanation: "Privatisation methods include share sales, outright sale, sales to employees, contracting out and deregulation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A city council pays a private company to collect refuse, which council workers used to do. This is an example of:",
    options: [
      ["Contracting out", "Correct: a form of privatisation of a service."],
      ["Nationalisation", "The private sector, not the state, takes on the work."],
      ["Commercialisation", "The service itself moves to a private firm."],
      ["Indigenisation", "Indigenisation concerns local ownership of businesses."],
    ],
    answer: "A",
    explanation: "Contracting out transfers the delivery of a public service to a private firm, which is paid by the public body.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might privatising a state monopoly **not** lead to lower prices?",
    options: [
      ["It may become a private monopoly with no competition", "Correct: without competition, the owner can raise prices."],
      ["Private firms are not allowed to cut prices", "Private firms set their own prices."],
      ["The state keeps ownership after privatisation", "Ownership passes to the private sector."],
      ["Privatised firms never aim to make profit", "Private owners do aim for profit."],
    ],
    answer: "A",
    explanation: "Lower prices need competition or efficiency gains passed on. A privatised monopoly may raise prices, so the state may still need to regulate it.",
    hints: ["What keeps prices low in a market?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the strongest argument **for** nationalising a failing private railway company?",
    options: [
      ["To keep an essential service running for the country", "Correct: the state protects a strategic service and jobs."],
      ["To make the railway more efficient through competition", "Nationalisation usually reduces competition."],
      ["To raise money for the government from a sale", "The state pays compensation; it does not receive money."],
      ["To encourage more foreign investors", "Nationalisation may discourage foreign investment."],
    ],
    answer: "A",
    explanation: "Governments nationalise to keep strategic or essential services running and to protect jobs, accepting the cost of compensation.",
    hints: ["Who pays whom in nationalisation?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "After commercialisation, a public enterprise is owned by private shareholders.",
    answer: false,
    explanation: "False. Commercialisation keeps state ownership; only privatisation transfers ownership to the private sector.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Privatisation can raise revenue for the government and reduce the subsidies it pays.",
    answer: true,
    explanation: "True. The sale brings in money and the state no longer covers the enterprise's losses.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reform with the change in ownership.",
    pairs: [
      ["Commercialisation", "No change: the state remains owner"],
      ["Privatisation", "From the state to the private sector"],
      ["Nationalisation", "From the private sector to the state"],
    ],
    explanation: "The direction of ownership is the key to each definition.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "When a government nationalises a private business it usually pays {{blank:a}} to the former owners, and any later losses become a burden on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["compensation"] },
      { id: "b", accepted: ["taxpayers", "the taxpayers", "taxpayer", "the government", "government"] },
    ],
    wrong: [["dividends", "shareholders"]],
    explanation: "Nationalisation is costly: compensation to owners, and losses funded by taxpayers.",
  });
  b.short({
    d: 2,
    stem: "Name the policy of allowing private firms to compete in a market that only the state was previously allowed to supply.",
    accepted: ["deregulation", "liberalisation", "liberalization", "deregulating the market"],
    wrong: ["nationalisation", "regulation"],
    explanation: "**Deregulation** (liberalisation) removes legal barriers to private competition.",
  });
  {
    const subsidy = 3200000, years = 5, total = subsidy * years;
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: total,
      stem: `A fictional parastatal receives a government subsidy of ${money(subsidy)} a year. If it is privatised and the subsidy ends, how much would the government save over ${years} years?`,
      wrong: [subsidy, subsidy / years],
      explanation: `${fmt(subsidy)} × ${years} = ${money(total)}.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** arguments **against** privatisation.",
    points: [
      "Argument 1, e.g. higher prices (1)",
      "Explained, e.g. private monopoly charges more to raise profit / poorer consumers lose access (1)",
      "Argument 2, e.g. job losses / unprofitable services cut / loss of strategic control / assets sold cheaply (1)",
      "Explained, e.g. new owners cut costs / rural routes closed / foreign owners repatriate profit (1)",
    ],
    modelAnswer: "Prices may rise because private owners aim for profit, and a privatised monopoly faces no competition to hold prices down. Workers may lose their jobs as the new owners cut costs to increase profit.",
    explanation: "State each argument and explain who loses and why.",
    hints: ["Think about consumers and workers."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of commercialising a loss-making parastatal.",
    points: [
      "Advantage 1, e.g. reduces subsidies / burden on taxpayers (1)",
      "Explained, e.g. government money freed for schools and clinics (1)",
      "Advantage 2, e.g. greater efficiency / accountable managers / prepares for privatisation (1)",
      "Explained, e.g. managers judged on results cut waste and improve service (1)",
    ],
    modelAnswer: "Commercialisation means the parastatal must cover its own costs, so the government pays less in subsidies and can spend the money on other services. Managers are judged on financial results, which encourages them to cut waste and improve service.",
    explanation: "Link each advantage to taxpayers or efficiency.",
    hints: ["What does the government save?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "The government of a fictional country owns TeleNet, the only fixed-line telephone company. TeleNet makes losses, has a long waiting list for new lines and needs new equipment. The government is considering selling 60% of TeleNet's shares to a foreign telecommunications company.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name the reform the government is considering.",
        accepted: ["privatisation", "privatization", "partial privatisation", "partial privatization"],
        wrong: ["nationalisation"],
      }),
      P.tf({
        label: "(b)", marks: 1,
        stem: "After the sale, the foreign company would control TeleNet.",
        answer: true,
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** benefits the sale could bring to TeleNet's customers.",
        points: ["Benefit 1, e.g. investment in new equipment (1)", "Developed: shorter waiting lists / better quality lines (1)", "Benefit 2, e.g. more efficient management / new services (1)", "Developed: faster repairs / internet services (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether the government should sell the shares. Give a justified conclusion.",
        points: [
          "For: sale revenue and end of subsidies (1)",
          "For: new capital, technology and efficiency (1)",
          "Against: foreign control of a strategic service; profits repatriated (1)",
          "Against: private monopoly may raise charges / cut jobs / neglect rural areas (1)",
          "Safeguards, e.g. regulator, licence conditions, keep 40% stake (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Selling 60% would raise money, end the losses the taxpayer covers and bring in capital and technology to clear the waiting list. However, a strategic service would be controlled by a foreign firm that may send profits abroad, and as the only fixed-line company it could raise charges, cut jobs or ignore rural areas. The government should sell only with safeguards: a regulator to control prices, licence conditions requiring rural coverage, and keeping its 40% stake to have a voice on the board.",
      }),
    ],
    explanation: "Selling a majority stake is privatisation; it can bring investment but risks a private, foreign-owned monopoly.",
    hints: ["Which direction is ownership moving?", "Consider customers, workers, taxpayers and national control."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "A large privately owned coal mine announces it will close because of losses, putting 2,000 jobs at risk. The mine supplies coal to the country's main power station. Trade unions ask the government to nationalise the mine.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **nationalisation**.",
        points: ["Transfer of ownership of a private business (1)", "To the state / government (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** reasons why the government might nationalise the mine.",
        points: ["Reason 1: protect 2,000 jobs (1)", "Developed: avoid unemployment and loss of income in the mining town (1)", "Reason 2: strategic supply of coal for electricity (1)", "Developed: power cuts would harm all industries (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether nationalising the mine is the best solution.",
        points: [
          "For: jobs and power supply secured (1)",
          "Against: compensation cost to the government (1)",
          "Against: losses continue and fall on taxpayers unless efficiency improves (1)",
          "Alternative, e.g. find a new private buyer / temporary support / commercialise under state ownership (1)",
          "Considers what the decision depends on, e.g. why the mine makes losses (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Nationalisation would protect 2,000 jobs and keep coal flowing to the power station. But the government would have to pay compensation, and if the mine's losses continue, taxpayers will pay for them. If the losses are caused by poor management, a new private buyer or state ownership run on commercial lines might work; if the coal is simply too costly to mine, nationalisation would only delay closure. The government should first try to find a buyer, nationalising only to protect the power supply.",
      }),
    ],
    explanation: "Nationalisation protects jobs and strategic supply, but compensation and continued losses are costly.",
    hints: ["Why does the power station matter?", "Who pays if the mine keeps losing money?"],
  });
  b.card("DEFINITION", "Commercialisation", "Running a public enterprise on business lines (covering costs, fewer subsidies) while the state keeps ownership.");
  b.card("DEFINITION", "Privatisation", "Transfer of ownership of a public enterprise, or its activities, from the state to the private sector.");
  b.card("DEFINITION", "Nationalisation", "Transfer of ownership of a private business to the state, usually with compensation.");
  b.card("FACT", "Methods of privatisation", "Share sales to the public, outright sale, sales to employees, contracting out, deregulation.");
  b.card("CONCEPT", "Arguments for privatisation", "Efficiency, government revenue, end of subsidies, private investment, less political interference.");
  b.card("CONCEPT", "Arguments against privatisation", "Higher prices, job losses, unprofitable services cut, loss of strategic control, assets sold cheaply.");
  b.card("CONCEPT", "Arguments for nationalisation", "Control of strategic industries, protect jobs, essential services for all, keep profits in the country.");
  b.card("CONCEPT", "Arguments against nationalisation", "Cost of compensation, inefficiency, political interference, losses borne by taxpayers, discourages investors.");
  b.card("DEFINITION", "Contracting out", "A public body pays a private firm to deliver a service it used to provide itself.");
});
