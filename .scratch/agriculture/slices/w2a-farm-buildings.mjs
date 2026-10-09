// Slice W2a: farm buildings and livestock housing.
import { concept, P, ZIM, round, check, table, agricultureLevels } from "../lib.mjs";

// Calc: blocks for a wall with a window.
const wallA = 6 * 2.5, winA = 1.5 * 1.0;
const blocks = Math.ceil((wallA - winA) * 12.5 - 1e-9);
check(wallA === 15 && winA === 1.5 && blocks === 169, "blocks");
// Num: birds in a house.
const birds = 8 * 5 * 10;
check(birds === 400, "birds");
// Num: cost per year of walls.
const dagga = 200 / 4, brick = 1200 / 40;
check(dagga === 50 && brick === 30, "walls");
// Num: bricks for a store wall.
const bricks = 4 * 3 * 50;
check(bricks === 600, "bricks");

// Structured 2: brick base of a layer house 6 m x 4 m, 1 m of brick, 50 bricks per m².
const layerHouse = { lengthM: 6, widthM: 4, brickM: 1, perM2: 50 };
const lhArea = 2 * (layerHouse.lengthM + layerHouse.widthM) * layerHouse.brickM;
const lhBricks = lhArea * layerHouse.perM2;
check(lhArea === 20 && lhBricks === 1000, "layer house");

// Structured: roof options for a pig house.
const ROOFS = [["Thatch", 240, 6], ["Corrugated iron (galvanised)", 840, 20], ["Corrugated iron with insulation board under it", 1260, 30]];
const R_TABLE = table(["Roof", "Cost (US\\$)", "Expected life (years)"], ROOFS.map(([n, c, y]) => [n, c.toLocaleString("en-GB"), y]));
const rPer = ROOFS.map(([, c, y]) => c / y);
check(rPer[0] === 40 && rPer[1] === 42 && rPer[2] === 42, "roofs");

concept("agri.structures.farm-buildings", { file: "structures/farm-buildings", keyPrefix: "structures.farm-buildings" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which building material is cheap and cool but has a short life and a high fire risk?",
    options: [
      ["Thatch", "Correct."],
      ["Concrete blocks", "Blocks are durable and fire-proof."],
      ["Stone", "Stone lasts a very long time and does not burn."],
      ["Corrugated iron sheets", "Iron does not burn and is hot in the sun."],
    ],
    answer: "A",
    explanation: "Grass thatch is cheap, local and cool but burns easily and must be replaced every few years.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are concrete floors used in piggeries?",
    options: [
      ["They are hard-wearing and easy to clean", "Correct: pigs root and floors must be washed."],
      ["They keep the pigs warm in winter", "Concrete is cold; bedding or heat may be needed."],
      ["They are the cheapest floor that can be laid in a pig house", "Earth floors are cheaper."],
      ["They absorb urine so the pen stays dry", "Concrete sheds urine to drains; it does not absorb it."],
    ],
    answer: "A",
    explanation: "Concrete resists rooting and can be washed and disinfected; it is sloped to a drain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Why should a poultry house have good ventilation?",
    options: [
      ["To remove heat, moisture and ammonia", "Correct."],
      ["To let any predators that get in find their way out again", "Mesh keeps predators out."],
      ["To make the birds lay at night", "Ventilation does not control laying time."],
      ["To save money on the walls", "That is not the purpose."],
    ],
    answer: "A",
    explanation: "Fresh air removes heat, moisture, dust and ammonia from droppings, keeping birds healthy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which property makes burnt bricks better than sun-dried earth bricks for walls?",
    options: [
      ["They are stronger and do not erode in the rain", "Correct: firing hardens the clay."],
      ["They are cheaper to make because no fuel is needed", "Firing uses fuel, so they cost more."],
      ["They are lighter to carry", "Burnt bricks are not lighter."],
      ["They are eaten less by livestock and termites", "Livestock do not eat bricks."],
    ],
    answer: "A",
    explanation: "Firing makes bricks hard and weather-resistant, while unfired earth weakens when wet.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "In which direction should the long axis of a long, narrow broiler house in Zimbabwe usually run?",
    options: [
      ["East to west", "Correct: the sun then shines on the short ends, not the long walls."],
      ["North to south", "The long walls would face the morning and afternoon sun."],
      ["It makes no difference", "Orientation affects heat in the house."],
      ["Towards the homestead", "Houses are placed downwind of the homestead."],
    ],
    answer: "A",
    hints: ["Where does the sun rise and set?"],
    explanation: "Running east to west keeps direct sun off the long sides, reducing heat stress.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "Many broilers in an overcrowded house develop breathing problems and grow slowly. Which change would help most?",
    options: [
      ["Reduce the number of birds and improve ventilation", "Correct: crowding raises heat, moisture and ammonia."],
      ["Close the curtains completely to keep the house warm", "This traps ammonia and moisture."],
      ["Add more birds so they keep each other warm", "Overcrowding is the problem."],
      ["Remove the footbath at the door", "The footbath helps prevent disease."],
    ],
    answer: "A",
    hints: ["Think of space per bird and fresh air."],
    explanation: "Lower stocking density and better ventilation reduce ammonia, heat and disease.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a footbath placed at the entrance of a livestock house?",
    options: [
      ["To disinfect boots and keep out disease", "Correct."],
      ["To water the animals", "Drinkers water the animals."],
      ["To cool the air inside the house in hot weather", "A footbath is too small to cool a house."],
      ["To wash the floor automatically", "It does not wash the floor."],
    ],
    answer: "A",
    hints: ["Think about biosecurity."],
    explanation: "A disinfectant footbath reduces the spread of pathogens carried on boots.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "A farmer compares two wall materials for a store: pole and dagga costing US\\$200 and lasting about 4 years, and burnt brick costing US\\$1,200 and lasting about 40 years. Which statement is correct?",
    options: [
      ["Brick costs less per year of life (US\\$30) than pole and dagga (US\\$50)", "Correct."],
      ["Pole and dagga is more cost-effective because it costs far less to build at the start", "It costs more per year of life."],
      ["Both cost the same per year of life", "US\\$50 and US\\$30 differ."],
      ["Brick costs six times as much per year", "It costs six times as much to build, not per year."],
    ],
    answer: "A",
    hints: ["Divide each cost by its life."],
    explanation: "Pole and dagga: US\\$200 ÷ 4 = US\\$50 per year. Brick: US\\$1,200 ÷ 40 = US\\$30 per year.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Corrugated iron sheets are fire-proof and termite-proof.",
    answer: true,
    explanation: "True, though they are hot in the sun, noisy in rain and rust unless galvanised or painted.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "The floor of a pig pen should slope away from the sleeping area towards a drain.",
    answer: true,
    explanation: "True. The slope carries urine and washing water away from the dry sleeping area.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each material with its main use on a farm.",
    pairs: [
      ["Cast concrete", "Floors, troughs and footbaths"],
      ["Stone", "Foundations and kraal walls"],
      ["Treated timber", "Roof trusses and rafters"],
      ["Corrugated iron", "Roofing sheets"],
      ["Thatch", "Roof of a small, cool shelter"],
    ],
    explanation: "Match properties to uses.",
  });
  b.fib({
    d: 2, applies: ZIM,
    stem: "Complete the sentence.",
    template: "Good livestock housing should have good {{blank:a}} to remove ammonia and moisture, and good {{blank:b}} so that the floor stays dry.",
    blanks: [
      { id: "a", accepted: ["ventilation", "air flow", "airflow"] },
      { id: "b", accepted: ["drainage"] },
    ],
    explanation: "Ventilation; drainage.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
    stem: "A wall is 6 m long and 2.5 m high, with a window 1.5 m wide and 1 m high. Assume 12.5 concrete blocks are needed per square metre. Calculate the number of blocks needed. Round UP to whole blocks.",
    value: blocks, unit: undefined, tol: 0, wrong: [Math.ceil(wallA * 12.5), Math.floor((wallA - winA) * 12.5)],
    hints: ["Subtract the window area from the wall area first."],
    explanation: `Wall = 6 × 2.5 = ${wallA} m²; window = 1.5 × 1 = ${winA} m²; area = ${wallA - winA} m²; blocks = ${wallA - winA} × 12.5 = ${(wallA - winA) * 12.5}, so ${blocks}. Forgetting the window gives ${Math.ceil(wallA * 12.5)}.`,
    workedSolution: `1. Wall area = 6 × 2.5 = ${wallA} m².\n2. Window area = 1.5 × 1 = ${winA} m².\n3. Area to build = ${wallA} − ${winA} = ${wallA - winA} m².\n4. Blocks = ${wallA - winA} × 12.5 = ${(wallA - winA) * 12.5}, rounded up to ${blocks}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "A broiler house measures 8 m by 5 m. Assume a stocking density of 10 broilers per square metre. How many broilers can it hold?",
    value: birds, unit: "birds", tol: 0, wrong: [8 * 5, (8 + 5) * 2 * 10],
    explanation: `Floor area = 8 × 5 = 40 m²; 40 × 10 = ${birds} birds.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "A store wall is 4 m long and 3 m high with no openings. Assume 50 bricks are needed per square metre. How many bricks are needed?",
    value: bricks, tol: 0, wrong: [4 * 3, (4 + 3) * 50],
    explanation: `Area = 4 × 3 = 12 m²; 12 × 50 = ${bricks} bricks.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the coating of zinc that protects corrugated iron sheets from rusting.",
    accepted: ["galvanising", "galvanizing", "galvanised coating", "galvanisation", "galvanization", "zinc coating"],
    keywords: { any: ["galvan"] },
    explanation: "**Galvanising**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Explain **two** requirements of a good house for rabbits or poultry.",
    hints: ["Choose two requirements and explain each benefit."],
    points: [
      "Requirement 1 stated (e.g. ventilation / drainage / space / security / hygiene / light).",
      "Benefit explained (e.g. ventilation removes ammonia and heat, reducing respiratory disease).",
      "Requirement 2 stated.",
      "Benefit explained (e.g. security mesh keeps out predators and thieves; enough space prevents stress and fighting).",
    ],
    modelAnswer: "The house needs good ventilation, which removes heat, moisture and ammonia from droppings and so reduces respiratory disease and heat stress. It must also be secure, with strong wire mesh and a lockable door, to keep out predators such as dogs and snakes and to prevent theft.",
    explanation: "Requirement plus reason, twice.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true, applies: ZIM,
    stem: `A farmer near Gweru is roofing a new pig house. He compares three roofs.\n\n${R_TABLE}`,
    hints: ["Cost per year = cost ÷ life.", "Think about heat under an iron roof."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the cost per year of life of the thatch roof.",
        value: rPer[0], prefix: "US$", wrong: [ROOFS[0][1] * ROOFS[0][2], ROOFS[0][1]],
        explanation: `US\\$240 ÷ 6 = US\\$${rPer[0]} per year.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which statement about the two iron roofs is correct?",
        options: [
          ["They cost the same per year of life, US\\$42", "Correct: 840 ÷ 20 = 1,260 ÷ 30 = 42."],
          ["The insulated roof costs much more per year of life", "Both are US\\$42 per year."],
          ["The plain iron roof costs less per year than the thatch", "Thatch is US\\$40 per year, slightly less."],
          ["The insulated roof is cheaper to build", "It costs US\\$1,260, the most."],
        ],
        answer: "A",
        explanation: "Plain iron: US\\$840 ÷ 20 = US\\$42; insulated iron: US\\$1,260 ÷ 30 = US\\$42.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the farmer might choose the insulated iron roof although it costs the most to build.",
        points: ["Insulation keeps the house cooler, reducing heat stress in pigs (which cannot sweat much).", "It lasts longest, is fire-proof and needs less maintenance, at the same cost per year as plain iron."],
        explanation: "Comfort plus durability.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe **three** other features the pig house should have.",
        points: ["Concrete floor sloping to a drain (easy cleaning, dry floor).", "Separate dry sleeping area and dunging area / guard rails in farrowing pens.", "Good ventilation with roof overhangs / feed trough and drinker / strong walls and gates / footbath."],
        explanation: "Housing features.",
      }),
    ],
    explanation: "Compare materials by cost per year of life, then add the animal's needs.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6, applies: ZIM,
    stem: "A youth group near Masvingo has little cash but plenty of labour, and wants to build a house for 300 layers. Discuss the choice of building materials for the walls and roof.",
    hints: ["Weigh cost, durability, heat, fire and security.", "End with a reasoned recommendation."],
    points: [
      "Earth/pole and dagga or sun-dried bricks are cheap and use their labour, with good insulation, but erode, attract termites and need maintenance.",
      "Burnt bricks or blocks are durable, fire- and termite-proof but cost more (cement, fuel).",
      "Thatch is cheap and cool but a fire risk with a short life; iron is durable and fire-proof but hot unless insulated or high-pitched with overhangs.",
      "Layer houses need ventilation: low walls with wire mesh above suit both cheap and costly materials.",
      "Security against predators and theft (strong mesh, doors) is essential whichever materials are used.",
      "Judgement: e.g. low burnt-brick walls made by the group, mesh above, iron roof with good ventilation, or cheaper local materials if cash is very short, upgraded later.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "With little cash but much labour, the group could make sun-dried bricks or pole-and-dagga walls cheaply, and these keep the house cool, but they erode in rain, attract termites and need constant repair. Burnt bricks made by the group, or concrete blocks, last much longer and resist fire and termites, though firing needs fuel and cement must be bought. For the roof, thatch is cheap and cool but burns easily and lasts only a few years, while galvanised iron is durable and fire-proof but hot unless it has overhangs, good height and ventilation. Since layers need fresh air, only low walls are required, with wire mesh above, which cuts the cost of any material. I would recommend low burnt-brick walls made by the group, strong mesh and a galvanised iron roof with ventilation, because the lower cost per year of life and fewer losses to fire, predators and heat outweigh the higher starting cost; if money is very short, cheaper local materials can be used first and replaced later.",
    explanation: "Balance cost, durability and the birds' needs.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, applies: ZIM,
    stem: "Sipho is building a layer house 6 m long and 4 m wide near Bulawayo. The walls will be 2 m high, but only the lowest 1 m will be burnt brick; above that the sides will be wire mesh with curtains. Assume 50 bricks are needed per square metre of brick wall and ignore the door.",
    hints: ["Brick wall area = perimeter × brick height."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the area of brick wall, in m².",
        value: lhArea, unit: "m²", tol: 0, wrong: [lhArea * 2, layerHouse.lengthM * layerHouse.widthM],
        explanation: "Perimeter = 2 × (6 + 4) = 20 m; brick height 1 m; area = 20 m².",
      }),
      P.num({
        label: "(b)", stem: "Calculate the number of bricks needed.",
        value: lhBricks, tol: 0, wrong: [lhBricks * 2, layerHouse.lengthM * layerHouse.widthM * layerHouse.perM2],
        explanation: "20 × 50 = 1,000 bricks. Using the full 2 m wall height gives 2,000.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the upper part of the walls is wire mesh with curtains.",
        points: ["Mesh allows good ventilation, removing heat, moisture and ammonia while keeping predators out.", "Curtains can be closed on cold or windy nights/days to prevent draughts and chilling."],
        explanation: "Ventilation with control.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe **two** features that would make the house easy to keep clean and free of disease.",
        points: ["Smooth concrete floor sloping to a drain, easy to wash and disinfect between flocks.", "Footbath at the entrance / removable feeders and drinkers / deep litter that is replaced between flocks."],
        explanation: "Hygiene features.",
      }),
    ],
    explanation: "Calculate quantities from dimensions, then explain how the design meets the birds' needs.",
  });

  b.card("FACT", "Properties of concrete blocks", "Strong, durable, fire- and termite-proof; cement costly; heavy.");
  b.card("FACT", "Properties of thatch", "Cheap, local, cool; burns easily, short life, harbours pests.");
  b.card("FACT", "Properties of corrugated iron", "Strong, quick to erect, fire- and termite-proof; hot, noisy, rusts unless galvanised.");
  b.card("FACT", "Properties of earth (pole and dagga, sun-dried bricks)", "Very cheap, local, good insulation; weak, erodes in rain, termites, needs maintenance.");
  b.card("CONCEPT", "Requirements of livestock housing", "Ventilation, drainage, space, light, hygiene, security, protection from weather, convenient site.", undefined, { applies: ZIM });
  b.card("FACT", "Orientation of a long poultry house in Zimbabwe", "Long axis east to west, so the sun falls on the short ends.", undefined, { applies: ZIM });
  b.card("FORMULA", "Blocks for a wall", "Blocks = (wall area − door and window areas) × blocks per m², rounded UP.", undefined, { applies: ZIM });
  b.card("FORMULA", "Cost effectiveness", "Cost per year of life = cost ÷ expected life (years).", undefined, { applies: ZIM });
  b.card("CONCEPT", "What a building plan shows", "Dimensions, walls, doors and windows, pens and divisions, feeders and drinkers, drains, north arrow.", undefined, { applies: ZIM });
});
