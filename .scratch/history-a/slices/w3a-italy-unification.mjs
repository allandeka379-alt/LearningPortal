// W3a: ahist.italy.unification (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.italy.unification", { file: "italy/unification", keyPrefix: "italy.unification" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which Italian state was ruled by the House of Savoy and led the unification?",
    ok: ["Piedmont-Sardinia, ruled by the House of Savoy", "Correct: it was the one Italian-ruled kingdom of any size."],
    no: [
      ["The Papal States, ruled by the Pope from Rome", "The Papal States were ruled by the Pope."],
      ["The Kingdom of the Two Sicilies, ruled by a Bourbon king", "The Two Sicilies were ruled by Bourbons."],
      ["Lombardy and Venetia, the provinces held directly by Austria", "These provinces were ruled by the Austrian emperor."],
    ],
    explanation: "Piedmont-Sardinia, under the House of Savoy, was the only large Italian-ruled state and became the leader of unification.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Who founded Young Italy in 1831?",
    ok: ["Giuseppe Mazzini, the exile who wanted a united republic", "Correct: he wanted a united republic."],
    no: [
      ["Camillo Cavour, the practical minister of Piedmont", "Cavour was a practical minister of Piedmont."],
      ["Giuseppe Garibaldi, the leader of the Redshirts in 1860", "Garibaldi led the Thousand in 1860."],
      ["Victor Emmanuel II, the king of Piedmont-Sardinia from 1849", "Victor Emmanuel II became king in 1849."],
    ],
    explanation: "Mazzini founded Young Italy in 1831 to work by popular uprising for a united Italian republic.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was agreed at Plombières in 1858?",
    ok: ["Napoleon III would help Piedmont against Austria in return for Savoy and Nice", "Correct: the secret agreement of Cavour and Napoleon III."],
    no: [
      ["Garibaldi would conquer Sicily with a force of volunteers from Genoa", "That was the plan of 1860."],
      ["Austria would hand over Venetia to Italy in exchange for a payment", "Venetia came in 1866 after the Austro-Prussian War."],
      ["Mazzini would set up a republic in Rome under French protection", "Mazzini had no part in the agreement."],
    ],
    explanation: "At Plombières Cavour and Napoleon III agreed that France would help drive Austria from northern Italy; in return France would receive Savoy and Nice.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Napoleon III make the armistice of Villafranca in July 1859?",
    ok: ["He was alarmed by heavy losses and by the threat of Prussian intervention", "Correct: he stopped before Venetia was freed."],
    no: [
      ["He wanted to hand the whole of Italy to the Pope in return for peace", "He did not hand Italy to the Pope."],
      ["He had been defeated at Solferino and had lost the French army", "Solferino was a French and Piedmontese victory."],
      ["He wished to unite Italy as a republic under the leadership of Mazzini", "He did not wish a united republic."],
    ],
    hints: ["Think of the cost of the battles and of Prussia."],
    explanation: "Napoleon III feared a longer war, was shocked by the casualties, and worried about Prussian moves. Piedmont gained Lombardy but not Venetia.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Cavour send a Piedmontese army through the Papal States in 1860?",
    ok: ["To stop Garibaldi marching on Rome and to bring the south under the king", "Correct: he feared a clash with France and a republic."],
    no: [
      ["To restore the Pope to power over the whole of the Italian peninsula and the city of Rome", "He wished to extend the king's power, not the Pope's."],
      ["To support Mazzini in the proclamation of a republic at Naples", "Cavour opposed a republic."],
      ["To attack the French garrison which was holding the city of Rome", "He wished to avoid a clash with France."],
    ],
    hints: ["Think of Rome and of the French garrison."],
    explanation: "Cavour wanted to prevent Garibaldi from attacking Rome (which would bring in the French) and from forming a republic in the south. His army defeated the papal troops at Castelfidardo.",
  });
  mc(b, {
    d: 3, skill: "RECALL",
    stem: "On what date did Italian troops enter Rome?",
    ok: ["20 September 1870, through a breach at Porta Pia", "Correct: they entered through a breach at Porta Pia."],
    no: [
      ["17 March 1861, when the kingdom was proclaimed", "This was the date of the proclamation of the Kingdom of Italy."],
      ["11 May 1860, when the Thousand landed at Marsala", "This was Garibaldi's landing in Sicily."],
      ["26 October 1860, when Garibaldi met the king at Teano", "This was the meeting at Teano."],
    ],
    hints: ["The French garrison left because of the Franco-Prussian War."],
    explanation: "Italian troops entered Rome on 20 September 1870 after the French garrison was withdrawn; Rome became the capital in 1871.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that unification depended on foreign help?",
    ok: ["French victories in 1859 and Prussia's defeat of Austria in 1866", "Correct: key gains followed foreign victories."],
    no: [
      ["Mazzini founded Young Italy in Marseille in 1831 with Italian exiles", "This shows an Italian effort."],
      ["Garibaldi's volunteers took Sicily with local support in the summer of 1860", "This was mainly an Italian effort, with local help."],
      ["Cavour built Piedmont's railways and strengthened its army in the 1850s", "This shows Piedmont's own preparation."],
    ],
    hints: ["Which fact shows other states fighting Austria?"],
    explanation: "Lombardy came after the French victories of 1859, and Venetia after Prussia's victory in 1866; the French withdrawal from Rome in 1870 allowed its capture.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment about the nature of unification is best supported by the evidence?",
    ok: ["It was led by the Piedmontese elite and involved few ordinary people", "Correct: much of the population was not directly involved."],
    no: [
      ["It was a rising of the whole Italian people against foreign rule from the Alps to Sicily", "Many peasants were uninvolved."],
      ["It was achieved by Mazzini's republican plan without a king", "The result was a monarchy."],
      ["It was completed by 1861 with the entry of the army into Rome", "Venetia and Rome came later."],
    ],
    hints: ["Think of the part of ordinary peasants and of the monarchy."],
    explanation: "Historians stress that Piedmont's leaders and the monarchy directed unification, with limited peasant involvement; the plebiscites were managed and the south felt conquered.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Victor Emmanuel II was proclaimed King of Italy in March 1861.",
    answer: true,
    explanation: "True. The first Italian parliament proclaimed him king on 17 March 1861.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Garibaldi himself became the king of the new Italy after the conquest of Naples.",
    answer: false,
    explanation: "False. At Teano in October 1860 Garibaldi handed his conquests to Victor Emmanuel II, who became king.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The revolutions in Italy in the late 1840s failed because Austria and its allies were militarily stronger than the revolutionaries.",
    answer: true,
    hints: ["Think of Custoza, Novara and the French in Rome."],
    explanation: "True. Austria defeated Piedmont at Custoza and Novara and French troops destroyed the Roman Republic, and the revolutionaries were divided.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Mazzini", "Founder of Young Italy who wanted a united republic"],
      ["Cavour", "Prime minister of Piedmont who won French help"],
      ["Garibaldi", "Leader of the Redshirts who conquered Sicily and Naples"],
      ["Victor Emmanuel II", "King of Piedmont-Sardinia who became King of Italy"],
    ],
    explanation: "These four figures are essential for questions on unification.",
  });
  {
    const events = [
      "Cavour and Napoleon III meet at Plombières",
      "The Thousand land at Marsala",
      "The Kingdom of Italy is proclaimed",
      "Italian troops enter Rome",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1858 to 1870."],
      explanation: "July 1858; May 1860; March 1861; September 1870.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Garibaldi's volunteers were known as the {{blank:a}}, and they landed in Sicily at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Redshirts"], choices: ["Redshirts", "Carbonari", "Blackshirts", "Brownshirts"] },
      { id: "b", accepted: ["Marsala"], choices: ["Marsala", "Genoa", "Naples", "Palermo"] },
    ],
    explanation: "The Redshirts landed at Marsala on 11 May 1860.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the prime minister of Piedmont who made the alliance with Napoleon III against Austria.",
    accepted: ["Cavour", "Camillo Cavour", "Count Cavour", "Camillo Benso, Count of Cavour", "Camillo di Cavour"],
    wrong: ["Mazzini"],
    explanation: "**Cavour**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how Italy was divided in 1815.",
    points: ["Piedmont-Sardinia was ruled by the House of Savoy", "Lombardy and Venetia were ruled directly by Austria", "The Papal States covered the centre and were ruled by the Pope", "The Kingdom of the Two Sicilies in the south was ruled by a Bourbon king; the duchies were ruled by Habsburg princes"],
    modelAnswer: "Piedmont-Sardinia was ruled by the House of Savoy, while Lombardy and Venetia were ruled directly by Austria. The Papal States in the centre were ruled by the Pope, and the south formed the Kingdom of the Two Sicilies under a Bourbon king. The duchies of Parma, Modena and Tuscany were ruled by Habsburg princes.",
    explanation: "One mark for each region described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the revolutions in Italy in the late 1840s failed to unite the country.",
    points: [["Austria defeated Piedmont at Custoza and Novara, and the Italian states could not unite against it", 2], ["French troops destroyed the Roman Republic and restored the Pope, and the revolutionaries were divided between moderates and republicans", 2]],
    hints: ["Think of Austria and the French in Rome."],
    modelAnswer: "Austria defeated Piedmont at Custoza and Novara, and the Italian states could not unite against it. French troops destroyed the Roman Republic and restored the Pope, and the revolutionaries were divided between moderates and republicans.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Cavour sought the help of Napoleon III.",
    points: [["Piedmont had failed to beat Austria alone in 1848-49, so it needed a strong ally", 2], ["France was the only power willing to help, and Napoleon III had his own reasons of prestige and the gain of Savoy and Nice", 2]],
    hints: ["Think of the defeat at Novara and of what France gained."],
    modelAnswer: "Piedmont had failed to beat Austria alone in 1848-49, so it needed a strong ally. France was willing to help, because Napoleon III wanted prestige and the gain of Savoy and Nice.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional Piedmontese officer to his family, October 1860",
        "We have marched south, and the towns greet us with flags. The people of Naples have voted to join the king. We are told that the whole of Italy is one at last, though I notice that many of the peasants do not know what the vote was for."),
      "",
      source("Source B", "a recollection by a fictional Sicilian farmer, recorded in the 1890s",
        "When Garibaldi came we thought the land would be ours. Instead came new taxes and soldiers to take our sons. The landlords kept their land. Some say we gained a country, but in our village we gained only a bill from the king."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the plebiscites?", points: ["The towns welcomed the army and voted for the king", "Many peasants did not understand what the vote was for"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the experience of unification in southern Italy.", points: [["Agree: both suggest that many ordinary people were not fully part of the national movement or did not benefit", 2], ["Differ: A describes a welcome in the towns and the vote for union; B describes disappointment, new taxes and conscription", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian studying the results of unification in the south?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a contemporary letter from a soldier of the winning side, useful for the atmosphere of 1860 and doubts about the plebiscite, but he was an outsider and saw only the towns on his march", 2], ["B is the view of a farmer, giving the peasant experience, but it was recorded decades later and may reflect later bitterness", 2], ["Own knowledge: new taxes, conscription and the unchanged position of landlords are well documented; together the sources give two views, but neither covers every region", 2]], modelAnswer: "Source A is useful because it was written at the time by an officer, and it shows both the welcome in the towns and his own doubts about the plebiscites; but he was a northerner passing through, and saw only part of the south. Source B gives the peasant view of disappointment, new taxes and conscription, which agrees with what we know about the new state's policies and the lack of land reform, but it was recorded decades later and may reflect later bitterness. Together they are useful for understanding that unification was welcomed by some but brought disappointment to many peasants." }),
    ],
    hints: ["For (c), consider who wrote each source and when."],
    explanation: "Both sources are invented: an officer's letter and a farmer's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Who contributed more to the unification of Italy, Cavour or Garibaldi?",
    levels: levels(8),
    points: [
      ["Cavour: modernised Piedmont, won French help at Plombières, the war of 1859, annexation of the centre, sent the army south in 1860", 2],
      ["Garibaldi: the Thousand, conquest of Sicily and Naples, a popular hero who gave the movement momentum", 2],
      ["Limits: Garibaldi needed the king's army, Cavour did not plan the south, and foreign powers (France, Prussia) mattered", 2],
      ["A supported judgement ranking the two", 2],
    ],
    hints: ["Compare what each achieved and how much depended on the other."],
    modelAnswer: "Cavour contributed more. He modernised Piedmont, won French help at Plombières, defeated Austria in 1859, brought the central states into the kingdom and in 1860 sent the army south to prevent a republic and to control Garibaldi's conquests. Garibaldi's contribution was dramatic: the Thousand conquered Sicily and Naples and gave the movement a popular base, which Cavour had not planned. But Garibaldi handed his gains to the king, and without Piedmont's army, diplomacy and the king's authority the conquests could not have become part of a lasting state. Both depended on foreign help. I conclude that Cavour made the larger contribution, but Garibaldi made the unification of the south possible.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Risorgimento?", "The movement for Italian unity and independence from about 1815 to 1870.");
  b.card("DEFINITION", "Who were the Carbonari?", "Secret societies that plotted for constitutions and national freedom; their revolts in 1820-21 and 1831 were crushed.");
  b.card("FACT", "What did Cavour and Napoleon III agree at Plombières (1858)?", "France would help Piedmont drive Austria from northern Italy and receive Savoy and Nice.");
  b.card("FACT", "What happened at Villafranca (July 1859)?", "Napoleon III made an armistice with Austria; Piedmont gained Lombardy but not Venetia.");
  b.card("FACT", "When did the Thousand land in Sicily?", "11 May 1860 at Marsala; Garibaldi entered Naples on 7 September 1860.");
  b.card("FACT", "When did Italy gain Venetia and Rome?", "Venetia in 1866 after the Austro-Prussian War; Rome on 20 September 1870 after the French garrison left.");
  b.card("CONCEPT", "Why did the 1848-49 revolutions fail in Italy?", "Austria defeated Piedmont, France restored the Pope, and the revolutionaries were divided.");
  b.card("CONCEPT", "What did Mazzini contribute to unification?", "He inspired a generation with the idea of a united republic, but his uprisings failed.");
  b.card("CONCEPT", "Why was unification incomplete in the south?", "Peasants gained little, landlords kept their land, taxes and conscription rose, and the gap between north and south persisted.");
});
