// W1a: structure.economic-systems
import { concept, P, ZIM, table, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.structure.economic-systems", { file: "structure/economic-systems", keyPrefix: "structure.economic-systems" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In which type of economy does the state own most resources and decide what is produced?",
    ok: ["A command economy", "Correct: central planning by the state decides output."],
    bad: [["A free-market economy", "In a free market, buyers and sellers decide through prices."], ["A mixed economy", "A mixed economy combines state and private decision-making."], ["A subsistence economy", "A subsistence economy is one where people produce mainly for their own needs."]],
    explanation: "A command economy is centrally planned and mostly state-owned.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is **privatisation**?",
    ok: ["Selling state-owned businesses to private owners", "Correct: ownership moves from the state to private hands."],
    bad: [["Taking private businesses into state ownership", "That is nationalisation."], ["Running a state body on business lines while it stays state-owned", "That is commercialisation."], ["Raising taxes on private firms", "Taxation does not change ownership."]],
    explanation: "Privatisation transfers state assets to private owners.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature is typical of a **mixed economy**?",
    ok: ["Both state and private firms provide goods and services", "Correct: the economy combines both."],
    bad: [["All businesses are owned by the state itself", "That describes a command economy."], ["The state takes no part in the economy at all", "That describes a pure free market, which is rare."], ["Prices are set by central planners for every product", "That describes a command economy."]],
    explanation: "A mixed economy has both a public and a private sector.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **commercialisation** of a state-owned body?",
    ok: ["Running it on business lines but keeping it public", "Correct: cost control and charging, but no change of ownership."],
    bad: [["Selling all its shares to foreign investors", "That is privatisation."], ["Closing it down and dismissing the workers", "That is closure, not commercialisation."], ["Taking over a private competitor firm", "That is nationalisation or takeover."]],
    explanation: "Commercialisation changes how the body is managed, not who owns it.",
    applies: ZIM,
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A government takes a privately owned electricity supplier into state ownership and pays its owners compensation. This is an example of",
    ok: ["nationalisation", "Correct: private assets are transferred into state ownership."],
    bad: [["privatisation", "Privatisation moves assets the other way."], ["commercialisation", "Commercialisation does not involve a change of ownership."], ["diversification", "Diversification means widening a firm's products."]],
    hints: ["Which direction does ownership move?"],
    explanation: "Taking a private business into state ownership is nationalisation.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional state-owned railway makes a loss every year. The government sells 60% of the railway to a private company, which promises to invest. Which is a likely disadvantage?",
    ok: ["Unprofitable rural routes may be closed down", "Correct: private owners may cut services that lose money."],
    bad: [["The government will have no income from the sale", "Selling shares gives income to the government."], ["The railway will no longer need any workers", "It will still need workers, though numbers may change."], ["Competition will disappear in all transport markets", "The sale does not remove competition from other transport."]],
    hints: ["What might a profit-seeking owner do with unprofitable routes?"],
    explanation: "Private owners aim for profit and may cut loss-making services.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might a government prefer commercialisation to privatisation of a state water company?",
    ok: ["It keeps public control of a truly essential service", "Correct: water is essential, and the state keeps control while reducing losses."],
    bad: [["It brings in a large cash sum from the sale of shares", "Commercialisation involves no sale, so there is no sale income."], ["It removes the need for the company to cover costs", "Commercialisation requires costs to be covered more closely."], ["It means the company can ignore customers' complaints", "A commercial approach makes customer service more important."]],
    hints: ["Which option leaves ownership with the state?"],
    explanation: "Commercialisation can reduce losses without giving up ownership of an essential service.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best judgement about whether privatising a state airline will improve it?",
    ok: ["It depends on the competition, regulation and investment", "Correct: names the conditions on which success depends."],
    bad: [["It will always improve it, as private firms are always efficient", "Private firms can also be inefficient, and there may be no competition."], ["It cannot improve it, as private firms ignore customers", "Private firms usually need customers to survive."], ["It will make no difference whatever the circumstances", "Ownership may change incentives and investment."]],
    hints: ["Look for the answer that names a condition."],
    explanation: "A reasoned judgement weighs the possible gains and names what they depend on.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a free-market economy prices are set mainly by the interaction of buyers and sellers.",
    answer: true,
    explanation: "True. In a free market, supply and demand determine prices with little state interference.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Commercialisation means that a state-owned body is sold to private owners.",
    answer: false,
    explanation: "False. Commercialisation means running a state body on business lines; the sale of a state body is privatisation.",
    applies: ZIM,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its description.",
    pairs: [["Command economy", "The state owns most resources and plans output"], ["Free-market economy", "Private owners respond to prices in markets"], ["Mixed economy", "Both state and private firms provide goods and services"], ["Nationalisation", "Private assets are taken into state ownership"]],
    explanation: "Each term differs in who owns resources and who decides.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} sells state-owned assets to private owners, whereas {{blank:b}} takes private assets into state ownership.",
    blanks: [
      { id: "a", accepted: ["Privatisation"], choices: ["Privatisation", "Nationalisation", "Commercialisation"] },
      { id: "b", accepted: ["nationalisation"], choices: ["privatisation", "nationalisation", "commercialisation"] },
    ],
    explanation: "Privatisation and nationalisation move ownership in opposite directions.",
  });

  const sh = 6_000_000, pr = 2.2, pc = 35;
  const sold = sh * (pc / 100);
  chk(sold * pr, 4_620_000, 0.01);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: sold * pr, calculator: true, daily: true, wrong: [sh * pr, sold],
    stem: "A fictional state-owned cement company has 6,000,000 shares. The government sells 35% of them to private investors at US\\$2.20 a share. Calculate the money raised by the sale.",
    hints: ["Find the number of shares sold first."],
    explanation: "Shares sold = 6,000,000 × 0.35 = 2,100,000. Proceeds = 2,100,000 × 2.20 = US\\$4,620,000. Using all 6,000,000 shares would give US\\$13,200,000.",
  });
  const rev = 1_800_000, c1 = 2_070_000, c2 = 1_710_000;
  chk(rev - c1, -270_000, 0.01);
  chk(rev - c2, 90_000, 0.01);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "money", value: rev - c2, calculator: true, wrong: [c1 - rev, rev - c1],
    stem: "A fictional state-owned bus company has revenue of US\\$1,800,000 a year and costs of US\\$2,070,000, a loss. After it is commercialised, costs fall by US\\$360,000 and revenue is unchanged. Calculate its profit after commercialisation.",
    hints: ["First work out the new level of costs."],
    explanation: "New costs = 2,070,000 − 360,000 = 1,710,000. Profit = 1,800,000 − 1,710,000 = US\\$90,000. The earlier position was a loss of US\\$270,000.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of economic system in which both the state and private firms play a major part.",
    accepted: ["mixed economy", "mixed", "a mixed economy", "mixed system"],
    explanation: "A mixed economy combines state and private activity.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which ZIMSEC term describes a policy of increasing ownership and control of businesses by local citizens?",
    accepted: ["indigenisation", "indigenization"],
    explanation: "Indigenisation is a policy of increasing local citizens' ownership and control.",
    applies: ZIM,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** advantage and **one** disadvantage of a command economy for businesses.",
    points: ["Advantage: stable demand from state orders and little competition", "Disadvantage: little freedom to decide what to produce", "Disadvantage developed: little incentive to be efficient, so shortages and waste"],
    modelAnswer: "In a command economy, businesses may have stable demand from state orders and little competition. However, managers have little freedom to decide what to produce, and with no incentive to be efficient there may be shortages and waste.",
    hints: ["Consider freedom and incentives."],
    explanation: "One advantage and one developed disadvantage.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional government is considering privatising a state-owned electricity distribution company. Explain **two** reasons in favour of the sale.",
    points: ["It would raise money from the sale", "Application: the funds could pay for roads, schools or reduce debt", "Private owners might run it more efficiently to earn profit", "Application: lower costs and fewer power cuts through better maintenance"],
    modelAnswer: "The sale would raise money for the government, which could pay for schools or reduce debt. Private owners may also run the company more efficiently because they want profit, which could reduce costs and fix faults more quickly.",
    hints: ["One reason about finance, one about efficiency."],
    explanation: "Two reasons, each developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how the nationalisation of a private mine might affect the mine's workers and the local community.",
    points: ["Workers' jobs may become more secure because the state may avoid closure", "But there may be less efficiency and pressure on wages budgets", "The community may benefit if profits are spent locally", "But taxpayers may bear the cost of compensation and losses"],
    modelAnswer: "Workers may have greater job security if the state avoids closing the mine, but efficiency may fall without the pressure of competition. The community may gain if profits are spent locally, but taxpayers must bear the cost of compensation and of any losses.",
    hints: ["Consider both benefits and costs."],
    explanation: "Effects on workers and community, with limits.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether a mixed economy is better for businesses than a pure free-market economy.",
    points: ["A mixed economy provides public goods such as roads and schools that support business", "State regulation protects consumers and workers", "Free-market freedom encourages efficiency and innovation", "State involvement may add taxes and regulation costs", "Counter-argument: too much state involvement may reduce incentives", "Judgement with a condition, e.g. depends on how well the state provides services"],
    modelAnswer: "A mixed economy supplies public goods such as roads and education, and regulates markets to protect consumers, which helps businesses operate. A free market gives more freedom and incentive to innovate but may neglect public goods. Too much state control reduces incentives and adds costs. On balance a mixed economy is better for most businesses, provided the state provides services efficiently and does not over-regulate.",
    hints: ["Weigh state support against the loss of freedom, then conclude."],
    explanation: "Both sides and a conditional judgement.",
  });

  const sa = 1_200_000 * 0.4;
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional state-owned bakery chain in Bulawayo has 2,500,000 shares. The government plans to sell 48% of the shares at US\\$1.60 each. The bakery currently makes a loss of US\\$150,000 a year, paid for by the government, and employs 900 workers.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: 2_500_000 * 0.48, stem: "Calculate the number of shares to be sold.", wrong: [48, 2_500_000], explanation: "2,500,000 × 48% = 1,200,000 shares." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 1_200_000 * 1.6, stem: "Calculate the money the government would raise from the sale.", wrong: [2_500_000 * 1.6], explanation: "1,200,000 × 1.60 = US\\$1,920,000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** advantage and **one** disadvantage to the workers of the sale.", points: ["Advantage: private investment may secure the business's future and jobs", "Disadvantage: new owners may cut jobs to reduce costs", "Link to the case: with 900 workers and a loss, cost cutting is likely"], modelAnswer: "Investment from private owners could secure the future of the bakery and keep jobs. But new owners may cut jobs to reduce costs, and with 900 workers and a loss-making business this is likely.", explanation: "One advantage and one disadvantage, linked to the case." }),
    ],
    hints: ["Convert the percentage into a number of shares first."],
    explanation: "1,200,000 shares; US\\$1,920,000 raised; effects on workers.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional government owns a water company serving a city and nearby villages. The company is losing money. An adviser suggests privatisation. A union leader suggests commercialisation instead. The government wants to cut losses but keep water affordable for villagers.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Distinguish between privatisation and commercialisation, using the case.", points: ["Privatisation: the company would be sold to private owners", "Commercialisation: the company would stay state-owned but be run on business lines", "In the case, one changes ownership and the other only the way the water company is managed"], modelAnswer: "Privatisation would sell the water company to private owners. Commercialisation would leave it in state ownership but require it to be run on business lines, with a stress on cutting costs and charging properly.", explanation: "Two definitions applied to the case." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate which option is better for the government's aims.", points: ["Privatisation raises money and may improve efficiency", "Private owners may raise prices or leave villages unserved", "Commercialisation keeps control of an essential service for villagers", "It may reduce losses through better cost control but may raise prices more slowly", "Alternative: privatise with conditions on affordable village supply", "Judgement and reason"], modelAnswer: "Privatisation would bring money and perhaps better efficiency, but a private owner may raise prices or avoid unprofitable village supply. Commercialisation keeps control of an essential service and may cut losses through cost control, though it may not raise much money. As the government wants affordable water for villagers, commercialisation is the better first step; privatisation with conditions on village supply could follow if losses continue.", hints: ["Which option best protects the government's second aim?"], explanation: "Two options judged against the two aims in the case." }),
    ],
    hints: ["Use the government's two aims as criteria."],
    explanation: "Commercialisation keeps control and affordability; privatisation raises money but risks village supply.",
  });

  b.card("DEFINITION", "Command economy", "The state owns most resources and decides what is produced, how and for whom through central planning.");
  b.card("DEFINITION", "Free-market economy", "Resources are mostly privately owned and decisions are made by buyers and sellers through the price system.");
  b.card("DEFINITION", "Mixed economy", "Both the state and private owners play a major part: the state provides some goods and regulates, private firms provide others.");
  b.card("DEFINITION", "Privatisation", "The sale of state-owned assets or businesses to private owners.");
  b.card("DEFINITION", "Nationalisation", "The transfer of privately owned assets or businesses into state ownership.");
  b.card("DEFINITION", "Commercialisation", "Running a public sector body on commercial lines (cost control, charging) while it stays publicly owned.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Disadvantages of privatisation", "Loss of state control, job cuts, higher prices, and loss-making but essential services may be reduced.");
  b.card("CONCEPT", "Why a government may nationalise", "To protect key industries or jobs, prevent private monopoly or provide essential services.");
  b.card("DEFINITION", "Indigenisation", "A policy of increasing ownership and control of businesses and resources by local citizens.", undefined, { applies: ZIM });
});
