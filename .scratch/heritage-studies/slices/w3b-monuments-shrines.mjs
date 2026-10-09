// W3b: National monuments and shrines (her.heritage.monuments-shrines).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.heritage.monuments-shrines", { file: "heritage/monuments-shrines", keyPrefix: "heritage.monuments-shrines" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organisation is responsible for protecting national monuments in Zimbabwe?",
    options: [
      ["National Museums and Monuments of Zimbabwe", "Correct: NMMZ manages museums and protects monuments."],
      ["the Zimbabwe Parks and Wildlife Management Authority", "This authority manages national parks and wildlife, not monuments."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Forestry Commission", "The Forestry Commission manages forests, not monuments."],
    ],
    answer: "A",
    explanation: "National Museums and Monuments of Zimbabwe (NMMZ) manages museums and protects monuments and archaeological sites.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which city is the National Heroes Acre?",
    options: [
      ["Harare", "Correct: the National Heroes Acre is in Harare."],
      ["Bulawayo", "Bulawayo has a provincial heroes acre, not the national one."],
      ["Masvingo", "Masvingo is near Great Zimbabwe, a monument, not the National Heroes Acre."],
      ["Gweru", "Gweru is not the site of the National Heroes Acre."],
    ],
    answer: "A",
    explanation: "The National Heroes Acre, where national heroes are buried, is in Harare.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a **shrine** rather than mainly a monument?",
    options: [
      ["Njelele in the Matobo Hills", "Correct: Njelele is a sacred rain shrine."],
      ["the stone walls at Naletale", "Naletale is a monument kept for its history and decoration."],
      ["the rock paintings at Domboshava", "Domboshava is protected mainly for its rock art and history."],
      ["the stone platforms at Khami", "Khami is an archaeological monument."],
    ],
    answer: "A",
    explanation: "A shrine is a sacred place. Njelele is used for rain-asking and other rituals; the other three are protected mainly for their history.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Domboshava, near Harare, is best known for its …",
    options: [
      ["rock paintings made by the San", "Correct: Domboshava has San rock paintings."],
      ["decorated stone walls of the Torwa state", "That describes Khami or Naletale."],
      ["deep blue limestone pool and caves", "That describes Chinhoyi Caves."],
      ["graves of national heroes of independence", "That describes the National Heroes Acre."],
    ],
    answer: "A",
    explanation: "Domboshava is a granite hill with rock paintings made by San hunter-gatherers.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which monument has stone walls famous for decorative chevron and chequer patterns?",
    options: [
      ["Naletale", "Correct: Naletale's wall is known for its decoration."],
      ["Chinhoyi Caves", "Chinhoyi Caves are natural limestone caves."],
      ["Domboshava", "Domboshava is known for rock paintings."],
      ["the National Heroes Acre", "The Heroes Acre is a modern shrine."],
    ],
    answer: "A",
    explanation: "Naletale, in the Midlands, has one of the most richly decorated stone walls in the country.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Visitors to a monument near Masvingo are seen carrying away small stones from an ancient wall as souvenirs. Which statement **best** explains why this is harmful?",
    options: [
      ["It slowly destroys evidence of the past that cannot be replaced", "Correct: each stone removed damages a structure that cannot be rebuilt as it was."],
      ["It leaves fewer stones for building new houses", "Monument stones are not a building supply."],
      ["It makes the monument too light, so the wind can blow it over", "This is not a realistic effect."],
      ["It means the visitors have to pay a higher entry fee next time", "Fees are not the reason it is harmful."],
    ],
    answer: "A",
    hints: ["Can an ancient wall be rebuilt exactly as it was?"],
    explanation: "Removing stones damages a unique historical structure; such damage is also against the law.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement **best** explains the importance of Great Zimbabwe to national identity?",
    options: [
      ["It shows Africans built a great state and gave the country its name", "Correct: it is a source of pride and of the country's name."],
      ["It is the place where the 2013 Constitution was signed into law by the President", "The Constitution was not signed there."],
      ["It is the burial ground of the heroes who died in the Second Chimurenga", "That is the National Heroes Acre."],
      ["It is the only place in Zimbabwe where tourists are allowed to visit freely", "Many sites are open to visitors."],
    ],
    answer: "A",
    hints: ["Where does the name Zimbabwe come from?"],
    explanation: "Great Zimbabwe is evidence of African achievement, gave the nation its name and the Zimbabwe Bird.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A rural district council wants to allow a quarry right next to a rock-art shelter because it will create jobs. Which response **best** balances heritage and development?",
    options: [
      ["Consult NMMZ and the community, and move the quarry to a site where it will not damage the paintings", "Correct: this protects the heritage and still allows jobs."],
      ["Allow the quarry because jobs are always more important than old paintings", "This ignores the value and legal protection of heritage."],
      ["Close the area to everyone, including local people and schools, so that nobody ever sees the paintings again", "This protects the site but loses its value for education and tourism."],
      ["Copy the paintings onto paper and then let the quarry blast the shelter", "Copies cannot replace the original evidence."],
    ],
    answer: "A",
    hints: ["Look for the answer that keeps both the jobs and the heritage."],
    explanation: "Consultation with the heritage authority and the community allows development without destroying protected heritage.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every national monument in Zimbabwe is also a UNESCO World Heritage Site.",
    answer: false,
    explanation: "False. Only five places in Zimbabwe are World Heritage Sites. Monuments such as Naletale and Domboshava are national monuments but not World Heritage Sites.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Writing names on rock paintings is a form of vandalism.",
    answer: true,
    explanation: "True. Writing on rock art deliberately damages heritage that cannot be replaced, and it is against the law.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each heritage site with what it is best known for.",
    pairs: [
      ["Chinhoyi Caves", "limestone caves with a deep blue pool"],
      ["Khami", "stone platforms of the Torwa state's capital"],
      ["National Heroes Acre", "burial of people declared national heroes"],
      ["Njelele", "a shrine used for rain-asking"],
    ],
    explanation: "Chinhoyi Caves: a natural monument; Khami: the Torwa capital near Bulawayo; National Heroes Acre: a shrine for heroes; Njelele: a rain shrine in the Matobo Hills.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A place kept mainly because of its history, such as Khami, is a {{blank:a}}. A sacred place where people honour the dead or pray, such as a heroes acre, is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["monument"], choices: ["monument", "shrine", "museum", "reserve"] },
      { id: "b", accepted: ["shrine"], choices: ["shrine", "monument", "museum", "reserve"] },
    ],
    hints: ["Which word suggests something sacred?"],
    explanation: "Monuments preserve the past; shrines are sacred places for honouring the dead or for worship.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **two** national monuments and **two** shrines in Zimbabwe.",
    points: [
      "Monument: any one of Great Zimbabwe, Khami, Naletale, Danangombe, Ziwa, Chinhoyi Caves, Domboshava (or another protected site)",
      "A second different monument",
      "Shrine: any one of the National Heroes Acre, a provincial or district heroes acre, Njelele, a traditional rain shrine or sacred place",
      "A second different shrine",
    ],
    modelAnswer: "Monuments: Great Zimbabwe and Chinhoyi Caves. Shrines: the National Heroes Acre and Njelele.",
    explanation: "One mark for each correctly classified example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which monuments benefit the communities near them.",
    points: [
      "Identifies tourism income / jobs",
      "Develops: visitors pay for guides, crafts, food and lodging, so local people earn money",
      "Identifies education / pride / development",
      "Develops: local schools use the site to learn history, and pride in the site encourages people to protect it (or fees fund local projects)",
    ],
    modelAnswer: "Monuments attract tourists who pay for guides, crafts, food and accommodation, so local people find jobs and earn income. They also serve as outdoor classrooms where local schools learn their history, which builds pride and encourages the community to protect the site.",
    hints: ["Think of money and of learning."],
    explanation: "One mark for each benefit and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 6,
    stem: "Suggest **three** measures that could reduce vandalism at a monument visited by many school groups, explaining how each would help.",
    points: [
      "Suggests trained guides or guards accompanying groups",
      "Explains that supervision stops pupils climbing walls or writing graffiti",
      "Suggests fencing, marked paths and signs with rules",
      "Explains that visitors keep to safe routes and know the rules and penalties",
      "Suggests heritage education before the visit (lessons, heritage clubs)",
      "Explains that pupils who understand the value of a site are less likely to damage it",
    ],
    modelAnswer: "Trained guides or guards should accompany each school group, so that pupils are supervised and cannot climb on walls or write graffiti. The site should have fences, marked paths and clear signs giving the rules and penalties, so visitors keep to safe routes. Schools should teach pupils about the site before the trip, for example through heritage clubs, because pupils who understand its value are less likely to damage it.",
    hints: ["Think of supervision, physical protection and education."],
    explanation: "One mark for each measure and one for explaining how it helps.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional district newsletter, Matabeleland South, 2026",
      "Members of the heritage club at a secondary school near Gwanda visited a hill shelter with old rock paintings of giraffe and people. They found that some paintings had been scratched with initials and that the floor was covered in litter and ash from cooking fires. The club cleaned the shelter, photographed the damage and wrote to the village head and the regional heritage office. The village head has called a meeting.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "The paintings in the shelter were most probably made by …",
        options: [
          ["San hunter-gatherers", "Correct: the San made most of the rock paintings in Zimbabwe."],
          ["colonial settlers", "Rock paintings are far older than colonial settlement."],
          ["the Pioneer Column", "The Pioneer Column did not make rock paintings."],
          ["traders from Portugal", "Portuguese traders did not make rock paintings."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** threats to the site mentioned in the source.",
        points: ["Scratching initials on paintings (vandalism)", "Litter and fires / smoke and ash"],
        modelAnswer: "People scratched initials on the paintings, and cooking fires left ash and litter in the shelter.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the heritage club helped to protect the site.",
        points: [
          "They cleaned the shelter, removing litter and ash that damage it",
          "They recorded the damage with photographs, providing evidence for action",
          "They informed the village head and the heritage authority, who have the power to protect the site",
        ],
        modelAnswer: "The club cleaned the shelter, removing the litter and ash that were damaging it. They photographed the damage, which gives evidence of what is happening. They wrote to the village head and the regional heritage office, who have the authority to make rules and protect the site.",
      }),
    ],
    hints: ["In (c), think of what the club did on the day and afterwards."],
    explanation: "A source-based practice item on threats to heritage sites and their protection.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about protecting national monuments and shrines.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the role of National Museums and Monuments of Zimbabwe in protecting heritage.",
        points: [
          "Declares and manages national monuments and archaeological sites",
          "Employs guides and guards; fences and repairs sites",
          "Runs museums that keep and display artefacts",
          "Carries out research and educates the public",
        ],
        modelAnswer: "National Museums and Monuments of Zimbabwe manages national monuments and archaeological sites. It employs guides and guards, fences sites and repairs damaged walls. It runs museums that keep and display artefacts, and it carries out research and educates schools and the public about heritage.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Protecting monuments and shrines is the job of the government alone.\" Discuss.",
        points: [
          ["For: the state has laws, NMMZ, guards, funding and expertise; only it can prosecute offenders", 2],
          ["Against: sites are spread over the country and the state cannot guard them all; communities live beside them", 2],
          ["Against: traditional leaders and custodians protect sacred sites; schools and citizens can visit respectfully and report damage", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The government has an important role. Laws protect monuments, and National Museums and Monuments of Zimbabwe employs guides and guards, repairs sites and runs museums. Only the state can prosecute people who damage or steal heritage.\n\nHowever, the government cannot do this alone. There are many sites spread across the country, and there are not enough staff or funds to guard them all. Local communities live beside the sites and see what happens every day. Traditional leaders and custodians protect sacred places such as rain shrines through custom. Schools and citizens can visit respectfully, keep to paths, never remove objects and report damage.\n\nI disagree with the statement. The government provides the law and expertise, but heritage is protected best when communities, traditional leaders, schools and individual citizens all take part.",
      }),
    ],
    hints: ["In (b), consider what the state can do and what it cannot do without help."],
    explanation: "A practice evaluative item on who should protect heritage sites.",
  });

  b.card("DEFINITION", "National monument", "A place, structure or object of historical, cultural or natural importance protected by law for the whole nation, e.g. Great Zimbabwe.");
  b.card("DEFINITION", "Shrine", "A sacred place where people honour the dead or worship and pray, e.g. the National Heroes Acre or Njelele.");
  b.card("FACT", "Which body protects national monuments in Zimbabwe?", "National Museums and Monuments of Zimbabwe (NMMZ).");
  b.card("FACT", "Where is the National Heroes Acre?", "In Harare.");
  b.card("FACT", "Name four national monuments in Zimbabwe.", "Any four of: Great Zimbabwe, Khami, Naletale, Danangombe, Ziwa, Chinhoyi Caves, Domboshava.");
  b.card("FACT", "What is Njelele?", "A shrine of the Mwari/Mwali religion in the Matobo Hills, used for rain-asking and other rituals.");
  b.card("CONCEPT", "Why are monuments and shrines significant?", "They are evidence of history, build identity and pride, are places of worship and remembrance, bring tourism income and are used for education and research.");
  b.card("FACT", "Name four threats to monuments.", "Any four of: vandalism and graffiti, theft of artefacts, fire, weathering and erosion, plants growing into walls, too many visitors, nearby mining or development.");
  b.card("CONCEPT", "How can citizens help protect heritage sites?", "Visit respectfully, keep to paths, never write on or remove anything, and report damage to the authorities or traditional leaders.");
});
