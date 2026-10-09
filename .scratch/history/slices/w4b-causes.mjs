// Slice W4b: why there were so many revolutions in 1848 (0470 Option A key question 1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.revolutions-1848.causes", { file: "revolutions-1848/causes", keyPrefix: "revolutions-1848.causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the Austrian chancellor whose system of censorship and repression collapsed in March 1848?",
    options: [
      ["Metternich", "Correct: he resigned and fled after the Vienna rising of 13 March 1848."],
      ["Schwarzenberg", "Schwarzenberg became chief minister later, in November 1848, and restored Austrian power."],
      ["Radetzky", "Radetzky was the Austrian general who commanded in northern Italy."],
      ["Kossuth", "Kossuth was the leader of the Hungarian national movement, an opponent of Austria."],
    ],
    answer: "A",
    explanation: "**Metternich** had dominated Austrian policy since 1815; the Vienna rising of 13 March 1848 forced him out.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which king of France abdicated in February 1848?",
    options: [
      ["Louis Philippe", "Correct: he abdicated on 24 February 1848 and a republic was proclaimed."],
      ["Charles X", "Charles X was overthrown in the revolution of July 1830."],
      ["Napoleon III", "Louis Napoleon was elected president in December 1848 and later became Emperor Napoleon III."],
      ["Louis XVIII", "Louis XVIII was restored in 1814-15 and died in 1824."],
    ],
    answer: "A",
    explanation: "The February Revolution in Paris brought down **Louis Philippe**, king since 1830.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did most liberals of the 1840s want?",
    options: [
      ["A constitution and an elected parliament", "Correct: they wanted government limited by law and by a parliament."],
      ["The vote for every adult man and woman at once", "Very few people demanded votes for women, and most liberals wanted a property qualification."],
      ["Abolition of all private property and of the monarchy", "These were socialist or radical aims, not liberal ones."],
      ["A return to the absolute monarchy of the eighteenth century", "That was the conservative position that liberals opposed."],
    ],
    answer: "A",
    explanation: "**Liberals** wanted constitutions, parliaments, the rule of law and freedoms such as a free press; most wanted the vote limited to men of property.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where did the first of the major risings of 1848 break out, on 12 January?",
    options: [
      ["Palermo, in Sicily", "Correct: the Sicilians rose against the King of the Two Sicilies about six weeks before Paris."],
      ["Paris, in France", "The Paris revolution came in February 1848, after the rising in Sicily."],
      ["Vienna, in the Austrian Empire", "Vienna rose on 13 March 1848."],
      ["Berlin, in the Kingdom of Prussia", "Berlin rose on 18 March 1848."],
    ],
    answer: "A",
    explanation: "Although Paris was the main trigger, **Palermo** rose first, on 12 January 1848.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which economic problem helped to cause the revolutions of 1848?",
    options: [
      ["Poor harvests and high food prices in 1846-47", "Correct: potato blight and a poor grain harvest drove up the price of food."],
      ["A sudden fall in food prices that ruined townspeople", "Prices rose, not fell; it was townspeople who struggled to buy food."],
      ["The collapse of the Zollverein customs union in 1847", "The Zollverein did not collapse; it continued to grow."],
      ["A shortage of workers that forced factories to close", "The problem was unemployment, not a shortage of workers."],
    ],
    answer: "A",
    explanation: "Potato blight from 1845 and the poor harvest of 1846 pushed up food prices, and the financial crisis of 1847 caused **unemployment**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was the Metternich system a cause of the revolutions of 1848?",
    options: [
      ["It blocked peaceful reform, so reformers felt only revolt could bring change", "Correct: censorship and repression left no legal route to change."],
      ["It gave the vote to the middle class, which then demanded the overthrow of kings", "Metternich's system gave no new rights to the middle class."],
      ["It encouraged nationalism by creating a united Germany and a united Italy", "The 1815 settlement kept Germany and Italy divided."],
      ["It made Austria an ally of the revolutionaries in France", "Metternich opposed revolution everywhere."],
    ],
    answer: "A",
    hints: ["Think about what happens to demands for change when there is no legal way to express them."],
    explanation: "By censoring opinion and crushing revolts, the system **blocked reform**, so pressure built up until it burst out in 1848.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why news from Paris in February 1848 led to risings elsewhere?",
    options: [
      ["It encouraged opponents of other governments and shook rulers' confidence", "Correct: rulers remembered how revolution had spread from France in 1789."],
      ["The new French republic sent its armies to start revolutions across the rest of Europe", "The French provisional government did not invade other countries in 1848."],
      ["Louis Philippe fled to Vienna and called on Austrians to rise up", "Louis Philippe went into exile in Britain."],
      ["It caused the potato blight to spread into the German states", "The blight was a plant disease that began in 1845, not a result of politics."],
    ],
    answer: "A",
    hints: ["Think about the effect of the news on two groups: the reformers and the rulers."],
    explanation: "The fall of the French king **encouraged reformers** and **frightened rulers**, many of whom gave way quickly.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of these was a weakness shared by many of the revolutions of 1848?",
    options: [
      ["Middle-class liberals and workers wanted different things", "Correct: liberals wanted constitutions; workers wanted jobs and social reform."],
      ["They were all led by members of the old ruling families", "The leaders were mostly middle-class liberals, not royal families."],
      ["They all broke out in countryside areas far from the capital cities", "Most revolutions began in cities such as Paris, Vienna and Berlin."],
      ["None of them made any demands for a constitution or a parliament", "Constitutions were among the most common demands."],
    ],
    answer: "A",
    hints: ["Who joined the crowds, and did they share the same aims?"],
    explanation: "The coalition of **liberals and workers** split once the first demands were met, which helped the old rulers recover.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Britain did not have a revolution in 1848.",
    answer: true,
    explanation: "True. The Chartists held a mass meeting in London in April 1848, but there was no rising.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Congress of Vienna of 1815 created a united Italian state.",
    answer: false,
    explanation: "False. The settlement left Italy divided into several states, with Austria ruling Lombardy and Venetia.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Liberalism", "Government limited by a constitution and a parliament"],
      ["Nationalism", "The belief that a people sharing a language and culture should rule themselves"],
      ["Carlsbad Decrees", "Measures of 1819 that censored the press and controlled universities"],
      ["Absolute monarchy", "Rule by a king or emperor with no constitution limiting his power"],
    ],
    explanation: "These four terms describe the ideas of 1848 and what they were directed against.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Metternich resigns after the rising in Vienna",
      "Revolution in Paris replaces Charles X with Louis Philippe",
      "Rising in Palermo, Sicily",
      "Louis Philippe abdicates",
    ],
    right: POS,
    rightIndex: [3, 0, 1, 2],
    hints: ["One of these events happened in 1830."],
    explanation: "1830 revolution in Paris; Palermo (12 January 1848); Louis Philippe abdicates (24 February 1848); Metternich resigns (13 March 1848).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Potato blight spread across northern Europe from {{blank:a}}. In 1847 a financial crisis caused business failures and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1845"], choices: ["1815", "1830", "1845", "1850"] },
      { id: "b", accepted: ["unemployment"], choices: ["unemployment", "a shortage of workers", "falling bread prices", "the end of censorship"] },
    ],
    explanation: "Blight from **1845**, a poor harvest in 1846 and a crisis in 1847 brought high food prices and **unemployment**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the city where King Louis Philippe was overthrown in February 1848.",
    accepted: ["Paris"],
    wrong: ["Vienna"],
    explanation: "The February Revolution in **Paris** triggered the wave of revolutions.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the Metternich system.",
    points: [
      "Aimed to preserve the 1815 settlement / the power of monarchs, especially in the Austrian Empire.",
      "Censorship of the press and books / police spies.",
      "Control of universities and student societies (Carlsbad Decrees, 1819).",
      "Intervention by the great powers against revolutions (Naples and Piedmont 1821, central Italy 1831).",
    ],
    modelAnswer: "Metternich, the Austrian chancellor, wanted to preserve the settlement of 1815 and the power of monarchs, because liberalism and nationalism threatened the multinational Austrian Empire. His system used censorship of newspapers and books and a network of police spies. The Carlsbad Decrees of 1819 placed German universities under supervision and banned student societies. The great powers were ready to intervene against revolutions, and Austrian troops crushed risings in Naples and Piedmont in 1821 and in central Italy in 1831.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why liberalism and nationalism had grown in influence by 1848.",
    points: [
      "Identifies the legacy of the French Revolution and Napoleon.",
      "Explains that ideas of rights and the redrawing of borders showed change was possible.",
      "Identifies the growth of the educated middle class / newspapers and Romanticism.",
      "Explains that this class was shut out of power, so it demanded constitutions and national unity.",
    ],
    hints: ["One reason looks back to 1789-1815; another looks at how society was changing."],
    modelAnswer: "The French Revolution and Napoleon left a lasting legacy: people remembered ideas of citizens' rights and equality before the law, and Napoleon had swept away many small states, showing that borders could change. At the same time the educated middle class of lawyers, teachers and merchants grew. They read newspapers and Romantic writings about national languages and history, but they were shut out of power by absolute rulers, so they demanded constitutions and national unity.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why so many revolutions broke out in 1848.",
    points: [
      "Identifies long-term liberal and national demands.",
      "Explains that the Metternich system blocked reform, so frustration built up.",
      "Identifies the economic crisis of 1845-47.",
      "Explains that high food prices and unemployment brought workers and artisans onto the streets.",
      "Identifies the trigger of the February Revolution in Paris.",
      "Explains that news spread quickly, encouraged reformers and made rulers give way.",
    ],
    hints: ["Long-term causes, short-term causes and a trigger."],
    modelAnswer: "Liberals and nationalists across Europe wanted constitutions and national self-government, but the Metternich system of censorship and intervention blocked any peaceful reform, so frustration built up for thirty years. The economic crisis of 1845-47 turned this into action: potato blight and a poor harvest raised food prices, and the financial crisis of 1847 caused unemployment, so hungry workers and artisans were ready to join liberal protests. The trigger was the fall of Louis Philippe in Paris in February 1848. News spread by railway and telegraph, encouraging reformers elsewhere and shaking rulers' confidence, so Vienna and Berlin rose within weeks and most rulers gave way.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter by a fictional weaver in a Silesian village to his brother in America, written in February 1848", "Bread costs twice what it did two winters ago, and the merchant pays less for each piece of cloth because the factory looms work faster than we can. Three families in our street have nothing in the house. People no longer talk of the king with respect. If something does not change, I do not know what the young men will do.")}\n\n${source("Source B", "a pamphlet by a fictional liberal lawyer in Vienna, printed secretly in 1847", "We are not children to be told what we may read. Every newspaper is cut by the censor's scissors, every lecture is watched by the police. A free people needs a constitution, a parliament and a free press. Until we have them, Austria will remain a prison of the mind.")}`,
    hints: ["Each source shows a different kind of grievance. Ask who wrote it and why."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the condition of workers in 1848?", points: [
        "They faced poverty / high food prices (bread twice the price).",
        "They were losing work or income to factories / were losing respect for the king.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the causes of discontent before 1848?", points: [
        "Agree: both show discontent with the existing government / a demand for change.",
        "Disagree: A stresses economic hardship (bread prices, factory competition).",
        "Disagree: B stresses political grievances (censorship, police, no constitution).",
        "Judgement: they agree that change is needed but show different causes (social and political).",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How useful is Source B as evidence about why revolution broke out in Vienna in March 1848? Use the source and your own knowledge.", points: [
        "Useful: shows liberal demands for a constitution, parliament and free press.",
        "Useful: confirmed by own knowledge of censorship and police control under Metternich.",
        "Provenance: written by a liberal lawyer, a member of the educated middle class that led the revolution; secret printing shows the strength of censorship.",
        "Limitation: one-sided pamphlet meant to persuade; written in 1847, before the events.",
        "Limitation: ignores economic causes (unemployment, food prices) and the trigger from Paris.",
        "Supported judgement on usefulness.",
      ], levels: levels(6), modelAnswer: "Source B is useful because it shows the political grievances of the educated middle class who led the revolution in Vienna: anger at censorship and police spies, and demands for a constitution, a parliament and a free press. My own knowledge confirms that Metternich's system censored the press and watched the universities, and the fact that the pamphlet had to be printed secretly is itself evidence of censorship. However, it is a persuasive pamphlet by a liberal, so it exaggerates ('a prison of the mind'), and it was written in 1847, before the events. It also says nothing about the unemployment and high food prices that brought workers onto the streets, or about the news from Paris that triggered the rising on 13 March. It is useful for the political causes but gives only part of the explanation.", explanation: "Usefulness judged from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the economic crisis with the political causes and the trigger, then decide."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the revolution in Paris in February 1848.", points: [
        "Reformers held political banquets to demand a wider franchise; the government banned one.",
        "Demonstrations turned into street fighting / barricades.",
        "The National Guard would not defend the king.",
        "Louis Philippe abdicated (24 February) and a republic was proclaimed.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "How far was economic distress the main cause of the revolutions of 1848? Explain your answer.", points: [
        ["Economic: harvest failures and high food prices (1845-47).", 2],
        ["Economic: financial crisis and unemployment (1847); artisans and peasants' grievances.", 2],
        ["Other: liberal and national demands blocked by the Metternich system.", 2],
        ["Other: the trigger of Paris and the loss of nerve by rulers; Palermo before Paris.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Economic distress was very important. Potato blight from 1845 and the poor grain harvest of 1846 pushed food prices sharply higher, and the financial crisis of 1847 threw many people out of work. Artisans such as weavers were already losing work to factories, and peasants resented labour services. This hardship brought the crowds onto the streets.\n\nHowever, hunger alone does not explain revolution. Liberals and nationalists had wanted constitutions and national self-government since 1815, and the Metternich system had blocked every peaceful reform. These middle-class reformers led the revolutions and wrote their demands. The timing was set by Paris: once Louis Philippe fell, news spread quickly and rulers lost their nerve. Britain also suffered hardship but had no revolution, which suggests politics mattered.\n\nOverall economic distress was the main reason why revolution happened in 1848 rather than earlier, because it gave the liberals mass support, but it was the political grievances that gave the revolutions their aims, so it was a necessary cause rather than the only one.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Liberalism (1848)", "Belief in constitutional government, an elected parliament, the rule of law and freedoms such as a free press.");
  b.card("DEFINITION", "Nationalism", "The belief that people sharing a language, culture and history should govern themselves in their own state.");
  b.card("DEFINITION", "Metternich system", "Austrian policies after 1815 to preserve the old order: censorship, police spies, control of universities and intervention against revolutions.");
  b.card("FACT", "When did Louis Philippe abdicate?", "24 February 1848, after the February Revolution in Paris.");
  b.card("FACT", "When did Metternich resign?", "13 March 1848, after the rising in Vienna.");
  b.card("FACT", "Where and when did the first major rising of 1848 begin?", "Palermo, Sicily, on 12 January 1848.");
  b.card("FACT", "What were the Carlsbad Decrees (1819)?", "Measures in the German Confederation that censored the press, supervised universities and banned student societies.");
  b.card("CONCEPT", "How did the economic crisis of 1845-47 help cause the revolutions?", "Harvest failures raised food prices and the 1847 financial crisis caused unemployment, giving liberal leaders mass support in the cities.");
  b.card("CONCEPT", "What did the revolutions of 1848 have in common?", "Middle-class liberal leadership, worker support in cities, demands for constitutions and press freedom, national aims, and rapid collapse of governments.");
});
