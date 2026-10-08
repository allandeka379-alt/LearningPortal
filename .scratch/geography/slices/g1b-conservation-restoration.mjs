// Slice G1b: ecosystems — conserving and restoring ecosystems (ZIMSEC 7.3.4).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.ecosystems.conservation-restoration", { file: "ecosystems/conservation-restoration", keyPrefix: "ecosystems.conservation-restoration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **fireguard**?",
    options: [
      ["A strip cleared of grass so a fire cannot spread across it", "Correct: without fuel, the fire stops at the strip."],
      ["A tall tower from which rangers watch the veld for smoke", "That is a lookout, not a fireguard."],
      ["A team of people who put out veld fires", "That is a fire-fighting team."],
      ["A law that bans burning in the dry season", "Laws help, but a fireguard is a physical strip of land."],
    ],
    answer: "A",
    explanation: "A fireguard is a strip of land cleared of grass and other fuel, made early in the dry season, that a fire cannot cross.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a **biogas digester** help conserve woodland?",
    options: [
      ["It gives cooking fuel from dung, so less firewood is cut", "Correct: it replaces wood as a fuel."],
      ["It makes newly planted trees grow much faster", "Biogas slurry can be used as fertiliser, but the main benefit is replacing firewood."],
      ["It stops veld fires from spreading", "Biogas has no effect on fire spread."],
      ["It turns firewood into charcoal", "Biogas is made from dung and plant waste, not by charring wood."],
    ],
    answer: "A",
    explanation: "Biogas (mainly methane) is made by rotting cattle dung in a sealed digester. Families can cook with it instead of firewood, reducing deforestation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which measure deals **directly** with overgrazing on communal land?",
    options: [
      ["Destocking to the carrying capacity", "Correct: fewer animals reduce grazing pressure."],
      ["Building check dams in gullies", "Check dams repair erosion damage, not its grazing cause."],
      ["Using solar cookers", "Solar cookers reduce firewood demand, not grazing."],
      ["Planting a eucalyptus woodlot", "A woodlot supplies fuel; it does not reduce grazing pressure."],
    ],
    answer: "A",
    explanation: "Destocking (reducing livestock numbers) and rotational grazing tackle overgrazing directly by matching animal numbers to what the grass can support.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are fires late in the dry season (September to October) usually more damaging than early fires?",
    options: [
      ["The grass is very dry, so the fires burn hotter", "Correct: dry fuel burns at high temperatures and kills trees."],
      ["There is more rain to spread the flames", "Rain does not spread fire; it is dry then."],
      ["Animals are hibernating underground", "Hibernation is not the reason; the fuel is the reason."],
      ["Fireguards are only made late in the season", "Fireguards are made early in the dry season."],
    ],
    answer: "A",
    explanation: "By late in the dry season grass and litter are completely dry and temperatures are high, so fires burn hot and fast, killing young trees and leaving bare soil just before the rains.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A community planted trees on a degraded hillside, but most seedlings died within a year. Which is the **most likely** cause?",
    options: [
      ["Livestock were not kept away from the seedlings", "Correct: browsing and trampling kill young trees."],
      ["The trees were planted on a slope", "Many trees grow well on slopes if protected."],
      ["Too much soil was held by the roots", "Roots holding soil is a benefit, not a cause of death."],
      ["Tree planting always fails in Zimbabwe", "Many tree planting projects succeed when protected and cared for."],
    ],
    hints: ["What usually wanders freely on communal land?"],
    answer: "A",
    explanation: "Restoration fails if the cause of damage continues. Seedlings need protection from livestock (fencing or herding), fire and drought in their first seasons.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In gully reclamation, what is the main purpose of a **check dam**?",
    options: [
      ["To slow the water so it deposits silt and fills the gully", "Correct: trapped silt gradually raises the gully floor."],
      ["To store a large supply of water for cattle in the dry season", "Check dams are small and leaky; they are not reservoirs."],
      ["To divert the gully into a river", "Diversion is done above the gully head, not by check dams."],
      ["To stop rain falling on the gully", "No structure stops rain falling."],
    ],
    hints: ["What happens to the load of a river when it slows down?"],
    answer: "A",
    explanation: "Stones or brushwood across the gully slow the flow, so silt is deposited behind the dam. Over several seasons the gully fills and can be planted with grass.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is an example of **indigenous knowledge** used in conservation?",
    options: [
      ["A taboo on cutting trees in a sacred grove", "Correct: customary rules protect the grove."],
      ["An EMA fine for starting a veld fire", "That is modern legislation."],
      ["A solar cooker bought in town", "That is alternative energy technology."],
      ["A contour ridge marked by an extension officer", "That is a modern soil conservation method."],
    ],
    answer: "A",
    explanation: "Indigenous knowledge systems include taboos, sacred sites and rules enforced by traditional leaders that limit cutting, burning and harvesting.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A grazing area of 720 ha has a carrying capacity of 1 livestock unit per 6 ha (fictional data). What is the largest number of livestock units it can support?",
    value: 120,
    wrong: [4320, 726, 6],
    explanation: "$720 \\div 6 = 120$ livestock units.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A ward grazing scheme covers 1,200 ha. The carrying capacity is 1 livestock unit per 5 ha, but 310 livestock units graze there (fictional data). How many livestock units must be removed to destock to the carrying capacity?",
    value: 70,
    wrong: [240, 62, 550],
    hints: ["First find how many units the land can support.", "Then compare with the number grazing."],
    workedSolution: "1. Carrying capacity = $1\\,200 \\div 5 = 240$ livestock units.\n2. Excess = $310 - 240 = 70$ livestock units.",
    explanation: "The land supports $1\\,200 \\div 5 = 240$ units, so $310 - 240 = 70$ must be removed.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A school planted 450 tree seedlings; 315 were still alive after one year (fictional data). Calculate the survival rate as a percentage.",
    value: 70, unit: "%",
    wrong: [30, 135, 1.43],
    hints: ["Divide the survivors by the number planted and multiply by 100."],
    workedSolution: "1. Survival rate = $\\dfrac{315}{450} \\times 100$.\n2. $= 70\\%$.",
    explanation: "$315 \\div 450 \\times 100 = 70\\%$.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Moving livestock between fenced paddocks so the grass can recover is called {{blank:a}} grazing; reducing livestock numbers is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["rotational"], wrong: "open" },
      { id: "b", accepted: ["destocking"], wrong: "restocking" },
    ],
    explanation: "**Rotational grazing** rests each paddock in turn; **destocking** matches herd size to carrying capacity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each threat to a conservation measure that tackles it.",
    pairs: [
      ["Veld fires", "Fireguards"],
      ["Overgrazing", "Destocking and rotational grazing"],
      ["Cutting trees for cooking fuel", "Biogas and solar cookers"],
      ["Runoff on cultivated slopes", "Contour ridges and terracing"],
    ],
    explanation: "Each measure removes or reduces the cause: no fuel for fire, fewer animals, less demand for wood, slower runoff.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Conservation means that people must never use an ecosystem.",
    answer: false,
    explanation: "False. Conservation means using an ecosystem wisely so it lasts. Keeping it completely untouched is preservation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the largest number of animals that an area of land can support without being damaged.",
    accepted: ["carrying capacity"],
    wrong: ["stocking rate", "population density"],
    explanation: "**Carrying capacity**. If the stocking rate is above it, the land becomes overgrazed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how deforestation and overgrazing together can lead to gully erosion.",
    points: [
      "Cutting trees and overgrazing remove vegetation cover, leaving bare soil",
      "Without roots and litter, rain hits the soil directly and less soaks in",
      "More, faster surface runoff flows downslope, often along cattle tracks",
      "The concentrated runoff cuts rills that deepen into gullies",
    ],
    hints: ["Follow a raindrop falling on bare ground."],
    modelAnswer: "Cutting trees and overgrazing leave the ground bare. Rain then strikes the soil directly and little soaks in, so runoff increases and speeds up, collecting in cattle tracks. The concentrated flow cuts rills that grow into gullies.",
    explanation: "Removing vegetation increases runoff and its erosive power.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Outline **three** steps in reclaiming a gully.",
    points: [
      "Divert runoff / cattle tracks away from the gully head",
      "Build check dams of stones or brushwood to trap silt",
      "Plant grass (e.g. vetiver) and trees and keep livestock out",
    ],
    modelAnswer: "Divert the runoff away from the gully head, build stone check dams to trap silt, then plant vetiver grass and fence out livestock.",
    explanation: "Gully reclamation removes the cause, traps silt and then revegetates the site.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 720,
    stem: "Table 1 shows the area burnt by veld fires in a fictional district over five years and whether fireguards were made.\n\n| Year | Area burnt (ha) | Fireguards made? |\n| --- | --- | --- |\n| 1 | 5,600 | No |\n| 2 | 6,100 | No |\n| 3 | 3,200 | Yes |\n| 4 | 2,900 | Yes |\n| 5 | 2,400 | Yes |",
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "Calculate the mean area burnt in the two years **without** fireguards.",
        value: 5850, unit: "ha",
        explanation: "$(5\\,600 + 6\\,100) \\div 2 = 5\\,850$ ha.",
      }),
      P.num({
        label: "(b)",
        marks: 2,
        stem: "Calculate the percentage decrease in area burnt from year 2 to year 5. Give your answer to the nearest whole number.",
        value: 61, unit: "%", tol: 0.5, answer: "61",
        explanation: "Decrease = $6\\,100 - 2\\,400 = 3\\,700$ ha. Percentage = $3\\,700 \\div 6\\,100 \\times 100 = 60.7\\% \\approx 61\\%$.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Describe the trend shown in the table.",
        points: [
          "Area burnt was high (above 5,000 ha) in years 1-2 without fireguards",
          "It fell sharply in year 3 and continued to fall to 2,400 ha in year 5 once fireguards were made",
        ],
        modelAnswer: "The area burnt rose slightly from 5,600 to 6,100 ha in the first two years, then fell sharply to 3,200 ha when fireguards were introduced and kept falling to 2,400 ha by year 5.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Suggest **three** reasons, other than fireguards, why the area burnt may have fallen.",
        points: [
          "Awareness campaigns / community education about fire",
          "Fines or enforcement under environmental law",
          "Different weather (wetter years, less fuel dryness) or more fire-fighting teams / earlier controlled burning",
        ],
        modelAnswer: "Awareness campaigns may have reduced careless burning, fines may have deterred people from starting fires, and wetter years may have left the grass less dry.",
      }),
    ],
    hints: ["Percentage decrease = decrease ÷ original × 100."],
    explanation: "The data suggest fireguards helped, but other factors may also explain the fall, so a geographer would be cautious about the cause.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540,
    stem: "Read this description (fictional). *Around a growth point, woodland within 5 km has been cut for firewood and to clear new fields. Cattle graze the bare hillsides, and two gullies now reach the main road. The local dam is filling with silt.*",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What is the most likely source of the silt in the dam?",
        options: [
          ["Topsoil eroded from the bare hillsides and gullies", "Correct: eroded soil is carried by runoff to the dam."],
          ["Sand blown in from a desert", "There is no desert source here."],
          ["Waste thrown away by the growth point's shops and market", "Shop waste is not the main source of silt."],
          ["Weathering of the dam wall", "A dam wall does not produce much silt."],
        ],
        answer: "A",
        explanation: "Runoff from bare land carries eroded soil downstream, where it settles in the still water of the dam (siltation).",
      }),
      P.manual({
        label: "(b)",
        marks: 4,
        stem: "Describe **two** measures that would reduce the demand for firewood, and explain how each helps.",
        points: [
          "Measure 1 named, e.g. biogas digesters / solar cookers / fuel-efficient stoves / woodlots",
          "How it helps: replaces or reduces wood burnt",
          "Measure 2 named (different)",
          "How it helps",
        ],
        modelAnswer: "Fuel-efficient stoves burn less wood for the same cooking, so fewer trees are cut. A community woodlot of fast-growing trees supplies firewood, so people stop cutting the natural woodland.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Suggest how the hillsides could be restored.",
        points: [
          "Keep livestock off / fence or rotational grazing / destock",
          "Reseed grass and plant trees",
          "Contour ridges, terraces or check dams to slow runoff and trap soil",
        ],
        modelAnswer: "Fence the hillsides to keep cattle off, reseed them with grass and plant trees, and build contour ridges and check dams to slow runoff.",
      }),
    ],
    hints: ["Deal with the causes of damage first, then repair it."],
    explanation: "Restoration must tackle both the causes (fuel demand, grazing) and the damage (bare slopes, gullies).",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the measures used to conserve ecosystems in communal areas of Zimbabwe.",
    points: [
      "Fireguards and controlled burning: cheap, effective if maintained, but need labour every year",
      "Tree planting and woodlots: restore cover and supply fuel, but seedlings need protection and water",
      "Alternative energy (biogas, solar): reduces wood demand but has high start-up costs / needs cattle for biogas",
      "Destocking and rotational grazing: tackle overgrazing, but cattle are wealth and status, so unpopular",
      "Legislation (EMA): sets rules and fines, but enforcement is hard in remote areas",
      "Indigenous knowledge: respected by communities and low cost, but weakening in some areas",
      "Community involvement improves success",
      "Reasoned conclusion on which combination works best",
    ],
    levels: geographyLevels(8),
    hints: ["For each measure, give a strength and a weakness.", "End with a judgement."],
    wordLimit: { max: 400 },
    modelAnswer: "Fireguards are cheap and effective, but they must be cleared every year and many communities lack the labour. Tree planting restores cover and woodlots supply fuel, yet many seedlings die if livestock and fire are not controlled. Biogas and solar cookers cut firewood demand, but the start-up cost is high and biogas needs a steady supply of dung. Destocking tackles overgrazing directly, but cattle are wealth and status, so owners resist it; rotational grazing is more acceptable. Laws enforced by EMA set clear rules, but officers cannot patrol every ward. Indigenous rules such as sacred groves are respected and cost nothing, but are weaker where people have moved in recently. Overall no single measure works alone: conservation succeeds where several measures are combined and the community itself agrees the rules and benefits from them.",
    explanation: "Evaluate means weighing strengths and limitations and reaching a judgement.",
  });
  b.card("DEFINITION", "What is **conservation**?", "The careful management and protection of an ecosystem so it can be used without being destroyed, now and in future.");
  b.card("DEFINITION", "What is ecosystem **restoration**?", "Repairing a degraded ecosystem so it returns as closely as possible to its earlier healthy state.");
  b.card("DEFINITION", "What is **carrying capacity**?", "The largest number of animals (or people) an area can support without being damaged.");
  b.card("CONCEPT", "How does a fireguard work?", "A strip cleared of grass and other fuel, made early in the dry season; a fire cannot cross it.");
  b.card("CONCEPT", "Steps in gully reclamation", "Divert runoff from the gully head; build check dams to trap silt; reshape; plant grass and trees; keep livestock out.");
  b.card("FACT", "Alternative energy sources that reduce firewood demand", "Biogas from cattle dung, solar cookers and lighting, fuel-efficient stoves, woodlots.");
  b.card("VOCABULARY", "Destocking", "Reducing the number of livestock to the carrying capacity of the land.");
  b.card("CONCEPT", "Indigenous knowledge systems in conservation", "Customary rules such as sacred groves, taboos on cutting certain trees and seasonal harvesting rules enforced by traditional leaders.");
  b.card("DEFINITION", "Sustainable ecosystem management", "Using an ecosystem to meet present needs without reducing its ability to meet future needs.");
});
