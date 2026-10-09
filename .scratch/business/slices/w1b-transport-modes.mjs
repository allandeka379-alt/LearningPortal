// W1b: importance of transport and modes of transport.
import { concept, P } from "../lib.mjs";

concept("bus.transport.modes", { file: "transport/modes", keyPrefix: "transport.modes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which mode of transport is the fastest over long distances?",
    options: [
      ["Air", "Correct: aircraft are the fastest way to move goods over long distances."],
      ["Rail", "Rail is slower than air and limited to fixed routes and timetables."],
      ["Sea", "Sea transport is the slowest mode, though cheap for very large loads."],
      ["Pipeline", "Pipelines carry liquids and gases in a steady flow; they are not used for speed."],
    ],
    answer: "A",
    explanation: "Air is the fastest mode over long distances, which is why it is used for perishable, urgent and valuable goods despite its high cost.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which mode is most suitable for moving large quantities of coal 400 km from a mine to a power station?",
    options: [
      ["Rail", "Correct: rail carries heavy, bulky, low-value goods cheaply over long distances."],
      ["Air", "Air is far too expensive and has too little capacity for coal."],
      ["Motorcycle", "A motorcycle carries only very small loads."],
      ["Pipeline", "Pipelines carry liquids and gases, not lumps of coal."],
    ],
    answer: "A",
    explanation: "Coal is bulky, heavy and of low value per tonne, and the distance is long: **rail** is the cheapest suitable mode.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main advantage of road transport over rail transport?",
    options: [
      ["It gives door-to-door delivery", "Correct: lorries collect from and deliver to the exact premises, so goods are not reloaded."],
      ["It carries heavier loads", "Trains carry far heavier loads than lorries."],
      ["It is cheaper over long distances", "For bulky goods over long distances, rail is usually cheaper."],
      ["It causes less pollution per tonne", "Rail usually causes less pollution per tonne carried."],
    ],
    answer: "A",
    explanation: "Road transport is flexible and reaches the customer's door. Rail needs road transport at each end unless both premises have sidings.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which goods are best suited to air transport?",
    options: [
      ["Cut flowers for a market in Europe", "Correct: flowers are highly perishable, light and need to arrive within a day or two."],
      ["Cement for a building site in Gweru", "Cement is heavy, bulky and low in value: road or rail suits it."],
      ["Diesel for an inland fuel depot", "Fuel is a liquid moved continuously: pipeline, rail tanker or road tanker."],
      ["Iron ore for a smelter abroad", "Iron ore is bulky and low in value: rail and sea suit it."],
    ],
    answer: "A",
    explanation: "Air transport suits goods that are **perishable, urgent or valuable relative to their weight**: cut flowers, fresh vegetables for export, medicines, documents and spare parts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a disadvantage of pipeline transport?",
    options: [
      ["It is very expensive to build", "Correct: laying a pipeline needs a large capital outlay before anything flows."],
      ["It is easily delayed by traffic", "Pipelines are not affected by road traffic."],
      ["It needs many drivers and loaders", "Pipelines need very few workers once built."],
      ["It is unsuitable for liquids", "Liquids and gases are exactly what pipelines carry."],
    ],
    answer: "A",
    explanation: "Pipelines are cheap to run and reliable, but they are very costly to build, carry only liquids and gases, follow a fixed route and can leak or be vandalised.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Transport creates place utility. Which example shows this?",
    options: [
      ["Oranges are worth more in a Harare shop than on a remote farm", "Correct: moving goods to where buyers are adds value to them."],
      ["Maize is worth more months after harvest than at harvest", "That is time utility, created by storage."],
      ["Cotton is worth more as cloth than as raw lint", "That is form utility, created by manufacturing."],
      ["A car is worth more to a buyer once she owns it", "That is possession (ownership) utility, created by trade."],
    ],
    answer: "A",
    hints: ["Place utility is about where the goods are."],
    explanation: "Place utility is the extra value goods have because they are where they are wanted. Transport creates it by moving goods to the market.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do Zimbabwean importers of large machinery from overseas usually rely on sea transport for part of the journey?",
    options: [
      ["Sea carries very heavy loads cheaply over long distances", "Correct: for bulky goods between continents, sea is the cheapest mode; road or rail completes the journey from the port."],
      ["Zimbabwe has its own sea ports on the Indian Ocean", "Zimbabwe is landlocked: it uses ports in neighbouring countries."],
      ["Sea transport is the fastest mode", "Sea is the slowest mode."],
      ["Ships deliver directly to the buyer's door in Zimbabwe", "Ships reach only ports; road or rail completes the journey."],
    ],
    answer: "A",
    hints: ["Think about weight, distance and cost."],
    explanation: "Heavy machinery from another continent is best shipped by sea, the cheapest mode for large loads over long distances, then carried from a port in a neighbouring country by road or rail.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Pipelines are suitable for carrying fuel, water and gas.",
    answer: true,
    explanation: "True. Pipelines carry liquids and gases continuously: fuel, water, natural gas and sewage.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Air transport is never used for goods of low value because it is the most expensive mode.",
    answer: false,
    explanation: "False. Air carries goods that are **perishable or urgent** even when their value is modest, such as fresh vegetables and cut flowers, because a slow mode would destroy their value.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each consignment with the most suitable mode of transport.",
    pairs: [
      ["Crates of tomatoes from Mutoko to Mbare", "Road"],
      ["A trainload of fertiliser from a factory to a distant depot", "Rail"],
      ["Urgent medicines to a hospital in another country", "Air"],
      ["Petrol pumped steadily from a port to an inland depot", "Pipeline"],
    ],
    explanation: "Tomatoes: short distance, perishable, door-to-door (road). Fertiliser in bulk over a long distance (rail). Urgent medicines across borders (air). Fuel in a continuous flow (pipeline).",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "The cheapest mode for very large loads between continents is {{blank:a}} transport. Road transport is best for {{blank:b}} distances.",
    blanks: [
      { id: "a", accepted: ["sea"], choices: ["sea", "air", "road", "pipeline"] },
      { id: "b", accepted: ["short"], choices: ["short", "long"] },
    ],
    explanation: "Sea transport has huge capacity and the lowest cost per tonne over long distances; road is flexible and economical over short distances.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Ships that sail on fixed routes to a published timetable are called what?",
    accepted: ["liners", "liner", "liner ships", "cargo liners"],
    wrong: ["tramps", "tankers"],
    explanation: "**Liners** sail on regular routes and timetables. **Tramps** have no fixed route and are hired for particular cargoes.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** ways in which transport is important to commerce.",
    points: [
      "Bridges the gap in place / moves goods from producers to consumers.",
      "Explains: raw materials reach factories and goods reach shops and markets (example).",
      "Widens the market / makes large-scale production and specialisation possible.",
      "Explains: producers can sell all over the country and abroad, so they produce more at lower cost.",
    ],
    hints: ["Think about place, and about the size of the market."],
    modelAnswer: "Transport bridges the gap in place: it carries raw materials to factories and finished goods to shops, so consumers can buy goods made far away. It also widens the market, because producers can sell across the country and abroad, which lets them specialise and produce on a large scale.",
    explanation: "Other creditworthy points: stabilises prices by moving goods from surplus to shortage areas; creates jobs; moves workers and tourists; supports trade in perishables.",
  });
  b.manualShort({
    d: 3, marks: 3, skill: "UNDERSTANDING",
    stem: "Describe how transport in Zimbabwe developed from early times to the present.",
    points: [
      "Early: human porterage (head loads) and pack animals such as donkeys.",
      "Later: ox-drawn sledges and scotch carts / canoes on rivers.",
      "Modern: railways, motor vehicles on tarred roads, air transport and pipelines, each faster with larger loads.",
    ],
    hints: ["Start with people and animals, end with modern modes."],
    modelAnswer: "At first goods were carried as head loads and by pack animals such as donkeys. Ox-drawn sledges and scotch carts followed and are still used in rural areas. Railways, lorries on tarred roads, aircraft and pipelines came later, carrying larger loads faster.",
    explanation: "The development moves from human and animal power to mechanised modes that are faster and carry more.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Farai's company in Bulawayo makes furniture. It buys timber from sawmills in the Eastern Highlands, more than 500 km away, and sells beds and wardrobes to shops in Bulawayo and nearby towns. At present everything is moved by the company's own lorries.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which mode would usually be cheapest for bringing large loads of timber from the Eastern Highlands to Bulawayo?",
        options: [["Rail", "Correct: bulky timber over a long distance suits rail."], ["Air", "Air is far too costly for timber."], ["Pipeline", "Pipelines carry only liquids and gases."], ["Motorcycle", "Motorcycles carry very small loads."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages to Farai's company of using its own lorries to deliver furniture to shops.",
        points: [
          "Door-to-door delivery to each shop.",
          "So furniture is not reloaded and is less likely to be scratched or broken.",
          "Flexible: deliveries at times and on routes that suit the company and the shops.",
          "So urgent orders can be delivered quickly, improving customer service.",
        ],
        modelAnswer: "The lorries take furniture straight from the factory to each shop's door, so beds and wardrobes are not reloaded and are less likely to be damaged. The company can also choose the time and route of each delivery, so urgent orders reach shops quickly.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether Farai's company should use rail instead of its own lorries to bring timber from the Eastern Highlands.",
        points: [
          "Rail: lower cost per tonne for heavy timber over a long distance.",
          "Rail: large loads in one trip; saves wear, fuel and driver costs on the company's lorries.",
          "Against rail: not door-to-door; road transport needed at each end, adding cost.",
          "Against rail: extra handling, fixed timetables and possible delays.",
          "Considers what matters most (cost of bulky timber versus speed and control).",
          "Justified conclusion.",
        ],
        modelAnswer: "Timber is heavy and bulky and must travel more than 500 km, so rail would carry large loads at a lower cost per tonne and save fuel, driver wages and wear on the company's lorries. However, rail is not door-to-door: timber must be taken by lorry from the sawmill to the station and from the Bulawayo station to the factory, which adds cost, extra handling and delay, and trains run to fixed timetables. Because timber is not perishable and the company can plan its orders in advance, the lower cost of rail is likely to outweigh the delay, so it should use rail for large regular loads and keep its lorries for local deliveries.",
      }),
    ],
    hints: ["(a) Bulky goods, long distance.", "(c) Compare cost with flexibility, then decide for timber."],
    explanation: "(a) Rail. (b) Own lorries: door-to-door, flexible, fast. (c) Rail lowers cost for bulky, non-perishable timber over a long distance but adds handling and delay.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Thandeka is setting up a business exporting fresh mange tout peas and baby corn from farms near Harare to supermarkets in Europe. The vegetables must reach the shops within three days of picking.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify the most suitable mode of transport for the journey to Europe and give **one** reason.",
        points: ["Air.", "Reason: fastest over long distances, and the vegetables are perishable / must arrive within three days."],
        modelAnswer: "Air, because it is the fastest mode and the vegetables perish within days.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** disadvantages of this mode for Thandeka's business.",
        points: [
          "High cost / most expensive mode.",
          "Raises her costs, so lower profit or higher prices in Europe.",
          "Limited cargo space / depends on flight schedules and weather.",
          "Orders may be delayed or limited in size; also needs road transport and cold storage at each end.",
        ],
        modelAnswer: "Air freight is the most expensive mode, which raises her costs and cuts her profit margin. Cargo space is limited and depends on flight schedules, so some orders may be delayed or reduced.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Thandeka's partner suggests sending the vegetables by refrigerated road transport to a sea port and then by ship, to save money. Evaluate this suggestion.",
        points: [
          "Road and sea are much cheaper per tonne than air.",
          "Refrigeration slows spoilage.",
          "But the journey by road, port handling and sea takes far longer than three days.",
          "Vegetables would reach supermarkets past their best / be rejected.",
          "Extra handling at the port and risk of delays.",
          "Justified conclusion: reject the suggestion (or use it only for less perishable produce).",
        ],
        modelAnswer: "Road and sea transport would be much cheaper than air, and refrigeration would slow spoilage. However, road transport to a port, waiting and handling there and the sea voyage to Europe would take far longer than three days, so the peas and baby corn would arrive past their best and supermarkets might reject them. The savings would be lost if the produce is wasted. The suggestion should be rejected for fresh vegetables; sea transport might suit less perishable goods in future.",
      }),
    ],
    hints: ["(c) Compare the cost saving with the time limit of three days."],
    explanation: "For highly perishable exports, speed outweighs cost: air is the right mode despite its expense; a cheaper slow mode destroys the product's value.",
  });
  b.card("DEFINITION", "What is a **mode of transport**?", "A method of moving goods or people: road, rail, air, water or pipeline.");
  b.card("CONCEPT", "Which gap does transport bridge?", "The gap in **place** between producers and consumers (place utility).");
  b.card("FACT", "Main advantage of road transport?", "Door-to-door delivery and flexibility of route and time; best over short distances.");
  b.card("FACT", "Goods suited to rail transport?", "Heavy, bulky goods over long distances: coal, minerals, cement, fertiliser, grain, containers.");
  b.card("FACT", "Goods suited to air transport?", "Perishable, urgent or valuable goods: cut flowers, fresh produce for export, medicines, documents, spare parts.");
  b.card("FACT", "Goods suited to pipelines?", "Liquids and gases: fuel, water, natural gas, sewage.");
  b.card("DEFINITION", "Liners and tramps?", "Liners sail fixed routes to timetables; tramps have no fixed route and are hired for particular cargoes.");
  b.card("CONCEPT", "Main disadvantage of sea transport?", "It is the slowest mode and reaches only ports, so a landlocked country also needs road or rail.");
  b.card("CONCEPT", "Give three reasons transport is important to commerce.", "Bridges the gap in place; widens markets and allows specialisation; stabilises prices by moving goods to shortage areas; creates jobs (any three).");
});
