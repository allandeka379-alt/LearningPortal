// W4b: ZIMSEC exam-format items. Paper 2 data response (STRUCTURED 20, ANALYSIS) x1: the current account and the terms
// of trade. Paper 3 essays (STRUCTURED 10 = (a) explain 4 + (b) discuss 6, EVALUATION) x3. Fictional data, computed and
// checked here.
import { concept, P, ZIM, table, termsOfTrade, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.bop.current-account", { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  // ---------------- Paper 2: current account and terms of trade.
  {
    const d = {
      vx: [5200, 4650], vm: [5600, 5900], sx: [640, 690], sm: [1100, 1150], nia: [-730, -780], ct: [1520, 1610],
      xpi: [106, 93], mpi: [103, 117],
    };
    const bot = [0, 1].map((k) => d.vx[k] - d.vm[k]);
    const inv = [0, 1].map((k) => d.sx[k] - d.sm[k] + d.nia[k] + d.ct[k]);
    const ca = [0, 1].map((k) => bot[k] + inv[k]);
    const tot = [0, 1].map((k) => termsOfTrade(d.xpi[k], d.mpi[k]));
    check("bot26", bot[1], -1250); check("ca25", ca[0], -70); check("ca26", ca[1], -880); check("inv26", inv[1], 370);
    check("tot25", tot[0], 102.91, 0.01); check("tot26", tot[1], 79.487, 0.001);
    const sign = (v) => (v < 0 ? `−${fmt(-v)}` : `+${fmt(v)}`);
    const T = table(["Item (US\\$ million unless stated)", "2025", "2026"], [
      ["Visible exports", d.vx[0], d.vx[1]],
      ["Visible imports", d.vm[0], d.vm[1]],
      ["Exports of services", d.sx[0], d.sx[1]],
      ["Imports of services", d.sm[0], d.sm[1]],
      ["Net income from abroad", sign(d.nia[0]), sign(d.nia[1])],
      ["Current transfers (net)", sign(d.ct[0]), sign(d.ct[1])],
      ["Export price index (2024 = 100)", d.xpi[0], d.xpi[1]],
      ["Import price index (2024 = 100)", d.mpi[0], d.mpi[1]],
    ]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2", calculator: true,
      concepts: ["econ.bop.current-account", "econ.trade.terms-of-trade", "econ.forex.shortages", "econ.trade.international-trade"],
      stem: `Country K is a fictional landlocked country in southern Africa. Its main exports are gold, platinum and tobacco, and it imports most of its fuel, machinery and fertiliser. Many of its mines are foreign-owned, and many of its citizens work abroad and send money home. In 2026 world prices of gold and platinum fell, the world price of oil rose, and businesses complained of shortages of foreign currency.\n\n**Table 1: Current account and trade prices of Country K**\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: bot[1], stem: "Calculate the balance of trade for 2026, in US\\$ million. Give a deficit as a negative number.", wrong: [-bot[1], d.vx[1] + d.vm[1]], explanation: `Balance of trade = visible exports − visible imports = ${fmt(d.vx[1])} − ${fmt(d.vm[1])} = ${fmt(bot[1])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: ca[1], stem: "Calculate the current account balance for 2026, in US\\$ million. Give a deficit as a negative number.", wrong: [bot[1], -ca[1]], explanation: `Balance of trade ${fmt(bot[1])} + services (${fmt(d.sx[1])} − ${fmt(d.sm[1])} = ${fmt(d.sx[1] - d.sm[1])}) + net income from abroad ${fmt(d.nia[1])} + current transfers +${fmt(d.ct[1])} = ${fmt(ca[1])}.` }),
        P.num({ label: "(c)", marks: 1, kind: "index", value: tot[0], stem: "Calculate the terms of trade for 2025. Give your answer to one decimal place.", wrong: [termsOfTrade(d.mpi[0], d.xpi[0])], explanation: `${d.xpi[0]} ÷ ${d.mpi[0]} × 100 = ${fmt(tot[0], 1)}.` }),
        P.num({ label: "(d)", marks: 1, kind: "index", value: tot[1], stem: "Calculate the terms of trade for 2026. Give your answer to one decimal place.", wrong: [termsOfTrade(d.mpi[1], d.xpi[1])], explanation: `${d.xpi[1]} ÷ ${d.mpi[1]} × 100 = ${fmt(tot[1], 1)}.` }),
        P.fib({
          label: "(e)", marks: 1,
          stem: "Complete the sentence.",
          template: "Between 2025 and 2026 the terms of trade moved {{blank:a}}.",
          blanks: [{ id: "a", accepted: ["unfavourably"], choices: ["favourably", "unfavourably"] }],
          wrong: [["favourably"]],
          explanation: `The index fell from ${fmt(tot[0], 1)} to ${fmt(tot[1], 1)}: export prices fell while import prices rose.`,
        }),
        P.mcq({
          label: "(f)", marks: 1,
          stem: "Which item in Table 1 is mainly made up of money sent home by citizens working abroad?",
          options: [["Current transfers", "Correct: remittances are transfers."], ["Net income from abroad", "This is mainly profits, interest and wages (e.g. profits of foreign-owned mines)."], ["Exports of services", "Remittances are not payment for services."], ["Visible exports", "Visible exports are goods."]],
          answer: "A",
          explanation: "Remittances are current transfers (Cambridge: secondary income).",
        }),
        P.manual({
          label: "(g)", marks: 3,
          stem: "Using Table 1, explain how the change in the terms of trade contributed to the worsening of the balance of trade in 2026.",
          points: [
            "Export prices fell (index 106 → 93) as gold and platinum prices fell, so visible exports fell (5,200 → 4,650).",
            "Import prices rose (103 → 117), mainly oil, so the cost of visible imports rose (5,600 → 5,900).",
            "Imports such as fuel are essential (inelastic demand), so the import bill rose; the deficit widened from −400 to −1,250.",
          ],
          modelAnswer: "The terms of trade fell because export prices fell from 106 to 93 as gold and platinum prices dropped, so the value of visible exports fell from US\\$5,200 million to US\\$4,650 million. At the same time import prices rose from 103 to 117, mainly because of dearer oil. Fuel, machinery and fertiliser are essential, so Country K could not cut its imports much, and the import bill rose from US\\$5,600 million to US\\$5,900 million. The balance of trade deficit therefore widened from US\\$400 million to US\\$1,250 million.",
          explanation: "Lower export prices, higher import prices, inelastic import demand, using the figures.",
        }),
        P.manual({
          label: "(h)", marks: 3,
          stem: "Explain why the invisible items helped Country K's current account, and why net income from abroad was negative.",
          points: [
            `Current transfers (remittances) were a large surplus (+${fmt(d.ct[1])}), making the invisible balance positive (+${fmt(inv[1])}).`,
            "This reduced the current account deficit to −880, much smaller than the balance of trade deficit.",
            "Net income from abroad was negative because profits of the foreign-owned mines are paid to owners abroad.",
          ],
          modelAnswer: `Money sent home by citizens working abroad gave a large surplus on current transfers (US\\$${fmt(d.ct[1])} million), which outweighed the deficits on services and net income, so the invisible balance was +US\\$${fmt(inv[1])} million and the current account deficit (−US\\$${fmt(-ca[1])} million) was much smaller than the balance of trade deficit. Net income from abroad was negative because many mines are foreign-owned, so their profits and dividends are paid to owners in other countries.`,
          explanation: "Remittances offset the visible deficit; profit outflows explain negative net income.",
        }),
        P.manual({
          label: "(i)", marks: 6, levels: LV(6),
          stem: "Discuss the measures Country K could take to reduce its current account deficit and its shortage of foreign currency.",
          points: [
            "Increase and diversify exports: add value to minerals and tobacco, horticulture, manufactured goods for SADC/COMESA markets; reduces dependence on volatile mineral prices.",
            "Promote tourism and attract remittances through official channels; encourage foreign direct investment.",
            "Reduce imports: protection/tariffs on non-essential imports, import substitution (e.g. local fertiliser, renewable energy to cut fuel imports).",
            "Limitations: protection raises prices and invites retaliation; diversification takes time and investment; essential imports cannot be cut; borrowing adds to future outflows.",
            "Uses the data: the deficit rose from −70 to −880 mainly through the terms of trade, a partly temporary cause.",
            "Justified conclusion.",
          ],
          modelAnswer: "The deficit widened from US\\$70 million to US\\$880 million mainly because mineral prices fell and oil prices rose, so the best long-run measure is to diversify and add value to exports, for example by refining minerals, processing tobacco and expanding horticulture and manufacturing for SADC and COMESA markets, which would make earnings less dependent on world mineral prices. Promoting tourism, encouraging remittances through banks and attracting foreign investment would bring in more foreign currency. Country K could also reduce imports by placing tariffs on non-essential goods and by producing substitutes, such as local fertiliser or solar power to cut fuel imports. However, tariffs raise prices and may break regional trade agreements or invite retaliation, diversification needs time and investment, and essential imports of fuel and machinery cannot be cut much. Borrowing would ease the shortage now but add to future outflows. Since part of the problem comes from temporary price changes, Country K should combine short-term measures, such as encouraging remittances and limiting luxury imports, with long-term export diversification, which is the only lasting solution.",
          explanation: "Export promotion, import reduction and financing, with their limits; conclude.",
        }),
      ],
      explanation: `Balance of trade 2026 ${fmt(bot[1])}; current account ${fmt(ca[0])} (2025) and ${fmt(ca[1])} (2026); terms of trade ${fmt(tot[0], 1)} → ${fmt(tot[1], 1)} (unfavourable).`,
      hints: ["Balance of trade = visible exports − visible imports.", "Current account = balance of trade + invisible balance (services, net income from abroad, current transfers).", "Terms of trade = export price index ÷ import price index × 100."],
    });
  }

  // ---------------- Paper 3 essays.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.trade.domestic-trade"],
    stem: "Domestic trade links producers with consumers in every part of Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain **four** functions of the wholesaler.",
        points: [
          "Bulk breaking: buys large quantities from producers and sells smaller lots to retailers.",
          "Warehousing/storage: holds stock so producers and retailers need not.",
          "Credit and transport: gives retailers credit and delivers goods.",
          "Risk bearing / information / grading and packing.",
        ],
        modelAnswer: "The wholesaler breaks bulk: it buys large quantities from manufacturers and sells them in smaller lots that suit retailers. It stores goods in warehouses, so producers can keep producing and retailers can buy when they need. It often gives credit to retailers and delivers goods to them. It bears the risk of goods spoiling, being stolen or falling in price, and it passes information about demand and prices between producers and retailers; it may also grade and pack goods.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss the role of informal traders in Zimbabwe's economy.",
        points: [
          "Positive: provide jobs and incomes for many people without formal jobs; reduce poverty.",
          "Positive: sell in small, affordable quantities at convenient places and hours; low prices; reach areas without shops.",
          "Positive: develop enterprise skills; some grow into formal businesses.",
          "Negative: little tax revenue; unfair competition with tax-paying shops.",
          "Negative: poor quality/hygiene and little consumer protection; congestion; insecure incomes, no credit or pensions.",
          "Justified conclusion, e.g. support and gradually formalise rather than ban.",
        ],
        modelAnswer: "Informal traders play a large role in Zimbabwe's economy. Since formal jobs became scarce, vending, cross-border trading and small-scale trading provide incomes for many people who would otherwise be unemployed, reducing poverty. Informal traders sell goods in small, affordable quantities, close to where people live and travel, often at lower prices than shops, and they reach areas that formal retailers do not serve. Trading also builds enterprise skills, and some traders grow into registered businesses. On the other hand, the government collects little tax from informal traders, and shops that pay rent and taxes see their competition as unfair. Goods may be of poor quality or sold unhygienically, consumers have little protection, street trading causes congestion, and traders themselves have insecure incomes without access to credit, insurance or pensions. Overall, informal traders are vital to many households and to the distribution of goods, so the best policy is to support them with proper market sites, simple registration and training, gradually bringing them into the formal sector rather than removing them.",
      }),
    ],
    explanation: "Part (a) explains the wholesaler's functions; part (b) weighs the benefits and problems of informal trade.",
    hints: ["(a) Think about quantity, storage, credit, transport and risk.", "(b) Consider jobs, consumers, tax and regulation."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.trade.comparative-advantage", "econ.trade.free-trade", "econ.trade.protection", "econ.trade.international-trade"],
    stem: "Zimbabwe trades with many countries in the region and the rest of the world.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain the reasons why countries engage in international trade.",
        points: [
          "Factor endowment: countries have different resources (minerals, climate, labour, capital).",
          "Absolute advantage: a country produces more of a good with the same resources, so it specialises in it.",
          "Comparative advantage: a country specialises in the good with the lower opportunity cost; trade raises total output even if one country is better at both.",
          "Example or other reason: goods that cannot be produced at home (e.g. oil); variety; larger markets.",
        ],
        modelAnswer: "Countries trade because their factor endowments differ: Zimbabwe has gold, platinum and a climate suited to tobacco, while other countries have oil fields or large amounts of capital. A country has an absolute advantage when it can produce more of a good than another country with the same resources, and both countries gain if each specialises in what it produces best. Even when one country is better at producing everything, each country has a comparative advantage in the good it produces at the lower opportunity cost; specialising according to comparative advantage and trading raises total output. Countries also trade to obtain goods they cannot produce at all, such as crude oil for Zimbabwe.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether Zimbabwe should adopt free trade rather than protectionism.",
        points: [
          "Free trade: lower prices and wider choice; cheaper imported inputs (fuel, machinery, fertiliser); specialisation according to comparative advantage.",
          "Free trade: larger markets for exporters (SADC, COMESA) and economies of scale; competition improves efficiency.",
          "Protection: infant industries (e.g. processing, manufacturing) can grow; protects jobs; tariff revenue; saves foreign currency; prevents dumping.",
          "Protection drawbacks: higher prices, inefficiency, retaliation, conflict with regional trade agreements.",
          "Free trade drawbacks: local firms close; dependence on primary exports; lost revenue.",
          "Justified conclusion, e.g. largely free trade with temporary, targeted protection for genuine infant industries.",
        ],
        modelAnswer: "Free trade would give Zimbabwean consumers lower prices and more choice, and firms would pay less for imported fuel, machinery and fertiliser. Resources would move into industries where Zimbabwe has a comparative advantage, such as mining, tobacco and tourism, and exporters would gain access to larger markets in SADC and COMESA, gaining economies of scale; competition would also push local firms to become more efficient. However, free trade could force many local manufacturers to close in the face of cheaper imports, leave the country dependent on a few primary exports and reduce customs revenue. Protection could help infant industries, such as mineral processing and food manufacturing, to grow, protect jobs, raise revenue and save foreign currency, and it can stop dumping. But it raises prices, can keep firms inefficient, invites retaliation and may break regional trade commitments. On balance, Zimbabwe should move towards free trade, especially within the region, while giving temporary, carefully targeted protection to genuine infant industries that have a realistic chance of becoming competitive.",
      }),
    ],
    explanation: "Part (a) explains factor endowment and absolute and comparative advantage; part (b) weighs free trade against protection for Zimbabwe.",
    hints: ["(a) Use the terms factor endowment, absolute advantage and comparative advantage.", "(b) Consider consumers, producers, jobs, revenue and retaliation."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.trade.economic-integration"],
    stem: "Zimbabwe is a member of SADC, COMESA and the African Union.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Describe the forms of economic integration.",
        points: [
          "Preferential trade area: reduced tariffs between members.",
          "Free trade area: no tariffs between members; each keeps its own external tariffs.",
          "Customs union: free trade area plus a common external tariff.",
          "Common market (free movement of labour and capital) / economic union (common policies, possibly a single currency).",
        ],
        modelAnswer: "In a preferential trade area, members charge each other lower tariffs than they charge other countries. In a free trade area, members remove tariffs and quotas on trade among themselves, but each keeps its own tariffs on goods from non-members. A customs union is a free trade area with a common external tariff on imports from outside. A common market adds the free movement of labour and capital between members, and an economic union goes further, with common economic policies and possibly a single currency.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss the benefits and problems of regional economic integration for Zimbabwe.",
        points: [
          "Benefits: tariff-free access to larger regional markets; economies of scale for Zimbabwean firms; more exports.",
          "Benefits: cheaper imports and inputs from neighbours; attracts investment (including MNCs seeking access to the regional market); shared infrastructure and one-stop border posts; bargaining power.",
          "Problems: competition from larger, more industrialised members; Zimbabwean firms may close; job losses.",
          "Problems: loss of tariff revenue; overlapping memberships of SADC and COMESA; poor infrastructure and slow borders; members export similar goods.",
          "Evaluation: gains depend on competitiveness of Zimbabwean firms and on infrastructure.",
          "Justified conclusion.",
        ],
        modelAnswer: "Regional integration gives Zimbabwean firms tariff-free access to the markets of its neighbours, so competitive producers can sell more, grow and gain economies of scale. Consumers and firms can buy cheaper goods and inputs from the region, and access to a large regional market encourages investment, including by multinational companies that want a base in southern Africa. Members can also build shared infrastructure, such as roads, power links and one-stop border posts, and negotiate together with the rest of the world. However, larger and more industrialised members can out-compete Zimbabwean firms, causing closures and job losses, and the government loses customs revenue. Overlapping memberships of SADC and COMESA create conflicting rules, poor roads and slow border procedures limit the growth of trade, and many members export similar primary products, so there is less to trade with each other. Overall, integration offers Zimbabwe important long-run benefits, but they will be realised only if its firms become more competitive and infrastructure and border procedures improve.",
      }),
    ],
    explanation: "Part (a) describes the ladder of integration; part (b) weighs regional integration's benefits and problems for Zimbabwe.",
    hints: ["(a) Start with the least integrated form.", "(b) Consider exporters, consumers, weaker firms, revenue and practical problems."],
  });
});
