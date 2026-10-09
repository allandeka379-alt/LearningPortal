// Slice W2a: the Chinese Revolution to 1949 (ZIMSEC topic 14.2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.china.revolution", { file: "china/revolution", keyPrefix: "china.revolution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the People's Republic of China proclaimed?",
    options: [
      ["1 October 1949", "Correct: by Mao Zedong in Beijing."],
      ["10 October 1911", "That is the start of the revolution against the Qing."],
      ["1 January 1959", "That is the date of Castro's victory in Cuba."],
      ["9 September 1976", "That is the date of Mao's death."],
    ],
    answer: "A",
    explanation: "Mao proclaimed the People's Republic on **1 October 1949**.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who led the Guomindang after the death of Sun Yat-sen in 1925?",
    options: [
      ["Chiang Kai-shek", "Correct: also written Jiang Jieshi."],
      ["Mao Zedong", "Mao led the Communists."],
      ["Yuan Shikai", "Yuan died in 1916."],
      ["Zhu De", "Zhu De commanded the Red Army."],
    ],
    answer: "A",
    explanation: "**Chiang Kai-shek** led the Guomindang from 1925.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What were Sun Yat-sen's Three Principles of the People?",
    options: [
      ["Nationalism, democracy and people's livelihood", "Correct: the Guomindang's ideas."],
      ["Peace, land and bread for the workers and peasants", "This was a Bolshevik slogan in Russia in 1917."],
      ["Liberty, equality and fraternity", "This was the slogan of the French Revolution."],
      ["Unity, discipline and loyalty to the emperor", "These are not Sun's principles; he opposed the empire."],
    ],
    answer: "A",
    explanation: "Sun's principles were **nationalism, democracy and the people's livelihood**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the Communists have to set out on the Long March?",
    options: [
      ["Guomindang forces had surrounded the Jiangxi base", "Correct: the encirclement campaigns forced a break-out."],
      ["Japanese troops had invaded and occupied Jiangxi province", "The Communists were escaping Guomindang forces, not Japan."],
      ["Stalin ordered them to move to Moscow", "They marched to Shaanxi in north-west China."],
      ["They had already won the civil war", "The civil war ended in 1949."],
    ],
    answer: "A",
    explanation: "The fifth **encirclement campaign** tightened a ring of blockhouses around the Jiangxi Soviet, so the Red Army broke out and marched to Shaanxi.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened in the Xi'an Incident of December 1936?",
    options: [
      ["Chiang was detained and agreed to unite against Japan", "Correct: leading to the second united front."],
      ["Mao was captured by Guomindang troops", "Mao was not captured."],
      ["Japanese forces seized the province of Manchuria", "Japan seized Manchuria in 1931."],
      ["The Communists captured Beijing from the Nationalists", "They took Beijing in January 1949."],
    ],
    answer: "A",
    hints: ["It led to a second united front."],
    explanation: "Chiang was detained at Xi'an by one of his own generals and agreed to a **united front against Japan**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which Guomindang weakness most damaged its support among the middle classes in the late 1940s?",
    options: [
      ["Hyperinflation that destroyed savings", "Correct: prices rose so fast that money became almost worthless."],
      ["Its policy of giving landlords' land to peasants", "The Guomindang did not carry out land reform."],
      ["Its refusal to accept US aid", "The Guomindang received US aid."],
      ["Its alliance with Japan", "The Guomindang fought Japan."],
    ],
    answer: "A",
    hints: ["Think about what happened to people's money."],
    explanation: "**Hyperinflation** wiped out the savings of officials, teachers and traders, turning many against the government.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the Long March is most accurate?",
    options: [
      ["It was a costly retreat that became a symbol", "Correct: losses were huge, but it became a legend."],
      ["It was a great military victory over the Japanese army", "The march was a retreat from Guomindang forces."],
      ["Most marchers who set out reached Shaanxi", "Historians estimate fewer than 10,000 of roughly 80,000-90,000 finished."],
      ["It ended the civil war in 1935", "The civil war ended in 1949."],
    ],
    answer: "A",
    hints: ["Separate what happened from what it later came to mean."],
    explanation: "The Long March was a **retreat with enormous losses**, but Mao's rise during it and its legend of endurance strengthened the Communists.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Chinese Communist Party was founded in Shanghai in 1921.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In 1927 the Guomindang and the Communists formed an alliance against the warlords for the first time.",
    answer: false,
    explanation: "False. They had co-operated since 1923; in 1927 Chiang turned on the Communists, ending the First United Front.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Sun Yat-sen", "Founder of the Guomindang"],
      ["Chiang Kai-shek", "Guomindang leader from 1925"],
      ["Mao Zedong", "Communist leader who proclaimed the People's Republic"],
      ["Puyi", "Last Qing emperor, abdicated in 1912"],
    ],
    explanation: "Sun founded the Guomindang; Chiang led it from 1925; Mao led the Communists; Puyi was the last emperor.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Long March",
      "The May Fourth Movement",
      "Full-scale war with Japan begins",
      "Chiang turns on the Communists in Shanghai",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The May Fourth Movement was a protest about the Treaty of Versailles."],
    explanation: "May Fourth 1919; Shanghai 1927; Long March 1934-1935; war with Japan 1937.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "During the Long March, Mao gained a leading position at the {{blank:a}} Conference in January 1935. From 1936 the Communists' main base was at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Zunyi"], choices: ["Zunyi", "Yalta", "Lushan", "Xi'an"] },
      { id: "b", accepted: ["Yan'an"], choices: ["Yan'an", "Nanjing", "Shanghai", "Ruijin"] },
    ],
    explanation: "**Zunyi** (January 1935); **Yan'an** in Shaanxi became the Communist base.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "To which island did Chiang Kai-shek's government withdraw in 1949?",
    accepted: ["Taiwan", "Formosa"],
    wrong: ["Hainan"],
    hints: ["It lies off China's south-east coast."],
    explanation: "**Taiwan** (also known as Formosa).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "Identify **five** causes of the Chinese Revolution.",
    points: [
      "Weakness and fall of the Qing dynasty (1911-1912).",
      "Foreign domination / unequal treaties.",
      "Warlord rule after 1916.",
      "Peasant poverty / landlords, taxes, debt and famine.",
      "New ideas: May Fourth Movement (1919) / Marxism / nationalism.",
    ],
    modelAnswer: "The fall of the weak Qing dynasty in 1911-1912; foreign domination through unequal treaties; warlord rule after 1916; the poverty of peasants burdened by rents, taxes and debt; and new nationalist and Marxist ideas spread by the May Fourth Movement.",
    explanation: "One mark per cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain how the Communists won the support of the peasants.",
    points: [
      "Land reform / redistribution of landlords' land.",
      "Reduced rents and interest during the war with Japan.",
      "Red Army discipline: paid for goods, respected peasants.",
      "Resistance to Japan made them patriotic defenders.",
      "Peasant councils / literacy and propaganda involved peasants.",
      "Contrast with Guomindang: corruption, conscription, landlord support.",
    ],
    hints: ["Think about land, behaviour, patriotism and contrast with the Guomindang."],
    modelAnswer: "In areas they controlled, the Communists redistributed landlords' land or, during the war with Japan, cut rents and interest, which met peasants' greatest need. The Red Army's rules of discipline made soldiers pay for food and treat peasants with respect. Their guerrilla war against Japan made them look like patriotic defenders of China. Peasants were brought into local councils and taught to read. By contrast, Guomindang troops were often corrupt, conscripted men brutally and sided with landlords.",
    explanation: "One mark per explained point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the war with Japan helped the Communists.",
    points: [
      "Identifies that the Guomindang was weakened.",
      "Explains: it bore the main conventional fighting and lost its best troops and richest areas.",
      "Identifies that the Communists expanded behind Japanese lines.",
      "Explains: guerrilla war won them territory, recruits and patriotic prestige.",
    ],
    hints: ["Compare what the war did to each side."],
    modelAnswer: "The Guomindang fought most of the large battles against Japan and lost many of its best troops and its richest coastal regions, which weakened it before the civil war. Meanwhile the Communists fought a guerrilla war behind Japanese lines, expanding the territory and population they controlled and gaining a reputation as patriotic defenders of China.",
    explanation: "Two marks per developed way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a memoir written in the 1960s by a fictional peasant from northern China, describing the 1940s", "When the Nationalist soldiers came, they took our grain and tied young men together with rope to make them soldiers. When the Eighth Route Army came, the soldiers swept our yard and paid for the eggs they ate. Later the cadres measured the landlord's fields and gave my father a share. That is when I joined the army.")}`,
    hints: ["Consider when the memoir was written and in which country."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** differences in behaviour between the two armies described in Source A.", points: [
        "Nationalists took grain; Communists paid for food.",
        "Nationalists conscripted young men by force.",
        "Communist soldiers helped (swept the yard) / respected peasants.",
      ], explanation: "Three contrasts." }),
      P.manual({ label: "(b)", marks: 3, stem: "What does Source A suggest about why peasants joined the Communist army?", points: [
        "Good treatment won their trust.",
        "Land reform gave families land (\"a share\").",
        "Hatred of Nationalist abuses (forced conscription, seizing grain).",
      ], explanation: "Inferences supported by the source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How reliable is Source A as evidence of why the Communists won peasant support? Use the source and your own knowledge.", points: [
        "Reliable: an eyewitness peasant who experienced both armies.",
        "Content matches own knowledge: Red Army discipline rules, land reform, GMD conscription.",
        "Limitation: written in the 1960s, years after the events; memory may be shaped.",
        "Limitation: written in Communist China, where accounts praising the Party were expected / published.",
        "Limitation: one village; Communist land reform could also be violent.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The source has value because the writer was a peasant who saw both armies, and its content matches what historians know: Communist soldiers followed rules of discipline that told them to pay for what they took, Communist cadres carried out land reform, and Guomindang conscription was notoriously brutal.\n\nHowever, it was written in the 1960s, long after the events, and in Communist China, where memoirs praising the Party were encouraged and critical ones were dangerous, so it may be one-sided. It describes one village, and it does not mention the violence that often accompanied land reform.\n\nSo it is fairly reliable on the main reasons for peasant support, which other evidence confirms, but its timing and origin mean it should be treated with care.", explanation: "Provenance and content against own knowledge." }),
    ],
    explanation: "Source-based practice question on peasant support (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), weigh Guomindang weaknesses against Communist strengths."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the struggle between the Guomindang and the Communists from the split of the First United Front to the end of the Long March.", points: [
        "1927: Chiang turned on the Communists in Shanghai; thousands killed.",
        "Communists built the Jiangxi Soviet (1931) in the countryside.",
        "Guomindang encirclement campaigns, the fifth with blockhouses.",
        "Break-out and Long March (1934-1935) to Shaanxi; Mao rose at Zunyi.",
      ], explanation: "Four points in order." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The Communists won in 1949 mainly because of the weaknesses of the Guomindang.\" How far do you agree?", points: [
        ["GMD weakness: corruption and hyperinflation.", 2],
        ["GMD weakness: dependence on landlords, no land reform, brutal conscription; losses against Japan.", 2],
        ["Communist strength: land reform and discipline won peasant support.", 2],
        ["Communist strength: Mao's leadership and strategy; reputation from fighting Japan; organisation.", 2],
        ["Other: war with Japan; captured weapons in Manchuria; limits of US aid.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Guomindang weaknesses were very important. The government was riddled with corruption, and hyperinflation in the late 1940s destroyed the savings of the middle classes. It relied on landlords and never carried out land reform, and its conscription methods were brutal. It had also lost many of its best troops and richest regions in the war against Japan.\n\nBut the Communists' strengths mattered as well. Land reform and the discipline of their soldiers won the support of the peasants, who provided recruits, food and information. Mao's strategy of guerrilla war based in the countryside, and the Communists' reputation for resisting Japan, strengthened them, and their organisation was effective.\n\nOther factors played a part: the war with Japan gave the Communists room to expand, captured Japanese weapons in Manchuria helped them in 1945-1946, and US aid could not save a failing government.\n\nOverall I largely agree: the Guomindang's weaknesses gave the Communists their opportunity, but it was the Communists' ability to win peasant support that allowed them to take it.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When was the People's Republic of China proclaimed?", "1 October 1949, by Mao Zedong in Beijing.");
  b.card("FACT", "When did the Qing dynasty fall?", "1911-1912; the last emperor, Puyi, abdicated in February 1912.");
  b.card("DEFINITION", "Warlord", "A military commander controlling a region with his own army; warlords dominated China from 1916 to 1928.");
  b.card("FACT", "When was the Long March?", "October 1934 to October 1935, from Jiangxi to Shaanxi; fewer than 10,000 of roughly 80,000-90,000 finished (estimates).");
  b.card("FACT", "What happened in 1927?", "Chiang Kai-shek turned on the Communists in Shanghai, ending the First United Front.");
  b.card("FACT", "What was the Xi'an Incident?", "December 1936: Chiang was detained by one of his generals and agreed to a united front against Japan.");
  b.card("CONCEPT", "How did the Communists win peasant support?", "Land reform and rent cuts, disciplined soldiers, resistance to Japan, peasant councils; the Guomindang by contrast was corrupt and brutal.");
  b.card("CONCEPT", "Give four Guomindang weaknesses.", "Corruption; hyperinflation; reliance on landlords and no land reform; brutal conscription (and losses against Japan).");
  b.card("DEFINITION", "Guerrilla warfare", "Fighting by small mobile groups that avoid large battles and rely on the support of the local population.");
});
