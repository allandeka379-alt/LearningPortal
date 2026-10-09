// Slice W4a: German nationalism, the Zollverein and 1848-50 (0470 Option A key question 3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.german-unification.before-1851", { file: "german-unification/before-1851", keyPrefix: "german-unification.before-1851" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which state led the Zollverein, the German customs union of 1834?",
    options: [
      ["Prussia", "Correct: it grew out of Prussia's own customs system of 1818."],
      ["Austria", "Austria stayed outside the Zollverein."],
      ["Bavaria", "Bavaria joined, but it did not lead the union."],
      ["Hanover", "Hanover did not join until the 1850s."],
    ],
    answer: "A",
    explanation: "The **Zollverein** was led by **Prussia**; Austria was excluded.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which state held the presidency of the German Confederation set up in 1815?",
    options: [
      ["Austria", "Correct: Austria chaired the Diet at Frankfurt."],
      ["Prussia", "Prussia was the second power, not the president."],
      ["France", "France was not part of the Confederation."],
      ["Saxony", "Saxony was a medium-sized member state."],
    ],
    answer: "A",
    explanation: "**Austria** chaired the Diet of the German Confederation, which met in Frankfurt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did supporters of a 'Little Germany' (Kleindeutschland) want?",
    options: [
      ["A united Germany without Austria, led by Prussia", "Correct: this was the solution the Frankfurt Parliament chose in 1849."],
      ["A united Germany including Austria's German lands", "This was 'Greater Germany' (Grossdeutschland)."],
      ["The return of the old Holy Roman Empire", "Neither group wanted this."],
      ["A Germany of small states with no central government", "This describes the Confederation they wanted to replace."],
    ],
    answer: "A",
    explanation: "**Kleindeutschland** meant a Germany without Austria, which in practice meant Prussian leadership.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who refused the crown of a united Germany offered by the Frankfurt Parliament in 1849?",
    options: [
      ["Frederick William IV of Prussia", "Correct: he refused in April 1849."],
      ["Wilhelm I of Prussia", "Wilhelm became king in 1861 and Emperor in 1871."],
      ["Emperor Franz Joseph I of Austria", "The parliament did not offer the crown to the Austrian emperor."],
      ["Napoleon III of France", "He was ruler of France, not a German prince."],
    ],
    answer: "A",
    explanation: "**Frederick William IV** refused a crown offered by an elected assembly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group provided most of the members of the Frankfurt Parliament?",
    options: [
      ["Middle-class men such as lawyers and professors", "Correct: it was often called a 'parliament of professors'."],
      ["Peasants elected by their villages", "Very few peasants sat in the parliament."],
      ["Factory workers from the fast-growing industrial towns", "Workers were hardly represented."],
      ["Army officers appointed by the princes", "Members were elected, not appointed."],
    ],
    answer: "A",
    explanation: "Most members were **educated middle-class** men, which helps explain why it had little support among the masses.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these best explains why the Frankfurt Parliament could not enforce its decisions?",
    options: [
      ["It had no army or taxes and relied on the princes", "Correct: shown when it had to accept the Schleswig-Holstein armistice."],
      ["It was dissolved by Bismarck soon after it met", "Bismarck did not come to power until 1862."],
      ["Its members were all appointed by Austria", "Members were elected across the Confederation."],
      ["It refused to write any constitution for Germany", "It did write a constitution in 1849."],
    ],
    answer: "A",
    hints: ["What does a government need in order to make people obey it?"],
    explanation: "Without **an army or taxes**, the parliament depended on Prussia and Austria to carry out its wishes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened at Olmütz in November 1850?",
    options: [
      ["Prussia gave up its plan for a union it would lead", "Correct: Austria, backed by Russia, forced Prussia to back down."],
      ["Austria joined the Zollverein for the first time", "Austria never joined the Zollverein."],
      ["The Frankfurt Parliament opened in St Paul's Church", "The parliament opened in May 1848."],
      ["Prussia defeated Austria in a short war", "Prussia defeated Austria in 1866, not 1850."],
    ],
    answer: "A",
    hints: ["Olmütz was a diplomatic defeat, not a battle."],
    explanation: "At **Olmütz** Prussia abandoned the Erfurt Union, and the old Confederation was restored in 1851.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why was Austria's exclusion from the Zollverein politically important?",
    options: [
      ["Smaller states grew used to economic links with Prussia instead", "Correct: Prussia gained economic leadership in Germany."],
      ["It meant that Austria lost all of its German-speaking lands at once", "Austria kept them until 1866 and beyond."],
      ["It forced Austria to leave the German Confederation", "Austria stayed in the Confederation until 1866."],
      ["It made Austria an ally of the German nationalists", "Austria's leaders opposed nationalism."],
    ],
    answer: "A",
    hints: ["Think about whose economy the other German states depended on."],
    explanation: "The Zollverein tied the trade of most German states to **Prussia**, giving it an advantage over Austria.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The German Confederation of 1815 had an elected parliament chosen by the German people.",
    answer: false,
    explanation: "False. Its Diet was a meeting of ambassadors sent by the rulers of the member states.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "After the Berlin revolution of March 1848, Frederick William IV later regained control and imposed his own constitution.",
    answer: true,
    explanation: "True. The army returned to Berlin in November 1848, and the king imposed a constitution in December 1848.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Zollverein", "A customs union led by Prussia"],
      ["Carlsbad Decrees", "Censorship and control of universities (1819)"],
      ["Grossdeutschland", "A united Germany including Austria's German lands"],
      ["Olmütz", "The agreement by which Prussia backed down (1850)"],
    ],
    explanation: "Zollverein (1834), Carlsbad Decrees (1819), Grossdeutschland ('Greater Germany'), Olmütz (1850).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Frederick William IV refuses the imperial crown",
      "The Zollverein comes into force",
      "The agreement of Olmütz",
      "The Frankfurt Parliament opens",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The customs union came long before the revolutions."],
    explanation: "Zollverein (1834); Frankfurt Parliament opens (May 1848); crown refused (April 1849); Olmütz (November 1850).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German Confederation was created by the Congress of {{blank:a}} in 1815. Its Diet met in the city of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Vienna"], choices: ["Vienna", "Berlin", "Paris", "Frankfurt"] },
      { id: "b", accepted: ["Frankfurt"], choices: ["Frankfurt", "Berlin", "Vienna", "Munich"] },
    ],
    explanation: "The **Congress of Vienna** created the Confederation; its Diet met at **Frankfurt**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Austrian chancellor who saw German nationalism as a threat to the Austrian Empire before 1848.",
    accepted: ["Metternich", "Prince Metternich", "Klemens von Metternich", "Clemens von Metternich", "Klemens Metternich"],
    wrong: ["Schwarzenberg"],
    explanation: "**Metternich** dominated Austrian policy from 1815 until he fell in March 1848.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the Zollverein.",
    points: [
      "A customs union that came into force in 1834.",
      "Led by Prussia; grew out of Prussia's customs system of 1818.",
      "Members removed customs duties on trade between them / charged a common tariff on imports.",
      "Included most German states by the 1840s but not Austria.",
    ],
    modelAnswer: "The Zollverein was a customs union that came into force in 1834. It was led by Prussia and grew out of the single customs system Prussia had set up for its own lands in 1818. Its members abolished customs duties on trade between them and charged a common tariff on goods from outside. By the 1840s it included most German states, but Austria was not a member.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Frederick William IV refused the crown offered by the Frankfurt Parliament.",
    points: [
      "Identifies his belief in the divine right of kings / he would not accept a crown from an elected assembly.",
      "Explains that accepting would make him dependent on a liberal parliament and its constitution.",
      "Identifies fear of Austria.",
      "Explains that taking the crown of a Germany without Austria risked war with Austria (and Russia).",
    ],
    hints: ["One reason is about his beliefs, another about foreign danger."],
    modelAnswer: "Frederick William IV believed that kings ruled by the grace of God, so he would not accept a crown from an elected assembly; doing so would have tied him to a liberal constitution and made him dependent on the parliament. He also feared Austria: taking the crown of a Germany that excluded Austria could have led to war with Austria, which had Russian support.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Germany was not unified in 1848-50.",
    points: [
      "Identifies the weakness of the Frankfurt Parliament.",
      "Explains that it had no army or taxes, so it had to accept Prussia's armistice with Denmark (1848).",
      "Identifies divisions among nationalists.",
      "Explains the Greater/Little Germany dispute and moderate liberals' fear of radicals, which wasted time.",
      "Identifies the recovery of the rulers / Austria.",
      "Explains that the Prussian and Austrian armies restored order, the crown was refused, and Austria forced Prussia to back down at Olmütz.",
    ],
    hints: ["Weakness, division and the strength of the old powers."],
    modelAnswer: "The Frankfurt Parliament was weak: it had no army and could not raise taxes, so when Prussia made an armistice with Denmark over Schleswig-Holstein in 1848 it had to accept it. Nationalists were divided, arguing for months over whether Austria should be included, while moderate liberals feared radical democrats. These delays gave the old rulers time to recover: by the end of 1848 the Austrian and Prussian armies had restored order, and in April 1849 Frederick William IV refused the crown. When Prussia tried its own union, Austria, backed by Russia, forced it to back down at Olmütz in 1850.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter by a fictional liberal lawyer from Baden, a member of the Frankfurt Parliament, to his brother, written in September 1848", "We debate the rights of every German for hours, and the speeches are noble. But when Prussia signed its armistice with the Danes without asking us, what could we do? We protested, and then we gave in. A parliament that cannot command a single regiment is a parliament of words. I fear the princes are only waiting for us to tire.")}\n\n${source("Source B", "an article in a fictional conservative Prussian newspaper, December 1848", "Order has returned to Berlin. His Majesty has graciously granted a constitution to his loyal people, which no assembly of agitators could have produced. The army has shown that Prussia does not need the professors of Frankfurt to tell it what Germany is.")}`,
    hints: ["Compare who wrote each source and what each wanted readers to believe."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the weaknesses of the Frankfurt Parliament?", points: [
        "It had no army / could not enforce decisions (the armistice).",
        "It spent too long debating / the princes were recovering.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the Frankfurt Parliament?", points: [
        "Agree: both see it as powerless compared with the army / Prussia.",
        "Agree: both suggest it was a body of talkers (speeches; 'professors').",
        "Disagree: A sympathises with its aims; B scorns it as agitators.",
        "Disagree: A fears the princes; B welcomes the king's restored power.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How reliable is Source B as evidence about events in Prussia in late 1848? Use the source and your own knowledge.", points: [
        "Provenance: conservative newspaper with a purpose of praising the king and attacking liberals.",
        "Language ('graciously', 'agitators') shows bias.",
        "Content checked: order was restored and the army returned to Berlin in November 1848 (accurate).",
        "Content checked: the king did impose a constitution in December 1848 (accurate).",
        "But it hides that the constitution was imposed after the assembly was dissolved / leaves out popular demands.",
        "Supported judgement on reliability for this purpose.",
      ], levels: levels(6), modelAnswer: "Source B comes from a conservative Prussian newspaper writing just after the king had regained control, so it was written to praise the king and the army and to mock the liberals; words such as 'graciously' and 'agitators' show its bias. Some of its facts are accurate: my own knowledge shows that the army returned to Berlin in November 1848 and that Frederick William IV imposed a constitution in December. However, it presents the constitution as a gift to a loyal people and hides the fact that it was imposed after the elected Prussian assembly had been dissolved. It is reliable about what happened, but not about how Prussians felt, because it shows only the conservative view.", explanation: "Reliability judged from provenance and from content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh the Zollverein against nationalism, Prussian power and Bismarck."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the work of the Frankfurt Parliament in 1848-49.", points: [
        "Opened in May 1848, elected from across the Confederation.",
        "Drew up a list of basic rights / a constitution for Germany.",
        "Debated Greater versus Little Germany; chose the Little German solution.",
        "Offered the crown to Frederick William IV (March-April 1849), who refused; it then collapsed.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How important was the Zollverein in the unification of Germany?", points: [
        ["Important: tied most German states' economies to Prussia and gave Prussia leadership", 2],
        ["Important: excluded Austria; industrial growth and railways gave Prussia the wealth for its army", 2],
        ["Less important: members still sided with Austria in 1866; economic links did not create loyalty", 2],
        ["Other factors: Prussian army reforms, Bismarck's diplomacy and wars, mistakes of Austria and France", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The Zollverein was important because it tied the trade of most German states to Prussia from 1834 onwards. Smaller states grew used to Prussian economic leadership, while Austria, which stayed outside, was left behind. Growing industry and railways within the customs union also gave Prussia the wealth and transport it later used to build a modern army.\n\nHowever, economic links did not create political loyalty. In 1866 most of the medium-sized German states, though members of the Zollverein, fought on Austria's side against Prussia. Unification came through Prussia's reformed army, Bismarck's diplomacy and three wars, helped by the mistakes of Austria and France.\n\nThe Zollverein was an important precondition, because it gave Prussia an economic advantage over Austria, but it was not the decisive factor. Without Prussian military power and Bismarck's actions in 1864-71, a customs union alone would not have produced a German Empire.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Zollverein", "The Prussian-led German customs union that came into force in 1834; Austria was not a member.");
  b.card("FACT", "How many states were in the German Confederation of 1815?", "39, with Austria holding the presidency of the Diet at Frankfurt.");
  b.card("DEFINITION", "Kleindeutschland", "'Little Germany': a united Germany without Austria, led by Prussia.");
  b.card("DEFINITION", "Grossdeutschland", "'Greater Germany': a united Germany including the German lands of the Austrian Empire.");
  b.card("FACT", "When did the Frankfurt Parliament open?", "18 May 1848.");
  b.card("FACT", "What did Frederick William IV do in April 1849?", "He refused the crown of a united Germany offered by the Frankfurt Parliament.");
  b.card("FACT", "What was agreed at Olmütz (November 1850)?", "Prussia abandoned its Erfurt Union under Austrian pressure; the Confederation was restored in 1851.");
  b.card("DEFINITION", "Carlsbad Decrees (1819)", "Measures of the Confederation that censored the press, supervised universities and banned student societies.");
  b.card("CONCEPT", "Why did the Frankfurt Parliament fail?", "No army or taxes, divisions over Greater or Little Germany, the recovery of the princes, and the refusal of the crown.");
});
