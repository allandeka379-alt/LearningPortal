// Slice W3a: Soviet expansion in Eastern Europe and the American response, 1945-1948 (ZIMSEC Cold War; 0470 B4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cold-war.eastern-europe-1948", { file: "cold-war/eastern-europe-1948", keyPrefix: "cold-war.eastern-europe-1948" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which country was given American aid under the Truman Doctrine in 1947?",
    options: [
      ["Greece", "Correct: with Turkey, to resist communist pressure."],
      ["Poland", "Poland was already under a Soviet-backed government."],
      ["Yugoslavia", "Yugoslavia was a communist state under Tito."],
      ["Czechoslovakia", "Moscow made Czechoslovakia refuse American aid."],
    ],
    answer: "A",
    explanation: "Truman asked Congress for aid to **Greece** and Turkey on 12 March 1947 after Britain could no longer support them.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which country's communists took full power in February 1948?",
    options: [
      ["Czechoslovakia", "Correct: the last democracy in Eastern Europe fell."],
      ["Greece", "In Greece the communists lost the civil war."],
      ["Hungary", "Hungary's communists took control gradually, completing it by 1949."],
      ["Austria", "Austria was occupied by four powers and did not become communist."],
    ],
    answer: "A",
    explanation: "The **Czech coup** of February 1948 shocked the West and helped persuade Congress to approve Marshall Aid.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main purpose of Marshall Aid?",
    options: [
      ["To rebuild Europe so that communism would be less attractive", "Correct: poverty was seen as a breeding ground for communism."],
      ["To pay the USSR reparations for its huge wartime losses", "No aid went to the USSR, which rejected the plan."],
      ["To fund the rearmament of a new West German army", "Marshall Aid was economic; West German rearmament came in the 1950s."],
      ["To buy African colonies from the bankrupt European powers", "The aid was not used to buy colonies."],
    ],
    answer: "A",
    explanation: "The USA believed that **prosperity** would protect Europe against communism; the aid also helped American trade.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which ministry did communists most want to control in the coalition governments of Eastern Europe?",
    options: [
      ["The Ministry of the Interior", "Correct: it controlled the police."],
      ["The Ministry of Agriculture", "Important, but it did not give control of arrests and security."],
      ["The Ministry of Culture", "Useful for propaganda, but it did not control the police."],
      ["The Ministry of Foreign Affairs", "Jan Masaryk, a non-communist, was Czech foreign minister until 1948."],
    ],
    answer: "A",
    explanation: "The **Interior Ministry** ran the police, which could arrest, frighten and investigate opponents.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which organisation did Stalin set up in 1947 to coordinate communist parties?",
    options: [
      ["Cominform", "Correct: the Communist Information Bureau, September 1947."],
      ["Comecon", "Comecon (1949) coordinated the economies of the communist states."],
      ["NATO", "NATO (1949) was the Western military alliance."],
      ["Warsaw Pact", "The Warsaw Pact was not formed until 1955."],
    ],
    answer: "A",
    explanation: "The **Cominform** (1947) coordinated communist parties; **Comecon** (1949) linked the economies.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was Yugoslavia different from the other communist states of Eastern Europe?",
    options: [
      ["Tito had freed it largely with his own forces and refused orders", "Correct: it was expelled from the Cominform in 1948."],
      ["It had voted to join the United States in 1946", "No such vote happened; Yugoslavia stayed communist."],
      ["It accepted Marshall Aid in 1948 and became capitalist", "Yugoslavia remained a communist state."],
      ["The Red Army occupied it for far longer than any other country in the region", "Tito's partisans did most of the fighting; the Red Army did not stay."],
    ],
    answer: "A",
    hints: ["Who liberated Yugoslavia from the Germans?"],
    explanation: "**Tito** owed little to the Red Army and kept Yugoslavia independent of Moscow.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Congress approve Marshall Aid in April 1948 after hesitating?",
    options: [
      ["The Czech coup made the communist threat seem real", "Correct: Czechoslovakia fell in February 1948."],
      ["Stalin agreed to take part in the plan", "Molotov walked out of the planning talks in 1947."],
      ["The aid had become much cheaper than first expected", "The cost, about 13 billion dollars, was large."],
      ["The Berlin Blockade had ended in victory", "The blockade began in June 1948 and ended in May 1949."],
    ],
    answer: "A",
    hints: ["Think about events in Eastern Europe in early 1948."],
    explanation: "The **Czech coup** of February 1948 made the communist threat seem real to Congress.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which piece of evidence best supports the view that Soviet expansion was defensive?",
    options: [
      ["Russia had been invaded through Poland in 1914 and 1941", "Correct: this supports Stalin's wish for a buffer zone."],
      ["Elections in Poland were rigged by the communists in January 1947", "This supports the view that the USSR imposed control by force."],
      ["Jan Masaryk was found dead in March 1948", "This suggests repression, not defence."],
      ["Opposition leaders in Bulgaria were arrested", "This shows aggressive methods of control."],
    ],
    answer: "A",
    hints: ["Which option explains Stalin's motives rather than his methods?"],
    explanation: "Past **invasions** support the defensive view; the other options are evidence for the view that control was imposed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Marshall Aid was offered to the whole of Europe, including the USSR and its satellites.",
    answer: true,
    explanation: "True. Stalin refused it and made the satellite states refuse too.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the Hungarian elections of November 1945 the communists won a clear majority.",
    answer: false,
    explanation: "False. The Smallholders' Party won; the communists then used the police and 'salami tactics' to break it up.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["George Marshall", "US Secretary of State who proposed aid for Europe"],
      ["Tito", "Communist leader of Yugoslavia who broke with Stalin"],
      ["Mátyás Rákosi", "Hungarian communist leader linked with 'salami tactics'"],
      ["Klement Gottwald", "Czechoslovak communist Prime Minister in 1948"],
    ],
    explanation: "Marshall (aid), Tito (Yugoslavia), Rákosi (Hungary), Gottwald (Czechoslovakia).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Comecon is founded",
      "The Truman Doctrine is announced",
      "Communists take power in Czechoslovakia",
      "The Cominform is founded",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["Cominform came in the same year as the Truman Doctrine."],
    explanation: "Truman Doctrine (March 1947); Cominform (September 1947); Czech coup (February 1948); Comecon (January 1949).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The policy of stopping communism from spreading to new countries was called {{blank:a}}. American aid to rebuild Europe was named after Secretary of State {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["containment"], choices: ["containment", "appeasement", "isolationism", "détente"] },
      { id: "b", accepted: ["George Marshall"], choices: ["George Marshall", "George Kennan", "Dean Acheson", "Cordell Hull"] },
    ],
    explanation: "**Containment** was the policy; **George Marshall** proposed the aid in June 1947.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the US President who announced the doctrine of March 1947.",
    accepted: ["Truman", "Harry Truman", "Harry S. Truman", "Harry S Truman", "President Truman"],
    wrong: ["Roosevelt", "Marshall"],
    explanation: "**Harry Truman** announced it to Congress on 12 March 1947.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how the communists took power in Czechoslovakia in 1948.",
    points: [
      "Communists were the largest party after the 1946 elections; Gottwald was Prime Minister.",
      "In February 1948 non-communist ministers resigned over communist control of the police.",
      "Communists organised demonstrations and armed workers' militias.",
      "President Beneš accepted a communist-dominated government / Masaryk found dead in March 1948.",
    ],
    modelAnswer: "After the 1946 elections the communists were the largest party and their leader Gottwald was Prime Minister. In February 1948 non-communist ministers resigned in protest at communist control of the police. The communists organised mass demonstrations and armed workers' militias, and President Beneš gave way, accepting a government dominated by the communists. In March the non-communist foreign minister Jan Masaryk was found dead.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Stalin refused Marshall Aid.",
    points: [
      "Identifies that he saw it as a way of spreading American influence.",
      "Explains that accepting it would open Eastern Europe to American trade and political pressure, weakening Soviet control of the buffer zone.",
      "Identifies distrust of American motives / 'dollar imperialism'.",
      "Explains that he feared dependence on the USA and that satellites would drift west, as Czechoslovakia's wish to accept showed.",
    ],
    hints: ["What would American money bring with it?"],
    modelAnswer: "Stalin believed Marshall Aid was a way of spreading American influence. If Eastern European states accepted dollars, they would trade with the West and could be pressured by the USA, weakening the buffer zone he wanted. He also distrusted American motives, calling the plan a form of economic imperialism, and feared that satellites such as Czechoslovakia, which wanted the aid, would drift towards the West.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the United States reacted to Soviet expansion in Europe.",
    points: [
      "Identifies the Truman Doctrine (March 1947).",
      "Explains that it committed the USA to containing communism, starting with aid to Greece and Turkey.",
      "Identifies Marshall Aid (proposed 1947, approved 1948).",
      "Explains that it rebuilt Western Europe so communism would be less attractive (about 13 billion dollars).",
      "Identifies the Berlin airlift / the formation of NATO (1949).",
      "Explains that the USA now committed itself militarily to defend Western Europe.",
    ],
    hints: ["Political, economic and military responses."],
    modelAnswer: "First, the Truman Doctrine of March 1947 committed the USA to containing communism: it gave aid to Greece and Turkey so that their governments could resist communist pressure. Second, Marshall Aid, approved by Congress in 1948, gave about 13 billion dollars to rebuild Western Europe, on the idea that prosperous people would not turn to communism. Finally, the USA answered the Berlin Blockade with an airlift and in 1949 joined NATO, committing itself to defend Western Europe militarily.",
    explanation: "Two marks per developed reaction.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in Soviet newspapers in 1948, described in words", "A fat businessman wearing a hat decorated with dollar signs holds out a bag of money to a thin European worker. Hidden behind his back, in his other hand, is a chain and padlock labelled \"Control\".", { described: true })}\n\n${source("Source B", "a speech by a fictional French trade-union leader to his members, 1948", "Our children are cold and our factories silent. If American dollars bring coal and bread, I will take them. I have not forgotten what fascism was, and I do not want any foreign master. But Moscow offers us slogans; Washington offers us wheat.")}`,
    hints: ["Consider who produced each source and for whom."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A about Marshall Aid?", points: [
        "The aid is a trick / bribe.",
        "Its real aim is American control over Europe.",
      ], explanation: "A supported message scores both marks." }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare the views of Marshall Aid in Sources A and B.", points: [
        "A: the aid hides American control.",
        "B: the aid meets real needs (coal, bread).",
        "Agreement: B also does not want a foreign master, so shares some suspicion.",
        "Overall judgement: mainly disagree.",
      ], explanation: "Specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that Marshall Aid was a form of American control? Use the sources and your own knowledge.", points: [
        "Source A argues it was control, but it is Soviet propaganda.",
        "Source B sees it as practical help, but hints at fear of a foreign master.",
        "Own knowledge for: it spread US influence and trade; it divided Europe.",
        "Own knowledge against: offered to all Europe; recipients kept their own governments.",
        "Provenance weighed.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A claims that Marshall Aid was a bribe hiding American control, but it is Soviet propaganda produced after Stalin had rejected the aid, so it reflects the Soviet line. Source B, from a worker's leader, treats the aid as practical help with coal and bread, though he also says he wants no foreign master, which shows some suspicion. My own knowledge supports part of A: the aid spread American influence, opened markets for American goods and helped divide Europe into two blocs. But the aid was offered to the whole of Europe, and the countries that took it kept their own elected governments. The sources show that some people feared control, but on balance Marshall Aid was economic help with political aims rather than direct control.", explanation: "Use both sources and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the Red Army with political methods."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Truman Doctrine.", points: [
        "Announced by Truman to Congress on 12 March 1947.",
        "Britain could no longer support Greece (civil war) and Turkey.",
        "400 million dollars of aid for Greece and Turkey.",
        "Promised support for free peoples resisting outside pressure / beginning of containment.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'The presence of the Red Army was the main reason why the USSR gained control of Eastern Europe by 1948.' How far do you agree?", points: [
        ["For: Red Army occupation 1944-45 protected communists and frightened opponents", 2],
        ["Against/also: control of interior ministries and police; salami tactics", 2],
        ["Against/also: rigged elections (Poland 1947) and the Czech coup (1948)", 2],
        ["Counter-example: Yugoslavia without the Red Army stayed independent; Czechoslovakia fell without Soviet troops present", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "The Red Army was the foundation of Soviet control. In 1944-45 it drove the Germans out of Eastern Europe and stayed, so local communists were protected and opponents knew that resistance was dangerous. Yugoslavia, which Tito had liberated largely without Soviet troops, is the exception that proves the point: it escaped Soviet control in 1948.\n\nHowever, the army alone did not create communist governments. Communists used political methods: joining coalitions, taking the interior ministries and the police, and slicing away their rivals. Elections were rigged, as in Poland in January 1947. In Czechoslovakia in February 1948 there were no Soviet troops in the country; the communists won through demonstrations, militias and pressure on President Beneš.\n\nThe Red Army was the main reason because it made the political methods possible and safe, but it worked together with them; without salami tactics and rigged elections, occupation would not have produced stable satellite governments.", explanation: "Levels: both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Salami tactics", "Gaining power step by step by removing opponents one group at a time; linked to the Hungarian communist Rákosi.");
  b.card("DEFINITION", "Satellite state", "A formally independent state whose government is controlled by a stronger power, as in Soviet Eastern Europe.");
  b.card("FACT", "When was the Truman Doctrine announced?", "12 March 1947 (aid to Greece and Turkey).");
  b.card("FACT", "How much Marshall Aid was given, and to whom?", "About 13 billion dollars, 1948-52, to sixteen Western European countries.");
  b.card("FACT", "When did communists take full power in Czechoslovakia?", "February 1948.");
  b.card("FACT", "Cominform and Comecon: dates and purposes", "Cominform 1947 (coordinate communist parties); Comecon 1949 (link the communist economies).");
  b.card("CONCEPT", "Why did the USA give Marshall Aid?", "To rebuild Europe so poverty would not drive people to communism, and to help American trade.");
  b.card("CONCEPT", "Why was Yugoslavia not a Soviet satellite?", "Tito freed it largely with his own partisans and refused Stalin's orders; expelled from Cominform in 1948.");
  b.card("CONCEPT", "Why was the Czech coup important?", "It ended the last Eastern European democracy and persuaded Congress to approve Marshall Aid.");
});
