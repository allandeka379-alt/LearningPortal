// W3a: econ.firms.private-public-sector — private vs public sector firms, public corporations (parastatals).
import { concept, P, table, check, fmt, ZIM, CAM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.firms.private-public-sector", { file: "firms/private-public-sector", keyPrefix: "firms.private-public-sector" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which firm is in the **public sector**?",
    options: [
      ["A state-owned railway company", "Correct: owned by the government."],
      ["A public limited company listed on the stock exchange", "Owned by private shareholders: private sector."],
      ["A family-owned supermarket", "Owned by private individuals."],
      ["A farmers' co-operative", "Owned by its members: private sector."],
    ],
    answer: "A",
    explanation: "Public-sector firms are owned by the government. A public limited company is a private-sector firm whose shares are sold to the public.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main objective of most private-sector firms?",
    options: [
      ["To make a profit for their owners", "Correct: owners risk their money for a return."],
      ["To provide services to everyone at the lowest price", "That is a typical public-sector aim."],
      ["To create as many jobs as possible", "Jobs are a by-product, not usually the main aim."],
      ["To collect tax revenue for the government", "That is the role of the tax authority."],
    ],
    answer: "A",
    explanation: "Private-sector firms are owned by individuals or shareholders who usually want profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Who usually appoints the board that runs a **public corporation**?",
    options: [
      ["The government minister responsible for that sector", "Correct: the minister appoints the board."],
      ["The shareholders voting at an annual general meeting", "Public corporations have no private shareholders."],
      ["The workers employed by the corporation", "Workers do not appoint the board."],
      ["The customers who buy its services", "Customers do not appoint the board."],
    ],
    answer: "A",
    explanation: "A public corporation is controlled by a board appointed by the responsible minister, who is accountable to Parliament.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a government own the company that supplies electricity through the national grid?",
    options: [
      ["One supplier is cheapest, and a private monopoly might overcharge", "Correct: a natural monopoly run in the public interest."],
      ["Electricity is a free good that has no cost of production", "Electricity has large production costs."],
      ["Private firms are not allowed to produce goods in any country", "Private firms produce most goods."],
      ["Government firms always make larger profits than private firms do", "Public ownership aims at social goals, not larger profits."],
    ],
    answer: "A",
    explanation: "A grid is a natural monopoly; state ownership can keep prices affordable and supply everyone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **privatisation**?",
    options: [
      ["Transferring a firm from the public sector to the private sector", "Correct."],
      ["Transferring a firm from the private sector to the public sector", "That is nationalisation."],
      ["Changing a private company into a public limited company", "That is going public, which keeps it in the private sector."],
      ["Allowing a government department to charge for its services", "Charging does not change ownership."],
    ],
    answer: "A",
    explanation: "Privatisation moves ownership from the state to private owners; nationalisation does the opposite.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which is the **most likely** reason why a public corporation is less efficient than a private firm in the same industry?",
    options: [
      ["It has no profit motive and often faces no competition", "Correct: weak incentives to cut costs."],
      ["It cannot employ any skilled workers or managers", "Public corporations employ skilled staff."],
      ["It is not allowed to charge customers for its services", "Public corporations do sell their services."],
      ["It must give all its revenue to private shareholders", "It has no private shareholders."],
    ],
    answer: "A",
    hints: ["What pushes private firms to keep costs down?"],
    explanation: "Without the need to make profit or beat rivals, and with losses covered by the government, managers have less incentive to cut costs.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A state-owned water company supplies remote villages at the same price as towns, although it costs more to do so. What is the main **opportunity cost** of this policy?",
    options: [
      ["Government money used to cover the losses cannot be spent elsewhere", "Correct: the subsidy has alternative uses."],
      ["Villagers must pay higher prices for water than people in the towns", "They pay the same price."],
      ["The company makes higher profits from its town customers", "Supplying villages below cost reduces profit."],
      ["Private firms are forced to supply water to the villages", "The state company is the supplier here."],
    ],
    answer: "A",
    hints: ["Opportunity cost is the next best alternative given up."],
    explanation: "The losses are paid from taxes or borrowing; the next best use of those funds, such as schools or clinics, is given up.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "A bank whose shares are bought and sold on the stock exchange, and which has no government shareholding, is best classified as…",
    options: [
      ["a private-sector firm", "Correct: it is owned by private shareholders."],
      ["a public-sector firm", "It has no government ownership."],
      ["a public corporation", "Public corporations are owned by the state."],
      ["a government department", "It is a company, not a department."],
    ],
    answer: "A",
    explanation: "Selling shares to the public does not make a firm public sector: ownership is private.",
  });

  {
    const rev = 11.2, cost = 12.8, users = 32; // millions
    const loss = cost - rev, per = loss / users;
    check("loss", loss, 1.6); check("per", per, 0.05);
    {
      const r1 = 7.4, c1 = 9.1, l1 = c1 - r1;
      check("l1", l1, 1.7);
      b.num({
        d: 2, skill: "APPLICATION", kind: "plain", value: l1, dp: 1, daily: true,
        stem: `A fictional state-owned electricity distributor has revenue of US\\$${r1.toFixed(1)} million and costs of US\\$${c1.toFixed(1)} million in a year. The government covers any loss. Calculate the loss, in US\\$ million, to one decimal place.`,
        wrong: [r1 + c1],
        explanation: `Loss = costs − revenue = ${c1.toFixed(1)} − ${r1.toFixed(1)} = **${l1.toFixed(1)}** (US\\$ million), paid by the government from taxes or borrowing.`,
      });
    }
    const breakEven = cost / 40, avg = rev / 40;
    check("be", breakEven, 0.32); check("avg", avg, 0.28);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: breakEven - avg,
      stem: `The same fictional utility sells 40 million cubic metres of water a year. Its revenue is US\\$${rev.toFixed(1)} million and its costs are US\\$${cost.toFixed(1)} million. By how much would the average price per cubic metre have to rise for it to break even? Give your answer in US\\$ to two decimal places.`,
      wrong: [breakEven, loss],
      hints: ["Find the average price now and the price that would cover costs."],
      explanation: `1. Average price now = ${rev.toFixed(1)} ÷ 40 = US\\$${avg.toFixed(2)}.\n2. Break-even price = ${cost.toFixed(1)} ÷ 40 = US\\$${breakEven.toFixed(2)}.\n3. Rise needed = ${breakEven.toFixed(2)} − ${avg.toFixed(2)} = **US\\$${(breakEven - avg).toFixed(2)}** per cubic metre (equal to the loss ${loss.toFixed(1)} ÷ 40).\n4. US\\$${breakEven.toFixed(2)} is the new price, not the rise.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A public limited company is part of the public sector.",
    answer: false,
    explanation: "False. It is owned by private shareholders, so it is in the private sector; \"public\" means its shares can be sold to the public.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, applies: ZIM,
    stem: "A public corporation is a separate legal entity that can sue and be sued in its own name.",
    answer: true,
    explanation: "True. Public corporations are corporate bodies set up by law, separate from the government department that oversees them.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Private sector", "Firms owned by individuals or shareholders"],
      ["Public sector", "Organisations owned and controlled by the government"],
      ["Nationalisation", "Transfer of a firm from private to state ownership"],
      ["Privatisation", "Transfer of a firm from state to private ownership"],
    ],
    explanation: "The sectors are defined by ownership; nationalisation and privatisation move firms between them.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Losses of a public corporation are usually covered by the {{blank:a}}. Profits of a private company are paid to its {{blank:b}} as dividends. A public corporation usually puts {{blank:c}} objectives before profit.",
    blanks: [
      { id: "a", accepted: ["government"], choices: ["government", "shareholders", "customers"] },
      { id: "b", accepted: ["shareholders"], choices: ["government", "shareholders", "customers"] },
      { id: "c", accepted: ["social"], choices: ["social", "growth", "survival"] },
    ],
    explanation: "Taxpayers bear public-sector losses; shareholders receive private-sector profits; public corporations aim mainly at social welfare.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of providing rail transport through a public corporation rather than a private firm.",
    points: [
      "Routes can be kept open to remote or poor areas that would be unprofitable.",
      "So people and goods in those areas have access to transport / regional development.",
      "Fares can be kept affordable / a private monopoly cannot exploit passengers.",
      "Large long-term investment in track can be financed by the state; any surplus benefits the country.",
    ],
    modelAnswer: "First, a public corporation can keep unprofitable routes open to remote areas, so farmers and mines there can move goods and people can travel. Second, as the railway is a natural monopoly, state ownership stops a private owner from charging very high fares, and the government can finance the very large, long-term investment in track and trains.",
    hints: ["Think about access, prices and investment."],
    explanation: "Two advantages, each identified and explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `The table shows figures for a fictional state-owned airline in a southern African country.\n\n${table(["Year", "Revenue (US\\$ million)", "Costs (US\\$ million)", "Passengers (thousands)"], [["Year 1", 54, 63, 450], ["Year 2", 50, 65, 400]])}\n\nThe government is considering selling the airline to a private company.`,
    parts: (() => {
      const l1 = 63 - 54, l2 = 65 - 50, pc = ((400 - 450) / 450) * 100, perPass2 = (l2 * 1e6) / (400 * 1e3);
      check("l2", l2, 15); check("pp", perPass2, 37.5);
      return [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: l2, stem: "Calculate the airline's loss in Year 2, in US\\$ million.", wrong: [l1], explanation: "65 − 50 = 15 (US\\$ million)." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pc, stem: "Calculate the percentage change in passengers from Year 1 to Year 2, to one decimal place. Give a fall as a negative number.", wrong: [((400 - 450) / 400) * 100, -pc], explanation: `(400 − 450) ÷ 450 × 100 = ${fmt(pc, 1)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: perPass2, stem: "Calculate the loss per passenger in Year 2, in US\\$, to two decimal places.", wrong: [l2 / 400], explanation: `US\\$15,000,000 ÷ 400,000 passengers = US\\$${fmt(perPass2, 2)}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Using the data, explain why the losses are a concern for the government.", points: ["Losses rose from US\\$9 million to US\\$15 million.", "The government must cover them from taxes or borrowing.", "Opportunity cost: the money cannot be spent on health, education or infrastructure."], modelAnswer: "The losses rose from US\\$9 million to US\\$15 million while passengers fell. The government must cover them from taxes or borrowing, so the money cannot be spent on schools, clinics or roads: the opportunity cost is rising." }),
        P.manual({ label: "(e)", marks: 4, stem: "Explain **two** reasons why a private owner might run the airline more efficiently.", points: ["Profit motive: owners want profit, so managers are pushed to cut costs.", "e.g. remove unprofitable routes, better use of aircraft, control staff costs.", "Less political interference in decisions on fares, routes and jobs.", "Access to private capital to modernise the fleet; competition / threat of failure sharpens incentives."], modelAnswer: "First, private owners want a profit, so managers have a strong incentive to cut waste, use aircraft more intensively and drop routes that lose money. Second, decisions would be made on commercial grounds rather than political ones, and the owner could raise private capital to replace old aircraft, which lowers fuel and maintenance costs." }),
      ];
    })(),
    explanation: "(a) US\\$15 million. (b) −11.1%. (c) US\\$37.50. (d) Rising losses paid by taxpayers. (e) Profit motive and freedom from political interference.",
    hints: ["Loss = costs − revenue.", "Use change ÷ original × 100."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country, piped water in towns is supplied by a state-owned corporation. Supplies are often interrupted and many pipes leak. Some economists propose that the corporation be sold to a private company, with a regulator to control prices.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Distinguish between the private sector and the public sector.", points: ["Private sector: owned by individuals / shareholders, usually aiming for profit.", "Public sector: owned and controlled by the government, usually aiming at social welfare."], modelAnswer: "The private sector consists of firms owned by individuals and shareholders, usually aiming for profit; the public sector consists of organisations owned and controlled by the government, usually aiming to provide services to the public." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether water supply should be transferred to the private sector.",
        points: [
          "For: profit motive gives incentives to cut waste and repair leaks; better management.",
          "For: private capital for new pipes; less political interference; government saves the cost of losses.",
          "Against: water is essential; a private monopoly may raise prices or cut supply to poor / unprofitable areas.",
          "Against: profit may come before public health; regulation is needed and may be weak.",
          "Alternatives: reform the corporation, contracts to private firms for repairs, targeted subsidies.",
          "Justified conclusion.",
        ],
        modelAnswer: "A private owner would have a profit incentive to stop leaks, collect bills and keep supplies running, and could raise private capital for new pipes, while the government would no longer have to cover losses. However, water is essential and the supplier is a natural monopoly: a private firm might raise prices or neglect poor areas that are unprofitable to serve, and public health could suffer. A regulator could control prices and set service standards, but regulation may be weak. Privatisation could work if a strong regulator is in place; otherwise reforming the corporation, for example by contracting private firms to repair the network, may be the safer choice.",
      }),
    ],
    explanation: "(a) Ownership and aims. (b) Efficiency and investment against monopoly power and access for the poor.",
    hints: ["Is water an essential service? Is it a natural monopoly?"],
  });

  b.card("DEFINITION", "Private sector", "Firms owned and controlled by private individuals or shareholders, usually aiming for profit.");
  b.card("DEFINITION", "Public sector", "Organisations owned and controlled by the government, including public corporations.");
  b.card("DEFINITION", "Public corporation (parastatal)", "A state-owned business set up by law, run by a board appointed by the minister, selling goods or services.", null, { applies: ZIM });
  b.card("FACT", "Is a public limited company in the public sector?", "No. It is owned by private shareholders, so it is in the private sector.");
  b.card("CONCEPT", "Why governments own firms", "Essential services for all, natural monopolies, strategic industries, social objectives and very large investments.");
  b.card("CONCEPT", "Advantages of public corporations", "Access for remote and poor areas, affordable prices, no private monopoly profit, large long-term investment.");
  b.card("CONCEPT", "Disadvantages of public corporations", "Weak incentives to be efficient, losses paid by taxpayers, political interference and bureaucracy.");
  b.card("DEFINITION", "Privatisation", "Transferring a firm or activity from the public sector to the private sector.");
  b.card("DEFINITION", "Nationalisation", "Transferring a firm from private ownership to state ownership.");
});
