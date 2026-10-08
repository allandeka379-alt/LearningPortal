// Slice EG1: subject-verb agreement.
import { concept } from "../lib.mjs";

concept("eng.grammar.subject-verb-agreement", { file: "grammar/subject-verb-agreement", keyPrefix: "grammar.subject-verb-agreement" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Choose the correct verb.\n\n*My grandmother ___ vegetables in her garden in Rusape.*",
    options: [
      ["grows", "Correct: a singular subject (my grandmother) takes -s in the present simple."],
      ["grow", "Grow without -s goes with plural subjects or with I and you."],
      ["growing", "An -ing form cannot be the main verb on its own; it needs is or was."],
      ["are growing", "Are goes with plural subjects; the subject here is singular."],
    ],
    answer: "A",
    explanation: "A singular third-person subject takes a verb ending in **-s** in the present simple: *she grows, the farmer grows, my grandmother grows*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct verb.\n\n*The box of exercise books ___ on the teacher's desk.*",
    options: [
      ["is", "Correct: the subject is box, which is singular."],
      ["are", "Are agrees with books, but books is inside the phrase of exercise books, not the subject."],
      ["were", "Were is plural and past; the subject is singular."],
      ["have", "Have is plural and would also need a participle to make sense here."],
    ],
    answer: "A",
    explanation: "Cover the phrase *of exercise books*: *The box ... **is** on the desk.* A phrase beginning with *of* never changes the subject.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the correct verb.\n\n*One of the girls in our class ___ for the national netball team.*",
    options: [
      ["plays", "Correct: the subject is one, which is singular."],
      ["play", "Play agrees with girls, but girls is not the subject."],
      ["are playing", "Are is plural; the subject is one."],
      ["have played", "Have is plural; the singular form would be has."],
    ],
    answer: "A",
    explanation: "In *one of the ...*, the subject is **one**: *One of the girls **plays**; one of my uncles **is** a doctor.*",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct verb.\n\n*Neither the driver nor the passengers ___ hurt in the accident.*",
    options: [
      ["were", "Correct: with neither ... nor, the verb agrees with the nearer subject, passengers (plural)."],
      ["was", "Was would agree with driver, but the nearer subject is passengers."],
      ["is", "Is is singular and present; the sentence is about a past accident."],
      ["has", "Has is singular and needs a participle such as been."],
    ],
    answer: "A",
    explanation: "With **either ... or** and **neither ... nor**, the verb agrees with the subject **closer to it**. Here that is *passengers*, so *were*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct verb.\n\n*Mathematics ___ the subject that most pupils find hardest.*",
    options: [
      ["is", "Correct: mathematics ends in -s but is a singular noun (one subject)."],
      ["are", "Mathematics looks plural, but it names one subject, so it takes a singular verb."],
      ["were", "Were is plural; it also changes the time of a general statement to the past."],
      ["have been", "Have is plural; a singular subject needs has."],
    ],
    answer: "A",
    explanation: "Names of subjects and diseases ending in *-s* (*mathematics, physics, economics, measles*) and the word *news* take a **singular** verb.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct verb for each gap.",
    template: "Each of the candidates {{blank:a}} a pencil. Both of my brothers {{blank:b}} at the University of Zimbabwe.",
    blanks: [
      { id: "a", accepted: ["needs"], choices: ["needs", "need", "are needing", "have needed"] },
      { id: "b", accepted: ["study"], choices: ["study", "studies", "is studying", "has studied"] },
    ],
    explanation: "*Each* is singular, so **needs**. *Both* is always plural, so **study**.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct verb for each gap.",
    template: "There {{blank:a}} a borehole near the school, but there {{blank:b}} not enough taps for all the pupils.",
    blanks: [
      { id: "a", accepted: ["is"], choices: ["is", "are", "were", "have"] },
      { id: "b", accepted: ["are"], choices: ["are", "is", "was", "has"] },
    ],
    explanation: "In a sentence beginning with *there*, the real subject comes **after** the verb: *a borehole* (singular, **is**); *taps* (plural, **are**).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "*Everybody* takes a singular verb, so *Everybody likes the new library* is correct.",
    answer: true,
    explanation: "True. *Everybody, everyone, somebody, nobody, nothing* and *each* are grammatically singular, even though they can refer to many people.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*The police is looking for the stolen car* is correct because *police* is one organisation.",
    answer: false,
    explanation: "False. *Police* is always plural in English: *The police **are** looking for the stolen car.* So are *cattle* and *people*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each subject with the verb that agrees with it.",
    pairs: [
      ["The news from the hospital", "was encouraging."],
      ["A number of pupils", "were absent on Monday."],
      ["The number of pupils", "has risen this year."],
      ["Twenty dollars", "is too much for a ticket."],
    ],
    explanation: "*News* is singular; *a number of* means 'several' (plural); *the number of* is one figure (singular); an amount of money seen as one total is singular.",
  });
  b.short({
    d: 2,
    stem: "Write the correct form of the verb **be** (present tense) to complete the sentence.\n\n*The cattle ___ grazing near the river.*",
    accepted: ["are"],
    wrong: ["is"],
    explanation: "*Cattle* has no singular form and always takes a plural verb: *The cattle **are** grazing.*",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct verb.\n\n*The headmistress, together with three prefects, ___ the visitors at the gate.*",
    options: [
      ["welcomes", "Correct: the subject is the headmistress; together with three prefects is extra information."],
      ["welcome", "Together with does not join subjects the way and does, so the subject stays singular."],
      ["are welcoming", "Are is plural; the subject is the headmistress alone."],
      ["have welcomed", "Have is plural; the singular form is has."],
    ],
    answer: "A",
    hints: ["Which words could you remove without breaking the sentence?"],
    explanation: "*Together with, as well as, along with* and *including* add information but do **not** make a plural subject. Only *and* does that.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence is correct?",
    options: [
      ["Bread and butter is all I want for breakfast.", "Correct: bread and butter is one dish, so it takes a singular verb."],
      ["Bread and butter are all I want for breakfast.", "Here bread and butter is one dish, so the singular is needed."],
      ["Bread and butter is all I wants for breakfast.", "The second verb goes with I, so it should be want."],
      ["Bread and butter were all I want for breakfast.", "Were is plural and past, and does not match the present want."],
    ],
    answer: "A",
    hints: ["Do the two nouns joined by and name two things, or one dish?"],
    explanation: "Subjects joined by *and* are normally plural, but when they name **one idea or one thing** (*bread and butter*, *rice and beans* as one dish), the verb is singular.",
  });
  b.short({
    d: 3,
    stem: "The sentence contains one agreement error. Write the verb that should replace the incorrect one.\n\n*The quality of the roads in our district have improved since the new council was elected.*",
    accepted: ["has", "has improved"],
    model: "has",
    wrong: ["have"],
    hints: ["What is the subject: quality or roads?"],
    explanation: "The subject is *quality* (singular); *of the roads in our district* is a phrase that describes it. So: *The quality ... **has** improved.*",
  });
  b.fib({
    d: 3,
    stem: "Choose the pronoun that keeps the sentence consistent.",
    template: "The school board has announced {{blank:a}} decision about the new uniforms.",
    blanks: [{ id: "a", accepted: ["its"], choices: ["its", "their", "it's", "his"] }],
    hints: ["Is the verb singular or plural? The pronoun must match it."],
    explanation: "The singular verb *has announced* treats the board as one unit, so the pronoun must also be singular: **its**. (*It's* means *it is*.) With a plural verb you would write *The board have announced their decision*.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why both of these sentences are correct.\n\n1. *Either the teachers or the head is going to speak.*\n2. *Either the head or the teachers are going to speak.*",
    points: [
      "With either ... or, the verb agrees with the subject nearer to it.",
      "In sentence 1 the nearer subject (the head) is singular, so is; in sentence 2 it is plural (the teachers), so are.",
    ],
    modelAnswer: "With either ... or the verb agrees with the nearer subject. In the first sentence that is 'the head', which is singular, so 'is' is used; in the second it is 'the teachers', which is plural, so 'are' is used.",
    hints: ["Look at which noun stands right next to the verb in each sentence."],
    explanation: "This is the **proximity rule** for *either/or* and *neither/nor*. Putting the plural subject last usually sounds more natural.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "These sentences come from a report on a school agriculture project. Choose the correct verb for each gap.",
    template: "The results of the project {{blank:a}} been very good. Every one of the twelve plots {{blank:b}} produced a harvest, and the money from the sales {{blank:c}} being used to buy seed for next season.",
    blanks: [
      { id: "a", accepted: ["have"], choices: ["have", "has", "is", "was"] },
      { id: "b", accepted: ["has"], choices: ["has", "have", "are", "were"] },
      { id: "c", accepted: ["is"], choices: ["is", "are", "have", "were"] },
    ],
    hints: ["Find the main noun in each subject: results, one, money."],
    explanation: "*Results* is plural (**have**); *every one* is singular, whatever follows *of* (**has**); *money* is uncountable and singular (**is**).",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "This sentence from a letter to a newspaper contains one agreement error. Rewrite the whole sentence correctly.\n\n*The shortage of textbooks, as well as the lack of desks, make learning difficult for pupils at our school.*",
    accepted: [
      "The shortage of textbooks, as well as the lack of desks, makes learning difficult for pupils at our school.",
    ],
    wrong: ["The shortage of textbooks, as well as the lack of desks, make learning difficult for pupils at our school."],
    hints: ["Two phrases come between the subject and the verb.", "Does as well as join subjects the way and does?"],
    explanation: "The subject is *shortage* (singular). *Of textbooks* describes it and *as well as the lack of desks* is extra information, so the verb is singular: **makes**.",
  });
  b.manualShort({
    d: 4, examStyle: true, skill: "ANALYSIS", marks: 3,
    stem: "The following sentences from a pupil's composition contain three agreement errors. Rewrite the passage correctly.\n\n*There was many people at the bus stop. Each of them were carrying a heavy bag, and nobody know when the next bus would come.*",
    points: [
      "There were many people (plural subject people after there).",
      "Each of them was carrying (each is singular).",
      "nobody knew (or knows) (nobody is singular; past tense knew fits the passage).",
    ],
    modelAnswer: "There were many people at the bus stop. Each of them was carrying a heavy bag, and nobody knew when the next bus would come.",
    hints: ["Check the subject after there.", "Each and nobody are both singular."],
    explanation: "*People* is plural, so **were**; *each* is singular, so **was**; *nobody* is singular, and the passage is in the past, so **knew** (*knows* agrees but breaks the tense sequence, so *knew* is the best answer).",
  });

  b.card("DEFINITION", "What is **subject-verb agreement**?", "The rule that a singular subject takes a singular verb and a plural subject takes a plural verb.", "the boy runs / the boys run");
  b.card("FACT", "Phrases that do not change the subject", "of ..., as well as, together with, along with, including, in addition to.", "The price of books has risen.");
  b.card("FACT", "either ... or / neither ... nor", "The verb agrees with the subject nearer to it.", "Neither the coach nor the players were ready.");
  b.card("FACT", "Singular indefinite pronouns", "each, every, everyone, everybody, everything, someone, somebody, anyone, nobody, no one, nothing.", "Each of the boys has a pen.");
  b.card("FACT", "Always plural", "both, few, many, several; police, cattle, people, clothes, trousers, scissors.", undefined);
  b.card("FACT", "Look plural but singular", "news, mathematics, physics, economics, measles; amounts such as 'ten dollars' or 'five kilometres' seen as one total.", undefined);
  b.card("CONCEPT", "a number of vs the number of", "A number of (several) takes a plural verb; the number of (the figure) takes a singular verb.", "A number of boys were late. The number of boys has fallen.");
  b.card("CONCEPT", "Collective nouns in British English", "Singular verb when the group acts as one unit, plural when you think of the members; keep pronouns consistent with the verb.", "The team has won its match / The team are arguing among themselves.");
  b.card("FACT", "one of the ...", "The subject is one, so the verb is singular.", "One of my friends lives in Kwekwe.");
  b.card("CONCEPT", "Sentences beginning with there", "The subject comes after the verb, so look ahead: there is + singular, there are + plural.", "There are many reasons.");
});
