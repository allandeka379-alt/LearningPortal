// Slice W3b: the war in Europe, 1939-1943 (Cambridge Depth study E, KQ1).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["May-June 1940", "The Dunkirk evacuation"],
  ["July-October 1940", "The Battle of Britain"],
  ["June 1941", "Operation Barbarossa begins"],
  ["November 1942", "The Red Army surrounds the German Sixth Army"],
]);

concept("hist.ww2.europe-1939-43", { file: "ww2/europe-1939-43", keyPrefix: "ww2.europe-1939-43" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the code name for the German invasion of the Soviet Union in June 1941?",
    options: [
      ["Operation Barbarossa", "Correct: it began on 22 June 1941."],
      ["Operation Sea Lion", "Sea Lion was the planned invasion of Britain, never carried out."],
      ["Operation Overlord", "Overlord was the Allied invasion of Normandy in 1944."],
      ["Operation Dynamo", "Dynamo was the British evacuation from Dunkirk in 1940."],
    ],
    answer: "A",
    explanation: "**Barbarossa** was launched on 22 June 1941 by about three million German soldiers and their allies.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the French government based at Vichy after June 1940?",
    options: [
      ["Marshal Pétain", "Correct: his regime collaborated with Germany."],
      ["General de Gaulle", "De Gaulle led the Free French from London and rejected the armistice."],
      ["Paul Reynaud", "Reynaud was Prime Minister until he resigned in June 1940."],
      ["Jean Moulin", "Moulin was a leader of the French Resistance."],
    ],
    answer: "A",
    explanation: "**Pétain**, the hero of Verdun, signed the armistice and led the Vichy regime.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Germany need to defeat the RAF before it could carry out Operation Sea Lion?",
    options: [
      ["An invasion fleet could not cross the Channel under air attack", "Correct: control of the air was needed to protect the crossing."],
      ["The RAF was about to invade Germany", "Britain had no means of invading Germany in 1940."],
      ["Hitler had promised Stalin in the Nazi-Soviet Pact not to invade Britain", "The Nazi-Soviet Pact said nothing about Britain."],
      ["The RAF controlled the ports of northern France", "Germany controlled the French Channel ports after June 1940."],
    ],
    answer: "A",
    explanation: "Without **air superiority**, slow invasion barges would have been destroyed by the RAF and the Royal Navy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did the main German attack in May 1940 break through the French defences?",
    options: [
      ["Tanks advanced through the Ardennes and crossed the Meuse at Sedan", "Correct: the French had thought the Ardennes unsuitable for tanks."],
      ["Paratroopers captured Paris on the first day", "Paris fell only on 14 June."],
      ["German troops attacked the Maginot Line head-on and broke through it", "The Germans went round the Maginot Line."],
      ["The Italian army invaded through the Alps first", "Italy entered the war only on 10 June and made little progress."],
    ],
    answer: "A",
    explanation: "The thrust through the **Ardennes** reached the Channel coast in days, trapping the Allied armies in Belgium.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these was a reason why Hitler invaded the USSR?",
    options: [
      ["To gain Lebensraum (living space) for Germans in the east", "Correct: this had been his aim since the 1920s."],
      ["Stalin had declared war on Germany in 1941", "The USSR did not declare war on Germany; it was invaded."],
      ["To rescue German troops trapped at Stalingrad", "Stalingrad came in 1942-43, after the invasion."],
      ["The USA had asked Germany to stop Soviet expansion", "The USA was not allied to Germany."],
    ],
    answer: "A",
    explanation: "**Lebensraum**, hatred of communism, Nazi racial ideas and the resources of Ukraine and the Caucasus all drove Barbarossa.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the German switch to bombing London in September 1940 help the RAF?",
    options: [
      ["Its battered airfields and radar stations could recover", "Correct: pressure on Fighter Command was relieved."],
      ["London's anti-aircraft guns destroyed the Luftwaffe", "Guns shot down some aircraft but did not destroy the Luftwaffe."],
      ["The Luftwaffe ran out of bombs after the first raid", "The Blitz continued until May 1941."],
      ["It forced the USA to send fighters to Britain at once", "The USA was neutral in 1940."],
    ],
    answer: "A",
    hints: ["What had the Luftwaffe been attacking in August?"],
    explanation: "In August the attacks on **airfields** had stretched Fighter Command badly; turning to London gave it time to repair and recover.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why could the German Sixth Army not escape from Stalingrad in December 1942?",
    options: [
      ["Hitler forbade a break-out and the airlift failed", "Correct: the army was left to starve and freeze."],
      ["The River Volga froze and blocked all the roads", "The frozen river did not cause the encirclement."],
      ["Paulus had already surrendered in November", "Paulus surrendered at the end of January 1943."],
      ["The USA had cut German supply lines in Russia", "American forces were not on the Eastern Front."],
    ],
    answer: "A",
    hints: ["Think about decisions in Germany and promises about supplies."],
    explanation: "**Hitler** refused to allow a break-out, Göring's airlift could not deliver enough, and the relief attack failed.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that Germany did NOT fully control Europe by the end of 1940?",
    options: [
      ["Britain was still fighting and the Royal Navy ruled the seas", "Correct: Germany's main remaining enemy was undefeated."],
      ["France had signed an armistice in June 1940", "This shows German success, not its limits."],
      ["The Netherlands and Belgium were occupied", "This shows German success, not its limits."],
      ["Denmark and Norway had been captured by German forces in April 1940", "This shows German success, not its limits."],
    ],
    answer: "A",
    hints: ["Choose the fact that shows a limit to German power."],
    explanation: "Germany dominated the continent, but **Britain** and its empire fought on, controlled the seas and had growing American support.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "About 338,000 Allied soldiers were evacuated from Dunkirk in 1940.",
    answer: true,
    explanation: "True. They were saved between 26 May and 4 June 1940, but most of their heavy equipment was lost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Operation Sea Lion, the German invasion of Britain, was carried out in September 1940.",
    answer: false,
    explanation: "False. Sea Lion was postponed in September 1940 after the Luftwaffe failed to defeat the RAF, and it never took place.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Friedrich Paulus", "Commanded the German Sixth Army at Stalingrad"],
      ["Charles de Gaulle", "Led the Free French from London"],
      ["Hermann Göring", "Head of the Luftwaffe who promised an airlift"],
      ["Winston Churchill", "Became British Prime Minister on 10 May 1940"],
    ],
    explanation: "Paulus surrendered at Stalingrad; de Gaulle refused the armistice; Göring's Luftwaffe lost the Battle of Britain and failed to supply Stalingrad; Churchill led Britain from May 1940.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[3][1], order.events[1][1], order.events[0][1], order.events[2][1]],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["Britain's air battle came after the evacuation from France."],
    explanation: "Dunkirk May-June 1940; Battle of Britain July-October 1940; Barbarossa June 1941; encirclement at Stalingrad November 1942.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Germany's fast method of attack using tanks and dive-bombers was called {{blank:a}}. The Soviet city on the Volga where a German army surrendered in 1943 was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Blitzkrieg"], choices: ["Blitzkrieg", "Lebensraum", "Anschluss", "Weltpolitik"] },
      { id: "b", accepted: ["Stalingrad"], choices: ["Stalingrad", "Leningrad", "Moscow", "Kursk"] },
    ],
    explanation: "**Blitzkrieg** defeated Poland and France; the German Sixth Army surrendered at **Stalingrad**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the fall of France in 1940.",
    points: [
      "German attack on 10 May 1940 through the Low Countries and the Ardennes.",
      "Breakthrough at Sedan; tanks reached the Channel, trapping Allied armies.",
      "Dunkirk evacuation (26 May-4 June).",
      "Paris fell (14 June); armistice (22 June); Vichy regime under Pétain.",
    ],
    modelAnswer: "On 10 May 1940 Germany attacked the Netherlands, Belgium and France. Its tanks advanced through the Ardennes, crossed the Meuse at Sedan and reached the Channel, cutting off the Allied armies in the north, many of whose soldiers were evacuated from Dunkirk. Paris fell on 14 June, France signed an armistice on 22 June, and Pétain's Vichy government ruled the unoccupied south.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Battle of Stalingrad was a turning point in the war.",
    points: [
      "Identifies the destruction of a German army.",
      "Explains that the loss of the Sixth Army and about 91,000 prisoners was a blow Germany could not easily replace.",
      "Identifies the change of initiative on the Eastern Front.",
      "Explains that the Red Army went on the offensive and Germany was on the defensive in the east after Kursk.",
      "Identifies the effect on morale / prestige.",
      "Explains that it raised Soviet and Allied confidence and showed Germans that the war could be lost.",
    ],
    hints: ["Think about the army lost, who held the initiative afterwards, and morale."],
    modelAnswer: "At Stalingrad a whole German army was destroyed: the Sixth Army was surrounded and about 91,000 men were taken prisoner, losses Germany could not easily replace. After it, the Red Army held the initiative; once the German offensive at Kursk failed in July 1943, Germany was on the defensive in the east for the rest of the war. It also changed morale: Soviet and Allied confidence rose, while Germans saw for the first time that the war could be lost.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Operation Barbarossa did not achieve a quick victory in 1941.",
    points: [
      "Identifies distance, weather and lack of winter equipment.",
      "Explains that mud and then extreme cold slowed the advance and weakened German troops.",
      "Identifies Soviet resources and resistance.",
      "Explains that the USSR moved factories east and brought fresh troops for the counter-attack before Moscow (December 1941).",
    ],
    hints: ["Think about the land and weather, and about the USSR's resources."],
    modelAnswer: "The distances were vast, autumn rain turned roads to mud, and the German army had not been equipped for a Russian winter, so its advance slowed and its soldiers suffered badly. Meanwhile the USSR moved hundreds of factories east of the Urals and brought fresh troops, including divisions from Siberia, which counter-attacked before Moscow on 5 December 1941.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a diary entry by a fictional woman living in a town in Kent, 18 August 1940", "Planes overhead again all afternoon, ours and theirs, white trails crossing the sky. The airfield up the road was hit for the third time this week; you could see the smoke for miles. People say our boys are tired out and there are not enough of them. Still, the Germans come back fewer each time, or so the wireless says.")}\n\n${source("Source B", "a report written by a fictional Luftwaffe staff officer for his superiors, early September 1940", "The British fighter force has not been destroyed. Our formations are met by enemy fighters again and again, apparently directed from the ground. Our fighter escorts can stay over England only a short time before fuel runs low. Losses of experienced crews are serious. A change of target to London may draw the remaining British fighters into battle.")}`,
    hints: ["In (c), think about who wrote each source and what each could know."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the Battle of Britain in August 1940?", points: [
        "Airfields were being attacked repeatedly.",
        "The RAF was under strain / people were worried but hopeful.",
      ], explanation: "Two inferences from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Using Source B and your own knowledge, explain why the Luftwaffe failed to defeat the RAF.", points: [
        "Radar and ground control directed British fighters (source; own knowledge: radar chain, control system).",
        "Limited range / fuel of German fighters (source).",
        "Loss of experienced aircrew; shot-down German crews were captured.",
        "The switch to London relieved the RAF's airfields (source; own knowledge).",
      ], explanation: "Source and own knowledge." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Which source is more useful to a historian studying why Britain won the Battle of Britain? Use the sources and your own knowledge.", points: [
        "A: diary written at the time by a civilian; honest, private.",
        "A: limited to what she could see and hear; relies on rumour and the radio (which was censored).",
        "A: useful for showing attacks on airfields and the strain on the RAF.",
        "B: written by a Luftwaffe officer for his superiors; needed to be accurate, though he may play down German errors.",
        "B: explains reasons for failure (radar-directed fighters, range, losses) that match own knowledge.",
        "B: shows the reasoning behind the switch to London.",
        "Uses own knowledge to test both sources.",
        "Supported judgement.",
      ], levels: levels(8), modelAnswer: "Source A is a private diary written at the time by a civilian in Kent, so it has no reason to deceive. It is useful for showing that airfields were bombed repeatedly in August and that people feared the RAF was exhausted, which matches my knowledge that Fighter Command was under great strain. However, she could only see what happened near her, and her claim that the Germans were losing more comes from rumour and the wireless, which was censored. Source B was written by a Luftwaffe officer for his superiors, so he needed to be accurate, although he might play down German mistakes. It explains why Germany was failing: British fighters directed from the ground, which I know was due to radar and the RAF's control system; the short range of German fighters; and the loss of experienced crews. It also shows the reasoning behind the switch to London, which actually gave the RAF time to recover. Source B is more useful because it explains causes, while Source A mainly shows the experience of the battle.", explanation: "Provenance, content and own knowledge are needed for the top level." }),
    ],
    explanation: "Practice source-based question (14 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), set radar and the RAF against German mistakes and the Royal Navy."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the early successes of Operation Barbarossa in 1941.", points: [
        "Surprise attack on 22 June 1941 by about three million German soldiers and allies.",
        "Three army groups advanced towards Leningrad, Moscow and Ukraine.",
        "Huge encirclements captured hundreds of thousands of prisoners (e.g. Kiev).",
        "Leningrad besieged from September; German troops close to Moscow by late November.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Radar was the main reason why Germany was unable to conquer Britain in 1940.\" How far do you agree?", points: [
        ["Radar: early warning; fighters met raids without wasteful patrols.", 2],
        ["Radar was part of a control system that used limited fighters efficiently.", 2],
        ["Other: Spitfires, Hurricanes, aircraft production, pilots from many countries; home advantage.", 2],
        ["Other: German mistakes (switch to London; fighter range; underestimating the RAF).", 2],
        ["Other: the Royal Navy and the Channel made invasion very risky anyway.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Radar was very important. The chain of radar stations along the coast gave warning of German raids, so RAF fighters could be sent to meet them rather than wasting fuel and pilots on patrols. Radar was linked to a control system that passed information quickly to fighter squadrons, allowing a limited number of fighters to be used where they were most needed.\n\nHowever, radar alone would not have won the battle. Britain had good fighters, the Spitfire and Hurricane, and its factories built fighters faster than Germany's in 1940. Pilots from Poland, Czechoslovakia, the dominions and other countries strengthened the RAF, and pilots shot down over Britain could fly again. Germany also made mistakes: its fighters had limited range over England, and in September it switched from bombing airfields to London, giving the RAF time to recover. Finally, even if the Luftwaffe had won, an invasion would have faced the Royal Navy.\n\nI partly agree. Radar was the most important single advantage in the air battle, because it let the RAF use its strength efficiently, but Germany failed to conquer Britain because of a combination of British strengths, German mistakes and the barrier of the Channel and the navy.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Blitzkrieg", "'Lightning war': fast tank and motorised attacks supported by aircraft, aiming to break through and encircle the enemy.");
  b.card("DEFINITION", "Vichy France", "Pétain's collaborating government of unoccupied southern France after June 1940.");
  b.card("FACT", "When was the Dunkirk evacuation, and how many were rescued?", "26 May-4 June 1940; about 338,000 soldiers.");
  b.card("FACT", "When did France sign an armistice with Germany?", "22 June 1940.");
  b.card("FACT", "When was the Battle of Britain?", "July-October 1940.");
  b.card("FACT", "When did Operation Barbarossa begin?", "22 June 1941.");
  b.card("FACT", "When did the German Sixth Army surrender at Stalingrad?", "31 January-2 February 1943; about 91,000 prisoners.");
  b.card("CONCEPT", "Why did Hitler invade the USSR?", "Lebensraum, anti-communism and racial ideology, resources (Ukrainian grain, Caucasus oil), and to remove Britain's last hope of an ally.");
  b.card("CONCEPT", "Why did Germany fail to conquer Britain in 1940?", "Radar and the RAF's control system, good fighters and production, German mistakes (the switch to London), and the Royal Navy.");
});
