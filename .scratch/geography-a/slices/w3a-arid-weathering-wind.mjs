// W3a: arid.weathering-wind (Cambridge only, A Level Paper 3 option 10). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const ratio27 = chk((0.75 / 0.25) ** 3, 27, 1e-9);
const deflRate = rnd((3.5 / 50) * 100, 0, 7, "deflRate");
const saltMm = chk(1.2 * 400, 480, 1e-9);
const saltPct = rnd((66 / 90) * 100, 1, 73.3, "saltPct");
// Struct 1: traps at heights
const TR = [[5, 48], [10, 30], [25, 14], [50, 6], [100, 2]];
const total = chk(sum(TR.map((r) => r[1])), 100);
const TRTAB = tbl(["Height of trap above the surface (cm)", "Mass of sand collected (g)"], TR.map((r) => [r[0], r[1]]));
const lowPct = chk(((48 + 30 + 14) / total) * 100, 92, 1e-9);
// Struct 2: soil loss by surface cover
const SL = [["Bare ploughed soil", 24.0], ["Crop stubble left on the field", 8.0], ["Strips of grass between fields", 3.5], ["Shelterbelt of trees", 1.5]];
const SLTAB = tbl(["Surface treatment", "Soil lost to the wind (t per ha per year)"], SL.map((r) => [r[0], r[1].toFixed(1)]));
const redStubble = rnd(((24.0 - 8.0) / 24.0) * 100, 1, 66.7, "redStubble");

concept("ageo.arid.weathering-wind", { file: "arid/weathering-wind", keyPrefix: "arid.weathering-wind", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which weathering process involves crystals growing in the pores of rock as water evaporates?", [
    ["Salt crystal growth in the pores", "Correct: the growing crystals exert pressure on the pore walls."],
    ["Carbonation of limestone", "Carbonation is the dissolving of limestone by weak acid."],
    ["Hydrolysis of feldspar", "Hydrolysis is a chemical reaction of water with minerals."],
    ["Exfoliation of the surface", "Exfoliation is the peeling of sheets of rock."],
  ], "**Salt crystal growth** is the pressure from crystals in pores.");
  mc(b, 2, "UNDERSTANDING", "What is deflation?", [
    ["The removal of loose fine particles by the wind", "Correct: it lowers the surface and leaves a pavement of stones."],
    ["The wearing of rock surfaces by grains carried in the wind", "That is abrasion."],
    ["The deposition of sand where the wind speed falls", "That is deposition and not deflation."],
    ["The peeling of the outer layers of a rock in sheets", "That is exfoliation."],
  ], "**Deflation** is lifting and removing loose material.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "At what height is wind abrasion usually greatest?", [
    ["Within about a metre of the ground", "Correct: sand grains in saltation rarely bounce much higher."],
    ["At about five metres above the ground", "Few sand grains reach this height."],
    ["Evenly at all heights from the ground upwards", "Abrasion is concentrated near the surface."],
    ["Only at the very top of high cliffs", "Cliff tops are not reached by saltating grains."],
  ], "Sand grains move close to the surface, so abrasion is **greatest near the ground**.");
  mc(b, 2, "UNDERSTANDING", "Which method of wind transport moves most of the sand in a desert?", [
    ["Saltation", "Correct: the grains bounce in short hops along the surface."],
    ["Suspension", "Suspension carries only the finest dust."],
    ["Solution", "Wind does not transport material in solution."],
    ["Traction", "Traction moves only the coarsest grains."],
  ], "Most sand moves by **saltation**.");
  mc(b, 3, "ANALYSIS", "Why can fine dust be carried thousands of kilometres from a desert?", [
    ["It is so small that it stays in suspension in the air", "Correct: the grains are lifted high and fall very slowly."],
    ["It is heavy and so is blown along the ground in a straight line", "Dust is light and not heavy."],
    ["It is dissolved in the wind and so moves with it at all times", "Dust is not dissolved in the air."],
    ["It is carried by water vapour rising from the desert surface", "Dust is carried by the air itself."],
  ], "Fine particles remain in **suspension** for long distances.", { hints: ["Compare the size of dust with the size of sand."] });
  mc(b, 3, "ANALYSIS", "Why does thermal fracture seem to work best when the rock is slightly damp?", [
    ["Moisture adds chemical effects to the heating and cooling", "Correct: laboratory tests found little breakup in dry rock."],
    ["Water freezes in the cracks during every hot afternoon sun", "It does not freeze in the heat of the day."],
    ["Dry rock expands and contracts so much that it always shatters", "Dry cycles alone had little effect."],
    ["Damp rock is a far better conductor of heat from the sky", "Rock conducts heat in both states; moisture's effect is different."],
  ], "Laboratory tests suggest that **moisture** is important to thermal weathering.", { hints: ["Think of dew in the Namib."] });
  mc(b, 3, "APPLICATION", "A deflation surface has many stones of 1–3 cm with no sand or dust between them. What is this surface called?", [
    ["Desert pavement", "Correct: fine material has been removed, leaving a stony cover."],
    ["A salt pan with a thick crust", "A salt pan is a flat area with salt crusts."],
    ["A barchan dune of sand", "A barchan is a crescent-shaped sand dune."],
    ["A wadi or dry channel", "A wadi is a dry river channel."],
  ], "Deflation leaves a **lag deposit** of coarse stones.", { hints: ["What is left behind when the fine particles are removed?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Silt and clay are moved mainly by traction.", answer: false,
    feedbackTrue: "Not so: traction moves coarse grains.", feedbackFalse: "Correct: silt and clay are fine and are carried in suspension.",
    explanation: "Fine silt and clay travel in **suspension**; traction is for coarse grains." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its description.",
    pairs: [
      ["Traction", "Coarse grains rolled along the surface"],
      ["Saltation", "Sand grains bouncing in short hops"],
      ["Suspension", "Dust carried high in the air"],
      ["Deflation", "Removal of loose fine particles from the surface"],
      ["Abrasion", "Sandblasting of rock by wind-blown grains"],
    ], explanation: "Three methods of transport and two processes of erosion." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The peeling of sheets from the surface of a rock is {{blank:a}}. A surface from which fine particles have been removed, leaving stones, is a {{blank:b}} deposit. Sand transport is proportional to the {{blank:c}} of the wind speed.",
    blanks: [
      { id: "a", accepted: ["exfoliation"], choices: ["exfoliation", "deflation", "carbonation"] },
      { id: "b", accepted: ["lag"], choices: ["lag", "alluvial", "glacial"] },
      { id: "c", accepted: ["cube"], choices: ["cube", "square", "square root"] },
    ], explanation: "Exfoliation peels; a lag deposit remains after deflation; transport rises with the cube of wind speed." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the weathering process in which crystals of salt grow in rock pores and break up the rock.",
    accepted: ["salt crystal growth", "salt weathering", "haloclasty", "salt crystallisation", "salt crystallization"], explanation: "**Salt crystal growth** (haloclasty) forces grains apart." });

  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "times",
    stem: "Sand transport is proportional to the cube of the shear velocity. How many times more sand is moved when the shear velocity rises from 0.25 m/s to 0.75 m/s (illustrative values)?",
    hints: ["Find the ratio of the speeds first, then cube it."],
    value: ratio27, wrong: [3, 9, 1.5],
    explanation: "Ratio of speeds = 0.75 ÷ 0.25 = 3. Transport ratio = 3³ = **27**. The value 9 squares the ratio instead of cubing it." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true,
    stem: "A deflation hollow has deepened by 3.5 m over 50 years (illustrative data). Calculate the mean rate of lowering, in centimetres per year.",
    hints: ["Convert metres to centimetres, then divide by the years."],
    value: deflRate, dp: 0, wrong: [0.07, 70],
    explanation: "3.5 m = 350 cm. 350 ÷ 50 = **7 cm per year**. The value 0.07 is the rate in metres per year." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "Salt weathering lowers a rock surface by 1.2 mm per year (illustrative data). By how many millimetres will the surface be lowered in 400 years?",
    hints: ["Rate × time."],
    value: saltMm, wrong: [333, 4.8],
    explanation: "1.2 × 400 = **480 mm**. The value 333 divides 400 by 1.2." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A wind-blown sample of 90 g of sand contained 18 g moved by traction, 66 g by saltation and 6 g in suspension (illustrative data). Calculate the percentage of the sample moved by saltation, to one decimal place.",
    hints: ["Saltation ÷ total × 100."],
    value: saltPct, dp: 1, wrong: [66, 20.0, 7.3],
    explanation: "1. Total = 18 + 66 + 6 = 90 g.\n2. 66 ÷ 90 × 100 = **73.3%**. The value 66 is the mass in g." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how salt crystal growth weathers rock in a desert.",
    hints: ["Source of salt, evaporation and the pressure of crystals."],
    points: [
      "Salty water from groundwater, dew, fog or sea spray enters pores and cracks in the rock.",
      "The water evaporates in the heat, leaving salt crystals that grow as more water evaporates, and some salts expand when they take up water.",
      "The growing crystals exert pressure on the walls of the pores, which break off grains and enlarge cracks.",
    ],
    modelAnswer: "Salty water from groundwater, dew, fog or sea spray enters pores and cracks. The water evaporates in the heat, leaving salt crystals that grow as more water evaporates, and some salts expand when they take up water. The growing crystals press on the walls of the pores, so grains break off and the cracks widen.",
    explanation: "Source of salt, crystal growth and pressure." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how exfoliation takes place on a granite boulder in a hot desert.",
    hints: ["Think about heating, cooling and the outer layer."],
    points: [
      "The surface heats rapidly during the day and cools at night, so the outer layer expands and contracts more than the cooler interior.",
      "Stress builds up and cracks form parallel to the surface, helped by chemical weathering and moisture from dew.",
      "Curved sheets of rock peel away, leaving a rounded boulder.",
    ],
    modelAnswer: "The surface heats rapidly by day and cools at night, so the outer layer expands and contracts more than the cooler interior. Stress builds up and cracks form parallel to the surface, helped by chemical weathering and dew. Curved sheets of rock peel away, leaving a rounded boulder.",
    explanation: "Differential expansion creates cracks parallel to the surface." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the ways in which the wind transports material in a desert.",
    hints: ["Give the three methods with particle sizes."],
    points: [
      "Traction: coarse sand and fine gravel are rolled or pushed along the surface, often moved by the impact of other grains.",
      "Saltation: sand grains bounce in short hops close to the surface, and this carries most of the sand load.",
      "Suspension: silt and clay (dust) are lifted high into the air and carried long distances.",
      "The amount and size of the load depend on wind speed, and the rate rises sharply (with the cube of the wind speed) in strong winds.",
    ],
    modelAnswer: "In traction, coarse sand and fine gravel are rolled along the surface. In saltation, sand grains bounce in short hops close to the surface, and this carries most of the sand. In suspension, dust is lifted high and carried long distances. The load depends on wind speed, and the rate rises with the cube of the speed.",
    explanation: "Traction, saltation and suspension with particle sizes." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why removing vegetation from semi-arid farmland increases wind erosion.",
    hints: ["Think about wind speed near the ground and the soil."],
    points: [
      "Plants slow the wind near the ground, so without them the wind speed at the surface is higher and moves more soil.",
      "Roots bind the soil and plant debris holds moisture, so without them the soil is looser and drier.",
      "Bare, ploughed soil has fine, loose particles that are easily lifted, particularly in drought.",
    ],
    modelAnswer: "Plants slow the wind near the ground, so without them the wind at the surface is faster and moves more soil. Roots bind the soil and plant debris holds moisture, so bare soil is looser and drier. Ploughed soil has fine, loose particles that are easily lifted, particularly in drought.",
    explanation: "Vegetation reduces wind speed and binds the soil." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Sand-trapping devices were placed at five heights above the surface of a sandy desert plain during a windstorm (illustrative data, invented for this exercise).\n\n${TRTAB}`,
    hints: ["Add the masses collected in the traps at 5, 10 and 25 cm and divide by the total.", "Think about how sand grains move in saltation."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the total sand that was collected in the traps at 25 cm or lower.", value: lowPct, unit: "%", wrong: [48, 8, 14],
        explanation: "48 + 30 + 14 = 92 g out of a total of 100 g, which is 92%. The value 48 is the mass in the lowest trap alone." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how the mass of sand collected changes with height.",
        points: [
          "The mass of sand falls steadily as height increases, from 48 g at 5 cm to 2 g at 100 cm.",
          "Most sand is carried very near the surface: 78 g (78%) was collected below 15 cm (in the 5 and 10 cm traps).",
          "The fall is most rapid at the bottom: the mass falls by more than two-thirds between 5 and 25 cm, and above 50 cm very little sand moves.",
        ],
        modelAnswer: "The mass falls steadily with height, from 48 g at 5 cm to 2 g at 100 cm. Most sand moves very near the surface: 78 g, or 78%, was collected in the 5 and 10 cm traps. The fall is most rapid at the bottom, and above 50 cm very little sand moves.",
        explanation: "Quote the trend and figures, including a share." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the pattern in the results and one effect that it has on rock surfaces.",
        points: [
          "Most sand moves by saltation: grains bounce in short hops close to the surface and only the finest rise higher.",
          "Grains are heavy compared with the air, so they fall back quickly, and the wind speed is lower near the ground, so few are lifted high.",
          "The effect is that abrasion is concentrated near the base of rocks, undercutting them to form features such as rock pedestals.",
        ],
        modelAnswer: "Most sand moves by saltation, with grains bouncing in short hops close to the surface, and only the finest rise higher. The grains are heavy and fall back quickly. As a result, abrasion is concentrated near the base of rocks, which are undercut to form features such as rock pedestals.",
        explanation: "Saltation keeps the load low, which concentrates abrasion near the ground." }),
    ], explanation: "Calculate a share, describe a vertical profile and explain it." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A study in a semi-arid farming area measured soil lost to the wind in a drought year under four kinds of surface cover (illustrative data, invented for this exercise).\n\n${SLTAB}`,
    hints: ["Percentage reduction = (24.0 − 8.0) ÷ 24.0 × 100.", "How does cover change the wind at the surface?"],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage reduction in soil loss when crop stubble is left on the field, compared with bare ploughed soil, to one decimal place.", value: redStubble, dp: 1, unit: "%", wrong: [16, 33.3, 8],
            explanation: "(24.0 − 8.0) ÷ 24.0 × 100 = 66.7%. The value 16 is the reduction in t per ha, not a percentage." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which treatment gives the smallest soil loss?", options: [
            ["Shelterbelt of trees", "Correct: 1.5 t per ha per year is the lowest value."],
            ["Strips of grass between fields", "3.5 t per ha is higher than the shelterbelt."],
            ["Crop stubble left on the field", "8.0 t per ha is higher than the shelterbelt."],
            ["Bare ploughed soil", "Bare soil has the greatest loss, 24.0 t per ha."],
          ], answer: "A", explanation: "The shelterbelt has the lowest loss, 1.5 t per ha per year." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why bare ploughed soil loses the most soil.",
        points: [
          "There is no vegetation to slow the wind near the ground, so the wind speed at the surface is high enough to move soil particles.",
          "Ploughing breaks the soil into fine, loose, dry particles that are easy to lift (deflation).",
          "Saltating grains hit the surface and knock more particles loose, which increases erosion in the drought.",
        ],
        modelAnswer: "There is no vegetation to slow the wind near the ground, so the wind speed at the surface is high enough to move soil. Ploughing breaks the soil into fine, loose, dry particles that are easily lifted. Saltating grains hit the surface and knock more particles loose, which increases erosion in drought.",
        explanation: "No cover, loose soil and impacts from saltating grains." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how a shelterbelt of trees reduces wind erosion.",
        points: [
          "The trees act as a barrier that slows the wind and reduces its speed for a distance downwind.",
          "Slower wind has less energy to lift and move soil particles, and grains in saltation are trapped.",
          "Roots bind the soil and leaf litter protects it, and the trees reduce evaporation from the soil in the fields they shelter.",
        ],
        modelAnswer: "The trees act as a barrier that slows the wind for a distance downwind. Slower wind has less energy to lift soil particles, and grains in saltation are trapped. Roots bind the soil, litter protects it, and the trees reduce evaporation from sheltered fields.",
        explanation: "Reduced wind speed, trapped grains and soil protection." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest which two treatments a farmer with limited money should use, and give reasons.",
        points: [
          "Leaving crop stubble costs almost nothing and reduces soil loss by two-thirds (from 24.0 to 8.0 t per ha).",
          "Grass strips between fields cost little to establish, give a further large reduction (to 3.5 t per ha) and also reduce runoff.",
          "Shelterbelts give the best protection but take years to grow and cost more, so they are a longer-term choice (accept a reasoned alternative).",
        ],
        modelAnswer: "Leaving stubble costs almost nothing and reduces soil loss by two-thirds, from 24.0 to 8.0 t per ha. Grass strips cost little to establish and give a further reduction, to 3.5 t per ha. Shelterbelts give the best protection but take years to grow and cost more, so they are a longer-term choice.",
        explanation: "Weigh cost against the reduction in soil loss." }),
    ], explanation: "Calculate a reduction, explain deflation and evaluate protective measures." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of salt weathering compared with thermal fracture in the breakdown of rock in hot deserts.",
    hints: ["Explain each process.", "Use evidence from experiments and from landforms."],
    points: [
      "Thermal fracture was traditionally seen as the main process, because the diurnal range is large and minerals expand at different rates.",
      "Laboratory experiments in the 1930s found little breakup from heating and cooling alone but found more when the rock was damp.",
      "Salt crystal growth is very effective, because crystals grow in pores and exert pressure, and some salts expand on hydration.",
      "Salt weathering produces honeycomb hollows (tafoni) and disintegrates rock near coasts and in basins with salty groundwater.",
      "Salt requires a supply of moisture and salts, so it is weaker in the interior of dry plateaus.",
      "Thermal fracture and exfoliation may still work where moisture is present, so the processes combine.",
      "Chemical weathering (hydrolysis, carbonation) and freeze–thaw also contribute in places.",
      "Judgement: salt weathering is probably more effective in many deserts, especially near the coast, but the relative importance depends on rock type and moisture, and the processes work together.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Thermal fracture was traditionally seen as the main process, because the diurnal range is large and minerals expand at different rates. However, laboratory experiments in the 1930s found little breakup from heating and cooling alone but more when the rock was damp. Salt crystal growth is very effective: crystals grow in pores and exert pressure, and some salts expand when they take up water. It produces honeycomb hollows and breaks up rock near coasts and in basins with salty groundwater. It does require a supply of moisture and salt, so it is weaker on dry interior plateaus. Thermal fracture and exfoliation may still work where moisture is present, so the processes combine. I conclude that salt weathering is probably more effective in many deserts, especially near the coast, but the relative importance depends on rock type and moisture.",
    wordLimit: { max: 300 }, explanation: "Compare the two processes using experimental evidence and landforms, then judge." });

  b.card("DEFINITION", "Thermal fracture", "Cracking of rock caused by repeated expansion and contraction as it heats by day and cools at night; probably most effective if the rock is also damp.");
  b.card("DEFINITION", "Exfoliation", "The peeling of curved sheets from the surface of a rock (onion-skin weathering) by thermal stress, pressure release and chemical weathering.");
  b.card("CONCEPT", "Salt crystal growth", "Salt water enters pores and evaporates, and the crystals grow and press on the pore walls; probably the most effective desert weathering process, making honeycomb hollows (tafoni).");
  b.card("CONCEPT", "Arid weathering processes", "Thermal fracture, exfoliation, freeze–thaw (cold nights and high deserts), salt crystal growth, hydrolysis and carbonation (with moisture from dew).");
  b.card("DEFINITION", "Deflation", "The removal of loose, fine particles by the wind, lowering the surface and leaving a lag deposit (desert pavement).");
  b.card("DEFINITION", "Wind abrasion", "Sandblasting of rock surfaces by grains in saltation; greatest in the lowest metre or so above the ground.");
  b.card("CONCEPT", "Wind transport", "Traction (coarse grains roll), saltation (sand bounces and carries most of the load) and suspension (dust carried high and far).");
  b.card("FORMULA", "Bagnold's relationship", "Sand transport rate is proportional to the cube of the wind (shear) speed: doubling the speed gives eight times the movement.");
  b.card("FACT", "Bodélé Depression", "A dry lake bed in Chad that is the largest source of wind-blown dust in the world; its dust is carried across the Atlantic.");
});
