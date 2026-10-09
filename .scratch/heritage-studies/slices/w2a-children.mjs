// W2a: Children's rights and responsibilities (her.rights.children).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.rights.children", { file: "rights/children", keyPrefix: "rights.children" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which section of the Constitution of Zimbabwe sets out the rights of children?",
    options: [
      ["section 81", "Correct: section 81 deals with the rights of children."],
      ["section 80", "Section 80 deals with the rights of women."],
      ["section 83", "Section 83 deals with persons with disabilities."],
      ["section 162", "Section 162 lists the courts."],
    ],
    answer: "A",
    explanation: "Section 81, in the Declaration of Rights (Chapter 4), sets out children's rights.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under the Constitution of Zimbabwe, a child is any person under the age of …",
    options: [
      ["18 years", "Correct: every boy and girl under 18 is a child."],
      ["16 years", "16 is not the constitutional age; childhood ends at 18."],
      ["21 years", "21 was once the age of majority in some laws; today it is 18."],
      ["13 years", "A 13-year-old is still a child; childhood ends at 18."],
    ],
    answer: "A",
    explanation: "Section 81 defines a child as every boy and girl under the age of 18.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a **responsibility** of a child at school, not a right?",
    options: [
      ["obeying school rules", "Correct: this is something the child must do."],
      ["receiving an education", "This is a right."],
      ["being safe from bullying and abuse", "This is a right."],
      ["being heard on matters that affect them", "This is a right."],
    ],
    answer: "A",
    explanation: "A responsibility is a duty the child carries out. Education, safety and being heard are rights others must respect.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which international agreement, adopted in 1989, is the main treaty on children's rights?",
    options: [
      ["the UN Convention on the Rights of the Child", "Correct: adopted by the UN General Assembly in 1989."],
      ["the African Charter on the Rights and Welfare of the Child", "This African treaty was adopted in 1990."],
      ["the Convention on the Elimination of All Forms of Discrimination against Women", "CEDAW (1979) deals with women's rights."],
      ["the SADC Protocol on Gender and Development", "This 2008 protocol deals with gender."],
    ],
    answer: "A",
    explanation: "The UN Convention on the Rights of the Child (1989) is the main international treaty; the African Charter (1990) applies across Africa.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tafadzwa, aged 13, is kept at home every school day to herd cattle and has not attended school this year. Which right is **most clearly** denied?",
    options: [
      ["the right to education", "Correct: he is kept from school."],
      ["the right to vote in elections", "Voting begins at 18; it is not a child's right."],
      ["the right to own land in his own name", "This is not the issue in the scenario."],
      ["the right to choose his own religion", "Nothing in the scenario concerns religion."],
    ],
    answer: "A",
    hints: ["What is Tafadzwa missing?"],
    explanation: "Missing school to work every day denies the right to education and may also be child labour, from which section 81 protects children.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A school sets up a suggestion box and a pupils' council. Which right does this **mainly** uphold?",
    options: [
      ["the right to be heard", "Correct: pupils can raise their views."],
      ["the right to health care", "A suggestion box does not provide health care."],
      ["the right to shelter", "Shelter is a right at home; this is not about shelter."],
      ["the right to a name and birth certificate", "This right is upheld by birth registration, not a suggestion box."],
    ],
    answer: "A",
    hints: ["What can pupils do with a suggestion box?"],
    explanation: "Suggestion boxes and councils let pupils express views on matters that affect them: the right to be heard.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does the principle of the **best interests of the child** mean?",
    options: [
      ["In matters concerning a child, what is best for the child comes first", "Correct: section 81 says the child's best interests are paramount."],
      ["Children may do whatever they want without guidance", "Children still need guidance; the principle is about decisions made for them."],
      ["Parents' wishes must always come before the welfare of the child", "The child's welfare comes first."],
      ["The child with the best results receives the most help", "The principle applies to every child, not to the best performers."],
    ],
    answer: "A",
    hints: ["'Paramount' means most important."],
    explanation: "Section 81 says a child's best interests are paramount in every matter concerning the child.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why are children's rights given special protection in the Constitution?",
    options: [
      ["Children depend on adults and cannot always protect themselves", "Correct: children are vulnerable."],
      ["Children pay more taxes than adults", "Children generally do not pay income tax."],
      ["Children are able to vote in all elections", "Voting begins at 18."],
      ["Children elect their own members to make the laws of the country in Parliament", "Parliament is made up of adults."],
    ],
    answer: "A",
    hints: ["Think about why children are a vulnerable group."],
    explanation: "Children rely on adults for their needs and safety, so the law gives them special protection.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The African Charter on the Rights and Welfare of the Child also lists the responsibilities of children.",
    answer: true,
    explanation: "True. Unusually, the African Charter (1990) sets out children's responsibilities as well as their rights.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A child who misbehaves loses the right to education.",
    answer: false,
    explanation: "False. Rights belong to every child. A school may discipline a pupil, but the right to education is not taken away as a punishment.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each right with a matching responsibility.",
    pairs: [
      ["the right to education", "working hard and letting others learn"],
      ["the right to be heard", "listening to others respectfully"],
      ["the right to a safe environment", "not bullying other pupils"],
      ["the right to shelter and care", "helping with household chores suitable for one's age"],
    ],
    explanation: "Many rights carry a matching responsibility that helps others enjoy the same right.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Children's rights are set out in section {{blank:a}} of the Constitution. The African Charter on the Rights and Welfare of the Child was adopted in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["81"], choices: ["81", "4", "56", "78"] },
      { id: "b", accepted: ["1990"], choices: ["1990", "1989", "1980", "2013"] },
    ],
    explanation: "Section 81; the African Charter in 1990. The UN Convention on the Rights of the Child was adopted in 1989.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Education is a {{blank:a}} of every child. Doing homework is a {{blank:b}} of a pupil.",
    blanks: [
      { id: "a", accepted: ["right"], choices: ["right", "responsibility"] },
      { id: "b", accepted: ["responsibility"], choices: ["responsibility", "right"] },
    ],
    hints: ["Is it something you receive or something you do?"],
    explanation: "Education is an entitlement (a right); homework is a duty (a responsibility).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the government department to which a case of a neglected child can be reported, besides the police.",
    accepted: ["Department of Social Welfare", "social welfare", "social welfare department", "Department of Social Development", "social services"],
    wrong: ["Registrar General", "ZIMSEC"],
    explanation: "The **Department of Social Welfare** (social services) protects neglected and abused children. The Registrar General registers births.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **two** rights and **two** responsibilities of a child at home.",
    points: [
      "Right: any one of: shelter, food, clothing, care and love, security/protection from abuse, a name/birth certificate, health care, education, play and rest",
      "Right: a second different right",
      "Responsibility: any one of: respecting parents and elders, helping with age-appropriate chores, looking after younger siblings, caring for family property, keeping oneself safe",
      "Responsibility: a second different responsibility",
    ],
    modelAnswer: "Rights: shelter and protection from abuse. Responsibilities: respecting parents and elders, and helping with household chores.",
    explanation: "One mark per correct right and responsibility; they must be correctly labelled.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why it is important for children to carry out their responsibilities at school.",
    points: [
      "Identifies learning / discipline",
      "Explains that obeying rules and working hard lets the child and others learn, so results improve",
      "Identifies respect and safety / preparing for citizenship",
      "Explains that respecting others and caring for property keeps the school safe and prepares children to be responsible citizens",
    ],
    modelAnswer: "When pupils obey rules and work hard, lessons run smoothly and everyone can learn, so the child and classmates achieve better results. Respecting others and caring for school property keeps the school safe and pleasant, and it prepares children to be responsible citizens.",
    hints: ["Think of learning and of the kind of adult the child becomes."],
    explanation: "One mark for each reason and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Nyasha, aged 11, tells her teacher that an older relative beats her often and that she sometimes goes without food. Suggest **two** things the teacher should do, and explain why.",
    points: [
      "Suggests reporting to the head teacher and the Department of Social Welfare or the police Victim Friendly Unit",
      "Explains that the child's right to protection from abuse and neglect (section 81) must be upheld by the authorities",
      "Suggests listening calmly, keeping her safe and providing immediate support (e.g. food from a school feeding scheme, referral to a clinic)",
      "Explains that the child's best interests come first and she must feel safe to speak",
    ],
    modelAnswer: "The teacher should report the case to the head teacher and to the Department of Social Welfare or the police Victim Friendly Unit, because Nyasha's right to protection from abuse and neglect must be upheld by people with the power to act. The teacher should also listen calmly, make sure she is safe at school and arrange immediate help such as food or a clinic visit, because her best interests come first.",
    hints: ["Who has the power to protect her, and what does she need today?"],
    explanation: "Credit sensible actions (1 each) with explanations linked to her rights or welfare (1 each).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional school newsletter, Bindura, 2026",
      "This term our school council asked for a safer path to school after two pupils were nearly hit by cars. The head teacher took the request to the school development committee, which asked the council for a pedestrian crossing. Meanwhile, Form 2 pupils agreed to walk in groups and to report any bullying on the path. The crossing will be built next month.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which right did the pupils use when the school council made its request?",
        options: [
          ["the right to be heard", "Correct: they raised their concern through the council."],
          ["the right to vote", "Pupils are under 18; the council request was not an election."],
          ["the right to a name", "The request was not about names."],
          ["the right to shelter", "The request was about safety on the path, not shelter."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** responsibilities the Form 2 pupils accepted.",
        points: ["Walking in groups (keeping themselves safe)", "Reporting bullying on the path"],
        modelAnswer: "Walking to school in groups and reporting any bullying on the path.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the source shows rights and responsibilities working together.",
        points: [
          "The pupils used their right to be heard to raise a safety problem",
          "Adults (head, committee, council) upheld the right to safety by acting on it",
          "The pupils carried out responsibilities (walking in groups, reporting bullying) that protect themselves and others",
        ],
        modelAnswer: "The pupils used their right to be heard to raise the problem. The head teacher, committee and council upheld the right to a safe environment by arranging a crossing. Meanwhile the pupils carried out responsibilities, walking in groups and reporting bullying, which protected themselves and others.",
      }),
    ],
    hints: ["In (c), show what the pupils claimed, what adults did and what the pupils did."],
    explanation: "A source-based practice item on the right to be heard and matching responsibilities.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about children's rights in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways in which children's rights are protected in Zimbabwe.",
        points: [
          ["The Constitution (section 81) sets out rights, and courts can enforce them; international treaties (UN Convention, African Charter)", 2],
          ["Institutions: the Department of Social Welfare, the police Victim Friendly Unit, schools, assistance such as BEAM", 2],
        ],
        modelAnswer: "Section 81 of the Constitution sets out children's rights, and the courts can enforce them; Zimbabwe also follows international treaties such as the UN Convention on the Rights of the Child. Institutions such as the Department of Social Welfare and the police Victim Friendly Unit act when children are abused or neglected, and programmes such as BEAM help poor children pay school fees.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Children in Zimbabwe enjoy all their rights.\" How far do you agree?",
        points: [
          ["For: strong legal protection in section 81; most children attend school; birth registration, clinics and school feeding where available", 2],
          ["Against: some children miss school because of fees or poverty; child labour; abuse and neglect; lack of birth certificates in some areas", 2],
          ["Against: awareness and enforcement are uneven, especially in remote areas", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is evidence for the statement. Section 81 of the Constitution gives children a full set of rights, and the courts, the Department of Social Welfare and the police can enforce them. Most children attend school, and programmes such as BEAM help poor families with fees.\n\nHowever, many children do not enjoy all their rights. Some miss school because their families cannot afford fees or need them to work, which may be child labour. Some children suffer abuse or neglect, and some in remote areas lack birth certificates, which makes it hard to enrol in school later. Awareness of rights and enforcement are uneven.\n\nI disagree with the statement. The law protects children well on paper, but poverty, harmful practices and weak enforcement mean that not all children enjoy all their rights in practice.",
      }),
    ],
    hints: ["In (b), separate what the law says from what happens in practice."],
    explanation: "A practice evaluative item on how far children enjoy their rights.",
  });

  b.card("DEFINITION", "Child (in the Constitution)", "Every boy and girl under the age of 18 years.");
  b.card("FACT", "Which section of the Constitution sets out children's rights?", "Section 81.");
  b.card("DEFINITION", "Right", "Something every person is entitled to, protected by law, which others and the state must respect.");
  b.card("DEFINITION", "Responsibility", "Something a person is expected to do for others or the community, such as obeying school rules.");
  b.card("FACT", "When were the UN Convention on the Rights of the Child and the African Charter on the Rights and Welfare of the Child adopted?", "UN Convention: 1989. African Charter: 1990.");
  b.card("CONCEPT", "What does 'best interests of the child' mean?", "In every matter concerning a child, what is best for the child comes first (section 81 says it is paramount).");
  b.card("FACT", "Name four children's rights at school.", "Education, a safe environment, information, being heard (also equal treatment).");
  b.card("FACT", "Name four children's responsibilities at school.", "Attending and being punctual, working hard, obeying school rules, respecting teachers and pupils (also caring for property).");
  b.card("CONCEPT", "Give an example of a right with a matching responsibility.", "The right to education is matched by the responsibility to work hard and let others learn.");
});
