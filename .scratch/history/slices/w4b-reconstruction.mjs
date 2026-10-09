// Slice W4b: Reconstruction, 1865-1877 (0470 Option A key question 4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.us-civil-war.reconstruction", { file: "us-civil-war/reconstruction", keyPrefix: "us-civil-war.reconstruction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which amendment to the US Constitution abolished slavery?",
    options: [
      ["The 13th Amendment", "Correct: it was ratified in December 1865."],
      ["The 14th Amendment", "The 14th Amendment (1868) dealt with citizenship and equal protection."],
      ["The 15th Amendment", "The 15th Amendment (1870) dealt with voting rights."],
      ["The 1st Amendment", "The 1st Amendment (1791) protects freedom of speech and religion."],
    ],
    answer: "A",
    explanation: "The **13th Amendment** abolished slavery throughout the United States.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who became President of the United States after Lincoln's assassination in April 1865?",
    options: [
      ["Andrew Johnson", "Correct: a Southern Democrat from Tennessee who had stayed loyal to the Union."],
      ["Ulysses S. Grant", "Grant was President from 1869 to 1877."],
      ["Rutherford B. Hayes", "Hayes became President in 1877, at the end of Reconstruction."],
      ["Jefferson Davis", "Davis had been President of the defeated Confederacy."],
    ],
    answer: "A",
    explanation: "**Andrew Johnson**, the Vice-President, became President in April 1865.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What were the Black Codes passed by Southern states in 1865-66?",
    options: [
      ["Laws restricting the freedom of Black people, such as vagrancy laws", "Correct: they tried to keep freedpeople as a controlled labour force."],
      ["Federal laws that gave forty acres of land to every formerly enslaved family", "There was no such general grant of land."],
      ["The rules of the Freedmen's Bureau for running its schools", "The Bureau was a federal agency that helped freedpeople."],
      ["Laws that gave Black men the vote in the Southern states", "Black men gained the vote in the South through Congress's Reconstruction Acts of 1867."],
    ],
    answer: "A",
    explanation: "The **Black Codes** restricted freedpeople's freedom, which angered the North and led to Radical Reconstruction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Reconstruction Acts of 1867 do?",
    options: [
      ["Put most of the South under military rule until states accepted Black male suffrage", "Correct: states also had to ratify the 14th Amendment."],
      ["Withdrew all federal troops from the South", "Troops were withdrawn in 1877, not 1867."],
      ["Gave the Southern states complete control over their own voting rules and their militias", "The acts did the opposite."],
      ["Abolished the Freedmen's Bureau and ended federal help", "The Bureau continued to operate."],
    ],
    answer: "A",
    explanation: "The **Reconstruction Acts** created five military districts and required new constitutions giving Black men the vote.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who became the first Black member of the US Senate, in 1870?",
    options: [
      ["Hiram Revels", "Correct: he represented Mississippi."],
      ["Frederick Douglass", "Douglass was a leading abolitionist and writer but never a senator."],
      ["Dred Scott", "Dred Scott was the enslaved man whose case reached the Supreme Court in 1857."],
      ["Nat Turner", "Nat Turner led a rebellion of enslaved people in Virginia in 1831."],
    ],
    answer: "A",
    explanation: "**Hiram Revels** of Mississippi entered the Senate in 1870.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Congress take control of Reconstruction from President Johnson in 1866-67?",
    options: [
      ["Johnson's lenient policy had allowed Southern states to pass the Black Codes", "Correct: Northern voters thought the South was restoring slavery in another form."],
      ["Johnson had tried to suspend the Constitution and rule the country without Congress", "He did not try to abolish the Constitution."],
      ["Johnson had ordered a new invasion of the Southern states", "He wanted a lenient approach, not a new invasion."],
      ["The Supreme Court had ordered Congress to take over", "No such order was made."],
    ],
    hints: ["What did Southern governments do under Johnson's plan?"],
    answer: "A",
    explanation: "The **Black Codes** and the election of former Confederates under Johnson's plan led the Radicals to act.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these helped to bring Reconstruction to an end in 1877?",
    options: [
      ["Northern voters lost interest after the depression that began in 1873", "Correct: the economy and scandals mattered more to them than the South."],
      ["The Ku Klux Klan won the presidential election of 1876", "The Klan was not a political party, and the 1876 election was between Republicans and Democrats."],
      ["The 15th Amendment ordered federal troops to leave the South", "The 15th Amendment was about voting rights, not troops."],
      ["Black Southerners voted to end Reconstruction in a national plebiscite", "There was no such vote."],
    ],
    hints: ["Think about what Northerners cared about in the mid-1870s."],
    answer: "A",
    explanation: "**Northern weariness**, the 1873 depression, Southern violence and the 1877 compromise ended Reconstruction.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best supports the view that Reconstruction had lasting importance despite its failures?",
    options: [
      ["The 14th and 15th Amendments were later used by the civil rights movement", "Correct: the legal promises of Reconstruction were revived in the twentieth century."],
      ["Most freedpeople became sharecroppers, with no land of their own, by the 1870s and 1880s", "This supports the view that Reconstruction failed."],
      ["Southern states introduced poll taxes and literacy tests", "This shows rights being taken away after 1877."],
      ["Federal troops were withdrawn from the South in 1877", "This marks the end of Reconstruction, not its lasting importance."],
    ],
    hints: ["Look for an effect that lasted beyond 1877."],
    answer: "A",
    explanation: "The **amendments** stayed in the Constitution and became the basis of later civil rights victories.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Freedmen's Bureau helped to set up schools for formerly enslaved people.",
    answer: true,
    explanation: "True. It helped to establish thousands of schools as well as providing food, medical care and help with labour contracts.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Andrew Johnson was removed from office after the House of Representatives impeached him in 1868.",
    answer: false,
    explanation: "False. The Senate acquitted him by one vote, so he remained President until 1869.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each amendment or law with what it did.",
    pairs: [
      ["13th Amendment", "Abolished slavery"],
      ["14th Amendment", "Citizenship and equal protection of the laws"],
      ["15th Amendment", "Vote not to be denied because of race"],
      ["Enforcement Acts", "Federal laws against Klan violence"],
    ],
    explanation: "13th (1865), 14th (1868), 15th (1870), Enforcement Acts (1870-71).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Federal troops withdrawn from Southern state capitals",
      "Freedmen's Bureau set up",
      "15th Amendment ratified",
      "Reconstruction Acts passed",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The Bureau was set up before the war ended."],
    explanation: "Freedmen's Bureau (1865); Reconstruction Acts (1867); 15th Amendment (1870); troops withdrawn (1877).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}}, founded in Tennessee after the war, used violence to stop Black people voting. Southern white Democrats who regained control of state governments called themselves {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Ku Klux Klan"], choices: ["Ku Klux Klan", "Freedmen's Bureau", "Republican Party", "Union army"] },
      { id: "b", accepted: ["Redeemers"], choices: ["Redeemers", "Radicals", "Abolitionists", "Unionists"] },
    ],
    explanation: "The **Ku Klux Klan** used terror; the **Redeemers** took back Southern state governments in the 1870s.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the farming system in which a family worked a landowner's land in return for a share of the crop.",
    accepted: ["sharecropping", "share cropping", "share-cropping"],
    wrong: ["slavery"],
    explanation: "**Sharecropping** often trapped families in debt.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the work of the Freedmen's Bureau.",
    points: [
      "Set up by Congress in March 1865 to help formerly enslaved people.",
      "Provided food, clothing and medical care.",
      "Helped to establish schools (and colleges) for freedpeople.",
      "Supervised labour contracts / settled legal disputes / helped reunite families.",
    ],
    modelAnswer: "The Freedmen's Bureau was a federal agency set up by Congress in March 1865 to help people freed from slavery. It provided food, clothing and medical care to people in need. It helped to establish thousands of schools for freedpeople. It also supervised labour contracts between freedpeople and employers and helped to settle disputes, although it had few staff and was closed down within a few years.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the Radical Republicans wanted a harsher Reconstruction than President Johnson.",
    points: [
      "Identifies the Black Codes / the treatment of freedpeople.",
      "Explains that the Radicals believed the South was restoring slavery in another form, so freedpeople needed federal protection.",
      "Identifies the return of former Confederate leaders.",
      "Explains that this threatened the results of the war and Republican power, so they demanded new constitutions and Black suffrage.",
    ],
    hints: ["What happened in the South under Johnson's plan?"],
    modelAnswer: "Under Johnson's plan, Southern governments passed Black Codes that forced freedpeople into labour contracts and punished 'vagrancy'. The Radicals believed this was slavery in another form and that freedpeople needed federal protection of their rights. Former Confederate leaders were also elected to Congress, which seemed to threaten everything the war had won and the power of the Republican Party, so the Radicals demanded new state constitutions and the vote for Black men.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Reconstruction failed to secure equal rights for Black Americans.",
    points: [
      "Identifies violence by the Klan and other groups.",
      "Explains that it intimidated Black voters and Republican officials.",
      "Identifies the lack of land / economic dependence.",
      "Explains that without land many freedpeople became sharecroppers in debt to white landowners.",
      "Identifies the withdrawal of Northern support / troops in 1877.",
      "Explains that Redeemer governments then removed voting rights (poll taxes, literacy tests) and introduced segregation.",
    ],
    hints: ["Violence, economics and politics."],
    modelAnswer: "White Southerners used violence: the Ku Klux Klan and other armed groups beat and murdered Black voters and their allies, so many stopped voting. Freedpeople also lacked economic independence. There was no redistribution of land, so many became sharecroppers, in debt to the white landowners whose votes and goodwill they depended on. Finally, Northern support faded after the depression of 1873, and in 1877 the last federal troops were withdrawn from Southern state capitals. Redeemer governments then used poll taxes, literacy tests and segregation laws to take away the rights promised by the amendments.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a report by a fictional teacher in a Freedmen's Bureau school in Georgia, written to her sponsors in the North in 1867", "Our schoolroom is a church with no glass in the windows, yet every bench is full: children in the morning, their parents after work in the fields. An old man of sixty told me he wished to read the Bible before he died. Last week a note was pinned to the door warning me to leave the county.")}\n\n${source("Source B", "an editorial in a fictional Southern newspaper, 1868", "The so-called reconstruction of our state is the work of soldiers and strangers. Men who cannot read are given the ballot while honourable citizens are shut out. The people of this state will never accept government imposed by bayonets, and they will take back what is theirs.")}`,
    hints: ["Compare the attitudes of the two writers to the changes of Reconstruction."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about freedpeople's attitudes to education?", points: [
        "Great eagerness / demand (every bench full).",
        "Adults as well as children wanted to learn (parents after work; old man).",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about Reconstruction?", points: [
        "Agree: both show white Southern hostility (warning note; 'will take back what is theirs').",
        "Agree: both show that Reconstruction brought outsiders / federal power into the South.",
        "Disagree: A sees education and change positively; B sees Reconstruction as illegitimate government by bayonets.",
        "Disagree: B scorns Black voters as unable to read; A shows freedpeople working hard to learn.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How reliable is Source B as evidence about Reconstruction in the South? Use the source and your own knowledge.", points: [
        "Provenance: a Southern newspaper opposed to Reconstruction, written to rally white opinion.",
        "Accurate: military rule under the Reconstruction Acts (1867); Black men given the vote; some former Confederates excluded.",
        "Biased language: 'so-called', 'strangers', 'bayonets'; contempt for Black voters.",
        "Omits: Black Codes and violence that caused Radical Reconstruction; schools and progress.",
        "Useful as evidence of white Southern attitudes that led to the Redeemers.",
        "Supported judgement on reliability.",
      ], levels: levels(6), modelAnswer: "Source B comes from a Southern newspaper opposed to Reconstruction, written in 1868 to stir up white opinion, so it is very one-sided. Some of what it says is accurate: under the Reconstruction Acts of 1867 the South was under military rule, Black men were given the vote, and some former Confederates were barred from office. But its language ('so-called', 'strangers', 'bayonets') and its contempt for Black voters show strong bias, and it leaves out the Black Codes and violence that caused Congress to act, and the progress in schools shown in Source A. It is unreliable as a description of Reconstruction, but it is reliable evidence of the white Southern attitudes that led to the Redeemers taking back power.", explanation: "Reliability judged from provenance and from content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), distinguish changes in law from changes in everyday life, and short-term from long-term."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the three Reconstruction amendments.", points: [
        "13th (1865): abolished slavery.",
        "14th (1868): citizenship for all born in the USA.",
        "14th: equal protection of the laws / due process.",
        "15th (1870): vote not to be denied because of race, colour or previous servitude.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: X, stem: "\"The Civil War and Reconstruction changed very little for Black Americans.\" How far do you agree? Explain your answer.", points: [
        ["Agree: no land; sharecropping and debt.", 2],
        ["Agree: after 1877, voting rights removed (poll taxes, literacy tests, violence) and segregation laws.", 3],
        ["Disagree: slavery abolished for ever (13th Amendment); families, churches and schools.", 3],
        ["Disagree: 14th and 15th Amendments; Black officeholders; later used by the civil rights movement.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "In some ways the statement is true. Freedpeople were not given land, so most became sharecroppers, dependent on white landowners and often in debt. After the last federal troops were withdrawn in 1877, Southern states used violence, poll taxes and literacy tests to stop most Black men voting, and passed segregation laws. For most Black Southerners, everyday life in 1900 was poor and unequal.\n\nHowever, the war and Reconstruction changed some things completely. Slavery was abolished for ever by the 13th Amendment: about four million people could no longer be bought and sold, and families could no longer be separated by sale. Freedpeople built their own churches, schools and colleges, and literacy rose. For a time Black men voted and held office, including Hiram Revels in the Senate. The 14th and 15th Amendments remained in the Constitution, and in the twentieth century the civil rights movement used them to win equality in law.\n\nOverall I largely disagree. The end of slavery was a revolutionary change, even though Reconstruction failed to secure equality and many of its gains were lost after 1877.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "What did the 13th Amendment (1865) do?", "Abolished slavery throughout the United States.");
  b.card("FACT", "What did the 14th Amendment (1868) do?", "Made everyone born in the USA a citizen and promised equal protection of the laws.");
  b.card("FACT", "What did the 15th Amendment (1870) do?", "Said the vote could not be denied because of race, colour or previous servitude.");
  b.card("DEFINITION", "Black Codes", "Southern laws of 1865-66 restricting the freedom of Black people, e.g. vagrancy laws and forced labour contracts.");
  b.card("DEFINITION", "Freedmen's Bureau", "Federal agency (1865) that gave freedpeople food, medical care, schools and help with labour contracts.");
  b.card("DEFINITION", "Radical Republicans", "Members of Congress who wanted to protect freedpeople's rights and transform the South.");
  b.card("FACT", "When did Reconstruction end?", "1877, when the last federal troops were withdrawn from Southern state capitals after the disputed election of 1876.");
  b.card("DEFINITION", "Sharecropping", "Farming a landowner's land for a share of the crop; often trapped families in debt.");
  b.card("CONCEPT", "Why did Reconstruction end?", "Southern violence, Northern weariness after the 1873 depression, Redeemer governments and the 1877 compromise.");
});
