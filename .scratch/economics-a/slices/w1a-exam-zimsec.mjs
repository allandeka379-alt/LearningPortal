// W1a: ZIMSEC exam-format items: one Paper 2 data-response question (20 marks) and three Paper 3 essays (10 + 15 marks).
import { concept, P, chk, fmt, table, schedule, pctChange, EXAM, checkExam, ZIM } from "../lib.mjs";

const A = (k) => `aecon.${k}`;
const P2 = { skill: EXAM.ZIM_P2_DATA.skill, secs: EXAM.ZIM_P2_DATA.secs, applies: EXAM.ZIM_P2_DATA.applies, examStyle: true, paper: "Paper 2" };
const P3 = { skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, examStyle: true, paper: "Paper 3" };

const LV15 = [
  [3, 11, 15, "Two-sided, developed and applied analysis with a justified conclusion that answers the question."],
  [2, 6, 10, "Some analysis of one or both sides, limited application, a partial or unsupported conclusion."],
  [1, 1, 5, "Simple, undeveloped points with little or no explanation or conclusion."],
];
const LV7 = [
  [3, 5, 7, "Both options weighed using the data, with a supported recommendation."],
  [2, 3, 4, "Some weighing of options with limited use of the data."],
  [1, 1, 2, "Simple statements with little application."],
];

concept(A("enterprise.sources-capital"), { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------ Paper 2 data response: a vegetable cooperative
  const prices = [2, 3, 4, 5, 6];
  const qd = [90, 70, 50, 30, 10];
  const s1 = [10, 30, 50, 70, 90];
  const s2 = [50, 70, 90, 110, 130];
  const mk = schedule({ prices, qd, qs: s1, priceHeader: "Price (US\\$ per crate)", qdHeader: "Demand D (crates per week)", qsHeader: "Supply S1 (crates per week)", requireEquilibrium: true });
  chk(mk.equilibrium.price, 4); chk(mk.equilibrium.quantity, 50);
  const mk2 = schedule({ prices, qd, qs: s2, requireEquilibrium: true });
  chk(mk2.equilibrium.price, 3); chk(mk2.equilibrium.quantity, 70);
  const tab = table(["Price (US\\$ per crate)", "Demand D (crates per week)", "Supply S1: usual season (crates per week)", "Supply S2: bumper harvest (crates per week)"], prices.map((p, i) => [p, qd[i], s1[i], s2[i]]));
  const cash = 6000, dep = 1200, inst = 235, n = 24, hp = dep + inst * n, extra = hp - cash;
  const interest = cash * 0.15 * 2;
  chk(hp, 6840); chk(extra, 840); chk(interest, 1800);

  b.struct({
    ...P2, d: 4, calculator: true,
    concepts: [A("enterprise.sources-capital"), A("enterprise.business-forms-ethics"), A("market.supply"), A("market.demand")],
    hints: ["Hire purchase total = deposit + instalments.", "A bumper harvest shifts the supply curve; read the equilibrium from the table."],
    stem: `**Kuda Vegetable Cooperative** (a fictional business)\n\nThe Kuda Vegetable Cooperative has 24 members who grow tomatoes and green vegetables on small plots near the fictional town of Zandia. At the annual meeting every member has one vote, and the cooperative sells the members' produce together at the town market. Last season, good rains produced a bumper harvest. Many farmers in the district brought large quantities of tomatoes to market and the price fell. Members also complained that they had to sell quickly, because tomatoes spoil within three days. The treasurer keeps the cooperative's accounts and reports to members every month, and any surplus at the end of the year is shared according to the amount of produce each member supplied. Most members have little cash, and several say that they are reluctant to take on debt because a poor season could leave them unable to pay.\n\nThe committee wants to buy a cold-storage unit that would keep produce fresh for up to two weeks. The unit has a cash price of US\\$6,000 and the cooperative has savings of US\\$1,500. For the rest it has two offers. A bank will lend US\\$6,000 at 15% a year simple interest, to be repaid over 2 years, but it wants property as collateral, and the cooperative owns none. A dealer offers hire purchase: a deposit of US\\$1,200 and 24 monthly instalments of US\\$235.\n\nSome members argue that the cooperative should become a private limited company so that outsiders can buy shares and provide finance. Others say that the cooperative's values of sharing and fairness, expressed in the idea of Unhu, would then be lost.\n\n**Table 1: the weekly market for tomatoes in Zandia** (illustrative data)\n\n${tab}`,
    parts: checkExam(EXAM.ZIM_P2_DATA, [
      P.mcq({ label: "(a)", marks: 1, stem: "How are decisions normally made at the annual meeting of a cooperative?",
        options: [["One member, one vote", "Correct: cooperatives are democratic."], ["One share, one vote", "That is the rule in most companies."], ["By the founder alone", "That would be a sole trader."], ["By the government", "That would be a state-owned enterprise."]],
        answer: "A", explanation: "In a cooperative each member has one vote." }),
      P.group({ label: "(b)", stem: "Use the information on hire purchase.",
        parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: hp, stem: "Calculate the total hire purchase price of the cold-storage unit, in US\\$.", wrong: [dep + inst, inst * n],
            explanation: "Deposit 1,200 + 24 × 235 (= 5,640) = US\\$6,840." }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: extra, stem: "By how much does the hire purchase price exceed the cash price, in US\\$?", wrong: [6840, 235],
            explanation: "6,840 − 6,000 = US\\$840." }),
        ] }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: interest, stem: "Calculate the total interest the cooperative would pay on the bank loan over the 2 years, in US\\$.", wrong: [900, 7800],
        explanation: "6,000 × 0.15 × 2 = US\\$1,800." }),
      P.fib({ label: "(d)", marks: 2, stem: "Use Table 1 to complete the sentences.",
        template: "The bumper harvest caused an increase in {{blank:a}}. The equilibrium price fell from US\\$4 to US\\${{blank:b}} per crate.",
        blanks: [{ id: "a", accepted: ["supply"], choices: ["demand", "supply", "quantity demanded"] }, { id: "b", accepted: ["3"], choices: ["2", "3", "5"] }],
        wrong: [["demand", "5"]],
        explanation: "S1 to S2 is a shift of supply. The new equilibrium is where D = S2: 70 crates at US\\$3." }),
      P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 60, max: 200 },
        stem: "Analyse, using Table 1, why the bumper harvest caused the price of tomatoes to fall.",
        points: [
          "Identifies that the good rains increased supply (a determinant other than price).",
          "States that the supply curve shifted to the right from S1 to S2.",
          "Uses the data: at the old price of US\\$4 quantity supplied (90) exceeded quantity demanded (50), a surplus of 40 crates.",
          "Explains that sellers compete and lower the price to sell their surplus produce (spoiling quickly adds pressure).",
          "Concludes that a new equilibrium is reached at US\\$3 where 70 crates are bought and sold (an extension of demand along D).",
        ],
        modelAnswer: "The good rains raised yields, so supply increased and the supply curve shifted to the right from S1 to S2. At the old equilibrium price of US\\$4 farmers now wanted to supply 90 crates but consumers wanted only 50, a surplus of 40 crates. Because tomatoes spoil within three days, sellers were willing to cut prices to avoid wasting produce, and competition between them pushed the price down. As the price fell consumers bought more, a movement down the demand curve, until the market cleared at US\\$3 where demand and supply were both 70 crates. The price therefore fell from US\\$4 to US\\$3 while the quantity traded rose from 50 to 70 crates." }),
      P.manual({ label: "(f)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 300 },
        stem: "Evaluate whether the cooperative should pay for the cold-storage unit using hire purchase, a bank loan or its own savings.",
        points: [
          "Hire purchase costs US\\$840 more than the cash price but needs no collateral.",
          "The bank loan costs US\\$1,800 interest, more than twice the extra cost of hire purchase, and the cooperative lacks the collateral the bank wants.",
          "Using savings of US\\$1,500 avoids interest but leaves the cooperative short of working capital.",
          "A combination (savings as part of the deposit) could lower the amount financed.",
          "The unit helps members to sell when prices are better, so sales revenue may rise and repay the cost.",
          "Risk: instalments must be paid even if harvests are poor; the unit could be repossessed under hire purchase.",
          "A justified recommendation based on cost, risk and the ability to meet payments.",
        ],
        levels: LV7,
        modelAnswer: "Hire purchase costs US\\$840 above the cash price, whereas the bank loan would add US\\$1,800 interest, and the bank also wants collateral that the cooperative does not have, so the loan is both dearer and less likely to be granted. Paying entirely from savings of US\\$1,500 would avoid interest, but the unit costs US\\$6,000, so savings alone are not enough, and spending them all would leave no working capital for seeds and transport. The risk with hire purchase is that instalments of US\\$235 must be paid every month even when harvests are poor, and the dealer could repossess the unit. However, a cold-store lets members hold tomatoes until the market price is higher, so extra revenue should help repayments. The best choice is hire purchase, with part of the savings used to enlarge the deposit and reduce the amount financed, provided that members' forecasts show that the instalments can be met.",
      }),
    ]),
    explanation: "Hire purchase total US\\$6,840 (US\\$840 more than cash); loan interest US\\$1,800; a bumper harvest shifts supply right, so the price falls from US\\$4 to US\\$3; the choice of finance depends on cost, collateral and risk.",
  });

  // ------------------------------------------------------------------ Paper 3 essays
  // Essay 1: PPC and resources
  b.struct({
    ...P3, d: 5,
    concepts: [A("basics.ppc"), A("basics.factors-of-production"), A("basics.scarcity-choice")],
    hints: ["Use a numerical example for (a).", "Weigh education against other causes of an outward shift in (b)."],
    stem: "A government wants to increase the amount of goods and services that its country can produce.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain how a production possibility curve illustrates scarcity, choice and opportunity cost.",
        points: [
          "Defines the PPC: the maximum combinations of two goods that can be produced with given resources and technology.",
          "Describes the diagram: axes labelled with goods and units; a downward-sloping curve from one axis to the other.",
          "Scarcity: points beyond the curve are unattainable because resources are limited.",
          "Choice: an economy on the curve must choose which combination of goods to produce (what to produce).",
          "Opportunity cost: moving along the curve means giving up some of one good to get more of the other.",
          "Gives a numerical example (for example gaining 20 units of one good costs 12 units of the other).",
          "Increasing opportunity cost: a curve concave to the origin, because resources are not equally suited to both goods.",
          "Constant opportunity cost: a straight line when resources are equally suitable.",
          "Points inside the curve show unemployed or inefficiently used resources: no opportunity cost in moving to the curve.",
          "Links to the economic problem: wants unlimited, resources limited, so every choice involves a cost.",
        ],
        modelAnswer: "A production possibility curve (PPC) shows the maximum combinations of two goods that an economy can produce when all its resources are fully and efficiently used and technology is given. On a diagram with consumer goods on the horizontal axis and capital goods on the vertical axis, the PPC slopes downward from the vertical axis to the horizontal axis. Scarcity is shown by the curve itself: combinations beyond it are unattainable with present resources. Choice is shown because the economy must pick one point on the curve, which answers the question of what to produce. Opportunity cost is shown by movement along the curve: if moving from one point to another gives 20 thousand more consumer goods but 12 thousand fewer capital goods, the opportunity cost of the extra consumer goods is 12 thousand capital goods. When the curve is bowed outwards, the opportunity cost rises as more of one good is produced, because resources are not equally suited to both goods; a straight line shows constant opportunity cost. A point inside the curve shows unemployed or poorly used resources, and moving from there to the curve has no opportunity cost. The PPC therefore pictures the basic economic problem of unlimited wants and limited resources." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss the view that investment in education is the most effective way to shift a country's production possibility curve outwards.",
        points: [
          "An outward shift needs more or better resources or better technology.",
          "Education raises human capital: skills, productivity and the ability to use technology.",
          "Skilled workers can innovate and adopt new methods, which can raise output in all sectors.",
          "Education has long-term effects and positive externalities (health, enterprise, tax revenue).",
          "Time lag: children take years to complete education; the benefit is not immediate.",
          "Opportunity cost: money spent on education cannot be spent on machines, roads or health.",
          "Investment in physical capital (machines, factories) raises capacity directly and quickly.",
          "Infrastructure (roads, electricity) improves productivity of all factors.",
          "Discovery or better use of natural resources (minerals, land, irrigation) can shift the PPC.",
          "Technology and research improve the output from existing resources.",
          "Education alone is not enough if there are no jobs or capital for skilled workers to use (emigration, unemployment).",
          "Capital and skills are complements: the best results come from using them together.",
          "Health and stability matter: a healthy, secure population can produce more.",
          "The best policy depends on the stage of development and the present shortages of the country.",
          "A justified conclusion on whether education is the most effective.",
        ],
        modelAnswer: "An outward shift of the PPC needs a rise in the quantity or quality of resources or better technology. Investment in education raises human capital: workers become more productive and can use new methods, and educated people start businesses, pay more taxes and enjoy better health, which benefit the whole economy for decades. Education can therefore be a very effective long-term way to shift the PPC. However, it has costs and delays. Children take many years to complete their education, so the gains come slowly, and the money spent could instead buy machines, roads or electricity supplies that raise capacity almost at once. Physical capital and infrastructure make all workers more productive, and new technology or the better use of minerals and farmland can also shift the curve. Education will not shift the curve much if skilled workers cannot find jobs, lack equipment or emigrate. Education and capital are therefore complements: skilled workers need machines and infrastructure to be productive, and machines need skilled operators. Which investment is most effective depends on a country's circumstances: a country with plenty of unskilled labour but few machines may gain more from capital first, while one with factories but few trained workers needs education. On balance, education is probably the most important in the long run because it improves the use of every other resource, but it is not the most effective on its own, and it works best alongside investment in capital and infrastructure." }),
    ]),
    explanation: "(a) A PPC shows scarcity (the limit), choice (a point on it) and opportunity cost (movement along it). (b) Education raises human capital but is slow and works with capital and infrastructure.",
  });

  // Essay 2: economic systems
  b.struct({
    ...P3, d: 5,
    concepts: [A("basics.economic-systems"), A("basics.scarcity-choice")],
    hints: ["Compare how each system answers the same question in (a).", "Consider strengths and weaknesses of each extreme in (b)."],
    stem: "The government of a fictional country is deciding how much of its economy should be controlled by the state.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain how a market economy and a planned economy each decide what to produce.",
        points: [
          "Market economy: consumers' spending shows what they want (effective demand).",
          "Firms respond to prices and the profit motive.",
          "A rise in price of a good signals scarcity or strong demand, so resources move to it.",
          "A fall in price or loss signals that resources should move elsewhere.",
          "Private ownership and competition mean no central direction is needed.",
          "Planned economy: a central planning authority decides what to produce.",
          "Targets and quotas are set for state enterprises.",
          "Prices are often set by the state and do not respond to scarcity.",
          "The planners try to match output to national priorities (for example basic needs) rather than profit.",
          "Compares: the market uses prices and consumer choice; planning uses information gathered by officials.",
        ],
        modelAnswer: "In a market economy, what is produced depends on effective demand. Consumers spend on goods they want, which raises their prices; firms see the higher profit and produce more of them, and resources move towards those goods. Goods that people no longer buy make losses and firms switch to other products. No central authority directs this: private ownership, competition and the profit motive guide resources through the price mechanism. In a planned economy a central authority decides what to produce. It sets targets and quotas for state enterprises, and prices are often fixed by the state, so they do not signal how scarce a good is. Planners aim to match output to national priorities such as basic foods, health and education, rather than to profit. The market therefore uses prices and consumer choice to decide, whereas planning uses information gathered and decisions made by officials." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether a mixed economy is better than either a pure market economy or a pure planned economy.",
        points: [
          "A pure market economy: efficiency, innovation and choice from competition and prices.",
          "Its weaknesses: under-provision of public and merit goods, inequality, external costs, instability.",
          "A pure planned economy: the state can direct resources to priorities and reduce inequality.",
          "Its weaknesses: lack of information, shortages and surpluses, little incentive to innovate, limited choice.",
          "A mixed economy: private firms produce most goods using the price mechanism.",
          "The state provides public goods and merit goods and regulates monopolies and externalities.",
          "Taxes and benefits can reduce inequality.",
          "Government intervention can be costly, inefficient or badly targeted (government failure).",
          "High taxes and regulation may reduce incentives.",
          "A mixed economy is a matter of degree: the right balance is difficult to find.",
          "The quality of government institutions and information affects success.",
          "Examples of state and private roles (for example essential services versus consumer goods).",
          "Different countries' priorities and history lead to different mixes.",
          "Comparison shows that no system is perfect.",
          "A justified conclusion.",
        ],
        modelAnswer: "A pure market economy uses prices and the profit motive to allocate resources, which gives firms strong incentives to be efficient and to innovate and gives consumers wide choice. However, markets under-provide public goods such as street lighting and merit goods such as education, ignore pollution and may leave large inequality, so some people cannot afford basic needs. A pure planned economy lets the state direct resources to its priorities and share output more equally, but planners lack the detailed information that prices provide, so shortages and surpluses of particular goods are common, and managers have little incentive to cut costs or innovate. A mixed economy combines the two: private firms produce most goods and respond to prices, while the state provides public goods, regulates monopolies and pollution and redistributes income through taxes and benefits. This tackles the weaknesses of the pure market while retaining most of its efficiency. But a mixed economy is not automatically better: government intervention can be costly, badly targeted or corrupt, high taxes may reduce the incentive to work and invest, and it is difficult to decide how large the state's role should be. The result depends on how well the government performs and on what the country values. Overall, most economists and governments prefer mixed economies because each pure system has serious weaknesses, but the quality of the mix matters more than the label." }),
    ]),
    explanation: "(a) Market: effective demand, prices and profit. Planned: central targets. (b) A mixed economy repairs market failures but risks government failure.",
  });

  // Essay 3: supply and maize
  b.struct({
    ...P3, d: 5,
    concepts: [A("market.supply"), A("market.demand")],
    hints: ["Separate a movement along the supply curve from a shift.", "Consider what limits farmers' response in the short run."],
    stem: "The price of maize rises in a fictional country.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain, using the law of supply, why a rise in the price of maize may lead farmers to produce more.",
        points: [
          "States the law of supply: a higher price leads to a higher quantity supplied, other things being equal.",
          "Higher price raises the profit from each tonne, so farmers want to produce more.",
          "Describes the movement up the supply curve (an extension of supply).",
          "Marginal cost rises as output rises, so only a higher price makes extra output worthwhile.",
          "Farmers can plant more land or switch land from other crops (the price of maize has risen relative to other crops).",
          "New producers are attracted to the market.",
          "Farmers may use more fertiliser or labour on existing land.",
          "Distinguishes this from a shift of the curve, which is caused by other determinants.",
          "Uses a numerical example (for example price rises from US\\$200 to US\\$260 a tonne and supply rises from 60 to 75 thousand tonnes).",
          "Notes that the response depends on the time available and the ceteris paribus assumption.",
        ],
        modelAnswer: "The law of supply states that, other things being equal, a higher price leads to a higher quantity supplied. A rise in the price of maize raises the profit on each tonne, so farmers have a reason to produce more. This is shown as a movement up the supply curve, an extension of supply: for example, a rise in price from US\\$200 to US\\$260 a tonne might raise supply from 60 to 75 thousand tonnes. Supply slopes upward partly because marginal costs rise: extra output needs more fertiliser, labour or poorer land, so farmers will produce more only if the price covers the higher cost. The rise in maize price also makes maize more profitable than other crops, so some farmers switch land to maize, and new farmers may be attracted to growing it. This is a movement along the curve because it is caused by the price of the good itself; a shift would need a change in another determinant such as costs, technology or weather. All this assumes ceteris paribus, and the size of the response depends on how much time farmers have to plant more." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether higher maize prices will always lead to a lasting increase in the supply of maize.",
        points: [
          "A higher price causes an extension of supply along the existing curve.",
          "A lasting increase in supply means a shift of the curve to the right, caused by other determinants.",
          "Short run: land and the planting season limit the response; supply is slow to adjust.",
          "Rising costs of inputs (seed, fertiliser, transport) may offset the higher price and reduce profit.",
          "Weather: drought or floods can reduce yields whatever the price.",
          "Other crops: if tobacco or cotton become more profitable, farmers switch away from maize.",
          "Access to credit and inputs affects whether farmers can expand.",
          "Technology and irrigation can shift supply lastingly.",
          "Government taxes or subsidies, and price controls, change the incentive.",
          "Expectations: if farmers expect the price to fall later, they may not invest.",
          "Farmers' skills and size: smallholders may have little spare land.",
          "Time: in the long run new farmers and methods can raise supply.",
          "The price rise may be temporary (shortage) and not signal lasting demand.",
          "Distinguishes between a movement along and a shift.",
          "A justified conclusion.",
        ],
        modelAnswer: "A higher price of maize causes an extension of supply: farmers produce more along the same supply curve because each tonne earns more profit. A lasting increase in supply, however, means a shift of the whole curve to the right, and a price rise alone does not cause that. In the short run farmers are limited by the land available and the planting season, so the response may be small and delayed. The rise in price may also be matched by higher costs of seed, fertiliser and transport, so profit may not rise much. Bad weather can reduce yields whatever the price, and if other crops such as tobacco become more profitable, farmers may switch away from maize. Poor access to credit or inputs may prevent smallholders from expanding, and if farmers expect the price to fall once the shortage has ended they may not invest. On the other hand, in the long run a sustained high price attracts new farmers, encourages irrigation and better seed, and these changes of technology and costs shift the curve. Government subsidies or taxes will also change the incentive. Higher prices will therefore not always produce a lasting increase in supply: the result depends on time, costs, weather and expectations, and the supply curve shifts only if one of those determinants improves." }),
    ]),
    explanation: "(a) A higher price extends supply along the curve because of profit and rising marginal costs. (b) A lasting increase needs a shift of the curve, which depends on costs, technology, weather and expectations.",
  });
});
