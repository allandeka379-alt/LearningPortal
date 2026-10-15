// W3a: tropical.challenges (Cambridge only, A Level Paper 3 option 7). Data are illustrative (invented for this exercise) unless attributed; the Amazon facts are general and dated.
import { concept, P, geographyLevels, chk, rnd, pctChange, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const lossPct = rnd(((62 - 49) / 62) * 100, 1, 21.0, "lossPct");
const perYear = chk((5400 - 4200) / 10, 120);
const carbonMt = chk((8000 * 100 * 120) / 1e6, 96, 1e-9);
// Struct 1: forest cover table (illustrative, thousand km2)
const FC = [[1993, 310], [2003, 276], [2013, 249]];
const fcLoss = chk(310 - 249, 61);
const fcPct = rnd((61 / 310) * 100, 1, 19.7, "fcPct");
const FCTAB = tbl(["Year", "Forest cover (thousand km²)"], FC.map((r) => [r[0], r[1]]));
// Struct 2: strategies (illustrative)
const ST = [["Protected area network", 30, 120], ["Satellite monitoring and fines", 80, 40], ["Extractive reserves", 6, 9]];
const STTAB = tbl(["Strategy", "Area covered (million ha)", "Annual cost (US\\$ million)"], ST.map((r) => [r[0], r[1], r[2]]));
const costHa = rnd((120 / 30), 0, 4, "costHa");
const costHa2 = rnd((9 / 6), 1, 1.5, "costHa2");

concept("ageo.tropical.challenges", { file: "tropical/challenges", keyPrefix: "tropical.challenges", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "Which activity is a major cause of forest clearance in the Brazilian Amazon?", [
    ["Cattle ranching and the growing of soya", "Correct: both replace forest with pasture or fields."],
    ["Large-scale tourism on the beaches of the coast", "Tourism is not the main driver of clearance in the interior."],
    ["Expansion of the area of tidal saltmarsh and mangrove", "That is a coastal vegetation type, not a cause of clearance."],
    ["Building of tall office blocks in the capital city", "Urban construction is a minor cause compared with farming."],
  ], "Cattle ranching and soya are the largest drivers of clearance in the Amazon.");
  mc(b, 2, "UNDERSTANDING", "How does the building of logging roads increase deforestation?", [
    ["It gives farmers, hunters and loggers access to remote forest", "Correct: roads open up areas that were difficult to reach."],
    ["It makes the forest floor wetter and much more likely to flood", "Roads do not usually make the forest wetter."],
    ["It increases the amount of rain that falls on the forest nearby", "Roads do not raise rainfall."],
    ["It protects the roots of the trees that grow next to the road", "Roads damage trees and cause erosion; they do not protect them."],
  ], "**Access** is the main reason for roads leading to clearance.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is a large oil palm plantation less biodiverse than the rainforest it replaced?", [
    ["It has one species of crop with a simple structure", "Correct: a monoculture offers few habitats and foods."],
    ["It has a higher number of different tree species", "A plantation has one crop species."],
    ["It has a closed canopy with several different layers", "Plantations have simple structure and one main layer."],
    ["It has soils that are richer than those of the forest", "Soil richness does not explain the loss of species."],
  ], "A **monoculture** has a simple structure and few niches.");
  mc(b, 3, "ANALYSIS", "What was the purpose of the Soy Moratorium agreed in Brazil in 2006?", [
    ["To stop traders buying soya grown on newly cleared forest land", "Correct: it used market pressure to reduce the demand for deforestation."],
    ["To ban all growing of soya anywhere within Brazil", "It only covered soya from land cleared in the Amazon biome after the agreed date."],
    ["To give every farmer money to plant more soya in the forest", "It aimed to remove the reward for clearing, not to give subsidies."],
    ["To limit exports of soya to the countries of the European Union", "It was an agreement among traders about sourcing, not an export limit."],
  ], "The moratorium tied the **market for soya** to the absence of new clearance.", { hints: ["It was an agreement between traders and groups, not a ban on soya."] });
  mc(b, 3, "ANALYSIS", "Which statement best explains why savanna tree cover may decline as climate change leads to more frequent droughts and fires?", [
    ["Seedlings are killed before they grow beyond fire height", "Correct: repeated fire and drought keep trees from reaching maturity."],
    ["Grasses are unable to grow in warmer and drier conditions at all", "Savanna grasses are adapted to dry conditions and benefit from fire."],
    ["Mature trees are unable to survive in any type of grass fire", "Many mature trees have thick bark and survive fire."],
    ["Rainfall is certain to increase so that grass is always green", "The problem is drought and fire, not constant wetness."],
  ], "Young trees in the **fire trap** are killed before they mature.", { hints: ["Think about which stage of a tree's life is most vulnerable to fire."] });
  mc(b, 3, "APPLICATION", "A farmer in a miombo area cuts woodland for fuelwood to cure tobacco. Which long-term effect is most likely?", [
    ["Loss of tree cover, soil erosion and less fuelwood", "Correct: if cutting exceeds regrowth, the woodland is degraded."],
    ["A rise in the amount of nutrients stored in the woodland", "Cutting reduces the biomass and its nutrients."],
    ["A fall in the surface runoff and the amount of soil lost", "Without trees, runoff and erosion increase."],
    ["A faster rate of regrowth of the original woodland species", "Regrowth is slower when cutting exceeds the renewal rate."],
  ], "Overuse of wood **degrades woodland** and exposes the soil.", { hints: ["Compare the rate of cutting with the rate of regrowth."] });
  mc(b, 2, "RECALL", "Which pair of strategies has been used to protect the Brazilian Amazon?", [
    ["Satellite monitoring with fines, and protected areas", "Correct: monitoring and legal protection are core strategies."],
    ["Building new roads and giving land to cattle ranchers", "These increase clearance and are not protection strategies."],
    ["Draining wetlands and burning forest to create farmland", "These lead to the loss of forest and are not management strategies."],
    ["Clear-felling and exporting unprocessed timber overseas", "These increase forest loss."],
  ], "Monitoring and enforcement together with **protected areas** are key strategies.");

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Selective logging causes no damage to the rest of the forest.", answer: false,
    feedbackTrue: "Not so: roads and falling trees damage the forest.", feedbackFalse: "Correct: skid trails, roads and falling trees damage other trees.",
    explanation: "Selective logging still **damages** surrounding trees and opens access roads." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Clearing rainforest releases carbon that was stored in the biomass.", answer: true,
    feedbackTrue: "Correct: burning and decay release carbon dioxide.", feedbackFalse: "Not so: carbon stored in trees is released when they are burned or decay.",
    explanation: "Forest clearance is a major **source of greenhouse gases**." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each Amazon management strategy to its description.",
    pairs: [
      ["Satellite monitoring", "Detects clearance so that fines can be imposed"],
      ["Protected area", "Land with legal limits on clearing and use"],
      ["Soy Moratorium", "Traders agree not to buy soya from newly cleared land"],
      ["Amazon Fund", "Donor money for protection and sustainable projects"],
      ["Extractive reserve", "Forest used by residents for nuts, rubber and other products"],
    ], explanation: "Each strategy tackles a different cause of clearance." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The cultivation of a single crop over a large area is called {{blank:a}}. The permanent removal of forest cover is {{blank:b}}. Use of a resource at a rate which allows it to renew is called {{blank:c}} management.",
    blanks: [
      { id: "a", accepted: ["monoculture"], choices: ["monoculture", "polyculture", "shifting cultivation"] },
      { id: "b", accepted: ["deforestation"], choices: ["deforestation", "afforestation", "succession"] },
      { id: "c", accepted: ["sustainable"], choices: ["sustainable", "intensive", "selective"] },
    ], explanation: "Monoculture, deforestation and sustainable management are the key terms." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the Brazilian savanna region that has been widely cleared for soya since the 1970s.",
    accepted: ["Cerrado", "the Cerrado", "cerrado"],
    explanation: "The **Cerrado** is a tropical savanna of central Brazil." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A rainforest reserve covered 62 thousand km² in 1998 and 49 thousand km² in 2018 (illustrative data, invented for this exercise). Calculate the percentage loss of forest, to one decimal place.",
    hints: ["Loss ÷ original × 100."],
    value: lossPct, dp: 1, wrong: [13, 26.5, 79.0],
    explanation: "Loss = 62 − 49 = 13 thousand km². 13 ÷ 62 × 100 = **21.0%**. The value 26.5 divides by the final area instead of the original (13 ÷ 49)." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "km²",
    stem: "A forest park covered 5 400 km² in 2004 and 4 200 km² in 2014 (illustrative data). Calculate the mean annual loss of forest, in km² per year.",
    hints: ["Total loss ÷ number of years."],
    value: perYear, wrong: [1200, 12, 22.2],
    explanation: "Loss = 5 400 − 4 200 = 1 200 km². Over 10 years: 1 200 ÷ 10 = **120 km² per year**. The value 1 200 is the total loss, not the annual rate." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "million",
    stem: "A forest area of 8 000 km² stores 120 tonnes of carbon per hectare (illustrative data). Calculate the carbon released if all of it is cleared and burned, in millions of tonnes of carbon (1 km² = 100 ha).",
    hints: ["Convert km² to hectares first.", "Divide by 1 000 000 to give millions."],
    value: carbonMt, wrong: [96000000, 0.96],
    explanation: "1. Area = 8 000 × 100 = 800 000 ha.\n2. Carbon = 800 000 × 120 = 96 000 000 tonnes.\n3. In millions of tonnes this is **96**. The value 96 000 000 is not divided by 1 000 000, and the value 0.96 uses 8 000 ha instead of 800 000 ha." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how population pressure can lead to the degradation of savanna woodland.",
    points: [
      "More people need more land for crops and more wood for fuel and building, so more woodland is cleared.",
      "More livestock overgraze the grass, exposing the soil to erosion and allowing bush to spread.",
      "Fallow periods become shorter, so the soil loses nutrients and the cleared land is abandoned and replaced by more clearance.",
    ],
    modelAnswer: "More people need land for crops and wood for fuel, so woodland is cleared. More livestock overgraze the grass, exposing the soil to erosion. Shorter fallow periods deplete the soil, so more land has to be cleared.",
    explanation: "Link the pressure to land clearance, overgrazing and soil exhaustion." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why monoculture can have harmful effects on a tropical environment.",
    hints: ["Think of biodiversity, soil, water and carbon."],
    points: [
      "Biodiversity falls, because a single crop provides few habitats and foods and the forest species are lost.",
      "Bare soil between crops is exposed to heavy rain, so erosion and nutrient loss increase.",
      "Fertilisers and pesticides run off into streams, polluting the water.",
      "The carbon stored in the forest or woodland is released when it is cleared, and the crop stores much less.",
    ],
    modelAnswer: "A monoculture provides few habitats and foods, so biodiversity falls. Exposed soil is eroded by heavy rain, and fertilisers and pesticides run off into streams and pollute them. The carbon stored in the forest is released when it is cleared, and the crop stores much less.",
    explanation: "Biodiversity, soil, water and carbon are all affected." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Describe how climate change may affect tropical rainforest or savanna environments.",
    hints: ["Give changes in temperature, rainfall, fire and species."],
    points: [
      "Higher temperatures increase evaporation and heat stress on plants and animals.",
      "Some areas, such as parts of the Amazon, have had more frequent droughts, and rainfall seasons may change in length and reliability.",
      "Drier forest and woodland are more likely to burn, and fire frequency may increase.",
      "Species may move or be lost, and a possible tipping point could convert forest to savanna, releasing stored carbon.",
    ],
    modelAnswer: "Higher temperatures increase evaporation and heat stress. Some areas, such as parts of the Amazon, have had more frequent droughts and the rainy season may change. Drier forest and woodland are more likely to burn. Species may move or be lost, and a possible tipping point could convert forest to savanna and release stored carbon.",
    explanation: "Describe changes in temperature, rainfall and fire, and the possible consequences." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 4,
    stem: "Assess the effectiveness of the Soy Moratorium as a way of reducing deforestation in the Brazilian Amazon.",
    hints: ["Give a strength, a limitation and a judgement."],
    points: [
      "It used market pressure: major traders refused to buy soya from land cleared after an agreed date, removing the reward for clearing for soya.",
      "It is generally considered to have reduced soya-driven clearance in the Amazon biome, since most new soya moved on to land that was already cleared.",
      "However, it is voluntary and covers only soya in the Amazon biome, so clearance can move to the Cerrado or to other uses such as cattle.",
      "Judgement: effective for one cause in one region, but not enough alone, so it must be combined with enforcement and protection.",
    ],
    modelAnswer: "The moratorium used market pressure, because traders refused to buy soya from land cleared after an agreed date, and it is generally credited with reducing soya-driven clearance in the Amazon. However, it is voluntary and covers only soya in the Amazon biome, so clearance can move to the Cerrado or to other uses such as cattle. It is effective for one cause in one region but is not enough alone and needs enforcement and protection to support it.",
    explanation: "Evaluate the strategy by what it achieved and what it left out." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives illustrative forest cover for a tropical region (data invented for this exercise).\n\n${FCTAB}`,
    hints: ["In (a) the loss is the difference between 1993 and 2013.", "In (c) think of the causes of clearance described in this lesson."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage loss of forest between 1993 and 2013, to one decimal place.", value: fcPct, dp: 1, unit: "%", wrong: [61, 24.5, 80.3],
        explanation: "Loss = 310 − 249 = 61 thousand km². 61 ÷ 310 × 100 = 19.7%. The value 24.5 divides by the final area (61 ÷ 249)." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the change in forest cover shown in the table.",
        points: [
          "Forest cover fell throughout the period, from 310 thousand km² in 1993 to 249 thousand km² in 2013.",
          "The loss was greater in the first decade (34 thousand km² between 1993 and 2003) than in the second (27 thousand km²).",
          "The rate of loss slowed, from 3.4 thousand km² a year to 2.7 thousand km² a year, but the forest was still shrinking.",
        ],
        modelAnswer: "Forest cover fell throughout, from 310 thousand km² in 1993 to 249 thousand km² in 2013. The loss was greater in the first decade (34 thousand km²) than in the second (27 thousand km²). The rate of loss slowed from 3.4 to 2.7 thousand km² a year, but the forest continued to shrink.",
        explanation: "Quote the trend, compare the periods and give the rate." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest reasons for the loss of forest in the region.",
        points: [
          "Clearance for cattle pasture and for large monoculture crops such as soya or oil palm.",
          "Logging and the roads that give access to farmers and illegal loggers; clearance for mining.",
          "Population growth, shifting cultivation with short fallow periods, and fires, often worsened by drought.",
        ],
        modelAnswer: "Forest is cleared for cattle pasture and for large crops such as soya or oil palm. Logging and mining build roads that give access to farmers and illegal loggers. Population growth shortens fallow periods, and fires worsen losses, particularly in drought years.",
        explanation: "Name causes from farming, access and population pressure." }),
    ], explanation: "Calculate a percentage loss, describe the trend and suggest causes." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives illustrative figures for three strategies for protecting a rainforest region (data invented for this exercise).\n\n${STTAB}`,
    hints: ["Cost per hectare = annual cost ÷ area covered, using millions for both.", "Consider both cost and area covered when judging success."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the annual cost per hectare of the protected area network, in US\\$.", value: costHa, unit: "US$", wrong: [0.25, 3600, 150],
            explanation: "US\\$120 million ÷ 30 million ha = US\\$4 per hectare." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which strategy covers the largest area?", options: [
            ["Satellite monitoring and fines", "Correct: 80 million ha is the largest figure."],
            ["Protected area network", "It covers 30 million ha, less than monitoring."],
            ["Extractive reserves", "It covers only 6 million ha."],
            ["All three cover the same area", "The areas differ: 30, 80 and 6 million ha."],
          ], answer: "A", explanation: "Monitoring covers 80 million ha, more than the protected areas (30) or reserves (6)." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how protected areas can reduce deforestation.",
        points: [
          "They give the forest legal protection, so clearing, logging and settlement are restricted or banned.",
          "Rangers or monitoring, fines and the involvement of Indigenous people deter illegal clearance and fires.",
          "They keep areas of forest intact, so biodiversity and the carbon store are maintained.",
        ],
        modelAnswer: "Protected areas give the forest legal protection, so clearing, logging and settlement are restricted. Rangers, fines and the involvement of Indigenous residents deter illegal clearance and fires. The forest, its biodiversity and its carbon store are kept intact.",
        explanation: "Law, enforcement and local involvement protect the forest." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the limitations of protected areas.",
        points: [
          "Remote areas are large and hard to patrol, so illegal logging and mining continue (paper parks).",
          "Funding and staff may be inadequate, and local people who are excluded may lose their livelihoods and resent the restrictions.",
          "Pressure may be displaced to unprotected land nearby, and political decisions can reduce or weaken protection.",
        ],
        modelAnswer: "Remote areas are large and hard to patrol, so illegal logging and mining can continue. Funding and staff may be inadequate and excluded local people may resent the restrictions. Clearance may be displaced to unprotected land nearby, and political decisions can weaken the protection.",
        explanation: "Weak enforcement, local conflict and displacement limit success." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess whether the strategies in the table, used together, are likely to protect the forest.",
        points: [
          "Monitoring covers the largest area (80 million ha) at the lowest cost per hectare (US\\$0.5), so it can detect clearance across most of the region.",
          "Protected areas and reserves keep the most valuable areas intact, but they cover less land and cost more per hectare.",
          "Judgement: together they are more likely to succeed because monitoring finds clearance and protection gives the legal basis, but only if they are properly funded and enforced.",
        ],
        modelAnswer: "Monitoring covers the largest area (80 million ha) at the lowest cost per hectare, so it can detect clearance across most of the region. Protected areas and reserves keep the most valuable forest intact but cover less land and cost more per hectare. Used together they are more likely to succeed, because monitoring finds clearance and protection provides the legal basis, but only if they are properly funded and enforced.",
        explanation: "Compare coverage and cost, then judge the combination." }),
    ], explanation: "Calculate cost, explain protection and assess a combination of strategies." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the success of the management of a rainforest or savanna ecosystem that you have studied. Use a detailed specific example.",
    hints: ["Name the place and the dated strategies.", "Give successes, failures and a judgement."],
    points: [
      "Names the ecosystem and the issues (for example the Brazilian Amazon: ranching, soya, logging, mining, roads and fires).",
      "Names strategies with dates (for example the 2004 federal plan with satellite monitoring and fines, the Soy Moratorium of 2006, the Amazon Fund of 2008, protected areas and Indigenous territories).",
      "Gives evidence of success: annual clearance fell from about 27 800 km² in 2004 to about 4 600 km² in 2012.",
      "Explains why the measures worked: enforcement, market pressure and funding addressed the causes.",
      "Gives evidence of limits: clearance rose again after 2012 and exceeded 10 000 km² a year from 2019 when enforcement was weakened.",
      "Notes continuing problems: illegal activity in remote areas, demand for beef and soya, drought and fire.",
      "Notes that success varies in time and place (protected areas and Indigenous territories do better than unprotected land).",
      "Judgement: partly successful, with strong results when enforcement and markets work together, but not secure because it depends on continuous political and financial support.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "In the Brazilian Amazon, ranching, soya, logging, mining and roads caused large-scale clearance. From 2004 the federal plan used satellite monitoring and fines, followed by the Soy Moratorium in 2006, the Amazon Fund in 2008 and the expansion of protected areas and Indigenous territories. Annual clearance fell from about 27 800 km² in 2004 to about 4 600 km² in 2012, showing that enforcement, market pressure and funding worked on the causes. However, clearance rose again after 2012 and exceeded 10 000 km² a year from 2019 as enforcement weakened, and illegal activity, demand for beef and soya, drought and fire continue. Protected areas and Indigenous territories do better than unprotected land. The management has been partly successful, but it is not secure because it depends on continuing political and financial support.",
    wordLimit: { max: 300 }, explanation: "Use dated strategies and figures and weigh success against limits." });

  b.card("DEFINITION", "Deforestation", "The permanent removal of forest cover and its conversion to another use, such as farmland, pasture, mines or settlements.");
  b.card("DEFINITION", "Monoculture", "The cultivation of a single crop over a large area (for example oil palm or soya); it reduces biodiversity and exposes the soil.");
  b.card("CONCEPT", "Causes of change in tropical environments", "Population pressure, monoculture, logging, mining and climate change, helped by roads that give access.");
  b.card("FACT", "Amazon clearance since 2004", "About 27 800 km² a year in 2004 (INPE); about 4 600 km² in 2012; above 10 000 km² a year from 2019; lower again in 2023 (rounded).");
  b.card("FACT", "Soy Moratorium", "A 2006 agreement by major traders in Brazil not to buy soya grown on Amazon land cleared after an agreed date.");
  b.card("FACT", "Amazon Fund", "Created in 2008 with donors such as Norway and Germany to pay for protection and sustainable projects in the Brazilian Amazon.");
  b.card("CONCEPT", "Amazon management strategies", "Satellite monitoring and fines (from 2004), protected areas and Indigenous territories, the Soy Moratorium, the Amazon Fund and extractive reserves.");
  b.card("CONCEPT", "Climate change and tropical ecosystems", "Higher temperatures, more frequent droughts, more fire, species loss and a possible tipping point from forest to savanna.");
  b.card("FORMULA", "Carbon released by clearance", "Carbon (t) = area (ha) × carbon density (t/ha); 1 km² = 100 ha; CO₂ = carbon × 44 ÷ 12.");
});
