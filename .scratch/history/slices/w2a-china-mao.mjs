// Slice W2a: China under Mao Zedong, 1949-1976 (ZIMSEC topic 14.2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.china.mao", { file: "china/mao", keyPrefix: "china.mao" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did the Great Leap Forward begin?",
    options: [
      ["1958", "Correct: it ran from 1958 to about 1962."],
      ["1950", "1950 saw the Agrarian Reform Law and Marriage Law."],
      ["1966", "1966 was the start of the Cultural Revolution."],
      ["1953", "1953 was the start of the First Five-Year Plan."],
    ],
    answer: "A",
    explanation: "The **Great Leap Forward** began in **1958**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Marriage Law of 1950 do?",
    options: [
      ["Banned arranged marriages and allowed divorce", "Correct: it improved women's legal rights."],
      ["Made marriage illegal for Communist Party members", "There was no such ban."],
      ["Required all couples to live in communes", "Communes began in 1958 and were not set up by this law."],
      ["Gave husbands control of wives' land", "The law aimed at equality."],
    ],
    answer: "A",
    explanation: "The **Marriage Law** banned arranged and child marriages and concubinage and let women seek divorce.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main aim of the First Five-Year Plan?",
    options: [
      ["To build up heavy industry", "Correct: steel, coal, electricity and machinery."],
      ["To expand tourism", "Tourism was not a priority."],
      ["To return land to the landlords", "Land had been taken from landlords."],
      ["To end all trade with the Soviet Union", "The plan depended on Soviet help."],
    ],
    answer: "A",
    explanation: "With Soviet help the plan concentrated on **heavy industry**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who were the Red Guards?",
    options: [
      ["Young people who attacked the \"Four Olds\"", "Correct: during the Cultural Revolution."],
      ["Soviet advisers in Chinese factories", "Soviet advisers left in 1960."],
      ["Mao's bodyguards on the Long March", "The term refers to the Cultural Revolution."],
      ["Landlords who resisted land reform", "Landlords were targets of land reform."],
    ],
    answer: "A",
    explanation: "**Red Guards** were students and young people who attacked teachers, officials and traditional culture from 1966.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Great Leap Forward lead to famine?",
    options: [
      ["Grain was taken based on false harvest reports", "Correct: villages were left without food."],
      ["Foreign armies invaded the main grain-growing regions", "There was no invasion at this time."],
      ["Peasants were all moved into the cities", "Most peasants stayed in the countryside, in communes."],
      ["Land reform gave peasants too much land", "Land reform was in 1950-1952 and is not the cause."],
    ],
    answer: "A",
    hints: ["Think about what officials reported and what the state then did."],
    explanation: "Officials reported impossible harvests, so the state **took grain** villages needed; poor farming methods and the steel campaign also cut output.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What followed the Hundred Flowers campaign?",
    options: [
      ["The Anti-Rightist Campaign punished critics", "Correct: hundreds of thousands were labelled rightists."],
      ["China held free multi-party elections", "No such elections were held."],
      ["Mao resigned and left China", "Mao remained leader."],
      ["Intellectuals were given seats in government", "Critics were punished instead."],
    ],
    answer: "A",
    hints: ["The criticism was sharper than Mao expected."],
    explanation: "The **Anti-Rightist Campaign** (1957) punished critics, many sent to labour camps.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "How should a historian state the number of deaths in the famine that followed the Great Leap Forward?",
    options: [
      ["As a range of estimates", "Correct: estimates run from about 15 million to over 40 million."],
      ["As an exact official figure", "No exact figure is agreed; records are incomplete."],
      ["As a few thousand", "This is far below any serious estimate."],
      ["As unknown and not worth estimating", "Historians have made careful estimates."],
    ],
    answer: "A",
    hints: ["Historians disagree because the records are incomplete."],
    explanation: "Historians give a **range of estimates**, commonly about 15 million to more than 40 million excess deaths; many cite around 30 million.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mao Zedong died in 1976.",
    answer: true,
    explanation: "True. He died on 9 September 1976; the Gang of Four was arrested in October.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Cultural Revolution was mainly an economic campaign to increase steel production.",
    answer: false,
    explanation: "False. That describes the Great Leap Forward. The Cultural Revolution (1966-1976) was a political and cultural campaign.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each policy with its main feature.",
    pairs: [
      ["Land reform", "Landlords' land given to poor peasants"],
      ["First Five-Year Plan", "Heavy industry built with Soviet help"],
      ["Great Leap Forward", "Communes and backyard furnaces"],
      ["Cultural Revolution", "Red Guards attack the \"Four Olds\""],
    ],
    explanation: "Each campaign had a distinctive feature.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Cultural Revolution begins",
      "Agrarian Reform Law",
      "Lushan Conference",
      "Anti-Rightist Campaign",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["Peng Dehuai was dismissed at Lushan during the Great Leap."],
    explanation: "Agrarian Reform Law 1950; Anti-Rightist Campaign 1957; Lushan Conference 1959; Cultural Revolution 1966.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Peasants who were trained to give basic health care in villages were called {{blank:a}} doctors. Mao's quotations were printed in the Little {{blank:b}} Book.",
    blanks: [
      { id: "a", accepted: ["barefoot"], choices: ["barefoot", "flying", "people's", "commune"] },
      { id: "b", accepted: ["Red"], choices: ["Red", "Green", "Blue", "Yellow"] },
    ],
    explanation: "**Barefoot doctors** served the villages; the **Little Red Book** was carried by Red Guards.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the Defence Minister dismissed in 1959 after criticising the Great Leap Forward.",
    accepted: ["Peng Dehuai", "Peng Te-huai", "Peng"],
    wrong: ["Lin Biao"],
    hints: ["He spoke out at the Lushan Conference."],
    explanation: "**Peng Dehuai** was dismissed after the Lushan Conference; Lin Biao replaced him.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "Identify **five** problems facing China in 1949.",
    points: [
      "War damage to industry, railways and farms.",
      "Hyperinflation.",
      "Landlord ownership of land / peasant poverty.",
      "Illiteracy / disease / opium addiction.",
      "Nationalists on Taiwan / lack of recognition by the USA / position of women.",
    ],
    modelAnswer: "War damage to industry and farms; hyperinflation; landlord control of land; widespread illiteracy and disease; and a hostile United States with the Nationalists still on Taiwan.",
    explanation: "One mark per problem.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the main features of the Great Leap Forward.",
    points: [
      "Aim to overtake Britain's industry within about fifteen years by mass mobilisation.",
      "People's communes replaced collectives; private plots abolished.",
      "Communal kitchens.",
      "Backyard furnaces produced much useless steel; farm work neglected.",
      "Unscientific farming methods / sparrow campaign.",
      "Exaggerated harvest reports; state grain procurement led to famine.",
    ],
    hints: ["Cover aims, organisation, methods and outcome."],
    modelAnswer: "Mao aimed to overtake Britain's industrial output within about fifteen years by mobilising the people. Collectives were merged into huge people's communes, private plots were abolished and families ate in communal kitchens. Millions made steel in backyard furnaces, much of it useless, while farm work was neglected. Unscientific methods such as close planting and the campaign against sparrows reduced harvests. Officials reported false harvests, and the state took grain on that basis, which led to famine.",
    explanation: "One mark per feature.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why Mao launched the Cultural Revolution in 1966.",
    points: [
      "Identifies wish to regain power after the Great Leap failures.",
      "Explains: Liu Shaoqi and Deng had led the recovery and Mao was sidelined.",
      "Identifies wish to purge \"capitalist roaders\" / keep revolutionary spirit alive.",
      "Explains: he feared the Party was becoming bureaucratic and moving away from socialism, as he believed had happened in the USSR.",
    ],
    hints: ["Consider Mao's position after the famine and his fears about the Party."],
    modelAnswer: "After the disaster of the Great Leap Forward, Liu Shaoqi and Deng Xiaoping led the recovery and Mao was sidelined, so he used the Cultural Revolution to regain control and remove them. He also feared that the Party was becoming bureaucratic and moving towards capitalism, as he believed had happened in the Soviet Union, so he mobilised young people to attack \"capitalist roaders\" and keep the revolution alive.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a poster of the kind displayed in Chinese villages in 1958, described in words", "Smiling peasants stand beside a mountain of golden grain taller than a house. Behind them, the chimneys of small furnaces glow red and a banner reads \"Overtake Britain in fifteen years\". A child holds up an enormous ear of wheat.", { described: true })}`,
    hints: ["Think about the poster's purpose and what actually happened."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** aims of the Great Leap Forward shown in Source A.", points: [
        "Huge increases in grain production.",
        "Rapid industrialisation / steel from furnaces / overtaking Britain.",
      ], explanation: "Two aims." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why was a poster like this produced in 1958?", points: [
        "Purpose: propaganda to mobilise peasants for the Great Leap.",
        "Detail: smiling peasants and giant harvests suggest success and enthusiasm.",
        "Context: launch of communes and backyard furnaces in 1958.",
        "Context: the slogan of overtaking Britain set ambitious targets.",
      ], explanation: "Purpose plus context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far does Source A give an accurate picture of the Great Leap Forward? Use the source and your own knowledge.", points: [
        "Accurate: shows real aims (grain, steel, overtaking Britain) and the backyard furnaces.",
        "Accurate: mass mobilisation and enthusiasm in 1958.",
        "Inaccurate: harvests fell; much furnace steel was useless.",
        "Inaccurate: false reporting and procurement led to famine (estimates about 15-45 million deaths).",
        "Provenance: propaganda, made to inspire, not to inform.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The poster accurately shows the aims of the Great Leap: huge harvests, steel from backyard furnaces and the slogan of overtaking Britain within fifteen years. In 1958 there was real mass mobilisation.\n\nBut as a picture of results it is very misleading. Harvests fell because of the steel campaign, close planting and other unscientific methods, and much of the furnace steel was useless. Officials reported false harvests, the state took grain on that basis, and a famine followed in which historians estimate that between about 15 and 45 million people died.\n\nThe poster was propaganda, designed to inspire effort, not to inform. It is accurate about the aims but not about what actually happened.", explanation: "Provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question on the Great Leap Forward (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), weigh achievements against human costs."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the land reform carried out by the Communists from 1950.", points: [
        "Agrarian Reform Law 1950.",
        "Landlords' land, animals and tools given to poor peasants.",
        "Speak bitterness meetings where peasants accused landlords.",
        "Many landlords killed (estimates commonly one to two million or more).",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Mao's rule did more good than harm for the people of China.\" How far do you agree?", points: [
        ["Good: unity, independence, end of landlord power, land reform.", 2],
        ["Good: industrial growth (First Five-Year Plan), atomic bomb, international recognition (UN seat 1971).", 2],
        ["Good: women's rights (Marriage Law), literacy, barefoot doctors, rising life expectancy.", 2],
        ["Harm: Great Leap famine (estimates 15-45 million deaths).", 2],
        ["Harm: Anti-Rightist Campaign, Cultural Revolution persecution; no freedom; cult of personality.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Mao's rule brought real gains. China was unified and independent after a century of foreign domination and civil war. Land reform ended landlord power and gave land to some 300 million peasants. The First Five-Year Plan built heavy industry, China tested an atomic bomb in 1964 and took the UN seat in 1971. The Marriage Law improved women's legal status, literacy rose, barefoot doctors brought basic care to villages, and life expectancy rose substantially.\n\nThe harm, however, was immense. Land reform killed perhaps one to two million or more landlords. The Great Leap Forward caused a famine in which historians estimate between about 15 and 45 million people died. Critics were silenced in the Anti-Rightist Campaign, and the Cultural Revolution brought ten years of persecution and disrupted education. The cult of personality meant that Mao's mistakes could not be challenged.\n\nThe Party's own verdict in 1981 was that his achievements outweighed his mistakes, but many historians disagree. In my judgement the scale of the deaths, especially in the famine, means that I do not fully agree, even though the social and economic changes were real.", explanation: "Both sides with a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When was the First Five-Year Plan?", "1953-1957, focused on heavy industry with Soviet help.");
  b.card("FACT", "When was the Great Leap Forward?", "1958-1962; it led to famine about 1959-1961.");
  b.card("FACT", "How many died in the famine after the Great Leap Forward?", "Historians' estimates range from about 15 million to over 40 million excess deaths; many cite around 30 million.");
  b.card("DEFINITION", "People's commune", "A huge unit created in 1958 combining many villages, organising farming, industry, schools and communal kitchens.");
  b.card("DEFINITION", "Collectivisation", "Combining private farms into collective farms owned and worked jointly under state control.");
  b.card("FACT", "When was the Cultural Revolution?", "1966-1976.");
  b.card("FACT", "What was the Hundred Flowers campaign?", "1956-1957: Mao invited criticism; it was followed by the Anti-Rightist Campaign (1957) against critics.");
  b.card("CONCEPT", "Give three social changes under Mao.", "Marriage Law (1950) and women in work; literacy campaigns; barefoot doctors and rising life expectancy.");
  b.card("CONCEPT", "What did the Communist Party conclude about Mao in 1981?", "That his achievements outweighed his mistakes, while condemning the Cultural Revolution; many historians judge the human costs more harshly.");
});
