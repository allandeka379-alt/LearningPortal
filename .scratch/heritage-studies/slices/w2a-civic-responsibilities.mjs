// W2a: Roles and civic responsibilities of citizens (her.rights.civic-responsibilities).
// Reviewer note: the duties of citizens (loyalty, observing the Constitution, respecting the flag and anthem, defending
// Zimbabwe and its sovereignty) are in section 35(3) of the Constitution; the content cites "Chapter 3" only.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.rights.civic-responsibilities", { file: "rights/civic-responsibilities", keyPrefix: "rights.civic-responsibilities" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **civic responsibility**?",
    options: [
      ["A duty that a citizen owes to the community and the nation", "Correct: for example, obeying the law or paying taxes."],
      ["A right that the state must provide to every citizen at no cost", "That describes a right, not a responsibility."],
      ["A post held only by elected councillors and members of Parliament", "Every citizen has civic responsibilities, not only office holders."],
      ["A rule made by a school for its own pupils", "School rules are not what 'civic' refers to."],
    ],
    answer: "A",
    explanation: "Civic responsibilities are duties every citizen owes to the community and nation, such as obeying the law, paying taxes and voting.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **main** reason why citizens should pay taxes?",
    options: [
      ["Taxes fund public services such as schools, hospitals and roads", "Correct: taxes pay for services everyone uses."],
      ["Taxes are used mainly to pay for private parties and celebrations", "This is not the purpose of taxes."],
      ["Taxes allow citizens to avoid obeying the law", "Paying taxes does not excuse anyone from the law."],
      ["Taxes are paid only by foreign companies", "Citizens and businesses, local and foreign, pay taxes."],
    ],
    answer: "A",
    explanation: "Taxes fund schools, clinics, roads, security and other public services.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a country's **sovereignty** mean?",
    options: [
      ["Its independence and right to govern itself", "Correct: sovereignty is self-rule without control by another country."],
      ["Its total wealth in minerals and land", "This is about resources, not sovereignty."],
      ["Its membership of regional organisations", "Membership of organisations does not define sovereignty."],
      ["The number of seats in its National Assembly", "Seats in Parliament are not sovereignty."],
    ],
    answer: "A",
    explanation: "Sovereignty means a country is independent and governs itself; citizens have a duty to defend it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "From what age may a Zimbabwean citizen vote?",
    options: [
      ["18", "Correct: the voting age is 18."],
      ["16", "16 is too young to vote."],
      ["21", "21 is not the voting age."],
      ["25", "25 is not the voting age."],
    ],
    answer: "A",
    explanation: "Citizens aged 18 and over may register and vote.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Residents of a Gweru suburb form a neighbourhood watch and report suspicious activity to the police. Which area of civic responsibility does this show?",
    options: [
      ["security", "Correct: they help keep the community safe."],
      ["shelter", "They are not building or repairing homes."],
      ["education", "Nothing in the scenario concerns schools."],
      ["heritage", "They are not protecting monuments or culture."],
    ],
    answer: "A",
    hints: ["What are the residents protecting?"],
    explanation: "A neighbourhood watch and reporting crime support community security.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda is angry that the council has not repaired a road. Which response shows **responsible** citizenship?",
    options: [
      ["Raising the matter at a ward meeting or with the councillor", "Correct: a peaceful complaint through proper channels."],
      ["Damaging council vehicles in protest at the delay", "Vandalism harms public property and is unlawful."],
      ["Refusing ever to pay rates again", "Refusing to pay rates removes money needed for repairs."],
      ["Telling all the neighbours to ignore every council by-law until the road is fixed", "Encouraging law-breaking is not responsible citizenship."],
    ],
    answer: "A",
    hints: ["Responsible citizens raise concerns peacefully."],
    explanation: "Active, responsible citizens use proper channels such as ward meetings and councillors to raise concerns.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does active citizenship strengthen democracy?",
    options: [
      ["Citizens who vote and attend meetings can hold leaders accountable", "Correct: participation keeps leaders answerable."],
      ["It removes the need to hold elections", "Democracy depends on elections."],
      ["It makes sure that all citizens support the same political party in elections", "Democracy involves different views; active citizenship is non-partisan."],
      ["It lets leaders ignore the courts", "Democracy requires respect for the courts and the rule of law."],
    ],
    answer: "A",
    hints: ["What happens when citizens watch how leaders use their power?"],
    explanation: "When citizens vote, attend meetings and ask questions, leaders must explain their decisions and can be replaced at elections.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Residents stop paying into a borehole fund because the committee never reports on spending. Which conclusion is **best supported**?",
    options: [
      ["Responsibilities are met more readily when leaders are accountable", "Correct: trust depends on accountability."],
      ["Residents never have any civic responsibilities", "Wrong: residents do have responsibilities."],
      ["Boreholes should never be maintained by communities", "Community maintenance can work well with accountability."],
      ["Committees for community projects should never be elected by the residents themselves", "Election by residents helps accountability."],
    ],
    answer: "A",
    hints: ["Why did the residents stop paying?"],
    explanation: "The case shows that citizens' willingness to carry out responsibilities depends partly on leaders being open and accountable.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Respecting the national flag and the national anthem is one of the duties of a Zimbabwean citizen.",
    answer: true,
    explanation: "True. The citizenship chapter of the Constitution lists respect for the flag and anthem among citizens' duties.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Civic responsibility means supporting one particular political party.",
    answer: false,
    explanation: "False. Civic responsibility is non-partisan: taking part, obeying the law and respecting others, whatever one's political views.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each civic responsibility with its main benefit.",
    pairs: [
      ["paying taxes", "funds public services"],
      ["voting", "lets citizens choose and change leaders"],
      ["protecting monuments", "preserves national identity"],
      ["obeying the law", "keeps order and protects rights"],
    ],
    explanation: "Each responsibility brings a different benefit to the community and nation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Zimbabwean citizenship may be acquired by birth, descent or {{blank:a}}. Citizens' duties are listed in the citizenship chapter, Chapter {{blank:b}} of the Constitution.",
    blanks: [
      { id: "a", accepted: ["registration"], choices: ["registration", "payment", "election", "marriage alone"] },
      { id: "b", accepted: ["3"], choices: ["3", "4", "8", "14"] },
    ],
    explanation: "Citizenship by birth, descent or registration (Chapter 3). Chapter 4 is the Declaration of Rights; Chapter 8 the Judiciary; Chapter 14 provincial and local government.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Read the scenario and complete the sentence.",
    template: "Villagers in Mutoko help build a new classroom block at their school. This is a civic responsibility in the area of {{blank:a}} at {{blank:b}} level.",
    blanks: [
      { id: "a", accepted: ["education"], choices: ["education", "security", "health", "shelter"] },
      { id: "b", accepted: ["community"], choices: ["community", "national", "international", "regional"] },
    ],
    hints: ["Who is helping, and what is being built?"],
    explanation: "Building a local classroom block supports education at community level.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a citizen's willing participation in community and national life, such as voting, volunteering and attending meetings.",
    accepted: ["active citizenship", "active citizen", "civic participation", "civic engagement"],
    wrong: ["sovereignty", "citizenship by registration"],
    explanation: "**Active citizenship** means taking part willingly in the life of the community and the nation.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** responsibilities of a Zimbabwean citizen.",
    points: [
      "Any one of: being loyal / defending sovereignty, upholding the Constitution and national values, respecting the flag and anthem, obeying the law, paying taxes, voting, protecting heritage, protecting the environment, respecting others' rights, taking part in community projects",
      "A second responsibility",
      "A third responsibility",
      "A fourth responsibility",
    ],
    modelAnswer: "Obeying the law, paying taxes, voting and protecting the environment.",
    explanation: "One mark per correct responsibility.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** civic responsibilities of citizens in the area of health at community level.",
    points: [
      "Identifies keeping homes and water sources clean / proper waste disposal",
      "Explains that this prevents diseases such as diarrhoea and cholera spreading",
      "Identifies supporting immunisation campaigns / caring for the sick / following health rules",
      "Explains that this protects children and the community from disease / ensures the sick are not neglected",
    ],
    modelAnswer: "Citizens should keep their homes and water sources clean and dispose of waste properly, which prevents diseases such as diarrhoea and cholera from spreading. They should also support immunisation campaigns by taking children to the clinic, which protects the whole community from preventable diseases.",
    hints: ["Think about disease prevention."],
    explanation: "One mark for each responsibility and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a school could encourage young people to become active citizens, and explain each.",
    points: [
      "Suggests a practical activity, e.g. a pupils' council with elections",
      "Explains that pupils learn how voting and representation work",
      "Suggests a second activity, e.g. community service days / clean-ups / a civic education club",
      "Explains that pupils learn to serve the community and take responsibility",
    ],
    modelAnswer: "The school could run a pupils' council elected by secret ballot, so pupils learn how voting and representation work. It could also hold community service days, such as cleaning a clinic yard or planting trees, so pupils learn to take responsibility for their community.",
    hints: ["Think of activities that copy what adult citizens do."],
    explanation: "Credit sensible activities (1 each) with explanations (1 each).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the results of an invented survey of 200 adult residents in a fictional ward in Bindura (invented for this question).\n\n" +
      table(["Activity in the last year", "Number who did it", "Percentage"], [
        ["Paid rates or rent to the council", 150, "75%"],
        ["Attended a ward or village meeting", 60, "30%"],
        ["Took part in a clean-up or community project", 90, "45%"],
        ["Reported a crime or hazard to the authorities", 40, "20%"],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.fib({
        label: "(a)",
        stem: "Complete the sentence from the table.",
        template: "The activity carried out by most residents was {{blank:a}}; the activity carried out by fewest residents was {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["paying rates or rent"], choices: ["paying rates or rent", "attending a meeting", "a clean-up", "reporting a crime or hazard"] },
          { id: "b", accepted: ["reporting a crime or hazard"], choices: ["reporting a crime or hazard", "paying rates or rent", "attending a meeting", "a clean-up"] },
        ],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** possible reasons why only 30% attended a meeting.",
        points: ["Lack of time / work commitments / apathy", "Distrust that leaders will listen / lack of awareness of meetings"],
        modelAnswer: "Many residents may be too busy with work, and some may not trust that leaders will listen.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Suggest **two** ways the ward could increase participation in meetings, and explain each.",
        points: [
          "Suggests better publicity, e.g. notices, church announcements, messages on phones",
          "Explains that more residents would know when and why meetings are held",
          "Suggests reporting back on decisions and spending / holding meetings at convenient times",
          "Explains that residents would see their views make a difference, building trust",
        ],
        modelAnswer: "The ward could advertise meetings through notices, church announcements and phone messages, so that more residents know when and why they are held. Leaders could also report back on decisions and spending and hold meetings at convenient times, so residents see that their views make a difference and trust grows.",
      }),
    ],
    hints: ["Compare the percentages before you explain."],
    explanation: "A data-based practice item (8 marks) on civic participation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about civic responsibility.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which citizens can protect the environment as a civic responsibility.",
        points: [
          ["Not littering / proper waste disposal / joining clean-ups", 2],
          ["Not starting veld fires / planting trees / conserving water and wildlife", 2],
        ],
        modelAnswer: "Citizens should dispose of waste properly and join clean-up campaigns, which keeps towns and rivers clean. They should avoid starting veld fires and should plant trees, which protects soils, grazing and wildlife.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Active citizenship is the key to development in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: taxes, rates and community labour build schools, clinics, roads; volunteers fill gaps", 2],
          ["For: participation and voting promote accountability and better use of public money", 2],
          ["Against: development also needs investment, good policies, skills, infrastructure and stable institutions; citizens cannot do it alone", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Active citizenship does support development. Taxes and rates fund public services, and communities build classrooms, repair boreholes and run clean-ups. Volunteers fill gaps that government cannot. Citizens who vote and attend meetings also hold leaders accountable, which encourages better use of public money.\n\nHowever, development needs much more than active citizens. It requires investment, sound economic policies, skills, infrastructure and honest, stable institutions. Poverty can limit how much citizens can contribute, and without accountable leaders, citizens may lose trust and stop participating.\n\nI agree only partly. Active citizenship is an important part of development, especially at community level, but it is not the only key: it works best alongside accountable institutions and sound national policies.",
      }),
    ],
    hints: ["In (b), what else does development need besides active citizens?"],
    explanation: "A practice evaluative item on active citizenship and development.",
  });

  b.card("DEFINITION", "Civic responsibility", "A duty a citizen owes to the community and nation, such as obeying the law, paying taxes and voting.");
  b.card("DEFINITION", "Active citizenship", "Taking part willingly in community and national life: voting, volunteering, attending meetings, raising concerns peacefully.");
  b.card("DEFINITION", "Sovereignty", "A country's independence and its right to govern itself without control by another country.");
  b.card("FACT", "Name four duties of citizens in the Constitution's citizenship chapter.", "Loyalty to Zimbabwe; observing the Constitution and respecting its institutions; respecting the flag and anthem; defending Zimbabwe and its sovereignty.");
  b.card("FACT", "How is Zimbabwean citizenship acquired?", "By birth, descent or registration.");
  b.card("CONCEPT", "Why should citizens pay taxes?", "Taxes fund schools, hospitals, roads, security and other public services.");
  b.card("CONCEPT", "Give three reasons why some citizens do not meet their responsibilities.", "Lack of awareness, poverty, distrust of institutions, apathy, migration.");
  b.card("CONCEPT", "Why does active citizenship matter?", "It supports development, democracy and accountability, peace and unity, protection of rights, heritage and the environment.");
});
