// W4a: ahist.holocaust.debate-perpetrators-victims-bystanders (Cambridge Paper 3 Topic 2 debate; A Level only).
import { concept, P, source, extract, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.holocaust.debate-perpetrators-victims-bystanders", { file: "holocaust/debate-perpetrators-victims-bystanders", keyPrefix: "holocaust.debate-perpetrators-victims-bystanders" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which historian wrote Ordinary Men, a study of a police battalion that shot Jews in Poland?",
    ok: ["Christopher Browning", "Correct: the book was published in 1992."],
    no: [
      ["Lucy Dawidowicz", "Dawidowicz wrote The War Against the Jews, an intentionalist work."],
      ["Ian Kershaw", "Kershaw is known for his biography of Hitler and 'working towards the Führer'."],
      ["Hans Mommsen", "Mommsen is associated with cumulative radicalisation."],
    ],
    explanation: "Browning's Ordinary Men (1992) studied Reserve Police Battalion 101 and argued that conformity and obedience were important in explaining why ordinary men killed.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Browning argue about the men of Reserve Police Battalion 101?",
    ok: ["Most were ordinary men influenced by conformity and obedience", "Correct: few were fanatical Nazis at the start."],
    no: [
      ["All of them were committed members of the SS from the start", "They were police reservists, not committed SS."],
      ["None of them took part in the shootings because they refused orders", "Many took part, although some refused."],
      ["They were foreign volunteers who acted without any German officers", "They were German policemen under German officers."],
    ],
    explanation: "Browning argued that peer pressure, obedience and careerism, as well as racist propaganda, explained how ordinary middle-aged men became killers; a minority refused without serious punishment.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What did Hannah Arendt mean by the 'banality of evil' in her report on the Eichmann trial?",
    ok: ["Terrible crimes could be carried out by unremarkable bureaucrats", "Correct: she stressed the ordinary manner of the official."],
    no: [
      ["Only a few monsters were able to commit terrible crimes", "She argued the opposite."],
      ["Evil is always dull and cannot be understood by ordinary people", "She did not argue this."],
      ["The trial was unnecessary because the facts were already well known", "She attended and reported on the trial."],
    ],
    explanation: "Arendt reported on the trial in Jerusalem in 1961. Later historians question whether Eichmann was as ordinary as she suggested, but her phrase influenced debates about bureaucratic responsibility.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which example shows collaboration with the Holocaust outside Germany?",
    ok: ["French police helped to arrest Jews in Paris in July 1942", "Correct: Vichy and local police assisted the roundups."],
    no: [
      ["Danish civilians took Jews by boat to safety in Sweden in 1943", "This is an example of rescue."],
      ["Jewish fighters rose against German forces in the Warsaw Ghetto", "This is an example of resistance."],
      ["The Allied governments declared that the killings must be punished", "This is a declaration by the Allies."],
    ],
    hints: ["Which example shows local authorities helping the Germans?"],
    explanation: "The roundup of 16-17 July 1942 in Paris was carried out by French police, under the Vichy government's arrangement with the Germans.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is meant by the Hebrew word 'amidah' in discussions of Jewish resistance?",
    ok: ["Standing up, a broad idea including defiance beyond fighting", "Correct: Yehuda Bauer used it for a wide range of acts."],
    no: [
      ["Armed revolt only, in the form of a ghetto uprising", "The word is used for a broader range of acts."],
      ["Collaboration with the Germans in the running of a ghetto", "It does not mean collaboration."],
      ["Emigration to Palestine before the outbreak of war", "It does not describe emigration."],
    ],
    hints: ["The historian Yehuda Bauer used the word."],
    explanation: "Bauer's idea includes hiding, keeping records, running schools and religious observance as well as fighting, which broadens the definition of resistance.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which argument is used against a broad definition of resistance that includes all acts of survival?",
    ok: ["It may blur the difference between fighting back and staying alive", "Correct: critics want to keep the term for active opposition."],
    no: [
      ["It denies that any Jews ever fought against the Germans", "The criticism does not deny armed resistance."],
      ["It is based on documents that were written by the Nazis", "The criticism is about definition, not sources."],
      ["It ignores the fact that the Allies gave help to every ghetto", "The Allies gave little help to the ghettos."],
    ],
    hints: ["Think about what the word 'resistance' would no longer distinguish."],
    explanation: "Critics argue that if resistance includes every act of survival, the word loses its meaning; supporters answer that conditions made survival itself a form of defiance.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which view of the Allied response is argued by the historian David Wyman?",
    ok: ["The United States could have done much more to rescue Jews", "Correct: his book was The Abandonment of the Jews."],
    no: [
      ["The United States did everything in its power to save the Jews", "Wyman argued the opposite."],
      ["The United States had no information about the killings until 1945", "Information had reached the Allies in 1942."],
      ["Rescue was impossible because the war ended in 1942", "The war continued until 1945."],
    ],
    hints: ["The title of his 1984 book gives a clue."],
    explanation: "Wyman argued that American policy was shaped by indifference, bureaucracy and prejudice. Others, such as Rubinstein, argued that the chances for rescue were limited.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Only Germans took part in carrying out the Holocaust.",
    answer: false,
    explanation: "False. Local police, officials and auxiliaries in many occupied and allied countries took part, though Germany organised and led the policy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The ship St Louis, carrying Jewish refugees in 1939, was refused entry by Cuba and the United States.",
    answer: true,
    explanation: "True. Most of its passengers returned to Europe; the case is used as an example of the closing of doors to refugees.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "All historians agree that the word 'Holocaust' should include every group persecuted by the Nazis.",
    answer: false,
    hints: ["Think of the idea of uniqueness."],
    explanation: "False. Some restrict the word to the genocide of the Jews, others use a wider term, and many take a middle position.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his or her role or work.",
    pairs: [
      ["Adolf Eichmann", "Official who organised the deportation of Jews"],
      ["Raoul Wallenberg", "Swedish diplomat who helped Jews in Budapest in 1944"],
      ["Emanuel Ringelblum", "Historian who organised a secret archive in the Warsaw ghetto"],
      ["Raul Hilberg", "Historian who wrote The Destruction of the European Jews"],
    ],
    explanation: "Eichmann (deportations), Wallenberg (Budapest, 1944), Ringelblum (the Oyneg Shabes archive) and Hilberg (1961).",
  });
  chrono(b, [
    "The Warsaw Ghetto Uprising begins",
    "The Hungarian Jews are deported (mainly to Auschwitz)",
    "Eichmann is tried in Jerusalem",
    "Browning's Ordinary Men is published",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["The Uprising and the deportations were in 1943 and 1944; the trial and the book came after the war."],
    explanation: "April 1943 (Warsaw); spring-summer 1944 (Hungary); 1961 (Eichmann trial); 1992 (Ordinary Men).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Reserve Police Battalion studied by Browning was numbered {{blank:a}}, and the American agency set up in January 1944 to help rescue Jews was the War {{blank:b}} Board.",
    blanks: [
      { id: "a", accepted: ["101"], choices: ["101", "202", "303", "404"] },
      { id: "b", accepted: ["Refugee"], choices: ["Refugee", "Relief", "Reparations", "Recovery"] },
    ],
    explanation: "Reserve Police Battalion 101 and the War Refugee Board.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Swedish diplomat who helped to save Jews in Budapest in 1944.",
    accepted: ["Raoul Wallenberg", "Wallenberg"],
    wrong: ["Chiune Sugihara"],
    explanation: "**Raoul Wallenberg**, who issued protective papers and sheltered Jews.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the groups of people who took part in carrying out the Holocaust.",
    points: ["The SS, the Einsatzgruppen and police battalions, who carried out shootings and ran the camps", "Officials, railway workers and bureaucrats who organised the deportations", "The army, which helped in shootings, guarding and logistics", "Local police and collaborators in occupied and allied countries"],
    modelAnswer: "The SS, the Einsatzgruppen and police battalions carried out shootings and ran the camps. Officials, railway workers and bureaucrats organised the deportations. The army helped in shootings, guarding and logistics. Local police and collaborators in occupied and allied countries also took part.",
    explanation: "One mark for each group described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why historians disagree about why ordinary men took part in the killing.",
    points: [["Browning stressed conformity, obedience and careerism in ordinary men, while Goldhagen stressed a widespread antisemitism, so they weigh pressure against ideology differently", 2], ["The evidence is limited and varied: men gave different accounts after the war, and some refused, so no single explanation fits all", 2]],
    hints: ["Think of the different explanations and of the nature of the evidence."],
    modelAnswer: "Browning stressed conformity, obedience and careerism in ordinary men, while Goldhagen stressed a widespread antisemitism, so they weigh pressure against ideology differently. The evidence, such as testimony given after the war, is limited and varied, and some men refused, so no single explanation fits everyone.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Jewish armed resistance was rare, but why historians say resistance took other forms.",
    points: [["Victims were starved, deceived about the trains, unarmed and isolated, and reprisals fell on the whole community, so armed revolt was rarely possible", 2], ["People hid, escaped, ran schools, kept archives and forged papers, which some historians regard as resistance, widening the definition beyond fighting", 2]],
    hints: ["Give one reason for the rarity of armed revolt and one example of other forms."],
    modelAnswer: "Victims were starved, deceived about the trains, unarmed and isolated, and reprisals fell on the whole community, so armed revolt was rarely possible. But people hid, escaped, ran schools, kept archives and forged papers, which some historians regard as resistance, widening the definition beyond fighting.",
    explanation: "Credit explained reasons and examples.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a statement by a fictional former policeman, made to investigators after the war",
        "I was thirty-eight and had a family. When the order came, the officer said that anyone who did not wish to take part might step out. I did not step out. Nobody wished to be the one who would not stand with the others, and we were told that this was necessary. I have thought about it every day since."),
      "",
      source("Source B", "a diary entry by a fictional farmer in an occupied country, 1943",
        "Three families from the village were taken away last night. Some neighbours watched from their windows, and a few did nothing. The Pelsers took in the children from the house next to theirs and hid them in the loft. If the soldiers find them, the whole family will be punished. I am ashamed that I did not offer to help."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reasons does Source A give for the policeman's actions?", points: ["He did not wish to be the one who stood apart from the group", "He was told the action was necessary"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about how individuals responded to the persecution.", points: [["Agree: both show that individuals could choose, and that social pressure or fear influenced their choices", 2], ["Differ: A describes a man who took part in the killing and regrets it, whereas B describes neighbours who watched, a family who hid children, and a writer who regrets doing nothing", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying perpetrators and bystanders?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful for the pressure of conformity that Browning stressed and for the fact that stepping out was possible, but it is a statement made after the war to investigators, so the writer may justify himself", 2], ["B is useful for the range of behaviour by bystanders and for the risks to rescuers, but it is the private view of one farmer who admits his own failure", 2], ["Own knowledge: Police Battalion 101, the roundups, local collaboration and rescuers such as those in Denmark fit both sources; together they show choices under pressure", 2]], modelAnswer: "Source A is useful because it fits Browning's argument about conformity and shows that the policeman could have stepped out. But it is a statement made to investigators after the war, so the writer may have wished to excuse himself. Source B is useful for the variety of bystanders' behaviour and for the risks run by rescuers, although it is the private view of one farmer who admits his own failure. Both fit what is known about Police Battalion 101, local collaboration and the work of rescuers. Together they show that individuals had choices under pressure, but neither shows how typical those choices were." }),
    ],
    hints: ["For (c), consider when and why each source was written."],
    explanation: "Both sources are invented: a statement by a former policeman and a farmer's diary.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract(`The killers were not monsters, nor were they driven by a single idea. They were men who had been placed in a unit, given an order, and surrounded by comrades who expected obedience. Once the first killings had been done, the next became easier, and each man needed to believe that he was no different from the others. To suppose that a hatred peculiar to one nation drove them is to ignore both the variety of the men and the many places in Europe where similar crimes were committed. The most disturbing lesson is that, in the right conditions, ordinary people can become killers.`),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the people who carried out the Holocaust to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the extract argues that ordinary men became killers through group pressure, obedience and habit, and not through a special German hatred", 2],
      ["Approach: the historian asks about the social psychology and situation of the perpetrators and compares across Europe, rather than about ideology or national character", 2],
      ["Knowledge supporting: Browning's study of Reserve Police Battalion 101, the possibility of stepping out, collaboration in other countries", 2],
      ["Knowledge testing: evidence of strong antisemitism and initiative among some killers (the Einsatzgruppen leaders, Goldhagen's counter-argument), so the extract may underestimate ideology", 2],
    ],
    hints: ["Decide what the historian asks, and test the argument against evidence for ideology as well as for conformity."],
    modelAnswer: "The extract argues that the killers were ordinary men who were drawn into killing by group pressure, obedience and habit, and that no special German hatred or single idea explains their behaviour. Its approach is that of social psychology and comparison: it asks how situations shape behaviour and points to similar crimes in other parts of Europe. This is supported by Browning's study of Reserve Police Battalion 101, whose members were mostly middle-aged reservists and who could step out, though most did not, and by evidence of local collaboration elsewhere. However, the extract may underplay ideology. Many leaders of the Einsatzgruppen and some of the policemen were committed antisemites, and Goldhagen argued that antisemitism was central. The extract therefore explains why conformity mattered, but a fuller answer needs to weigh ideology and individual motives.",
    explanation: "Credit identification of the interpretation and approach, supporting and testing knowledge. The extract is invented.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far were the Allied governments responsible for failing to rescue Jews from the Holocaust?",
    levels: levels(12),
    points: [
      ["For responsibility: restrictive immigration policies (Evian, the St Louis, quotas, the White Paper), slow action on information from 1942, refusal to bomb Auschwitz", 3],
      ["Against: wartime priorities, the limits of military power, the difficulty of reaching the camps, the actions taken (the Allied declaration, the War Refugee Board, Kindertransport)", 3],
      ["Other responsibility: Germany and its collaborators carried out the genocide; neutral states and local populations also failed or helped; historians' views (Wyman and Rubinstein)", 3],
      ["Judgement that weighs the Allies' failures against their limits and against the primary responsibility of the perpetrators", 3],
    ],
    hints: ["Remember to place the main responsibility on those who carried out the genocide, and then assess the Allies' share."],
    modelAnswer: "The Allied governments bear some responsibility for failing to do more, but the responsibility for the Holocaust lay primarily with Nazi Germany and its collaborators. Before the war, restrictive immigration policies, shown at Evian in 1938, in the fate of the St Louis in 1939 and in Britain's White Paper on Palestine, closed doors to refugees. After information reached the Allies in 1942, their declaration condemned the killings, but they concentrated on military victory, delayed the War Refugee Board until 1944 and refused requests to bomb the railways or the gas chambers at Auschwitz. David Wyman argued that much more could have been done. On the other side, historians such as William Rubinstein argue that the chances of rescue were limited by the German control of Europe, and that military victory was the only way to end the killing. The Allies did take some action: the Kindertransport saved children, and the War Refugee Board helped to save tens of thousands. Neutral states and local populations also failed or helped. I conclude that the Allies were partly responsible for missed opportunities and indifference, but that their share was small compared with that of the perpetrators.",
    explanation: "Credit explained evidence on both sides, use of historians' views and a supported judgement.",
  });

  b.card("DEFINITION", "What is a bystander in Holocaust history?", "A person or government that knew, or could have known, what was happening and neither took part nor tried to stop it.");
  b.card("DEFINITION", "What is amidah?", "Hebrew for 'standing up': Yehuda Bauer's term for a broad definition of Jewish resistance, including hiding and keeping records as well as armed revolt.");
  b.card("FACT", "What did Browning argue in Ordinary Men (1992)?", "That ordinary middle-aged policemen of Reserve Police Battalion 101 killed Jews because of conformity, obedience and careerism as well as propaganda.");
  b.card("FACT", "What did Goldhagen argue in 1996?", "That a widespread eliminationist antisemitism in German society drove ordinary Germans to kill; most historians rejected the claim as too general.");
  b.card("FACT", "What was the roundup of 16-17 July 1942 in Paris?", "French police arrested thousands of Jews under arrangements with the Germans.");
  b.card("FACT", "What was the War Refugee Board?", "An American agency set up in January 1944 to help rescue victims of Nazi persecution; it helped to save tens of thousands.");
  b.card("CONCEPT", "Why is the definition of Jewish resistance debated?", "Some limit it to armed revolt; others include hiding, escape and keeping records; critics fear that a broad definition loses meaning.");
  b.card("CONCEPT", "Should other victims be included in the term Holocaust?", "Some limit it to the Jews because of the aim to murder every Jew; others include Roma, disabled people and others; many take a middle position.");
  b.card("CONCEPT", "Why did the Allies not do more to rescue Jews?", "Priority to winning the war, restrictive immigration policies, disbelief and prejudice; historians disagree about what was possible.");
});
