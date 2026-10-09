// Slice W4b: the Spanish-American War and US imperialism, 1898-1906 (0470 Option A key question 5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.imperialism.us-empire", { file: "imperialism/us-empire", keyPrefix: "imperialism.us-empire" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which American battleship exploded in Havana harbour on 15 February 1898?",
    options: [
      ["USS Maine", "Correct: over 250 sailors died, and many Americans blamed Spain."],
      ["USS Arizona", "The Arizona was sunk at Pearl Harbor in 1941."],
      ["USS Missouri", "The Japanese surrender of 1945 was signed on the Missouri."],
      ["USS Constitution", "The Constitution was a sailing frigate of the early 1800s."],
    ],
    answer: "A",
    explanation: "The explosion of the **USS Maine** helped push the USA into war; its cause has never been proved.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which territories did Spain cede to the United States in the Treaty of Paris of December 1898?",
    options: [
      ["Puerto Rico, Guam and the Philippines", "Correct: Spain also gave up Cuba, which was not annexed."],
      ["Cuba, Hawaii and Alaska", "Cuba was not annexed; Hawaii was annexed separately; Alaska was bought from Russia in 1867."],
      ["Mexico, Panama and Nicaragua", "None of these was part of the treaty."],
      ["Jamaica, Trinidad and the Bahamas", "These were British colonies."],
    ],
    answer: "A",
    explanation: "Spain ceded **Puerto Rico, Guam and the Philippines** and gave up Cuba.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Teller Amendment of April 1898 promise?",
    options: [
      ["That the United States would not annex Cuba", "Correct: this is why Cuba became independent in 1902."],
      ["That the United States could intervene in Cuba whenever it wished", "This was the Platt Amendment of 1901."],
      ["That the Philippines would become independent at once", "No such promise was made; the Philippines became independent in 1946."],
      ["That Spain would be paid for the loss of Cuba", "Spain was paid 20 million dollars for the Philippines in the Treaty of Paris."],
    ],
    answer: "A",
    explanation: "The **Teller Amendment** ruled out annexing Cuba.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was 'yellow journalism'?",
    options: [
      ["Sensational newspaper reporting that stirred up anger against Spain", "Correct: Hearst's and Pulitzer's papers competed for readers."],
      ["Official government reports on the war in Cuba", "These were not called yellow journalism."],
      ["Newspapers printed in Spanish for Cuban readers", "The term described sensational American papers."],
      ["Reports written by members of the Anti-Imperialist League to argue against the war", "The League opposed annexation; it did not produce yellow journalism."],
    ],
    answer: "A",
    explanation: "**Yellow journalism** exaggerated Spanish cruelty to sell papers and helped create pressure for war.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who led the Filipino forces against Spain and then against the United States?",
    options: [
      ["Emilio Aguinaldo", "Correct: he declared independence in June 1898 and was captured in 1901."],
      ["José Martí", "Martí led the Cuban independence movement and was killed in 1895."],
      ["George Dewey", "Dewey was the American commander at Manila Bay."],
      ["Máximo Gómez", "Gómez was a Cuban general."],
    ],
    answer: "A",
    explanation: "**Aguinaldo** led the Philippine Revolution and the war against American rule.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Platt Amendment mean that Cuba was not fully independent after 1902?",
    options: [
      ["It allowed the USA to intervene in Cuba and to keep naval bases there", "Correct: it also limited Cuba's treaties and debts."],
      ["It made Cuba a state of the United States with representatives in Congress", "Cuba never became a US state."],
      ["It returned Cuba to Spanish rule under American protection", "Spanish rule ended in 1898."],
      ["It banned Cubans from voting in their own elections", "Cubans voted; the limits were on Cuba's independence in foreign affairs and US intervention."],
    ],
    hints: ["Look at what the USA could do in Cuba under the amendment."],
    answer: "A",
    explanation: "The **Platt Amendment** gave the USA a right of intervention and bases such as Guantánamo, which it used in 1906.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which argument did anti-imperialists use against keeping the Philippines?",
    options: [
      ["Ruling people without their consent betrayed the Declaration of Independence", "Correct: they said it contradicted America's founding principles."],
      ["The Philippines would give the USA access to the markets of China", "This was an argument for keeping the islands."],
      ["Germany or Japan would take the islands for themselves if the USA left them", "This was an argument for keeping the islands."],
      ["The navy needed a base in the Pacific for its coaling ships", "This was an argument for keeping the islands."],
    ],
    hints: ["Three options were used by supporters of empire."],
    answer: "A",
    explanation: "Anti-imperialists argued that colonial rule **contradicted government by consent**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which fact most strongly challenges the claim that the United States fought Spain in 1898 only to liberate Cubans?",
    options: [
      ["The USA kept the Philippines and fought Filipinos who wanted independence", "Correct: this shows wider imperial aims."],
      ["The USA passed the Teller Amendment promising not to annex Cuba", "This supports the claim of liberation."],
      ["Many Americans were shocked by the Spanish camps in Cuba", "This supports the humanitarian motive."],
      ["Cuba became formally independent, with its own president and constitution, in 1902", "This supports the claim of liberation."],
    ],
    hints: ["Look beyond Cuba."],
    answer: "A",
    explanation: "Keeping the **Philippines** against Filipino wishes shows that imperial motives mattered as well as liberation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The United States annexed Hawaii in 1898.",
    answer: true,
    explanation: "True. Hawaii was annexed in July 1898, during the war with Spain.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "It was proved in 1898 that Spanish agents had blown up the USS Maine.",
    answer: false,
    explanation: "False. The cause has never been proved; many Americans blamed Spain at the time, and a later naval investigation concluded an internal explosion was most likely.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["George Dewey", "Destroyed the Spanish fleet at Manila Bay"],
      ["José Martí", "Leader of the Cuban independence movement"],
      ["William McKinley", "US President who decided to keep the Philippines"],
      ["Mark Twain", "Writer who opposed American imperialism"],
    ],
    explanation: "Dewey (Manila Bay), Martí (Cuba), McKinley (President), Twain (anti-imperialist).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "US troops reoccupy Cuba",
      "Battle of Manila Bay",
      "Platt Amendment",
      "Cuban War of Independence begins",
    ],
    right: POS,
    rightIndex: [3, 1, 2, 0],
    hints: ["The Cuban war began before the Americans became involved."],
    explanation: "Cuban war (1895); Manila Bay (May 1898); Platt Amendment (1901); US troops return (1906).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Under the Platt Amendment the United States gained a naval station at {{blank:a}} in Cuba. Fighting between American and Filipino forces began in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Guantánamo Bay"], choices: ["Guantánamo Bay", "Manila Bay", "Pearl Harbor", "Havana harbour"] },
      { id: "b", accepted: ["February 1899"], choices: ["April 1898", "February 1899", "July 1902", "May 1906"] },
    ],
    explanation: "The base at **Guantánamo Bay**; the Philippine-American War began in **February 1899**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the organisation founded in the USA in 1898 to oppose the annexation of overseas colonies.",
    accepted: ["Anti-Imperialist League", "the Anti-Imperialist League", "American Anti-Imperialist League", "Anti Imperialist League"],
    wrong: ["Congo Reform Association"],
    explanation: "The **Anti-Imperialist League** included Mark Twain and Andrew Carnegie.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the main events of the Spanish-American War of 1898.",
    points: [
      "USS Maine exploded (February); war declared in April with the Teller Amendment.",
      "Dewey destroyed the Spanish fleet at Manila Bay (1 May).",
      "US victories around Santiago de Cuba; Spanish fleet destroyed (July); Puerto Rico occupied.",
      "Armistice (August) and Treaty of Paris (December 1898).",
    ],
    modelAnswer: "After the USS Maine exploded in Havana harbour in February 1898, Congress declared war on Spain in April, promising in the Teller Amendment not to annex Cuba. On 1 May Commodore Dewey destroyed the Spanish fleet at Manila Bay. In July American forces won battles around Santiago de Cuba and the Spanish fleet there was destroyed, and Puerto Rico was occupied. An armistice followed in August, and the Treaty of Paris was signed in December 1898.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the United States decided to keep the Philippines.",
    points: [
      "Identifies economic and strategic motives (markets of China and Asia; Pacific naval base).",
      "Explains that the islands were a stepping stone to Asian trade and a base for the navy (Mahan's ideas).",
      "Identifies fear of rival powers / racist views about self-government.",
      "Explains that leaders argued Germany or Japan would take the islands, and claimed Filipinos were not ready to rule themselves.",
    ],
    hints: ["Think about trade, the navy, rivals and the attitudes of the time."],
    modelAnswer: "The Philippines offered access to the markets of China and Asia and a naval base in the Pacific, which fitted Mahan's argument that a great power needed sea power and bases. McKinley and his supporters also argued that if the USA left, a rival such as Germany or Japan would take the islands, and, using the racist ideas of the time, they claimed that Filipinos were not ready to govern themselves, so the USA had a duty to rule them.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the United States went to war with Spain in 1898.",
    points: [
      "Identifies the Cuban war and the Spanish reconcentration camps.",
      "Explains that reports of suffering created humanitarian sympathy in the USA.",
      "Identifies yellow journalism and the Maine.",
      "Explains that sensational papers blamed Spain for the explosion and turned opinion towards war.",
      "Identifies economic and strategic interests.",
      "Explains that American investment in Cuban sugar and ambitions for naval power made intervention attractive.",
    ],
    hints: ["Sympathy, the press and the Maine, and interests."],
    modelAnswer: "Cuba had been fighting for independence since 1895, and the Spanish general Weyler forced civilians into camps where very many died of disease and hunger; reports of this created strong sympathy for the Cubans. Yellow journalism in Hearst's and Pulitzer's papers exaggerated Spanish cruelty, and when the USS Maine exploded in Havana harbour in February 1898 the papers blamed Spain, turning opinion towards war. The USA also had interests in Cuba: American businesses had invested heavily in sugar, and some leaders wanted to build American naval power in the Caribbean and Pacific.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in American newspapers that supported annexation in 1899, described in words", "Uncle Sam, tall and kindly, stands in a schoolroom with a cane under his arm. On the front bench sit small, childlike figures labelled 'Philippines', 'Cuba', 'Puerto Rico' and 'Hawaii'. One, labelled 'Philippines', is sulking and throwing a book. A sign on the wall reads 'Lessons in self-government'.", { described: true })}\n\n${source("Source B", "a speech by a fictional member of the Anti-Imperialist League at a public meeting in Boston, 1899", "We fought Spain to free Cuba, and now we fight Filipinos for wanting the same freedom. Our forefathers declared that governments derive their just powers from the consent of the governed. Did any Filipino consent to be sold to us for twenty million dollars?")}`,
    hints: ["Identify each source's side in the debate and the techniques it uses."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What is the message of the cartoonist in Source A?", points: [
        "The USA is a kindly teacher bringing 'civilisation' / self-government to its new territories.",
        "Filipinos resisting American rule are shown as naughty children who must be disciplined (cane).",
      ], explanation: "Message supported from details of the cartoon." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about American rule in the Philippines?", points: [
        "A: American rule is benevolent education / Filipinos are not ready to govern themselves.",
        "B: American rule denies freedom and consent; it is a betrayal of American principles.",
        "A: resistance is childish misbehaviour; B: Filipinos want legitimate freedom.",
        "Agreement: both acknowledge that Filipinos resisted American rule.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How useful is Source A as evidence of American attitudes to empire in 1899? Use the source and your own knowledge.", points: [
        "Useful: shows the pro-annexation view of 'civilising' / McKinley's benevolent assimilation.",
        "Useful: shows the racist and paternalist attitudes of the time (peoples drawn as children).",
        "Own knowledge: Philippine-American War began February 1899; Aguinaldo's resistance (throwing the book).",
        "Limitation: one side of a divided debate; anti-imperialists (Twain, Carnegie) disagreed; the Senate vote was close.",
        "Limitation: shows attitudes, not reality: Filipinos had declared independence and fought.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful evidence of the pro-annexation attitude in 1899. It presents the USA as a kindly teacher giving 'lessons in self-government', which reflects McKinley's claim of benevolent assimilation, and its drawing of other peoples as children shows the racist and paternalist ideas used to justify empire. The sulking Philippines figure refers to the resistance led by Aguinaldo, which turned into war in February 1899. However, it shows only one side of a deeply divided debate: anti-imperialists such as Mark Twain and Andrew Carnegie opposed annexation, and the Senate ratified the treaty by just one vote more than needed. It tells us how supporters of empire wanted Americans to see the war, not what it was like for Filipinos. It is very useful for attitudes, provided we remember it represents only one side.", explanation: "Usefulness judged from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider Cuba and the Philippines separately and compare the gains with the costs."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe American involvement in Cuba between 1898 and 1906.", points: [
        "War with Spain (1898); Teller Amendment ruled out annexation.",
        "US military occupation, 1898-1902.",
        "Platt Amendment (1901): right of intervention, naval bases (Guantánamo), limits on treaties and debts.",
        "Cuba independent 20 May 1902; US troops returned after a revolt in 1906.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "\"The Spanish-American War brought freedom to the peoples of Cuba and the Philippines.\" How far do you agree? Explain your answer.", points: [
        ["Agree: ended Spanish rule and the reconcentration camps; Cuba independent in 1902.", 2],
        ["Agree: American schools, roads and health; Philippine Assembly (1907); promise of future self-government.", 2],
        ["Disagree: Philippines annexed without consent; Philippine-American War and its heavy civilian toll.", 2],
        ["Disagree: Platt Amendment, Guantánamo, US intervention in 1906; independence in name only.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "In some ways the war did bring freedom. It ended Spanish rule, which in Cuba had included the reconcentration camps where very many civilians died, and Cuba became formally independent in 1902. In the Philippines, American rule built schools, roads and public health programmes, and an elected Philippine Assembly met from 1907.\n\nHowever, for most Cubans and Filipinos the war replaced one master with another. Spain ceded the Philippines to the USA without consulting Filipinos, who had already declared independence, and the Philippine-American War from 1899 cost at least 200,000 Filipino civilian lives, according to historians' estimates. Cuba's independence was limited by the Platt Amendment, which gave the USA the right to intervene and a naval base at Guantánamo, and US troops returned in 1906.\n\nOverall I largely disagree. The war ended Spanish rule, but it did not give either people real freedom: the Philippines became an American colony until 1946, and Cuba was independent only in name.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did the USS Maine explode?", "15 February 1898, in Havana harbour; the cause has never been proved.");
  b.card("FACT", "What did the Treaty of Paris (10 December 1898) decide?", "Spain gave up Cuba and ceded Puerto Rico, Guam and the Philippines to the USA for 20 million dollars.");
  b.card("DEFINITION", "Teller Amendment", "Congress's promise of April 1898 not to annex Cuba.");
  b.card("DEFINITION", "Platt Amendment", "Terms in Cuba's 1901 constitution allowing US intervention and naval bases, and limiting Cuba's treaties and debts.");
  b.card("DEFINITION", "Yellow journalism", "Sensational newspaper reporting, e.g. by Hearst and Pulitzer, that stirred up support for war with Spain.");
  b.card("FACT", "When was the Philippine-American War?", "From February 1899; declared over in July 1902, though resistance continued in places.");
  b.card("FACT", "Who led the Philippine independence movement against Spain and the USA?", "Emilio Aguinaldo.");
  b.card("FACT", "When did US troops return to Cuba?", "1906, after a revolt; they stayed until 1909.");
  b.card("CONCEPT", "What arguments did anti-imperialists use?", "Colonial rule without consent betrayed the Declaration of Independence; colonies were costly and risky; some also had racist fears.");
});
