// Slice G1b: ecosystems — the Antarctic ecosystem (Cambridge 3.1).
import { concept, P, geographyLevels } from "../lib.mjs";

const COAST =
  "Table 1: mean monthly temperature at a fictional coastal research station in Antarctica (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Temperature (°C) | −1 | −4 | −9 | −14 | −16 | −17 | −19 | −20 | −18 | −13 | −6 | −2 |";

concept("geo.ecosystems.antarctic", { file: "ecosystems/antarctic", keyPrefix: "ecosystems.antarctic" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which ocean surrounds Antarctica?",
    options: [
      ["Southern Ocean", "Correct: it encircles the continent."],
      ["Arctic Ocean", "The Arctic Ocean is around the North Pole."],
      ["Indian Ocean", "The Indian Ocean lies further north, between Africa, Asia and Australia."],
      ["Mediterranean Sea", "The Mediterranean lies between Europe and North Africa."],
    ],
    answer: "A",
    explanation: "Antarctica is a continent centred on the South Pole and surrounded by the Southern Ocean.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organism is the main food of many Antarctic whales, seals and penguins?",
    options: [
      ["Krill", "Correct: small shrimp-like crustaceans that eat phytoplankton."],
      ["Lichen", "Lichens grow on rocks and are eaten by very few animals."],
      ["Polar bear", "Polar bears live in the Arctic, not the Antarctic."],
      ["Moss", "Mosses grow on ice-free land and are not a major food source."],
    ],
    answer: "A",
    explanation: "Krill feed on phytoplankton and are eaten by baleen whales, crabeater seals, penguins, fish and seabirds; they are the keystone species.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does Antarctica receive so little precipitation?",
    options: [
      ["Cold, sinking air under high pressure holds little moisture", "Correct: the interior is a polar desert."],
      ["The continent is surrounded by warm ocean currents", "The surrounding currents are cold."],
      ["Strong convection lifts the air every afternoon", "Convection needs strong heating, which Antarctica lacks."],
      ["Mountains block all winds from reaching the coast", "Winds do reach the coast; katabatic winds blow off the ice sheet."],
    ],
    answer: "A",
    explanation: "Very cold air holds little water vapour, and it sinks over the continent to form a polar high. Sinking air does not form clouds, so the interior receives less than about 50 mm a year.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does the high albedo of snow and ice help to keep Antarctica cold?",
    options: [
      ["Most of the incoming sunlight is reflected rather than absorbed", "Correct: little energy is left to warm the surface."],
      ["It traps heat near the ground at night", "Reflection of sunlight does not trap heat at night."],
      ["It produces strong, warm winds that blow in from the sea", "Albedo does not create sea winds."],
      ["It increases the length of the summer day", "Day length depends on latitude and season, not albedo."],
    ],
    answer: "A",
    explanation: "Albedo is the share of sunlight reflected. Fresh snow reflects most of it, so very little energy is absorbed to warm the surface.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a **katabatic wind**?",
    options: [
      ["Cold, dense air flowing downhill off the ice sheet", "Correct: it blows from the high interior to the coast."],
      ["Warm, moist air rising over the ocean", "That describes convection over a warm sea."],
      ["A sea breeze blowing inland during the day", "Sea breezes depend on daytime land heating."],
      ["A tropical storm that reaches the polar regions", "Tropical storms weaken over cold water and do not reach Antarctica."],
    ],
    answer: "A",
    explanation: "Air cooled over the high ice sheet becomes dense and flows down the slopes towards the coast, sometimes at very high speeds.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The amount of krill in an area of the Southern Ocean falls sharply. Which effect is **most likely** first?",
    options: [
      ["Penguin and whale numbers in the area decline", "Correct: they lose their main food."],
      ["Phytoplankton numbers fall sharply", "With fewer krill grazing on it, phytoplankton is more likely to increase."],
      ["Leopard seals switch to eating lichens", "Leopard seals are carnivores; they do not eat lichens."],
      ["Sea ice stops forming in winter", "Sea ice depends on temperature, not krill."],
    ],
    answer: "A",
    hints: ["Which animals eat krill?"],
    explanation: "Krill is the keystone species. If it declines, the whales, seals, penguins and fish that eat it decline, and their predators follow.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Emperor penguins huddle together in large groups during the winter. How does this help them survive?",
    options: [
      ["It reduces each bird's heat loss to the cold wind", "Correct: they share warmth and take turns on the outside."],
      ["It helps them catch more fish under the ice", "Huddling happens on the ice, not while feeding."],
      ["It allows them to make their own food by photosynthesis", "Penguins are consumers, not producers."],
      ["It keeps the sea ice from melting under them", "Huddling does not affect sea-ice melt."],
    ],
    answer: "A",
    hints: ["Think about surface area exposed to the wind."],
    explanation: "Packed together, each penguin exposes less of its body to the wind and cold; birds rotate between the outside and the warmer centre.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the Southern Ocean so productive in summer despite its cold water?",
    options: [
      ["Long daylight and upwelled nutrients let phytoplankton bloom", "Correct: light and nutrients fuel the food web."],
      ["The water is warmed to tropical temperatures in summer", "The water stays close to freezing."],
      ["Rivers bring large loads of nutrients from the continent", "Antarctica has almost no rivers."],
      ["Tall forests on the coast drop leaves into the sea", "There are no forests in Antarctica."],
    ],
    answer: "A",
    explanation: "In summer the sun shines for nearly 24 hours; upwelling currents bring nutrients to the surface; phytoplankton bloom and feed the krill.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Polar bears are top predators in the Antarctic ecosystem.",
    answer: false,
    explanation: "False. Polar bears live only in the Arctic. Top predators in the Antarctic include leopard seals and killer whales.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Much of the interior of Antarctica is classed as a desert because it receives very little precipitation.",
    answer: true,
    explanation: "True. The interior receives less than about 50 mm (water equivalent) a year, so it is a polar desert.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "At a fictional inland research station in Antarctica, the warmest month has a mean temperature of −27 °C and the coldest month a mean of −63 °C (fictional data). Calculate the annual temperature range.",
    value: 36, unit: "°C",
    wrong: [90, -36],
    explanation: "Range = warmest − coldest = $-27 - (-63) = 36$ °C.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "In a fictional experiment, a light meter measured 820 units of sunlight reaching a fresh snow surface and 697 units reflected from it. Calculate the albedo of the snow as a percentage.",
    value: 85, tol: 0.5, unit: "%", answer: "85",
    wrong: [123, 15],
    hints: ["Albedo = reflected ÷ incoming × 100."],
    workedSolution: "1. Albedo = reflected ÷ incoming × 100.\n2. $697 \\div 820 \\times 100 = 85\\%$.",
    explanation: "$697 \\div 820 \\times 100 = 85\\%$, so most of the sunlight is reflected.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each Antarctic organism to its adaptation.",
    pairs: [
      ["Weddell seal", "grinds breathing holes in the sea ice with its teeth"],
      ["Icefish", "antifreeze proteins in its blood"],
      ["Lichen", "survives being frozen and dried, growing very slowly"],
      ["Humpback whale", "migrates north in winter after feeding on krill in summer"],
    ],
    explanation: "Each organism has a feature that lets it cope with the cold, ice, darkness or the seasonal food supply.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Thick fat that insulates seals and whales is called {{blank:a}}, and frozen sea water that spreads around Antarctica in winter is called sea {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["blubber"], wrong: "fur" },
      { id: "b", accepted: ["ice"], wrong: "shelf" },
    ],
    explanation: "Blubber insulates marine mammals; sea ice forms when the ocean surface freezes in winter.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the line of latitude, at about 66.5° S, south of which almost all of Antarctica lies.",
    accepted: ["Antarctic Circle", "the Antarctic Circle"],
    wrong: ["Tropic of Capricorn"],
    explanation: "The **Antarctic Circle** (about 66.5° S) marks where there is at least one day of 24-hour daylight and one of 24-hour darkness each year.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why Antarctica is so cold.",
    points: [
      "A first reason, e.g. high latitude / low sun angle / long polar night",
      "Developed: the sun's energy is spread over a large area and passes through more atmosphere / there is no sunlight for months",
      "A second reason, e.g. high albedo of snow and ice / high altitude of the ice sheet",
      "Developed: most sunlight is reflected / temperature falls with height (much of the ice sheet is over 2,000 m)",
    ],
    hints: ["Think about the sun, the surface and the height of the land."],
    modelAnswer: "Antarctica is at a very high latitude, so the sun is always low and its energy is spread over a large area, and in winter it does not rise at all. The snow and ice also have a high albedo, reflecting most of the sunlight that arrives, so little energy warms the surface.",
    explanation: "Each reason earns a mark and its development a second mark.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: COAST,
    parts: [
      P.short({
        label: "(a)",
        stem: "Name the coldest month.",
        accepted: ["August", "Aug"],
        wrong: ["July"],
        explanation: "August has the lowest mean, −20 °C.",
      }),
      P.num({
        label: "(b)",
        marks: 1,
        stem: "How many months have a mean temperature above −5 °C?",
        value: 3,
        explanation: "January (−1), February (−4) and December (−2): three months.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Describe the pattern of temperature shown in Table 1.",
        points: [
          "Below freezing in every month",
          "Warmest in December-January (−1 °C) and coldest in July-August (−20 °C) / range of 19 °C",
        ],
        modelAnswer: "Temperatures are below freezing all year, from about −1 °C in January to −20 °C in August, a range of 19 °C.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Suggest why this coastal station is warmer than stations in the interior of the continent.",
        points: [
          "It is at a lower altitude / near sea level",
          "The ocean has a moderating effect / stores heat",
          "It may be at a lower latitude / further from the pole than the interior",
        ],
        modelAnswer: "The station is near sea level, while the interior is over 2,000 m high, and the nearby ocean releases stored heat. It is also further from the pole than much of the interior.",
      }),
    ],
    hints: ["Look for values greater than −5 (closer to zero)."],
    explanation: "Coastal Antarctica is cold all year but milder than the high interior because of altitude, the ocean and latitude.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 600,
    stem: "Read this description of an Antarctic food web (fictional summary based on a research cruise).\n\n*In January, phytoplankton bloom in the long daylight. Huge swarms of krill feed on them. Crabeater seals, Adélie penguins and humpback whales eat krill. Leopard seals hunt penguins and young crabeater seals. Killer whales take seals.*",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which organism in the description is a producer?",
        options: [
          ["Phytoplankton", "Correct: they photosynthesise."],
          ["Krill", "Krill eat phytoplankton: primary consumers."],
          ["Adélie penguin", "Penguins eat krill: secondary consumers."],
          ["Leopard seal", "Leopard seals are predators."],
        ],
        answer: "A",
        explanation: "Phytoplankton are microscopic algae that photosynthesise; they are the producers.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Write a food chain of **four** organisms from the description.",
        points: [
          "Four organisms in a correct feeding sequence starting with phytoplankton, e.g. phytoplankton → krill → Adélie penguin → leopard seal",
          "Arrows point from the food to the feeder",
        ],
        modelAnswer: "phytoplankton → krill → crabeater seal → killer whale",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Explain why the food web is most active in summer.",
        points: [
          "Long daylight (nearly 24 hours) provides energy for photosynthesis",
          "Sea ice melts back, exposing water / upwelled nutrients are available",
          "Phytoplankton bloom, so krill and the animals that eat them have plentiful food",
        ],
        modelAnswer: "In summer there is almost continuous daylight and the sea ice retreats, so phytoplankton bloom in the nutrient-rich water. Krill feed on the bloom, and penguins, seals and whales feed on the krill.",
      }),
    ],
    hints: ["Start every food chain with the producer."],
    explanation: "The Antarctic food web is driven by the summer phytoplankton bloom and depends on krill.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the abiotic factors of Antarctica influence the plants and animals that live there.",
    points: [
      "Extreme cold → blubber, dense feathers or fur, antifreeze proteins in fish",
      "Strong winds → low-growing plants in sheltered cracks / penguins huddle",
      "Seasonal light → summer phytoplankton bloom; winter darkness ends the bloom",
      "Sea ice → habitat for algae and krill / breeding platform for emperor penguins / seals keep breathing holes",
      "Little ice-free land and low precipitation → very few land plants (mosses, lichens, two flowering plants)",
      "Seasonal food supply → migration of whales and seabirds / fat storage",
    ],
    levels: geographyLevels(6),
    hints: ["Take each abiotic factor in turn and link it to a plant or animal response."],
    wordLimit: { max: 300 },
    modelAnswer: "Antarctica's extreme cold means animals need insulation: seals and whales have thick blubber, penguins have dense waterproof feathers, and some fish have antifreeze proteins. Strong katabatic winds make emperor penguins huddle, and the few plants grow low in sheltered cracks. Light is seasonal: nearly 24-hour daylight in summer lets phytoplankton bloom, feeding krill and the animals that eat them, while winter darkness ends the bloom, so whales and many birds migrate north. Sea ice provides a home for algae and krill and a breeding platform for emperor penguins, while Weddell seals must keep breathing holes open. Because almost all land is under ice and precipitation is low, land plants are limited to mosses, lichens and two flowering plants on the Peninsula.",
    explanation: "A strong answer links several abiotic factors to specific biotic responses, with named organisms.",
  });
  b.card("FACT", "Where is Antarctica?", "A continent centred on the South Pole, almost entirely south of the Antarctic Circle (about 66.5° S), surrounded by the Southern Ocean.");
  b.card("CONCEPT", "Why is Antarctica so cold?", "High latitude and low sun angle, months of polar night, high albedo of snow and ice, high altitude of the ice sheet.");
  b.card("CONCEPT", "Why is Antarctica so dry?", "Cold air holds little moisture and sinks under a polar high, so few clouds form; the interior is a polar desert.");
  b.card("DEFINITION", "What is **albedo**?", "The proportion of incoming sunlight a surface reflects; fresh snow has a very high albedo.");
  b.card("DEFINITION", "What is a **katabatic wind**?", "Cold, dense air flowing downhill, such as off the Antarctic ice sheet towards the coast.");
  b.card("CONCEPT", "The basic Antarctic food chain", "Phytoplankton → krill → whales, seals, penguins and fish → leopard seals and killer whales.");
  b.card("VOCABULARY", "Why is krill a **keystone species**?", "So many animals depend on it for food that a fall in krill numbers affects the whole food web.");
  b.card("FACT", "Plants of Antarctica", "Mainly mosses, lichens and algae; only two flowering plants (a hair grass and a pearlwort), mostly on the Peninsula.");
  b.card("CONCEPT", "Emperor penguin adaptations", "Dense feathers and fat, breeding on sea ice in winter, eggs balanced on the feet, huddling to cut heat loss.");
});
