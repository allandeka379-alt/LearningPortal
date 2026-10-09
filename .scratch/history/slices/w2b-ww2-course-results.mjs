// Slice W2b: the Second World War, course and results, overview (ZIMSEC 12.5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.ww2.course-results", { file: "ww2/course-results", keyPrefix: "ww2.course-results" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did Japan attack Pearl Harbor?",
    options: [
      ["7 December 1941", "Correct: the attack brought the USA into the war."],
      ["22 June 1941", "That is when Germany invaded the USSR."],
      ["11 December 1941", "That is when Germany declared war on the USA."],
      ["6 August 1945", "That is when the atomic bomb was dropped on Hiroshima."],
    ],
    answer: "A",
    explanation: "Japan attacked the US fleet at **Pearl Harbor** on 7 December 1941.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the code name for the German invasion of the Soviet Union in June 1941?",
    options: [
      ["Operation Barbarossa", "Correct: launched on 22 June 1941."],
      ["Operation Sea Lion", "Sea Lion was the planned invasion of Britain, never carried out."],
      ["Operation Overlord", "Overlord was the Allied invasion of Normandy in 1944."],
      ["Operation Market Garden", "Market Garden was an Allied airborne operation in the Netherlands in 1944."],
    ],
    answer: "A",
    explanation: "**Operation Barbarossa** began on 22 June 1941.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Hitler postpone the invasion of Britain in 1940?",
    options: [
      ["The Luftwaffe failed to win control of the air", "Correct: the RAF won the Battle of Britain."],
      ["Britain surrendered soon after the fall of France", "Britain did not surrender; Churchill fought on."],
      ["The USA landed troops in Britain in 1940", "The USA was neutral until December 1941."],
      ["The German navy had destroyed the Royal Navy", "The Royal Navy remained far stronger than the German navy."],
    ],
    answer: "A",
    explanation: "Operation Sea Lion needed air superiority; the RAF, helped by radar, denied it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which battle in the Pacific in June 1942 is seen as a turning point?",
    options: [
      ["Midway", "Correct: four Japanese aircraft carriers were sunk."],
      ["Pearl Harbor", "Pearl Harbor was Japan's attack in December 1941."],
      ["Okinawa", "Okinawa was fought in 1945, near the end of the war."],
      ["El Alamein", "El Alamein was fought in North Africa."],
    ],
    answer: "A",
    explanation: "At **Midway** the US Navy sank four Japanese carriers, ending Japan's run of victories.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which African unit from Southern Rhodesia fought in Burma in 1944-1945?",
    options: [
      ["The Rhodesian African Rifles", "Correct: formed in 1940."],
      ["The Rhodesia Native Regiment", "This regiment fought in East Africa in the First World War."],
      ["The Pioneer Column", "The Pioneer Column occupied Mashonaland in 1890."],
      ["The British South Africa Police", "The BSAP was a police force inside the colony."],
    ],
    answer: "A",
    explanation: "The **Rhodesian African Rifles**, raised in 1940, served in the Burma campaign.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the Battle of Stalingrad a turning point on the Eastern Front?",
    options: [
      ["After it the Red Army took and kept the offensive", "Correct: Germany lost an entire army."],
      ["It ended the war in Europe within a month", "The war in Europe lasted more than two years after Stalingrad."],
      ["It was the first battle in which tanks were ever used", "Tanks had been used since 1916."],
      ["It persuaded the USA to declare war on Germany", "Germany had declared war on the USA in December 1941."],
    ],
    answer: "A",
    hints: ["What happened to the German Sixth Army, and which side attacked afterwards?"],
    explanation: "The German Sixth Army surrendered in February 1943; from then on the Soviets were mostly on the offensive.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which factor best explains why Japan surrendered in August 1945?",
    options: [
      ["The atomic bombs and Soviet entry into the war", "Correct: both came within days of each other."],
      ["The German surrender in May 1945 alone", "Japan fought on for three months after Germany surrendered."],
      ["The loss of the Battle of Midway in 1942", "Midway turned the tide, but Japan fought on for three more years."],
      ["A revolution that overthrew the Japanese Emperor", "The Emperor stayed on the throne."],
    ],
    answer: "A",
    hints: ["What happened between 6 and 9 August 1945?"],
    explanation: "Hiroshima (6 August), the Soviet declaration of war (8 August) and Nagasaki (9 August) came together; historians debate the relative weight of the bombs and the Soviet entry.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which result of the war most directly led to the Cold War?",
    options: [
      ["Europe was divided between Soviet and Western armies", "Correct: two rival superpowers faced each other."],
      ["The United Nations was founded in October 1945", "The UN was meant to keep the peace, not divide the world."],
      ["War crimes trials of Nazi leaders were held at Nuremberg", "The trials were a joint Allied action."],
      ["India and Pakistan became independent in 1947", "This is linked to decolonisation, not the Cold War."],
    ],
    answer: "A",
    hints: ["Think about where the Allied armies stood in May 1945."],
    explanation: "With Soviet armies in eastern Europe and Western armies in the west, Europe was divided between two rival systems, the basis of the Cold War.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "More than 300,000 Allied soldiers were evacuated from Dunkirk in 1940.",
    answer: true,
    explanation: "True. The evacuation in late May and early June 1940 saved much of the British army.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Japan surrendered on the same day as Germany in May 1945.",
    answer: false,
    explanation: "False. Germany's surrender took effect on 8 May 1945; Japan announced its surrender on 15 August and signed it on 2 September 1945.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with his role in the war.",
    pairs: [
      ["Winston Churchill", "British Prime Minister from May 1940"],
      ["Erwin Rommel", "German commander in North Africa"],
      ["Bernard Montgomery", "British commander at El Alamein"],
      ["Haile Selassie", "Emperor restored to Addis Ababa in 1941"],
    ],
    explanation: "Churchill (Britain), Rommel (Afrika Korps), Montgomery (Eighth Army), Haile Selassie (Ethiopia).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "D-Day landings in Normandy",
      "Battle of Britain",
      "Attack on Pearl Harbor",
      "German surrender at Stalingrad",
    ],
    right: POS,
    rightIndex: [3, 0, 1, 2],
    hints: ["Stalingrad ended in February 1943."],
    explanation: "Battle of Britain 1940; Pearl Harbor December 1941; Stalingrad February 1943; D-Day June 1944.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The fast German method of attack using tanks and aircraft was called {{blank:a}}. The United Nations was founded on 24 {{blank:b}} 1945, after the war in Europe had ended.",
    blanks: [
      { id: "a", accepted: ["Blitzkrieg"], choices: ["Blitzkrieg", "Lebensraum", "Anschluss", "Diktat"] },
      { id: "b", accepted: ["October"], choices: ["October", "May", "August", "December"] },
    ],
    explanation: "**Blitzkrieg** means lightning war; the UN was founded on 24 **October** 1945.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Japanese city on which the first atomic bomb was dropped.",
    accepted: ["Hiroshima"],
    wrong: ["Nagasaki"],
    explanation: "**Hiroshima** (6 August 1945); Nagasaki followed on 9 August.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the part played by Southern Rhodesia in the Second World War.",
    points: [
      "Declared war alongside Britain in September 1939.",
      "Rhodesian African Rifles raised (1940) and fought in Burma.",
      "White Rhodesians served in many theatres, many as airmen in the RAF.",
      "Rhodesian Air Training Group trained thousands of Allied aircrew; minerals and food supplied.",
    ],
    modelAnswer: "Southern Rhodesia declared war alongside Britain in September 1939. It raised the Rhodesian African Rifles in 1940, which fought in Burma, and white Rhodesians served in many theatres, especially as RAF airmen. The colony hosted the Rhodesian Air Training Group, which trained thousands of Allied aircrew, and supplied minerals and food.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Operation Barbarossa failed to defeat the USSR in 1941.",
    points: [
      "Identifies the Russian winter / lack of winter equipment.",
      "Explains that the cold halted the German advance before Moscow in December 1941.",
      "Identifies the size of the USSR and long supply lines.",
      "Explains that German forces were stretched thin and supplies could not keep up.",
      "Identifies Soviet resistance and resources (reserves, factories moved east).",
      "Explains that the Red Army kept replacing its losses and counter-attacked at Moscow.",
    ],
    hints: ["Think about weather, distance and the Soviet response."],
    modelAnswer: "The German army was not equipped for the Russian winter, and the freezing cold halted its advance before Moscow in December 1941. The USSR was so vast that German supply lines became very long, and fuel, food and ammunition could not keep up. The Soviets also resisted fiercely: they moved factories east of the Urals, raised new armies from their huge population and launched a counter-attack at Moscow.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the Second World War encouraged decolonisation in Africa.",
    points: [
      "Identifies weakened European powers.",
      "Explains that Britain and France were exhausted and indebted, so less able to hold their empires.",
      "Identifies returning African servicemen / ideas of freedom (Atlantic Charter).",
      "Explains that ex-servicemen had new experiences and expectations, and Allied talk of self-determination was turned against colonial rule.",
    ],
    hints: ["Think about the colonial powers and about Africans who served."],
    modelAnswer: "First, the war left Britain and France exhausted and in debt, so they were less able to keep control of their empires. Second, African ex-servicemen returned with new experiences and expectations, and nationalists used the Allies' own language of freedom and self-determination, as in the Atlantic Charter, against colonial rule.",
    explanation: "Two marks per explained way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a letter from a fictional African soldier of the Rhodesian African Rifles to his brother, written from a camp in Asia in 1945", "We have sailed across the sea and now wait to go to Burma. The officers tell us we fight so that all peoples may be free. I have met Indian soldiers who say the same, and who say that after the war they will rule their own country. My brother, when I come home I will ask why a man who fought for freedom must still carry a pass in his own land.")}`,
    hints: ["Think about what the writer learned and how he might act after the war."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the experiences of African soldiers in the war?", points: [
        "They travelled far from home / met soldiers from other colonies such as India.",
        "They were told they were fighting for freedom.",
      ], explanation: "Two inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "How might experiences like those in Source A have affected African politics after 1945? Use your own knowledge.", points: [
        "Soldiers questioned colonial restrictions (passes, land, wages).",
        "Contact with Indian nationalism showed that independence was possible (India independent 1947).",
        "Ex-servicemen joined or supported nationalist movements.",
        "Allied promises of freedom (Atlantic Charter) used to demand rights.",
      ], explanation: "Effects linked to knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far was the experience of African soldiers the main reason why the Second World War led to decolonisation? Use the source and your own knowledge.", points: [
        "Soldiers' experience: new ideas and expectations, as in the source.",
        "Other: weakening of Britain and France (debt, exhaustion).",
        "Other: superpowers (USA, USSR) and the UN opposed colonial empires.",
        "Other: Indian independence (1947) as an example; growth of nationalist parties and towns.",
        "Limit: the source is one fictional soldier's view; many ex-servicemen did not become active nationalists.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The experience of African soldiers, as Source A suggests, mattered: men who had travelled to India and Burma and been told they fought for freedom came home less willing to accept pass laws and low wages, and some supported nationalist movements. However, other results of the war were probably more important. Britain and France were exhausted and in debt, the USA and the USSR both opposed old-style empires, and the new United Nations supported self-determination. India's independence in 1947 showed what was possible, and wartime industry and urban growth helped nationalist parties to recruit. Not every ex-serviceman became politically active. Overall soldiers' experience was one important factor, but the weakening of the colonial powers and the new world order did more to make decolonisation possible.", explanation: "Both sides and a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the Eastern Front with the other theatres."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the war in North Africa between 1940 and 1943.", points: [
        "Italy attacked Egypt (1940) but was defeated by British forces.",
        "Rommel's Afrika Korps arrived in 1941 and drove the British back.",
        "Montgomery's Eighth Army won El Alamein (October-November 1942).",
        "Operation Torch landings (November 1942); Axis forces surrendered in Tunisia (May 1943).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The Eastern Front was the most important reason for the defeat of Germany.\" How far do you agree?", points: [
        ["Eastern Front: most German forces and losses there; Stalingrad and Kursk destroyed German strength.", 2],
        ["Eastern Front: Soviet manpower and industry; Red Army reached Berlin.", 2],
        ["Other: USA's industrial power and Lend-Lease supplies (including to the USSR).", 2],
        ["Other: D-Day and the second front; strategic bombing; war at sea.", 2],
        ["Other: Hitler's mistakes (Barbarossa, declaring war on the USA, refusing retreats).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The Eastern Front was very important. Most of the German army fought there for most of the war, and it suffered most of its losses there. At Stalingrad Germany lost an entire army, and after the Battle of Kursk in 1943 it could no longer launch major offensives. The USSR, with its huge population and factories moved east of the Urals, kept replacing its losses, and the Red Army captured Berlin in 1945.\n\nHowever, other factors mattered. American industry produced vast quantities of weapons and supplies, some of which, under Lend-Lease, kept the Soviet army moving. D-Day opened a second front in June 1944, and Allied bombing and the war at sea weakened German production. Hitler also made serious mistakes: invading the USSR before defeating Britain, declaring war on the USA, and forbidding retreats.\n\nOverall I largely agree: the Eastern Front destroyed the bulk of the German army, but Soviet victory depended partly on American supplies and on the pressure of the Western Allies, so it was the most important but not the only reason.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did the Second World War begin in Europe?", "1 September 1939, with the German invasion of Poland.");
  b.card("DEFINITION", "Blitzkrieg", "'Lightning war': fast tank and air attacks to break through and encircle the enemy.");
  b.card("FACT", "When did France sign an armistice with Germany?", "22 June 1940.");
  b.card("FACT", "What was the Battle of Britain?", "July-October 1940: the RAF defeated the Luftwaffe's attempt to win control of the air, so the invasion of Britain was postponed.");
  b.card("FACT", "When did Germany invade the USSR?", "22 June 1941 (Operation Barbarossa).");
  b.card("CONCEPT", "Name three turning points of 1942-1943.", "Midway (June 1942), El Alamein (October-November 1942), Stalingrad (ended February 1943).");
  b.card("FACT", "When was D-Day?", "6 June 1944, the Allied landings in Normandy.");
  b.card("FACT", "When did Germany and Japan surrender?", "Germany: 8 May 1945. Japan: announced 15 August, signed 2 September 1945.");
  b.card("CONCEPT", "Give four results of the Second World War.", "The UN, two superpowers, the Cold War and divided Europe, and faster decolonisation (also an estimated 70-85 million dead).");
  b.card("FACT", "What was the Rhodesian African Rifles?", "An African regiment raised in Southern Rhodesia in 1940 that fought in Burma in 1944-1945.");
});
