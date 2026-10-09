// Slice G2a: folding and faulting (ZIMSEC-only concept).
import { concept, P, geographyLevels } from "../lib.mjs";

const SECTION = "| Point along the section (fictional) | Distance from west end (km) | Height (m) | Note |\n|---|---|---|---|\n| P | 0 | 1,540 | Plateau surface |\n| Q | 4 | 1,520 | Top of western escarpment; fault line |\n| R | 6 | 980 | Foot of escarpment, valley floor |\n| S | 26 | 940 | Lake shore on valley floor |\n| T | 44 | 1,010 | Foot of eastern escarpment |\n| U | 47 | 1,610 | Top of eastern escarpment; fault line |";

concept("geo.tectonics.folding-faulting", { file: "tectonics/folding-faulting", keyPrefix: "tectonics.folding-faulting" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An **upfold** in rock layers, shaped like an arch, is called:",
    options: [
      ["an anticline", "Correct: layers slope down away from the crest."],
      ["a syncline", "A syncline is a downfold or trough."],
      ["a nappe", "A nappe is a fold broken and pushed forward along a thrust."],
      ["a graben", "A graben is a sunken block between faults."],
    ],
    answer: "A",
    explanation: "**Anticline** = arch (upfold); **syncline** = trough (downfold).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which force causes **normal** faults?",
    options: [
      ["Tension", "Correct: the crust is pulled apart and one block slips down."],
      ["Compression", "Compression causes folding and reverse faults."],
      ["Sideways shear", "Shear causes tear (strike-slip) faults."],
      ["Gravity on loose soil", "That causes mass wasting, not faulting."],
    ],
    answer: "A",
    explanation: "**Tension** stretches the crust; blocks drop down along **normal** faults.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a rift valley form, according to the tension theory?",
    options: [
      ["A block sinks between two parallel normal faults", "Correct: the crust is stretched and the central block drops."],
      ["A river cuts down through soft rock over a long time", "Rivers may flow along rift valleys but do not form them."],
      ["A block is pushed up between two reverse faults", "A raised block between faults is a block mountain (horst)."],
      ["Layers of rock are bent down into a syncline", "A syncline is a fold, not a faulted valley."],
    ],
    answer: "A",
    explanation: "Tension pulls the crust apart; the central block sinks between **normal faults**, leaving steep escarpments on each side.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which type of fold are both limbs sloping in the **same** direction because one limb has been pushed over the other?",
    options: [
      ["An overfold", "Correct: compression from one side pushes the fold over."],
      ["A simple fold", "In a simple fold the limbs slope in opposite directions at similar angles."],
      ["An asymmetrical fold", "The limbs slope at different angles but in opposite directions."],
      ["A syncline", "A syncline is any downfold; its limbs slope towards the centre."],
    ],
    answer: "A",
    explanation: "Simple → asymmetrical → **overfold** → recumbent → nappe as compression increases.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is an example of **fold mountains** in Africa?",
    options: [
      ["The Atlas Mountains", "Correct: in north-west Africa (Morocco, Algeria, Tunisia)."],
      ["The Ruwenzori", "The Ruwenzori is a block mountain beside the rift."],
      ["Mount Kilimanjaro", "Kilimanjaro is a volcano."],
      ["The Matobo Hills", "The Matobo Hills are granite hills shaped by weathering."],
    ],
    answer: "A",
    explanation: "The **Atlas Mountains** (and the older Cape Fold Mountains) are African fold mountains.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which lake lies in the western branch of the East African Rift Valley?",
    options: [
      ["Lake Tanganyika", "Correct: a long, very deep rift lake."],
      ["Lake Victoria", "Lake Victoria lies in a shallow basin between the two branches."],
      ["Lake Chad", "Lake Chad lies in a basin in the Sahel, far from the rift."],
      ["Lake Kariba", "Lake Kariba is a man-made lake on the Zambezi."],
    ],
    answer: "A",
    explanation: "**Lake Tanganyika** fills part of the western rift; rift lakes are long, narrow and deep.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Fossil sea shells are found in rocks near the top of the Himalayas. What does this show?",
    options: [
      ["The rocks formed on a sea floor and were later folded and uplifted", "Correct: fold mountains form from compressed sea-floor sediments."],
      ["The sea once rose higher than the tops of the Himalayas and then fell again", "Sea level has never been that high; the rocks rose, not the sea."],
      ["Volcanoes threw sea shells onto the mountain tops", "Volcanoes do not carry shells; the shells are part of the rock layers."],
      ["Birds carried the shells up from the coast", "The fossils are inside the rock layers, not lying on top."],
    ],
    answer: "A",
    explanation: "Sediments laid down in a sea between India and Asia were squeezed and pushed up by the collision.",
    hints: ["Where do sea shells live?", "How can sea-floor rock end up high on land?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A river in a granite area follows a long, perfectly straight valley across the landscape. Which explanation is most likely?",
    options: [
      ["It follows a fault where shattered rock eroded easily", "Correct: a fault-line valley."],
      ["It was formed by folding of the granite layers long ago", "Granite is not layered and does not fold into valleys like this."],
      ["It lies on top of a block mountain", "Block mountains are high blocks, not valleys."],
      ["It is a seif dune corridor carved by wind", "Seif dunes are sand ridges in deserts, not river valleys."],
    ],
    answer: "A",
    explanation: "Rock broken along a fault is weak, so rivers erode it quickly, forming a straight **fault-line valley**.",
    hints: ["What makes a line of weakness in rock?", "Straight valleys are a clue."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fictional plateau surface lies at 1,720 m and the floor of a rift valley beside it at 1,085 m. What is the height of the escarpment between them?",
    value: 635, unit: "m",
    wrong: [2805, 735],
    explanation: "1,720 − 1,085 = 635 m.",
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "A rock layer 12 km long is compressed into folds so that it now covers a horizontal distance of 7.5 km. By what percentage has the crust been shortened?",
    value: 37.5, unit: "%", tol: 0.05,
    wrong: [62.5, 4.5],
    explanation: "Shortening = 12 − 7.5 = 4.5 km; 4.5 ÷ 12 × 100 = 37.5 %.",
    workedSolution: "1. Shortening = 12 − 7.5 = 4.5 km.\n2. Percentage = 4.5 ÷ 12 × 100.\n3. = 37.5 %.",
    hints: ["Find how much shorter the layer is.", "Divide by the original length."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the landform formed when a block of land is left standing high between two faults.",
    accepted: ["block mountain", "a block mountain", "horst", "a horst", "block mountains", "horst block"],
    wrong: ["rift valley"],
    explanation: "A **block mountain (horst)**, e.g. the Ruwenzori.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about faulting.",
    template: "A crack along which rocks have moved is a {{blank:a}}. Tension produces {{blank:b}} faults, compression produces {{blank:c}} faults, and horizontal movement occurs along {{blank:d}} faults.",
    blanks: [
      { id: "a", accepted: ["fault"], wrong: "joint" },
      { id: "b", accepted: ["normal"], wrong: "reverse" },
      { id: "c", accepted: ["reverse", "thrust"], wrong: "normal" },
      { id: "d", accepted: ["tear", "strike-slip", "strike slip", "transform", "transcurrent"], wrong: "normal" },
    ],
    explanation: "Fault: movement along a crack. Normal (tension), reverse (compression), tear (sideways).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each landform to the way it forms.",
    pairs: [
      ["Rift valley", "Block sinks between parallel faults"],
      ["Block mountain", "Block left high between faults"],
      ["Fold mountains", "Sea-floor layers compressed and uplifted"],
      ["Fault-line valley", "River erodes shattered rock along a fault"],
    ],
    explanation: "Faulting and folding produce distinct landforms.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: the middle Zambezi valley in Zimbabwe is a trough bounded by faults, with the Zambezi escarpment on its southern side.",
    answer: true,
    feedbackTrue: "Correct: it is a faulted trough; Lake Kariba lies in part of it.",
    feedbackFalse: "The middle Zambezi valley is a faulted trough with the steep Zambezi escarpment on its southern edge.",
    explanation: "Blocks of crust sank between faults; the river later flowed along the trough.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how fold mountains are formed.",
    points: [
      "Sediments are deposited in layers on the floor of a sea between plates",
      "Plates move together, compressing the sediments",
      "Layers are folded (anticlines and synclines) and uplifted into mountains",
    ],
    modelAnswer: "Sediment builds up in layers on a sea floor between two plates. As the plates move together, the layers are squeezed and buckled into anticlines and synclines and pushed upwards to form fold mountains.",
    explanation: "Deposition, compression, folding and uplift.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** ways in which the East African Rift Valley is useful to people.",
    points: [
      "Rift lakes provide fish and water",
      "Developed: e.g. Lake Tanganyika / Lake Malawi fisheries support many communities",
      "Volcanic soils / geothermal energy / tourism",
      "Developed: e.g. fertile soils on volcano slopes for farming / geothermal power in Kenya / wildlife and scenery attract tourists",
    ],
    modelAnswer: "The deep rift lakes such as Tanganyika and Malawi provide fish and water for millions of people living around them. The volcanoes along the rift have given fertile soils for farming, and in Kenya underground heat is used for geothermal power.",
    explanation: "Two uses, each developed.",
    hints: ["Think about the lakes and the volcanoes.", "Develop each point with an example."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Describe the formation of a rift valley and assess its advantages and disadvantages for people, with reference to a named example.",
    points: [
      "Tension pulls crust apart; parallel normal faults form",
      "Central block sinks, leaving steep escarpments and a flat floor (or compression theory as an alternative)",
      "Named example, e.g. East African Rift / mid-Zambezi valley",
      "Advantages: lakes for fishing and water, fertile volcanic soils, geothermal power, tourism, HEP",
      "Disadvantages: earthquakes and volcanoes; escarpments hinder transport; valley floors can be hot and dry",
      "Judgement weighing advantages and disadvantages",
    ],
    levels: geographyLevels(6),
    modelAnswer: "A rift valley forms when tension pulls the crust apart. Two roughly parallel normal faults develop and the block between them sinks, leaving a flat floor with steep escarpments on each side. The East African Rift formed in this way as the African plate began to split. People benefit from its deep lakes, such as Tanganyika and Malawi, which supply fish and water; from fertile volcanic soils; from geothermal power in Kenya; and from tourism. However, the rift has earthquakes and active volcanoes such as Nyiragongo, and the steep escarpments make roads and railways costly. Overall the advantages are greater for most people, as the hazards affect smaller areas while the lakes and soils support millions, but the risks need careful management.",
    explanation: "Credit a clear formation sequence, named example and balanced assessment.",
    hints: ["Start with the force and the faults.", "Weigh benefits against hazards."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 describes a west-east cross-section across a fictional faulted valley.\n\n${SECTION}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the height of the western escarpment (from Q to R).", value: 540, unit: "m", wrong: [560], explanation: "1,520 − 980 = 540 m." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the width of the valley floor from R to T.", value: 38, unit: "km", wrong: [44], explanation: "44 − 6 = 38 km." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the average gradient of the western escarpment from Q to R, as 1 in *n*. Give *n* to the nearest whole number.", value: 4, prefix: "1 in", tol: 0.5, wrong: [0.27], explanation: "Horizontal distance = 2 km = 2,000 m; vertical drop = 540 m; 2,000 ÷ 540 = 3.7, so about 1 in 4." }),
      P.mcq({ label: "(d)", marks: 1, stem: "What is this landform?", options: [
        ["A rift valley", "Correct: a wide, flat-floored valley between two fault escarpments."],
        ["A block mountain", "A block mountain stands high; here the central block is low."],
        ["A syncline", "A syncline is a fold; the sides here are fault lines."],
        ["A fault-line valley", "A fault-line valley follows one fault; this valley lies between two."],
      ], answer: "A", explanation: "Two faults with a sunken block between them: a rift valley." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how this valley may have formed.", points: [
        "Tension pulled the crust apart",
        "Two roughly parallel normal faults developed at Q and U",
        "The block between them sank, leaving steep escarpments and a flat floor",
      ], modelAnswer: "Tension stretched the crust, forming two parallel normal faults at Q and U. The block between them sank, leaving steep escarpments on each side and a wide flat floor where a lake later formed.", explanation: "Force, faults, movement." }),
    ],
    hints: ["Subtract heights for (a) and distances for (b).", "Gradient = vertical ÷ horizontal, in the same units."],
    explanation: "Practice in interpreting a cross-section of a faulted valley.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A student describes a road cutting (fictional): 'Layers of sandstone and shale are bent upwards into an arch in the middle of the cutting. On the right-hand side the layers are steeper than on the left. At the far right, a crack cuts across the layers, and the layers on the far side of it are about 3 m lower than on the near side.'",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of fold shaped like an arch.", accepted: ["anticline", "an anticline"], wrong: ["syncline"], explanation: "An arch-shaped upfold is an anticline." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Since one limb is steeper than the other, the fold is best described as:", options: [
        ["asymmetrical", "Correct: unequal limbs show stronger pressure from one side."],
        ["simple", "A simple fold has limbs of similar slope."],
        ["recumbent", "A recumbent fold lies almost flat."],
        ["a nappe", "A nappe has broken and moved along a thrust."],
      ], answer: "A", explanation: "Unequal limb angles = asymmetrical fold." }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify the feature at the far right and state what the 3 m represents.", points: [
        "A fault",
        "The 3 m is the throw (vertical displacement) of the fault",
      ], modelAnswer: "It is a fault, a crack along which the rocks moved; the 3 m drop is the throw.", explanation: "Movement along a crack = fault; vertical movement = throw." }),
      P.manual({ label: "(d)", marks: 2, stem: "Name the force that produced the fold, and suggest what force produced the fault if the far side slipped down.", points: [
        "Compression produced the fold",
        "Tension (a normal fault) if the far side slipped down",
      ], modelAnswer: "The fold was produced by compression; a block slipping down suggests a normal fault caused by tension.", explanation: "Folding: compression. Down-slipping block: normal fault, tension." }),
    ],
    hints: ["Arch = upfold.", "Which force makes a block drop?"],
    explanation: "Practice in identifying folds and faults from field observations.",
  });

  b.card("DEFINITION", "Fold", "A bend in rock layers produced by compression; upfolds are anticlines, downfolds are synclines.");
  b.card("DEFINITION", "Fault", "A fracture in the crust along which the rocks on either side have moved.");
  b.card("CONCEPT", "Compression and tension", "Compression pushes rocks together (folds, reverse faults); tension pulls them apart (normal faults).");
  b.card("CONCEPT", "Types of fold", "Simple → asymmetrical → overfold → recumbent → overthrust fold (nappe), as compression increases.");
  b.card("CONCEPT", "Types of fault", "Normal (tension, block slips down), reverse (compression, block pushed up and over), tear (horizontal movement).");
  b.card("DEFINITION", "Rift valley (graben)", "A long, steep-sided valley where a block has sunk between two parallel faults, e.g. the East African Rift Valley.");
  b.card("DEFINITION", "Block mountain (horst)", "A block left standing high (or pushed up) between two faults, e.g. the Ruwenzori.");
  b.card("FACT", "Faulting in Zimbabwe", "The middle Zambezi valley is a faulted trough with the Zambezi escarpment on its southern side; Lake Kariba lies in part of it.");
  b.card("VOCABULARY", "Throw", "The vertical distance a block has moved along a fault.");
});
