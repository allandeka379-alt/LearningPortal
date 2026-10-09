// Slice W4a: life in Nazi Germany: economy, women and young people (0470 Depth study B, key question 3b).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.germany.life-nazi", { file: "germany/life-nazi", keyPrefix: "germany.life-nazi" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organisation replaced the trade unions in Nazi Germany in 1933?",
    options: [
      ["The German Labour Front", "Correct: led by Robert Ley."],
      ["The Reich Chamber of Culture", "This controlled artists, writers and musicians."],
      ["The League of German Maidens", "This was the Nazi organisation for girls."],
      ["The Reich Food Estate for farmers and food producers", "This organised agriculture."],
    ],
    answer: "A",
    explanation: "The **German Labour Front (DAF)** replaced the unions in May 1933.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the aim of Göring's Four-Year Plan of 1936?",
    options: [
      ["Self-sufficiency and readiness for war", "Correct: autarky and rearmament."],
      ["To pay off all of Germany's reparations within four years", "Reparations had effectively ended in 1932, and Hitler refused to pay."],
      ["To build a car for every family in four years", "This was the promise of the Volkswagen scheme."],
      ["To return Germany's economy to free trade with Britain and the USA", "It aimed to reduce dependence on imports."],
    ],
    answer: "A",
    explanation: "The **Four-Year Plan** aimed at **autarky** and rearmament, ready for war by 1940.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What did Strength Through Joy (KdF) provide for German workers?",
    options: [
      ["Cheap holidays, cruises and leisure activities", "Correct: to keep workers loyal and productive."],
      ["Higher wages negotiated by elected union leaders", "Unions were abolished and wages frozen."],
      ["The right to strike for shorter hours", "Strikes were illegal."],
      ["Free cars delivered to every worker who joined", "No Volkswagen was delivered to a saver."],
    ],
    answer: "A",
    explanation: "**Strength Through Joy** offered cheap leisure in return for loyalty.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the Nazi marriage loan scheme encourage large families?",
    options: [
      ["Part of the loan was cancelled for each child", "Correct: a quarter for each birth."],
      ["Couples with no children received the largest loans", "The scheme rewarded births."],
      ["The loan was paid only to couples who both had jobs", "It was meant to take wives out of work."],
      ["Families with four children paid no taxes at all for life", "This was not part of the scheme."],
    ],
    answer: "A",
    explanation: "Each child born **cancelled part of the loan**, encouraging couples to have children.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did official unemployment figures in Nazi Germany exaggerate the fall in unemployment?",
    options: [
      ["Women and Jews pushed out of jobs were not counted", "Correct: nor were men in the Labour Service or army."],
      ["The figures included everyone who had emigrated", "Emigrants were not counted as unemployed."],
      ["Unemployment was counted only in Berlin", "The figures covered the whole country."],
      ["Foreign forced labourers were counted as Germans", "Forced labour came mainly during the war."],
    ],
    hints: ["Who disappeared from the statistics without finding paid work?"],
    answer: "A",
    explanation: "'**Invisible unemployment**': women, Jews and men in the Labour Service or army were left out.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which group of young people rejected Nazi culture by listening to American jazz?",
    options: [
      ["The Swing Youth", "Correct: mostly middle-class teenagers in big cities."],
      ["The Edelweiss Pirates", "They were mostly working-class hikers who clashed with patrols."],
      ["The League of German Maidens", "This was the official Nazi organisation for girls."],
      ["The German Young People, the junior Hitler Youth", "This was the official group for boys aged 10-14."],
    ],
    hints: ["Their name came from a style of music."],
    answer: "A",
    explanation: "The **Swing Youth** loved banned jazz and swing music.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did Nazi policy towards women change after 1937?",
    options: [
      ["Rearmament caused a shortage of workers", "Correct: women were needed in factories."],
      ["The birth rate had risen far above the Nazis' target", "This was not the reason."],
      ["Women had won the right to stand in Reichstag elections", "Nazi Germany had no free elections."],
      ["The churches demanded that women be given equal pay", "No such demand changed policy."],
    ],
    hints: ["Think about what the Four-Year Plan needed."],
    answer: "A",
    explanation: "**Labour shortages** caused by rearmament forced the regime to bring women back into work.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that German workers did NOT benefit much from Nazi rule?",
    options: [
      ["Wages were frozen while working hours rose", "Correct: living standards rose little."],
      ["Unemployment fell to a few hundred thousand by 1939", "This suggests workers benefited."],
      ["Strength Through Joy offered cheap holidays", "This suggests some benefit."],
      ["Workplaces gained canteens and washrooms", "This was the Beauty of Labour campaign."],
    ],
    hints: ["Look for evidence about pay and conditions."],
    answer: "A",
    explanation: "Frozen **wages** and longer **hours** meant that work did not always bring better living standards.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Membership of the Hitler Youth became compulsory in 1939.",
    answer: true,
    explanation: "True. The 1936 law made it the state youth organisation, and in 1939 membership became compulsory.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Workers who saved in the Volkswagen scheme received their cars before the war began.",
    answer: false,
    explanation: "False. No saver received a car: the factory turned to military production when war began.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Hjalmar Schacht", "Economics Minister, 1934-37"],
      ["Robert Ley", "Leader of the German Labour Front"],
      ["Baldur von Schirach", "Leader of the Hitler Youth"],
      ["Albert Speer", "Minister of Armaments from 1942"],
    ],
    explanation: "Schacht (economy), Ley (Labour Front), von Schirach (Hitler Youth), Speer (armaments).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Hitler Youth membership made compulsory",
      "Four-Year Plan begins",
      "Goebbels declares 'total war'",
      "Marriage loans introduced",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["Total war came after the defeat at Stalingrad."],
    explanation: "Marriage loans (1933); Four-Year Plan (1936); Hitler Youth compulsory (1939); total war (1943).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Nazi organisation for girls aged 14 to 18 was the {{blank:a}}. Mothers of eight or more children could receive a {{blank:b}} Mother's Cross.",
    blanks: [
      { id: "a", accepted: ["League of German Maidens"], choices: ["League of German Maidens", "German Young People", "Swing Youth", "Labour Front"] },
      { id: "b", accepted: ["gold"], choices: ["gold", "bronze", "silver", "iron"] },
    ],
    explanation: "Girls joined the **League of German Maidens**; the **gold** Mother's Cross was for eight or more children (silver six, bronze four).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes the Nazi aim of economic self-sufficiency?",
    accepted: ["autarky", "autarchy", "autarkie"],
    wrong: ["rearmament"],
    explanation: "**Autarky** means producing everything the country needs without imports.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe Nazi policies towards women before 1937.",
    points: [
      "Women encouraged to be wives and mothers ('children, kitchen, church').",
      "Marriage loans (1933) with part cancelled for each child.",
      "Women removed from many professions (civil service, medicine, law).",
      "Encouraged to dress simply / not smoke or wear make-up; Mother's Cross (1938) rewarded large families.",
    ],
    modelAnswer: "The Nazis believed women should be wives and mothers, devoted to children, kitchen and church. From 1933 newly married couples could receive a marriage loan, part of which was cancelled for each child born. Women were pushed out of senior jobs in the civil service, medicine and the law. They were encouraged to dress simply and to avoid make-up and smoking, and large families were honoured, later with the Mother's Cross.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Nazis put so much effort into controlling young people.",
    points: [
      "Identifies securing the future of the regime / loyalty.",
      "Explains that children brought up with Nazi ideas would become loyal adults, so the regime would last.",
      "Identifies preparation for war / motherhood.",
      "Explains that boys were trained to be soldiers and girls to be mothers of the next generation.",
    ],
    hints: ["Think about what the Nazis needed in the future."],
    modelAnswer: "The Nazis believed that the future of their regime depended on the young: children who grew up with Nazi ideas in school and the Hitler Youth would become loyal adults, and they might even report on parents who were not. Young people were also prepared for the Nazis' aims: boys were trained in military skills to become soldiers, and girls were prepared to become mothers of large families.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the coming of war changed life in Germany.",
    points: [
      "Identifies rationing and shortages.",
      "Explains that food and clothing were rationed from 1939 and shortages worsened as the war went on.",
      "Identifies total war / changes to work.",
      "Explains that after Stalingrad non-essential businesses closed, women registered for work and millions of foreign forced labourers were used.",
      "Identifies bombing and its effects.",
      "Explains that Allied bombing destroyed cities and homes, killing many civilians and creating refugees.",
    ],
    hints: ["Food, work and safety."],
    modelAnswer: "Rationing of food and clothing began in 1939, and shortages became worse as the war went on. After the defeat at Stalingrad in 1943, Goebbels declared total war: businesses not needed for the war were closed, women aged 17 to 45 had to register for work, and millions of foreign forced labourers worked in German factories and farms, while Speer increased weapons production. From 1943 Allied bombing destroyed homes in cities such as Hamburg, killing many civilians and making millions homeless.",
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter by a fictional factory worker in Essen to his brother in America, 1937", "I have had work for three years now, after four years on the dole, and for that I am grateful. But the Labour Front takes its contribution, the hours get longer and the pay stays the same. Butter is hard to find and dear. Last summer we had a week by the sea with Strength Through Joy, which we could never have afforded before.")}\n\n${source("Source B", "an article in a fictional Nazi-controlled newspaper, 1938", "Five years ago six million Germans stood idle in the streets. Today the factories cannot find enough hands. The worker who once despaired now sails to Norway with his comrades, and every family can look forward to its own people's car. This is the achievement of the Führer.")}`,
    hints: ["Compare the purpose of a private letter and a controlled newspaper."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the benefits of Nazi rule for workers?", points: [
        "He has a job after years of unemployment / a cheap holiday through KdF.",
        "But hours are longer, pay is frozen and food is scarce and expensive.",
      ], explanation: "One benefit and one limitation." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B agree with Source A?", points: [
        "Agree: unemployment has gone / workers have jobs.",
        "Agree: workers enjoy KdF holidays.",
        "Disagree: B says nothing about longer hours, frozen pay or food shortages.",
        "Disagree: B promises cars for every family; A gives no such picture (and no car was delivered).",
      ], explanation: "Agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which source is more reliable as evidence of workers' lives in Nazi Germany? Use the sources and your own knowledge.", points: [
        "B: Nazi-controlled newspaper; purpose to praise Hitler; propaganda.",
        "B: some claims accurate (fall in unemployment, KdF cruises), but the Volkswagen promise was never kept.",
        "A: private letter to a brother abroad, little reason to praise the regime; mentions good and bad.",
        "A: content matches own knowledge (wage freeze, longer hours, shortages caused by rearmament).",
        "A is one worker's experience; may not be typical.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is more reliable. It is a private letter to a brother in America, so the worker has little reason to praise the regime and gives both sides: he is grateful for work and his holiday but complains about longer hours, frozen pay and scarce butter. My own knowledge confirms these points: wages were frozen, hours rose and rearmament caused food shortages. It is only one worker's experience, but it is balanced. Source B is propaganda from a Nazi-controlled newspaper, written to praise the Führer. Some of its claims are accurate, since unemployment did fall and Strength Through Joy did run cruises, but it hides every problem, and its promise of a car for every family was never kept. Source A is therefore the more trustworthy guide.", explanation: "Reliability from provenance and content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge success against the Nazis' own aims."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the activities of the Hitler Youth.", points: [
        "Camping, hiking and sport.",
        "Marching, drill and military-style training (e.g. shooting) for boys.",
        "Learning Nazi ideas and loyalty to Hitler.",
        "Girls in the League of German Maidens prepared for motherhood and domestic work.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How successful were Nazi policies towards young people?", points: [
        ["Successful: membership grew to millions; compulsory from 1939; many enjoyed activities", 2],
        ["Successful: schools and teachers controlled; generation trained as soldiers and loyal to Hitler", 2],
        ["Unsuccessful: boredom and falling attendance; non-conformist groups (Swing Youth, Edelweiss Pirates)", 2],
        ["Unsuccessful: some active resistance (White Rose students); family and church influence remained", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "In many ways the policies succeeded. Hitler Youth membership grew from about two million in 1933 to millions more by the late 1930s, and in 1939 it became compulsory. Many young people enjoyed the camping, sport and sense of belonging. Schools were controlled through the Nazi Teachers' League and a new curriculum, and a generation of boys was trained in military skills and loyalty to Hitler, many of whom fought fanatically in the war.\n\nHowever, the success had limits. Many young people found the drill boring, and attendance fell in the late 1930s. Groups such as the Swing Youth and the Edelweiss Pirates rejected Nazi culture openly, and in the war some Edelweiss Pirates helped deserters. A few, like the White Rose students, actively resisted. Families and churches also kept some influence.\n\nOverall the policies were largely successful in winning or controlling most young people, but they never achieved the total commitment the Nazis wanted, and opposition grew as the war turned against Germany.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Autarky", "Economic self-sufficiency, the aim of Göring's Four-Year Plan (1936).");
  b.card("DEFINITION", "German Labour Front (DAF)", "The Nazi organisation led by Robert Ley that replaced the trade unions in 1933.");
  b.card("DEFINITION", "Strength Through Joy (KdF)", "Labour Front scheme offering workers cheap holidays, cruises and leisure.");
  b.card("FACT", "What was the Volkswagen scheme?", "Workers paid weekly instalments for a 'people's car'; none was delivered to a saver.");
  b.card("FACT", "How did marriage loans work?", "Newly married couples borrowed money; part was cancelled for each child born.");
  b.card("FACT", "What was the Mother's Cross?", "A medal from 1938 for mothers of large families (bronze, silver and gold).");
  b.card("FACT", "When did Hitler Youth membership become compulsory?", "1939 (the 1936 law made it the state youth organisation).");
  b.card("FACT", "Who were the Edelweiss Pirates?", "Working-class young people who rejected the Hitler Youth; some helped deserters in the war.");
  b.card("CONCEPT", "Why did unemployment fall so sharply after 1933?", "Public works, the Labour Service, conscription, rearmament, and leaving women and Jews out of the figures.");
  b.card("CONCEPT", "Why did Nazi policy on women change?", "From 1937 rearmament caused labour shortages, so women were needed in work.");
});
