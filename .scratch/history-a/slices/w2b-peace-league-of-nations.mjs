// W2b: ahist.peace.league-of-nations (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.peace.league-of-nations", { file: "peace/league-of-nations", keyPrefix: "peace.league-of-nations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which city did the League of Nations have its headquarters?",
    options: [
      ["Geneva", "Correct: in Switzerland."],
      ["New York", "The United Nations has its headquarters in New York."],
      ["Paris", "The Peace Conference met in Paris, but the League sat elsewhere."],
      ["London", "The League was not based in London."],
    ],
    answer: "A",
    explanation: "The League of Nations was based in Geneva, Switzerland.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the absence of the United States a weakness of the League of Nations?",
    options: [
      ["The strongest economy in the world did not back sanctions or collective action", "Correct: the League lacked its resources and influence."],
      ["The United States had been the main enemy of the League's founders in the war", "The US president had inspired the League."],
      ["The League could not meet unless the US president was present in Geneva", "The League met without the USA."],
      ["The United States owned the League's headquarters in Geneva and paid its staff", "It did not."],
    ],
    answer: "A",
    explanation: "The US Senate refused to ratify the Treaty of Versailles, so the USA never joined and its economic and military strength was not behind the League.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which country was condemned by the League as the aggressor in October 1935?",
    options: [
      ["Italy, for invading Abyssinia", "Correct: the League imposed limited sanctions."],
      ["Japan, for invading Manchuria", "Japan's invasion was in 1931."],
      ["Germany, for occupying the Rhineland", "That was in 1936 and the League took no such action."],
      ["Greece, for entering Bulgaria", "That was in 1925."],
    ],
    answer: "A",
    explanation: "Italy invaded Abyssinia on 3 October 1935 and was condemned as the aggressor.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Why were the sanctions imposed on Italy in 1935-36 ineffective?",
    options: [
      ["They left out oil, coal and steel, and the Suez Canal stayed open to Italy", "Correct: Italy could continue the war."],
      ["They were so severe that Italy had to end the war within one week of the vote", "Italy continued and won."],
      ["They were imposed by the United States, which controlled the whole League", "The USA was not a member."],
      ["They were never discussed or voted on by any of the members of the League", "They were voted on."],
    ],
    answer: "A",
    hints: ["Think of the goods needed to fight a war."],
    explanation: "Sanctions omitted oil, coal and steel, and Britain, which controlled the Suez Canal, did not close it, so Italy was able to continue.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the Hoare-Laval plan of December 1935?",
    options: [
      ["A British and French plan to give Italy much of Abyssinia, which then leaked", "Correct: it showed the powers' reluctance to oppose Mussolini."],
      ["A plan to send the British navy to defend Abyssinia against Italy in 1935", "No such plan existed."],
      ["A League plan to admit Germany as a permanent member of the Council in 1935 or 1936", "Germany had joined in 1926."],
      ["A plan to give Manchuria back to China with the help of Japan and the USSR", "This is not connected."],
    ],
    answer: "A",
    hints: ["It was a secret deal."],
    explanation: "The plan, drawn up by the British and French foreign ministers, would have given Italy much of Abyssinia; when it leaked it was widely condemned.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the unanimity rule weaken the League of Nations?",
    options: [
      ["One member could block a decision, so action was slow and avoidable", "Correct: decisions needed the agreement of all."],
      ["It allowed a simple majority to force any state to send troops to the League", "It required unanimity, not a majority."],
      ["It gave the Secretary-General the power to override the Council and Assembly", "He had no such power."],
      ["It forced every member to pay exactly the same sum into the League's funds", "That is a different matter."],
    ],
    answer: "A",
    hints: ["Think about what happens if one member says no."],
    explanation: "Because decisions in the Council and Assembly needed agreement by all members present, any member could block action.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the League's record in the 1920s is best supported?",
    options: [
      ["It settled small disputes and did humanitarian work, but could not make great powers obey", "Correct: it shows both success and limit."],
      ["It prevented every dispute from becoming a war and was never defied by any state", "It was defied at Vilna and Corfu."],
      ["It achieved nothing at all and had no staff or agencies of any kind in Geneva", "It had agencies and some successes."],
      ["It was ended in 1920 when the United States withdrew from it for good", "It lasted until 1946."],
    ],
    answer: "A",
    hints: ["Look for a statement that weighs success and failure."],
    explanation: "The League resolved disputes such as Aaland and Greece-Bulgaria and did humanitarian work, but Poland at Vilna and Italy at Corfu defied it.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best supports the view that the self-interest of Britain and France was a major cause of the League's failure?",
    options: [
      ["They chose weak sanctions over Abyssinia, hoping to keep Mussolini as an ally", "Correct: they placed their own interests above collective security."],
      ["The United States refused to join the League after the vote in the Senate in 1919", "This is about the USA, not Britain and France."],
      ["Japan left the League in 1933 after the report on its actions in Manchuria", "This shows an aggressor leaving."],
      ["The League had no army of its own and relied on the members for force", "This shows a structural weakness."],
    ],
    answer: "A",
    hints: ["Choose the point that concerns the decisions of Britain and France."],
    explanation: "Britain and France preferred weak sanctions and the Hoare-Laval plan because they hoped to keep Italy as an ally against Germany.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The League of Nations was dissolved in 1946, after the creation of the United Nations.", answer: true,
    explanation: "The League was formally dissolved in April 1946, and the UN took over many of its functions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The United States joined the League of Nations in 1920.", answer: false,
    explanation: "The US Senate refused to ratify the Treaty of Versailles, and the USA never joined.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Emperor Haile Selassie spoke in person to the League in Geneva in 1936 and warned of the consequences of failing to defend his country.", answer: true,
    hints: ["Think of the Abyssinian crisis."],
    explanation: "He addressed the League on 30 June 1936, after Italy had taken Addis Ababa.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event to the aggressor and the victim.",
    pairs: [
      ["Manchuria, 1931", "Japan against China"],
      ["Abyssinia, 1935", "Italy against Ethiopia"],
      ["Corfu, 1923", "Italy against Greece"],
      ["Vilna, 1920", "Poland against Lithuania"],
    ],
    explanation: "These were the main tests of the League.",
  });
  {
    const events = [
      "The League begins work in Geneva",
      "Japan invades Manchuria",
      "Italy invades Abyssinia",
      "The USSR is expelled from the League",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1920, 1931, 1935 and 1939."],
      explanation: "January 1920; September 1931; October 1935; December 1939.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The League took action over the {{blank:a}} Islands in 1921, but failed to stop Japan in {{blank:b}} in 1931.",
    blanks: [
      { id: "a", accepted: ["Aaland"], choices: ["Aaland", "Falkland", "Canary", "Solomon"] },
      { id: "b", accepted: ["Manchuria"], choices: ["Manchuria", "Abyssinia", "Corfu", "Vilna"] },
    ],
    explanation: "The Aaland Islands were settled in 1921; the League failed over Manchuria in 1931.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the African country that Italy invaded in October 1935.",
    accepted: ["Abyssinia", "Ethiopia"],
    wrong: ["Kenya"],
    explanation: "**Abyssinia** (Ethiopia).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the aims of the League of Nations.",
    points: ["To prevent war through collective security", "To encourage disarmament", "To settle disputes by negotiation and arbitration", "To improve living and working conditions around the world"],
    modelAnswer: "The League aimed to prevent war through collective security, in which members would act together against an aggressor. It aimed to encourage disarmament, to settle disputes by negotiation and arbitration, and to improve living and working conditions around the world.",
    explanation: "One mark for each aim described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the League failed to stop Japan in Manchuria.",
    points: [["The League's response was slow: it sent the Lytton Commission, which took a year, and Japan used the time to consolidate its hold", 2], ["Britain and France were unwilling to impose sanctions or use force, being preoccupied with the Depression, and the USA, which was not a member, did not act", 2]],
    hints: ["Give a reason about speed and a reason about the great powers."],
    modelAnswer: "The League was slow, since the Lytton Commission took a long time to report and Japan used the time to consolidate its hold. Britain and France, preoccupied with the Depression, were unwilling to impose sanctions or use force, and the USA, which was not a member, did not act.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain the importance of the Abyssinian crisis for Africans.",
    points: [["Abyssinia was one of the only independent states in Africa and had defeated Italy at Adwa in 1896, so its fall was seen as a betrayal by African and Pan-African thinkers", 2], ["It showed that the League would not protect an African state against a European aggressor, which weakened the League and encouraged anti-colonial feeling", 2]],
    hints: ["Think of Adwa and of what the League's inaction showed."],
    modelAnswer: "Abyssinia was one of the few independent states in Africa and had defeated Italy at Adwa in 1896, so its conquest was seen by African and Pan-African thinkers as a betrayal. It showed that the League would not protect an African state from a European aggressor, which weakened trust in the League and encouraged anti-colonial feeling.",
    explanation: "Credit developed points.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional delegate of a small state at the League Assembly, 1936",
        "A small state that trusts the Covenant is today told that the Covenant cannot protect it. If we allow an aggressor to take a member's land and then reward him by proposing terms, we teach every ambitious government that force pays. The League will then be only a debating society."),
      "",
      source("Source B", "a private note by a fictional British official, 1935",
        "We cannot risk a naval war in the Mediterranean for the sake of Abyssinia. The League is useful, but it is not worth losing Italy as a friend in Europe, where the real danger lies in Germany. Sanctions must be limited to what we can safely enforce."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What fear does the delegate in Source A express?", points: ["That the Covenant cannot protect a small state", "That the League will become only a debating society / force will be rewarded"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What reasons does Source B give for limiting action against Italy?", points: ["The risk of a naval war in the Mediterranean", "The need to keep Italy as a friend against the danger from Germany"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources help to explain why the League failed over Abyssinia?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A shows the small states' view that failure to act encourages aggressors, and the damage to the League's credibility", 1], ["B shows the self-interest of a leading member, which preferred a friendly Italy and avoided war", 1], ["Provenance: A is a public speech meant to persuade; B is a private note and so likely to be frank about motives", 1], ["Own knowledge: sanctions excluded oil and the Suez Canal stayed open, and the Hoare-Laval plan was leaked in December 1935", 1]], modelAnswer: "The sources help to explain the failure from two sides. Source A, a public speech by a small state's delegate, shows how failure to act would encourage aggressors and reduce the League to a debating society. Source B, a private note by a British official, shows that a leading member put its own interests first, avoiding a naval war and hoping to keep Italy as a friend against Germany. Because B is private it is likely to be frank about motives, while A is meant to persuade. My own knowledge confirms that the sanctions excluded oil, the Suez Canal stayed open, and the Hoare-Laval plan was leaked." }),
    ],
    hints: ["For (c), contrast a public speech with a private note."],
    explanation: "Both sources are invented: a delegate's speech and an official's private note.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the Abyssinian crisis the main reason for the failure of the League of Nations?",
    levels: levels(12),
    points: [
      ["The crisis: Italy invaded in October 1935, weak sanctions, Hoare-Laval plan, Addis Ababa fell in May 1936, loss of confidence", 3],
      ["Earlier failures: Vilna, Corfu, Manchuria 1931-33 and the leaving of Japan and Germany", 2],
      ["Structural weaknesses: no USA, no army, unanimity, the link with Versailles", 3],
      ["Other factors: the Depression, dictators, self-interest of Britain and France", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Compare a turning point with long-term weaknesses."],
    modelAnswer: "The Abyssinian crisis was a major reason for the League's failure, but it was the result of deeper weaknesses. Italy invaded Abyssinia in October 1935, and the weak sanctions, which excluded oil, and the Hoare-Laval plan showed that Britain and France would not stop a great power, so small states lost faith and Italy completed the conquest in 1936. But the League had been defied earlier, at Vilna and Corfu and by Japan in Manchuria, and Japan and Germany had already left it. Its structure was weak, since the USA never joined, it had no army and decisions needed unanimity. The Depression and the rise of dictators made states pursue their own interests. I conclude that Abyssinia was the clearest demonstration of the League's failure and destroyed its credibility, but the main causes were the structural weaknesses and the self-interest of its leading members, which had been clear since 1931.",
    explanation: "Credit the crisis, earlier failures, structural weaknesses and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the successes of the League of Nations in the 1920s.",
    levels: levels(8),
    points: [
      ["Disputes: Aaland Islands (1921), Upper Silesia, Greece and Bulgaria (1925)", 2],
      ["Humanitarian work: prisoners of war, refugees and the Nansen passport, health, drugs, slavery, the ILO", 2],
      ["Limits: Vilna and Corfu, where great powers defied the League; the work depended on goodwill", 2],
      ["Judgement on how successful it was", 2],
    ],
    hints: ["Separate political successes from humanitarian ones."],
    modelAnswer: "The League had real successes in the 1920s, especially with smaller states and in humanitarian work. It settled the Aaland Islands dispute in 1921 and ordered Greek troops out of Bulgaria in 1925. It returned prisoners of war, helped refugees through the Nansen passport and worked against disease, drugs and slavery, and the International Labour Organization set standards for work. But it could not make great powers obey, as shown at Vilna and Corfu, and its successes depended on the goodwill of the parties. I conclude that the League was fairly successful in the 1920s with minor disputes and social work, but had not yet been tested by a determined great power.",
    explanation: "Credit explained successes, limits and a judgement.",
  });

  b.card("DEFINITION", "What was the Covenant of the League of Nations?", "The founding document of the League, part of the Treaty of Versailles, setting out its rules, including collective security (Article 10) and sanctions (Article 16).");
  b.card("DEFINITION", "What is collective security?", "The idea that all members act together against any aggressor, so that no state can attack another without facing the combined strength of the rest.");
  b.card("DEFINITION", "What was the unanimity rule?", "Decisions in the League's Council and Assembly needed the agreement of all members present, so any member could block action.");
  b.card("FACT", "When did the League begin work, and where?", "10 January 1920, in Geneva; the first Assembly met on 15 November 1920.");
  b.card("FACT", "What happened in Manchuria in 1931?", "Japan invaded after the Mukden incident (18 September 1931); the League's Lytton Commission condemned it, and Japan left the League in 1933.");
  b.card("FACT", "What happened in Abyssinia in 1935-36?", "Italy invaded on 3 October 1935; the League imposed weak sanctions without oil; the Hoare-Laval plan leaked; Addis Ababa fell in May 1936.");
  b.card("FACT", "What were the League's main humanitarian successes?", "Returning prisoners of war, helping refugees (Nansen passport), health and anti-slavery work, and the International Labour Organization.");
  b.card("CONCEPT", "Why did the League fail?", "No USA, no army, unanimity, self-interest of Britain and France, the Depression and the aggression of dictators.");
  b.card("CONCEPT", "Why was the Abyssinian crisis significant for Africans?", "Abyssinia was an independent African state that had defeated Italy at Adwa in 1896, and the League's failure to defend it was seen as a betrayal.");
});
