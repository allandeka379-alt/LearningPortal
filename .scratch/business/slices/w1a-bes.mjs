// W1a: ZIMSEC Business Enterprise and Skills exam-format items: 1 × 17-mark Paper 1 structured question and
// 2 × 20-mark Paper 2 Section B essays. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, money, fmt, r2, check, BES } from "../lib.mjs";

const L8 = [[3, 6, 8, "Well-developed explanation of several relevant points, applied to Zimbabwean examples."], [2, 3, 5, "Some explanation; limited application."], [1, 1, 2, "Points listed with little explanation."]];
const L12 = [[3, 9, 12, "Balanced discussion of benefits and problems, well developed, with a justified conclusion."], [2, 5, 8, "Some discussion of both sides, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points, little explanation, no conclusion."]];

concept("bus.production.value-addition", { file: "exam/w1a-bes", keyPrefix: "exam.w1a-bes", applies: BES }, (b) => {
  // 17 marks: value addition in a small enterprise.
  const price = 4.5, mat = 2.1, jars = 600;
  const av = r2(price - mat), avTotal = r2(av * jars);
  const newPrice = 5.4, newMat = 2.4;
  const newAv = r2(newPrice - newMat);
  check("av", avTotal, 1440);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 1080, calculator: true, paper: "Paper 1",
    concepts: ["bus.production.value-addition", "bus.production.business-activity"],
    stem: `Thandeka is an enterpriser in Gwanda. She buys baobab fruit from local collectors and turns it into baobab powder, which she sells in jars to shops in Bulawayo. She works with two employees in a small rented workshop that has a grinder, a drying rack and a sealing machine. Each jar sells for ${money(price)}; the fruit, jar and label for each jar cost ${money(mat)}. She sells ${jars} jars a month.\n\nThandeka is thinking of launching a branded gift pack. Each jar would then sell for ${money(newPrice)}, and the better jar and printed label would raise bought-in costs to ${money(newMat)} per jar.`,
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Identify **three** factors of production used by Thandeka's business, giving an example of each from the case.",
        points: ["Land, e.g. the baobab fruit (natural resource) (1)", "Labour, e.g. the two employees (1)", "Capital, e.g. the grinder / drying rack / sealing machine; or enterprise: Thandeka (1)"],
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: av,
        stem: "Calculate the added value per jar.",
        wrong: [r2(price + mat), mat],
        explanation: `${fmt(price)} − ${fmt(mat)} = ${money(av)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: avTotal,
        stem: "Calculate the total added value per month.",
        wrong: [r2(price * jars), r2(mat * jars)],
        explanation: `${fmt(av)} × ${jars} = ${money(avTotal)}.`,
      }),
      P.num({
        label: "(d)", marks: 2, kind: "money", value: newAv,
        stem: "Calculate the added value per jar of the branded gift pack.",
        wrong: [r2(newPrice - mat), r2(newPrice - price)],
        explanation: `${fmt(newPrice)} − ${fmt(newMat)} = ${money(newAv)}, compared with ${money(av)} now.`,
      }),
      P.manual({
        label: "(e)", marks: 4,
        stem: "Explain **two** benefits to the community in Gwanda of Thandeka processing baobab fruit locally.",
        points: ["Benefit 1, e.g. income for fruit collectors (1)", "Explained (1)", "Benefit 2, e.g. local jobs / skills / supporting businesses (1)", "Explained (1)"],
      }),
      P.manual({
        label: "(f)", marks: 4,
        stem: "Recommend whether Thandeka should launch the branded gift pack. Justify your answer.",
        points: [`Added value per jar rises from ${money(av)} to ${money(newAv)} (1)`, "Risk: fewer jars may sell at the higher price / branding costs (1)", "Recommendation (1)", "Justified, e.g. test the gift pack in a few shops first (1)"],
      }),
    ],
    explanation: `Added value per jar ${money(av)}; per month ${money(avTotal)}; gift pack ${money(newAv)} per jar. Local processing benefits collectors, workers and the community.`,
    hints: ["Added value = selling price − cost of bought-in materials.", "Multiply by the number of jars sold.", "In (f), compare the gain per jar with the risk of selling fewer jars."],
  });

  // Essay 1 (20 marks): value addition and beneficiation.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.production.value-addition", "bus.production.sectors"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Using a product made from a Zimbabwean raw material, explain how value is added at each stage of production.",
        points: [
          "Defines added value: selling price − cost of bought-in materials (1)",
          ["Primary stage described with how value is added (e.g. growing, harvesting, grading cotton)", 2],
          ["Secondary stage(s) described (e.g. ginning, spinning, weaving, sewing)", 2],
          ["Tertiary stage described (e.g. transport, wholesaling, retailing, branding)", 2],
          "Shows that the selling price rises at each stage above the cost of inputs (1)",
        ],
        levels: L8,
        modelAnswer: "Added value is the selling price of a product minus the cost of the bought-in materials used to make it. Take cotton. At the primary stage a farmer in Gokwe buys seed and fertiliser, grows and picks the cotton and grades it; the raw cotton sells for more than the seed and fertiliser cost. At the secondary stage a ginnery separates the lint from the seed, a mill spins and weaves the lint into cloth, and a clothing factory cuts and sews shirts; each business sells its output for more than it paid for its inputs. At the tertiary stage transport firms, wholesalers and retailers add value by moving the shirts to where customers are, branding and displaying them; the final price paid in a Bulawayo shop is many times the value of the raw cotton.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "Discuss the benefits and challenges of beneficiation for Zimbabwe.",
        points: [
          "Benefit: higher export earnings per unit (1)",
          "Benefit: jobs and skills in processing (1)",
          "Benefit: growth of supporting industries (transport, packaging, services) (1)",
          "Benefit: less dependence on raw-material prices / more tax revenue (1)",
          "Benefit: technology transfer and industrial development (1)",
          "Challenge: large capital needed (1)",
          "Challenge: unreliable electricity and water supply (1)",
          "Challenge: shortage of skilled workers (1)",
          "Challenge: competition from established foreign processors / access to markets (1)",
          "Challenge: transport costs as a landlocked country (1)",
          ["Justified conclusion", 2],
        ],
        levels: L12,
        modelAnswer: "Beneficiation means processing raw materials such as chrome, platinum, lithium or granite in Zimbabwe before exporting them. Processed products sell for far more than ore, so export earnings rise, and the country depends less on the swings in raw-material prices. Smelters and refineries create skilled jobs, train workers and bring new technology, while transport, packaging and engineering firms grow around them, and government collects more tax. However, processing plants need very large amounts of capital, which often has to come from foreign investors. Smelting needs huge, reliable supplies of electricity, which has often been in short supply. Skilled engineers and technicians are scarce, and processed goods must compete with large established producers abroad, and must be transported long distances to ports. In conclusion, beneficiation offers major long-term benefits, but it will succeed only if power supply, finance and skills are developed alongside it, so it should be introduced step by step, starting with minerals where Zimbabwe has the strongest advantages.",
      }),
    ],
    explanation: "(a) Value is added at primary, secondary and tertiary stages. (b) Beneficiation brings earnings, jobs and development but needs capital, power, skills and markets.",
    hints: ["(a) Choose one product and follow it through the stages.", "(b) Give benefits and challenges, then a conclusion."],
  });

  // Essay 2 (20 marks): regional economic integration.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.trade.trading-blocs"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe the stages of economic integration, using regional trading blocs such as SADC and COMESA as examples.",
        points: [
          ["Free trade area: no tariffs between members, own external tariffs", 2],
          ["Customs union: adds a common external tariff", 2],
          ["Common market: adds free movement of labour and capital", 2],
          "Economic/monetary union: common policies/currency (1)",
          "Relevant examples, e.g. SADC free trade area; COMESA aiming at customs union/common market (1)",
        ],
        levels: L8,
        modelAnswer: "Economic integration is the process by which countries remove trade barriers and co-operate. In a free trade area, members remove tariffs and quotas on trade with each other but each keeps its own tariffs on non-members; SADC has established a free trade area among most of its members. A customs union goes further: members also charge a common external tariff on imports from outside. A common market adds free movement of labour and capital between members; COMESA, as its name shows, aims to become a common market for eastern and southern Africa. The final stage is an economic and monetary union, in which members share economic policies and often a single currency, as many members of the European Union do with the euro.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "Evaluate the effects of regional economic integration on Zimbabwean businesses.",
        points: [
          "Larger market for exports at reduced duty (1)",
          "Economies of scale from higher sales (1)",
          "Cheaper imported raw materials and components (1)",
          "Simpler border procedures / transport corridors (1)",
          "Opportunities for cross-border trade and investment (1)",
          "More competition from stronger regional firms (1)",
          "Possible closures and job losses in weaker firms (1)",
          "Rules of origin and paperwork for small traders (1)",
          "Firms may relocate to larger neighbouring economies (1)",
          "Effect depends on how competitive the business is (1)",
          ["Justified conclusion", 2],
        ],
        levels: L12,
        modelAnswer: "Regional integration through SADC and COMESA gives Zimbabwean businesses access to a much larger market at reduced or zero duty, so efficient firms such as food processors can raise sales and gain economies of scale. Raw materials and components from member countries become cheaper, and simpler border procedures and regional transport corridors reduce delays. However, the same rules let larger and more efficient firms from neighbouring countries sell in Zimbabwe, and some local manufacturers have struggled to compete, leading to closures and job losses. Small traders find rules of origin and certificates hard to obtain, and some investors prefer to locate in larger neighbouring economies and export to Zimbabwe. Overall, integration benefits competitive, export-minded businesses but threatens weak ones, so its effect depends on whether firms invest in efficiency, quality and value addition to use the larger market.",
      }),
    ],
    explanation: "(a) Free trade area, customs union, common market, economic union with examples. (b) Integration creates opportunities and threats; competitive firms gain most.",
    hints: ["(a) Each stage adds one feature to the stage before.", "(b) Consider exporters, importers of inputs and firms facing new competition."],
  });
});
