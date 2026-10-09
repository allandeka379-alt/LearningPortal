// Slice G2a: major landforms and the relief of Zimbabwe (ZIMSEC-only concept).
import { concept, P, geographyLevels } from "../lib.mjs";

const TOWNS = "| Place (fictional) | Height (m) | Mean annual temperature (°C) | Mean annual rainfall (mm) |\n|---|---|---|---|\n| Chirima | 1,520 | 18.5 | 850 |\n| Dombo | 1,080 | 21.0 | 690 |\n| Gova | 420 | 25.5 | 480 |\n| Makomo | 2,050 | 15.0 | 1,400 |";

concept("geo.landforms.landscapes", { file: "landforms/landscapes", keyPrefix: "landforms.landscapes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term describes a **single** natural feature of the Earth's surface, such as a hill or a valley?",
    options: [
      ["Landform", "Correct: one feature with a recognisable shape."],
      ["Landscape", "A landscape is the whole scene made of several landforms and what is on them."],
      ["Relief", "Relief describes height and slope differences across an area, not one feature."],
      ["Watershed", "A watershed is a ridge dividing river basins; it is only one kind of feature."],
    ],
    answer: "A",
    explanation: "A **landform** is one feature (a kopje, an escarpment). A **landscape** is the combined view of many landforms with vegetation, rivers and settlements.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **plateau**?",
    options: [
      ["A large area of high land with a fairly flat top", "Correct: high, but broad and gently rolling."],
      ["A narrow ridge of high, peaked mountains", "That describes a mountain range, not a plateau."],
      ["A large area of flat land close to sea level", "Low flat land is a plain."],
      ["A long, steep slope between high and low land", "That is an escarpment."],
    ],
    answer: "A",
    explanation: "A **plateau** is extensive high land with a flat or gently rolling surface, often edged by escarpments. Most of Zimbabwe is a plateau.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the **highest** point in Zimbabwe?",
    options: [
      ["Mount Nyangani", "Correct: about 2,590 m, in the Eastern Highlands."],
      ["The Matobo Hills", "The Matobo Hills are granite hills well below 2,000 m."],
      ["The Great Dyke", "The Great Dyke is a long ridge of igneous rock, much lower than Nyangani."],
      ["The Zambezi escarpment", "The escarpment is a steep slope, not the country's highest summit."],
    ],
    answer: "A",
    explanation: "**Mount Nyangani** (about 2,590 m) in Nyanga, Eastern Highlands, is Zimbabwe's highest point.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did most of Zimbabwe's large towns, such as Harare and Gweru, grow on the highveld?",
    options: [
      ["It is cooler, better watered and gently sloping", "Correct: easy to build on and farm, and healthier than hot valleys."],
      ["It is the lowest and flattest part of the country", "The highveld is the highest part of the plateau, not the lowest."],
      ["It receives the most rain in the country", "The Eastern Highlands are wetter than the highveld."],
      ["It is close to the coast for trade", "Zimbabwe is landlocked; no part is near the coast."],
    ],
    answer: "A",
    explanation: "The highveld's moderate climate, fairly reliable rain, fertile soils and gentle relief favoured farming, railways and towns.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which relief region of Zimbabwe includes the Zambezi valley and the Save-Limpopo lowlands?",
    options: [
      ["The lowveld", "Correct: land below about 900 m."],
      ["The highveld", "The highveld is the high central watershed."],
      ["The middleveld", "The middleveld lies between the highveld and the low valleys."],
      ["The Eastern Highlands", "The Eastern Highlands are mountains along the Mozambique border."],
    ],
    answer: "A",
    explanation: "The **lowveld** (below about 900 m) covers the hot, dry Zambezi valley in the north and the Save-Limpopo lowlands in the south-east.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main role of Zimbabwe's central **watershed**?",
    options: [
      ["It divides the Zambezi basin from the Limpopo and Save basins", "Correct: the high ridge divides the drainage basins."],
      ["It stores water in a large lake for irrigation in the dry season", "That describes a reservoir such as Lake Kariba."],
      ["It marks where the plateau drops into the low Zambezi valley", "That is the Zambezi escarpment."],
      ["It is the area of Zimbabwe that receives the most rainfall", "The wettest area is the Eastern Highlands."],
    ],
    answer: "A",
    explanation: "A **watershed** is a ridge of high ground dividing drainage basins. Zimbabwe's runs roughly SW-NE through Bulawayo, Gweru and Harare.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A dam engineer is looking for a site to store a large volume of water with the shortest possible wall. Which landform is best?",
    options: [
      ["A narrow, deep gorge with a wide valley upstream", "Correct: a short wall closes the gorge and the wide valley behind holds the water."],
      ["A broad, flat plain", "A wall across a plain would be very long and the water shallow."],
      ["The flat top of a plateau far away from any river", "There must be a river to fill the reservoir."],
      ["A steep escarpment face", "Water cannot be held on a steep slope without a valley to contain it."],
    ],
    answer: "A",
    explanation: "Kariba dam was built where the Zambezi passes through the narrow Kariba gorge, with a wide valley upstream to hold the lake.",
    hints: ["Think about the length of the wall.", "Where would the water collect behind it?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the Eastern Highlands is correct?",
    options: [
      ["High rainfall and cool temperatures support tea, coffee and timber plantations", "Correct: altitude and relief rain suit these crops and trees."],
      ["They are low-lying and hot, so they suit irrigated sugar cane", "Sugar cane is grown in the hot south-east lowveld, not the highlands."],
      ["They are flat and dry, so they suit large-scale cattle ranching", "The highlands are steep and the wettest part of Zimbabwe."],
      ["They form the main watershed dividing the Zambezi and Limpopo river basins", "The main watershed runs through the central highveld."],
    ],
    answer: "A",
    explanation: "The Eastern Highlands are high, steep and wet, with plantations of tea, coffee, pine and eucalyptus, and tourism.",
    hints: ["Think of altitude and rainfall.", "Where is sugar cane grown in Zimbabwe?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "On a fictional map, a mountain summit has a spot height of 2,240 m and the valley floor below it is at 385 m. Calculate the difference in height.",
    value: 1855, unit: "m",
    wrong: [2625, 1955],
    explanation: "2,240 − 385 = 1,855 m. This difference is the relief (local relief) of the area.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional valley town at 450 m has a mean annual temperature of 27 °C. Temperature falls by 6.5 °C for every 1,000 m of height. Estimate the mean annual temperature of a plateau town at 1,450 m.",
    value: 20.5, unit: "°C", tol: 0.05,
    wrong: [33.5, 17.6],
    explanation: "Height gained = 1,450 − 450 = 1,000 m, so the temperature falls by 6.5 °C: 27 − 6.5 = 20.5 °C.",
    workedSolution: "1. Height difference = 1,450 − 450 = 1,000 m.\n2. Fall in temperature = 1,000 ÷ 1,000 × 6.5 = 6.5 °C.\n3. Temperature = 27 − 6.5 = 20.5 °C.",
    hints: ["Find the height difference first.", "Higher means cooler, so subtract."],
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "On a fictional escarpment the land rises from 600 m to 1,000 m over a horizontal distance of 2 km. Calculate the average gradient as 1 in *n*.",
    value: 5, prefix: "1 in", tol: 0,
    wrong: [0.2, 400],
    explanation: "Vertical rise = 1,000 − 600 = 400 m; horizontal distance = 2,000 m; 2,000 ÷ 400 = 5, so the gradient is 1 in 5.",
    workedSolution: "1. Vertical interval = 1,000 − 600 = 400 m.\n2. Horizontal equivalent = 2 km = 2,000 m.\n3. Gradient = 400 : 2,000 = 1 : 5, written 1 in 5.",
    hints: ["Use the same units for both distances.", "Gradient = vertical interval ÷ horizontal distance."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of landform described: an isolated, steep-sided hill of hard rock rising abruptly from a flat plain.",
    accepted: ["inselberg", "inselbergs", "an inselberg", "bornhardt", "a bornhardt", "dwala", "a dwala", "island mountain"],
    wrong: ["plateau"],
    explanation: "An **inselberg** ('island mountain'); granite inselbergs are common in Zimbabwe (dwalas or bornhardts are dome-shaped kinds).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of Zimbabwe's relief.",
    template: "Most of Zimbabwe is a high {{blank:a}}. The highest part, above about 1,200 m, is the {{blank:b}}, while land below about 900 m is the {{blank:c}}. The long steep slope between the plateau and the Zambezi valley is the Zambezi {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["plateau"], wrong: "plain" },
      { id: "b", accepted: ["highveld", "high veld"], wrong: "lowveld" },
      { id: "c", accepted: ["lowveld", "low veld"], wrong: "middleveld" },
      { id: "d", accepted: ["escarpment"], wrong: "gorge" },
    ],
    explanation: "Plateau; highveld above about 1,200 m; lowveld below about 900 m; the Zambezi escarpment separates the plateau from the valley.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each landform to a benefit it gives people.",
    pairs: [
      ["Narrow gorge", "Short dam wall for a reservoir and HEP"],
      ["Mountains of the Eastern Highlands", "Cool, wet climate for tea and timber"],
      ["Granite kopje", "Building stone and rock-art sites"],
      ["River flood plain", "Fertile alluvial soil for crops"],
    ],
    explanation: "Each landform's shape and material give a particular use: gorges for dams, highlands for plantations, hills for stone and heritage, flood plains for farming.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false: the highveld of Zimbabwe is a range of steep, peaked mountains.",
    answer: false,
    feedbackFalse: "Correct: the highveld is a plateau, high but gently rolling.",
    feedbackTrue: "No: steep peaked mountains are found in the Eastern Highlands; the highveld is a gently rolling plateau.",
    explanation: "The highveld is the highest part of the central plateau, not a mountain range.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between a **landform** and a **landscape**, giving an example of each.",
    points: [
      "Landform: a single natural feature, e.g. a kopje / escarpment / valley",
      "Landscape: the whole scene of several landforms with vegetation, rivers and settlement, e.g. the Matobo Hills area / the Eastern Highlands",
    ],
    modelAnswer: "A landform is one natural feature, such as a kopje. A landscape is the whole view of an area made up of many landforms with their vegetation, rivers and settlements, such as the granite hills, valleys and villages of the Matobo area.",
    explanation: "The difference is scale: one feature versus the combined scene.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe **two** ways in which steep landforms such as escarpments and mountains can be a disadvantage to people.",
    points: [
      "Transport: roads and railways must zigzag or tunnel, so they are long and expensive",
      "Developed: e.g. the road down the Zambezi escarpment is steep and slow for heavy lorries",
      "Farming: steep slopes have thin soils and erode easily when cleared",
      "Developed: e.g. terracing is needed / landslides after heavy rain, as in Chimanimani in 2019",
    ],
    modelAnswer: "Steep slopes make transport difficult: roads have to zigzag down escarpments, so they are long, costly to build and slow for loaded lorries. Steep land is also hard to farm because soils are thin and wash away once the vegetation is cleared; heavy rain can trigger landslides, as happened in Chimanimani during Cyclone Idai in 2019.",
    explanation: "Two disadvantages, each developed with a reason or example.",
    hints: ["Think about transport and farming.", "Develop each point with a reason or example."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Landforms are more of a benefit than a problem to the people of Zimbabwe.\" To what extent do you agree? Refer to named landforms.",
    points: [
      "Benefit: the highveld plateau gives gentle, cool, well-watered land for towns and farming",
      "Benefit: gorges such as Kariba provide dam sites for water and HEP",
      "Benefit: mountains and hills give tourism (Nyanga, Chimanimani, Matobo, Victoria Falls), plantations and building stone",
      "Problem: escarpments and mountains hinder road and rail building",
      "Problem: steep slopes erode and suffer landslides; low valleys are hot and dry",
      "Judgement, e.g. benefits outweigh problems because most people live on the gentle plateau, but problems are serious locally",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Most Zimbabweans live and farm on the highveld and middleveld plateau, where the gentle relief, cooler climate and fairly reliable rain make building and farming easy, so the main landform is a great benefit. The Kariba gorge gave a site for a dam that supplies hydro-electric power, and the Eastern Highlands, Matobo Hills and Victoria Falls attract tourists, while the highlands also support tea, coffee and timber. However, landforms cause problems. The Zambezi escarpment makes the road to Kariba steep and slow, and the steep slopes of the Eastern Highlands erode easily and suffered landslides during Cyclone Idai in 2019. The low Zambezi and Save valleys are hot and dry, which limits rain-fed farming. Overall I largely agree: the benefits reach most of the population, while the problems are serious but limited to particular areas and can be reduced by careful land use.",
    explanation: "Credit balanced use of named landforms and a supported judgement.",
    hints: ["List benefits and problems with named places.", "End with a judgement that weighs them."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows data for four fictional places in a southern African country.\n\n${TOWNS}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the place most likely to lie in a lowveld region.", accepted: ["Gova"], wrong: ["Dombo"], explanation: "Gova, at 420 m, is the only place well below about 900 m." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the difference in height between the highest and lowest places.", value: 1630, unit: "m", wrong: [1100], explanation: "2,050 − 420 = 1,630 m." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the difference in mean annual temperature between Makomo and Gova.", value: 10.5, unit: "°C", tol: 0.05, wrong: [40.5], explanation: "25.5 − 15.0 = 10.5 °C." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the relationship between height and the two climate figures in Table 1.", points: [
        "As height increases, mean temperature decreases",
        "As height increases, rainfall increases",
        "Uses figures, e.g. Makomo (2,050 m) 15.0 °C and 1,400 mm; Gova (420 m) 25.5 °C and 480 mm",
      ], modelAnswer: "The higher the place, the cooler and wetter it is. Makomo at 2,050 m has 15.0 °C and 1,400 mm, while Gova at 420 m has 25.5 °C and only 480 mm.", explanation: "Two relationships plus supporting figures." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **one** land use suited to Makomo and give a reason.", points: [
        "A suitable use, e.g. tea / coffee / timber plantations / tourism",
        "Reason linked to the data, e.g. high rainfall (1,400 mm) and cool temperatures",
      ], modelAnswer: "Tea estates, because Makomo is cool (15 °C) and very wet (1,400 mm), conditions tea needs.", explanation: "Link the use to the cool, wet climate of high ground." }),
    ],
    hints: ["Compare the height column with the other two.", "Think of Zimbabwe's Eastern Highlands."],
    explanation: "Practice in linking relief to climate and land use.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Read this description of a journey (fictional route, real types of relief).\n\nTendai drove north from a plateau town at about 1,300 m. For 60 km the land was gently rolling, with granite kopjes beside the road. Then the road dropped steeply, in sharp bends, about 700 m in less than 15 km. At the bottom the land was flat, hot and dry, with a wide river and mopane woodland.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which landform did the road descend?", options: [
        ["An escarpment", "Correct: a long steep slope separating high and low land."],
        ["A flood plain", "A flood plain is flat land beside a river, not a steep drop."],
        ["An inselberg", "An inselberg is an isolated hill, not a long slope between two levels."],
        ["A plateau", "The plateau was the high land at the start of the journey."],
      ], answer: "A", explanation: "A drop of about 700 m in less than 15 km between a plateau and a valley floor is an escarpment." }),
      P.num({ label: "(b)", marks: 1, stem: "Estimate the height of the valley floor.", value: 600, unit: "m", tol: 50, wrong: [2000], explanation: "1,300 − 700 = about 600 m." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the road descended in sharp bends.", points: [
        "The slope is too steep for vehicles to drive straight down",
        "Zigzag bends lengthen the route and reduce the gradient",
      ], modelAnswer: "The escarpment is too steep for a road to go straight down, so engineers built bends that make the road longer and its gradient gentler.", explanation: "Bends reduce the gradient." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give **two** differences between the land at the start and at the end of the journey.", points: [
        "Height: high plateau (about 1,300 m) versus low valley floor",
        "Climate or vegetation: cooler with kopjes on the plateau versus hot, dry with mopane woodland and a wide river in the valley",
      ], modelAnswer: "The start was high plateau at about 1,300 m with kopjes; the end was a low valley at about 600 m that was hot and dry with mopane woodland and a wide river.", explanation: "Compare height and one other feature." }),
    ],
    hints: ["What is a long steep slope between two levels called?", "Subtract the drop from the starting height."],
    explanation: "The description matches the descent from the plateau into a valley such as the Zambezi valley.",
  });

  b.card("DEFINITION", "Landform", "A single natural feature of the Earth's surface with a recognisable shape, e.g. a hill, valley, plateau or escarpment.");
  b.card("DEFINITION", "Landscape", "The whole scene of an area: several landforms together with vegetation, rivers and human features.");
  b.card("DEFINITION", "Relief", "The differences in height and the shape (flat, gentle, steep) of the land surface in an area.");
  b.card("DEFINITION", "Escarpment", "A long steep slope separating higher land from lower land, e.g. the Zambezi escarpment.");
  b.card("DEFINITION", "Inselberg", "An isolated, steep-sided hill of hard rock rising abruptly from a plain ('island mountain').");
  b.card("FACT", "Zimbabwe's highest and lowest points", "Mount Nyangani, about 2,590 m (Eastern Highlands); the Runde-Save confluence, about 160 m (south-east lowveld).");
  b.card("CONCEPT", "Zimbabwe's relief regions", "Highveld (above about 1,200 m), middleveld (about 900-1,200 m), lowveld (below about 900 m) and the Eastern Highlands.", "Boundary heights differ between textbooks.");
  b.card("CONCEPT", "Zimbabwe's central watershed", "A ridge of high ground running roughly SW-NE through Bulawayo, Gweru and Harare, dividing rivers flowing to the Zambezi from those flowing to the Limpopo and Save.");
  b.card("CONCEPT", "Benefits of landforms", "Farmland and towns (plateaus), dam sites (gorges), plantations and tourism (highlands), stone and heritage sites (hills), fertile soils (flood plains).");
});
