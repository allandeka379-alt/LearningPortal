// Slice W4a: the Weimar Republic, 1918-1923 (0470 Depth study B, key question 1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.germany.weimar-1918-23", { file: "germany/weimar-1918-23", keyPrefix: "germany.weimar-1918-23" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who became the first President of the Weimar Republic?",
    options: [
      ["Friedrich Ebert", "Correct: the SPD leader, President from 1919 to 1925."],
      ["Paul von Hindenburg", "Hindenburg was elected President in 1925, after Ebert died."],
      ["Gustav Stresemann", "Stresemann was Chancellor in 1923 and later foreign minister."],
      ["Wolfgang Kapp, the nationalist politician", "Kapp led the failed putsch of 1920."],
    ],
    answer: "A",
    explanation: "**Friedrich Ebert** led the government from November 1918 and was President from 1919.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Article 48 of the Weimar Constitution allow?",
    options: [
      ["The President to rule by decree in an emergency", "Correct: without the Reichstag's approval."],
      ["Women over 20 to vote in Reichstag elections", "Women's votes were in the constitution, but not in Article 48."],
      ["The German states to leave the republic if they wished", "No article allowed this."],
      ["The army to choose the Chancellor if parliament could not agree", "The President appointed the Chancellor."],
    ],
    answer: "A",
    explanation: "**Article 48** gave the President emergency powers to govern by decree.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which group led the rising in Berlin in January 1919?",
    options: [
      ["The Spartacists", "Correct: communists led by Luxemburg and Liebknecht."],
      ["The Nazi Party", "The Nazis' putsch came in Munich in November 1923."],
      ["The Freikorps", "The Freikorps helped to crush the rising."],
      ["The Centre Party of the Catholic voters", "The Centre Party supported the republic."],
    ],
    answer: "A",
    explanation: "The **Spartacists** were communists who wanted a revolution like Russia's.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why was the Kapp Putsch of 1920 defeated?",
    options: [
      ["A general strike stopped Berlin from working", "Correct: Kapp could not govern."],
      ["The army fired on the Freikorps in the streets of Berlin", "The army refused to act against the putsch."],
      ["French troops entered Berlin to protect the government", "There was no French intervention."],
      ["Hitler persuaded the Freikorps to withdraw", "Hitler played no part in 1920."],
    ],
    answer: "A",
    explanation: "The trade unions' **general strike** shut down the capital, and Kapp fled after four days.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did French and Belgian troops occupy the Ruhr in January 1923?",
    options: [
      ["Germany had failed to make reparation payments", "Correct: they took coal and goods instead."],
      ["Germany had sent troops into the demilitarised Rhineland", "This happened in 1936."],
      ["The Ruhr workers had asked France for protection", "The workers resisted the occupation."],
      ["The League of Nations had ordered them to do so", "The occupation was not a League decision."],
    ],
    hints: ["Think about the money Germany owed under the Treaty of Versailles."],
    answer: "A",
    explanation: "Germany fell behind with **reparations**, so France and Belgium seized the Ruhr's production.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which group was hit hardest by the hyperinflation of 1923?",
    options: [
      ["People living on savings or pensions", "Correct: their money became worthless."],
      ["Businesses that had borrowed large sums of money", "Debtors could repay loans with worthless money."],
      ["Farmers who owned land and produced food", "Land and food kept their real value."],
      ["The government, which owed money inside Germany", "The government's internal debts were wiped out."],
    ],
    hints: ["Who loses when money loses its value: lenders or borrowers?"],
    answer: "A",
    explanation: "**Savers and pensioners**, often middle class, lost almost everything; debtors gained.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why was the agreement between Ebert and the army leadership in November 1918 a long-term weakness?",
    options: [
      ["It left officers who disliked democracy in place", "Correct: shown when the army refused to act against Kapp."],
      ["It gave the army control of the Reichstag elections", "The army did not run elections."],
      ["It made the army much larger than Versailles allowed", "The army was cut to 100,000 men."],
      ["It forced Ebert to restore the Kaiser after one year", "The Kaiser was never restored."],
    ],
    hints: ["Who commanded the army after 1918, and what did they think of the republic?"],
    answer: "A",
    explanation: "The republic depended on an **army run by officers hostile to democracy**, as the Kapp Putsch showed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What was the main political effect of the 'stab in the back' myth?",
    options: [
      ["It linked the new democracy with defeat", "Correct: republican politicians were blamed for losing the war."],
      ["It persuaded Germans to accept the war guilt clause", "It encouraged Germans to reject it."],
      ["It made the Social Democrats the most trusted party", "It was aimed against socialists and politicians."],
      ["It led the Allies to cut reparations in the early 1920s", "Reparations were not cut until 1924."],
    ],
    hints: ["Who did the myth blame for Germany's defeat?"],
    answer: "A",
    explanation: "By blaming socialists and politicians, the myth **tied the republic to defeat** and humiliation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the Weimar Constitution, women had the right to vote in Reichstag elections.",
    answer: true,
    explanation: "True. All men and women over 20 could vote; women first voted in January 1919.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Proportional representation usually gave one party a clear majority in the Reichstag.",
    answer: false,
    explanation: "False. It let many small parties win seats, so no party had a majority and governments were coalitions.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Rosa Luxemburg", "Spartacist leader murdered in January 1919"],
      ["Wolfgang Kapp", "Nationalist who tried to seize power in 1920"],
      ["Walther Rathenau", "Foreign minister murdered in 1922"],
      ["Matthias Erzberger", "Politician who signed the armistice, murdered in 1921"],
    ],
    explanation: "Luxemburg (Spartacist), Kapp (putsch of 1920), Rathenau (murdered 1922), Erzberger (murdered 1921).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Kapp Putsch",
      "French and Belgian troops enter the Ruhr",
      "The Kaiser abdicates",
      "The Spartacist rising",
    ],
    right: POS,
    rightIndex: [2, 3, 0, 1],
    hints: ["The left-wing rising came a year before the right-wing putsch."],
    explanation: "Kaiser abdicates (November 1918); Spartacist rising (January 1919); Kapp Putsch (March 1920); Ruhr (January 1923).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Reichstag elections used {{blank:a}}, and the President was elected every {{blank:b}} years.",
    blanks: [
      { id: "a", accepted: ["proportional representation"], choices: ["proportional representation", "first past the post", "a single-party list", "an electoral college"] },
      { id: "b", accepted: ["seven"], choices: ["seven", "four", "five", "ten"] },
    ],
    explanation: "Seats were shared by **proportional representation**; the President served **seven** years (the Reichstag at most four).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name did nationalists give to the politicians who agreed to the armistice of 1918? (two words)",
    accepted: ["November criminals", "the November criminals", "November criminal"],
    wrong: ["Spartacists"],
    explanation: "Nationalists called them the **November criminals**, after the month of the armistice.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the strengths of the Weimar Constitution.",
    points: [
      "All men and women over 20 could vote.",
      "Proportional representation gave seats fairly in proportion to votes.",
      "Basic rights guaranteed (speech, press, religion, assembly).",
      "An elected President and a Reichstag that made laws and controlled the budget / government answerable to the Reichstag.",
    ],
    modelAnswer: "The constitution was very democratic. All men and women over 20 could vote, and proportional representation meant every party received seats in proportion to its votes. It guaranteed basic rights such as freedom of speech, the press, religion and assembly. The President was elected by the people, the Reichstag made laws and controlled the budget, and the Chancellor needed the Reichstag's support.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the occupation of the Ruhr led to hyperinflation.",
    points: [
      "Identifies passive resistance / the strike in the Ruhr.",
      "Explains that the government had to pay striking workers while losing the Ruhr's production and taxes.",
      "Identifies printing money.",
      "Explains that more money chasing fewer goods made prices rise ever faster until the mark became worthless.",
    ],
    hints: ["Follow the money: who had to be paid, and where did the money come from?"],
    modelAnswer: "The government ordered passive resistance, so Ruhr workers went on strike, and it had to pay them while losing the coal, goods and taxes the Ruhr produced. It paid by printing more and more money. With far more money and fewer goods, prices rose ever faster, and by November 1923 the mark was worthless.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Weimar Republic faced so much opposition in the years 1919-23.",
    points: [
      "Identifies Versailles / the stab-in-the-back myth.",
      "Explains that the republic was blamed for defeat and the Diktat, so nationalists saw it as traitors.",
      "Identifies left-wing opposition.",
      "Explains that communists wanted a revolution like Russia's and rose in 1919 (Spartacists).",
      "Identifies economic hardship.",
      "Explains that reparations, the Ruhr and hyperinflation ruined many and turned them against the republic.",
    ],
    hints: ["Opposition came from both the right and the left, and from economic suffering."],
    modelAnswer: "The republic was born in defeat. Nationalists blamed it for the armistice and the Treaty of Versailles, calling its leaders 'November criminals' and claiming the army had been stabbed in the back, so the far right saw the republic as traitors, leading to the Kapp Putsch and political murders. On the left, communists wanted a revolution like the one in Russia and rose in Berlin in January 1919. Economic hardship added to this: reparations, the Ruhr occupation and the hyperinflation of 1923 ruined many middle-class families, who blamed the republic.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a diary entry by a fictional retired schoolteacher in Leipzig, October 1923", "Forty years of saving, and today my whole account would not buy a sack of potatoes. The pension arrived this morning; by evening it was worth half as much. My neighbour, who owes the bank for his workshop, laughs that he has paid it off with one week's takings. They call this a republic. I call it robbery.")}\n\n${source("Source B", "a report by a fictional British businessman visiting Germany, written for his company in London, November 1923", "Prices in the shops are changed several times a day. Workers are paid twice daily and their wives wait at the factory gates to spend the notes before they lose their value. Foreigners with pounds or dollars live like princes. Yet some great industrialists here have grown richer than ever, buying up smaller firms that cannot survive.")}`,
    hints: ["Who gained and who lost? Compare the two writers' positions."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the effects of hyperinflation?", points: [
        "Savers and pensioners lost their money.",
        "Debtors gained / people blamed the republic.",
      ], explanation: "Two supported inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B support Source A?", points: [
        "Supports: money lost value within hours (pension halved; prices changed several times a day).",
        "Supports: some people gained (A's debtor; B's industrialists and foreigners).",
        "Difference: B describes workers coping by spending quickly; A is about savers ruined.",
        "Difference: A is angry and blames the republic; B is a detached observation.",
      ], explanation: "Agreement and difference, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful are these sources for explaining why the crisis of 1923 weakened support for the Weimar Republic?", points: [
        "A: useful for middle-class anger and blame of the republic ('robbery').",
        "A: one person's private view, but typical of savers (own knowledge).",
        "B: useful for the wider picture of who gained and lost; an outsider writing for business with no political motive.",
        "B: does not mention political attitudes directly.",
        "Own knowledge: Ruhr occupation, printing money, lasting loss of middle-class trust; Munich Putsch.",
        "Supported judgement on usefulness.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it shows the anger of a middle-class saver who has lost forty years of savings and blames the republic, calling it robbery. It is only one private diary, but my own knowledge confirms that savers and pensioners were ruined in 1923 and that many never trusted the republic again. Source B is useful for the wider picture: it shows that workers could cope by spending quickly, while industrialists and foreigners gained. As a business report written for a company abroad it has no reason to take sides, but it says nothing about political attitudes. Together they explain why resentment grew, though neither covers the Ruhr occupation or the Munich Putsch, so they need to be combined with own knowledge.", explanation: "Usefulness judged from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), set the republic's weaknesses against the evidence that it survived."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Kapp Putsch of 1920.", points: [
        "March 1920: Freikorps units, angry at being disbanded, marched into Berlin.",
        "Declared Wolfgang Kapp head of a new government.",
        "The army refused to fire on them; the government left Berlin.",
        "Trade unions called a general strike; the putsch collapsed after four days.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "'The Weimar Republic was doomed from the start.' How far do you agree with this view of the years 1918-23?", points: [
        ["Agree: born in defeat; blamed for Versailles; stab-in-the-back myth", 2],
        ["Agree: constitutional weaknesses (proportional representation, Article 48) and a hostile army and judiciary", 2],
        ["Disagree: it survived the Spartacists, Kapp, political murders and 1923", 2],
        ["Disagree: most voters backed republican parties in 1919; recovery under Stresemann after 1923", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "There are strong reasons to think the republic was doomed. It was born in defeat, and nationalists blamed it for the armistice and the Treaty of Versailles through the 'November criminals' and 'stab in the back' myths. Its constitution had weaknesses: proportional representation produced unstable coalitions, and Article 48 allowed rule by decree. The army, judges and civil servants were left over from the empire, and in 1920 the army refused to defend the government against Kapp.\n\nOn the other hand, the republic survived everything thrown at it in 1919-23: the Spartacist rising, the Kapp Putsch, a wave of political murders, the Ruhr occupation, hyperinflation and the Munich Putsch. In January 1919 over three-quarters of voters supported parties that backed the republic, and the general strike of 1920 showed that workers would defend it. From late 1923 it recovered under Stresemann.\n\nI disagree with the statement. The republic began with serious weaknesses that later made it vulnerable, but its survival in 1919-23 shows that it was not doomed; it was the Depression after 1929 that destroyed it.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did the Kaiser abdicate and the republic begin?", "9 November 1918.");
  b.card("DEFINITION", "Article 48", "The constitutional power of the President to rule by decree in an emergency.");
  b.card("DEFINITION", "Proportional representation", "Seats shared in proportion to each party's votes; it produced many parties and coalition governments.");
  b.card("DEFINITION", "Stab-in-the-back myth", "The false claim that the army was not defeated in 1918 but betrayed by politicians and others at home.");
  b.card("FACT", "What was the Spartacist rising?", "A communist rising in Berlin in January 1919, crushed by the army and Freikorps.");
  b.card("FACT", "What was the Kapp Putsch?", "A right-wing attempt to seize Berlin in March 1920, defeated by a general strike.");
  b.card("FACT", "When did France and Belgium occupy the Ruhr?", "January 1923, after Germany fell behind with reparations.");
  b.card("FACT", "How much was 1 US dollar worth in marks in November 1923?", "About 4.2 trillion marks.");
  b.card("CONCEPT", "Who lost and who gained from hyperinflation?", "Savers and pensioners lost; debtors, the government and some industrialists gained.");
  b.card("CONCEPT", "Why was the Weimar Republic weak from the start?", "Born in defeat, blamed for Versailles, unstable coalitions, Article 48, and a hostile army and judiciary.");
});
