// W4a: ahist.holocaust.debate-origins (Cambridge Paper 3 Topic 2 debate; A Level only).
import { concept, P, source, extract, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.holocaust.debate-origins", { file: "holocaust/debate-origins", keyPrefix: "holocaust.debate-origins" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which term describes the view that the Holocaust resulted mainly from Hitler's long-held intention?",
    ok: ["Intentionalism", "Correct: it puts Hitler's aims at the centre."],
    no: [
      ["Structuralism", "Structuralists stress the structure of the state and war."],
      ["Appeasement", "Appeasement is a policy of the Western powers in the 1930s."],
      ["Gleichschaltung", "That term describes the coordination of institutions in 1933-34."],
    ],
    explanation: "Intentionalists such as Lucy Dawidowicz and Eberhard Jäckel argued that Hitler's aims explain the genocide.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the central argument of structuralist and functionalist historians about the origins of the Holocaust?",
    ok: ["Policy radicalised step by step through the Nazi state and war", "Correct: they stress competing agencies and cumulative radicalisation."],
    no: [
      ["Hitler gave a single written order in 1933 that was followed to the letter", "No such order survives."],
      ["The Holocaust was a response to a revolt by Jews inside Germany in 1939", "No such revolt took place, and this is a false Nazi claim."],
      ["The Allies forced the Nazis to carry out the policy against their wishes", "The Nazis carried out the policy on their own initiative."],
    ],
    explanation: "Broszat and Mommsen argued that rival agencies competed to anticipate Hitler's wishes and that the problems of war drove policy towards mass murder.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What happened to the Madagascar plan of 1940?",
    ok: ["It was a plan to deport Jews to an island and was dropped", "Correct: it was never carried out."],
    no: [
      ["It was put into effect and moved millions of Jews to Africa", "It was never put into effect."],
      ["It was a British plan to move refugees from Europe to the island", "It was a German plan."],
      ["It was the name of the first extermination camp in Poland", "It was not a camp."],
    ],
    explanation: "The scheme to deport Europe's Jews to Madagascar was discussed in 1940 but was unrealistic and abandoned. Structuralists use it to show that policy was not fixed in advance.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which fact is most often used by structuralists against a fixed plan?",
    ok: ["Policy changed direction several times between 1939 and 1941", "Correct: ghettos, plans for deportation and then killing followed one another."],
    no: [
      ["Hitler spoke openly of the destruction of the Jews in a speech of 1939", "Intentionalists use this to support a plan."],
      ["Mein Kampf expressed hatred of the Jews in the 1920s", "Intentionalists use this too."],
      ["The Nazis passed the Nuremberg Laws in 1935", "The laws show persecution but do not argue against a fixed plan."],
    ],
    hints: ["Which fact shows uncertainty about the policy to be followed?"],
    explanation: "The sequence of ideas (emigration, the Madagascar plan, ghettos, shootings, gassing) suggests that policy developed under changing conditions.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What does the phrase 'working towards the Führer' suggest about how the Nazi state operated?",
    ok: ["Officials took initiatives that they believed Hitler would approve", "Correct: it joins Hitler's goals with the action of the system."],
    no: [
      ["Officials waited for written orders from Hitler for each action", "Hitler rarely gave detailed written orders."],
      ["Officials refused to cooperate with the regime's racial policies", "Officials took part in them."],
      ["Officials reported to a council of ministers that made decisions together", "The Cabinet ceased to meet regularly."],
    ],
    hints: ["The phrase is used by Ian Kershaw."],
    explanation: "The phrase, used by Kershaw, describes how officials anticipated Hitler's wishes. It is used by historians who combine intentionalist and structuralist insights.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which criticism is commonly made of the argument that German society as a whole was driven by 'eliminationist antisemitism'?",
    ok: ["It overlooks differences between Germans and antisemitism elsewhere", "Correct: critics say it generalises and ignores comparison."],
    no: [
      ["It claims that no Germans took part in the persecution of the Jews", "The thesis claims that many Germans took part."],
      ["It relies on evidence that was not available to any historian", "Critics did not argue that the evidence was unavailable."],
      ["It argues that Hitler had no influence on Nazi policy at all", "The thesis does not deny Hitler's role."],
    ],
    hints: ["Think about other countries with strong antisemitism and about differences in Germany."],
    explanation: "Goldhagen's critics argued that antisemitism was strong in other countries without leading to genocide, that Germans differed in their views, and that Nazi dictatorship and war were essential.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best describes the main trend in the historians' debate since the 1990s?",
    ok: ["Many historians combine Hitler's aims with the effects of state and war", "Correct: synthesis interpretations are the most common."],
    no: [
      ["All historians have returned to the view that Hitler alone is responsible", "Most reject a Hitler-only view."],
      ["All historians now say that Hitler had no part in the Holocaust", "No serious historian says this."],
      ["Historians no longer discuss the origins of the Holocaust at all", "The debate continues."],
    ],
    hints: ["Think of Browning's and Kershaw's approach."],
    explanation: "Browning, Kershaw and others stress both Hitler's role and the system, though they disagree about the date and mechanism of the decisive decisions.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A written order from Hitler to carry out the murder of the Jews has never been found.",
    answer: true,
    explanation: "True. No such order survives; historians infer Hitler's role from other evidence such as speeches, instructions to subordinates and the record of events.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Most historians today say that racial antisemitism was a sufficient cause of the Holocaust without any need for the Nazi regime and the war.",
    answer: false,
    explanation: "False. Antisemitism is seen as a necessary condition, but the Nazi dictatorship and the circumstances of war were needed to turn prejudice into genocide.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Structuralist historians accept that the regime was responsible for the genocide, and disagree with intentionalists mainly about how the decisions were made.",
    answer: true,
    hints: ["Think about the question each school asks."],
    explanation: "True. The debate is about process and responsibility within the regime, not about whether the Holocaust happened.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each historian with the view or work associated with him.",
    pairs: [
      ["Lucy Dawidowicz", "Intentionalist author of The War Against the Jews"],
      ["Hans Mommsen", "Structuralist who stressed cumulative radicalisation"],
      ["Daniel Goldhagen", "Argued for a widespread eliminationist antisemitism in German society"],
      ["Christopher Browning", "Argued that the decision developed in stages in 1941"],
    ],
    explanation: "Dawidowicz (intentionalist, 1975), Mommsen (structuralist), Goldhagen (Hitler's Willing Executioners, 1996) and Browning (the Path to Genocide, 1992).",
  });
  chrono(b, [
    "Hitler's speech threatening the Jews in the Reichstag",
    "The Madagascar plan is discussed",
    "Göring instructs Heydrich to prepare a 'total solution'",
    "The Wannsee Conference",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from January 1939 to January 1942."],
    explanation: "January 1939; summer 1940; 31 July 1941; 20 January 1942.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Historians who stress the aims of Hitler are called {{blank:a}}, and those who stress the workings of the Nazi state are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["intentionalists"], choices: ["intentionalists", "structuralists", "revisionists", "traditionalists"] },
      { id: "b", accepted: ["structuralists"], choices: ["intentionalists", "structuralists", "revisionists", "traditionalists"] },
    ],
    explanation: "The labels intentionalist and structuralist (or functionalist) describe the two poles of the debate.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the historian who used the phrase 'working towards the Führer' to describe how the Nazi state operated.",
    accepted: ["Ian Kershaw", "Kershaw"],
    wrong: ["Daniel Goldhagen"],
    explanation: "**Ian Kershaw**, who also wrote a major biography of Hitler.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the intentionalist interpretation of the origins of the Holocaust.",
    points: ["It places Hitler's long-held aim of destroying the Jews at the centre of the explanation", "It points to evidence such as Mein Kampf and his speech of January 1939", "It sees the persecution of the 1930s as steps towards a goal fulfilled during the war", "Historians such as Dawidowicz and Jäckel argued this, although no written order survives"],
    modelAnswer: "Intentionalists place Hitler's long-held aim of destroying the Jews at the centre of the explanation. They point to evidence such as Mein Kampf and his speech of January 1939. They see the persecution of the 1930s as steps towards a goal fulfilled during the war. Historians such as Dawidowicz and Jäckel argued this, although no written order survives.",
    explanation: "One mark for each feature described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain one strength and one weakness of the structuralist interpretation.",
    points: [["Strength: it explains the improvisation and local initiative visible in the evidence, such as the changes of policy between 1939 and 1941 and the shootings by regional commanders", 2], ["Weakness: it can underplay the ideological aim shared by all the officials and Hitler's approval of key steps, so it may make the genocide seem accidental", 2]],
    hints: ["Think of evidence of improvisation and of ideology."],
    modelAnswer: "A strength is that it explains the improvisation and local initiative visible in the evidence, such as the changes of policy between 1939 and 1941 and the shootings by regional commanders. A weakness is that it can underplay the ideological aim shared by the officials and Hitler's approval of key steps, so the genocide may seem accidental.",
    explanation: "Credit a developed strength and weakness.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why many historians now prefer a synthesis of the intentionalist and structuralist views.",
    points: [["Each view explains part of the evidence: Hitler's aims and approvals explain the direction, while the radicalising pressure of the state and war explain the timing and form of the killing", 2], ["Pure intentionalism cannot explain the changes of policy and local initiatives, and pure structuralism cannot explain the central place of antisemitism, so a combination fits more of the evidence", 2]],
    hints: ["Think about what each view cannot explain on its own."],
    modelAnswer: "Each view explains part of the evidence: Hitler's aims and approvals explain the direction of policy, while the pressure of the state and war explain the timing and form of the killing. Pure intentionalism cannot explain the changes of policy and local initiatives, and pure structuralism cannot explain the central place of antisemitism, so a combination fits more of the evidence.",
    explanation: "Credit explained reasons.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: [
      "Read the extract.",
      "",
      extract(`Hatred of the Jews was the fixed star of Hitler's politics. From his earliest speeches in Munich beer halls to the last testament he dictated in the bunker, he returned again and again to the same obsession, and he never wavered. The obscure origins of particular measures, and the tangled quarrels of the offices that carried them out, should not mislead us. A government of any other kind would not have produced the Holocaust. The war gave Hitler his chance, but the intention was already in his mind. To place the system before the man is to mistake the instrument for the hand that held it.`),
      "",
      "What can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the origins of the Holocaust to explain your answer.",
    ].join("\n"),
    levels: levels(8, "interpretation"),
    points: [
      ["Interpretation: the extract argues that Hitler's own consistent hatred and intention was the cause of the Holocaust, and that the war offered the opportunity", 2],
      ["Approach: an intentionalist approach that gives priority to the individual leader and his ideas over the structures of the state, dismissing institutional explanations", 2],
      ["Knowledge supporting: Mein Kampf, the speech of January 1939, Hitler's approval of key stages, the importance of antisemitism to the regime", 2],
      ["Knowledge testing: the absence of a written order, the Madagascar plan, changes of policy and local initiative in 1939-41, so the extract may oversimplify", 2],
    ],
    hints: ["Decide what the historian emphasises, and test the argument against evidence both for and against."],
    modelAnswer: "The extract argues that the Holocaust was caused by Hitler's own consistent hatred of the Jews and that the war gave him the opportunity to carry out an intention he already held. Its approach is intentionalist: it places the leader's ideas at the centre and dismisses the quarrels of offices as misleading, treating the system as a mere instrument. Some knowledge supports it: Hitler expressed hatred of the Jews in Mein Kampf and threatened them in the Reichstag in January 1939, and antisemitism was central to the regime. But the extract is too simple. No written order from Hitler survives, the Madagascar plan shows that other solutions were considered, and policy changed several times in 1939-41, with local officials taking initiatives. Most historians now combine Hitler's aims with the radicalising effect of the state and war, so the extract captures an important part of the explanation but not the whole.",
    explanation: "Credit identification of the interpretation and approach, supporting and testing knowledge. The extract is invented.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far was the Holocaust the result of ideas that pre-dated the Nazis?",
    levels: levels(12),
    points: [
      ["For continuity: long-standing antisemitism in Europe, nineteenth-century race theory and eugenics, the stab-in-the-back myth, and Hitler's use of these ideas", 3],
      ["Against: antisemitism was strong in other countries without genocide; German Jews were integrated; the Nazi dictatorship, Hitler's will and the circumstances of war were needed", 3],
      ["Historians: Goldhagen and Friedländer on German antisemitism, critics of Goldhagen; intentionalist, structuralist and synthesis views on the process", 3],
      ["Judgement that distinguishes necessary conditions from sufficient causes and reaches a supported conclusion", 3],
    ],
    hints: ["Distinguish the conditions that made the Holocaust possible from the causes that made it happen."],
    modelAnswer: "The Holocaust was partly the result of ideas that pre-dated the Nazis, but those ideas were not enough to cause it. Antisemitism was old in Europe, and in the nineteenth century racial theories, eugenics and social Darwinism gave it a biological form which Hitler absorbed. After 1918 the myth of the stab in the back made Jews scapegoats in Germany. Some historians, such as Friedländer, see a 'redemptive antisemitism' at the core of Nazism, and Goldhagen argued that eliminationist hatred was widespread among Germans. But the evidence against a straight line is strong. Antisemitism was equally strong in Poland, Romania and Russia, and in France at the time of Dreyfus, yet did not produce genocide. German Jews were well integrated before 1933, and antisemitic parties had done poorly before 1914. The Holocaust needed a dictatorship that controlled the state, Hitler's own will, and the circumstances of war, in which the conquest of Poland and the USSR placed millions of Jews in German hands and policy radicalised in 1941. I conclude that old ideas were a necessary condition which made persecution acceptable to many, but the Nazi regime and the war were the causes that turned prejudice into genocide.",
    explanation: "Credit explained evidence on both sides, use of historians, and a supported judgement.",
  });

  b.card("DEFINITION", "What is intentionalism?", "The view that the Holocaust resulted mainly from Hitler's long-held aim of destroying the Jews (for example Dawidowicz, Jäckel).");
  b.card("DEFINITION", "What is structuralism (functionalism)?", "The view that stresses the rival agencies of the Nazi state, improvisation and the pressure of war (for example Broszat, Mommsen).");
  b.card("DEFINITION", "What is cumulative radicalisation?", "Mommsen's idea that Nazi policy grew more extreme step by step as agencies competed to find harsher solutions.");
  b.card("FACT", "What was the Madagascar plan?", "A 1940 scheme to deport Europe's Jews to the island of Madagascar; it was unrealistic and dropped.");
  b.card("FACT", "What was Goldhagen's thesis (1996)?", "That ordinary Germans were driven by an 'eliminationist' antisemitism widespread in German society; most historians rejected it.");
  b.card("FACT", "What was Göring's instruction of 31 July 1941?", "He told Heydrich to prepare a 'total solution' of the Jewish question in German-controlled Europe; historians debate its significance.");
  b.card("CONCEPT", "Why is the idea of a straight line from old antisemitism to the Holocaust criticised?", "Antisemitism was strong elsewhere without genocide, German Jews were integrated, and the Nazi regime and war were needed.");
  b.card("CONCEPT", "What do synthesis historians such as Browning and Kershaw argue?", "That Hitler's aims and the radicalising pressures of the state and war combined, with decisions taken in stages in 1941.");
  b.card("CONCEPT", "Why is there no agreed date for the decision to murder the Jews?", "No written order survives; historians infer the decision from a series of documents and events between summer 1941 and spring 1942.");
});
