// Slice ERD: reading skills — facts, opinions, arguments and bias.
import { concept, P } from "../lib.mjs";

const ext = (text) => `Read the text and answer the question.\n\n> ${text}`;

const ADVERT = `Read the advertisement and answer the question.

> **SOLARGLOW LAMPS — Light up your future!**
>
> Why should your children struggle to read by candlelight? The SolarGlow lamp charges in the sun all day and gives up to eight hours of bright light at night. It has a built-in USB port to charge your phone. Thousands of happy families already trust SolarGlow. Don't let your children fall behind — they deserve the best start in life. Order today from any SolarGlow agent.`;

const UNIFORM = `Read the letter to a newspaper and answer the questions.

**Scrap school uniforms? Not so fast**

**[1]** Several readers have written to this paper calling for school uniforms to be abolished. I disagree, and I would like to explain why.

**[2]** First, uniforms hide differences in wealth. In a classroom where everyone wears the same grey and maroon, a child from a poor home is not marked out by worn or old-fashioned clothes. When I taught at a secondary school in Mutoko, a girl once told me that the uniform was the only time she felt "the same as everyone else".

**[3]** Secondly, uniforms save families money in the long run. A uniform can be worn for a year or more and passed down to younger brothers and sisters, whereas fashionable clothes go out of date quickly and pupils compete to have the newest.

**[4]** Some readers argue that uniforms are expensive to buy all at once. This is a fair point, and schools should allow families to pay in instalments or buy from second-hand sales. But a problem with cost is a reason to make uniforms cheaper, not to get rid of them.

**[5]** Finally, uniforms build a sense of belonging. Pupils who wear the school colours at a sports day or a debate competition feel that they represent something bigger than themselves.

**[6]** Uniforms are not perfect, but abolishing them would hurt most the very children it claims to help.

*T. Ncube (Mr), Mutoko*`;

concept("eng.reading.fact-opinion-argument", { file: "reading/fact-opinion-argument", keyPrefix: "reading.fact-opinion-argument" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which statement is a **fact**?",
    options: [
      ["The new clinic in Murehwa has twelve beds.", "Correct: the number of beds can be counted and checked."],
      ["The new clinic is the best thing in Murehwa.", "Best is a judgement: an opinion."],
      ["The clinic should open on Sundays as well.", "Should signals a recommendation: an opinion."],
      ["The clinic's nurses are wonderfully kind.", "Wonderfully kind is a judgement: an opinion."],
    ],
    answer: "A",
    explanation: "A **fact** can be checked (counted, measured, looked up). Words such as *best*, *should* and *wonderfully* signal opinions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement is an **opinion**?",
    options: [
      ["Netball is far more exciting to watch than football.", "Correct: exciting is a judgement others may dispute."],
      ["A netball team has seven players on court.", "This can be checked in the rules: a fact."],
      ["The school netball court was resurfaced in May.", "This can be checked in records: a fact."],
      ["Our school netball team played four matches last term.", "This can be counted: a fact."],
    ],
    answer: "A",
    explanation: "Opinions express judgement or preference (*more exciting*). Facts can be checked.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: *Everyone knows the plan will fail* is a fact because it is stated with certainty.",
    answer: false,
    explanation: "False. Confident wording (*everyone knows*, *clearly*, *surely*) does not make a statement a fact. Whether the plan will fail cannot be checked now: it is an opinion.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each persuasive technique with an example.",
    pairs: [
      ["rhetorical question", "Do we want our children walking in the dark?"],
      ["emotive language", "This heartless decision devastated innocent families."],
      ["expert opinion", "Doctors at the clinic recommend boiling all water."],
      ["rule of three", "Safe, simple and smart."],
      ["direct address", "You deserve better than this."],
    ],
    explanation: "Each technique works differently: a question whose answer seems obvious; feeling-charged words; borrowed authority; a memorable group of three; speaking straight to *you*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: ext("*A noisy mob of troublemakers besieged the council offices, complaining yet again.*") + "\n\nWhich words show that this report is **biased**?",
    options: [
      ["mob, troublemakers and besieged", "Correct: these loaded words present the protesters negatively."],
      ["the council offices", "This is a neutral description of a place."],
      ["outside and again", "These are ordinary words with no strong judgement."],
      ["the report has no bias", "Loaded words make the report clearly one-sided."],
    ],
    answer: "A",
    explanation: "**Loaded language** reveals bias: *mob* (not crowd), *troublemakers* (not residents), *besieged* (not gathered outside). A neutral report would use plain words.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ADVERT + "\n\nWhich statement in the SolarGlow advert is a **checkable fact** rather than persuasion?",
    options: [
      ["It has a built-in USB port to charge your phone.", "Correct: you could check whether the lamp has this port."],
      ["Thousands of happy families already trust SolarGlow.", "This is an unsupported claim: no source is given and happy is a judgement."],
      ["They deserve the best start in life.", "This is an emotional appeal: an opinion."],
      ["Light up your future!", "This is a slogan, not a checkable statement."],
    ],
    answer: "A",
    hints: ["Which statement could you test by examining the lamp?"],
    explanation: "Only the USB port can be checked directly. *Thousands of happy families* sounds factual but has no source, and *happy* is a judgement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: ADVERT + "\n\nWhat is the main purpose of the sentence *Don't let your children fall behind*?",
    options: [
      ["To make parents worry so that they buy the lamp", "Correct: it appeals to parents' fears for their children."],
      ["To explain how the lamp's solar panel and battery work", "It gives no technical information."],
      ["To report the results of a study of pupils", "No study is mentioned."],
      ["To warn parents that the lamp is unsafe", "It warns about children falling behind, not about the lamp."],
    ],
    answer: "A",
    hints: ["What feeling does the sentence try to create in parents?"],
    explanation: "This is an **emotive appeal** using direct address: it plays on parents' fear that their children will do badly, to push them to buy.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the signal word that shows the function of each sentence in an argument.",
    template: "{{blank:a}}, gardens improve school meals. {{blank:b}}, some schools have no water for a garden. Pupils learn skills, {{blank:c}} making compost.",
    blanks: [
      { id: "a", accepted: ["Furthermore"], choices: ["Furthermore", "However", "For example", "Therefore"] },
      { id: "b", accepted: ["However"], choices: ["However", "Moreover", "For instance", "Firstly"] },
      { id: "c", accepted: ["such as"], choices: ["such as", "however", "therefore", "although"] },
    ],
    explanation: "*Furthermore* adds another reason; *However* introduces a counter-argument; *such as* introduces an example.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which question is **most** useful for judging whether an argument is convincing?",
    options: [
      ["Is each claim supported by reliable, relevant evidence?", "Correct: evidence is the heart of a convincing argument."],
      ["Does the writer use plenty of long and difficult words?", "Difficult vocabulary does not make reasoning stronger."],
      ["Is the argument written in a large number of paragraphs?", "Length and paragraph count do not show quality."],
      ["Does the writer feel very strongly about the subject?", "Strong feeling is not evidence; it may even signal bias."],
    ],
    answer: "A",
    hints: ["What makes you believe a claim?"],
    explanation: "Evaluate arguments by their **evidence** (reliable? relevant? enough?) and their **fairness** (do they consider other views?).",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION",
    stem: ext("*Yesterday a kombi driver shouted at me and refused to give me my change. Kombi drivers are all rude and dishonest, and they should be banned from our roads.*") + "\n\nExplain **two** weaknesses in this argument.",
    marks: 2,
    points: [
      "It generalises from one example to all kombi drivers (a stereotype / hasty generalisation)",
      "The conclusion (banning them) is extreme / unsupported, and ignores other views or the need for kombis",
    ],
    modelAnswer: "It judges all kombi drivers by one bad experience, and it jumps to an extreme solution without considering that people depend on kombis.",
    hints: ["How many drivers did the writer actually meet?"],
    explanation: "Common weaknesses: **generalising** from a single case, **stereotyping** a group, and drawing an **extreme conclusion** without evidence.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080,
    stem: UNIFORM,
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What is the writer's main claim?",
        options: [
          ["School uniforms should be kept", "Correct: he disagrees with abolishing them."],
          ["School uniforms should be abolished", "This is the view of other readers that he disagrees with."],
          ["School uniforms should be made in new colours", "Colours are mentioned only as an example."],
          ["Schools should sell second-hand clothes", "This is a suggestion within one paragraph, not the main claim."],
        ],
        answer: "A",
        explanation: "Paragraphs 1 and 6 frame the argument: he **disagrees** with abolishing uniforms.",
      }),
      P.manual({
        label: "(b)",
        marks: 3,
        stem: "Identify the **three** reasons the writer gives in support of his claim (paragraphs 2, 3 and 5).",
        points: [
          "Uniforms hide differences in wealth (poorer pupils are not singled out)",
          "Uniforms save families money over time (last long, can be handed down)",
          "Uniforms build a sense of belonging / pride in the school",
        ],
        modelAnswer: "They hide differences between rich and poor pupils; they save money over time; they give pupils a sense of belonging.",
      }),
      P.mcq({
        label: "(c)",
        stem: "In paragraph 2, what is the purpose of the story about the girl in Mutoko?",
        options: [
          ["It is an example that supports the first reason", "Correct: it illustrates how uniforms hide differences."],
          ["It is the writer's main claim for the whole letter", "It is a supporting example, not the main claim."],
          ["It is a counter-argument from another reader", "It supports the writer's own view."],
          ["It is a statistic about pupils in Mutoko", "It is one personal anecdote, not a statistic."],
        ],
        answer: "A",
        explanation: "Anecdotes are **examples** that support a reason; they are not main points. In a summary, the reason would be included and the anecdote left out.",
      }),
      P.manual({
        label: "(d)",
        marks: 2,
        stem: "In paragraph 4, how does the writer deal with the opposing view?",
        points: [
          "He admits it is a fair point (that uniforms are costly to buy at once) / concedes",
          "He rebuts it: suggests instalments or second-hand sales, arguing cost is a reason to make uniforms cheaper, not to abolish them",
        ],
        modelAnswer: "He accepts that buying a uniform at once is costly, then answers it by suggesting instalments and second-hand sales, so cost is a reason to lower prices, not to scrap uniforms.",
      }),
      P.mcq({
        label: "(e)",
        stem: "Which statement from the letter is a **fact** rather than an opinion?",
        options: [
          ["A uniform can be passed down to younger children.", "Correct: this can be checked; it is a practical fact."],
          ["Abolishing them would hurt the poorest children.", "This is a prediction and judgement: opinion."],
          ["Uniforms build a strong sense of belonging.", "This is a belief others might dispute."],
          ["Fashionable clothes are a waste of family money.", "This is a judgement: opinion."],
        ],
        answer: "A",
        explanation: "Whether a uniform can be handed down is checkable. The other statements are judgements or predictions.",
      }),
      P.manual({
        label: "(f)",
        marks: 2,
        stem: "How convincing do you find the letter? Give **one** strength and **one** weakness.",
        points: [
          "Strength, e.g. clear structure with signposts / considers and answers the other side / uses a personal example",
          "Weakness, e.g. relies on one anecdote, gives no wider evidence or figures / does not show uniforms really save money",
        ],
        modelAnswer: "It is well organised and answers the cost argument fairly, but it relies on one girl's comment rather than wider evidence.",
      }),
    ],
    hints: ["Separate the main claim, the reasons and the examples.", "A fair argument admits the other side before answering it."],
    explanation: "The letter has a clear claim, three signposted reasons (*First, Secondly, Finally*), a supporting anecdote and a concession with rebuttal (paragraph 4). Its main weakness is limited evidence.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `${UNIFORM}\n\nWhich word in paragraph 4 signals that the writer is about to **answer** the opposing view?`,
    options: [
      ["But", "Correct: But introduces his reply after the concession."],
      ["Some", "Some introduces who holds the opposing view."],
      ["fair", "Fair is part of the concession, not the reply."],
      ["should", "Should introduces a suggestion within the concession."],
    ],
    answer: "A",
    hints: ["Find the contrast word in the paragraph."],
    explanation: "Concession + rebuttal: *This is a fair point … **But** a problem with cost is a reason to make uniforms cheaper.*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement is a **stereotype**?",
    options: [
      ["All teenagers are lazy and spend all day on their phones.", "Correct: an over-simple idea applied to a whole group."],
      ["Many teenagers in our class own a mobile phone.", "Many is limited and could be checked; not a stereotype."],
      ["My brother is often tired after his football practice at school.", "This is about one person, not a group."],
      ["Some pupils find mathematics difficult at first.", "Some is a cautious, limited claim."],
    ],
    answer: "A",
    explanation: "A **stereotype** applies a fixed, simple judgement to a whole group (*all teenagers*). Watch for *all*, *every*, *always* applied to groups of people.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: ADVERT + "\n\nIdentify **two** persuasive techniques in the SolarGlow advert and explain how each tries to persuade the reader.",
    marks: 4,
    points: [
      "Technique 1 identified with example (e.g. rhetorical question: Why should your children struggle…?)",
      "Effect of technique 1 explained (e.g. makes parents feel the answer is obviously no, so they must act)",
      "Technique 2 identified with example (e.g. emotive direct address: they deserve the best start / don't let your children fall behind; or unsupported claim: thousands of happy families)",
      "Effect of technique 2 explained (e.g. plays on guilt or fear / suggests everyone else trusts it, so it must be good)",
    ],
    modelAnswer: "The rhetorical question \"Why should your children struggle to read by candlelight?\" makes parents feel it would be wrong not to buy. \"Thousands of happy families already trust SolarGlow\" suggests everyone else has bought it, so the reader feels left out.",
    hints: ["Look at the first sentence and the last two sentences."],
    explanation: "Name the technique, quote it, and explain its effect: rhetorical question, emotive appeal to parents, unsupported popularity claim (bandwagon), direct address.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "True or false: *Harare is the capital of Zambia* is a statement of fact, even though it is false.",
    answer: true,
    hints: ["Can the statement be checked?"],
    explanation: "True. A factual statement is one that can be checked and proved true or false. This one can be checked, and it turns out to be wrong (Lusaka is Zambia's capital).",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "*In my view, the new road ___ be finished before the rainy season.* Which word turns this sentence into a recommendation (an opinion)?",
    options: [
      ["should", "Correct: should expresses what the writer thinks ought to happen."],
      ["was", "Was cannot be followed by be: the sentence would be ungrammatical."],
      ["has", "Has does not fit the grammar of the sentence."],
      ["did", "Did does not fit the grammar of the sentence."],
    ],
    answer: "A",
    explanation: "Words of obligation (*should, ought to, must*) and belief (*in my view*) signal opinions.",
  });

  b.card("DEFINITION", "Fact","A statement that can be checked and proved true or false.", "The clinic has twelve beds.");
  b.card("DEFINITION", "Opinion", "A statement of belief, feeling or judgement that others may reasonably dispute.", "The clinic is the best thing in town.");
  b.card("FACT", "Opinion signal words", "best, worst, terrible, beautiful, I think, I believe, clearly, surely, should, must", undefined);
  b.card("DEFINITION", "Bias", "A one-sided presentation: leaving out other views, loaded words, selected evidence, stereotypes.", undefined);
  b.card("DEFINITION", "Stereotype", "An over-simple, fixed idea about a whole group of people.", "'All teenagers are lazy.'");
  b.card("CONCEPT", "Structure of an argument", "Main claim → reasons → evidence or examples; often a concession and rebuttal.", undefined);
  b.card("FACT", "Argument signal words", "Adding: furthermore, moreover. Contrast: however, on the other hand. Example: for instance, such as. Conclusion: therefore, consequently.", undefined);
  b.card("VOCABULARY", "Persuasive techniques", "rhetorical question, emotive language, statistics, expert opinion, rule of three, direct address, exaggeration", undefined);
  b.card("CONCEPT", "Judging how convincing a text is", "Is there reliable, relevant evidence? Is the other side treated fairly? Is the language reasonable?", undefined);
});
