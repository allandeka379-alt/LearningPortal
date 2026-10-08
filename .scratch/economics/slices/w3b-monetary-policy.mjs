// W3b: econ.monetary.monetary-policy — money supply, monetary policy, interest rates, the money supply and the
// exchange rate, the central bank, monetary policy and the macroeconomic aims. Figures differ from the lesson's.
import { concept, P, table, forex, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.monetary.monetary-policy", { file: "monetary/monetary-policy", keyPrefix: "monetary.monetary-policy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Monetary policy is the use of",
    options: [
      ["interest rates, the money supply and the exchange rate to influence the economy.", "Correct: these are the monetary instruments."],
      ["taxes and government spending to influence the level of activity in the economy.", "That is fiscal policy."],
      ["education and training to raise productivity.", "That is a supply-side policy."],
      ["tariffs and quotas to reduce imports.", "These are trade restrictions (protectionism)."],
    ],
    answer: "A",
    explanation: "Monetary policy works through money, credit, interest rates and the exchange rate, usually run by the central bank.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The **money supply** is best defined as",
    options: [
      ["the total amount of notes, coins and bank deposits in the economy.", "Correct: money in circulation plus deposits."],
      ["the total value of goods and services produced in a year.", "That is GDP."],
      ["the amount of foreign currency held by the central bank.", "Those are foreign exchange reserves."],
      ["the total amount borrowed by the government.", "That is the national debt."],
    ],
    answer: "A",
    explanation: "The money supply is the stock of money: currency in circulation and bank deposits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is a rise in interest rates most likely to affect households?",
    options: [
      ["They borrow less and save more, so consumer spending falls", "Correct: credit is dearer and saving is better rewarded."],
      ["They borrow more and save less, so consumer spending rises", "This is the effect of a cut in interest rates."],
      ["They pay less interest on existing loans", "Borrowers pay more interest when rates rise."],
      ["Their income tax falls, so they spend more", "Interest rates do not change income tax."],
    ],
    answer: "A",
    explanation: "Higher rates raise the cost of borrowing and the reward for saving, reducing consumption.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which measure is part of **monetary** rather than fiscal policy?",
    options: [
      ["The central bank raises its key interest rate", "Correct: interest rates are a monetary tool."],
      ["The government cuts the rate of income tax", "Taxes are a fiscal tool."],
      ["The government spends more on new clinics", "Government spending is a fiscal tool."],
      ["The government raises VAT on luxury goods", "VAT is a tax, so this is fiscal policy."],
    ],
    answer: "A",
    explanation: "Monetary policy: interest rates, money supply, exchange rate. Fiscal policy: taxes and government spending.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A country's currency depreciates against the US dollar. What is the most likely effect?",
    options: [
      ["Its exports become cheaper abroad and its imports dearer at home", "Correct: each US dollar buys more of the currency."],
      ["Its exports become dearer abroad and its imports cheaper at home", "This is the effect of an appreciation."],
      ["Both its exports and its imports become cheaper", "Exports become cheaper but imports become dearer."],
      ["Prices of its exports and imports do not change", "Converted prices change with the exchange rate."],
    ],
    answer: "A",
    hints: ["Convert one import price and one export price at both rates."],
    explanation: "A weaker currency lowers the foreign-currency price of exports and raises the local price of imports.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A central bank raises interest rates. Which effect on the exchange rate is most likely?",
    options: [
      ["The currency appreciates as foreign savers buy it to earn higher interest", "Correct: higher returns attract foreign funds, raising demand for the currency."],
      ["The currency depreciates as foreign savers sell it", "Higher rates attract, rather than repel, foreign funds."],
      ["The exchange rate cannot change when interest rates change", "Interest rates are one influence on demand for a currency."],
      ["The currency depreciates because exports rise", "An appreciation makes exports dearer, not more plentiful."],
    ],
    answer: "A",
    hints: ["Where would foreign savers want to put their money?"],
    explanation: "Higher interest rates attract inflows of foreign money, raising demand for the currency, which appreciates.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government pays for its spending by asking the central bank to create large amounts of new money while output stays the same. What is the most likely result?",
    options: [
      ["Rapid inflation, because more money chases the same goods", "Correct: excessive money creation raises the price level."],
      ["Deflation, because the money supply has increased", "More money tends to raise, not lower, prices."],
      ["Lower interest rates and stable prices for many years", "Prices rise when money grows faster than output."],
      ["A fall in government spending", "The new money is used to finance more spending."],
    ],
    answer: "A",
    hints: ["Compare the growth of money with the growth of goods."],
    explanation: "When the money supply grows much faster than output, prices rise; Zimbabwe's hyperinflation of 2007-2008 is a well-known example.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A central bank cuts interest rates to their lowest level for years, but consumer spending and investment hardly change. Which is the most likely explanation?",
    options: [
      ["Households and firms are pessimistic about the future and do not want to borrow", "Correct: low confidence weakens the effect of cheaper credit."],
      ["Lower interest rates make borrowing more expensive", "Lower rates make borrowing cheaper."],
      ["Lower interest rates increase the reward for saving", "Lower rates reduce the reward for saving."],
      ["The cut in interest rates was a form of contractionary monetary policy", "A cut in rates is expansionary."],
    ],
    answer: "A",
    hints: ["Cheaper credit only helps if people want to borrow."],
    explanation: "If confidence is low, people and firms may not borrow even when credit is cheap, so monetary policy has little effect.",
  });

  // Numericals.
  {
    const L = 6500, r = 9, i = (L * r) / 100;
    check("i", i, 585);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: i, daily: true,
      stem: `Chipo borrows US\\$${fmt(L)} for one year at an interest rate of ${r}% a year. Calculate the interest she pays for the year, in US\\$.`,
      wrong: [L + i, L * r],
      explanation: `Interest = ${r}% × ${fmt(L)} = **US\\$${i}**. (US\\$${fmt(L + i)} is the total repaid.)`,
    });
  }
  {
    const L = 24000, r0 = 10, r1 = 14.5, extra = (L * (r1 - r0)) / 100;
    check("extra", extra, 1080);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: extra, calculator: true,
      stem: `A transport business in Gweru has a loan of US\\$${fmt(L)}. The bank raises the yearly interest rate from ${r0}% to ${r1}%. Calculate the increase in the business's yearly interest payment, in US\\$.`,
      wrong: [(L * r1) / 100, L * pctChange(r0, r1) / 100],
      hints: ["Work out the interest at each rate, then subtract."],
      explanation: `1. At ${r0}%: ${fmt((L * r0) / 100)}. At ${r1}%: ${fmt((L * r1) / 100)}.\n2. Increase = ${fmt((L * r1) / 100)} − ${fmt((L * r0) / 100)} = **US\\$${fmt(extra)}**.\n3. Higher interest costs may lead the business to delay buying new vehicles, reducing investment.`,
    });
  }
  {
    const usd = 250, r0 = 30, r1 = 36;
    const k0 = forex.convert(usd, r0), k1 = forex.convert(usd, r1), ch = pctChange(k0, k1);
    check("k1", k1, 9000); check("ch", ch, 20);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: ch, calculator: true,
      stem: `In a fictional country the exchange rate of its currency, the kora (K), changes from K${r0} = US\\$1 to K${r1} = US\\$1. An imported machine part costs US\\$${usd}. Calculate the percentage change in the kora price of the part. Give your answer to one decimal place.`,
      wrong: [pctChange(1 / r0, 1 / r1), pctChange(r1, r0)],
      hints: ["Convert the US\\$ price into kora at both rates."],
      explanation: `1. Before: ${usd} × ${r0} = K${fmt(k0)}. After: ${usd} × ${r1} = K${fmt(k1)}.\n2. Change = (${fmt(k1)} − ${fmt(k0)}) ÷ ${fmt(k0)} × 100 = **${pct(ch, 1)}**: imports become dearer.`,
    });
    const kExp = 72000, u0 = kExp / r0, u1 = kExp / r1, ch2 = pctChange(u0, u1);
    check("u0", u0, 2400); check("u1", u1, 2000);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: ch2, calculator: true,
      stem: `Using the same change in the exchange rate (from K${r0} = US\\$1 to K${r1} = US\\$1), a furniture exporter sells a dining set for K${fmt(kExp)}. Calculate the percentage change in the US\\$ price paid by a foreign buyer. Give a fall as a negative number, to one decimal place.`,
      wrong: [ch, -ch, pctChange(u1, u0)],
      hints: ["Divide the kora price by the number of kora per US\\$1 at each rate.", "Use the old US\\$ price as the base."],
      explanation: `1. Before: ${fmt(kExp)} ÷ ${r0} = US\\$${fmt(u0)}. After: ${fmt(kExp)} ÷ ${r1} = US\\$${fmt(u1)}.\n2. Change = (${fmt(u1)} − ${fmt(u0)}) ÷ ${fmt(u0)} × 100 = **${fmt(ch2, 1)}%**.\n3. The export becomes cheaper abroad, but by less than the ${pct(ch, 0)} rise in the kora price of imports, because the bases differ.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Zimbabwe, monetary policy is run by the Reserve Bank of Zimbabwe.",
    answer: true,
    explanation: "True. The Reserve Bank of Zimbabwe is the central bank: it issues the currency, supervises banks and runs monetary policy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cutting interest rates is a way of reducing demand-pull inflation.",
    answer: false,
    explanation: "False. Cutting rates encourages borrowing and spending, which raises demand. Raising rates reduces demand-pull inflation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each monetary policy change with its most likely effect.",
    pairs: [
      ["Higher interest rates", "Less borrowing and lower consumer spending"],
      ["Lower interest rates", "More investment by firms"],
      ["A fall in the exchange rate", "Exports become cheaper for foreign buyers"],
      ["Slower growth of the money supply", "Less pressure on prices"],
    ],
    explanation: "Tight policy (higher rates, slower money growth) reduces demand and inflation; loose policy boosts spending; a lower exchange rate helps exports.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "To reduce inflation, the central bank can {{blank:a}} interest rates. Borrowing becomes {{blank:b}}, saving becomes more attractive, and aggregate demand {{blank:c}}. A possible cost is {{blank:d}} unemployment.",
    blanks: [
      { id: "a", accepted: ["raise"], choices: ["raise", "cut"] },
      { id: "b", accepted: ["more expensive"], choices: ["more expensive", "cheaper"] },
      { id: "c", accepted: ["falls"], choices: ["rises", "falls"] },
      { id: "d", accepted: ["higher"], choices: ["higher", "lower"] },
    ],
    wrong: [["cut", "cheaper", "rises", "lower"]],
    hints: ["Tight monetary policy reduces spending."],
    explanation: "Higher rates reduce borrowing and spending, so demand-pull inflation falls, but output and jobs may fall too.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** functions of a central bank such as the Reserve Bank of Zimbabwe.",
    points: [
      "Identifies: issues the national currency / controls the money supply.",
      "Explains: decides how much currency is in circulation to keep prices stable.",
      "Identifies a second function: sets interest rates / banker to the government / banker to commercial banks / lender of last resort / manages foreign reserves / supervises banks.",
      "Explains it, e.g. lends to commercial banks in difficulty to protect depositors.",
    ],
    modelAnswer: "First, the central bank issues the national currency and controls the money supply, so that the amount of money grows in line with output and prices stay stable. Second, it is the lender of last resort: if a commercial bank runs short of cash it can borrow from the central bank, which protects depositors and confidence in the banking system.",
    hints: ["Think about the currency, interest rates and the banks."],
    explanation: "Identify (1) + explain (1) for each function.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a cut in interest rates could increase economic growth.",
    points: [
      "Borrowing becomes cheaper, so households borrow to buy durable goods and houses.",
      "Saving is less rewarding, so consumption rises.",
      "Firms borrow to invest in machinery and buildings, as projects become more profitable.",
      "Aggregate demand rises; firms raise output (real GDP rises); investment also raises productive capacity.",
    ],
    modelAnswer: "A cut in interest rates makes borrowing cheaper, so households borrow more to buy cars, furniture and houses, and because saving earns less, they spend a larger share of their income. Firms find more investment projects profitable, so they borrow to buy machinery and build premises. Consumption and investment both rise, so aggregate demand increases and firms raise output, increasing real GDP; the extra investment also increases productive capacity, supporting growth in the long run.",
    hints: ["Think about consumers, savers and firms in turn."],
    explanation: "Chain: cheaper credit → C and I rise → AD rises → output rises (plus capacity from investment).",
  });

  // Structured 1: rates and inflation.
  {
    const qs = ["Q1", "Q2", "Q3", "Q4"], rate = [6, 6, 8, 10], infl = [5.2, 6.8, 8.1, 7.4], loans = [1840, 1920, 1880, 1790];
    const lc = pctChange(loans[1], loans[3]);
    check("lc", lc, -6.770833, 0.0001);
    const T = table(["Quarter of 2026", "Central bank rate (%)", "Inflation rate (%)", "New bank loans (US\\$ million)"], qs.map((q, k) => [q, rate[k], fmt(infl[k], 1), loans[k]]));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `The central bank of a fictional country has an inflation target of 4% to 6%. The table shows its policy interest rate, the inflation rate and the value of new bank loans in each quarter of 2026.\n\n${T}`,
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "In which quarter was inflation highest?",
          options: [["Q3", `Correct: ${fmt(infl[2], 1)}%.`], ["Q4", `Inflation fell to ${fmt(infl[3], 1)}% in Q4.`], ["Q2", `${fmt(infl[1], 1)}% is lower than Q3.`], ["Q1", `${fmt(infl[0], 1)}% was the lowest.`]],
          answer: "A",
          explanation: "Compare the inflation column.",
        }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: lc, stem: "Calculate the percentage change in new bank loans between Q2 and Q4. Give a fall as a negative number, to one decimal place.", wrong: [pctChange(loans[3], loans[1]), -lc], explanation: `(${fmt(loans[3])} − ${fmt(loans[1])}) ÷ ${fmt(loans[1])} × 100 = ${fmt(lc, 1)}%.` }),
        P.fib({
          label: "(c)", marks: 2,
          stem: "Complete the sentence.",
          template: "Between Q2 and Q4 the central bank followed a {{blank:a}} monetary policy, and new bank loans {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["contractionary"], choices: ["contractionary", "expansionary"] },
            { id: "b", accepted: ["fell"], choices: ["rose", "fell"] },
          ],
          wrong: [["expansionary", "rose"]],
          explanation: `The rate rose from ${rate[1]}% to ${rate[3]}% (tight policy) and loans fell from ${fmt(loans[1])} to ${fmt(loans[3])}.`,
        }),
        P.manual({
          label: "(d)", marks: 3,
          stem: "Explain how the rise in interest rates may have caused inflation to fall in Q4.",
          points: ["Higher rates make borrowing dearer, so fewer loans are taken (the table shows loans falling).", "Households and firms spend less on consumption and investment; saving rises.", "Lower aggregate demand reduces demand-pull pressure, so prices rise more slowly."],
          modelAnswer: "Raising the rate from 6% to 10% made borrowing more expensive, and the table shows new bank loans falling. With less credit, households bought fewer goods and firms invested less, while saving became more attractive. Aggregate demand fell, so firms faced less pressure to raise prices, and inflation fell from 8.1% to 7.4%.",
          explanation: "Rates → loans → spending → AD → inflation.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether the central bank should raise its interest rate again to bring inflation within the target.",
          points: [
            "For: inflation (7.4%) is still above the 4-6% target; the policy appears to be working; delay may raise inflation expectations.",
            "Against: monetary policy works with time lags, so the earlier rises may still be taking effect; further rises may cut investment, growth and jobs, and hurt borrowers.",
            "Depends on the cause: if inflation is cost-push (e.g. imported fuel), higher rates are less effective.",
            "Justified conclusion.",
          ],
          modelAnswer: "Inflation is still 7.4%, above the target, and the fall from 8.1% suggests the higher rates are working, so a further rise could bring inflation back within the target sooner and stop people expecting high inflation. However, interest rate changes take many months to have their full effect, so the rise to 10% may not yet have worked fully; raising rates again could cut investment and jobs and hurt borrowers more than necessary. If part of the inflation is cost-push, for example from dearer imported fuel, higher rates will do little except reduce output. The bank should probably hold the rate at 10% for a quarter and watch the data, raising it again only if inflation stops falling.",
          explanation: "Weigh inflation above target against time lags and costs to growth; conclude.",
        }),
      ],
      hints: ["Percentage change uses the earlier quarter as the base.", "A rising interest rate is tight (contractionary) policy."],
      explanation: `Rates rose from ${rate[0]}% to ${rate[3]}%; loans fell ${fmt(-lc, 1)}% between Q2 and Q4; inflation peaked at ${fmt(infl[2], 1)}% in Q3 and fell to ${fmt(infl[3], 1)}%.`,
    });
  }
  // Structured 2: depreciation case.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country has a large current account deficit and high unemployment in its manufacturing industries. Its central bank is considering allowing the currency to fall in value against the US dollar. The country imports most of its fuel.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "How would a fall in the value of the currency affect the price of imported fuel in the local currency?",
        options: [
          ["It would rise", "Correct: more local currency is needed for each US dollar."],
          ["It would fall", "This would follow an appreciation."],
          ["It would stay the same", "Converted prices change with the exchange rate."],
          ["It would fall to zero", "The fuel still has to be bought with US dollars."],
        ],
        answer: "A",
        explanation: "A depreciation raises the local-currency price of imports.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a fall in the value of the currency could reduce unemployment in manufacturing.",
        points: ["Exports become cheaper for foreign buyers, so demand for exported manufactures rises.", "Imports become dearer, so consumers switch to locally made goods.", "Higher demand for local manufactures → more output → more workers hired (derived demand)."],
        modelAnswer: "A lower currency makes the country's manufactured exports cheaper in foreign currencies, so foreign demand for them rises, and it makes imported goods dearer, so local consumers switch to domestic products. Factories therefore sell more and increase output, and because labour is a derived demand they hire more workers.",
        explanation: "Cheaper exports + dearer imports → more domestic output → jobs.",
      }),
      P.manual({
        label: "(c)", marks: 4, levels: LV(4),
        stem: "Discuss whether allowing the currency to fall is a good policy for this country.",
        points: [
          "For: improves price competitiveness; current account deficit may narrow; jobs in manufacturing.",
          "Against: dearer imported fuel raises costs throughout the economy: cost-push inflation; lower real incomes.",
          "Against: if demand for exports and imports is price inelastic, the current account may not improve much; imported inputs raise manufacturers' costs.",
          "Justified conclusion.",
        ],
        modelAnswer: "A lower currency would make exports cheaper and imports dearer, which could narrow the current account deficit and create jobs in manufacturing. However, the country imports most of its fuel, so fuel, transport and production costs would rise, causing cost-push inflation and reducing real incomes. If demand for fuel and other imports is price inelastic, spending on imports may hardly fall, and manufacturers that use imported inputs would face higher costs that offset some of their price advantage. The policy can help if the fall is modest and combined with measures to raise productivity, but a large fall risks inflation that would wipe out the gains.",
        explanation: "Competitiveness and jobs versus imported inflation and elasticities; conclude.",
      }),
    ],
    hints: ["What happens to the price of exports and imports?", "Fuel is used in almost every industry."],
    explanation: "A depreciation helps exports and import-competing firms but raises the cost of imported fuel, risking cost-push inflation.",
  });

  b.card("DEFINITION", "Define **monetary policy**.", "The use of changes in interest rates, the money supply and the exchange rate, usually by the central bank, to influence economic activity and achieve macroeconomic aims.");
  b.card("DEFINITION", "Define the **money supply**.", "The total amount of money in the economy: notes and coins in circulation plus bank deposits.");
  b.card("CONCEPT", "How does a rise in interest rates reduce inflation?", "Borrowing becomes dearer and saving more rewarding, so consumption and investment fall, aggregate demand falls and demand-pull inflation eases.");
  b.card("CONCEPT", "How does a cut in interest rates help growth and employment?", "Cheaper credit raises consumption and investment, so aggregate demand, output and jobs rise.");
  b.card("CONCEPT", "What are the effects of a currency depreciation?", "Exports become cheaper abroad, imports dearer at home: the current account may improve, but imported inflation may rise.");
  b.card("FACT", "What is Zimbabwe's central bank?", "The Reserve Bank of Zimbabwe (RBZ), which issues the currency, supervises banks and runs monetary policy.");
  b.card("CONCEPT", "Give four functions of a central bank.", "Issues currency; controls the money supply and interest rates; banker to the government and to commercial banks; lender of last resort; manages foreign reserves.");
  b.card("CONCEPT", "Give two limitations of monetary policy.", "Time lags; weak effect when confidence is low; hurts borrowers; may raise the exchange rate and hurt exporters.");
  b.card("CONCEPT", "Monetary or fiscal? Cutting VAT.", "Fiscal policy: VAT is a tax. Monetary policy uses interest rates, the money supply and the exchange rate.");
});
