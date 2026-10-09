// W4b: econ.trade.comparative-advantage — factor endowment, absolute and comparative advantage with output tables and
// opportunity cost ratios, specialisation on lowest cost, gains from trade. Figures differ from the lesson's examples.
import { concept, P, table, comparativeAdvantage, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const out = (gx, gy, rows) => table(["Country", gx, gy], rows);

concept("econ.trade.comparative-advantage", { file: "trade/comparative-advantage", keyPrefix: "trade.comparative-advantage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A country has a **comparative advantage** in a good when it can produce that good",
    options: [
      ["at a lower opportunity cost than another country", "Correct: comparative advantage is about the lower opportunity cost."],
      ["in larger quantities than another country with the same resources", "This is absolute advantage."],
      ["using more capital than labour", "The mix of factors does not define comparative advantage."],
      ["at a higher price than another country", "A higher price is not an advantage in production."],
    ],
    answer: "A",
    explanation: "Comparative advantage compares opportunity costs: the country that gives up less of other goods to make one unit has the comparative advantage.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by a country's **factor endowment**?",
    options: [
      ["The quantity and quality of the factors of production it has", "Correct: land, labour, capital and enterprise available to it."],
      ["The amount of foreign aid it receives each year", "Aid is a financial flow, not an endowment of factors."],
      ["The list of goods that it exports to other countries each year", "Exports may result from the endowment but are not the endowment."],
      ["The profit earned by its largest firms", "Profit is a reward to enterprise, not the stock of resources."],
    ],
    explanation: "Differences in factor endowment (minerals, fertile land, skilled labour, capital) are one reason why countries specialise and trade.",
    answer: "A",
  });
  {
    const K = { x: 50, y: 10 }, L = { x: 20, y: 30 };
    const ca = comparativeAdvantage({ A: K, B: L });
    check("abs x", ca.absolute.x === "A" ? 1 : 0, 1); check("abs y", ca.absolute.y === "B" ? 1 : 0, 1);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Two fictional countries use the same quantity of resources. The table shows what each can produce of either good.\n\n${out("Copper (tonnes)", "Sugar (tonnes)", [["Country K", K.x, K.y], ["Country L", L.x, L.y]])}\n\nWhich statement is correct?`,
      options: [
        ["K has the absolute advantage in copper and L in sugar", "Correct: K makes more copper (50 > 20) and L more sugar (30 > 10)."],
        ["K has the absolute advantage in both goods", "L produces more sugar than K."],
        ["L has the absolute advantage in copper and K in sugar", "This reverses the figures."],
        ["Neither country has an absolute advantage", "Each country produces more of one good."],
      ],
      answer: "A",
      explanation: "Absolute advantage: more output from the same resources. K: copper (50 against 20). L: sugar (30 against 10).",
    });
  }
  // Set S2: beef and cement.
  const M = { x: 120, y: 40 }, N = { x: 30, y: 20 };
  const s2 = comparativeAdvantage({ A: M, B: N });
  check("M oc beef", s2.oc.A.x, 1 / 3); check("N oc beef", s2.oc.B.x, 2 / 3); check("M oc cem", s2.oc.A.y, 3); check("N oc cem", s2.oc.B.y, 1.5);
  const T2 = out("Beef (tonnes)", "Cement (tonnes)", [["Country M", M.x, M.y], ["Country N", N.x, N.y]]);
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `Two fictional countries use the same quantity of resources.\n\n${T2}\n\nWhat is the opportunity cost of producing 1 tonne of cement in Country N?`,
    options: [
      ["1.5 tonnes of beef", "Correct: 30 ÷ 20 = 1.5 tonnes of beef given up per tonne of cement."],
      ["0.67 tonnes of beef", "This is 20 ÷ 30, the opportunity cost of beef measured in cement."],
      ["3 tonnes of beef", "This is Country M's opportunity cost of cement (120 ÷ 40)."],
      ["10 tonnes of beef", "This subtracts the outputs (30 − 20) instead of dividing."],
    ],
    answer: "A",
    hints: ["Opportunity cost of cement = beef given up ÷ cement gained."],
    explanation: "Country N can make 30 tonnes of beef or 20 tonnes of cement, so each tonne of cement costs 30 ÷ 20 = 1.5 tonnes of beef.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Using the same table:\n\n${T2}\n\nOn the basis of comparative advantage, which pattern of specialisation should the two countries follow?`,
    options: [
      ["M specialises in beef and N in cement", "Correct: beef costs M 1/3 tonne of cement (N: 2/3); cement costs N 1.5 tonnes of beef (M: 3)."],
      ["M specialises in both goods because it produces more of both", "Absolute advantage in both does not mean comparative advantage in both."],
      ["M specialises in cement and N in beef", "This puts each country on the good with the higher opportunity cost."],
      ["Neither should specialise because M is better at both", "Gains from trade exist whenever opportunity costs differ."],
    ],
    answer: "A",
    hints: ["Work out the opportunity cost of each good in each country.", "Each country specialises where its opportunity cost is lower."],
    explanation: "Opportunity cost of 1 tonne of beef: M 40 ÷ 120 = 0.33 cement, N 20 ÷ 30 = 0.67 cement → M. Opportunity cost of 1 tonne of cement: M 3 beef, N 1.5 beef → N.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a country **not** have a comparative advantage in both of two goods when compared with another country?",
    options: [
      ["Its opportunity cost of one good is the reciprocal of that of the other", "Correct: lower in one good means higher in the other."],
      ["Its resources can be used to produce only one good at a time", "Resources can be split between goods."],
      ["International agreements allow each country to export only one good", "No such rule exists."],
      ["A country with an absolute advantage in both goods must still import both goods", "Absolute advantage does not force a country to import."],
    ],
    answer: "A",
    explanation: "If a country gives up less cloth to make maize, it must give up more maize to make cloth, so its comparative advantage can lie in only one of the two goods (unless the costs are equal, when there is no gain from trade).",
  });
  {
    // Rates of exchange for set S2: beef costs M 1/3 cement and N 2/3 cement. A trade rate between them benefits both.
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: `Using the same table:\n\n${T2}\n\nM exports beef and N exports cement. At which rate of exchange would **both** countries gain from trade?`,
      options: [
        ["1 tonne of cement for 2 tonnes of beef", "Correct: 2 lies between N's cost of cement (1.5 beef) and M's (3 beef)."],
        ["1 tonne of cement for 1 tonne of beef", "N would receive less beef than the 1.5 tonnes it gives up to make cement, so N loses."],
        ["1 tonne of cement for 4 tonnes of beef", "M would pay more than the 3 tonnes of beef it gives up to make cement itself, so M loses."],
        ["1 tonne of cement for 1.5 tonnes of beef", "At N's own opportunity cost N gains nothing from trading."],
      ],
      answer: "A",
      hints: ["Find each country's opportunity cost of cement in beef.", "The trade rate must lie strictly between the two."],
      explanation: "Cement costs N 1.5 tonnes of beef and M 3 tonnes. Any rate strictly between 1.5 and 3 tonnes of beef per tonne of cement lets N earn more than its cost and lets M pay less than its own cost; 2 tonnes is the only option in that range.",
    });
  }
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which factor is most likely to **reduce** the gains a landlocked country obtains from specialising according to comparative advantage?",
    options: [
      ["High costs of transporting goods to and from the coast", "Correct: transport costs can cancel out the lower production costs."],
      ["A large difference in opportunity costs between the countries", "A larger difference increases the potential gains."],
      ["Resources that move easily from one industry to another", "Mobile resources make specialising easier."],
      ["A rate of exchange between the two countries' opportunity costs", "That rate allows both countries to gain."],
    ],
    answer: "A",
    hints: ["The simple theory assumes something about transport."],
    explanation: "The theory assumes no transport costs. For a landlocked country, road and rail costs to ports add to the price of exports and imports and can wipe out the gains.",
  });

  // Numericals.
  {
    const R = { x: 48, y: 16 }, S = { x: 30, y: 20 };
    const s3 = comparativeAdvantage({ A: R, B: S });
    check("R oc bike", s3.oc.A.y, 3); check("S oc sugar", s3.oc.B.x, 2 / 3);
    const T3 = out("Sugar (bags)", "Bicycles", [["Country R", R.x, R.y], ["Country S", S.x, S.y]]);
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: s3.oc.A.y, daily: true,
      stem: `Two fictional countries use the same quantity of resources.\n\n${T3}\n\nCalculate the opportunity cost of producing **one bicycle** in Country R, in bags of sugar.`,
      wrong: [s3.oc.A.x, R.x - R.y],
      explanation: `Opportunity cost of a bicycle = sugar given up ÷ bicycles gained = ${R.x} ÷ ${R.y} = **${fmt(s3.oc.A.y)} bags of sugar**. Dividing the other way (${R.y} ÷ ${R.x} = ${fmt(s3.oc.A.x, 2)}) gives the cost of a bag of sugar in bicycles.`,
    });
  }
  {
    const R = { x: 35, y: 14 }, S = { x: 24, y: 18 };
    const s4 = comparativeAdvantage({ A: R, B: S });
    check("S oc sugar", s4.oc.B.x, 0.75); check("R oc sugar", s4.oc.A.x, 0.4);
    const T4 = out("Soap (cartons)", "Blankets", [["Country V", R.x, R.y], ["Country Y", S.x, S.y]]);
    b.num({
      d: 3, skill: "APPLICATION", kind: "plain", value: s4.oc.B.x, dp: 2, calculator: true,
      stem: `Two fictional countries use the same quantity of resources.\n\n${T4}\n\nCalculate the opportunity cost of producing **one carton of soap** in Country Y, in blankets. Give your answer to two decimal places.`,
      wrong: [s4.oc.B.y, s4.oc.A.x],
      hints: ["Blankets given up ÷ soap gained."],
      explanation: `${S.y} ÷ ${S.x} = **${fmt(s4.oc.B.x, 2)} blankets** per carton of soap. ${fmt(s4.oc.B.y, 2)} is the cost of a blanket in soap (the reciprocal); ${fmt(s4.oc.A.x, 2)} is Country V's cost of soap. V's cost of soap is lower, so V has the comparative advantage in soap and Y in blankets.`,
    });
  }
  {
    const T = { x: 24, y: 8 }, U = { x: 6, y: 12 };
    const ca = comparativeAdvantage({ A: T, B: U });
    check("abs", ca.absolute.x === "A" && ca.absolute.y === "B" ? 1 : 0, 1);
    const before = { x: T.x / 2 + U.x / 2, y: T.y / 2 + U.y / 2 }, after = { x: T.x, y: U.y };
    const gainTea = after.x - before.x;
    check("before", before.x, 15); check("beforey", before.y, 10); check("gain", gainTea, 9);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "plain", value: gainTea,
      stem: `Two fictional countries use the same quantity of resources.\n\n${out("Tea (tonnes)", "Radios (hundreds)", [["Country T", T.x, T.y], ["Country U", U.x, U.y]])}\n\nWithout trade, each country uses half its resources on each good. Then T specialises completely in tea and U completely in radios. By how many tonnes does total tea output increase?`,
      wrong: [after.x, T.x / 2],
      hints: ["Find total tea output with each country splitting its resources equally.", "Then find total tea output after specialisation."],
      explanation: `1. Before: T makes ${T.x / 2} tonnes of tea and U makes ${U.x / 2}: total ${before.x} tonnes.\n2. After: T makes ${T.x} tonnes and U none: total ${after.x} tonnes.\n3. Increase = ${after.x} − ${before.x} = **${gainTea} tonnes**. Radio output also rises, from ${before.y} to ${after.y} hundred.`,
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If one country can produce more of both goods than another country, there can be no gains from trade between them.",
    answer: false,
    explanation: "False. Gains from trade depend on comparative advantage. As long as the opportunity costs differ, both countries can gain by specialising in the good with the lower opportunity cost.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Absolute advantage means being able to produce more of a good than another country using the same quantity of resources.",
    answer: true,
    explanation: "True. This is the standard definition of absolute advantage.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Absolute advantage", "More output from the same resources"],
      ["Comparative advantage", "A lower opportunity cost of production"],
      ["Factor endowment", "The resources a country possesses"],
      ["Specialisation by country", "Concentrating resources on the goods produced at lowest cost"],
    ],
    explanation: "These four ideas explain why countries trade: different endowments create different costs, and countries specialise where their (comparative) advantage lies.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "Country G can make 20 tractors or 80 tonnes of fish; Country H can make 10 tractors or 60 tonnes of fish with the same resources. The opportunity cost of a tractor is {{blank:a}} tonnes of fish in G and {{blank:b}} tonnes in H, so {{blank:c}} has the comparative advantage in tractors.",
    blanks: [
      { id: "a", accepted: ["4"], choices: ["4", "6", "0.25"] },
      { id: "b", accepted: ["6"], choices: ["4", "6", "0.17"] },
      { id: "c", accepted: ["G"], choices: ["G", "H"] },
    ],
    wrong: [["0.25", "4", "H"]],
    hints: ["Fish given up ÷ tractors gained."],
    explanation: "G: 80 ÷ 20 = 4 tonnes of fish per tractor; H: 60 ÷ 10 = 6 tonnes. G gives up less fish, so G has the comparative advantage in tractors (and H in fish).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how differences in factor endowment lead countries to specialise and trade. Use an example.",
    points: [
      "Countries have different quantities and qualities of land, labour, capital and natural resources.",
      "A country can produce goods that use its abundant factors at low cost, so it specialises in and exports them.",
      "Example, e.g. Zimbabwe's mineral deposits and climate suit gold, platinum and tobacco exports; it imports goods needing factors it lacks, such as fuel.",
    ],
    modelAnswer: "Countries have different resources: some have mineral deposits or fertile land, others large amounts of capital or skilled labour. Goods that use a country's abundant factors can be produced cheaply there, so the country specialises in them and exports them, and imports goods that need factors it lacks. For example, Zimbabwe has gold and platinum deposits and a climate suited to tobacco, which it exports, while it imports fuel because it does not produce crude oil.",
    hints: ["Which resources does a country have plenty of, and which does it lack?"],
    explanation: "One mark each for differences in factors, the link to low cost and specialisation, and a relevant example.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** reasons why countries may not gain as much from specialisation as the theory of comparative advantage suggests.",
    points: [
      "Transport costs (especially for landlocked countries) raise the cost of traded goods…",
      "…so they can cancel out the difference in production costs.",
      "Resources are not perfectly mobile (workers need retraining; machines are specialised) / opportunity costs rise as output expands / trade barriers…",
      "…so countries cannot move resources or sell their output as the theory assumes, and the gains are smaller.",
    ],
    modelAnswer: "First, the theory ignores transport costs. A landlocked country must pay to move exports and imports by road and rail to the coast, and these costs can cancel out its lower cost of production. Second, the theory assumes resources move easily between industries at constant cost, but workers need retraining and machines built for one product cannot make another, so specialising takes time and costs rise as an industry expands. Trade barriers in other countries can also prevent a country selling the goods it specialises in.",
    hints: ["Think about the assumptions of the simple theory."],
    explanation: "Two marks for each reason: identify + explain the effect on the gains.",
  });

  // Structured 1 (8 marks).
  {
    const Z = { x: 60, y: 20 }, W = { x: 75, y: 75 };
    const ca = comparativeAdvantage({ A: Z, B: W });
    check("Z oc tob", ca.oc.A.x, 1 / 3); check("W oc tex", ca.oc.B.y, 1); check("abs W both", ca.absolute.x === "B" && ca.absolute.y === "B" ? 1 : 0, 1);
    check("comp", ca.comparative.x === "A" && ca.comparative.y === "B" ? 1 : 0, 1);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true,
      stem: `Country Z is a fictional country in southern Africa and Country W is a fictional industrial country. With the same quantity of resources each can produce either of the outputs shown.\n\n${out("Tobacco (tonnes)", "Textiles (thousand metres)", [["Country Z", Z.x, Z.y], ["Country W", W.x, W.y]])}`,
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "Which country has the absolute advantage in tobacco?",
          options: [["Country W", "Correct: 75 tonnes against 60."], ["Country Z", "Z produces less tobacco (60 < 75)."], ["Both countries equally", "Their outputs differ."], ["Neither country", "One country produces more."]],
          answer: "A",
          explanation: "W produces more of both goods with the same resources, so it has the absolute advantage in both.",
        }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: ca.oc.A.x, dp: 2, stem: "Calculate the opportunity cost of 1 tonne of tobacco in Country Z, in thousand metres of textiles. Give your answer to two decimal places.", wrong: [ca.oc.A.y], explanation: `${Z.y} ÷ ${Z.x} = ${fmt(ca.oc.A.x, 2)} thousand metres of textiles.` }),
        P.num({ label: "(c)", marks: 1, kind: "plain", value: ca.oc.B.x, dp: 2, stem: "Calculate the opportunity cost of 1 tonne of tobacco in Country W, in thousand metres of textiles. Give your answer to two decimal places.", wrong: [ca.oc.A.x], explanation: `${W.y} ÷ ${W.x} = ${fmt(ca.oc.B.x, 2)} thousand metres of textiles.` }),
        P.fib({
          label: "(d)", marks: 2,
          stem: "Complete the sentence.",
          template: "Country Z has the comparative advantage in {{blank:a}} and Country W has the comparative advantage in {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["tobacco"], choices: ["tobacco", "textiles"] },
            { id: "b", accepted: ["textiles"], choices: ["tobacco", "textiles"] },
          ],
          wrong: [["textiles", "tobacco"]],
          explanation: "Tobacco costs Z only 0.33 thousand metres of textiles against 1 in W; textiles cost W 1 tonne of tobacco against 3 in Z.",
        }),
        P.manual({
          label: "(e)", marks: 3, levels: LV(3),
          stem: "Discuss whether Country Z should specialise completely in tobacco.",
          points: [
            "For: tobacco is its lowest-cost product, so specialising raises output and export earnings to buy textiles cheaply.",
            "Against: dependence on one crop: world price falls, drought or falling demand for tobacco (health campaigns) cause large losses; textile jobs lost; transport costs.",
            "Justified conclusion, e.g. specialise mainly in tobacco but keep some diversification.",
          ],
          modelAnswer: "Z has a comparative advantage in tobacco, so moving resources into tobacco raises total output, and the export earnings can buy more textiles from W than Z could make for itself. However, complete specialisation would make Z depend on one crop: a fall in world tobacco prices, a drought or falling demand as health campaigns reduce smoking would cut its income sharply, and workers in its textile industry would lose their jobs. Z should specialise mainly in tobacco but keep some other industries to spread the risk.",
          explanation: "Gains from specialising versus the risks of depending on one export; conclude.",
        }),
      ],
      hints: ["Opportunity cost of tobacco = textiles given up ÷ tobacco gained.", "Compare the two countries' opportunity costs."],
      explanation: `W has the absolute advantage in both goods; Z has the comparative advantage in tobacco (opportunity cost ${fmt(ca.oc.A.x, 2)} against ${fmt(ca.oc.B.x, 2)}) and W in textiles.`,
    });
  }
  // Structured 2 (12 marks): gains from trade and the trade rate.
  {
    const E = { x: 90, y: 30 }, F = { x: 48, y: 24 };
    const ca = comparativeAdvantage({ A: E, B: F });
    check("E oc mach", ca.oc.A.y, 3); check("F oc mach", ca.oc.B.y, 2);
    const before = { x: E.x / 2 + F.x / 2, y: E.y / 2 + F.y / 2 };
    check("bx", before.x, 69); check("by", before.y, 27);
    const eMach = before.y - F.y, eShare = eMach / E.y, eRice = E.x * (1 - eShare), gain = eRice - before.x;
    check("eRice", eRice, 81); check("gain", gain, 12);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Two fictional countries, E and F, use the same quantity of resources. Each could produce either of the outputs below.\n\n${out("Rice (thousand tonnes)", "Machines (hundreds)", [["Country E", E.x, E.y], ["Country F", F.x, F.y]])}\n\nAt present each country uses half of its resources on each good and they do not trade.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: ca.oc.A.y, stem: "Calculate the opportunity cost of one hundred machines in Country E, in thousand tonnes of rice.", wrong: [ca.oc.A.x], explanation: `${E.x} ÷ ${E.y} = ${ca.oc.A.y}.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: ca.oc.B.y, stem: "Calculate the opportunity cost of one hundred machines in Country F, in thousand tonnes of rice.", wrong: [ca.oc.B.x], explanation: `${F.x} ÷ ${F.y} = ${ca.oc.B.y}.` }),
        P.mcq({
          label: "(c)", marks: 1,
          stem: "Which country should specialise in machines?",
          options: [["Country F, because its opportunity cost of machines is lower", "Correct: 2 against 3."], ["Country E, because it makes more machines", "That is absolute advantage."], ["Country E, because its opportunity cost of machines is lower", "E's cost (3) is higher than F's (2)."], ["Neither, because E is better at both goods", "Opportunity costs differ, so there are gains."]],
          answer: "A",
          explanation: "F gives up 2 thousand tonnes of rice per hundred machines; E gives up 3. F has the comparative advantage in machines.",
        }),
        P.mcq({
          label: "(d)", marks: 1,
          stem: "At which rate of exchange (rice for one hundred machines) would both countries gain?",
          options: [["2.5 thousand tonnes of rice", "Correct: between F's cost (2) and E's cost (3)."], ["1.5 thousand tonnes of rice", "F would receive less than its cost of 2, so F loses."], ["3.5 thousand tonnes of rice", "E would pay more than its own cost of 3, so E loses."], ["2 thousand tonnes of rice", "At F's own cost F gains nothing."]],
          answer: "A",
          explanation: "The rate must lie strictly between the two opportunity costs, 2 and 3.",
        }),
        P.num({ label: "(e)", marks: 2, kind: "plain", value: gain, stem: `F now specialises completely in machines, and E produces the remaining machines needed to keep total machine output at ${before.y} hundred, using the rest of its resources for rice. Calculate the increase in total rice output, in thousand tonnes.`, wrong: [eRice, E.x - before.x], explanation: `Before: rice ${E.x / 2} + ${F.x / 2} = ${before.x}; machines ${E.y / 2} + ${F.y / 2} = ${before.y}. After: F makes ${F.y} machines, so E makes ${eMach}, using ${eMach}/${E.y} of its resources; E's rice = ${E.x} × ${E.y - eMach}/${E.y} = ${eRice}. Increase = ${eRice} − ${before.x} = ${gain}.` }),
        P.manual({
          label: "(f)", marks: 2,
          stem: "Explain why both countries can gain from trading at the rate in (d).",
          points: ["F receives 2.5 thousand tonnes of rice per hundred machines, more than the 2 it would give up to make them itself.", "E obtains machines for 2.5, less than the 3 it would give up to make them, so both have more goods."],
          modelAnswer: "F gives up only 2 thousand tonnes of rice to make one hundred machines but receives 2.5 when it trades them, so it ends up with more rice than it could produce itself. E pays 2.5 thousand tonnes of rice for one hundred machines, less than the 3 it would give up to make them, so it too has more of both goods.",
          explanation: "Each side compares the trade rate with its own opportunity cost.",
        }),
        P.manual({
          label: "(g)", marks: 4, levels: LV(4),
          stem: "Discuss whether Country E should stop making machines and import them from F.",
          points: [
            "For: F has the comparative advantage in machines; E gains more rice and can buy machines more cheaply; world output rises.",
            "Against: E becomes dependent on F (supply could be cut, prices or exchange rates change); transport costs; machine workers lose jobs and need retraining.",
            "Against/strategic: machines may be important for development and technology; infant industry argument.",
            "Justified conclusion.",
          ],
          modelAnswer: "E has the comparative advantage in rice, so moving resources from machines into rice raises total output, and E can obtain machines from F for 2.5 thousand tonnes of rice rather than the 3 it gives up making them. However, E would depend on F for capital goods: if F cut supplies, raised prices or the exchange rate moved, E's investment could suffer. Transport costs would reduce the gains, and E's machine workers would lose their jobs and need retraining. A machine industry may also bring skills and technology that help development. E should move most of its resources into rice and import most machines, but it may sensibly keep some machine-making capacity for security and skills.",
          explanation: "Gains from specialisation versus dependence, adjustment costs and development; conclude.",
        }),
      ],
      hints: ["Opportunity cost of machines = rice given up ÷ machines gained.", "Keep total machine output the same and compare total rice output."],
      explanation: `E's opportunity cost of machines is ${ca.oc.A.y} and F's is ${ca.oc.B.y}, so F specialises in machines; specialising raises rice output from ${before.x} to ${eRice} thousand tonnes with the same machine output.`,
    });
  }

  b.card("DEFINITION", "Define **absolute advantage**.", "Being able to produce more of a good than another country using the same quantity of resources.");
  b.card("DEFINITION", "Define **comparative advantage**.", "Being able to produce a good at a lower opportunity cost than another country.");
  b.card("DEFINITION", "What is **factor endowment**?", "The quantity and quality of land, labour, capital and enterprise that a country has.");
  b.card("FORMULA", "How do you find the opportunity cost of good X from an output table?", "Output of good Y given up ÷ output of good X gained (with the same resources).");
  b.card("FACT", "Can a country have the comparative advantage in both of two goods?", "No. Its two opportunity costs are reciprocals, so a lower cost in one good means a higher cost in the other.");
  b.card("CONCEPT", "Country A has the absolute advantage in both goods. Can trade still benefit both countries?", "Yes, if opportunity costs differ: each specialises where its opportunity cost is lower and trades at a rate between the two costs.");
  b.card("CONCEPT", "Which trade rate lets both countries gain?", "Any rate strictly between the two countries' opportunity costs of the good.");
  b.card("CONCEPT", "Give three limitations of the theory of comparative advantage.", "Transport costs; immobile resources; rising opportunity costs; trade barriers; risk of depending on a few exports.");
  b.card("DEFINITION", "Define **specialisation by country**.", "A country concentrating its resources on the goods it can produce at the lowest (opportunity) cost and trading for other goods.");
});
