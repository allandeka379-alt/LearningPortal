// Slice W3a: the breakdown of the wartime alliance, 1945-1946 (ZIMSEC Cold War origins; 0470 B4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cold-war.breakdown-1945", { file: "cold-war/breakdown-1945", keyPrefix: "cold-war.breakdown-1945" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which three leaders attended the Yalta Conference in February 1945?",
    options: [
      ["Roosevelt, Churchill and Stalin", "Correct: the 'Big Three' of the wartime alliance."],
      ["Truman, Attlee and Stalin", "These three were together only at the end of the Potsdam Conference."],
      ["Truman, Churchill and Khrushchev", "Khrushchev did not lead the USSR until the mid-1950s."],
      ["Roosevelt, Attlee and Molotov", "Attlee became Prime Minister in July 1945; Molotov was Stalin's foreign minister."],
    ],
    answer: "A",
    explanation: "**Roosevelt** (USA), **Churchill** (Britain) and **Stalin** (USSR) met at Yalta in the Crimea in February 1945.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who became President of the United States when Roosevelt died in April 1945?",
    options: [
      ["Harry Truman", "Correct: he led the USA at Potsdam."],
      ["Dwight Eisenhower", "Eisenhower became President in 1953."],
      ["John F. Kennedy", "Kennedy became President in 1961."],
      ["Herbert Hoover", "Hoover was President from 1929 to 1933."],
    ],
    answer: "A",
    explanation: "**Harry Truman**, the Vice-President, took over in April 1945 and was more suspicious of Stalin than Roosevelt had been.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these was agreed at the Yalta Conference?",
    options: [
      ["Germany would be divided into zones of occupation", "Correct: Berlin would also be divided."],
      ["Germany would be reunited under a single government", "Germany was divided, not reunited, in 1945."],
      ["The USSR would withdraw at once from Poland", "No such agreement was made; the Red Army stayed."],
      ["The USA would share its atomic bomb with the USSR", "The bomb was not tested until July 1945 and was never shared."],
    ],
    answer: "A",
    explanation: "Yalta agreed the **division of Germany** (and Berlin), war-crimes trials, Soviet entry into the war against Japan, free elections in liberated Europe and the United Nations.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Stalin want friendly governments in Eastern Europe after 1945?",
    options: [
      ["To create a buffer zone against invasion from the west", "Correct: Russia had been invaded through Poland in 1914 and 1941."],
      ["To gain colonies in Africa and Asia", "Eastern Europe is not in Africa or Asia; this was not his aim there."],
      ["Because the Treaty of Versailles had given him the region", "The Treaty of Versailles gave the USSR nothing; it was not even invited."],
      ["Because the USA had asked him to occupy it", "The USA wanted free elections there, not Soviet control."],
    ],
    answer: "A",
    explanation: "Stalin saw a **buffer zone** of friendly states as essential for Soviet security after the huge losses of the war.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who replaced Churchill as British Prime Minister during the Potsdam Conference?",
    options: [
      ["Clement Attlee", "Correct: Labour won the July 1945 general election."],
      ["Neville Chamberlain", "Chamberlain resigned in 1940 and died later that year."],
      ["Anthony Eden", "Eden became Prime Minister in 1955."],
      ["Harold Macmillan", "Macmillan became Prime Minister in 1957."],
    ],
    answer: "A",
    explanation: "The general election results were announced during the conference; **Attlee** took Churchill's place.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the main argument of Kennan's Long Telegram (February 1946)?",
    options: [
      ["The USSR would expand but back down when firmly resisted", "Correct: this idea shaped the policy of containment."],
      ["The USSR was ready to hold free elections in Poland", "Kennan argued the opposite: Soviet leaders distrusted the West."],
      ["The USA should withdraw all of its troops from Western Europe", "Kennan argued for firm resistance, not withdrawal."],
      ["The USSR was about to invade Western Europe", "Kennan did not predict an invasion; he described long-term pressure."],
    ],
    answer: "A",
    hints: ["Think about the policy the USA adopted in 1947."],
    explanation: "Kennan argued that Soviet leaders saw the capitalist world as hostile and would expand where they could, but would retreat when faced with **firm resistance**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the 'free elections' agreed at Yalta lead to disagreement?",
    options: [
      ["Stalin would accept only results friendly to the USSR", "Correct: the West wanted genuinely free choices."],
      ["The USA refused to allow elections in its own zone", "The dispute was over Eastern Europe, not the American zone."],
      ["Britain wanted Poland to become communist", "Britain backed the non-communist Polish government in London."],
      ["The elections were to be organised by Nazi officials", "Nazi officials were removed from power after the war."],
    ],
    answer: "A",
    hints: ["Each side meant something different by 'free'."],
    explanation: "The promise was vague. The West expected genuinely free elections; Stalin expected governments **friendly to the USSR**, as in Poland.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the atomic bomb damaged relations between the USA and the USSR?",
    options: [
      ["Stalin feared the USA would use its monopoly to pressure him", "Correct: he ordered a crash programme to build a Soviet bomb."],
      ["The bomb was dropped on Soviet troops in Manchuria", "The bombs were dropped on the Japanese cities of Hiroshima and Nagasaki."],
      ["Stalin had built the bomb first and refused to share the secret", "The USSR did not test a bomb until August 1949."],
      ["The bomb destroyed the city where Potsdam was held", "Potsdam is in Germany; no atomic bomb fell in Europe."],
    ],
    answer: "A",
    hints: ["Who had the bomb in 1945, and who did not?"],
    explanation: "The **American monopoly** made Stalin feel threatened and led to an arms race once the USSR tested its own bomb in 1949.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Churchill made his 'Iron Curtain' speech at Fulton, Missouri, in March 1946.",
    answer: true,
    explanation: "True: on 5 March 1946, with President Truman present. Churchill was no longer Prime Minister.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At Potsdam, the leaders agreed that each power would take reparations mainly from its own zone of Germany.",
    answer: true,
    explanation: "True. The USSR was also to receive some industrial equipment from the western zones, which later caused arguments.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role as the wartime alliance broke down.",
    pairs: [
      ["George Kennan", "American diplomat who wrote the Long Telegram"],
      ["Winston Churchill", "Warned of an 'iron curtain' across Europe"],
      ["Harry Truman", "US President at the Potsdam Conference"],
      ["Joseph Stalin", "Soviet leader at both Yalta and Potsdam"],
    ],
    explanation: "Kennan (Long Telegram, February 1946); Churchill (Fulton speech, March 1946); Truman (President from April 1945); Stalin (attended both conferences).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Potsdam Conference",
      "Yalta Conference",
      "Churchill's 'Iron Curtain' speech",
      "Atomic bomb dropped on Hiroshima",
    ],
    right: POS,
    rightIndex: [1, 0, 3, 2],
    hints: ["The Iron Curtain speech came after the war had ended."],
    explanation: "Yalta (February 1945); Potsdam (July-August 1945); Hiroshima (6 August 1945); Iron Curtain speech (5 March 1946).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Yalta Conference was held in {{blank:a}} of 1945, and the USSR tested its first atomic bomb in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["February"], choices: ["February", "May", "July", "October"] },
      { id: "b", accepted: ["1949"], choices: ["1945", "1947", "1949", "1953"] },
    ],
    explanation: "Yalta met in **February** 1945; the Soviet bomb test in **1949** ended the American monopoly.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which country was the Potsdam Conference held?",
    accepted: ["Germany"],
    wrong: ["Russia", "Poland"],
    explanation: "Potsdam is just outside Berlin, in **Germany**, in the Soviet zone of occupation.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe what was agreed at the Yalta Conference.",
    points: [
      "Germany and Berlin to be divided into zones of occupation.",
      "War criminals tried / Germany to pay reparations.",
      "The USSR to join the war against Japan after Germany's defeat.",
      "Free elections in liberated Europe / the United Nations to be set up / Poland's borders moved west.",
    ],
    modelAnswer: "The Big Three agreed that Germany and Berlin would be divided into zones of occupation and that Nazi war criminals would be tried. The USSR promised to join the war against Japan once Germany was defeated. They also agreed that the liberated countries of Europe would hold free elections and that a United Nations organisation would be set up.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why relations between the allies were worse at Potsdam than at Yalta.",
    points: [
      "Identifies the change of leaders (Truman for Roosevelt; Attlee for Churchill).",
      "Explains that Truman was more suspicious of Stalin and took a firmer line.",
      "Identifies the Red Army's control of Eastern Europe / Poland.",
      "Explains that Stalin had installed a pro-communist government in Poland, which the West saw as breaking the Yalta promise of free elections (or: the atomic bomb made the USA more confident).",
    ],
    hints: ["What had changed between February and July 1945?"],
    modelAnswer: "By Potsdam Roosevelt had died, and Truman was far more suspicious of Stalin and less willing to compromise. Also, the Red Army now occupied most of Eastern Europe and Stalin had set up a pro-communist government in Poland, which the West saw as breaking the Yalta promise of free elections.",
    explanation: "Two marks for each developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the wartime alliance had broken down by the end of 1946.",
    points: [
      "Identifies ideological differences (capitalism and democracy against communism).",
      "Explains that each side saw the other's system as a threat, so trust was low once Hitler had gone.",
      "Identifies disputes over Poland and Eastern Europe.",
      "Explains that Stalin's buffer zone looked like expansion to the West.",
      "Identifies the atomic bomb / the Long Telegram and Iron Curtain speech.",
      "Explains that these hardened attitudes: Stalin felt threatened, and Western leaders now publicly described the USSR as an enemy.",
    ],
    hints: ["Use one long-term cause and two events of 1945-46."],
    modelAnswer: "The allies had little in common except their enemy. The USA was capitalist and democratic, the USSR communist, and each saw the other's system as a threat, so once Hitler was defeated there was little to hold them together. Poland and Eastern Europe were the main dispute: Stalin wanted a buffer zone of friendly governments, but to the West this looked like Soviet expansion and broke the Yalta promise of free elections. Finally, the atomic bomb made Stalin feel threatened, while Kennan's Long Telegram and Churchill's Iron Curtain speech in early 1946 showed that Western leaders now regarded the USSR as an enemy.",
    explanation: "Two marks for each developed reason, up to three reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in a Soviet magazine in March 1946, described in words", "A stout man in a bow tie and top hat stands on a platform holding a sign reading \"Iron Curtain\". Behind him, partly hidden, are tanks and bombs labelled \"Made in USA\". A small figure in a worker's cap, labelled \"the peoples of Europe\", watches with suspicion.", { described: true })}\n\n${source("Source B", "a letter from a fictional British soldier serving in Berlin to his family, April 1946", "Six months ago we drank toasts with the Russians at the zone border. Now we hardly speak to them. Their officers say our newspapers want another war; ours say they have shut half of Europe behind a fence. Nobody here knows who started it, but the friendliness has gone.")}`,
    hints: ["In (c), use who produced each source and why."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A?", points: [
        "The speaker of the Iron Curtain warning is himself a threat / a warmonger.",
        "He is backed by American weapons, so the West, not the USSR, is the danger.",
      ], explanation: "A supported message earns both marks." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B support the message of Source A?", points: [
        "Support: B shows Soviet officers believed the West wanted war, as in A.",
        "Challenge: B also reports the Western view that the USSR had shut off half of Europe.",
        "B is balanced and blames no one; A blames the West alone.",
        "Judgement on how far, supported from both sources.",
      ], explanation: "Compare specific details." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which source is more useful to a historian studying the breakdown of the alliance? Explain your answer.", points: [
        "A: Soviet propaganda, so one-sided, but useful evidence of the official Soviet reaction to the speech.",
        "Own knowledge: Stalin did call Churchill a warmonger.",
        "B: a private letter with no reason to deceive, but one soldier's view in one city.",
        "Own knowledge: confirms the change from wartime friendship to suspicion by 1946.",
        "Usefulness depends on the historian's question.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is Soviet propaganda, so it is one-sided: it shows the speaker as a warmonger backed by American weapons. But that makes it useful as evidence of how the Soviet government wanted its people to see the Iron Curtain speech, and it fits what I know, since Stalin publicly called Churchill a warmonger. Source B is a private letter with no obvious reason to deceive, and it shows how quickly wartime friendship turned to suspicion on the ground in Berlin, which matches the breakdown of 1945-46. However, it is only one soldier's experience. B is more useful for showing how the breakdown felt to ordinary people, while A is more useful for official Soviet attitudes; for the question of why the alliance broke down, B is slightly more useful because it records both sides' views.", explanation: "Weigh provenance and content against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), set the bomb against ideology, Eastern Europe and the change of leaders."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the disagreements at the Potsdam Conference.", points: [
        "Over reparations: the USSR wanted large amounts; the West feared ruining Germany.",
        "Over Poland: its government and its new western border on the Oder-Neisse line.",
        "Over Soviet influence in Eastern Europe / free elections.",
        "Atmosphere: Truman's suspicion; the bomb mentioned to Stalin.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'The atomic bomb was the main reason for the breakdown of the wartime alliance.' How far do you agree?", points: [
        ["For: the American monopoly alarmed Stalin and began the arms race", 2],
        ["Against: ideological rivalry since 1917 made distrust likely anyway", 2],
        ["Against: disputes over Poland and Eastern Europe came before the bomb (Yalta)", 2],
        ["Against: new leaders (Truman) and speeches of 1946 hardened attitudes", 2],
        ["Supported judgement on 'main reason'", 2],
      ], levels: levels(10), modelAnswer: "The bomb did damage relations. The USA tested it in July 1945 and used it in August, while the USSR had no such weapon. Stalin feared that the Americans would use their monopoly to force him to give way in Eastern Europe, so he ordered Soviet scientists to build a bomb, starting an arms race.\n\nHowever, the alliance was weak before the bomb existed. The USA and the USSR had been ideological enemies since 1917, and only Hitler had united them. The dispute over Poland had already begun at Yalta in February 1945, when Stalin backed a communist-led Polish government. Roosevelt's death brought Truman, who was more suspicious of Stalin, and in 1946 the Long Telegram and the Iron Curtain speech showed Western leaders treating the USSR as an enemy.\n\nThe bomb therefore made distrust worse, but it was not the main reason. The deeper cause was the clash of ideologies and security needs, shown most clearly in the struggle over Eastern Europe.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was the Yalta Conference?", "February 1945 (Roosevelt, Churchill, Stalin).");
  b.card("FACT", "When was the Potsdam Conference, and who attended?", "July-August 1945: Truman, Stalin, Churchill and then Attlee.");
  b.card("DEFINITION", "Cold War", "Tension and rivalry between the USA and the USSR and their allies (about 1945-1991) without direct war between them.");
  b.card("DEFINITION", "Buffer zone", "A belt of friendly states between a country and possible enemies; Stalin wanted one in Eastern Europe.");
  b.card("FACT", "What was the Long Telegram?", "George Kennan's report from Moscow (February 1946): the USSR would expand but back down when firmly resisted.");
  b.card("FACT", "When and where did Churchill make his 'Iron Curtain' speech?", "5 March 1946, at Fulton, Missouri, USA, with Truman present.");
  b.card("CONCEPT", "Why did the atomic bomb increase distrust?", "The USA had a monopoly; Stalin felt threatened and began a race to build a Soviet bomb (tested 1949).");
  b.card("CONCEPT", "Why did the Yalta promise of free elections cause trouble?", "The West meant genuinely free elections; Stalin meant governments friendly to the USSR, as in Poland.");
  b.card("CONCEPT", "Why was the alliance of 1941-45 called a 'marriage of convenience'?", "The USA, Britain and the USSR shared only a common enemy, Hitler; their ideologies were opposed.");
});
