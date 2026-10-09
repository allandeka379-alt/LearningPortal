// Slice W1b: soil conservation methods and structures.
import { concept, P, check, agricultureLevels } from "../lib.mjs";

const slopePct = (rise, run) => (rise / run) * 100;
const spacing = (vi, slope) => (vi / slope) * 100;

// Daily item: slope 6%, VI 1.5 m.
const dS = 6, dVI = 1.8;
const dHI = spacing(dVI, dS);
check(Math.abs(dHI - 30) < 1e-9, "daily spacing");

// Calc item: rise 3 m over 60 m; VI 1.2 m; field 300 m.
const cSlope = slopePct(3, 60);
const cHI = spacing(1.2, cSlope);
check(cSlope === 5 && Math.abs(cHI - 24) < 1e-9, "calc");

// Structured: slope 8%, VI 1.6 m, field 240 m; channel 400 m at 1 in 200.
const sSlope = 8, sVI = 1.6, sLen = 240;
const sHI = spacing(sVI, sSlope);
const sRidges = Math.floor(sLen / sHI + 1e-9);
const chan = 400, grad = 200;
const fall = chan / grad;
check(Math.abs(sHI - 20) < 1e-9 && sRidges === 12 && fall === 2, "struct");

concept("agri.soil.conservation", { file: "soil/conservation", keyPrefix: "soil.conservation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **biological** method of soil conservation?",
    options: [
      ["Strip cropping", "Correct: it uses alternating strips of crops and grass."],
      ["Building a storm drain", "A storm drain is a mechanical structure."],
      ["Placing gabions in a gully", "Gabions are mechanical structures of wire and stones."],
      ["Constructing contour ridges", "Contour ridges are mechanical structures."],
    ],
    answer: "A",
    explanation: "Biological methods use plants and management; mechanical methods are earthworks and structures.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of a storm drain at the top of a field?",
    options: [
      ["To divert runoff from higher land before it reaches the field", "Correct: it intercepts water from above and leads it to a waterway."],
      ["To store rainwater from the hillside for irrigating the field later", "Storm drains carry water away; they are not reservoirs."],
      ["To drain waterlogged soil inside the field", "That is done by field drains, not storm drains."],
      ["To mark the boundary between two farms", "It is a conservation structure, not a boundary marker."],
    ],
    answer: "A",
    explanation: "A storm (diversion) drain protects the field and its contour ridges from runoff coming from higher land.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When a contour ridge is constructed, where is the soil from the channel placed?",
    options: [
      ["Downhill of the channel, to form the bank", "Correct: the bank below the channel holds back the water."],
      ["Uphill of the channel, to form the bank above it", "A bank above the channel could not stop water flowing down the slope."],
      ["In the grass waterway, to raise it", "Waterways must stay broad and shallow."],
      ["Spread evenly over the whole field", "The soil is needed to build the bank."],
    ],
    answer: "A",
    explanation: "The excavated soil is thrown downhill and compacted to form the bank, which is then grassed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where does the water collected by contour ridges go?",
    options: [
      ["Along the gently sloping channel to a grass waterway", "Correct: the waterway carries it safely downhill."],
      ["Straight down the slope through gaps in the banks", "That would cause gullies."],
      ["Into a dead-level channel where it stays until it evaporates", "Level channels can overflow and break."],
      ["Back up the slope to the storm drain", "Water cannot flow uphill."],
    ],
    answer: "A",
    explanation: "Ridges are built on a very gentle gradient so water flows slowly to a grassed waterway.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A gully is growing back towards a field. What should be done **first** to reclaim it?",
    options: [
      ["Divert runoff away from the gully head with a storm drain", "Correct: stopping the water that feeds the gully comes first."],
      ["Plant crops in the moist, fertile soil at the bottom of the gully", "Crops would be washed out while water still flows."],
      ["Plough the land around the gully head", "Ploughing loosens soil and speeds erosion."],
      ["Allow cattle to graze inside the gully", "Trampling worsens erosion."],
    ],
    answer: "A",
    hints: ["What keeps the gully growing?"],
    explanation: "Reclamation starts by diverting the water; then the head is stabilised, check dams trap silt and grass and trees are planted.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How does a check dam built of stones across a gully help to reclaim it?",
    options: [
      ["It slows the water so silt is deposited behind it", "Correct: the gully gradually fills and can be grassed."],
      ["It stores water for livestock all year", "Check dams are low and leaky; storage is not their purpose."],
      ["It speeds the water so the gully is flushed clean", "Faster water would deepen the gully."],
      ["It stops all water from entering the gully", "Water still flows through and over it, more slowly."],
    ],
    answer: "A",
    hints: ["Moving water drops sediment when it slows down."],
    explanation: "Check dams reduce the speed of flow, so sediment settles and the gully floor rises; vegetation then stabilises it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which practice best conserves soil on communal **grazing** land?",
    options: [
      ["Keeping stock numbers within carrying capacity and resting paddocks in turn", "Correct: grass recovers and keeps the soil covered."],
      ["Burning the old, dry grass every year to encourage a green flush", "Burning leaves soil bare before the storms."],
      ["Allowing cattle to use any path to the river", "Many paths become channels for runoff."],
      ["Adding more cattle in good seasons, when the grass is plentiful everywhere on the farm", "This leads to overgrazing later in the season."],
    ],
    answer: "A",
    hints: ["What keeps grass cover on grazing land?"],
    explanation: "Controlled grazing (correct stocking rate, rotational grazing, resting) maintains cover; burning and overstocking remove it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Crops may be grown in a grass waterway because the soil there is moist.",
    answer: false,
    explanation: "False. Waterways must keep a dense grass cover. Cultivating them exposes soil to concentrated flow, which cuts a gully.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "On a steeper slope, contour ridges must be placed closer together.",
    answer: true,
    explanation: "True. For the same vertical interval, horizontal spacing = vertical interval ÷ slope % × 100, which gets smaller as the slope increases.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure with its purpose.",
    pairs: [
      ["Gabion", "Stone-filled wire basket that stabilises a gully head or river bank"],
      ["Terrace", "Level step that allows cropping on a steep slope"],
      ["Grass waterway", "Carries water from ridges safely down to a stream"],
      ["Check dam", "Low barrier across a gully that traps silt"],
    ],
    explanation: "Each mechanical structure controls water in a different place.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Alternating strips of a row crop such as maize with strips of grass across the slope is called {{blank:a}} cropping, and ploughing across the slope instead of up and down it is called {{blank:b}} ploughing.",
    blanks: [
      { id: "a", accepted: ["strip"] },
      { id: "b", accepted: ["contour"] },
    ],
    explanation: "Strip cropping and contour ploughing both slow runoff.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A field has a slope of ${dS}%. The recommended vertical interval between contour ridges is ${dVI} m. Calculate the horizontal spacing between ridges, in m, using spacing = vertical interval ÷ slope % × 100.`,
    value: dHI, unit: "m", wrong: [dVI * dS, round4(dS / dVI)],
    explanation: `Spacing = ${dVI} ÷ ${dS} × 100 = ${dHI} m. Multiplying the vertical interval by the slope gives a meaningless figure.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A field rises 3 m over a horizontal distance of 60 m. The extension officer recommends a vertical interval of 1.2 m between contour ridges. Calculate the horizontal spacing between the ridges, in m.",
    value: cHI, unit: "m", wrong: [1.2 * 5, 60 / 3],
    hints: ["First find the slope as a percentage.", "Then spacing = vertical interval ÷ slope % × 100."],
    explanation: `Slope = 3 ÷ 60 × 100 = ${cSlope}%. Spacing = 1.2 ÷ ${cSlope} × 100 = ${cHI} m.`,
    workedSolution: `1. Slope = rise ÷ horizontal distance × 100 = 3 ÷ 60 × 100 = ${cSlope}%.\n2. Horizontal spacing = vertical interval ÷ slope × 100 = 1.2 ÷ ${cSlope} × 100 = ${cHI} m.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name a simple instrument made from three poles and a plumb line that is used to peg contour lines on a farm.",
    accepted: ["A-frame", "A frame", "aframe"],
    normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation", "remove_whitespace"],
    explanation: "The **A-frame**: when the plumb line hangs over the centre mark, both legs stand at the same height.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** ways of maintaining contour ridges and grass waterways.",
    hints: ["Think about silt, breaks, grass cover and animals."],
    points: [
      "Remove silt from the channels after the rains.",
      "Repair breaks or low points in the banks quickly.",
      "Keep a dense grass cover on banks and waterways / do not cultivate them.",
      "Keep livestock off banks and waterways (provide crossing points) / check outlets after storms.",
    ],
    modelAnswer: "De-silt the channels each year; repair any breaks in the banks at once; keep a dense grass cover on banks and waterways and never plough them; keep cattle off them except at proper crossing places.",
    explanation: "Structures fail if they fill with silt, break or lose their grass.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer near Chinhoyi is planning contour ridges on a field with a slope of ${sSlope}%. The field is ${sLen} m long down the slope. Assume a vertical interval of ${sVI} m between ridges and a channel gradient of 1 in ${grad}.`,
    hints: ["Spacing = vertical interval ÷ slope % × 100.", "A gradient of 1 in 200 means a fall of 1 m for every 200 m of channel."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the horizontal spacing between ridges, in m.",
        value: sHI, unit: "m", wrong: [sVI * sSlope],
        explanation: `${sVI} ÷ ${sSlope} × 100 = ${sHI} m.`,
      }),
      P.num({
        label: "(b)", stem: "How many ridges are needed on the field, if the first is one spacing below the storm drain?",
        value: sRidges, unit: undefined, wrong: [sRidges + 1],
        explanation: `${sLen} ÷ ${sHI} = ${sRidges} ridges.`,
      }),
      P.num({
        label: "(c)", stem: `One ridge channel is ${chan} m long. Calculate the total fall of the channel, in m.`,
        value: fall, unit: "m", wrong: [chan * grad, grad / chan],
        explanation: `${chan} ÷ ${grad} = ${fall} m.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the channel is given a gentle fall rather than being dead level.",
        points: ["So that water flows slowly to the waterway instead of collecting.", "A level channel may overflow and break the bank, while a steep one would scour into a gully."],
        explanation: "A gentle fall moves water slowly without erosion.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe how the farmer should construct each ridge after the line has been pegged.",
        points: [
          "Dig the channel along the pegged line.",
          "Throw the soil downhill and compact it to form the bank.",
          "Plant grass on the bank and lead the channel into a grassed waterway.",
        ],
        explanation: "Channel, bank downhill, grass and an outlet to a waterway.",
      }),
    ],
    explanation: "Spacing comes from the vertical interval and slope; channels need a gentle fall to a waterway.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A gully 3 m deep has formed below a cattle path on a farm near Masvingo, and it is growing towards the farmer's field.",
    hints: ["Stop the water, stabilise the head, trap silt, revegetate, protect."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the wire-mesh baskets filled with stones that can be used to stop the gully head cutting back.",
        accepted: ["gabions", "gabion"],
        explanation: "**Gabions** are flexible and let water through slowly.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Describe **five** steps the farmer should take to reclaim the gully.",
        points: [
          "Divert runoff away from the gully head (storm drain / move the cattle path).",
          "Stabilise the head with gabions or packed stones.",
          "Build check dams of stones or brushwood across the gully to trap silt.",
          "Plant grass and trees on the sides and on trapped silt.",
          "Fence off the gully / keep livestock out until cover is established.",
        ],
        explanation: "Reclamation follows the order: stop water, stabilise, trap silt, revegetate, protect.",
      }),
    ],
    explanation: "Gully reclamation combines mechanical and biological methods.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss whether biological methods or mechanical methods are more important for conserving soil on a smallholder's arable land.",
    hints: ["Give the strengths and limits of each.", "Consider cost and labour for a smallholder, then judge."],
    points: [
      "Biological methods (mulch, cover crops, contour cultivation, rotation) protect the surface from raindrop impact and keep soil covered.",
      "They also improve organic matter, structure and yields, and cost little.",
      "But on long or steep slopes they cannot control large volumes of runoff alone.",
      "Mechanical structures (storm drains, contour ridges, waterways) control runoff on slopes.",
      "But they are costly in labour, need maintenance and do not protect the soil surface between ridges.",
      "Judgement: both are needed; biological methods are the first line of defence, with structures where slopes need them.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Biological methods such as mulching, cover crops and contour cultivation protect the soil surface itself: they stop raindrops detaching particles, slow runoff and add organic matter, and they cost a smallholder little beyond labour. However, on long or steep slopes a heavy storm produces more runoff than they can hold. Mechanical structures such as storm drains, contour ridges and grass waterways break the slope and lead water safely away, but they take much labour to build, must be maintained every year and do nothing for the soil between the ridges. Both are therefore needed: biological methods are the most important everyday protection, and structures are essential where the slope makes runoff dangerous.",
    explanation: "Balance the strengths and limits of each before judging.",
  });

  b.card("CONCEPT", "Biological soil conservation", "Cover crops, mulching, contour cultivation, strip cropping, grass strips, rotation, afforestation, controlled grazing.");
  b.card("CONCEPT", "Mechanical soil conservation", "Storm drains, contour ridges, grass waterways, terraces, gabions, check dams.");
  b.card("DEFINITION", "Contour ridge", "A channel across the slope on a gentle fall, with the soil thrown downhill as a bank; leads runoff to a waterway.");
  b.card("DEFINITION", "Storm drain", "A large drain at the top of a field that diverts runoff from higher land to a waterway.");
  b.card("FORMULA", "Horizontal spacing of contour ridges", "Spacing (m) = vertical interval (m) ÷ slope (%) × 100.");
  b.card("FORMULA", "Slope as a percentage", "Rise ÷ horizontal distance × 100.");
  b.card("DEFINITION", "Gabion", "A wire-mesh basket filled with stones, used to stabilise gully heads and river banks.");
  b.card("DEFINITION", "Check dam", "A low barrier of stones or brushwood across a gully that slows water and traps silt.");
  b.card("CONCEPT", "Reclaiming a gully", "Divert water, stabilise the head, build check dams, plant grass and trees, fence out livestock.");
});

function round4(v) {
  return Math.round(v * 10000) / 10000;
}
