// Slice W3a: the United States and Korea, 1950-1953 (0470 B5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.containment.korea", { file: "containment/korea", keyPrefix: "containment.korea" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Along which line was Korea divided in 1945?",
    options: [
      ["The 38th parallel", "Correct: Soviet forces to the north, American to the south."],
      ["The 17th parallel", "The 17th parallel divided Vietnam in 1954."],
      ["The Yalu River", "The Yalu is the border between North Korea and China."],
      ["The Oder-Neisse line", "This was the border between Poland and Germany."],
    ],
    answer: "A",
    explanation: "Korea was divided at the **38th parallel** in 1945.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led communist North Korea when it invaded the South in 1950?",
    options: [
      ["Kim Il-sung", "Correct: he had sought Stalin's approval."],
      ["Syngman Rhee", "Rhee led South Korea."],
      ["Mao Zedong", "Mao led communist China."],
      ["Ho Chi Minh", "Ho Chi Minh led the communists in Vietnam."],
    ],
    answer: "A",
    explanation: "**Kim Il-sung** led North Korea; Stalin approved the invasion in early 1950.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the USSR unable to veto UN action over Korea in June 1950?",
    options: [
      ["It was boycotting the Security Council", "Correct: in protest over China's seat."],
      ["It was not a member of the United Nations", "The USSR was a founding member."],
      ["It had voted in favour of helping South Korea", "The USSR was absent and did not vote."],
      ["The UN General Assembly had removed its veto", "Veto powers cannot be removed in this way."],
    ],
    answer: "A",
    explanation: "The USSR was **boycotting the Security Council** because the UN would not seat communist China.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the importance of the Inchon landing in September 1950?",
    options: [
      ["It cut behind the North Korean army, which collapsed", "Correct: Seoul was retaken soon after."],
      ["It brought China into the war at once", "China entered later, after UN forces neared the Yalu."],
      ["It ended the war with an armistice", "The armistice came in July 1953."],
      ["It was the first North Korean attack across the 38th parallel", "The invasion began on 25 June 1950."],
    ],
    answer: "A",
    explanation: "MacArthur's landing at **Inchon** behind enemy lines turned the war in the UN's favour.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Why did Truman dismiss General MacArthur in April 1951?",
    options: [
      ["He publicly called for attacks on China itself", "Correct: Truman feared a wider war."],
      ["He had lost the battle of Inchon", "Inchon was MacArthur's great success."],
      ["He refused to order his troops across the 38th parallel", "MacArthur pressed forward beyond it."],
      ["He wanted to withdraw from Korea", "MacArthur wanted to widen the war, not leave."],
    ],
    answer: "A",
    explanation: "MacArthur's public calls to **attack China**, even with atomic weapons, challenged Truman's policy of limited war.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which development most directly brought China into the war?",
    options: [
      ["UN forces advancing towards the Yalu River", "Correct: China feared a hostile army on its border."],
      ["The North Korean invasion of June 1950", "China did not send its armies in until October-November 1950."],
      ["The signing of the armistice at Panmunjom", "The armistice ended the fighting in 1953."],
      ["The Soviet boycott of the Security Council", "This allowed UN action but did not bring China in."],
    ],
    answer: "A",
    hints: ["Where is the Yalu River?"],
    explanation: "The UN advance towards the **Yalu**, China's border, triggered Chinese intervention.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the secret US report known as NSC-68 recommend?",
    options: [
      ["A large increase in US military spending", "Correct: to resist communism everywhere."],
      ["Withdrawal of US troops from Japan", "NSC-68 argued for a stronger presence."],
      ["Recognition of communist China by the UN", "The USA opposed this for twenty years."],
      ["Sharing atomic secrets with the USSR", "The report saw the USSR as a dangerous rival."],
    ],
    answer: "A",
    hints: ["The Korean War made Congress accept this."],
    explanation: "**NSC-68** called for a big military build-up; the Korean War made it happen.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which outcome is the strongest evidence that containment succeeded in Korea?",
    options: [
      ["South Korea survived as a non-communist state", "Correct: the aim of containment was achieved."],
      ["North Korea remained communist after 1953", "This shows that rollback failed."],
      ["Chinese troops drove the UN back in 1950", "This was a setback for the UN."],
      ["No peace treaty was ever signed", "This shows the war was unresolved, not that it succeeded."],
    ],
    answer: "A",
    hints: ["Containment aimed to stop communism spreading to new countries."],
    explanation: "The survival of **South Korea** meets the aim of containment, even though rollback failed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Korean War ended with an armistice in July 1953, not a peace treaty.",
    answer: true,
    explanation: "True. The armistice was signed at Panmunjom on 27 July 1953; no peace treaty followed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Only American troops fought on the UN side in Korea.",
    answer: false,
    explanation: "False. The USA provided most forces, but troops also came from Britain, Turkey, Canada, Australia and other countries.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Douglas MacArthur", "Commander of UN forces until April 1951"],
      ["Syngman Rhee", "Anti-communist leader of South Korea"],
      ["Dean Acheson", "US Secretary of State who described a defensive perimeter"],
      ["Dwight Eisenhower", "US President when the armistice was signed"],
    ],
    explanation: "MacArthur (UN commander), Rhee (South Korea), Acheson (Secretary of State), Eisenhower (President from January 1953).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events of the Korean War in chronological order.",
    pairs: [
      "Chinese forces enter the war",
      "The landing at Inchon",
      "MacArthur is dismissed",
      "North Korea invades the South",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["The UN advance after Inchon provoked China."],
    explanation: "Invasion (June 1950); Inchon (September 1950); China enters (October-November 1950); MacArthur dismissed (April 1951).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In the first months of the war, UN forces were pushed back to a small area around the port of {{blank:a}}. The armistice was signed at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Pusan"], choices: ["Pusan", "Inchon", "Pyongyang", "Saigon"] },
      { id: "b", accepted: ["Panmunjom"], choices: ["Panmunjom", "Geneva", "Potsdam", "Seoul"] },
    ],
    explanation: "The UN held the **Pusan** perimeter in 1950; the armistice was signed at **Panmunjom** in 1953.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the communist country whose armies entered the Korean War in late 1950.",
    accepted: ["China", "People's Republic of China", "Peoples Republic of China", "PRC", "Communist China"],
    wrong: ["USSR"],
    explanation: "**China** sent large forces when UN troops approached the Yalu River.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the events of the Korean War between June and November 1950.",
    points: [
      "North Korea invaded on 25 June 1950 and took Seoul.",
      "UN forces were pushed back to the Pusan perimeter.",
      "MacArthur's landing at Inchon (15 September) turned the war; Seoul retaken.",
      "UN forces crossed the 38th parallel, took Pyongyang and neared the Yalu; China intervened.",
    ],
    modelAnswer: "North Korea invaded on 25 June 1950 and captured Seoul, pushing the South Korean and UN forces back to a small area around Pusan. On 15 September MacArthur landed at Inchon behind the North Korean lines, and the North Korean army collapsed; Seoul was retaken. UN forces then crossed the 38th parallel, captured Pyongyang and advanced towards the Yalu River, which brought large Chinese forces into the war.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the United States became involved in Korea in 1950.",
    points: [
      "Identifies fear of communism spreading after China became communist in 1949.",
      "Explains that if South Korea fell, other Asian states such as Japan might be threatened.",
      "Identifies the lesson of appeasement / the policy of containment (Truman Doctrine, NSC-68).",
      "Explains that Truman believed aggression must be stopped early, and the Soviet boycott let him act through the UN.",
    ],
    hints: ["What happened in China in 1949?"],
    modelAnswer: "The USA feared that communism was spreading in Asia after China became communist in 1949; if South Korea fell, other states, including Japan, might be threatened. Truman also believed the lesson of the 1930s was that aggression must be stopped early, as containment and NSC-68 required, and the Soviet boycott of the Security Council allowed him to act through the UN.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Korean War ended in stalemate.",
    points: [
      "Identifies Chinese intervention.",
      "Explains that large Chinese forces drove the UN back and prevented the unification of Korea.",
      "Identifies Truman's decision to fight a limited war (MacArthur dismissed).",
      "Explains that the USA would not attack China or use atomic weapons, so it could not win outright.",
      "Identifies the deadlock near the 38th parallel and long talks (prisoners of war).",
      "Explains that neither side could break through, and a new US President and Stalin's death in 1953 made an armistice possible.",
    ],
    hints: ["Why could neither side win outright?"],
    modelAnswer: "Chinese intervention in late 1950 drove the UN back and made it impossible for the UN to unite Korea. At the same time, Truman chose to fight a limited war: he dismissed MacArthur rather than attack China or use atomic weapons, because he feared a wider war with China and the USSR, so the UN could not win outright either. From mid-1951 the front settled near the 38th parallel, with neither side able to break through, while talks dragged on over prisoners of war. Only after Eisenhower became President and Stalin died in 1953 was an armistice signed.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter from a fictional British soldier serving with the UN forces to his parents, December 1950", "We were in sight of the river and the talk was of being home for Christmas. Then the Chinese came out of the hills at night, thousands of them, blowing bugles. We have walked back further than we ever advanced. Whoever said they would not come should be out here with us.")}\n\n${source("Source B", "a cartoon of the kind published in American newspapers shortly before the general was dismissed, described in words", "A tall general in sunglasses with a corncob pipe stands on a map of Asia, pointing at China with a huge pointer labelled \"Total war\". A smaller man in glasses, labelled \"The President\", pulls him back by the coat. Above them is a mushroom cloud drawn in dotted lines.", { described: true })}`,
    hints: ["Who was the general in the cartoon?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about the Chinese intervention?", points: [
        "It came as a surprise / UN commanders had not expected it.",
        "It was large and forced a long retreat.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of Source B? Use your knowledge to explain it.", points: [
        "Message: the general wanted to widen the war to China, risking nuclear war.",
        "The President is restraining him.",
        "Context: MacArthur called for attacks on China and hinted at atomic weapons.",
        "Context: Truman dismissed him in April 1951 to keep the war limited.",
      ], explanation: "Message plus context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for explaining why Truman dismissed MacArthur?", points: [
        "A: shows MacArthur's misjudgement about China (implied 'whoever said they would not come').",
        "A: one soldier's view; does not mention MacArthur by name.",
        "B: directly shows the dispute over widening the war.",
        "B: a cartoonist's opinion, simplifies the President's reasons.",
        "Own knowledge: public statements, challenge to civilian control, fear of war with China and the USSR.",
        "Supported judgement on usefulness.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it shows the disaster that followed the advance to the Yalu: the soldier blames whoever said the Chinese would not come, and MacArthur had dismissed China's warnings. But it is one soldier's experience and does not name MacArthur or mention his dismissal. Source B is more directly useful: it shows the general pointing at China with 'total war' and the President pulling him back, with a nuclear cloud above, which matches my knowledge that MacArthur publicly called for attacks on China and hinted at atomic weapons, and that Truman feared a wider war with China and the USSR. However, it is a cartoonist's simplification and leaves out that MacArthur was also openly challenging the President's authority. Together the sources are useful, B more than A, but they need own knowledge to explain fully.", explanation: "Weigh content and provenance." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge containment and rollback separately."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how the United Nations became involved in Korea in 1950.", points: [
        "The USA took the invasion to the Security Council.",
        "The USSR was boycotting the Council over China's seat, so there was no veto.",
        "The Council called on members to help South Korea.",
        "A UN force under MacArthur was formed; most troops American, others from Britain, Turkey and other states.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How successful was the United States in containing communism in Korea?", points: [
        ["Success: South Korea survived; the 1950 invasion was reversed", 2],
        ["Success: the UN acted; US credibility; NSC-68 build-up and new alliances", 2],
        ["Failure: rollback failed; China entered; North Korea remained communist", 2],
        ["Failure: huge cost; armistice only; China strengthened and hostile", 2],
        ["Supported judgement distinguishing containment from rollback", 2],
      ], levels: levels(10), modelAnswer: "In terms of containment the USA was successful. North Korea's invasion was reversed after Inchon, and South Korea survived as a non-communist state. The USA had shown its allies that it would fight to stop communism, and it had done so with the backing of the UN. The war also led to the military build-up proposed in NSC-68 and to new alliances in Asia.\n\nHowever, the USA went beyond containment in October 1950, trying to unite Korea by force. This rollback failed: China entered the war, drove the UN back, and North Korea remained communist. The war cost well over two million lives and ended only in an armistice, and China became a stronger and more hostile enemy.\n\nOverall the USA succeeded in its original aim of containing communism in South Korea, but at a very high cost and with the failure of its wider aim of rollback.", explanation: "Levels: both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did North Korea invade South Korea?", "25 June 1950.");
  b.card("FACT", "When and where was the Korean armistice signed?", "27 July 1953, at Panmunjom.");
  b.card("DEFINITION", "Armistice", "An agreement to stop fighting that is not a peace treaty.");
  b.card("DEFINITION", "Rollback", "Pushing communism back out of a country it already ruled, as the UN tried in North Korea in October 1950.");
  b.card("FACT", "What was the Inchon landing?", "MacArthur's landing behind North Korean lines on 15 September 1950, which turned the war.");
  b.card("CONCEPT", "Why could the UN act in Korea in 1950?", "The USSR was boycotting the Security Council over China's seat, so it could not use its veto.");
  b.card("CONCEPT", "Why did China enter the Korean War?", "UN forces crossed the 38th parallel and advanced towards the Yalu River, China's border.");
  b.card("CONCEPT", "Why did Truman sack MacArthur?", "MacArthur publicly called for war on China and hinted at atomic weapons; Truman wanted a limited war.");
  b.card("CONCEPT", "Was containment in Korea a success?", "Containment yes (South Korea survived); rollback no (North Korea stayed communist); very high cost.");
});
