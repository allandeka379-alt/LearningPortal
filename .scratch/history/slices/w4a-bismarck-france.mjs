// Slice W4a: Bismarck, France and the German Empire, 1866-1871 (0470 Option A key question 3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.german-unification.bismarck-france", { file: "german-unification/bismarck-france", keyPrefix: "german-unification.bismarck-france" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where was the German Empire proclaimed on 18 January 1871?",
    options: [
      ["The Hall of Mirrors at Versailles", "Correct: in the palace of the French kings, near Paris."],
      ["The royal palace in Berlin", "The proclamation took place in France, during the war."],
      ["St Paul's Church in Frankfurt", "This was where the 1848 parliament met."],
      ["The town hall in Munich", "Bavaria's king was not even present."],
    ],
    answer: "A",
    explanation: "Wilhelm I was proclaimed German Emperor in the **Hall of Mirrors at Versailles**.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which battle in September 1870 ended with the capture of Napoleon III?",
    options: [
      ["Sedan", "Correct: the French army surrendered there on 2 September 1870."],
      ["Königgrätz", "This was the Prussian victory over Austria in 1866."],
      ["Metz", "A French army was besieged at Metz, but Napoleon was captured at Sedan."],
      ["Custoza", "Austria defeated Italy here in 1866."],
    ],
    answer: "A",
    explanation: "Napoleon III surrendered with his army at **Sedan**, and a republic was proclaimed in Paris two days later.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did France object to Prince Leopold of Hohenzollern becoming King of Spain?",
    options: [
      ["It would place Prussian influence on two French borders", "Correct: France feared encirclement."],
      ["Leopold was a Catholic and Spain was Protestant", "Spain was Catholic, and so was Leopold."],
      ["Spain had promised its throne to Napoleon III's son", "There was no such promise."],
      ["Leopold had led the Prussian army against Austria", "He was not a commander in 1866."],
    ],
    answer: "A",
    explanation: "A Hohenzollern in Madrid would leave France **surrounded** by Prussian influence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Bismarck do to the Ems telegram before releasing it to the press?",
    options: [
      ["He shortened it so the king's refusal seemed an insult", "Correct: the courteous tone was removed."],
      ["He added a formal Prussian declaration of war on France", "France declared war, not Prussia."],
      ["He kept it secret until the war had been won", "He published it at once, on 13 July 1870."],
      ["He changed it to accept the French demands", "Wilhelm had refused the demand, and so did the edited text."],
    ],
    answer: "A",
    explanation: "Bismarck **edited** the report so that it read like a snub, provoking French outrage.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was it important to Bismarck that France, not Prussia, declared war in July 1870?",
    options: [
      ["The southern states' alliances applied only if Prussia was attacked", "Correct: and other powers would see France as the aggressor."],
      ["The Prussian constitution did not allow the king to declare war himself", "The king could declare war."],
      ["Britain had promised to fight whichever side attacked first", "Britain made no such promise."],
      ["Austria would otherwise have joined France in the war", "Austria-Hungary stayed out in any case."],
    ],
    hints: ["Look at the terms of the secret alliances of 1866."],
    answer: "A",
    explanation: "The **defensive alliances** of 1866 brought the southern states in only if Prussia was attacked.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which term was part of the Treaty of Frankfurt (1871)?",
    options: [
      ["France lost Alsace and much of Lorraine", "Correct: and paid 5 billion francs."],
      ["France lost all its colonies in Africa", "France kept its colonies."],
      ["Prussia returned Schleswig to Denmark", "This was not part of the treaty."],
      ["Luxembourg became part of the German Empire", "Luxembourg had been made neutral in 1867."],
    ],
    hints: ["The treaty dealt with French territory on the German border."],
    answer: "A",
    explanation: "France gave up **Alsace and much of Lorraine** and paid an indemnity of 5 billion francs.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What did the Luxembourg crisis of 1867 show?",
    options: [
      ["Napoleon III could not gain compensation for Prussia's rise", "Correct: the sale was blocked and Luxembourg neutralised."],
      ["Prussia wished to annex Luxembourg immediately", "Luxembourg was made neutral, not annexed."],
      ["Britain was ready to fight to support France", "Britain helped settle it at a conference."],
      ["The southern German states preferred France to Prussia by then", "French ambitions made them more wary of France."],
    ],
    hints: ["What did Napoleon III try to obtain, and did he get it?"],
    answer: "A",
    explanation: "Napoleon's attempt to buy Luxembourg failed, another **humiliation** that worsened Franco-Prussian relations.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement describes the 'opportunist' view of Bismarck held by some historians?",
    options: [
      ["He had clear aims but exploited chances he did not create", "Correct: such as the Spanish succession crisis."],
      ["He followed a detailed plan drawn up in 1862", "This is the 'master planner' view."],
      ["He wished to create a liberal, democratic Germany", "Bismarck was a Prussian conservative."],
      ["He opposed every war and was pushed into them by the generals", "Bismarck accepted war as a tool of policy."],
    ],
    hints: ["An opportunist takes advantage of events as they arise."],
    answer: "A",
    explanation: "The opportunist view says Bismarck had a goal, Prussian power, but **used circumstances** as they came.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "France declared war on Prussia in July 1870.",
    answer: true,
    explanation: "True. France declared war on 19 July 1870, after the publication of the Ems telegram.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Russia and Austria-Hungary both sent troops to help France in 1870.",
    answer: false,
    explanation: "False. No great power helped France: Russia and Austria-Hungary stayed neutral, as did Britain and Italy.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in the crisis and war with France.",
    pairs: [
      ["Benedetti", "French ambassador who met the king at Ems"],
      ["Leopold of Hohenzollern", "Prussian prince offered the Spanish throne"],
      ["Napoleon III", "French emperor captured at Sedan"],
      ["Ludwig II", "King of Bavaria who invited Wilhelm to become Emperor"],
    ],
    explanation: "Benedetti (ambassador at Ems), Leopold (Spanish candidature), Napoleon III (captured at Sedan), Ludwig II (Bavarian king).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Treaty of Frankfurt",
      "The Ems telegram is published",
      "Battle of Sedan",
      "German Empire proclaimed",
    ],
    right: POS,
    rightIndex: [3, 0, 1, 2],
    hints: ["The treaty came after the proclamation of the Empire."],
    explanation: "Ems telegram (July 1870); Sedan (September 1870); Empire proclaimed (January 1871); Treaty of Frankfurt (May 1871).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Under the Treaty of Frankfurt, France paid an indemnity of {{blank:a}}. In the new Empire, the post of Chancellor was held by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["5 billion francs"], choices: ["5 billion francs", "132 billion marks", "1 billion francs", "50 million francs"] },
      { id: "b", accepted: ["Bismarck"], choices: ["Bismarck", "Moltke", "Roon", "Wilhelm I"] },
    ],
    explanation: "France paid **5 billion francs**; **Bismarck** became imperial Chancellor (132 billion marks were the reparations of 1921).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the spa town where King Wilhelm met the French ambassador on 13 July 1870.",
    accepted: ["Ems", "Bad Ems"],
    wrong: ["Gastein"],
    explanation: "The meeting took place at **Ems**, hence the 'Ems telegram'.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the events of the Hohenzollern candidature crisis in July 1870.",
    points: [
      "Leopold's acceptance of the Spanish throne became public; France protested angrily.",
      "The candidature was withdrawn on 12 July.",
      "Benedetti demanded at Ems a promise it would never be renewed; Wilhelm politely refused.",
      "Bismarck edited and published the telegram; France declared war on 19 July.",
    ],
    modelAnswer: "In early July 1870 it became public that Prince Leopold of Hohenzollern had accepted the Spanish throne, and France protested furiously. The candidature was withdrawn on 12 July. On 13 July the French ambassador, Benedetti, met King Wilhelm at Ems and demanded a promise that it would never be renewed, which the king politely refused. Bismarck edited the king's report so that it sounded insulting and published it, and France declared war on 19 July.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the war with France brought the southern German states into a united Germany.",
    points: [
      "Identifies the alliances of 1866 / France appeared the aggressor.",
      "Explains that because France declared war, the southern states were bound to fight alongside Prussia.",
      "Identifies national feeling against France.",
      "Explains that shared victory and anti-French feeling made union acceptable; Bismarck then negotiated terms (e.g. Bavarian rights).",
    ],
    hints: ["Think about treaty obligations and public opinion."],
    modelAnswer: "The southern states had signed defensive alliances with Prussia in 1866, and because France declared war they were obliged to fight alongside Prussia. The war also stirred up German national feeling against France, so southern opinion, which had been suspicious of Prussia, now supported union. While the armies were winning, Bismarck negotiated with each state, giving Bavaria special rights, and they joined the new Empire in 1871.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Prussia and its German allies defeated France.",
    points: [
      "Identifies faster mobilisation.",
      "Explains that railways and Moltke's planning brought German armies to the frontier before France was ready.",
      "Identifies superior weapons / leadership.",
      "Explains that German artillery and generalship trapped French armies at Metz and Sedan.",
      "Identifies France's isolation.",
      "Explains that no great power helped France, so it fought alone after Sedan and the siege of Paris.",
    ],
    hints: ["Military reasons and diplomatic reasons."],
    modelAnswer: "The German armies mobilised faster: railways and Moltke's planning brought them to the frontier before the French were ready. German artillery was better, and good leadership allowed them to surround one French army at Metz and force another, with Napoleon III, to surrender at Sedan in September 1870. France was also isolated: Russia, Austria-Hungary, Italy and Britain stayed out, so the new republic had to fight alone, and Paris fell after a long siege in January 1871.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an editorial in a fictional Paris newspaper, 15 July 1870", "The King of Prussia has shown our ambassador the door like a servant. The insult is not to one man but to France. After Sadowa we were patient; after Luxembourg we were patient. There can be no more patience. The army is ready, and the honour of the nation demands that it march.")}\n\n${source("Source B", "a cartoon (described in words) of the kind published in German illustrated magazines in 1871", "A tall figure of Germania, a woman in armour holding a sword, stands over a small figure in a French cap who is handing her a bag marked '5 milliards'. Behind them, German soldiers of every state, Bavarians and Saxons beside Prussians, cheer under one flag.", { described: true })}`,
    hints: ["Use the dates of the sources and what had happened by then."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source B?", points: [
        "Germany has defeated France and made it pay (the indemnity of 5 billion francs).",
        "The war has united the German states (soldiers of every state under one flag).",
      ], explanation: "Two points of message, supported from the cartoon." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why was Source A published on 15 July 1870?", points: [
        "Context: the edited Ems telegram had just been published (13 July).",
        "Purpose: to whip up French anger / push the government into war.",
        "Uses earlier humiliations (Sadowa, Luxembourg) to show France's patience was exhausted.",
        "Explains that it shows Bismarck's editing had worked: France would appear the aggressor.",
      ], explanation: "Context plus purpose, supported from the source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that Bismarck was responsible for German unification? Use the sources and your own knowledge.", points: [
        "A shows French outrage at the telegram, which Bismarck edited (his responsibility).",
        "B shows the war uniting the German states, which Bismarck had provoked.",
        "But A also shows French pride and readiness for war (French mistakes).",
        "B shows military victory and nationalism as forces behind unity, not one man.",
        "Own knowledge: Moltke's army, railways and the economy; negotiations with southern states.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The sources partly show Bismarck's responsibility. Source A shows the French reaction to the Ems telegram, which Bismarck had edited to provoke exactly this anger, and Source B shows the result of the war he provoked: German soldiers of every state united under one flag and France paying 5 billion francs. However, Source A also shows that the French were proud and eager for war, so their own mistakes played a part, and Source B credits the victory to the army and to national feeling, not to one man. My own knowledge supports both sides: Bismarck negotiated the southern states into the Empire, but Moltke's planning, railways and Prussia's economic strength won the war. The sources show Bismarck creating the opportunity, while other forces delivered unification.", explanation: "Both sides from the sources, with own knowledge and a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider what Bismarck could and could not control."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Franco-Prussian War of 1870-71.", points: [
        "France declared war on 19 July 1870; southern states fought with Prussia.",
        "German armies mobilised faster; a French army was trapped at Metz.",
        "Napoleon III surrendered at Sedan (1-2 September 1870); republic proclaimed in Paris.",
        "Siege of Paris until an armistice in January 1871; Treaty of Frankfurt (May 1871).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'Bismarck was a master planner who unified Germany.' How far do you agree?", points: [
        ["For: consistent aim of Prussian leadership; isolated each enemy in turn", 2],
        ["For: provoked France with the Ems telegram; kept wars short and peace with Austria mild", 2],
        ["Against: exploited events he did not create (Danish crisis, Spanish succession)", 2],
        ["Against: economic strength, army, nationalism and the mistakes of others", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "There is evidence of planning. From 1862 Bismarck aimed at Prussian leadership in Germany, and each war was prepared diplomatically: Austria was isolated in 1866, and in 1870 France was left without allies. He kept wars short, gave Austria a mild peace, and used the Ems telegram to make France declare war, which brought in the southern states.\n\nHowever, much of this depended on events Bismarck did not create. The Danish crisis of 1863 and the Spanish succession of 1868-70 arose by chance, and he exploited them. Prussia's economic strength, the army reforms, Moltke's generalship, national feeling against France and the mistakes of Austria and Napoleon III were all essential.\n\nI disagree with the claim in its strong form. Bismarck was a skilful opportunist with a clear aim rather than a planner following a fixed scheme, and he succeeded because Prussia had the power to back his diplomacy.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was the German Empire proclaimed, and where?", "18 January 1871, in the Hall of Mirrors at Versailles.");
  b.card("DEFINITION", "Ems telegram", "The king's report of his meeting with the French ambassador (13 July 1870), edited by Bismarck to sound insulting.");
  b.card("DEFINITION", "Hohenzollern candidature", "The offer of the Spanish throne to Prince Leopold of Hohenzollern-Sigmaringen (1870), opposed by France.");
  b.card("FACT", "When did France declare war on Prussia?", "19 July 1870.");
  b.card("FACT", "What happened at Sedan in September 1870?", "Napoleon III and his army surrendered; a republic was proclaimed in Paris on 4 September.");
  b.card("FACT", "What did France lose by the Treaty of Frankfurt (10 May 1871)?", "Alsace and much of Lorraine; it also paid 5 billion francs.");
  b.card("FACT", "What was the Luxembourg crisis (1867)?", "Napoleon III tried to buy Luxembourg; German opposition blocked it and it was made neutral.");
  b.card("CONCEPT", "Why did France's declaration of war help Bismarck?", "The southern states' alliances applied only if Prussia was attacked, and France looked the aggressor.");
  b.card("CONCEPT", "Master planner or opportunist?", "Most historians see Bismarck as an opportunist with a clear aim who exploited events, backed by Prussian power.");
});
