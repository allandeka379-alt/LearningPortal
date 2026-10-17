// W4a: ahist.ww2.events (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.ww2.events", { file: "ww2/events", keyPrefix: "ww2.events" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "On what date did Japan attack the American fleet at Pearl Harbor?",
    ok: ["7 December 1941", "Correct: the attack brought the United States into the war."],
    no: [
      ["22 June 1941", "That is the date of Operation Barbarossa."],
      ["6 June 1944", "That is D-Day, the Normandy landings."],
      ["2 September 1945", "That is the date of Japan's formal surrender."],
    ],
    explanation: "Japan struck Pearl Harbor on 7 December 1941. The US declared war on Japan, and Germany declared war on the US on 11 December.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was Operation Barbarossa?",
    ok: ["The German invasion of the Soviet Union in 1941", "Correct: it broke the Nazi-Soviet Pact."],
    no: [
      ["The Allied landing in Normandy in 1944", "That was Operation Overlord (D-Day)."],
      ["The Allied landings in French North Africa in 1942", "That was Operation Torch."],
      ["The Japanese attack on the American fleet in Hawaii", "That was the attack on Pearl Harbor."],
    ],
    explanation: "Barbarossa began on 22 June 1941 and was the largest land invasion in history. It opened a second great front and broke the Pact of 1939.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the Battle of Stalingrad seen as a turning point?",
    ok: ["Germany lost an entire army and the Soviets began to advance", "Correct: the Sixth Army surrendered in February 1943."],
    no: [
      ["Germany captured Moscow and forced the Soviet government to flee", "Moscow was never captured by Germany."],
      ["Britain and the United States opened a second front in France", "That happened at D-Day in 1944."],
      ["Japan was forced to retreat from the Pacific islands it had taken", "Stalingrad was in the Soviet Union, not the Pacific."],
    ],
    explanation: "The surrender of the Sixth Army, in February 1943, ended German hopes of victory in the east. After Stalingrad the Red Army was mostly on the offensive.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which battle in June 1942 ended Japan's ability to attack across the Pacific?",
    ok: ["Midway, where the US sank four Japanese aircraft carriers", "Correct: Japan lost the carriers that gave its fleet strength."],
    no: [
      ["Pearl Harbor, where the American fleet was bombed from the air", "Pearl Harbor was a Japanese success in December 1941."],
      ["El Alamein, where Montgomery defeated the Afrika Korps", "El Alamein was in Egypt, not the Pacific."],
      ["Iwo Jima, where American forces landed on a Japanese island", "Iwo Jima was in 1945."],
    ],
    hints: ["It was fought in the central Pacific about six months after Pearl Harbor."],
    explanation: "At Midway (4-7 June 1942) American aircraft sank four Japanese carriers, and Japan was put on the defensive.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the importance of the Second Battle of El Alamein in 1942?",
    ok: ["It beat the Axis army in Egypt and began its retreat", "Correct: Montgomery's Eighth Army forced Rommel back."],
    no: [
      ["It gave Germany control of the Suez Canal and Middle East oil", "The Axis never reached Suez."],
      ["It led Italy to surrender in North Africa", "Italy surrendered in September 1943."],
      ["It ended the war in East Africa with the return of the Emperor", "That happened in 1941."],
    ],
    hints: ["Think of who won in October-November 1942 and where the Axis forces went afterwards."],
    explanation: "El Alamein stopped Rommel's advance on Egypt. With the Torch landings in November 1942, it led to the defeat of the Axis in Tunisia in May 1943.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which contribution did Africa make to the Allied war effort?",
    ok: ["African troops fought in North Africa and Burma", "Correct: units such as the Rhodesian African Rifles served in Burma."],
    no: [
      ["Africa stayed neutral and sent no soldiers to the war", "Africans took part on a very large scale."],
      ["Only white soldiers from the colonies were allowed to fight", "African soldiers formed many units."],
      ["African states joined the Axis powers to fight the Allies", "No African colony joined the Axis; Italian colonies fought for Italy."],
    ],
    hints: ["Think of the Rhodesian African Rifles and West African divisions."],
    explanation: "Hundreds of thousands of Africans served as soldiers and many more as labourers. African regiments fought the Italians in East Africa and the Japanese in Burma.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which argument best supports the view that the entry of the United States was the most important turning point?",
    ok: ["American industry out-produced the Axis powers", "Correct: production made Allied victory in a long war very likely."],
    no: [
      ["American troops won at Stalingrad in 1943", "Stalingrad was a Soviet victory."],
      ["The United States defeated France in the Battle of France", "France was defeated by Germany."],
      ["American troops liberated Poland in 1944 before the Soviet army", "Poland was liberated mainly by the Soviet army."],
    ],
    hints: ["Think of what the United States could produce."],
    explanation: "After December 1941 the Allies held much greater resources. Historians who stress this argue that Germany could not win a long war against the United States, Britain and the Soviet Union together.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "D-Day, the Allied landing in Normandy, took place on 6 June 1944.",
    answer: true,
    explanation: "True. It was the largest seaborne invasion in history and opened the second front in Western Europe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Germany captured Moscow in the winter of 1941.",
    answer: false,
    explanation: "False. The German advance stalled before Moscow in December 1941 in the cold, and a Soviet counter-attack pushed it back.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree that the atomic bombs were necessary to end the war with Japan.",
    answer: false,
    hints: ["Think of the Soviet entry into the war and the debate about Japan's position."],
    explanation: "False. Some argue that the bombs saved lives by avoiding an invasion, while others argue that Japan was near surrender and that the Soviet declaration of war would have been enough.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with his role in the war.",
    pairs: [
      ["Winston Churchill", "British Prime Minister from May 1940"],
      ["Erwin Rommel", "German commander of the Afrika Korps"],
      ["Bernard Montgomery", "British general who won at El Alamein"],
      ["Haile Selassie", "Emperor of Ethiopia who returned in May 1941"],
    ],
    explanation: "Churchill (Prime Minister from 10 May 1940), Rommel (North Africa), Montgomery (El Alamein) and Haile Selassie (restored to Addis Ababa in 1941).",
  });
  chrono(b, [
    "The fall of France",
    "Pearl Harbor is attacked",
    "The Battle of Stalingrad ends in German surrender",
    "D-Day landings in Normandy",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1940 to 1944."],
    explanation: "June 1940; December 1941; February 1943; June 1944.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German method of fast attacks using tanks and aircraft was called {{blank:a}}, and the atomic bombs were dropped on Hiroshima and {{blank:b}} in August 1945.",
    blanks: [
      { id: "a", accepted: ["blitzkrieg"], choices: ["blitzkrieg", "appeasement", "autarky", "Anschluss"] },
      { id: "b", accepted: ["Nagasaki"], choices: ["Nagasaki", "Tokyo", "Osaka", "Nanjing"] },
    ],
    explanation: "Blitzkrieg means 'lightning war'. Hiroshima (6 August) and Nagasaki (9 August) were the two cities bombed.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the German general who commanded the Afrika Korps in North Africa.",
    accepted: ["Erwin Rommel", "Rommel"],
    wrong: ["Montgomery"],
    explanation: "**Erwin Rommel**, whose army was defeated at El Alamein in 1942.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main events of the war in Europe in 1940.",
    points: ["Germany invaded Denmark and Norway in April", "Germany attacked the Netherlands, Belgium and France on 10 May, bypassing the Maginot Line", "Allied troops were evacuated from Dunkirk and France signed an armistice on 22 June", "The RAF defeated the Luftwaffe in the Battle of Britain, and Hitler postponed the invasion"],
    modelAnswer: "Germany invaded Denmark and Norway in April. On 10 May it attacked the Netherlands, Belgium and France, bypassing the Maginot Line. Allied troops were evacuated from Dunkirk and France signed an armistice on 22 June. The RAF defeated the Luftwaffe in the Battle of Britain, and Hitler postponed the invasion.",
    explanation: "One mark for each event described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Operation Barbarossa weakened Germany's chances of winning the war.",
    points: [["It opened a long war on a second great front against the Soviet Union, which had vast manpower and territory, so Germany's forces were stretched", 2], ["The advance stalled before Moscow in winter 1941 and Germany could not win a quick victory, so it had to fight a long war against stronger economies", 2]],
    hints: ["Think of the size of the front and the failure to win quickly."],
    modelAnswer: "It opened a long war on a second great front against the Soviet Union, which had vast manpower and territory, so Germany's forces were stretched. The advance stalled before Moscow in the winter of 1941 and Germany could not win a quick victory, so it had to fight a long war against stronger economies.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how Africa and Africans contributed to the Allied victory.",
    points: [["African soldiers fought in North Africa, East Africa and Burma, in units such as the King's African Rifles and the Rhodesian African Rifles", 2], ["Africa supplied raw materials such as copper, and African labour built roads and airfields; air training schools in Southern Rhodesia trained pilots", 2]],
    hints: ["Give a military contribution and an economic or labour one."],
    modelAnswer: "African soldiers fought in North Africa, East Africa and Burma in units such as the King's African Rifles and the Rhodesian African Rifles. Africa also supplied raw materials such as copper, African labour built roads and airfields, and the air training schools in Southern Rhodesia trained pilots.",
    explanation: "Credit explained contributions with examples.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional African soldier of the King's African Rifles to his family in Nyasaland, written in Burma, 1944",
        "We have been fighting in the jungle for many months. The rain never stops and the Japanese are hard to see. I have learned to read and write in the army, and the sergeant says that we are as good as any soldier in the empire. When I return I shall ask why we are paid less than the others, and I do not think I shall be quiet."),
      "",
      source("Source B", "a notice issued by a fictional colonial governor in Africa, 1943",
        "The Empire is at war and every man must do his part. Labourers are required for the mines and the roads, and those who work will earn the thanks of the King. The production of copper and food is vital. Idlers will be dealt with under the regulations."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the soldier's attitude to his service?", points: ["He is proud of his skills and learning to read and write", "He resents lower pay and may demand change after the war"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about Africans' part in the war effort.", points: [["Agree: both show Africans contributing to the war, as soldiers (A) and as labourers (B)", 2], ["Differ: A is a personal account of a soldier hinting at future protest, whereas B is an official demand using appeals and threats", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the effects of the war on Africa?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful for the soldier's experience and the seeds of future demands, but it is one man's letter, possibly censored, and may not be typical", 2], ["B is useful for how the colonial government mobilised labour and resources, but it is an official notice that gives the government's view and not the workers'", 2], ["Own knowledge: wartime recruitment, copper production and the return of soldiers who expected change fit both sources; together they show a war that both strained and changed Africa", 2]], modelAnswer: "Source A is useful because it shows a soldier's pride in his skills, his resentment of unequal pay and his hint of future protest, which fits the later demands of returned soldiers. It is one man's letter, possibly censored, so we cannot say that it is typical. Source B is useful for showing how the colonial government mobilised labour and raw materials, but it is an official notice that gives the government's view and not that of the workers. Together they show that the war both strained African societies and raised expectations, but they do not show the scale." }),
    ],
    hints: ["For (c), consider the purpose of a notice and of a private letter."],
    explanation: "Both sources are invented: a soldier's letter and an official notice.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "Which was the most important turning point of the Second World War in Europe? Explain your answer.",
    levels: levels(12),
    points: [
      ["The Battle of Britain: Britain survived as a base and prevented a German invasion", 2],
      ["Barbarossa and Stalingrad: Germany's war on two fronts and the loss of the Sixth Army, after which the Soviet army advanced", 3],
      ["The entry of the United States in December 1941: its production made the Allied victory likely in a long war", 3],
      ["D-Day and the Western advance (and El Alamein/Torch in Africa) as later events with a smaller effect on the outcome", 2],
      ["Judgement that justifies one choice by criteria and compares it with at least one rival", 2],
    ],
    hints: ["Define 'turning point' and compare at least two events."],
    modelAnswer: "I argue that the German defeat at Stalingrad, in the context of the invasion of the Soviet Union, was the most important turning point in Europe. The Battle of Britain in 1940 was important because it kept Britain free as a base, but it did not defeat Germany. The entry of the United States in December 1941 gave the Allies vast resources, but the outcome was not decided by production alone; it required victories on land. At Stalingrad the German Sixth Army was surrounded and surrendered in February 1943 after a winter of heavy losses, and Germany lost the initiative in the east. After this the Red Army advanced, and most of the German army was defeated on the eastern front. D-Day and El Alamein were also significant, but they came after Germany had lost the chance of victory, and the Western Allies fought a smaller part of the German army. I conclude that Stalingrad was the decisive turning point in Europe, although it depended on Barbarossa's failure and was made certain by American production.",
    explanation: "Credit a reasoned choice, comparison with rival events and a supported judgement.",
  });

  b.card("DEFINITION", "What was blitzkrieg?", "'Lightning war': fast attacks by tanks, aircraft and infantry to break through and encircle enemy forces.");
  b.card("FACT", "When was Operation Barbarossa launched?", "22 June 1941, the German invasion of the Soviet Union.");
  b.card("FACT", "When was Pearl Harbor attacked?", "7 December 1941, bringing the United States into the war.");
  b.card("FACT", "What happened at Stalingrad?", "The German Sixth Army was surrounded and surrendered in February 1943; the Soviets began to advance.");
  b.card("FACT", "What happened at Midway in June 1942?", "The US Navy sank four Japanese aircraft carriers, ending Japan's advance in the Pacific.");
  b.card("FACT", "What was D-Day?", "6 June 1944, the Allied landing in Normandy, opening the second front in Western Europe.");
  b.card("FACT", "When were the atomic bombs dropped?", "6 August 1945 on Hiroshima and 9 August 1945 on Nagasaki; Japan formally surrendered on 2 September 1945.");
  b.card("CONCEPT", "What was Africa's role in the Second World War?", "A battlefield (North and East Africa), and a source of soldiers, labour and raw materials such as copper.");
  b.card("CONCEPT", "Why is Stalingrad called a turning point?", "Germany lost an entire army and the initiative in the east, and the Red Army began its advance to Berlin.");
});
