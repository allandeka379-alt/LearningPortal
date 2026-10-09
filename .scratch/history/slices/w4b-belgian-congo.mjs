// Slice W4b: Leopold II and the Congo Free State (0470 Option A key question 5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.imperialism.belgian-congo", { file: "imperialism/belgian-congo", keyPrefix: "imperialism.belgian-congo" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Belgium take over the Congo Free State from Leopold II?",
    options: [
      ["1908", "Correct: it became the Belgian Congo."],
      ["1885", "In 1885 the Congo Free State was set up as Leopold's personal possession."],
      ["1876", "In 1876 Leopold set up the International African Association."],
      ["1960", "The Congo became independent in 1960."],
    ],
    answer: "A",
    explanation: "Belgium annexed the Congo in **1908**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which explorer made treaties with Congolese rulers on behalf of Leopold II between 1879 and 1884?",
    options: [
      ["Henry Morton Stanley", "Correct: he built stations along the Congo River and obtained treaties."],
      ["David Livingstone", "Livingstone died in 1873, before Leopold's Congo project began."],
      ["Roger Casement", "Casement was the British consul who investigated abuses in 1903."],
      ["Cecil Rhodes", "Rhodes worked in southern Africa for Britain, not for Leopold."],
    ],
    answer: "A",
    explanation: "**Stanley** worked for Leopold from 1879 to 1884.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the demand for Congo rubber rise sharply in the 1890s?",
    options: [
      ["It was needed for tyres and electrical cables", "Correct: bicycles, cars and electrical goods used rubber."],
      ["European armies used it to make rifles and bullets", "Rubber was not the main material for weapons."],
      ["It was used as currency in Belgium", "Rubber was a raw material, not currency."],
      ["It replaced cotton as the main material for making clothing in Europe", "Rubber did not replace cotton for clothing."],
    ],
    answer: "A",
    explanation: "**Tyres and cables** created a rubber boom, which Leopold exploited through forced labour.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the Force Publique?",
    options: [
      ["The army of the Congo Free State, which enforced rubber quotas", "Correct: European officers commanded African soldiers, many conscripted."],
      ["A Belgian charity that ran schools and hospitals in the Congo", "It was an army, not a charity."],
      ["The British campaign group that exposed abuses in the Congo", "That was the Congo Reform Association."],
      ["The name of the treaty that ended Leopold's personal rule over the Congo", "Leopold's rule ended when the Belgian parliament annexed the Congo in 1908."],
    ],
    answer: "A",
    explanation: "The **Force Publique** enforced the rubber system with great violence.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which British consul's report of 1904 confirmed abuses in the Congo Free State?",
    options: [
      ["Roger Casement", "Correct: his investigation of 1903 was published in 1904."],
      ["Frederick Lugard", "Lugard was the High Commissioner of Northern Nigeria."],
      ["Henry Morton Stanley", "Stanley had worked for Leopold in 1879-1884."],
      ["J. A. Hobson", "Hobson wrote a book criticising imperialism but did not investigate the Congo."],
    ],
    answer: "A",
    explanation: "The **Casement Report** gave official confirmation of the atrocities.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What made E. D. Morel suspect that rubber was being taken from the Congo by force?",
    options: [
      ["Ships to the Congo carried mainly guns and ammunition, not trade goods", "Correct: if nothing was paid for the rubber, it must have been taken."],
      ["Leopold admitted it in a speech to the Belgian parliament", "Leopold always denied the abuses."],
      ["Stanley had written a book describing the rubber system in detail", "Stanley left Leopold's service before the rubber boom."],
      ["The Berlin Conference had banned trade with the Congo", "The Berlin Conference promised free trade in the Congo basin."],
    ],
    hints: ["Morel worked for a shipping company and studied cargoes."],
    answer: "A",
    explanation: "Morel saw that **nothing of value was sent to pay for the rubber**, so it must have been extracted by force.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the Congo Free State described as an example of 'private imperialism'?",
    options: [
      ["It belonged personally to Leopold II and was run for his profit", "Correct: the Belgian state took no part until 1908."],
      ["It was ruled by the Belgian government from Brussels after 1885", "Belgium did not take it over until 1908."],
      ["It was shared equally between all the powers at the Berlin Conference", "The powers recognised Leopold's personal claim."],
      ["It was governed by African rulers under British supervision", "This describes indirect rule in Nigeria."],
    ],
    hints: ["Who owned the colony?"],
    answer: "A",
    explanation: "It was Leopold's **personal possession**, exploited for his and the companies' profit.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the atrocities in the Congo were part of the system rather than the actions of a few cruel individuals?",
    options: [
      ["Quotas, unpaid labour and bonuses for agents made violence the way to meet targets", "Correct: the system rewarded brutality."],
      ["Most agents were convicted criminals who had been sent out from Belgian prisons as a punishment", "There is no evidence for this; the problem was the system's incentives."],
      ["The Congolese asked for the Force Publique to be sent to their villages", "Villages did not invite the Force Publique."],
      ["Leopold visited the Congo every year to supervise the rubber trade", "Leopold never visited the Congo."],
    ],
    hints: ["Think about how rubber was obtained and how agents were rewarded."],
    answer: "A",
    explanation: "Because rubber was not paid for and agents earned **bonuses by quantity**, force was built into the system.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Leopold II never visited the Congo.",
    answer: true,
    explanation: "True. He ruled it from Belgium through officials and companies.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Historians agree on an exact figure for the number of Congolese who died under Leopold's rule.",
    answer: false,
    explanation: "False. There was no census; estimates vary widely, though many historians judge that the population fell by millions.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["E. D. Morel", "Shipping clerk who led the Congo Reform Association"],
      ["Alice Seeley Harris", "Missionary whose photographs exposed abuses"],
      ["George Washington Williams", "Wrote an open letter to Leopold in 1890"],
      ["Henry Morton Stanley", "Explorer who obtained treaties for Leopold"],
    ],
    explanation: "Morel, Harris and Williams exposed the abuses; Stanley helped Leopold gain the Congo.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Casement Report published",
      "International African Association set up",
      "Belgium annexes the Congo",
      "Congo Free State established",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The Association came before the Free State."],
    explanation: "International African Association (1876); Congo Free State (1885); Casement Report (1904); Belgian annexation (1908).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Congolese villages were given {{blank:a}} of rubber to collect. To force the men to collect it, soldiers often took women and children as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["quotas"], choices: ["quotas", "loans", "licences", "receipts"] },
      { id: "b", accepted: ["hostages"], choices: ["hostages", "students", "servants", "witnesses"] },
    ],
    explanation: "**Quotas** were enforced by taking **hostages**, among other brutal methods.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the King of the Belgians who ruled the Congo Free State as his personal possession.",
    accepted: ["Leopold II", "Leopold", "King Leopold II", "Leopold the Second", "King Leopold"],
    wrong: ["Albert I"],
    explanation: "**Leopold II** (king 1865-1909) ruled the Congo Free State from 1885 to 1908.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how Leopold II gained control of the Congo.",
    points: [
      "Set up the International African Association (1876), presented as scientific and humanitarian.",
      "Hired Stanley (1879-1884) to build stations and obtain treaties from local rulers.",
      "Promised free trade and presented himself as a humanitarian to the powers.",
      "The Berlin Conference (1884-85) recognised his claim; the Congo Free State was set up in 1885 as his personal possession.",
    ],
    modelAnswer: "In 1876 Leopold set up the International African Association, which he presented as a scientific and humanitarian body. He hired Stanley, who between 1879 and 1884 built stations along the Congo River and obtained treaties from hundreds of local rulers. Leopold promised the other powers free trade and presented himself as a humanitarian, and during the Berlin Conference of 1884-85 they recognised his claim. In 1885 the Congo Free State was established as his personal possession.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the population of the Congo fell under Leopold's rule.",
    points: [
      "Identifies killings / violence by the Force Publique and company sentries.",
      "Explains that villages failing quotas were punished and burned, and people killed.",
      "Identifies famine / disease / falling births.",
      "Explains that men forced to collect rubber could not farm, so food ran short, and people who fled were exposed to hunger and epidemics such as sleeping sickness.",
    ],
    hints: ["Violence was one cause; think about what happened to farming and health."],
    modelAnswer: "Many people were killed by the Force Publique and company sentries enforcing rubber quotas, and villages that failed were burned. Even more died indirectly: men were forced into the forest for weeks to collect rubber, so they could not farm and food ran short, and people who fled their villages faced hunger. Weakened communities were hit by epidemics such as sleeping sickness, and births fell. Estimates of the total loss vary widely, but many historians judge it to have been millions.",
    explanation: "Two marks per developed cause.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Leopold II lost control of the Congo in 1908.",
    points: [
      "Identifies evidence from missionaries and visitors (Williams, Sheppard, Harris's photographs).",
      "Explains that this evidence shocked the public in Britain and the USA.",
      "Identifies the work of Morel, Casement and the Congo Reform Association.",
      "Explains that the Casement Report (1904) gave official confirmation and mass meetings increased pressure on governments.",
      "Identifies the 1905 commission of inquiry / pressure on Belgium.",
      "Explains that Leopold's own commission confirmed abuses, so the Belgian parliament voted to annex the Congo.",
    ],
    hints: ["Evidence, campaigning and political pressure."],
    modelAnswer: "Evidence of abuses came from missionaries and visitors: George Washington Williams wrote to Leopold in 1890, and missionaries such as Alice Seeley Harris sent home photographs of mutilated people that shocked the public. E. D. Morel worked out from shipping records that rubber was being taken by force, and the British consul Roger Casement's report of 1904 gave official confirmation. Morel and Casement founded the Congo Reform Association, which held mass meetings in Britain and the USA and pressed governments to act. Finally Leopold's own commission of inquiry confirmed many abuses in 1905, so the Belgian parliament, under international pressure, voted to annex the Congo in 1908.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a statement issued by a fictional press office in Brussels acting for the Congo Free State, 1904", "The Congo Free State has ended the Arab slave trade, built stations and steamers, and brought order where there was chaos. Isolated abuses by a few agents have been punished. The campaign against the State is the work of British merchants jealous of our success and of missionaries who wish to rule in our place.")}\n\n${source("Source B", "a diary entry by a fictional Swedish engineer working on a Congo steamer, 1902, published after his death", "At the post today the sentries brought in a line of women tied by the neck. The agent told me they will be released when their husbands bring the rubber that is owed. He receives a bonus for every kilo above the quota. He said this without shame, as one talks of the weather.")}`,
    hints: ["Ask who produced each source and why it was produced."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source B suggest about how rubber was collected?", points: [
        "By force / hostage-taking (women tied by the neck).",
        "Agents were rewarded for exceeding quotas, so violence was normal.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about the Congo Free State?", points: [
        "A: abuses were isolated and punished.",
        "B: hostage-taking was routine and openly admitted.",
        "A: blames critics' motives (jealous merchants, missionaries); B gives first-hand observation.",
        "Some agreement: A admits some abuses occurred; B shows the State's posts and steamers that A describes.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "Which source is more reliable as evidence about conditions in the Congo? Use the sources and your own knowledge.", points: [
        "A: propaganda by the regime under attack in 1904; purpose to defend Leopold.",
        "A's claims contradicted by the Casement Report (1904) and Leopold's own commission (1905).",
        "B: private diary, eyewitness, no obvious motive to invent; published later (possible editing).",
        "B confirmed by own knowledge: hostages and bonuses for agents were part of the system.",
        "Limitation of B: one post, one day.",
        "Supported judgement that B is more reliable.",
      ], levels: levels(6), modelAnswer: "Source A was issued in 1904 on behalf of the Congo Free State, just as the Casement Report was published and the Congo Reform Association was founded, so its purpose was to defend Leopold's regime and discredit its critics. Its claim that abuses were isolated is contradicted by the Casement Report and by Leopold's own commission of inquiry, which confirmed many abuses in 1905. Source B is a private diary by an eyewitness, with no obvious reason to invent what he saw, although it was published after his death and may have been edited. What it describes, hostage-taking and bonuses for agents, matches what I know about the rubber system. It describes only one post, but Source B is clearly the more reliable.", explanation: "Reliability judged from provenance and from content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the Congo with French and British rule and ask what made it different."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the rubber system in the Congo Free State.", points: [
        "Land declared state property; concessions to companies in which Leopold held shares.",
        "Villages given rubber quotas; men forced to collect wild rubber for little or no pay.",
        "Enforced by the Force Publique and sentries: hostages, flogging (chicotte), burning villages, killings, severed hands.",
        "Agents paid bonuses by results; huge profits for Leopold.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: X, stem: "\"The Congo Free State was the worst example of European rule in Africa.\" How far do you agree? Explain your answer.", points: [
        ["Agree: scale of violence and population loss (estimates of millions).", 3],
        ["Agree: private rule for profit with no outside control; whole system built on forced labour.", 2],
        ["Disagree: forced labour, taxes and violence elsewhere (French indigénat; chibharo in Rhodesia; brutal wars of conquest).", 3],
        ["Disagree: Belgian rule after 1908 remained exploitative; comparison is difficult because sources differ.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "There are strong reasons to agree. In the Congo Free State, forced labour was not a side effect but the basis of the whole economy. Rubber quotas were enforced by the Force Publique and company sentries through hostage-taking, flogging, the burning of villages and killings. The population fell severely; estimates vary, but many historians believe millions died from violence, famine and disease. Because the colony was Leopold's private property, there was no parliament or press at home to restrain him until the international campaign began.\n\nHowever, the Congo was not unique. Forced labour existed in French territories under the indigénat and in Southern Rhodesia, where Africans called it chibharo. Wars of conquest elsewhere were extremely violent, and other colonies used taxes to push Africans into wage labour. Even after Belgium took over in 1908, the Congo remained an exploitative colony with no political rights for Africans. Comparing colonies is difficult because the evidence differs.\n\nOverall I largely agree. Other colonial systems were harsh, but the Congo Free State combined private profit, an economy based entirely on forced extraction and very high loss of life in a way that made it an extreme case, which is why it provoked an international campaign.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Private imperialism", "Colonial rule by an individual or company for private profit, e.g. Leopold II's Congo Free State.");
  b.card("FACT", "When did the Congo Free State exist?", "1885 to 1908, as the personal possession of Leopold II.");
  b.card("DEFINITION", "Force Publique", "The army of the Congo Free State, which enforced rubber quotas.");
  b.card("DEFINITION", "Concession company", "A company given rights by a colonial ruler to exploit a region's resources, often with powers over its people.");
  b.card("FACT", "What did the Casement Report (1904) do?", "Confirmed abuses in the Congo Free State, based on the British consul's investigation of 1903.");
  b.card("FACT", "Who founded the Congo Reform Association in 1904?", "E. D. Morel and Roger Casement.");
  b.card("FACT", "Why did rubber demand rise in the 1890s?", "Bicycle and car tyres and electrical cables.");
  b.card("FACT", "What happened to the Congo in 1908?", "Belgium annexed it, ending Leopold's personal rule; it became the Belgian Congo.");
  b.card("CONCEPT", "Why did the rubber system produce atrocities?", "Rubber was unpaid, quotas were enforced by soldiers, and agents earned bonuses by quantity, so violence was rewarded.");
});
