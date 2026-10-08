// Slice G1b: resources — wildlife management, human-wildlife conflict and CAMPFIRE (ZIMSEC 7.4.3).
import { concept, P, geographyLevels } from "../lib.mjs";

const CONFLICT =
  "Table 1: reported incidents of crop raiding by elephants in a fictional ward next to a national park (fictional data).\n\n| Year | 1 | 2 | 3 | 4 |\n| --- | --- | --- | --- | --- |\n| Incidents | 124 | 138 | 186 | 152 |\n| Rainfall (mm) | 610 | 540 | 390 | 580 |";

concept("geo.resources.wildlife-campfire", { file: "resources/wildlife-campfire", keyPrefix: "resources.wildlife-campfire" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is Zimbabwe's largest national park?",
    options: [
      ["Hwange", "Correct: in the north-west, famous for elephants."],
      ["Matobo", "Matobo is a smaller park of granite hills near Bulawayo."],
      ["Mana Pools", "Mana Pools is on the Zambezi floodplain; it is smaller than Hwange."],
      ["Nyanga", "Nyanga is a highland park in the east."],
    ],
    answer: "A",
    explanation: "Hwange National Park, in the north-west near Victoria Falls, is the largest national park in Zimbabwe.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does CAMPFIRE stand for?",
    options: [
      ["Communal Areas Management Programme for Indigenous Resources", "Correct: started in 1989."],
      ["Commercial Animal Management Plan for International Revenue", "This is not the programme's name."],
      ["Community Agricultural Marketing Programme for Irrigated Regions", "CAMPFIRE is about natural resources, not crop marketing."],
      ["Conservation Agency for Mammals, Parks, Forests and Rivers in the East", "This is not a real organisation's name."],
    ],
    answer: "A",
    explanation: "CAMPFIRE is the Communal Areas Management Programme for Indigenous Resources.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of a **problem animal** rather than mainly a dangerous animal?",
    options: [
      ["A troop of baboons that raids maize fields", "Correct: it damages crops but rarely threatens life."],
      ["A crocodile in a river where people collect water", "A crocodile threatens human life: dangerous."],
      ["A lion that has attacked a herder", "A lion attacking people is dangerous."],
      ["A buffalo that charges people on a path", "A charging buffalo threatens life: dangerous."],
    ],
    answer: "A",
    explanation: "Problem animals damage crops, livestock or property; dangerous animals threaten human life. Baboons raiding crops are problem animals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did CAMPFIRE give rural district councils authority over wildlife on communal land?",
    options: [
      ["So communities that bear the costs of wildlife also receive the benefits", "Correct: the idea is benefit sharing."],
      ["So councils could turn all communal land into national parks", "Communal land stayed communal; parks are separate."],
      ["So that all hunting in Zimbabwe would be banned", "Hunting is the main source of CAMPFIRE income."],
      ["So that wildlife could be removed from communal areas", "The aim is to manage and benefit from wildlife, not remove it."],
    ],
    answer: "A",
    explanation: "Before CAMPFIRE, people living with wildlife suffered crop and livestock losses but gained little. CAMPFIRE returns wildlife income to these communities.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which activity has provided **most** of CAMPFIRE's income?",
    options: [
      ["Trophy (safari) hunting", "Correct: especially of elephant and buffalo."],
      ["Selling firewood from communal woodland", "Firewood is not a major CAMPFIRE income source."],
      ["Commercial cattle ranching", "Cattle are not managed under CAMPFIRE."],
      ["Mining gold in communal areas", "Mining is not part of CAMPFIRE."],
    ],
    answer: "A",
    explanation: "Most CAMPFIRE income has come from safari operators paying for hunting concessions and trophy fees.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do elephant raids on crops near parks usually increase in drought years?",
    options: [
      ["Food and water in the park are scarce, so elephants move out", "Correct: animals range further to survive."],
      ["Farmers plant far more crops in drought years to make up losses", "Farmers usually plant less in drought."],
      ["Elephants breed much faster when the weather is dry", "Breeding rates do not jump in drought."],
      ["Park fences are made stronger in drought years", "Stronger fences would reduce raids."],
    ],
    answer: "A",
    hints: ["What does an elephant need every day?"],
    explanation: "In drought, grazing, browse and water in the park run short, so elephants roam into farmland where crops and water are found.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **biggest** threat to the sustainability of CAMPFIRE income?",
    options: [
      ["Heavy dependence on trophy hunting, which international rules can restrict", "Correct: a single income source is risky."],
      ["Too many tourists visiting the communal areas every single year", "Most CAMPFIRE areas receive few tourists."],
      ["Wildlife numbers growing too slowly to be seen", "Slow growth is not the main threat to income."],
      ["Schools and clinics being built with CAMPFIRE money", "Schools are a benefit, not a threat."],
    ],
    answer: "A",
    hints: ["Where does most of the money come from?"],
    explanation: "Because most income comes from hunting, bans or import restrictions on trophies, or a fall in hunting demand, can sharply cut CAMPFIRE income.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sport hunting is allowed in Zimbabwe's national parks.",
    answer: false,
    explanation: "False. National parks are for conservation and photographic tourism; controlled hunting takes place in safari areas and on some communal and private land.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Gonarezhou National Park is part of the Great Limpopo Transfrontier Park shared with South Africa and Mozambique.",
    answer: true,
    explanation: "True. Gonarezhou links with Kruger National Park (South Africa) and Limpopo National Park (Mozambique).",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `${CONFLICT}\n\nCalculate the mean number of incidents per year.`,
    value: 150,
    wrong: [600, 155],
    explanation: "Total = 124 + 138 + 186 + 152 = 600; mean = $600 \\div 4 = 150$ incidents per year.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional district earned US\\$240,000 from CAMPFIRE in one year. 55% went to the wards, which shared it equally among 3,000 households. How many US dollars did each household receive?",
    value: 44,
    wrong: [80, 132000],
    hints: ["First find 55% of the total.", "Then divide by the number of households."],
    workedSolution: "1. Ward share = 0.55 × 240,000 = US\\$132,000.\n2. Per household = 132,000 ÷ 3,000 = US\\$44.",
    explanation: "$0.55 \\times 240\\,000 = 132\\,000$; $132\\,000 \\div 3\\,000 = 44$ dollars per household.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each national park to its description.",
    pairs: [
      ["Hwange", "largest park, north-west, large elephant herds"],
      ["Gonarezhou", "south-east Lowveld, red sandstone cliffs on the Runde"],
      ["Mana Pools", "Zambezi floodplain below Kariba, World Heritage Site"],
      ["Matobo", "granite hills south of Bulawayo, rock art and rhinos"],
    ],
    explanation: "Each park has a distinctive location and attraction.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Neighbouring private ranches that combine their land for wildlife form a {{blank:a}}; areas where controlled sport hunting is allowed are called {{blank:b}} areas.",
    blanks: [
      { id: "a", accepted: ["conservancy"], wrong: "sanctuary" },
      { id: "b", accepted: ["safari"], wrong: "recreational" },
    ],
    explanation: "Conservancies (e.g. in the Lowveld) join private land; safari areas allow controlled hunting.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** ways in which farmers can protect their fields from elephants.",
    points: [
      "Chilli fences / burning chilli and dung to irritate elephants",
      "Beehive fences / noise such as drums and tins / lights",
      "Electric fences / guarding fields at night / planting crops elephants dislike / moving fields away from corridors",
    ],
    modelAnswer: "Farmers can hang chilli-greased cloth on fences, burn bricks of chilli and dung, and string beehives along the field edge, because elephants avoid chilli and bees.",
    explanation: "Each method must be a different deterrent or barrier.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** problems of wildlife management in Zimbabwe's national parks.",
    points: [
      "Poaching for ivory, rhino horn or bushmeat",
      "Threatens species / needs costly anti-poaching patrols",
      "Too many elephants in some parks / drought",
      "Destroys trees and habitat / animals die or move out in search of water",
    ],
    hints: ["Give the problem, then its effect."],
    modelAnswer: "Poaching for ivory and rhino horn threatens species and forces parks to pay for expensive patrols. In some parks elephant numbers are high, so they push over and strip trees, damaging habitat for other species, especially in drought.",
    explanation: "Each problem earns one mark and its explanation a second.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: CONFLICT,
    parts: [
      P.short({
        label: "(a)",
        stem: "In which year were incidents highest?",
        accepted: ["Year 3", "3", "three"],
        wrong: ["Year 2"],
        explanation: "Year 3 had 186 incidents.",
      }),
      P.num({
        label: "(b)",
        marks: 1,
        stem: "Calculate the percentage increase in incidents from Year 1 to Year 3.",
        value: 50, unit: "%",
        explanation: "$(186 - 124) \\div 124 \\times 100 = 50\\%$.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Describe the relationship between rainfall and incidents shown in Table 1.",
        points: [
          "Incidents are highest when rainfall is lowest / an inverse (negative) relationship",
          "Uses figures, e.g. 186 incidents in Year 3 with only 390 mm",
        ],
        modelAnswer: "There is an inverse relationship: the driest year (Year 3, 390 mm) had the most incidents (186), and wetter years had fewer.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Explain this relationship.",
        points: [
          "In dry years grass, browse and water in the park are scarce",
          "So elephants move out of the park in search of food and water",
          "Crops and water points in nearby fields attract them, so raids increase",
        ],
        modelAnswer: "In a dry year food and water in the park run short, so elephants range outside it. The ward's green crops and water points attract them, so raids increase.",
      }),
    ],
    hints: ["Compare each year's rainfall with its incidents."],
    explanation: "Drought pushes wildlife out of parks and increases conflict with farmers.",
  });
  b.struct({
    d: 3, skill: "EVALUATION", secs: 660,
    stem: "Read this description of a fictional CAMPFIRE ward.\n\n*Last year the ward received US\\$18,000 from hunting and US\\$6,000 from a community campsite. It built a classroom block and repaired two boreholes. Some households say they lost more maize to elephants and baboons than the value of the projects they gained. Next year the hunting quota for elephants will be cut.*",
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "What percentage of the ward's income came from hunting?",
        value: 75, unit: "%",
        explanation: "$18\\,000 \\div 24\\,000 \\times 100 = 75\\%$.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "State **two** benefits of CAMPFIRE for this ward.",
        points: [
          "A new classroom block / better education",
          "Repaired boreholes / water supply / income from the campsite",
        ],
        modelAnswer: "The ward built a classroom block and repaired two boreholes.",
      }),
      P.manual({
        label: "(c)",
        marks: 6,
        stem: "Discuss whether CAMPFIRE is sustainable in this ward.",
        points: [
          "Gives income and projects, so people value wildlife and may poach less",
          "Most income (75%) comes from hunting, so the cut in the quota will reduce income",
          "Crop losses may exceed benefits, so households may turn against wildlife",
          "The campsite shows income can be diversified (photographic tourism, crafts)",
          "Problem animal control / fences could reduce losses",
          "A reasoned judgement about sustainability",
        ],
        levels: geographyLevels(6),
        modelAnswer: "CAMPFIRE has brought a classroom and working boreholes, which encourages people to value wildlife. However, 75% of the income comes from hunting, so the cut in the elephant quota will reduce income sharply. If households lose more maize than they gain in projects, they may support poaching or killing problem animals. The campsite shows that income can be diversified, and better problem animal control could reduce losses. CAMPFIRE can be sustainable here only if income is diversified and more of the benefit reaches the households that suffer crop losses.",
      }),
    ],
    hints: ["Hunting income ÷ total income × 100."],
    explanation: "CAMPFIRE's sustainability depends on stable, diversified income and on benefits outweighing the costs of living with wildlife.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "With reference to a named district, discuss the benefits and problems of the CAMPFIRE programme.",
    points: [
      "Names a district (e.g. Nyaminyami, Kariba; or Guruve) and explains why CAMPFIRE was set up",
      "Explains how income is earned (mainly trophy hunting; some tourism)",
      "Benefit: community projects such as schools, clinics, boreholes, grinding mills",
      "Benefit: people value wildlife, poaching may fall, habitat conserved on marginal land",
      "Problem: income varies with hunting quotas, tourism and international restrictions",
      "Problem: money retained by councils / small payments per household",
      "Problem: crop and livestock losses continue; population growth reduces habitat",
      "Judgement on whether benefits outweigh problems",
    ],
    levels: geographyLevels(8),
    hints: ["Name a district and specific projects.", "Weigh benefits against problems."],
    wordLimit: { max: 400 },
    modelAnswer: "CAMPFIRE was set up in 1989 so that communities living with wildlife on communal land would benefit from it. Nyaminyami, on the southern shore of Lake Kariba, was one of the first districts. Its land is hot, dry and poor for crops but rich in elephant and buffalo, so the council sold hunting concessions to safari operators. Income paid for schools, clinics and water supplies and for problem animal control, and people began to see wildlife as an asset rather than only a pest, which helps reduce poaching and conserve habitat. However, income depends heavily on trophy hunting and varies with quotas, tourism and international restrictions. Some money was kept by the council, and payments shared among many households were small compared with crops lost to elephants. Growing populations also put pressure on wildlife habitat. Overall CAMPFIRE has brought real benefits, but it is sustainable only if income is diversified and reaches the households that bear the costs.",
    explanation: "A strong answer uses a named district, weighs benefits against problems and reaches a judgement.",
  });
  b.card("VOCABULARY", "Problem animal vs dangerous animal", "Problem: damages crops, livestock or property (baboons, bushpigs, elephants raiding fields). Dangerous: threatens human life (lions, crocodiles, buffalo, hippos).");
  b.card("FACT", "What is CAMPFIRE?", "The Communal Areas Management Programme for Indigenous Resources (from 1989): councils and communities manage wildlife on communal land and receive the income.");
  b.card("FACT", "Early CAMPFIRE districts", "Nyaminyami (Kariba) and Guruve joined first, in 1989.");
  b.card("FACT", "Four Zimbabwean national parks", "Hwange (largest, north-west), Gonarezhou (south-east, Great Limpopo TFP), Mana Pools (Zambezi floodplain, World Heritage Site), Matobo (granite hills, rhinos).");
  b.card("VOCABULARY", "National park, safari area, conservancy", "Park: conservation and photographic tourism, no hunting. Safari area: controlled hunting. Conservancy: neighbouring private ranches combined for wildlife.");
  b.card("CONCEPT", "Causes of human-wildlife conflict", "Settlement near parks and corridors, fields near water, drought pushing animals out, broken fences, growing animal numbers.");
  b.card("CONCEPT", "Solutions to human-wildlife conflict", "Problem animal control, chilli and beehive fences, electric fences, kraaling livestock, land-use planning, compensation, benefit sharing.");
  b.card("CONCEPT", "Threats to CAMPFIRE's sustainability", "Dependence on trophy hunting, international restrictions, money not reaching households, crop losses, habitat loss to settlement.");
});
