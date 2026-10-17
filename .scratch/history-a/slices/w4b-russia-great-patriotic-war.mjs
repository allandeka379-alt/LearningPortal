// W4b: ahist.russia.great-patriotic-war (ZIMSEC only: Russia 1905-1945).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

concept("ahist.russia.great-patriotic-war", { file: "russia/great-patriotic-war", keyPrefix: "russia.great-patriotic-war" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "On what date did Germany invade the Soviet Union in Operation Barbarossa?",
    ok: ["22 June 1941, breaking the Nazi-Soviet Pact", "Correct: it began at dawn along the whole frontier."],
    no: [
      ["1 September 1939, the day Germany invaded Poland", "That was the start of the war in Europe."],
      ["7 December 1941, the day of the attack on Pearl Harbor", "That was a Japanese attack on the United States."],
      ["8 May 1945, the day Germany surrendered in Europe", "That was the end of the war in Europe."],
    ],
    explanation: "Germany invaded on 22 June 1941, breaking the Nazi-Soviet Pact of August 1939.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which battle ended with the surrender of the German Sixth Army on 2 February 1943?",
    ok: ["Stalingrad, where the Germans were encircled on the River Volga", "Correct: the Sixth Army was encircled in November 1942."],
    no: [
      ["Kursk, the great tank battle on the plains west of Moscow", "Kursk was fought in July 1943 and ended in a German failure to break through."],
      ["Moscow, where the Red Army counter-attacked in December 1941", "At Moscow the Germans were driven back but no army surrendered."],
      ["Leningrad, the northern city that was besieged for nearly three years", "The siege of Leningrad was lifted in January 1944 and was not a German surrender."],
    ],
    explanation: "At Stalingrad the Sixth Army under Paulus was surrounded by Operation Uranus (19 November 1942) and surrendered, with about 90,000 survivors.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Red Army suffer such heavy defeats in the summer of 1941?",
    ok: ["It had been weakened by the purges, and Stalin had ignored warnings of attack", "Correct: it was caught unprepared."],
    no: [
      ["It had been sent to fight in Finland and the Far East at the same time as the main German attack", "Its main forces were in the west."],
      ["It had refused to fight for Stalin and gone over to the German army", "The army fought hard, though it was badly led at first."],
      ["It had no tanks or aircraft, because the Five Year Plans had failed", "The plans had built large industries and many tanks and aircraft existed."],
    ],
    explanation: "The purges of 1937-38 removed many experienced officers, the frontier defences were incomplete, and Stalin refused to believe warnings. Most Soviet aircraft were destroyed on the ground.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the significance of moving Soviet factories east in 1941?",
    ok: ["It kept war production going beyond the reach of the German army", "Correct: it supplied tanks and aircraft after 1941."],
    no: [
      ["It ended the need for a Red Army by making peace with Germany", "The war continued until 1945."],
      ["It allowed the Germans to capture the Urals and the Siberian oilfields", "The factories moved to the Urals, which the Germans did not reach."],
      ["It handed Soviet industry to the Allies, who ran it for the war effort", "The factories remained Soviet."],
    ],
    hints: ["Think about where the factories were placed and why."],
    explanation: "More than a thousand enterprises were moved to the Urals and Siberia and restarted within months. They produced the tanks, aircraft and guns that equipped the Red Army from 1942.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which fact best shows that Soviet leadership improved after the first year of war?",
    ok: ["Commanders such as Zhukov were given more freedom to plan operations", "Correct: Stalin relied more on professional soldiers."],
    no: [
      ["Stalin signed the Nazi-Soviet Pact in August 1939", "This came before the war and shows his earlier policy."],
      ["The Red Army was surrounded at Kiev in the autumn of 1941", "This was a defeat caused by poor decisions."],
      ["Several hundred thousand Soviet soldiers were taken prisoner in the summer of 1941", "This shows early failure and not improvement."],
    ],
    hints: ["Which fact shows a change in how the army was run?"],
    explanation: "After the disasters of 1941-42, Stalin gave generals greater freedom, ended the system of dual command with political commissars and promoted able commanders such as Zhukov.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the siege of Leningrad (1941-44)?",
    ok: ["Hundreds of thousands of civilians died, mostly of hunger, but the city held out", "Correct: it did not fall to the Germans."],
    no: [
      ["The city surrendered after three months and was occupied by Germany", "Leningrad never surrendered."],
      ["The city was fully supplied by the Allies through its Baltic port during the siege", "The Germans cut the city off from the Baltic."],
      ["The siege ended quickly when Stalin made peace with Hitler in 1942", "There was no peace with Hitler."],
    ],
    hints: ["Think about the length of the siege and the main cause of death."],
    explanation: "The siege lasted from September 1941 to January 1944. Historians estimate that around 800,000 or more civilians died, mostly of hunger and cold, but the city did not fall.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about Allied help to the Soviet Union is best supported by the evidence?",
    ok: ["Lend-Lease supplies were useful, but historians disagree about how decisive they were", "Correct: the weight of the aid is debated."],
    no: [
      ["The Allies fought the German army alone in the east until 1945", "The Red Army fought most of the land war."],
      ["The Soviet Union refused all foreign aid and relied on its own factories", "It accepted Lend-Lease supplies."],
      ["The aid ended the German offensive of 1941 before Moscow was reached", "The supplies arrived in quantity after 1941."],
    ],
    hints: ["Think of the debate about how important Lend-Lease was."],
    explanation: "American and British supplies (trucks, food, raw materials, aircraft) helped the Red Army, especially after 1942. Historians disagree about whether they were vital, but most agree that Soviet industry produced most of the weapons.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that the war made Stalin's regime stronger?",
    ok: ["Victory gave him great prestige, and the USSR gained control of Eastern Europe", "Correct: he emerged as the leader of a superpower."],
    no: [
      ["The soldiers who returned from the West were treated with suspicion", "This shows continued repression but not the source of strength."],
      ["Twenty-five million or more Soviet citizens died in the war", "This shows the cost, not the source of strength."],
      ["The Church was allowed to restore its Patriarchate in 1943", "This was a wartime concession and not a source of strength alone."],
    ],
    hints: ["Which fact shows gains in status and power?"],
    explanation: "Victory brought prestige at home and abroad and control of Eastern Europe, while the regime resumed its control after 1945. Historians who stress the costs argue that the war also exposed its weaknesses.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Nazi-Soviet Pact of August 1939 was broken by Germany in June 1941.",
    answer: true,
    explanation: "True. Hitler attacked in Operation Barbarossa, although Stalin had hoped that the Pact would hold.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Battle of Kursk in 1943 was the last major German offensive in the east.",
    answer: true,
    explanation: "True. After the failure at Kursk, Germany could no longer mount large offensives in the east and the Red Army was on the attack.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree on the exact number of Soviet dead in the Second World War.",
    answer: false,
    hints: ["Think about the nature of the figures."],
    explanation: "False. Estimates for total dead range from about 25 to 27 million, and the exact figure is uncertain.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or name with its meaning.",
    pairs: [
      ["Operation Barbarossa", "The German invasion of the Soviet Union in 1941"],
      ["Georgy Zhukov", "Soviet marshal who led the counter-attack at Moscow"],
      ["Lend-Lease", "American programme of supplies to the Allies"],
      ["Order No. 227", "Stalin's 'Not one step back' order of July 1942"],
    ],
    explanation: "Barbarossa (22 June 1941), Zhukov (Moscow, later Berlin), Lend-Lease (from 1941) and Order No. 227 (July 1942).",
  });
  chrono(b, [
    "The German invasion of the Soviet Union",
    "The Soviet counter-attack at Moscow",
    "The German surrender at Stalingrad",
    "The Soviet Operation Bagration",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from June 1941 to June 1944."],
    explanation: "June 1941; December 1941; 2 February 1943; June 1944.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Soviet Union called the war against Germany the Great {{blank:a}} War, and the Red Army took the German capital, {{blank:b}}, in 1945.",
    blanks: [
      { id: "a", accepted: ["Patriotic"], choices: ["Patriotic", "Civil", "Cold", "Revolutionary"] },
      { id: "b", accepted: ["Berlin"], choices: ["Berlin", "Vienna", "Warsaw", "Munich"] },
    ],
    explanation: "The war was named the Great Patriotic War, after Russia's resistance to Napoleon in 1812. The Red Army took Berlin in the spring of 1945.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Soviet marshal who led the counter-attack that drove the Germans back from Moscow in December 1941.",
    accepted: ["Zhukov", "Georgy Zhukov", "Georgii Zhukov", "Marshal Zhukov", "Georgi Zhukov"],
    wrong: ["Stalin"],
    explanation: "**Georgy Zhukov**, who also helped plan the Stalingrad encirclement and commanded in the capture of Berlin.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Battle of Stalingrad.",
    points: ["The German Sixth Army attacked the city on the Volga in the second half of 1942", "The Soviet defenders fought street by street in the ruins", "In November 1942 Soviet armies encircled the Germans (Operation Uranus)", "The Sixth Army surrendered on 2 February 1943"],
    modelAnswer: "The German Sixth Army attacked the city on the Volga in 1942, and Soviet defenders fought street by street in the ruins. In November 1942 Soviet armies encircled the Germans in Operation Uranus, and the Sixth Army surrendered on 2 February 1943.",
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Germans failed to defeat the Soviet Union quickly in 1941.",
    points: [["Distance, the autumn mud and the severe winter slowed the German army, which had not planned for a long war", 2], ["Soviet resistance at Leningrad and Moscow, the evacuation of industry to the east and fresh troops from Siberia allowed the Red Army to recover", 2]],
    hints: ["Think of the land, the weather, and Soviet recovery."],
    modelAnswer: "The distance, the autumn mud and the severe winter slowed the German army, which had not planned for a long war. Soviet resistance at Leningrad and Moscow, the evacuation of industry to the east and fresh troops from Siberia allowed the Red Army to recover and counter-attack in December.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the war did not bring greater freedom in the Soviet Union after 1945.",
    points: [["Stalin and the party feared that contact with the West had changed returning soldiers and prisoners, and many were sent to camps", 2], ["Victory strengthened the cult of Stalin and the regime, which tightened cultural control and ended the wartime concessions", 2]],
    hints: ["Think of the returning soldiers and of how victory affected the regime."],
    modelAnswer: "Stalin and the party feared that contact with the West had changed the returning soldiers and prisoners, and many were sent to camps. Victory also strengthened the cult of Stalin and the regime, which tightened cultural control and ended the wartime concessions.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a diary entry by a fictional schoolteacher in Leningrad, January 1942",
        "The bread ration is now a few slices, and it is made largely of sawdust. Today I carried my neighbour, who died in her chair, down to the street. There are many like her. We have no wood and no water, but the radio still plays and the factory near us still makes shells. We will not give up the city."),
      "",
      source("Source B", "a speech by a fictional Soviet political officer to his unit on the Volga, October 1942",
        "Comrades, the enemy has reached the river, but the motherland expects of each of us that we do not retreat. Every house in this city is a fortress. Those who run will answer to the military tribunal, and those who stand will be remembered by the people. Not one step back."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about conditions in Leningrad in 1942?", points: ["Severe shortage of food, with bread made partly of sawdust", "Shortages of wood and water, many deaths, but a continuing will to resist"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the reasons why Soviet people kept fighting.", points: [["Agree: both show determination to defend a city, a sense of duty to the motherland", 2], ["Differ: A shows a civilian's own commitment, in hardship; B shows an appeal backed by the threat of punishment from a tribunal", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying how the Soviet Union survived in 1941-42?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private diary, so it is likely to be honest about hunger and resolve, and fits the known suffering of Leningrad, but it covers one city and one person's view", 2], ["B shows the methods of morale and discipline (patriotism, 'Not one step back' and threats), but it is a speech meant to persuade and does not show how the soldiers responded", 2], ["Own knowledge: the siege of Leningrad (September 1941 to January 1944), Order No. 227 of July 1942 and the evacuation of industry support the sources and add the other factors", 2]], modelAnswer: "Source A is useful because a private diary is likely to be honest about hunger and the will to resist, and it matches the known suffering of Leningrad, but it is one person's account of one city. Source B shows how morale and discipline were maintained, with patriotism and the threat of a tribunal, and it fits Order No. 227 of July 1942, but it is a speech meant to persuade and does not show how the soldiers reacted. They do not show other causes of survival such as the evacuation of industry and the winter, so together they are useful but not enough." }),
    ],
    hints: ["For (c), consider the purpose of a diary and of a speech, and what each leaves out."],
    explanation: "Both sources are invented: a diary and a political officer's speech.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of Stalingrad as a turning point in the war on the Eastern Front.",
    levels: levels(8),
    points: [
      ["Stalingrad ended German hopes in the south: a whole army surrendered on 2 February 1943, with about 90,000 captured", 2],
      ["It raised Soviet morale and showed that the German army could be beaten", 2],
      ["Other turning points: Moscow in December 1941 ended the hope of a quick victory; Kursk in July 1943 ended German offensives", 2],
      ["A supported judgement, for example that Stalingrad was the most dramatic turning point, within a series", 2],
    ],
    hints: ["Compare Stalingrad with Moscow and Kursk."],
    modelAnswer: "Stalingrad was an important turning point because a whole German army surrendered on 2 February 1943, about 90,000 men, which ended German hopes in the south and raised Soviet morale by showing that Germany could be beaten. However, Moscow in December 1941 had already ended the hope of a quick victory, and Kursk in July 1943 removed Germany's ability to mount large offensives. I therefore judge that Stalingrad was the most dramatic turning point, but it formed part of a series of Soviet recoveries.",
    explanation: "Credit explanation and a supported judgement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "'The Soviet Union won the war on the Eastern Front mainly through the sacrifices of its people.' How far do you agree?",
    levels: levels(12),
    points: [
      ["Sacrifice: huge losses (about 25 to 27 million dead, an estimate), the defence of Leningrad and Stalingrad, and women and workers in factories", 3],
      ["Organisation and coercion: evacuation of industry, Stalin's control of the economy, Order No. 227, and the improving generals", 3],
      ["Other factors: geography and weather, German errors and brutality, and Allied help (Lend-Lease, the western campaigns)", 3],
      ["A supported judgement on the relative weight of the factors", 3],
    ],
    hints: ["Consider whether sacrifice alone could have produced victory."],
    modelAnswer: "The sacrifices of the Soviet people were central to victory, but they were not the only cause. The Soviet Union lost about 25 to 27 million people, by estimate, and the defence of Leningrad and Stalingrad and the work of women and factory workers made the continued fight possible. However, sacrifice was organised and often compelled: industry was evacuated east, Stalin controlled the war economy, Order No. 227 punished retreat, and generals such as Zhukov were allowed more freedom after 1941. Geography and weather slowed the invaders, German errors and brutality turned the population against them, and the Allies helped through Lend-Lease and the campaigns in the west. I therefore agree that sacrifice was necessary, but I judge that victory resulted from sacrifice combined with organisation and German mistakes.",
    explanation: "Credit both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What was Operation Barbarossa?", "The German invasion of the Soviet Union that began on 22 June 1941.");
  b.card("DEFINITION", "What was Lend-Lease?", "The American programme from 1941 of supplying Britain, the Soviet Union and others with weapons, vehicles, food and materials without immediate payment.");
  b.card("FACT", "What was the Soviet name for the war against Germany?", "The Great Patriotic War (1941-45).");
  b.card("FACT", "When did the Germans surrender at Stalingrad?", "2 February 1943: the Sixth Army under Paulus, about 90,000 survivors.");
  b.card("FACT", "What was Order No. 227?", "Stalin's order of July 1942, 'Not one step back', forbidding retreat without orders.");
  b.card("FACT", "How long did the siege of Leningrad last?", "From September 1941 to January 1944; around 800,000 or more civilians died, mostly of hunger.");
  b.card("CONCEPT", "Why was the USSR unprepared in 1941?", "Stalin ignored warnings, the purges had weakened the army, and the frontier defences in the new western territories were incomplete.");
  b.card("CONCEPT", "Why did the USSR win the war in the east?", "Resources and evacuated industry, organisation and coercion, patriotism, German mistakes and brutality, and Allied help.");
  b.card("CONCEPT", "How did the war affect Stalin's regime?", "It brought prestige and a superpower, but repression returned after 1945 and the cult of Stalin grew.");
});
