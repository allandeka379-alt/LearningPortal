// Slice G3c: ZIMSEC Paper 2 Section B (economic geography): agriculture (2 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

concept("geo.agriculture.natural-regions", { file: "exam/zim-p2-b-agriculture", keyPrefix: "exam.zim-p2-b-agriculture", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.agriculture.natural-regions", "geo.agriculture.farming-types"],
    stem: "Table 1 gives the mean annual rainfall at four fictional weather stations in Zimbabwe (fictional data).\n\n| Station | Location | Mean annual rainfall (mm) | Notes |\n|---|---|---|---|\n| P | Eastern mountains | 1,350 | Rain in most months; cool |\n| Q | Northern highveld | 860 | Reliable; few dry spells |\n| R | Southern middleveld | see Table 2 | Frequent droughts |\n| S | Lowveld | 370 | Very erratic; hot |\n\nTable 2 shows annual rainfall at Station R over five years (fictional data).\n\n| Year | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Rainfall (mm) | 610 | 420 | 700 | 380 | 690 |",
    hints: ["Mean = total ÷ 5; range = highest − lowest.", "Link rainfall amount and reliability to natural regions and farming."],
    parts: [
      P.num({ label: "(a)", marks: 2, unit: "mm", stem: "Calculate the mean annual rainfall at Station R.", value: 560, tol: 0.5, wrong: [2800, 320], explanation: "(610 + 420 + 700 + 380 + 690) ÷ 5 = 2,800 ÷ 5 = 560 mm." }),
      P.num({ label: "(b)", unit: "mm", stem: "Calculate the range of annual rainfall at Station R.", value: 320, wrong: [560, 1080], explanation: "700 − 380 = 320 mm." }),
      P.mcq({
        label: "(c)", stem: "In which natural region is Station R most likely to be?",
        options: [
          ["Region IV", "Correct: a mean of about 560 mm with frequent droughts fits Region IV."],
          ["Region I", "Region I receives more than about 1,000 mm."],
          ["Region IIa", "Region IIa receives about 750–1,000 mm of reliable rain."],
          ["Region V", "Region V is drier still, with rainfall well below Station R's mean in most years."],
        ],
        answer: "A", explanation: "About 450–650 mm with frequent droughts describes Region IV.",
      }),
      P.match({
        label: "(d)", stem: "Match each station with the farming best suited to its area.",
        pairs: [
          ["Station P", "Tea, fruit and forestry plantations"],
          ["Station Q", "Intensive maize, tobacco and soya beans"],
          ["Station R", "Livestock with sorghum and millets"],
          ["Station S", "Extensive cattle and game ranching"],
        ],
        explanation: "Farming becomes less intensive as rainfall falls and becomes less reliable.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Station S lies in the Lowveld. Explain how large estates there can grow sugar cane despite the low rainfall.",
        points: [
          "Water is stored in large dams such as Lake Mutirikwi (and Tugwi-Mukosi).",
          "It is carried by canals to irrigate the cane fields (e.g. Triangle and Hippo Valley).",
          "High Lowveld temperatures give a long, hot growing season that suits sugar cane / estates have capital for irrigation and mills.",
        ],
        modelAnswer: "Water from dams such as Lake Mutirikwi is carried by canals to irrigate the estates around Triangle and Hippo Valley. With water supplied, the Lowveld's high temperatures give an ideal long growing season for sugar cane.",
        explanation: "Irrigation overcomes the rainfall limit; heat favours the crop.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe the characteristics of commercial dairy farming near Station Q and explain why it is located close to towns.",
        points: [
          "High-yielding breeds such as Friesian or Jersey on planted pastures with bought feed.",
          "Machine milking twice a day; milk cooled and collected daily for processors such as Dairibord.",
          "Near towns because milk is perishable and bulky, so it must reach processors and consumers quickly and cheaply.",
        ],
        modelAnswer: "Dairy farms keep Friesian or Jersey cows on planted pastures with extra feed, milk them by machine twice a day and cool the milk for daily collection. They are close to towns because fresh milk is perishable and bulky, so it must reach dairies and consumers quickly.",
        explanation: "Describe the farm system, then explain the market factor.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Explain **three** challenges faced by communal farmers near Station R.",
        points: [
          "Low and unreliable rainfall (380–700 mm in Table 2) causes frequent crop failure.",
          "Sandy, infertile soils and lack of money for fertiliser keep yields low.",
          "Overgrazing of shared grazing land causes erosion / small fragmented plots / poor roads and markets.",
        ],
        modelAnswer: "Rainfall varies from 380 to 700 mm, so in dry years maize fails. Many soils are sandy and infertile and farmers cannot afford fertiliser. Shared grazing land is overgrazed, so soil is eroded.",
        explanation: "Use the data and give an effect for each challenge.",
      }),
      P.manual({
        label: "(h)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "With reference to named areas in Zimbabwe, explain how physical factors influence the distribution of farming types, and evaluate how far irrigation can overcome these physical limits.",
        points: [
          "Rainfall amount and reliability: Region I (Eastern Highlands) tea, coffee, forestry; Region II (highveld around Harare) intensive maize, tobacco, soya.",
          "Dry Regions IV and V (Matabeleland, Lowveld, Zambezi valley): ranching and drought-tolerant crops.",
          "Temperature and altitude: cool highlands suit tea and apples; hot lowveld suits sugar cane and cattle.",
          "Soils and relief: fertile highveld soils for crops; sandy soils for grazing; steep slopes for plantations and forestry.",
          "Irrigation success: Lowveld sugar estates (Triangle, Hippo Valley) using Lake Mutirikwi; smallholder schemes such as Nyanyadzi; winter wheat on the highveld.",
          "Irrigation limits: high cost of dams, canals, pumps and power; siltation, salinisation, waterlogging; diseases.",
          "Only a small share of land is near reliable water, so most dry land still depends on rainfall.",
          "Judgement: irrigation overcomes physical limits locally where water and capital exist, but physical factors still control farming over most of the country.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Rainfall is the main physical factor. The Eastern Highlands (Region I) receive more than about 1,000 mm, so they grow tea, coffee and plantation forests. The highveld around Harare and Marondera (Region II) has reliable rain and fertile soils, so maize, tobacco and soya beans are grown intensively. Rainfall falls and becomes unreliable towards the south and west, so Matabeleland and Masvingo (Region IV) are used for livestock and small grains, and the Lowveld and Zambezi valley (Region V) for extensive ranching. Temperature also matters: cool highlands suit apples and tea, and the hot Lowveld suits cattle and sugar cane. Irrigation can overcome these limits where water is available. Lake Mutirikwi supplies the sugar estates at Triangle and Hippo Valley, making a dry region very productive, and smallholder schemes such as Nyanyadzi grow crops in the dry season. However, dams, canals and pumps are expensive, schemes suffer from siltation and salinisation, and most of Regions IV and V are far from reliable water. Irrigation therefore overcomes physical limits only in favoured places; over most of the country rainfall still decides the type of farming.",
        explanation: "Explain the physical pattern with named areas, then evaluate irrigation and conclude.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section B agriculture question: rainfall data, natural regions, farming types, irrigation and an extended evaluation.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.agriculture.climate-pests", "geo.agriculture.urban-agribusiness", "geo.agriculture.land-tenure-reform"],
    stem: "Table 1 shows data for maize farming in a fictional resettlement district in Zimbabwe over five seasons (fictional data).\n\n| Season | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Rainfall (mm) | 780 | 620 | 540 | 700 | 450 |\n| Fields with fall armyworm (%) | 5 | 20 | 35 | 30 | 40 |\n| Maize yield (t/ha) | 2.5 | 1.9 | 1.2 | 1.7 | 0.8 |",
    hints: ["Mean = total ÷ number of seasons.", "Percentage change = change ÷ original × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean maize yield over the five seasons, in t/ha.", value: 1.62, tol: 0.005, wrong: [8.1, 1.6], answer: "1.62", explanation: "(2.5 + 1.9 + 1.2 + 1.7 + 0.8) ÷ 5 = 8.1 ÷ 5 = 1.62 t/ha." }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage fall in maize yield from Season 1 to Season 5. Give your answer to one decimal place.", value: 68, answer: "68.0", tol: 0.05, wrong: [212.5, 32], explanation: "Fall = 2.5 − 0.8 = 1.7; 1.7 ÷ 2.5 × 100 = 68.0%." }),
      P.mcq({
        label: "(c)", stem: "Which statement is best supported by Table 1?",
        options: [
          ["Yields were lowest when rainfall was low and armyworm was widespread", "Correct: Season 5 had the least rain, the most armyworm and the lowest yield."],
          ["Armyworm infestation fell steadily over the five seasons", "It rose from 5% to 40%, with a small dip in Season 4."],
          ["Yields rose as rainfall decreased", "Yields generally fell as rainfall decreased."],
          ["Rainfall had no link with maize yield in any of the five seasons shown", "Wetter seasons generally had higher yields."],
        ],
        answer: "A", explanation: "Both drought and pests reduce yields; Season 5 shows their combined effect.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest a manual, a biological and a chemical method of controlling fall armyworm.",
        points: [
          "Manual: hand-picking and crushing larvae / early planting / destroying residues.",
          "Biological: encouraging natural enemies such as parasitic wasps, ants and birds / intercropping / tolerant varieties.",
          "Chemical: spraying an approved insecticide into the maize funnel.",
        ],
        modelAnswer: "Hand-pick and crush caterpillars; encourage natural enemies such as parasitic wasps; spray an approved insecticide into the funnel when infestation is high.",
        explanation: "One method from each group.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Distinguish between climate change **mitigation** and **adaptation**, giving a farming example of each.",
        points: [
          "Mitigation reduces the causes of climate change, e.g. planting woodlots / less burning of residues.",
          "Adaptation helps farmers cope with its effects, e.g. drought-tolerant crops / water harvesting.",
        ],
        modelAnswer: "Mitigation tackles the causes, such as planting trees to absorb carbon; adaptation copes with the effects, such as growing drought-tolerant sorghum.",
        explanation: "Causes versus effects.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Explain how conservation agriculture (Pfumvudza/Intwasa) can help farmers in this district.",
        points: [
          "Mulch cover reduces evaporation and keeps soil moist through dry spells.",
          "Planting basins and minimum tillage concentrate water and nutrients at the plant and reduce erosion.",
          "Crop rotation improves soil fertility and breaks pest cycles, giving more stable yields.",
        ],
        modelAnswer: "Mulch keeps the soil moist during dry spells, planting basins collect water and manure at each plant without ploughing the whole field, and rotation improves fertility and breaks pest cycles, so yields are steadier in dry seasons like Season 5.",
        explanation: "Link each principle to a benefit.",
      }),
      P.short({ label: "(g)", stem: "Name a tick-borne disease of cattle that is common in the rainy season.", accepted: ["january disease", "theileriosis", "east coast fever", "heartwater", "redwater", "gall sickness", "anaplasmosis", "babesiosis"], wrong: ["foot-and-mouth disease"], explanation: "January disease (theileriosis), heartwater, redwater and gall sickness are spread by ticks." }),
      P.manual({
        label: "(h)", marks: 3, stem: "Many A1 farmers in the district cannot afford seed and fertiliser after poor seasons. Explain how contract farming and other agribusiness funding could help them.",
        points: [
          "A contracting company advances seed, fertiliser and chemicals on credit, recovering the cost when it buys the crop.",
          "Contracts guarantee a buyer and price and often provide extension advice.",
          "Other sources: savings clubs, microfinance or Agribank loans, government input schemes; useful because permits or leases are hard to use as collateral.",
        ],
        modelAnswer: "Under contract farming a company supplies seed and fertiliser on credit and deducts the cost when it buys the harvest, so farmers need no cash up front, and they gain advice and a guaranteed market. Farmers can also use savings clubs or microfinance loans, which matters because their permits are hard to use as collateral at banks.",
        explanation: "Explain how each source overcomes the lack of capital.",
      }),
      P.manual({
        label: "(i)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Evaluate the measures that can help Zimbabwe's farmers adapt to climate change.",
        points: [
          "Conservation agriculture (Pfumvudza/Intwasa): conserves moisture, low cost; but labour-intensive and mulch is scarce.",
          "Drought-tolerant crops (sorghum, millets) and early-maturing varieties: reduce crop failure; but lower demand/prices and processing effort.",
          "Hardy breeds (Mashona cattle, goats) and reduced stocking: survive drought; but slower growth.",
          "Irrigation and water harvesting (small dams, tied ridges, drip): reliable yields; but costly and limited by water.",
          "Diversification (gardens, poultry, beekeeping) and insurance, early warning: spread risk.",
          "Pest management for spreading pests such as fall armyworm.",
          ["Judgement: a combination suited to each natural region works best; support (finance, extension) decides success.", 2],
        ],
        levels: geographyLevels(8),
        modelAnswer: "Conservation agriculture through Pfumvudza/Intwasa is cheap and keeps soil moist during dry spells, but digging basins is hard work and mulch is often eaten by livestock. Drought-tolerant sorghum and millets and early-maturing maize reduce the risk of total crop failure, though small grains are more work to process and sell. Hardy breeds such as Mashona cattle and goats survive droughts better than exotic breeds. Irrigation from small dams and boreholes, and water harvesting with tied ridges, give the most reliable yields, but they cost money and depend on water being available. Diversifying into gardens, poultry or beekeeping spreads risk, and weather forecasts and insurance help farmers plan. Pest control is also needed as fall armyworm spreads. No single measure is enough: the best approach combines several, chosen to suit each natural region, and depends on farmers receiving finance and extension support.",
        explanation: "Evaluate strengths and limits of several measures and conclude.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section B agriculture question: data on rainfall, pests and yields, pest control, climate change responses, livestock disease, agribusiness funding and an extended evaluation.",
  });
});
