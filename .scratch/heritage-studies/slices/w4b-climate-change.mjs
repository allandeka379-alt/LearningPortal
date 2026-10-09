// W4b: Climate change (her.global.climate-change).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.global.climate-change", { file: "global/climate-change", keyPrefix: "global.climate-change" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **climate**?",
    options: [
      ["the average pattern of weather in a place over a long period", "Correct: climate is the long-term average, usually over about 30 years."],
      ["the condition of the atmosphere at a place on one particular day", "This describes weather."],
      ["the amount of rain that fell in Harare yesterday afternoon", "This is a weather record."],
      ["a sudden storm with strong winds", "This is a weather event."],
    ],
    answer: "A",
    explanation: "Climate is the long-term average; weather is the day-to-day condition.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which gas is released when coal, petrol and diesel are burnt and is the main cause of climate change?",
    options: [
      ["carbon dioxide", "Correct: burning fossil fuels releases carbon dioxide."],
      ["oxygen", "Oxygen is used up in burning, not released by it."],
      ["nitrogen", "Nitrogen makes up most of the air but is not the main greenhouse gas from burning."],
      ["helium", "Helium is not released by burning fuels."],
    ],
    answer: "A",
    explanation: "Carbon dioxide from burning fossil fuels is the largest human contribution to climate change.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is an example of **adaptation** to climate change?",
    options: [
      ["growing drought-tolerant sorghum", "Correct: it helps farmers cope with dry spells."],
      ["building more coal power stations", "This would add to the causes of climate change."],
      ["burning crop stalks after the harvest", "Burning releases carbon and leaves soil bare."],
      ["clearing woodland for new fields", "Deforestation adds to climate change."],
    ],
    answer: "A",
    explanation: "Adaptation means coping with the effects: drought-tolerant crops survive dry spells.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an example of **mitigation** of climate change?",
    options: [
      ["installing solar panels instead of a diesel generator", "Correct: it cuts greenhouse gas emissions."],
      ["digging a pond to store rainwater for watering crops in the dry season", "This is adaptation: it copes with drought."],
      ["planting early-maturing maize varieties", "This is adaptation to shorter rains."],
      ["building a flood warning system", "This is preparedness for the effects."],
    ],
    answer: "A",
    explanation: "Mitigation reduces the causes, e.g. replacing fossil fuels with renewable energy.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which year was the Paris Agreement on climate change adopted?",
    options: [
      ["2015", "Correct: it was adopted at the Paris conference in December 2015."],
      ["1945", "1945 is the founding of the United Nations."],
      ["1992", "1992 is the year of the UN Framework Convention on Climate Change."],
      ["2003", "2003 is not the year of a major climate agreement."],
    ],
    answer: "A",
    explanation: "The Paris Agreement (2015) aims to keep global warming well below 2 °C.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "During a drought year, Zimbabwe experiences long power cuts. Which explanation is **best**?",
    options: [
      ["Less water flows into Lake Kariba, so less hydroelectric power is generated", "Correct: Kariba's output depends on water levels."],
      ["Drought dries out the coal at Hwange, so the thermal power station must close", "Drought does not stop coal-fired generation; the problem is water at Kariba."],
      ["Solar panels stop working completely in dry weather", "Solar panels work best in sunny, dry weather."],
      ["People use less electricity in dry years", "Lower use would not cause power cuts."],
    ],
    answer: "A",
    hints: ["Where does much of Zimbabwe's electricity come from?"],
    explanation: "Kariba's hydroelectric station needs water from the Zambezi; low inflows mean less electricity.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka says, \"It was very cold last week, so climate change cannot be happening.\" What is wrong with her reasoning?",
    options: [
      ["She judges a long-term trend from a few days of weather", "Correct: climate is about long-term averages."],
      ["Cold weather proves the climate is warming faster", "One cold week proves neither."],
      ["Climate change only affects countries far away from Africa", "It affects every region, including Zimbabwe."],
      ["Weather and climate mean exactly the same thing", "They are different: short-term versus long-term."],
    ],
    hints: ["How long a period does climate describe?"],
    answer: "A",
    explanation: "One week is weather. Climate change is a shift in the long-term average over decades.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do international agreements say richer, industrialised countries should do more to tackle climate change?",
    options: [
      ["They have released most greenhouse gases over history and can afford more", "Correct: this is the idea of common but differentiated responsibilities."],
      ["They are the only countries affected by climate change", "Poorer countries are often affected more."],
      ["Poorer countries have released far more greenhouse gases over history than richer ones", "Poorer countries have released far less."],
      ["Climate change in poorer countries has no human cause", "The causes are global."],
    ],
    answer: "A",
    hints: ["Think about who caused most of the problem and who can pay."],
    explanation: "Countries that industrialised early released most of the gases and have more resources, so they are expected to do more.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trees absorb carbon dioxide from the air.",
    answer: true,
    explanation: "True. Trees store carbon, which is why afforestation helps mitigate climate change.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Because Zimbabwe produces only a small share of the world's greenhouse gases, it is hardly affected by climate change.",
    answer: false,
    explanation: "False. Zimbabwe produces little but is very vulnerable, because most families depend on rain-fed farming.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each action as adaptation or mitigation.",
    pairs: ["water harvesting tanks", "using solar water heaters", "planting drought-tolerant crops", "replacing a diesel generator with solar power"],
    right: ["adaptation", "mitigation"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Tanks and drought-tolerant crops help people cope (adaptation); solar energy cuts emissions (mitigation).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Cattle release the greenhouse gas {{blank:a}} as they digest their food. The natural trapping of heat by gases in the atmosphere is called the {{blank:b}} effect.",
    blanks: [
      { id: "a", accepted: ["methane"], choices: ["methane", "oxygen", "hydrogen", "ozone"] },
      { id: "b", accepted: ["greenhouse"], choices: ["greenhouse", "ozone", "rain shadow", "El Niño"] },
    ],
    explanation: "Cattle produce methane; the greenhouse effect is the trapping of heat by atmospheric gases.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between weather and climate, giving an example of each.",
    points: [
      "Weather: the condition of the atmosphere at a place and time (short-term)",
      "Example of weather, e.g. heavy rain in Mutare yesterday",
      "Climate: the average weather pattern over a long period (about 30 years)",
      "Example of climate, e.g. Bulawayo is usually drier than Mutare / rain falls mainly November-March",
    ],
    modelAnswer: "Weather is the condition of the atmosphere at a place and time, for example heavy rain in Mutare yesterday. Climate is the average weather pattern over about 30 years or more, for example Bulawayo is usually drier than Mutare.",
    explanation: "One mark for each meaning and one for each suitable example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of climate change on Zimbabwe.",
    points: [
      "Identifies droughts / unreliable rainfall",
      "Develops: crops fail and livestock die, causing hunger",
      "Identifies floods / stronger storms",
      "Develops: homes, roads and crops destroyed; lives lost (e.g. cyclones)",
      "Identifies low dam levels / power cuts / health effects",
      "Develops: e.g. less hydroelectric power from Kariba; or malaria and water-borne disease spread",
    ],
    modelAnswer: "Rainfall is becoming less reliable and droughts more frequent, so crops fail and cattle die, causing hunger. Stronger storms and floods destroy homes, roads and crops and can cost lives. Low water levels in Lake Kariba reduce hydroelectric power, causing power cuts that hurt homes, hospitals and factories.",
    hints: ["Think of farming, extreme events and energy or health."],
    explanation: "One mark for each effect and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a fictional secondary school in Bindura could help mitigate climate change, and explain how each would help.",
    points: [
      "Suggests planting and caring for trees / a woodlot",
      "Explains that trees absorb carbon dioxide (and replace firewood cut from the wild)",
      "Suggests solar power / energy saving / efficient stoves in the school kitchen / composting instead of burning waste",
      "Explains how it cuts greenhouse gas emissions",
    ],
    modelAnswer: "The school could plant and care for a woodlot, because trees absorb carbon dioxide from the air. It could also install solar panels to replace a diesel generator, which cuts the carbon dioxide released by burning fuel.",
    hints: ["Mitigation means reducing the causes."],
    explanation: "One mark for each suitable measure and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: source("Source A", "a table of rainfall records from a fictional school weather station near Masvingo",
      table(["Rainy season", "Total rainfall (mm)", "First good planting rain", "Longest dry spell in January-February"], [
        ["2016-17", 690, "mid-November", "9 days"],
        ["2018-19", 410, "mid-December", "24 days"],
        ["2020-21", 720, "late November", "11 days"],
        ["2023-24", 380, "late December", "31 days"],
      ])) +
      "\n\nStudy Source A and answer the questions. (The figures are invented for this question.)",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "In which season did the first good planting rain come **latest**?",
        options: [
          ["2023-24", "Correct: late December."],
          ["2016-17", "Mid-November."],
          ["2018-19", "Mid-December, earlier than late December."],
          ["2020-21", "Late November."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** ways in which the 2023-24 season was difficult for farmers.",
        points: ["Least rain (380 mm)", "Late start (late December) / longest dry spell (31 days)"],
        modelAnswer: "It had the least rain (380 mm) and the longest mid-season dry spell (31 days); the rains also started late.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why four seasons of records are **not enough** to prove that the climate of the area has changed.",
        points: [
          "Climate is the average over a long period, about 30 years",
          "Four seasons show weather/year-to-year variation, which is natural",
          "A trend needs many more years of records (or records from many stations)",
        ],
        modelAnswer: "Climate is the average weather over about 30 years. Four seasons only show how the weather varies from year to year, which happens naturally; the good 2020-21 season shows this. To prove a change, scientists need many more years of records, ideally from many stations.",
      }),
    ],
    hints: ["In (c), remember how long a period climate describes."],
    explanation: "A data-based practice item on weather, climate and evidence of change.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about responses to climate change.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Distinguish between adaptation and mitigation, giving an example of each.",
        points: [
          "Adaptation: coping with the effects of climate change",
          "Example, e.g. drought-tolerant crops, water harvesting, conservation farming",
          "Mitigation: reducing the causes (cutting or absorbing greenhouse gases)",
          "Example, e.g. solar energy, afforestation, efficient stoves",
        ],
        modelAnswer: "Adaptation means changing the way we live to cope with the effects of climate change, for example growing drought-tolerant sorghum. Mitigation means reducing the causes, for example using solar power instead of coal so that less carbon dioxide is released.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"For a country like Zimbabwe, adaptation to climate change matters more than mitigation.\" Discuss.",
        points: [
          ["For adaptation: Zimbabwe's emissions are small; effects (drought, floods) already hurt rain-fed farmers; adaptation protects food and lives now", 3],
          ["For mitigation: every country shares responsibility; forests and clean energy also bring local benefits (less erosion, cheaper solar power, health)", 3],
          ["Linked actions: tree planting and conservation farming both adapt and mitigate; international support (Paris Agreement) helps both", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "There is a strong case for putting adaptation first. Zimbabwe produces only a small share of the world's greenhouse gases, so cutting its emissions will change the global climate very little. Meanwhile most families depend on rain-fed farming, and droughts, late rains and floods already threaten food and lives. Drought-tolerant crops, conservation farming, water harvesting and early warnings protect people now.\n\nHowever, mitigation still matters. Under the Paris Agreement every country is expected to play its part, and Zimbabwe can hardly ask richer countries to cut emissions while ignoring its own. Mitigation also brings local benefits: solar power reduces dependence on Kariba and imported fuel, and protecting forests reduces soil erosion and keeps firewood, fruits and wildlife.\n\nMany actions do both. Planting trees absorbs carbon and protects soil and water; conservation farming keeps soil moist and avoids burning crop stalks. International climate finance can support adaptation and clean energy together.\n\nI largely agree that adaptation is the more urgent priority, because lives and food are at stake now and Zimbabwe's emissions are small. But the best strategy chooses actions that adapt and mitigate at the same time, so the two should not be seen as rivals.",
      }),
    ],
    hints: ["In (b), consider who causes the problem, who suffers, and actions that do both."],
    explanation: "A practice evaluative item weighing adaptation and mitigation.",
  });

  b.card("DEFINITION", "Climate change", "A long-term change in average temperature and weather patterns, now mainly caused by human greenhouse gas emissions.");
  b.card("DEFINITION", "Weather vs climate", "Weather: the atmosphere's condition at a time and place. Climate: the average weather over about 30 years or more.");
  b.card("DEFINITION", "Greenhouse gases", "Gases such as carbon dioxide, methane and nitrous oxide that trap heat in the atmosphere.");
  b.card("DEFINITION", "Adaptation", "Changing how we live and work to cope with the effects of climate change.");
  b.card("DEFINITION", "Mitigation (climate change)", "Reducing the causes of climate change by cutting or absorbing greenhouse gas emissions.");
  b.card("FACT", "When was the Paris Agreement on climate change adopted?", "2015 (aim: keep warming well below 2 °C).");
  b.card("CONCEPT", "Name three human causes of climate change.", "Burning fossil fuels, deforestation and veld fires, agriculture (cattle methane, fertilisers); also rotting waste.");
  b.card("CONCEPT", "Give three adaptation measures for Zimbabwean farmers.", "Drought-tolerant crops (small grains), conservation farming (planting basins, mulch), water harvesting (also early warnings, diversifying).");
  b.card("CONCEPT", "Why can tree planting count as both adaptation and mitigation?", "Trees absorb carbon dioxide (mitigation) and protect soil and water from drought and erosion (adaptation).");
});
