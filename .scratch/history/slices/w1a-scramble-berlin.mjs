// W1a: hist.colonisation.scramble-berlin (ZIMSEC 7.1).
import { concept, P, source, sources, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonisation.scramble-berlin", { file: "colonisation/scramble-berlin", keyPrefix: "colonisation.scramble-berlin" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who hosted the Berlin Conference?",
    options: [
      ["Otto von Bismarck", "Correct: the German chancellor hosted the conference in Berlin."],
      ["Cecil Rhodes, the Cape businessman", "Rhodes was not at the conference."],
      ["King Leopold II of Belgium", "Leopold's Congo claims were a key issue, but Bismarck hosted the conference."],
      ["Queen Victoria of Great Britain", "Britain attended, but the host was Germany's chancellor."],
    ],
    answer: "A",
    explanation: "Bismarck hosted the conference, which met from November 1884 to February 1885.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "How many African rulers or representatives attended the Berlin Conference?",
    options: [
      ["None", "Correct: Africans were not invited to the conference that set rules for dividing their continent."],
      ["Fourteen, one from each region of Africa", "Fourteen was the number of states attending; none was African."],
      ["Only Lobengula, who sent two izinduna", "Lobengula's envoys went to London in 1889, not to Berlin."],
      ["Only the rulers of Egypt and Ethiopia", "Neither was represented at Berlin."],
    ],
    answer: "A",
    explanation: "Fourteen states attended, all European apart from the United States and the Ottoman Empire; no African ruler was represented.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Berlin principle of **effective occupation** require?",
    options: [
      ["Real control of land on the coast before a claim was valid", "Correct: a power had to show actual control, not just a paper claim."],
      ["That every African ruler must sign a treaty before any land was taken", "The conference did not require African consent."],
      ["That colonies must be occupied within one month of being claimed", "No fixed time limit was set."],
      ["That only Britain could occupy territory in southern Africa", "The rule applied to all powers equally."],
    ],
    answer: "A",
    explanation: "Effective occupation meant officials or forces able to keep order and protect trade; it encouraged powers to rush to occupy land.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these was a **strategic** cause of the scramble for southern Africa?",
    options: [
      ["Protecting the sea route to India via the Cape", "Correct: strategic causes concern routes, bases and security."],
      ["Finding new markets for European factory goods", "That is an economic cause."],
      ["Spreading Christianity through missions", "That is a religious cause."],
      ["Settling unemployed people from European cities", "That is a social cause."],
    ],
    answer: "A",
    explanation: "Strategic causes included protecting the Cape route to India and the Suez Canal, and blocking rival powers.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which dispute was the most important immediate reason for calling the Berlin Conference?",
    options: [
      ["Rival claims around the Congo River", "Correct: Leopold II, France and Portugal all made claims there."],
      ["The war between the Ndebele and the Company", "That war was in 1893-94, after the conference."],
      ["The discovery of gold on the Witwatersrand", "Gold was found on the Rand in 1886, after the conference."],
      ["The opening of the Suez Canal", "The canal opened in 1869; it was a background strategic cause."],
    ],
    answer: "A",
    hints: ["Which great river in central Africa was at the centre of rival claims in 1884?"],
    explanation: "Competing claims around the Congo, and the wish to avoid war and agree rules for future claims, led Bismarck to host the conference.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the purpose of Portugal's **'rose-coloured map'**?",
    options: [
      ["To claim a belt of land linking Angola and Mozambique", "Correct: it clashed with British ambitions to push north from the Cape."],
      ["To show the gold reefs of the Witwatersrand", "The map showed Portuguese territorial claims, not goldfields."],
      ["To divide the Congo between France and Belgium", "It concerned Portuguese claims across south-central Africa."],
      ["To mark the routes of the Pioneer Column", "The column was British; the map was Portuguese."],
    ],
    answer: "A",
    hints: ["Portugal held colonies on both coasts of southern Africa."],
    explanation: "The map showed Portuguese claims across the interior; the British Ultimatum of 1890 forced Portugal to abandon them.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the Berlin Conference is **most accurate**?",
    options: [
      ["It set rules; most borders came in later treaties", "Correct: the conference regulated partition; borders came from separate agreements."],
      ["It drew all the borders of Africa on one map during the conference", "This is a common myth; the conference did not draw the whole map."],
      ["It gave every African territory to Britain and France", "It did not allocate the continent in this way."],
      ["It ended the scramble by forbidding new colonies", "It speeded up the scramble rather than ending it."],
    ],
    answer: "A",
    hints: ["When was the Mozambique-Rhodesia border fixed?"],
    explanation: "The conference agreed rules (effective occupation, notification, free navigation); borders such as Mozambique's with British territory were fixed later (1891).",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence **best** challenges the view that the Berlin Conference started the scramble for Africa?",
    options: [
      ["Britain took Egypt and Germany claimed South West Africa before it met", "Correct: the scramble was already under way."],
      ["Fourteen states attended the conference", "The number of states says nothing about when the scramble began."],
      ["The conference agreed on free navigation of the Congo and Niger", "This is a resolution, not evidence about when the scramble started."],
      ["Leopold II's Congo Free State was recognised", "This is an outcome of the conference."],
    ],
    answer: "A",
    hints: ["Look for events that happened BEFORE November 1884."],
    explanation: "Occupations and claims before the conference (Egypt 1882, South West Africa 1884) show it regulated a scramble already in progress.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Berlin Conference opened in Berlin in November 1884, with Bismarck as host.",
    answer: true,
    explanation: "True. It met from November 1884 to February 1885.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Boer republics took no part in the scramble for southern Africa.",
    answer: false,
    explanation: "False. The South African Republic (Transvaal) and the Orange Free State also wanted land to the north and access to the sea.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of the scramble with its type.",
    pairs: [
      ["Hopes of a 'second Rand' north of the Limpopo", "Economic"],
      ["National prestige for newly united Germany", "Political"],
      ["Protecting the Suez Canal and the Cape route", "Strategic"],
      ["Missionaries calling for European protection", "Religious"],
    ],
    explanation: "Sorting causes by type helps structure an answer: economic, political, strategic, social and religious.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each power with a territory it held or claimed in southern Africa.",
    pairs: [
      ["Britain", "Cape Colony and Natal"],
      ["Portugal", "Mozambique and Angola"],
      ["Germany", "South West Africa"],
      ["Boers", "Transvaal and Orange Free State"],
    ],
    explanation: "These were the main players in the scramble for southern Africa.",
  });
  {
    const t = timeline([
      ["1867", "Diamonds are found near Kimberley"],
      ["1884-85", "The Berlin Conference meets"],
      ["1886", "Gold is found on the Witwatersrand"],
      ["1891", "The Anglo-Portuguese Treaty fixes the Mozambique border"],
    ]);
    const order = [2, 3, 0, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["Diamonds were found before gold.", "The border treaty came last."],
      explanation: "Kimberley diamonds (1867), Berlin Conference (1884-85), Witwatersrand gold (1886), Anglo-Portuguese Treaty (1891).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Under the Berlin rule of {{blank:a}}, a power taking new territory had to inform the others. The conference agreed on free navigation of the Congo and the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["notification"], choices: ["notification", "reconciliation", "incorporation", "indigenisation"] },
      { id: "b", accepted: ["Niger"], choices: ["Niger", "Zambezi", "Limpopo", "Nile"] },
    ],
    explanation: "Notification and effective occupation were the key rules; free navigation applied to the Congo and Niger rivers.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the machine gun whose firepower helped European forces conquer African states in the late nineteenth century.",
    accepted: ["Maxim gun", "Maxim", "the Maxim gun", "Maxim machine gun"],
    wrong: ["Martini-Henry", "musket"],
    explanation: "The **Maxim gun** gave small European forces overwhelming firepower, as in the Anglo-Ndebele War of 1893.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 5,
    stem: "State **five** resolutions of the Berlin Conference.",
    points: [
      "Effective occupation",
      "Notification of other powers",
      "Free navigation of the Congo and Niger rivers",
      "Free trade in the Congo basin",
      "Suppression of the slave trade / recognition of Leopold's Congo / protection of missionaries",
    ],
    modelAnswer: "Claims on the coast required effective occupation; a power had to notify the others of new claims; the Congo and Niger were open to free navigation; there was free trade in the Congo basin; and the powers promised to suppress the slave trade.",
    explanation: "One mark per resolution.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the Berlin Conference was called.",
    points: [
      ["Rival claims around the Congo (Leopold II, France, Portugal) threatened conflict", 2],
      ["To avoid war between European powers and agree rules for future claims and free trade", 2],
    ],
    hints: ["Think of a specific dispute and a general aim."],
    modelAnswer: "First, Leopold II, France and Portugal had competing claims around the Congo River, which threatened conflict between European powers. Second, the powers wanted to avoid war over Africa by agreeing rules for future claims, such as effective occupation and notification, and to secure free trade on the Congo and Niger.",
    explanation: "Two marks per reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the effects of the partition of southern Africa on African societies.",
    points: [
      ["Loss of independence: African states became colonies or protectorates under European rule", 2],
      ["Arbitrary borders split peoples (e.g. the Ndau between Southern Rhodesia and Mozambique) and joined rivals together", 2],
      ["Land loss, taxes and forced labour, which led to resistance and wars (e.g. the risings of 1896-97)", 2],
    ],
    hints: ["Think about sovereignty, borders and everyday life."],
    modelAnswer: "Partition took away the independence of African states, which became colonies or protectorates. The borders drawn by Europeans split peoples apart, such as the Ndau, divided between Southern Rhodesia and Mozambique, and joined rival groups together. Africans lost land to settlers and companies and faced taxes and forced labour, which led to resistance, such as the risings of 1896-97 in Zimbabwe.",
    explanation: "Each effect explained with an example.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "an editorial in a fictional British newspaper, 1885",
          "The great powers have met as gentlemen and agreed rules for the opening of Africa. Commerce and Christianity will now march together, and the slave trader will be driven from the continent."),
        source("Source B", "a cartoon of the kind published in European magazines in the 1880s, described in words",
          "Several men in the uniforms of European nations stand around a table, each holding a knife over a large cake shaped like Africa. Outside the window, a group of Africans watches, uninvited.", { described: true }),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of Source B?", points: ["The European powers were dividing Africa among themselves for their own benefit (like a cake)", "Africans were excluded / not consulted"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source A agree with Source B?", points: ["Both show the powers meeting together to deal with Africa", "A presents the meeting as gentlemanly and beneficial (commerce, Christianity, ending slavery)", "B presents it as greedy division / B shows Africans excluded, A does not mention Africans' views", "Judgement: they agree on the event but disagree on its nature"] }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source gives the more accurate picture of the Berlin Conference? Use your own knowledge.", type: "EXTENDED_RESPONSE", points: [["A: the conference did agree on free trade and suppression of the slave trade, but the editorial ignores self-interest and African exclusion; written to praise Britain's role", 2], ["B: matches own knowledge that no Africans attended and that rules led to rapid partition; a cartoon exaggerates for effect", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Source A is partly accurate: the conference did agree on free trade on the Congo and Niger and on suppressing the slave trade. But it was written by a British newspaper that wanted to present the conference as noble, and it ignores the powers' self-interest and the fact that no African was invited. Source B exaggerates, as cartoons do, because the conference did not itself carve up the whole continent; that happened in later treaties. However, its main points, that the powers acted for their own benefit and that Africans were excluded, match own knowledge. So Source B gives the more accurate overall picture." }),
    ],
    hints: ["Who was at the table, and who was outside the window?"],
    explanation: "Weigh both sources against own knowledge: the conference's stated aims versus its real effect and the exclusion of Africans.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the Scramble for southern Africa.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Name **four** countries involved in the scramble for southern Africa.", points: ["Britain", "Portugal", "Germany", "The Boer republics (Transvaal / Orange Free State)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe **two** economic causes of the scramble for southern Africa.", points: [["The search for raw materials and minerals: diamonds at Kimberley (1867), gold on the Rand (1886), hopes of a 'second Rand'", 2], ["Markets for manufactured goods and places to invest surplus capital", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Economic motives were the main cause of the scramble for southern Africa.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: minerals (diamonds, gold), the second Rand myth, markets and investment; Rhodes's mining interests", 2], ["Against: strategic (Cape route, blocking rivals), political (prestige, rivalry), religious and social motives", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Economic motives were very important in southern Africa. The diamonds of Kimberley and the gold of the Witwatersrand made the region valuable, and hopes of a 'second Rand' north of the Limpopo drove Rhodes and others to seek mining rights. European industry also wanted markets and places to invest. However, other motives mattered too. Britain wanted to protect the Cape route to India and to stop the Boers, Germans and Portuguese from linking up; Germany wanted colonies for prestige; and missionaries called for protection and the end of the slave trade. Economic motives were the main cause in southern Africa, but strategic and political rivalry explains why the scramble became a race." }),
    ],
    hints: ["In (c), explain why the scramble became a race, not just why Europeans wanted land."],
    explanation: "A strong answer weighs economic motives against strategic, political, social and religious ones.",
  });

  b.card("DEFINITION", "What was the **Scramble for Africa**?", "The rapid competition between European powers to claim and occupy African territory, mainly about 1880-1914.");
  b.card("FACT", "When did the Berlin Conference meet?", "November 1884 to February 1885, hosted by Bismarck.");
  b.card("FACT", "How many states attended the Berlin Conference? How many African?", "Fourteen; none African.");
  b.card("DEFINITION", "What was **effective occupation**?", "The rule that a claim to coastal territory was valid only with real control (officials or forces).");
  b.card("CONCEPT", "Name four Berlin resolutions.", "Effective occupation; notification; free navigation of the Congo and Niger; suppression of the slave trade.");
  b.card("DEFINITION", "What is a **sphere of influence**?", "An area where one power claimed sole rights to make treaties and trade, recognised by other powers.");
  b.card("CONCEPT", "Types of cause of the scramble?", "Economic, political, strategic, social and religious.");
  b.card("FACT", "What was the rose-coloured map?", "Portugal's claim to link Angola and Mozambique; abandoned after the British Ultimatum of 1890.");
  b.card("FACT", "When was gold found on the Witwatersrand?", "1886.");
  b.card("CONCEPT", "Effects of partition on Africans?", "Loss of independence, arbitrary borders, land loss, taxes and forced labour, resistance.");
});
