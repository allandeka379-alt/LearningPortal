// Slice W4a: Nazi consolidation and control, 1933-1945 (both boards: ZIMSEC topic 12, 0470 Depth study B 2-3a).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.germany.nazi-control", { file: "germany/nazi-control", keyPrefix: "germany.nazi-control" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did the Enabling Act of March 1933 allow Hitler to do?",
    options: [
      ["Make laws without the Reichstag", "Correct: parliament no longer mattered."],
      ["Become President as well as Chancellor", "This happened after Hindenburg died in August 1934."],
      ["Rearm Germany and introduce conscription openly", "Conscription was announced in 1935, not by this Act."],
      ["Leave the League of Nations and the Disarmament Conference", "Germany left in October 1933 by a separate decision."],
    ],
    answer: "A",
    explanation: "The **Enabling Act** let Hitler's government pass laws without the Reichstag's approval.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who led the SA when it was purged in the Night of the Long Knives?",
    options: [
      ["Ernst Röhm", "Correct: he was shot after his arrest."],
      ["Heinrich Himmler", "Himmler led the SS, which carried out the purge."],
      ["Joseph Goebbels", "Goebbels was Minister of Propaganda."],
      ["Hermann Göring", "Göring helped organise the purge."],
    ],
    answer: "A",
    explanation: "**Röhm**, the SA leader, wanted a 'second revolution' and was killed on Hitler's orders.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did the Nazis use the Reichstag Fire of February 1933?",
    options: [
      ["To pass an emergency decree suspending civil rights", "Correct: thousands of opponents were arrested."],
      ["To cancel the election planned for March 1933", "The election went ahead on 5 March."],
      ["To make peace with the Communist Party", "They blamed and attacked the Communists."],
      ["To move the Reichstag permanently to Munich", "The Reichstag met in the Kroll Opera House in Berlin."],
    ],
    answer: "A",
    explanation: "Hitler blamed the communists, and an **emergency decree** suspended freedoms the next day.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which party was the only one to vote against the Enabling Act?",
    options: [
      ["The Social Democrats (SPD)", "Correct: 94 SPD deputies voted no."],
      ["The Centre Party", "The Centre Party voted for it after promises about the Church."],
      ["The Communists (KPD)", "Their deputies had been arrested or had fled."],
      ["The Nationalists (DNVP), Hitler's coalition partners", "They were Hitler's allies and voted for it."],
    ],
    answer: "A",
    explanation: "Only the **SPD** voted against; the Act passed by 444 votes to 94.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Hitler move against the SA in June 1934?",
    options: [
      ["To win the support of the army's generals", "Correct: they feared Röhm's plan to absorb the army."],
      ["Because the SA had joined the Communist Party", "The SA was fiercely anti-communist."],
      ["Because the SA had refused to fight in the 1933 election", "The SA was active in the election."],
      ["To please the League of Nations before the Saar vote", "The purge was about power inside Germany."],
    ],
    hints: ["Which powerful group felt threatened by Röhm?"],
    answer: "A",
    explanation: "Hitler needed the **army**, which feared Röhm's SA, to support him when Hindenburg died.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the Concordat of July 1933?",
    options: [
      ["An agreement between Hitler and the Pope", "Correct: the Church would stay out of politics."],
      ["The law making the Nazis the only legal party", "That law was passed in July 1933 but was not the Concordat."],
      ["An alliance between Germany and Mussolini's Italy", "The Rome-Berlin Axis came in 1936."],
      ["A treaty with Poland agreeing not to go to war", "This was the non-aggression pact of 1934."],
    ],
    hints: ["It concerned the Catholic Church."],
    answer: "A",
    explanation: "In the **Concordat** the Catholic Church agreed to stay out of politics; the Nazis soon broke its terms.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What does research on Gestapo records suggest about how it worked?",
    options: [
      ["It relied heavily on denunciations by ordinary people", "Correct: it had relatively few officers."],
      ["It had an officer in almost every street and building", "It was a fairly small organisation."],
      ["It never arrested anyone without a court order", "It arrested people without trial."],
      ["It was controlled by the army, not by the SS", "It came under Himmler's SS."],
    ],
    hints: ["Think about how a small police force could watch a large population."],
    answer: "A",
    explanation: "The Gestapo depended on **information from the public**, which shows both fear and co-operation.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence most challenges the view that Nazi Germany was totalitarian?",
    options: [
      ["Nazi leaders competed with each other for power", "Correct: the regime was often chaotic."],
      ["Goebbels controlled the press, radio and films", "This supports the totalitarian view."],
      ["All other parties and trade unions were abolished", "This supports the totalitarian view."],
      ["The SS ran the concentration camps from 1934", "This supports the totalitarian view."],
    ],
    hints: ["Look for evidence of disorder rather than control."],
    answer: "A",
    explanation: "Rivalry and **overlapping power** among Nazi leaders suggest control was less complete than it seemed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "When Hindenburg died in August 1934, Hitler combined the offices of Chancellor and President.",
    answer: true,
    explanation: "True. He took the title Führer, and the army swore loyalty to him personally.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the election of 5 March 1933 the Nazis won an overall majority of the votes on their own.",
    answer: false,
    explanation: "False. They won 43.9% and needed the Nationalists for a majority.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organisation or person with its role.",
    pairs: [
      ["SS", "Elite force that ran the camps, led by Himmler"],
      ["Gestapo", "Secret state police"],
      ["Reich Chamber of Culture", "Body that writers, artists and musicians had to join"],
      ["Confessing Church", "Protestant group that opposed Nazi control of the Church"],
    ],
    explanation: "SS (Himmler), Gestapo (secret police), Reich Chamber of Culture (control of the arts), Confessing Church (Niemöller).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Night of the Long Knives",
      "The Enabling Act",
      "The Reichstag Fire",
      "The abolition of the trade unions",
    ],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["The fire came first; the purge of the SA came more than a year later."],
    explanation: "Reichstag Fire (February 1933); Enabling Act (March 1933); trade unions abolished (May 1933); Night of the Long Knives (June 1934).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The first Nazi concentration camp opened at {{blank:a}} in March 1933. In July 1944 Colonel {{blank:b}} tried to kill Hitler with a bomb.",
    blanks: [
      { id: "a", accepted: ["Dachau"], choices: ["Dachau", "Auschwitz", "Treblinka", "Nuremberg"] },
      { id: "b", accepted: ["Stauffenberg"], choices: ["Stauffenberg", "Röhm", "Niemöller", "Schleicher"] },
    ],
    explanation: "**Dachau** opened in March 1933; **Stauffenberg** led the bomb plot of 20 July 1944.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Nazi minister was in charge of propaganda from March 1933?",
    accepted: ["Goebbels", "Joseph Goebbels", "Josef Goebbels", "Dr Goebbels"],
    wrong: ["Himmler"],
    explanation: "**Joseph Goebbels** ran the Ministry of Propaganda.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how the Nazis used propaganda and the media to control Germans.",
    points: [
      "Goebbels' Ministry of Propaganda controlled newspapers; opposition papers closed.",
      "Cheap radios; Hitler's speeches broadcast; loudspeakers in public places.",
      "Mass rallies (Nuremberg) and events such as the 1936 Olympics.",
      "Control of culture: Reich Chamber of Culture; book burning; films.",
    ],
    modelAnswer: "Goebbels' Ministry of Propaganda controlled the press, telling editors what to print and closing opposition newspapers. Cheap radios were sold so that Hitler's speeches reached most homes, and loudspeakers were placed in streets and workplaces. Huge rallies at Nuremberg and events like the 1936 Berlin Olympics displayed Nazi power. Culture was controlled through the Reich Chamber of Culture, books by Jewish and anti-Nazi writers were burned, and films carried Nazi messages.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Night of the Long Knives strengthened Hitler's position.",
    points: [
      "Identifies removal of rivals (Röhm, SA leadership, Schleicher, Strasser).",
      "Explains that no one inside the movement could now challenge him.",
      "Identifies winning the army's support.",
      "Explains that the army accepted him as Führer after Hindenburg's death and swore an oath to him.",
    ],
    hints: ["Who was removed, and who was won over?"],
    modelAnswer: "The purge removed Röhm and the SA leadership, as well as old rivals such as Schleicher and Strasser, so no one inside the Nazi movement could now challenge Hitler. It also won over the army, which had feared the SA; when Hindenburg died a month later, the army accepted Hitler as Führer and swore an oath of loyalty to him personally.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why there was so little effective opposition to the Nazi regime.",
    points: [
      "Identifies terror.",
      "Explains that the SS, Gestapo, camps and executions made open opposition extremely dangerous.",
      "Identifies the destruction of organisations.",
      "Explains that with parties and unions abolished, opponents had no legal way to organise.",
      "Identifies popular support / propaganda.",
      "Explains that jobs, order and foreign successes won many Germans over, and propaganda limited what they knew.",
    ],
    hints: ["Fear, lack of organisation and support for the regime."],
    modelAnswer: "Open opposition was extremely dangerous: the SS and Gestapo arrested people without trial, opponents were sent to camps, and resisters such as the White Rose students were executed. The Nazis had also destroyed every organisation through which opposition could have been organised, banning other parties and abolishing the trade unions. Many Germans did not want to oppose the regime at all, because it had brought jobs, order and foreign-policy successes, and propaganda controlled what they heard. Opposition was therefore small, divided and easily crushed.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a report smuggled out of Germany by a fictional member of the banned Social Democratic Party, 1936", "People are careful what they say even at home. A worker in our district made a joke about the leadership in the canteen; three days later he was taken away. Nobody knows who reported him. Yet many workers are glad of their jobs and grumble only about prices. They are not convinced Nazis, but they are not fighters either.")}\n\n${source("Source B", "a description in words of a photograph of the kind published in German newspapers in 1936", "Thousands of uniformed men stand in perfectly straight rows in a huge stadium lit by searchlights. Banners with the swastika hang from tall columns. A small figure stands on a raised platform at the far end.", { described: true })}`,
    hints: ["Think about what each source was designed to show."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about how the Nazis controlled ordinary people?", points: [
        "Fear of informers / denunciation made people careful.",
        "Jobs kept workers quiet; they were not committed Nazis but did not resist.",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why might Sources A and B give different impressions of Nazi Germany in 1936?", points: [
        "B is published propaganda, meant to show unity, order and power.",
        "Rallies were staged to impress Germans and foreigners.",
        "A is from an opponent of the regime reporting secretly to the banned party abroad.",
        "A describes private attitudes (fear, grumbling) that propaganda would hide.",
      ], explanation: "Explain differences from the purpose and origin of each source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that the Nazis controlled Germany through fear? Use the sources and your own knowledge.", points: [
        "A: fear of informers and arrest (own knowledge: Gestapo relied on denunciations; camps).",
        "A: also shows consent based on jobs (own knowledge: fall in unemployment).",
        "B: shows control through propaganda and spectacle rather than fear.",
        "Provenance: A an opponent who might stress fear; B propaganda showing only enthusiasm.",
        "Own knowledge: terror (SS, Night of the Long Knives) plus propaganda and support.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A shows that fear mattered: people were careful even at home, and a worker who made a joke was taken away after being reported. My own knowledge confirms that the Gestapo relied on denunciations and that opponents were sent to camps. But Source A also shows consent: many workers were glad of their jobs, which fits the fall in unemployment after 1933. Source B suggests control through propaganda and spectacle, a show of unity designed to impress. Each source has a purpose: A comes from an opponent who might stress fear, and B is propaganda showing only enthusiasm. Together they show that the Nazis controlled Germany through a combination of fear, propaganda and material benefits, so fear was important but not the whole answer.", explanation: "Both sides from the sources, with own knowledge and a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare legal methods with violence."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Night of the Long Knives.", points: [
        "30 June 1934: SS units arrested and shot SA leaders.",
        "Ernst Röhm killed; he had wanted a 'second revolution' and to merge the SA with the army.",
        "Other enemies killed, e.g. Schleicher and Strasser.",
        "At least 85 killed (estimates); declared legal afterwards; army reassured.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'Hitler consolidated his power in 1933-34 mainly by legal means.' How far do you agree?", points: [
        ["For: appointed legally; emergency decree signed by Hindenburg; Enabling Act passed by the Reichstag", 2],
        ["For: laws used to ban parties and unions; Hindenburg's death and plebiscite approved Führer title", 2],
        ["Against: SA terror in the March election; arrest of KPD deputies; intimidation at the Kroll Opera House", 2],
        ["Against: Night of the Long Knives was murder; camps and arrests without trial", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Hitler took care to appear legal. He was appointed Chancellor according to the constitution; the emergency decree after the Reichstag Fire was signed by Hindenburg; and the Enabling Act was passed by more than two-thirds of the Reichstag. The banning of parties and the abolition of the unions were carried out under that law, and after Hindenburg's death a plebiscite approved Hitler as Führer.\n\nYet this legality depended on violence. The March 1933 election was held amid SA terror, thousands of opponents were arrested under the decree, and the Communist deputies could not vote on the Enabling Act because they had been arrested or had fled; SA and SS men surrounded the meeting. In June 1934 Hitler had Röhm and others murdered without any trial, and only afterwards declared the killings legal.\n\nI disagree with the statement. Hitler used legal forms to make his dictatorship look acceptable, especially to the conservatives and the army, but each legal step was made possible by intimidation and violence, so violence was at least as important as the law.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was the Reichstag Fire?", "27 February 1933; an emergency decree suspending civil rights followed the next day.");
  b.card("DEFINITION", "Enabling Act (23 March 1933)", "The law that let Hitler's government make laws without the Reichstag.");
  b.card("DEFINITION", "Gleichschaltung", "'Co-ordination': bringing every part of German life under Nazi control.");
  b.card("FACT", "What happened on 30 June 1934?", "The Night of the Long Knives: SS units killed Röhm, other SA leaders and other opponents.");
  b.card("FACT", "What happened on 2 August 1934?", "Hindenburg died; Hitler combined Chancellor and President as Führer, and the army swore loyalty to him.");
  b.card("DEFINITION", "Gestapo", "The Nazi secret state police, which relied heavily on denunciations by ordinary people.");
  b.card("FACT", "Who was the White Rose?", "Munich students, including Hans and Sophie Scholl, who spread anti-Nazi leaflets and were executed in 1943.");
  b.card("FACT", "What was the July Bomb Plot?", "The attempt by army officers led by Stauffenberg to kill Hitler on 20 July 1944.");
  b.card("DEFINITION", "Totalitarian state", "A state in which one party and leader try to control every part of life through terror and propaganda.");
  b.card("CONCEPT", "Was Nazi Germany totalitarian?", "It aimed at total control and achieved much, but it was chaotic and relied on popular co-operation as well as terror.");
});
