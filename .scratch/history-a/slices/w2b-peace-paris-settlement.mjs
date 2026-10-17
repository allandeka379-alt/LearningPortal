// W2b: ahist.peace.paris-settlement (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.peace.paris-settlement", { file: "peace/paris-settlement", keyPrefix: "peace.paris-settlement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Treaty of Versailles signed?",
    options: [
      ["28 June 1919", "Correct: in the Hall of Mirrors at Versailles."],
      ["11 November 1918", "This is the date of the armistice."],
      ["8 January 1918", "This is the date of Wilson's Fourteen Points."],
      ["1 September 1939", "This is the date of the German invasion of Poland."],
    ],
    answer: "A",
    explanation: "The Treaty of Versailles was signed on 28 June 1919, five years to the day after the assassination at Sarajevo.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did France's leader Georges Clemenceau most want from the peace settlement?",
    options: [
      ["Security against Germany, with Germany weakened and made to pay", "Correct: France had been invaded twice in fifty years."],
      ["A peace based on the Fourteen Points and the equality of all nations", "That was Wilson's aim."],
      ["A treaty that would leave Germany as strong and rich as before", "Clemenceau wanted Germany weakened."],
      ["The return of France's colonies in Asia to their original rulers", "That was not his aim."],
    ],
    answer: "A",
    explanation: "Clemenceau wanted security: a weakened Germany, the Rhineland controlled, Alsace-Lorraine returned and reparations.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which clause of the Treaty of Versailles made Germany accept responsibility for the war?",
    options: [
      ["Article 231, the war guilt clause", "Correct: it was the basis for reparations."],
      ["Article 10, the collective security clause", "Article 10 was in the League Covenant."],
      ["Article 16, the economic sanctions clause", "Article 16 was also in the League Covenant."],
      ["Article 1, the founding of the League of Nations", "This article concerned the League's membership."],
    ],
    answer: "A",
    explanation: "Article 231, the war guilt clause, made Germany accept responsibility for loss and damage and was the legal basis for reparations.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "What happened to Germany's colonies under the Paris settlement?",
    options: [
      ["They were taken and became mandates under the League, run by victorious powers", "Correct: Africans were not consulted."],
      ["They were given immediate independence under governments chosen by their peoples", "They did not become independent."],
      ["They were returned to Germany after it paid the first reparations", "They were not returned."],
      ["They were handed to the United States, which ruled them directly", "The US took no mandates."],
    ],
    answer: "A",
    hints: ["Think of South West Africa, Tanganyika and Togoland."],
    explanation: "Germany's colonies were placed under League mandates administered by Britain, France, Belgium, South Africa and others.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Germans describe the Treaty of Versailles as a Diktat?",
    options: [
      ["They were not allowed to negotiate and had to accept terms dictated to them", "Correct: the treaty was presented for signature."],
      ["The treaty was written in German and signed by the Kaiser himself in person", "The treaty was written by the Allies."],
      ["The treaty left Germany free to decide its own armed forces and borders alone", "It limited both."],
      ["The treaty was based on the Fourteen Points that Germany itself had suggested", "Germany did not write the Points."],
    ],
    answer: "A",
    hints: ["Diktat means a dictated settlement."],
    explanation: "Germany was excluded from the negotiations and given the treaty to sign under threat of renewed war.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which term of the Treaty of Versailles limited German armed forces?",
    options: [
      ["An army of 100,000 volunteers with no tanks, military aircraft or submarines at all", "Correct: this limited military power."],
      ["A requirement that every German adult serve in the army for three years", "Conscription was forbidden."],
      ["A ban on all German ships of every size", "A small navy was permitted."],
      ["A rule that Germany could build as many tanks as it liked", "Tanks were forbidden."],
    ],
    answer: "A",
    hints: ["Think of the 100,000 figure."],
    explanation: "The army was limited to 100,000 volunteers, with no tanks, military aircraft or submarines, and the Rhineland was demilitarised.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which argument supports the view that the Treaty of Versailles was too harsh?",
    options: [
      ["Reparations, war guilt and the loss of land caused lasting German resentment", "Correct: this argument was made by Keynes and others."],
      ["Germany remained united and was the largest economy in Europe after the war", "This supports the view that it was not harsh enough."],
      ["The treaty was milder than the Treaty of Brest-Litovsk imposed on Russia in 1918", "This supports the view that it was not harsh."],
      ["The USA did not ratify the treaty, so enforcement of its terms was weak", "This is an argument about enforcement."],
    ],
    answer: "A",
    hints: ["Which statement describes the effects on Germany's feelings?"],
    explanation: "Critics such as Keynes argued that the reparations, war guilt and territorial losses were unjust and caused resentment.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best weighs the Paris settlement as a whole?",
    options: [
      ["It was a compromise, harsh enough to cause resentment but too weak to hold Germany down", "Correct: it records both sides."],
      ["It was completely just and satisfied every nation that took part in the conference at Paris", "Many nations were dissatisfied."],
      ["It was so severe that Germany was destroyed as a state and never recovered afterwards in any way", "Germany remained united and recovered."],
      ["It had no effect on Europe or on Africa and was forgotten by everyone within a year", "It reshaped both continents."],
    ],
    answer: "A",
    hints: ["Choose the judgement that balances harshness and weakness."],
    explanation: "Historians often see the settlement as a compromise between conflicting aims that did not fully satisfy anyone.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The leaders at Paris in 1919 included Wilson of the United States, Clemenceau of France and Lloyd George of Britain.", answer: true,
    explanation: "These were the \"Big Three\"; with Orlando of Italy they were the \"Big Four\".",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Germany was invited to negotiate the terms of the Treaty of Versailles with the Allies.", answer: false,
    explanation: "Germany was presented with the terms and had to sign; it was not allowed to negotiate.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "South West Africa, formerly a German colony, became a mandate administered by South Africa.", answer: true,
    hints: ["It is now called Namibia."],
    explanation: "South West Africa became a Class C mandate under South Africa, which ruled it until Namibia's independence in 1990.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader to the country he represented and his main aim.",
    pairs: [
      ["Woodrow Wilson", "United States: a just peace, self-determination and a League of Nations"],
      ["Georges Clemenceau", "France: security and a weakened Germany"],
      ["David Lloyd George", "Britain: a compromise that protected trade and the empire"],
      ["Vittorio Orlando", "Italy: the territory promised in 1915"],
    ],
    explanation: "These were the four leaders at Paris.",
  });
  {
    const events = [
      "Wilson announces his Fourteen Points",
      "The armistice ends the fighting",
      "The Treaty of Versailles is signed",
      "The reparations bill is fixed at 132 billion gold marks",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are January 1918, November 1918, June 1919 and 1921."],
      explanation: "8 January 1918; 11 November 1918; 28 June 1919; 1921.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Paris Peace Conference opened in {{blank:a}} 1919, and the German army was limited to {{blank:b}} men.",
    blanks: [
      { id: "a", accepted: ["January"], choices: ["January", "June", "September", "November"] },
      { id: "b", accepted: ["100,000"], choices: ["10,000", "100,000", "500,000", "1,000,000"] },
    ],
    explanation: "The conference opened on 18 January 1919; the army was limited to 100,000.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the American president who proposed the Fourteen Points.",
    accepted: ["Woodrow Wilson", "Wilson", "President Wilson"],
    wrong: ["Roosevelt"],
    explanation: "**Woodrow Wilson**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main terms of the Treaty of Versailles.",
    points: ["Germany accepted responsibility for the war in Article 231 and had to pay reparations", "Germany lost territory, including Alsace-Lorraine to France and land to Poland", "Germany lost all its colonies, which became mandates", "The German army was limited to 100,000 men and the Rhineland was demilitarised"],
    modelAnswer: "Germany had to accept responsibility for the war in Article 231 and to pay reparations. It lost territory, including Alsace-Lorraine to France and land to Poland, and all its colonies, which became mandates. Its army was limited to 100,000 men and the Rhineland was demilitarised.",
    explanation: "One mark for each term described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Allied leaders disagreed at the Paris Peace Conference.",
    points: [["Wilson wanted a fair peace based on self-determination and a League of Nations, while Clemenceau wanted security by weakening Germany", 2], ["Lloyd George wished to avoid a harsh peace that would hurt trade and provoke revenge but had promised the British public that Germany would pay, and Orlando wanted promised territory", 2]],
    hints: ["Give the aims of at least two leaders and show how they conflicted."],
    modelAnswer: "Wilson wanted a fair peace based on self-determination and a League of Nations, while Clemenceau wanted security by weakening Germany. Lloyd George wanted to avoid a peace so harsh that it would hurt trade and provoke revenge, though he had promised the British public that Germany would pay, and Orlando wanted the territory Italy had been promised.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Paris settlement affected Africa.",
    points: [["German colonies in Africa, such as Tanganyika, Togoland, the Cameroons and South West Africa, were taken and became League mandates", 2], ["Africans were not consulted, and the mandates were run by Britain, France, Belgium and South Africa, with South Africa governing South West Africa until 1990", 2]],
    hints: ["Think about the colonies and who ruled them next."],
    modelAnswer: "Germany's African colonies, such as Tanganyika, Togoland, the Cameroons and South West Africa, were taken and became League mandates. Africans were not consulted, and the mandates were run by Britain, France, Belgium and South Africa, with South Africa governing South West Africa until 1990.",
    explanation: "Credit developed effects on Africa.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an editorial in a fictional German newspaper, June 1919",
        "The terms dictated to us are not a peace but a sentence. We are told that we alone are guilty, that we must hand over our colonies, our coal and our ships, and that we must pay without limit. No people can accept this without losing its self-respect."),
      "",
      source("Source B", "a letter from a fictional British official at the conference to a friend in London, May 1919",
        "The French are anxious, and not without reason; their country has been devastated and they fear a revival of Germany. We have tried to make terms that are firm but fair. If Germany is hurt too much, she will want revenge; if she is not hurt enough, France will not feel safe."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What objections to the treaty does Source A make?", points: ["Germany is held solely guilty / the terms are dictated", "Loss of colonies, coal and ships and unlimited reparations"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What problem for the peacemakers does Source B describe?", points: ["France fears a revival of Germany and wants security", "Too hard a peace would produce a wish for revenge; too soft would leave France unsafe"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about the settlement with Germany?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that the terms are hard on Germany and that Germany may seek revenge", 1], ["Disagree on fairness: A says the terms are unjust and unlimited; B says they are firm but fair", 1], ["Provenance: A is a German editorial written in anger at the terms; B a British official writing privately to a friend", 1], ["Own knowledge: Germans called the treaty a Diktat, while British and French leaders disagreed about how severe it should be", 1]], modelAnswer: "The sources agree that the terms are hard on Germany, and B accepts that Germany may want revenge. They disagree about fairness. Source A, a German editorial written in anger, calls the terms a sentence and an unlimited burden, while Source B, a British official writing privately, calls the terms firm but fair and presents the difficulty as balancing French security against German resentment. My own knowledge shows that Germans called the treaty a Diktat and that the Allied leaders disagreed about its severity." }),
    ],
    hints: ["For (c), consider the different purposes of an editorial and a private letter."],
    explanation: "Both sources are invented: a German editorial and a British official's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the Treaty of Versailles fair to Germany?",
    levels: levels(12),
    points: [
      ["Terms: war guilt, reparations, territory, colonies, armed forces", 3],
      ["Arguments that it was unfair: Diktat, no negotiation, loss of land and colonies, reparations too high, resentment", 3],
      ["Arguments that it was fair or not harsh enough: Germany remained united and strong, milder than Brest-Litovsk, reparations reduced and not fully paid, Germany started the war (as the Allies argued), weak enforcement", 3],
      ["Different views of historians and contemporaries", 1],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh the German view against the Allied view and the later debate among historians."],
    modelAnswer: "The Treaty of Versailles was fair in some respects and unfair in others. It required Germany to accept responsibility for the war, to pay reparations, to give up land, colonies and most of its armed forces, and Germany was not allowed to negotiate, so many Germans called it a Diktat and felt that it was unjust. The reparations and the war guilt clause caused lasting resentment, as critics such as Keynes argued. On the other hand, Germany remained united and potentially the strongest economy in Europe, the treaty was milder than the one Germany had imposed on Russia at Brest-Litovsk, the reparations bill was reduced and not fully paid, and the Allies, who had suffered invasion and heavy losses, argued that Germany bore much of the responsibility for the war. Some historians argue that the real weakness was that the treaty was not enforced. I conclude that the treaty was harsh enough to feel unfair in Germany but not harsh or well enforced enough to keep Germany weak, so it was neither fully fair nor workable.",
    explanation: "Credit terms, both views and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the mandate system in the settlement of 1919.",
    levels: levels(8),
    points: [
      ["The system: German colonies and Ottoman territories under League supervision, Classes A, B and C", 2],
      ["Importance for Africa: Tanganyika, Togoland, Cameroons, Ruanda-Urundi and South West Africa passed to Britain, France, Belgium and South Africa; Africans not consulted", 2],
      ["Limits: little real supervision, continued colonialism, South Africa's control of Namibia until 1990, but some accountability", 2],
      ["Judgement on the importance of the system", 2],
    ],
    hints: ["Think of the effects on Africans as well as the aims of the peacemakers."],
    modelAnswer: "The mandate system was an important part of the settlement, especially for Africa. Germany's colonies and Ottoman territories were placed under League supervision in three classes, and in Africa Tanganyika, Togoland, the Cameroons and Ruanda-Urundi passed to Britain, France or Belgium and South West Africa to South Africa, without any consultation of Africans. The League required reports and the system accepted the principle that rulers had duties to the people, but supervision was weak and in practice the mandates were colonies under another name, and South Africa governed South West Africa until 1990. I conclude that the system was important because it shaped the future of many territories, but it changed the form of colonial rule more than its substance.",
    explanation: "Credit explained system, effects on Africa, limits and a judgement.",
  });

  b.card("DEFINITION", "What is an armistice?", "An agreement to stop fighting, not a peace treaty; the armistice of 11 November 1918 ended the fighting on the Western Front.");
  b.card("DEFINITION", "What are reparations?", "Payments demanded from a defeated state to compensate the victors for the cost of the war; Germany's were fixed in 1921 at 132 billion gold marks.");
  b.card("DEFINITION", "What was a mandate?", "A territory taken from Germany or the Ottoman Empire and administered by a victorious power on behalf of the League of Nations.");
  b.card("DEFINITION", "What is a Diktat?", "A dictated peace; the German name for the Treaty of Versailles, whose terms Germany could not negotiate.");
  b.card("FACT", "When was the Treaty of Versailles signed?", "28 June 1919, in the Hall of Mirrors at Versailles.");
  b.card("FACT", "What were the aims of Wilson, Clemenceau and Lloyd George?", "Wilson: a just peace, self-determination and a League; Clemenceau: security and a weakened Germany; Lloyd George: a compromise protecting trade and the empire.");
  b.card("FACT", "What military limits did Versailles place on Germany?", "An army of 100,000 men, no conscription, no tanks, military aircraft or submarines, a small navy and a demilitarised Rhineland.");
  b.card("CONCEPT", "Why did Germans call Versailles a Diktat?", "They were excluded from the negotiations and given the terms to sign, including the war guilt clause and reparations.");
  b.card("CONCEPT", "Why do historians disagree about whether Versailles was fair?", "Critics point to resentment, reparations and war guilt; others note that Germany stayed strong, the treaty was milder than Brest-Litovsk and that enforcement was weak.");
});
