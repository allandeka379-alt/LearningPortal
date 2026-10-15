// W4a: urban.structure-change (ZIMSEC Form 6; Cambridge AS). Illustrative data; numbers computed in code.
import { concept, P, t, chk, rnd, table, geographyLevels, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const T = [[0, 1800, 20], [0.5, 900, 10], [1.5, 450, 5], [3, 220, 3], [6, 90, 2], [10, 40, 1]];
const fall3 = ((1800 - 220) / 1800) * 100; // 87.78
const ratio = chk(2400 / 120, 20, 1e-9);
const fallA = chk(((2400 - 300) / 2400) * 100, 87.5, 1e-9);
const tabT = table(["Distance from CBD (km)", "Land value (US\\$ per m²)", "Average building height (storeys)"], T);
const H = [["Inner city", 88], ["High-density suburbs", 384], ["Medium-density suburbs", 216], ["Low-density suburbs", 112]];
chk(sum(H.map((h) => h[1])), 800);
const pctHigh = chk((384 / 800) * 100, 48, 1e-9);
const pctLow = chk((112 / 800) * 100, 14, 1e-9);
const R = [["Central business district", 82, 55], ["Suburban shopping centres", 18, 45]];
const ppChange = chk(45 - 18, 27);
const tabR = table(["Location of retail floor space", "2000 (% of city total)", "2020 (% of city total)"], R);
const timesSub = chk(45 / 18, 2.5, 1e-9);

concept("ageo.urban.structure-change", { file: "urban/structure-change", keyPrefix: "urban.structure-change" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Where is land value usually highest in a city?",
    ok: ["At the most accessible point in the CBD", "Correct: the peak land value intersection."],
    bad: [["At the edge of the city", "Land is cheapest at the edge."], ["In the older inner-city industrial area near the railway", "Land values there are lower than in the CBD."], ["In the low-density suburbs", "Large stands and lower accessibility mean lower land values."]],
    explanation: "Accessibility is greatest in the centre, so the highest land values are in the CBD.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which model suggests that land use spreads outwards in wedges along main roads and railways?",
    ok: ["Hoyt's sector model", "Correct: zones extend along transport routes."],
    bad: [["Burgess's concentric zone model", "That model shows rings around the CBD."], ["Reilly's law", "Reilly's law is about retail catchments."], ["Christaller's central place model", "That model is about the spacing of settlements."]],
    explanation: "Hoyt (1939) showed that high-income and industrial uses extend outwards along transport routes in sectors.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do large factories often locate on the edge of a city rather than in the centre?",
    ok: ["Land is cheaper and there is space for large single-storey buildings and good road access", "Correct: space and cost are key."],
    bad: [["The centre has no roads, no railway and no room for any trucks to enter the factory yards at all", "The centre is well served by roads."], ["Workers refuse to travel to the centre", "Workers commute to the centre."], ["Factories need the highest land values", "Factories cannot pay the highest rents."]],
    explanation: "Manufacturing needs a lot of space and cannot pay the high rents of the centre.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement best describes the vertical structure of a city?",
    ok: ["Buildings are tallest in the CBD and become lower towards the suburbs", "Correct: high land values lead to intensive use and tall buildings in the centre."],
    bad: [["Buildings are tallest at the edge of the city", "Edge land is cheap and buildings are low."], ["All buildings in the city have the same height, whatever the land value", "Heights vary with land value."], ["The CBD has only single-storey buildings", "The CBD has the tallest buildings."]],
    explanation: "Costly land in the centre leads to multi-storey buildings, while cheaper land in the suburbs is used less intensively.",
    hints: ["Link height to land value."],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which change best explains why some CBD shops close while suburban malls grow?",
    ok: ["Higher car and minibus use, cheaper land with parking, and customers living in the suburbs", "Correct: access and customer location changed."],
    bad: [["Fewer people have money to spend", "The pattern is a change in location, not just total spending."], ["Malls are always located in the CBD", "The malls are in the suburbs in this example."], ["Planning laws prevent shops from opening in the suburbs and force all traders to stay in the centre", "Suburban shops are allowed."]],
    explanation: "Decentralisation of retail is caused by transport change, land cost, parking, location of customers, investment and competition.",
    hints: ["Where do the customers now live, and how do they travel?"],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is meant by place identity?",
    ok: ["The character of a place as seen and valued by the people who live in or use it", "Correct: it is about meaning and perception."],
    bad: [["The legal boundary of a municipality as drawn on the planning map by the council", "That is an administrative boundary."], ["The number of people living in a place", "That is population."], ["The land value of a district", "That is an economic measure."]],
    explanation: "Place identity is the character that people give to a place, shaped by experience, history and perception, and it may differ between groups.",
    hints: ["It is about how people see a place."],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Land value is US\\$2 400 per m² at the centre of a city and US\\$300 per m² at 4 km from the centre. Calculate the percentage fall in land value between the two points, to one decimal place.",
    value: fallA, dp: 1, unit: "%", wrong: [12.5, 2100],
    explanation: "Fall = 2 400 − 300 = 2 100. 2 100 ÷ 2 400 × 100 = 87.5%. 12.5% is the 4 km value as a percentage of the centre value.",
    hints: ["Divide the fall by the value at the centre."],
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: true,
    stem: "Land value is US\\$2 400 per m² at the centre and US\\$120 per m² at 6 km. How many times greater is the land value at the centre?",
    value: ratio, unit: "times", wrong: [0.05, 2280],
    explanation: "2 400 ÷ 120 = 20 times.",
    hints: ["Divide the larger value by the smaller."],
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "In a survey of 800 households, 384 live in high-density suburbs. What percentage live in high-density suburbs?",
    value: pctHigh, unit: "%", wrong: [48.4, 2.1],
    explanation: "384 ÷ 800 × 100 = 48%.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Burgess model suggests that land uses are arranged in rings around the CBD.",
    answer: true,
    explanation: "True. The Burgess concentric zone model has rings: CBD, transition zone, working-class housing, better housing and a commuter zone.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The structure of a city stays the same over time.",
    answer: false,
    explanation: "False. Retail and offices decentralise, inner areas decline or regenerate, and housing changes with population and income.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each urban model to its main idea.",
    pairs: [
      ["Burgess", "Concentric rings around the CBD"],
      ["Hoyt", "Wedge-shaped sectors along transport routes"],
      ["Harris and Ullman", "Several separate nuclei within the city"],
      ["Bid-rent", "Users pay different rents for accessibility"],
    ],
    explanation: "Each model gives a different simplified explanation of land use.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Land values are highest at the {{blank:a}} and fall with {{blank:b}} from the centre.",
    blanks: [
      { id: "a", accepted: ["peak land value intersection"], choices: ["peak land value intersection", "edge of the city", "industrial estate"] },
      { id: "b", accepted: ["distance"], choices: ["distance", "height", "population"] },
    ],
    explanation: "The peak land value intersection is the most accessible point in the CBD.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of Zimbabwean suburb, such as Mbare or Highfield, with small stands and crowded housing.",
    accepted: ["high-density", "high density", "high-density suburb", "high density suburb"],
    wrong: ["low-density", "medium-density"],
    explanation: "High-density suburbs have small stands and crowded housing.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "What name is given to the zone at the edge of a city where urban and rural land uses mix?",
    accepted: ["rural-urban fringe", "rural urban fringe", "urban fringe", "urban-rural fringe", "rural-urban fringe zone"],
    wrong: ["inner city", "CBD"],
    explanation: "The rural-urban fringe is where farms, new estates and informal settlements mix.",
    hints: ["It lies between town and country."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why building height is greatest in the CBD.",
    points: ["Land value is highest because accessibility is greatest", "High land values make it worthwhile to build upwards to gain floor space on each plot", "Offices, shops and banks can pay high rents and benefit from being close together"],
    modelAnswer: "Land value is highest in the CBD because accessibility is greatest. High land values make it worthwhile to build upwards to gain floor space on each plot, and offices, shops and banks can pay high rents and benefit from being close together.",
    explanation: "Link height to land value, plot cost and users' ability to pay.",
    hints: ["Why build up rather than out?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the characteristics of the high-density suburbs of a Zimbabwean city.",
    points: ["Small stands with closely packed houses, often single-storey", "High population density and crowded housing with shared services in some areas", "Located nearer the industrial areas or at the edge, with a high proportion of low-income households"],
    modelAnswer: "High-density suburbs have small stands with closely packed houses, often single-storey. Population density is high and housing is crowded, with shared services in some areas, and most households have low incomes.",
    explanation: "Stand size, density and income.",
    hints: ["Think of stand size, density and household income."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why manufacturing has moved from inner-city areas to the edge of cities.",
    points: ["High land costs and rents in the inner city", "Need for large, single-storey buildings with space for expansion and parking", "Congestion and poor access in the inner city, while edge sites have ring roads and main roads", "Planning rules and the use of old inner-city land for housing or offices"],
    modelAnswer: "Land costs and rents in the inner city are high, and modern factories need large single-storey buildings with room to expand. Congestion makes access poor in the inner city, whereas edge sites have good road access, and planning rules may encourage industry to move.",
    explanation: "Cost, space, access and planning.",
    hints: ["Compare inner-city and edge sites."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how income affects the pattern of residential zones in a city.",
    points: ["High-income households can afford large stands and the cost of travel, so they live in low-density suburbs", "Low-income households need cheap housing near work and public transport, so they live in high-density areas", "Land and building costs, and the zoning rules that set minimum stand sizes, maintain these differences", "Zones can change over time as incomes rise and areas are regenerated or become run-down"],
    modelAnswer: "High-income households can afford large stands and the cost of travel, so they live in low-density suburbs. Low-income households need cheap housing near work and public transport, so they live in high-density areas. Land costs and zoning rules, such as minimum stand sizes, maintain these differences, though zones change as incomes rise and areas are regenerated or become run-down.",
    explanation: "Affordability, location, rules and change.",
    hints: ["What can each group afford?"],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows land value and building height along a transect from the CBD of a city (illustrative data).\n\n${tabT}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage fall in land value between 0 km and 3 km, to one decimal place.", value: fall3, dp: 1, unit: "%", wrong: [12.2, 1580], explanation: "(1 800 − 220) ÷ 1 800 × 100 = 87.8%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which land user can pay the highest rents for land near 0 km?", options: [["Banks and large shops", "Correct: they gain most from accessibility."], ["Large farms", "Farms can pay only low rents."], ["Single-storey factories", "Factories need space and cannot pay centre rents."], ["Low-density housing", "Houses with large stands cannot pay centre rents."]], answer: "A", explanation: "Banks and shops gain most from the large number of customers and so can pay the highest rents." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the pattern shown in the table.", points: ["Land value falls from US\\$1 800 per m² at the centre to US\\$40 per m² at 10 km", "The fall is steepest near the centre (US\\$900 within the first 0.5 km) and levels off with distance", "Building height falls in the same way from 20 storeys to 1"], modelAnswer: "Land value falls from US\\$1 800 per m² at the centre to US\\$40 per m² at 10 km, with the steepest fall near the centre (US\\$900 within the first 0.5 km) and a levelling off further out. Building height falls in the same way from 20 storeys to 1.", explanation: "Quote values at the start and end, describe the shape and link height." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why land value falls with distance from the CBD.", points: ["Accessibility is greatest at the centre where routes meet, so demand is highest", "Fewer customers and workers pass by at greater distances, so firms will pay less", "Land is more available further out, so competition for each plot is lower"], modelAnswer: "Accessibility is greatest at the centre where routes meet, so demand for land is highest. Fewer customers and workers pass at greater distances, so firms will pay less, and there is more land available further out, so competition is lower.", explanation: "Accessibility, demand and supply." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest how the growth of suburban shopping centres might change this pattern.", points: ["Land values rise around the new centres, creating secondary peaks", "Land values in parts of the CBD may fall as shops move out", "The gradient becomes less smooth, with several centres rather than one"], modelAnswer: "Land values would rise around the new shopping centres, creating secondary peaks. Values in parts of the CBD may fall as shops move out, so the gradient becomes less smooth, with several centres rather than one.", explanation: "Secondary peaks and a weaker CBD." }),
    ],
    explanation: "Land-value gradient: calculation, description, explanation and change.",
    hints: ["Subtract the lower value from the higher and divide by the higher."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows the share of a city's retail floor space in two locations (illustrative data).\n\n${tabR}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the increase in the share of retail floor space in suburban shopping centres, in percentage points.", value: ppChange, wrong: [150, 2.5], explanation: "45 − 18 = 27 percentage points. The suburban share rose to 2.5 times its 2000 value (45 ÷ 18), which is different from the change in points." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which model best fits a city with several retail centres?", options: [["Harris and Ullman's multiple nuclei model", "Correct: several separate centres have developed."], ["Burgess's concentric zone model of rings round one centre", "That model shows one centre."], ["Hoyt's sector model", "That model emphasises wedges along routes with one centre."], ["Reilly's law", "That is not a model of urban structure."]], answer: "A", explanation: "Multiple nuclei fit cities where suburban centres have developed alongside the CBD." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why retail has moved to the suburbs.", points: ["Many customers now live in the suburbs and travel by car or minibus", "Land is cheaper and there is room for parking and large stores", "Property companies invested in malls, and the CBD suffers from congestion and high rents"], modelAnswer: "Many customers now live in the suburbs and travel by car or minibus. Land is cheaper and there is room for parking and large stores, and property companies invested in malls, while the CBD suffers from congestion and high rents.", explanation: "Customers, land and investment." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two possible effects of this change on the CBD.", points: ["Empty shops and falling land values, or buildings converted to other uses such as offices or informal trading", "Fewer customers and falling pedestrian counts, and less investment in the area"], modelAnswer: "There may be empty shops and falling land values, or buildings converted to other uses. Fewer customers mean falling pedestrian counts and less investment in the area.", explanation: "Decline or change of use." }),
    ],
    explanation: "Interpret changes in retail location and link to urban models.",
    hints: ["Subtract the percentage shares directly."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess how well the Hoyt sector model describes the structure of a named city. [8]",
    points: [
      "Outlines the model: zones extend as sectors along main transport routes, and by income",
      "Names a city and links to its roads, railways and zones",
      "Fit: industrial areas extend along railways or main roads, as in the model",
      "Fit: low-density, high-income suburbs may extend in a sector away from industry and congestion",
      "Limitation: a CBD with decentralised retail and offices is closer to a multiple nuclei structure",
      "Limitation: planning, colonial segregation, physical barriers such as hills or rivers, and informal settlements disturb the pattern",
      "Limitation: the model was based on cities in the United States and does not allow for different levels of income or informal growth",
      "Judgement: partially useful, because transport and income influence the structure, but a real city shows features of several models",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The Hoyt sector model suggests that land uses extend outwards from the CBD in wedges along main transport routes, and by income. In Harare, industrial areas such as Southerton and Msasa lie along railways and main roads, and low-density, high-income suburbs such as Borrowdale lie to the north, away from industry and congestion, which fits the model. However, retail and offices have decentralised to suburban centres, so the city is closer to a multiple nuclei structure in some respects. Colonial planning and segregation, hills and rivers, and informal settlements at the edge also disturb the pattern, and the model was based on cities in the United States. Overall the model is partly useful because transport and income influence structure, but a real city shows features of several models.",
    wordLimit: { max: 300 },
    explanation: "Apply a model to a city, weigh fit against limitations and judge.",
    hints: ["Give examples of fit and misfit."],
  });

  b.card("DEFINITION", "Land value gradient?", "Land value is highest at the peak land value intersection in the CBD and falls with distance from it.");
  b.card("CONCEPT", "Bid-rent theory?", "Users bid for land according to the benefit of accessibility: shops and offices pay most (centre), housing and farming least (edge).");
  b.card("CONCEPT", "Burgess, Hoyt, Harris and Ullman?", "Burgess (1925): concentric rings. Hoyt (1939): sectors along routes. Harris and Ullman (1945): multiple nuclei.");
  b.card("CONCEPT", "Structure of a Zimbabwean city?", "CBD, industrial estates, low-, medium- and high-density suburbs, satellite towns, informal settlements at the edge.");
  b.card("CONCEPT", "Why do retail and offices decentralise?", "Transport change, cheaper land with parking, customers in the suburbs, competition, investment and congestion in the centre.");
  b.card("CONCEPT", "Why do factories move to the edge?", "High land cost in the inner city, need for space and single-storey buildings, congestion and better road access at the edge.");
  b.card("CONCEPT", "What decides residential zones?", "Income, supply of housing, ethnicity and culture, planning and history.");
  b.card("DEFINITION", "Urban morphology (ZIMSEC)?", "The physical form of a city: street pattern, plot sizes, building types and heights.");
  b.card("DEFINITION", "Place identity?", "The character of a place as perceived and valued by those who live in or use it; perceptions can differ between groups.");
});
