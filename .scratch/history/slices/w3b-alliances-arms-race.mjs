// Slice W3b: the alliance system and the arms race, 1890-1914 (both boards: ZIMSEC 12.1, Cambridge Option A KQ6).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["1882", "The Triple Alliance is formed"],
  ["1894", "The Franco-Russian Alliance comes into force"],
  ["1904", "The Entente Cordiale is signed"],
  ["1907", "The Anglo-Russian Entente is signed"],
]);

concept("hist.ww1-origins.alliances-arms-race", { file: "ww1-origins/alliances-arms-race", keyPrefix: "ww1-origins.alliances-arms-race" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which three countries formed the Triple Alliance of 1882?",
    options: [
      ["Germany, Austria-Hungary and Italy", "Correct: Italy joined the Dual Alliance of Germany and Austria-Hungary in 1882."],
      ["Britain, France and Russia", "These three formed the Triple Entente, completed in 1907."],
      ["Germany, Austria-Hungary and the Ottoman Empire", "The Ottoman Empire joined Germany's side only after war began, in late 1914."],
      ["Germany, Italy and Japan", "This looks like the Axis of the Second World War; Japan allied with Britain in 1902."],
    ],
    answer: "A",
    explanation: "The **Triple Alliance** (1882) linked Germany, Austria-Hungary and Italy. Italy stayed neutral in 1914 and joined the Allies in 1915.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "With which country did Britain sign an alliance in 1902?",
    options: [
      ["Japan", "Correct: the Anglo-Japanese Alliance protected both countries' interests in East Asia against Russia."],
      ["France", "Britain and France signed the Entente Cordiale in 1904, and it was not an alliance."],
      ["Russia", "Britain and Russia settled their disputes in the Anglo-Russian Entente of 1907."],
      ["Germany", "Talks about an Anglo-German understanding around 1900 came to nothing."],
    ],
    answer: "A",
    explanation: "The **Anglo-Japanese Alliance** of 1902 ended Britain's long avoidance of peacetime alliances.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the launch of HMS *Dreadnought* in 1906 so important for the naval race?",
    options: [
      ["It made older battleships out of date, so the race restarted", "Correct: Germany could now compete in the new type of ship almost from level."],
      ["It was the first submarine, so Germany had to build U-boats", "Dreadnought was a battleship, not a submarine."],
      ["It was sold to Japan, so Britain's fleet in Europe became smaller", "Dreadnought served in the Royal Navy."],
      ["It ended the race, because Germany could not build a similar ship", "Germany built its own dreadnoughts from 1907-08 onwards."],
    ],
    answer: "A",
    explanation: "*Dreadnought*'s big guns and turbine engines made earlier battleships obsolete. Britain's huge lead in old ships counted for less, and both sides built dreadnoughts as fast as they could.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the Franco-Russian Alliance of 1894 worry Germany?",
    options: [
      ["Germany might have to fight on two fronts at once", "Correct: France lay to the west and Russia to the east."],
      ["It gave France control of Russia's Baltic ports", "No such terms existed; it was a defensive military alliance."],
      ["It brought Britain into a formal alliance with Russia", "Britain did not join; it settled disputes with Russia only in 1907."],
      ["It meant that Italy had to leave the Triple Alliance", "Italy stayed in the Triple Alliance until 1915."],
    ],
    answer: "A",
    explanation: "With France to the west and Russia to the east, German planners feared a **two-front war**, which is why the Schlieffen Plan aimed to defeat France quickly first.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Britain and France settle in the Entente Cordiale of 1904?",
    options: [
      ["Colonial disputes, especially over Egypt and Morocco", "Correct: France accepted British control of Egypt and Britain accepted French influence in Morocco."],
      ["A promise to declare war together if Germany attacked either", "The entente contained no promise of military help."],
      ["A plan to share the German colonies in Africa", "German colonies were divided only after the war, as mandates."],
      ["Limits on the size of both countries' navies", "No naval limits were agreed in 1904."],
    ],
    answer: "A",
    explanation: "The **Entente Cordiale** was a settlement of colonial quarrels, not an alliance. It became closer after Germany challenged France in Morocco in 1905-06.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which piece of evidence BEST supports the view that the alliances did not force countries into war in 1914?",
    options: [
      ["Italy stayed neutral in 1914 although it was in the Triple Alliance", "Correct: a member of an alliance chose not to fight, so the system did not decide its actions."],
      ["Russia ordered general mobilisation in support of Serbia in July 1914", "This shows an alliance-type commitment pulling a country towards war."],
      ["France had been allied to Russia since 1894", "This shows the alliances existed, not that they failed to bind."],
      ["Germany declared war on Russia on 1 August 1914", "This shows the crisis spreading, which supports the opposite view."],
    ],
    answer: "A",
    hints: ["Look for a country that did NOT do what its alliance seemed to require."],
    explanation: "Italy argued that the Triple Alliance was defensive and that Austria-Hungary had not been attacked, so it stayed out, then joined the Allies in 1915. Countries still made choices.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Britain see Germany's new battle fleet as a threat, when it did not much fear Germany's army?",
    options: [
      ["An island depending on imports needed control of the seas", "Correct: a fleet in the North Sea threatened Britain's food supplies and its empire."],
      ["Germany's army was smaller than Britain's in 1914", "Germany's conscript army was far larger than Britain's small professional army."],
      ["The German fleet was based in the Mediterranean, near Egypt", "The German battle fleet was based on the North Sea, close to Britain."],
      ["Britain had promised in 1902 to defend Germany's ports", "Britain made no such promise; its 1902 alliance was with Japan."],
    ],
    answer: "A",
    hints: ["Think about what Britain needed to survive as an island with an empire."],
    explanation: "Britain relied on sea power for its food, trade and empire. A large German fleet so close to home could only be aimed at Britain, which pushed Britain towards France and Russia.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A historian argues that military planning made the July Crisis of 1914 hard to control. Which fact supports this?",
    options: [
      ["Germany's plan meant answering Russian mobilisation by attacking France", "Correct: the Schlieffen Plan left no room for a war against Russia alone."],
      ["Britain had a small army of professional volunteers", "This does not show how plans limited choices in the crisis."],
      ["Britain and Germany failed to agree on limits to their navies in 1912 talks", "This raised tension earlier but does not show plans driving the July Crisis."],
      ["The Triple Alliance had been renewed several times", "Renewal does not show military planning limiting decisions."],
    ],
    answer: "A",
    hints: ["Which fact links a plan to the speed of events in the last days before war?"],
    explanation: "Because the **Schlieffen Plan** depended on beating France before Russia was ready, Russian mobilisation led Germany to declare war on both Russia and France and to invade Belgium.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Triple Entente was made up of Britain, France and Russia.",
    answer: true,
    explanation: "True. The agreements of 1894, 1904 and 1907 linked Britain, France and Russia, though Britain was not bound by a formal military alliance.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Entente Cordiale of 1904 bound Britain to declare war on any country that attacked France.",
    answer: false,
    explanation: "False. The Entente Cordiale settled colonial disputes. It contained no military promise, which is why Britain's entry into the war in August 1914 was not automatic.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each agreement with what it did.",
    pairs: [
      ["Dual Alliance (1879)", "Linked Germany and Austria-Hungary"],
      ["Franco-Russian Alliance (1894)", "Ended the isolation of France"],
      ["Anglo-Japanese Alliance (1902)", "Protected British and Japanese interests in East Asia"],
      ["Anglo-Russian Entente (1907)", "Settled disputes over Persia, Afghanistan and Tibet"],
    ],
    explanation: "Each agreement had its own purpose; together they produced two groups of powers by 1907.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these agreements in chronological order.",
    pairs: [order.events[2][1], order.events[0][1], order.events[3][1], order.events[1][1]],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The alliance between Germany's two neighbours came between the Triple Alliance and Britain's ententes."],
    explanation: "Triple Alliance 1882; Franco-Russian Alliance 1894; Entente Cordiale 1904; Anglo-Russian Entente 1907.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German admiral who planned the Navy Laws of 1898 and 1900 was {{blank:a}}. The German policy of seeking colonies and a large navy to become a world power was called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Tirpitz"], choices: ["Tirpitz", "Moltke", "Schlieffen", "Hindenburg"] },
      { id: "b", accepted: ["Weltpolitik"], choices: ["Weltpolitik", "Lebensraum", "Realpolitik", "Blitzkrieg"] },
    ],
    explanation: "**Tirpitz** built the German battle fleet as part of Wilhelm II's **Weltpolitik**. Lebensraum and Blitzkrieg belong to Hitler's era; Realpolitik is linked with Bismarck.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the German Chancellor whose dismissal in 1890 was followed by the end of Germany's treaty with Russia.",
    accepted: ["Bismarck", "Otto von Bismarck", "Otto Bismarck"],
    wrong: ["Wilhelm II"],
    explanation: "Wilhelm II dismissed **Bismarck** in 1890 and did not renew the Reinsurance Treaty, leaving Russia free to ally with France.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the Triple Entente.",
    points: [
      "Identifies the members: Britain, France and Russia.",
      "Franco-Russian Alliance of 1894.",
      "Entente Cordiale (Britain and France) of 1904, settling colonial disputes.",
      "Anglo-Russian Entente of 1907 / Britain's ententes were not binding military alliances.",
    ],
    modelAnswer: "The Triple Entente linked Britain, France and Russia. France and Russia had a military alliance from 1894. Britain settled colonial disputes with France in the Entente Cordiale of 1904 and with Russia over Persia, Afghanistan and Tibet in 1907. Britain's agreements were understandings, not promises to go to war.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Britain ended its policy of avoiding alliances after 1900.",
    points: [
      "Identifies the threat from Germany / the German Navy Laws.",
      "Explains that a German fleet in the North Sea threatened Britain's security, so Britain needed friends.",
      "Identifies the experience of the South African War / isolation in Europe.",
      "Explains that the war showed Britain's forces were stretched and it had few friends, so agreements with Japan, France and Russia protected its interests.",
    ],
    hints: ["Think about the German navy and about what the South African War showed."],
    modelAnswer: "Germany's Navy Laws of 1898 and 1900 built a fleet that could only be aimed at Britain, so Britain looked for partners against a possible German threat. The South African War of 1899-1902 also showed that Britain's army was stretched and that it had few friends in Europe, so it protected its interests by allying with Japan in 1902 and settling disputes with France in 1904 and Russia in 1907.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the arms race increased tension between the Great Powers before 1914.",
    points: [
      "Identifies the naval race between Britain and Germany.",
      "Explains that after the Dreadnought (1906) each side built ships to stay ahead, creating fear and mistrust; talks in 1912 failed.",
      "Identifies the growth of armies / conscription.",
      "Explains that army increases in 1913 (Germany, France's three-year service, Russian rearmament) made each side fear the other was preparing to attack.",
      "Identifies military planning / the Schlieffen Plan.",
      "Explains that plans based on rapid mobilisation encouraged generals to strike first and made it hard to delay in a crisis.",
    ],
    hints: ["Cover the sea, the land and the war plans."],
    modelAnswer: "The naval race made Britain and Germany suspicious of each other. After Britain launched the Dreadnought in 1906 both built the new battleships as fast as possible, and when talks in 1912 failed Britain kept more of its fleet at home and drew closer to France. On land, the expansion of armies in 1913, with Germany's new army law, France's three-year service and Russia's rearmament programme, made each side believe the other was preparing for war, so the generals pressed for more. Finally, war plans such as the Schlieffen Plan depended on mobilising quickly and striking first, which made governments fear losing time in a crisis.",
    explanation: "Two marks for each developed explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an editorial in a fictional British popular newspaper, March 1909", "Every dreadnought launched at Kiel is a gun pointed at our own coasts. Germany has no empire to defend that needs such a fleet. While the Government counts the cost, the Kaiser's yards work day and night. The people demand eight new ships, and they will not be put off with four.")}\n\n${source("Source B", "a speech by a fictional member of the German Reichstag, made to a meeting of a naval support league in 1908", "Our trade now reaches every ocean. A great nation whose ships may be stopped at sea by any foreign navy is not a great nation at all. We build our fleet to protect our commerce and our honour, not to threaten anyone. Those who see an attack in every German keel are the true warmongers.")}`,
    hints: ["In (c), think about the purpose of each source and what you know about the naval race."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about British attitudes to the German navy in 1909?", points: [
        "Fear that the German fleet was aimed at Britain.",
        "Demand for more British battleships / pressure on the government to build eight.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about the purpose of the German fleet?", points: [
        "Disagree: A says the fleet is aimed at Britain; B says it is to protect trade.",
        "Disagree: A says Germany has no need for such a fleet; B says a great trading nation needs one.",
        "Agree: both accept that Germany is building a large fleet.",
        "Agree: both use the fleet to stir up national feeling / each accuses the other side of causing tension.",
      ], explanation: "Credit specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which source is more useful to a historian studying why the naval race increased tension? Explain your answer using the sources and your own knowledge.", points: [
        "Source A: popular newspaper, aimed at stirring public opinion; exaggerated but shows the fear that drove British policy.",
        "Own knowledge confirms A: the 1909 campaign for eight dreadnoughts.",
        "Source B: speech to a naval support league, aimed at supporters; justifies the fleet and denies aggressive aims.",
        "Own knowledge: Tirpitz's fleet was concentrated in the North Sea, which supports British fears more than B's claim.",
        "Both are useful because together they show how each side misread or distrusted the other.",
        "Supported judgement on which is more useful for the question.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it shows the fear and anger that a popular British newspaper wanted to spread in 1909. It is one-sided and exaggerated, but my own knowledge confirms that a press and public campaign in 1909 pushed the government to build eight dreadnoughts, so it shows how the race affected British opinion. Source B was spoken to a naval support league, an audience that already backed the fleet, so the speaker wanted to justify it and deny any aggressive aim. My own knowledge that the German battle fleet was based in the North Sea suggests Britain had real reasons to doubt such claims. Together they are most useful, because they show each side seeing itself as defensive and the other as the aggressor. For the specific question of why tension increased, Source A is slightly more useful because it shows the public pressure that turned naval building into a national rivalry.", explanation: "Provenance, content and own knowledge are needed for the top level." }),
    ],
    explanation: "Practice source-based question (12 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh how the alliances deterred war against how they spread it."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how Britain ended its isolation between 1902 and 1907.", points: [
        "Anglo-Japanese Alliance, 1902.",
        "Entente Cordiale with France, 1904 (Egypt and Morocco).",
        "Anglo-Russian Entente, 1907 (Persia, Afghanistan, Tibet).",
        "Ententes were understandings, not military alliances / military and naval talks with France followed.",
      ], explanation: "One mark per accurate point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The alliance system made a general European war more likely.\" How far do you agree?", points: [
        ["Agree: two armed camps bred mistrust; Germany felt encircled.", 2],
        ["Agree: obligations linked local quarrels to the Great Powers, so a Balkan crisis drew in Russia, Germany and France.", 2],
        ["Agree: alliances were tied to war plans; the Schlieffen Plan meant war with Russia was also war with France.", 2],
        ["Disagree: the alliances were defensive and helped keep peace for decades; they were a deterrent.", 2],
        ["Disagree: they did not force anyone (Italy stayed neutral; Britain had no binding promise; the blank cheque was a choice).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "There is a strong case that the alliances made a general war more likely. By 1907 Europe was divided into two armed groups, and Germany felt encircled by France and Russia. The alliances meant that a quarrel between Austria-Hungary and Serbia could involve Russia, Serbia's protector, and then Germany and France. The alliances were also linked to war plans: because the Schlieffen Plan required Germany to attack France first, any war with Russia became a war with France as well.\n\nHowever, the alliances were defensive in purpose and helped prevent a war between the Great Powers for over twenty years. They did not decide what countries did in 1914: Italy stayed neutral although it belonged to the Triple Alliance, and Britain had no binding obligation to France or Russia. Britain joined the war because Germany invaded Belgium. Germany's 'blank cheque' to Austria-Hungary was a decision taken by its leaders, not something required by treaty.\n\nOverall, I agree to a large extent. The alliances did not cause the war on their own, but combined with rigid war plans they made it far more likely that a local crisis would become a general European war.", explanation: "Both sides with specific evidence and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Entente", "A friendly understanding that settles disputes between states, without a binding promise to fight for each other.");
  b.card("DEFINITION", "Weltpolitik", "Wilhelm II's 'world policy' from the late 1890s: colonies, influence and a big navy to make Germany a world power.");
  b.card("FACT", "Who was in the Triple Alliance (1882)?", "Germany, Austria-Hungary and Italy.");
  b.card("FACT", "Who was in the Triple Entente, and when was it completed?", "Britain, France and Russia; completed by the Anglo-Russian Entente of 1907.");
  b.card("FACT", "When was the Anglo-Japanese Alliance signed?", "1902.");
  b.card("FACT", "What was HMS Dreadnought, and when was it launched?", "A revolutionary British battleship launched in 1906 that made older battleships out of date.");
  b.card("FACT", "When did the Franco-Russian Alliance come into force?", "1894, after Germany let its Reinsurance Treaty with Russia lapse in 1890.");
  b.card("CONCEPT", "Why did the Schlieffen Plan make a crisis harder to control?", "It required Germany to attack France quickly through Belgium as soon as Russia mobilised, so a war with Russia became a war with France too.");
  b.card("CONCEPT", "Give two reasons why the alliances may have made war LESS likely.", "They were defensive and deterred attack; they did not force members to fight (Italy stayed neutral in 1914; Britain had no binding promise).");
});
