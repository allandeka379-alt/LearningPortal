// Slice W3a: the Berlin Wall, 1961 (0470 B6).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.soviet-control.berlin-wall", { file: "soviet-control/berlin-wall", keyPrefix: "soviet-control.berlin-wall" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the border through Berlin closed?",
    options: [
      ["13 August 1961", "Correct: barbed wire first, then concrete."],
      ["24 June 1948", "This was the start of the Berlin Blockade."],
      ["9 November 1989", "This was when the Wall was opened."],
      ["26 June 1963", "This was Kennedy's speech in West Berlin."],
    ],
    answer: "A",
    explanation: "East German forces closed the border on **13 August 1961**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led East Germany when the Wall was built?",
    options: [
      ["Walter Ulbricht", "Correct: he pressed Khrushchev to close the border."],
      ["Erich Honecker", "Honecker led East Germany from 1971 to 1989."],
      ["Konrad Adenauer", "Adenauer was Chancellor of West Germany."],
      ["Willy Brandt", "Brandt was Mayor of West Berlin in 1961."],
    ],
    answer: "A",
    explanation: "**Walter Ulbricht** led the GDR in 1961.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main purpose of the Berlin Wall?",
    options: [
      ["To stop East Germans from leaving for the West", "Correct: whatever the official claims."],
      ["To protect East Berlin from a NATO invasion", "This was the official claim, not the real purpose."],
      ["To force the Western powers out of West Berlin", "That was the aim of the 1948 blockade."],
      ["To stop West Berliners from visiting the East", "West Berliners were not the problem; East German emigration was."],
    ],
    answer: "A",
    explanation: "The Wall stopped the **emigration** of East Germans through West Berlin.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was meant by the 'brain drain' from East Germany?",
    options: [
      ["The loss of skilled and educated people to the West", "Correct: doctors, engineers and teachers left."],
      ["The arrest of intellectuals and scientists by the secret police", "This happened, but it is not what the term means."],
      ["Western radio broadcasts into East Germany", "This was propaganda, not a brain drain."],
      ["The movement of West Germans to the East", "Very few moved in that direction."],
    ],
    answer: "A",
    explanation: "The **brain drain** was the loss of young, skilled people, which damaged the GDR's economy.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What did Khrushchev demand in his ultimatum of November 1958?",
    options: [
      ["That the Western powers leave West Berlin", "Correct: it was to become a 'free city'."],
      ["That the USA remove missiles from Turkey", "This was part of the 1962 Cuban settlement."],
      ["That West Germany leave NATO at once", "This was not the demand made in 1958."],
      ["That Germany be reunited under the GDR", "He demanded a change in Berlin's status."],
    ],
    answer: "A",
    explanation: "Khrushchev gave the West six months to **leave West Berlin**; the West refused.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the West not try to remove the Wall in 1961?",
    options: [
      ["It left Western rights in West Berlin untouched", "Correct: Kennedy would not risk war over East Berlin."],
      ["The West had agreed to the Wall at Potsdam", "There was no such agreement."],
      ["NATO did not yet exist", "NATO had existed since 1949."],
      ["West Berlin had already been handed over to the GDR in 1958", "West Berlin remained under Western protection."],
    ],
    hints: ["What did the Wall NOT touch?"],
    answer: "A",
    explanation: "The Wall was on East German ground and did not block **Western access** to West Berlin, so Kennedy accepted it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened at Checkpoint Charlie in October 1961?",
    options: [
      ["Soviet and American tanks faced each other", "Correct: both sides then withdrew."],
      ["The first escape through a tunnel took place", "This is not what Checkpoint Charlie is remembered for in 1961."],
      ["Kennedy made his 'Ich bin ein Berliner' speech", "The speech was given in June 1963."],
      ["The Wall was opened to crowds from both sides", "This happened in November 1989."],
    ],
    hints: ["It was a dispute over access for American officials."],
    answer: "A",
    explanation: "A dispute over access led to a **tank standoff** at Checkpoint Charlie in October 1961.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best supports the view that the Wall reduced tension in Europe?",
    options: [
      ["It ended the crisis over the refugee flow without war", "Correct: Berlin became less of a flashpoint."],
      ["It separated families for twenty-eight years", "This is a human cost, not a reduction in tension."],
      ["It became a symbol of communist failure", "This increased propaganda tension."],
      ["It led to the tank standoff at Checkpoint Charlie that October", "This was a moment of increased tension."],
    ],
    hints: ["Compare the years before and after 1961."],
    answer: "A",
    explanation: "Some historians argue that by solving the refugee problem the Wall **stabilised** Berlin and reduced the risk of war.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Berlin Wall was opened on 9 November 1989.",
    answer: true,
    explanation: "True. Germany was reunited on 3 October 1990.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Before 1961 the border between East and West Germany was open, so most refugees crossed the countryside.",
    answer: false,
    explanation: "False. The inner German border had been closed and fortified since 1952; Berlin was the main gap.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["GDR", "Communist East Germany"],
      ["FRG", "Democratic West Germany"],
      ["Checkpoint Charlie", "Best-known crossing point between East and West Berlin"],
      ["Death strip", "Cleared zone between the Wall's inner and outer barriers"],
    ],
    explanation: "GDR (German Democratic Republic), FRG (Federal Republic of Germany), Checkpoint Charlie (crossing point), death strip (border zone).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Kennedy speaks in West Berlin",
      "The Vienna summit",
      "Khrushchev's Berlin ultimatum",
      "The border through Berlin is closed",
    ],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["Kennedy met Khrushchev two months before the border closed."],
    explanation: "Ultimatum (November 1958); Vienna (June 1961); border closed (August 1961); Kennedy's speech (June 1963).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Kennedy met Khrushchev at the summit in {{blank:a}} in June 1961. East Germany officially called the Wall the Anti-{{blank:b}} Protection Rampart.",
    blanks: [
      { id: "a", accepted: ["Vienna"], choices: ["Vienna", "Geneva", "Paris", "Moscow"] },
      { id: "b", accepted: ["Fascist"], choices: ["Fascist", "Capitalist", "Imperialist", "NATO"] },
    ],
    explanation: "The **Vienna** summit (June 1961); the 'Anti-**Fascist** Protection Rampart' was the GDR's official name.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which US President spoke to crowds in West Berlin in June 1963?",
    accepted: ["Kennedy", "John F. Kennedy", "John Kennedy", "JFK", "John F Kennedy", "John Fitzgerald Kennedy"],
    wrong: ["Eisenhower"],
    explanation: "**John F. Kennedy**, on 26 June 1963.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how the Berlin Wall was built and strengthened.",
    points: [
      "In the early hours of 13 August 1961 troops and police closed the border with barbed wire and roadblocks.",
      "The wire was replaced by a concrete wall in the following days and months.",
      "Later a second wall was added, with a 'death strip' between.",
      "Watchtowers, searchlights, dogs and armed guards with orders to stop escapers.",
    ],
    modelAnswer: "In the early hours of 13 August 1961 East German troops and police closed the border through Berlin with barbed wire and roadblocks. Over the following days and months the wire was replaced by a concrete wall. Later the border was strengthened with a second wall and a cleared 'death strip' between them, guarded by watchtowers, searchlights, dogs and armed guards.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why West Berlin was a problem for East Germany before 1961.",
    points: [
      "Identifies West Berlin as an escape route.",
      "Explains that East Germans could cross freely within the city and fly to West Germany, so millions left.",
      "Identifies West Berlin as a 'shop window' for capitalism / centre of propaganda.",
      "Explains that its prosperity showed East Germans what they were missing and embarrassed the GDR.",
    ],
    hints: ["Think about people leaving and what they could see."],
    modelAnswer: "West Berlin was an escape route: East Germans could cross freely within the city and then fly to West Germany, and roughly 2.5 to 3 million left between 1949 and 1961. It was also a shop window for capitalism, where prosperous shops and Western radio showed East Germans what they were missing, which embarrassed a government that claimed communism was better.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the significance of the Berlin Wall for the Cold War.",
    points: [
      "Identifies that it stopped emigration.",
      "Explains that this stabilised the GDR's economy and secured Soviet control.",
      "Identifies that it reduced the danger of war over Berlin (some historians' view).",
      "Explains that the West accepted it, ending the Berlin crises of 1958-61.",
      "Identifies its value as Western propaganda / a symbol of division.",
      "Explains that a state imprisoning its own people suggested communism lacked support; its opening in 1989 symbolised collapse.",
    ],
    hints: ["Short-term and long-term significance."],
    modelAnswer: "In the short term the Wall stopped the flow of refugees, which allowed the GDR's economy to stabilise and strengthened Soviet control of East Germany. Some historians argue that it also reduced the danger of war, since the West accepted it and the crises over Berlin that had begun in 1958 died down. In the long term, however, it was a propaganda gift to the West: a state that had to wall in its own people seemed to admit that communism could not win support freely, and its opening on 9 November 1989 became the symbol of the collapse of Soviet control.",
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a poster of the kind displayed in East Berlin in late 1961, described in words", "A strong worker in overalls and a soldier stand side by side in front of a wall. On the far side, shadowy figures in top hats and military helmets, labelled \"Bonn militarists\" and \"NATO\", reach towards a map of the GDR. The slogan reads: \"Our frontier protects the peace\".", { described: true })}\n\n${source("Source B", "the diary of a fictional West Berlin schoolteacher, 20 August 1961", "My sister lives four streets away, on the other side. Today we stood at a window and waved, and her little boy did not understand why his aunt would not come over. The guards were bricking up the doorways of the houses on the border. They say it protects them from us. Then why are the guns pointing east?")}`,
    hints: ["What does the diarist notice about the guns?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A?", points: [
        "The Wall protects East Germany / peace from Western aggression.",
        "The West (West German militarists and NATO) is the threat.",
      ], explanation: "A supported message scores both." }),
      P.manual({ label: "(b)", marks: 4, stem: "How does Source B challenge the message of Source A?", points: [
        "B shows the Wall separating ordinary families, not stopping aggressors.",
        "B notes the guns point east, suggesting the Wall is aimed at East Germans.",
        "B questions the official claim of protection directly.",
        "Explains which source fits own knowledge (emigration as the real reason).",
      ], explanation: "Specific challenge with knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which source is more reliable about the purpose of the Wall? Explain your answer.", points: [
        "A: GDR propaganda presenting the official justification.",
        "Own knowledge: the official name 'Anti-Fascist Protection Rampart'; no Western attack was planned.",
        "B: private diary, no reason to deceive, eyewitness, but a West Berliner may be hostile.",
        "Own knowledge: the Wall was built to stop emigration of 2.5-3 million; this supports B.",
        "Each is useful for different purposes.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is East German propaganda; its purpose was to persuade people that the Wall protected peace against West German and NATO aggression, which matches the GDR's official name for it, the 'Anti-Fascist Protection Rampart'. But there was no Western plan to attack, and my own knowledge shows that the real reason was to stop the emigration of roughly 2.5 to 3 million East Germans. Source B is a private diary written a week after the border closed. A West Berliner might be hostile to the GDR, but a diary has little reason to deceive, and the writer's observation that the guns point east fits what we know about the Wall's purpose. Source B is therefore more reliable about the purpose of the Wall, while Source A is reliable only as evidence of how the GDR justified it.", explanation: "Provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh the refugee problem against Khrushchev's wider aims."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how the West reacted to the building of the Berlin Wall.", points: [
        "Protests, but no attempt to remove the Wall.",
        "Kennedy accepted it because Western rights in West Berlin were untouched (reported: 'better than a war').",
        "Tank standoff at Checkpoint Charlie, October 1961.",
        "Kennedy's visit and speech in West Berlin, June 1963.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'The Berlin Wall was built mainly because of the brain drain.' How far do you agree?", points: [
        ["For: loss of skilled people damaged the GDR economy", 2],
        ["Also: the total refugee flow (2.5-3 million) and the sharp rise in 1961", 2],
        ["Also: embarrassment / propaganda; West Berlin as shop window and spy centre", 2],
        ["Also: failure of Khrushchev's demands (1958, Vienna 1961); a way to solve Berlin without war", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The brain drain was a major reason. Many of the people leaving East Germany were young and skilled: doctors, engineers, teachers and skilled workers. Their loss damaged the economy, and the GDR could not afford to keep training people who then left for the West.\n\nBut the brain drain was part of a wider problem. The total number of refugees, roughly 2.5 to 3 million between 1949 and 1961, rose sharply in 1961, and every refugee was a propaganda defeat that suggested communism had failed. West Berlin's prosperity and its role as a centre for Western spies and radio added to the GDR's problems. Khrushchev had tried to solve the problem by forcing the West out of Berlin in 1958 and at Vienna in 1961, but failed; closing the border was a way to solve it without fighting the West.\n\nThe brain drain was the most damaging part of the refugee crisis, but the Wall was built mainly to stop emigration as a whole, because of its economic and propaganda costs, after other methods had failed.", explanation: "Levels: both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was the border through Berlin closed?", "13 August 1961.");
  b.card("FACT", "When was the Berlin Wall opened?", "9 November 1989.");
  b.card("DEFINITION", "Brain drain", "The loss of educated and skilled people who emigrate, as from East Germany before 1961.");
  b.card("FACT", "How many people left East Germany between 1949 and 1961?", "Roughly 2.5 to 3 million (historians' estimates).");
  b.card("CONCEPT", "Why was the Berlin Wall built?", "To stop East Germans, especially skilled workers, escaping to the West through West Berlin.");
  b.card("CONCEPT", "Why did Kennedy accept the Wall?", "It did not touch Western rights in West Berlin, and removing it risked war.");
  b.card("FACT", "What happened at Checkpoint Charlie in October 1961?", "Soviet and American tanks faced each other before both withdrew.");
  b.card("CONCEPT", "Why was the Wall a propaganda gift to the West?", "A state that had to wall in its own people seemed to admit communism lacked support.");
});
