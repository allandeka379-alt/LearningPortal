// Slice W4a: Nazi persecution of minorities and the Final Solution (0470 Depth study B, key question 3a).
// Taught with respect for victims: no graphic detail; numbers are historians' estimates.
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.germany.persecution", { file: "germany/persecution", keyPrefix: "germany.persecution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year were the Nuremberg Laws passed?",
    options: [
      ["1935", "Correct: on 15 September 1935."],
      ["1933", "1933 saw the boycott and the civil service law."],
      ["1938", "1938 was the year of Kristallnacht."],
      ["1942", "1942 was the year of the Wannsee Conference."],
    ],
    answer: "A",
    explanation: "The **Nuremberg Laws** were announced at the Nazi Party rally in September **1935**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Nuremberg Laws of 1935 do?",
    options: [
      ["Took away Jews' German citizenship", "Correct: and banned marriage between Jews and non-Jewish Germans."],
      ["Ordered the boycott of Jewish shops for one day", "The boycott took place in April 1933."],
      ["Set up the first ghettos in German cities", "Ghettos were created in occupied Poland from 1939."],
      ["Allowed Jews to emigrate with all their property", "Emigrants lost most of their property."],
    ],
    answer: "A",
    explanation: "The laws removed Jews' **citizenship** and banned marriages and relationships with non-Jewish Germans.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What was Kristallnacht?",
    options: [
      ["Organised attacks on Jews and their property, November 1938", "Correct: 'the night of broken glass'."],
      ["The boycott of Jewish shops in April 1933", "The boycott came five years earlier."],
      ["The meeting at which the Final Solution was co-ordinated", "This was the Wannsee Conference of 1942."],
      ["The fire that destroyed the Reichstag in 1933", "The Reichstag Fire was in February 1933."],
    ],
    answer: "A",
    explanation: "On **9-10 November 1938** Nazi mobs attacked Jewish homes, shops and synagogues across Germany and Austria.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the purpose of the Wannsee Conference of January 1942?",
    options: [
      ["To co-ordinate the murder of Europe's Jews", "Correct: officials organised the 'Final Solution'."],
      ["To plan the invasion of the Soviet Union", "The invasion began in June 1941."],
      ["To agree the Nazi-Soviet Pact", "The pact was signed in August 1939."],
      ["To decide how to rebuild bombed German cities", "Wannsee concerned the murder of the Jews."],
    ],
    answer: "A",
    explanation: "At **Wannsee** senior officials co-ordinated the deportation and murder of the Jews of Europe.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Jehovah's Witnesses face persecution in Nazi Germany?",
    options: [
      ["They refused the Hitler salute and army service", "Correct: their beliefs put loyalty to God first."],
      ["They were classed by the Nazis as a separate race", "The persecution was because of their beliefs."],
      ["They had led the Spartacist rising of 1919", "They had no part in it."],
      ["They had organised strikes against the Labour Front", "This was not the reason."],
    ],
    hints: ["Think about what their faith would not allow them to do."],
    answer: "A",
    explanation: "Witnesses would not **salute Hitler** or **serve in the army**, so thousands were sent to camps.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was Kristallnacht a turning point in the persecution of Jews?",
    options: [
      ["Persecution moved from laws to nationwide violence", "Correct: followed by mass arrests and seizures."],
      ["It was the first time Jews lost their citizenship", "Citizenship was removed in 1935."],
      ["It marked the end of the persecution of Jews in Germany", "Persecution became far worse."],
      ["It was the moment Jews were first allowed to emigrate", "Emigration had been happening since 1933."],
    ],
    hints: ["Compare it with the measures of 1933 and 1935."],
    answer: "A",
    explanation: "Kristallnacht brought **organised violence**, mass arrests and the seizure of Jewish businesses.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did the Second World War lead to an increase in the scale of Nazi persecution?",
    options: [
      ["Conquest brought millions more Jews under Nazi rule", "Correct: especially in Poland and the USSR."],
      ["The League of Nations ordered Germany to deport Jews", "The League did no such thing."],
      ["Most German Jews had joined the Allied armies by 1940", "Most German Jews could not leave."],
      ["Britain closed the death camps in Poland in 1940", "The death camps were not built until 1941-42."],
    ],
    hints: ["Think about where most of Europe's Jews lived."],
    answer: "A",
    explanation: "The conquest of **Poland and the western USSR**, home to millions of Jews, and the cover of war radicalised policy.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement describes the view that the Holocaust 'developed step by step'?",
    options: [
      ["Policy grew more radical through competition and war", "Correct: not a single plan from 1933."],
      ["Hitler drew up a detailed plan for mass murder in 1924", "This overstates the 'intentionalist' view."],
      ["The persecution was carried out without Hitler's knowledge", "Historians agree Hitler's anti-Semitism was central."],
      ["Ordinary Germans knew nothing and played no part", "Historians show wide participation and knowledge."],
    ],
    hints: ["This interpretation stresses process rather than one plan."],
    answer: "A",
    explanation: "This view argues that policy **radicalised** as Nazi leaders competed and the war created new pressures.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In 1933 Jews made up less than one per cent of Germany's population.",
    answer: true,
    explanation: "True. About half a million Jews lived in Germany, less than one per cent of the population.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The death camps built for mass murder, such as Treblinka, were located inside Germany.",
    answer: false,
    explanation: "False. They were in occupied Poland. Camps in Germany, such as Dachau, were concentration camps.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each group with the way the Nazis persecuted it.",
    pairs: [
      ["Disabled people", "Compulsory sterilisation from 1933 and secret killings from 1939"],
      ["Homosexual men", "Imprisonment under a strengthened law; pink triangle in the camps"],
      ["Jehovah's Witnesses", "Imprisoned for refusing military service"],
      ["Roma and Sinti", "Classed as racial enemies, deported and murdered"],
    ],
    explanation: "Each group was persecuted for a different reason, but all were excluded from the Nazi 'people's community'.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Kristallnacht",
      "The Wannsee Conference",
      "The boycott of Jewish businesses",
      "The Nuremberg Laws",
    ],
    right: POS,
    rightIndex: [2, 3, 0, 1],
    hints: ["Persecution in Germany began in 1933; the conference came during the war."],
    explanation: "Boycott (April 1933); Nuremberg Laws (September 1935); Kristallnacht (November 1938); Wannsee (January 1942).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Historians estimate that about {{blank:a}} Jews were murdered in the Holocaust. The largest of the death camps was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["six million"], choices: ["six million", "one million", "twenty million", "half a million"] },
      { id: "b", accepted: ["Auschwitz-Birkenau"], choices: ["Auschwitz-Birkenau", "Dachau", "Nuremberg", "Wannsee"] },
    ],
    explanation: "About **six million** Jews were murdered; at **Auschwitz-Birkenau** about 1.1 million people were killed.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Give the German name, meaning 'the night of broken glass', for the attacks of 9-10 November 1938.",
    accepted: ["Kristallnacht", "Crystal Night", "Kristall Nacht", "Reichskristallnacht"],
    wrong: ["Nuremberg"],
    hints: ["Kristall means glass or crystal; Nacht means night."],
    explanation: "**Kristallnacht** refers to the broken glass of Jewish shop windows that covered the streets.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the events of Kristallnacht and what followed.",
    points: [
      "Followed the shooting of a German diplomat in Paris by a young Jewish refugee (November 1938).",
      "Nazi mobs attacked Jewish homes and shops and burned hundreds of synagogues, while police stood by.",
      "About 90 Jews killed and about 30,000 Jewish men sent to concentration camps (estimates).",
      "Afterwards: the community fined one billion Reichsmarks; businesses seized; children expelled from schools.",
    ],
    modelAnswer: "In November 1938 a young Jewish refugee shot a German diplomat in Paris. On 9-10 November the Nazis organised attacks across Germany and Austria: mobs smashed Jewish shops and homes and burned hundreds of synagogues, while police and firemen did not intervene. Historians estimate that about 90 Jews were killed, and about 30,000 Jewish men were sent to concentration camps. Afterwards the Jewish community was fined one billion Reichsmarks, Jewish businesses were taken over, and Jewish children were expelled from German schools.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why many German Jews found it hard to emigrate in the 1930s.",
    points: [
      "Identifies loss of property / money.",
      "Explains that emigrants had to leave most of their property and savings behind, making it hard to start again.",
      "Identifies limits set by other countries.",
      "Explains that many countries restricted the number of refugees they accepted, so visas were hard to obtain.",
    ],
    hints: ["Think about obstacles in Germany and abroad."],
    modelAnswer: "The Nazi state made Jews leave most of their property and savings behind, so many families could not afford to emigrate or start new lives abroad. At the same time many countries restricted the number of refugees they would accept, so visas were very hard to obtain, and older people in particular found it difficult to leave their homes and communities.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Nazis persecuted many groups in German society.",
    points: [
      "Identifies racial ideology.",
      "Explains the aim of a racially 'pure' people's community, so Jews, Roma and Sinti were seen as enemies.",
      "Identifies the idea of a 'healthy' nation / conformity.",
      "Explains that disabled people, homosexual men and others were seen as weakening the nation.",
      "Identifies scapegoating and political or economic motives.",
      "Explains that Jews were blamed for defeat and the Depression, Witnesses would not obey, and property seized benefited the regime.",
    ],
    hints: ["Race, 'health' and loyalty."],
    modelAnswer: "The Nazis wanted a people's community of racially 'pure' Germans, so they treated Jews, and Roma and Sinti, as racial enemies who had to be removed. They also wanted a 'healthy' and conforming nation, so disabled people were sterilised and later murdered, and homosexual men were imprisoned as a supposed threat to the birth rate. Jews were used as scapegoats for Germany's defeat and the Depression, which united Nazi supporters against a common enemy, and seizing Jewish property benefited the state and many individuals. Groups such as Jehovah's Witnesses were persecuted because they would not obey the regime.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a report by a fictional American newspaper correspondent in Berlin, sent on 11 November 1938", "The windows of almost every Jewish shop on the street lie in the gutter. Men in ordinary clothes did much of the damage, but they moved in organised groups and the police stood by. A synagogue near my office burned through the night while the fire brigade protected only the buildings next to it. Many Berliners watched in silence; a few looked ashamed.")}\n\n${source("Source B", "an article in a Nazi-controlled German newspaper, 11 November 1938, summarised in words", "The article claimed that the events of the night were a spontaneous outburst of popular anger after the shooting of a German diplomat in Paris, and that the government had acted quickly to restore calm.", { described: true })}`,
    hints: ["Who organised the events? Compare each source's view."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you infer from Source A about Kristallnacht?", points: [
        "It was organised, not spontaneous (groups; police and fire brigade did not intervene).",
        "Many Germans did not take part but did not resist (silence, shame).",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about Kristallnacht?", points: [
        "Disagree: B says spontaneous popular anger; A shows organised groups.",
        "Disagree: B says the government restored calm; A shows police and firemen standing by.",
        "Disagree: A suggests many Berliners did not share the anger; B claims the people were angry.",
        "Agree: both show that serious violence took place after the Paris shooting / on the same night.",
      ], explanation: "Points of disagreement and any agreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which source is more reliable about who was responsible for Kristallnacht? Use the sources and your own knowledge.", points: [
        "B: Nazi-controlled press, purpose to deny state responsibility and blame 'the people'.",
        "B's claim contradicted by own knowledge: the attacks were organised by the Nazis (SA and party).",
        "A: foreign eyewitness, no reason to support the regime; written immediately.",
        "A: details (police and fire brigade inactive, organised groups) match own knowledge.",
        "A: an outsider might not know who gave orders; observed one street.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is more reliable. It is an eyewitness report by a foreign correspondent written the day after, with no reason to support the Nazi regime. Its details, organised groups, police standing by and the fire brigade protecting only neighbouring buildings, match what historians know: the attacks were organised by the Nazi Party and the SA after the shooting in Paris. A foreign reporter could only see part of Berlin and could not know who gave the orders, so it is limited. Source B comes from a Nazi-controlled newspaper whose purpose was to deny that the state was responsible and to claim the violence was a spontaneous popular reaction, which my own knowledge shows was false. Source B is useful as evidence of Nazi propaganda, but Source A is the better evidence of responsibility.", explanation: "Reliability from provenance and content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare measures before and after 1939."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the persecution of disabled people in Nazi Germany.", points: [
        "Seen as a burden / threat to a 'healthy' nation.",
        "Sterilisation law of July 1933; about 400,000 people sterilised (estimate).",
        "From 1939 a secret programme killed disabled children and adults in hospitals.",
        "Officially stopped in 1941 after protests (e.g. Bishop von Galen) but continued in secret.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'Kristallnacht was the most important turning point in the persecution of the Jews.' How far do you agree?", points: [
        ["For: shift from legal discrimination to open, organised violence; mass arrests", 2],
        ["For: economic exclusion, fine, expulsion from schools; made emigration urgent", 2],
        ["Against: Nuremberg Laws (1935) already removed citizenship and legal equality", 2],
        ["Against: war (1939-41) was the decisive turning point: ghettos, shootings, Wannsee, death camps", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Kristallnacht was a major turning point. Before November 1938 persecution had mostly taken the form of boycotts and laws, but now the regime organised open violence across Germany and Austria: synagogues were burned, homes and shops attacked, about 90 people killed and about 30,000 Jewish men sent to camps. Afterwards Jews were removed from economic life, fined and their children expelled from schools, which made emigration desperately urgent.\n\nHowever, other turning points were also important. The Nuremberg Laws of 1935 had already taken away Jews' citizenship and legal equality, creating the basis for everything that followed. Above all, the war changed persecution into genocide: the conquest of Poland and the invasion of the USSR brought millions more Jews under Nazi control, leading to ghettos, mass shootings, the Wannsee Conference of 1942 and the death camps.\n\nI partly agree. Kristallnacht was the turning point for German Jews before the war, but the most important turning point in the Holocaust as a whole was the war of 1939-41, which turned persecution into mass murder.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Anti-Semitism", "Hostility to, prejudice against or hatred of Jewish people.");
  b.card("DEFINITION", "Genocide", "The deliberate killing of a large group of people with the aim of destroying that group.");
  b.card("FACT", "What were the Nuremberg Laws (1935)?", "Laws that took away Jews' citizenship and banned marriage with non-Jewish Germans.");
  b.card("FACT", "When was Kristallnacht?", "9-10 November 1938.");
  b.card("FACT", "What happened at the Wannsee Conference (20 January 1942)?", "Officials co-ordinated the deportation and murder of the Jews of Europe (the 'Final Solution').");
  b.card("FACT", "How many Jews were murdered in the Holocaust?", "Historians estimate about six million.");
  b.card("FACT", "Which other groups did the Nazis persecute?", "Roma and Sinti, disabled people, homosexual men, Jehovah's Witnesses and political opponents.");
  b.card("FACT", "What was the Warsaw Ghetto Uprising?", "An armed revolt by Jews in the Warsaw ghetto in 1943 against deportation.");
  b.card("CONCEPT", "Why did persecution become mass murder during the war?", "Conquest brought millions more Jews under Nazi rule, and the war radicalised policy and hid the killing.");
});
