// W1a: settle.sphere-cbd (ZIMSEC Form 6). Illustrative data; numbers computed in code.
import { concept, P, t, chk, table, breakingPoint, dpStr, geographyLevels } from "../lib.mjs";

const tab = (h, r) => table(h, r);
const bpq = breakingPoint(48, 450000, 50000); // 36
chk(bpq, 36, 1e-9);
const bp2 = breakingPoint(90, 160000, 40000); // 60
chk(bp2, 60, 1e-9);
const blocks = [["P", 1500, 4200, 3300], ["Q", 2700, 3100, 1000], ["R", 1000, 2800, 1300]];
const hi = (b) => b[3] / b[1];
const ii = (b) => (b[3] / b[2]) * 100;
const ped = [["A", 2160], ["B", 1480], ["C", 640], ["D", 230]];

concept("ageo.settle.sphere-cbd", { file: "settle/sphere-cbd", keyPrefix: "settle.sphere-cbd" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the sphere of influence of a town?",
    options: [
      ["The area its customers come from", "Correct: also called its catchment or hinterland."],
      ["The built-up area inside the town boundary", "That is the urban area itself."],
      ["The distance between the town and the capital", "A distance between towns is not a sphere of influence."],
      ["The number of people living in the town", "That is its population."],
    ],
    answer: "A",
    explanation: "The sphere of influence (catchment area, hinterland) is the area served by the town's goods and services.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement about high-order goods such as specialist hospital care is correct?",
    options: [
      ["They have a high threshold and a long range", "Correct: they need a large market and people travel far."],
      ["They have a low threshold and a short range", "That describes low-order goods such as bread."],
      ["They have a low threshold and a long range", "A high-order service needs many customers to survive."],
      ["They have a high threshold and a short range", "People travel a long way for rare, specialised services."],
    ],
    answer: "A",
    explanation: "High-order goods and services need a large population (high threshold) and people are willing to travel far (long range).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Using Reilly's law, where is the breaking point between a large town and a small town?",
    options: [
      ["Nearer to the smaller town", "Correct: the larger town attracts customers from further away."],
      ["Nearer to the larger town", "The larger town's stronger pull pushes the breaking point towards the smaller town."],
      ["Exactly half way between the towns", "This would happen only if the towns were the same size."],
      ["At the border of the district", "Administrative borders do not decide the breaking point."],
    ],
    answer: "A",
    explanation: "A larger population attracts more strongly, so the point of equal attraction lies closer to the smaller town.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A block has a CBHI of 1.8 and a CBII of 42%. Using the rule 'CBHI at least 1 and CBII at least 50%', what is the conclusion?",
    options: [
      ["It is not part of the CBD because the intensity is too low", "Correct: the CBII fails the rule."],
      ["It is part of the CBD because the height index is above 1", "Both conditions must be met."],
      ["It is part of the CBD because the average is above 1", "The two indices are not averaged."],
      ["It is not part of the CBD because the height index is too high", "A higher CBHI makes a block more likely to qualify."],
    ],
    answer: "A",
    explanation: "A block must meet both conditions. A CBII of 42% is below 50%, so it fails.",
    hints: ["Check each condition separately."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which measure is the maximum distance people are prepared to travel to use a service?",
    options: [
      ["Range", "Correct: range is distance."],
      ["Threshold", "Threshold is the minimum market (population) needed."],
      ["Hinterland", "A hinterland is an area, not a distance."],
      ["Breaking point", "A breaking point is the boundary between two towns' areas."],
    ],
    answer: "A",
    explanation: "Range is the distance a customer will travel; threshold is the minimum number of customers needed.",
    hints: ["Which term is a distance?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Pedestrian counts along a street leaving the town centre fall steeply from 1 800 to 300 over 400 m. What does this suggest?",
    options: [
      ["The CBD frame/edge lies within this distance", "Correct: the sharp decline marks the edge of the core."],
      ["The street is outside the town", "Counts alone do not show the town boundary."],
      ["Land values are rising along the street", "Land values normally fall away from the core."],
      ["The street is the peak land value intersection", "The peak is where counts are highest, at the start of the street."],
    ],
    answer: "A",
    explanation: "A steep decline in pedestrian numbers marks the transition from the core to the edge of the CBD.",
    hints: ["Where are counts highest?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which land use is a central business use?",
    options: [
      ["A bank", "Correct: banks, shops and offices are central business uses."],
      ["A family home", "Houses are residential, not central business use."],
      ["A school", "Schools are institutional uses."],
      ["A factory", "Factories are industrial uses."],
    ],
    answer: "A",
    explanation: "Central business uses include shops, banks, offices and restaurants.",
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Town A has 450 000 people and Town B has 50 000. They are 48 km apart. Calculate the distance of the breaking point from Town A, in km, using $d_A = \dfrac{d_{AB}}{1 + \sqrt{P_B/P_A}}$.`,
    value: bpq, unit: "km",
    wrong: [12, 24],
    explanation: t`1. $P_B/P_A = 50\,000/450\,000 = 1/9$.\n2. $\sqrt{1/9} = 1/3$.\n3. $d_A = 48 \div (1 + 1/3) = 48 \div 1.333 = 36$ km.\n4. Giving 12 km is the distance from Town B.`,
    hints: ["Take the square root of the population ratio."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A bakery needs a monthly income of US\\$8400 and the average person spends US\\$12 a month on its products. What is the threshold population?",
    value: 8400 / 12, unit: "people",
    wrong: [100800, 12],
    explanation: "Threshold = income needed ÷ spending per person = 8 400 ÷ 12 = 700 people.",
    hints: ["Divide the income needed by the spending per person."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In a survey of a city block, the ground floor area is 3 000 m² and the floor space in central business uses is 7 200 m². Calculate the Central Business Height Index.",
    value: 7200 / 3000, dp: 1,
    wrong: [0.42, 24],
    explanation: "CBHI = floor space in central business uses ÷ ground floor area = 7 200 ÷ 3 000 = 2.4.",
    hints: ["CBHI is a ratio, not a percentage."],
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A block has 6 500 m² of total floor space, of which 3 900 m² is in central business use. Calculate the Central Business Intensity Index, as a percentage.",
    value: (3900 / 6500) * 100, unit: "%", dp: 0,
    wrong: [0.6, 167],
    explanation: "CBII = (3 900 ÷ 6 500) × 100 = 60%. Dividing the other way gives 167%.",
    hints: ["Divide business floor space by total floor space."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Reilly's breaking point is measured from the smaller of the two towns.",
    answer: false,
    explanation: "False. The usual formula gives the distance from the larger town; the distance from the smaller town is found by subtraction.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the main characteristics of the central business district (CBD) of a Zimbabwean town.",
    points: ["Highest land values and the tallest buildings (multi-storey offices) in the town", "Concentration of shops, banks, offices and public services, with high-order services", "Greatest accessibility and the highest pedestrian and vehicle flows, with few people living there"],
    modelAnswer: "The CBD has the highest land values and the tallest buildings, with multi-storey offices. It has a concentration of shops, banks, offices and public services, including high-order services, and has the greatest accessibility and the highest pedestrian and vehicle flows, with few residents.",
    explanation: "Land value and building height, land uses, and accessibility.",
    hints: ["Think of land values, uses and movement."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Threshold", "Minimum population needed to support a service"],
      ["Range", "Maximum distance people will travel to use a service"],
      ["Breaking point", "Boundary where customers are equally likely to use either of two towns"],
      ["CBHI", "Central business floor space divided by ground floor area"],
    ],
    explanation: "These terms describe demand, distance, competition and CBD height.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "A block is counted as part of the CBD if its CBHI is at least {{blank:a}} and its CBII is at least {{blank:b}}%.",
    blanks: [
      { id: "a", accepted: ["1"], input: "number" },
      { id: "b", accepted: ["50"], input: "number" },
    ],
    explanation: "These are the commonly used thresholds (a project may state others).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term means the minimum number of customers (or income) needed to keep a service in business?",
    accepted: ["threshold", "threshold population", "the threshold"],
    wrong: ["range", "hinterland"],
    explanation: "The **threshold** is the minimum market needed to support a service.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a specialist hospital serves a larger area than a village clinic.",
    points: ["A specialist hospital offers a high-order service with a high threshold", "People are willing to travel a long way for a rare, specialised service (long range)", "A village clinic offers low-order care needed frequently, so people use the nearest one"],
    modelAnswer: "A specialist hospital offers a high-order service that needs a large population to support it, so it is found only in large centres. People are willing to travel far for rare, specialised care, so its range is long. A village clinic offers everyday care that people need often, so they use the nearest.",
    explanation: "Link high threshold and range to the type of service.",
    hints: ["Compare how often each service is needed."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how pedestrian and vehicle counts could be used to find the edge of the CBD.",
    points: ["Count pedestrians and vehicles at a series of points along transects leaving the centre at the same times", "Counts are highest in the core and fall away with distance", "A sharp fall in the counts marks the edge or frame of the CBD"],
    modelAnswer: "Counts of pedestrians and vehicles are made at points along several transects leaving the centre, at the same times of day. The counts are highest in the core and fall with distance, and a sharp drop marks the edge of the CBD.",
    explanation: "Method, pattern and interpretation.",
    hints: ["Counts at the same times along lines from the centre."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest two reasons why the actual sphere of influence of a town may differ from the one predicted by Reilly's law.",
    points: ["Road quality and transport links (a good road extends the range of one town)", "Other factors such as prices, variety of goods and quality of services affect shopping choices", "Physical barriers (rivers, mountains) and political or administrative boundaries", "The law ignores differences in income, car ownership and loyalty"],
    modelAnswer: "A good road or bus service to one town makes it easier to reach, extending its sphere beyond what its size and distance predict. Reilly's law also ignores prices, variety and quality of goods, and barriers such as rivers, so people may choose a town for reasons other than size and distance.",
    explanation: "Any two valid reasons, each explained.",
    hints: ["Reilly's law uses only population and distance."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Town A (population 160 000) and Town B (population 40 000) lie on the same main road, 90 km apart (illustrative data).`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the distance of the breaking point from Town A, in km.", value: bp2, unit: "km", wrong: [30, 45], explanation: t`$40\,000/160\,000 = 0.25$; $\sqrt{0.25} = 0.5$; $90 \div 1.5 = 60$ km.` }),
      P.num({ label: "(b)", marks: 1, stem: "State the distance of the breaking point from Town B, in km.", value: 30, unit: "km", wrong: [60], explanation: "90 − 60 = 30 km." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the breaking point is nearer to Town B.", points: ["Town A is four times as large and so has a stronger pull on customers", "Its customers come from further away, pushing the breaking point towards the smaller town"], modelAnswer: "Town A is four times larger, so it has a stronger pull and attracts customers from further away, which pushes the breaking point towards Town B." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how a new tarred road improving access to Town B would affect its sphere of influence.", points: ["Faster, cheaper travel increases the range customers will travel to B", "The breaking point moves towards A and B's sphere of influence expands"], modelAnswer: "A new tarred road makes travel to Town B quicker and cheaper, so people will travel further to use it and its sphere of influence expands, moving the breaking point towards Town A." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain two reasons why planners need to know the sphere of influence of a town.", points: ["To decide where to site services such as clinics, schools or banks so that enough people can use them", "To plan transport links and bus routes to the areas served", "To help businesses to estimate their market and to decide on investment/growth point policy"], modelAnswer: "Planners need it to decide where to put services such as clinics or schools so that enough people can reach them, and to plan roads and bus routes to the areas served. It also helps businesses to estimate their market." }),
      P.manual({ label: "(f)", marks: 2, stem: "State two limitations of Reilly's law.", points: ["It uses only population and distance and ignores prices, choice and quality of services", "It ignores barriers (rivers, hills), road quality and loyalty or income differences"], modelAnswer: "It uses only population and distance, ignoring prices, choice and quality of services, and it ignores barriers such as rivers and the quality of roads." }),
    ],
    explanation: "Reilly's breaking point and its interpretation and limits.",
    hints: ["Divide the distance by 1 + √(P_B/P_A)."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`Students surveyed three city blocks to delimit the CBD. Areas are in m² (illustrative data).\n\n${tab(["Block", "Ground floor area", "Total floor space", "Central business floor space"], blocks.map((b2) => [b2[0], b2[1], b2[2], b2[3]]))}\n\nThe rule is: CBHI at least 1 and CBII at least 50%.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the CBHI of Block P, to one decimal place.", value: hi(blocks[0]), dp: 1, wrong: [78.6], explanation: "3 300 ÷ 1 500 = 2.2." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the CBII of Block R, as a percentage to one decimal place.", value: ii(blocks[2]), dp: 1, unit: "%", wrong: [1.4, 140], explanation: "1 300 ÷ 2 800 × 100 = 46.4%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which blocks are in the CBD?", options: [["P only", "Correct: P meets both rules."], ["P and R", "R fails the intensity rule."], ["P and Q", "Q fails both rules."], ["All three blocks", "Only P meets both rules."]], answer: "A", explanation: "P: CBHI 2.2, CBII 78.6%. Q: CBHI 0.4, CBII 32.3%. R: CBHI 1.3, CBII 46.4%." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why Block R is excluded although its CBHI is above 1.", points: ["Both conditions must be met", "Its CBII (46.4%) is below 50%, so less than half its floor space is in central business use"], modelAnswer: "Both conditions must be met. Block R's CBII is 46.4%, below 50%, so less than half its floor space is in central business use." }),
      P.manual({ label: "(e)", marks: 2, stem: "Describe how pedestrian counts would help to check the boundary.", points: ["Counts should be highest in the CBD blocks and fall in blocks outside", "A sharp fall between blocks supports the position of the boundary / R may show intermediate (frame) counts"], modelAnswer: "Counts should be highest in the CBD blocks and lower outside them, and a sharp fall between blocks would support the boundary. Block R may show intermediate counts if it is part of the CBD frame." }),
    ],
    explanation: "CBHI and CBII calculations and interpretation against a stated rule.",
    hints: ["Divide business floor space by ground floor area for the CBHI."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the usefulness of Reilly's breaking point for planning where to locate a new government clinic between two towns. [8]",
    points: [
      "Gives a quick, calculated estimate of the area each town serves",
      "Uses simple data (population and distance) that planners can obtain easily",
      "Helps to identify places between the towns that are poorly served and need a new clinic",
      "Population estimates may be out of date or ignore daily visitors",
      "Ignores road quality, transport costs, quality of services and tradition",
      "Ignores barriers such as rivers or hills and the pattern of settlement (population may be concentrated near one town)",
      "A clinic is a government service so patients may be directed regardless of distance and need depends on health data, not retail attraction",
      "Judgement: a helpful first estimate of catchments, which must be combined with travel-time maps, population distribution and health data",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Reilly's breaking point gives a quick estimate of the area each town serves using easily obtained data on population and distance, and shows places between the towns that may be poorly served. However, it was designed for retail shopping and ignores road quality, travel costs, barriers such as rivers and the real distribution of settlements, and population figures may be out of date. A government clinic's catchment depends on health needs and travel time rather than retail attraction. Overall it is a useful first step, but it must be combined with travel-time maps, population distribution and health data before a site is chosen.",
    wordLimit: { max: 300 },
    explanation: "Uses and limitations followed by a judgement.",
    hints: ["What data does the formula use, and what does a clinic's catchment really depend on?"],
  });

  b.card("DEFINITION", "Sphere of influence?", "The area from which people come to use a centre's goods and services (catchment, hinterland).");
  b.card("DEFINITION", "Threshold and range?", "Threshold: minimum population/income to support a service. Range: maximum distance people travel to use it.");
  b.card("FORMULA", "Reilly's breaking point from the larger town?", t`$d_A = \dfrac{d_{AB}}{1 + \sqrt{P_B/P_A}}$`, "It lies nearer the smaller town.");
  b.card("FORMULA", "Central Business Height Index (CBHI)?", "Central business floor space ÷ ground floor area (a ratio).");
  b.card("FORMULA", "Central Business Intensity Index (CBII)?", "Central business floor space ÷ total floor space × 100 (a percentage).");
  b.card("FACT", "Common CBD rule from the indices?", "A block is CBD if CBHI ≥ 1 and CBII ≥ 50%.");
  b.card("CONCEPT", "How do pedestrian and vehicle counts delimit the CBD?", "Counts are highest in the core and fall away; a sharp drop marks the edge (frame).");
  b.card("CONCEPT", "Low-order versus high-order goods?", "Low-order: low threshold, short range (bread). High-order: high threshold, long range (specialist hospital).");
  b.card("CONCEPT", "Limits of Reilly's law?", "Uses only population and distance; ignores prices, choice, road quality, barriers and income.");
});
