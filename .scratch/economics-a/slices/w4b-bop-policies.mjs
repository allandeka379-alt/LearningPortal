// W4b: policies to correct balance of payments imbalances (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, roundTo } from "../lib.mjs";
import { mc, LV8, LV6, LV10 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.bop-policies", { file: "trade/bop-policies", keyPrefix: "trade.bop-policies" }, (b) => {
  mc(b, [2, "UNDERSTANDING"], "Which policy is expenditure-switching?",
    ["Imposing a tariff on imported cars", "Correct: it raises the price of imports relative to home goods."],
    [["Raising the rate of income tax", "That reduces total spending."],
     ["Cutting government spending on roads", "That reduces total spending."],
     ["Raising the central bank's interest rate", "That reduces total spending."]],
    "Switching policies change relative prices; the other three reduce aggregate demand.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A government raises income tax to reduce a current account deficit. This is an example of",
    ["an expenditure-reducing policy", "Correct: lower disposable income reduces spending on imports."],
    [["an expenditure-switching policy", "It does not change relative prices."],
     ["a supply-side policy", "It does not raise productive capacity."],
     ["import substitution", "It does not protect home producers."]],
    "Higher taxes reduce aggregate demand, including demand for imports.");

  mc(b, [3, "ANALYSIS"], "Which is the main disadvantage of using expenditure-reducing policies to correct a current account deficit?",
    ["They reduce national income and employment as well as imports", "Correct: aggregate demand falls."],
    [["They make imports dearer relative to home goods", "That describes switching policies."],
     ["They require trading partners to agree", "No agreement is needed."],
     ["They breach the rules of the World Trade Organization", "Reducing demand is not a trade barrier."]],
    "Cutting total spending reduces imports but also output and jobs.", { hints: ["What else happens when aggregate demand falls?"] });

  mc(b, [3, "ANALYSIS"], "A current account deficit is caused by a lack of competitiveness of the country's manufacturers, due to poor infrastructure and low skills. Which policy tackles the cause most directly?",
    ["Investment in roads, power and training", "Correct: a supply-side policy that raises productivity."],
    [["An increase in taxes on income", "That reduces demand but not the cause."],
     ["A quota on imports of clothing", "That treats the symptom and invites retaliation."],
     ["A higher interest rate", "That reduces demand but may reduce investment."]],
    "A structural deficit needs supply-side measures, though they take time.", { hints: ["Match the policy to the cause."] });

  mc(b, [3, "ANALYSIS"], "Which is a likely cost of imposing tariffs to reduce a current account deficit?",
    ["Partners may retaliate and cut the country's exports", "Correct: retaliation is a common response."],
    [["Imports become cheaper for consumers and firms", "Tariffs raise prices."],
     ["The government loses tariff revenue it expected", "Tariffs raise revenue."],
     ["Domestic producers lose competitiveness at once abroad", "Home producers are protected, not harmed."]],
    "Retaliation can cancel the gain and harm exporters.", { hints: ["How might trading partners respond?"] });

  mc(b, [2, "RECALL"], "Import substitution means",
    ["encouraging home production of goods once imported", "Correct: producing at home instead of importing."],
    [["encouraging exporters to enter new foreign markets", "That is export promotion."],
     ["replacing a local currency with a foreign currency", "That is not the meaning."],
     ["reducing taxes on all imports of consumer goods", "That is trade liberalisation."]],
    "It is a policy of replacing imports with home output, often through protection.", { applies: ["zimsec"] });

  {
    const dy = 80 * 2.5, dm = dy * 0.2; chk(dy, 200); chk(dm, 40);
    mc(b, [3, "APPLICATION"], "The government cuts its spending by US\\$80 million. The multiplier is 2.5 and the marginal propensity to import is 0.2. The reduction in imports is",
      ["US\\$40 million", "Correct: income falls by 2.5 × 80 = 200; imports fall by 0.2 × 200."],
      [["US\\$16 million", "That applies the MPM to the spending cut only."],
       ["US\\$200 million", "That is the fall in national income."],
       ["US\\$80 million", "That is the cut in government spending."]],
      "Income falls by US\\$200 million; imports fall by 0.2 × 200 = US\\$40 million.", { hints: ["First find the fall in national income."] });
  }

  mc(b, [4, "EVALUATION"], "A country with a large deficit considers a depreciation of its currency. Which condition makes this policy more likely to succeed?",
    ["The demands for its exports and imports are both price elastic", "Correct: quantities respond strongly to relative price changes."],
    [["The demands for its exports and imports are both price inelastic", "Import spending would rise."],
     ["Its imports are mainly essential fuel and food", "Demand is inelastic."],
     ["Its trading partners retaliate by depreciating their own currencies", "The competitive gain would be lost."]],
    "The Marshall-Lerner condition requires the sum of the elasticities to exceed 1.", { hints: ["When does a price change produce a large change in quantity?"] });

  {
    const dy = 120 * 2.0, dm = dy * 0.15; chk(dm, 36);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: dy, unit: "US$ million", dp: 0, tol: 0.5, daily: true, hints: ["ΔY = multiplier × change in spending."],
      stem: "A government cuts its spending by US\\$120 million to reduce a current account deficit. The multiplier is 2.0. Calculate the fall in national income, in US\\$ million.",
      wrong: [60, 120, 36], explanation: "ΔY = 2.0 × 120 = US\\$240 million." });
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: dm, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Find the fall in income first, then multiply by the MPM."],
      stem: "A government cuts its spending by US\\$120 million. The multiplier is 2.0 and the marginal propensity to import is 0.15. Calculate the fall in imports, in US\\$ million.",
      wrong: [18, 240, 120],
      explanation: "1. Fall in income = 2.0 × 120 = US\\$240 million.\n2. Fall in imports = 0.15 × 240 = US\\$36 million." });
    const q = 0.5 * 20; const after = 1000 * (1 - q / 100); chk(1000 - after, 100);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: 1000 - after, unit: "US$ million", dp: 0, tol: 0.5, hints: ["%ΔQ = PED × %ΔP."],
      stem: "A country spends US\\$1,000 million a year on imports at world prices. It imposes a 20% tariff. The price elasticity of demand for imports is −0.5. Calculate the fall in payments for imports to the rest of the world, in US\\$ million.",
      wrong: [200, 10, 500], explanation: "The domestic price rises 20%, so quantity falls by 0.5 × 20 = 10%. Payments fall from 1,000 to 900: US\\$100 million." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true, stem: "A depreciation of the exchange rate is an expenditure-switching policy.",
    explanation: "It changes relative prices so that spending switches from imports to home goods." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each policy with its type.",
    pairs: [["A tariff on imported clothing", "Expenditure-switching"], ["Higher interest rates to cut spending", "Expenditure-reducing"], ["Investment in training and infrastructure", "Supply-side"], ["Export credit for small manufacturers", "Export promotion"]],
    explanation: "Tariffs switch spending; higher interest rates reduce it; training raises supply; credit helps exporters." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A policy that cuts total aggregate demand to reduce imports is called {{blank:a}}. A policy that changes relative prices so that people buy home goods instead of imports is called {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["expenditure-reducing"], choices: ["expenditure-reducing", "expenditure-switching"] }, { id: "b", accepted: ["expenditure-switching"], choices: ["expenditure-switching", "expenditure-reducing"] }],
    explanation: "Reducing policies cut demand; switching policies change relative prices." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of policy that works by raising productivity and competitiveness, for example through education and infrastructure.",
    accepted: ["supply-side policy", "supply side policy", "supply-side", "supply side", "supply-side policies"], wrong: ["tariff"],
    explanation: "Supply-side policies raise productive capacity and competitiveness." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between expenditure-switching and expenditure-reducing policies.",
    points: ["Expenditure-switching policies change relative prices to move spending from imports to home goods", "Expenditure-reducing policies lower total aggregate demand, which reduces spending on imports"],
    modelAnswer: "Expenditure-switching policies, such as tariffs or a lower exchange rate, change relative prices so that spending moves from imports to home goods. Expenditure-reducing policies, such as higher taxes or interest rates, lower total aggregate demand, which reduces spending on imports.",
    explanation: "Relative prices against total demand." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of the chain from tariff to import spending."],
    stem: "Explain how a tariff on imports might improve the current account of a country.",
    points: ["A tariff raises the domestic price of imports.", "Quantity of imports demanded falls (more so if demand is elastic).", "Spending on imports falls, and consumers switch to home-produced goods.", "So the current account balance improves, unless trading partners retaliate."],
    modelAnswer: "A tariff raises the domestic price of imports, so the quantity demanded falls, particularly if demand is elastic. Spending on imports falls and consumers switch to home-produced goods, so the current account improves, unless trading partners retaliate by reducing the country's exports.",
    explanation: "Price rise, fall in quantity, switching, retaliation caveat." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider growth, jobs and the effect on imports."],
    stem: "Explain why an expenditure-reducing policy to correct a deficit may be costly for an economy.",
    points: ["It cuts aggregate demand through higher taxes, lower spending or higher interest rates.", "Imports fall, but so do output and national income through the multiplier.", "Falling output reduces demand for labour, so unemployment rises.", "Lower growth reduces tax revenue and living standards.", "The fall in imports per dollar of lost income is small if the propensity to import is low."],
    modelAnswer: "An expenditure-reducing policy cuts aggregate demand through higher taxes, lower government spending or higher interest rates. Imports fall, but so do output and income through the multiplier, so firms need fewer workers and unemployment rises. Falling growth reduces tax revenue and living standards, and if the propensity to import is low a large fall in income is needed to achieve a small fall in imports.",
    explanation: "Cut in demand, multiplier, unemployment, lower revenue, low MPM." });

  {
    const im = 2000, tariff = 15, ped = -0.6;
    const dq = ped * tariff; chk(dq, -9);
    const imp = im * (1 + dq / 100); chk(im - imp, 180);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["%ΔQ = PED × %ΔP.", "Payments fall in proportion to the quantity."],
      stem: "**A tariff in Tamba (fictional, illustrative)**\n\nTamba has a current account deficit. It spends US\\$2,000 million a year on imported consumer goods (at world prices). To reduce the deficit the government imposes a 15% tariff on these imports. The price elasticity of demand for these imports is −0.6.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: dq, unit: "%", stem: "Calculate the percentage change in the quantity of imports demanded (a fall is negative), to one decimal place.", wrong: [9, -25, -0.9], explanation: "−0.6 × 15 = −9.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: im - imp, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the fall in payments for imports to the rest of the world, in US\\$ million.", wrong: [300, 270, 1820], explanation: "Payments fall by 9% of 2,000 = US\\$180 million." }),
        P.fib({ label: "(c)", marks: 1, stem: "Complete the sentence.", template: "A tariff is an {{blank:a}} policy.", blanks: [{ id: "a", accepted: ["expenditure-switching"], choices: ["expenditure-switching", "expenditure-reducing"] }], explanation: "A tariff changes relative prices." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain two reasons why the tariff may be less effective than the calculation in (b) suggests.",
          points: ["Trading partners may retaliate with tariffs on Tamba's exports, so export revenue falls.", "This offsets the improvement in the current account.", "Consumers may buy smuggled goods or substitutes that are also imported.", "Higher prices of imported inputs raise costs for home firms, reducing their competitiveness."],
          modelAnswer: "Trading partners may retaliate with tariffs on Tamba's exports, which reduces export revenue and offsets the improvement in the current account. Imported inputs may also become dearer, which raises costs for home firms and reduces their competitiveness, and consumers may turn to smuggled goods." }),
      ],
      explanation: "Quantity falls 9.0%; payments fall US\\$180 million; a tariff is expenditure-switching; retaliation and higher costs weaken the effect." });
  }
  {
    const gdp = 10000, def = 0.06 * gdp; chk(def, 600);
    const dy = 150 * 2; const dm = dy * 0.2; chk(dm, 60); chk(def - dm, 540);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Fall in income = multiplier × cut in spending.", "Imports fall by MPM × fall in income.", "In (e) compare the cost of reducing demand with the alternatives."],
      stem: "**Choosing a policy in Kavala (fictional, illustrative)**\n\nKavala has a GDP of US\\$10,000 million and a current account deficit equal to 6% of GDP. The deficit has two causes: strong demand for imported goods, and exports of manufactured goods that are uncompetitive because of high transport and energy costs. The government plans to cut its spending by US\\$150 million. The multiplier is 2.0 and the marginal propensity to import is 0.20. Some advisers argue for a lower exchange rate or for investment in roads and power instead.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: dy, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the fall in national income caused by the cut in spending, in US\\$ million.", wrong: [150, 75, 30], explanation: "2.0 × 150 = US\\$300 million." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: dm, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the fall in imports, in US\\$ million.", wrong: [30, 300, 150], explanation: "0.20 × 300 = US\\$60 million." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: def - dm, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the current account deficit that remains, in US\\$ million, assuming that exports do not change.", wrong: [660, 600, 60], explanation: "The deficit was 6% of 10,000 = US\\$600 million; it falls by 60 to US\\$540 million." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether cutting government spending is the best policy for Kavala to correct its deficit.",
          points: ["The cut reduces the deficit only by US\\$60 million out of US\\$600 million (10%).", "National income falls by US\\$300 million, which raises unemployment and lowers growth.", "It deals with the demand-side cause but not the uncompetitive exports.", "Investment in roads and power tackles the supply-side cause and raises competitiveness, but takes years and costs money.", "A lower exchange rate could switch spending, but raises import prices and needs elastic demand.", "Judgement: a mix with supply-side investment as the main long-run policy."],
          modelAnswer: "The cut in spending reduces the deficit by only US\\$60 million out of US\\$600 million, but national income falls by US\\$300 million, which raises unemployment and lowers growth. It also does nothing about the uncompetitive exports caused by high transport and energy costs. Investment in roads and power would deal with this cause and raise competitiveness, but it takes years and costs money. A lower exchange rate could switch demand to home goods but raises import prices and works only if demands are elastic. Overall spending cuts are a costly and weak policy here, and the best approach is a package with supply-side investment as the main long-run policy." }),
      ],
      explanation: "Income falls US\\$300 million; imports fall US\\$60 million; deficit remains US\\$540 million; assess cuts against supply-side policy and depreciation." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Weigh speed against cost, and match policy to cause."],
    stem: "Assess whether protectionist policies are an effective way for a developing country to reduce a current account deficit.",
    points: ["Tariffs and quotas raise the price of imports and reduce the quantity, improving the current account in the short run.", "They protect infant industries and jobs, and save foreign exchange.", "Effectiveness is limited if demand for imports is inelastic.", "Retaliation can reduce exports.", "Higher costs for consumers and for firms that use imported inputs.", "Protected firms may become inefficient without competition.", "Does not address low competitiveness; supply-side policy is needed for lasting results.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Tariffs and quotas raise the price of imports and reduce the quantity bought, so they can improve the current account quickly, and they may protect infant industries, jobs and foreign exchange. However, if demand for the imports is inelastic, such as fuel or essential inputs, the effect on spending is small. Trading partners may retaliate and reduce exports, consumers and firms that use imported inputs face higher costs, and protected firms may become inefficient without competition. Protection also does not deal with low competitiveness. Overall it can help temporarily, particularly for infant industries, but it is less effective than raising productivity through supply-side policy.",
    explanation: "Weigh short-run effects and infant industries against inelastic demand, retaliation and inefficiency." });

  b.card("DEFINITION", "Define an **expenditure-switching policy**.", "A policy that changes relative prices so that spending moves from imports to home-produced goods.");
  b.card("DEFINITION", "Define an **expenditure-reducing policy**.", "A policy that reduces total aggregate demand, which cuts spending on imports as well as home goods.");
  b.card("CONCEPT", "Give two expenditure-switching policies.", "Tariffs or quotas, subsidies to exporters, and depreciation of the exchange rate.");
  b.card("CONCEPT", "Give two expenditure-reducing policies.", "Higher taxes or lower government spending (contractionary fiscal policy) and higher interest rates (contractionary monetary policy).");
  b.card("CONCEPT", "Main cost of expenditure-reducing policies?", "Lower national income, growth and employment.");
  b.card("CONCEPT", "Main risk of tariffs and quotas?", "Retaliation by trading partners, higher prices and costs, and protection of inefficient firms.");
  b.card("CONCEPT", "Which policy suits a deficit caused by weak competitiveness?", "Supply-side policy: better infrastructure, skills and productivity (slow, but lasting).");
  b.card("DEFINITION", "What is **import substitution**?", "Encouraging home production of goods that were previously imported, often through protection.", "ZIMSEC detail.", { applies: ["zimsec"] });
  b.card("CONCEPT", "How should the Look East policy be described in an answer?", "Factually, as a policy of building trade and investment links with Asian economies, with arguments for (diversified partners, finance) and against (dependence).", "ZIMSEC detail.", { applies: ["zimsec"] });
});
