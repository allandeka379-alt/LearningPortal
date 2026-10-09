// W1a: added value, value addition and beneficiation (COM, BES, CAM).
import { concept, P, money, r2, fmt, table, check, sum, ZIM } from "../lib.mjs";

const av = (price, bought) => r2(price - bought);

concept("bus.production.value-addition", { file: "production/value-addition", keyPrefix: "production.value-addition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Added value is the difference between:",
    options: [
      ["selling price and the cost of bought-in materials", "Correct: this is the definition of added value."],
      ["selling price and all the costs of the business", "That difference is profit, not added value."],
      ["revenue and the wages paid to workers", "Wages are paid out of added value; they are not subtracted to find it."],
      ["the cost of materials and the wages paid", "This mixes two kinds of cost and ignores the selling price."],
    ],
    answer: "A",
    explanation: "Added value = selling price − cost of bought-in materials. Wages, rent and other overheads come out of added value; what is left is profit.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Processing chrome ore into ferrochrome in Zimbabwe before exporting it is an example of:",
    options: [
      ["beneficiation", "Correct: processing a country's minerals at home before export."],
      ["indirect production", "Indirect production simply means producing for sale."],
      ["direct production", "Direct production is for one's own use."],
      ["entrepot trade", "Entrepot trade is re-exporting imported goods."],
    ],
    answer: "A",
    explanation: "Beneficiation means processing raw materials, especially minerals, in the country of origin so that more value is created there.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which action is **most likely** to increase a honey producer's added value per jar?",
    options: [
      ["Selling under a trusted brand name at a higher price", "Correct: branding raises the price customers will pay."],
      ["Paying more for the same jars from a new supplier", "Higher material costs reduce added value."],
      ["Cutting the price while costs stay the same", "A lower price with the same material costs lowers added value per jar."],
      ["Hiring an extra worker to label the jars", "Wages do not change added value per jar; they are paid out of it."],
    ],
    answer: "A",
    explanation: "Added value rises when the selling price rises more than the cost of bought-in materials, or when material costs fall.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a benefit of value addition **to the country**?",
    options: [
      ["Higher export earnings from processed goods", "Correct: processed products sell for more abroad than raw materials."],
      ["Lower prices for the raw materials exported", "Beneficiation aims to earn more, not less."],
      ["Fewer jobs created in the manufacturing sector", "Value addition creates manufacturing jobs."],
      ["More reliance on importing processed goods", "Value addition reduces reliance on imports."],
    ],
    answer: "A",
    explanation: "National benefits include export earnings, jobs, skills, industrial growth, tax revenue and less dependence on raw-material prices.",
  });
  // Calculations: new figures (not the lesson's).
  const jamPrice = 3.4, jamMat = 1.85;
  const jamAv = av(jamPrice, jamMat);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A jar of jam sells for ${money(jamPrice)}. The fruit, sugar, jar and label cost ${money(jamMat)}. What is the added value per jar?`,
    options: [
      [money(jamAv), "Correct: 3.40 − 1.85 = 1.55."],
      [money(r2(jamPrice + jamMat)), "This adds the price and the cost instead of subtracting."],
      [money(jamMat), "This is the cost of bought-in materials, not the added value."],
      [money(r2(jamAv - 0.2)), "Check the subtraction: 3.40 − 1.85."],
    ],
    answer: "A",
    explanation: `Added value = ${money(jamPrice)} − ${money(jamMat)} = ${money(jamAv)}.`,
  });
  const seatPrice = 45, seatMat = 18.5, seats = 120;
  const seatAvTotal = r2(av(seatPrice, seatMat) * seats);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: seatAvTotal, calculator: true,
    stem: `A workshop in Gweru makes wooden stools. Each stool sells for ${money(seatPrice)} and uses timber, glue and varnish costing ${money(seatMat)}. Last month it sold ${seats} stools. Calculate the total added value for the month.`,
    wrong: [r2(seatPrice * seats), r2(seatMat * seats)],
    explanation: `Added value per stool = ${fmt(seatPrice)} − ${fmt(seatMat)} = ${money(av(seatPrice, seatMat))}. Total = ${fmt(av(seatPrice, seatMat))} × ${seats} = ${money(seatAvTotal)}.`,
    workedSolution: `1. Added value per stool = ${fmt(seatPrice)} − ${fmt(seatMat)} = ${fmt(av(seatPrice, seatMat))}.\n2. Total added value = ${fmt(av(seatPrice, seatMat))} × ${seats} = ${money(seatAvTotal)}.`,
    hints: ["Find the added value of one stool first.", "Multiply by the number sold."],
  });
  const soapPrice = 2.5, newPrice = 2.9, soapMat = 1.1, newMat = 1.3;
  const change = r2(av(newPrice, newMat) - av(soapPrice, soapMat));
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: change,
    stem: `A soap maker in Bulawayo sells bars for ${money(soapPrice)} each with bought-in materials of ${money(soapMat)} per bar. She adds a perfumed wrapper, which raises the materials cost to ${money(newMat)}, and raises her price to ${money(newPrice)}. By how much does the added value per bar increase?`,
    wrong: [r2(newPrice - soapPrice), av(newPrice, newMat)],
    explanation: `Before: ${fmt(soapPrice)} − ${fmt(soapMat)} = ${fmt(av(soapPrice, soapMat))}. After: ${fmt(newPrice)} − ${fmt(newMat)} = ${fmt(av(newPrice, newMat))}. Increase: ${money(change)}. The price rose by ${money(r2(newPrice - soapPrice))} but materials rose by ${money(r2(newMat - soapMat))}.`,
    workedSolution: `1. Added value before = ${fmt(soapPrice)} − ${fmt(soapMat)} = ${fmt(av(soapPrice, soapMat))}.\n2. Added value after = ${fmt(newPrice)} − ${fmt(newMat)} = ${fmt(av(newPrice, newMat))}.\n3. Increase = ${fmt(av(newPrice, newMat))} − ${fmt(av(soapPrice, soapMat))} = ${money(change)}.`,
    hints: ["Work out added value before and after.", "Remember the materials cost changed too."],
  });
  const bvMat = 7.2, bvAv = 4.6;
  const bvPrice = r2(bvMat + bvAv);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: bvPrice,
    stem: `A dressmaker's bought-in materials for one school dress cost ${money(bvMat)}. She wants to add value of ${money(bvAv)} per dress. What selling price should she charge?`,
    wrong: [r2(bvAv - 0), r2(bvMat - bvAv)],
    explanation: `Selling price = cost of bought-in materials + added value = ${fmt(bvMat)} + ${fmt(bvAv)} = ${money(bvPrice)}.`,
    hints: ["Rearrange: selling price = materials + added value."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Added value and profit are the same thing.",
    answer: false,
    explanation: "False. Wages, rent and other overheads are paid out of added value. Profit is what remains.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business can increase added value by finding a cheaper supplier of materials of the same quality.",
    answer: true,
    explanation: "True. If the selling price stays the same and bought-in costs fall, added value rises.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each raw material with a value-added product made from it.",
    pairs: [["Groundnuts", "Peanut butter"], ["Cattle hides", "Leather shoes"], ["Raw cotton", "Cloth and clothing"], ["Gold ore", "Refined gold and jewellery"]],
    explanation: "Each processed product sells for more than the raw material it is made from.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formula.",
    template: "Added value = {{blank:a}} − cost of {{blank:b}} materials.",
    blanks: [
      { id: "a", accepted: ["selling price"], choices: ["selling price", "profit", "wages", "output"] },
      { id: "b", accepted: ["bought-in"], choices: ["bought-in", "all", "labour", "fixed"] },
    ],
    explanation: "Added value = selling price − cost of bought-in materials.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways a small vegetable farmer near Masvingo could add value to her produce.",
    points: [
      "Way 1, e.g. washing, sorting and packaging (1)",
      "Explained: customers pay more for convenience/presentation (1)",
      "Way 2, e.g. processing (drying, pickling, making sauce) / branding / delivery (1)",
      "Explained, e.g. higher price, longer shelf life, new customers (1)",
    ],
    modelAnswer: "She could wash, sort and pack vegetables into labelled bags, which supermarkets and busy customers pay more for. She could also dry some of her vegetables, which keeps them saleable for months and lets her sell when fresh vegetables are scarce and prices are higher.",
    explanation: "Each way must be explained as raising the price (or reducing waste or material cost).",
    hints: ["Think about processing, packaging, branding and convenience."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Explain **two** problems Zimbabwe may face in beneficiating more of its minerals.",
    points: [
      "Problem 1, e.g. large capital needed for smelters/refineries (1)",
      "Explained, e.g. difficult to raise finance / depends on foreign investors (1)",
      "Problem 2, e.g. unreliable electricity / lack of skilled workers / competition abroad (1)",
      "Explained, e.g. smelting uses large amounts of power, so costs rise and output stops (1)",
    ],
    modelAnswer: "Smelters and refineries cost a great deal to build, so finance may have to come from foreign investors who may be unwilling. Processing minerals also needs large, reliable supplies of electricity; power shortages raise costs and interrupt production.",
    explanation: "Credit realistic problems (capital, power, skills, transport, markets), each explained.",
    hints: ["What does a smelter need in order to operate?"],
  });
  // Practice structured items.
  const st = [
    ["Grower: sells fresh tomatoes", 0.3, 0.9],
    ["Sauce factory: makes tomato sauce", 1.45, 2.6],
    ["Shop: sells the sauce", 2.6, 3.6],
  ];
  const stAv = st.map(([, c, p]) => av(p, c));
  const factoryAv = stAv[1];
  const totalAv = sum(stAv);
  check("chain total", totalAv, r2(3.6 - 0.3 - (1.45 - 0.9)));
  const stTable = table(["Stage (per bottle)", "Cost of bought-in materials US\\$", "Selling price US\\$"], st.map(([s, c, p]) => [s, c.toFixed(2), p.toFixed(2)]));
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `A fictional company, Chinhoyi Foods, buys tomatoes from local growers and makes tomato sauce. The table shows the figures for the amount of product in one bottle of sauce. The sauce factory also buys bottles, sugar and spices.\n\n${stTable}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: factoryAv,
        stem: "Calculate the added value per bottle at the sauce factory.",
        wrong: [r2(2.6 - 0.9), 2.6],
        explanation: `${fmt(2.6)} − ${fmt(1.45)} = ${money(factoryAv)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: totalAv,
        stem: "Calculate the total value added at all three stages.",
        wrong: [3.6, sum([0.9, 2.6, 3.6])],
        explanation: `${stAv.map((x) => fmt(x)).join(" + ")} = ${money(totalAv)}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why the grower earns the least added value per bottle.",
        points: ["Sells the raw material without processing (1)", "Customers pay more for processed, packaged, branded sauce (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "The tomato growers are thinking of forming a co-operative to make their own sauce. Recommend whether they should do so. Justify your answer.",
        points: [
          "Benefit: they capture the factory's added value (1)",
          "Benefit: tomatoes are not wasted when fresh prices are low (1)",
          "Drawback: need capital for equipment / hygiene standards (1)",
          "Drawback: must compete with established brands such as Chinhoyi Foods for shelf space (1)",
          "Clear recommendation (1)",
          "Justified by weighing the points (1)",
        ],
        modelAnswer: "By making sauce, the growers would earn the factory's added value as well as their own and could process tomatoes that would otherwise rot when prices are low. However, they need money for cooking equipment, bottles and hygienic premises, and must persuade shops to stock a new brand against Chinhoyi Foods. As a co-operative they can pool savings and share the risk, so I recommend starting small, selling locally, and expanding once customers accept the brand.",
      }),
    ],
    explanation: `Factory added value ${money(factoryAv)}; total ${money(totalAv)}. Processing adds the most value; a co-operative could capture it if it can raise capital and find customers.`,
    hints: ["Added value = selling price − cost of bought-in materials.", "Add the three stages' added values."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Thandeka makes leather handbags in Bulawayo and sells them unbranded to market traders. A friend suggests she should open her own small shop and sell under her own brand name, offering a one-year repair guarantee.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define the term **added value**.",
        points: ["Selling price minus (1)", "cost of bought-in materials (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how a brand name **and** a repair guarantee could increase Thandeka's added value.",
        points: ["Brand: customers recognise and trust the product (1)", "So will pay a higher price (1)", "Guarantee: reduces customers' risk / better service (1)", "Justifies a higher price, raising added value (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether Thandeka should follow her friend's advice.",
        points: [
          "Higher price per bag / keeps the retailer's margin (1)",
          "Builds long-term customer loyalty (1)",
          "Costs: shop rent, advertising to build the brand, repairs under guarantee (1)",
          "Risk: may sell fewer bags at higher prices / loses market traders as customers (1)",
          "Conclusion (1)",
          "Justified, e.g. test the brand through traders or a market stall before renting a shop (1)",
        ],
        modelAnswer: "A brand and a guarantee would let Thandeka charge more, and selling in her own shop keeps the margin that market traders now earn. Loyal customers would also return. However, a shop brings rent and advertising costs, repairs cost time and leather, and higher prices may mean fewer sales. She could also lose the traders as customers. She should first sell branded bags with the guarantee through the traders and a weekend stall; if sales hold up at the higher price, she can then open a shop.",
      }),
    ],
    explanation: "Branding and service raise the price customers will pay; the extra costs and risks must be weighed against the gain in added value.",
    hints: ["Does a brand change what customers will pay?", "What new costs would a shop bring?"],
  });
  b.card("FORMULA", "Added value", "Added value = selling price − cost of bought-in materials.");
  b.card("DEFINITION", "Bought-in materials", "Raw materials and components bought from other businesses to make a product.");
  b.card("DEFINITION", "Beneficiation", "Processing a country's raw materials (especially minerals) at home before export.");
  b.card("CONCEPT", "Added value versus profit", "Wages, rent and overheads are paid out of added value; profit is what remains.");
  b.card("FACT", "Ways to increase added value", "Branding, higher quality, processing, packaging, convenience, customer service, cheaper bought-in materials.");
  b.card("CONCEPT", "Benefits of value addition to the country", "Export earnings, jobs, skills, industrial growth, tax revenue, less dependence on raw-material prices.");
  b.card("CONCEPT", "Challenges of beneficiation", "Large capital, reliable electricity and water, skilled labour, transport and markets.");
  b.card("CONCEPT", "Value added along the chain", "Value is added at every stage; total value added = final price − materials bought from outside the chain.");
  b.card("FACT", "Examples of value addition", "Maize → maize meal; cotton → cloth; hides → leather shoes; chrome ore → ferrochrome; milk → yoghurt.");
});
