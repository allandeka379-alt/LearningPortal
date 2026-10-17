// W4a: ahist.nazi.economy (ZIMSEC topic 17; Cambridge Paper 4 Hitler 3.3).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.nazi.economy", { file: "nazi/economy", keyPrefix: "nazi.economy" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Who was President of the Reichsbank from 1933 and Minister of Economics from 1934?",
    ok: ["Hjalmar Schacht", "Correct: he financed public works and rearmament."],
    no: [
      ["Robert Ley", "Ley led the German Labour Front."],
      ["Walther Darré", "Darré headed the Reich Food Estate for farming."],
      ["Fritz Todt", "Todt directed the building of the autobahns."],
    ],
    explanation: "Schacht, a banker who was not a Nazi by origin, ran Germany's finances until his resignation in 1937.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the German Labour Front (DAF) replace in 1933?",
    ok: ["The free trade unions, which were abolished", "Correct: the unions were banned on 2 May 1933."],
    no: [
      ["The Reichsbank, which was closed by the new government", "The Reichsbank remained under Schacht."],
      ["The employers' associations that had set prices", "Employers' bodies were controlled but not abolished."],
      ["The farming cooperatives that had supplied the towns", "Farmers were organised in the Reich Food Estate."],
    ],
    explanation: "The DAF under Robert Ley replaced the unions. It could not bargain for wages or strike, and it ran the Strength through Joy programme.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the purpose of the Mefo bills?",
    ok: ["To pay for rearmament without showing the cost in the open budget", "Correct: they were a way of hiding military spending."],
    no: [
      ["To pay the reparations that Germany owed under the Treaty of Versailles", "Reparations were effectively ended by 1932."],
      ["To fund wages for the workers on the autobahns", "Mefo bills were used to pay arms makers."],
      ["To replace the old currency after the inflation of 1923", "The currency had been replaced in 1923-24."],
    ],
    explanation: "Contractors were paid with bills guaranteed by a dummy company, so the cost did not appear in the budget. It was one form of deficit financing.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the main aim of the Four Year Plan of 1936?",
    ok: ["To make Germany self-sufficient and ready for war", "Correct: it aimed at autarky and rearmament."],
    no: [
      ["To restore free trade with Britain and the United States", "The plan moved away from free trade."],
      ["To pay off the national debt through higher taxes on industry", "The plan did not aim to repay debt; it increased spending."],
      ["To raise real wages for workers above their level of 1929", "Wages were not its aim."],
    ],
    hints: ["Hitler's memorandum said that the economy must be ready for war within four years."],
    explanation: "The plan, run by Göring, increased the production of synthetic oil and rubber, controlled prices and wages and prepared the economy for war.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Schacht resign as Minister of Economics in 1937?",
    ok: ["He feared that rapid rearmament would damage the economy", "Correct: he disagreed with Göring and Hitler's pace."],
    no: [
      ["He had been found guilty of plotting against Hitler in the army", "He was not arrested until after the plot of 1944."],
      ["He wished the Labour Front to take over the Reichsbank", "He had no such wish."],
      ["He thought that the autobahns should be paid for by the unions", "That was not an issue in his dispute."],
    ],
    hints: ["Think of the Four Year Plan and the cost of arms."],
    explanation: "Schacht preferred a more cautious policy of trade and limited rearmament. After the Four Year Plan gave Göring control, he resigned in November 1937.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which Nazi organisation arranged cheap holidays, cruises and leisure activities for workers?",
    ok: ["Strength through Joy, a branch of the Labour Front", "Correct: its KdF programmes offered cheap leisure."],
    no: [
      ["The Reich Labour Service, for young men's work camps", "The RAD organised work, not holidays."],
      ["The Reich Food Estate, which organised all farmers", "It controlled farm prices."],
      ["The Hitler Youth, for boys aged between ten and eighteen", "It was a youth organisation."],
    ],
    hints: ["The German abbreviation is KdF."],
    explanation: "Strength through Joy (Kraft durch Freude) provided cheap trips and entertainment to win workers' loyalty and make up for the loss of unions.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which fact most weakens the claim that unemployment fell to near zero by 1939 because the economy became healthy?",
    ok: ["Official figures left out women, Jews and men in the labour service", "Correct: the statistics hid some of the unemployed."],
    no: [
      ["Industrial output rose during the late 1930s under rearmament", "This shows recovery rather than weakening the claim."],
      ["Schacht's New Plan controlled imports from September 1934", "This describes a policy but not a flaw in the figures."],
      ["The autobahn programme began in September 1933 under Todt", "This was one way of creating jobs."],
    ],
    hints: ["Think of who was not counted as unemployed."],
    explanation: "The figures omit Jews dismissed from work, women encouraged to leave jobs, men in the RAD and the army, and prisoners. The recovery was real, but it was exaggerated by the statistics and based on rearmament.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that Nazi economic policy was designed mainly for war?",
    ok: ["The Four Year Plan, aiming at self-sufficiency and arms", "Correct: its aims were military."],
    no: [
      ["The Strength through Joy holidays offered to German workers", "Holidays were a consumer benefit."],
      ["The Reich Entailed Farm Law, which protected family farms", "It concerned the peasantry, not war."],
      ["The abolition of trade unions in May 1933", "This controlled labour but does not show a war aim."],
    ],
    hints: ["Which policy had military aims stated in its own plan?"],
    explanation: "Hitler's 1936 memorandum said that the economy must be ready for war within four years. The Four Year Plan then directed resources into arms and substitutes for imports.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Reich Labour Service made young men do manual work, and from 1935 it was compulsory for six months.",
    answer: true,
    explanation: "True. The RAD built roads and drained land, and it also gave young men military-style training.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Real hourly wages of German workers rose far above their 1929 level between 1933 and 1939.",
    answer: false,
    explanation: "False. Wage rates were frozen and real hourly wages stayed close to or below the level of 1929; take-home pay rose mainly because of longer hours and overtime.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Volkswagen savings scheme gave each saver a car before the war began.",
    answer: false,
    hints: ["Think of what the factory produced once war began."],
    explanation: "False. Workers paid in weekly sums, but the factory turned to military vehicles and the savers received no cars.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his economic role.",
    pairs: [
      ["Hjalmar Schacht", "Banker who financed public works and wrote the New Plan"],
      ["Hermann Göring", "Head of the Four Year Plan of 1936"],
      ["Robert Ley", "Leader of the German Labour Front"],
      ["Walther Darré", "Minister who led the Reich Food Estate"],
    ],
    explanation: "Schacht (finance and the New Plan), Göring (Four Year Plan), Ley (the DAF) and Darré (farming).",
  });
  chrono(b, [
    "The autobahn programme begins",
    "Schacht's New Plan controls imports",
    "The Four Year Plan is announced",
    "Schacht resigns as Minister of Economics",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from 1933 to 1937."],
    explanation: "September 1933; September 1934; October 1936; November 1937.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The policy of making a country self-sufficient is called {{blank:a}}, and the choice between arms and consumer goods was summed up as 'guns or {{blank:b}}'.",
    blanks: [
      { id: "a", accepted: ["autarky"], choices: ["autarky", "appeasement", "inflation", "devaluation"] },
      { id: "b", accepted: ["butter"], choices: ["butter", "bread", "gold", "oil"] },
    ],
    explanation: "Autarky was the aim of the Four Year Plan; 'guns or butter' described the tension between arms and consumer goods.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Nazi leader who headed the Four Year Plan from 1936.",
    accepted: ["Hermann Göring", "Hermann Goering", "Göring", "Goering"],
    wrong: ["Hjalmar Schacht"],
    explanation: "**Hermann Göring** was given control of the plan in 1936; Schacht opposed him and resigned in 1937.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the Nazis tried to reduce unemployment between 1933 and 1936.",
    points: ["Public works such as roads, canals and the autobahns", "The Reich Labour Service, which employed young men and became compulsory in 1935", "Rearmament and the expansion of the armed forces, financed by deficit spending", "Conscription from 1935 and the removal of women and Jews from jobs, which reduced the register"],
    modelAnswer: "The Nazis spent on public works such as roads, canals and the autobahns. The Reich Labour Service employed young men and became compulsory in 1935. Rearmament and the growth of the forces were paid for by deficit spending. Conscription from 1935 and the removal of women and Jews from work also reduced the number on the register.",
    explanation: "One mark for each method described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the official unemployment figures of the 1930s overstate the success of Nazi policy.",
    points: [["Jews and political opponents who lost their jobs, and women encouraged to leave work, were not counted as unemployed", 2], ["Men in the Reich Labour Service and the army, and prisoners in the camps, were also not counted, and the recovery started in 1932 before the Nazis took power", 2]],
    hints: ["Think of who was missing from the statistics."],
    modelAnswer: "Jews and political opponents who were dismissed, and women encouraged to leave work, were not counted as unemployed. Men in the Labour Service and the army were not counted either, and the recovery of the world economy had begun in 1932, so not all of the fall was due to Nazi policy.",
    explanation: "Credit explained reasons, not a list of groups only.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how workers lost and gained under Nazi rule.",
    points: [["They lost their free trade unions, the right to bargain and strike, and the freedom to change jobs, and wage rates were frozen", 2], ["They gained jobs after the Depression and leisure benefits from Strength through Joy, though real hourly wages did not rise much", 2]],
    hints: ["Give one loss and one gain, each with an explanation."],
    modelAnswer: "Workers lost their free trade unions, the right to bargain and strike and the freedom to change jobs, and wage rates were frozen. They gained jobs after the Depression, and leisure benefits such as holidays from Strength through Joy, although real hourly wages did not rise much.",
    explanation: "Credit explained gains and losses.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an advertisement of a kind published in German newspapers in 1938, described in words",
        "A poster shows a smiling family standing beside a small round car in front of a green hill. Underneath it says that every worker can own this car by saving five marks a week, and that the Labour Front will arrange the payments.", { described: true }),
      "",
      source("Source B", "a letter written by a fictional factory worker in Nuremberg to his sister, 1939",
        "We work ten hours and sometimes more, and the pay packet is fatter than it was in the bad years, but the shops have less in them and the butter is dear. I joined the car savings scheme for the sake of my son, though the foreman says the factory is making lorries for the army and we shall see no car. Still, I have work, and a few years ago I had none."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source B suggest about living standards in 1939?", points: ["Pay is higher but hours are longer", "Goods are scarcer and food is expensive"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the Volkswagen scheme.", points: [["Agree: both refer to workers saving through the Labour Front scheme to buy a car", 2], ["Differ: A presents the car as certain and the family as happy, while B doubts that the cars will ever be delivered because the factory is making military vehicles", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the benefits of Nazi economic policy for workers?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful for what the regime wanted workers to believe, but it is an advertisement intended to persuade and says nothing about what actually happened to the savers", 2], ["B is useful as the private view of a worker who has work but fears shortages, but it is one man's letter and does not say how typical he is", 2], ["Own knowledge: the savers never received cars, hours were long and shortages grew as rearmament absorbed resources; together the sources show the gap between promise and reality", 2]], modelAnswer: "Source A is useful as evidence of the promises of the regime, since it shows how Strength through Joy and the Labour Front tried to win workers' loyalty, but as an advertisement it was meant to persuade and does not show what happened. Source B is useful because it is a private letter by a worker and shows long hours, shortages and doubt about the scheme, although it is one man's view. Both fit what is known: the factory built military vehicles and the savers never received cars, and guns were taking priority over butter. Together they show the gap between propaganda and experience, though neither tells us how many workers shared the writer's feelings." }),
    ],
    hints: ["For (c), consider the purpose of an advertisement and of a private letter."],
    explanation: "Both sources are invented: an advertisement described in words and a worker's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How successful were the economic policies of the Nazis between 1933 and 1939?",
    levels: levels(12),
    points: [
      ["Success: unemployment fell from about six million to under half a million through public works, the RAD and rearmament, and output rose", 3],
      ["Failures: autarky was not achieved, the economy depended on imports, and consumer goods and food were short (guns or butter)", 3],
      ["Costs and limits: wages stayed low, unions were abolished, the official figures hid unemployed groups, and recovery began in 1932", 3],
      ["Judgement that measures success against the regime's own aims of work, rearmament and self-sufficiency", 3],
    ],
    hints: ["Judge success against the regime's own aims."],
    modelAnswer: "The Nazi economy was successful in some aims but not in others. The most visible success was the reduction in unemployment from about six million in 1932 to under half a million in 1938, through public works, the Reich Labour Service, conscription and rearmament. Industrial output rose, and the regime could point to an end of the Depression. Yet the figures hid some groups and the recovery had begun in 1932. The policy of autarky failed: Germany still relied on imported oil and ore, and the Four Year Plan produced shortages. Workers lost their unions and received little real increase in hourly wages. By 1939 the economy was geared to war, and could be sustained only by conquest. I conclude that the policies succeeded in their narrow aims of full employment and arms, but failed to create a balanced or independent economy.",
    explanation: "Credit explained successes and failures and a judgement against the regime's aims.",
  });

  b.card("DEFINITION", "What was autarky?", "Economic self-sufficiency, the aim of the Four Year Plan so that Germany would not depend on imports in a war.");
  b.card("DEFINITION", "What was the German Labour Front?", "The organisation under Robert Ley that replaced the free trade unions in May 1933; it could not bargain or strike.");
  b.card("DEFINITION", "What was Strength through Joy?", "The Labour Front programme of cheap holidays, cruises and leisure to win workers' loyalty.");
  b.card("FACT", "What was Schacht's New Plan (1934)?", "A system of import controls and barter trade agreements to save foreign currency.");
  b.card("FACT", "When was the Four Year Plan announced and who ran it?", "October 1936, under Hermann Göring; its aims were autarky and readiness for war.");
  b.card("FACT", "Roughly how many Germans were unemployed in 1932 and 1938?", "About 5.6 million in 1932 (about six million at the peak) and about 0.4 million in 1938, by the official figures.");
  b.card("CONCEPT", "Why do official unemployment figures overstate Nazi success?", "They omit Jews and opponents dismissed, women pushed out of work, men in the RAD and army, and prisoners.");
  b.card("CONCEPT", "What did 'guns or butter' mean?", "The choice between spending on arms and on consumer goods; after 1936 arms took priority.");
  b.card("CONCEPT", "Why did the Nazi economy depend on war?", "Rearmament and borrowing could not be sustained without conquered resources; autarky had failed.");
});
