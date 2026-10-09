// Slice W3a: land preparation and tillage.
import { concept, P, pct, pctChange, round, check, table, fmtNum } from "../lib.mjs";

// Q: ox plough 25 cm on 0.5 ha.
const oxDist = 5000 / 0.25;
check(oxDist === 20000, "oxDist");
const oxHours = oxDist / 1000 / 2;
check(oxHours === 10, "oxHours");
// Q: tractor plough 1.0 m at 5 km/h, 80% efficiency, 6 ha.
const trRate = (1.0 * 5000 * 0.8) / 10000;
const trHours = 6 / trRate;
check(Math.abs(trRate - 0.4) < 1e-9 && Math.abs(trHours - 15) < 1e-9, "tr");
// Q: hand digging 0.25 ha at 50 m2 per hour.
const handHours = 2500 / 50;
check(handHours === 50, "hand");

// Struct: tillage trial.
const TT = [["Conventional (plough and harrow)", 34, 18.5, 3.2], ["Minimum tillage with mulch", 12, 4.1, 3.6]];
const TT_TABLE = table(["Treatment", "Rain lost as runoff (%)", "Soil lost (t/ha per season)", "Maize yield (t/ha)"], TT.map(([a, r, s, y]) => [a, r, s.toFixed(1), y.toFixed(1)]));
const soilCut = pct(TT[0][2] - TT[1][2], TT[0][2]);
const yInc = pctChange(TT[0][3], TT[1][3]);
check(Math.abs(soilCut - 77.84) < 0.01 && Math.abs(yInc - 12.5) < 1e-9, "TT");

// Struct: clearing work.
const CLR = { trees: 64, stumpsPerDay: 4, workers: 2 };
const clrDays = CLR.trees / (CLR.stumpsPerDay * CLR.workers);
check(clrDays === 8, "clr");

concept("agri.crops.land-preparation", { file: "crops/land-preparation", keyPrefix: "crops.land-preparation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which operation is an example of primary tillage?",
    options: [
      ["Ploughing with a mouldboard plough", "Correct: the first, deep working of the soil."],
      ["Harrowing to break clods", "Harrowing is secondary tillage."],
      ["Raking a garden bed to a fine tilth", "Raking is secondary tillage."],
      ["Forming ridges for sweet potatoes", "Ridging is secondary tillage."],
    ],
    answer: "A",
    explanation: "Primary tillage (ploughing, digging) breaks and turns the soil; secondary tillage refines it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of stumping when new land is cleared?",
    options: [
      ["To remove stumps and roots that damage implements", "Correct: stumps also send up new shoots."],
      ["To add organic matter to the topsoil before planting", "Removing stumps does not add organic matter."],
      ["To make the soil more acid for crops", "Stumping has no such aim."],
      ["To provide shade for the young crop", "Stumps give no shade."],
    ],
    answer: "A",
    explanation: "Stumps and roots damage ploughs and send up new shoots, so they are dug or pulled out.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should land not be ploughed when the soil is very wet?",
    options: [
      ["The soil smears and forms hard clods and compacted layers", "Correct: wet soil loses its structure."],
      ["Wet soil cannot be turned by any plough", "It can be turned, but the result is poor."],
      ["Ploughing wet soil kills every earthworm in the field at once", "This is not the main reason."],
      ["Water in the soil rusts the plough at once", "Rust is not the reason."],
    ],
    answer: "A",
    explanation: "Plough when the soil is moist but crumbly to keep a good structure.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which seedbed is most suitable for onion seed in a nursery?",
    options: [
      ["A fine, firm, level seedbed", "Correct: small seeds need close contact with moist soil."],
      ["A rough, cloddy seedbed", "Small seeds fall into gaps and dry out."],
      ["Freshly ploughed soil that has not been harrowed", "It is far too cloddy for small seed."],
      ["High ridges 30 cm tall", "Ridges suit tubers, not small seeds in a nursery."],
    ],
    answer: "A",
    hints: ["How big is an onion seed?"],
    explanation: "Small seeds are sown shallowly and need a fine tilth.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Ploughing to the same depth every year has formed a hard layer about 20 cm down. Which implement can break it without turning the soil?",
    options: [
      ["A ripper (chisel plough)", "Correct: narrow tines loosen the pan."],
      ["A spike-tooth harrow pulled twice", "It works only the surface."],
      ["A garden rake", "A rake works only the top few centimetres."],
      ["A roller", "A roller compacts rather than loosens."],
    ],
    answer: "A",
    hints: ["The implement must reach below 20 cm."],
    explanation: "Rippers and subsoilers loosen compacted layers and are used in conservation farming.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do many farmers plough soon after harvest while the soil is still moist?",
    options: [
      ["Residues are buried and rot before planting, and weeds are killed", "Correct: it also exposes soil pests."],
      ["The summer crop can then be planted in winter without any water", "Summer crops are not planted in winter."],
      ["Moist soil adds nitrogen to the plough", "Ploughs do not gain nitrogen."],
      ["It removes the need for any secondary tillage", "A seedbed is still needed before planting."],
    ],
    answer: "A",
    hints: ["What happens to buried residues over the dry season?"],
    explanation: "Early ploughing is easier in moist soil, buries residues to decompose and controls weeds and pests.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A farmer on a sandy slope wants to cut soil erosion but keep yields. Which tillage system is best?",
    options: [
      ["Minimum tillage with a permanent mulch", "Correct: it protects the soil and conserves moisture."],
      ["Ploughing up and down the slope every year", "This speeds runoff and erosion."],
      ["Burning residues and ploughing twice", "Bare, loose soil erodes badly."],
      ["Harrowing to a very fine tilth across the whole field", "A fine bare tilth crusts and erodes easily."],
    ],
    answer: "A",
    hints: ["Which system keeps the soil covered?"],
    explanation: "Mulch and little disturbance reduce runoff and erosion and keep moisture in the soil.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What are tied ridges used for in dry areas?",
    options: [
      ["To hold rainwater where it falls so that it soaks in", "Correct: the cross-ties form small basins."],
      ["To drain water quickly off the whole field after heavy storms", "They hold water, not drain it."],
      ["To make room for tractor wheels", "That is not their purpose."],
      ["To stop birds eating the seed", "Ridges do not deter birds."],
    ],
    answer: "A",
    explanation: "Tied ridges are a water-harvesting method in low-rainfall areas.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Harrowing is a secondary tillage operation that breaks clods and levels the soil.",
    answer: true,
    explanation: "True. It follows ploughing to prepare the seedbed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Minimum tillage usually needs less fuel and draught power than conventional ploughing.",
    answer: true,
    explanation: "True. Only planting lines or basins are worked, but more weed control is usually needed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each operation with its main purpose.",
    pairs: [
      ["Stumping", "Remove stumps and roots from new land"],
      ["Ploughing", "Break and turn the soil, burying weeds"],
      ["Harrowing", "Break clods and level the surface"],
      ["Rolling", "Firm loose soil round small seeds"],
      ["Ridging", "Form raised rows for tuber crops"],
    ],
    explanation: "Each operation has a different job in land preparation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The first, deep working of the soil is called {{blank:a}} tillage; the hard layer formed by ploughing at the same depth every year is called a plough {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["primary"] },
      { id: "b", accepted: ["pan", "hardpan"] },
    ],
    explanation: "Primary tillage; plough pan.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A worker digs about 50 m² of soil per hour with a hoe. Assume this rate. How many hours will it take to dig 0.25 ha?",
    value: handHours, unit: "h", tol: 0, wrong: [5, 0.005],
    explanation: `0.25 ha = 2,500 m²; 2,500 ÷ 50 = ${handHours} hours. Forgetting to change hectares to m² gives a tiny answer.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "An ox plough cuts a furrow 25 cm wide. Calculate the distance, in km, the oxen walk to plough 0.5 ha.",
    value: oxDist / 1000, unit: "km", tol: 0, wrong: [oxDist, 2],
    hints: ["Distance = area ÷ width (both in metres)."],
    explanation: `0.5 ha = 5,000 m²; 5,000 ÷ 0.25 = ${fmtNum(oxDist)} m = ${oxDist / 1000} km.`,
    workedSolution: `1. Area = 0.5 × 10,000 = 5,000 m².\n2. Width = 25 cm = 0.25 m.\n3. Distance = 5,000 ÷ 0.25 = ${fmtNum(oxDist)} m = ${oxDist / 1000} km.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A tractor plough works a strip 1.0 m wide at 5 km/h with a field efficiency of 80%. Calculate the time, in hours, to plough 6 ha.",
    value: trHours, unit: "h", tol: 0.05, answer: "15", wrong: [12, round(6 / 0.5 * 0.8, 1)],
    hints: ["Rate in m²/h = width × speed in m/h.", "Multiply by the efficiency, then divide the area by the rate."],
    explanation: `Theoretical rate = 1.0 × 5,000 = 5,000 m²/h = 0.5 ha/h; effective = 0.5 × 0.8 = ${trRate} ha/h; 6 ÷ ${trRate} = ${trHours} h. Ignoring efficiency gives 12 h, which is too short.`,
    workedSolution: `1. Rate = 1.0 m × 5,000 m/h = 5,000 m²/h = 0.5 ha/h.\n2. Effective rate = 0.5 × 0.80 = ${trRate} ha/h.\n3. Time = 6 ÷ ${trRate} = ${trHours} h.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the hand tool used to dig out tree stumps and roots when clearing land.",
    accepted: ["mattock", "pick", "pickaxe", "pick-axe", "grubbing hoe", "axe"],
    keywords: { any: ["mattock", "pick", "grub", "axe"] },
    explanation: "A **mattock** (or pick and axe).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons for preparing land before planting maize.",
    hints: ["Give the action and its effect on the crop."],
    points: [
      "Weeds are buried or uprooted.",
      "So they do not compete with the maize for water, nutrients and light.",
      "The soil is loosened (aerated, better infiltration).",
      "So roots penetrate easily, and seed has good contact with moist soil for germination.",
    ],
    modelAnswer: "Ploughing buries weeds, so they do not compete with the young maize for water and nutrients. It also loosens the soil, so air and water enter and the roots grow easily, and the harrowed seedbed gives the seed good contact with moist soil.",
    explanation: "Action plus effect.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe the steps Tatenda should follow to clear a piece of bush for cropping without causing soil erosion.",
    hints: ["Plan, clear, stump, then protect the soil."],
    points: [
      "Survey the land; keep trees on steep slopes, stream banks and for windbreaks.",
      "Slash undergrowth and fell the trees in the dry season.",
      "Stump (dig or pull out stumps and roots) and remove stones.",
      "Build contour ridges and waterways before ploughing, and plant a crop or cover soon after.",
    ],
    modelAnswer: "Tatenda should survey the land and mark trees to keep. In the dry season he slashes, fells the trees and digs out stumps and stones. Before ploughing he builds contour ridges and waterways and then plants quickly so the soil is not left bare.",
    explanation: "Survey, clear, stump, protect.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A research station compared two tillage systems for maize on the same sandy soil over one season.\n\n${TT_TABLE}`,
    hints: ["Percentage reduction = decrease ÷ original × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage reduction in soil lost under minimum tillage, to one decimal place.",
        value: soilCut, unit: "%", tol: 0.05, answer: "77.8", wrong: [14.4, round(pct(18.5 - 4.1, 4.1), 1)],
        explanation: `(18.5 − 4.1) ÷ 18.5 × 100 = ${round(soilCut, 1)}%.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the percentage increase in maize yield under minimum tillage, to one decimal place.",
        value: yInc, unit: "%", tol: 0.05, answer: "12.5", wrong: [0.4, round(pct(0.4, 3.6), 1)],
        explanation: `(3.6 − 3.2) ÷ 3.2 × 100 = ${yInc}%.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why less soil was lost under minimum tillage.",
        points: ["The mulch covers the soil and absorbs the impact of raindrops, so less soil is splashed.", "Less runoff (12% compared with 34%) means less water flows over the surface to carry soil away.", "Undisturbed soil keeps its structure and roots, so particles are held together."],
        explanation: "Cover, infiltration and structure.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why the maize yield was higher under minimum tillage.",
        points: ["More rain soaked in rather than running off, so the crop had more water in dry spells.", "Less topsoil and nutrients were lost / the mulch kept the soil cooler and moister."],
        explanation: "Water and nutrients retained.",
      }),
    ],
    explanation: "Interpret a tillage trial: soil loss, runoff and yield.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12, calculator: true,
    stem: `Rudo has been allocated 2 ha of bush near Chinhoyi. There are ${CLR.trees} trees to remove. Two workers can each dig out about ${CLR.stumpsPerDay} stumps a day (assume this rate).`,
    hints: ["Days = stumps ÷ (stumps per worker per day × workers).", "Think about the soil after clearing."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of days the two workers will take to remove all the stumps.",
        value: clrDays, unit: "days", tol: 0, wrong: [16, 32],
        explanation: `${CLR.stumpsPerDay} × 2 = 8 stumps a day; ${CLR.trees} ÷ 8 = ${clrDays} days. Forgetting the second worker gives 16 days.`,
      }),
      P.mcq({
        label: "(b)", stem: "What should Rudo do before ploughing the cleared land for the first time?",
        options: [
          ["Build contour ridges and waterways", "Correct: newly cleared soil is very easily eroded."],
          ["Spread lime evenly over the whole area", "Lime may be needed, but erosion control comes first."],
          ["Harrow the land to a fine tilth", "Harrowing follows ploughing."],
          ["Plant a maize seedbed nursery", "Maize is sown directly."],
        ],
        answer: "A",
        explanation: "Conservation works protect bare soil before the first rains.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "State **three** uses Rudo could make of the trees she removes.",
        points: ["Poles for fencing, building or tobacco barns.", "Firewood or charcoal.", "Brush laid along contours as trash lines to slow runoff / mulch."],
        explanation: "Uses of cleared wood.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe how she should carry out primary and secondary tillage on the cleared land.",
        points: ["Plough (or rip) along the contour when the soil is moist, to a depth of about 15-25 cm.", "Harrow to break clods and level the soil, removing remaining roots and stones.", "Prepare the seedbed to suit the crop (medium tilth for maize), across the slope."],
        explanation: "Primary then secondary, along the contour.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Suggest **three** reasons why Rudo might choose conservation agriculture rather than conventional ploughing after the first season.",
        points: ["Less erosion because a mulch covers the soil.", "More moisture conserved for dry spells.", "Less labour and draught power needed / organic matter builds up over time."],
        explanation: "Benefits of conservation tillage.",
      }),
    ],
    explanation: "Plan clearing and tillage of new land and weigh up tillage systems.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Farai is preparing land for three crops: finger millet, groundnuts and sweet potatoes.",
    hints: ["Match the tilth to the seed or planting material."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the seedbed needed for finger millet and give a reason.",
        points: ["Fine, firm, level seedbed.", "The tiny seed is sown shallowly and needs close contact with moist soil."],
        explanation: "Fine tilth for small seed.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the seedbed for groundnuts and give a reason.",
        points: ["Medium tilth in loose, well-drained soil.", "Large seeds germinate well with a few small clods, and pegs need loose soil to enter."],
        explanation: "Medium tilth.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why sweet potatoes are planted on ridges.",
        points: ["Ridges give a deep, loose soil in which the storage roots can swell.", "They drain well and make lifting easier at harvest."],
        explanation: "Ridges for roots and tubers.",
      }),
    ],
    explanation: "Match the seedbed to the crop.",
  });

  b.card("DEFINITION", "Primary tillage", "First, deep working of the soil that breaks and turns it: ploughing, digging.");
  b.card("DEFINITION", "Secondary tillage", "Shallower work after ploughing to make the seedbed: harrowing, raking, rolling, ridging.");
  b.card("CONCEPT", "Reasons for land preparation", "Control weeds, loosen and aerate soil, bury residues and manure, make a seedbed, expose pests, level or shape land, conserve water.");
  b.card("CONCEPT", "Steps in clearing new land", "Survey, slash, fell, stump, remove stones, dispose of debris, build contours, then plough.");
  b.card("FACT", "Seedbed for small seeds", "Fine, firm and level; large seeds tolerate a medium tilth; tubers need deep, loose soil or ridges.");
  b.card("DEFINITION", "Minimum tillage", "Only planting lines or basins are disturbed and residues are kept as mulch; zero tillage plants into untilled soil.");
  b.card("CONCEPT", "Minimum vs conventional tillage", "Minimum: less erosion, more moisture and organic matter, less fuel; but more weed control and residue-borne pests.");
  b.card("DEFINITION", "Plough pan", "A compacted layer formed by ploughing at the same depth every year; broken with a ripper or subsoiler.");
  b.card("FORMULA", "Distance walked when ploughing", "Distance (m) = area (m²) ÷ width of cut (m).");
});
