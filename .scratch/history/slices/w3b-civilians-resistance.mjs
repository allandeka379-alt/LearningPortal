// Slice W3b: civilians under bombing and occupation, and resistance (Cambridge Depth study E, KQ3).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["November 1940", "Coventry is bombed"],
  ["February 1942", "Singapore falls and is renamed Syonan-to"],
  ["July-August 1943", "A firestorm devastates Hamburg"],
  ["August 1944", "Paris is liberated"],
]);

concept("hist.ww2.civilians-resistance", { file: "ww2/civilians-resistance", keyPrefix: "ww2.civilians-resistance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did the Blitz on British cities take place?",
    options: [
      ["September 1940 to May 1941", "Correct: it ended when Germany turned its forces east."],
      ["September 1939 to May 1940", "This was the Phoney War, when there was little bombing."],
      ["June 1941 to June 1942", "By then the main German bombing campaign had ended."],
      ["June 1944 to March 1945", "This was the period of the V-1 and V-2 weapons, not the Blitz."],
    ],
    answer: "A",
    explanation: "The **Blitz** lasted from 7 September 1940 to May 1941.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who united the main French Resistance groups in the National Council of the Resistance in 1943?",
    options: [
      ["Jean Moulin", "Correct: he was arrested in June 1943 and died after torture."],
      ["Marshal Pétain", "Pétain led the collaborating Vichy regime."],
      ["Pierre Laval", "Laval was a leading Vichy politician who collaborated with Germany."],
      ["Subhas Chandra Bose", "Bose led the Indian National Army in Southeast Asia."],
    ],
    answer: "A",
    explanation: "**Jean Moulin** was sent by de Gaulle to unite the resistance inside France.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Chinese in Malaya and Singapore suffer the harshest treatment under Japanese rule?",
    options: [
      ["Many had supported China in its war against Japan", "Correct: the Japanese saw them as enemies, as in the Sook Ching operation."],
      ["They had invited the British back to Malaya", "The British did not return until after Japan surrendered."],
      ["They refused to grow tapioca during the shortages", "There was no such refusal; all groups faced shortages."],
      ["They formed the Indian National Army", "The INA was recruited from Indians."],
    ],
    answer: "A",
    explanation: "Japan had been at war with China since 1937, and many Malayan Chinese had raised money for China, so they were targeted in the **Sook Ching** massacres.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the aim of area bombing by RAF Bomber Command?",
    options: [
      ["To destroy whole cities' industry, housing and workers' morale", "Correct: precision night bombing had largely failed."],
      ["To hit only single factories by day with great accuracy and spare homes", "This describes the American approach, which was rarely precise in practice."],
      ["To drop supplies to resistance groups in Germany", "There was no organised armed resistance to supply in Germany."],
      ["To defend British cities from German bombers", "Defence was the job of Fighter Command."],
    ],
    answer: "A",
    explanation: "**Area bombing** targeted whole urban areas, hoping to wreck production and break morale.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the French Maquis grow rapidly from 1943?",
    options: [
      ["Young men fled to the countryside to avoid forced labour in Germany", "Correct: compulsory labour service drove many into hiding."],
      ["Germany withdrew all its troops from France", "German forces remained in France until 1944."],
      ["The Vichy government ordered its army to join the resistance movement", "Vichy co-operated with Germany."],
      ["The Allies landed in Normandy in 1943", "D-Day was in June 1944."],
    ],
    answer: "A",
    explanation: "The compulsory labour service introduced in 1943 made many young men choose the hills and forests of the **Maquis** rather than work in Germany.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the bombing of German cities NOT cause German war production to fall in 1942-43?",
    options: [
      ["Industry was reorganised and dispersed, and output rose until late 1944", "Correct: production was moved and increased under Speer."],
      ["The Allies dropped no bombs at all on any German cities until early in 1944", "Heavy raids took place from 1942."],
      ["German cities had no factories", "German cities were major industrial centres."],
      ["Germany moved almost all its weapons production to occupied Norway", "Most weapons were made in Germany itself."],
    ],
    answer: "A",
    hints: ["Think about how Germany adapted its industry."],
    explanation: "Germany dispersed and reorganised production, so output rose until late 1944. Attacks on **oil and transport** in 1944-45 were more damaging.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about British morale during the Blitz is best supported by the evidence?",
    options: [
      ["It held overall, though there was fear and anger", "Correct: censored sources stressed calm, but other evidence shows strain."],
      ["Everyone remained calm and cheerful throughout", "This is the propaganda image; there was fear, looting and anger."],
      ["It collapsed and Britain asked for peace in 1941", "Britain did not ask for peace."],
      ["People refused to use air-raid shelters at all", "Millions used shelters, including the Underground."],
    ],
    answer: "A",
    hints: ["Avoid both the propaganda image and its opposite."],
    explanation: "Morale did not break and production continued, but the 'Blitz spirit' was partly a creation of censorship and propaganda.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the MPAJA was politically more important than militarily?",
    options: [
      ["Its members later formed the core of the 1948 communist insurgency", "Correct: its long-term political effect outlasted its military role."],
      ["Japan surrendered before the Allied invasion of Malaya", "This shows its limited military role but not its political importance."],
      ["It received weapons from Force 136", "This shows support, not political importance."],
      ["It was formed in 1942", "This is a date, not evidence of importance."],
    ],
    answer: "A",
    hints: ["Look for a consequence after the war."],
    explanation: "The MPAJA's direct effect on Japanese forces was limited, but it shaped post-war Malayan politics.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under Japanese rule Singapore was renamed Syonan-to.",
    answer: true,
    explanation: "True. The name means 'Light of the South'.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Most people in occupied France took an active part in the Resistance.",
    answer: false,
    explanation: "False. Most French people neither actively resisted nor collaborated. The Resistance was small until 1943 and grew mainly in 1943-44.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Sook Ching", "Japanese purge of Chinese men in Singapore, 1942"],
      ["Force 136", "British organisation that supported resistance in Malaya"],
      ["Maquis", "French resistance fighters in the countryside"],
      ["Anderson shelter", "Garden air-raid shelter used in Britain"],
    ],
    explanation: "These terms cover Japanese rule, resistance in Malaya and France, and civilian life in the Blitz.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[2][1], order.events[0][1], order.events[3][1], order.events[1][1]],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The German bombing of Britain came before the worst Allied bombing of Germany."],
    explanation: "Coventry November 1940; Singapore February 1942; Hamburg July-August 1943; Paris liberated August 1944.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The head of RAF Bomber Command from 1942 was Arthur {{blank:a}}. The Indian National Army was led from 1943 by Subhas Chandra {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Harris"], choices: ["Harris", "Dowding", "Montgomery", "Percival"] },
      { id: "b", accepted: ["Bose"], choices: ["Bose", "Nehru", "Gandhi", "Jinnah"] },
    ],
    explanation: "**Harris** directed area bombing; **Bose** led the INA alongside the Japanese.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the effects of the Blitz on daily life in Britain.",
    points: [
      "Deaths and destruction: about 40,000 civilians killed; homes destroyed.",
      "People sheltered in Anderson shelters, public shelters and Underground stations.",
      "Blackout at night.",
      "Evacuation of children / volunteers as air-raid wardens and fire-watchers.",
    ],
    modelAnswer: "The Blitz killed about 40,000 civilians and destroyed or damaged huge numbers of homes, especially in London. Families spent nights in Anderson shelters or in public shelters and Underground stations. The blackout meant no lights could show, and many children were evacuated to the countryside, while volunteers served as air-raid wardens and fire-watchers.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how Japanese control affected people's lives in Malaya and Singapore.",
    points: [
      "Identifies terror against the Chinese (Sook Ching) / the Kempeitai.",
      "Explains that mass killings, arrests and torture created fear and silenced opposition.",
      "Identifies economic hardship (shortages, banana money inflation).",
      "Explains that people went hungry, grew tapioca, and savings became worthless.",
      "Identifies forced labour / different treatment of groups / propaganda.",
      "Explains that labourers were sent to the Burma-Thailand railway, many dying, while Japan courted Malays and Indians with propaganda about liberating Asia.",
    ],
    hints: ["Think about terror, the economy and labour."],
    modelAnswer: "Japanese rule brought terror, especially for the Chinese: in the Sook Ching operation many Chinese men were killed, and the Kempeitai used arrests, torture and informers, so people lived in fear. Trade collapsed and food was scarce, so many families survived on tapioca and sweet potatoes, while the occupation 'banana money' became worthless through inflation. Tens of thousands of labourers were sent to build the Burma-Thailand railway, where very many died. At the same time Japan treated Malays and Indians less harshly at first and used schools and propaganda to present itself as Asia's liberator.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the methods used by the French Resistance.",
    points: [
      "Underground newspapers and propaganda.",
      "Intelligence gathering for the Allies.",
      "Escape lines for Allied airmen and others.",
      "Sabotage of railways and telephone lines / armed attacks, especially in 1944.",
    ],
    hints: ["Think about information, rescue and sabotage."],
    modelAnswer: "The French Resistance printed underground newspapers to counter German and Vichy propaganda. It gathered intelligence about German forces for Britain, and ran escape lines that helped Allied airmen get back to Britain. Especially in 1944, it sabotaged railways and telephone lines and attacked German troops to delay reinforcements heading for Normandy.",
    explanation: "One mark per method described.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a short British government information film of the kind shown in cinemas in autumn 1940", "The film shows a milkman stepping over rubble to make his deliveries and Londoners smiling as they emerge from shelters. The narrator says that the people of London can take it, and that bombs cannot break their spirit.", { described: true })}\n\n${source("Source B", "a confidential report by a fictional social researcher on morale in a bombed East London district, September 1940", "People are tired and angry. Many complain that the public shelters are overcrowded and dirty, and that the West End is better protected. Some families have left for the countryside on their own. There has been looting of damaged houses. Yet there is no sign that people want the government to make peace.")}`,
    hints: ["In (c), think about each source's purpose and audience."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What impression of London during the Blitz does Source A give?", points: [
        "Londoners were cheerful / calm.",
        "Daily life went on; the bombing could not break morale.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B support Source A?", points: [
        "Supports: no desire for peace / morale not broken.",
        "Contradicts: people were tired and angry, not smiling.",
        "Contradicts: complaints about shelters / class differences.",
        "Contradicts: looting and people fleeing.",
      ], explanation: "Specific support and contradiction." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Which source is more reliable as evidence about morale during the Blitz? Use the sources and your own knowledge.", points: [
        "A: government information film; propaganda to keep morale up at home and impress opinion abroad (e.g. the USA).",
        "A: selected scenes; censorship; but shows how the government wanted the Blitz seen.",
        "B: confidential report, not for publication; purpose to inform, so more likely to be frank.",
        "B: one district; early in the Blitz; researcher's own views may shape it.",
        "Own knowledge: shelters overcrowded; people slept in the Underground; looting occurred.",
        "Own knowledge: Britain did not seek peace; production continued.",
        "Compares the two.",
        "Supported judgement.",
      ], levels: levels(8), modelAnswer: "Source A is a government information film, so it was propaganda meant to keep up morale at home and to impress opinion abroad, especially in the USA. Its scenes were chosen to show calm and cheerful Londoners, and censorship meant that fear, damage and anger were not shown. It is reliable as evidence of the message the government wanted to give, but not of how people actually felt. Source B was a confidential report not meant for publication, so the researcher had less reason to hide problems. Its details match my own knowledge: public shelters were overcrowded, many people slept in the Underground, some families left the cities and there was looting. However, it covers only one East London district early in the Blitz. It also agrees with the film on one point: people did not want peace, and Britain kept fighting while production continued. Source B is the more reliable evidence about morale because it shows both the strain and the determination.", explanation: "Both sources evaluated with own knowledge for the top level." }),
    ],
    explanation: "Practice source-based question (14 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge effectiveness in more than one way and use both Malaya and France."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Allied bombing of German cities between 1943 and 1945.", points: [
        "RAF area bombing at night under Harris; US daylight raids on factories and transport.",
        "Hamburg firestorm (July-August 1943) killed tens of thousands.",
        "Raids on Berlin and other cities; Dresden (February 1945).",
        "Estimates of German civilian deaths range from about 350,000 to over half a million.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How effective were resistance movements in Europe and the Asia-Pacific? Explain your answer with reference to France and Malaya.", points: [
        ["France effective: intelligence, escape lines, sabotage before D-Day; Paris rising.", 2],
        ["France effective: restored self-respect; political role after liberation.", 2],
        ["France limited: small until 1943; divided; reprisals (Oradour); liberation by Allied armies.", 2],
        ["Malaya: MPAJA intelligence and sabotage, helped by Force 136.", 2],
        ["Malaya limited: little military effect; Japan surrendered before invasion; later political importance.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Resistance in France became effective in 1944. Intelligence gathered by resistance networks helped the Allies plan D-Day, escape lines returned airmen to Britain, and in June 1944 sabotage of railways and telephone lines delayed German reinforcements to Normandy. In August 1944 the Paris rising helped liberate the capital, and the resistance gave the French self-respect and a role in rebuilding France. However, it was small and divided until 1943, it could not defeat the Germans by itself, and reprisals such as the massacre at Oradour-sur-Glane caused terrible suffering.\n\nIn Malaya the MPAJA, mainly Chinese and led by communists, gathered intelligence and carried out sabotage from jungle bases, and from 1943 it was supplied by Force 136. But its military effect on the Japanese was limited, and Japan surrendered before the planned Allied invasion. Its greatest importance was political, since many of its members later led the insurgency of 1948.\n\nOverall, resistance movements were effective mainly as a support to Allied armies and in shaping post-war politics; they did not defeat the occupiers on their own. The French Resistance had the greater military impact because it was linked directly to the D-Day landings.", explanation: "Both case studies, both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Area bombing", "Bombing a whole urban area to destroy industry, housing and morale, used by RAF Bomber Command from 1942.");
  b.card("DEFINITION", "Collaboration", "Working with an occupying enemy, for example in its administration or police.");
  b.card("FACT", "When was the Blitz, and about how many British civilians died?", "September 1940-May 1941; about 40,000 or more.");
  b.card("FACT", "What was the Sook Ching?", "The Japanese purge of Chinese men in Singapore in February-March 1942; estimates range from several thousand to tens of thousands killed.");
  b.card("FACT", "What was the MPAJA?", "The Malayan People's Anti-Japanese Army (from 1942), mainly Chinese and communist-led, supported by Force 136.");
  b.card("FACT", "When was Hamburg devastated by a firestorm?", "July-August 1943.");
  b.card("FACT", "Who was Jean Moulin?", "De Gaulle's envoy who united the French Resistance in the National Council of the Resistance (May 1943); arrested June 1943.");
  b.card("CONCEPT", "How effective was the bombing of Germany?", "It diverted German resources and wrecked oil and transport in 1944-45, but production rose until late 1944 and morale did not break.");
  b.card("CONCEPT", "How effective was the French Resistance?", "Most effective in 1944 (intelligence and sabotage for D-Day, Paris rising); limited before 1943 and dependent on Allied armies.");
});
