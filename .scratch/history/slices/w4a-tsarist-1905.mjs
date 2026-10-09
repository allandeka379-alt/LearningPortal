// Slice W4a: Tsarist Russia and the 1905 Revolution (both boards: ZIMSEC topic 14, 0470 Depth study C key question 1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.russia.tsarist-1905", { file: "russia/tsarist-1905", keyPrefix: "russia.tsarist-1905" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was Tsar of Russia from 1894 to 1917?",
    options: [
      ["Nicholas II", "Correct: the last Tsar."],
      ["Alexander II", "He freed the serfs in 1861 and was assassinated in 1881."],
      ["Peter the Great", "He ruled in the early eighteenth century."],
      ["Alexander III, father of the last Tsar", "He ruled from 1881 to 1894."],
    ],
    answer: "A",
    explanation: "**Nicholas II** ruled from 1894 until his abdication in 1917.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who led the procession to the Winter Palace on Bloody Sunday in January 1905?",
    options: [
      ["Father Gapon", "Correct: a priest who led workers with a petition."],
      ["Lenin", "Lenin was in exile abroad in January 1905."],
      ["Leon Trotsky", "Trotsky became prominent in the St Petersburg Soviet later that year."],
      ["Pyotr Stolypin, the governor of Saratov", "Stolypin became Prime Minister in 1906."],
    ],
    answer: "A",
    explanation: "**Father Gapon** led a peaceful march to petition the Tsar; troops fired on it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the October Manifesto of 1905 promise?",
    options: [
      ["Civil rights and an elected Duma", "Correct: issued on Witte's advice."],
      ["Land for every peasant family", "Land was not promised; redemption payments were later cancelled."],
      ["The Tsar's abdication in favour of his son", "Nicholas abdicated only in 1917."],
      ["An end to the war with Japan on any terms", "Peace came by the Treaty of Portsmouth, not the Manifesto."],
    ],
    answer: "A",
    explanation: "The Manifesto promised **freedoms** and a **Duma** whose consent was needed for laws.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the Bolsheviks believe after the split of 1903?",
    options: [
      ["A small party of professional revolutionaries should lead", "Correct: Lenin's view."],
      ["The peasants, not the factory workers, would make the revolution", "This was closer to the Socialist Revolutionaries."],
      ["Russia should keep the Tsar with a parliament", "This was the liberal view."],
      ["Change should come only through elections to the Duma", "The Duma did not yet exist in 1903."],
    ],
    answer: "A",
    explanation: "Lenin's **Bolsheviks** wanted a small, disciplined party; the Mensheviks wanted a broad one.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Russo-Japanese War help to cause the 1905 Revolution?",
    options: [
      ["Defeats humiliated the government and raised prices", "Correct: anger and hardship grew."],
      ["Japan invaded Moscow and overthrew the Tsar", "Japan never invaded European Russia."],
      ["The war forced the Tsar to free the serfs", "The serfs were freed in 1861."],
      ["It brought Britain into the war on the side of Japan", "Britain was allied to Japan from 1902 but did not fight Russia."],
    ],
    hints: ["Think about the effects of defeat at home."],
    answer: "A",
    explanation: "Defeats such as **Port Arthur** and **Tsushima** discredited the regime while the war raised prices.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the main aim of Stolypin's land reforms?",
    options: [
      ["A class of prosperous peasants loyal to the Tsar", "Correct: his 'wager on the strong'."],
      ["Giving all landlords' estates to the peasants free", "The reforms did not take landlords' estates."],
      ["Collective farms run by the state", "Collectivisation came under Stalin from 1929."],
      ["Moving the capital to Siberia", "Peasants were encouraged to resettle in Siberia, not the capital."],
    ],
    hints: ["Stolypin wanted to reduce support for revolution in the countryside."],
    answer: "A",
    explanation: "Stolypin hoped **independent, prosperous peasants** would support the regime.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "How did the Fundamental Laws of 1906 weaken the promises of the October Manifesto?",
    options: [
      ["They declared the Tsar still the supreme autocrat", "Correct: he could dissolve the Duma and rule by decree."],
      ["They abolished the Duma before it ever met", "The first Duma met in 1906."],
      ["They gave the vote only to industrial workers in the cities", "Workers had limited representation."],
      ["They made Russia a republic under a President", "Russia remained a monarchy until 1917."],
    ],
    hints: ["Who kept control of ministers and laws?"],
    answer: "A",
    explanation: "The **Fundamental Laws** kept the Tsar's autocratic powers, so the Duma had little real power.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which was the most important reason the Tsar survived the 1905 Revolution?",
    options: [
      ["Most of the army stayed loyal", "Correct: troops crushed the Moscow rising and arrested the soviet."],
      ["The workers voted to support the Tsar in the Duma", "The Duma met only in 1906."],
      ["Japan sent troops to help him restore order", "Japan was Russia's enemy in 1905."],
      ["The Bolsheviks agreed to stop all strikes", "The Bolsheviks opposed the Tsar."],
    ],
    hints: ["Without which group could he not restore order?"],
    answer: "A",
    explanation: "With the **army** loyal, the regime could crush the remaining revolutionaries once the opposition divided.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Peasants made up the great majority of Russia's population before 1914.",
    answer: true,
    explanation: "True. About four-fifths of the population were peasants.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Stolypin was Prime Minister until the outbreak of the First World War in 1914.",
    answer: false,
    explanation: "False. Stolypin was assassinated in 1911.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Sergei Witte", "Finance minister who promoted industry and advised the October Manifesto"],
      ["Pyotr Stolypin", "Prime Minister from 1906 who reformed peasant landholding"],
      ["Lenin", "Leader of the Bolsheviks"],
      ["Rasputin", "Holy man whose influence at court damaged the monarchy"],
    ],
    explanation: "Witte (industry, 1905), Stolypin (Prime Minister 1906-11), Lenin (Bolsheviks), Rasputin (court influence).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The October Manifesto",
      "The first Duma meets",
      "Stolypin is assassinated",
      "Bloody Sunday",
    ],
    right: POS,
    rightIndex: [1, 2, 3, 0],
    hints: ["The Manifesto promised the Duma."],
    explanation: "Bloody Sunday (January 1905); October Manifesto (October 1905); first Duma (1906); Stolypin assassinated (1911).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Tsar's secret police was the {{blank:a}}. The policy of forcing non-Russians to adopt the Russian language was called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Okhrana"], choices: ["Okhrana", "Cheka", "Gestapo", "Duma"] },
      { id: "b", accepted: ["Russification"], choices: ["Russification", "collectivisation", "autarky", "industrialisation"] },
    ],
    explanation: "The **Okhrana** was the Tsarist secret police (the Cheka was the Bolsheviks'); **Russification** targeted minorities.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the elected Russian parliament created after the 1905 Revolution.",
    accepted: ["Duma", "the Duma", "State Duma"],
    wrong: ["Soviet"],
    explanation: "The **Duma** first met in 1906; there were four Dumas before 1917.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the main features of Tsarist rule before 1905.",
    points: [
      "Autocracy: the Tsar ruled with unlimited power, believed to be God-given.",
      "No elected parliament; ministers appointed by and answerable to the Tsar.",
      "Okhrana secret police; censorship; opponents exiled.",
      "Orthodox Church taught obedience / Russification of minorities / army used against protest.",
    ],
    modelAnswer: "Russia was an autocracy: the Tsar ruled with unlimited power, which the Orthodox Church taught was given by God. There was no elected parliament, and ministers were appointed by the Tsar and answerable only to him. The Okhrana secret police watched and arrested opponents, newspapers were censored and many revolutionaries were exiled to Siberia. Non-Russian peoples were subjected to Russification.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Bloody Sunday was important.",
    points: [
      "Identifies the loss of trust in the Tsar.",
      "Explains that workers had seen him as their 'little father', but the shooting of a peaceful march destroyed this image.",
      "Identifies that it sparked the 1905 Revolution.",
      "Explains that strikes, peasant risings and mutinies spread across Russia in the following months.",
    ],
    hints: ["Short-term and longer-term effects."],
    modelAnswer: "Many workers had believed the Tsar was their 'little father' who would protect them from bad officials. When troops shot down a peaceful procession carrying his picture, that trust was destroyed. Bloody Sunday also sparked the 1905 Revolution: strikes, peasant attacks on estates, mutinies and risings spread across the empire in the following months.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how Nicholas II survived the 1905 Revolution.",
    points: [
      "Identifies the October Manifesto.",
      "Explains that it satisfied many liberals, splitting them from the socialists.",
      "Identifies peace with Japan / loyal army.",
      "Explains that the Treaty of Portsmouth freed troops, who crushed the Moscow rising and arrested the St Petersburg Soviet.",
      "Identifies concessions to peasants / later repression.",
      "Explains that reducing and cancelling redemption payments calmed the countryside, and Stolypin's courts punished remaining revolutionaries.",
    ],
    hints: ["Concessions, force and peace."],
    modelAnswer: "The October Manifesto promised civil rights and a Duma, which satisfied most liberals and split them from the socialists, so the opposition no longer acted together. Peace with Japan at Portsmouth in September 1905 freed troops, and because most of the army stayed loyal the government was able to arrest the leaders of the St Petersburg Soviet and crush the Moscow rising in December. The peasants were calmed by the reduction and then cancellation of redemption payments, and from 1906 Stolypin's special courts dealt harshly with remaining revolutionaries.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a petition drawn up by fictional workers of a St Petersburg textile mill, January 1905", "Sire, we working men come to you as children to a father. We labour fourteen hours a day for wages that do not feed our families. We do not ask much: an eight-hour day, a fair wage, and a gathering of the people's representatives to advise you. If you refuse us, we have nowhere else to turn.")}\n\n${source("Source B", "a report by a fictional police officer to the Ministry of the Interior, February 1905", "Since the events of 9 January the mood of the workers has changed completely. Portraits of His Majesty have been torn down in several factories. Agitators who were laughed at last year are now listened to in silence. I must report that the men no longer speak of petitions.")}`,
    hints: ["Compare the workers' attitude to the Tsar before and after Bloody Sunday."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the workers' attitude to the Tsar before Bloody Sunday?", points: [
        "They trusted him as a father / believed he would help them.",
        "Their demands were moderate (hours, wages, an assembly), not revolution.",
      ], explanation: "Two supported points." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B suggest that attitudes had changed? Use both sources.", points: [
        "Change: portraits of the Tsar torn down, compared with A's loyalty ('children to a father').",
        "Change: revolutionary agitators now listened to.",
        "Change: workers no longer speak of petitions, i.e. peaceful methods abandoned.",
        "Limit: B covers only some factories / one officer's view.",
      ], explanation: "Comparison using both sources." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source B to a historian studying the causes of the 1905 Revolution? Use the source and your own knowledge.", points: [
        "Useful: shows the effect of Bloody Sunday on workers' loyalty (a trigger).",
        "Useful: a police officer reporting privately to his superiors has reason to be accurate, even if unwelcome.",
        "Own knowledge confirms: strikes spread and the soviet formed later in 1905.",
        "Limits: covers workers only, not peasants, minorities or liberals.",
        "Limits: does not mention long-term causes or the war with Japan.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B is useful because it shows how Bloody Sunday changed workers' attitudes: portraits of the Tsar were torn down and revolutionaries were now listened to. As a private report by a police officer to his ministry, it had a reason to be accurate even though the news was unwelcome, and my own knowledge confirms that strikes spread through 1905 and a soviet was formed in October. However, it covers only the workers of the capital and says nothing about peasants, minorities or liberals, nor about the long-term causes such as poverty and autocracy or the war with Japan. It is useful for the trigger of the revolution but must be combined with other evidence for its wider causes.", explanation: "Usefulness from provenance, content and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh the reforms against the problems that remained in 1914."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe Stolypin's policies as Prime Minister.", points: [
        "Repression: special courts tried suspected revolutionaries; many hanged.",
        "Peasants allowed to leave the commune and consolidate strips into farms.",
        "Peasant Land Bank helped peasants buy land.",
        "Resettlement in Siberia encouraged / aim of creating loyal prosperous peasants.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How successful was the Tsarist regime in dealing with the problems of ruling Russia between 1906 and 1914?", points: [
        ["Success: order restored; revolutionaries crushed; army loyal", 2],
        ["Success: rapid industrial growth; Stolypin's reforms created some prosperous peasants; Dumas gave a voice", 2],
        ["Failure: Dumas dismissed and weakened; Fundamental Laws; promises of 1905 broken", 2],
        ["Failure: land hunger, rising strikes after 1912 (Lena), Rasputin, minorities' grievances", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The regime had some success. Order was restored after 1905: Stolypin's special courts crushed the revolutionaries and the army remained loyal. Industry grew quickly, and Stolypin's land reforms allowed some peasants to set up separate farms. The Dumas, though weak, gave educated Russians a voice.\n\nBut the deeper problems were not solved. The Fundamental Laws kept the Tsar's autocratic power, the first two Dumas were dismissed and the voting system was changed to favour landowners, so many felt that the promises of 1905 had been broken. Only a minority of peasants benefited from the land reforms, and land hunger remained. After the Lena goldfields shootings of 1912, strikes rose sharply, and the influence of Rasputin damaged respect for the royal family.\n\nOverall the regime was successful in restoring control but unsuccessful in solving the problems that had caused 1905. It was stable on the surface in 1914, but it had not won the loyalty of most of its people.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Autocracy", "Rule by one person with unlimited power; the Tsar's system before 1905.");
  b.card("FACT", "When was Bloody Sunday?", "22 January 1905 (9 January old style): troops fired on a peaceful march in St Petersburg.");
  b.card("FACT", "What did the October Manifesto (1905) promise?", "Civil rights and an elected parliament, the Duma.");
  b.card("DEFINITION", "Duma", "The elected Russian parliament; four Dumas met between 1906 and 1917.");
  b.card("DEFINITION", "Soviet", "A council elected by workers (and later soldiers); the St Petersburg Soviet was formed in 1905.");
  b.card("FACT", "What were the Fundamental Laws (1906)?", "Laws declaring the Tsar still the supreme autocrat, limiting the Duma's power.");
  b.card("FACT", "Who were the Bolsheviks and Mensheviks?", "The two groups into which the Social Democrats split in 1903; Lenin led the Bolsheviks.");
  b.card("FACT", "What did Stolypin's land reforms do?", "Let peasants leave the commune and form separate farms, helped by a Peasant Land Bank.");
  b.card("CONCEPT", "Why did the Tsar survive 1905?", "The Manifesto split the opposition, peace with Japan freed troops, and the army stayed loyal.");
  b.card("CONCEPT", "Why are there two dates for Russian events?", "Russia used the Julian calendar (13 days behind the Western one) until February 1918.");
});
