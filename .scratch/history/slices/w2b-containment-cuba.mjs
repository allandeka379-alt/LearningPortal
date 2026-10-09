// Slice W2b: the United States and Cuba, 1959-1962 (ZIMSEC 14.3 with the revolution, 0470 B5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.containment.cuba", { file: "containment/cuba", keyPrefix: "containment.cuba" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did the Bay of Pigs landing take place?",
    options: [
      ["April 1961", "Correct: it began on 17 April 1961."],
      ["January 1959", "January 1959 was when Castro took power."],
      ["October 1962", "October 1962 was the Missile Crisis."],
      ["August 1963", "August 1963 was the Partial Test Ban Treaty."],
    ],
    answer: "A",
    explanation: "About 1,400 Cuban exiles landed at the **Bay of Pigs** on 17 April 1961.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the Soviet Union during the Cuban Missile Crisis?",
    options: [
      ["Nikita Khrushchev", "Correct: he agreed to remove the missiles on 28 October 1962."],
      ["Joseph Stalin", "Stalin died in 1953."],
      ["Leonid Brezhnev", "Brezhnev replaced Khrushchev in 1964."],
      ["Mikhail Gorbachev", "Gorbachev led the USSR from 1985."],
    ],
    answer: "A",
    explanation: "**Khrushchev** led the USSR from the mid-1950s until 1964.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the USA discover the Soviet missile sites in Cuba?",
    options: [
      ["Photographs taken by a U-2 spy plane", "Correct: on 14 October 1962."],
      ["A warning from Fidel Castro", "Castro supported the deployment."],
      ["A speech by Khrushchev at the UN", "Khrushchev kept the deployment secret."],
      ["Reports from American troops in Havana", "There were no American troops in Havana."],
    ],
    answer: "A",
    explanation: "A **U-2** reconnaissance flight photographed the sites on 14 October 1962.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Kennedy call the US naval action a 'quarantine' rather than a blockade?",
    options: [
      ["A blockade could be seen as an act of war", "Correct: the softer word left room for diplomacy."],
      ["The ships carried medicine for Cuba", "The quarantine stopped ships carrying weapons."],
      ["The United Nations ordered him to use the word", "The UN gave no such order."],
      ["The quarantine applied only to Cuban fishing boats", "It targeted ships carrying offensive weapons."],
    ],
    answer: "A",
    explanation: "Under international law a **blockade** is an act of war; 'quarantine' sounded less aggressive.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Khrushchev's first letter of 26 October 1962 offer?",
    options: [
      ["Removal in return for a pledge not to invade", "Correct: the second letter added the Turkish missiles."],
      ["Removal in return for Kennedy's resignation", "No such demand was made."],
      ["A Soviet withdrawal from Berlin in exchange for Cuba", "Berlin was not part of the offer."],
      ["To share Soviet nuclear secrets with the USA", "No such offer was made."],
    ],
    answer: "A",
    explanation: "The first letter asked for a **no-invasion pledge** in return for removing the missiles.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Bay of Pigs invasion fail?",
    options: [
      ["Cubans did not rise and US air cover was refused", "Correct: Castro's forces won within three days."],
      ["Soviet troops defended the beaches against the exiles", "Cuban forces, not Soviet troops, defeated the landing."],
      ["The invasion force was larger than Castro's whole army", "The exiles numbered about 1,400, far fewer than Castro's forces."],
      ["The landing took place in the Sierra Maestra mountains", "The landing was at a swampy bay on the south coast."],
    ],
    answer: "A",
    hints: ["What did the planners expect Cubans to do?"],
    explanation: "Castro's air force survived, Kennedy refused open US air support, the site was poor and Cubans did not rise against Castro.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a reason why Khrushchev placed missiles in Cuba?",
    options: [
      ["The USA had Jupiter missiles in Turkey", "Correct: missiles in Cuba would balance them."],
      ["Cuba had asked to join the Warsaw Pact", "Cuba never joined the Warsaw Pact."],
      ["The USSR had more missiles than the USA", "The USA had far more long-range missiles."],
      ["Kennedy had invited the USSR to test them there", "Kennedy demanded their removal."],
    ],
    answer: "A",
    hints: ["Think about the balance of missiles near each superpower's borders."],
    explanation: "US **Jupiter missiles in Turkey** could reach the USSR; Khrushchev also wanted to protect Cuba and close the missile gap.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which outcome of the crisis best supports the view that Khrushchev gained something from it?",
    options: [
      ["The USA's pledge not to invade Cuba", "Correct: together with the secret removal of the Turkish missiles."],
      ["The removal of Soviet missiles from Cuba", "This was Kennedy's main demand, so it was a gain for the USA."],
      ["His removal from power in 1964", "This suggests he lost, not gained."],
      ["Castro's anger at not being consulted", "This damaged Soviet relations with Cuba."],
    ],
    answer: "A",
    hints: ["What did the USA promise in return?"],
    explanation: "Khrushchev obtained a **no-invasion pledge** for Cuba and, secretly, the removal of US missiles from Turkey.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What was the main purpose of the Moscow-Washington hotline set up in 1963?",
    options: [
      ["To let the leaders communicate quickly in a crisis", "Correct: slow messages had added to the danger in 1962."],
      ["To share satellite pictures of each other's missiles", "The hotline was for messages, not intelligence sharing."],
      ["To coordinate the Apollo and Soviet space programmes", "The space race remained competitive."],
      ["To announce nuclear tests before they happened", "This was not its purpose."],
    ],
    answer: "A",
    hints: ["How had Khrushchev's letters reached Kennedy in 1962?"],
    explanation: "During the crisis messages took hours to arrive; the **hotline** allowed direct, rapid communication to prevent misunderstanding.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Bay of Pigs invasion was carried out by Cuban exiles trained by the CIA.",
    answer: true,
    explanation: "True. US forces did not land; the exiles were trained and equipped by the CIA.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The agreement to remove US missiles from Turkey was announced publicly in October 1962.",
    answer: false,
    explanation: "False. It was a secret part of the deal, so at the time Kennedy appeared to have won outright.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in the crisis.",
    pairs: [
      ["John F. Kennedy", "US President who announced the quarantine"],
      ["Robert Kennedy", "Gave secret assurances about Turkey to the Soviet ambassador"],
      ["Nikita Khrushchev", "Soviet leader who agreed to remove the missiles"],
      ["Fidel Castro", "Cuban leader who was not consulted on the settlement"],
    ],
    explanation: "John Kennedy (President), Robert Kennedy (Attorney General and adviser), Khrushchev (USSR), Castro (Cuba).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events of October 1962 in chronological order.",
    pairs: [
      "Kennedy announces the quarantine on television",
      "Khrushchev announces the missiles will be removed",
      "A U-2 photographs the missile sites",
      "A U-2 is shot down over Cuba",
    ],
    right: POS,
    rightIndex: [1, 3, 0, 2],
    hints: ["The crisis lasted thirteen days."],
    explanation: "Photographs 14 October; quarantine announced 22 October; U-2 shot down 27 October; removal announced 28 October.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Kennedy's group of advisers during the crisis was called {{blank:a}}. In August 1963 the superpowers signed the Partial {{blank:b}} Ban Treaty.",
    blanks: [
      { id: "a", accepted: ["ExComm"], choices: ["ExComm", "Comecon", "Comintern", "the Politburo"] },
      { id: "b", accepted: ["Test"], choices: ["Test", "Missile", "Space", "Arms"] },
    ],
    explanation: "**ExComm** advised Kennedy; the Partial **Test** Ban Treaty banned nuclear tests in the atmosphere, space and under water.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the US President at the time of the Bay of Pigs invasion.",
    accepted: ["Kennedy", "John F. Kennedy", "John Kennedy", "JFK", "John F Kennedy", "John Fitzgerald Kennedy"],
    wrong: ["Eisenhower"],
    explanation: "**John F. Kennedy** approved the plan prepared under Eisenhower.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how relations between the USA and Cuba broke down between 1959 and 1961.",
    points: [
      "Castro's land reform and nationalisation of US-owned businesses.",
      "Sugar-for-oil deal with the USSR (1960); US refineries nationalised.",
      "USA cut sugar purchases and imposed a trade embargo (1960).",
      "USA broke off diplomatic relations (January 1961); CIA trained exiles.",
    ],
    modelAnswer: "Castro's land reform and nationalisation of American businesses angered the USA. In 1960 Cuba agreed to swap sugar for Soviet oil and nationalised US refineries that refused to process it. The USA cut its sugar purchases and banned most exports to Cuba, broke off diplomatic relations in January 1961, and had the CIA train exiles to overthrow Castro.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Kennedy chose a naval quarantine rather than an air strike or invasion.",
    points: [
      "Identifies the risk of nuclear war from an attack.",
      "Explains that killing Soviet personnel could provoke Soviet retaliation, possibly in Berlin or with nuclear weapons.",
      "Identifies that an air strike might not destroy all the missiles.",
      "Explains that surviving missiles could be fired at US cities.",
      "Identifies that the quarantine showed firmness but gave Khrushchev time.",
      "Explains that it allowed Khrushchev to back down without humiliation, and could be escalated later if needed.",
    ],
    hints: ["Compare what each option risked."],
    modelAnswer: "Kennedy rejected an air strike or invasion because attacking the missile sites would kill Soviet personnel and could provoke Soviet retaliation, perhaps in Berlin or even nuclear war. His advisers also warned that an air strike might not destroy every missile, and any that survived could be fired at American cities. The quarantine showed that the USA was firm but did not involve immediate killing; it gave Khrushchev time to think and a way to back down, while leaving stronger options available if it failed.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** consequences of the Bay of Pigs invasion.",
    points: [
      "Identifies the humiliation of Kennedy / damage to US reputation.",
      "Explains that Khrushchev judged Kennedy weak, encouraging the missile deployment in 1962.",
      "Identifies Castro moving closer to the USSR.",
      "Explains that he declared the revolution socialist and sought Soviet protection against another invasion.",
    ],
    hints: ["Think about Kennedy's reputation and Castro's choices."],
    modelAnswer: "First, the failure humiliated Kennedy, and Khrushchev concluded that he was inexperienced and weak, which encouraged the gamble of placing missiles in Cuba in 1962. Second, Castro declared the revolution socialist and turned to the USSR for weapons and protection against another invasion, tying Cuba firmly to the Soviet bloc.",
    explanation: "Two marks per explained consequence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in a British newspaper in late October 1962, described in words", "Two men sit opposite each other, each astride a huge nuclear bomb. Both are sweating and each grips a large button labelled \"Fire\". Between them is a small table with a telephone. One says to the other: \"Shall we talk?\"", { described: true })}\n\n${source("Source B", "an editorial in a fictional American newspaper, 29 October 1962", "The President stood firm, and the Russians blinked. Mr Khrushchev's rockets are going home because America refused to be bullied ninety miles from its shores. Let the world learn the lesson: strength, not soft words, keeps the peace.")}`,
    hints: ["Compare how each source presents the two leaders."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A?", points: [
        "Both leaders were in equal danger / on the brink of nuclear war.",
        "They needed to talk / negotiation was the way out.",
      ], explanation: "Message supported by details." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about how the crisis ended?", points: [
        "A: both sides equally at risk; a negotiated way out.",
        "B: an American victory; Khrushchev backed down.",
        "Agreement: both show the danger / that the missiles were removed peacefully.",
        "Judgement: they mainly disagree about who won.",
      ], explanation: "Compare specific points." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Is Source B a reliable account of how the crisis was resolved? Use the sources and your own knowledge.", points: [
        "Accurate: the missiles were removed; Kennedy stood firm with the quarantine.",
        "Inaccurate: the USA also gave a no-invasion pledge.",
        "Inaccurate: secret deal on Turkish missiles (not known in 1962).",
        "Provenance: an American paper writing the day after, patriotic purpose, limited information.",
        "Source A suggests both sides compromised, closer to the real deal.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B is partly accurate: Kennedy did stand firm with the quarantine, and the missiles were removed. But it is unreliable as an account of the resolution. The USA also promised not to invade Cuba, and Robert Kennedy secretly assured the Soviet ambassador that the Jupiter missiles would be removed from Turkey, which the writer could not know in 1962. As an American newspaper writing the day after, it had a patriotic purpose and presented a one-sided victory. Source A, by showing both leaders sweating on their bombs and agreeing to talk, is closer to what really happened. Source B is reliable as evidence of American feeling in October 1962, but not of how the crisis was actually resolved.", explanation: "Provenance, content and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge the policy at each stage from 1959 to 1962."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events of 22-28 October 1962.", points: [
        "22 October: Kennedy announced the quarantine on television.",
        "24 October: quarantine began; Soviet ships stopped or turned back.",
        "26-27 October: Khrushchev's two letters; U-2 shot down (Black Saturday).",
        "27-28 October: Kennedy replied to the first letter (secret Turkey assurance); Khrushchev announced removal.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How effectively did the United States deal with Cuba between 1959 and 1962?", points: [
        ["Ineffective: embargo and hostility pushed Castro towards the USSR.", 2],
        ["Ineffective: the Bay of Pigs failed and strengthened Castro.", 2],
        ["Ineffective: Operation Mongoose and threats helped bring Soviet missiles.", 2],
        ["Effective: the Missile Crisis handled calmly (ExComm, quarantine); missiles removed.", 2],
        ["Mixed: Castro stayed in power; secret Turkey deal; hotline and Test Ban Treaty followed.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "For most of the period US policy was ineffective. The embargo and hostility after Castro's nationalisations helped push Cuba towards the USSR, as the 1960 sugar-for-oil deal showed. The Bay of Pigs in April 1961 was a disaster: the exiles were defeated within three days, Kennedy was humiliated, and Castro declared the revolution socialist. Continued plots against Castro convinced Cuba and the USSR that an invasion was coming, which helped bring Soviet missiles to the island.\n\nHowever, the USA dealt effectively with the Missile Crisis itself. Kennedy and ExComm rejected immediate air strikes, chose a quarantine that showed firmness while leaving room to negotiate, and replied to Khrushchev's first letter, so the missiles were removed without war. Afterwards the hotline and the Partial Test Ban Treaty reduced the danger of another crisis.\n\nOverall the USA failed to contain communism in Cuba, since Castro stayed in power and allied to the USSR, and the secret Turkey deal and the no-invasion pledge were real concessions. US policy was effective in avoiding nuclear war in 1962, but ineffective in its aim of removing communism from Cuba.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When was the Bay of Pigs invasion?", "17 April 1961; about 1,400 CIA-trained Cuban exiles were defeated within three days.");
  b.card("DEFINITION", "Containment", "US policy from 1947 of stopping communism spreading to new countries.");
  b.card("FACT", "When were the missile sites photographed?", "14 October 1962, by a U-2 spy plane.");
  b.card("DEFINITION", "Quarantine (1962)", "Kennedy's word for the naval blockade of Cuba, avoiding the warlike word 'blockade'.");
  b.card("DEFINITION", "ExComm", "The group of advisers who met with Kennedy during the Missile Crisis.");
  b.card("CONCEPT", "Why did Khrushchev put missiles in Cuba?", "To protect Cuba, close the missile gap, answer US missiles in Turkey, gain a bargaining chip and show strength.");
  b.card("FACT", "How was the crisis resolved?", "28 October 1962: missiles removed in return for a US no-invasion pledge and a secret promise to remove Jupiter missiles from Turkey.");
  b.card("FACT", "Name two results of the crisis in 1963.", "The Moscow-Washington hotline and the Partial Test Ban Treaty (August 1963).");
  b.card("FACT", "What happened on 'Black Saturday'?", "27 October 1962: Khrushchev's second letter arrived and a U-2 was shot down over Cuba.");
});
