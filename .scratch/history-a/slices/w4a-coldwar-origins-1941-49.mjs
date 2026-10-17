// W4a: ahist.coldwar.origins-1941-49 (Cambridge Paper 3 Topic 3 context; A Level only).
import { concept, P, source, extract, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.coldwar.origins-1941-49", { file: "coldwar/origins-1941-49", keyPrefix: "coldwar.origins-1941-49" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which wartime conference of February 1945 agreed to divide Germany into zones and to hold free elections in liberated Europe?",
    ok: ["Yalta", "Correct: Roosevelt, Churchill and Stalin met there."],
    no: [
      ["Potsdam", "Potsdam took place in July-August 1945."],
      ["Versailles", "Versailles was the peace conference of 1919."],
      ["Munich", "Munich was the conference of 1938 over the Sudetenland."],
    ],
    explanation: "At Yalta (4-11 February 1945) the Allies agreed on the zones of occupation and the Declaration on Liberated Europe.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the Truman Doctrine of March 1947?",
    ok: ["A promise of American help to peoples resisting communism", "Correct: first applied to Greece and Turkey."],
    no: [
      ["A plan to rebuild the economies of all European states", "That was the Marshall Plan."],
      ["A military alliance of Western states against the USSR", "That was NATO in 1949."],
      ["A decision to divide Germany into four occupation zones", "That was agreed at Yalta and Potsdam in 1945."],
    ],
    explanation: "Truman asked Congress for US\\$400 million for Greece and Turkey and declared that the United States would support free peoples resisting subjugation. It is the basis of containment.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Soviet Union block routes into West Berlin in June 1948?",
    ok: ["It wished to stop the creation of a separate West German state", "Correct: it reacted to the new currency in the Western zones."],
    no: [
      ["It wished to help the Western powers to supply the city", "The Blockade was meant to cut supplies."],
      ["It wished to punish East Germany for rising against Soviet rule", "East Germany did not yet exist as a state."],
      ["It wished to force the United States to leave the United Nations", "The Blockade was not aimed at the UN."],
    ],
    explanation: "Stalin feared a revived West Germany. The introduction of the Deutschmark in the Western zones in June 1948 led him to try to force the Western powers out of Berlin.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the main purpose of NATO, formed in April 1949?",
    ok: ["To defend its members, an attack on one being an attack on all", "Correct: it was a defensive alliance."],
    no: [
      ["To unite Germany under a single government chosen by all four powers", "NATO did not decide the German question."],
      ["To provide economic aid for the rebuilding of Eastern Europe", "NATO was a military alliance."],
      ["To replace the United Nations as the main organisation for peace", "NATO did not replace the UN."],
    ],
    hints: ["Think about the first word of its name: North Atlantic Treaty Organization."],
    explanation: "Twelve states signed the North Atlantic Treaty on 4 April 1949. The Soviet bloc later answered with the Warsaw Pact in 1955.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Stalin refuse to let eastern European states take part in the Marshall Plan?",
    ok: ["He saw it as a way for the USA to gain influence over them", "Correct: he feared economic and political dependence on America."],
    no: [
      ["He thought that Eastern Europe had no need of any outside aid", "Eastern Europe was badly damaged."],
      ["He wished to leave the countries to be rebuilt by Britain", "He did not wish to rely on Britain."],
      ["He had promised that the aid would be sent by the Soviet army", "He did not make such a promise."],
    ],
    hints: ["Think about the conditions that might come with American aid."],
    explanation: "Marshall aid required cooperation and openness. The Soviet leadership regarded it as dollar imperialism and in response created Comecon in 1949.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which fact best supports the view that Stalin's actions in Eastern Europe were mainly defensive?",
    ok: ["The USSR had been invaded twice in thirty years from the west", "Correct: a buffer zone offered security."],
    no: [
      ["Communist parties took power in Poland, Hungary and Czechoslovakia", "This is used to show Soviet expansion."],
      ["Elections in Poland in 1947 were rigged to help the communists", "This shows the use of force and fraud."],
      ["The Cominform was set up in 1947 to direct communist parties", "This is used to show Soviet control."],
    ],
    hints: ["Which fact explains Soviet fear rather than Soviet control?"],
    explanation: "Historians who stress Soviet security needs point to the invasions of 1914 and 1941. Others say that the methods used in Eastern Europe went beyond security.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the Berlin Airlift is best supported by the evidence?",
    ok: ["It showed Western determination without starting a war", "Correct: the Blockade ended in May 1949 without fighting."],
    no: [
      ["It led to the withdrawal of the Western powers from Berlin", "They remained in the city."],
      ["It caused the immediate start of fighting between the superpowers", "No direct fighting occurred."],
      ["It proved that the Soviet Union would never negotiate over Germany", "Talks continued, and the Blockade was lifted."],
    ],
    hints: ["Think about how the crisis ended."],
    explanation: "Supplies were flown in for about eleven months, and Stalin lifted the Blockade on 12 May 1949. The crisis also pushed Western states towards NATO.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Winston Churchill gave his 'iron curtain' speech at Fulton, Missouri, in March 1946.",
    answer: true,
    explanation: "True. He described an iron curtain dividing Europe, and the speech was widely read as a call for Western firmness.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Western Allies opened a second front in France in 1942, as Stalin had asked.",
    answer: false,
    explanation: "False. The landing in Normandy took place in June 1944; Stalin had pressed for a second front from 1941.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "All historians agree that the Cold War began at Yalta in February 1945.",
    answer: false,
    hints: ["Think of the different dates given for the start."],
    explanation: "False. Historians date the start differently, from the wartime tensions through 1945 and 1946-47 to the crises of 1948-49, depending on how they explain the causes.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its date.",
    pairs: [
      ["Yalta Conference", "February 1945"],
      ["Truman Doctrine", "March 1947"],
      ["Communist takeover in Czechoslovakia", "February 1948"],
      ["NATO formed", "April 1949"],
    ],
    explanation: "Yalta (4-11 February 1945), the Truman Doctrine (12 March 1947), Czechoslovakia (February 1948) and NATO (4 April 1949).",
  });
  chrono(b, [
    "The Potsdam Conference",
    "Churchill's Iron Curtain speech",
    "The Marshall Plan is announced",
    "The Berlin Blockade begins",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1945 to 1948."],
    explanation: "July-August 1945; March 1946; June 1947; June 1948.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The American policy of preventing the spread of communism to new countries is called {{blank:a}}, and the Soviet economic council set up in 1949 was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["containment"], choices: ["containment", "appeasement", "isolation", "collectivisation"] },
      { id: "b", accepted: ["Comecon"], choices: ["Comecon", "Cominform", "NATO", "Comintern"] },
    ],
    explanation: "Containment shaped the Truman Doctrine; Comecon (January 1949) answered the Marshall Plan. The Cominform (1947) coordinated communist parties.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the American Secretary of State after whom the plan for European economic recovery was named.",
    accepted: ["George Marshall", "Marshall", "George C. Marshall"],
    wrong: ["Harry Truman"],
    explanation: "**George Marshall**, whose offer of aid was announced in June 1947.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main disagreements between the Soviet Union and the Western Allies in 1945.",
    points: ["The governments and elections in Poland and Eastern Europe, where the West wanted free elections and Stalin wanted friendly governments", "The treatment of Germany, including reparations and the zones", "Distrust over the atomic bomb, which the Americans had developed in secret", "Earlier grievances such as the delay in opening a second front and the Katyn graves"],
    modelAnswer: "The Allies disagreed about the governments and elections in Poland and Eastern Europe, where the West wanted free elections and Stalin wanted friendly governments. They disagreed about the treatment of Germany, including reparations and the zones. There was distrust over the atomic bomb, which the Americans had developed in secret. Earlier grievances, such as the delay in opening a second front and the Katyn graves, added to the suspicion.",
    explanation: "One mark for each disagreement described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Marshall Plan increased tension between East and West.",
    points: [["It strengthened Western European economies and bound them to the United States, which the Soviet Union saw as a threat to its influence", 2], ["Stalin refused the Plan for Eastern Europe and created Comecon and the Cominform, which hardened the division of Europe into two blocs", 2]],
    hints: ["Think of what the Plan did and how Stalin responded."],
    modelAnswer: "It strengthened Western European economies and bound them to the United States, which the Soviet Union saw as a threat to its influence. Stalin refused the Plan for Eastern Europe and created Comecon and the Cominform, which hardened the division of Europe into two blocs.",
    explanation: "Credit explained links.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Berlin Blockade failed.",
    points: [["The Western powers organised the Airlift, which supplied West Berlin with food and fuel for nearly a year, so the city did not surrender", 2], ["The Blockade made the Western powers more united and led to NATO, so Stalin gained the opposite of what he wanted and ended the Blockade in May 1949", 2]],
    hints: ["Think about the Airlift and the Western response."],
    modelAnswer: "The Western powers organised the Airlift, which supplied West Berlin with food and fuel for nearly a year, so the city did not surrender. The Blockade also made the Western powers more united and led to NATO, so Stalin gained the opposite of what he wanted and ended the Blockade in May 1949.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a private memorandum by a fictional Western diplomat in Moscow, 1946",
        "The leaders of the Soviet Union regard the outside world as hostile. They will use every means short of war to extend their influence, and they will not be moved by friendly words. We must be firm, patient and watchful, and we must help those states that wish to remain free."),
      "",
      source("Source B", "a report by a fictional Soviet official in Washington to his government, 1946",
        "The ruling circles of the United States are preparing for world leadership. They are building a large navy and air force, they hold the atomic bomb, and they are looking for bases around our borders. Our country must be vigilant and strengthen its defences."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What advice does Source A give to Western governments?", points: ["Be firm, patient and watchful", "Help states that wish to remain free"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the attitude of each side towards the other.", points: [["Agree: both see the other side as hostile and expansionist, and both recommend strength or vigilance", 2], ["Differ: A sees the Soviet Union as ideologically driven and recommends containment short of war, whereas B sees American power as aimed at world leadership and recommends strengthening defences", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the origins of the Cold War?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as a private report that shaped Western thinking, but it is one diplomat's reading and may exaggerate Soviet hostility", 2], ["B is useful for Soviet fears of American power, but it is a report written to please the leadership and may exaggerate American intentions", 2], ["Own knowledge: the Long Telegram and Novikov report of 1946, the atomic bomb and the Truman Doctrine fit both; together they show mirror-image suspicions", 2]], modelAnswer: "Source A is useful as a private view from a Western diplomat in 1946, similar to the Long Telegram that shaped containment, but it is one man's reading and may exaggerate Soviet hostility. Source B is useful for showing Soviet fears of American power, similar to the Novikov report, but as a report for the leadership it may exaggerate American intentions to please its readers. Together they show mirror-image suspicion, which historians use to argue that both sides misread each other, but neither source shows what the other side actually intended." }),
    ],
    hints: ["For (c), consider the purpose of each report and whether each is balanced."],
    explanation: "Both sources are invented: a Western diplomat's memorandum and a Soviet official's report.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract(`By 1947 the pattern was set. A Soviet leadership convinced that its security required control of the lands to its west met a Western alliance that had decided that the price of peace was strength. Neither side wished for a great war, but each took the other's defensive measures as proof of hostile intent. The Marshall Plan appeared to Moscow as a means of buying the loyalty of Europe; the consolidation of eastern Europe appeared to Washington as the first stage of a drive to the Atlantic. The tragedy was that policies adopted for security produced exactly the insecurity they were meant to remove.`),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the origins of the Cold War to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the Cold War arose from mutual misperception and a security dilemma, in which each side's defensive actions looked hostile to the other, rather than from the aggression of one side", 2],
      ["Approach: the historian emphasises security and fear on both sides and looks at how each side saw the other's actions, balancing responsibility", 2],
      ["Knowledge supporting: Soviet concern for a buffer zone, the Marshall Plan seen as influence, the Long Telegram and Novikov reports", 2],
      ["Knowledge testing: the extract may underplay ideology and the methods used in Eastern Europe (rigged elections, the Czech coup) and the role of particular leaders", 2],
    ],
    hints: ["Decide whether the historian blames one side, and test the argument against evidence of aggressive as well as defensive acts."],
    modelAnswer: "The extract argues that the Cold War arose from mutual misperception, a security dilemma in which each side's defensive measures looked hostile to the other. Its approach is balanced: it stresses fear and security on both sides and examines how each read the other's actions, rather than blaming one. This fits some of the evidence. Stalin did want a buffer in eastern Europe after two invasions, the Soviet Union saw the Marshall Plan as a means of influence, and the Long Telegram and the Novikov report show each side assuming the worst. However, the extract may underplay ideology and the methods used in eastern Europe, such as the rigged elections in Poland and the Czech coup of 1948, which Western leaders saw as aggression, and the part of individual leaders such as Stalin and Truman. It is a useful but partial explanation.",
    explanation: "Credit identification of the interpretation and approach, supporting and testing knowledge. The extract is invented.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far was the Berlin Blockade the main turning point in the development of the Cold War between 1945 and 1949?",
    levels: levels(12),
    points: [
      ["For: it was the first direct confrontation, hardened the division of Germany, and led to NATO and the two German states", 3],
      ["Against: earlier turning points - Yalta and Potsdam disagreements, the Iron Curtain speech, the Truman Doctrine and Marshall Plan, and the Czech coup", 3],
      ["The significance of the Blockade: the Airlift, the end without war, Western unity and the Soviet failure", 3],
      ["Judgement that compares the Blockade with at least one other turning point on criteria such as division, commitment and permanence", 3],
    ],
    hints: ["Define what a turning point is, and compare the Blockade with the Truman Doctrine and Marshall Plan."],
    modelAnswer: "The Berlin Blockade was an important turning point but not the only one. It was the first direct confrontation between the two sides, and it ended hopes of a joint settlement for Germany: it led to the creation of West and East Germany in 1949 and to NATO, which committed the United States to the defence of Western Europe. The Airlift also showed Western determination. But earlier events had already divided Europe. The disagreements at Yalta and Potsdam, the Iron Curtain speech and the Czech coup showed the hardening of positions, and the Truman Doctrine and Marshall Plan of 1947 committed the United States to supporting Western Europe, leading Stalin to create the Cominform and Comecon. I would argue that 1947 was the more fundamental turning point, because it created the two economic and political blocs, while the Blockade made the division permanent in Germany and brought the military alliance. The Blockade was therefore a decisive stage in the process, rather than the sole turning point.",
    explanation: "Credit explained comparison of turning points and a supported judgement.",
  });

  b.card("DEFINITION", "What was containment?", "The American policy of preventing the spread of communism to new countries, shaped by George Kennan.");
  b.card("DEFINITION", "What was the Iron Curtain?", "Churchill's phrase (Fulton, 5 March 1946) for the division between the Soviet-dominated east and the west of Europe.");
  b.card("FACT", "What was agreed at Yalta (February 1945)?", "Zones in Germany, free elections in liberated Europe, Poland's frontiers moved west, the UN, and Soviet entry into the war against Japan.");
  b.card("FACT", "What was the Truman Doctrine?", "12 March 1947: American support for peoples resisting communism, with US\\$400 million for Greece and Turkey.");
  b.card("FACT", "What was the Marshall Plan?", "Economic aid of over US\\$13 billion for Western Europe, announced in June 1947; Stalin refused it for Eastern Europe.");
  b.card("FACT", "How long did the Berlin Blockade last?", "24 June 1948 to 12 May 1949; the West supplied West Berlin by air.");
  b.card("FACT", "When was NATO formed?", "4 April 1949, as a defensive alliance of twelve states.");
  b.card("CONCEPT", "Why did tensions grow in the wartime alliance?", "The second front, Poland and Katyn, the atomic bomb, and conflicting aims for the peace.");
  b.card("CONCEPT", "Why did the Cold War not become a 'hot' war in Europe?", "Fear of nuclear weapons and of direct conflict; crises like Berlin ended without fighting.");
});
