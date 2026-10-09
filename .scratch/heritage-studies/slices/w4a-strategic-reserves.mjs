// W4a: National strategic reserves (her.production.strategic-reserves).
// Reviewer note: GMB holds the strategic grain reserve (BRIEF); fuel reserves formerly through NOCZIM, later
// restructured (successor company names left out). No reserve sizes or tonnages given. Cyclone Idai March 2019.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.production.strategic-reserves", { file: "production/strategic-reserves", keyPrefix: "production.strategic-reserves" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which body holds Zimbabwe's **strategic grain reserve**?",
    options: [
      ["the Grain Marketing Board", "Correct: GMB buys, stores and sells grain."],
      ["the Environmental Management Agency", "EMA deals with the environment."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Forestry Commission", "This body manages forests."],
    ],
    answer: "A",
    explanation: "The Grain Marketing Board holds the strategic grain reserve in depots and silos across the country.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **national strategic reserve**?",
    options: [
      ["a stock of essential goods held for emergencies and shortages", "Correct: e.g. grain or fuel."],
      ["a protected area for wildlife", "That is a national park or game reserve."],
      ["money saved by households every month in a community savings club", "This is private saving, not a national reserve."],
      ["a group of soldiers kept ready for war", "This is a military reserve, not this concept."],
    ],
    answer: "A",
    explanation: "A national strategic reserve is a stock of essential commodities kept to meet the country's needs in an emergency.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Through which body were Zimbabwe's fuel reserves formerly managed?",
    options: [
      ["NOCZIM", "Correct: the National Oil Company of Zimbabwe, later restructured."],
      ["GMB", "GMB handles grain."],
      ["ZIMSTAT", "ZIMSTAT publishes statistics."],
      ["ZEC", "ZEC runs elections."],
    ],
    answer: "A",
    explanation: "Fuel reserves were formerly managed through the National Oil Company of Zimbabwe (NOCZIM).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does releasing grain from the reserve help to **stabilise prices**?",
    options: [
      ["It increases supply when grain is scarce, so prices rise less", "Correct: more supply eases the pressure on prices."],
      ["It makes all grain free of charge", "Grain is still sold, often to millers."],
      ["It stops farmers from growing maize", "The reserve encourages production by buying grain."],
      ["It reduces the amount of grain available in the shops and markets", "Releasing grain increases supply."],
    ],
    answer: "A",
    hints: ["What happens to prices when supply rises?"],
    explanation: "When grain is scarce, prices rise; adding grain from the reserve increases supply and slows the rise.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After a cyclone destroys crops in Manicaland, which use of the strategic grain reserve is **most appropriate**?",
    options: [
      ["releasing grain for food relief in the affected districts", "Correct: emergency relief is a key function."],
      ["exporting all the grain to earn foreign currency", "This would leave people without food."],
      ["keeping all the grain locked away until prices rise", "This defeats the purpose of the reserve."],
      ["selling the silos to private buyers", "This would destroy the reserve's capacity."],
    ],
    answer: "A",
    hints: ["What is the reserve for in an emergency?"],
    explanation: "Reserves supply food after disasters such as droughts, floods and cyclones.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Farmers sell their maize to private buyers instead of GMB because GMB pays late. What is the **most direct** effect on the reserve?",
    options: [
      ["The reserve becomes harder to fill", "Correct: less grain reaches the reserve."],
      ["The reserve becomes too large to store", "Less grain would arrive, not more."],
      ["Fuel shortages end", "This concerns grain, not fuel."],
      ["Droughts become less frequent", "Payment does not affect rainfall."],
    ],
    answer: "A",
    hints: ["Where does the grain go instead?"],
    explanation: "Late payment encourages farmers to sell elsewhere, so the reserve receives less grain.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which reason **best** explains why strategic reserves are especially important in Zimbabwe?",
    options: [
      ["Farming depends mainly on rain, and droughts are common", "Correct: harvests can fail in bad seasons."],
      ["Zimbabwe has no farmers of its own", "Zimbabwe has many farmers."],
      ["Grain never spoils when it is stored", "Grain can spoil; storage needs care."],
      ["Fuel is produced in large amounts inside Zimbabwe", "Zimbabwe imports its fuel."],
    ],
    answer: "A",
    hints: ["Think about rainfall and imports."],
    explanation: "Rain-fed farming and frequent droughts, together with imported fuel, make reserves vital.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does GMB **rotate** the grain in the reserve?",
    options: [
      ["to sell older grain before it spoils and replace it with new grain", "Correct: rotation keeps the reserve fresh."],
      ["to move the grain round the country for display at agricultural shows", "Rotation is about age of stock, not display."],
      ["to mix grain with fuel", "Grain and fuel are kept separately."],
      ["to stop farmers from selling grain", "GMB buys grain from farmers."],
    ],
    answer: "A",
    explanation: "Older stocks are sold, for example to millers, and replaced, so the reserve does not spoil.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe's strategic grain reserve consists mainly of maize.",
    answer: true,
    explanation: "True. Maize is the main grain held, although other grains such as wheat and small grains may be stored.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Strategic reserves are used only to give free food during droughts.",
    answer: false,
    explanation: "False. They also stabilise prices, supply millers between harvests, give farmers a market and cover interruptions in fuel imports.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each function of strategic reserves with its explanation.",
    pairs: [
      ["food security", "grain is available when harvests fail"],
      ["price stability", "releasing stocks stops prices from rising too steeply"],
      ["fuel security", "transport and industry keep running if imports stop"],
      ["a market for farmers", "farmers have a buyer for their grain"],
    ],
    explanation: "Reserves serve several functions, not only drought relief.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The strategic grain reserve is held by the {{blank:a}}. Grain from reserves was used for relief after Cyclone Idai in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Grain Marketing Board"], choices: ["Grain Marketing Board", "Forestry Commission", "Zimbabwe Electoral Commission", "Registrar General"] },
      { id: "b", accepted: ["2019"], choices: ["2019", "2008", "1992", "2013"] },
    ],
    explanation: "GMB holds the grain reserve; Cyclone Idai struck in March 2019.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sequence of how the grain reserve works.",
    template: "In a good season GMB {{blank:a}} grain from farmers. It {{blank:b}} the grain in silos. In a shortage it {{blank:c}} grain to millers and to areas in need.",
    blanks: [
      { id: "a", accepted: ["buys"], choices: ["buys", "releases", "exports", "destroys"] },
      { id: "b", accepted: ["stores"], choices: ["stores", "plants", "sells", "burns"] },
      { id: "c", accepted: ["releases"], choices: ["releases", "buys", "plants", "hides"] },
    ],
    hints: ["Buy when there is plenty; release when there is little."],
    explanation: "The reserve buys in plenty, stores safely and releases in shortage.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the abbreviation of the body that buys, stores and sells grain and holds the strategic grain reserve.",
    accepted: ["GMB", "G.M.B."],
    wrong: ["EMA"],
    explanation: "GMB is the Grain Marketing Board.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** functions of national strategic reserves.",
    points: [
      "Any one of: food security; fuel security; price stability; emergency / disaster relief; bridging gaps between harvests or imports; reducing dependence on imports and aid; providing a market for farmers",
      "A second different function",
      "A third different function",
    ],
    modelAnswer: "They ensure food security, keep prices stable and supply relief after disasters.",
    explanation: "One mark per correct function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** challenges of keeping a strategic grain reserve.",
    points: [
      "Identifies: high cost / shortage of funds and foreign currency",
      "Develops: government may not afford to buy enough grain or to import when harvests fail",
      "Identifies: storage losses / repeated droughts / late payment of farmers / side marketing / transport / accountability",
      "Develops: e.g. pests and damp spoil grain in poor silos, so stocks fall",
    ],
    modelAnswer: "Keeping a reserve is very costly, so government may not have enough money or foreign currency to buy grain from farmers or import it. Grain can also be lost to pests and damp in poorly maintained silos, so the stock shrinks before it is needed.",
    hints: ["Think about money and about storage."],
    explanation: "One mark for each challenge and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways the government could encourage farmers to sell more grain to the strategic reserve, and explain each.",
    points: [
      "Suggests paying farmers promptly",
      "Explains that farmers then have money for school fees and inputs, so they prefer to sell to GMB",
      "Suggests fair, competitive buying prices announced before planting / more collection points nearer farms",
      "Explains that farmers can plan and earn enough, and transport costs fall",
    ],
    modelAnswer: "The government could make sure farmers are paid promptly, so they have money for fees and inputs and prefer to sell to GMB rather than to other buyers. It could also announce fair prices before planting and open more collection points near farming areas, so farmers can plan and spend less on transport.",
    hints: ["Why do farmers sell elsewhere?"],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "The table shows the grain stock in a fictional district depot at the start of each month (invented for this question).\n\n" +
      table(["Month", "Grain in store (tonnes)", "Event"], [
        ["May", "4,000", "Harvest: farmers deliver grain"],
        ["August", "6,500", "Deliveries continue"],
        ["November", "3,000", "Drought relief begins in the district"],
        ["February", "1,200", "Relief continues; prices rising in local markets"],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "In which month was the stock **highest**?",
        options: [
          ["August", "Correct: 6,500 tonnes."],
          ["May", "The stock was 4,000 tonnes."],
          ["November", "The stock was 3,000 tonnes."],
          ["February", "The stock was 1,200 tonnes."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Describe what happened to the stock between August and February, and give the reason.",
        points: ["It fell from 6,500 to 1,200 tonnes", "because grain was released for drought relief"],
        modelAnswer: "The stock fell from 6,500 to 1,200 tonnes, because grain was released for drought relief in the district.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** risk shown by the February figure and suggest how it could be reduced.",
        points: [
          "Risk: stock is low while prices are rising / the reserve may run out before the next harvest",
          "Explains effect: people may go hungry and prices may rise further",
          "Suggests: move grain from other depots / import / plan larger stocks or drought-tolerant crops for the future",
        ],
        modelAnswer: "In February only 1,200 tonnes remained while local prices were rising, so the depot could run out before the next harvest and people could go hungry. Grain could be moved from depots in other districts or imported, and in future the reserve could be built up more in good seasons.",
      }),
    ],
    hints: ["In (c), compare the stock with the time left until the next harvest."],
    explanation: "A data-based practice item on how a grain reserve is built up and used.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about national strategic reserves.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** reasons why Zimbabwe needs a fuel reserve.",
        points: [
          "Fuel is imported through neighbouring countries",
          "so supply can be interrupted, and the reserve covers the gap",
          "Transport, farming, industry and emergency services depend on fuel",
          "so without a reserve the whole economy would slow down during shortages",
        ],
        modelAnswer: "Zimbabwe imports its fuel through neighbouring countries, so supply can be interrupted, and a reserve covers the gap until imports resume. Transport, farming, industry and emergency services all depend on fuel, so without a reserve a shortage would slow down the whole economy.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Strategic reserves are too costly to be worth keeping.\" How far do you agree?",
        points: [
          ["Costs: large funds and foreign currency; storage losses; maintenance; risk of mismanagement", 2],
          ["Benefits: food and fuel security in droughts and disasters; price stability; market for farmers", 2],
          ["Comparison: cost of hunger, unrest, emergency imports and aid without reserves; ways to cut costs (better storage, prompt payment, partnerships)", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Strategic reserves are certainly costly. Government must find large sums, often in foreign currency, to buy grain and fuel, build and maintain silos and tanks, and transport stocks. Some grain is lost to pests and damp, and poor management can waste resources.\n\nHowever, the benefits are great. In droughts, floods or cyclones, reserves provide food and keep prices from rising steeply. Fuel reserves keep transport and emergency services running when imports are interrupted, and the grain reserve gives farmers a market. Without reserves, the costs of hunger, unrest and emergency imports would probably be much higher.\n\nI disagree with the statement. Reserves are expensive, but they are worth keeping, especially in a country with frequent droughts; the answer is to manage them better, not to abandon them.",
      }),
    ],
    hints: ["In (b), compare the cost of keeping reserves with the cost of not having them."],
    explanation: "A practice evaluative item on the value of strategic reserves.",
  });

  b.card("DEFINITION", "National strategic reserve", "A state-held stock of an essential commodity, such as grain or fuel, kept for emergencies and shortages.");
  b.card("DEFINITION", "Buffer stock", "A stock added to when supply is high and released when supply is low, to steady supply and prices.");
  b.card("FACT", "Who holds the strategic grain reserve?", "The Grain Marketing Board (GMB).");
  b.card("FACT", "Through which body were fuel reserves formerly managed?", "The National Oil Company of Zimbabwe (NOCZIM), later restructured.");
  b.card("FACT", "Name four functions of strategic reserves.", "Food security, fuel security, price stability, emergency relief (also a market for farmers).");
  b.card("CONCEPT", "How does releasing grain stabilise prices?", "It increases supply when grain is scarce, so prices rise less steeply.");
  b.card("CONCEPT", "Why does Zimbabwe especially need strategic reserves?", "Farming is mainly rain-fed and droughts are common; fuel is imported and supply can be interrupted.");
  b.card("CONCEPT", "Name four challenges of keeping reserves.", "High cost, storage losses, repeated droughts, late payment of farmers (also side marketing, transport, accountability).");
  b.card("CONCEPT", "Why is grain in the reserve rotated?", "Older grain is sold before it spoils and replaced with new grain.");
});
