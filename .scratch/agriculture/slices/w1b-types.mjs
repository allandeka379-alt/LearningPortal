// Slice W1b: soil types (sandy, loam, clay).
import { concept, P, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Funnel experiment for the numerical items (mL).
const POURED = 250;
const COLLECTED = { X: 185, Y: 140, Z: 90 };
const retained = Object.fromEntries(Object.entries(COLLECTED).map(([k, v]) => [k, POURED - v]));
const retZpct = pct(retained.Z, POURED);
check(retained.Z === 160 && retZpct === 64, "Z retained");
const FUNNEL_TABLE = table(["Soil", "Water poured (mL)", "Water collected after 20 min (mL)"], Object.entries(COLLECTED).map(([k, v]) => [k, POURED, v]));

// Capillary rise (cm) after a time series.
const CAP = [
  ["10 minutes", 6, 4, 2],
  ["1 hour", 11, 10, 6],
  ["1 day", 16, 24, 31],
];
const CAP_TABLE = table(["Time", "Soil A (cm)", "Soil B (cm)", "Soil C (cm)"], CAP);
const riseC = CAP[2][3] - CAP[1][3];
check(riseC === 25, "rise C");

// Daily single funnel item.
const D = { poured: 150, collected: 96 };
const dRet = D.poured - D.collected;

concept("agri.soil.types", { file: "soil/types", keyPrefix: "soil.types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which soil type drains fastest after heavy rain?",
    options: [
      ["Sandy soil", "Correct: large pores let water drain quickly."],
      ["Clay soil", "Clay has tiny pores and drains slowly."],
      ["Loam soil", "Loam drains well, but more slowly than sand."],
      ["Silty clay soil", "Fine particles make it drain slowly."],
    ],
    answer: "A",
    explanation: "Sand particles are large, so the pores between them are large and water drains through fast.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do clay soils hold more plant nutrients than sandy soils?",
    options: [
      ["Clay particles have a very large surface area that holds nutrients", "Correct: nutrients are held on the surfaces of the tiny clay particles."],
      ["Clay particles are larger, so they contain more minerals", "Clay particles are the smallest soil particles."],
      ["Clay soils drain fast, so fertiliser reaches the roots very quickly after rain", "Clay drains slowly; fast drainage causes leaching."],
      ["Clay soils are warmer, so nutrients dissolve faster", "Clay soils warm slowly."],
    ],
    answer: "A",
    explanation: "Many tiny clay particles give a huge total surface area that holds nutrient ions against leaching. Sandy soils have a small surface area, so nutrients leach easily.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Farmers call clay soils \"heavy\" because they",
    options: [
      ["need much effort to cultivate: sticky when wet and hard when dry", "Correct: 'heavy' refers to how hard they are to work."],
      ["weigh more per bucket than any other soil when dry", "The term is about workability, not mass."],
      ["contain heavy gravel and stones", "Clay soils have the finest particles."],
      ["sink below sandy soils in the soil profile", "Soil types do not sink below one another."],
    ],
    answer: "A",
    explanation: "Heavy and light describe workability: clay is sticky when wet and hard when dry; sand is easy to work.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which soil warms up most quickly at the start of the rainy season?",
    options: [
      ["Sandy soil", "Correct: it holds little water and has large air spaces, so it heats quickly."],
      ["Clay soil", "Clay holds much water, which needs a lot of heat to warm."],
      ["Waterlogged loam", "Waterlogged soil warms slowly."],
      ["Silty clay soil", "Fine, water-holding soils warm slowly."],
    ],
    answer: "A",
    explanation: "Water needs a lot of energy to warm up. Sandy soils hold little water, so they warm quickly; wet clay soils warm slowly.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a capillary experiment, water eventually rises highest in a clay soil. What is the best explanation?",
    options: [
      ["The pores between clay particles are very narrow, so they act as fine capillary tubes", "Correct: the narrower the pore, the higher water rises by capillarity."],
      ["Clay particles are larger than sand grains, so each one lifts more water upwards", "Clay particles are the smallest particles."],
      ["Clay contains more air, which pushes water upwards", "Air does not drive capillary rise."],
      ["Clay drains fastest of all soils, so water moves through it quickly in every direction", "Clay drains slowly; capillary rise in clay is slow but high."],
    ],
    answer: "A",
    hints: ["Think about water rising in a very thin glass tube."],
    explanation: "Capillary rise is greatest in the narrowest pores. Clay's tiny pores lift water highest, though slowly; sand's large pores give a fast but low rise.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Sipho wants to improve the water-holding capacity of the sandy soil in his vegetable garden. Which action would help most?",
    options: [
      ["Digging in well-rotted manure or compost every season", "Correct: humus holds water and binds sand into crumbs."],
      ["Ploughing the garden more often to loosen the sand", "More tillage oxidises organic matter and does not hold water."],
      ["Adding more sand from a riverbed to the beds", "More sand makes drainage even faster."],
      ["Burning grass on the beds before planting", "Burning destroys organic matter."],
    ],
    answer: "A",
    hints: ["Which soil component absorbs water like a sponge?"],
    explanation: "Organic matter (humus) holds several times its own mass of water and improves crumb structure. Mulch and anthill soil also help.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A clay field near Gweru is acid, waterlogged after storms and forms large clods when ploughed. Which plan would best improve it?",
    options: [
      ["Apply lime, add manure, plant on ridges and plough only when moist", "Correct: lime and humus improve structure, ridges improve drainage and timing avoids clods."],
      ["Add sand, burn the residues and plough when the soil is wet", "Burning removes organic matter and ploughing wet soil smears it."],
      ["Irrigate heavily, then plough deeper every year, always at the same depth", "More water worsens waterlogging; same-depth ploughing forms pans."],
      ["Apply only nitrogen fertiliser and leave the field bare", "Fertiliser alone does not improve structure or drainage."],
    ],
    answer: "A",
    hints: ["Address acidity, structure, drainage and the timing of tillage."],
    explanation: "Calcium from lime flocculates clay and corrects acidity; organic matter opens the soil into crumbs; ridges or drains remove excess water; working at the right moisture avoids clods.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Loam is usually the best soil for most crops because it combines good drainage with good water-holding and fertility.",
    answer: true,
    explanation: "True. Loam has a balanced mixture of sand, silt and clay with humus, giving a mix of large and small pores.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Because clay soils hold the most water, all of that water is available to crops.",
    answer: false,
    hints: ["Think about how tightly tiny pores hold water."],
    explanation: "False. Some water in clay is held so tightly in tiny pores and on particle surfaces that roots cannot take it up. Available water is often greatest in loams.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each property with the soil type it best describes.",
    pairs: ["Leaches nutrients easily", "Cracks when it dries out", "Balanced mixture with humus; easy to work and fertile", "Waterlogs after heavy rain"],
    right: ["Sandy soil", "Clay soil", "Loam soil"],
    rightIndex: [0, 1, 2, 1],
    explanation: "Sandy soils leach; clay soils crack when dry and waterlog when wet; loams are balanced and fertile.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Sandy soils have {{blank:a}} pores and {{blank:b}} water-holding capacity. Clay soils warm up {{blank:c}} in spring.",
    blanks: [
      { id: "a", accepted: ["large"], choices: ["large", "tiny"] },
      { id: "b", accepted: ["low"], choices: ["low", "high"] },
      { id: "c", accepted: ["slowly"], choices: ["quickly", "slowly"] },
    ],
    explanation: "Sand: large pores, low water holding. Clay: holds much water, so it warms slowly.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Tatenda pours ${D.poured} mL of water onto a dry soil in a funnel. After 30 minutes ${D.collected} mL has drained into the cylinder. How much water, in mL, did the soil retain?`,
    value: dRet, unit: "mL", wrong: [D.collected, D.poured + D.collected],
    explanation: `Water retained = water poured − water collected = ${D.poured} − ${D.collected} = ${dRet} mL. ${D.collected} mL is the water that drained, not the water held.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the soil type that is a balanced mixture of sand, silt and clay with a good humus content.",
    accepted: ["loam", "loam soil", "loamy soil", "a loam"],
    explanation: "A **loam** combines the good properties of sand and clay.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name a material that is rich in clay and is often mixed into sandy garden soil in Zimbabwe to improve its water-holding.",
    accepted: ["anthill soil", "ant hill soil", "termite mound soil", "termitaria soil", "anthill", "termite mound", "termitaria"],
    keywords: { any: ["anthill", "ant hill", "termite"] },
    explanation: "**Anthill (termite-mound) soil** is finer and richer in clay than the surrounding sand.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare sandy and clay soils in terms of drainage and aeration. Explain each difference.",
    hints: ["Use 'whereas' to make matched comparisons.", "Link each property to pore size."],
    points: [
      "Sandy soil drains quickly whereas clay soil drains slowly.",
      "Because sand has large pores, clay tiny pores that hold water.",
      "Sandy soil is well aerated whereas clay soil is poorly aerated when wet.",
      "Because clay's tiny pores stay full of water, leaving little room for air.",
    ],
    modelAnswer: "Sandy soil drains quickly whereas clay drains slowly, because sand has large pores and clay has tiny pores that hold water. Sandy soil is well aerated whereas clay is poorly aerated when wet, because its small pores stay filled with water.",
    explanation: "Compare with matched statements and explain using particle and pore size.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Three soils, X, Y and Z, were tested. Equal masses of each dry soil were placed in funnels, and ${POURED} mL of water was poured onto each at the same time.\n\n${FUNNEL_TABLE}`,
    hints: ["Retained = poured − collected.", "The soil that collects least water holds most."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the volume of water retained by soil Z, in mL.",
        value: retained.Z, unit: "mL", wrong: [COLLECTED.Z],
        explanation: `${POURED} − ${COLLECTED.Z} = ${retained.Z} mL.`,
      }),
      P.num({
        label: "(b)", stem: "Express the water retained by soil Z as a percentage of the water poured.",
        value: retZpct, unit: "%", wrong: [round(pct(COLLECTED.Z, POURED), 1)],
        explanation: `${retained.Z} ÷ ${POURED} × 100 = ${retZpct}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which soil is most likely to be the sandy soil?",
        options: [
          ["X", "Correct: most water drained through it in 20 minutes."],
          ["Y", "Y retained more than X, so it has finer particles."],
          ["Z", "Z retained the most water: it is the most clayey."],
          ["Y and Z equally", "They gave very different results."],
        ],
        answer: "A",
        explanation: "The sandy soil has the largest pores, so the most water drains through it.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State **two** variables, other than those in the stem, that should be kept the same to make the test fair.",
        points: ["Same size of funnel / same amount of cotton wool in each.", "Same time allowed for drainage / same dryness of soil at the start / soil not compacted differently."],
        explanation: "Only the soil type should change.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest which soil would need irrigation most often in a dry spell, and explain why.",
        points: ["Soil X (the sandy soil).", "It retains the least water, so the crop uses up the stored water soonest."],
        explanation: "Low water-holding capacity means short intervals between irrigations.",
      }),
    ],
    explanation: "A drainage test compares water-holding: retained = poured − collected, and the least-draining soil has the finest particles.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: `Glass tubes filled with three soils, A, B and C, were stood in a tray of water. The height of wet soil was measured.\n\n${CAP_TABLE}`,
    hints: ["Which soil started fastest and which went highest?"],
    parts: [
      P.num({
        label: "(a)", stem: "By how many cm did the water in soil C rise between 1 hour and 1 day?",
        value: riseC, unit: "cm", wrong: [CAP[2][3]],
        explanation: `${CAP[2][3]} − ${CAP[1][3]} = ${riseC} cm.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which soil is most likely to be the clay soil?",
        options: [
          ["Soil C", "Correct: slow at first but the highest rise, typical of tiny pores."],
          ["Soil A", "A rose fastest at first but least overall: sand."],
          ["Soil B", "B is intermediate: probably loam."],
          ["None, because clay does not allow capillary rise", "Clay gives the highest capillary rise."],
        ],
        answer: "A",
        explanation: "Clay pores are narrowest, giving the highest but slowest capillary rise.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain the results for soil A, and suggest why this soil type dries out quickly at the surface in the dry season.",
        points: [
          "Soil A (sand) has large pores, so water rises quickly at first.",
          "But large pores cannot hold water high against gravity, so the final rise is low.",
          "Little water moves up from deeper layers to replace water evaporated at the surface.",
          "And sand holds little water anyway, so the surface dries quickly.",
        ],
        explanation: "Large pores: fast, low capillary rise and little resupply to the surface.",
      }),
    ],
    explanation: "Narrow pores give high capillary rise; wide pores give a fast but low rise.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A school has a choice of two sites for a vegetable garden: a sandy site close to a borehole, or a clay site 400 m from the nearest water. Discuss which site is better.",
    hints: ["Weigh the soil properties against the practical problem of water supply.", "Say how each site's weaknesses could be reduced."],
    points: [
      "Sandy site: easy to work, warms quickly, good drainage and aeration for vegetables.",
      "But low water and nutrient holding: needs frequent watering and regular manure/fertiliser.",
      "Water is close, so frequent watering is practical; manure and mulch can improve the sand.",
      "Clay site: holds water and nutrients well.",
      "But heavy to work, may waterlog, and carrying water 400 m is difficult in the dry season.",
      "Judgement with reason, e.g. the sandy site is better because its weaknesses can be managed and water is available.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "The sandy site is easy to dig and warms quickly, and its good drainage suits vegetables, but it holds little water and few nutrients, so it needs watering often and regular manure. Because the borehole is close, frequent watering is practical, and manure, compost and mulch would steadily improve the soil. The clay site holds water and nutrients well, but it is heavy to dig, may become waterlogged in the rains, and in the dry season the pupils would have to carry water 400 m. On balance the sandy site is better: its weaknesses can be managed, while the clay site's lack of water cannot.",
    explanation: "Good answers weigh soil properties against practical factors and reach a justified decision.",
  });

  b.card("CONCEPT", "Sandy soil properties", "Large pores, fast drainage, good aeration, low water and nutrient holding, easy to work, warms quickly.");
  b.card("CONCEPT", "Clay soil properties", "Tiny pores, slow drainage, poor aeration when wet, high water and nutrient holding, heavy to work, warms slowly, cracks when dry.");
  b.card("DEFINITION", "Loam", "A soil with a balanced mixture of sand, silt and clay and good humus; the best all-round soil for crops.");
  b.card("DEFINITION", "Water-holding capacity", "The amount of water a soil holds against gravity after excess water has drained.");
  b.card("FORMULA", "Water retained in a funnel test", "Water retained = water poured − water collected.");
  b.card("FACT", "In which soil does water rise highest by capillarity?", "Clay (narrowest pores), although slowly; sand gives a fast but low rise.");
  b.card("CONCEPT", "Improving a sandy soil", "Add manure or compost, mulch, mix in anthill soil, grow green manure, apply fertiliser in split doses.");
  b.card("CONCEPT", "Improving a clay soil", "Add organic matter, lime acid clay, improve drainage (ridges, drains), cultivate only at the right moisture.");
  b.card("FACT", "Why sandy soils warm quickly", "They hold little water, and water needs a lot of heat to warm up.");
});
