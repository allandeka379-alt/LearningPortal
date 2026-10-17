// W4a: ahist.holocaust.nazi-policy-1933-45 (Cambridge Paper 3 Topic 2, context; A Level only).
import { concept, P, source, extract, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.holocaust.nazi-policy-1933-45", { file: "holocaust/nazi-policy-1933-45", keyPrefix: "holocaust.nazi-policy-1933-45" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Roughly how many Jewish people were murdered in the Holocaust, according to the scholarly estimate?",
    ok: ["About six million", "Correct: this is the widely accepted estimate."],
    no: [
      ["About six hundred thousand", "This is far too low."],
      ["About sixty million", "This is a figure close to the total deaths of the whole war."],
      ["About sixteen thousand", "This is far too low."],
    ],
    explanation: "Historians estimate about six million Jewish victims, with some variation in the exact range, out of roughly nine million Jews in Europe before the war.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the Wannsee Conference of 20 January 1942?",
    ok: ["A meeting of officials to coordinate the deportations of Jews", "Correct: it was chaired by Heydrich and planned the 'Final Solution'."],
    no: [
      ["A meeting at which the Allies condemned the murder of the Jews", "The Allied declaration was issued in December 1942."],
      ["A conference at which Jewish leaders met to plan their resistance", "It was a meeting of Nazi officials."],
      ["A trial of Nazi leaders for crimes against humanity", "The trials began in 1945."],
    ],
    explanation: "Reinhard Heydrich chaired the meeting of senior officials in a Berlin suburb. Historians stress that it coordinated a policy already under way rather than starting it.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the role of the Einsatzgruppen after the invasion of the Soviet Union in June 1941?",
    ok: ["They were mobile killing units that shot Jews behind the front", "Correct: they murdered many hundreds of thousands in 1941-42."],
    no: [
      ["They were army units that guarded the ghettos in occupied Poland", "The ghettos were mostly guarded by German police and local forces."],
      ["They were Jewish councils that ran the ghettos on German orders", "The councils were the Judenräte."],
      ["They were Allied units that helped to liberate the camps", "They were German units."],
    ],
    explanation: "The Einsatzgruppen, supported by police, army and local collaborators, shot Jews and others in occupied territory. Historians estimate that well over a million Jews were shot in the east.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the aim of Nazi policy towards the Jews change after the outbreak of war?",
    ok: ["It moved from forcing Jews to emigrate to deportation and mass murder", "Correct: war made emigration impossible and radicalised policy."],
    no: [
      ["It moved from deportation and mass murder to granting equal rights", "Equal rights were never given."],
      ["It moved from killing to moving Jews to a new Jewish state", "The Madagascar plan was never carried out."],
      ["It moved from persecution of Jews to the persecution of other groups only", "Jews remained the main target."],
    ],
    hints: ["Think about what happened to the possibility of emigration after 1939."],
    explanation: "Before 1939 the aim was to drive Jews out. The war put millions more Jews under German control and made emigration impossible, and policy radicalised towards murder.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Judenräte (Jewish Councils) face a terrible dilemma?",
    ok: ["They had to carry out German orders affecting their own people", "Correct: refusing risked reprisals, while obeying helped the occupiers."],
    no: [
      ["They were given control over the German police in the ghettos", "They had no power over the police."],
      ["They were elected by all Jews in Europe to speak to the Allies", "They were appointed by the Germans for a single ghetto."],
      ["They were paid large salaries by the Nazi government for their work", "They faced danger, not rewards."],
    ],
    hints: ["Think about what the Germans required them to organise."],
    explanation: "The councils were forced to organise labour, supplies and sometimes lists. Historians judge their conduct with care, since they acted under extreme pressure and with limited knowledge.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which event shows armed resistance by Jews in 1943?",
    ok: ["The Warsaw Ghetto Uprising", "Correct: it began on 19 April 1943."],
    no: [
      ["The Munich Putsch", "That was the Nazi rising of 1923."],
      ["The Evian Conference", "That was a meeting of states on refugees in 1938."],
      ["The Kindertransport", "That was a rescue of children to Britain in 1938-39."],
    ],
    hints: ["It took place in the capital of Poland."],
    explanation: "Young fighters of the Jewish Combat Organisation, with few weapons, fought German forces for weeks in April-May 1943. There were also revolts at Treblinka and Sobibor.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which explanation best accounts for why armed Jewish resistance was limited?",
    ok: ["Victims were starved, deceived and punished with reprisals", "Correct: conditions, not unwillingness, limited resistance."],
    no: [
      ["Jews had no wish to defend themselves or their families", "Resistance occurred wherever it was possible."],
      ["The Allies supplied weapons to every ghetto in Poland", "Very few weapons reached the ghettos."],
      ["The German authorities allowed free movement from the ghettos", "Ghettos were sealed and guarded."],
    ],
    hints: ["Think about the conditions inside the ghettos and the camps."],
    explanation: "Starvation, deception about the trains, isolation from the local population, lack of arms and collective punishment made resistance extraordinarily hard. Historians also stress forms of resistance other than armed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Kristallnacht took place on 9-10 November 1938.",
    answer: true,
    explanation: "True. Synagogues, homes and shops were attacked across Germany and Austria and about 30,000 Jewish men were arrested.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Nazi murder of Jews was carried out only in the extermination camps.",
    answer: false,
    explanation: "False. Well over a million Jews were shot in the east, and many died in the ghettos and in other camps before and alongside the use of the extermination camps.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Jews were the only group persecuted by the Nazi regime.",
    answer: false,
    hints: ["Think of Roma and Sinti, disabled people and Soviet prisoners of war."],
    explanation: "False. Other groups were also persecuted, including Roma and Sinti, disabled people, political opponents, Jehovah's Witnesses and homosexual men, and millions of Soviet prisoners and Polish civilians were killed. The Nazi aim of destroying every Jew was distinctive.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or place with its meaning.",
    pairs: [
      ["Einsatzgruppen", "Mobile units that shot Jews and others in the occupied USSR"],
      ["Judenräte", "Councils forced by the Germans to administer the ghettos"],
      ["Treblinka", "An extermination camp in occupied Poland where a revolt took place in 1943"],
      ["Kindertransport", "Rescue of about 10,000 unaccompanied Jewish children to Britain"],
    ],
    explanation: "Einsatzgruppen (shooting units), Judenräte (Jewish Councils), Treblinka (extermination camp) and the Kindertransport (December 1938 to September 1939).",
  });
  chrono(b, [
    "The Nuremberg Laws are passed",
    "Kristallnacht",
    "The Einsatzgruppen begin mass shootings in the USSR",
    "The Wannsee Conference",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1935 to 1942."],
    explanation: "September 1935; November 1938; June 1941; January 1942.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Nazi euphemism for the plan to murder Europe's Jews was the 'Final {{blank:a}}', and the largest camp, which combined forced labour and killing, was {{blank:b}}-Birkenau.",
    blanks: [
      { id: "a", accepted: ["Solution"], choices: ["Solution", "Settlement", "Strategy", "Statement"] },
      { id: "b", accepted: ["Auschwitz"], choices: ["Auschwitz", "Dachau", "Buchenwald", "Treblinka"] },
    ],
    explanation: "The 'Final Solution' is a euphemism that historians quote but do not accept. Auschwitz-Birkenau was the largest of the killing centres.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the SS leader who chaired the Wannsee Conference in January 1942.",
    accepted: ["Reinhard Heydrich", "Heydrich"],
    wrong: ["Heinrich Himmler"],
    explanation: "**Reinhard Heydrich**, head of the Reich Security Main Office.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the steps of Nazi persecution of the Jews between 1933 and 1938.",
    points: ["The boycott of Jewish businesses and the removal of Jews from public service in 1933", "The Nuremberg Laws of 1935, which took away Jews' citizenship and banned marriage with non-Jews", "Increasing exclusion from professions and the seizure of Jewish businesses and property", "Kristallnacht in November 1938, with attacks on synagogues and homes and mass arrests"],
    modelAnswer: "In 1933 Jewish businesses were boycotted and Jews were removed from public service. The Nuremberg Laws of 1935 took away Jews' citizenship and banned marriage with non-Jews. Jews were excluded from more professions and their businesses and property were seized. In November 1938 Kristallnacht brought attacks on synagogues and homes and mass arrests.",
    explanation: "One mark for each step described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the outbreak of war changed Nazi policy towards the Jews.",
    points: [["The conquest of Poland and the USSR brought millions more Jews under German control, and emigration became impossible, so the Nazis created ghettos", 2], ["The war in the east, with its racial aims, encouraged mass shooting by the Einsatzgruppen in 1941, and by 1942 the policy became deportation to extermination camps", 2]],
    hints: ["Think of the effect of conquest and the invasion of the Soviet Union."],
    modelAnswer: "The conquest of Poland and the USSR brought millions more Jews under German control and made emigration impossible, so the Nazis created ghettos. The war in the east, fought with racial aims, encouraged mass shootings by the Einsatzgruppen in 1941, and by 1942 the policy had become deportation to extermination camps.",
    explanation: "Credit explained links between the war and the radicalisation of policy.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Allied governments did little to rescue Jews in 1942-44.",
    points: [["They concentrated on winning the war and believed that victory was the best way to end the killing, so rescue was a low priority", 2], ["Many governments were reluctant to admit large numbers of refugees because of prejudice, fear of costs or restrictions on immigration, and the Bermuda Conference achieved little", 2]],
    hints: ["Think about both military priorities and immigration policies."],
    modelAnswer: "They concentrated on winning the war and believed that victory was the best way to end the killing, so rescue was a low priority. Many governments were reluctant to admit large numbers of refugees because of prejudice, fear of costs and immigration limits, and the Bermuda Conference of 1943 achieved little.",
    explanation: "Credit explained reasons and not only a list of facts.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional neutral diplomat stationed in a European capital, to his government, early 1943",
        "Reliable people report that trains of Jewish families are leaving the ghettos for the east, and that those who are taken do not return. The Germans say they are being sent to work. I have no direct proof of what happens to them, but the number of such accounts is too large to ignore. I recommend that our government make a public protest."),
      "",
      source("Source B", "a letter by a fictional member of a Jewish Council in a Polish ghetto to a colleague, 1942",
        "We are ordered to prepare lists. If we refuse, others will be chosen to do it and the punishment will be worse. We try to save the children, the workers and the sick, but we cannot save all. Each day I ask myself whether I am helping my people or the enemy. God forgive us."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the evidence available to the diplomat?", points: ["He has many reports from reliable people about trains leaving for the east", "He has no direct proof of what happens, but thinks the reports cannot be ignored"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about knowledge of the deportations.", points: [["Agree: both show that deportations from the ghettos were taking place and that people were uncertain or afraid of what lay ahead", 2], ["Differ: A is an outsider who has second-hand reports and recommends protest, while B is an insider forced to take part, describing the pressure and moral conflict", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying contemporary reactions to the Holocaust?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as evidence that information reached neutral governments by 1943, but it is based on second-hand reports and the diplomat could not be sure, so it gives a partial view", 2], ["B is useful as an insider's view of the dilemma of Jewish Councils, but it is a single private letter, and the writer judges himself harshly", 2], ["Own knowledge: the Allied declaration of December 1942, the mass deportations of 1942 and the role of the Judenräte fit both; together they show information and moral pressure, though neither shows what governments did", 2]], modelAnswer: "Source A is useful because it shows that information about the deportations had reached neutral governments by 1943, which fits the Allied declaration of December 1942. But it relies on second-hand reports and the diplomat admits he has no proof, so it gives only part of the picture. Source B is useful as an insider's account of the dilemma of the Jewish Councils, which is confirmed by what historians know of the lists and deportations, but it is a single private letter and the writer is harsh on himself. Together the sources show how information and moral pressure existed at the time, although neither shows what governments actually did." }),
    ],
    hints: ["For (c), consider the position of each writer and what each could know."],
    explanation: "Both sources are invented: a diplomat's report and a council member's letter.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract(`The destruction of Europe's Jews was not the product of a single order or a single moment. It grew from a long record of persecution under the Nazi state, in which each step made the next one easier to take. Before 1939, officials in many departments competed to find ways of removing Jews from German life, and their measures were passed as laws by ministries that answered to no real check. Once the war began, the same habits of initiative were carried into occupied Poland and the Soviet Union, where local commanders and civil officials, anxious to solve the problems of feeding and housing the people under their control, moved from ghettos to shooting and then to the gas chambers. The role of Hitler was to set the aim and to approve, in general terms, what others proposed. To explain the crime we must therefore look at the state, its rivalries and its working habits, and not only at the ideas in a leader's mind.`),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the Nazi persecution of the Jews to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the extract argues that the Holocaust developed step by step through the initiative of many officials and the structure of the Nazi state, rather than one order or plan", 2],
      ["Approach: the historian asks how the state worked and stresses institutions and rivalry (a structuralist or functionalist approach), giving Hitler a limited role", 2],
      ["Knowledge supporting: competing departments, the radicalisation after 1939, local initiative in the ghettos and the shootings in the east, Wannsee as coordination", 2],
      ["Knowledge testing: Hitler's central role in setting the aims, his antisemitism, the importance of ideology; the extract may under-emphasise these", 2],
    ],
    hints: ["Decide what question the historian is asking, and check the argument against what you know."],
    modelAnswer: "The extract argues that the destruction of the Jews was not the result of a single order or plan but grew step by step as officials and commanders, acting on their own initiative, radicalised policy. Its approach is that of a historian of the state: it asks how the Nazi system worked, and stresses competition between departments and the lack of checks, giving Hitler the role of setting the aim and approving in general terms. This fits some of what is known. Before 1939 many departments competed to propose anti-Jewish laws; after the conquest of Poland and the USSR, local officials set up ghettos and the Einsatzgruppen began shooting in 1941; and Wannsee in January 1942 coordinated a policy that was already being carried out. But the extract may underplay Hitler's own antisemitism and the importance of ideology, which gave all those initiatives their direction and were set out long before the war. The extract is therefore useful in showing how the process worked, but its approach gives less weight to the part of ideas and leadership.",
    explanation: "Credit identification of the interpretation and approach, support from knowledge and a test of the extract. The extract is invented.",
    concepts: ["ahist.holocaust.nazi-policy-1933-45", "ahist.holocaust.debate-origins"],
  });

  b.card("DEFINITION", "What is genocide?", "The deliberate destruction of a national, ethnic, racial or religious group; the word was created by Raphael Lemkin in 1944.");
  b.card("DEFINITION", "What were the Einsatzgruppen?", "Mobile killing units that followed the army into the USSR in June 1941 and shot Jews and others; well over a million Jews were shot in the east.");
  b.card("DEFINITION", "What were the Judenräte?", "Jewish Councils appointed by the Germans to run the ghettos, forced to carry out German orders.");
  b.card("FACT", "How many Jews were murdered in the Holocaust?", "About six million (the scholarly estimate).");
  b.card("FACT", "What was decided at Wannsee on 20 January 1942?", "Heydrich coordinated the deportation of Europe's Jews to the east; it organised a policy already under way.");
  b.card("FACT", "When was the Warsaw Ghetto Uprising?", "From 19 April 1943, led by young Jewish fighters with few weapons.");
  b.card("FACT", "Name the main extermination camps.", "Chełmno, Belzec, Sobibor, Treblinka, Majdanek and Auschwitz-Birkenau.");
  b.card("CONCEPT", "How did war change Nazi policy towards the Jews?", "It brought millions more Jews under German control, made emigration impossible and led from ghettos to mass shooting to extermination camps.");
  b.card("CONCEPT", "Why was armed Jewish resistance limited?", "Victims were starved, deceived, isolated, poorly armed and subject to collective reprisals; there were also other forms of resistance.");
  b.card("CONCEPT", "Which other groups did the Nazis persecute and kill?", "Roma and Sinti, disabled people (T4), Soviet prisoners of war, Poles, Jehovah's Witnesses, homosexual men and political opponents.");
});
