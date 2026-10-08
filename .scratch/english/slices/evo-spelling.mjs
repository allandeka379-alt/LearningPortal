// Slice EVO: spelling rules and commonly misspelt words. Tested by recognition (MCQ, select blanks), never free typing.
import { concept } from "../lib.mjs";

concept("eng.vocabulary.spelling", { file: "vocabulary/spelling", keyPrefix: "vocabulary.spelling" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word is spelt correctly?",
    options: [
      ["believe", "Correct: ie, because the sound is ee and there is no c before it."],
      ["beleive", "i comes before e when the sound is ee (except after c)."],
      ["belive", "The e of the ie pair is missing."],
      ["beleve", "The i of the ie pair is missing."],
    ],
    answer: "A",
    explanation: "**i before e, except after c** (when the sound is *ee*): believe, achieve, field, piece.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word is spelt correctly?",
    options: [
      ["receive", "Correct: after c, write ei."],
      ["recieve", "Straight after c, the rule is ei, not ie."],
      ["receve", "The i is missing."],
      ["riceive", "The first vowel is e: re-ceive."],
    ],
    answer: "A",
    explanation: "After **c**, the *ee* sound is spelt **ei**: receive, ceiling, deceive, receipt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which word is spelt correctly?",
    options: [
      ["beginning", "Correct: be-GIN has the stress on the last syllable, so the n is doubled."],
      ["begining", "The final consonant must be doubled because the stress is on -gin."],
      ["beggining", "It is the n at the end of begin that doubles, not the g."],
      ["begginning", "Only the final n doubles."],
    ],
    answer: "A",
    explanation: "Double the final consonant before a vowel suffix when the word ends in one vowel + one consonant and the stress falls on the last syllable: begin → **beginning**, occur → occurred.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which word is spelt correctly?",
    options: [
      ["visited", "Correct: VIS-it has the stress on the first syllable, so the t is not doubled."],
      ["visitted", "Do not double the t: the stress is on the first syllable of visit."],
      ["vissited", "The s of visit is single."],
      ["visted", "The i of the second syllable is missing."],
    ],
    explanation: "No doubling when the stress is **not** on the last syllable: visit → **visited**, offer → offered, budget → budgeted.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which is the correct spelling of **hope** + *-ing*?",
    options: [
      ["hoping", "Correct: drop the silent e before a vowel suffix (-ing)."],
      ["hopeing", "The silent e is dropped before -ing."],
      ["hopping", "Hopping comes from hop (jump on one foot), a different word."],
      ["hopeng", "The suffix is -ing."],
    ],
    answer: "A",
    explanation: "Drop the silent *e* before a vowel suffix: hope → **hoping**. Be careful: *hopping* (with double p) comes from *hop*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which word is spelt correctly?",
    options: [
      ["beautiful", "Correct: y changes to i and the suffix -ful has one l."],
      ["beautifull", "The suffix -ful has only one l."],
      ["beautyful", "After a consonant, y changes to i before -ful."],
      ["beutiful", "The root is beau-: b-e-a-u."],
    ],
    answer: "A",
    explanation: "beauty + -ful: *y* → *i*, and **-ful** has one *l*: **beautiful**. With *-ly* added: beautifully.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which word is spelt correctly?",
    options: [
      ["necessary", "Correct: one c, double s."],
      ["neccessary", "There is only one c."],
      ["necesary", "There are two s letters."],
      ["neccesary", "One c and two s letters: the reverse of this."],
    ],
    answer: "A",
    explanation: "A memory aid: a shirt has **one c**ollar and **two s**leeves: ne**c**e**ss**ary.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which word is spelt correctly?",
    options: [
      ["accommodation", "Correct: double c and double m."],
      ["accomodation", "There are two m letters."],
      ["acommodation", "There are two c letters."],
      ["acomodation", "There are two c letters and two m letters."],
    ],
    answer: "A",
    hints: ["The word is big enough to hold two of two different letters."],
    explanation: "**accommodation**: double *c*, double *m*. Similar: *committee* (double m, t, e), *embarrass* (double r, s).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which word is spelt correctly in British English?",
    options: [
      ["travelled", "Correct: British English doubles a final l after one vowel, whatever the stress."],
      ["traveled", "This is the American spelling; British English doubles the l."],
      ["travveled", "The v is never doubled."],
      ["travelld", "The e of the -ed suffix is missing."],
    ],
    answer: "A",
    hints: ["British English has a special rule for words ending in one vowel + l."],
    explanation: "In British English a final **l** after a single vowel doubles before a vowel suffix: travel → **travelled**, cancel → cancelled, label → labelled.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", multiple: true, marks: 2,
    stem: "Select the **two** words that are spelt **incorrectly**.",
    options: [
      ["seperate", "Correct choice: misspelt. The correct form is separate (a rat in the middle)."],
      ["definately", "Correct choice: misspelt. The correct form is definitely (finite in the middle)."],
      ["government", "This is spelt correctly: note the n before -ment."],
      ["February", "This is spelt correctly: note bru in the middle."],
      ["accommodation", "This is spelt correctly: double c and double m."],
    ],
    answer: ["A", "B"],
    hints: ["Look for the hidden word inside each long word."],
    explanation: "Correct forms: **separate** (sep-a-rate), **definitely** (de-finite-ly). *Government* and *February* are correct.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correctly spelt word for each gap.",
    template: "The two {{blank:a}} worked together to carry the {{blank:b}} of firewood.",
    blanks: [
      { id: "a", accepted: ["families"], choices: ["families", "familys", "familes", "familyies"] },
      { id: "b", accepted: ["boxes"], choices: ["boxes", "boxs", "boxies", "boxen"] },
    ],
    explanation: "consonant + *y* → **-ies** (family → families); words ending in *-x, -s, -sh, -ch* add **-es** (box → boxes).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correctly spelt word for each gap.",
    template: "She was {{blank:a}} the bags to the bus rank while her brother was {{blank:b}} for his test.",
    blanks: [
      { id: "a", accepted: ["carrying"], choices: ["carrying", "carriing", "carying", "carriying"] },
      { id: "b", accepted: ["studying"], choices: ["studying", "studiing", "studing", "studeing"] },
    ],
    explanation: "Keep the *y* before **-ing**: carry → **carrying**, study → **studying** (but carried, studied).",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Choose the correctly spelt word in each gap of this extract from a letter.",
    template: "The school {{blank:a}} would like to thank parents for the {{blank:b}} donation of desks. The new desks will {{blank:c}} improve the learning {{blank:d}} for our pupils.",
    blanks: [
      { id: "a", accepted: ["committee"], choices: ["committee", "comittee", "committe", "commitee"] },
      { id: "b", accepted: ["generous"], choices: ["generous", "generouse", "genorous", "generus"] },
      { id: "c", accepted: ["definitely"], choices: ["definitely", "definately", "definetly", "defenitely"] },
      { id: "d", accepted: ["environment"], choices: ["environment", "enviroment", "environmant", "envirnment"] },
    ],
    hints: ["Committee has three pairs of double letters.", "Look for finite in definitely and the n before -ment in environment."],
    explanation: "**committee** (mm, tt, ee), **generous**, **definitely** (de-finite-ly), **environment** (environ + ment).",
  });
  b.fib({
    d: 3,
    stem: "Choose the correctly spelt word for each gap.",
    template: "The accident {{blank:a}} on Tuesday. Luckily, the change to the timetable was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["occurred"], choices: ["occurred", "occured", "ocurred", "ocured"] },
      { id: "b", accepted: ["noticeable"], choices: ["noticeable", "noticable", "noticeble", "notiseable"] },
    ],
    hints: ["Where is the stress in occur?", "Words ending in -ce keep the e before -able."],
    explanation: "oc-CUR has the stress on the last syllable, so double the r: **occurred** (and double c). *Notice* keeps its *e* before *-able* to keep the soft *c* sound: **noticeable**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The suffix *-ful* (as in *careful* and *hopeful*) is spelt with one *l*.",
    answer: true,
    explanation: "True. Only the word *full* on its own has two *l*'s. Careful, hopeful, grateful; with *-ly*: carefully.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The silent *e* is kept when you add a suffix beginning with a consonant, so *hope + ful* = *hopeful*.",
    answer: true,
    explanation: "True. Keep the silent *e* before a consonant suffix (*hopeful, careful, movement, safety*); drop it before a vowel suffix (*hoping, caring*).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each correctly spelt word with the rule it shows.",
    pairs: [["running", "double the final consonant (one syllable)"], ["writing", "drop the silent e before a vowel suffix"], ["happily", "change y to i"], ["ceiling", "ei after c"], ["movement", "keep the silent e before a consonant suffix"]],
    explanation: "run → running (doubling); write → writing (drop e); happy → happily (y → i); ceiling (ei after c); move → movement (keep e).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the final consonant is doubled in *referred* but not in *offered*, and state the rule that decides this.",
    points: [
      "Both words end in one vowel + one consonant (refer, offer).",
      "In re-FER the stress is on the last syllable, so the r is doubled.",
      "In OF-fer the stress is on the first syllable, so the r is not doubled.",
    ],
    modelAnswer: "Both end in a single vowel and consonant. The rule is to double before a vowel suffix only when the stress is on the last syllable: refer is stressed on -fer, so referred; offer is stressed on of-, so offered.",
    hints: ["Say each word aloud and notice which syllable is stressed."],
    explanation: "The doubling rule depends on stress: re-FER → referred; OF-fer → offered.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2, examStyle: true,
    stem: "A learner wrote *arguement* and *truely*. Explain why these spellings seem logical but are wrong, and state the correct forms.",
    points: [
      "Explains that the general rule keeps silent e before a consonant suffix (-ment, -ly), which is why the learner kept it.",
      "States that argue and true are exceptions that drop the e: argument, truly.",
    ],
    modelAnswer: "Normally the silent e stays before a consonant suffix (as in movement, lately), so keeping it seems right. But argue and true are exceptions that drop the e: argument and truly.",
    hints: ["Compare with movement and lately."],
    explanation: "Learn the exceptions to the silent-e rule: *argument, truly, ninth, wholly*.",
  });

  b.card("FACT", "i before e", "i before e, except after c, when the sound is ee: believe, field; receive, ceiling.", "Exceptions: seize, weird, protein, either, neither.");
  b.card("FACT", "Doubling the final consonant", "Before a vowel suffix, double if the word ends vowel + consonant and the stress is on the last (or only) syllable: run → running, begin → beginning.", "No doubling: visit → visited, offer → offered.");
  b.card("FACT", "British English final l", "A final l after one vowel doubles before a vowel suffix: travelled, cancelled, labelled.", undefined);
  b.card("FACT", "Silent e", "Drop it before a vowel suffix (hoping, usable); keep it before a consonant suffix (hopeful, movement).", "Exceptions: argument, truly, ninth; noticeable and courageous keep e.");
  b.card("FACT", "y to i", "Consonant + y → i before suffixes (happily, carried), but keep y before -ing (carrying).", "Vowel + y keeps y: played, enjoyment.");
  b.card("FACT", "-ful", "The suffix -ful has one l (careful); with -ly it becomes -fully (carefully).", undefined);
  b.card("VOCABULARY", "necessary / accommodation", "necessary: one c, two s. accommodation: two c, two m.", undefined);
  b.card("VOCABULARY", "separate / definitely", "sep-a-rate (a rat in the middle); de-finite-ly (finite in the middle).", undefined);
  b.card("VOCABULARY", "More words to watch", "committee, embarrass, government, environment, February, occasion, privilege, rhythm, tomorrow, until.", undefined);
});
