// W4b: ahist.russia.tsarist-challenges (both boards; Cambridge key question 3.1).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.russia.tsarist-challenges", { file: "russia/tsarist-challenges", keyPrefix: "russia.tsarist-challenges" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which event in 1881 brought Alexander III to the throne?",
    ok: ["The assassination of his father, Alexander II", "Correct: the People's Will killed the Tsar in March 1881."],
    no: [
      ["The abdication of his father after the Crimean War", "Alexander II did not abdicate; he was murdered."],
      ["The death of his father from illness on a journey abroad", "He did not die of illness."],
      ["The overthrow of his father by a rising in St Petersburg", "There was no rising; a terrorist bomb killed him."],
    ],
    explanation: "Alexander II was killed by a bomb thrown by members of the People's Will on 13 March 1881 (1 March in the old Russian calendar). His son, Alexander III, ruled until 1894.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which minister, from 1892, pursued rapid industrialisation through railways, tariffs and foreign loans?",
    ok: ["Sergei Witte, the Minister of Finance", "Correct: Witte followed Bunge and Vyshnegradsky."],
    no: [
      ["Konstantin Pobedonostsev, the Procurator of the Holy Synod", "Pobedonostsev guarded the Church and the autocracy; he was not a finance minister."],
      ["Nikolai Bunge, the Minister of Finance until 1887", "Bunge left office in 1887, five years earlier."],
      ["Pyotr Stolypin, the Minister of the Interior after 1906", "Stolypin belonged to the era after 1905."],
    ],
    explanation: "Witte became Minister of Finance in 1892. Bunge held the post in 1881-87 and Vyshnegradsky in 1887-92. Stolypin was important only after 1906.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main purpose of the land captains introduced in 1889?",
    ok: ["To give nobles authority over the peasants in the villages", "Correct: they had judicial and administrative powers."],
    no: [
      ["To collect the taxes that had to be paid to the zemstva", "Tax collection was not their main purpose."],
      ["To divide the land of the nobles among landless peasants", "They did not redistribute noble land."],
      ["To represent the peasants in the State Council in the capital", "They were appointed officials, not representatives, and the State Council was appointed."],
    ],
    explanation: "Land captains were appointed from the local nobility. They supervised the village communes and judged peasant cases, which strengthened the control of the state and the landowners.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Alexander III's government pursue a policy of Russification?",
    ok: ["It wanted a single language and a single Church to unite the whole empire", "Correct: the aim was uniformity and security."],
    no: [
      ["It had been asked to do so by the Russian peasants in each province", "Russification was a government policy, not a peasant demand."],
      ["It hoped that the minorities would join the new factories in the towns", "Russification was about language and loyalty and not about industrial labour."],
      ["It wished to prepare the empire for self-rule by each of the nationalities", "It did the opposite; it reduced local rights."],
    ],
    hints: ["Think of the Tsar's fear that national differences would weaken the autocracy."],
    explanation: "Alexander III and Pobedonostsev believed that the empire needed one language, one Church and one ruler. Russian replaced local languages in administration and schools, and non-Orthodox peoples lost rights.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the famine of 1891-92 on opinion in Russia?",
    ok: ["It exposed the government's weakness and led zemstva to organise relief", "Correct: educated Russians took a more public role."],
    no: [
      ["It ended all criticism because the regime fed the starving at once", "The government was criticised for being slow."],
      ["It caused the peasants to march on St Petersburg and demand a constitution", "There was no such march in 1891-92."],
      ["It persuaded Alexander III to call an elected assembly of representatives", "He made no such concession."],
    ],
    hints: ["Who organised the relief when the government was slow?"],
    explanation: "The harvest failure and cholera showed the weakness of the administration, and volunteer relief by zemstva and committees gave the educated public a taste of public activity.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about Bunge's economic policies is supported by the evidence?",
    ok: ["He tried to relieve peasant burdens and also limited child labour in factories", "Correct: he cut redemption payments and introduced inspectors."],
    no: [
      ["He ended all state control of the economy and left it to private firms", "The state remained the driver of industry."],
      ["He raised taxes on the peasants more than any finance minister before him", "That description fits Vyshnegradsky better."],
      ["He began the building of the Trans-Siberian Railway across Siberia", "Construction began in 1891, after Bunge had left office."],
    ],
    hints: ["Compare Bunge with the finance ministers who followed him."],
    explanation: "Bunge reduced redemption payments, founded the Peasants' Land Bank (1882) and brought in factory inspection and child-labour limits. Vyshnegradsky raised the burden through taxes and grain exports.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that repression under Alexander III produced only short-term security?",
    ok: ["Marxist circles and workers' groups were forming even in these years", "Correct: new opposition was forming under the surface."],
    no: [
      ["The People's Will was crushed after the murder of Alexander II", "This shows short-term success of repression."],
      ["Land captains were appointed to supervise the peasant villages", "This is an example of control, not of weakness."],
      ["Censorship was tightened in 1882 and the universities were restricted in 1884", "These show repression but not its limits."],
    ],
    hints: ["Which fact shows opposition surviving or growing despite the repression?"],
    explanation: "Plekhanov founded his group in 1883 and Marxist circles spread in the towns. Together with the resentment of minorities, this suggests that the regime had bought time rather than removed the causes of discontent.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best explains why historians who stress the regime's strengths in 1881-94 point to the army and police?",
    ok: ["The regime kept order and put down revolt without help from a parliament", "Correct: coercion held the system together."],
    no: [
      ["The army was reformed in 1881 into a force that was loyal and well paid", "No such army reform is part of the evidence."],
      ["The police were elected by the zemstva and so enjoyed popular trust", "The police were part of the central government."],
      ["The army and police gave the peasants the vote in local elections", "They did not extend the vote."],
    ],
    hints: ["Think about what kept the autocracy in place when there were no popular institutions."],
    explanation: "Historians who stress strength argue that the army, the police and the Church made the autocracy secure, and that opposition remained small and divided until 1905.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the 1880s and 1890s Russia had an elected national parliament with power to make laws.",
    answer: false,
    explanation: "False. The Tsar was an autocrat. The State Council was appointed and advisory, and the first elected Duma met only in 1906.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under Alexander III the state, rather than private business, took the lead in promoting industry.",
    answer: true,
    explanation: "True. Finance ministers used tariffs, state orders, railway building and loans to promote industry, because the government wanted military and economic strength.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Populists succeeded in winning the support of the peasants for the murder of Alexander II.",
    answer: false,
    hints: ["Think of the peasants' reaction to the murder."],
    explanation: "False. The People's Will hoped that the murder would spark a rising, but the peasants did not rise and the police arrested most of its leaders.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Konstantin Pobedonostsev", "Procurator of the Holy Synod and adviser to Alexander III"],
      ["Nikolai Bunge", "Finance minister who founded the Peasants' Land Bank"],
      ["George Plekhanov", "Founder of the first Russian Marxist group, in exile"],
      ["Alexander Ulyanov", "Student executed in 1887 for a plot against the Tsar"],
    ],
    explanation: "Pobedonostsev (Church and ideology), Bunge (Finance, 1881-87), Plekhanov (Emancipation of Labour, 1883) and Ulyanov (Lenin's elder brother, hanged in 1887).",
  });
  chrono(b, [
    "Alexander II is assassinated",
    "The May Laws restrict Jewish residence and work",
    "Land captains are introduced",
    "Famine in the Volga region",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1881 to 1891-92."],
    explanation: "March 1881; 1882; 1889; 1891-92.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Okhrana was the Tsar's {{blank:a}} police, and the rural councils elected mainly by landowners were called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["secret"], choices: ["secret", "border", "river", "customs"] },
      { id: "b", accepted: ["zemstva"], choices: ["zemstva", "soviets", "dumas", "communes"] },
    ],
    explanation: "The Okhrana was the secret police; the zemstva (singular zemstvo) were the local councils created in 1864. Soviets were councils of workers that appeared in 1905.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Russian Marxist who founded the Emancipation of Labour group in 1883.",
    accepted: ["Plekhanov", "George Plekhanov", "Georgi Plekhanov", "Georgy Plekhanov"],
    wrong: ["Lenin"],
    explanation: "**George (Georgi) Plekhanov**, who worked in exile in Switzerland. Lenin became a Marxist later and founded the Bolsheviks only in 1903.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main features of Alexander III's policy of repression.",
    points: ["The 1881 Statute allowed states of emergency, arrests and exile without trial", "Censorship was tightened and the universities lost their independence", "Land captains and the changes in the zemstva increased noble control of the countryside", "Russification, including the May Laws against Jews, forced minorities to conform"],
    modelAnswer: "In 1881 a Statute allowed governors to declare states of emergency and to exile suspects without trial. Censorship was tightened and the universities lost their independence in 1884. Land captains and the zemstvo law of 1890 increased the control of nobles over the countryside, and Russification, including the May Laws against Jews, forced the minorities to conform.",
    explanation: "One mark for each policy described accurately.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the economic policies of Vyshnegradsky and Witte created problems for the regime.",
    points: [["Heavy taxes and grain exports fell on the peasants, who were already poor, and helped bring the famine of 1891-92", 2], ["Rapid industrial growth created a large working class in crowded towns with no unions or political rights, a source of discontent and of Marxist organisation", 2]],
    hints: ["Think of the peasants and of the workers in the new factories."],
    modelAnswer: "High taxes and grain exports fell on the peasants, who were already poor, and helped to make the famine of 1891-92 worse. Rapid industrial growth also created a large working class living in crowded towns with no unions and no political rights, which was a source of discontent and a ready audience for Marxist organisers.",
    explanation: "Credit developed reasons, not lists of policies.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why opposition to the Tsarist regime survived in spite of repression.",
    points: [["Grievances remained: poor peasants, harsh conditions for workers and the oppression of national and religious minorities", 2], ["Educated Russians had no legal way to take part in government, so they turned to underground groups such as the Populists and Marxist circles", 2]],
    hints: ["Think of what remained unsolved and of where discontented people could go."],
    modelAnswer: "Repression did not remove the causes of discontent. Peasants were poor, workers were badly treated and minorities were oppressed. In addition, educated Russians had no legal way to take part in government, so some of them turned to underground groups such as the Populists and the first Marxist circles.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a notice posted by a fictional provincial governor in a Russian town, 1884",
        "By order of the Governor, no gathering of more than ten persons may take place without written leave of the police. Newspapers will print no reports of disturbances or of the price of bread without the approval of the censor. Those who break these rules will be sent from the province."),
      "",
      source("Source B", "a letter from a fictional zemstvo doctor to a colleague in Moscow, written in the famine winter of 1892",
        "We are out of grain in half of my district, and typhus and cholera are spreading along the river villages. I asked the governor for help and was told to wait for orders. In the meantime, the teacher, the priest and I have formed a committee to feed the children. What the village needs is not advice from the capital but bread and men to give it out."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A order the people of the town to do?", points: ["Not to gather in groups of more than ten without police permission", "Not to print reports of disturbances or the bread price without the censor's approval"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about how the regime dealt with problems in the provinces.", points: [["Agree: both show a government that relied on orders and control from above (a governor who forbids gatherings and one who tells the doctor to wait for orders)", 2], ["Differ: A shows a government acting firmly to prevent public discussion; B shows a government that is slow to act in a crisis and ordinary people organising their own relief", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the challenges facing the Tsarist regime in 1881-94?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows the practical effect of the emergency powers (restricted meetings and censorship) but is an official order, so it shows policy and not whether it was obeyed", 2], ["B shows famine, the slowness of the administration and local initiative, but it is one doctor's private view, possibly exaggerated, and from one district", 2], ["Own knowledge: the Statute of 1881 and the censorship of 1882, and the famine of 1891-92 with its relief by zemstva, support both sources; they show repression and weakness together", 2]], modelAnswer: "Source A is useful because it shows what the emergency powers of 1881 meant in practice, with limits on meetings and press reports, but as an official order it shows what the governor wanted, not what the people did. Source B is useful for the famine of 1891-92 and for the slowness of the administration and the work of local committees, but it is the private view of one doctor writing about one district and may exaggerate. My knowledge of the Statute of 1881 and the famine supports both. Together they show a regime that was strong at forbidding and weak at helping, which is a key challenge it faced." }),
    ],
    hints: ["For (c), consider who wrote each source, why, and how far each is supported by what you know."],
    explanation: "Both sources are invented: an official notice and a private letter.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was Alexander III's reign a success for the Tsarist regime?",
    levels: levels(8),
    points: [
      ["Strengths: order restored after 1881, the People's Will crushed, the army and Church loyal, and the autocracy intact", 2],
      ["Economic progress: Bunge, Vyshnegradsky and Witte promoted industry and railways, which strengthened the state", 2],
      ["Weaknesses: poor and overtaxed peasants, the famine, Russification which embittered minorities, and a growing working class with no political rights", 2],
      ["A supported judgement, for example that success was short-term because causes of discontent remained", 2],
    ],
    hints: ["Weigh the order and economic growth against the problems that remained."],
    modelAnswer: "In the short term Alexander III's reign was a success for the regime. After 1881 the People's Will was crushed, the army and Church remained loyal, and the autocracy was intact. The finance ministers promoted industry and railways, which strengthened the state. However, success was limited. The peasants were poor and heavily taxed, and the famine of 1891-92 showed the administration's weakness. Russification embittered the minorities, and a growing working class had no political rights, which created a fertile ground for Marxist opposition. I conclude that the reign secured the regime for a time but left its deeper problems unresolved.",
    explanation: "Credit both strengths and weaknesses and a supported judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'Economic modernisation did more to weaken than to strengthen the Tsarist regime in the years 1881-94.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Strengthened: railways, tariffs and foreign loans built the industrial and military base of a great power; the state controlled the process", 3],
      ["Weakened: heavy taxation and grain exports on the peasants, the famine of 1891-92 and the loss of trust", 3],
      ["Weakened: the growth of a working class in crowded towns, without legal rights, created the audience for Marxism", 3],
      ["A supported judgement, for example that modernisation strengthened the state in the short term but created social tensions that its political system could not manage", 3],
    ],
    hints: ["Balance the strengths of the new industry against the social strains that it created."],
    modelAnswer: "The statement is partly right, but its force depends on the time span. In the short term modernisation strengthened the regime. Bunge, Vyshnegradsky and Witte used tariffs, railways and foreign loans to build the industrial and military base that a great power needed, and the state kept control of the process. However, there were costs. Heavy taxes and grain exports weighed on the peasants, who made up four-fifths of the population, and the famine of 1891-92 undermined trust in the government when it was slow to respond. Industrial growth also created a working class in crowded towns that had no legal rights, and Marxist circles found an audience there. The regime did not combine modernisation with political reform, so social change outran its institutions. I therefore agree that modernisation weakened the regime in the long term, though not before 1894, when the Tsar still seemed secure.",
    explanation: "Credit both sides, with the time perspective, and a judgement.",
  });

  b.card("DEFINITION", "What was autocracy in Tsarist Russia?", "Rule by the Tsar, whose power was not limited by any parliament or law and who claimed authority from God.");
  b.card("DEFINITION", "What was Russification?", "A policy of making non-Russian peoples use the Russian language and institutions (and often the Orthodox faith).");
  b.card("FACT", "When was Alexander II assassinated, and by whom?", "13 March 1881 (1 March in the old calendar), by members of the People's Will.");
  b.card("FACT", "Who was Konstantin Pobedonostsev?", "Procurator of the Holy Synod from 1880 and adviser to Alexander III, who opposed parliaments and religious toleration.");
  b.card("FACT", "What did Bunge do as Minister of Finance (1881-87)?", "Reduced redemption payments, founded the Peasants' Land Bank (1882) and brought in factory inspectors and child-labour limits.");
  b.card("FACT", "What were land captains (1889)?", "Nobles appointed to supervise the peasant villages with judicial and administrative powers.");
  b.card("FACT", "Who founded the first Russian Marxist group and when?", "George Plekhanov founded Emancipation of Labour in 1883, in exile in Switzerland.");
  b.card("CONCEPT", "Why did Alexander III turn from reform to repression?", "His father's murder convinced him that reform had encouraged revolutionaries, and Pobedonostsev urged him to defend the autocracy.");
  b.card("CONCEPT", "Why did rapid industrialisation create problems for the Tsarist regime?", "It burdened the peasants and created a working class without rights, who became an audience for Marxist ideas.");
});
