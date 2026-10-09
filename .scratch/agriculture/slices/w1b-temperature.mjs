// Slice W1b: soil temperature.
import { concept, P, mean, round, check, table, agricultureLevels } from "../lib.mjs";

const range = (a) => Math.max(...a) - Math.min(...a);

// Daily readings (10 cm depth) under a ridge-top bed with and without a grass shade.
const TIMES = ["07:00", "11:00", "15:00", "19:00"];
const OPEN = [16, 26, 39, 23];
const SHADE = [17, 23, 30, 22];
const T_TABLE = table(["Time", ...TIMES], [["Unshaded bed (°C)", ...OPEN], ["Shaded bed (°C)", ...SHADE]]);
const rOpen = range(OPEN);
const rShade = range(SHADE);
check(rOpen === 23 && rShade === 13, "ranges");
const meanOpen = mean(OPEN);

// Germination trial: days to 50% emergence at soil temperatures.
const GERM = [[14, 15], [20, 9], [26, 6], [32, 4], [38, 7]];
const G_TABLE = table(["Soil temperature (°C)", "Days to 50% emergence"], GERM);

// Daily item: one-line range.
const DAY = { max: 34, min: 13 };

concept("agri.soil.temperature", { file: "soil/temperature", keyPrefix: "soil.temperature" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which instrument is used to measure the temperature of the soil at a given depth?",
    options: [
      ["Soil thermometer", "Correct: its bulb is placed at the required depth."],
      ["Rain gauge", "A rain gauge measures rainfall."],
      ["Hygrometer", "A hygrometer measures air humidity."],
      ["Wind vane", "A wind vane shows wind direction."],
    ],
    answer: "A",
    explanation: "A soil thermometer has a long stem so its bulb can be set at, for example, 5, 10 or 20 cm depth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do seeds of maize germinate slowly in a cold soil?",
    options: [
      ["Enzymes in the seed work slowly at low temperatures", "Correct: germination depends on enzyme-controlled reactions."],
      ["Cold soil contains no water for the seed", "Cold soil can be moist; the problem is the slow reactions."],
      ["Cold soil has no oxygen", "Oxygen is present unless the soil is waterlogged."],
      ["Frost always kills maize seeds in the soil", "Seeds survive cool soil; they simply germinate slowly."],
    ],
    answer: "A",
    explanation: "Germination involves enzymes that break down food stores; they work slowly below the optimum temperature, so emergence is delayed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which soil will warm up most quickly on a sunny morning?",
    options: [
      ["A dark, dry, bare soil", "Correct: dark colour absorbs heat; little water and no cover let it warm fast."],
      ["A pale, wet soil under a grass mulch", "Water, pale colour and mulch all slow warming."],
      ["A wet clay soil under crop residues", "Wet clay and cover warm slowly."],
      ["A waterlogged soil in a shaded vlei", "Water and shade keep the soil cool."],
    ],
    answer: "A",
    explanation: "Dark colour, dryness and bare ground all make a soil warm faster.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Zimbabwe, which slope usually has the warmest soil in winter?",
    options: [
      ["A north-facing slope", "Correct: in the southern hemisphere the sun is to the north, so north-facing slopes receive more direct sunlight."],
      ["A south-facing slope", "South-facing slopes face away from the sun and are cooler."],
      ["The valley floor", "Cold air drains downhill and settles in valleys (frost pockets)."],
      ["All slopes are the same", "Aspect changes how much sun the soil receives."],
    ],
    answer: "A",
    explanation: "Aspect matters: in the southern hemisphere north-facing slopes are warmer.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A grass mulch is spread on a seedbed in October. What is its main effect on soil temperature?",
    options: [
      ["It keeps the soil cooler by day and warmer at night", "Correct: the mulch reduces extremes by shading and insulating."],
      ["It makes the soil hotter at all times", "Grass mulch shades the soil, so daytime temperature falls."],
      ["It makes the soil colder at all times", "At night it reduces heat loss, keeping the soil warmer."],
      ["It has no effect on soil temperature at all, only on soil water", "It affects both temperature and water loss."],
    ],
    answer: "A",
    hints: ["Think about what the mulch does in the heat of the day and on a clear night."],
    explanation: "An organic mulch shades the surface and insulates it, reducing both the daytime maximum and the night-time fall.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does frost damage tender crops such as tomatoes more often in low-lying parts of a farm?",
    options: [
      ["Cold, dense air drains downhill and collects there on still nights", "Correct: these areas are frost pockets."],
      ["Low-lying areas receive more hot sunshine during the day than the slopes", "Sunshine by day does not cause frost."],
      ["The soils there are always sandier and lose heat", "Low-lying soils are often wetter and heavier."],
      ["Wind is stronger in valleys and freezes the plants", "Frost forms on still, clear nights."],
    ],
    answer: "A",
    hints: ["Cold air is heavier than warm air."],
    explanation: "On clear, still nights cold air flows downhill and settles in hollows, making them frost pockets.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Soil organisms in a field are found to decompose crop residues much more slowly in June than in November, although the soil is kept moist. What is the best explanation?",
    options: [
      ["Low soil temperature slows the activity of the decomposing organisms", "Correct: microbial activity rises with temperature up to an optimum."],
      ["There is less oxygen in the soil in June", "Moist, not waterlogged, soil has oxygen in both months."],
      ["The residues contain more nitrogen in June", "Residue nitrogen does not change with the month."],
      ["Earthworms only live in the topsoil during the warm, wet rainy season months", "Earthworms go deeper in dry soil, but moisture is kept the same here."],
    ],
    answer: "A",
    hints: ["Moisture is controlled; what else differs between June and November?"],
    explanation: "With moisture the same, the difference is temperature: cold June soils slow the bacteria and fungi that decompose residues and release nutrients.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Wet soils warm up more slowly than dry soils.",
    answer: true,
    explanation: "True. Water needs a lot of heat to warm up, and evaporation from wet soil cools the surface.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Watering a garden in the afternoon before a frosty night increases frost damage.",
    answer: false,
    explanation: "False. Moist soil stores more heat and releases it during the night, which reduces frost damage.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with how it modifies soil temperature.",
    pairs: [
      ["Grass mulch", "Insulates the surface, reducing both maximum and minimum extremes"],
      ["Shade over a nursery bed", "Blocks direct sunlight from scorching seedlings"],
      ["Ridging", "Exposes more surface to the sun and drains water, so soil warms faster"],
      ["Afternoon watering", "Moist soil stores heat and releases it on a cold night"],
    ],
    explanation: "Each method changes how much heat reaches or leaves the soil.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Dark soils absorb {{blank:a}} heat than pale soils. Sandy soils warm {{blank:b}} than clay soils. Cold soil {{blank:c}} the activity of nitrifying bacteria.",
    blanks: [
      { id: "a", accepted: ["more"], choices: ["more", "less"] },
      { id: "b", accepted: ["faster"], choices: ["faster", "slower"] },
      { id: "c", accepted: ["slows"], choices: ["slows", "speeds up"] },
    ],
    explanation: "Dark colour absorbs more energy; sand holds less water so warms faster; cold slows microbial processes.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `On a day in September the soil temperature at 5 cm depth ranged from a minimum of ${DAY.min} °C to a maximum of ${DAY.max} °C. Calculate the daily range of soil temperature, in °C.`,
    value: DAY.max - DAY.min, unit: "°C", wrong: [DAY.max + DAY.min, (DAY.max + DAY.min) / 2],
    explanation: `Range = maximum − minimum = ${DAY.max} − ${DAY.min} = ${DAY.max - DAY.min} °C. Adding or averaging gives a different quantity.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the low-lying part of a farm where cold air collects and frost is most likely.",
    accepted: ["frost pocket", "frost hollow", "frost pockets"],
    keywords: { any: ["frost pocket", "frost hollow"] },
    explanation: "A **frost pocket** (frost hollow) is a low area where cold air settles.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which a very hot, bare soil surface harms young seedlings.",
    hints: ["Think about the stem at soil level and about soil water."],
    points: [
      "The hot surface scorches / damages the stem where it touches the soil.",
      "So the seedling collapses or dies.",
      "The hot surface dries out quickly / water evaporates fast.",
      "So germinating seeds and shallow roots die of drought (or: high temperatures damage roots and kill soil organisms near the surface).",
    ],
    modelAnswer: "The very hot surface scorches the young stem where it meets the soil, so the seedling falls over and dies. The heat also dries out the top layer quickly, so shallow roots and germinating seeds run out of water.",
    explanation: "Excessive heat damages tissue and increases evaporation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Tatenda measured soil temperature at 10 cm depth in two tomato nursery beds near Mutare on a hot day. One bed was covered by a grass shade.\n\n${T_TABLE}`,
    hints: ["Range = maximum − minimum.", "Compare the two beds at the hottest and the coolest times."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the daily range of temperature in the unshaded bed, in °C.",
        value: rOpen, unit: "°C", wrong: [Math.max(...OPEN)],
        explanation: `${Math.max(...OPEN)} − ${Math.min(...OPEN)} = ${rOpen} °C.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the mean of the four readings in the unshaded bed, in °C, to one decimal place.",
        value: meanOpen, unit: "°C", tol: 0.05, wrong: [round(rOpen / 2, 1)],
        explanation: `(${OPEN.join(" + ")}) ÷ 4 = ${OPEN.reduce((s, v) => s + v, 0)} ÷ 4 = ${round(meanOpen, 1)} °C.`,
      }),
      P.num({
        label: "(c)", stem: "By how many °C was the shaded bed cooler than the unshaded bed at 15:00?",
        value: OPEN[2] - SHADE[2], unit: "°C", wrong: [rOpen - rShade],
        explanation: `${OPEN[2]} − ${SHADE[2]} = ${OPEN[2] - SHADE[2]} °C.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe how the shade changed the soil temperature over the day.",
        points: ["It lowered the maximum (cooler in the afternoon).", "It raised the minimum slightly (warmer at 07:00) / reduced the daily range from 23 °C to 13 °C."],
        explanation: "Quote figures: the shade reduced the extremes.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why the shaded bed is better for tomato seedlings.",
        points: [
          "Lower afternoon temperature prevents scorching of the young stems at soil level.",
          "Less evaporation, so the bed stays moist for the seedlings.",
          "Temperatures closer to the optimum for root growth (and soil organisms).",
        ],
        explanation: "Reduced extremes protect seedlings and save water.",
      }),
    ],
    explanation: "Calculate ranges and differences from the table, then link the reduced extremes to seedling survival.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: `Seeds of a warm-season crop were sown in trays kept at different soil temperatures.\n\n${G_TABLE}`,
    hints: ["Find the temperature with the fewest days to emergence.", "Enzymes work best at an optimum."],
    parts: [
      P.num({
        label: "(a)", stem: "State the soil temperature, in °C, at which emergence was fastest.",
        value: 32, unit: "°C", wrong: [38],
        explanation: "4 days at 32 °C is the shortest time.",
      }),
      P.num({
        label: "(b)", stem: "How many days longer did emergence take at 14 °C than at 26 °C?",
        value: GERM[0][1] - GERM[2][1], unit: "days", wrong: [GERM[0][1]],
        explanation: `${GERM[0][1]} − ${GERM[2][1]} = ${GERM[0][1] - GERM[2][1]} days.`,
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain the results between 14 °C and 32 °C, and suggest why emergence was slower at 38 °C.",
        points: [
          "As temperature rose to 32 °C, emergence became faster (15 days to 4 days).",
          "Because enzymes that break down food stores in the seed work faster as temperature rises.",
          "At 38 °C the temperature is above the optimum.",
          "So enzymes / the embryo are damaged or the soil dries quickly, slowing emergence.",
        ],
        explanation: "Germination has an optimum temperature: faster up to it, slower beyond it.",
      }),
    ],
    explanation: "Germination rate rises with temperature to an optimum and then falls.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer near Bulawayo wants to grow tomatoes through the winter in a low-lying garden. Discuss how she could reduce the risk of frost damage, and whether the site is a good choice.",
    hints: ["Explain why the site is risky, then give methods with reasons.", "Finish with a judgement about the site."],
    points: [
      "Low-lying land is a frost pocket because cold air drains downhill and collects there.",
      "Watering in the afternoon: moist soil stores heat and releases it at night.",
      "Covering plants at night (grass, cloth) traps heat near the ground.",
      "Mulching the soil reduces heat loss at night.",
      "Windbreaks or planting on a north-facing slope give warmer conditions / timing planting to avoid the coldest weeks.",
      "Judgement: the low-lying site is a poor choice for a tender crop in winter; a higher, north-facing site is better if water can reach it.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "A low-lying garden is risky because on clear, still winter nights cold, dense air drains downhill and collects there, so frost is more likely than on the slopes. She could water the beds in the afternoon so the moist soil stores heat and releases it at night, cover the plants at night with grass or cloth, and keep a mulch on the soil to slow heat loss. She could also time planting so that young plants avoid the coldest weeks. However, these measures only reduce the risk. A better choice would be higher ground, ideally a north-facing slope that receives more sun, provided water can be brought to it.",
    explanation: "Explain the frost-pocket risk, give methods with reasons and judge the site.",
  });

  b.card("CONCEPT", "Effect of soil temperature on germination", "Enzymes work fastest at an optimum temperature; cold soil delays germination, very hot soil damages the embryo.");
  b.card("CONCEPT", "Effect of soil temperature on soil organisms", "Decomposition and nitrification speed up in warm, moist soil and nearly stop in cold soil.");
  b.card("FACT", "Which slopes are warmer in Zimbabwe?", "North-facing slopes (southern hemisphere).");
  b.card("DEFINITION", "Frost pocket", "A low-lying area where cold, dense air collects on still nights, so frost is likely.");
  b.card("CONCEPT", "Effect of an organic mulch on soil temperature", "Cooler by day, warmer at night: it reduces the extremes.");
  b.card("FACT", "Ways of modifying soil temperature", "Mulching, shading, watering, ridging, choosing planting time and site.");
  b.card("CONCEPT", "Why wet soils warm slowly", "Water needs much heat to warm, and evaporation cools the surface.");
  b.card("FORMULA", "Daily range of soil temperature", "Maximum temperature − minimum temperature.");
  b.card("FACT", "Crops at risk of frost", "Tender crops such as tomatoes, potatoes, beans, pumpkins and bananas.");
});
