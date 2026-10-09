// Slice W2b: the League in the 1920s, peacekeeping and humanitarian work (ZIMSEC 12.3, 0470 B2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.league.1920s", { file: "league/1920s", keyPrefix: "league.1920s" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which two countries disputed the Aaland Islands in 1920-1921?",
    options: [
      ["Sweden and Finland", "Correct: the League awarded the islands to Finland."],
      ["Poland and Lithuania", "These two countries disputed Vilna."],
      ["Greece and Bulgaria", "These two countries clashed in 1925."],
      ["Italy and Greece", "These two countries were involved in the Corfu crisis."],
    ],
    answer: "A",
    explanation: "**Sweden and Finland** both accepted the League's 1921 ruling that the islands stay with Finland.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the Corfu crisis take place?",
    options: [
      ["1923", "Correct: after the murder of General Tellini in August 1923."],
      ["1920", "1920 was the year of the Vilna seizure."],
      ["1925", "1925 was the year of the Greek invasion of Bulgaria."],
      ["1931", "1931 was the start of the Manchurian crisis."],
    ],
    answer: "A",
    explanation: "Mussolini bombarded and occupied **Corfu** in 1923.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who led the League's work to return prisoners of war and help refugees?",
    options: [
      ["Fridtjof Nansen", "Correct: the Norwegian explorer gave his name to the Nansen passport."],
      ["Albert Thomas", "Thomas was the first director of the International Labour Organisation."],
      ["Enrico Tellini", "Tellini was the Italian general murdered in 1923."],
      ["Aristide Briand", "Briand was a French foreign minister linked to Locarno and the Kellogg-Briand Pact."],
    ],
    answer: "A",
    explanation: "**Fridtjof Nansen** organised the return of hundreds of thousands of prisoners of war and the Nansen passport for stateless refugees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the League fail to remove Polish forces from Vilna in 1920?",
    options: [
      ["Britain and France were unwilling to act against Poland", "Correct: France saw Poland as an ally against Germany."],
      ["Lithuania withdrew its complaint to the League", "Lithuania did not accept the loss and kept its claim to Vilna."],
      ["The Permanent Court ruled that Vilna belonged to Poland", "The Court did not make this ruling."],
      ["The USA vetoed action in the League Council", "The USA was not a member and had no veto."],
    ],
    answer: "A",
    explanation: "Poland ignored the League, and the powers that could enforce a decision, **Britain and France**, would not act.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How was the Greek invasion of Bulgaria in 1925 resolved?",
    options: [
      ["Greece withdrew and paid compensation", "Correct: Greece obeyed the League's orders."],
      ["Bulgaria paid compensation to Greece", "The League ruled against Greece, the invader."],
      ["The Conference of Ambassadors gave land to Greece", "The League, not the Conference, settled this dispute."],
      ["British troops forced the Greek army out", "No troops were sent; Greece obeyed."],
    ],
    answer: "A",
    explanation: "The League condemned the invasion and Greece **withdrew and paid compensation**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do historians usually see the Corfu crisis as a failure for the League?",
    options: [
      ["Greece, the victim of an attack, ended up paying compensation", "Correct: the decision rewarded Italian aggression."],
      ["Italy refused to withdraw and kept Corfu for the rest of the decade", "Italy withdrew from Corfu within weeks."],
      ["Greece left the League in protest after the crisis", "Greece remained a member."],
      ["The crisis led directly to war in the Balkans", "No war followed."],
    ],
    answer: "A",
    hints: ["Who was attacked, and who paid?"],
    explanation: "Greece's territory was bombarded and occupied, yet it had to apologise and pay, after a decision taken by the Conference of Ambassadors under Italian pressure.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which agreement of the 1920s was made OUTSIDE the League?",
    options: [
      ["The Locarno treaties of 1925", "Correct: negotiated directly between the powers."],
      ["The Aaland Islands settlement of 1921", "This was a League decision."],
      ["The loans to rescue Austria in 1922", "These were arranged by the League's Financial Committee."],
      ["The Slavery Convention of 1926", "This was a League convention."],
    ],
    answer: "A",
    hints: ["Which agreement involved Germany accepting its western borders?"],
    explanation: "At **Locarno** Germany, France, Belgium, Britain and Italy reached agreements without using the League, which suggests the great powers preferred to act on their own.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is best supported by the League's handling of disputes in the 1920s?",
    options: [
      ["It succeeded when small states accepted its decisions", "Correct: Aaland and Bulgaria worked; Vilna and Corfu did not."],
      ["It could always prevent a great power from using force", "Corfu shows a great power using force successfully."],
      ["It failed in every dispute because the USA was absent", "It had real successes in the Aaland Islands and Bulgaria."],
      ["It settled disputes mainly by using military sanctions", "It never used military sanctions."],
    ],
    answer: "A",
    hints: ["Compare who was involved in the successes and in the failures."],
    explanation: "The League worked when the parties, usually small states, accepted its rulings; it failed when a state, especially a great power, was determined and Britain and France would not act.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The League of Nations agreed a Slavery Convention in 1926.",
    answer: true,
    explanation: "True. The 1926 Slavery Convention committed signatories to suppress slavery and the slave trade.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The International Labour Organisation could force member states to adopt an eight-hour working day.",
    answer: false,
    explanation: "False. The ILO could only recommend measures; many members did not adopt them.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each dispute with its outcome.",
    pairs: [
      ["Vilna, 1920", "Poland kept the city in defiance of the League"],
      ["Aaland Islands, 1921", "Islands stayed with Finland; Sweden accepted"],
      ["Corfu, 1923", "Greece apologised and paid compensation to Italy"],
      ["Bulgaria, 1925", "Greece withdrew its troops and paid compensation"],
    ],
    explanation: "Two failures (Vilna, Corfu) and two successes (Aaland, Bulgaria).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Greek troops invade Bulgaria",
      "Polish troops seize Vilna",
      "Mussolini occupies Corfu",
      "The Kellogg-Briand Pact is signed",
    ],
    right: POS,
    rightIndex: [2, 0, 1, 3],
    hints: ["Corfu came two years before the Bulgarian crisis."],
    explanation: "Vilna 1920; Corfu 1923; Bulgaria 1925; Kellogg-Briand Pact 1928.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Stateless refugees could travel using a {{blank:a}} passport. The League's Health Organisation was the forerunner of the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Nansen"], choices: ["Nansen", "League", "Geneva", "Tellini"] },
      { id: "b", accepted: ["World Health Organization"], choices: ["World Health Organization", "Red Cross", "International Labour Organisation", "Mandates Commission"] },
    ],
    explanation: "The **Nansen** passport (from 1922) and the Health Organisation, forerunner of the **World Health Organization**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Greek island that Italy bombarded and occupied in 1923.",
    accepted: ["Corfu", "Kerkyra", "Kérkyra"],
    wrong: ["Crete"],
    explanation: "Mussolini occupied **Corfu** after the murder of General Tellini.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the League's work to help refugees and prisoners of war.",
    points: [
      "Fridtjof Nansen led the work.",
      "Helped return over 400,000 prisoners of war to their homes (estimate).",
      "Nansen passports (from 1922) for stateless refugees.",
      "Camps / help for refugees after the Greek-Turkish war of 1922; fought disease in camps.",
    ],
    modelAnswer: "The work was led by Fridtjof Nansen. The League helped return over 400,000 prisoners of war after the war, issued Nansen passports from 1922 so that stateless refugees could travel and find work, and organised help and camps for refugees after the Greek-Turkish war of 1922.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the League succeeded in the Aaland Islands and Bulgaria but failed over Corfu.",
    points: [
      "Aaland: both Sweden and Finland asked the League to decide / accepted its ruling.",
      "Explains: small states willing to obey, with a fair compromise (demilitarisation, protection of Swedish culture).",
      "Bulgaria: Greece was a small state and obeyed when condemned.",
      "Explains: Greece could not resist the united pressure of Britain and France through the League.",
      "Corfu: Italy was a great power led by Mussolini.",
      "Explains: Mussolini refused to accept the League's authority, used the Conference of Ambassadors, and Britain and France would not confront him.",
    ],
    hints: ["Compare the size and attitude of the countries involved."],
    modelAnswer: "In the Aaland Islands both Sweden and Finland asked the League to decide and accepted its ruling, which was a sensible compromise: Finland kept the islands, but they were demilitarised and Swedish culture was protected. In 1925 Greece was a small state and withdrew from Bulgaria when the League condemned it, because it could not resist the pressure of Britain and France. Over Corfu, however, Italy was a great power, and Mussolini refused to accept the League's authority and had the matter settled by the Conference of Ambassadors, while Britain and France would not confront him.",
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why the League's humanitarian work can be seen as more successful than its peacekeeping in the 1920s.",
    points: [
      "Humanitarian success: prisoners of war returned, refugees helped, disease tackled.",
      "Explains that this work did not depend on great powers giving up their interests, so it faced less opposition.",
      "Peacekeeping mixed: Vilna and Corfu failures.",
      "Explains that peacekeeping needed enforcement, which Britain and France would not provide against determined states.",
    ],
    hints: ["Which kind of work needed force, and which did not?"],
    modelAnswer: "The humanitarian work brought clear results: hundreds of thousands of prisoners of war went home, refugees received Nansen passports, and epidemics were tracked and fought. It succeeded because it did not threaten any great power's interests. Peacekeeping was mixed: Vilna and Corfu were failures, because enforcing decisions against a determined state needed Britain and France to act, and they would not.",
    explanation: "Two marks per side explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a report in a fictional Swiss newspaper, October 1925", "Within days of the Bulgarian appeal, the Council met and spoke with one voice. Athens was told to withdraw its troops at once. The Greek army obeyed. Those who mocked the League after Corfu must admit that, this time, Geneva has stopped a war.")}\n\n${source("Source B", "a letter from a fictional Greek schoolteacher to an Athens newspaper, November 1925", "Two years ago Italian guns killed our people on Corfu, and it was Greece that was made to pay. Now a Greek soldier is shot and it is Greece again that pays. The League is a lion to the weak and a lamb to the strong.")}`,
    hints: ["Both sources are about the same events; think about why the writers see them differently."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, why was the Bulgarian crisis a success for the League?", points: [
        "The Council acted quickly and united.",
        "Greece obeyed and withdrew, so war was stopped.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B disagree with Source A?", points: [
        "Agreement: both accept that Greece withdrew/paid (B implies Greece paid).",
        "Disagreement: A praises the League; B says it was unfair.",
        "B's point: double standard between Corfu (great power) and Bulgaria (small state).",
        "Judgement: they agree on what happened but disagree on whether it was just.",
      ], explanation: "Compare specific points." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Is Source B a fair judgement on the League in the 1920s? Use the sources and your own knowledge.", points: [
        "Fair: Corfu, where Italy (a great power) attacked and Greece paid.",
        "Fair: Vilna, where Poland, backed by France, defied the League.",
        "Unfair: Aaland Islands decision was impartial and accepted.",
        "Unfair: Bulgaria stopped an invasion; humanitarian work helped many.",
        "Provenance: a Greek writer, angry after two decisions against Greece, so likely biased.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B has some truth in it. Over Corfu in 1923 Italy, a great power, bombarded and occupied Greek territory, yet Greece was made to apologise and pay, and at Vilna Poland, backed by France, defied the League. These cases suggest the League was weak against the strong. However, B is unfair in other ways. In 1925 the League stopped an invasion that could have become a war, and in the Aaland Islands its ruling was impartial and accepted by both sides. Its agencies also helped prisoners of war and refugees. The writer is a Greek angry about two decisions against Greece, so the letter is one-sided. B is fair about how the League treated great powers, but it ignores the League's real successes.", explanation: "Use provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider who suffered, who gained and how long the work lasted."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe what happened in the Vilna dispute of 1920.", points: [
        "Vilna was claimed as the capital of Lithuania, but many inhabitants were Poles.",
        "In October 1920 Polish forces seized the city.",
        "Lithuania appealed and the League asked Poland to withdraw.",
        "Poland refused; Britain and France did not act, so Poland kept Vilna.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How important was the humanitarian work of the League?", points: [
        ["Important: prisoners of war repatriated; Nansen passports for refugees.", 2],
        ["Important: Health Organisation fought epidemics; forerunner of the WHO.", 2],
        ["Important: ILO and the Slavery Convention raised standards; Austrian and Hungarian loans.", 2],
        ["Limited: only recommendations; members ignored ILO conventions; colonial powers resisted inquiries; did not prevent war.", 2],
        ["Supported judgement (e.g. most lasting legacy, but did not achieve the main aim of peace).", 2],
      ], levels: levels(10), modelAnswer: "The humanitarian work was very important to the people it helped. Under Nansen the League returned over 400,000 prisoners of war, and Nansen passports allowed stateless refugees to travel and work. The Health Organisation tracked and fought epidemics such as typhus and became the model for the World Health Organization. The ILO pressed for shorter hours and safer workplaces, and the 1926 Slavery Convention committed members to end slavery. The League also arranged loans that rescued Austria and Hungary.\n\nHowever, its importance had limits. The League could only recommend, so many members ignored ILO conventions, and colonial powers resisted inquiries into forced labour. Above all, humanitarian work did not achieve the League's main aim, to prevent war.\n\nOverall the humanitarian work was arguably the League's most important and lasting achievement, because it changed many lives and continued through the UN's agencies, even though it could not make up for the failure of collective security.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "What happened at Vilna in 1920?", "Polish forces seized the city from Lithuania; the League failed to make Poland withdraw.");
  b.card("FACT", "How was the Aaland Islands dispute settled?", "In 1921 the League gave the islands to Finland, demilitarised them and protected Swedish culture; Sweden accepted.");
  b.card("FACT", "What was the Corfu crisis?", "1923: after General Tellini's murder, Mussolini occupied Corfu; Greece was made to apologise and pay compensation.");
  b.card("FACT", "What happened in Bulgaria in 1925?", "Greece invaded after a border incident; the League ordered withdrawal and compensation, and Greece obeyed.");
  b.card("DEFINITION", "Conference of Ambassadors", "Ambassadors of Britain, France, Italy and Japan who dealt with problems from the peace treaties; it settled Corfu.");
  b.card("DEFINITION", "Nansen passport", "An identity document for stateless refugees, introduced in 1922 under Fridtjof Nansen.");
  b.card("FACT", "Name two agreements of the 1920s made outside the League.", "The Locarno treaties (1925) and the Kellogg-Briand Pact (1928).");
  b.card("CONCEPT", "What pattern explains the League's 1920s record?", "It succeeded when small states accepted its decisions and failed when a determined state or great power defied it.");
  b.card("FACT", "What did the League do about slavery?", "Its Slavery Commission investigated, and the 1926 Slavery Convention committed members to end slavery.");
});
