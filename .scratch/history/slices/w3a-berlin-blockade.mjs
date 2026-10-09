// Slice W3a: Germany, the Berlin Blockade and the blame debate (ZIMSEC Cold War; 0470 B4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cold-war.berlin-blockade", { file: "cold-war/berlin-blockade", keyPrefix: "cold-war.berlin-blockade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did the Soviet blockade of West Berlin begin?",
    options: [
      ["June 1948", "Correct: on 24 June 1948."],
      ["February 1945", "February 1945 was the Yalta Conference."],
      ["March 1947", "March 1947 was the Truman Doctrine."],
      ["August 1961", "August 1961 was the building of the Berlin Wall."],
    ],
    answer: "A",
    explanation: "The blockade began on **24 June 1948** and was lifted on 12 May 1949.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How did the Western powers keep West Berlin supplied during the blockade?",
    options: [
      ["By flying supplies in by air", "Correct: the Berlin airlift."],
      ["By sending armed convoys along the roads", "This was rejected because it could have started a war."],
      ["By shipping supplies up the River Elbe", "Canal and river routes were also cut."],
      ["By digging tunnels under the Soviet zone", "No such tunnels supplied the city."],
    ],
    answer: "A",
    explanation: "The **airlift** used the three air corridors agreed in 1945.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Western action in June 1948 most directly led Stalin to begin the blockade?",
    options: [
      ["Introducing a new currency in the western zones", "Correct: the Deutschmark suggested a separate West German state."],
      ["Founding the NATO alliance with the United States", "NATO was founded in April 1949, during the blockade."],
      ["Building a wall around the western sectors of Berlin", "The Wall was built by East Germany in 1961."],
      ["Withdrawing all Western troops from their zones", "The Western powers kept their troops in Germany."],
    ],
    answer: "A",
    explanation: "The new **Deutschmark** showed the West was rebuilding its zones as a separate economy.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "When was NATO founded?",
    options: [
      ["April 1949", "Correct: the North Atlantic Treaty was signed on 4 April 1949."],
      ["May 1955", "May 1955 was the Warsaw Pact."],
      ["June 1948", "June 1948 was the start of the blockade."],
      ["October 1945", "October 1945 was the founding of the United Nations."],
    ],
    answer: "A",
    explanation: "**NATO** (April 1949) bound the USA to defend Western Europe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the Warsaw Pact formed in 1955?",
    options: [
      ["West Germany had just joined NATO", "Correct: the USSR answered with its own alliance."],
      ["The Berlin Blockade had just begun", "The blockade was in 1948-49."],
      ["Stalin wanted to attack Yugoslavia", "Stalin died in 1953."],
      ["The USA had left NATO", "The USA remained the leading NATO member."],
    ],
    answer: "A",
    explanation: "The **Warsaw Pact** followed West Germany's entry into NATO in May 1955.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Truman choose an airlift rather than sending troops along the roads to Berlin?",
    options: [
      ["Stalin would have to fire first to stop it", "Correct: forcing a land route risked starting war."],
      ["Roads in the Soviet zone had been destroyed by bombing", "The roads were closed by Soviet decision, not ruined."],
      ["The USA had no troops left in Europe", "American troops were still in Germany."],
      ["Stalin had invited the West to use aircraft", "Stalin hoped the city could not be supplied."],
    ],
    answer: "A",
    hints: ["Who would have to start any fighting?"],
    explanation: "Shooting down unarmed transport planes would have made Stalin the **aggressor**; an armed convoy would have put that burden on the West.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which view of the Cold War's origins blames the USA most?",
    options: [
      ["The revisionist view", "Correct: it stresses American economic and atomic power."],
      ["The traditional (orthodox) view", "This view blames the USSR."],
      ["The post-revisionist view", "This view shares blame between both sides."],
      ["The Brezhnev Doctrine", "This was a Soviet policy of 1968, not a historians' view."],
    ],
    answer: "A",
    hints: ["Which view grew up during the Vietnam War?"],
    explanation: "**Revisionists** (influential from the 1960s) argued that the USA used its power to spread its influence.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which piece of evidence would a traditional historian most likely use to blame the USSR?",
    options: [
      ["Rigged elections in Poland in 1947", "Correct: it shows Stalin breaking the Yalta promise."],
      ["The American atomic monopoly in 1945", "Revisionists use this to criticise the USA."],
      ["The introduction of the Deutschmark in 1948", "This supports criticism of the West."],
      ["Soviet war losses of about 20-27 million", "This supports the view that Soviet policy was defensive."],
    ],
    answer: "A",
    hints: ["Which option shows Soviet aggression?"],
    explanation: "Traditional historians point to Soviet actions in **Eastern Europe**, such as the rigged Polish elections.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "During the blockade, East Berlin as well as West Berlin was cut off from supplies.",
    answer: false,
    explanation: "False. Only West Berlin was blockaded; East Berlin was in the Soviet sector.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Federal Republic of Germany (West Germany) was set up in 1949.",
    answer: true,
    explanation: "True: in May 1949. The German Democratic Republic followed in October 1949.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Bizonia", "The merged British and American zones of Germany"],
      ["Deutschmark", "The new currency of the western zones, 1948"],
      ["NATO", "Western military alliance founded in 1949"],
      ["Warsaw Pact", "Soviet-led military alliance founded in 1955"],
    ],
    explanation: "Bizonia (January 1947), Deutschmark (June 1948), NATO (April 1949), Warsaw Pact (May 1955).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Warsaw Pact is formed",
      "The blockade of West Berlin begins",
      "The British and American zones merge",
      "NATO is founded",
    ],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["NATO was founded before the blockade ended."],
    explanation: "Bizonia (January 1947); blockade (June 1948); NATO (April 1949); Warsaw Pact (May 1955).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The capital of West Germany was {{blank:a}}. The view that both superpowers shared the blame for the Cold War is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Bonn"], choices: ["Bonn", "Berlin", "Munich", "Frankfurt"] },
      { id: "b", accepted: ["post-revisionist"], choices: ["post-revisionist", "traditional", "revisionist", "isolationist"] },
    ],
    explanation: "**Bonn** was West Germany's capital; the **post-revisionist** view shares the blame.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which year was the Berlin Blockade lifted?",
    accepted: ["1949"],
    wrong: ["1948"],
    explanation: "Stalin lifted the blockade on 12 May **1949**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the Berlin airlift.",
    points: [
      "Began in June 1948 after the USSR cut road, rail and canal links to West Berlin.",
      "American and British aircraft flew in food, fuel and other supplies through the air corridors.",
      "Coal was the largest cargo / planes landed every few minutes at its height.",
      "About 2.3 million tonnes in some 275,000 flights (estimates) / lasted until May 1949.",
    ],
    modelAnswer: "When the USSR cut all land routes to West Berlin in June 1948, American and British aircraft began flying supplies into the city through the three air corridors. They carried food, fuel and especially coal; at the height of the airlift a plane landed every few minutes. Historians estimate that about 2.3 million tonnes were flown in over some 275,000 flights before the blockade ended in May 1949.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Stalin blockaded West Berlin in 1948.",
    points: [
      "Identifies Western moves to rebuild West Germany (Bizonia, Marshall Aid, Deutschmark).",
      "Explains that Stalin feared a strong West German state, having suffered German invasion.",
      "Identifies the aim of forcing the West out of Berlin.",
      "Explains that West Berlin, deep in the Soviet zone, was a Western outpost and a showcase of Western prosperity.",
    ],
    hints: ["Think about the new currency and the position of Berlin."],
    modelAnswer: "Stalin saw Bizonia, Marshall Aid and especially the new Deutschmark as steps towards a separate, strong West German state, which he feared after the German invasion of 1941. He also hoped to force the Western powers out of Berlin, which lay deep inside the Soviet zone and was a Western outpost showing off Western prosperity to East Germans.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the consequences of the Berlin Blockade.",
    points: [
      "Identifies a Western propaganda victory.",
      "Explains that Stalin backed down and the USA showed it would defend allies without war.",
      "Identifies the division of Germany into two states (1949).",
      "Explains that the FRG and GDR made the division of Germany permanent until 1990.",
      "Identifies NATO (1949) / the Warsaw Pact (1955).",
      "Explains that Europe became divided between two armed alliances.",
    ],
    hints: ["Germany, alliances and prestige."],
    modelAnswer: "The blockade was a victory for the West: Stalin lifted it in May 1949 without gaining anything, and the USA had shown it would stand by its allies without war. It also led to the division of Germany, since in 1949 the western zones became the Federal Republic and the Soviet zone the German Democratic Republic, a split that lasted until 1990. Finally, it pushed the West to form NATO in April 1949, committing the USA to defend Western Europe; when West Germany joined in 1955 the USSR formed the Warsaw Pact, dividing Europe between two armed alliances.",
    explanation: "Two marks per developed consequence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a radio broadcast by a fictional West Berlin journalist, December 1948", "Tonight the lights go off at eight again, and many of us are cold. But listen: the engines never stop. Every few minutes another plane comes in over the rooftops. The Russians thought hunger would make us beg them for bread. Instead it has made us friends of the people who bombed us four years ago.")}\n\n${source("Source B", "an article in a fictional East German communist newspaper, July 1948", "The Western powers have torn Germany in two with their separate currency. They plan a West German state of factory owners and generals. The measures taken on the roads are a defence of our economy against their worthless money, and any Berliner who wants food may register for it in the Soviet sector.")}`,
    hints: ["Think about where each source was produced, and for whom."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about life in West Berlin during the blockade?", points: [
        "Shortages: electricity rationed / people were cold.",
        "The airlift kept the city supplied and raised morale / changed attitudes to the Western allies.",
      ], explanation: "Two valid inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why do Sources A and B give different explanations of the blockade?", points: [
        "A blames the Soviets for trying to starve the city.",
        "B blames the West's currency and plans for a separate state.",
        "A is from West Berlin, encouraging resistance to the blockade.",
        "B is communist propaganda defending Soviet policy.",
      ], explanation: "Explain the difference from purpose and origin." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far does Source B prove that the West was to blame for the Berlin crisis? Use your own knowledge.", points: [
        "B is accurate that the West introduced the Deutschmark and planned a West German state.",
        "Own knowledge: Bizonia, Marshall Aid, the London plans of 1948.",
        "But B is propaganda: it hides the cutting of supplies to two million people.",
        "Own knowledge: the USSR began the blockade; the offer of food in the Soviet sector was a way to win over Berliners.",
        "Provenance: communist newspaper in the Soviet zone.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B is partly accurate. The Western powers had merged their zones, given them Marshall Aid and in June 1948 introduced the Deutschmark without Soviet agreement, and they were planning a West German state, so Stalin had real grievances. But the source is communist propaganda from the Soviet zone, written to defend Soviet policy. It calls the blockade 'measures on the roads' and hides the fact that the USSR cut off supplies to about two million people. Offering food in the Soviet sector was a way of drawing Berliners under Soviet control. Source B shows that the West provoked the crisis, but it does not prove the West was to blame, since the USSR chose to respond with a blockade of civilians.", explanation: "Weigh content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), give the case against each superpower before deciding."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how Germany was occupied after 1945.", points: [
        "Divided into four zones: American, British, French and Soviet.",
        "Berlin, inside the Soviet zone, also divided into four sectors.",
        "An Allied Control Council was meant to run Germany as one unit.",
        "Reparations taken mainly from each zone; the USSR dismantled factories in its zone.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "'The USSR was more to blame than the USA for the start of the Cold War.' How far do you agree?", points: [
        ["Against the USSR: broke the Yalta promise; rigged elections; salami tactics", 2],
        ["Against the USSR: Czech coup 1948; Berlin Blockade of civilians", 2],
        ["Against the USA: atomic monopoly; Truman's hard line", 2],
        ["Against the USA: Marshall Aid as economic influence; Deutschmark and West German state", 2],
        ["Historians' views (traditional, revisionist, post-revisionist) used to frame the argument", 2],
        ["Supported judgement", 2],
      ], levels: levels(12), modelAnswer: "There is a strong case against the USSR. At Yalta Stalin promised free elections in liberated Europe, but communist governments were imposed through salami tactics and rigged elections, as in Poland in 1947. The Czech coup of 1948 ended the last democracy in Eastern Europe, and the Berlin Blockade tried to force the West out of Berlin by cutting off supplies to two million civilians. This is the traditional view.\n\nRevisionist historians point to American actions. The USA used the atomic bomb while it had a monopoly, Truman took a harder line than Roosevelt, and Marshall Aid spread American economic influence. In Germany the West merged its zones and introduced the Deutschmark without Soviet agreement, which Stalin saw as breaking Potsdam.\n\nPost-revisionists argue that both sides acted from fear and misunderstood each other. I agree to a large extent that the USSR was more to blame, because the imposition of communist rule on Eastern Europe came first and caused most of the Western reaction; however, American policies made Soviet fears worse, so the blame was shared, though not equally.", explanation: "Levels: both sides, historians' views and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did the Berlin Blockade begin and end?", "24 June 1948 to 12 May 1949.");
  b.card("DEFINITION", "Airlift", "Supplying a place by air; used to feed and fuel West Berlin in 1948-49.");
  b.card("FACT", "When were NATO and the Warsaw Pact formed?", "NATO April 1949; Warsaw Pact May 1955.");
  b.card("FACT", "When were the two German states set up?", "1949: Federal Republic (West) in May; German Democratic Republic (East) in October.");
  b.card("CONCEPT", "Why did Stalin blockade West Berlin?", "To stop a separate West German state (new Deutschmark) and to force the West out of Berlin.");
  b.card("CONCEPT", "Why was the airlift a Western success?", "West Berlin survived; Stalin backed down without war, and the USA showed it would defend allies.");
  b.card("DEFINITION", "Revisionist view of the Cold War", "The view (influential from the 1960s) that the USA, with its economic and atomic power, was mainly to blame.");
  b.card("DEFINITION", "Post-revisionist view of the Cold War", "The view that both superpowers share the blame through mutual fear and misunderstanding.");
  b.card("CONCEPT", "What does the traditional view say about the Cold War?", "The USSR was to blame: it broke the Yalta promise and imposed communism on Eastern Europe; the USA only reacted.");
});
