// W4b: econ.trade.economic-integration (ZIMSEC only) — forms and reasons for economic integration, aims of SADC,
// COMESA and the African Union (well-established facts only), benefits and problems for Zimbabwe.
import { concept, P, table, fmt, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.trade.economic-integration", { file: "trade/economic-integration", keyPrefix: "trade.economic-integration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **customs union**?",
    options: [
      ["A free trade area with a common external tariff", "Correct."],
      ["A group of countries that share a single currency", "That is a monetary union."],
      ["A group of countries that charge lower tariffs to each other", "That is a preferential trade area."],
      ["A ban on all imports from outside a region", "That would be an embargo."],
    ],
    answer: "A",
    explanation: "A customs union removes tariffs between members and sets one common tariff on imports from non-members.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where is the headquarters of the Southern African Development Community (SADC)?",
    options: [
      ["Gaborone, Botswana", "Correct."],
      ["Lusaka, Zambia", "Lusaka is the headquarters of COMESA."],
      ["Addis Ababa, Ethiopia", "Addis Ababa is the headquarters of the African Union."],
      ["Harare, Zimbabwe", "Zimbabwe is a member, but SADC's headquarters is in Botswana."],
    ],
    answer: "A",
    explanation: "SADC: Gaborone; COMESA: Lusaka; African Union: Addis Ababa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature distinguishes a **common market** from a customs union?",
    options: [
      ["Free movement of labour and capital between members", "Correct."],
      ["Removal of tariffs on trade between members", "Both have this feature."],
      ["A common external tariff on non-members", "Both have this feature."],
      ["Each member keeping its own tariffs against non-members", "That describes a free trade area."],
    ],
    answer: "A",
    explanation: "A common market adds the free movement of factors of production (labour and capital) to a customs union.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organisation replaced the Organisation of African Unity (OAU) in 2002?",
    options: [
      ["The African Union", "Correct."],
      ["COMESA", "COMESA replaced the PTA in 1994."],
      ["SADC", "SADC grew out of SADCC in 1992."],
      ["The World Trade Organization", "The WTO is a world body set up in 1995."],
    ],
    answer: "A",
    explanation: "The African Union was launched in 2002, replacing the OAU, which was founded in 1963.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How can membership of a regional free trade area help a Zimbabwean manufacturer to lower its average costs?",
    options: [
      ["Tariff-free access to a larger market lets it raise output and gain economies of scale", "Correct."],
      ["Its government can charge higher tariffs on goods from other members", "A free trade area removes tariffs between members."],
      ["It no longer faces any competition from firms based in other member countries of the area", "Competition from members increases."],
      ["It can charge higher prices because consumers must buy local goods", "Consumers can buy from any member without tariffs."],
    ],
    answer: "A",
    hints: ["What happens to average cost as a firm grows?"],
    explanation: "Selling to the whole region lets the firm expand; larger output spreads fixed costs and allows bulk buying, lowering average costs.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the most likely **problem** for Zimbabwe of deeper integration with a larger, more industrialised neighbour?",
    options: [
      ["Some Zimbabwean firms may close because they cannot compete", "Correct: stronger firms win market share."],
      ["Zimbabwean consumers will face higher prices for imports", "Removing tariffs lowers import prices."],
      ["Zimbabwean exporters will face higher tariffs in the region", "Integration lowers tariffs for members."],
      ["Zimbabwe will be unable to trade with any non-member", "Integration does not ban trade with others."],
    ],
    answer: "A",
    hints: ["Who wins when tariffs between unequal economies are removed?"],
    explanation: "Larger firms with economies of scale can undercut smaller producers once tariffs go, causing closures and job losses unless local firms become more efficient.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do overlapping memberships of SADC and COMESA cause difficulties?",
    options: [
      ["A country cannot easily apply two different common external tariffs", "Correct: conflicting rules make a single customs union hard."],
      ["Members of both bodies may not trade with each other", "They can trade with each other."],
      ["The two bodies require different currencies for all trade between their members", "Neither body has a single currency."],
      ["Overlapping members must leave the African Union", "There is no such rule."],
    ],
    answer: "A",
    hints: ["Think about what a customs union requires of each member."],
    explanation: "A customs union needs one external tariff; a country in two blocs with different tariffs faces conflicting rules and paperwork.",
  });

  // Numericals.
  {
    const pm = 70, pn = 64, t = 25;
    const pmT = pm * (1 + t / 100), pnT = pn * (1 + t / 100);
    check("pmT", pmT, 87.5); check("pnT", pnT, 80);
    const saving = pnT - pm;
    check("saving", saving, 10);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: saving, calculator: true,
      stem: `A fictional COMESA member imports fertiliser. Before tariffs it costs US\\$${pm} a bag from another member and US\\$${pn} a bag from a non-member. Both are charged a ${t}% tariff at first, so the country buys the cheaper one. After a free trade area is formed, goods from members pay no tariff. By how much does the price paid by farmers fall, in US\\$ per bag, if they switch to the cheapest supplier?`,
      wrong: [pmT - pm, pm - pn],
      hints: ["Find both prices including the tariff before the free trade area.", "After the free trade area, compare US$70 with the non-member's price including the tariff.".replace("US$", "US\\$")],
      explanation: `1. Before: member ${pm} × 1.25 = US\\$${fmt(pmT, 2)}; non-member ${pn} × 1.25 = US\\$${fmt(pnT)}. Farmers pay US\\$${fmt(pnT)}.\n2. After: member US\\$${pm} (no tariff); non-member still US\\$${fmt(pnT)}. Farmers pay US\\$${pm}.\n3. Fall in price = ${fmt(pnT)} − ${pm} = **US\\$${saving}** a bag.`,
    });
    const lost = pn * t / 100;
    check("lost", lost, 16);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: lost,
      stem: `Using the same situation (non-member price US\\$${pn} a bag, tariff ${t}%), how much tariff revenue per bag does the government lose when farmers switch to the member's tariff-free fertiliser?`,
      wrong: [pm * t / 100, saving],
      hints: ["Before the switch, the tariff was charged on the non-member's price."],
      explanation: `The government used to collect ${t}% × US\\$${pn} = **US\\$${lost}** a bag; goods from members pay no tariff, so this revenue is lost.`,
    });
  }
  {
    const intra = 1350, total = 4500, sh = (intra / total) * 100;
    check("sh", sh, 30);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: sh, daily: true,
      stem: `A fictional country's exports total US\\$${fmt(total)} million, of which US\\$${fmt(intra)} million go to fellow members of its regional trade bloc. Calculate the percentage of its exports that go to the bloc. Give your answer to one decimal place.`,
      wrong: [(intra / (total - intra)) * 100],
      explanation: `${fmt(intra)} ÷ ${fmt(total)} × 100 = **${pct(sh, 1)}**.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe is a member of SADC, COMESA and the African Union.",
    answer: true,
    explanation: "True. Zimbabwe belongs to all three.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a free trade area, all members must charge the same tariff on imports from non-members.",
    answer: false,
    explanation: "False. That is a feature of a customs union. In a free trade area each member keeps its own external tariffs.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organisation with a correct fact about it.",
    pairs: [
      ["SADC", "Formed in 1992 from SADCC; headquarters in Gaborone"],
      ["COMESA", "Formed in 1994 from the PTA; headquarters in Lusaka"],
      ["African Union", "Launched in 2002, replacing the OAU; headquarters in Addis Ababa"],
    ],
    extraRight: ["Formed in 1995 to negotiate world trade rules; headquarters in Geneva"],
    explanation: "SADC (1992, Gaborone), COMESA (1994, Lusaka), AU (2002, Addis Ababa). The extra statement describes the WTO.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The forms of integration, from the least to the most integrated, are: preferential trade area, {{blank:a}}, customs union, {{blank:b}}, and economic union.",
    blanks: [
      { id: "a", accepted: ["free trade area"], choices: ["free trade area", "common market"] },
      { id: "b", accepted: ["common market"], choices: ["free trade area", "common market"] },
    ],
    wrong: [["common market", "free trade area"]],
    hints: ["A customs union adds a common external tariff to which form?"],
    explanation: "PTA → free trade area → customs union → common market → economic (monetary) union.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Give **two** reasons why countries form regional economic groupings such as SADC.",
    points: [
      "Larger market for firms…",
      "…allowing economies of scale and more trade / specialisation.",
      "Other reason: attract investment / joint infrastructure / bargaining power / peace and development…",
      "…developed, e.g. shared roads and border posts lower transport costs.",
    ],
    modelAnswer: "First, removing barriers creates a much larger market, so firms can sell across the region, grow and gain economies of scale, and members can specialise in what they produce best. Second, members can plan shared infrastructure such as roads, railways, power lines and one-stop border posts, which lowers transport costs and delays and makes trade easier.",
    hints: ["Think about markets, costs and cooperation."],
    explanation: "Two marks per reason: identify + develop.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** problems that limit the benefits of regional integration in southern Africa.",
    points: [
      "Members produce similar primary exports…",
      "…so there is little to trade with each other and most manufactured goods still come from outside.",
      "Other problem: poor infrastructure and slow borders / overlapping memberships / dominance of the largest economy / lost tariff revenue…",
      "…developed, e.g. delays at borders raise costs and cancel out the tariff cuts.",
    ],
    modelAnswer: "First, many members export similar primary products such as minerals and farm produce and import manufactured goods from outside the region, so there is less trade between members to gain from. Second, poor roads and railways and slow border procedures raise the cost and time of moving goods, so lower tariffs do not increase trade as much as expected; overlapping memberships of SADC and COMESA also create conflicting rules.",
    hints: ["Think about what members produce and how goods move."],
    explanation: "Two marks per problem.",
  });

  // Structured 1 (8 marks).
  {
    const y = [["2024", 2800, 980], ["2026", 3200, 1280]];
    const sh = y.map(([, t, r]) => (r / t) * 100);
    check("s0", sh[0], 35); check("s1", sh[1], 40);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country S is a fictional member of a regional free trade area in southern Africa. The table shows its exports (US\\$ million).\n\n${table(["Year", "Total exports", "Exports to other members"], y)}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: sh[0], stem: "Calculate the percentage of exports that went to other members in 2024. Give your answer to one decimal place.", wrong: [(980 / (2800 - 980)) * 100], explanation: `980 ÷ 2,800 × 100 = ${pct(sh[0], 1)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: sh[1], stem: "Calculate the same percentage for 2026. Give your answer to one decimal place.", wrong: [(1280 / (3200 - 1280)) * 100], explanation: `1,280 ÷ 3,200 × 100 = ${pct(sh[1], 1)}.` }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Suggest **two** reasons why Country S's exports to other members grew faster than its total exports.",
          points: ["Tariffs on goods traded between members were removed, making its goods cheaper in the region.", "Other: better roads/one-stop border posts; members' economies growing; firms gaining scale in the regional market."],
          modelAnswer: "Tariffs between members were removed, so its goods became cheaper for buyers in the region; and improvements such as one-stop border posts reduced delays and transport costs.",
          explanation: "One mark per reason.",
        }),
        P.manual({
          label: "(d)", marks: 4, levels: LV(4),
          stem: "Discuss whether Country S has benefited from membership of the free trade area.",
          points: [
            "Benefits: regional exports up from US$980m to US$1,280m (share 35% → 40%); more output, jobs and foreign currency.".replace(/US\$/g, "US\\$"),
            "Benefits: cheaper imports from members for consumers and firms.",
            "Costs: lost tariff revenue; local firms facing members' competition may close; gains may be uneven.",
            "Justified conclusion, noting the data show only exports, not imports or jobs.",
          ],
          modelAnswer: "The data suggest Country S has gained: its exports to other members rose from US\\$980 million to US\\$1,280 million, and their share of total exports from 35% to 40%, which means more output, jobs and foreign currency. Consumers and firms also gain from cheaper imports from members. However, the government has lost tariff revenue, and some local firms may have closed because of competition from members, which the table does not show. Because exports grew strongly, Country S has probably benefited overall, but a full judgement would need data on imports, jobs and government revenue.",
          explanation: "Evidence of gains versus unseen costs; conclude.",
        }),
      ],
      hints: ["Share = exports to members ÷ total exports × 100."],
      explanation: `Share of exports to members: ${pct(sh[0], 1)} (2024) and ${pct(sh[1], 1)} (2026).`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Zimbabwe belongs to SADC, COMESA and the African Union, and the African Union's African Continental Free Trade Area (AfCFTA) aims to reduce tariffs on trade across the whole of Africa.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Complete the sentence.",
        template: "A free trade area removes {{blank:a}} on trade between members, but unlike a customs union it has no {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["tariffs"], choices: ["tariffs", "currencies"] },
          { id: "b", accepted: ["common external tariff"], choices: ["common external tariff", "border posts"] },
        ],
        wrong: [["currencies", "border posts"]],
        explanation: "Free trade area: no tariffs between members, separate external tariffs.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** aims of SADC.",
        points: [
          "Promote economic growth, development and poverty reduction…",
          "…through cooperation, shared projects and investment in members.",
          "Deepen regional integration and trade (e.g. free trade area) / develop infrastructure / promote peace and security…",
          "…developed, e.g. removing tariffs to raise trade between members.",
        ],
        modelAnswer: "One aim of SADC is to promote economic growth and development and to reduce poverty in its member states, through cooperation, shared projects and attracting investment. Another is to deepen regional integration: SADC launched a free trade area in 2008 to remove tariffs on trade between members, and it develops shared infrastructure such as roads, power links and border posts; it also works to promote peace and security in the region.",
        explanation: "Two marks per aim.",
      }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss whether economic integration benefits Zimbabwe.",
        points: [
          "Benefits: wider tariff-free markets for exports (processed foods, cement, fertiliser, tobacco); economies of scale.",
          "Benefits: cheaper imported goods and inputs; investment attracted by access to a regional market; shared infrastructure; Zimbabwe's central location as a transport route.",
          "Problems: competition from larger, more industrialised members can close Zimbabwean firms; job losses.",
          "Problems: lost tariff revenue; overlapping memberships and slow borders reduce gains; members export similar goods.",
          "Evaluation: depends on competitiveness of Zimbabwean firms, infrastructure, policies to support industry.",
          "Justified conclusion.",
        ],
        modelAnswer: "Integration gives Zimbabwean firms tariff-free access to a much larger regional market, so competitive producers of processed foods, cement and fertiliser can expand and gain economies of scale, and consumers and firms can buy cheaper goods and inputs from neighbours. Access to the regional market can attract investment, and Zimbabwe's central location makes it a natural transport route for shared road, rail and power projects. However, larger and more industrialised members can out-compete Zimbabwean firms, causing closures and job losses, and the government loses tariff revenue. Overlapping memberships, slow border procedures and the fact that many members export similar goods also reduce the gains. Overall, integration is likely to benefit Zimbabwe in the long run, but only if its firms become more competitive and infrastructure and border procedures improve; otherwise the gains may go mainly to its stronger neighbours.",
        explanation: "Markets, prices and investment versus competition, revenue and practical limits; conclude.",
      }),
    ],
    hints: ["Use the aims and the forms of integration.", "Weigh gains for exporters and consumers against problems for weaker firms."],
    explanation: "Integration offers markets, cheaper imports and investment, but brings competition from stronger members and lost revenue.",
  });

  b.card("DEFINITION", "Define **economic integration**.", "Countries reducing barriers to trade and factor movement between them and coordinating economic policies.");
  b.card("CONCEPT", "List the forms of economic integration in order.", "Preferential trade area → free trade area → customs union → common market → economic (monetary) union.");
  b.card("CONCEPT", "Free trade area versus customs union?", "Both remove tariffs between members; a customs union also has a common external tariff.");
  b.card("CONCEPT", "What does a common market add to a customs union?", "Free movement of labour and capital between members.");
  b.card("FACT", "SADC: when formed and headquarters?", "1992 (from SADCC, 1980); Gaborone, Botswana. Free trade area launched in 2008.");
  b.card("FACT", "COMESA: when formed and headquarters?", "1994 (replacing the PTA, 1981); Lusaka, Zambia. Free trade area launched in 2000.");
  b.card("FACT", "African Union: when launched and headquarters?", "2002 (replacing the OAU, 1963); Addis Ababa, Ethiopia. AfCFTA agreement signed 2018, trading from 2021.");
  b.card("CONCEPT", "Give three benefits of integration for Zimbabwe.", "Wider markets and economies of scale; cheaper imports; investment and shared infrastructure; bargaining power.");
  b.card("CONCEPT", "Give three problems of integration for Zimbabwe.", "Competition from stronger members; lost tariff revenue; overlapping memberships; poor infrastructure and slow borders.");
});
