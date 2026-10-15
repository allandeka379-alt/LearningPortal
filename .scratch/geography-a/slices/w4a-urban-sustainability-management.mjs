// W4a: urban.sustainability-management (ZIMSEC Form 6; Cambridge AS). Illustrative data; Curitiba facts general. Numbers computed in code.
import { concept, P, t, chk, table, geographyLevels, mean } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const life = chk(2400000 / 120000, 20, 1e-9);
const perPerson = chk((840 * 1000) / 1.2e6, 0.7, 1e-9);
const recPct = chk((36 / 240) * 100, 15, 1e-9);
const IND = [["Public transport share of trips (%)", 50, 40, 20], ["Green space per person (m²)", 15, 9, 12], ["Recycling rate (%)", 30, 21, 6], ["Households with piped water (%)", 100, 80, 95]];
const score = (v, tg) => (v / tg) * 100;
const sP = IND.map((r) => score(r[2], r[1]));
const sQ = IND.map((r) => score(r[3], r[1]));
const meanP = chk(mean(sP), 72.5, 1e-9);
const meanQ = chk(mean(sQ), 58.75, 1e-9);
const greenP = chk(score(9, 15), 60, 1e-9);
const tabI = table(["Indicator", "Target", "City P", "City Q"], IND);
const life2 = 2100000 / 70000; // 30
const life3 = 2100000 / (70000 * 0.7); // 42.86
chk(life2, 30, 1e-9);

concept("ageo.urban.sustainability-management", { file: "urban/sustainability-management", keyPrefix: "urban.sustainability-management" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which statement best defines sustainable urban development?",
    ok: ["Growth that meets present needs without harming the ability of future generations to meet theirs", "Correct: it balances environment, society and economy over time."],
    bad: [["Growth that is as fast as possible", "Speed is not the aim; long-term balance is."], ["Protecting the environment whatever the cost to people, to jobs and to the economy of the city today", "Sustainability includes social and economic needs."], ["Keeping the city the same size", "Sustainable cities may grow if they do so responsibly."]],
    explanation: "Sustainable development balances environmental, social and economic needs now and in future.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the most sustainable way to deal with a city's organic household waste?",
    ok: ["Composting it and using the compost on gardens and farms", "Correct: it returns nutrients and reduces landfill."],
    bad: [["Burning it in open piles", "Open burning pollutes the air."], ["Dumping it in a river", "This pollutes water."], ["Burying all of it in a single unlined pit close to a stream or well", "Unlined pits can pollute groundwater and fill quickly."]],
    explanation: "Composting reduces the volume sent to landfill and returns nutrients to the soil.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is it difficult to measure whether a city is sustainable?",
    ok: ["Many dimensions and indicators are involved, and judgements depend on scale, time and values", "Correct: no single number captures all of them."],
    bad: [["Cities do not produce any data", "Cities produce a great deal of data."], ["Sustainability has only one agreed indicator, so every city is measured in exactly the same way by everyone", "There are many indicators with no single agreed measure."], ["Only the environment matters", "Social and economic aspects also matter."]],
    explanation: "Sustainability combines environmental, social and economic aspects measured in different units, and the result depends on scale, time and viewpoint.",
    hints: ["Think of how many things have to be added together."],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is a feature of the bus system in Curitiba, Brazil?",
    ok: ["Dedicated bus lanes with high-capacity articulated buses and boarding tubes", "Correct: it became a model of bus rapid transit."],
    bad: [["An underground railway covering the whole city, built in the 1950s with free fares", "Curitiba relied on buses, not a metro."], ["A ban on all private cars", "Cars are allowed; ownership has grown."], ["Free taxis for every resident", "No such scheme exists."]],
    explanation: "Curitiba's integrated network used dedicated lanes and articulated buses from the 1970s, at lower cost than rail.",
    hints: ["The system is called bus rapid transit."],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why do planners often use a GIS buffer around bus stops?",
    ok: ["To find which residents live within walking distance of public transport", "Correct: a buffer shows the area within a set distance."],
    bad: [["To measure the height of buildings", "Buffers show distance, not height."], ["To count the number of passengers who board each bus at every stop on the route", "Passenger counts come from surveys."], ["To change the route of the bus", "A buffer analyses access; it does not change routes."]],
    explanation: "A buffer around a point or line identifies the area within a chosen distance, so access can be assessed.",
    hints: ["A buffer is a zone of fixed distance."],
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Why do conflicts often arise in urban planning?",
    ok: ["Residents, owners, businesses and governments have different priorities for the same land", "Correct: one use of land excludes others."],
    bad: [["All groups always agree on land use, so planners never have to make any compromises or choices", "Interests often differ."], ["Planning only affects the government", "Planning affects all groups."], ["Land has no value in cities", "Urban land is very valuable."]],
    explanation: "A park, road or housing scheme benefits some groups and costs others, so planners must balance competing interests.",
    hints: ["Think of who wants to use a plot of land."],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A landfill site has 2.4 million m³ of space left and receives 120 000 m³ of waste a year. Calculate how many years it will last, assuming the rate stays the same.",
    value: life, unit: "years", wrong: [0.05, 288000],
    explanation: "Years = 2 400 000 ÷ 120 000 = 20 years. Dividing the other way gives 0.05.",
    hints: ["Divide the space left by the yearly amount."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A city of 1.2 million people produces 840 tonnes of household waste a day. Calculate the waste per person per day, in kg.",
    value: perPerson, unit: "kg", wrong: [0.0007, 7],
    explanation: "840 tonnes = 840 000 kg. 840 000 ÷ 1 200 000 = 0.7 kg per person per day.",
    hints: ["Convert tonnes to kilograms first."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A city collects 240 tonnes of waste in a week and 36 tonnes are recycled. What percentage is recycled?",
    value: recPct, unit: "%", wrong: [6.7, 85],
    explanation: "36 ÷ 240 × 100 = 15%. 85 is the percentage not recycled.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A city can look sustainable while relying on resources and waste sites in other places.",
    answer: true,
    explanation: "True. Cities import food and energy and export waste and pollution, so their ecological footprint is much larger than their area.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Green spaces in a city can help to reduce flood risk.",
    answer: true,
    explanation: "True. Parks, wetlands and open ground allow rain to soak in or be stored, which reduces surface runoff.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each strategy to the problem it mainly addresses.",
    pairs: [
      ["Composting and recycling", "Solid waste"],
      ["Bus rapid transit", "Traffic congestion and emissions"],
      ["Upgrading informal settlements", "Poor housing quality"],
      ["Urban parks and wetlands", "Heat, floods and lack of green space"],
    ],
    explanation: "Each strategy targets one aspect of urban sustainability.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "A measure of the area of land and water needed to support a city's people and absorb their waste is the ecological {{blank:a}}. Curitiba is in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["footprint"], choices: ["footprint", "gradient", "threshold"] },
      { id: "b", accepted: ["Brazil"], choices: ["Brazil", "India", "Kenya", "Mexico"] },
    ],
    explanation: "The ecological footprint measures resource use; Curitiba is a city in southern Brazil.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What does the abbreviation GIS stand for?",
    accepted: ["geographic information system", "geographical information system", "geographic information systems", "geographical information systems"],
    wrong: ["global information service", "geographic index system"],
    explanation: "A geographic information system stores, analyses and displays spatial data.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the three-word waste hierarchy that begins with 'reduce'.",
    accepted: ["reduce reuse recycle", "reduce, reuse, recycle", "reduce reuse and recycle", "reduce, reuse and recycle", "the three rs", "3 rs", "3rs"],
    wrong: ["recover repair rebuild", "reduce recover recycle"],
    explanation: "Reduce, reuse, recycle is the order of preference for dealing with waste.",
    hints: ["Each word begins with R."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why public transport is more sustainable than private cars in a city.",
    points: ["Carries many people per vehicle, so less fuel and fewer emissions per passenger", "Reduces congestion and the space needed for roads and parking", "Provides affordable mobility for people who do not own cars"],
    modelAnswer: "A bus carries many people, so there is less fuel use and fewer emissions per passenger. It reduces congestion and the space needed for roads and parking, and it gives affordable mobility to people without cars.",
    explanation: "Environmental, spatial and social benefits.",
    hints: ["Compare one bus with the cars needed for the same people."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a GIS can be used in urban land-use planning.",
    points: ["Layers of land use, roads, rivers, slope and soils are stored and displayed on one map", "Overlays combine layers to find suitable sites, for example flat land outside flood zones", "Buffers and network analysis show access to services and the best routes"],
    modelAnswer: "A GIS stores layers of land use, roads, rivers, slope and soils on one map. Overlays combine layers to find suitable sites, such as flat land outside flood zones, and buffers and network analysis show access to services and the best routes.",
    explanation: "Layers, overlay and buffer or network analysis.",
    hints: ["Think of layers, overlays and buffers."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain two constraints on improving solid waste management in a rapidly growing city.",
    points: ["Limited funds for trucks, bins and landfill management", "Rapid growth and informal settlements make collection difficult because roads are narrow or absent", "Weak enforcement and low public awareness lead to illegal dumping", "Few markets for recycled materials, so recycling is not profitable"],
    modelAnswer: "Funds for trucks, bins and landfill management are limited. Rapid growth and informal settlements make collection difficult because roads are narrow or absent, and weak enforcement leads to illegal dumping.",
    explanation: "Any two constraints, each developed.",
    hints: ["Think of money, access and behaviour."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest four ways of making a city's transport more sustainable.",
    points: ["Improve and expand public transport such as buses, with dedicated lanes", "Provide safe walking and cycling routes", "Plan mixed land uses so that homes, jobs and shops are closer together", "Charge for parking or congestion and encourage cleaner fuels or vehicles"],
    modelAnswer: "Improve public transport with dedicated bus lanes, provide safe walking and cycling routes, plan mixed land uses so that homes, jobs and shops are closer together, and use parking charges and cleaner fuels to discourage car use.",
    explanation: "Any four valid measures.",
    hints: ["Think of alternatives to cars and ways to shorten journeys."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Planners compared two cities with targets for four indicators (illustrative data).\n\n${tabI}\n\nThe score for each indicator is actual ÷ target × 100.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate City P's score for green space.", value: greenP, wrong: [9, 167], explanation: "9 ÷ 15 × 100 = 60." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate City P's mean score for the four indicators.", value: meanP, dp: 1, wrong: [72, 58.8], explanation: "Scores: 40 ÷ 50 = 80; 9 ÷ 15 = 60; 21 ÷ 30 = 70; 80 ÷ 100 = 80. Mean = (80 + 60 + 70 + 80) ÷ 4 = 72.5." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement is correct?", options: [["City P has the higher mean score", "Correct: 72.5 compared with 58.75 for City Q."], ["City Q has the higher mean score", "City Q's mean is 58.75."], ["The cities have equal mean scores", "The means are different."], ["City P scores 100 on every indicator", "Its scores are 80, 60, 70 and 80."]], answer: "A", explanation: "City Q's scores are 40, 80, 20 and 95, with a mean of 58.75." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain two limitations of using a single mean score to judge sustainability.", points: ["It hides weak indicators, such as City Q's recycling rate of 6% against a target of 30%", "It treats all indicators as equally important, although people may value them differently", "Targets are chosen by people and the score ignores other issues such as air quality or affordability"], modelAnswer: "A mean hides weak indicators, such as City Q's recycling rate of 6% against a target of 30%. It also treats all indicators as equally important, although people may value them differently, and it ignores issues not included, such as air quality.", explanation: "Masking, equal weights and omissions." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest priorities for City Q and justify them.", points: ["Recycling, with a score of only 20, because waste sent to landfill is high and the target is far away", "Public transport (score 40), to reduce congestion and emissions", "Measures such as bins, collection points, incentives for recycling, and bus lanes and routes", "Keep what works: green space (80) and water (95) are close to target"], modelAnswer: "Recycling should be the first priority, with a score of only 20, because most waste goes to landfill and the target is far away. Public transport (score 40) is next, to reduce congestion and emissions. Measures include collection points and incentives for recycling and bus lanes. Green space (80) and water (95) are close to target and can be maintained.", explanation: "Use the weakest scores, with measures." }),
    ],
    explanation: "Calculate and interpret indicator scores for two cities.",
    hints: ["Divide each actual value by its target."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "A landfill site has 2.1 million m³ of space left and receives 70 000 m³ of waste a year. A recycling scheme is planned that would cut the waste sent to the site by 30% (illustrative data).",
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the number of years the site will last at the present rate.", value: life2, unit: "years", wrong: [0.033, 147], explanation: "2 100 000 ÷ 70 000 = 30 years." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the number of years the site will last after the scheme starts, to one decimal place.", value: life3, dp: 1, unit: "years", wrong: [39, 21], explanation: "Waste sent to landfill = 70 000 × 0.70 = 49 000 m³. 2 100 000 ÷ 49 000 = 42.9 years." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two benefits of extending the life of the landfill site.", points: ["Delays the need for a new site, which is costly and often opposed by neighbours", "Saves land and reduces pollution from waste, while recovered materials can be sold or reused"], modelAnswer: "It delays the need for a new site, which is costly and often opposed by neighbours, and it saves land and reduces pollution while recovered materials can be sold or reused.", explanation: "Any two benefits." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two things the council needs for the recycling scheme to succeed.", points: ["Collection and sorting systems, including support for informal waste pickers", "Markets for the recycled materials and public education"], modelAnswer: "It needs collection and sorting systems, including support for informal waste pickers, and markets for the recycled materials with public education.", explanation: "Systems, markets and awareness." }),
    ],
    explanation: "Calculate landfill life with and without a recycling scheme.",
    hints: ["Multiply the yearly amount by 0.70 for the second part."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the success of the sustainable development strategies used in a named city (for example Curitiba). [8]",
    points: [
      "Names the city and outlines its strategies (integrated bus network, parks, recycling schemes) with a date",
      "Transport success: dedicated bus lanes and articulated buses carry many people at lower cost than rail",
      "Green space success: parks on floodplains reduce flood risk and provide recreation",
      "Waste success: recycling programmes engage low-income households and reduce waste going to landfill",
      "Limitation: car ownership has grown, and traffic and emissions remain concerns",
      "Limitation: informal settlements and inequality exist at the edge of the city",
      "Limitation: success depends on strong planning, funding and public support, which may not exist elsewhere",
      "Judgement: the strategies have made the city more sustainable than many, but not fully so, and some cannot easily be copied",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Curitiba, in southern Brazil, guided its growth with a master plan and an integrated bus network with dedicated lanes and articulated buses from the 1970s, which carries many people at lower cost than rail. Parks on floodplains reduce flood risk and provide recreation, and recycling programmes engage low-income households and reduce waste going to landfill. However, car ownership has grown, informal settlements exist at the edge of the city, and the success depended on strong planning and funding that other cities may not have. Overall the strategies have made Curitiba more sustainable than many cities, but not fully so.",
    wordLimit: { max: 300 },
    explanation: "Describe strategies with facts, weigh success against limits and judge.",
    hints: ["Cover transport, green space and waste, then limits."],
  });

  b.card("DEFINITION", "Sustainable urban development?", "Growth that meets present needs without reducing the ability of future generations to meet theirs, balancing environment, society and economy.");
  b.card("DEFINITION", "Ecological footprint?", "The area of land and water needed to supply a city's resources and absorb its waste.");
  b.card("CONCEPT", "Why is sustainability hard to measure?", "Many dimensions and indicators in different units; results depend on scale, time, imports of resources and values.");
  b.card("CONCEPT", "Waste hierarchy?", "Reduce, reuse, recycle, compost, then safe landfill (with energy recovery where possible).");
  b.card("FACT", "Curitiba's main sustainability features?", "Integrated bus rapid transit with dedicated lanes (from 1974), parks that help control floods, and recycling programmes; limits include growing car ownership and informal settlement.");
  b.card("CONCEPT", "Steps in land-use planning?", "Survey, analyse (GIS overlay, buffers, network analysis), plan and zone, consult, implement and monitor.");
  b.card("CONCEPT", "Why do planners face conflict?", "Residents, owners, businesses and governments want different uses for the same land.");
  b.card("CONCEPT", "Benefits of urban green space?", "Cooling, flood storage, biodiversity, recreation and health.");
  b.card("FORMULA", "Landfill life?", "Space remaining ÷ waste added per year; recycling lowers the yearly amount and lengthens the life.");
});
