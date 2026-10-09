// Slice W4b: causes of the American Civil War, 1820-1861 (0470 Option A key question 4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.us-civil-war.causes", { file: "us-civil-war/causes", keyPrefix: "us-civil-war.causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which state was the first to secede from the Union, on 20 December 1860?",
    options: [
      ["South Carolina", "Correct: six more Deep South states followed by February 1861."],
      ["Virginia", "Virginia seceded in April 1861, after Fort Sumter."],
      ["Kansas", "Kansas joined the Union as a free state in 1861; it did not secede."],
      ["Kentucky", "Kentucky was a border slave state that stayed in the Union."],
    ],
    answer: "A",
    explanation: "**South Carolina** seceded first, soon after Lincoln's election.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where did the fighting of the Civil War begin in April 1861?",
    options: [
      ["Fort Sumter", "Correct: Confederate forces bombarded it on 12 April 1861."],
      ["Gettysburg", "Gettysburg was fought in July 1863."],
      ["Harpers Ferry", "John Brown raided Harpers Ferry in 1859, before the war."],
      ["Appomattox", "The war ended with Lee's surrender at Appomattox in April 1865."],
    ],
    answer: "A",
    explanation: "The war began when Confederate guns fired on **Fort Sumter** in Charleston harbour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Missouri Compromise of 1820 do?",
    options: [
      ["Admitted Missouri as a slave state and Maine as a free state", "Correct: it also banned slavery north of 36°30' in the rest of the Louisiana Purchase."],
      ["Admitted California as a free state and passed the Fugitive Slave Act", "These were parts of the Compromise of 1850."],
      ["Let the settlers of Kansas and Nebraska decide about slavery for themselves", "This was the Kansas-Nebraska Act of 1854."],
      ["Ruled that Congress had no power to ban slavery in the territories", "This was the Dred Scott decision of 1857."],
    ],
    answer: "A",
    explanation: "The **Missouri Compromise** kept the balance of slave and free states and drew the 36°30' line.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Fugitive Slave Act of 1850 anger many Northerners?",
    options: [
      ["It forced them to help return people who had escaped from slavery", "Correct: it brought slavery into Northern communities."],
      ["It banned slavery in every state of the Union", "It did the opposite: it strengthened slaveholders' rights."],
      ["It raised tariffs on goods imported from Europe", "It was not about tariffs."],
      ["It gave the vote to all free Black men living in the Northern states of the Union", "It said nothing about voting."],
    ],
    answer: "A",
    explanation: "The **Fugitive Slave Act** required Northerners to assist in capturing people who had escaped slavery.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which political party was formed in 1854 by opponents of the spread of slavery?",
    options: [
      ["The Republican Party", "Correct: Lincoln was its candidate in 1860."],
      ["The Democratic Party", "The Democrats were older and split in 1860 into Northern and Southern wings."],
      ["The Whig Party", "The Whigs collapsed in the 1850s."],
      ["The Constitutional Union Party", "This party was formed in 1860 to try to avoid disunion."],
    ],
    answer: "A",
    explanation: "The **Republican Party** was founded in 1854 in reaction to the Kansas-Nebraska Act.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Kansas-Nebraska Act (1854) increase tension between North and South?",
    options: [
      ["It overturned the Missouri line, reopening northern land to slavery", "Correct: it led to violence in Kansas and the founding of the Republicans."],
      ["It abolished slavery in Kansas and Nebraska", "It left the decision to the settlers, by popular sovereignty."],
      ["It was a Supreme Court ruling that declared Black people could not be citizens", "That was the Dred Scott decision of 1857."],
      ["It banned abolitionist newspapers in the North", "It did not concern newspapers."],
    ],
    hints: ["Compare it with the line drawn in 1820."],
    answer: "A",
    explanation: "By **reopening northern territory to slavery**, the act destroyed the 1820 settlement and caused 'Bleeding Kansas'.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why Lincoln's election led Southern states to secede?",
    options: [
      ["He won without Southern votes and opposed the spread of slavery", "Correct: Southern leaders feared slavery would be contained and attacked."],
      ["He had promised in 1860 to free all enslaved people immediately", "In 1860 he promised not to interfere with slavery where it existed."],
      ["He had ordered the army to invade South Carolina in November 1860", "No such order was given; he was not inaugurated until March 1861."],
      ["He was the first Democrat from the North to become President", "Lincoln was a Republican."],
    ],
    hints: ["What did his victory show about the balance of power between North and South?"],
    answer: "A",
    explanation: "Lincoln's **Northern-only victory** and opposition to the **expansion of slavery** convinced Deep South leaders to leave.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence most directly supports the view that slavery was the main cause of secession?",
    options: [
      ["Seceding states named the protection of slavery as their reason", "Correct: their own declarations put slavery at the centre."],
      ["The North had more factories and railways than the South", "This shows economic difference, not the motive for secession."],
      ["Most Northern soldiers in 1861 said they were fighting to save the Union", "This shows Northern aims, not why the South seceded."],
      ["The South opposed tariffs on imported goods", "Tariffs were a long-running issue but were not the main theme of the secession declarations."],
    ],
    hints: ["Look for evidence from the people who seceded."],
    answer: "A",
    explanation: "The **secession declarations** themselves show that defending slavery was the main motive.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Frederick Douglass escaped from slavery and became a leading abolitionist speaker and writer.",
    answer: true,
    explanation: "True. Douglass was one of the most influential opponents of slavery.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the Dred Scott decision of 1857, the Supreme Court ruled that Congress could ban slavery in all the western territories.",
    answer: false,
    explanation: "False. The Court ruled that Congress had no power to ban slavery in the territories, and that people of African descent could not be citizens.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["William Lloyd Garrison", "Abolitionist who published The Liberator"],
      ["Harriet Beecher Stowe", "Author of Uncle Tom's Cabin (1852)"],
      ["Stephen Douglas", "Senator behind the Kansas-Nebraska Act"],
      ["Jefferson Davis", "President of the Confederate States"],
    ],
    explanation: "Garrison (The Liberator), Stowe (Uncle Tom's Cabin), Douglas (Kansas-Nebraska Act), Davis (Confederate President).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Dred Scott decision",
      "Compromise of 1850",
      "John Brown's raid on Harpers Ferry",
      "Kansas-Nebraska Act",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The Supreme Court decision came three years after the Act."],
    explanation: "Compromise of 1850; Kansas-Nebraska Act (1854); Dred Scott (1857); Harpers Ferry (1859).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Lincoln won the election of 1860 with about {{blank:a}} of the popular vote. Before he took office, seven states had seceded and formed the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["40%"], choices: ["20%", "40%", "60%", "80%"] },
      { id: "b", accepted: ["Confederate States of America"], choices: ["Confederate States of America", "Republican Party", "Union of Free States", "Kansas Territory"] },
    ],
    explanation: "Lincoln won about **40%** of the popular vote; the seceded states formed the **Confederate States of America**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the idea, used in the Kansas-Nebraska Act, that the settlers of a territory should vote on whether to allow slavery.",
    accepted: ["popular sovereignty", "popular sovereignity"],
    wrong: ["states' rights"],
    explanation: "**Popular sovereignty** let settlers decide, which led to violence in Kansas.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the differences between the North and the South by the 1850s.",
    points: [
      "North: industry, trade and banking as well as farming; South: mainly agriculture, especially cotton for export.",
      "North: free wage labour and immigrants; South: enslaved labour.",
      "North: larger and faster-growing population.",
      "Tariffs: the North favoured protection; the South opposed it.",
    ],
    modelAnswer: "The North had growing industries, trade and banks as well as farms, while the South was mainly agricultural, with cotton grown for export as its most valuable crop. The North used free wage labour, including many European immigrants, while the Southern economy depended on about four million enslaved people. The North's population was larger and growing faster. Many Northerners supported tariffs to protect their industries, while Southerners opposed them because they raised the cost of imports.",
    explanation: "One mark per accurate difference.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the expansion of the United States westwards caused conflict over slavery.",
    points: [
      "Identifies that each new territory or state had to be slave or free.",
      "Explains that this affected the balance in the Senate / political power of each section.",
      "Identifies a crisis caused by new land (Missouri 1820, the Mexican War lands 1850, Kansas 1854).",
      "Explains how it led to anger / violence (e.g. Bleeding Kansas, Fugitive Slave Act in the 1850 Compromise).",
    ],
    hints: ["Think about the Senate and about a specific crisis."],
    modelAnswer: "Every new territory had to become either a slave or a free state, and because each state had two senators, this decided whether the North or the South would control the Senate. So each addition of land caused a crisis. When Missouri applied to join in 1820 a compromise was needed; the lands won from Mexico led to the Compromise of 1850, whose Fugitive Slave Act angered the North; and the Kansas-Nebraska Act of 1854 led to violence in Kansas as both sides tried to win the territory.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the compromises over slavery broke down in the 1850s.",
    points: [
      "Identifies the Fugitive Slave Act (1850).",
      "Explains that it brought slavery into the North and turned moderate Northerners against compromise.",
      "Identifies the Kansas-Nebraska Act (1854).",
      "Explains that it overturned the Missouri line, led to Bleeding Kansas and the Republican Party.",
      "Identifies the Dred Scott decision (1857) / John Brown's raid (1859).",
      "Explains that Dred Scott made compromise legally impossible / the raid convinced Southerners the North was hostile.",
    ],
    hints: ["Choose three events of the 1850s and show how each destroyed trust."],
    modelAnswer: "The Compromise of 1850 itself contained the seeds of failure: its Fugitive Slave Act forced Northerners to help return people who had escaped slavery, which turned many moderates against the South. In 1854 the Kansas-Nebraska Act overturned the Missouri line by letting settlers decide; supporters and opponents of slavery fought in Kansas, and the Republican Party was founded to stop slavery spreading. Finally, the Dred Scott decision of 1857 ruled that Congress could not ban slavery in the territories, so no political compromise was possible, and John Brown's raid in 1859 convinced Southerners that Northerners wanted to destroy slavery by force.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an editorial in a fictional Charleston newspaper, November 1860", "The North has chosen a President without a single Southern vote. His party means to surround the South with free states until our institutions wither and die. We did not join this Union to be ruled by our enemies. South Carolina must look to her own safety.")}\n\n${source("Source B", "a letter from a fictional Ohio farmer to his cousin in Kentucky, January 1861", "Mr Lincoln has said a hundred times that he will not touch slavery where it is. I do not care much for the slaves, but I care for the Union my grandfather fought for. If the Carolinians break it up because they lost a fair election, then there is no government at all.")}`,
    hints: ["Compare what each writer thinks Lincoln's election means."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about Southern fears after Lincoln's election?", points: [
        "Fear that the North / Republicans would control the government without the South.",
        "Fear that slavery ('our institutions') would be contained and destroyed.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about the meaning of Lincoln's election?", points: [
        "A: the election is a threat to slavery and the South.",
        "B: Lincoln will not touch slavery where it exists; it was a fair election.",
        "A: secession is justified for safety; B: secession would destroy government / the Union.",
        "Agreement: both recognise slavery as the issue in the background / both know the election was won without the South.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How useful is Source A as evidence about why the Southern states seceded? Use the source and your own knowledge.", points: [
        "Useful: shows the reaction in South Carolina, the first state to secede, at the time.",
        "Content supported: Lincoln won without Southern electoral votes; Republicans opposed the spread of slavery.",
        "Content supported: 'institutions' refers to slavery, the motive named in secession declarations.",
        "Limitation: a persuasive editorial urging secession; exaggerates Republican aims (Lincoln promised not to touch slavery where it existed).",
        "Limitation: one state, before the others seceded / does not show views of non-slaveholding whites.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it shows how leading opinion in South Carolina, the first state to secede, reacted to Lincoln's election at the time. My knowledge supports its main points: Lincoln won without a single Southern electoral vote, and the Republicans aimed to stop slavery spreading into the territories. Its reference to 'our institutions' means slavery, which South Carolina's own declaration named as the reason for leaving. However, it is an editorial written to persuade readers to secede, so it exaggerates: Lincoln had promised not to interfere with slavery where it existed. It also shows only one state's view. It is very useful for understanding Southern fears, as long as we remember its purpose.", explanation: "Usefulness judged from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider economic differences, states' rights and political breakdown, and show how far each was linked to slavery."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Compromise of 1850.", points: [
        "California admitted as a free state.",
        "New Mexico and Utah territories to decide on slavery by popular sovereignty.",
        "The slave trade (not slavery) ended in Washington DC.",
        "A stricter Fugitive Slave Act.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: X, stem: "How far was slavery the cause of the American Civil War? Explain your answer.", points: [
        ["Slavery: crises over expansion (1820, 1850, 1854) and Dred Scott (1857).", 3],
        ["Slavery: abolitionism; secession declarations named slavery; Lincoln's opposition to expansion.", 2],
        ["Other: economic differences and tariffs; states' rights; breakdown of the party system.", 3],
        ["Other: the Union's aim in 1861 was to stop secession; Fort Sumter as trigger.", 2],
        ["Supported judgement, showing how other factors were linked to slavery.", 2],
      ], levels: levels(12), modelAnswer: "Slavery was at the centre of every crisis that led to war. When Missouri applied to join in 1820, when land was won from Mexico in 1848, and when Kansas was opened in 1854, the question was always whether slavery could spread. The Fugitive Slave Act, the Dred Scott decision and John Brown's raid deepened distrust. When Lincoln, who opposed the spread of slavery, won in 1860, several seceding states named the protection of slavery as their reason for leaving.\n\nOther factors also mattered. The North and South had different economies, and Southerners had long resented tariffs. Southern leaders argued for states' rights, and the party system broke down when the Democrats split in 1860. Most Northerners went to war in 1861 to save the Union rather than to end slavery, and the war began when Confederates fired on Fort Sumter.\n\nHowever, most of these factors were connected to slavery: the economic differences rested on enslaved labour, the states' right being defended was the right to hold people in slavery, and the parties split over slavery. So slavery was the root cause of the war, although the immediate aim of the North was to preserve the Union.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "What did the Missouri Compromise (1820) do?", "Admitted Missouri (slave) and Maine (free) and banned slavery north of 36°30' in the rest of the Louisiana Purchase.");
  b.card("DEFINITION", "Popular sovereignty", "The idea that settlers in a territory should vote on whether to allow slavery there.");
  b.card("FACT", "What was the Dred Scott decision (1857)?", "The Supreme Court ruled that people of African descent could not be citizens and Congress could not ban slavery in the territories.");
  b.card("FACT", "When was the Kansas-Nebraska Act?", "1854; it overturned the Missouri line and led to 'Bleeding Kansas'.");
  b.card("DEFINITION", "Secession", "A state leaving the Union; eleven Southern states seceded in 1860-61.");
  b.card("FACT", "When did South Carolina secede?", "20 December 1860.");
  b.card("FACT", "When was Fort Sumter bombarded?", "12 April 1861; it surrendered the next day and the war began.");
  b.card("DEFINITION", "Abolitionist", "Someone who campaigned for the complete abolition of slavery, e.g. Garrison, Douglass, Tubman.");
  b.card("CONCEPT", "Why was Lincoln's election in 1860 significant?", "He won without Southern votes and opposed the spread of slavery, so Deep South states seceded before he took office.");
});
