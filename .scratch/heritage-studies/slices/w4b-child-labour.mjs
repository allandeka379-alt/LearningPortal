// W4b: Child labour (her.global.child-labour).
// Reviewer note: the lesson says Zimbabwe has ratified ILO Conventions 138 and 182 (both in 2000, as recalled); no item hinges on the year.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.global.child-labour", { file: "global/child-labour", keyPrefix: "global.child-labour" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under the Constitution of Zimbabwe, a child is a person under the age of",
    options: [
      ["18", "Correct: section 81 defines a child as under 18."],
      ["16", "16 is not the constitutional age."],
      ["21", "21 was the age of majority before 1982."],
      ["13", "13 is not the constitutional age."],
    ],
    answer: "A",
    explanation: "Section 81 defines a child as every person under 18.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which section of the Constitution protects children from child labour?",
    options: [
      ["section 81", "Correct: section 81 sets out the rights of children."],
      ["section 4", "Section 4 names the national flag and other symbols."],
      ["section 73", "Section 73 gives environmental rights."],
      ["section 162", "Section 162 lists the courts."],
    ],
    answer: "A",
    explanation: "Section 81 protects children from economic and sexual exploitation, child labour and abuse.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a child's **responsibility** rather than child labour?",
    options: [
      ["sweeping the yard before going to school", "Correct: light, short and leaves time for school."],
      ["working nights at a bus terminus", "Night work in an unsafe place is child labour."],
      ["digging in a gold pit instead of attending school", "Dangerous work that replaces school is child labour."],
      ["working full-time as a maid in another family's home", "Full-time domestic work is child labour."],
    ],
    answer: "A",
    explanation: "Light, safe, age-appropriate tasks that leave time for school are children's responsibilities.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which ILO convention calls for urgent action against the **worst forms** of child labour?",
    options: [
      ["Convention No. 182", "Correct: the Worst Forms of Child Labour Convention, 1999."],
      ["Convention No. 138", "No. 138 sets minimum ages for work."],
      ["the Paris Agreement", "This is about climate change."],
      ["the Palermo Protocol", "This is about trafficking in persons generally."],
    ],
    answer: "A",
    explanation: "ILO Convention No. 182 (1999) targets the worst forms; No. 138 (1973) sets minimum ages.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **main** cause of child labour in many families?",
    options: [
      ["poverty", "Correct: families depend on children's earnings or labour."],
      ["too many schools in rural areas", "More schools would reduce child labour."],
      ["strong enforcement of labour laws", "Strong enforcement reduces child labour."],
      ["free school feeding", "School feeding keeps children in school."],
    ],
    answer: "A",
    explanation: "Poverty pushes families to rely on children's income, which keeps children out of school.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai, aged 12, herds a neighbour's cattle from dawn to dusk for food and has not attended school this term. Which right is **most directly** being denied?",
    options: [
      ["the right to education", "Correct: the work keeps him out of school."],
      ["the right to vote", "Voting begins at 18."],
      ["the right to own land", "This is not the right at issue."],
      ["the right to stand for public office", "This is an adult political right."],
    ],
    answer: "A",
    hints: ["What is Farai missing every day?"],
    explanation: "Long hours of work keep Farai out of school, denying his right to education and to protection from child labour.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which measure would **best** help an orphan who has left school to work?",
    options: [
      ["assistance with school fees and support for the household", "Correct: it removes the reason for working."],
      ["a fine on the orphan for not attending school", "Punishing the child does not remove the cause."],
      ["longer working hours so the child earns more", "This makes the child labour worse."],
      ["sending the child to work in a mine", "Mining is a dangerous form of child labour."],
    ],
    answer: "A",
    hints: ["Remove the cause, not punish the child."],
    explanation: "Support with fees and household needs allows the child to return to school.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why laws alone have not ended child labour?",
    options: [
      ["Poverty remains and inspections rarely reach informal work", "Correct: causes remain and enforcement is limited."],
      ["Zimbabwe has no law that mentions children at all", "The Constitution and Children's Act protect children."],
      ["Child labour is encouraged by the ILO conventions", "The conventions oppose child labour."],
      ["All children prefer working to going to school", "This is not true and not a reason."],
    ],
    answer: "A",
    hints: ["What do laws not change, and where is it hard to enforce them?"],
    explanation: "Laws set standards, but poverty continues and inspectors rarely reach homes, farms and informal mines.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "World Day Against Child Labour is marked on 12 June.",
    answer: true,
    explanation: "True. The ILO marks World Day Against Child Labour on 12 June.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All work done by children is child labour.",
    answer: false,
    explanation: "False. Light, safe, age-appropriate chores that leave time for school and play are children's responsibilities.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each law or convention with what it does.",
    pairs: [
      ["Constitution, section 81", "protects children in Zimbabwe from child labour and exploitation"],
      ["ILO Convention No. 138", "sets minimum ages for work"],
      ["ILO Convention No. 182", "calls for action against the worst forms of child labour"],
      ["UN Convention on the Rights of the Child", "a worldwide treaty on children's rights (1989)"],
    ],
    explanation: "Each instrument protects children in a different way, at national or international level.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Classify each situation.",
    template: "Tafadzwa (13) fetches water before school: {{blank:a}}. Sipho (11) carries loads at a market all day instead of attending school: {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["a child's responsibility"], choices: ["a child's responsibility", "child labour"] },
      { id: "b", accepted: ["child labour"], choices: ["child labour", "a child's responsibility"] },
    ],
    hints: ["Ask: does the work stop the child from going to school?"],
    explanation: "Short, safe chores before school are responsibilities; all-day work that replaces school is child labour.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** forms of child labour found in Zimbabwe.",
    points: [
      "Any one of: farm labour (commercial farms, herding instead of school), mining/gold panning, domestic labour (maids), street vending/begging, carrying loads, trafficking/sexual exploitation",
      "A second different form",
      "A third different form",
      "A fourth different form",
    ],
    modelAnswer: "Working on commercial farms, gold panning, working as a full-time maid and street vending.",
    explanation: "One mark per correct form.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of child labour on a child.",
    points: [
      "Identifies loss of education",
      "Develops: the child misses school or is too tired to learn, so skills and future earnings are low",
      "Identifies harm to health",
      "Develops: injury, poisoning (e.g. mercury, pesticides), exhaustion, stunted growth",
      "Identifies emotional harm / exposure to abuse / loss of childhood",
      "Develops: stress and low self-esteem; no time to rest or play; risk of exploitation",
    ],
    modelAnswer: "The child misses school or is too tired to learn, so they grow up with few skills and low earnings. Heavy or dangerous work can cause injuries, poisoning from mercury or pesticides, and exhaustion. The child also loses their childhood, with no time to rest or play, and may be abused or exploited by adults.",
    hints: ["Think of schooling, body and mind."],
    explanation: "One mark for each effect and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a school could reduce child labour among its learners, and explain how each would help.",
    points: [
      "Suggests following up absent learners / working with parents and community leaders",
      "Explains that cases are discovered early and families are persuaded or supported",
      "Suggests school feeding / helping vulnerable learners get fee assistance / awareness lessons / reporting to social welfare",
      "Explains how it removes a cause or protects the child",
    ],
    modelAnswer: "Teachers could follow up every learner who is absent for several days and visit the family with a community leader, so that child labour is discovered early. The school could also help vulnerable learners apply for fee assistance, so that poverty does not push them out of school and into work.",
    hints: ["Detect cases and remove causes."],
    explanation: "One mark for each suitable way and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: source("Source A", "a letter written by a fictional Form 2 learner to a school guidance teacher, 2026",
      "Dear Teacher, my friend Thandeka has missed school for three weeks. Since her mother fell ill she works at a house in town, cooking, cleaning and looking after two small children from six in the morning until late at night. She sends the money home. She says she will come back to school 'one day'. I do not know what to do. Please help her.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which form of child labour is described in the source?",
        options: [
          ["domestic labour", "Correct: she works in another family's home."],
          ["mining", "No mining is described."],
          ["street vending", "She works inside a house, not on the street."],
          ["farm labour", "No farm work is described."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** reasons, from the source, why Thandeka's work is child labour rather than a responsibility.",
        points: ["She has missed school for three weeks", "Very long hours (six in the morning until late at night)"],
        modelAnswer: "She has stopped attending school, and she works very long hours, from six in the morning until late at night.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain what the guidance teacher could do to help Thandeka.",
        points: [
          "Contact Thandeka and her family to understand the situation",
          "Link the family to support (social welfare, fee assistance, help for the sick mother)",
          "Report the case to the right authorities (e.g. social welfare / police Victim Friendly Unit) if she is at risk; help her return to school",
        ],
        modelAnswer: "The teacher could visit Thandeka's family to understand the situation. She could link the family to the Department of Social Welfare for support and help with fees, so Thandeka does not need to work. If Thandeka is at risk, the teacher should report the case to the authorities and help her return to school.",
      }),
    ],
    hints: ["In (c), think about the cause of her working."],
    explanation: "A source-based practice item on recognising and responding to child labour.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about protecting children from child labour.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Distinguish between child labour and children's responsibilities.",
        points: [
          "Child labour: harmful work, too heavy, long, dangerous or early for the child's age",
          "It stops schooling or harms health / benefits someone else",
          "Responsibilities: light, safe, age-appropriate tasks",
          "They leave time for school, rest and play and teach skills",
        ],
        modelAnswer: "Child labour is work that is too heavy, too long, too dangerous or too early for a child's age; it harms the child's health or stops them going to school. Children's responsibilities are light, safe, age-appropriate tasks such as sweeping or fetching water, which leave time for school, rest and play and teach skills.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "How far do laws and conventions protect children in Zimbabwe from child labour?",
        points: [
          ["What the laws and conventions provide: section 81, Children's Act, Labour Act, ILO 138 and 182, UNCRC, African Charter", 3],
          ["Successes: set clear standards, allow prosecution and inspection, support awareness and school-based protection", 3],
          ["Limits: poverty, orphanhood, informal and hidden work (homes, illegal mines), few inspectors, attitudes, cases not reported", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "Zimbabwe has strong legal protection on paper. Section 81 of the Constitution protects every child under 18 from economic exploitation and child labour. The Children's Act provides for the care and protection of children, and the Labour Act controls the employment of young persons. Internationally, Zimbabwe has ratified ILO Conventions 138 and 182, and it is a party to the UN Convention on the Rights of the Child and the African Charter on the Rights and Welfare of the Child.\n\nThese laws do protect many children. They set a clear standard that employers and communities know, they allow employers who exploit children to be prosecuted, and they support awareness campaigns, inspections of formal workplaces and school-based efforts to keep children in class.\n\nHowever, the protection is limited in practice. Poverty, orphanhood and illness in families push children into work whatever the law says. Much child labour is hidden: in other people's homes, on remote farms and at illegal mining sites that inspectors rarely reach. Some people still see children's earnings as normal, and many cases are never reported.\n\nI therefore judge that laws and conventions protect children only to a limited extent. They are an essential foundation, but children are fully protected only when the laws are enforced and combined with support for poor families, help with school fees and active communities that report abuse.",
      }),
    ],
    hints: ["In (b), compare what the laws say with what happens in homes, farms and mines."],
    explanation: "A practice evaluative item on protection from child labour.",
  });

  b.card("DEFINITION", "Child labour", "Work that harms a child's health, development or education because it is too heavy, long, dangerous or early.");
  b.card("DEFINITION", "Children's responsibilities", "Light, safe, age-appropriate tasks that leave time for school, rest and play.");
  b.card("FACT", "Which section of the Constitution protects children from child labour?", "Section 81 (a child is anyone under 18).");
  b.card("FACT", "What do ILO Conventions 138 and 182 do?", "No. 138 (1973) sets minimum ages for work; No. 182 (1999) targets the worst forms of child labour.");
  b.card("FACT", "When is World Day Against Child Labour?", "12 June.");
  b.card("CONCEPT", "Name four causes of child labour.", "Poverty, school costs, orphanhood, demand for cheap labour (also attitudes, weak enforcement, disasters).");
  b.card("CONCEPT", "How does child labour create a cycle of poverty?", "Children miss school, grow up with few skills, earn little as adults and may rely on their own children's labour.");
  b.card("CONCEPT", "Give four questions to tell child labour from a responsibility.", "Is it suitable for the age? Does the child still attend school? How long does it take? Is it safe?");
});
