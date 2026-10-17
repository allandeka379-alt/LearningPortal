// W3b: ahist.germany.unification-1871 (Both boards; Cambridge key question 2.4; ZIMSEC unification of Germany).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.germany.unification-1871", { file: "germany/unification-1871", keyPrefix: "germany.unification-1871" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where was the German Empire proclaimed on 18 January 1871?",
    options: [
      ["In the Hall of Mirrors at the royal palace of Versailles", "Correct: the proclamation took place in the French king's palace."],
      ["In St Paul's Church in Frankfurt, seat of the Parliament of 1848", "St Paul's was the seat of the Parliament of 1848."],
      ["In the royal palace in Berlin, the Prussian capital", "The proclamation took place in France."],
      ["In the cathedral at Aachen, where emperors were crowned", "Aachen has no connection with the proclamation."],
    ],
    answer: "A",
    explanation: "Wilhelm I was proclaimed German Emperor at Versailles on 18 January 1871, while German troops were besieging Paris.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which battle of September 1870 led to the surrender of Napoleon III?",
    options: [
      ["Sedan, in north-eastern France", "Correct: the French army and the emperor surrendered there."],
      ["Königgrätz, fought in Bohemia in 1866", "This was the battle that Prussia won against Austria in 1866."],
      ["Waterloo, fought in Belgium", "This was fought in 1815 against Napoleon I."],
      ["Düppel, fought in Schleswig", "This was fought against Denmark in 1864."],
    ],
    answer: "A",
    explanation: "At Sedan on 1-2 September 1870 the French army was surrounded and Napoleon III surrendered with about 100,000 men.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the Zollparlament of 1867 and the elections to it in 1868 show?",
    options: [
      ["Particularism was still strong in Bavaria and the other southern states", "Correct: anti-Prussian parties did well in Bavaria and Württemberg."],
      ["The southern states were eager to join the North German Confederation at once", "The elections showed the opposite."],
      ["Austria had regained its leadership in the southern states", "Austria had lost its place in Germany in 1866."],
      ["The Zollverein had ended because of quarrels over tariffs", "The Zollverein continued."],
    ],
    answer: "A",
    hints: ["Think of how the south voted."],
    explanation: "The Customs Parliament was meant to build unity, but the southern elections returned many opponents of Prussia, so peaceful unification looked unlikely.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the outcome of the Luxemburg crisis of 1867?",
    options: [
      ["Luxemburg was neutralised and the Prussian garrison left", "Correct: the London Conference of May 1867 settled it."],
      ["Luxemburg was sold to France and became a French province", "The sale did not take place."],
      ["Luxemburg was taken into the North German Confederation", "Luxemburg was neutralised, not annexed."],
      ["Luxemburg was occupied by Prussia after a short war with France", "No war was fought over Luxemburg."],
    ],
    answer: "A",
    hints: ["Think of the conference held in London."],
    explanation: "Napoleon III's attempt to buy Luxemburg from the Dutch king provoked German anger, and a conference at London in May 1867 neutralised the duchy.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did Bismarck change the Ems Telegram?",
    options: [
      ["He cut it so that it seemed the king had rudely dismissed the ambassador", "Correct: the edit made the meeting look like an insult."],
      ["He added a threat of war that the king had never spoken or written himself", "He cut the text and did not add any threat."],
      ["He destroyed it and told the press that no meeting had taken place", "He published it, in a shortened form."],
      ["He sent it to Spain so that Leopold would accept the Spanish throne", "It was about the meeting at Ems, not about Spain's offer."],
    ],
    answer: "A",
    hints: ["Think of what shortening can do to the tone of a message."],
    explanation: "Bismarck removed words from the telegram, so that it appeared that the king had refused to receive the ambassador, which angered both French and German opinion.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the south German states join Prussia in the war against France in 1870?",
    options: [
      ["They were bound by their alliances and offended by the French threat", "Correct: the war produced a patriotic response."],
      ["They had been conquered by the Prussian army in the Seven Weeks' War", "They were not conquered in 1866."],
      ["They wanted to restore the Confederation under Austrian leadership", "Austria played no part."],
      ["They had been promised Alsace and Lorraine before the war began", "The annexation was decided later, during the war."],
    ],
    answer: "A",
    hints: ["Think of the secret treaties of 1866 and national feeling in July 1870."],
    explanation: "The secret alliances of 1866 and anger at France's behaviour brought the southern armies into the war, and their cooperation led to their entry into the empire.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about Bismarck's role in the origins of the war of 1870 is best supported by the evidence?",
    options: [
      ["He encouraged the candidature and edited the telegram, but France chose war", "Correct: both Bismarck's actions and French decisions mattered."],
      ["He had no part in the Hohenzollern affair, a purely Spanish concern", "He encouraged Leopold to accept."],
      ["He forced France to declare war by invading its territory early in July 1870", "France declared war."],
      ["He tried to prevent the war by asking Leopold to withdraw in July 1870", "Leopold's father withdrew under French pressure."],
    ],
    answer: "A",
    hints: ["Weigh Bismarck's actions against the French response."],
    explanation: "Bismarck encouraged the candidature and edited the telegram, but Leopold withdrew on 12 July and France decided to demand more and to declare war on 19 July.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which feature of the 1871 constitution most clearly shows Prussian dominance?",
    options: [
      ["Prussia held enough votes to block constitutional change in the Bundesrat", "Correct: Prussia held enough votes to prevent amendment."],
      ["The Reichstag could dismiss the Chancellor by a vote of no confidence in him", "The Chancellor answered to the Emperor, not the Reichstag."],
      ["The south German states kept control of the army of the Empire", "The Emperor, the King of Prussia, controlled the army."],
      ["The Emperor was chosen by a vote of all the people", "The title belonged to the King of Prussia."],
    ],
    answer: "A",
    hints: ["Think of the Bundesrat and the Emperor."],
    explanation: "Prussia held 17 of the 58 Bundesrat votes, enough to block constitutional amendments, and the Prussian king was Emperor, commanded the army and appointed the Chancellor.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "France declared war on Prussia on 19 July 1870.",
    answer: true,
    explanation: "True. France declared war, which allowed Bismarck to present Germany as the victim of aggression.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "By the Treaty of Frankfurt (1871) France gained territory in Germany and received an indemnity.",
    answer: false,
    explanation: "False. France lost Alsace and part of Lorraine and had to pay an indemnity of five billion francs.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree that Bismarck planned from 1866 to provoke a war with France in order to unite the south German states.",
    answer: false,
    hints: ["Remember that historians disagree about how far he planned."],
    explanation: "False. Some historians argue that he engineered the war, others that he took opportunities as they came and that French decisions were crucial.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1866-71.",
    pairs: [
      ["Napoleon III", "French emperor who surrendered at Sedan"],
      ["Prince Leopold", "Hohenzollern candidate for the Spanish throne"],
      ["Benedetti", "French ambassador who met the king at Ems"],
      ["Wilhelm I", "King of Prussia proclaimed German Emperor"],
    ],
    explanation: "These four people occur in every answer on 1870-71.",
  });
  {
    const events = [
      "The Luxemburg crisis is settled at London",
      "The Ems Telegram is published",
      "The battle of Sedan",
      "The Treaty of Frankfurt is signed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1867, July 1870, September 1870 and May 1871."],
      explanation: "May 1867; 13 July 1870; 1-2 September 1870; 10 May 1871.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German Empire was proclaimed at {{blank:a}} on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Versailles"], choices: ["Versailles", "Frankfurt", "Berlin", "Vienna"] },
      { id: "b", accepted: ["18 January 1871"], choices: ["3 July 1866", "13 July 1870", "18 January 1871", "10 May 1871"] },
    ],
    explanation: "The proclamation took place at Versailles on 18 January 1871.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which French emperor declared war on Prussia in 1870? Give his name.",
    accepted: ["Napoleon III", "Napoleon the Third", "Louis Napoleon", "Louis-Napoleon", "Napoleon 3"],
    wrong: ["Napoleon I"],
    explanation: "**Napoleon III**, nephew of Napoleon Bonaparte.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the terms of the Treaty of Frankfurt (1871).",
    points: ["France gave up Alsace and part of Lorraine to Germany", "France paid an indemnity of five billion francs", "German troops remained in France until the indemnity was paid", "The loss of territory caused lasting bitterness in France"],
    modelAnswer: "France gave up Alsace and part of Lorraine to Germany. France paid an indemnity of five billion francs, and German troops remained in France until it was paid. The loss of territory caused lasting bitterness in France.",
    explanation: "One mark for each term described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Hohenzollern candidature led to war between France and Prussia in 1870.",
    points: [["France feared being surrounded by Hohenzollern rulers on two frontiers, and Gramont and Napoleon III wished to gain prestige", 2], ["After Leopold withdrew, France demanded a guarantee from the king and Bismarck's edited Ems Telegram made the demand look like an insult, so both sides were angry", 2]],
    hints: ["Think of French fears and the telegram."],
    modelAnswer: "France feared being surrounded by Hohenzollern rulers on two frontiers, and Napoleon III and Gramont wished to gain prestige. After Leopold withdrew, France demanded a guarantee from the king, and Bismarck's edited Ems Telegram made the exchange look like an insult, so both sides were angry and France declared war.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Prussian army won the Franco-Prussian War so quickly.",
    points: [["Better organisation, railways and Moltke's planning allowed rapid mobilisation, while Krupp artillery was superior", 2], ["France was isolated and its army was slower to mobilise and badly led, and the south German states fought on the Prussian side", 2]],
    hints: ["Think of both armies and of allies."],
    modelAnswer: "Better organisation, railways and Moltke's planning allowed Prussia to mobilise quickly, and its Krupp artillery was superior. France was isolated, its army was slower to mobilise and badly led, and the south German states fought on the Prussian side.",
    explanation: "One mark for each reason and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an editorial in a fictional Bavarian newspaper, March 1869",
        "We have no wish to be ruled from Berlin. Our king, our church and our customs are Bavarian. Let us trade with the north, but let us not give our sons to the Prussian army or our taxes to the Prussian treasury."),
      "",
      source("Source B", "a letter from a fictional Bavarian lieutenant to his family, August 1870",
        "The whole country has risen against the French. Men from Bavaria, Baden and Prussia march side by side, and no one asks any more whether he is a Prussian or a Bavarian. It is a strange thing to feel that one belongs to a nation larger than one's own kingdom."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about attitudes in Bavaria in 1869?", points: ["Opposition to rule from Berlin / loyalty to Bavarian king, church and customs", "Willingness to trade with the north but not to give soldiers or taxes"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of Bavarian attitudes to unification.", points: [["Differ: A shows particularism and opposition to Prussia in 1869, B shows enthusiasm for cooperation in 1870", 2], ["Agree: both show attachment to a Bavarian identity, though B suggests this is combined with a wider German feeling", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the creation of the German Empire?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is an editorial in a newspaper, so it reflects a political view and a readership, but it fits the Zollparlament elections of 1868", 2], ["B is a private letter by a soldier written in the first weeks of war, so it is honest about his feelings but may reflect the excitement of the moment and one man's experience", 2], ["Own knowledge: the war against France, the alliances of 1866 and the treaties of November 1870 explain the change, but the sources do not mention Bismarck's methods or the opinion of the rulers", 2]], modelAnswer: "Source A is useful because it shows the strength of particularism in Bavaria, which agrees with the results of the Zollparlament elections. As an editorial, it expresses an opinion and a readership. Source B is useful because it is a private letter from a soldier who had no reason to deceive his family, and it shows how the war changed feeling. However, it records the excitement of the moment and one man's view. My own knowledge confirms that the alliances of 1866 and the common cause against France brought the south into the Empire. Neither source mentions Bismarck, the rulers or the treaties, so they are useful on opinion but incomplete as an explanation of unification." }),
    ],
    hints: ["For (c), consider the type of source, the date and what is missing."],
    explanation: "Both sources are invented: a newspaper editorial and a soldier's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent was German unification in 1871 the result of Bismarck's planning?",
    levels: levels(8),
    points: [
      ["For planning: Bismarck's diplomacy, isolation of France, the Hohenzollern candidature and the Ems Telegram", 2],
      ["Against: he used opportunities (Luxemburg, Spain, French errors), and nationalism, the Zollverein, Prussian military power and French decisions mattered", 2],
      ["Links between factors, for example how war united the south", 2],
      ["Judgement with a reason: planner, opportunist or something between", 2],
    ],
    hints: ["Weigh Bismarck's actions against other causes."],
    modelAnswer: "Bismarck's actions were important, but unification was not simply the result of a plan. He isolated France diplomatically, encouraged the Hohenzollern candidature and edited the Ems Telegram, which suggests that he wanted war. But he did not create the conditions: French fears of Prussia, Napoleon III's need for prestige, the strength of the Prussian army, German nationalism and the Zollverein all contributed, and the Luxemburg crisis and Spanish affair were opportunities that he used. French leaders also chose to demand more after Leopold withdrew. I conclude that Bismarck was a skilful opportunist who shaped events more than he planned them, so the claim is only partly true.",
    explanation: "Credit developed factors, links between them and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Zollparlament?", "The Customs Parliament of 1867 in which the south German states sent deputies to a common body with the North German Confederation.");
  b.card("DEFINITION", "What was the Ems Telegram?", "A report of 13 July 1870 of the king's meeting with the French ambassador, which Bismarck edited to look like an insult.");
  b.card("FACT", "When and where was the German Empire proclaimed?", "18 January 1871 in the Hall of Mirrors at Versailles; Wilhelm I became German Emperor.");
  b.card("FACT", "What happened at Sedan?", "On 1-2 September 1870 the main French army and Napoleon III surrendered; the Second Empire fell on 4 September.");
  b.card("FACT", "What were the terms of the Treaty of Frankfurt (10 May 1871)?", "France gave up Alsace and part of Lorraine and paid five billion francs in indemnity.");
  b.card("FACT", "How was the Luxemburg crisis of 1867 settled?", "By the London Conference of May 1867, which neutralised Luxemburg; the Prussian garrison left.");
  b.card("CONCEPT", "Why was Bismarck in a strong position in 1870?", "France had no allies, its army was weaker and worse led, and the Prussian army and railways were ready.");
  b.card("CONCEPT", "How did the 1871 constitution preserve Prussian dominance?", "The Emperor was the King of Prussia, controlled the army and appointed the Chancellor; Prussia could block change in the Bundesrat.");
  b.card("CONCEPT", "Did Bismarck plan the war of 1870?", "Historians disagree: he encouraged the candidature and edited the telegram, but France chose to demand more and declare war.");
});
