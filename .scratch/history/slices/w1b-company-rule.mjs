// Slice W1b: Company rule in Southern Rhodesia, 1890-1923 (ZIMSEC topic 8.1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonial.company-rule", { file: "colonial/company-rule", keyPrefix: "colonial.company-rule" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document created a Legislative Council and a Resident Commissioner in Southern Rhodesia?",
    options: [
      ["The Order in Council of 1898", "Correct: it followed the risings of 1896-97."],
      ["The Rudd Concession signed with Lobengula in 1888", "The Rudd Concession was a mining concession from Lobengula."],
      ["The Land Apportionment Act of 1930", "That Act divided land under Responsible Government."],
      ["The Lancaster House Agreement of 1979", "That agreement led to independence in 1980."],
    ],
    answer: "A",
    explanation: "After the risings Britain wanted closer control of the Company. The **1898 Order in Council** created a Legislative Council (nominated and elected members) and a British Resident Commissioner.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main purpose of the hut tax introduced in 1894?",
    options: [
      ["To force Africans to earn cash by working", "Correct: tax had to be paid in money, so men sought wage work."],
      ["To pay for free schools in the African reserves", "The Company spent very little on African schooling."],
      ["To compensate Lobengula's family for the loss of the kingdom", "No compensation was paid to the royal family."],
      ["To discourage settlers from building houses on African land", "The tax fell on Africans, not settlers."],
    ],
    answer: "A",
    explanation: "Tax was a way of creating a labour supply: to pay it, Africans had to sell crops or work for settlers and mines.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Why was the Rhodesia Native Labour Bureau set up in 1903?",
    options: [
      ["To recruit workers for mines and farms", "Correct: local Africans often avoided low-paid mine work."],
      ["To train African teachers for government schools", "It recruited labour; it did not train teachers."],
      ["To register African voters for the Legislative Council", "Africans had almost no votes; the Bureau recruited labour."],
      ["To settle border disputes between the Company and Portugal", "Border disputes with Portugal were settled by treaty in 1891."],
    ],
    answer: "A",
    explanation: "The Bureau recruited workers, many from Nyasaland, Northern Rhodesia and Mozambique, because employers could not attract enough local labour at the wages they offered.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "From about 1908 the Company changed its economic policy. What did it begin to promote?",
    options: [
      ["White settler farming", "Correct: when large goldfields did not appear, it turned to agriculture."],
      ["African ownership of the large gold mines", "Africans were not given ownership of mines."],
      ["Copper mining on the Zambian Copperbelt", "The Copperbelt is in Northern Rhodesia and developed later."],
      ["The building of the Kariba Dam", "Kariba was built in the 1950s."],
    ],
    answer: "A",
    explanation: "The **white agricultural policy** encouraged settlers to farm, helping the Company sell land and making it less dependent on gold.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In the referendum of 27 October 1922, what did the settler voters choose?",
    options: [
      ["Responsible Government rather than union with South Africa", "Correct: about three-fifths voted for Responsible Government."],
      ["Union with South Africa rather than Responsible Government", "Union was the option that lost."],
      ["Full independence from Britain under Charles Coghlan", "Responsible Government was self-government inside the Empire, not independence."],
      ["The continuation of Company rule for another ten years", "Continued Company rule was not one of the two choices."],
    ],
    answer: "A",
    explanation: "Settlers chose Responsible Government, which began on 1 October 1923. Africans, almost all without votes, had no say.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the 1918 Privy Council judgment weaken the Company's position?",
    options: [
      ["It ruled that unalienated land was the Crown's", "Correct: the Company lost a major claim to the colony's wealth."],
      ["It ordered the Company to return all mines to African chiefs", "No such order was made."],
      ["It made Southern Rhodesia part of the Union of South Africa", "The colony never joined the Union."],
      ["It gave the Resident Commissioner power to dismiss settlers", "The judgment was about land ownership."],
    ],
    answer: "A",
    hints: ["The judgment was about who owned the land not yet granted to anyone."],
    explanation: "The Company had claimed ownership of the colony's unalienated land. The ruling that it belonged to the Crown removed a source of future profit and strengthened the case for ending Company rule.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these was an African economic response to Company rule before about 1920?",
    options: [
      ["Selling maize and other crops to mines and towns", "Correct: peasant production let many pay tax without wage labour."],
      ["Forming the National Democratic Party", "The NDP was formed in 1960."],
      ["Launching an armed struggle from bases in Mozambique", "That belongs to the 1970s."],
      ["Voting in large numbers for the Legislative Council", "Very few Africans could vote."],
    ],
    answer: "A",
    hints: ["Choose a response that belongs to the early twentieth century."],
    explanation: "Many Africans sold grain and other crops to the growing mines and towns, until rents, competition from settler farmers and crowded reserves made this harder.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best explains why the Company was willing to give up governing Southern Rhodesia?",
    options: [
      ["Governing cost money and earned no dividend", "Correct: the Company wanted to escape the costs of administration."],
      ["Settlers had defeated the Company's police in a rebellion", "There was no settler rebellion against the Company."],
      ["The Company had become the government of the Union of South Africa", "The Company never governed South Africa."],
      ["African nationalists forced it out through strikes", "Mass nationalism came much later; Africans had little say in 1922."],
    ],
    answer: "A",
    hints: ["Think about what a business wants from its activities."],
    explanation: "As a business, the Company gained little from the costs of government. Combined with settler pressure and the land judgment, this made it ready to hand over power.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Native Commissioners collected tax, recruited labour and controlled chiefs in their districts.",
    answer: true,
    explanation: "True. Native Commissioners of the Native Affairs Department were the main officials Africans dealt with under Company rule.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Africans voted in large numbers in the referendum of 1922.",
    answer: false,
    explanation: "False. The vote depended on income and property qualifications, so the electorate was almost entirely white.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning under Company rule.",
    pairs: [
      ["Administrator", "The Company's chief official in charge of government"],
      ["Resident Commissioner", "British official who watched over the Company from 1898"],
      ["Native reserve", "Area set aside for African occupation, often on poor land"],
      ["Chibaro", "Recruited contract labour on low wages under harsh conditions"],
    ],
    explanation: "These four terms describe the main institutions and practices of Company rule.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Privy Council land judgment",
      "The hut tax is introduced",
      "The referendum on Responsible Government",
      "The Rhodesia Native Labour Bureau is set up",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Tax came very early; the referendum came last."],
    explanation: "Hut tax 1894; Labour Bureau 1903; Privy Council judgment 1918; referendum 1922.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The settler campaign for self-government was led by {{blank:a}}, and Responsible Government began on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Charles Coghlan"], choices: ["Charles Coghlan", "Ian Smith", "Godfrey Huggins", "Leander Starr Jameson"] },
      { id: "b", accepted: ["1 October 1923"], choices: ["1 October 1923", "27 October 1922", "11 November 1965", "12 September 1890"] },
    ],
    explanation: "Charles Coghlan led the Responsible Government campaign and became the first Premier. The referendum was on 27 October 1922; Responsible Government began on 1 October 1923.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the company that governed Southern Rhodesia from 1890 to 1923.",
    accepted: ["British South Africa Company", "the British South Africa Company", "BSAC", "BSA Company", "Chartered Company", "the BSA Company"],
    wrong: ["Rhodesian Front"],
    explanation: "The **British South Africa Company (BSAC)**, chartered in 1889.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Outline **four** economic policies of the British South Africa Company.",
    points: [
      "Land alienation for settlers / creation of native reserves.",
      "Hut tax (later a tax on adult men) to force Africans into wage labour.",
      "Labour recruitment through the Rhodesia Native Labour Bureau / chibaro.",
      "Support for mining (small workers, royalties) / settler farming from about 1908 / railway building.",
    ],
    modelAnswer: "The Company alienated land for settlers and pushed Africans into reserves; it introduced the hut tax; it recruited labour through the Rhodesia Native Labour Bureau; and it promoted mining and, from about 1908, settler farming.",
    explanation: "One mark per policy.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain how Company policies affected Africans between 1898 and 1923.",
    points: [
      "Land alienation pushed Africans into reserves on poor, dry land.",
      "Crowded reserves made farming harder and pushed men into wage labour.",
      "Tax had to be paid in cash, forcing men to work for settlers or sell crops.",
      "Recruited (chibaro) labour meant low wages and dangerous conditions in compounds.",
      "Pass laws and segregation restricted movement and living areas.",
      "Chiefs lost power to Native Commissioners; little spent on African education and health.",
    ],
    hints: ["Link each policy to a definite effect."],
    modelAnswer: "Land alienation pushed many Africans into reserves on poorer land, which became crowded and made it harder to farm. The tax, payable in cash, forced men to sell crops or work for settlers. Recruited workers on mines faced low wages and dangerous conditions in compounds. Pass laws and segregated locations controlled where Africans could go and live. Chiefs lost authority to Native Commissioners, and the Company left African education to missionaries and spent little on African health.",
    explanation: "One mark per developed effect.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why Company rule ended in 1923.",
    points: [
      "Identifies the Company's financial problems.",
      "Explains: no second Rand and no dividends, so it wanted to escape the cost of government.",
      "Identifies settler pressure / the 1918 land judgment / the 1922 referendum.",
      "Explains it, e.g. settlers resented rule by a profit-making company and voted for Responsible Government.",
    ],
    hints: ["Identify, then explain why each made change happen."],
    modelAnswer: "The Company never found a goldfield like the Rand and paid no dividends while it governed, so it wanted to be free of the costs of administration. At the same time settlers resented rule by a company that owned land, railways and minerals; led by Coghlan they demanded self-government, and in 1922 a majority voted for Responsible Government.",
    explanation: "Two marks per reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Read the source and answer the questions.\n\n${source("Source A", "an article in a fictional settler newspaper in Salisbury, 1921", "For thirty years this country has been run from a London boardroom. The Company owns the railways, holds the minerals and sells us land at its own price, yet it asks us to trust it with our government. Let the shareholders keep their accounts; let the people of Rhodesia keep their country. We are told that union with the South is the safe road. We say a free colony, governed by its own parliament, is the only road.")}`,
    hints: ["Think about whose views the newspaper represents and who is left out."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "According to Source A, why did settlers object to Company rule? Give three reasons.", points: [
        "The country was run from London by the Company's board.",
        "The Company owned the railways and minerals.",
        "It sold land at its own price.",
      ], explanation: "Three points from the source." }),
      P.manual({ label: "(b)", marks: 3, stem: "What was the purpose of Source A? Explain your answer.", points: [
        "To persuade settler readers to support Responsible Government.",
        "Evidence: it attacks the Company and rejects union with the South.",
        "Context: published in 1921, before the 1922 referendum.",
      ], explanation: "Purpose plus evidence and context." }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful is Source A as evidence of why Company rule ended? Use the source and your own knowledge.", points: [
        "Useful: shows settler resentment of the Company's ownership of land, railways and minerals.",
        "Useful: shows the choice between union and Responsible Government, as in the 1922 referendum.",
        "Limited: one-sided propaganda from a settler paper.",
        "Limited: says nothing of the Company's own wish to escape costs or of the 1918 land judgment.",
        "Limited: speaks of \"the people of Rhodesia\" but ignores Africans, who had no vote.",
        "Supported judgement.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A is useful because it shows the settler resentment that helped end Company rule: it complains that the Company owned the railways and minerals and sold land at its own price, and it presents the same choice between union and self-government that voters faced in 1922. However, it is a piece of persuasion written for settler readers before the referendum, so it is one-sided. It does not mention the Company's own wish to escape the costs of government or the 1918 judgment that unalienated land belonged to the Crown. When it speaks of \"the people of Rhodesia\" it means settlers only; Africans had no vote. It is useful on settler motives but gives only part of the explanation.", explanation: "Credit provenance, content and own knowledge with a judgement." }),
    ],
    explanation: "Source-based practice question on the end of Company rule (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider the Company, the settlers, Britain and the courts."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the features of Company administration after 1898.", points: [
        "An Administrator headed the government.",
        "A Legislative Council of nominated and elected (settler) members.",
        "A British Resident Commissioner supervised the Company.",
        "A Native Affairs Department with Native Commissioners in each district.",
      ], explanation: "Four features." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How far were the Company's financial problems responsible for the end of Company rule in 1923?", points: [
        ["Financial problems: no second Rand, cost of government, no dividends paid.", 2],
        ["Developed: Company wanted to hand over administration to cut losses.", 2],
        ["Settler pressure: resentment of Company ownership; Coghlan and the elected members.", 2],
        ["The 1918 Privy Council land judgment weakened the Company's claims.", 2],
        ["British policy: charter extended in 1914 for ten years; Britain unwilling to govern directly; the 1922 referendum.", 2],
        ["Supported judgement weighing the factors.", 2],
      ], levels: levels(12), modelAnswer: "The Company's financial problems were important. It had hoped for a second Rand, but Southern Rhodesia's gold was modest and the cost of governing, policing and building the colony was high. It paid no dividend while it ruled, so its directors wanted to escape the burden of administration.\n\nOther factors also mattered. Settlers resented rule by a company that owned the railways and minerals and sold land at its own price; the elected members of the Legislative Council, led by Charles Coghlan, demanded self-government. The 1918 Privy Council ruling that unalienated land belonged to the Crown removed one of the Company's main assets. Britain did not want to pay to govern the colony itself, and when the charter was extended in 1914 change was expected. Finally the 1922 referendum, in which settlers chose Responsible Government over union with South Africa, decided what would replace Company rule.\n\nFinancial problems explain why the Company was willing to go, but settler pressure and the referendum explain why it ended in 1923 and what followed. They were a necessary cause but not a sufficient one.", explanation: "Top level weighs several factors with a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did Responsible Government replace Company rule?", "1 October 1923, after the referendum of 27 October 1922.");
  b.card("DEFINITION", "Chibaro", "Recruited contract labour on low wages under harsh conditions, especially on mines.");
  b.card("FACT", "What did the 1898 Order in Council create?", "A Legislative Council (nominated and elected members), a British Resident Commissioner and a Native Affairs Department.");
  b.card("FACT", "What was the Rhodesia Native Labour Bureau (1903)?", "A body that recruited African workers, many from neighbouring territories, for mines and farms.");
  b.card("CONCEPT", "Why did the Company introduce the hut tax?", "To force Africans to earn cash, which in practice meant working for settlers and mines.");
  b.card("FACT", "What did the 1918 Privy Council judgment decide?", "Unalienated land belonged to the Crown, not the Company.");
  b.card("CONCEPT", "Give four reasons why Company rule ended.", "Financial losses and no dividends; settler pressure; the 1918 land judgment; British unwillingness to govern directly (and the 1922 referendum).");
  b.card("FACT", "Who led the settler campaign for Responsible Government?", "Charles Coghlan, who became the first Premier in 1923.");
  b.card("CONCEPT", "How did Africans respond to Company rule (other than armed risings)?", "Selling crops to mines and towns, choosing better employers or going to South Africa, joining churches and schools, forming independent churches and petitioning the Crown.");
});
