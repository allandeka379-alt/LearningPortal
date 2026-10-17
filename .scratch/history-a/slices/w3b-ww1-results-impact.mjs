// W3b: ahist.ww1.results-impact (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.ww1.results-impact", { file: "ww1/results-impact", keyPrefix: "ww1.results-impact" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which four empires collapsed as a result of the First World War?",
    options: [
      ["The German, Austrian, Russian and Ottoman empires", "Correct: all four lost their rulers by 1922."],
      ["The British, French, Belgian and Portuguese empires", "These colonial empires survived the war."],
      ["The Italian, Japanese, Spanish and Dutch empires", "None of these collapsed because of the war."],
      ["The Austro-Hungarian, Swedish, Danish and Greek empires", "Sweden and Denmark were not empires and Greece was not one."],
    ],
    answer: "A",
    explanation: "The Romanov, Hohenzollern, Habsburg and Ottoman dynasties all lost their thrones between 1917 and 1922.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happened to the former German colonies in Africa after the war?",
    options: [
      ["They became mandates under the League, run by the victorious powers", "Correct: Britain, France, Belgium and South Africa administered them."],
      ["They became independent states, run by the elected African leaders", "They did not become independent."],
      ["They were returned to Germany after the Treaty of Versailles was signed", "Germany lost all its colonies."],
      ["They were given to the United States as payment for its war loans", "The United States took no African mandates."],
    ],
    answer: "A",
    explanation: "Tanganyika went to Britain, South-West Africa to South Africa, Ruanda-Urundi to Belgium, and Togoland and Cameroon were divided between Britain and France.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which economic change followed the war?",
    options: [
      ["The United States became the leading creditor country in the world", "Correct: European states owed large debts to American banks and government."],
      ["Britain replaced the United States as the largest lender to Europe", "Britain owed debts to the United States."],
      ["Germany became the largest exporter of grain to the countries of Africa", "Germany was weakened by the war."],
      ["Russia became the main supplier of loans to the new states of Europe", "Russia was in revolution and civil war."],
    ],
    answer: "A",
    hints: ["Think of who lent money to the Allies during the war."],
    explanation: "The war moved financial strength across the Atlantic. The Allies owed large sums to the United States, which became the world's major creditor.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the war contribute to the extension of the vote to women in several countries?",
    options: [
      ["Women's war work in industry weakened arguments against their rights", "Correct: women's contribution was recognised, along with other factors."],
      ["The treaties of peace ordered every state to give women the vote", "The treaties did not order this."],
      ["Men refused to return to work until their wives were allowed to vote", "No such protest took place."],
      ["The influenza pandemic killed most male voters in the European states", "It did not kill most male voters."],
    ],
    answer: "A",
    hints: ["Think of what women did while men were fighting."],
    explanation: "Women's work in factories, transport and nursing was widely recognised. Britain granted the vote to women over 30 in 1918, and Germany and the United States soon followed, though other long-term causes also mattered.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the 1918-19 influenza pandemic spread so widely?",
    options: [
      ["Troops and ships carried the disease across several continents", "Correct: wartime movement helped the spread."],
      ["The disease was released by the German army in its chemical weapons", "The cause was not a weapon."],
      ["It was brought to Europe by cattle sent as food from Africa", "It was not spread by cattle."],
      ["It began only after the signing of the Treaty of Versailles in 1919", "It began in 1918 and spread in waves."],
    ],
    answer: "A",
    hints: ["Think of wartime movement."],
    explanation: "The movement of troops, sailors and travellers, together with crowded camps and weak health systems, carried the virus to Europe, Africa and Asia; death tolls are uncertain.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What effect did the war have on attitudes in the African colonies?",
    options: [
      ["Africans saw Europeans fighting one another, weakening their prestige", "Correct: ideas of European superiority were questioned."],
      ["Africans accepted colonial rule more readily as a reward for the war", "Many were disappointed and resentful."],
      ["Africans were given the vote in all the colonies as a reward for service", "The vote was not granted to Africans."],
      ["Africans formed armies that drove the Europeans out of the continent", "No such success took place."],
    ],
    answer: "A",
    hints: ["Think of what African soldiers and carriers saw and experienced."],
    explanation: "Service in the war and the sight of Europeans at war weakened the myth of European superiority, and some veterans and educated Africans began to demand rights; historians also stress other causes of nationalism.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the 'stab in the back' idea in Germany is supported by the evidence?",
    options: [
      ["It was a myth that blamed civilians for the army's defeat", "Correct: Germany had been defeated in the field in 1918."],
      ["It was true, since the army had won every battle in 1918", "The army was retreating from August 1918."],
      ["It was a British claim designed to weaken the German republic", "It was a German nationalist claim."],
      ["It referred to the Kaiser's secret agreement with the Allies", "It referred to alleged betrayal at home."],
    ],
    answer: "A",
    hints: ["Think of what happened on the Western Front from August 1918."],
    explanation: "The German army had been pushed back by the Allies, but nationalists claimed that politicians, socialists and Jews had betrayed it. The claim damaged the republic.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that the war's most important result was political?",
    options: [
      ["The fall of four empires and new states with disputed borders", "Correct: the political map changed, with lasting tensions."],
      ["The deaths of millions of soldiers in the trenches of the Western Front", "This is a human result, not a political one."],
      ["The loss of jobs by women when the men returned from the front", "This is a social result."],
      ["The debts owed by European governments to the United States", "This is an economic result."],
    ],
    answer: "A",
    hints: ["Which evidence concerns governments and borders?"],
    explanation: "The political consequences, the end of the empires and the new borders and minorities, shaped international relations for the next generation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The United States Senate refused to ratify the Treaty of Versailles.",
    answer: true,
    explanation: "True. The United States did not join the League of Nations, which weakened it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The First World War caused no change in the position of Africa, because it was fought only in Europe.",
    answer: false,
    explanation: "False. Fighting took place in Africa, Africans served as soldiers and carriers, and the former German colonies became mandates.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree on the exact number of people who died in the war and the influenza pandemic.",
    answer: false,
    hints: ["Remember that figures are estimates."],
    explanation: "False. All figures are estimates and vary, particularly for civilian deaths and the influenza pandemic.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each former German territory with its fate after the war.",
    pairs: [
      ["Alsace-Lorraine", "Returned to France"],
      ["Tanganyika", "British mandate"],
      ["South-West Africa", "South African mandate"],
      ["The Saar", "Placed under the League of Nations for fifteen years"],
    ],
    explanation: "Germany lost territory in Europe and all its colonies.",
  });
  {
    const events = [
      "The Tsar of Russia abdicates",
      "The German Kaiser abdicates",
      "The Treaty of Versailles is signed",
      "The Ottoman sultanate is abolished",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are March 1917, November 1918, June 1919 and 1922."],
      explanation: "March 1917; 9 November 1918; 28 June 1919; 1922.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Territories taken from Germany and the Ottoman Empire were placed under the League of Nations as {{blank:a}}, and the leading creditor country after the war was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["mandates"], choices: ["mandates", "colonies", "dominions", "protectorates"] },
      { id: "b", accepted: ["United States"], choices: ["United States", "Britain", "France", "Japan"] },
    ],
    explanation: "The League supervised mandates; the United States was the main creditor.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which American president promoted the principle of self-determination in 1918? Give his surname.",
    accepted: ["Wilson", "Woodrow Wilson", "President Wilson"],
    wrong: ["Roosevelt"],
    explanation: "**Wilson**, who set out the Fourteen Points in January 1918.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the political results of the First World War in Europe.",
    points: ["The German, Austro-Hungarian and Russian monarchies fell (and the Ottoman sultanate later)", "New states such as Poland, Czechoslovakia and Yugoslavia were created", "Russia became a communist state", "The League of Nations was set up"],
    modelAnswer: "The German, Austro-Hungarian and Russian monarchies fell, and the Ottoman sultanate was abolished later. New states such as Poland, Czechoslovakia and Yugoslavia were created. Russia became a communist state, and the League of Nations was set up.",
    explanation: "One mark for each result described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the war changed the position of women in Europe.",
    points: [["Women worked in factories, transport, farms and nursing, showing that they could do work previously done by men", 2], ["This helped women to gain the vote in countries such as Britain (over 30, 1918) and Germany, although many lost their jobs when men returned", 2]],
    hints: ["Think of work, the vote and the limits of change."],
    modelAnswer: "Women worked in factories, transport, farms and nursing, showing that they could do jobs previously done by men. This helped women to gain the vote in countries such as Britain, for women over 30 in 1918, and in Germany, although many lost their jobs when the men returned.",
    explanation: "One mark for each point and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the war affected Africa.",
    points: [["Former German colonies became mandates administered by Britain, France, Belgium and South Africa, without consulting Africans", 2], ["Africans served as soldiers and carriers, many died, and the sight of Europeans fighting each other weakened European prestige, though the war was not the only cause of nationalism", 2]],
    hints: ["Think of territory and of people."],
    modelAnswer: "The former German colonies became mandates administered by Britain, France, Belgium and South Africa, without consulting Africans. Africans served as soldiers and carriers and many died, and seeing Europeans fight each other weakened European prestige, although the war was not the only cause of nationalism.",
    explanation: "One mark for each point and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a table prepared for this question from widely cited estimates (rounded; estimates differ)",
        "Soldiers killed (estimates, millions): Russia 1.8; Germany 2.0; France 1.4; Austria-Hungary 1.1; British Empire 0.9. The totals of civilian deaths are uncertain and are estimated at several million."),
      "",
      source("Source B", "a speech by a fictional African teacher at a meeting in the early 1920s",
        "Our sons carried the loads and died of fever in the forests, and many of us paid the tax that built the war. We were told that this was a war for freedom. Where is our freedom? The white man has learnt that he can make war on himself, and we have learnt that we can ask for our rights."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the human cost of the war?", points: ["Several nations lost more than a million soldiers", "Civilian deaths were also high but uncertain"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of the results of the war.", points: [["Agree: both refer to heavy losses of life", 2], ["Differ: A gives estimates of deaths by country and concerns Europe; B concerns African experience, taxes and attitudes to rights", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the effects of the First World War?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A gives rounded estimates and is useful for scale, but numbers vary and it excludes civilians and some countries", 2], ["B is a speech made to persuade, so it may be emphatic, but it shows African attitudes after the war and the link with later demands", 2], ["Own knowledge: the mandates, carriers, taxes and Pan-African demands confirm B; the figures in A are within accepted ranges, but neither source covers economic or political results", 2]], modelAnswer: "Source A is useful because it shows the scale of military deaths in the main countries, but the figures are rounded estimates, vary between historians, and exclude civilians. Source B is useful because it records an African view of the war's costs and the link between service and demands for rights. As a speech it was made to persuade and uses strong language, and it speaks for one teacher. My own knowledge supports it: Africans served as carriers, paid taxes and met disappointment, and a Pan-African Congress met in 1919. Neither source deals with the economic or political results, so they are useful on human and colonial effects only." }),
    ],
    hints: ["For (c), consider the purpose of each source and the results it ignores."],
    explanation: "Both sources are invented: a table of rounded estimates and a speech.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Which was the most important result of the First World War: political, economic or social? Explain your answer.",
    levels: levels(8),
    points: [
      ["Political: four empires fell, new states and minorities, the League, communist Russia", 2],
      ["Economic: debts, inflation, the United States as creditor, reparations", 2],
      ["Social: women's work and the vote, unions, losses and the influenza pandemic", 2],
      ["Judgement on which was most important, with a reason", 2],
    ],
    hints: ["Choose one result and test it against the others."],
    modelAnswer: "The political results were the most important. The fall of the German, Austro-Hungarian, Russian and Ottoman empires created new states, many with large minorities, and left Germany humiliated, with a weak republic, while communist Russia alarmed other governments. These conditions helped to cause the Second World War. The economic results, such as debts, inflation and the rise of the United States as the leading creditor, were serious, but they mattered mostly because they weakened the new governments. The social results, such as the vote for women and the influenza pandemic, changed daily life but did not shape relations between states in the same way. I conclude that the political results were the most important because the economic and social effects worked through them.",
    explanation: "Credit developed factors, comparison and a supported judgement.",
  });

  b.card("DEFINITION", "What was a mandate?", "A former German or Ottoman territory placed by the League of Nations under the administration of a victorious power.");
  b.card("DEFINITION", "What is self-determination?", "The principle that peoples should choose their own government, promoted by Woodrow Wilson in 1918.");
  b.card("FACT", "Which four empires fell as a result of the war?", "The German, Austro-Hungarian, Russian and Ottoman empires.");
  b.card("FACT", "What was the estimated number of soldiers killed in the war?", "About nine to ten million (an estimate; total deaths including civilians commonly 15-20 million).");
  b.card("FACT", "What happened to German colonies in Africa?", "They became mandates: Tanganyika (Britain), Togoland and Cameroon (Britain and France), South-West Africa (South Africa), Ruanda-Urundi (Belgium).");
  b.card("FACT", "When did women over 30 gain the vote in Britain?", "1918.");
  b.card("CONCEPT", "How did the war change the world economy?", "Europe was in debt, the United States became the leading creditor, and inflation and reparations caused disputes.");
  b.card("CONCEPT", "What was the 'stab in the back' myth?", "The German nationalist claim that the army was betrayed at home in 1918, though it had been pushed back by the Allies.");
  b.card("CONCEPT", "How did the war affect African attitudes?", "Soldiers and carriers saw Europeans fighting each other, weakening European prestige and encouraging demands for rights.");
});
