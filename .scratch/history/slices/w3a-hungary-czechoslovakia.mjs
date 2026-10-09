// Slice W3a: Hungary 1956 and Czechoslovakia 1968 (0470 B6).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.soviet-control.hungary-czechoslovakia", { file: "soviet-control/hungary-czechoslovakia", keyPrefix: "soviet-control.hungary-czechoslovakia" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who became Prime Minister of Hungary during the rising of October 1956?",
    options: [
      ["Imre Nagy", "Correct: a reform communist, later executed in 1958."],
      ["János Kádár", "Kádár was installed by the USSR after the rising was crushed."],
      ["Mátyás Rákosi", "Rákosi, the hard-line Stalinist, had been removed in July 1956."],
      ["Alexander Dubček", "Dubček led Czechoslovakia in 1968."],
    ],
    answer: "A",
    explanation: "**Imre Nagy** became Prime Minister on 24 October 1956.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the Soviet Union when Czechoslovakia was invaded in 1968?",
    options: [
      ["Leonid Brezhnev", "Correct: the Brezhnev Doctrine is named after him."],
      ["Nikita Khrushchev", "Khrushchev was removed from power in 1964."],
      ["Joseph Stalin", "Stalin died in 1953."],
      ["Mikhail Gorbachev", "Gorbachev led the USSR from 1985."],
    ],
    answer: "A",
    explanation: "**Brezhnev** led the USSR from 1964 to 1982.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of Nagy's decisions most alarmed the USSR in 1956?",
    options: [
      ["Leaving the Warsaw Pact", "Correct: announced on 1 November 1956."],
      ["Pulling down the statue of Stalin", "Crowds did this on 23 October; it was not a government decision."],
      ["Joining Comecon", "Hungary was already a member of Comecon."],
      ["Inviting Soviet troops into Budapest", "Nagy asked Soviet troops to leave."],
    ],
    answer: "A",
    explanation: "Leaving the **Warsaw Pact** threatened the whole Soviet defence system in Eastern Europe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Dubček mean by 'socialism with a human face'?",
    options: [
      ["Communism with more freedom and less censorship", "Correct: the aim of the Prague Spring."],
      ["Ending communism and joining NATO", "Dubček promised to stay communist and in the Warsaw Pact."],
      ["Returning to Stalin's methods of rule", "Dubček wanted to move away from them."],
      ["Uniting Czechoslovakia with West Germany", "This was never proposed."],
    ],
    answer: "A",
    explanation: "Dubček wanted to keep communism but with **freedom of speech**, less censorship and less secret-police power.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What event in February 1956 raised hopes of reform in Eastern Europe?",
    options: [
      ["Khrushchev's Secret Speech attacking Stalin", "Correct: it began de-Stalinisation."],
      ["The building of the Berlin Wall", "The Wall was built in 1961."],
      ["The founding of the Warsaw Pact", "The Warsaw Pact was formed in May 1955."],
      ["The Soviet invasion of Czechoslovakia", "This came in 1968 and crushed reform."],
    ],
    answer: "A",
    explanation: "The **Secret Speech** criticised Stalin's crimes and suggested change was possible.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the West not send help to Hungary in 1956?",
    options: [
      ["It would not risk war with the USSR inside the Soviet sphere", "Correct: and Suez divided the West at the time."],
      ["Nagy had asked the West to stay out", "Nagy appealed to the United Nations for help."],
      ["Hungary was already a member of NATO", "Hungary was in the Warsaw Pact."],
      ["The rising had ended peacefully before any Western help could arrive", "It was crushed by force on 4 November."],
    ],
    answer: "A",
    hints: ["What else was happening in the Middle East in November 1956?"],
    explanation: "The USA would not risk **nuclear war** over Hungary, and the Suez Crisis distracted Britain and France.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Brezhnev Doctrine claim?",
    options: [
      ["The Warsaw Pact could intervene where communism was threatened", "Correct: used to justify the 1968 invasion."],
      ["Each communist state could choose its own path freely, without interference", "This is closer to Gorbachev's later policy."],
      ["The USSR would never use force in Eastern Europe", "It claimed the opposite."],
      ["Germany should be reunited as a neutral state", "This was not part of the doctrine."],
    ],
    answer: "A",
    hints: ["It was announced after the invasion of Czechoslovakia."],
    explanation: "The **Brezhnev Doctrine** claimed a right to intervene to protect socialism in any member state.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which was a key DIFFERENCE between the Hungarian Rising and the Prague Spring?",
    options: [
      ["Czechoslovaks mostly used non-violent resistance", "Correct: Hungarians fought, and thousands died."],
      ["Only Hungary's leader was a communist", "Both Nagy and Dubček were communists."],
      ["The West intervened only in Czechoslovakia", "The West intervened in neither."],
      ["Only Czechoslovakia resented Soviet control", "Resentment of Soviet control caused both crises."],
    ],
    answer: "A",
    hints: ["Think about how people responded to the tanks."],
    explanation: "In Hungary there was armed resistance; in Czechoslovakia people mainly used **non-violent** protest.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Dubček promised that Czechoslovakia would remain in the Warsaw Pact.",
    answer: true,
    explanation: "True. This is a key difference from Nagy, who announced Hungary's withdrawal in 1956.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Imre Nagy was allowed to go into exile in the West after the Hungarian Rising.",
    answer: false,
    explanation: "False. Nagy was arrested and, in 1958, secretly tried and executed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with his country and role.",
    pairs: [
      ["János Kádár", "Installed as Hungary's leader by the USSR in 1956"],
      ["Antonín Novotný", "Hard-line Czechoslovak leader replaced in January 1968"],
      ["Gustáv Husák", "Replaced Dubček in April 1969"],
      ["Mátyás Rákosi", "Stalinist ruler of Hungary removed in July 1956"],
    ],
    explanation: "Kádár (Hungary after 1956), Novotný (Czechoslovakia before 1968), Husák (after Dubček), Rákosi (Hungary before 1956).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Action Programme is published",
      "Soviet forces attack Budapest",
      "Khrushchev's Secret Speech",
      "Warsaw Pact forces enter Czechoslovakia",
    ],
    right: POS,
    rightIndex: [2, 1, 0, 3],
    hints: ["The Action Programme was published in the spring before the invasion."],
    explanation: "Secret Speech (February 1956); Budapest attacked (4 November 1956); Action Programme (April 1968); invasion (20-21 August 1968).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The period of reform in Czechoslovakia in 1968 is known as the Prague {{blank:a}}. At the same time as the Hungarian Rising, Britain and France were involved in the {{blank:b}} Crisis.",
    blanks: [
      { id: "a", accepted: ["Spring"], choices: ["Spring", "Summer", "Rising", "Revolution"] },
      { id: "b", accepted: ["Suez"], choices: ["Suez", "Cuban", "Berlin", "Korean"] },
    ],
    explanation: "The **Prague Spring** (1968); the **Suez** Crisis (October-November 1956).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the leader of the Czechoslovak Communist Party during the Prague Spring.",
    accepted: ["Dubcek", "Dubček", "Alexander Dubcek", "Alexander Dubček", "Alexandr Dubček", "Alexandr Dubcek"],
    wrong: ["Nagy"],
    explanation: "**Alexander Dubček** became party leader in January 1968.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the main events of the Hungarian Rising.",
    points: [
      "23 October: students and workers demonstrated in Budapest; Stalin's statue pulled down; secret police fired.",
      "Nagy became Prime Minister; Soviet troops withdrew from Budapest.",
      "Nagy promised free elections and other freedoms, and on 1 November announced withdrawal from the Warsaw Pact.",
      "4 November: Soviet forces attacked Budapest and crushed the rising; Kádár installed.",
    ],
    modelAnswer: "On 23 October 1956 students and workers demonstrated in Budapest, pulled down the statue of Stalin and fought the secret police after it fired on them. Nagy became Prime Minister and Soviet troops withdrew from the city. Nagy promised free elections and other freedoms, and on 1 November announced that Hungary would leave the Warsaw Pact. On 4 November Soviet forces returned, attacked Budapest and crushed the rising, and Kádár was installed as leader.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the USSR invaded Czechoslovakia in 1968.",
    points: [
      "Identifies fear that the reforms would spread.",
      "Explains that leaders in the USSR, East Germany and Poland feared their own people would demand the same freedoms.",
      "Identifies the end of censorship / loss of party control.",
      "Explains that free discussion threatened the Communist Party's monopoly of power and might eventually threaten Warsaw Pact unity.",
    ],
    hints: ["Dubček stayed in the Pact, so the fear was something else."],
    modelAnswer: "Brezhnev feared that the Prague Spring would spread: the leaders of East Germany and Poland in particular warned that their own people would demand the same freedoms. With censorship ended, critics could openly attack the Communist Party, and the USSR feared that the party would lose its monopoly of power and that Czechoslovakia might eventually drift away from the Warsaw Pact, even though Dubček promised to stay.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why there was opposition to Soviet control in Hungary in 1956.",
    points: [
      "Identifies the harsh rule of Rákosi and the secret police.",
      "Explains that arrests and fear made the regime hated.",
      "Identifies poverty and Soviet economic exploitation.",
      "Explains that low living standards were blamed on unfair trade with the USSR.",
      "Identifies de-Stalinisation (Secret Speech; Poland's reforms).",
      "Explains that this gave Hungarians hope that the USSR would accept change.",
    ],
    hints: ["Long-term grievances and a short-term trigger."],
    modelAnswer: "Hungarians hated the Stalinist rule of Rákosi, whose secret police imprisoned thousands and created fear. Living standards were low, and many blamed the USSR for taking Hungarian goods and resources on unfair terms. Catholic and nationalist feeling also made many resent communist and Soviet control. The trigger was de-Stalinisation: Khrushchev's Secret Speech of February 1956, the removal of Rákosi and the reforms in Poland gave Hungarians hope that the USSR would now accept change.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a statement of the kind broadcast by Soviet radio in August 1968", "At the request of loyal Czechoslovak communists, the fraternal armies of the socialist countries have come to defend socialism against counter-revolutionaries backed by West German imperialists. The Czechoslovak people will thank their friends for protecting their freedom.")}\n\n${source("Source B", "a description in words of a photograph of the kind taken in Prague in August 1968", "A young man stands in front of a tank, his arms spread wide. Around him a crowd holds Czechoslovak flags. On the side of the tank someone has painted, in Russian, the words \"Go home\". The soldiers on the tank look young and uncertain.", { described: true })}`,
    hints: ["Who would broadcast Source A, and why?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reasons for the invasion does Source A give?", points: [
        "To defend socialism / respond to a request from loyal communists.",
        "To stop counter-revolutionaries supported by the West.",
      ], explanation: "Two reasons from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B challenge the claims of Source A?", points: [
        "Challenge: the crowd and the 'Go home' slogan show the invasion was not welcomed.",
        "Challenge: ordinary people, not Western agents, are resisting.",
        "Partial: B shows only one scene; it does not disprove that some communists asked for help.",
        "Judgement on how far.",
      ], explanation: "Specific comparison with a judgement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How reliable is Source A as an explanation of why Czechoslovakia was invaded?", points: [
        "Provenance: Soviet state radio, propaganda justifying the invasion to its audience.",
        "Own knowledge: Dubček was a communist and promised to stay in the Warsaw Pact; no Western plot was shown.",
        "Own knowledge: the real fear was reform spreading (East Germany, Poland).",
        "Some truth: some hard-liners did want intervention / the Brezhnev Doctrine expressed real Soviet thinking.",
        "Contradicted by the non-violent resistance shown in Source B.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A comes from Soviet state radio, so its purpose was to justify the invasion to its listeners; it calls the invading armies 'fraternal' and claims the people will thank them. My own knowledge shows that much of this is unreliable. Dubček was a communist who promised to stay in the Warsaw Pact, and there was no evidence of a Western plot. Source B, showing crowds telling the soldiers to go home, and the widespread non-violent resistance I know about, contradict the claim that the invasion was welcome. However, the source does reflect real Soviet thinking: some hard-line Czechoslovak communists did want intervention, and the claim to be defending socialism became the Brezhnev Doctrine. So it is reliable as evidence of how the USSR justified the invasion, but not as an accurate explanation of why it happened, which was fear that reform would spread.", explanation: "Provenance and content against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), organise by theme: causes, aims, events, results."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the reforms of the Prague Spring.", points: [
        "Dubček became party leader in January 1968.",
        "Censorship was reduced / freedom of speech and the press.",
        "Freedom to travel abroad; less power for the secret police.",
        "Action Programme (April 1968): more power for parliament, some economic reform; stay in the Warsaw Pact.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How similar were the Hungarian Rising and the Prague Spring, and the Soviet reactions to them?", points: [
        ["Similar causes: resentment of Soviet control, low living standards, hopes of reform", 2],
        ["Similar outcome: crushed by Soviet-led force; reformer replaced by a loyal leader; West did nothing", 2],
        ["Different aims: Nagy left the Warsaw Pact; Dubček stayed in it", 2],
        ["Different resistance and outcome: armed fighting and thousands killed; mainly non-violent; Nagy executed, Dubček survived", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The two crises were similar in their causes. In both countries people resented Soviet control, the secret police and low living standards, and both reform movements were led by communists hoping for a more open system. The outcomes were also similar: Soviet-led forces restored control, the reformer was replaced by a leader loyal to Moscow (Kádár, then Husák), and the West protested but did nothing.\n\nHowever, there were important differences. Nagy went further: he promised free elections and announced that Hungary would leave the Warsaw Pact, while Dubček insisted that Czechoslovakia would stay communist and in the Pact. Hungarians fought the Soviet army, and about 2,500 were killed; in 1968 resistance was mainly non-violent. Nagy was executed, while Dubček was demoted and survived.\n\nOverall the crises were similar in cause and result, but different in aims and methods. The differences explain why 1956 was far bloodier, while the similarities show that in both cases the USSR would not allow a satellite to choose its own path.", explanation: "Levels: both similarities and differences with a judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did the Hungarian Rising begin?", "23 October 1956, with demonstrations in Budapest.");
  b.card("FACT", "When did Soviet forces crush the Hungarian Rising?", "From 4 November 1956; Kádár installed, Nagy executed in 1958.");
  b.card("FACT", "When did the Warsaw Pact invade Czechoslovakia?", "The night of 20-21 August 1968.");
  b.card("DEFINITION", "Prague Spring", "Dubček's reforms in Czechoslovakia in 1968, ended by the Warsaw Pact invasion.");
  b.card("DEFINITION", "Brezhnev Doctrine", "Soviet claim (1968) of a right to intervene in any communist state where communism was threatened.");
  b.card("DEFINITION", "De-Stalinisation", "Khrushchev's criticism of Stalin's crimes from 1956 and easing of some harsh policies.");
  b.card("CONCEPT", "Why did the USSR crush Hungary in 1956?", "Nagy announced free elections and that Hungary would leave the Warsaw Pact.");
  b.card("CONCEPT", "Main difference between Nagy and Dubček?", "Nagy took Hungary out of the Warsaw Pact; Dubček promised to stay in it.");
  b.card("CONCEPT", "Why did the West not help Hungary in 1956?", "It would not risk war with the USSR, and the Suez Crisis divided and distracted the West.");
});
