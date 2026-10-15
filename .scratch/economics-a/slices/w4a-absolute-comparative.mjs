// W4a: absolute and comparative advantage (both boards; ZIMSEC Form 5, Cambridge AS).
import { concept, P, chk, same, table, fmt, roundTo, comparativeAdvantage } from "../lib.mjs";
import { mc, LV8 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.trade.absolute-comparative", { file: "trade/absolute-comparative", keyPrefix: "trade.absolute-comparative" }, (b) => {
  mc(b, [2, "RECALL"], "A country has a comparative advantage in a good when it",
    ["produces it at a lower opportunity cost than another country does", "Correct: the opportunity cost is the test."],
    [["can produce more of the good than any other country in the world", "This describes an absolute advantage."],
     ["has the largest number of workers employed in making the good in total", "The number of workers is not the test."],
     ["sells the good at a lower price on the world market than all competitors", "Prices can reflect many things besides opportunity cost."]],
    "Comparative advantage means a lower opportunity cost, whatever the absolute level of output.", { daily: true });

  mc(b, [2, "RECALL"], "A country has an absolute advantage in producing a good if it",
    ["can make more of it than another country with equal resources", "Correct: it is more productive in that good."],
    [["has a lower opportunity cost of producing the good than others", "This is comparative advantage."],
     ["exports more of the good than it imports of any other good", "This describes a trade surplus in the good."],
     ["can produce the good using fewer imported raw materials and parts", "Imports are not the test."]],
    "Absolute advantage compares output (or resources used), not opportunity cost.");

  {
    const ca = comparativeAdvantage({ A: { x: 80, y: 40 }, B: { x: 30, y: 30 } });
    same(ca.comparative.x, "A"); same(ca.comparative.y, "B"); chk(ca.oc.A.y, 2); chk(ca.oc.B.y, 1);
    mc(b, [3, "APPLICATION"], "In one month, country P can produce 80 units of cloth or 40 units of grain, and country Q can produce 30 units of cloth or 30 units of grain. Country P has a comparative advantage in",
      ["cloth, because its opportunity cost is 0.5 units of grain", "Correct: Q's opportunity cost of cloth is 1 unit of grain."],
      [["grain, because it can produce more grain than country Q", "That is absolute advantage; grain costs P 2 units of cloth, Q only 1."],
       ["both goods, because it is more productive in both", "Absolute advantage in both does not give comparative advantage in both."],
       ["neither good, because the two countries produce equal amounts", "The amounts differ and so do the opportunity costs."]],
      "OC of cloth: P 40 ÷ 80 = 0.5 grain; Q 30 ÷ 30 = 1 grain. P has the lower cost of cloth, so Q has the comparative advantage in grain.", { hints: ["Calculate the opportunity cost of one unit of cloth in each country."] });
  }

  mc(b, [3, "APPLICATION"], "Country P gives up 2 units of cloth for each unit of grain; country Q gives up 1 unit of cloth. Trade in grain is attractive to both if 1 unit of grain exchanges for",
    ["between 1 and 2 units of cloth", "Correct: Q receives more than its cost of 1; P pays less than its cost of 2."],
    [["less than 1 unit of cloth, in either country", "Q would lose, as it could make cloth at home for less."],
     ["more than 2 units of cloth in total", "P would lose, as it could make grain at home for less."],
     ["exactly 3 units of cloth, as a fixed rule", "This lies outside the range of the two opportunity costs."]],
    "The terms of trade must lie between the two opportunity costs.", { hints: ["Each country must receive more than its own opportunity cost."] });

  {
    const A = { hMaize: 6, hCloth: 4 }, B = { hMaize: 8, hCloth: 4 };
    chk(A.hMaize / A.hCloth, 1.5); chk(B.hMaize / B.hCloth, 2);
    mc(b, [3, "ANALYSIS"], "Producing one tonne of maize takes 6 hours in country A and 8 hours in country B. Producing one tonne of cloth takes 4 hours in both. Which statement is correct?",
      ["A has the comparative advantage in maize, and B in cloth", "Correct: OC of maize is 1.5 cloth in A and 2 cloth in B."],
      [["B has the comparative advantage in maize, because it takes longer", "A longer time means a higher cost."],
       ["A has the comparative advantage in both goods", "A has a comparative advantage in only one good."],
       ["Neither country has a comparative advantage in either good", "The opportunity costs differ, so there is."]],
      "OC of 1 maize: A = 6 ÷ 4 = 1.5 cloth; B = 8 ÷ 4 = 2 cloth. A has the lower cost for maize, so B has it for cloth.", { hints: ["OC of maize = hours for maize ÷ hours for cloth."], calculator: true });
  }

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a limitation of the theory of comparative advantage?",
    ["It ignores the costs of transporting goods between countries", "Correct: transport costs can remove the gains."],
    [["It assumes that countries produce exactly the same goods", "It assumes that opportunity costs differ."],
     ["It shows that trade can never make a country better off", "It shows that trade can make countries better off."],
     ["It requires that every country has an absolute advantage in everything", "Absolute advantage in everything is not required."]],
    "Transport costs, increasing costs, immobile resources and barriers weaken the theory's predictions.");

  mc(b, [3, "UNDERSTANDING"], "A trading possibility curve lies outside a country's production possibility curve because trade",
    ["lets a country consume more than it could produce alone", "Correct: it exchanges the output of its specialised good at the terms of trade."],
    [["increases the quantity of resources that the country possesses at home", "Trade does not change the resources."],
     ["lowers the opportunity cost of every good produced at home itself", "Home opportunity costs stay the same."],
     ["eliminates all costs of producing goods for export markets", "Costs of production are not eliminated."]],
    "By specialising and exchanging at the terms of trade, a country can consume beyond its own PPC.", { hints: ["Compare what the country can produce with what it can consume."] });

  mc(b, [4, "EVALUATION"], "A developing country is less productive than a rich country in every good. According to the theory of comparative advantage, it",
    ["can still gain, if its opportunity costs differ from the rich country's", "Correct: only opportunity costs matter."],
    [["cannot gain from trade, because the rich country is better at all goods", "Absolute disadvantage in everything does not prevent gains."],
     ["gains only if the rich country gives it extra output without exchange", "The theory describes exchange, not gifts."],
     ["gains only if it produces exactly the same goods as the rich country", "It gains by specialising in different goods."]],
    "Gains depend on differences in opportunity cost, not on absolute productivity.", { hints: ["Which kind of advantage matters for the gains from trade?"] });

  {
    const oc = 80 / 40; chk(oc, 2);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: oc, unit: "units", dp: 0, tol: 0.001, hints: ["OC of grain = cloth given up ÷ grain gained."],
      stem: "Country P can produce 80 units of cloth or 40 units of grain with its resources. Calculate the opportunity cost of one unit of grain, in units of cloth.",
      wrong: [0.5, 40, 120], explanation: "Opportunity cost of 1 grain = 80 ÷ 40 = 2 units of cloth. The inverse, 0.5, is the cost of one unit of cloth." });
    const h = 6 / 4; chk(h, 1.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: h, dp: 1, tol: 0.001, hints: ["OC of maize = hours for maize ÷ hours for cloth."],
      stem: "In country A one tonne of maize takes 6 hours to produce and one tonne of cloth takes 4 hours. Calculate the opportunity cost of one tonne of maize, in tonnes of cloth.",
      wrong: [0.67, 24, 2], explanation: "1 maize takes 6 hours, equal to 6 ÷ 4 = 1.5 tonnes of cloth." });
    const g = 7 * 3; chk(g, 21);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: g, unit: "tonnes", dp: 0, tol: 0.5, hints: ["Quantity received = quantity sold × terms of trade."],
      stem: "Zandia exports 7 tonnes of cotton and the agreed terms of trade are 3 tonnes of maize for each tonne of cotton. Calculate the quantity of maize that Zandia receives, in tonnes.",
      wrong: [2.33, 10, 4], explanation: "7 × 3 = 21 tonnes of maize. Dividing 7 by 3 gives 2.33." });
    const tp = 50 * 2.5; chk(tp, 125);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "plain", value: tp, unit: "tonnes", dp: 0, tol: 0.5, hints: ["Specialise fully, then exchange at the terms of trade."],
      stem: "A country can produce a maximum of 50 tonnes of steel or 80 tonnes of grain. If it specialises fully in steel and trades at 2.5 tonnes of grain per tonne of steel, what is the maximum amount of grain it can consume, in tonnes?",
      wrong: [80, 20, 130], explanation: "1. Specialising fully gives 50 tonnes of steel.\n2. Exchanged at 2.5 tonnes of grain per tonne: 50 × 2.5 = 125 tonnes of grain.\n3. This exceeds the 80 tonnes it could produce alone: the trading possibility curve lies outside the PPC." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: a country that has an absolute advantage in every good cannot gain from trade.",
    feedbackFalse: "Gains depend on differences in opportunity cost, not on absolute advantage.",
    explanation: "Even if one country is more productive in everything, trade can benefit both if opportunity costs differ." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Absolute advantage", "Producing more of a good with the same resources"], ["Comparative advantage", "Producing a good at a lower opportunity cost"], ["Terms of trade", "The rate at which goods are exchanged between countries"], ["Trading possibility curve", "Combinations a country can consume after specialising and trading"]],
    explanation: "Each term is a part of the theory of specialisation and trade." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A country should specialise in the good in which its opportunity cost is {{blank:a}}. The terms of trade must lie {{blank:b}} the two countries' opportunity costs.",
    blanks: [{ id: "a", accepted: ["lower"], choices: ["lower", "higher", "equal"] }, { id: "b", accepted: ["between"], choices: ["between", "below", "above"] }],
    explanation: "Specialise where opportunity cost is lower; trade is mutually beneficial within the range of opportunity costs." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the ability to produce a good at a lower opportunity cost than another country?",
    accepted: ["comparative advantage", "a comparative advantage"], wrong: ["absolute advantage"],
    explanation: "Comparative advantage is based on opportunity cost." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Use the word 'opportunity cost'."],
    stem: "Distinguish between absolute advantage and comparative advantage.",
    points: ["Absolute advantage is the ability to produce more of a good than another country with the same resources.", "Comparative advantage is the ability to produce a good at a lower opportunity cost."],
    modelAnswer: "Absolute advantage is the ability to produce more of a good than another country with the same resources. Comparative advantage is the ability to produce a good at a lower opportunity cost.",
    explanation: "Output versus opportunity cost." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about opportunity costs, not total output."],
    stem: "Explain why a country that is more productive in every good can still gain from trade.",
    points: ["Gains from trade depend on differences in opportunity costs, not on absolute productivity.", "The country is relatively better at one good (lower opportunity cost) and relatively worse at the other.", "It specialises in the good with the lower opportunity cost and imports the other.", "The other country does the same, so both can consume more than before."],
    modelAnswer: "Gains from trade depend on differences in opportunity costs, not on absolute productivity. The more productive country is relatively better at one good, where its opportunity cost is lower, and relatively worse at the other. It specialises in the first good and imports the second, and the other country does the opposite, so both can consume more than before.",
    explanation: "Opportunity costs differ; specialisation; both gain." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Name two limitations and explain each."],
    stem: "Explain two reasons why the actual gains from specialisation may be smaller than the theory suggests.",
    points: ["Transport costs and other costs of trade reduce the gains.", "So a country may find that importing is not cheaper than producing at home.", "Opportunity costs may increase as a country specialises (or resources cannot move easily between industries).", "So the gains are smaller and workers may be unemployed during the transition."],
    modelAnswer: "Transport costs and other costs of trade reduce the gains, so importing may not be cheaper than producing at home. Opportunity costs may also rise as a country specialises, and resources, especially workers, cannot move easily between industries, so the gains are smaller and some workers may be unemployed during the transition.",
    explanation: "Trade costs; increasing costs and immobility." });

  {
    const ca = comparativeAdvantage({ A: { x: 48, y: 24 }, B: { x: 30, y: 20 } });
    chk(ca.oc.A.y, 2); chk(ca.oc.B.y, 1.5); same(ca.comparative.x, "A"); same(ca.comparative.y, "B"); same(ca.absolute.x, "A"); same(ca.absolute.y, "A");
    const t1 = table(["Country", "Maize (bags)", "Beans (bags)"], [["Zandia", 48, 24], ["Mbira", 30, 20]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["OC of beans = maize given up ÷ beans gained.", "The terms of trade lie between the two opportunity costs."],
      stem: `**Maize and beans in two fictional countries (illustrative)**\n\nThe table shows the maximum output of maize or beans that each country can produce in a year with all its resources.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: ca.oc.A.y, dp: 1, tol: 0.001, stem: "Calculate the opportunity cost of one bag of beans in Zandia, in bags of maize.", wrong: [0.5, 24, 1.5], explanation: "48 ÷ 24 = 2 bags of maize." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: ca.oc.B.y, dp: 1, tol: 0.001, stem: "Calculate the opportunity cost of one bag of beans in Mbira, in bags of maize.", wrong: [0.67, 30, 2], explanation: "30 ÷ 20 = 1.5 bags of maize." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which country has the comparative advantage in beans?",
          options: [["Mbira, because its opportunity cost of beans is lower", "Correct: 1.5 bags of maize against 2."], ["Zandia, because it produces more beans", "That is absolute advantage."], ["Zandia, because it produces more maize", "Maize output does not decide the advantage in beans."], ["Neither country, because the outputs are in different units", "The opportunity costs can be compared."]], answer: "A",
          explanation: "Mbira's opportunity cost of beans (1.5 maize) is lower than Zandia's (2)." }),
        P.manual({ label: "(d)", marks: 3, stem: "Zandia has an absolute advantage in both goods. Explain why trade can still benefit both countries.",
          points: ["Gains depend on opportunity costs, not absolute advantage.", "Zandia's opportunity cost of maize (0.5 beans) is lower than Mbira's (0.67 beans), so Zandia should specialise in maize.", "Mbira should specialise in beans and the two can exchange at terms between the opportunity costs, so both consume more."],
          modelAnswer: "Gains depend on opportunity costs and not on absolute advantage. Zandia's opportunity cost of maize (0.5 beans) is lower than Mbira's (0.67 beans), so Zandia should specialise in maize, while Mbira should specialise in beans. They can then exchange at terms between the two opportunity costs, so both countries can consume more." }),
        P.manual({ label: "(e)", marks: 2, stem: "State the range of the terms of trade, in bags of maize per bag of beans, at which both countries would agree to trade.",
          points: ["More than 1.5 bags of maize per bag of beans (Mbira's opportunity cost).", "Less than 2 bags of maize per bag of beans (Zandia's opportunity cost)."],
          modelAnswer: "Between 1.5 and 2 bags of maize for each bag of beans." }),
      ],
      explanation: "OC of beans: Zandia 2 maize, Mbira 1.5 maize; Mbira's comparative advantage is in beans; terms of trade between 1.5 and 2 bags of maize per bag of beans." });
  }
  {
    const Z = { x: 100, y: 40 }, M = { x: 60, y: 30 };
    const ca = comparativeAdvantage({ A: Z, B: M });
    chk(ca.oc.A.y, 2.5); chk(ca.oc.B.y, 2); same(ca.comparative.y, "B"); same(ca.comparative.x, "A");
    chk(75 / Z.x + 10 / Z.y, 1); chk(24 / M.x + 18 / M.y, 1);
    const zAfter = 100 - 10 * 2.4; chk(zAfter, 76);
    chk(30 - 10, 20);
    const t1 = table(["", "Zandia: clothing", "Zandia: furniture", "Mbira: clothing", "Mbira: furniture"], [["Maximum output (units)", 100, 40, 60, 30], ["Output and consumption before trade (units)", 75, 10, 24, 18]]);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["OC of furniture = clothing given up ÷ furniture gained.", "Zandia specialises fully in clothing and Mbira in furniture."],
      stem: `**Clothing and furniture (two fictional countries, illustrative)**\n\nZandia and Mbira can each make clothing or furniture. The table shows what each could produce if it used all its resources for one good, and what each produces and consumes before trade. After they agree to trade, each country specialises fully in the good in which it has a comparative advantage. They agree that Mbira will sell 10 units of furniture to Zandia in exchange for clothing at 2.4 units of clothing for each unit of furniture.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: ca.oc.A.y, dp: 1, tol: 0.001, stem: "Calculate the opportunity cost of one unit of furniture in Zandia, in units of clothing.", wrong: [0.4, 40, 2], explanation: "100 ÷ 40 = 2.5 units of clothing." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: ca.oc.B.y, dp: 1, tol: 0.001, stem: "Calculate the opportunity cost of one unit of furniture in Mbira, in units of clothing.", wrong: [0.5, 30, 1.5], explanation: "60 ÷ 30 = 2 units of clothing." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which country has the comparative advantage in furniture?",
          options: [["Mbira, because its opportunity cost of furniture is lower", "Correct: 2 units of clothing against 2.5."], ["Zandia, because it can produce more furniture", "That is absolute advantage."], ["Zandia, because its opportunity cost of furniture is lower", "Zandia's cost is higher (2.5)."], ["Neither, because Zandia has an absolute advantage in both goods", "Absolute advantage does not decide comparative advantage."]], answer: "A",
          explanation: "Mbira's cost of furniture (2) is below Zandia's (2.5)." }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: zAfter, unit: "units", dp: 0, tol: 0.5, stem: "Calculate the number of units of clothing that Zandia consumes after the trade.", wrong: [100, 24, 90], explanation: "Zandia produces 100 units of clothing and pays 10 × 2.4 = 24 units for the furniture, leaving 100 − 24 = 76 units of clothing." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain why both countries are better off after the trade than before it.",
          points: ["After the trade Zandia has 76 clothing and 10 furniture, which is more clothing than before (75) and the same furniture.", "Mbira has 24 clothing and 20 furniture, more furniture than before (18) and the same clothing.", "Both gain because output is higher when each specialises where its opportunity cost is lower, and the terms (2.4) lie between 2 and 2.5."],
          modelAnswer: "After the trade Zandia has 76 units of clothing and 10 of furniture, which is more clothing than the 75 it had before and the same furniture. Mbira has 24 units of clothing and 20 of furniture, which is more furniture than before (18) and the same clothing. Both gain because total output is higher when each country specialises where its opportunity cost is lower, and the terms of trade of 2.4 lie between the two opportunity costs (2 and 2.5)." }),
        P.manual({ label: "(f)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether the gains from trade for Zandia and Mbira are likely to be as large as the table suggests.",
          points: ["The gains shown depend on constant opportunity costs and the ability to move resources between industries.", "Transport costs could reduce or remove the small gains (1 unit of clothing for Zandia and 2 units of furniture for Mbira).", "Workers in the declining industry may be unemployed and the countries become dependent on one product.", "Judgement: the gains are real but small, so the net effect depends on costs of trade and adjustment."],
          modelAnswer: "The gains in the table are small: Zandia gains 1 unit of clothing and Mbira 2 units of furniture. They depend on constant opportunity costs and on the ability of resources to move between industries, whereas in practice the costs may rise with specialisation and workers in the declining industry may be unemployed for some time. Transport costs could reduce or remove such small gains, and each country becomes dependent on one product. The gains are therefore real but small, and the net effect depends on the costs of trade and adjustment." }),
      ],
      explanation: "OC of furniture 2.5 (Zandia) and 2 (Mbira); Mbira has the comparative advantage in furniture; Zandia consumes 76 clothing; both are better off, but the gains depend on assumptions." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the gains and the limitations of the theory for developing countries."],
    stem: "Assess the usefulness of the theory of comparative advantage as a guide to trade policy for a developing country.",
    points: ["Shows that trade can raise output and consumption even if the country is less productive in everything.", "Suggests that the country should specialise where its opportunity cost is lowest, such as farming or minerals.", "Assumes constant costs, no transport costs and mobile resources, which are unrealistic.", "Specialising in primary products exposes the country to price falls and may limit development.", "Comparative advantage changes over time and can be created through education and technology.", "Adjustment costs: unemployment in declining industries.", "Trade barriers of other countries limit the gains.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "The theory shows that a developing country can gain from trade even if it is less productive in every good, and it suggests that the country should specialise where its opportunity cost is lowest, for example in farming or minerals. However, it assumes constant costs, no transport costs and mobile resources, which are unrealistic, and specialising in primary products exposes the country to price falls and may limit the growth of new industries. Comparative advantage also changes over time and can be created through investment in education and technology, rather than being fixed. Adjustment to trade involves costs, such as unemployment in declining industries, and trade barriers in other countries limit the gains. The theory is therefore a useful starting point that shows the potential gains from trade, but it should be combined with policies that build new advantages and cushion the costs of change.",
    explanation: "Gains from trade against unrealistic assumptions, dependence on primary products, dynamic comparative advantage and adjustment costs." });

  b.card("DEFINITION", "Define **absolute advantage**.", "Producing more of a good than another country with the same resources (or using fewer resources for the same output).");
  b.card("DEFINITION", "Define **comparative advantage**.", "Producing a good at a lower opportunity cost than another country.");
  b.card("FORMULA", "Opportunity cost of one unit of X?", "Output of Y given up ÷ output of X gained (maximum Y ÷ maximum X).");
  b.card("CONCEPT", "What range must the terms of trade lie in?", "Between the two countries' opportunity costs.");
  b.card("CONCEPT", "Why do both countries gain from specialisation?", "Each produces what it makes at lower opportunity cost, so total output is higher and can be shared by trade.");
  b.card("CONCEPT", "Where does the trading possibility curve lie?", "Outside the production possibility curve.");
  b.card("CONCEPT", "Can a country with an absolute advantage in every good gain from trade?", "Yes, if its opportunity costs differ from the other country's.");
  b.card("CONCEPT", "Name four limitations of comparative advantage theory.", "Transport costs, increasing costs, immobile resources and trade barriers (also changing advantage and overspecialisation).");
  b.card("FACT", "Which sectors is Zimbabwe often said to have advantages in?", "Farming (such as tobacco and horticulture), mining and tourism.");
});
