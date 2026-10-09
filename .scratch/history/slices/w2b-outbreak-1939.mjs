// Slice W2b: the outbreak of war in 1939 and who was to blame (ZIMSEC 12.5, 0470 B3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.road-to-war.outbreak-1939", { file: "road-to-war/outbreak-1939", keyPrefix: "road-to-war.outbreak-1939" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Nazi-Soviet Pact signed?",
    options: [
      ["23 August 1939", "Correct: by Ribbentrop and Molotov in Moscow."],
      ["1 September 1939", "That is when Germany invaded Poland."],
      ["31 March 1939", "That is when Britain and France guaranteed Poland."],
      ["15 March 1939", "That is when German troops entered Prague."],
    ],
    answer: "A",
    explanation: "The **Nazi-Soviet Pact** was signed on 23 August 1939.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did Britain declare war on Germany?",
    options: [
      ["3 September 1939", "Correct: after its ultimatum expired."],
      ["1 September 1939", "That was the German invasion of Poland."],
      ["17 September 1939", "That was the Soviet invasion of eastern Poland."],
      ["30 September 1938", "That was the day after the Munich Conference ended."],
    ],
    answer: "A",
    explanation: "Britain declared war on **3 September 1939**; France followed the same day.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the German occupation of Prague in March 1939 end appeasement?",
    options: [
      ["Hitler had taken land where few Germans lived", "Correct: he could no longer claim to be uniting German speakers."],
      ["The League of Nations ordered Britain to declare war", "The League gave no such order."],
      ["Czechoslovakia was a member of the British Empire", "Czechoslovakia was an independent state, not part of the Empire."],
      ["Mussolini asked Britain to stop Hitler", "Mussolini was Hitler's ally by 1939."],
    ],
    answer: "A",
    explanation: "Bohemia and Moravia were Czech lands, so Hitler's claim that he only wanted to unite Germans was exposed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the secret protocol of the Nazi-Soviet Pact contain?",
    options: [
      ["A plan to divide Poland between Germany and the USSR", "Correct: and Soviet spheres in the Baltic and Bessarabia."],
      ["A promise that the USSR would join the war against Britain", "The USSR did not agree to fight Britain."],
      ["An agreement to return the Sudetenland to Czechoslovakia", "The pact did not concern the Sudetenland."],
      ["A plan for a joint invasion of France in 1940", "The USSR took no part in the invasion of France."],
    ],
    answer: "A",
    explanation: "The **secret protocol** divided Poland and gave the USSR a sphere of influence in the Baltic states and Bessarabia.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Hitler demand from Poland in 1939?",
    options: [
      ["Danzig and a route across the Polish Corridor", "Correct: a German road and railway to East Prussia."],
      ["The return of Alsace-Lorraine", "Alsace-Lorraine belonged to France, not Poland."],
      ["Control of the Saar coalfield", "The Saar had rejoined Germany in 1935."],
      ["Polish membership of the Anti-Comintern Pact only", "Hitler's demands centred on Danzig and the Corridor."],
    ],
    answer: "A",
    explanation: "Hitler demanded **Danzig** and a road and railway across the **Polish Corridor** to East Prussia.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the Nazi-Soviet Pact important to Hitler?",
    options: [
      ["It meant he could attack Poland without a two-front war", "Correct: the USSR would not fight him in the east."],
      ["It gave Germany control over the Soviet army", "The USSR kept full control of its own forces."],
      ["It ended Britain's guarantee to Poland", "The guarantee stood, and Britain signed an alliance with Poland on 25 August."],
      ["It meant that the USA would remain neutral", "The pact had nothing to do with US neutrality."],
    ],
    answer: "A",
    hints: ["Think about Germany's position between east and west."],
    explanation: "With the USSR neutral, Hitler could attack Poland without fearing war on two fronts, and he believed Britain and France would not fight alone.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a reason why Stalin signed the pact with Hitler?",
    options: [
      ["He distrusted Britain and France after Munich", "Correct: he had been excluded from the Munich Conference."],
      ["He shared Hitler's aim of Lebensraum in the east", "Lebensraum was aimed at Soviet land, so Stalin could not share it."],
      ["Britain had refused to talk to the USSR at all", "Britain and France did hold talks, though slowly."],
      ["Poland had asked the USSR to protect it", "Poland refused to allow Soviet troops on its soil."],
    ],
    answer: "A",
    hints: ["Which conference was Stalin not invited to?"],
    explanation: "Stalin had been left out of **Munich**, and the slow Anglo-French talks convinced him that the West could not be trusted; the pact also bought time and territory.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which fact most weakens the claim that the Nazi-Soviet Pact caused the invasion of Poland?",
    options: [
      ["Hitler had ordered plans to invade Poland in April 1939", "Correct: the decision was taken months before the pact."],
      ["The pact was signed only nine days before the invasion", "This timing suggests the pact was important, not the reverse."],
      ["The USSR invaded eastern Poland on 17 September", "This shows the pact was carried out, not that it was unimportant."],
      ["The pact included a secret protocol about Poland", "This suggests the pact helped plan the invasion."],
    ],
    answer: "A",
    hints: ["Look for evidence that the decision came before 23 August."],
    explanation: "Plans for the invasion of Poland were ordered in April 1939, so the pact made the attack safer rather than causing it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Soviet forces invaded eastern Poland on 17 September 1939.",
    answer: true,
    explanation: "True. The USSR took the eastern half of Poland, as agreed in the secret protocol.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Poland agreed in 1939 to let Soviet troops enter its territory to fight Germany.",
    answer: false,
    explanation: "False. Poland refused, which was one reason the Anglo-French talks with the USSR failed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event of 1939 with its date.",
    pairs: [
      ["German troops enter Prague", "15 March 1939"],
      ["British and French guarantee to Poland", "31 March 1939"],
      ["Nazi-Soviet Pact", "23 August 1939"],
      ["Germany invades Poland", "1 September 1939"],
    ],
    explanation: "Prague 15 March; guarantee 31 March; pact 23 August; invasion 1 September 1939.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Pact of Steel",
      "The Munich Agreement",
      "Britain declares war on Germany",
      "Germany takes Memel from Lithuania",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Munich was in 1938; Memel was taken a week after Prague."],
    explanation: "Munich September 1938; Memel March 1939; Pact of Steel May 1939; war 3 September 1939.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Nazi-Soviet Pact was signed by the foreign ministers Ribbentrop and {{blank:a}}. In May 1939 Germany and Italy signed the Pact of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Molotov"], choices: ["Molotov", "Trotsky", "Litvinov", "Beria"] },
      { id: "b", accepted: ["Steel"], choices: ["Steel", "Iron", "Stresa", "Locarno"] },
    ],
    explanation: "**Molotov** had replaced Litvinov as Soviet foreign minister in May 1939. The **Pact of Steel** was a military alliance between Germany and Italy.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the free city on the Baltic that Hitler demanded from Poland in 1939.",
    accepted: ["Danzig", "Gdansk", "Gdańsk"],
    wrong: ["Memel"],
    explanation: "**Danzig** had been a free city under the League since 1920.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the terms of the Nazi-Soviet Pact.",
    points: [
      "Germany and the USSR agreed not to attack each other (non-aggression, for ten years).",
      "Signed by Ribbentrop and Molotov on 23 August 1939.",
      "Secret protocol divided Poland between them.",
      "Secret protocol gave the USSR a sphere in the Baltic states / Bessarabia.",
    ],
    modelAnswer: "On 23 August 1939 Ribbentrop and Molotov signed a ten-year non-aggression pact. A secret protocol divided Poland between Germany and the USSR and placed the Baltic states and Bessarabia in the Soviet sphere.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Britain and France declared war on Germany in September 1939 when they had not fought over Czechoslovakia in 1938.",
    points: [
      "Identifies the occupation of Prague (March 1939).",
      "Explains that it showed Hitler's aims were not limited to German speakers, so he could not be trusted.",
      "Identifies the guarantee to Poland / Anglo-Polish alliance.",
      "Explains that breaking a public promise would destroy their credibility.",
      "Identifies changed public opinion / better preparation.",
      "Explains that the British public now accepted war and rearmament (air defences) had advanced.",
    ],
    hints: ["What had changed between September 1938 and September 1939?"],
    modelAnswer: "The occupation of Prague in March 1939 showed that Hitler's aims went beyond uniting German speakers, so he could no longer be trusted. Britain and France had then publicly guaranteed Poland and Britain had signed an alliance with it, so failing to act would have destroyed their credibility. Public opinion had also changed, with most people now accepting war, and rearmament, especially in air defence, had advanced since 1938.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** ways in which appeasement helped to cause the Second World War.",
    points: [
      "Identifies that it encouraged Hitler.",
      "Explains that each success made him believe Britain and France would not fight for Poland either.",
      "Identifies that Munich alienated the USSR.",
      "Explains that Stalin's distrust led to the Nazi-Soviet Pact, which freed Hitler to attack Poland.",
    ],
    hints: ["Think about Hitler's expectations and Stalin's choices."],
    modelAnswer: "Appeasement encouraged Hitler: after the Rhineland, Austria and Munich he believed that Britain and France would not fight for Poland either, so he took the risk. It also alienated Stalin, who was excluded from Munich and concluded that the West could not be trusted, so he signed the Nazi-Soviet Pact, which freed Hitler to invade Poland.",
    explanation: "Two marks per explained way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in a British newspaper in September 1939, described in words", "Two men in uniform bow politely to each other over the body of a man lying on the ground, labelled \"Poland\". One, with a small moustache, raises his cap; the other, with a large moustache, raises his. Each secretly holds a knife behind his back pointed at the other. A caption reads: \"How long will the friendship last?\"", { described: true })}`,
    hints: ["Identify the two figures and explain the knives."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the two leaders shown in the cartoon and the event it refers to.", points: [
        "Hitler and Stalin.",
        "The Nazi-Soviet Pact / the division of Poland in September 1939.",
      ], explanation: "Leaders and event." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of the cartoonist? Use details of the cartoon.", points: [
        "Message: the two dictators had destroyed Poland together.",
        "Detail: the body labelled Poland between them.",
        "Message: their friendship was false / would not last.",
        "Detail: the hidden knives and the caption.",
      ], explanation: "Message and detail." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far was the cartoonist right about the Nazi-Soviet Pact? Use your own knowledge.", points: [
        "Right: the secret protocol divided Poland; both invaded (1 and 17 September).",
        "Right: ideological enemies; Hitler aimed at Lebensraum in Soviet land.",
        "Right: Germany invaded the USSR in June 1941.",
        "Qualification: in 1939-41 the pact worked for both (trade, Soviet gains in the Baltic, no two-front war).",
        "Qualification: the cartoonist could not know the secret protocol in detail at the time.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The cartoonist was largely right. The pact's secret protocol divided Poland, and Germany invaded from the west on 1 September 1939 and the USSR from the east on 17 September, so the two dictators did share the victim. They were also ideological enemies: Hitler wanted Lebensraum in Soviet land and hated communism, and in June 1941 Germany invaded the USSR, showing that the friendship did not last. However, the pact did work for both sides for almost two years: Germany avoided a two-front war and received Soviet raw materials, while the USSR gained eastern Poland and the Baltic states. Overall the cartoonist correctly saw the pact as a cynical deal between enemies, even if it lasted longer than some expected.", explanation: "Use own knowledge to test the message." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider long-term and short-term causes and how they linked."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events in Europe from the occupation of Prague to the end of March 1939.", points: [
        "15 March 1939: German troops occupied Bohemia and Moravia (Prague).",
        "Slovakia became a German-dependent state; Hungary took Ruthenia.",
        "Germany took Memel from Lithuania.",
        "31 March: Britain and France guaranteed Poland.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Hitler was to blame for the outbreak of war in 1939.\" How far do you agree?", points: [
        ["Hitler: aims (Lebensraum, overturning Versailles) and rearmament.", 2],
        ["Hitler: aggressive actions (Prague, Poland), invasion plans from April 1939.", 2],
        ["Other: Versailles created grievances; failure of the League encouraged aggression.", 2],
        ["Other: appeasement encouraged Hitler and alienated Stalin.", 2],
        ["Other: the Nazi-Soviet Pact freed Hitler from a two-front war; Taylor's opportunist view.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Hitler bears the main responsibility. His aims, set out in Mein Kampf, included overturning Versailles and winning Lebensraum in the east, which could only be achieved by war. He rearmed from 1933, took the Czech lands in March 1939 where few Germans lived, ordered plans for the invasion of Poland in April and attacked on 1 September.\n\nHowever, other factors made war more likely. The Treaty of Versailles gave Germans grievances that Hitler exploited. The League's failures over Manchuria and Abyssinia showed that aggression went unpunished. Appeasement encouraged Hitler to believe that Britain and France would not fight, and the exclusion of Stalin from Munich helped lead to the Nazi-Soviet Pact, which removed the danger of a two-front war. The historian A. J. P. Taylor argued that Hitler was an opportunist who took chances others gave him.\n\nOverall Hitler was most to blame, because the other factors only created opportunities; it was his decision to use them for expansion that turned a crisis into war. I largely agree with the statement.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did German troops occupy Prague?", "15 March 1939.");
  b.card("FACT", "When did Britain and France guarantee Poland?", "31 March 1939.");
  b.card("FACT", "When was the Nazi-Soviet Pact signed, and by whom?", "23 August 1939, by Ribbentrop and Molotov.");
  b.card("DEFINITION", "Secret protocol (1939)", "Hidden part of the Nazi-Soviet Pact dividing Poland and eastern Europe into German and Soviet spheres.");
  b.card("FACT", "When did Germany invade Poland?", "1 September 1939.");
  b.card("FACT", "When did Britain and France declare war?", "3 September 1939.");
  b.card("CONCEPT", "Why did Stalin sign the pact?", "Distrust of the West after Munich, failed Anglo-French talks, need for time to rebuild the Red Army, and territory in Poland and the Baltic.");
  b.card("CONCEPT", "Name five factors debated as causes of the Second World War.", "Hitler's aims, the Treaty of Versailles, the League's failure, appeasement, the Nazi-Soviet Pact.");
  b.card("DEFINITION", "Ultimatum", "A final demand with a deadline; Britain's to Germany expired on 3 September 1939.");
});
