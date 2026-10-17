// W3b: ahist.ww1.long-term-causes (ZIMSEC causes of the First World War; Cambridge Paper 3 Topic 1 context).
import { concept, P, source, extract, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.ww1.long-term-causes", { file: "ww1/long-term-causes", keyPrefix: "ww1.long-term-causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which two powers formed the Dual Alliance of 1879?",
    options: [
      ["Germany and Austria-Hungary, as arranged by Bismarck", "Correct: Bismarck made this alliance in October 1879."],
      ["France and Russia, who feared the power of Germany", "The Franco-Russian alliance was made in the 1890s."],
      ["Britain and France, who settled their colonial quarrels", "This was the Entente Cordiale of 1904, which was not an alliance."],
      ["Germany and Italy, who feared the power of France", "Italy joined the alliance only in 1882."],
    ],
    answer: "A",
    explanation: "The Dual Alliance of 1879 bound Germany and Austria-Hungary; Italy joined in 1882 to form the Triple Alliance.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which event of 1906 made all earlier battleships obsolete and intensified the Anglo-German naval race?",
    options: [
      ["The launch of the battleship HMS Dreadnought", "Correct: it was a new type of all-big-gun battleship."],
      ["The signing of the German Navy Law of 1898", "The law was passed in 1898, long before 1906."],
      ["The meeting of the Kaiser with the Tsar at Björkö", "This meeting did not concern ship design."],
      ["The opening of the Kiel Canal for naval ships", "The canal opened in 1895."],
    ],
    answer: "A",
    explanation: "HMS Dreadnought (1906) made earlier battleships out of date, and Germany answered by building its own dreadnoughts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Russia turn to France in the early 1890s?",
    options: [
      ["The Reinsurance Treaty with Germany lapsed after 1890", "Correct: Russia needed a new ally."],
      ["Britain had asked Russia to join the Triple Alliance", "Britain did not invite Russia to join that alliance."],
      ["France had agreed to give back Alsace-Lorraine to Russia", "France wished to recover Alsace-Lorraine for itself."],
      ["Germany had declared war on Russia over the Balkans", "No war took place at that time."],
    ],
    answer: "A",
    hints: ["Think of what happened after Bismarck's fall."],
    explanation: "When Germany let the Reinsurance Treaty lapse, Russia, which feared isolation, signed a military alliance with France (confirmed in 1894).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the result of the Algeciras Conference of 1906?",
    options: [
      ["Germany was left isolated, while Britain backed France openly", "Correct: only Austria supported Germany."],
      ["Germany gained a protectorate over Morocco after the conference", "France, not Germany, later gained the protectorate."],
      ["Britain broke with France and joined the Triple Alliance", "Britain drew closer to France."],
      ["Spain and Italy formed an alliance against France in Morocco", "No such alliance was formed."],
    ],
    answer: "A",
    hints: ["Think of the Entente."],
    explanation: "The First Moroccan crisis, which began with the Kaiser's visit to Tangier, ended at Algeciras with Germany isolated and the Entente strengthened.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the annexation of Bosnia-Herzegovina in 1908 increase tension in the Balkans?",
    options: [
      ["It angered Serbia, which wished to unite South Slavs", "Correct: Serbia saw Bosnia as its own."],
      ["It gave Austria control of the straits at Constantinople", "The straits were not involved."],
      ["It led Russia to declare war on Austria immediately", "Russia, not ready, accepted the annexation."],
      ["It ended the rule of the Ottoman sultan in Constantinople", "The Ottoman government remained."],
    ],
    answer: "A",
    hints: ["Think of Serbian aims and of Russia's response."],
    explanation: "Serbia was furious since many Bosnians were Serbs, and Russia, unready for war, had to accept the annexation, though it resented this humiliation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Schlieffen Plan assume?",
    options: [
      ["France could be beaten quickly while Russia mobilised slowly", "Correct: the plan depended on speed."],
      ["Britain would join Germany against France after a short war", "Britain was expected to be an enemy."],
      ["Belgium would allow German troops to pass through its territory", "Belgium was expected to resist, and did."],
      ["Russia would be defeated first and France would then give in", "France was to be defeated first."],
    ],
    answer: "A",
    hints: ["Think of a war on two fronts."],
    explanation: "The plan was to defeat France in about six weeks by an advance through Belgium and then to move troops by rail to face Russia, which was expected to be slow to mobilise.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the alliance system before 1914 is best supported by the evidence?",
    options: [
      ["It raised the risk that a local conflict would draw in several powers", "Correct: but it did not make war certain."],
      ["It compelled every member to go to war whatever the circumstances were", "Britain was not bound by treaty to fight."],
      ["It guaranteed peace, since each side was too strong to be attacked", "The system did not prevent war in 1914."],
      ["It was created by Britain to isolate Germany and cut it off from Russia", "The alliances had many origins and Russia was an ally of France."],
    ],
    answer: "A",
    hints: ["Think of what the alliances did and what they did not do."],
    explanation: "The alliances raised the stakes and the risk of escalation, but they were not binding on everyone (Italy and Britain kept their freedom), and decisions in July 1914 still mattered.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best challenges the view that economic rivalry made war between Britain and Germany certain?",
    options: [
      ["Britain and Germany were important trading partners", "Correct: many businessmen on both sides wished for peace."],
      ["Germany's steel production passed that of Britain", "This supports the view of economic rivalry."],
      ["The two countries competed to build the largest navies", "This supports the view of rivalry."],
      ["Germany sought colonies in Africa and the Pacific", "This supports the view of imperial competition."],
    ],
    answer: "A",
    hints: ["Which evidence shows an interest in peace?"],
    explanation: "The trade between the two countries gave both an interest in peace, so economic rivalry did not make war certain; other evidence shows the competition.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Triple Entente was made up of Britain, France and Russia.",
    answer: true,
    explanation: "True. It grew out of the Franco-Russian alliance, the Entente Cordiale (1904) and the Anglo-Russian Convention (1907).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Entente Cordiale of 1904 was a formal military alliance that bound Britain to fight for France.",
    answer: false,
    explanation: "False. It settled colonial disputes between Britain and France. Britain was not bound to fight, although staff talks later made support more likely.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree that the arms race made the First World War inevitable.",
    answer: false,
    hints: ["Remember that historians weigh long-term and short-term causes differently."],
    explanation: "False. The arms race increased mistrust and the risk of war, but historians disagree about whether it made war inevitable, and they point to the decisions of July 1914.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or name with its meaning.",
    pairs: [
      ["Tirpitz", "German admiral who built up the battle fleet"],
      ["Weltpolitik", "German policy of seeking world influence and colonies"],
      ["Black Hand", "Serbian secret society linked to nationalist aims"],
      ["Plan XVII", "French plan for an offensive into Alsace-Lorraine"],
    ],
    explanation: "These terms are needed for any answer on the pre-war tensions.",
  });
  {
    const events = [
      "The Franco-Russian alliance is confirmed",
      "The Entente Cordiale is signed",
      "Austria annexes Bosnia-Herzegovina",
      "The Agadir crisis",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1894, 1904, 1908 and 1911."],
      explanation: "Franco-Russian alliance, 1894; Entente Cordiale, 1904; Bosnia, 1908; Agadir, 1911.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German admiral {{blank:a}} pressed for the Navy Laws, and the Moroccan crisis of 1911 is known as the {{blank:b}} crisis.",
    blanks: [
      { id: "a", accepted: ["Tirpitz"], choices: ["Tirpitz", "Moltke", "Schlieffen", "Bismarck"] },
      { id: "b", accepted: ["Agadir"], choices: ["Agadir", "Tangier", "Algeciras", "Fashoda"] },
    ],
    explanation: "Tirpitz led the naval expansion; the Panther was sent to Agadir in July 1911.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which German chief of the General Staff (1891-1905) gave his name to the plan to defeat France quickly through Belgium? Give his surname.",
    accepted: ["Schlieffen", "von Schlieffen", "Alfred von Schlieffen", "Alfred Schlieffen", "Count Schlieffen"],
    wrong: ["Moltke"],
    explanation: "**Schlieffen**, whose plan was modified by his successor Moltke the Younger.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the alliances that divided Europe in 1907.",
    points: ["The Triple Alliance linked Germany, Austria-Hungary and Italy", "The Franco-Russian alliance of the 1890s bound France and Russia", "Britain agreed the Entente Cordiale with France in 1904 and a convention with Russia in 1907", "These agreements formed the Triple Entente, opposed to the Triple Alliance"],
    modelAnswer: "The Triple Alliance linked Germany, Austria-Hungary and Italy. France and Russia were allied from the 1890s. Britain agreed the Entente Cordiale with France in 1904 and a convention with Russia in 1907. These agreements formed the Triple Entente, opposed to the Triple Alliance.",
    explanation: "One mark for each point described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the naval race damaged relations between Britain and Germany.",
    points: [["Britain depended on its navy for food, trade and the empire, so a large German fleet looked like a threat to its security", 2], ["Each German Navy Law and the Dreadnought race increased cost and suspicion, and drove Britain to settle its disputes with France and Russia", 2]],
    hints: ["Think of what the navy meant to Britain."],
    modelAnswer: "Britain depended on its navy for food, trade and the empire, so a large German fleet looked like a threat to its security. Each German Navy Law and the dreadnought race increased cost and suspicion, and drove Britain to settle its disputes with France and Russia.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Balkans were a source of danger to the peace of Europe before 1914.",
    points: [["Ottoman decline left a gap, and Austria-Hungary feared Serbian nationalism while Serbia sought to unite South Slavs", 2], ["Russia supported Serbia as protector of the Slavs while Germany supported Austria, so a Balkan quarrel could involve the alliance blocs", 2]],
    hints: ["Think of Austria, Serbia, Russia and the alliances."],
    modelAnswer: "Ottoman decline left a gap in the Balkans. Austria-Hungary feared Serbian nationalism, while Serbia sought to unite the South Slavs. Russia supported Serbia as protector of the Slavs and Germany supported Austria, so a Balkan quarrel could involve the alliance blocs.",
    explanation: "One mark for each reason and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a newspaper editorial in Britain, 1909 (a fictional British newspaper)",
        "Our island lives by the sea. Every German battleship that is launched is a question put to us. We cannot ask the nation to trust in good intentions when the yards at Kiel are working day and night. We must build, and we must not wait."),
      "",
      source("Source B", "a letter by a fictional German naval officer to his brother, 1909",
        "We are told that we may not have a fleet because the English must remain masters of the sea. Why should a great nation with ports and merchant ships be forbidden to defend them? We build for our own safety, and not against England."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about British attitudes to the German navy?", points: ["It was seen as a threat to Britain, which depends on the sea", "Britain should build more ships without waiting"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of the causes of tension between Britain and Germany.", points: [["Agree: both show that the naval building was a matter of national security for each side", 2], ["Differ: A sees the German fleet as a threat to Britain; B sees it as defensive and says Britain wished to deny Germany a fleet", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the causes of the First World War?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a newspaper editorial intended to persuade readers and to push for more building, so it may exaggerate, but it shows British public opinion during the 1909 scare", 2], ["B is a private letter by a German officer, so it shows genuine feeling, but he is a professional with an interest in the fleet and writes for one reader", 2], ["Own knowledge: the Navy Laws, the Dreadnought and failed negotiations confirm the rivalry, but neither source mentions the other causes such as the alliances or the Balkans", 2]], modelAnswer: "Source A is useful because it shows how British opinion saw the German fleet in 1909, though as an editorial it was written to persuade and may exaggerate the danger. Source B is useful because it is a private letter, so the officer may be sincere in presenting the fleet as defensive, but as a naval officer he had an interest in the fleet and it reflects one man's view. My own knowledge supports the rivalry, since Germany passed Navy Laws from 1898 and Britain launched the Dreadnought in 1906. However, neither source mentions the alliances, Morocco or the Balkans, so they are useful on the naval race but not on the whole range of causes." }),
    ],
    hints: ["For (c), consider the type of source, the writer's interest and what is missing."],
    explanation: "Both sources are invented: an editorial and a private letter.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract("The war that began in 1914 had no single father. It grew from the way in which the Great Powers had come to see each other. By the first decade of the century each of them lived in fear of encirclement or decline: Germany feared the closing ring of the Entente, Russia feared the loss of its influence in the Balkans, France feared a second defeat, Austria-Hungary feared the dissolution of the empire from within. In such a climate, the alliances and war plans, which were meant to provide safety, turned every crisis into a test of survival. A quarrel over a minor Balkan province could draw in every power because none could be seen to give way. The leaders were not fools or villains; they were men trapped by systems of their own making."),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the long-term causes of the First World War to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the war had no single cause; it came from mutual fear and the structure of alliances and plans, not from the fault of one power", 2],
      ["Approach: concerned with perceptions and systems, with shared responsibility and little attention to individual decisions or aims", 2],
      ["Knowledge supporting: encirclement fears after the Entente, Russian concern in the Balkans, French revanchism, Austria's fear of Serbia, the alliances and Schlieffen Plan", 2],
      ["Knowledge testing: aims and decisions of Germany and Austria in July 1914, or the choice of leaders, which the extract plays down", 2],
    ],
    hints: ["Say what the historian argues, how they go about it, and then test it against what you know."],
    modelAnswer: "The extract argues that the war had no single author. It presents the Great Powers as trapped in a system of mutual fear, in which alliances and war plans designed for security made every crisis a test of survival. The historian's approach is to look at how the powers perceived each other, so he stresses structures and shared anxieties rather than the aims of individual governments. My knowledge supports much of this: Germany did fear encirclement after the Entente of 1904 and 1907, Russia was humiliated over Bosnia in 1908, France wanted Alsace-Lorraine back, and Austria-Hungary feared Serbian nationalism. The Schlieffen Plan also left little time for diplomacy. But the extract plays down the decisions of leaders. In July 1914 Germany gave Austria a blank cheque and Austria sent a harsh ultimatum, so some historians would say that choices mattered more than structures. The extract therefore shows an interpretation of shared responsibility, which is supported by the pre-war tensions but is less convincing on responsibility for the final steps.",
    explanation: "The extract is invented. Credit identification of the interpretation and approach, explained with the extract and tested with knowledge.",
  });

  b.card("DEFINITION", "What was the Triple Entente?", "The loose understanding of France, Russia and Britain: the Franco-Russian alliance, the Entente Cordiale (1904) and the Anglo-Russian Convention (1907).");
  b.card("DEFINITION", "What was Weltpolitik?", "The German policy under Wilhelm II of seeking world influence, colonies and a battle fleet.");
  b.card("DEFINITION", "What was the Schlieffen Plan?", "The German plan to defeat France in about six weeks through Belgium and then turn against Russia, to avoid a long two-front war.");
  b.card("FACT", "When was the Dual Alliance made, and between whom?", "1879, Germany and Austria-Hungary (Italy joined in 1882 to make the Triple Alliance).");
  b.card("FACT", "What happened in the Agadir crisis of 1911?", "Germany sent the gunboat Panther to Morocco; it ended with Germany gaining territory in the French Congo and France gaining a protectorate over Morocco.");
  b.card("FACT", "When did Austria-Hungary annex Bosnia-Herzegovina?", "October 1908; Serbia was furious and Russia had to accept it.");
  b.card("CONCEPT", "What was the diplomatic revolution of 1890-1907?", "The change from Bismarck's system, which isolated France, to two blocs, which left Germany feeling encircled.");
  b.card("CONCEPT", "Why did the naval race matter?", "Britain saw the German fleet as a threat to its security, which ended its isolation and brought it closer to France and Russia.");
  b.card("CONCEPT", "Why were the Balkans so dangerous?", "Austria feared Serbian nationalism, Russia backed Serbia, and the alliances meant that a Balkan quarrel could draw in the Great Powers.");
});
