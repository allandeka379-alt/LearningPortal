// Slice W4b: Garibaldi and the completion of Italian unification (0470 Option A key question 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.italy.garibaldi-completion", { file: "italy/garibaldi-completion", keyPrefix: "italy.garibaldi-completion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where did Garibaldi and the Thousand land in Sicily in May 1860?",
    options: [
      ["Marsala", "Correct: they landed at Marsala, in western Sicily, on 11 May 1860."],
      ["Naples", "Naples is on the mainland; Garibaldi entered it in September."],
      ["Quarto", "Quarto, near Genoa, was where the expedition set sail."],
      ["Teano", "Teano was where Garibaldi met Victor Emmanuel in October."],
    ],
    answer: "A",
    explanation: "The Thousand landed at **Marsala** on 11 May 1860.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When was the Kingdom of Italy proclaimed?",
    options: [
      ["17 March 1861", "Correct: Victor Emmanuel II became King of Italy."],
      ["26 October 1860", "That was the meeting at Teano."],
      ["20 September 1870", "That was the day Italian troops entered Rome."],
      ["11 July 1859", "That was the armistice of Villafranca."],
    ],
    answer: "A",
    explanation: "The Kingdom of Italy was proclaimed on **17 March 1861**.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which city was Garibaldi born, the city that Cavour gave to France in 1860?",
    options: [
      ["Nice", "Correct: Nice was ceded to France with Savoy in 1860."],
      ["Genoa", "Genoa was the birthplace of Mazzini and stayed part of Piedmont."],
      ["Turin", "Turin was the capital of Piedmont."],
      ["Milan", "Milan was the capital of Lombardy."],
    ],
    answer: "A",
    explanation: "Garibaldi was born in **Nice**, which helps explain his anger with Cavour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did Italy gain Venetia in 1866?",
    options: [
      ["By allying with Prussia, which defeated Austria", "Correct: Austria handed Venetia to Napoleon III, who passed it to Italy."],
      ["By defeating the Austrian army at the Battle of Custoza", "Italy lost at Custoza in 1866."],
      ["Through Garibaldi's capture of Venice with his volunteers", "Garibaldi did not capture Venice."],
      ["By buying it from Austria with French loans", "Venetia was not bought."],
    ],
    answer: "A",
    explanation: "Venetia came through the **alliance with Prussia**, whose victory at Königgrätz decided the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why could Italian troops enter Rome in September 1870?",
    options: [
      ["France had withdrawn its garrison because of the Franco-Prussian War", "Correct: with French troops gone, Rome could be taken."],
      ["The pope invited Italy to make Rome its capital", "The pope opposed the loss of Rome."],
      ["Garibaldi had already defeated the French and papal troops at Mentana", "Garibaldi was defeated at Mentana in 1867."],
      ["Austria had given Rome to Italy in the peace of 1866", "Rome was never Austrian."],
    ],
    answer: "A",
    explanation: "The **Franco-Prussian War** forced France to withdraw its troops, leaving Rome undefended.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Cavour send the Piedmontese army into the Papal States in September 1860?",
    options: [
      ["To stop Garibaldi marching on Rome and to keep the south under the king", "Correct: an attack on Rome risked war with France."],
      ["To capture Rome and make it the capital of Piedmont immediately", "The army deliberately avoided Rome."],
      ["To help the pope defeat Garibaldi's volunteers in Sicily", "Piedmont defeated the papal army at Castelfidardo."],
      ["Because Austria had invaded Piedmont again that summer", "There was no Austrian invasion in 1860."],
    ],
    hints: ["What did Cavour fear Garibaldi would do next?"],
    answer: "A",
    explanation: "Cavour moved to **head off an attack on Rome** and keep control of the south in the king's hands.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened at the meeting near Teano on 26 October 1860?",
    options: [
      ["Garibaldi hailed Victor Emmanuel as King of Italy and handed over the south", "Correct: he then retired to Caprera."],
      ["Victor Emmanuel and Napoleon III signed a new military alliance against Austria", "That was at Plombières (1858) and the treaty of 1859."],
      ["Garibaldi was arrested on Cavour's orders and sent into exile", "Garibaldi was not arrested at Teano."],
      ["Cavour and Garibaldi agreed to attack Rome together in 1861", "Cavour opposed an attack on Rome."],
    ],
    hints: ["It was a meeting between Garibaldi and the king."],
    answer: "A",
    explanation: "At **Teano** Garibaldi handed his conquests to Victor Emmanuel II.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Garibaldi's success in 1860 depended on circumstances as well as on his leadership?",
    options: [
      ["The Bourbon army was poorly led and demoralised, and Sicily had already risen", "Correct: these conditions made a small force effective."],
      ["Garibaldi had learned the methods of guerrilla warfare during his years in South America", "This supports the importance of his own leadership, not circumstances."],
      ["Garibaldi's volunteers wore red shirts", "This is a detail of appearance, not an explanation."],
      ["Garibaldi refused all rewards after handing over the south", "This concerns his character after the campaign, not why it succeeded."],
    ],
    hints: ["Look for a factor outside Garibaldi's control."],
    answer: "A",
    explanation: "The **Sicilian rising** and the **weak Bourbon army** were circumstances Garibaldi exploited.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Garibaldi refused rewards after handing over his conquests and retired to Caprera.",
    answer: true,
    explanation: "True. He retired to his island home of Caprera in November 1860.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Garibaldi's attack on Rome in 1867 succeeded, and Rome became the capital of Italy that year.",
    answer: false,
    explanation: "False. French and papal troops defeated him at Mentana in 1867. Rome was taken in 1870 and became the capital in 1871.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its year.",
    pairs: [
      ["Expedition of the Thousand", "1860"],
      ["Garibaldi wounded at Aspromonte", "1862"],
      ["Italy gains Venetia", "1866"],
      ["Italian troops enter Rome", "1870"],
    ],
    explanation: "1860 the Thousand; 1862 Aspromonte; 1866 Venetia; 1870 Rome.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Garibaldi enters Naples",
      "Battle of Calatafimi",
      "Meeting near Teano",
      "Proclamation of the Kingdom of Italy",
    ],
    right: POS,
    rightIndex: [1, 0, 2, 3],
    hints: ["Garibaldi fought in Sicily before he reached the mainland."],
    explanation: "Calatafimi (May 1860); Naples (September 1860); Teano (October 1860); Kingdom of Italy (March 1861).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In 1860 the Kingdom of the Two Sicilies was ruled by the {{blank:a}} dynasty. Its king, Francis II, left Naples shortly before Garibaldi entered the city in {{blank:b}} of that year.",
    blanks: [
      { id: "a", accepted: ["Bourbon"], choices: ["Bourbon", "Savoy", "Habsburg", "Bonaparte"] },
      { id: "b", accepted: ["September"], choices: ["May", "July", "September", "November"] },
    ],
    explanation: "The **Bourbon** king left, and Garibaldi entered Naples in **September** 1860 (on the 7th).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the river where Garibaldi defeated the Bourbon army in early October 1860.",
    accepted: ["Volturno", "the Volturno", "Volturno River", "River Volturno"],
    wrong: ["Tiber"],
    explanation: "The battle of the **Volturno** (1-2 October 1860) was Garibaldi's largest battle.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe Garibaldi's campaign in Sicily and southern Italy in 1860.",
    points: [
      "Sailed with the Thousand from near Genoa; landed at Marsala (May 1860) to support a Sicilian rising.",
      "Won at Calatafimi and took Palermo; ruled Sicily as dictator in Victor Emmanuel's name.",
      "Crossed to the mainland (August) and entered Naples (7 September).",
      "Won the battle of the Volturno (October); plebiscites; handed over at Teano.",
    ],
    modelAnswer: "Garibaldi sailed with about a thousand volunteers from near Genoa and landed at Marsala in May 1860 to support a rising in Sicily. He won at Calatafimi, captured Palermo and ruled Sicily as dictator in the name of Victor Emmanuel. In August he crossed to the mainland, the Bourbon army collapsed, and he entered Naples on 7 September. He defeated the Bourbon forces on the Volturno in October, and after plebiscites he handed the south to the king at Teano.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Cavour was worried by Garibaldi's success in 1860.",
    points: [
      "Identifies fear that Garibaldi would attack Rome.",
      "Explains that Rome was protected by French troops, so this risked war with France (and Austria).",
      "Identifies fear that the democrats/republicans would control the south.",
      "Explains that this could challenge the king's leadership / Cavour's moderate Italy.",
    ],
    hints: ["Think about France and about who would rule the south."],
    modelAnswer: "Cavour feared that Garibaldi, after taking Naples, would march on Rome. Rome was protected by French troops, so an attack could bring war with France, Piedmont's ally, and perhaps Austria as well. He also feared that Garibaldi and the democrats would control the south and set up a government that challenged the king, threatening the moderate, monarchist Italy that Cavour wanted.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why other European countries were important to the completion of Italian unification between 1860 and 1870.",
    points: [
      "Identifies Prussia's role in 1866.",
      "Explains that Prussia's victory at Königgrätz, not Italian arms, won Venetia.",
      "Identifies France's role over Rome.",
      "Explains that French troops protected the pope (Mentana 1867) until withdrawn in 1870 during the Franco-Prussian War.",
      "Identifies Britain's / France's acceptance of change in 1860.",
      "Explains that Britain supported Italians' right to choose and did not interfere with Garibaldi; Napoleon accepted the invasion of the Papal States.",
    ],
    hints: ["Consider each of Prussia, France and Britain."],
    modelAnswer: "Prussia was decisive in 1866: Italy was defeated at Custoza and Lissa, but Prussia's victory over Austria at Königgrätz forced Austria to give up Venetia. France blocked the way to Rome: its troops protected the pope and defeated Garibaldi at Mentana in 1867, and Rome could only be taken in 1870 when France withdrew its garrison to fight Prussia. Britain also helped in 1860 by supporting the Italians' right to choose their own government and not interfering with Garibaldi, while Napoleon III accepted Piedmont's invasion of the Papal States.",
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a memoir by a fictional volunteer of the Thousand, written in 1890", "We were students, workers and adventurers, armed with old muskets. At Calatafimi the enemy held the hill and we had no right to win. But the General walked up the slope as if on parade, and we followed him. He did not ask for anything for himself. Italy was made by men who believed in him.")}\n\n${source("Source B", "an article by a fictional Piedmontese official in a Turin journal, written in 1861", "The romantic tale of the Thousand should not blind us. The Bourbon army was rotten before a single shot was fired. Without the King's regiments, which secured the Marches and Umbria and kept the French from interfering, Garibaldi's conquests would have ended in disaster or in war with France.")}`,
    hints: ["Each writer has a reason to give credit to a different person or institution."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you infer from Source A about why Garibaldi's volunteers were successful?", points: [
        "Garibaldi's personal courage / leadership inspired them.",
        "The volunteers' belief / commitment despite poor weapons.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about the importance of Garibaldi?", points: [
        "A: Garibaldi's leadership made Italy ('Italy was made by men who believed in him').",
        "B: Garibaldi's success owed much to Bourbon weakness and the king's army.",
        "Agreement: neither denies that the Thousand won battles / both accept the conquest took place.",
        "Judgement: they disagree strongly about who deserves the credit.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "Which source is more reliable as evidence about the events of 1860? Use the sources and your own knowledge.", points: [
        "A: a participant, but written thirty years later as a memoir, admiring and nostalgic.",
        "A content: Calatafimi was a hard-won victory; Garibaldi refused rewards (confirmed).",
        "B: written in 1861 by an official of the Piedmontese state, which wanted the credit for the king.",
        "B content: the Bourbon army was weak; the Piedmontese occupied the Marches and Umbria (confirmed).",
        "Both one-sided; B omits the Sicilian rising and the victories Garibaldi won.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is by a volunteer who fought at Calatafimi, so he saw events at first hand, but he wrote thirty years later in a memoir full of admiration, so his memory may be coloured by legend. Some details are confirmed: Calatafimi was a hard-won victory against a strong position, and Garibaldi did refuse rewards. Source B was written in 1861 by a Piedmontese official, whose state wanted the credit for unification to go to the king; it plays down Garibaldi's victories and ignores the Sicilian rising. Yet its main points are also confirmed: the Bourbon army was poorly led, and the king's army did occupy the Marches and Umbria. Both are one-sided, but B is slightly more reliable for the wider events because its claims can be checked, while A is more useful for the spirit of the volunteers.", explanation: "Reliability judged from provenance and from content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare Garibaldi with Cavour, Victor Emmanuel and foreign powers, and treat 1860 and 1866-70 separately."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how Rome became part of Italy.", points: [
        "French troops protected the pope after 1849; the Roman Question after 1861.",
        "Garibaldi's failed attempts: Aspromonte (1862), Mentana (1867).",
        "France withdrew its garrison in 1870 because of the Franco-Prussian War.",
        "Italian troops entered Rome on 20 September 1870; plebiscite; capital from 1871.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: X, stem: "How important was Garibaldi's contribution to Italian unification? Explain your answer.", points: [
        ["Important: conquered Sicily and Naples (1860) and handed them to Victor Emmanuel at Teano.", 3],
        ["Important: inspired support; defence of Rome 1849; volunteers in 1859.", 2],
        ["Less important: depended on the Sicilian rising, a weak Bourbon army and Cavour's tolerance; Piedmontese army secured the centre.", 3],
        ["Less important: failed over Rome (1862, 1867); Venetia and Rome won through Prussia's wars.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Garibaldi made a vital contribution. In 1860 he conquered Sicily and Naples with a small volunteer force, something no one else attempted, and at Teano he handed them to Victor Emmanuel, turning Cavour's northern kingdom into the Kingdom of Italy. His defence of Rome in 1849 and his fame made him a symbol that won support for unification in Italy and abroad.\n\nHowever, his success depended on others. The Sicilians had already risen, the Bourbon army was poorly led, and Cavour allowed the expedition to sail. It was the Piedmontese army that occupied the Marches and Umbria and made sure the south joined the kingdom. After 1861 Garibaldi's own attempts to take Rome failed at Aspromonte and Mentana; Venetia was won in 1866 and Rome in 1870 because Prussia defeated Austria and France.\n\nOverall Garibaldi was essential to the events of 1860, and without him the south might not have joined Italy for many years, but unification as a whole depended more on Piedmont's state and on the wars of other powers.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "The Thousand", "The volunteers, about a thousand strong, who sailed with Garibaldi to Sicily in May 1860.");
  b.card("FACT", "When did Garibaldi enter Naples?", "7 September 1860.");
  b.card("FACT", "What happened at Teano on 26 October 1860?", "Garibaldi met Victor Emmanuel II, hailed him as King of Italy and handed over the south.");
  b.card("FACT", "When was the Kingdom of Italy proclaimed?", "17 March 1861.");
  b.card("FACT", "How and when did Italy gain Venetia?", "1866, through alliance with Prussia, which defeated Austria.");
  b.card("FACT", "When did Italian troops enter Rome?", "20 September 1870, after France withdrew its garrison.");
  b.card("DEFINITION", "Roman Question", "The problem of how Italy could gain Rome while the pope ruled it under French protection (1861-1870).");
  b.card("FACT", "Where was Garibaldi defeated in his attempts on Rome?", "Aspromonte (1862, by Italian troops) and Mentana (1867, by French and papal troops).");
  b.card("CONCEPT", "Why did Garibaldi's expedition of 1860 succeed?", "Sicilian support, a weak and demoralised Bourbon army, Garibaldi's leadership, and no foreign intervention.");
});
