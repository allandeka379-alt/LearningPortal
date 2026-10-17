// W2b: ahist.independence.economic (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.independence.economic", { file: "independence/economic", keyPrefix: "independence.economic" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which policy statement of 1981 set out the new government's first economic aims, balancing growth with a fairer spread of benefits?",
    options: [
      ["Growth with Equity, a statement of national aims", "Correct: it promised growth to keep investors and more spending on services for the majority."],
      ["Towards Economic Liberation", "This is the 1980 declaration that created SADCC, a regional body, not a national economic policy."],
      ["The Economic Structural Adjustment Programme", "ESAP began in 1991, a decade later."],
      ["The Zimbabwe Programme for Economic and Social Transformation", "ZIMPREST came in 1996."],
    ],
    answer: "A",
    explanation: "*Growth with Equity* (March 1981) was the first national policy statement; ESAP and ZIMPREST came later.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the Economic Structural Adjustment Programme (ESAP) that began in 1991?",
    options: [
      ["A market-oriented reform package agreed with the IMF", "Correct: it removed controls, devalued the currency and cut state spending."],
      ["A plan to nationalise the mines and the largest factories in the country", "ESAP moved the economy towards the market, not towards state ownership."],
      ["A programme to resettle landless families on farms bought from white owners", "That was the land resettlement programme, a separate policy."],
      ["A conference of donor countries to raise money for national reconstruction", "That describes ZIMCORD of 1981."],
    ],
    answer: "A",
    explanation: "ESAP was a structural adjustment programme: trade liberalisation, devaluation, spending cuts and cost recovery, with IMF and World Bank support.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pair of droughts badly damaged Zimbabwe's harvests and exports in the period 1980-2000?",
    options: [
      ["1982-84 and 1991-92", "Correct: both forced food imports and cut export earnings."],
      ["1980-81 and 1986-87", "1980-81 was a year of recovery and good rains."],
      ["1985-86 and 1995-96", "These were not the notable drought years."],
      ["1989-90 and 1999-2000", "These were not the main drought years."],
    ],
    answer: "A",
    hints: ["One drought hit just as ESAP began."],
    explanation: "The droughts of 1982-84 and 1991-92 were the most serious of the period; the second struck just as ESAP began.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these was a feature of ESAP?",
    options: [
      ["Devaluation of the currency and removal of import controls", "Correct: trade liberalisation was central to ESAP."],
      ["Fixing the prices of basic foods for all consumers", "Price controls were relaxed, not extended."],
      ["Free health care and schooling for all, paid for by new loans", "ESAP introduced cost recovery, meaning fees."],
      ["A ban on all foreign investment in manufacturing", "ESAP aimed to attract investment."],
    ],
    answer: "A",
    hints: ["ESAP moved towards the market."],
    explanation: "ESAP devalued the Zimbabwe dollar, liberalised trade, cut the deficit and introduced fees for some services.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did many critics say that ESAP harmed poor families in particular?",
    options: [
      ["Fees and higher prices came alongside job losses and lower real wages", "Correct: the costs were carried by the poor."],
      ["It greatly increased the number of free places in schools and clinics", "Cost recovery reduced free access."],
      ["It raised subsidies on maize meal and bread for all the towns and cities", "Subsidies were reduced, not raised."],
      ["It took land from communal farmers in order to sell it to investors", "No such policy formed part of ESAP."],
    ],
    answer: "A",
    hints: ["Think about what households paid and what they earned."],
    explanation: "User fees, higher food and transport prices, job losses in manufacturing and falling real wages all hit low-income households.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the achievements of the 1980s is best supported by evidence from the lesson?",
    options: [
      ["Communal farmers sold much more maize once depots, credit and advice reached them", "Correct: this was a real but rain-dependent achievement."],
      ["The economy grew steadily and without interruption throughout the whole decade", "Droughts and recession interrupted growth."],
      ["Unemployment was ended by the jobs that the state-owned enterprises offered", "Job creation lagged behind the growth of the labour force."],
      ["Shortages of foreign currency came to an end after the ZIMCORD conference", "Shortages continued through the decade."],
    ],
    answer: "A",
    hints: ["Choose the claim with a cause and an effect that the lesson states."],
    explanation: "Smallholder maize sales rose because marketing, credit and extension were extended to communal areas, though good rains also mattered.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which is the best example of an EXTERNAL factor that limited the economy in the 1980s?",
    options: [
      ["The war in Mozambique and South African destabilisation of trade routes", "Correct: this lay outside Zimbabwe's control."],
      ["Budget deficits caused by government spending that grew faster than revenue", "This is an internal policy factor."],
      ["Inefficiency in state-owned enterprises and delays over import licences", "This is an internal factor."],
      ["Price and wage controls that discouraged exporters and local investment", "These were internal controls."],
    ],
    answer: "A",
    hints: ["Which factor did Zimbabwe's government not control?"],
    explanation: "External factors included world recession, drought, instability in Mozambique and South African destabilisation; deficits, controls and enterprise inefficiency were internal.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What happened on 14 November 1997, known as \"Black Friday\"?",
    options: [
      ["The Zimbabwe dollar lost much of its value within hours", "Correct: it was a currency crash."],
      ["The government announced the start of ESAP in a budget speech", "ESAP began in 1991."],
      ["Troops were sent to support the government of the Democratic Republic of Congo", "That decision came in 1998."],
      ["Food riots broke out in Harare and Bulawayo over rising prices", "The riots came in January 1998."],
    ],
    answer: "A",
    explanation: "On 14 November 1997 the Zimbabwe dollar collapsed in value after the government's unbudgeted commitments to war veterans and other pressures.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Transitional National Development Plan came before the first Five-Year National Development Plan.", answer: true,
    explanation: "The TNDP covered 1982/83 to 1984/85; the first Five-Year National Development Plan covered 1986-90.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "ESAP was introduced because the government wanted to extend price and import controls.", answer: false,
    explanation: "ESAP did the opposite: it removed controls and moved towards the market.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Historians agree that the weather was the only reason for the economic difficulties of the 1990s.", answer: false,
    hints: ["Think of debt, ESAP's effects and political events."],
    explanation: "Droughts mattered, but debt, deficits, ESAP's effects, the 1997 war veterans' payments and other policies also contributed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or plan to its description.",
    pairs: [
      ["ZIMCORD", "The March 1981 donors' conference on reconstruction and development"],
      ["Cost recovery", "Charging fees for services such as health and education"],
      ["ZIMPREST", "The 1996-2000 programme that replaced ESAP"],
      ["Balance of payments deficit", "Spending more foreign currency than a country earns"],
    ],
    explanation: "These are the key terms of the economic blueprints.",
  });
  {
    const events = [
      "Growth with Equity is published",
      "The Transitional National Development Plan begins",
      "ESAP begins",
      "The Zimbabwe dollar crashes on Black Friday",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1981, 1982/83, 1991 and 1997."],
      explanation: "1981; 1982/83; 1991; 14 November 1997.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Economic Structural Adjustment Programme began in {{blank:a}} with the support of the IMF and the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1991"], choices: ["1981", "1986", "1991", "1996"] },
      { id: "b", accepted: ["World Bank"], choices: ["World Bank", "African Union", "League of Nations", "Commonwealth Secretariat"] },
    ],
    explanation: "ESAP began in 1991 with the support of the IMF and the World Bank.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which international organisation, with the World Bank, supported ESAP? Give its name or its initials.",
    accepted: ["IMF", "International Monetary Fund", "the IMF"],
    wrong: ["UNESCO"],
    explanation: "The **International Monetary Fund (IMF)** and the World Bank supported ESAP.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the government tried to help smallholder farmers in the 1980s.",
    points: ["Opened new Grain Marketing Board depots close to communal areas", "Extended Agricultural Finance Corporation loans to small farmers", "Sent more extension officers to communal areas", "Raised producer prices for maize and other crops"],
    modelAnswer: "The government opened new Grain Marketing Board depots near communal areas so that farmers could sell their crops. The Agricultural Finance Corporation lent money to small farmers for seed and fertiliser, and more extension officers were sent to advise them. Producer prices for maize were also raised.",
    explanation: "One mark for each way of helping, described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the government adopted ESAP in 1991.",
    points: [["By 1990 growth was low, unemployment high and the budget deficit and debt were large, so the old controls seemed to be failing", 2], ["Lenders and local business pressed for reform and the IMF and World Bank offered support if controls were removed", 2]],
    hints: ["Give a reason from inside the economy and a reason from outside."],
    modelAnswer: "By 1990 growth was low, unemployment was rising and the budget deficit and the debt were large, so the system of controls looked as if it was not working. Lenders such as the IMF and World Bank, and local business, pressed for reform, and the government hoped that removing controls would bring investment and exports.",
    explanation: "Credit developed reasons, internal and external.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why droughts caused serious economic problems in Zimbabwe.",
    points: [["Harvests fell, so the country had to import maize and lost income from crop exports", 2], ["Agriculture supplied raw materials and jobs to industry and the rural majority, so lower output reduced growth and incomes and strained the budget", 2]],
    hints: ["Think about farming's place in the whole economy."],
    modelAnswer: "A drought cut harvests, so Zimbabwe had to spend foreign currency on imported maize and lost income from exports such as cotton and tobacco. Because farming supplied raw materials for industry and incomes for most people, lower output reduced growth and strained government finances.",
    explanation: "Credit developed links between drought and the wider economy.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an extract from a speech by a fictional Zimbabwean government minister at a rally in the early 1990s",
        "The old system of controls has served us, but it can no longer pay for itself. We must export more, borrow less, and trim the cost of government. Fees for those who can afford them will free money for the poorest."),
      "",
      source("Source B", "a letter to a newspaper from a fictional textile worker in Gweru, 1993",
        "I have worked in the mill for eleven years. Since the new policy began, cheap cloth has arrived from abroad and half my section has been sent home. Now I pay for my children's school books and the clinic, and my wage buys less each month."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reasons does Source A give for changing economic policy?", points: ["Controls can no longer pay for themselves / the cost of government is too high", "The country must export more and borrow less / fees would release money for the poorest"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What effects of the new policy does Source B describe?", points: ["Job losses because of cheap imported cloth", "Fees for school books and clinic visits and falling buying power of wages"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do these sources agree about the effects of ESAP-type policies?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Disagree: A expects exports and more help for the poorest while B reports job losses and harm to a worker's family", 1], ["Agree on one point: both mention fees for services", 1], ["Provenance: A is a government speech meant to justify policy; B is one worker's account written after the event", 1], ["Own knowledge: ESAP brought job losses in textiles and fees, but also some export growth", 1]], modelAnswer: "They disagree about the effects. Source A, a minister speaking to win support, expects more exports and help for the poorest, while Source B, a worker's letter written after the policy began, reports lost jobs, cheap imports and falling wages. They agree that fees were introduced, though A says they free money for the poor and B says they are a burden. My own knowledge supports B on job losses in textiles, but exports in some sectors did grow, so each source shows only part of the picture." }),
    ],
    hints: ["For (c), compare what each source expects or reports and think about who wrote it and when."],
    explanation: "Both sources are invented: a minister's speech and a worker's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the Economic Structural Adjustment Programme a failure?",
    levels: levels(12),
    points: [
      ["Aims: restore growth, cut the deficit, attract investment, increase exports", 2],
      ["Evidence of failure: job losses and deindustrialisation, fees, falling real wages, drought of 1991-92", 3],
      ["Evidence of some success: growth in some export sectors such as horticulture and tourism, trade liberalisation", 2],
      ["Other factors: drought, design and speed of reform, pressure from lenders, absence of social safety nets", 3],
      ["Supported judgement", 2],
    ],
    hints: ["Compare the aims with the results, and consider what else was happening at the time."],
    modelAnswer: "ESAP largely failed to achieve its main aims of growth and jobs, although the picture was not entirely negative. It aimed to restore growth, reduce the deficit and attract investment. In practice, many factories closed or cut staff when cheaper imports arrived, real wages fell, and the fees for health and schooling fell hardest on poor families. The severe drought of 1991-92, which struck at the start, deepened the difficulties. Some sectors, such as horticulture and tourism, did expand, and trade was liberalised. But ESAP was introduced quickly, with weak protection for the poor, and it did not produce the investment that was hoped for. I conclude that ESAP was more of a failure than a success, though drought and the manner of its design, not the idea alone, explain much of that.",
    explanation: "Credit aims, evidence for and against, other factors and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of drought and debt in explaining the economic difficulties of Zimbabwe between 1980 and 1997.",
    levels: levels(8),
    points: [
      ["Drought: the droughts of 1982-84 and 1991-92 cut harvests, exports and revenue and forced imports", 2],
      ["Debt and deficits: borrowing for services and plans, shortages of foreign currency, debt payments", 2],
      ["Other factors: world recession, state controls, ESAP's effects, regional instability", 2],
      ["Judgement on the relative importance of drought and debt", 2],
    ],
    hints: ["Compare an external cause with a financial one, and say what else mattered."],
    modelAnswer: "Drought and debt were both important, but neither was the whole story. The droughts of 1982-84 and 1991-92 cut harvests and export earnings and forced the country to import food. Debt and budget deficits limited what the government could spend on investment and left it short of foreign currency. But the world recession, state controls, instability in the region and the effects of ESAP also mattered. I conclude that drought explains the sharpest shocks, while debt and policy choices explain why the economy found recovery so difficult.",
    explanation: "Credit explained drought and debt, other factors and a judgement.",
  });

  b.card("DEFINITION", "What is structural adjustment?", "A package of policies, usually agreed with the IMF and World Bank, that moves an economy towards the market: cutting spending, removing controls, devaluing the currency and selling state businesses.");
  b.card("DEFINITION", "What is a balance of payments deficit?", "A situation in which a country spends more foreign currency on imports and debt payments than it earns.");
  b.card("FACT", "What was Growth with Equity?", "The first policy statement of independent Zimbabwe (March 1981), balancing growth with spending on education, health and rural development.");
  b.card("FACT", "What was ZIMCORD?", "The Zimbabwe Conference on Reconstruction and Development, held in March 1981, at which donors pledged large amounts of aid and loans.");
  b.card("FACT", "When did ESAP begin, and who supported it?", "1991, with the support of the IMF and the World Bank.");
  b.card("FACT", "What was ZIMPREST?", "The Zimbabwe Programme for Economic and Social Transformation (1996-2000), which replaced ESAP.");
  b.card("FACT", "What happened on 14 November 1997?", "\"Black Friday\": the Zimbabwe dollar lost a large part of its value in a few hours.");
  b.card("CONCEPT", "Why did the economy struggle in the 1980s despite early growth?", "Droughts, world recession, shortages of foreign currency, deficits, controls and regional instability.");
  b.card("CONCEPT", "Why is ESAP described as having a high social cost?", "Job losses in manufacturing, user fees for health and education, higher prices and falling real wages.");
});
