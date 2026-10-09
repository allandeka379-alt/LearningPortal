// Slice W4b: Cavour, Victor Emmanuel II and the war of 1859 (0470 Option A key question 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.italy.cavour", { file: "italy/cavour", keyPrefix: "italy.cavour" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Cavour become Prime Minister of Piedmont?",
    options: [
      ["1852", "Correct: he led the government from 1852 until his death in 1861, apart from a break in 1859-60."],
      ["1848", "In 1848 Charles Albert was king and Piedmont went to war with Austria; Cavour was not yet Prime Minister."],
      ["1859", "Cavour resigned in 1859 after Villafranca."],
      ["1861", "Cavour died in June 1861."],
    ],
    answer: "A",
    explanation: "Cavour became Prime Minister in **1852**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did France receive in return for helping Piedmont against Austria?",
    options: [
      ["Nice and Savoy", "Correct: they were ceded by the Treaty of Turin in March 1860."],
      ["Lombardy and Venetia", "Lombardy went to Piedmont; Venetia stayed Austrian until 1866."],
      ["Sicily and Naples", "These were conquered by Garibaldi in 1860 and joined Italy."],
      ["Rome and the Papal States", "France protected the pope in Rome; it did not annex his lands."],
    ],
    answer: "A",
    explanation: "France gained **Nice and Savoy**, as agreed at Plombières.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Piedmont gain from taking part in the Crimean War?",
    options: [
      ["A place at the Congress of Paris, where Cavour raised the Italian question", "Correct: it gained goodwill but no territory."],
      ["The province of Lombardy, taken from Austria in the peace treaty that ended the war", "Lombardy was gained in 1859, not from the Crimean War."],
      ["A Russian promise to send an army to fight Austria", "Piedmont fought against Russia in the Crimean War."],
      ["Control of the city of Rome, granted by France", "Rome joined Italy only in 1870."],
    ],
    answer: "A",
    explanation: "The Crimean War gave Piedmont **a voice at the Congress of Paris** (1856) and goodwill from Britain and France.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which two battles did France and Piedmont win against Austria in June 1859?",
    options: [
      ["Magenta and Solferino", "Correct: Magenta on 4 June and Solferino on 24 June 1859."],
      ["Custoza and Novara", "These were Austrian victories over Piedmont in 1848 and 1849."],
      ["Calatafimi and the Volturno", "These were Garibaldi's battles in 1860."],
      ["Sadowa and Sedan", "These were Prussian victories in 1866 and 1870."],
    ],
    answer: "A",
    explanation: "**Magenta** and **Solferino** opened the way to Milan and Lombardy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the armistice of Villafranca (July 1859) decide?",
    options: [
      ["Lombardy would go to Piedmont, but Venetia would stay Austrian", "Correct: and the rulers of the central duchies were to be restored."],
      ["Piedmont would receive both Lombardy and Venetia at once", "Venetia was left to Austria until 1866."],
      ["France would annex the whole of Lombardy permanently", "Lombardy passed through France to Piedmont."],
      ["The pope would give up Rome to the Kingdom of Piedmont", "Rome was not part of the settlement."],
    ],
    answer: "A",
    explanation: "At **Villafranca** Napoleon III made peace without Cavour: Lombardy only, not Venetia.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Cavour need Austria to appear the aggressor in 1859?",
    options: [
      ["Napoleon III's help at Plombières depended on a defensive war", "Correct: France would fight only if Piedmont seemed to be attacked."],
      ["Britain had promised to fight for whichever side was attacked first", "Britain stayed neutral in 1859."],
      ["The Statuto banned Piedmont from declaring war on anyone", "The Statuto contained no such rule."],
      ["Russia would otherwise have sent troops to defend Austria", "Russia, still resentful of Austria after the Crimean War, did not help it."],
    ],
    hints: ["Look at the conditions of the Plombières agreement."],
    answer: "A",
    explanation: "French help depended on **Austria starting the war**, which it did after Cavour rejected its ultimatum in April 1859.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these was a reason why Napoleon III made the armistice of Villafranca?",
    options: [
      ["Fear that Prussia would attack France on the Rhine", "Correct: Prussia was mobilising, and Napoleon also faced heavy casualties."],
      ["Defeat of the French army at the Battle of Solferino", "France and Piedmont won at Solferino."],
      ["A promise from Austria to hand over Venetia immediately", "Venetia stayed Austrian under the armistice."],
      ["Garibaldi's invasion of Sicily earlier that year", "Garibaldi's expedition came in May 1860, after Villafranca."],
    ],
    hints: ["Think about dangers to France from outside Italy."],
    answer: "A",
    explanation: "Heavy losses, the Quadrilateral, French Catholic opinion and the **threat from Prussia** led Napoleon to make peace.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the Plombières plan supports the view that Cavour did not originally aim at a united Italy?",
    options: [
      ["It planned a northern kingdom inside a confederation led by the pope", "Correct: the south and Rome would have stayed outside Piedmont."],
      ["It handed Nice and Savoy to France as the price of the help that was promised", "This shows the cost of French help, not the limits of Cavour's aims."],
      ["It was agreed in secret between Cavour and Napoleon III", "Secrecy does not show what Cavour's final aims were."],
      ["It led to a war that France and Piedmont won", "Victory does not show what Cavour originally intended."],
    ],
    hints: ["Which option describes the shape of the Italy that was planned?"],
    answer: "A",
    explanation: "Plombières planned an **enlarged northern kingdom within a confederation**, not a single Italian state.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cavour resigned as Prime Minister after the armistice of Villafranca.",
    answer: true,
    explanation: "True. He resigned in July 1859 and returned in January 1860.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Piedmont gained the central Italian duchies in 1859 directly through the terms of the armistice of Villafranca.",
    answer: false,
    explanation: "False. Villafranca said the rulers should return; the duchies joined Piedmont through assemblies and the plebiscites of March 1860.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Plombières", "Secret Franco-Piedmontese agreement of July 1858"],
      ["Villafranca", "Armistice of July 1859 that left Venetia to Austria"],
      ["Plebiscite", "A vote by the whole people on a single question"],
      ["National Society", "Organisation supporting unity under Piedmont's king"],
    ],
    explanation: "Plombières (1858), Villafranca (1859), plebiscite, National Society (1857).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Battle of Solferino",
      "Congress of Paris",
      "Plebiscites in central Italy",
      "Plombières agreement",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The Congress of Paris ended the Crimean War."],
    explanation: "Congress of Paris (1856); Plombières (July 1858); Solferino (June 1859); plebiscites (March 1860).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In January 1858 the Italian nationalist {{blank:a}} tried to assassinate Napoleon III. Six months later Napoleon met Cavour at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Orsini"], choices: ["Orsini", "Mazzini", "Manin", "Garibaldi"] },
      { id: "b", accepted: ["Plombières"], choices: ["Plombières", "Villafranca", "Teano", "Olmütz"] },
    ],
    explanation: "**Orsini**'s bomb attack preceded the meeting at **Plombières** in July 1858.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the French emperor who allied with Piedmont against Austria in 1859.",
    accepted: ["Napoleon III", "Napoleon the Third", "Louis Napoleon", "Emperor Napoleon III", "Louis-Napoleon", "Louis Napoleon Bonaparte"],
    wrong: ["Napoleon I"],
    explanation: "**Napoleon III** (Louis Napoleon) ruled France as emperor from 1852 to 1870.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how Cavour strengthened Piedmont in the 1850s.",
    points: [
      "Free trade treaties with Britain, France and others.",
      "Railways, banks and the port of Genoa developed.",
      "Reduced Church power (e.g. closure of many monasteries, 1855).",
      "Reformed finances / strengthened the army / kept the Statuto and parliament.",
    ],
    modelAnswer: "Cavour signed free trade treaties with Britain, France and other countries, which increased trade. He encouraged railway building, banks and the development of the port of Genoa. He reduced the power of the Church, for example by closing many monasteries in 1855. He reformed the state's finances and strengthened the army, and he governed through the parliament set up by the Statuto, which made Piedmont the model of a modern Italian state.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Napoleon III was willing to help Piedmont against Austria.",
    points: [
      "Identifies his wish to weaken Austria / increase French influence in Italy.",
      "Explains that replacing Austrian with French influence would raise French prestige and undo the 1815 settlement.",
      "Identifies the gain of Nice and Savoy / sympathy for Italian nationalism.",
      "Explains that he had fought with Italian rebels in his youth / Orsini's attempt pushed him to act.",
    ],
    hints: ["What could France gain, and what personal motives did he have?"],
    modelAnswer: "Napoleon III wanted to weaken Austria and replace Austrian influence in Italy with French influence, which would raise French prestige and help undo the settlement of 1815 that had been imposed on France. He would also gain territory, Nice and Savoy. He had some sympathy for Italian nationalism, having taken part in a rising in central Italy as a young man, and Orsini's attempt to kill him in 1858 convinced him that he should act on the Italian question.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how Piedmont came to control northern and central Italy by 1860.",
    points: [
      "Identifies Cavour's diplomacy / the Plombières agreement.",
      "Explains that it won French military support against Austria.",
      "Identifies the war of 1859 (Magenta, Solferino).",
      "Explains that victory brought Lombardy to Piedmont through Villafranca.",
      "Identifies the risings and assemblies in the central duchies and Romagna.",
      "Explains that plebiscites (March 1860) confirmed union, accepted by France in return for Nice and Savoy.",
    ],
    hints: ["Diplomacy, war and popular votes."],
    modelAnswer: "Cavour's diplomacy was the starting point: at Plombières in 1858 he won Napoleon III's promise of military help against Austria. When Austria invaded Piedmont in April 1859, French and Piedmontese armies won at Magenta and Solferino, and the armistice of Villafranca gave Lombardy to Piedmont. Meanwhile the rulers of Tuscany, Parma and Modena fled and the Romagna rose against the pope; nationalist assemblies voted to join Piedmont. Cavour persuaded Napoleon to accept this by giving France Nice and Savoy, and plebiscites in March 1860 confirmed the union.",
    explanation: "Two marks per developed stage.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an article in a fictional liberal newspaper in Turin, July 1859", "The Emperor of the French has made peace behind our backs. Venice remains in chains, and the princes who fled are to return to the cities that rejected them. Count Cavour has done the honourable thing and resigned. The Italians of the centre will not accept the old masters again.")}\n\n${source("Source B", "a cartoon of the kind published in a British magazine in 1859, described in words", "Napoleon III, in uniform, is shaking hands with the Austrian emperor across a small table labelled 'Villafranca'. A small figure labelled 'Piedmont' tugs at Napoleon's coat, holding a map with 'Venetia' marked on it. Napoleon does not look round. Behind them a pile of soldiers' helmets is labelled 'Solferino'.", { described: true })}`,
    hints: ["Consider who produced each source, when and for whom."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about Italian reactions to the armistice of Villafranca?", points: [
        "Anger / a sense of betrayal by Napoleon III.",
        "Determination in central Italy to resist the return of the old rulers.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of the cartoonist in Source B? Use details of the source and your knowledge.", points: [
        "Napoleon made peace with Austria and ignored Piedmont.",
        "Detail: Piedmont tugging at his coat; Napoleon not looking round; Venetia on the map.",
        "Suggests the heavy losses (Solferino helmets) were a reason for the peace.",
        "Knowledge: Venetia left to Austria; casualties at Solferino; Cavour not consulted.",
      ], explanation: "Message supported by details and knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How useful are these sources for understanding why Piedmont did not gain Venetia in 1859? Use the sources and your own knowledge.", points: [
        "Both show the armistice was made by Napoleon without Piedmont.",
        "Source B suggests one reason: heavy casualties at Solferino.",
        "Own knowledge: other reasons not in the sources (Prussian threat on the Rhine, the Quadrilateral, French Catholic opinion).",
        "Provenance of A: Piedmontese liberal paper, angry and partisan, but shows contemporary feeling.",
        "Provenance of B: British cartoon, an outside view, exaggerates for effect.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Both sources are useful because they show that Venetia was left to Austria by an armistice that Napoleon III made with Franz Joseph without consulting Piedmont. Source B also suggests one reason, the heavy casualties at Solferino shown by the pile of helmets. However, the sources leave out other reasons I know about: Prussia was mobilising on the Rhine, the Quadrilateral fortresses protected Venetia, and French Catholics were angry about revolts in the pope's lands. Source A is a Piedmontese liberal newspaper writing in anger, so it shows Italian feeling rather than Napoleon's reasons, while Source B is an outside British view that simplifies events for effect. Together they are useful for what happened and how it was seen, but my own knowledge is needed to explain why.", explanation: "Uses both sources, evaluates them and adds own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), use the help/hinder framework and reach a clear judgement."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the agreement made at Plombières in 1858.", points: [
        "Secret meeting of Cavour and Napoleon III (July 1858).",
        "France would help Piedmont against Austria if Austria appeared the aggressor.",
        "Piedmont to gain Lombardy, Venetia and parts of central Italy (Kingdom of Upper Italy); a confederation under the pope.",
        "France to gain Nice and Savoy / marriage of Clotilde to Napoleon's cousin.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "\"Cavour helped rather than hindered Italian unification.\" How far do you agree? Explain your answer.", points: [
        ["Helped: modernised Piedmont; Crimean War and Congress of Paris won goodwill.", 2],
        ["Helped: Plombières and French alliance; war of 1859 won Lombardy; central Italy in 1860.", 2],
        ["Hindered/limited: aims were northern kingdom and confederation; distrust of Garibaldi and democrats.", 2],
        ["Hindered/limited: gave away Nice and Savoy; dependent on France, which stopped at Villafranca.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Cavour helped unification in important ways. He modernised Piedmont's economy, finances and army, which made it the natural leader of Italy. By joining the Crimean War he won a place at the Congress of Paris and the goodwill of Britain and France. His greatest achievement was the alliance with Napoleon III at Plombières, which brought a French army to defeat Austria in 1859 and won Lombardy, and in 1860 his diplomacy secured central Italy.\n\nHowever, some historians argue that his aims were limited. The Plombières plan was for a Kingdom of Upper Italy within a confederation under the pope, which would have left the south and Rome outside Piedmont. He depended on France, which made peace at Villafranca when it suited it, and he paid for French acceptance with Nice and Savoy. He also distrusted Garibaldi and the democrats.\n\nOverall Cavour helped more than he hindered. He did not plan a united Italy from the start, but without his diplomacy Austria would not have been driven from Lombardy and the central states could not have joined Piedmont, which made later unification possible.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did Cavour become Prime Minister of Piedmont?", "1852.");
  b.card("DEFINITION", "Plombières agreement", "Secret deal of July 1858: France would help Piedmont fight Austria in return for Nice and Savoy.");
  b.card("FACT", "When were the battles of Magenta and Solferino?", "4 June and 24 June 1859.");
  b.card("FACT", "What did the armistice of Villafranca (11 July 1859) decide?", "Lombardy to Piedmont; Venetia stayed Austrian; the central rulers were to be restored.");
  b.card("FACT", "How did Piedmont gain the central duchies?", "Through assemblies and plebiscites in March 1860, accepted by France in return for Nice and Savoy.");
  b.card("DEFINITION", "Realpolitik", "Politics based on practical calculation of power and interests rather than ideals.");
  b.card("FACT", "What did Piedmont gain from the Crimean War?", "No territory, but a place at the Congress of Paris (1856) and British and French goodwill.");
  b.card("CONCEPT", "Why did Napoleon III make the armistice of Villafranca?", "Heavy casualties, the Quadrilateral fortresses, the threat of Prussian attack on the Rhine and French Catholic opinion.");
  b.card("CONCEPT", "Did Cavour aim at a united Italy?", "Historians disagree: Plombières planned a northern kingdom in a confederation, but his diplomacy made later unification possible.");
});
