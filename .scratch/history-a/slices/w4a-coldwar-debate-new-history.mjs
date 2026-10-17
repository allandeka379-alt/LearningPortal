// W4a: ahist.coldwar.debate-new-history (Cambridge Paper 3 Topic 3 debate; A Level only).
import { concept, P, source, extract, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.coldwar.debate-new-history", { file: "coldwar/debate-new-history", keyPrefix: "coldwar.debate-new-history" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Why did the historical writing about the Cold War change after 1991?",
    ok: ["Soviet and East European archives opened to researchers", "Correct: new documents gave evidence from the other side."],
    no: [
      ["The Cold War began again and ended the study of history there", "The Cold War ended in 1991."],
      ["Western archives were closed and historians lost access", "Western archives remained open."],
      ["Governments forbade all writing about the Cold War", "No such ban existed in the West."],
    ],
    explanation: "After the collapse of the USSR in December 1991, archives in Moscow and Eastern Europe provided primary sources for the first time, though access was never complete.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did official Soviet historians usually explain the origins of the Cold War before 1991?",
    ok: ["As the result of American imperialism and Soviet encirclement", "Correct: the Soviet Union was presented as defending peace."],
    no: [
      ["As the result of Stalin's ambitions in Eastern Europe", "Official historians could not criticise Stalin's policies in this way."],
      ["As the result of an agreement between Britain and France", "This was not their explanation."],
      ["As an accident that nobody could explain or prevent", "They gave a clear political explanation."],
    ],
    explanation: "The party line blamed American capitalism and imperialism and presented Soviet actions as defensive. Historians were not free to question it.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which historian wrote We Now Know: Rethinking Cold War History (1997)?",
    ok: ["John Lewis Gaddis", "Correct: the book is a leading example of the New Cold War history."],
    no: [
      ["William Appleman Williams", "Williams wrote The Tragedy of American Diplomacy (1959)."],
      ["Gar Alperovitz", "Alperovitz wrote Atomic Diplomacy (1965)."],
      ["Herbert Feis", "Feis was a traditionalist writing in the 1950s."],
    ],
    explanation: "Gaddis used newly available evidence to argue that Stalin's ideology and personality were central to the origins of the Cold War.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Venona decrypts, released in 1995, reveal?",
    ok: ["The extent of Soviet espionage in the United States", "Correct: they were intercepted Soviet cables."],
    no: [
      ["The secret plans of Britain to attack the USSR in 1946", "They did not reveal such plans."],
      ["The location of the Polish officers killed at Katyn", "Katyn was acknowledged in 1990-92 through Soviet documents."],
      ["The decisions taken at Yalta and not published at the time", "They concerned espionage, not Yalta."],
    ],
    hints: ["Venona was an American project to read Soviet communications."],
    explanation: "Venona showed that Soviet intelligence had agents in the United States and Britain and learned atomic secrets, which confirmed some earlier Western suspicions.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did Geir Lundestad mean by 'empire by invitation'?",
    ok: ["American influence in Western Europe grew at governments' request", "Correct: he contrasted it with the imposed Soviet hold on the east."],
    no: [
      ["The United States invited the Soviet Union to rule Eastern Europe", "This is the opposite of his argument."],
      ["Britain gave its colonies to the United States as a gift", "He did not argue this."],
      ["The Soviet Union was invited by Poland to defend it from Germany", "He argued that the Soviet hold was imposed."],
    ],
    hints: ["The phrase compares American and Soviet influence in Europe."],
    explanation: "Lundestad argued that European governments sought American help against the Soviet threat and economic collapse. Critics say the description underplays American power.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which limitation applies to the use of Soviet archives by historians of the Cold War?",
    ok: ["Access has been partial, and documents may not show beliefs", "Correct: records are incomplete and need careful reading."],
    no: [
      ["All Soviet documents were published in full by 1992", "Many remain closed."],
      ["The archives contain only documents written by Western spies", "They contain Soviet state and party papers."],
      ["The archives have been proved to contain nothing of value", "They have been valuable."],
    ],
    hints: ["Think about completeness and what a document can prove."],
    explanation: "Some files remain closed or have been restricted again since the early 2000s, and minutes record what was said, not always what was thought.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment best describes how the New Cold War history differs from earlier schools?",
    ok: ["It used evidence from both sides and stressed Soviet ideology", "Correct: it also widened the study to the global Cold War."],
    no: [
      ["It used only American documents and ignored the Soviet Union", "It used documents from both sides."],
      ["It returned to the view of official Soviet historians", "It was often critical of Soviet policy."],
      ["It claimed that the Cold War had no causes that could be studied", "It examined causes with new evidence."],
    ],
    hints: ["Think about the sources and the focus on Stalin."],
    explanation: "Gaddis and others stressed Stalin's ideology; Westad stressed the global dimension. Critics note the limits and risks of triumphalism.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the 1990s the Soviet and Russian governments acknowledged that Polish officers at Katyn had been killed by the Soviet secret police.",
    answer: true,
    explanation: "True. The USSR admitted responsibility in 1990 and Russian documents were released in 1992, ending the earlier denial.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Since 1991 all Russian historians have agreed on the causes of the Cold War.",
    answer: false,
    explanation: "False. Russian historians have held varied views: some critical of Stalin, some stressing Western hostility and NATO expansion.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The New Cold War history argues that new archives remove the need for any further debate.",
    answer: false,
    hints: ["Think about the limits of archives."],
    explanation: "False. Archives are incomplete and documents need interpretation, so disagreement continues.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each historian with the contribution associated with the work.",
    pairs: [
      ["John Lewis Gaddis", "We Now Know (1997), stressing Stalin's role"],
      ["Vladislav Zubok and Constantine Pleshakov", "Inside the Kremlin's Cold War (1996)"],
      ["Odd Arne Westad", "The Global Cold War (2005), on the Third World"],
      ["Geir Lundestad", "The idea of 'empire by invitation'"],
    ],
    explanation: "Gaddis (1997), Zubok and Pleshakov (1996), Westad (2005) and Lundestad (1986).",
  });
  chrono(b, [
    "The Soviet government admits responsibility for Katyn",
    "The Soviet Union collapses",
    "Gaddis publishes We Now Know",
    "Westad publishes The Global Cold War",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1990 to 2005."],
    explanation: "1990; December 1991; 1997; 2005.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The New Cold War history is sometimes called {{blank:a}}-revisionism, and Westad's book of 2005 was called The {{blank:b}} Cold War.",
    blanks: [
      { id: "a", accepted: ["post-post"], choices: ["post-post", "pre", "anti", "neo"] },
      { id: "b", accepted: ["Global"], choices: ["Global", "Early", "Silent", "Forgotten"] },
    ],
    explanation: "Post-post-revisionism and The Global Cold War.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Soviet leader whose ideology and personality the New Cold War history often places at the centre of the origins of the conflict.",
    accepted: ["Joseph Stalin", "Stalin", "Josef Stalin"],
    wrong: ["Khrushchev"],
    explanation: "**Stalin**, whose suspicion and ambition are stressed by Gaddis and others.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the new sources that became available to historians of the Cold War after 1991.",
    points: ["Soviet state and party archives in Moscow", "Records from Eastern Europe and later from China", "Intelligence material such as the Venona decrypts and the Mitrokhin notes", "Documents collected and translated by the Cold War International History Project"],
    modelAnswer: "Soviet state and party archives in Moscow were opened. Records from Eastern Europe and later China became available. There were also intelligence materials such as the Venona decrypts and the Mitrokhin notes. The Cold War International History Project collected and translated documents.",
    explanation: "One mark for each source described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the new archives changed the argument that American economic expansion was the main cause of the Cold War.",
    points: [["Soviet documents showed that Stalin's ideology, suspicion and ambitions in Eastern Europe were important, which challenged one-sided revisionist claims", 2], ["They gave less support for the idea of American economic plans as the driving force, and so many historians gave more weight to Soviet policy", 2]],
    hints: ["Think about what the Soviet documents showed about Stalin."],
    modelAnswer: "Soviet documents showed that Stalin's ideology, suspicion and ambitions in Eastern Europe were important, which challenged one-sided revisionist claims. They gave less support for the idea of American economic plans as the driving force, and so many historians gave more weight to Soviet policy.",
    explanation: "Credit explained links.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain one strength and one weakness of the 'New' Cold War history.",
    points: [["Strength: it uses documents from both sides and draws attention to ideology, leaders and the global Cold War", 2], ["Weakness: archives are incomplete and documents are hard to interpret, and critics say it may be triumphalist and overstate Stalin's role", 2]],
    hints: ["Think about the sources and the possible bias."],
    modelAnswer: "A strength is that it uses documents from both sides and draws attention to ideology, leaders and the global Cold War. A weakness is that archives are incomplete and documents are hard to interpret, and critics say it may be triumphalist and overstate Stalin's role.",
    explanation: "Credit a developed strength and weakness.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a note of a private meeting of fictional Soviet officials, 1946, from an archive opened in the 1990s",
        "The Americans have the bomb and build bases near our borders. We must not allow our western frontier to be open again. Poland and Romania must have governments friendly to us. But we must avoid giving the capitalists a reason to attack us, and we should try to profit from their divisions."),
      "",
      source("Source B", "a fictional Western historian's article, 1997",
        "The new documents show that Stalin did not simply react to Western policy. He wanted to expand Soviet influence where he could do so safely, and his own beliefs made him assume that the capitalist world was hostile whatever the West did. The earlier view that the United States provoked the Cold War is hard to sustain."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What do the officials in Source A want to achieve in Poland and Romania?", points: ["Governments friendly to the Soviet Union", "A secure western frontier that is not open to attack"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B suggest about the aims of Soviet policy.", points: [["Agree: both suggest that the Soviet Union wanted to expand or secure influence in the west and was wary of the capitalist world", 2], ["Differ: A stresses defence against the American bomb and bases and caution, whereas B argues that Stalin's actions were not simply a reaction and were driven by ideology and ambition", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian assessing the New Cold War history?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as a primary record of private Soviet thinking, which was not available before 1991, but it is a note of one meeting and may not show the whole policy", 2], ["B is useful as an example of the interpretation of the New Cold War history, but it is a historian's argument that depends on selected documents", 2], ["Own knowledge: Soviet security fears, the Czech coup and Gaddis's book show that both defence and ambition were present; together the sources show the evidence and the argument built on it", 2]], modelAnswer: "Source A is useful as a record of private Soviet thinking, available only since the archives opened, and it combines security fears with the aim to control Poland and Romania. But it is the note of a single meeting and may not show the whole policy. Source B is useful as an example of the New Cold War interpretation, which gives weight to Stalin's ideology and ambition, but it is a historian's argument based on selected documents and could be questioned. Together they show how new evidence can support more than one reading: defence and ambition both appear, and the historian's judgement shapes the emphasis." }),
    ],
    hints: ["For (c), consider the difference between a primary document and a historian's interpretation."],
    explanation: "Both sources are invented: a note of a meeting and a historian's article.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract(`The opening of the archives has made it possible to hear the Kremlin speak in its own voice. What it says is not what many scholars of an earlier generation expected. Stalin did not respond to American pressure by improvising defences; he followed a view of the world formed long before 1945, in which the capitalist powers were bound to be enemies and the revolution had to be protected by extending Soviet control. Western policy, however clumsy, mattered less than the beliefs of a dictator who allowed no one to contradict him. The Cold War, in the end, was a contest between a free society and a closed one, and the evidence now shows who was more responsible for making it a contest.`),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the origins of the Cold War to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the extract argues that Soviet leaders, above all Stalin, bore the greater responsibility because his ideology and control drove policy more than Western actions", 2],
      ["Approach: a New Cold War history approach that relies on newly opened archives and prioritises the beliefs and personality of the dictator, with a contrast between free and closed societies", 2],
      ["Knowledge supporting: Stalin's suspicion and control, the imposition of communist governments in Eastern Europe, the new documents from Moscow", 2],
      ["Knowledge testing: Soviet security fears after two invasions, the American atomic monopoly, American economic aims, and the incompleteness of archives, so the judgement on blame may be too confident", 2],
    ],
    hints: ["Decide how the extract uses the archives, and test its confidence with evidence against."],
    modelAnswer: "The extract argues that the Cold War was driven mainly by Stalin's ideology and control, and that Western policy mattered less, so that the Soviet side bore the greater responsibility. Its approach is that of the New Cold War history: it relies on newly opened archives, gives priority to the beliefs of the dictator and presents the conflict as a contest between a free and a closed society, which suggests a moral judgement. Some knowledge supports it: Stalin was suspicious and allowed no contradiction, and communist governments were imposed in Poland, Romania and Czechoslovakia. But the extract is confident beyond the evidence. Soviet fears after two invasions, the American atomic monopoly and American economic interests also shaped events, and the archives are incomplete. Post-revisionist historians would say that both sides share responsibility, so the extract's judgement is one reading, not a settled conclusion.",
    explanation: "Credit identification of the interpretation and approach, supporting and testing knowledge. The extract is invented.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far have new archival sources changed historians' views on who was to blame for the Cold War?",
    levels: levels(12),
    points: [
      ["Changes: Soviet and East European archives showed Stalin's ideology and ambitions, supporting the stress on Soviet responsibility in the New Cold War history; the global dimension was added", 3],
      ["Continuities: earlier schools had already identified security and ideology, and post-revisionists had stressed both sides", 3],
      ["Limits: archives are incomplete, documents need interpretation, and interpretations reflect the historians' own time (triumphalism after 1991)", 3],
      ["Judgement on how far the evidence changed the balance of blame and the questions asked", 3],
    ],
    hints: ["Compare what historians thought before and after 1991, and say what stayed the same."],
    modelAnswer: "New archival sources changed historians' views to a considerable extent, but they did not settle the question of blame. After 1991, documents from Moscow, Eastern Europe and China gave evidence of the thinking on the other side. Historians such as Gaddis used them to argue that Stalin's ideology, suspicion and ambitions were central, which challenged the revisionist stress on American economic expansion, and Westad widened the subject to the global Cold War, including Africa. But there is also continuity. Traditionalists had long stressed Soviet ideology, and post-revisionists had already argued that security fears on both sides mattered. The archives are also incomplete and some are restricted again, documents need careful interpretation, and the New Cold War history has been criticised as triumphalist, written after the Western victory. I conclude that the sources changed the emphasis, moving many historians to give greater weight to Soviet ideology and leadership and to the global dimension, but they did not end the debate, because the evidence still supports more than one view.",
    explanation: "Credit explained change and continuity, use of evidence and a supported judgement.",
  });

  b.card("DEFINITION", "What is post-post-revisionism?", "The 'New' Cold War history of the 1990s, which used newly opened Soviet-bloc archives and often gave more weight to Stalin's ideology and role.");
  b.card("DEFINITION", "What was 'empire by invitation'?", "Geir Lundestad's argument (1986) that American influence in Western Europe grew largely because European governments asked for it.");
  b.card("FACT", "How did official Soviet historians explain the Cold War?", "As the result of American imperialism and encirclement, with the USSR defending peace.");
  b.card("FACT", "What was the thesis of We Now Know (1997)?", "Gaddis argued that the new evidence showed Stalin's ideology and personality were central to the origins of the Cold War.");
  b.card("FACT", "What was Venona?", "American decrypts of Soviet cables, released in 1995, which revealed the extent of Soviet espionage.");
  b.card("FACT", "What did Westad's The Global Cold War (2005) argue?", "That superpower intervention in the Third World, including Africa, was central to the Cold War.");
  b.card("CONCEPT", "What are the strengths of the New Cold War history?", "It uses sources from both sides, studies ideology and leaders, and widens the subject to the global Cold War.");
  b.card("CONCEPT", "What are the limits of the new archival evidence?", "Archives are incomplete, documents need interpretation, and historians may be influenced by the end of the Cold War.");
  b.card("CONCEPT", "How is the Cold War linked to southern Africa?", "Both sides supported rival movements in Angola, Mozambique and elsewhere, and the Rhodesian state presented itself as a defender of the West.");
});
