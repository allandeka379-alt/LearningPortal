// Slice W3a: intolerance in 1920s America (0470 Depth study D2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.usa.intolerance", { file: "usa/intolerance", keyPrefix: "usa.intolerance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was John Scopes put on trial for teaching evolution?",
    options: [
      ["1925", "Correct: in Dayton, Tennessee."],
      ["1919", "1919 was the height of the Red Scare."],
      ["1927", "1927 was the execution of Sacco and Vanzetti."],
      ["1921", "1921 was the Emergency Quota Act."],
    ],
    answer: "A",
    explanation: "The **Scopes trial** took place in 1925.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the Attorney General behind the raids on suspected radicals after the First World War?",
    options: [
      ["A. Mitchell Palmer", "Correct: the Palmer Raids."],
      ["Andrew Mellon", "Mellon was Secretary of the Treasury."],
      ["Clarence Darrow", "Darrow was the lawyer who defended Scopes."],
      ["Marcus Garvey", "Garvey led a Black pride movement."],
    ],
    answer: "A",
    explanation: "**A. Mitchell Palmer**, whose home had been damaged by a bomb in 1919, led the raids.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which immigrants did the 1924 Immigration Act restrict most heavily?",
    options: [
      ["Those from southern and eastern Europe and Asia", "Correct: quotas were based on the 1890 census."],
      ["Those from Britain, Germany and Scandinavia", "These groups received the largest quotas."],
      ["Those from Canada and Mexico", "Immigration from the Americas was outside the quotas."],
      ["Those who had fought for the USA in the First World War", "The act did not target veterans."],
    ],
    answer: "A",
    explanation: "Basing quotas on the **1890** census favoured northern Europeans and cut southern and eastern Europeans; Asian immigration was almost ended.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why were many people concerned about the trial of Sacco and Vanzetti?",
    options: [
      ["Prejudice against radical immigrants seemed to affect it", "Correct: the judge was openly hostile."],
      ["They were tried by a court in Italy, not in the United States", "They were tried in Massachusetts."],
      ["They had confessed but were released anyway", "They always denied the crime and were executed."],
      ["The trial lasted less than one hour", "The case, with its appeals, lasted years."],
    ],
    answer: "A",
    explanation: "The evidence was disputed, and **prejudice** against Italian anarchists seemed to influence the trial.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which groups did the Ku Klux Klan target in the 1920s?",
    options: [
      ["Black Americans, Catholics, Jews and immigrants", "Correct: it promoted white Protestant supremacy."],
      ["Only Black Americans living in the South", "In the 1920s it also targeted other groups and spread north."],
      ["Only communists and anarchists", "Its targets were much wider."],
      ["Only rich bankers and businessmen", "This was not its focus."],
    ],
    answer: "A",
    explanation: "The 1920s **Klan** was hostile to Black Americans, Catholics, Jews and immigrants.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did fear of radicals grow so quickly in 1919?",
    options: [
      ["Revolution in Russia, strikes and bombs suggested a revolt", "Correct: these created the Red Scare."],
      ["Communists had won control of the US Congress in the 1918 elections", "No communists sat in Congress."],
      ["The USSR had invaded Alaska that year", "No such invasion happened."],
      ["Lenin had visited the USA to start a rising", "Lenin never visited the USA."],
    ],
    answer: "A",
    hints: ["Think about events in Russia and in American cities."],
    explanation: "The **Russian Revolution**, a wave of strikes and anarchist bombs fed the Red Scare.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Scopes trial show about American society?",
    options: [
      ["A divide between modern cities and traditional rural areas", "Correct: fundamentalists against modernists."],
      ["That all Americans now accepted the theory of evolution in schools", "Many fundamentalists rejected it."],
      ["That the Klan controlled the courts in the North", "The trial took place in Tennessee and was not about the Klan."],
      ["That immigration was the main issue in schools", "The trial was about teaching evolution."],
    ],
    answer: "A",
    hints: ["Who supported the law, and who mocked it?"],
    explanation: "The trial revealed a gap between **fundamentalist**, rural America and modern, urban America.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best suggests that intolerance declined in the later 1920s?",
    options: [
      ["Klan membership fell sharply after a scandal in 1925", "Correct: it lost millions of members."],
      ["The Immigration Act was passed in 1924", "This shows intolerance in law."],
      ["Sacco and Vanzetti were executed in 1927", "This suggests intolerance continued."],
      ["Jim Crow segregation laws continued throughout the whole decade", "This shows continuing intolerance."],
    ],
    answer: "A",
    hints: ["Which option shows a change for the better?"],
    explanation: "The **collapse of Klan membership** after 1925 suggests some decline, though segregation and quotas remained.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sacco and Vanzetti were Italian immigrants and anarchists.",
    answer: true,
    explanation: "True. They were executed in August 1927 after a disputed trial.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "John Scopes was found not guilty of teaching evolution.",
    answer: false,
    explanation: "False. He was found guilty and fined; the verdict was later overturned on a technicality.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Clarence Darrow", "Lawyer who defended John Scopes"],
      ["William Jennings Bryan", "Politician who helped the prosecution of Scopes"],
      ["Marcus Garvey", "Encouraged Black pride and self-reliance"],
      ["Nicola Sacco", "Italian anarchist executed in 1927"],
    ],
    explanation: "Darrow (defence), Bryan (prosecution), Garvey (Black pride movement), Sacco (executed with Vanzetti).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Immigration Act sets 2 per cent quotas",
      "The Ku Klux Klan is refounded",
      "Sacco and Vanzetti are executed",
      "The Palmer Raids",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The Klan was refounded before the USA entered the war."],
    explanation: "Klan refounded (1915); Palmer Raids (1919-20); Immigration Act (1924); executions (1927).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The laws that enforced segregation in the southern states were called {{blank:a}} laws. The movement of Black Americans from the South to northern cities is known as the Great {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Jim Crow"], choices: ["Jim Crow", "Volstead", "Palmer", "Quota"] },
      { id: "b", accepted: ["Migration"], choices: ["Migration", "Depression", "Awakening", "Society"] },
    ],
    explanation: "**Jim Crow** laws enforced segregation; the **Great Migration** took hundreds of thousands north.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which US state did the Scopes trial take place?",
    accepted: ["Tennessee"],
    wrong: ["Texas"],
    explanation: "In Dayton, **Tennessee**, in 1925.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the immigration quota laws passed in the early 1920s.",
    points: [
      "1921 Emergency Quota Act: 3 per cent of each nationality living in the USA in 1910.",
      "1924 Immigration Act: 2 per cent of each nationality in 1890.",
      "Fell hardest on southern and eastern Europeans; northern Europeans favoured.",
      "Asian immigration almost ended / the Americas outside the quotas.",
    ],
    modelAnswer: "The Emergency Quota Act of 1921 limited immigrants from each country to 3 per cent of the number of people of that nationality living in the USA in 1910. The Immigration Act of 1924 cut this to 2 per cent of the number in 1890, which fell hardest on southern and eastern Europeans and favoured those from northern Europe. It almost ended immigration from Asia, though immigrants from the Americas were outside the quotas.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why immigration was restricted in the 1920s.",
    points: [
      "Identifies fears about jobs and wages.",
      "Explains that immigrants were blamed for accepting low wages, especially when soldiers returned after the war.",
      "Identifies fear of radicalism (Red Scare) / nativism.",
      "Explains that immigrants were linked with communism and anarchism and seen as a threat to Protestant, English-speaking culture.",
    ],
    hints: ["Economic fears and political or cultural fears."],
    modelAnswer: "Many Americans believed that immigrants took jobs and kept wages low, a fear that grew when soldiers returned after the war. The Red Scare also linked immigrants from eastern and southern Europe with communism and anarchism, and nativists believed that Catholic and Jewish newcomers threatened the Protestant, English-speaking culture they wanted America to keep.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how Black Americans were discriminated against in the 1920s.",
    points: [
      "Identifies Jim Crow segregation in the South.",
      "Explains that schools, transport and public places were separated and facilities were unequal.",
      "Identifies denial of the vote / lynching.",
      "Explains that tests and taxes kept most southern Black people from voting, and mob murders went unpunished with no federal law.",
      "Identifies discrimination in the North and the Klan.",
      "Explains that migrants found the worst jobs and housing, faced race riots, and the Klan used intimidation and violence.",
    ],
    hints: ["Law, violence and the economy."],
    modelAnswer: "In the South, Jim Crow laws segregated schools, transport and public places, and the facilities for Black people were worse. Literacy tests and poll taxes kept most southern Black people from voting, and lynching continued without a federal law to stop it. Those who moved north in the Great Migration usually found only the worst-paid jobs and poor housing, and there were race riots in 1919. The revived Ku Klux Klan used intimidation and violence against Black Americans.",
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a leaflet of the kind distributed by nativist groups after the First World War", "Keep America American! Every ship from Naples and Odessa brings men who do not speak our language, who bow to foreign priests or foreign creeds, and who work for wages no decent American family could live on. Close the gates before it is too late.")}\n\n${source("Source B", "a letter from a fictional Polish-born steelworker in Pittsburgh to a newspaper, 1924", "I came here as a young man before the war and have worked in the mill ever since. My son was born here and served in France in the war. Now Congress says people from my village are not wanted. We built your railways and your bridges. What more must we do to be Americans?")}`,
    hints: ["What does each writer want readers to feel?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reasons for restricting immigration does Source A give?", points: [
        "Immigrants do not speak English / have foreign religions (cultural fear).",
        "Immigrants accept low wages (economic fear).",
      ], explanation: "Two reasons from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How does Source B respond to the arguments of Source A?", points: [
        "Challenges the idea that immigrants are not loyal: his son served in the war.",
        "Challenges economic harm: immigrants built the railways and bridges.",
        "Shows he has settled and become American (many years in the mill, son born in the USA).",
        "Shows the effect of the 1924 Act on people from his region.",
      ], explanation: "Specific responses." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for understanding why immigration was restricted after the First World War?", points: [
        "A: propaganda, exaggerated, but shows nativist arguments directly.",
        "B: one immigrant's view; shows the effects and the counter-argument, not the causes.",
        "Own knowledge: Red Scare linking immigrants with radicalism (missing from both).",
        "Own knowledge: quotas of 1921 and 1924 targeted southern and eastern Europeans, as A implies.",
        "Together they show both sides of the debate.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is very useful for the reasons behind restriction, because it shows nativist arguments directly: immigrants from southern and eastern Europe were said to speak foreign languages, follow foreign religions and work for low wages. As propaganda it exaggerates, but its fears match the 1924 Act, which targeted these groups. Source B is less useful for the causes, since it gives one immigrant's response, but it shows the effects of the law and the argument that immigrants had already become loyal Americans. Neither source mentions the Red Scare, which my own knowledge shows was a major reason why immigrants were feared after 1919. Together the sources are useful for showing the debate, but own knowledge is needed for a full explanation.", explanation: "Provenance, content and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider different kinds of intolerance and the evidence of opposition."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Scopes trial.", points: [
        "Tennessee law (Butler Act) banned teaching evolution in state schools.",
        "John Scopes, a teacher in Dayton, was tried in 1925.",
        "Clarence Darrow defended; William Jennings Bryan helped the prosecution; huge publicity ('Monkey Trial').",
        "Scopes found guilty and fined; later overturned on a technicality.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How widespread was intolerance in the USA in the 1920s?", points: [
        ["Widespread: immigration quotas passed by Congress; Red Scare across the country", 2],
        ["Widespread: Jim Crow, lynching; Klan with several million members, beyond the South", 2],
        ["Limited: Red Scare faded by 1920-21; Klan collapsed after 1925", 2],
        ["Limited: protests over Sacco and Vanzetti; Scopes trial mocked; Harlem Renaissance and the NAACP", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Intolerance was widespread in many forms. Congress passed the immigration quotas of 1921 and 1924, showing that hostility to southern and eastern Europeans and Asians had wide support. The Red Scare led to the arrest of thousands in the Palmer Raids. In the South, Jim Crow laws and lynching oppressed Black Americans, and the Klan spread far beyond the South, with several million members by the mid-1920s, targeting Black Americans, Catholics, Jews and immigrants.\n\nHowever, intolerance was challenged and some forms faded. The Red Scare died down after 1920, and the Klan collapsed after its scandal in 1925. Many Americans protested against the treatment of Sacco and Vanzetti, and the national press mocked the prosecution of Scopes. Black Americans organised through the NAACP and created the Harlem Renaissance.\n\nIntolerance was widespread, because much of it was written into law and supported by millions, but it was not universal: it was strongest in the early and mid-1920s, and in rural areas and the South, and it was resisted throughout.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Nativism", "The belief that native-born (white, Protestant) Americans should be favoured over immigrants.");
  b.card("FACT", "What did the 1924 Immigration Act do?", "Set quotas of 2 per cent of each nationality in 1890, cutting southern and eastern Europeans and almost ending Asian immigration.");
  b.card("DEFINITION", "Red Scare", "Fear of communists and other radicals in the USA, at its height in 1919-20.");
  b.card("FACT", "When were Sacco and Vanzetti executed?", "August 1927, after a trial many thought unfair.");
  b.card("FACT", "What was the Scopes trial?", "The 1925 trial in Tennessee of a teacher who taught evolution; he was found guilty and fined.");
  b.card("DEFINITION", "Jim Crow laws", "Laws in the southern states that enforced racial segregation.");
  b.card("CONCEPT", "Why did the Klan decline after 1925?", "A leader in Indiana was convicted of murder, exposing its hypocrisy, and membership collapsed.");
  b.card("CONCEPT", "Why was the Sacco and Vanzetti case controversial?", "The evidence was disputed and prejudice against them as Italian anarchists seemed to affect the trial.");
  b.card("CONCEPT", "Why did the Red Scare happen?", "The Russian Revolution, strikes and anarchist bombings in 1919 made many fear revolution.");
});
