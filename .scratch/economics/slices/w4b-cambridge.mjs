// W4b: Cambridge 0455 Paper 2 exam-format items: Section A x1 (a developing economy's trade, exchange rate and current
// account — STRUCTURED 20, ANALYSIS) and Section B x2 (STRUCTURED 20 = 2/4/6/8, EVALUATION). Fictional data, computed
// and checked here.
import { concept, P, CAM, table, pctChange, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const nested = (label, marks, stem, subs) => ({ part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [] });
const words = (s) => s.split(/\s+/).filter(Boolean).length;

concept("econ.forex.exchange-rates", { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  // ---------------- Section A: a developing economy's trade, exchange rate and current account.
  {
    const yrs = ["2024", "2025", "2026"], er = [20, 22, 26], cu = [100, 86, 78], inf = [6, 9, 13], ca = [-0.9, -1.6, -2.4], gdp = [30, 31, 32];
    const caPct = (ca[2] / gdp[2]) * 100, dalaCh = pctChange(1 / er[0], 1 / er[2]), tonne = 8000, extra = tonne * (er[2] - er[0]);
    check("caPct", caPct, -7.5); check("dalaCh", dalaCh, -23.077, 0.001); check("extra", extra, 48000);
    const T = table(["", ...yrs], [
      ["Exchange rate (dala per US\\$1)", ...er],
      ["World copper price index (2024 = 100)", ...cu],
      ["Inflation rate (%)", ...inf],
      ["Current account balance (US\\$ billion)", ...ca.map((v) => fmt(v, 1))],
      ["GDP (US\\$ billion)", ...gdp],
    ]);
    const passage = [
      "Country M is a fictional lower-middle-income country in southern Africa. Its currency, the dala, has a floating exchange rate. Copper makes up more than half of its exports, and it also exports coffee and earns foreign currency from tourism. It imports almost all of its fuel, most of its machinery and many medicines.",
      "Between 2024 and 2026 the world price of copper fell sharply as demand from manufacturing countries slowed. At the same time a credit boom raised consumer spending at home, much of it on imported cars, phones and household goods. Inflation in Country M rose well above the rates in its main trading partners.",
      "As the current account deficit widened, the dala depreciated against the US dollar. Copper mining companies, which are paid in US dollars, welcomed the fall, because each dollar they earn is now worth more dala. Coffee farmers reported more orders from foreign buyers. However, the price of fuel at the pump rose, transport companies raised fares, and hospitals warned that imported medicines had become much more expensive.",
      "The central bank has so far allowed the dala to float freely. Some economists argue that a further depreciation would make exports more competitive and reduce imports, closing the deficit. Others argue that because most imports are essentials and copper prices are set in world markets, a weaker dala would mainly raise inflation, and that the government should instead cut its own spending, raise interest rates to end the credit boom, and invest in training and roads so that new export industries can grow.",
    ].join("\n\n");
    const n = words(passage);
    if (n < 250 || n > 400) throw new Error(`Section A passage has ${n} words`);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.forex.exchange-rates", "econ.bop.current-account", "econ.bop.imbalances-policies", "econ.trade.international-trade"],
      stem: `${passage}\n\n**Table 1: Economic data for Country M**\n\n${T}`,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "A foreign exchange rate is the {{blank:a}} of one currency in terms of {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["price"], choices: ["price", "quantity", "interest"] },
            { id: "b", accepted: ["another currency"], choices: ["another currency", "gold", "goods"] },
          ],
          wrong: [["quantity", "goods"]],
          explanation: "An exchange rate is the price of one currency expressed in another currency.",
        }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: caPct, dp: 1, stem: "Calculate the current account balance in 2026 as a percentage of GDP. Give a deficit as a negative number, to one decimal place.", wrong: [-caPct, (ca[2] / gdp[0]) * 100], explanation: `${fmt(ca[2], 1)} ÷ ${gdp[2]} × 100 = ${fmt(caPct, 1)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: dalaCh, stem: "Calculate the percentage change in the value of the dala against the US dollar between 2024 and 2026. Give a fall as a negative number, to one decimal place.", wrong: [pctChange(er[0], er[2]), -pctChange(er[0], er[2])], explanation: `One dala was worth 1 ÷ 20 = US\\$0.05 in 2024 and 1 ÷ 26 = US\\$0.0385 in 2026: (0.0385 − 0.05) ÷ 0.05 × 100 = ${fmt(dalaCh, 1)}% (equivalently 20 ÷ 26 × 100 − 100). The number of dala per dollar rose by 30%, but that is the rise in the dollar's value, not the change in the dala's.` }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: extra, stem: `A mining company sells one tonne of copper for US\\$${fmt(tonne)}. Calculate how many more dala it receives for this tonne at the 2026 exchange rate than at the 2024 rate, assuming the dollar price is unchanged.`, wrong: [tonne * er[2], tonne / er[0] - tonne / er[2]], explanation: `${fmt(tonne)} × ${er[0]} = ${fmt(tonne * er[0])} dala; ${fmt(tonne)} × ${er[2]} = ${fmt(tonne * er[2])} dala; difference = ${fmt(extra)} dala.` }),
        P.manual({
          label: "(e)", marks: 6,
          stem: "Analyse why Country M's current account deficit widened between 2024 and 2026, even though the dala depreciated.",
          points: [
            "The world copper price fell 22% (index 100 → 78); copper is over half of exports, so export earnings fell.",
            "The credit boom raised consumer spending, much of it on imports (cars, phones), raising import spending.",
            "Inflation rose to 13%, above trading partners, so exports became less competitive and imports relatively cheaper, offsetting the depreciation.",
            "Imports are mainly essentials (fuel, machinery, medicines) with price inelastic demand, so the depreciation raised the cost of imports in dala without cutting volumes much.",
            "Copper's price is set in world markets, so a cheaper dala does little to raise copper sales.",
            "Uses data: the deficit widened from −0.9 to −2.4 (US$ billion), i.e. to 7.5% of GDP.".replace("US$", "US\\$"),
          ],
          modelAnswer: "Copper makes up more than half of Country M's exports, and its world price fell by 22% between 2024 and 2026, so export earnings fell sharply. At the same time the credit boom raised consumer spending, much of it on imported cars, phones and household goods, so spending on imports rose. Inflation rose to 13%, well above that of trading partners, which made Country M's goods less competitive and offset much of the effect of the depreciation. The depreciation also raised the dala cost of essential imports such as fuel, machinery and medicines, for which demand is price inelastic, so import spending did not fall much. Because copper's price is set in world markets, a cheaper dala did little to increase copper sales. As a result, the deficit widened from US\\$0.9 billion to US\\$2.4 billion, or 7.5% of GDP.",
          explanation: "Copper price, credit boom, relative inflation, inelastic essential imports; use the data.",
        }),
        P.manual({
          label: "(f)", marks: 6, levels: LV(6),
          stem: "Discuss whether a further depreciation of the dala would reduce Country M's current account deficit.",
          points: [
            "Would help: exports (coffee, tourism) cheaper for foreigners; exporters earn more dala; imports dearer so consumers switch to local goods; evidence of more coffee orders.",
            "Would not help much: imports are essentials with inelastic demand; copper price set in world markets; time lags.",
            "Would not help: dearer imports (fuel, medicines) raise inflation, already 13%, which erodes competitiveness and could cause further depreciation.",
            "Alternatives: cut government spending; higher interest rates to end the credit boom; supply-side investment to build new export industries.",
            "Effect depends on price elasticity of demand for exports and imports and on the cause of the deficit.",
            "Justified conclusion.",
          ],
          modelAnswer: "A further depreciation would make Country M's coffee and tourism cheaper for foreigners, and exporters would receive more dala for each dollar, as coffee farmers' extra orders already suggest. Imports would become dearer, so consumers might switch from imported cars and phones to local goods. However, most imports are essentials such as fuel, machinery and medicines, for which demand is price inelastic, so the import bill in dala could rise, and copper's price is set in world markets, so the main export would hardly respond. Dearer imports would also push inflation, already 13%, even higher, which would erode the competitiveness gained and might lead to further depreciation. The deficit was caused mainly by falling copper prices and a credit boom, so policies that cut the credit boom, such as higher interest rates or lower government spending, and supply-side investment in new export industries would deal more directly with the causes. A further depreciation on its own is therefore unlikely to close the deficit; it would help only if combined with policies to control inflation and demand.",
          explanation: "Price effects on exports and imports versus elasticity, inflation and the causes; conclude.",
        }),
      ],
      explanation: `Deficit ${fmt(caPct, 1)}% of GDP in 2026; dala fell ${fmt(-dalaCh, 1)}% against the dollar; a copper exporter gains ${fmt(extra)} dala per tonne.`,
      hints: ["The value of one dala in dollars is 1 ÷ (dala per dollar).", "Balance as % of GDP = balance ÷ GDP × 100.", "Think about elasticity of demand for essential imports."],
    });
  }

  // ---------------- Section B (1): protection and free trade.
  {
    const pw = 12, tPct = 25, imp1 = 150000, rev = pw * (tPct / 100) * imp1;
    check("rev", rev, 450000);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "money", value: rev,
      stem: `Imported shirts cost US\\$${pw} each. After a ${tPct}% tariff is imposed, ${fmt(imp1)} shirts a year are still imported. Calculate the government's yearly tariff revenue, in US\\$.`,
      wrong: [pw * tPct * imp1, pw * imp1],
      explanation: `Tariff per shirt = ${tPct}% × ${pw} = US\\$${fmt(pw * tPct / 100)}; revenue = ${fmt(pw * tPct / 100)} × ${fmt(imp1)} = US\\$${fmt(rev)}.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse how the tariff could harm the country's exporters.",
      points: [
        "Trading partners may retaliate with tariffs on the country's exports…",
        "…so its exports become dearer abroad and sales and jobs in export industries fall.",
        "Exporters that use imported inputs (e.g. fabric, machinery) face higher costs if inputs are taxed…",
        "…reducing their competitiveness in world markets.",
      ],
      modelAnswer: "Trading partners whose clothing sales fall may retaliate by placing tariffs on the country's own exports, such as its coffee or cotton, making them dearer abroad, so export sales and jobs fall. In addition, if the tariff raises the price of inputs, such as fabric used by local manufacturers that also export, their costs rise and they become less competitive in world markets.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.trade.protection", "econ.trade.free-trade"],
      stem: "A fictional developing country has imposed a 25% tariff on imported clothing to protect its new clothing factories, which employ several thousand workers. Consumers have complained about higher prices, and a major trading partner has threatened to retaliate. Some economists argue the country should remove all trade restrictions.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definitions.",
          template: "A tariff is a {{blank:a}} on imported goods, while an import quota is a limit on the {{blank:b}} of a good that may be imported.",
          blanks: [
            { id: "a", accepted: ["tax"], choices: ["tax", "subsidy", "ban"] },
            { id: "b", accepted: ["quantity"], choices: ["quantity", "quality", "price"] },
          ],
          wrong: [["subsidy", "price"]],
          explanation: "Tariff: a tax on imports. Quota: a limit on the quantity (or value) of imports.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain how the tariff protects the clothing factories. Complete the explanation.",
          template: "The tariff {{blank:a}} the price of imported clothing, so consumers buy {{blank:b}} imports and switch to local clothing. Local factories sell {{blank:c}} and employ more workers, while the government {{blank:d}} revenue.",
          blanks: [
            { id: "a", accepted: ["raises"], choices: ["raises", "lowers"] },
            { id: "b", accepted: ["fewer"], choices: ["fewer", "more"] },
            { id: "c", accepted: ["more"], choices: ["more", "less"] },
            { id: "d", accepted: ["gains"], choices: ["gains", "loses"] },
          ],
          wrong: [["lowers", "more", "less", "loses"]],
          explanation: "Dearer imports switch demand to local producers; the tariff also raises revenue.",
        }),
        nested("(c)", 6, "Use the information above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the country would benefit from removing all trade restrictions.",
          points: [
            ["For free trade: lower prices and wider choice for consumers; cheaper imported inputs; resources move to industries with comparative advantage, raising output.", 2],
            "For: avoids retaliation, keeps access to export markets; competition improves efficiency.",
            ["Against: infant clothing industry may collapse, thousands of jobs lost (structural unemployment); dependence on primary exports.", 2],
            "Against: loss of tariff revenue; risk of dumping; current account may worsen.",
            ["Justified conclusion, e.g. phase out protection gradually with support for workers, or keep temporary, time-limited protection.", 2],
          ],
          modelAnswer: "Removing all trade restrictions would lower the price of clothing and other imports, widening choice and raising consumers' real incomes, and firms would pay less for imported inputs. Resources would move into industries where the country has a comparative advantage, raising total output, competition would push local firms to become more efficient, and the threat of retaliation against the country's exports would disappear. However, the new clothing factories are an infant industry: without protection they may close before they can gain economies of scale, and several thousand workers could become structurally unemployed, leaving the country dependent on primary exports. The government would also lose tariff revenue, and local firms could be harmed by dumping. On balance the country would benefit from moving towards free trade, but it should phase out the tariff gradually over a fixed period, giving the factories time to become competitive and helping workers to retrain, rather than removing all restrictions at once.",
          explanation: "Gains from free trade versus infant industry, jobs and revenue; conclude.",
        }),
      ],
      explanation: `Tariff revenue US\\$${fmt(rev)} a year; the tariff protects jobs but raises prices and risks retaliation.`,
      hints: ["A tariff is a tax; a quota limits quantity.", "Who gains and who loses from protection?"],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }

  // ---------------- Section B (2): globalisation and multinational companies.
  {
    const x = 450, m = 180, net = x - m;
    check("net", net, 270);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "money", value: net,
      stem: `The new factory exports car parts worth US\\$${x} million a year and imports components worth US\\$${m} million a year. Calculate its net effect on the host country's balance of trade in goods, in US\\$ million.`,
      wrong: [x + m, x],
      explanation: `${x} − ${m} = +US\\$${net} million: the factory improves the trade in goods balance.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse how the MNC's operations could worsen another part of the host country's current account.",
      points: [
        "The MNC sends its profits (and dividends) to shareholders in its home country…",
        "…which are debits in primary income, reducing the current account balance.",
        "Payments for services such as foreign management, royalties or licence fees for technology…",
        "…are debits in trade in services, offsetting part of the gain in trade in goods.",
      ],
      modelAnswer: "The MNC will send much of its profit to shareholders in its home country; these profit and dividend payments are primary income debits, which reduce the host country's current account balance. It may also pay its parent company for management services and royalties for using its technology, which are debits in trade in services. These outflows offset part of the improvement in trade in goods.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.trade.globalisation", "econ.firms.multinationals", "econ.bop.current-account"],
      stem: "Falling transport and communication costs have encouraged a large car-parts multinational company (MNC) to open a factory in a fictional developing country. The factory will employ 2,000 local workers and supply car makers around the world. The government offered the MNC a ten-year tax holiday to attract it.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "A multinational company is a firm that {{blank:a}} goods or services in {{blank:b}} country.",
          blanks: [
            { id: "a", accepted: ["produces"], choices: ["produces", "only sells", "imports"] },
            { id: "b", accepted: ["more than one"], choices: ["more than one", "only one", "its home"] },
          ],
          wrong: [["only sells", "only one"]],
          explanation: "An MNC produces (not just sells) in more than one country.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain how changes in costs have encouraged globalisation. Complete the explanation.",
          template: "Lower {{blank:a}} costs make it cheaper to move components between countries, and lower {{blank:b}} costs let firms manage factories in many countries. Lower trade {{blank:c}} also reduce the cost of crossing borders, so firms build global {{blank:d}} chains.",
          blanks: [
            { id: "a", accepted: ["transport"], choices: ["transport", "labour"] },
            { id: "b", accepted: ["communication"], choices: ["communication", "advertising"] },
            { id: "c", accepted: ["barriers"], choices: ["barriers", "surpluses"] },
            { id: "d", accepted: ["supply"], choices: ["supply", "retail"] },
          ],
          wrong: [["labour", "advertising", "surpluses", "retail"]],
          explanation: "Lower transport, communication and trade-barrier costs make global supply chains worthwhile.",
        }),
        nested("(c)", 6, "Use the information above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the arrival of the MNC will benefit the developing country.",
          points: [
            ["Benefits: 2,000 jobs, incomes and training; technology transfer and management skills; local suppliers may grow.", 2],
            "Benefits: exports raise foreign currency and improve trade in goods (+US$270m a year); part of a global supply chain; growth.".replace("US$", "US\\$"),
            ["Costs: ten-year tax holiday means little tax revenue; profits repatriated; local firms may lose workers or markets.", 2],
            "Costs: footloose — may leave when the tax holiday ends or if demand for cars falls; environmental impact; dependence on one firm and world demand.",
            ["Justified conclusion, e.g. likely net benefit if the government secures local purchasing and training.", 2],
          ],
          modelAnswer: "The factory will create 2,000 jobs, raising incomes, and workers will gain skills and experience of modern technology and management; local firms may become suppliers. Its exports will bring in foreign currency and improve the trade in goods balance by about US\\$270 million a year, and joining a global supply chain can support growth. However, the ten-year tax holiday means the government will collect little tax, and much of the profit will be sent abroad, offsetting part of the current account gain. The MNC may be footloose: it could leave when the tax holiday ends or if world demand for cars falls, and the country becomes more exposed to events abroad. There may also be environmental costs. Overall the country is likely to benefit, because the jobs, skills and exports are substantial, but the government should require local training and purchasing so that the benefits last even if the MNC eventually moves on.",
          explanation: "Jobs, skills and exports versus lost tax, profit outflows and footloose risk; conclude.",
        }),
      ],
      explanation: `The factory adds US\\$${net} million a year to trade in goods; profit outflows and service payments offset part of this.`,
      hints: ["An MNC produces in more than one country.", "Profits paid abroad are primary income debits."],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }
});
