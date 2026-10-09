// Slice W2b: the League of Nations, aims, structure and membership (ZIMSEC 12.3, 0470 B2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.league.organisation", { file: "league/organisation", keyPrefix: "league.organisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where were the headquarters of the League of Nations?",
    options: [
      ["Geneva", "Correct: in neutral Switzerland."],
      ["The Hague", "The Hague was the seat of the Permanent Court of International Justice."],
      ["New York", "New York is the headquarters of the United Nations."],
      ["Versailles", "Versailles was where the treaty with Germany was signed."],
    ],
    answer: "A",
    explanation: "The League was based in **Geneva**, Switzerland.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which great power never joined the League of Nations?",
    options: [
      ["The United States", "Correct: the Senate rejected the Treaty of Versailles."],
      ["Japan", "Japan was a founding member and permanent Council member until it left in 1933."],
      ["Germany", "Germany joined in 1926 and left in 1933."],
      ["The Soviet Union", "The USSR joined in 1934 and was expelled in 1939."],
    ],
    answer: "A",
    explanation: "Although Wilson proposed the League, the **USA** never joined.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which organ of the League included every member state and met once a year?",
    options: [
      ["The Assembly", "Correct: each member had one vote."],
      ["The Council", "The Council was smaller and met several times a year and in emergencies."],
      ["The Secretariat", "The Secretariat was the civil service, not a meeting of states."],
      ["The Permanent Court", "The Court was made up of judges, not member states."],
    ],
    answer: "A",
    explanation: "The **Assembly** was the League's 'parliament', with every member represented.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the role of the International Labour Organisation?",
    options: [
      ["To improve working conditions around the world", "Correct: it brought governments, employers and workers together."],
      ["To settle legal disputes between member states", "That was the Permanent Court of International Justice."],
      ["To govern former German and Turkish colonies", "Mandates were run by member states and supervised by the Mandates Commission."],
      ["To organise the League's armed forces in a crisis", "The League had no armed forces of its own."],
    ],
    answer: "A",
    explanation: "The **ILO** campaigned for better wages, shorter hours and an end to child labour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does 'collective security' mean?",
    options: [
      ["Members act together against any aggressor", "Correct: an attack on one is treated as an attack on all."],
      ["Each country builds up arms to defend itself", "This is the opposite: an arms race of separate national defence."],
      ["Small groups of countries form secret alliances", "Secret alliances were what the League was meant to replace."],
      ["The great powers divide the world into zones", "This describes spheres of influence, not collective security."],
    ],
    answer: "A",
    explanation: "**Collective security** relies on all members acting together, through moral, economic and, if needed, military sanctions.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the absence of the USA weaken the League's economic sanctions?",
    options: [
      ["An aggressor could still trade with the USA", "Correct: the world's largest economy was outside the League."],
      ["The USA had promised to provide the League's army", "The League never had a promised American army."],
      ["American judges controlled the Permanent Court", "The Court's judges came from many countries; the USA was not a member."],
      ["The League's budget had to be approved in Washington", "The Assembly voted the budget; the USA had no role."],
    ],
    answer: "A",
    hints: ["Think about what a trade ban needs in order to work."],
    explanation: "A trade ban only bites if the aggressor cannot buy elsewhere. Without the USA, an aggressor could still trade with the largest economy in the world.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which body supervised the government of former German colonies such as Tanganyika?",
    options: [
      ["The Mandates Commission", "Correct: it received reports from the states that ran the mandates."],
      ["The Slavery Commission", "The Slavery Commission worked to end slavery and forced labour."],
      ["The Health Committee", "The Health Committee worked against epidemic diseases."],
      ["The Disarmament Commission", "This dealt with reducing armaments."],
    ],
    answer: "A",
    hints: ["Former colonies were held as 'mandates'."],
    explanation: "The **Mandates Commission** checked the reports of the powers governing mandates, though it had little power to change their policies.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which weakness of the League most directly made decisions slow and easy to block?",
    options: [
      ["The rule that decisions had to be unanimous", "Correct: one member could stop action."],
      ["Its headquarters being in a neutral country", "Geneva's location did not slow decisions."],
      ["The use of several languages in the Assembly", "Translation was a minor practical issue."],
      ["The Secretariat's large number of staff", "The Secretariat's size did not decide votes."],
    ],
    answer: "A",
    hints: ["What voting rule applied in the Council and the Assembly?"],
    explanation: "**Unanimity** meant every member present had to agree, so action could be delayed or blocked.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The League of Nations had its own permanent army to enforce its decisions.",
    answer: false,
    explanation: "False. Military sanctions depended on members providing forces, which they were reluctant to do.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Germany was allowed to join the League in 1926.",
    answer: true,
    explanation: "True. After the Locarno treaties Germany joined in 1926 and became a permanent Council member; it left in 1933.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each organ of the League with its function.",
    pairs: [
      ["Council", "Dealt with crises and could order sanctions"],
      ["Secretariat", "Kept records and ran the administration"],
      ["Permanent Court of International Justice", "Gave rulings on legal disputes between states"],
      ["Assembly", "Admitted new members and voted the budget"],
    ],
    explanation: "Assembly (all members), Council (crises), Secretariat (civil service), Court (legal disputes).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these changes in League membership in chronological order.",
    pairs: [
      "The USSR joins",
      "Germany joins",
      "Italy announces its withdrawal",
      "The League begins work with 42 members",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["Germany joined in the 1920s; the USSR joined after Germany left."],
    explanation: "League begins 1920; Germany joins 1926; USSR joins 1934; Italy announces withdrawal 1937.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The League's founding document was called the {{blank:a}}. Its sanctions began with moral condemnation, then {{blank:b}} sanctions, and finally military action.",
    blanks: [
      { id: "a", accepted: ["Covenant"], choices: ["Covenant", "Charter", "Constitution", "Mandate"] },
      { id: "b", accepted: ["economic"], choices: ["economic", "religious", "legal", "naval"] },
    ],
    explanation: "The **Covenant** (the UN's equivalent is the Charter) set out sanctions in three stages: moral, **economic**, military.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which Swiss city did the League of Nations meet?",
    accepted: ["Geneva", "Geneve", "Genève", "Genf"],
    wrong: ["Zurich"],
    explanation: "The League met in **Geneva**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** aims of the League of Nations.",
    points: [
      "To discourage aggression / keep the peace (collective security).",
      "To encourage disarmament.",
      "To encourage co-operation, especially in trade and business.",
      "To improve living and working conditions / tackle social problems.",
    ],
    modelAnswer: "To stop aggression through collective security; to encourage disarmament; to encourage co-operation in trade and business; and to improve working and living conditions.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the League's membership was a weakness.",
    points: [
      "Identifies the absence of the USA.",
      "Explains that economic sanctions lost force because aggressors could trade with the USA / the League lacked American power and money.",
      "Identifies the late entry of Germany and the USSR.",
      "Explains that the League looked like a club of the victors, and two great powers had no stake in it.",
      "Identifies the dominance of Britain and France.",
      "Explains that both were weakened by war and put their own interests first, so they were reluctant to act.",
    ],
    hints: ["Who was missing, and who was left in charge?"],
    modelAnswer: "The USA never joined, so the League lacked the world's richest power, and an aggressor facing economic sanctions could still trade with America. Germany was excluded until 1926 and the USSR until 1934, so for years the League looked like a club of the victors and two great powers had no reason to support it. This left Britain and France to lead, but both were weakened by the war and put their own interests first, so they were reluctant to use sanctions or troops.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the League's structure made it hard to act quickly in a crisis.",
    points: [
      "Identifies unanimity.",
      "Explains that one member could block or delay action.",
      "Identifies the Council / Assembly meeting infrequently or the reliance on commissions of inquiry.",
      "Explains that investigating and reporting took months before any decision.",
    ],
    hints: ["Think about voting and about how often bodies met."],
    modelAnswer: "Decisions had to be unanimous, so a single member could block or delay sanctions. The Assembly met only once a year and the Council only a few times, and in a crisis the League usually sent a commission of inquiry, which could take months to report before anything was decided.",
    explanation: "Two marks per explained way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a pamphlet published by a fictional British society of League supporters, 1920", "For the first time in history the nations have a parliament of the world. No longer will statesmen plot in secret. Any nation that breaks the Covenant will face the united judgement of mankind, the closing of every market and, if need be, the armed strength of all. War has been outlawed.")}\n\n${source("Source B", "an article in a fictional American isolationist newspaper, 1920", "The League is a European club in which Britain and France hold the keys. Why should American boys die to settle the quarrels of Balkan villages? The Senate was right: we shall trade with the whole world and promise to fight for none of it.")}`,
    hints: ["Think about who wrote each source and why; then use what you know about the League's powers."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about how the League was meant to keep peace?", points: [
        "Collective action/moral judgement against any aggressor.",
        "Economic sanctions (closing markets) and military force as a last resort.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why might the writer of Source B have held these views? Use the source and your own knowledge.", points: [
        "Isolationism: Americans did not want to be dragged into European wars.",
        "Reference to the source: refusal to fight for others' quarrels / Balkan villages.",
        "Suspicion that Britain and France dominated the League.",
        "Context: the Senate had rejected the treaty; the USA wanted to trade freely.",
      ], explanation: "Reasons linked to the writer's context." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far does Source B show that Source A was too optimistic? Use both sources and your own knowledge.", points: [
        "Source B shows that sanctions would be weakened: the USA would keep trading with everyone.",
        "Source B shows that military force was unlikely: Americans (and others) would not fight for distant quarrels.",
        "Own knowledge: the League had no army; unanimity; Britain and France reluctant.",
        "Limit: Source B is one isolationist view; the League did have 1920s successes.",
        "Provenance: A is propaganda by supporters; B is hostile; both exaggerate.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B shows clearly why Source A was too optimistic. Source A says an aggressor would face the closing of every market, but Source B says the USA would trade with the whole world, so economic sanctions would have a gap in them. Source A promises the armed strength of all, but Source B shows that Americans were unwilling to fight for distant quarrels, and my own knowledge shows that the League had no army and that Britain and France were also reluctant to send troops. However, Source B is itself a one-sided isolationist view, and the League did settle some disputes in the 1920s, such as the Aaland Islands. Both sources were written to persuade. Overall Source B largely shows that Source A's hopes were unrealistic, although it does not prove the League was useless.", explanation: "Use both sources, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), set the weaknesses against evidence that the League could still work."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the work of the Council of the League.", points: [
        "Small body of permanent members (Britain, France, Italy, Japan; later Germany, USSR) and elected members.",
        "Met several times a year and in emergencies.",
        "Dealt with disputes and crises; could send commissions of inquiry.",
        "Could recommend sanctions; decisions needed unanimity / permanent members could block.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The League of Nations was bound to fail because of weaknesses in its organisation and membership.\" How far do you agree?", points: [
        ["Agree: absence of the USA weakened sanctions and authority.", 2],
        ["Agree: no army; unanimity; slow procedures.", 2],
        ["Agree: dominance of self-interested Britain and France; link to Versailles.", 2],
        ["Disagree: successes in the 1920s (Aaland Islands, Bulgaria) and humanitarian work show it could work.", 2],
        ["Disagree: failure came from the Depression and decisions over Manchuria and Abyssinia (e.g. the Hoare-Laval Pact).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "There is a strong case that the League's weaknesses doomed it. Without the USA, economic sanctions had a large gap, since an aggressor could trade with America. The League had no army, so military sanctions depended on members who were unwilling to fight. Decisions had to be unanimous, so they were slow. Britain and France, the leading members, were weakened by war and put their own interests first, and many Germans saw the League as part of the hated treaty.\n\nHowever, failure was not inevitable. In the 1920s the League settled the Aaland Islands dispute and stopped the Greek invasion of Bulgaria, and its agencies helped refugees and fought disease. Its collapse came in the 1930s, when the Depression made countries aggressive and inward-looking and when Britain and France chose not to act firmly over Manchuria and Abyssinia, even secretly offering Mussolini much of Abyssinia in the Hoare-Laval Pact.\n\nOverall the weaknesses made failure likely whenever a great power was determined on aggression, but it was the Depression and the decisions of the great powers in the 1930s that turned weakness into collapse.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did the League of Nations begin work?", "10 January 1920, with its headquarters in Geneva.");
  b.card("DEFINITION", "Collective security", "Members act together against an aggressor: an attack on one is an attack on all.");
  b.card("DEFINITION", "Covenant", "The League's founding agreement, written into the peace treaties.");
  b.card("FACT", "What were the League's three types of sanction?", "Moral condemnation, economic sanctions, military action by members.");
  b.card("FACT", "Who were the first permanent members of the Council?", "Britain, France, Italy and Japan (Germany joined them in 1926, the USSR in 1934).");
  b.card("FACT", "What did the Permanent Court of International Justice do?", "Judges in The Hague settled legal disputes between states and advised the League, but could not enforce rulings.");
  b.card("FACT", "When did Germany and the USSR belong to the League?", "Germany 1926-1933; USSR 1934 until its expulsion in December 1939.");
  b.card("CONCEPT", "Give four weaknesses of the League.", "No USA; no army; unanimity; dominated by self-interested Britain and France (and linked to the Versailles treaty).");
  b.card("DEFINITION", "Unanimity", "All members present must agree before a decision is taken.");
});
