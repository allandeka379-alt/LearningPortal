// W4b: ahist.china.comparison-with-russia (ZIMSEC only: comparison essay skill).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.china.comparison-with-russia", { file: "china/comparison-with-russia", keyPrefix: "china.comparison-with-russia" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which group was the main base of the Chinese Communists' strength from the late 1920s?",
    ok: ["The peasants of the countryside", "Correct: Mao built a rural base and a peasant army."],
    no: [
      ["The industrial workers of the big cities, as in Russia in 1917", "The urban workers were crushed in 1927."],
      ["The army officers of the Qing dynasty who still had armies", "The Qing officers were not their base."],
      ["The foreign merchants of the treaty ports along the coast", "The Communists opposed foreign domination."],
    ],
    explanation: "After the White Terror of 1927 Mao shifted the party's base to the peasantry, with Jiangxi and Yan'an as bases. In Russia the revolution was based in the cities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement describes a similarity between the Russian and Chinese revolutions?",
    ok: ["Both overthrew weak monarchies in poor agrarian countries after defeats", "Correct: failed reform and defeat weakened both regimes."],
    no: [
      ["Both were led by the Guomindang, which took power after a short civil war", "The Guomindang did not lead the Russian Revolution."],
      ["Both were won in a few days by a rising of the workers in the capital city", "The Chinese revolution took over two decades."],
      ["Both saw the monarchy defended by the army until the last day of the war", "In both cases the monarchy fell."],
    ],
    explanation: "Russia's autocracy and the Qing dynasty were both weakened by military defeat, foreign pressure and failed or late reform.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In which way did the Chinese Communist revolution differ from the Russian?",
    ok: ["It took over twenty years and was based in the countryside", "Correct: the revolution was rural and slow."],
    no: [
      ["It began with a civil war after the Communists had seized the capital", "In China the civil war came before the seizure of the capital."],
      ["It was led by workers' councils called soviets in the main cities", "Soviets were the Russian model."],
      ["It was ended by a peace treaty signed with Germany in 1918", "That was Russia's Treaty of Brest-Litovsk."],
    ],
    explanation: "The Chinese Communists spent two decades building a rural base and army (1927-49). In Russia the Bolsheviks seized power in a few days and fought the civil war afterwards.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which fact best shows that foreign imperialism was more important in China than in Russia?",
    ok: ["Unequal treaties, concessions and the Japanese invasion shaped Chinese politics", "Correct: national humiliation was central to Chinese nationalism."],
    no: [
      ["The Duma met in St Petersburg and the Tsar kept control of ministers", "This is about Russian politics and not foreign domination."],
      ["Lenin's party won majorities in the soviets of the main cities in 1917", "This shows Bolshevik support in Russia."],
      ["The Russian army was defeated by Japan in the war of 1904-05", "Russia was a great power that lost a war, not a semi-colony."],
    ],
    hints: ["Think of the 'unequal treaties' and of 1937."],
    explanation: "China was semi-colonised by Britain, Japan and others, and invaded by Japan in 1937. Anti-imperialism fed the 1911 revolution, the May Fourth Movement and the CCP's appeal.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Soviet and Chinese land policies have in common?",
    ok: ["Land was first given to the peasants, then collectivised under party control", "Correct: both moved from redistribution to collective farming."],
    no: [
      ["Land was left in private hands and the state bought grain at market prices", "Both moved to state control."],
      ["Land was taken from the peasants first and then later returned to the landlords", "The landlords did not regain it."],
      ["Land was given to foreign companies, who farmed it with imported machines", "No such policy was followed."],
    ],
    hints: ["Think of the Decree on Land (1917), the Agrarian Reform Law (1950) and what followed."],
    explanation: "The Bolsheviks confirmed the peasants' seizures in 1917 and collectivised from 1929; the CCP redistributed land in 1950 and then formed co-operatives and communes.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which difference is shown by the Great Terror of 1937-38 and the Cultural Revolution?",
    ok: ["The Terror was run by the secret police, but Mao called on the young to attack the Party", "Correct: methods and targets differed."],
    no: [
      ["The Terror was a mass movement of students, but the Cultural Revolution was run by police", "This reverses the two."],
      ["Neither affected the Party, since both attacked only foreign enemies", "Both attacked party members."],
      ["Both were ended in a year by an election in which the leaders were defeated", "No such elections took place."],
    ],
    hints: ["Think of the NKVD and of the Red Guards."],
    explanation: "The Great Terror was organised by Stalin through the NKVD. In the Cultural Revolution Mao mobilised Red Guards against the Party, though the army later restored order.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which approach would give the best comparative paragraph on Stalin's and Mao's policies?",
    ok: ["Make a claim about both leaders, then use dated evidence from each to support it", "Correct: a comparison is built on a shared claim and evidence."],
    no: [
      ["Describe Stalin's policies fully and then describe Mao's policies in the next paragraph", "This is two separate descriptions and not a comparison."],
      ["List dates of both revolutions without saying how they relate to the question", "A list does not answer the question."],
      ["Write only about what makes the two cases different and ignore the similarities", "A comparison needs both likenesses and differences."],
    ],
    hints: ["Think of how you should structure the paragraph."],
    explanation: "A good paragraph states a point that links the cases (a similarity or a difference), supports it with specific evidence from each and explains its significance.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which comparison of the two famines is best supported by the evidence?",
    ok: ["Both followed collectivising campaigns, but the Chinese estimate of deaths is larger", "Correct: the Chinese famine was larger by most estimates."],
    no: [
      ["Both were caused only by drought, with no link to the party's policies", "State policy was central in both."],
      ["The Soviet famine killed more people than the Chinese famine, by all estimates", "Most estimates give the Chinese famine a higher figure."],
      ["Neither famine killed more than a few thousand people before it was stopped", "Both killed millions."],
    ],
    hints: ["Remember the estimates of 5 to 8 million and of 15 to 45 million or more."],
    explanation: "The famine of 1932-33 (an estimated 5 to 8 million dead) and that of 1959-61 (an estimated 15 to 45 million or more) both followed drives to control grain. The figures are uncertain.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Bolsheviks took power in the capital before the Russian Civil War, while the Chinese Communists took power after their civil war.",
    answer: true,
    explanation: "True. The Bolsheviks seized Petrograd in November 1917 and fought the Whites in 1918-21; the Chinese civil war of 1946-49 ended with the proclamation of the People's Republic.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In both Russia and China, the Communist Party first confirmed the peasants' land and later collectivised it.",
    answer: true,
    explanation: "True. The Decree on Land (1917) and the Agrarian Reform Law (1950) were followed by collectivisation (1929-33) and communes (1958).",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Chinese revolution followed the Russian model in every respect, with no adaptation.",
    answer: false,
    hints: ["Think of Mao's emphasis on the peasantry."],
    explanation: "False. Mao adapted Marxism-Leninism to a peasant country, built a rural base and guerrilla army, and later broke with the Soviet Union.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Russian feature with its Chinese counterpart.",
    pairs: [
      ["The Red Army under Trotsky", "The People's Liberation Army under Mao and Zhu De"],
      ["The Great Terror of 1937-38", "The Cultural Revolution of 1966-76"],
      ["Collectivisation of 1929-33", "The people's communes of 1958"],
      ["The Kronstadt Mutiny and NEP of 1921", "The recovery policies after the Great Leap"],
    ],
    explanation: "Each pair shows a comparable stage: the army, the campaigns against the Party and critics, the collectivisation drive and the retreat after the crisis.",
  });
  chrono(b, [
    "The Russian February Revolution",
    "The Chinese Long March begins",
    "The Great Terror in the Soviet Union",
    "The People's Republic of China is proclaimed",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1917 to 1949."],
    explanation: "March 1917; October 1934; 1937-38; 1 October 1949.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In Russia the revolution was based mainly on the {{blank:a}} in the cities, but in China the Communists built their strength among the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["workers and soldiers"], choices: ["workers and soldiers", "warlords", "landlords", "missionaries"] },
      { id: "b", accepted: ["peasants"], choices: ["peasants", "bankers", "merchants", "officials"] },
    ],
    explanation: "The Bolsheviks relied on workers and soldiers in Petrograd and Moscow. Mao's strength lay in the peasants.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Chinese Communist leader who adapted Marxism-Leninism to the peasantry.",
    accepted: ["Mao Zedong", "Mao Tse-tung", "Mao", "Mao Tse Tung", "Chairman Mao"],
    wrong: ["Lenin"],
    explanation: "**Mao Zedong**, who built a peasant base from 1927.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe two similarities and two differences between the causes of the Russian and Chinese revolutions.",
    points: ["Similarity: both regimes were weakened by military defeat and foreign pressure", "Similarity: both had poor peasants and late or failed reforms", "Difference: Russia's revolution was a rapid urban rising, China's was slow and rural", "Difference: foreign imperialism was more central in China"],
    modelAnswer: "Both regimes were weakened by military defeat and foreign pressure, and both had poor peasants and late or failed reforms. But Russia's revolution was a rapid urban rising in 1917, while China's was a slow rural movement over two decades, and foreign imperialism and the Japanese invasion were more central in China.",
    explanation: "One mark for each accurate similarity or difference.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain one way in which the Russian and Chinese Communist parties were similar and one way in which they were different.",
    points: [["Similar: both were disciplined Leninist parties that controlled an army through commissars and ruled by terror against opponents, creating a cult of the leader", 2], ["Different: the Bolsheviks relied on urban workers and took power in a rising in 1917, while the CCP under Mao relied on peasants and a guerrilla army over two decades", 2]],
    hints: ["Think of party structure and of the base of support."],
    modelAnswer: "Both were disciplined Leninist parties that controlled an army through commissars, used terror against opponents and built a cult of their leader. But the Bolsheviks relied on urban workers and took power in a rising in 1917, while the CCP under Mao relied on peasants and a guerrilla army over two decades.",
    explanation: "Credit explained comparisons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Stalin's collectivisation and Mao's Great Leap Forward are often compared.",
    points: [["Both were revolutions from above that used force to reorganise the countryside and to control grain for industrialisation", 2], ["Both led to a great famine (an estimated 5 to 8 million in 1932-33 and 15 to 45 million or more in 1959-61) and to the punishment of critics", 2]],
    hints: ["Think of aims, methods and results."],
    modelAnswer: "Both were revolutions from above that used force to reorganise the countryside and to control grain for industrialisation. Both also led to a great famine, an estimated 5 to 8 million dead in 1932-33 and 15 to 45 million or more in 1959-61, and to the punishment of critics.",
    explanation: "Credit developed comparisons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional Bolshevik organiser to factory workers in Petrograd, autumn 1917",
        "Comrades, the Provisional Government talks of war while you go hungry. Take the factories and the power into the hands of the soviets. The party will give you peace, bread for the cities and land for the peasants. Only the workers, with the soldiers beside them, can save the revolution."),
      "",
      source("Source B", "a talk by a fictional Communist cadre to villagers in north China, 1946",
        "Friends, the landlords have taken the best land and the highest rent for generations. Now the people's army will help you divide the land among those who work it. The Japanese are gone, but the old masters remain. The party stands with the poor peasants, and the army pays for what it takes."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source B promise to the villagers?", points: ["Division of the land among those who work it", "Support for poor peasants and an army that pays for what it takes"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare the appeals made in Sources A and B.", points: [["Agree: both promise material benefits (bread and land; land) to groups who are poor, and attack existing rulers (the Government; the landlords)", 2], ["Differ: A appeals to urban workers and soldiers and offers peace and bread; B appeals to peasants in the countryside and offers land and rent reform", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian comparing the sources of support of the Russian and Chinese Communists?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of the Bolsheviks' appeal to urban workers and soldiers and of the slogans on peace, land and bread, but it is a party speech, meant to persuade", 2], ["B is useful as evidence of the CCP's appeal to the peasants through land reform and the army's conduct, but it is also propaganda by a cadre", 2], ["Own knowledge: soviets in the cities in 1917; land reform in the Chinese base areas and civil war; together they support the contrast between an urban and a rural revolution", 2]], modelAnswer: "Source A is useful because it shows the Bolsheviks' appeal to urban workers and soldiers with slogans of peace, land and bread, which fits what we know of 1917, but it is a party speech meant to persuade. Source B is useful because it shows the CCP's appeal to peasants through land reform and the army's good conduct, which fits the base areas and the civil war, but it too is propaganda. Together they support the contrast between a mainly urban revolution in Russia and a rural one in China, though both parties also needed other groups." }),
    ],
    hints: ["For (c), consider the audience and purpose of each speech."],
    explanation: "Both sources are invented: a Bolshevik speech and a Communist cadre's talk.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Compare the roles of the peasants in the Russian and Chinese revolutions.",
    levels: levels(8),
    points: [
      ["Russia: peasants seized land in 1917 and supported the Bolsheviks for the Decree on Land, but the revolution was won in the cities; later they resisted requisitioning and collectivisation", 2],
      ["China: peasants were the main base of the CCP from 1927, supplying recruits and food after land reform, and the army grew from the villages", 2],
      ["Similarities: promises of land won support, and the party later reorganised the land under its control", 2],
      ["A supported judgement on the importance of peasants in each case", 2],
    ],
    hints: ["Compare how decisive the peasants were in each case."],
    modelAnswer: "In both revolutions land was the peasants' main demand and the Communists won support by promising it. In Russia the peasants seized land in 1917 and accepted the Bolshevik Decree on Land, but the revolution itself was won in the cities by workers and soldiers, and the peasants later resisted requisitioning and collectivisation. In China the peasants were the main base of the CCP from 1927. They supplied recruits and food after land reform, and the army grew from the villages. In both cases the party later took the land back under collective control. I conclude that the peasants were decisive in China, but supporting rather than decisive in Russia.",
    explanation: "Credit comparison of both cases and a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'The Russian and Chinese revolutions were more alike than different.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Similarities: weak monarchies, defeat and foreign pressure, Leninist parties, terror, collectivisation and famine, cults of personality", 3],
      ["Differences: urban versus rural base, speed, the order of the civil war, foreign imperialism and nationalism, Mao's adaptations", 3],
      ["Policies and outcomes: comparison of the plans, the Terror and the Cultural Revolution, and the Sino-Soviet split", 3],
      ["A supported judgement on which similarities and differences matter most", 3],
    ],
    hints: ["Decide which kind of similarity (structure or method) is most important."],
    modelAnswer: "The two revolutions shared deep similarities, but the differences were also important, so I agree only in part. Both began in poor agrarian empires whose monarchies were weakened by defeat and foreign pressure, and both ended with a Leninist party that ruled through terror, collectivised the land and created a cult of its leader. Both brought great famines, an estimated 5 to 8 million dead in 1932-33 and 15 to 45 million or more in 1959-61. But the revolutions were won in different ways. The Bolsheviks seized power in the cities in a few days in 1917 and fought a civil war afterwards, while Mao built a peasant army over two decades and won the civil war before taking power. Foreign imperialism and the Japanese invasion were much more important in China, and Mao adapted Marxism-Leninism to a peasant country and later broke with the Soviet Union. The similarities are deeper in the nature of the regimes and their policies, while the differences are greater in how power was won. I therefore judge that the regimes were more alike than the revolutions that created them.",
    explanation: "Credit both likenesses and differences and a supported judgement.",
  });

  b.card("DEFINITION", "What is a comparison essay?", "An essay organised by themes that sets the likenesses and differences between two cases side by side and reaches a judgement.");
  b.card("DEFINITION", "What is a revolution from above?", "Rapid change imposed by the state and party, such as Stalin's collectivisation and Mao's Great Leap Forward.");
  b.card("FACT", "What was the main base of the Bolsheviks' support in 1917?", "Workers and soldiers in Petrograd and Moscow, through the soviets.");
  b.card("FACT", "What was the main base of the Chinese Communists?", "The peasants, in rural bases such as Jiangxi and Yan'an, from 1927.");
  b.card("CONCEPT", "How were the Russian and Chinese revolutions similar in their causes?", "Both followed defeat and foreign pressure on weak monarchies in poor agrarian countries, with failed or late reform.");
  b.card("CONCEPT", "How did the Chinese revolution differ from the Russian?", "It was slower, rural and shaped by foreign imperialism and Japan; the civil war came before the seizure of power.");
  b.card("CONCEPT", "Why are Stalin's collectivisation and the Great Leap Forward compared?", "Both used force to control grain and reorganise the countryside, and both caused huge famines (estimates only).");
  b.card("CONCEPT", "How should a comparative paragraph be built?", "Make a claim about both cases, support it with dated evidence from each, and explain its significance.");
  b.card("CONCEPT", "Why did the Soviet Union and China split?", "Disputes over Khrushchev's policies, nuclear help and leadership of world communism, ending in the withdrawal of advisers in 1960.");
});
