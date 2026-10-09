// Slice W4b: Italy before 1850 - Austrian influence, Mazzini and 1848-49 (0470 Option A key question 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.italy.before-1850", { file: "italy/before-1850", keyPrefix: "italy.before-1850" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who founded the nationalist society Young Italy in 1831?",
    options: [
      ["Giuseppe Mazzini", "Correct: he founded it in exile to work for a united Italian republic."],
      ["Giuseppe Garibaldi", "Garibaldi joined Young Italy; he did not found it."],
      ["Camillo di Cavour", "Cavour was a moderate monarchist who became Piedmont's prime minister in 1852."],
      ["Vincenzo Gioberti", "Gioberti proposed a federation under the pope in 1843."],
    ],
    answer: "A",
    explanation: "**Mazzini** founded Young Italy in 1831.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Italian region was ruled directly by Austria after 1815, together with Venetia?",
    options: [
      ["Lombardy", "Correct: Lombardy-Venetia was part of the Austrian Empire."],
      ["Piedmont", "Piedmont was ruled by the House of Savoy."],
      ["Sicily", "Sicily belonged to the Kingdom of the Two Sicilies under the Bourbons."],
      ["The Papal States", "These were ruled by the pope."],
    ],
    answer: "A",
    explanation: "Austria ruled **Lombardy** and Venetia, the rich north of Italy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What kind of Italy did Mazzini want?",
    options: [
      ["A united, independent republic created by the people", "Correct: he believed in popular risings and a republic."],
      ["A federation of the existing states under the leadership of the pope", "This was Gioberti's plan."],
      ["An enlarged Piedmont that took in Lombardy but left the south alone", "This was closer to what Charles Albert and later Cavour first aimed at."],
      ["A kingdom ruled by the Austrian emperor's family", "Mazzini wanted Austria driven out of Italy."],
    ],
    answer: "A",
    explanation: "Mazzini wanted a **united republic**, made by the Italian people themselves.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Where did Austria defeat King Charles Albert of Piedmont in July 1848?",
    options: [
      ["Custoza", "Correct: Radetzky defeated Piedmont there, leading to an armistice."],
      ["Novara", "Novara was the decisive defeat of March 1849."],
      ["Solferino", "Solferino was a French and Piedmontese victory over Austria in 1859."],
      ["Magenta", "Magenta was a French victory over Austria in 1859."],
    ],
    answer: "A",
    explanation: "Radetzky won at **Custoza** in July 1848 and at Novara in March 1849.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which country's troops ended the Roman Republic in 1849?",
    options: [
      ["France", "Correct: Louis Napoleon sent an army to restore the pope."],
      ["Austria", "Austria fought in the north and restored the dukes, but France took Rome."],
      ["Piedmont", "Piedmont had been defeated at Novara and played no part in Rome."],
      ["Russia", "Russian troops intervened in Hungary, not Italy."],
    ],
    answer: "A",
    explanation: "**French** troops took Rome in summer 1849 and restored papal rule.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was Pius IX's announcement of April 1848 a blow to the Italian national movement?",
    options: [
      ["He refused to fight Catholic Austria, ending hopes of a papal-led Italy", "Correct: he withdrew support, and many Catholics followed his lead."],
      ["He declared that Rome would become the capital of an enlarged Kingdom of Piedmont", "He made no such declaration; he defended the Papal States."],
      ["He called on Austria to invade Piedmont immediately", "He refused to fight Austria but did not invite an invasion of Piedmont."],
      ["He abolished the constitutions granted earlier in 1848", "The announcement concerned war with Austria, not constitutions."],
    ],
    hints: ["Moderate nationalists had hoped the pope would lead Italy."],
    answer: "A",
    explanation: "The **pope's refusal** to fight Austria destroyed the hope of a federation under his leadership and divided Catholics from the national cause.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to Charles Albert after the defeat at Novara in March 1849?",
    options: [
      ["He abdicated in favour of his son, Victor Emmanuel II", "Correct: he went into exile and died later that year."],
      ["He was elected President of the Roman Republic by the people of Rome", "The Roman Republic was led by a triumvirate including Mazzini."],
      ["He became King of Lombardy under the terms of the peace", "Lombardy stayed Austrian until 1859."],
      ["He was captured and imprisoned by the Austrians in Vienna", "He abdicated and left for exile."],
    ],
    hints: ["The next King of Piedmont reigned until 1878."],
    answer: "A",
    explanation: "Charles Albert **abdicated**; Victor Emmanuel II became king.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why only Piedmont kept its constitution after 1849?",
    options: [
      ["Victor Emmanuel II kept the Statuto even after defeat, unlike the other rulers", "Correct: elsewhere the restored rulers abolished their constitutions."],
      ["Austria forced Piedmont to keep it in the peace treaty of 1849", "Austria wanted constitutions abolished, not kept."],
      ["Piedmont had won the war against Austria, so it could keep its reforms", "Piedmont lost at Custoza and Novara."],
      ["The pope ordered Piedmont to keep its constitution as a reward", "The pope himself ended constitutional government in Rome."],
    ],
    hints: ["Who decided whether a constitution survived in each state?"],
    answer: "A",
    explanation: "Victor Emmanuel II **kept the Statuto**, which made Piedmont the hope of moderate nationalists in the 1850s.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the Five Days of March 1848, the people of Milan forced the Austrian army to retreat from the city.",
    answer: true,
    explanation: "True. Radetzky withdrew to the fortresses of the Quadrilateral.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Republic of St Mark, declared in Venice in 1848, was the last of the Italian revolutions of 1848-49 to surrender.",
    answer: true,
    explanation: "True. Venice held out until August 1849, after Rome had fallen.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1848-49.",
    pairs: [
      ["Radetzky", "Austrian commander who won at Custoza and Novara"],
      ["Daniele Manin", "Leader of the Republic of St Mark in Venice"],
      ["Pius IX", "Pope who refused to make war on Austria"],
      ["Charles Albert", "King of Piedmont who declared war on Austria"],
    ],
    explanation: "Radetzky (Austria), Manin (Venice), Pius IX (the pope), Charles Albert (Piedmont).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Battle of Novara",
      "Mazzini founds Young Italy",
      "The Five Days of Milan",
      "Battle of Custoza",
    ],
    right: POS,
    rightIndex: [3, 0, 1, 2],
    hints: ["One event is from the 1830s; Custoza came before Novara."],
    explanation: "Young Italy (1831); Five Days of Milan (March 1848); Custoza (July 1848); Novara (March 1849).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "After 1815 Piedmont was ruled by the House of {{blank:a}}. The constitution it kept after 1849 was called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Savoy"], choices: ["Savoy", "Habsburg", "Bourbon", "Bonaparte"] },
      { id: "b", accepted: ["Statuto"], choices: ["Statuto", "Zollverein", "Concordat", "Risorgimento"] },
    ],
    explanation: "Piedmont was ruled by the **House of Savoy**, and its 1848 constitution was the **Statuto**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the son who succeeded Charles Albert as King of Piedmont in 1849.",
    accepted: ["Victor Emmanuel II", "Victor Emmanuel", "Vittorio Emanuele II", "Vittorio Emanuele", "Victor Emmanuel the Second"],
    wrong: ["Charles Albert"],
    explanation: "**Victor Emmanuel II** later became the first King of Italy (1861).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how Austria influenced Italy between 1815 and 1848.",
    points: [
      "Ruled Lombardy and Venetia directly.",
      "Relatives or allies of the Austrian royal family ruled the central duchies (Parma, Modena, Tuscany).",
      "Austrian troops crushed risings in Naples and Piedmont (1821) and central Italy (1831).",
      "Metternich's system of censorship and police control / treaties with Italian rulers.",
    ],
    modelAnswer: "Austria ruled Lombardy and Venetia directly, the richest part of northern Italy. Rulers related to or allied with the Austrian royal family governed the central duchies of Parma, Modena and Tuscany. When risings broke out, Austrian troops restored order, as in Naples and Piedmont in 1821 and in central Italy in 1831. Metternich also encouraged censorship and police control across the peninsula to keep nationalism down.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Mazzini was important to the Italian national movement even though his risings failed.",
    points: [
      "Identifies that he spread the idea of a united Italy.",
      "Explains that his writings and Young Italy inspired young nationalists (e.g. Garibaldi).",
      "Identifies his leadership of the Roman Republic (1849).",
      "Explains that its defence became a symbol / showed Italians would fight for a nation.",
    ],
    hints: ["Think about ideas and about examples that inspired others."],
    modelAnswer: "Mazzini spread the idea that Italians were one nation and should live in one state. Through Young Italy and his writings he inspired a generation of young nationalists, including Garibaldi, who later played a key part in unification. In 1849 he was one of the leaders of the Roman Republic, and its defence against the French became a powerful symbol that showed Italians would fight for their nation.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Italy was not unified in 1848-49.",
    points: [
      "Identifies Austrian military strength.",
      "Explains with Radetzky's victories at Custoza (1848) and Novara (1849).",
      "Identifies divisions among nationalists / regional rivalries.",
      "Explains that republicans and Charles Albert distrusted each other, and the pope and Naples withdrew.",
      "Identifies foreign intervention / lack of mass support.",
      "Explains that French troops ended the Roman Republic / peasants did not join.",
    ],
    hints: ["The strength of Austria, the weakness and division of the Italians, and outside powers."],
    modelAnswer: "Austria's army remained strong: Radetzky withdrew to the Quadrilateral fortresses, received reinforcements and defeated Piedmont at Custoza in 1848 and Novara in 1849. The Italians were divided. Charles Albert wanted to enlarge Piedmont and distrusted the republicans of Milan and Venice, while the pope and the King of Naples withdrew their support, so Piedmont fought largely alone. Finally, outside powers intervened: French troops sent by Louis Napoleon destroyed the Roman Republic in 1849, and most peasants never joined the movement.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter by a fictional volunteer from Tuscany who fought for Piedmont, written in August 1848", "We came to fight for Italy, but the king's officers treated us as a rabble. They distrust anyone from Milan who speaks of a republic. Half the army waited while Radetzky gathered his men. If the King had trusted the people, we would be in Verona now, not running from Custoza.")}\n\n${source("Source B", "a report by a fictional Austrian staff officer to his superiors, written in August 1848", "The Piedmontese troops fought bravely but without a plan. Their volunteers have no discipline and quarrel with the regular army. The Italian princes have abandoned the King of Sardinia. The Field Marshal is confident that, should the war resume, Lombardy can be held without difficulty.")}`,
    hints: ["Who wrote each source, and what did each want the reader to believe?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about relations between the volunteers and the Piedmontese army?", points: [
        "The army distrusted / looked down on the volunteers.",
        "Political division: the army distrusted republicans.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about why Piedmont was defeated in 1848?", points: [
        "Agree: both describe quarrels between volunteers and the regular army.",
        "Agree: both suggest poor leadership / no plan / delay.",
        "Disagree: A blames the king's distrust of the people; B stresses lack of discipline among volunteers.",
        "Disagree: B adds that the other princes abandoned Piedmont / stresses Austrian strength.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How reliable is Source B as evidence about the war of 1848? Use the source and your own knowledge.", points: [
        "Provenance: an internal report to superiors, so less need to make propaganda; but an Austrian officer after victory may be confident or boastful.",
        "Content confirmed: the pope and the King of Naples did withdraw (April-May 1848).",
        "Content confirmed: Custoza; Radetzky did hold Lombardy and won again at Novara (1849).",
        "Content confirmed: tensions between volunteers / republicans and Charles Albert.",
        "Limitation: one side's view; does not explain Italian political aims.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B is a report from an Austrian officer to his superiors, so it was not written for public propaganda and the writer needed to give accurate information; however, as a member of the victorious army, he may be over-confident. Much of its content is confirmed by my knowledge: the pope and the King of Naples did withdraw their support in spring 1848, leaving Piedmont alone; there were real tensions between Charles Albert's army and the republican volunteers; and the Field Marshal's confidence proved justified when Radetzky crushed Piedmont again at Novara in March 1849. It is only the Austrian view and says little about the Italians' political aims, but on the military situation it is fairly reliable.", explanation: "Reliability judged from provenance and from content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh Austria's strength against the Italians' own weaknesses."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Roman Republic of 1849.", points: [
        "Pius IX fled Rome after his minister was murdered (November 1848).",
        "A republic was proclaimed in February 1849.",
        "Mazzini was one of its leaders (triumvirs); Garibaldi led its defence.",
        "French troops besieged and took Rome (summer 1849) and restored the pope; Garibaldi retreated.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "\"Austrian military power was the main reason why Italy was not unified in 1848-49.\" How far do you agree? Explain your answer.", points: [
        ["Agree: Radetzky's army survived the Five Days and won at Custoza and Novara.", 2],
        ["Agree: Austria restored the dukes and besieged Venice into surrender.", 2],
        ["Disagree: divisions among Italians (republicans v Charles Albert; the pope and Naples withdrew).", 2],
        ["Disagree: French intervention in Rome; lack of peasant support.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Austrian military power was very important. Radetzky's army was driven out of Milan but survived in the Quadrilateral fortresses, and once reinforced it defeated Piedmont at Custoza in July 1848 and decisively at Novara in March 1849. Austria then restored the dukes of central Italy and besieged Venice until it surrendered in August 1849.\n\nHowever, the Italians' own weaknesses made Austria's task easier. The pope refused to fight Austria in April 1848 and the King of Naples recalled his troops, so Piedmont fought largely alone. Charles Albert distrusted the republicans of Milan and Venice, and they distrusted him. Peasants gained little and stayed out of the struggle. Austria did not destroy the Roman Republic; France did.\n\nOverall Austria's army was the main reason, because no Italian force could defeat it, but divisions among the Italians and French intervention meant that it never faced a united challenge, so the statement is largely but not wholly true.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Risorgimento", "The nineteenth-century movement for Italian national revival and unification.");
  b.card("DEFINITION", "Young Italy", "Mazzini's secret society (1831) working for a united Italian republic through popular risings.");
  b.card("DEFINITION", "Statuto", "The constitution granted by Charles Albert of Piedmont in March 1848; the only Italian constitution to survive 1849.");
  b.card("FACT", "When were the Five Days of Milan?", "18-22 March 1848, when Milan forced Radetzky's army to retreat.");
  b.card("FACT", "When was the Battle of Novara?", "23 March 1849: Austria crushed Piedmont and Charles Albert abdicated.");
  b.card("FACT", "Who ended the Roman Republic in 1849?", "French troops sent by Louis Napoleon, who restored the pope.");
  b.card("FACT", "Which Italian lands did Austria rule directly after 1815?", "Lombardy and Venetia.");
  b.card("CONCEPT", "Why did the pope's announcement of April 1848 matter?", "Pius IX refused to fight Catholic Austria, ending hopes of a papal-led Italy and weakening the war effort.");
  b.card("CONCEPT", "Why was Italy not unified in 1848-49?", "Austria's army, divisions among Italians, the pope's withdrawal, little peasant support and French intervention in Rome.");
});
