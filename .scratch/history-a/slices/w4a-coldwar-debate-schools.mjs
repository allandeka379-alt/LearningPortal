// W4a: ahist.coldwar.debate-schools (Cambridge Paper 3 Topic 3 debate; A Level only).
import { concept, P, source, extract, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.coldwar.debate-schools", { file: "coldwar/debate-schools", keyPrefix: "coldwar.debate-schools" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which school of interpretation blamed Soviet expansion and communist ideology for the Cold War?",
    ok: ["The traditionalist (orthodox) school", "Correct: it was dominant in the West in the 1940s and 1950s."],
    no: [
      ["The revisionist school", "Revisionists stressed American responsibility."],
      ["The post-revisionist school", "Post-revisionists examined both sides."],
      ["The structuralist school", "Structuralism belongs to the debate on the Holocaust."],
    ],
    explanation: "Traditionalists such as Herbert Feis argued that Stalin's expansion and communist ideology caused the conflict and that the West responded.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did revisionist historians such as William Appleman Williams argue?",
    ok: ["American economic expansion for open markets helped cause it", "Correct: they stressed American responsibility."],
    no: [
      ["Stalin alone was responsible for the Cold War", "That is a traditionalist view."],
      ["Neither side made any mistakes in the years after 1945", "Revisionists criticised American policy."],
      ["The Cold War was caused by the actions of Britain and France", "Revisionists focused on the United States."],
    ],
    explanation: "Revisionists argued that the American search for open markets and its economic strength drove its policy, and that Soviet actions were largely defensive.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did revisionist interpretations become prominent in the 1960s?",
    ok: ["Disillusion over Vietnam led historians to question American aims", "Correct: the context shaped the questions asked."],
    no: [
      ["The Soviet Union had won the arms race and shown its superiority", "That did not explain the rise of revisionism."],
      ["All the Soviet archives were opened to Western historians in 1960", "Soviet archives opened after 1991."],
      ["The United States had abandoned its alliances in Europe", "NATO continued to exist."],
    ],
    hints: ["Think about the war in which the United States was involved in the 1960s."],
    explanation: "The war in Vietnam made many historians doubt that American policy was always defensive and led them to re-examine its origins.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main argument of post-revisionist historians such as John Lewis Gaddis (1972)?",
    ok: ["Both sides acted from security fears and share responsibility", "Correct: they avoided blaming one side."],
    no: [
      ["Only the United States wanted war and the Soviets wished for peace", "That view is closer to revisionism."],
      ["Only the Soviet Union acted aggressively between 1945 and 1949", "That view is closer to traditionalism."],
      ["The Cold War was inevitable and no decisions made any difference", "Post-revisionists examined decisions in detail."],
    ],
    hints: ["The school takes a position between the two earlier views."],
    explanation: "Post-revisionists used more evidence and argued that mistakes, misperception and domestic pressures on both sides hardened the division.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is meant by the 'security dilemma' in discussion of the Cold War?",
    ok: ["Each side's defensive steps appeared threatening to the other", "Correct: measures to gain security produced more fear."],
    no: [
      ["The United States could not decide whether to join the UN", "It joined the UN in 1945."],
      ["The Soviet Union had too few weapons to defend its borders", "The dilemma is about perceptions, not numbers."],
      ["Western countries could not agree on how to share atomic weapons", "That was not the meaning."],
    ],
    hints: ["Think about how a defensive measure can look like a threat."],
    explanation: "The security dilemma helps post-revisionists to explain how a spiral of mistrust could develop without either side planning war.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which criticism is commonly made of the revisionist school?",
    ok: ["It underplayed Stalin's repression and Soviet methods", "Correct: critics say it gave too little weight to Soviet actions."],
    no: [
      ["It ignored American documents and used only Soviet sources", "Revisionists mainly used American archives."],
      ["It claimed that the Cold War was caused entirely by Britain", "This was not their argument."],
      ["It was written before the Second World War had ended", "It was written in the 1950s and 1960s."],
    ],
    hints: ["Think about what revisionists said about Soviet actions."],
    explanation: "Critics argue that the rigged elections, the Czech coup and Stalin's character suggest that the Soviet Union also drove the conflict, while American economic motives are hard to prove.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment best explains why the interpretations of the Cold War changed over time?",
    ok: ["Historians were influenced by their times and by new evidence", "Correct: context and sources both shape interpretations."],
    no: [
      ["Historians were ordered by governments to write the same account", "Western historians were not ordered to write the same account."],
      ["The facts about 1945-49 were completely unknown before 1990", "Many facts were known."],
      ["Every historian after 1960 accepted the traditionalist view", "Views changed and varied."],
    ],
    hints: ["Think about Vietnam, détente and the opening of archives."],
    explanation: "The high Cold War, Vietnam and détente each influenced the questions asked, and new archives added evidence.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Revisionist historians placed greater blame on the United States than traditionalists did.",
    answer: true,
    explanation: "True. They stressed American economic expansion and the use of the atomic bomb, and viewed Soviet actions as largely defensive.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Historians agree that the Cold War was inevitable from 1945.",
    answer: false,
    explanation: "False. Some argue that the structure of the postwar world made rivalry likely, but others point to the room for different decisions; the form and timing remain debated.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Post-revisionist historians used more evidence and stressed the responsibility of both superpowers.",
    answer: true,
    hints: ["Think about the school that sits between the traditionalist and revisionist views."],
    explanation: "True. They examined the security fears and domestic pressures on both sides and avoided one-sided blame.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each historian with the school usually associated with his work.",
    pairs: [
      ["Herbert Feis", "Traditionalist"],
      ["William Appleman Williams", "Revisionist"],
      ["John Lewis Gaddis (1972)", "Post-revisionist"],
      ["Gar Alperovitz", "Revisionist"],
    ],
    explanation: "Feis (traditionalist), Williams and Alperovitz (revisionist) and Gaddis's 1972 book (post-revisionist). Real historians do not always fit one label.",
  });
  chrono(b, [
    "Traditionalist accounts dominate Western writing",
    "Revisionist accounts rise during the Vietnam War",
    "Post-revisionist accounts appear in the 1970s",
    "Historians use Soviet archives after the end of the USSR",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["Think of the decades: 1950s, 1960s, 1970s, 1990s."],
    explanation: "The sequence is the 1940s-50s, the 1960s, the 1970s-80s and the 1990s.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The study of how history has been written and why interpretations differ is called {{blank:a}}, and the school that blamed American economic expansion is the {{blank:b}} school.",
    blanks: [
      { id: "a", accepted: ["historiography"], choices: ["historiography", "geography", "chronology", "archaeology"] },
      { id: "b", accepted: ["revisionist"], choices: ["revisionist", "traditionalist", "structuralist", "functionalist"] },
    ],
    explanation: "Historiography is the study of historical writing; the revisionists stressed American economic expansion.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Soviet leader's suspicion and ruthlessness are often used by traditionalists to explain Soviet policy after 1945?",
    accepted: ["Joseph Stalin", "Stalin", "Josef Stalin"],
    wrong: ["Lenin"],
    explanation: "**Stalin**, who feared encirclement and ruled by terror.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main features of the revisionist interpretation of the origins of the Cold War.",
    points: ["It stressed the responsibility of the United States, especially its economic expansion and search for open markets", "It argued that Truman used the atomic bomb partly to intimidate the Soviet Union", "It saw Soviet actions as mainly defensive, to ensure security", "It arose in the 1960s, influenced by the Vietnam War and used American archives"],
    modelAnswer: "The revisionist interpretation stressed the responsibility of the United States, especially its economic expansion and search for open markets. Some revisionists argued that Truman used the atomic bomb partly to intimidate the Soviet Union. They saw Soviet actions as mainly defensive. The school arose in the 1960s, influenced by the Vietnam War, and made use of American archives.",
    explanation: "One mark for each feature described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why historians disagree about the part played by security in causing the Cold War.",
    points: [["Soviet security needs, shaped by two invasions, can explain the buffer zone in Eastern Europe, but others say the methods went beyond security", 2], ["American security fears about Soviet power led to the Truman Doctrine and NATO, but some historians stress economic motives, so the weight given to security differs", 2]],
    hints: ["Think of both Soviet and American security explanations."],
    modelAnswer: "Soviet security needs, shaped by two invasions, can explain the buffer zone in Eastern Europe, but others say the methods used went beyond security. American security fears about Soviet power led to the Truman Doctrine and NATO, but some historians stress economic motives, so the weight they give to security differs.",
    explanation: "Credit explained reasons for the disagreement.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the post-revisionist school appeared in the 1970s.",
    points: [["Détente reduced tensions, which made it easier for historians to see the Cold War as a shared problem rather than the fault of one side", 2], ["New documents became available in Western archives, which allowed more detailed study of the decisions on both sides", 2]],
    hints: ["Think about the political climate and the sources."],
    modelAnswer: "Détente reduced tensions, which made it easier for historians to see the Cold War as a shared problem rather than the fault of one side. New documents also became available in Western archives, which allowed more detailed study of the decisions on both sides.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a magazine article by a fictional American commentator, 1948",
        "The facts are plain. Wherever the Red Army has stepped, free governments have vanished. We have offered food and friendship, and the Kremlin has answered with a blockade and a curtain. There is no use pretending that the Russians want what we want."),
      "",
      source("Source B", "an article in a fictional Soviet newspaper, 1948",
        "The imperialists speak of aid, but their dollars come with chains. They surround our country with bases and boast of their atomic weapon. The peoples of the world will not accept a new empire disguised as a plan for recovery."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the behaviour of the Soviet Union?", points: ["Free governments have vanished wherever the Red Army has gone", "The Kremlin answered offers of food and friendship with a blockade"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to the Marshall Plan and American power.", points: [["Agree: both distrust the other side's intentions and both speak of the other as aggressive or controlling", 2], ["Differ: A sees American aid as generous friendship rejected by the Soviets, while B sees it as a means of dominating others with bases and atomic weapons", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying how each side explained the Cold War?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence of a traditionalist-style view that blamed Soviet expansion, but it is an opinion piece written to persuade and ignores Soviet security concerns", 2], ["B is useful as evidence of the Soviet view of American imperialism, but it is propaganda published by a state-controlled newspaper", 2], ["Own knowledge: the Marshall Plan, the Blockade and the atomic bomb show that each source has some basis; together they reflect mirror-image accusations that later historians had to weigh", 2]], modelAnswer: "Source A is useful as an example of a view, close to the later traditionalist interpretation, that blamed Soviet expansion, but it is an opinion piece written to persuade and ignores Soviet security fears. Source B is useful for the Soviet view of American imperialism, but it was published in a state-controlled newspaper and is propaganda. Each has some basis: the Soviets imposed communist governments in eastern Europe and blockaded Berlin, while the United States held the atomic bomb and aimed to increase its influence through the Marshall Plan. Together they show mirror-image accusations that historians have had to weigh, but neither is a reliable guide to the actual intentions of the leaders." }),
    ],
    hints: ["For (c), consider the purpose of each source and the control of the press."],
    explanation: "Both sources are invented: a commentator's article and a state newspaper article.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract(`The Cold War was made in Washington as much as in Moscow. The leaders of the United States emerged from the war with an economy twice as productive as any other, and with the only atomic weapon in the world. They believed that American prosperity depended on open markets abroad, and they set about creating a world order in which American goods and capital could move freely. The Soviet Union, weakened and without its own bomb, could only protect itself by tightening its grip on the lands to its west. Seen in this light, the measures of 1947 and 1948, which Western writers have long called a response to Soviet pressure, look rather like an expression of American ambition.`),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the origins of the Cold War to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the extract argues that the United States bore major responsibility, because its economic power and atomic monopoly drove it to expand, while Soviet actions were defensive", 2],
      ["Approach: a revisionist approach that stresses American economic motives and questions the conventional Western account", 2],
      ["Knowledge supporting: American economic strength, the atomic monopoly until 1949, the Marshall Plan's economic benefits, the Soviet experience of invasion", 2],
      ["Knowledge testing: Soviet methods in Eastern Europe (rigged elections, the Czech coup), Stalin's ambitions and the security fears of the United States, so the extract may be one-sided", 2],
    ],
    hints: ["Decide which school the extract resembles, and test it against evidence for Soviet responsibility too."],
    modelAnswer: "The extract argues that the United States bore major responsibility for the Cold War because its economic strength and atomic monopoly drove it to build an open world order, while the Soviet Union acted defensively. Its approach resembles revisionism: it stresses American economic motives and questions the usual Western account that the measures of 1947 and 1948 were a response to Soviet pressure. Some knowledge supports it. The American economy was far stronger, the United States held the atomic bomb until 1949, the Marshall Plan benefited American exports, and the Soviet Union had been invaded twice. But the extract is one-sided. It does not mention the rigged elections in Poland, the Czech coup of 1948 or Stalin's own ambitions, and it plays down real American fears about Soviet power in Europe. Post-revisionist historians would say that both sides shared responsibility.",
    explanation: "Credit identification of the interpretation and approach, supporting and testing knowledge. The extract is invented.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far were the personalities of the leaders the main reason for the outbreak of the Cold War?",
    levels: levels(12),
    points: [
      ["Personalities: Stalin's suspicion and ruthlessness, Truman's inexperience and bluntness compared with Roosevelt, Churchill's rhetoric", 3],
      ["Other factors: ideology, security fears (the buffer zone and the atomic bomb), economics (the Marshall Plan and reparations) and the bipolar structure", 3],
      ["Historians: traditionalists emphasise Stalin and ideology, revisionists American economic aims, post-revisionists security and misperception", 3],
      ["Judgement that weighs personality against structure and says whether another leader might have produced a different outcome", 3],
    ],
    hints: ["Ask whether a different leader would have made a difference."],
    modelAnswer: "The personalities of the leaders played a part in the Cold War, but they were not the main reason. Stalin's suspicion and ruthlessness made compromise difficult, and Truman's inexperience and more hostile stance after Roosevelt's death hardened relations. Churchill's Iron Curtain speech gave the division public form. But the structure of the post-war world counted for more. The war left two superpowers with opposed ideologies and no other powers to balance them, and each had security fears that the other found threatening: the Soviet need for a buffer after two invasions and the American atomic monopoly and fear of Soviet expansion. Economics also mattered, in the Marshall Plan and disputes over reparations. Historians differ: traditionalists blame Stalin and ideology, revisionists American economic aims, post-revisionists mutual misperception. I conclude that personality shaped the form and timing of the conflict, but the underlying causes were ideology, security and the structure of the post-war world, which any leaders would have found difficult to manage.",
    explanation: "Credit explained evidence on personality and other factors and a supported judgement.",
  });

  b.card("DEFINITION", "What is the traditionalist (orthodox) view of the Cold War?", "That Soviet expansion and communist ideology caused the Cold War and the West responded; dominant in the West in the 1940s and 1950s.");
  b.card("DEFINITION", "What is the revisionist view?", "That American economic and political expansion bears major responsibility, and Soviet actions were defensive; prominent from the 1960s (Williams, Alperovitz, Kolko).");
  b.card("DEFINITION", "What is the post-revisionist view?", "That both superpowers share responsibility through security fears and misperception (Gaddis 1972, Leffler 1992).");
  b.card("FACT", "What did Alperovitz argue in Atomic Diplomacy (1965)?", "That Truman used the atomic bomb partly to intimidate the Soviet Union.");
  b.card("FACT", "Why did revisionism arise in the 1960s?", "Disillusion with American foreign policy during the Vietnam War led historians to question American motives.");
  b.card("CONCEPT", "What is the security dilemma?", "When one side's defensive measures look threatening to the other, producing a spiral of mistrust.");
  b.card("CONCEPT", "Were tensions inherent in 1945?", "The bipolar world and opposed ideologies made rivalry likely, but the form and timing depended on decisions.");
  b.card("CONCEPT", "How can personalities explain the Cold War, and what are the limits?", "Stalin's suspicion and Truman's hard line hardened relations, but structure, ideology and security would have caused tension under other leaders.");
  b.card("CONCEPT", "Why do interpretations of the Cold War change over time?", "Historians reflect events of their own time (high Cold War, Vietnam, détente) and use new sources.");
});
