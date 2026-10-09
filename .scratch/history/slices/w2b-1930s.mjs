// Slice W2b: the League in the 1930s, the Depression, Manchuria and Abyssinia (ZIMSEC 12.3, 0470 B2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.league.1930s", { file: "league/1930s", keyPrefix: "league.1930s" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When did Italy invade Abyssinia?",
    options: [
      ["October 1935", "Correct: on 3 October 1935."],
      ["September 1931", "That is when Japan began to occupy Manchuria."],
      ["December 1934", "That was the Walwal incident, before the invasion."],
      ["March 1936", "That is when Hitler remilitarised the Rhineland."],
    ],
    answer: "A",
    explanation: "Italian forces invaded **Abyssinia** on 3 October 1935.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the League's commission of inquiry into the Manchurian crisis?",
    options: [
      ["Lord Lytton", "Correct: his report was published in October 1932."],
      ["Samuel Hoare", "Hoare was the British Foreign Secretary in the Abyssinian crisis."],
      ["Fridtjof Nansen", "Nansen led the League's refugee work and died in 1930."],
      ["Haile Selassie", "Haile Selassie was the Emperor of Abyssinia."],
    ],
    answer: "A",
    explanation: "The **Lytton Commission** visited Manchuria and condemned Japan's actions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What name did Japan give to the puppet state it created in Manchuria in 1932?",
    options: [
      ["Manchukuo", "Correct: ruled in name by Puyi, the last Chinese emperor."],
      ["Mukden", "Mukden was the city near which the railway incident took place."],
      ["Port Arthur", "Port Arthur was a Japanese-leased naval base in the south of Manchuria."],
      ["Kwantung", "The Kwantung Army was the Japanese force in Manchuria."],
    ],
    answer: "A",
    explanation: "**Manchukuo** appeared independent but was controlled by Japan.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did Japan respond when the League accepted the Lytton Report in February 1933?",
    options: [
      ["Its delegation walked out and Japan left the League", "Correct: Japan announced its withdrawal in March 1933."],
      ["It returned Manchuria to Chinese rule within a year", "Japan kept Manchuria until 1945."],
      ["It accepted economic sanctions imposed by the League", "No sanctions were imposed on Japan."],
      ["It asked the Permanent Court for a new judgement", "Japan did not appeal to the Court."],
    ],
    answer: "A",
    explanation: "Japan walked out of the Assembly and announced in **March 1933** that it was leaving the League.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item was NOT included in the League's sanctions against Italy in 1935?",
    options: [
      ["Oil", "Correct: members feared war and the USA would have kept supplying it."],
      ["Weapons", "An arms embargo was part of the sanctions."],
      ["Loans", "Members were asked to stop lending money to Italy."],
      ["Italian imports", "Members were asked to stop buying Italian goods."],
    ],
    answer: "A",
    explanation: "Sanctions banned arms sales, loans and imports from Italy, but **oil**, coal and steel were not banned.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why were Britain and France reluctant to act firmly against Mussolini in 1935?",
    options: [
      ["They wanted Italy as an ally against Hitler", "Correct: the Stresa Front of April 1935."],
      ["They had both left the League of Nations in 1933", "Japan and Germany left in 1933; Britain and France stayed."],
      ["Abyssinia was not a member of the League", "Abyssinia had joined the League in 1923."],
      ["They had promised Abyssinia to Italy at Versailles", "No such promise was made at Versailles."],
    ],
    answer: "A",
    hints: ["What agreement did Britain, France and Italy make in April 1935?"],
    explanation: "After the **Stresa Front**, Britain and France feared that tough action would push Mussolini towards Hitler.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Hoare-Laval Pact damage the League so badly?",
    options: [
      ["Its leaders were caught rewarding the aggressor", "Correct: it offered Italy much of Abyssinia."],
      ["It made Italy withdraw all its troops from East Africa", "The pact did not do this, and Italy completed its conquest."],
      ["It brought the USA into the League as a full member", "The USA never joined."],
      ["It imposed oil sanctions that ruined the British economy", "Oil sanctions were never imposed."],
    ],
    answer: "A",
    hints: ["What did the British and French foreign ministers secretly offer Mussolini?"],
    explanation: "When the plan leaked in December 1935, it showed that Britain and France were willing to give Italy much of Abyssinia, undermining the sanctions they were supposed to lead.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best explains why the Depression made the League's work harder?",
    options: [
      ["Members would not risk trade by imposing sanctions", "Correct: economic self-interest weakened collective security."],
      ["It caused the League's headquarters in Geneva to close for years", "The League continued to meet in Geneva."],
      ["It led the USA to take over the League's Council", "The USA was never a member."],
      ["It forced the League to stop its humanitarian work", "Its agencies continued working through the 1930s."],
    ],
    answer: "A",
    hints: ["Think about what sanctions cost the countries that apply them."],
    explanation: "With unemployment high, Britain and France were reluctant to impose sanctions that cut their own trade, while the Depression pushed Japan, Italy and Germany towards expansion.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Britain closed the Suez Canal to Italian ships during the Abyssinian crisis.",
    answer: false,
    explanation: "False. The canal stayed open, so Italy could keep supplying its army in East Africa.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Lytton Report found that Japan had acted wrongly in Manchuria.",
    answer: true,
    explanation: "True. It said Manchuria should be returned to Chinese rule, but no sanctions followed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in the crises of the 1930s.",
    pairs: [
      ["Haile Selassie", "Emperor who appealed to the League in Geneva"],
      ["Puyi", "Former emperor installed as ruler of Manchukuo"],
      ["Samuel Hoare", "British Foreign Secretary who resigned in 1935"],
      ["Benito Mussolini", "Italian dictator who ordered the invasion of Abyssinia"],
    ],
    explanation: "Haile Selassie (Abyssinia), Puyi (Manchukuo), Hoare (Hoare-Laval Pact), Mussolini (Italy).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Walwal incident",
      "Japan announces it is leaving the League",
      "Italian forces capture Addis Ababa",
      "The Mukden incident",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["The Manchurian crisis came first."],
    explanation: "Mukden September 1931; Japan leaves March 1933; Walwal December 1934; Addis Ababa May 1936.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Manchurian crisis began with an explosion on a railway near {{blank:a}}. In April 1935 Britain, France and Italy formed the {{blank:b}} Front against German rearmament.",
    blanks: [
      { id: "a", accepted: ["Mukden"], choices: ["Mukden", "Shanghai", "Walwal", "Nanjing"] },
      { id: "b", accepted: ["Stresa"], choices: ["Stresa", "Locarno", "Geneva", "Munich"] },
    ],
    explanation: "The **Mukden** incident (18 September 1931) and the **Stresa** Front (April 1935).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Emperor of Abyssinia who appealed to the League against Italy.",
    accepted: ["Haile Selassie", "Haile Selassie I", "Emperor Haile Selassie", "Hailé Selassié", "Haile Sellassie"],
    wrong: ["Menelik"],
    explanation: "**Haile Selassie** addressed the League Assembly in Geneva in June 1936.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the League's response to the Manchurian crisis.",
    points: [
      "China appealed to the League.",
      "The League sent the Lytton Commission to investigate (report October 1932).",
      "The report condemned Japan and said Manchuria should be returned to China.",
      "The Assembly accepted the report (February 1933) but imposed no sanctions; Japan left.",
    ],
    modelAnswer: "China appealed, and the League sent the Lytton Commission, which took about a year and reported in October 1932 that Japan had acted wrongly and that Manchuria should go back to Chinese rule. The Assembly accepted the report in February 1933, but no sanctions were imposed, and Japan simply left the League.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Mussolini invaded Abyssinia.",
    points: [
      "Identifies the wish for an empire / national prestige.",
      "Explains that Mussolini promised to make Italy great like ancient Rome, and conquest would show this.",
      "Identifies revenge for Adwa (1896).",
      "Explains that the defeat had humiliated Italy and conquest would wipe it out.",
      "Identifies the Depression / economic and strategic gains.",
      "Explains that a colony linking Eritrea and Italian Somaliland seemed to offer land, resources and a distraction from economic problems.",
    ],
    hints: ["Think about prestige, history and economics."],
    modelAnswer: "Mussolini wanted an empire to show that Fascist Italy was a great power, as he had promised his people. Conquest would also avenge Italy's humiliating defeat by the Ethiopians at Adwa in 1896. In addition, the Depression had hit Italy, and a new colony linking Eritrea and Italian Somaliland seemed to offer land for settlers and a victory that would distract Italians from economic hardship.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** consequences of the Abyssinian crisis for the League.",
    points: [
      "Identifies the end of collective security / loss of credibility.",
      "Explains that sanctions, the League's main weapon, were tried and failed, so no one trusted it.",
      "Identifies Italy moving towards Germany / Hitler's opportunity.",
      "Explains: Rome-Berlin Axis 1936, Italy left 1937; Hitler remilitarised the Rhineland in March 1936.",
    ],
    hints: ["Think about the League's reputation and about Hitler."],
    modelAnswer: "First, the crisis destroyed faith in collective security: sanctions had been tried and failed, so small states knew the League could not protect them. Second, it pushed Mussolini towards Hitler, leading to the Rome-Berlin Axis in 1936 and Italy's departure from the League in 1937, while Hitler used the distraction to remilitarise the Rhineland in March 1936.",
    explanation: "Two marks per explained consequence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in a British newspaper in 1935, described in words", "A large, armed figure in a black shirt, labelled \"Italy\", strides over a map of East Africa. Behind him, a group of elderly gentlemen in frock coats, labelled \"League\", stand at the door of a building marked \"Geneva\". One of them holds a tiny net labelled \"Sanctions\"; another holds up a sign reading \"Please stop - except for oil\". A barrel marked \"Oil\" rolls along freely behind the striding figure.", { described: true })}`,
    hints: ["Look at the size of the figures and the oil barrel."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** details that show the cartoonist's view of the League.", points: [
        "The League shown as weak old men / a tiny net for sanctions.",
        "The sign 'except for oil' / the oil barrel rolling freely.",
      ], explanation: "Two details." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of the cartoon? Use details and your own knowledge.", points: [
        "Message: the League's sanctions were too weak to stop Italy.",
        "Detail: tiny net, polite sign, Italy striding on.",
        "Message/knowledge: oil was excluded, so Italy could keep fighting.",
        "Detail: the oil barrel rolling freely.",
      ], explanation: "Message supported by details and knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far was the failure to ban oil the main reason why the League failed to stop Italy? Use the source and your own knowledge.", points: [
        "Oil: excluded from sanctions; Italy's army depended on it.",
        "Other: the Suez Canal stayed open.",
        "Other: Britain and France wanted Italy as an ally (Stresa Front); Hoare-Laval Pact.",
        "Other: the USA was not a member; the war was short (7 months) and sanctions slow.",
        "Other: the League's structural weaknesses / no army.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The failure to ban oil was important, as the cartoon shows: Italy's tanks, lorries and aircraft depended on oil, so without an oil ban the sanctions could not stop the war. However, other factors were just as important. Britain did not close the Suez Canal, so Italian supplies kept flowing. Britain and France wanted Italy as an ally against Hitler after the Stresa Front, and the Hoare-Laval Pact showed they were ready to reward Mussolini. The USA, a major oil supplier, was not a member, and the war lasted only seven months, so sanctions had little time to bite. Overall the oil decision was a symptom of a deeper problem: Britain and France were not willing to risk war to stop Mussolini.", explanation: "Both sides and a judgement." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the two crises on several criteria."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the events of the Manchurian crisis, 1931-1933.", points: [
        "Mukden incident, 18 September 1931: railway explosion blamed on the Chinese.",
        "Kwantung Army occupied Manchuria; puppet state Manchukuo (1932) under Puyi.",
        "China appealed; Lytton Commission reported (October 1932) against Japan.",
        "Assembly accepted the report (February 1933); Japan left the League (March 1933).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The Abyssinian crisis did more damage to the League than the Manchurian crisis.\" How far do you agree?", points: [
        ["Abyssinia: sanctions tried and failed, exposing the League's main weapon.", 2],
        ["Abyssinia: Hoare-Laval showed the leading members betraying the Covenant; close to Europe; drove Italy to Hitler.", 2],
        ["Manchuria: first case of a great power getting away with aggression; no sanctions at all; set a precedent.", 2],
        ["Manchuria: Japan left; showed slowness (a year to report); encouraged later aggressors.", 2],
        ["Distance/context: Manchuria could be excused as far away; Abyssinia could not.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The Abyssinian crisis was arguably more damaging. Here the League did impose sanctions, so when they failed its main weapon was exposed as useless. The sanctions excluded oil, the Suez Canal stayed open, and the leaked Hoare-Laval Pact showed Britain and France secretly offering the aggressor much of Abyssinia. The crisis was close to Europe and involved a League member attacking another, so there was no excuse. It also drove Mussolini towards Hitler and distracted attention while Hitler remilitarised the Rhineland.\n\nOn the other hand, Manchuria came first and set the precedent. A great power seized territory from another member and suffered nothing but criticism; the League took a year to report and imposed no sanctions at all. Japan simply left. Mussolini and Hitler could see that aggression worked.\n\nOverall Manchuria showed the League's weakness, but it could be excused because it was far away and Britain and France had no forces there. Abyssinia destroyed the League's credibility completely, because it failed even when it tried to act, so I largely agree with the statement.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did the Manchurian crisis begin?", "18 September 1931, with the Mukden incident.");
  b.card("DEFINITION", "Manchukuo", "The Japanese puppet state set up in Manchuria in 1932 under Puyi.");
  b.card("FACT", "What did the Lytton Report conclude?", "Japan had acted wrongly and Manchuria should be returned to Chinese rule (October 1932).");
  b.card("FACT", "When did Italy invade Abyssinia?", "3 October 1935.");
  b.card("DEFINITION", "Hoare-Laval Pact", "Secret British-French plan (December 1935) to give Italy much of Abyssinia; its leak discredited the League.");
  b.card("CONCEPT", "Why did sanctions against Italy fail?", "Oil was excluded, the Suez Canal stayed open, Britain and France wanted Italy as an ally, the USA was outside, and the war was short.");
  b.card("CONCEPT", "How did the Depression weaken the League?", "It encouraged aggressive nationalism in Japan, Italy and Germany and made Britain and France unwilling to lose trade through sanctions.");
  b.card("FACT", "When did Japan, Germany and Italy leave the League?", "Japan and Germany announced it in 1933; Italy in 1937.");
  b.card("FACT", "When did Haile Selassie address the League?", "June 1936, in Geneva, after Italy took Addis Ababa.");
});
