// W4b: ahist.china.mao-1949-76 (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.china.mao-1949-76", { file: "china/mao-1949-76", keyPrefix: "china.mao-1949-76" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What name was given to the large rural units set up in China in 1958?",
    ok: ["People's communes", "Correct: they combined farming, industry and local government."],
    no: [
      ["Soviet collective farms, copied from Stalin's policy", "The Chinese units were called communes."],
      ["Warlord territories, ruled by local generals in the north", "Warlords had ruled before the 1920s."],
      ["Special economic zones, open to foreign companies", "These came after Mao, in the 1980s."],
    ],
    explanation: "By the end of 1958 almost all rural households belonged to a commune, with communal canteens, schools and small industries.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Who called on young people to attack the Party's 'capitalist roaders' from 1966?",
    ok: ["Mao Zedong, the Chairman of the Party", "Correct: Mao launched the Cultural Revolution."],
    no: [
      ["Chiang Kai-shek, the leader of the Nationalists on Taiwan", "Chiang was Mao's enemy and lived on Taiwan."],
      ["Liu Shaoqi, the head of state and Party leader", "Liu was a target of the Red Guards."],
      ["Nikita Khrushchev, the leader of the Soviet Union", "The Red Guards were Chinese students."],
    ],
    explanation: "Mao called on students to 'bombard the headquarters'. Liu Shaoqi and Deng Xiaoping were among those attacked.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main aim of the Great Leap Forward?",
    ok: ["To raise industrial and farm output rapidly by mobilising labour", "Correct: Mao hoped to overtake Britain in steel."],
    no: [
      ["To open China to foreign trade and private business at once", "That policy belongs to the 1980s."],
      ["To end the production of steel and return to small farming only", "The Leap emphasised steel."],
      ["To copy the Soviet Five Year Plans with the help of Soviet engineers", "That was the First Five-Year Plan of 1953-57."],
    ],
    explanation: "The Leap was meant to achieve rapid growth through mass labour, communes and backyard furnaces, rather than the Soviet model of heavy industry with experts.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Great Leap Forward lead to famine?",
    ok: ["Farm labour was diverted and false harvest reports led to over-collection", "Correct: policy errors were the main cause."],
    no: [
      ["Foreign armies destroyed the crops during a war on the borders of China", "No foreign war destroyed the crops."],
      ["The peasants refused to farm after the land reform had given them land", "The land reform had been popular."],
      ["The Soviet Union cut off all food supplies when the advisers were recalled", "Soviet supplies were not the cause of the famine."],
    ],
    hints: ["Think of exaggerated reports and of where the workers were."],
    explanation: "Peasants were taken from farming to make steel and build dams, and officials reported inflated harvests. The state took grain on the basis of false figures, and bad weather made things worse.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why did Peng Dehuai's dismissal in 1959 matter?",
    ok: ["It made officials afraid to criticise, so false reports continued", "Correct: criticism of the Leap was silenced."],
    no: [
      ["It ended the Korean War and brought peace with the United States", "The Korean War had ended in 1953."],
      ["It started the Cultural Revolution and the first attacks of Red Guards", "That began in 1966."],
      ["It led to the withdrawal of Soviet advisers from China the same year", "The advisers left in 1960 for other reasons."],
    ],
    hints: ["Think about the Lushan Conference."],
    explanation: "Peng criticised the Leap at Lushan and was removed. The warning silenced critics and encouraged officials to flatter Mao, with bad results.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the Sino-Soviet split?",
    ok: ["China lost Soviet advisers and aid and competed for leadership of world communism", "Correct: the rivalry also reached Africa and Asia."],
    no: [
      ["China joined the Soviet Union in a single communist state", "The two states split and became rivals."],
      ["China gave up its atomic weapons programme on Soviet advice", "China tested its first bomb in 1964."],
      ["The Soviet Union and China agreed to share the support of African movements", "They competed in Africa, including in Zimbabwe."],
    ],
    hints: ["Think about the advisers who left in 1960."],
    explanation: "The USSR withdrew its advisers in 1960, and each side accused the other of betraying communism. In southern Africa, ZANU was linked to China and ZAPU to the USSR.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which view of the Cultural Revolution is best supported by the evidence?",
    ok: ["It aimed to restore Mao's authority and caused widespread persecution", "Correct: both aims and costs are clear."],
    no: [
      ["It was a peaceful movement that caused no deaths or damage to society", "It caused serious violence and persecution."],
      ["It was led by Liu Shaoqi to reduce Mao's power inside the Party", "Liu was one of its victims."],
      ["It ended when Mao died in 1976 and the Red Guards were still in control", "The Red Guards had been brought under control long before 1976."],
    ],
    hints: ["Think about Mao's motives and the results."],
    explanation: "Mao wished to remove Party rivals and revive revolutionary spirit. Millions were persecuted, hundreds of thousands (by estimates) died, schools closed and culture was attacked.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that Mao's rule had major achievements?",
    ok: ["Literacy and life expectancy rose, and women gained equal rights", "Correct: social gains are widely recognised."],
    no: [
      ["The famine of 1959-61 killed many millions of people", "This shows a major failure."],
      ["The Red Guards persecuted teachers and closed the universities", "This shows the costs."],
      ["The Anti-Rightist Campaign punished hundreds of thousands of critics", "This is a cost and not an achievement."],
    ],
    hints: ["Which fact is about gains in welfare?"],
    explanation: "Land reform, the Marriage Law, rural health and schools raised living conditions and status for many. Historians weigh these gains against the famine and persecutions.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Great Leap Forward took place between 1958 and 1962.",
    answer: true,
    explanation: "True. The worst famine years were 1959-61.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Historians agree on one exact number of deaths in the Great Leap Forward famine.",
    answer: false,
    explanation: "False. Estimates range from about 15 million to 45 million or more because the records are poor, and the true figure may never be known.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Cultural Revolution was supported by Liu Shaoqi and Deng Xiaoping as a way to strengthen the Party.",
    answer: false,
    hints: ["Think of who was attacked."],
    explanation: "False. Liu and Deng were attacked as 'capitalist roaders'. Liu died in detention and Deng was sent to the countryside.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or name with its meaning.",
    pairs: [
      ["Lin Biao", "Army leader named Mao's successor in 1969, who died in 1971"],
      ["Hundred Flowers", "The 1956-57 campaign inviting intellectuals to criticise the Party"],
      ["Gang of Four", "Radical leaders, including Jiang Qing, arrested in October 1976"],
      ["Red Guards", "Student groups who attacked officials and old culture from 1966"],
    ],
    explanation: "Lin Biao (died 1971), the Hundred Flowers (1956-57), the Gang of Four (arrested October 1976) and the Red Guards (1966).",
  });
  chrono(b, [
    "The Agrarian Reform Law",
    "The Great Leap Forward begins",
    "The Cultural Revolution begins",
    "Mao dies",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1950 to 1976."],
    explanation: "1950; 1958; May 1966; 9 September 1976.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mao's Great {{blank:a}} Forward began in 1958, and Mao died in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Leap"], choices: ["Leap", "March", "Retreat", "Turn"] },
      { id: "b", accepted: ["1976"], choices: ["1949", "1966", "1976", "1981"] },
    ],
    explanation: "The Great Leap Forward began in 1958. Mao died on 9 September 1976.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the leader of the Soviet Union whose policy of peaceful coexistence Mao criticised.",
    accepted: ["Khrushchev", "Nikita Khrushchev", "Krushchev", "Khruschev"],
    wrong: ["Stalin"],
    explanation: "**Nikita Khrushchev**, whose criticism of Stalin in 1956 and policy of peaceful coexistence led to the split.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main features of the Great Leap Forward.",
    points: ["People's communes combined farming, industry, schools and local government", "Communal canteens were set up and peasants worked in large groups", "Backyard furnaces were used to make steel in the villages", "The aim was to raise output very rapidly and to overtake Britain in steel"],
    modelAnswer: "People's communes combined farming, industry, schools and local government, with communal canteens. Backyard furnaces were set up to make steel in the villages. The aim was to raise output very rapidly and to overtake Britain in steel.",
    explanation: "One mark for each accurate feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Mao launched the Cultural Revolution in 1966.",
    points: [["He wished to regain his authority after the failure of the Great Leap Forward, when Liu Shaoqi and Deng Xiaoping had taken the lead in recovery", 2], ["He feared that the Party and the state were becoming bureaucratic and moving towards capitalism, as he thought the Soviet Union had, so he called on the young to attack them", 2]],
    hints: ["Think of Mao's position after the Leap, and the Soviet example."],
    modelAnswer: "Mao wished to regain his authority after the failure of the Great Leap Forward, when Liu Shaoqi and Deng Xiaoping had taken the lead in recovery. He also feared that the Party and the state were becoming bureaucratic and moving towards capitalism, as he thought the Soviet Union had, so he called on the young to attack them.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why China and the Soviet Union quarrelled after 1956.",
    points: [["Mao disliked Khrushchev's criticism of Stalin and his policy of peaceful coexistence with the West", 2], ["The USSR would not share nuclear technology and wished to lead, so China resented Soviet control; the USSR withdrew its advisers in 1960", 2]],
    hints: ["Think of Khrushchev, nuclear weapons and the advisers."],
    modelAnswer: "Mao disliked Khrushchev's criticism of Stalin and his policy of peaceful coexistence with the West. The USSR also refused to share nuclear technology and wished to lead the communist world, so China resented Soviet control, and in 1960 the USSR withdrew its advisers.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional commune official to his county leaders, autumn 1958",
        "The commune has brought in a harvest beyond all expectation. Our rice fields now yield many times the amount of last year. Steel furnaces burn day and night, and the canteens feed all members without charge. The people are filled with joy, and we will soon surpass the targets. We ask only for more labour for the furnaces."),
      "",
      source("Source B", "a letter by a fictional peasant to his brother in a town, spring 1960",
        "The canteen has no rice now, only a thin gruel of leaves. Our granary was emptied to meet the quota that the commune reported. The old and the children are swollen with hunger, and many have died in our village this winter. We have no tools left because they were melted down in the furnaces. Please send whatever you can."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A claim about the harvest and the canteens?", points: ["The harvest is far above expectation, with rice yields many times those of last year", "The canteens feed all members without charge and the people are joyful"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about conditions in the communes.", points: [["Agree: both refer to the furnaces, the canteens and the quota or targets, and show that the commune system was in operation", 2], ["Differ: A reports abundance and joy; B describes hunger, deaths, an emptied granary and tools lost", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the causes and effects of the Great Leap Forward?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of the false reporting that led the state to take too much grain, but it is a report by an official who feared punishment and cannot be taken as true", 2], ["B is useful as private evidence of famine, the emptied granaries and tools melted down, but it is one villager's view and does not show the scale", 2], ["Own knowledge: exaggerated reports, backyard furnaces, state procurement and the famine of 1959-61 support the two sources and explain the contrast between them", 2]], modelAnswer: "Source A is useful because it is typical of the exaggerated reports that officials sent to their leaders, which led the state to take too much grain, but the claims themselves cannot be trusted as the official feared punishment. Source B is useful as private evidence of famine, the emptied granary and the loss of tools to the furnaces, but it is one villager's view and does not show the scale. My knowledge of the false reports, the backyard furnaces and the famine of 1959-61 supports both, and the contrast between them helps to explain why the policy was not corrected." }),
    ],
    hints: ["For (c), think about why an official and a villager would write differently."],
    explanation: "Both sources are invented: an official's report and a villager's letter.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the success of the First Five-Year Plan and the collectivisation of agriculture in China in 1953-57.",
    levels: levels(8),
    points: [
      ["Industrial success: heavy industry grew quickly, with Soviet help and advisers, and large projects were built", 2],
      ["Agriculture: co-operatives and collectivisation brought state control of grain, but output grew slowly", 2],
      ["Limits and costs: dependence on the Soviet model and aid, neglect of consumer goods and the punishment of critics in 1957", 2],
      ["A supported judgement, for example that the plan was largely successful in industry but less so in agriculture", 2],
    ],
    hints: ["Compare industry with agriculture."],
    modelAnswer: "The First Five-Year Plan was largely successful in industry. With Soviet advisers and loans, heavy industry grew quickly and large projects were built. Agriculture was less successful: the movement into co-operatives and then collectives gave the state control of grain, but output grew slowly. There were costs too, since the plan depended on the Soviet model and aid, neglected consumer goods, and was followed by the punishment of critics in 1957. I conclude that the plan was a success in building industry, but it left problems in agriculture that led Mao to look for a new approach in the Great Leap Forward.",
    explanation: "Credit both sectors and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'Mao's revolutionary policies between 1949 and 1976 did more harm than good to China.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Harm: the famine of 1959-61 (an estimated 15 to 45 million or more deaths), the persecution of the Cultural Revolution and the Anti-Rightist Campaign", 3],
      ["Good: unification and independence, land reform, women's rights, higher literacy and life expectancy, and a nuclear and industrial base", 3],
      ["Judging by period and criteria: 1949-57 was largely successful; 1958-76 saw the main harm; the gains must be set against the costs", 3],
      ["A supported judgement, with reference to the verdict of historians and the Party's own later assessment", 3],
    ],
    hints: ["Distinguish between the early and late years of Mao's rule."],
    modelAnswer: "There is a strong case that Mao's policies did harm, but the picture is mixed. The Great Leap Forward caused a famine in which an estimated 15 to 45 million or more people died, the Anti-Rightist Campaign silenced critics, and the Cultural Revolution brought persecution, closed schools and violence. Yet there were real gains. China was united and independent, land reform and the Marriage Law improved the lives of peasants and women, literacy and life expectancy rose, and China developed an industrial and nuclear base. The record also varies by period: the years 1949-57 were largely constructive, while 1958-76 saw most of the harm. I therefore agree in part. The scale of the human cost in the Leap and the Cultural Revolution was so great that it outweighs many of the gains, but the achievements of the early years and the social progress should not be ignored. A fair verdict is that the revolution achieved important aims at a terrible cost, much of which was avoidable.",
    explanation: "Credit both sides, a distinction by period and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Great Leap Forward?", "The 1958-62 campaign to raise farm and industrial output rapidly by mass labour, communes and backyard furnaces; it led to famine.");
  b.card("DEFINITION", "What were the Red Guards?", "Student groups mobilised by Mao from 1966 to attack officials, teachers and old culture in the Cultural Revolution.");
  b.card("FACT", "How many people died in the Great Leap famine?", "Estimates range from about 15 million to 45 million or more (poor records); the true number is unknown.");
  b.card("FACT", "When did Mao die?", "9 September 1976; the Gang of Four was arrested in October.");
  b.card("FACT", "What was the Hundred Flowers campaign?", "In 1956-57 Mao invited criticism of the Party; when it went too far, the Anti-Rightist Campaign punished critics in 1957.");
  b.card("FACT", "When did China explode its first atomic bomb?", "1964, after the Soviet Union withdrew its advisers and refused nuclear help.");
  b.card("CONCEPT", "Why did the Great Leap Forward fail?", "Unrealistic aims, mass labour instead of skill, false reports by frightened officials and bad weather.");
  b.card("CONCEPT", "Why did Mao launch the Cultural Revolution?", "To regain authority after the Leap, to remove 'capitalist roaders' and to renew revolutionary spirit.");
  b.card("CONCEPT", "What links the Sino-Soviet split to southern Africa?", "ZANU and ZANLA looked to China, ZAPU and ZIPRA to the Soviet Union.");
});
