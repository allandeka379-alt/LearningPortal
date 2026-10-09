// W1a: free trade, protectionism, tariffs and quotas (COM, CAM).
import { concept, P, money, fmt, r2, COM, CAM } from "../lib.mjs";

concept("bus.trade.protectionism", { file: "trade/protectionism", keyPrefix: "trade.protectionism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **import tariff**?",
    options: [
      ["A tax on goods brought into the country", "Correct: it raises the price of imports."],
      ["A limit on the quantity of goods imported", "That is a quota."],
      ["A complete ban on trade with a country", "That is an embargo."],
      ["A payment to help local firms export", "That is an export subsidy."],
    ],
    answer: "A",
    explanation: "A tariff (customs duty) is a tax on imports.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A limit on the number of cars that may be imported each year is:",
    options: [
      ["an import quota", "Correct: quotas limit quantity."],
      ["an import tariff", "A tariff taxes imports but does not limit the number."],
      ["an embargo", "An embargo bans imports entirely."],
      ["exchange control", "Exchange control limits foreign currency, not a number of cars."],
    ],
    answer: "A",
    explanation: "Quotas fix the maximum quantity or value of imports.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an argument **for free trade**?",
    options: [
      ["Consumers enjoy lower prices and more choice", "Correct: competition from imports keeps prices down."],
      ["New local industries are protected while they grow", "This is the infant-industry argument for protection."],
      ["Government earns revenue from import duties", "Tariff revenue is an argument for protection."],
      ["Foreign firms cannot dump goods below cost", "Preventing dumping is a reason for protection."],
    ],
    answer: "A",
    explanation: "Free trade gives specialisation, lower prices, choice and competition.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Foreign firms selling goods abroad below their cost of production to capture a market is called:",
    options: [
      ["dumping", "Correct: protection may be used to stop it."],
      ["entrepot trade", "Entrepot trade is re-exporting imported goods."],
      ["beneficiation", "Beneficiation is processing raw materials at home."],
      ["retaliation", "Retaliation is responding to another country's restrictions."],
    ],
    answer: "A",
    explanation: "Anti-dumping duties protect domestic firms from unfairly cheap imports.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "A government puts a tariff on imported steel. Which business is **most likely to lose**?",
    options: [
      ["A local firm that makes roofing sheets from imported steel", "Correct: its raw material costs rise."],
      ["A local steel producer", "It gains because imported steel becomes dearer."],
      ["The government's revenue authority", "It gains tariff revenue."],
      ["A local firm making plastic water pipes from local materials", "Its inputs are not steel, so it is not directly affected."],
    ],
    answer: "A",
    explanation: "Businesses that use imported inputs face higher costs; domestic competitors of the imports gain.",
    hints: ["Does the business compete with imported steel or use it?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a difference between a tariff and a quota?",
    options: [
      ["A tariff raises government revenue; a quota usually does not", "Correct: tariffs are taxes; quotas are quantity limits."],
      ["A quota raises import prices; a tariff never does", "Tariffs directly raise import prices."],
      ["A tariff bans imports; a quota allows them freely", "Neither statement is true."],
      ["A quota is a tax; a tariff is a quantity limit", "This reverses the definitions."],
    ],
    answer: "A",
    explanation: "Tariffs earn revenue and let any quantity in at a higher price; quotas fix the quantity and earn no tax.",
    hints: ["Which one is a tax?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Limiting the amount of foreign currency importers can buy is an example of:",
    options: [
      ["exchange control", "Correct: without currency, importers cannot pay for imports."],
      ["an embargo", "An embargo bans trade in a good or with a country."],
      ["a specific tariff", "A specific tariff is a fixed tax per unit."],
      ["free trade", "Free trade has no such restrictions."],
    ],
    answer: "A",
    explanation: "Exchange control restricts imports by restricting the means of paying for them.",
  });
  // Calculations (new figures, not the lesson's).
  const imp = 150, rate = 30;
  const newPrice = r2(imp * (1 + rate / 100));
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: newPrice, daily: true,
    stem: `An imported bicycle costs a retailer ${money(imp)}. The government introduces an import tariff of ${rate}% on its value. What does the bicycle now cost the retailer?`,
    wrong: [r2(imp * rate / 100), r2(imp + rate)],
    explanation: `Tariff = ${rate}% × ${fmt(imp)} = ${money(r2(imp * rate / 100))}. New cost = ${money(newPrice)}.`,
  });
  const units = 800, val = 9, spec = 1.2, adv = 15;
  const specDuty = r2(units * spec), advDuty = r2(units * val * adv / 100);
  const diff = r2(advDuty - specDuty);
  if (diff <= 0) throw new Error("ad valorem must exceed specific");
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: diff, calculator: true, applies: COM,
    stem: `An importer brings in ${units} tins of paint valued at ${money(val)} each. Calculate how much **more** duty would be paid under an ad valorem tariff of ${adv}% than under a specific tariff of ${money(spec)} per tin.`,
    wrong: [advDuty, specDuty],
    explanation: `Specific: ${units} × ${fmt(spec)} = ${money(specDuty)}. Ad valorem: ${adv}% × (${units} × ${fmt(val)} = ${fmt(units * val)}) = ${money(advDuty)}. Difference = ${money(diff)}.`,
    workedSolution: `1. Specific duty = ${units} × ${fmt(spec)} = ${fmt(specDuty)}.\n2. Value = ${units} × ${fmt(val)} = ${fmt(units * val)}.\n3. Ad valorem duty = ${adv}% × ${fmt(units * val)} = ${fmt(advDuty)}.\n4. Difference = ${fmt(advDuty)} − ${fmt(specDuty)} = ${money(diff)}.`,
    hints: ["A specific tariff is per unit; an ad valorem tariff is a percentage of value.", "Work out both totals, then subtract."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An embargo is a complete ban on trade in certain goods or with a certain country.",
    answer: true,
    explanation: "True. An embargo stops trade completely; a quota only limits it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Import tariffs always benefit every business in the country that imposes them.",
    answer: false,
    explanation: "False. Firms that use imported inputs face higher costs, and exporters may suffer if other countries retaliate.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reason for protection with its meaning.",
    pairs: [
      ["Infant industry", "New industries need time to grow before facing competition"],
      ["Anti-dumping", "Stops imports sold below their cost of production"],
      ["Balance of payments", "Reduces spending of foreign currency on imports"],
      ["Strategic industry", "Keeps essential industries such as food and energy at home"],
    ],
    explanation: "Each reason justifies protection in a different way.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "A tariff charged as a percentage of the value of imports is {{blank:a}}; a tariff charged as a fixed amount per unit is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["ad valorem"], choices: ["ad valorem", "specific", "quota", "embargo"] },
      { id: "b", accepted: ["specific"], choices: ["ad valorem", "specific", "quota", "embargo"] },
    ],
    explanation: "Ad valorem = by value (percentage); specific = per unit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a government might protect its domestic industries.",
    points: [
      "Reason 1, e.g. protect jobs (1)",
      "Explained, e.g. cheap imports could close local factories, causing unemployment (1)",
      "Reason 2, e.g. infant industries / dumping / balance of payments / revenue / strategic (1)",
      "Explained (1)",
    ],
    modelAnswer: "Protection can save jobs: if cheap imported clothing forces local factories to close, thousands of workers become unemployed. It can also protect infant industries, giving new firms time to grow large enough to produce at low cost before they face full foreign competition.",
    explanation: "Name each reason and explain how protection achieves it.",
    hints: ["Think about jobs and new industries."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: CAM,
    stem: "Explain **two** effects of an import quota on a retailer that sells imported televisions.",
    points: [
      "Effect 1, e.g. fewer televisions available to stock (1)",
      "Explained, e.g. lower sales / customers go elsewhere (1)",
      "Effect 2, e.g. higher buying prices for the limited supply (1)",
      "Explained, e.g. lower profit margins or higher prices to customers (1)",
    ],
    modelAnswer: "The quota limits the number of televisions that can be imported, so the retailer may not be able to buy as many as customers want, and sales fall. Because supply is restricted, suppliers can charge more for the televisions that are available, which either reduces the retailer's profit margin or forces it to raise prices.",
    explanation: "Link the quota to the retailer's stock, costs, prices and profit.",
    hints: ["What happens to the supply of imported televisions?"],
  });
  const shoeImp = 18, shoeLocal = 22, shoeTariff = 35;
  const shoeAfter = r2(shoeImp * (1 + shoeTariff / 100));
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Tatenda's fictional company, Matopo Footwear, makes school shoes in Bulawayo and sells them for ${money(shoeLocal)} a pair. Similar imported shoes are sold to retailers for ${money(shoeImp)} a pair. Matopo Footwear's sales have fallen. The government is considering a ${shoeTariff}% tariff on imported shoes.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: shoeAfter,
        stem: "Calculate the cost to retailers of a pair of imported shoes after the tariff.",
        wrong: [r2(shoeImp * shoeTariff / 100), r2(shoeImp + shoeTariff)],
        explanation: `${fmt(shoeImp)} + ${shoeTariff}% = ${fmt(shoeImp)} + ${fmt(r2(shoeImp * shoeTariff / 100))} = ${money(shoeAfter)}.`,
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "After the tariff, how do the imported shoes compare with Matopo Footwear's shoes?",
        options: [["They cost more than Matopo's shoes", `Correct: ${fmt(shoeAfter)} is more than ${fmt(shoeLocal)}.`], ["They are still cheaper than Matopo's shoes", `Check: ${fmt(shoeAfter)} against ${fmt(shoeLocal)}.`], ["They cost exactly the same", "The prices differ."], ["They can no longer be imported", "A tariff does not ban imports."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** way the tariff could affect consumers.",
        points: ["Identifies, e.g. higher prices for shoes (1)", "Explains, e.g. retailers pass on the tariff (1)", "Effect, e.g. parents pay more / less choice / quality may fall without competition (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether the government should introduce the tariff.",
        points: [
          "Benefit: protects Matopo's sales and jobs (1)",
          "Benefit: government revenue / foreign currency saved (1)",
          "Cost: consumers pay more for a necessity (school shoes) (1)",
          "Cost: less pressure on Matopo to become efficient / risk of retaliation or smuggling (1)",
          "Conclusion (1)",
          "Justified, e.g. a temporary tariff while Matopo improves efficiency (1)",
        ],
        modelAnswer: `The tariff would raise the cost of imported shoes to ${money(shoeAfter)}, above Matopo's ${money(shoeLocal)}, protecting local jobs and earning revenue for the government. However, parents would pay more for a necessity, and without competition Matopo has less reason to cut costs or improve quality. Smuggling of untaxed shoes and retaliation against Zimbabwean exports are also possible. A tariff could be justified if it is temporary and reduced over a few years, giving Matopo time to become competitive without protecting inefficiency for ever.`,
      }),
    ],
    explanation: `The tariff raises the imported shoe cost to ${money(shoeAfter)}; local producers gain, consumers pay more, and the case for protection depends on whether it is temporary.`,
    hints: ["Tariff = 35% of the import cost.", "Weigh gains to producers and workers against losses to consumers."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, applies: CAM,
    stem: "Sunrise Solar, a fictional business in Harare, assembles solar lighting kits. It imports the panels and batteries and makes the frames and wiring locally. Most of its kits are sold in Zimbabwe, and some are exported to Zambia. The government has introduced an import tariff on solar panels to encourage local panel production.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define the term **import tariff**.",
        points: ["A tax (1)", "on imported goods (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** ways the tariff could affect Sunrise Solar.",
        points: ["Effect 1, e.g. higher cost of imported panels (1)", "Explained: lower profit margin or higher prices (1)", "Effect 2, e.g. less competitive in Zambia / lower sales (1)", "Explained (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend how Sunrise Solar should respond to the tariff. Justify your answer.",
        points: ["Option, e.g. raise prices (1)", "Option, e.g. buy local panels if available / absorb cost / cut other costs (1)", "Analysis of the effect of option 1 (1)", "Analysis of the effect of option 2 (1)", "Recommendation (1)", "Justified in context (1)"],
        modelAnswer: "Sunrise Solar could raise its prices, but customers in Zimbabwe and Zambia may then buy cheaper kits from competitors who do not use taxed panels. It could instead look for a local panel supplier, which the tariff is designed to encourage, although local panels may cost more or be of uneven quality at first. In the short term it should absorb part of the tariff and cut other costs to keep its customers, while testing local panels; in the long term switching to a reliable local supplier avoids the tariff altogether.",
      }),
    ],
    explanation: "A tariff on an imported input raises a business's costs; it can pass on the cost, absorb it or switch supplier.",
    hints: ["Does Sunrise Solar compete with imported panels or use them?"],
  });
  b.card("DEFINITION", "Free trade", "International trade without government restrictions such as tariffs and quotas.");
  b.card("DEFINITION", "Protectionism", "Policies that restrict imports to protect domestic firms and jobs.");
  b.card("DEFINITION", "Import tariff", "A tax on imported goods; ad valorem (percentage of value) or specific (per unit).");
  b.card("DEFINITION", "Import quota", "A limit on the quantity or value of a good that may be imported.");
  b.card("CONCEPT", "Tariff versus quota", "Tariff: any quantity at a higher price, earns revenue. Quota: fixed quantity, no tax revenue.");
  b.card("FACT", "Methods of protection", "Tariffs, quotas, embargoes, exchange control, licences and red tape, subsidies, product standards.", null, { applies: COM });
  b.card("FACT", "Reasons for protection", "Infant industries, jobs, anti-dumping, balance of payments, revenue, strategic industries, health and safety, retaliation.");
  b.card("CONCEPT", "Who gains and who loses from a tariff", "Gain: domestic competitors, government revenue. Lose: firms using imported inputs, importers, consumers, exporters facing retaliation.");
  b.card("DEFINITION", "Dumping", "Selling goods abroad below their cost of production to capture a market.");
});
