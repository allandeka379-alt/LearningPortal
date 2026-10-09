// Slice W1b: soil texture and soil structure.
import { concept, P, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Jar test (heights in cm) for the numerical items.
const JAR = { sand: 2.8, silt: 2.0, clay: 1.2 };
const jarTotal = JAR.sand + JAR.silt + JAR.clay;
const jarClay = pct(JAR.clay, jarTotal);
const jarSand = pct(JAR.sand, jarTotal);
check(Math.abs(jarTotal - 6) < 1e-9, "jar total");

// Sieving 250 g.
const SIEVE = { gravel: 20, coarse: 85, fine: 55 };
const sieveMass = 250;
const passed = sieveMass - SIEVE.gravel - SIEVE.coarse - SIEVE.fine;
const passedPct = pct(passed, sieveMass);
check(passed === 90 && passedPct === 36, "sieve");

// Structured: three school soils (jar test layers, cm).
const SOILS = [
  ["P", 5.4, 1.8, 1.8],
  ["Q", 1.8, 2.4, 4.8],
  ["R", 3.6, 3.6, 1.8],
];
const rows = SOILS.map(([n, s, si, c]) => [n, s.toFixed(1), si.toFixed(1), c.toFixed(1)]);
const SOIL_TABLE = table(["Soil", "Sand layer (cm)", "Silt layer (cm)", "Clay layer (cm)"], rows);
const qTotal = SOILS[1][1] + SOILS[1][2] + SOILS[1][3];
const qClay = pct(SOILS[1][3], qTotal);
check(Math.abs(qClay - 53.333333) < 1e-4, "Q clay");
const pTotal = SOILS[0][1] + SOILS[0][2] + SOILS[0][3];
const pSand = pct(SOILS[0][1], pTotal);
check(Math.abs(pSand - 60) < 1e-9, "P sand");

concept("agri.soil.texture-structure", { file: "soil/texture-structure", keyPrefix: "soil.texture-structure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which list gives soil particles in order from the **largest** to the **smallest**?",
    options: [
      ["gravel, sand, silt, clay", "Correct: gravel is over 2 mm and clay under 0.002 mm."],
      ["gravel, silt, sand, clay", "Silt is finer than sand, so sand comes before silt."],
      ["sand, gravel, clay, silt", "Gravel is the largest and clay the smallest."],
      ["clay, silt, sand, gravel", "This is the order from smallest to largest."],
    ],
    answer: "A",
    explanation: "Gravel (over 2 mm) > sand > silt > clay (under 0.002 mm).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **soil texture**?",
    options: [
      ["The relative proportions of sand, silt and clay in a soil", "Correct: texture is the particle-size mixture."],
      ["The way that soil particles are grouped together into aggregates", "That is soil structure."],
      ["The amount of humus and living organisms in a soil", "That is the organic fraction, not texture."],
      ["The depth of the topsoil above the subsoil", "Depth is a feature of the soil profile."],
    ],
    answer: "A",
    explanation: "Texture = proportions of sand, silt and clay. Structure = arrangement of particles into aggregates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A moist soil sample feels sticky, stains the fingers and can be rolled into a long, thin thread. Which particle is most abundant in it?",
    options: [
      ["Clay", "Correct: clay is sticky and plastic when moist."],
      ["Coarse sand", "Sand feels gritty and will not form a thread."],
      ["Silt", "Silt feels smooth and silky but is not very sticky."],
      ["Gravel", "Gravel consists of hard stones, not a plastic mass."],
    ],
    answer: "A",
    explanation: "In the feel method sand is gritty, silt is smooth and floury, and clay is sticky and plastic, forming a ribbon or thread.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "After a jar of soil and water is shaken and left to settle, which material is found floating on the surface?",
    options: [
      ["Organic matter", "Correct: plant remains are lighter than water and float."],
      ["Clay", "Clay settles last, on top of the silt, or stays suspended for a while."],
      ["Fine sand", "Fine sand settles within minutes above the coarse sand."],
      ["Silt", "Silt settles between the sand and the clay layers."],
    ],
    answer: "A",
    explanation: "Settling order: coarse sand at the bottom, then fine sand, silt and clay. The finest clay keeps the water cloudy; organic matter floats.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of soil structure is best for a seedbed?",
    options: [
      ["Crumb", "Correct: small porous crumbs give air, drainage, water holding and easy root growth."],
      ["Platy", "Flat plates block water movement and roots."],
      ["Single-grain", "Loose single grains hold little water and erode easily."],
      ["Massive (no aggregates)", "A massive soil has no pore network for air and roots."],
    ],
    answer: "A",
    explanation: "Crumb (granular) structure, built by humus, is the ideal topsoil structure.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A soil contains 20% sand, 20% silt and 60% clay. Using a textural triangle, what is its textural class?",
    options: [
      ["Clay", "Correct: with 40% clay or more and little sand or silt, the soil falls in the clay class."],
      ["Loam", "A loam has a balanced mixture with much less clay (for example about 20%)."],
      ["Sandy loam", "A sandy loam is mainly sand."],
      ["Silt loam", "A silt loam is mainly silt with little clay."],
    ],
    answer: "A",
    hints: ["Start with the clay percentage.", "Soils with more than about 40% clay are in the clay classes."],
    explanation: "60% clay places the soil high in the triangle, in the clay class.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does continuous ploughing of a field over many years lead to **capping**?",
    options: [
      ["Humus is oxidised faster than it is replaced, so crumbs break down and fine particles seal the surface", "Correct: loss of humus weakens aggregates; raindrops then form a crust."],
      ["Ploughing brings clay up from the subsoil, so the surface becomes sticky when it is wet and hard when dry", "Ploughing does not add clay; texture stays the same."],
      ["Ploughing raises the soil temperature until the surface melts into a crust", "Soil does not melt; capping is a structural change."],
      ["Ploughing mixes extra humus into the surface layer, and this humus sets into a hard crust when dry", "Humus improves crumb structure; it does not form caps."],
    ],
    answer: "A",
    hints: ["What happens to organic matter when air is mixed into the soil?"],
    explanation: "Cultivation lets air in, and micro-organisms decompose (oxidise) the humus. With less humus, crumbs fall apart under raindrop impact and the fine particles dry into a hard cap.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "A farmer has ploughed to the same depth with a tractor for ten years. Roots of his maize now turn sideways at about 20 cm. What is the most likely cause?",
    options: [
      ["A plough pan has formed just below the depth of ploughing", "Correct: repeated ploughing at one depth compacts a dense layer."],
      ["The subsoil has become sandier because of ploughing", "Ploughing does not change texture."],
      ["Lime added to the field has hardened the subsoil", "Lime improves clay structure; it does not form pans."],
      ["Earthworms have filled the subsoil with casts", "Earthworm casts improve structure and open channels."],
    ],
    answer: "A",
    hints: ["Think about the pressure on the soil just below the plough share."],
    explanation: "A plough pan is a compacted, often platy layer formed by the plough sole and heavy wheels at the same depth every year. It is broken by ripping or by varying the ploughing depth.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Adding kraal manure to a sandy soil changes its texture to a loam.",
    answer: false,
    explanation: "False. Manure improves structure and water-holding capacity, but it does not change the proportions of sand, silt and clay, which define texture.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Calcium from lime helps clay particles to group together (flocculate), which improves the structure of a clay soil.",
    answer: true,
    explanation: "True. Calcium ions link clay particles so they form aggregates instead of dispersing; this is one reason for liming acid clay soils.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each soil structure with its description.",
    pairs: [
      ["Crumb", "Small, rounded, porous aggregates"],
      ["Platy", "Thin, flat horizontal plates"],
      ["Blocky", "Cube-like blocks, common in subsoils"],
      ["Single-grain", "Particles not joined together"],
    ],
    explanation: "Crumb suits topsoils; platy forms in compacted layers; blocky is typical of subsoils; single-grain is found in sands.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Particles smaller than 0.002 mm are called {{blank:a}}. The grouping of particles into aggregates is called soil {{blank:b}}. The dark, decomposed organic matter that binds crumbs together is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["clay"] },
      { id: "b", accepted: ["structure"] },
      { id: "c", accepted: ["humus"] },
    ],
    explanation: "Clay is the finest fraction; structure is the arrangement of particles; humus binds crumbs.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In a jar test the settled layers measure: sand ${JAR.sand} cm, silt ${JAR.silt} cm and clay ${JAR.clay} cm. Calculate the percentage of clay in the soil.`,
    value: jarClay, unit: "%", tol: 0.05, wrong: [JAR.clay, round(pct(JAR.clay, JAR.sand), 1)],
    explanation: `Total = ${JAR.sand} + ${JAR.silt} + ${JAR.clay} = ${jarTotal.toFixed(1)} cm. Clay = ${JAR.clay} ÷ ${jarTotal.toFixed(1)} × 100 = ${round(jarClay, 1)}%. Dividing by the sand layer instead of the total gives a wrong answer.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Thandeka sieves ${sieveMass} g of dry soil. The masses left on the sieves are gravel ${SIEVE.gravel} g, coarse sand ${SIEVE.coarse} g and fine sand ${SIEVE.fine} g. The rest passes through the finest sieve. Calculate the percentage of the sample that passed through the finest sieve.`,
    value: passedPct, unit: "%", wrong: [passed, round(pct(SIEVE.fine, sieveMass), 1)],
    hints: ["First find the mass that passed through.", "Then express it as a percentage of the whole sample."],
    explanation: `Mass passed = ${sieveMass} − ${SIEVE.gravel} − ${SIEVE.coarse} − ${SIEVE.fine} = ${passed} g. Percentage = ${passed} ÷ ${sieveMass} × 100 = ${passedPct}%.`,
    workedSolution: `1. Mass passing the finest sieve = ${sieveMass} − (${SIEVE.gravel} + ${SIEVE.coarse} + ${SIEVE.fine}) = ${passed} g.\n2. Percentage = ${passed} ÷ ${sieveMass} × 100 = ${passedPct}%.\n3. This fraction is silt and clay; a jar test would separate them.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the hard, thin crust that forms on the surface of a bare soil after heavy rain.",
    accepted: ["cap", "capping", "a cap", "soil cap", "surface crust", "crust", "soil crust"],
    explanation: "A **cap** (surface crust) forms when raindrops break down aggregates and the fine particles set hard as they dry.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a crumb structure is important in a topsoil used for crops.",
    hints: ["Think about the large pores between crumbs and the small pores inside them."],
    points: [
      "Large pores between crumbs allow air into the soil / drainage of excess water.",
      "So roots can respire / the soil does not become waterlogged.",
      "Small pores inside crumbs hold water.",
      "So water is available to the crop between rains (or: loose crumbs let roots and seedlings grow easily; rain infiltrates so there is less runoff and erosion).",
    ],
    modelAnswer: "The large pores between crumbs let air in and excess water drain away, so roots can respire and the soil does not waterlog. The small pores inside each crumb hold water, so the crop has water between rains.",
    explanation: "Crumb structure gives both large (air, drainage) and small (water storage) pores, and easy root growth.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **four** practices a farmer could use to improve the structure of a soil that caps badly after rain.",
    hints: ["Think of what adds humus and what protects the surface."],
    points: [
      "Add organic matter such as manure, compost or crop residues.",
      "Mulch / keep crop residues on the surface to absorb raindrop impact.",
      "Reduce tillage (minimum tillage) / avoid working the soil when wet.",
      "Include a grass ley or cover crop in the rotation (or lime an acid clay soil).",
    ],
    modelAnswer: "Add kraal manure or compost; leave maize stover as a mulch on the surface; plough less often and never when the soil is wet; grow a grass ley for a few seasons in the rotation.",
    explanation: "Capping is cured by rebuilding humus and protecting the surface from raindrops.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Form 3 pupils at a school near Masvingo did jar tests on three soils. The settled layers are shown below.\n\n${SOIL_TABLE}`,
    hints: ["Add the three layers of a soil to get its total.", "Clay soils hold the most water but drain slowly."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the percentage of clay in soil Q, to one decimal place.",
        value: qClay, unit: "%", tol: 0.05, wrong: [SOILS[1][3]],
        explanation: `Total for Q = ${SOILS[1][1]} + ${SOILS[1][2]} + ${SOILS[1][3]} = ${qTotal.toFixed(1)} cm; clay = ${SOILS[1][3]} ÷ ${qTotal.toFixed(1)} × 100 = ${round(qClay, 1)}%.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the percentage of sand in soil P.",
        value: pSand, unit: "%", wrong: [SOILS[0][1]],
        explanation: `Total for P = ${pTotal.toFixed(1)} cm; sand = ${SOILS[0][1]} ÷ ${pTotal.toFixed(1)} × 100 = ${pSand}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which soil would hold the most water after heavy rain?",
        options: [
          ["Soil Q", "Correct: it has the most clay, with many tiny pores."],
          ["Soil P", "P is mostly sand, with large pores that drain fast."],
          ["Soil R", "R has less clay than Q."],
          ["All three equally", "Water holding depends on texture, which differs."],
        ],
        answer: "A",
        explanation: "Clay has the largest surface area and smallest pores, so the most clayey soil holds most water.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State **two** observations, other than the layer heights, that the pupils could make on soil P to confirm it is sandy.",
        points: ["It feels gritty when rubbed between finger and thumb.", "It cannot be rolled into a thread / is not sticky / the water clears quickly after shaking."],
        explanation: "The feel method and fast settling support the jar-test result.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why soil Q may be difficult to cultivate.",
        points: [
          "It is high in clay, which is sticky and plastic when wet.",
          "It becomes very hard (and cracks) when dry.",
          "So there is only a short period when its moisture is right for working (or: it needs more power to plough).",
        ],
        explanation: "Clay soils are 'heavy': sticky when wet, hard when dry.",
      }),
    ],
    explanation: "Percentages are each layer divided by the soil's total height; the clay content then explains water holding and workability.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Chipo notices that her maize field, ploughed every year and with stover burned after harvest, forms a hard crust after storms, and water runs off instead of soaking in. Her neighbour's field, where stover is left on the surface and the soil is only disturbed in planting basins, does not crust.",
    hints: ["Which component of soil holds crumbs together?", "What does stover on the surface do to raindrops?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the soil component that is being lost from Chipo's field and that binds soil crumbs together.",
        accepted: ["humus", "organic matter", "soil organic matter"],
        explanation: "Humus binds crumbs; ploughing and burning reduce it.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how yearly ploughing reduces this component.",
        points: ["Ploughing mixes air into the soil.", "So micro-organisms oxidise / decompose humus faster than it is replaced."],
        explanation: "Oxidation of organic matter is the main way cultivation destroys structure.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain **three** ways in which the neighbour's practices protect soil structure.",
        points: [
          "Stover on the surface absorbs raindrop impact, so crumbs are not shattered and no cap forms.",
          "Decomposing stover adds organic matter / humus that binds crumbs.",
          "Minimum disturbance (basins) means less oxidation of humus and no plough pan.",
        ],
        explanation: "Mulch and minimum tillage protect and rebuild crumb structure.",
      }),
    ],
    explanation: "Crusting is a structure problem caused by loss of humus and bare soil; mulch and minimum tillage are the cure.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer says: \"My soil is sandy, so there is nothing I can do about its poor water-holding.\" Discuss this statement.",
    hints: ["Separate texture (fixed) from structure and organic matter (changeable).", "End with a judgement."],
    points: [
      "Agrees that texture (the proportion of sand) cannot practically be changed.",
      "Explains that sand has large pores and little surface area, so it holds little water.",
      "Argues that adding organic matter (manure, compost) increases water-holding, as humus absorbs water.",
      "Mulching reduces evaporation and keeps the surface moist.",
      "Other management: adding clay-rich anthill soil to small areas, minimum tillage to keep humus, choosing drought-tolerant crops.",
      "Judgement: the statement is wrong; texture is fixed but water-holding can be improved by management.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "The farmer is right that the texture of a sandy soil cannot be changed: it will always have a high proportion of sand with large pores and little surface area, so it drains fast and holds little water. However, water-holding depends on structure and organic matter as well. Regular additions of kraal manure or compost add humus, which absorbs water and binds particles into crumbs. A mulch of crop residues cuts evaporation from the surface, and minimum tillage slows the loss of humus. On a small garden, clay-rich anthill soil can be mixed in. So the statement is wrong: texture is fixed, but good management can make a sandy soil hold much more water.",
    explanation: "Distinguish fixed texture from improvable structure and organic matter, then judge.",
  });

  b.card("DEFINITION", "Soil texture", "The relative proportions of sand, silt and clay particles in a soil.");
  b.card("DEFINITION", "Soil structure", "The arrangement of soil particles into aggregates (peds) and the pores between them.");
  b.card("FACT", "Particles from largest to smallest", "Gravel (over 2 mm), sand, silt, clay (under 0.002 mm).");
  b.card("CONCEPT", "Feel method", "Sand: gritty. Silt: smooth, floury. Clay: sticky, plastic, forms a thread or ribbon.");
  b.card("CONCEPT", "Jar (sedimentation) test", "Shake soil with water and let settle: sand at the bottom, then silt, then clay; organic matter floats. Layer ÷ total × 100 gives each percentage.");
  b.card("FORMULA", "Percentage of a particle from a jar test", "Height of that layer ÷ total height of settled soil × 100.");
  b.card("CONCEPT", "What builds crumb structure?", "Humus, microbial gums, fungal threads, grass roots, earthworm casts and calcium (flocculation).");
  b.card("CONCEPT", "What destroys soil structure?", "Oxidation of organic matter by tillage, raindrop impact on bare soil (capping), working wet soil, plough pans, burning residues.");
  b.card("FACT", "Which structure is ideal for a seedbed?", "Crumb (granular) structure.");
  b.card("CONCEPT", "How oxidation leads to capping", "Ploughing lets air in, humus is decomposed, crumbs weaken, raindrops break them and fine particles dry into a crust.");
});
