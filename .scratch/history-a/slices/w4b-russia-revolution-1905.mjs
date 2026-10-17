// W4b: ahist.russia.revolution-1905 (both boards; Cambridge key question 3.2).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.russia.revolution-1905", { file: "russia/revolution-1905", keyPrefix: "russia.revolution-1905" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What name is given to the massacre of petitioners in St Petersburg on 22 January 1905?",
    ok: ["The Bloody Sunday massacre", "Correct: troops fired on the procession led by Father Gapon."],
    no: [
      ["The Lena goldfields massacre", "The Lena shootings of striking miners took place in 1912."],
      ["The Potemkin battleship mutiny", "That was a mutiny of sailors in June 1905."],
      ["The Moscow armed rising", "That was an armed rising in December 1905."],
    ],
    explanation: "On 22 January 1905 (9 January in the old calendar) troops fired on workers marching to the Winter Palace with a petition. The event is called Bloody Sunday.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which war helped to cause the 1905 Revolution?",
    ok: ["The Russo-Japanese War of 1904-05", "Correct: defeats at Port Arthur, Mukden and Tsushima discredited the Tsar."],
    no: [
      ["The war against Turkey, 1877-78", "That war belonged to the reign of Alexander II."],
      ["The war against Germany, 1914-18", "That war helped cause the revolutions of 1917."],
      ["The war against Britain and France in the Crimea, 1853-56", "That war was fifty years earlier."],
    ],
    explanation: "The Russo-Japanese War (February 1904 to September 1905) ended in defeat. It exposed the regime's incompetence and added to hardship at home.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the October Manifesto of 1905 promise?",
    ok: ["Civil liberties and an elected Duma sharing in law-making", "Correct: it was the Tsar's chief concession."],
    no: [
      ["The end of the monarchy and the creation of a Russian republic", "The Tsar kept his throne."],
      ["The transfer of all noble estates to the peasant communes", "It did not redistribute land."],
      ["Peace with Japan and the return of Port Arthur to Russia", "The peace was made by the Treaty of Portsmouth."],
    ],
    explanation: "The Manifesto of 30 October 1905, drafted with Witte, promised freedom of speech, conscience, meeting and association, an elected Duma that would approve laws and a wider franchise.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Bloody Sunday weaken the Tsar's standing among ordinary people?",
    ok: ["Loyal petitioners were shot, so the Tsar seemed to be their enemy", "Correct: it broke the popular faith in the Tsar."],
    no: [
      ["The Tsar had joined the march in person and was wounded by gunfire", "The Tsar was not in the city and was not harmed."],
      ["The troops had refused to obey their orders and joined the marchers", "The troops fired on the crowd."],
      ["The petition demanded the abolition of the monarchy and a republic", "The petition was respectful and asked for reforms."],
    ],
    hints: ["Think about how the marchers saw the Tsar before the shooting."],
    explanation: "The marchers carried icons and portraits of the Tsar and asked for help. When troops fired, many workers who had been loyal lost their faith in him.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which reason best explains why the opposition failed to overthrow the regime in 1905?",
    ok: ["Liberals, workers and peasants did not unite, and concessions divided them", "Correct: division was a main weakness."],
    no: [
      ["The army had been sent to the east and could not easily be recalled", "The army was recalled after the peace with Japan."],
      ["The Tsar had won the war with Japan and so regained much support", "Russia lost the war."],
      ["Foreign powers sent their troops into Russia to defend the monarchy", "No foreign troops intervened."],
    ],
    hints: ["Consider what the October Manifesto did to the opposition."],
    explanation: "The Octobrists accepted the Manifesto, the Kadets wanted more, and workers and peasants acted separately. The government could crush the Moscow rising with loyal troops.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did Stolypin's land reforms of 1906 and after allow peasants to do?",
    ok: ["Leave the commune and farm their own consolidated holdings", "Correct: he hoped to create loyal, prosperous farmers."],
    no: [
      ["Take over the great estates of the nobles without any payment", "Noble estates were not seized."],
      ["Elect all the members of the State Council in the capital", "The reform concerned land, not the State Council."],
      ["Join a state collective farm and share the whole harvest", "Collective farms belonged to the 1930s."],
    ],
    hints: ["Think of the commune and of the 'strong and sober' farmers that Stolypin wanted."],
    explanation: "Stolypin's decrees allowed households to leave the commune, to consolidate their strips and to borrow from the Peasants' Land Bank. He also encouraged settlement in Siberia.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Russia changed little in political terms between 1905 and 1914?",
    ok: ["The Fundamental Laws left the Tsar in charge of ministers, the army and the Duma's dissolution", "Correct: autocratic power was kept."],
    no: [
      ["Political parties such as the Kadets and the Octobrists were allowed to form freely", "This shows change."],
      ["The Duma was elected and first met in St Petersburg in 1906", "This too shows change from before 1905."],
      ["Trade unions and newspapers were permitted on a limited basis after 1905", "These are changes, though limited."],
    ],
    hints: ["Which fact shows the limits on the Duma?"],
    explanation: "Despite the Duma, the Tsar kept control of the government. He appointed ministers, held the veto, and could dissolve the Duma, which meant that the autocracy survived in practice.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement about Stolypin's policies is best supported by the evidence?",
    ok: ["He combined harsh repression with attempts to reform the countryside", "Correct: courts-martial and land reform were two sides of one policy."],
    no: [
      ["He ended the use of the death penalty and ruled by consent", "Courts-martial and hangings marked his period."],
      ["He abolished the commune and gave all peasants private farms by 1914", "Most peasants still lived in communes in 1914."],
      ["He brought the Duma into control of the ministers and the army", "The Tsar kept those powers."],
    ],
    hints: ["Think about 'Stolypin's neckties' and the reform of land holding."],
    explanation: "Stolypin used field courts-martial against rebels in 1906-07 and promoted individual farming. The results were limited because the reforms reached only a minority of households.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Father Georgy Gapon led the procession of 22 January 1905.",
    answer: true,
    explanation: "True. Gapon, a priest who led a workers' association, organised the march to present a petition to the Tsar.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "After the October Manifesto the Tsar was no longer an autocrat in any sense.",
    answer: false,
    explanation: "False. The Fundamental Laws of 1906 kept supreme power for the Tsar over ministers, the army and foreign policy, and he could dissolve the Duma.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Russo-Japanese War was the only cause of the 1905 Revolution.",
    answer: false,
    hints: ["Think of the other causes that existed before 1904."],
    explanation: "False. The war was a trigger and a stress, but land hunger, lack of political rights, the growth of opposition parties and the depression had caused discontent before it started.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Father Gapon", "Priest who led the march of January 1905"],
      ["Sergei Witte", "Minister who urged the Tsar to issue the October Manifesto"],
      ["Pyotr Stolypin", "Prime minister who combined repression with land reform"],
      ["Leon Trotsky", "Leader in the St Petersburg Soviet in 1905"],
    ],
    explanation: "Gapon (Bloody Sunday), Witte (Manifesto and Treaty of Portsmouth), Stolypin (prime minister 1906-11) and Trotsky (St Petersburg Soviet).",
  });
  chrono(b, [
    "Bloody Sunday in St Petersburg",
    "The Treaty of Portsmouth ends the war with Japan",
    "The October Manifesto is issued",
    "The First Duma meets",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from January 1905 to spring 1906."],
    explanation: "22 January 1905; 5 September 1905; 30 October 1905; April 1906.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The elected council formed by striking workers in St Petersburg in 1905 was called the {{blank:a}}, and the elected lower house created after the Manifesto was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Soviet"], choices: ["Soviet", "Zemstvo", "Politburo", "Cheka"] },
      { id: "b", accepted: ["Duma"], choices: ["Duma", "Senate", "Synod", "Sovnarkom"] },
    ],
    explanation: "The St Petersburg Soviet directed the October strike. The Duma, first elected in 1906, was the lower house of the new parliament.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the party formed by liberals who were satisfied with the October Manifesto.",
    accepted: ["Octobrists", "The Octobrists", "Octobrist", "Union of 17 October", "Octobrist party"],
    wrong: ["Kadets"],
    explanation: "The **Octobrists** accepted the Manifesto. The Kadets (Constitutional Democrats) wanted a fuller constitution.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what happened on Bloody Sunday, 22 January 1905.",
    points: ["Father Gapon led a procession of workers to the Winter Palace to present a petition", "The petition asked for reforms such as an eight-hour day and civil liberties", "Troops fired on the marchers, killing and wounding many", "The Tsar was not in the city, but he was blamed, and unrest spread afterwards"],
    modelAnswer: "Father Gapon led a procession of workers to the Winter Palace to present a petition asking for reforms such as an eight-hour day and civil liberties. Troops fired on the marchers and killed and wounded many. The Tsar was not in the city, but he was blamed, and strikes and unrest spread across Russia.",
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Tsar issued the October Manifesto.",
    points: [["A general strike in October 1905 stopped the railways and cities, and the St Petersburg Soviet showed the strength of the workers", 2], ["Witte and others argued that concession was the only alternative to repression that the army could not guarantee, and the Tsar hoped to split the liberals from the revolutionaries", 2]],
    hints: ["Think of the strike and of Witte's advice."],
    modelAnswer: "A general strike in October 1905 stopped the railways and the cities, and the St Petersburg Soviet showed the strength of the workers. Witte argued that the only alternative to concession was repression, which the army could not guarantee, and the Tsar hoped that concessions would split the liberals from the revolutionaries.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Tsarist regime survived the 1905 Revolution.",
    points: [["Most of the army stayed loyal and the troops from the Far East were used against rebels", 2], ["The opposition was divided and the October Manifesto split the liberals from the workers and peasants", 2]],
    hints: ["Think about the army and about the divisions among the opposition."],
    modelAnswer: "Most of the army stayed loyal, and troops brought home from the war in the Far East were used to crush the Moscow rising. The opposition was also divided, because the October Manifesto split the liberals from the workers and peasants, so there was no united force to overthrow the regime.",
    explanation: "Credit developed reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a petition written by a fictional factory worker's association in St Petersburg, January 1905",
        "Sire, we workers, our wives and our aged parents have come to you to seek justice and protection. We are poor, we are treated as slaves, and the little we earn is eaten by prices. Do not refuse help to your people. Let there be an eight-hour day, let there be a freely elected assembly, and let there be freedom of speech. We come to you in trust."),
      "",
      source("Source B", "a private letter from a fictional landowner in Tula province to his brother, November 1905",
        "The Tsar has given us a Manifesto and now every shopkeeper and clerk thinks that he can govern. Yet I confess that we gentlemen needed a lesson. In my district the peasants burned two houses in the summer, and the police only came when it was over. Perhaps now the Duma will bring order. I fear that it will bring only talk."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A ask the Tsar to grant?", points: ["An eight-hour working day", "A freely elected assembly and freedom of speech"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to the Tsar and to reform.", points: [["Agree: both accept that something must change and refer to the Tsar's power to grant reform (a petition to him; a Manifesto from him)", 2], ["Differ: A trusts the Tsar and demands change from below; B resents the Manifesto, fears disorder and doubts that a Duma will help", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the causes and outcomes of the 1905 Revolution?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows the workers' grievances and the loyalty to the Tsar before Bloody Sunday, but it is a petition meant to persuade and was written for the Tsar", 2], ["B shows the fear of the landowning class, rural violence and doubt about the Duma, but it is one private view from one province and is hostile to the lower classes", 2], ["Own knowledge: the petition of 22 January 1905, peasants burning manors in 1905 and the limits of the Duma support both; together they show demands from below and fear of change among the elite", 2]], modelAnswer: "Source A is useful because it shows the demands of the workers (an eight-hour day and an assembly) and their trust in the Tsar just before Bloody Sunday, which fits what we know of the petition. But it is a petition meant to persuade, so it may stress poverty and loyalty. Source B is useful for the fears of the landowners, the peasant violence of 1905 and doubts about the Duma, but it is one man's private view, hostile to the lower classes. Together they show the demands from below and the fear of change among the elite, and they help to explain the divisions that let the regime survive." }),
    ],
    hints: ["For (c), consider the purpose of a petition and the standpoint of a landowner."],
    explanation: "Both sources are invented: a workers' petition and a landowner's private letter.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of Bloody Sunday in causing the 1905 Revolution.",
    levels: levels(8),
    points: [
      ["Bloody Sunday as a trigger: the shooting of peaceful petitioners destroyed popular faith in the Tsar and spread strikes", 2],
      ["Other causes: land hunger, lack of political rights, organised opposition parties and the depression", 2],
      ["The war with Japan: defeats at Port Arthur, Mukden and Tsushima discredited the regime", 2],
      ["A supported judgement on whether the massacre was a trigger of deeper causes, rather than the main cause", 2],
    ],
    hints: ["Distinguish between a trigger and a cause."],
    modelAnswer: "Bloody Sunday was important as a trigger. When troops fired on peaceful petitioners the workers lost their faith in the Tsar, and strikes spread across Russia. But it was not the main cause. Land hunger, the lack of political rights, the growth of opposition parties and the depression had created discontent for years, and the war with Japan added defeat and hardship. I conclude that Bloody Sunday turned existing discontent into a revolution, but it could not have done so without these deeper causes.",
    explanation: "Credit explanation of the trigger and other causes, with a judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'The Tsarist regime survived the events of 1905 mainly because the opposition was divided.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Division of the opposition: liberals, workers and peasants acted separately; the Manifesto split Octobrists from Kadets and revolutionaries", 3],
      ["Army loyalty and repression: troops from the east, the arrest of the Soviet, the Moscow rising crushed, Stolypin's courts-martial", 3],
      ["Concessions and finance: the October Manifesto, the Duma, and the French loan of 1906", 3],
      ["A supported judgement that division mattered, but only because the army remained loyal and could be used", 3],
    ],
    hints: ["Consider whether division could have saved the regime without the army."],
    modelAnswer: "Division among the opposition was a major reason for survival, but not the only one. The workers, peasants and liberals acted separately: the strikes, peasant risings and mutinies were not coordinated, and the October Manifesto split the moderate liberals, who became Octobrists, from the Kadets and the socialists. Without unity, the opposition could not take power. But division alone would not have saved the Tsar if the army had joined the rebels. Most troops stayed loyal, and troops brought home after the peace with Japan were used to crush the Moscow rising and the peasant risings. Repression, including the arrest of the Soviet and the courts-martial under Stolypin, finished the work, and the French loan of 1906 let the government pay for it. I therefore agree that division was important, but I would argue that it mattered because the army remained loyal and could be used against each part of the opposition in turn.",
    explanation: "Credit both sides and a judgement that links the factors.",
  });

  b.card("DEFINITION", "What was the October Manifesto?", "The Tsar's declaration of 30 October 1905 promising civil liberties, an elected Duma with a share in law-making and a wider franchise.");
  b.card("DEFINITION", "What was a soviet in 1905?", "A council elected by workers to lead strikes; the St Petersburg Soviet directed the October general strike.");
  b.card("FACT", "What happened on Bloody Sunday?", "On 22 January 1905 troops fired on workers marching to the Winter Palace with a petition led by Father Gapon.");
  b.card("FACT", "How did Russia fare in the Russo-Japanese War?", "It lost: Port Arthur fell in January 1905, Mukden in March and the fleet at Tsushima in May; peace was made at Portsmouth on 5 September 1905.");
  b.card("FACT", "What did the Fundamental Laws of 1906 do?", "They kept the Tsar's power over ministers, the army and foreign policy and set limits on the Duma.");
  b.card("FACT", "Who was Pyotr Stolypin?", "Prime minister 1906-11; used courts-martial against rebels and land reforms to create prosperous peasant farmers; murdered in September 1911.");
  b.card("CONCEPT", "Why did the Tsarist regime survive 1905?", "The army stayed mostly loyal, concessions divided the opposition, the rebels were not united, foreign loans helped and repression worked.");
  b.card("CONCEPT", "How far did Russia change between 1905 and 1914?", "In form more than in substance: a Duma and some liberties, but the Tsar kept control, and peasant and worker discontent continued.");
  b.card("CONCEPT", "Why is 1905 called a 'dress rehearsal' for 1917?", "It showed the methods of strikes, soviets and mutinies that returned in 1917, but the army and the divisions of the opposition saved the regime then.");
});
