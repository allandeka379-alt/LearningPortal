// W3a: Disability: meaning, types and causes.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.disability.concepts-causes", { file: "disability/concepts-causes", keyPrefix: "disability.concepts-causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which phrase is an example of respectful, person-first language?",
    options: [
      ["A person with a disability", "Correct: it puts the person first."],
      ["A helpless victim of a disability", "This describes the person only by their condition and suggests pity."],
      ["The disabled ones in the village", "This groups people by their condition."],
      ["A child who is cursed with a disability", "This repeats a harmful myth."],
    ],
    answer: "A",
    explanation: "**Person-first language** such as \"a person with a disability\" respects the person; words that insult, pity or blame should be avoided.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a real cause of disability?",
    options: [
      ["Disease such as polio", "Correct: polio can damage the nerves and muscles."],
      ["A curse placed on a family", "Curses are a myth, not a cause."],
      ["Punishment for the sins of parents", "Disability is not a punishment."],
      ["Contact with a person who has a disability", "Disability cannot be caught from others."],
    ],
    answer: "A",
    explanation: "Real causes include **disease**, genetic conditions, accidents, malnutrition, birth complications and conflict.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the difference between an impairment and a disability?",
    options: [
      ["An impairment is a difference in body or mind; disability is the disadvantage barriers cause", "Correct: the two ideas are linked but different."],
      ["An impairment is a kind of illness, and a disability is a kind of punishment sent by God", "Neither is a punishment."],
      ["An impairment is caused by accidents, and a disability is always present from birth in the child", "Both can arise at any time."],
      ["An impairment is a legal word only, and a disability is a medical word only used by doctors", "Both are used in both fields."],
    ],
    answer: "A",
    explanation: "An **impairment** is a difference in the body or mind; **disability** is the disadvantage that arises when barriers prevent equal participation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which view says that much of what disables a person is created by barriers in society?",
    options: [
      ["The social model", "Correct: remove the barriers and the disadvantage shrinks."],
      ["The medical model", "The medical model locates the problem in the individual's body."],
      ["The charity model", "A charity approach stresses pity and gifts."],
      ["The traditional model", "There is no such model in the definitions studied."],
    ],
    answer: "A",
    explanation: "The **social model** locates much of the disadvantage in barriers; the medical model focuses on treatment of the individual.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is albinism?",
    options: [
      ["An inherited condition in which the body makes little melanin", "Correct: it affects skin, hair and eyes."],
      ["A disease that is caught from people who live nearby", "It is not contagious."],
      ["A curse that falls on a family for a wrong done in the past", "It is a genetic condition."],
      ["A form of malnutrition caused by too little food in childhood", "It is not caused by food."],
    ],
    answer: "A",
    explanation: "**Albinism** is a genetic condition. It is not an illness, not contagious, and not caused by a curse.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula uses a wheelchair and cannot enter the school library, which is up a flight of steps. Which response best applies the social model?",
    options: [
      ["Build a ramp so that she can enter like everyone else", "Correct: the barrier is removed."],
      ["Ask her to stay in the classroom and have books brought to her", "This leaves the barrier and excludes her."],
      ["Tell her that she should wait until a medical cure is found", "This puts the whole problem in her body."],
      ["Send her to another school where there are no libraries at all", "This avoids the barrier but removes opportunity."],
    ],
    answer: "A",
    hints: ["The social model tries to remove barriers."],
    explanation: "The social model removes the barrier: a **ramp** lets her take part.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the belief that disability is caused by witchcraft harmful?",
    options: [
      ["It leads to accusations against innocent people and delays medical help", "Correct: both harms are real."],
      ["It encourages families to visit a clinic as soon as a child is born", "The harm is that families may avoid clinics."],
      ["It proves that disability cannot be explained by any ordinary cause", "Ordinary causes explain disability."],
      ["It helps communities to care for children with disabilities without blame", "It tends to produce blame."],
    ],
    answer: "A",
    hints: ["Think of who is blamed and what is delayed."],
    explanation: "Blaming witchcraft **harms innocent people** and may delay **medical care** and support.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which action best reduces the number of children who acquire disabilities from preventable causes?",
    options: [
      ["Immunisation, antenatal care and good nutrition", "Correct: these prevent disease, birth complications and stunted development."],
      ["Keeping children indoors and away from other children", "This is not a prevention strategy."],
      ["Blaming parents who have a child with a disability", "Blame does not prevent disability."],
      ["Waiting until a child shows signs and then hiding the child", "Hiding harms the child."],
    ],
    answer: "A",
    hints: ["Link each cause (disease, birth, malnutrition) with a preventive step."],
    explanation: "**Immunisation**, antenatal care, safe delivery with a trained health worker and good nutrition prevent many causes of disability.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Disability cannot be caught from another person.",
    answer: true,
    explanation: "True. Disability is not contagious; this belief is a myth.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "People with albinism have special powers, and their body parts bring luck.",
    answer: false,
    explanation: "False. This is a dangerous myth. Albinism is a genetic condition, and attacks on people with albinism are crimes.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of disability with an example of a barrier.",
    pairs: [["Physical", "steps and narrow doorways"], ["Visual", "notes with no large print or Braille"], ["Hearing", "lessons with no sign language"], ["Intellectual", "lessons that move too fast and unkind teasing"]],
    explanation: "Steps block physical access; printed notes block those who cannot see; spoken lessons block those who cannot hear; fast lessons and teasing block those with intellectual disabilities.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} model sees the problem in the person's body, while the {{blank:b}} model sees it in barriers in society.",
    blanks: [
      { id: "a", accepted: ["medical"], choices: ["medical", "social", "legal", "religious"] },
      { id: "b", accepted: ["social"], choices: ["medical", "social", "legal", "religious"] },
    ],
    explanation: "The **medical** model focuses on the body; the **social** model focuses on barriers.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the inherited condition in which the body makes little melanin?",
    accepted: ["Albinism", "Albinism."],
    wrong: ["Polio", "Malnutrition"],
    explanation: "**Albinism** is an inherited condition affecting the pigment melanin.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** real causes of disability.",
    points: ["Genetic or inherited conditions", "Disease such as polio or meningitis, or accidents", "Malnutrition, birth complications or conflict (such as landmines)"],
    modelAnswer: "Disability may be caused by genetic conditions, by disease such as polio or by accidents, and by malnutrition, birth complications or conflict such as landmines.",
    explanation: "One mark for each cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between the medical model and the social model of disability.",
    points: [["The medical model sees disability as a problem in the person's body", 1], ["Its response is treatment or cure", 1], ["The social model sees disability as created by barriers in society", 1], ["Its response is to remove barriers and change attitudes", 1]],
    modelAnswer: "The medical model sees disability as a problem in the person's body and responds with treatment or cure. The social model sees disability as created by barriers in society and responds by removing barriers and changing attitudes.",
    hints: ["For each model say where the problem is and what response follows."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** harms caused by myths about the causes of disability.",
    points: [
      ["Families may hide or neglect a child with a disability", 1],
      ["Developed: the child may miss school and medical care, and be isolated from family life", 2],
      ["Innocent people may be blamed or accused", 1],
      ["Developed: mothers and neighbours may be accused of witchcraft or of bringing a curse, causing fear, conflict or violence", 2],
    ],
    modelAnswer: "Families may hide or neglect a child with a disability, so the child misses school and medical care and is isolated from family life. Innocent people may also be blamed, so mothers and neighbours may be accused of witchcraft or of bringing a curse, causing fear, conflict or violence.",
    hints: ["Give one harm to the child and one harm to others."],
    explanation: "Two harms, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school newsletter in Masvingo, 2026",
      "Our Form 2 class welcomed a new pupil this term. Chipo has low vision, and she needs large print. At first some pupils whispered that she must have been cursed. Our teacher invited a health worker from the clinic, who explained that Chipo's condition is inherited and that nobody caused it. We now print notes in large print and sit Chipo near the front. She has quickly become one of our best readers."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what caused Chipo's low vision?",
        options: [
          ["It is inherited", "Correct: the health worker explained this."],
          ["A curse on her family", "Some pupils whispered this, but the health worker corrected it."],
          ["A lack of food in childhood", "The source does not say this."],
          ["An accident at school", "The source does not say this."],
        ],
        answer: "A", explanation: "The health worker explained that Chipo's condition is inherited.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the school did.",
        points: ["Invited a health worker from the clinic to explain the cause", "Printed notes in large print", "Sat Chipo near the front"],
        modelAnswer: "The school invited a health worker from the clinic to explain the cause, printed notes in large print and sat Chipo near the front.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the school's actions in Source A show the social model of disability.",
        points: [["They removed barriers, such as small print, instead of treating Chipo as the problem", 1], ["They corrected a myth with facts from a health worker", 1], ["As a result Chipo could take part fully and succeed as a reader", 1]],
        modelAnswer: "The school removed barriers, such as small print, instead of treating Chipo as the problem. It corrected a myth with facts from a health worker, and as a result Chipo could take part fully and succeed as a reader.",
      }),
    ],
    hints: ["In (c) link barriers, attitudes and results."],
    explanation: "The source shows a myth corrected and barriers removed.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Tendai says: \"Disability is mainly a medical matter, so doctors should decide what is best.\" Nyasha says: \"Disability is mainly caused by how society treats people, so communities must change.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** types of disability.",
        points: [["Physical disability, which affects movement", 1], ["Visual disability, which affects sight", 1], ["Hearing disability, which affects hearing", 1], ["Intellectual disability or mental health conditions, which affect learning or mood", 1]],
        modelAnswer: "Physical disability affects movement, and visual disability affects sight. Others include hearing, intellectual and mental health conditions.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why person-first language is important.",
        points: [["It puts the person before the condition and shows respect", 2], ["It avoids labels that suggest a person is only their disability or is less worthy, and helps reduce stigma", 2]],
        modelAnswer: "Person-first language puts the person before the condition and shows respect. It avoids labels that suggest a person is only their disability or is less worthy, and helps to reduce stigma.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess whether the medical model or the social model is more useful for understanding disability.",
        points: [["Medical model: treatment and care are needed, e.g. surgery, hearing aids, medicine", 2], ["Social model: barriers such as steps and attitudes create much of the disadvantage, and removing them gives equality", 2], ["Link: both are needed, treatment where wanted and barriers removed", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The medical model is useful because many people need treatment and care, such as surgery, hearing aids or medicine. However, the social model shows that steps, lack of sign language and unkind attitudes create much of the disadvantage, and removing them gives equality. Both are needed: treatment where it is wanted and barriers removed. I conclude that the social model is more useful for understanding disadvantage, but it should work together with medical care.",
      }),
    ],
    hints: ["Give the strengths of each model, then show how they work together."],
    explanation: "A strong answer weighs both models and concludes that they work together.",
  });

  b.card("DEFINITION", "What is an **impairment**?", "A loss or difference in how part of the body or mind works.");
  b.card("DEFINITION", "What is a **disability**?", "The disadvantage when an impairment meets barriers in society that prevent equal participation.");
  b.card("DEFINITION", "What is the **medical model**?", "The view that disability is a problem in the individual's body to be treated or cured.");
  b.card("DEFINITION", "What is the **social model**?", "The view that much disability is created by barriers in society, which can be removed.");
  b.card("FACT", "Name the main types of disability.", "Physical, visual, hearing, intellectual, mental health conditions, albinism (often discussed with disability) and multiple.");
  b.card("FACT", "Name five real causes of disability.", "Genetic conditions, disease, accidents, malnutrition and birth complications (also conflict, such as landmines).");
  b.card("DEFINITION", "What is albinism?", "An inherited condition in which the body makes little melanin; it is not an illness or a curse.");
  b.card("CONCEPT", "Why is a belief in curses or witchcraft as a cause of disability harmful?", "It blames innocent people, can lead to hiding or neglect, and delays medical care and support.");
  b.card("CONCEPT", "What is person-first language?", "Language that puts the person before the condition, such as \"a person with a disability\".");
});
