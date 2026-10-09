// Slice W4a: recovery under Stresemann, 1924-1929 (0470 Depth study B, key question 1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.germany.stresemann-era", { file: "germany/stresemann-era", keyPrefix: "germany.stresemann-era" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which new currency was introduced in November 1923 to end hyperinflation?",
    options: [
      ["The Rentenmark", "Correct: issued in limited amounts and backed by land and property."],
      ["The euro", "The euro was introduced in 1999."],
      ["The gold mark of the old German Empire", "The gold mark was the pre-war currency used to set reparations."],
      ["The Deutschmark", "The Deutschmark was introduced in West Germany in 1948."],
    ],
    answer: "A",
    explanation: "The **Rentenmark** (November 1923) was replaced by the Reichsmark in 1924.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Dawes Plan (1924) do?",
    options: [
      ["Rescheduled reparations and arranged American loans", "Correct: the total was not reduced."],
      ["Cancelled reparations completely in return for the Ruhr", "Reparations were not cancelled."],
      ["Reduced the total of reparations and spread them over 59 years", "This was the Young Plan of 1929."],
      ["Allowed Germany to rebuild its navy and air force", "It dealt with money, not armed forces."],
    ],
    answer: "A",
    explanation: "The **Dawes Plan** made payments manageable and brought in **American loans**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which year did Germany join the League of Nations?",
    options: [
      ["1926", "Correct: with a permanent seat on the Council."],
      ["1919", "Germany was excluded from the League at first."],
      ["1925", "This was the year of the Locarno Treaties."],
      ["1933", "Germany left the League in 1933."],
    ],
    answer: "A",
    explanation: "Germany joined in **1926**, a sign that it was accepted again as a great power.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Germany accept in the Locarno Treaties of 1925?",
    options: [
      ["Its western borders with France and Belgium", "Correct: and a demilitarised Rhineland."],
      ["Its eastern borders with Poland as permanent and final", "Germany did not guarantee its eastern borders."],
      ["The union of Germany and Austria under the League's control", "Union with Austria remained forbidden."],
      ["The return of all its colonies in Africa", "Germany's colonies remained League mandates."],
    ],
    answer: "A",
    explanation: "At Locarno Germany accepted its **western borders**; the eastern ones were left open.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did nationalists oppose the Young Plan in 1929?",
    options: [
      ["It still required reparations and accepted war guilt", "Correct: they forced a referendum, which they lost."],
      ["It increased the total of reparations Germany owed", "It reduced the total."],
      ["It ordered the occupation of the Rhineland to continue", "It led to an early end to the occupation."],
      ["It handed the Saar to France permanently", "The Saar was not affected by the plan."],
    ],
    hints: ["Nationalists rejected the idea of paying at all."],
    answer: "A",
    explanation: "Nationalists such as Hugenberg and Hitler said paying reparations meant **accepting war guilt**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was the greatest weakness of the German economic recovery of 1924-29?",
    options: [
      ["It depended on short-term loans from the USA", "Correct: they were recalled after the Wall Street Crash."],
      ["It was destroyed by a new French occupation of the Ruhr in 1927", "There was no second occupation."],
      ["It relied on selling colonies to Britain and France", "Germany had no colonies to sell after 1919."],
      ["It was based on a currency that kept losing value", "The Rentenmark and Reichsmark were stable."],
    ],
    hints: ["Where did much of the investment money come from?"],
    answer: "A",
    explanation: "American **short-term loans** could be called back, which happened after October 1929.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the Republic was politically more stable by 1928?",
    options: [
      ["The Nazis won only 2.6% of the vote in 1928", "Correct: extremist support had fallen."],
      ["Hindenburg, a monarchist field marshal, was elected President in 1925", "This suggests continuing distrust of the republic."],
      ["Coalition governments changed several times between 1924 and 1928", "This suggests instability."],
      ["Nationalists campaigned against the Young Plan in a referendum", "This shows continuing opposition."],
    ],
    hints: ["Look for evidence that support for extremists had fallen."],
    answer: "A",
    explanation: "The collapse of the Nazi vote to **2.6%** in 1928 suggests support for extremism had fallen.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Stresemann shared the Nobel Peace Prize of 1926 with the French foreign minister Aristide Briand.",
    answer: true,
    explanation: "True. The prize recognised their work for reconciliation, including Locarno.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Stresemann was Chancellor of Germany from 1923 until his death in 1929.",
    answer: false,
    explanation: "False. He was Chancellor only from August to November 1923; after that he was foreign minister until he died in October 1929.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each achievement with its year.",
    pairs: [
      ["Dawes Plan", "1924"],
      ["Locarno Treaties", "1925"],
      ["Germany joins the League of Nations", "1926"],
      ["Kellogg-Briand Pact", "1928"],
    ],
    explanation: "Dawes Plan (1924), Locarno (1925), League membership (1926), Kellogg-Briand Pact (1928).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Young Plan",
      "Passive resistance in the Ruhr is called off",
      "Hindenburg is elected President",
      "The Dawes Plan",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The crisis of 1923 came first; one plan was named after Dawes, the later one after Young."],
    explanation: "Passive resistance ended (1923); Dawes Plan (1924); Hindenburg elected (1925); Young Plan (1929).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each name with the cultural achievement of the Weimar years.",
    pairs: [
      ["Walter Gropius", "Founded the Bauhaus school of design"],
      ["Fritz Lang", "Directed the film Metropolis"],
      ["Otto Dix", "Painted the horrors of war and post-war society"],
      ["Erich Maria Remarque", "Wrote All Quiet on the Western Front"],
    ],
    explanation: "Gropius (Bauhaus), Lang (*Metropolis*, 1927), Dix (painting), Remarque (novel, 1929).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Young Plan spread reparation payments over {{blank:a}} years. In 1925 the German people elected {{blank:b}} as President.",
    blanks: [
      { id: "a", accepted: ["59"], choices: ["59", "10", "25", "100"] },
      { id: "b", accepted: ["Hindenburg"], choices: ["Hindenburg", "Ebert", "Stresemann", "Hitler"] },
    ],
    explanation: "The Young Plan ran for **59** years (to 1988); **Hindenburg** was elected after Ebert's death in 1925.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe Stresemann's achievements in foreign policy.",
    points: [
      "Locarno Treaties (1925): accepted western borders; improved relations with France and Britain.",
      "Joined the League of Nations (1926) with a permanent Council seat.",
      "Signed the Kellogg-Briand Pact (1928).",
      "Won reductions and rescheduling of reparations / early withdrawal of troops from the Ruhr and Rhineland.",
    ],
    modelAnswer: "At Locarno in 1925 Stresemann accepted Germany's western borders, improving relations with France and Britain. In 1926 Germany joined the League of Nations with a permanent seat on the Council, and in 1928 it signed the Kellogg-Briand Pact. His policy of co-operation also brought practical gains: reparations were rescheduled and later reduced, the Ruhr was evacuated in 1925 and Allied troops agreed to leave the Rhineland early.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the introduction of the Rentenmark ended hyperinflation.",
    points: [
      "Identifies that the amount printed was strictly limited.",
      "Explains that money stopped losing value because no more was printed than the economy needed.",
      "Identifies that it was backed by land and industrial property / passive resistance had ended.",
      "Explains that this restored confidence, so people accepted and held the new money.",
    ],
    hints: ["Hyperinflation was caused by printing money; what changed?"],
    modelAnswer: "The Rentenmark was issued only in strictly limited amounts, so, unlike the old mark, it did not lose value through endless printing; the end of passive resistance meant the government no longer needed to print money to pay strikers. It was also backed by a mortgage on German land and industrial property, which gave people confidence, so they were willing to accept it and keep it.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Weimar Republic was still vulnerable in 1929 despite the recovery.",
    points: [
      "Identifies dependence on American loans.",
      "Explains that short-term loans could be recalled, as happened after the Wall Street Crash.",
      "Identifies economic groups left behind (farmers, ruined savers, unemployment).",
      "Explains that their grievances meant many had not been won over to the republic.",
      "Identifies political weaknesses (coalitions, Hindenburg, nationalist opposition).",
      "Explains that unstable coalitions and a monarchist President could not cope with a crisis; the Young Plan campaign publicised the Nazis.",
    ],
    hints: ["Economic, social and political weaknesses."],
    modelAnswer: "The recovery depended on American loans, many of them short-term, so it could collapse if the lenders wanted their money back, which is what happened after the Wall Street Crash. Many groups had not shared in the recovery: farmers suffered from low prices and debts, savers ruined in 1923 had not regained their losses, and unemployment remained significant. Politically, coalitions changed often, and from 1925 the President was Hindenburg, a monarchist with little loyalty to democracy. The nationalist campaign against the Young Plan in 1929 showed that opposition remained and gave the Nazis national publicity.",
    explanation: "Two marks per developed point.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a cartoon (described in words) of the kind published in a German nationalist magazine in 1925", "A German worker in chains is shown handing a sack of coins to a fat figure labelled 'Wall Street', while a French soldier watches from a watchtower on the Rhine. A man in a top hat labelled 'Locarno' smiles and shakes hands with the soldier.", { described: true })}\n\n${source("Source B", "an article in a fictional liberal Berlin newspaper, 1928", "Who would have believed five years ago that we should see this? The mark is solid, the factories busy, and Germany sits once more at the Council table in Geneva. New flats, schools and swimming baths rise in every city. The prophets of disaster on the right and the left have been proved wrong.")}`,
    hints: ["Think about each publication's political view."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source A?", points: [
        "Germany is enslaved by foreign debts / reparations to America.",
        "Locarno is a betrayal: politicians are friendly with the French occupiers.",
      ], explanation: "Two points of message, supported from the cartoon." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why do Sources A and B give such different views of Germany in the 1920s?", points: [
        "A is nationalist: opposes fulfilment, reparations and Locarno.",
        "A's date (1925): Rhineland still occupied; loans just beginning.",
        "B is liberal / pro-republic: wants to praise the recovery.",
        "B's date (1928): the height of the recovery; League membership achieved.",
      ], explanation: "Explain the differences from provenance and dates." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far do these sources show that the Weimar Republic had recovered by 1929? Use the sources and your own knowledge.", points: [
        "B: stable currency, busy industry, League seat, public building (own knowledge confirms).",
        "B is a pro-republic paper, so it may exaggerate; written before the Crash.",
        "A: dependence on American money (own knowledge: short-term loans).",
        "A shows continuing nationalist hostility (own knowledge: Young Plan referendum).",
        "Own knowledge: farmers, unemployment, coalitions, Hindenburg.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B suggests a strong recovery: the mark is stable, factories are busy, Germany sits on the League Council and cities are building new flats and schools. My own knowledge supports this, since production passed pre-war levels by 1928 and Germany joined the League in 1926. But B comes from a liberal paper that supported the republic and was written in 1928, before the Crash. Source A shows the weaknesses: it presents Germany as chained to American money, and my own knowledge confirms that the recovery depended on short-term American loans. It also shows continuing nationalist hostility to Locarno, which reappeared in the campaign against the Young Plan. Farmers' debts, unemployment and unstable coalitions also show the limits. Together the sources show a real but fragile recovery.", explanation: "Both sides from the sources, with own knowledge and a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare Stresemann's own role with outside factors."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the cultural achievements of the Weimar period.", points: [
        "The Bauhaus (Gropius, 1919): functional architecture and design.",
        "Art: Dix and Grosz criticised war and society.",
        "Cinema: Metropolis (1927) and other advanced films.",
        "Theatre, cabaret, jazz and literature (Brecht; All Quiet on the Western Front).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How important was Stresemann in the recovery of the Weimar Republic?", points: [
        ["Important: ended passive resistance and introduced the Rentenmark, ending hyperinflation", 2],
        ["Important: Locarno, League membership and the Dawes and Young Plans restored Germany's position", 2],
        ["Other factors: American loans and the Dawes committee; Schacht and the central bank; world economic growth", 2],
        ["Limits: the recovery was fragile and did not survive the Depression; Stresemann died in 1929", 2],
        ["Supported judgement", 2],
      ], levels: levels(10), modelAnswer: "Stresemann was very important. As Chancellor in 1923 he took the unpopular decision to end passive resistance and introduced the Rentenmark, ending hyperinflation. As foreign minister he negotiated the Dawes Plan, the Locarno Treaties, League membership in 1926 and the Young Plan, which together reduced reparations, ended the occupation of the Ruhr and made Germany a respected great power again.\n\nHowever, the recovery did not depend on him alone. American bankers and governments wanted Germany to recover, and American loans, not German policy, paid for most of the new investment. Others, such as Hjalmar Schacht at the central bank, managed the new currency, and world trade was growing in the mid-1920s.\n\nThe recovery was also limited. It rested on short-term loans and did not survive the Depression, and Stresemann died in October 1929, just before the Crash. Overall he was the most important individual in the recovery, because he made the decisions that allowed foreign help to arrive, but the recovery was as much the product of American money as of his policies.", explanation: "Levels: both sides with a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Rentenmark", "The temporary currency of November 1923, limited in amount and backed by land and property; it ended hyperinflation.");
  b.card("DEFINITION", "Dawes Plan (1924)", "Rescheduled reparation payments and arranged large American loans to Germany.");
  b.card("DEFINITION", "Young Plan (1929)", "Reduced the total of reparations and spread payments over 59 years.");
  b.card("FACT", "What did Germany accept at Locarno (1925)?", "Its western borders with France and Belgium and a demilitarised Rhineland.");
  b.card("FACT", "When did Germany join the League of Nations?", "1926, with a permanent seat on the Council.");
  b.card("FACT", "What share of the vote did the Nazis win in 1928?", "2.6% (12 seats).");
  b.card("FACT", "What was the Bauhaus?", "A school of art and design founded by Walter Gropius in Weimar in 1919, known for simple, functional designs.");
  b.card("FACT", "When did Stresemann die?", "October 1929, just before the Wall Street Crash.");
  b.card("CONCEPT", "Why was the Weimar recovery fragile?", "It depended on short-term American loans; farmers and savers suffered; coalitions were unstable.");
});
