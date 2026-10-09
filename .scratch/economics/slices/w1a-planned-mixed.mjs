// W1a: planned and mixed economies; comparing systems; Zimbabwe's mixed economy (planned and Zimbabwe items: ZIMSEC).
import { concept, P, money, fmt, pct, ZIM } from "../lib.mjs";

const LV6 = [
  [3, 5, 6, "Two-sided analysis, developed, with a justified conclusion."],
  [2, 3, 4, "Some analysis of both sides or one side well developed, limited conclusion."],
  [1, 1, 2, "Simple points, little explanation."],
];
const SECTORS = ["public sector", "parastatal", "private sector", "informal sector"];

concept("econ.systems.planned-mixed", { file: "systems/planned-mixed", keyPrefix: "systems.planned-mixed" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **mixed economic system**?",
    options: [
      ["One where resources are allocated by both the price mechanism and the government", "Correct: private and public sectors both allocate resources."],
      ["One where all resources are allocated by central government planners and ministries", "That is a planned economy."],
      ["One where all resources are allocated by the price mechanism alone", "That is a market economy."],
      ["One where farming and mining are run by the same firms", "This describes firms, not an economic system."],
    ],
    answer: "A",
    explanation: "A mixed economic system combines a private sector working through prices with a public sector in which the government provides, owns and regulates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **advantage** of a mixed economic system compared with a market economic system?",
    options: [
      ["The government can provide public goods that firms would not supply", "Correct: the state fills gaps left by the market."],
      ["There is no longer any need for the government to collect taxes", "Paying for public services usually requires taxes."],
      ["Firms no longer need to make a profit to survive", "Private firms in a mixed economy still need profit."],
      ["Consumers have less choice between the products of competing firms", "Less choice would be a disadvantage, not an advantage."],
    ],
    answer: "A",
    explanation: "A mixed economy keeps private markets for most goods but lets the government provide public and merit goods and correct other market failures.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of a mixed economic system?",
    options: [
      ["State enterprises may be inefficient and need money from taxpayers", "Correct: government failure is a risk of intervention."],
      ["Public goods such as defence are never provided", "In a mixed economy the state provides public goods."],
      ["There is no private sector to produce goods such as food and clothing", "A mixed economy has a large private sector."],
      ["Prices play no part in allocating resources", "Prices allocate most goods in a mixed economy."],
    ],
    answer: "A",
    explanation: "Government intervention can fail: protected parastatals may make losses, and taxes to fund the public sector can reduce incentives.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which is an **advantage** of a planned (command) economy?",
    options: [
      ["The state can make sure everyone's basic needs are met", "Correct: planners can provide food, housing, schooling and health care for all."],
      ["Consumers have a very wide choice of brands", "Choice is usually narrow in a planned economy."],
      ["The profit motive encourages constant innovation", "There is little or no profit motive in a planned economy."],
      ["Prices quickly signal changes in consumer wants", "Prices are fixed by planners, so they do not signal changes."],
    ],
    answer: "A",
    explanation: "Because the state controls resources, it can direct them to meet everyone's basic needs and reduce inequality.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "Why do planned economies often suffer from **shortages** of some goods and **surpluses** of others?",
    options: [
      ["Planners lack price signals showing what consumers want", "Correct: without market prices, planners cannot easily match output to wants."],
      ["Private firms charge prices that are too high", "There are few private firms in a planned economy."],
      ["Consumers have too much income to spend", "Incomes are controlled by the state and are not the main reason."],
      ["Competition between firms wastes too many resources", "There is little competition in a planned economy."],
    ],
    answer: "A",
    explanation: "In a market, rising prices signal shortages and falling prices signal surpluses. Planners fix prices and must guess what millions of consumers want, so output often does not match wants.",
    hints: ["What tells producers what to make in a market economy?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "Workers in a state factory receive the same wage whether they produce a lot or a little. Which disadvantage of a planned economy does this illustrate?",
    options: [
      ["A lack of incentives to work hard and improve", "Correct: if extra effort is not rewarded, effort and productivity tend to fall."],
      ["Too much inequality of income between workers", "Equal wages mean low inequality, not high."],
      ["Too many firms producing the same product", "Duplication of firms is a market feature, not shown here."],
      ["Too much advertising of competing brands", "Advertising is a market feature."],
    ],
    answer: "A",
    explanation: "When rewards do not depend on effort or results, workers and managers have little incentive to raise output or cut waste.",
    hints: ["What happens to effort if it is not rewarded?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A government in a mixed economy fixes the price of bread below the price at which the market would clear. Which outcome is most likely?",
    options: [
      ["Bread shortages and queues, as bakers supply less than people want", "Correct: a price below equilibrium raises quantity demanded and lowers quantity supplied: an example of government failure."],
      ["A surplus of bread, as bakers produce more at the lower price", "A lower price reduces the incentive to supply, not increases it."],
      ["No change, because bread is a basic need", "Price still affects how much bakers supply and households want."],
      ["Higher profits for bakers, encouraging new bakeries to open", "A lower price cuts profits and discourages entry."],
    ],
    answer: "A",
    explanation: "Intervention can fail: a price below the market-clearing level means quantity demanded exceeds quantity supplied, causing shortages, queues and possibly a black market.",
    hints: ["Compare what buyers want and what sellers offer at the lower price."],
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "A national railway company owned by the government and run by a board it appoints is an example of",
    options: [
      ["a parastatal in the public sector", "Correct: a state-owned business enterprise."],
      ["a private limited company", "Private companies are owned by private shareholders."],
      ["an informal sector business", "The railway is formal and state-owned."],
      ["a co-operative owned by its workers", "A co-operative is owned by its members, not the state."],
    ],
    answer: "A",
    explanation: "Parastatals (public corporations) are business enterprises owned by the state, such as national railways and power utilities.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a mixed economic system, both the private sector and the public sector play a part in allocating resources.",
    answer: true,
    explanation: "True. That is the definition of a mixed economic system.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM, daily: true,
    stem: "Zimbabwe has a mixed economy that includes a large informal sector.",
    answer: true,
    explanation: "True. Zimbabwe's economy combines the state, parastatals, private firms and a large informal sector of vendors and small traders.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Consumers usually have a wider choice of goods in a planned economy than in a market economy.",
    answer: false,
    explanation: "False. Planned economies usually offer a narrow range of goods chosen by planners; competition in a market economy gives wider choice.",
  });
  b.fib({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "Choose the part of Zimbabwe's mixed economy to which each belongs.",
    template: "A government district hospital: {{blank:a}}. A state-owned electricity utility: {{blank:b}}. A privately owned cement company: {{blank:c}}. An unregistered roadside vegetable stall: {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["public sector"], choices: SECTORS },
      { id: "b", accepted: ["parastatal"], choices: SECTORS },
      { id: "c", accepted: ["private sector"], choices: SECTORS },
      { id: "d", accepted: ["informal sector"], choices: SECTORS },
    ],
    wrong: [["parastatal", "public sector", "private sector", "informal sector"]],
    explanation: "Government departments and services are the public sector; state-owned business enterprises are parastatals; privately owned registered firms are the private sector; unregistered small-scale traders are the informal sector.",
  });
  b.match({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "Match each feature to the economic system with which it is most closely linked.",
    pairs: [
      ["Wide choice but high inequality", "Market economy"],
      ["Low inequality but frequent shortages", "Planned economy"],
      ["Public services funded by taxes alongside competing private firms", "Mixed economy"],
    ],
    explanation: "Market economies trade inequality for choice; planned economies trade shortages for equality; mixed economies combine private markets with taxed public services.",
    hints: ["Think of the main strength and weakness of each system."],
  });
  {
    const fee = 20, income = 160, share = (fee / income) * 100;
    b.num({
      d: 3, skill: "APPLICATION", kind: "pct", value: share, calculator: true,
      stem: `In a fictional country, a private clinic charges ${money(fee)} for a consultation. A rural household earns ${money(income)} a month. What percentage of its monthly income would one consultation cost? Give your answer to one decimal place.`,
      wrong: [(income / fee) * 100, income / fee],
      explanation: `${fmt(fee)} ÷ ${fmt(income)} × 100 = ${pct(share, 1)}. High costs relative to income are one reason governments in mixed economies provide public clinics. Dividing the other way gives ${fmt(income / fee)} (how many consultations the income would buy), not a percentage.`,
      hints: ["Percentage = cost ÷ income × 100."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** disadvantage of a mixed economic system.",
    points: [
      "Identifies a disadvantage (government failure, high taxes, red tape, inefficient parastatals, corruption).",
      "Explains why it harms the economy (for example losses of parastatals paid by taxpayers; high taxes reduce incentives to work and invest).",
    ],
    explanation: "Mixed economies risk government failure and the costs of financing the public sector.",
    modelAnswer: "State enterprises may be inefficient because they are protected from competition and rescued when they make losses; the losses are paid for by taxpayers, whose money could have been used for schools or clinics.",
    hints: ["What can go wrong when the government intervenes?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Describe Zimbabwe's current economic system, giving the role of **two** of its parts.",
    points: [
      "States that Zimbabwe has a mixed economy.",
      "Names a first part (state, parastatals, private sector or informal sector).",
      "Gives a correct role for that part (for example the state provides schools and health care and collects taxes through ZIMRA).",
      "Names a second part with a correct role (for example the informal sector provides livelihoods through vending and small-scale trade).",
    ],
    explanation: "A full answer names the mixed system and gives roles of its parts without inventing statistics.",
    modelAnswer: "Zimbabwe has a mixed economy. The government provides public services such as schools, hospitals and roads, collects taxes through ZIMRA and regulates businesses. Alongside it, a large informal sector of vendors, small traders and home-based producers provides livelihoods for many people who do not have formal jobs.",
    hints: ["Start by naming the type of system.", "Choose two of: state, parastatals, private firms, informal sector."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: "A fictional country, Country T, has a planned economy. Shops often run out of cooking oil and soap, while warehouses are full of unsold shoes. Workers in state factories are paid the same regardless of output. Everyone has free schooling and health care.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** advantages of Country T's planned economy shown in the information.",
        points: [
          "Basic needs met: free schooling and health care for everyone.",
          "Low inequality / equal pay (or full employment in state factories).",
        ],
        modelAnswer: "Everyone receives free schooling and health care, so basic needs are met; and equal wages mean little inequality of income.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** problems of planning shown in the information.",
        points: [
          "Shortages and surpluses: identified from the cooking oil/soap and shoes.",
          "Explained: planners lack price signals, so output does not match what consumers want.",
          "Lack of incentives: identified from equal pay regardless of output.",
          "Explained: workers have no reason to work harder or cut waste, so productivity is low.",
        ],
        modelAnswer: "Shops run out of cooking oil and soap while unsold shoes pile up: without prices to signal what people want, planners set the wrong targets. And because workers are paid the same whatever they produce, they have little incentive to work harder, so output and quality stay low.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether Country T should change to a mixed economy.",
        points: [
          "Explains a benefit of change: prices would signal wants, reducing shortages and surpluses.",
          "Explains a benefit of change: profit and wages linked to output would raise incentives, efficiency and choice.",
          "Explains a risk: inequality may rise and some people may lose free or cheap services.",
          "Explains a risk: unemployment and price rises during the change; private monopolies may form.",
          "Notes that a mixed economy can keep free schooling and health care while markets supply oil, soap and shoes.",
          "Reaches a justified conclusion.",
        ],
        levels: LV6,
        modelAnswer: "A mixed economy would let prices signal what people want: if cooking oil were scarce its price would rise and firms would produce more, ending the shortages and the waste of unsold shoes. Paying workers and firms according to output would raise incentives and efficiency, and consumers would gain choice. However, inequality would rise as some people earned much more than others, prices of some basics might rise sharply during the change, and state factories that close could leave workers unemployed. A mixed economy could keep free schooling and health care while letting markets supply consumer goods. On balance Country T should change gradually, protecting basic services and poorer households while markets take over the production of everyday goods.",
      }),
    ],
    explanation: "The case shows the planned economy's strengths (basic needs, equality) and weaknesses (information and incentive problems). A mixed economy aims to keep the strengths while using prices.",
    hints: ["Look for evidence of both strengths and weaknesses.", "In (c), consider what would be gained and lost."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "In a fictional mixed economy, the government runs free primary schools, a national power company and the police, while private firms produce most food, clothing and transport services. Taxes on income and spending pay for the public sector.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which is provided by the public sector in this economy?",
        options: [
          ["The police service", "Correct: the government runs the police."],
          ["Most food sold in shops", "Food is produced by private firms."],
          ["Most clothing", "Clothing is produced by private firms."],
          ["Most transport services", "Transport services are produced by private firms."],
        ],
        answer: "A",
        explanation: "The police, primary schools and the power company are run by the state; the other goods come from the private sector.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why the government provides free primary schools rather than leaving them to private firms.",
        points: [
          "Education is a merit good that benefits society as well as the pupil.",
          "At market prices poorer families would not buy enough, so the state provides it free.",
        ],
        modelAnswer: "Primary education is a merit good: an educated population benefits everyone. If schools charged market fees, many poor families could not afford them, so the state provides them free.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** disadvantage for this economy of financing the public sector through taxes.",
        points: [
          "Identifies the disadvantage (high taxes reduce incentives, or opportunity cost of spending).",
          "Explains the mechanism (people keep less of extra income, so may work or invest less; or money for one service cannot fund another).",
          "States the effect on the economy (slower growth, less enterprise, or fewer other services).",
        ],
        modelAnswer: "If income taxes are high, people keep less of every extra dollar they earn, so some may work fewer hours or entrepreneurs may invest less. This can slow the growth of output and incomes in the private sector.",
      }),
    ],
    explanation: "In a mixed economy, the state supplies public and merit goods financed by taxes, while private firms supply most goods. Taxes have costs as well as benefits.",
    hints: ["Who runs each service?", "What happens to incentives when taxes rise?"],
  });

  b.card("DEFINITION", "Define a **mixed economic system**.", "An economic system in which both the private sector (through prices) and the public sector (the government) allocate resources.");
  b.card("CONCEPT", "Give two advantages of a mixed economy.", "Choice and efficiency from private firms; the state corrects market failures (public and merit goods, less inequality).");
  b.card("CONCEPT", "Give two disadvantages of a mixed economy.", "Government failure (inefficient parastatals, price controls causing shortages); high taxes and red tape.");
  b.card("CONCEPT", "Give two advantages of a planned economy.", "Basic needs met for all; low inequality (also public goods provided, low unemployment).", null, { applies: ZIM });
  b.card("CONCEPT", "Give two disadvantages of a planned economy.", "No price signals, so shortages and surpluses; weak incentives and little innovation or choice.", null, { applies: ZIM });
  b.card("DEFINITION", "What is a **parastatal**?", "A business enterprise owned by the state and run by a government-appointed board (Cambridge: public sector firm).");
  b.card("DEFINITION", "What is the **informal sector**?", "Small-scale activity that is not registered or regulated by the state and usually pays little or no tax, such as street vending.");
  b.card("FACT", "What type of economic system does Zimbabwe have?", "A mixed economy: the state, parastatals, private firms and a large informal sector.", null, { applies: ZIM });
  b.card("CONCEPT", "What is **government failure**?", "When government intervention makes resource allocation worse, for example price controls causing shortages.");
});
