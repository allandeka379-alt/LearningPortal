// Slice W3b: Allied victory in Europe, 1943-1945 (Cambridge Depth study E, KQ4).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["July 1943", "Allied landings in Sicily"],
  ["June 1944", "D-Day landings in Normandy"],
  ["December 1944", "German offensive in the Ardennes (Battle of the Bulge)"],
  ["April 1945", "US and Soviet troops meet on the River Elbe"],
]);

concept("hist.ww2.victory-europe", { file: "ww2/victory-europe", keyPrefix: "ww2.victory-europe" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did the D-Day landings take place?",
    options: [
      ["6 June 1944", "Correct: Allied troops landed on five beaches in Normandy."],
      ["4 June 1944", "4 June 1944 is when Rome was liberated."],
      ["10 July 1943", "10 July 1943 is when the Allies landed in Sicily."],
      ["25 August 1944", "25 August 1944 is when Paris was liberated."],
    ],
    answer: "A",
    explanation: "**D-Day**, the start of Operation Overlord, was 6 June 1944.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the supreme commander of the Allied forces for the D-Day landings?",
    options: [
      ["Dwight Eisenhower", "Correct: he was the Supreme Allied Commander in western Europe."],
      ["Erwin Rommel", "Rommel commanded German forces defending the coast."],
      ["Georgy Zhukov", "Zhukov was a leading Soviet commander."],
      ["Douglas MacArthur", "MacArthur commanded in the South West Pacific."],
    ],
    answer: "A",
    explanation: "**Eisenhower** led the invasion; Montgomery commanded the land forces in the first stage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the aim of Operation Fortitude before D-Day?",
    options: [
      ["To make Germany expect the main attack at the Pas-de-Calais", "Correct: fake armies and false radio traffic held German forces there."],
      ["To bomb Berlin into surrender before any landings took place", "Fortitude was a deception plan, not a bombing campaign."],
      ["To land troops in Sicily", "The Sicily landings were in July 1943."],
      ["To evacuate British troops from France", "That was Dunkirk in 1940."],
    ],
    answer: "A",
    explanation: "**Fortitude** used dummy equipment and invented units to persuade Hitler that Normandy was a feint.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happened to Mussolini in July 1943?",
    options: [
      ["He was voted down by the Fascist Grand Council and arrested", "Correct: the King dismissed him after the Allied landings in Sicily."],
      ["He was killed by Allied bombing in Rome", "He was arrested in 1943 and killed by Italian partisans in April 1945."],
      ["He fled to Spain and stayed there until the end of the war", "He did not flee to Spain; Germans rescued him in September 1943."],
      ["He signed Italy's surrender to the Allies", "Italy's surrender was made by the new government in September."],
    ],
    answer: "A",
    explanation: "Mussolini was overthrown on **25 July 1943**; German troops later rescued him and set up a puppet state in the north.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why was the Allied advance through Italy so slow?",
    options: [
      ["Mountains and rivers gave the Germans strong defensive lines", "Correct: for example the Gustav Line at Monte Cassino."],
      ["The whole Italian army fought on alongside Germany until 1945", "Italy surrendered in September 1943; most of its army stopped fighting."],
      ["The Allies had no aircraft in the Mediterranean", "The Allies had strong air forces in the Mediterranean."],
      ["Hitler moved all German troops out of Italy", "Germany occupied most of Italy and defended it."],
    ],
    answer: "A",
    explanation: "Italy's **geography** favoured defenders, and skilled German forces held line after line.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the German response to the D-Day landings come slowly?",
    options: [
      ["Hitler kept control of key tank reserves and expected another attack", "Correct: deception and divided command delayed the reaction."],
      ["Germany had no tanks in France in June 1944", "There were several panzer divisions in France."],
      ["German commanders had already surrendered", "Germany fought hard in Normandy for weeks."],
      ["The Atlantic Wall defences had been dismantled by Rommel in 1943", "The Atlantic Wall was being strengthened under Rommel."],
    ],
    answer: "A",
    hints: ["Think about deception and about who controlled the reserves."],
    explanation: "Disputes between Rommel and other commanders, **Hitler's control of reserves** and the belief that the main attack would come at Calais all slowed the German response.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which front saw most of the German army's losses during the war?",
    options: [
      ["The Eastern Front against the USSR", "Correct: most German military deaths occurred in the east."],
      ["The Western Front in France after D-Day", "Losses in the west were heavy but smaller than in the east."],
      ["The Italian campaign", "Italy tied down German divisions but saw smaller losses."],
      ["North Africa", "The North African campaign involved much smaller forces."],
    ],
    answer: "A",
    hints: ["Which ally faced the largest part of the German army?"],
    explanation: "The **Red Army** fought the largest part of the German army from 1941 to 1945.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the Italian campaign was important to Allied victory?",
    options: [
      ["It tied down many German divisions that could have fought elsewhere", "Correct: Germany had to defend Italy with large forces."],
      ["It took eleven months to reach Rome from Sicily", "This suggests slow progress, which supports the opposite view."],
      ["The Anzio landing of January 1944 failed to break the deadlock quickly", "This shows the campaign's difficulties."],
      ["Heavy casualties were suffered at Monte Cassino", "This shows the campaign's cost."],
    ],
    answer: "A",
    hints: ["Choose a positive effect on the wider war."],
    explanation: "By forcing Germany to send and keep many divisions in Italy, the campaign stretched German resources before and after D-Day.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Paris was liberated in August 1944.",
    answer: true,
    explanation: "True. Paris was liberated on 25 August 1944, after the breakout from Normandy and a rising in the city.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When Italy surrendered in September 1943, all fighting in Italy came to an end.",
    answer: false,
    explanation: "False. German forces occupied most of Italy and fought on until they surrendered at the beginning of May 1945.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each D-Day beach with the country whose forces landed there.",
    pairs: [
      ["Omaha", "USA"],
      ["Juno", "Canada"],
      ["Gold", "Britain"],
    ],
    explanation: "Utah and Omaha were American, Gold and Sword British, and Juno Canadian.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[3][1], order.events[0][1], order.events[2][1], order.events[1][1]],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["Hitler's last offensive in the west came six months after D-Day."],
    explanation: "Sicily July 1943; D-Day June 1944; Battle of the Bulge December 1944; the Elbe April 1945.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Soviet offensive of June 1944 that destroyed German Army Group Centre was Operation {{blank:a}}. The Italian monastery hill captured by Polish troops in May 1944 was Monte {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Bagration"], choices: ["Bagration", "Barbarossa", "Overlord", "Uranus"] },
      { id: "b", accepted: ["Cassino"], choices: ["Cassino", "Carlo", "Rosa", "Bianco"] },
    ],
    explanation: "**Bagration** carried the Red Army into Poland; **Monte Cassino** anchored the Gustav Line.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the river on which American and Soviet troops met on 25 April 1945.",
    accepted: ["Elbe", "the Elbe", "River Elbe", "the River Elbe", "Elbe River"],
    wrong: ["Rhine"],
    explanation: "They met at Torgau on the **Elbe**, cutting Germany in two.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the D-Day landings of 6 June 1944.",
    points: [
      "Allied invasion of Normandy (Operation Overlord) under Eisenhower.",
      "Airborne troops landed behind the beaches overnight.",
      "About 156,000 troops landed on five beaches: Utah, Omaha, Gold, Juno, Sword.",
      "Heavy losses at Omaha; beachheads secured and linked up in the following days.",
    ],
    modelAnswer: "On 6 June 1944 the Allies, under Eisenhower, invaded Normandy in Operation Overlord. Airborne troops landed overnight behind the beaches, and at dawn about 156,000 troops came ashore on five beaches: Utah and Omaha (American), Gold and Sword (British) and Juno (Canadian). The Americans suffered heavy losses at Omaha, but by the end of the day all the beachheads were established and they were linked up over the following days.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Nazi Germany was on the point of collapse by April 1945.",
    points: [
      "Identifies the war on several fronts / Soviet strength.",
      "Explains that the Red Army, with huge numbers of men and tanks, destroyed German armies and reached Berlin.",
      "Identifies the bombing of oil and transport.",
      "Explains that fuel shortages grounded aircraft and immobilised tanks, and railways were wrecked.",
      "Identifies Hitler's leadership / loss of manpower.",
      "Explains that 'no retreat' orders lost whole armies, reserves were wasted in the Ardennes, and boys and old men had to be called up.",
    ],
    hints: ["Think about the fronts, the bombing and Hitler's decisions."],
    modelAnswer: "Germany was fighting on three fronts against enemies with far greater resources. In the east the Red Army, with huge numbers of men and tanks, destroyed Army Group Centre in 1944 and by April 1945 was attacking Berlin, while the Western Allies crossed the Rhine. Allied bombing of oil plants and railways from 1944 meant German aircraft and tanks lacked fuel and supplies could not be moved. Hitler's orders never to retreat cost Germany whole armies, he wasted his last reserves in the Ardennes offensive, and by 1945 boys and old men were being called up into the Volkssturm.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two reasons why the D-Day landings succeeded.",
    points: [
      "Identifies deception (Operation Fortitude).",
      "Explains that Germany kept strong forces at the Pas-de-Calais, expecting the real attack there.",
      "Identifies air superiority / planning and resources.",
      "Explains that Allied aircraft protected the landings and destroyed bridges and railways, slowing German reinforcements; Mulberry harbours allowed supplies to land.",
    ],
    hints: ["Think about what the Germans believed, and about control of the air."],
    modelAnswer: "First, Operation Fortitude convinced Hitler that the main invasion would come at the Pas-de-Calais, so strong German forces stayed there for weeks instead of moving to Normandy. Second, the Allies had control of the air: their aircraft protected the beaches and bombed bridges and railways, so German reinforcements arrived slowly, while the Mulberry harbours let huge supplies be landed.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter from a fictional Canadian soldier to his family, written a week after landing in Normandy in June 1944", "We came in on the second wave. The beach was a mess of wrecked craft and wire, but the first lot had cleared a way and we got off quickly. Since then it's been hedges and orchards, and every field has a German machine gun in it somewhere. Our planes are overhead all day and we hardly ever see theirs. Don't worry about me.")}\n\n${source("Source B", "a report by a fictional German divisional commander to his superiors, mid-June 1944", "Movement by day is impossible: enemy fighter-bombers attack every vehicle on the roads. Our reinforcements arrive late and in fragments because bridges and rail lines have been destroyed. Requests to release the armoured reserve have not been answered. We are told the main landing is still to come further north.")}`,
    hints: ["In (c), compare the writers' positions and purposes."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about the fighting in Normandy after D-Day?", points: [
        "Fighting in hedgerow country was slow and dangerous (machine guns in every field).",
        "The Allies controlled the air.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the reasons for Allied success in Normandy?", points: [
        "Agree: Allied air superiority (planes overhead; fighter-bombers attack vehicles).",
        "B adds: bridges and railways destroyed, slowing reinforcements.",
        "B adds: reserves held back / deception about another landing.",
        "A suggests the Germans still resisted strongly; B suggests German weakness.",
      ], explanation: "Specific comparison." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How reliable is Source B as evidence about why the Allies succeeded in Normandy? Use the sources and your own knowledge.", points: [
        "Written by a German commander at the time for his superiors; needed to report accurately.",
        "Possible motive to excuse failure by blaming air attacks and the high command.",
        "Content matches own knowledge: air superiority, bombing of transport.",
        "Content matches own knowledge: Hitler's control of reserves; Fortitude made Germans expect a second landing at the Pas-de-Calais.",
        "Supported by Source A on air power.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B was written at the time by a German commander for his superiors, so he needed to report the situation accurately if he was to get help. He might also have wanted to excuse his division's failure by blaming air attacks and the high command. However, its content matches my own knowledge: Allied fighter-bombers controlled the skies, bombing had destroyed bridges and railways, Hitler kept control of the armoured reserves, and Operation Fortitude made the Germans believe the main landing would come at the Pas-de-Calais. Source A, written by an Allied soldier, also mentions the Allied control of the air. Source B is therefore a reliable source on why German reinforcements were slow, though it leaves out Allied planning, supplies and numbers.", explanation: "Provenance and content tested against own knowledge." }),
    ],
    explanation: "Practice source-based question (12 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the Red Army with D-Day, Italy, bombing and American production."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Soviet advance from the east between 1943 and 1945.", points: [
        "German offensive at Kursk failed (July 1943); the Red Army advanced.",
        "Operation Bagration (June 1944) destroyed Army Group Centre and reached Poland.",
        "Romania and Bulgaria changed sides (August-September 1944).",
        "January 1945 offensive to the Oder; assault on Berlin from 16 April 1945.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The Red Army was the main reason for the defeat of Nazi Germany.\" How far do you agree?", points: [
        ["Red Army: fought most of the German army; most German military deaths in the east.", 2],
        ["Red Army: Stalingrad, Kursk, Bagration; captured Berlin.", 2],
        ["Other: D-Day and the second front; western advance to the Rhine and the Elbe.", 2],
        ["Other: bombing of oil and transport; Italy tied down divisions.", 2],
        ["Other: American production and Lend-Lease supplied all the Allies; Hitler's mistakes.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The Red Army has the strongest claim. From 1941 to 1945 it fought the largest part of the German army, and most German military deaths occurred on the Eastern Front. It won the turning-point battles of Stalingrad and Kursk, destroyed Army Group Centre in Operation Bagration in 1944, and captured Berlin in 1945.\n\nHowever, it did not win alone. D-Day opened a second front that forced Germany to divide its forces, and the Western Allies advanced from Normandy to the Rhine and the Elbe. Bombing of oil plants and railways crippled German movement, and the Italian campaign tied down German divisions. American production supplied Britain and, through Lend-Lease, the USSR with trucks, food and equipment. Hitler's own mistakes, such as his no-retreat orders and the Ardennes offensive, also hastened defeat.\n\nI largely agree. The Red Army did most of the fighting and killing of German soldiers, so it was the main reason, but its victory was made easier by the second front, bombing and American resources, and Germany's defeat was the result of the whole alliance.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Second front", "An Allied invasion of western Europe forcing Germany to fight on two major fronts; it came with D-Day in 1944.");
  b.card("DEFINITION", "Unconditional surrender", "Surrender without any agreed terms, demanded by the Allies from January 1943.");
  b.card("FACT", "When did the Allies land in Sicily?", "10 July 1943.");
  b.card("FACT", "When was Rome liberated?", "4 June 1944, two days before D-Day.");
  b.card("FACT", "Name the five D-Day beaches and who landed on them.", "Utah and Omaha (USA), Gold and Sword (Britain), Juno (Canada).");
  b.card("FACT", "What was Operation Bagration?", "The Soviet offensive of June 1944 that destroyed German Army Group Centre.");
  b.card("FACT", "When did Germany surrender?", "Signed at Reims on 7 May 1945, effective 8 May (VE Day); the USSR marks 9 May.");
  b.card("CONCEPT", "Why did D-Day succeed?", "Planning and resources, deception (Fortitude), air superiority, German divisions over reserves, and resistance sabotage.");
  b.card("CONCEPT", "How important was the Italian campaign?", "It knocked Italy out and tied down German divisions, but it was slow and costly; the decisive blows came in France and the east.");
});
