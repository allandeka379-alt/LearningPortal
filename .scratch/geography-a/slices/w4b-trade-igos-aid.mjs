// W4b: trade.igos-aid (Cambridge only; tagged automatically). Organisation facts: WTO 1995 (successor to GATT 1947), Geneva; UNCTAD 1964, Geneva;
// UN 0.7% GNI ODA target (1970); Aid for Trade 2005. All amounts are illustrative.
// Computed: 9/2 000 = 0.45%, target 14, shortfall 5; tied 240, untied 360, aid per person 40; aid share of budget 40%.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const pct = chk((9 / 2000) * 100, 0.45, 1e-9);
const target = chk(0.007 * 2000, 14, 1e-9);
const short = chk(target - 9, 5, 1e-9);
const tied = chk(0.4 * 600, 240, 1e-9);
const untied = chk(600 - tied, 360, 1e-9);
const perHead = chk(600e6 / 15e6, 40, 1e-9);
const budgetShare = chk((1200 / 3000) * 100, 40, 1e-9);
const projPct = rnd((70 / 350) * 100, 1, 20, "projPct");
const AT = tbl(["Item", "Value (US\\$ million)"], [["Total government budget", "3 000"], ["Aid received (grants and loans)", "1 200"], ["Of which tied to donor purchases", 480], ["Of which spent on health and education", 420]]);
const tiedShare = chk((480 / 1200) * 100, 40, 1e-9);
const hePct = chk((420 / 1200) * 100, 35, 1e-9);

concept("ageo.trade.igos-aid", { file: "trade/igos-aid", keyPrefix: "trade.igos-aid" }, (b) => {
  mc(b, 1, "RECALL", "Which organisation replaced the General Agreement on Tariffs and Trade (GATT) in 1995?", [
    ["The World Trade Organization", "Correct: the WTO took over from GATT."],
    ["The World Bank", "The World Bank lends for development."],
    ["The International Red Cross and Red Crescent", "This is a humanitarian organisation."],
    ["The African Union", "This is a continental political union."],
  ], "The **WTO** replaced GATT in 1995.");
  mc(b, 2, "UNDERSTANDING", "What is the main role of UNCTAD?", [
    ["Research and advice that help developing countries take part in trade and investment", "Correct: UNCTAD works for developing countries' interests."],
    ["Enforcing fines on countries that break trade rules and agreements", "UNCTAD has no enforcement power."],
    ["Lending money for large construction projects", "That is the role of development banks."],
    ["Setting the price of oil on world markets", "UNCTAD does not set prices."],
  ], "UNCTAD does **research, advice and advocacy** for developing countries.");
  mc(b, 2, "UNDERSTANDING", "What is tied aid?", [
    ["Aid that must be spent on goods from the donor", "Correct: it limits the recipient's choices."],
    ["Aid sent in the form of ropes and building materials", "Tied has a different meaning."],
    ["Aid that has to be repaid within one year", "This describes a short-term loan."],
    ["Aid given only by non-governmental organisations", "NGOs give many types of aid."],
  ], "**Tied aid** must be spent on the donor's goods and services.");
  mc(b, 3, "APPLICATION", "After a cyclone, a government receives food, tents and medical teams from abroad. What type of aid is this?", [
    ["Humanitarian (emergency) aid", "Correct: it meets urgent needs after a disaster."],
    ["Long-term development aid", "Development aid builds services over years."],
    ["Aid for Trade", "This builds trade capacity."],
    ["Climate finance for mitigation", "It is not for mitigation."],
  ], "Short-term relief after a disaster is **humanitarian aid**.", { hints: ["Is the aid short-term or long-term?"] });
  mc(b, 3, "ANALYSIS", "Which is a common criticism of the WTO made by developing countries?", [
    ["Rich countries keep farm subsidies and barriers while asking poor countries to open", "Correct: it is a widely made criticism."],
    ["It requires all members to use the same currency", "The WTO does not do this."],
    ["It forbids all countries from trading with each other in any goods", "Its aim is to promote trade."],
    ["It sets the wages of all workers in member countries", "The WTO does not set wages."],
  ], "Critics point to **unequal rules and subsidies**.", { hints: ["Think about farm subsidies and negotiating power."] });
  mc(b, 4, "EVALUATION", "A recipient government receives aid equal to 40% of its budget. Which conclusion is most reasonable?", [
    ["It depends heavily on donors, which may limit its independence", "Correct: a large share of budget from aid creates dependence."],
    ["It has no need of its own taxes or exports", "It still collects taxes and earns exports."],
    ["Its people are certain to be richer than those of donor countries", "The figure does not show this."],
    ["The aid must all be in the form of gifts", "Aid may include loans."],
  ], "A large share of the budget from aid shows **dependence**.", { hints: ["Think about what happens if donors cut the aid."] });
  b.tf({ d: 1, skill: "RECALL", stem: "The headquarters of both the WTO and UNCTAD are in Geneva.", answer: true,
    feedbackTrue: "Correct: both are based in Geneva, Switzerland.",
    feedbackFalse: "Not so: both organisations are in Geneva.",
    explanation: "WTO and UNCTAD are both based in Geneva." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Aid always consists of gifts that never have to be repaid.", answer: false,
    feedbackFalse: "Correct: some aid is given as loans that must be repaid.",
    feedbackTrue: "Not so: loans form part of aid.",
    explanation: "Aid can be grants or loans." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Aid given directly from one government to another is called {{blank:a}} aid. Aid channelled through bodies such as the World Bank is {{blank:b}} aid.",
    blanks: [
      { id: "a", accepted: ["bilateral"], choices: ["bilateral", "multilateral", "tied"] },
      { id: "b", accepted: ["multilateral"], choices: ["multilateral", "bilateral", "humanitarian"] },
    ], explanation: "**Bilateral** (one to one); **multilateral** (through IGOs)." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each organisation or term to its description.",
    pairs: [
      ["WTO", "Negotiates trade rules and settles trade disputes"],
      ["UNCTAD", "Researches and advises on trade and development for developing countries"],
      ["NGO", "Non-governmental organisation funded by donations, such as Oxfam"],
      ["Aid for Trade", "Support for roads, ports and skills so countries can trade"],
    ], explanation: "Each has a different role." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%",
    stem: "A donor with a gross national income (GNI) of US\\$2 000 billion gives US\\$9 billion in aid (illustrative data). Calculate the aid as a percentage of GNI.",
    hints: ["Aid ÷ GNI × 100."],
    value: pct, dp: 2, wrong: [4.5, 0.7],
    explanation: "9 ÷ 2 000 × 100 = **0.45%**, below the UN target of 0.7%. The value 4.5 is a decimal-place slip." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$ million",
    stem: "A donor gives US\\$600 million of aid, of which 40% is tied to the purchase of its own goods and services. Calculate the amount of untied aid, in US\\$ million.",
    hints: ["Find the tied amount first."],
    value: untied, wrong: [240, 560],
    explanation: "Tied = 0.40 × 600 = 240. Untied = 600 − 240 = **US\\$360 million**." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A donor with GNI of US\\$2 000 billion aims to meet the UN target of 0.7% of GNI but gives only US\\$9 billion. Calculate the shortfall, in US\\$ billion (enter the number only).",
    hints: ["Work out the target in US\\$ billion first."],
    value: short, wrong: [14, 9],
    explanation: "1. Target = 0.007 × 2 000 = US\\$14 billion.\n2. Shortfall = 14 − 9 = **US\\$5 billion**." });
  b.short({ d: 1, skill: "RECALL", stem: "Give the acronym of the organisation that replaced GATT in 1995 to oversee world trade rules.",
    accepted: ["WTO", "World Trade Organization", "World Trade Organisation"], wrong: ["UNCTAD"],
    explanation: "The **WTO**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What term describes aid that the recipient must spend on goods and services from the donor country?",
    accepted: ["tied aid", "tied", "tied aid."], wrong: ["untied aid"],
    explanation: "**Tied aid**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline four roles of the World Trade Organization.",
    hints: ["Think of negotiation, rules, disputes and monitoring."],
    points: [
      "It provides a forum in which members negotiate trade agreements.",
      "It administers the agreed rules, including on intellectual property.",
      "It settles disputes between members through a legal procedure.",
      "It monitors members' trade policies and promotes non-discrimination.",
    ],
    modelAnswer: "The WTO provides a forum in which members negotiate trade agreements, administers the agreed rules including those on intellectual property, settles disputes between members through a legal procedure, and monitors members' trade policies while promoting non-discrimination.",
    explanation: "Negotiate, administer, settle disputes and monitor." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two benefits and two problems of tied aid for the recipient.",
    hints: ["Think about what the money buys and who gains."],
    points: [
      "Benefit: it provides a project, such as a bridge or hospital, that the recipient might not afford.",
      "Benefit: the donor may also provide skills and technology with the goods.",
      "Problem: much of the money returns to the donor's firms, so the recipient's own businesses gain less.",
      "Problem: goods and services may cost more or be unsuited to local needs.",
    ],
    modelAnswer: "Tied aid provides a project, such as a bridge or hospital, that the recipient might not afford, and the donor may provide skills and technology with the goods. However, much of the money returns to the donor's firms, so local businesses gain less, and the goods and services may cost more or be unsuited to local needs.",
    explanation: "Two benefits and two problems." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four reasons why a donor government gives aid.",
    hints: ["Think about humanitarian, economic and political reasons."],
    points: [
      "Moral concern and a wish to reduce poverty and suffering.",
      "To build trade links and markets for the donor's firms.",
      "To gain political influence or support in international organisations.",
      "To improve security, health and stability that affect the donor, such as limiting disease or migration pressures.",
    ],
    modelAnswer: "Governments give aid from moral concern and a wish to reduce poverty and suffering, to build trade links and markets for their firms, and to gain political influence or support in international organisations. Aid may also improve security, health and stability that affect the donor.",
    explanation: "Moral, economic, political and security reasons." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `A developing country's government budget and the aid it receives in one year are shown (illustrative data).\n\n${AT}`,
    hints: ["Percentage = part ÷ whole × 100.", "Compare aid with the government budget."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate aid as a percentage of the government budget.", value: budgetShare, unit: "%", wrong: [250, 60],
        explanation: "1 200 ÷ 3 000 × 100 = 40%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of the aid that is tied.", value: tiedShare, unit: "%", wrong: [16, 25],
        explanation: "480 ÷ 1 200 × 100 = 40%." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the percentage of the aid that is spent on health and education.", value: hePct, unit: "%", wrong: [14, 28],
        explanation: "420 ÷ 1 200 × 100 = 35%." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the high share of aid in the budget may be a problem.",
        points: [
          "The government depends on donors, and a cut in aid would force cuts in services.",
          "Donors may attach conditions that limit the government's policy choices.",
          "Dependence may weaken the incentive to raise tax revenue and develop the economy's own income.",
        ],
        modelAnswer: "The government depends on donors, so a cut in aid would force cuts in services. Donors may attach conditions that limit policy choices, and dependence may weaken the incentive to raise tax revenue and develop the economy's own income.",
        explanation: "Dependence, conditions and weak incentives." }),
    ], explanation: "Analyse aid dependence from budget data." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "A donor with a gross national income (GNI) of US\\$2 000 billion gives US\\$9 billion in aid, of which US\\$600 million goes to one country, 40% tied to the donor's firms (illustrative data).",
    hints: ["Target = 0.7% of GNI.", "Tied share of the US\\$600 million = 40%."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the donor's aid as a percentage of GNI, to 2 decimal places.", value: pct, dp: 2, unit: "%", wrong: [4.5, 0.7],
        explanation: "9 ÷ 2 000 × 100 = 0.45%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate how much of the US\\$600 million is tied, in US\\$ million.", value: tied, unit: "US$ million", wrong: [360, 40],
        explanation: "0.40 × 600 = US\\$240 million." }),
      P.num({ label: "(c)", marks: 2, stem: "The recipient has 15 million people. Calculate the aid per person, in US\\$.", value: perHead, unit: "US$", wrong: [0.025, 400],
        explanation: "600 000 000 ÷ 15 000 000 = US\\$40." }),
      P.manual({ label: "(d)", marks: 6, stem: "Explain how aid might benefit the donor as well as the recipient.",
        points: [
          "Tied aid gives contracts and exports to the donor's firms.",
          "Aid builds trade links and goodwill that can lead to future markets.",
          "Better health and stability in the recipient reduce risks such as disease and conflict that can affect the donor.",
          "The donor gains political influence and a strong reputation internationally.",
          "Recipients whose incomes rise become future trading partners and customers.",
          "Aid projects can spread the donor's technology and standards, which creates lasting demand for its goods and services.",
        ],
        modelAnswer: "Tied aid gives contracts and exports to the donor's firms, and aid builds trade links and goodwill that can lead to future markets. Better health and stability in the recipient reduce risks such as disease and conflict that can affect the donor, and the donor gains political influence and a good reputation. Recipients whose incomes rise become future customers, and aid projects can spread the donor's technology and standards, creating lasting demand for its goods and services.",
        explanation: "Contracts, markets, security and influence." }),
    ], explanation: "Calculate aid ratios and discuss donor benefits." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the view that international aid is the best way to improve the development of poorer countries.",
    hints: ["Consider types of aid, benefits and problems.", "Compare with trade and other approaches."],
    points: [
      "Emergency aid saves lives quickly after disasters and conflicts.",
      "Development aid for health, education and water improves living standards and skills.",
      "Aid can pay for infrastructure that poorer governments cannot afford.",
      "Tied aid sends much of the money back to the donor, and loans must be repaid.",
      "Aid may create dependence, be misused, or fail when it does not match local needs.",
      "Trade, investment and fair rules, such as better access to markets, can provide longer-term income.",
      "Aid for Trade and technical help from UNCTAD and the WTO link aid to trade capacity.",
      "Judgement: aid is useful, especially untied and well-planned aid, but it is not the best way on its own, and sustainable development needs trade, governance and local ownership.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Emergency aid saves lives quickly after disasters and conflicts, and development aid for health, education and water improves living standards and skills; aid can also pay for infrastructure that poorer governments cannot afford. However, tied aid sends much of the money back to the donor, loans must be repaid, and aid may create dependence, be misused or fail when it does not match local needs. Trade, investment and fairer access to markets can provide longer-term income, and Aid for Trade and technical help from UNCTAD and the WTO link aid to trade capacity. I conclude that aid is useful, especially if untied and well planned, but it is not the best way on its own: sustainable development also needs trade, good governance and local ownership.",
    wordLimit: { max: 300 }, explanation: "Weigh benefits and problems of aid against other approaches and judge." });

  b.card("DEFINITION", "World Trade Organization (WTO)", "Set up in 1995, replacing GATT (1947), based in Geneva; negotiates trade rules, settles disputes and monitors policies.");
  b.card("DEFINITION", "UNCTAD", "United Nations Conference on Trade and Development, created 1964 in Geneva; researches, advises and speaks for developing countries.");
  b.card("CONCEPT", "Types of aid", "Humanitarian, development and climate aid; bilateral or multilateral; tied or untied; from governments, IGOs and NGOs.");
  b.card("DEFINITION", "Tied aid", "Aid that must be spent on goods and services from the donor country.");
  b.card("FACT", "UN aid target", "Rich countries are asked to give 0.7% of gross national income as official development assistance (target set in 1970).");
  b.card("FACT", "Aid for Trade", "A WTO initiative begun in 2005 to help developing countries build roads, ports, skills and rules for trade.");
  b.card("CONCEPT", "Benefits of aid to a recipient", "Saves lives, builds health, education and infrastructure, and transfers skills and technology.");
  b.card("CONCEPT", "Problems of aid", "Dependence, corruption, tied aid returns money to the donor, unsuitable projects and loan repayments.");
  b.card("FORMULA", "Aid as a percentage of GNI", "Aid ÷ GNI × 100; compare with the 0.7% target.");
});
