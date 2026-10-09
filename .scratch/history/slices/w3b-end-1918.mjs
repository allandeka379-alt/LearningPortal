// Slice W3b: why Germany asked for an armistice in 1918 (Cambridge Depth study A, KQ4).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["21 March 1918", "The German Spring Offensive begins"],
  ["8 August 1918", "The Battle of Amiens"],
  ["Early November 1918", "The sailors' mutiny at Kiel spreads"],
  ["11 November 1918", "The Armistice comes into force"],
]);

concept("hist.ww1.end-1918", { file: "ww1/end-1918", keyPrefix: "ww1.end-1918" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did the USA declare war on Germany?",
    options: [
      ["April 1917", "Correct: Congress declared war on 6 April 1917."],
      ["August 1914", "The USA stayed neutral when the war began."],
      ["May 1915", "The Lusitania was sunk in May 1915, but the USA stayed neutral."],
      ["March 1918", "By March 1918 the USA had been at war for almost a year."],
    ],
    answer: "A",
    explanation: "The USA declared war on **6 April 1917**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which German commander planned the Spring Offensive of 1918?",
    options: [
      ["Erich Ludendorff", "Correct: he gambled on winning before the Americans arrived in strength."],
      ["Erich von Falkenhayn", "Falkenhayn led the attack at Verdun in 1916 and was replaced in August 1916."],
      ["Alfred von Schlieffen", "Schlieffen died in 1913."],
      ["Reinhard Scheer", "Scheer was an admiral who commanded the fleet at Jutland."],
    ],
    answer: "A",
    explanation: "**Ludendorff**, with Hindenburg, directed the German war effort from 1916 and launched the 1918 offensives.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the Zimmermann Telegram?",
    options: [
      ["A German offer to Mexico of an alliance against the USA", "Correct: its publication in March 1917 angered Americans."],
      ["A British request to the USA for loans to pay for the war", "The telegram was German, not British."],
      ["President Wilson's statement of his Fourteen Points", "The Fourteen Points were a speech of January 1918."],
      ["A German offer of peace to Russia", "Germany's peace with Russia came at Brest-Litovsk in 1918."],
    ],
    answer: "A",
    explanation: "Intercepted by British intelligence, the **Zimmermann Telegram** helped bring the USA into the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Germany launch the Spring Offensive in March 1918?",
    options: [
      ["To win before American troops arrived in large numbers", "Correct: troops freed from Russia gave Germany a short-lived advantage."],
      ["Because the USA had withdrawn from the war", "The USA was sending more troops every month."],
      ["To support a French request for peace talks", "France had made no such request."],
      ["Because the British blockade had ended and food was plentiful", "The blockade continued and Germany was short of food."],
    ],
    answer: "A",
    explanation: "With Russia out of the war, Germany had a brief advantage in numbers in the west, which would disappear as **American** troops arrived.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happened at Kiel in early November 1918?",
    options: [
      ["Sailors mutinied rather than sail out for a final battle", "Correct: the mutiny spread into a revolution."],
      ["The Armistice was signed in a railway carriage", "The Armistice was signed at Compiègne in France."],
      ["The German fleet won a great victory over the British Grand Fleet", "There was no battle; the sailors refused to sail."],
      ["The Kaiser was crowned emperor again", "The Kaiser's abdication was announced on 9 November."],
    ],
    answer: "A",
    explanation: "The **Kiel mutiny** began a revolution: workers' and soldiers' councils took over in many cities.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Spring Offensive fail despite gaining a lot of ground?",
    options: [
      ["Supplies could not keep up and the best troops were lost", "Correct: the advance ran out of men and supplies."],
      ["The US army had already defeated the main German armies in 1917", "Few US troops reached the front in 1917."],
      ["The Russian army had re-entered the war", "Russia had left the war at Brest-Litovsk."],
      ["German tanks were outnumbered by Austrian tanks", "Austria-Hungary had no tanks on the Western Front."],
    ],
    answer: "A",
    hints: ["Think about what an advancing army needs, and what it cannot replace."],
    explanation: "The stormtroopers outran their **supplies**, and Germany lost hundreds of thousands of irreplaceable men. Ludendorff also lacked a single clear objective.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the Battle of Amiens (8 August 1918) a turning point?",
    options: [
      ["Combined tanks, aircraft and artillery broke German resistance", "Correct: German units surrendered in large numbers."],
      ["It was the first battle in which tanks had ever been used in war", "Tanks were first used on the Somme in 1916."],
      ["It ended the war on the same day", "The war continued until 11 November."],
      ["American troops captured Berlin after it", "No Allied troops reached Berlin in 1918."],
    ],
    answer: "A",
    hints: ["Think about how the Allies fought and how German soldiers responded."],
    explanation: "**Amiens** showed the Allies' new combined-arms methods and the collapse of German morale; Ludendorff later called it the black day of the German army.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which fact most clearly shows that the stab-in-the-back myth was false?",
    options: [
      ["Ludendorff told the Kaiser the war was lost on 29 September", "Correct: the generals admitted defeat before the revolution."],
      ["Sailors mutinied at Kiel in November 1918", "The myth used events like this to blame the home front."],
      ["Socialist politicians formed the new German government in November 1918", "The myth blamed these politicians; this does not disprove it."],
      ["Germany signed the Treaty of Versailles in June 1919", "This came after the defeat and does not show its cause."],
    ],
    answer: "A",
    hints: ["Which event came first: the generals' admission or the revolution?"],
    explanation: "The army leadership admitted that the war was lost and asked for an armistice BEFORE the revolution, so the army had not been 'betrayed' at home.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Armistice came into force at 11 a.m. on 11 November 1918.",
    answer: true,
    explanation: "True. It was signed early that morning in a railway carriage at Compiègne.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Armistice of November 1918 was the peace treaty that ended the First World War.",
    answer: false,
    explanation: "False. The Armistice only stopped the fighting. The peace treaty with Germany, the Treaty of Versailles, was signed on 28 June 1919.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1918.",
    pairs: [
      ["Ferdinand Foch", "Supreme commander of the Allied armies"],
      ["John Pershing", "Commander of the American forces in France"],
      ["Prince Max of Baden", "German Chancellor who asked Wilson for an armistice"],
      ["Matthias Erzberger", "Led the German delegation that signed the Armistice"],
    ],
    explanation: "Foch coordinated the Allied armies from April 1918; Pershing led the Americans; Prince Max requested the armistice; Erzberger signed it.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events of 1918 in chronological order.",
    pairs: [order.events[2][1], order.events[0][1], order.events[3][1], order.events[1][1]],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The mutiny came only days before the fighting stopped."],
    explanation: "Spring Offensive 21 March; Amiens 8 August; Kiel mutiny early November; Armistice 11 November.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Germany's request for an armistice was addressed to President {{blank:a}} and based on his Fourteen Points. The Armistice was signed in a railway carriage in the forest of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Wilson"], choices: ["Wilson", "Roosevelt", "Lincoln", "Harding"] },
      { id: "b", accepted: ["Compiègne"], choices: ["Compiègne", "Versailles", "the Ardennes", "the Argonne"] },
    ],
    explanation: "Germany appealed to **Wilson**, hoping for milder terms. The Armistice was signed at **Compiègne**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the terms of the Armistice of 11 November 1918.",
    points: [
      "Germany withdrew from all occupied territory.",
      "The left bank of the Rhine was to be occupied by the Allies.",
      "Germany handed over large quantities of weapons / its submarines; its surface fleet was interned.",
      "The Treaty of Brest-Litovsk was cancelled / the blockade continued.",
    ],
    modelAnswer: "Germany had to withdraw from all the land it occupied in France, Belgium and elsewhere, and the Allies would occupy the left bank of the Rhine. It had to hand over large numbers of guns, machine guns, aircraft and all its submarines, and its surface fleet was interned. The Treaty of Brest-Litovsk was cancelled, and the blockade continued until peace was signed.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why revolution broke out in Germany in October-November 1918.",
    points: [
      "Identifies hunger and war-weariness caused by the blockade.",
      "Explains that shortages, influenza and huge losses made people turn against the war and the government.",
      "Identifies military defeat / the request for an armistice.",
      "Explains that news that the war was lost destroyed faith in the Kaiser and the generals.",
      "Identifies the naval order for a final battle / the Kiel mutiny.",
      "Explains that sailors refused to die in a hopeless battle; the mutiny spread and councils took over cities.",
    ],
    hints: ["Think about the home front, the army and the navy."],
    modelAnswer: "Years of blockade had left Germans hungry and exhausted, and the influenza pandemic and heavy casualties added to the anger, so many turned against the war. When it became clear in October that the generals themselves believed the war was lost and that Germany was asking for an armistice, faith in the Kaiser collapsed. Then the naval command ordered the fleet to sea for a final battle; the sailors, unwilling to die in a hopeless fight, mutinied at Kiel, and workers' and soldiers' councils spread to cities across Germany, forcing the Kaiser to abdicate.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the USA declared war on Germany in April 1917.",
    points: [
      "Identifies unrestricted submarine warfare.",
      "Explains that U-boats sank American ships and killed Americans without warning.",
      "Identifies the Zimmermann Telegram.",
      "Explains that Germany's offer to Mexico of American territory showed a direct threat to the USA.",
    ],
    hints: ["Two events of early 1917."],
    modelAnswer: "In February 1917 Germany resumed unrestricted submarine warfare, so U-boats began sinking American merchant ships without warning, killing American sailors. In March the Zimmermann Telegram was published, showing that Germany had offered Mexico an alliance and the return of land lost to the USA, which convinced many Americans that Germany was a direct threat.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a letter from a fictional German soldier to his parents, written in April 1918 during the Spring Offensive", "We have broken through and are further forward than anyone has been for four years. Yesterday we took an English supply dump. I have never seen so much food: tins of meat, white bread, real coffee, even wine. The men ate until they were sick and nobody could make them move on. They told us at home that the English were starving because of our U-boats. Now I do not know what to believe.")}`,
    hints: ["In (b), use the source and what you know about the offensive."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the German army during the Spring Offensive?", points: [
        "It advanced a long way / broke through.",
        "Soldiers were hungry and stopped to loot / discipline weakened.",
      ], explanation: "Two inferences from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Use Source A and your own knowledge to explain why the Spring Offensive failed.", points: [
        "Looting delayed the advance (source).",
        "Soldiers discovered the Allies were well supplied, damaging morale (source).",
        "Own knowledge: supply lines could not keep up; best troops lost.",
        "Own knowledge: no clear objective; Foch's unified command; American reinforcements.",
      ], explanation: "Source and own knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source A to a historian studying why Germany lost the war?", points: [
        "Useful: written at the time by a soldier in the offensive; first-hand.",
        "Useful: content on looting and hunger matches own knowledge of the offensive and the blockade.",
        "Useful: shows the effect on morale of discovering German propaganda was false.",
        "Limit: one soldier's experience in one place.",
        "Limit: says nothing about US entry, the Hundred Days, allies' collapse or revolution.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it was written during the offensive by a soldier taking part, as a private letter with no obvious reason to lie. Its description of hungry soldiers looting a British supply dump matches what historians know about the offensive and about the effects of the blockade on Germany. It also shows how discovering that the British were well fed damaged German morale. However, it describes only one soldier's experience in one place, and it cannot tell us about American entry, the Hundred Days, the collapse of Germany's allies or the revolution at home. It is useful for showing why the offensive lost momentum and why morale fell, but only as part of a wider explanation.", explanation: "Provenance, content and own knowledge." }),
    ],
    explanation: "Practice source-based question (12 marks). The source is invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare American entry with the failure of the offensive, the Hundred Days and the home front."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Allied advance in the Hundred Days of 1918.", points: [
        "Began with the Battle of Amiens on 8 August 1918.",
        "Used tanks, aircraft and artillery together with infantry.",
        "Hindenburg Line broken in late September.",
        "German army retreated / large numbers surrendered; continued until the Armistice.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"American entry into the war was the main reason why Germany asked for an armistice in 1918.\" How far do you agree?", points: [
        ["USA: over a million troops, supplies and loans; Germany could not match growing Allied strength.", 2],
        ["USA: prospect of American troops forced the Spring Offensive gamble.", 2],
        ["Other: failure and losses of the Spring Offensive.", 2],
        ["Other: Allied Hundred Days, Foch's command, combined arms; collapse of Germany's allies.", 2],
        ["Other: blockade, hunger and revolution at home.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "American entry was very important. By late 1918 well over a million American soldiers were in France, with more arriving every month, together with food, raw materials and loans. Germany could not match this growing strength. The prospect of American troops also forced Ludendorff to gamble on the Spring Offensive before they arrived.\n\nHowever, other factors were also important. The Spring Offensive failed and cost Germany hundreds of thousands of its best troops. From August the Allies, under Foch's unified command and using tanks, aircraft and artillery together, drove the Germans back in the Hundred Days, mainly with British Empire and French troops. Germany's allies collapsed, and at home the blockade had caused hunger, strikes and, finally, mutiny and revolution.\n\nI partly agree. American entry made Germany's defeat certain and shaped its decisions in 1918, but Germany asked for an armistice because its army was being defeated on the battlefield in the Hundred Days after the failure of its own offensive, with the collapse of its allies and its home front making continued war impossible.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Armistice", "An agreement to stop fighting while peace terms are negotiated; not a peace treaty.");
  b.card("DEFINITION", "Stab-in-the-back myth", "The false post-war claim that the German army was not defeated but betrayed at home.");
  b.card("FACT", "When did the USA declare war on Germany?", "6 April 1917.");
  b.card("FACT", "When did the German Spring Offensive begin?", "21 March 1918 (Operation Michael).");
  b.card("FACT", "What happened at Amiens on 8 August 1918?", "A combined Allied attack with tanks broke German lines: the start of the Hundred Days.");
  b.card("FACT", "When was the Kaiser's abdication announced?", "9 November 1918; a republic was proclaimed and Wilhelm II fled to the Netherlands.");
  b.card("FACT", "When and where was the Armistice signed?", "Early on 11 November 1918 at Compiègne; fighting stopped at 11 a.m.");
  b.card("CONCEPT", "Why did the Spring Offensive fail?", "Supplies could not keep up, elite troops were lost, there was no clear objective, and Foch's unified command and American troops strengthened the Allies.");
  b.card("CONCEPT", "Why was American entry important?", "Fresh troops, food, materials and loans gave the Allies growing strength, and the prospect of them forced Germany's 1918 gamble.");
});
