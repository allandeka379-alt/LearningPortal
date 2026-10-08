// Slice G4b: population growth and the demographic transition model (ZIMSEC 7.11.8; Cambridge 6.1.1, 6.1.2, 6.1.4).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.population.growth-dtm", { file: "population/growth-dtm", keyPrefix: "population.growth-dtm" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which stage of the demographic transition model is natural increase **highest**?",
    options: [
      ["Stage 2", "Correct: death rates fall sharply while birth rates stay high."],
      ["Stage 1", "Both rates are high, so growth is very low."],
      ["Stage 4", "Both rates are low, so growth is low."],
      ["Stage 5", "Births fall below deaths, so the population declines."],
    ],
    answer: "A",
    explanation: "The gap between birth and death rates is widest in stage 2.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In about which year did the world's population pass 8 billion, according to the United Nations?",
    options: [
      ["2022", "Correct: November 2022 (UN estimate)."],
      ["1999", "The 6 billion mark was passed in about 1999."],
      ["2011", "The 7 billion mark was passed in about 2011."],
      ["1960", "The world had about 3 billion people in 1960."],
    ],
    answer: "A",
    explanation: "The UN marked 8 billion in 2022.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does the death rate fall in stage 2 of the DTM?",
    options: [
      ["Better health care and water", "Correct: these reduce deaths from disease and famine."],
      ["Widespread use of contraception", "Contraception lowers the birth rate, mainly in stage 3."],
      ["An ageing population", "Ageing raises the death rate in stage 5."],
      ["Rising emigration of young adults", "Migration is not part of the DTM."],
    ],
    answer: "A",
    explanation: "Medical and sanitation improvements cut deaths.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which factor is most likely to reduce the birth rate?",
    options: [
      ["More girls completing secondary education", "Correct: educated women marry later and have fewer children."],
      ["Higher infant mortality", "High infant mortality encourages more births."],
      ["Children needed to work on farms", "This keeps birth rates high."],
      ["Early marriage", "Early marriage lengthens childbearing years."],
    ],
    answer: "A",
    explanation: "Female education is one of the strongest influences on fertility.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which stage of the DTM best describes Zimbabwe today?",
    options: [
      ["Stage 3", "Correct: the birth rate is falling, the death rate is low, and growth is slowing."],
      ["Stage 1", "Death rates are no longer high and fluctuating."],
      ["Stage 4", "Zimbabwe's birth rate is still well above its death rate."],
      ["Stage 5", "Zimbabwe's population is still growing."],
    ],
    answer: "A",
    explanation: "Falling fertility and lower death rates place Zimbabwe in stage 3.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Which country is an example of stage 5 of the DTM?",
    options: [
      ["Japan", "Correct: deaths exceed births and the population is falling."],
      ["Niger", "Niger has very high birth rates (stage 2)."],
      ["India", "India is in stage 3."],
      ["Kenya", "Kenya is in stage 3."],
    ],
    answer: "A",
    explanation: "Japan's population has been falling since about 2010.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Which event raised deaths in Zimbabwe in the 1990s?"],
    stem: "Which limitation of the DTM is best shown by Zimbabwe in the 1990s and early 2000s?",
    options: [
      ["It ignores epidemics such as HIV and AIDS", "Correct: deaths rose when the model predicted they would stay low."],
      ["It wrongly says birth rates fall in stage 3", "Birth rates did fall in Zimbabwe, as the model predicts."],
      ["It only applies to countries in Asia", "It was based on Europe and is applied worldwide."],
      ["It has no stage with high birth rates", "Stages 1 and 2 have high birth rates."],
    ],
    answer: "A",
    explanation: "HIV and AIDS raised death rates, which the DTM does not predict.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Small percentage, large base."],
    stem: "The world's growth rate has fallen since the late 1960s. Why does the world's population still increase by tens of millions each year?",
    options: [
      ["The base population is very large", "Correct: the base population is huge."],
      ["Death rates are rising quickly worldwide", "Rising deaths would reduce growth."],
      ["Birth rates are rising in most countries", "Birth rates are falling in most countries."],
      ["More people are migrating between countries", "Migration does not change the world total."],
    ],
    answer: "A",
    explanation: "Population momentum: even under 1% of 8 billion is tens of millions.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Compare the birth and death rates."],
    stem: "A country has a birth rate of 14 per 1,000 and a death rate of 11 per 1,000. In which stage of the DTM is it most likely to be?",
    options: [
      ["Stage 4", "Correct: both rates are low, with slow natural increase."],
      ["Stage 2", "Stage 2 has high birth rates."],
      ["Stage 3", "Stage 3 birth rates are still well above death rates, though falling."],
      ["Stage 1", "Stage 1 has high birth and death rates."],
    ],
    answer: "A",
    explanation: "Low rates and slow growth (0.3%) suggest stage 4.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Most of the world's population growth today takes place in sub-Saharan Africa and South Asia.",
    answer: true,
    explanation: "True. Populations in much of Europe and East Asia are stable or falling.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The demographic transition model includes the effects of international migration.",
    answer: false,
    explanation: "False. The DTM shows only births and deaths; ignoring migration is one of its limitations.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each DTM stage with its description.",
    pairs: [
      ["Stage 1", "High birth and death rates, low growth"],
      ["Stage 2", "High birth rate, rapidly falling death rate"],
      ["Stage 3", "Falling birth rate, low death rate"],
      ["Stage 5", "Birth rate below death rate"],
    ],
    explanation: "Each stage has a characteristic combination of rates.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "When the death rate exceeds the birth rate there is a natural {{blank:a}}. The very rapid world population growth of the 20th century is often called the population {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["decrease"], choices: ["decrease", "increase", "transition", "density"] },
      { id: "b", accepted: ["explosion"], choices: ["explosion", "pyramid", "policy", "density"] },
    ],
    explanation: "Natural decrease means deaths exceed births.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%", daily: true,
    stem: "A fictional country has a birth rate of 36 per 1,000 and a death rate of 14 per 1,000. Calculate its natural increase as a percentage.",
    value: 2.2, tol: 0.05,
    wrong: [22, 5],
    explanation: "(36 − 14) ÷ 10 = 2.2%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Increase ÷ original × 100."],
    stem: "The world's population rose from about 7 billion in 2011 to about 8 billion in 2022 (approximate UN figures). Calculate the percentage increase. Give your answer to one decimal place.",
    value: 14.286, answer: "14.3", tol: 0.05,
    wrong: [12.5, 1],
    workedSolution: "1. Increase = 8 − 7 = 1 billion.\n2. 1 ÷ 7 × 100 = 14.3%.",
    explanation: "1 ÷ 7 × 100 = 14.3%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why birth rates fall in stage 3 of the demographic transition model.",
    points: [
      "Family planning becomes available and widely used.",
      "Explains that couples can then choose to have fewer children.",
      "Women's education and paid work / urbanisation raises the cost of children.",
      "Explains that falling infant mortality means fewer births are needed for children to survive.",
    ],
    modelAnswer: "Family planning clinics make contraception available, so couples can choose smaller families. As more people live in towns and more women are educated and work, children cost more and are less needed as farm labour, and as infant mortality falls parents no longer need many births to ensure some children survive.",
    explanation: "Two reasons, each developed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    hints: ["Think of services, jobs, land and environment."],
    stem: "Explain the effects of rapid population growth on a country such as Zimbabwe.",
    points: [
      "Pressure on schools, clinics, housing and water supply.",
      "Unemployment, especially among young school leavers.",
      "Land shortage in communal areas, leading to overcultivation, overgrazing and deforestation.",
      "Rapid urban growth / unplanned settlements / high dependency ratio / but a large future workforce.",
    ],
    modelAnswer: "Rapid growth means more children needing schools and clinics and more families needing housing and water. Not enough jobs are created for school leavers. In communal areas land is divided into smaller plots, leading to overgrazing and deforestation, and many people move to towns, adding to unplanned settlements.",
    explanation: "Link growth to specific effects.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    hints: ["Describe the stages, then give strengths and limitations with examples."],
    stem: "Describe the demographic transition model and evaluate its usefulness for understanding population change in LICs.",
    points: [
      "Describes stages 1-2: high birth and death rates; death rate falls in stage 2 causing rapid growth.",
      "Describes stages 3-5: birth rate falls; low rates in stage 4; decline in stage 5.",
      "Strength: simple; links development to birth and death rates; allows comparison and prediction.",
      "Strength: many countries fit it (e.g. UK history; Niger stage 2; India stage 3; Japan stage 5).",
      "Limitation: based on Europe; LICs' transition was faster and driven by imported medicine.",
      "Limitation: ignores migration, disease (HIV/AIDS), war, policy and culture; no time scale.",
      "Judgement on usefulness for LICs.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "In stage 1 birth and death rates are both high, so the population grows slowly. In stage 2 health care, clean water and food lower the death rate while the birth rate stays high, so growth is rapid, as in Niger today. In stage 3 the birth rate falls with family planning, education and urbanisation, as in India and Zimbabwe. In stage 4 both rates are low, and in stage 5, as in Japan, deaths exceed births. The model is useful because it is simple, links population change to development and lets us compare countries and predict change. However, it was based on Europe, where transition took over a century; in LICs death rates fell much faster because of imported vaccines and medicines. It ignores migration, which matters greatly for countries such as Zimbabwe, and diseases such as HIV and AIDS, which raised death rates there in the 1990s. Policies such as China's one-child policy and cultural factors are also left out. The model is a useful starting point for LICs but must be used with these limitations in mind.",
    explanation: "Describe, evaluate and judge.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows birth and death rates for a fictional country (per 1,000, fictional data).\n\n| Year | Birth rate | Death rate |\n|---|---|---|\n| 1900 | 44 | 38 |\n| 1950 | 46 | 22 |\n| 1980 | 41 | 12 |\n| 2000 | 30 | 14 |\n| 2020 | 25 | 8 |",
    hints: ["Natural increase = birth rate − death rate.", "Which year has the largest gap?"],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the natural increase per 1,000 in 1980.", value: 29, unit: "‰", wrong: [53, 2.9], explanation: "41 − 12 = 29 per 1,000." }),
      P.mcq({
        label: "(b)", stem: "Which DTM stage does the change between 1900 and 1950 best represent?",
        options: [
          ["Stage 2", "Correct: the death rate fell sharply while the birth rate stayed high."],
          ["Stage 1", "Stage 1 has no sustained fall in deaths."],
          ["Stage 4", "Both rates would be low."],
          ["Stage 5", "Births would be below deaths."],
        ],
        answer: "A", explanation: "Falling deaths with high births = stage 2.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "The death rate rose between 1980 and 2000. Suggest **one** reason, and explain why this is a limitation of the DTM.",
        points: ["Reason: a disease epidemic such as HIV and AIDS / war / famine / economic collapse affecting health care.", "The DTM assumes death rates keep falling or stay low, so it cannot explain such a rise."],
        modelAnswer: "An epidemic such as HIV and AIDS could have raised the death rate. The DTM does not allow for death rates rising again in stage 3.",
        explanation: "Link the anomaly to a limitation.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest reasons for the fall in the birth rate between 1980 and 2020.",
        points: ["Wider use of family planning / contraception.", "More girls educated and women in paid work; later marriage.", "Urbanisation raises the cost of children / lower infant mortality means fewer births needed."],
        modelAnswer: "Family planning became widely available, more girls stayed in school and married later, and as more people moved to towns children became more expensive and fewer were needed as farm labour.",
        explanation: "Three reasons linked to development.",
      }),
    ],
    explanation: "This item practises applying the DTM to data.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 420, applies: CAM,
    stem: "Table 1 shows the approximate year in which the world reached each billion (United Nations estimates).\n\n| World population | Approximate year |\n|---|---|\n| 5 billion | 1987 |\n| 6 billion | 1999 |\n| 7 billion | 2011 |\n| 8 billion | 2022 |",
    hints: ["Subtract the years."],
    parts: [
      P.num({ label: "(a)", unit: "years", stem: "How many years did it take to grow from 7 billion to 8 billion?", value: 11, wrong: [12, 1], explanation: "2022 − 2011 = 11 years." }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe the trend in world population growth shown in Table 1, and state where most growth is taking place today.",
        points: ["Population rises by about a billion every 11-12 years.", "Growth continues, but the time between billions is no longer shrinking much (rate is slowing).", "Most growth is in sub-Saharan Africa and South Asia."],
        modelAnswer: "The world added a billion people roughly every 11-12 years between 1987 and 2022, so growth has continued steadily, although the interval is no longer getting shorter as the growth rate slows. Most growth is now in sub-Saharan Africa and South Asia.",
        explanation: "Describe with data, then locate growth.",
      }),
    ],
    explanation: "This item practises describing global population trends.",
  });

  b.card("DEFINITION", "Demographic transition model", "A model showing how birth rates, death rates and population change in five stages as a country develops.");
  b.card("CONCEPT", "DTM stages 1-2", "1: high birth and death rates, low growth. 2: death rate falls rapidly, birth rate high, rapid growth.");
  b.card("CONCEPT", "DTM stages 3-5", "3: birth rate falls, growth slows. 4: both low, stable. 5: births below deaths, decline.");
  b.card("CONCEPT", "Limitations of the DTM", "Based on Europe; ignores migration, disease (HIV/AIDS), war, policy and culture; no time scale; LIC transition faster.");
  b.card("FACT", "World population milestones", "About 1 billion (1800), 3 billion (1960), 6 billion (1999), 7 billion (2011), 8 billion (2022) - UN estimates.");
  b.card("FACT", "Zimbabwe and the DTM", "Stage 3: falling birth rate, low death rate; HIV and AIDS raised deaths in the 1990s-2000s; emigration not in model.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Factors lowering birth rates", "Family planning, women's education and work, urbanisation, lower infant mortality, later marriage, cost of children.");
  b.card("CONCEPT", "Effects of rapid population growth", "Pressure on services, jobs, land and housing; environmental degradation; but a large future workforce and market.");
  b.card("CONCEPT", "Effects of population decline", "Labour shortage, ageing, pension costs, closing schools; but less pressure on resources and land.");
});
