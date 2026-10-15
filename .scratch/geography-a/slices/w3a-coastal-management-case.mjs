// W3a: coastal.management-case (Cambridge only, A Level Paper 3 option 8). Holderness facts are general and dated (see the lesson); data tables are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const costM = chk((3500 * 900) / 1e6, 3.15, 1e-9);
const bcr = rnd(2.52 / 3.15, 1, 0.8, "bcr");
const timeYrs = chk(66 / 2.2, 30, 1e-9);
const nourish = chk(600 * 25 * 1.2 * 9, 162000, 1e-6);
// Struct 1: three schemes
const SCH = [["Sea wall", 1500, 8.4, 11.2], ["Rock armour", 900, 2.7, 2.16], ["Beach nourishment", 1100, 1.6, 2.24]];
const SCHTAB = tbl(["Scheme", "Length (m)", "Cost (US\\$ million)", "Value of property protected (US\\$ million)"], SCH.map((r) => [r[0], String(r[1]).replace(/(\d)(?=(\d{3})$)/, "$1 "), r[2].toFixed(1), r[3].toFixed(2)]));
const bcrWall = rnd(11.2 / 8.4, 2, 1.33, "bcrWall");
const bcrArmour = rnd(2.16 / 2.7, 2, 0.8, "bcrArmour");
const bcrNour = rnd(2.24 / 1.6, 2, 1.4, "bcrNour");
// Struct 2: erosion rates before and after groynes
const ER = [["Site P (updrift of the groynes)", 1.8, 1.7], ["Site Q (village protected by the groynes)", 1.9, 0.2], ["Site R (1 km downdrift)", 1.8, 3.1], ["Site S (3 km downdrift)", 1.7, 2.4]];
const ERTAB = tbl(["Site", "Erosion before groynes (m per year)", "Erosion after groynes (m per year)"], ER.map((r) => [r[0], r[1].toFixed(1), r[2].toFixed(1)]));
const incR = rnd(3.1 - 1.8, 1, 1.3, "incR");
const dropQ = rnd(((1.9 - 0.2) / 1.9) * 100, 1, 89.5, "dropQ");

concept("ageo.coastal.management-case", { file: "coastal/management-case", keyPrefix: "coastal.management-case", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which of these is an example of hard engineering?", [
    ["A sea wall", "Correct: it is a rigid structure to resist wave attack."],
    ["Beach nourishment", "Beach nourishment is soft engineering."],
    ["Dune fencing", "Dune stabilisation is a soft engineering method."],
    ["Managed retreat", "Managed retreat is a soft approach that gives up some land."],
  ], "Sea walls, groynes, rip-rap and revetments are **hard engineering**.");
  mc(b, 2, "UNDERSTANDING", "What is the main disadvantage of building groynes on a coast with strong longshore drift?", [
    ["They trap sediment and starve the coast further downdrift", "Correct: erosion often increases beyond the last groyne."],
    ["They cause the beach in front of them to become narrower", "Groynes usually widen the beach where they are built."],
    ["They allow waves to pass over them with no effect at all", "Groynes interrupt the drift."],
    ["They increase the amount of sediment arriving from the cliffs", "Groynes do not add sediment."],
  ], "Groynes interrupt longshore drift, so sediment is held back **updrift**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is the Holderness coast so vulnerable to erosion?", [
    ["Its cliffs are of soft clay and face long-fetch North Sea waves", "Correct: weak rock and powerful waves combine."],
    ["Its cliffs are of hard granite that is full of joints", "The cliffs of Holderness are of soft clay, not granite."],
    ["Its beaches are very wide and protect the foot of every cliff", "The beaches are often narrow, so the cliffs are exposed."],
    ["It lies in a sheltered bay and has very little wave energy", "It is exposed to the North Sea."],
  ], "Boulder clay is weak, and the **North Sea fetch** brings large waves.");
  mc(b, 3, "ANALYSIS", "What is managed retreat?", [
    ["Allowing land to flood or erode and moving defences inland", "Correct: a deliberate choice that creates a buffer."],
    ["Building a sea wall and planting grass on top of it", "That is hard engineering."],
    ["Adding sand to a beach each year to keep it wide", "That is beach nourishment."],
    ["Moving all the people away from a coast with no other action", "Managed retreat is planned and involves changing the line of defence."],
  ], "Managed retreat gives up land in order to create a **buffer** and reduce costs.", { hints: ["It is a deliberate decision, not a failure to act."] });
  mc(b, 3, "ANALYSIS", "A scheme has a benefit–cost ratio of 0.6. What does this suggest?", [
    ["The cost is greater than the value of what it protects", "Correct: a ratio below 1 means that the scheme is poor value."],
    ["The scheme is worth building because the ratio is positive", "A ratio below 1 is not good value."],
    ["The scheme protects more than it costs, so it should proceed", "That would need a ratio above 1."],
    ["The scheme has no cost and is free of environmental impact", "The ratio does not show environmental effects."],
  ], "A benefit–cost ratio **below 1** means that the cost exceeds the benefit.", { hints: ["Benefit ÷ cost: is it greater than 1?"] });
  mc(b, 3, "ANALYSIS", "Why might a Shoreline Management Plan choose 'no active intervention' for a stretch of coast with few buildings?", [
    ["Defences would cost more than the value of what they protect", "Correct: economic justification is a key test."],
    ["Erosion cannot happen on a coast with few buildings", "Erosion happens anywhere there is wave attack."],
    ["Sea walls are illegal in all parts of the coastline", "They are used where justified."],
    ["Sediment from the cliffs is not needed in the sediment cell", "Cliff erosion supplies sediment, so it is useful."],
  ], "Where the value protected is low, **defences are not cost-effective**.", { hints: ["Think about the cost-benefit test."] });
  mc(b, 2, "UNDERSTANDING", "Which statement about beach nourishment is correct?", [
    ["It must be repeated because the added sand is gradually lost", "Correct: waves and drift remove the material over time."],
    ["It is permanent and never needs repeating once it is placed", "Nourished beaches need regular top-ups."],
    ["It reduces wave energy by building a concrete barrier", "Nourishment is soft engineering without a wall."],
    ["It works only on cliffs of hard rock and not on sandy shores", "It is used on sandy and shingle beaches."],
  ], "Nourishment is **soft engineering** and needs repeating.");

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Managed realignment can create new intertidal habitat such as saltmarsh.", answer: true,
    feedbackTrue: "Correct: allowing the sea to flood land behind a breached defence creates habitat.", feedbackFalse: "Not so: managed realignment does create habitat as the land floods at high tide.",
    explanation: "Flooded farmland can become **saltmarsh and mudflat**." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each coastal management method to its description.",
    pairs: [
      ["Sea wall", "Large curved concrete wall at the back of the beach"],
      ["Rip-rap", "Large rocks piled at the foot of a cliff or wall"],
      ["Groynes", "Barriers built out across the beach to trap drifting sediment"],
      ["Beach nourishment", "Sand or shingle added to widen the beach"],
      ["Managed retreat", "Defence removed or set back so the land floods"],
    ], explanation: "The first three are hard engineering and the last two are soft." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Rock groynes, sea walls and rip-rap are examples of {{blank:a}} engineering. A plan that sets policies for a length of coast is a Shoreline {{blank:b}} Plan. A comparison of cost and benefit is a {{blank:c}} analysis.",
    blanks: [
      { id: "a", accepted: ["hard"], choices: ["hard", "soft", "natural"] },
      { id: "b", accepted: ["Management"], choices: ["Management", "Mitigation", "Measurement"] },
      { id: "c", accepted: ["cost–benefit"], choices: ["cost–benefit", "risk–reward", "supply–demand"] },
    ], explanation: "Hard engineering; Shoreline Management Plan; cost–benefit analysis." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of coastal management in which a sea wall is breached or removed so that the sea can flood land behind it.",
    accepted: ["managed retreat", "managed realignment", "realignment", "retreat"], explanation: "**Managed retreat** (managed realignment) allows controlled flooding." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "US$ million",
    stem: "A sea wall 900 m long costs US\\$3 500 per metre (illustrative data). Calculate the total cost, in US\\$ million.",
    hints: ["Cost per metre × length, then divide by 1 000 000."],
    value: costM, dp: 2, wrong: [3150, 0.00315, 4400],
    explanation: "900 × 3 500 = 3 150 000, which is **US\\$3.15 million**. The value 3 150 is in thousands of dollars." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "The property protected by the sea wall is worth US\\$2.52 million, and the wall costs US\\$3.15 million (illustrative data). Calculate the benefit–cost ratio, to one decimal place.",
    hints: ["Benefit ÷ cost."],
    value: bcr, dp: 1, wrong: [1.3, 0.63, 5.67],
    explanation: "2.52 ÷ 3.15 = **0.8**. The value 1.3 divides cost by benefit (3.15 ÷ 2.52). A ratio below 1 means that the cost is greater than the benefit." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A house stands 66 m from a cliff edge that is retreating at an average of 2.2 m per year (illustrative data). How many years before the cliff reaches the house, at a constant rate?",
    hints: ["Distance ÷ rate."],
    value: timeYrs, wrong: [145, 0.033],
    explanation: "66 ÷ 2.2 = **30 years**. The value 145 multiplies the two numbers." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "A beach 600 m long is to be widened by 25 m and raised by an average of 1.2 m. Sand costs US\\$9 per m³ delivered (illustrative data). Calculate the cost of the scheme, in US\\$.",
    hints: ["Find the volume first (length × width × depth)."],
    value: nourish, wrong: [18000, 1458000],
    explanation: "1. Volume = 600 × 25 × 1.2 = 18 000 m³.\n2. Cost = 18 000 × 9 = **US\\$162 000**. The value 18 000 is the volume." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the physical characteristics of the Holderness coast that make it vulnerable to erosion.",
    points: [
      "The cliffs are of soft boulder clay (glacial till), which is weak and easily eroded and fails by slumping when saturated.",
      "It is exposed to the North Sea, with a long fetch that allows large waves.",
      "Storm surges raise water levels and bring waves to the foot of the cliff, and longshore drift removes the eroded material southwards.",
    ],
    modelAnswer: "The cliffs are of soft boulder clay, which is weak and slumps when saturated. The coast is exposed to the North Sea, with a long fetch that allows large waves. Storm surges raise the water level, and longshore drift removes the eroded material to the south.",
    explanation: "Weak rock, powerful waves and surges." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why coastal defences in one place can increase erosion elsewhere.",
    hints: ["Use the idea of the sediment cell and longshore drift."],
    points: [
      "Many coasts are linked in a sediment cell, where longshore drift carries sediment from one stretch to the next.",
      "Groynes, sea walls and rock armour trap sediment or stop cliff erosion, which is a source of sediment.",
      "The coast downdrift therefore receives less sediment, so its beaches shrink and offer less protection.",
      "Waves reach the cliffs there with more energy, so erosion increases (for example, near Cowden after the Mappleton scheme).",
    ],
    modelAnswer: "Coasts are linked in a sediment cell, where longshore drift carries sediment from one stretch to the next. Groynes and sea walls trap sediment or stop cliff erosion, which is a source of sediment. The coast downdrift therefore receives less sediment, so its beaches shrink and protect the cliffs less. Waves then reach the cliffs with more energy, and erosion increases, as reported near Cowden after the Mappleton scheme.",
    explanation: "Defences interrupt the sediment supply to the downdrift coast." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 4,
    stem: "Assess the advantages and disadvantages of managed retreat compared with a sea wall.",
    hints: ["Cost, habitat, people, sustainability."],
    points: [
      "Managed retreat is cheaper in the long term, because it avoids repeatedly building and repairing hard defences.",
      "It creates habitat such as saltmarsh, which absorbs wave energy and stores carbon.",
      "But it means giving up land and may require compensation, and owners and communities often oppose it.",
      "Judgement: sustainable where the value of land is low, while sea walls remain justified to protect dense, valuable settlements.",
    ],
    modelAnswer: "Managed retreat is cheaper in the long term because it avoids repeatedly building and repairing hard defences, and it creates habitat such as saltmarsh, which absorbs wave energy. But it means giving up land, may need compensation and is often opposed by owners. It is sustainable where the value of land is low, while sea walls remain justified to protect dense, valuable settlements.",
    explanation: "Weigh cost and sustainability against loss of land." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why local people may disagree with the policy of 'no active intervention' on part of a coast.",
    hints: ["Think about homes, farms and compensation."],
    points: [
      "Homeowners and farmers will lose land, property and income, and may not be able to sell or insure their homes.",
      "Compensation is often limited or not available, so owners bear the cost.",
      "Local people may value the landscape, roads and tourism that the coast supports, and fear that the community will decline.",
    ],
    modelAnswer: "Homeowners and farmers will lose land, property and income, and may not be able to sell or insure their homes. Compensation is often limited, so owners bear the cost. People may also fear that tourism and the community will decline.",
    explanation: "Loss of property, lack of compensation and community decline." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A council compares three schemes for one stretch of coast (illustrative data, invented for this exercise).\n\n${SCHTAB}`,
    hints: ["Benefit–cost ratio = value of property protected ÷ cost.", "Think about what a cost–benefit ratio leaves out."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the benefit–cost ratio for the sea wall, to two decimal places.", value: bcrWall, dp: 2, wrong: [0.75, 2.8, 5600],
        explanation: "11.2 ÷ 8.4 = 1.33. The value 0.75 divides cost by benefit (8.4 ÷ 11.2)." }),
      P.manual({ label: "(b)", marks: 3, stem: "Use benefit–cost ratios to compare the three schemes.",
        points: [
          "Beach nourishment has the highest ratio (1.40), followed by the sea wall (1.33), so both are justified because their benefits exceed their costs.",
          "Rock armour has a ratio of 0.80, below 1, so its cost is greater than the value protected, and it is the poorest value.",
          "Judgement: on cost alone, nourishment is the best choice, and rock armour should not go ahead unless other benefits are counted.",
        ],
        modelAnswer: "Beach nourishment has the highest ratio (1.40), followed by the sea wall (1.33), so both are justified because the benefit exceeds the cost. Rock armour has a ratio of 0.80, below 1, so its cost is greater than the value protected. On cost alone nourishment is the best choice, and rock armour should not go ahead unless other benefits are counted.",
        explanation: "Compare ratios against 1 and against each other." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the council should not decide using the ratios alone.",
        points: [
          "The ratio ignores environmental effects, for example on the sediment supply to other parts of the coast and on habitats.",
          "It ignores sustainability: nourishment needs repeating, and rising sea level will increase the cost of all schemes in the future.",
          "It ignores social effects and fairness: who benefits and who loses, and the value of land that is not counted in money, such as heritage or recreation.",
        ],
        modelAnswer: "The ratio ignores environmental effects, such as the effect on the sediment supply to other parts of the coast and on habitats. It ignores sustainability, because nourishment must be repeated and rising sea level will increase the cost of every scheme. It also ignores social effects and fairness, such as who benefits and who loses, and the value of heritage or recreation.",
        explanation: "Environmental, sustainability and social considerations." }),
    ], explanation: "Calculate and compare benefit–cost ratios and evaluate their limits." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A rock groyne scheme was built to protect a village on a coast with strong longshore drift towards the south. Erosion rates at four sites before and after the scheme are shown (illustrative data, invented for this exercise).\n\n${ERTAB}`,
    hints: ["Change = after − before.", "Which direction does the sediment travel, and what do groynes do to it?"],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the change in the rate of erosion at Site R after the groynes, in metres per year (use a plus sign for an increase).", value: incR, dp: 1, wrong: [-1.3, 4.9, 1.7],
            explanation: "3.1 − 1.8 = +1.3 m per year. The value −1.3 reverses the subtraction." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What was the percentage fall in the rate of erosion at the village (Site Q), to the nearest 0.1%?", options: [
            ["89.5%", "Correct: (1.9 − 0.2) ÷ 1.9 × 100 = 89.5%."],
            ["10.5%", "This is the percentage that remains (0.2 ÷ 1.9)."],
            ["1.7%", "This is the fall in m per year, not a percentage."],
            ["850%", "This divides the fall by the final rate (1.7 ÷ 0.2)."],
          ], answer: "A", explanation: "Fall = 1.7 m per year, which is 1.7 ÷ 1.9 × 100 = 89.5%." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why erosion increased at Sites R and S after the groynes were built.",
        points: [
          "The groynes trapped the sediment carried south by longshore drift, so less reached the coast downdrift.",
          "With less sediment, the beaches at R and S became narrower and lower, so they gave less protection to the cliffs.",
          "Waves with more energy reached the base of the cliffs, which eroded faster (more at R, close to the groynes).",
        ],
        modelAnswer: "The groynes trapped the sediment carried south by longshore drift, so less reached the coast downdrift. The beaches at R and S became narrower and lower and protected the cliffs less. Waves with more energy reached the base of the cliffs, which eroded faster, more at R, which is close to the groynes.",
        explanation: "Interrupted drift starved the downdrift beaches." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest ways in which the increase in erosion downdrift could be reduced.",
        points: [
          "Nourish the beaches downdrift with sand or shingle (or bypass sediment from the updrift side).",
          "Build defences such as rock armour or revetments downdrift, although these have costs and may move the problem further along.",
          "Plan the defences for the whole sediment cell, including shorter or notched groynes, and compensate people who lose land.",
        ],
        modelAnswer: "The downdrift beaches can be nourished with sand or shingle, or sediment can be bypassed from the updrift side. Defences such as rock armour can be built downdrift, but these cost money and may move the problem further along. Planning should cover the whole sediment cell, with shorter or notched groynes, and people who lose land should be compensated.",
        explanation: "Restore the sediment supply, defend selectively and plan for the whole cell." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess how successful the scheme has been.",
        points: [
          "It was successful at the village, where erosion fell by 89.5% (from 1.9 to 0.2 m per year).",
          "But erosion increased downdrift (by 1.3 m per year at R and 0.7 m per year at S), so other people suffer.",
          "Judgement: successful locally but unsatisfactory as a whole, because it moves the problem, so its overall success depends on whether the downdrift losses are less valuable than the gains.",
        ],
        modelAnswer: "The scheme was successful at the village, where erosion fell by 89.5% from 1.9 to 0.2 m per year. But erosion increased downdrift, by 1.3 m per year at R and 0.7 m per year at S, so other people suffer. It is successful locally but unsatisfactory as a whole, because it moves the problem, and its overall success depends on whether the downdrift losses are worth less than the gains.",
        explanation: "Weigh the local gain against the downdrift loss." }),
    ], explanation: "Calculate changes in erosion, explain the downdrift effect and assess the scheme." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which hard engineering is a sustainable way of managing a coastline you have studied.",
    hints: ["Name the coast and the schemes.", "Use cost, sediment effects and rising sea level as criteria."],
    points: [
      "Names a coast and its schemes (for example Holderness: sea walls at Hornsea and Withernsea, rock groynes and revetment at Mappleton, 1991).",
      "Hard engineering protects valuable places effectively in the short and medium term (towns, the gas terminal).",
      "It is costly to build and maintain, and many sections cannot be justified economically where little is at stake.",
      "It interrupts the sediment supply and can increase erosion elsewhere, as reported near Cowden after Mappleton, so it moves the problem.",
      "It gives a false sense of security and encourages development in areas of risk.",
      "Rising sea level and stronger storm surges will increase the costs and may overwhelm the defences.",
      "Soft approaches such as managed realignment (for example at Medmerry, 2013) or nourishment work with natural processes and may be more sustainable, but they sacrifice land or need repeating.",
      "Judgement: hard engineering is sustainable only in limited places where the value protected is high and the effects on the cell are managed; a mixed policy is more sustainable.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "On the Holderness coast, sea walls at Hornsea and Withernsea and the rock groynes and revetment at Mappleton (1991) have protected towns and a village effectively in the short and medium term. However, hard engineering is costly to build and maintain, and many stretches cannot be justified economically. It interrupts the sediment supply and can move the problem: erosion near Cowden is reported to have increased after the Mappleton scheme. It can give a false sense of security, and rising sea level and stronger surges will increase the cost and may overwhelm the defences. Soft approaches such as managed realignment, as at Medmerry in 2013, work with natural processes and may be more sustainable, but they give up land. I conclude that hard engineering is sustainable only where the value protected is high and effects on the sediment cell are managed, so a mixed policy is more sustainable.",
    wordLimit: { max: 300 }, explanation: "Judge hard engineering on cost, side effects and the future, using a named coast." });

  b.card("DEFINITION", "Hard engineering", "Structures that resist wave attack, such as sea walls, groynes, rip-rap (rock armour) and revetments.");
  b.card("DEFINITION", "Soft engineering", "Working with natural processes: beach nourishment, dune stabilisation and managed retreat.");
  b.card("DEFINITION", "Managed retreat (realignment)", "Deliberately allowing the sea to flood or erode land and moving the line of defence inland; it can create habitat such as saltmarsh.");
  b.card("DEFINITION", "Shoreline Management Plan", "A plan that sets a policy for each stretch of coast in a sediment cell: hold the line, advance the line, managed realignment or no active intervention.");
  b.card("FACT", "Holderness coast", "About 60 km from Flamborough Head to Spurn Head; soft boulder-clay cliffs, a long North Sea fetch, retreat of about 1.8 m a year, and longshore drift to the south.");
  b.card("FACT", "Mappleton scheme (1991)", "Two rock groynes and a rock revetment protected the village; the beach grew, but erosion further down the drift near Cowden is reported to have increased.");
  b.card("FACT", "Medmerry, West Sussex (2013)", "Managed realignment: new embankments set back inland, so the sea floods farmland and creates intertidal habitat.");
  b.card("CONCEPT", "Judging a coastal scheme", "Cost against benefit, effect on the sediment cell and downdrift coast, sustainability with rising sea level, and fairness to people and habitats.");
  b.card("FORMULA", "Benefit–cost ratio", "Benefit–cost ratio = value protected ÷ cost; a value above 1 means the benefit exceeds the cost.");
});
