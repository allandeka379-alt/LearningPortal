// W4b: econ.bop.imbalances-policies (Cambridge only) — causes of current account deficits and surpluses, impact on GDP,
// employment, inflation and the exchange rate, and policies for balance of payments stability. Figures differ from the
// lesson's worked examples.
import { concept, P, table, fmt, pct, pctChange, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.bop.imbalances-policies", { file: "bop/imbalances-policies", keyPrefix: "bop.imbalances-policies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of an **expenditure-switching** policy?",
    options: [
      ["A depreciation of the currency", "Correct: it switches spending from imports to domestic goods."],
      ["A rise in income tax", "This reduces total spending: expenditure-reducing."],
      ["A cut in government spending", "This reduces total spending: expenditure-reducing."],
      ["A rise in interest rates", "This reduces borrowing and spending: expenditure-reducing."],
    ],
    answer: "A",
    explanation: "Expenditure-switching policies (depreciation, tariffs, quotas) change relative prices so that spending moves from imports to domestic output.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change is most likely to cause a current account **deficit** to grow?",
    options: [
      ["Higher inflation at home than in trading partners", "Correct: exports become less competitive and imports more attractive."],
      ["A recession at home that reduces consumer spending", "Lower incomes reduce imports, narrowing the deficit."],
      ["A depreciation of the currency with elastic demand", "This usually narrows a deficit."],
      ["A rise in the world price of the country's main export", "Export earnings rise, narrowing the deficit."],
    ],
    answer: "A",
    explanation: "Relatively high inflation makes exports dearer abroad and imports relatively cheaper, worsening the current account.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the most likely effect of a large and persistent current account deficit on a floating exchange rate?",
    options: [
      ["The currency depreciates", "Correct: more currency is supplied to buy imports than is demanded for exports."],
      ["The currency appreciates", "This is the usual effect of a surplus."],
      ["The exchange rate cannot change", "A floating rate moves with demand and supply."],
      ["The currency becomes fixed to the US dollar", "A deficit does not fix a floating currency."],
    ],
    answer: "A",
    explanation: "Importers supply the currency to buy foreign currency; with exports weak, demand for the currency is lower, so its price falls.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government raises income tax to reduce a current account deficit. What is the main **drawback** of this policy?",
    options: [
      ["Spending on domestic goods also falls, reducing output and jobs", "Correct: expenditure-reducing policies cut demand for all goods."],
      ["It makes imports cheaper than before", "Higher taxes do not lower import prices."],
      ["It raises the price of the country's exports for foreign buyers", "Income tax does not directly change export prices."],
      ["It increases households' disposable income", "Higher income tax reduces disposable income."],
    ],
    answer: "A",
    hints: ["Do households cut spending only on imports?"],
    explanation: "Lower disposable income reduces spending on imports but also on domestic goods, so GDP and employment fall.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How does a current account surplus affect a country's GDP and employment, other things being equal?",
    options: [
      ["Net exports add to aggregate demand, raising GDP and jobs", "Correct."],
      ["Net exports reduce aggregate demand, lowering GDP and jobs", "That is the effect of a deficit."],
      ["A surplus has no effect on GDP", "Net exports are a component of aggregate demand."],
      ["A surplus lowers GDP because the currency depreciates", "A surplus tends to make the currency appreciate."],
    ],
    answer: "A",
    hints: ["GDP by expenditure includes (X − M)."],
    explanation: "When exports exceed imports, net exports are positive and add to aggregate demand, output and employment.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A country's currency depreciates, but its current account deficit gets **worse** in the following months. What is the most likely explanation?",
    options: [
      ["Demand for its exports and imports is price inelastic in the short run", "Correct: volumes adjust slowly, so the import bill rises."],
      ["Depreciation always makes the country's exports dearer for foreign buyers", "Depreciation makes exports cheaper."],
      ["Depreciation makes imports cheaper, so more are bought", "Depreciation makes imports dearer."],
      ["Depreciation removes all tariffs on imports", "Exchange rates and tariffs are separate."],
    ],
    answer: "A",
    hints: ["What happens to spending on a good with inelastic demand when its price rises?"],
    explanation: "If buyers respond little at first, the country pays more local currency for the same imports and earns little extra from exports, so the deficit worsens before it improves.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which policy is most likely to reduce a persistent current account deficit **without** cutting output?",
    options: [
      ["Supply-side policies that raise productivity and competitiveness", "Correct, though they take time."],
      ["A large rise in interest rates", "This reduces spending and output."],
      ["A large cut in government spending on public services and wages", "This reduces aggregate demand and output."],
      ["A rise in income tax", "This reduces spending and output."],
    ],
    answer: "A",
    hints: ["Which option raises the ability to compete rather than lowering demand?"],
    explanation: "Supply-side policies lower costs and improve quality, making exports more competitive, but their effects are slow.",
  });

  // Numericals.
  {
    const bal = -2.7, gdp = 60, sh = (bal / gdp) * 100;
    check("sh", sh, -4.5);
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: sh, dp: 1, daily: true,
      stem: `A fictional country has a current account deficit of US\\$${fmt(-bal, 1)} billion and GDP of US\\$${gdp} billion. Calculate the deficit as a percentage of GDP. Give a deficit as a negative number, to one decimal place.`,
      wrong: [-sh],
      explanation: `−${fmt(-bal, 1)} ÷ ${gdp} × 100 = **${fmt(sh, 1)}%** of GDP.`,
    });
  }
  {
    const p = 1800, r0 = 15, r1 = 18, d0 = p / r0, d1 = p / r1, ch = pctChange(d0, d1);
    check("d0", d0, 120); check("d1", d1, 100); check("ch", ch, -16.667, 0.001);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: d1, calculator: true,
      stem: `A fictional country's exporter sells a product for ${fmt(p)} soli. The soli depreciates from US\\$1 = ${r0} soli to US\\$1 = ${r1} soli. Calculate the new price of the product for a buyer paying in US dollars.`,
      wrong: [d0, p * r1],
      hints: ["Divide the soli price by the number of soli per dollar."],
      explanation: `1. Before: ${fmt(p)} ÷ ${r0} = US\\$${d0}.\n2. After: ${fmt(p)} ÷ ${r1} = **US\\$${d1}**.\n3. The dollar price falls by about ${fmt(-ch, 1)}%, making the export more competitive.`,
    });
  }
  {
    const x0 = 24, m0 = 30, x1 = 27, m1 = 29.4, b0 = x0 - m0, b1 = x1 - m1;
    check("b0", b0, -6); check("b1", b1, -2.4, 1e-9);
    const ch = b1 - b0;
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "plain", value: ch, dp: 1, calculator: true,
      stem: `After a depreciation, a fictional country's exports of goods and services rise from US\\$${x0} billion to US\\$${x1} billion and its imports fall from US\\$${m0} billion to US\\$${fmt(m1, 1)} billion. By how much does its balance on goods and services improve, in US\\$ billion? Give your answer to one decimal place.`,
      wrong: [x1 - x0, b1],
      hints: ["Find the balance (exports − imports) before and after.", "Improvement = new balance − old balance."],
      explanation: `1. Before: ${x0} − ${m0} = ${fmt(b0)}.\n2. After: ${x1} − ${fmt(m1, 1)} = ${fmt(b1, 1)}.\n3. Improvement = ${fmt(b1, 1)} − (${fmt(b0)}) = **${fmt(ch, 1)}** billion: the deficit is smaller but still exists.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Higher interest rates are an example of an expenditure-reducing policy.",
    answer: true,
    explanation: "True. They reduce borrowing and spending, including spending on imports.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A current account deficit is always harmful to a country.",
    answer: false,
    explanation: "False. A small deficit, or one caused by imports of capital goods that will raise future exports, can be manageable or even beneficial.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each policy with its type.",
    pairs: ["Higher income tax", "Depreciation of the currency", "Tariffs on imported cars", "Training schemes to raise productivity", "Higher interest rates"],
    right: ["Expenditure-reducing", "Expenditure-switching", "Supply-side"],
    rightIndex: [0, 1, 1, 2, 0],
    hints: ["Does the policy cut total spending, redirect it, or raise competitiveness?"],
    explanation: "Taxes and interest rates reduce spending; depreciation and tariffs switch it; training raises productivity (supply side).",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "A depreciation makes a country's exports {{blank:a}} for foreign buyers and its imports {{blank:b}} at home. It reduces a deficit most when demand for exports and imports is price {{blank:c}}, but it may also cause {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["cheaper"], choices: ["cheaper", "dearer"] },
      { id: "b", accepted: ["dearer"], choices: ["cheaper", "dearer"] },
      { id: "c", accepted: ["elastic"], choices: ["elastic", "inelastic"] },
      { id: "d", accepted: ["inflation"], choices: ["inflation", "deflation"] },
    ],
    wrong: [["dearer", "cheaper", "inelastic", "deflation"]],
    hints: ["Weak currency: exports cheap, imports dear."],
    explanation: "Depreciation lowers export prices abroad and raises import prices at home; volumes respond more when demand is elastic; dearer imports raise costs and prices.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a country may have a current account surplus.",
    points: [
      "High international competitiveness (high productivity, quality, low inflation)…",
      "…so its exports sell well and imports are relatively unattractive.",
      "Other reason: low exchange rate / weak domestic demand or high saving / high world prices for its exports…",
      "…developed, e.g. households buy few imports.",
    ],
    modelAnswer: "First, the country may be highly competitive, with high productivity, good quality and low inflation, so its exports sell well abroad and its own residents prefer domestic goods. Second, domestic demand may be weak or households may save a large share of their incomes, so they buy relatively few imports; a high world price for its main export, such as oil or a mineral, would also raise export earnings.",
    hints: ["Think about competitiveness and domestic demand."],
    explanation: "Two marks per reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a persistent current account deficit can affect employment and the exchange rate.",
    points: [
      "Imports exceed exports, so net exports reduce aggregate demand…",
      "…lower output in import-competing and export industries means job losses.",
      "More of the currency is supplied to buy imports than is demanded for exports…",
      "…so a floating currency depreciates.",
    ],
    modelAnswer: "A persistent deficit means spending on imports is greater than earnings from exports, so net exports reduce aggregate demand; firms that compete with imports and export firms produce less and cut jobs. At the same time, more of the currency is supplied to buy foreign currency for imports than is demanded by foreigners buying exports, so a floating currency tends to depreciate.",
    hints: ["Use net exports for employment and demand and supply of the currency for the exchange rate."],
    explanation: "Two chains of analysis, two marks each.",
  });

  // Structured 1 (8 marks).
  {
    const yrs = ["2024", "2025", "2026"], x = [18, 18.5, 17.6], m = [19.2, 21.0, 22.0], gdp = [50, 52, 55];
    const bal = x.map((v, i) => v - m[i]), sh = bal.map((v, i) => (v / gdp[i]) * 100);
    check("b26", bal[2], -4.4, 1e-9); check("s26", sh[2], -8);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country E is a fictional country with a floating exchange rate. During 2024-2026 a credit boom raised consumer spending, while its inflation rate was higher than that of its trading partners.\n\n${table(["Year", "Exports of goods and services (US\\$ billion)", "Imports of goods and services (US\\$ billion)", "GDP (US\\$ billion)"], yrs.map((y, i) => [y, fmt(x[i], 1), fmt(m[i], 1), gdp[i]]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: bal[2], dp: 1, stem: "Calculate the balance on goods and services in 2026, in US\\$ billion. Give a deficit as a negative number, to one decimal place.", wrong: [-bal[2]], explanation: `${fmt(x[2], 1)} − ${fmt(m[2], 1)} = ${fmt(bal[2], 1)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: sh[2], dp: 1, stem: "Express this balance as a percentage of GDP. Give a deficit as a negative number, to one decimal place.", wrong: [-sh[2]], explanation: `${fmt(bal[2], 1)} ÷ ${gdp[2]} × 100 = ${fmt(sh[2], 1)}%.` }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Using the information, explain **two** causes of the growing deficit.",
          points: ["The credit boom raised consumer spending, including on imports (imports rose from 19.2 to 22.0).", "Higher inflation than trading partners made exports less competitive (exports fell in 2026)."],
          modelAnswer: "The credit boom raised consumer spending, much of it on imports, which rose from US\\$19.2 billion to US\\$22.0 billion. Higher inflation than in trading partners made Country E's exports less competitive, so exports fell to US\\$17.6 billion in 2026.",
          explanation: "One mark per cause linked to the data.",
        }),
        P.manual({
          label: "(d)", marks: 4, levels: LV(4),
          stem: "Discuss whether higher interest rates are the best policy to reduce Country E's deficit.",
          points: [
            "For: reduce the credit boom and consumer spending on imports; reduce inflation, improving competitiveness over time.",
            "Against: lower output and jobs; higher rates attract foreign funds, appreciating the currency and making exports dearer.",
            "Alternatives: tighter fiscal policy, allowing depreciation, supply-side measures.",
            "Justified conclusion.",
          ],
          modelAnswer: "Higher interest rates suit Country E's causes: they would make credit dearer, cutting the boom in consumer spending and so imports, and lower inflation would help exports become competitive again. However, lower spending also reduces output and jobs, and higher rates may attract foreign savings, pushing up the exchange rate and making exports dearer, which works against the aim. Tighter fiscal policy or supply-side measures to raise productivity could support or replace them. Higher interest rates are a sensible part of the response because they address both the credit boom and inflation, but on their own they may not be the best policy; a mix with fiscal and supply-side measures would be more effective.",
          explanation: "Fit to causes versus side effects; conclude.",
        }),
      ],
      hints: ["Balance = exports − imports.", "Percentage of GDP = balance ÷ GDP × 100."],
      explanation: `2026 balance ${fmt(bal[2], 1)} billion (${fmt(sh[2], 1)}% of GDP).`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "A fictional developing country exports mainly coffee and copper and imports fuel, machinery and medicines. A fall in world copper prices has caused a large current account deficit. The government is considering a depreciation of the currency, import tariffs, or a programme of investment in skills, roads and power supplies.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which option is a supply-side policy?",
        options: [["Investment in skills, roads and power", "Correct: raises productivity and competitiveness."], ["A depreciation of the national currency", "This is expenditure-switching."], ["Import tariffs", "This is expenditure-switching."], ["A rise in income tax", "This is expenditure-reducing."]],
        answer: "A",
        explanation: "Supply-side policies increase the productive capacity and competitiveness of the economy.",
      }),
      P.tf({ label: "(b)", marks: 1, stem: "The fall in copper prices worsened the current account by reducing export earnings.", answer: true, explanation: "True. Lower prices for the same exports mean lower credits." }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how a depreciation might reduce the deficit, and one reason why it might not.",
        points: [
          "Exports (coffee, copper) become cheaper for foreign buyers, so export volumes may rise…",
          "…and imports become dearer, so residents buy fewer imports.",
          "But imports are mainly essentials (fuel, machinery, medicines) with inelastic demand…",
          "…so the import bill in local currency may rise, and dearer imports cause inflation.",
        ],
        modelAnswer: "A depreciation makes the country's coffee and copper cheaper for foreign buyers, so export volumes may rise, and makes imports dearer at home, so residents switch to local goods. However, its imports are mainly fuel, machinery and medicines, for which demand is price inelastic, so spending on imports in local currency may rise rather than fall, and dearer imports would cause cost-push inflation.",
        explanation: "Two marks for how it works; two for why it may fail.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss which of the three policies would be best for this country.",
        points: [
          "Depreciation: quick, helps exporters; but inelastic essential imports, inflation, copper price set in world markets.",
          "Tariffs: reduce non-essential imports and raise revenue; but essentials still needed, retaliation, trade agreements, higher costs for firms.",
          "Supply-side investment: raises productivity, diversification and competitiveness; tackles root cause (dependence on copper).",
          "Supply-side drawbacks: slow, expensive, may need borrowing, worsening the deficit in the short run.",
          "Cause matters: deficit caused by a fall in a world commodity price, which may recover.",
          "Justified conclusion, e.g. combine limited depreciation with supply-side investment.",
        ],
        modelAnswer: "A depreciation works quickly and helps coffee and copper exporters, but most imports are essentials with inelastic demand, so the import bill may rise and inflation increase; and copper's price is set in world markets, so a cheaper currency does little to raise copper sales. Import tariffs would cut non-essential imports and raise revenue, but fuel, machinery and medicines must still be bought, tariffs raise firms' costs and may break trade agreements or provoke retaliation. Investment in skills, roads and power would raise productivity and help the country diversify away from copper, tackling the root cause of its vulnerability, but it is slow and expensive and may need borrowing that adds to the deficit at first. Because the deficit was caused by a fall in the copper price, which may partly recover, the best approach is to accept a moderate depreciation in the short run while investing in the supply side to build a wider range of competitive exports.",
        explanation: "Evaluate each option against the cause and the type of imports; conclude.",
      }),
    ],
    hints: ["Think about elasticity of demand for essential imports.", "Which policy deals with dependence on copper?"],
    explanation: "Depreciation and tariffs act quickly but have side effects; supply-side policies address the root cause slowly.",
  });

  b.card("DEFINITION", "What is a **current account deficit**?", "Current account debits (imports, income paid abroad) exceed credits.");
  b.card("CONCEPT", "Give four causes of a current account deficit.", "High domestic demand/credit; low competitiveness (high inflation, low productivity); high exchange rate; recession abroad; falling export or rising import prices.");
  b.card("CONCEPT", "Effects of a persistent deficit on GDP, jobs and the exchange rate?", "Net exports reduce aggregate demand, so lower GDP and fewer jobs; the currency tends to depreciate.");
  b.card("DEFINITION", "What is an **expenditure-reducing** policy?", "A policy that cuts total spending (higher taxes, lower government spending, higher interest rates).");
  b.card("DEFINITION", "What is an **expenditure-switching** policy?", "A policy that shifts spending from imports to domestic goods (depreciation, tariffs, quotas).");
  b.card("CONCEPT", "Main drawback of depreciation as a policy?", "Dearer imports cause inflation; with inelastic demand the deficit may worsen at first.");
  b.card("CONCEPT", "Why are supply-side policies attractive for a deficit?", "They raise productivity and competitiveness without cutting output, but they are slow and costly.");
  b.card("FACT", "How should you judge whether a deficit is a problem?", "By its size relative to GDP, its cause, how it is financed and how long it lasts.");
});
