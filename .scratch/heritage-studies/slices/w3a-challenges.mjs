// W3a: challenges faced by Zimbabwe since independence (her.independence.challenges).
// Reviewer notes: no statistics are given (inflation rates, death tolls); "many thousands" is used for the 1980s
// disturbances. The 2024 currency (ZiG) is mentioned in the lesson only, not examined here.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.independence.challenges", { file: "independence/challenges", keyPrefix: "independence.challenges" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did **Cyclone Idai** strike eastern Zimbabwe?",
    options: [
      ["March 2019", "Correct."],
      ["March 2020", "This is when the first COVID-19 case was recorded in Zimbabwe."],
      ["April 1980", "This is when Zimbabwe became independent."],
      ["December 1987", "This is when the Unity Accord was signed."],
    ],
    answer: "A",
    explanation: "Cyclone Idai struck in March 2019, hitting Chimanimani and Chipinge especially hard.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **brain drain** mean?",
    options: [
      ["Skilled people leaving to work in other countries", "Correct."],
      ["Pupils dropping out of school before Form 4", "That is school drop-out."],
      ["Loss of fertile soil carried away by heavy rain", "That is soil erosion."],
      ["Money leaving the country through illegal trade", "That is capital flight or illicit financial flows."],
    ],
    answer: "A",
    explanation: "Brain drain is the emigration of skilled workers such as doctors, nurses and teachers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which year did the **Economic Structural Adjustment Programme (ESAP)** begin?",
    options: [
      ["1991", "Correct."],
      ["1980", "This is the year of independence."],
      ["1987", "This is the year of the Unity Accord."],
      ["2009", "This is when the Zimbabwe dollar was abandoned."],
    ],
    answer: "A",
    explanation: "ESAP began in 1991, the same period as the severe drought of 1991-92.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which was a **result** of ESAP for many ordinary families?",
    options: [
      ["Job losses and higher prices of basic goods", "Correct."],
      ["Free secondary education and free health care", "ESAP brought fees for some services."],
      ["More civil service jobs in every district", "ESAP cut civil service jobs."],
      ["Fixed low prices controlled by the government", "ESAP removed price controls."],
    ],
    answer: "A",
    explanation: "Firms closed, civil service jobs were cut, price controls were removed and fees were charged for some services.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **hyperinflation**?",
    options: [
      ["An extremely rapid rise in prices", "Correct."],
      ["A sharp fall in the number of jobs", "That is rising unemployment."],
      ["A rise in the value of the currency", "Hyperinflation makes money lose value."],
      ["A shortage of rain over many seasons", "That is drought."],
    ],
    answer: "A",
    explanation: "Money loses value very quickly, so savings are destroyed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which measure has done most to help people living with HIV to live long and healthy lives?",
    options: [
      ["Testing and antiretroviral treatment", "Correct: treatment controls the virus."],
      ["Herbal mixtures sold at markets", "No herb cures HIV; people should see a trained health worker."],
      ["Avoiding people living with HIV", "HIV is not spread by everyday contact; stigma harms people."],
      ["Taking antibiotics for a week", "Antibiotics treat bacterial infections, not HIV."],
    ],
    hints: ["What do clinics provide?"],
    answer: "A",
    explanation: "Testing and antiretroviral treatment, provided through clinics, allow people living with HIV to live long and healthy lives.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A district hospital in Gweru loses three nurses in one year; each moves to a hospital in the United Kingdom for higher pay. Which challenge does this show?",
    options: [
      ["Brain drain", "Correct."],
      ["Hyperinflation", "Hyperinflation is rising prices, though it may push workers to leave."],
      ["Drought", "Drought is a shortage of rain."],
      ["Structural adjustment", "ESAP was a reform programme of the 1990s."],
    ],
    hints: ["Skilled workers leaving the country."],
    answer: "A",
    explanation: "The emigration of skilled workers is brain drain.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which agreement ended the disturbances in Matabeleland and the Midlands in the 1980s?",
    options: [
      ["The Unity Accord of 22 December 1987", "Correct."],
      ["The Lancaster House Agreement of 1979", "This ended the liberation war."],
      ["The Global Political Agreement of 2008", "This was much later and led to the 2013 Constitution process."],
      ["The SADC Treaty signed in 1992", "This created SADC from SADCC."],
    ],
    hints: ["Which agreement united ZANU-PF and PF-ZAPU?"],
    answer: "A",
    explanation: "The Unity Accord united the two parties and ended the violence; an amnesty followed in 1988.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The coronavirus pandemic reached Zimbabwe in March 2020.",
    answer: true,
    explanation: "True. Lockdowns and school closures followed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In 2009 Zimbabwe stopped using the Zimbabwe dollar and used foreign currencies such as the US dollar and the rand.",
    answer: true,
    explanation: "True. This followed the hyperinflation of the late 2000s.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Everyone agrees that sanctions were the only cause of Zimbabwe's economic problems in the 2000s.",
    answer: false,
    hints: ["Is this a contested matter?"],
    explanation: "False. Views differ: the government blames sanctions; others point also to economic policy, falling farm output, debt and corruption.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each challenge with one of its effects.",
    pairs: [
      ["Drought", "Crop failure and food aid"],
      ["HIV and AIDS", "Many orphans and pressure on health services"],
      ["Brain drain", "Hospitals and schools lose skilled staff"],
      ["Hyperinflation", "Savings and pensions lose their value"],
    ],
    explanation: "Each challenge had serious effects on families.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Cyclone Idai hit Chimanimani and {{blank:a}} especially hard. The independent commission set up by the 2013 Constitution to help the nation deal with past conflicts is the National Peace and {{blank:b}} Commission.",
    blanks: [
      { id: "a", accepted: ["Chipinge"], choices: ["Chipinge", "Hwange", "Kariba", "Lupane"] },
      { id: "b", accepted: ["Reconciliation"], choices: ["Reconciliation", "Electoral", "Human Rights", "Gender"] },
    ],
    explanation: "Chimanimani and Chipinge; the National Peace and Reconciliation Commission (NPRC).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** challenges faced by Zimbabwe since independence.",
    points: ["Drought / cyclones and floods", "Economic difficulties (ESAP, hyperinflation, unemployment, currency changes)", "Disease (HIV and AIDS, cholera, COVID-19)", "Brain drain / sanctions or restrictive measures / the disturbances of the 1980s"],
    modelAnswer: "Drought, hyperinflation, HIV and AIDS, and brain drain.",
    explanation: "One mark per challenge.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of the severe drought of the early 1990s on Zimbabwe.",
    points: [
      "Crop failure",
      "Developed: maize had to be imported and many families depended on food aid",
      "Death of livestock / water shortages",
      "Developed: farmers lost cattle (wealth and draught power); towns rationed water",
    ],
    modelAnswer: "Crops failed across the country, so maize had to be imported and many families depended on food aid. Many cattle died, so farmers lost wealth and draught power, and towns faced water shortages.",
    hints: ["Think of food, livestock and water."],
    explanation: "Two marks per developed effect.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Suggest **three** ways in which Zimbabwe could reduce the brain drain, explaining how each would help.",
    points: [
      "Better pay and conditions", "Developed: removes the main reason skilled workers leave",
      "Housing, transport or loan schemes / career development", "Developed: makes staying more attractive than leaving",
      "Encourage the diaspora to return or invest / economic stability", "Developed: skills and money come back; stable prices make salaries worth more",
    ],
    modelAnswer: "The government and employers could improve pay and working conditions, removing the main reason why nurses and teachers leave. They could offer housing or vehicle loan schemes and chances for further training, making it more attractive to stay. They could also encourage people in the diaspora to return or invest, and keep prices stable so that local salaries keep their value.",
    hints: ["Why do skilled people leave?"],
    explanation: "Two marks per developed suggestion.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a report in a fictional community newsletter in Chipinge, 2026", `Seven years after Cyclone Idai, the rebuilt bridge on our road is finally open. Families who lost their homes in 2019 now live in new houses on higher ground. Many still remember the night the river rose and the hills slid down. The council has planted trees on the slopes and set up an early-warning committee in every ward.`),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of challenge does Source A describe?",
        options: [
          ["A natural disaster", "Correct: a cyclone with floods and landslides."],
          ["An economic crisis", "The source describes a cyclone."],
          ["A disease outbreak", "No disease is mentioned."],
          ["A political conflict", "No conflict is mentioned."],
        ],
        answer: "A",
        explanation: "Cyclone Idai was a natural disaster.",
      }),
      P.tf({
        label: "(b)",
        stem: "According to Source A, families were resettled on higher ground.",
        answer: true,
        explanation: "True: \"new houses on higher ground\".",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the source, explain **two** measures that could reduce the effects of a future cyclone.",
        points: [
          "Planting trees on slopes",
          "Developed: roots hold the soil, reducing landslides",
          "Early-warning committees / building on higher ground",
          "Developed: people are warned to move in time / homes are safe from floods",
        ],
        modelAnswer: "Planting trees on the slopes helps, because roots hold the soil and reduce landslides. Early-warning committees in every ward can warn people to move to safety in time, and building on higher ground keeps homes out of the floodwater.",
      }),
    ],
    hints: ["Find the measures in the source."],
    explanation: "Reading a source on Cyclone Idai and disaster preparedness.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the economic challenges since 1990.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the main features of ESAP.",
        points: ["Began in 1991 with support from international lenders", "Cut government spending / civil service jobs", "Removed price controls", "Opened the economy to imports / introduced fees for some services"],
        modelAnswer: "ESAP began in 1991 with loans from international lenders. The government cut its spending and civil service jobs, removed price controls, opened the economy to imports and introduced fees for some school and health services.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Sanctions were the main cause of Zimbabwe's economic difficulties in the 2000s.\" Discuss.",
        points: [
          ["View that they were the main cause: the government and its supporters argue that cut credit, investment and trade damaged the whole economy; SADC and the AU called for removal", 2],
          ["Opposing view: Western governments say the measures were targeted at individuals and companies; humanitarian aid continued", 2],
          ["Other causes: falling farm output, economic policy, debt, corruption, drought", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The government and its supporters argue that sanctions were the main cause. They say that the measures cut Zimbabwe off from international credit and investment and discouraged trade, damaging the whole economy, and SADC and the African Union have called for their removal.\n\nWestern governments disagree. They describe the measures as targeted restrictive measures on named individuals and companies, and point out that humanitarian aid continued.\n\nMany observers argue that several causes worked together: falling farm output in the early 2000s, economic policy decisions, debt, corruption and drought.\n\nIn my judgement the measures played a part, especially by limiting credit, but they were one cause among several rather than the only or main one.",
      }),
    ],
    hints: ["Present each view fairly before your judgement."],
    explanation: "Describing ESAP and discussing a contested issue.",
  });

  b.card("FACT", "When did Cyclone Idai strike?", "March 2019 (Chimanimani and Chipinge hardest hit).");
  b.card("FACT", "When did ESAP begin?", "1991.");
  b.card("DEFINITION", "Brain drain", "The emigration of skilled and educated workers to other countries.");
  b.card("DEFINITION", "Hyperinflation", "An extremely rapid rise in prices, so money loses value very fast.");
  b.card("CONCEPT", "Two views on the measures imposed from the early 2000s?", "Government: sanctions that harmed the whole economy. Western governments: targeted restrictive measures on individuals and companies.");
  b.card("FACT", "When did Zimbabwe abandon the Zimbabwe dollar for foreign currencies?", "2009.");
  b.card("FACT", "What ended the disturbances in Matabeleland and the Midlands?", "The Unity Accord of 22 December 1987.");
  b.card("FACT", "Which commission was set up under the 2013 Constitution to deal with past conflicts?", "The National Peace and Reconciliation Commission (NPRC).");
  b.card("CONCEPT", "Two effects of HIV and AIDS?", "Many orphans; heavy pressure on health services and families.");
});
