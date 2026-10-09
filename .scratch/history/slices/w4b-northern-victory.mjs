// Slice W4b: the Civil War, 1861-1865 - why the North won (0470 Option A key question 4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.us-civil-war.northern-victory", { file: "us-civil-war/northern-victory", keyPrefix: "us-civil-war.northern-victory" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Confederate general surrendered at Appomattox Court House on 9 April 1865?",
    options: [
      ["Robert E. Lee", "Correct: his surrender effectively ended the war."],
      ["Ulysses S. Grant", "Grant was the Union general who accepted Lee's surrender."],
      ["William T. Sherman", "Sherman was a Union general who marched through Georgia."],
      ["Jefferson Davis", "Davis was the Confederate President, not a general in the field."],
    ],
    answer: "A",
    explanation: "**Lee** surrendered to Grant at Appomattox on 9 April 1865.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did the Emancipation Proclamation take effect?",
    options: [
      ["1 January 1863", "Correct: Lincoln issued the preliminary proclamation after Antietam in September 1862."],
      ["12 April 1861", "This was the bombardment of Fort Sumter."],
      ["4 July 1863", "This was the surrender of Vicksburg."],
      ["9 April 1865", "This was Lee's surrender at Appomattox."],
    ],
    answer: "A",
    explanation: "The **Emancipation Proclamation** took effect on 1 January 1863.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What were the two main parts of the Union's Anaconda Plan?",
    options: [
      ["A naval blockade of Southern ports and control of the Mississippi River", "Correct: the aim was to squeeze and split the South."],
      ["An immediate invasion of Britain and an alliance with France", "The Union wanted to keep Britain and France neutral, not fight them."],
      ["Building forts along the Canadian border and recruiting in Europe", "Neither was part of the plan."],
      ["Capturing Richmond in 1861 and then freeing every enslaved person in the South at once", "The plan was slower and did not include emancipation."],
    ],
    answer: "A",
    explanation: "The **Anaconda Plan**: blockade the coast and take the Mississippi.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the capture of Vicksburg in July 1863 important?",
    options: [
      ["It gave the Union control of the Mississippi and split the Confederacy", "Correct: Texas, Arkansas and Louisiana were cut off from the east."],
      ["It ended Lee's second invasion of the North, in Pennsylvania, that same month", "That was Gettysburg, fought at the same time."],
      ["It was the place where the war ended", "The war ended at Appomattox in April 1865."],
      ["It persuaded Britain to recognise the Confederacy as an independent country", "Britain never recognised the Confederacy."],
    ],
    answer: "A",
    explanation: "**Vicksburg** gave the Union the Mississippi, a key aim of the Anaconda Plan.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "About how many Black soldiers served in the Union army during the Civil War?",
    options: [
      ["About 180,000", "Correct: around one in ten of the Union army by the end of the war."],
      ["About 1,800", "This is far too low; whole regiments of Black soldiers served."],
      ["About 1.8 million", "This is far too high; it would be most of the Union army."],
      ["None, because Black men were not allowed to enlist", "Black men were recruited after the Emancipation Proclamation."],
    ],
    answer: "A",
    explanation: "About **180,000** Black soldiers served in the Union army.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the South hope that Britain would support it?",
    options: [
      ["British textile mills depended on Southern cotton", "Correct: Southern leaders believed 'King Cotton' would force Britain to act."],
      ["Britain had promised in 1860 to defend the right of states to secede", "Britain made no such promise."],
      ["Britain was at war with the United States in 1861", "Britain and the United States were not at war."],
      ["Britain still allowed slavery in its colonies and favoured slaveholders", "Britain had abolished slavery in its colonies in the 1830s."],
    ],
    hints: ["Think about trade."],
    answer: "A",
    explanation: "**King Cotton** diplomacy assumed Britain's need for cotton would bring recognition; Britain found other sources and stayed neutral.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Emancipation Proclamation free few people on the day it took effect?",
    options: [
      ["It applied only to areas in rebellion, where the Union had no control", "Correct: it did not apply to the loyal border states."],
      ["It was cancelled by the Supreme Court within a week", "It was not cancelled."],
      ["It applied only to those enslaved people who had already escaped and joined the Union army", "It applied to all enslaved people in the rebel areas."],
      ["Most enslaved people had already been freed by Southern states", "Southern states did not free enslaved people."],
    ],
    hints: ["Where did the proclamation apply, and who controlled those areas?"],
    answer: "A",
    explanation: "It applied to **Confederate-held areas**, so freedom came as the Union army advanced.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that leadership, not just resources, decided the war?",
    options: [
      ["Sherman's capture of Atlanta helped Lincoln win re-election in 1864", "Correct: without military success and Lincoln, war-weariness might have ended the war."],
      ["The North had about nine-tenths of the manufacturing industry of the whole country", "This supports the resources argument."],
      ["The North's population was more than twice that of the South", "This supports the resources argument."],
      ["Most of the country's railways were in the North", "This supports the resources argument."],
    ],
    hints: ["Three options are about what the North had; one is about how it was used."],
    answer: "A",
    explanation: "The **1864 election** shows the North could have given up; Sherman's success and Lincoln's leadership kept it fighting.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Battle of Gettysburg (July 1863) ended Lee's invasion of the North.",
    answer: true,
    explanation: "True. Lee retreated to Virginia and never again invaded Northern territory.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At the start of the war, Lincoln's main aim was to end slavery in every state.",
    answer: false,
    explanation: "False. His main aim in 1861 was to save the Union; emancipation became a war aim in 1862-63.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in the war.",
    pairs: [
      ["Ulysses S. Grant", "Took Vicksburg and commanded all Union armies from 1864"],
      ["William T. Sherman", "Took Atlanta and marched to the sea"],
      ["Robert E. Lee", "Commanded the Confederacy's main army in Virginia"],
      ["Jefferson Davis", "President of the Confederate States"],
    ],
    explanation: "Grant, Sherman (Union); Lee, Davis (Confederacy).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Sherman takes Atlanta",
      "Battle of Antietam",
      "Lee surrenders at Appomattox",
      "Surrender of Vicksburg",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Antietam led to the Emancipation Proclamation."],
    explanation: "Antietam (September 1862); Vicksburg (July 1863); Atlanta (September 1864); Appomattox (April 1865).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In 1860 the population of the Union states was about {{blank:a}} million, compared with about 9 million in the Confederate states. The Confederate capital was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["22"], choices: ["5", "9", "22", "60"] },
      { id: "b", accepted: ["Richmond"], choices: ["Richmond", "Washington", "Atlanta", "Charleston"] },
    ],
    explanation: "About **22 million** in the Union against about 9 million in the South; the Confederate capital was **Richmond**, Virginia.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the battle of 17 September 1862, the bloodiest single day of the war, which stopped Lee's invasion of Maryland.",
    accepted: ["Antietam", "Battle of Antietam", "Sharpsburg", "Battle of Sharpsburg"],
    wrong: ["Gettysburg"],
    explanation: "**Antietam** (called Sharpsburg in the South) allowed Lincoln to announce emancipation.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the resources of the North at the start of the Civil War.",
    points: [
      "Larger population (about 22 million against about 9 million).",
      "Most of the country's industry (about nine-tenths of manufacturing).",
      "Most of the railway network.",
      "Most of the navy and merchant ships / more money and banks.",
    ],
    modelAnswer: "The North had a population of about 22 million, more than twice that of the Confederacy. It had about nine-tenths of the country's manufacturing, so it could produce weapons and supplies. It also had most of the railway network to move men and goods, and most of the navy and merchant ships, which allowed it to blockade the South.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Emancipation Proclamation helped the North to win the war.",
    points: [
      "Identifies its effect on Britain / foreign support.",
      "Explains that British opinion opposed slavery, so recognition of the Confederacy became unlikely.",
      "Identifies the recruitment of Black soldiers.",
      "Explains that about 180,000 Black soldiers added to Union manpower while escapes weakened the Southern economy.",
    ],
    hints: ["Consider foreign policy and manpower."],
    modelAnswer: "The proclamation made the war a war against slavery. Because public opinion in Britain opposed slavery, it became very difficult for the British government to recognise or help the Confederacy. It also allowed Black men to join the Union army: about 180,000 served, adding manpower when the North needed it, while every escape to Union lines took labour away from Southern farms.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Confederacy was defeated.",
    points: [
      "Identifies the South's lack of resources.",
      "Explains that it could not replace men or weapons, and the blockade caused shortages and inflation.",
      "Identifies military defeats in 1863-64.",
      "Explains that Vicksburg split the South and Sherman destroyed its economy and morale.",
      "Identifies internal weaknesses (states' rights, desertion, failure of King Cotton diplomacy).",
      "Explains that governors resisted Davis / Britain did not recognise it, so no outside help came.",
    ],
    hints: ["Resources, military events, and the South's own weaknesses."],
    modelAnswer: "The South lacked the resources for a long war: it had far fewer people and little industry, so it could not replace its losses, and the Union blockade caused shortages and severe inflation. Military defeats in 1863-64 were decisive: the loss of Vicksburg split the Confederacy, and Sherman's march through Georgia destroyed railways and crops and broke Southern morale. The South also had internal weaknesses: state governors resisted Jefferson Davis's demands in the name of states' rights, desertion grew, and King Cotton diplomacy failed because Britain never recognised the Confederacy.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter by a fictional Confederate soldier in Virginia to his wife, written in March 1865", "We have had no meat for a week and many of the men have no shoes. Your letter says flour costs more than a month's pay and that the Yankees burned the Hendersons' barn. Three of our company went home last night and I do not blame them. The Generals still talk of victory, but nobody here believes them.")}\n\n${source("Source B", "an article in a fictional New York newspaper, September 1864", "Atlanta is ours! General Sherman's despatch has silenced those who said the war could not be won and that we must make peace with the rebels. The people will not abandon the President now. The rebellion has lost its workshops and its railways, and it cannot replace them.")}`,
    hints: ["Think about what each source shows about the strength of each side in 1864-65."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the condition of the Confederacy in 1865?", points: [
        "Shortages of food and equipment / inflation (flour prices).",
        "Low morale / desertion.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about why the South was losing the war?", points: [
        "Agree: both show the destruction of Southern resources (burned barn; lost workshops and railways).",
        "Agree: both suggest the South could not replace its losses.",
        "Difference: A stresses shortages and morale among soldiers and civilians; B stresses Union military success and politics.",
        "Difference: B links victory to Lincoln's political survival; A says nothing about the North.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How useful is Source B as evidence about why the North won the war? Use the source and your own knowledge.", points: [
        "Useful: shows the importance of the capture of Atlanta (September 1864).",
        "Own knowledge: Atlanta helped Lincoln win re-election in November 1864, avoiding a negotiated peace.",
        "Useful: refers to the South's loss of industry and railways (Sherman's total war).",
        "Limitation: Northern newspaper, celebratory and partisan; exaggerates.",
        "Limitation: written before the end of the war; ignores other factors (Grant in Virginia, blockade, Black soldiers).",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B is useful because it shows how important the capture of Atlanta was. My knowledge confirms that Sherman took Atlanta in September 1864 and that the victory silenced Northerners who wanted a negotiated peace, helping Lincoln win re-election in November. It also points to the South's loss of workshops and railways, which Sherman's march then destroyed further. However, it is a Northern newspaper celebrating a victory, so it is one-sided and exaggerates the effect of one event. It was written before the war ended and says nothing about Grant's campaign against Lee, the blockade or the 180,000 Black soldiers. It is useful for one turning point and the political side of victory, but not as a full explanation.", explanation: "Usefulness judged from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), weigh Lincoln against resources, generals and Southern weaknesses."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Emancipation Proclamation.", points: [
        "Announced after Antietam (September 1862); took effect 1 January 1863.",
        "Declared enslaved people in areas in rebellion to be free.",
        "Did not apply to the loyal border states.",
        "Allowed Black men to serve in the Union army / navy.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "How important was Lincoln's leadership in the North's victory? Explain your answer.", points: [
        ["Important: kept the border states; held the Republicans together; re-elected 1864.", 2],
        ["Important: Emancipation Proclamation; appointed Grant; explained war aims (Gettysburg Address).", 2],
        ["Other: resources (population, industry, railways, navy, blockade).", 2],
        ["Other: generals and turning points (Vicksburg, Gettysburg, Sherman); Southern weaknesses.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Lincoln's leadership was very important. He kept the border slave states, especially Maryland and Kentucky, in the Union, which protected Washington and denied the South men and resources. He held together a divided party and won re-election in 1864, when many Northerners wanted peace. His Emancipation Proclamation turned the war into a war against slavery, made British support for the Confederacy unlikely and brought about 180,000 Black soldiers into the army. He also persisted until he found a winning general in Grant.\n\nHowever, other factors were also vital. The North had more than twice the population, most of the industry and railways and a navy that blockaded the South. Its generals won decisive victories: Grant at Vicksburg, Meade at Gettysburg and Sherman at Atlanta. The South was weakened by shortages, inflation, desertion and quarrels between Davis and state governors.\n\nOverall the North's resources made victory possible, but Lincoln's leadership ensured that they were used until the war was won. Without him the North might have accepted a negotiated peace in 1864, so his leadership was one of the most important factors.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Anaconda Plan", "Union strategy: blockade Southern ports and control the Mississippi to squeeze and split the Confederacy.");
  b.card("FACT", "When did the Emancipation Proclamation take effect?", "1 January 1863.");
  b.card("FACT", "When were Gettysburg and Vicksburg?", "Gettysburg 1-3 July 1863; Vicksburg surrendered on 4 July 1863.");
  b.card("FACT", "When and where did Lee surrender?", "9 April 1865, at Appomattox Court House, Virginia.");
  b.card("FACT", "About how many Black soldiers served in the Union army?", "About 180,000, around one in ten of the army by the end of the war.");
  b.card("DEFINITION", "Total war", "War against the enemy's economy and morale as well as its army, as in Sherman's march through Georgia (1864).");
  b.card("DEFINITION", "King Cotton diplomacy", "The Confederate hope that Britain and France's need for cotton would make them recognise and help the South.");
  b.card("FACT", "Why was Antietam (17 September 1862) important?", "It stopped Lee's invasion of Maryland and allowed Lincoln to announce emancipation.");
  b.card("CONCEPT", "Why did the North win the Civil War?", "Greater resources, the blockade and Mississippi strategy, victories of 1863-64, emancipation and Black soldiers, Lincoln's leadership and Southern weaknesses.");
});
