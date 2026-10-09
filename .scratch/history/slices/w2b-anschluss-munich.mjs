// Slice W2b: Anschluss, Czechoslovakia and appeasement, 1938 (ZIMSEC 12.5, 0470 B3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.road-to-war.anschluss-munich", { file: "road-to-war/anschluss-munich", keyPrefix: "road-to-war.anschluss-munich" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which month and year did German troops enter Austria?",
    options: [
      ["March 1938", "Correct: on 12 March 1938."],
      ["July 1934", "In July 1934 a Nazi coup in Austria failed."],
      ["September 1938", "September 1938 was the Munich Conference."],
      ["March 1939", "In March 1939 Germany occupied the rest of the Czech lands."],
    ],
    answer: "A",
    explanation: "The **Anschluss** took place in March 1938: troops crossed on 12 March and union was proclaimed on 13 March.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the French Prime Minister who signed the Munich Agreement?",
    options: [
      ["Edouard Daladier", "Correct: he attended with Chamberlain, Hitler and Mussolini."],
      ["Georges Clemenceau", "Clemenceau led France at Paris in 1919."],
      ["Pierre Laval", "Laval was linked to the Hoare-Laval Pact of 1935."],
      ["Aristide Briand", "Briand was foreign minister in the 1920s and died in 1932."],
    ],
    answer: "A",
    explanation: "The four leaders at Munich were Hitler, Mussolini, Chamberlain and **Daladier**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which country was NOT represented at the Munich Conference of September 1938?",
    options: [
      ["Czechoslovakia", "Correct: the country being divided was not invited."],
      ["Mussolini's Italy", "Mussolini attended and helped arrange the conference."],
      ["France", "Daladier attended for France."],
      ["Britain", "Chamberlain attended for Britain."],
    ],
    explanation: "Czechoslovakia (and the USSR) were excluded; the Czech government had to accept the decision.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Hitler want the Sudetenland?",
    options: [
      ["Its three million German speakers and its forts", "Correct: taking it united Germans and stripped Czechoslovakia of its fortifications."],
      ["It held Germany's lost African colonies", "The Sudetenland was in central Europe, not Africa."],
      ["It had been part of the German Empire until 1919", "The Sudetenland had belonged to Austria-Hungary, not Germany."],
      ["It gave Germany a port on the Black Sea", "The Sudetenland has no coastline."],
    ],
    answer: "A",
    explanation: "The **Sudetenland** contained about three million German speakers and Czechoslovakia's main frontier fortifications.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Mussolini not oppose the Anschluss in 1938, as he had in 1934?",
    options: [
      ["He had become Hitler's ally after Abyssinia", "Correct: the Rome-Berlin Axis of 1936."],
      ["Italy had been defeated by Germany in a war", "There was no war between Italy and Germany."],
      ["The League of Nations ordered Italy to stay neutral", "The League had no such role by 1938."],
      ["Austria had asked Italy to support the union", "Austria's Chancellor tried to keep Austria independent."],
    ],
    answer: "A",
    explanation: "After Abyssinia, Mussolini drew close to Hitler; the Axis meant he would no longer protect Austria.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What was the significance of the meeting at Bad Godesberg on 22-23 September 1938?",
    options: [
      ["Hitler raised his demands, bringing Europe close to war", "Correct: he now insisted on immediate occupation."],
      ["Hitler and Chamberlain signed the final agreement", "The final agreement was signed at Munich a week later."],
      ["Czechoslovakia agreed to give Germany all its territory", "Czechoslovakia only accepted the loss of the Sudetenland."],
      ["Stalin joined the talks and promised to help the Czechs", "The USSR was not part of the meetings."],
    ],
    answer: "A",
    hints: ["Compare Hitler's demands at Berchtesgaden with those a week later."],
    explanation: "At Godesberg Hitler went beyond the agreement reached after Berchtesgaden, demanding immediate occupation, so Britain and France began to prepare for war.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a reason why Britain was reluctant to fight over Czechoslovakia in 1938?",
    options: [
      ["The Dominions were unwilling to go to war over it", "Correct: Canada and South Africa, for example."],
      ["Britain had a military alliance with Hitler's Germany", "Britain had no such alliance."],
      ["Czechoslovakia had already fallen to the USSR", "Czechoslovakia was an independent democracy in 1938."],
      ["The USA had promised to defend the Sudetenland", "The USA was isolationist and made no such promise."],
    ],
    answer: "A",
    hints: ["Britain usually went to war together with its empire."],
    explanation: "British leaders knew that several Dominions would not support a war over Czechoslovakia in 1938, a key reason for appeasement.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point is most often used to argue that appeasement was justified in 1938?",
    options: [
      ["It gave Britain time to build fighters and radar", "Correct: the 'buying time' argument."],
      ["It guaranteed that Czechoslovakia would survive as a state", "Czechoslovakia was destroyed by March 1939."],
      ["It persuaded Hitler to give up the aim of Lebensraum", "Hitler did not give up Lebensraum."],
      ["It brought the USSR into an alliance with Britain", "The USSR signed a pact with Germany in 1939."],
    ],
    answer: "A",
    hints: ["Think about what Britain did between September 1938 and September 1939."],
    explanation: "Defenders of appeasement argue that the year after Munich allowed Britain to build more fighter aircraft and radar stations, though Germany also grew stronger.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The plebiscite held in Austria in April 1938 was organised by the Nazis after German troops had arrived.",
    answer: true,
    explanation: "True. The vote of 10 April 1938, under Nazi control, recorded over 99 per cent approval.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Winston Churchill was a leading supporter of appeasement.",
    answer: false,
    explanation: "False. Churchill was the best-known critic of appeasement and of the Munich Agreement.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1938.",
    pairs: [
      ["Kurt Schuschnigg", "Austrian Chancellor who resigned in March"],
      ["Arthur Seyss-Inquart", "Austrian Nazi made Interior Minister"],
      ["Konrad Henlein", "Leader of the Sudeten German Party"],
      ["Neville Chamberlain", "British Prime Minister who flew to meet Hitler"],
    ],
    explanation: "Schuschnigg and Seyss-Inquart (Austria), Henlein (Sudetenland), Chamberlain (Britain).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events of 1938 in chronological order.",
    pairs: [
      "The Bad Godesberg meeting",
      "German troops enter Austria",
      "The Munich Conference",
      "Chamberlain meets Hitler at Berchtesgaden",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The Anschluss came six months before the Sudeten crisis peaked."],
    explanation: "Austria 12 March; Berchtesgaden 15 September; Godesberg 22-23 September; Munich 29-30 September.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "At Munich it was agreed that Germany would occupy the {{blank:a}} from 1 October 1938. Part of Czechoslovakia called Teschen was then seized by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Sudetenland"], choices: ["Sudetenland", "Rhineland", "Saar", "Polish Corridor"] },
      { id: "b", accepted: ["Poland"], choices: ["Poland", "Austria", "the USSR", "Romania"] },
    ],
    explanation: "Germany occupied the **Sudetenland** in stages from 1 October; **Poland** took Teschen and Hungary took land in southern Slovakia.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the British Prime Minister most closely linked with appeasement.",
    accepted: ["Neville Chamberlain", "Chamberlain", "Arthur Neville Chamberlain"],
    wrong: ["Churchill"],
    explanation: "**Neville Chamberlain**, Prime Minister from May 1937 to May 1940.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how Hitler achieved the Anschluss in 1938.",
    points: [
      "February 1938: forced Schuschnigg to give Seyss-Inquart (a Nazi) control of the police.",
      "Schuschnigg called a plebiscite on independence; Hitler demanded its cancellation.",
      "Schuschnigg resigned and German troops entered Austria on 12 March without resistance.",
      "Anschluss proclaimed; Nazi-run plebiscite (April) recorded over 99% approval.",
    ],
    modelAnswer: "In February 1938 Hitler forced Schuschnigg to appoint the Nazi Seyss-Inquart as Interior Minister. When Schuschnigg called a plebiscite on independence, Hitler demanded it be cancelled and threatened invasion. Schuschnigg resigned, German troops entered Austria on 12 March without resistance, and the union was proclaimed. A Nazi-run plebiscite in April recorded over 99 per cent approval.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Chamberlain followed a policy of appeasement.",
    points: [
      "Identifies public fear of war / memories of 1914-18.",
      "Explains that voters would not support another war, so a negotiated settlement seemed the only option.",
      "Identifies British military unreadiness.",
      "Explains that he needed time to rearm, especially air defences.",
      "Identifies belief that Versailles was unfair / Hitler's demands reasonable.",
      "Explains that uniting German speakers seemed to fit self-determination, so giving way seemed fair.",
    ],
    hints: ["Think about public opinion, Britain's forces and attitudes to Versailles."],
    modelAnswer: "Chamberlain appeased Hitler partly because the British public, remembering the slaughter of 1914-1918, was strongly opposed to another war. He also knew that Britain was not ready to fight: rearmament had only recently speeded up and air defences were incomplete, so he needed time. Finally, he and many others believed the Treaty of Versailles had been unfair, so Hitler's demands to unite German speakers seemed reasonable under self-determination.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the Munich Agreement weakened Czechoslovakia.",
    points: [
      "Identifies loss of the Sudeten fortifications.",
      "Explains that the country could no longer defend its frontier, so Hitler could take the rest easily in March 1939.",
      "Identifies loss of industry and population / land to Poland and Hungary.",
      "Explains that its economy and army were weakened and its neighbours also took territory.",
    ],
    hints: ["Think about defence and resources."],
    modelAnswer: "First, Czechoslovakia lost its frontier fortifications in the Sudeten mountains, so it could no longer defend itself, and Hitler took the rest of the Czech lands in March 1939 without a fight. Second, it lost about three million people and much of its industry, and Poland and Hungary also seized territory, so its economy and army were badly weakened.",
    explanation: "Two marks per explained way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in a British newspaper in early October 1938, described in words", "A smiling man with an umbrella stands on a doorstep waving a piece of paper to a cheering crowd. Behind him, out of sight of the crowd, a small figure labelled \"Czechoslovakia\" sits alone on the ground, its pockets turned out. Above the door a banner reads \"Welcome home\".", { described: true })}\n\n${source("Source B", "a letter from a fictional British mother to her local newspaper, 3 October 1938", "My husband came home from France in 1918 with one lung. I thank God that my sons will not be sent to die for a country most of us could not find on a map. Mr Chamberlain has done what every mother in England prayed for.")}`,
    hints: ["Consider who is shown or left out in Source A, and why the writer of B feels as she does."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the Munich Agreement?", points: [
        "It was popular in Britain / Chamberlain welcomed as a hero.",
        "Czechoslovakia paid the price / was left alone and robbed.",
      ], explanation: "Two inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why might the writer of Source B have supported the Munich Agreement?", points: [
        "Memories of 1914-1918: her husband was wounded.",
        "Fear for her sons being sent to war.",
        "Czechoslovakia seen as far away and not Britain's concern.",
        "Reflects widespread public relief / opinion against war in 1938.",
      ], explanation: "Reasons from the source and context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Do these sources prove that the Munich Agreement was a mistake? Use the sources and your own knowledge.", points: [
        "Source A suggests a mistake: Czechoslovakia sacrificed; the paper may be worthless.",
        "Own knowledge supporting A: Czech fortifications lost; Prague occupied March 1939; USSR alienated.",
        "Source B shows why many saw it as right: public relief, fear of war.",
        "Own knowledge supporting B: Britain unready; Dominions unwilling; time to build fighters and radar.",
        "Provenance: A a critical cartoon; B one personal view; neither proves the case.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A suggests that Munich was a mistake: Chamberlain is cheered, but Czechoslovakia sits alone with empty pockets, implying that it was robbed and that his piece of paper may be worthless. My own knowledge supports this, since the Czechs lost their fortifications and Hitler occupied Prague in March 1939, and the exclusion of the USSR helped push Stalin towards the Nazi-Soviet Pact. Source B, however, shows why many people thought Munich right: memories of the last war made the public desperate for peace. My knowledge also shows that Britain was not ready in 1938, the Dominions would not fight, and the following year was used to build fighters and radar. Source A is one cartoonist's critical opinion and Source B one mother's feelings, so neither proves the case. The sources show that Munich was understandable in 1938, but events in 1939 suggest it was a mistake.", explanation: "Use both sources, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge the policy by what was known and possible in 1938."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events of the Sudeten crisis between 15 and 30 September 1938.", points: [
        "15 September: Chamberlain met Hitler at Berchtesgaden; Hitler demanded areas with a German majority.",
        "Britain and France pressed Czechoslovakia to agree.",
        "22-23 September: at Godesberg Hitler raised his demands (immediate occupation); war seemed close.",
        "29-30 September: Munich Conference (Hitler, Chamberlain, Daladier, Mussolini) gave Germany the Sudetenland; Czechs excluded.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Appeasement was the right policy for Britain in 1938.\" How far do you agree?", points: [
        ["Agree: British public opinion and memories of the First World War.", 2],
        ["Agree: military unreadiness; time gained for fighters and radar.", 2],
        ["Agree: Dominions and USA unwilling; France divided; Versailles seen as unfair.", 2],
        ["Disagree: encouraged Hitler; he took Prague in March 1939.", 2],
        ["Disagree: abandoned a democratic ally with a strong army and fortifications; alienated the USSR (Nazi-Soviet Pact); Germany also rearmed.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "There are strong arguments that appeasement was right in 1938. The British public, remembering the losses of 1914-1918, did not want war. British rearmament had only recently speeded up, and the chiefs of staff warned that air defences were not ready; the following year allowed more fighter aircraft and radar stations to be built. The Dominions would not fight over Czechoslovakia, the USA was isolationist and France would not act alone. Many also believed the Sudeten Germans had a fair claim.\n\nOn the other hand, appeasement encouraged Hitler. Six months after Munich he occupied Prague, showing his aims were not limited to German speakers. Britain abandoned a democracy that had a good army, strong fortifications and the Skoda works, and Stalin, excluded from Munich, concluded that the West could not be trusted, which led to the Nazi-Soviet Pact. Germany also used the year to rearm.\n\nOverall appeasement was understandable, and in 1938 Britain had few good alternatives, but it rested on the false belief that Hitler could be satisfied. I partly agree: it was the realistic choice at the time, but not the right policy in the longer run.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Anschluss", "Union of Austria with Germany, March 1938, forbidden by the Treaty of Versailles.");
  b.card("DEFINITION", "Appeasement", "Avoiding war by giving way to an aggressor's demands that seemed reasonable; linked with Chamberlain.");
  b.card("FACT", "When did German troops enter Austria?", "12 March 1938.");
  b.card("FACT", "Who attended the Munich Conference?", "Hitler, Mussolini, Chamberlain and Daladier (not Czechoslovakia or the USSR).");
  b.card("FACT", "When was the Munich Conference?", "29-30 September 1938.");
  b.card("FACT", "Give the three meetings of the Sudeten crisis in order.", "Berchtesgaden (15 September), Bad Godesberg (22-23 September), Munich (29-30 September 1938).");
  b.card("CONCEPT", "Give four reasons for appeasement.", "Fear of war after 1914-18, British unreadiness, belief Versailles was unfair, lack of support from Dominions, USA and France (also fear of communism).");
  b.card("CONCEPT", "Give three arguments against appeasement.", "It encouraged Hitler, sacrificed Czechoslovakia's army and defences, and alienated the USSR.");
  b.card("FACT", "Who led the Sudeten German Party?", "Konrad Henlein.");
});
