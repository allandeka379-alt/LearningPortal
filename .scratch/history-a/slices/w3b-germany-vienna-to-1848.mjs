// W3b: ahist.germany.vienna-to-1848 (Both boards; Cambridge key question 2.1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.germany.vienna-to-1848", { file: "germany/vienna-to-1848", keyPrefix: "germany.vienna-to-1848" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which body, set up in 1815, brought the German states together after the defeat of Napoleon?",
    options: [
      ["The German Confederation, with a Diet at Frankfurt", "Correct: the Confederation was created by the Congress of Vienna."],
      ["The Zollverein, with its own elected parliament at Berlin", "The Zollverein was a customs union begun later, and had no parliament."],
      ["The Holy Roman Empire, ruled by the Habsburgs", "Napoleon abolished the Empire in 1806; it was not revived."],
      ["The North German Confederation, led by Prussia", "That body was created only in 1867."],
    ],
    answer: "A",
    explanation: "The Congress of Vienna created the German Confederation of 39 states, with a Federal Diet at Frankfurt presided over by Austria.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which event led directly to the Carlsbad Decrees of 1819?",
    options: [
      ["The assassination of the writer Kotzebue by a student", "Correct: Metternich used the murder to justify repression."],
      ["The Hambach Festival attended by thousands of people", "Hambach took place in 1832, thirteen years later."],
      ["The revolution in Paris that overthrew Charles X in 1830", "This was in 1830, after the Decrees."],
      ["The refusal of the Prussian United Diet to grant a loan", "This happened in 1847."],
    ],
    answer: "A",
    explanation: "Sand's murder of Kotzebue in March 1819 gave Metternich the excuse to persuade the Confederation to pass the Carlsbad Decrees in September 1819.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the Carlsbad Decrees do?",
    options: [
      ["They censored the press and put the universities under supervision", "Correct: curators watched teaching and the Burschenschaften were banned."],
      ["They ended the tariffs between the member states of the Confederation", "That was the work of the Zollverein."],
      ["They gave every German state an elected parliament with a wide vote", "The Decrees aimed to restrict, not extend, representation."],
      ["They made the Prussian king the head of the Confederation's army", "Nothing of the kind was decided."],
    ],
    answer: "A",
    explanation: "The Decrees introduced press censorship, banned the student fraternities (Burschenschaften), appointed curators to watch the universities and set up an investigating commission at Mainz.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which was a weakness of the German Confederation after 1815?",
    options: [
      ["Its Diet was made up of envoys of the princes and not elected", "Correct: it did not represent the people and took instructions from rulers."],
      ["It included the whole of the Austrian Empire with all its peoples", "Austria belonged only for its German-speaking lands."],
      ["It gave the largest share of power to the smaller states", "Austria presided, and the larger states were the strongest."],
      ["It was ruled directly by a Prussian king from Frankfurt", "The Diet at Frankfurt was presided over by Austria, not ruled by a Prussian king."],
    ],
    answer: "A",
    explanation: "The Diet had no elected members, no real executive and needed near-unanimity for important decisions, so it could not respond to liberal and national hopes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Zollverein of 1834 matter for Prussia's position in Germany?",
    options: [
      ["It linked most states in a market led by Prussia, without Austria", "Correct: Prussia gained economic leadership."],
      ["It gave the Prussian king the right to command every German army", "It was a customs union, with no military role."],
      ["It made Prussia pay the debts of the smaller states in return for votes", "No such arrangement existed."],
      ["It included Austria and so allowed both powers to share control equally", "Austria did not join, so equal control did not exist."],
    ],
    answer: "A",
    hints: ["Ask which great power was left outside."],
    explanation: "Austria stayed out of the Zollverein, so Prussia became the economic leader of the north and, more gradually, its political rival.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the Six and Ten Articles of 1832?",
    options: [
      ["They tightened controls on assemblies and political associations", "Correct: this was the Confederation's answer to Hambach."],
      ["They created an all-German parliament elected by male householders", "The Articles were repressive, not constitutional."],
      ["They merged the Burschenschaften into a single national organisation", "The fraternities had been banned in 1819."],
      ["They approved the first national railway between Nuremberg and Fürth", "The railway opened in 1835 and needed no such decree."],
    ],
    answer: "A",
    hints: ["Think of what the Confederation feared after the Hambach Festival."],
    explanation: "The Six Articles strengthened the princes against their own assemblies and the Ten Articles banned political associations, public meetings and symbols.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the Prussian United Diet of 1847 is supported by the evidence?",
    options: [
      ["It showed liberals would use the king's need for money to demand reform", "Correct: they refused the loan without regular parliaments."],
      ["It proved that most Prussians wanted a republic in place of the monarchy", "The liberals asked for a constitution, not a republic."],
      ["It showed that all Prussian classes supported the king's railway plans", "The majority of the deputies refused the loan."],
      ["It was a success for the king, who obtained the loan and a new army", "The king dissolved the Diet without the loan."],
    ],
    answer: "A",
    hints: ["What did the deputies demand before agreeing to the loan?"],
    explanation: "The king called the Diet to approve a railway loan; the liberal majority refused without a promise of regular parliaments, and he dissolved it.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which view of the Zollverein would most historians accept?",
    options: [
      ["It prepared the ground for unification but did not make unification inevitable", "Correct: economic links helped but politics and war were still needed."],
      ["It made political unification certain by 1834 and left nothing to later leaders", "Unification needed wars and decisions after 1862."],
      ["It had no effect on the position of Prussia in Germany at all", "It strengthened Prussia's economic leadership."],
      ["It was a creation of Austria designed to unite all the German states", "Austria stayed out and Prussia led it."],
    ],
    answer: "A",
    hints: ["Think of what the Zollverein did and what it could not do."],
    explanation: "The Zollverein created economic links and Prussian leadership in the north, but political unity depended on later events, including Bismarck's wars.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Zollverein began on 1 January 1834.",
    answer: true,
    explanation: "True. It followed Prussia's customs law of 1818 and the agreements of the early 1830s.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "German liberals in this period mostly wanted a republic with votes for every adult male.",
    answer: false,
    explanation: "False. Most liberals wanted a constitutional monarchy and a vote limited by property; many feared the poor as much as the princes.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Economic distress in the 1840s was a cause of the 1848 revolutions only for factory owners.",
    answer: false,
    hints: ["Think of weavers, artisans and peasants."],
    explanation: "False. Artisans hurt by factory competition, weavers, townspeople facing high food prices and unemployed workers all had grievances.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each name or term with its meaning.",
    pairs: [
      ["Metternich", "Austrian chancellor who led the conservative system"],
      ["Burschenschaft", "Student fraternity banned in 1819"],
      ["Hambach Festival", "1832 gathering demanding freedom and German unity"],
      ["Zollverein", "Customs union led by Prussia"],
    ],
    explanation: "These four terms occur in every answer on Germany before 1848.",
  });
  {
    const events = [
      "The Carlsbad Decrees",
      "The Hambach Festival",
      "The Zollverein comes into force",
      "The Prussian United Diet is dissolved",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1819, 1832, 1834 and 1847."],
      explanation: "Carlsbad Decrees, September 1819; Hambach, May 1832; Zollverein, 1 January 1834; United Diet, 1847.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Carlsbad Decrees of {{blank:a}} were passed under the influence of {{blank:b}}, the Austrian chancellor.",
    blanks: [
      { id: "a", accepted: ["1819"], choices: ["1815", "1819", "1830", "1848"] },
      { id: "b", accepted: ["Metternich"], choices: ["Metternich", "Bismarck", "Kossuth", "Radetzky"] },
    ],
    explanation: "The Decrees date from September 1819 and were Metternich's work.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Austrian statesman led the conservative system in Germany between 1815 and 1848? Give his surname.",
    accepted: ["Metternich", "von Metternich", "Prince Metternich", "Klemens von Metternich"],
    wrong: ["Bismarck"],
    explanation: "**Metternich**, foreign minister from 1809 and chancellor from 1821.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe two weaknesses of the German Confederation.",
    points: [["The Diet consisted of envoys of the princes, not elected representatives, so it did not represent the people", 2], ["Important decisions needed near-unanimity and there was no common executive, currency or effective army, so it could not act firmly", 2]],
    modelAnswer: "The Diet consisted of envoys of the princes who took instructions from their rulers, so it did not represent the people. Important decisions needed near-unanimity and there was no common executive, currency or effective army, so the Confederation could not act firmly.",
    explanation: "One mark for each weakness and one for a supporting detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Carlsbad Decrees did not end liberal and nationalist ideas in Germany.",
    points: [["They controlled the press, universities and societies but could not control ideas that spread by speech, songs and private letters", 2], ["Southern states with constitutions and the economic change that created a middle class kept demand for reform alive, as the Hambach Festival of 1832 showed", 2]],
    hints: ["Think of what repression could not reach."],
    modelAnswer: "The Decrees controlled the press, universities and societies, but they could not control ideas that spread by speech, songs and private letters. Southern states with constitutions and economic change that created a middle class kept the demand for reform alive, as the Hambach Festival of 1832 showed.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how railways contributed to the growth of nationalism in the German states.",
    points: [["They moved people, goods and newspapers faster, so ideas and a sense of a common nation spread between states", 2], ["They stimulated industry and a larger middle class and working class in towns, who were more open to demands for change", 2]],
    hints: ["Think of communication and of social change."],
    modelAnswer: "Railways moved people, goods and newspapers faster, so ideas and a sense of belonging to one nation spread between states. They also stimulated industry and so enlarged the middle class and the working class in towns, who were more open to demands for change.",
    explanation: "One mark for each reason and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a petition from a fictional group of Rhineland merchants to their king, 1845",
        "Our trade is choked by tolls at every border. A customs union has helped us, but the railways need money, and the government will not tell us how the money is spent. We ask humbly that the king allow representatives of the people to be consulted regularly."),
      "",
      source("Source B", "a report by a fictional police official in a university town, 1841",
        "The students are quiet in the lecture hall, but at night they sing songs of German freedom. The censor reads the newspapers, yet the same ideas are carried in letters and in books from other states."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the demands of the middle class?", points: ["Free trade / an end to tolls and use of the customs union", "Regular consultation of representatives of the people about the use of money"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of the problems facing the rulers of the German states.", points: [["Agree: both show pressure for change that rulers had not removed, in the form of political demands or songs", 2], ["Differ: A shows an economic and constitutional demand made respectfully by merchants; B shows nationalist feeling among students and the failure of censorship", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the causes of the 1848 revolutions?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a petition by interested merchants, so it exaggerates their case, but it shows the link between economic change and political demands that fits the Zollverein and railway evidence", 2], ["B is a police report of the sort the authorities used to track unrest; its writer was close to events and had no reason to exaggerate the students' success, but it concerns only one town", 2], ["Own knowledge: the Carlsbad Decrees, Hambach and the United Diet of 1847 support the picture, but the sources say nothing of the poverty of workers and peasants, so they are limited", 2]], modelAnswer: "Source A is useful because it shows how economic change led to political demands: the merchants linked trade, railways and the need to consult the people. As a petition from interested merchants it presents their case, and it is polite in tone. Source B is useful because it was written by an official close to events who had no reason to exaggerate the students' success, and it shows that censorship, introduced by the Carlsbad Decrees, did not stop ideas. It deals with one town only. My own knowledge supports both, since the Zollverein, the railways and the United Diet of 1847 all raised demands for representation. But neither source mentions the hardship of workers and peasants in 1846-47, so for the full causes of 1848 they are useful but limited." }),
    ],
    hints: ["For (c), consider who wrote each source, why, and what they leave out."],
    explanation: "Both sources are invented: a petition and a police report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was the economic and social change of the 1830s and 1840s more important than liberal and nationalist ideas in causing the revolutions of 1848?",
    levels: levels(8),
    points: [
      ["Economic and social change: Zollverein, railways, urbanisation, hardship of artisans and weavers, harvest failure and the crisis of 1846-47", 2],
      ["Ideas: liberalism among the middle class, nationalism in universities and festivals, and the failure of the Confederation to satisfy them", 2],
      ["Links: change created the middle class and the distressed groups who gave ideas their support", 2],
      ["Judgement on which was more important, with a reason", 2],
    ],
    hints: ["Ask which group gave the revolutions their crowds and which gave their demands."],
    modelAnswer: "Economic and social change was more important in making revolution happen in 1848, but ideas decided what the revolutionaries demanded. The Zollverein and railways created a larger middle class, while factory competition, urbanisation, the potato blight and the crisis of 1846-47 left artisans, weavers and peasants in distress, so crowds were ready to protest. Liberal and nationalist ideas, spread by universities, festivals such as Hambach and songs, gave this discontent direction in the form of demands for constitutions and unity, and the Confederation had no means of satisfying them. Without ideas, hardship might have produced riots; without hardship, ideas might have remained the concern of educated men, as they had been since 1819. I conclude that the crisis of the 1840s was the trigger, while the ideas were the underlying cause that shaped the demands.",
    explanation: "Credit developed factors, links between them and a supported judgement.",
  });

  b.card("DEFINITION", "What was the German Confederation?", "A loose association of 39 German states created in 1815, with a Diet of princes' envoys at Frankfurt presided over by Austria.");
  b.card("DEFINITION", "What was the Zollverein?", "A customs union led by Prussia, in force from 1 January 1834, that removed tariffs between its members; Austria was not a member.");
  b.card("FACT", "What did the Carlsbad Decrees (1819) do?", "Censored the press, banned the Burschenschaften, put universities under curators and set up an investigating commission at Mainz.");
  b.card("FACT", "What was the Hambach Festival?", "A May 1832 gathering of tens of thousands in the Bavarian Palatinate that demanded freedom and German unity.");
  b.card("FACT", "What were the Six and Ten Articles of 1832?", "Repressive measures that strengthened princes against their assemblies and banned political associations, meetings and national symbols.");
  b.card("FACT", "When did the first German railway open?", "1835, between Nuremberg and Fürth.");
  b.card("CONCEPT", "Why did liberals and nationalists often work together before 1848?", "Both wanted an end to princely absolutism and censorship; liberals sought constitutions, nationalists sought a united state, and the Confederation resisted both.");
  b.card("CONCEPT", "Why did the crisis of 1846-47 matter?", "Harvest failure, high food prices and an industrial slump brought distress to workers and artisans, who then joined the middle class in political protest.");
  b.card("CONCEPT", "What were the strengths of the German Confederation?", "It protected the states from French attack, kept Austria and Prussia cooperating, and preserved peace between German states for decades.");
});
