// Slice W2b: the peacemakers of 1919 and their aims (ZIMSEC 12.2, 0470 Option B key question 1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.versailles.peacemaking", { file: "versailles/peacemaking", keyPrefix: "versailles.peacemaking" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who represented France among the Big Three at the Paris Peace Conference?",
    options: [
      ["Georges Clemenceau", "Correct: the French Prime Minister, nicknamed \"the Tiger\"."],
      ["Vittorio Orlando", "Orlando was the Italian Prime Minister, one of the Big Four but not the Big Three."],
      ["Marshal Ferdinand Foch", "Foch was the French Marshal who commanded the Allied armies in 1918, not a leader at the table."],
      ["Raymond Poincaré", "Poincaré was the French President; Clemenceau, as Prime Minister, led France's delegation."],
    ],
    answer: "A",
    explanation: "The Big Three were **Clemenceau** (France), **Lloyd George** (Britain) and **Wilson** (USA).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did President Wilson announce the Fourteen Points?",
    options: [
      ["8 January 1918", "Correct: in a speech to the US Congress, ten months before the armistice."],
      ["11 November 1918", "That is the date of the armistice."],
      ["18 January 1919", "That is the date the Paris Peace Conference opened."],
      ["28 June 1919", "That is when the Treaty of Versailles was signed."],
    ],
    answer: "A",
    explanation: "Wilson set out the **Fourteen Points** on 8 January 1918, before the war had ended.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following was one of Wilson's Fourteen Points?",
    options: [
      ["A general association of nations to keep the peace", "Correct: the fourteenth point proposed what became the League of Nations."],
      ["Reparations large enough to pay for all of France's war damage", "This was Clemenceau's aim; the Fourteen Points did not demand reparations of this kind."],
      ["The transfer of all German colonies to the British Empire", "The fifth point called for colonial claims to be settled impartially, not handed to Britain."],
      ["A permanent Allied army stationed on the River Rhine", "No point proposed this; France wanted security on the Rhine."],
    ],
    answer: "A",
    explanation: "The Fourteen Points included open diplomacy, freedom of the seas, free trade, disarmament, self-determination and a **League of Nations**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Clemenceau want Germany's army to be kept very small?",
    options: [
      ["Germany had invaded France in 1870 and in 1914", "Correct: French security was his first aim."],
      ["He wanted to reduce German competition in world trade", "Trade was more Lloyd George's concern; a small army does not limit trade."],
      ["He feared that German soldiers would join a Bolshevik revolution", "Fear of communism was more Lloyd George's argument for a milder peace."],
      ["Wilson's Fourteen Points demanded the end of all armies", "The Fourteen Points called for arms reduction, not the abolition of armies."],
    ],
    answer: "A",
    explanation: "Twice invaded in his lifetime, Clemenceau wanted a Germany too weak to attack France again.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best describes Lloyd George's attitude to Germany in 1919?",
    options: [
      ["He wanted Germany punished but able to recover and trade", "Correct: a middle position between Clemenceau and Wilson."],
      ["He wanted Germany divided into several small independent states", "No leader achieved this; it was closer to some French ideas about the Rhineland."],
      ["He opposed any punishment because Britain had not been invaded", "He promised voters a tough peace and supported reparations and naval limits."],
      ["He wanted France to annex all German land west of the Rhine", "He opposed separating the Rhineland from Germany."],
    ],
    answer: "A",
    explanation: "Lloyd George publicly promised to make Germany pay, but privately feared that a ruined, bitter Germany would harm British trade and might turn to communism.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which term of the settlement was a compromise between Clemenceau's wishes and Wilson's principle of self-determination?",
    options: [
      ["The Rhineland stayed German but was demilitarised", "Correct: France wanted it separated; Wilson and Lloyd George refused."],
      ["Alsace-Lorraine was returned to France", "This satisfied France fully and matched one of the Fourteen Points; it was not a compromise."],
      ["Germany's navy was limited to six battleships", "This mainly served British naval interests rather than settling a France-USA dispute."],
      ["Germany had to accept the war guilt clause in full", "War guilt was a punishment, not a compromise over self-determination."],
    ],
    answer: "A",
    hints: ["Think about land where the people were German but France wanted a buffer."],
    explanation: "Clemenceau wanted an independent Rhineland; the others objected because its people were German. The compromise was demilitarisation and a fifteen-year Allied occupation.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was Wilson unable to make sure that the USA would support the settlement?",
    options: [
      ["The Senate, led by his opponents, rejected the treaty", "Correct: the Republicans had won control of Congress in November 1918."],
      ["The Big Three agreed to keep the USA out of the League", "The League was Wilson's idea; the USA stayed out because of its own Senate."],
      ["He fell ill and left the conference before the treaty was written", "Wilson stayed for the main negotiations; his serious illness came in October 1919."],
      ["Britain and France refused to let the USA sign the treaty", "Wilson signed the treaty at Versailles; ratification failed in Washington."],
    ],
    answer: "A",
    hints: ["Who had to approve a treaty in the American system?"],
    explanation: "A US treaty needs the approval of two-thirds of the Senate. Wilson's Republican opponents, who disliked the League, defeated it in November 1919 and again in March 1920.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the claim that Lloyd George did NOT want a very harsh peace?",
    options: [
      ["His Fontainebleau Memorandum of March 1919", "Correct: it warned that a harsh peace could cause a future war and push Germany towards communism."],
      ["He won the December 1918 election promising to make Germany pay", "This suggests the opposite: a public commitment to a tough peace."],
      ["Britain gained control of several former German colonies as mandates", "This shows British interests were served, not that he wanted moderation."],
      ["He welcomed the strict limits placed on the size of the German navy", "This shows concern for British naval power, not a wish for leniency."],
    ],
    answer: "A",
    hints: ["Look for evidence of his private views rather than his election promises."],
    explanation: "In March 1919 the Fontainebleau Memorandum argued that excessive demands would leave Germany bitter and might push it towards communism.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Germany was invited to negotiate the terms of the Treaty of Versailles with the Allies.",
    answer: false,
    explanation: "False. Germany was excluded from the negotiations and was handed the terms on 7 May 1919, which is why Germans called it a Diktat.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The economist John Maynard Keynes criticised the reparations demanded from Germany as economically damaging.",
    answer: true,
    explanation: "True. In *The Economic Consequences of the Peace* (1919) Keynes argued that reparations would harm the whole European economy.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with his main aim at the peace conference.",
    pairs: [
      ["Woodrow Wilson", "A League of Nations and self-determination"],
      ["Georges Clemenceau", "Security for France and a weak Germany"],
      ["David Lloyd George", "Naval supremacy, the empire and renewed trade"],
      ["Vittorio Orlando", "Territory for Italy, such as Fiume"],
    ],
    explanation: "Each leader's aims reflected his country's experience of the war: France invaded, Britain a naval and trading power, the USA distant, Italy seeking promised land.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Paris Peace Conference opens",
      "Wilson announces the Fourteen Points",
      "Germany signs the Treaty of Versailles",
      "The armistice ends the fighting",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The Fourteen Points were announced before the war ended."],
    explanation: "Fourteen Points 8 January 1918; armistice 11 November 1918; conference opens 18 January 1919; treaty signed 28 June 1919.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In {{blank:a}} 1919 the Paris Peace Conference opened. Germany's colonies were handed to the victors as {{blank:b}} supervised by the League of Nations.",
    blanks: [
      { id: "a", accepted: ["January"], choices: ["January", "November", "June", "September"] },
      { id: "b", accepted: ["mandates"], choices: ["mandates", "protectorates", "dominions", "concessions"] },
    ],
    explanation: "The conference opened on 18 January 1919. Former German colonies became **mandates**, run mainly by Britain and France.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the President of the United States who attended the Paris Peace Conference.",
    accepted: ["Woodrow Wilson", "Wilson", "Thomas Woodrow Wilson", "President Wilson"],
    wrong: ["Roosevelt"],
    explanation: "**Woodrow Wilson** was the first serving US President to travel to Europe while in office.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe Clemenceau's aims at the Paris Peace Conference.",
    points: [
      "Security for France so that Germany could never invade again.",
      "A small German army / no German forces near the Rhine (ideally a separate Rhineland).",
      "The return of Alsace-Lorraine.",
      "Large reparations to repair war damage in north-east France.",
    ],
    modelAnswer: "Clemenceau wanted security above all, because Germany had invaded France in 1870 and 1914. He wanted the German army kept small and no German troops on the Rhine, ideally a separate Rhineland state. He wanted Alsace-Lorraine back and heavy reparations to rebuild the devastated north-east.",
    explanation: "One mark per aim described.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Wilson and Clemenceau disagreed about how Germany should be treated.",
    points: [
      "Identifies different experiences of war: France invaded and devastated; the USA entered late and was not invaded.",
      "Explains that this made Clemenceau seek security and revenge while Wilson could take a more detached view.",
      "Identifies Wilson's idealism: the Fourteen Points, self-determination, a League.",
      "Explains that Wilson thought a harsh peace would cause a war of revenge.",
      "Identifies Clemenceau's view that Wilson's ideas were unrealistic.",
      "Explains that French public opinion demanded reparations and a weakened Germany, which Clemenceau had to satisfy.",
    ],
    hints: ["Compare what the war had done to each country and what each leader believed caused wars."],
    modelAnswer: "They disagreed partly because their countries had suffered so differently. France had been invaded and its north-east devastated, so Clemenceau wanted security and compensation, while the USA had joined late and had not been invaded, so Wilson could afford to be more generous. Wilson was an idealist who believed in self-determination and a League of Nations, and he feared that a harsh peace would make Germany seek revenge. Clemenceau thought such ideas unrealistic, and French voters demanded reparations and a weak Germany, which he had to deliver.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the victors did not get everything they wanted at Paris.",
    points: [
      "Identifies conflicting aims of the Big Three.",
      "Explains with an example, e.g. France wanted a separate Rhineland but Wilson and Lloyd George refused, so it was only demilitarised.",
      "Identifies the role of the US Senate / American politics.",
      "Explains that the Senate rejected the treaty, so the USA stayed out of the League and the guarantee to France lapsed.",
    ],
    hints: ["One reason can come from inside the conference, one from outside it."],
    modelAnswer: "First, the leaders' aims conflicted, so each had to give way: Clemenceau wanted the Rhineland separated from Germany, but Wilson and Lloyd George refused, so it was only demilitarised and occupied. Second, American politics undermined Wilson: the Republican-controlled Senate rejected the treaty, so the USA never joined his League and the Anglo-American guarantee to France lapsed.",
    explanation: "Two marks per explained reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an editorial in a French newspaper, May 1919", "Our northern towns lie in ruins and our sons lie in the soil of Champagne. Yet the Americans, safe across the ocean, lecture us about justice for Germany. Justice for France must come first. Germany must pay for every mine it flooded and every village it burned, and it must never again have an army able to cross the Rhine.")}\n\n${source("Source B", "a letter from a fictional British trade union official to his local newspaper, June 1919", "Nobody here weeps for the Kaiser. But our members make the goods that Germans used to buy, and a starving Germany buys nothing. If we squeeze the German worker until he cannot feed his children, we shall drive him into the arms of the Bolsheviks. A peace that breeds another war is no victory for the working man.")}`,
    hints: ["Compare what each writer wants done to Germany and why; think about who each writer is."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about French attitudes to the peace settlement?", points: [
        "France wanted reparations for war damage (mines flooded, villages burned).",
        "France wanted military security / a Germany unable to attack across the Rhine; resentment of American idealism.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about how Germany should be treated?", points: [
        "Agreement: both accept Germany should be punished in some way (Source B: no sympathy for the Kaiser).",
        "Disagreement: Source A demands full payment for damage; Source B warns against squeezing Germany.",
        "Disagreement: Source A's concern is security; Source B's is trade and the danger of Bolshevism.",
        "Judgement that they mainly disagree, with reasons.",
      ], explanation: "Compare specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which leader at the peace conference would have agreed more with Source B, Clemenceau or Lloyd George? Explain your answer using the sources and your own knowledge.", points: [
        "Source B's fear of ruining German trade matches Lloyd George's concern for British trade.",
        "Source B's fear of Bolshevism matches Lloyd George's Fontainebleau Memorandum.",
        "Source B's warning about a war of revenge matches Lloyd George's (and Wilson's) private worries.",
        "Clemenceau's aims match Source A instead: reparations and security.",
        "Qualification: Lloyd George also promised voters to make Germany pay, so he shared some of A's feeling.",
        "Supported conclusion.",
      ], levels: levels(6), modelAnswer: "Lloyd George would have agreed more with Source B. The writer fears that a starving Germany will buy no British goods; Lloyd George knew that Germany had been one of Britain's most important trading partners. The writer warns that harsh treatment will push Germans towards the Bolsheviks and cause another war, the same worries Lloyd George set out in his Fontainebleau Memorandum of March 1919. Clemenceau, by contrast, shared the views of Source A: he wanted reparations for the ruined north-east and a Germany that could never again attack France. However, Lloyd George had promised voters in December 1918 to make Germany pay, so he did not reject punishment entirely, just as Source B does not. Overall Source B is much closer to Lloyd George.", explanation: "Use details from Source B and own knowledge of both leaders." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), judge each leader's success against his own aims."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe Wilson's aims at the Paris Peace Conference.", points: [
        "A League of Nations to settle disputes.",
        "Self-determination for the peoples of Europe.",
        "Disarmament / open diplomacy / freedom of the seas / free trade.",
        "A fair peace that would not make Germany want revenge.",
      ], explanation: "One mark per aim." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "\"Clemenceau was the most successful of the Big Three at Paris.\" How far do you agree?", points: [
        ["Clemenceau succeeded: Alsace-Lorraine returned, army of 100,000, demilitarised and occupied Rhineland, war guilt and reparations.", 2],
        ["Clemenceau failed: no separate Rhineland; the guarantee lapsed; reparations figure delayed; French critics thought the treaty too lenient (he lost the 1920 presidential vote).", 2],
        ["Wilson: League created and self-determination applied in eastern Europe, but the USA never joined and many points ignored.", 2],
        ["Lloyd George: navy limited, colonies gained as mandates, Germany kept its industry, but reparations harsher than he privately wished.", 2],
        ["Supported judgement comparing the three.", 2],
      ], levels: levels(10), modelAnswer: "Clemenceau gained a great deal. Alsace-Lorraine returned to France, the German army was cut to 100,000 men, the Rhineland was demilitarised and occupied for fifteen years, and Germany accepted guilt for the war and the duty to pay reparations. However, he failed to separate the Rhineland from Germany, the Anglo-American guarantee lapsed when the US Senate rejected the treaty, and many French people thought he had been too soft.\n\nLloyd George arguably did better relative to his aims. The German navy was reduced, Germany lost its colonies, many of which became British mandates, and yet Germany kept its industrial heartland and could recover as a trading partner. Wilson did least well: the League was created and new states based on self-determination appeared in eastern Europe, but many of his points were ignored and his own country rejected the treaty.\n\nOverall, Clemenceau won the most concessions, but Lloyd George came closest to getting what he wanted, because Britain's main aims were secured without the weaknesses that left France insecure.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "Who were the Big Three at Paris in 1919?", "Woodrow Wilson (USA), Georges Clemenceau (France) and David Lloyd George (Britain).");
  b.card("FACT", "When did the Paris Peace Conference open?", "18 January 1919.");
  b.card("DEFINITION", "Fourteen Points", "Wilson's programme for peace (8 January 1918): open diplomacy, freedom of the seas, free trade, disarmament, self-determination and a League of Nations.");
  b.card("DEFINITION", "Self-determination", "The right of a nationality to decide how it is governed, usually by forming its own state.");
  b.card("CONCEPT", "Why did Clemenceau want a harsh peace?", "France had been invaded in 1870 and 1914, lost about 1.3-1.4 million soldiers (estimate) and had its north-east devastated, so he wanted security and reparations.");
  b.card("CONCEPT", "Why did Lloyd George privately want a moderate peace?", "To revive trade with Germany, avoid a war of revenge and stop Germany turning to communism (Fontainebleau Memorandum, March 1919).");
  b.card("FACT", "What was the Rhineland compromise?", "The Rhineland stayed German but was demilitarised and occupied by Allied troops for fifteen years.");
  b.card("FACT", "Why did the USA not join the League?", "The US Senate rejected the Treaty of Versailles (November 1919 and March 1920).");
  b.card("FACT", "Who wrote The Economic Consequences of the Peace (1919)?", "John Maynard Keynes, who argued that reparations would damage Europe's economy.");
});
